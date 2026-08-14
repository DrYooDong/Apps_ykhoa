/**
 * Physio Clinical Bridge Engine (physio-clinical-bridge.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Tự động kết nối bài học sinh lý với Công cụ lâm sàng, Dược lý, Kỹ năng và Tiếp cận triệu chứng
 */

export interface BridgeLink {
  icon: string;
  text: string;
  url: string;
}

export interface ClinicalCrossTopic {
  keywords: string[];
  title: string;
  links: BridgeLink[];
}

export const CLINICAL_CROSS_MAP: ClinicalCrossTopic[] = [
  {
    keywords: ['huyết áp', 'RAAS', 'renin', 'angiotensin', 'aldosterone'],
    title: 'Điều hòa Huyết áp & RAAS',
    links: [
      { icon: '⚙️', text: 'Công cụ: Máy tính Huyết áp động mạch trung bình (MAP)', url: '../../../../src/content/calculators/' },
      { icon: '💊', text: 'Dược lý: Tra cứu Dược lý Lâm sàng', url: '../../../../src/content/pharmacology/duoc-ly.html' },
      { icon: '🤒', text: 'Tiếp cận: Cơn tăng huyết áp cấp cứu', url: '../../../../src/content/approaches/symptoms/' }
    ]
  },
  {
    keywords: ['lọc cầu thận', 'GFR', 'thận', 'nephron', 'creatinine'],
    title: 'Chức năng Thận & Lọc Cầu thận',
    links: [
      { icon: '⚙️', text: 'Công cụ: Tính mức lọc cầu thận eGFR (CKD-EPI)', url: '../../../../src/content/calculators/' },
      { icon: '🩺', text: 'Cơ chế bệnh sinh: Tổn thương thận cấp (AKI)', url: '../../SLB_CCBS/SLB_CCBS_AKI.html' },
      { icon: '🩺', text: 'Cơ chế bệnh sinh: Bệnh thận mạn (CKD)', url: '../../SLB_CCBS/SLB_CCBS_CKD.html' }
    ]
  },
  {
    keywords: ['ECG', 'điện tâm đồ', 'điện thế hoạt động cơ tim', 'chu kỳ tim'],
    title: 'Điện học Tim & Điện tâm đồ',
    links: [
      { icon: '⚙️', text: 'Công cụ: ECG Studio Interactive Trainer', url: '../../../../src/content/calculators/' },
      { icon: '🩺', text: 'Cơ chế bệnh sinh: Hội chứng vành cấp (ACS)', url: '../../SLB_CCBS/SLB_CCBS_ACS.html' },
      { icon: '🩺', text: 'Kỹ năng: Đọc Điện tâm đồ cơ bản', url: '../../../../src/content/skills/' }
    ]
  },
  {
    keywords: ['trao đổi khí', 'phế nang', 'oxy', 'co2', 'thông khí', 'phổi'],
    title: 'Hô hấp & Khí máu',
    links: [
      { icon: '⚙️', text: 'Công cụ: Phân tích Khí máu động mạch (ABG)', url: '../../../../src/content/calculators/' },
      { icon: '🩺', text: 'Cơ chế bệnh sinh: COPD & Bệnh phổi tắc nghẽn', url: '../../SLB_CCBS/SLB_CCBS_COPD.html' },
      { icon: '💊', text: 'Dược lý: Thuốc giãn phế quản & Corticoid xịt', url: '../../../../src/content/pharmacology/' }
    ]
  }
];

export function initClinicalBridge(): void {
  const article = document.querySelector('.physio-article') || document.querySelector('.physio-content');
  if (!article) return;

  const textContent = (article.textContent || '').toLowerCase();

  // Match applicable bridge topics
  const matchedTopics = CLINICAL_CROSS_MAP.filter(topic =>
    topic.keywords.some(kw => textContent.includes(kw.toLowerCase()))
  );

  if (!matchedTopics.length) return;

  renderBridgePanel(article, matchedTopics);
}

export function renderBridgePanel(articleContainer: Element, topics: ClinicalCrossTopic[]): void {
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

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initClinicalBridge);
}
