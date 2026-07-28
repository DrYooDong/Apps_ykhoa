import { LivingProtocol } from '../types';
import { evaluateFormula, evaluateCondition } from './rule-engine';

export function renderLivingProtocolView(profileId: string, protocolId?: string): string {
  // Mock UI để demo rule engine
  return `
    <div class="dsp-view-container animate-fade-in">
      <header class="dsp-header dsp-flex dsp-justify-between dsp-items-center">
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            <i class="fa-solid fa-network-wired dsp-mr-2"></i> Living Protocols
          </h2>
          <p class="dsp-text-muted">Phác đồ sống (Phase 3)</p>
        </div>
        <button id="dspCreateLivingProtocolBtn" class="dsp-btn dsp-btn-primary">
          <i class="fa-solid fa-plus dsp-mr-2"></i> Tạo Phác đồ Động
        </button>
      </header>
      <div class="dsp-content dsp-mt-6">
        <div class="dsp-card dsp-p-6 dsp-mb-6">
          <h3 class="dsp-font-bold dsp-text-lg dsp-mb-4"><i class="fa-solid fa-vial"></i> Thử nghiệm Rule Engine</h3>
          <p class="dsp-text-sm dsp-text-muted dsp-mb-4">Nhập thông số bệnh nhân để tự động tính toán nhánh và liều lượng.</p>
          
          <div class="dsp-form-row">
            <div class="dsp-form-group">
              <label class="dsp-label">Cân nặng (kg)</label>
              <input type="number" id="lpTestWeight" class="dsp-input" value="60">
            </div>
            <div class="dsp-form-group">
              <label class="dsp-label">eGFR (mL/min)</label>
              <input type="number" id="lpTestEgfr" class="dsp-input" value="25">
            </div>
          </div>
          <button id="lpRunTestBtn" class="dsp-btn dsp-btn-secondary dsp-mt-4">Chạy Logic</button>
          
          <div id="lpTestResult" class="dsp-mt-4 dsp-p-4 dsp-bg-surface dsp-rounded-md dsp-border" style="display:none">
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountLivingProtocolController(profileId: string): void {
  const createBtn = document.getElementById('dspCreateLivingProtocolBtn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      alert('Chức năng tạo mới phác đồ động đang được phát triển.');
    });
  }

  const runBtn = document.getElementById('lpRunTestBtn');
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      const weight = parseFloat((document.getElementById('lpTestWeight') as HTMLInputElement).value) || 0;
      const egfr = parseFloat((document.getElementById('lpTestEgfr') as HTMLInputElement).value) || 0;
      
      const context = { weight, egfr };
      
      // Giả lập logic
      const doseResult = evaluateFormula('weight * 15', context);
      const branchResult = evaluateCondition('egfr < 30', context);
      
      const resDiv = document.getElementById('lpTestResult');
      if (resDiv) {
        resDiv.style.display = 'block';
        resDiv.innerHTML = `
          <h4 class="dsp-font-bold dsp-text-md dsp-mb-2">Kết quả thực thi (Context: weight=${weight}, egfr=${egfr})</h4>
          <ul class="dsp-list dsp-list-disc dsp-ml-6">
            <li><strong>Công thức "weight * 15":</strong> ${doseResult.error ? '<span class="dsp-text-danger">'+doseResult.error+'</span>' : doseResult.value + ' mg'}</li>
            <li><strong>Điều kiện "egfr < 30":</strong> ${branchResult.error ? '<span class="dsp-text-danger">'+branchResult.error+'</span>' : (branchResult.value ? '<span class="dsp-text-warning">TRUE (Rẽ nhánh suy thận)</span>' : 'FALSE (Liều chuẩn)')}</li>
          </ul>
        `;
      }
    });
  }
}

