/**
 * CliniPortal — Physiology & Pathophysiology Shared Module (TypeScript)
 * Path: src/content/basic-medical/js/physio-shared.ts
 * Integrates:
 * 1. Image Lazy Loading & Lightbox Viewer
 * 2. Reading Progress Bar
 * 3. Anchor Smooth Scrolling
 * 4. Clinical Pearl / Key Takeaways Copy Widget
 */

export function initImageLazyLoading(): void {
  const images = document.querySelectorAll('.image-drop-area img, .physio-content img');

  images.forEach(imgEl => {
    const img = imgEl as HTMLImageElement;
    img.classList.add('physio-img-lazy');

    if (!img.getAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }

    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }

    img.addEventListener('error', () => {
      img.classList.add('loaded');
      img.style.filter = 'none';
    });
  });
}

export function initImageLightbox(): void {
  let overlay = document.querySelector('.physio-lightbox-overlay') as HTMLElement | null;

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'physio-lightbox-overlay';
    overlay.innerHTML = `
      <button class="physio-lightbox-close" aria-label="Đóng">&times;</button>
      <div class="physio-lightbox-content">
        <img class="physio-lightbox-img" src="" alt="Phóng to hình ảnh">
        <div class="physio-lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const lightboxImg = overlay.querySelector('.physio-lightbox-img') as HTMLImageElement | null;
  const lightboxCaption = overlay.querySelector('.physio-lightbox-caption') as HTMLElement | null;
  const closeBtn = overlay.querySelector('.physio-lightbox-close') as HTMLElement | null;

  const clickableImages = document.querySelectorAll('.image-drop-area img');

  clickableImages.forEach(imgEl => {
    const img = imgEl as HTMLImageElement;
    img.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation();
      const parentCard = img.closest('.image-placeholder-card');
      let captionText = img.alt || '';

      if (parentCard) {
        const titleEl = parentCard.querySelector('.image-card-title');
        const descEl = parentCard.querySelector('.image-card-desc');
        if (titleEl && descEl) {
          captionText = `<strong>${titleEl.textContent}</strong>: ${descEl.textContent}`;
        } else if (titleEl) {
          captionText = `<strong>${titleEl.textContent}</strong>`;
        }
      }

      if (lightboxImg) lightboxImg.src = img.src;
      if (lightboxCaption) lightboxCaption.innerHTML = captionText;
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e: MouseEvent) => {
    if (e.target === overlay || (e.target as HTMLElement).classList.contains('physio-lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && overlay?.classList.contains('active')) {
      closeLightbox();
    }
  });
}

export function initPhysioReadingProgress(): void {
  let progressBar = document.getElementById('physio-reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'physio-reading-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary, #0284c7), #06b6d4);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
    }
  }, { passive: true });
}

export function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', targetId);
      }
    });
  });
}

export function initPearlCopy(): void {
  document.querySelectorAll('.clinical-pearl, .takeaway-box, .key-message').forEach((box) => {
    if (box.querySelector('.pearl-copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'pearl-copy-btn';
    btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép';
    btn.style.cssText = `
      float: right;
      font-size: 0.75rem;
      border: 1px solid var(--color-divider, #e2e8f0);
      background: var(--color-surface, #fff);
      color: var(--color-text-muted, #64748b);
      border-radius: 4px;
      padding: 2px 8px;
      cursor: pointer;
      margin-bottom: 4px;
    `;
    btn.addEventListener('click', () => {
      const text = (box as HTMLElement).innerText.replace('Sao chép', '').trim();
      navigator.clipboard?.writeText(text).then(() => {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
        setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép'; }, 2000);
      });
    });
    box.prepend(btn);
  });
}

export function initPhysioShared(): void {
  initPhysioReadingProgress();
  initSmoothScroll();
  initPearlCopy();
}

export function initPhysioAll(): void {
  initImageLazyLoading();
  initImageLightbox();
  initPhysioShared();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhysioAll);
  } else {
    initPhysioAll();
  }
}
