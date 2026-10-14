import { useEffect, useState } from 'react';
import { profile } from '../data';

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#skills', label: 'Skills' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

function readTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* storage unavailable */
  }
  return 'dark'; // dark by default, like the original site
}

export default function Nav() {
  const [theme, setTheme] = useState(readTheme);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  // Hide while scrolling down, show again when scrolling up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className={`nav ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}>
      <a className="nav__brand" href="#top" onClick={() => setOpen(false)}>
        <img src="./images/logo.png" alt="" width="28" height="21" />
        <span>{profile.fullName}</span>
      </a>

      <nav className="nav__links" aria-label="Sections">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
          Resume
        </a>
      </nav>

      <div className="nav__tools">
        <button
          className="icon-btn"
          type="button"
          onClick={() => setTheme(next)}
          aria-label={`Switch to ${next} theme`}
          title={`Switch to ${next} theme`}
        >
          <span className={`theme-dot theme-dot--${theme}`} aria-hidden="true" />
        </button>
        <button
          className="icon-btn nav__menu"
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="burger" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
