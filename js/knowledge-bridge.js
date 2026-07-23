/**
 * Cross-Module Knowledge Bridge — CliniPortal
 * Tự động tạo liên kết tri thức liên phân hệ (Kỹ năng ↔ Sinh lý ↔ Tiếp cận ↔ Công cụ ↔ Dược lý)
 */

(function () {
  'use strict';

  function initKnowledgeBridge() {
    const container = document.getElementById('knowledge-bridge-container') || document.querySelector('.knowledge-bridge-section');
    if (!container) return;

    const skillId = container.getAttribute('data-skill-id') || document.body.getAttribute('data-skill-id');
    const dataMap = window.KNOWLEDGE_MAP_DATA || {};
    const item = dataMap[skillId];

    if (!item || !item.links || item.links.length === 0) return;

    container.innerHTML = `
      <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem 1.5rem; margin: 2rem 0; box-shadow: var(--shadow-sm);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.75rem;">
          <h4 style="margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--color-text); display: flex; align-items: center; gap: 0.5rem;">
            <span>🌉</span> Cầu Nối Kiến Thức Liên Phân Hệ (Cross-Module Links)
          </h4>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">Gợi ý học tập liên hoàn</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.85rem;">
          ${item.links.map(link => `
            <a href="${link.url}" style="background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.85rem; text-decoration: none; display: flex; flex-direction: column; gap: 0.35rem; transition: transform 0.2s, border-color 0.2s; color: var(--color-text);" onmouseover="this.style.transform='translateY(-2px)'; this.style.borderColor='var(--color-primary)'" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='var(--color-border)'">
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.75rem; color: var(--color-primary); font-weight: 600;">
                <span>${link.icon} ${link.module}</span>
                <i class="fa-solid fa-arrow-right" style="font-size: 0.7rem;"></i>
              </div>
              <div style="font-size: 0.88rem; font-weight: 600; line-height: 1.3;">${link.title}</div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', initKnowledgeBridge);
})();
