import React, { useState } from 'react';
import {
  BookOpen,
  GitFork,
  FileCheck2,
  Activity,
  Scale,
  Syringe,
  Sparkles,
  HelpCircle,
  Tag,
  Layers,
  Wind
} from 'lucide-react';
import { InteractiveFlowchart } from './InteractiveFlowchart';
import { SixStepGuideSection } from './knowledge/SixStepGuideSection';
import { DecisionTreesSection } from './knowledge/DecisionTreesSection';
import { NomogramSection } from './knowledge/NomogramSection';
import { PhysiologySection } from './knowledge/PhysiologySection';
import { ProceduresVbgSection } from './knowledge/ProceduresVbgSection';
import { GlossarySection } from './knowledge/GlossarySection';
import { ABGInput } from '../types/abg';

export type ClinicalKnowledgeTab = 
  | 'interactive-flowchart'
  | 'six-step-guide'
  | 'decision-trees'
  | 'nomogram'
  | 'physiology'
  | 'procedures-vbg'
  | 'glossary';

interface ClinicalGuideViewProps {
  onLoadPresetToAnalyzer?: (input: ABGInput) => void;
  onOpenGlossary?: (query?: string) => void;
  initialTab?: ClinicalKnowledgeTab;
}

export const ClinicalGuideView: React.FC<ClinicalGuideViewProps> = ({
  onLoadPresetToAnalyzer,
  onOpenGlossary,
  initialTab = 'interactive-flowchart'
}) => {
  const [activeTab, setActiveTab] = useState<ClinicalKnowledgeTab>(initialTab);
  const [selectedTreeBranch, setSelectedTreeBranch] = useState<'gas-exchange' | 'acid-base' | 'anion-gap'>('gas-exchange');
  const [selectedPhysioBranch, setSelectedPhysioBranch] = useState<'scale' | 'oxygen'>('scale');
  const [selectedProcedureBranch, setSelectedProcedureBranch] = useState<'sampling' | 'vbg'>('sampling');

  const navItems: {
    id: ClinicalKnowledgeTab;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string;
    description: string;
  }[] = [
    {
      id: 'interactive-flowchart',
      label: 'Lưu Đồ Tương Tác Từng Bước',
      shortLabel: 'Lưu Đồ Tương Tác',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      badge: 'Thực chiến',
      description: 'Chẩn đoán tương tác từ pH, PaCO2 đến bù trừ & phác đồ'
    },
    {
      id: 'six-step-guide',
      label: 'Quy Trình 6 Bước Đọc ABG',
      shortLabel: 'Quy Trình 6 Bước',
      icon: <FileCheck2 className="w-4 h-4 text-blue-500" />,
      badge: 'Chuẩn hoá',
      description: 'Phương pháp tiếp cận có hệ thống Donna Pierre & Ranson'
    },
    {
      id: 'decision-trees',
      label: 'Cây Quyết Định (Hình 22, 23 & AG)',
      shortLabel: 'Cây Quyết Định',
      icon: <GitFork className="w-4 h-4 text-indigo-500" />,
      badge: '3 Sơ đồ',
      description: 'Cây trao đổi khí, cây toan kiềm & sơ đồ Anion Gap'
    },
    {
      id: 'nomogram',
      label: 'Nomogram Toan Kiềm Tương Tác (Hình 16)',
      shortLabel: 'Nomogram',
      icon: <Activity className="w-4 h-4 text-rose-500" />,
      badge: '2D Visual',
      description: 'Tọa độ không gian 2 chiều xác định dải bù trừ 95%'
    },
    {
      id: 'physiology',
      label: 'Sinh Lý & Chiếc Cân Thăng Bằng',
      shortLabel: 'Sinh Lý & Cân Bằng',
      icon: <Scale className="w-4 h-4 text-emerald-500" />,
      description: 'Mô hình thăng bằng (Hình 11-15), đường cong Oxy-Hb & Bohr'
    },
    {
      id: 'procedures-vbg',
      label: 'Kỹ Thuật Lấy Máu & Đối Chiếu VBG',
      shortLabel: 'Kỹ Thuật & VBG',
      icon: <Syringe className="w-4 h-4 text-cyan-500" />,
      description: 'Test Allen 5 bước, kỹ thuật chọc ĐM & so sánh ABG vs VBG'
    },
    {
      id: 'glossary',
      label: 'Từ Điển Thuật Ngữ & Viết Tắt ABG',
      shortLabel: 'Từ Điển ABG',
      icon: <HelpCircle className="w-4 h-4 text-purple-600" />,
      badge: 'Tra cứu',
      description: 'Tra cứu nhanh định nghĩa, công thức, khoảng tham chiếu và ý nghĩa lâm sàng'
    }
  ];

  // Quick jump presets
  const handleQuickJump = (
    tab: ClinicalKnowledgeTab,
    treeBranch?: 'gas-exchange' | 'acid-base' | 'anion-gap',
    physioBranch?: 'scale' | 'oxygen',
    procedureBranch?: 'sampling' | 'vbg'
  ) => {
    setActiveTab(tab);
    if (treeBranch) setSelectedTreeBranch(treeBranch);
    if (physioBranch) setSelectedPhysioBranch(physioBranch);
    if (procedureBranch) setSelectedProcedureBranch(procedureBranch);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center space-x-3.5">
          <div className="p-3 bg-indigo-500/20 rounded-xl border border-indigo-400/30 shrink-0">
            <BookOpen className="w-7 h-7 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <h1 className="text-xl font-bold tracking-tight">
                Cẩm Nang &amp; Lưu Đồ Chẩn Đoán Khí Máu (Clinical Guide &amp; Algorithms)
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/40">
                Toàn Diện &amp; Tích Hợp
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-1">
              Hợp nhất trọn vẹn phương pháp tiếp cận 6 bước, lưu đồ tương tác, cây quyết định Hennessey (Hình 16, 22, 23), từ điển thuật ngữ viết tắt và cẩm nang kỹ thuật lấy máu.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-start md:self-auto">
          <button
            id="btn-guide-glossary"
            onClick={() => handleQuickJump('glossary')}
            className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-xs border ${
              activeTab === 'glossary'
                ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-indigo-100 border-white/20'
            }`}
            title="Tra cứu nhanh định nghĩa, công thức & viết tắt ABG"
          >
            <HelpCircle className="w-4 h-4 text-cyan-300" />
            <span>Tra Cứu Từ Điển ABG</span>
          </button>
        </div>
      </div>

      {/* Quick Topic Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-thin text-xs">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 whitespace-nowrap pl-1">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          Truy cập nhanh:
        </span>
        <button
          onClick={() => handleQuickJump('glossary')}
          className={`px-2.5 py-1 rounded-full border text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === 'glossary'
              ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
              : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
          }`}
        >
          📖 Từ Điển Thuật Ngữ ABG
        </button>
        <button
          onClick={() => handleQuickJump('interactive-flowchart')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          ⚡ Lưu Đồ Tương Tác
        </button>
        <button
          onClick={() => handleQuickJump('six-step-guide')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          📋 Quy Trình 6 Bước
        </button>
        <button
          onClick={() => handleQuickJump('decision-trees', 'gas-exchange')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          🫁 Sơ Đồ Trao Đổi Khí (Hình 22)
        </button>
        <button
          onClick={() => handleQuickJump('decision-trees', 'acid-base')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          ⚖️ Sơ Đồ Toan Kiềm (Hình 23)
        </button>
        <button
          onClick={() => handleQuickJump('decision-trees', 'anion-gap')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          🧪 GOLDMARK (Anion Gap)
        </button>
        <button
          onClick={() => handleQuickJump('nomogram')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          📈 Nomogram 2D (Hình 16)
        </button>
        <button
          onClick={() => handleQuickJump('physiology', undefined, 'scale')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          ⚖️ Cân Thăng Bằng &amp; Bù Trừ
        </button>
        <button
          onClick={() => handleQuickJump('physiology', undefined, 'oxygen')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          💨 Hiệu Ứng Bohr &amp; Oxy-Hb
        </button>
        <button
          onClick={() => handleQuickJump('procedures-vbg', undefined, undefined, 'sampling')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          🩺 Test Allen Cải Biên 5 Bước
        </button>
        <button
          onClick={() => handleQuickJump('procedures-vbg', undefined, undefined, 'vbg')}
          className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
        >
          🩸 Đối Chiếu ABG vs VBG
        </button>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-knowledge-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm scale-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={item.description}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] rounded-full font-bold ml-1 ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="transition-all duration-200">
        {/* 1. Interactive Diagnostic Flowchart */}
        {activeTab === 'interactive-flowchart' && (
          <InteractiveFlowchart
            onLoadPresetToAnalyzer={onLoadPresetToAnalyzer}
            onOpenGlossary={onOpenGlossary}
          />
        )}

        {/* 2. Six-Step Method */}
        {activeTab === 'six-step-guide' && <SixStepGuideSection />}

        {/* 3. Decision Trees & Anion Gap */}
        {activeTab === 'decision-trees' && (
          <DecisionTreesSection
            key={selectedTreeBranch}
            initialTree={selectedTreeBranch}
            onOpenGlossary={onOpenGlossary}
          />
        )}

        {/* 4. Nomogram */}
        {activeTab === 'nomogram' && (
          <NomogramSection onLoadPresetToAnalyzer={onLoadPresetToAnalyzer} />
        )}

        {/* 5. Physiology & Scale Model */}
        {activeTab === 'physiology' && (
          <PhysiologySection
            key={selectedPhysioBranch}
            initialSubView={selectedPhysioBranch}
          />
        )}

        {/* 6. Procedures & VBG */}
        {activeTab === 'procedures-vbg' && (
          <ProceduresVbgSection
            key={selectedProcedureBranch}
            initialSubView={selectedProcedureBranch}
          />
        )}

        {/* 7. ABG Glossary & Terminology Lookup */}
        {activeTab === 'glossary' && <GlossarySection />}
      </div>
    </div>
  );
};
