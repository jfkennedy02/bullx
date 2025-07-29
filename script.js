// Matrix Background Animation
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = "01BULLIX";
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * this.canvas.height;
        }
    }

    draw() {
        // Black background with slight transparency for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Set text properties
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;

        // Draw characters
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i]);

            // Reset drop to top randomly
            if (this.drops[i] > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }

            this.drops[i] += this.fontSize;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.init();
    }
}

// Navigation Toggle
class Navigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.navToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Smooth scrolling for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
}

// Copy to Clipboard Functionality
class ClipboardManager {
    constructor() {
        this.copyBtn = document.getElementById('copyBtn');
        this.contractAddress = document.getElementById('contractAddress');
        this.copyFeedback = document.getElementById('copyFeedback');
        
        this.init();
    }

    init() {
        this.copyBtn.addEventListener('click', () => this.copyAddress());
    }

    async copyAddress() {
        try {
            const address = this.contractAddress.textContent;
            await navigator.clipboard.writeText(address);
            this.showFeedback();
        } catch (err) {
            // Fallback for older browsers
            this.fallbackCopy();
        }
    }

    fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = this.contractAddress.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            this.showFeedback();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        document.body.removeChild(textArea);
    }

    showFeedback() {
        this.copyFeedback.classList.add('show');
        setTimeout(() => {
            this.copyFeedback.classList.remove('show');
        }, 2000);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll('.about-card, .token-card, .social-link');
        animatedElements.forEach(el => {
            this.observer.observe(el);
        });

        // Add animation styles
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .about-card, .token-card, .social-link {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .about-card.animate-in, .token-card.animate-in, .social-link.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Floating Action Button
class FloatingActionButton {
    constructor() {
        this.fab = document.getElementById('fab');
        this.init();
    }

    init() {
        this.fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide FAB based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.fab.style.opacity = '1';
                this.fab.style.pointerEvents = 'auto';
            } else {
                this.fab.style.opacity = '0';
                this.fab.style.pointerEvents = 'none';
            }
        });
    }
}

// Hero Logo Animation
class HeroLogoManager {
    constructor() {
        this.heroLogo = document.getElementById('heroLogo');
        this.init();
    }

    init() {
        // Add interaction effects to the PNG logo
        this.heroLogo.addEventListener('mouseenter', () => {
            this.heroLogo.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        this.heroLogo.addEventListener('mouseleave', () => {
            this.heroLogo.style.transform = 'scale(1) rotate(0deg)';
        });

        // Add click effect
        this.heroLogo.addEventListener('click', () => {
            this.heroLogo.style.animation = 'none';
            setTimeout(() => {
                this.heroLogo.style.animation = 'float 3s ease-in-out infinite';
            }, 100);
        });
    }
}

// Particle System for Background Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                color: ['#00ffff', '#ff00ff', '#00ff00'][Math.floor(Math.random() * 3)],
                alpha: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Interaction Effects
class InteractionEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.cta-button, .copy-btn, .social-link, .hero-social-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e));
        });

        // Add magnetic effect to cards
        const cards = document.querySelectorAll('.about-card, .social-link');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.magneticEffect(e, card));
            card.addEventListener('mouseleave', () => this.resetMagnetic(card));
        });

        // Add hover effects to hero social buttons
        const heroSocialBtns = document.querySelectorAll('.hero-social-btn');
        heroSocialBtns.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.1)';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
            
            // Ensure icon and text visibility
            const icon = btn.querySelector('i');
            const text = btn.querySelector('span');
            if (icon) {
                icon.style.visibility = 'visible';
                icon.style.opacity = '1';
                icon.style.color = '#ffffff';
                icon.style.display = 'block';
            }
            if (text) {
                text.style.visibility = 'visible';
                text.style.opacity = '1';
                text.style.color = '#ffffff';
                text.style.display = 'block';
            }
        });
    }

    createRipple(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    magneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    resetMagnetic(element) {
        element.style.transform = 'translate(0, 0)';
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        
        if (window.location.search.includes('debug')) {
            this.createFPSCounter();
            this.monitor();
        }
    }

    createFPSCounter() {
        const fpsCounter = document.createElement('div');
        fpsCounter.id = 'fps-counter';
        fpsCounter.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ffff;
            padding: 5px 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            border: 1px solid #00ffff;
        `;
        document.body.appendChild(fpsCounter);
    }

    monitor() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = `FPS: ${this.fps}`;
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new MatrixRain();
    new Navigation();
    new ClipboardManager();
    new ScrollAnimations();
    new FloatingActionButton();
    new HeroLogoManager();
    new InteractionEffects();
    
    // Enhanced effects (can be disabled for performance)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new ParticleSystem();
    }
    
    // Performance monitoring (debug mode)
    new PerformanceMonitor();
    
    // Additional enhancements
    initializeScrollEffects();
    initializeTypewriter();
});

// Scroll-based navbar styling
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Typewriter effect for hero subtitle
function initializeTypewriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1500);
}

// Error handling and graceful degradation
window.addEventListener('error', (e) => {
    console.warn('Non-critical error caught:', e.error);
    // Implement fallbacks for critical features
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Could register a service worker here for offline functionality
        console.log('BULLIX website loaded successfully');
    });
}
