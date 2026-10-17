import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Activity,
  Tag,
  Stethoscope,
  ExternalLink,
  HelpCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { FiveComponentDiagnosis } from '../../types.ts';

interface FiveComponentDiagnosisCardProps {
  diagnosis: FiveComponentDiagnosis;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onGoToProtocol?: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
}

export const FiveComponentDiagnosisCard: React.FC<FiveComponentDiagnosisCardProps> = ({
  diagnosis,
  onOpenVaultDrawer,
  onGoToProtocol,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopyOneLine = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(diagnosis.fullDiagnosisString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPrimary = diagnosis.isPrimary;
  const c1 = diagnosis.component1_confirmation;
  const c2 = diagnosis.component2_severity;
  const c3 = diagnosis.component3_classification;
  const c4 = diagnosis.component4_etiology;
  const c5 = diagnosis.component5_complications;

  // Determine severity border/color styling
  const isCritical = c2?.grade.toLowerCase().includes('nguy kịch') || c2?.grade.toLowerCase().includes('cấp cứu');
  const isSevere = c2?.grade.toLowerCase().includes('nặng') || c2?.grade.toLowerCase().includes('độ 2');

  return (
    <div
      className={`rounded-2xl border transition-all overflow-hidden ${
        isPrimary
          ? isCritical
            ? 'bg-white border-rose-300 shadow-sm ring-1 ring-rose-400/20'
            : isSevere
            ? 'bg-white border-amber-300 shadow-sm ring-1 ring-amber-400/20'
            : 'bg-white border-blue-300 shadow-sm ring-1 ring-blue-400/20'
          : 'bg-slate-50/70 border-slate-300/80 shadow-2xs'
      }`}
    >
      {/* 1. HEADER CARD: BỆNH DANH + PHÂN CẤP ƯU TIÊN + NÚT SAO CHÉP */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
          isPrimary
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white'
            : 'bg-gradient-to-r from-slate-100 via-blue-50/60 to-slate-100 text-slate-800 border-b border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {/* Badge phân cấp Bệnh chính vs Bệnh phụ */}
          {isPrimary ? (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-600 text-white uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              🔴 I. BỆNH CHÍNH (ƯU TIÊN 1)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-600 text-white uppercase tracking-wider shadow-xs">
              🔵 II. BỆNH PHỤ / ĐỒNG MẮC (#{diagnosis.priorityRank})
            </span>
          )}

          {/* Tên bệnh */}
          <h3 className={`text-base sm:text-lg font-extrabold tracking-tight ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
            {diagnosis.diseaseName}
          </h3>

          {/* ICD Code Badge */}
          <span
            className={`px-2 py-0.5 rounded-md font-mono-custom text-xs font-bold border ${
              isPrimary
                ? 'bg-white/10 text-blue-200 border-white/20'
                : 'bg-white text-slate-700 border-slate-300'
            }`}
          >
            ICD-10: {diagnosis.diseaseIcd}
          </span>

          {/* Confidence % */}
          <span
            className={`text-xs font-semibold ${
              isPrimary ? 'text-blue-300' : 'text-slate-500'
            }`}
          >
            {diagnosis.confidence}% Khớp CDSS
          </span>
        </div>

        {/* Nút Copy 1-Dòng & Nút thu gọn */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyOneLine}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : isPrimary
                ? 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
            title="Sao chép chẩn đoán 1 dòng của bệnh này cho EMR"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Đã sao chép' : 'Chép 1-Dòng'}</span>
          </button>

          <button
            type="button"
            className={`p-1 rounded-lg ${isPrimary ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. CHUỖI CHẨN ĐOÁN 1 DÒNG ĐẦY ĐỦ TRONG HỒ SƠ */}
      <div className="px-4 sm:px-5 py-2.5 bg-slate-50/90 border-b border-slate-200 text-xs sm:text-[13px] font-semibold text-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] shrink-0">
            EMR Format:
          </span>
          <span className="truncate text-slate-900 font-mono-custom text-[12px]">
            {diagnosis.fullDiagnosisString}
          </span>
        </div>
        {onGoToProtocol && isPrimary && (
          <button
            type="button"
            onClick={() => onGoToProtocol(diagnosis.diseaseId)}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 shrink-0 cursor-pointer"
          >
            <span>Phác đồ</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* 3. THANH TRẠNG THÁI 5 THÀNH TỐ (STEPPER CHIPS BAR) */}
      <div className="px-4 sm:px-5 py-2 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px] font-bold">
        {/* Ô 1: Xác định */}
        <span
          className={`px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
            c1.isConfirmed
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : 'bg-amber-50 text-amber-800 border border-amber-300'
          }`}
        >
          {c1.goldStandardMet ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <HelpCircle className="w-3.5 h-3.5 text-amber-600" />}
          <span>1. Xác định: {c1.goldStandardMet ? 'Đạt Tiêu chuẩn Vàng' : c1.confirmationLevel.toUpperCase()}</span>
        </span>

        {/* Ô 2: Phân độ */}
        <span
          className={`px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
            isCritical
              ? 'bg-rose-50 text-rose-800 border border-rose-300'
              : isSevere
              ? 'bg-amber-50 text-amber-800 border border-amber-300'
              : 'bg-blue-50 text-blue-800 border border-blue-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>2. Phân độ: {c2?.grade.split('(')[0].trim() || 'Chưa phân độ'}</span>
        </span>

        {/* Ô 3: Phân loại */}
        {c3 && (
          <span className="px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 bg-indigo-50 text-indigo-800 border border-indigo-200">
            <Tag className="w-3.5 h-3.5 text-indigo-600" />
            <span>3. Phân loại: {c3.result}</span>
          </span>
        )}

        {/* Ô 4: Nguyên nhân */}
        <span
          className={`px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
            c4?.confidence === 'confirmed'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : 'bg-amber-50 text-amber-900 border border-amber-300'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>4. Nguyên nhân: {c4?.confidence === 'confirmed' ? 'Xác định' : 'Cần thêm CLS'}</span>
        </span>

        {/* Ô 5: Biến chứng */}
        <span
          className={`px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
            c5.filter((c) => c.status === 'present').length > 0
              ? 'bg-rose-50 text-rose-800 border border-rose-300'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {c5.filter((c) => c.status === 'present').length > 0 ? (
            <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          )}
          <span>5. Biến chứng: {c5.filter((c) => c.status === 'present').length} hiện hữu</span>
        </span>
      </div>

      {/* 4. NỘI DUNG CHI TIẾT 5 THÀNH TỐ (COLLAPSIBLE CONTENT) */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ================================================================= */}
            {/* THÀNH TỐ 1: CHẨN ĐOÁN XÁC ĐỊNH (CONFIRMATION)                     */}
            {/* ================================================================= */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    Chẩn Đoán Xác Định (Confirmation):
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      c1.goldStandardMet
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {c1.goldStandardMet ? 'Đạt Tiêu chuẩn Vàng' : `Mức độ: ${c1.confirmationLevel.toUpperCase()}`}
                  </span>
                </div>

                {/* Tiêu chuẩn vàng */}
                <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-lg text-xs text-emerald-950 mb-2">
                  <span className="font-bold block text-emerald-900 text-[11px] uppercase tracking-wide mb-0.5">
                    Tiêu chuẩn vàng / Chuẩn chẩn đoán:
                  </span>
                  <p className="leading-relaxed">{c1.goldStandardText}</p>
                </div>

                {/* Tiêu chuẩn đang thỏa mãn */}
                {c1.supportingCriteria.length > 0 && (
                  <div className="space-y-1 text-xs text-slate-700">
                    <span className="font-semibold text-slate-800 block text-[11px]">
                      Bằng chứng lâm sàng &amp; cận lâm sàng thỏa mãn:
                    </span>
                    <ul className="space-y-1 pl-1">
                      {c1.supportingCriteria.map((sc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tiêu chuẩn còn thiếu */}
                {c1.missingCriteria.length > 0 && (
                  <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100 mt-2">
                    <span className="font-semibold text-slate-500 block text-[11px]">
                      Dữ kiện theo dõi bổ sung:
                    </span>
                    <ul className="space-y-0.5 pl-1">
                      {c1.missingCriteria.map((mc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-1.5"></span>
                          <span>{mc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {onOpenVaultDrawer && (
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer(diagnosis.diseaseName, `tiêu chuẩn chẩn đoán ${diagnosis.diseaseName}`, 'CD')}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start pt-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Tra cứu Kho Tiêu chuẩn CĐ (Kho 2.1)</span>
                </button>
              )}
            </div>

            {/* ================================================================= */}
            {/* THÀNH TỐ 2: PHÂN ĐỘ / MỨC ĐỘ NẶNG (SEVERITY)                      */}
            {/* ================================================================= */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    Phân Độ / Mức Độ Nặng (Severity):
                  </span>
                  {c2?.score && (
                    <span className="text-[11px] font-mono-custom font-bold bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded">
                      {c2.score}
                    </span>
                  )}
                </div>

                <div
                  className={`p-3 rounded-xl border mb-2.5 ${
                    isCritical
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : isSevere
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-blue-50/70 border-blue-200 text-blue-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isCritical ? (
                      <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : isSevere ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    ) : (
                      <Activity className="w-5 h-5 text-blue-600 shrink-0" />
                    )}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                        Phân tầng lâm sàng:
                      </span>
                      <h4 className="text-sm font-extrabold">{c2?.grade || 'Chưa xác định phân độ'}</h4>
                    </div>
                  </div>
                </div>

                {/* Tiêu chuẩn phân độ */}
                {c2?.criteria && c2.criteria.length > 0 && (
                  <div className="space-y-1 text-xs text-slate-700">
                    <span className="font-semibold text-slate-800 block text-[11px]">
                      Dữ kiện thỏa mãn phân độ:
                    </span>
                    <ul className="space-y-1 pl-1">
                      {c2.criteria.map((cr, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{cr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Red Flags / Warning Flags */}
                {c2?.warningFlags && c2.warningFlags.length > 0 && (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-900 mt-2 space-y-0.5">
                    <span className="font-bold flex items-center gap-1 text-[11px] text-rose-800 uppercase tracking-wide">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                      Cảnh báo sinh tồn / Hướng xử trí:
                    </span>
                    {c2.warningFlags.map((wf, i) => (
                      <p key={i} className="font-medium pl-4">&bull; {wf}</p>
                    ))}
                  </div>
                )}
              </div>

              {onOpenVaultDrawer && (
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer(diagnosis.diseaseName, `phân tầng mức độ nặng ${diagnosis.diseaseName}`, 'CD')}
                  className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start pt-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Xem thang điểm phân độ (Kho 2.2)</span>
                </button>
              )}
            </div>

            {/* ================================================================= */}
            {/* THÀNH TỐ 3: PHÂN LOẠI THEO GUIDELINE (CLASSIFICATION)             */}
            {/* ================================================================= */}
            {c3 && (
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                      Phân Loại Theo Guideline (Classification):
                    </span>
                    <span className="text-[11px] font-mono-custom font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded">
                      ICD-10: {c3.icdSuffix || diagnosis.diseaseIcd}
                    </span>
                  </div>

                  <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl mb-2">
                    <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block mb-0.5">
                      Hệ thống: {c3.system}
                    </span>
                    <h4 className="text-sm font-extrabold text-indigo-950">
                      {c3.result}
                    </h4>
                  </div>

                  {c3.criteria && (
                    <div className="text-xs text-slate-700 space-y-1">
                      <span className="font-semibold text-slate-800 block text-[11px]">
                        Tiêu chuẩn phân nhóm:
                      </span>
                      <p className="leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        {c3.criteria}
                      </p>
                    </div>
                  )}
                </div>

                {onOpenVaultDrawer && (
                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer(diagnosis.diseaseName, `guideline ${c3.system}`, 'EBM')}
                    className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 self-start pt-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Tra cứu Guideline {c3.system} (Kho EBM)</span>
                  </button>
                )}
              </div>
            )}

            {/* ================================================================= */}
            {/* THÀNH TỐ 4: NGUYÊN NHÂN (ETIOLOGY) — USER DECISION A4            */}
            {/* ================================================================= */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold">4</span>
                    Nguyên Nhân &amp; Căn Nguyên (Etiology):
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      c4?.confidence === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}
                  >
                    {c4?.confidence === 'confirmed' ? 'Đã rõ căn nguyên' : 'Chưa đủ dữ liệu CLS'}
                  </span>
                </div>

                {/* Nhóm căn nguyên */}
                <span className="text-xs text-slate-500 font-semibold block mb-1">
                  Phân loại căn nguyên: <b className="text-slate-800">{c4?.category}</b>
                </span>

                {/* Box hiển thị căn nguyên hoặc Cảnh báo thiếu CLS theo đúng quyết định A4 */}
                {c4?.specific.includes('Chưa đủ dữ liệu CLS') ? (
                  <div className="p-3 bg-amber-50/90 border border-amber-300 rounded-xl text-xs space-y-2 mb-2">
                    <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{c4.specific}</span>
                    </div>

                    {c4.missingEvidence && c4.missingEvidence.length > 0 && (
                      <div className="text-[11px] text-amber-900 pl-6 space-y-0.5">
                        <span className="font-bold block">Bằng chứng còn thiếu:</span>
                        {c4.missingEvidence.map((me, i) => (
                          <div key={i}>&bull; {me}</div>
                        ))}
                      </div>
                    )}

                    {/* CHECKLIST XÉT NGHIỆM ĐỀ NGHỊ ĐỂ XÁC ĐỊNH / LOẠI TRỪ */}
                    {c4.recommendedWorkup && c4.recommendedWorkup.length > 0 && (
                      <div className="pt-2 border-t border-amber-200/80 space-y-1">
                        <span className="text-[11px] font-extrabold text-amber-950 uppercase tracking-wider block">
                          📋 Xét nghiệm đề xuất cần thực hiện:
                        </span>
                        <div className="space-y-1">
                          {c4.recommendedWorkup.map((rw, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-800 bg-white p-1.5 rounded border border-amber-200">
                              <span className="w-4 h-4 rounded bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="font-medium">{rw}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50/80 border border-emerald-300 rounded-xl text-xs text-emerald-950 space-y-1 mb-2">
                    <span className="font-bold text-[11px] text-emerald-800 uppercase tracking-wider block">
                      Căn nguyên xác định:
                    </span>
                    <p className="font-extrabold text-sm">{c4?.specific}</p>
                    {c4?.supportingEvidence && c4.supportingEvidence.length > 0 && (
                      <div className="pt-1 text-[11px] text-emerald-900 space-y-0.5">
                        {c4.supportingEvidence.map((se, i) => (
                          <div key={i}>&bull; {se}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {onOpenVaultDrawer && (
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer(diagnosis.diseaseName, `căn nguyên ${diagnosis.diseaseName}`, 'TC')}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 self-start pt-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Tra cứu Kho Căn nguyên &amp; Sinh bệnh học (Kho 1.2)</span>
                </button>
              )}
            </div>

            {/* ================================================================= */}
            {/* THÀNH TỐ 5: BIẾN CHỨNG (COMPLICATIONS)                            */}
            {/* ================================================================= */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2.5 flex flex-col justify-between lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">5</span>
                    Biến Chứng Hiện Hữu &amp; Dự Báo Nguy Cơ (Complications):
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    Đánh giá theo mốc thời gian (Acute 24h &bull; Subacute &bull; Chronic)
                  </span>
                </div>

                {c5 && c5.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {c5.map((comp, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border space-y-1.5 ${
                          comp.severity === 'critical'
                            ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                            : comp.severity === 'warning'
                            ? 'bg-amber-50/70 border-amber-300 text-amber-950'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs flex items-center gap-1.5">
                            {comp.severity === 'critical' ? (
                              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : comp.severity === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                            ) : (
                              <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                            <span>{comp.name}</span>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                              comp.status === 'present'
                                ? 'bg-rose-200 text-rose-900'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            {comp.status === 'present' ? 'Hiện có' : 'Nguy cơ'} &bull; {comp.timeframe === 'acute_24h' ? '24h' : comp.timeframe === 'chronic' ? 'Mạn tính' : '7 ngày'}
                          </span>
                        </div>

                        {comp.supportingEvidence && (
                          <p className="text-[11px] text-slate-700 italic">
                            Bằng chứng: {comp.supportingEvidence}
                          </p>
                        )}

                        {comp.preventiveAction && (
                          <div className="pt-1 border-t border-slate-200/60 text-[11px] font-medium text-slate-800">
                            <span className="font-bold text-slate-900">Xử trí phòng ngừa:</span>{' '}
                            <span>{comp.preventiveAction}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-900 font-semibold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Chưa ghi nhận biến chứng suy cơ quan cấp tính tại thời điểm đánh giá.</span>
                  </div>
                )}
              </div>

              {onOpenVaultDrawer && (
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer(diagnosis.diseaseName, `biến chứng ${diagnosis.diseaseName}`, 'BC')}
                  className="text-[11px] font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 self-start pt-1 cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Tra cứu Phác đồ xử trí biến chứng nguy kịch (Kho 2.3)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
