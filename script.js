/**
 * TF FIT Website - Main JavaScript File
 * Handles mobile menu, tabs, slideshow, and smooth scrolling
 */

// ===== MOBILE MENU FUNCTIONALITY =====
// ===== MOBILE MENU FUNCTIONALITY =====
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.overlay = document.getElementById('overlay');
        this.closeMenuBtn = document.getElementById('closeMenu'); // Renomeado aqui
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Open menu
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.openMenu());
        }

        // Close menu
        if (this.closeMenuBtn) { // Atualizado aqui
            this.closeMenuBtn.addEventListener('click', () => this.closeMenu());
        }

        // Close menu when clicking overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeMenu());
        }

        // Close menu when clicking navigation links
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', () => this.handleResize());

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    }

    openMenu() {
        if (this.mobileMenu && this.overlay) {
            this.mobileMenu.classList.add('active');
            this.overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            this.closeMenuBtn.focus(); // Atualizado aqui
        }
    }

    closeMenu() {
        if (this.mobileMenu && this.overlay) {
            this.mobileMenu.classList.remove('active');
            this.overlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Return focus to menu toggle
            if (this.menuToggle) this.menuToggle.focus();
        }
    }

    handleResize() {
        if (window.innerWidth > 768) {
            this.closeMenu();
        }
    }
}

// ===== TAB FUNCTIONALITY =====
class TabManager {
    constructor() {
        this.init();
    }

    init() {
        // Make openTab function globally available
        window.openTab = this.openTab.bind(this);
    }

    openTab(evt, tabName) {
        // Hide all tab contents
        const tabContents = document.getElementsByClassName("tab-content");
        Array.from(tabContents).forEach(content => {
            content.style.display = "none";
        });

        // Remove 'active' class from all tab buttons
        const tabButtons = document.getElementsByClassName("tab-button");
        Array.from(tabButtons).forEach(button => {
            button.classList.remove("active");
        });

        // Show the current tab and add 'active' class to its button
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = "block";
            evt.currentTarget.classList.add("active");
        }
    }
}

// ===== SLIDESHOW FUNCTIONALITY =====
class Slideshow {
    constructor() {
        this.slideIndex = 0;
        this.slides = document.getElementsByClassName("mySlides");
        this.intervalTime = 5000; // 5 seconds
        this.intervalId = null;
        
        this.init();
    }

    init() {
        if (this.slides.length > 0) {
            this.showSlides();
        }
    }

    showSlides() {
        // Hide all slides
        Array.from(this.slides).forEach(slide => {
            slide.style.display = "none";
        });

        // Increment slide index
        this.slideIndex++;
        if (this.slideIndex > this.slides.length) {
            this.slideIndex = 1;
        }

        // Show current slide
        if (this.slides[this.slideIndex - 1]) {
            this.slides[this.slideIndex - 1].style.display = "block";
        }

        // Set timeout for next slide
        this.intervalId = setTimeout(() => this.showSlides(), this.intervalTime);
    }

    pause() {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
    }

    resume() {
        this.showSlides();
    }
}

// ===== SMOOTH SCROLLING =====
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without reloading the page
            this.updateURL(targetId);
        }
    }

    updateURL(targetId) {
        if (history.pushState) {
            history.pushState(null, null, targetId);
        } else {
            window.location.hash = targetId;
        }
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, this.observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    new MobileMenu();
    new TabManager();
    new Slideshow();
    new SmoothScroller();
    new ScrollAnimations();

    console.log('TF FIT Website initialized successfully');
});


