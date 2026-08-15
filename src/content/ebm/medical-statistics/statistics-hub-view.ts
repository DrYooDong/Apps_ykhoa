/**
 * CliniPortal — Medical Statistics & Research Methods Hub SPA View (TypeScript)
 * Path: src/content/ebm/medical-statistics/statistics-hub-view.ts
 */

export function renderStatisticsHubView(): string {
  const lessons = [
    { id: '1', title: '1. Ý Nghĩa Thống Kê & Ý Nghĩa Lâm Sàng (p-value, CI 95%)', desc: 'Phân biệt ý nghĩa thống kê (p < 0.05) và hiệu quả lâm sàng thực tế qua MCID.', color: '#0284c7', link: '#/ebm/medical-statistics/1-ynghia-thongke-lamsang.html' },
    { id: '2', title: '2. Đánh Giá Công Cụ Chẩn Đoán (Sens, Spec, PPV, NPV, LR+, LR-)', desc: 'Độ nhạy, độ đặc hiệu, giá trị tiên đoán và tỷ số khả dĩ trong thực hành chẩn đoán.', color: '#059669', link: '#/ebm/medical-statistics/2-dg-congcu-chandoan.html' },
    { id: '3', title: '3. Thiết Kế Nghiên Cứu Y Khoa (RCT, Cohort, Case-Control)', desc: 'Tổng quan các mô hình thiết kế nghiên cứu dịch tễ học và lâm sàng.', color: '#7c3aed', link: '#/ebm/medical-statistics/3-thietke-nckh.html' },
    { id: '4', title: '4. Phân Tích Nghiên Cứu Can Thiệp (RCT & Meta-Analysis)', desc: 'Thử nghiệm lâm sàng ngẫu nhiên có nhóm chứng và tổng quan hệ thống.', color: '#ca8a04', link: '#/ebm/medical-statistics/4-phantichnc-rct-meta-analysis.html' },
    { id: '5', title: '5. Phân Tích Phương Sai (ANOVA & Post-Hoc Tests)', desc: 'So sánh giá trị trung bình giữa 3 nhóm trở lên và các hiệu chỉnh kiểm định.', color: '#dc2626', link: '#/ebm/medical-statistics/5-anova-phan-tich-phuong-sai.html' },
    { id: '6', title: '6. Hồi Quy Logistic & Đa Thức (Binary & Multinomial Logistic)', desc: 'Mô hình hóa nguy cơ biến cố nhị phân và tính toán Odds Ratio hiệu chỉnh.', color: '#0891b2', link: '#/ebm/medical-statistics/6-hoi-quy-logistic-da-thuc.html' },
    { id: '7', title: '7. Hồi Quy Bayes & Xác Suất Tiền Nghiệm (Bayesian Inference)', desc: 'Tư duy xác suất Bayes trong suy luận y khoa và cập nhật bằng chứng lâm sàng.', color: '#ea580c', link: '#/ebm/medical-statistics/7-hoi-quy-bayes.html' },
    { id: '8', title: '8. Phản Biện Nghiên Cứu Khoa Học (Critical Peer-Review)', desc: 'Kỹ năng đọc báo quốc tế, phát hiện sai lệch (biases) và lỗ hổng phương pháp.', color: '#be185d', link: '#/ebm/medical-statistics/8-phan-bien-nghien-cuu.html' },
    { id: '9', title: '9. Phân Tích Sống Còn (Survival Analysis & Cox Regression)', desc: 'Ước lượng Kaplan-Meier, Log-rank test và mô hình Cox Proportional Hazards.', color: '#475569', link: '#/ebm/medical-statistics/9-phan-tich-sinh-ton.html' },
    { id: '10', title: '10. Ghép Điểm Xu Hướng (Propensity Score Matching — PSM)', desc: 'Kiểm soát yếu tố gây nhiễu (confounding) trong các nghiên cứu quan sát.', color: '#16a34a', link: '#/ebm/medical-statistics/10-propensity-score-matching.html' },
    { id: '11', title: '11. Mô Hình Dự Đoán Học Máy (Machine Learning & AI in Medicine)', desc: 'Xây dựng thang điểm dự báo bằng Random Forest, XGBoost và mạng nơ-ron.', color: '#6366f1', link: '#/ebm/medical-statistics/11-mo-hinh-du-doan-machine-learning.html' },
    { id: '12', title: '12. Xử Lý Dữ Liệu Khuyết (Missing Data Imputation & MICE)', desc: 'Kỹ thuật Multiple Imputation xử lý số liệu bị thiếu trong nghiên cứu y học.', color: '#d97706', link: '#/ebm/medical-statistics/12-xu-ly-du-lieu-khuyet.html' }
  ];

  return `
    <div class="stats-hub-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Chứng Cứ</a> / Thống Kê Y Học & NCKH
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-chart-pie"></i> Thống Kê Y Học, Thiết Kế Nghiên Cứu & Đọc Báo Quốc Tế
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            12 chuyên đề thống kê lâm sàng từ cơ bản đến nâng cao, hướng dẫn tính toán cỡ mẫu, thẩm định bài báo y văn và trắc nghiệm tương tác.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Hub
          </a>
        </div>
      </div>

      <!-- 12 Lessons Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        ${lessons.map(item => `
          <div class="lesson-card" data-lesson-id="${item.id}" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s, box-shadow 0.2s;">
            <div>
              <div style="width: 36px; height: 36px; border-radius: 8px; background: ${item.color}15; color: ${item.color}; display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 0.75rem;">
                ${item.id}
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.4;">
                ${item.title}
              </h3>
              <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0 0 1rem 0;">
                ${item.desc}
              </p>
            </div>

            <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span class="completion-badge" style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-book-open"></i> Bài học chuẩn</span>
              <a href="${item.link}" class="btn btn-sm" style="padding: 0.35rem 0.75rem; background: ${item.color}; color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600;">
                Học bài <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
