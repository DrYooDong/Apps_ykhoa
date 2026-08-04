/**
 * ══════════════════════════════════════════
 *  CLINIPORTAL KNOWLEDGE SYNC (OMNI-CHANNEL)
 *  Highlight Text -> Auto Flashcard Generator & Studio
 * ══════════════════════════════════════════
 */

(function () {
  let popoverEl = null;
  let studyBtnEl = null;
  let selectedText = '';
  let selectedTitle = '';
  let currentStudyIndex = 0;
  let isFlipped = false;

  function initKnowledgeSync() {
    if (!document.getElementById('ks-dynamic-styles')) {
      const style = document.createElement('style');
      style.id = 'ks-dynamic-styles';
      style.textContent = `
        .ks-popover-btn {
          position: absolute;
          z-index: 999999;
          display: none;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 20px;
          border: none;
          background: linear-gradient(135deg, #0284c7, #0369a1);
          color: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(2, 132, 199, 0.4);
          cursor: pointer;
          transition: transform 0.15s ease;
          user-select: none;
        }
        .ks-popover-btn:hover { transform: scale(1.05); }

        .ks-study-badge-btn {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          font-size: 0.82rem;
          font-weight: 700;
          border-radius: 24px;
          border: 1px solid var(--color-border, #cbd5e1);
          background: var(--color-surface, #ffffff);
          color: var(--color-primary, #0284c7);
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ks-study-badge-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }

        .ks-modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(5px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0; visibility: hidden;
          transition: all 0.25s ease;
        }
        .ks-modal-overlay.active { opacity: 1; visibility: visible; }
        .ks-modal-card {
          background: var(--color-surface, #ffffff);
          color: var(--color-text, #1e293b);
          width: 90%; max-width: 480px;
          border-radius: 14px;
          box-shadow: 0 25px 30px -5px rgba(0,0,0,0.4);
          overflow: hidden; padding: 20px;
        }
        .ks-flashcard-box {
          min-height: 180px;
          border: 2px dashed var(--color-primary, #0284c7);
          border-radius: 10px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          background: rgba(2, 132, 199, 0.04);
          transition: transform 0.3s ease;
          perspective: 1000px;
        }
        .ks-toast-msg {
          position: fixed; bottom: 24px; right: 24px; z-index: 999999;
          background: #0f172a; color: #ffffff; padding: 10px 18px;
          border-radius: 8px; font-size: 0.85rem; font-weight: 600;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3); border-left: 4px solid #22c55e;
          display: flex; align-items: center; gap: 8px;
          animation: ksSlideIn 0.3s ease-out;
        }
        @keyframes ksSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    // Floating Popover Button for Selection
    popoverEl = document.createElement('button');
    popoverEl.className = 'ks-popover-btn';
    popoverEl.id = 'ksPopoverBtn';
    popoverEl.innerHTML = `<i class="fa-solid fa-bolt"></i> Tạo Flashcard DocSpace`;
    document.body.appendChild(popoverEl);

    // Floating Study Badge Button (Bottom-Left)
    studyBtnEl = document.createElement('button');
    studyBtnEl.className = 'ks-study-badge-btn';
    studyBtnEl.id = 'ksStudyBadgeBtn';
    document.body.appendChild(studyBtnEl);

    updateStudyBadgeCount();

    document.addEventListener('mouseup', handleTextSelection);
    popoverEl.addEventListener('click', saveFlashcard);
    studyBtnEl.addEventListener('click', openFlashcardStudio);
  }

  function getCards() {
    try {
      return JSON.parse(localStorage.getItem('cliniportal_flashcards') || '[]');
    } catch { return []; }
  }

  function updateStudyBadgeCount() {
    const cards = getCards();
    if (studyBtnEl) {
      if (cards.length > 0) {
        studyBtnEl.innerHTML = `<i class="fa-solid fa-layer-group" style="color:var(--color-primary);"></i> Thẻ Nhớ (${cards.length})`;
        studyBtnEl.style.display = 'flex';
      } else {
        studyBtnEl.style.display = 'none';
      }
    }
  }

  function handleTextSelection(e) {
    if (e.target.closest('#ksPopoverBtn') || e.target.closest('#ksStudyBadgeBtn')) return;

    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : '';

      if (text.length > 5 && text.length < 1000) {
        selectedText = text;
        selectedTitle = document.title ? document.title.replace(' – CliniPortal', '') : 'Thẻ Tri Thức';

        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          popoverEl.style.top = `${window.scrollY + rect.top - 42}px`;
          popoverEl.style.left = `${window.scrollX + rect.left + rect.width / 2 - 70}px`;
          popoverEl.style.display = 'inline-flex';
        } catch {
          hidePopover();
        }
      } else {
        hidePopover();
      }
    }, 10);
  }

  function hidePopover() {
    if (popoverEl) popoverEl.style.display = 'none';
  }

  function saveFlashcard(e) {
    e.stopPropagation();
    if (!selectedText) return;

    const cleanText = selectedText.slice(0, 1000).trim();

    try {
      const existing = getCards();
      
      const isDuplicate = existing.some(card => card.back === cleanText);
      if (isDuplicate) {
        showToast('⚠️ Thẻ Flashcard nội dung này đã tồn tại!');
        hidePopover();
        window.getSelection()?.removeAllRanges();
        return;
      }

      const newCard = {
        id: 'fc_' + Date.now(),
        front: selectedTitle || 'Thẻ Tri Thức',
        back: cleanText,
        sourceUrl: window.location.href,
        createdAt: new Date().toISOString(),
        reviewCount: 0
      };

      existing.unshift(newCard);
      if (existing.length > 200) existing.pop();

      localStorage.setItem('cliniportal_flashcards', JSON.stringify(existing));
      showToast('⚡ Đã lưu thẻ Flashcard vào DocSpace!');
      updateStudyBadgeCount();
    } catch (err) {
      showToast('❌ Không thể lưu thẻ Flashcard (Bộ nhớ đầy).');
    }

    hidePopover();
    window.getSelection()?.removeAllRanges();
  }

  // Interactive Flashcard Study Studio Modal
  function openFlashcardStudio() {
    const cards = getCards();
    if (cards.length === 0) {
      showToast('📭 Chưa có thẻ Flashcard nào được lưu.');
      return;
    }

    if (!document.getElementById('ks-study-modal')) {
      const modalHtml = `
        <div id="ks-study-modal" class="ks-modal-overlay" onclick="closeStudyModal(event)">
          <div class="ks-modal-card" onclick="event.stopPropagation()">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-weight:800; font-size:1rem; color:var(--color-primary);"><i class="fa-solid fa-graduation-cap"></i> Studio Ôn Thẻ Nhớ</span>
              <button onclick="closeStudyModal()" style="background:none; border:none; font-size:1.2rem; cursor:pointer;">&times;</button>
            </div>
            <div id="ksCardDisplayBox" class="ks-flashcard-box" onclick="flipCard()"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px;">
              <button class="cdss-btn" onclick="prevCard()"><i class="fa-solid fa-chevron-left"></i> Trước</button>
              <span id="ksCardCounter" style="font-size:0.8rem; font-weight:700;">1 / ${cards.length}</span>
              <button class="cdss-btn" onclick="nextCard()">Sau <i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    currentStudyIndex = 0;
    isFlipped = false;
    renderCurrentCard();
    document.getElementById('ks-study-modal').classList.add('active');
  }

  window.renderCurrentCard = function() {
    const cards = getCards();
    const box = document.getElementById('ksCardDisplayBox');
    const counter = document.getElementById('ksCardCounter');
    if (!box || cards.length === 0) return;

    if (currentStudyIndex >= cards.length) currentStudyIndex = 0;
    if (currentStudyIndex < 0) currentStudyIndex = cards.length - 1;

    const card = cards[currentStudyIndex];
    counter.textContent = `${currentStudyIndex + 1} / ${cards.length}`;

    if (!isFlipped) {
      box.innerHTML = `
        <div style="font-size:0.75rem; color:var(--color-primary); font-weight:700; text-transform:uppercase; margin-bottom:8px;">📌 MẶT TRƯỚC (CHỦ ĐỀ)</div>
        <div style="font-size:1rem; font-weight:700;">${card.front}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:12px;">(Nhấn để lật xem nội dung)</div>
      `;
    } else {
      box.innerHTML = `
        <div style="font-size:0.75rem; color:#22c55e; font-weight:700; text-transform:uppercase; margin-bottom:8px;">💡 MẶT SAU (NỘI DUNG)</div>
        <div style="font-size:0.88rem; line-height:1.5; text-align:left;">${card.back}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted); margin-top:12px;">(Nhấn để lật lại)</div>
      `;
    }
  };

  window.flipCard = function() {
    isFlipped = !isFlipped;
    renderCurrentCard();
  };

  window.nextCard = function() {
    currentStudyIndex++;
    isFlipped = false;
    renderCurrentCard();
  };

  window.prevCard = function() {
    currentStudyIndex--;
    isFlipped = false;
    renderCurrentCard();
  };

  window.closeStudyModal = function() {
    const modal = document.getElementById('ks-study-modal');
    if (modal) modal.classList.remove('active');
  };

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'ks-toast-msg';
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKnowledgeSync);
  } else {
    initKnowledgeSync();
  }
})();
