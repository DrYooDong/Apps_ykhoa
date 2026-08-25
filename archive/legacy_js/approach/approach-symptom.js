/* ============================================================
   CLINICAL SYMPTOM APPROACH LOGIC (approach-symptom.js)
   Dynamically generates TOC in the sidebar and handles ScrollSpy
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".symptom-step-card"));
  if (cards.length === 0) return;

  // 1. Ensure all step cards have unique IDs for anchor linking
  cards.forEach((card, index) => {
    if (!card.id) {
      const tagText = card.querySelector(".step-card-tag")?.textContent?.trim() || "";
      const titleText = card.querySelector(".step-card-title")?.textContent?.trim() || "";
      
      // Create a slug from the title or use index
      let slug = "";
      if (titleText) {
        slug = titleText
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
      }
      
      const prefix = tagText ? tagText.toLowerCase().replace(/\s+/g, '-') : 'buoc-' + (index + 1);
      card.id = prefix + (slug ? '-' + slug : '');
    }
  });

  // 2. Locate the sidebar nav container to append the TOC
  const sidebar = document.getElementById("appSidebar") || document.querySelector(".app-sidebar");
  if (!sidebar) return;
  
  const sidebarNav = sidebar.querySelector(".sidebar-nav");
  if (!sidebarNav) return;

  // 3. Create TOC elements
  const tocContainer = document.createElement("div");
  tocContainer.className = "sidebar-toc";

  const tocTitle = document.createElement("div");
  tocTitle.className = "sidebar-toc-title";
  tocTitle.innerHTML = `<i class="fas fa-list-ol"></i> Lộ trình tiếp cận`;
  tocContainer.appendChild(tocTitle);

  const tocList = document.createElement("ul");
  tocList.className = "sidebar-toc-list";

  const allLinks = [];

  cards.forEach(card => {
    const tagText = card.querySelector(".step-card-tag")?.textContent?.trim() || "";
    const titleText = card.querySelector(".step-card-title")?.textContent?.trim() || "";
    
    // Combine step tag and title for TOC label, e.g., "Bước 1: Loại trừ Cảnh báo đỏ"
    let linkLabel = "";
    if (tagText && titleText) {
      linkLabel = `${tagText}: ${titleText}`;
    } else {
      linkLabel = titleText || tagText || "Bước tiếp cận";
    }

    const li = document.createElement("li");
    li.className = "sidebar-toc-item";

    const link = document.createElement("a");
    link.className = "sidebar-toc-link";
    link.href = `#${card.id}`;
    link.setAttribute("data-target", card.id);
    link.textContent = linkLabel;
    link.title = linkLabel; // Show full title on hover

    // Click handler for smooth scrolling
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetCard = document.getElementById(card.id);
      if (targetCard) {
        const headerOffset = 80; // 60px header + 20px padding
        const elementPosition = targetCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Update URL hash without jumping
        history.pushState(null, null, `#${card.id}`);

        // Close mobile sidebar if open
        const overlay = document.getElementById("sidebarOverlay");
        if (window.innerWidth < 768) {
          sidebar.classList.remove("open");
          overlay?.classList.remove("show");
        }
      }
    });

    li.appendChild(link);
    tocList.appendChild(li);
    allLinks.push(link);
  });

  tocContainer.appendChild(tocList);
  sidebarNav.appendChild(tocContainer);

  // 4. ScrollSpy Logic
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 120; // 60px header + 60px buffer
    let activeCardId = "";

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const top = card.getBoundingClientRect().top + window.scrollY;
      if (scrollPosition >= top) {
        activeCardId = card.id;
      } else {
        break;
      }
    }

    // Fallback to first step if we are at the very top of the page
    if (!activeCardId && cards.length > 0 && window.scrollY < 200) {
      activeCardId = cards[0].id;
    }

    // Highlight the active link and auto-scroll the sidebar TOC container if needed
    allLinks.forEach(link => {
      const targetId = link.getAttribute("data-target");
      if (targetId === activeCardId) {
        link.classList.add("active");
        
        // Auto scroll active link into sidebar view
        const linkRect = link.getBoundingClientRect();
        const navRect = sidebarNav.getBoundingClientRect();
        if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
          link.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } else {
        link.classList.remove("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  // Run once to initialize
  setTimeout(handleScroll, 100);
});
