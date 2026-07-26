/**
 * Physio-Patho Mirror Engine (physio-mirror.js)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Cho phép xem song song (Split-view) hoặc chuyển đổi nhanh giữa Cơ chế Sinh lý Bình thường ↔ Sinh lý bệnh
 */

(function () {
    'use strict';

    function initMirrorEngine() {
        const mirrorTriggers = document.querySelectorAll('[data-mirror-target]');
        if (!mirrorTriggers.length) return;

        createMirrorDrawerHTML();

        mirrorTriggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = btn.getAttribute('data-mirror-target');
                const title = btn.getAttribute('data-mirror-title') || 'Cơ chế bệnh sinh đối chiếu';
                openMirrorDrawer(targetUrl, title);
            });
        });
    }

    function createMirrorDrawerHTML() {
        if (document.getElementById('physio-mirror-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'physio-mirror-overlay';
        overlay.className = 'physio-mirror-overlay';

        overlay.innerHTML = `
            <div class="physio-mirror-drawer">
                <div class="mirror-drawer-header">
                    <div class="mirror-title-group">
                        <span class="mirror-badge">🔄 Physio-Patho Mirror</span>
                        <h3 id="physio-mirror-drawer-title">Đối chiếu Sinh lý ↔ Sinh lý bệnh</h3>
                    </div>
                    <button class="mirror-close-btn" id="physio-mirror-close-btn" aria-label="Đóng">&times;</button>
                </div>
                <div class="mirror-drawer-body">
                    <iframe id="physio-mirror-iframe" src="about:blank" title="Cơ chế bệnh sinh"></iframe>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const closeBtn = document.getElementById('physio-mirror-close-btn');
        closeBtn.addEventListener('click', closeMirrorDrawer);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeMirrorDrawer();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeMirrorDrawer();
            }
        });
    }

    function openMirrorDrawer(url, title) {
        const overlay = document.getElementById('physio-mirror-overlay');
        const iframe = document.getElementById('physio-mirror-iframe');
        const titleEl = document.getElementById('physio-mirror-drawer-title');

        if (!overlay || !iframe) return;

        titleEl.textContent = title;
        iframe.src = url;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMirrorDrawer() {
        const overlay = document.getElementById('physio-mirror-overlay');
        const iframe = document.getElementById('physio-mirror-iframe');

        if (!overlay) return;

        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            if (iframe) iframe.src = 'about:blank';
        }, 300);
    }

    document.addEventListener('DOMContentLoaded', initMirrorEngine);
    window.openPhysioMirror = openMirrorDrawer;
})();
