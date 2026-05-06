document.addEventListener('DOMContentLoaded', () => {
  const emailBtn = document.getElementById('email-btn');
  const toast = document.getElementById('toast');
  const githubLink = document.getElementById('github-link');
  const linkedinLink = document.getElementById('linkedin-link');

  // Set URLs from config
  if (githubLink) githubLink.href = window.portfolioConfig.github;
  if (linkedinLink) linkedinLink.href = window.portfolioConfig.linkedin;

  if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
      const email = window.portfolioConfig.email;
      
      try {
        // Attempt to use Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
          
          // Visual feedback on button
          const originalSVG = emailBtn.innerHTML;
          emailBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
          emailBtn.style.borderColor = 'var(--color-accent-1)';
          
          // Show toast
          showToast('Email copied to clipboard!');
          
          // Revert button after 2 seconds
          setTimeout(() => {
            emailBtn.innerHTML = originalSVG;
            emailBtn.style.borderColor = '';
          }, 2000);
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch (err) {
        console.warn('Clipboard copy failed, falling back to mailto:', err);
        window.location.href = `mailto:${email}`;
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('visible');
    
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  }
});
