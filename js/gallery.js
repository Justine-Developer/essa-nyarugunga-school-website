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

// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter items
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev-lightbox');
const nextBtn = document.querySelector('.next-lightbox');

let currentImageIndex = 0;
let allGalleryImages = [];

// Collect all gallery images
function updateGalleryImages() {
    allGalleryImages = [];
    const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    visibleItems.forEach(item => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4')?.innerText || 'Gallery Image';
        const desc = item.querySelector('.gallery-overlay p')?.innerText || '';
        allGalleryImages.push({
            src: img.src,
            title: title,
            desc: desc
        });
    });
}

// Open lightbox
function openLightbox(index) {
    if (allGalleryImages.length === 0) return;
    currentImageIndex = index;
    const image = allGalleryImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<h4>${image.title}</h4><p>${image.desc}</p>`;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxFunc() {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
}

// Next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
    const image = allGalleryImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<h4>${image.title}</h4><p>${image.desc}</p>`;
}

// Previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
    const image = allGalleryImages[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxCaption.innerHTML = `<h4>${image.title}</h4><p>${image.desc}</p>`;
}

// Add click event to gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateGalleryImages();
        const visibleIndex = Array.from(galleryItems)
            .filter(i => i.style.display !== 'none')
            .findIndex(i => i === item);
        if (visibleIndex !== -1) {
            openLightbox(visibleIndex);
        }
    });
});

// Lightbox controls
if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFunc);
if (nextBtn) nextBtn.addEventListener('click', nextImage);
if (prevBtn) prevBtn.addEventListener('click', prevImage);

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightboxFunc();
    }
    if (e.key === 'ArrowRight' && lightbox.classList.contains('show')) {
        nextImage();
    }
    if (e.key === 'ArrowLeft' && lightbox.classList.contains('show')) {
        prevImage();
    }
});

// Video Modal
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeVideo = document.querySelector('.close-video');

// Play video function
function playVideo(videoUrl) {
    videoFrame.src = videoUrl;
    videoModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeVideoModal() {
    videoFrame.src = '';
    videoModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Add click event to play buttons
const playBtns = document.querySelectorAll('.play-btn');
playBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const videoUrl = btn.getAttribute('data-video');
        if (videoUrl) {
            playVideo(videoUrl);
        }
    });
});

if (closeVideo) closeVideo.addEventListener('click', closeVideoModal);

// Close video modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        closeVideoModal();
    }
});

// Click outside video modal to close
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideoModal();
    }
});

// Load More functionality
let visibleItems = 12;
const loadMoreBtn = document.getElementById('loadMoreBtn');

function updateVisibleItems() {
    const items = Array.from(galleryItems);
    items.forEach((item, index) => {
        if (index < visibleItems) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    if (visibleItems >= items.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleItems += 8;
        updateVisibleItems();
        // Reset filter active state to 'all'
        document.querySelector('.filter-btn[data-filter="all"]').click();
    });
}

// Initialize gallery
updateVisibleItems();

// Animate stats counters
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        
        const updateCount = () => {
            if (count < target) {
                count = Math.ceil(count + increment);
                stat.innerText = count;
                setTimeout(updateCount, 15);
            } else {
                stat.innerText = target;
            }
        };
        updateCount();
    });
}

// Intersection Observer for stats animation
const statsSection = document.querySelector('.gallery-stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);

// Fade-in animations
const fadeElements = document.querySelectorAll('.stat-box, .gallery-item, .video-card');

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

console.log('Gallery page loaded successfully');