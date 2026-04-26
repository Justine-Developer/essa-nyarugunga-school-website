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
const newsletterBtn = document.getElementById('newsletterBtn');
const newsletterEmail = document.getElementById('newsletterEmail');

if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterEmail.value;
        if (email && email.includes('@')) {
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
            newsletterEmail.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            formStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> Please fill in all required fields.</span>';
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.innerHTML = '<span style="color: red;"><i class="fas fa-exclamation-circle"></i> Please enter a valid email address.</span>';
            return;
        }
        
        // Simulate form submission
        formStatus.innerHTML = '<span style="color: #1e3c72;"><i class="fas fa-spinner fa-spin"></i> Sending message...</span>';
        
        // Simulate API call
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color: green;"><i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.</span>';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }, 1500);
    });
}

// Live Chat Modal
const chatModal = document.getElementById('chatModal');
const liveChatBtn = document.getElementById('liveChatBtn');
const chatClose = document.querySelector('.chat-close');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (liveChatBtn) {
    liveChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        chatModal.classList.toggle('show');
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === chatModal) {
        chatModal.classList.remove('show');
    }
});

// Send chat message
function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user';
    userMessageDiv.innerHTML = `<div class="message-content">${escapeHtml(message)}</div>`;
    chatMessages.appendChild(userMessageDiv);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        
        let botResponse = "Thank you for your message. Our team will get back to you shortly. Meanwhile, you can call our office at +250 788 123 456.";
        
        if (message.toLowerCase().includes('admission') || message.toLowerCase().includes('apply')) {
            botResponse = "For admissions inquiries, please visit our Admissions page or contact the admissions office at admissions@essanyarugunga.rw or call +250 788 123 457.";
        } else if (message.toLowerCase().includes('fee') || message.toLowerCase().includes('cost')) {
            botResponse = "Our fee structure varies by program. For O-Level it's 150,000 RWF/term, and for A-Level it's 160,000-180,000 RWF/term. Scholarships are available for qualified students.";
        } else if (message.toLowerCase().includes('location') || message.toLowerCase().includes('address')) {
            botResponse = "We are located in Nyarugunga Sector, Kicukiro District, Kigali, Rwanda. You can find us near the Nyarugunga Market.";
        }
        
        botMessageDiv.innerHTML = `<div class="message-content">${botResponse}</div>`;
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
}

if (chatSendBtn) {
    chatSendBtn.addEventListener('click', sendChatMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Map link - scroll to map
const openMapBtn = document.getElementById('openMap');
if (openMapBtn) {
    openMapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Animate elements on scroll
const fadeElements = document.querySelectorAll('.info-card, .dept-contact-card, .faq-preview, .support-preview');

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

console.log('Contact page loaded successfully');