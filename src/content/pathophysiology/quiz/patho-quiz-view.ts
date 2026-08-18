/**
 * CliniPortal 2.0 — Case-Based Pathophysiology Quiz, Flashcards, Cascade Builder & Medical Exam Generator Studio
 * Path: src/content/pathophysiology/quiz/patho-quiz-view.ts
 * Evidence-Based Medicine (EBM) Multi-Disciplinary Reasoning & Exam Assembly Platform
 */

import '../../../../css/components/patho-quiz.css';
import {
  CLINICAL_CASES,
  FLASHCARDS_DATA,
  CASCADE_BUILDER_DATA,
  CaseChallenge,
  FlashcardItem,
  CascadeBuilderItem,
  CascadeStep
} from './patho-quiz-data';
import {
  EXAM_QUESTION_BANK,
  TOPIC_METADATA_LIST,
  ExamQuestion
} from './exam-bank-data';
import {
  ExamConfig,
  GeneratedExam,
  ExamEvaluationResult,
  generateCustomExam,
  evaluateExamSubmission
} from './exam-generator-engine';

const STORAGE_KEY_USER_STATS = 'cliniportal_mechanism_reasoning_stats';

interface UserReasoningStats {
  completedCases: string[];
  masteredFlashcards: string[];
  solvedCascades: string[];
  completedExams: number;
  score: number;
}

function getStoredStats(): UserReasoningStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_STATS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse user reasoning stats:', e);
  }
  return {
    completedCases: [],
    masteredFlashcards: [],
    solvedCascades: [],
    completedExams: 0,
    score: 0
  };
}

function saveStats(stats: UserReasoningStats): void {
  try {
    localStorage.setItem(STORAGE_KEY_USER_STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user reasoning stats:', e);
  }
}

export function renderPathoQuizView(activeMode: 'cases' | 'flashcards' | 'cascade' | 'generator' = 'cases'): string {
  const stats = getStoredStats();
  const totalItems = CLINICAL_CASES.length + FLASHCARDS_DATA.length + CASCADE_BUILDER_DATA.length + 10;
  const completedCount = stats.completedCases.length + stats.masteredFlashcards.length + stats.solvedCascades.length + (stats.completedExams * 2);
  const masteryPercent = Math.min(100, Math.round((completedCount / totalItems) * 100));

  let rankTitle = 'Tập sự Cơ chế';
  let rankIcon = 'fa-seedling';
  let rankColor = '#64748b';
  if (masteryPercent >= 75) {
    rankTitle = 'Bậc thầy Bệnh sinh Phân tử';
    rankIcon = 'fa-crown';
    rankColor = '#f59e0b';
  } else if (masteryPercent >= 40) {
    rankTitle = 'Bác sĩ Suy luận Lâm sàng';
    rankIcon = 'fa-user-md';
    rankColor = '#0284c7';
  } else if (masteryPercent >= 15) {
    rankTitle = 'Chuyên viên Tư duy Cơ chế';
    rankIcon = 'fa-brain';
    rankColor = '#10b981';
  }

  return `
    <div class="main-wrapper" style="width: 100%; max-width: 1280px; margin: 0 auto; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">🧬 Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <span style="color: #10b981; font-weight: 600;">Mechanism Reasoning Hub & Studio Tạo Đề Thi</span>
      </div>

      <!-- HERO HEADER -->
      <div class="quiz-case-card" style="background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(2,132,199,0.04) 100%); margin-bottom: 1.25rem; border-color: rgba(16,185,129,0.25);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1.25rem;">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; background: #10b981; color: #fff; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.4rem;">
              <i class="fa-solid fa-microchip"></i> Mechanism Reasoning Hub & Exam Studio
            </div>
            <h1 style="margin: 0.25rem 0 0.4rem; font-size: 1.65rem; font-weight: 800; color: var(--color-text, #0f172a); letter-spacing: -0.5px;">
              🧠 HUẤN LUYỆN TƯ DUY CƠ CHẾ & TẠO ĐỀ ÔN TẬP Y KHOA
            </h1>
            <p style="margin: 0; font-size: 0.925rem; color: var(--color-text-muted, #475569); max-width: 860px; line-height: 1.55;">
              Nền tảng tích hợp <strong>31+ chuyên đề Hóa sinh (7 Khối)</strong> & <strong>50+ bài Giải phẫu - Sinh lý (9 Hệ)</strong>: Luyện tập chuỗi suy luận phân tử, thẻ flashcard 3D, và <strong>thuật toán sinh đề thi tùy biến theo chuẩn Blueprint EBM</strong>.
            </p>
          </div>

          <!-- Quick Actions -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <a href="#/pathophysiology/simulators" class="quiz-mode-btn" style="text-decoration: none; font-size: 0.825rem; padding: 0.5rem 0.9rem;">
              <i class="fa-solid fa-bolt" style="color: #0284c7;"></i> Phòng Thí Nghiệm
            </a>
            <a href="#/pathophysiology/metabolic-map" class="quiz-mode-btn" style="text-decoration: none; font-size: 0.825rem; padding: 0.5rem 0.9rem;">
              <i class="fa-solid fa-diagram-project" style="color: #8b5cf6;"></i> Bản Đồ Chuyển Hóa
            </a>
            <a href="#/pathophysiology/formula-vault" class="quiz-mode-btn" style="text-decoration: none; font-size: 0.825rem; padding: 0.5rem 0.9rem;">
              <i class="fa-solid fa-square-root-variable" style="color: #f59e0b;"></i> Kho Công Thức
            </a>
          </div>
        </div>
      </div>

      <!-- MASTERY PROGRESS & KPI DASHBOARD -->
      <div class="quiz-mastery-card" id="quizMasteryCard">
        <div class="quiz-stat-item">
          <div class="quiz-stat-icon" style="background: rgba(16,185,129,0.12); color: #10b981;">
            <i class="fa-solid fa-hospital-user"></i>
          </div>
          <div>
            <div class="quiz-stat-val" id="statCompletedCases">${stats.completedCases.length} / ${CLINICAL_CASES.length}</div>
            <div class="quiz-stat-lbl">Ca Bệnh Đã Giải</div>
          </div>
        </div>

        <div class="quiz-stat-item">
          <div class="quiz-stat-icon" style="background: rgba(2,132,199,0.12); color: #0284c7;">
            <i class="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <div class="quiz-stat-val" id="statMasteredCards">${stats.masteredFlashcards.length} / ${FLASHCARDS_DATA.length}</div>
            <div class="quiz-stat-lbl">Thẻ Flashcard Đã Thuộc</div>
          </div>
        </div>

        <div class="quiz-stat-item">
          <div class="quiz-stat-icon" style="background: rgba(139,92,246,0.12); color: #8b5cf6;">
            <i class="fa-solid fa-code-merge"></i>
          </div>
          <div>
            <div class="quiz-stat-val" id="statSolvedCascades">${stats.solvedCascades.length} / ${CASCADE_BUILDER_DATA.length}</div>
            <div class="quiz-stat-lbl">Chuỗi Cascade Đã Lắp</div>
          </div>
        </div>

        <div class="quiz-stat-item">
          <div class="quiz-stat-icon" style="background: rgba(245,158,11,0.12); color: ${rankColor};">
            <i class="fa-solid ${rankIcon}"></i>
          </div>
          <div>
            <div class="quiz-stat-val" style="color: ${rankColor}; font-size: 1.1rem;" id="statRankTitle">${rankTitle}</div>
            <div class="quiz-stat-lbl">Điểm: <span id="statScore">${stats.score}</span> pts (${masteryPercent}%)</div>
          </div>
        </div>
      </div>

      <!-- MASTER MODE NAVIGATION TABS (4 CHẾ ĐỘ TOÀN DIỆN) -->
      <div class="quiz-mode-nav" id="quizModeNav">
        <button class="quiz-mode-btn ${activeMode === 'cases' ? 'active' : ''}" data-mode="cases">
          <i class="fa-solid fa-stethoscope"></i> 1. Thử Thách Ca Bệnh (${CLINICAL_CASES.length})
        </button>
        <button class="quiz-mode-btn ${activeMode === 'flashcards' ? 'active' : ''}" data-mode="flashcards">
          <i class="fa-solid fa-layer-group"></i> 2. Flashcards Quy Luật (${FLASHCARDS_DATA.length})
        </button>
        <button class="quiz-mode-btn ${activeMode === 'cascade' ? 'active' : ''}" data-mode="cascade">
          <i class="fa-solid fa-diagram-next"></i> 3. Lắp Ráp Chuỗi Cơ Chế (${CASCADE_BUILDER_DATA.length})
        </button>
        <button class="quiz-mode-btn ${activeMode === 'generator' ? 'active' : ''}" data-mode="generator" style="border-color: #0284c7; color: ${activeMode === 'generator' ? '#fff' : '#0284c7'};">
          <i class="fa-solid fa-wand-magic-sparkles"></i> 4. Trình Tạo Đề Thi & Ôn Tập
        </button>
      </div>

      <!-- TOOLBAR (SEARCH & SPECIALTY FILTER - Visible in Cases & Flashcards) -->
      <div class="quiz-toolbar" id="quizToolbar">
        <div class="quiz-search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="quizSearchInput" placeholder="Tìm kiếm ca bệnh, cơ chế phân tử, enzyme, ion, triệu chứng (vd: starling, troponin, dka, sepsis, g6pd, h. pylori)...">
        </div>
        <div class="quiz-filter-chips" id="specialtyFilterChips">
          <button class="quiz-filter-chip active" data-specialty="all">
            Tất Cả <span class="quiz-chip-count">18</span>
          </button>
          <button class="quiz-filter-chip" data-specialty="cardiology">
            ❤️ Tim Mạch
          </button>
          <button class="quiz-filter-chip" data-specialty="respiratory">
            🫁 Hô Hấp
          </button>
          <button class="quiz-filter-chip" data-specialty="gi_hepato">
            🍽️ Tiêu Hóa & Gan
          </button>
          <button class="quiz-filter-chip" data-specialty="nephrology">
            🧪 Thận & Điện Giải
          </button>
          <button class="quiz-filter-chip" data-specialty="endocrine">
            🧬 Nội Tiết & Chuyển Hóa
          </button>
          <button class="quiz-filter-chip" data-specialty="hematology">
            🩸 Huyết Học
          </button>
          <button class="quiz-filter-chip" data-specialty="immunology_inf">
            🛡️ Miễn Dịch & Nhiễm
          </button>
          <button class="quiz-filter-chip" data-specialty="rheum_bone">
            🦴 Khớp & Chuyển Hóa
          </button>
          <button class="quiz-filter-chip" data-specialty="ob_peds">
            👶 Sản & Nhi
          </button>
        </div>
      </div>

      <!-- DYNAMIC CONTENT CONTAINER -->
      <div id="quizContentContainer">
        <!-- Injected dynamically by initPathoQuizView -->
      </div>

    </div>
  `;
}

export function initPathoQuizView(): void {
  const container = document.getElementById('quizContentContainer');
  const modeBtns = document.querySelectorAll('#quizModeNav .quiz-mode-btn');
  const toolbar = document.getElementById('quizToolbar');
  const searchInput = document.getElementById('quizSearchInput') as HTMLInputElement | null;
  const filterChips = document.querySelectorAll('#specialtyFilterChips .quiz-filter-chip');

  if (!container) return;

  let currentMode: 'cases' | 'flashcards' | 'cascade' | 'generator' = 'cases';
  let currentSpecialty = 'all';
  let searchQuery = '';

  function updateMasteryUI() {
    const stats = getStoredStats();
    const completedEl = document.getElementById('statCompletedCases');
    const masteredEl = document.getElementById('statMasteredCards');
    const solvedEl = document.getElementById('statSolvedCascades');
    const scoreEl = document.getElementById('statScore');

    if (completedEl) completedEl.textContent = `${stats.completedCases.length} / ${CLINICAL_CASES.length}`;
    if (masteredEl) masteredEl.textContent = `${stats.masteredFlashcards.length} / ${FLASHCARDS_DATA.length}`;
    if (solvedEl) solvedEl.textContent = `${stats.solvedCascades.length} / ${CASCADE_BUILDER_DATA.length}`;
    if (scoreEl) scoreEl.textContent = `${stats.score}`;
  }

  function renderView() {
    modeBtns.forEach(btn => {
      if (btn.getAttribute('data-mode') === currentMode) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (toolbar) {
      toolbar.style.display = (currentMode === 'generator') ? 'none' : 'flex';
    }

    if (currentMode === 'cases') {
      renderCasesMode(container!, currentSpecialty, searchQuery, updateMasteryUI);
    } else if (currentMode === 'flashcards') {
      renderFlashcardsMode(container!, currentSpecialty, searchQuery, updateMasteryUI);
    } else if (currentMode === 'cascade') {
      renderCascadeBuilderMode(container!, currentSpecialty, searchQuery, updateMasteryUI);
    } else {
      renderExamGeneratorStudio(container!, updateMasteryUI);
    }
  }

  // Event Listeners for Mode Switching
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentMode = (btn.getAttribute('data-mode') as any) || 'cases';
      renderView();
    });
  });

  // Event Listeners for Specialty Filters
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSpecialty = chip.getAttribute('data-specialty') || 'all';
      renderView();
    });
  });

  // Event Listeners for Search Input
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    renderView();
  });

  renderView();
}

