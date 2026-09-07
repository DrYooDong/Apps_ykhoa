import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  ExternalLink,
  Filter,
  Layers,
  Search,
  Sparkles,
  Stethoscope,
  Tag,
  X,
} from 'lucide-react';
import {
  getKhoSummaries,
  getKnowledgeVaultWebUrl,
  KHO_DEFINITIONS,
  searchVaultArticles,
  VaultArticle,
} from '../lib/vaultBridge.ts';
import {
  GUIDELINE_STUDIES,
  getGuidelineWebUrl,
  searchGuidelines,
  SOURCE_TYPE_LABELS,
} from '../lib/guidelineBridge.ts';
import { GuidelineStudy } from '../types.ts';

interface VaultDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  initialKho?: string;
  initialDiseaseName?: string;
}

export const VaultDrawer: React.FC<VaultDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  initialKho = 'ALL',
  initialDiseaseName,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery || initialDiseaseName || '');
  const [activeKho, setActiveKho] = useState(initialKho);
  const [selectedArticle, setSelectedArticle] = useState<VaultArticle | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<GuidelineStudy | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialQuery || initialDiseaseName || '');
      setActiveKho(initialKho || 'ALL');
      setSelectedArticle(null);
      setSelectedGuideline(null);
    }
  }, [isOpen, initialQuery, initialKho, initialDiseaseName]);

  const khoSummaries = useMemo(() => getKhoSummaries(), []);

  const { results, total } = useMemo(() => {
    return searchVaultArticles(searchTerm, activeKho, 'ALL', 40);
  }, [searchTerm, activeKho]);

  const guidelineResults = useMemo(() => {
    return searchGuidelines(searchTerm, 'ALL', 40);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col border-l border-slate-200">
          {/* Header */}
          <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-base tracking-tight">
                    CliniPortal Knowledge & EBM Vault
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
                    2.400+ Vault · 78+ Guidelines
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tra cứu y học chứng cứ, phác đồ, tiêu chuẩn chẩn đoán & cơ chế bệnh sinh
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col gap-2.5 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm bệnh, triệu chứng, mã ICD-10, guideline hoặc thuốc..."
                className="w-full pl-10 pr-9 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Specialized Vault Jump Buttons */}
            <div className="flex items-center justify-between gap-1 flex-wrap pt-0.5">
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Kho chuyên sâu:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <button
                  onClick={() => {
                    setActiveKho('GUIDELINE');
                    setSelectedArticle(null);
                    setSelectedGuideline(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] shadow-2xs ${
                    activeKho === 'GUIDELINE'
                      ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/40'
                      : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                  }`}
                  title="Xem 78 văn bản Khuyến cáo Bộ Y Tế, ESC, AHA & Nghiên cứu Landmark RCTs"
                >
                  <span>📚</span>
                  <span>Kho Guidelines ({GUIDELINE_STUDIES.length})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveKho('CC');
                    setSelectedArticle(null);
                    setSelectedGuideline(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] shadow-2xs ${
                    activeKho === 'CC'
                      ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400/40'
                      : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                  }`}
                  title="Xem 19 công cụ tính toán & thang điểm lâm sàng (CURB-65, Wells, GCS, NIHSS...)"
                >
                  <span>🧮</span>
                  <span>Kho Công cụ ({khoSummaries.find((k) => k.code === 'CC')?.articleCount || 19})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveKho('ICD10');
                    setSelectedArticle(null);
                    setSelectedGuideline(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] shadow-2xs ${
                    activeKho === 'ICD10'
                      ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-400/40'
                      : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
                  }`}
                  title="Xem 11 cẩm nang mã bệnh ICD-10 & phòng ngừa xuất toán BHYT"
                >
                  <span>🏷️</span>
                  <span>Kho ICD-10 ({khoSummaries.find((k) => k.code === 'ICD10')?.articleCount || 11})</span>
                </button>

                <button
                  onClick={() => {
                    setActiveKho('CDSS');
                    setSelectedArticle(null);
                    setSelectedGuideline(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] shadow-2xs ${
                    activeKho === 'CDSS'
                      ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-400/40'
                      : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
                  }`}
                  title="Xem 3 hệ thống hỗ trợ ra quyết định lâm sàng (Kháng sinh eGFR, Dịch truyền Dengue)"
                >
                  <span>⚡</span>
                  <span>Kho CDSS ({khoSummaries.find((k) => k.code === 'CDSS')?.articleCount || 3})</span>
                </button>
              </div>
            </div>

            {/* Kho Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar pt-1">
              <button
                onClick={() => {
                  setActiveKho('ALL');
                  setSelectedArticle(null);
                  setSelectedGuideline(null);
                }}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeKho === 'ALL'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Tất cả Kho ({khoSummaries.reduce((a, b) => a + b.articleCount, 0)})
              </button>
              <button
                onClick={() => {
                  setActiveKho('GUIDELINE');
                  setSelectedArticle(null);
                  setSelectedGuideline(null);
                }}
                className={`px-2.5 py-1 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeKho === 'GUIDELINE'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Khuyến cáo EBM ({GUIDELINE_STUDIES.length})
              </button>
              {khoSummaries.map((k) => (
                <button
                  key={k.code}
                  onClick={() => {
                    setActiveKho(k.code);
                    setSelectedArticle(null);
                    setSelectedGuideline(null);
                  }}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-all cursor-pointer ${
                    activeKho === k.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {k.name} ({k.articleCount})
                </button>
              ))}
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {selectedGuideline ? (
              /* Guideline Detail Preview View */
              <div className="flex flex-col gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setSelectedGuideline(null)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    ← Quay lại danh sách Guidelines ({guidelineResults.length} bài)
                  </button>

                  <a
                    href={getGuidelineWebUrl(selectedGuideline)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-rose-600 transition-colors"
                  >
                    <span>Mở Chuyên Trang Guidelines</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white bg-rose-600 uppercase tracking-wider">
                      {selectedGuideline.organization} ({selectedGuideline.year})
                    </span>
                    {selectedGuideline.impact === 'practice-changing' && (
                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-[11px] font-semibold">
                        Practice-Changing
                      </span>
                    )}
                    {selectedGuideline.icd10Codes && selectedGuideline.icd10Codes.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] text-slate-400 font-mono">ICD-10:</span>
                        {selectedGuideline.icd10Codes.map((code) => (
                          <span
                            key={code}
                            className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10.5px] font-mono font-semibold"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                    {selectedGuideline.title}
                  </h3>
                </div>

                <div className="p-3.5 bg-amber-50/60 rounded-lg border border-amber-200 text-xs leading-relaxed text-amber-950">
                  <strong className="text-amber-800 block mb-1">Kết quả then chốt & Khuyến cáo thực hành:</strong>
                  {selectedGuideline.keyResults || selectedGuideline.summary}
                </div>

                {selectedGuideline.intervention && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs leading-relaxed text-slate-700">
                    <strong className="text-slate-800 block mb-1">Chiến lược can thiệp / Phác đồ chuẩn:</strong>
                    {selectedGuideline.intervention}
                  </div>
                )}

                {selectedGuideline.drug && (
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-slate-700">
                    <strong className="text-blue-900 block mb-1">Thuốc & Hoạt chất khuyến cáo:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedGuideline.drug.split(',').map((d, i) => (
                        <span key={i} className="px-2 py-0.5 bg-white border border-blue-200 rounded text-[11px] font-mono text-blue-900">
                          {d.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={getGuidelineWebUrl(selectedGuideline)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                  >
                    <span>Đọc toàn văn khuyến cáo trong Kho EBM Guidelines</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : selectedArticle ? (
              /* Article Detail Preview View */
              <div className="flex flex-col gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-xs animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    ← Quay lại danh sách ({total} bài viết)
                  </button>

                  <a
                    href={getKnowledgeVaultWebUrl(selectedArticle.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <span>Mở trong Vault Hub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold text-white uppercase tracking-wider"
                      style={{
                        backgroundColor:
                          KHO_DEFINITIONS[selectedArticle.khoCode]?.color || '#0284c7',
                      }}
                    >
                      {selectedArticle.khoName}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 rounded text-[11px] font-medium">
                      {selectedArticle.specialty}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Clock className="w-3 h-3" />
                      {selectedArticle.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 leading-snug">
                    {selectedArticle.title}
                  </h3>

                  {selectedArticle.icd10 && selectedArticle.icd10.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-semibold text-slate-500">Mã ICD-10:</span>
                      {selectedArticle.icd10.map((code) => (
                        <span
                          key={code}
                          className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-mono font-semibold"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                  {selectedArticle.snippet || 'Tóm tắt bài viết đang được cập nhật...'}
                </div>

                {selectedArticle.keywords && selectedArticle.keywords.length > 0 && (
                  <div>
                    <div className="text-xs font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      Từ khóa tra cứu liên quan:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {selectedArticle.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px]"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={getKnowledgeVaultWebUrl(selectedArticle.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
                  >
                    <span>Đọc toàn văn bài viết trong Knowledge Vault</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : activeKho === 'GUIDELINE' ? (
              /* Guidelines List */
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    Hiển thị <b>{guidelineResults.length}</b> văn bản Khuyến cáo & RCTs
                  </span>
                  <span className="font-semibold text-rose-600">
                    Kho: Hướng Dẫn EBM Lâm Sàng
                  </span>
                </div>

                {guidelineResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                    <BookOpen className="w-10 h-10 stroke-1 mb-2 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                      Không tìm thấy Guideline phù hợp với từ khóa "{searchTerm}"
                    </p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
                    >
                      Xem toàn bộ 78 Guidelines
                    </button>
                  </div>
                ) : (
                  guidelineResults.map((study) => (
                    <div
                      key={study.id}
                      onClick={() => setSelectedGuideline(study)}
                      className="p-3.5 bg-white hover:bg-rose-50/40 border border-slate-200 hover:border-rose-300 rounded-lg transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white bg-rose-600">
                              {study.organization}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 font-semibold">
                              {study.year}
                            </span>
                            {study.impact === 'practice-changing' && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold">
                                Practice-Changing
                              </span>
                            )}
                            {study.icd10Codes && study.icd10Codes[0] && (
                              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono font-semibold">
                                ICD: {study.icd10Codes.slice(0, 3).join(', ')}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-rose-600 transition-colors line-clamp-2">
                            {study.title}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {study.keyResults || study.summary}
                          </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : results.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <BookOpen className="w-10 h-10 stroke-1 mb-2 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">
                  Không tìm thấy bài viết phù hợp
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Thử tìm kiếm với từ khóa khác hoặc chọn xem "Tất cả Kho"
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveKho('ALL');
                  }}
                  className="mt-3 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              /* Articles List */
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    Hiển thị <b>{results.length}</b> / {total} bài viết y khoa
                  </span>
                  {activeKho !== 'ALL' && (
                    <span className="font-semibold text-blue-600">
                      Kho: {KHO_DEFINITIONS[activeKho]?.name}
                    </span>
                  )}
                </div>

                {/* Khuyến cáo EBM khớp nhanh nếu đang tìm kiếm ở Tất cả kho */}
                {activeKho === 'ALL' && searchTerm.trim().length >= 2 && guidelineResults.length > 0 && (
                  <div className="p-3 bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 rounded-lg flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📚</span>
                      <div>
                        <div className="text-xs font-bold text-rose-900">
                          Tìm thấy {guidelineResults.length} Khuyến cáo EBM khớp với "{searchTerm}"
                        </div>
                        <div className="text-[11px] text-rose-700 line-clamp-1">
                          {guidelineResults[0].title}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveKho('GUIDELINE')}
                      className="px-2.5 py-1 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Xem Guidelines &rarr;
                    </button>
                  </div>
                )}

                {results.map((art) => {
                  const khoColor = KHO_DEFINITIONS[art.khoCode]?.color || '#0284c7';
                  return (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className="p-3.5 bg-white hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 rounded-lg transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                            <span
                              className="px-1.5 py-0.2 rounded text-[10px] font-bold text-white"
                              style={{ backgroundColor: khoColor }}
                            >
                              {art.khoCode}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {art.specialty}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {art.readTime}
                            </span>
                            {art.icd10 && art.icd10[0] && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-semibold">
                                {art.icd10[0]}
                              </span>
                            )}
                          </div>

                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {art.title}
                          </h4>

                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {art.snippet}
                          </p>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span className="flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Vault & EBM Guidelines Live Sync
            </span>
            <div className="flex items-center gap-3">
              <a
                href="../ebm/guidelines/guidelines.html"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
              >
                <span>Kho Guidelines</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-300">·</span>
              <a
                href="../knowledge-vault/index.html"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>Vault Hub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
