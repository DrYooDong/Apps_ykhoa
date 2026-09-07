import React, { useMemo, useState } from 'react';
import { Download, Loader2, Printer, ShieldAlert, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { AnalysisResult, ClinicalFormState, KnowledgeBase, LabsState, VitalsState } from '../types.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { calculateClinicalRiskScore, ClinicalRiskScore } from '../lib/riskScore.ts';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  results: AnalysisResult[];
  kb: KnowledgeBase;
  summaryText: string;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  form,
  vitals,
  labs,
  results,
  kb,
  summaryText,
}) => {
  const { user } = useAuth();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Compute Clinical Risk Score for the official report
  const riskScore: ClinicalRiskScore = useMemo(() => {
    return calculateClinicalRiskScore(vitals, labs, results, form);
  }, [vitals, labs, results, form]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const reportElement = document.getElementById('clinical-report-paper');
    if (!reportElement) return;

    try {
      setIsGeneratingPdf(true);

      // Create high-res canvas from paper element
      const canvas = await html2canvas(reportElement, {
        scale: 2, // High resolution for sharp text & charts
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210; // A4 mm
      const pageHeight = 297; // A4 mm
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add subsequent pages if multi-page report
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const patientPrefix = form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nu' : 'BN';
      const ageSuffix = form.tuoi ? `-${form.tuoi}T` : '';
      const dateStr = new Date().toISOString().slice(0, 10);
      const fileName = `Benh-An-MEDLENS-${patientPrefix}${ageSuffix}-${dateStr}.pdf`;

      pdf.save(fileName);
    } catch (err) {
      console.error('Lỗi khởi tạo PDF:', err);
      // Fallback: trigger system print/save dialog
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const top = results && results.length > 0 ? results[0] : null;
  const diffs = results && results.length > 1 ? results.slice(1, 4) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full shadow-xl overflow-hidden border border-slate-200 my-auto">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-slate-800">
              Xem trước Phiếu báo cáo phân tích bệnh án
            </span>
            <span className="text-[11px] font-mono-custom text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Khổ in A4 Chuẩn y tế
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download PDF Button */}
            <button
              id="btn-download-pdf-modal"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer transition-colors"
              title="Tải về file PDF chất lượng cao để lưu trữ hoặc gửi qua email"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang tạo PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file PDF (A4)</span>
                </>
              )}
            </button>

            {/* Print Button */}
            <button
              id="btn-print-modal"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer transition-colors"
              title="In trực tiếp ra máy in bệnh viện"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In ra giấy</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clinical Document Paper (Printed & Exported Area) */}
        <div
          id="clinical-report-paper"
          className="p-8 sm:p-12 text-[#1c2e33] font-sans text-xs sm:text-sm leading-normal print-paper bg-white"
        >
          {/* Official Medical Header */}
          <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-4 mb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                SỞ Y TẾ · BỆNH VIỆN ĐA KHOA
              </div>
              <div className="font-bold text-sm text-neutral-900">KHOA KHÁM BỆNH & CẤP CỨU</div>
              <div className="text-[11px] text-neutral-500 font-mono-custom mt-0.5">
                Hệ thống MedLens Clinical Intelligence
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
              </div>
              <div className="text-[11px] text-neutral-700 italic">Độc lập – Tự do – Hạnh phúc</div>
              <div className="text-[11px] text-neutral-500 font-mono-custom mt-1">
                Ngày {new Date().toLocaleDateString('vi-VN')} · {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center my-6">
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-neutral-900 tracking-tight">
              PHIẾU PHÂN TÍCH BỆNH ÁN & ĐỐI CHIẾU KHO TRI THỨC
            </h2>
            <div className="text-xs text-neutral-500 font-mono-custom mt-1">
              Mã hồ sơ: MEDLENS-{Date.now().toString().slice(-6)}
            </div>
          </div>

          {/* Patient Administrative Info */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-neutral-500">Giới tính:</span>{' '}
                <b className="text-neutral-900">
                  {form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nữ' : 'Chưa rõ'}
                </b>
              </div>
              <div>
                <span className="text-neutral-500">Tuổi:</span>{' '}
                <b className="text-neutral-900">{form.tuoi ? `${form.tuoi} tuổi` : '—'}</b>
              </div>
              <div>
                <span className="text-neutral-500">Nghề nghiệp:</span>{' '}
                <b className="text-neutral-900">{form.ngheNghiep || '—'}</b>
              </div>
              <div>
                <span className="text-neutral-500">Ngày vào viện:</span>{' '}
                <b className="text-neutral-900">{form.ngayVaoVien || new Date().toLocaleDateString('vi-VN')}</b>
              </div>
            </div>
            <div className="mt-2 text-xs">
              <span className="text-neutral-500">Lý do vào viện:</span>{' '}
              <b className="text-neutral-900">{form.lyDo || 'Khám lâm sàng / Cấp cứu'}</b>
            </div>
          </div>

          {/* CLINICAL RISK SCORE (NEWS2 & Urgency Indicator) */}
          <div
            className="border-2 rounded-lg p-3.5 mb-5 flex flex-wrap items-center justify-between gap-3"
            style={{
              borderColor: riskScore.color.hex,
              backgroundColor: riskScore.level === 4 ? '#fff1f2' : riskScore.level === 3 ? '#fff7ed' : '#f0fdf4',
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase text-white font-mono-custom"
                  style={{ backgroundColor: riskScore.color.hex }}
                >
                  {riskScore.badgeLabel}
                </span>
                <span className="font-bold text-xs text-neutral-900 uppercase">
                  {riskScore.levelName}
                </span>
              </div>
              <div className="text-xs text-neutral-700">
                <b>Khuyến nghị: </b> {riskScore.clinicalAction}
              </div>
              <div className="text-[11px] text-neutral-500 font-mono-custom mt-0.5">
                Tần suất theo dõi sinh hiệu: {riskScore.monitoringFrequency}
              </div>
            </div>

            <div className="text-right shrink-0">
              <div
                className="font-display font-black text-2xl"
                style={{ color: riskScore.color.hex }}
              >
                {riskScore.totalScore} điểm
              </div>
              <div className="text-[10px] text-neutral-500 font-mono-custom uppercase">
                Điểm cảnh báo sớm
              </div>
            </div>
          </div>

          {/* Vital Signs & Labs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="border border-neutral-200 rounded-lg p-3">
              <div className="font-bold text-xs uppercase text-neutral-700 mb-2 flex items-center justify-between">
                <span>Dấu hiệu sinh tồn</span>
                <span className="text-[10px] text-neutral-400 font-normal">Thăm khám ban đầu</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-custom">
                <div>Nhiệt độ: <b>{vitals.vNhiet ? `${vitals.vNhiet} °C` : '—'}</b></div>
                <div>Mạch: <b>{vitals.vMach ? `${vitals.vMach} l/ph` : '—'}</b></div>
                <div>Huyết áp: <b>{vitals.vHATT && vitals.vHATTr ? `${vitals.vHATT}/${vitals.vHATTr} mmHg` : '—'}</b></div>
                <div>Nhịp thở: <b>{vitals.vTho ? `${vitals.vTho} l/ph` : '—'}</b></div>
                <div>SpO₂: <b>{vitals.vSpo2 ? `${vitals.vSpo2} %` : '—'}</b></div>
                <div>BMI: <b>{vitals.vBMI || '—'}</b></div>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-lg p-3">
              <div className="font-bold text-xs uppercase text-neutral-700 mb-2 flex items-center justify-between">
                <span>Cận lâm sàng chính</span>
                <span className="text-[10px] text-neutral-400 font-normal">Xét nghiệm khẩn</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-custom">
                <div>Bạch cầu: <b>{labs.lBC ? `${labs.lBC} G/L` : '—'}</b></div>
                <div>Troponin I: <b>{labs.lTrop ? `${labs.lTrop} ng/mL` : '—'}</b></div>
                <div>Đường huyết: <b>{labs.lGlu ? `${labs.lGlu} mmol/L` : '—'}</b></div>
                <div>Creatinine: <b>{labs.lCre ? `${labs.lCre} µmol/L` : '—'}</b></div>
                <div>AST/ALT: <b>{labs.lAST || labs.lALT ? `${labs.lAST || '—'}/${labs.lALT || '—'} U/L` : '—'}</b></div>
                <div>CRP: <b>{labs.lCRP ? `${labs.lCRP} mg/L` : '—'}</b></div>
              </div>
            </div>
          </div>

          {/* Clinical Summary */}
          {summaryText && (
            <div className="mb-5">
              <div className="font-bold text-xs uppercase text-neutral-700 mb-1.5">Tóm tắt bệnh án</div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs leading-relaxed whitespace-pre-wrap">
                {summaryText}
              </div>
            </div>
          )}

          {/* Results Summary & Primary Diagnosis */}
          {top && (
            <div className="border-2 border-neutral-900 rounded-lg p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs uppercase bg-neutral-900 text-white px-2 py-0.5 rounded">
                  CHẨN ĐOÁN SƠ BỘ NGHĨ NHIỀU NHẤT
                </span>
                <span className="font-mono-custom font-bold text-sm text-neutral-900">
                  Độ phù hợp: {top.pct}% (Khớp {top.matched.length} dữ kiện)
                </span>
              </div>
              <div className="text-lg font-bold text-neutral-900 mb-1">
                {top.b.ten} <span className="font-mono-custom text-sm font-normal">({top.b.icd})</span>
              </div>
              <p className="text-xs text-neutral-600 mb-3">{top.b.tomTat}</p>

              {/* Bằng chứng khớp */}
              <div className="text-xs text-neutral-700 mb-2">
                <b>Bằng chứng khớp: </b>
                {top.matched.map((m) => `${m.tc.ten} (+${m.w})`).join(', ')}.
              </div>

              {/* Differentials */}
              {diffs.length > 0 && (
                <div className="pt-3 border-t border-neutral-200">
                  <div className="font-bold text-xs text-neutral-700 mb-1">Chẩn đoán phân biệt cần loại trừ:</div>
                  <ul className="list-disc list-inside text-xs text-neutral-600 space-y-0.5">
                    {diffs.map((d, i) => (
                      <li key={i}>
                        <b>{d.b.ten}</b> ({d.b.icd}) — Phù hợp {d.pct}% (Khớp {d.matched.length} dữ kiện).
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Treatment Protocol Steps & Recommended Medications */}
          {top?.b?.phacDo && (
            <div className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50/50">
              <div className="font-bold text-xs uppercase text-neutral-800 mb-2">
                Hướng dẫn phác đồ xử trí ban đầu (Bộ Y tế)
              </div>

              {top.b.phacDo.tuyen && top.b.phacDo.tuyen.length > 0 && (
                <div className="mb-3 text-xs">
                  <span className="font-bold text-neutral-700 block mb-1">• Quy trình xử trí:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-neutral-700">
                    {top.b.phacDo.tuyen.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}

              {top.b.phacDo.thuoc && top.b.phacDo.thuoc.length > 0 && (
                <div className="text-xs">
                  <span className="font-bold text-neutral-700 block mb-1">• Thuốc & Y lệnh ưu tiên:</span>
                  <div className="space-y-1">
                    {top.b.phacDo.thuoc.map(([drug, dose, note], idx) => (
                      <div key={idx} className="flex justify-between border-b border-neutral-200 pb-0.5">
                        <span className="font-bold text-neutral-900">{drug}</span>
                        <span className="font-mono-custom text-neutral-700">{dose} {note ? `(${note})` : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Doctor Signature Block */}
          <div className="grid grid-cols-2 gap-8 text-center pt-6 border-t border-neutral-300">
            <div>
              <div className="font-bold text-xs uppercase text-neutral-600">BỆNH NHÂN / THÂN NHÂN</div>
              <div className="text-[11px] text-neutral-400 italic mt-0.5">(Ký và ghi rõ họ tên)</div>
              <div className="h-16"></div>
            </div>
            <div>
              <div className="font-bold text-xs uppercase text-neutral-600">BÁC SĨ KHÁM BỆNH</div>
              <div className="text-[11px] text-neutral-400 italic mt-0.5">(Ký, đóng dấu và ghi rõ họ tên)</div>
              <div className="h-16"></div>
              <div className="font-bold text-xs text-neutral-900">
                {user?.name || 'BS.CKI Nguyễn Văn Minh'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
