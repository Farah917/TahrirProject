// Modal data for different hotel spaces
const modalData = {
    bedrooms: {
        title: "Luxury Bedrooms",
        description: "Experience the perfect blend of 1960s elegance and modern comfort in our thoughtfully designed suites. Each room features period-appropriate furnishings, contemporary amenities, and stunning views of Cairo's skyline.",
        images: [
            "Img/bedroom 1.webp",
            "Img/bedroom 2.jpg",
            "Img/bedroom 3.jpg"
        ],
        features: [
            {
                title: "Retro-Modern Design",
                desc: "Mid-century modern furniture with contemporary luxury touches"
            },
            {
                title: "Premium Amenities",
                desc: "High-end finishes, smart room technology, and personalized service"
            },
            {
                title: "City Views",
                desc: "Panoramic windows overlooking historic Tahrir Square"
            },
            {
                title: "Sustainable Features",
                desc: "Energy-efficient systems and eco-friendly materials throughout"
            }
        ]
    },
    restaurants: {
        title: "Fine Dining Restaurants",
        description: "Savor exceptional cuisine in our collection of restaurants, each offering a unique culinary journey through Egyptian and international flavors, set within stunning retro-inspired interiors.",
        images: [
            "Img/restaurant 1.jpg",
            "Img/restaurant 2.jpg",
            "Img/restaurant 3.jpg",
            "Img/restaurant 4.jpg"
        ],
        features: [
            {
                title: "Signature Restaurant",
                desc: "Contemporary Egyptian cuisine with international influences"
            },
            {
                title: "Rooftop Bar",
                desc: "Craft cocktails with panoramic views of Cairo"
            },
            {
                title: "Café Lounge",
                desc: "All-day dining in a relaxed, stylish atmosphere"
            },
            {
                title: "Private Dining",
                desc: "Exclusive spaces for special occasions and events"
            }
        ]
    },
    pool: {
        title: "Rooftop Pool & Wellness",
        description: "Escape to our rooftop oasis featuring a stunning infinity pool, wellness facilities, and breathtaking views of the Nile and Cairo's historic skyline.",
        images: [
            "Img/pool area 1.jpg",
            "Img/pool area 2.jpg",
            "Img/pool area 3.jpg"
        ],
        features: [
            {
                title: "Infinity Pool",
                desc: "Temperature-controlled pool with panoramic city views"
            },
            {
                title: "Wellness Center",
                desc: "Full-service spa with traditional and modern treatments"
            },
            {
                title: "Fitness Facility",
                desc: "State-of-the-art equipment with personal training services"
            },
            {
                title: "Pool Deck",
                desc: "Luxurious lounging areas and poolside service"
            }
        ]
    },
    lobby: {
        title: "Grand Lobby",
        description: "Step into our magnificent lobby where original architectural elements meet contemporary luxury design, creating an impressive entrance that honors the building's heritage.",
        images: [
            "Img/lobby 1.jpg",
            "Img/lobby 2.jpg",
            "Img/lobby 3.jpg",
        ],
        features: [
            {
                title: "Heritage Architecture",
                desc: "Preserved original features with modern interpretations"
            },
            {
                title: "Concierge Services",
                desc: "24/7 personalized assistance and local expertise"
            },
            {
                title: "Art Gallery",
                desc: "Rotating exhibitions featuring Egyptian contemporary art"
            },
            {
                title: "Social Spaces",
                desc: "Comfortable seating areas for relaxation and meetings"
            }
        ]
    },
    gallery: {
        title: "Cultural Galleries",
        description: "Discover our collection of cultural spaces that celebrate Egyptian art, history, and contemporary creativity through rotating exhibitions and permanent installations.",
        images: [
            "Img/resting room.jpg",
            "Img/lobby 1.jpg",
            "Img/bedroom 2.jpg"
        ],
        features: [
            {
                title: "Exhibition Spaces",
                desc: "Multiple galleries showcasing local and international artists"
            },
            {
                title: "Cultural Events",
                desc: "Regular lectures, workshops, and artistic performances"
            },
            {
                title: "Heritage Center",
                desc: "Interactive displays about the building's history"
            },
            {
                title: "Community Access",
                desc: "Public programming that connects hotel guests with local culture"
            }
        ]
    },
    amenities: {
        title: "Premium Amenities",
        description: "Enjoy a comprehensive range of luxury amenities designed to enhance every aspect of your stay, from business facilities to recreational activities.",
        images: [
            "Img/lobby 1.jpg",
            "Img/lobby 2.jpg",
            "Img/lobby 1.jpg"
        ],
        features: [
            {
                title: "Business Center",
                desc: "Modern meeting rooms and conference facilities"
            },
            {
                title: "Shopping Arcade",
                desc: "Curated selection of local and international brands"
            },
            {
                title: "Valet Services",
                desc: "Comprehensive concierge and personal assistant services"
            },
            {
                title: "Transportation",
                desc: "Airport transfers and city tour arrangements"
            }
        ]
    }
};

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMobileMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Modal functionality
let currentModalSlide = 0;
let currentModalImages = [];

function openModal(spaceType) {
    const modal = document.getElementById('hotelModal');
    const modalSlider = document.getElementById('modalSlider');
    const modalInfo = document.getElementById('modalInfo');
    const modalIndicators = document.getElementById('modalIndicators');
    
    const data = modalData[spaceType];
    if (!data) return;

    currentModalImages = data.images;
    currentModalSlide = 0;

    // Create slider images
    modalSlider.innerHTML = '';
    data.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'modal-slide';
        slide.innerHTML = `<img src="${image}" alt="${data.title}">`;
        modalSlider.appendChild(slide);
    });

    // Create indicators
    modalIndicators.innerHTML = '';
    data.images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `modal-dot ${index === 0 ? 'active' : ''}`;
        dot.onclick = () => goToModalSlide(index);
        modalIndicators.appendChild(dot);
    });

    // Create info content
    modalInfo.innerHTML = `
        <h2 class="modal-title">${data.title}</h2>
        <p class="modal-description">${data.description}</p>
        <div class="modal-features">
            ${data.features.map(feature => `
                <div class="modal-feature">
                    <h4>${feature.title}</h4>
                    <p>${feature.desc}</p>
                </div>
            `).join('')}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('hotelModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function nextModalSlide() {
    currentModalSlide = (currentModalSlide + 1) % currentModalImages.length;
    updateModalSlider();
}

function prevModalSlide() {
    currentModalSlide = (currentModalSlide - 1 + currentModalImages.length) % currentModalImages.length;
    updateModalSlider();
}

function goToModalSlide(index) {
    currentModalSlide = index;
    updateModalSlider();
}

function updateModalSlider() {
    const modalSlider = document.getElementById('modalSlider');
    const modalIndicators = document.getElementById('modalIndicators');
    
    modalSlider.style.transform = `translateX(-${currentModalSlide * 100}%)`;
    
    // Update indicators
    const dots = modalIndicators.querySelectorAll('.modal-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentModalSlide);
    });
}

// Close modal when clicking outside
document.getElementById('hotelModal').addEventListener('click', (e) => {
    if (e.target.id === 'hotelModal') {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('hotelModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevModalSlide();
        if (e.key === 'ArrowRight') nextModalSlide();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const message = e.target.querySelector('textarea').value;
    
    if (name && email && message) {
        // Simulate form submission
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.floating-element, .image-overlay');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});