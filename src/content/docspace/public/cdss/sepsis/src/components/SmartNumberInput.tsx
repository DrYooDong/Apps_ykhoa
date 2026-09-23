import React, { useState, useEffect } from 'react';

export interface SmartNumberInputProps {
  value: number | undefined | null;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  isDecimal?: boolean;
  min?: number;
  max?: number;
  step?: string | number;
  className?: string;
  fallbackValue?: number;
  disabled?: boolean;
}

/**
 * SmartNumberInput: Input số thông minh tối ưu hóa cho lâm sàng
 * - Tự động chọn toàn bộ (Auto-select) khi click/chạm vào để gõ đè giá trị mới nhanh chóng
 * - Hỗ trợ cả dấu chấm (.) và dấu phẩy (,) thập phân của bàn phím tiếng Việt (Unikey/EVKey/Mobile)
 * - Không bị giật/mất dấu thập phân khi đang gõ
 * - Cho phép xóa trắng ô để nhập lại mà không bị ép thành số 0 tức thì
 * - Tự động hiển thị bàn phím số/thập phân trên thiết bị di động (inputMode="decimal")
 * - Loại bỏ nút mũi tên tăng giảm vô tình làm sai lệch chỉ số
 */
export const SmartNumberInput: React.FC<SmartNumberInputProps> = ({
  value,
  onChange,
  placeholder,
  isDecimal = false,
  min,
  max,
  className = '',
  fallbackValue,
  disabled = false,
}) => {
  const [text, setText] = useState<string>(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      return String(value);
    }
    return '';
  });

  const [isFocused, setIsFocused] = useState(false);

  // Đồng bộ khi có thay đổi từ bên ngoài (chọn ca mẫu, reset, v.v.)
  useEffect(() => {
    if (!isFocused) {
      if (value !== undefined && value !== null && !isNaN(value)) {
        setText(String(value));
      } else {
        setText('');
      }
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    if (isDecimal) {
      // Hỗ trợ cả dấu phẩy của bàn phím tiếng Việt/Châu Âu
      raw = raw.replace(',', '.');
      // Chỉ giữ lại số, dấu chấm, dấu trừ
      raw = raw.replace(/[^\d.-]/g, '');
      // Chỉ cho phép tối đa 1 dấu chấm thập phân
      const parts = raw.split('.');
      if (parts.length > 2) {
        raw = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      // Số nguyên
      raw = raw.replace(/[^\d-]/g, '');
    }

    setText(raw);

    const trimmed = raw.trim();
    if (trimmed === '' || trimmed === '-' || trimmed === '.' || trimmed === '-.') {
      if (fallbackValue === undefined) {
        onChange(undefined);
      }
      return;
    }

    const num = Number(trimmed);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Tự động bôi đen toàn bộ số cũ khi người dùng bấm vào
    // Bác sĩ/Điều dưỡng chỉ cần gõ số mới mà không phải bấm xóa từng ký tự
    e.target.select();
  };

  const handleBlur = () => {
    setIsFocused(false);
    let trimmed = text.trim();

    // Làm sạch dấu chấm dư thừa ở cuối nếu có (ví dụ "38." -> "38")
    if (trimmed.endsWith('.')) {
      trimmed = trimmed.slice(0, -1);
      setText(trimmed);
    }

    if (trimmed === '' || isNaN(Number(trimmed))) {
      if (fallbackValue !== undefined) {
        setText(String(fallbackValue));
        onChange(fallbackValue);
      } else {
        setText('');
        onChange(undefined);
      }
      return;
    }

    let num = Number(trimmed);
    if (min !== undefined && num < min) num = min;
    if (max !== undefined && num > max) num = max;

    setText(String(num));
    onChange(num);
  };

  return (
    <input
      type="text"
      inputMode={isDecimal ? 'decimal' : 'numeric'}
      value={text}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  );
};
