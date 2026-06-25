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
});
