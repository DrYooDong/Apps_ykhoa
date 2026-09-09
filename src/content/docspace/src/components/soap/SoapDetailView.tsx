import React from 'react';
import {
  Activity,
  AlertTriangle,
  Award,
  Edit3,
  FileCheck,
  Lightbulb,
  Pill,
  Sparkles,
  Star,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { EXPERIENCE_LEVEL_LABELS } from '../../data/soapSeedData.ts';

interface SoapDetailViewProps {
  currentCase: SoapClinicalExperience;
  viewMode: 'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p';
  setViewMode: (mode: 'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p') => void;
  onEditCase: (c: SoapClinicalExperience) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  className?: string;
}

export const SoapDetailView: React.FC<SoapDetailViewProps> = ({
  currentCase,
  viewMode,
  setViewMode,
  onEditCase,
  onOpenVaultDrawer,
  className = '',
}) => {
  return (
    <div id="soap-detail-view" className={`flex flex-col gap-4 ${className}`}>
      {/* Case Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-4xl flex-1">
          {/* Primary Category Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].bg
              } ${EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].text} border ${
                EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].border
              }`}
            >
              {EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].label}
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-mono-custom text-xs font-bold rounded-md border border-slate-200">
              ICD-10: {currentCase.a.icd10}
            </span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-200/70">
              {currentCase.specialty}
            </span>
            {currentCase.clinicalContext && (
              <span className="px-2.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium rounded-md flex items-center gap-1">
                <span>🏥</span>
                <span>{currentCase.clinicalContext}</span>
              </span>
            )}
            {currentCase.difficultyRating && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                <span>{'★'.repeat(currentCase.difficultyRating)}</span>
                <span className="text-[10.5px] text-amber-600 font-mono-custom">
                  ({currentCase.difficultyRating}/5)
                </span>
              </span>
            )}
            {currentCase.isFavorite && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-500" />
                <span>Yêu thích</span>
              </span>
            )}
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {currentCase.title}
          </h2>

          {/* Context & Meta Bar */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2.5 px-3 text-xs text-slate-600 flex items-center gap-2.5 flex-wrap">
            <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              {currentCase.demographicContext}
            </span>
            <span className="text-slate-300">·</span>
            <span>
              Đúc kết bởi: <b className="text-slate-800">{currentCase.authorDoctor || 'Bác sĩ lâm sàng'}</b>
            </span>
            <span className="text-slate-300">·</span>
            <span>
              Ngày lưu: <span className="font-mono-custom">{currentCase.createdAt}</span>
            </span>
            {currentCase.sourceReference && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-blue-700 italic">
                  Nguồn: {currentCase.sourceReference}
                </span>
              </>
            )}
          </div>

          {/* Tags & Outcome */}
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            {currentCase.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white text-slate-600 border border-slate-200 rounded-md text-[11px] font-medium hover:border-slate-300 transition-colors"
              >
                #{t}
              </span>
            ))}

            {currentCase.outcomeNotes && (
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kết cục: {currentCase.outcomeNotes}</span>
              </span>
            )}
          </div>
        </div>

        {/* Quick Jump & Tool Shortcuts */}
        <div className="flex flex-col items-end gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <button
              type="button"
              onClick={() => onEditCase(currentCase)}
              className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Chỉnh sửa chi tiết ca kinh nghiệm SOAP này"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Sửa ca này</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Mở 19 công cụ và thang điểm lâm sàng trong Kho CC"
            >
              <span>🧮</span>
              <span>Kho Công cụ (19)</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'ICD10')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Mở Cẩm nang ICD-10 và Bẫy lỗi BHYT trong Kho ICD10"
            >
              <span>🏷️</span>
              <span>Kho ICD-10 (11)</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Mở Hệ thống hỗ trợ ra quyết định lâm sàng trong Kho CDSS"
            >
              <span>⚡</span>
              <span>Kho CDSS (3)</span>
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 border border-slate-200/90 rounded-xl p-1 bg-slate-100/80 text-xs no-print shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bảng 4 Cột (SOAP)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-s')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-s'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột S
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-o')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-o'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột O
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-a')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-a'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột A
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-p')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-p'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột P
            </button>
          </div>
        </div>
      </div>

      {/* 4-COLUMN SOAP MATRIX BOARD */}
      <div
        className={`grid gap-4 ${
          viewMode === 'board' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'
        }`}
      >
        {/* ========================================== */}
        {/* CỘT S: SUBJECTIVE                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-s') && (
          <div className="bg-white border border-sky-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-sky-300 transition-colors">
            <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                  S
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                    SUBJECTIVE
                  </h3>
                  <p className="text-[10.5px] text-sky-100">
                    Chủ quan · Bệnh sử &amp; Khai thác
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-sky-800/60 text-sky-100 text-[10px] font-mono-custom font-semibold border border-sky-400/30">
                Lắng nghe
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
              {/* 1. Than phiền chính */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  1. Than phiền chính (Chief Complaint):
                </span>
                <div className="p-3 bg-sky-50/80 border border-sky-200/80 rounded-xl font-medium text-sky-950 leading-relaxed shadow-2xs">
                  "{currentCase.s.chiefComplaint}"
                </div>
              </div>

              {/* 2. Bệnh sử PQRST */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  2. Diễn tiến bệnh sử (PQRST):
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.s.historyOfPresentIllness}
                </p>
              </div>

              {/* 3. Tiền căn */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  3. Tiền căn &amp; Thuốc đang dùng (PMH):
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.s.pastMedicalHistory}
                </p>
              </div>

              {/* 4. Triệu chứng cơ năng */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  4. Triệu chứng cơ năng ghi nhận:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCase.s.symptomsList.map((sym, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium text-[11px]"
                    >
                      • {sym}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Dấu ấn khai thác bệnh sử */}
              <div className="mt-auto pt-2">
                <div className="p-3.5 bg-sky-50/80 border-l-4 border-l-sky-500 border border-sky-200/80 rounded-r-xl text-sky-950 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-sky-900 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>DẤU ẤN HỎI BỆNH (HISTORY PEARL)</span>
                  </div>
                  <p className="text-xs text-sky-900/90 leading-relaxed italic">
                    {currentCase.s.historyPearls}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* CỘT O: OBJECTIVE                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-o') && (
          <div className="bg-white border border-indigo-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-indigo-300 transition-colors">
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                  O
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                    OBJECTIVE
                  </h3>
                  <p className="text-[10.5px] text-indigo-100">
                    Khách quan · Khám &amp; Cận lâm sàng
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-800/60 text-indigo-100 text-[10px] font-mono-custom font-semibold border border-indigo-400/30">
                Đo lường
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
              {/* 1. Sinh hiệu */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  1. Dấu hiệu sinh tồn (Vitals):
                </span>
                <div className="grid grid-cols-3 gap-1.5 font-mono-custom text-center">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">Nhiệt độ</span>
                    <b className="text-xs text-slate-900">{currentCase.o.vitals.temp || '—'}°C</b>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">Mạch</span>
                    <b className="text-xs text-slate-900">{currentCase.o.vitals.pulse || '—'} l/p</b>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">Huyết áp</span>
                    <b className="text-xs text-rose-700">{currentCase.o.vitals.bp || '—'}</b>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">Nhịp thở</span>
                    <b className="text-xs text-slate-900">{currentCase.o.vitals.resp || '—'} l/p</b>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">SpO₂</span>
                    <b className="text-xs text-emerald-700">{currentCase.o.vitals.spo2 || '—'}%</b>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                    <span className="block text-[9.5px] text-slate-500 font-sans">BMI</span>
                    <b className="text-xs text-slate-900">{currentCase.o.vitals.bmi || '—'}</b>
                  </div>
                </div>
              </div>

              {/* 2. Khám thực thể */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                  2. Khám thực thể định hướng:
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.o.physicalExam}
                </p>
              </div>

              {/* 3. Cận lâm sàng */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                  3. Cận lâm sàng &amp; Xét nghiệm định lượng:
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-mono-custom text-[11px]">
                  {currentCase.o.labsAndImaging}
                </p>
              </div>

              {/* 4. Bẫy cận lâm sàng */}
              <div className="mt-auto pt-2">
                <div className="p-3.5 bg-rose-50/80 border-l-4 border-l-rose-500 border border-rose-200/80 rounded-r-xl text-rose-950 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-rose-900 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>BẪY CẬN LÂM SÀNG (OBJECTIVE PITFALL)</span>
                  </div>
                  <p className="text-xs text-rose-900/90 leading-relaxed italic">
                    {currentCase.o.objectivePitfalls}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* CỘT A: ASSESSMENT                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-a') && (
          <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-amber-300 transition-colors">
            <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                  A
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                    ASSESSMENT
                  </h3>
                  <p className="text-[10.5px] text-amber-100">
                    Đánh giá · Chẩn đoán &amp; Biện luận
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-800/60 text-amber-100 text-[10px] font-mono-custom font-semibold border border-amber-400/30">
                Tư duy
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
              {/* 1. Chẩn đoán xác định */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  1. Chẩn đoán sơ bộ / Xác định:
                </span>
                <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-xl shadow-2xs">
                  <div className="font-bold text-xs text-amber-950 leading-snug">
                    {currentCase.a.primaryDiagnosis}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono-custom text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                      ICD-10: {currentCase.a.icd10}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Chẩn đoán phân biệt */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  2. Chẩn đoán phân biệt cần loại trừ:
                </span>
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.a.differentials.map((diff, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                      <span className="text-amber-600 font-bold">≠</span>
                      <span>{diff}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Phân tầng nguy cơ */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  3. Phân tầng nguy cơ &amp; Thang điểm:
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.a.riskStratification}
                </p>
              </div>

              {/* 4. Đúc kết biện luận chẩn đoán */}
              <div className="mt-auto pt-2">
                <div className="p-3.5 bg-amber-50/80 border-l-4 border-l-amber-500 border border-amber-200/80 rounded-r-xl text-amber-950 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-amber-900 mb-1.5">
                    <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>ĐÚC KẾT BIỆN LUẬN (DIAGNOSTIC PEARL)</span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed italic">
                    {currentCase.a.diagnosticPearls}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* CỘT P: PLAN                                */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-p') && (
          <div className="bg-white border border-teal-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-teal-300 transition-colors">
            <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                  P
                </div>
                <div>
                  <h3 className="font-display font-bold text-xs uppercase tracking-wider">PLAN</h3>
                  <p className="text-[10.5px] text-teal-100">
                    Kế hoạch · Xử trí, Thuốc &amp; Bài học
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal-800/60 text-teal-100 text-[10px] font-mono-custom font-semibold border border-teal-400/30">
                Hành động
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
              {/* 1. Xử trí cấp cứu */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  1. Xử trí cấp cứu &amp; Ban đầu:
                </span>
                <p className="text-slate-700 leading-relaxed bg-teal-50/60 p-3 rounded-xl border border-teal-200/80">
                  {currentCase.p.immediateActions}
                </p>
              </div>

              {/* 2. Y lệnh thuốc */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <Pill className="w-3.5 h-3.5 text-teal-600" />
                  2. Y lệnh thuốc cụ thể:
                </span>
                <div className="space-y-1.5">
                  {currentCase.p.medications.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{med.drug}</span>
                        <span className="font-mono-custom text-[11px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                          {med.dose}
                        </span>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex items-center justify-between mt-0.5">
                        <span>
                          Đường dùng: <b className="text-slate-700">{med.route}</b>
                        </span>
                        {med.note && <span className="italic text-slate-600">{med.note}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Chỉ tiêu theo dõi */}
              <div>
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                  3. Theo dõi &amp; Mục tiêu lâm sàng:
                </span>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  {currentCase.p.monitoringAndTargets}
                </p>
              </div>

              {/* 4. Bài học kinh nghiệm */}
              <div className="mt-auto pt-2">
                <div className="p-3.5 bg-teal-50/80 border-l-4 border-l-teal-600 border border-teal-200/80 rounded-r-xl text-teal-950 shadow-2xs">
                  <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-teal-900 mb-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ (TAKEAWAY)</span>
                  </div>
                  <p className="text-xs text-teal-900/90 leading-relaxed italic">
                    {currentCase.p.takeawayLessons}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
