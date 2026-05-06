document.addEventListener('DOMContentLoaded', () => {
  const options = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hero specific entrance is handled in typewriter.js
        
        // About Section
        if (entry.target.id === 'about') {
          entry.target.querySelector('.profile-image-container').classList.add('visible');
          entry.target.querySelector('.about-content').classList.add('visible');
        }

        // Skills Section
        if (entry.target.id === 'skills') {
          const categories = entry.target.querySelectorAll('.skill-category');
          categories.forEach((cat, index) => {
            setTimeout(() => {
              cat.classList.add('visible');
            }, index * 150);
          });
        }

        // Projects Section
        if (entry.target.id === 'projects') {
          // Logic handled in projects.js
        }

        // Contact Section
        if (entry.target.id === 'contact') {
          entry.target.querySelector('.contact-panel').classList.add('visible');
        }
        
        // Stop observing once animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
});
