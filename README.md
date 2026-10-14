# Gabriel Edward Manalo — Portfolio v2

A single-page portfolio built with **React + Vite**, with custom scroll-driven type animations (no animation library).

## Run it

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build
```

`dist/` in this zip is already built, so you can also upload it as-is to any static host.

## Edit your content

Everything — bio, projects, journey, certifications, skills, links — is in **`src/data.js`**.
Add a project by adding an object to `projects` and putting its screenshot in `public/images/`.
Each project has a `category` (the small badge) and a one-line `tagline`. For a logo instead of a screenshot, add `imageFit: 'contain'` (and optionally `imageBg`).

## What moves, and how

| Effect | Where | File |
| --- | --- | --- |
| Name assembles letter by letter, rising and widening from condensed | Hero, on load | `Hero.jsx`, `styles.css` (`.hero__name--in`) |
| Name condenses as you scroll away | Hero | `Hero.jsx` (`useScrollProgress`) |
| Giant section words stretch from condensed to full width as they scroll in | Every section | `StretchWord.jsx` |
| "Open live site" label follows the pointer | Project screenshots | `Projects.jsx` |
| Timeline rows draw in once, in order | Journey | `Journey.jsx` |
| Live contribution chart from GitHub | GitHub | `GitHub.jsx` |

The stretch effect uses the variable font **Archivo** and its width axis (`wdth` 62–125), loaded from Google Fonts in `index.html`.
All motion is switched off for visitors who have "reduce motion" turned on.

## Deploy to GitHub Pages

`vite.config.js` uses `base: './'`, so the build works from any folder, including `https://manalogab.github.io/Portfolio/`.

1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `peaceiris/actions-gh-pages` GitHub Action), then set Pages to serve that branch.

## Contact form

The site has no backend, so the form opens the visitor's email app with the message filled in (`mailto:`).
To receive messages directly instead, swap `onSubmit` in `Contact.jsx` for a service like Formspree or EmailJS.

## Structure

```
index.html          page shell, fonts, theme set before first paint
src/
  data.js           all content
  hooks.js          fit-to-width text, scroll progress, reveal-once
  styles.css        design tokens, layout, motion, dark theme
  components/       Nav, Hero, StretchWord, Projects, Journey, Skills, GitHub, Contact
public/
  images/           compressed WebP screenshots, portrait, logo
  resume/           resume PDF
```
