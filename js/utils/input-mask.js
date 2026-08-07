/**
 * ============================================================================
 * INPUT MASK ENGINE — Mantine v9 Inspired (`use-mask` equivalent)
 * Tự động định dạng dữ liệu đầu vào cho các Form Lâm sàng & Máy tính Y khoa
 * ============================================================================
 */

export class InputMask {
  /**
   * Khởi tạo mask cho một thẻ input
   * @param {HTMLInputElement} inputEl 
   * @param {string} pattern - Ví dụ: '00/00/0000', '000 mg/kg', 'X00.0'
   * @param {Object} options 
   */
  constructor(inputEl, pattern, options = {}) {
    if (!inputEl) return;
    this.input = inputEl;
    this.pattern = pattern;
    this.options = options;
    this.init();
  }

  init() {
    this.onInputHandler = (e) => this.format(e);
    this.input.addEventListener('input', this.onInputHandler);
  }

  format(e) {
    let value = this.input.value;
    
    // Nếu pattern là ngày tháng (DD/MM/YYYY)
    if (this.pattern === 'DD/MM/YYYY' || this.pattern === '00/00/0000') {
      let raw = value.replace(/\D/g, '').slice(0, 8);
      let formatted = '';
      if (raw.length > 0) formatted += raw.slice(0, 2);
      if (raw.length > 2) formatted += '/' + raw.slice(2, 4);
      if (raw.length > 4) formatted += '/' + raw.slice(4, 8);
      this.input.value = formatted;
      return;
    }

    // Nếu pattern là Mã ICD-10 (X00.0)
    if (this.pattern === 'ICD10' || this.pattern === 'X00.0') {
      let raw = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
      let formatted = '';
      if (raw.length > 0) formatted += raw.slice(0, 1).replace(/[^A-Z]/g, '');
      if (raw.length > 1) formatted += raw.slice(1, 3).replace(/\D/g, '');
      if (raw.length > 3) formatted += '.' + raw.slice(3, 5).replace(/\D/g, '');
      this.input.value = formatted;
      return;
    }

    // Pattern tổng quát với '0' là chữ số
    let rawDigits = value.replace(/\D/g, '');
    let formatted = '';
    let digitIdx = 0;

    for (let i = 0; i < this.pattern.length && digitIdx < rawDigits.length; i++) {
      let char = this.pattern[i];
      if (char === '0') {
        formatted += rawDigits[digitIdx++];
      } else {
        formatted += char;
      }
    }

    this.input.value = formatted;
  }

  destroy() {
    if (this.input && this.onInputHandler) {
      this.input.removeEventListener('input', this.onInputHandler);
    }
  }
}

/**
 * Thắt buộc mask tự động qua thuộc tính data-mask
 * Ví dụ trong HTML: <input type="text" data-mask="DD/MM/YYYY" />
 */
export function initAutoInputMasks() {
  document.querySelectorAll('input[data-mask]').forEach((input) => {
    const pattern = input.getAttribute('data-mask');
    if (pattern) {
      new InputMask(input, pattern);
    }
  });
}

// Tự động khởi chạy khi DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoInputMasks);
  } else {
    initAutoInputMasks();
  }
}
