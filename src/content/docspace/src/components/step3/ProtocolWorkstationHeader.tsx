import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Copy,
  Droplets,
  Edit3,
  Filter,
  FlaskConical,
  HeartPulse,
  LayoutGrid,
  Layers,
  Pill,
  Printer,
  Scale,
  ScrollText,
  Search,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { GROUP_COLORS, GROUP_NAMES } from '../../data/seedData.ts';
import { CdssToolSlug } from '../../lib/vaultBridge.ts';

interface ProtocolWorkstationHeaderProps {
  diseaseName: string;
  diseaseIcd: string;
  specialtyGroup: string;
  sources: string[];
  activeSeverityGradeName?: string;
  patientEgfr?: number | null;
  patientCkdStage?: string;
  patientAnthro?: {
    weightKg: number;
    heightCm: number;
    bmi: number;
    ibw: number;
    adjBw: number;
    prescribedWeight: number;
    diseaseDay: number | null;
    isObese: boolean;
    isOverweight: boolean;
    rates: {
      step6: { ml: number; drops: number };
      step5: { ml: number; drops: number };
      step3: { ml: number; drops: number };
      step15: { ml: number; drops: number };
    };
  } | null;
  onOpenCdssModal?: (tool: CdssToolSlug) => void;
  onBackToAnalysis: () => void;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  specialties: string[];
  selectedDiseaseId: string;
  onSelectDisease: (diseaseId: string) => void;
  filteredDiseases: Array<{
    id: string;
    ten: string;
    icd: string;
    baoDong?: boolean;
    nhom?: string;
  }>;
  onOpenEditorModal?: () => void;
  onPrintReport?: () => void;
  workspaceMode: 'protocol' | 'classification' | 'cautions' | 'manager' | 'all';
  onSelectWorkspaceMode: (mode: 'protocol' | 'classification' | 'cautions' | 'manager' | 'all') => void;
  currentCheckedCount: number;
  totalAllOrders: number;
  severityGradesCount: number;
  cautionsCount: number;
  availableDiseasesCount: number;
  viewMode: 'tabbed' | 'continuous';
  onToggleViewMode: (mode: 'tabbed' | 'continuous') => void;
}

