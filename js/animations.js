// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Optional: unobserve after reveal for performance
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll-reveal class
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  revealElements.forEach(el => observer.observe(el));
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenuToggle.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking on a link
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add parallax effect to background
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector('body::before');

  if (parallaxBg) {
    document.body.style.setProperty('--scroll', scrolled * 0.5 + 'px');
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Add glow effect on mouse move for hero section
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hero.style.setProperty('--mouse-x', x + 'px');
    hero.style.setProperty('--mouse-y', y + 'px');
  });
}

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero h1 span');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 80);
// }

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

function highlightNavLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Preload critical resources
const preloadLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const btnText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    formMessage.style.display = 'none';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formMessage.style.display = 'block';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      formMessage.className = 'form-message error';
      formMessage.textContent = '✗ Failed to send message. Please try again or contact me directly.';
      formMessage.style.display = 'block';
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnText;
    }
  });
}

// Show success message if redirected with success parameter
if (window.location.search.includes('success=true')) {
  setTimeout(() => {
    if (formMessage) {
      formMessage.className = 'form-message success';
      formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formMessage.style.display = 'block';

      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 500);
}
