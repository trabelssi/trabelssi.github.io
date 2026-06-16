// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.loading-progress');
    const percentage = document.querySelector('.loading-percentage');
    
    let count = 0;
    const interval = setInterval(() => {
        count += Math.random() * 10;
        if (count >= 100) {
            count = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        }
        progress.style.width = count + '%';
        percentage.textContent = Math.floor(count) + '%';
    }, 100);
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and major elements (excluding timeline-item - has its own observer)
document.querySelectorAll('section, .service-card, .project-item, .tech-item').forEach(el => {
    observer.observe(el);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
}, { passive: true });

// Prevent initial loading screen overflow
document.body.style.overflow = 'hidden';

// Scroll Progress Bar
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
}, { passive: true });

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated Counter
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observe stat numbers for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Typing Effect for About Section
const aboutTexts = [
    "Network & Embedded Systems Engineer from Tunisia 🇹🇳",
    "Building intelligent IoT solutions & network platforms ",
    "Specializing in STM32, ESP32, Raspberry Pi & Arduino ",
    "Expert in SNMP, VLANs, Network Security & Automation ",
    "AI-powered solutions with Machine Learning & Deep Learning "
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.querySelector('.typed-text');
const typingSpeed = 50;
const deletingSpeed = 30;
const pauseDuration = 2000;

function typeText() {
    const currentText = aboutTexts[textIndex];
    
    if (!isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseDuration);
            return;
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % aboutTexts.length;
            setTimeout(typeText, 500);
            return;
        }
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect after loading
setTimeout(typeText, 2000);

// 3D Tilt Effect for Service Cards
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-bg-effects');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });

// Enhanced fade-in animations with stagger (excluding timeline-item)
const fadeElements = document.querySelectorAll('.project-item, .tech-item');
fadeElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
});

// Add glitch effect to hero name on hover
const heroName = document.querySelector('.hero-name');
if (heroName) {
    heroName.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s ease-in-out';
    });
    
    heroName.addEventListener('animationend', function() {
        this.style.animation = 'fadeInUp 1s ease-out, float 6s ease-in-out infinite';
    });
}

// Add glitch animation
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(style);

// Smooth reveal for sections has been moved to creative scroll effects section below


// Skills Progress Animation - Circular
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add visible class to item with delay
            setTimeout(() => {
                entry.target.classList.add('visible');
                
                // Animate circular progress
                const circle = entry.target.querySelector('.progress-ring-circle');
                if (circle) {
                    const progress = parseInt(circle.getAttribute('data-progress'));
                    const radius = circle.r.baseVal.value;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (progress / 100) * circumference;
                    
                    setTimeout(() => {
                        circle.style.strokeDashoffset = offset;
                    }, 200);
                }
            }, index * 150);
            
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-progress-section');
if (skillsSection) {
    const skillItems = skillsSection.querySelectorAll('.skill-progress-item');
    skillItems.forEach(item => {
        progressObserver.observe(item);
    });
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'grid';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 10);
            } else {
                const categories = item.getAttribute('data-category');
                if (categories && categories.includes(filterValue)) {
                    item.style.display = 'grid';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Add transition styles to project items
projectItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Enhanced hover effects for tech items
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth animation for tech categories
const techCategories = document.querySelectorAll('.tech-category');
techCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
});

// Add ripple effect to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Lazy load project images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.project-placeholder').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add count-up animation for skill percentages
function animateSkillCount(element) {
    const target = parseInt(element.textContent);
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '%';
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + '%';
        }
    };

    updateCount();
}

// Observe skill percentages
const skillPercentObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateSkillCount(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-percentage').forEach(percent => {
    skillPercentObserver.observe(percent);
});


// ========================================
// CREATIVE CERTIFICATIONS REVEAL ANIMATION
// ========================================

const certificationCards = document.querySelectorAll('.achievement-card');
const certificationsSection = document.querySelector('.achievements-section');

