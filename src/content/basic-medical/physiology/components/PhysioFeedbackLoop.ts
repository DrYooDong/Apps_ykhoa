/**
 * CliniPortal 2.0 — PhysioFeedbackLoop MDX Component (TypeScript)
 * Path: src/content/basic-medical/physiology/components/PhysioFeedbackLoop.ts
 * 
 * Sơ đồ Cung Phản Hồi Sinh Lý Học (Homeostatic Negative/Positive Feedback Loop):
 * - Thiết kế 5-Step Connected Process Ribbon tương thích hoàn toàn trên Mobile & Desktop
 * - Dải cung phản hồi ngược (Feedback Arch) thể hiện rõ chiều tác động lên kích thích ban đầu
 * - 100% Dark Mode & Tự động wrap chữ linh hoạt
 */

export interface PhysioFeedbackLoopProps {
  type: 'negative' | 'positive';
  title: string;
  stimulus: string;
  receptor: string;
  controlCenter: string;
  effector: string;
  response: string;
}

export function renderPhysioFeedbackLoop(props: PhysioFeedbackLoopProps): string {
  const { type, title, stimulus, receptor, controlCenter, effector, response } = props;
  const isNeg = type === 'negative';
  const badgeColor = isNeg ? '#0284c7' : '#ef4444';
  const badgeLabel = isNeg ? 'PHẢN HỒI ÂM TÍNH (NEGATIVE FEEDBACK)' : 'PHẢN HỒI DƯƠNG TÍNH (POSITIVE FEEDBACK)';
  const returnTitle = isNeg ? 'Cung Phản Hồi Âm Tính (Ức chế & Hằng định nội môi)' : 'Cung Phản Hồi Dương Tính (Khuếch đại đáp ứng sinh học)';
  const returnDesc = isNeg 
    ? 'Đáp ứng sinh lý làm đảo ngược hoặc làm giảm cường độ của kích thích ban đầu, đưa chỉ số sinh học trở lại giá trị cài đặt chuẩn (Set Point).'
    : 'Đáp ứng sinh lý tiếp tục kích hoạt và khuếch đại kích thích ban đầu theo vòng xoắn lũy tiến cho đến khi hoàn tất biến cố (ví dụ: chuyển dạ sinh, tạo nút tiểu cầu cầm máu).';

  return `
    <div class="physio-feedback-wrapper" style="
      margin: 2rem 0;
      padding: 1.5rem 1.25rem;
      background: var(--color-surface, #ffffff);
      border: 1.5px solid var(--color-border, #cbd5e1);
      border-radius: 20px;
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.02);
      transition: all 0.25s ease;
    ">
      
      <!-- Top Title Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; padding-bottom: 0.85rem; border-bottom: 1px dashed var(--color-border, #cbd5e1);">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span style="display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 10px; background: ${isNeg ? 'rgba(2, 132, 199, 0.12)' : 'rgba(239, 68, 68, 0.12)'}; color: ${badgeColor}; font-size: 1.05rem;">
            <i class="fa-solid fa-arrows-spin"></i>
          </span>
          <div>
            <h4 style="margin: 0; font-size: 1.05rem; font-weight: 800; color: var(--color-text, #0f172a); font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif);">
              ${title}
            </h4>
            <p style="margin: 0; font-size: 0.76rem; color: var(--color-text-muted, #64748b);">
              Cung phản xạ điều hòa hằng định nội môi (Homeostatic Control Mechanism)
            </p>
          </div>
        </div>

        <span class="badge" style="
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          background: ${isNeg ? 'rgba(2, 132, 199, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
          color: ${badgeColor};
          border: 1px solid ${isNeg ? 'rgba(2, 132, 199, 0.25)' : 'rgba(239, 68, 68, 0.25)'};
          letter-spacing: 0.03em;
        ">
          ${badgeLabel}
        </span>
      </div>

      <!-- 5-Step Process Grid -->
      <div class="physio-feedback-steps" style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.85rem;
        margin-bottom: 1.25rem;
      ">
        
        <!-- Step 1: Kích thích -->
        <div style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1rem; position: relative;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
            <span>1. Kích thích</span>
            <i class="fa-solid fa-bolt" style="color: #64748b;"></i>
          </div>
          <div style="font-size: 0.88rem; font-weight: 750; color: var(--color-text, #0f172a); line-height: 1.4;">
            ${stimulus}
          </div>
        </div>

        <!-- Step 2: Thụ thể -->
        <div style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(2, 132, 199, 0.3); border-radius: 14px; padding: 1rem; position: relative;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #0284c7; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
            <span>2. Thụ thể (Receptor)</span>
            <i class="fa-solid fa-satellite-dish" style="color: #0284c7;"></i>
          </div>
          <div style="font-size: 0.88rem; font-weight: 750; color: var(--color-text, #0f172a); line-height: 1.4;">
            ${receptor}
          </div>
        </div>

        <!-- Step 3: Trung tâm tích hợp -->
        <div style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(139, 92, 246, 0.3); border-radius: 14px; padding: 1rem; position: relative;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #8b5cf6; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
            <span>3. TT Tích hợp</span>
            <i class="fa-solid fa-brain" style="color: #8b5cf6;"></i>
          </div>
          <div style="font-size: 0.88rem; font-weight: 750; color: var(--color-text, #0f172a); line-height: 1.4;">
            ${controlCenter}
          </div>
        </div>

        <!-- Step 4: Cơ quan đáp ứng -->
        <div style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(217, 119, 6, 0.3); border-radius: 14px; padding: 1rem; position: relative;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #d97706; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
            <span>4. Cơ quan đáp ứng</span>
            <i class="fa-solid fa-gears" style="color: #d97706;"></i>
          </div>
          <div style="font-size: 0.88rem; font-weight: 750; color: var(--color-text, #0f172a); line-height: 1.4;">
            ${effector}
          </div>
        </div>

        <!-- Step 5: Đáp ứng sinh lý -->
        <div style="background: var(--color-surface-2, #f8fafc); border: 1.5px solid rgba(16, 185, 129, 0.35); border-radius: 14px; padding: 1rem; position: relative;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.35rem; display: flex; align-items: center; justify-content: space-between;">
            <span>5. Đáp ứng (Response)</span>
            <i class="fa-solid fa-circle-check" style="color: #059669;"></i>
          </div>
          <div style="font-size: 0.88rem; font-weight: 750; color: var(--color-text, #0f172a); line-height: 1.4;">
            ${response}
          </div>
        </div>

      </div>

      <!-- Feedback Return Arch Banner -->
      <div style="
        background: ${isNeg ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%)' : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(217, 119, 6, 0.08) 100%)'};
        border: 1.5px solid ${isNeg ? 'rgba(2, 132, 199, 0.25)' : 'rgba(239, 68, 68, 0.25)'};
        border-radius: 14px;
        padding: 0.95rem 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.85rem;
      ">
        <span style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: ${badgeColor};
          color: #ffffff;
          font-size: 0.9rem;
          flex-shrink: 0;
        ">
          <i class="fa-solid ${isNeg ? 'fa-minus' : 'fa-plus'}"></i>
        </span>
        <div style="font-size: 0.84rem; line-height: 1.5; color: var(--color-text, #0f172a);">
          <strong style="color: ${badgeColor};">${returnTitle}:</strong> ${returnDesc}
        </div>
      </div>

    </div>
  `;
}
