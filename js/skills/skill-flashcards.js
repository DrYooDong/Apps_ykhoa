/**
 * Spaced Repetition Flashcard Engine — CliniPortal (Kỹ năng Lâm sàng)
 * Đồng bộ chuẩn giao diện, lật thẻ 3D, thanh tiến độ, bộ lọc & phím tắt theo co-che-benh-sinh.html
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_skill_fc_known';

  const FLASHCARD_BANK = [
    {
      id: "fc-sk-1",
      category: "Tim mạch",
      topicName: "🩺 Khám Tim mạch",
      question: "Nêu vị trí 4 ổ van tim cơ bản khi nghe tim trên thành ngực?",
      answer: "1. Ổ van ĐMC: KLS 2 bờ phải ức | 2. Ổ van ĐMP: KLS 2 bờ trái ức | 3. Ổ 3 lá: KLS 4-5 bờ trái ức | 4. Ổ 2 lá: KLS 5 đường trung đòn trái (mỏm tim).",
      explanation: "Ổ Erb-Phys (KLS 3 bờ trái xương ức) là vị trí nghe rõ tiếng thổi của hở van động mạch chủ."
    },
    {
      id: "fc-sk-2",
      category: "Hô hấp",
      topicName: "🫁 Khám Hô hấp",
      question: "Hiện tượng 'Phổi câm' (Silent Chest) trong cơn hen phế quản có ý nghĩa gì?",
      answer: "Là dấu hiệu nguy kịch — đường thở bị tắc nghẽn gần như hoàn toàn khiến không khí không di chuyển được.",
      explanation: "Phổi câm không phải là bệnh nhân đang đỡ khò khè mà là dấu hiệu suy hô hấp nặng, cần cấp cứu mở đường thở khẩn cấp."
    },
    {
      id: "fc-sk-3",
      category: "Tiêu hóa",
      topicName: "🥗 Khám Bụng",
      question: "Dấu hiệu Blumberg (Phản ứng dội) dương tính gợi ý điều gì?",
      answer: "Gợi ý có viêm phúc mạc khu trú hoặc toàn thể.",
      explanation: "Thực hiện bằng cách ấn sâu từ từ vào thành bụng rồi buông tay ra đột ngột. Đau tăng dữ dội khi buông tay do màng bụng bị kích thích."
    },
    {
      id: "fc-sk-4",
      category: "Cấp cứu",
      topicName: "🚑 Hồi sức Cấp cứu",
      question: "Tần số ấn ngực và độ sâu chuẩn trong Hồi sinh tim phổi (CPR) là bao nhiêu?",
      answer: "Tần số 100 – 120 lần/phút, độ sâu 5 – 6 cm ở người trưởng thành.",
      explanation: "Đảm bảo để lồng ngực tái dãn hoàn toàn sau mỗi lần ấn và hạn chế tối đa thời gian gián đoạn ấn ngực."
    },
    {
      id: "fc-sk-5",
      category: "Cận lâm sàng",
      topicName: "📊 Điện tâm đồ (ECG)",
      question: "Tiêu chuẩn chẩn đoán STEMI trên ECG 12 chuyển đạo là gì?",
      answer: "ST chênh lên ≥ 1mm ở ≥ 2 chuyển đạo liên tiếp (hoặc ≥ 2mm ở V2-V3 nam, ≥ 1.5mm ở nữ).",
      explanation: "Cần đánh giá kèm dấu hiệu soi gương (reciprocal changes) ở các chuyển đạo đối diện."
    },
    {
      id: "fc-sk-6",
      category: "Tim mạch",
      topicName: "🩺 Khám Tim mạch",
      question: "Tiếng T3 (Tiếng ngựa phi tâm trương) có cơ chế và ý nghĩa lâm sàng gì?",
      answer: "Do dòng máu dồn nhanh từ nhĩ xuống thất trái dãn rộng ở đầu tâm trương, gợi ý Suy tim thất trái.",
      explanation: "Tiếng T3 sinh lý có thể gặp ở trẻ em hoặc thanh niên vận động viên, nhưng ở người >40 tuổi là dấu hiệu suy tim."
    },
    {
      id: "fc-sk-7",
      category: "Cấp cứu",
      topicName: "🚑 Cấp cứu Đường thở",
      question: "Nêu 3 dấu hiệu chẩn đoán Tắc nghẽn đường thở do dị vật cấp tính?",
      answer: "1. Ôm cổ (Dấu hiệu quốc tế) | 2. Không nói, không ho được | 3. Tím tái cấp tính.",
      explanation: "Xử trí ngay lập tức bằng thủ thuật Heimlich (ấn bụng) hoặc vỗ lưng ấn ngực ở trẻ nhỏ."
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
      console.warn('[SkillFlashcards] Error saving known state:', e);
    }
  }

  function initFlashcardEngine() {
    const flashcardModal = document.getElementById("flashcard-modal");
    if (!flashcardModal) return;

    const openBtns = [
      document.getElementById("flashcard-btn"),
      document.getElementById("btnOpenFlashcards")
    ].filter(Boolean);

    const closeBtn = document.getElementById("close-flashcard");
    const cardEl = document.getElementById("skill-flashcard");

    const categorySelect = document.getElementById("fc-category-select");
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

    let activeCards = [...FLASHCARD_BANK];
    let currentIndex = 0;

    function renderCurrentCard() {
      if (!activeCards || activeCards.length === 0) {
        if (topicBadge) topicBadge.textContent = "⚠️ Trống";
        if (questionEl) questionEl.textContent = "Không có thẻ nào thuộc chuyên khoa này.";
        if (answerEl) answerEl.textContent = "";
        if (explanationEl) explanationEl.textContent = "";
        if (counterEl) counterEl.textContent = "0 / 0";
        if (progressFill) progressFill.style.width = "0%";
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
      }

      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex >= activeCards.length) currentIndex = activeCards.length - 1;

      const card = activeCards[currentIndex];

      if (cardEl) cardEl.classList.remove("flipped");

      if (topicBadge) topicBadge.textContent = card.topicName || "🩺 Kỹ năng lâm sàng";
      if (questionEl) questionEl.innerHTML = card.question || "";
      if (answerEl) answerEl.innerHTML = card.answer || "";
      if (explanationEl) explanationEl.innerHTML = card.explanation || "";

      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${activeCards.length}`;
      if (progressFill) {
        const percentage = Math.round(((currentIndex + 1) / activeCards.length) * 100);
        progressFill.style.width = `${percentage}%`;
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
      flashcardModal.classList.add("active");
      flashcardModal.setAttribute("aria-hidden", "false");
      currentIndex = 0;
      renderCurrentCard();
      document.addEventListener("keydown", handleKeyDown);
    }

    function closeModal() {
      flashcardModal.classList.remove("active");
      flashcardModal.setAttribute("aria-hidden", "true");
      if (cardEl) cardEl.classList.remove("flipped");
      document.removeEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e) {
      if (!flashcardModal.classList.contains("active")) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          currentIndex--;
          renderCurrentCard();
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex < activeCards.length - 1) {
          currentIndex++;
          renderCurrentCard();
        }
      } else if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        if (cardEl) cardEl.classList.toggle("flipped");
      }
    }

    // Event listeners
    openBtns.forEach(btn => btn.addEventListener("click", openModal));
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    flashcardModal.addEventListener("click", (e) => {
      if (e.target === flashcardModal) closeModal();
    });

    if (cardEl) {
      cardEl.addEventListener("click", () => {
        cardEl.classList.toggle("flipped");
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          renderCurrentCard();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentIndex < activeCards.length - 1) {
          currentIndex++;
          renderCurrentCard();
        }
      });
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "all") {
          activeCards = [...FLASHCARD_BANK];
        } else {
          activeCards = FLASHCARD_BANK.filter(c => c.category === val);
        }
        currentIndex = 0;
        renderCurrentCard();
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener("click", () => {
        for (let i = activeCards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [activeCards[i], activeCards[j]] = [activeCards[j], activeCards[i]];
        }
        currentIndex = 0;
        renderCurrentCard();
      });
    }

    if (toggleKnownBtn) {
      toggleKnownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!activeCards[currentIndex]) return;
        const currentId = activeCards[currentIndex].id;
        const knownSet = getKnownCards();
        if (knownSet.has(currentId)) {
          knownSet.delete(currentId);
        } else {
          knownSet.add(currentId);
        }
        saveKnownCards(knownSet);
        renderCurrentCard();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFlashcardEngine);
  } else {
    initFlashcardEngine();
  }

  window.SkillFlashcards = {
    open: function () {
      const modal = document.getElementById("flashcard-modal");
      if (modal) modal.classList.add("active");
    },
    close: function () {
      const modal = document.getElementById("flashcard-modal");
      if (modal) modal.classList.remove("active");
    }
  };
})();
