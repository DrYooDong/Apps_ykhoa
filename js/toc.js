/* ============================================================
   TABLE OF CONTENTS (TOC) DYNAMIC GENERATION (toc.js)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".visual-container");
    if (!container) return;

    // 1. Quét các tiêu đề h2 và h3 trong vùng nội dung
    const headings = Array.from(container.querySelectorAll("h2, h3")).filter(h => {
        return !h.closest(".chapter-header") && 
               !h.closest(".image-placeholder-card") && 
               !h.closest(".clinical-note-box") &&
               !h.closest(".high-yield-card");
    });

    if (headings.length < 2) return;

    // 2. Thêm class báo hiệu có TOC cho container
    container.classList.add("has-toc");

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

    // 4. Tạo cấu trúc cột cho layout: visual-layout và visual-body
    const header = container.querySelector(".chapter-header");
    const children = Array.from(container.children);

    const layoutWrapper = document.createElement("div");
    layoutWrapper.className = "visual-layout";

    const bodyWrapper = document.createElement("div");
    bodyWrapper.className = "visual-body";

    // Di chuyển toàn bộ phần tử con (trừ chapter-header và breadcrumb) vào bodyWrapper
    children.forEach(child => {
        if (child !== header && !child.classList.contains("breadcrumb-container")) {
            bodyWrapper.appendChild(child);
        }
    });

    layoutWrapper.appendChild(bodyWrapper);
    container.appendChild(layoutWrapper);

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

                    // Cập nhật hash trên thanh địa chỉ
                    history.pushState(null, null, `#${heading.id}`);

                    // Đóng mobile drawer nếu đang mở
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

    // 7. Xây dựng phần di động (Trigger Button, Overlay, Drawer Panel)
    const floatingBtn = document.createElement("button");
    floatingBtn.className = "toc-floating-btn";
    floatingBtn.innerHTML = "📋";
    floatingBtn.title = "Mục lục bài học";
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
        <span class="toc-title">📍 Mục lục</span>
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

    floatingBtn.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // 8. Cử chỉ vuốt chạm (Swipe Gestures) trên Mobile để đóng/mở
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // khoảng cách vuốt tối thiểu (px)
    const edgeThreshold = 40;  // vùng kích hoạt vuốt từ viền phải (px)

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

        // Chỉ xử lý vuốt ngang
        if (Math.abs(diffX) > Math.abs(diffY)) {
            const isDrawerOpen = drawer.classList.contains("open");

            if (!isDrawerOpen) {
                // Vuốt từ viền màn hình bên phải sang trái để mở
                const startedAtRightEdge = touchStartX > (window.innerWidth - edgeThreshold);
                if (diffX < -swipeThreshold && startedAtRightEdge) {
                    openDrawer();
                }
            } else {
                // Vuốt từ trái sang phải ở bất kỳ đâu khi drawer mở để đóng
                if (diffX > swipeThreshold) {
                    closeDrawer();
                }
            }
        }
    };

    // 9. ScrollSpy Logic: tự động đổi màu mục lục và cuộn mục lục tương ứng vào tầm nhìn
    const handleScroll = () => {
        const scrollPosition = window.scrollY + 120; // 80px header + 40px bù đắp

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
                    
                    // Tự động cuộn link đang active vào giữa vùng nhìn của container chứa nó (sidebar hoặc drawer)
                    const scrollContainer = link.closest(".toc-sidebar, .toc-drawer .toc-body");
                    if (scrollContainer) {
                        const containerScrollTop = scrollContainer.scrollTop;
                        const containerHeight = scrollContainer.clientHeight;
                        
                        // Tính vị trí offset của link đối với container cuộn
                        const linkOffsetTop = link.getBoundingClientRect().top - scrollContainer.getBoundingClientRect().top + containerScrollTop;
                        const linkHeight = link.clientHeight;
                        
                        // Nếu liên kết nằm ngoài tầm nhìn (phía trên hoặc phía dưới) thì cuộn
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
    handleScroll(); // Chạy khởi tạo ngay lúc tải trang
});
