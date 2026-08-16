/**
 * CliniPortal — Cấp Cứu & Hồi Sức Tích Cực (HS-CC) Native SPA View (TypeScript)
 */

import { ESI_LEVELS } from './phan-loai-triage-cap-cuu';
import { EMERGENCY_PROTOCOLS, startCprTimer, stopCprTimer, resetCprTimer } from './emergency-quick-protocol';

export type EmergencyTab = 'triage' | 'protocols' | 'toxicology' | 'trauma' | 'san-nhi';

export function renderCapCuuView(activeTab: EmergencyTab = 'triage'): string {
  return `
    <div class="cap-cuu-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/approaches" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Phân Hệ Tiếp Cận</a> / Cấp Cứu & Hồi Sức (HS-CC)
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-danger, #dc2626); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-truck-medical"></i> Hồi Sức Cấp Cứu & Phân Tầng Khẩn Cấp
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/approaches" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <button class="cap-cuu-tab-btn ${activeTab === 'triage' ? 'active' : ''}" onclick="window.switchCapCuuTab('triage')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'triage' ? 'var(--color-danger, #dc2626)' : 'transparent'}; color: ${activeTab === 'triage' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-list-check"></i> ESI Triage 1-5
        </button>
        <button class="cap-cuu-tab-btn ${activeTab === 'protocols' ? 'active' : ''}" onclick="window.switchCapCuuTab('protocols')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'protocols' ? 'var(--color-danger, #dc2626)' : 'transparent'}; color: ${activeTab === 'protocols' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-bolt"></i> Phác Đồ STAT & CPR Timer
        </button>
        <button class="cap-cuu-tab-btn ${activeTab === 'toxicology' ? 'active' : ''}" onclick="window.switchCapCuuTab('toxicology')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'toxicology' ? 'var(--color-danger, #dc2626)' : 'transparent'}; color: ${activeTab === 'toxicology' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-skull-crossbones"></i> Chống Độc & Môi Trường
        </button>
        <button class="cap-cuu-tab-btn ${activeTab === 'trauma' ? 'active' : ''}" onclick="window.switchCapCuuTab('trauma')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'trauma' ? 'var(--color-danger, #dc2626)' : 'transparent'}; color: ${activeTab === 'trauma' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-bone"></i> Ngoại Khoa & ATLS
        </button>
        <button class="cap-cuu-tab-btn ${activeTab === 'san-nhi' ? 'active' : ''}" onclick="window.switchCapCuuTab('san-nhi')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'san-nhi' ? 'var(--color-danger, #dc2626)' : 'transparent'}; color: ${activeTab === 'san-nhi' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-baby"></i> Cấp Cứu Sản - Nhi
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="capCuuContentArea">
        ${renderActiveTabContent(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveTabContent(tab: EmergencyTab): string {
  switch (tab) {
    case 'triage':
      return renderTriageContent();
    case 'protocols':
      return renderProtocolsContent();
    case 'toxicology':
      return renderToxicologyContent();
    case 'trauma':
      return renderTraumaContent();
    case 'san-nhi':
      return renderSanNhiContent();
    default:
      return renderTriageContent();
  }
}

function renderTriageContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
      <!-- ESI Decision Tree -->
      <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: var(--color-text, #1e293b); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-sitemap" style="color: var(--color-primary, #0284c7);"></i> Thuật Toán Phân Loại ESI (Emergency Severity Index v4)
        </h2>
        
        <div id="esiInteractiveTree" style="padding: 1rem; background: var(--color-bg, #f8fafc); border-radius: 8px;">
          <!-- Step 1 -->
          <div id="dtStep1" class="dt-step active" style="margin-bottom: 1rem;">
            <div style="font-weight: 700; font-size: 1rem; color: #b91c1c; margin-bottom: 0.5rem;">
              BƯỚC A: Bệnh nhân có cần can thiệp cấp cứu hồi sinh sự sống NGAY LẬP TỨC?
            </div>
            <p style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">
              (Ngưng tim/thở, tắc nghẽn đường thở, SpO2 < 85%, mạch không bắt được, tụt huyết áp sâu, hôn mê GCS ≤ 8)
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <button onclick="window.setEsiLevel(1)" style="padding: 0.5rem 1.25rem; background: #dc2626; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                CÓ ➔ ESI LEVEL 1 (ĐỎ)
              </button>
              <button onclick="window.nextDtStep(2)" style="padding: 0.5rem 1.25rem; background: var(--color-surface, #ffffff); color: var(--color-text, #334155); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; font-weight: 600; cursor: pointer;">
                KHÔNG ➔ Tiếp tục
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div id="dtStep2" class="dt-step" style="display: none; margin-bottom: 1rem;">
            <div style="font-weight: 700; font-size: 1rem; color: #c2410c; margin-bottom: 0.5rem;">
              BƯỚC B: Bệnh nhân có nguy cơ cao? Lú lẫn/ngủ gà? Hoặc Đau/Khó chịu dữ dội (Pain 7-10/10)?
            </div>
            <p style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">
              (Đau ngực kiểu mạch vành, nghi ngờ phình bóc tách ĐMC, đột quỵ cấp, sốc phản vệ nhẹ, đau quặn dữ dội)
            </p>
            <div style="display: flex; gap: 0.75rem;">
              <button onclick="window.setEsiLevel(2)" style="padding: 0.5rem 1.25rem; background: #ea580c; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                CÓ ➔ ESI LEVEL 2 (CAM)
              </button>
              <button onclick="window.nextDtStep(3)" style="padding: 0.5rem 1.25rem; background: var(--color-surface, #ffffff); color: var(--color-text, #334155); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; font-weight: 600; cursor: pointer;">
                KHÔNG ➔ Tiếp tục
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div id="dtStep3" class="dt-step" style="display: none; margin-bottom: 1rem;">
            <div style="font-weight: 700; font-size: 1rem; color: #b45309; margin-bottom: 0.5rem;">
              BƯỚC C: Dự kiến bệnh nhân cần bao nhiêu NGUỒN LỰC Y TẾ (Resources)?
            </div>
            <p style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">
              (Nguồn lực = Xét nghiệm máu/nước tiểu, X-quang/CT/MRI, Truyền dịch IV, Kháng sinh IV, Đặt sonde, Khâu vết thương...)
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <button onclick="window.setEsiLevel(5)" style="padding: 0.5rem 1.25rem; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                0 Nguồn lực ➔ ESI LEVEL 5 (XANH DƯƠNG)
              </button>
              <button onclick="window.setEsiLevel(4)" style="padding: 0.5rem 1.25rem; background: #16a34a; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                1 Nguồn lực ➔ ESI LEVEL 4 (XANH LÁ)
              </button>
              <button onclick="window.setEsiLevel(3)" style="padding: 0.5rem 1.25rem; background: #d97706; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                ≥ 2 Nguồn lực ➔ ESI LEVEL 3 (VÀNG)
              </button>
            </div>
          </div>

          <!-- Result Area -->
          <div id="dtResultStep" style="display: none; padding: 1.25rem; border-radius: 8px; color: white; margin-top: 1rem;">
            <div id="dtResultBox" style="padding: 1.25rem; border-radius: 8px; background: #dc2626;">
              <h3 id="dtResultTitle" style="font-size: 1.25rem; font-weight: 800; margin: 0 0 0.5rem 0;">BỆNH NHÂN ESI LEVEL 1</h3>
              <p id="dtResultDesc" style="font-size: 0.95rem; margin: 0 0 1rem 0; opacity: 0.95;">Xử trí hồi sức khẩn cấp NGAY LẬP TỨC!</p>
              <button onclick="window.resetDt()" style="padding: 0.4rem 1rem; background: rgba(255,255,255,0.25); border: 1px solid rgba(255,255,255,0.5); color: white; border-radius: 6px; font-weight: 600; cursor: pointer;">
                <i class="fa-solid fa-rotate-right"></i> Phân loại bệnh nhân mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Triage 5-Level Reference Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        <div style="background: var(--color-surface, #fff); border-top: 4px solid #dc2626; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="font-weight: 800; color: #dc2626; font-size: 0.9rem;">ESI LEVEL 1 — TỐI KHẨN</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0;">Thời gian: <strong>0 PHÚT (NGAY LẬP TỨC)</strong></div>
          <p style="font-size: 0.8rem; margin: 0; color: var(--color-text, #334155);">Ngưng tuần hoàn, sốc sâu, suy hô hấp đe dọa tử vong.</p>
        </div>

        <div style="background: var(--color-surface, #fff); border-top: 4px solid #ea580c; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="font-weight: 800; color: #ea580c; font-size: 0.9rem;">ESI LEVEL 2 — KHẨN CẤP</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0;">Thời gian: <strong>< 10-15 PHÚT</strong></div>
          <p style="font-size: 0.8rem; margin: 0; color: var(--color-text, #334155);">Hội chứng vành cấp, bóc tách ĐMC, đau dữ dội 7-10/10.</p>
        </div>

        <div style="background: var(--color-surface, #fff); border-top: 4px solid #d97706; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="font-weight: 800; color: #d97706; font-size: 0.9rem;">ESI LEVEL 3 — KHẨN TRƯƠNG</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0;">Thời gian: <strong>30 - 60 PHÚT</strong></div>
          <p style="font-size: 0.8rem; margin: 0; color: var(--color-text, #334155);">Cần ≥ 2 nguồn lực CLS/thủ thuật, sinh hiệu tương đối ổn định.</p>
        </div>

        <div style="background: var(--color-surface, #fff); border-top: 4px solid #16a34a; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="font-weight: 800; color: #16a34a; font-size: 0.9rem;">ESI LEVEL 4 — BÁN KHẨN</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0;">Thời gian: <strong>1 - 2 GIỜ</strong></div>
          <p style="font-size: 0.8rem; margin: 0; color: var(--color-text, #334155);">Cần 1 nguồn lực (X-quang chi chấn thương, khâu vết rách nhỏ).</p>
        </div>

        <div style="background: var(--color-surface, #fff); border-top: 4px solid #0284c7; border-radius: 8px; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          <div style="font-weight: 800; color: #0284c7; font-size: 0.9rem;">ESI LEVEL 5 — KHÔNG KHẨN</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0;">Thời gian: <strong>Theo thứ tự phòng khám</strong></div>
          <p style="font-size: 0.8rem; margin: 0; color: var(--color-text, #334155);">Tái khám lấy thuốc, đổi băng, phát ban nhẹ không sốt.</p>
        </div>
      </div>
    </div>
  `;
}

function renderProtocolsContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 320px 1fr; gap: 1.5rem;" class="emergency-protocols-layout">
      <!-- Protocols Nav & CPR Timer -->
      <div>
        <!-- CPR 2-Min Live Metronome / Timer Widget -->
        <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 12px; padding: 1.25rem; color: white; margin-bottom: 1.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
          <div style="font-weight: 700; font-size: 0.95rem; color: #f87171; display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span><i class="fa-solid fa-heart-pulse"></i> ACLS CPR 2-MIN TIMER</span>
            <span id="cprCycleBadge" style="background: #dc2626; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px;">Chu kỳ 1</span>
          </div>
          <div style="text-align: center; font-size: 2.5rem; font-weight: 900; font-family: monospace; color: #facc15; margin-bottom: 0.75rem;" id="cprTimerDisplay">
            02:00
          </div>
          <div style="font-size: 0.75rem; color: #94a3b8; text-align: center; margin-bottom: 1rem;">
            Nhịp ép tim chuẩn: <strong>100 - 120 lần/phút</strong> (Độ sâu 5-6 cm)
          </div>
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button onclick="window.startCprTimer()" style="flex: 1; padding: 0.5rem; background: #16a34a; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
              <i class="fa-solid fa-play"></i> Bắt đầu
            </button>
            <button onclick="window.stopCprTimer()" style="padding: 0.5rem 0.75rem; background: #d97706; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
              <i class="fa-solid fa-pause"></i>
            </button>
            <button onclick="window.resetCprTimer()" style="padding: 0.5rem 0.75rem; background: #475569; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
              <i class="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        </div>

        <!-- Protocol Selection List -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; overflow: hidden;">
          <div style="padding: 0.75rem 1rem; background: var(--color-bg, #f8fafc); border-bottom: 1px solid var(--color-border, #e2e8f0); font-weight: 700; font-size: 0.85rem;">
            DANH MỤC PHÁC ĐỒ CẤP CỨU
          </div>
          <div style="display: flex; flex-direction: column;">
            <button onclick="window.loadProtocol('cpr')" class="proto-nav-btn active" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-heart-pulse" style="color: #dc2626;"></i> Ngưng Tuần Hoàn (ACLS)
            </button>
            <button onclick="window.loadProtocol('anaphylaxis')" class="proto-nav-btn" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-syringe" style="color: #ea580c;"></i> Phản Vệ Cấp (Anaphylaxis)
            </button>
            <button onclick="window.loadProtocol('asthma')" class="proto-nav-btn" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-wind" style="color: #0284c7;"></i> Hen Phế Quản Ác Tính
            </button>
            <button onclick="window.loadProtocol('ape')" class="proto-nav-btn" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-droplet" style="color: #0891b2;"></i> Phù Phổi Cấp (APE)
            </button>
            <button onclick="window.loadProtocol('seizure')" class="proto-nav-btn" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-brain" style="color: #8b5cf6;"></i> Co Giật / Trạng Thái Động Kinh
            </button>
            <button onclick="window.loadProtocol('septic')" class="proto-nav-btn" style="text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; cursor: pointer; font-weight: 600; font-size: 0.875rem; color: var(--color-text, #334155); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-biohazard" style="color: #dc2626;"></i> Sốc Nhiễm Khuẩn (Hour-1 Bundle)
            </button>
          </div>
        </div>
      </div>

      <!-- Protocol Display Body -->
      <div id="protocolDetailCard" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div id="protocolInnerContent">
          <!-- Default CPR Protocol -->
          <div style="border-bottom: 2px solid var(--color-danger, #dc2626); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-danger, #dc2626); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-heart-pulse"></i> Ngưng Tuần Hoàn (BLS / ACLS Protocol 2026)
            </h2>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 1rem; background: #fef2f2; border-left: 4px solid #dc2626; border-radius: 6px;">
              <div style="font-weight: 700; color: #991b1b; margin-bottom: 0.25rem;">1. Gọi hỗ trợ & Lấy máy AED / Máy Shock Điện</div>
              <p style="margin: 0; font-size: 0.875rem; color: #7f1d1d;">Xác nhận bất tỉnh, thở ngáp hoặc ngừng thở. Bắt mạch cảnh không quá 10 giây.</p>
            </div>

            <div style="padding: 1rem; background: #fff7ed; border-left: 4px solid #ea580c; border-radius: 6px;">
              <div style="font-weight: 700; color: #9a3412; margin-bottom: 0.25rem;">2. Ép tim liên tục chất lượng cao (100 - 120 lần/phút)</div>
              <p style="margin: 0; font-size: 0.875rem; color: #7c2d12;">Độ sâu 5-6 cm, trả lồng ngực hoàn toàn sau mỗi lần ép. Hạn chế tối đa gián đoạn ép tim (< 10s).</p>
            </div>

            <div style="padding: 1rem; background: #eff6ff; border-left: 4px solid #0284c7; border-radius: 6px;">
              <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.25rem;">3. Phân tích nhịp tim: Shockable vs Non-Shockable</div>
              <p style="margin: 0; font-size: 0.875rem; color: #1e3a8a;">
                • <strong>VF / pVT</strong>: SHOCK ĐIỆN NGAY (200J Biphasic) ➔ Ép tim tiếp 2 phút ngay không kiểm tra mạch.<br>
                • <strong>Asystole / PEA</strong>: Tiếp tục CPR, tiêm Adrenaline 1mg IV càng sớm càng tốt.
              </p>
            </div>

            <div style="padding: 1rem; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
              <div style="font-weight: 700; color: #166534; margin-bottom: 0.25rem;">4. Thuốc Hồi Sức & Xử Trí Nguyên Nhân (5H & 5T)</div>
              <p style="margin: 0; font-size: 0.875rem; color: #14532d;">
                • <strong>Adrenaline</strong> 1mg IV cứ mỗi 3 - 5 phút.<br>
                • <strong>Amiodarone</strong> 300mg IV sau shock lần 3 (liều 2: 150mg).<br>
                • Rà soát: Hypovolemia, Hypoxia, Hydrogen ion (Acid), Hypo/Hyperkalemia, Hypothermia, Tension PTX, Tamponade, Toxins, Thrombosis (Pulmonary/Coronary).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderToxicologyContent(): string {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #dc2626; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-spray-can"></i> Ngộ Độc Phốt Pho Hữu Cơ (OP)
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text, #334155); margin-bottom: 0.5rem;">
          <strong>Hội chứng Cholinergic (DUMBELS / SLUDGE):</strong> Tăng tiết đờm dãi, co đồng tử như đinh ghim, nhịp chậm, co thắt phế quản, đại tiểu tiện không tự chủ.
        </p>
        <div style="background: var(--color-bg, #f8fafc); padding: 0.75rem; border-radius: 6px; font-size: 0.85rem;">
          <strong>Xử trí cấp:</strong><br>
          1. <strong>Atropine</strong> 2-5mg IV mỗi 5-10 phút đến khi đạt tiêu chuẩn ngấm Atropine (Phổi hết ran ẩm, đồng tử giãn > 3mm, da khô, mạch > 80 l/p).<br>
          2. <strong>Pralidoxime (PAM)</strong> 1-2g IV truyền tĩnh mạch.
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #ea580c; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-pills"></i> Quá Liều Paracetamol (Acetaminophen)
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text, #334155); margin-bottom: 0.5rem;">
          Liều độc: > 150 mg/kg hoặc > 7.5g ở người lớn. Nguy cơ hoại tử tế bào gan cấp do chất chuyển hóa NAPQI.
        </p>
        <div style="background: var(--color-bg, #f8fafc); padding: 0.75rem; border-radius: 6px; font-size: 0.85rem;">
          <strong>Xử trí cấp:</strong><br>
          1. Rửa dạ dày & Than hoạt 1g/kg nếu trong 1-2 giờ đầu.<br>
          2. <strong>N-Acetylcysteine (NAC)</strong>: Bắt đầu ngay nếu nghi ngờ hoặc theo đồ thị Rumack-Matthew sau 4 giờ. Phác đồ IV 21 giờ hoặc phác đồ uống 72 giờ.
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #7c3aed; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-staff-snake"></i> Rắn Cắn Độc (Hổ Mang, Lục Tre, Cạp Nia)
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text, #334155); margin-bottom: 0.5rem;">
          <strong>Nhóm thần kinh (Cạp nia/hổ chúa):</strong> Liệt cơ hô hấp, sụp mi, khó nuốt.<br>
          <strong>Nhóm huyết học (Rắn lục):</strong> Xuất huyết, rối loạn đông máu tiêu thụ.
        </p>
        <div style="background: var(--color-bg, #f8fafc); padding: 0.75rem; border-radius: 6px; font-size: 0.85rem;">
          <strong>Xử trí:</strong> Băng ép bất động chi (nhóm thần kinh), KHÔNG garot chặt hoại tử chi, truyền Huyết thanh kháng nọc đặc hiệu (SAV) sớm.
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #0284c7; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-fire"></i> Ngộ Độc Khí CO (Carbon Monoxide)
        </h3>
        <p style="font-size: 0.85rem; color: var(--color-text, #334155); margin-bottom: 0.5rem;">
          Đau đầu, buồn nôn, lú lẫn, hôn mê, da đỏ như quả anh đào (cherry-red). Đo HbCO máu.
        </p>
        <div style="background: var(--color-bg, #f8fafc); padding: 0.75rem; border-radius: 6px; font-size: 0.85rem;">
          <strong>Xử trí:</strong> Thở Oxy 100% qua mask có túi dự trữ (giảm thời gian bán hủy CO từ 300p xuống 90p). Chỉ định Oxy cao áp (HBO) nếu bất tỉnh, HbCO > 25% hoặc thai phụ.
        </div>
      </div>
    </div>
  `;
}

function renderTraumaContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 800; color: #b91c1c; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
        <i class="fa-solid fa-shield-halved"></i> Đánh Giá Ban Đầu & Cấp Cứu Chấn Thương (ATLS Primary Survey ABCDE)
      </h2>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="padding: 1rem; border-radius: 8px; background: #fef2f2; border-left: 4px solid #dc2626;">
          <div style="font-weight: 800; color: #991b1b; font-size: 1rem;">A — Airway & Cervical Spine (Đường thở & Cột sống cổ)</div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #7f1d1d;">Bảo vệ cột sống cổ liên tục (nẹp cổ cứng). Kiểm tra dị vật, hút máu dãi, đặt ống Mayo/NKQ nếu GCS ≤ 8.</p>
        </div>

        <div style="padding: 1rem; border-radius: 8px; background: #fff7ed; border-left: 4px solid #ea580c;">
          <div style="font-weight: 800; color: #9a3412; font-size: 1rem;">B — Breathing & Ventilation (Hô hấp & Thông khí)</div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #7c2d12;">Loại trừ ngay 3 sát thủ cấp: Tràn khí màng phổi áp lực (chọc kim giải áp KLS 2 đường trung đòn hoặc KLS 5 đường nách trước), Mảng sườn di động, Tràn máu MP lượng nhiều.</p>
        </div>

        <div style="padding: 1rem; border-radius: 8px; background: #fefce8; border-left: 4px solid #ca8a04;">
          <div style="font-weight: 800; color: #854d0e; font-size: 1rem;">C — Circulation & Hemorrhage (Tuần hoàn & Cầm máu)</div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #713f12;">Băng ép cầm máu vết thương hở. Đai cố định khung chậu nếu nghi gãy chậu. Lập 2 đường truyền lớn (16-18G), kích hoạt Phác đồ Truyền máu Khối lượng lớn (MTP 1:1:1), dùng Acid Tranexamic (TXA 1g IV).</p>
        </div>

        <div style="padding: 1rem; border-radius: 8px; background: #eff6ff; border-left: 4px solid #0284c7;">
          <div style="font-weight: 800; color: #1e40af; font-size: 1rem;">D — Disability & Neurologic (Thần kinh)</div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #1e3a8a;">Đánh giá thang điểm Glasgow (GCS), kiểm tra kích thước và phản xạ đồng tử 2 bên, kiểm tra vận động tứ chi.</p>
        </div>

        <div style="padding: 1rem; border-radius: 8px; background: #f8fafc; border-left: 4px solid #64748b;">
          <div style="font-weight: 800; color: #334155; font-size: 1rem;">E — Exposure & Environmental (Bộc lộ & Giữ ấm)</div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem; color: #475569;">Bộc lộ toàn thân tìm tổn thương phối hợp. Chống hạ thân nhiệt (ủ ấm bằng chăn nhiệt, truyền dịch ấm).</p>
        </div>
      </div>
    </div>
  `;
}

function renderSanNhiContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;" class="san-nhi-grid">
      <!-- Maternal Emergency -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #ec4899; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-person-pregnant"></i> Cấp Cứu Sản Khoa Cốt Lõi
        </h3>

        <div style="margin-bottom: 1rem; padding: 0.75rem; background: #fdf2f8; border-radius: 8px;">
          <strong style="color: #be185d;">1. Tiền sản giật nặng & Cơn Sản giật:</strong>
          <p style="font-size: 0.85rem; margin: 0.25rem 0 0 0; color: #831843;">
            • <strong>Magnesium Sulfate (MgSO4):</strong> Tấn công 4-6g IV trong 20 phút, sau đó duy trì 1-2g/giờ.<br>
            • Hạ áp khẩn cấp: Nicardipine IV hoặc Labetalol / Hydralazine (mục tiêu HA < 160/110 mmHg).
          </p>
        </div>

        <div style="padding: 0.75rem; background: #fef2f2; border-radius: 8px;">
          <strong style="color: #b91c1c;">2. Băng huyết sau sinh (PPH - 4T):</strong>
          <p style="font-size: 0.85rem; margin: 0.25rem 0 0 0; color: #7f1d1d;">
            • Xoa đáy tử cung liên tục.<br>
            • <strong>Oxytocin</strong> 10-20 UI truyền IV + <strong>Misoprostol</strong> 800mcg đặt trực tràng / ngậm dưới lưỡi.<br>
            • <strong>Acid Tranexamic (TXA)</strong> 1g IV trong 3 giờ đầu.
          </p>
        </div>
      </div>

      <!-- Pediatric Emergency -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h3 style="color: #3b82f6; font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-child"></i> Hồi Sức Cấp Cứu Nhi Khoa (PALS)
        </h3>

        <div style="margin-bottom: 1rem; padding: 0.75rem; background: #eff6ff; border-radius: 8px;">
          <strong style="color: #1d4ed8;">1. Tam giác đánh giá Nhi khoa (PAT):</strong>
          <p style="font-size: 0.85rem; margin: 0.25rem 0 0 0; color: #1e3a8a;">
            • <strong>Dáng vẻ (Appearance):</strong> Trương lực, tương tác, nhìn chằm chằm, khóc.<br>
            • <strong>Thở (Breathing):</strong> Thở co kéo, thở rên, phập phồng cánh mũi.<br>
            • <strong>Tuần hoàn da (Circulation):</strong> Tái nhợt, nổi vân tím, đốm xuất huyết.
          </p>
        </div>

        <div style="padding: 0.75rem; background: #f0fdf4; border-radius: 8px;">
          <strong style="color: #15803d;">2. Cơn sốt co giật ở trẻ em:</strong>
          <p style="font-size: 0.85rem; margin: 0.25rem 0 0 0; color: #14532d;">
            • Nằm nghiêng an toàn, lau mát, hạ sốt Paracetamol 15mg/kg.<br>
            • Cắt cơn co giật nếu > 5 phút: <strong>Diazepam</strong> 0.5mg/kg bơm hậu môn hoặc <strong>Midazolam</strong> 0.2mg/kg nhỏ mũi/niêm mạc má.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Global Handlers for Interaction
