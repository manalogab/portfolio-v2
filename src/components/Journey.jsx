import { useRef } from 'react';
import { journey, certifications } from '../data';
import { useRevealOnce } from '../hooks';
import StretchWord from './StretchWord';

export default function Journey() {
  const listRef = useRef(null);
  const visible = useRevealOnce(listRef);

  return (
    <section className="section" aria-labelledby="journey">
      <StretchWord id="journey">Journey</StretchWord>

      <div className="journey">
        <div className="journey__about">
          <h3 className="h3">From curiosity to shipping real sites</h3>
          <p>
            What started as wondering how websites work turned into a love for building them. I learned most by
            pushing through the hard parts: debugging patiently, asking for help, and showing up when things
            didn&rsquo;t go to plan.
          </p>
          <p>
            Studying IT taught me to learn fast and adapt. I&rsquo;m early in my career, driven, and ready to
            grow on a real team.
          </p>
        </div>

        <ol className={`timeline ${visible ? 'is-visible' : ''}`} ref={listRef}>
          {journey.map((item, i) => (
            <li className="timeline__item" key={item.title} style={{ '--i': i }}>
              <time className="timeline__when">{item.when}</time>
              <div>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__where">{item.where}</p>
                <p className="timeline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="certs">
        <h3 className="h3">Certifications</h3>
        <ul className="certs__list">
          {certifications.map((c) => (
            <li key={c.name}>
              <a href={c.href} target="_blank" rel="noreferrer">
                <span className="certs__name">{c.name}</span>
                <span className="certs__issuer">{c.issuer}</span>
                <span className="certs__date">{c.date}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
