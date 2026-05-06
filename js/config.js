const config = {
  name: 'Yaahvi Riddhish Parekh',
  roles: ['Full Stack Developer', 'Problem Solver', 'Web Architect'],
  tagline: 'Building scalable web applications with modern technologies',
  email: 'parekhyaahvi@gmail.com', // Placeholder, update as needed
  github: 'https://github.com/parekhyaahvi',
  linkedin: 'https://www.linkedin.com/in/yaahvi-parekh-812523396/',
  apiBaseUrl: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
    ? 'http://localhost:3000'
    : '', // Use relative paths in production
};

// Site-wide data access
window.portfolioConfig = config;
