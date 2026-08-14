/**
 * Physio Smart Glossary Engine (physio-glossary.ts)
 * Module Sinh lý - Sinh lý bệnh | CliniPortal
 * Tự động tạo tooltip từ điển y khoa thông minh khi hover vào .term-hl
 */

export interface GlossaryEntry {
  title: string;
  desc: string;
}

export const GLOSSARY_DICTIONARY: Record<string, GlossaryEntry> = {
  'RAAS': {
    title: 'Hệ Renin-Angiotensin-Aldosterone System (RAAS)',
    desc: 'Hệ thống nội tiết-tín hiệu điều hòa huyết áp và cân bằng thể tích dịch ngoại bào. Hoạt hóa khi huyết áp hoặc dòng máu đến thận giảm.'
  },
  'Renin': {
    title: 'Enzyme Renin',
    desc: 'Dịch tiết từ phức hợp cạnh cầu thận (JGA) khi áp suất động mạch đến giảm hoặc nồng độ Na⁺ ở vết đặc giảm, chuyển Angiotensinogen thành Angiotensin I.'
  },
  'OCT': {
    title: 'Chụp cắt lớp quang học nội mạch (Optical Coherence Tomography)',
    desc: 'Kỹ thuật hình ảnh học độ phân giải siêu cao (10-15 μm) trong lòng mạch vành giúp đánh giá chi tiết độ dày vỏ xơ và nứt vỡ mảng xơ vữa.'
  },
  'IVUS': {
    title: 'Siêu âm trong lòng mạch (Intravascular Ultrasound)',
    desc: 'Kỹ thuật dùng đầu dò siêu âm nhỏ trong lòng mạch vành giúp đo đường kính lòng mạch và tải trọng mảng xơ vữa.'
  },
  'Surfactant': {
    title: 'Chất hoạt tan phế nang (Surfactant)',
    desc: 'Phức hợp Dipalmitoylphosphatidylcholine do tế bào phế nang týp II tiết ra, giúp giảm sức căng bề mặt phế nang và ngăn xẹp phổi.'
  },
  'Nicotinic ACh': {
    title: 'Thụ thể Acetylcholine Nicotinic (nAChR)',
    desc: 'Thụ thể kênh ion ligand-gated nằm tại hạch thực vật và dĩa tận cùng thần kinh-cơ. Cho dòng Na⁺ đi vào gây khử cực cực nhanh.'
  },
  'Acetylcholinesterase': {
    title: 'Enzyme Acetylcholinesterase (AChE)',
    desc: 'Enzyme tại khe synapse phân hủy Acetylcholine thành Choline và Acetate trong vài miligiây để chấm dứt tín hiệu thần kinh.'
  }
};

export function initGlossary(): void {
  const terms = document.querySelectorAll('.term-hl, .term-hl-secondary');
  if (!terms.length) return;

  let tooltipEl = document.getElementById('physio-glossary-tooltip') as HTMLElement | null;
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'physio-glossary-tooltip';
    tooltipEl.className = 'physio-glossary-tooltip';
    document.body.appendChild(tooltipEl);
  }

  terms.forEach(term => {
    const rawText = (term.textContent || '').trim();
    const info = GLOSSARY_DICTIONARY[rawText];

    if (info && tooltipEl) {
      term.setAttribute('data-has-glossary', 'true');
      const tooltip = tooltipEl;
      term.addEventListener('mouseenter', (e: Event) => showTooltip(e as MouseEvent, info, tooltip));
      term.addEventListener('mousemove', (e: Event) => positionTooltip(e as MouseEvent, tooltip));
      term.addEventListener('mouseleave', () => hideTooltip(tooltip));
    }
  });
}

function showTooltip(e: MouseEvent, info: GlossaryEntry, tooltipEl: HTMLElement): void {
  tooltipEl.innerHTML = `
    <div class="tooltip-header">📖 ${info.title}</div>
    <div class="tooltip-body">${info.desc}</div>
  `;
  tooltipEl.classList.add('visible');
  positionTooltip(e, tooltipEl);
}

function positionTooltip(e: MouseEvent, tooltipEl: HTMLElement): void {
  const x = e.clientX;
  const y = e.clientY;
  const width = 280;

  let left = x + 15;
  let top = y + 15;

  if (left + width > window.innerWidth - 20) {
    left = x - width - 15;
  }

  tooltipEl.style.left = `${left}px`;
  tooltipEl.style.top = `${top}px`;
}

function hideTooltip(tooltipEl: HTMLElement): void {
  tooltipEl.classList.remove('visible');
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initGlossary);
}
