// ===== HERO ROTATING TEXT =====
const heroWords = ['Fitness', 'Friendship', 'Nutrition', 'Mindset', 'You'];
const rotateContainer = document.querySelector('.hero-rotate');

if (rotateContainer) {
  let wordIndex = 0;
  rotateContainer.textContent = heroWords[0];

  function flipToWord(word) {
    rotateContainer.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = word[i];
      span.style.animationDelay = i * 0.045 + 's';
      rotateContainer.appendChild(span);
    }
  }

  flipToWord(heroWords[0]);

  setInterval(() => {
    wordIndex = (wordIndex + 1) % heroWords.length;
    flipToWord(heroWords[wordIndex]);
  }, 3000);
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
const mobileStickyBar = document.getElementById('mobileStickyBar');
const isMobile = () => window.innerWidth <= 768;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // On mobile: hide navbar and show sticky bar after scrolling
  if (mobileStickyBar && isMobile()) {
    if (window.scrollY > 200) {
      navbar.classList.add('hide-on-mobile');
      mobileStickyBar.classList.add('visible');
    } else {
      navbar.classList.remove('hide-on-mobile');
      mobileStickyBar.classList.remove('visible');
    }
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (skip dropdown parent links on mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parentDropdown = link.closest('.nav-dropdown');
    // If this is the top-level dropdown toggle, prevent navigation
    if (parentDropdown && link === parentDropdown.querySelector(':scope > a')) {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        parentDropdown.classList.toggle('open');
      }
      return;
    }
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Cards with staggered entrance
document.querySelectorAll('.feature-card, .program-card, .pricing-card, .testimonial-card, .coach-card, .stat, .group-fitness-card, .tired-of-card, .how-it-works-step').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  if (el.classList.contains('group-fitness-card') || el.classList.contains('tired-of-card')) {
    el.style.transitionDelay = (i % 3) * 0.12 + 's';
  }
  if (el.classList.contains('how-it-works-step')) {
    el.style.transitionDelay = (i % 3) * 0.2 + 's';
  }
  observer.observe(el);
});

// Section headings + labels fade up
document.querySelectorAll('.tired-of-heading, .tired-of-label, .group-fitness-heading, .group-fitness-label, .group-fitness-sub, .programs-heading, .programs-label, .programs-sub, .reviews-heading, .reviews-label, .how-it-works-heading, .how-it-works-label, .how-it-works-sub, .perfect-banner-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  observer.observe(el);
});

// CTA buttons slide up
document.querySelectorAll('.tired-of-btn, .group-fitness-btn, .reviews-cta, .reviews-google').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(15px)';
  el.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
  observer.observe(el);
});

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ===== REVIEWS CAROUSEL =====
const reviews = [
  { author_name: 'Samantha Goetzke', rating: 5, text: 'About a year ago, my husband and I joined CrossFit Prior Lake. We try to get there about 3 days a week and even that makes a huge difference in how we feel physically and mentally. I am stronger now than I have ever been! Sometimes, it can be intimidating joining a gym, but I never felt that way here. The environment is very welcoming. Josh is a fantastic coach along with all the others!' },
  { author_name: 'Cali Berg', rating: 5, text: 'CrossFit Prior Lake is such a friendly and fun environment. They truly care about each individual. Their workouts are individualized based on your own skill level and you never feel out of place. I\'ve never had such a great experience at a workout facility. The staff are highly trained and easy going. Highly recommend to the public!' },
  { author_name: 'Mary Mortensen', rating: 5, text: 'I ditched my usual running and weights routine and joined this gym in the spring. Josh and all the coaches are great, and the workouts are very challenging in a good way. I feel more in shape and stronger than I have in years. The sense of community with the other members is also really enjoyable, I would highly recommend to anyone looking to amp up their fitness level!' },
  { author_name: 'Andrés Espejel', rating: 5, text: 'I had an incredible experience at CrossFit Prior Lake! Coaches at this gym are not only highly skilled and knowledgeable but also passionate about helping individuals build a solid foundation for their fitness journey. The environment is truly awesome, largely because of the amazing people who make up the community.' },
  { author_name: 'Todd Kreuscher', rating: 5, text: 'I have been a member for three years and am a big fan! All ages and ability levels are made to feel welcome. I am in my 50\'s and limited with some movements but Josh and the team always come up with scaling options that work for me. This is the best shape I have been in since my late 20\'s! I would highly recommend CrossFit Prior Lake!' },
  { author_name: 'Sydney Medin', rating: 5, text: 'I\'ve been going to CrossFit Prior Lake for almost a year now and have enjoyed every moment of it! The coaches are amazing! They push me in my workouts while providing guidance for the movements! It\'s been so great for my health and the community is amazing! I would highly recommend CrossFit Prior Lake!' },
  { author_name: 'Briana Martinson', rating: 5, text: 'Not only have I seen amazing progress aesthetically because of the workouts. But mentally feel like I found my safe haven. Such a good group of dedicated people, there\'s something about having a community working out and pushing each other together. The coaches are so helpful and encouraging. 10/10 recommend' },
  { author_name: 'Alex Loraas', rating: 5, text: 'Prior to coming here for the first time I had never done CrossFit or anything like this before. Now it\'s been almost two years and I go almost everyday. Good workouts that can be scaled for all abilities, coaches are great and everyone is super nice! Highly recommend checking out CrossFit Prior Lake!' },
  { author_name: 'Ryan Stockman', rating: 5, text: 'This CrossFit gym is an absolute blast! The workouts are not only effective but also incredibly fun. The trainers are skilled, friendly, and create an upbeat atmosphere. The community is welcoming and encourages everyone to push their limits while having a great time. I highly recommend this gym for a unique and enjoyable fitness journey!' },
  { author_name: 'Tim Mee', rating: 5, text: 'This gym is AWESOME! The facility is great, the trainers are excellent, and the fellow members are very welcoming. I am a seasonal member and am always made to feel at home. Recently I have brought out of town guests to workout and they also said it was one of the nicest gyms they have visited.' },
];

