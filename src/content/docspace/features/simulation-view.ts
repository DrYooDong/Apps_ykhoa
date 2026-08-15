import { DRUG_INTERACTIONS, DrugInteractionRule } from '../data/drug-interactions';
import { getActiveProfile } from '../storage';
import { analyzeDrugInteractionsWithAI, generateClinicalScenario } from '../ai/llm-client';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

export function renderSimulationView(profileId: string, sessionId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'sandbox')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'sandbox')}

        <div class="dsp-page-content">

          <!-- Page Header -->
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-flask" style="color:var(--dsp-amber);"></i> Simulation Sandbox &amp; AI Clinical Lab</h1>
                <span class="dsp-badge" style="background:var(--dsp-violet); color:#fff; border:none;">AI Lab Phase 3</span>
              </div>
              <p class="dsp-page-subtitle" style="margin:0;">
                Kiểm tra tương tác dược lực học offline &amp; Mô phỏng ca bệnh thử thách lâm sàng OSCE bằng AI.
              </p>
            </div>
            <a href="#/docspace" class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="btnBackSandbox">
              <i class="fa-solid fa-arrow-left"></i> Quay lại Dashboard
            </a>
          </div>
          
          <div style="display:grid; grid-template-columns: minmax(300px, 380px) 1fr; gap: 1.5rem; align-items: flex-start;">
            
            <!-- Cột trái: Form nhập -->
            <div class="dsp-card">
              <!-- Section 1: Drug interaction -->
              <div style="margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--color-border);">
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-pills" style="color:var(--dsp-rose); font-size:1.1rem;"></i>
                  <h3 style="margin:0; font-size:0.98rem; font-weight:800; color:var(--color-text);">Tra cứu Tương tác Thuốc</h3>
                </div>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:0.75rem;">Nhập danh sách thuốc cách nhau bởi dấu phẩy.</p>
                <form id="dspSandboxForm" novalidate>
                  <div class="dsp-form-group">
                    <textarea id="dspDrugList" class="dsp-textarea" rows="3" placeholder="VD: vancomycin, gentamicin, furosemide" style="min-height:80px;" required></textarea>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:8px; margin-top:0.5rem;">
                    <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-full" style="font-size:0.85rem;">
                      <i class="fa-solid fa-shield-virus"></i> Tra cứu Offline
                    </button>
                    <button type="button" id="btnAiAnalyzeDrugs" class="dsp-btn dsp-btn-outline dsp-btn-full" style="font-size:0.85rem; color:var(--dsp-sky); border-color:rgba(14,165,233,0.3);">
                      <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Phân tích AI Chuyên sâu
                    </button>
                  </div>
                </form>
              </div>

              <!-- Section 2: OSCE Simulator -->
              <div>
                <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                  <i class="fa-solid fa-user-doctor" style="color:var(--dsp-violet); font-size:1.1rem;"></i>
                  <h3 style="margin:0; font-size:0.98rem; font-weight:800; color:var(--color-text);">Mô phỏng Ca Bệnh OSCE</h3>
                </div>
                <p style="font-size:0.78rem; color:var(--color-text-muted); margin-bottom:0.75rem;">Sinh ca bệnh giả lập thử thách ra quyết định lâm sàng.</p>
                <form id="dspOsceForm" novalidate>
                  <div class="dsp-form-group">
                    <label class="dsp-label">Chuyên khoa</label>
                    <select id="osceSpecialty" class="dsp-input">
                      <option value="Nội tim mạch">Nội Tim Mạch</option>
                      <option value="Nội hô hấp">Nội Hô Hấp</option>
                      <option value="Nội thận - Tiết niệu">Nội Thận - Tiết Niệu</option>
                      <option value="Cấp cứu - Hồi sức">Cấp Cứu - Hồi Sức (ICU)</option>
                      <option value="Ngoại khoa">Ngoại Khoa</option>
                      <option value="Nhi khoa">Nhi Khoa</option>
                    </select>
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label">Độ khó</label>
                    <select id="osceDifficulty" class="dsp-input">
                      <option value="easy">Cơ bản (Sinh viên Y khoa)</option>
                      <option value="medium" selected>Trung bình (Bác sĩ Nội trú)</option>
                      <option value="hard">Nâng cao (Bác sĩ Chuyên khoa)</option>
                    </select>
                  </div>
                  <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-full" style="background:linear-gradient(135deg, #8b5cf6, #6366f1); border-color:#8b5cf6; margin-top:0.5rem; font-size:0.85rem;">
                    <i class="fa-solid fa-dice"></i> 🎲 Sinh Ca Bệnh OSCE (AI)
                  </button>
                </form>
              </div>
            </div>

            <!-- Cột phải: Kết quả -->
            <div class="dsp-card">
              <h3 style="margin-top:0; font-size:1rem; font-weight:800; color:var(--color-text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;" id="sandboxResultTitle">
                <i class="fa-solid fa-square-poll-vertical" style="color:var(--dsp-sky);"></i> Kết quả Phân tích &amp; Mô phỏng
              </h3>
              <div id="dspSandboxResult">
                <div class="dsp-empty-profiles" style="padding: 3rem 1rem;">
                  <i class="fa-solid fa-stethoscope"></i>
                  <p>Chọn <strong>Tra cứu tương tác thuốc</strong> hoặc <strong>Sinh ca bệnh OSCE</strong> từ cột bên trái để bắt đầu mô phỏng.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
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