/**
 * ==========================================================================
 * 1. RENDER CHẾ ĐỘ THỬ THÁCH CA LÂM SÀNG CƠ CHẾ
 * ==========================================================================
 */
function renderCasesMode(
  container: HTMLElement,
  specialty: string,
  search: string,
  onProgressUpdate: () => void
): void {
  const stats = getStoredStats();

  const filteredCases = CLINICAL_CASES.filter(c => {
    const matchSpec = specialty === 'all' || c.specialtyKey === specialty;
    const matchSearch = !search ||
      c.title.toLowerCase().includes(search) ||
      c.vignette.toLowerCase().includes(search) ||
      c.specialty.toLowerCase().includes(search) ||
      c.cascadeExplanation.toLowerCase().includes(search);
    return matchSpec && matchSearch;
  });

  if (filteredCases.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; background: var(--color-surface); border-radius: 16px; border: 1px dashed var(--color-border);">
        <i class="fa-solid fa-filter-circle-xmark" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem; color: var(--color-text);">Không tìm thấy ca lâm sàng phù hợp</h3>
        <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">Vui lòng thử từ khóa tìm kiếm khác hoặc chuyển bộ lọc chuyên khoa sang "Tất Cả".</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      ${filteredCases.map((c, idx) => {
        const isDone = stats.completedCases.includes(c.id);

        let diffBadgeColor = '#10b981';
        let diffBg = 'rgba(16,185,129,0.1)';
        if (c.difficulty === 'Nâng cao') {
          diffBadgeColor = '#ef4444';
          diffBg = 'rgba(239,68,68,0.1)';
        } else if (c.difficulty === 'Trung cấp') {
          diffBadgeColor = '#f59e0b';
          diffBg = 'rgba(245,158,11,0.1)';
        }

        return `
          <div class="quiz-case-card" id="caseCard_${c.id}" style="${isDone ? 'border-color: rgba(16,185,129,0.6);' : ''}">
            
            <!-- Case Header -->
            <div class="quiz-case-header">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
                  <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.2rem 0.55rem; border-radius: 4px;">
                    <i class="fa-solid fa-tag"></i> ${c.specialty}
                  </span>
                  <span style="font-size: 0.75rem; font-weight: 700; background: ${diffBg}; color: ${diffBadgeColor}; padding: 0.2rem 0.55rem; border-radius: 4px;">
                    ${c.difficulty}
                  </span>
                  ${isDone ? `
                    <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.15); color: #10b981; padding: 0.2rem 0.55rem; border-radius: 4px;">
                      <i class="fa-solid fa-circle-check"></i> Đã hoàn thành
                    </span>
                  ` : ''}
                </div>
                <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a); line-height: 1.4;">
                  Ca ${idx + 1}: ${c.title}
                </h3>
              </div>
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); white-space: nowrap;">
                Ca ${idx + 1} / ${filteredCases.length}
              </span>
            </div>

            <!-- Clinical Vignette -->
            <div class="quiz-vignette">
              <strong>📋 Tình huống lâm sàng:</strong> ${c.vignette}
            </div>

            <!-- Question Prompt -->
            <p style="font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.85rem;">
              ❓ ${c.question}
            </p>

            <!-- Options List -->
            <div class="quiz-options-list" id="optGroup_${c.id}">
              ${c.options.map(opt => `
                <button class="quiz-option-btn ${isDone && opt.isCorrect ? 'correct' : ''}" data-case-id="${c.id}" data-opt-id="${opt.id}" data-correct="${opt.isCorrect}" ${isDone ? 'disabled' : ''}>
                  <span class="quiz-option-badge">${opt.id}</span>
                  <span>${opt.text}</span>
                </button>
              `).join('')}
            </div>

            <!-- Mechanism Explanation Box -->
            <div class="quiz-explanation-box ${isDone ? 'show' : ''}" id="explain_${c.id}">
              <div style="font-size: 0.95rem; font-weight: 800; color: #065f46; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fa-solid fa-diagram-project" style="color: #10b981;"></i> Phân Tích Chuỗi Suy Luận Bệnh Sinh (Cascade Reasoning)
              </div>
              <p style="font-size: 0.9rem; line-height: 1.65; color: var(--color-text, #1e293b); margin: 0 0 0.85rem;">
                ${c.cascadeExplanation}
              </p>
              
              <!-- Clinical Pearl -->
              <div style="padding: 0.75rem 1rem; border-radius: 8px; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; font-size: 0.85rem; color: var(--color-text, #1e293b); margin-bottom: 0.85rem; line-height: 1.5;">
                <strong style="color: #0284c7;"><i class="fa-solid fa-lightbulb"></i> Clinical Pearl:</strong> ${c.clinicalPearls}
              </div>

              <!-- Navigation Footer Links -->
              <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed rgba(16,185,129,0.3);">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  ${c.readArticleLink ? `
                    <a href="${c.readArticleLink}" style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.8rem; font-weight: 700; color: #0284c7; text-decoration: none; padding: 4px 10px; border-radius: 6px; background: rgba(2,132,199,0.1);">
                      <i class="fa-solid fa-book-open"></i> Đọc bài cơ chế chi tiết
                    </a>
                  ` : ''}
                  ${c.relatedModule ? `
                    <a href="${c.relatedModule}" style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.8rem; font-weight: 700; color: #8b5cf6; text-decoration: none; padding: 4px 10px; border-radius: 6px; background: rgba(139,92,246,0.1);">
                      <i class="fa-solid fa-bolt"></i> Mở mô phỏng liên quan
                    </a>
                  ` : ''}
                </div>
                
                <a href="#/docspace/soap?from_patho_case=${c.id}" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 0.825rem; font-weight: 700; color: #fff; background: var(--color-primary, #0284c7); border-radius: 6px; text-decoration: none; box-shadow: 0 2px 4px rgba(2,132,199,0.25);">
                  <i class="fa-solid fa-notes-medical"></i> Luyện tập Soạn SOAP cho ca này
                </a>
              </div>

            </div>

          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach click events
  document.querySelectorAll('.quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const caseId = btn.getAttribute('data-case-id');
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      const group = document.getElementById(`optGroup_${caseId}`);
      const explainBox = document.getElementById(`explain_${caseId}`);
      const caseCard = document.getElementById(`caseCard_${caseId}`);

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
      } else if (caseId) {
        const userStats = getStoredStats();
        if (!userStats.completedCases.includes(caseId)) {
          userStats.completedCases.push(caseId);
          userStats.score += 20;
          saveStats(userStats);
          onProgressUpdate();
          if (caseCard) caseCard.style.borderColor = 'rgba(16,185,129,0.6)';
        }
      }

      if (explainBox) {
        explainBox.classList.add('show');
      }
    });
  });
}

/**
 * ==========================================================================
 * 2. RENDER CHẾ ĐỘ FLASHCARDS GHI NHỚ QUY LUẬT (SPACED REPETITION)
 * ==========================================================================
 */
let currentCardIndex = 0;

function renderFlashcardsMode(
  container: HTMLElement,
  categoryFilter: string,
  search: string,
  onProgressUpdate: () => void
): void {
  const filteredCards = FLASHCARDS_DATA.filter(fc => {
    const matchCat = categoryFilter === 'all' || fc.categoryKey === categoryFilter;
    const matchSearch = !search ||
      fc.frontTitle.toLowerCase().includes(search) ||
      fc.frontClue.toLowerCase().includes(search) ||
      fc.backMechanism.toLowerCase().includes(search) ||
      fc.category.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (filteredCards.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; background: var(--color-surface); border-radius: 16px; border: 1px dashed var(--color-border);">
        <i class="fa-solid fa-layer-group" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem; color: var(--color-text);">Không tìm thấy thẻ Flashcard phù hợp</h3>
        <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">Vui lòng thử từ khóa khác hoặc chuyển bộ lọc sang "Tất Cả".</p>
      </div>
    `;
    return;
  }

  if (currentCardIndex >= filteredCards.length) currentCardIndex = 0;
  const card = filteredCards[currentCardIndex];
  const stats = getStoredStats();
  const isMastered = stats.masteredFlashcards.includes(card.id);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
      
      <!-- Top Progress Indicator -->
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 680px; margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #10b981; background: rgba(16,185,129,0.1); padding: 0.25rem 0.6rem; border-radius: 6px;">
            <i class="fa-solid fa-tag"></i> ${card.category}
          </span>
          ${isMastered ? `
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(245,158,11,0.15); color: #d97706; padding: 0.25rem 0.5rem; border-radius: 4px;">
              ⭐ Đã thuộc
            </span>
          ` : ''}
        </div>
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted);">
          Thẻ ${currentCardIndex + 1} / ${filteredCards.length}
        </span>
      </div>

      <!-- 3D Flip Flashcard -->
      <div class="flashcard-wrapper" id="activeFlashcard">
        <div class="flashcard-inner">
          
          <!-- Front Face -->
          <div class="flashcard-front">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 1.25rem;">
              MẶT TRƯỚC: HIỆN TƯỢNG / CÂU HỎI CƠ CHẾ
            </span>
            <h2 style="font-size: 1.45rem; font-weight: 800; margin: 0 0 1rem; color: var(--color-text, #0f172a); line-height: 1.35; max-width: 580px;">
              ${card.frontTitle}
            </h2>
            <p style="font-size: 1.05rem; line-height: 1.6; color: var(--color-text-muted, #475569); max-width: 520px; margin: 0 0 1.5rem;">
              "${card.frontClue}"
            </p>
            <span style="font-size: 0.825rem; color: #10b981; font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem; padding: 6px 12px; border-radius: 9999px; background: rgba(16,185,129,0.1);">
              <i class="fa-solid fa-arrow-rotate-right"></i> Nhấp chuột hoặc chạm để lật xem lời giải thích
            </span>
          </div>

          <!-- Back Face -->
          <div class="flashcard-back">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.15); color: #10b981; padding: 0.2rem 0.6rem; border-radius: 4px; margin-bottom: 0.75rem;">
              MẶT SAU: BẢN CHẤT PHÂN TỬ & QUY LUẬT
            </span>
            <p style="font-size: 0.925rem; line-height: 1.65; color: var(--color-text, #0f172a); text-align: left; margin: 0 0 0.85rem; width: 100%;">
              ${card.backMechanism.replace(/\n/g, '<br>')}
            </p>
            ${card.formulaOrLaw ? `
              <div style="padding: 0.5rem 0.75rem; border-radius: 6px; background: rgba(139,92,246,0.1); border: 1px solid rgba(139,92,246,0.2); font-size: 0.8rem; font-family: monospace; font-weight: 700; color: #7c3aed; text-align: left; width: 100%; margin-bottom: 0.75rem;">
                📐 ${card.formulaOrLaw}
              </div>
            ` : ''}
            <div style="padding: 0.6rem 0.9rem; border-radius: 8px; background: rgba(245,158,11,0.08); border-left: 3px solid #f59e0b; font-size: 0.825rem; text-align: left; width: 100%; color: var(--color-text, #0f172a); line-height: 1.5;">
              <strong style="color: #d97706;">💡 Điểm cốt lõi:</strong> ${card.clinicalPearl}
            </div>
          </div>

        </div>
      </div>

      <!-- Spaced Repetition Rating Buttons -->
      <div style="text-align: center; margin-bottom: 0.75rem;">
        <span style="font-size: 0.825rem; font-weight: 700; color: var(--color-text-muted);">Đánh giá mức độ ghi nhớ của bạn cho thẻ này:</span>
      </div>
      <div class="flashcard-controls">
        <button class="flashcard-rate-btn rate-hard" id="btnCardHard">
          <i class="fa-solid fa-face-frown"></i> Khó (Ôn lại)
        </button>
        <button class="flashcard-rate-btn rate-good" id="btnCardGood">
          <i class="fa-solid fa-face-smile"></i> Tốt (Nhớ tạm)
        </button>
        <button class="flashcard-rate-btn rate-easy" id="btnCardEasy">
          <i class="fa-solid fa-face-laugh-beam"></i> Dễ (Đã thuộc kỹ ⭐)
        </button>
      </div>

      <!-- Navigation Controls -->
      <div style="display: flex; gap: 1rem; margin-top: 1.25rem;">
        <button class="quiz-mode-btn" id="btnPrevCard" ${currentCardIndex === 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          <i class="fa-solid fa-arrow-left"></i> Thẻ Trước
        </button>
        <button class="quiz-mode-btn" id="btnShuffleCard">
          <i class="fa-solid fa-shuffle"></i> Ngẫu Nhiên
        </button>
        <button class="quiz-mode-btn" id="btnNextCard" ${currentCardIndex === filteredCards.length - 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
          Thẻ Tiếp Theo <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  `;

  // Attach Flip Event
  const cardEl = document.getElementById('activeFlashcard');
  cardEl?.addEventListener('click', () => {
    cardEl.classList.toggle('flipped');
  });

  // Attach Next/Prev
  function advanceCard(isMasteredAction: boolean) {
    if (isMasteredAction) {
      const userStats = getStoredStats();
      if (!userStats.masteredFlashcards.includes(card.id)) {
        userStats.masteredFlashcards.push(card.id);
        userStats.score += 10;
        saveStats(userStats);
        onProgressUpdate();
      }
    }
    if (currentCardIndex < filteredCards.length - 1) {
      currentCardIndex++;
    } else {
      currentCardIndex = 0;
    }
    renderFlashcardsMode(container, categoryFilter, search, onProgressUpdate);
  }

  document.getElementById('btnCardHard')?.addEventListener('click', () => advanceCard(false));
  document.getElementById('btnCardGood')?.addEventListener('click', () => advanceCard(false));
  document.getElementById('btnCardEasy')?.addEventListener('click', () => advanceCard(true));

  document.getElementById('btnNextCard')?.addEventListener('click', () => advanceCard(false));
  document.getElementById('btnPrevCard')?.addEventListener('click', () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      renderFlashcardsMode(container, categoryFilter, search, onProgressUpdate);
    }
  });

  document.getElementById('btnShuffleCard')?.addEventListener('click', () => {
    currentCardIndex = Math.floor(Math.random() * filteredCards.length);
    renderFlashcardsMode(container, categoryFilter, search, onProgressUpdate);
  });
}

/**
 * ==========================================================================
 * 3. RENDER CHẾ ĐỘ LẮP RÁP CHUỖI CƠ CHẾ TỪNG BƯỚC (CASCADE BUILDER)
 * ==========================================================================
 */
let activeCascadeIndex = 0;
let userPlacedSteps: (CascadeStep | null)[] = [];

function renderCascadeBuilderMode(
  container: HTMLElement,
  specialty: string,
  search: string,
  onProgressUpdate: () => void
): void {
  const filteredCascades = CASCADE_BUILDER_DATA.filter(cb => {
    const matchSpec = specialty === 'all' || cb.specialtyKey === specialty;
    const matchSearch = !search ||
      cb.title.toLowerCase().includes(search) ||
      cb.clinicalScenario.toLowerCase().includes(search) ||
      cb.fullCascadeText.toLowerCase().includes(search);
    return matchSpec && matchSearch;
  });

  if (filteredCascades.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; background: var(--color-surface); border-radius: 16px; border: 1px dashed var(--color-border);">
        <i class="fa-solid fa-code-branch" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 1rem;"></i>
        <h3 style="margin: 0 0 0.5rem; font-size: 1.15rem; color: var(--color-text);">Không tìm thấy chuỗi thử thách phù hợp</h3>
        <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted);">Vui lòng chọn bộ lọc chuyên khoa khác hoặc tìm kiếm với từ khóa khác.</p>
      </div>
    `;
    return;
  }

  if (activeCascadeIndex >= filteredCascades.length) activeCascadeIndex = 0;
  const activeCascade = filteredCascades[activeCascadeIndex];
  const totalSlots = activeCascade.orderedSteps.length;

  if (userPlacedSteps.length !== totalSlots) {
    userPlacedSteps = new Array(totalSlots).fill(null);
  }

  const stats = getStoredStats();
  const isAlreadySolved = stats.solvedCascades.includes(activeCascade.id);

  if (isAlreadySolved && userPlacedSteps.every(s => s === null)) {
    userPlacedSteps = [...activeCascade.orderedSteps];
  }

  const poolItems: CascadeStep[] = [...activeCascade.orderedSteps];
  if (activeCascade.distractorSteps) {
    activeCascade.distractorSteps.forEach((dText, dIdx) => {
      poolItems.push({
        id: `distractor_${dIdx}`,
        stepNumber: -1,
        stageName: 'Mồi nhử sai lệch',
        text: dText
      });
    });
  }

  poolItems.sort((a, b) => (a.text.length % 3) - (b.text.length % 3));

  container.innerHTML = `
    <div class="cascade-card" id="cascadeChallengeCard">
      
      <!-- Header Navigation between Cascade challenges -->
      <div class="quiz-case-header">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(139,92,246,0.1); color: #8b5cf6; padding: 0.2rem 0.55rem; border-radius: 4px;">
              <i class="fa-solid fa-code-merge"></i> ${activeCascade.specialty}
            </span>
            ${isAlreadySolved ? `
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.15); color: #10b981; padding: 0.2rem 0.55rem; border-radius: 4px;">
                ✅ Đã hoàn thành xuất sắc
              </span>
            ` : ''}
          </div>
          <h2 style="margin: 0; font-size: 1.3rem; font-weight: 800; color: var(--color-text, #0f172a);">
            ${activeCascade.title}
          </h2>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button class="quiz-mode-btn" id="btnPrevCascade" ${activeCascadeIndex === 0 ? 'disabled style="opacity:0.5;"' : ''} style="padding: 0.4rem 0.75rem; font-size: 0.8rem;">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-text-muted);">
            ${activeCascadeIndex + 1} / ${filteredCascades.length}
          </span>
          <button class="quiz-mode-btn" id="btnNextCascade" ${activeCascadeIndex === filteredCascades.length - 1 ? 'disabled style="opacity:0.5;"' : ''} style="padding: 0.4rem 0.75rem; font-size: 0.8rem;">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <!-- Challenge Goal -->
      <div class="quiz-vignette" style="background: rgba(139,92,246,0.06); border-left-color: #8b5cf6;">
        <strong>🎯 Nhiệm vụ tư duy:</strong> ${activeCascade.clinicalScenario}
      </div>

      <!-- TARGET SEQUENCE SLOTS -->
      <div style="margin: 1.25rem 0 0.5rem;">
        <span style="font-size: 0.85rem; font-weight: 800; color: var(--color-text); text-transform: uppercase; letter-spacing: 0.5px;">
          📍 Chuỗi Các Mắt Xích Bệnh Sinh (Nhấp vào ô để gỡ bỏ hoặc chọn từ kho bên dưới):
        </span>
      </div>

      <div class="cascade-slots-container" id="cascadeSlotsList">
        ${activeCascade.orderedSteps.map((step, idx) => {
          const placed = userPlacedSteps[idx];
          return `
            <div class="cascade-slot ${placed ? 'filled' : ''}" data-slot-idx="${idx}" style="cursor: ${placed ? 'pointer' : 'default'};">
              <div class="cascade-slot-num">${idx + 1}</div>
              <div class="cascade-slot-content">
                ${placed ? `
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                    <div>
                      <span class="cascade-step-tag">${placed.stageName}</span>
                      <p style="margin: 0.3rem 0 0; font-weight: 600; font-size: 0.9rem;">${placed.text}</p>
                    </div>
                    <i class="fa-solid fa-xmark" style="color: #ef4444; font-size: 1rem;" title="Bấm để gỡ bước này"></i>
                  </div>
                ` : `
                  <span class="cascade-slot-placeholder">Mắt xích ${idx + 1}: [Trống - Nhấp vào 1 sự kiện từ kho bên dưới để đặt vào đây]</span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- ACTION BUTTONS -->
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1.25rem 0;">
        <button class="quiz-mode-btn active" id="btnVerifyCascade" style="background: #10b981; border-color: #10b981;">
          <i class="fa-solid fa-circle-check"></i> Kiểm Tra Thứ Tự Chuỗi
        </button>
        <button class="quiz-mode-btn" id="btnResetCascade">
          <i class="fa-solid fa-rotate-left"></i> Đặt Lại Chuỗi
        </button>
        <button class="quiz-mode-btn" id="btnShowSolution">
          <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Xem Đáp Án Chuẩn
        </button>
      </div>

      <!-- SUCCESS BANNER -->
      <div id="cascadeResultBox" style="display: ${isAlreadySolved ? 'block' : 'none'};">
        <div class="cascade-success-banner">
          <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.1rem; font-weight: 800; color: #065f46; margin-bottom: 0.5rem;">
            <i class="fa-solid fa-award" style="font-size: 1.35rem; color: #10b981;"></i>
            CHÚC MỪNG! BẠN ĐÃ LẮP RÁP CHÍNH XÁC CHUỖI CƠ CHẾ BỆNH SINH
          </div>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text, #0f172a); margin: 0 0 0.75rem;">
            <strong>Tóm tắt chuỗi logic:</strong> ${activeCascade.fullCascadeText}
          </p>
          <div style="padding: 0.65rem 0.9rem; border-radius: 8px; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; font-size: 0.85rem; color: var(--color-text, #0f172a);">
            <strong style="color: #0284c7;">💡 Điểm cốt lõi:</strong> ${activeCascade.clinicalPearl}
          </div>
        </div>
      </div>

      <!-- CANDIDATE POOL -->
      <div class="cascade-pool-container">
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">
          📦 Kho Các Mắt Xích Sự Kiện (Nhấp để đưa vào ô trống tiếp theo):
        </div>
        ${poolItems.map((item, pIdx) => {
          const isUsed = userPlacedSteps.some(s => s && s.text === item.text);
          return `
            <div class="cascade-pool-item ${isUsed ? 'used' : ''}" data-pool-idx="${pIdx}">
              <div style="display: flex; align-items: center; gap: 0.65rem;">
                <i class="fa-solid fa-cube" style="color: #0284c7; font-size: 0.85rem;"></i>
                <span style="font-weight: 500;">${item.text}</span>
              </div>
              <span class="cascade-step-tag" style="background: rgba(2,132,199,0.08); color: #0284c7;">
                ${item.stageName}
              </span>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  // Attach Slot click (Remove item)
  document.querySelectorAll('.cascade-slot.filled').forEach(slotEl => {
    slotEl.addEventListener('click', () => {
      const slotIdx = parseInt(slotEl.getAttribute('data-slot-idx') || '-1', 10);
      if (slotIdx >= 0) {
        userPlacedSteps[slotIdx] = null;
        renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
      }
    });
  });

  // Attach Pool Item click
  document.querySelectorAll('.cascade-pool-item:not(.used)').forEach(poolEl => {
    poolEl.addEventListener('click', () => {
      const pIdx = parseInt(poolEl.getAttribute('data-pool-idx') || '-1', 10);
      if (pIdx >= 0) {
        const item = poolItems[pIdx];
        const firstEmptySlot = userPlacedSteps.findIndex(s => s === null);
        if (firstEmptySlot !== -1) {
          userPlacedSteps[firstEmptySlot] = item;
          renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
        } else {
          alert('Tất cả các vị trí đã đầy! Hãy nhấp vào một ô phía trên để gỡ bỏ trước khi chọn mắt xích khác.');
        }
      }
    });
  });

  // Attach Verify Button
  document.getElementById('btnVerifyCascade')?.addEventListener('click', () => {
    if (userPlacedSteps.some(s => s === null)) {
      alert('Vui lòng xếp đầy đủ tất cả các mắt xích trước khi kiểm tra!');
      return;
    }

    let isAllCorrect = true;
    const slots = document.querySelectorAll('.cascade-slot');

    userPlacedSteps.forEach((placed, idx) => {
      const target = activeCascade.orderedSteps[idx];
      const slotEl = slots[idx] as HTMLElement | null;

      if (!placed || placed.text !== target.text) {
        isAllCorrect = false;
        if (slotEl) {
          slotEl.classList.add('error');
          slotEl.classList.remove('filled');
        }
      } else {
        if (slotEl) {
          slotEl.classList.remove('error');
          slotEl.classList.add('filled');
        }
      }
    });

    const resultBox = document.getElementById('cascadeResultBox');
    if (isAllCorrect) {
      const userStats = getStoredStats();
      if (!userStats.solvedCascades.includes(activeCascade.id)) {
        userStats.solvedCascades.push(activeCascade.id);
        userStats.score += 30;
        saveStats(userStats);
        onProgressUpdate();
      }
      if (resultBox) resultBox.style.display = 'block';
    } else {
      if (resultBox) resultBox.style.display = 'none';
      alert('Thứ tự chuỗi chưa chính xác ở một số mắt xích (được đánh dấu đỏ). Hãy kiểm tra lại logic quan hệ nhân - quả!');
    }
  });

  document.getElementById('btnResetCascade')?.addEventListener('click', () => {
    userPlacedSteps = new Array(totalSlots).fill(null);
    renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
  });

  document.getElementById('btnShowSolution')?.addEventListener('click', () => {
    userPlacedSteps = [...activeCascade.orderedSteps];
    renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
  });

  document.getElementById('btnNextCascade')?.addEventListener('click', () => {
    if (activeCascadeIndex < filteredCascades.length - 1) {
      activeCascadeIndex++;
      userPlacedSteps = [];
      renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
    }
  });

  document.getElementById('btnPrevCascade')?.addEventListener('click', () => {
    if (activeCascadeIndex > 0) {
      activeCascadeIndex--;
      userPlacedSteps = [];
      renderCascadeBuilderMode(container, specialty, search, onProgressUpdate);
    }
  });
}

