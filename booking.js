// ========================================
// BOOKING PAGE JAVASCRIPT
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I have a confirmed space and would like to check signage requirements.',
    calendlyLink: 'https://calendly.com/your-link'
};

// ========================================
// CHECKBOX VALIDATION
// ========================================

const checkboxes = {
    spaceConfirmed: document.getElementById('space-confirmed'),
    drawingsUnderstood: document.getElementById('drawings-understood'),
    measurementUnderstood: document.getElementById('measurement-understood')
};

const enableBookingBtn = document.getElementById('enable-booking-btn');
const calendlyContainer = document.getElementById('calendly-container');

function checkAllCheckboxes() {
    const allChecked = Object.values(checkboxes).every(checkbox => checkbox && checkbox.checked);

    if (allChecked && enableBookingBtn) {
        enableBookingBtn.disabled = false;
        enableBookingBtn.style.opacity = '1';
        enableBookingBtn.style.cursor = 'pointer';
    } else if (enableBookingBtn) {
        enableBookingBtn.disabled = true;
        enableBookingBtn.style.opacity = '0.5';
        enableBookingBtn.style.cursor = 'not-allowed';
    }
}

// Attach change listeners to all checkboxes
Object.values(checkboxes).forEach(checkbox => {
    if (checkbox) {
        checkbox.addEventListener('change', checkAllCheckboxes);
    }
});

// ========================================
// ENABLE BOOKING BUTTON
// ========================================

if (enableBookingBtn) {
    enableBookingBtn.addEventListener('click', () => {
        if (!enableBookingBtn.disabled) {
            // Show calendly container
            if (calendlyContainer) {
                calendlyContainer.style.display = 'block';
                calendlyContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Or redirect directly to Calendly
            // window.open(CONFIG.calendlyLink, '_blank');
        }
    });
}

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
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Signage - Booking Page Initialized');
    checkAllCheckboxes(); // Set initial state

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
