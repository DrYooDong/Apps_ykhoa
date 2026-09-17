import React from 'react';
import {
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SoapCaseReference } from '../../lib/crossReferenceEngine.ts';

interface SoapCasesSectionProps {
  diseaseName: string;
  similarSoapCases: SoapCaseReference[];
  onNavigateToSoapCase?: (caseId: string) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onOpenPromptBuilder?: (diseaseName?: string) => void;
}

export const SoapCasesSection: React.FC<SoapCasesSectionProps> = ({
  diseaseName,
  similarSoapCases,
  onNavigateToSoapCase,
  onOpenVaultDrawer,
  onOpenPromptBuilder,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3 mb-1">
        <div>
          <p className="text-[11px] text-slate-500">
            Tham khảo ca bệnh điển hình, bẫy chẩn đoán và đơn thuốc thực tế liên quan đến {diseaseName}
          </p>
        </div>

        {onOpenPromptBuilder && (
          <button
            type="button"
            onClick={() => onOpenPromptBuilder(diseaseName)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium text-xs rounded-md transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo prompt NotebookLM cho bệnh này</span>
          </button>
        )}
      </div>

      {similarSoapCases.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {similarSoapCases.map((sc) => (
            <div
              key={sc.id}
              className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-300 transition-colors gap-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {sc.specialty}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    ICD-10: {sc.a.icd10}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900 leading-snug">
                  {sc.title}
                </h5>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                  <b>Bối cảnh:</b> {sc.demographicContext}
                </p>
                <div className="mt-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200/80 space-y-1">
                  <div className="text-slate-700 line-clamp-1">
                    <b>S (Lý do):</b> {sc.s.chiefComplaint}
                  </div>
                  <div className="text-slate-700 line-clamp-1">
                    <b>P (Xử trí):</b> {sc.p.immediateActions}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-[10.5px] text-slate-500 italic">
                  Đúc kết: {sc.authorDoctor || 'Hội đồng Khoa học'}
                </span>
                {onNavigateToSoapCase ? (
                  <button
                    type="button"
                    onClick={() => onNavigateToSoapCase(sc.id)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Xem ca bệnh</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(sc.title, sc.title, 'BA')}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Xem trong Drawer</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 space-y-2">
          <p className="text-xs text-slate-500">
            Chưa có ca bệnh thực chiến riêng cho <b>{diseaseName}</b> trong Kho Bệnh án (BA).
          </p>
          {onOpenPromptBuilder && (
            <button
              type="button"
              onClick={() => onOpenPromptBuilder(diseaseName)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dùng Prompt Builder để tạo ca mới từ NotebookLM</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
