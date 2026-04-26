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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

// Animate stats/counters on scroll
const stats = document.querySelectorAll('.stat-number');
const speed = 200;

const animateStats = () => {
    stats.forEach(stat => {
        const value = stat.innerText;
        const target = parseInt(value);
        if (isNaN(target)) return;
        
        let count = 0;
        const increment = target / speed;
        
        const updateCount = () => {
            if (count < target) {
                count = Math.ceil(count + increment);
                stat.innerText = count;
                setTimeout(updateCount, 20);
            } else {
                stat.innerText = target;
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
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const storyStats = document.querySelector('.story-stats');
if (storyStats) observer.observe(storyStats);

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.mv-card, .facility-card, .achievement-card, .leader-card');

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

console.log('About page loaded successfully');