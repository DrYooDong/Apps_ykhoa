/**
 * ICD-10 Picker & Clinical Navigation Hub V2 - DocSpace
 * Công cụ tìm kiếm mã ICD-10 & Trung tâm Điều hướng Lâm sàng (Disease Command Center)
 * Tích hợp Cơ sở dữ liệu ICD-10 Nhúng Offline, Tìm kiếm Tiếng Việt không dấu & Gắn kết Order Sets vào SOAP
 */

import { findOrderSetByIcd, OrderSet } from '../data/disease-order-sets';
import { escapeHtml } from '../docspace-view';

export interface IcdRecord {
  code: string;
  name: string;
  nameEn?: string;
  chapter?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CƠ SỞ DỮ LIỆU ICD-10 NHÚNG SẴN (CORE EMBEDDED DATABASE) ĐẢM BẢO OFFLINE 100%
// ─────────────────────────────────────────────────────────────────────────────

export const CORE_ICD10_DATABASE: IcdRecord[] = [
  // --- CHƯƠNG IX: BỆNH HỆ TUẦN HOÀN (I00 - I99) ---
  { code: 'I10', name: 'Tăng huyết áp vô căn (nguyên phát)', nameEn: 'Essential (primary) hypertension', chapter: 'Tim mạch' },
  { code: 'I11', name: 'Bệnh tim do tăng huyết áp', nameEn: 'Hypertensive heart disease', chapter: 'Tim mạch' },
  { code: 'I12', name: 'Bệnh thận do tăng huyết áp', nameEn: 'Hypertensive renal disease', chapter: 'Tim mạch' },
  { code: 'I15', name: 'Tăng huyết áp thứ phát', nameEn: 'Secondary hypertension', chapter: 'Tim mạch' },
  { code: 'I20', name: 'Cơn đau thắt ngực', nameEn: 'Angina pectoris', chapter: 'Tim mạch' },
  { code: 'I20.0', name: 'Cơn đau thắt ngực không ổn định', nameEn: 'Unstable angina', chapter: 'Tim mạch' },
  { code: 'I21', name: 'Nhồi máu cơ tim cấp', nameEn: 'Acute myocardial infarction', chapter: 'Tim mạch' },
  { code: 'I21.0', name: 'Nhồi máu cơ tim cấp ST chênh lên (STEMI) thành trước', nameEn: 'STEMI anterior wall', chapter: 'Tim mạch' },
  { code: 'I21.1', name: 'Nhồi máu cơ tim cấp ST chênh lên (STEMI) thành dưới', nameEn: 'STEMI inferior wall', chapter: 'Tim mạch' },
  { code: 'I21.4', name: 'Nhồi máu cơ tim cấp không ST chênh lên (NSTEMI)', nameEn: 'Non-ST elevation myocardial infarction', chapter: 'Tim mạch' },
  { code: 'I25', name: 'Bệnh tim thiếu máu cục bộ mạn tính (Bệnh mạch vành mạn)', nameEn: 'Chronic ischemic heart disease', chapter: 'Tim mạch' },
  { code: 'I26', name: 'Thuyên tắc động mạch phổi (PE)', nameEn: 'Pulmonary embolism', chapter: 'Tim mạch' },
  { code: 'I48', name: 'Rung nhĩ và cuồng nhĩ', nameEn: 'Atrial fibrillation and flutter', chapter: 'Tim mạch' },
  { code: 'I49', name: 'Loạn nhịp tim khác', nameEn: 'Other cardiac arrhythmias', chapter: 'Tim mạch' },
  { code: 'I50', name: 'Suy tim', nameEn: 'Heart failure', chapter: 'Tim mạch' },
  { code: 'I50.0', name: 'Suy tim sung huyết / Suy tim ứ huyết', nameEn: 'Congestive heart failure', chapter: 'Tim mạch' },
  { code: 'I50.1', name: 'Suy thất trái (Suy tim phân suất tống máu giảm - HFrEF)', nameEn: 'Left ventricular failure', chapter: 'Tim mạch' },
  { code: 'I63', name: 'Nhồi máu não (Đột quỵ thiếu máu cục bộ cấp)', nameEn: 'Cerebral infarction', chapter: 'Thần kinh' },
  { code: 'I61', name: 'Xuất huyết trong não (Đột quỵ xuất huyết não)', nameEn: 'Intracerebral hemorrhage', chapter: 'Thần kinh' },
  { code: 'I64', name: 'Đột quỵ, không xác định là xuất huyết hay nhồi máu', nameEn: 'Stroke, not specified', chapter: 'Thần kinh' },
  { code: 'I80', name: 'Viêm tĩnh mạch và huyết khối tĩnh mạch sâu (DVT)', nameEn: 'Phlebitis and thrombophlebitis', chapter: 'Tim mạch' },

  // --- CHƯƠNG X: BỆNH HỆ HÔ HẤP (J00 - J99) ---
  { code: 'J00', name: 'Viêm mũi họng cấp (Cảm lạnh thông thường)', nameEn: 'Acute nasopharyngitis [common cold]', chapter: 'Hô hấp' },
  { code: 'J02', name: 'Viêm họng cấp', nameEn: 'Acute pharyngitis', chapter: 'Hô hấp' },
  { code: 'J03', name: 'Viêm amydal cấp', nameEn: 'Acute tonsillitis', chapter: 'Hô hấp' },
  { code: 'J06', name: 'Nhiễm trùng đường hô hấp trên cấp tính', nameEn: 'Acute upper respiratory infections', chapter: 'Hô hấp' },
  { code: 'J12', name: 'Viêm phổi do virus', nameEn: 'Viral pneumonia', chapter: 'Hô hấp' },
  { code: 'J13', name: 'Viêm phổi do Phế cầu khuẩn (Streptococcus pneumoniae)', nameEn: 'Pneumonia due to Streptococcus pneumoniae', chapter: 'Hô hấp' },
  { code: 'J15', name: 'Viêm phổi do vi khuẩn khác', nameEn: 'Bacterial pneumonia', chapter: 'Hô hấp' },
  { code: 'J18', name: 'Viêm phổi, tác nhân không xác định (Viêm phổi mắc phải cộng đồng - CAP)', nameEn: 'Pneumonia, organism unspecified', chapter: 'Hô hấp' },
  { code: 'J20', name: 'Viêm phế quản cấp', nameEn: 'Acute bronchitis', chapter: 'Hô hấp' },
  { code: 'J44', name: 'Bệnh phổi tắc nghẽn mạn tính khác (COPD)', nameEn: 'Other chronic obstructive pulmonary disease', chapter: 'Hô hấp' },
  { code: 'J44.0', name: 'Bệnh phổi tắc nghẽn mạn tính có nhiễm trùng hô hấp cấp', nameEn: 'COPD with acute lower respiratory infection', chapter: 'Hô hấp' },
  { code: 'J44.1', name: 'Bệnh phổi tắc nghẽn mạn tính có đợt kịch phát cấp (Đợt cấp COPD)', nameEn: 'COPD with acute exacerbation', chapter: 'Hô hấp' },
  { code: 'J45', name: 'Hen phế quản (Suyễn)', nameEn: 'Asthma', chapter: 'Hô hấp' },
  { code: 'J80', name: 'Hội chứng suy hô hấp cấp tiến triển (ARDS)', nameEn: 'Adult respiratory distress syndrome', chapter: 'Hô hấp - Hồi sức' },
  { code: 'J81', name: 'Phù phổi cấp', nameEn: 'Pulmonary edema', chapter: 'Hô hấp - Hồi sức' },
  { code: 'J90', name: 'Tràn dịch màng phổi', nameEn: 'Pleural effusion', chapter: 'Hô hấp' },
  { code: 'J93', name: 'Tràn khí màng phổi', nameEn: 'Pneumothorax', chapter: 'Hô hấp' },

  // --- CHƯƠNG IV: BỆNH NỘI TIẾT, DINH DƯỠNG & CHUYỂN HÓA (E00 - E90) ---
  { code: 'E10', name: 'Đái tháo đường phụ thuộc Insulin (ĐTĐ Típ 1)', nameEn: 'Type 1 diabetes mellitus', chapter: 'Nội tiết' },
  { code: 'E11', name: 'Đái tháo đường không phụ thuộc Insulin (ĐTĐ Típ 2)', nameEn: 'Type 2 diabetes mellitus', chapter: 'Nội tiết' },
  { code: 'E11.0', name: 'Đái tháo đường Típ 2 có hôn mê (Tăng áp lực thẩm thấu / Nhiễm toan Ceton)', nameEn: 'Type 2 DM with coma', chapter: 'Nội tiết' },
  { code: 'E11.2', name: 'Đái tháo đường Típ 2 có biến chứng thận (Bệnh thận do ĐTĐ)', nameEn: 'Type 2 DM with renal complications', chapter: 'Nội tiết' },
  { code: 'E11.5', name: 'Đái tháo đường Típ 2 có biến chứng tuần hoàn ngoại vi', nameEn: 'Type 2 DM with peripheral circulatory complications', chapter: 'Nội tiết' },
  { code: 'E05', name: 'Nhiễm độc giáp (Cường giáp / Basedow)', nameEn: 'Thyrotoxicosis [hyperthyroidism]', chapter: 'Nội tiết' },
  { code: 'E03', name: 'Suy giáp khác', nameEn: 'Other hypothyroidism', chapter: 'Nội tiết' },
  { code: 'E78', name: 'Rối loạn chuyển hóa lipoprotein và tình trạng tăng lipid máu khác', nameEn: 'Disorders of lipoprotein metabolism', chapter: 'Nội tiết' },
  { code: 'E87.0', name: 'Tăng áp lực thẩm thấu và tăng Natri máu', nameEn: 'Hyperosmolality and hypernatremia', chapter: 'Nội tiết - Hồi sức' },
  { code: 'E87.1', name: 'Hạ Natri máu', nameEn: 'Hypo-osmolality and hyponatremia', chapter: 'Nội tiết - Hồi sức' },
  { code: 'E87.5', name: 'Tăng Kali máu', nameEn: 'Hyperkalemia', chapter: 'Nội tiết - Hồi sức' },
  { code: 'E87.6', name: 'Hạ Kali máu', nameEn: 'Hypokalemia', chapter: 'Nội tiết - Hồi sức' },

  // --- CHƯƠNG XI: BỆNH HỆ TIÊU HÓA (K00 - K93) ---
  { code: 'K21', name: 'Bệnh trào ngược dạ dày - thực quản (GERD)', nameEn: 'Gastro-esophageal reflux disease', chapter: 'Tiêu hóa' },
  { code: 'K25', name: 'Loét dạ dày', nameEn: 'Gastric ulcer', chapter: 'Tiêu hóa' },
  { code: 'K26', name: 'Loét tá tràng', nameEn: 'Duodenal ulcer', chapter: 'Tiêu hóa' },
  { code: 'K29', name: 'Viêm dạ dày và tá tràng', nameEn: 'Gastritis and duodenitis', chapter: 'Tiêu hóa' },
  { code: 'K35', name: 'Viêm ruột thừa cấp', nameEn: 'Acute appendicitis', chapter: 'Ngoại tiêu hóa' },
  { code: 'K58', name: 'Hội chứng ruột kích thích (IBS)', nameEn: 'Irritable bowel syndrome', chapter: 'Tiêu hóa' },
  { code: 'K70', name: 'Bệnh gan do rượu', nameEn: 'Alcoholic liver disease', chapter: 'Tiêu hóa - Gan mật' },
  { code: 'K74', name: 'Xơ gan và xơ hóa gan', nameEn: 'Fibrosis and cirrhosis of liver', chapter: 'Tiêu hóa - Gan mật' },
  { code: 'K80', name: 'Sỏi mật (Sỏi túi mật, sỏi đường mật)', nameEn: 'Cholelithiasis', chapter: 'Tiêu hóa - Gan mật' },
  { code: 'K81', name: 'Viêm túi mật', nameEn: 'Cholecystitis', chapter: 'Tiêu hóa - Gan mật' },
  { code: 'K85', name: 'Viêm tụy cấp', nameEn: 'Acute pancreatitis', chapter: 'Tiêu hóa' },
  { code: 'K92.0', name: 'Nôn ra máu', nameEn: 'Hematemesis', chapter: 'Tiêu hóa' },
  { code: 'K92.1', name: 'Đi cầu phân đen (Melena)', nameEn: 'Melena', chapter: 'Tiêu hóa' },
  { code: 'K92.2', name: 'Xuất huyết tiêu hóa, không xác định', nameEn: 'Gastrointestinal hemorrhage, unspecified', chapter: 'Tiêu hóa' },

  // --- CHƯƠNG XIV: BỆNH HỆ TIẾT NIỆU - SINH DỤC (N00 - N99) ---
  { code: 'N17', name: 'Tổn thương thận cấp / Suy thận cấp (AKI)', nameEn: 'Acute kidney injury', chapter: 'Thận' },
  { code: 'N18', name: 'Bệnh thận mạn tính (CKD)', nameEn: 'Chronic kidney disease', chapter: 'Thận' },
  { code: 'N18.3', name: 'Bệnh thận mạn tính giai đoạn 3 (CKD G3)', nameEn: 'Chronic kidney disease, stage 3', chapter: 'Thận' },
  { code: 'N18.4', name: 'Bệnh thận mạn tính giai đoạn 4 (CKD G4)', nameEn: 'Chronic kidney disease, stage 4', chapter: 'Thận' },
  { code: 'N18.5', name: 'Bệnh thận mạn tính giai đoạn 5 (Suy thận mạn giai đoạn cuối - ESRD)', nameEn: 'Chronic kidney disease, stage 5', chapter: 'Thận' },
  { code: 'N20', name: 'Sỏi thận và sỏi niệu quản', nameEn: 'Calculus of kidney and ureter', chapter: 'Thận - Tiết niệu' },
  { code: 'N39.0', name: 'Nhiễm trùng đường tiết niệu (UTI)', nameEn: 'Urinary tract infection', chapter: 'Thận - Tiết niệu' },

  // --- CHƯƠNG I: BỆNH NHIỄM TRÙNG & KÝ SINH TRÙNG (A00 - B99) ---
  { code: 'A09', name: 'Tiêu chảy và viêm dạ dày ruột do nhiễm trùng', nameEn: 'Infectious gastroenteritis and colitis', chapter: 'Truyền nhiễm' },
  { code: 'A41', name: 'Nhiễm khuẩn huyết khác (Sepsis)', nameEn: 'Other sepsis', chapter: 'Truyền nhiễm - Hồi sức' },
  { code: 'A41.9', name: 'Nhiễm khuẩn huyết không xác định (Sepsis)', nameEn: 'Sepsis, unspecified', chapter: 'Truyền nhiễm - Hồi sức' },
  { code: 'A90', name: 'Sốt Dengue cổ điển', nameEn: 'Dengue fever', chapter: 'Truyền nhiễm' },
  { code: 'A91', name: 'Sốt xuất huyết Dengue (DHF)', nameEn: 'Dengue hemorrhagic fever', chapter: 'Truyền nhiễm' },
  { code: 'B18.1', name: 'Viêm gan virus B mạn tính', nameEn: 'Chronic viral hepatitis B', chapter: 'Truyền nhiễm' },
  { code: 'B18.2', name: 'Viêm gan virus C mạn tính', nameEn: 'Chronic viral hepatitis C', chapter: 'Truyền nhiễm' },

  // --- CHƯƠNG XIII: BỆNH HỆ CƠ XƯƠNG KHỚP & MÔ LIÊN KẾT (M00 - M99) ---
  { code: 'M05', name: 'Viêm khớp dạng thấp có yếu tố dạng thấp (+)', nameEn: 'Seropositive rheumatoid arthritis', chapter: 'Khớp - Miễn dịch' },
  { code: 'M06', name: 'Viêm khớp dạng thấp khác', nameEn: 'Other rheumatoid arthritis', chapter: 'Khớp - Miễn dịch' },
  { code: 'M10', name: 'Bệnh Gút (Gout)', nameEn: 'Gout', chapter: 'Khớp' },
  { code: 'M15', name: 'Thoái hóa đa khớp', nameEn: 'Polyosteoarthritis', chapter: 'Khớp' },
  { code: 'M17', name: 'Thoái hóa khớp gối', nameEn: 'Gonarthrosis [arthrosis of knee]', chapter: 'Khớp' },
  { code: 'M32', name: 'Lupus ban đỏ hệ thống (SLE)', nameEn: 'Systemic lupus erythematosus', chapter: 'Miễn dịch' },
  { code: 'M54.5', name: 'Đau thắt lưng (Đau lưng dưới)', nameEn: 'Low back pain', chapter: 'Cơ xương khớp' }
];

function removeVietnameseAccents(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export class IcdPicker {
  private modalEl: HTMLElement;
  private targetInputId: string = 'esAAssessment';
  private searchInput: HTMLInputElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  private debounceTimer: number | null = null;
  private fullIcdList: IcdRecord[] = CORE_ICD10_DATABASE;

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalIcdPicker';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1060';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(4px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });
  }

