import React, { useMemo } from 'react';
import { 
  BookMarked, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Award,
  Globe,
  CheckCircle
} from 'lucide-react';
import { Language } from '../types';
import { ExtractedDrugData } from '../utils/drugDataExtractor';

interface ReferencesListProps {
  drugDetails: ExtractedDrugData;
  language: Language;
}

interface ParsedReference {
  index: number;
  title: string;
  url?: string;
  tag?: string;
}

function parseReferencesHtml(html: string): ParsedReference[] {
  if (!html) return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const items = doc.querySelectorAll('.src-item');
    
    if (items.length > 0) {
      return Array.from(items).map((itemEl, idx) => {
        const linkEl = itemEl.querySelector('a');
        const chipEl = itemEl.querySelector('.chip');
        const tag = chipEl ? chipEl.textContent?.trim() : undefined;

        let title = '';
        let url: string | undefined = undefined;

        if (linkEl) {
          title = linkEl.textContent?.trim() || '';
          url = linkEl.getAttribute('href') || undefined;
        } else {
          const clone = itemEl.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('.chip, span:first-child').forEach((n) => n.remove());
          title = clone.textContent?.trim() || '';
        }

        return {
          index: idx + 1,
          title: title || `Tài liệu tham khảo ${idx + 1}`,
          url,
          tag
        };
      });
    }
  } catch (e) {
    console.error('Error parsing references html', e);
  }
  return [];
}

const DEFAULT_EVIDENCE_SOURCES: ParsedReference[] = [
  {
    index: 1,
    title: 'Stanford Health Care: Antimicrobial Dosing Reference Guide (Adult Inpatient)',
    url: 'https://med.stanford.edu/content/dam/sm/bugsanddrugs/documents/antimicrobial-dosing-protocols/SHC-ABX-Dosing-Guide.pdf',
    tag: 'Stanford'
  },
  {
    index: 2,
    title: 'UCSF Medical Center: Adult Antimicrobial Dosing Guidelines & IDMP Renal Protocols',
    url: 'https://idmp.ucsf.edu/adult-antimicrobial-dosing-non-dialysis',
    tag: 'UCSF IDMP'
  },
  {
    index: 3,
    title: 'The Sanford Guide to Antimicrobial Therapy: Renal Impairment & Dialysis Adjustments',
    url: 'https://www.sanfordguide.com/',
    tag: 'Sanford Guide'
  },
  {
    index: 4,
    title: 'Bộ Y Tế Việt Nam: Hướng dẫn sử dụng kháng sinh (Quyết định số 7014/QĐ-BYT)',
    url: 'https://kcb.vn/',
    tag: 'Bộ Y Tế'
  }
];

export const ReferencesList: React.FC<ReferencesListProps> = ({
  drugDetails,
  language
}) => {
  const isEn = language === 'en';

  const references: ParsedReference[] = useMemo(() => {
    const parsed = parseReferencesHtml(drugDetails.srcHtml);
    if (parsed.length > 0) return parsed;
    return DEFAULT_EVIDENCE_SOURCES;
  }, [drugDetails.srcHtml]);

  const getTagStyle = (tag?: string) => {
    if (!tag) return 'bg-slate-100 text-slate-700 border-slate-200';
    const lower = tag.toLowerCase();
    if (lower.includes('stanford')) return 'bg-sky-50 text-sky-800 border-sky-200';
    if (lower.includes('guideline')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (lower.includes('nhãn') || lower.includes('label')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (lower.includes('y văn') || lower.includes('study')) return 'bg-purple-50 text-purple-800 border-purple-200';
    if (lower.includes('bộ y tế')) return 'bg-rose-50 text-rose-800 border-rose-200';
    return 'bg-indigo-50 text-indigo-800 border-indigo-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <BookMarked className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isEn ? 'Evidence Base & Clinical References' : 'Tài Liệu Tham Khảo & Nguồn Dữ Liệu Lâm Sàng'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {isEn
                ? 'Peer-reviewed references, hospital guidelines, and prescribing information'
                : 'Hướng dẫn điều trị của các trung tâm y khoa hàng đầu và Dược thư chính thức'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 self-start sm:self-auto text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/70 font-semibold">
          <Award className="w-3.5 h-3.5 text-blue-600" />
          <span>{references.length} {isEn ? 'Verified Sources' : 'Nguồn đối chiếu'}</span>
        </div>
      </div>

      {/* References Grid / Cards */}
      <div className="space-y-2.5">
        {references.map((ref) => (
          <div
            key={ref.index}
            className="p-3 sm:p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/70 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-start space-x-3 min-w-0">
              <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                {ref.index < 10 ? `0${ref.index}` : ref.index}
              </span>
              
              <div className="min-w-0">
                <div className="flex items-center flex-wrap gap-1.5 mb-1">
                  {ref.tag && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTagStyle(ref.tag)}`}>
                      {ref.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-900 leading-snug">
                  {ref.title}
                </p>
              </div>
            </div>

            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 self-end sm:self-center"
              >
                <span>{isEn ? 'View Source' : 'Tài liệu gốc'}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Clinical Verification Seal Banner */}
      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-2.5 text-xs text-slate-600">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider mb-0.5">
            {isEn ? 'Clinical Governance & Continuous Cross-Verification' : 'Tiêu Chuẩn Thẩm Định & Đối Chiếu Lâm Sàng'}
          </span>
          <p className="text-[11px]">
            {isEn
              ? 'Dosing algorithms are prioritized based on international society guidelines (IDSA, KDIGO) and major academic medical centers (Stanford, UCSF), cross-validated with official prescribing information.'
              : 'Dữ liệu được cập nhật và đối chiếu chéo liên tục giữa các phác đồ quốc tế (Stanford Health Care, UCSF IDMP, Sanford Guide 2024) và Hướng dẫn sử dụng kháng sinh của Bộ Y Tế Việt Nam.'}
          </p>
        </div>
      </div>

    </div>
  );
};
