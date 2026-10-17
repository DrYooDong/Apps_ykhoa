import React from 'react';

interface FormattedClinicalTextProps {
  text?: string;
  className?: string;
  bulletColor?: 'blue' | 'slate' | 'amber' | 'emerald' | 'red';
}

/**
 * Khử triệt để các ký tự đặc biệt từ NotebookLM/LaTeX/Markdown và chuẩn hóa ký hiệu Y khoa:
 * - Dấu ngoặc LaTeX: \( ... \) hoặc escaped \\( ... \\)
 * - Lệnh LaTeX: \rightarrow, \ge, \le, \text{...}, \mathbf{...}, \times, \sim, \pm, \frac{a}{b}
 * - Ký hiệu khí máu & ion: PaO2, SpO2, SaO2, PaCO2, HCO3-, H2O, Na+, K+, Cl-, Ca2+, mmH2O
 * - Lỗi trích xuất text: text{...}, "" hoặc mã HTML entity &quot;, &lt;, &gt;
 */
export function sanitizeClinicalTypography(input?: string): string {
  if (!input) return '';

  return input
    // 0. Khử divider thô ở đầu/cuối chuỗi
    .replace(/^\s*[-*]{3,}\s*\r?\n?/, '')
    .replace(/\r?\n?\s*[-*]{3,}\s*$/, '')

    // 1. Tách dòng cho các bullet dính liền sau dấu câu hoặc dấu hai chấm
    .replace(/([.!?;])\s+-\s+\*\*/g, '$1\n- **')
    .replace(/:\s+-\s+/g, ':\n  - ')

    // 2. Khử lỗi HTML entity và dấu ngoặc kép thừa
    .replace(/""/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')

    // 3. Khử percent và ký hiệu đặc biệt LaTeX
    .replace(/\\+%/g, '%')
    .replace(/\\+\(\s*\\+rightarrow\s*\\+\)/g, '➔')
    .replace(/\\+(rightarrow|to)\b/g, '➔')
    .replace(/\\+(leftarrow)\b/g, '←')
    .replace(/\\+(leftrightarrow)\b/g, '↔')
    .replace(/\\+(uparrow)\b/g, '↑')
    .replace(/\\+(downarrow)\b/g, '↓')
    .replace(/\\+\(\s*\\+ge(q)?\s*\\+\)/g, '≥')
    .replace(/\\+ge(q)?\b/g, '≥')
    .replace(/\\+\(\s*\\+le(q)?\s*\\+\)/g, '≤')
    .replace(/\\+le(q)?\b/g, '≤')
    .replace(/\\+neq\b/g, '≠')
    .replace(/\\+\(\s*\\+times\s*\\+\)/g, '×')
    .replace(/\\+times\b/g, '×')
    .replace(/\\+sim\b/g, '~')
    .replace(/\\+pm\b/g, '±')
    .replace(/\\+approx\b/g, '≈')

    // 4. Khử text{...} và \text{...}, \mathbf{...}
    .replace(/\\?text\{\s*([^}]+)\s*\}/g, '$1')
    .replace(/\\?mathbf\{\s*([^}]+)\s*\}/g, '$1')

    // 5. Khử phân số \frac{a}{b}
    .replace(/\\?frac\{\s*([^}]+)\s*\}\{\s*([^}]+)\s*\}/g, '$1/$2')

    // 6. Khử độ C và micro
    .replace(/\^\\circ\s*(?:text\{)?C\}?/g, '°C')
    .replace(/\^\\circ/g, '°')
    .replace(/\\+degree\b/g, '°')
    .replace(/\\+mu\s*([a-zA-Z]+)?/g, 'µ$1')

    // 7. Chuẩn hóa Khí Máu Động Mạch & Sinh hiệu (Subscripts & Superscripts)
    .replace(/\bPaO(?:_\{2\}|_2|2)\b/gi, 'PaO₂')
    .replace(/\bSpO(?:_\{2\}|_2|2)\b/gi, 'SpO₂')
    .replace(/\bSaO(?:_\{2\}|_2|2)\b/gi, 'SaO₂')
    .replace(/\bPaCO(?:_\{2\}|_2|2)\b/gi, 'PaCO₂')
    .replace(/\bPvO(?:_\{2\}|_2|2)\b/gi, 'PvO₂')
    .replace(/\bFiO(?:_\{2\}|_2|2)\b/gi, 'FiO₂')
    .replace(/P_\{?a\}?O_\{?2\}?/gi, 'PaO₂')
    .replace(/P_\{?a\}?CO_\{?2\}?/gi, 'PaCO₂')
    .replace(/\bHCO(?:_\{3\}|_3|3)\^?\{?-?\}?/gi, 'HCO₃⁻')
    .replace(/\bH(?:_\{2\}|_2|2)O\b/gi, 'H₂O')
    .replace(/\bCO(?:_\{2\}|_2)\b/gi, 'CO₂')
    .replace(/\bO(?:_\{2\}|_2)\b/gi, 'O₂')
    .replace(/\bNa\^\{?\+?\}?/gi, 'Na⁺')
    .replace(/\bK\^\{?\+?\}?/gi, 'K⁺')
    .replace(/\bCl\^\{?-?\}?/gi, 'Cl⁻')
    .replace(/\bCa\^\{?2\+?\}?/gi, 'Ca²⁺')
    .replace(/\bMg\^\{?2\+?\}?/gi, 'Mg²⁺')
    .replace(/\bmmH(?:_\{2\}|_2|2)O\b/gi, 'mmH₂O')
    .replace(/\bm\^\{?2\}?\b/gi, 'm²')
    .replace(/\bm\^\{?3\}?\b/gi, 'm³')
    .replace(/\bmm\^\{?3\}?\b/gi, 'mm³')

    // 8. Chuyển đổi Subscript / Superscript số LaTeX tổng quát
    .replace(/_\{0\}/g, '₀').replace(/_\{1\}/g, '₁').replace(/_\{2\}/g, '₂')
    .replace(/_\{3\}/g, '₃').replace(/_\{4\}/g, '₄').replace(/_\{5\}/g, '₅')
    .replace(/_\{6\}/g, '₆').replace(/_\{7\}/g, '₇').replace(/_\{8\}/g, '₈').replace(/_\{9\}/g, '₉')
    .replace(/\^\{0\}/g, '⁰').replace(/\^\{1\}/g, '¹').replace(/\^\{2\}/g, '²')
    .replace(/\^\{3\}/g, '³').replace(/\^\{4\}/g, '⁴').replace(/\^\{5\}/g, '⁵')
    .replace(/\^\{6\}/g, '⁶').replace(/\^\{7\}/g, '⁷').replace(/\^\{8\}/g, '⁸').replace(/\^\{9\}/g, '⁹')

    // 9. Khử các dấu ngoặc LaTeX math còn sót \( hoặc \) (cả escaped và unescaped)
    .replace(/\\+\(/g, '')
    .replace(/\\+\)/g, '')
    // Khử trường hợp sót dấu ngoặc kép cuối do dính \(...%))
    .replace(/\(\s*([^\n()]+?)\s*%\s*\)\)/g, '($1%)')
    .trim();
}

