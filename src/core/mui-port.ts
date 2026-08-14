/**
 * MUI-Inspired Behaviors & Ripple Effects (mui-port.ts)
 * Path: src/core/mui-port.ts
 */

export function initMuiRipples(): void {
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('.cp-ripple, .cp-btn, .cp-chip--clickable, .cp-tab');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const wave = document.createElement('span');
    wave.className = 'cp-ripple-wave';
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    target.appendChild(wave);
    setTimeout(() => wave.remove(), 600);
  });
}

export function initMuiPort(): void {
  initMuiRipples();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMuiPort);
  } else {
    initMuiPort();
  }
}
