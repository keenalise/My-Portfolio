// Loading Animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hide');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Navigation Links
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

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Typing Animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when hero section is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'home') {
            const typingElement = document.querySelector('.typing-animation');
            if (typingElement && !typingElement.hasAttribute('data-typed')) {
                typingElement.setAttribute('data-typed', 'true');
                typeWriter(typingElement, "Hello, I'm Prajwal Bhandari", 80);
            }
        }
    });
});

// Observe hero section
const heroSection = document.querySelector('#home');
if (heroSection) {
    observer.observe(heroSection);
}

// Counter Animation for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50; // Adjust speed
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Skills Progress Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for Scroll Animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('animated');
            
            // Trigger specific animations based on section
            if (entry.target.id === 'about') {
                setTimeout(animateCounters, 300);
            }
            
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all sections and cards for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animate-on-scroll class to elements
    const animateElements = document.querySelectorAll('section, .skill-card, .project-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        scrollObserver.observe(el);
    });
});

// Particle Effect on Mouse Move
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        opacity: 0.7;
        animation: particle-fade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-fade {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
        }
        100% {
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mouse move particle effect
let lastParticleTime = 0;
document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastParticleTime > 100) { // Throttle particle creation
        if (Math.random() > 0.8) { // Only create particles 20% of the time
            createParticle(e.clientX, e.clientY);
        }
        lastParticleTime = now;
    }
});

// Form Submission
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#27ae60';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Add loading screen HTML
const loadingHTML = `
    <div class="loading">
        <div class="spinner"></div>
    </div>
`;

// Insert loading screen at the beginning of body
document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.floating-shape');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Animate floating shapes
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add scroll-triggered animations for better performance
const createScrollTrigger = (selector, animation) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    });
};

// Initialize scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    // Fade in animation
    createScrollTrigger('.skill-card', (element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Project cards animation
    createScrollTrigger('.project-card', (element) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8) translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1) translateY(0)';
        }, 100);
    });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced floating shapes animation
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const duration = 10 + Math.random() * 10;
        
        shape.style.animation = `
            float ${duration}s ease-in-out infinite,
            drift-${index} ${duration * 2}s ease-in-out infinite alternate
        `;
        
        // Create unique drift animation for each shape
        const driftKeyframes = `
            @keyframes drift-${index} {
                0% { transform: translate(0px, 0px) rotate(0deg); }
                100% { transform: translate(${randomX}px, ${randomY}px) rotate(360deg); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = driftKeyframes;
        document.head.appendChild(style);
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', function() {
    enhanceFloatingShapes();
});

// Add easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg triggered!
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});