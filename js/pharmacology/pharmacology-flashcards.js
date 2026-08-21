/**
 * Pharmacology Flashcard Engine — CliniPortal (Dược lý học)
 * Đồng bộ chuẩn giao diện, lật thẻ 3D, thanh tiến độ, bộ lọc & phím tắt theo co-che-benh-sinh.html
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_pharma_fc_known';

  const CARDS_DB = [
    {
      id: "fc-ph-1",
      category: "Tim mạch",
      topicName: "🫀 Dược lý Tim mạch",
      question: "Tại sao chống chỉ định dùng chung ARNI (Sacubitril/Valsartan) với thuốc ACEi?",
      answer: "Cả hai thuốc đều làm tăng nồng độ Bradykinin. Phối hợp gây bùng phát rủi ro Phù Mạch (Angioedema) đe dọa tính mạng.",
      explanation: "Bắt buộc phải có khoảng nghỉ (washout) tối thiểu 36 giờ khi chuyển đổi từ ACEi sang ARNI hoặc ngược lại."
    },
    {
      id: "fc-ph-2",
      category: "Kháng sinh",
      topicName: "💊 Tương tác Thuốc & Độc tính",
      question: "Tương tác nghiêm trọng nhất khi dùng đồng thời Clarithromycin và Atorvastatin là gì?",
      answer: "Clarithromycin ức chế mạnh CYP3A4 tại gan, ngăn cản chuyển hóa Statin ➔ Tăng nồng độ Statin gây Tiêu Cơ Vân Cấp & Suy Thận Cấp.",
      explanation: "Nên ngưng tạm thời Atorvastatin/Simvastatin khi dùng đợt macrolide hoặc chuyển sang Pravastatin/Rosuvastatin ít qua CYP3A4."
    },
    {
      id: "fc-ph-3",
      category: "Tim mạch",
      topicName: "🫀 Thuốc Hạ áp & Loạn nhịp",
      question: "Tại sao Verapamil/Diltiazem chống chỉ định phối hợp với Chẹn Beta (Beta-Blockers)?",
      answer: "Cả hai đều có tác dụng ức chế nút xoang và nút nhĩ thất (AV) ➔ Hiệp đồng gây chậm nhịp tim nặng, Block AV độ cao hoặc Ngừng Tim.",
      explanation: "Dihydropyridine (như Amlodipine) an toàn hơn khi dùng phối hợp với chẹn beta do ít tác dụng ức chế trực tiếp nút AV."
    },
    {
      id: "fc-ph-4",
      category: "Hồi sức",
      topicName: "🚑 Thuốc Vận mạch",
      question: "Thuốc vận mạch ưu tiên hàng đầu trong Sốc Nhiễm Khuẩn (Septic Shock) theo khuyến cáo là gì?",
      answer: "Noradrenaline (Norepinephrine) là lựa chọn hàng đầu theo Surviving Sepsis Campaign (SSC).",
      explanation: "Noradrenaline co mạch mạnh qua thụ thể Alpha-1 mà ít gây tăng nhịp tim quá mức so với Adrenaline hay Dopamine."
    },
    {
      id: "fc-ph-5",
      category: "Độc chất",
      topicName: "🧪 Thuốc Giải độc (Antidotes)",
      question: "Thuốc giải độc đặc hiệu cho ngộ độc Paracetamol cấp tính là gì và thời điểm vàng sử dụng?",
      answer: "N-Acetylcysteine (NAC). Hiệu quả bảo vệ gan cao nhất khi dùng trong vòng 8 tiếng đầu sau khi ngộ độc.",
      explanation: "NAC cung cấp tiền chất Glutathione giúp trung hòa độc chất NAPQI do chuyển hóa Paracetamol sinh ra tại gan."
    },
    {
      id: "fc-ph-6",
      category: "Tiêu hóa",
      topicName: "🥗 Thuốc Tiêu hóa",
      question: "Tại sao không khuyến cáo dùng Omeprazole chung với Clopidogrel (Plavix)?",
      answer: "Omeprazole ức chế CYP2C19, làm giảm chuyển hóa Clopidogrel thành dạng có hoạt tính ➔ Giảm hiệu quả kháng kết tập tiểu cầu.",
      explanation: "Nên ưu tiên chọn Pantoprazole hoặc Rabeprazole do ít ảnh hưởng đến enzym CYP2C19 hơn."
    }
  ];

  function getKnownCards() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch (e) {
      return new Set();
    }
  }

  function saveKnownCards(knownSet) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(knownSet)));
    } catch (e) {
      console.warn('[PharmaFlashcards] Error saving known cards:', e);
    }
  }

  function renderInlineMountedSection(mountEl) {
    if (!mountEl) return;

    let activeCards = [...CARDS_DB];
    let currentIndex = 0;

    function updateCardUI() {
      const card = activeCards[currentIndex];
      if (!card) return;

      const inner = document.getElementById("pharma-fc-inner");
      if (inner) inner.classList.remove("flipped");

      const categoryTagFront = document.getElementById("pharma-fc-tag-front");
      const categoryTagBack = document.getElementById("pharma-fc-tag-back");
      const questionEl = document.getElementById("pharma-fc-question");
      const answerEl = document.getElementById("pharma-fc-answer");
      const explanationEl = document.getElementById("pharma-fc-explanation");
      const counterEl = document.getElementById("pharma-fc-counter");
      const progressFill = document.getElementById("pharma-fc-progress-fill");
      const prevBtn = document.getElementById("pharma-fc-prev");
      const nextBtn = document.getElementById("pharma-fc-next");

      if (categoryTagFront) categoryTagFront.textContent = card.topicName || card.category;
      if (categoryTagBack) categoryTagBack.textContent = card.topicName || card.category;
      if (questionEl) questionEl.innerHTML = card.question;
      if (answerEl) answerEl.innerHTML = card.answer;
      if (explanationEl) explanationEl.innerHTML = card.explanation;

      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${activeCards.length}`;
      if (progressFill) {
        const pct = Math.round(((currentIndex + 1) / activeCards.length) * 100);
        progressFill.style.width = `${pct}%`;
      }

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === activeCards.length - 1;
    }

    mountEl.innerHTML = `
      <div class="flashcard-section-container" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
        <div class="fc-modal-header" style="padding-right: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 0.75rem;">
            <h3 class="fc-title" style="margin: 0; font-size: 1.15rem;">🧠 Ôn Tập Dược Lý — Flashcard Spaced Repetition</h3>
            <div class="fc-header-actions">
              <select id="pharma-fc-select" class="fc-select" aria-label="Chọn nhóm dược lý">
                <option value="all">🌟 Tất cả chủ đề</option>
                <option value="Tim mạch">🫀 Tim mạch & Vận mạch</option>
                <option value="Kháng sinh">💊 Kháng sinh & Tương tác</option>
                <option value="Hồi sức">🚑 Hồi sức & Cấp cứu</option>
                <option value="Độc chất">🧪 Độc chất & Giải độc</option>
                <option value="Tiêu hóa">🥗 Tiêu hóa & Chuyển hóa</option>
              </select>
              <button id="pharma-fc-shuffle" class="fc-icon-btn" title="Xáo trộn ngẫu nhiên"><i class="fa-solid fa-shuffle"></i></button>
              <button id="pharma-open-modal-btn" class="fc-btn" style="background: var(--color-primary); color: #fff; border-color: var(--color-primary);">
                <i class="fa-solid fa-expand"></i> Mở Modal Cửa Sổ
              </button>
            </div>
          </div>
        </div>

        <div class="fc-progress-track" style="margin: 1rem 0;">
          <div id="pharma-fc-progress-fill" class="fc-progress-fill" style="width: 0%;"></div>
        </div>

        <div class="flashcard-container" style="perspective: 1000px; margin: 1rem 0;">
          <div class="flashcard" id="pharma-inline-card" tabindex="0" role="button" aria-label="Lật thẻ flashcard">
            <div class="flashcard-inner" id="pharma-fc-inner">
              <div class="flashcard-front">
                <span id="pharma-fc-tag-front" class="fc-badge">🫀 Dược lý Tim mạch</span>
                <h3 id="pharma-fc-question">Đang tải câu hỏi...</h3>
                <p class="fc-hint"><i class="fa-solid fa-rotate"></i> Bấm hoặc ấn Spacebar để lật thẻ xem đáp án</p>
              </div>
              <div class="flashcard-back">
                <span id="pharma-fc-tag-back" class="fc-badge back-badge">💡 Đáp án & Giải thích</span>
                <h3 id="pharma-fc-answer">Đang tải đáp án...</h3>
                <p class="fc-explanation" id="pharma-fc-explanation"></p>
              </div>
            </div>
          </div>
        </div>

        <div class="flashcard-controls">
          <button id="pharma-fc-prev" class="fc-btn" title="Thẻ trước"><i class="fa-solid fa-arrow-left"></i> Trước</button>
          <div class="fc-counter-wrapper">
            <span id="pharma-fc-counter">0 / 0</span>
          </div>
          <button id="pharma-fc-next" class="fc-btn" title="Thẻ sau">Sau <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    const cardEl = document.getElementById("pharma-inline-card");
    if (cardEl) {
      cardEl.addEventListener("click", () => {
        const inner = document.getElementById("pharma-fc-inner");
        if (inner) inner.classList.toggle("flipped");
      });
    }

    document.getElementById("pharma-fc-prev").addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCardUI();
      }
    });

    document.getElementById("pharma-fc-next").addEventListener("click", () => {
      if (currentIndex < activeCards.length - 1) {
        currentIndex++;
        updateCardUI();
      }
    });

    document.getElementById("pharma-fc-select").addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "all") {
        activeCards = [...CARDS_DB];
      } else {
        activeCards = CARDS_DB.filter(c => c.category === val);
      }
      currentIndex = 0;
      updateCardUI();
    });

    document.getElementById("pharma-fc-shuffle").addEventListener("click", () => {
      for (let i = activeCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
      }
      currentIndex = 0;
      updateCardUI();
    });

    const openModalBtn = document.getElementById("pharma-open-modal-btn");
    if (openModalBtn) {
      openModalBtn.addEventListener("click", () => {
        const modal = document.getElementById("flashcard-modal");
        if (modal) modal.classList.add("active");
      });
    }

    updateCardUI();
  }

  function initModalEngine() {
    const modal = document.getElementById("flashcard-modal");
    if (!modal) return;

    const openBtns = [
      document.getElementById("flashcard-btn")
    ].filter(Boolean);

    const closeBtn = document.getElementById("close-flashcard");
    const cardEl = document.getElementById("pharma-flashcard");

    const selectEl = document.getElementById("fc-category-select");
    const shuffleBtn = document.getElementById("fc-shuffle");
    const progressFill = document.getElementById("fc-progress-fill");
    const topicBadge = document.getElementById("fc-topic-badge");
    const questionEl = document.getElementById("fc-question");
    const answerEl = document.getElementById("fc-answer");
    const explanationEl = document.getElementById("fc-explanation");
    const prevBtn = document.getElementById("fc-prev");
    const nextBtn = document.getElementById("fc-next");
    const counterEl = document.getElementById("fc-counter");
    const toggleKnownBtn = document.getElementById("fc-toggle-known");
    const knownTextEl = document.getElementById("fc-known-text");

    let activeCards = [...CARDS_DB];
    let currentIndex = 0;

    function renderModalCard() {
      if (!activeCards || activeCards.length === 0) {
        if (topicBadge) topicBadge.textContent = "⚠️ Trống";
        if (questionEl) questionEl.textContent = "Không có thẻ thuộc nhóm này.";
        if (answerEl) answerEl.textContent = "";
        if (explanationEl) explanationEl.textContent = "";
        if (counterEl) counterEl.textContent = "0 / 0";
        if (progressFill) progressFill.style.width = "0%";
        return;
      }

      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex >= activeCards.length) currentIndex = activeCards.length - 1;

      const card = activeCards[currentIndex];
      if (cardEl) cardEl.classList.remove("flipped");

      if (topicBadge) topicBadge.textContent = card.topicName || "💊 Dược lý học";
      if (questionEl) questionEl.innerHTML = card.question;
      if (answerEl) answerEl.innerHTML = card.answer;
      if (explanationEl) explanationEl.innerHTML = card.explanation;

      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${activeCards.length}`;
      if (progressFill) {
        const pct = Math.round(((currentIndex + 1) / activeCards.length) * 100);
        progressFill.style.width = `${pct}%`;
      }

      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex === activeCards.length - 1;

      const knownSet = getKnownCards();
      const isKnown = knownSet.has(card.id);
      if (toggleKnownBtn && knownTextEl) {
        const icon = toggleKnownBtn.querySelector("i");
        if (isKnown) {
          toggleKnownBtn.classList.add("active");
          if (icon) icon.className = "fa-solid fa-circle-check";
          knownTextEl.textContent = "Đã thuộc";
        } else {
          toggleKnownBtn.classList.remove("active");
          if (icon) icon.className = "fa-regular fa-circle-check";
          knownTextEl.textContent = "Chưa thuộc";
        }
      }
    }

    function openModal() {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      currentIndex = 0;
      renderModalCard();
      document.addEventListener("keydown", handleKeyDown);
    }

    function closeModal() {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      if (cardEl) cardEl.classList.remove("flipped");
      document.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e) {
      if (!modal.classList.contains("active")) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          currentIndex--;
          renderModalCard();
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex < activeCards.length - 1) {
          currentIndex++;
          renderModalCard();
        }
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (cardEl) cardEl.classList.toggle("flipped");
      }
    }

    openBtns.forEach(btn => btn.addEventListener("click", openModal));
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    if (cardEl) cardEl.addEventListener("click", () => cardEl.classList.toggle("flipped"));
    if (prevBtn) prevBtn.addEventListener("click", () => { if (currentIndex > 0) { currentIndex--; renderModalCard(); } });
    if (nextBtn) nextBtn.addEventListener("click", () => { if (currentIndex < activeCards.length - 1) { currentIndex++; renderModalCard(); } });

    if (selectEl) {
      selectEl.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "all") activeCards = [...CARDS_DB];
        else activeCards = CARDS_DB.filter(c => c.category === val);
        currentIndex = 0;
        renderModalCard();
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        for (let i = activeCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
        }
        currentIndex = 0;
        renderModalCard();
      });
    }

    if (toggleKnownBtn) {
      toggleKnownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!activeCards[currentIndex]) return;
        const currentId = activeCards[currentIndex].id;
        const knownSet = getKnownCards();
        if (knownSet.has(currentId)) knownSet.delete(currentId);
        else knownSet.add(currentId);
        saveKnownCards(knownSet);
        renderModalCard();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const mount = document.getElementById("pharma-flashcards-mount");
    if (mount) renderInlineMountedSection(mount);
    initModalEngine();
  });
})();
