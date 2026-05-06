const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create particle
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Method to draw individual particle
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update particle position
  update() {
    // Check if particle is still within canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Move particle
    this.x += this.directionX;
    this.y += this.directionY;

    // Draw particle
    this.draw();
  }
}

// Create particle array
function init() {
  particlesArray = [];
  let numberOfParticles = 100;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 2 + 0.5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let directionX = (Math.random() * 0.4) - 0.2;
    let directionY = (Math.random() * 0.4) - 0.2;
    
    // Choose color based on theme
    let color;
    if (isLight) {
      color = 'rgba(15, 23, 42, ' + (Math.random() * 0.15 + 0.05) + ')'; // Darker particles for light mode
    } else {
      color = 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.1) + ')'; // Lighter particles for dark mode
    }

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// Re-init on theme change
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'data-theme') {
      init();
    }
  });
});
observer.observe(document.documentElement, { attributes: true });

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();
