/* ============================================================
   Evergreen Clinic — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Mobile Nav Toggle ─────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }


  /* ── Scroll-Fade Animations ────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));


  /* ── Hero Time Slot Selector ───────────────────────────── */
  document.querySelectorAll('.timeslot').forEach(slot => {
    slot.addEventListener('click', function () {
      document.querySelectorAll('.timeslot').forEach(s => s.classList.remove('active'));
      this.classList.add('active');
    });
  });


  /* ── Sticky Nav Shadow on Scroll ───────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(11,35,64,0.12)' : 'none';
    });
  }


  /* ── Smooth Scroll for Anchor Links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ── Active Nav Link Highlighting ───────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--teal)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── Appointment Form (if booking modal is added) ────────── */
  // Placeholder: wire up your booking widget or modal here
  document.querySelectorAll('[data-action="book"]').forEach(btn => {
    btn.addEventListener('click', () => {
      // TODO: open booking modal or redirect to scheduler
      // Example: window.location.href = 'pages/book.html';
      alert('Booking system coming soon! Call (909) 555-0180 to schedule.');
    });
  });


  /* ── Current Year in Footer ─────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
