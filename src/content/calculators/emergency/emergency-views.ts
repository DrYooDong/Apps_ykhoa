/**
 * CliniPortal — Emergency & ICU Workstation Calculators SPA Views (TypeScript)
 * Path: src/content/calculators/emergency/emergency-views.ts
 */

export type EmergencyToolTab = 
  | 'an-than-icu' 
  | 'van-mach' 
  | 'bu-dich' 
  | 'may-tho' 
  | 'toxicology' 
  | 'polytrauma' 
  | 'ecg' 
  | 'acls' 
  | 'stroke' 
  | 'metabolic' 
  | 'pocus' 
  | 'cardiogenic-shock';

export function renderEmergencyToolsView(activeTab: EmergencyToolTab = 'an-than-icu'): string {
  return `
    <div class="emergency-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Cấp Cứu & Hồi Sức (ICU)
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #dc2626; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-truck-medical"></i> Workstation Cấp Cứu, Hồi Sức Tích Cực & Chống Độc
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/calculators" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Danh sách công cụ
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <button class="em-tab-btn ${activeTab === 'an-than-icu' ? 'active' : ''}" onclick="window.switchEmToolTab('an-than-icu')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'an-than-icu' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'an-than-icu' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-brain"></i> An Thần ICU (RASS / CPOT)
        </button>
        <button class="em-tab-btn ${activeTab === 'van-mach' ? 'active' : ''}" onclick="window.switchEmToolTab('van-mach')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'van-mach' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'van-mach' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-bolt"></i> Vận Mạch & Bơm Tiêm Điện
        </button>
        <button class="em-tab-btn ${activeTab === 'bu-dich' ? 'active' : ''}" onclick="window.switchEmToolTab('bu-dich')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'bu-dich' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'bu-dich' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-droplet"></i> Bù Dịch Hồi Sức Sốc
        </button>
        <button class="em-tab-btn ${activeTab === 'may-tho' ? 'active' : ''}" onclick="window.switchEmToolTab('may-tho')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'may-tho' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'may-tho' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-lungs"></i> Máy Thở & Sóng Thở ICU
        </button>
        <button class="em-tab-btn ${activeTab === 'acls' ? 'active' : ''}" onclick="window.switchEmToolTab('acls')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'acls' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'acls' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-heart-pulse"></i> ACLS Resus & CPR Timer
        </button>
        <button class="em-tab-btn ${activeTab === 'stroke' ? 'active' : ''}" onclick="window.switchEmToolTab('stroke')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'stroke' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'stroke' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-clock"></i> Stroke Pro Studio
        </button>
        <button class="em-tab-btn ${activeTab === 'toxicology' ? 'active' : ''}" onclick="window.switchEmToolTab('toxicology')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'toxicology' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'toxicology' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-flask"></i> Chống Độc (Toxidrome)
        </button>
        <button class="em-tab-btn ${activeTab === 'polytrauma' ? 'active' : ''}" onclick="window.switchEmToolTab('polytrauma')" style="padding: 0.6rem 1.1rem; border: none; background: ${activeTab === 'polytrauma' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'polytrauma' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; transition: all 0.2s;">
          <i class="fa-solid fa-person-burst"></i> Đa Chấn Thương & MTP
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="emergencyToolContentArea">
        ${renderActiveEmTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveEmTab(tab: EmergencyToolTab): string {
  switch (tab) {
    case 'an-than-icu':
      return renderAnThanIcuContent();
    case 'van-mach':
      return renderVanMachContent();
    case 'bu-dich':
      return renderBuDichContent();
    case 'may-tho':
      return renderMayThoContent();
    case 'acls':
      return renderAclsContent();
    case 'stroke':
      return renderStrokeContent();
    case 'toxicology':
      return renderToxicologyContent();
    case 'polytrauma':
      return renderPolytraumaContent();
    default:
      return renderAnThanIcuContent();
  }
}

// 1. AN THẦN & GIẢM ĐAU ICU (RASS / CPOT / CAM-ICU)
export function renderAnThanIcuContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-bed-pulse" style="color: #dc2626;"></i> Đánh Giá Mức Độ An Thần (RASS) & Đau (CPOT)
        </h3>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Thang điểm RASS (Richmond Agitation-Sedation Scale):</label>
          <select id="em-rass-select" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcIcuSedation()">
            <option value="4">+4: Rất kích động (hung hăng, bạo lực)</option>
            <option value="3">+3: Kích động (kéo ống thở, thông tiểu)</option>
            <option value="2">+2: Kích động nhẹ (chống máy thở thường xuyên)</option>
            <option value="1">+1: Bồn chồn, lo lắng</option>
            <option value="0" selected>0: Tỉnh táo, bình tĩnh (Mục tiêu cai máy)</option>
            <option value="-1">-1: Buồn ngủ (mở mắt &gt; 10s khi gọi)</option>
            <option value="-2">-2: An thần nhẹ (mở mắt &lt; 10s khi gọi)</option>
            <option value="-3">-3: An thần vừa (cử động mắt khi gọi, không nhìn chăm chú)</option>
            <option value="-4">-4: An thần sâu (không đáp ứng tiếng gọi, đáp ứng kích thích đau)</option>
            <option value="-5">-5: Hôn mê (không đáp ứng bất kỳ kích thích nào)</option>
          </select>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Thang điểm đau CPOT (Critical-Care Pain Observation Tool):</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem;">
            <div>
              <span style="font-weight: 600;">Nét mặt:</span>
              <select id="cpot-face" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px;" onchange="window.recalcIcuSedation()">
                <option value="0">0: Thư giãn</option>
                <option value="1">1: Căng thẳng, nhíu mày</option>
                <option value="2">2: Nhăn nhó dữ dội, nhắm nghiền mắt</option>
              </select>
            </div>
            <div>
              <span style="font-weight: 600;">Cử động cơ thể:</span>
              <select id="cpot-body" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px;" onchange="window.recalcIcuSedation()">
                <option value="0">0: Yên lặng</option>
                <option value="1">1: Cử động bảo vệ, sờ vết mổ</option>
                <option value="2">2: Vùng vẫy, chống đối</option>
              </select>
            </div>
            <div>
              <span style="font-weight: 600;">Đáp ứng thở máy:</span>
              <select id="cpot-vent" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px;" onchange="window.recalcIcuSedation()">
                <option value="0">0: Thở êm theo máy</option>
                <option value="1">1: Ho hoặc chống máy nhẹ</option>
                <option value="2">2: Chống máy dữ dội, báo động liên tục</option>
              </select>
            </div>
            <div>
              <span style="font-weight: 600;">Trương lực cơ:</span>
              <select id="cpot-tension" style="width: 100%; padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 6px;" onchange="window.recalcIcuSedation()">
                <option value="0">0: Mềm nhão</option>
                <option value="1">1: Căng gồng nhẹ</option>
                <option value="2">2: Rất gồng cứng</option>
              </select>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 0.5rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Sàng lọc Sảng ICU (CAM-ICU):</label>
          <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8rem;">
            <label><input type="checkbox" id="cam-f1" onchange="window.recalcIcuSedation()" /> Đặc điểm 1: Khởi phát cấp tính hoặc biến đổi dao động</label>
            <label><input type="checkbox" id="cam-f2" onchange="window.recalcIcuSedation()" /> Đặc điểm 2: Giảm chú ý (ASE test lỗi &gt; 2)</label>
            <label><input type="checkbox" id="cam-f3" onchange="window.recalcIcuSedation()" /> Đặc điểm 3: Tư duy mất tổ chức</label>
          </div>
        </div>
      </div>

      <!-- KẾT QUẢ AN THẦN -->
      <div style="background: linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #dc2626; background: #fee2e2; padding: 0.25rem 0.6rem; border-radius: 6px;">Trạng Thái Hồi Sức Thần Kinh (PADIS 2026)</span>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center; padding: 1.5rem 0;">
            <div style="background: #f8fafc; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Mức An Thần RASS:</div>
              <div id="res-rass-val" style="font-size: 2.25rem; font-weight: 800; color: #0284c7;">0</div>
              <div id="res-rass-text" style="font-size: 0.85rem; font-weight: 600; color: #059669;">Tỉnh táo (Đạt mục tiêu)</div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Tổng Điểm Đau CPOT:</div>
              <div id="res-cpot-val" style="font-size: 2.25rem; font-weight: 800; color: #059669;">0 / 8</div>
              <div id="res-cpot-text" style="font-size: 0.85rem; font-weight: 600; color: #059669;">Không đau</div>
            </div>
          </div>
        </div>

        <div id="icu-sedation-action" style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); line-height: 1.5;">
          🎯 <strong>Mục tiêu PADIS Guideline:</strong><br>
          - Bệnh nhân thở máy nên duy trì RASS -1 đến 0 (An thần nhẹ) để giảm thời gian thở máy.<br>
          - Nếu CPOT ≥ 3 → Ưu tiên giảm đau bằng Fentanyl/Morphine trước khi tăng liều an thần (Analgesia-first).
        </div>
      </div>
    </div>
  `;
}

