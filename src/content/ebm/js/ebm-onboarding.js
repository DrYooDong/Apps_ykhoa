/**
 * ebm-onboarding.js
 * Gói 8: Onboarding Tour & Feature Discovery Engine
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    checkFirstVisitTour();
  });

  function checkFirstVisitTour() {
    const hasSeen = localStorage.getItem('clini_ebm_tour_seen');
    if (!hasSeen) {
      setTimeout(startEbmTour, 1200);
    }
  }

  window.startEbmTour = function() {
    const overlay = document.createElement('div');
    overlay.className = 'ebm-tour-overlay';
    overlay.id = 'ebm-tour-modal';

    let currentStep = 0;
    const steps = [
      {
        badge: 'Bước 1 / 3',
        title: '🚀 Chào mừng đến với EBM $5000 Upgrade!',
        desc: 'Hệ thống Y học chứng cứ CliniPortal đã được nâng cấp toàn diện với giao diện Bento Grid, Tháp bằng chứng 6S, Chu trình 5As và bộ biểu đồ SVG chất lượng cao.'
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

    function renderStep(idx) {
      const step = steps[idx];
      overlay.innerHTML = `
        <div class="ebm-tour-card">
          <div class="ebm-tour-header">
            <span class="ebm-tour-badge">${step.badge}</span>
            <button onclick="closeEbmTour()" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--text-faint);">&times;</button>
          </div>
          <div class="ebm-tour-title">${step.title}</div>
          <div class="ebm-tour-desc">${step.desc}</div>
          <div class="ebm-tour-actions">
            <button onclick="closeEbmTour()" style="background:none; border:none; font-size:0.8rem; font-weight:600; color:var(--text-muted); cursor:pointer;">Bỏ qua</button>
            <button id="ebm-tour-next-btn" class="btn btn-primary" style="padding:6px 16px; font-weight:700;">
              ${idx < steps.length - 1 ? 'Tiếp theo →' : 'Hoàn tất 🎉'}
            </button>
          </div>
        </div>
      `;

      document.getElementById('ebm-tour-next-btn').addEventListener('click', () => {
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
  };

  window.closeEbmTour = function() {
    const modal = document.getElementById('ebm-tour-modal');
    if (modal) modal.remove();
    localStorage.setItem('clini_ebm_tour_seen', 'true');
  };

})();
