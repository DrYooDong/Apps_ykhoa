const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '../src/content/ebm/guidelines/guidelines.html');
const outPath = path.join(__dirname, '../src/content/ebm/guidelines/guidelines-view.ts');

const rawHtml = fs.readFileSync(htmlPath, 'utf8');
const lines = rawHtml.split('\n');

// Find start and end of body content
const startIndex = lines.findIndex(l => l.includes('<!-- TOP NAV -->'));
const endIndex = lines.findIndex(l => l.includes('<!-- Load ICD-10 Data -->'));

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find slice markers!');
  process.exit(1);
}

const bodySlice = lines.slice(startIndex, endIndex);
let bodyHtml = bodySlice.join('\n');

// Replace back links for SPA router
bodyHtml = bodyHtml.replaceAll('href="../yhcc.html"', 'href="#/ebm"');
bodyHtml = bodyHtml.replaceAll('href="../guideline-radar/radar.html"', 'href="#/ebm/guideline-radar"');

// Use JSON.stringify so that all characters, newlines, quotes and special symbols in HTML are 100% validly escaped
const jsonEscapedBody = JSON.stringify(bodyHtml);

const tsContent = `/**
 * CliniPortal 2.0 — Guidelines & Evidence Directory SPA View (TypeScript)
 * Path: src/content/ebm/guidelines/guidelines-view.ts
 * 
 * Synchronized with 100% full original UI layout & interactive modules
 * of guidelines.html and guidelines.js
 */

import './guidelines.css';
import './css/journal-quality.css';
import './css/guidelines-dashboard.css';

const GUIDELINES_HTML_SHELL: string = ${jsonEscapedBody};

export function renderGuidelinesView(): string {
  return \`
    <div class="guidelines-spa-wrapper animate-fade-in" style="width: 100%; min-height: 100vh;">
      \${GUIDELINES_HTML_SHELL}
    </div>
  \`;
}

/**
 * Danh sách các script phụ thuộc của Guidelines Hub
 */
const GUIDELINE_SCRIPTS: string[] = [
  'src/content/ebm/guidelines/guidelinesdata.js',
  'src/content/ebm/guidelines/data/predatory-blacklist.js',
  'src/content/ebm/guidelines/js/openalex-service.js',
  'src/content/ebm/guidelines/js/journal-trust-scorer.js',
  'src/content/ebm/guidelines/js/guideline-sync.js',
  'src/content/ebm/guidelines/js/guideline-charts-engine.js',
  'src/content/ebm/guidelines/js/guideline-table.js',
  'src/content/ebm/guidelines/js/guideline-modals.js',
  'src/content/ebm/guidelines/js/drug-linker.js',
  'src/content/ebm/guidelines/js/guideline-visualizations.js',
  'src/content/ebm/guidelines/js/guideline-evidence-analytics.js',
  'src/content/ebm/guidelines/js/guideline-cmd-palette.js',
  'src/content/ebm/guidelines/js/guideline-cdss.js',
  'src/content/ebm/guidelines/js/guideline-compare-matrix.js',
  'src/content/ebm/guidelines/js/guideline-tools.js',
  'src/content/ebm/guidelines/guidelines.js'
];

/**
 * Tải động các script phụ thuộc nếu chưa có trên DOM
 */
async function loadScriptSequentially(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(\`script[src="\${src}"]\`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      console.warn(\`[Guidelines] Failed to load script: \${src}\`);
      resolve();
    };
    document.body.appendChild(script);
  });
}

/**
 * Khởi tạo toàn bộ tương tác và dữ liệu của Guidelines Hub khi mount vào SPA
 */
export async function initGuidelinesHub(): Promise<void> {
  // 1. Tải tuần tự các module script
  for (const src of GUIDELINE_SCRIPTS) {
    await loadScriptSequentially(src);
  }

  // 2. Khởi tạo trạng thái Sidebar & Dữ liệu
  if (typeof (window as any).initSidebarState === 'function') {
    (window as any).initSidebarState();
  }

  if (typeof (window as any).loadStudies === 'function') {
    (window as any).loadStudies();
  }

  if (typeof (window as any).renderFilterPills === 'function') {
    (window as any).renderFilterPills();
  }

  if (typeof (window as any).renderTable === 'function') {
    (window as any).renderTable();
  }

  if (typeof (window as any).renderUpdates === 'function') {
    (window as any).renderUpdates();
  }

  // 3. Gắn lắng nghe ô tìm kiếm
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  if (searchInput && typeof (window as any).handleSearch === 'function') {
    searchInput.oninput = (window as any).handleSearch;
  }

  // 4. Gắn lắng nghe NNT Calculator
  const nntCer = document.getElementById('nnt-cer-input') as HTMLInputElement | null;
  const nntEer = document.getElementById('nnt-eer-input') as HTMLInputElement | null;
  if (nntCer && typeof (window as any).calculateNNT === 'function') {
    nntCer.oninput = (window as any).calculateNNT;
  }
  if (nntEer && typeof (window as any).calculateNNT === 'function') {
    nntEer.oninput = (window as any).calculateNNT;
  }

  // 5. Gắn lắng nghe phím tắt ESC & Alt+S
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (typeof (window as any).closeAddModal === 'function') (window as any).closeAddModal();
      if (typeof (window as any).closeImportModal === 'function') (window as any).closeImportModal();
      if (typeof (window as any).closeSupabaseModal === 'function') (window as any).closeSupabaseModal();
      if (typeof (window as any).closeSubgroupModal === 'function') (window as any).closeSubgroupModal();
      const icdModal = document.getElementById('icd10-modal');
      if (icdModal) icdModal.classList.remove('active');
    }
    if (e.altKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      if (typeof (window as any).toggleSidebar === 'function') {
        (window as any).toggleSidebar();
      }
    }
  });

  // 6. Gắn lắng nghe click bên ngoài để đóng modal và dropdown
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        (overlay as HTMLElement).classList.remove('active');
      }
    });
  });
}
`;

fs.writeFileSync(outPath, tsContent, 'utf8');
console.log('Successfully generated guidelines-view.ts with full UI shell!');
