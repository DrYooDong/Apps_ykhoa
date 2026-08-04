/**
 * CliniPortal Physiology - Pathway & Mechanism Viewer
 * Renders interactive pathway steps from physio-pathways.json
 */

window.PhysioPathwayViewer = (function () {
    'use strict';

    async function init(containerId, pathwayId, jsonPath = 'data/physio-pathways.json') {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            const resp = await fetch(jsonPath);
            const data = await resp.json();
            const pathway = (data.pathways || []).find(p => p.id === pathwayId);
            if (pathway) renderPathway(container, pathway);
        } catch (err) {
            console.error('PhysioPathwayViewer fetch error:', err);
        }
    }

    function renderPathway(container, pathway) {
        let html = `
        <div class="pathway-container" style="background: var(--color-surface); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--color-border);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <h3 style="margin:0; color:var(--color-primary);">🔄 ${pathway.name}</h3>
                <span class="quiz-badge">${pathway.category}</span>
            </div>

            <ol class="physio-steps">
                ${pathway.steps.map(s => `
                    <li>
                        <div class="physio-step-card" style="border-left: 4px solid ${s.color || 'var(--color-primary)'};">
                            <span class="physio-step-title" style="color:${s.color || 'var(--color-primary)'}">Bước ${s.step}: ${s.title}</span>
                            <p style="margin:0.25rem 0 0.5rem 0; color:var(--color-text);">${s.desc}</p>
                            ${s.ion_flux ? `<span style="font-size:0.8rem; background:var(--color-primary-hl); padding:2px 8px; border-radius:4px; color:var(--color-primary);">⚡ Dòng ion/Chất: ${s.ion_flux}</span>` : ''}
                        </div>
                    </li>
                `).join('')}
            </ol>
        </div>
        `;

        container.innerHTML = html;
    }

    return {
        init: init
    };
})();
