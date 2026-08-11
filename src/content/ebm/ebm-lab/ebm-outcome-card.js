/* ============================================================
   EBM OUTCOME MATRIX CARD RENDERER (CLINIPORTAL)
   Location: src/content/ebm/ebm-lab/ebm-outcome-card.js
   Usage: Renders structured Evidence Outcome Cards in Guidelines/EBM Articles
============================================================ */

(function () {
  window.EBMOutcomeCard = {
    render: function (containerId, data) {
      const container = document.getElementById(containerId);
      if (!container || !data || !data.outcomes) return;

      const catBadgeMap = {
        primary: { label: "🎯 Primary Hard Outcome", bg: "#dcfce7", color: "#166534", border: "#86efac" },
        composite: { label: "🧩 Composite Outcome", bg: "#f3e8ff", color: "#6b21a8", border: "#d8b4fe" },
        surrogate: { label: "🧪 Surrogate Endpoint", bg: "#e0f2fe", color: "#075985", border: "#7dd3fc" },
        safety: { label: "⚠️ Safety / Adverse Event", bg: "#fef3c7", color: "#92400e", border: "#fde68a" }
      };

      let html = `
        <div class="ebm-outcome-card-wrapper" style="background: var(--color-surface, #ffffff); border: 1.5px solid var(--color-divider, #e2e8f0); border-radius: 16px; padding: 1.25rem; margin: 1.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-divider, #e2e8f0);">
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.1rem; color: var(--color-text, #0f172a);">
              <i class="fa-solid fa-microscope" style="color: #0284c7; margin-right: 0.4rem;"></i> ${data.title || "Bảng Đối Sánh Kết Cục Lâm Sàng (Outcome Matrix)"}
            </div>
            ${data.evidenceGrade ? `<span style="background: #e0e7ff; color: #3730a3; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 20px;">Grade ${data.evidenceGrade}</span>` : ''}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      `;

      data.outcomes.forEach((item) => {
        const badge = catBadgeMap[item.category] || catBadgeMap.primary;
        const isSignificant = item.low && item.high ? !(item.low <= 1.0 && item.high >= 1.0) : true;
        const sigBadge = isSignificant 
          ? `<span style="background: #dcfce7; color: #15803d; font-weight: 700; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px;"><i class="fa-solid fa-check"></i> Có ý nghĩa ($p < 0.05$)</span>`
          : `<span style="background: #f1f5f9; color: #64748b; font-weight: 600; font-size: 0.72rem; padding: 0.15rem 0.5rem; border-radius: 12px;"><i class="fa-solid fa-minus"></i> Không ý nghĩa</span>`;

        html += `
          <div style="background: var(--color-surface-2, #f8fafc); border: 1px solid ${badge.border}; border-left: 4px solid ${badge.color}; border-radius: 10px; padding: 0.85rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 240px;">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                <span style="background: ${badge.bg}; color: ${badge.color}; font-size: 0.72rem; font-weight: 800; padding: 0.1rem 0.45rem; border-radius: 4px;">${badge.label}</span>
                ${sigBadge}
              </div>
              <div style="font-weight: 700; font-size: 0.92rem; color: var(--color-text, #0f172a);">${item.name}</div>
            </div>

            <div style="text-align: right; font-family: 'JetBrains Mono', monospace;">
              <div style="font-size: 1.05rem; font-weight: 800; color: ${isSignificant ? '#0284c7' : '#64748b'};">
                ${item.metric || 'HR'}: ${item.val}
              </div>
              <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">
                95% CI: ${item.low} – ${item.high}
              </div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;

      container.innerHTML = html;
    }
  };
})();
