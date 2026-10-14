// All site content lives here. Edit this file to update the portfolio —
// no need to touch the components.

export const profile = {
  firstName: 'Gabriel',
  lastName: 'Manalo',
  fullName: 'Gabriel Edward Manalo',
  role: 'Web Developer & UI Designer',
  location: 'San Fernando, Pampanga',
  school: 'BSIT, Holy Angel University',
  status: 'Open to internships',
  pitch:
    'I build responsive websites and full-stack web apps — from PHP and MySQL online stores to SEO-ready sites for real local businesses. I care about clean code, layouts that feel easy, and learning the next tool fast.',
  email: 'manalogabb@gmail.com',
  resume: './resume/GabrielEdwardResume.pdf',
  portrait: './images/portrait.webp',
  socials: [
    { label: 'GitHub', href: 'https://github.com/manalogab' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabriel-edward-manalo-4a63b3358/' },
    { label: 'Facebook', href: 'https://www.facebook.com/tracer1of1' },
  ],
  githubUser: 'manalogab',
};

export const projects = [
  {
    name: 'PS5 Store',
    kind: 'Full-stack online store',
    category: 'Full-stack',
    tagline: 'Online store with cart, accounts and order management.',
    summary:
      'A working online store with product listings, a shopping cart, user accounts and an order management system.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'CSS'],
    image: './images/ps5-store.webp',
    live: 'http://mygyatstore.onlinewebshop.net/',
    code: 'https://github.com/manalogab/ps5store',
  },
  {
    name: 'Galang Dental Center',
    kind: 'Client website',
    category: 'Website',
    tagline: 'Live clinic website with online appointment booking.',
    summary:
      'A live clinic website with service listings, clinic information, online appointment booking and patient inquiries, built for search visibility.',
    stack: ['WordPress', 'Elementor', 'SEO'],
    image: './images/dental-clinic.webp',
    live: 'https://galangdentalcenter.com/',
  },
  {
    name: 'Hustle Skills Lab',
    kind: 'Basketball training website',
    category: 'Website',
    tagline: 'Training program site for aspiring basketball players.',
    summary:
      'A site for a basketball training program where aspiring athletes explore services and sign up for skills development.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: './images/hustle-skills-lab.webp',
    imageFit: 'contain',
    live: 'https://manalogab.github.io/Hustle-Skills-Lab/',
    code: 'https://github.com/manalogab/Hustle-Skills-Lab',
  },
  {
    name: 'Koma Clothing',
    kind: 'E-commerce with inventory system',
    category: 'Full-stack',
    tagline: 'Clothing shop backed by an inventory and order system.',
    summary:
      'An online shop for a clothing brand with product listings, a cart and user accounts, backed by an inventory and order management system.',
    stack: ['Vue', 'JavaScript', 'HTML', 'CSS'],
    image: './images/koma-clothing.webp',
    imageFit: 'contain',
    imageBg: '#000000',
    live: 'https://koma-ph.netlify.app/',
    code: 'https://github.com/manalogab/6WCSERVER-WD-303-KOMA-PH-Inventory-and-Order-Management-System',
  },
];

// Newest first.
export const journey = [
  {
    when: 'Feb 2026',
    title: 'SEO-optimized website development',
    where: 'Project work',
    text: 'Built a site around proper HTML structure, meta tags and keyword placement, then tuned page speed and mobile layout to improve search visibility.',
  },
  {
    when: 'Oct 2025',
    title: 'Inventory and order management system',
    where: 'Backend',
    text: 'Designed a normalized relational database with tables, relationships and queries, and tested it for data integrity and performance.',
  },
  {
    when: 'Mar 2025',
    title: 'Responsive website interface',
    where: 'Frontend',
    text: 'Built the interface in HTML, CSS and JavaScript with interactive elements, working with teammates to match the project requirements.',
  },
  {
    when: '2023 – 2027',
    title: 'BS Information Technology, major in Web Development',
    where: 'Holy Angel University',
    text: "Dean's Lister.",
  },
  {
    when: '2021 – 2023',
    title: 'Accountancy, Business and Management',
    where: 'Don Bosco Academy',
    text: 'Senior high school.',
  },
];

export const certifications = [
  {
    name: 'Back End Development and APIs',
    issuer: 'freeCodeCamp',
    date: 'Sep 2025',
    href: 'https://www.freecodecamp.org/certification/gabmanalo/back-end-development-and-apis',
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: 'Sep 2025',
    href: 'https://www.freecodecamp.org/certification/gabmanalo/javascript-algorithms-and-data-structures',
  },
  {
    name: 'Basics of UI/UX',
    issuer: 'Simplilearn',
    date: 'Sep 2025',
    href: 'https://simpli-web.app.link/e/JyjiIDmjw1b',
  },
  {
    name: 'Design Thinking for Beginners',
    issuer: 'Simplilearn',
    date: 'Jul 2025',
    href: 'https://simpli-web.app.link/e/LFeSBNsjw1b',
  },
  {
    name: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    date: 'Sep 2024',
    href: 'https://www.freecodecamp.org/certification/gabmanalo/responsive-web-design',
  },
  {
    name: 'Introduction to PHP',
    issuer: 'Simplilearn',
    date: 'Sep 2024',
    href: 'https://simpli-web.app.link/e/yhZ5vxSjw1b',
  },
];

// `icon` must match a key in components/Skills.jsx
export const skills = [
  { name: 'HTML', use: 'Semantic markup', icon: 'html' },
  { name: 'CSS', use: 'Responsive layout', icon: 'css' },
  { name: 'JavaScript', use: 'Interactivity', icon: 'js' },
  { name: 'React', use: 'Component UIs', icon: 'react' },
  { name: 'Vue', use: 'Storefront UI', icon: 'vue' },
  { name: 'PHP', use: 'Server logic', icon: 'php' },
  { name: 'MySQL', use: 'Relational data', icon: 'mysql' },
  { name: 'Node.js', use: 'APIs with Express', icon: 'node' },
  { name: 'Python', use: 'Scripting', icon: 'python' },
  { name: 'WordPress', use: 'Client sites', icon: 'wordpress' },
  { name: 'Elementor', use: 'Page building', icon: 'elementor' },
  { name: 'SEO', use: 'Search visibility', icon: 'seo' },
  { name: 'Figma', use: 'UI design', icon: 'figma' },
  { name: 'Git & GitHub', use: 'Version control', icon: 'git' },
];
