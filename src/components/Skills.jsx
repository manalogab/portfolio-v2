import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiPhp,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiWordpress,
  SiElementor,
  SiFigma,
  SiGit,
} from 'react-icons/si';
import { skills } from '../data';
import StretchWord from './StretchWord';

function SeoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  );
}

const icons = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#663399' },
  js: { Icon: SiJavascript, color: '#C9A800' },
  react: { Icon: SiReact, color: '#1A9FC4' },
  vue: { Icon: SiVuedotjs, color: '#41B883' },
  php: { Icon: SiPhp, color: '#777BB4' },
  mysql: { Icon: SiMysql, color: '#00758F' },
  node: { Icon: SiNodedotjs, color: '#5FA04E' },
  python: { Icon: SiPython, color: '#3776AB' },
  wordpress: { Icon: SiWordpress, color: '#21759B' },
  elementor: { Icon: SiElementor, color: '#92003B' },
  seo: { Icon: SeoIcon, color: '#E5412D' },
  figma: { Icon: SiFigma, color: '#F24E1E' },
  git: { Icon: SiGit, color: '#F05032' },
};

export default function Skills() {
  return (
    <section className="section" aria-labelledby="skills">
      <StretchWord id="skills">Skills</StretchWord>
      <ul className="skills">
        {skills.map((s) => {
          const { Icon, color } = icons[s.icon] ?? icons.seo;
          return (
            <li className="skill" key={s.name}>
              <span className="skill__icon" style={{ '--brand': color }}>
                <Icon aria-hidden="true" />
              </span>
              <span className="skill__text">
                <span className="skill__name">{s.name}</span>
                <span className="skill__use">{s.use}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
