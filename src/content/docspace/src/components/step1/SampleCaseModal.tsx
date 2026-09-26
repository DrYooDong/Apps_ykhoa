import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Check,
  Stethoscope,
  Sparkles,
  Filter,
  ChevronRight,
  ChevronDown,
  Activity,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  Info,
  User,
  Clock,
  ArrowRight,
  FileText,
  Thermometer,
  Layers,
  FolderOpen,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { SampleCase } from '../../data/seedData.ts';

interface SampleCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (sample: SampleCase) => void;
  cases: SampleCase[];
}

// Helper to determine specialty if missing
const getCaseSpecialty = (c: SampleCase): string => {
  if (c.chuyenKhoa) return c.chuyenKhoa;
  const name = (c.ten + ' ' + (c.form?.lyDo || '')).toLowerCase();
  if (name.includes('màng não') || name.includes('thần kinh') || name.includes('tụt kẹt')) {
    return 'Thần kinh & Cấp cứu';
  }
  if (name.includes('viêm gan') || name.includes('hbv') || name.includes('gan')) {
    return 'Truyền nhiễm & Gan mật';
  }
  if (name.includes('thủy đậu') || name.includes('nhi') || name.includes('tuổi: 8') || (c.form?.tuoi && parseInt(c.form.tuoi) <= 15)) {
    return 'Truyền nhiễm & Nhi khoa';
  }
  if (name.includes('leptospira') || name.includes('weil') || name.includes('sốc')) {
    return 'Truyền nhiễm & Hồi sức cấp cứu';
  }
  return 'Truyền nhiễm & Nhiệt đới';
};

// Helper for severity classification
interface SeverityMeta {
  label: string;
  type: 'danger' | 'warning' | 'info' | 'success';
  badgeClass: string;
  dotColor: string;
}

const getCaseSeverityMeta = (c: SampleCase): SeverityMeta => {
  const mucDo = c.mucDo || '';
  const text = (c.ten + ' ' + (c.form?.lyDo || '')).toLowerCase();

  if (mucDo === 'nguy_kich' || text.includes('tụt kẹt') || text.includes('weil') || text.includes('tử ban hoại tử') || text.includes('sốc')) {
    return {
      label: 'Nguy kịch / Cấp cứu',
      type: 'danger',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
      dotColor: 'bg-rose-500',
    };
  }
  if (mucDo === 'canh_bao' || text.includes('cảnh báo') || text.includes('nặng')) {
    return {
      label: 'Dấu hiệu cảnh báo',
      type: 'warning',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
      dotColor: 'bg-amber-500',
    };
  }
  if (mucDo === 'man_tinh' || text.includes('mạn tính') || text.includes('mạn')) {
    return {
      label: 'Mạn tính tiến triển',
      type: 'info',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
      dotColor: 'bg-blue-500',
    };
  }
  return {
    label: 'Thể thông thường',
    type: 'success',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    dotColor: 'bg-emerald-500',
  };
};

