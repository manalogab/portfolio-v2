import { useEffect, useMemo, useState } from 'react';
import { profile } from '../data';
import StretchWord from './StretchWord';

const user = profile.githubUser;

function useGitHubData() {
  const [state, setState] = useState({ status: 'loading' });
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`).then((r) => {
        if (!r.ok) throw new Error('contributions');
        return r.json();
      }),
      fetch(`https://api.github.com/users/${user}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    ])
      .then(([contrib, account]) => {
        if (!cancelled) setState({ status: 'ready', contrib, account });
      })
      .catch(() => !cancelled && setState({ status: 'error' }));
    return () => {
      cancelled = true;
    };
  }, []);
  return state;
}

function toWeeks(days) {
  if (!days?.length) return [];
  const first = new Date(days[0].date + 'T00:00:00').getDay();
  const cells = [...Array(first).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function GitHub() {
  const data = useGitHubData();
  const weeks = useMemo(
    () => (data.status === 'ready' ? toWeeks(data.contrib.contributions) : Array.from({ length: 53 }, () => Array(7).fill(null))),
    [data]
  );

  const total = data.status === 'ready' ? data.contrib.total?.lastYear : null;
  const repos = data.status === 'ready' ? data.account?.public_repos : null;

  return (
    <section className="section" aria-labelledby="github">
      <StretchWord id="github">GitHub</StretchWord>

      <div className="gh">
        <dl className="gh__stats">
          <div>
            <dt>Contributions, last 12 months</dt>
            <dd>{total ?? '—'}</dd>
          </div>
          <div>
            <dt>Public repositories</dt>
            <dd>{repos ?? '—'}</dd>
          </div>
          <a className="btn" href={`https://github.com/${user}`} target="_blank" rel="noreferrer">
            View profile on GitHub
          </a>
        </dl>

        {data.status === 'error' ? (
          <p className="gh__note">
            The activity chart couldn&rsquo;t load right now. You can see it on{' '}
            <a href={`https://github.com/${user}`} target="_blank" rel="noreferrer">
              github.com/{user}
            </a>
            .
          </p>
        ) : (
          <div className="gh__scroll">
            <div
              className={`gh__grid ${data.status === 'loading' ? 'is-loading' : ''}`}
              role="img"
              aria-label={total != null ? `${total} contributions in the last year` : 'Loading contribution activity'}
            >
              {weeks.map((week, w) => (
                <div className="gh__week" key={w}>
                  {week.map((d, i) => (
                    <span
                      key={i}
                      className={`gh__day ${d ? `lv${d.level}` : 'empty'}`}
                      title={d ? `${d.count} on ${d.date}` : undefined}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="gh__legend" aria-hidden="true">
              Less <span className="gh__day lv0" /> <span className="gh__day lv1" /> <span className="gh__day lv2" />{' '}
              <span className="gh__day lv3" /> <span className="gh__day lv4" /> More
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
