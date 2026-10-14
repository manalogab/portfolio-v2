import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Skills from './components/Skills';
import GitHub from './components/GitHub';
import Contact from './components/Contact';

export default function App() {
  return (
    <>
      <a className="skip" href="#projects">
        Skip to projects
      </a>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Journey />
        <Skills />
        <GitHub />
        <Contact />
      </main>
    </>
  );
}