export const SampleCaseModal: React.FC<SampleCaseModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  cases,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [previewCase, setPreviewCase] = useState<SampleCase | null>(null);
  const [loadedCaseId, setLoadedCaseId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewCase) {
          setPreviewCase(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, previewCase]);

  // Extract distinct specialties
  const specialties = useMemo(() => {
    const set = new Set<string>();
    cases.forEach((c) => {
      set.add(getCaseSpecialty(c));
    });
    return Array.from(set);
  }, [cases]);

  // Filtered cases
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      // Specialty filter
      if (selectedSpecialty !== 'all' && getCaseSpecialty(c) !== selectedSpecialty) {
        return false;
      }

      // Severity filter
      if (selectedSeverity !== 'all') {
        const sev = getCaseSeverityMeta(c);
        if (selectedSeverity === 'emergency' && sev.type !== 'danger') return false;
        if (selectedSeverity === 'warning' && sev.type !== 'warning') return false;
        if (selectedSeverity === 'typical' && sev.type !== 'success') return false;
        if (selectedSeverity === 'chronic' && sev.type !== 'info') return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const title = (c.ten || '').toLowerCase();
        const lyDo = (c.form?.lyDo || '').toLowerCase();
        const textCn = (c.form?.text?.cn || '').toLowerCase();
        const textTt = (c.form?.text?.tt || '').toLowerCase();
        const textCls = (c.form?.text?.cls || '').toLowerCase();
        const age = (c.form?.tuoi || '').toLowerCase();
        const gender = (c.form?.gioiTinh || '').toLowerCase();
        const tags = (c.tags || []).join(' ').toLowerCase();

        const matches =
          title.includes(query) ||
          lyDo.includes(query) ||
          textCn.includes(query) ||
          textTt.includes(query) ||
          textCls.includes(query) ||
          age.includes(query) ||
          gender.includes(query) ||
          tags.includes(query);

        if (!matches) return false;
      }

      return true;
    });
  }, [cases, selectedSpecialty, selectedSeverity, searchQuery]);

  const handleSelectAndClose = (sample: SampleCase) => {
    setLoadedCaseId(sample.ten);
    onSelectCase(sample);
    setTimeout(() => {
      setLoadedCaseId(null);
      onClose();
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-50 to-blue-50/40 dark:from-slate-900 dark:to-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  Thư Viện Ca Bệnh Mẫu Lâm Sàng
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  {cases.length} ca có sẵn
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Nạp dữ kiện thực tế để mô phỏng 4 bước: Sinh hiệu, Cận lâm sàng, Tam giác DTH & Ma trận CDSS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Live Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên bệnh, triệu chứng, tuổi, lý do khám, từ khóa..."
                className="w-full pl-9 pr-9 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Severity Filter */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'Tất cả độ nặng' },
                { id: 'emergency', label: 'Cấp cứu / Nguy kịch', dot: 'bg-rose-500' },
                { id: 'warning', label: 'Cảnh báo', dot: 'bg-amber-500' },
                { id: 'typical', label: 'Thông thường', dot: 'bg-emerald-500' },
                { id: 'chronic', label: 'Mạn tính', dot: 'bg-blue-500' },
              ].map((sev) => {
                const isSelected = selectedSeverity === sev.id;
                return (
                  <button
                    key={sev.id}
                    type="button"
                    onClick={() => setSelectedSeverity(sev.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 text-white border-slate-800 dark:bg-blue-600 dark:border-blue-600 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sev.dot && <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />}
                    <span>{sev.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-xs">
            <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" /> Chuyên khoa:
            </span>
            <button
              type="button"
              onClick={() => setSelectedSpecialty('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedSpecialty === 'all'
                  ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900/40 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Tất cả ({cases.length})
            </button>
            {specialties.map((spec) => {
              const count = cases.filter((c) => getCaseSpecialty(c) === spec).length;
              const isSelected = selectedSpecialty === spec;
              return (
                <button
                  key={spec}
                  type="button"
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-100 text-blue-700 font-semibold dark:bg-blue-900/40 dark:text-blue-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {spec} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* MODAL BODY: CASES GRID */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 dark:bg-slate-950/40">
          {filteredCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                Không tìm thấy ca bệnh phù hợp
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                Không có ca lâm sàng nào khớp với từ khóa hoặc bộ lọc đã chọn. Hãy thử xóa bộ lọc để xem toàn bộ ca mẫu.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                  setSelectedSeverity('all');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCases.map((sample, idx) => {
                const specialty = getCaseSpecialty(sample);
                const severity = getCaseSeverityMeta(sample);
                const isLoaded = loadedCaseId === sample.ten;

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-2 py-0.5 rounded-md">
                          {specialty}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${severity.badgeClass}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${severity.dotColor}`} />
                          {severity.label}
                        </span>
                      </div>

                      {/* Case Title */}
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {sample.ten}
                      </h4>

                      {/* Patient Demographics */}
                      <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {sample.form.gioiTinh === 'nam' ? 'Nam' : sample.form.gioiTinh === 'nu' ? 'Nữ' : 'Khác'},{' '}
                          {sample.form.tuoi} tuổi
                        </span>
                        {sample.form.ngheNghiep && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[140px]" title={sample.form.ngheNghiep}>
                              {sample.form.ngheNghiep}
                            </span>
                          </>
                        )}
                        <span>•</span>
                        <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 font-semibold">
                          {sample.sel.length} triệu chứng
                        </span>
                      </div>

                      {/* Chief Complaint / Lý do vào viện */}
                      <div className="mt-2.5 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Lý do khám: </span>
                        <span className="italic">{sample.form.lyDo || 'Không ghi rõ'}</span>
                      </div>

                      {/* Key Vitals Preview (if present) */}
                      {sample.vitals && (
                        <div className="flex items-center gap-2 mt-2.5 flex-wrap text-[11px]">
                          {sample.vitals.vNhiet && (
                            <span
                              className={`px-1.5 py-0.5 rounded border font-mono font-medium ${
                                parseFloat(sample.vitals.vNhiet) >= 38.0
                                  ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800'
                              }`}
                            >
                              T: {sample.vitals.vNhiet}°C
                            </span>
                          )}
                          {sample.vitals.vMach && (
                            <span
                              className={`px-1.5 py-0.5 rounded border font-mono font-medium ${
                                parseInt(sample.vitals.vMach) >= 100 || parseInt(sample.vitals.vMach) <= 60
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800'
                              }`}
                            >
                              Mạch: {sample.vitals.vMach} l/p
                            </span>
                          )}
                          {sample.vitals.vHATT && sample.vitals.vHATTr && (
                            <span
                              className={`px-1.5 py-0.5 rounded border font-mono font-medium ${
                                parseInt(sample.vitals.vHATT) <= 90 || parseInt(sample.vitals.vHATT) >= 140
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800'
                              }`}
                            >
                              HA: {sample.vitals.vHATT}/{sample.vitals.vHATTr}
                            </span>
                          )}
                          {sample.vitals.vSpo2 && (
                            <span
                              className={`px-1.5 py-0.5 rounded border font-mono font-medium ${
                                parseInt(sample.vitals.vSpo2) <= 95
                                  ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30'
                                  : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800'
                              }`}
                            >
                              SpO₂: {sample.vitals.vSpo2}%
                            </span>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      {sample.tags && sample.tags.length > 0 && (
                        <div className="flex items-center gap-1 mt-2.5 flex-wrap">
                          {sample.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setPreviewCase(sample)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Xem chi tiết bệnh án</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectAndClose(sample)}
                        disabled={isLoaded}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer ${
                          isLoaded
                            ? 'bg-emerald-600 text-white shadow-emerald-500/20 scale-102'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                        }`}
                      >
                        {isLoaded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Đã nạp vào Form!</span>
                          </>
                        ) : (
                          <>
                            <span>Nạp ca này</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Hiển thị <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredCases.length}</span> /{' '}
            {cases.length} ca bệnh mẫu
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>

      {/* DETAIL PREVIEW DRAWER/MODAL (Nested inside) */}
      {previewCase && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setPreviewCase(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[88vh] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Xem Trước Bệnh Án Chi Tiết
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                  {previewCase.ten}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCase(null)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {/* Demographics & Chief complaint */}
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg space-y-1">
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  {previewCase.form.gioiTinh === 'nam' ? 'Nam' : previewCase.form.gioiTinh === 'nu' ? 'Nữ' : 'Khác'},{' '}
                  {previewCase.form.tuoi} tuổi — Nghề nghiệp: {previewCase.form.ngheNghiep || 'Chưa rõ'}
                </div>
                <div className="text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Lý do vào viện: </span>
                  {previewCase.form.lyDo}
                </div>
              </div>

              {/* Clinical Text Sections */}
              <div className="space-y-3">
                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    A. Bệnh sử (Triệu chứng Cơ năng)
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewCase.form.text?.cn || 'Không có ghi nhận'}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    B. Khám lâm sàng (Triệu chứng Thực thể)
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewCase.form.text?.tt || 'Không có ghi nhận'}
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    C. Tiền căn & Bối cảnh Dịch tễ học
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewCase.form.text?.tc || 'Không có ghi nhận'}
                  </p>
                  {previewCase.epiContext && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                      {previewCase.epiContext.endemicArea && (
                        <div>• Vùng lưu hành: {previewCase.epiContext.endemicArea}</div>
                      )}
                      {previewCase.epiContext.vectorExposure && (
                        <div>• Yếu tố tiếp xúc/véc-tơ: {previewCase.epiContext.vectorExposure}</div>
                      )}
                      {previewCase.epiContext.outbreakAlert && (
                        <div>• Ổ dịch: {previewCase.epiContext.outbreakAlert}</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    D. Cận lâm sàng & Vi sinh
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {previewCase.form.text?.cls || 'Không có ghi nhận'}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Footer */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <button
                type="button"
                onClick={() => setPreviewCase(null)}
                className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Quay lại danh sách
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewCase(null);
                  handleSelectAndClose(previewCase);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>Nạp ca này vào Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
