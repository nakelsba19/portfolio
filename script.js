/* ============================================
   SALIM OUEDRAOGO — Portfolio
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // === Cursor Glow Effect ===
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    // === Hero Particles ===
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // === Typing Effect ===
    const roles = [
        'Graphic Designer',
        'Web Developer',
        'Digital Strategist',
        'Formateur en Marketing Digital',
        'Community Manager',
        'Brand Designer'
    ];

    const typedRole = document.getElementById('typedRole');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeRole() {
        const current = roles[roleIndex];

        if (isDeleting) {
            typedRole.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedRole.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(typeRole, typeSpeed);
    }

    typeRole();

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        sections.forEach((section) => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // === Mobile Navigation ===
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // === Counter Animation ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // === Scroll Reveal ===
    const revealElements = document.querySelectorAll(
        '.service-card, .timeline-item, .skill-category, .portfolio-item, .formation-card, .contact-method, .section-header, .about-text, .about-cards, .formation-intro, .formation-topics, .contact-form, .contact-info'
    );

    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach((el) => observer.observe(el));

    // Counter observer
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        }, { threshold: 0.5 });
        counterObserver.observe(heroStats);
    }

    // === Portfolio Filter ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioItems.forEach((item) => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.position = 'relative';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.position = 'absolute';
                        }
                    }, 400);
                }
            });
        });
    });

    // === Contact Form ===
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Message envoyé !</span><i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
});
