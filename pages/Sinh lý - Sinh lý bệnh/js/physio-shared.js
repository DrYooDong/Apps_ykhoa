/**
 * Physiology Shared Script: Image Lazy Loading & Lightbox Viewer
 * Shared across the "Sinh lý - Sinh lý bệnh" section.
 */

document.addEventListener('DOMContentLoaded', () => {
  initImageLazyLoading();
  initImageLightbox();
});

/**
 * 1. Image Lazy Loading with Smooth Transition
 */
function initImageLazyLoading() {
  const images = document.querySelectorAll('.image-drop-area img, .physio-content img');
  
  images.forEach(img => {
    // Add lazy class
    img.classList.add('physio-img-lazy');
    
    // Set native lazy load attribute
    if (!img.getAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Smooth transition when loaded
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    }
    
    // Handle error fallback (if image fails to load, don't keep it blank/blurry)
    img.addEventListener('error', () => {
      img.classList.add('loaded');
      img.style.filter = 'none';
    });
  });
}

/**
 * 2. Premium Lightbox Viewer
 */
function initImageLightbox() {
  // Create Lightbox overlay HTML elements if they don't exist
  let overlay = document.querySelector('.physio-lightbox-overlay');
  
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
  
  const lightboxImg = overlay.querySelector('.physio-lightbox-img');
  const lightboxCaption = overlay.querySelector('.physio-lightbox-caption');
  const closeBtn = overlay.querySelector('.physio-lightbox-close');
  
  // Find all clickable diagrams inside image placeholder cards
  const clickableImages = document.querySelectorAll('.image-drop-area img');
  
  clickableImages.forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const src = img.getAttribute('src');
      if (!src) return;
      
      // Load source in lightbox
      lightboxImg.setAttribute('src', src);
      
      // Attempt to extract title and description from parent card
      const parentCard = img.closest('.image-placeholder-card');
      if (parentCard) {
        const titleEl = parentCard.querySelector('.image-title');
        const descEl = parentCard.querySelector('.image-description');
        
        let titleText = titleEl ? titleEl.innerText : 'Chi tiết hình ảnh';
        // Remove emoji prefix if any in title text
        titleText = titleText.replace(/^🖼️\s*/, '');
        
        let descHTML = descEl ? descEl.innerHTML : '';
        // Remove "Mô tả:" leading text if exists to avoid duplication
        descHTML = descHTML.replace(/^\s*<strong>Mô tả:<\/strong>\s*/i, '');
        
        lightboxCaption.innerHTML = `<strong>${titleText}</strong>${descHTML}`;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }
      
      // Open Lightbox
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });
  
  // Helper functions for closing
  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
    setTimeout(() => {
      lightboxImg.setAttribute('src', '');
      lightboxCaption.innerHTML = '';
    }, 280); // Clear source after close transition finishes
  }
  
  // Close triggers
  closeBtn.addEventListener('click', closeLightbox);
  lightboxImg.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });
  
  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}
