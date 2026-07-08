document.addEventListener("DOMContentLoaded", () => {
    // 1. Accordion logic (used in Sinhly-sinhlybenh.html)
    const groupHeadings = document.querySelectorAll('.group-heading');
    groupHeadings.forEach(heading => {
        heading.addEventListener('click', () => {
            const container = heading.closest('.group-container');
            if (container) {
                container.classList.toggle('active');
            }
        });
    });

    // 2. Real-time search filter logic (used in specialty hub pages like SL_HeMau&Huyethoc.html)
    const searchInput = document.getElementById("search-input");
    const sections = document.querySelectorAll(".compartment-section");
    const emptyState = document.getElementById("empty-search-state");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            let anyVisible = false;

            sections.forEach(section => {
                let sectionVisibleCount = 0;
                const cards = section.querySelectorAll(".lesson-card");

                cards.forEach(card => {
                    const keywords = card.getAttribute("data-keywords") || "";
                    if (keywords.toLowerCase().includes(query)) {
                        card.style.display = "flex";
                        sectionVisibleCount++;
                        anyVisible = true;
                    } else {
                        card.style.display = "none";
                    }
                });

                if (sectionVisibleCount > 0) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });

            if (emptyState) {
                emptyState.style.display = anyVisible ? "none" : "flex";
            }
        });
    }


    // 3. Physiology Dashboard Layout Logic (Sinhly-sinhlybenh.html)
    const dashboardLayout = document.querySelector(".dashboard-layout");
    if (dashboardLayout) {
        const viewGridBtn = document.getElementById("view-grid-btn");
        const viewListBtn = document.getElementById("view-list-btn");
        const specialtyGrids = document.querySelectorAll(".specialty-grid");

        const setViewMode = (mode) => {
            if (mode === "list") {
                specialtyGrids.forEach(grid => grid.classList.add("list-view"));
                viewGridBtn.classList.remove("active");
                viewListBtn.classList.add("active");
                localStorage.setItem("physio-view-mode", "list");
            } else {
                specialtyGrids.forEach(grid => grid.classList.remove("list-view"));
                viewGridBtn.classList.add("active");
                viewListBtn.classList.remove("active");
                localStorage.setItem("physio-view-mode", "grid");
            }
        };

        const savedViewMode = localStorage.getItem("physio-view-mode");
        if (savedViewMode === "list") {
            setViewMode("list");
        } else {
            setViewMode("grid");
        }

        viewGridBtn.addEventListener("click", () => setViewMode("grid"));
        viewListBtn.addEventListener("click", () => setViewMode("list"));

        // Real-time Lesson Search Filter
        const lessonSearch = document.getElementById("lesson-search");
        const clearSearchBtn = document.getElementById("clear-search");
        const sections = document.querySelectorAll("#lessons-container section");
        const emptyState = document.getElementById("empty-search-state");

        lessonSearch.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const hasQuery = query.length > 0;
            let anyVisible = false;

            if (hasQuery) {
                clearSearchBtn.style.display = "block";
            } else {
                clearSearchBtn.style.display = "none";
            }

            // Handle favorites section visibility during search
            const favoritesSection = document.getElementById("favorites-section");
            if (favoritesSection) {
                favoritesSection.style.display = hasQuery ? "none" : "block";
            }

            sections.forEach((section) => {
                if (section.id === "favorites-section") return; // Skip filtering cards in favorites section

                const cards = section.querySelectorAll(".specialty-card");
                let visibleCardsCount = 0;

                cards.forEach(card => {
                    const titleText = card.querySelector("h3") ? card.querySelector("h3").textContent : "";
                    if (titleText.toLowerCase().includes(query)) {
                        card.style.display = "flex";
                        visibleCardsCount++;
                        anyVisible = true;
                    } else {
                        card.style.display = "none";
                    }
                });

                if (visibleCardsCount > 0) {
                    section.style.display = "block";
                    const divider = section.nextElementSibling;
                    if (divider && divider.classList.contains("section-divider")) {
                        divider.style.display = "block";
                    }
                } else {
                    section.style.display = "none";
                    const divider = section.nextElementSibling;
                    if (divider && divider.classList.contains("section-divider")) {
                        divider.style.display = "none";
                    }
                }

                const sidebarItem = document.querySelector(`.part-nav-item[data-target="${section.id}"]`);
                if (sidebarItem) {
                    const badge = sidebarItem.querySelector(".part-count-badge");
                    if (badge) {
                        badge.textContent = visibleCardsCount;
                        if (visibleCardsCount === 0) {
                            sidebarItem.style.opacity = "0.5";
                        } else {
                            sidebarItem.style.opacity = "1";
                        }
                    }
                }
            });

            if (emptyState) {
                emptyState.style.display = anyVisible ? "none" : "flex";
            }
        });

        clearSearchBtn.addEventListener("click", () => {
            lessonSearch.value = "";
            clearSearchBtn.style.display = "none";
            lessonSearch.dispatchEvent(new Event("input"));
            lessonSearch.focus();
        });

        // IntersectionObserver for Scroll Spy
        const navItems = document.querySelectorAll(".part-nav-item");
        
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navItems.forEach(item => {
                        if (item.getAttribute("data-target") === id) {
                            item.classList.add("active");
                            
                            // Scroll sidebar dynamically to keep active item centered/visible
                            if (window.innerWidth <= 991) {
                                item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                            } else {
                                const scrollArea = document.querySelector(".layout-nav-sidebar");
                                if (scrollArea) {
                                    const containerScroll = scrollArea.scrollTop;
                                    const containerHeight = scrollArea.clientHeight;
                                    
                                    const linkOffsetTop = item.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top + containerScroll;
                                    const linkHeight = item.clientHeight;
                                    
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
                            }
                        } else {
                            item.classList.remove("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        navItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = item.getAttribute("data-target");
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: "smooth" });
                }
            });
        });

        // ============================================================
        // 4. FAVORITES / PINNED TOOLS LOGIC (cong-cu.html & tiep-can.html)
        // ============================================================
        const favoritesSection = document.getElementById("favorites-section");
        if (favoritesSection) {
            const favoritesGrid = document.getElementById("favorites-grid");
            
            // Get favorite type from HTML (tools or approaches)
            const favoriteType = favoritesSection.getAttribute("data-favorite-type") || "tools";
            const favoritesKey = `favorite_${favoriteType}`;
            const collapseKey = `favorites_${favoriteType}_collapsed`;

            const getFavorites = () => {
                try {
                    return JSON.parse(localStorage.getItem(favoritesKey) || "[]");
                } catch (e) {
                    return [];
                }
            };

            const saveFavorites = (favs) => {
                localStorage.setItem(favoritesKey, JSON.stringify(favs));
            };

            const renderFavorites = () => {
                const favorites = getFavorites();
                
                if (favorites.length === 0) {
                    const placeholderText = favoriteType === "approaches" ? "tiếp cận" : (favoriteType === "skills" ? "kỹ năng" : "công cụ");
                    favoritesGrid.innerHTML = `
                        <div class="no-favorites-placeholder">
                            <i class="fa-regular fa-star"></i>
                            <p>Chưa có ${favoriteType === "approaches" ? "tiếp cận" : (favoriteType === "skills" ? "kỹ năng" : "công cụ")} thường dùng</p>
                            <span>Nhấn nút ngôi sao ⭐ trên bất kỳ ${placeholderText} nào bên dưới để ghim vào đây.</span>
                        </div>
                    `;
                } else {
                    favoritesGrid.innerHTML = "";
                    
                    favorites.forEach(href => {
                        const originalCard = document.querySelector(`#lessons-container section:not(#favorites-section) .specialty-card[href="${href}"]`);
                        if (originalCard) {
                            const clonedCard = originalCard.cloneNode(true);
                            
                            // Copy computed color custom properties from the original section to the cloned card
                            const originalSection = originalCard.closest('section');
                            if (originalSection) {
                                const styles = window.getComputedStyle(originalSection);
                                const partColor = styles.getPropertyValue('--part-color');
                                const partColorHl = styles.getPropertyValue('--part-color-hl');
                                const partColorRgb = styles.getPropertyValue('--part-color-rgb');
                                
                                if (partColor) clonedCard.style.setProperty('--part-color', partColor);
                                if (partColorHl) clonedCard.style.setProperty('--part-color-hl', partColorHl);
                                if (partColorRgb) clonedCard.style.setProperty('--part-color-rgb', partColorRgb);
                            }
                            
                            favoritesGrid.appendChild(clonedCard);
                        }
                    });
                }
                
                // Hide or show the favorites section depending on active search query
                const lessonSearch = document.getElementById("lesson-search");
                if (lessonSearch && lessonSearch.value.toLowerCase().trim().length > 0) {
                    favoritesSection.style.display = "none";
                } else {
                    favoritesSection.style.display = "block"; // Always display (with placeholder if empty)
                }
            };

            // Inject star buttons on original cards
            const originalCards = document.querySelectorAll("#lessons-container section:not(#favorites-section) .specialty-card");
            originalCards.forEach(card => {
                const href = card.getAttribute("href");
                const favorites = getFavorites();
                const isFav = favorites.includes(href);

                // Create the star span
                const favBtn = document.createElement("span");
                favBtn.className = `favorite-btn ${isFav ? 'active' : ''}`;
                favBtn.setAttribute("role", "button");
                favBtn.setAttribute("aria-label", "Ghim mục");
                favBtn.setAttribute("tabindex", "0");
                favBtn.innerHTML = `<i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;

                card.appendChild(favBtn);
            });

            // Handle favorite click with event delegation
            document.addEventListener("click", (e) => {
                const favBtn = e.target.closest(".favorite-btn");
                if (favBtn) {
                    e.preventDefault();
                    e.stopPropagation();

                    const card = favBtn.closest(".specialty-card");
                    if (card) {
                        const href = card.getAttribute("href");
                        let favorites = getFavorites();

                        if (favorites.includes(href)) {
                            // Remove
                            favorites = favorites.filter(h => h !== href);
                            saveFavorites(favorites);

                            // Update original cards' buttons
                            const origCards = document.querySelectorAll(`#lessons-container section:not(#favorites-section) .specialty-card[href="${href}"]`);
                            origCards.forEach(origCard => {
                                const btn = origCard.querySelector(".favorite-btn");
                                if (btn) {
                                    btn.classList.remove("active");
                                    btn.innerHTML = `<i class="fa-regular fa-star"></i>`;
                                }
                            });
                        } else {
                            // Add
                            favorites.push(href);
                            saveFavorites(favorites);

                            // Update original cards' buttons
                            const origCards = document.querySelectorAll(`#lessons-container section:not(#favorites-section) .specialty-card[href="${href}"]`);
                            origCards.forEach(origCard => {
                                const btn = origCard.querySelector(".favorite-btn");
                                if (btn) {
                                    btn.classList.add("active");
                                    btn.innerHTML = `<i class="fa-solid fa-star"></i>`;
                                }
                            });
                        }

                        renderFavorites();
                    }
                }
            });

            // Handle keyboard navigation for favorites
            document.addEventListener("keydown", (e) => {
                const favBtn = e.target.closest(".favorite-btn");
                if (favBtn && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    favBtn.click();
                }
            });

            // Logic thu gọn / mở rộng cho phần ghim
            const favoritesHeader = document.getElementById("favorites-header");
            const favoritesContainer = document.getElementById("favorites-container");
            const favoritesCollapse = document.getElementById("favorites-collapse");

            const toggleCollapse = () => {
                const isCollapsed = favoritesContainer.classList.toggle("collapsed");
                favoritesCollapse.classList.toggle("collapsed", isCollapsed);
                localStorage.setItem(collapseKey, isCollapsed ? "true" : "false");
            };

            if (favoritesHeader && favoritesContainer && favoritesCollapse) {
                // Lấy trạng thái lưu trữ
                const savedCollapsed = localStorage.getItem(collapseKey) === "true";
                if (savedCollapsed) {
                    favoritesContainer.classList.add("collapsed");
                    favoritesCollapse.classList.add("collapsed");
                }

                // Lắng nghe sự kiện click
                favoritesHeader.addEventListener("click", toggleCollapse);

                // Hỗ trợ accessibility qua bàn phím
                favoritesHeader.setAttribute("tabindex", "0");
                favoritesHeader.setAttribute("role", "button");
                favoritesHeader.setAttribute("aria-expanded", !savedCollapsed);

                favoritesHeader.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleCollapse();
                        favoritesHeader.setAttribute("aria-expanded", !favoritesContainer.classList.contains("collapsed"));
                    }
                });

                favoritesHeader.addEventListener("click", () => {
                    favoritesHeader.setAttribute("aria-expanded", !favoritesContainer.classList.contains("collapsed"));
                });
            }

            // Initial render
            renderFavorites();
        }
    }
});
