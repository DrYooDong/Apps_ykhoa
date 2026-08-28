/**
 * Clinical Command Bar (Spotlight Palette) - DocSpace
 * Thanh Lệnh Toàn Năng `Ctrl + K` / `Cmd + K`
 * Tra cứu tức thì công cụ, thang điểm, dược thư, hướng dẫn lâm sàng & Tính toán nhanh in-line
 */

import { toolRegistry } from '../tools/registry';
import { DRUG_FORMULARY_DATABASE } from '../data/drug-interactions';
import { CLINICAL_APPROACH_DATABASE, clinicalReasoningPanel } from './clinical-reasoning-panel';
import { drugIntelligencePanel } from './drug-intelligence-panel';
import { quickReferenceDrawer } from './quick-reference-drawer';
import { calculatorPicker } from './calculator-picker';
import { escapeHtml } from '../docspace-view';
import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import { KHO_GUIDELINES_STATIC } from '../../ebm/guidelines/js/kho-guidelines-registry';

export interface CommandItem {
  id: string;
  title: string;
  category: 'score' | 'drug' | 'approach' | 'reference' | 'feature' | 'math';
  categoryLabel: string;
  icon: string;
  description: string;
  badge?: string;
  action: () => void;
}

export class ClinicalCommandBar {
  private modalEl: HTMLElement;
  private searchInput: HTMLInputElement | null = null;
  private resultsContainer: HTMLElement | null = null;
  private selectedIndex: number = 0;
  private filteredItems: CommandItem[] = [];

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalClinicalCommandBar';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1080';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(6px)';
    this.modalEl.style.alignItems = 'flex-start';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.paddingTop = '12vh';
    this.modalEl.style.paddingLeft = '16px';
    this.modalEl.style.paddingRight = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    // Global Keydown Listener for Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  public open() {
    this.renderLayout();
    this.modalEl.style.display = 'flex';
    this.searchInput = document.getElementById('ccbSearchInput') as HTMLInputElement;
    this.resultsContainer = document.getElementById('ccbResults');
    this.selectedIndex = 0;
    
    if (this.searchInput) {
      this.searchInput.value = '';
      this.searchInput.focus();
    }
    
