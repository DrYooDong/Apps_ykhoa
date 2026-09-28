import React, { useState } from 'react';
import { 
  HISTORY_STEPS, 
  AMBIGUOUS_TERMS, 
  SYSTEMATIC_ENQUIRY_DATA, 
  CHALLENGING_SCENARIOS,
  SBAR_GUIDELINE,
  SPIKES_PROTOCOL,
  SPOT_DIAGNOSES
} from '../data/historyTakingData';
import { 
  MessageSquare, 
  HelpCircle, 
  Calculator, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  FileDown, 
  ChevronRight, 
  ChevronDown,
  Cigarette,
  Wine,
  Activity,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  PhoneCall,
  HeartHandshake,
  Eye
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const HistoryTakingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'steps' | 'terms' | 'systematic' | 'sbar' | 'spikes' | 'spot' | 'calculators' | 'scenarios'>('steps');
  const [selectedStepId, setSelectedStepId] = useState<string>(HISTORY_STEPS[0].id);
  const [isStepsSidebarCollapsed, setIsStepsSidebarCollapsed] = useState<boolean>(false);
  
  // Interactive Pack-Years Calculator state
  const [cigsPerDay, setCigsPerDay] = useState<number>(15);
  const [yearsSmoking, setYearsSmoking] = useState<number>(20);
  
  // Interactive Alcohol Unit Calculator state
  const [beerPints, setBeerPints] = useState<number>(4);
  const [wineGlasses, setWineGlasses] = useState<number>(3);
  const [spiritsShots, setSpiritsShots] = useState<number>(2);

  // CAGE Questionnaire state
  const [cageAnswers, setCageAnswers] = useState<Record<string, boolean>>({
    cut: false,
    annoyed: false,
    guilty: false,
    eye: false
  });

  const packYears = Math.round(((cigsPerDay / 20) * yearsSmoking) * 10) / 10;
  
  // Alcohol Units: 1 pint beer ~ 2-2.5 units, 1 glass wine ~ 2 units, 1 single spirit ~ 1 unit
  const totalAlcoholUnits = Math.round((beerPints * 2.3 + wineGlasses * 2.1 + spiritsShots * 1.0) * 10) / 10;
  
  const cageScore = Object.values(cageAnswers).filter(Boolean).length;

  const currentStep = HISTORY_STEPS.find(s => s.id === selectedStepId) || HISTORY_STEPS[0];

  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxLineWidth = pageWidth - margin * 2;
    let y = 18;

    const checkPageBreak = (needed: number) => {
      if (y + needed > 280) {
        doc.addPage();
        y = 15;
      }
    };

    // Header
    doc.setFillColor(13, 148, 136); // Teal-600
    doc.rect(0, 0, pageWidth, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text('CẨM NANG HỎI BỆNH & KHAI THÁC TIỀN SỬ LÂM SÀNG', margin, 10);
    doc.setFontSize(9);
    doc.text("Dựa trên Macleod's Clinical Examination (14th Ed) - Section 1: Principles of Clinical History", margin, 16);

    y = 30;
    doc.setTextColor(30, 41, 59);

    // Title
    doc.setFontSize(16);
    doc.text('QUY TRÌNH 7 BƯỚC KHAI THÁC BỆNH SỬ CHUẨN MỰC', margin, y);
    y += 8;

    HISTORY_STEPS.forEach((step) => {
      checkPageBreak(30);
      doc.setFontSize(11);
      doc.setTextColor(15, 76, 129);
      doc.text(`Bước ${step.stepNumber}: ${step.title}`, margin, y);
      y += 5.5;

      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      const sumLines = doc.splitTextToSize(step.summary, maxLineWidth - 4);
      doc.text(sumLines, margin + 2, y);
      y += sumLines.length * 4.5 + 2;

      step.coreConcepts.forEach(c => {
        const cLines = doc.splitTextToSize(`• ${c}`, maxLineWidth - 6);
        checkPageBreak(cLines.length * 4.5);
        doc.text(cLines, margin + 4, y);
        y += cLines.length * 4.2;
      });

      y += 4;
    });

    // Ambiguous terms
    checkPageBreak(30);
    doc.setFontSize(13);
    doc.setTextColor(180, 83, 9);
    doc.text('BẢNG GIẢI MÃ CÁC THUẬT NGỮ MƠ HỒ CỦA NGƯỜI BỆNH', margin, y);
    y += 7;

    AMBIGUOUS_TERMS.forEach(t => {
      checkPageBreak(25);
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(`- Khi người bệnh nói: ${t.patientTerm}`, margin + 2, y);
      y += 4.5;

      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const lines = doc.splitTextToSize(`Kinh nghiệm: ${t.macleodTip}`, maxLineWidth - 6);
      doc.text(lines, margin + 4, y);
      y += lines.length * 4 + 2;
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(`Macleod's Principles of Clinical History - Trang ${i}/${totalPages}`, pageWidth / 2, 290, { align: 'center' });
    }

    doc.save('Cam-nang-hoi-benh-Macleod.pdf');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Macleod's Clinical Examination (Section 1)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Kỹ Năng Hỏi Bệnh & Khai Thác Tiền Sử Lâm Sàng
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              "Bệnh sử chiếm đến 80% giá trị giúp bác sĩ đưa ra chẩn đoán chính xác." Hệ thống hóa phương pháp phỏng vấn bệnh nhân, kỹ thuật làm rõ triệu chứng, khai thác tiền sử và giao tiếp chuyên nghiệp.
            </p>
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            <FileDown className="w-4 h-4" />
            <span>Xuất Hướng Dẫn Hỏi Bệnh (PDF)</span>
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto scrollbar-thin">
          {[
            { id: 'steps', label: '7 Bước Khai Thác Bệnh Sử', icon: MessageSquare },
            { id: 'terms', label: 'Giải Mã Thuật Ngữ Mơ Hồ', icon: HelpCircle },
            { id: 'systematic', label: 'Lược Qua Các Cơ Quan (ROS)', icon: Activity },
            { id: 'sbar', label: 'Bàn Giao Lâm Sàng SBAR', icon: PhoneCall },
            { id: 'spikes', label: 'Báo Tin Xấu SPIKES', icon: HeartHandshake },
            { id: 'spot', label: 'Chẩn Đoán Diện Mạo (Spot)', icon: Eye },
            { id: 'calculators', label: 'Công Cụ Tính Gói-Năm & Cồn', icon: Calculator },
            { id: 'scenarios', label: 'Xử Trí Tình Huống Khó', icon: AlertCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-sm' 
                    : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtab 1: The 7 Pillars of History Taking */}
      {activeTab === 'steps' && (
        <div className={`grid grid-cols-1 ${isStepsSidebarCollapsed ? 'lg:grid-cols-12 gap-5' : 'lg:grid-cols-12 gap-8'}`}>
          {/* Step Selector List / Collapsed Icons */}
          {isStepsSidebarCollapsed ? (
            <div className="lg:col-span-1 flex flex-col items-center space-y-2 py-1">
              <button
                onClick={() => setIsStepsSidebarCollapsed(false)}
                className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 transition-all w-full flex items-center justify-center border border-teal-200 dark:border-teal-800 shadow-2xs group"
                title="Mở rộng danh sách 7 bước"
              >
                <PanelLeftOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>

              <div className="w-full space-y-2 pt-1">
                {HISTORY_STEPS.map((step) => {
                  const isSelected = step.id === currentStep.id;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setSelectedStepId(step.id)}
                      className={`w-full p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all relative group ${
                        isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800 shadow-2xs'
                      }`}
                      title={`Bước ${step.stepNumber}: ${step.title}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                        isSelected ? 'bg-white text-teal-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <span className="text-[9px] font-bold mt-1 line-clamp-1 max-w-[50px] text-center leading-tight">
                        BƯỚC {step.stepNumber}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tiến Trình Tiếp Xúc Người Bệnh
                </span>
                <button
                  onClick={() => setIsStepsSidebarCollapsed(true)}
                  className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
                  title="Thu gọn danh sách thành biểu tượng số để mở rộng nội dung"
                >
                  <PanelLeftClose className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Thu gọn icon</span>
                </button>
              </div>

              {HISTORY_STEPS.map((step) => {
                const isSelected = step.id === currentStep.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => setSelectedStepId(step.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-white dark:bg-slate-900 border-teal-500 dark:border-teal-500 shadow-md ring-2 ring-teal-500/20' 
                        : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <h4 className={`font-bold text-sm leading-snug ${isSelected ? 'text-teal-950 dark:text-teal-300' : 'text-slate-900 dark:text-white'}`}>
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {step.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step Detail Content */}
          <div className={`${isStepsSidebarCollapsed ? 'lg:col-span-11' : 'lg:col-span-8'} space-y-6 transition-all duration-200`}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  Bước {currentStep.stepNumber} trong quy trình Macleod
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                  {currentStep.title}
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 italic">{currentStep.englishTitle}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {currentStep.summary}
                </p>
              </div>

              {/* Core Concepts */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
                  Nguyên tắc cốt lõi & Hướng dẫn thực hành:
                </h4>
                <div className="space-y-2">
                  {currentStep.coreConcepts.map((concept, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
                      <span>{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Questions */}
              {currentStep.keyQuestions.length > 0 && (
                <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-sky-900 dark:text-sky-300 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Mẫu câu hỏi giao tiếp gợi ý:</span>
                  </h4>
                  {currentStep.keyQuestions.map((q, idx) => (
                    <p key={idx} className="text-sky-950 dark:text-sky-200 font-medium italic pl-3 border-l-2 border-sky-400 dark:border-sky-500">
                      {q}
                    </p>
                  ))}
                </div>
              )}

              {/* Clinical Pearls */}
              {currentStep.clinicalPearls.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm space-y-2">
                  <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center space-x-1.5 text-xs uppercase tracking-wider">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Bài học lâm sàng Macleod (Clinical Pearls):</span>
                  </h4>
                  {currentStep.clinicalPearls.map((p, idx) => (
                    <p key={idx} className="text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                      ★ {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Ambiguous Terms */}
      {activeTab === 'terms' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Bảng Giải Mã Các Thuật Ngữ Mơ Hồ Của Người Bệnh (Clarifying Ambiguous Terms)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Theo Macleod Bảng 2.1: Người bệnh thường dùng các từ ngữ thông tục để chỉ nhiều bệnh lý hoàn toàn khác nhau. Bác sĩ bắt buộc phải làm rõ chính xác nghĩa!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AMBIGUOUS_TERMS.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="font-bold text-base text-teal-900 dark:text-teal-300">{item.patientTerm}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                    Cần phân biệt
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Các bệnh lý tiềm ẩn thường gặp:</span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {item.commonUnderlyingProblems.map((prob, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-teal-500 font-bold">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">Dấu hiệu nhận diện phân biệt:</span>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {item.usefulDistinguishingFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-sky-600 dark:text-sky-400 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-amber-900 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200/80 dark:border-amber-800/60 italic font-medium">
                  💡 <strong>Kinh nghiệm Macleod:</strong> {item.macleodTip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Systematic Enquiry (ROS) */}
      {activeTab === 'systematic' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Lược Qua Các Cơ Quan (Systematic Enquiry: Cardinal Symptoms)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Rà soát các triệu chứng then chốt của từng cơ quan để đảm bảo không bỏ sót bệnh lý đồng mắc hoặc các manh mối ngoài lý do chính đến khám.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYSTEMATIC_ENQUIRY_DATA.map((sys, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <h4 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>{sys.systemVi}</span>
                  <span className="text-xs font-normal text-slate-400 uppercase">{sys.system}</span>
                </h4>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Mẫu câu hỏi rà soát nhanh:</span>
                  <div className="space-y-1.5">
                    {sys.questions.map((q, i) => (
                      <p key={i} className="text-xs text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                        "{q}"
                      </p>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/60">
                  <span className="text-xs font-bold text-red-900 dark:text-red-300 block mb-1">
                    Triệu chứng cờ đỏ then chốt (Cardinal Symptoms):
                  </span>
                  <div className="space-y-1.5 mt-2">
                    {sys.cardinalSymptoms.map((cs, i) => (
                      <div key={i} className="text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/60">
                        <strong className="text-red-900 dark:text-red-300 block font-semibold">{cs.symptom}:</strong>
                        <span className="text-slate-700 dark:text-slate-300">{cs.clinicalClue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Calculators (Pack-Years & Alcohol) */}
      {activeTab === 'calculators' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Smoking Pack-Years Calculator */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
              <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-700 dark:text-orange-300">
                <Cigarette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Công Cụ Tính Chỉ Số Gói-Năm (Pack-Years)</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Macleod Box 2.7</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              Chỉ số Gói-Năm = (Số điếu thuốc mỗi ngày / 20) × Số năm hút thuốc
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Số điếu thuốc hút mỗi ngày:</span>
                  <span className="text-teal-700 dark:text-teal-400 font-bold">{cigsPerDay} điếu/ngày</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={cigsPerDay}
                  onChange={(e) => setCigsPerDay(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Số năm hút thuốc liên tục:</span>
                  <span className="text-teal-700 dark:text-teal-400 font-bold">{yearsSmoking} năm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={yearsSmoking}
                  onChange={(e) => setYearsSmoking(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
            </div>

            {/* Calculated Result */}
            <div className="p-4 rounded-xl bg-orange-50/80 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-900 dark:text-orange-300 uppercase tracking-wider block">
                  Kết quả tính toán:
                </span>
                <span className="text-2xl font-black text-orange-700 dark:text-orange-400">
                  {packYears} <span className="text-sm font-semibold">gói-năm (Pack-Years)</span>
                </span>
              </div>
              <div className="text-right text-xs">
                {packYears >= 20 ? (
                  <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300 font-bold border border-red-200 dark:border-red-800 block">
                    Nguy cơ rất cao COPD & K phổi
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800 block">
                    Nguy cơ vừa
                  </span>
                )}
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              * Khuyến cáo: Bệnh nhân có tiền sử hút thuốc ≥ 20-30 gói-năm cần được tầm soát COPD bằng hô hấp ký và tầm soát ung thư phổi bằng CT liều thấp (LDCT) theo chỉ định.
            </p>
          </div>

          {/* Alcohol Unit & CAGE Questionnaire */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">
                <Wine className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Đơn Vị Cồn & Tầm Soát Nghiện Rượu CAGE</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">Macleod Box 2.8 & 16.12</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              1 Đơn vị cồn = 10 mL (8g) ethanol = 1/2 panh bia (250ml) = 1 ly rượu vang (125ml) = 1 chén rượu mạnh (25ml)
            </div>

            {/* Alcohol Calculator inputs */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Cốc bia/tuần</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={beerPints}
                  onChange={(e) => setBeerPints(Number(e.target.value))}
                  className="w-full text-center py-1 font-bold text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded"
                />
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Ly rượu vang/tuần</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={wineGlasses}
                  onChange={(e) => setWineGlasses(Number(e.target.value))}
                  className="w-full text-center py-1 font-bold text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded"
                />
              </div>
              <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                <span className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">Chén rượu mạnh/tuần</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={spiritsShots}
                  onChange={(e) => setSpiritsShots(Number(e.target.value))}
                  className="w-full text-center py-1 font-bold text-teal-700 dark:text-teal-400 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-purple-900 dark:text-purple-300 block">Tổng lượng cồn tiêu thụ:</span>
                <span className="text-xl font-black text-purple-700 dark:text-purple-400">{totalAlcoholUnits} đơn vị/tuần</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-bold ${
                totalAlcoholUnits > 14 ? 'bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300' : 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
              }`}>
                {totalAlcoholUnits > 14 ? 'Vượt ngưỡng an toàn (>14 đơn vị)' : 'Trong ngưỡng cho phép'}
              </span>
            </div>

            {/* CAGE Questionnaire Checklist */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-2">
                Bộ câu hỏi CAGE tầm soát lạm dụng rượu (Điểm ≥ 2 là dương tính):
              </span>
              <div className="space-y-1.5 text-xs">
                {[
                  { key: 'cut', label: 'C - Cut down: Bác có từng cảm thấy mình nên giảm bớt việc uống rượu không?' },
                  { key: 'annoyed', label: 'A - Annoyed: Bác có cảm thấy bực mình khi người khác chỉ trích việc uống rượu của bác không?' },
                  { key: 'guilty', label: 'G - Guilty: Bác có bao giờ cảm thấy có lỗi hay ân hận vì đã uống rượu không?' },
                  { key: 'eye', label: 'E - Eye-opener: Bác có từng cần uống 1 ly rượu ngay khi vừa thức dậy vào buổi sáng để đỡ run tay hoặc hết cồn cào không?' }
                ].map(item => (
                  <label key={item.key} className="flex items-center space-x-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cageAnswers[item.key]}
                      onChange={(e) => setCageAnswers({ ...cageAnswers, [item.key]: e.target.checked })}
                      className="rounded accent-purple-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Điểm CAGE: {cageScore} / 4</span>
                <span className={`font-bold ${cageScore >= 2 ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {cageScore >= 2 ? 'GỢI Ý LẠM DỤNG / NGHIỆN RƯỢU MẠN TÍNH' : 'Nguy cơ thấp'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 5: Challenging Scenarios */}
      {activeTab === 'scenarios' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Kỹ Năng Giao Tiếp Trong Các Tình Huống Lâm Sàng Khó (Challenging Encounters)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chiến lược giao tiếp chuyên nghiệp với bệnh nhân tức giận, bệnh nhân nói nhiều lan man, người suy giảm nhận thức hoặc tình huống nhạy cảm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHALLENGING_SCENARIOS.map((scen, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{scen.scenario}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{scen.description}</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    Chiến lược tiếp cận khuyến cáo:
                  </span>
                  {scen.suggestedApproaches.map((app, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                      <span className="leading-relaxed">{app}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-amber-900 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 italic font-medium">
                  ★ <strong>Lời khuyên Macleod:</strong> {scen.macleodPearl}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 6: SBAR Handover */}
      {activeTab === 'sbar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center space-x-3 text-slate-900 dark:text-white mb-2">
              <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Chuẩn Giao Tiếp & Bàn Giao Lâm Sàng SBAR (Macleod Box 1.3)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Situation - Background - Assessment - Recommendation: Khung chuẩn hóa giúp truyền đạt thông tin khẩn cấp giữa nhân viên y tế ngắn gọn, chính xác, không bỏ sót.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SBAR_GUIDELINE.map((item) => (
              <div key={item.key} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-center space-x-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm">
                    {item.letter}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{item.title}</h3>
                    <span className="text-xs text-slate-400 dark:text-slate-500 italic">{item.englishTitle}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.meaning}
                </p>

                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5 uppercase tracking-wider">
                    Nội dung cần có trong báo cáo:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {item.checklist.map((chk, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-teal-600 dark:text-teal-400 font-bold">•</span>
                        <span>{chk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60">
                  <span className="text-[11px] font-bold text-teal-900 dark:text-teal-300 uppercase block mb-1">
                    Mẫu câu thoại thực tế:
                  </span>
                  <p className="text-xs text-teal-950 dark:text-teal-200 font-medium italic leading-relaxed">
                    {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 7: SPIKES Protocol */}
      {activeTab === 'spikes' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center space-x-3 text-slate-900 dark:text-white mb-2">
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Quy Trình Báo Tin Xấu SPIKES (Breaking Bad News - Macleod Ch.1)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Giao thức 6 bước được công nhận toàn cầu giúp bác sĩ thông báo tin xấu (ung thư, tiên lượng nặng, tử vong) với thái độ thấu cảm, khoa học và nâng đỡ người bệnh.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SPIKES_PROTOCOL.map((st) => (
              <div key={st.step} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xs">
                      {st.letter}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bước {st.step}: {st.name}</h4>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">{st.englishName}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Mục tiêu:</strong> {st.objective}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                      Lời thoại gợi ý:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 italic leading-relaxed">
                      {st.dialogueExample}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                    Lưu ý chuyên môn:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {st.clinicalTips.map((tip, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="text-rose-500 font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 8: Spot Diagnoses */}
      {activeTab === 'spot' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center space-x-3 text-slate-900 dark:text-white mb-2">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Chẩn Đoán Từ Cái Nhìn Đầu Tiên (Spot Diagnoses - Macleod Ch.3 Table 3.2)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nhận diện nhanh các bệnh lý toàn thân đặc trưng thông qua hình thái khuôn mặt, ánh mắt, tư thế và dáng dấp bên ngoài của người bệnh.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SPOT_DIAGNOSES.map((diag) => (
              <div key={diag.id} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-base text-indigo-950 dark:text-indigo-200">{diag.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{diag.faciesOrBody}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800 shrink-0">
                    Facies
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider block mb-1">
                    Các dấu hiệu kinh điển:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {diag.classicSigns.map((sgn, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                        <span>{sgn}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-800 dark:text-slate-200 block">Bệnh lý căn nguyên:</strong>
                  <span className="text-slate-600 dark:text-slate-400">{diag.underlyingCondition}</span>
                </div>

                <p className="text-xs text-amber-900 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 italic font-medium">
                  💡 <strong>Kinh nghiệm Macleod:</strong> {diag.macleodNote}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
