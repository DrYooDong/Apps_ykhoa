import React from 'react';
import { 
  Activity, 
  Pill, 
  FileDown, 
  Copy, 
  Check, 
  AlertTriangle, 
  ArrowUp,
  User
} from 'lucide-react';
import { CalculatedRenalMetrics, DialysisMode, Language, PatientState } from '../types';
import { DoseResult, ExtractedDrugData } from '../utils/drugDataExtractor';

interface StickyPatientBarProps {
  patient: PatientState;
  renal: CalculatedRenalMetrics;
  dialysis: DialysisMode;
  drug: ExtractedDrugData;
  doseResult: DoseResult;
  interactionCount: number;
  language: Language;
  onExportPdf: () => void;
  onScrollToTop: () => void;
  onScrollToSection: (sectionId: string) => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const StickyPatientBar: React.FC<StickyPatientBarProps> = ({
  patient,
  renal,
  dialysis,
  drug,
  doseResult,
  interactionCount,
  language,
  onExportPdf,
  onScrollToTop,
  onScrollToSection,
  isSidebarCollapsed,
  onToggleSidebar
}) => {
  const [copied, setCopied] = React.useState(false);
  const isEn = language === 'en';

  const handleCopy = () => {
    const textToCopy = `${drug.name} ${doseResult.maintenanceDoseTextVi} (CrCl ${renal.crcl} mL/min)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCrclColor = () => {
    if (dialysis !== 'none') return 'bg-purple-100 text-purple-900 border-purple-300';
    if (renal.isArc) return 'bg-teal-100 text-teal-900 border-teal-300';
    if (renal.crcl >= 90) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (renal.crcl >= 60) return 'bg-blue-100 text-blue-900 border-blue-300';
    if (renal.crcl >= 30) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (renal.crcl >= 15) return 'bg-orange-100 text-orange-900 border-orange-300';
    return 'bg-rose-100 text-rose-900 border-rose-300';
  };

  const genderText = patient.gender === 'm' ? (isEn ? 'Male' : 'Nam') : (isEn ? 'Female' : 'Nữ');

  return (
    <aside aria-label="Clinical quick actions" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          
          {/* Left: Patient summary & CrCl status */}
          <div className="flex items-center space-x-2 text-xs">
            {/* Toggle Patient Sidebar Button */}
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors border border-slate-300"
                title={isSidebarCollapsed ? (isEn ? 'Expand patient parameters' : 'Mở rộng bảng thông tin bệnh nhân') : (isEn ? 'Collapse patient parameters' : 'Thu gọn bảng thông tin bệnh nhân')}
              >
                <span>{isSidebarCollapsed ? (isEn ? '📝 Input' : '📝 Nhập BN') : (isEn ? '◀ Collapse' : '◀ Thu gọn')}</span>
              </button>
            )}

            {/* Patient quick info */}
            <div className="hidden sm:flex items-center space-x-1.5 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{patient.age}t, {genderText}, {patient.weight}kg</span>
            </div>

            {/* CrCl Badge */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border font-bold ${getCrclColor()}`}>
              <Activity className="w-3.5 h-3.5" />
              <span>CrCl: {renal.crcl} mL/phút</span>
              {dialysis !== 'none' && (
                <span className="ml-1 uppercase text-[10px] bg-purple-200 text-purple-900 px-1 rounded">
                  {dialysis}
                </span>
              )}
            </div>

            {/* Selected Drug & Dose */}
            <div className="flex items-center space-x-1.5 bg-blue-50 border border-blue-200 text-blue-950 font-bold px-2.5 py-1 rounded-lg">
              <Pill className="w-3.5 h-3.5 text-blue-600" />
              <span className="truncate max-w-[130px] sm:max-w-[200px]">{drug.name}:</span>
              <span className="text-blue-700 truncate max-w-[120px] sm:max-w-[180px]">
                {doseResult.maintenanceDoseTextVi}
              </span>
            </div>
          </div>

          {/* Right: Quick action buttons */}
          <div className="flex items-center space-x-1.5">
            {/* DDI Alert badge button */}
            {interactionCount > 0 && (
              <button
                onClick={() => onScrollToSection('ddi-section')}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors"
                title={isEn ? 'View Drug Interactions' : 'Xem tương tác thuốc'}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span>{interactionCount} DDI</span>
              </button>
            )}

            {/* Quick Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              title={isEn ? 'Copy Dosing' : 'Sao chép liều'}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? (isEn ? 'Copied' : 'Đã chép') : (isEn ? 'Copy' : 'Chép')}</span>
            </button>

            {/* PDF Export button */}
            <button
              onClick={onExportPdf}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              title={isEn ? 'Export PDF' : 'Xuất PDF'}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>

            {/* Scroll to top button */}
            <button
              onClick={onScrollToTop}
              className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title={isEn ? 'Scroll to top' : 'Lên đầu trang'}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