    this.performSearch('');
    this.bindEvents();
  }

  public close() {
    this.modalEl.style.display = 'none';
  }

  public toggle() {
    if (this.modalEl.style.display === 'flex') {
      this.close();
    } else {
      this.open();
    }
  }

  private getAllCommands(): CommandItem[] {
    const commands: CommandItem[] = [];

    // 1. Scores & Calculators from Tool Registry
    for (const tool of toolRegistry.getAll()) {
      commands.push({
        id: `score_${tool.id}`,
        title: tool.name,
        category: 'score',
        categoryLabel: 'Thang điểm & Công cụ',
        icon: tool.icon || 'fa-solid fa-calculator',
        description: tool.description,
        badge: tool.specialtyLabel,
        action: () => {
          this.close();
          calculatorPicker.open('', null, tool.id);
        }
      });
    }

    // 2. Drugs from Formulary
    for (const drug of DRUG_FORMULARY_DATABASE) {
      commands.push({
        id: `drug_${drug.id}`,
        title: `${drug.name} (${drug.brandNames.join(', ')})`,
        category: 'drug',
        categoryLabel: 'Dược thư & Tương tác',
        icon: 'fa-solid fa-pills',
        description: `${drug.category} · Liều: ${drug.standardDose}`,
        badge: 'Thuốc',
        action: () => {
          this.close();
          drugIntelligencePanel.open();
        }
      });
    }

    // 3. Clinical Reasoning & Approaches
    for (const app of Object.values(CLINICAL_APPROACH_DATABASE)) {
      commands.push({
        id: `app_${app.symptomKey}`,
        title: `Tiếp cận ${app.symptomName}`,
        category: 'approach',
        categoryLabel: 'Tư duy Lâm sàng (Coach)',
        icon: app.icon || 'fa-solid fa-sitemap',
        description: `Chẩn đoán phân biệt & Sơ đồ tiếp cận bậc thang cho ${app.symptomName}`,
        badge: 'Tiếp cận',
        action: () => {
          this.close();
          clinicalReasoningPanel.open('', null, app.symptomKey);
        }
      });
    }

    // 4. Quick Reference Cheatsheets
    commands.push(
      {
        id: 'ref_formulas',
        title: 'Formula Vault — Kho Công thức Sinh lý & Cấp cứu',
        category: 'reference',
        categoryLabel: 'Tra cứu Nhanh',
        icon: 'fa-solid fa-calculator',
        description: 'MAP, Anion Gap, FeNa, PaO2/FiO2 Horovitz, Parkland...',
        badge: 'Vault',
        action: () => {
          this.close();
          quickReferenceDrawer.open('formulas');
        }
      },
      {
        id: 'ref_ecg_abg',
        title: 'ECG & ABG Pocket Guide — Hướng dẫn đọc điện tim & khí máu',
        category: 'reference',
        categoryLabel: 'Tra cứu Nhanh',
        icon: 'fa-solid fa-heart-pulse',
        description: '7 bước đọc ECG, Tiêu chuẩn Sgarbossa, 6 bước phân tích toan kiềm...',
        badge: 'Cẩm nang',
        action: () => {
          this.close();
          quickReferenceDrawer.open('ecg_abg');
        }
      },
      {
        id: 'ref_acls',
        title: 'ACLS Resuscitation — Phác đồ Cấp cứu ngừng tim & Sốc phản vệ',
        category: 'reference',
        categoryLabel: 'Tra cứu Nhanh',
        icon: 'fa-solid fa-truck-medical',
        description: 'Phác đồ sốc điện, Adrenaline, Amiodarone, 5H & 5T, MTP...',
        badge: 'Cấp cứu',
        action: () => {
          this.close();
          quickReferenceDrawer.open('acls');
        }
      },
      {
        id: 'ref_bedside',
        title: 'Bedside Checklist — Bảng kiểm khám tại giường & OSCE',
        category: 'reference',
        categoryLabel: 'Tra cứu Nhanh',
        icon: 'fa-solid fa-list-check',
        description: 'Glasgow GCS, Dấu hiệu bụng cấp, Khám thần kinh khu trú...',
        badge: 'Checklist',
        action: () => {
          this.close();
          quickReferenceDrawer.open('bedside');
        }
      }
    );

    // 5. DocSpace Core Features
    commands.push(
      {
        id: 'feat_chronic_care',
        title: 'Quản Lý Bệnh Mạn Tính & Ngoại Trú (Chronic Care)',
        category: 'feature',
        categoryLabel: 'Tính năng DocSpace',
        icon: 'fa-solid fa-heart-pulse',
        description: 'Theo dõi đường cong HbA1c, Huyết áp, eGFR, ACR & Cảnh báo tầm soát biến chứng định kỳ',
        badge: 'Mạn tính',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/chronic-care';
        }
      },
      {
        id: 'feat_soap',
        title: 'Sổ Tay Bệnh Án SOAP Digital',
        category: 'feature',
        categoryLabel: 'Tính năng DocSpace',
        icon: 'fa-solid fa-notes-medical',
        description: 'Quản lý bệnh nhân nội trú theo ngày (S-O-A-P), chèn cận lâm sàng, kê đơn',
        badge: 'SOAP',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/soap';
        }
      },
      {
        id: 'feat_sbar',
        title: 'SBAR — Báo Cáo Hội Chẩn & Giao Tiếp',
        category: 'feature',
        categoryLabel: 'Tính năng DocSpace',
        icon: 'fa-solid fa-file-waveform',
        description: 'Tạo biên bản báo cáo Situation - Background - Assessment - Recommendation',
        badge: 'SBAR',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/sbar';
        }
      },
      {
        id: 'feat_oncall',
        title: 'Checklist Tua Trực & Nhắc Việc (OnCall)',
        category: 'feature',
        categoryLabel: 'Tính năng DocSpace',
        icon: 'fa-solid fa-list-check',
        description: 'Quản lý danh sách việc cần làm trong ca trực (lấy máu, chụp phim, hội chẩn)',
        badge: 'Trực',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/oncall';
        }
      },
      {
        id: 'feat_protocol',
        title: 'Kho Phác Đồ Điều Trị Lâm Sàng Toàn Năng',
        category: 'feature',
        categoryLabel: 'Tính năng DocSpace',
        icon: 'fa-solid fa-book-medical',
        description: 'Tra cứu & nhân bản 16+ phác đồ cấp cứu & nội khoa chuẩn Bộ Y tế, EBM',
        badge: 'Phác đồ',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/protocol';
        }
      },
      {
        id: 'studio_abg',
        title: 'ABG Pro Studio — Khí Máu Động Mạch & Toan Kiềm',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-droplet',
        description: 'Phân tích toan kiềm 6 bước, Anion Gap hiệu chỉnh, P/F ratio, biểu đồ Davenport SVG',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=abg';
        }
      },
      {
        id: 'studio_ecg',
        title: 'ECG Pro Studio — 12 Chuyển Đạo & Trục Điện Tim Vector',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-heart-pulse',
        description: 'Tính góc trục điện tim α 360°, QTc Bazett/Fridericia, Sgarbossa LBBB, Dày thất',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=ecg';
        }
      },
      {
        id: 'studio_electrolyte',
        title: 'Electrolyte & Fluid Studio — Bù Natri & Kali An Toàn',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-flask',
        description: 'Tính Na hiệu chỉnh, FWD, tốc độ truyền NaCl 3% & Cảnh báo phòng tránh hủy myelin CPM',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=electrolyte';
        }
      },
      {
        id: 'studio_renal',
        title: 'Renal & Drug Dosing Studio — Thận & Hiệu Chỉnh Liều Thuốc',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-dna',
        description: 'CKD-EPI 2021, Cockcroft-Gault & Bảng tự động chỉnh liều 15+ kháng sinh và thuốc độc thận',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=renal';
        }
      },
      {
        id: 'studio_cardio',
        title: 'Cardio Risk & Lipid Studio — Nguy Cơ Tim Mạch & Đích LDL-C',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-chart-pie',
        description: 'Phân tầng nguy cơ SCORE2 / ASCVD 10 năm & Mục tiêu hạ LDL-C theo ESC/AHA',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=cardio';
        }
      },
      {
        id: 'studio_sepsis',
        title: 'Sepsis & Pneumonia Studio — Sốc Nhiễm Khuẩn & Viêm Phổi Nặng',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-lungs-virus',
        description: 'Đánh giá qSOFA, SOFA, CURB-65, SMART-COP & Gợi ý phác đồ kháng sinh kinh nghiệm ICU',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=sepsis';
        }
      },
      {
        id: 'studio_cirrhosis',
        title: 'Cirrhosis & Liver Studio — Xơ Gan, Child-Pugh, MELD-Na & SBP',
        category: 'score',
        categoryLabel: 'Clinical Studio',
        icon: 'fa-solid fa-disease',
        description: 'Tính Child-Pugh, MELD-Na 2016, FIB-4, ALBI & Phác đồ xuất huyết vỡ giãn TMTQ Baveno VII',
        badge: 'Studio',
        action: () => {
          this.close();
          window.location.hash = '#/docspace/studios?tab=cirrhosis';
        }
      },
      // 6. EBM Bedside Tools & Shortcuts
      {
        id: 'ebm_fagan',
        title: 'Fagan Nomogram — Xác Suất Hậu Nghiệm Cận Lâm Sàng (>fagan)',
        category: 'feature',
        categoryLabel: 'EBM Tool',
        icon: 'fa-solid fa-chart-line',
        description: 'Tính toán xác suất mắc bệnh sau khi có kết quả CLS (hs-cTn, D-Dimer, Procalcitonin) bằng định lý Bayes & đồ họa SVG',
        badge: 'Bayes',
        action: () => {
          this.close();
          quickReferenceDrawer.open('ebm_calc');
        }
      },
      {
        id: 'ebm_nnt',
        title: 'Máy Tính NNT / NNH / Giảm Nguy Cơ Tuyệt Đối ARR (>nnt)',
        category: 'feature',
        categoryLabel: 'EBM Tool',
        icon: 'fa-solid fa-calculator',
        description: 'Tính số bệnh nhân cần điều trị để ngừa 1 biến cố tử vong/nhập viện từ CER và EER',
        badge: 'NNT',
        action: () => {
          this.close();
          quickReferenceDrawer.open('ebm_calc');
        }
      },
      {
        id: 'ebm_radar',
        title: 'Guideline Radar Diff Viewer — So Sánh Thay Đổi Phác Đồ (>radar)',
        category: 'feature',
        categoryLabel: 'EBM Radar',
        icon: 'fa-solid fa-satellite-dish',
        description: 'GitHub-style Diff View so sánh phác đồ mới vs cũ (ESC 2026, ADA 2026, GOLD 2026, BYT VN) & Khuyến cáo COR/LOE',
        badge: 'Diff',
        action: () => {
          this.close();
          window.location.hash = '#/ebm/guideline-radar';
        }
      },
      {
        id: 'ebm_pico_hub',
        title: 'EBM Master Command Center & PICO Search Engine (>pico)',
        category: 'feature',
        categoryLabel: 'EBM Hub',
        icon: 'fa-solid fa-scale-balanced',
        description: 'Trung tâm y học chứng cứ, tháp bằng chứng 6S, chu trình 5As và tra cứu câu hỏi lâm sàng PICO',
        badge: 'EBM',
        action: () => {
          this.close();
          window.location.hash = '#/ebm';
        }
      }
    );

    // 7. EBM Landmark Trials & Guidelines (59+ Nghiên cứu bản lề)
    if (Array.isArray(KHO_GUIDELINES_STATIC)) {
      for (const g of KHO_GUIDELINES_STATIC) {
        commands.push({
          id: `ebm_gdl_${g.id}`,
          title: g.title,
          category: 'reference',
          categoryLabel: `EBM Landmark Trial · ${g.specialty || 'Lâm sàng'}`,
          icon: 'fa-solid fa-book-journal-whills',
          description: `${g.organization || 'EBM Guideline'} (${g.year || 2026}) — ${g.summary ? g.summary.slice(0, 80) + '…' : g.id}`,
          badge: 'EBM',
          action: () => {
            this.close();
            window.location.hash = `#/ebm/kho-guidelines`;
          }
        });
      }
    }

    // 8. Knowledge Vault Articles (2.362+ Bài Viết EBM)
    if (Array.isArray(VAULT_CATALOG)) {
      for (const art of VAULT_CATALOG) {
        commands.push({
          id: `vault_${art.id}`,
          title: art.title,
          category: 'reference',
          categoryLabel: `Kho Tri Thức · ${art.khoName}`,
          icon: 'fa-solid fa-graduation-cap',
          description: art.snippet || `${art.specialty} — ${art.khoName} (${art.khoCode})`,
          badge: art.khoCode,
          action: () => {
            this.close();
            window.location.hash = `#/vault?search=${encodeURIComponent(art.title)}`;
          }
        });
      }
    }

    return commands;
  }

  private performSearch(query: string) {
    const q = query.toLowerCase().trim();
    const all = this.getAllCommands();

    // Check if query is an in-line calculation command (e.g., "map 120 80" or "bmi 65 1.68")
    const mathItem = this.tryInlineCalculation(q);

    if (!q) {
      this.filteredItems = all.slice(0, 15);
    } else {
      this.filteredItems = all.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    if (mathItem) {
      this.filteredItems.unshift(mathItem);
    }

    this.selectedIndex = 0;
    this.renderResults();
  }

  private tryInlineCalculation(q: string): CommandItem | null {
    // 1. MAP: "map 120 80"
    const mapMatch = q.match(/^map\s+(\d{2,3})\s+(\d{2,3})$/i);
    if (mapMatch) {
      const sbp = parseFloat(mapMatch[1]);
      const dbp = parseFloat(mapMatch[2]);
      const map = (sbp + 2 * dbp) / 3;
      return {
        id: 'math_map',
        title: `Tính nhanh MAP: ${map.toFixed(1)} mmHg (HA: ${sbp}/${dbp} mmHg)`,
        category: 'math',
        categoryLabel: '⚡ Tính toán tức thì',
        icon: 'fa-solid fa-bolt',
        description: `Huyết áp trung bình = (${sbp} + 2*${dbp})/3 = ${map.toFixed(1)} mmHg ${map >= 65 ? '✅ Đạt tưới máu mô' : '⚠️ MAP < 65: Nguy cơ sốc'}`,
        badge: 'Inline Math',
        action: () => {
          navigator.clipboard?.writeText(`MAP: ${map.toFixed(1)} mmHg (HA ${sbp}/${dbp})`);
          alert(`Đã copy kết quả MAP = ${map.toFixed(1)} mmHg vào clipboard!`);
          this.close();
        }
      };
    }

    // 2. BMI: "bmi 65 1.68" hoặc "bmi 65 168"
    const bmiMatch = q.match(/^bmi\s+(\d{2,3})\s+(\d+(?:\.\d+)?)$/i);
    if (bmiMatch) {
      const weight = parseFloat(bmiMatch[1]);
      let height = parseFloat(bmiMatch[2]);
      if (height > 3) height = height / 100; // convert cm to m
      if (height > 0) {
        const bmi = weight / (height * height);
        let status = 'Bình thường (18.5 - 22.9)';
        if (bmi < 18.5) status = 'Thiếu cân / Gầy';
        else if (bmi >= 25) status = 'Béo phì';
        else if (bmi >= 23) status = 'Thừa cân (theo WHO Châu Á)';

        return {
          id: 'math_bmi',
          title: `Tính nhanh BMI: ${bmi.toFixed(1)} kg/m² (${status})`,
          category: 'math',
          categoryLabel: '⚡ Tính toán tức thì',
          icon: 'fa-solid fa-bolt',
          description: `BMI = ${weight}kg / (${height}m)² = ${bmi.toFixed(1)} kg/m²`,
          badge: 'Inline Math',
          action: () => {
            navigator.clipboard?.writeText(`BMI: ${bmi.toFixed(1)} kg/m² (${status})`);
            alert(`Đã copy kết quả BMI = ${bmi.toFixed(1)} kg/m² vào clipboard!`);
            this.close();
          }
        };
      }
    }

    return null;
  }

  private renderLayout() {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #ffffff); width:100%; max-width:680px; max-height:75vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 60px -15px rgba(0,0,0,0.45); border:1px solid var(--color-border, #e2e8f0); animation: scaleUp 0.15s ease-out; font-family:inherit;">
        
        <!-- Search Input Header -->
        <div style="padding:14px 18px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; align-items:center; gap:12px; background:var(--color-surface, #fff);">
          <i class="fa-solid fa-magnifying-glass" style="color:var(--color-primary, #0284c7); font-size:17px;"></i>
          <input type="text" id="ccbSearchInput" placeholder="Gõ lệnh, tên thuốc, thang điểm (vd: qsofa, vancomycin, đau ngực, map 120 80)..." style="flex:1; border:none; outline:none; background:transparent; font-size:15px; color:var(--color-text, #0f172a); font-family:inherit;" autocomplete="off" />
          <kbd style="padding:3px 6px; border-radius:4px; font-size:11px; background:var(--color-bg, #f1f5f9); color:var(--color-text-muted, #64748b); border:1px solid var(--color-border, #cbd5e1);">Esc</kbd>
        </div>

        <!-- Results List -->
        <div id="ccbResults" style="flex:1; overflow-y:auto; padding:8px; display:flex; flex-direction:column; gap:4px; max-height:480px; background:var(--color-bg, #f8fafc);">
          <!-- Injected via JS -->
        </div>

        <!-- Footer Shortcuts Info -->
        <div style="padding:8px 16px; border-top:1px solid var(--color-border, #e2e8f0); background:var(--color-surface, #fff); display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--color-text-muted, #64748b);">
          <div style="display:flex; gap:12px;">
            <span><kbd style="padding:2px 4px; background:#f1f5f9; border-radius:3px; border:1px solid #cbd5e1;">↑</kbd> <kbd style="padding:2px 4px; background:#f1f5f9; border-radius:3px; border:1px solid #cbd5e1;">↓</kbd> Di chuyển</span>
            <span><kbd style="padding:2px 4px; background:#f1f5f9; border-radius:3px; border:1px solid #cbd5e1;">↵ Enter</kbd> Chọn</span>
          </div>
          <div>
            <span><i class="fa-solid fa-bolt" style="color:var(--color-primary);"></i> Clinical Command Bar v2.0</span>
          </div>
        </div>

      </div>
    `;
  }

  private renderResults() {
    if (!this.resultsContainer) return;

    if (!this.filteredItems.length) {
      this.resultsContainer.innerHTML = `
        <div style="text-align:center; padding:32px 20px; color:var(--color-text-muted, #64748b);">
          <i class="fa-solid fa-compass" style="font-size:32px; color:var(--color-border, #cbd5e1); margin-bottom:10px;"></i>
          <p style="margin:0; font-size:13.5px; font-weight:600;">Không tìm thấy lệnh hoặc công cụ phù hợp.</p>
          <p style="margin:4px 0 0; font-size:11.5px;">Thử gõ: <code>qsofa</code>, <code>gcs</code>, <code>abg</code>, <code>vancomycin</code>, <code>đau ngực</code>, <code>map 120 80</code>...</p>
        </div>
      `;
      return;
    }

    this.resultsContainer.innerHTML = this.filteredItems.map((item, idx) => {
      const isSelected = idx === this.selectedIndex;
      return `
        <div class="ccb-item" data-index="${idx}" style="padding:10px 14px; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:12px; background:${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-surface, #fff)'}; color:${isSelected ? '#ffffff' : 'var(--color-text, #0f172a)'}; border:1px solid ${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #e2e8f0)'}; transition:all 0.1s ease;">
          <div style="width:32px; height:32px; border-radius:8px; background:${isSelected ? 'rgba(255,255,255,0.2)' : '#f1f5f9'}; color:${isSelected ? '#ffffff' : 'var(--color-primary, #0284c7)'}; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0;">
            <i class="${item.icon}"></i>
          </div>
          <div style="flex:1; min-width:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
              <strong style="font-size:13.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.title)}</strong>
              ${item.badge ? `
                <span style="font-size:10.5px; padding:1px 6px; border-radius:4px; background:${isSelected ? 'rgba(255,255,255,0.25)' : '#f1f5f9'}; color:${isSelected ? '#ffffff' : '#475569'}; flex-shrink:0; margin-left:8px;">
                  ${escapeHtml(item.badge)}
                </span>
              ` : ''}
            </div>
            <div style="font-size:11.5px; color:${isSelected ? 'rgba(255,255,255,0.85)' : 'var(--color-text-muted, #64748b)'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${escapeHtml(item.description)}
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size:11px; opacity:${isSelected ? '1' : '0.3'};"></i>
        </div>
      `;
    }).join('');

    // Bind click events on items
    this.resultsContainer.querySelectorAll('.ccb-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const idx = parseInt(itemEl.getAttribute('data-index') || '0', 10);
        this.executeItem(idx);
      });
    });
  }

  private executeItem(index: number) {
    const item = this.filteredItems[index];
    if (item && item.action) {
      item.action();
    }
  }

  private bindEvents() {
    this.searchInput?.addEventListener('input', () => {
      this.performSearch(this.searchInput?.value || '');
    });

    this.searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredItems.length;
        this.renderResults();
        this.scrollToSelected();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
        this.renderResults();
        this.scrollToSelected();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.executeItem(this.selectedIndex);
      } else if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  private scrollToSelected() {
    if (!this.resultsContainer) return;
    const selectedEl = this.resultsContainer.querySelector(`[data-index="${this.selectedIndex}"]`) as HTMLElement;
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }
}

export const clinicalCommandBar = new ClinicalCommandBar();
