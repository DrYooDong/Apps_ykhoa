/**
 * Physio Clinical Bridge Engine (physio-clinical-bridge.js)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Tự động kết nối bài học sinh lý với Công cụ lâm sàng, Dược lý, Kỹ năng và Tiếp cận triệu chứng
 */

(function () {
    'use strict';

    // Map of common keywords to CliniPortal cross-module links
    const CLINICAL_CROSS_MAP = [
        {
            keywords: ['huyết áp', 'RAAS', 'renin', 'angiotensin', 'aldosterone'],
            title: 'Điều hòa Huyết áp & RAAS',
            links: [
                { icon: '⚙️', text: 'Công cụ: Máy tính Huyết áp động mạch trung bình (MAP)', url: '../../../../pages/Công cụ/' },
                { icon: '💊', text: 'Dược lý: Thuốc ức chế men chuyển & ARB', url: '../../../../pages/Dược lý/Chuyên khoa/DL_Timmach.html' },
                { icon: '🤒', text: 'Tiếp cận: Cơn tăng huyết áp cấp cứu', url: '../../../../pages/Tiếp cận/2. Triệu chứng/' }
            ]
        },
        {
            keywords: ['lọc cầu thận', 'GFR', 'thận', 'nephron', 'creatinine'],
            title: 'Chức năng Thận & Lọc Cầu thận',
            links: [
                { icon: '⚙️', text: 'Công cụ: Tính mức lọc cầu thận eGFR (CKD-EPI)', url: '../../../../pages/Công cụ/' },
                { icon: '🩺', text: 'Cơ chế bệnh sinh: Tổn thương thận cấp (AKI)', url: '../../SLB_CCBS/SLB_CCBS_AKI.html' },
                { icon: '🩺', text: 'Cơ chế bệnh sinh: Bệnh thận mạn (CKD)', url: '../../SLB_CCBS/SLB_CCBS_CKD.html' }
            ]
        },
        {
            keywords: ['ECG', 'điện tâm đồ', 'điện thế hoạt động cơ tim', 'chu kỳ tim'],
            title: 'Điện học Tim & Điện tâm đồ',
            links: [
                { icon: '⚙️', text: 'Công cụ: ECG Studio Interactive Trainer', url: '../../../../pages/Công cụ/' },
                { icon: '🩺', text: 'Cơ chế bệnh sinh: Hội chứng vành cấp (ACS)', url: '../../SLB_CCBS/SLB_CCBS_ACS.html' },
                { icon: '🩺', text: 'Kỹ năng: Đọc Điện tâm đồ cơ bản', url: '../../../../pages/Kỹ năng/' }
            ]
        },
        {
            keywords: ['trao đổi khí', 'phế nang', 'oxy', 'co2', 'thông khí', 'phổi'],
            title: 'Hô hấp & Khí máu',
            links: [
                { icon: '⚙️', text: 'Công cụ: Phân tích Khí máu động mạch (ABG)', url: '../../../../pages/Công cụ/' },
                { icon: '🩺', text: 'Cơ chế bệnh sinh: COPD & Bệnh phổi tắc nghẽn', url: '../../SLB_CCBS/SLB_CCBS_COPD.html' },
                { icon: '💊', text: 'Dược lý: Thuốc giãn phế quản & Corticoid xịt', url: '../../../../pages/Dược lý/' }
            ]
        }
    ];

    function initClinicalBridge() {
        const article = document.querySelector('.physio-article') || document.querySelector('.physio-content');
        if (!article) return;

        const textContent = article.textContent.toLowerCase();

        // Match applicable bridge topics
        const matchedTopics = CLINICAL_CROSS_MAP.filter(topic =>
            topic.keywords.some(kw => textContent.includes(kw.toLowerCase()))
        );

        if (!matchedTopics.length) return;

        renderBridgePanel(article, matchedTopics);
    }

    function renderBridgePanel(articleContainer, topics) {
        const bridgeCard = document.createElement('div');
        bridgeCard.className = 'physio-clinical-bridge-card';

        let linksListHTML = '';
        topics.forEach(topic => {
            topic.links.forEach(link => {
                linksListHTML += `
                    <li>
                        <a href="${link.url}" class="bridge-link-item">
                            <span class="bridge-icon">${link.icon}</span>
                            <span class="bridge-text">${link.text}</span>
                            <i class="fa-solid fa-chevron-right bridge-arrow"></i>
                        </a>
                    </li>
                `;
            });
        });

        bridgeCard.innerHTML = `
            <div class="bridge-card-header">
                <span class="bridge-badge">🔗 Cầu Nối Lâm Sàng (Clinical Bridge)</span>
                <h4>Ứng Dụng Thực Hành & Liên Kết Phân Hệ</h4>
            </div>
            <ul class="bridge-links-list">
                ${linksListHTML}
            </ul>
        `;

        articleContainer.appendChild(bridgeCard);
    }

    document.addEventListener('DOMContentLoaded', initClinicalBridge);
})();
