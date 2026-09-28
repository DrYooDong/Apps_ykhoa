import React, { useState } from 'react';
import { ExamModule, BodySystem } from '../types/clinical';
import { EXAMINATION_MODULES } from '../data/examinationData';
import { 
  Stethoscope, 
  Heart, 
  Wind, 
  Activity, 
  Brain, 
  Bone, 
  Eye, 
  Bookmark, 
  FileDown, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ClipboardList,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { pdfExport } from '../utils/pdfExport';
import { storageService } from '../services/storageService';

interface ExaminationViewProps {
  selectedExamId?: string;
  onSelectExamId: (id: string) => void;
  onOpenNotes: (topicId: string, topicTitle: string) => void;
  onToggleBookmark: (id: string, title: string, system: BodySystem) => void;
  isBookmarked: (id: string) => boolean;
}

export const ExaminationView: React.FC<ExaminationViewProps> = ({
  selectedExamId,
  onSelectExamId,
  onOpenNotes,
  onToggleBookmark,
  isBookmarked
}) => {
  const [selectedSystem, setSelectedSystem] = useState<BodySystem | 'all'>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const filteredModules = EXAMINATION_MODULES.filter(m => 
    selectedSystem === 'all' || m.system === selectedSystem
  );

  const currentModule = EXAMINATION_MODULES.find(m => m.id === selectedExamId) || filteredModules[0];

  const handleToggleCheck = (stepId: string) => {
    setChecklist(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const handleExportPDF = () => {
    if (currentModule) {
      const notes = storageService.getNotesByTopic(currentModule.id);
      pdfExport.exportExamModuleToPDF(currentModule, notes);
    }
  };

  const systemIcons: Record<string, React.ReactNode> = {
    general: <Sparkles className="w-4 h-4 text-teal-600" />,
    cardiovascular: <Heart className="w-4 h-4 text-rose-500" />,
    respiratory: <Wind className="w-4 h-4 text-cyan-500" />,
    gastrointestinal: <Activity className="w-4 h-4 text-emerald-500" />,
    neurological: <Brain className="w-4 h-4 text-purple-500" />,
    musculoskeletal: <Bone className="w-4 h-4 text-amber-500" />,
    heent: <Eye className="w-4 h-4 text-indigo-500" />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        <button
          onClick={() => setSelectedSystem('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedSystem === 'all'
              ? 'bg-slate-900 dark:bg-teal-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          Tất cả các hệ ({EXAMINATION_MODULES.length})
        </button>
        {[
          { key: 'general', label: 'Toàn Trạng & Sinh Hiệu' },
          { key: 'cardiovascular', label: 'Tim Mạch' },
          { key: 'respiratory', label: 'Hô Hấp' },
          { key: 'gastrointestinal', label: 'Tiêu Hóa - Bụng' },
          { key: 'neurological', label: 'Thần Kinh' },
          { key: 'musculoskeletal', label: 'Cơ Xương Khớp' },
          { key: 'heent', label: 'Đầu Mặt Cổ & Giáp' }
        ].map(sys => (
          <button
            key={sys.key}
            onClick={() => setSelectedSystem(sys.key as BodySystem)}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSystem === sys.key
                ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {systemIcons[sys.key]}
            <span>{sys.label}</span>
          </button>
        ))}
      </div>

      <div className={`grid grid-cols-1 ${isSidebarCollapsed ? 'lg:grid-cols-12 gap-5' : 'lg:grid-cols-12 gap-8'}`}>
        {/* Left Side: Module Selector Cards / Collapsed Icons */}
        {isSidebarCollapsed ? (
          <div className="lg:col-span-1 flex flex-col items-center space-y-2 py-1">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 transition-all w-full flex items-center justify-center border border-teal-200 dark:border-teal-800 shadow-2xs group"
              title="Mở rộng danh sách bài khám"
            >
              <PanelLeftOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            <div className="w-full space-y-2 pt-1">
              {filteredModules.map((module) => {
                const isSelected = module.id === currentModule?.id;
                const bookmarked = isBookmarked(module.id);
                return (
                  <button
                    key={module.id}
                    onClick={() => onSelectExamId(module.id)}
                    className={`w-full p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all relative group ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800 shadow-2xs'
                    }`}
                    title={`${module.title} - ${module.subtitle}`}
                  >
                    <div className={isSelected ? 'text-white' : ''}>
                      {systemIcons[module.system]}
                    </div>
                    <span className="text-[9px] font-bold mt-1 line-clamp-1 max-w-[50px] text-center leading-tight">
                      {module.system.slice(0, 4).toUpperCase()}
                    </span>
                    {bookmarked && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Quy Trình Khám Lâm Sàng
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  {filteredModules.length} chuyên đề
                </span>
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                title="Thu gọn danh sách thành các biểu tượng để mở rộng nội dung"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thu gọn icon</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredModules.map((module) => {
                const isSelected = module.id === currentModule?.id;
                const bookmarked = isBookmarked(module.id);
                const noteCount = storageService.getNotesByTopic(module.id).length;

                return (
                  <div
                    key={module.id}
                    onClick={() => onSelectExamId(module.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-teal-500 dark:border-teal-500 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                          {systemIcons[module.system]}
                        </div>
                        <div>
                          <h4 className={`font-bold text-sm ${isSelected ? 'text-teal-900 dark:text-teal-300' : 'text-slate-900 dark:text-white'}`}>
                            {module.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">{module.subtitle}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(module.id, module.title, module.system);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          bookmarked ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50' : 'text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={bookmarked ? 'Bỏ đánh dấu ghi nhớ' : 'Đánh dấu mục tiêu quan trọng cần nhớ'}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {module.overview}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{module.steps.length} bước chuẩn hoá</span>
                      {noteCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800">
                          {noteCount} ghi chú
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Right Side: Detailed Examination Protocol */}
        {currentModule && (
          <div className={`${isSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-8'} space-y-6 transition-all duration-200`}>
            {/* Header Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      Bates & Macleod Guidelines
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {currentModule.references}
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {currentModule.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {currentModule.overview}
                  </p>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onOpenNotes(currentModule.id, currentModule.title)}
                    className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 transition-all shadow-2xs"
                    title="Tạo ghi chú cá nhân hóa cho chuyên đề này"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="hidden sm:inline">Ghi chú</span>
                  </button>

                  <button
                    onClick={handleExportPDF}
                    className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 dark:bg-teal-600 text-white hover:bg-slate-800 dark:hover:bg-teal-500 transition-all shadow-xs"
                    title="Xuất quy trình khám sang tài liệu PDF"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Xuất PDF</span>
                  </button>

                  <button
                    onClick={() => onToggleBookmark(currentModule.id, currentModule.title, currentModule.system)}
                    className={`p-2 rounded-xl border transition-all ${
                      isBookmarked(currentModule.id)
                        ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600 dark:text-amber-400'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                    title="Đánh dấu mục tiêu quan trọng cần nhớ"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked(currentModule.id) ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Anatomy & Physiology Key Notes */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                  Nhắc lại Sinh lý & Giải phẫu ứng dụng:
                </span>
                {currentModule.anatomyPhysiologyPoints.map((pt, i) => (
                  <p key={i} className="text-slate-600 dark:text-slate-300 flex items-start space-x-2">
                    <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                    <span>{pt}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* Resident High-Yield Pearls Banner */}
            {currentModule.highYieldPoints.length > 0 && (
              <div className="bg-gradient-to-r from-amber-50 dark:from-amber-950/40 via-orange-50 dark:via-orange-950/30 to-amber-100/60 dark:to-amber-900/30 rounded-2xl p-5 border border-amber-200 dark:border-amber-800/60 shadow-xs">
                <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-300 font-bold text-sm mb-3">
                  <div className="p-1.5 rounded-lg bg-amber-500 text-white">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>MỤC TIÊU CỐT LÕI BÁC SĨ NỘI TRÚ CẦN GHI NHỚ (HIGH-YIELD PEARLS)</span>
                </div>
                <div className="space-y-2">
                  {currentModule.highYieldPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Examination Protocols */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                  <ClipboardList className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Các Bước Thực Hiện Khám Lâm Sàng Chuẩn Hóa</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Nhấp vào từng bước để xem chi tiết
                </span>
              </div>

              {currentModule.steps.map((step, idx) => {
                const stepKey = `${currentModule.id}-step-${idx}`;
                const isChecked = checklist[stepKey] || false;
                const isExpanded = expandedStepIndex === idx || expandedStepIndex === null;

                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-all hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    <div 
                      className="p-4 sm:p-5 flex items-start justify-between cursor-pointer select-none bg-slate-50/50 dark:bg-slate-800/40"
                      onClick={() => setExpandedStepIndex(expandedStepIndex === idx ? null : idx)}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCheck(stepKey);
                          }}
                          className={`mt-0.5 p-1 rounded-md transition-colors ${
                            isChecked ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400 dark:hover:text-slate-500'
                          }`}
                          title="Đánh dấu đã thực hành thuần thục bước này"
                        >
                          <CheckCircle2 className={`w-5 h-5 ${isChecked ? 'fill-teal-600 dark:fill-teal-500 text-white' : ''}`} />
                        </button>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                              {step.phase}
                            </span>
                            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                              {step.technique}
                            </h4>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{step.clinicalSignificance}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-2">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                        {/* Technique details */}
                        <div className="mt-3">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                            Kỹ thuật thao tác cụ thể:
                          </span>
                          <ul className="space-y-1.5">
                            {step.techniqueDetails.map((td, i) => (
                              <li key={i} className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                                <span className="text-teal-500 font-bold shrink-0">•</span>
                                <span className="leading-relaxed">{td}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Normal vs Abnormal Comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
                            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Dấu hiệu Bình thường:</span>
                            </span>
                            <p className="text-xs text-emerald-950 dark:text-emerald-200 font-medium leading-relaxed">
                              {step.normalFindings}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60">
                            <span className="text-xs font-bold text-red-800 dark:text-red-300 uppercase tracking-wider block mb-1 flex items-center space-x-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Dấu hiệu Bệnh lý thường gặp:</span>
                            </span>
                            <ul className="space-y-1 text-xs text-red-950 dark:text-red-200 font-medium">
                              {step.abnormalFindings.map((ab, i) => (
                                <li key={i} className="flex items-start space-x-1">
                                  <span>-</span>
                                  <span>{ab}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Step resident pearls */}
                        {step.residentPearls && step.residentPearls.length > 0 && (
                          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs">
                            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1 flex items-center space-x-1">
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              <span>Kinh nghiệm khám buồng (Resident Tip):</span>
                            </span>
                            {step.residentPearls.map((rp, i) => (
                              <p key={i} className="text-slate-800 dark:text-slate-200 mt-0.5 leading-relaxed">{rp}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Special Eponymous Signs */}
            {currentModule.specialSigns.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                  <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Các Dấu Hiệu Lâm Sàng Đặc Biệt (Eponymous Signs)</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentModule.specialSigns.map((sign, i) => (
                    <div key={i} className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">{sign.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200/80 dark:bg-indigo-900/80 text-indigo-900 dark:text-indigo-200 font-semibold">
                          Kinh điển
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Cách khám:</strong> {sign.description}
                      </p>
                      <p className="text-xs text-teal-800 dark:text-teal-300">
                        <strong className="text-slate-900 dark:text-white">Ý nghĩa:</strong> {sign.indicates}
                      </p>
                      <p className="text-[11px] text-amber-800 dark:text-amber-300 italic pt-1 border-t border-indigo-100 dark:border-indigo-900/50">
                        💡 {sign.clinicalPearl}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
