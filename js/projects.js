/**
 * Featured Projects Slider Logic
 */
class ProjectSlider {
    constructor() {
        this.container = document.querySelector('.slider-container');
        this.track = document.querySelector('.slider-track');
        this.slides = Array.from(document.querySelectorAll('.project-block'));
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.externalLabel = document.querySelector('.project-label-external');
        
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        
        this.init();
    }
    
    init() {
        if (!this.track || this.slides.length === 0) return;
        
        this.updateLabel();
        
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });

        // Add keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (this.isInViewport(this.container)) {
                if (e.key === 'ArrowRight') this.next();
                if (e.key === 'ArrowLeft') this.prev();
            }
        });
    }
    
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    handleSwipe(start, end) {
        if (start - end > 50) this.next();
        if (end - start > 50) this.prev();
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
        this.updateLabel();
    }
    
    updateLabel() {
        const currentSlide = this.slides[this.currentIndex];
        const color = currentSlide.dataset.color || 'var(--color-text-primary)';
        const internalLabel = currentSlide.querySelector('.project-label-internal');
        
        if (internalLabel) {
            internalLabel.style.color = color;
            
            // Add a small animation to the active label
            internalLabel.style.opacity = '0';
            internalLabel.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                internalLabel.style.transition = 'all 0.4s ease';
                internalLabel.style.opacity = '1';
                internalLabel.style.transform = 'translateY(0)';
            }, 50);
        }
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectSlider();
});
