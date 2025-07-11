// Navbar scroll functionality
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.classList.add('hide-navbar');
        navbar.classList.remove('show-navbar');
    } else {
        // Scrolling up
        navbar.classList.remove('hide-navbar');
        navbar.classList.add('show-navbar');
    }
    
    lastScrollTop = scrollTop;
});

// Navbar toggler
const toggler = document.querySelector('.custom-toggler');
const collapse = document.querySelector('.collapse');
const navLinks = document.querySelectorAll('.nav-link');

function toggleNavbar() {
    toggler.classList.toggle('open');
    collapse.classList.toggle('show');
}

toggler.addEventListener('click', toggleNavbar);

// Set active nav-link on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        if (window.innerWidth < 992) {
            toggler.classList.remove('open');
            collapse.classList.remove('show');
        }
    });
});

document.addEventListener('click', (e) => {
    if (window.innerWidth < 992) {
        if (!collapse.contains(e.target) && !toggler.contains(e.target)) {
            toggler.classList.remove('open');
            collapse.classList.remove('show');
        }
    }
});

// Gallery Modal
class GalleryModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.track = document.querySelector('.gallery-track');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.counter = document.querySelector('.gallery-counter');
        this.dotsContainer = document.querySelector('.gallery-dots-container');
        this.currentIndex = 0;
        this.images = [];
        this.currentGallery = '';
        this.init();
    }
    init() {
        document.querySelectorAll('.interior-image-container').forEach(container => {
            container.addEventListener('click', (e) => this.openGallery(e));
        });
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.initTouchSupport();
        this.modal.addEventListener('hidden.bs.modal', () => this.resetGallery());
    }
    openGallery(e) {
        const container = e.currentTarget;
        const gallery = container.dataset.gallery;
        const startIndex = parseInt(container.dataset.index);
        this.currentGallery = gallery;
        this.currentIndex = startIndex;
        // Only select visible images (not display: none)
        const visibleContainers = Array.from(document.querySelectorAll(`[data-gallery="${gallery}"]`)).filter(el => {
            // Check if element or any parent is display: none
            return el.offsetParent !== null;
        });
        this.images = visibleContainers.map(el => {
            const img = el.querySelector('img');
            return { src: img.src, alt: img.alt };
        });
        // Find the correct index among visible images
        const visibleIndex = visibleContainers.findIndex(el => el === container);
        const modalTitle = document.getElementById('imageModalLabel');
        modalTitle.textContent = gallery.charAt(0).toUpperCase() + gallery.slice(1);
        this.buildGallery();
        const modal = new bootstrap.Modal(this.modal);
        modal.show();
        this.goToImage(visibleIndex);
    }
    buildGallery() {
        this.track.innerHTML = '';
        this.images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            this.track.appendChild(slide);
        });
        this.renderDots();
        this.updateCounter();
    }
    goToImage(index) {
        this.currentIndex = index;
        const translateX = -index * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        this.updateCounter();
        this.updateNavButtons();
        this.updateDots();
    }
    prevImage() {
        if (this.images.length === 0) return;
        if (this.currentIndex > 0) {
            this.goToImage(this.currentIndex - 1);
        } else {
            this.goToImage(this.images.length - 1);
        }
    }
    nextImage() {
        if (this.images.length === 0) return;
        if (this.currentIndex < this.images.length - 1) {
            this.goToImage(this.currentIndex + 1);
        } else {
            this.goToImage(0);
        }
    }
    updateCounter() {
        const currentSpan = this.counter.querySelector('.current-image');
        const totalSpan = this.counter.querySelector('.total-images');
        currentSpan.textContent = this.currentIndex + 1;
        totalSpan.textContent = this.images.length;
    }
    updateNavButtons() {
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === this.images.length - 1 ? '0.5' : '1';
    }
    handleKeyboard(e) {
        if (!this.modal.classList.contains('show')) return;
        switch(e.key) {
            case 'ArrowLeft': e.preventDefault(); this.prevImage(); break;
            case 'ArrowRight': e.preventDefault(); this.nextImage(); break;
            case 'Escape': bootstrap.Modal.getInstance(this.modal).hide(); break;
        }
    }
    initTouchSupport() {
        let startX = 0, currentX = 0, isDragging = false;
        this.track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; });
        this.track.addEventListener('touchmove', (e) => { if (!isDragging) return; currentX = e.touches[0].clientX; if (Math.abs(startX - currentX) > 10) e.preventDefault(); });
        this.track.addEventListener('touchend', (e) => { if (!isDragging) return; const diff = startX - currentX; const threshold = 50; if (Math.abs(diff) > threshold) { if (diff > 0) this.nextImage(); else this.prevImage(); } isDragging = false; });
    }
    resetGallery() { this.currentIndex = 0; this.images = []; this.track.style.transform = 'translateX(0)'; }
    renderDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = '';
        this.dots = [];
        for (let i = 0; i < this.images.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'gallery-dot' + (i === this.currentIndex ? ' active' : '');
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToImage(i);
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        }
    }
    updateDots() {
        if (!this.dots) return;
        this.dots.forEach((dot, i) => {
            if (i === this.currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }
}

function setupGalleryRowHover() {
    document.querySelectorAll('.interior-gallery-row').forEach(row => {
        const images = Array.from(row.querySelectorAll('.interior-image-container'));
        images.forEach((img, idx) => {
            img.addEventListener('mouseenter', () => {
                images.forEach((other, i) => {
                    if (i === idx) { other.classList.add('expanded'); other.classList.remove('shrunk'); }
                    else { other.classList.add('shrunk'); other.classList.remove('expanded'); }
                });
            });
            img.addEventListener('mouseleave', () => {
                images.forEach(other => { other.classList.remove('expanded', 'shrunk'); });
            });
            img.addEventListener('focus', () => {
                images.forEach((other, i) => {
                    if (i === idx) { other.classList.add('expanded'); other.classList.remove('shrunk'); }
                    else { other.classList.add('shrunk'); other.classList.remove('expanded'); }
                });
            });
            img.addEventListener('blur', () => {
                images.forEach(other => { other.classList.remove('expanded', 'shrunk'); });
            });
        });
    });
}

// Smooth Scrolling for NavBar
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    new GalleryModal();
    setupGalleryRowHover();
    initSmoothScrolling();
});