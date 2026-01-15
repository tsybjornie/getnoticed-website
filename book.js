// ========================================
// MULTI-STEP BOOKING FORM
// ========================================

const CONFIG = {
    whatsappNumber: '6581643179',
    whatsappMessage: 'Hi GetNoticed Signage, I just submitted a booking form.'
};

// State management
const formState = {
    currentStep: 1,
    projectType: null,
    location: {},
    timeline: null,
    scope: null,
    contact: {},
    needsDrawings: false
};

// DOM Elements
const steps = document.querySelectorAll('.book-step');
const progressSteps = document.querySelectorAll('.progress-step');

// ========================================
// STEP NAVIGATION
// ========================================

function showStep(stepNumber) {
    // Hide all steps
    steps.forEach(step => step.style.display = 'none');

    // Show current step
    const currentStepEl = document.getElementById(`step-${stepNumber}`);
    if (currentStepEl) {
        currentStepEl.style.display = 'block';
        formState.currentStep = stepNumber;
    }

    // Update progress bar
    updateProgressBar(stepNumber);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgressBar(currentStep) {
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');

        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else if (stepNum === currentStep) {
            step.classList.add('active');
        }
    });
}

function nextStep() {
    if (formState.currentStep < 5) {
        showStep(formState.currentStep + 1);
    }
}

function prevStep() {
    if (formState.currentStep > 1) {
        showStep(formState.currentStep - 1);
    }
}

// ========================================
// STEP 1: PROJECT TYPE
// ========================================

const selectionCards = document.querySelectorAll('.selection-card');
const drawingFeeAlert = document.getElementById('drawing-fee-alert');
const nextBtn1 = document.getElementById('next-1');

selectionCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all cards
        selectionCards.forEach(c => c.classList.remove('selected'));

        // Add selected to clicked card
        card.classList.add('selected');

        // Store value
        formState.projectType = card.dataset.value;

        // Show alert if "not sure"
        if (formState.projectType === 'not-sure') {
            drawingFeeAlert.style.display = 'block';
        } else {
            drawingFeeAlert.style.display = 'none';
        }

        // Enable next button
        nextBtn1.disabled = false;
    });
});

nextBtn1.addEventListener('click', nextStep);

// ========================================
// STEP 2: LOCATION
// ========================================

const buildingName = document.getElementById('building-name');
const postalCode = document.getElementById('postal-code');
const nextBtn2 = document.getElementById('next-2');
const backBtn2 = document.getElementById('back-2');

function validateStep2() {
    const isValid = buildingName.value.trim() !== '' && postalCode.value.trim() !== '';
    nextBtn2.disabled = !isValid;
}

buildingName.addEventListener('input', validateStep2);
postalCode.addEventListener('input', validateStep2);

nextBtn2.addEventListener('click', () => {
    formState.location = {
        building: buildingName.value,
        unit: document.getElementById('unit-number').value,
        postal: postalCode.value
    };
    nextStep();
});

backBtn2.addEventListener('click', prevStep);

// ========================================
// STEP 3: TIMELINE
// ========================================

const timelineRadios = document.querySelectorAll('input[name="timeline"]');
const nextBtn3 = document.getElementById('next-3');
const backBtn3 = document.getElementById('back-3');

timelineRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        formState.timeline = radio.value;
        nextBtn3.disabled = false;
    });
});

nextBtn3.addEventListener('click', nextStep);
backBtn3.addEventListener('click', prevStep);

// ========================================
// STEP 4: SCOPE CLARITY
// ========================================

const scopeRadios = document.querySelectorAll('input[name="scope"]');
const drawingFeeNotice = document.getElementById('drawing-fee-notice');
const nextBtn4 = document.getElementById('next-4');
const backBtn4 = document.getElementById('back-4');

scopeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        formState.scope = radio.value;

        // Show fee notice if needs drawings
        if (radio.value === 'need-drawings') {
            drawingFeeNotice.style.display = 'flex';
            formState.needsDrawings = true;
        } else {
            drawingFeeNotice.style.display = 'none';
            formState.needsDrawings = false;
        }

        nextBtn4.disabled = false;
    });
});

nextBtn4.addEventListener('click', () => {
    updateSummary();
    nextStep();
});
backBtn4.addEventListener('click', prevStep);