// 2. VẬN MẠCH & BƠM TIÊM ĐIỆN
export function renderVanMachContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-syringe" style="color: #dc2626;"></i> Máy Tính Bơm Tiêm Điện Vận Mạch
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Loại thuốc vận mạch:</label>
            <select id="vaso-drug" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcVaso()">
              <option value="norepinephrine">Noradrenaline (Norepinephrine)</option>
              <option value="adrenaline">Adrenaline (Epinephrine)</option>
              <option value="dobutamine">Dobutamine</option>
              <option value="dopamine">Dopamine</option>
              <option value="vasopressin">Vasopressin</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Cân nặng bệnh nhân (kg):</label>
            <input type="number" id="vaso-weight" value="60" min="30" max="150" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcVaso()" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Liều đích (mcg/kg/phút):</label>
            <input type="number" id="vaso-dose" value="0.1" step="0.05" min="0.01" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcVaso()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Pha trong syringe 50mL (mg):</label>
            <input type="number" id="vaso-amp-mg" value="4" step="1" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcVaso()" />
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #dc2626; background: #fee2e2; padding: 0.25rem 0.6rem; border-radius: 6px;">Tốc Độ Cài Đặt Bơm Tiêm Điện</span>
          
          <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tốc độ truyền tĩnh mạch liên tục:</div>
            <div id="vaso-rate-res" style="font-size: 3.5rem; font-weight: 800; color: #dc2626;">4.5 <span style="font-size: 1.25rem;">mL/h</span></div>
            <div id="vaso-conc-desc" style="font-size: 0.9rem; color: var(--color-text-muted, #64748b);">Nồng độ dung dịch: 80 mcg/mL</div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #dc2626; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          ⚡ <strong>Mục tiêu huyết động:</strong> Duy trì Huyết áp trung bình (MAP) ≥ 65 mmHg. Ưu tiên truyền qua đường tĩnh mạch trung tâm (CVC) để tránh hoại tử mô ngoại biên do thoát mạch.
        </div>
      </div>
    </div>
  `;
}

// 3. BÙ DỊCH HỒI SỨC SỐC
export function renderBuDichContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.15rem; font-weight: 700; color: #0284c7; margin-bottom: 1rem;">
        <i class="fa-solid fa-droplet"></i> Fluid Resuscitation Studio (Phác Đồ Bù Dịch 7 Bệnh Cảnh)
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; font-size: 0.85rem;">
        <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 1rem;">
          <h4 style="font-weight: 700; color: #0369a1; margin: 0 0 0.5rem 0;">1. Sốc Nhiễm Khuẩn (Sepsis-3)</h4>
          <p style="margin: 0; color: #334155;">Truyền Crystalloid cân bằng (Ringer Lactate / Plasmalyte) <strong>30 mL/kg</strong> trong 3 giờ đầu. Đánh giá đáp ứng dịch bằng PLR / VTI Siêu âm tim.</p>
        </div>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1rem;">
          <h4 style="font-weight: 700; color: #b91c1c; margin: 0 0 0.5rem 0;">2. Sốc Mất Máu / Đa Chấn Thương</h4>
          <p style="margin: 0; color: #334155;">Hạn chế truyền dịch tinh thể quá mức. Kích hoạt MTP (Truyền máu khối lượng lớn) theo tỷ lệ <strong>1 Hồng cầu : 1 Huyết tương : 1 Tiểu cầu</strong> kèm Tranexamic Acid (TXA 1g IV trong 3h đầu).</p>
        </div>
        <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 1rem;">
          <h4 style="font-weight: 700; color: #a16207; margin: 0 0 0.5rem 0;">3. Viêm Tụy Cấp Nặng</h4>
          <p style="margin: 0; color: #334155;">Ringer Lactate 5-10 mL/kg/h trong 12-24h đầu. Duy trì nước tiểu &gt; 0.5-1 mL/kg/h và Hct &lt; 44%.</p>
        </div>
      </div>
    </div>
  `;
}

