import React, { useState, useMemo, useEffect } from 'react';
import { DIAGNOSTIC_FLOWCHARTS } from '../data/flowcharts';
import { PATHOGENS } from '../data/pathogens';
import { MAHON_CHAPTERS } from '../data/mahonChapters';
import { CLINICAL_CASES } from '../data/clinicalCases';
import { Language, DiagnosticFlowchart } from '../types';
import { ChevronRight, RotateCcw, ArrowLeft, CheckCircle2, FlaskConical, Stethoscope, Sparkles, GraduationCap, Table, Lightbulb, AlertTriangle, FileDown } from 'lucide-react';
import { MicrobeSvg } from './MicrobeSvg';
import { MahonDifferentialTable } from './MahonDifferentialTable';
import { MahonCaseCard } from './MahonCaseCard';
import { exportFlowchartCasePDF } from '../utils/pdfExport';

interface FlowchartsViewProps {
  language: Language;
  onSelectPathogen: (pathogenId: string) => void;
}

export const FlowchartsView: React.FC<FlowchartsViewProps> = ({ language, onSelectPathogen }) => {
  const [selectedFlowchartId, setSelectedFlowchartId] = useState<string>(DIAGNOSTIC_FLOWCHARTS[0].id);
  const currentFlowchart: DiagnosticFlowchart = DIAGNOSTIC_FLOWCHARTS.find(f => f.id === selectedFlowchartId) || DIAGNOSTIC_FLOWCHARTS[0];

  const [currentStepId, setCurrentStepId] = useState<string>(currentFlowchart.initialStepId);
  const [history, setHistory] = useState<{ stepId: string; chosenLabel: string }[]>([]);
  const [viewMode, setViewMode] = useState<'interactive' | 'overview'>('interactive');

  const flowchartChapterMap: Record<string, number[]> = {
    gpc_flowchart: [14, 15],
    gnb_flowchart: [19, 20, 26],
    gpr_flowchart: [17, 24, 27],
    fastidious_flowchart: [18, 21, 22, 25, 28, 29, 30, 31, 32]
  };

  const relatedChapterNumbers = flowchartChapterMap[selectedFlowchartId] || [14];
  const [activeChapterNum, setActiveChapterNum] = useState<number>(relatedChapterNumbers[0]);
  const [flowchartSectionTab, setFlowchartSectionTab] = useState<'tables' | 'case' | 'pearls'>('tables');

  useEffect(() => {
    const defaultCh = (flowchartChapterMap[selectedFlowchartId] || [14])[0];
    setActiveChapterNum(defaultCh);
  }, [selectedFlowchartId]);

  const activeMahonChapter = useMemo(() => {
    return MAHON_CHAPTERS.find(c => c.chapterNumber === activeChapterNum) || MAHON_CHAPTERS[0];
  }, [activeChapterNum]);

  const activeMahonCase = useMemo(() => {
    return CLINICAL_CASES.find(c => c.chapterNumber === activeChapterNum) || null;
  }, [activeChapterNum]);

  const activeDifferentialTable = activeMahonChapter?.tables?.[0] || null;

  const currentStep = currentFlowchart.steps[currentStepId] || currentFlowchart.steps[currentFlowchart.initialStepId];

  const handleSelectFlowchart = (id: string) => {
    setSelectedFlowchartId(id);
    const target = DIAGNOSTIC_FLOWCHARTS.find(f => f.id === id) || DIAGNOSTIC_FLOWCHARTS[0];
    setCurrentStepId(target.initialStepId);
    setHistory([]);
  };

  const handleChooseOption = (option: any) => {
    setHistory(prev => [...prev, { stepId: currentStepId, chosenLabel: option.label[language] }]);
    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleRestart = () => {
    setCurrentStepId(currentFlowchart.initialStepId);
    setHistory([]);
  };

  const handleStepBack = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const last = newHistory.pop();
    setHistory(newHistory);
    if (last) {
      setCurrentStepId(last.stepId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Flowchart selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
              <FlaskConical className="w-4 h-4" />
              {language === 'vi' ? 'Thuật toán chẩn đoán vi sinh' : 'Diagnostic Microbiology Algorithms'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {currentFlowchart.title[language]}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {currentFlowchart.description[language]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportFlowchartCasePDF(currentFlowchart, activeMahonChapter, activeMahonCase, language)}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs shrink-0 flex items-center justify-center"
              title={language === 'vi' ? 'Xuất quy trình chẩn đoán & ca bệnh ra tệp PDF' : 'Export Flowchart & Case Report to PDF'}
              aria-label={language === 'vi' ? 'Xuất báo cáo PDF' : 'Export Case PDF'}
            >
              <FileDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'interactive' ? 'overview' : 'interactive')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors border border-indigo-200 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {viewMode === 'interactive' 
                ? (language === 'vi' ? 'Xem toàn bộ sơ đồ cây' : 'View Full Decision Tree')
                : (language === 'vi' ? 'Chế độ tương tác từng bước' : 'Step-by-Step Mode')}
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200 shrink-0 flex items-center justify-center"
              title={language === 'vi' ? 'Làm lại từ đầu' : 'Restart flowchart'}
              aria-label={language === 'vi' ? 'Làm lại từ đầu' : 'Restart flowchart'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex overflow-x-auto gap-2 pt-4 scrollbar-none">
          {DIAGNOSTIC_FLOWCHARTS.map(fc => (
            <button
              key={fc.id}
              onClick={() => handleSelectFlowchart(fc.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedFlowchartId === fc.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{fc.category}</span>
              <span className="opacity-80">·</span>
              <span className="truncate max-w-[200px]">{fc.title[language]}</span>
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'interactive' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Decision Pathway Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Breadcrumb Trail */}
            {history.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-500 uppercase tracking-wider">
                  {language === 'vi' ? 'Tiến trình:' : 'Path:'}
                </span>
                {history.map((h, i) => (
                  <React.Fragment key={i}>
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md font-medium text-slate-700 shadow-2xs">
                      {h.chosenLabel}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </React.Fragment>
                ))}
                <span className="font-bold text-indigo-700">
                  {currentStep.title[language]}
                </span>
              </div>
            )}

            {/* Current Step Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
                    <FlaskConical className="w-3.5 h-3.5" />
                    {currentStep.testMethod}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {currentStep.title[language]}
                  </h3>
                </div>

                {history.length > 0 && (
                  <button
                    onClick={handleStepBack}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 border border-slate-200 transition-colors shrink-0 flex items-center justify-center"
                    title={language === 'vi' ? 'Quay lại bước trước' : 'Go back to previous step'}
                    aria-label={language === 'vi' ? 'Quay lại bước trước' : 'Previous step'}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                {currentStep.description[language]}
              </p>

              {/* Options selection */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {language === 'vi' ? 'Chọn kết quả thử nghiệm / quan sát:' : 'Select Observed Laboratory Result:'}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentStep.options.map((opt, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 hover:border-indigo-500 rounded-xl p-4 hover:bg-indigo-50/50 transition-all bg-white"
                    >
                      <button
                        onClick={() => handleChooseOption(opt)}
                        className="w-full text-left flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1.5 flex-1">
                          <div className="font-semibold text-slate-900 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            {opt.label[language]}
                          </div>
                          {opt.conclusion && (
                            <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">{language === 'vi' ? 'Kết luận sơ bộ: ' : 'Presumptive Diagnosis: '}</span>
                                {opt.conclusion[language]}
                              </div>
                            </div>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                      </button>

                      {/* Associated pathogen badges if terminal node */}
                      {opt.resultPathogens && opt.resultPathogens.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-slate-500">
                            {language === 'vi' ? 'Xem hồ sơ vi sinh:' : 'View detailed profile:'}
                          </span>
                          {opt.resultPathogens.map((pid: string) => {
                            const pathData = PATHOGENS.find(p => p.id === pid);
                            if (!pathData) return null;
                            return (
                              <button
                                key={pid}
                                onClick={() => onSelectPathogen(pid)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-2xs"
                              >
                                <i>{pathData.scientificName}</i>
                                <span>({pathData.commonName[language]})</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Preview of Pathogens Related to Current Tree (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 mb-3">
                <Stethoscope className="w-4 h-4 text-indigo-600" />
                {language === 'vi' ? 'Các tác nhân trọng tâm trong lưu đồ' : 'Key Pathogens in Algorithm'}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {language === 'vi' 
                  ? 'Bấm vào từng tác nhân để xem ngay hình ảnh vi thể 2D, đặc điểm khuẩn lạc và kháng sinh đồ gợi ý.'
                  : 'Click any pathogen to inspect its 2D morphotype, colony appearance, and CLSI antibiogram.'}
              </p>

              <div className="space-y-3">
                {PATHOGENS.filter(p => {
                  if (currentFlowchart.id === 'gpc_flowchart') return p.gramReaction === 'gram_positive' && (p.shape === 'cocci' || p.shape === 'diplococci');
                  if (currentFlowchart.id === 'gnb_flowchart') return p.gramReaction === 'gram_negative' && p.shape === 'bacilli';
                  if (currentFlowchart.id === 'gpr_flowchart') return p.gramReaction === 'gram_positive' && p.shape === 'bacilli';
                  return p.shape === 'coccobacilli' || p.shape === 'diplococci' || p.shape === 'yeast';
                }).map(p => (
                  <div
                    key={p.id}
                    onClick={() => onSelectPathogen(p.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 cursor-pointer transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-slate-900 flex items-center justify-center">
                      <MicrobeSvg type={p.svgType} size={48} showLabels={false} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-xs text-slate-900 italic truncate group-hover:text-indigo-600">
                        {p.scientificName}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {p.commonName[language]}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Decision Tree Overview Mode */
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900">
              {language === 'vi' ? 'Tổng quan toàn bộ nhánh quyết định' : 'Complete Decision Tree Blueprint'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'vi' 
                ? 'Sơ đồ cây hệ thống hóa toàn bộ các bước kiểm tra sinh hóa theo tiêu chuẩn Mahon.' 
                : 'Schematic representation of all test nodes according to Mahon diagnostic criteria.'}
            </p>
          </div>

          <div className="space-y-6">
            {Object.values(currentFlowchart.steps).map((step, sIdx) => (
              <div key={step.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
                      {sIdx + 1}
                    </span>
                    {step.title[language]}
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                    {step.testMethod}
                  </span>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  {step.description[language]}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-8">
                  {step.options.map((opt, oIdx) => (
                    <div key={oIdx} className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                      <div className="font-semibold text-slate-900">{opt.label[language]}</div>
                      {opt.conclusion && (
                        <div className="text-emerald-700 font-medium">
                          {opt.conclusion[language]}
                        </div>
                      )}
                      {opt.nextStepId && (
                        <div className="text-indigo-600 font-medium flex items-center gap-1">
                          <span>→ {language === 'vi' ? 'Chuyển tiếp:' : 'Next:'}</span>
                          <span>{currentFlowchart.steps[opt.nextStepId]?.title[language]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrated Mahon Differential Tables, Pearls & Clinical Cases */}
      <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-slate-50 rounded-2xl border border-emerald-200 p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-200/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {language === 'vi' ? 'Học liệu chuẩn hóa Mahon (6th Ed.)' : 'Mahon Textbook Reference (6th Ed.)'}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {language === 'vi' ? `Chương ${activeMahonChapter.chapterNumber}` : `Chapter ${activeMahonChapter.chapterNumber}`}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                {activeMahonChapter.title[language]}
              </h3>
              {activeMahonChapter.authors && (
                <p className="text-xs text-slate-500">
                  {language === 'vi' ? 'Tác giả:' : 'Authors:'} {activeMahonChapter.authors}
                </p>
              )}
            </div>
          </div>

          {/* Chapter Selector if multiple chapters relate to this flowchart */}
          {relatedChapterNumbers.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                {language === 'vi' ? 'Chọn chương đối chiếu:' : 'Select Chapter:'}
              </span>
              <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-emerald-200">
                {relatedChapterNumbers.map(chNum => {
                  const ch = MAHON_CHAPTERS.find(c => c.chapterNumber === chNum);
                  if (!ch) return null;
                  return (
                    <button
                      key={chNum}
                      onClick={() => setActiveChapterNum(chNum)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeChapterNum === chNum
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {language === 'vi' ? `Chương ${chNum}` : `Ch. ${chNum}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Subtabs */}
        <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-3">
          {activeDifferentialTable && (
            <button
              onClick={() => setFlowchartSectionTab('tables')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                flowchartSectionTab === 'tables'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Bảng sinh hóa phân biệt' : 'Differential Biochemical Table'}</span>
            </button>
          )}

          {activeMahonCase && (
            <button
              onClick={() => setFlowchartSectionTab('case')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                flowchartSectionTab === 'case'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Ca bệnh lâm sàng tương tác' : 'Interactive Case in Point'}</span>
            </button>
          )}

          <button
            onClick={() => setFlowchartSectionTab('pearls')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              flowchartSectionTab === 'pearls'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Hạt ngọc lâm sàng & Điểm cốt lõi' : 'Pearls & Points to Remember'}</span>
          </button>
        </div>

        {/* Tab 1: Differential Table */}
        {flowchartSectionTab === 'tables' && activeDifferentialTable && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              {language === 'vi'
                ? 'Đối chiếu các phản ứng sinh hóa đặc trưng giữa các tác nhân trong cùng nhánh chẩn đoán theo giáo trình Mahon:'
                : 'Compare key differential biochemical reactions among organisms within this diagnostic branch according to Mahon Textbook:'}
            </p>
            <MahonDifferentialTable
              table={activeDifferentialTable}
              language={language}
            />
          </div>
        )}

        {/* Tab 2: Interactive Case in Point */}
        {flowchartSectionTab === 'case' && activeMahonCase && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              {language === 'vi'
                ? 'Vận dụng lưu đồ chẩn đoán để giải quyết tình huống bệnh nhân thực tế từ giáo trình Mahon:'
                : 'Apply this diagnostic algorithm to solve an authentic clinical patient vignette from Mahon Textbook:'}
            </p>
            <MahonCaseCard
              caseData={activeMahonCase}
              language={language}
              chapterNumber={activeMahonChapter.chapterNumber}
            />
          </div>
        )}

        {/* Tab 3: Clinical Pearls & Pitfalls */}
        {flowchartSectionTab === 'pearls' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>{language === 'vi' ? 'Hạt ngọc lâm sàng (Clinical Pearls):' : 'Mahon Clinical Pearls:'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeMahonChapter.clinicalPearls[language]?.map((pearl, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5 shadow-2xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {pIdx + 1}
                    </span>
                    <span>{pearl}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeMahonChapter.pointsToRemember && activeMahonChapter.pointsToRemember[language]?.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-emerald-200/70">
                <div className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-indigo-600" />
                  <span>{language === 'vi' ? 'Điểm cốt lõi & Cảnh báo chẩn đoán (Points to Remember):' : 'Key Points to Remember & Alerts:'}</span>
                </div>
                <div className="space-y-2">
                  {activeMahonChapter.pointsToRemember[language].map((point, wIdx) => (
                    <div
                      key={wIdx}
                      className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200 text-xs text-indigo-950 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {wIdx + 1}
                      </span>
                      <span>{point}</span>
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
