import React from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  HelpCircle,
  Layers,
  Stethoscope,
  Trash2,
  X,
} from 'lucide-react';
import { AnalysisResult, RoleType, TrieuChung } from '../../types.ts';

interface SuggestedQuestion {
  tc: TrieuChung;
  role: RoleType;
  w: number;
}

interface ClinicalCopilotSidebarProps {
  liveResults: AnalysisResult[];
  suggestedQuestions: SuggestedQuestion[];
  topResult: AnalysisResult | null;
  onQuestionAnswer: (tcId: string, isYes: boolean) => void;
  positiveSymptomsList: { id: string; name: string }[];
  negativeSymptomsList: { id: string; name: string }[];
  vitalsPills: { label: string; value: string; unit?: string }[];
  onChipClick: (id: string) => void;
  onRemoveNegated: (id: string) => void;
  onClearAllSelections: () => void;
  onRunAnalysis: () => void;
  onSaveToPostgres: () => void;
  onExportCase: () => void;
  onImportCase: (file: File) => void;
  onReset: () => void;
}

export const ClinicalCopilotSidebar: React.FC<ClinicalCopilotSidebarProps> = ({
  liveResults,
  suggestedQuestions,
  topResult,
  onQuestionAnswer,
  positiveSymptomsList,
  negativeSymptomsList,
  vitalsPills,
  onChipClick,
  onRemoveNegated,
  onClearAllSelections,
  onRunAnalysis,
  onSaveToPostgres,
  onExportCase,
  onImportCase,
  onReset,
}) => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-3.5">
      {/* Diagnostic Probability Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-display font-bold text-xs sm:text-sm text-slate-800">
              Suy luận CĐ tức thời
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-custom uppercase tracking-wider">
            Evidence Engine
          </span>
        </div>

        {liveResults.length > 0 ? (
          <div className="flex flex-col gap-3">
            {liveResults.slice(0, 3).map((res, idx) => (
              <div key={res.b.id} className="p-2.5 rounded-md bg-slate-50 border border-slate-200 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2 text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-slate-400 font-mono-custom">#{idx + 1}</span>
                      {res.b.ten}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-custom">
                      ICD-10: {res.b.icd} • {res.matched.length} bằng chứng trùng khớp
                    </span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span
                      className={`font-mono-custom font-bold text-sm ${
                        res.pct >= 70
                          ? 'text-blue-600'
                          : res.pct >= 40
                          ? 'text-amber-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {res.pct}%
                    </span>
                    {res.b.baoDong && (
                      <span className="text-red-700 font-bold text-[9px] px-1 py-0.2 bg-red-100 border border-red-300 rounded mt-0.5">
                        CẤP CỨU
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      res.pct >= 70 ? 'bg-blue-600' : res.pct >= 40 ? 'bg-amber-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${res.pct}%` }}
                  />
                </div>
              </div>
            ))}

            <button
              id="btn-sidebar-run-analysis"
              onClick={onRunAnalysis}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Xem bảng chứng cứ & phân biệt chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-500 flex flex-col items-center gap-1.5">
            <Stethoscope className="w-6 h-6 text-slate-300" />
            <span>Nhập DHST hoặc chọn triệu chứng để kích hoạt công cụ suy luận.</span>
          </div>
        )}

        {/* Interactive Clarifying Questions */}
        {suggestedQuestions.length > 0 && topResult && (
          <div className="mt-3.5 pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-[11px] text-slate-700 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Hỏi bệnh bổ sung — làm rõ «{topResult.b.ten}»:</span>
              </h4>
              <span className="text-[10px] text-blue-600 font-mono-custom">Trọng số cao</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {suggestedQuestions.map((q) => (
                <div
                  key={q.tc.id}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-md text-xs flex items-center justify-between gap-2 shadow-2xs"
                >
                  <div className="flex flex-col">
                    <span className="text-slate-800 text-[11.5px]">
                      BN có <b>{q.tc.ten}</b> không?
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {q.role === 'dt' ? 'Dấu chứng đặc trưng' : 'Dấu chứng gợi ý'} (+{q.w} điểm)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      id={`btn-q-yes-${q.tc.id}`}
                      onClick={() => onQuestionAnswer(q.tc.id, true)}
                      className="px-2 py-1 bg-blue-600 text-white text-[10.5px] font-semibold rounded hover:bg-blue-700 transition-all cursor-pointer shadow-xs"
                    >
                      Có (+)
                    </button>
                    <button
                      id={`btn-q-no-${q.tc.id}`}
                      onClick={() => onQuestionAnswer(q.tc.id, false)}
                      className="px-2 py-1 bg-white border border-slate-200 text-red-600 text-[10.5px] font-semibold rounded hover:bg-red-50 transition-all cursor-pointer shadow-xs"
                    >
                      Không (−)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Clinical Intake Stream: Bảng theo dõi & quản lý dữ kiện lâm sàng đã nạp */}
      <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 leading-none">
                Dữ kiện LS đã nạp
              </h3>
              <span className="text-[10.5px] text-slate-400 font-medium">
                Luồng dữ kiện đầu vào phục vụ suy luận
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {(positiveSymptomsList.length > 0 || negativeSymptomsList.length > 0) && (
              <button
                type="button"
                onClick={onClearAllSelections}
                className="w-6 h-6 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer transition-colors border border-red-200/60"
                title="Xóa tất cả triệu chứng đã chọn và loại trừ"
                aria-label="Xóa tất cả triệu chứng"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="px-2 py-0.5 rounded font-mono-custom text-[10.5px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              {positiveSymptomsList.length} (+) · {negativeSymptomsList.length} (−)
            </span>
          </div>
        </div>

        {/* Dấu chứng dương tính (+) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-blue-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Dấu chứng dương tính ({positiveSymptomsList.length}):</span>
            </span>
          </div>
          {positiveSymptomsList.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1">
              {positiveSymptomsList.map((item) => (
                <span
                  key={item.id}
                  className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200/80 rounded-md font-medium text-[11px] flex items-center gap-1 group"
                >
                  <Check className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>{item.name}</span>
                  <button
                    type="button"
                    onClick={() => onChipClick(item.id)}
                    className="text-blue-400 hover:text-red-600 ml-0.5 opacity-60 group-hover:opacity-100 cursor-pointer"
                    title="Bỏ chọn triệu chứng này"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic text-[11px] py-1">
              Chưa ghi nhận triệu chứng dương tính. Chọn ở bảng phân loại bên trái hoặc dán bệnh sử.
            </p>
          )}
        </div>

        {/* Dữ kiện âm tính loại trừ (−) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-rose-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600"></span>
              <span>Dữ kiện loại trừ / Phủ định ({negativeSymptomsList.length}):</span>
            </span>
          </div>
          {negativeSymptomsList.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto pr-1">
              {negativeSymptomsList.map((item) => (
                <span
                  key={item.id}
                  className="px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200/80 rounded-md font-medium text-[11px] flex items-center gap-1 group"
                >
                  <X className="w-3 h-3 text-rose-600 shrink-0" />
                  <span>Không: {item.name}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveNegated(item.id)}
                    className="text-rose-400 hover:text-rose-700 ml-0.5 opacity-60 group-hover:opacity-100 cursor-pointer"
                    title="Bỏ dữ kiện phủ định này"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic text-[11px] py-1">
              Chưa có dữ kiện phủ định. Bấm nút [−] ở danh sách triệu chứng hoặc trả lời "Không" ở câu hỏi làm rõ.
            </p>
          )}
        </div>

        {/* Tóm lược sinh hiệu đã ghi nhận */}
        {vitalsPills.length > 0 && (
          <div className="pt-2 border-t border-slate-100">
            <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-blue-600" />
              <span>Sinh hiệu hiện thời:</span>
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-center font-mono-custom">
              {vitalsPills.map((vp, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-1.5">
                  <span className="block text-[9.5px] text-slate-500 font-sans">{vp.label}</span>
                  <b className="text-xs text-slate-900">
                    {vp.value}{' '}
                    <span className="text-[10px] font-normal text-slate-500 font-sans">{vp.unit}</span>
                  </b>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