// 4. MÁY THỞ ICU STUB
export function renderMayThoContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-lungs"></i> Ventilator Pro Studio — Giả Lập & Xử Trí Máy Thở ICU
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Workstation giả lập 3 kênh sóng thở động (Áp lực Paw, Lưu lượng Flow, Thể tích Volume), 5 chế độ thở (VCV, PCV, PSV, SIMV, CPAP) và chiến lược bảo vệ phổi ARDSNet (Vt = 6 mL/kg IBW, Pplat &lt; 30 cmH2O).
      </p>
      <div style="background: #0f172a; border-radius: 8px; padding: 2rem; text-align: center; color: #38bdf8; font-family: monospace;">
        [ Real-time Waveform Canvas: Paw | Flow | Volume Engine ]
      </div>
    </div>
  `;
}

// 5. ACLS STUB
export function renderAclsContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #dc2626; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-heart-pulse"></i> ACLS Resuscitation Pro Studio — Cấp Cứu Ngừng Tuần Hoàn
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Đồng hồ CPR 2 phút SVG, Metronome nhịp ép tim 110 bpm, Đếm lùi tiêm Adrenaline 1mg mỗi 3-5 phút, Cây thuật toán VF/pVT (Sốc điện) vs Asystole/PEA (Không sốc) và Checklist 5H5T tìm nguyên nhân có thể đảo ngược.
      </p>
    </div>
  `;
}

