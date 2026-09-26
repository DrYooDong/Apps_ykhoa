import React, { useState } from 'react';
import {
  AlertOctagon,
  BookOpen,
  Check,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  FileText,
  GraduationCap,
  HeartPulse,
  Pill,
  Plus,
  Search,
  Users,
  Zap,
} from 'lucide-react';
import {
  getKnowledgeVaultWebUrl,
  PathwayArticles,
} from '../../lib/vaultBridge.ts';
import {
  getGuidelineWebUrl,
  getGuidelinesHubUrl,
  getGuidelinesDbUrl,
} from '../../lib/guidelineBridge.ts';

interface HealthcareWorkerKnowledgeSectionProps {
  diseaseName: string;
  diseaseIcd: string;
  pathway: PathwayArticles;
  matchedGuidelines: Array<{ study: any; matchReason: string }>;
  onApplyGuidelineDrugs?: (study: any) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  targetTab?: '5a' | '5b' | '5c';
}

export const HealthcareWorkerKnowledgeSection: React.FC<HealthcareWorkerKnowledgeSectionProps> = ({
  diseaseName,
  diseaseIcd,
  pathway,
  matchedGuidelines,
  onApplyGuidelineDrugs,
  onOpenVaultDrawer,
  targetTab,
}) => {
  const [activeTab, setActiveTab] = useState<'5a' | '5b' | '5c'>('5a');
  const [appliedStudies, setAppliedStudies] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    if (targetTab) {
      setActiveTab(targetTab);
    }
  }, [targetTab]);

  const handleApply = (study: any) => {
    onApplyGuidelineDrugs?.(study);
    setAppliedStudies((prev) => new Set(prev).add(study.id));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
      {/* Tab switcher: 5a, 5b, 5c */}
      <div id="knowledge-tab-switcher" className="scroll-mt-24 p-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-600 font-medium">
          Hệ thống hóa toàn diện: <b>5a. Cơ sở</b> &bull; <b>5b. Lâm sàng</b> &bull; <b>5c. Hướng dẫn thực hành EBM Guidelines</b>
        </p>

        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            id="sub-basic"
            onClick={() => setActiveTab('5a')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 scroll-mt-24 ${
              activeTab === '5a'
                ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>5a. Cơ sở (GPSL / SLB)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('5b')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === '5b'
                ? 'bg-white text-blue-700 shadow-2xs border border-blue-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>5b. Lâm sàng (DTH/CD/BC/Dược)</span>
          </button>

          <button
            type="button"
            id="sub-guidelines"
            onClick={() => setActiveTab('5c')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 scroll-mt-24 ${
              activeTab === '5c'
                ? 'bg-white text-purple-700 shadow-2xs border border-purple-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>5c. Guidelines - EBM</span>
            {matchedGuidelines.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200">
                {matchedGuidelines.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5">
        {/* 5a. Cơ sở: Giải phẫu - Sinh lý - Sinh lý bệnh */}
        {activeTab === '5a' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 p-3 bg-indigo-50/60 border border-indigo-200 rounded-lg text-xs text-indigo-950">
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4 text-indigo-700 shrink-0" />
                <span>Nền tảng Y học cơ sở đối ứng trực tiếp với bệnh lý từ Knowledge Vault</span>
              </span>
              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'GPSL')}
                className="flex items-center gap-1 text-[11px] font-semibold text-indigo-700 hover:underline cursor-pointer"
              >
                <Search className="w-3 h-3" />
                <span>Mở Vault Drawer</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Giải phẫu & Sinh lý học */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-3">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-sky-600 mb-1 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-sky-600" />
                    <span>1. Giải phẫu &amp; Sinh lý học (Kho GPSL)</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 mb-1.5">
                    {pathway.gpsl?.title || `Cơ sở Giải phẫu - Sinh lý liên quan ${diseaseName}`}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pathway.gpsl?.snippet ||
                      'Khảo sát vị trí giải phẫu, tưới máu mô tạng đích, chức năng hàng rào nội mô và các chu trình điều hòa sinh lý bình thường.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {pathway.gpsl ? (
                    <a
                      href={getKnowledgeVaultWebUrl(pathway.gpsl.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Đọc toàn văn bài viết</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(diseaseName, 'GPSL')}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Tra cứu Kho Giải phẫu Sinh lý</span>
                    </button>
                  )}
                  <span className="text-[10.5px] font-mono text-slate-400">Vault 1.1</span>
                </div>
              </div>

              {/* Sinh lý bệnh & Cơ chế phân tử */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-3">
                <div>
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>2. Sinh lý bệnh &amp; Cơ chế bệnh sinh (Kho SLB)</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 mb-1.5">
                    {pathway.slb?.title || `Cơ chế bệnh sinh & Rối loạn vi tuần hoàn trong ${diseaseName}`}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pathway.slb?.snippet ||
                      'Cơ chế phản ứng viêm toàn thân, bão Cytokine, tăng tính thấm thành mạch, rối loạn đông máu nội mạch và suy sụp tưới máu vi tuần hoàn.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  {pathway.slb ? (
                    <a
                      href={getKnowledgeVaultWebUrl(pathway.slb.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Đọc toàn văn bài viết</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(diseaseName, 'SLB')}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Tra cứu Kho Sinh lý bệnh</span>
                    </button>
                  )}
                  <span className="text-[10.5px] font-mono text-slate-400">Vault 1.3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5b. Lâm sàng: Dịch tễ học - Chẩn đoán - Biến chứng - Dược lý */}
        {activeTab === '5b' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Dịch tễ học */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dịch tễ học (DTH)</span>
                </div>
                <h5 className="font-bold text-xs text-slate-900 mb-1 line-clamp-2">
                  {pathway.dth?.title || `Đặc điểm dịch tễ & Yếu tố lây truyền ${diseaseName}`}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-3">
                  {pathway.dth?.snippet || 'Lưu hành địa phương, mùa dịch cao điểm, véc-tơ truyền bệnh và cơ địa nguy cơ cao.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {pathway.dth ? (
                  <a
                    href={getKnowledgeVaultWebUrl(pathway.dth.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Xem bài viết</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(diseaseName, 'DTH')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Kho DTH</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-slate-400">Vault 1.4</span>
              </div>
            </div>

            {/* Tiêu chuẩn Chẩn đoán */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-pink-600 mb-1 flex items-center gap-1">
                  <ClipboardCheck className="w-3.5 h-3.5 text-pink-600" />
                  <span>Chẩn đoán (CD)</span>
                </div>
                <h5 className="font-bold text-xs text-slate-900 mb-1 line-clamp-2">
                  {pathway.cd?.title || `Tiêu chuẩn xác định & Tiêu chuẩn vàng ${diseaseName}`}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-3">
                  {pathway.cd?.snippet || 'Bộ tiêu chuẩn chẩn đoán quốc tế, độ nhạy & độ đặc hiệu của các test huyết thanh/sinh học phân tử.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {pathway.cd ? (
                  <a
                    href={getKnowledgeVaultWebUrl(pathway.cd.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Xem bài viết</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(diseaseName, 'CD')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Kho CĐ</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-slate-400">Vault 2.3</span>
              </div>
            </div>

            {/* Biến chứng */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                  <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                  <span>Biến chứng (BC)</span>
                </div>
                <h5 className="font-bold text-xs text-slate-900 mb-1 line-clamp-2">
                  {pathway.bc?.title || `Sàng lọc & Xử trí biến chứng ${diseaseName}`}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-3">
                  {pathway.bc?.snippet || 'Biến chứng suy tạng, toan chuyển hóa, xuất huyết nặng và phác đồ can thiệp cấp cứu.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {pathway.bc ? (
                  <a
                    href={getKnowledgeVaultWebUrl(pathway.bc.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Xem bài viết</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(diseaseName, 'BC')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Kho BC</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-slate-400">Vault 2.4</span>
              </div>
            </div>

            {/* Dược lý học */}
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
              <div>
                <div className="text-[10.5px] font-bold uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1">
                  <Pill className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Dược lý học (DUOC)</span>
                </div>
                <h5 className="font-bold text-xs text-slate-900 mb-1 line-clamp-2">
                  {pathway.duoc?.title || `Dược động học & Tương tác thuốc ${diseaseName}`}
                </h5>
                <p className="text-[11px] text-slate-500 line-clamp-3">
                  {pathway.duoc?.snippet || 'Cơ chế tác động dược lý, đường chuyển hóa gan/thận, điều chỉnh liều eGFR và độc tính.'}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {pathway.duoc ? (
                  <a
                    href={getKnowledgeVaultWebUrl(pathway.duoc.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>Xem bài viết</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(diseaseName, 'DUOC')}
                    className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>Kho Dược</span>
                  </button>
                )}
                <span className="text-[10px] font-mono text-slate-400">Vault 2.2</span>
              </div>
            </div>
          </div>
        )}

        {/* 5c. Hướng dẫn thực hành lâm sàng (Guidelines - EBM) */}
        {activeTab === '5c' && (
          <div className="space-y-4">
            {/* Top Toolbar & Quick Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-purple-50/80 border border-purple-200/90 rounded-xl text-xs text-purple-950 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-900 leading-tight">
                    Khuyến Cáo & Hướng Dẫn Điều Trị EBM Chuẩn Hóa
                  </h6>
                  <p className="text-[11px] text-purple-900/80">
                    Từ Bộ Y tế Việt Nam & các Hiệp hội Quốc tế (AHA, ESC, ATS, IDSA, GOLD, EASL)
                  </p>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-1.5 shrink-0">
                <span className="font-mono font-bold text-[11px] bg-white px-2.5 py-1 rounded-lg border border-purple-200 text-purple-900 shadow-2xs">
                  {matchedGuidelines.length} khuyến cáo
                </span>
                <a
                  href={getGuidelinesHubUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-purple-100/60 text-purple-800 border border-purple-200 text-[11px] font-semibold transition-colors shadow-2xs"
                  title="Mở Kho Tóm Tắt Guidelines 2026 trên giao diện chính"
                >
                  <BookOpen className="w-3 h-3 text-purple-700" />
                  <span>Kho Guidelines (156)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
                {onOpenVaultDrawer && (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer(diseaseName, '', 'GUIDELINE')}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-[11px] font-semibold transition-colors shadow-2xs cursor-pointer"
                    title="Mở ngăn kéo tri thức EBM Drawer"
                  >
                    <Search className="w-3 h-3" />
                    <span>EBM Drawer</span>
                  </button>
                )}
              </div>
            </div>

            {matchedGuidelines.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {matchedGuidelines.map(({ study, matchReason }, idx) => {
                  const isApplied = appliedStudies.has(study.id);
                  const isVnMOH = study.sourceType === 'vn-moh';
                  const orgLabel = study.organization || study.society || (isVnMOH ? 'Bộ Y Tế Việt Nam' : 'EBM Landmark');
                  const guidelineWebUrl = getGuidelineWebUrl(study);

                  return (
                    <div
                      key={study.id || idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3 relative"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-bold border ${
                              isVnMOH
                                ? 'bg-red-50 text-red-800 border-red-200'
                                : 'bg-purple-50 text-purple-800 border-purple-200'
                            }`}
                          >
                            {orgLabel}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-slate-500">
                            {study.year && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                                {study.year}
                              </span>
                            )}
                            {study.specialty && (
                              <span className="uppercase text-[10px] text-slate-400">
                                {study.specialty}
                              </span>
                            )}
                          </div>
                        </div>

                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug mb-1.5">
                          {study.title}
                        </h5>

                        {matchReason && (
                          <div className="mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                            <span>{matchReason}</span>
                          </div>
                        )}

                        <p className="text-[11.5px] text-slate-600 leading-relaxed line-clamp-3">
                          {study.summary || study.recommendationText || study.detailedConclusion || matchReason}
                        </p>

                        {study.keyEvidence && (
                          <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                            <b className="text-purple-900">Bằng chứng cốt lõi:</b> {study.keyEvidence}
                          </div>
                        )}

                        {study.drug && (
                          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 px-2 py-1 rounded-md border border-emerald-200">
                            <Pill className="w-3 h-3 text-emerald-700 shrink-0" />
                            <span className="font-semibold shrink-0">Thuốc chính:</span>
                            <span className="truncate">{study.drug}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={guidelineWebUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-purple-700 hover:text-purple-900 hover:bg-purple-50 transition-colors"
                        >
                          <span>Xem bài đọc Guideline</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        {onApplyGuidelineDrugs && (
                          <button
                            type="button"
                            onClick={() => handleApply(study)}
                            disabled={isApplied}
                            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                              isApplied
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                                : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                            }`}
                          >
                            {isApplied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-700" />
                                <span>Đã áp dụng y lệnh</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Áp dụng thuốc</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <p className="text-slate-600">
                  Chưa có hướng dẫn EBM khớp riêng biệt cho mã bệnh này. Bạn có thể tra cứu toàn bộ 156 bài Guidelines hoặc tham khảo phác đồ chuẩn Bộ Y tế trong Mục 2.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={getGuidelinesHubUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 text-white font-semibold text-xs hover:bg-purple-800 shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mở Kho Guidelines (156 bài)</span>
                  </a>
                  {onOpenVaultDrawer && (
                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer(diseaseName, '', 'GUIDELINE')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 shadow-2xs cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-purple-700" />
                      <span>Tra cứu theo từ khóa</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
