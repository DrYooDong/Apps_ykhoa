import { LivingProtocol, LivingProtocolNode } from '../types';
import { evaluateBranch, evaluateStaticFormula, lookupValue } from './rule-engine';
import { VANCOMYCIN_PROTOCOL } from '../data/living-protocol-templates/vancomycin-dosing';
import { getActiveProfile } from '../storage';
import { generateProtocolFromDescription } from '../ai/llm-client';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';

const PROTOCOLS: LivingProtocol[] = [VANCOMYCIN_PROTOCOL];

export function renderLivingProtocolView(profileId: string, protocolId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  let bodyContent = '';
  if (protocolId) {
    const protocol = PROTOCOLS.find(p => p.id === protocolId);
    if (!protocol) {
      bodyContent = `<div class="dsp-card" style="text-align:center; padding:3rem;"><div class="dsp-badge dsp-badge--closed" style="margin-bottom:1rem;">Không tìm thấy phác đồ</div><br><a href="#/docspace/living-protocols" class="dsp-btn dsp-btn-primary">Quay lại danh sách</a></div>`;
    } else {
      bodyContent = renderProtocolWizard(protocol);
    }
  } else {
    bodyContent = `
      <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
            <h1 class="dsp-page-title" style="margin:0;"><i class="fa-solid fa-network-wired" style="color:var(--dsp-violet);"></i> Phác đồ Động (Living Protocols)</h1>
            <span class="dsp-badge" style="background:var(--dsp-violet); color:#fff; border:none;">AI Lab Phase 3</span>
          </div>
          <p class="dsp-page-subtitle" style="margin:0;">
            Tính toán &amp; nội suy quy trình lâm sàng động, tự động phân nhánh quyết định điều trị.
          </p>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <a href="#/docspace/protocol" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-weight:600;">
            <i class="fa-solid fa-book-medical"></i> Kho Phác Đồ Lâm Sàng
          </a>
          <a href="#/docspace/living-protocols" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-weight:700;">
            <i class="fa-solid fa-network-wired" style="color:#fff;"></i> Phác đồ Động (AI Lab)
          </a>
          <button type="button" class="dsp-btn dsp-btn-primary dsp-btn-sm" id="btnCreateAiProtocol" style="background:linear-gradient(135deg, #0284c7, #8b5cf6);">
            <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ Tạo bằng AI
          </button>
        </div>
      </div>

      <div class="dsp-preset-grid" id="lpProtocolGrid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1rem;">
        ${PROTOCOLS.map(p => `
          <div class="dsp-card dsp-preset-card" style="cursor: pointer; padding: 1.25rem;" data-action="open-protocol" data-id="${p.id}">
            <div class="dsp-preset-card-title" style="font-size: 1.05rem; margin-bottom: 0.5rem;">
              <i class="fa-solid fa-file-medical" style="color:var(--dsp-sky);"></i>
              <span>${escapeHtml(p.title)}</span>
            </div>
            <p class="dsp-preset-desc" style="font-size: 0.82rem; margin-bottom: 1rem;"><strong>Biến đầu vào:</strong> ${p.inputs.join(', ')}</p>
            <div style="margin-top: auto; display:flex; justify-content:space-between; align-items:center; width:100%;">
              <span class="dsp-badge" style="background:rgba(14,165,233,0.15); color:var(--dsp-sky);">Quy trình tương tác</span>
              <span class="dsp-btn dsp-btn-sm dsp-btn-primary" style="font-size:0.78rem;">Chạy phác đồ →</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'protocol')}
      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'living-protocols')}
        <div class="dsp-page-content">
          ${bodyContent}
        </div>
      </main>
    </div>
  `;
}

function renderProtocolWizard(protocol: LivingProtocol): string {
  return `
    <div class="animate-fade-in" id="lpWizardContainer" data-protocol-id="${protocol.id}">
      <div class="dsp-page-header" style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem;">
        <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" data-action="back-to-list" title="Quay lại danh sách">
          <i class="fa-solid fa-arrow-left"></i> Quay lại
        </button>
        <div>
          <h1 class="dsp-page-title" style="margin:0; font-size:1.25rem;">
            ${escapeHtml(protocol.title)}
          </h1>
          <p class="dsp-page-subtitle" style="margin:0;">Vui lòng nhập các thông số đầu vào để hệ thống tính toán và nội suy</p>
        </div>
      </div>
      
      <div style="display:grid; grid-template-columns: minmax(280px, 360px) 1fr; gap: 1.5rem; align-items: flex-start;">
        
        <!-- Cột trái: Form nhập liệu -->
        <div class="dsp-card">
          <h3 style="margin-top:0; font-size:1rem; font-weight:800; color:var(--color-text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-sliders" style="color:var(--dsp-sky);"></i> Biến số lâm sàng
          </h3>
          <form id="lpInputForm" novalidate>
            ${protocol.inputs.map(input => `
              <div class="dsp-form-group">
                <label class="dsp-label">${input.toUpperCase()}</label>
                <input type="number" class="dsp-input lp-input-field" data-var="${input}" placeholder="Nhập giá trị..." required />
              </div>
            `).join('')}
            <button type="submit" class="dsp-btn dsp-btn-primary dsp-btn-full" style="margin-top:1rem;">
              <i class="fa-solid fa-calculator"></i> Phân tích phác đồ
            </button>
          </form>
        </div>

        <!-- Cột phải: Kết quả thực thi -->
        <div class="dsp-card">
          <h3 style="margin-top:0; font-size:1rem; font-weight:800; color:var(--color-text); margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-square-poll-vertical" style="color:var(--dsp-violet);"></i> Kết quả Phân tích Phác đồ
          </h3>
          <div id="lpExecutionTimeline" class="dsp-empty-profiles" style="padding:2.5rem 1rem;">
            <i class="fa-solid fa-hourglass-empty"></i>
            <p>Nhập thông số ở cột bên trái và bấm <strong>Phân tích</strong> để xem lộ trình điều trị.</p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function mountLivingProtocolController(profileId: string): void {
  // AI Protocol Builder Handler
  document.getElementById('btnCreateAiProtocol')?.addEventListener('click', async () => {
    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const desc = prompt('Mô tả phác đồ lâm sàng cần tạo (Ví dụ: "Phác đồ tính liều Vancomycin dựa trên cân nặng và mức lọc cầu thận CrCl"):');
    if (!desc || !desc.trim()) return;

    const btn = document.getElementById('btnCreateAiProtocol') as HTMLButtonElement;
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI đang xây dựng JSON Protocol...';
    }

    try {
      const newProtocol = await generateProtocolFromDescription(desc.trim(), profile.aiSettings);
      newProtocol.id = 'ai-protocol-' + Date.now();
      PROTOCOLS.push(newProtocol);

      alert(`✅ Đã sinh thành công phác đồ: "${newProtocol.title}" với các biến đầu vào: ${newProtocol.inputs.join(', ')}`);
      window.location.hash = `#/docspace/living-protocols?id=${newProtocol.id}`;
    } catch (err: any) {
      alert('❌ Lỗi tạo phác đồ AI: ' + err.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles dsp-mr-2"></i> ✨ Tạo Phác đồ Mới bằng AI';
      }
    }
  });

  // Bắt sự kiện click ngoài list
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest('[data-action="open-protocol"]');
    if (card) {
      const id = card.getAttribute('data-id');
      window.location.hash = `#/docspace/living-protocols?id=${id}`;
    }
    
    const backBtn = target.closest('[data-action="back-to-list"]');
    if (backBtn) {
      window.location.hash = `#/docspace/living-protocols`;
    }
  });

  // Xử lý form submit
  const form = document.getElementById('lpInputForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const container = document.getElementById('lpWizardContainer');
      const protocolId = container?.getAttribute('data-protocol-id');
      const protocol = PROTOCOLS.find(p => p.id === protocolId);
      if (!protocol) return;

      // Lấy inputs
      const context: Record<string, number> = {};
      const inputs = form.querySelectorAll('.lp-input-field') as NodeListOf<HTMLInputElement>;
      let hasError = false;
      inputs.forEach(input => {
        const varName = input.getAttribute('data-var') || '';
        const val = parseFloat(input.value);
        if (isNaN(val)) hasError = true;
        context[varName] = val;
      });

      if (hasError) {
        alert('Vui lòng nhập đầy đủ và chính xác các thông số số.');
        return;
      }

      executeProtocol(protocol, context);
    });
  }
}

