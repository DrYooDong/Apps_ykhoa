/**
 * Stripe-Inspired Follow Along Mega Menu (mega-menu.js)
 * Location: js/components/mega-menu.js
 * CliniPortal Framework — Vanilla JavaScript
 */

(function () {
  'use strict';

  let triggers = [];
  let background = null;
  let nav = null;
  let activeTimer = null;

  function initMegaMenu() {
    nav = document.querySelector('.header-nav-modules');
    if (!nav) return;

    // Check if background container exists
    background = document.querySelector('.cp-dropdown-background');
    if (!background) {
      background = document.createElement('div');
      background.className = 'cp-dropdown-background';
      background.innerHTML = '<span class="cp-dropdown-arrow"></span>';
      document.body.appendChild(background);
    }

    triggers = nav.querySelectorAll('.header-module-dropdown-wrapper, .cp-mega-trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', handleEnter);
      trigger.addEventListener('mouseleave', handleLeave);
    });

    background.addEventListener('mouseenter', () => clearTimeout(activeTimer));
    background.addEventListener('mouseleave', handleLeave);
  }

  function handleEnter(e) {
    clearTimeout(activeTimer);
    const trigger = e.currentTarget;
    const dropdown = trigger.querySelector('.header-dropdown-menu, .cp-dropdown-content');
    if (!dropdown) return;

    trigger.classList.add('trigger-enter');
    setTimeout(() => {
      if (trigger.classList.contains('trigger-enter')) {
        trigger.classList.add('trigger-enter-active');
      }
    }, 100);

    background.classList.add('open');

    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top,
      left: dropdownCoords.left
    };

    background.style.width = `${coords.width}px`;
    background.style.height = `${coords.height}px`;
    background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  }

  function handleLeave(e) {
    const trigger = e.currentTarget;
    activeTimer = setTimeout(() => {
      if (trigger && trigger.classList) {
        trigger.classList.remove('trigger-enter', 'trigger-enter-active');
      }
      if (background) {
        background.classList.remove('open');
      }
    }, 150);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMegaMenu);
  } else {
    initMegaMenu();
  }

  window.CliniPortalMegaMenu = {
    init: initMegaMenu
  };
})();
