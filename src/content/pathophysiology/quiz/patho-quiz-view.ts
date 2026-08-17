/**
 * CliniPortal 2.0 — Case-Based Pathophysiology Quiz & Spaced Repetition Flashcards SPA View
 * Path: src/content/pathophysiology/quiz/patho-quiz-view.ts
 */

import '../../../../css/components/patho-quiz.css';
import { CLINICAL_CASES, FLASHCARDS_DATA, CaseChallenge, FlashcardItem } from './patho-quiz-data';

export function renderPathoQuizView(activeMode: 'cases' | 'flashcards' = 'cases'): string {
  return `
    <div class="main-wrapper" style="width: 100%; max-width: 1200px; margin: 0 auto; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">🧬 Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <span style="color: #10b981; font-weight: 600;">Luyện Tập Ca Lâm Sàng & Flashcards Cơ Chế</span>
      </div>

      <!-- HERO HEADER -->
      <div class="quiz-case-card" style="background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(2,132,199,0.02) 100%); margin-bottom: 1.5rem; border-color: rgba(16,185,129,0.2);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; background: #10b981; color: #fff; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Mechanism Reasoning Hub</span>
            <h1 style="margin: 0.4rem 0 0.25rem; font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a);">
              🧠 LUYỆN TẬP CƠ CHẾ BỆNH SINH QUA CA LÂM SÀNG
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted, #475569); max-width: 800px;">
              Củng cố khả năng suy luận lâm sàng từ gốc rễ: Phân tích chuỗi cơ chế bệnh sinh nhiều bước (Pathophysiologic Cascade) và ghi nhớ các quy luật sinh học qua thẻ thông minh Flashcards.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#/pathophysiology/simulators" class="quiz-mode-btn" style="text-decoration: none; font-size: 0.825rem; padding: 0.5rem 0.9rem;">
              <i class="fa-solid fa-bolt"></i> Phòng Thí Nghiệm
            </a>
            <a href="#/pathophysiology/metabolic-map" class="quiz-mode-btn" style="text-decoration: none; font-size: 0.825rem; padding: 0.5rem 0.9rem;">
              <i class="fa-solid fa-diagram-project"></i> Bản Đồ Chuyển Hóa
            </a>
          </div>
        </div>
      </div>

      <!-- MODE TOGGLE -->
      <div class="quiz-mode-nav" id="quizModeNav">
        <button class="quiz-mode-btn ${activeMode === 'cases' ? 'active' : ''}" data-mode="cases">
          <i class="fa-solid fa-hospital-user"></i> 1. Thử Thách Ca Lâm Sàng Cơ Chế (${CLINICAL_CASES.length} Ca)
        </button>
        <button class="quiz-mode-btn ${activeMode === 'flashcards' ? 'active' : ''}" data-mode="flashcards">
          <i class="fa-solid fa-layer-group"></i> 2. Flashcards Ghi Nhớ Quy Luật (${FLASHCARDS_DATA.length} Thẻ)
        </button>
      </div>

      <!-- CONTENT CONTAINER -->
      <div id="quizContentContainer">
        <!-- Rendered dynamically by initPathoQuizView -->
      </div>

    </div>
  `;
}

export function initPathoQuizView(): void {
  const container = document.getElementById('quizContentContainer');
  const modeBtns = document.querySelectorAll('#quizModeNav .quiz-mode-btn');
  if (!container) return;

  let activeMode: 'cases' | 'flashcards' = 'cases';

  function renderCurrentMode() {
    modeBtns.forEach(btn => {
      if (btn.getAttribute('data-mode') === activeMode) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (activeMode === 'cases') {
      renderCasesMode(container!);
    } else {
      renderFlashcardsMode(container!);
    }
  }

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeMode = (btn.getAttribute('data-mode') as 'cases' | 'flashcards') || 'cases';
      renderCurrentMode();
    });
  });

  renderCurrentMode();
}

/**
 * 1. RENDER CLINICAL CASES
 */
