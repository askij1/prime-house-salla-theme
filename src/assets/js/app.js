/**
 * PRIME HOUSE — main JS entry (compiles to public/app.js, loaded in
 * layouts/master.twig). Twilight's own runtime (salla.js, the web
 * components, cart/wishlist logic) is provided by the `@salla.sa/twilight`
 * package pulled in via the official webpack scaffold — this file only
 * adds PRIME HOUSE's own small, additive touches. It does not redefine
 * or override any Salla web component.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Header gains a stronger shadow once the page scrolls past the hero.
  const header = document.querySelector('.ph-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 8px 24px rgba(0,0,0,.35)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const mobileMenu = document.querySelector('#mobile-menu');
  const mobileTrigger = document.querySelector("a[href='#mobile-menu']");
  const mobileClose = document.querySelector('.ph-mobile-menu__close');
  const mobileBackdrop = document.querySelector('.ph-mobile-menu__backdrop');

  if (mobileMenu && mobileTrigger) {
    const setMenuState = (isOpen) => {
      mobileMenu.classList.toggle('is-open', isOpen);
      mobileBackdrop?.classList.toggle('is-open', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      mobileTrigger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('ph-menu-open', isOpen);
      if (isOpen) mobileClose?.focus();
    };

    mobileTrigger.setAttribute('aria-controls', 'mobile-menu');
    mobileTrigger.setAttribute('aria-expanded', 'false');
    mobileTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      setMenuState(true);
    });
    mobileClose?.addEventListener('click', () => setMenuState(false));
    mobileBackdrop?.addEventListener('click', () => setMenuState(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenuState(false);
    });
  }
});
