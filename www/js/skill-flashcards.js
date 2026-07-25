/**
 * Spaced Repetition Flashcard Engine (SuperMemo SM-2) — CliniPortal
 * Thuật toán ôn tập ngắt quãng kiến thức kỹ năng lâm sàng
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_skill_flashcards';

  const FLASHCARD_BANK = [
    {
      id: "fc1",
      category: "Tim mạch",
      question: "Nêu vị trí 4 ổ van tim cơ bản khi nghe tim trên thành ngực?",
      answer: "1. Ổ van ĐMC: KLS 2 bờ phải xương ức<br>2. Ổ van ĐMP: KLS 2 bờ trái xương ức<br>3. Ổ van 3 lá: KLS 4-5 bờ trái xương ức<br>4. Ổ van 2 lá: KLS 5 đường trung đòn trái (mỏm tim)"
    },
    {
      id: "fc2",
      category: "Hô hấp",
      question: "Hiện tượng 'Phổi câm' (Silent Chest) trong cơn hen phế quản có ý nghĩa gì?",
      answer: "Là dấu hiệu <b>nguy kịch</b> — đường thở bị tắc nghẽn gần như hoàn toàn khiến không khí không di chuyển được, không phải là bệnh nhân đang đỡ khò khè."
    },
    {
      id: "fc3",
      category: "Tiêu hóa",
      question: "Dấu hiệu Blumberg (Phản ứng dội) dương tính gợi ý điều gì?",
      answer: "Gợi ý có <b>viêm phúc mạc</b> khu trú hoặc toàn thể (đau tăng đột ngột khi buông tay nhanh sau khi ấn sâu)."
    },
    {
      id: "fc4",
      category: "Cấp cứu",
      question: "Tần số ấn ngực chuẩn trong Hồi sinh tim phổi (CPR) là bao nhiêu?",
      answer: "<b>100 – 120 lần/phút</b>, độ sâu 5 – 6 cm, để ngực nở hoàn toàn sau mỗi lần ấn."
    },
    {
      id: "fc5",
      category: "Cận lâm sàng",
      question: "Tiêu chuẩn chẩn đoán STEMI trên ECG 12 chuyển đạo là gì?",
      answer: "ST chênh lên ≥ 1mm ở ≥ 2 chuyển đạo liên tiếp (hoặc ≥ 2mm ở V2-V3 nam, ≥ 1.5mm ở nữ)."
    }
  ];

  function getCardStates() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCardStates(states) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    } catch (e) {
      console.error('SkillFlashcards: Error saving states', e);
    }
  }

  function calculateSM2(cardState, quality) {
    let { repetitions = 0, interval = 1, easeFactor = 2.5 } = cardState || {};

    if (quality >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
      repetitions,
      interval,
      easeFactor,
      nextReviewDate: nextReview.toISOString()
    };
  }

  let currentIndex = 0;
  let isFlipped = false;

  function openFlashcardModal() {
    let overlay = document.getElementById('flashcard-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'flashcard-modal-overlay';
      overlay.className = 'flashcard-modal-overlay';
      document.body.appendChild(overlay);
    }

    currentIndex = 0;
    isFlipped = false;
    renderCurrentCard(overlay);
    overlay.classList.add('active');
  }

  function closeFlashcardModal() {
    const overlay = document.getElementById('flashcard-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function renderCurrentCard(overlay) {
    const card = FLASHCARD_BANK[currentIndex];
    if (!card) {
      overlay.innerHTML = `
        <div class="flashcard-modal">
          <div class="flashcard-header">
            <h3 class="flashcard-title">🎉 Hoàn Thành Ôn Tập!</h3>
            <button class="flashcard-close-btn" onclick="SkillFlashcards.close()">&times;</button>
          </div>
          <p style="text-align:center; color: var(--color-text-muted); margin: 2rem 0;">Bạn đã ôn tập xong tất cả flashcard của buổi học hôm nay!</p>
          <button class="btn-rating btn-rating-good" style="width: 100%;" onclick="SkillFlashcards.close()">Đóng lại</button>
        </div>
      `;
      return;
    }

    overlay.innerHTML = `
      <div class="flashcard-modal">
        <div class="flashcard-header">
          <h3 class="flashcard-title">🧠 Flashcard Ôn Tập (${currentIndex + 1}/${FLASHCARD_BANK.length})</h3>
          <button class="flashcard-close-btn" id="fc-close-btn">&times;</button>
        </div>

        <div class="flashcard-viewport ${isFlipped ? 'flipped' : ''}" id="fc-viewport">
          <div class="flashcard-flipper">
            <div class="flashcard-face flashcard-front">
              <span class="card-tag">${card.category}</span>
              <div class="card-question">${card.question}</div>
              <span class="card-hint">💡 Click để xem đáp án</span>
            </div>
            <div class="flashcard-face flashcard-back">
              <span class="card-tag">Đáp án chuẩn</span>
              <div class="card-answer">${card.answer}</div>
            </div>
          </div>
        </div>

        <div class="flashcard-controls" style="display: ${isFlipped ? 'grid' : 'none'};">
          <button class="btn-rating btn-rating-again" data-quality="1"><span>🔴 Lặp lại</span><small>1 ngày</small></button>
          <button class="btn-rating btn-rating-hard" data-quality="2"><span>🟠 Khó</span><small>2 ngày</small></button>
          <button class="btn-rating btn-rating-good" data-quality="4"><span>🔵 Tốt</span><small>4 ngày</small></button>
          <button class="btn-rating btn-rating-easy" data-quality="5"><span>🟢 Dễ</span><small>7 ngày</small></button>
        </div>
      </div>
    `;

    document.getElementById('fc-close-btn').addEventListener('click', closeFlashcardModal);

    const viewport = document.getElementById('fc-viewport');
    viewport.addEventListener('click', function () {
      isFlipped = !isFlipped;
      viewport.classList.toggle('flipped', isFlipped);
      const controls = overlay.querySelector('.flashcard-controls');
      if (controls) controls.style.display = isFlipped ? 'grid' : 'none';
    });

    overlay.querySelectorAll('.btn-rating').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const q = parseInt(this.getAttribute('data-quality'), 10);
        const states = getCardStates();
        states[card.id] = calculateSM2(states[card.id], q);
        saveCardStates(states);

        currentIndex++;
        isFlipped = false;
        renderCurrentCard(overlay);
      });
    });
  }

  window.SkillFlashcards = {
    open: openFlashcardModal,
    close: closeFlashcardModal
  };
})();