// 6. STROKE STUB
export function renderStrokeContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #7c3aed; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-clock"></i> Stroke Pro Studio — Workstation Cấp Cứu Đột Quỵ Não Cấp
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Cửa sổ điều trị tái thông: Tiêu sợi huyết đường tĩnh mạch rtPA (≤ 4.5h), Lấy huyết khối cơ học EVT (≤ 24h DAWN/DEFUSE-3), Thang điểm NIHSS 11 mục, CT ASPECTS Score 10 vùng và Kiểm soát huyết áp Nicardipine trước tiêu sợi huyết (&lt; 185/110 mmHg).
      </p>
    </div>
  `;
}

// 7. TOXICOLOGY STUB
export function renderToxicologyContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #059669; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-flask"></i> Toxicology Pro Studio — Hồi Sức Chống Độc & Giải Độc Đặc Hiệu
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Nhận diện nhanh 6 Hội chứng Độc chất (Toxidromes: Cholinergic, Anticholinergic, Sympathomimetic, Opioid, Sedative-Hypnotic, Serotonin) và máy tính liều thuốc giải độc (NAC truyền phác đồ 21h Paracetamol, Atropine/Pralidoxime ngộ độc phospho hữu cơ, Naloxone ngộ độc Opioid).
      </p>
    </div>
  `;
}

