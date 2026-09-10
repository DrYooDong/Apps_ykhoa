import React, { useState } from "react";
import { CLINICAL_CASES } from "../../data/clinicalCases";
import { CaseTemplate, DiagnosticResult } from "../../types";
import { Brain, Stethoscope, AlertTriangle, CheckCircle, ShieldAlert, Sparkles, Send, RefreshCw, FileText, Pill } from "lucide-react";

export const DiagnosticAssistant: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("");
  const [patientAge, setPatientAge] = useState<number>(64);
  const [patientSex, setPatientSex] = useState<"Nam" | "Nữ">("Nam");
  const [symptomOnset, setSymptomOnset] = useState<string>("Cấp tính (<3h) - Đột ngột lúc 7h30 sáng");
  const [chiefComplaint, setChiefComplaint] = useState<string>("Yếu liệt nửa người phải và đột ngột không nói được");
  const [pastHistory, setPastHistory] = useState<string>("Tăng huyết áp 10 năm, Rung nhĩ không dùng kháng đông đều");

  // Neurological examination findings
  const [gcs, setGcs] = useState<number>(12);
  const [mentalStatus, setMentalStatus] = useState<string>("Tỉnh táo, tiếp xúc bằng cử chỉ nhưng mất khả năng diễn đạt ngôn ngữ lời nói (Mất ngôn ngữ Broca)");
  const [cranialNerves, setCranialNerves] = useState<string>("Đồng tử đều PERRLA, Bán manh đồng danh P, Liếc ngang phối hợp mất, Liệt mặt trung ương P (liệt 1/4 dưới, nếp nhăn trán còn)");
  const [motorExam, setMotorExam] = useState<string>("Tay phải 1/5, Chân phải 2/5, Tay trái 5/5, Chân trái 5/5. Trương lực cơ tháp bên P. Liệt nửa người phải.");
  const [sensoryExam, setSensoryExam] = useState<string>("Giảm cảm giác nông nửa người Phải. Không có tê vùng yên ngựa.");
  const [reflexes, setReflexes] = useState<string>("Phản xạ gân xương bên phải tăng 3+, Babinski dương tính bên Phải (+). Cổ mềm, Kernig (-).");
  const [coordinationGait, setCoordinationGait] = useState<string>("Không thể đi lại hoặc đứng vững do liệt nặng nửa người P.");
  const [redFlagsInput, setRedFlagsInput] = useState<string>("Cửa sổ tiêu sợi huyết còn trong 4.5h, Nguy cơ tắc mạch máu lớn nội sọ (LVO)");

  // Analysis result state
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<DiagnosticResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load predefined case template
  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    const foundCase = CLINICAL_CASES.find((c) => c.id === caseId);
    if (!foundCase) return;

    setPatientAge(foundCase.profile.ageYears || 60);
    setPatientSex(foundCase.profile.sex);
    setSymptomOnset(`${foundCase.profile.onsetTime} - ${foundCase.profile.onsetContext}`);
    setChiefComplaint(foundCase.profile.chiefComplaint);
    setPastHistory(foundCase.summary);

    if (foundCase.mentalStatus) {
      setGcs(foundCase.mentalStatus.gcsScore || 15);
      setMentalStatus(foundCase.mentalStatus.summary || foundCase.mentalStatus.speechType || "Bình thường");
    }

    if (foundCase.cranialNerves) {
      const cn = foundCase.cranialNerves;
      setCranialNerves([cn.cn2_fields, cn.cn2_pupils, cn.cn3_4_6_motility, cn.cn7_facial].filter(Boolean).join(". "));
    }

    if (foundCase.motorExam) {
      const m = foundCase.motorExam;
      setMotorExam(`Tay P: ${m.rightArmMRC ?? 5}/5, Chân P: ${m.rightLegMRC ?? 5}/5, Tay T: ${m.leftArmMRC ?? 5}/5, Chân T: ${m.leftLegMRC ?? 5}/5. Trương lực: ${m.muscleTone ?? "Bình thường"}. Kiểu: ${m.weaknessPattern ?? ""}`);
    }

    if (foundCase.sensoryExam) {
      const s = foundCase.sensoryExam;
      setSensoryExam(`${s.lightTouch || "Bình thường"}. Mức khoanh da: ${s.dermatomeLevel || "Không"}. Tê yên ngựa: ${s.saddleAnesthesia ? "CÓ (RED FLAG)" : "Không"}`);
    }

    if (foundCase.reflexes) {
      const r = foundCase.reflexes;
      setReflexes(`Gân xương: Nhị đầu ${r.bicepsReflex || 2}+, Gối ${r.patellarReflex || 2}+. Babinski: ${r.babinskiSign || "Âm tính"}. Dấu màng não: ${r.meningealSigns ? "DƯƠNG TÍNH" : "Âm tính"}`);
    }

    if (foundCase.coordinationGait) {
      const cg = foundCase.coordinationGait;
      setCoordinationGait(`Dáng đi: ${cg.gaitType || "Bình thường"}. Romberg: ${cg.rombergTest || "Âm tính"}`);
    }

    if (foundCase.redFlags) {
      setRedFlagsInput(foundCase.redFlags.join(", "));
    }

    setAnalysisResult(null);
    setErrorMessage(null);
  };

  // Submit findings to API
  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMessage(null);

    const payload = {
      patientProfile: {
        ageGroup: patientAge > 65 ? "Cao tuổi (>65)" : "Trung niên (41-65)",
        ageYears: patientAge,
        sex: patientSex,
        onsetTime: symptomOnset,
        onsetContext: symptomOnset,
        chiefComplaint
      },
      vitalSigns: {
        hr: 85,
        sbp: 160,
        dbp: 95,
        rr: 18,
        spo2: 98,
        temp: 36.8,
        glucose: 110
      },
      mentalStatus: {
        gcsScore: gcs,
        summary: mentalStatus
      },
      cranialNerves: {
        summary: cranialNerves
      },
      motorExam: {
        summary: motorExam
      },
      sensoryExam: {
        summary: sensoryExam
      },
      reflexes: {
        summary: reflexes
      },
      coordinationGait: {
        summary: coordinationGait
      },
      redFlags: redFlagsInput ? redFlagsInput.split(",").map((s) => s.trim()) : []
    };

    try {
      const res = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Máy chủ trả về mã lỗi HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.data) {
        setAnalysisResult(data.data as DiagnosticResult);
      } else {
        throw new Error(data.message || "Không thể phân tích dữ liệu lâm sàng");
      }
    } catch (err: any) {
      console.error("Analysis error:", err);
      setErrorMessage(err.message || "Đã xảy ra lỗi khi phân tích. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Brain className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Trợ Lý Phân Tích & Chẩn Đoán Bất Thường Thần Kinh (AI & Rule Engine)
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800 hidden sm:inline">
            Hỗ Trợ Bác Sĩ Chuyên Khoa
          </span>
        </div>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Nhập các dữ liệu khám tại giường hoặc nạp nhanh một tình huống lâm sàng khẩn cấp. Hệ thống tích hợp y văn chuyên khoa (Campbell's Neurologic Exam & Handbook of Emergency Neurology) để đưa ra chẩn đoán xác định, chẩn đoán phân biệt kèm tỷ lệ tin cậy (%), định vị giải phẫu tổn thương và kế hoạch xử trí khẩn cấp.
        </p>

        {/* Quick Case Template Selector */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Chọn Nhanh Ca Lâm Sàng Cấp Cứu Mẫu (Case Templates):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {CLINICAL_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCase(c.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  selectedCaseId === c.id
                    ? "bg-cyan-950/80 border-cyan-500 text-white shadow-lg shadow-cyan-950"
                    : "bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-400 truncate">{c.title}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${c.badgeColor || "bg-slate-800 text-slate-300"}`}>
                    {c.category}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 block mt-1 line-clamp-1 font-normal">
                  {c.profile.ageYears || 60}T {c.profile.sex} - {c.profile.chiefComplaint}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Bedside Input Form */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Stethoscope className="w-4 h-4 text-cyan-400" />
          Dữ Liệu Thăm Khám Thần Kinh Cần Phân Tích
        </h3>

        {/* Patient Profile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Tuổi bệnh nhân:</label>
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Giới tính:</label>
            <select
              value={patientSex}
              onChange={(e) => setPatientSex(e.target.value as "Nam" | "Nữ")}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Thời điểm khởi phát:</label>
            <input
              type="text"
              value={symptomOnset}
              onChange={(e) => setSymptomOnset(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Lý do vào viện (Chief Complaint):</label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Tóm tắt bệnh cảnh & Tiền sử:</label>
            <input
              type="text"
              value={pastHistory}
              onChange={(e) => setPastHistory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* Detailed Bedside Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              1. Tri giác & Ý thức (GCS: {gcs}đ):
            </label>
            <textarea
              rows={2}
              value={mentalStatus}
              onChange={(e) => setMentalStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              2. Khám 12 Đôi Dây Thần Kinh Sọ (CN I - XII):
            </label>
            <textarea
              rows={2}
              value={cranialNerves}
              onChange={(e) => setCranialNerves(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              3. Vận động, Cơ lực & Trương lực cơ:
            </label>
            <textarea
              rows={2}
              value={motorExam}
              onChange={(e) => setMotorExam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              4. Cảm giác nông, sâu & Mức khoanh da:
            </label>
            <textarea
              rows={2}
              value={sensoryExam}
              onChange={(e) => setSensoryExam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              5. Phản xạ gân xương & Dấu tháp (Babinski/Hoffmann):
            </label>
            <textarea
              rows={2}
              value={reflexes}
              onChange={(e) => setReflexes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              6. Phối hợp động tác, Dáng đi & Dấu cảnh báo Đỏ (Red Flags):
            </label>
            <textarea
              rows={2}
              value={`${coordinationGait} | Cảnh báo: ${redFlagsInput}`}
              onChange={(e) => {
                const parts = e.target.value.split("| Cảnh báo: ");
                setCoordinationGait(parts[0] || "");
                setRedFlagsInput(parts[1] || "");
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-500">
            * Dữ liệu được xử lý phục vụ tư vấn kinh nghiệm y khoa chuyên sâu cho nhân viên y tế.
          </span>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              loading
                ? "bg-cyan-900/60 text-cyan-300 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950 hover:shadow-cyan-900 scale-100 hover:scale-[1.02]"
            }`}
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Đang phân tích định vị thần kinh học..." : "Phân Tích Bất Thường & Ra Quyết Định Chẩn Đoán"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-200 text-xs md:text-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysisResult && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-white">Kết Quả Phân Tích & Đề Xuất Xử Trí Lâm Sàng</h3>
              </div>
              <span className="text-xs text-slate-400">
                Định vị thần kinh học & Hướng dẫn y khoa chuẩn chỉnh
              </span>
            </div>

            {analysisResult.diagnoses && analysisResult.diagnoses.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Độ tin cậy chẩn đoán chính:</span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold font-mono">
                  {analysisResult.diagnoses[0].confidence}%
                </span>
              </div>
            )}
          </div>

          {/* Primary Diagnosis & Localization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-semibold block uppercase">
                Chẩn Đoán Xác Định Ưu Tiên (Primary Diagnosis):
              </span>
              <h4 className="text-xl font-extrabold text-white">
                {analysisResult.diagnoses?.[0]?.diseaseName || "Đang xác định"}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
                <strong>Bằng chứng lâm sàng:</strong> {analysisResult.diagnoses?.[0]?.clinicalEvidence}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-semibold block uppercase">
                Định Vị Giải Phẫu Thần Kinh (Neuroanatomical Localization):
              </span>
              <h4 className="text-lg font-bold text-indigo-200">
                {analysisResult.neuroLocalization?.primarySite}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                <strong className="text-indigo-300">Hội chứng:</strong> {analysisResult.neuroLocalization?.syndromeType}. {analysisResult.neuroLocalization?.rationale}
              </p>
            </div>
          </div>

          {/* Urgent Actions Alert */}
          {analysisResult.urgentActions && analysisResult.urgentActions.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>HÀNH ĐỘNG CẤP BÁCH TỐI CẤP CỨU CHO BÁC SĨ (STAT ACTIONS):</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-rose-200">
                {analysisResult.urgentActions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Differential Diagnoses with Confidence % */}
          {analysisResult.diagnoses && analysisResult.diagnoses.length > 1 && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-white block">
                Chẩn Đoán Phân Biệt Kèm Tỷ Lệ Tin Cậy & Điểm Nhận Diện:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.diagnoses.slice(1).map((diff, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-xs md:text-sm">{diff.diseaseName}</span>
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                        {diff.confidence}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      <strong className="text-slate-300">Yếu tố phân biệt:</strong> {diff.counterEvidence || diff.clinicalEvidence}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diagnostic Workup Plan */}
          {analysisResult.diagnosticWorkupPlan && analysisResult.diagnosticWorkupPlan.length > 0 && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-cyan-300 block">
                Chiến Lược Cận Lâm Sàng Đề Xuất (Diagnostic Workup Plan):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {analysisResult.diagnosticWorkupPlan.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{item.modality}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{item.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medications & Acute Interventions */}
          {analysisResult.managementRecommendations && (
            <div className="space-y-3">
              <span className="text-sm font-bold text-emerald-400 block">
                Hướng Xử Trí Cấp Tính & Phác Đồ Dùng Thuốc (Management):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="font-bold text-white block">Can thiệp cấp tính:</span>
                  <ul className="space-y-1 list-disc list-inside text-slate-300">
                    {analysisResult.managementRecommendations.acuteInterventions.map((act, idx) => (
                      <li key={idx}>{act}</li>
                    ))}
                  </ul>
                </div>

                {analysisResult.managementRecommendations.medications && analysisResult.managementRecommendations.medications.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="font-bold text-white block flex items-center gap-1.5">
                      <Pill className="w-4 h-4 text-emerald-400" />
                      Thuốc chỉ định:
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.managementRecommendations.medications.map((med, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800">
                          <div className="flex items-center justify-between text-slate-200 font-semibold">
                            <span>{med.drugName}</span>
                            <span className="font-mono text-cyan-400">{med.dosage}</span>
                          </div>
                          {med.notes && <p className="text-[11px] text-slate-400 mt-0.5">{med.notes}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Clinical Pearls */}
          {analysisResult.clinicalPearlsAndPitfalls && analysisResult.clinicalPearlsAndPitfalls.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/60 space-y-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Kinh Nghiệm Lâm Sàng & Bẫy Cần Tránh (Clinical Pearls & Pitfalls):
              </span>
              <div className="space-y-1.5 text-xs text-slate-300">
                {analysisResult.clinicalPearlsAndPitfalls.map((pearl, idx) => (
                  <p key={idx} className="leading-relaxed">
                    💡 {pearl}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