/**
 * Format inline: **bold**, *italic*, `code`, và [link text](url)
 */
export function formatClinicalInline(str: string): React.ReactNode {
  const sanitized = sanitizeClinicalTypography(str);

  // Tách theo **bold**, *italic*, `code`, và [text](url)
  const parts = sanitized.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

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
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={idx}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 underline font-semibold transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

/**
 * Trình bày văn bản lâm sàng chuyên nghiệp:
 * - Hỗ trợ render Markdown Tables (| col | col |) với bảng cuộn responsive đẹp mắt
 * - Hỗ trợ Callout/Alert (> [!NOTE], > [!WARNING], > ...)
 * - Tách dòng và ngắt đoạn rõ ràng, chống "dính chữ"
 * - Nhận diện bullet points (- item, • item, * item, 1. item)
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
  const rawLines = cleanText.split(/\r?\n/);

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

  // Gom các khối nội dung: Table, Callout, Headings, List items, Paragraphs
  const blocks: React.ReactNode[] = [];
  let tableBuffer: string[] = [];

  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer
      .map((r) => r.trim())
      .filter((r) => r.startsWith('|') && r.endsWith('|'));
    tableBuffer = [];
    if (rows.length < 2) return;

    const headerCols = rows[0]
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim());

    const dataRows = rows.slice(rows[1].includes('---') ? 2 : 1);

    blocks.push(
      <div key={`table-${blocks.length}`} className="my-3 space-y-1">
        <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-500 font-medium px-1">
          <span className="flex items-center gap-1 text-blue-700">
            <span>↔</span>
            <span>Bảng lâm sàng (Vuốt ngang xem đầy đủ)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono-custom">
            {dataRows.length} hàng · {headerCols.length} cột
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs touch-pan-x bg-white">
          <table className="w-full text-left border-collapse text-sm sm:text-xs md:text-sm min-w-[340px]">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-800 font-bold">
                {headerCols.map((col, cIdx) => (
                  <th key={cIdx} className="py-2.5 px-3.5 text-xs sm:text-[11px] md:text-xs uppercase tracking-wider whitespace-nowrap bg-slate-100/80">
                    {formatClinicalInline(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {dataRows.map((row, rIdx) => {
                const cells = row
                  .split('|')
                  .slice(1, -1)
                  .map((c) => c.trim());
                return (
                  <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors odd:bg-white even:bg-slate-50/40">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-3.5 align-top leading-relaxed text-slate-800">
                        {formatClinicalInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    const trimmed = line.trim();

    // 1. Markdown Table lines
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      tableBuffer.push(trimmed);
      continue;
    } else if (tableBuffer.length > 0) {
      flushTable();
    }

    if (!trimmed) {
      blocks.push(<div key={`empty-${i}`} className="h-1" />);
      continue;
    }

    // 2. Divider line
    if (trimmed === '---' || trimmed === '***') {
      blocks.push(<hr key={`hr-${i}`} className="border-slate-200 my-2" />);
      continue;
    }

    // 3. Headings: #### hoặc ###
    if (trimmed.startsWith('####') || trimmed.startsWith('###')) {
      const headingText = trimmed.replace(/^#+\s*/, '');
      blocks.push(
        <div
          key={`h-${i}`}
          className="font-bold text-[11.5px] text-slate-900 uppercase tracking-wider pt-2 pb-0.5 border-b border-slate-100 flex items-center gap-1.5"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${getBulletClass()}`} />
          <span>{formatClinicalInline(headingText)}</span>
        </div>
      );
      continue;
    }

    // 4. Callout / Alert Quotes: > [!NOTE], [!WARNING], > ...
    if (trimmed.startsWith('>')) {
      const rawQuote = trimmed.replace(/^>\s*/, '');
      let calloutClass = 'bg-sky-50/70 border-l-4 border-l-sky-500 border border-sky-200 text-sky-950';
      if (/warning|cảnh báo|bẫy/i.test(rawQuote)) {
        calloutClass = 'bg-amber-50/70 border-l-4 border-l-amber-500 border border-amber-200 text-amber-950';
      } else if (/danger|nguy hiểm|đe dọa/i.test(rawQuote)) {
        calloutClass = 'bg-rose-50/70 border-l-4 border-l-rose-500 border border-rose-200 text-rose-950';
      }

      blocks.push(
        <div
          key={`quote-${i}`}
          className={`p-3 rounded-r-xl my-1.5 shadow-2xs text-xs leading-relaxed ${calloutClass}`}
        >
          {formatClinicalInline(rawQuote.replace(/^\[!(NOTE|WARNING|IMPORTANT|CAUTION|TIP)\]\s*/i, ''))}
        </div>
      );
      continue;
    }

    // 5. Bullet point: - hoặc * hoặc •
    const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      const content = bulletMatch[1];
      const isSubBullet = line.startsWith('  ') || line.startsWith('\t');

      blocks.push(
        <div
          key={`bullet-${i}`}
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
      continue;
    }

    // 6. Numbered list: 1. hoặc 2.
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (numMatch) {
      const num = numMatch[1];
      const content = numMatch[2];
      blocks.push(
        <div key={`num-${i}`} className="flex items-start gap-2 py-0.5">
          <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
            {num}
          </span>
          <div className="flex-1 leading-relaxed">
            {formatClinicalInline(content)}
          </div>
        </div>
      );
      continue;
    }

    // 7. Đoạn văn bình thường
    blocks.push(
      <p key={`p-${i}`} className="leading-relaxed">
        {formatClinicalInline(trimmed)}
      </p>
    );
  }

  // Flush table còn sót nếu ở cuối
  flushTable();

  return (
    <div className={`space-y-2 leading-relaxed text-sm sm:text-xs md:text-sm text-slate-800 clinical-reading-text ${className}`}>
      {blocks}
    </div>
  );
};

