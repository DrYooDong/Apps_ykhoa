/**
 * CliniPortal — Medical Spaced-Repetition Flashcards & Daily Shift Challenge Engine
 * Thuật toán SuperMemo SM-2 chuẩn hóa:
 * - Interval I(1) = 1 day, I(2) = 6 days, I(n) = I(n-1) * EF
 * - Easiness Factor EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * - Tương thích 100% Dark Mode & 3D CSS Card Flip
 */

import { MedicalFlashcard, FlashcardReviewState } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// 1. NGÂN HÀNG THẺ FLASHCARD LÂM SÀNG CỐT LÕI (HIGH-YIELD CLINICAL PEARLS)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_MEDICAL_FLASHCARDS: MedicalFlashcard[] = [
  // ═══ TIM MẠCH & CẤP CỨU ═══
  {
    id: 'fc_stemi_nitro',
    specialty: 'Tim mạch & Cấp cứu',
    category: 'danger',
    frontQuestion: 'Vì sao chống chỉ định dùng Nitroglycerin ở bệnh nhân Nhồi máu cơ tim thất phải (hoặc NMCT thành dưới có biến chứng thất phải)?',
    backAnswer: 'NMCT thất phải làm suy giảm co bóp tống máu thất phải sang phổi, phụ thuộc hoàn toàn vào TIỀN TẢI (preload). Nitroglycerin gây giãn tĩnh mạch mạnh làm tụt tiền tải, dẫn đến tụt huyết áp nghiêm trọng và sốc tim.',
    clinicalContext: 'Xử trí đúng: Bù dịch NaCl 0.9% đường tĩnh mạch để nâng tiền tải, tránh dùng Nitrat và Morphin.',
    sourceArticleTitle: 'Hội chứng vành cấp STEMI',
    difficulty: 'medium'
  },
  {
    id: 'fc_curb65_score',
    specialty: 'Hô hấp & Cấp cứu',
    category: 'diagnosis',
    frontQuestion: 'Thang điểm CURB-65 gồm 5 tiêu chí nào và điểm số bao nhiêu thì có chỉ định nhập viện điều trị?',
    backAnswer: 'C: Confusion (Lú lẫn) | U: Urea > 7 mmol/L (BUN > 19 mg/dL) | R: Respiratory rate ≥ 30 lần/phút | B: Blood pressure (HA tâm thu < 90 hoặc tâm trương ≤ 60) | 65: Tuổi ≥ 65.\n\n→ 0-1 điểm: Ngoại trú | ≥ 2 điểm: Nhập viện khoa nội | 3-5 điểm: Cân nhắc ICU.',
    clinicalContext: 'Mỗi tiêu chuẩn thỏa tính 1 điểm. Định lượng Urea máu khẩn khi đánh giá.',
    sourceArticleTitle: 'CURB-65 Viêm phổi cộng đồng',
    difficulty: 'easy'
  },
  {
    id: 'fc_vanco_redman',
    specialty: 'Dược lâm sàng & Truyền nhiễm',
    category: 'dosage',
    frontQuestion: 'Hội chứng Red Man Syndrome do Vancomycin xảy ra do cơ chế gì và cách phòng ngừa/xử trí như thế nào?',
    backAnswer: 'Không phải dị ứng qua trung gian IgE, mà do Vancomycin kích thích tế bào Mast giải phóng trực tiếp HISTAMIN khi truyền quá nhanh.\n\n→ Phòng ngừa: Truyền chậm với tốc độ ≤ 10 mg/phút (ít nhất 60 phút cho liều 1g, 120 phút cho liều 2g). Nếu xuất hiện: Tạm dừng truyền, tiêm Kháng Histamin H1 rồi truyền lại với tốc độ giảm 50%.',
    clinicalContext: 'Nồng độ đích đáy Cmin cần đạt 15-20 mcg/mL ở nhiễm khuẩn nặng MRSA.',
    sourceArticleTitle: 'Dược thư: Vancomycin',
    difficulty: 'medium'
  },
  {
    id: 'fc_dka_potassium',
    specialty: 'Nội tiết & Hồi sức',
    category: 'danger',
    frontQuestion: 'Trong cấp cứu Nhiễm toan Ceton do ĐTĐ (DKA), ngưỡng Kali máu nào bắt buộc phải TRÌ HOÃN tiêm Insulin tĩnh mạch?',
    backAnswer: 'Nếu Kali máu (K+) < 3.3 mmol/L, TUYỆT ĐỐI KHÔNG TIÊM INSULIN. Phải bù dịch và truyền Kali (20-30 mEq/h) cho đến khi K+ > 3.3 mmol/L mới bắt đầu truyền Insulin.\n\n→ Lý do: Insulin đẩy Kali từ ngoại bào vào nội bào cực nhanh, gây hạ Kali máu ác tính dẫn đến ngừng tim và liệt cơ hô hấp.',
    clinicalContext: 'Khí máu ABG và điện giải đồ khẩn cấp mỗi 2-4 giờ trong DKA.',
    sourceArticleTitle: 'Cấp cứu DKA / HHS',
    difficulty: 'hard'
  },
  {
    id: 'fc_sepsis_bundle',
    specialty: 'Hồi sức - Cấp cứu',
    category: 'guideline',
    frontQuestion: 'Kể tên 5 thành tố bắt buộc trong Gói Cấp Cứu Giờ Đầu (Hour-1 Sepsis Bundle) của Hướng dẫn Quốc tế SSC 2021?',
    backAnswer: '1. Đo nồng độ Lactate máu (đo lại sau 2-4h nếu ban đầu > 2 mmol/L).\n2. Cấy máu trước khi dùng kháng sinh.\n3. Kháng sinh phổ rộng đường tĩnh mạch liều nạp.\n4. Bù dịch tinh thể nhanh 30 mL/kg nếu tụt HA hoặc Lactate ≥ 4 mmol/L.\n5. Dùng thuốc vận mạch (Noradrenaline) nếu MAP < 65 mmHg sau bù dịch.',
    clinicalContext: 'Mục tiêu MAP ≥ 65 mmHg và thanh thải Lactate > 20% mỗi 2 giờ.',
    sourceArticleTitle: 'Sốc nhiễm khuẩn Sepsis Bundle',
    difficulty: 'medium'
  },
  {
    id: 'fc_hyperkalemia_ecg',
    specialty: 'Hồi sức & Tim mạch',
    category: 'danger',
    frontQuestion: 'Khi tăng Kali máu có biến đổi ECG (sóng T cao nhọn đối xứng, QRS giãn rộng), bước xử trí KHẨN CẤP ĐẦU TIÊN là gì?',
    backAnswer: 'Tiêm tĩnh mạch Canxi Clorid 10% (5-10 mL) hoặc Canxi Gluconate 10% (10-20 mL) trong 2-3 phút.\n\n→ Cơ chế: Canxi không làm giảm Kali máu, mà có tác dụng ỔN ĐỊNH MÀNG TẾ BÀO CƠ TIM (nâng ngưỡng điện thế hoạt động), bảo vệ tim khỏi rung thất trong vòng 1-3 phút.',
    clinicalContext: 'Sau khi tiêm Canxi, tiếp tục dùng Insulin + Glucose 10%, Khí dung Salbutamol và Lợi tiểu/Lọc máu để hạ Kali.',
    sourceArticleTitle: 'Tăng Kali máu & Cấp cứu',
    difficulty: 'easy'
  },
  {
    id: 'fc_stroke_window',
    specialty: 'Thần kinh & Cấp cứu',
    category: 'guideline',
    frontQuestion: 'Cửa sổ thời gian vàng (Golden Window) cho thuốc tiêu sợi huyết (r-tPA) và can thiệp lấy huyết khối cơ học (EVT) trong Đột quỵ thiếu máu não cấp là bao lâu?',
    backAnswer: '• Tiêu sợi huyết tĩnh mạch (Alteplase r-tPA 0.9 mg/kg): Trong vòng 4.5 GIỜ kể từ thời điểm khởi phát triệu chứng (hoặc thời điểm bình thường cuối cùng).\n• Can thiệp lấy huyết khối cơ học đường động mạch (EVT): Trong vòng 6 GIỜ (có thể mở rộng đến 24 GIỜ theo tiêu chuẩn DAWN/DEFUSE-3 nếu có bất tương xứng mô não cứu được trên CTP/MRI).',
    clinicalContext: 'Chụp CT sọ não không cản quang khẩn cấp để loại trừ xuất huyết não trước khi dùng r-tPA.',
    sourceArticleTitle: 'Đột quỵ não cấp & Tiêu sợi huyết',
    difficulty: 'medium'
  },
  {
    id: 'fc_sglt2i_indication',
    specialty: 'Nội tiết & Tim mạch',
    category: 'pearl',
    frontQuestion: 'Ngoài tác dụng hạ đường huyết, 3 chỉ định bảo vệ cơ quan đích quan trọng của nhóm thuốc SGLT2i (Dapagliflozin, Empagliflozin) là gì?',
    backAnswer: '1. Suy tim phân suất tống máu giảm (HFrEF) và bảo tồn (HFpEF): Giảm tử vong tim mạch và tái nhập viện vì suy tim.\n2. Bệnh thận mạn (CKD) có hoặc không có ĐTĐ: Giảm tiến triển suy thận giai đoạn cuối và giảm đạm niệu.\n3. Giảm cân nhẹ và hạ huyết áp tâm thu 3-5 mmHg.',
    clinicalContext: 'Lưu ý: Tạm ngưng SGLT2i trước phẫu thuật lớn hoặc khi mắc bệnh cấp tính nặng để tránh Nhiễm toan Ceton Euglycemic (Đường huyết bình thường).',
    sourceArticleTitle: 'Dược thư: Dapagliflozin',
    difficulty: 'medium'
  },
  {
    id: 'fc_fib4_masld',
    specialty: 'Tiêu hóa - Gan mật',
    category: 'diagnosis',
    frontQuestion: 'Công thức tính chỉ số FIB-4 và hai ngưỡng điểm cắt (cut-off) để loại trừ hoặc phát hiện xơ hóa gan tiến triển (≥ F3) trong MASLD/MASH là bao nhiêu?',
    backAnswer: '• Công thức: FIB-4 = (Tuổi x AST) / (Tiểu cầu x √ALT).\n• Ngưỡng âm tính cao (< 1.30): Độ đặc hiệu cao loại trừ xơ hóa tiến triển (NPV > 90%) → Quản lý tại chăm sóc ban đầu.\n• Ngưỡng dương tính cao (> 2.67): Nguy cơ xơ hóa nặng/xơ gan cao (PPV ~80%) → Chuyển chuyên khoa Gan Mật và làm FibroScan/ELF.',
    clinicalContext: 'Khuyến cáo của AASLD 2023: Bắt buộc tính FIB-4 định kỳ cho bệnh nhân ĐTĐ típ 2 hoặc có ≥ 2 yếu tố nguy cơ tim mạch - chuyển hóa.',
    sourceArticleTitle: 'Yếu tố nguy cơ MASLD & MASH',
    difficulty: 'medium'
  },
  {
    id: 'fc_pe_aspirin_risk',
    specialty: 'Sản phụ khoa',
    category: 'guideline',
    frontQuestion: 'Theo ACOG và NICE, những thai phụ có yếu tố nguy cơ nào được chỉ định bắt buộc dùng Aspirin liều thấp (81-150 mg/ngày) dự phòng Tiền sản giật?',
    backAnswer: '• Chỉ cần có ≥ 1 yếu tố nguy cơ CAO: Tiền sử tiền sản giật, Đa thai, Tăng huyết áp mạn, ĐTĐ típ 1 hoặc 2, Bệnh thận mạn, Bệnh tự miễn (Hội chứng kháng phospholipid, Lupus).\n• Hoặc có ≥ 2 yếu tố nguy cơ TRUNG BÌNH: Con so, BMI ≥ 30, Tuổi ≥ 35, Mẹ/chị bị tiền sản giật, Khoảng cách mang thai > 10 năm.\n\n→ Khởi trị: Từ tuần 12-16 đến 36 tuần của thai kỳ.',
    clinicalContext: 'Uống vào buổi tối trước khi đi ngủ để tối ưu hóa hiệu quả ức chế thromboxane A2 bánh nhau.',
    sourceArticleTitle: 'Yếu tố nguy cơ Tiền sản giật',
    difficulty: 'medium'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. THUẬT TOÁN SUPERMEMO SM-2 (SPACED REPETITION)
// ─────────────────────────────────────────────────────────────────────────────

export interface Sm2Result {
  interval: number; // days
  repetition: number;
  efactor: number;
  masteryLevel: number;
}

/**
 * Tính toán chu kỳ ôn tập tiếp theo theo thuật toán SM-2
 * Rating q:
 * 0: Blackout (Quên hoàn toàn)
 * 1: Wrong (Sai)
 * 2: Hard (Nhớ khó khăn)
 * 3: Good (Nhớ tốt)
 * 4: Easy (Rất dễ)
 */
export function calculateSm2(currentEf: number = 2.5, repetition: number = 0, rating: number): Sm2Result {
  let efactor = currentEf;
  let rep = repetition;
  let interval = 1;

  // Cập nhật Easiness Factor
  efactor = efactor + (0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02));
  if (efactor < 1.3) efactor = 1.3;

  if (rating < 2) {
    // Quên hoặc sai: Reset lại chu kỳ lặp
    rep = 0;
    interval = 1;
  } else {
    // Nhớ được: Tăng dần khoảng cách lặp
    rep += 1;
    if (rep === 1) {
      interval = 1;
    } else if (rep === 2) {
      interval = 6;
    } else {
      interval = Math.round((interval || 6) * efactor);
    }
  }

  const masteryLevel = Math.min(Math.round((rep / 5) * 100), 100);

  return { interval, repetition: rep, efactor, masteryLevel };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. STORAGE & TIẾN TRÌNH RÈN LUYỆN BÁC SĨ
// ─────────────────────────────────────────────────────────────────────────────

export function getFlashcardProgressMap(profileId: string = 'default_doctor'): Record<string, FlashcardReviewState> {
  try {
    const raw = localStorage.getItem(`dsp_flashcards_progress_${profileId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveCardRating(cardId: string, rating: number, profileId: string = 'default_doctor'): FlashcardReviewState {
  const map = getFlashcardProgressMap(profileId);
  const current = map[cardId] || {
    cardId,
    interval: 0,
    repetition: 0,
    efactor: 2.5,
    nextReviewDate: new Date().toISOString(),
    masteryLevel: 0,
    lastReviewedAt: new Date().toISOString()
  };

  const sm2 = calculateSm2(current.efactor, current.repetition, rating);
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + sm2.interval);

  const updated: FlashcardReviewState = {
    cardId,
    interval: sm2.interval,
    repetition: sm2.repetition,
    efactor: sm2.efactor,
    nextReviewDate: nextDate.toISOString(),
    lastRating: rating,
    masteryLevel: sm2.masteryLevel,
    lastReviewedAt: new Date().toISOString()
  };

  map[cardId] = updated;
  localStorage.setItem(`dsp_flashcards_progress_${profileId}`, JSON.stringify(map));
  return updated;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. GIAO DIỆN THỬ THÁCH CA TRỰC 5 PHÚT (DAILY SHIFT CHALLENGE)
// ─────────────────────────────────────────────────────────────────────────────

let currentCardIndex = 0;
let isCardFlipped = false;
let currentSpecialtyFilter = 'ALL';

export function renderFlashcardStudioHtml(): string {
  const profileId = localStorage.getItem('dsp_active_profile') || 'default_doctor';
  const progressMap = getFlashcardProgressMap(profileId);

  // Filter cards
  let cards = DEFAULT_MEDICAL_FLASHCARDS;
  if (currentSpecialtyFilter !== 'ALL') {
    cards = cards.filter(c => c.specialty.includes(currentSpecialtyFilter));
  }

  if (currentCardIndex >= cards.length) {
    currentCardIndex = 0;
  }

  const card = cards[currentCardIndex] || cards[0];
  const cardProgress = progressMap[card.id];
  const mastery = cardProgress ? cardProgress.masteryLevel : 0;

  // Calculate stats
  const totalCards = DEFAULT_MEDICAL_FLASHCARDS.length;
  const masteredCards = Object.values(progressMap).filter(p => p.masteryLevel >= 80).length;
  const dueCardsCount = DEFAULT_MEDICAL_FLASHCARDS.filter(c => {
    const p = progressMap[c.id];
    if (!p) return true;
    return new Date(p.nextReviewDate) <= new Date();
  }).length;

  return `
    <div class="flashcard-studio-container" style="background:var(--color-surface, #ffffff); border-radius:12px; padding:20px; border:1px solid var(--color-border, #e2e8f0);">
      
      <!-- Studio Header & Challenge Stats -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="margin:0 0 4px; font-size:18px; color:var(--color-primary, #0284c7); display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-brain" style="color:#8b5cf6;"></i> Thử Thách Ca Trực 5 Phút (Medical Flashcards SM-2)
          </h2>
          <p style="margin:0; font-size:12.5px; color:var(--color-text-muted, #64748b);">Rèn luyện trí nhớ ngắt quãng các Điểm ngọc lâm sàng, Cảnh báo nguy kịch & Liều cấp cứu.</p>
        </div>

        <div style="display:flex; gap:10px; align-items:center;">
          <div style="background:rgba(139,92,246,0.1); color:#8b5cf6; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700;">
            <i class="fa-solid fa-fire"></i> Cần ôn: ${dueCardsCount} thẻ
          </div>
          <div style="background:rgba(16,185,129,0.1); color:#10b981; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700;">
            <i class="fa-solid fa-award"></i> Đã thuộc: ${masteredCards}/${totalCards}
          </div>
        </div>
      </div>

      <!-- Filter by Specialty -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="js-fc-filter-spec ${currentSpecialtyFilter === 'ALL' ? 'active' : ''}" data-spec="ALL" style="padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; border:1px solid var(--color-border); background:${currentSpecialtyFilter === 'ALL' ? 'var(--color-primary)' : 'var(--color-surface)'}; color:${currentSpecialtyFilter === 'ALL' ? '#fff' : 'var(--color-text)'};">
            Tất cả (${totalCards})
          </button>
          <button class="js-fc-filter-spec ${currentSpecialtyFilter === 'Tim mạch' ? 'active' : ''}" data-spec="Tim mạch" style="padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; border:1px solid var(--color-border); background:${currentSpecialtyFilter === 'Tim mạch' ? 'var(--color-primary)' : 'var(--color-surface)'}; color:${currentSpecialtyFilter === 'Tim mạch' ? '#fff' : 'var(--color-text)'};">
            🫀 Tim mạch
          </button>
          <button class="js-fc-filter-spec ${currentSpecialtyFilter === 'Hồi sức' ? 'active' : ''}" data-spec="Hồi sức" style="padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; border:1px solid var(--color-border); background:${currentSpecialtyFilter === 'Hồi sức' ? 'var(--color-primary)' : 'var(--color-surface)'}; color:${currentSpecialtyFilter === 'Hồi sức' ? '#fff' : 'var(--color-text)'};">
            ⚡ Hồi sức & Cấp cứu
          </button>
          <button class="js-fc-filter-spec ${currentSpecialtyFilter === 'Dược' ? 'active' : ''}" data-spec="Dược" style="padding:4px 10px; border-radius:6px; font-size:11.5px; font-weight:600; cursor:pointer; border:1px solid var(--color-border); background:${currentSpecialtyFilter === 'Dược' ? 'var(--color-primary)' : 'var(--color-surface)'}; color:${currentSpecialtyFilter === 'Dược' ? '#fff' : 'var(--color-text)'};">
            💊 Dược lâm sàng
          </button>
        </div>

        <span style="font-size:12px; color:var(--color-text-muted); font-weight:700;">
          Thẻ ${currentCardIndex + 1} / ${cards.length}
        </span>
      </div>

      <!-- 3D Interactive Flip Card -->
      <div id="flashcard-card-scene" style="perspective: 1000px; width: 100%; min-height: 280px; margin-bottom: 16px; cursor: pointer;">
        <div id="flashcard-flipper" style="position: relative; width: 100%; min-height: 280px; text-align: left; transition: transform 0.4s ease; transform-style: preserve-3d; transform: ${isCardFlipped ? 'rotateY(180deg)' : 'none'};">
          
          <!-- MẶT TRƯỚC (FRONT: CÂU HỎI LÂM SÀNG) -->
          <div style="position: absolute; inset:0; backface-visibility: hidden; background: linear-gradient(135deg, var(--color-surface), var(--color-bg)); border-radius: 12px; padding: 24px; border: 2px solid var(--color-primary); box-shadow: 0 4px 12px rgba(2,132,199,0.08); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:var(--color-primary); background:rgba(2,132,199,0.1); padding:3px 10px; border-radius:6px;">
                  <i class="fa-solid fa-stethoscope"></i> ${escapeHtml(card.specialty)}
                </span>
                <span style="font-size:11px; color:var(--color-text-muted);">
                  Mức độ thuộc: <strong>${mastery}%</strong>
                </span>
              </div>
              <h3 style="font-size:16px; line-height:1.5; color:var(--color-text); margin:0 0 10px;">
                ${escapeHtml(card.frontQuestion)}
              </h3>
            </div>

            <div style="text-align:center; padding:10px; background:rgba(2,132,199,0.05); border-radius:8px; font-size:12px; color:var(--color-primary); font-weight:700;">
              <i class="fa-solid fa-rotate"></i> Bấm vào thẻ để LẬT XEM ĐÁP ÁN & CƠ CHẾ
            </div>
          </div>

          <!-- MẶT SAU (BACK: ĐÁP ÁN & ĐIỂM NGỌC EBM) -->
          <div style="position: absolute; inset:0; backface-visibility: hidden; transform: rotateY(180deg); background: linear-gradient(135deg, var(--color-surface), rgba(16,185,129,0.02)); border-radius: 12px; padding: 24px; border: 2px solid #10b981; box-shadow: 0 4px 12px rgba(16,185,129,0.08); display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:#059669; background:rgba(16,185,129,0.1); padding:3px 10px; border-radius:6px;">
                  <i class="fa-solid fa-circle-check"></i> ĐÁP ÁN CHUẨN EBM
                </span>
                <span style="font-size:11px; color:var(--color-text-muted);">
                  Bài viết: <em>${escapeHtml(card.sourceArticleTitle || '')}</em>
                </span>
              </div>

              <div style="font-size:13.5px; line-height:1.6; color:var(--color-text); white-space:pre-wrap; margin-bottom:12px;">
                ${escapeHtml(card.backAnswer)}
              </div>

              ${card.clinicalContext ? `
                <div style="background:rgba(245,158,11,0.08); border-left:3px solid #f59e0b; padding:8px 12px; border-radius:4px; font-size:12px; color:var(--color-text); line-height:1.4;">
                  <strong><i class="fa-solid fa-lightbulb" style="color:#f59e0b;"></i> Lưu ý lâm sàng:</strong> ${escapeHtml(card.clinicalContext)}
                </div>
              ` : ''}
            </div>

            <div style="text-align:center; font-size:11.5px; color:var(--color-text-muted);">
              Đánh giá mức độ nhớ của bạn bên dưới để SM-2 lên lịch ôn tập tiếp theo
            </div>
          </div>

        </div>
      </div>

      <!-- Rating SM-2 Buttons Bar (Chỉ hiện khi đã lật mặt sau) -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <button type="button" id="btn-fc-prev" class="vault-tool-btn" style="font-size:12px; padding:6px 12px;">
          <i class="fa-solid fa-arrow-left"></i> Thẻ trước
        </button>

        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button type="button" class="js-fc-rate-btn" data-rate="0" style="background:#fee2e2; color:#ef4444; border:1px solid #fca5a5; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer;" title="Lặp lại ngày mai (0 ngày)">
            🔴 Quên hẳn
          </button>
          <button type="button" class="js-fc-rate-btn" data-rate="2" style="background:#fef3c7; color:#d97706; border:1px solid #fcd34d; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer;" title="Nhớ khó khăn (1 ngày)">
            🟡 Khó nhớ
          </button>
          <button type="button" class="js-fc-rate-btn" data-rate="3" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer;" title="Nhớ tốt (3-6 ngày)">
            🟢 Nhớ tốt
          </button>
          <button type="button" class="js-fc-rate-btn" data-rate="4" style="background:#e0e7ff; color:#4338ca; border:1px solid #a5b4fc; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer;" title="Rất dễ thuộc (> 6 ngày)">
            🔵 Rất dễ
          </button>
        </div>

        <button type="button" id="btn-fc-next" class="vault-tool-btn" style="font-size:12px; padding:6px 12px;">
          Thẻ kế tiếp <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

    </div>
  `;
}

/**
 * Gắn sự kiện tương tác lật thẻ và đánh giá SM-2
 */
export function attachFlashcardEvents(container: HTMLElement, onStateChanged?: () => void): void {
  const scene = container.querySelector('#flashcard-card-scene');
  const prevBtn = container.querySelector('#btn-fc-prev');
  const nextBtn = container.querySelector('#btn-fc-next');

  // Lật thẻ 3D
  scene?.addEventListener('click', () => {
    isCardFlipped = !isCardFlipped;
    const flipper = container.querySelector('#flashcard-flipper') as HTMLElement | null;
    if (flipper) {
      flipper.style.transform = isCardFlipped ? 'rotateY(180deg)' : 'none';
    }
  });

  // Chuyển thẻ Trước / Sau
  const cards = currentSpecialtyFilter === 'ALL' 
    ? DEFAULT_MEDICAL_FLASHCARDS 
    : DEFAULT_MEDICAL_FLASHCARDS.filter(c => c.specialty.includes(currentSpecialtyFilter));

  prevBtn?.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    isCardFlipped = false;
    container.innerHTML = renderFlashcardStudioHtml();
    attachFlashcardEvents(container, onStateChanged);
  });

  nextBtn?.addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    isCardFlipped = false;
    container.innerHTML = renderFlashcardStudioHtml();
    attachFlashcardEvents(container, onStateChanged);
  });

  // Lọc chuyên khoa
  container.querySelectorAll('.js-fc-filter-spec').forEach(btn => {
    btn.addEventListener('click', () => {
      currentSpecialtyFilter = btn.getAttribute('data-spec') || 'ALL';
      currentCardIndex = 0;
      isCardFlipped = false;
      container.innerHTML = renderFlashcardStudioHtml();
      attachFlashcardEvents(container, onStateChanged);
    });
  });

  // Đánh giá SM-2 Rating
  container.querySelectorAll('.js-fc-rate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rate = parseInt(btn.getAttribute('data-rate') || '3', 10);
      const activeCard = cards[currentCardIndex];
      if (activeCard) {
        saveCardRating(activeCard.id, rate);
      }

      // Tự động sang thẻ kế tiếp
      currentCardIndex = (currentCardIndex + 1) % cards.length;
      isCardFlipped = false;
      container.innerHTML = renderFlashcardStudioHtml();
      attachFlashcardEvents(container, onStateChanged);
      if (onStateChanged) onStateChanged();
    });
  });
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
