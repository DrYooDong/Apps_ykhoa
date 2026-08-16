/**
 * Homepage Widgets & Live Clinical Search (homepage-widgets.ts)
 * Path: src/dashboard/homepage-widgets.ts
 */

export interface SearchIndexItem {
  title: string;
  category: string;
  url: string;
  keywords: string;
}

export const HOMEPAGE_SEARCH_INDEX: SearchIndexItem[] = [
  { title: "Tra cứu mã ICD-10 nhanh", category: "Công cụ", url: "#/calculators/tra-cuu-icd10", keywords: "icd10, icd 10, ma benh, tra cuu" },
  { title: "Sốc nhiễm khuẩn (Sepsis) & Phác đồ kháng sinh", category: "Cấp cứu", url: "#/calculators/sepsis-studio", keywords: "sot cao, tut huyet ap, soc nhiem khuan, sepsis" },
  { title: "Đọc Điện tâm đồ ECG cơ bản & Nâng cao", category: "Kỹ năng", url: "#/skills/ecg-studio", keywords: "ecg, dien tam do, tim, nhip tim" },
  { title: "Khí máu động mạch (ABG) & Toan kiềm", category: "Công cụ", url: "#/calculators/khi-mau-dong-mach", keywords: "khi mau dong mach, toan kiem, ph, abg" },
  { title: "Y học chứng cứ & PICO / NNT Lab", category: "Chứng cứ", url: "#/ebm", keywords: "ebm, pico, nnt, forest plot" }
];

export function initHomepageWidgets(): void {
  const searchInput = document.getElementById('cmdSearchInput') as HTMLInputElement | null;
  const resultsContainer = document.getElementById('cmdResults');

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const q = (e.target as HTMLInputElement).value.toLowerCase().trim();
      if (!q) {
        resultsContainer.innerHTML = '';
        return;
      }

      const matches = HOMEPAGE_SEARCH_INDEX.filter(item => 
        item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
      );

      resultsContainer.innerHTML = matches.map(m => `
        <a href="${m.url}" class="cmd-result-item" style="display:block; padding:10px; border-bottom:1px solid var(--color-divider); text-decoration:none; color:var(--color-text);">
          <span style="font-weight:700;">${m.title}</span>
          <span style="font-size:0.75rem; color:var(--color-text-muted); margin-left:8px;">[${m.category}]</span>
        </a>
      `).join('');
    });
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomepageWidgets);
  } else {
    initHomepageWidgets();
  }
}
