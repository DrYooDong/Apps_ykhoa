/**
 * ebm-premium-system.js
 * Logic cho hệ thống UI/UX Premium (Animations, FAB, Progress, Toast)
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initReadingProgress();
  initFAB();
  initToastContainer();
});

// 1. Scroll Animations (Intersection Observer)
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.anim-fade-in-up, .anim-pop');
  
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  });

  animatedElements.forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// 2. Reading Progress Bar
function initReadingProgress() {
  // Chỉ init nếu trang dài (bài viết, guideline)
  if (document.body.scrollHeight <= window.innerHeight * 1.5) return;

  const container = document.createElement('div');
  container.className = 'reading-progress-container';
  
  const bar = document.createElement('div');
  bar.className = 'reading-progress-bar';
  
  container.appendChild(bar);
  document.body.appendChild(container);

  window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPos = window.scrollY;
    
    if (scrollTotal > 0) {
      const progress = (scrollPos / scrollTotal) * 100;
      bar.style.width = `${progress}%`;
    }
  });
}

// 3. Floating Action Button (FAB)
function initFAB() {
  // Create FAB if not exists in HTML but requested by config or generic script
  // Normally, it's better to inject it explicitly in HTML if needed on specific pages
}

window.setupFAB = function(items) {
  const existing = document.querySelector('.ebm-fab-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.className = 'ebm-fab-container';

  const menu = document.createElement('div');
  menu.className = 'ebm-fab-menu';

  items.forEach(item => {
    const el = document.createElement(item.href ? 'a' : 'div');
    el.className = 'ebm-fab-item';
    if (item.href) el.href = item.href;
    el.innerHTML = item.icon;
    el.setAttribute('data-tooltip', item.label);
    if (item.onClick) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        item.onClick();
        container.classList.remove('active');
      });
    }
    menu.appendChild(el);
  });

  const mainBtn = document.createElement('button');
  mainBtn.className = 'ebm-fab-main';
  mainBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  mainBtn.addEventListener('click', () => {
    container.classList.toggle('active');
  });

  container.appendChild(menu);
  container.appendChild(mainBtn);
  document.body.appendChild(container);
};

// 4. Toast Notification System
function initToastContainer() {
  const container = document.createElement('div');
  container.className = 'ebm-toast-container';
  container.id = 'ebm-toast-container';
  document.body.appendChild(container);
}

window.showEbmToast = function(title, message, type = 'info', duration = 3000) {
  const container = document.getElementById('ebm-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'ebm-toast';

  let iconClass = 'fa-circle-info';
  if (type === 'success') iconClass = 'fa-circle-check';
  if (type === 'error') iconClass = 'fa-circle-xmark';
  if (type === 'warning') iconClass = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <div class="ebm-toast-icon ${type}">
      <i class="fa-solid ${iconClass}"></i>
    </div>
    <div class="ebm-toast-content">
      <div class="ebm-toast-title">${title}</div>
      <div class="ebm-toast-desc">${message}</div>
    </div>
    <button class="ebm-toast-close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Setup close button
  const closeBtn = toast.querySelector('.ebm-toast-close');
  closeBtn.addEventListener('click', () => {
    hideToast(toast);
  });

  // Auto close
  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentNode) hideToast(toast);
    }, duration);
  }
};

function hideToast(toast) {
  toast.classList.remove('show');
  toast.classList.add('hide');
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 400); // Wait for transition
}
