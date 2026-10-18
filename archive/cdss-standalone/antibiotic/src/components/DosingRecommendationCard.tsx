import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  Copy, 
  Check, 
  Info, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  Layers,
  ArrowRight,
  FileText,
  FileDown,
  Gauge,
  Droplets
} from 'lucide-react';
import { CalculatedRenalMetrics, Language } from '../types';
import { DoseResult, ExtractedDrugData } from '../utils/drugDataExtractor';

interface DosingRecommendationCardProps {
  drugDetails: ExtractedDrugData;
  doseResult: DoseResult;
  renal: CalculatedRenalMetrics;
  selectedScenario: string;
  onScenarioChange: (scnKey: string) => void;
  language: Language;
  onExportPdf?: () => void;
}

export const DosingRecommendationCard: React.FC<DosingRecommendationCardProps> = ({
  drugDetails,
  doseResult,
  renal,
  selectedScenario,
  onScenarioChange,
  language,
  onExportPdf
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [dilutionVolume, setDilutionVolume] = useState<number>(100); // 100 mL default
  const [infusionHours, setInfusionHours] = useState<number>(3); // 3 hours extended default
  const [showInfusionCalc, setShowInfusionCalc] = useState<boolean>(false);

  const isEn = language === 'en';

  const handleCopy = () => {
    const textToCopy = isEn ? doseResult.orderTextEn : doseResult.orderTextVi;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate a formatted HIS / EMR clinical order string
  const hisPrescriptionText = `${drugDetails.name} ${doseResult.maintenanceDoseTextVi} | Đường: ${drugDetails.route}. ${doseResult.infusionInstructionsVi}. | Lưu ý: Đã hiệu chỉnh theo CrCl ${renal.crcl} mL/phút (${renal.categoryLabelVi}).`;

  const handleCopyHis = () => {
    navigator.clipboard.writeText(hisPrescriptionText);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  // Calculate infusion pump rate (mL/h) and gravity drops/min (using standard 20 drops/mL tubing)
  const pumpRateMlh = infusionHours > 0 ? (dilutionVolume / infusionHours).toFixed(1) : '0';
  const dropsPerMin = infusionHours > 0 ? Math.round((dilutionVolume * 20) / (infusionHours * 60)) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-6">
      
      {/* Top Bar with Scenarios and Quick Actions */}
      <div className="bg-slate-50/80 p-4 border-b border-slate-200/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              {isEn ? 'Clinical Protocol / Scenario' : 'Kịch bản Lâm sàng / Phác đồ'}
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-lg font-black text-slate-900">{drugDetails.name}</span>
              {drugDetails.forms && (
                <span className="text-xs text-slate-500 font-medium">({drugDetails.forms})</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            {/* Scenario Buttons */}
            {drugDetails.scenarios.length > 1 && (
              <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                {drugDetails.scenarios.map((scn) => (
                  <button
                    key={scn.key}
                    onClick={() => onScenarioChange(scn.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedScenario === scn.key
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {isEn ? (scn.labelEn || scn.label) : scn.label}
                  </button>
                ))}
              </div>
            )}

            {/* Export PDF Button Relocated into Results Board */}
            {onExportPdf && (
              <button
                type="button"
                onClick={onExportPdf}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-2xs transition-colors shrink-0"
                title={isEn ? 'Export PDF Consultation Report' : 'Xuất phiếu hội chẩn PDF'}
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{isEn ? 'PDF Report' : 'Xuất PDF Hội Chẩn'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Dosing Hero Card */}
      <div className="p-4 sm:p-6">
        
        {/* Loading Dose Banner if present */}
        {doseResult.loadingDoseTextVi && (
          <div className="mb-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-start space-x-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-black text-xs">
              LD
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                {isEn ? 'Initial Loading Dose (Dose Nạp ban đầu)' : 'Liều nạp ban đầu (Loading Dose)'}
              </span>
              <p className="text-sm font-extrabold text-amber-950 mt-0.5">
                {isEn ? doseResult.loadingDoseTextEn : doseResult.loadingDoseTextVi}
              </p>
            </div>
          </div>
        )}

        {/* Maintenance Dose Clinical Prescription Display */}
        <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200/80">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isEn ? 'Recommended Maintenance Dose' : 'Liều Duy Trì Khuyến Cáo'}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-blue-100 text-blue-800 border border-blue-200/60">
                CrCl {doseResult.selectedRowLabel} mL/phút
              </span>
              {drugDetails.route && (
                <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-200/80 text-slate-800">
                  Đường {drugDetails.route}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {/* Quick Copy Prescription Order Button */}
              <button
                onClick={handleCopy}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs'
                }`}
                title={isEn ? 'Copy simple prescription text' : 'Sao chép tóm tắt y lệnh'}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isEn ? 'Copied!' : 'Đã sao chép!') : (isEn ? 'Copy Order' : 'Sao chép y lệnh')}</span>
              </button>
            </div>
          </div>

          {/* Core Dose Content */}
          <div className="py-3">
            <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {isEn ? doseResult.maintenanceDoseTextEn : doseResult.maintenanceDoseTextVi}
            </div>
          </div>

          {/* Infusion / Administration Specs */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-medium text-slate-700">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong className="text-slate-900">{isEn ? 'Administration: ' : 'Cách dùng & Tốc độ: '}</strong>
                {isEn ? doseResult.infusionInstructionsEn : doseResult.infusionInstructionsVi}
              </span>
            </div>

            {/* Button to toggle Infusion Pump Calculator */}
            {drugDetails.route.includes('IV') && (
              <button
                onClick={() => setShowInfusionCalc(!showInfusionCalc)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center space-x-1 shrink-0 self-start sm:self-auto"
              >
                <Gauge className="w-3.5 h-3.5 text-blue-600" />
                <span>{showInfusionCalc ? (isEn ? 'Hide pump calc' : 'Ẩn tính máy tiêm điện') : (isEn ? 'Calc pump rate' : 'Tính tốc độ máy tiêm điện')}</span>
              </button>
            )}
          </div>

          {/* Infusion Pump Calculator Sub-panel */}
          {showInfusionCalc && (
            <div className="mt-3 p-3.5 bg-white/90 rounded-xl border border-blue-200 text-xs animate-in fade-in duration-150">
              <div className="flex items-center space-x-2 text-blue-900 font-bold mb-2">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span>{isEn ? 'Infusion Pump & Drip Rate Calculator:' : 'Máy Tiêm Điện & Tốc Độ Truyền Dịch (Infusion Calculator):'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {isEn ? 'Dilution Volume (Dung môi NaCl / G5%):' : 'Thể tích pha (NaCl 0.9% hoặc G5%):'}
                  </label>
                  <div className="flex gap-1.5">
                    {[50, 100, 250, 500].map(v => (
                      <button
                        key={v}
                        onClick={() => setDilutionVolume(v)}
                        className={`px-2.5 py-1 rounded-lg font-bold ${dilutionVolume === v ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {v} mL
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 font-semibold block mb-1">
                    {isEn ? 'Infusion Duration:' : 'Thời gian truyền:'}
                  </label>
                  <div className="flex gap-1.5">
                    {[0.5, 1, 2, 3, 4].map(h => (
                      <button
                        key={h}
                        onClick={() => setInfusionHours(h)}
                        className={`px-2.5 py-1 rounded-lg font-bold ${infusionHours === h ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                      >
                        {h === 0.5 ? '30p' : `${h}h`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Result display */}
              <div className="p-2.5 bg-blue-50/80 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-600 font-medium">Tốc độ máy tiêm điện:</span>
                  <span className="text-base font-black text-blue-900 font-mono">{pumpRateMlh} mL/giờ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-600 font-medium">Tốc độ giọt (dây 20gtt/mL):</span>
                  <span className="text-base font-black text-indigo-900 font-mono">~{dropsPerMin} giọt/phút</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Formatted Prescription Order for HIS / EMR (Hospital Information System) */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1 text-slate-500" />
              {isEn ? 'Clinical EMR / HIS Prescription Format:' : 'Mẫu Y Lệnh Bệnh Án / Phần Mềm Bệnh Viện (HIS/EMR):'}
            </span>
            <button
              onClick={handleCopyHis}
              className={`text-xs font-bold px-2 py-0.5 rounded transition-all flex items-center space-x-1 ${
                copiedOrder
                  ? 'bg-emerald-600 text-white'
                  : 'text-blue-700 hover:text-blue-900 hover:bg-blue-50'
              }`}
            >
              {copiedOrder ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedOrder ? (isEn ? 'Copied' : 'Đã sao chép') : (isEn ? 'Copy HIS text' : 'Sao chép y lệnh')}</span>
            </button>
          </div>
          <div className="p-2 bg-white rounded-lg border border-slate-200/80 font-mono text-xs text-slate-800 select-all leading-relaxed">
            {hisPrescriptionText}
          </div>
        </div>

        {/* Row Specific Note / High MIC comment */}
        {doseResult.selectedRowNoteVi && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start space-x-2 mb-4">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900">
                {isEn ? 'Clinical Protocol Note: ' : 'Ghi chú phác đồ: '}
              </span>
              <span>{isEn ? doseResult.selectedRowNoteEn : doseResult.selectedRowNoteVi}</span>
            </div>
          </div>
        )}

        {/* Renal Adjustment Clinical Rationale */}
        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-emerald-950">
              {isEn ? 'Renal Adjustment Rationale:' : 'Cơ sở hiệu chỉnh liều theo chức năng thận:'}
            </span>
            <p className="text-emerald-900 mt-0.5 leading-relaxed">
              {isEn ? doseResult.renalAdjustmentAdviceEn : doseResult.renalAdjustmentAdviceVi}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