if (certificationsSection && certificationCards.length > 0) {
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal cards with staggered delay
                certificationCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal-cert');
                        
                        // Add a burst effect
                        const icon = card.querySelector('.achievement-icon');
                        if (icon) {
                            // Create particle burst
                            for (let i = 0; i < 8; i++) {
                                const particle = document.createElement('div');
                                particle.style.position = 'absolute';
                                particle.style.width = '4px';
                                particle.style.height = '4px';
                                particle.style.background = 'var(--accent)';
                                particle.style.borderRadius = '50%';
                                particle.style.pointerEvents = 'none';
                                particle.style.top = '50%';
                                particle.style.left = '50%';
                                
                                const angle = (Math.PI * 2 * i) / 8;
                                const velocity = 50 + Math.random() * 30;
                                const tx = Math.cos(angle) * velocity;
                                const ty = Math.sin(angle) * velocity;
                                
                                icon.style.position = 'relative';
                                icon.appendChild(particle);
                                
                                particle.animate([
                                    { 
                                        transform: 'translate(-50%, -50%) scale(1)',
                                        opacity: 1
                                    },
                                    { 
                                        transform: `translate(${tx}px, ${ty}px) scale(0)`,
                                        opacity: 0
                                    }
                                ], {
                                    duration: 800,
                                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                }).onfinish = () => particle.remove();
                            }
                        }
                    }, index * 150); // Stagger by 150ms
                });
                
                certObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '-50px'
    });

    certObserver.observe(certificationsSection);
}

