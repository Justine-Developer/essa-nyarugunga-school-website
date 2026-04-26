// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter subscription
document.querySelector('.newsletter-form button')?.addEventListener('click', () => {
    const input = document.querySelector('.newsletter-form input');
    if (input && input.value) {
        alert(`Thank you ${input.value} for subscribing to our newsletter!`);
        input.value = '';
    } else if (input) {
        alert('Please enter a valid email address.');
    }
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Application Form Submission
const applicationForm = document.getElementById('applicationForm');
const formStatus = document.getElementById('formStatus');

applicationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['fullName', 'dob', 'email', 'phone', 'level', 'prevSchool', 'lastAverage', 'parentName', 'parentPhone'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById('email').style.borderColor = 'red';
        formStatus.innerHTML = '<span style="color: red;">Please enter a valid email address.</span>';
        return;
    }
    
    // Phone validation (basic Rwanda format)
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^(\+250|0)[7-9][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        isValid = false;
        document.getElementById('phone').style.borderColor = 'red';
        formStatus.innerHTML = '<span style="color: red;">Please enter a valid phone number (e.g., 0788123456 or +250788123456).</span>';
        return;
    }
    
    // Terms checkbox
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        isValid = false;
        formStatus.innerHTML = '<span style="color: red;">Please accept the terms and conditions.</span>';
        return;
    }
    
    if (isValid) {
        // Simulate form submission
        formStatus.innerHTML = '<span style="color: green;"><i class="fas fa-spinner fa-spin"></i> Submitting application...</span>';
        
        // Simulate API call delay
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color: green;"><i class="fas fa-check-circle"></i> Application submitted successfully! You will receive a confirmation email shortly.</span>';
            applicationForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 2000);
    } else {
        formStatus.innerHTML = '<span style="color: red;">Please fill in all required fields correctly.</span>';
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 3000);
    }
});

// Real-time validation feedback
const inputs = document.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.borderColor = '#ddd';
    });
});

// Animate elements on scroll
const fadeElements = document.querySelectorAll('.step, .req-card, .fee-card, .faq-item, .scholarship-type');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    fadeObserver.observe(el);
});

// Scholarship checkbox toggle (optional visual effect)
const scholarshipCheckbox = document.getElementById('applyScholarship');
if (scholarshipCheckbox) {
    scholarshipCheckbox.addEventListener('change', () => {
        if (scholarshipCheckbox.checked) {
            console.log('Scholarship application selected');
        }
    });
}

console.log('Admissions page loaded successfully');