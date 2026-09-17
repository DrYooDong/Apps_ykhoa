import React, { useState, useMemo } from 'react';
import {
  Columns3,
  Search,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { AnalysisResult, KnowledgeBase } from '../../types.ts';

interface DifferentialDiagnosisTableProps {
  results: AnalysisResult[];
  kb?: KnowledgeBase;
  onGoToProtocol: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const DifferentialDiagnosisTable: React.FC<DifferentialDiagnosisTableProps> = ({
  results,
  onGoToProtocol,
  onOpenVaultDrawer,
}) => {
  const [showMatrix, setShowMatrix] = useState(false);
  const [diffFilter, setDiffFilter] = useState<'all' | 'alert' | 'high'>('all');
  const [searchDiff, setSearchDiff] = useState('');
  const [expandedDiffs, setExpandedDiffs] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedDiffs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Differentials are all candidates excluding the top #1 lead diagnosis
  const rawDifferentials = useMemo(() => {
    return results.slice(1);
  }, [results]);

  const filteredDifferentials = useMemo(() => {
    return rawDifferentials.filter((d) => {
      // Filter by alert
      if (diffFilter === 'alert' && !d.b.baoDong) return false;
      // Filter by high probability (>= 20%)
      if (diffFilter === 'high' && d.pct < 20) return false;
      // Search query
      if (searchDiff.trim()) {
        const q = searchDiff.toLowerCase();
        return (
          d.b.ten.toLowerCase().includes(q) ||
          d.b.icd.toLowerCase().includes(q) ||
          d.b.nhom.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rawDifferentials, diffFilter, searchDiff]);

  if (rawDifferentials.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      {/* Header & Matrix Toggle Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center bg-slate-900 text-white text-xs font-bold font-mono-custom">
            Σ
          </span>
          <div>
            <h3 className="font-display text-sm font-bold text-slate-900 flex items-center gap-2">
              Chẩn đoán phân biệt
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                {rawDifferentials.length}
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Đối sánh và loại trừ các bệnh lý có triệu chứng trùng lặp
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Comparison Matrix Toggle */}
          {results.length > 1 && (
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                showMatrix
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5 text-blue-600" />
              <span>{showMatrix ? 'Ẩn ma trận so sánh' : 'So sánh đối đầu Top 3'}</span>
            </button>
          )}

          {/* Filter Pills */}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden p-0.5 bg-slate-100 text-xs">
            <button
              type="button"
              onClick={() => setDiffFilter('all')}
              className={`px-2.5 py-1 font-semibold rounded-md cursor-pointer transition-all ${
                diffFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setDiffFilter('alert')}
              className={`px-2.5 py-1 font-semibold rounded-md cursor-pointer transition-all flex items-center gap-1 ${
                diffFilter === 'alert'
                  ? 'bg-red-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-red-700'
              }`}
            >
              <span>⚑ Cấp cứu</span>
            </button>
            <button
              type="button"
              onClick={() => setDiffFilter('high')}
              className={`px-2.5 py-1 font-semibold rounded-md cursor-pointer transition-all ${
                diffFilter === 'high'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              ≥ 20%
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchDiff}
              onChange={(e) => setSearchDiff(e.target.value)}
              placeholder="Lọc tên, ICD..."
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 w-32 sm:w-44 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Head-to-Head Differential Comparison Matrix */}
      {showMatrix && results.length > 1 && (
        <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Columns3 className="w-4 h-4 text-blue-600" />
              <h4 className="font-display font-bold text-sm text-slate-800">
                Ma trận so sánh đối đầu (Differential Diagnosis Comparison Matrix)
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-medium">Đối sánh Top 3 chẩn đoán hàng đầu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {results.slice(0, 3).map((res, i) => (
              <div
                key={res.b.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  i === 0
                    ? 'bg-blue-50/60 border-blue-300 ring-1 ring-blue-300/60 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-900 line-clamp-1">{res.b.ten}</span>
                    <span className="font-mono-custom text-xs font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs shrink-0">
                      {res.pct}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-2.5 font-mono-custom flex items-center gap-1.5">
                    <span>ICD: {res.b.icd}</span>
                    {res.b.baoDong && (
                      <span className="text-red-600 font-bold">· ⚑ Cấp cứu</span>
                    )}
                  </div>

                  <div className="text-xs space-y-2.5">
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                        Đã khớp ({res.matched.length}):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {res.matched.slice(0, 4).map((m, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700 shadow-2xs"
                          >
                            {m.tc.ten}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                        Cần thêm để phân biệt:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {res.missing.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-900"
                          >
                            {m.tc.ten}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {i === 0 ? '★ Chẩn đoán sơ bộ' : `#${i + 1} Phân biệt`}
                  </span>
                  <button
                    type="button"
                    onClick={() => onGoToProtocol(res.b.id)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Phác đồ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Differential Cards List */}
      <div className="flex flex-col gap-3">
        {filteredDifferentials.length === 0 ? (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs">
            Không tìm thấy chẩn đoán phân biệt nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredDifferentials.map((diff) => {
            const isExpanded = expandedDiffs[diff.b.id] || false;
            const barColor =
              diff.pct >= 70 ? 'bg-blue-600' : diff.pct >= 40 ? 'bg-amber-500' : 'bg-slate-400';

            return (
              <div
                key={diff.b.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-3.5 sm:p-4 shadow-xs transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1 max-w-xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-bold text-sm text-slate-900">
                        {diff.b.ten}
                      </span>
                      {diff.b.baoDong && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-red-600" />
                          <span>⚑ KHÔNG THỂ BỎ QUA</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[10px] font-mono-custom bg-slate-800 text-white rounded-md">
                        {diff.b.icd}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {diff.b.ghiChuBaoDong ? `${diff.b.ghiChuBaoDong} · ` : ''}
                      Phù hợp {diff.matched.length}/{diff.b.dd.length} dữ kiện:{' '}
                      {diff.matched
                        .slice(0, 3)
                        .map((m) => m.tc.ten)
                        .join(', ')}
                      {diff.matched.length > 3 ? '...' : ''}
                    </div>
                  </div>

                  {/* Progress Bar & Actions */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end w-24 sm:w-28">
                      <span className="font-display font-bold text-base text-slate-800">
                        {diff.pct}%
                      </span>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor} transition-all duration-500`}
                          style={{ width: `${diff.pct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(diff.b.ten, diff.b.icd)}
                      className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      title={`Tra cứu công cụ lượng giá (CC), mã ICD-10 & phác đồ cho ${diff.b.ten}`}
                    >
                      <span>🧮</span>
                      <span className="hidden sm:inline">Thang điểm & ICD</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onGoToProtocol(diff.b.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>Phác đồ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expand / Collapse Details */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => toggleExpand(diff.b.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    <span>{isExpanded ? 'Thu gọn chi tiết' : 'Xem bằng chứng khớp & cần bổ sung'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 flex flex-col gap-2.5 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {diff.matched.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] flex items-center justify-between"
                          >
                            <span className="text-slate-800 font-medium">{m.tc.ten}</span>
                            <span className="font-mono-custom font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                              +{m.w}
                            </span>
                          </div>
                        ))}
                      </div>

                      {diff.missing.length > 0 && (
                        <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-[11px] text-slate-800">
                          <b className="text-amber-900 block mb-1">Cần thêm để phân biệt / loại trừ:</b>
                          <div className="flex flex-wrap gap-1.5">
                            {diff.missing
                              .sort((a, b) => b.w - a.w)
                              .slice(0, 5)
                              .map((m, mIdx) => (
                                <span
                                  key={mIdx}
                                  className="px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-md font-medium text-[10.5px]"
                                >
                                  {m.tc.ten} <span className="text-amber-700 font-bold">(+{m.w})</span>
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
