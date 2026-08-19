/**
 * DocSpace — Settings & Hub Modal
 * Modal Trung tâm Cài đặt & Quản lý Hệ thống, Dữ liệu, Hồ sơ & Tiện ích Lâm sàng
 */

import { getActiveProfile, exportProfile, exportProfileToFHIR, safeStorageRemove } from '../storage';
import { escapeHtml } from '../docspace-view';
import { quickReferenceDrawer } from './quick-reference-drawer';
import { drugIntelligencePanel } from './drug-intelligence-panel';
import { calculatorPicker } from './calculator-picker';

export class DocSpaceSettingsModal {
  private modalEl: HTMLElement;

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalDocSpaceSettings';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1065';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(6px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.style.display === 'flex') {
        this.close();
      }
    });
  }

  public open() {
    const profile = getActiveProfile();
    if (!profile) return;

    this.render(profile);
    this.modalEl.style.display = 'flex';
    this.bindEvents(profile.id);
  }

  public close() {
    this.modalEl.style.display = 'none';
  }

  private render(profile: any) {
    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #ffffff); width:100%; max-width:620px; max-height:90vh; border-radius:16px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border, #e2e8f0); position:relative; font-family:inherit;">
        
        <!-- Header -->
        <div style="padding:16px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:38px; height:38px; border-radius:10px; background:linear-gradient(135deg, #0284c7, #0369a1); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 6px -1px rgba(2,132,199,0.3);">
              <i class="fa-solid fa-gear"></i>
            </div>
            <div>
              <h3 style="margin:0; font-size:17px; font-weight:800; color:var(--color-text, #0f172a);">Cài Đặt &amp; Tiện Ích DocSpace</h3>
              <p style="margin:2px 0 0; font-size:12px; color:var(--color-text-muted, #64748b);">Quản lý hệ thống, sao lưu dữ liệu &amp; công cụ nhanh</p>
            </div>
          </div>
          <button id="btnCloseDocSpaceSettings" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; cursor:pointer; color:var(--color-text-muted, #64748b); transition:all 0.2s;" title="Đóng (Esc)">&times;</button>
        </div>

        <!-- Body Content -->
        <div style="padding:20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:20px;">
          
          <!-- Bác sĩ Hồ sơ hiện tại -->
          <div style="background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:12px; padding:14px 16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:42px; height:42px; border-radius:50%; background:linear-gradient(135deg, #0284c7, #8b5cf6); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:15px;">
                ${escapeHtml(profile.displayName ? profile.displayName.substring(0, 2).toUpperCase() : 'DR')}
              </div>
              <div>
                <div style="font-weight:800; font-size:15px; color:var(--color-text, #0f172a);">${escapeHtml(profile.displayName)}</div>
                <div style="font-size:12px; color:var(--color-text-muted, #64748b);">${escapeHtml(profile.specialty || 'Bác sĩ Lâm sàng')} · <code>ID: ${escapeHtml(profile.id)}</code></div>
              </div>
            </div>
            <button id="btnSettingsSwitchProfile" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="font-size:12px;">
              <i class="fa-solid fa-repeat"></i> Đổi Hồ Sơ
            </button>
          </div>

          <!-- Section 1: Tiện Ích Lâm Sàng Siêu Tốc -->
          <div>
            <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted, #64748b); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-bolt" style="color:#0284c7;"></i> Tiện Ích Lâm Sàng Siêu Tốc
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:10px;">
              <button id="btnSettingsQuickRef" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px; display:flex; flex-direction:column; align-items:flex-start; gap:4px; cursor:pointer; text-align:left; transition:all 0.15s;">
                <div style="color:#0284c7; font-size:16px;"><i class="fa-solid fa-bolt"></i></div>
                <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">Tra Cứu Siêu Tốc</div>
                <div style="font-size:11px; color:var(--color-text-muted, #64748b);">ACLS, Kháng sinh, ECG</div>
              </button>

              <button id="btnSettingsDrugIntel" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px; display:flex; flex-direction:column; align-items:flex-start; gap:4px; cursor:pointer; text-align:left; transition:all 0.15s;">
                <div style="color:#db2777; font-size:16px;"><i class="fa-solid fa-pills"></i></div>
                <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">Drug Intelligence</div>
                <div style="font-size:11px; color:var(--color-text-muted, #64748b);">Dược thư & Tương tác</div>
              </button>

              <button id="btnSettingsCalculators" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px; display:flex; flex-direction:column; align-items:flex-start; gap:4px; cursor:pointer; text-align:left; transition:all 0.15s;">
                <div style="color:#f59e0b; font-size:16px;"><i class="fa-solid fa-calculator"></i></div>
                <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">Kho Thang Điểm</div>
                <div style="font-size:11px; color:var(--color-text-muted, #64748b);">qSOFA, GCS, eGFR...</div>
              </button>
            </div>
          </div>

          <!-- Section 2: Cấu Hình & Đồng Bộ Dữ Liệu -->
          <div>
            <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted, #64748b); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-cloud-arrow-up" style="color:#8b5cf6;"></i> Cấu Hình &amp; Đồng Bộ
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <a href="#/docspace/ai-settings" id="linkSettingsAI" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; text-decoration:none; color:inherit; transition:all 0.15s;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:32px; height:32px; border-radius:8px; background:rgba(139,92,246,0.12); color:#8b5cf6; display:flex; align-items:center; justify-content:center; font-size:14px;">
                    <i class="fa-solid fa-microchip"></i>
                  </div>
                  <div>
                    <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">Cấu hình AI Co-Pilot &amp; Local LLM</div>
                    <div style="font-size:11.5px; color:var(--color-text-muted, #64748b);">Tích hợp DeepSeek, OpenAI, Gemini &amp; Offline Ollama</div>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right" style="color:var(--color-text-muted, #94a3b8); font-size:12px;"></i>
              </a>

              <a href="#/docspace/sync-settings" id="linkSettingsSync" style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; text-decoration:none; color:inherit; transition:all 0.15s;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:32px; height:32px; border-radius:8px; background:rgba(14,165,233,0.12); color:#0ea5e9; display:flex; align-items:center; justify-content:center; font-size:14px;">
                    <i class="fa-solid fa-rotate"></i>
                  </div>
                  <div>
                    <div style="font-weight:700; font-size:13px; color:var(--color-text, #0f172a);">Đồng Bộ Đa Thiết Bị (P2P / Supabase)</div>
                    <div style="font-size:11.5px; color:var(--color-text-muted, #64748b);">Đồng bộ qua mã PIN an toàn hoặc Cloud cá nhân</div>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right" style="color:var(--color-text-muted, #94a3b8); font-size:12px;"></i>
              </a>
            </div>
          </div>

          <!-- Section 3: Sao Lưu & Xuất Dữ Liệu Y Tế -->
          <div>
            <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:0.05em; color:var(--color-text-muted, #64748b); margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-shield-halved" style="color:#10b981;"></i> Sao Lưu &amp; Xuất Dữ Liệu
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <button id="btnSettingsExportJson" class="dsp-btn dsp-btn-outline" style="font-size:12px; padding:10px; justify-content:center; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-file-export"></i> Xuất JSON Backup
              </button>
              <button id="btnSettingsExportFhir" class="dsp-btn dsp-btn-outline" style="font-size:12px; padding:10px; justify-content:center; display:flex; align-items:center; gap:6px; color:#10b981; border-color:rgba(16,185,129,0.3);">
                <i class="fa-solid fa-file-medical"></i> Xuất Chuẩn FHIR R4
              </button>
            </div>
          </div>

        </div>

        <!-- Footer -->
        <div style="padding:12px 20px; border-top:1px solid var(--color-border, #e2e8f0); background:var(--color-bg, #f8fafc); display:flex; justify-content:space-between; align-items:center;">
          <a href="#/" style="font-size:12px; color:var(--color-primary, #0284c7); text-decoration:none; font-weight:700; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-house"></i> Về Trang chủ CliniPortal
          </a>
          <button id="btnCloseSettingsFooter" class="dsp-btn dsp-btn-sm dsp-btn-ghost">
            Đóng
          </button>
        </div>

      </div>
    `;
  }

  private bindEvents(profileId: string) {
    const close = () => this.close();

    document.getElementById('btnCloseDocSpaceSettings')?.addEventListener('click', close);
    document.getElementById('btnCloseSettingsFooter')?.addEventListener('click', close);

    document.getElementById('btnSettingsSwitchProfile')?.addEventListener('click', () => {
      safeStorageRemove('dsp_active_profile');
      close();
      window.location.hash = '#/docspace';
    });

    document.getElementById('btnSettingsQuickRef')?.addEventListener('click', () => {
      close();
      quickReferenceDrawer.open();
    });

    document.getElementById('btnSettingsDrugIntel')?.addEventListener('click', () => {
      close();
      drugIntelligencePanel.open();
    });

    document.getElementById('btnSettingsCalculators')?.addEventListener('click', () => {
      close();
      calculatorPicker.open();
    });

    document.getElementById('linkSettingsAI')?.addEventListener('click', close);
    document.getElementById('linkSettingsSync')?.addEventListener('click', close);

    document.getElementById('btnSettingsExportJson')?.addEventListener('click', () => {
      exportProfile(profileId);
    });

    document.getElementById('btnSettingsExportFhir')?.addEventListener('click', () => {
      exportProfileToFHIR(profileId);
    });
  }
}

export const docSpaceSettingsModal = new DocSpaceSettingsModal();
