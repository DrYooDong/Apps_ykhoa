import { useState, useRef } from "react";
import { EcgCase, LeadName } from "../types";
import { generateLeadWaveformPoints, pointsToSvgPath, generateCalibrationPulse } from "../data/ecgMath";
import {
  Printer,
  Download,
  Copy,
  Check,
  X,
  FileText,
  Activity,
  Heart,
  BrainCircuit,
  ShieldAlert,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

interface EcgExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: EcgCase;
  paperSpeed?: number;
  voltageGain?: number;
}

const ALL_12_LEADS: LeadName[] = [
  "I", "II", "III", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"
];

export function EcgExportModal({
  isOpen,
  onClose,
  currentCase,
  paperSpeed = 25,
  voltageGain = 1.0,
}: EcgExportModalProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfSuccess, setPdfSuccess] = useState<boolean>(false);
  const [printTheme, setPrintTheme] = useState<"pink" | "mono">("pink");
  const [includeRhythmStrip, setIncludeRhythmStrip] = useState<boolean>(true);
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Formatted date string
  const currentDateStr = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTimeStr = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Calculate waveform points for printable strip
  const printableLeadsPoints: Record<LeadName, ReturnType<typeof generateLeadWaveformPoints>> = {} as any;
  for (const lead of ALL_12_LEADS) {
    const data = currentCase.leadsData[lead];
    if (data) {
      printableLeadsPoints[lead] = generateLeadWaveformPoints(
        data,
        currentCase.metrics.heartRate,
        2.5,
        { sampleRate: 350, voltageScale: voltageGain }
      );
    }
  }

  // Rhythm strip lead II (10 seconds)
  const rhythmPoints = generateLeadWaveformPoints(
    currentCase.leadsData["II"],
    currentCase.metrics.heartRate,
    10.0,
    { sampleRate: 350, voltageScale: voltageGain }
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    if (!printAreaRef.current) return;
    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = printAreaRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // 2x high resolution for medical printing
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 6;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      let position = margin;
      let heightLeft = contentHeight;

      pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight);
      heightLeft -= (pageHeight - margin * 2);

      while (heightLeft > 0) {
        position = margin - (contentHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight);
        heightLeft -= (pageHeight - margin * 2);
      }

      const safeCaseId = currentCase.id.replace(/[^a-zA-Z0-9_-]/g, "_");
      const fileName = `Bao_Cao_ECG_Dao_Tao_${safeCaseId}.pdf`;
      pdf.save(fileName);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 4000);
    } catch (err) {
      console.error("PDF generation failed, falling back to window.print()", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleCopyTextReport = () => {
    const reportText = `================================================================================
KHO TÀNG KINH NGHIỆM ĐIỆN TÂM ĐỒ LÂM SÀNG (BS NGUYỄN TÔN KINH THI)
PHIẾU PHÂN TÍCH CHUYÊN MÔN & TƯ LIỆU CA MẪU GIẢNG DẠY
(Mục đích: Lưu trữ kinh nghiệm, đào tạo thực hành & đối chiếu chuẩn y khoa)
================================================================================
Mã Tình Huống: ${currentCase.id}
Thời điểm xuất tư liệu: ${currentDateStr} lúc ${currentTimeStr}

BỆNH CẢNH LÂM SÀNG MẪU:
- Tình huống: ${currentCase.title}
- Đối tượng mẫu: ${currentCase.patient.age} tuổi | Giới tính: ${currentCase.patient.gender}
- Huyết áp: ${currentCase.patient.vitals?.bp || "120/80"} mmHg | Tần số tim: ${currentCase.metrics.heartRate} l/phút
- Triệu chứng khởi phát: ${currentCase.patient.chiefComplaint}
- Bệnh sử tóm tắt: ${currentCase.patient.clinicalHistory}

THÔNG SỐ KỸ THUẬT & ĐO ĐẠC:
- Tốc độ giấy: ${paperSpeed} mm/giây | Độ nhạy: ${voltageGain === 1.0 ? "10mm/mV (1mV = 10mm)" : `${voltageGain * 10}mm/mV`}
- Nhịp: ${currentCase.metrics.rhythmType} (${currentCase.metrics.regularity})
- Tần số thất: ${currentCase.metrics.heartRate} chu kỳ/phút
- Trục điện tim: ${currentCase.metrics.axis} (Góc alpha: ${currentCase.metrics.alphaAngle}°)
- Khoảng PR: ${currentCase.metrics.prInterval} ms (Chuẩn: 120 - 200 ms)
- Thời gian QRS: ${currentCase.metrics.qrsDuration} ms (Chuẩn: < 120 ms)
- Khoảng QT/QTc: ${currentCase.metrics.qt} / ${currentCase.metrics.qtc} ms
- Chỉ số Sokolow-Lyon: ${currentCase.metrics.sokolowLyon || "--"} mm (Dày thất trái khi >= 35 mm)

KẾT QUẢ ĐỐI CHIẾU CHUYÊN KHẢO & AI HỌC SÂU:
- CHẨN ĐOÁN XÁC ĐỊNH: ${currentCase.diagnosis.primary} (Độ tin cậy AI: ${currentCase.diagnosis.confidence.primary}%)
${currentCase.diagnosis.culpritVesselOrCause ? `- Động mạch thủ phạm / Căn nguyên: ${currentCase.diagnosis.culpritVesselOrCause}` : ""}
- Mức độ cảnh báo: ${currentCase.severity}
- Dấu hiệu then chốt: ${currentCase.diagnosis.keyFindings.join("; ")}
- Chẩn đoán phân biệt: ${currentCase.diagnosis.differentials.join(", ")}
- Hướng xử trí chuẩn: ${currentCase.diagnosis.treatment.join("; ")}
- Điểm đúc kết kinh nghiệm (Theo BS Nguyễn Tôn Kinh Thi): ${currentCase.diagnosis.clinicalNote}
================================================================================
Hội chẩn & Đối chiếu: Kho Tư Liệu Điện Tâm Đồ Lâm Sàng / Hệ Thống AI ECG Master
`;

    navigator.clipboard.writeText(reportText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      {/* Print Stylesheet overrides */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body * {
            visibility: hidden;
          }
          #ecg-printable-report, #ecg-printable-report * {
            visibility: visible;
          }
          #ecg-printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 4mm;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh] print:max-h-none print:shadow-none print:rounded-none">
        {/* Modal Top Action Bar (hidden when printing) */}
        <div className="no-print border-b border-slate-200 bg-slate-50 px-5 py-3 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-600 text-white rounded-lg shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-black text-slate-900">
                    Xuất Báo Cáo PDF &amp; Hồ Sơ Đào Tạo Lâm Sàng
                  </h2>
                  <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded border border-rose-200">
                    Chuẩn A4 Y Khoa
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Tư liệu ca mẫu đào tạo &bull; Phân tích 12 đạo trình điện tim &bull; Chẩn đoán đối chiếu chuyên khảo BS Nguyễn Tôn Kinh Thi
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-copy-report-text"
                onClick={handleCopyTextReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs transition"
                title="Sao chép toàn văn kết quả dạng chữ"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã Sao Chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sao Chép Chẩn Đoán</span>
                  </>
                )}
              </button>

              {/* Direct PDF File Download */}
              <button
                id="btn-download-direct-pdf"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs ${
                  pdfSuccess
                    ? "bg-emerald-600 text-white"
                    : isGeneratingPdf
                    ? "bg-slate-300 text-slate-600 cursor-wait"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                title="Tải tệp PDF chất lượng cao về máy tính"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang Kết Xuất PDF...</span>
                  </>
                ) : pdfSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã Tải File PDF!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải File PDF (.pdf)</span>
                  </>
                )}
              </button>

              {/* Print / System PDF Save Dialog */}
              <button
                id="btn-print-pdf-report"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm transition"
                title="Mở hộp thoại In hoặc Lưu PDF trực tiếp từ trình duyệt (Ctrl+P)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In / Lưu PDF (A4)</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
                title="Đóng cửa sổ"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Config Row: Theme & Strip Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-bold">Chế độ in lưới ECG:</span>
              <div className="flex rounded-md border border-slate-200 bg-white p-0.5">
                <button
                  onClick={() => setPrintTheme("pink")}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition ${
                    printTheme === "pink"
                      ? "bg-rose-100 text-rose-900 border border-rose-300"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Giấy Hồng Y Khoa
                </button>
                <button
                  onClick={() => setPrintTheme("mono")}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition ${
                    printTheme === "mono"
                      ? "bg-slate-800 text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Trắng Đen (Tiết Kiệm Mực)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer select-none font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={includeRhythmStrip}
                  onChange={(e) => setIncludeRhythmStrip(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span>Kèm Dải Nhịp DII Kéo Dài (10 Giây)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body / Printable Report */}
        <div
          ref={printAreaRef}
          id="ecg-printable-report"
          className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 text-slate-900 bg-white"
        >
          {/* 1. Official Medical Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
            <div className="space-y-1">
              <div className="text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                <span>KHO TÀNG KINH NGHIỆM ĐIỆN TÂM ĐỒ LÂM SÀNG</span>
                <span>&bull;</span>
                <span>CHUYÊN KHẢO BS NGUYỄN TÔN KINH THI</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-slate-950">
                PHIẾU PHÂN TÍCH CHUYÊN MÔN &amp; TƯ LIỆU CA MẪU ĐIỆN TÂM ĐỒ
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                (TƯ LIỆU ĐÀO TẠO THỰC HÀNH &bull; HỆ THỐNG ĐỐI CHIẾU HỌC SÂU AI &bull; TIÊU CHUẨN Y KHOA)
              </p>
            </div>

            <div className="text-right text-xs font-mono space-y-0.5">
              <div className="font-bold text-slate-900">Mã Tư Liệu: {currentCase.id}</div>
              <div className="text-slate-600">Ngày xuất: {currentDateStr}</div>
              <div className="text-slate-600">Giờ xuất: {currentTimeStr}</div>
              <div className="inline-block bg-rose-50 text-rose-800 px-2 py-0.5 rounded font-bold border border-rose-200 mt-1">
                TƯ LIỆU GIẢNG DẠY
              </div>
            </div>
          </div>

          {/* 2. Clinical Vignette Context Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block">Tình huống lâm sàng:</span>
              <span className="font-bold text-slate-950 text-sm">
                CA MẪU {currentCase.id.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Tuổi / Giới tính:</span>
              <span className="font-bold text-slate-950">
                {currentCase.patient.age} tuổi &bull; {currentCase.patient.gender}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Huyết áp / Sinh hiệu:</span>
              <span className="font-mono font-bold text-slate-950">
                HA: {currentCase.patient.vitals?.bp || "120/80"} &bull; Tần số: {currentCase.metrics.heartRate} l/p
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Mức độ khẩn cấp:</span>
              <span
                className={`inline-block font-bold px-2 py-0.5 rounded text-[11px] ${
                  currentCase.severity === "Nguy kịch" || currentCase.severity === "Khẩn cấp"
                    ? "bg-red-100 text-red-800 border border-red-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {currentCase.severity}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-4 border-t border-slate-200/80 pt-2 mt-0.5">
              <span className="text-slate-500 font-medium">Lý do vào viện &amp; Bệnh sử: </span>
              <span className="font-semibold text-slate-900">
                {currentCase.patient.chiefComplaint} — {currentCase.patient.clinicalHistory}
              </span>
            </div>
          </div>

          {/* 3. Machine Technical Calibration Stripe */}
          <div className="flex flex-wrap items-center justify-between bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-mono text-slate-800">
            <div className="flex items-center gap-4">
              <span><b>Tốc độ kéo giấy:</b> {paperSpeed} mm/giây (1mm = {paperSpeed === 25 ? "0.04s" : "0.02s"})</span>
              <span><b>Độ nhạy biên độ:</b> {voltageGain === 1.0 ? "10 mm/mV (1mV = 10mm)" : `${voltageGain * 10} mm/mV`}</span>
              <span><b>Dải tần số lọc:</b> 0.05 Hz - 150 Hz</span>
            </div>
            <div className="font-sans font-bold text-rose-700">
              Thiết bị: Hệ Thống Điện Tâm Đồ Kỹ Thuật Số AI ECG Master
            </div>
          </div>

          {/* 4. High-Resolution 12-Lead ECG Waveform Graphic Strip on Millimeter Paper */}
          <div className={`border-2 rounded-xl overflow-hidden shadow-xs ${
            printTheme === "pink" ? "border-rose-300 bg-[#fff5f5]" : "border-slate-400 bg-[#f8fafc]"
          }`}>
            <div className={`px-3 py-1 text-[11px] font-bold border-b flex items-center justify-between ${
              printTheme === "pink" ? "bg-rose-100/80 text-rose-950 border-rose-200" : "bg-slate-200 text-slate-900 border-slate-300"
            }`}>
              <span>BẢN GHI ĐIỆN TÂM ĐỒ 12 ĐẠO TRÌNH (CHUẨN 25MM/S - 10MM/MV)</span>
              <span className="font-mono">Đoạn ghi 2.5 giây/đạo trình {includeRhythmStrip ? "+ DII kéo dài 10 giây" : ""}</span>
            </div>

            {/* 12 Leads Layout (4 columns x 3 rows) */}
            <div
              className="p-3"
              style={{
                backgroundImage: printTheme === "pink" ? `
                  linear-gradient(to right, rgba(244, 63, 94, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(244, 63, 94, 0.2) 1px, transparent 1px),
                  linear-gradient(to right, rgba(225, 29, 72, 0.45) 1.2px, transparent 1.2px),
                  linear-gradient(to bottom, rgba(225, 29, 72, 0.45) 1.2px, transparent 1.2px)
                ` : `
                  linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
                  linear-gradient(to right, rgba(71, 85, 105, 0.5) 1.2px, transparent 1.2px),
                  linear-gradient(to bottom, rgba(71, 85, 105, 0.5) 1.2px, transparent 1.2px)
                `,
                backgroundSize: "3.78px 3.78px, 3.78px 3.78px, 18.9px 18.9px, 18.9px 18.9px",
              }}
            >
              <div className={`grid grid-cols-4 gap-2 pb-2 ${includeRhythmStrip ? (printTheme === "pink" ? "border-b border-rose-300/80" : "border-b border-slate-400") : ""}`}>
                {/* Col 1: I, II, III */}
                <div className={`flex flex-col divide-y pr-2 ${
                  printTheme === "pink" ? "divide-rose-200/60 border-r border-rose-300/80" : "divide-slate-300 border-r border-slate-400"
                }`}>
                  {(["I", "II", "III"] as LeadName[]).map((lead) => (
                    <div key={lead} className="relative h-20">
                      <span className={`absolute top-1 left-2 font-mono font-bold text-xs px-1.5 py-0.2 rounded border ${
                        printTheme === "pink" ? "bg-white/90 text-rose-950 border-rose-200" : "bg-white text-slate-900 border-slate-300"
                      }`}>
                        {lead}
                      </span>
                      <svg className="w-full h-full" viewBox="0 0 240 85" preserveAspectRatio="none">
                        <path
                          d={generateCalibrationPulse(1.3, 3.4, 48, 5)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                        />
                        <path
                          d={pointsToSvgPath(printableLeadsPoints[lead] || [], 1.4, 3.4, 48, 24)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Col 2: aVR, aVL, aVF */}
                <div className={`flex flex-col divide-y pr-2 ${
                  printTheme === "pink" ? "divide-rose-200/60 border-r border-rose-300/80" : "divide-slate-300 border-r border-slate-400"
                }`}>
                  {(["aVR", "aVL", "aVF"] as LeadName[]).map((lead) => (
                    <div key={lead} className="relative h-20">
                      <span className={`absolute top-1 left-2 font-mono font-bold text-xs px-1.5 py-0.2 rounded border ${
                        printTheme === "pink" ? "bg-white/90 text-rose-950 border-rose-200" : "bg-white text-slate-900 border-slate-300"
                      }`}>
                        {lead}
                      </span>
                      <svg className="w-full h-full" viewBox="0 0 240 85" preserveAspectRatio="none">
                        <path
                          d={generateCalibrationPulse(1.3, 3.4, 48, 5)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                        />
                        <path
                          d={pointsToSvgPath(printableLeadsPoints[lead] || [], 1.4, 3.4, 48, 24)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Col 3: V1, V2, V3 */}
                <div className={`flex flex-col divide-y pr-2 ${
                  printTheme === "pink" ? "divide-rose-200/60 border-r border-rose-300/80" : "divide-slate-300 border-r border-slate-400"
                }`}>
                  {(["V1", "V2", "V3"] as LeadName[]).map((lead) => (
                    <div key={lead} className="relative h-20">
                      <span className={`absolute top-1 left-2 font-mono font-bold text-xs px-1.5 py-0.2 rounded border ${
                        printTheme === "pink" ? "bg-white/90 text-rose-950 border-rose-200" : "bg-white text-slate-900 border-slate-300"
                      }`}>
                        {lead}
                      </span>
                      <svg className="w-full h-full" viewBox="0 0 240 85" preserveAspectRatio="none">
                        <path
                          d={generateCalibrationPulse(1.3, 3.4, 48, 5)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                        />
                        <path
                          d={pointsToSvgPath(printableLeadsPoints[lead] || [], 1.4, 3.4, 48, 24)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Col 4: V4, V5, V6 */}
                <div className={`flex flex-col divide-y ${
                  printTheme === "pink" ? "divide-rose-200/60" : "divide-slate-300"
                }`}>
                  {(["V4", "V5", "V6"] as LeadName[]).map((lead) => (
                    <div key={lead} className="relative h-20">
                      <span className={`absolute top-1 left-2 font-mono font-bold text-xs px-1.5 py-0.2 rounded border ${
                        printTheme === "pink" ? "bg-white/90 text-rose-950 border-rose-200" : "bg-white text-slate-900 border-slate-300"
                      }`}>
                        {lead}
                      </span>
                      <svg className="w-full h-full" viewBox="0 0 240 85" preserveAspectRatio="none">
                        <path
                          d={generateCalibrationPulse(1.3, 3.4, 48, 5)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                        />
                        <path
                          d={pointsToSvgPath(printableLeadsPoints[lead] || [], 1.4, 3.4, 48, 24)}
                          fill="none"
                          stroke="#090d16"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lead II Continuous Rhythm Strip (Bottom) */}
              {includeRhythmStrip && (
                <div className="pt-2">
                  <div className={`flex items-center justify-between text-[10px] font-bold mb-0.5 ${
                    printTheme === "pink" ? "text-rose-900" : "text-slate-800"
                  }`}>
                    <span>DII KÉO DÀI 10 GIÂY (LEAD II CONTINUOUS RHYTHM STRIP)</span>
                    <span className="font-mono">Tần số: {currentCase.metrics.heartRate} l/p &bull; Nhịp: {currentCase.metrics.rhythmType}</span>
                  </div>
                  <div className="h-16 w-full">
                    <svg className="w-full h-full" viewBox="0 0 960 70" preserveAspectRatio="none">
                      <path
                        d={generateCalibrationPulse(1.3, 3.4, 40, 5)}
                        fill="none"
                        stroke="#090d16"
                        strokeWidth="1.5"
                      />
                      <path
                        d={pointsToSvgPath(rhythmPoints, 1.4, 3.4, 40, 24)}
                        fill="none"
                        stroke="#090d16"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 5. Key Clinical Metrics Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-600" />
              Bảng Thông Số Điện Học Đo Đạc Trực Tiếp (Clinical Metrics)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Tần số thất (HR):</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {currentCase.metrics.heartRate} <span className="text-xs font-normal">l/phút</span>
                </span>
                <span className="text-[10px] text-slate-500 block">Chuẩn: 60 - 100 l/p</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Nhịp tim &amp; Tính đều:</span>
                <span className="font-bold text-slate-900">
                  {currentCase.metrics.rhythmType}
                </span>
                <span className="text-[10px] text-slate-500 block">{currentCase.metrics.regularity}</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Trục QRS &amp; Góc alpha:</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.axis} ({currentCase.metrics.alphaAngle}°)
                </span>
                <span className="text-[10px] text-slate-500 block">Chuẩn: -30° đến +90°</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Khoảng PR (Dẫn truyền AV):</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.prInterval} ms
                </span>
                <span className="text-[10px] text-slate-500 block">Chuẩn: 120 - 200 ms</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Thời gian phức bộ QRS:</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.qrsDuration} ms
                </span>
                <span className="text-[10px] text-slate-500 block">Chuẩn: 60 - 100 ms (&lt; 120ms)</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Khoảng QT / QTc (Hiệu chỉnh):</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.qt} / {currentCase.metrics.qtc} ms
                </span>
                <span className="text-[10px] text-slate-500 block">QTc chuẩn: &lt; 440ms (Nam), &lt; 460ms (Nữ)</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Chỉ số Sokolow-Lyon (SV1 + RV5):</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.sokolowLyon || "--"} mm
                </span>
                <span className="text-[10px] text-slate-500 block">Dày thất trái khi &gt;= 35 mm</span>
              </div>

              <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70">
                <span className="text-slate-500 block text-[11px]">Chỉ số Cornell (RaVL + SV3):</span>
                <span className="font-mono font-bold text-slate-900">
                  {currentCase.metrics.cornellCriteria || "--"} mm
                </span>
                <span className="text-[10px] text-slate-500 block">Chuẩn: &lt; 28mm (Nam), &lt; 20mm (Nữ)</span>
              </div>
            </div>
          </div>

          {/* 6. AI Deep Learning Diagnostic Findings & Clinical Recommendations */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-indigo-700" />
                <h3 className="font-bold text-indigo-950 text-sm">
                  KẾT QUẢ PHÂN TÍCH HỌC SÂU AI &amp; HỘI CHẨN CHUYÊN MÔN
                </h3>
              </div>
              <div className="flex items-center gap-1.5 bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded font-bold font-mono text-[11px]">
                <span>Độ tin cậy AI:</span>
                <span className="text-indigo-700">{currentCase.diagnosis.confidence.primary}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-2">
                <div>
                  <span className="text-slate-500 font-bold block">1. KẾT LUẬN CHẨN ĐOÁN XÁC ĐỊNH:</span>
                  <div className="text-base font-black text-rose-900 mt-0.5">
                    {currentCase.diagnosis.primary}
                  </div>
                  {currentCase.diagnosis.culpritVesselOrCause && (
                    <div className="text-xs font-mono font-bold text-indigo-900 mt-0.5">
                      Động mạch vành thủ phạm / Căn nguyên: {currentCase.diagnosis.culpritVesselOrCause}
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-slate-500 font-bold block">2. DẤU HIỆU ĐIỆN HỌC THEN CHỐT:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-800 font-medium mt-1">
                    {currentCase.diagnosis.keyFindings.map((finding, idx) => (
                      <li key={idx}>{finding}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-indigo-100">
                <div>
                  <span className="text-slate-500 font-bold block">Chẩn đoán phân biệt:</span>
                  <ul className="list-disc list-inside text-slate-700 mt-0.5">
                    {currentCase.diagnosis.differentials.map((diff, idx) => (
                      <li key={idx}>{diff}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-indigo-100 pt-2">
                  <span className="text-slate-500 font-bold block">Tài liệu tham chiếu chuẩn:</span>
                  <span className="text-slate-700 font-medium block mt-0.5">
                    {currentCase.learningNotes.chapterRef} (BS Nguyễn Tôn Kinh Thi)
                  </span>
                </div>
              </div>
            </div>

            {/* Treatment & Action Recommendations */}
            <div className="border-t border-indigo-200/80 pt-2.5">
              <span className="text-slate-900 font-bold block mb-1">
                3. KHUYẾN CÁO XỬ TRÍ LÂM SÀNG &amp; HÀNH ĐỘNG CẤP CỨU:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-800 font-medium">
                {currentCase.diagnosis.treatment.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Note from BS Nguyễn Tôn Kinh Thi */}
            <div className="bg-amber-50/90 border border-amber-200 p-2.5 rounded-lg text-amber-950">
              <b className="font-bold">Ghi chú lâm sàng của chuyên gia: </b>
              {currentCase.diagnosis.clinicalNote}
            </div>
          </div>

          {/* 7. Official Signatures Block */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-300 text-xs">
            <div className="text-center space-y-12">
              <div className="font-bold text-slate-700 uppercase tracking-wide">
                KỸ THUẬT VIÊN ĐO ECG
              </div>
              <div className="font-medium text-slate-500 italic">
                (Ký, ghi rõ họ tên)
              </div>
            </div>

            <div className="text-center space-y-2 hidden sm:block">
              <div className="font-bold text-slate-700 uppercase tracking-wide">
                XÁC THỰC HỆ THỐNG AI
              </div>
              <div className="inline-block p-2 rounded-lg border border-slate-300 bg-slate-50 font-mono text-[10px] text-slate-600 text-left">
                <div>Hệ Thống: ECG Master Core</div>
                <div>Đào tạo: BS Nguyễn Tôn Kinh Thi</div>
                <div>Trạng thái: Đã kiểm chứng chuẩn</div>
              </div>
            </div>

            <div className="text-center space-y-12">
              <div className="font-bold text-slate-900 uppercase tracking-wide">
                BÁC SĨ CHUYÊN KHOA TIM MẠCH
              </div>
              <div className="font-bold text-slate-900">
                PGS. TS. BS. NGUYỄN VĂN AN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
