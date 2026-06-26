/**
 * Physiology Local Table of Contents (TOC) Dynamic Generator
 * Creates custom desktop sidebars and mobile drawers with ScrollSpy.
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".visual-container");
  if (!container) return;

  // 1. Query H2 & H3 tags in study container (exclude sidebar/notes/placeholders)
  const headings = Array.from(container.querySelectorAll("h2, h3")).filter(h => {
    return !h.closest(".chapter-header") && 
           !h.closest(".image-placeholder-card") && 
           !h.closest(".clinical-note-box") &&
           !h.closest(".high-yield-card") &&
           !h.closest(".physio-details-content");
  });

  if (headings.length < 2) return;

  // Add layout flag class
  container.classList.add("has-toc");

  // 2. Transliterate Vietnamese characters to clean url-safe anchor IDs
  const generateAnchorId = (text) => {
    return text
      .toLowerCase()
      .replace(/đ/g, 'd')
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  // Assign unique IDs to matching headings
  headings.forEach(heading => {
    if (!heading.id) {
      let baseId = generateAnchorId(heading.textContent);
      let id = baseId;
      let counter = 1;
      while (document.getElementById(id)) {
        id = `${baseId}-${counter++}`;
      }
      heading.id = id;
    }
  });

  // 3. Re-structure page layout elements for sticky grid
  const header = container.querySelector(".chapter-header");
  const children = Array.from(container.children);

  const layoutWrapper = document.createElement("div");
  layoutWrapper.className = "visual-layout";

  const bodyWrapper = document.createElement("div");
  bodyWrapper.className = "visual-body";

  // Reparent study contents into main visual-body wrapper
  children.forEach(child => {
    if (child !== header && !child.classList.contains("breadcrumb-container")) {
      bodyWrapper.appendChild(child);
    }
  });

  layoutWrapper.appendChild(bodyWrapper);
  container.appendChild(layoutWrapper);

  // 4. Instantiate list elements
  const activeLinks = [];
  const createTocList = () => {
    const tocList = document.createElement("ul");
    tocList.className = "toc-list";

    headings.forEach(heading => {
      const li = document.createElement("li");
      li.className = `toc-item toc-item-${heading.tagName.toLowerCase()}`;

      const link = document.createElement("a");
      link.className = "toc-link";
      link.href = `#${heading.id}`;
      
      // Tidy text (remove bullet numberings from display if user wants, or keep them)
      let linkText = heading.textContent.trim();
      link.textContent = linkText;
      link.title = linkText;

      // Click to scroll event handler
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          const headerOffset = 90; // Top header overlap gap offset
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });

          // Push hash to history address
          history.pushState(null, null, `#${heading.id}`);
          closeMobileDrawer();
        }
      });

      li.appendChild(link);
      tocList.appendChild(li);
      activeLinks.push(link);
    });

    return tocList;
  };

  // 5. Construct Desktop Sticky Sidebar
  const desktopSidebar = document.createElement("aside");
  desktopSidebar.className = "toc-sidebar";
  
  const desktopHeader = document.createElement("div");
  desktopHeader.className = "toc-header";
  desktopHeader.innerHTML = `<span class="toc-title">📍 Mục lục</span>`;
  desktopSidebar.appendChild(desktopHeader);

  const desktopBody = document.createElement("div");
  desktopBody.className = "toc-body";
  desktopBody.appendChild(createTocList());
  desktopSidebar.appendChild(desktopBody);

  layoutWrapper.appendChild(desktopSidebar);

  // 6. Construct Mobile Sidebar Drawer & Overlay Triggers
  const floatingBtn = document.createElement("button");
  floatingBtn.className = "toc-floating-btn";
  floatingBtn.innerHTML = "📋";
  floatingBtn.title = "Mục lục bài học";
  floatingBtn.setAttribute("aria-label", "Mở mục lục");
  document.body.appendChild(floatingBtn);

  const backdropOverlay = document.createElement("div");
  backdropOverlay.className = "toc-overlay";
  document.body.appendChild(backdropOverlay);

  const mobileDrawer = document.createElement("div");
  mobileDrawer.className = "toc-drawer";
  
  const drawerHeader = document.createElement("div");
  drawerHeader.className = "toc-header";
  drawerHeader.innerHTML = `
    <span class="toc-title">📍 Mục lục</span>
    <button class="toc-toggle-close" aria-label="Đóng mục lục">&times;</button>
  `;
  mobileDrawer.appendChild(drawerHeader);

  const drawerBody = document.createElement("div");
  drawerBody.className = "toc-body";
  drawerBody.appendChild(createTocList());
  mobileDrawer.appendChild(drawerBody);
  document.body.appendChild(mobileDrawer);

  // Mobile drawer trigger behaviors
  const closeBtn = drawerHeader.querySelector(".toc-toggle-close");
  const openMobileDrawer = () => {
    mobileDrawer.classList.add("open");
    backdropOverlay.classList.add("show");
  };
  const closeMobileDrawer = () => {
    mobileDrawer.classList.remove("open");
    backdropOverlay.classList.remove("show");
  };

  floatingBtn.addEventListener("click", openMobileDrawer);
  closeBtn.addEventListener("click", closeMobileDrawer);
  backdropOverlay.addEventListener("click", closeMobileDrawer);

  // Swipe gestures for closing mobile drawer
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const swipeThreshold = 50; 
  const edgeThreshold = 40;  

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
  }, { passive: true });

  const handleSwipeGesture = () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      const isDrawerOpen = mobileDrawer.classList.contains("open");

      if (!isDrawerOpen) {
        // Swipe from right margin to open drawer
        const startedAtRight = touchStartX > (window.innerWidth - edgeThreshold);
        if (diffX < -swipeThreshold && startedAtRight) {
          openMobileDrawer();
        }
      } else {
        // Swipe left to right to close drawer
        if (diffX > swipeThreshold) {
          closeMobileDrawer();
        }
      }
    }
  };

  // 7. ScrollSpy: active highlights and sidebar centering alignment
  const handlePageScroll = () => {
    const scrollOffset = window.scrollY + 130; // offset index trigger

    let activeHeading = null;
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const top = heading.getBoundingClientRect().top + window.scrollY;
      if (scrollOffset >= top) {
        activeHeading = heading;
      } else {
        break;
      }
    }

    const updateActiveState = (activeId) => {
      activeLinks.forEach(link => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active");
          
          // Smooth center alignment of active heading in sidebar scroll area
          const scrollArea = link.closest(".toc-sidebar, .toc-drawer .toc-body");
          if (scrollArea) {
            const containerScroll = scrollArea.scrollTop;
            const containerHeight = scrollArea.clientHeight;
            
            const linkOffsetTop = link.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top + containerScroll;
            const linkHeight = link.clientHeight;
            
            // Adjust scrollbar position if item is outside layout margins
            if (linkOffsetTop < containerScroll) {
              scrollArea.scrollTo({
                top: linkOffsetTop - 15,
                behavior: "smooth"
              });
            } else if (linkOffsetTop + linkHeight > containerScroll + containerHeight) {
              scrollArea.scrollTo({
                top: linkOffsetTop + linkHeight - containerHeight + 15,
                behavior: "smooth"
              });
            }
          }
        } else {
          link.classList.remove("active");
        }
      });
    };

    if (activeHeading) {
      updateActiveState(activeHeading.id);
    } else if (headings.length > 0) {
      updateActiveState(headings[0].id);
    }
  };

  window.addEventListener("scroll", handlePageScroll, { passive: true });
  handlePageScroll(); // Call once on start
});
