import { DRUG_INTERACTIONS, DrugInteractionRule } from '../data/drug-interactions';
import { getActiveProfile } from '../storage';
import { analyzeDrugInteractionsWithAI, generateClinicalScenario } from '../ai/llm-client';

export function renderSimulationView(profileId: string, sessionId?: string): string {
  return `
    <div class="dsp-view-container animate-fade-in">
      <header class="dsp-header dsp-flex dsp-justify-between dsp-items-center">
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            <i class="fa-solid fa-flask dsp-mr-2"></i> Simulation Sandbox & AI Clinical Lab
          </h2>
          <p class="dsp-text-muted">Kiểm tra tương tác thuốc & Mô phỏng Ca bệnh OSCE bằng AI (Phase 2.2)</p>
        </div>
      </header>
      
      <div class="dsp-content dsp-mt-6 dsp-flex" style="gap: 2rem; align-items: flex-start;">
        
        <!-- Cột trái: Form nhập -->
        <div class="dsp-card dsp-p-6" style="flex: 0 0 350px;">
          <!-- Section 1: Drug interaction -->
          <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border);">
            <h3 class="dsp-font-bold dsp-mb-2"><i class="fa-solid fa-pills dsp-text-primary"></i> Tra cứu Tương tác Thuốc</h3>
            <p class="dsp-text-sm dsp-text-muted dsp-mb-3">Nhập tên các loại thuốc (cách nhau bởi dấu phẩy).</p>
            <form id="dspSandboxForm" novalidate>
              <div class="dsp-form-group">
                <textarea id="dspDrugList" class="dsp-textarea" rows="3" placeholder="VD: vancomycin, gentamicin, furosemide" required></textarea>
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                <button type="submit" class="dsp-btn dsp-btn-primary dsp-w-full" style="font-size:12px;">
                  <i class="fa-solid fa-shield-virus dsp-mr-1"></i> Tra cứu Offline
                </button>
                <button type="button" id="btnAiAnalyzeDrugs" class="dsp-btn dsp-btn-outline dsp-w-full" style="font-size:12px; color:var(--color-primary); border-color:var(--color-primary);">
                  <i class="fa-solid fa-wand-magic-sparkles dsp-mr-1"></i> ✨ Phân tích AI Chuyên sâu
                </button>
              </div>
            </form>
          </div>

          <!-- Section 2: OSCE Simulator -->
          <div>
            <h3 class="dsp-font-bold dsp-mb-2"><i class="fa-solid fa-user-doctor dsp-text-primary"></i> Mô phỏng Ca Bệnh OSCE</h3>
            <p class="dsp-text-sm dsp-text-muted dsp-mb-3">Sinh ca bệnh giả lập thử thách lâm sàng.</p>
            <form id="dspOsceForm" novalidate>
              <div class="dsp-form-group" style="margin-bottom: 8px;">
                <label style="font-size: 11px; font-weight: 700;">Chuyên khoa</label>
                <select id="osceSpecialty" class="dsp-input" style="font-size:12px; padding:4px 8px;">
                  <option value="Nội tim mạch">Nội Tim Mạch</option>
                  <option value="Nội hô hấp">Nội Hô Hấp</option>
                  <option value="Nội thận - Tiết niệu">Nội Thận - Tiết Niệu</option>
                  <option value="Cấp cứu - Hồi sức">Cấp Cứu - Hồi Sức (ICU)</option>
                  <option value="Ngoại khoa">Ngoại Khoa</option>
                  <option value="Nhi khoa">Nhi Khoa</option>
                </select>
              </div>
              <div class="dsp-form-group" style="margin-bottom: 12px;">
                <label style="font-size: 11px; font-weight: 700;">Độ khó</label>
                <select id="osceDifficulty" class="dsp-input" style="font-size:12px; padding:4px 8px;">
                  <option value="easy">Cơ bản (Sinh viên Y)</option>
                  <option value="medium" selected>Trung bình (Bác sĩ Nội trú)</option>
                  <option value="hard">Nâng cao (Chuyên khoa)</option>
                </select>
              </div>
              <button type="submit" class="dsp-btn dsp-btn-primary dsp-w-full" style="font-size:12px; background:#8b5cf6; border-color:#8b5cf6;">
                <i class="fa-solid fa-dice dsp-mr-1"></i> 🎲 Sinh Ca Bệnh OSCE (AI)
              </button>
            </form>
          </div>
        </div>

        <!-- Cột phải: Kết quả -->
        <div class="dsp-card dsp-p-6" style="flex: 1;">
          <h3 class="dsp-font-bold dsp-mb-4" id="sandboxResultTitle">Kết quả Phân tích & Mô phỏng</h3>
          <div id="dspSandboxResult">
            <div class="dsp-empty-state dsp-p-8">
              <i class="fa-solid fa-stethoscope dsp-text-4xl dsp-text-muted dsp-mb-2"></i>
              <p>Chọn Tra cứu tương tác thuốc hoặc Sinh ca bệnh OSCE từ cột bên trái.</p>
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

  const runOfflineCheck = () => {
    const input = (document.getElementById('dspDrugList') as HTMLTextAreaElement).value;
    const drugs = input.split(',').map(d => d.trim().toLowerCase()).filter(d => d);
    
    if (drugs.length < 2) {
      alert('Vui lòng nhập ít nhất 2 loại thuốc để kiểm tra tương tác.');
      return null;
    }

    const results = checkInteractions(drugs, DRUG_INTERACTIONS);
    renderResults(results, drugs);
    return drugs;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runOfflineCheck();
  });

  document.getElementById('btnAiAnalyzeDrugs')?.addEventListener('click', async () => {
    const input = (document.getElementById('dspDrugList') as HTMLTextAreaElement).value;
    const drugs = input.split(',').map(d => d.trim()).filter(Boolean);

    if (drugs.length < 2) {
      alert('Vui lòng nhập ít nhất 2 loại thuốc để phân tích tương tác AI.');
      return;
    }

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const container = document.getElementById('dspSandboxResult');
    if (!container) return;

    container.innerHTML = `
      <div class="dsp-p-4 dsp-rounded-md" style="background: rgba(2, 132, 199, 0.05); border: 1px dashed var(--color-primary);">
        <div style="font-weight: 700; color: var(--color-primary); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-spinner fa-spin"></i> Dược sĩ AI đang phân tích tương tác dược lực học...
        </div>
        <div id="aiDrugResultText" style="font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text);"></div>
      </div>
    `;

    const resultTextEl = document.getElementById('aiDrugResultText');
    const btn = document.getElementById('btnAiAnalyzeDrugs') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    try {
      let streamed = '';
      await analyzeDrugInteractionsWithAI(drugs, profile.aiSettings, (chunk) => {
        streamed += chunk;
        if (resultTextEl) resultTextEl.textContent = streamed;
      });
    } catch (err: any) {
      if (resultTextEl) resultTextEl.textContent = '❌ Lỗi phân tích AI: ' + err.message;
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // OSCE Simulator Form Handler
  document.getElementById('dspOsceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const specialty = (document.getElementById('osceSpecialty') as HTMLSelectElement).value;
    const difficulty = (document.getElementById('osceDifficulty') as HTMLSelectElement).value as 'easy' | 'medium' | 'hard';

    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const container = document.getElementById('dspSandboxResult');
    if (!container) return;

    container.innerHTML = `
      <div class="dsp-p-4 dsp-rounded-md" style="background: rgba(139, 92, 246, 0.05); border: 1px dashed #8b5cf6;">
        <div style="font-weight: 700; color: #8b5cf6; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-spinner fa-spin"></i> Giám khảo AI đang tạo Ca bệnh Mô phỏng OSCE...
        </div>
        <div id="aiOsceResultText" style="font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--color-text);"></div>
      </div>
    `;

    const resultTextEl = document.getElementById('aiOsceResultText');

    try {
      let streamed = '';
      await generateClinicalScenario(specialty, difficulty, profile.aiSettings, (chunk) => {
        streamed += chunk;
        if (resultTextEl) resultTextEl.textContent = streamed;
      });
    } catch (err: any) {
      if (resultTextEl) resultTextEl.textContent = '❌ Lỗi tạo ca bệnh OSCE AI: ' + err.message;
    }
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

function renderResults(results: DrugInteractionRule[], drugs: string[]) {
  const container = document.getElementById('dspSandboxResult');
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="dsp-alert dsp-alert-success" style="margin-bottom: 1rem;">
        <i class="fa-solid fa-check-circle"></i> Không tìm thấy tương tác nào giữa các thuốc (${drugs.join(', ')}) trong DB Offline.
      </div>
      <button type="button" id="btnAutoTriggerAi" class="dsp-btn dsp-btn-primary">
        <i class="fa-solid fa-wand-magic-sparkles"></i> Phân tích Chuyên sâu bằng AI →
      </button>
    `;

    document.getElementById('btnAutoTriggerAi')?.addEventListener('click', () => {
      document.getElementById('btnAiAnalyzeDrugs')?.click();
    });
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