function executeProtocol(protocol: LivingProtocol, context: Record<string, number>) {
  const timeline = document.getElementById('lpExecutionTimeline');
  if (!timeline) return;

  timeline.innerHTML = ''; // Clear old results
  timeline.className = 'dsp-flex dsp-flex-col';
  timeline.style.gap = '1rem';

  let currentNode: LivingProtocolNode | undefined = protocol.steps[0];
  let stepIndex = 1;

  while (currentNode) {
    let html = `<div class="dsp-p-4 dsp-rounded-md dsp-border" style="border-left: 4px solid var(--color-primary); background: var(--color-surface);">
      <div class="dsp-text-sm dsp-text-muted dsp-mb-1">Bước ${stepIndex}: ${currentNode.type.toUpperCase()}</div>
      <div class="dsp-font-bold dsp-text-lg dsp-mb-2">${currentNode.label}</div>
    `;

    let nextNodeId: string | undefined;

    if (currentNode.type === 'lookup' && currentNode.formula_static) {
      const res = evaluateStaticFormula(currentNode.formula_static, context);
      if (res.error) {
        html += `<div class="dsp-text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: ${res.error}</div>`;
        currentNode = undefined; // Stop execution
      } else {
        html += `<div class="dsp-text-xl dsp-text-primary dsp-font-bold">${res.value} ${currentNode.unit || ''}</div>`;
        if (currentNode.note) html += `<div class="dsp-text-sm dsp-text-muted dsp-mt-1">${currentNode.note}</div>`;
        const idx = protocol.steps.findIndex(s => s.id === currentNode!.id);
        nextNodeId = protocol.steps[idx + 1]?.id;
      }
    } 
    else if (currentNode.type === 'branch' && currentNode.branch_var && currentNode.branches) {
      const val = context[currentNode.branch_var] ?? 0;
      html += `<div class="dsp-text-sm">Biến: <strong>${currentNode.branch_var} = ${val}</strong></div>`;
      
      let branchMatched = false;
      for (const branch of currentNode.branches) {
        if (evaluateBranch(branch.condition, val)) {
          html += `<div class="dsp-mt-2 dsp-text-success"><i class="fa-solid fa-check"></i> <strong>Rẽ nhánh:</strong> ${branch.label}</div>`;
          nextNodeId = branch.go_to;
          branchMatched = true;
          break;
        }
      }
      
      if (!branchMatched) {
        html += `<div class="dsp-text-danger dsp-mt-2"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: Không có nhánh nào thỏa mãn.</div>`;
        currentNode = undefined;
      }
    }
    else if (currentNode.type === 'result') {
      const lookupVar = protocol.inputs[0] || 'weight';
      const val = context[lookupVar] || 0;
      
      const resultStr = currentNode.lookup_table ? lookupValue(currentNode.lookup_table, val) : currentNode.label;
      if (resultStr) {
        html += `<div class="dsp-text-xl dsp-text-primary dsp-font-bold"><i class="fa-solid fa-pills dsp-mr-2"></i>${resultStr}</div>`;
      } else {
        html += `<div class="dsp-text-danger dsp-mt-2"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: Không tra cứu được giá trị trong bảng (Biến ${lookupVar} = ${val}).</div>`;
      }
      currentNode = undefined;
    } else {
      const idx = protocol.steps.findIndex(s => s.id === currentNode!.id);
      nextNodeId = protocol.steps[idx + 1]?.id;
    }

    html += `</div>`;
    timeline.innerHTML += html;

    if (nextNodeId) {
      currentNode = protocol.steps.find(s => s.id === nextNodeId);
      stepIndex++;
    } else {
      currentNode = undefined;
    }
  }
}