if (typeof window !== 'undefined') {
  (window as any).switchCapCuuTab = (tab: EmergencyTab) => {
    const area = document.getElementById('capCuuContentArea');
    if (area) {
      area.innerHTML = renderActiveTabContent(tab);
    }
    document.querySelectorAll('.cap-cuu-tab-btn').forEach(b => {
      b.classList.remove('active');
      (b as HTMLElement).style.background = 'transparent';
      (b as HTMLElement).style.color = 'var(--color-text, #334155)';
    });
    const currentBtn = (event?.target as HTMLElement)?.closest('.cap-cuu-tab-btn') as HTMLElement;
    if (currentBtn) {
      currentBtn.classList.add('active');
      currentBtn.style.background = 'var(--color-danger, #dc2626)';
      currentBtn.style.color = '#fff';
    }
  };

  (window as any).nextDtStep = (stepNum: number) => {
    const s1 = document.getElementById('dtStep1');
    const s2 = document.getElementById('dtStep2');
    const s3 = document.getElementById('dtStep3');
    if (s1) s1.style.display = stepNum === 1 ? 'block' : 'none';
    if (s2) s2.style.display = stepNum === 2 ? 'block' : 'none';
    if (s3) s3.style.display = stepNum === 3 ? 'block' : 'none';
  };

  (window as any).setEsiLevel = (level: number) => {
    const s1 = document.getElementById('dtStep1');
    const s2 = document.getElementById('dtStep2');
    const s3 = document.getElementById('dtStep3');
    const res = document.getElementById('dtResultStep');
    const box = document.getElementById('dtResultBox');
    const title = document.getElementById('dtResultTitle');
    const desc = document.getElementById('dtResultDesc');
    if (s1) s1.style.display = 'none';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'none';
    if (res && box && title && desc) {
      res.style.display = 'block';
      const info = ESI_LEVELS[level];
      if (info) {
        box.style.background = info.gradient;
        title.textContent = info.title;
        desc.textContent = info.desc;
      }
    }
  };

  (window as any).resetDt = () => {
    const s1 = document.getElementById('dtStep1');
    const s2 = document.getElementById('dtStep2');
    const s3 = document.getElementById('dtStep3');
    const res = document.getElementById('dtResultStep');
    if (s1) s1.style.display = 'block';
    if (s2) s2.style.display = 'none';
    if (s3) s3.style.display = 'none';
    if (res) res.style.display = 'none';
  };

  (window as any).loadProtocol = (key: string) => {
    const proto = EMERGENCY_PROTOCOLS[key];
    const container = document.getElementById('protocolInnerContent');
    if (!proto || !container) return;

    container.innerHTML = `
      <div style="border-bottom: 2px solid var(--color-danger, #dc2626); padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-danger, #dc2626); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid ${proto.icon}"></i> ${proto.title}
        </h2>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${proto.steps.map(s => `
          <div style="padding: 1rem; border-radius: 6px; ${s.urgent ? 'background: #fef2f2; border-left: 4px solid #dc2626;' : (s.action ? 'background: #eff6ff; border-left: 4px solid #0284c7;' : 'background: #f8fafc; border-left: 4px solid #64748b;')}">
            <div style="font-weight: 700; ${s.urgent ? 'color: #991b1b;' : (s.action ? 'color: #1e40af;' : 'color: #334155;')} margin-bottom: 0.25rem;">
              ${s.num}. ${s.title}
            </div>
            <p style="margin: 0; font-size: 0.875rem; ${s.urgent ? 'color: #7f1d1d;' : (s.action ? 'color: #1e3a8a;' : 'color: #475569;')}">${s.desc}</p>
            ${s.drug ? `<div style="margin-top: 0.5rem; display: inline-block; background: rgba(0,0,0,0.06); padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.8rem;"><i class="fa-solid fa-capsules"></i> ${s.drug}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.proto-nav-btn').forEach(b => b.classList.remove('active'));
    (event?.target as HTMLElement)?.closest('.proto-nav-btn')?.classList.add('active');
  };
}
