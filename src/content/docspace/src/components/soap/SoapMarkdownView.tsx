import React, { useState, useMemo } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode,
  FileText,
  Flame,
  Layers,
  Lightbulb,
  ListFilter,
  Pill,
  Printer,
  Scale,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { generateSoapMarkdown } from '../../lib/clientSideIngest.ts';
import { formatClinicalInline } from './FormattedClinicalText.tsx';

interface SoapMarkdownViewProps {
  currentCase: SoapClinicalExperience;
}

/**
 * Helper format inline markdown text (bold, italic, code, math)
 */
function renderInlineMarkdown(text: string): React.ReactNode {
  return formatClinicalInline(text);
}

/**
 * Editorial Clinical Markdown Reader Component
 */
export const SoapMarkdownView: React.FC<SoapMarkdownViewProps> = ({ currentCase }) => {
  const [viewFormat, setViewFormat] = useState<'formatted' | 'raw'>('formatted');
  const [copied, setCopied] = useState<boolean>(false);

  // Lấy raw markdown nếu có, hoặc tạo lại từ dữ liệu chuẩn
  const markdownText = useMemo(() => {
    if (currentCase?.rawMarkdown && currentCase.rawMarkdown.trim().length > 100) {
      return currentCase.rawMarkdown;
    }
    return generateSoapMarkdown(currentCase);
  }, [currentCase]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Không thể sao chép văn bản:', err);
    }
  };

  const handleDownload = () => {
    const filename = `${currentCase.id || 'soap-case'}.md`;
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Parse markdown content into structured block elements
  const parsedBlocks = useMemo(() => {
    const rawLines = markdownText.split(/\r?\n/);
    const blocks: React.ReactNode[] = [];

    let inFrontmatter = false;
    let frontmatterLines: string[] = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];
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
        <div key={`table-${blocks.length}`} className="my-4 overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                {headerCols.map((col, cIdx) => (
                  <th key={cIdx} className="py-2.5 px-3.5">
                    {renderInlineMarkdown(col)}
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
                  <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-3.5 align-top leading-relaxed text-slate-700">
                        {renderInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      const trimmed = line.trim();

      // Frontmatter toggle
      if (trimmed === '---') {
        if (!inFrontmatter && i === 0) {
          inFrontmatter = true;
          continue;
        } else if (inFrontmatter) {
          inFrontmatter = false;
          // Render frontmatter summary card
          blocks.push(
            <div
              key="frontmatter"
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4.5 mb-6 text-xs text-slate-700 shadow-2xs space-y-2.5"
            >
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-2 flex-wrap gap-2">
                <span className="font-mono-custom text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>YAML Frontmatter Metadata</span>
                </span>
                <span className="px-2 py-0.5 rounded-md font-mono-custom text-[10.5px] bg-white border border-slate-200 text-slate-700 font-semibold">
                  Case ID: {currentCase.id}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Chuyên khoa:</span>
                  <b className="text-blue-900">{currentCase.specialty}</b>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mã ICD-10:</span>
                  <b className="font-mono-custom text-emerald-900">{currentCase.a.icd10 || 'N/A'}</b>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phân loại ca:</span>
                  <b className="capitalize text-amber-900">{currentCase.experienceLevel}</b>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Bác sĩ đúc kết:</span>
                  <b className="text-slate-800">{currentCase.authorDoctor || 'CliniPortal'}</b>
                </div>
              </div>
            </div>
          );
          continue;
        }
      }

      if (inFrontmatter) {
        frontmatterLines.push(line);
        continue;
      }

      // Code Block toggle
      if (trimmed.startsWith('```')) {
        flushTable();
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = trimmed.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          const codeContent = codeBuffer.join('\n');
          const langDisplay = codeLanguage ? codeLanguage.toUpperCase() : 'TIMELINE';
          blocks.push(
            <div
              key={`code-${blocks.length}`}
              className="my-5 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs group"
            >
              <div className="bg-slate-800/90 px-3.5 py-2 text-[11px] font-mono-custom text-slate-300 border-b border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-1 font-bold text-slate-200 tracking-wider">
                    {langDisplay.includes('JSON') ? 'CSDL CẤU TRÚC JSON' : `${langDisplay} CLINICAL ROADMAP`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[10.5px]">Lộ trình nấc thang</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      navigator.clipboard.writeText(codeContent);
                      const target = e.currentTarget;
                      target.innerText = '✓ Đã chép';
                      setTimeout(() => { target.innerText = 'Sao chép'; }, 1800);
                    }}
                    className="px-2 py-0.5 rounded text-[10px] bg-slate-700/80 hover:bg-slate-700 text-slate-200 font-sans font-medium transition-colors cursor-pointer"
                  >
                    Sao chép
                  </button>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed whitespace-pre font-medium selection:bg-teal-900 selection:text-white">
                {codeContent}
              </pre>
            </div>
          );
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        continue;
      }

      // Markdown Table Lines
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableBuffer.push(trimmed);
        continue;
      } else if (tableBuffer.length > 0) {
        flushTable();
      }

      // Empty Line
      if (!trimmed) {
        continue;
      }

      // Heading 1: # Title
      if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
        const titleText = trimmed.replace(/^#\s*/, '');
        blocks.push(
          <div key={`h1-${blocks.length}`} id="soap-sec-header" className="my-5 pb-3 border-b-2 border-slate-200">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {renderInlineMarkdown(titleText)}
            </h1>
          </div>
        );
        continue;
      }

      // Heading 2: ## 1. S / 2. O / 3. A / 4. P
      if (trimmed.startsWith('## ')) {
        const headingText = trimmed.replace(/^##\s*/, '');
        let bgGradient = 'from-slate-700 to-slate-900';
        let sectionBadge = 'SECTION';
        let sectionId = `soap-sec-${blocks.length}`;

        if (/S\b|Chủ quan|Subjective/i.test(headingText)) {
          bgGradient = 'from-sky-600 via-sky-700 to-cyan-700';
          sectionBadge = 'S — CHỦ QUAN';
          sectionId = 'soap-sec-s';
        } else if (/O\b|Khách quan|Objective/i.test(headingText)) {
          bgGradient = 'from-slate-700 via-slate-800 to-zinc-800';
          sectionBadge = 'O — KHÁCH QUAN';
          sectionId = 'soap-sec-o';
        } else if (/A\b|Đánh giá|Biện luận|Assessment/i.test(headingText)) {
          bgGradient = 'from-amber-600 via-amber-700 to-orange-700';
          sectionBadge = 'A — ĐÁNH GIÁ';
          sectionId = 'soap-sec-a';
        } else if (/P\b|Kế hoạch|Xử trí|Plan/i.test(headingText)) {
          bgGradient = 'from-teal-600 via-teal-700 to-emerald-700';
          sectionBadge = 'P — KẾ HOẠCH';
          sectionId = 'soap-sec-p';
        }

        blocks.push(
          <div
            key={`h2-${blocks.length}`}
            id={sectionId}
            className={`my-6 scroll-mt-20 rounded-xl bg-gradient-to-r ${bgGradient} text-white p-3.5 px-4 shadow-2xs flex items-center justify-between flex-wrap gap-2`}
          >
            <h2 className="font-display text-sm font-bold tracking-wide uppercase flex items-center gap-2">
              {renderInlineMarkdown(headingText)}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono-custom text-[10px] font-bold tracking-wider uppercase border border-white/30">
              {sectionBadge}
            </span>
          </div>
        );
        continue;
      }

      // Heading 3: ### Sub-sections
      if (trimmed.startsWith('### ')) {
        const h3Text = trimmed.replace(/^###\s*/, '');
        const isProblemTable = h3Text.includes('Vấn Đề') || h3Text.includes('3 Tầng');
        const isPrescription = h3Text.includes('Y lệnh') || h3Text.includes('Thuốc');
        const isRoadmap = h3Text.includes('Lộ trình');

        blocks.push(
          <div
            key={`h3-${blocks.length}`}
            id={isProblemTable ? 'soap-sec-problems' : isPrescription ? 'soap-sec-rx' : isRoadmap ? 'soap-sec-roadmap' : undefined}
            className="mt-6 mb-2.5 pt-2 border-t border-slate-100 scroll-mt-20 flex items-center justify-between flex-wrap gap-2"
          >
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isProblemTable ? 'bg-amber-500' : isPrescription ? 'bg-emerald-500' : 'bg-slate-500'}`} />
              <h3 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">
                {renderInlineMarkdown(h3Text)}
              </h3>
            </div>
            {isProblemTable && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                ⭐ Hoàng Văn Sĩ Model
              </span>
            )}
            {isPrescription && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                💊 Phác đồ chuẩn BYT
              </span>
            )}
          </div>
        );
        continue;
      }

      // Heading 4: #### Sub-sub-sections (Nâng cấp Pill Badge)
      if (trimmed.startsWith('#### ')) {
        const h4Text = trimmed.replace(/^####\s*/, '');
        blocks.push(
          <div
            key={`h4-${blocks.length}`}
            className="mt-4 mb-2 flex items-center gap-2"
          >
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200/90 font-mono-custom tracking-wider uppercase">
              MỤC CON
            </span>
            <h4 className="font-bold text-[12px] text-slate-800">
              {renderInlineMarkdown(h4Text)}
            </h4>
          </div>
        );
        continue;
      }

      // Blockquote & Advanced Callout Alerts: > [!NOTE], [!WARNING], [!IMPORTANT], [!CAUTION], [!TIP]
      if (trimmed.startsWith('> ')) {
        const rawQuote = trimmed.replace(/^>\s*/, '');

        // 1. Phân loại Callout
        const calloutMatch = rawQuote.match(/^\[!(NOTE|WARNING|IMPORTANT|CAUTION|TIP)\]\s*(.*)$/i);
        if (calloutMatch) {
          const type = calloutMatch[1].toUpperCase();
          const calloutBody = calloutMatch[2];

          let calloutTheme = {
            border: 'border-l-sky-500 border-sky-200',
            bg: 'bg-sky-50/80 text-sky-950',
            badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
            title: 'LƯU Ý LÂM SÀNG (NOTE)',
            icon: '💡',
          };

          if (type === 'WARNING') {
            calloutTheme = {
              border: 'border-l-amber-500 border-amber-200',
              bg: 'bg-amber-50/80 text-amber-950',
              badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
              title: 'CẢNH BÁO BẪY LÂM SÀNG (WARNING)',
              icon: '⚠️',
            };
          } else if (type === 'IMPORTANT') {
            calloutTheme = {
              border: 'border-l-rose-500 border-rose-200',
              bg: 'bg-rose-50/80 text-rose-950',
              badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
              title: 'QUAN TRỌNG ĐẶC BIỆT (IMPORTANT)',
              icon: '🔴',
            };
          } else if (type === 'CAUTION') {
            calloutTheme = {
              border: 'border-l-orange-500 border-orange-200',
              bg: 'bg-orange-50/80 text-orange-950',
              badgeBg: 'bg-orange-100 text-orange-800 border-orange-200',
              title: 'CHÚ Ý AN TOÀN KÊ ĐƠN (CAUTION)',
              icon: '🚨',
            };
          } else if (type === 'TIP') {
            calloutTheme = {
              border: 'border-l-emerald-500 border-emerald-200',
              bg: 'bg-emerald-50/80 text-emerald-950',
              badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
              title: 'HẠT NGỌC KINH NGHIỆM (CLINICAL PEARL)',
              icon: '💎',
            };
          }

          blocks.push(
            <div
              key={`callout-${blocks.length}`}
              className={`my-3.5 p-3.5 rounded-xl border-l-4 ${calloutTheme.border} ${calloutTheme.bg} border shadow-2xs space-y-1.5`}
            >
              <div className="flex items-center gap-1.5 font-bold text-[11px]">
                <span>{calloutTheme.icon}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono-custom tracking-wider ${calloutTheme.badgeBg} border`}>
                  {calloutTheme.title}
                </span>
              </div>
              <div className="text-xs leading-relaxed pl-1">
                {renderInlineMarkdown(calloutBody)}
              </div>
            </div>
          );
          continue;
        }

        // 2. Bối cảnh ca bệnh / Blockquote thường
        const isContext = rawQuote.includes('Bối cảnh') || rawQuote.includes('BỆNH CẢNH');
        blocks.push(
          <div
            key={`quote-${blocks.length}`}
            className={`my-3.5 p-3.5 rounded-xl border-l-4 ${
              isContext
                ? 'bg-blue-50/80 border-l-blue-600 border border-blue-200/80 text-blue-950'
                : 'bg-slate-50 border-l-slate-400 border border-slate-200/80 text-slate-800'
            } text-xs leading-relaxed shadow-2xs`}
          >
            {renderInlineMarkdown(rawQuote)}
          </div>
        );
        continue;
      }

      // Bullet Point: - item hoặc * item
      const bulletMatch = trimmed.match(/^[-*•]\s+(.*)$/);
      if (bulletMatch) {
        const content = bulletMatch[1];
        const isNested = line.startsWith('  ') || line.startsWith('\t');
        blocks.push(
          <div
            key={`li-${blocks.length}`}
            className={`flex items-start gap-2 py-1 text-xs leading-relaxed ${
              isNested ? 'pl-5 border-l border-slate-200/80 my-0.5' : ''
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                isNested ? 'bg-slate-300' : 'bg-slate-600'
              }`}
            />
            <div className="flex-1 text-slate-800">{renderInlineMarkdown(content)}</div>
          </div>
        );
        continue;
      }

      // Numbered List: 1. item
      const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
      if (numMatch) {
        const num = numMatch[1];
        const content = numMatch[2];
        blocks.push(
          <div key={`num-${blocks.length}`} className="flex items-start gap-2 py-1 text-xs leading-relaxed">
            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-200">
              {num}
            </span>
            <div className="flex-1 text-slate-800">{renderInlineMarkdown(content)}</div>
          </div>
        );
        continue;
      }

      // Horizontal Rule: ---
      if (trimmed === '---') {
        blocks.push(<hr key={`hr-${blocks.length}`} className="my-5 border-slate-200" />);
        continue;
      }

      // Paragraph
      blocks.push(
        <p key={`p-${blocks.length}`} className="text-xs text-slate-800 leading-relaxed my-1">
          {renderInlineMarkdown(trimmed)}
        </p>
      );
    }

    if (tableBuffer.length > 0) {
      flushTable();
    }

    return blocks;
  }, [markdownText, currentCase]);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Action Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">
                Giao Diện Đọc Ca Bệnh Markdown (.md)
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Editorial Grade
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono-custom">
              {currentCase.id}.md · {markdownText.length} ký tự
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Format Toggle */}
          <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs">
            <button
              type="button"
              onClick={() => setViewFormat('formatted')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewFormat === 'formatted'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>📖 Trình bày Xuất bản</span>
            </button>
            <button
              type="button"
              onClick={() => setViewFormat('raw')}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewFormat === 'raw'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>💻 Mã nguồn Markdown</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải .md</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In bài viết</span>
          </button>
        </div>
      </div>

      {/* 2. Reader Body Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {viewFormat === 'raw' ? (
          <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto">
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
              {markdownText}
            </pre>
          </div>
        ) : (
          <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-2 text-slate-800 text-xs leading-relaxed font-sans">
            {/* Quick Navigation Jump Bar */}
            <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 mb-6 no-print">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5 font-mono-custom">
                  <span>🧭</span>
                  <span>MỤC LỤC ĐIỀU HƯỚNG NHANH (QUICK JUMP)</span>
                </span>
                <span className="text-[10.5px] text-slate-400">Nhấp để cuộn tới</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => document.getElementById('soap-sec-s')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 hover:text-sky-800 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>1. S (Chủ quan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('soap-sec-o')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 hover:border-slate-400 hover:bg-slate-100/50 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>2. O (Khách quan)</span>
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('soap-sec-a')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-700 hover:text-amber-800 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>3. A (Đánh giá)</span>
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('soap-sec-p')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-slate-700 hover:text-teal-800 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  <span>4. P (Kế hoạch)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('soap-sec-problems');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else document.getElementById('soap-sec-a')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-50/70 border border-amber-200 hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span>⭐</span>
                  <span>Bảng 3 Tầng</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('soap-sec-rx');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else document.getElementById('soap-sec-p')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50/70 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span>💊</span>
                  <span>Y lệnh thuốc</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('soap-sec-roadmap');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else document.getElementById('soap-sec-p')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-50/70 border border-teal-200 hover:bg-teal-100 text-teal-900 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                >
                  <span>📅</span>
                  <span>Lộ trình điều trị</span>
                </button>
              </div>
            </div>

            {parsedBlocks}
          </div>
        )}
      </div>
    </div>
  );
};
