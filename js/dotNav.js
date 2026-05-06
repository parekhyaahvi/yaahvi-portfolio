document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const dots = document.querySelectorAll('.dot');


  // Handle dot clicks
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const sectionId = dot.getAttribute('data-section');
      const targetSection = document.getElementById(sectionId);
      
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });



  // Update active dot on scroll
  const observerOptions = {
    root: null,
    threshold: 0.6 // Section is considered active when 60% in view
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveDot(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  function updateActiveDot(sectionId) {
    dots.forEach(dot => {
      dot.classList.remove('active');
      if (dot.getAttribute('data-section') === sectionId) {
        dot.classList.add('active');
      }
    });
  }
});