function buildCardHTML(review, index) {
  const stars = '<i class="fas fa-star"></i>'.repeat(review.rating) + '<i class="far fa-star"></i>'.repeat(5 - review.rating);
  const initial = review.author_name.charAt(0).toUpperCase();
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
  const avatarColor = googleColors[index % googleColors.length];
  return `
    <div class="review-card-header">
      <div class="review-author-photo review-author-initial" style="background:${avatarColor}">${initial}</div>
      <div class="review-author-info">
        <strong>${review.author_name}</strong>
        <div class="review-stars">${stars}</div>
      </div>
      <i class="fab fa-google review-card-google"></i>
    </div>
    <p class="review-text">${review.text}</p>
  `;
}

function renderReviewCards(data) {
  const carousel = document.getElementById('reviewsCarousel');
  if (!carousel) return;
  carousel.innerHTML = '';

  // Triple the cards: [clone-set] [original-set] [clone-set] for seamless infinite loop
  for (let copy = 0; copy < 3; copy++) {
    data.forEach((review, i) => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.dataset.index = i;
      card.dataset.copy = copy;
      card.innerHTML = buildCardHTML(review, i);
      carousel.appendChild(card);
    });
  }

  initCarouselControls(data.length);
}

window.addEventListener('DOMContentLoaded', () => {
  renderReviewCards(reviews);
});