// ========================================
// STEP 5: CONTACT DETAILS & SUBMIT
// ========================================

const contactName = document.getElementById('contact-name');
const whatsapp = document.getElementById('whatsapp');
const email = document.getElementById('email');
const submitBtn = document.getElementById('submit-booking');
const backBtn5 = document.getElementById('back-5');

function validateStep5() {
    const isValid =
        contactName.value.trim() !== '' &&
        whatsapp.value.trim() !== '' &&
        email.value.trim() !== '';
    submitBtn.disabled = !isValid;
}

contactName.addEventListener('input', validateStep5);
whatsapp.addEventListener('input', validateStep5);
email.addEventListener('input', validateStep5);

function updateSummary() {
    // Project Type
    const projectLabels = {
        'retail': 'Retail / Shopfront',
        'office': 'Office / Building',
        'exhibition': 'Exhibition / Event',
        'not-sure': 'Not sure yet'
    };
    document.getElementById('summary-project').textContent =
        projectLabels[formState.projectType] || '-';

    // Location
    document.getElementById('summary-location').textContent =
        formState.location.building || '-';

    // Timeline
    const timelineLabels = {
        'asap': 'ASAP (urgent)',
        '2-4-weeks': '2–4 weeks',
        '1-2-months': '1–2 months',
        'planning': 'Just planning'
    };
    document.getElementById('summary-timeline').textContent =
        timelineLabels[formState.timeline] || '-';

    // Scope
    const scopeLabels = {
        'drawings-ready': 'Drawings/specs ready',
        'reference-image': 'Reference image',
        'need-drawings': 'Need help with drawings'
    };
    document.getElementById('summary-scope').textContent =
        scopeLabels[formState.scope] || '-';
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Store contact details
    formState.contact = {
        name: contactName.value,
        company: document.getElementById('company').value,
        whatsapp: whatsapp.value,
        email: email.value,
        notes: document.getElementById('additional-notes').value
    };

    // Collect all additional form data
    const additionalData = {
        unitNumber: document.getElementById('unit-number').value,
        postalCode: document.getElementById('postal-code').value,
        buildingContact: document.getElementById('building-contact').value,
        landlordApproval: document.getElementById('landlord-approval').value,
        accessRestrictions: document.getElementById('access-restrictions').value,
        existingSignage: document.querySelector('input[name="existing-signage"]:checked')?.value || 'Not specified',
        powerSupply: document.querySelector('input[name="power-supply"]:checked')?.value || 'Not specified',
        visitDate: document.getElementById('visit-date').value,
        visitTime: document.getElementById('visit-time').value,
        nightWork: document.querySelector('input[name="night-work"]:checked')?.value || 'Not specified',
        weekendWork: document.querySelector('input[name="weekend-work"]:checked')?.value || 'Not specified',
        deadlineDate: document.getElementById('deadline-date').value
    };

    // Log form data
    console.log('Form submitted:', formState);

    // Format WhatsApp message
    const whatsappMessage = formatBookingForWhatsApp(formState, additionalData);

    // Open WhatsApp with formatted message
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    showStep('success');
});

backBtn5.addEventListener('click', prevStep);

// ========================================
// FORMAT WHATSAPP MESSAGE
// ========================================

