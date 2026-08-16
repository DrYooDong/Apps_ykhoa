/**
 * CliniPortal — Virtual Patient & ICU Simulator SPA View (TypeScript)
 * Path: src/content/skills/simulators/virtual-patient-view.ts
 */

export function renderVirtualPatientView(): string {
  return `
    <div class="virtual-patient-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Kỹ Năng Lâm Sàng</a> / Bệnh Nhân Ảo & ICU Simulator
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-user-doctor"></i> Bệnh Nhân Ảo & Phòng Cấp Cứu Ảo (ICU Emergency Simulator)
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Trải nghiệm xử trí ca bệnh lâm sàng tương tác đa bước: Hỏi bệnh sử, Khám thực thể, Đề nghị CLS, Đưa ra chẩn đoán và Theo dõi đáp ứng huyết động học.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/skills/osce-randomizer" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-dice"></i> OSCE Randomizer
          </a>
          <a href="#/skills" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Skills Hub
          </a>
        </div>
      </div>

      <!-- Simulator Dashboard -->
      <div style="display: grid; grid-template-columns: 1fr 360px; gap: 1.5rem; align-items: start;">
        
        <!-- Case Interaction Area -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border, #f1f5f9); padding-bottom: 0.75rem;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 700; color: #dc2626; background: #fee2e2; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                Ca Cấp Cứu #01
              </span>
              <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0.35rem 0 0 0;">
                Bệnh nhân nam 62 tuổi — Đau Thắt Ngực Kiểu Mạch Vành Cấp Giờ Thứ 2
              </h2>
            </div>
            <span style="font-size: 0.85rem; color: #64748b;">Thời gian: 02:45 AM</span>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
            <strong>Lý do vào viện:</strong> Đau thắt ngực trái dữ dội như bóp nghẹt sau xương ức lan lên cằm và vai trái, vã mồ hôi lạnh kèm khó thở, khởi phát đột ngột khi đang nghỉ cách nhập viện 2 giờ. Tiền sử Tăng huyết áp 10 năm, Hút thuốc lá 30 gói-năm.
          </div>

          <!-- Step Action Options -->
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary, #0284c7); margin: 0 0 0.75rem 0;">
              👉 Lựa chọn hành động ưu tiên tiếp theo:
            </h4>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button onclick="window.chooseVpAction(1)" style="text-align: left; padding: 0.85rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #334155; transition: all 0.2s;" onmouseover="this.style.borderColor='#0284c7'" onmouseout="this.style.borderColor='#cbd5e1'">
                A. Mắc Monitor theo dõi sinh hiệu, thở Oxy nếu SpO2 &lt; 90%, đo ECG 12 chuyển đạo ngay trong 10 phút.
              </button>
              <button onclick="window.chooseVpAction(2)" style="text-align: left; padding: 0.85rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #334155; transition: all 0.2s;" onmouseover="this.style.borderColor='#0284c7'" onmouseout="this.style.borderColor='#cbd5e1'">
                B. Cho bệnh nhân uống Paracetamol giảm đau và chụp X-quang phổi kiểm tra trước.
              </button>
              <button onclick="window.chooseVpAction(3)" style="text-align: left; padding: 0.85rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: #334155; transition: all 0.2s;" onmouseover="this.style.borderColor='#0284c7'" onmouseout="this.style.borderColor='#cbd5e1'">
                C. Cho truyền dịch nhanh NaCl 0.9% 500ml và đợi xét nghiệm máu thường quy.
              </button>
            </div>
          </div>

          <div id="vp-feedback-panel" style="display: none; padding: 1rem; border-radius: 8px; font-size: 0.9rem; line-height: 1.5;"></div>
        </div>

        <!-- Realtime Patient Vitals Monitor -->
        <div style="background: #0f172a; border-radius: 12px; padding: 1.5rem; color: #fff; box-shadow: 0 4px 14px rgba(0,0,0,0.3);">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e; animation: pulse 1.5s infinite;"></span>
              <span style="font-weight: 700; font-size: 0.85rem; color: #94a3b8;">ICU MONITOR #BED-01</span>
            </div>
            <span style="font-size: 0.75rem; color: #64748b;">LIVE 50Hz</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
            <div style="background: #1e293b; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #22c55e; font-weight: 700;">HR (Nhịp tim)</div>
              <div id="vp-hr" style="font-size: 2.25rem; font-weight: 800; color: #22c55e;">108 <span style="font-size: 0.9rem;">bpm</span></div>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #ef4444; font-weight: 700;">NIBP (Huyết áp)</div>
              <div id="vp-bp" style="font-size: 1.6rem; font-weight: 800; color: #ef4444;">155/95 <span style="font-size: 0.75rem;">mmHg</span></div>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">SpO2 (Oxy máu)</div>
              <div id="vp-spo2" style="font-size: 2.25rem; font-weight: 800; color: #38bdf8;">94 <span style="font-size: 0.9rem;">%</span></div>
            </div>
            <div style="background: #1e293b; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #fbbf24; font-weight: 700;">RR (Nhịp thở)</div>
              <div id="vp-rr" style="font-size: 2.25rem; font-weight: 800; color: #fbbf24;">24 <span style="font-size: 0.9rem;">l/p</span></div>
            </div>
          </div>

          <div style="background: #1e293b; border-radius: 8px; padding: 0.75rem; font-family: monospace; font-size: 0.8rem; color: #22c55e;">
            ECG Lead II: Sinus Tachycardia + ST Elevation V1-V4 (1.5mm)
          </div>
        </div>

      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    chooseVpAction: (opt: number) => void;
  }
}

if (typeof window !== 'undefined') {
  window.chooseVpAction = (opt: number) => {
    const feedback = document.getElementById('vp-feedback-panel');
    if (!feedback) return;

    feedback.style.display = 'block';

    if (opt === 1) {
      feedback.style.background = '#dcfce7';
      feedback.style.border = '1px solid #86efac';
      feedback.style.color = '#166534';
      feedback.innerHTML = `
        <strong>✅ CHÍNH XÁC (Best Practice ACC/AHA):</strong><br>
        Đo ECG trong 10 phút đầu tiếp cận là tiêu chuẩn vàng. ECG cho thấy <strong>ST chênh lên từ V1 đến V4 &gt; 2mm</strong> (STEMI thành trước cấp).<br>
        👉 Chỉ định ngay: Aspirin 300mg nhai + Ticagrelor 180mg hoặc Clopidogrel 600mg, Heparin không phân đoạn và kích hoạt Catheter Lab Can thiệp mạch vành thì đầu (Primary PCI &lt; 120 phút).
      `;
    } else {
      feedback.style.background = '#fee2e2';
      feedback.style.border = '1px solid #fca5a5';
      feedback.style.color = '#991b1b';
      feedback.innerHTML = `
        <strong>❌ CHƯA CHÍNH XÁC:</strong><br>
        Đây là hội chứng vành cấp đe dọa tính mạng. Trì hoãn đo ECG để chụp X-quang hoặc uống thuốc giảm đau thông thường sẽ làm chậm trễ cửa sổ can thiệp tái thông mạch vành "Thời gian là cơ tim".
      `;
    }
  };
}
