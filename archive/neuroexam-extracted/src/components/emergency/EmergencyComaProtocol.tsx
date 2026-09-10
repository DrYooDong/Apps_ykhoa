import React, { useState } from "react";
import {
  ShieldAlert,
  Activity,
  HeartPulse,
  Brain,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
  RotateCcw,
  Sparkles,
  Wind,
  Eye,
  Crosshair,
  Stethoscope
} from "lucide-react";

interface JCSLevel {
  grade: "Grade I" | "Grade II" | "Grade III";
  score: number;
  labelVi: string;
  labelEn: string;
  description: string;
  stimulusRequired: string;
  equivalentGCS: string;
  clinicalSignificance: string;
}

const JCS_DATA: JCSLevel[] = [
  // Grade I (1 digit): Spontaneously aroused
  {
    grade: "Grade I",
    score: 1,
    labelVi: "JCS 1: Tỉnh táo nhưng hơi lơ mơ, không hoàn toàn minh mẫn",
    labelEn: "Slightly unclear, alert but not fully clear-headed",
    description: "Bệnh nhân tự mở mắt và nhận biết môi trường, nhưng phản xạ tư duy chậm chạp, thiếu sắc sảo.",
    stimulusRequired: "Tự phát (Không cần kích thích)",
    equivalentGCS: "GCS 14 - 15",
    clinicalSignificance: "Giai đoạn đầu của rối loạn ý thức nhẹ, tác dụng phụ của thuốc an thần hoặc giai đoạn hồi tỉnh."
  },
  {
    grade: "Grade I",
    score: 2,
    labelVi: "JCS 2: Mất định hướng thời gian, không gian, hoặc bản thân",
    labelEn: "Poorly oriented in time, place, or person",
    description: "Tự mở mắt, trả lời được câu hỏi nhưng nhầm lẫn ngày tháng, địa điểm nằm viện hoặc nhận diện người thân.",
    stimulusRequired: "Tự phát (Không cần kích thích)",
    equivalentGCS: "GCS 13 - 14",
    clinicalSignificance: "Hội chứng lú lẫn cấp tính (Delirium), rối loạn chuyển hóa sớm, chấn thương sọ não nhẹ."
  },
  {
    grade: "Grade I",
    score: 3,
    labelVi: "JCS 3: Không thể tự nêu họ tên và ngày tháng năm sinh của mình",
    labelEn: "Unable to tell own name and date of birth",
    description: "Bệnh nhân tự mở mắt nhưng hoàn toàn mất định hướng bản thân khi được hỏi tên tuổi.",
    stimulusRequired: "Tự phát (Không cần kích thích)",
    equivalentGCS: "GCS 12 - 13",
    clinicalSignificance: "Suy giảm nhận thức đáng kể, nguy cơ tiến triển thành ngủ gà nếu không can thiệp kịp thời."
  },

  // Grade II (2 digits): Aroused by stimulus
  {
    grade: "Grade II",
    score: 10,
    labelVi: "JCS 10: Mở mắt dễ dàng khi gọi thông thường",
    labelEn: "Opens eyes easily by verbal call",
    description: "Nhắm mắt khi để yên (ngủ gà/Somnolence). Mở mắt ngay khi bác sĩ gọi tên với giọng bình thường.",
    stimulusRequired: "Lời nói thông thường",
    equivalentGCS: "GCS 11 - 12",
    clinicalSignificance: "Tình trạng lơ mơ (Lethargy), duy trì được thức tỉnh một lúc rồi ngủ lịm đi nếu để yên."
  },
  {
    grade: "Grade II",
    score: 20,
    labelVi: "JCS 20: Mở mắt khi gọi to hoặc lay lắc cơ thể",
    labelEn: "Opens eyes in response to loud call or shaking body",
    description: "Cần gọi to nhiều lần hoặc lay mạnh vai bệnh nhân mới mở mắt nhìn thầy thuốc.",
    stimulusRequired: "Tiếng gọi to hoặc lay cơ thể",
    equivalentGCS: "GCS 9 - 10",
    clinicalSignificance: "Ngủ sững (Stupor), ức chế dẫn truyền lưới hướng lên thân não đáng kể."
  },
  {
    grade: "Grade II",
    score: 30,
    labelVi: "JCS 30: Hầu như chỉ mở mắt khi kích thích đau lặp lại kết hợp gọi to",
    labelEn: "Barely opens eyes by painful stimulus plus repetitive calling",
    description: "Cần kích thích đau liên tục (ấn gốc móng, ấn rãnh trên hốc mắt) kết hợp gọi to mới mở hé mắt.",
    stimulusRequired: "Kích thích đau lặp lại + gọi to",
    equivalentGCS: "GCS 7 - 8 (Bắt đầu ngưỡng đe dọa đường thở)",
    clinicalSignificance: "Bán hôn mê (Semicoma), chỉ số cảnh báo cần chuẩn bị kiểm soát đường thở và tìm kiếm nguyên nhân cấp."
  },

  // Grade III (3 digits): Not aroused even by stimulus
  {
    grade: "Grade III",
    score: 100,
    labelVi: "JCS 100: Đáp ứng với kích thích đau bằng cách gạt tay/đẩy ra",
    labelEn: "Responds to painful stimulus by push away / throw off",
    description: "Không mở mắt dù kích thích mạnh, nhưng tay có cử động có chủ đích nhắm gạt nguồn kích thích đau.",
    stimulusRequired: "Kích thích đau mạnh (Nociceptive stimulus)",
    equivalentGCS: "GCS 6 - 7",
    clinicalSignificance: "Hôn mê thực sự. Bán cầu đại não và đường dẫn truyền vận động còn khả năng định vị kích thích đau."
  },
  {
    grade: "Grade III",
    score: 200,
    labelVi: "JCS 200: Đáp ứng với kích thích đau bằng co rút nhẹ hoặc nhăn mặt",
    labelEn: "Responds to painful stimulus by small movements or grimacing",
    description: "Không định vị được điểm đau; chỉ có cử động co rút chi không nhắm đích hoặc cau mày nhăn mặt.",
    stimulusRequired: "Kích thích đau mạnh",
    equivalentGCS: "GCS 4 - 5",
    clinicalSignificance: "Hôn mê sâu. Vỏ não gần như mất hoàn toàn kết nối với thân não, chỉ còn phản xạ thân não và tủy."
  },
  {
    grade: "Grade III",
    score: 300,
    labelVi: "JCS 300: Hoàn toàn bất động, không đáp ứng với kích thích đau",
    labelEn: "No response at all, even to strong painful stimulus",
    description: "Hoàn toàn không có cử động, liệt mềm tứ chi, không nhăn mặt trước bất kỳ kích thích đau dữ dội nào.",
    stimulusRequired: "Kích thích đau dữ dội",
    equivalentGCS: "GCS 3 (Sâu nhất)",
    clinicalSignificance: "Hôn mê cực sâu. Tổn thương lan tỏa toàn bộ bán cầu và thân não, cần tiến hành đánh giá phản xạ thân não và tiêu chuẩn chết não."
  }
];