function formatBookingForWhatsApp(formState, additionalData) {
    const projectLabels = {
        'retail': 'Retail / Shopfront',
        'office': 'Office / Building',
        'exhibition': 'Exhibition / Event',
        'not-sure': 'Not sure yet'
    };

    const timelineLabels = {
        'asap': 'Urgent (within 2 weeks)',
        '2-4-weeks': '2–4 weeks',
        '1-2-months': '1–2 months',
        'planning': 'Just planning'
    };

    const scopeLabels = {
        'drawings-ready': 'I have drawings/specs ready',
        'reference-image': 'I have a reference image',
        'need-drawings': 'I need help with drawings'
    };

    const landlordLabels = {
        'obtained': 'Approval obtained',
        'pending': 'Pending approval',
        'not-required': 'Not required',
        'unsure': 'Unsure'
    };

    let message = `🏢 *NEW SIGNAGE BOOKING REQUEST*\n\n`;

    // Contact Information
    message += `👤 *CONTACT DETAILS*\n`;
    message += `Name: ${formState.contact.name}\n`;
    if (formState.contact.company) {
        message += `Company: ${formState.contact.company}\n`;
    }
    message += `WhatsApp: ${formState.contact.whatsapp}\n`;
    message += `Email: ${formState.contact.email}\n\n`;

    // Project Type
    message += `📋 *PROJECT TYPE*\n`;
    message += `${projectLabels[formState.projectType] || formState.projectType}\n\n`;

    // Location Details
    message += `📍 *LOCATION*\n`;
    message += `Building: ${formState.location.building}\n`;
    if (additionalData.unitNumber) {
        message += `Unit: ${additionalData.unitNumber}\n`;
    }
    message += `Postal Code: ${additionalData.postalCode}\n`;
    if (additionalData.buildingContact) {
        message += `Building Contact: ${additionalData.buildingContact}\n`;
    }
    message += `\n`;

    // Site Access & Approvals
    message += `🔐 *SITE ACCESS & APPROVALS*\n`;
    message += `Landlord Approval: ${landlordLabels[additionalData.landlordApproval] || additionalData.landlordApproval}\n`;
    message += `Existing Signage to Remove: ${additionalData.existingSignage}\n`;
    message += `Power Supply Needed: ${additionalData.powerSupply}\n`;
    if (additionalData.accessRestrictions) {
        message += `Access Restrictions: ${additionalData.accessRestrictions}\n`;
    }
    message += `\n`;

    // Timeline
    message += `⏰ *TIMELINE*\n`;
    message += `Completion: ${timelineLabels[formState.timeline] || formState.timeline}\n`;
    if (additionalData.deadlineDate) {
        message += `Hard Deadline: ${additionalData.deadlineDate}\n`;
    }
    message += `After-hours Work: ${additionalData.nightWork}\n`;
    message += `Weekend Work: ${additionalData.weekendWork}\n`;
    message += `\n`;

    // Site Visit Preferences
    if (additionalData.visitDate || additionalData.visitTime) {
        message += `📅 *SITE VISIT PREFERENCES*\n`;
        if (additionalData.visitDate) {
            message += `Preferred Date: ${additionalData.visitDate}\n`;
        }
        if (additionalData.visitTime) {
            message += `Preferred Time: ${additionalData.visitTime}\n`;
        }
        message += `\n`;
    }

    // Scope
    message += `🎯 *SCOPE*\n`;
    message += `${scopeLabels[formState.scope] || formState.scope}\n`;
    if (formState.needsDrawings) {
        message += `⚠️ Drawing assistance required\n`;
    }
    message += `\n`;

    // Additional Notes
    if (formState.contact.notes) {
        message += `📝 *ADDITIONAL NOTES*\n`;
        message += `${formState.contact.notes}\n\n`;
    }

    message += `---\n`;
    message += `Submitted via GetNoticed Booking Form`;

    return message;
}

// ========================================
// SUCCESS PAGE
// ========================================

const whatsappSuccess = document.getElementById('whatsapp-success');
if (whatsappSuccess) {
    whatsappSuccess.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
}

// ========================================
// SCROLL HANDLER FOR ANNOUNCEMENT BAR
// ========================================

const announcementBar = document.getElementById('announcement-bar');
const mainNav = document.getElementById('main-nav');
let lastScrollTop = 0;

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 50) {
        // Hide announcement bar
        if (announcementBar) {
            announcementBar.style.transform = 'translateY(-100%)';
            announcementBar.style.opacity = '0';
        }
        // Adjust nav to top
        if (mainNav) {
            mainNav.classList.add('no-announcement');
        }
    } else {
        // Show announcement bar
        if (announcementBar) {
            announcementBar.style.transform = 'translateY(0)';
            announcementBar.style.opacity = '1';
        }
        // Reset nav position
        if (mainNav) {
            mainNav.classList.remove('no-announcement');
        }
    }
}

// Throttle scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
});

// ========================================
// INITIALIZATION
// ========================================

function init() {
    console.log('GetNoticed Signage - Multi-Step Booking Initialized');
    showStep(1);

    // Set announcement bar transition
    if (announcementBar) {
        announcementBar.style.transition = 'transform 300ms ease, opacity 300ms ease';
    }
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
