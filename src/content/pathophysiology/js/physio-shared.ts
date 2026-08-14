/**
 * Physiology Shared Script (TypeScript): Image Lazy Loading & Lightbox Viewer
 * Shared across the "Sinh lý - Sinh lý bệnh" section.
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

export function initPhysioAll(): void {
  initImageLazyLoading();
  initImageLightbox();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initPhysioAll);
}
