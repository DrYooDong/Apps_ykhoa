import { DRUG_INTERACTIONS, DrugInteractionRule } from '../data/drug-interactions';

export function renderSimulationView(profileId: string, sessionId?: string): string {
  return `
    <div class="dsp-view-container animate-fade-in">
      <header class="dsp-header dsp-flex dsp-justify-between dsp-items-center">
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            <i class="fa-solid fa-flask dsp-mr-2"></i> Simulation Sandbox
          </h2>
          <p class="dsp-text-muted">Kiểm tra tương tác thuốc Offline (Phase 4)</p>
        </div>
      </header>
      
      <div class="dsp-content dsp-mt-6 dsp-flex" style="gap: 2rem; align-items: flex-start;">
        
        <!-- Cột trái: Form nhập -->
        <div class="dsp-card dsp-p-6" style="flex: 0 0 350px;">
          <h3 class="dsp-font-bold dsp-mb-4">Nhập danh sách thuốc</h3>
          <p class="dsp-text-sm dsp-text-muted dsp-mb-4">Nhập tên các loại thuốc cần kiểm tra (cách nhau bởi dấu phẩy).<br/><i>Gợi ý: vancomycin, gentamicin, amiodarone, ciprofloxacin...</i></p>
          <form id="dspSandboxForm" novalidate>
            <div class="dsp-form-group">
              <textarea id="dspDrugList" class="dsp-textarea" rows="4" placeholder="VD: vancomycin, gentamicin" required></textarea>
            </div>
            <button type="submit" class="dsp-btn dsp-btn-primary dsp-w-full">
              <i class="fa-solid fa-shield-virus dsp-mr-2"></i> Kiểm tra tương tác
            </button>
          </form>
        </div>

        <!-- Cột phải: Kết quả -->
        <div class="dsp-card dsp-p-6" style="flex: 1;">
          <h3 class="dsp-font-bold dsp-mb-4">Kết quả Phân tích</h3>
          <div id="dspSandboxResult">
            <div class="dsp-empty-state dsp-p-8">
              <i class="fa-solid fa-pills dsp-text-4xl dsp-text-muted dsp-mb-2"></i>
              <p>Nhập danh sách thuốc để phân tích tương tác.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function mountSimulationController(profileId: string): void {
  const form = document.getElementById('dspSandboxForm') as HTMLFormElement;
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = (document.getElementById('dspDrugList') as HTMLTextAreaElement).value;
    const drugs = input.split(',').map(d => d.trim().toLowerCase()).filter(d => d);
    
    if (drugs.length < 2) {
      alert('Vui lòng nhập ít nhất 2 loại thuốc để kiểm tra tương tác.');
      return;
    }

    const results = checkInteractions(drugs, DRUG_INTERACTIONS);
    renderResults(results);
  });
}

function checkInteractions(drugs: string[], rules: DrugInteractionRule[]): DrugInteractionRule[] {
  const results: DrugInteractionRule[] = [];
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const d1 = drugs[i];
      const d2 = drugs[j];
      const rule = rules.find(r => 
        (r.drug_a === d1 && r.drug_b === d2) || 
        (r.drug_a === d2 && r.drug_b === d1)
      );
      if (rule) results.push(rule);
    }
  }
  return results;
}

function renderResults(results: DrugInteractionRule[]) {
  const container = document.getElementById('dspSandboxResult');
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="dsp-alert dsp-alert-success">
        <i class="fa-solid fa-check-circle"></i> Không tìm thấy tương tác nghiêm trọng nào giữa các thuốc này trong cơ sở dữ liệu offline.
      </div>
    `;
    return;
  }

  let html = `<div class="dsp-flex dsp-flex-col" style="gap: 1rem;">`;
  
  for (const r of results) {
    const isHigh = r.severity === 'high';
    const borderColor = isHigh ? 'var(--color-danger)' : 'var(--color-warning)';
    const bgColor = isHigh ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)';
    const iconColor = isHigh ? 'var(--color-danger)' : 'var(--color-warning)';

    html += `
      <div class="dsp-p-4 dsp-rounded-md dsp-border" style="border-left: 4px solid ${borderColor}; background: ${bgColor};">
        <div class="dsp-font-bold dsp-text-lg dsp-mb-2" style="text-transform: capitalize;">
          <i class="fa-solid fa-triangle-exclamation dsp-mr-2" style="color: ${iconColor};"></i> 
          ${r.drug_a} + ${r.drug_b}
        </div>
        <div class="dsp-mb-2"><strong><i class="fa-solid fa-bolt dsp-text-muted"></i> Cơ chế:</strong> ${r.mechanism}</div>
        <div><strong><i class="fa-solid fa-stethoscope dsp-text-primary"></i> Xử trí:</strong> ${r.recommendation}</div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}