function initCarouselControls(realCount) {
  const carousel = document.getElementById('reviewsCarousel');
  const wrapper = document.querySelector('.reviews-carousel-wrapper');
  if (!carousel || !wrapper) return;

  const allCards = carousel.querySelectorAll('.review-card');
  const cardWidth = 320;
  const gap = 20;
  const step = cardWidth + gap;
  // Start in the middle set
  let currentIndex = realCount + 2;
  let isTransitioning = false;

  function getOffset(idx) {
    const wrapperWidth = wrapper.offsetWidth;
    return (wrapperWidth / 2) - (step * idx) - (cardWidth / 2);
  }

  function updateClasses() {
    allCards.forEach((card, i) => {
      card.classList.remove('active', 'near');
      const distance = Math.abs(i - currentIndex);
      if (distance === 0) card.classList.add('active');
      else if (distance === 1) card.classList.add('near');
    });
  }

  function slideTo(idx, animate) {
    if (animate !== false) {
      carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      carousel.style.transition = 'none';
    }
    currentIndex = idx;
    carousel.style.transform = `translateX(${getOffset(idx)}px)`;
    updateClasses();
  }

  // Seamless jump after transition ends
  carousel.addEventListener('transitionend', () => {
    isTransitioning = false;
    // If we've scrolled into the 3rd clone set, jump back to middle set
    if (currentIndex >= realCount * 2) {
      slideTo(currentIndex - realCount, false);
    }
    // If we've scrolled into the 1st clone set, jump forward to middle set
    else if (currentIndex < realCount) {
      slideTo(currentIndex + realCount, false);
    }
  });

  slideTo(currentIndex, false);

  // Auto-scroll every 2.5s
  let autoScroll = setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;
    slideTo(currentIndex + 1, true);
  }, 2500);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      if (isTransitioning) return;
      isTransitioning = true;
      slideTo(currentIndex + 1, true);
    }, 2500);
  }

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => clearInterval(autoScroll));
  wrapper.addEventListener('mouseleave', resetAutoScroll);

  // ===== DRAG TO SCROLL =====
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  let currentTranslate = 0;

  function getTranslateX() {
    const st = window.getComputedStyle(carousel);
    const matrix = new DOMMatrixReadOnly(st.transform);
    return matrix.m41;
  }

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    currentTranslate = getTranslateX();
    wrapper.classList.add('dragging');
    clearInterval(autoScroll);
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
    dragOffset = diff;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');

    if (Math.abs(dragOffset) > 80) {
      currentIndex += dragOffset < 0 ? 1 : -1;
    }
    dragOffset = 0;
    isTransitioning = true;
    slideTo(currentIndex, true);
    resetAutoScroll();
  });

  // ===== TOUCH SUPPORT =====
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentTranslate = getTranslateX();
    wrapper.classList.add('dragging');
    clearInterval(autoScroll);
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
    dragOffset = diff;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');

    if (Math.abs(dragOffset) > 50) {
      currentIndex += dragOffset < 0 ? 1 : -1;
    }
    dragOffset = 0;
    isTransitioning = true;
    slideTo(currentIndex, true);
    resetAutoScroll();
  });

  window.addEventListener('resize', () => slideTo(currentIndex, false));
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat h3').forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, 25);
  });
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#e63946';
        valid = false;
      } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }
    });
    
    if (valid) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== POPUP / MODAL =====
(function() {
  const overlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('popupClose');
  const form = document.getElementById('popupForm');
  if (!overlay) return;

  function openPopup(e) {
    if (e) e.preventDefault();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on X button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Close on overlay click (outside modal)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
  });

  // Wire all CTA buttons that link to contact.html
  document.querySelectorAll('a[href="contact.html"]').forEach(function(link) {
    // Skip the plain "Contact" nav link (not a button)
    if (!link.classList.contains('btn') && !link.classList.contains('mobile-sticky-btn') && !link.classList.contains('active')) return;
    link.addEventListener('click', openPopup);
  });

  // Also wire mobile sticky buttons that link to contact.html
  document.querySelectorAll('.mobile-sticky-schedule, .mobile-sticky-free').forEach(function(btn) {
    btn.addEventListener('click', openPopup);
  });

  // Phone number auto-format: (xxx) xxx-xxxx
  var phoneInput = form ? form.querySelector('input[name="phone"]') : null;
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      var digits = this.value.replace(/\D/g, '');
      if (digits.charAt(0) === '1' && digits.length > 10) { digits = digits.substring(1); }
      digits = digits.substring(0, 10);
      if (digits.length === 0) { this.value = ''; return; }
      if (digits.length <= 3) { this.value = '(' + digits; }
      else if (digits.length <= 6) { this.value = '(' + digits.substring(0, 3) + ') ' + digits.substring(3); }
      else { this.value = '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6); }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.popup-submit');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      var data = {
        firstName: (form.querySelector('input[name="firstName"]') || {}).value || '',
        lastName: (form.querySelector('input[name="lastName"]') || {}).value || '',
        email: (form.querySelector('input[name="email"]') || {}).value || '',
        phone: (form.querySelector('input[name="phone"]') || {}).value || '',
        source: window.location.pathname
      };

      fetch('https://services.leadconnectorhq.com/hooks/QU0KfW1QodK79UH6fB31/webhook-trigger/wRUCSolpWZIqgTKyMX0G', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }).then(function() {
        window.location.href = 'schedule.html';
      }).catch(function() {
        window.location.href = 'schedule.html';
      });
    });
  }
})();
