import React, { useMemo, useState, useEffect } from 'react';
import {
  BookOpen,
  Check,
  Download,
  Eye,
  Plus,
  Printer,
  Share2,
  Sparkles,
  Star,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { SoapClinicalExperience } from '../types.ts';
import {
  getVaultSoapExperiences,
  getSoapSyncStats,
} from '../lib/soapApi.ts';
import { exportSoapCaseToMarkdown } from '../lib/vaultBridge.ts';

// Modular Sub-components
import { SoapListView } from './soap/SoapListView.tsx';
import { SoapDetailView } from './soap/SoapDetailView.tsx';
import { QuickIngestModal } from './QuickIngestModal.tsx';
import { PromptBuilderModal } from './PromptBuilderModal.tsx';

interface SoapBoardProps {
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onNavigateToAnalysis?: () => void;
  onNavigateToProtocol?: (diseaseId?: string) => void;
  userCases?: SoapClinicalExperience[];
  onAddUserCase?: (caseData: SoapClinicalExperience) => void;
  initialSelectedCaseId?: string;
}

export const SoapExperienceBoard: React.FC<SoapBoardProps> = ({
  onOpenVaultDrawer,
  userCases = [],
  onAddUserCase,
  initialSelectedCaseId,
}) => {
  const [internalUserCases, setInternalUserCases] = useState<SoapClinicalExperience[]>([]);
  const [isQuickIngestOpen, setIsQuickIngestOpen] = useState<boolean>(false);
  const [isPromptBuilderOpen, setIsPromptBuilderOpen] = useState<boolean>(false);

  // Combine user-added runtime cases with static Vault cases
  const experiences = useMemo(() => {
    const vaultCases = getVaultSoapExperiences();
    const runtimeList = userCases.length > 0 ? userCases : internalUserCases;
    const map = new Map<string, SoapClinicalExperience>();
    // Prepend runtime cases so they appear first
    runtimeList.forEach((c) => map.set(c.id, c));
    vaultCases.forEach((c) => {
      if (!map.has(c.id)) map.set(c.id, c);
    });
    return Array.from(map.values());
  }, [userCases, internalUserCases]);

  const syncStats = useMemo(() => getSoapSyncStats(), [experiences]);

  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialSelectedCaseId || experiences[0]?.id || ''
  );

  useEffect(() => {
    if (initialSelectedCaseId) {
      setSelectedCaseId(initialSelectedCaseId);
    }
  }, [initialSelectedCaseId]);

  const handleSaveIngestedCase = (newSoap: SoapClinicalExperience) => {
    if (onAddUserCase) {
      onAddUserCase(newSoap);
    } else {
      setInternalUserCases((prev) => [newSoap, ...prev]);
    }
    setSelectedCaseId(newSoap.id);
  };

  // Filters & Sorting State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tất cả chuyên khoa');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'favorite'>('newest');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [viewMode, setViewMode] = useState<'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p'>('board');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Mobile adaptive layout state
  const [mobileTab, setMobileTab] = useState<'list' | 'detail'>('list');
  const [showMobileStats, setShowMobileStats] = useState<boolean>(false);

  // Filtered & Sorted Cases
  const filteredCases = useMemo(() => {
    const q = searchKeyword.trim().toLowerCase();
    let result = experiences.filter((c) => {
      const matchSpecialty =
        selectedSpecialty === 'Tất cả chuyên khoa' || c.specialty === selectedSpecialty;
      const matchLevel = selectedLevel === 'all' || c.experienceLevel === selectedLevel;
      const matchDiff =
        selectedDifficulty === 0 || (c.difficultyRating || 3) === selectedDifficulty;
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.a.icd10 && c.a.icd10.toLowerCase().includes(q)) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.demographicContext.toLowerCase().includes(q) ||
        c.s.chiefComplaint.toLowerCase().includes(q) ||
        (c.clinicalContext && c.clinicalContext.toLowerCase().includes(q));

      return matchSpecialty && matchLevel && matchDiff && matchQuery;
    });

    // Sorting
    if (sortBy === 'views') {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (sortBy === 'favorite') {
      result.sort((a, b) => (favorites.has(b.id) ? 1 : 0) - (favorites.has(a.id) ? 1 : 0));
    } else {
      // Newest
      result.sort((a, b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt));
    }

    return result;
  }, [experiences, selectedSpecialty, selectedLevel, selectedDifficulty, searchKeyword, sortBy, favorites]);

  // Current selected case
  const currentCase = useMemo(() => {
    return (
      filteredCases.find((c) => c.id === selectedCaseId) ||
      experiences.find((c) => c.id === selectedCaseId) ||
      filteredCases[0] ||
      experiences[0] ||
      null
    );
  }, [filteredCases, experiences, selectedCaseId]);

  // Current case index for Prev/Next navigation
  const currentCaseIndex = useMemo(() => {
    if (!currentCase) return -1;
    return filteredCases.findIndex((c) => c.id === currentCase.id);
  }, [filteredCases, currentCase]);

  const hasPrevCase = currentCaseIndex > 0;
  const hasNextCase = currentCaseIndex >= 0 && currentCaseIndex < filteredCases.length - 1;

  const handlePrevCase = () => {
    if (hasPrevCase) {
      const prevId = filteredCases[currentCaseIndex - 1].id;
      setSelectedCaseId(prevId);
    }
  };

  const handleNextCase = () => {
    if (hasNextCase) {
      const nextId = filteredCases[currentCaseIndex + 1].id;
      setSelectedCaseId(nextId);
    }
  };

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
    setMobileTab('detail');
  };

  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopySoapSummary = () => {
    if (!currentCase) return;
    const text = `🩺 [SOAP CLINICAL CASE] ${currentCase.title}
Chuyên khoa: ${currentCase.specialty} | ICD-10: ${currentCase.a.icd10}
Bối cảnh: ${currentCase.demographicContext}

[S - Bệnh sử & Triệu chứng]:
- Than phiền chính: ${currentCase.s.chiefComplaint}
- Bệnh sử: ${currentCase.s.historyOfPresentIllness}
- Tiền căn: ${currentCase.s.pastMedicalHistory}
${currentCase.s.historyPearls ? `* Clinical Pearl: ${currentCase.s.historyPearls}` : ''}

[O - Khám & Cận lâm sàng]:
- Sinh hiệu: HA ${currentCase.o.vitals?.bp || '--'} mmHg, Mạch ${currentCase.o.vitals?.pulse || '--'} l/p, Nhiệt ${currentCase.o.vitals?.temp || '--'} °C, SpO2 ${currentCase.o.vitals?.spo2 || '--'}%
- Khám: ${currentCase.o.physicalExam}
- Cận lâm sàng: ${currentCase.o.labsAndImaging}
${currentCase.o.objectivePitfalls ? `* Bẫy CLS: ${currentCase.o.objectivePitfalls}` : ''}

[A - Chẩn đoán & Biện luận]:
- Chẩn đoán: ${currentCase.a.primaryDiagnosis} (${currentCase.a.icd10})
- Phân biệt: ${currentCase.a.differentials.join(' · ')}
- Phân tầng nguy cơ: ${currentCase.a.riskStratification}
${currentCase.a.diagnosticPearls ? `* Biện luận Pearl: ${currentCase.a.diagnosticPearls}` : ''}

[P - Kế hoạch xử trí & Y lệnh]:
- Xử trí ban đầu: ${currentCase.p.immediateActions}
- Thuốc: ${currentCase.p.medications.map((m) => `${m.drug} ${m.dose}`).join('; ')}
- Theo dõi & Mục tiêu: ${currentCase.p.monitoringAndTargets}
${currentCase.p.takeawayLessons ? `* Bài học kinh nghiệm: ${currentCase.p.takeawayLessons}` : ''}
`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleExportVaultMarkdown = () => {
    if (!currentCase) return;
    const md = exportSoapCaseToMarkdown(currentCase);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCase.id || 'soap-case'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="soap-experience-board" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white p-4 sm:p-6 rounded-2xl shadow-sm">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase border border-emerald-400/30">
              <Sparkles className="w-3 h-3" />
              <span>Knowledge Vault · Kho Bệnh Án (BA)</span>
            </span>
            {/* Mobile Stats Toggle Button */}
            <button
              type="button"
              onClick={() => setShowMobileStats(!showMobileStats)}
              className="sm:hidden px-2 py-0.5 rounded-full text-[10.5px] font-medium bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors cursor-pointer flex items-center gap-1"
            >
              <SlidersHorizontal className="w-2.5 h-2.5" />
              <span>{showMobileStats ? 'Ẩn thống kê' : 'Xem thống kê'}</span>
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Sổ Tay Kinh Nghiệm Lâm Sàng SOAP</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kho lưu trữ và đúc kết các ca bệnh điển hình, bẫy lâm sàng thường gặp và bài học y học chứng cứ. Toàn bộ dữ liệu được quản lý tập trung từ Knowledge Vault.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-1.5 self-stretch sm:self-auto justify-end flex-wrap">
          <button
            type="button"
            onClick={handleCopySoapSummary}
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/15"
            title={copiedNotification ? "Đã sao chép SOAP!" : "Sao chép tóm tắt SOAP vào bộ nhớ tạm"}
            aria-label="Sao chép SOAP"
          >
            {copiedNotification ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4 text-slate-300" />
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/15 no-print"
            title="In bảng SOAP ra giấy hoặc xuất PDF"
            aria-label="In bản SOAP"
          >
            <Printer className="w-4 h-4 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={handleExportVaultMarkdown}
            className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/15 no-print"
            title="Xuất ca bệnh này thành file Markdown chuẩn Obsidian (.md)"
            aria-label="Xuất Markdown"
          >
            <BookOpen className="w-4 h-4 text-slate-300" />
          </button>

          <button
            type="button"
            onClick={() => setIsPromptBuilderOpen(true)}
            className="flex items-center gap-1.5 px-3 h-9 bg-blue-600/80 hover:bg-blue-600 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-blue-400/30 shadow-xs"
            title="Tạo prompt NotebookLM chuẩn hóa cho ca bệnh mới"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuickIngestOpen(true)}
            className="flex items-center gap-1.5 px-3.5 h-9 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-emerald-400/30 shadow-xs"
            title="Dán kết quả Markdown từ NotebookLM để nạp ca vào ứng dụng"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Nạp ca mới</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Stats Banner (Collapsible on Mobile, Always Grid on Tablet/Desktop) */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${showMobileStats ? 'grid' : 'hidden sm:grid'}`}>
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Ca trong Vault</div>
            <div className="text-lg font-bold text-slate-900 font-mono-custom tracking-tight">
              {experiences.length} <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Nguồn Dữ Liệu</div>
            <div className="text-xs font-bold text-blue-700 font-mono-custom tracking-tight">
              Knowledge Vault
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base shrink-0">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Đánh dấu Yêu thích</div>
            <div className="text-lg font-bold text-amber-700 font-mono-custom tracking-tight">
              {favorites.size} <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Pipeline nạp ca</div>
            <div className="text-xs font-bold text-blue-700 font-mono-custom tracking-tight">
              NotebookLM Ready
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile View Switcher Segmented Control (Only on Mobile/Tablet screens < lg) */}
      <div className="flex lg:hidden items-center justify-between bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-xs sticky top-2 z-20">
        <button
          type="button"
          onClick={() => setMobileTab('list')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mobileTab === 'list'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          <span>Danh Sách Ca ({filteredCases.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            mobileTab === 'detail'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Chi Tiết Ca Bệnh</span>
          {currentCase && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          )}
        </button>
      </div>

      {/* 4. Responsive Master-Detail Layout */}
      <div className="flex flex-col gap-6">
        {/* List View Container: Always on desktop, conditional on mobile */}
        <div className={`${mobileTab === 'detail' ? 'hidden lg:block' : 'block'}`}>
          <SoapListView
            cases={filteredCases}
            selectedCaseId={selectedCaseId}
            onSelectCase={handleSelectCase}
            selectedSpecialty={selectedSpecialty}
            setSelectedSpecialty={setSelectedSpecialty}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* Detail View Container: Always on desktop, conditional on mobile */}
        {currentCase && (
          <div className={`${mobileTab === 'list' ? 'hidden lg:block' : 'block'}`}>
            {/* Mobile Context Banner with Prev/Next Navigation */}
            <div className="flex lg:hidden items-center justify-between bg-slate-900 text-white px-3.5 py-2.5 rounded-2xl shadow-xs mb-3 gap-2">
              <button
                type="button"
                onClick={() => setMobileTab('list')}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>

              <div className="flex items-center gap-1.5 text-[11.5px] font-mono-custom text-slate-300 truncate">
                <span className="font-bold text-emerald-400">
                  {currentCaseIndex >= 0 ? `${currentCaseIndex + 1}/${filteredCases.length}` : ''}
                </span>
                <span className="truncate max-w-[130px] sm:max-w-[220px] font-sans font-medium text-white">
                  {currentCase.title}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevCase}
                  disabled={!hasPrevCase}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                  title="Ca trước"
                  aria-label="Ca trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextCase}
                  disabled={!hasNextCase}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-25 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
                  title="Ca tiếp theo"
                  aria-label="Ca tiếp theo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <SoapDetailView
              currentCase={currentCase}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </div>
        )}
      </div>

      {/* 5. Quick Ingest Modal */}
      <QuickIngestModal
        isOpen={isQuickIngestOpen}
        onClose={() => setIsQuickIngestOpen(false)}
        onSaveCase={handleSaveIngestedCase}
        onOpenPromptBuilder={() => {
          setIsQuickIngestOpen(false);
          setIsPromptBuilderOpen(true);
        }}
      />

      {/* 6. Prompt Builder Modal */}
      <PromptBuilderModal
        isOpen={isPromptBuilderOpen}
        onClose={() => setIsPromptBuilderOpen(false)}
        onSendToIngest={() => {
          setIsPromptBuilderOpen(false);
          setIsQuickIngestOpen(true);
        }}
        initialDisease={currentCase?.a.primaryDiagnosis || currentCase?.title || ''}
      />
    </div>
  );
};