function renderCasesMode(container: HTMLElement): void {
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      ${CLINICAL_CASES.map((c, idx) => `
        <div class="quiz-case-card" id="caseCard_${c.id}">
          <div class="quiz-case-header">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.12); color: #10b981; padding: 0.2rem 0.5rem; border-radius: 4px;">
                ${c.specialty}
              </span>
              <h3 style="margin: 0.4rem 0 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">
                Ca ${idx + 1}: ${c.title}
              </h3>
            </div>
            <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">
              Câu hỏi ${idx + 1}/${CLINICAL_CASES.length}
            </span>
          </div>

          <!-- Clinical Vignette -->
          <div class="quiz-vignette">
            <strong>📋 Tóm tắt ca bệnh:</strong> ${c.vignette}
          </div>

          <!-- Question Prompt -->
          <p style="font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.85rem;">
            ❓ ${c.question}
          </p>

          <!-- Options -->
          <div class="quiz-options-list" id="optGroup_${c.id}">
            ${c.options.map(opt => `
              <button class="quiz-option-btn" data-case-id="${c.id}" data-opt-id="${opt.id}" data-correct="${opt.isCorrect}">
                <span class="quiz-option-badge">${opt.id}</span>
                <span>${opt.text}</span>
              </button>
            `).join('')}
          </div>

          <!-- Mechanism Explanation Box (Revealed on click) -->
          <div class="quiz-explanation-box" id="explain_${c.id}">
            <div style="font-size: 0.95rem; font-weight: 800; color: #065f46; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-circle-check" style="color: #10b981;"></i> Phân Tích Chuỗi Cơ Chế Bệnh Sinh (Cascade Reasoning)
            </div>
            <p style="font-size: 0.875rem; line-height: 1.6; color: var(--color-text, #1e293b); margin: 0 0 0.75rem;">
              ${c.cascadeExplanation}
            </p>
            <div style="padding: 0.75rem 1rem; border-radius: 8px; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; font-size: 0.85rem; color: var(--color-text, #1e293b); margin-bottom: 0.75rem;">
              <strong style="color: #0284c7;">💡 Clinical Pearl:</strong> ${c.clinicalPearls}
            </div>
            <div style="display: flex; justify-content: flex-end;">
              <a href="#/docspace/soap?from_patho_case=${c.id}" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 0.825rem; font-weight: 700; color: #fff; background: var(--color-primary, #0284c7); border-radius: 6px; text-decoration: none; box-shadow: 0 2px 4px rgba(2,132,199,0.25);">
                <i class="fa-solid fa-notes-medical"></i> Luyện tập Soạn Bệnh Án SOAP cho ca này
              </a>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach click events to options
  document.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = btn.getAttribute('data-case-id');
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      const group = document.getElementById(`optGroup_${caseId}`);
      const explainBox = document.getElementById(`explain_${caseId}`);

      if (group) {
        group.querySelectorAll('.quiz-option-btn').forEach(b => {
          (b as HTMLButtonElement).disabled = true;
          if (b.getAttribute('data-correct') === 'true') {
            b.classList.add('correct');
          }
        });
      }

      if (!isCorrect) {
        btn.classList.add('incorrect');
      }

      if (explainBox) {
        explainBox.classList.add('show');
      }
    });
  });
}

/**
 * 2. RENDER SPACED REPETITION FLASHCARDS
 */
let currentCardIndex = 0;

function renderFlashcardsMode(container: HTMLElement): void {
  const card = FLASHCARDS_DATA[currentCardIndex];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      
      <!-- Top Progress Indicator -->
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 650px; margin-bottom: 1rem;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #10b981;">
          <i class="fa-solid fa-tag"></i> ${card.category}
        </span>
        <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted);">
          Thẻ ${currentCardIndex + 1} / ${FLASHCARDS_DATA.length}
        </span>
      </div>

      <!-- 3D Flip Flashcard -->
      <div class="flashcard-wrapper" id="activeFlashcard">
        <div class="flashcard-inner">
          
          <!-- Front Face -->
          <div class="flashcard-front">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 1rem;">
              MẶT TRƯỚC: HIỆN TƯỢNG / BÃY CƠ CHẾ
            </span>
            <h2 style="font-size: 1.4rem; font-weight: 800; margin: 0 0 1rem; color: var(--color-text, #0f172a);">
              ${card.frontTitle}
            </h2>
            <p style="font-size: 1.05rem; line-height: 1.5; color: var(--color-text-muted, #475569); max-width: 500px; margin: 0 0 1.5rem;">
              "${card.frontClue}"
            </p>
            <span style="font-size: 0.8rem; color: #10b981; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-arrow-rotate-right"></i> Nhấp chuột hoặc chạm để lật xem giải thích
            </span>
          </div>

          <!-- Back Face -->
          <div class="flashcard-back">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.15); color: #10b981; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.75rem;">
              MẶT SAU: GIẢI THÍCH PHÂN TỬ & QUY LUẬT
            </span>
            <p style="font-size: 0.925rem; line-height: 1.6; color: var(--color-text, #0f172a); text-align: left; margin: 0 0 1rem; width: 100%;">
              ${card.backMechanism.replace(/\n/g, '<br>')}
            </p>
            <div style="padding: 0.6rem 0.9rem; border-radius: 8px; background: rgba(245,158,11,0.08); border-left: 3px solid #f59e0b; font-size: 0.825rem; text-align: left; width: 100%; color: var(--color-text, #0f172a);">
              <strong style="color: #d97706;">💡 Điểm cốt lõi:</strong> ${card.clinicalPearl}
            </div>
          </div>

        </div>
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div style="text-align: center; margin-bottom: 1rem;">
        <span style="font-size: 0.8rem; font-weight: 600; color: var(--color-text-muted);">Đánh giá mức độ ghi nhớ của bạn:</span>
      </div>
      <div class="flashcard-controls">
        <button class="flashcard-rate-btn rate-hard" id="btnCardHard">
          <i class="fa-solid fa-face-frown"></i> Khó (Ôn lại sớm)
        </button>
        <button class="flashcard-rate-btn rate-good" id="btnCardGood">
          <i class="fa-solid fa-face-smile"></i> Tốt (Nhớ tạm ổn)
        </button>
        <button class="flashcard-rate-btn rate-easy" id="btnCardEasy">
          <i class="fa-solid fa-face-laugh-beam"></i> Dễ (Đã thuộc kỹ)
        </button>
      </div>

      <!-- Navigation Arrows -->
      <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
        <button class="sim-pill-btn" id="btnPrevCard" ${currentCardIndex === 0 ? 'disabled style="opacity:0.5;"' : ''}>
          <i class="fa-solid fa-arrow-left"></i> Thẻ Trước
        </button>
        <button class="sim-pill-btn" id="btnNextCard" ${currentCardIndex === FLASHCARDS_DATA.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>
          Thẻ Tiếp Theo <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  `;

  // Attach flip event
  const cardEl = document.getElementById('activeFlashcard');
  cardEl?.addEventListener('click', () => {
    cardEl.classList.toggle('flipped');
  });

  // Attach rating & navigation events
  function goToNextCard() {
    if (currentCardIndex < FLASHCARDS_DATA.length - 1) {
      currentCardIndex++;
      renderFlashcardsMode(container);
    }
  }

  function goToPrevCard() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      renderFlashcardsMode(container);
    }
  }

  document.getElementById('btnCardHard')?.addEventListener('click', goToNextCard);
  document.getElementById('btnCardGood')?.addEventListener('click', goToNextCard);
  document.getElementById('btnCardEasy')?.addEventListener('click', goToNextCard);

  document.getElementById('btnNextCard')?.addEventListener('click', goToNextCard);
  document.getElementById('btnPrevCard')?.addEventListener('click', goToPrevCard);
}