/**
 * ==========================================================================
 * 4. RENDER CHẾ ĐỘ TRÌNH TẠO ĐỀ THI & ÔN TẬP TỰ ĐỘNG (EXAM GENERATOR STUDIO)
 * ==========================================================================
 */

let activeExamSession: {
  exam: GeneratedExam;
  currentQuestionIdx: number;
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  flaggedQuestions: string[];
  startTime: number;
  timerInterval: any;
  remainingSeconds: number;
  isSubmitted: boolean;
  evaluationResult: ExamEvaluationResult | null;
} | null = null;

function renderExamGeneratorStudio(container: HTMLElement, onProgressUpdate: () => void): void {
  // If an exam is currently active, render the Workspace or Result
  if (activeExamSession) {
    if (activeExamSession.isSubmitted && activeExamSession.evaluationResult) {
      renderExamReportScreen(container, onProgressUpdate);
    } else {
      renderActiveExamWorkspace(container, onProgressUpdate);
    }
    return;
  }

  // Otherwise, render the Configurator Studio screen
  renderExamConfiguratorScreen(container, onProgressUpdate);
}

/**
 * 4.1. MÀN HÌNH CẤU HÌNH ĐỀ THI (EXAM CONFIGURATOR)
 */
function renderExamConfiguratorScreen(container: HTMLElement, onProgressUpdate: () => void): void {
  container.innerHTML = `
    <div class="exam-config-card">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">
            <i class="fa-solid fa-microchip"></i> Medical Blueprint Engine
          </div>
          <h2 style="margin: 0.4rem 0 0; font-size: 1.45rem; font-weight: 800; color: var(--color-text, #0f172a);">
            ⚙️ TRÌNH TẠO ĐỀ THI & ÔN TẬP Y KHOA TÙY BIẾN
          </h2>
          <p style="margin: 0.25rem 0 0; font-size: 0.875rem; color: var(--color-text-muted);">
            Lấy nguồn câu hỏi tự động từ <strong>80+ bài viết trong Knowledge Vault</strong> (Hóa sinh 7 Khối & Giải phẫu Sinh lý 9 Hệ).
          </p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #10b981;">
            Ngân hàng sẵn có: <strong>${EXAM_QUESTION_BANK.length} câu hỏi</strong>
          </span>
        </div>
      </div>

      <!-- SECTION 1: CHỌN NGUỒN TÀI LIỆU -->
      <div class="exam-config-section">
        <div class="exam-section-title">
          <i class="fa-solid fa-books" style="color: #0284c7;"></i> 1. Chọn Nguồn Tài Liệu Kiến Thức
        </div>
        <div class="exam-checkbox-grid">
          <label class="exam-checkbox-item checked" id="lblSrcBiochem">
            <input type="checkbox" name="exam_src" value="biochem" checked style="accent-color: #10b981;">
            <span>🧪 0. Hóa sinh y học (7 Khối)</span>
          </label>
          <label class="exam-checkbox-item checked" id="lblSrcPhysio">
            <input type="checkbox" name="exam_src" value="physiology" checked style="accent-color: #10b981;">
            <span>🧬 0. Giải phẫu & Sinh lý (9 Hệ)</span>
          </label>
          <label class="exam-checkbox-item" style="opacity: 0.6; cursor: not-allowed;" title="Kho Sinh lý bệnh đang được biên soạn">
            <input type="checkbox" disabled>
            <span>🔬 Sinh lý bệnh lâm sàng (Sắp ra mắt)</span>
          </label>
        </div>
      </div>

      <!-- SECTION 2: CHỌN CHUYÊN ĐỀ CỤ THỂ (OPTIONAL) -->
      <div class="exam-config-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div class="exam-section-title" style="margin-bottom: 0;">
            <i class="fa-solid fa-list-check" style="color: #8b5cf6;"></i> 2. Chọn Khối & Hệ Cơ Quan Cụ Thể
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button type="button" id="btnSelectAllTopics" style="background: none; border: none; color: #0284c7; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
              Chọn tất cả
            </button>
            <span style="color: var(--color-border);">|</span>
            <button type="button" id="btnClearAllTopics" style="background: none; border: none; color: var(--color-text-muted); font-size: 0.8rem; font-weight: 600; cursor: pointer;">
              Bỏ chọn
            </button>
          </div>
        </div>
        <div class="exam-checkbox-grid" id="examTopicsGrid" style="max-height: 200px; overflow-y: auto; padding-right: 0.5rem;">
          ${TOPIC_METADATA_LIST.map(topic => `
            <label class="exam-checkbox-item checked">
              <input type="checkbox" name="exam_topic" value="${topic.key}" checked style="accent-color: #10b981;">
              <span style="font-size: 0.8rem;"><i class="fa-solid ${topic.icon}" style="color:#0284c7; width:16px;"></i> ${topic.name}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 3: SỐ LƯỢNG CÂU & ĐỘ KHÓ -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-bottom: 1.25rem;">
        
        <!-- SỐ LƯỢNG CÂU HỎI -->
        <div class="exam-config-section" style="margin-bottom: 0;">
          <div class="exam-section-title">
            <i class="fa-solid fa-calculator" style="color: #f59e0b;"></i> 3. Số Lượng Câu Hỏi
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${[10, 20, 30, 40].map(cnt => `
              <label class="exam-checkbox-item ${cnt === 20 ? 'checked' : ''}" style="flex: 1; text-align: center; justify-content: center;">
                <input type="radio" name="exam_count" value="${cnt}" ${cnt === 20 ? 'checked' : ''} style="display: none;">
                <span>${cnt} Câu</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- PHÂN PHỐI ĐỘ KHÓ -->
        <div class="exam-config-section" style="margin-bottom: 0;">
          <div class="exam-section-title">
            <i class="fa-solid fa-chart-simple" style="color: #ef4444;"></i> 4. Phân Bổ Độ Khó
          </div>
          <select id="examDifficultySelect" style="width: 100%; padding: 0.65rem 0.85rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); font-family: inherit; font-size: 0.875rem; font-weight: 600; outline: none;">
            <option value="balanced" selected>Ma trận Chuẩn EBM (30% Dễ - 50% Vừa - 20% Khó)</option>
            <option value="all">Ngẫu Nhiên Toàn Bộ (All Levels)</option>
            <option value="easy">Cơ Bản / Trực Nhớ (Recall Only)</option>
            <option value="medium">Trung Cấp / Cơ Chế Phân Tử</option>
            <option value="hard">Nâng Cao / Biện Luận Lâm Sàng</option>
          </select>
        </div>

      </div>

      <!-- SECTION 4: CHẾ ĐỘ THI & THỜI GIAN -->
      <div class="exam-config-section">
        <div class="exam-section-title">
          <i class="fa-solid fa-clock" style="color: #10b981;"></i> 5. Chế Độ Luyện Tập & Làm Bài
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
          
          <label class="exam-checkbox-item checked" id="lblModeExam" style="flex-direction: column; align-items: flex-start; padding: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <input type="radio" name="exam_mode" value="exam" checked style="accent-color: #10b981;">
              <strong>⏱️ Chế Độ Thi Thử Tính Giờ (Timed Exam)</strong>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted); font-weight: normal;">
              Có đồng hồ đếm ngược (75s/câu), ẩn giải thích cho tới khi nộp bài thi để chấm điểm xếp loại.
            </p>
          </label>

          <label class="exam-checkbox-item" id="lblModeTutor" style="flex-direction: column; align-items: flex-start; padding: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <input type="radio" name="exam_mode" value="tutor" style="accent-color: #10b981;">
              <strong>🎓 Chế Độ Ôn Tập Có Giải Thích (Tutor Mode)</strong>
            </div>
            <p style="margin: 0; font-size: 0.8rem; color: var(--color-text-muted); font-weight: normal;">
              Làm từng câu, biết ngay đáp án đúng/sai kèm trích dẫn tài liệu .md và phân tích cơ chế chi tiết.
            </p>
          </label>

        </div>
      </div>

      <!-- LAUNCH BUTTON -->
      <div style="display: flex; justify-content: center; margin-top: 1.5rem;">
        <button class="quiz-mode-btn active" id="btnLaunchExam" style="background: linear-gradient(135deg, #10b981 0%, #0284c7 100%); border: none; padding: 0.85rem 2.5rem; font-size: 1.05rem; font-weight: 800; box-shadow: 0 4px 15px rgba(16,185,129,0.3); letter-spacing: 0.5px;">
          <i class="fa-solid fa-play"></i> SINH ĐỀ & BẮT ĐẦU LÀM BÀI
        </button>
      </div>

    </div>
  `;

  // Checkbox Visual Toggles
  container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', () => {
      const parent = chk.closest('.exam-checkbox-item');
      if (parent) {
        if ((chk as HTMLInputElement).checked) parent.classList.add('checked');
        else parent.classList.remove('checked');
      }
    });
  });

  // Radio Visual Toggles for Count
  container.querySelectorAll('input[name="exam_count"]').forEach(rad => {
    rad.addEventListener('change', () => {
      container.querySelectorAll('input[name="exam_count"]').forEach(r => {
        r.closest('.exam-checkbox-item')?.classList.remove('checked');
      });
      rad.closest('.exam-checkbox-item')?.classList.add('checked');
    });
  });

  // Radio Visual Toggles for Mode
  container.querySelectorAll('input[name="exam_mode"]').forEach(rad => {
    rad.addEventListener('change', () => {
      container.querySelectorAll('input[name="exam_mode"]').forEach(r => {
        r.closest('.exam-checkbox-item')?.classList.remove('checked');
      });
      rad.closest('.exam-checkbox-item')?.classList.add('checked');
    });
  });

  // Select All / Clear Topics
  document.getElementById('btnSelectAllTopics')?.addEventListener('click', () => {
    container.querySelectorAll('input[name="exam_topic"]').forEach(chk => {
      (chk as HTMLInputElement).checked = true;
      chk.closest('.exam-checkbox-item')?.classList.add('checked');
    });
  });

  document.getElementById('btnClearAllTopics')?.addEventListener('click', () => {
    container.querySelectorAll('input[name="exam_topic"]').forEach(chk => {
      (chk as HTMLInputElement).checked = false;
      chk.closest('.exam-checkbox-item')?.classList.remove('checked');
    });
  });

  // Launch Exam Event
  document.getElementById('btnLaunchExam')?.addEventListener('click', () => {
    const selectedSrcInputs = container.querySelectorAll('input[name="exam_src"]:checked');
    const sourceSubjects: ('biochem' | 'physiology' | 'patho')[] = Array.from(selectedSrcInputs).map(
      el => (el as HTMLInputElement).value as any
    );

    if (sourceSubjects.length === 0) {
      alert('Vui lòng chọn ít nhất 1 nguồn tài liệu (Hóa sinh hoặc Sinh lý)!');
      return;
    }

    const selectedTopicInputs = container.querySelectorAll('input[name="exam_topic"]:checked');
    const selectedTopics: string[] = Array.from(selectedTopicInputs).map(el => (el as HTMLInputElement).value);

    const countInput = container.querySelector('input[name="exam_count"]:checked') as HTMLInputElement | null;
    const questionCount = countInput ? parseInt(countInput.value, 10) : 20;

    const diffSelect = document.getElementById('examDifficultySelect') as HTMLSelectElement | null;
    const difficultyLevel = (diffSelect ? diffSelect.value : 'balanced') as any;

    const modeInput = container.querySelector('input[name="exam_mode"]:checked') as HTMLInputElement | null;
    const mode = (modeInput ? modeInput.value : 'exam') as 'exam' | 'tutor';

    const timeLimitMinutes = Math.round((questionCount * 75) / 60);

    const config: ExamConfig = {
      sourceSubjects,
      selectedTopics: selectedTopics.length === TOPIC_METADATA_LIST.length ? ['all'] : selectedTopics,
      questionCount,
      difficultyLevel,
      mode,
      timeLimitMinutes
    };

    // Run Exam Generator Algorithm
    const generatedExam = generateCustomExam(config);

    if (generatedExam.questions.length === 0) {
      alert('Không tìm thấy câu hỏi phù hợp với cấu hình đã chọn. Vui lòng chọn lại các chuyên đề!');
      return;
    }

    // Initialize Active Exam Session
    const initialAnswers: Record<string, 'A' | 'B' | 'C' | 'D' | null> = {};
    generatedExam.questions.forEach(q => { initialAnswers[q.id] = null; });

    activeExamSession = {
      exam: generatedExam,
      currentQuestionIdx: 0,
      userAnswers: initialAnswers,
      flaggedQuestions: [],
      startTime: Date.now(),
      timerInterval: null,
      remainingSeconds: config.timeLimitMinutes * 60,
      isSubmitted: false,
      evaluationResult: null
    };

    renderExamGeneratorStudio(container, onProgressUpdate);
  });
}

