// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - PHARMACOLOGY FLASHCARD 3D ENGINE
//  Hệ thống ôn tập Dược lý Spaced Repetition Flip Cards
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_pharma_flashcards_v1';

  // Flashcards Database
  const CARDS_DB = [
    {
      id: 1,
      category: 'Tim mạch • Chống đông',
      question: 'Tại sao chống chỉ định dùng chung ARNI (Sacubitril/Valsartan) với thuốc ACEi?',
      answer: 'Cả hai thuốc đều làm tăng nồng độ Bradykinin. Phối hợp gây bùng phát rủi ro Phù Mạch (Angioedema) đe dọa tính mạng. Bắt buộc có khoảng nghỉ (washout) tối thiểu 36 giờ khi chuyển đổi.',
      hint: 'Gợi ý: Cơ chế giải phóng Bradykinin và nguy cơ dị ứng phù thanh quản.'
    },
    {
      id: 2,
      category: 'Kháng sinh • Tương tác',
      question: 'Tương tác nghiêm trọng nhất khi dùng đồng thời Clarithromycin và Atorvastatin là gì?',
      answer: 'Clarithromycin ức chế mạnh CYP3A4 tại gan, chặn đứng tiêu hóa Statin → Nồng độ Statin trong máu tăng vọt gây Tiêu Cơ Vân Cấp (Rhabdomyolysis) và Suy Thận Cấp.',
      hint: 'Gợi ý: Men chuyển hóa gan CYP3A4 và độc tính trên cơ.'
    },
    {
      id: 3,
      category: 'Tim mạch • Thuốc hạ áp',
      question: 'Tại sao Verapamil/Diltiazem chống chỉ định phối hợp với Beta-Blockers?',
      answer: 'Cả hai đều có tác dụng ức chế nút xoang và nút nhĩ thất (AV). Phối hợp gây hiệp đồng làm chậm nhịp tim nặng, Block nhĩ thất độ III hoặc Ngừng Tim.',
      hint: 'Gợi ý: Điện thế dẫn truyền tim và nút nhĩ thất.'
    },
    {
      id: 4,
      category: 'Hồi sức • Vận mạch',
      question: 'Thuốc vận mạch ưu tiên hàng đầu trong Sốc Nhiễm Khuẩn (Septic Shock) là gì?',
      answer: 'Noradrenaline (Norepinephrine) là lựa chọn hàng đầu theo Surviving Sepsis Campaign giúp co mạch qua thụ thể Alpha-1 mà ít gây tăng nhịp tim quá mức.',
      hint: 'Gợi ý: Thụ thể Alpha-1 và Hướng dẫn SSC.'
    },
    {
      id: 5,
      category: 'Độc chất • Antidotes',
      question: 'Thuốc giải độc đặc hiệu cho ngộ độc Paracetamol cấp tính là gì và dùng trong bao lâu?',
      answer: 'N-Acetylcysteine (NAC). Hiệu quả bảo vệ gan cao nhất khi dùng trong vòng 8 tiếng đầu sau khi uống quá liều Paracetamol.',
      hint: 'Gợi ý: Cung cấp Glutathione để trung hòa chất độc NAPQI.'
    },
    {
      id: 6,
      category: 'Tiêu hóa • Kháng tiết',
      question: 'Tại sao không khuyến cáo dùng Omeprazole chung với Clopidogrel (Plavix)?',
      answer: 'Omeprazole ức chế CYP2C19, làm giảm quá trình chuyển hóa Clopidogrel từ tiền chất thành dạng có hoạt tính → Giảm hiệu quả kháng kết tập tiểu cầu, tăng nguy cơ tắc Stent.',
      hint: 'Gợi ý: Sự kích hoạt prodrug qua men CYP2C19.'
    }
  ];

  let currentIndex = 0;
  let isFlipped = false;

  function loadStats() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  function saveRating(cardId, rating) {
    const stats = loadStats();
    stats[cardId] = { rating, timestamp: Date.now() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('[Flashcards] Save error:', e);
    }
  }

  function renderFlashcardsSection(mountEl) {
    if (!mountEl) return;

    mountEl.innerHTML = `
      <div class="flashcard-section-container">
        <div class="flashcard-header-bar">
          <div class="flashcard-title-group">
            <span class="pharma-tool-icon" style="width: 36px; height: 36px; font-size: 1rem;"><i class="fa-solid fa-brain"></i></span>
            <div>
              <h3 style="margin:0; font-size: var(--text-md); font-weight: 700;">Ôn Tập Dược Lý — Flashcard Spaced Repetition</h3>
              <p style="margin:0; font-size: 0.78rem; color: var(--color-text-muted);">Lật thẻ 3D để kiểm tra ghi nhớ cơ chế & tương tác thuốc lâm sàng</p>
            </div>
          </div>
          <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-primary);" id="fc-progress-counter">
            Thẻ 1 / ${CARDS_DB.length}
          </div>
        </div>

        <div class="flashcard-3d-wrapper" id="fc-card-wrapper">
          <div class="flashcard-3d-card" id="fc-card-inner">
            <!-- Front Face -->
            <div class="flashcard-face flashcard-face-front">
              <div class="flashcard-tag" id="fc-tag-front">Chủ đề</div>
              <div class="flashcard-question-text" id="fc-question">Câu hỏi...</div>
              <div class="flashcard-hint-footer">💡 Nhấn vào thẻ để lật xem đáp án</div>
            </div>
            <!-- Back Face -->
            <div class="flashcard-face flashcard-face-back">
              <div class="flashcard-tag" style="background: var(--color-teal-hl); color: var(--color-teal);" id="fc-tag-back">Đáp án & Giải thích</div>
              <div class="flashcard-answer-text" id="fc-answer">Đáp án...</div>
              <div class="flashcard-hint-footer">Chọn mức độ ghi nhớ ở bên dưới để đánh giá</div>
            </div>
          </div>
        </div>

        <div class="flashcard-controls-bar">
          <button class="fc-rate-btn fc-rate-again" data-rate="again">🔄 Chưa nhớ</button>
          <button class="fc-rate-btn fc-rate-hard" data-rate="hard">⚠️ Khó</button>
          <button class="fc-rate-btn fc-rate-good" data-rate="good">👍 Nhớ tốt</button>
          <button class="fc-rate-btn fc-rate-easy" data-rate="easy">🌟 Rất dễ</button>
        </div>
      </div>
    `;

    const wrapper = document.getElementById('fc-card-wrapper');
    wrapper.addEventListener('click', toggleFlip);

    document.querySelectorAll('.fc-rate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const rating = btn.getAttribute('data-rate');
        const card = CARDS_DB[currentIndex];
        saveRating(card.id, rating);
        nextCard();
      });
    });

    displayCurrentCard();
  }

  function toggleFlip() {
    isFlipped = !isFlipped;
    const wrapper = document.getElementById('fc-card-wrapper');
    if (wrapper) {
      if (isFlipped) wrapper.classList.add('flipped');
      else wrapper.classList.remove('flipped');
    }
  }

  function displayCurrentCard() {
    const card = CARDS_DB[currentIndex];
    isFlipped = false;

    const wrapper = document.getElementById('fc-card-wrapper');
    if (wrapper) wrapper.classList.remove('flipped');

    document.getElementById('fc-tag-front').textContent = card.category;
    document.getElementById('fc-tag-back').textContent = card.category;
    document.getElementById('fc-question').textContent = card.question;
    document.getElementById('fc-answer').textContent = card.answer;
    document.getElementById('fc-progress-counter').textContent = `Thẻ ${currentIndex + 1} / ${CARDS_DB.length}`;
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % CARDS_DB.length;
    displayCurrentCard();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('pharma-flashcards-mount');
    if (mount) {
      renderFlashcardsSection(mount);
    }
  });
})();
