// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I\'m interested in your signage services.'
};

// ========================================
// DOM ELEMENTS
// ========================================

const elements = {
    hamburger: document.getElementById('hamburger'),
    navbarMenu: document.getElementById('navbar-menu'),
    whatsappFooter: document.getElementById('whatsapp-footer')
};

// ========================================
// WHATSAPP INTEGRATION
// ========================================

function initWhatsAppLinks() {
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

    if (elements.whatsappFooter) {
        elements.whatsappFooter.href = whatsappUrl;
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
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleAnnouncementScroll);
});

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Signage - Services Page Initialized');

    // Initialize WhatsApp links
    initWhatsAppLinks();

    // Set announcement bar transition
    if (announcementBar) {
        announcementBar.style.transition = 'transform 300ms ease, opacity 300ms ease';
    }
    if (navbar) {
        navbar.style.transition = 'top 300ms ease';
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
