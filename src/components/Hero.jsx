import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '../data';
import { useFitText, useScrollProgress, usePrefersReducedMotion, WDTH_MIN } from '../hooks';

function useIsNarrow(max = 640) {
  const q = `(max-width: ${max}px)`;
  const [narrow, setNarrow] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return narrow;
}

function NameLine({ text, offset, narrow, accentFrom = Infinity }) {
  const ref = useRef(null);
  useFitText(ref, { wdth: 100, wght: 900, deps: [text, narrow] });
  return (
    <span className="hero__line">
      <span className="hero__fit" ref={ref}>
        {[...text].map((ch, i) => (
          <span
            className={`hero__letter ${i >= accentFrom ? 'hero__letter--accent' : ''}`}
            key={i}
            style={{ '--i': offset + i }}
            aria-hidden="true"
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const narrow = useIsNarrow();
  const reduced = usePrefersReducedMotion();
  const nameRef = useRef(null);
  const [phase, setPhase] = useState(reduced ? 'done' : 'start');

  // One orchestrated entrance: letters rise and widen from condensed.
  useEffect(() => {
    if (reduced) return setPhase('done');
    let t1, t2;
    document.fonts?.ready.then(() => {
      t1 = setTimeout(() => setPhase('in'), 80);
      t2 = setTimeout(() => setPhase('done'), 2000);
    });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  // After the entrance, the name condenses as you scroll away from it.
  const onProgress = useCallback((p) => {
    nameRef.current?.style.setProperty('--w', (100 - (100 - WDTH_MIN) * p).toFixed(2));
  }, []);
  useScrollProgress(nameRef, onProgress, { start: 0.25, end: -0.35, enabled: phase === 'done' && !reduced });

  const lines = narrow ? [profile.firstName, profile.lastName] : [`${profile.firstName} ${profile.lastName}`];
  let offset = 0;

  return (
    <section className="hero" id="top">
      <h1 className={`hero__name hero__name--${phase}`} ref={nameRef} aria-label={profile.fullName}>
        {lines.map((line) => {
          // Last name in red, as on the original site.
          const accentFrom = line === profile.lastName ? 0 : line.endsWith(profile.lastName) ? line.length - profile.lastName.length : Infinity;
          const el = (
            <NameLine key={line} text={line.toUpperCase()} offset={offset} narrow={narrow} accentFrom={accentFrom} />
          );
          offset += line.length;
          return el;
        })}
      </h1>

      <dl className="hero__facts">
        <div>
          <dt className="sr-only">Role</dt>
          <dd>{profile.role}</dd>
        </div>
        <div>
          <dt className="sr-only">Based in</dt>
          <dd>Based in {profile.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Studies</dt>
          <dd>{profile.school}</dd>
        </div>
      </dl>

      <div className="hero__body">
        <div className="hero__intro">
          <p className="hero__pitch">{profile.pitch}</p>
          <div className="hero__actions">
            <span className="status">
              <span className="status__dot" aria-hidden="true" />
              {profile.status}
            </span>
            <a className="btn btn--solid" href="#projects">
              See my work
            </a>
            <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
          </div>
        </div>
        <figure className="hero__portrait">
          <img src={profile.portrait} alt={`Portrait of ${profile.fullName}`} width="800" height="1000" />
        </figure>
      </div>
    </section>
  );
}
