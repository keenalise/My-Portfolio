'use strict';

// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

// Smooth trailing cursor
function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;

    if (cursorTrail) {
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Scale cursor on interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorTrail) {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.8)';
            cursorTrail.style.borderColor = 'rgba(232, 255, 71, 0.8)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorTrail) {
            cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorTrail.style.borderColor = 'rgba(232, 255, 71, 0.4)';
        }
    });
});

// ========================
// NAVIGATION
// ========================
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================
// SCROLL REVEAL
// ========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

            setTimeout(() => {
                el.classList.add('revealed');
            }, delay);

            revealObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach(el => {
    revealObserver.observe(el);
});

// ========================
// COUNTER ANIMATION
// ========================
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(el => {
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.3 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) statsObserver.observe(statsRow);

// ========================
// SKILL BAR ANIMATION
// ========================
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, i * 120);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsList = document.querySelector('.skills-list');
if (skillsList) skillsObserver.observe(skillsList);

// ========================
// HERO PARALLAX (subtle)
// ========================
const heroBgText = document.querySelector('.hero-bg-text');
if (heroBgText) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBgText.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }, { passive: true });
}

// ========================
// CONTACT FORM
// ========================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btnSpan = submitBtn.querySelector('span');
        const originalText = btnSpan.textContent;

        submitBtn.disabled = true;
        btnSpan.textContent = 'Sending...';

        setTimeout(() => {
            btnSpan.textContent = 'Message Sent ✓';
            submitBtn.style.background = '#4ade80';

            contactForm.reset();

            setTimeout(() => {
                btnSpan.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1800);
    });
}

// ========================
// ACTIVE NAV LINK
// ========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.style.color = '';
            });
            const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.style.color = 'var(--accent)';
        }
    });
}, {
    threshold: 0.4
});

sections.forEach(section => navObserver.observe(section));

// ========================
// TYPED HERO LABEL
// ========================
// Small rotating status messages in hero label
const statusMessages = [
    'Available for opportunities',
    'Open to internships',
    'Based in Kathmandu',
    'Passionate about AI & ML'
];

let statusIndex = 0;
const labelEl = document.querySelector('.hero-label');

if (labelEl) {
    const dot = labelEl.querySelector('.label-dot');
    const textNode = labelEl.childNodes[labelEl.childNodes.length - 1];

    setInterval(() => {
        statusIndex = (statusIndex + 1) % statusMessages.length;
        labelEl.style.opacity = '0';
        labelEl.style.transform = 'translateY(-6px)';
        labelEl.style.transition = 'opacity 0.3s, transform 0.3s';

        setTimeout(() => {
            // rebuild label content
            while (labelEl.firstChild) labelEl.removeChild(labelEl.firstChild);
            labelEl.appendChild(dot);
            labelEl.appendChild(document.createTextNode(' ' + statusMessages[statusIndex]));
            labelEl.style.opacity = '1';
            labelEl.style.transform = 'translateY(0)';
        }, 320);
    }, 3500);
}

// ========================
// KONAMI CODE EASTER EGG
// ========================
const konamiSeq = [38,38,40,40,37,39,37,39,66,65];
let konamiProgress = [];

document.addEventListener('keydown', (e) => {
    konamiProgress.push(e.keyCode);
    if (konamiProgress.length > konamiSeq.length) konamiProgress.shift();

    if (konamiProgress.join(',') === konamiSeq.join(',')) {
        document.body.style.transition = 'filter 0.5s';
        document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(360deg)';
            setTimeout(() => {
                document.body.style.filter = '';
                document.body.style.transition = '';
            }, 500);
        }, 500);
        konamiProgress = [];
    }
});