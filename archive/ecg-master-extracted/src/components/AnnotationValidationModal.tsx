import { AnnotationValidationReport } from "../types";
import {
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  BookOpen,
  RotateCcw,
  X,
  Award,
  TrendingUp,
} from "lucide-react";

interface AnnotationValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: AnnotationValidationReport | null;
  lead: string;
  onClearAnnotations: () => void;
  isLoading?: boolean;
}

export function AnnotationValidationModal({
  isOpen,
  onClose,
  report,
  lead,
  onClearAnnotations,
  isLoading = false,
}: AnnotationValidationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/30 rounded-xl border border-indigo-400/40">
              <BrainCircuit className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Đánh Giá &amp; Chấm Điểm Gán Nhãn Sóng Của AI
                <span className="text-xs font-mono font-bold bg-indigo-500/40 px-2 py-0.5 rounded border border-indigo-400/30 text-indigo-100">
                  Chuyển đạo {lead}
                </span>
              </h2>
              <p className="text-xs text-indigo-200">
                Đối chiếu nhãn thủ công của bạn với mô hình toán học giải phẫu điện tim &amp; BS Nguyễn Tôn Kinh Thi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-indigo-200 hover:bg-white/10 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-700 animate-pulse">
                AI đang phân tích các vị trí nhãn và kiểm tra hình thái học sóng...
              </p>
            </div>
          ) : !report ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              Không có dữ liệu đánh giá gán nhãn.
            </div>
          ) : (
            <>
              {/* Score Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border bg-gradient-to-r from-slate-50 to-indigo-50/50 border-indigo-100">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black text-white shadow-md ${
                      report.overallScore >= 85
                        ? "bg-gradient-to-tr from-emerald-600 to-teal-500"
                        : report.overallScore >= 65
                        ? "bg-gradient-to-tr from-amber-500 to-yellow-400"
                        : "bg-gradient-to-tr from-rose-600 to-red-500"
                    }`}
                  >
                    <span className="text-xl leading-none">{report.overallScore}</span>
                    <span className="text-[10px] font-normal uppercase opacity-90">/ 100</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">
                        {report.overallScore >= 85
                          ? "Kỹ Năng Nhận Diện Xuất Sắc"
                          : report.overallScore >= 65
                          ? "Kỹ Năng Đạt Chuẩn"
                          : "Cần Cải Thiện Vị Trí Nhãn"}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                        <Award className="w-3.5 h-3.5" />
                        Đạt {report.passedCount}/{report.totalAnnotations} mốc
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{report.feedback}</p>
                  </div>
                </div>
              </div>

              {/* Detail Items Breakdown */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  Chi Tiết Từng Mốc Sóng Đã Chấm:
                </h4>

                <div className="space-y-2">
                  {report.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-slate-900 text-white shadow-2xs">
                            Sóng {item.waveType}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            Thời điểm chấm: {item.actualTimeMs} ms
                          </span>
                          <span className="text-xs text-slate-400">
                            (Chuẩn: ~{item.expectedTimeMs} ms)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {item.status === "EXACT" ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Chính Xác (100đ)
                            </span>
                          ) : item.status === "CLOSE" ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Khá Gần (75đ)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                              <XCircle className="w-3.5 h-3.5" />
                              Lệch Vị Trí ({item.score}đ)
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 font-medium">
                        {item.message}
                      </p>

                      <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <b className="text-slate-700">Hình thái học: </b>
                        {item.morphologyEvaluation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Textbook Knowledge Reference */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-1 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Lời Khuyên Của Chuyên Gia (BS Nguyễn Tôn Kinh Thi):</span>
                </div>
                <p className="font-medium text-amber-900 mt-1 leading-relaxed">
                  {report.clinicalPearl}
                </p>
                <div className="text-[11px] text-amber-800/80 font-bold mt-1">
                  &bull; Tham khảo: {report.guidanceChapter}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button
            onClick={() => {
              onClearAnnotations();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Xóa Nhãn &amp; Chấm Lại</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs transition"
          >
            Đóng &amp; Giữ Lại Nhãn
          </button>
        </div>
      </div>
    </div>
  );
}
