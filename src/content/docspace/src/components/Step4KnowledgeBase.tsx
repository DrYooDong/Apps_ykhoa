import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  ClipboardCheck,
  Download,
  ExternalLink,
  Filter,
  Layers,
  Pill,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Upload,
} from 'lucide-react';
import { KnowledgeBase, TrieuChung } from '../types.ts';
import { GROUP_COLORS, GROUP_NAMES, ROLE_LABELS } from '../data/seedData.ts';
import { normalizeText } from '../lib/clinicalEngine.ts';
import {
  getKhoSummaries,
  getKnowledgeVaultWebUrl,
  KHO_DEFINITIONS,
  searchVaultArticles,
  VAULT_CATALOG,
  VaultArticle,
} from '../lib/vaultBridge.ts';
import {
  buildDiagnosticCards,
  DiagnosticCardData,
} from '../lib/diagnosticCriteriaService.ts';

interface Step4Props {
  kb: KnowledgeBase;
  onExportKB: () => void;
  onImportKB: (file: File) => void;
  onGoToProtocol?: (diseaseId: string) => void;
  onOpenVaultDrawer?: (diseaseName: string, khoCode?: string) => void;
}

export const Step4KnowledgeBase: React.FC<Step4Props> = ({
  kb,
  onExportKB,
  onImportKB,
  onGoToProtocol,
  onOpenVaultDrawer,
}) => {
  const [activeTab, setActiveTab] = useState<'criteria' | 'symptoms' | 'rules' | 'vault'>('criteria');
  const [criteriaSource, setCriteriaSource] = useState<'all' | 'core' | 'vault'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedVaultKho, setSelectedVaultKho] = useState<string>('ALL');
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>(null);

  const khoSummaries = useMemo(() => getKhoSummaries(), []);

  // Toàn bộ thẻ tiêu chuẩn chẩn đoán từ Kho Chẩn Đoán (2.3) kết hợp luật CDSS
  const allDiagnosticCards = useMemo(() => {
    return buildDiagnosticCards(kb);
  }, [kb]);

  const coreCardsCount = useMemo(() => {
    return allDiagnosticCards.filter((c) => c.isCoreCdss).length;
  }, [allDiagnosticCards]);

  const vaultCardsCount = useMemo(() => {
    return allDiagnosticCards.filter((c) => !c.isCoreCdss).length;
  }, [allDiagnosticCards]);

  // Danh sách chuyên khoa từ toàn bộ thẻ tiêu chuẩn
  const specialtyOptions = useMemo(() => {
    const set = new Set<string>();
    allDiagnosticCards.forEach((c) => set.add(c.nhom));
    return Array.from(set).sort();
  }, [allDiagnosticCards]);

  const normalizedSearch = normalizeText(searchTerm);

  // Lọc tiêu chuẩn chẩn đoán
  const filteredCriteriaCards = useMemo(() => {
    return allDiagnosticCards.filter((c) => {
      // Lọc theo nguồn (Tất cả / Trọng số CDSS / Kho Chẩn Đoán 2.3)
      if (criteriaSource === 'core' && !c.isCoreCdss) return false;
      if (criteriaSource === 'vault' && c.isCoreCdss) return false;

      // Lọc theo chuyên khoa
      const matchGroup = selectedGroup === 'all' || c.nhom === selectedGroup;

      // Lọc theo tìm kiếm
      const matchSearch =
        !normalizedSearch ||
        normalizeText(c.ten).includes(normalizedSearch) ||
        normalizeText(c.icd).includes(normalizedSearch) ||
        normalizeText(c.tomTat).includes(normalizedSearch) ||
        c.tieuChuan.some((tc) => normalizeText(tc.ten).includes(normalizedSearch));

      return matchGroup && matchSearch;
    });
  }, [allDiagnosticCards, criteriaSource, selectedGroup, normalizedSearch]);

  const vaultResults = useMemo(() => {
    return searchVaultArticles(searchTerm, selectedVaultKho, 'ALL', 60);
  }, [searchTerm, selectedVaultKho]);

  const filteredSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => {
      const matchGroup = selectedGroup === 'all' || tc.nhom === selectedGroup;
      const matchSearch =
        !normalizedSearch ||
        normalizeText(tc.ten).includes(normalizedSearch) ||
        normalizeText(tc.id).includes(normalizedSearch) ||
        tc.tuKhoa.some((k) => normalizeText(k).includes(normalizedSearch));
      return matchGroup && matchSearch;
    });
  }, [kb.trieuChung, selectedGroup, normalizedSearch]);

  // Symptoms that have an explicit auto-derivation map
  const derivationRules = useMemo(() => {
    return kb.trieuChung.filter((tc) => tc.map !== null);
  }, [kb.trieuChung]);

  return (
    <div className="flex flex-col gap-4">
      {/* KB Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-800">
              Kho tri thức y khoa & Suy luận diễn dịch (Evidence Base)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              v{kb.meta?.phienBan || '2.0'} · Cập nhật {kb.meta?.capNhat || '2026'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Mạng lưới tiêu chuẩn chẩn đoán, trọng số bằng chứng lâm sàng từ Kho Chẩn Đoán (2.3) và liên kết phác đồ điều trị
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportKB}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md cursor-pointer transition-colors shadow-2xs"
            title="Xuất cơ sở tri thức hiện tại thành file JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất JSON</span>
          </button>

          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md cursor-pointer transition-colors shadow-2xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Nạp JSON</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onImportKB(file);
                  e.target.value = '';
                }
              }}
            />
          </label>
        </div>
      </div>

      {/* Control Bar: Sub-Tabs, Search, Specialty Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-lg p-2.5 shadow-xs">
        {/* Sub tabs (Thống kê & Cấu trúc đã được gỡ bỏ) */}
        <div className="flex border border-slate-200 rounded-md overflow-hidden p-0.5 bg-slate-100 text-xs flex-wrap">
          <button
            onClick={() => setActiveTab('criteria')}
            className={`px-3 py-1 font-semibold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'criteria'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Tiêu chuẩn chẩn đoán ({allDiagnosticCards.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('symptoms')}
            className={`px-3 py-1 font-semibold rounded transition-all cursor-pointer ${
              activeTab === 'symptoms'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Từ vựng ({kb.trieuChung.length})
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1 font-semibold rounded transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quy tắc tự suy ⚙ ({derivationRules.length})
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-1 font-semibold rounded transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vault'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/90 border border-indigo-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho Vault EBM ({VAULT_CATALOG.length})</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2 flex-1 max-w-lg justify-end">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeTab === 'criteria'
                  ? 'Tìm theo tên bệnh, ICD, triệu chứng, tiêu chuẩn...'
                  : activeTab === 'vault'
                  ? 'Tìm trong 2.400+ bài viết EBM (ICD, thuốc, phác đồ)...'
                  : 'Tìm kiếm bệnh, ICD, triệu chứng, từ khóa...'
              }
              className="w-full pl-7 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-slate-800"
            />
          </div>

          {/* Specialty select */}
          {activeTab !== 'vault' ? (
            <div className="flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="border border-slate-200 rounded-md p-1.5 text-xs bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800 font-medium max-w-[170px]"
              >
                <option value="all">Tất cả chuyên khoa</option>
                {activeTab === 'criteria' ? (
                  specialtyOptions.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))
                ) : (
                  Object.entries(GROUP_NAMES).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))
                )}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              <select
                value={selectedVaultKho}
                onChange={(e) => setSelectedVaultKho(e.target.value)}
                className="border border-slate-200 rounded-md p-1.5 text-xs bg-slate-50 focus:outline-none focus:border-indigo-500 text-slate-800 font-medium max-w-[170px]"
              >
                <option value="ALL">Tất cả 18 Kho</option>
                {khoSummaries.map((k) => (
                  <option key={k.code} value={k.code}>
                    {k.name} ({k.articleCount})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Tab 1: Tiêu chuẩn chẩn đoán (Dữ liệu Kho Chẩn Đoán 2.3 + Trọng số CDSS) */}
      {activeTab === 'criteria' && (
        <div className="flex flex-col gap-3">
          {/* Sub-filter bar: Source toggle */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Nguồn dữ liệu:</span>
              <button
                type="button"
                onClick={() => setCriteriaSource('all')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  criteriaSource === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Tất cả tiêu chuẩn ({allDiagnosticCards.length})
              </button>
              <button
                type="button"
                onClick={() => setCriteriaSource('core')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  criteriaSource === 'core'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Có trọng số CDSS ({coreCardsCount})
              </button>
              <button
                type="button"
                onClick={() => setCriteriaSource('vault')}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  criteriaSource === 'vault'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Kho Chẩn Đoán 2.3 ({vaultCardsCount})
              </button>
            </div>

            <div className="text-[11px] text-slate-500">
              Đang hiển thị <b>{filteredCriteriaCards.length}</b> bệnh lý · Tự động đối chiếu với <b>Kho Phác Đồ 2.4</b>
            </div>
          </div>

          {/* Cards Grid: EXACT visual layout from Hình 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCriteriaCards.map((b) => {
              const groupColor = b.nhomColor || '#2563eb';
              const isExpanded = expandedDiseaseId === b.id;

              return (
                <div
                  key={b.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-4 shadow-xs transition-all flex flex-col justify-between"
                  style={{ borderTopWidth: '3px', borderTopColor: groupColor }}
                >
                  <div>
                    {/* Header: Title + ICD + Emergency Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-sm sm:text-base font-bold text-slate-800">
                          {b.ten}
                        </h3>
                        <span className="px-1.5 py-0.5 text-[10.5px] font-mono-custom bg-slate-800 text-white rounded font-semibold">
                          {b.icd}
                        </span>
                      </div>

                      {b.baoDong && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 rounded shrink-0 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" />
                          <span>CẤP CỨU</span>
                        </span>
                      )}
                    </div>

                    {/* Specialty & Source Subtitle */}
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {b.nhom}
                      </span>
                      {b.isCoreCdss ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Bộ luật CDSS
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-pink-50 text-pink-700 border border-pink-200">
                          Kho Chẩn Đoán 2.3
                        </span>
                      )}
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs text-slate-600 mb-2.5 leading-relaxed">{b.tomTat}</p>

                    {/* Demographic Specs Box (Blue Tint) */}
                    {b.danSo && (
                      <div className="mb-2.5 text-[11px] text-blue-800 bg-blue-50/60 p-2 rounded border border-blue-100 font-mono-custom flex flex-wrap gap-2">
                        <span>Giới: {b.danSo.gioiTinh}</span>
                        {b.danSo.tuoiMin != null && (
                          <span>Tuổi: {b.danSo.tuoiMin}–{b.danSo.tuoiMax ?? '+'}</span>
                        )}
                      </div>
                    )}

                    {/* Diagnostic Criteria and Weight Chips (Hình 1) */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block mb-1">
                        Tiêu chuẩn & trọng số ({b.tieuChuan.length}):
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {b.tieuChuan.map((tc, idx) => {
                          const roleCfg = ROLE_LABELS[tc.role] || {
                            label: 'đặc trưng',
                            badgeClass: 'text-blue-700 border border-blue-200 bg-blue-50',
                          };
                          return (
                            <div
                              key={idx}
                              className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded text-[11px] flex items-center gap-1"
                            >
                              <span className="text-slate-800 font-medium">{tc.ten}</span>
                              <span className={`text-[9.5px] px-1 rounded ${roleCfg.badgeClass}`}>
                                {roleCfg.label}
                              </span>
                              <b className="font-mono-custom text-blue-600">+{tc.trongSo}</b>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expandable Embedded Treatment Protocol Preview */}
                    {isExpanded && b.phacDoPreview && (
                      <div className="mt-3 pt-3 border-t border-slate-200 bg-slate-50 p-3 rounded-lg text-xs space-y-2.5 animate-fadeIn">
                        <div>
                          <span className="font-bold text-slate-800 uppercase text-[10.5px] block mb-1">
                            Quy trình xử trí:
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700">
                            {b.phacDoPreview.tuyen.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        {b.phacDoPreview.thuoc.length > 0 && (
                          <div>
                            <span className="font-bold text-slate-800 uppercase text-[10.5px] block mb-1">
                              Thuốc điều trị chính:
                            </span>
                            <div className="space-y-1">
                              {b.phacDoPreview.thuoc.map(([drug, dose, note], idx) => (
                                <div
                                  key={idx}
                                  className="p-1.5 bg-white border border-slate-200 rounded flex justify-between"
                                >
                                  <span className="font-bold text-slate-800">{drug}</span>
                                  <span className="font-mono-custom text-blue-700">{dose}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {b.phacDoPreview.luuY.length > 0 && (
                          <div className="text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 text-[11px]">
                            <b>Lưu ý: </b>
                            {b.phacDoPreview.luuY.join(' · ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Links to EBM Chẩn Đoán, EBM Phác Đồ & Step 3 */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-2">
                      {b.phacDoPreview && (
                        <button
                          type="button"
                          onClick={() => setExpandedDiseaseId(isExpanded ? null : b.id)}
                          className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Thu gọn' : 'Xem phác đồ tóm tắt'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}

                      {/* Link sang Kho Chẩn Đoán EBM */}
                      {b.cdArticle && (
                        <button
                          type="button"
                          onClick={() => onOpenVaultDrawer?.(b.cdArticle!.title, 'CD')}
                          className="text-pink-600 hover:text-pink-800 font-semibold flex items-center gap-1 cursor-pointer"
                          title="Mở toàn văn tiêu chuẩn chẩn đoán từ Kho Chẩn Đoán 2.3"
                        >
                          <span>Tiêu chuẩn EBM</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}

                      {/* Link sang Kho Phác Đồ EBM */}
                      {b.pddtArticle && (
                        <button
                          type="button"
                          onClick={() => onOpenVaultDrawer?.(b.pddtArticle!.title, 'PDDT')}
                          className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 cursor-pointer"
                          title="Mở toàn văn phác đồ từ Kho Phác Đồ 2.4"
                        >
                          <span>Phác đồ EBM</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Nút hành động mở Phác đồ điều trị */}
                    <div>
                      {b.hasStep3Protocol && onGoToProtocol ? (
                        <button
                          type="button"
                          onClick={() => onGoToProtocol(b.id)}
                          className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Mở phác đồ & ra y lệnh</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : b.pddtArticle ? (
                        <button
                          type="button"
                          onClick={() => onOpenVaultDrawer?.(b.pddtArticle!.title, 'PDDT')}
                          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Mở phác đồ điều trị</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Clinical Vocabulary Table */}
      {activeTab === 'symptoms' && (
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <th className="p-2.5">Tên triệu chứng</th>
                  <th className="p-2.5">Mã ID</th>
                  <th className="p-2.5">Chuyên khoa</th>
                  <th className="p-2.5">Phân loại</th>
                  <th className="p-2.5">Quy luật tự suy (⚙ Map)</th>
                  <th className="p-2.5">Từ khóa đối chiếu văn bản</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSymptoms.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-2.5 font-semibold text-slate-800">{tc.ten}</td>
                    <td className="p-2.5 font-mono-custom text-[11px] text-slate-500">{tc.id}</td>
                    <td className="p-2.5 text-slate-600">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-medium text-white"
                        style={{ backgroundColor: GROUP_COLORS[tc.nhom] || '#475569' }}
                      >
                        {GROUP_NAMES[tc.nhom] || tc.nhom}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <div className="flex flex-wrap gap-1">
                        {tc.loai.map((l) => (
                          <span
                            key={l}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-mono-custom uppercase"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-2.5">
                      {tc.map ? (
                        <div className="font-mono-custom text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 inline-block font-semibold">
                          ⚙ {tc.map.fld} {tc.map.op}{' '}
                          {tc.map.val != null
                            ? tc.map.val
                            : `(Nữ: ${tc.map.valNu}, Nam: ${tc.map.valNam})`}
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="p-2.5">
                      <div className="flex flex-wrap gap-1 max-w-sm">
                        {tc.tuKhoa.slice(0, 4).map((kw, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10.5px] bg-slate-50 border border-slate-200 text-slate-600"
                          >
                            {kw}
                          </span>
                        ))}
                        {tc.tuKhoa.length > 4 && (
                          <span className="text-[10px] text-slate-400">
                            +{tc.tuKhoa.length - 4}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Auto-Derivation Inference Rules (⚙) */}
      {activeTab === 'rules' && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs flex flex-col gap-4">
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-800">
              Quy tắc suy luận tự động từ Sinh hiệu & Cận lâm sàng (⚙ Auto-Derivation Engine)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Khi bác sĩ nhập giá trị định lượng vào các trường sinh hiệu hoặc xét nghiệm, hệ thống tự
              động kích hoạt các triệu chứng tương ứng mà không cần chọn thủ công.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {derivationRules.map((r) => (
              <div
                key={r.id}
                className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3 hover:bg-slate-100/80 transition-colors"
              >
                <div>
                  <div className="font-bold text-xs text-slate-800">{r.ten}</div>
                  <div className="text-[11px] text-slate-500 font-mono-custom mt-0.5">
                    Mã: {r.id} · Chuyên khoa: {GROUP_NAMES[r.nhom] || r.nhom}
                  </div>
                </div>

                <div className="font-mono-custom text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded font-bold shrink-0">
                  {r.map?.fld} {r.map?.op}{' '}
                  {r.map?.val != null ? r.map.val : `(Nữ: ${r.map?.valNu}, Nam: ${r.map?.valNam})`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: CliniPortal Knowledge Vault 2,400+ EBM Articles */}
      {activeTab === 'vault' && (
        <div className="flex flex-col gap-4">
          {/* Vault Banner & Quick Navigation */}
          <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-lg p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs uppercase font-mono tracking-widest text-indigo-300 font-bold">
                  HỆ SINH THÁI TRI THỨC Y KHOA ĐA PHÂN HỆ
                </span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                Kho Tri Thức Y Học Chứng Cứ CliniPortal
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                2.400+ bài viết phân loại theo 18 Kho chuyên biệt: Cơ sở Y khoa, Tiêu chuẩn chẩn đoán, Phác đồ xử trí, Cận lâm sàng & Dược lý học lâm sàng.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="../knowledge-vault/index.html"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Mở Knowledge Vault Hub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 3 Core Highlight Vaults: Công cụ (19), ICD-10 (11), CDSS (3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Kho Công cụ & Thang điểm CC */}
            <div
              onClick={() => setSelectedVaultKho('CC')}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                selectedVaultKho === 'CC'
                  ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center text-base shadow-2xs">
                    🧮
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono-custom font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    19 công cụ
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">
                  Kho Công cụ & Thang điểm (CC)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bộ thang điểm phân tầng nguy cơ: CURB-65, CHA2DS2-VASc, Cockcroft-Gault, CKD-EPI, GCS, NIHSS, Wells DVT/PE, Insulin Sliding Scale, ABG 6 bước...
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                <span>Duyệt 19 công cụ lâm sàng</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Kho ICD-10 & BHYT */}
            <div
              onClick={() => setSelectedVaultKho('ICD10')}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                selectedVaultKho === 'ICD10'
                  ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center text-base shadow-2xs">
                    🏷️
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono-custom font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    11 cẩm nang
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">
                  Kho ICD-10 & Thẩm định BHYT (ICD10)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cẩm nang mã hóa bệnh cấp/mạn tính, quy tắc chọn mã chẩn đoán chính & phụ, Sổ tay 50+ bẫy lỗi xuất toán BHYT thực tế và công cụ tra cứu mã chuẩn.
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                <span>Duyệt 11 cẩm nang BHYT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Kho CDSS Quyết định */}
            <div
              onClick={() => setSelectedVaultKho('CDSS')}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                selectedVaultKho === 'CDSS'
                  ? 'bg-purple-50/80 border-purple-400 ring-2 ring-purple-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500 text-white flex items-center justify-center text-base shadow-2xs">
                    ⚡
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono-custom font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    4 hệ thống
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 mb-1">
                  Hệ thống Hỗ trợ Ra Quyết định (CDSS)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  4 hệ thống ra quyết định lâm sàng tương tác: Bù dịch SXHD Dengue (BYT 2023), Phân tích ECG 12 đạo trình, Khí máu động mạch (ABG Pro) 6 bước, Phân tích X-quang PACS thông minh...
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700">
                <span>Duyệt 4 hệ thống CDSS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* 18 Kho Filter Grid */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedVaultKho('ALL')}
              className={`px-3 py-1.5 rounded-md font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedVaultKho === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Tất cả 18 Kho ({VAULT_CATALOG.length})
            </button>
            {khoSummaries.map((k) => (
              <button
                key={k.code}
                onClick={() => setSelectedVaultKho(k.code)}
                className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedVaultKho === k.code
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {k.name} ({k.articleCount})
              </button>
            ))}
          </div>

          {/* Vault Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {vaultResults.results.map((art) => {
              const khoColor = KHO_DEFINITIONS[art.khoCode]?.color || '#0284c7';
              return (
                <div
                  key={art.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-lg p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase tracking-wide"
                        style={{ backgroundColor: khoColor }}
                      >
                        {art.khoName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 my-1.5 flex-wrap">
                      <span className="font-medium text-slate-600">{art.specialty}</span>
                      {art.icd10 && art.icd10.length > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-semibold">
                          {art.icd10[0]}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {art.snippet}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.khoCode)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                    >
                      Xem nhanh Drawer
                    </button>

                    <a
                      href={getKnowledgeVaultWebUrl(art.id)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <span>Đọc toàn văn</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {vaultResults.total > vaultResults.results.length && (
            <div className="text-center py-3 text-xs text-slate-500">
              Đang hiển thị <b>{vaultResults.results.length}</b> trên tổng số <b>{vaultResults.total}</b> bài viết. Dùng ô tìm kiếm để lọc chính xác hơn.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
