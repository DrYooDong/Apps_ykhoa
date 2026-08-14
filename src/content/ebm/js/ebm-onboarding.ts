/**
 * EBM Onboarding Tour & Feature Discovery Engine (ebm-onboarding.ts)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface TourStep {
  badge: string;
  title: string;
  desc: string;
}

export function closeEbmTour(): void {
  const modal = document.getElementById('ebm-tour-modal');
  if (modal) modal.remove();
  localStorage.setItem('clini_ebm_tour_seen', 'true');
}

export function startEbmTour(): void {
  const overlay = document.createElement('div');
  overlay.className = 'ebm-tour-overlay';
  overlay.id = 'ebm-tour-modal';

  let currentStep = 0;
  const steps: TourStep[] = [
    {
      badge: 'Bước 1 / 3',
      title: '🚀 Chào mừng đến với EBM Workspace CliniPortal!',
      desc: 'Hệ thống Y học chứng cứ CliniPortal được nâng cấp toàn diện với giao diện Bento Grid, Tháp bằng chứng 6S, Chu trình 5As và bộ biểu đồ SVG chất lượng cao.'
    },
    {
      badge: 'Bước 2 / 3',
      title: '📊 Guidelines Dashboard & Radar Feed',
      desc: 'Khám phá biểu đồ Donut chuyên khoa, Timeline xuất bản, Streak đọc bài và trạm Radar Diff Viewer theo dõi cập nhật Practice-Changing mới nhất.'
    },
    {
      badge: 'Bước 3 / 3',
      title: '🧪 EBM Analysis Pipeline',
      desc: 'Sử dụng PICO Builder, tính toán NNT/ARR, thực hiện Sensitivity Analysis và tự động nhận báo cáo phiên giải lâm sàng AI tại giường bệnh.'
    }
  ];

  function renderStep(idx: number): void {
    const step = steps[idx];
    overlay.innerHTML = `
      <div class="ebm-tour-card" style="background:var(--color-surface); border:1.5px solid var(--color-divider); border-radius:16px; padding:1.5rem; max-width:480px; width:90%; margin:auto; box-shadow:0 20px 40px rgba(0,0,0,0.2);">
        <div class="ebm-tour-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <span class="ebm-tour-badge" style="background:#e0f2fe; color:#0369a1; font-weight:700; font-size:0.75rem; padding:3px 8px; border-radius:20px;">${step.badge}</span>
          <button id="btn-tour-close" style="background:none; border:none; font-size:1.4rem; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        <div class="ebm-tour-title" style="font-size:1.15rem; font-weight:800; color:var(--color-text); margin-bottom:0.5rem;">${step.title}</div>
        <div class="ebm-tour-desc" style="font-size:0.9rem; color:var(--color-text-muted); line-height:1.5; margin-bottom:1.5rem;">${step.desc}</div>
        <div class="ebm-tour-actions" style="display:flex; justify-content:space-between; align-items:center;">
          <button id="btn-tour-skip" style="background:none; border:none; font-size:0.85rem; font-weight:600; color:var(--color-text-muted); cursor:pointer;">Bỏ qua</button>
          <button id="ebm-tour-next-btn" class="btn btn-primary" style="background:var(--color-primary); color:#fff; border:none; padding:8px 18px; border-radius:8px; font-weight:700; cursor:pointer;">
            ${idx < steps.length - 1 ? 'Tiếp theo →' : 'Hoàn tất 🎉'}
          </button>
        </div>
      </div>
    `;

    overlay.querySelector('#btn-tour-close')?.addEventListener('click', closeEbmTour);
    overlay.querySelector('#btn-tour-skip')?.addEventListener('click', closeEbmTour);
    overlay.querySelector('#ebm-tour-next-btn')?.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
      } else {
        closeEbmTour();
      }
    });
  }

  renderStep(currentStep);
  document.body.appendChild(overlay);
}

export function checkFirstVisitTour(): void {
  const hasSeen = localStorage.getItem('clini_ebm_tour_seen');
  if (!hasSeen) {
    setTimeout(startEbmTour, 1200);
  }
}

if (typeof window !== 'undefined') {
  (window as any).startEbmTour = startEbmTour;
  (window as any).closeEbmTour = closeEbmTour;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkFirstVisitTour);
  } else {
    checkFirstVisitTour();
  }
}
