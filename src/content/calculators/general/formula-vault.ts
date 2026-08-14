import { PhysioFormulaEngine } from './js/physio-formula-engine';

export function initFormulaVault(): void {
  PhysioFormulaEngine.init('formula-container', 'data/formula-vault.json');
}

// Global MathJax configuration
if (typeof window !== 'undefined') {
  (window as any).MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      processEscapes: true
    }
  };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormulaVault);
  } else {
    initFormulaVault();
  }
}
