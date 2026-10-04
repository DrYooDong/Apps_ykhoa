import React from 'react';

interface FormattedClinicalTextProps {
  text?: string;
  className?: string;
  bulletColor?: 'blue' | 'slate' | 'amber' | 'emerald' | 'red';
}

/**
 * Khử triệt để các ký tự đặc biệt từ NotebookLM/LaTeX/Markdown:
 * - Dấu ngoặc LaTeX: \( ... \) hoặc escaped \\( ... \\)
 * - Lệnh LaTeX: \rightarrow, \ge, \le, \text{...}, \mathbf{...}, \times, \sim, \pm, \frac{a}{b}
 * - Lỗi trích xuất text: text{...}, "" hoặc mã HTML entity &quot;, &lt;, &gt;
 */
export function sanitizeClinicalTypography(input?: string): string {
  if (!input) return '';
  return input
    // 1. Khử lỗi HTML entity và dấu ngoặc kép thừa
    .replace(/""/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    // 2. Ký hiệu mũi tên và so sánh y khoa
    .replace(/\\+\(\s*\\+rightarrow\s*\\+\)/g, '➔')
    .replace(/\\+rightarrow/g, '➔')
    .replace(/\\+\(\s*\\+ge(q)?\s*\\+\)/g, '≥')
    .replace(/\\+ge(q)?/g, '≥')
    .replace(/\\+\(\s*\\+le(q)?\s*\\+\)/g, '≤')
    .replace(/\\+le(q)?/g, '≤')
    .replace(/\\+\(\s*\\+times\s*\\+\)/g, '×')
    .replace(/\\+times/g, '×')
    .replace(/\\+sim/g, '~')
    .replace(/\\+pm/g, '±')
    .replace(/\\+approx/g, '≈')
    // 3. Khử text{...} và \text{...}
    .replace(/\\?text\{\s*([^}]+)\s*\}/g, '$1')
    .replace(/\\?mathbf\{\s*([^}]+)\s*\}/g, '$1')
    // 4. Khử phân số \frac{a}{b}
    .replace(/\\?frac\{\s*([^}]+)\s*\}\{\s*([^}]+)\s*\}/g, '$1/$2')
    // 5. Khử độ C và micro
    .replace(/\^\\circ\s*(?:text\{)?C\}?/g, '°C')
    .replace(/\^\\circ/g, '°')
    .replace(/\\+mu\s*([a-zA-Z]+)?/g, 'µ$1')
    // 6. Khử các dấu ngoặc LaTeX math còn sót \( hoặc \) (cả escaped và unescaped)
    .replace(/\\+\(/g, '')
    .replace(/\\+\)/g, '')
    .trim();
}

/**
 * Format inline bold **text**, italic *text*, code `text`
 */
export function formatClinicalInline(str: string): React.ReactNode {
  const sanitized = sanitizeClinicalTypography(str);
  // Tách theo **bold**, *italic*, `code`
  const parts = sanitized.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <b key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </b>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic text-slate-800 font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 font-mono-custom text-[11px] text-slate-800 border border-slate-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * Trình bày văn bản lâm sàng chuyên nghiệp:
 * - Tách dòng và ngắt đoạn rõ ràng, chống "dính chữ"
 * - Nhận diện bullet points (- item, • item, * item, 1. item)
 * - Định dạng nhãn đậm **Nhãn:** nổi bật, dễ quét mắt
 * - Khử triệt để lỗi LaTeX \( \), \rightarrow, \ge, \text{}
 */
export const FormattedClinicalText: React.FC<FormattedClinicalTextProps> = ({
  text,
  className = '',
  bulletColor = 'slate',
}) => {
  if (!text || text.trim().length === 0) {
    return <span className="text-slate-400 italic">Chưa ghi nhận</span>;
  }

  const cleanText = sanitizeClinicalTypography(text);
  const lines = cleanText.split(/\r?\n/);

  const getBulletClass = () => {
    switch (bulletColor) {
      case 'blue':
        return 'bg-sky-500';
      case 'amber':
        return 'bg-amber-500';
      case 'emerald':
        return 'bg-emerald-500';
      case 'red':
        return 'bg-rose-500';
      default:
        return 'bg-slate-400';
    }
  };

  return (
    <div className={`space-y-1.5 leading-relaxed text-xs text-slate-700 ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bỏ các divider thô '---'
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={idx} className="border-slate-200 my-1.5" />;
        }

        // Kiểm tra heading cấp nhỏ: #### hoặc ###
        if (trimmed.startsWith('####') || trimmed.startsWith('###')) {
          const headingText = trimmed.replace(/^#+\s*/, '');
          return (
            <div
              key={idx}
              className="font-bold text-[11px] text-slate-900 uppercase tracking-wider pt-1.5 pb-0.5 border-b border-slate-100 flex items-center gap-1.5"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${getBulletClass()}`} />
              <span>{formatClinicalInline(headingText)}</span>
            </div>
          );
        }

        // Bullet point: - hoặc * hoặc •
        const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
        if (bulletMatch) {
          const content = bulletMatch[1];
          // Kiểm tra xem dòng có lùi đầu dòng hay không (indentation)
          const isSubBullet = line.startsWith('  ') || line.startsWith('\t');

          return (
            <div
              key={idx}
              className={`flex items-start gap-2 py-0.5 ${
                isSubBullet ? 'pl-4 border-l border-slate-200/80 my-0.5' : ''
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  isSubBullet ? 'bg-slate-300' : getBulletClass()
                }`}
              />
              <div className="flex-1 leading-relaxed">
                {formatClinicalInline(content)}
              </div>
            </div>
          );
        }

        // Numbered list: 1. hoặc 2.
        const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
        if (numMatch) {
          const num = numMatch[1];
          const content = numMatch[2];
          return (
            <div key={idx} className="flex items-start gap-2 py-0.5">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
                {num}
              </span>
              <div className="flex-1 leading-relaxed">
                {formatClinicalInline(content)}
              </div>
            </div>
          );
        }

        // Đoạn văn bình thường
        return (
          <p key={idx} className="leading-relaxed">
            {formatClinicalInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
