/**
 * PRIME HOUSE — brands directory entry (public/brands.js), loaded from
 * pages/brands/index.twig. Smooth-scrolls to a letter section when an
 * A–Z nav pill is clicked.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ph-brands-nav__item').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      const target = id && document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
