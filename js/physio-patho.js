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
            let anyVisible = false;

            if (query.length > 0) {
                clearSearchBtn.style.display = "block";
            } else {
                clearSearchBtn.style.display = "none";
            }

            sections.forEach((section) => {
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
    }
});
