// Blade / Projecting Signs Page JavaScript

// Configuration
const CONFIG = {
    whatsappNumber: '+6581643179',
    whatsappMessage: 'Hello! I\'m interested in your Blade / Projecting Signs services.'
};

// Initialize WhatsApp links
function initWhatsApp() {
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappFooter = document.getElementById('whatsapp-footer');

    if (whatsappFloat) {
        whatsappFloat.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    }

    if (whatsappFooter) {
        whatsappFooter.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
    }
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbar-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

// Announcement bar scroll handling
let lastScrollTop = 0;
const announcementBar = document.getElementById('announcement-bar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        announcementBar.style.transform = 'translateY(-100%)';
    } else {
        announcementBar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initWhatsApp);
