// ========================================
// APPROVAL PROCESS PAGE JAVASCRIPT
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I have a confirmed space and would like to check signage requirements.'
};

// ========================================
// WHATSAPP INTEGRATION
// ========================================

function getWhatsAppLink() {
    const encodedMessage = encodeURIComponent(CONFIG.whatsappMessage);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

const whatsappFooter = document.getElementById('whatsapp-footer');
if (whatsappFooter) {
    whatsappFooter.href = getWhatsAppLink();
}

// ========================================
// NAVIGATION HAMBURGER MENU
// ========================================

const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

if (hamburger && navbarMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
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
// SCROLL ANIMATIONS (Timeline)
// ========================================

function initAnimations() {
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the item is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
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
    console.log('GetNoticed Signage - Approval Process Page Initialized');

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
