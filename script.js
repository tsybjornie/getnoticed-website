// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    // Replace with your actual WhatsApp number (Singapore format: 6512345678)
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I have a confirmed space and would like to check signage requirements.',
    calendlyLink: 'https://calendly.com/your-link'
};

// ========================================
// DOM ELEMENTS
// ========================================

const elements = {
    ctaPrimary: document.getElementById('cta-primary'),
    qualificationForm: document.getElementById('qualification-form-element'),
    formContainer: document.getElementById('form-container'),
    thankYouContainer: document.getElementById('thank-you-container'),
    whatsappFloat: document.getElementById('whatsapp-float'),
    whatsappThankYou: document.getElementById('whatsapp-thank-you'),
    whatsappFooter: document.getElementById('whatsapp-footer')
};

// ========================================
// SMOOTH SCROLL TO FORM
// ========================================

function scrollToForm() {
    const formSection = document.getElementById('qualification-form');
    if (formSection) {
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Attach scroll event to primary CTA
if (elements.ctaPrimary) {
    elements.ctaPrimary.addEventListener('click', scrollToForm);
}

// Attach scroll event to nav CTA
const navCta = document.getElementById('nav-cta');
if (navCta) {
    navCta.addEventListener('click', scrollToForm);
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
// WHATSAPP INTEGRATION
// ========================================

function getWhatsAppLink() {
    const encodedMessage = encodeURIComponent(CONFIG.whatsappMessage);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

// Set WhatsApp links on all WhatsApp buttons
function initWhatsAppLinks() {
    const whatsappLink = getWhatsAppLink();

    if (elements.whatsappFloat) {
        elements.whatsappFloat.href = whatsappLink;
    }

    if (elements.whatsappThankYou) {
        elements.whatsappThankYou.href = whatsappLink;
    }

    if (elements.whatsappFooter) {
        elements.whatsappFooter.href = whatsappLink;
    }

    // Hero WhatsApp link
    const whatsappHero = document.getElementById('whatsapp-hero');
    if (whatsappHero) {
        whatsappHero.href = whatsappLink;
    }
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

function validateForm(formData) {
    const errors = [];

    // Check if at least one checkbox is selected
    const checkboxes = document.querySelectorAll('input[name="needs"]:checked');
    if (checkboxes.length === 0) {
        errors.push('Please select at least one signage type you need.');
    }

    // All select fields are required by HTML5 validation
    // But we can add custom validation here if needed

    return errors;
}

function handleFormSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(elements.qualificationForm);

    // Validate form
    const errors = validateForm(formData);

    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    // Collect form data for logging (you can send this to a backend)
    const formObject = {};
    formData.forEach((value, key) => {
        if (formObject[key]) {
            // Handle multiple checkboxes
            if (Array.isArray(formObject[key])) {
                formObject[key].push(value);
            } else {
                formObject[key] = [formObject[key], value];
            }
        } else {
            formObject[key] = value;
        }
    });

    console.log('Form submitted with data:', formObject);

    // TODO: Send form data to your backend/email service
    // Example: 
    // fetch('/api/submit-qualification', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formObject)
    // });

    // Show thank you message
    showThankYou();
}

function showThankYou() {
    if (elements.formContainer && elements.thankYouContainer) {
        elements.formContainer.style.display = 'none';
        elements.thankYouContainer.style.display = 'block';

        // Scroll to thank you message
        elements.thankYouContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Attach form submit event
if (elements.qualificationForm) {
    elements.qualificationForm.addEventListener('submit', handleFormSubmit);
}

// ========================================
// FLOATING WHATSAPP BUTTON SCROLL EFFECT
// ========================================

let lastScrollTop = 0;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide floating button based on scroll position
    if (elements.whatsappFloat) {
        if (scrollTop > 300) {
            elements.whatsappFloat.style.opacity = '1';
            elements.whatsappFloat.style.pointerEvents = 'auto';
        } else {
            elements.whatsappFloat.style.opacity = '0';
            elements.whatsappFloat.style.pointerEvents = 'none';
        }
    }

    lastScrollTop = scrollTop;
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// ========================================
// HERO MICRO-ANIMATIONS
// ========================================

function triggerHeroAnimations() {
    // Trigger animations on page load (once only)
    const heroHeadline = document.querySelector('.hero-headline');
    const heroSubhead = document.querySelector('.hero-subhead');
    const ctaGroup = document.querySelector('.cta-group');
    const heroVisual = document.querySelector('.hero-visual');

    // Add animate class to trigger CSS animations
    if (heroHeadline) heroHeadline.classList.add('animate');
    if (heroSubhead) heroSubhead.classList.add('animate');
    if (ctaGroup) ctaGroup.classList.add('animate');
    if (heroVisual) heroVisual.classList.add('animate');
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Signage - Landing Page Initialized');

    // Initialize WhatsApp links
    initWhatsAppLinks();

    // Trigger hero animations
    triggerHeroAnimations();

    // Set initial state for floating button
    if (elements.whatsappFloat) {
        elements.whatsappFloat.style.opacity = '0';
        elements.whatsappFloat.style.pointerEvents = 'none';
        elements.whatsappFloat.style.transition = 'opacity 300ms ease, transform 250ms ease';
    }

    // Check if we need to handle any URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        showThankYou();
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// ANNOUNCEMENT BAR SCROLL HANDLER
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
let announcementScrollTimeout;
window.addEventListener('scroll', () => {
    if (announcementScrollTimeout) {
        window.cancelAnimationFrame(announcementScrollTimeout);
    }
    announcementScrollTimeout = window.requestAnimationFrame(handleAnnouncementScroll);
});

// Set transitions on announcement bar and navbar
if (announcementBar) {
    announcementBar.style.transition = 'transform 300ms ease, opacity 300ms ease';
}
if (navbar) {
    navbar.style.transition = 'top 300ms ease';
}

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

// Track button clicks
function trackEvent(eventName, eventData) {
    console.log('Track Event:', eventName, eventData);

    // TODO: Integrate with your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    // gtag('event', eventName, eventData);
}

// Track CTA clicks
if (elements.ctaPrimary) {
    elements.ctaPrimary.addEventListener('click', () => {
        trackEvent('cta_click', { location: 'hero' });
    });
}

// Track WhatsApp clicks
const whatsappButtons = [elements.whatsappFloat, elements.whatsappThankYou, elements.whatsappFooter];
whatsappButtons.forEach((btn, index) => {
    if (btn) {
        btn.addEventListener('click', () => {
            const locations = ['floating', 'thank-you', 'footer'];
            trackEvent('whatsapp_click', { location: locations[index] });
        });
    }
});
