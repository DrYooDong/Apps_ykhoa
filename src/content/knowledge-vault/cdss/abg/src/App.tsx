import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ABGAnalyzer } from './components/ABGAnalyzer';
import { ClinicalGuideView, ClinicalKnowledgeTab } from './components/ClinicalGuideView';
import { ClinicalCasesView } from './components/ClinicalCasesView';
import { TreatmentProtocolsView } from './components/TreatmentProtocolsView';
import { GlossaryModal } from './components/GlossaryModal';
import { MobileABGView } from './components/mobile/MobileABGView';
import { ABGInput } from './types/abg';
import { Stethoscope, ShieldCheck, HeartPulse, BookOpen, HelpCircle } from 'lucide-react';

const INITIAL_DEFAULT_INPUT: ABGInput = {
  unit: 'mmHg',
  pH: 7.40,
  pCO2: 40,
  pO2: 95,
  hco3: 24,
  be: 0,
  sao2: 98,
  fio2: 21,
  na: 140,
  k: 4.0,
  cl: 100,
  lactate: 1.0,
  glucose: 5.0,
  albumin: 4.0,
  patientAge: 45
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'guide' | 'cases' | 'protocols'>('analyzer');
  const [guideTab, setGuideTab] = useState<ClinicalKnowledgeTab>('interactive-flowchart');
  const [sharedInput, setSharedInput] = useState<ABGInput>(INITIAL_DEFAULT_INPUT);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [glossaryInitialQuery, setGlossaryInitialQuery] = useState<string>('');

  // Tự động nhận diện màn hình di động theo kích thước viewport (ngưỡng tiêu chuẩn < 768px)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadCaseToAnalyzer = (input: ABGInput) => {
    setSharedInput(input);
    setActiveTab('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGlossary = (query?: string) => {
    setGlossaryInitialQuery(query || '');
    setIsGlossaryOpen(true);
  };

  const handleNavigateToGuideGlossary = () => {
    setGuideTab('glossary');
    setActiveTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tự động chuyển đổi sang giao diện di động khi xem trên thiết bị màn hình nhỏ
  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
        <MobileABGView
          input={sharedInput}
          setInput={setSharedInput}
          onOpenGlossary={handleOpenGlossary}
        />

        {/* Glossary Modal */}
        <GlossaryModal
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
          initialSearchQuery={glossaryInitialQuery}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'guide' && guideTab === 'glossary') {
            // keep or reset as needed
          }
        }}
        onNavigateToGlossaryInGuide={handleNavigateToGuideGlossary}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-12">
        {activeTab === 'analyzer' && (
          <ABGAnalyzer
            initialInput={sharedInput}
            onInputChange={setSharedInput}
            onSelectCase={() => setActiveTab('cases')}
          />
        )}
        {activeTab === 'guide' && (
          <ClinicalGuideView
            key={guideTab}
            initialTab={guideTab}
            onLoadPresetToAnalyzer={handleLoadCaseToAnalyzer}
            onOpenGlossary={handleNavigateToGuideGlossary}
          />
        )}
        {activeTab === 'cases' && (
          <ClinicalCasesView
            initialSubTab="cases"
            onLoadCaseToAnalyzer={handleLoadCaseToAnalyzer}
          />
        )}
        {activeTab === 'protocols' && (
          <ClinicalCasesView
            initialSubTab="protocols"
            onLoadCaseToAnalyzer={handleLoadCaseToAnalyzer}
          />
        )}
      </main>

      {/* Floating Quick Glossary Action Button */}
      <button
        id="btn-quick-glossary"
        onClick={handleNavigateToGuideGlossary}
        className="fixed bottom-6 right-6 z-40 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-lg border border-purple-400/40 flex items-center space-x-2 transition-all hover:scale-105 cursor-pointer group"
        title="Mở Từ Điển Thuật Ngữ & Viết Tắt trong Cẩm Nang & Sơ Đồ"
      >
        <HelpCircle className="w-5 h-5 text-purple-100 group-hover:text-white transition-colors" />
        <span className="text-xs font-bold hidden sm:inline">Từ Điển Cẩm Nang</span>
      </button>

      {/* Medical Footer & Reference Disclaimers */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-slate-800 text-sm">ABG Pro • Lâm Sàng Khí Máu Động Mạch</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
              <span className="font-semibold text-slate-700">Tài liệu y văn gốc:</span>
              <span>1. Arterial Blood Gases Made Easy (2nd Ed, Iain Hennessey & Alan Japp, Elsevier)</span>
              <span>•</span>
              <span>2. ABG Interpretation: A case study approach (Donna Pierre & Mike Ranson, M&K Publishing)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
            <strong className="text-slate-700 block mb-0.5">Tuyên bố miễn trừ trách nhiệm y khoa (Medical Disclaimer):</strong>
            Hệ thống cung cấp các thuật toán sinh lý học và phác đồ xử trí dựa trên các tài liệu chuyên khảo được xuất bản rộng rãi nhằm mục đích hỗ trợ học tập, tra cứu và nâng cao năng lực lâm sàng cho nhân viên y tế và sinh viên y khoa. Mọi quyết định điều trị cụ thể trên người bệnh thực tế phải luôn do bác sĩ điều trị trực tiếp đánh giá dựa trên toàn trạng lâm sàng, tiền sử bệnh và các xét nghiệm cận lâm sàng phối hợp.
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            <div>&copy; {new Date().getFullYear()} ABG Pro Clinical System. Toàn quyền bảo lưu.</div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chuẩn hóa 6 bước • Quy tắc không bù quá mức • Phân loại Berlin ARDS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialSearchQuery={glossaryInitialQuery}
      />
    </div>
  );
}
