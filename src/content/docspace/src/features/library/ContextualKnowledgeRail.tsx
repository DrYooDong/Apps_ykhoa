import React, { useMemo, useState } from 'react';
import { BookOpen, ExternalLink, Search, Stethoscope, X, Zap } from 'lucide-react';
import { getGuidelinesForDisease } from '../../lib/guidelineBridge.ts';
import { getSimilarSoapCases } from '../../lib/crossReferenceEngine.ts';
import {
  CDSS_STANDALONE_BASE_URL,
  getKnowledgeVaultWebUrl,
  searchVaultArticles,
} from '../../lib/vaultBridge.ts';
import { SoapClinicalExperience } from '../../types.ts';
import { ClinicalCaseSession } from '../../schemas/docspaceV2.ts';

interface ContextualKnowledgeRailProps {
  isOpen: boolean;
  onClose: () => void;
  session: ClinicalCaseSession;
  activeDiseaseName: string;
  onLoadSoapToWorkbench: (soap: SoapClinicalExperience) => void;
}

export const ContextualKnowledgeRail: React.FC<ContextualKnowledgeRailProps> = ({
  isOpen,
  onClose,
  session,
  activeDiseaseName,
  onLoadSoapToWorkbench,
}) => {
  const [query, setQuery] = useState('');

  const effectiveTerm = query.trim() || activeDiseaseName || session.form.lyDo || '';

  const guidelines = useMemo(() => {
    if (!effectiveTerm) return [];
    return getGuidelinesForDisease({
      id: 'ctx_query',
      ten: effectiveTerm,
      icd: '',
      nhom: session.sourceSoapSpecialty || '',
      baoDong: false,
      ghiChuBaoDong: '',
      tomTat: '',
      danSo: { gioiTinh: 'any' },
      dd: [],
      phacDo: { tuyen: [], thuoc: [], theoDoi: [], luuY: [], nguon: [] },
    }).slice(0, 6);
  }, [effectiveTerm, session.sourceSoapSpecialty]);

  const similarSoaps = useMemo(() => {
    if (!effectiveTerm) return [];
    return getSimilarSoapCases(
      { diseaseName: effectiveTerm, specialty: session.sourceSoapSpecialty },
      session.sourceSoapId
    ).slice(0, 5);
  }, [effectiveTerm, session.sourceSoapSpecialty, session.sourceSoapId]);

  const vaultHits = useMemo(() => {
    return searchVaultArticles(effectiveTerm, 'ALL', 'ALL', 12).results;
  }, [effectiveTerm]);

  if (!isOpen) return null;

  // Truyền ngữ cảnh sinh hiệu / tuổi / cân nặng sang CDSS Standalone qua URL params
  const cdssParams = new URLSearchParams();
  if (session.form.tuoi) cdssParams.set('age', session.form.tuoi);
  if (session.form.canNang) cdssParams.set('weight', session.form.canNang);
  if (session.vitals.vHATT) cdssParams.set('sbp', session.vitals.vHATT);
  if (session.vitals.vMach) cdssParams.set('hr', session.vitals.vMach);
  const cdssUrl = `${CDSS_STANDALONE_BASE_URL}${cdssParams.toString() ? `&${cdssParams.toString()}` : ''}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-[1px] no-print">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Rail Header */}
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#087f9c]" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Tra cứu Tri thức Theo Ngữ cảnh
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            aria-label="Đóng thanh tra cứu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & CDSS Quick Link */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Đang lọc theo: "${effectiveTerm || 'tất cả'}"`}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <a
            href={cdssUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[#087f9c] dark:text-cyan-300 text-xs font-bold no-underline hover:bg-cyan-100"
          >
            <Zap className="w-3.5 h-3.5" />
            Mở CDSS Standalone (Đồng bộ tuổi/cân nặng/sinh hiệu)
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs">
          {/* Guidelines */}
          {guidelines.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-300">
                Guidelines &amp; Nghiên cứu EBM ({guidelines.length})
              </div>
              {guidelines.map((g) => (
                <div
                  key={g.study.id}
                  className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900 space-y-0.5"
                >
                  <div className="font-bold text-slate-900 dark:text-slate-100">{g.study.title}</div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300">
                    {g.study.organization} · {g.study.year}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Similar SOAP Cases */}
          {similarSoaps.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase text-indigo-700 dark:text-indigo-300">
                Ca SOAP Thực chiến tương đồng ({similarSoaps.length})
              </div>
              {similarSoaps.map((soap) => (
                <div
                  key={soap.id}
                  className="p-2.5 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-slate-100 truncate">{soap.title}</div>
                    <div className="text-[11px] text-slate-500">{soap.specialty}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onLoadSoapToWorkbench(soap);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-600 text-white font-semibold text-[11px] shrink-0 cursor-pointer"
                  >
                    <Stethoscope className="w-3 h-3" /> Nạp
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Knowledge Vault Hits */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase text-[#087f9c]">
              Bài viết Knowledge Vault ({vaultHits.length})
            </div>
            {vaultHits.map((art) => (
              <a
                key={art.id}
                href={getKnowledgeVaultWebUrl(art.id, art.title, art.khoCode)}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-[#087f9c] no-underline"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-100">{art.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{art.khoName || art.khoCode}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
