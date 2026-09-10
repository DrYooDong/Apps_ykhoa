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

  const handleSelectCase = (id: string) => {
    setSelectedCaseId(id);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-sm">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase border border-emerald-400/30">
            <Sparkles className="w-3 h-3" />
            <span>Knowledge Vault · Kho Bệnh Án (BA)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Sổ Tay Kinh Nghiệm Lâm Sàng SOAP</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kho lưu trữ và đúc kết các ca bệnh điển hình, bẫy lâm sàng thường gặp và bài học y học chứng cứ. Toàn bộ dữ liệu được quản lý tập trung từ Knowledge Vault.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCopySoapSummary}
            className="flex items-center gap-1.5 px-3 h-9 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer border border-white/15"
            title="Sao chép tóm tắt SOAP vào bộ nhớ tạm"
          >
            {copiedNotification ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-slate-300" />
            )}
            <span>{copiedNotification ? 'Đã sao chép!' : 'Sao chép SOAP'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 h-9 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer border border-white/15 no-print"
            title="In bảng SOAP ra giấy hoặc xuất PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span>In bản SOAP</span>
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

          <button
            type="button"
            onClick={handleExportVaultMarkdown}
            className="flex items-center gap-1.5 px-3.5 h-9 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer border border-white/15 no-print"
            title="Xuất ca bệnh này thành file Markdown chuẩn Obsidian (.md)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Xuất Markdown</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
              Knowledge Vault (BA)
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
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Pipeline nạp ca</div>
            <div className="text-xs font-bold text-indigo-700 font-mono-custom tracking-tight">
              NotebookLM Ready
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter & Case Selection Toolbar */}
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

      {/* 4. Selected Case 4-Column SOAP Matrix Board */}
      {currentCase && (
        <SoapDetailView
          currentCase={currentCase}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenVaultDrawer={onOpenVaultDrawer}
        />
      )}

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
