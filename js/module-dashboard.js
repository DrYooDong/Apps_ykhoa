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

        // Real-time Lesson Search & Tag Filter
        const lessonSearch = document.getElementById("lesson-search");
        const clearSearchBtn = document.getElementById("clear-search");
        const emptyState = document.getElementById("empty-search-state");
        const tagFilterBtns = document.querySelectorAll(".tag-filter-btn");
        
        let currentTag = "all";

        tagFilterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                tagFilterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentTag = btn.getAttribute("data-tag");
                if (lessonSearch) {
                    lessonSearch.dispatchEvent(new Event("input"));
                }
            });
        });

        if (lessonSearch) {
            lessonSearch.addEventListener("input", (e) => {
                const query = e.target.value.toLowerCase().trim();
                const hasQuery = query.length > 0 || currentTag !== "all";
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

            // Target only sections within the active tab content
            const activeTab = document.querySelector(".tab-content.active");
            if (!activeTab) return;
            const activeSections = activeTab.querySelectorAll("section");

            // Hide other tab's sections when filtering (just in case)
            document.querySelectorAll(".tab-content section").forEach((section) => {
                if (section.id === "favorites-section") return;
                if (!activeTab.contains(section)) {
                    section.style.display = "none";
                }
            });

            activeSections.forEach((section) => {
                if (section.id === "favorites-section") return; // Skip filtering cards in favorites section

                const cards = section.querySelectorAll(".specialty-card");
                let visibleCardsCount = 0;

                cards.forEach(card => {
                    const titleText = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
                    const cardTags = card.getAttribute("data-tags") || "";
                    
                    const matchesQuery = titleText.includes(query);
                    const matchesTag = currentTag === "all" || cardTags.includes(currentTag);

                    if (matchesQuery && matchesTag) {
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

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener("click", () => {
                lessonSearch.value = "";
                clearSearchBtn.style.display = "none";
                lessonSearch.dispatchEvent(new Event("input"));
                lessonSearch.focus();
            });
        }
        }

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

        const updateScrollSpy = () => {
            observer.disconnect();
            const activeTab = document.querySelector(".tab-content.active");
            if (activeTab) {
                const activeSections = activeTab.querySelectorAll("section");
                activeSections.forEach(section => {
                    if (section.id !== "favorites-section") {
                        observer.observe(section);
                    }
                });
            }
        };

        // Initialize Scroll Spy
        updateScrollSpy();

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

        // Hub Switcher Tabs Logic
        const tabButtons = document.querySelectorAll(".hub-tab-btn");
        const tabContents = document.querySelectorAll(".tab-content");
        const physioNav = document.getElementById("physio-nav");
        const pathoNav = document.getElementById("patho-nav");

        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetId = btn.getAttribute("data-tab");
                
                // Toggle tab button states
                tabButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                // Toggle tab contents
                tabContents.forEach(content => {
                    if (content.id === targetId) {
                        content.classList.add("active");
                        content.style.display = "block";
                    } else {
                        content.classList.remove("active");
                        content.style.display = "none";
                    }
                });

                // Toggle sidebar navigations
                if (targetId === "physio-tab-content") {
                    if (physioNav) physioNav.style.display = "block";
                    if (pathoNav) pathoNav.style.display = "none";
                } else {
                    if (physioNav) physioNav.style.display = "none";
                    if (pathoNav) pathoNav.style.display = "block";
                }

                // Reset search box when switching tabs
                if (lessonSearch) {
                    lessonSearch.value = "";
                    if (clearSearchBtn) clearSearchBtn.style.display = "none";
                    lessonSearch.dispatchEvent(new Event("input"));
                }

                // Re-initialize Scroll Spy for the active sections
                updateScrollSpy();
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
                    const placeholderText = favoriteType === "approaches" ? "tiếp cận" : (favoriteType === "skills" ? "kỹ năng" : (favoriteType === "pharma" ? "dược lý" : (favoriteType === "physio" ? "bài học" : "công cụ")));
                    favoritesGrid.innerHTML = `
                        <div class="no-favorites-placeholder">
                            <i class="fa-regular fa-star"></i>
                            <p>Chưa có ${favoriteType === "approaches" ? "tiếp cận" : (favoriteType === "skills" ? "kỹ năng" : (favoriteType === "pharma" ? "dược lý" : (favoriteType === "physio" ? "bài học" : "công cụ")))} thường dùng</p>
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

    // 7. Nâng cấp: Progress Bar (Thanh tiến độ học tập Sinh lý)
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach((card, index) => {
        const link = card.querySelector('a.card-link') || card;
        if (link) {
            const lessonId = "physio-prog-" + (link.getAttribute('href') || index);
            let progress = localStorage.getItem(lessonId);
            if (!progress) {
                // Simulate progress for demo aesthetics
                progress = Math.floor(Math.random() * 80) + 10; 
            }
            
            const progressBarContainer = document.createElement('div');
            progressBarContainer.className = 'card-progress-bar';
            const progressFill = document.createElement('div');
            progressFill.className = 'card-progress-fill';
            progressFill.style.width = '0%';
            
            progressBarContainer.appendChild(progressFill);
            
            const cardContent = card.querySelector('.card-content');
            if (cardContent) {
                cardContent.appendChild(progressBarContainer);
            } else {
                link.appendChild(progressBarContainer);
            }
            
            setTimeout(() => {
                progressFill.style.width = progress + '%';
            }, 300);
        }
    });

    // ============================================================
    // 8. FLASHCARD MANAGER & ĐỒNG BỘ KHO DỮ LIỆU SINH LÝ - SINH LÝ BỆNH
    // ============================================================
    const physioFlashcardData = [
        // --- PHẦN 1: TẾ BÀO & ĐẠI CƯƠNG ---
        {
            id: "fc-p1-1",
            category: "physio-cell",
            topicName: "🧬 Tế bào & Đại cương",
            question: "Áp suất thẩm thấu huyết tương bình thường và yếu tố quyết định chính là gì?",
            answer: "280 - 295 mOsm/kg H₂O",
            explanation: "Được quyết định chủ yếu bởi nồng độ Na⁺ huyết tương và các anion kèm theo (Cl⁻, HCO₃⁻)."
        },
        {
            id: "fc-p1-2",
            category: "physio-cell",
            topicName: "🧬 Tế bào & Đại cương",
            question: "Bơm Na⁺/K⁺-ATPase vận chuyển bao nhiêu ion Na⁺ và K⁺ qua màng tế bào?",
            answer: "3 Na⁺ ra ngoài, 2 K⁺ vào trong",
            explanation: "Sử dụng 1 ATP để duy trì điện thế nghỉ âm bên trong tế bào và thể tích tế bào ổn định."
        },
        {
            id: "fc-p1-3",
            category: "physio-cell",
            topicName: "🧬 Tế bào & Đại cương",
            question: "Giai đoạn khử cực của điện thế hoạt động do ion nào tràn vào tế bào?",
            answer: "Ion Na⁺ (mở kênh Na⁺ phụ thuộc điện thế)",
            explanation: "Điện thế màng biến đổi nhanh chóng từ âm (-70mV) sang dương (+30mV)."
        },

        // --- PHẦN 2: THẦN KINH & CƠ ---
        {
            id: "fc-p2-1",
            category: "physio-nerve",
            topicName: "🧠 Thần kinh & Cơ",
            question: "Chất truyền đạt thần kinh chính tại nơron vận động - cơ xương là gì?",
            answer: "Acetylcholine (ACh)",
            explanation: "ACh gắn vào thụ thể Nicotinic (N_M) ở màng sau synapse gây khử cực tấm tận cùng vận động."
        },
        {
            id: "fc-p2-2",
            category: "physio-nerve",
            topicName: "🧠 Thần kinh & Cơ",
            question: "Ion nào giải phóng từ lưới nội chất nguyên sinh kích hoạt sự co cơ xương?",
            answer: "Ion Ca²⁺ (Calci)",
            explanation: "Ca²⁺ gắn vào Troponin C làm dịch chuyển Tropomyosin, lộ vị trí gắn Myosin trên sợi Actin."
        },
        {
            id: "fc-p2-3",
            category: "physio-nerve",
            topicName: "🧠 Thần kinh & Cơ",
            question: "Hệ giao cảm sử dụng chất truyền đạt thần kinh nào tại cơ quan đích?",
            answer: "Noradrenalin (Norepinephrine)",
            explanation: "Ngoại trừ tuyến mồ hôi dùng Acetylcholine. Thụ thể gồm Alpha (α1, α2) và Beta (β1, β2, β3)."
        },

        // --- PHẦN 3: MÁU & MIỄN DỊCH ---
        {
            id: "fc-p3-1",
            category: "physio-blood",
            topicName: "🩸 Máu & Miễn dịch",
            question: "Hormone chính kích thích tủy xương sản xuất hồng cầu và nơi tiết ra?",
            answer: "Erythropoietin (EPO) - tiết chủ yếu từ Thận (90%)",
            explanation: "Tiết ra khi tế bào kẽ vỏ thận cảm nhận tình trạng giảm oxy mô (Hypoxia)."
        },
        {
            id: "fc-p3-2",
            category: "physio-blood",
            topicName: "🩸 Máu & Miễn dịch",
            question: "Một phân tử Hemoglobin (HbA) chứa bao nhiêu nhân Heme và gắn tối đa bao nhiêu O₂?",
            answer: "4 nhân Heme - Gắn tối đa 4 phân tử O₂",
            explanation: "Mỗi nhân Heme chứa 1 ion Fe²⁺ ở trung tâm có khả năng gắn thuận nghịch với 1 O₂."
        },
        {
            id: "fc-p3-3",
            category: "physio-blood",
            topicName: "🩸 Máu & Miễn dịch",
            question: "Loại bạch cầu nào chiếm tỷ lệ cao nhất trong máu ngoại vi ở người trưởng thành?",
            answer: "Bạch cầu hạt trung tính (Neutrophils: 50 - 70%)",
            explanation: "Đóng vai trò đáp ứng miễn dịch tự nhiên dòng đầu chống lại nhiễm trùng vi khuẩn cấp tính."
        },

        // --- PHẦN 4: TIM MẠCH & HÔ HẤP ---
        {
            id: "fc-p4-1",
            category: "physio-cv-resp",
            topicName: "🫀 Tim mạch & Hô hấp",
            question: "Hệ thống RAAS kích hoạt khi nào và sản phẩm Angiotensin II gây tác dụng gì?",
            answer: "Kích hoạt khi giảm thể tích/huyết áp hoặc giảm Na⁺. Angiotensin II gây co mạch mạnh & kích thích Aldosterone.",
            explanation: "Renin từ thận biến Angiotensinogen thành AngI, ACE ở phổi chuyển AngI thành AngII."
        },
        {
            id: "fc-p4-2",
            category: "physio-cv-resp",
            topicName: "🫀 Tim mạch & Hô hấp",
            question: "Thể tích khí lưu thông (VT - Tidal Volume) bình thường ở người trưởng thành?",
            answer: "Khoảng 500 mL / nhịp thở",
            explanation: "Khoảng 150 mL nằm trong khoảng chết giải phẫu, 350 mL thực sự tham gia trao đổi khí tại phế nang."
        },
        {
            id: "fc-p4-3",
            category: "physio-cv-resp",
            topicName: "🫀 Tim mạch & Hô hấp",
            question: "Chất Surfactant do tế bào phế nang nào tiết ra và có vai trò gì?",
            answer: "Tế bào phế nang tuýp II (Pneumocyte type II) - Làm giảm sức căng bề mặt phế nang.",
            explanation: "Giúp chống xẹp phế nang khi thở ra và duy trì sự ổn định kích thước các phế nang."
        },

        // --- PHẦN 5: TIÊU HÓA & CHUYỂN HÓA ---
        {
            id: "fc-p5-1",
            category: "physio-digestion",
            topicName: "🥗 Tiêu hóa & Chuyển hóa",
            question: "Tế bào viền (Parietal cells) ở dạ dày bài tiết những chất quan trọng nào?",
            answer: "Acid Hydrochloric (HCl) và Yếu tố nội (Intrinsic Factor)",
            explanation: "HCl giúp hoạt hóa Pepsinogen và diệt khuẩn; Yếu tố nội bắt buộc cho sự hấp thu Vitamin B12 tại hồi tràng."
        },
        {
            id: "fc-p5-2",
            category: "physio-digestion",
            topicName: "🥗 Tiêu hóa & Chuyển hóa",
            question: "Muối mật (Bile salts) được sản xuất ở đâu và đóng vai trò gì trong tiêu hóa?",
            answer: "Sản xuất tại Gan - Nhũ tương hóa Lipid và tạo hạt Micelle để hấp thu mỡ.",
            explanation: "Giúp lipase tụy tiếp xúc phân giải Triglyceride thành acid béo tự do và monoglyceride."
        },

        // --- PHẦN 6: THẬN & DỊCH CƠ THỂ ---
        {
            id: "fc-p6-1",
            category: "physio-renal",
            topicName: "🧪 Thận & Dịch cơ thể",
            question: "Mức lọc cầu thận (GFR) bình thường ở người trưởng thành là bao nhiêu?",
            answer: "120 - 125 mL/phút (tương đương ~180 Lit/ngày)",
            explanation: "Khoảng 99% lượng dịch lọc này được hệ thống ống thận tái hấp thu lại vào máu."
        },
        {
            id: "fc-p6-2",
            category: "physio-renal",
            topicName: "🧪 Thận & Dịch cơ thể",
            question: "Hormone Aldosterone tác động tại vị trí nào của thận và gây tác dụng gì?",
            answer: "Ống lượn xa và ống góp - Tăng tái hấp thu Na⁺, H₂O và tăng bài tiết K⁺, H⁺.",
            explanation: "Giúp làm tăng thể tích tuần hoàn và nâng huyết áp, đồng thời điều hòa nồng độ K⁺ máu."
        },
        {
            id: "fc-p6-3",
            category: "physio-renal",
            topicName: "🧪 Thận & Dịch cơ thể",
            question: "Hormone ADH (Vasopressin) làm tăng tái hấp thu nước ở ống góp qua kênh nào?",
            answer: "Kênh Aquaporin-2 (AQP2)",
            explanation: "ADH gắn vào thụ thể V2 màng đáy kích hoạt chèn các kênh AQP2 lên màng đỉnh tế bào ống góp."
        },

        // --- PHẦN 7: NỘI TIẾT & SINH SẢN ---
        {
            id: "fc-p7-1",
            category: "physio-endocrine",
            topicName: "🦋 Nội tiết & Sinh sản",
            question: "Hormone Insulin do tế bào nào đảo Tụy tiết ra và tác dụng sinh học chính?",
            answer: "Tế bào Beta (β) - Hạ đường huyết (Tăng thu nhận & dự trữ Glucose ở cơ, gan, mỡ).",
            explanation: "Kích thích tổng hợp Glycogen, Protein và Lipid; ức chế tân tạo đường và phân giải mỡ."
        },
        {
            id: "fc-p7-2",
            category: "physio-endocrine",
            topicName: "🦋 Nội tiết & Sinh sản",
            question: "Trục Nội tiết Hạ đồi - Tuyến yên - Tuyến giáp điều hòa tiết T3/T4 như thế nào?",
            answer: "TRH (Hạ đồi) ➔ TSH (Tuyến yên) ➔ T3, T4 (Tuyến giáp) ➔ Ức chế ngược âm tính (Negative Feedback).",
            explanation: "Nồng độ T3, T4 do tuyến giáp tiết ra sẽ phản hồi ức chế ngược bài tiết TRH và TSH."
        },

        // --- CƠ CHẾ BỆNH SINH: TIM MẠCH ---
        {
            id: "fc-patho-tm-1",
            category: "patho-timmach",
            topicName: "🫀 SLB Nhồi máu cơ tim (ACS)",
            question: "Cơ chế khởi phát cốt lõi của Hội chứng mạch vành cấp (ACS)?",
            answer: "Nứt/vỡ mảng xơ vữa ➔ Ngưng tập tiểu cầu & hình thành huyết khối cấp tắc nghẽn ĐMV.",
            explanation: "Gây thiếu máu cục bộ cơ tim cấp tính, dẫn đến tổn thương hoặc hoại tử tế bào cơ tim."
        },
        {
            id: "fc-patho-tm-2",
            category: "patho-timmach",
            topicName: "🫀 SLB Suy tim (HF)",
            question: "Vòng xoắn bệnh lý thần kinh thể dịch trong suy tim tiến triển?",
            answer: "Kích hoạt Hệ Giao cảm & RAAS ➔ Co mạch, giữ muối nước ➔ Tăng gánh nặng làm cơ tim suy xấu đi.",
            explanation: "Ban đầu giúp bù trừ cung lượng tim nhưng lâu dài làm tăng tiền/hậu tải và tái cấu trúc cơ tim thất trái."
        },
        {
            id: "fc-patho-tm-3",
            category: "patho-timmach",
            topicName: "🫀 SLB Tăng huyết áp (THA)",
            question: "Hai yếu tố quyết định trực tiếp đến giá trị Huyết áp Động mạch?",
            answer: "Cung lượng tim (Cardiac Output - CO) và Sức cản ngoại vi tổng trở (SVR).",
            explanation: "Huyết áp = CO × SVR. Tăng huyết áp nguyên phát thường do tăng sức cản ngoại vi mạn tính."
        },

        // --- CƠ CHẾ BỆNH SINH: HÔ HẤP ---
        {
            id: "fc-patho-hh-1",
            category: "patho-hohap",
            topicName: "🫁 SLB COPD",
            question: "Đặc điểm giới hạn dòng khí trong COPD và cơ chế bệnh sinh?",
            answer: "Tắc nghẽn không hồi phục hoàn toàn do viêm mạn tính, xơ hóa tiểu phế quản & khí thũng phá hủy phế nang.",
            explanation: "Khói thuốc lá/chất độc làm kích hoạt đại thực bào & bạch cầu hạt giải phóng protease làm mất đàn hồi phổi."
        },
        {
            id: "fc-patho-hh-2",
            category: "patho-hohap",
            topicName: "🫁 SLB Sốt xuất huyết Dengue",
            question: "Cơ chế gây thoát huyết tương và sốc nguy hiểm trong Sốt xuất huyết Dengue?",
            answer: "Tăng tính thấm thành mạch cấp tính do bão cytokine & đáp ứng miễn dịch qua trung gian bổ thể.",
            explanation: "Huyết tương thoát vào khoảng kẽ làm cô đặc máu (tăng Hematocrit), giảm thể tích tuần hoàn dẫn tới sốc."
        },

        // --- CƠ CHẾ BỆNH SINH: TIÊU HÓA ---
        {
            id: "fc-patho-th-1",
            category: "patho-tieuhoa",
            topicName: "🥖 SLB Viêm tụy cấp (VTC)",
            question: "Hiện tượng tự tiêu hóa (Autodigestion) trong Viêm tụy cấp diễn ra như thế nào?",
            answer: "Trypsinogen bị kích hoạt sớm thành Trypsin ngay trong lòng nang tụy ➔ Kích hoạt hàng loạt enzym tụy khác.",
            explanation: "Trypsin kích hoạt Elastase, Phospholipase A2 gây hoại tử mỡ, phá hủy mô tụy và vỡ mạch máu gây xuất huyết."
        },
        {
            id: "fc-patho-th-2",
            category: "patho-tieuhoa",
            topicName: "🥖 SLB Trào ngược dạ dày thực quản (GERD)",
            question: "Cơ chế bảo vệ thực quản bị suy giảm chính trong GERD là gì?",
            answer: "Suy yếu cơ thắt thực quản dưới (LES) & tăng giãn cơ LES thoáng qua (TLESRs).",
            explanation: "Acid và Pepsin dạ dày trào ngược lên tiếp xúc niêm mạc thực quản gây viêm, loét và dị sản Barrett."
        },

        // --- CƠ CHẾ BỆNH SINH: THẬN NIỆU ---
        {
            id: "fc-patho-tn-1",
            category: "patho-thannieu",
            topicName: "🧪 SLB Tổn thương thận cấp (AKI)",
            question: "Phân loại 3 nhóm nguyên nhân chính gây Tổn thương thận cấp (AKI)?",
            answer: "Trước thận (Giảm tưới máu), Tại thận (Tổn thương nhu mô/ống thận), Sau thận (Tắc nghẽn đường tiểu).",
            explanation: "AKI trước thận chiếm >50%, nếu không xử trí kịp thời sẽ tiến triển thành Hoại tử ống thận cấp (ATN)."
        },
        {
            id: "fc-patho-tn-2",
            category: "patho-thannieu",
            topicName: "🧪 SLB Bệnh thận mạn (CKD)",
            question: "Cơ chế siêu lọc bù trừ (Hyperfiltration) ảnh hưởng thế nào đến tiến triển CKD?",
            answer: "Nephron còn sống tăng mức lọc & phì đại ➔ Áp lực nội cầu thận tăng lâu dài ➔ Xơ hóa cầu thận tiến triển.",
            explanation: "Thuốc ức chế hệ RAAS (ACEi/ARB) giúp hạ áp lực nội cầu thận, làm chậm tiến triển suy thận mạn."
        },

        // --- CƠ CHẾ BỆNH SINH: NỘI TIẾT ---
        {
            id: "fc-patho-nt-1",
            category: "patho-noitiet",
            topicName: "🍩 SLB Đái tháo đường T2",
            question: "Hai khiếm khuyết cơ chế bệnh sinh chính trong Đái tháo đường Tuýp 2?",
            answer: "Kháng Insulin tại cơ quan đích (Cơ, Gan, Mỡ) + Suy giảm chức năng tiết Insulin tương đối của tế bào β.",
            explanation: "Tăng sản xuất Glucose tại gan và giảm thu nhận Glucose ở cơ vân dẫn đến tăng đường huyết mạn tính."
        },

        // --- CƠ CHẾ BỆNH SINH: SẢN KHOA & NGOẠI KHOA ---
        {
            id: "fc-patho-sn-1",
            category: "patho-san-ngoai",
            topicName: "🤰 SLB Tiền sản giật",
            question: "Cơ chế khởi phát bệnh sinh cốt lõi của Tiền sản giật ở thai phụ?",
            answer: "Rối loạn tái cấu trúc động mạch xoắn bánh nhau ➔ Thiếu máu cục bộ nhau thai ➔ Tổn thương nội mạc toàn thân.",
            explanation: "Nhau thai thiếu máu giải phóng các yếu tố chống tạo mạch (sFlt-1) gây co mạch, tăng huyết áp & đạm niệu ở mẹ."
        }
    ];

    const flashcardBtn = document.getElementById("flashcard-btn");
    const flashcardModal = document.getElementById("flashcard-modal");
    const closeFlashcardBtn = document.getElementById("close-flashcard");
    const physioFlashcard = document.getElementById("physio-flashcard");

    if (flashcardBtn && flashcardModal) {
        // UI Elements
        const fcCategorySelect = document.getElementById("fc-category-select");
        const fcShuffleBtn = document.getElementById("fc-shuffle");
        const fcProgressFill = document.getElementById("fc-progress-fill");
        const fcTopicBadge = document.getElementById("fc-topic-badge");
        const fcQuestion = document.getElementById("fc-question");
        const fcAnswer = document.getElementById("fc-answer");
        const fcExplanation = document.getElementById("fc-explanation");
        const fcPrevBtn = document.getElementById("fc-prev");
        const fcNextBtn = document.getElementById("fc-next");
        const fcCounter = document.getElementById("fc-counter");
        const fcToggleKnownBtn = document.getElementById("fc-toggle-known");
        const fcKnownText = document.getElementById("fc-known-text");

        // State variables
        let activeCards = [...physioFlashcardData];
        let currentIndex = 0;

        // Known cards stored in localStorage
        const getKnownCards = () => {
            try {
                return new Set(JSON.parse(localStorage.getItem("physio_fc_known") || "[]"));
            } catch (e) {
                return new Set();
            }
        };

        const saveKnownCards = (knownSet) => {
            localStorage.setItem("physio_fc_known", JSON.stringify(Array.from(knownSet)));
        };

        const renderCurrentCard = () => {
            if (!activeCards || activeCards.length === 0) {
                if (fcTopicBadge) fcTopicBadge.textContent = "⚠️ Trống";
                if (fcQuestion) fcQuestion.textContent = "Không có thẻ nào thuộc chủ đề này.";
                if (fcAnswer) fcAnswer.textContent = "";
                if (fcExplanation) fcExplanation.textContent = "";
                if (fcCounter) fcCounter.textContent = "0 / 0";
                if (fcProgressFill) fcProgressFill.style.width = "0%";
                if (fcPrevBtn) fcPrevBtn.disabled = true;
                if (fcNextBtn) fcNextBtn.disabled = true;
                return;
            }

            // Ensure index bounds
            if (currentIndex < 0) currentIndex = 0;
            if (currentIndex >= activeCards.length) currentIndex = activeCards.length - 1;

            const card = activeCards[currentIndex];

            // Always un-flip card when navigating to a card
            if (physioFlashcard) physioFlashcard.classList.remove("flipped");

            // Populate content
            if (fcTopicBadge) fcTopicBadge.textContent = card.topicName || "🧬 Sinh lý học";
            if (fcQuestion) fcQuestion.textContent = card.question || "";
            if (fcAnswer) fcAnswer.textContent = card.answer || "";
            if (fcExplanation) fcExplanation.textContent = card.explanation || "";

            // Update counter & progress fill
            if (fcCounter) fcCounter.textContent = `${currentIndex + 1} / ${activeCards.length}`;
            if (fcProgressFill) {
                const percentage = Math.round(((currentIndex + 1) / activeCards.length) * 100);
                fcProgressFill.style.width = `${percentage}%`;
            }

            // Update nav button states
            if (fcPrevBtn) fcPrevBtn.disabled = currentIndex === 0;
            if (fcNextBtn) fcNextBtn.disabled = currentIndex === activeCards.length - 1;

            // Check known status
            const knownSet = getKnownCards();
            const isKnown = knownSet.has(card.id);
            if (fcToggleKnownBtn && fcKnownText) {
                const icon = fcToggleKnownBtn.querySelector("i");
                if (isKnown) {
                    fcToggleKnownBtn.classList.add("active");
                    if (icon) icon.className = "fa-solid fa-circle-check";
                    fcKnownText.textContent = "Đã thuộc";
                } else {
                    fcToggleKnownBtn.classList.remove("active");
                    if (icon) icon.className = "fa-regular fa-circle-check";
                    fcKnownText.textContent = "Chưa thuộc";
                }
            }
        };

        const filterCategory = (catValue) => {
            if (!catValue || catValue === "all") {
                activeCards = [...physioFlashcardData];
            } else {
                activeCards = physioFlashcardData.filter(card => card.category === catValue);
            }
            currentIndex = 0;
            renderCurrentCard();
        };

        const shuffleActiveCards = () => {
            for (let i = activeCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
            }
            currentIndex = 0;
            renderCurrentCard();
        };

        const goToNext = () => {
            if (currentIndex < activeCards.length - 1) {
                currentIndex++;
                renderCurrentCard();
            }
        };

        const goToPrev = () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderCurrentCard();
            }
        };

        const toggleKnownCurrentCard = () => {
            if (!activeCards || activeCards.length === 0) return;
            const currentCard = activeCards[currentIndex];
            const knownSet = getKnownCards();
            
            if (knownSet.has(currentCard.id)) {
                knownSet.delete(currentCard.id);
            } else {
                knownSet.add(currentCard.id);
            }
            saveKnownCards(knownSet);
            renderCurrentCard();
        };

        // Open Modal
        flashcardBtn.addEventListener("click", () => {
            flashcardModal.classList.add("active");
            flashcardModal.setAttribute("aria-hidden", "false");
            renderCurrentCard();
            if (physioFlashcard) physioFlashcard.focus();
        });

        // Close Modal
        const closeModal = () => {
            flashcardModal.classList.remove("active");
            flashcardModal.setAttribute("aria-hidden", "true");
        };

        closeFlashcardBtn.addEventListener("click", closeModal);
        flashcardModal.addEventListener("click", (e) => {
            if (e.target === flashcardModal) {
                closeModal();
            }
        });

        // Flip card on click
        if (physioFlashcard) {
            physioFlashcard.addEventListener("click", (e) => {
                // Prevent flip if clicking on inner elements that might have their own handler if any
                physioFlashcard.classList.toggle("flipped");
            });
        }

        // Prev & Next Buttons
        if (fcPrevBtn) fcPrevBtn.addEventListener("click", goToPrev);
        if (fcNextBtn) fcNextBtn.addEventListener("click", goToNext);

        // Category select & Shuffle
        if (fcCategorySelect) {
            fcCategorySelect.addEventListener("change", (e) => {
                filterCategory(e.target.value);
            });
        }
        if (fcShuffleBtn) {
            fcShuffleBtn.addEventListener("click", shuffleActiveCards);
        }

        // Toggle Known button
        if (fcToggleKnownBtn) {
            fcToggleKnownBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleKnownCurrentCard();
            });
        }

        // Keyboard Navigation (ArrowLeft, ArrowRight, Space, Esc)
        document.addEventListener("keydown", (e) => {
            if (!flashcardModal.classList.contains("active")) return;

            if (e.key === "Escape") {
                closeModal();
            } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
                goToPrev();
            } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
                goToNext();
            } else if (e.key === " " || e.key === "Spacebar") {
                e.preventDefault();
                if (physioFlashcard) physioFlashcard.classList.toggle("flipped");
            }
        });
    }

    // ============================================================
    // 9. APPROACH HUB FEATURES: On-Call, Recently Viewed, Daily Flashcard
    // ============================================================

    // A. Hub On-Call Mode Toggle
    const hubOnCallBtn = document.getElementById('hubOnCallBtn');
    if (hubOnCallBtn) {
        if (localStorage.getItem('cliniportal_oncall') === 'true') {
            document.documentElement.classList.add('on-call-mode');
            hubOnCallBtn.classList.add('active');
            hubOnCallBtn.style.background = 'var(--color-warning)';
            hubOnCallBtn.style.color = 'white';
        }

        hubOnCallBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('on-call-mode');
            const isOnCall = document.documentElement.classList.contains('on-call-mode');
            localStorage.setItem('cliniportal_oncall', isOnCall ? 'true' : 'false');
            if (isOnCall) {
                hubOnCallBtn.classList.add('active');
                hubOnCallBtn.style.background = 'var(--color-warning)';
                hubOnCallBtn.style.color = 'white';
            } else {
                hubOnCallBtn.classList.remove('active');
                hubOnCallBtn.style.background = 'rgba(245, 158, 11, 0.15)';
                hubOnCallBtn.style.color = 'var(--color-warning)';
            }
        });
    }

    // B. Recently Viewed Tracker & Stats
    const recentlyViewedList = document.getElementById('recentlyViewedList');
    const viewedApproachesCount = document.getElementById('viewedApproachesCount');

    function getRecentlyViewed() {
        try {
            return JSON.parse(localStorage.getItem('cliniportal_recently_viewed_approaches') || '[]');
        } catch (e) {
            return [];
        }
    }

    function renderRecentlyViewed() {
        const history = getRecentlyViewed();
        if (viewedApproachesCount) {
            viewedApproachesCount.innerText = history.length;
        }

        if (!recentlyViewedList) return;

        if (history.length === 0) {
            recentlyViewedList.innerHTML = `<p style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic; margin: 0;">Chưa có lịch sử truy cập gần đây.</p>`;
            return;
        }

        recentlyViewedList.innerHTML = history.slice(0, 4).map(item => `
            <a href="${item.href}" class="recently-viewed-item" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; background: var(--color-surface); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--color-border); font-size: 0.85rem; color: var(--color-text); font-weight: 600; transition: all 0.2s;">
                <span><i class="fa-solid fa-file-medical" style="color: var(--color-primary); margin-right: 6px;"></i> ${item.title}</span>
                <i class="fa-solid fa-angle-right" style="font-size: 0.75rem; color: var(--color-text-muted);"></i>
            </a>
        `).join('');
    }

    // Track clicks on approach cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('click', () => {
            const href = card.getAttribute('href');
            const title = card.querySelector('h3')?.innerText || 'Tiếp cận';
            if (!href || href === '#') return;

            let history = getRecentlyViewed();
            history = history.filter(item => item.href !== href);
            history.unshift({ href, title, timestamp: Date.now() });
            localStorage.setItem('cliniportal_recently_viewed_approaches', JSON.stringify(history));
        });
    });

    renderRecentlyViewed();

    // C. Daily Red Flag Flashcard
    const flashcardTitle = document.getElementById('flashcardTitle');
    const flashcardRedFlagsList = document.getElementById('flashcardRedFlagsList');
    const flashcardAnswer = document.getElementById('flashcardAnswer');
    const flashcardHint = document.getElementById('flashcardHint');
    const flashcardToggleBtn = document.getElementById('flashcardToggleBtn');

    if (flashcardTitle && flashcardRedFlagsList && typeof symptomData !== 'undefined') {
        const symKeys = Object.keys(symptomData);
        if (symKeys.length > 0) {
            // Pick symptom based on day of year for consistency across refreshes today
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const selectedKey = symKeys[dayOfYear % symKeys.length];
            const sym = symptomData[selectedKey];

            if (sym) {
                flashcardTitle.innerText = `Triệu chứng: ${sym.name}`;
                flashcardRedFlagsList.innerHTML = sym.redFlags.map(rf => `<li>${rf}</li>`).join('');
            }
        }

        if (flashcardToggleBtn && flashcardAnswer && flashcardHint) {
            let isFlipped = false;
            flashcardToggleBtn.addEventListener('click', () => {
                isFlipped = !isFlipped;
                if (isFlipped) {
                    flashcardAnswer.style.display = 'block';
                    flashcardHint.style.display = 'none';
                    flashcardToggleBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Ẩn Đáp Án';
                } else {
                    flashcardAnswer.style.display = 'none';
                    flashcardHint.style.display = 'block';
                    flashcardToggleBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Lật Thẻ Xem Đáp Án';
                }
            });
        }
    }
});


