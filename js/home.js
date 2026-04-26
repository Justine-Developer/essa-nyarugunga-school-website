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

// Smooth scrolling
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

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// Back to top functionality
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = parseInt(counter.getAttribute('data-target'));
            const count = parseInt(counter.innerText);
            const increment = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counters when in view
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (document.querySelector('.stats')) {
    observer.observe(document.querySelector('.stats'));
}

// Gallery filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Events Calendar Data
const eventsData = {
    "2026-4-5": { name: "Inter-school Debate Competition", type: "Club" },
    "2026-4-10": { name: "Science Fair", type: "Club" },
    "2026-4-12": { name: "Sunday Mass & Service", type: "Spiritual" },
    "2026-4-15": { name: "Music Concert Rehearsal", type: "Club" },
    "2026-4-18": { name: "Football Tournament", type: "Sports" },
    "2026-4-20": { name: "Charity Outreach", type: "Spiritual" },
    "2026-4-22": { name: "Guidance Session", type: "Spiritual" },
    "2026-4-25": { name: "Parents & Sports Day", type: "Sports" },
    "2026-4-28": { name: "Choir Practice", type: "Spiritual" },
    "2026-4-30": { name: "End of Month Assembly", type: "School" },
};

const upcomingEventsList = Object.entries(eventsData).map(([date, event]) => ({ date: new Date(date), event }));
upcomingEventsList.sort((a, b) => a.date - b.date);

let currentCalendarDate = new Date(2026, 3);

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const monthYearElem = document.getElementById("monthYear");
    if (monthYearElem) monthYearElem.innerHTML = `${monthNames[month]} ${year}`;
    
    const calendarGrid = document.getElementById("calendarGrid");
    if (!calendarGrid) return;
    calendarGrid.innerHTML = "";
    
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.className = "calendar-weekday";
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-day empty";
        calendarGrid.appendChild(emptyCell);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day";
        dayCell.textContent = day;
        const dateKey = `${year}-${month + 1}-${day}`;
        if (eventsData[dateKey]) {
            dayCell.classList.add("has-event");
            dayCell.onclick = () => alert(`📅 ${eventsData[dateKey].name}\n🏷️ Type: ${eventsData[dateKey].type}`);
        }
        calendarGrid.appendChild(dayCell);
    }
    
    renderUpcomingEvents();
}

function renderUpcomingEvents() {
    const eventsList = document.getElementById("eventsList");
    if (!eventsList) return;
    eventsList.innerHTML = "";
    const today = new Date();
    today.setHours(0,0,0,0);
    const futureEvents = upcomingEventsList.filter(item => item.date >= today).slice(0, 6);
    
    if (futureEvents.length === 0) {
        eventsList.innerHTML = "<li>No upcoming events. Check back soon!</li>";
        return;
    }
    
    futureEvents.forEach(item => {
        const li = document.createElement("li");
        const dateStr = item.date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        li.innerHTML = `<span class="event-date">${dateStr}</span><span>${item.event.name}</span>`;
        eventsList.appendChild(li);
    });
}

function prevMonth() { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendar(); }

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("calendarGrid")) {
        renderCalendar();
        document.getElementById("prevMonth")?.addEventListener("click", prevMonth);
        document.getElementById("nextMonth")?.addEventListener("click", nextMonth);
    }
});

// Join Club buttons
document.querySelectorAll('.join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Thank you for your interest! Please visit the administration office to register for this club.');
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = document.getElementById('formFeedback');
        feedback.textContent = '✅ Thank you! Your message has been sent successfully.';
        feedback.style.color = 'green';
        contactForm.reset();
        setTimeout(() => { feedback.textContent = ''; }, 3000);
    });
}

// Newsletter subscription
document.querySelector('.newsletter-form button')?.addEventListener('click', () => {
    const input = document.querySelector('.newsletter-form input');
    if (input.value) {
        alert(`Thank you ${input.value} for subscribing to our newsletter!`);
        input.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});

console.log('ESSA Nyarugunga website fully loaded!');