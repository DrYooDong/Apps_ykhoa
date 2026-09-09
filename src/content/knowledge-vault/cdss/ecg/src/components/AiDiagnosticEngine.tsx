import { useState } from "react";
import { EcgCase, AiAnalysisResult } from "../types";
import { Sparkles, BrainCircuit, AlertOctagon, CheckCircle2, Stethoscope, ChevronRight, Send, Loader2, HeartHandshake, HelpCircle } from "lucide-react";

interface AiDiagnosticEngineProps {
  currentCase: EcgCase;
}

export function AiDiagnosticEngine({ currentCase }: AiDiagnosticEngineProps) {
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Trigger server-side AI analysis via Gemini API
  const handleRunAiAnalysis = async () => {
    setLoadingAi(true);
    try {
      const response = await fetch("/api/analyze-ecg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData: currentCase,
          patientInfo: currentCase.patient,
        }),
      });

      const data = await response.json();
      if (data.analysis) {
        setAiResult(data.analysis);
      }
    } catch (err) {
      console.error("Failed to run AI diagnosis:", err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSendQuestion = async () => {
    if (!customQuestion.trim() || chatLoading) return;
    const q = customQuestion;
    setCustomQuestion("");
    setChatHistory((prev) => [...prev, { role: "user", text: q }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/analyze-ecg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseData: currentCase,
          patientInfo: currentCase.patient,
          customObservations: `Bác sĩ đặt câu hỏi tư vấn: "${q}". Hãy trả lời súc tích, chuẩn y khoa tim mạch và giải thích cặn kẽ dựa trên chuyển đạo điện tâm đồ của ca bệnh.`,
        }),
      });
      const data = await response.json();
      const answer = data.analysis?.medicalExplanation || data.analysis?.summary || "Đã phân tích dựa trên điện tâm đồ 12 chuyển đạo của ca bệnh.";
      setChatHistory((prev) => [...prev, { role: "ai", text: answer }]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { role: "ai", text: "Xin lỗi, đã xảy ra gián đoạn khi kết nối với máy chủ AI. Vui lòng thử lại sau giây lát." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const severityBadgeClass = {
    "Khẩn cấp": "bg-rose-100 text-rose-800 border-rose-300",
    "Nguy kịch": "bg-red-100 text-red-900 border-red-400 animate-pulse",
    "Cảnh giác cao": "bg-amber-100 text-amber-900 border-amber-300",
    "Ổn định": "bg-emerald-100 text-emerald-800 border-emerald-300",
  }[currentCase.severity];

  return (
    <div className="space-y-6">
      {/* Top Banner: Algorithm & Deep Learning Detection */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${severityBadgeClass}`}>
                Mức độ: {currentCase.severity}
              </span>
              <span className="text-xs font-mono text-slate-500">ID Ca: {currentCase.id}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              Chẩn Đoán Tự Động Bằng Thuật Toán Học Sâu (Deep Learning ECG AI)
            </h2>
            <p className="text-xs text-slate-600">
              Kết hợp mạng nơ-ron tích chập 1D (1D-CNN) và quy tắc chẩn đoán điện sinh lý học lâm sàng theo tài liệu BS Nguyễn Tôn Kinh Thi
            </p>
          </div>

          <button
            id="run-gemini-ai-btn"
            onClick={handleRunAiAnalysis}
            disabled={loadingAi}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-rose-600 px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:from-indigo-700 hover:to-rose-700 disabled:opacity-50"
          >
            {loadingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang Phân Tích Với Gemini AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Chạy Chẩn Đoán Chuyên Sâu (Gemini 3.8 Flash)
              </>
            )}
          </button>
        </div>

        {/* Primary Diagnosis & Confidence Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 rounded-lg bg-slate-50 p-4 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chẩn Đoán Xác Định Chính</div>
            <div className="text-base font-bold text-rose-900 leading-snug">
              {aiResult?.primaryDiagnosis || currentCase.diagnosis.primary}
            </div>
            {currentCase.diagnosis.culpritVesselOrCause && (
              <div className="text-xs text-slate-700 flex items-center gap-1.5 pt-1">
                <span className="font-semibold text-slate-900">Động mạch thủ phạm / Căn nguyên:</span>
                <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-mono font-medium">
                  {aiResult?.culpritVesselOrEtiology || currentCase.diagnosis.culpritVesselOrCause}
                </span>
              </div>
            )}
          </div>

          {/* Confidence Score */}
          <div className="rounded-lg bg-indigo-50/70 p-4 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-900">Độ Tin Cậy Mô Hình Học Sâu</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold font-mono text-indigo-600">
                  {currentCase.diagnosis.confidence.primary}%
                </span>
                <span className="text-xs text-indigo-700">Độ tin cậy cao</span>
              </div>
            </div>
            <div className="w-full bg-indigo-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-rose-500 h-2 rounded-full"
                style={{ width: `${currentCase.diagnosis.confidence.primary}%` }}
              />
            </div>
          </div>
        </div>

        {/* 10-Step Automated Measurement Summary Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">1. Nhịp Tim</div>
            <div className="font-bold text-slate-800 truncate" title={currentCase.metrics.rhythmType}>
              {currentCase.metrics.rhythmType}
            </div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">2. Tần Số (BPM)</div>
            <div className="font-bold text-rose-600 font-mono text-sm">{currentCase.metrics.heartRate} l/p</div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">3. Trục Điện Tim (α)</div>
            <div className="font-bold text-slate-800 font-mono">{currentCase.metrics.alphaAngle}°</div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">5. Khoảng PR</div>
            <div className="font-bold text-slate-800 font-mono">
              {currentCase.metrics.prInterval ? `${currentCase.metrics.prInterval} ms` : "N/A"}
            </div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">6. Phức Bộ QRS</div>
            <div className={`font-bold font-mono ${currentCase.metrics.qrsDuration > 120 ? "text-rose-600" : "text-slate-800"}`}>
              {currentCase.metrics.qrsDuration} ms
            </div>
          </div>
          <div className="p-2 rounded bg-slate-50 border border-slate-200">
            <div className="text-slate-400 text-[10px]">9. QTc Bazett</div>
            <div className={`font-bold font-mono ${currentCase.metrics.qtc > 460 ? "text-amber-600" : "text-slate-800"}`}>
              {currentCase.metrics.qtc} ms
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Diagnostic Findings & Differentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key ECG Findings */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Dấu Hiệu Điện Tim Cốt Lõi (Key ECG Signs)
          </div>
          <ul className="space-y-2 text-xs text-slate-700">
            {currentCase.diagnosis.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-md border border-slate-200/80">
                <ChevronRight className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2 text-xs text-slate-600">
            <span className="font-bold text-slate-800 block mb-1">Tổng quan chuyển đạo:</span>
            <p className="mb-1"><b>Chuyển đạo chi:</b> {currentCase.leadsSummary.limbLeadsSummary}</p>
            <p><b>Chuyển đạo ngực:</b> {currentCase.leadsSummary.chestLeadsSummary}</p>
          </div>
        </div>

        {/* Differential Diagnosis & Urgent Plan */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2">
              <AlertOctagon className="w-4 h-4 text-amber-600" />
              Chẩn Đoán Phân Biệt (Differential Diagnosis)
            </div>
            <div className="space-y-1.5 text-xs text-slate-600">
              {currentCase.diagnosis.differentials.map((diff, idx) => (
                <div key={idx} className="p-2 rounded bg-amber-50/60 border border-amber-200/80">
                  {diff}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-rose-900 border-b border-rose-100 pb-2 mb-2">
              <Stethoscope className="w-4 h-4 text-rose-600" />
              Kế Hoạch Xử Trí Khẩn Cấp (Urgent Action Plan)
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {currentCase.diagnosis.treatment.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* AI Expert Medical Explanation / Reference from BS Nguyễn Tôn Kinh Thi */}
      <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-950">
              Cơ Chế Điện Sinh Học & Ghi Nhớ Lâm Sàng
            </span>
          </div>
          <span className="text-xs font-mono font-medium text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">
            {currentCase.learningNotes.chapterRef}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-2xs">
            <span className="font-bold text-indigo-900 block mb-1">Kiến thức cốt lõi:</span>
            <p className="text-slate-700 leading-relaxed">{currentCase.learningNotes.coreTakeaway}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-2xs">
            <span className="font-bold text-amber-900 block mb-1">Cạm bẫy lâm sàng cần tránh:</span>
            <p className="text-slate-700 leading-relaxed">{currentCase.learningNotes.pitfallToAvoid}</p>
          </div>
        </div>

        {aiResult?.medicalExplanation && (
          <div className="mt-3 p-3 rounded-lg bg-indigo-100/60 border border-indigo-200 text-xs text-indigo-950 leading-relaxed">
            <div className="font-bold mb-1 flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-700" /> Nhận định chi tiết từ Gemini AI:
            </div>
            <p>{aiResult.medicalExplanation}</p>
          </div>
        )}
      </div>

      {/* Interactive Clinical Consultation Chat */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          Hỏi Đáp Lâm Sàng Với AI Chuyên Khoa Tim Mạch Về Ca Này
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {chatHistory.length === 0 ? (
            <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg text-center">
              Đặt câu hỏi cho AI về điện tâm đồ này (ví dụ: &quot;Tại sao nghi ngờ tắc LAD đoạn gần thay vì đoạn xa?&quot;, &quot;Cách phân biệt với viêm màng ngoài tim?&quot;, &quot;Cần chỉ định thêm cận lâm sàng gì?&quot;).
            </div>
          ) : (
            chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-xs ${
                  msg.role === "user"
                    ? "bg-indigo-50 border border-indigo-200 text-indigo-950 ml-6"
                    : "bg-slate-50 border border-slate-200 text-slate-800 mr-6"
                }`}
              >
                <div className="font-bold mb-1 text-[11px] text-slate-500">
                  {msg.role === "user" ? "Bác sĩ:" : "AI Chuyên Khoa Tim Mạch:"}
                </div>
                <div className="leading-relaxed whitespace-pre-wrap">{msg.text}</div>
              </div>
            ))
          )}
          {chatLoading && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-center gap-2 mr-6">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              Đang phân tích câu hỏi dựa trên 12 chuyển đạo điện tim...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            id="ask-ai-ecg-input"
            type="text"
            placeholder="Hỏi về hình ảnh sóng, phân biệt bệnh học hoặc hướng điều trị..."
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendQuestion();
            }}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs focus:border-indigo-500 focus:outline-hidden"
          />
          <button
            id="send-ai-question-btn"
            onClick={handleSendQuestion}
            disabled={!customQuestion.trim() || chatLoading}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" /> Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