export const ProtocolWorkstationHeader: React.FC<ProtocolWorkstationHeaderProps> = ({
  diseaseName,
  diseaseIcd,
  specialtyGroup,
  sources,
  activeSeverityGradeName,
  patientEgfr,
  patientCkdStage,
  patientAnthro,
  onOpenCdssModal,
  onBackToAnalysis,
  selectedSpecialty,
  onSelectSpecialty,
  specialties,
  selectedDiseaseId,
  onSelectDisease,
  filteredDiseases,
  onOpenEditorModal,
  onPrintReport,
  workspaceMode,
  onSelectWorkspaceMode,
  currentCheckedCount,
  totalAllOrders,
  severityGradesCount,
  cautionsCount,
  availableDiseasesCount,
  viewMode,
  onToggleViewMode,
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [showFluidTitration, setShowFluidTitration] = useState(false);
  const [copiedFluidOrders, setCopiedFluidOrders] = useState(false);

  const specialtyColor = GROUP_COLORS[specialtyGroup] || '#1e40af';
  const specialtyLabel = GROUP_NAMES[specialtyGroup] || specialtyGroup;

  const displayedDiseases = filteredDiseases.filter((b) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase().trim();
    return b.ten.toLowerCase().includes(q) || b.icd.toLowerCase().includes(q);
  });

  const nameLower = diseaseName.toLowerCase();
  const icdLower = diseaseIcd.toLowerCase();
  const isDengueOrShock =
    nameLower.includes('dengue') ||
    nameLower.includes('sốt xuất huyết') ||
    icdLower.includes('a97') ||
    nameLower.includes('sốc') ||
    nameLower.includes('sepsis');

  // Detect relevant CDSS tool
  const cdssTool: { slug: CdssToolSlug; title: string; icon: React.ReactNode } | null = (() => {
    if (nameLower.includes('dengue') || nameLower.includes('sốt xuất huyết') || icdLower.includes('a97')) {
      return {
        slug: 'dengue',
        title: 'CDSS Bù Dịch SXHD',
        icon: <Droplets className="w-3.5 h-3.5" />,
      };
    }
    if (nameLower.includes('nhiễm khuẩn') || nameLower.includes('sepsis') || icdLower.includes('a41')) {
      return {
        slug: 'sepsis',
        title: 'CDSS Sepsis-3',
        icon: <Activity className="w-3.5 h-3.5" />,
      };
    }
    if (nameLower.includes('xơ gan') || nameLower.includes('viêm gan') || icdLower.includes('k74')) {
      return {
        slug: 'hepa',
        title: 'CDSS MELD / Child-Pugh',
        icon: <FlaskConical className="w-3.5 h-3.5" />,
      };
    }
    if (nameLower.includes('tim') || icdLower.includes('i50')) {
      return {
        slug: 'ecg',
        title: 'CDSS ECG & Tim mạch',
        icon: <HeartPulse className="w-3.5 h-3.5" />,
      };
    }
    return null;
  })();

  const handleCopyFluidOrder = () => {
    if (!patientAnthro) return;
    const orderStr = `Y LỆNH BÙ DỊCH CÁ THỂ HÓA (Cân nặng tính dịch: ${patientAnthro.prescribedWeight} kg):\n` +
      `- Bậc 1 (6 ml/kg/h) = ${patientAnthro.rates.step6.ml} ml/h (${patientAnthro.rates.step6.drops} giọt/phút) trong 1-2h đầu\n` +
      `- Bậc 2 (5 ml/kg/h) = ${patientAnthro.rates.step5.ml} ml/h (${patientAnthro.rates.step5.drops} giọt/phút) trong 2-4h tiếp theo\n` +
      `- Bậc 3 (3 ml/kg/h) = ${patientAnthro.rates.step3.ml} ml/h (${patientAnthro.rates.step3.drops} giọt/phút) trong 2-4h tiếp theo\n` +
      `- Bậc 4 (1.5 ml/kg/h) = ${patientAnthro.rates.step15.ml} ml/h (${patientAnthro.rates.step15.drops} giọt/phút) duy trì giảm dần.`;
    navigator.clipboard.writeText(orderStr);
    setCopiedFluidOrders(true);
    setTimeout(() => setCopiedFluidOrders(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
      {/* 1. THANH ĐIỀU HÀNH LÂM SÀNG TRÊN CÙNG (PRIMARY MASTHEAD) */}
      <div className="px-4 py-3 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Nút quay lại & Breadcrumbs */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={onBackToAnalysis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            title="Quay lại phân tích chẩn đoán (Bước 3)"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-300" />
            <span>CDSS (Bước 3)</span>
          </button>

          <span className="text-slate-600">/</span>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-200">04. Phác Đồ Điều Trị</span>
            <span className="text-slate-400 font-mono text-[11px]">· {availableDiseasesCount} phác đồ</span>
          </div>
        </div>

        {/* Bộ chọn bệnh lý nhanh & Công cụ thao tác */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Lọc chuyên khoa */}
          <select
            value={selectedSpecialty}
            onChange={(e) => onSelectSpecialty(e.target.value)}
            className="border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs bg-slate-800 text-slate-200 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            title="Lọc chuyên khoa"
          >
            <option value="all">Tất cả chuyên khoa</option>
            {specialties.map((s) => (
              <option key={s} value={s}>
                {GROUP_NAMES[s] || s}
              </option>
            ))}
          </select>

          {/* Ô tìm kiếm nhanh */}
          <div className="relative min-w-[140px] max-w-[200px]">
            <Search className="w-3 h-3 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Tìm bệnh / ICD..."
              className="w-full pl-7 pr-6 py-1.5 text-xs border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
            {searchFilter && (
              <button
                type="button"
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Dropdown danh sách bệnh */}
          <select
            value={selectedDiseaseId}
            onChange={(e) => onSelectDisease(e.target.value)}
            className="border border-blue-500/50 rounded-lg px-3 py-1.5 text-xs font-bold bg-blue-950/80 text-blue-100 max-w-[260px] truncate focus:outline-none focus:border-blue-400 cursor-pointer"
            title="Chọn phác đồ bệnh lý"
          >
            {displayedDiseases.map((b) => (
              <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                {b.baoDong ? '⚑ ' : ''}{b.ten} ({b.icd})
              </option>
            ))}
          </select>

          {/* Phím chức năng: In PDF & Quản lý */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-700">
            {onOpenEditorModal && (
              <button
                type="button"
                onClick={onOpenEditorModal}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="Biên tập hoặc thêm phác đồ mới"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden lg:inline">Biên tập</span>
              </button>
            )}

            {onPrintReport && (
              <button
                type="button"
                onClick={onPrintReport}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="In phiếu y lệnh EMR"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden lg:inline">In PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. DẢI TIÊU ĐỀ BỆNH & NGỮ CẢNH BỆNH NHÂN (CLINICAL CONTEXT RIBBON) */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 space-y-2.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Tiêu đề bệnh & ICD */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {diseaseName}
            </h2>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-slate-900 text-white rounded">
              {diseaseIcd}
            </span>
            <span
              className="px-2 py-0.5 text-xs font-semibold text-white rounded"
              style={{ backgroundColor: specialtyColor }}
            >
              {specialtyLabel}
            </span>
            {activeSeverityGradeName && (
              <span className="px-2 py-0.5 text-xs font-semibold text-blue-900 bg-blue-100/80 border border-blue-200 rounded">
                {activeSeverityGradeName}
              </span>
            )}
          </div>

          {/* CDSS Tool & Nút bù dịch nhanh */}
          <div className="flex items-center gap-2 flex-wrap">
            {isDengueOrShock && patientAnthro && (
              <button
                type="button"
                onClick={() => setShowFluidTitration((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  showFluidTitration
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-blue-800 border border-blue-200 hover:bg-blue-50'
                }`}
                title="Bật/tắt dải nấc thang bù dịch cá thể hóa"
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Máy tính Bù Dịch (Nấc thang)</span>
                {showFluidTitration ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}

            {cdssTool && onOpenCdssModal && (
              <button
                type="button"
                onClick={() => onOpenCdssModal(cdssTool.slug)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
              >
                {cdssTool.icon}
                <span>{cdssTool.title}</span>
              </button>
            )}

            {/* Toggle Chế độ xem: Tabbed vs Continuous */}
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => onToggleViewMode('tabbed')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'tabbed' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Theo Tab</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleViewMode('continuous')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  viewMode === 'continuous' ? 'bg-slate-900 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ScrollText className="w-3 h-3" />
                <span>Cuộn Toàn Bộ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dòng thông số bệnh nhân (Metadata Bar - Clean & Zero-Pill) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-1 border-t border-slate-200/60">
          <div className="flex items-center gap-1.5 text-slate-500">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">{sources[0] || 'Hướng dẫn chẩn đoán và điều trị Bộ Y Tế'}</span>
          </div>

          {patientAnthro && (
            <>
              <span className="text-slate-300">·</span>
              {patientAnthro.diseaseDay && (
                <span>
                  Ngày bệnh: <strong className="text-slate-900">N{patientAnthro.diseaseDay}</strong>
                </span>
              )}
              <span className="text-slate-300">·</span>
              <span>
                Cân nặng: <strong className="text-slate-900">{patientAnthro.weightKg} kg</strong> (BMI {patientAnthro.bmi})
              </span>
              {patientAnthro.isObese && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-amber-800 font-semibold flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-600" />
                    AdjBW (tính dịch): <strong>{patientAnthro.prescribedWeight} kg</strong>
                  </span>
                </>
              )}
            </>
          )}

          {patientEgfr && (
            <>
              <span className="text-slate-300">·</span>
              <span>
                eGFR: <strong className="text-slate-900">{patientEgfr}</strong> mL/phút {patientCkdStage ? `(${patientCkdStage})` : ''}
              </span>
            </>
          )}
        </div>

        {/* 3. DẢI BÙ DỊCH THÔNG MINH MỞ RỘNG (SMART TITRATION STRIP) */}
        {showFluidTitration && patientAnthro && (
          <div className="p-3 bg-white border border-blue-200 rounded-xl space-y-2 animate-in fade-in duration-150">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-blue-600" />
                <span>Nấc thang bù dịch chuẩn QĐ 2760/QĐ-BYT (Tính theo {patientAnthro.prescribedWeight} kg):</span>
              </span>
              <button
                type="button"
                onClick={handleCopyFluidOrder}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                {copiedFluidOrders ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFluidOrders ? 'Đã sao chép' : 'Sao chép Y lệnh Bù dịch'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bậc 1 (6 ml/kg/h)</span>
                <span className="font-extrabold text-blue-950 text-sm font-mono">{patientAnthro.rates.step6.ml} ml/h</span>
                <span className="text-[11px] text-blue-700 block font-semibold">({patientAnthro.rates.step6.drops} giọt/phút)</span>
              </div>

              <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bậc 2 (5 ml/kg/h)</span>
                <span className="font-extrabold text-blue-950 text-sm font-mono">{patientAnthro.rates.step5.ml} ml/h</span>
                <span className="text-[11px] text-blue-700 block font-semibold">({patientAnthro.rates.step5.drops} giọt/phút)</span>
              </div>

              <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bậc 3 (3 ml/kg/h)</span>
                <span className="font-extrabold text-blue-950 text-sm font-mono">{patientAnthro.rates.step3.ml} ml/h</span>
                <span className="text-[11px] text-blue-700 block font-semibold">({patientAnthro.rates.step3.drops} giọt/phút)</span>
              </div>

              <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-200 text-center">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Bậc 4 (1.5 ml/kg/h)</span>
                <span className="font-extrabold text-blue-950 text-sm font-mono">{patientAnthro.rates.step15.ml} ml/h</span>
                <span className="text-[11px] text-blue-700 block font-semibold">({patientAnthro.rates.step15.drops} giọt/phút)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. THANH ĐIỀU HƯỚNG 4 TAB CHUYÊN NGHIỆP (SEGMENTED WORKSTATION TABS) */}
      <div className="px-4 py-2 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {/* Tab 1: Y lệnh & Lộ trình */}
          <button
            type="button"
            onClick={() => onSelectWorkspaceMode('protocol')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              workspaceMode === 'protocol'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>1. Y Lệnh &amp; Lộ Trình Điều Trị</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                workspaceMode === 'protocol' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {currentCheckedCount}/{totalAllOrders}
            </span>
          </button>

          {/* Tab 2: Phân tầng & Phân độ */}
          <button
            type="button"
            onClick={() => onSelectWorkspaceMode('classification')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              workspaceMode === 'classification'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Phân Tầng &amp; Phân Độ</span>
            {severityGradesCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  workspaceMode === 'classification' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {severityGradesCount} độ
              </span>
            )}
          </button>

          {/* Tab 3: Cảnh báo & Dược an toàn */}
          <button
            type="button"
            onClick={() => onSelectWorkspaceMode('cautions')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              workspaceMode === 'cautions'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>3. Lưu Ý &amp; Dược An Toàn</span>
            {cautionsCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  workspaceMode === 'cautions' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {cautionsCount}
              </span>
            )}
          </button>

          {/* Tab 4: Kho phác đồ & Biên tập */}
          <button
            type="button"
            onClick={() => onSelectWorkspaceMode('manager')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              workspaceMode === 'manager'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>4. Kho Phác Đồ &amp; Biên Tập</span>
          </button>
        </div>

        {/* Trạng thái chế độ xem */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium shrink-0 self-end sm:self-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Phác đồ đã đồng bộ</span>
        </div>
      </div>
    </div>
  );
};