// 8. POLYTRAUMA STUB
export function renderPolytraumaContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #d97706; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-person-burst"></i> Polytrauma & MTP Pro Studio — Đa Chấn Thương & Truyền Máu Khối Lượng Lớn
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Dự đoán điểm TASH (Trauma Associated Severe Hemorrhage), ABC Score dự đoán nhu cầu MTP và Sơ đồ tổn thương chấn thương ATLS.
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchEmToolTab: (tab: EmergencyToolTab) => void;
    recalcIcuSedation: () => void;
    recalcVaso: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchEmToolTab = (tab: EmergencyToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderEmergencyToolsView(tab);
    }
  };

  window.recalcIcuSedation = () => {
    const rass = parseInt((document.getElementById('em-rass-select') as HTMLSelectElement)?.value || '0', 10);
    const cpotFace = parseInt((document.getElementById('cpot-face') as HTMLSelectElement)?.value || '0', 10);
    const cpotBody = parseInt((document.getElementById('cpot-body') as HTMLSelectElement)?.value || '0', 10);
    const cpotVent = parseInt((document.getElementById('cpot-vent') as HTMLSelectElement)?.value || '0', 10);
    const cpotTen = parseInt((document.getElementById('cpot-tension') as HTMLSelectElement)?.value || '0', 10);
    const cpotTotal = cpotFace + cpotBody + cpotVent + cpotTen;

    const rassValEl = document.getElementById('res-rass-val');
    const rassTextEl = document.getElementById('res-rass-text');
    const cpotValEl = document.getElementById('res-cpot-val');
    const cpotTextEl = document.getElementById('res-cpot-text');

    if (rassValEl && rassTextEl) {
      rassValEl.textContent = (rass > 0 ? '+' : '') + rass;
      if (rass >= 2) {
        rassTextEl.textContent = 'Kích động (Cần can thiệp)';
        rassTextEl.style.color = '#dc2626';
      } else if (rass <= -3) {
        rassTextEl.textContent = 'An thần sâu (Cân nhắc giảm liều)';
        rassTextEl.style.color = '#d97706';
      } else {
        rassTextEl.textContent = 'Mục tiêu tối ưu (RASS -1 đến 0)';
        rassTextEl.style.color = '#059669';
      }
    }

    if (cpotValEl && cpotTextEl) {
      cpotValEl.textContent = `${cpotTotal} / 8`;
      if (cpotTotal >= 3) {
        cpotTextEl.textContent = 'Có đau ý nghĩa (Cần giảm đau)';
        cpotTextEl.style.color = '#dc2626';
      } else {
        cpotTextEl.textContent = 'Đau nhẹ / Không đau';
        cpotTextEl.style.color = '#059669';
      }
    }
  };

  window.recalcVaso = () => {
    const weight = parseFloat((document.getElementById('vaso-weight') as HTMLInputElement)?.value || '60');
    const dose = parseFloat((document.getElementById('vaso-dose') as HTMLInputElement)?.value || '0.1');
    const ampMg = parseFloat((document.getElementById('vaso-amp-mg') as HTMLInputElement)?.value || '4');

    const totalMcg = ampMg * 1000;
    const conc = totalMcg / 50; // mcg/mL
    const reqMcgMin = dose * weight;
    const reqMcgH = reqMcgMin * 60;
    const rateMlh = reqMcgH / conc;

    const rateEl = document.getElementById('vaso-rate-res');
    const concEl = document.getElementById('vaso-conc-desc');
    if (rateEl && concEl) {
      rateEl.innerHTML = `${rateMlh.toFixed(1)} <span style="font-size: 1.25rem;">mL/h</span>`;
      concEl.textContent = `Nồng độ dung dịch: ${conc.toFixed(0)} mcg/mL (Bơm 50mL)`;
    }
  };
}
