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

// Widget newsletter subscription
const widgetNewsBtn = document.getElementById('widgetNewsBtn');
const widgetNewsEmail = document.getElementById('widgetNewsEmail');

if (widgetNewsBtn) {
    widgetNewsBtn.addEventListener('click', () => {
        const email = widgetNewsEmail.value;
        if (email && email.includes('@')) {
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
            widgetNewsEmail.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Blog posts data
const allPosts = [
    { title: "Term 2 Examinations Schedule Announced", category: "announcement", date: "2026-04-25", content: "..." },
    { title: "World Book Day Celebration at ESSA", category: "event", date: "2026-04-22", content: "..." },
    { title: "Annual Music Concert a Grand Success", category: "cultural", date: "2026-04-18", content: "..." },
    { title: "ESSA Wins Inter-School Football Tournament", category: "sports", date: "2026-04-15", content: "..." },
    { title: "New Computer Lab Inaugurated", category: "academic", date: "2026-04-12", content: "..." },
    { title: "Graduation Ceremony Date Announced", category: "announcement", date: "2026-04-08", content: "..." },
    { title: "Students Participate in Community Cleanup", category: "community", date: "2026-04-05", content: "..." }
];

// Category filtering
const categoryItems = document.querySelectorAll('.category-list li');
const postCards = document.querySelectorAll('.post-card');

categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update active state
        categoryItems.forEach(li => li.classList.remove('active'));
        item.classList.add('active');
        
        const category = item.getAttribute('data-category');
        
        // Filter posts
        postCards.forEach(card => {
            const cardCategory = card.querySelector('.post-category').innerText.toLowerCase();
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'grid';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function searchPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    postCards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const content = card.querySelector('p').innerText.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', searchPosts);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPosts();
        }
    });
}

// Pagination
let currentPage = 1;
const postsPerPage = 4;
const totalPosts = postCards.length;
const totalPages = Math.ceil(totalPosts / postsPerPage);

function showPage(page) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    
    postCards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update pagination buttons
    const pageNumbers = document.querySelectorAll('.page-num');
    pageNumbers.forEach(btn => {
        const btnPage = parseInt(btn.getAttribute('data-page'));
        if (btnPage === page) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    const prevBtn = document.querySelector('.page-btn[data-page="prev"]');
    const nextBtn = document.querySelector('.page-btn[data-page="next"]');
    
    if (prevBtn) {
        prevBtn.disabled = (page === 1);
    }
    if (nextBtn) {
        nextBtn.disabled = (page === totalPages);
    }
    
    currentPage = page;
}

// Add click handlers to pagination buttons
const pageNumBtns = document.querySelectorAll('.page-num');
pageNumBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const page = parseInt(btn.getAttribute('data-page'));
        showPage(page);
    });
});

const prevPageBtn = document.querySelector('.page-btn[data-page="prev"]');
const nextPageBtn = document.querySelector('.page-btn[data-page="next"]');

if (prevPageBtn) {
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
}

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
}

// Initialize pagination
showPage(1);

// Animate elements on scroll
const fadeElements = document.querySelectorAll('.post-card, .widget, .featured-grid');

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

console.log('Blog page loaded successfully');