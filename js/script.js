// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // Remove .active from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        // Add .active to the clicked nav link only if it's in the nav
        if (this.closest('.nav-links')) {
            this.classList.add('active');
        }
        // Remove focus to prevent underline from staying
        this.blur();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Section Header Underline Observer
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const h2 = entry.target.querySelector('h2');
    if (entry.isIntersecting) {
      h2.classList.add('in-view');
    } else {
      h2.classList.remove('in-view');
    }
  });
}, { threshold: 0.5 });

// Observe all section headers
document.querySelectorAll('.section-header').forEach(header => {
  headerObserver.observe(header);
});

// Enhanced scroll animations for cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

// Observe project and skill cards
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    cardObserver.observe(card);
});

// Form validation and enhancement
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Reset after form submission attempt
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Add subtle hover effects to navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Enhanced scroll-based navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--text-accent)';
            link.classList.add('active');
        }
    });
});

// Experience Timeline Scroll Buttons
function addTimelineScroll(btnLeftId, btnRightId, timelineId) {
    const leftBtn = document.getElementById(btnLeftId);
    const rightBtn = document.getElementById(btnRightId);
    const timeline = document.getElementById(timelineId);
    if (!leftBtn || !rightBtn || !timeline) return;
    const scrollAmount = 360; // px, matches card width + gap
    leftBtn.addEventListener('click', () => {
        timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}
addTimelineScroll('exp-scroll-left', 'exp-scroll-right', 'exp-timeline-work');
addTimelineScroll('exp-scroll-left-add', 'exp-scroll-right-add', 'exp-timeline-additional');

// Download CV functionality
document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    // Replace 'path/to/your/cv.pdf' with the actual path to your CV file
    const cvUrl = 'path/to/your/cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Ayaan_Jaman-Khan_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});