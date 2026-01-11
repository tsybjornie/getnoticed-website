// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Productions, I\'d like to discuss my signage project.'
};

// ========================================
// DOM ELEMENTS
// ========================================

const elements = {
    hamburger: document.getElementById('hamburger'),
    navbarMenu: document.getElementById('navbar-menu'),
    whatsappFooter: document.getElementById('whatsapp-footer'),
    whatsappCta: document.getElementById('whatsapp-cta')
};

// ========================================
// WHATSAPP INTEGRATION
// ========================================

function initWhatsAppLinks() {
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

    if (elements.whatsappFooter) {
        elements.whatsappFooter.href = whatsappUrl;
    }
    if (elements.whatsappCta) {
        elements.whatsappCta.href = whatsappUrl;
    }
}

// ========================================
// HAMBURGER MENU
// ========================================

if (elements.hamburger && elements.navbarMenu) {
    elements.hamburger.addEventListener('click', () => {
        elements.hamburger.classList.toggle('active');
        elements.navbarMenu.classList.toggle('active');
    });
}

// ========================================
// SCROLL HANDLER FOR ANNOUNCEMENT BAR
// ========================================

const announcementBar = document.getElementById('announcement-bar');
const navbar = document.getElementById('navbar');

function handleAnnouncementScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        // Hide announcement bar
        if (announcementBar) {
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.opacity = '0';
        }
        // Adjust navbar to top
        if (navbar) {
            navbar.style.top = '0';
        }
    } else {
        // Show announcement bar
        if (announcementBar) {
            announcementBar.style.transform = 'translateY(0)';
            announcementBar.style.opacity = '1';
        }
        // Reset navbar position
        if (navbar) {
            navbar.style.top = '38px';
        }
    }
}

// Throttle scroll event
let aboutScrollTimeout;
window.addEventListener('scroll', () => {
    if (aboutScrollTimeout) {
        window.cancelAnimationFrame(aboutScrollTimeout);
    }
    aboutScrollTimeout = window.requestAnimationFrame(handleAnnouncementScroll);
});

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Productions - About Page Initialized');

    // Initialize WhatsApp links
    initWhatsAppLinks();

    // Set announcement bar transition
    if (announcementBar) {
        announcementBar.style.transition = 'transform 300ms ease, opacity 300ms ease';
    }
    if (navbar) {
        navbar.style.transition = 'top 300ms ease';
    }

    // Initialize animations
    initAnimations();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