// Add floating particles in certifications section background
if (certificationsSection) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'cert-bg-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
            background: var(--accent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.2 + Math.random() * 0.3};
            pointer-events: none;
            animation: floatParticle ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        certificationsSection.appendChild(particle);
    }
    
    // Add CSS for floating particles
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${-20 + Math.random() * 40}px, ${-30 + Math.random() * 60}px);
            }
            50% {
                transform: translate(${-30 + Math.random() * 60}px, ${-20 + Math.random() * 40}px);
            }
            75% {
                transform: translate(${-10 + Math.random() * 20}px, ${-40 + Math.random() * 80}px);
            }
        }
    `;
    document.head.appendChild(particleStyle);
}


// ========================================
// CERTIFICATIONS HORIZONTAL SCROLL
// ========================================

const certificationsScroll = document.getElementById('certificationsScroll');
const certScrollLeft = document.querySelector('.cert-scroll-left');
const certScrollRight = document.querySelector('.cert-scroll-right');
const certDots = document.querySelectorAll('.cert-dot');
const certScrollHint = document.querySelector('.cert-scroll-hint');

if (certificationsScroll && certScrollLeft && certScrollRight) {
    // Scroll Navigation Buttons
    certScrollLeft.addEventListener('click', () => {
        certificationsScroll.scrollBy({
            left: -450,
            behavior: 'smooth'
        });
    });

    certScrollRight.addEventListener('click', () => {
        certificationsScroll.scrollBy({
            left: 450,
            behavior: 'smooth'
        });
    });

    // Update progress dots on scroll
    certificationsScroll.addEventListener('scroll', () => {
        const scrollLeft = certificationsScroll.scrollLeft;
        const cardWidth = 400 + 40; // card width + gap
        const currentIndex = Math.round(scrollLeft / (cardWidth * 3)); // 3 cards per "page"

        certDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Hide/show nav buttons at edges
        if (scrollLeft <= 10) {
            certScrollLeft.style.opacity = '0.3';
            certScrollLeft.style.pointerEvents = 'none';
        } else {
            certScrollLeft.style.opacity = '1';
            certScrollLeft.style.pointerEvents = 'all';
        }

        const maxScroll = certificationsScroll.scrollWidth - certificationsScroll.clientWidth;
        if (scrollLeft >= maxScroll - 10) {
            certScrollRight.style.opacity = '0.3';
            certScrollRight.style.pointerEvents = 'none';
        } else {
            certScrollRight.style.opacity = '1';
            certScrollRight.style.pointerEvents = 'all';
        }
    });

    // Click on progress dots to scroll
    certDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = 400 + 40; // card width + gap
            certificationsScroll.scrollTo({
                left: index * (cardWidth * 3),
                behavior: 'smooth'
            });
        });
    });

    // Keyboard navigation for certifications (Alt + Arrow keys to avoid conflict)
    document.addEventListener('keydown', (e) => {
        // Check if user is in certifications section viewport
        const rect = certificationsScroll.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inView) {
            if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                certificationsScroll.scrollBy({
                    left: -450,
                    behavior: 'smooth'
                });
            } else if (e.altKey && e.key === 'ArrowRight') {
                e.preventDefault();
                certificationsScroll.scrollBy({
                    left: 450,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Mouse drag to scroll
    let isDragging = false;
    let startX;
    let scrollLeftPos;

    certificationsScroll.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - certificationsScroll.offsetLeft;
        scrollLeftPos = certificationsScroll.scrollLeft;
    });

    certificationsScroll.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    certificationsScroll.addEventListener('mouseup', () => {
        isDragging = false;
    });

    certificationsScroll.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();
        const x = e.pageX - certificationsScroll.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        certificationsScroll.scrollLeft = scrollLeftPos - walk;
    });

    // Initial state
    certScrollLeft.style.opacity = '0.3';
    certScrollLeft.style.pointerEvents = 'none';

    // Hide scroll hint after first interaction
    if (certScrollHint) {
        certificationsScroll.addEventListener('scroll', () => {
            certScrollHint.style.opacity = '0';
            setTimeout(() => {
                certScrollHint.style.display = 'none';
            }, 300);
        }, { once: true });
    }
}


// Horizontal Scroll for Projects Section
const projectsScroll = document.getElementById('projectsScroll');
const scrollNavLeft = document.querySelector('.scroll-nav-left');
const scrollNavRight = document.querySelector('.scroll-nav-right');
const progressDots = document.querySelectorAll('.progress-dot');
const projectCards = document.querySelectorAll('.horizontal-project-card');

if (projectsScroll && scrollNavLeft && scrollNavRight) {
    // Scroll Navigation Buttons
    scrollNavLeft.addEventListener('click', () => {
        projectsScroll.scrollBy({
            left: -850,
            behavior: 'smooth'
        });
    });

    scrollNavRight.addEventListener('click', () => {
        projectsScroll.scrollBy({
            left: 850,
            behavior: 'smooth'
        });
    });

    // Update progress dots on scroll
    projectsScroll.addEventListener('scroll', () => {
        const scrollLeft = projectsScroll.scrollLeft;
        const cardWidth = 800 + 48; // card width + gap
        const currentIndex = Math.round(scrollLeft / cardWidth);

        progressDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Hide/show nav buttons at edges
        if (scrollLeft <= 10) {
            scrollNavLeft.style.opacity = '0.3';
            scrollNavLeft.style.pointerEvents = 'none';
        } else {
            scrollNavLeft.style.opacity = '1';
            scrollNavLeft.style.pointerEvents = 'all';
        }

        const maxScroll = projectsScroll.scrollWidth - projectsScroll.clientWidth;
        if (scrollLeft >= maxScroll - 10) {
            scrollNavRight.style.opacity = '0.3';
            scrollNavRight.style.pointerEvents = 'none';
        } else {
            scrollNavRight.style.opacity = '1';
            scrollNavRight.style.pointerEvents = 'all';
        }
    });

    // Click on progress dots to scroll
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = 800 + 48; // card width + gap
            projectsScroll.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });

    // Keyboard navigation (Arrow keys) - Only when projects section is in view
    document.addEventListener('keydown', (e) => {
        // Check if projects section is in viewport
        const rect = projectsScroll.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inView && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            if (e.key === 'ArrowLeft') {
                projectsScroll.scrollBy({
                    left: -850,
                    behavior: 'smooth'
                });
            } else if (e.key === 'ArrowRight') {
                projectsScroll.scrollBy({
                    left: 850,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Mouse drag to scroll
    let isDown = false;
    let startX;
    let scrollLeftPos;

    projectsScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsScroll.style.cursor = 'grabbing';
        startX = e.pageX - projectsScroll.offsetLeft;
        scrollLeftPos = projectsScroll.scrollLeft;
    });

    projectsScroll.addEventListener('mouseleave', () => {
        isDown = false;
        projectsScroll.style.cursor = 'grab';
    });

    projectsScroll.addEventListener('mouseup', () => {
        isDown = false;
        projectsScroll.style.cursor = 'grab';
    });

    projectsScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        e.stopPropagation();
        const x = e.pageX - projectsScroll.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        projectsScroll.scrollLeft = scrollLeftPos - walk;
    });

    // Initial state
    projectsScroll.style.cursor = 'grab';
    scrollNavLeft.style.opacity = '0.3';
    scrollNavLeft.style.pointerEvents = 'none';

    // Hide scroll hint after first interaction
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        projectsScroll.addEventListener('scroll', () => {
            scrollHint.style.opacity = '0';
            setTimeout(() => {
                scrollHint.style.display = 'none';
            }, 300);
        }, { once: true });
    }

    // Intersection Observer for card animations
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3, root: projectsScroll });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
}


// ========================================
// CREATIVE GLOBAL SCROLL EFFECTS
// ========================================

// Scroll Progress Circle
const progressCircle = document.getElementById('progressCircle');
const progressPercentage = document.getElementById('progressPercentage');

if (progressCircle && progressPercentage) {
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressPercentage.textContent = Math.round(scrollPercent) + '%';
    });
}

// Scroll Navigation Dots
const scrollDots = document.querySelectorAll('.scroll-dot-nav');
const sections = ['home', 'about', 'services', 'work', 'contact'];

scrollDots.forEach((dot, index) => {
    // Click to scroll to section
    dot.addEventListener('click', () => {
        const targetSection = document.getElementById(sections[index]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active dot on scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveDot();
            ticking = false;
        });
        ticking = true;
    }
});

function updateActiveDot() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                scrollDots.forEach(dot => dot.classList.remove('active'));
                scrollDots[index]?.classList.add('active');
            }
        }
    });
}

// Initial active dot
updateActiveDot();

// Parallax Effect on Hero Section
const heroSection = document.querySelector('.hero');
const heroEffects = document.querySelector('.hero-bg-effects');

if (heroSection && heroEffects) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroEffects.style.transform = `translateY(${rate}px)`;
    });
}

// Section Reveal Animation
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    section.classList.add('reveal-section');
    revealObserver.observe(section);
});

// Staggered Animation for Items (excluding timeline-item - has its own animation)
const staggerItems = document.querySelectorAll('.service-card, .tech-item');
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

staggerItems.forEach(item => {
    item.classList.add('stagger-item');
    staggerObserver.observe(item);
});

// Scroll Velocity Indicator
let lastScrollTop = 0;
let scrollVelocity = 0;
const velocityLine = document.getElementById('velocityLine');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    scrollVelocity = Math.abs(scrollTop - lastScrollTop);
    lastScrollTop = scrollTop;

    if (velocityLine) {
        if (scrollVelocity > 20) {
            velocityLine.classList.add('active');
            velocityLine.style.background = `linear-gradient(90deg, var(--accent), rgba(0, 255, 0, ${scrollVelocity / 100}))`;
        } else {
            velocityLine.classList.remove('active');
        }
    }
});

// Scroll Direction Indicator
let lastScrollY = window.scrollY;
const scrollDirectionElement = document.getElementById('scrollDirection');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (scrollDirectionElement && Math.abs(currentScrollY - lastScrollY) > 50) {
        if (currentScrollY > lastScrollY) {
            scrollDirectionElement.innerHTML = '<i class="fas fa-chevron-down"></i>';
        } else {
            scrollDirectionElement.innerHTML = '<i class="fas fa-chevron-up"></i>';
        }
        
        scrollDirectionElement.classList.add('show');
        setTimeout(() => {
            scrollDirectionElement.classList.remove('show');
        }, 500);
    }
    
    lastScrollY = currentScrollY;
});

// Animated Line on Scroll
const animatedLines = document.querySelectorAll('.section-title');
const lineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated-line', 'active');
        }
    });
}, { threshold: 0.5 });

animatedLines.forEach(line => {
    lineObserver.observe(line);
});

// Section Border Animation
const sectionHeaders = document.querySelectorAll('.section-header');
const borderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-border-animated', 'active');
        }
    });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => {
    borderObserver.observe(header);
});

// Smooth Section Transitions
const sectionTransitions = document.querySelectorAll('.services-section, .work-section, .tech-stack');
const transitionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-transition', 'in-view');
        }
    });
}, { threshold: 0.2 });

sectionTransitions.forEach(section => {
    transitionObserver.observe(section);
});

// Zoom Effect on Scroll for Certain Elements
const zoomElements = document.querySelectorAll('.hero-container, .about-grid');
const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('zoom-on-scroll', 'zoomed');
        } else {
            entry.target.classList.remove('zoomed');
        }
    });
}, { threshold: 0.3 });

zoomElements.forEach(element => {
    zoomObserver.observe(element);
});

// Gradient Background Animation
const gradientSections = document.querySelectorAll('.about-section, .experience-section');
gradientSections.forEach(section => {
    section.classList.add('gradient-bg-animated');
});

// Section Number Float Animation
window.addEventListener('scroll', () => {
    sectionHeaders.forEach(header => {
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            header.classList.add('in-view');
        }
    });
});

// Smooth Scroll with Easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Blur Effect on Fast Scroll (Optional - can be distracting)
// Uncomment if you want this effect
/*
let blurTimeout;
window.addEventListener('scroll', () => {
    document.body.classList.add('blur-on-scroll', 'blurred');
    
    clearTimeout(blurTimeout);
    blurTimeout = setTimeout(() => {
        document.body.classList.remove('blurred');
    }, 150);
});
*/


// ========================================
// ADVANCED FEATURES & ENHANCEMENTS
// ========================================

// Theme Switcher
const themeSwitcher = document.getElementById('themeSwitcher');
const themes = ['theme-green', 'theme-blue', 'theme-purple', 'theme-red', 'theme-yellow', 'theme-cyan'];
let currentThemeIndex = 0;

if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
        // Remove current theme
        document.body.classList.remove(...themes);
        
        // Apply next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        document.body.classList.add(themes[currentThemeIndex]);
        
        // Save preference
        localStorage.setItem('portfolio-theme', themes[currentThemeIndex]);
        
        // Visual feedback
        themeSwitcher.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => {
            themeSwitcher.style.transform = 'rotate(0deg) scale(1)';
        }, 300);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        document.body.classList.add(savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    }
}

// Sound Toggle with Ambient Background
const soundToggle = document.getElementById('soundToggle');
let ambientSound = null;
let isSoundPlaying = false;

if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        if (!ambientSound) {
            // Create ambient sound (using Web Audio API)
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            ambientSound = { oscillator, audioContext, gainNode };
        }
        
        if (isSoundPlaying) {
            ambientSound.gainNode.gain.exponentialRampToValueAtTime(0.001, ambientSound.audioContext.currentTime + 0.5);
            soundToggle.classList.add('muted');
            isSoundPlaying = false;
        } else {
            if (ambientSound.audioContext.state === 'suspended') {
                ambientSound.audioContext.resume();
            }
            if (!ambientSound.oscillator.started) {
                ambientSound.oscillator.start();
                ambientSound.oscillator.started = true;
            }
            ambientSound.gainNode.gain.exponentialRampToValueAtTime(0.02, ambientSound.audioContext.currentTime + 0.5);
            soundToggle.classList.remove('muted');
            isSoundPlaying = true;
        }
    });
}

// Konami Code Easter Egg (↑↑↓↓←→←→BA)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
const easterEggOverlay = document.getElementById('easterEgg');
const matrixCanvas = document.getElementById('matrixCanvas');

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase() || e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    if (easterEggOverlay) {
        easterEggOverlay.classList.add('active');
        startMatrixRain();
        
        // Confetti effect
        createConfetti();
    }
}

function closeEasterEgg() {
    if (easterEggOverlay) {
        easterEggOverlay.classList.remove('active');
        stopMatrixRain();
    }
}

// Make closeEasterEgg global
window.closeEasterEgg = closeEasterEgg;

// Matrix Rain Effect
let matrixInterval;

function startMatrixRain() {
    if (!matrixCanvas) return;
    
    matrixCanvas.classList.add('active');
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    matrixInterval = setInterval(draw, 50);
}

function stopMatrixRain() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
    }
    if (matrixCanvas) {
        matrixCanvas.classList.remove('active');
    }
}

// Confetti Effect
function createConfetti() {
    const colors = ['#00ff00', '#00cc00', '#00ff88', '#00ffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '99999';
            confetti.style.pointerEvents = 'none';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            document.body.appendChild(confetti);
            
            const duration = 2000 + Math.random() * 2000;
            const rotation = Math.random() * 360;
            
            confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), duration);
        }, i * 20);
    }
}

// Particle Network Background
const particleCanvas = document.getElementById('particleNetwork');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;
    
    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > particleCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > particleCanvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 0, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize handler
    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
}

// Enhanced Scroll Animations for New Sections
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

achievementCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    achievementObserver.observe(card);
});

// Double Click on Logo for Secret Feature
const logo = document.querySelector('.nav-logo');
let logoClickCount = 0;
let logoClickTimer;

if (logo) {
    logo.addEventListener('click', () => {
        logoClickCount++;
        
        clearTimeout(logoClickTimer);
        
        if (logoClickCount === 3) {
            // Triple click activates developer mode
            document.body.classList.toggle('developer-mode');
            logoClickCount = 0;
        }
        
        logoClickTimer = setTimeout(() => {
            logoClickCount = 0;
        }, 500);
    });
}

// Auto-scroll to section on page load with hash
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Performance Monitor (Easter Egg)
let fpsCounter = 0;
let lastTime = performance.now();

function monitorPerformance() {
    const now = performance.now();
    const delta = now - lastTime;
    const fps = Math.round(1000 / delta);
    
    fpsCounter = fps;
    lastTime = now;
    
    requestAnimationFrame(monitorPerformance);
}

monitorPerformance();


// ========================================
// FOOTER ENHANCEMENTS
// ========================================

// Current year
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Visitor Counter (simulated - replace with real analytics)
const visitorCountEl = document.getElementById('visitorCount');
if (visitorCountEl) {
    let visits = localStorage.getItem('portfolio-visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolio-visits', visits);
    
    // Animate counter
    let count = 0;
    const target = visits;
    const duration = 1000;
    const increment = target / (duration / 16);
    
    const counterInterval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target;
            clearInterval(counterInterval);
        }
        visitorCountEl.textContent = Math.floor(count).toLocaleString();
    }, 16);
}

// Last update date
const lastUpdateEl = document.getElementById('lastUpdate');
if (lastUpdateEl) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    lastUpdateEl.textContent = `Last Updated: ${months[now.getMonth()]} ${now.getFullYear()}`;
}

// ========================================
// PAGE LOAD PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', () => {
    // Performance monitoring without console logs
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    // Store for analytics if needed
    localStorage.setItem('pageLoadTime', pageLoadTime);
});

// ========================================
// SMOOTH ANIMATIONS ON SCROLL
// ========================================

// Animate elements when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-smooth');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Apply to various elements
document.querySelectorAll('.footer-col').forEach(el => {
    animateOnScroll.observe(el);
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus search (if you add search later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
    }
    
    // Escape: Close any modals
    if (e.key === 'Escape') {
        closeEasterEgg();
    }
});

// ========================================
// COPY TO CLIPBOARD HELPERS
// ========================================

// Click email to copy
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('dblclick', (e) => {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            // Visual feedback
            const originalText = link.textContent;
            link.textContent = '✓ Copied!';
            link.style.color = 'var(--accent)';
            
            setTimeout(() => {
                link.textContent = originalText;
                link.style.color = '';
            }, 2000);
        });
    });
});

// ========================================
// ADVANCED SCROLL EFFECTS
// ========================================

let lastScrollPosition = 0;
let scrollDirection = 'down';

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > lastScrollPosition) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    lastScrollPosition = currentScrollPosition;
    
    // Add class to body for CSS targeting
    document.body.setAttribute('data-scroll-direction', scrollDirection);
}, { passive: true });

// ========================================
// LOADING COMPLETE
// ========================================

// ========================================
// PROFILE CARD STICKY SCROLL - REMOVED
// Now handled by CSS position: sticky
// ========================================


// ========================================
// TIMELINE PROGRESS ANIMATION ON SCROLL
// ========================================

const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class with a slight delay for smoother effect
                setTimeout(() => {
                    entry.target.classList.add('active');
                    
                    // Add particle burst effect on activation
                    createTimelineParticles(entry.target);
                }, 100);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the item is visible
        rootMargin: '-80px 0px -80px 0px' // Offset for better timing
    });

    // Observe all timeline items
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Create particle burst effect when timeline item activates
    function createTimelineParticles(item) {
        const dot = item.querySelector('.timeline-year span');
        if (!dot) return;
        
        const rect = dot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top - 40; // Position at the dot
        
        // Create 8 particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 10px var(--accent);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 8;
            const velocity = 40 + Math.random() * 20;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => particle.remove();
        }
    }
}


// ========================================
// SERVICE CARDS ENHANCED ANIMATION
// ========================================

const serviceCards = document.querySelectorAll('.service-card');

if (serviceCards.length > 0) {
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add particle effect on reveal
                    createServiceParticles(entry.target);
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    serviceCards.forEach(card => {
        serviceObserver.observe(card);
    });
    
    // Particle effect when service card appears
    function createServiceParticles(card) {
        const icon = card.querySelector('.service-icon');
        if (!icon) return;
        
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create particles around the icon
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: var(--accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${centerX}px;
                top: ${centerY}px;
                box-shadow: 0 0 8px var(--accent);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 60 + Math.random() * 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => particle.remove();
        }
    }
    
    // Add mouse move parallax effect
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotateX(0) rotateY(0)';
            }
        });
    });
}


// ========================================
// TECH STACK CLOUD TAG ANIMATION
// ========================================

const techCloudItems = document.querySelectorAll('.tech-cloud-item');
const techFilterBtns = document.querySelectorAll('.tech-filter-btn');

// Animate tech items on scroll
if (techCloudItems.length > 0) {
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    techCloudItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 50);
                    });
                }, 200);
                techObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const techContainer = document.querySelector('.tech-cloud-container');
    if (techContainer) {
        techObserver.observe(techContainer);
    }
}

// Filter functionality
if (techFilterBtns.length > 0) {
    techFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            techFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            techCloudItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all') {
                    item.classList.remove('filtered');
                } else {
                    if (category === filter) {
                        item.classList.remove('filtered');
                    } else {
                        item.classList.add('filtered');
                    }
                }
            });
        });
    });
}


// ========================================
// AI CHATBOT - NO API VERSION
// ========================================

const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Knowledge Base about Mohamed Amine Trabelsi
const knowledgeBase = {
    name: "Mohamed Amine Trabelsi",
    title: "Telecommunications Engineer",
    location: "Monastir, Tunisia",
    email: "aminetrabls021@gmail.com",
    phone: "+216 22 235 413",
    
    skills: {
        programming: ["Python", "JavaScript", "C/C++", "HTML5", "CSS3", "SQL"],
        frameworks: ["React", "Node.js", "Laravel", "TensorFlow", "PyTorch", "FreeRTOS"],
        infrastructure: ["MySQL", "MongoDB", "AWS", "Azure", "Docker", "Linux"],
        hardware: ["STM32", "ESP32", "Arduino", "Raspberry Pi", "VHDL", "SIMATIC PLCs"],
        networking: ["Cisco", "SNMP", "VLANs", "IPsec VPN", "Network Security", "HSRP"],
        tools: ["Git", "GitHub", "VS Code", "Wireshark", "GNS3", "MATLAB"]
    },
    
    expertise: [
        "Network Engineering & Infrastructure (95%)",
        "Embedded Systems Development (90%)",
        "IoT & Hardware Integration (92%)",
        "AI & Machine Learning (85%)",
        "Full-Stack Development (88%)",
        "Network Security & Protocols (90%)"
    ],
    
    experience: [
        {
            role: "Final Year Project",
            company: "Sancella Tunisie",
            year: "2025",
            description: "Developed Network Management & Quality Assurance Platform with Laravel, React.js, SNMP, ICMP monitoring"
        },
        {
            role: "Telecommunications Intern",
            company: "Tunisie Telecom",
            year: "2024",
            description: "Optimized antenna orientations, performed coverage analysis, automated data analysis with Python"
        },
        {
            role: "Embedded Systems & ML Intern",
            company: "Faculty of Sciences of Monastir",
            year: "2023",
            description: "Developed AI-powered gesture recognition with ResNet50V2 on Raspberry Pi"
        }
    ],
    
    projects: [
        "Network Monitoring System - Real-time network device monitoring with SNMP, ICMP, ARP protocols (https://github.com/trabelssi/network-monitoring-system)",
        "Sign Language Recognition System (SLRS) - AI-powered gesture recognition using deep learning and computer vision (https://github.com/trabelssi/-Sign-Language-Recognition-System-SLRS-)",
        "Campus Network System - Enterprise network infrastructure with VLANs, security protocols, and access control (https://github.com/trabelssi/-Campus-Network-System-)",
        "Network Analyzer Tool - Advanced packet inspection and network traffic analysis tool (https://github.com/trabelssi/network_analyzer_tool)",
        "Tri-Sector Antenna Coverage Optimizer - Antenna orientation optimization for telecommunications towers (https://github.com/trabelssi/Tri-sector-antenna-coverage-optimizer)",
        "Embedded Systems Monitor - Real-time monitoring and control system for embedded devices (https://github.com/trabelssi/Embedded-Systems-Monitor)"
    ],
    
    education: [
        "Master's in Telecommunications & Embedded Systems - University of Monastir (2023)",
        "Bachelor's in Electronics, Electrical Engineering & Automation - University of Monastir (2020)"
    ],
    
    certifications: [
        "AI Engineer - 365 Data Science",
        "Building Transformer-Based NLP - NVIDIA",
        "Microsoft Azure Fundamentals (AZ-900)",
        "Deep Learning Specialization",
        "Cisco Networking Basics"
    ]
};

// Chatbot responses based on keywords
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Greetings
    if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon)/)) {
        return `Hello! I'm Mohamed Amine's AI assistant. I can tell you about his skills, experience, projects, and education. What would you like to know?`;
    }
    
    // Skills
    if (message.includes('skill') || message.includes('technology') || message.includes('tech stack') || message.includes('programming')) {
        return `Mohamed Amine has expertise in:\n\n💻 Programming: ${knowledgeBase.skills.programming.join(', ')}\n\n🚀 Frameworks: ${knowledgeBase.skills.frameworks.join(', ')}\n\n🔧 Hardware: ${knowledgeBase.skills.hardware.join(', ')}\n\n🌐 Networking: ${knowledgeBase.skills.networking.join(', ')}\n\nHis strongest areas are Network Engineering (95%) and IoT Development (92%).`;
    }
    
    // Experience
    if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('intern')) {
        let response = "Here's Mohamed Amine's professional experience:\n\n";
        knowledgeBase.experience.forEach(exp => {
            response += `📍 ${exp.role} at ${exp.company} (${exp.year})\n${exp.description}\n\n`;
        });
        return response;
    }
    
    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
        return `Mohamed Amine has worked on impressive projects:\n\n${knowledgeBase.projects.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\nEach project demonstrates his expertise in telecommunications, IoT, and network engineering.`;
    }
    
    // Education
    if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
        return `Mohamed Amine's educational background:\n\n${knowledgeBase.education.map(e => `🎓 ${e}`).join('\n')}\n\nHe specialized in telecommunications, embedded systems, IoT, and network engineering.`;
    }
    
    // Certifications
    if (message.includes('certification') || message.includes('certificate') || message.includes('course')) {
        return `Mohamed Amine holds ${knowledgeBase.certifications.length}+ certifications:\n\n${knowledgeBase.certifications.map(c => `✓ ${c}`).join('\n')}\n\nThese cover AI, cloud computing, networking, and deep learning.`;
    }
    
    // Contact
    if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
        return `You can reach Mohamed Amine:\n\n📧 Email: ${knowledgeBase.email}\n📱 Phone: ${knowledgeBase.phone}\n📍 Location: ${knowledgeBase.location}\n\nFeel free to get in touch for opportunities or collaborations!`;
    }
    
    // Networking
    if (message.includes('network') || message.includes('cisco') || message.includes('vlan')) {
        return `Mohamed Amine is an expert in network engineering with 95% proficiency. He specializes in:\n\n• Cisco networking equipment\n• SNMP & ICMP protocols\n• VLANs & HSRP configuration\n• IPsec VPN & network security\n• Real-time monitoring systems\n\nHe built a complete Network Management Platform for his final year project!`;
    }
    
    // IoT / Embedded
    if (message.includes('iot') || message.includes('embedded') || message.includes('arduino') || message.includes('esp32') || message.includes('stm32')) {
        return `Mohamed Amine has strong expertise in IoT and embedded systems (92% proficiency):\n\n• STM32, ESP32, Arduino, Raspberry Pi\n• FreeRTOS for real-time applications\n• SIMATIC PLCs for industrial automation\n• VHDL for hardware design\n• IoT device integration with MQTT\n\nHe's built multiple IoT monitoring systems!`;
    }
    
    // AI/ML
    if (message.includes('ai') || message.includes('machine learning') || message.includes('ml') || message.includes('deep learning') || message.includes('neural')) {
        return `Mohamed Amine has solid AI & Machine Learning skills (85% proficiency):\n\n• TensorFlow & PyTorch frameworks\n• Deep Learning & Neural Networks\n• Computer Vision applications\n• Transfer Learning with ResNet50V2\n• Model deployment on edge devices\n\nHe developed an AI gesture recognition system for his internship!`;
    }
    
    // About
    if (message.includes('who are you') || message.includes('about') || message.includes('tell me about')) {
        return `Mohamed Amine Trabelsi is a ${knowledgeBase.title} from ${knowledgeBase.location}. He specializes in:\n\n• Network Infrastructure & Management\n• Embedded Systems & IoT Development\n• AI & Machine Learning\n• Telecommunications Engineering\n\nHe has 5+ years of experience and 20+ completed projects. Currently available for opportunities in telecommunications and IoT!`;
    }
    
    // Resume
    if (message.includes('resume') || message.includes('cv') || message.includes('download')) {
        return `You can download Mohamed Amine's resume by clicking the "RESUME" button in the navigation bar, or from the contact section. It includes detailed information about his experience, projects, and certifications.`;
    }
    
    // Languages
    if (message.includes('language') || message.includes('speak')) {
        return `Mohamed Amine speaks:\n\n• English (Professional)\n• French (Professional)\n• Arabic (Native)\n\nHe can work in international environments!`;
    }
    
    // Default response
    return `I can help you learn about Mohamed Amine's:\n\n• Skills & Technologies\n• Work Experience\n• Projects\n• Education & Certifications\n• Contact Information\n\nWhat would you like to know?`;
}

// Toggle chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
}

// Send message
function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;
    
    // Add user message
    addMessage(userMessage, 'user');
    chatbotInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate and add bot response with realistic delay
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = generateResponse(userMessage);
        addMessage(botResponse, 'bot');
    }, 800 + Math.random() * 400); // Random delay between 800-1200ms
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom smoothly
    chatbotMessages.scrollTo({
        top: chatbotMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// Typing Indicator
let typingIndicator = null;

function showTypingIndicator() {
    if (!typingIndicator) {
        typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-dots">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        chatbotMessages.appendChild(typingIndicator);
    }
    
    // Trigger animation
    setTimeout(() => {
        typingIndicator.classList.add('active');
    }, 10);
    
    // Scroll to bottom
    chatbotMessages.scrollTo({
        top: chatbotMessages.scrollHeight,
        behavior: 'smooth'
    });
}

function hideTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.classList.remove('active');
        setTimeout(() => {
            if (typingIndicator && typingIndicator.parentNode) {
                typingIndicator.remove();
                typingIndicator = null;
            }
        }, 300);
    }
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Quick question buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-btn')) {
        const question = e.target.getAttribute('data-question');
        chatbotInput.value = question;
        sendMessage();
    }
});

// AI Chatbot functionality loaded
