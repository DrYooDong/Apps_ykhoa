import React from 'react';

interface FormattedClinicalTextProps {
  text?: string;
  className?: string;
  bulletColor?: 'blue' | 'slate' | 'amber' | 'emerald' | 'red';
}

/**
 * Trình bày văn bản lâm sàng chuyên nghiệp:
 * - Tách dòng và ngắt đoạn rõ ràng, chống "dính chữ"
 * - Nhận diện bullet points (- item, • item, * item, 1. item)
 * - Định dạng nhãn đậm **Nhãn:** nổi bật, dễ quét mắt
 * - Khử triệt để lỗi "" hoặc mã HTML entity
 */
export const FormattedClinicalText: React.FC<FormattedClinicalTextProps> = ({
  text,
  className = '',
  bulletColor = 'slate',
}) => {
  if (!text || text.trim().length === 0) {
    return <span className="text-slate-400 italic">Chưa ghi nhận</span>;
  }

  // Khử các lỗi ký tự thường gặp như "" hoặc \r\n thừa
  const cleanText = text
    .replace(/""/g, '"')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

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

  // Helper format inline bold **text** and italic *text*
  const formatInline = (str: string) => {
    // Tách theo **bold**
    const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <b key={idx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </b>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={idx} className="italic text-slate-800 font-medium">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className={`space-y-1.5 leading-relaxed text-xs text-slate-700 ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
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
              <span>{formatInline(headingText)}</span>
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
                {formatInline(content)}
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
                {formatInline(content)}
              </div>
            </div>
          );
        }

        // Đoạn văn bình thường
        return (
          <p key={idx} className="leading-relaxed">
            {formatInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
