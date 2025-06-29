
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initNavbarEffects();
    initParticleAnimation();
    initGlitchEffect();
    initContactAnimations();
    initScrollProgress();
});

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
        console.warn('Typing element not found');
        return;
    }

    const texts = JSON.parse(typingElement.getAttribute('data-texts') || '[]');
    if (!texts.length) {
        console.warn('No texts provided for typing animation');
        return;
    }

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 1500;

    function type() {
        const currentText = texts[textIndex];
        typingElement.textContent = currentText.substring(0, charIndex);

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, speed);
    }

    type();
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse?.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler) {
                        navbarToggler.click(); // Simulate click on toggler to close the menu
                    }
                }
            } else {
                console.warn(`Target section ${targetId} not found`);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.neon-card, .skill-item, .social-link');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress') || '0';
                
                setTimeout(() => {
                    progressBar.style.width = `${progress}%`;
                }, 300);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.6 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.neon-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar) {
        console.warn('Navbar not found');
        return;
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 255, 255, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(12px)';
            navbar.style.boxShadow = 'none';
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Particle Animation
function initParticleAnimation() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        particle.style.left = `${randomX}px`;
        particle.style.top = `${randomY}px`;
        
        document.addEventListener('mousemove', function(e) {
            const rect = particle.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width / 2), 2) + 
                Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );
            
            if (distance < 120) {
                const angle = Math.atan2(rect.top - e.clientY, rect.left - e.clientX);
                const force = (120 - distance) / 120;
                const moveX = Math.cos(angle) * force * 60;
                const moveY = Math.sin(angle) * force * 60;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2)`;
                particle.style.boxShadow = `0 0 20px var(--neon-blue)`;
            } else {
                particle.style.transform = 'translate(0, 0) scale(1)';
                particle.style.boxShadow = `0 0 12px var(--neon-blue)`;
            }
        });
    });
}

// Glitch Effect for Hero Title
function initGlitchEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) {
        console.warn('Hero title not found');
        return;
    }

    setInterval(() => {
        if (Math.random() > 0.9) {
            heroTitle.style.transform = 'skew(5deg)';
            heroTitle.style.textShadow = `
                2px 2px #ff0000,
                -2px -2px #00ffff,
                0 0 15px var(--neon-blue),
                0 0 30px var(--neon-blue)
            `;
            
            setTimeout(() => {
                heroTitle.style.transform = 'skew(0deg)';
                heroTitle.style.textShadow = `
                    0 0 12px var(--neon-blue),
                    0 0 24px var(--neon-blue),
                    0 0 36px var(--neon-blue)
                `;
            }, 150);
        }
    }, 2500);
}

// Contact Animations
function initContactAnimations() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(10deg)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized Scroll Handler
const optimizedScrollHandler = debounce(function() {
    // Additional scroll-based logic can be added here
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateMatrixRain();
        konamiCode = [];
    }
});

function activateMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '9999';
    canvas.style.pointerEvents = 'none';
    canvas.style.background = 'rgba(0, 0, 0, 0.85)';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.warn('Canvas context not supported');
        document.body.removeChild(canvas);
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops = Array(columns).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#39ff14';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(draw, 30);
    
    setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(canvas);
    }, 8000);
}

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    setTimeout(() => {
        const firstElements = document.querySelectorAll('.hero-content, .navbar');
        firstElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 400);
});

// Scroll Progress Bar Styling
const style = document.createElement('style');
style.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
        width: 0;
        z-index: 1000;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px var(--neon-blue);
    }
`;
document.head.appendChild(style);
