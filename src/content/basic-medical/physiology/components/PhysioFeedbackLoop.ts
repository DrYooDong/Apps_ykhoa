/**
 * CliniPortal 2.0 — PhysioFeedbackLoop MDX Component
 * Path: src/content/basic-medical/physiology/components/PhysioFeedbackLoop.ts
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
  const returnArrowText = isNeg ? '[-] Ức chế & Đưa về hằng định' : '[+] Khuếch đại đáp ứng';

  return `
    <div class="physio-feedback-card" style="
      margin: 2rem 0;
      padding: 1.5rem;
      background: var(--color-surface, #ffffff);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    ">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.05rem; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-arrows-spin" style="color: ${badgeColor};"></i>
          <span>${title}</span>
        </div>
        <span style="
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          background: ${badgeColor}15;
          color: ${badgeColor};
          border: 1px solid ${badgeColor}40;
        ">
          ${badgeLabel}
        </span>
      </div>

      <!-- Pure SVG Workflow Graphic -->
      <div style="width: 100%; overflow-x: auto; text-align: center;">
        <svg viewBox="0 0 800 240" style="max-width: 100%; height: auto; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
          <defs>
            <marker id="arrow-${type}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill="${badgeColor}" />
            </marker>
          </defs>

          <!-- Step 1: Stimulus -->
          <g transform="translate(20, 40)">
            <rect width="130" height="70" rx="10" fill="var(--color-bg, #f8fafc)" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="65" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#64748b">1. KÍCH THÍCH</text>
            <text x="65" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${stimulus}</text>
          </g>

          <line x1="150" y1="75" x2="175" y2="75" stroke="${badgeColor}" stroke-width="2" marker-end="url(#arrow-${type})" />

          <!-- Step 2: Receptor -->
          <g transform="translate(180, 40)">
            <rect width="130" height="70" rx="10" fill="var(--color-bg, #f8fafc)" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="65" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#0284c7">2. THỤ THỂ</text>
            <text x="65" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${receptor}</text>
          </g>

          <line x1="310" y1="75" x2="335" y2="75" stroke="${badgeColor}" stroke-width="2" marker-end="url(#arrow-${type})" />

          <!-- Step 3: Control Center -->
          <g transform="translate(340, 40)">
            <rect width="130" height="70" rx="10" fill="var(--color-bg, #f8fafc)" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="65" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#8b5cf6">3. TT TÍCH HỢP</text>
            <text x="65" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${controlCenter}</text>
          </g>

          <line x1="470" y1="75" x2="495" y2="75" stroke="${badgeColor}" stroke-width="2" marker-end="url(#arrow-${type})" />

          <!-- Step 4: Effector -->
          <g transform="translate(500, 40)">
            <rect width="130" height="70" rx="10" fill="var(--color-bg, #f8fafc)" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="65" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#f59e0b">4. CƠ QUAN ĐÁP ỨNG</text>
            <text x="65" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${effector}</text>
          </g>

          <line x1="630" y1="75" x2="655" y2="75" stroke="${badgeColor}" stroke-width="2" marker-end="url(#arrow-${type})" />

          <!-- Step 5: Response -->
          <g transform="translate(660, 40)">
            <rect width="120" height="70" rx="10" fill="var(--color-bg, #f8fafc)" stroke="#e2e8f0" stroke-width="1.5" />
            <text x="60" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="#10b981">5. ĐÁP ỨNG</text>
            <text x="60" y="48" text-anchor="middle" font-size="11" font-weight="600" fill="#0f172a">${response}</text>
          </g>

          <!-- Feedback return path -->
          <path d="M 720 110 L 720 180 L 85 180 L 85 115" fill="none" stroke="${badgeColor}" stroke-width="2" stroke-dasharray="6,4" marker-end="url(#arrow-${type})" />
          <rect x="280" y="165" width="240" height="28" rx="6" fill="${badgeColor}" />
          <text x="400" y="184" text-anchor="middle" font-size="11" font-weight="700" fill="#ffffff">${returnArrowText}</text>
        </svg>
      </div>
    </div>
  `;
}