/**
 * 4.2. MÀN HÌNH LÀM BÀI THI (EXAM WORKSPACE)
 */
function renderActiveExamWorkspace(container: HTMLElement, onProgressUpdate: () => void): void {
  if (!activeExamSession) return;

  const session = activeExamSession;
  const exam = session.exam;
  const currentIdx = session.currentQuestionIdx;
  const currentQ = exam.questions[currentIdx];
  const userAns = session.userAnswers[currentQ.id];
  const isFlagged = session.flaggedQuestions.includes(currentQ.id);

  // Setup Timer if in Timed Exam mode
  if (exam.config.mode === 'exam' && !session.timerInterval) {
    session.timerInterval = setInterval(() => {
      if (session.remainingSeconds > 0) {
        session.remainingSeconds--;
        const timerValEl = document.getElementById('examTimerVal');
        if (timerValEl) {
          const mins = Math.floor(session.remainingSeconds / 60);
          const secs = session.remainingSeconds % 60;
          timerValEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
          if (session.remainingSeconds < 120) {
            timerValEl.style.color = '#dc2626';
          }
        }
      } else {
        clearInterval(session.timerInterval);
        submitActiveExam(container, onProgressUpdate);
      }
    }, 1000);
  }

  const mins = Math.floor(session.remainingSeconds / 60);
  const secs = session.remainingSeconds % 60;
  const timerDisplay = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  container.innerHTML = `
    <div class="exam-layout">
      
      <!-- MAIN QUESTION WORKSPACE -->
      <div class="exam-workspace-card">
        
        <!-- Question Top Bar -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--color-border); padding-bottom: 0.75rem; margin-bottom: 1rem; gap: 0.75rem; flex-wrap: wrap;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.2rem 0.55rem; border-radius: 4px;">
                ${currentQ.subject}
              </span>
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(139,92,246,0.1); color: #8b5cf6; padding: 0.2rem 0.55rem; border-radius: 4px;">
                ${currentQ.topicName}
              </span>
              <span style="font-size: 0.75rem; font-weight: 700; background: rgba(16,185,129,0.1); color: #10b981; padding: 0.2rem 0.55rem; border-radius: 4px;">
                ${currentQ.difficulty}
              </span>
            </div>
            <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">
              Câu Hỏi ${currentIdx + 1} / ${exam.totalQuestions}
            </h3>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button class="quiz-mode-btn" id="btnToggleFlag" style="font-size: 0.8rem; padding: 0.4rem 0.75rem; ${isFlagged ? 'background: rgba(245,158,11,0.15); border-color: #f59e0b; color: #d97706;' : ''}">
              <i class="fa-solid fa-flag"></i> ${isFlagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
            </button>
          </div>
        </div>

        <!-- Question Prompt -->
        <p style="font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1.25rem; line-height: 1.6;">
          ${currentQ.question}
        </p>

        <!-- Options List -->
        <div class="quiz-options-list" id="activeExamOptList">
          ${currentQ.options.map(opt => {
            const isSelected = userAns === opt.id;
            let optClass = '';
            if (isSelected) optClass = 'correct'; // highlight selected

            // If Tutor mode and answered: show actual correctness
            if (exam.config.mode === 'tutor' && userAns !== null) {
              if (opt.id === currentQ.correctKey) optClass = 'correct';
              else if (isSelected && opt.id !== currentQ.correctKey) optClass = 'incorrect';
            }

            return `
              <button class="quiz-option-btn ${optClass}" data-opt-id="${opt.id}" ${exam.config.mode === 'tutor' && userAns !== null ? 'disabled' : ''}>
                <span class="quiz-option-badge">${opt.id}</span>
                <span>${opt.text}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Tutor Mode Instant Explanation Box -->
        ${exam.config.mode === 'tutor' && userAns !== null ? `
          <div class="quiz-explanation-box show" style="margin-top: 1rem;">
            <div style="font-size: 0.95rem; font-weight: 800; color: #065f46; margin-bottom: 0.5rem;">
              <i class="fa-solid fa-circle-info"></i> Giải Thích Chi Tiết & Nền Tảng Cơ Chế
            </div>
            <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text, #1e293b); margin: 0 0 0.75rem;">
              ${currentQ.explanation}
            </p>
            <div style="padding: 0.65rem 0.9rem; border-radius: 8px; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; font-size: 0.85rem; color: var(--color-text, #1e293b); margin-bottom: 0.5rem;">
              <strong style="color: #0284c7;">💡 Clinical Pearl:</strong> ${currentQ.clinicalPearl}
            </div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted);">
              📄 Trích dẫn nguồn: <code>${currentQ.sourceFile}</code>
            </div>
          </div>
        ` : ''}

        <!-- Bottom Navigation Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-border); flex-wrap: wrap; gap: 0.5rem;">
          <button class="quiz-mode-btn" id="btnExamPrevQ" ${currentIdx === 0 ? 'disabled style="opacity:0.5;"' : ''}>
            <i class="fa-solid fa-arrow-left"></i> Câu Trước
          </button>
          
          <button class="quiz-mode-btn active" id="btnExamNextQ" style="background: #0284c7; border-color: #0284c7;">
            ${currentIdx === exam.totalQuestions - 1 ? 'Xem lại toàn bộ đề <i class="fa-solid fa-list-check"></i>' : 'Câu Tiếp Theo <i class="fa-solid fa-arrow-right"></i>'}
          </button>
        </div>

      </div>

      <!-- RIGHT SIDEBAR (QUESTION PALETTE & TIMER) -->
      <div class="exam-palette-card">
        
        ${exam.config.mode === 'exam' ? `
          <div class="exam-timer-box">
            <span style="font-size: 0.85rem; font-weight: 700; color: #dc2626;">
              <i class="fa-solid fa-stopwatch"></i> THỜI GIAN CÒN:
            </span>
            <span class="exam-timer-val" id="examTimerVal">${timerDisplay}</span>
          </div>
        ` : `
          <div style="padding: 0.6rem 0.85rem; border-radius: 8px; background: rgba(16,185,129,0.1); color: #065f46; font-size: 0.825rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">
            🎓 Chế độ Ôn tập Tự do (Tutor Mode)
          </div>
        `}

        <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem;">
          📋 Danh Sách Câu Hỏi:
        </div>

        <div class="exam-palette-grid">
          ${exam.questions.map((q, idx) => {
            const isAnswered = session.userAnswers[q.id] !== null;
            const isCur = idx === currentIdx;
            const isFlag = session.flaggedQuestions.includes(q.id);

            let classes = 'exam-palette-btn';
            if (isCur) classes += ' current';
            if (isAnswered) classes += ' answered';
            if (isFlag) classes += ' flagged';

            return `
              <button class="${classes}" data-jump-idx="${idx}">
                ${idx + 1}
              </button>
            `;
          }).join('')}
        </div>

        <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--color-border);">
          <button class="quiz-mode-btn active" id="btnSubmitExamNow" style="width: 100%; justify-content: center; background: #dc2626; border-color: #dc2626; padding: 0.75rem 1rem;">
            <i class="fa-solid fa-flag-checkered"></i> NỘP BÀI THI
          </button>
          <button class="quiz-mode-btn" id="btnCancelExam" style="width: 100%; justify-content: center; margin-top: 0.5rem; font-size: 0.8rem;">
            Hủy đề thi & Quay lại
          </button>
        </div>

      </div>

    </div>
  `;

  // Attach Option Click
  container.querySelectorAll('#activeExamOptList .quiz-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const optId = btn.getAttribute('data-opt-id') as 'A' | 'B' | 'C' | 'D';
      session.userAnswers[currentQ.id] = optId;
      renderActiveExamWorkspace(container, onProgressUpdate);
    });
  });

  // Attach Toggle Flag
  document.getElementById('btnToggleFlag')?.addEventListener('click', () => {
    const qId = currentQ.id;
    if (session.flaggedQuestions.includes(qId)) {
      session.flaggedQuestions = session.flaggedQuestions.filter(id => id !== qId);
    } else {
      session.flaggedQuestions.push(qId);
    }
    renderActiveExamWorkspace(container, onProgressUpdate);
  });

  // Navigation
  document.getElementById('btnExamPrevQ')?.addEventListener('click', () => {
    if (session.currentQuestionIdx > 0) {
      session.currentQuestionIdx--;
      renderActiveExamWorkspace(container, onProgressUpdate);
    }
  });

  document.getElementById('btnExamNextQ')?.addEventListener('click', () => {
    if (session.currentQuestionIdx < exam.totalQuestions - 1) {
      session.currentQuestionIdx++;
    }
    renderActiveExamWorkspace(container, onProgressUpdate);
  });

  // Palette Jump
  container.querySelectorAll('.exam-palette-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jumpIdx = parseInt(btn.getAttribute('data-jump-idx') || '0', 10);
      session.currentQuestionIdx = jumpIdx;
      renderActiveExamWorkspace(container, onProgressUpdate);
    });
  });

  // Submit Exam
  document.getElementById('btnSubmitExamNow')?.addEventListener('click', () => {
    const unansweredCount = exam.questions.filter(q => session.userAnswers[q.id] === null).length;
    if (unansweredCount > 0) {
      if (!confirm(`Bạn còn ${unansweredCount} câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay không?`)) {
        return;
      }
    }
    submitActiveExam(container, onProgressUpdate);
  });

  // Cancel Exam
  document.getElementById('btnCancelExam')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn thoát khỏi bài thi này không? Tiến độ hiện tại sẽ bị hủy.')) {
      if (session.timerInterval) clearInterval(session.timerInterval);
      activeExamSession = null;
      renderExamGeneratorStudio(container, onProgressUpdate);
    }
  });
}

function submitActiveExam(container: HTMLElement, onProgressUpdate: () => void): void {
  if (!activeExamSession) return;
  const session = activeExamSession;
  if (session.timerInterval) clearInterval(session.timerInterval);

  const timeSpentSeconds = Math.round((Date.now() - session.startTime) / 1000);
  const evaluationResult = evaluateExamSubmission(session.exam, session.userAnswers, timeSpentSeconds);

  session.isSubmitted = true;
  session.evaluationResult = evaluationResult;

  // Update Mastery Stats
  const userStats = getStoredStats();
  userStats.completedExams++;
  userStats.score += Math.round(evaluationResult.scorePercentage / 2);
  saveStats(userStats);
  onProgressUpdate();

  renderExamReportScreen(container, onProgressUpdate);
}

/**
 * 4.3. MÀN HÌNH BÁO CÁO KẾT QUẢ & PHÂN TÍCH NĂNG LỰC (SCORE REPORT)
 */
function renderExamReportScreen(container: HTMLElement, onProgressUpdate: () => void): void {
  if (!activeExamSession || !activeExamSession.evaluationResult) return;

  const res = activeExamSession.evaluationResult;
  const minsSpent = Math.floor(res.timeSpentSeconds / 60);
  const secsSpent = res.timeSpentSeconds % 60;

  let scoreColor = '#10b981';
  if (res.scorePercentage < 70) scoreColor = '#ef4444';
  else if (res.scorePercentage < 85) scoreColor = '#0284c7';

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      
      <!-- SCORE CARD -->
      <div class="exam-report-card">
        <span style="font-size: 0.85rem; font-weight: 700; background: rgba(2,132,199,0.1); color: #0284c7; padding: 0.25rem 0.75rem; border-radius: 9999px; text-transform: uppercase;">
          Báo Cáo Kết Quả Đề Thi Y Khoa
        </span>
        <h2 style="margin: 0.75rem 0 0.25rem; font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a);">
          ${res.gradeTitle}
        </h2>
        <p style="margin: 0 0 1rem; font-size: 0.925rem; color: var(--color-text-muted);">
          ${res.feedbackMessage}
        </p>

        <!-- Score Badge -->
        <div class="exam-score-badge" style="border-color: ${scoreColor};">
          <span class="exam-score-num" style="color: ${scoreColor};">${res.scorePercentage}%</span>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted);">${res.correctCount}/${res.totalQuestions} Câu Đúng</span>
        </div>

        <!-- Metric Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; max-width: 600px; margin: 1rem auto 1.5rem;">
          <div style="background: rgba(16,185,129,0.08); padding: 0.75rem; border-radius: 10px;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #10b981;">${res.correctCount}</div>
            <div style="font-size: 0.75rem; font-weight: 600; color: #065f46;">Số Câu Đúng</div>
          </div>
          <div style="background: rgba(239,68,68,0.08); padding: 0.75rem; border-radius: 10px;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #ef4444;">${res.incorrectCount}</div>
            <div style="font-size: 0.75rem; font-weight: 600; color: #991b1b;">Số Câu Sai</div>
          </div>
          <div style="background: rgba(100,116,139,0.08); padding: 0.75rem; border-radius: 10px;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #64748b;">${res.unansweredCount}</div>
            <div style="font-size: 0.75rem; font-weight: 600; color: #475569;">Bỏ Qua</div>
          </div>
          <div style="background: rgba(2,132,199,0.08); padding: 0.75rem; border-radius: 10px;">
            <div style="font-size: 1.25rem; font-weight: 800; color: #0284c7;">${minsSpent}m ${secsSpent}s</div>
            <div style="font-size: 0.75rem; font-weight: 600; color: #0369a1;">Thời Gian Làm</div>
          </div>
        </div>

        <!-- TOPIC BREAKDOWN BARS -->
        <div style="max-width: 680px; margin: 1.5rem auto 0; text-align: left;">
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--color-text); margin-bottom: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">
            📊 Phân Tích Năng Lực Theo Khối Kiến Thức:
          </div>
          ${res.topicBreakdown.map(tb => `
            <div class="exam-topic-bar-row">
              <div style="width: 220px; font-size: 0.825rem; font-weight: 600; color: var(--color-text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${tb.topicName}
              </div>
              <div class="exam-topic-bar-track">
                <div class="exam-topic-bar-fill" style="width: ${tb.percentage}%; background: ${tb.percentage >= 70 ? '#10b981' : '#f59e0b'};"></div>
              </div>
              <div style="width: 70px; text-align: right; font-size: 0.825rem; font-weight: 800; color: var(--color-text);">
                ${tb.correct}/${tb.total} (${tb.percentage}%)
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Actions -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
          <button class="quiz-mode-btn active" id="btnCreateNewExam" style="background: #10b981; border-color: #10b981; padding: 0.75rem 1.5rem;">
            <i class="fa-solid fa-plus"></i> Tạo Đề Thi Mới
          </button>
        </div>

      </div>

      <!-- DETAILED QUESTION REVIEW LIST -->
      <div style="margin-top: 1rem;">
        <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-text); margin-bottom: 1rem;">
          📖 Xem Lại Chi Tiết Từng Câu Hỏi & Lời Giải:
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          ${res.detailedQuestions.map((dq, qIdx) => `
            <div class="quiz-case-card" style="border-color: ${dq.isCorrect ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)'};">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 700; background: ${dq.isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}; color: ${dq.isCorrect ? '#10b981' : '#ef4444'}; padding: 0.2rem 0.6rem; border-radius: 4px;">
                    ${dq.isCorrect ? '✅ Trả lời Đúng' : (dq.userAnswer ? '❌ Trả lời Sai' : '⚪ Chưa trả lời')}
                  </span>
                  <span style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted);">
                    ${dq.question.topicName}
                  </span>
                </div>
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted);">
                  Câu ${qIdx + 1}
                </span>
              </div>

              <p style="font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.85rem;">
                ${dq.question.question}
              </p>

              <div class="quiz-options-list" style="margin-bottom: 0.85rem;">
                ${dq.question.options.map(opt => {
                  let optClass = '';
                  if (opt.id === dq.question.correctKey) optClass = 'correct';
                  else if (dq.userAnswer === opt.id && !dq.isCorrect) optClass = 'incorrect';

                  return `
                    <div class="quiz-option-btn ${optClass}" style="cursor: default;">
                      <span class="quiz-option-badge">${opt.id}</span>
                      <span>${opt.text}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <div class="quiz-explanation-box show">
                <div style="font-size: 0.875rem; font-weight: 800; color: #065f46; margin-bottom: 0.4rem;">
                  <i class="fa-solid fa-lightbulb"></i> Phân Tích Cơ Chế Chi Tiết:
                </div>
                <p style="font-size: 0.875rem; line-height: 1.6; color: var(--color-text, #1e293b); margin: 0 0 0.65rem;">
                  ${dq.question.explanation}
                </p>
                <div style="padding: 0.5rem 0.75rem; border-radius: 6px; background: rgba(2,132,199,0.08); border-left: 3px solid #0284c7; font-size: 0.825rem; color: var(--color-text, #1e293b); margin-bottom: 0.4rem;">
                  <strong style="color: #0284c7;">💡 Clinical Pearl:</strong> ${dq.question.clinicalPearl}
                </div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">
                  📄 Nguồn tài liệu: <code>${dq.question.sourceFile}</code>
                </div>
              </div>

            </div>
          `).join('')}
        </div>

      </div>

    </div>
  `;

  document.getElementById('btnCreateNewExam')?.addEventListener('click', () => {
    activeExamSession = null;
    renderExamConfiguratorScreen(container, onProgressUpdate);
  });
}