  public async open(targetInputId: string = 'esAAssessment') {
    this.targetInputId = targetInputId;
    this.renderSearchMode();
    this.modalEl.style.display = 'flex';

    await this.loadIcdData();
    
    if (this.searchInput) {
      this.searchInput.focus();
      this.search(this.searchInput.value || '');
    }
  }

  public close() {
    this.modalEl.style.display = 'none';
    this.modalEl.innerHTML = '';
  }

  private renderSearchMode() {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); color:var(--color-text, #0f172a); width:100%; max-width:850px; max-height:88vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border:1px solid var(--color-border);">
        
        <!-- Header -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:34px; height:34px; border-radius:8px; background:linear-gradient(135deg, #0284c7, #0ea5e9); color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
              <i class="fa-solid fa-list-ol"></i>
            </div>
            <div>
              <h3 style="margin:0; font-size:16px; color:var(--color-primary); font-weight:800; display:flex; align-items:center; gap:8px;">
                Kho Tra Cứu ICD-10 &amp; Disease Order Sets
              </h3>
              <p style="margin:2px 0 0 0; font-size:11.5px; color:var(--color-text-muted);">Tìm kiếm không dấu tiếng Việt, tự động gắn kết Phác đồ điều trị, Thang điểm &amp; Thuốc gợi ý</p>
            </div>
          </div>
          <button id="btnCloseIcdPicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <!-- Search Bar -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); background:var(--color-surface);">
          <div style="position:relative;">
            <i class="fa-solid fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:14px;"></i>
            <input type="text" id="icdSearchInput" class="dsp-input" placeholder="Gõ tên bệnh có dấu / không dấu hoặc mã ICD (VD: viem phoi, suy tim, tang huyet ap, I10, E11, J18)..." style="width:100%; padding-left:42px; min-height:42px; font-size:13.5px;" />
          </div>
        </div>

        <!-- Results List -->
        <div id="icdResults" style="padding:0; overflow-y:auto; flex:1; background:var(--color-bg);">
          <div style="text-align:center; padding:40px; color:var(--color-text-muted);">Đang hiển thị danh mục bệnh phổ biến...</div>
        </div>
      </div>
    `;

    document.getElementById('btnCloseIcdPicker')?.addEventListener('click', () => this.close());

    this.searchInput = document.getElementById('icdSearchInput') as HTMLInputElement;
    this.resultsContainer = document.getElementById('icdResults');

    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        if (this.debounceTimer) clearTimeout(this.debounceTimer);
        this.debounceTimer = window.setTimeout(() => this.search(this.searchInput!.value), 150);
      });
    }
  }

  private async loadIcdData() {
    if ((window as any).ICD10_DB && Array.isArray((window as any).ICD10_DB)) {
      this.fullIcdList = (window as any).ICD10_DB;
      return;
    }

    const candidatePaths = [
      'src/content/approaches/data/icd10-db.json',
      './src/content/approaches/data/icd10-db.json',
      '../src/content/approaches/data/icd10-db.json'
    ];

    for (const path of candidatePaths) {
      try {
        const resp = await fetch(path);
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data.length > 0) {
            (window as any).ICD10_DB = data;
            this.fullIcdList = data;
            return;
          }
        }
      } catch {
        // Fallback to embedded
      }
    }

    // Default fallback to Core Database
    this.fullIcdList = CORE_ICD10_DATABASE;
  }

  private search(query: string) {
    if (!this.resultsContainer) return;

    const rawQ = query.trim().toLowerCase();
    const cleanQ = removeVietnameseAccents(query);

    let results = this.fullIcdList;

    if (rawQ) {
      results = this.fullIcdList.filter(item => {
        const codeMatch = item.code.toLowerCase().includes(rawQ);
        const nameRawMatch = item.name && item.name.toLowerCase().includes(rawQ);
        const nameCleanMatch = item.name && removeVietnameseAccents(item.name).includes(cleanQ);
        const nameEnMatch = item.nameEn && item.nameEn.toLowerCase().includes(rawQ);
        return codeMatch || nameRawMatch || nameCleanMatch || nameEnMatch;
      });
    }

    const displayList = results.slice(0, 60);

    if (displayList.length === 0) {
      this.resultsContainer.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--color-text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size:32px; margin-bottom:8px; opacity:0.5;"></i>
          <div>Không tìm thấy mã bệnh khớp với từ khóa "<strong>${escapeHtml(query)}</strong>".</div>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        ${displayList.map((r, idx) => this.renderItem(r, idx)).join('')}
      </div>
    `;

    displayList.forEach((r, idx) => {
      document.getElementById(`icd-item-${idx}`)?.addEventListener('click', () => {
        this.handleSelectRecord(r);
      });
    });
  }

  private renderItem(r: IcdRecord, idx: number): string {
    const orderSet = findOrderSetByIcd(r.code);
    return `
      <div id="icd-item-${idx}" style="padding:12px 18px; border-bottom:1px solid var(--color-border); cursor:pointer; background:var(--color-surface); transition:all 0.15s; display:flex; align-items:center; justify-content:space-between; gap:14px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:12.5px; font-weight:800; color:var(--color-primary); background:rgba(2,132,199,0.1); border:1px solid rgba(2,132,199,0.2); padding:3px 8px; border-radius:6px; white-space:nowrap;">
            ${escapeHtml(r.code)}
          </span>
          <div>
            <div style="font-size:13.5px; color:var(--color-text); font-weight:700; line-height:1.35;">
              ${escapeHtml(r.name)}
            </div>
            ${r.nameEn ? `<div style="font-size:11.5px; color:var(--color-text-muted);">${escapeHtml(r.nameEn)}</div>` : ''}
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:6px;">
          ${r.chapter ? `<span style="font-size:10.5px; color:var(--color-text-muted); background:var(--color-bg); padding:2px 6px; border-radius:4px; border:1px solid var(--color-border);">${escapeHtml(r.chapter)}</span>` : ''}
          ${orderSet ? `
            <span style="font-size:11px; font-weight:800; color:#0284c7; background:rgba(2,132,199,0.12); border:1px solid rgba(2,132,199,0.3); padding:3px 8px; border-radius:10px; white-space:nowrap; display:flex; align-items:center; gap:4px;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Order Set
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }

  private handleSelectRecord(r: IcdRecord) {
    const orderSet = findOrderSetByIcd(r.code);
    if (orderSet) {
      this.renderCommandCenterView(r, orderSet);
    } else {
      this.quickInsertDisease(r);
    }
  }

  private renderCommandCenterView(r: IcdRecord, orderSet: OrderSet) {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #fff); color:var(--color-text, #0f172a); width:100%; max-width:860px; max-height:90vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.4); border:1px solid var(--color-border);">
        
        <!-- Header -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
          <div style="display:flex; align-items:center; gap:10px;">
            <button id="btnBackToSearch" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="padding:4px 8px; font-size:12px;">
              <i class="fa-solid fa-arrow-left"></i> Tìm mã khác
            </button>
            <div>
              <h3 style="margin:0; font-size:16px; color:var(--color-primary); font-weight:800;">
                Clinical Hub: ${escapeHtml(r.name)} (${escapeHtml(r.code)})
              </h3>
            </div>
          </div>
          <button id="btnCloseIcdPicker" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>

        <!-- Body Scrollable -->
        <div style="padding:18px 20px; overflow-y:auto; flex:1; background:var(--color-bg); display:flex; flex-direction:column; gap:14px;">
          
          <!-- Summary Alert -->
          <div style="background:rgba(2,132,199,0.08); border-left:4px solid var(--color-primary); padding:12px 16px; border-radius:8px;">
            <div style="font-size:13px; font-weight:700; color:var(--color-primary); margin-bottom:3px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-lightbulb"></i> Chiến lược điều trị cốt lõi:
            </div>
            <div style="font-size:12.5px; color:var(--color-text); line-height:1.5;">
              ${escapeHtml(orderSet.summary)}
            </div>
          </div>

          <!-- Suggested Labs Section -->
          ${orderSet.suggestedLabs && orderSet.suggestedLabs.length > 0 ? `
            <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:12px 14px;">
              <div style="font-size:13px; font-weight:700; color:#0369a1; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-flask-vial"></i> Xét nghiệm cận lâm sàng đề xuất (${orderSet.suggestedLabs.length} chỉ định):
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:12px;">
                ${orderSet.suggestedLabs.map(lab => `
                  <div style="background:var(--color-bg); padding:6px 10px; border-radius:6px; border:1px solid var(--color-border);">
                    <strong style="color:var(--color-text);">${escapeHtml(lab.name)}</strong>
                    ${lab.purpose ? `<div style="font-size:10.5px; color:var(--color-text-muted);">${escapeHtml(lab.purpose)}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Suggested Drugs Section (Order Set) -->
          <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="font-size:13px; font-weight:700; color:#7c3aed; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-capsules"></i> Danh mục thuốc phác đồ gợi ý (${orderSet.suggestedDrugs.length} thuốc):
              </div>
              <span style="font-size:11px; color:var(--color-text-muted);">Tick chọn các thuốc muốn kê đơn</span>
            </div>

            <div style="display:flex; flex-direction:column; gap:6px;">
              ${orderSet.suggestedDrugs.map((drug, i) => `
                <label style="background:var(--color-bg); border:1px solid var(--color-border); padding:8px 12px; border-radius:6px; display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
                  <input type="checkbox" class="order-set-drug-cb" data-index="${i}" checked style="margin-top:2px; width:16px; height:16px; accent-color:var(--color-primary);" />
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span style="font-size:13px; font-weight:700; color:var(--color-text);">${escapeHtml(drug.name)}</span>
                      ${drug.note ? `<span style="font-size:10.5px; background:rgba(2,132,199,0.1); color:var(--color-primary); padding:1px 6px; border-radius:4px;">${escapeHtml(drug.note)}</span>` : ''}
                    </div>
                    <div style="font-size:11.5px; color:var(--color-text-muted);"><i class="fa-solid fa-syringe" style="font-size:10px;"></i> ${escapeHtml(drug.dosage || 'Liều tiêu chuẩn')}</div>
                  </div>
                </label>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div style="padding:14px 20px; border-top:1px solid var(--color-border); background:var(--color-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
          <button id="btnQuickInsertOnly" class="dsp-btn dsp-btn-outline dsp-btn-sm">
            Chỉ chèn Mã &amp; Tên
          </button>

          <div style="display:flex; align-items:center; gap:8px;">
            <button id="btnOpenReactionChainFromIcd" class="dsp-btn dsp-btn-sm" style="background:linear-gradient(135deg, #0284c7, #6366f1); color:#fff; font-weight:700; border:none; padding:7px 12px; border-radius:6px; cursor:pointer; display:flex; align-items:center; gap:5px;" title="Mở bảng kiểm tiêu chuẩn chẩn đoán và chuỗi phản ứng">
              <i class="fa-solid fa-link"></i> 🔗 Chuỗi Phản Ứng (CRCE)
            </button>

            <button id="btnApplyOrderSet" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700; padding:8px 16px;">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Áp dụng Phác đồ vào SOAP
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btnCloseIcdPicker')?.addEventListener('click', () => this.close());
    document.getElementById('btnBackToSearch')?.addEventListener('click', () => this.renderSearchMode());
    
    document.getElementById('btnOpenReactionChainFromIcd')?.addEventListener('click', async () => {
      this.close();
      const { reactionChainDrawer } = await import('./reaction-chain-drawer');
      // Lấy bệnh nhân hiện tại nếu có
      const activePatient = (window as any).dsp_current_soap_patient || null;
      if (activePatient) {
        reactionChainDrawer.open(activePatient, r.code);
      } else {
        reactionChainDrawer.open({
          id: 'temp_patient',
          patientCode: 'BN-KHAM',
          bedNumber: 'PK-NgoạiTrú',
          fullName: 'Bệnh nhân đang khám',
          age: 50,
          gender: 'nam',
          medicalRecordNo: 'HS-TEMP',
          admissionDiagnosis: `${r.name} (${r.code})`,
          currentDiagnosis: `${r.name} (${r.code})`,
          isEmrEntered: false,
          soapStatus: 'chua_lam',
          dayOfIllness: 1,
          sNotes: r.name,
          oNotes: '',
          aAssessment: `${r.name} (${r.code})`,
          pPlan: '',
          clsOrders: [],
          clsResults: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, r.code);
      }
    });

    document.getElementById('btnQuickInsertOnly')?.addEventListener('click', () => {
      this.quickInsertDisease(r);
    });

    document.getElementById('btnApplyOrderSet')?.addEventListener('click', () => {
      this.applyFullOrderSet(r, orderSet);
    });
  }

  private quickInsertDisease(r: IcdRecord) {
    const textarea = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
    if (textarea) {
      const textToInsert = `${r.name} (${r.code})`;
      const current = textarea.value.trim();
      textarea.value = current ? `${current}\n- ${textToInsert}` : textToInsert;
      textarea.focus();
    }
    this.close();
  }

  private applyFullOrderSet(r: IcdRecord, orderSet: OrderSet) {
    // 1. Chèn chẩn đoán vào ô Đánh giá (A) hoặc target
    const targetEl = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
    if (targetEl) {
      const diagText = `${r.name} (${r.code})`;
      const cur = targetEl.value.trim();
      targetEl.value = cur ? `${cur}\n- Chẩn đoán: ${diagText}` : `- Chẩn đoán: ${diagText}`;
    }

    // 2. Chèn thuốc đã chọn vào ô Kế hoạch (esPPlan)
    const checkboxes = document.querySelectorAll('.order-set-drug-cb:checked') as NodeListOf<HTMLInputElement>;
    const selectedDrugs: string[] = [];
    checkboxes.forEach(cb => {
      const idx = parseInt(cb.getAttribute('data-index') || '0', 10);
      const drug = orderSet.suggestedDrugs[idx];
      if (drug) {
        selectedDrugs.push(`• ${drug.name}: ${drug.dosage || 'Liều chuẩn'}${drug.note ? ` (${drug.note})` : ''}`);
      }
    });

    if (selectedDrugs.length > 0) {
      const planEl = document.getElementById('esPPlan') as HTMLTextAreaElement;
      if (planEl) {
        const drugBlock = `[Y LỆNH THUỐC PHÁC ĐỒ (${r.code})]:\n` + selectedDrugs.join('\n');
        planEl.value = planEl.value ? `${planEl.value.trim()}\n\n${drugBlock}` : drugBlock;
      }
    }

    // 3. Chèn xét nghiệm gợi ý vào ô Chỉ định CLS (esClsOrders)
    if (orderSet.suggestedLabs && orderSet.suggestedLabs.length > 0) {
      const clsEl = document.getElementById('esClsOrders') as HTMLTextAreaElement;
      if (clsEl) {
        const labsText = orderSet.suggestedLabs.map(l => l.name).join('\n');
        clsEl.value = clsEl.value ? `${clsEl.value.trim()}\n${labsText}` : labsText;
      }
    }

    alert(`✅ Đã áp dụng phác đồ và y lệnh cho bệnh "${r.name} (${r.code})" vào Bệnh án SOAP thành công!`);
    this.close();
  }
}

export const icdPicker = new IcdPicker();
