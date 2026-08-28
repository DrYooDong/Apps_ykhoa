/**
 * Quick Reference Drawer - DocSpace
 * Ngăn Kéo Tra Cứu Siêu Tốc & Cẩm Nang Giường Bệnh Toàn Năng
 * Tích hợp: Formula Vault, ECG/ABG Pocket Guide, ACLS Hồi sức & Bedside Checklist
 */

import { escapeHtml } from '../docspace-view';
import { VAULT_CATALOG } from '../../knowledge-vault/vault-loader';
import type { VaultArticle } from '../../knowledge-vault/types';
import { 
  renderFaganNomogramHtml, 
  calculatePostTestProbability, 
  calculateEbmMetrics, 
  COMMON_DIAGNOSTIC_TESTS 
} from './ebm-bedside-calculator';

export class QuickReferenceDrawer {
  private drawerEl: HTMLElement;
  private currentTab: 'vault' | 'formulas' | 'ecg_abg' | 'acls' | 'bedside' | 'ebm_calc' = 'vault';
  private searchVaultQuery: string = '';
  private faganPreProb: number = 25;
  private faganSelectedTestId: string = 'trop_hs';

  constructor() {
    this.drawerEl = document.createElement('div');
    this.drawerEl.id = 'dspQuickReferenceDrawer';
    this.drawerEl.style.display = 'none';
    this.drawerEl.style.position = 'fixed';
    this.drawerEl.style.inset = '0';
    this.drawerEl.style.zIndex = '1070';
    this.drawerEl.style.background = 'rgba(15, 23, 42, 0.6)';
    this.drawerEl.style.backdropFilter = 'blur(4px)';
    this.drawerEl.style.justifyContent = 'flex-end';
    document.body.appendChild(this.drawerEl);

    this.drawerEl.addEventListener('mousedown', (e) => {
      if (e.target === this.drawerEl) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawerEl.style.display === 'flex') {
        this.close();
      }
    });
  }

  public open(defaultTab: 'vault' | 'formulas' | 'ecg_abg' | 'acls' | 'bedside' | 'ebm_calc' = 'vault') {
    this.currentTab = defaultTab;
    this.renderLayout();
    this.drawerEl.style.display = 'flex';
    this.bindEvents();
  }

  public close() {
    this.drawerEl.style.display = 'none';
  }

  private renderLayout() {
    this.drawerEl.innerHTML = `
      <div style="background:var(--color-surface, #ffffff); width:100%; max-width:640px; height:100vh; display:flex; flex-direction:column; box-shadow:-10px 0 30px rgba(0,0,0,0.25); border-left:1px solid var(--color-border, #e2e8f0); animation: slideInRight 0.25s ease-out; font-family:inherit;">
        
        <!-- Header -->
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #0284c7, #6366f1); color:#fff; display:flex; align-items:center; justify-content:center; font-size:17px;">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <div>
              <h3 style="margin:0; font-size:16px; font-weight:700; color:var(--color-text, #0f172a);">Quick Reference Drawer</h3>
              <p style="margin:2px 0 0; font-size:11.5px; color:var(--color-text-muted, #64748b);">Tra cứu nhanh công thức, Knowledge Vault 2.362+ bài, Fagan &amp; Hồi sức</p>
            </div>
          </div>
          <button id="btnCloseQuickRefDrawer" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:22px; cursor:pointer; color:var(--color-text-muted, #64748b);">&times;</button>
        </div>

        <!-- Navigation Tabs Strip -->
        <div style="display:flex; padding:8px 12px; background:var(--color-surface-offset, #f1f5f9); border-bottom:1px solid var(--color-border, #e2e8f0); gap:6px; overflow-x:auto; scrollbar-width:thin;">
          <button class="qrd-tab-btn" data-tab="vault" style="background:${this.currentTab === 'vault' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'vault' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'vault' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-graduation-cap"></i> Kho Tri Thức (${VAULT_CATALOG.length} Bài)
          </button>
          <button class="qrd-tab-btn" data-tab="ebm_calc" style="background:${this.currentTab === 'ebm_calc' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'ebm_calc' ? '#8b5cf6' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'ebm_calc' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-scale-balanced" style="color:#8b5cf6;"></i> Fagan &amp; EBM Tools
          </button>
          <button class="qrd-tab-btn" data-tab="formulas" style="background:${this.currentTab === 'formulas' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'formulas' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'formulas' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-calculator"></i> Thang Điểm (Kho 3.1)
          </button>
          <button class="qrd-tab-btn" data-tab="ecg_abg" style="background:${this.currentTab === 'ecg_abg' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'ecg_abg' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'ecg_abg' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-flask-vial"></i> Cận Lâm Sàng (Kho 3.3)
          </button>
          <button class="qrd-tab-btn" data-tab="acls" style="background:${this.currentTab === 'acls' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'acls' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'acls' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-capsules"></i> Dược Thư (Kho 3.2)
          </button>
          <button class="qrd-tab-btn" data-tab="bedside" style="background:${this.currentTab === 'bedside' ? 'var(--color-surface, #fff)' : 'transparent'}; color:${this.currentTab === 'bedside' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; border:none; padding:7px 12px; border-radius:6px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:6px; white-space:nowrap; box-shadow:${this.currentTab === 'bedside' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
            <i class="fa-solid fa-list-check"></i> Bedside Checklist
          </button>
        </div>

        <!-- Content Area -->
        <div style="flex:1; overflow-y:auto; padding:18px 20px; background:var(--color-surface, #ffffff);">
          ${this.renderActiveTabContent()}
        </div>

      </div>
    `;
  }

  private renderActiveTabContent(): string {
    if (this.currentTab === 'vault') {
      const q = this.searchVaultQuery.trim().toLowerCase();
      let searchResults: VaultArticle[] = [];
      if (q) {
        searchResults = VAULT_CATALOG.filter(art => {
          const matchTitle = art.title.toLowerCase().includes(q);
          const matchSpec = art.specialty.toLowerCase().includes(q);
          const matchSnippet = (art.snippet || '').toLowerCase().includes(q);
          const matchKho = art.khoName.toLowerCase().includes(q);
          const matchIcd = (art.icd10 || []).some(c => c.toLowerCase().includes(q));
          return matchTitle || matchSpec || matchSnippet || matchKho || matchIcd;
        }).slice(0, 15);
      }

      return `
        <div style="display:flex; flex-direction:column; gap:14px;">
          
          <!-- Search Bar Strip -->
          <div style="position:relative;">
            <i class="fa-solid fa-magnifying-glass" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); color:var(--color-text-muted); font-size:13px;"></i>
            <input type="text" id="qrefVaultSearchInput" class="dsp-input" value="${escapeHtml(this.searchVaultQuery)}" placeholder="Tìm kiếm trong ${VAULT_CATALOG.length} bài viết (ICD-10, Phác đồ, Triệu chứng, Thuốc)..." style="padding-left:34px; font-size:13px; width:100%; border-radius:8px;" />
          </div>

          ${q ? `
            <div style="font-size:12px; color:var(--color-text-muted); display:flex; justify-content:space-between; align-items:center;">
              <span>Kết quả tìm kiếm cho: "<strong>${escapeHtml(q)}</strong>" (${searchResults.length} bài)</span>
              <button type="button" id="btnResetQrefSearch" style="background:none; border:none; color:var(--color-primary); cursor:pointer; font-size:11.5px; font-weight:700;">Xóa tìm kiếm</button>
            </div>

            <div style="display:flex; flex-direction:column; gap:8px;">
              ${searchResults.length === 0 ? `
                <div style="text-align:center; padding:30px; color:var(--color-text-muted);">
                  <i class="fa-solid fa-folder-open" style="font-size:24px; margin-bottom:8px;"></i>
                  <div>Không tìm thấy bài viết khớp từ khóa trong Vault.</div>
                </div>
              ` : searchResults.map(art => `
                <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; display:flex; flex-direction:column; gap:4px;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                    <strong style="font-size:13px; color:var(--color-primary, #0284c7);">${escapeHtml(art.title)}</strong>
                    <span style="font-size:10px; font-weight:700; background:rgba(2,132,199,0.12); color:#0284c7; padding:2px 6px; border-radius:4px; white-space:nowrap;">${escapeHtml(art.khoName)}</span>
                  </div>
                  <div style="font-size:11.5px; color:var(--color-text-muted); line-height:1.4;">${escapeHtml(art.snippet || 'Tài liệu hướng dẫn y học chứng cứ CliniPortal.')}</div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
                    <span style="font-size:10.5px; color:var(--color-text-muted);"><i class="fa-solid fa-stethoscope"></i> ${escapeHtml(art.specialty)}</span>
                    <a href="#/vault?search=${encodeURIComponent(art.title)}" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="font-size:11px; padding:2px 8px; text-decoration:none;">
                      <i class="fa-solid fa-book-open"></i> Đọc bài
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="background:linear-gradient(135deg, rgba(2,132,199,0.08), rgba(139,92,246,0.08)); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-size:13.5px; color:var(--color-text, #0f172a);"><i class="fa-solid fa-graduation-cap" style="color:var(--color-primary, #0284c7);"></i> Kho Kiến Thức Y Khoa CliniPortal</strong>
                <p style="margin:2px 0 0; font-size:11.5px; color:var(--color-text-muted, #64748b);">Tổng hợp ${VAULT_CATALOG.length} bài viết chuẩn hóa (Cơ sở, Lâm sàng, Phác đồ, Dược, Biến chứng)</p>
              </div>
              <a href="#/vault" style="padding:5px 10px; background:var(--color-primary, #0284c7); color:#fff; border-radius:6px; font-size:11.5px; font-weight:600; text-decoration:none; display:flex; align-items:center; gap:4px; white-space:nowrap;">
                Mở Hub <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>

            <!-- Nhóm Lâm sàng & Bệnh học -->
            <div style="font-size:12px; font-weight:700; color:var(--color-text, #0f172a); margin-top:2px;">
              🩺 Phân Hệ Lâm Sàng &amp; Chẩn Đoán Điều Trị:
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
              <a href="#/vault?kho=TC" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(14,165,233,0.1); color:#0ea5e9; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-magnifying-glass"></i></div>
                <div><strong style="font-size:12px;">Tiếp cận Lâm sàng</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">117 bài • Sơ đồ</div></div>
              </a>
              <a href="#/vault?kho=CD" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(236,72,153,0.1); color:#ec4899; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-clipboard-check"></i></div>
                <div><strong style="font-size:12px;">Chẩn đoán Bệnh học</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">480 bài • ICD-10</div></div>
              </a>
              <a href="#/vault?kho=PDDT" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(59,130,246,0.1); color:#3b82f6; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-pills"></i></div>
                <div><strong style="font-size:12px;">Phác đồ Điều trị</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">283 bài • Thuốc</div></div>
              </a>
              <a href="#/vault?kho=BC" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(239,68,68,0.1); color:#ef4444; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-triangle-exclamation"></i></div>
                <div><strong style="font-size:12px;">Biến chứng &amp; Tiên lượng</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">299 bài</div></div>
              </a>
              <a href="#/vault?kho=CC" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(245,158,11,0.1); color:#f59e0b; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-calculator"></i></div>
                <div><strong style="font-size:12px;">Thang Điểm &amp; Công Cụ</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">SOFA, CURB65...</div></div>
              </a>
              <a href="#/vault?kho=EBM" style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:8px 10px; text-decoration:none; color:inherit; display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:6px; background:rgba(6,182,212,0.1); color:#06b6d4; display:flex; align-items:center; justify-content:center; font-size:12px;"><i class="fa-solid fa-scale-balanced"></i></div>
                <div><strong style="font-size:12px;">NCKH &amp; EBM Guidelines</strong><div style="font-size:10.5px; color:var(--color-text-muted, #64748b);">Khuyến cáo lâm sàng</div></div>
              </a>
            </div>
          `}

        </div>
      `;
    }

    if (this.currentTab === 'formulas') {
      return `
        <div style="display:flex; flex-direction:column; gap:16px;">
          
          <!-- Formula 1: MAP -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:13.5px; color:var(--color-primary, #0284c7);">1. Huyết Áp Động Mạch Trung Bình (MAP)</strong>
              <span class="dsp-badge" style="background:#e0f2fe; color:#0369a1;">Hồi sức</span>
            </div>
            <div style="font-family:monospace; font-size:13px; background:var(--color-surface, #fff); padding:8px 12px; border-radius:6px; border:1px solid var(--color-border, #cbd5e1); margin-bottom:6px;">
              MAP = DBP + 1/3 (SBP - DBP) = (SBP + 2 * DBP) / 3
            </div>
            <div style="font-size:12px; color:var(--color-text-muted, #64748b);">
              🎯 <strong>Mục tiêu:</strong> Duy trì MAP ≥ 65 mmHg trong sốc nhiễm khuẩn / hồi sức để đảm bảo tưới máu tạng (não, thận, tim).
            </div>
          </div>

          <!-- Formula 2: Anion Gap & Delta Ratio -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:13.5px; color:var(--color-primary, #0284c7);">2. Khoảng Trống Anion Gap & Delta Ratio</strong>
              <span class="dsp-badge" style="background:#fef3c7; color:#92400e;">Khí máu</span>
            </div>
            <div style="font-family:monospace; font-size:13px; background:var(--color-surface, #fff); padding:8px 12px; border-radius:6px; border:1px solid var(--color-border, #cbd5e1); margin-bottom:6px;">
              AG = Na⁺ - (Cl⁻ + HCO₃⁻) [Bình thường: 8 - 12 mmol/L]<br/>
              Δ Ratio = (AG - 12) / (24 - HCO₃⁻)
            </div>
            <div style="font-size:12px; color:var(--color-text-muted, #64748b);">
              • Δ Ratio < 0.4: Toan tăng AG + Toan không tăng AG | 0.8 - 2.0: Toan tăng AG đơn thuần | > 2.0: Kèm Kiềm chuyển hóa.
            </div>
          </div>

          <!-- Formula 3: FeNa -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:13.5px; color:var(--color-primary, #0284c7);">3. Phân Suất Thải Natri (FeNa)</strong>
              <span class="dsp-badge" style="background:#ede9fe; color:#6d28d9;">Suy thận cấp</span>
            </div>
            <div style="font-family:monospace; font-size:13px; background:var(--color-surface, #fff); padding:8px 12px; border-radius:6px; border:1px solid var(--color-border, #cbd5e1); margin-bottom:6px;">
              FeNa (%) = [(UNa * SCr) / (SNa * UCr)] * 100%
            </div>
            <div style="font-size:12px; color:var(--color-text-muted, #64748b);">
              • FeNa < 1%: Suy thận cấp trước thận (Đáp ứng bù dịch) | FeNa > 2%: Hoại tử ống thận cấp tại thận (ATN).
            </div>
          </div>

          <!-- Formula 4: PaO2 / FiO2 (Chỉ số Horovitz) -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:13.5px; color:var(--color-primary, #0284c7);">4. Chỉ Số Oxy Hóa Máu (PaO₂ / FiO₂) & ARDS Berlin</strong>
              <span class="dsp-badge" style="background:#fee2e2; color:#991b1b;">Hô hấp ARDS</span>
            </div>
            <div style="font-family:monospace; font-size:13px; background:var(--color-surface, #fff); padding:8px 12px; border-radius:6px; border:1px solid var(--color-border, #cbd5e1); margin-bottom:6px;">
              P/F Ratio = PaO₂ (mmHg) / FiO₂ (dạng thập phân, VD: 60% = 0.6)
            </div>
            <div style="font-size:12px; color:var(--color-text-muted, #64748b);">
              • P/F 200 - 300: ARDS Nhẹ | P/F 100 - 200: ARDS Vừa | P/F < 100: ARDS Nặng (Cần thông khí nằm sấp Prone position).
            </div>
          </div>

          <!-- Formula 5: Parkland Burn -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <strong style="font-size:13.5px; color:var(--color-primary, #0284c7);">5. Công Thức Bù Dịch Bỏng Parkland</strong>
              <span class="dsp-badge" style="background:#ffedd5; color:#9a3412;">Cấp cứu bỏng</span>
            </div>
            <div style="font-family:monospace; font-size:13px; background:var(--color-surface, #fff); padding:8px 12px; border-radius:6px; border:1px solid var(--color-border, #cbd5e1); margin-bottom:6px;">
              Tổng dịch Ringer Lactate (24h đầu) = 4 mL * Cân nặng (kg) * % Diện tích bỏng (TBSA)
            </div>
            <div style="font-size:12px; color:var(--color-text-muted, #64748b);">
              • Truyền 50% tổng dịch trong 8 giờ đầu (tính từ thời điểm bị bỏng), 50% còn lại truyền trong 16 giờ tiếp theo.
            </div>
          </div>

        </div>
      `;
    }

    if (this.currentTab === 'ecg_abg') {
      return `
        <div style="display:flex; flex-direction:column; gap:16px;">
          
          <!-- ECG 7 Steps -->
          <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:16px;">
            <h4 style="margin:0 0 10px; font-size:14px; color:var(--color-primary, #0284c7); font-weight:700;">
              <i class="fa-solid fa-heart-pulse"></i> 7 Bước Đọc Điện Tâm Đồ (ECG) Chuẩn
            </h4>
            <ol style="margin:0; padding-left:18px; font-size:12.5px; color:var(--color-text, #334155); line-height:1.5;">
              <li><strong>Tần số & Nhịp:</strong> Nhịp xoang? Đều hay không? Tần số = 300 / số ô lớn (hoặc 1500 / số ô nhỏ).</li>
              <li><strong>Trục điện tim:</strong> D1 & aVF cùng dương ➔ Trục trung gian (-30° đến +90°).</li>
              <li><strong>Sóng P:</strong> Rộng < 0.12s (dày nhĩ trái nếu P 2 đỉnh), Cao < 2.5mm ở D2 (dày nhĩ phải nếu P nhọn).</li>
              <li><strong>Khoảng PR:</strong> 0.12 - 0.20s (Ngắn: Hội chứng WPW; Dài > 0.20s: Block AV độ 1).</li>
              <li><strong>Phức bộ QRS:</strong> Hẹp < 0.12s hay Rộng ≥ 0.12s (Block nhánh LBBB/RBBB). Tiêu chuẩn dày thất trái (Sokolow: SV1 + RV5 > 35mm).</li>
              <li><strong>Đoạn ST & Sóng T:</strong> ST chênh lên dạng vòm (STEMI), ST chênh xuống (thiếu máu cơ tim), T nhọn đối xứng (tăng Kali).</li>
              <li><strong>Khoảng QTc:</strong> QTc Bazett = QT / √RR. Bình thường: Nam < 450ms, Nữ < 460ms. Nguy cơ xoắn đỉnh khi QTc > 500ms.</li>
            </ol>
          </div>

          <!-- Sgarbossa Criteria -->
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:10px; padding:14px;">
            <strong style="font-size:13px; color:#9f1239; display:flex; align-items:center; gap:6px; margin-bottom:6px;">
              <i class="fa-solid fa-triangle-exclamation"></i> Tiêu Chuẩn Sgarbossa (Nhồi máu cơ tim trên nền LBBB / Nhịp máy tạo nhịp)
            </strong>
            <ul style="margin:0; padding-left:18px; font-size:12px; color:#881337; line-height:1.45;">
              <li>ST chênh lên cùng chiều QRS ≥ 1mm ở bất kỳ chuyển đạo nào (+5 điểm)</li>
              <li>ST chênh xuống cùng chiều QRS ≥ 1mm ở V1, V2 hoặc V3 (+3 điểm)</li>
              <li>ST chênh lên ngược chiều QRS ≥ 5mm (hoặc tỉ lệ ST/S ≥ 0.25 trong tiêu chuẩn Smith cải biên) (+2 điểm)</li>
            </ul>
            <div style="margin-top:6px; font-size:11.5px; font-weight:700; color:#9f1239;">➔ Tổng điểm ≥ 3: Độ đặc hiệu 98% cho Nhồi máu cơ tim cấp cần chụp mạch vành khẩn!</div>
          </div>

          <!-- ABG 6 Steps -->
          <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:16px;">
            <h4 style="margin:0 0 10px; font-size:14px; color:var(--color-primary, #0284c7); font-weight:700;">
              <i class="fa-solid fa-lungs"></i> 6 Bước Phân Tích Khí Máu Động Mạch (ABG)
            </h4>
            <ol style="margin:0; padding-left:18px; font-size:12.5px; color:var(--color-text, #334155); line-height:1.5;">
              <li><strong>pH:</strong> < 7.35 (Toan máu) hay > 7.45 (Kiềm máu)?</li>
              <li><strong>Rối loạn tiên phát:</strong> Xem PaCO2 và HCO3- biến thiên cùng chiều pH không?</li>
              <li><strong>Bù trừ:</strong> Toan chuyển hóa: PaCO2 kỳ vọng = (1.5 * HCO3-) + 8 ± 2 (Công thức Winter).</li>
              <li><strong>Anion Gap:</strong> Tính AG = Na - (Cl + HCO3). Nếu > 12 ➔ Toan chuyển hóa tăng AG.</li>
              <li><strong>Delta Ratio:</strong> ΔAG / ΔHCO3 để tìm rối loạn toan kiềm hỗn hợp 2-3 tầng.</li>
              <li><strong>Oxy hóa máu:</strong> PaO2 và PaO2/FiO2 để đánh giá suy hô hấp giảm oxy máu.</li>
            </ol>
          </div>

        </div>
      `;
    }

    if (this.currentTab === 'acls') {
      return `
        <div style="display:flex; flex-direction:column; gap:16px;">
          
          <!-- ACLS Algorithm -->
          <div style="background:#fef2f2; border:1px solid #fee2e2; border-left:4px solid #ef4444; border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 8px; font-size:14px; color:#991b1b; font-weight:800;">
              <i class="fa-solid fa-heart-pulse"></i> ACLS Cấp Cứu Ngừng Tim (Cardiac Arrest)
            </h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:12px; margin-bottom:8px;">
              <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #fecdd3;">
                <strong style="color:#dc2626;">⚡ Nhịp SỐC ĐƯỢC (VF / pVT):</strong>
                <ul style="margin:4px 0 0; padding-left:16px;">
                  <li>Sốc điện 120-200J (Hai pha)</li>
                  <li>CPR 2 phút ngay sau sốc</li>
                  <li>Adrenaline 1mg IV sau sốc lần 2 (mỗi 3-5p)</li>
                  <li>Amiodarone 300mg IV sau sốc lần 3 (lặp lại 150mg)</li>
                </ul>
              </div>
              <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #fecdd3;">
                <strong style="color:#475569;">⛔ Nhịp KHÔNG SỐC (Asystole / PEA):</strong>
                <ul style="margin:4px 0 0; padding-left:16px;">
                  <li>CPR liên tục 2 phút</li>
                  <li>Adrenaline 1mg IV CÀNG SỚM CÀNG TỐT</li>
                  <li>Tìm và xử trí 5H & 5T</li>
                </ul>
              </div>
            </div>
            <div style="font-size:11.5px; color:#7f1d1d;">
              <strong>Nguyên nhân 5H:</strong> Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia.<br/>
              <strong>Nguyên nhân 5T:</strong> Tension pneumothorax, Tamponade (tim), Toxins, Thrombosis (phổi - PE), Thrombosis (vành - MI).
            </div>
          </div>

          <!-- Anaphylaxis -->
          <div style="background:#eff6ff; border:1px solid #dbeafe; border-left:4px solid #3b82f6; border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 8px; font-size:14px; color:#1e40af; font-weight:800;">
              <i class="fa-solid fa-syringe"></i> Phác Đồ Cấp Cứu Sốc Phản Vệ (Anaphylaxis)
            </h4>
            <div style="font-size:12.5px; color:#1e3a8a; line-height:1.5;">
              • <strong>Thuốc số 1 cứu mạng:</strong> ADRENALINE (Epinephrine) 1:1000 (1mg/1mL)<br/>
              • <strong>Liều người lớn:</strong> 0.5 mg (0.5 mL) TIÊM BẮP (IM) NGAY VÀO MẶT TRƯỚC NGOÀI ĐÙI. Trẻ em: 0.01 mg/kg (tối đa 0.3mg).<br/>
              • Lặp lại mỗi 5 - 15 phút nếu triệu chứng chưa cải thiện hoặc huyết áp chưa lên.<br/>
              • Đặt đường truyền TM lớn, truyền nhanh NaCl 0.9% 1 - 2 Lít trong 30-60 phút.<br/>
              • <em>(Kháng Histamin và Corticoid chỉ là thuốc hỗ trợ bước 2, KHÔNG thay thế Adrenaline).</em>
            </div>
          </div>

          <!-- Massive Transfusion -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
            <h4 style="margin:0 0 6px; font-size:13.5px; color:var(--color-text, #0f172a); font-weight:700;">
              <i class="fa-solid fa-droplet" style="color:#ef4444;"></i> Phác Đồ Truyền Máu Khối Lượng Lớn (MTP)
            </h4>
            <div style="font-size:12.5px; color:#334155; line-height:1.45;">
              • Tỷ lệ cân bằng 1:1:1 ➔ <strong>1 Đơn vị Khối Hồng Cầu : 1 Đơn vị Huyết Tương Tươi Đông Lạnh (FFP) : 1 Đơn vị Khối Tiểu Cầu</strong>.<br/>
              • Bổ sung Acid Tranexamic (TXA) 1g IV trong 10 phút đầu (trong 3h từ khi chấn thương), sau đó 1g truyền trong 8h.<br/>
              • Bổ sung Canxi Clorid 1g IV mỗi 4 đơn vị máu để phòng hạ Canxi do ngộ độc Citrate.
            </div>
          </div>

        </div>
      `;
    }

    if (this.currentTab === 'ebm_calc') {
      const selectedTest = COMMON_DIAGNOSTIC_TESTS.find(t => t.id === this.faganSelectedTestId) || COMMON_DIAGNOSTIC_TESTS[0]!;
      return `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <!-- 1. Fagan Nomogram -->
          ${renderFaganNomogramHtml(this.faganPreProb, selectedTest.lrPositive, selectedTest.lrNegative)}

          <!-- 2. NNT / ARR / RRR Calculator -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <strong style="font-size:13.5px; color:#8b5cf6;"><i class="fa-solid fa-calculator"></i> Máy Tính NNT / NNH / Giảm Nguy Cơ Tuyệt Đối (ARR)</strong>
              <span class="dsp-badge" style="background:rgba(139,92,246,0.1); color:#8b5cf6;">EBM Trial</span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:10px;">
              <div>
                <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted);">Tỷ lệ biến cố Nhóm Chứng (CER %):</label>
                <input type="number" id="ebmCerInput" class="dsp-input" value="15" min="0.1" max="100" step="0.1" style="font-size:12.5px; margin-top:3px;" />
              </div>
              <div>
                <label style="font-size:11.5px; font-weight:700; color:var(--color-text-muted);">Tỷ lệ biến cố Nhóm Can Thiệp (EER %):</label>
                <input type="number" id="ebmEerInput" class="dsp-input" value="10" min="0.1" max="100" step="0.1" style="font-size:12.5px; margin-top:3px;" />
              </div>
            </div>

            <div id="ebmMetricsResultBox" style="background:var(--color-surface, #fff); border:1px solid var(--color-border); border-left:4px solid #8b5cf6; border-radius:6px; padding:10px 12px; font-size:12px; line-height:1.45;">
              <div style="display:flex; gap:16px; margin-bottom:4px; font-weight:700; color:var(--color-text);">
                <span>ARR: <strong id="resArrVal" style="color:#059669;">5.0%</strong></span>
                <span>RRR: <strong id="resRrrVal" style="color:#2563eb;">33.3%</strong></span>
                <span>NNT: <strong id="resNntVal" style="color:#8b5cf6;">20</strong></span>
              </div>
              <div id="resInterpVal" style="color:var(--color-text-muted);">
                ✨ NNT = 20: Cứ điều trị 20 bệnh nhân bằng phác đồ này sẽ phòng ngừa được 1 biến cố tử vong/nhập viện.
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Bedside Checklist
    return `
      <div style="display:flex; flex-direction:column; gap:16px;">
        
        <!-- Glasgow -->
        <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
          <h4 style="margin:0 0 8px; font-size:14px; color:var(--color-primary, #0284c7); font-weight:700;">
            <i class="fa-solid fa-brain"></i> Thang Điểm Hôn Mê Glasgow (GCS: 3 - 15 Điểm)
          </h4>
          <div style="font-size:12px; color:#334155; display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
            <div style="background:var(--color-bg); padding:8px; border-radius:6px;">
              <strong>Mở mắt (E: 1-4):</strong><br/>
              4 - Tự nhiên<br/>3 - Theo lời nói<br/>2 - Đáp ứng đau<br/>1 - Không mở
            </div>
            <div style="background:var(--color-bg); padding:8px; border-radius:6px;">
              <strong>Lời nói (V: 1-5):</strong><br/>
              5 - Đúng/Định hướng<br/>4 - Lú lẫn<br/>3 - Từ vô nghĩa<br/>2 - Âm thanh ú ớ<br/>1 - Không đáp ứng
            </div>
            <div style="background:var(--color-bg); padding:8px; border-radius:6px;">
              <strong>Vận động (M: 1-6):</strong><br/>
              6 - Theo y lệnh<br/>5 - Định vị đau<br/>4 - Co giật rút lại<br/>3 - Co cứng mất vỏ<br/>2 - Duỗi cứng mất não<br/>1 - Không đáp ứng
            </div>
          </div>
          <div style="margin-top:6px; font-size:11.5px; font-weight:700; color:#ef4444;">🚨 GCS ≤ 8 điểm: Đặt nội khí quản bảo vệ đường thở!</div>
        </div>

        <!-- Abdominal Signs -->
        <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
          <h4 style="margin:0 0 8px; font-size:14px; color:var(--color-primary, #0284c7); font-weight:700;">
            <i class="fa-solid fa-hand-dots"></i> Dấu Hiệu Khám Bụng Cấp Kinh Điển
          </h4>
          <ul style="margin:0; padding-left:18px; font-size:12px; color:#334155; line-height:1.5;">
            <li><strong>Điểm McBurney / Dấu Rovsing / Dấu Cơ thắt lưng chậu (Psoas):</strong> Viêm ruột thừa cấp.</li>
            <li><strong>Dấu hiệu Murphy:</strong> Viêm túi mật cấp (ngừng thở đột ngột khi ấn điểm túi mật thì hít vào).</li>
            <li><strong>Dấu Blumberg (Cảm ứng phúc mạc):</strong> Viêm phúc mạc toàn thể.</li>
            <li><strong>Dấu Cullen / Grey-Turner:</strong> Xuất huyết quanh rốn / hông lưng trong Viêm tụy cấp hoại tử nặng.</li>
            <li><strong>Dấu Kehr:</strong> Đau chói lan lên đỉnh vai trái khi ấn hạ sườn trái trong Vỡ lách cấp.</li>
          </ul>
        </div>

      </div>
    `;
  }

  private bindEvents() {
    document.getElementById('btnCloseQuickRefDrawer')?.addEventListener('click', () => this.close());

    this.drawerEl.querySelectorAll('.qrd-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as any;
        if (tab) {
          this.currentTab = tab;
          this.renderLayout();
          this.bindEvents();
        }
      });
    });

    const vaultInput = document.getElementById('qrefVaultSearchInput') as HTMLInputElement | null;
    let debounceTimer: any = null;
    vaultInput?.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchVaultQuery = vaultInput.value;
        this.renderLayout();
        this.bindEvents();
        // Focus back to input
        const newInput = document.getElementById('qrefVaultSearchInput') as HTMLInputElement | null;
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
      }, 150);
    });

    document.getElementById('btnResetQrefSearch')?.addEventListener('click', () => {
      this.searchVaultQuery = '';
      this.renderLayout();
      this.bindEvents();
    });

    // Fagan Nomogram Controls
    const slider = document.getElementById('faganPreProbSlider') as HTMLInputElement | null;
    const testSelect = document.getElementById('faganTestSelect') as HTMLSelectElement | null;
    
    if (testSelect) {
      testSelect.value = this.faganSelectedTestId;
    }

    const updateFaganLive = () => {
      if (!slider || !testSelect) return;
      const preP = parseInt(slider.value, 10) || 25;
      this.faganPreProb = preP;
      this.faganSelectedTestId = testSelect.value;
      const selectedOption = testSelect.options[testSelect.selectedIndex];
      const lrPos = parseFloat(selectedOption?.dataset.lrpos || '10');
      const lrNeg = parseFloat(selectedOption?.dataset.lrneg || '0.1');

      const preProbVal = document.getElementById('faganPreProbVal');
      if (preProbVal) preProbVal.textContent = `${preP}%`;

      const postPos = calculatePostTestProbability(preP, lrPos);
      const postNeg = calculatePostTestProbability(preP, lrNeg);

      const postPosText = document.getElementById('faganPostPosText');
      if (postPosText) postPosText.textContent = `${postPos}%`;

      const postNegText = document.getElementById('faganPostNegText');
      if (postNegText) postNegText.textContent = `${postNeg}%`;

      // Update SVG coordinates
      const getY = (valPercent: number) => {
        const clamped = Math.max(0.1, Math.min(99.9, valPercent));
        const logOdds = Math.log(clamped / (100 - clamped));
        const norm = (logOdds + 6.9) / 13.8;
        return 320 - (norm * 280);
      };

      const yPre = getY(preP);
      const yPostPos = getY(postPos);
      const yPostNeg = getY(postNeg);

      const linePos = document.getElementById('svgLinePos');
      if (linePos) {
        linePos.setAttribute('y1', yPre.toString());
        linePos.setAttribute('y2', yPostPos.toString());
      }
      const dotPre = document.getElementById('svgDotPre');
      if (dotPre) dotPre.setAttribute('cy', yPre.toString());

      const dotPostPos = document.getElementById('svgDotPostPos');
      if (dotPostPos) dotPostPos.setAttribute('cy', yPostPos.toString());

      const lineNeg = document.getElementById('svgLineNeg');
      if (lineNeg) {
        lineNeg.setAttribute('y1', yPre.toString());
        lineNeg.setAttribute('y2', yPostNeg.toString());
      }
      const dotPostNeg = document.getElementById('svgDotPostNeg');
      if (dotPostNeg) dotPostNeg.setAttribute('cy', yPostNeg.toString());
    };

    slider?.addEventListener('input', updateFaganLive);
    testSelect?.addEventListener('change', updateFaganLive);

    // NNT / ARR Inputs
    const cerInput = document.getElementById('ebmCerInput') as HTMLInputElement | null;
    const eerInput = document.getElementById('ebmEerInput') as HTMLInputElement | null;

    const updateEbmMetricsLive = () => {
      if (!cerInput || !eerInput) return;
      const cer = parseFloat(cerInput.value) || 0;
      const eer = parseFloat(eerInput.value) || 0;
      const res = calculateEbmMetrics(cer, eer);

      const resArr = document.getElementById('resArrVal');
      if (resArr) {
        resArr.textContent = `${res.arr}%`;
        resArr.style.color = res.isHarm ? '#ef4444' : '#059669';
      }
      const resRrr = document.getElementById('resRrrVal');
      if (resRrr) resRrr.textContent = `${res.rrr}%`;
      const resNnt = document.getElementById('resNntVal');
      if (resNnt) {
        resNnt.textContent = res.nnt.toString();
        resNnt.style.color = res.isHarm ? '#ef4444' : '#8b5cf6';
      }
      const resInterp = document.getElementById('resInterpVal');
      if (resInterp) resInterp.textContent = res.interpretation;
    };

    cerInput?.addEventListener('input', updateEbmMetricsLive);
    eerInput?.addEventListener('input', updateEbmMetricsLive);
  }
}

export const quickReferenceDrawer = new QuickReferenceDrawer();
