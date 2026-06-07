/* ============================================================
   M'mawa Seed Solutions Ltd — Main JavaScript
   The Dawn of Genuine Tobacco Seed
   ============================================================ */

(function () {
  'use strict';

  // ── 1. MOBILE NAVIGATION TOGGLE ──────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const body = document.body;

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      body.classList.toggle('nav-open', isOpen);
    });

    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        body.classList.remove('nav-open');
        hamburger.focus();
      }
    });
  }

  // ── 2. ACTIVE NAVIGATION HIGHLIGHTING ────────────────────
  function highlightActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Normalize: treat empty or '/' as index.html
    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }

    var allNavLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    allNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }
  highlightActiveNav();

  // ── 3. DYNAMIC COPYRIGHT YEAR ────────────────────────────
  var yearElements = document.querySelectorAll('.js-year');
  var currentYear = new Date().getFullYear();
  yearElements.forEach(function (el) {
    el.textContent = currentYear;
  });

  // ── 4. HEADER SCROLL EFFECT ──────────────────────────────
  var header = document.querySelector('.site-header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // ── 5. SCROLL REVEAL ANIMATION ───────────────────────────
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ── 6. CONTACT FORM DEMO HANDLER ────────────────────────
  var contactForm = document.getElementById('contact-form');
  var contactFormMessage = document.getElementById('contact-form-message');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      var name = contactForm.querySelector('#contact-name');
      var email = contactForm.querySelector('#contact-email');
      var message = contactForm.querySelector('#contact-message');

      if (name && !name.value.trim()) {
        showFormMessage(contactFormMessage, 'Please enter your full name.', 'error');
        name.focus();
        return;
      }

      if (email && !email.value.trim()) {
        showFormMessage(contactFormMessage, 'Please enter your email address.', 'error');
        email.focus();
        return;
      }

      if (email && !isValidEmail(email.value)) {
        showFormMessage(contactFormMessage, 'Please enter a valid email address.', 'error');
        email.focus();
        return;
      }

      if (message && !message.value.trim()) {
        showFormMessage(contactFormMessage, 'Please enter your message.', 'error');
        message.focus();
        return;
      }

      // Demo success
      showFormMessage(
        contactFormMessage,
        'Thank you. This demo form is ready to connect to email, WhatsApp, or a form service before launch.',
        'success'
      );

      contactForm.reset();
    });
  }

  // ── 7. BATCH VERIFICATION DEMO ──────────────────────────
  var verifyForm = document.getElementById('verify-form');
  var verifyInput = document.getElementById('verify-batch');
  var verifyResult = document.getElementById('verify-result');

  if (verifyForm) {
    verifyForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (verifyInput && !verifyInput.value.trim()) {
        if (verifyResult) {
          verifyResult.className = 'verify-result show alert alert--warning';
          verifyResult.innerHTML = '<h4>Please enter a batch number</h4><p>Enter a batch or lot number to verify.</p>';
        }
        verifyInput.focus();
        return;
      }

      if (verifyResult) {
        verifyResult.className = 'verify-result show alert alert--info';
        verifyResult.innerHTML =
          '<h4>Demo Verification</h4>' +
          '<p><strong>Batch Number:</strong> ' + escapeHTML(verifyInput.value) + '</p>' +
          '<p>Demo verification only. Final batch verification will be connected to M\'mawa\'s official seed records before launch.</p>';
      }
    });
  }

  // ── 8. ANTI-COUNTERFEIT CHECKLIST ───────────────────────
  var checklistItems = document.querySelectorAll('.checklist-item');
  var checklistProgress = document.getElementById('checklist-progress');

  if (checklistItems.length > 0) {
    checklistItems.forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.toggle('checked');
        updateChecklistProgress();
      });

      // Keyboard support
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.classList.toggle('checked');
          updateChecklistProgress();
        }
      });
    });
  }

  function updateChecklistProgress() {
    if (!checklistProgress) return;
    var total = checklistItems.length;
    var checked = document.querySelectorAll('.checklist-item.checked').length;
    checklistProgress.textContent = checked + ' of ' + total + ' checks completed';

    if (checked === total) {
      checklistProgress.style.background = 'rgba(22,163,74,0.1)';
      checklistProgress.style.color = '#16A34A';
      checklistProgress.textContent = 'All checks completed — This seed appears to be genuine.';
    } else {
      checklistProgress.style.background = '';
      checklistProgress.style.color = '';
    }
  }

  // ── UTILITY FUNCTIONS ──────────────────────────────────
  function showFormMessage(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-message form-message--' + type;
    el.setAttribute('role', 'alert');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

})();
