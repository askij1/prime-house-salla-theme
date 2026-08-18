/**
 * PRIME HOUSE — home page entry (public/home.js), loaded from
 * pages/index.twig `{% block scripts %}`.
 * Handles the simple tab-switching for the featured-products component's
 * multiple tabs (see views/components/home/featured-products.twig).
 */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ph-tab-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const group = trigger.closest('.ph-tabs');
      const targetId = trigger.dataset.target;
      if (!group || !targetId) return;

      group.querySelectorAll('.ph-tab-trigger').forEach((t) => t.classList.remove('is-active'));
      trigger.classList.add('is-active');

      const section = trigger.closest('section');
      if (!section) return;
      section.querySelectorAll('.product-grid').forEach((grid) => grid.classList.add('hidden'));
      const target = document.getElementById(targetId);
      if (target) target.classList.remove('hidden');
    });
  });
});
