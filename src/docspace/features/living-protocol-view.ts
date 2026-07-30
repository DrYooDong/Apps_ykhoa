import { LivingProtocol, LivingProtocolNode } from '../types';
import { evaluateBranch, evaluateStaticFormula, lookupValue } from './rule-engine';
import { VANCOMYCIN_PROTOCOL } from '../data/living-protocol-templates/vancomycin-dosing';

const PROTOCOLS = [VANCOMYCIN_PROTOCOL];

export function renderLivingProtocolView(profileId: string, protocolId?: string): string {
  if (protocolId) {
    const protocol = PROTOCOLS.find(p => p.id === protocolId);
    if (!protocol) return `<div class="dsp-view-container"><div class="dsp-alert dsp-alert-danger">Không tìm thấy phác đồ</div></div>`;
    return renderProtocolWizard(protocol);
  }

  return `
    <div class="dsp-view-container animate-fade-in">
      <header class="dsp-header dsp-flex dsp-justify-between dsp-items-center">
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            <i class="fa-solid fa-network-wired dsp-mr-2"></i> Phác đồ Động (Living Protocols)
          </h2>
          <p class="dsp-text-muted">Tính toán và nội suy dựa trên dữ liệu lâm sàng (Phase 1)</p>
        </div>
      </header>
      <div class="dsp-content dsp-mt-6">
        <div class="dsp-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem;">
          ${PROTOCOLS.map(p => `
            <div class="dsp-card dsp-p-6 dsp-cursor-pointer hover:dsp-shadow-lg" style="transition: all 0.2s" data-action="open-protocol" data-id="${p.id}">
              <h3 class="dsp-font-bold dsp-text-lg dsp-mb-2"><i class="fa-solid fa-file-medical dsp-text-primary"></i> ${p.title}</h3>
              <p class="dsp-text-sm dsp-text-muted">Biến đầu vào: ${p.inputs.join(', ')}</p>
              <div class="dsp-mt-4">
                <span class="dsp-badge dsp-badge-primary">Chạy phác đồ →</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderProtocolWizard(protocol: LivingProtocol): string {
  return `
    <div class="dsp-view-container animate-fade-in" id="lpWizardContainer" data-protocol-id="${protocol.id}">
      <header class="dsp-header dsp-flex dsp-items-center">
        <button class="dsp-icon-btn dsp-mr-4" data-action="back-to-list" title="Quay lại">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            ${protocol.title}
          </h2>
          <p class="dsp-text-muted">Vui lòng nhập các thông số đầu vào để hệ thống tính toán</p>
        </div>
      </header>
      
      <div class="dsp-content dsp-mt-6 dsp-flex" style="gap: 2rem; align-items: flex-start;">
        
        <!-- Cột trái: Form nhập liệu -->
        <div class="dsp-card dsp-p-6" style="flex: 0 0 350px;">
          <h3 class="dsp-font-bold dsp-mb-4">Biến số lâm sàng</h3>
          <form id="lpInputForm" novalidate>
            ${protocol.inputs.map(input => `
              <div class="dsp-form-group">
                <label class="dsp-label">${input.toUpperCase()}</label>
                <input type="number" class="dsp-input lp-input-field" data-var="${input}" required />
              </div>
            `).join('')}
            <button type="submit" class="dsp-btn dsp-btn-primary dsp-mt-4 dsp-w-full">
              <i class="fa-solid fa-calculator dsp-mr-2"></i> Phân tích
            </button>
          </form>
        </div>

        <!-- Cột phải: Kết quả thực thi -->
        <div class="dsp-card dsp-p-6" style="flex: 1;">
          <h3 class="dsp-font-bold dsp-mb-4">Kết quả Phác đồ</h3>
          <div id="lpExecutionTimeline" class="dsp-empty-state dsp-p-8">
            <i class="fa-solid fa-hourglass-empty dsp-text-4xl dsp-text-muted dsp-mb-2"></i>
            <p>Nhập thông số và bấm Phân tích để xem kết quả nội suy.</p>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function mountLivingProtocolController(profileId: string): void {
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
        // Chuyển sang node tiếp theo theo thứ tự mảng
        const idx = protocol.steps.findIndex(s => s.id === currentNode!.id);
        nextNodeId = protocol.steps[idx + 1]?.id;
      }
    } 
    else if (currentNode.type === 'branch' && currentNode.branch_var && currentNode.branches) {
      const val = context[currentNode.branch_var];
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
    else if (currentNode.type === 'result' && currentNode.lookup_table) {
      // Find the primary input variable to lookup (assuming first input if not specified)
      // Normally result nodes in our schema lookup based on weight
      const lookupVar = 'weight'; // Hardcoded for this demo based on vancomycin template
      const val = context[lookupVar];
      
      const resultStr = lookupValue(currentNode.lookup_table, val);
      if (resultStr) {
        html += `<div class="dsp-text-xl dsp-text-primary dsp-font-bold"><i class="fa-solid fa-pills dsp-mr-2"></i>${resultStr}</div>`;
      } else {
        html += `<div class="dsp-text-danger dsp-mt-2"><i class="fa-solid fa-triangle-exclamation"></i> Lỗi: Không tra cứu được giá trị trong bảng (Biến ${lookupVar} = ${val}).</div>`;
      }
      // Result là node cuối
      currentNode = undefined;
    }

    html += `</div>`;
    timeline.innerHTML += html;
    
    if (nextNodeId) {
      currentNode = protocol.steps.find(s => s.id === nextNodeId);
    }
    stepIndex++;
  }
}
