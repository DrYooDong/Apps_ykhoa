import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  ClipboardCheck,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  Stethoscope,
} from 'lucide-react';
import { buildDiagnosticCards } from '../../lib/diagnosticCriteriaService.ts';
import { normalizeText } from '../../lib/normalizeUtils.ts';
import { getKnowledgeVaultWebUrl, KHO_DEFINITIONS, searchVaultArticles } from '../../lib/vaultBridge.ts';
import { KnowledgeBase, SoapClinicalExperience } from '../../types.ts';
import {
  DocSpaceMode,
  getSoapEducationalLevel,
  TeachingModeState,
} from '../../schemas/docspaceV2.ts';

interface UnifiedCaseLibraryProps {
  kb: KnowledgeBase;
  soapCases: SoapClinicalExperience[];
  mode: DocSpaceMode;
  teachingState: TeachingModeState;
  onToggleTeachingMask: (col: keyof TeachingModeState['maskedColumns']) => void;
  onPracticeOnWorkbench: (soap: SoapClinicalExperience, progressive: boolean) => void;
  onStartOsceFromSoap: (soap: SoapClinicalExperience) => void;
}

const LEVEL_BADGE: Record<'Y4' | 'Y6' | 'NoiTru', { label: string; cls: string }> = {
  Y4: { label: 'Y4 Cơ bản', cls: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200' },
  Y6: { label: 'Y6 Tổng hợp', cls: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950 dark:text-sky-200' },
  NoiTru: { label: 'Nội trú', cls: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-200' },
};

export const UnifiedCaseLibrary: React.FC<UnifiedCaseLibraryProps> = ({
  kb,
  soapCases,
  mode,
  teachingState,
  onToggleTeachingMask,
  onPracticeOnWorkbench,
  onStartOsceFromSoap,
}) => {
  const [subTab, setSubTab] = useState<'soap' | 'criteria' | 'vault'>('soap');
  const [search, setSearch] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('ALL');
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'Y4' | 'Y6' | 'NoiTru'>('ALL');
  const [vaultKho, setVaultKho] = useState('ALL');
  const [selectedSoapId, setSelectedSoapId] = useState<string>(soapCases[0]?.id || '');

  const specialties = useMemo(() => {
    const set = new Set<string>();
    soapCases.forEach((c) => c.specialty && set.add(c.specialty));
    return Array.from(set).sort();
  }, [soapCases]);

  const filteredSoaps = useMemo(() => {
    const q = normalizeText(search);
    return soapCases.filter((c) => {
      if (specialtyFilter !== 'ALL' && c.specialty !== specialtyFilter) return false;
      if (levelFilter !== 'ALL' && getSoapEducationalLevel(c) !== levelFilter) return false;
      if (!q) return true;
      return (
        normalizeText(c.title).includes(q) ||
        normalizeText(c.specialty).includes(q) ||
        normalizeText(c.a.primaryDiagnosis).includes(q) ||
        c.tags.some((t) => normalizeText(t).includes(q))
      );
    });
  }, [soapCases, search, specialtyFilter, levelFilter]);

  const activeSoap =
    filteredSoaps.find((c) => c.id === selectedSoapId) || filteredSoaps[0] || null;

  const diagnosticCards = useMemo(() => {
    const q = normalizeText(search);
    return buildDiagnosticCards(kb)
      .filter((c) => !q || normalizeText(c.ten).includes(q) || normalizeText(c.icd).includes(q))
      .slice(0, 40);
  }, [kb, search]);

  const vaultResults = useMemo(() => {
    return searchVaultArticles(search, vaultKho, 'ALL', 48).results;
  }, [search, vaultKho]);

  const fontSizeClass =
    mode === 'teaching'
      ? teachingState.projectorFontScale === 'xlarge'
        ? 'text-base leading-relaxed'
        : teachingState.projectorFontScale === 'large'
        ? 'text-sm leading-relaxed'
        : 'text-xs leading-relaxed'
      : 'text-xs leading-relaxed';

  const isMasked = (col: 's' | 'o' | 'a' | 'p') =>
    mode === 'teaching' && teachingState.maskedColumns[col];

  return (
    <div className="space-y-3">
      {/* Header Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setSubTab('soap')}
              className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${
                subTab === 'soap'
                  ? 'bg-white dark:bg-slate-900 text-[#087f9c] shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Ca SOAP ({soapCases.length})
            </button>
            <button
              type="button"
              onClick={() => setSubTab('criteria')}
              className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${
                subTab === 'criteria'
                  ? 'bg-white dark:bg-slate-900 text-[#087f9c] shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Tiêu chuẩn CĐ
            </button>
            <button
              type="button"
              onClick={() => setSubTab('vault')}
              className={`px-3 py-1.5 rounded-md font-bold cursor-pointer ${
                subTab === 'vault'
                  ? 'bg-white dark:bg-slate-900 text-[#087f9c] shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Vault EBM (2.400+)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 flex-1 justify-end min-w-[220px]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm bệnh, ICD-10, hội chứng, từ khóa..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            {subTab === 'soap' && (
              <>
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
                >
                  <option value="ALL">Mọi chuyên khoa</option>
                  {specialties.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as 'ALL' | 'Y4' | 'Y6' | 'NoiTru')}
                  className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
                >
                  <option value="ALL">Mọi trình độ</option>
                  <option value="Y4">Y4 Cơ bản</option>
                  <option value="Y6">Y6 Tổng hợp</option>
                  <option value="NoiTru">Nội trú</option>
                </select>
              </>
            )}

            {subTab === 'vault' && (
              <select
                value={vaultKho}
                onChange={(e) => setVaultKho(e.target.value)}
                className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
              >
                <option value="ALL">Tất cả 18 Kho</option>
                {Object.entries(KHO_DEFINITIONS).map(([code, def]) => (
                  <option key={code} value={code}>
                    {def.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* TAB 1: SOAP CASES SPLIT VIEW */}
      {subTab === 'soap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Case List */}
          <div className="lg:col-span-4 space-y-2 max-h-[72vh] overflow-y-auto pr-1">
            {filteredSoaps.map((soap) => {
              const lvl = LEVEL_BADGE[getSoapEducationalLevel(soap)];
              const active = activeSoap?.id === soap.id;
              return (
                <button
                  key={soap.id}
                  type="button"
                  onClick={() => setSelectedSoapId(soap.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                    active
                      ? 'bg-cyan-50/70 dark:bg-cyan-950/40 border-[#087f9c] shadow-2xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#087f9c] dark:text-cyan-300 truncate">
                      {soap.specialty}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-bold shrink-0 ${lvl.cls}`}>
                      {lvl.label}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 line-clamp-2">
                    {soap.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {soap.demographicContext}
                  </div>
                </button>
              );
            })}
          </div>

          {/* SOAP Detail & 1-Click Study Actions */}
          <div className="lg:col-span-8">
            {activeSoap ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-[#087f9c] dark:text-cyan-300 font-bold">
                        {activeSoap.specialty}
                      </span>
                      {activeSoap.a.icd10 && !isMasked('a') && (
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono-custom text-slate-700 dark:text-slate-300">
                          {activeSoap.a.icd10}
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                      {activeSoap.title}
                    </h2>
                    <p className="text-xs text-slate-500">{activeSoap.demographicContext}</p>
                  </div>

                  {/* 1-Click Learning Triggers */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onPracticeOnWorkbench(activeSoap, true)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white text-xs font-bold cursor-pointer active:scale-[0.98]"
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      Luyện giải trên Workbench
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartOsceFromSoap(activeSoap)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold cursor-pointer active:scale-[0.98]"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Thi OSCE ca này
                    </button>
                  </div>
                </div>

                {/* 4 SOAP Sections with Teaching Reveal Masks */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${fontSizeClass}`}>
                  {(
                    [
                      {
                        key: 's' as const,
                        title: 'S — Cơ năng & Bệnh sử',
                        accent: 'border-cyan-200 dark:border-cyan-900',
                        body: `${activeSoap.s.chiefComplaint}\n\n${activeSoap.s.historyOfPresentIllness}\n\nTiền căn: ${activeSoap.s.pastMedicalHistory}`,
                        pearl: activeSoap.s.historyPearls,
                      },
                      {
                        key: 'o' as const,
                        title: 'O — Khám thực thể & Cận lâm sàng',
                        accent: 'border-sky-200 dark:border-sky-900',
                        body: `Khám: ${activeSoap.o.physicalExam}\n\nCLS: ${activeSoap.o.labsAndImaging}`,
                        pearl: activeSoap.o.objectivePitfalls,
                      },
                      {
                        key: 'a' as const,
                        title: 'A — Biện luận & Chẩn đoán',
                        accent: 'border-amber-200 dark:border-amber-900',
                        body: `CĐ chính: ${activeSoap.a.primaryDiagnosis}\nCĐPB: ${activeSoap.a.differentials.join(', ')}\n\n${activeSoap.a.clinicalReasoning || ''}`,
                        pearl: activeSoap.a.diagnosticPearls,
                      },
                      {
                        key: 'p' as const,
                        title: 'P — Kế hoạch Xử trí & Theo dõi',
                        accent: 'border-emerald-200 dark:border-emerald-900',
                        body: `${activeSoap.p.immediateActions}\n\nTheo dõi: ${activeSoap.p.monitoringAndTargets}`,
                        pearl: activeSoap.p.takeawayLessons,
                      },
                    ]
                  ).map((sec) => {
                    const masked = isMasked(sec.key);
                    return (
                      <div
                        key={sec.key}
                        className={`rounded-xl border p-3 bg-slate-50/70 dark:bg-slate-800/40 space-y-2 ${sec.accent}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100">{sec.title}</h4>
                          {mode === 'teaching' && (
                            <button
                              type="button"
                              onClick={() => onToggleTeachingMask(sec.key)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-[11px] font-bold cursor-pointer"
                            >
                              {masked ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {masked ? 'Mở' : 'Che'}
                            </button>
                          )}
                        </div>
                        {masked ? (
                          <div className="py-8 text-center rounded-lg border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 font-semibold">
                            Đang che cho thảo luận lớp — bấm <strong>Mở</strong> để công bố đáp án
                          </div>
                        ) : (
                          <>
                            <p className="text-slate-700 dark:text-slate-200 whitespace-pre-line max-h-56 overflow-y-auto">
                              {sec.body}
                            </p>
                            {sec.pearl && (
                              <div className="p-2 rounded-lg bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900 text-amber-950 dark:text-amber-200 text-[11px]">
                                <strong>💡 Pearl:</strong> {sec.pearl}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                Không tìm thấy ca SOAP phù hợp bộ lọc.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DIAGNOSTIC CRITERIA */}
      {subTab === 'criteria' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {diagnosticCards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-2 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-[#087f9c]" />
                  {card.ten}
                </h4>
                <span className="font-mono-custom px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {card.icd}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 line-clamp-2">{card.tomTat}</p>
              <div className="flex flex-wrap gap-1">
                {card.tieuChuan.slice(0, 5).map((tc, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px]"
                  >
                    {tc.ten}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: VAULT EBM EXPLORER */}
      {subTab === 'vault' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {vaultResults.map((art) => (
            <a
              key={art.id}
              href={getKnowledgeVaultWebUrl(art.id, art.title, art.khoCode)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#087f9c] rounded-xl p-3 shadow-2xs flex flex-col justify-between gap-2 no-underline transition-all"
            >
              <div className="space-y-1">
                <span className="inline-block px-2 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-[#087f9c] dark:text-cyan-300 text-[10px] font-bold">
                  {art.khoName || art.khoCode}
                </span>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-2">
                  {art.title}
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Knowledge Vault
                </span>
                <ExternalLink className="w-3 h-3 text-[#087f9c]" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
