/* ============================================================
   TABLE OF CONTENTS (TOC) DYNAMIC GENERATION (toc.js)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const visualContainer = document.querySelector(".visual-container");
    const homepageWrapper = document.querySelector(".homepage-wrapper");
    const mainContainer = visualContainer || homepageWrapper || document.querySelector("main");

    if (!mainContainer) return;

    // 1. Quét các tiêu đề h1, h2, h3 trong vùng nội dung
    let headings = [];
    if (visualContainer) {
        headings = Array.from(visualContainer.querySelectorAll("h2, h3")).filter(h => {
            return !h.closest(".chapter-header") && 
                   !h.closest(".image-placeholder-card") && 
                   !h.closest(".clinical-note-box") &&
                   !h.closest(".high-yield-card");
        });
    } else if (homepageWrapper) {
        headings = Array.from(homepageWrapper.querySelectorAll(".homepage-left h1, .homepage-left h2, .homepage-left section[id], .homepage-right section[id]")).filter(h => {
            // Pick section elements or headings that represent main blocks
            if (h.tagName.startsWith('H')) {
                return h.textContent.trim().length > 0 && !h.closest('.widget-card');
            }
            return h.id && (h.querySelector('h2, h3, .widget-title') !== null);
        }).map(el => {
            if (el.tagName.startsWith('H')) return el;
            return el.querySelector('h2, h3, .widget-title') || el;
        });
    } else {
        headings = Array.from(mainContainer.querySelectorAll("h2, h3"));
    }

    // Filter out duplicates and invalid headings
    headings = Array.from(new Set(headings)).filter(h => h && h.textContent.trim().length > 0);

    if (headings.length < 2) return;

    // 2. Thêm class báo hiệu có TOC cho container
    mainContainer.classList.add("has-toc");

    // 3. Chuẩn hóa tiêu đề tiếng Việt thành ID không dấu làm neo liên kết (anchor link)
    const generateId = (text) => {
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

    // Đảm bảo tất cả tiêu đề đều có ID duy nhất
    headings.forEach(heading => {
        if (!heading.id) {
            let baseId = generateId(heading.textContent);
            let id = baseId;
            let counter = 1;
            while (document.getElementById(id)) {
                id = `${baseId}-${counter++}`;
            }
            heading.id = id;
        }
    });

    // 4. Tạo cấu trúc layout (chỉ dành cho .visual-container)
    let layoutWrapper = null;
    if (visualContainer) {
        const header = visualContainer.querySelector(".chapter-header");
        const children = Array.from(visualContainer.children);

        layoutWrapper = document.createElement("div");
        layoutWrapper.className = "visual-layout";

        const bodyWrapper = document.createElement("div");
        bodyWrapper.className = "visual-body";

        children.forEach(child => {
            if (child !== header && !child.classList.contains("breadcrumb-container")) {
                bodyWrapper.appendChild(child);
            }
        });

        layoutWrapper.appendChild(bodyWrapper);
        visualContainer.appendChild(layoutWrapper);
    }

    // 5. Hàm tạo danh sách liên kết TOC
    const allLinks = [];
    const createTocList = () => {
        const tocList = document.createElement("ul");
        tocList.className = "toc-list";

        headings.forEach(heading => {
            const li = document.createElement("li");
            li.className = `toc-item toc-item-${heading.tagName.toLowerCase()}`;

            const link = document.createElement("a");
            link.className = "toc-link";
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent.trim();

            link.addEventListener("click", (e) => {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    const headerOffset = 80; // 60px header + 20px padding
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    history.pushState(null, null, `#${heading.id}`);
                    closeDrawer();
                }
            });

            li.appendChild(link);
            tocList.appendChild(li);
            allLinks.push(link);
        });

        return tocList;
    };

    // 6. Xây dựng sidebar cho Desktop
    if (visualContainer && layoutWrapper) {
        const desktopSidebar = document.createElement("aside");
        desktopSidebar.className = "toc-sidebar";
        
        const desktopHeader = document.createElement("div");
        desktopHeader.className = "toc-header";
        desktopHeader.innerHTML = `<span class="toc-title">📍 Mục lục bài viết</span>`;
        desktopSidebar.appendChild(desktopHeader);

        const desktopBody = document.createElement("div");
        desktopBody.className = "toc-body";
        desktopBody.appendChild(createTocList());
        desktopSidebar.appendChild(desktopBody);

        layoutWrapper.appendChild(desktopSidebar);
    } else if (homepageWrapper) {
        // Render desktop TOC widget into homepage-right top
        const rightCol = homepageWrapper.querySelector(".homepage-right");
        if (rightCol) {
            const tocWidget = document.createElement("section");
            tocWidget.className = "widget-card toc-widget";
            tocWidget.setAttribute("aria-label", "Mục lục trang chủ");

            tocWidget.innerHTML = `
                <div class="widget-header">
                    <h3 class="widget-title">
                        <i class="fa-solid fa-list-ol"></i> Mục lục trang chủ
                    </h3>
                </div>
                <div class="widget-body">
                    <div class="toc-sidebar-inline"></div>
                </div>
            `;
            const inlineBody = tocWidget.querySelector(".toc-sidebar-inline");
            inlineBody.appendChild(createTocList());
            rightCol.insertBefore(tocWidget, rightCol.firstChild);
        }
    }

    // 7. Xây dựng phần di động (Trigger Button, Overlay, Drawer Panel)
    const floatingBtn = document.createElement("button");
    floatingBtn.className = "toc-floating-btn";
    floatingBtn.innerHTML = "📋";
    floatingBtn.title = "Mục lục trang (Phím T)";
    floatingBtn.setAttribute("aria-label", "Mục lục");
    document.body.appendChild(floatingBtn);

    const overlay = document.createElement("div");
    overlay.className = "toc-overlay";
    document.body.appendChild(overlay);

    const drawer = document.createElement("div");
    drawer.className = "toc-drawer";
    
    const drawerHeader = document.createElement("div");
    drawerHeader.className = "toc-header";
    drawerHeader.innerHTML = `
        <span class="toc-title">📍 Mục lục điều hướng</span>
        <button class="toc-toggle-close" aria-label="Đóng mục lục">&times;</button>
    `;
    drawer.appendChild(drawerHeader);

    const drawerBody = document.createElement("div");
    drawerBody.className = "toc-body";
    drawerBody.appendChild(createTocList());
    drawer.appendChild(drawerBody);
    document.body.appendChild(drawer);

    // Các hàm đóng mở drawer di động
    const closeBtn = drawerHeader.querySelector(".toc-toggle-close");
    const openDrawer = () => {
        drawer.classList.add("open");
        overlay.classList.add("show");
    };
    const closeDrawer = () => {
        drawer.classList.remove("open");
        overlay.classList.remove("show");
    };

    const toggleDrawer = () => {
        if (drawer.classList.contains("open")) {
            closeDrawer();
        } else {
            openDrawer();
        }
    };

    floatingBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // Hotkey listener for 'T' key to toggle TOC
    document.addEventListener("keydown", (e) => {
        if (e.key === "t" || e.key === "T") {
            const activeEl = document.activeElement;
            const isTyping = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
            if (!isTyping && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                toggleDrawer();
            }
        }
    });

    // 8. Cử chỉ vuốt chạm (Swipe Gestures) trên Mobile để đóng/mở
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
        handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            const isDrawerOpen = drawer.classList.contains("open");

            if (!isDrawerOpen) {
                const startedAtRightEdge = touchStartX > (window.innerWidth - edgeThreshold);
                if (diffX < -swipeThreshold && startedAtRightEdge) {
                    openDrawer();
                }
            } else {
                if (diffX > swipeThreshold) {
                    closeDrawer();
                }
            }
        }
    };

    // 9. ScrollSpy Logic
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 120;

        let currentHeading = null;
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const top = heading.getBoundingClientRect().top + window.scrollY;
            if (scrollPosition >= top) {
                currentHeading = heading;
            } else {
                break;
            }
        }

        const updateActiveLink = (activeId) => {
            allLinks.forEach(link => {
                if (link.getAttribute("href") === `#${activeId}`) {
                    link.classList.add("active");
                    
                    const scrollContainer = link.closest(".toc-sidebar, .toc-drawer .toc-body, .toc-sidebar-inline");
                    if (scrollContainer) {
                        const containerScrollTop = scrollContainer.scrollTop;
                        const containerHeight = scrollContainer.clientHeight;
                        
                        const linkOffsetTop = link.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top + containerScrollTop;
                        const linkHeight = link.clientHeight;
                        
                        if (linkOffsetTop < containerScrollTop) {
                            scrollContainer.scrollTo({
                                top: linkOffsetTop - 10,
                                behavior: "smooth"
                            });
                        } else if (linkOffsetTop + linkHeight > containerScrollTop + containerHeight) {
                            scrollContainer.scrollTo({
                                top: linkOffsetTop + linkHeight - containerHeight + 10,
                                behavior: "smooth"
                            });
                        }
                    }
                } else {
                    link.classList.remove("active");
                }
            });
        };

        if (currentHeading) {
            updateActiveLink(currentHeading.id);
        } else if (headings.length > 0) {
            updateActiveLink(headings[0].id);
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

