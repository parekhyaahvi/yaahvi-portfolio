const API_URL = '/api/projects';

async function fetchProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  // Render skeletons initially
  grid.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    grid.appendChild(skeleton);
  }

  try {
    const apiBase = window.portfolioConfig.apiBaseUrl || '';
    const response = await fetch(`${apiBase}${API_URL}`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    const projects = await response.json();

    grid.innerHTML = '';

    if (projects.length === 0) {
      grid.innerHTML = '<div class="projects-error"><p>No projects found. Check back later!</p></div>';
      return;
    }

    projects.forEach((project, index) => {
      const card = createProjectCard(project);
      card.style.animationDelay = `${index * 150}ms`;
      grid.appendChild(card);
      
      // Use a small timeout to trigger the entrance animation
      setTimeout(() => {
        card.classList.add('animate-in');
      }, 50);
    });

  } catch (error) {
    console.error('Projects fetch error:', error);
    grid.innerHTML = `
      <div class="projects-error" role="alert">
        <p>Projects coming soon — check <a href="${window.portfolioConfig.github}" target="_blank" rel="noopener noreferrer">GitHub</a> for updates.</p>
      </div>
    `;
  }
}

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';
  
  const techStackHtml = project.techStack
    .map(tech => `<span class="tech-tag">${tech}</span>`)
    .join('');

  const liveBtnHtml = project.liveUrl 
    ? `<a href="${project.liveUrl}" class="project-link-btn project-link-btn--primary" target="_blank" rel="noopener noreferrer" aria-label="View live demo of ${project.title}">Live Demo</a>`
    : '';

  card.innerHTML = `
    <div class="project-card__image-container">
      <img src="${project.imageUrl || 'https://via.placeholder.com/800x450/0f172a/38bdf8?text=Project+Preview'}" alt="${project.title}" class="project-card__image" loading="lazy">
    </div>
    <div class="project-card__body">
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.description}</p>
      <div class="project-card__tags">
        ${techStackHtml}
      </div>
      <div class="project-card__links">
        ${liveBtnHtml}
        <a href="${project.githubUrl}" class="project-link-btn project-link-btn--secondary" target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository of ${project.title}">GitHub</a>
      </div>
    </div>
  `;
  
  return card;
}

// Fetch immediately on page load as per PRD
document.addEventListener('DOMContentLoaded', fetchProjects);
