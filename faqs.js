// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I have a question about your services.'
};

// ========================================
// DOM ELEMENTS
// ========================================

const elements = {
    hamburger: document.getElementById('hamburger'),
    navbarMenu: document.getElementById('navbar-menu'),
    whatsappFooter: document.getElementById('whatsapp-footer'),
    faqItems: document.querySelectorAll('.faq-item')
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
// FAQ ACCORDION
// ========================================

function initFAQAccordion() {
    elements.faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all other items
            elements.faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    otherItem.querySelector('.faq-icon').textContent = '+';
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                icon.textContent = '+';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            }
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
let faqScrollTimeout;
window.addEventListener('scroll', () => {
    if (faqScrollTimeout) {
        window.cancelAnimationFrame(faqScrollTimeout);
    }
    faqScrollTimeout = window.requestAnimationFrame(handleAnnouncementScroll);
});

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Signage - FAQs Page Initialized');

    // Initialize WhatsApp links
    initWhatsAppLinks();

    // Initialize FAQ accordion
    initFAQAccordion();

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
