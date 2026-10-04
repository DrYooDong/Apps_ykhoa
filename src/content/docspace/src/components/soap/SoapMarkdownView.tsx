import React, { useState, useMemo } from 'react';
import {
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode,
  FileText,
  Sparkles,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { generateSoapMarkdown } from '../../lib/clientSideIngest.ts';

interface SoapMarkdownViewProps {
  currentCase: SoapClinicalExperience;
}

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

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Action Toolbar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">
              Toàn Văn Bệnh Án Markdown (.md)
            </h4>
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
              <span>Xem bài viết</span>
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
              <span>Mã nguồn thô</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
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
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file .md</span>
          </button>
        </div>
      </div>

      {/* 2. Content Display Container */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {viewFormat === 'raw' ? (
          <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto">
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
              {markdownText}
            </pre>
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-4 max-w-4xl mx-auto text-slate-800 text-xs leading-relaxed">
            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-amber-900 text-xs flex items-center justify-between">
              <span>📌 Bạn có thể sao chép văn bản này hoặc lưu trữ vào Knowledge Vault để tái sử dụng.</span>
              <span className="font-mono-custom text-[11px] text-amber-800">{currentCase.id}</span>
            </div>

            <div className="whitespace-pre-line font-sans text-xs leading-relaxed space-y-2">
              {markdownText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
