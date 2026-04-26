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

// Tab switching for O-Level / A-Level
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
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

// Animate numbers on scroll
const statNumbers = document.querySelectorAll('.stat-number');
const speed = 200;

const animateNumbers = () => {
    statNumbers.forEach(stat => {
        const targetText = stat.innerText;
        const target = parseInt(targetText);
        if (isNaN(target)) return;
        
        let count = 0;
        const increment = target / speed;
        
        const updateCount = () => {
            if (count < target) {
                count = Math.ceil(count + increment);
                stat.innerText = count + (targetText.includes('%') ? '%' : '');
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target + (targetText.includes('%') ? '%' : '');
            }
        };
        updateCount();
    });
};

// Intersection Observer for animations
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const academicStats = document.querySelector('.academic-stats');
if (academicStats) observer.observe(academicStats);

// Fade-in animations
const fadeElements = document.querySelectorAll('.level-card, .combination-card, .dept-card, .calendar-item, .resource-card, .grading-card');

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

console.log('Academics page loaded successfully');