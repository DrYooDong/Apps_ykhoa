import React from 'react';
import { X, Download, Printer, FileText, CheckCircle2, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { ConsultationReportData, generatePdfConsultationReport, triggerPrintConsultation } from '../utils/pdfGenerator';

interface PdfConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportData: ConsultationReportData;
  language: Language;
}

export const PdfConsultationModal: React.FC<PdfConsultationModalProps> = ({
  isOpen,
  onClose,
  reportData,
  language
}) => {
  const isEn = language === 'en';

  if (!isOpen) return null;

  const handleDownload = () => {
    generatePdfConsultationReport(reportData);
  };

  const handlePrint = () => {
    triggerPrintConsultation();
  };

  const { patient, renal, drug, doseResult, interactions, scenarioLabel } = reportData;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                {isEn ? 'Antimicrobial Dosing Consultation Record' : 'Phiếu Hội Chẩn Dược Lâm Sàng & Liều Kháng Sinh'}
              </h3>
              <p className="text-xs text-white/80">
                {isEn ? 'Preview official consultation document before PDF export' : 'Xem trước phiếu hội chẩn chính thức trước khi xuất PDF / In'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: A4 Paper Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/70">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-slate-200/80 max-w-2xl mx-auto text-xs text-slate-800 space-y-4">
            
            {/* Header Hospital & Title */}
            <div className="border-b-2 border-blue-600 pb-3 flex justify-between items-start">
              <div>
                <span className="font-extrabold text-blue-900 uppercase text-xs block">
                  {isEn ? 'HOSPITAL CLINICAL PHARMACY DEPARTMENT' : 'BỆNH VIỆN - KHOA DƯỢC LÂM SÀNG'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Antimicrobial Stewardship Program (ASP) & CDSS
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">
                  {isEn ? 'Date:' : 'Ngày hội chẩn:'} {new Date().toLocaleDateString('vi-VN')}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  REF: CDSS-{patient.patientId || 'INP-2026'}
                </span>
              </div>
            </div>

            <div className="text-center py-1">
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight uppercase">
                {isEn ? 'ANTIMICROBIAL DOSING CONSULTATION RECORD' : 'PHIẾU HỘI CHẨN & QUẢN LÝ LIỀU KHÁNG SINH'}
              </h2>
              <span className="text-[11px] text-blue-700 font-semibold">
                {isEn ? 'Renal Impairment Adjustment & Drug Interaction Screening' : 'Hiệu chỉnh liều theo chức năng thận & Sàng lọc tương tác thuốc'}
              </span>
            </div>

            {/* 1. Patient & Renal Demographics */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-blue-900 text-xs block mb-1.5 uppercase">
                1. {isEn ? 'Patient Demographics & Renal Clearance' : 'Thông tin Bệnh nhân & Chức năng Thận'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500">{isEn ? 'Patient Name:' : 'Họ tên:'} </span>
                  <span className="font-bold text-slate-900">{patient.patientName || 'Nguyễn Văn A'}</span>
                </div>
                <div>
                  <span className="text-slate-500">{isEn ? 'Patient ID:' : 'Mã BN:'} </span>
                  <span className="font-bold">{patient.patientId || 'BN-102938'}</span>
                </div>
                <div>
                  <span className="text-slate-500">{isEn ? 'Age / Gender:' : 'Tuổi / Giới:'} </span>
                  <span className="font-bold">{patient.age}t / {patient.gender === 'm' ? (isEn ? 'Male' : 'Nam') : (isEn ? 'Female' : 'Nữ')}</span>
                </div>
                <div>
                  <span className="text-slate-500">{isEn ? 'Weight / Height:' : 'Cân nặng / CC:'} </span>
                  <span className="font-bold">{patient.weight} kg {patient.height ? `/ ${patient.height} cm` : ''}</span>
                </div>
                <div>
                  <span className="text-slate-500">Scr: </span>
                  <span className="font-bold">{renal.scrUmol} µmol/L ({renal.scrMgdl} mg/dL)</span>
                </div>
                <div>
                  <span className="text-slate-500">CrCl (Cockcroft-Gault): </span>
                  <span className="font-black text-blue-700">{renal.crcl} mL/phút</span>
                </div>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-slate-200 text-[10px] text-slate-600 flex justify-between">
                <span>{isEn ? 'Status:' : 'Phân loại thận:'} <strong className="text-slate-800">{isEn ? renal.categoryLabelEn : renal.categoryLabelVi}</strong></span>
                <span>{isEn ? 'Calculated Weight:' : 'Cân nặng tính CrCl:'} <strong className="text-slate-800">{renal.usedWeight} kg ({renal.usedWeightType})</strong></span>
              </div>
            </div>

            {/* 2. Antibiotic Regimen Recommendation */}
            <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
              <span className="font-bold text-blue-900 text-xs block mb-1.5 uppercase">
                2. {isEn ? 'Antimicrobial Recommendation' : 'Khuyến cáo Liều Kháng sinh (CDSS)'}
              </span>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-600">{isEn ? 'Antibiotic: ' : 'Kháng sinh: '}</span>
                  <strong className="text-slate-900 text-sm">{drug.name}</strong> ({drug.group})
                </div>
                <div>
                  <span className="text-slate-600">{isEn ? 'Scenario / Indication: ' : 'Phác đồ / Chỉ định: '}</span>
                  <span className="font-semibold text-slate-800">{scenarioLabel}</span>
                </div>

                {doseResult.loadingDoseTextVi && (
                  <div className="p-2 rounded bg-amber-100/70 text-amber-950 font-semibold">
                    <span className="font-bold text-amber-800">{isEn ? 'Loading Dose: ' : 'Liều nạp (Loading dose): '}</span>
                    {isEn ? doseResult.loadingDoseTextEn : doseResult.loadingDoseTextVi}
                  </div>
                )}

                <div className="p-2 rounded bg-white border border-blue-200">
                  <span className="font-bold text-blue-900 block mb-0.5">
                    {isEn ? 'Maintenance Dose (CrCl Adjusted):' : 'Liều duy trì (Đã hiệu chỉnh thận):'}
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {isEn ? doseResult.maintenanceDoseTextEn : doseResult.maintenanceDoseTextVi}
                  </span>
                </div>

                <div className="text-[11px] text-slate-700">
                  <span className="font-bold">{isEn ? 'Administration & Infusion: ' : 'Cách dùng & Dung môi: '}</span>
                  {isEn ? doseResult.infusionInstructionsEn : doseResult.infusionInstructionsVi}
                </div>
              </div>
            </div>

            {/* 3. Renal Rationale */}
            <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-200 text-[11px]">
              <span className="font-bold text-amber-900 block mb-0.5">
                3. {isEn ? 'Renal Rationale:' : 'Cơ sở hiệu chỉnh liều theo thận:'}
              </span>
              <p className="text-amber-950 leading-relaxed">
                {isEn ? doseResult.renalAdjustmentAdviceEn : doseResult.renalAdjustmentAdviceVi}
              </p>
            </div>

            {/* 4. Drug Interactions Screening */}
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px]">
              <span className="font-bold text-slate-800 block mb-0.5">
                4. {isEn ? 'Drug-Drug Interaction Risk Evaluation:' : 'Đánh giá nguy cơ tương tác thuốc:'}
              </span>
              {interactions.length > 0 ? (
                <div className="space-y-1 mt-1">
                  {interactions.map(inter => (
                    <div key={inter.id} className="p-1.5 rounded bg-rose-50 border border-rose-200 text-rose-950 text-[10px]">
                      <strong className="text-rose-900">[{inter.severity.toUpperCase()}] {inter.interactingDrugVi}:</strong> {inter.clinicalEffectVi}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600">
                  {isEn ? 'No major contraindications or catastrophic interactions found.' : 'Không ghi nhận tương tác thuốc nghiêm trọng với phác đồ này.'}
                </p>
              )}
            </div>

            {/* Signatures */}
            <div className="pt-6 grid grid-cols-2 gap-4 text-center text-xs">
              <div>
                <span className="font-bold text-slate-800 block uppercase">
                  {isEn ? 'Attending Physician' : 'Bác sĩ điều trị'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {isEn ? '(Signature & Name)' : '(Ký và ghi rõ họ tên)'}
                </span>
                <div className="h-12"></div>
              </div>
              <div>
                <span className="font-bold text-slate-800 block uppercase">
                  {isEn ? 'Clinical Pharmacist' : 'Dược sĩ lâm sàng'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {isEn ? '(Signature & Name)' : '(Ký và ghi rõ họ tên)'}
                </span>
                <div className="h-12"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {isEn ? 'Back to Dashboard' : 'Quay lại'}
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 shadow-2xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Direct Print' : 'In phiếu'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isEn ? 'Download PDF Report' : 'Tải Phiếu PDF'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