export const EmergencyComaProtocol: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"jcs" | "flowchart" | "breathing" | "brainstem">("jcs");

  // JCS State
  const [selectedJcsScore, setSelectedJcsScore] = useState<number>(10);
  const [jcsSuffixR, setJcsSuffixR] = useState<boolean>(false); // Restlessness
  const [jcsSuffixI, setJcsSuffixI] = useState<boolean>(false); // Incontinence
  const [jcsSuffixA, setJcsSuffixA] = useState<boolean>(false); // Akinetic mutism/apallic

  // Flowchart Interactive State
  const [flowAsymmetry, setFlowAsymmetry] = useState<boolean | null>(null);
  const [flowMeningeal, setFlowMeningeal] = useState<boolean | null>(null);

  const currentJcs = JCS_DATA.find((j) => j.score === selectedJcsScore) || JCS_DATA[3];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-800/60 rounded-2xl p-4 md:p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-mono font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SHIBASAKI & HALLETT (OXFORD 2016) • CHƯƠNG 4 & CHƯƠNG 29</span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              Quy Trình Tiếp Cận Hôn Mê & Thang Điểm Japan Coma Scale (JCS)
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Lưu đồ chẩn đoán cấp cứu 4 bước (Hình 29-1), thang điểm tri giác <strong>3-3-9 JCS kinh điển</strong> Nhật Bản, nhận diện 5 kiểu thở định khu thân não và bộ phản xạ xác định tổn thương.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-rose-900/60 border border-rose-700/60 text-rose-200 text-xs font-mono font-bold">
              STAT PROTOCOL
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-tabs */}
      <div className="bg-white border border-slate-200 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto shadow-2xs">
        <button
          onClick={() => setActiveSection("jcs")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSection === "jcs"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Thang Điểm Japan Coma Scale (JCS 3-3-9)</span>
        </button>

        <button
          onClick={() => setActiveSection("flowchart")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSection === "flowchart"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Crosshair className="w-4 h-4" />
          <span>Lưu Đồ Tiếp Cận Hôn Mê (Figure 29-1)</span>
        </button>

        <button
          onClick={() => setActiveSection("breathing")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSection === "breathing"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>5 Kiểu Thở Bệnh Lý Thân Não</span>
        </button>

        <button
          onClick={() => setActiveSection("brainstem")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
            activeSection === "brainstem"
              ? "bg-rose-600 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Bộ Phản Xạ Thân Não & Chết Não</span>
        </button>
      </div>

      {/* SECTION 1: JAPAN COMA SCALE (JCS 3-3-9 SYSTEM) */}
      {activeSection === "jcs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Interactive JCS Matrix */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                    JCS
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Bảng Đánh Giá Ý Thức Japan Coma Scale (Bảng 4-3 Shibasaki)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Hệ thống 3-3-9: Phân loại theo 1 chữ số, 2 chữ số và 3 chữ số
                    </p>
                  </div>
                </div>
              </div>

              {/* Group 1: Grade I (1 digit) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Nhóm I: Bệnh nhân tự tỉnh (Spontaneously Aroused) - 1 Chữ Số
                  </span>
                </div>
                <div className="space-y-1.5">
                  {JCS_DATA.filter((d) => d.grade === "Grade I").map((item) => {
                    const isSelected = item.score === selectedJcsScore;
                    return (
                      <button
                        key={item.score}
                        onClick={() => setSelectedJcsScore(item.score)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-emerald-50 border-emerald-500 shadow-2xs text-emerald-950"
                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.labelVi}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                            JCS {item.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 2: Grade II (2 digits) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    Nhóm II: Cần kích thích mới mở mắt (Aroused by Stimulus) - 2 Chữ Số
                  </span>
                </div>
                <div className="space-y-1.5">
                  {JCS_DATA.filter((d) => d.grade === "Grade II").map((item) => {
                    const isSelected = item.score === selectedJcsScore;
                    return (
                      <button
                        key={item.score}
                        onClick={() => setSelectedJcsScore(item.score)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-amber-50 border-amber-500 shadow-2xs text-amber-950"
                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.labelVi}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                            JCS {item.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Group 3: Grade III (3 digits) */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                    Nhóm III: Không thức tỉnh dù kích thích mạnh (Not Aroused) - 3 Chữ Số
                  </span>
                </div>
                <div className="space-y-1.5">
                  {JCS_DATA.filter((d) => d.grade === "Grade III").map((item) => {
                    const isSelected = item.score === selectedJcsScore;
                    return (
                      <button
                        key={item.score}
                        onClick={() => setSelectedJcsScore(item.score)}
                        className={`w-full text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-rose-50 border-rose-500 shadow-2xs text-rose-950"
                            : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.labelVi}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                            JCS {item.score}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{item.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* JCS Modifier Suffixes (R, I, A) */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Ký Hiệu Bổ Sung Theo Quy Chuẩn Y Tế Nhật Bản (Suffix Modifiers):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setJcsSuffixR(!jcsSuffixR)}
                    className={`p-2 rounded-xl border text-xs text-left transition-all ${
                      jcsSuffixR
                        ? "bg-rose-50 border-rose-400 text-rose-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div className="font-bold">Hậu tố -R (Restless)</div>
                    <div className="text-[10px] text-slate-500">Kích động, bồn chồn vật vã</div>
                  </button>

                  <button
                    onClick={() => setJcsSuffixI(!jcsSuffixI)}
                    className={`p-2 rounded-xl border text-xs text-left transition-all ${
                      jcsSuffixI
                        ? "bg-rose-50 border-rose-400 text-rose-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div className="font-bold">Hậu tố -I (Incontinence)</div>
                    <div className="text-[10px] text-slate-500">Tiểu tiện/đại tiện không tự chủ</div>
                  </button>

                  <button
                    onClick={() => setJcsSuffixA(!jcsSuffixA)}
                    className={`p-2 rounded-xl border text-xs text-left transition-all ${
                      jcsSuffixA
                        ? "bg-rose-50 border-rose-400 text-rose-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <div className="font-bold">Hậu tố -A (Akinetic mutism)</div>
                    <div className="text-[10px] text-slate-500">Câm bất động / Hội chứng mất vỏ</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: JCS Result & Detailed Clinical Translation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Kết Quả Đánh Giá Ý Thức
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  BEDSIDE OUTPUT
                </span>
              </div>

              {/* JCS Big Badge */}
              <div className="text-center p-4 rounded-xl bg-slate-900 text-white space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-slate-400 font-mono">
                  ĐIỂM JAPAN COMA SCALE
                </div>
                <div className="text-3xl font-black tracking-tight text-amber-400 font-mono">
                  JCS {selectedJcsScore}
                  {jcsSuffixR && "-R"}
                  {jcsSuffixI && "-I"}
                  {jcsSuffixA && "-A"}
                </div>
                <div className="text-xs text-slate-300 font-semibold">{currentJcs.labelVi}</div>
              </div>

              {/* Equivalent GCS & Severity */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-medium block">Tương Đương GCS:</span>
                  <span className="text-sm font-bold text-indigo-700 font-mono">
                    {currentJcs.equivalentGCS}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-0.5">
                  <span className="text-[11px] text-slate-500 font-medium block">Mức Độ Kích Thích:</span>
                  <span className="text-xs font-bold text-slate-800">
                    {currentJcs.stimulusRequired}
                  </span>
                </div>
              </div>

              {/* Clinical Significance */}
              <div className="space-y-1.5 bg-rose-50/60 p-3.5 rounded-xl border border-rose-200 text-xs">
                <span className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Ý Nghĩa Lâm Sàng & Khuyến Cáo Xử Trí:</span>
                </span>
                <p className="text-rose-800 leading-relaxed text-[11px]">
                  {currentJcs.clinicalSignificance}
                </p>
                {selectedJcsScore >= 30 && (
                  <p className="text-[11px] text-rose-700 font-semibold pt-1 border-t border-rose-200">
                    ⚠️ Ngưỡng JCS ≥ 30 tương đương GCS ≤ 8: Nguy cơ mất phản xạ nuốt và tắc nghẽn đường thở, cần chuẩn bị hút đờm dãi và đặt nội khí quản bảo vệ đường thở.
                  </p>
                )}
              </div>

              {/* Scientific comparison note */}
              <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 block">
                  Ưu điểm của thang điểm JCS theo Shibasaki (2016):
                </span>
                <span>
                  JCS chia ranh giới sinh lý học rất rõ ràng: <strong>1 chữ số</strong> là vỏ não còn tự duy trì thức tỉnh; <strong>2 chữ số</strong> là cần kích hoạt hệ lưới thân não qua âm thanh/lay lắc; <strong>3 chữ số</strong> là suy sụp hoàn toàn hệ lưới (hôn mê thực sự).
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SHIBASAKI COMA FLOWCHART (FIGURE 29-1) */}
      {activeSection === "flowchart" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-rose-600" />
                <span>Lưu Đồ Tiếp Cận Bệnh Nhân Rối Loạn Ý Thức (Figure 29-1 Shibasaki)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thực hiện phân nhánh từng bước theo tư duy lâm sàng có định hướng giả thuyết (Hypothesis-driven examination)
              </p>
            </div>
            <button
              onClick={() => {
                setFlowAsymmetry(null);
                setFlowMeningeal(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thiết lập lại</span>
            </button>
          </div>

          {/* Step 1: Vital Signs & Stabilization */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-rose-400">
                BƯỚC 1: KHẲNG ĐỊNH SINH HIỆU & HỒI SỨC BAN ĐẦU (A-B-C)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                STAT
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-white block mb-0.5">1. Đường thở & Hô hấp:</strong>
                Kiểm tra thông khí, hút đờm dãi. Chuẩn bị đặt NKQ nếu ứ đọng dịch hoặc GCS ≤ 8 / JCS ≥ 30.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-white block mb-0.5">2. Tuần hoàn & Đường truyền:</strong>
                Lập 2 đường truyền tĩnh mạch lớn, đo huyết áp, ECG theo dõi loạn nhịp tim.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-amber-400 block mb-0.5">3. Quy tắc Vàng Shibasaki:</strong>
                Luôn tiêm <strong>Thiamine (Vitamin B1 100mg IV) TRƯỚC</strong> khi truyền Glucose để tránh thúc đẩy Bệnh não Wernicke cấp (Box 74).
              </div>
            </div>
          </div>

          {/* Step 2: Check Asymmetry */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[11px] font-bold">
                  2
                </span>
                <span>Khám Dấu Thần Kinh Bất Đối Xứng (Asymmetry of eyes, face, extremities):</span>
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <p>• <strong>Mắt:</strong> Có liếc liên hợp (Conjugate deviation) sang một bên không? (Vỏ não trán: nhìn về bên tổn thương; Cầu não PPRF: nhìn về bên đối diện; Đồi thị: nhìn xuống trong).</p>
              <p>• <strong>Mặt:</strong> Nếp mũi má mất đối xứng, lông mi bên liệt lộ ra ngoài khi nhắm (Ciliary sign)?</p>
              <p>• <strong>Tứ chi:</strong> Nghiệm pháp nâng thả rơi tay chân (Flaccid drop test) bên liệt rơi nhanh và nặng nề hơn; Trương lực cơ giảm, phản xạ gân xương bất đối xứng hoặc Babinski (+)?</p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setFlowAsymmetry(true);
                  setFlowMeningeal(null);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  flowAsymmetry === true
                    ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                CÓ BẤT ĐỐI XỨNG (Asymmetry YES)
              </button>

              <button
                onClick={() => {
                  setFlowAsymmetry(false);
                  setFlowMeningeal(null);
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  flowAsymmetry === false
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                KHÔNG CÓ BẤT ĐỐI XỨNG (Asymmetry NO)
              </button>
            </div>
          </div>

          {/* Outcome 2A: Asymmetry YES */}
          {flowAsymmetry === true && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>KẾT LUẬN: ĐỊNH HƯỚNG TỔN THƯƠNG CẤU TRÚC THỰC THỂ KHU TRÚ (Organic Focal Lesion)</span>
              </div>
              <p className="text-rose-800 leading-relaxed">
                Khẳng định có tổn thương bán cầu đối bên hoặc thân não. <strong>Chỉ định chụp Cắt lớp vi tính (CT) hoặc Cộng hưởng từ sọ não (MRI) khẩn cấp!</strong>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-rose-900">
                <div className="p-2 bg-white rounded-lg border border-rose-200">
                  • Xuất huyết não (ICH) / Xuất huyết thân não
                  <br />• Nhồi máu não diện rộng cấp tính
                </div>
                <div className="p-2 bg-white rounded-lg border border-rose-200">
                  • Tụ máu dưới màng cứng (SDH) / Ngoài màng cứng (EDH)
                  <br />• Thoát vị não chèn ép thân não (Herniation)
                </div>
              </div>
            </div>
          )}

          {/* Step 3: If Asymmetry NO -> Check Meningeal Signs */}
          {flowAsymmetry === false && (
            <div className="space-y-2.5 pt-3 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center text-[11px] font-bold">
                  3
                </span>
                <span>Khám Dấu Hiệu Kích Thích Màng Não (Meningeal Irritation Signs):</span>
              </span>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Khám <strong>Cổ gượng (Nuchal stiffness)</strong> và <strong>Dấu Kernig</strong>.
                <br />
                <em>Lưu ý của GS. Shibasaki:</em> Trong Xuất huyết dưới nhện (SAH), dấu cổ gượng có thể <strong>chưa xuất hiện</strong> trong 24 giờ đầu sau khởi phát!
              </p>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => setFlowMeningeal(true)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    flowMeningeal === true
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  CÓ DẤU MÀNG NÃO (Meningeal YES)
                </button>

                <button
                  onClick={() => setFlowMeningeal(false)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                    flowMeningeal === false
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  KHÔNG CÓ DẤU MÀNG NÃO (Meningeal NO)
                </button>
              </div>
            </div>
          )}

          {/* Outcome 3A: Meningeal YES */}
          {flowMeningeal === true && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <Info className="w-4 h-4 text-amber-600" />
                <span>XUẤT HUYẾT DƯỚI NHỆN (SAH) HOẶC VIÊM MÀNG NÃO (Meningitis)</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                1. <strong>Chụp CT sọ não không cản quang khẩn:</strong> Tìm máu khoang dưới nhện (bể đáy, rãnh Sylvius).
                <br />
                2. <strong>Nếu CT sọ não (-):</strong> Thực hiện <strong>Chọc dò tủy sống (Lumbar Puncture)</strong> để xét nghiệm tế bào, protein, vi sinh và phát hiện hồng cầu/dịch vàng (xanthochromia).
              </p>
            </div>
          )}

          {/* Outcome 3B: Meningeal NO -> Step 4: Metabolic / Toxic / Anoxic */}
          {flowMeningeal === false && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-300 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-950 font-bold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>BƯỚC 4: HƯỚNG TỚI NGUYÊN NHÂN CHUYỂN HÓA / NHIỄM ĐỘC / ĐIỆN NÃO ĐỒ (EEG)</span>
              </div>
              <p className="text-blue-900 leading-relaxed">
                Khi không có dấu bất đối xứng và không có dấu màng não, hôn mê thường do tác động toàn thể lên hệ lưới vỏ não:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-blue-900">
                <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                  <strong>• Xét nghiệm sinh hóa máu khẩn:</strong> Đường huyết (hạ/tăng ALTT), Na/K/Ca, men gan, Amoniac máu (NH3), Creatinin, Khí máu động mạch (ABG), lưu mẫu máu tìm độc chất/thuốc ngủ.
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                  <strong>• Điện não đồ (EEG):</strong>
                  <br />- Sóng ba pha (Triphasic waves) $\rightarrow$ Điển hình bệnh não gan.
                  <br />- Phóng điện nhịp đồng bộ (PSD) $\rightarrow$ Bệnh Creutzfeldt-Jakob hoặc sau ngưng tim thiếu oxy não.
                  <br />- Phát hiện Trạng thái động kinh không co giật (NCSE).
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: 5 BRAINSTEM RESPIRATORY PATTERNS */}
      {activeSection === "breathing" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-600" />
                <span>5 Kiểu Thở Bệnh Lý Định Khu Tổn Thương Thân Não (Chương 29-5C Shibasaki)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Trung tâm hô hấp phân bố dọc thân não từ cầu não (Pontine respiratory center) đến hành não (Medullary respiratory center / Ventral group)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Cheyne-Stokes */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">1. Thở Cheyne-Stokes</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Gian não / Thoát vị lều sớm
                  </span>
                </div>
                {/* SVG Visual of Pattern */}
                <div className="h-14 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40">
                    <path
                      d="M0,20 Q10,18 20,20 Q30,15 40,20 Q50,10 60,20 Q70,5 80,20 Q90,12 100,20 Q110,17 120,20 L160,20 Q170,18 180,20 Q190,15 200,20 Q210,10 220,20 Q230,5 240,20 Q250,12 260,20 Q270,17 280,20 L300,20"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thở tăng dần biên độ đến cực đỉnh rồi giảm dần, tiếp nối bằng một khoảng ngừng thở (apnea) ngắn. Gặp trong tổn thương bán cầu hai bên, gian não, hoặc thoát vị qua lều giai đoạn sớm.
                </p>
              </div>

              {/* 2. Central Neurogenic Hyperventilation */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">2. Tăng Thông Khí Trung Ương</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                    Cầu não giữa (Mid-Pons)
                  </span>
                </div>
                <div className="h-14 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40">
                    <path
                      d="M0,20 Q7,5 15,20 Q22,35 30,20 Q37,5 45,20 Q52,35 60,20 Q67,5 75,20 Q82,35 90,20 Q97,5 105,20 Q112,35 120,20 Q127,5 135,20 Q142,35 150,20 Q157,5 165,20 Q172,35 180,20 Q187,5 195,20 Q202,35 210,20 Q217,5 225,20 Q232,35 240,20 Q247,5 255,20 Q262,35 270,20 Q277,5 285,20 Q292,35 300,20"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thở nhanh sâu liên tục, tần số 40 - 70 lần/phút cả khi ngủ, PaCO2 giảm nặng, kiềm hô hấp. Thường do u hoặc tổn thương cầu não giữa kích thích trung tâm hô hấp.
                </p>
              </div>

              {/* 3. Apneustic Breathing */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">3. Thở Ngắt Quãng (Apneustic)</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    Cầu não dưới (Caudal Pons)
                  </span>
                </div>
                <div className="h-14 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40">
                    <path
                      d="M0,20 L15,5 L65,5 L75,20 L100,20 L115,5 L165,5 L175,20 L200,20 L215,5 L265,5 L275,20 L300,20"
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ngừng thở ở thì hít vào sâu (chuột rút thì hít vào 2-3 giây) rồi thở ra đột ngột. Tổn thương trung tâm điều hòa thở (Pneumotaxic center) tại cầu não dưới.
                </p>
              </div>

              {/* 4. Ataxic / Biot Breathing */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-rose-700">4. Thở Thất Điều (Ataxic / Biot)</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                    Hành não (Medulla - Báo Động Ngừng Thở)
                  </span>
                </div>
                <div className="h-14 w-full bg-white rounded-lg border border-slate-200 p-2 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 40">
                    <path
                      d="M0,20 Q15,2 30,20 Q40,12 50,20 L110,20 Q120,30 130,20 Q135,5 140,20 Q150,38 160,20 L230,20 Q240,8 250,20 L300,20"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed font-medium">
                  Kiểu thở hoàn toàn hỗn loạn về cả biên độ lẫn khoảng cách nhịp, ngắt quãng bất thường. Tổn thương trung tâm tạo nhịp hành não. <strong>Bệnh nhân có thể ngừng thở đột ngột bất kỳ lúc nào!</strong>
                </p>
              </div>
            </div>

            {/* 5. Ondine's Curse */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>5. Hội chứng Lời Nguyền Ondine (Ondine's Curse):</span>
              </span>
              <p className="text-[11px] leading-relaxed">
                Mất hoàn toàn phản xạ tự động điều hòa hô hấp của hành não. Khi tỉnh, bệnh nhân thở có ý thức được; nhưng ngay khi đi vào giấc ngủ hoặc giảm độ tỉnh táo, hô hấp lập tức ngừng trệ dẫn đến tử vong nếu không thở máy.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: BRAINSTEM REFLEXES & BRAIN DEATH */}
      {activeSection === "brainstem" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span>Khám Bộ Phản Xạ Thân Não Từ Trên Xuống Dưới (Brainstem Reflexes - Chương 29-5C)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Trình tự khám chuẩn từ Trung não $\rightarrow$ Cầu não $\rightarrow$ Hành não để định vị tầng tổn thương hoặc xác định Chết não (Brain Death).
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* 1. Midbrain */}
            <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-indigo-950 font-bold">1. Phản Xạ Ánh Sáng Đồng Tử (Light Reflex)</strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-200 text-indigo-900 font-bold">
                  TRUNG NÃO (Midbrain)
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Cung phản xạ:</strong> Dây II (hướng tâm) $\rightarrow$ Nhân trước mái $\rightarrow$ Nhân Edinger-Westphal 2 bên $\rightarrow$ Dây III (ly tâm).
                <br />
                • <strong>Lâm sàng:</strong> Đồng tử giãn to mất phản xạ ánh sáng 1 bên gợi ý tụt não qua lều chèn ép dây III; Mất phản xạ 2 bên báo hiệu tổn thương nặng trung não hoặc chết não.
              </p>
            </div>

            {/* 2. Pons - Corneal */}
            <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-teal-950 font-bold">2. Phản Xạ Giác Mạc (Corneal Reflex)</strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-200 text-teal-900 font-bold">
                  CẦU NÃO (Pons)
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Cung phản xạ:</strong> Dây V1 (nhánh mắt của dây V hướng tâm) $\rightarrow$ Nhân tủy dây V $\rightarrow$ Nhân vận động dây VII 2 bên (ly tâm).
                <br />
                • <strong>Kỹ thuật:</strong> Vê nhẹ sợi bông hoặc giấy chạm vào rìa giác mạc từ phía bên ngoài để tránh phản xạ thị giác. Quan sát đáp ứng nhắm mắt cả hai bên.
              </p>
            </div>

            {/* 3. Pons / Midbrain - Doll's eye & Caloric */}
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-amber-950 font-bold">3. Dấu Mắt Búp Bê & Nghiệm Pháp Bơm Nước Lạnh (Oculocephalic & Caloric)</strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                  CẦU NÃO - TRUNG NÃO
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Mắt búp bê (Doll's eye):</strong> Xoay đầu bệnh nhân sang ngang, hai mắt liếc nghịch hướng $\rightarrow$ Phản xạ (+), cầu não nguyên vẹn. Mắt cố định không di chuyển theo đầu $\rightarrow$ Phản xạ (-).
                <br />
                • <strong>Caloric Test:</strong> Bơm 5-10 mL nước đá (0-10°C) vào ống tai ngoài. Bình thường mắt liếc chậm về bên tai bơm nước; Mất hoàn toàn đáp ứng mắt gợi ý chết não.
              </p>
            </div>

            {/* 4. Medulla - Gag & Cough */}
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-rose-950 font-bold">4. Phản Xạ Nôn (Gag) & Phản Xạ Ho Khi Hút Đờm (Cough)</strong>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-bold">
                  HÀNH NÃO (Medulla Oblongata)
                </span>
              </div>
              <p className="text-slate-600">
                • <strong>Cung phản xạ:</strong> Dây IX (hướng tâm), Dây X (ly tâm).
                <br />
                • <strong>Ý nghĩa:</strong> Đại diện cho chức năng của phần thấp nhất (caudal) của thân não. Mất phản xạ ho khi ống hút đờm kích thích carina khí quản là tiêu chí bắt buộc trong chẩn đoán chết não.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
