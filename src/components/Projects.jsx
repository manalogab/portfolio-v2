import { useRef } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects, profile } from '../data';
import StretchWord from './StretchWord';

function ProjectCard({ project }) {
  const ref = useRef(null);

  // The "Open live site" label follows the pointer over the screenshot.
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article className="card">
      <a
        ref={ref}
        className={`card__media ${project.imageFit === 'contain' ? 'card__media--contain' : ''}`}
        href={project.live}
        target="_blank"
        rel="noreferrer"
        onPointerMove={onMove}
        aria-label={`Open the live ${project.name} site`}
      >
        <span className="card__shot" style={project.imageBg ? { background: project.imageBg } : undefined}>
          <img src={project.image} alt="" loading="lazy" />
        </span>
        <span className="media__cursor" aria-hidden="true">
          Open live site
        </span>
      </a>

      <div className="card__head">
        <h3 className="card__name">{project.name}</h3>
        <span className="card__badge">{project.category}</span>
      </div>
      <p className="card__desc" title={project.stack.join(', ')}>
        {project.tagline}
      </p>
      <p className="card__links">
        {project.code && (
          <a href={project.code} target="_blank" rel="noreferrer" aria-label={`${project.name} source code on GitHub`} title="Source code">
            <FiGithub aria-hidden="true" />
          </a>
        )}
        <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open the live ${project.name} site`} title="Live site">
          <FiExternalLink aria-hidden="true" />
        </a>
      </p>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="section" aria-labelledby="projects">
      <StretchWord id="projects">Projects</StretchWord>

      <div className="cards">
        {projects.map((p) => (
          <ProjectCard project={p} key={p.name} />
        ))}
      </div>

      <div className="cards__more">
        <a href={`https://github.com/${profile.githubUser}?tab=repositories`} target="_blank" rel="noreferrer">
          View more projects
        </a>
      </div>
    </section>
  );
}
