import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  Cloud,
  Eye,
  HardDrive,
  Plus,
  Printer,
  RefreshCw,
  Share2,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { SoapClinicalExperience } from '../types.ts';
import {
  EXPERIENCE_LEVEL_LABELS,
  SAMPLE_SOAP_EXPERIENCES,
} from '../data/soapSeedData.ts';
import {
  getLocalSoapExperiences,
  getSoapSyncStats,
  soapCreate,
  soapDelete,
  soapExportAll,
  soapImportBulk,
  soapIncrementViewCount,
  soapPullFromSupabase,
  soapSyncToSupabase,
  soapToggleFavorite,
  soapUpdate,
} from '../lib/soapApi.ts';
import { isSupabaseConfigured } from '../lib/supabase.ts';
import { exportSoapCaseToMarkdown } from '../lib/vaultBridge.ts';

// Modular Sub-components
import { SoapListView } from './soap/SoapListView.tsx';
import { SoapDetailView } from './soap/SoapDetailView.tsx';
import { SoapEditorForm } from './soap/SoapEditorForm.tsx';

interface SoapBoardProps {
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onNavigateToAnalysis?: () => void;
  onNavigateToProtocol?: (diseaseId?: string) => void;
}

export const SoapExperienceBoard: React.FC<SoapBoardProps> = ({
  onOpenVaultDrawer,
}) => {
  // Load experiences from soapApi
  const [experiences, setExperiences] = useState<SoapClinicalExperience[]>(() =>
    getLocalSoapExperiences()
  );

  const [syncStats, setSyncStats] = useState(() => getSoapSyncStats());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    experiences[0]?.id || SAMPLE_SOAP_EXPERIENCES[0].id
  );

  // Filters & Sorting State
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tất cả chuyên khoa');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number>(0);
  const [selectedSyncFilter, setSelectedSyncFilter] = useState<'all' | 'local' | 'synced'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'favorite'>('newest');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [viewMode, setViewMode] = useState<'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p'>('board');
  const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
  const [editingCase, setEditingCase] = useState<SoapClinicalExperience | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Helper to refresh experience list and sync stats
  const refreshExperiences = () => {
    const list = getLocalSoapExperiences();
    setExperiences(list);
    setSyncStats(getSoapSyncStats());
  };

  // Filtered & Sorted Cases
  const filteredCases = useMemo(() => {
    const q = searchKeyword.trim().toLowerCase();
    let result = experiences.filter((c) => {
      const matchSpecialty =
        selectedSpecialty === 'Tất cả chuyên khoa' || c.specialty === selectedSpecialty;
      const matchLevel = selectedLevel === 'all' || c.experienceLevel === selectedLevel;
      const matchDiff =
        selectedDifficulty === 0 || (c.difficultyRating || 3) === selectedDifficulty;
      const matchSync =
        selectedSyncFilter === 'all' ||
        (selectedSyncFilter === 'synced' && c.syncStatus === 'synced') ||
        (selectedSyncFilter === 'local' && c.syncStatus !== 'synced');
      const matchQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.a.icd10.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.demographicContext.toLowerCase().includes(q) ||
        c.s.chiefComplaint.toLowerCase().includes(q) ||
        (c.clinicalContext && c.clinicalContext.toLowerCase().includes(q));

      return matchSpecialty && matchLevel && matchDiff && matchSync && matchQuery;
    });

    // Sorting
    if (sortBy === 'views') {
      result.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (sortBy === 'favorite') {
      result.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    } else {
      // Newest
      result.sort((a, b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt));
    }

    return result;
  }, [
    experiences,
    selectedSpecialty,
    selectedLevel,
    selectedDifficulty,
    selectedSyncFilter,
    sortBy,
    searchKeyword,
  ]);

  // Current selected case
  const currentCase = useMemo(() => {
    return (
      experiences.find((c) => c.id === selectedCaseId) ||
      filteredCases[0] ||
      SAMPLE_SOAP_EXPERIENCES[0]
    );
  }, [experiences, selectedCaseId, filteredCases]);

  // When a case is selected, increment view count in background
  const handleSelectCase = async (id: string) => {
    setSelectedCaseId(id);
    try {
      const updated = await soapIncrementViewCount(id);
      setExperiences((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setSyncStats(getSoapSyncStats());
    } catch {
      // Ignore background error
    }
  };

  // Toggle favorite
  const handleToggleFavorite = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      const updated = await soapToggleFavorite(id);
      setExperiences((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setSyncStats(getSoapSyncStats());
    } catch (err) {
      console.error(err);
    }
  };

  // Delete case
  const handleDeleteCase = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!confirm('Bạn có chắc muốn xóa ca kinh nghiệm này khỏi danh sách?')) return;
    await soapDelete(id);
    const remaining = experiences.filter((c) => c.id !== id);
    setExperiences(remaining);
    setSyncStats(getSoapSyncStats());
    if (selectedCaseId === id && remaining.length > 0) {
      setSelectedCaseId(remaining[0].id);
    }
  };

  // Reset to sample cases
  const handleResetToSample = async () => {
    if (!confirm('Khôi phục lại toàn bộ danh mục các ca kinh nghiệm lâm sàng mẫu ban đầu?')) return;
    const res = await soapImportBulk(SAMPLE_SOAP_EXPERIENCES);
    setExperiences(res);
    setSyncStats(getSoapSyncStats());
    setSelectedCaseId(SAMPLE_SOAP_EXPERIENCES[0].id);
  };

  // Export JSON
  const handleExportJson = async () => {
    const all = await soapExportAll();
    const dataStr = JSON.stringify(all, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docspace-soap-experiences-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export current case to Obsidian Markdown for Knowledge Vault
  const handleExportVaultMarkdown = () => {
    if (!currentCase) return;
    const mdContent = exportSoapCaseToMarkdown(currentCase);
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanTitle = (currentCase.title || 'ca-benh').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
    a.download = `BA_SOAP_${cleanTitle}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setSyncFeedback('Đã tải file Markdown chuẩn Obsidian để lưu vào Knowledge Vault/Kho bệnh án/');
    setTimeout(() => setSyncFeedback(null), 5000);
  };

  // Supabase Sync Trigger
  const handleSyncCloud = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const pushRes = await soapSyncToSupabase();
      const pullRes = await soapPullFromSupabase();

      refreshExperiences();
      const feedback = `${pushRes.message} ${pullRes.pulled > 0 ? `| ${pullRes.message}` : ''}`;
      setSyncFeedback(feedback);
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch (err: any) {
      setSyncFeedback(`Đồng bộ thất bại: ${err.message || 'Lỗi mạng'}`);
      setTimeout(() => setSyncFeedback(null), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  // Copy SOAP summary
  const handleCopySummary = async () => {
    if (!currentCase) return;
    const lines = [
      `======================================================`,
      `ĐÚC KẾT KINH NGHIỆM LÂM SÀNG CHUẨN SOAP (DOCSPACE)`,
      `Tiêu đề: ${currentCase.title}`,
      `Chuyên khoa: ${currentCase.specialty} · Cấp độ: ${EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].label}`,
      `Bối cảnh: ${currentCase.demographicContext}`,
      `Khoa phòng: ${currentCase.clinicalContext || 'Khoa Cấp cứu'} · Độ khó: ${currentCase.difficultyRating || 3}/5★`,
      `Nguồn tham khảo: ${currentCase.sourceReference || 'Thực tiễn lâm sàng & Phác đồ EBM'}`,
      `Tác giả đúc kết: ${currentCase.authorDoctor || 'Bác sĩ lâm sàng'} · Ngày: ${currentCase.createdAt}`,
      `------------------------------------------------------`,
      `[S - SUBJECTIVE / CHỦ QUAN & BỆNH SỬ]`,
      `• Than phiền chính: ${currentCase.s.chiefComplaint}`,
      `• Bệnh sử PQRST: ${currentCase.s.historyOfPresentIllness}`,
      `• Tiền căn & Dược sử: ${currentCase.s.pastMedicalHistory}`,
      `• Dấu ấn hỏi bệnh: ${currentCase.s.historyPearls}`,
      ``,
      `[O - OBJECTIVE / KHÁCH QUAN & CẬN LÂM SÀNG]`,
      `• Sinh hiệu: T: ${currentCase.o.vitals.temp || '—'}°C · Mạch: ${currentCase.o.vitals.pulse || '—'} l/p · HA: ${currentCase.o.vitals.bp || '—'} mmHg · NT: ${currentCase.o.vitals.resp || '—'} l/p · SpO2: ${currentCase.o.vitals.spo2 || '—'}% · BMI: ${currentCase.o.vitals.bmi || '—'}`,
      `• Khám thực thể: ${currentCase.o.physicalExam}`,
      `• Cận lâm sàng: ${currentCase.o.labsAndImaging}`,
      `• Bẫy cận lâm sàng: ${currentCase.o.objectivePitfalls}`,
      ``,
      `[A - ASSESSMENT / ĐÁNH GIÁ & BIỆN LUẬN]`,
      `• Chẩn đoán: ${currentCase.a.primaryDiagnosis} (ICD-10: ${currentCase.a.icd10})`,
      `• Chẩn đoán phân biệt: ${currentCase.a.differentials.join('; ')}`,
      `• Phân tầng nguy cơ: ${currentCase.a.riskStratification}`,
      `• Đúc kết biện luận: ${currentCase.a.diagnosticPearls}`,
      ``,
      `[P - PLAN / KẾ HOẠCH & ĐIỀU TRỊ]`,
      `• Xử trí cấp cứu: ${currentCase.p.immediateActions}`,
      `• Y lệnh thuốc: ${currentCase.p.medications.map((m) => `${m.drug} ${m.dose} (${m.route})`).join('; ')}`,
      `• Theo dõi & Mục tiêu: ${currentCase.p.monitoringAndTargets}`,
      `• Kết cục ca bệnh: ${currentCase.outcomeNotes || 'Đáp ứng tốt, xuất viện an toàn'}`,
      `• Bài học kinh nghiệm: ${currentCase.p.takeawayLessons}`,
      `======================================================`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    } catch {
      // Fallback
    }
  };

  const openCreateModal = () => {
    setEditingCase(null);
    setIsNewModalOpen(true);
  };

  const openEditModal = (c: SoapClinicalExperience, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingCase(c);
    setIsNewModalOpen(true);
  };

  const handleSaveModal = async (
    caseData: Omit<
      SoapClinicalExperience,
      'id' | 'createdAt' | 'updatedAt' | 'syncStatus' | 'isFavorite' | 'viewCount'
    >
  ) => {
    if (editingCase) {
      await soapUpdate(editingCase.id, caseData);
      refreshExperiences();
      setSelectedCaseId(editingCase.id);
    } else {
      const created = await soapCreate(caseData);
      refreshExperiences();
      setSelectedCaseId(created.id);
    }
    setIsNewModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-500" />

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase font-mono-custom bg-blue-50 text-blue-700 border border-blue-200/80">
              Mô hình Y khoa Quốc tế
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Phi danh tính hóa · Chuẩn lưu trữ kinh nghiệm</span>
            </span>
            <span className="text-xs text-slate-500 font-mono-custom bg-slate-100 px-2.5 py-0.5 rounded-md">
              {experiences.length} ca kinh nghiệm đã lưu
            </span>
          </div>

          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5 flex-wrap">
            <span>Sổ Tay Kinh Nghiệm Lâm Sàng Chuẩn SOAP</span>
            <span className="text-xs font-mono-custom font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/70">
              S · O · A · P Matrix
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Hệ thống đúc kết tri thức ca bệnh thực chiến, bẫy chẩn đoán và bài học điều trị theo 4 cột{' '}
            <span className="font-semibold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/80">S (Chủ quan)</span> ·{' '}
            <span className="font-semibold text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/80">O (Khách quan)</span> ·{' '}
            <span className="font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">A (Đánh giá)</span> ·{' '}
            <span className="font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/80">P (Kế hoạch)</span>. Lưu trữ an toàn, hỗ trợ đồng bộ Supabase Cloud và hoạt động Offline-first.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleSyncCloud}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 h-9 font-semibold text-xs rounded-lg transition-all cursor-pointer border ${
              isSupabaseConfigured
                ? syncStats.localOnly > 0
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-2xs'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title={
              isSupabaseConfigured
                ? `Đồng bộ 2 chiều với Supabase Cloud (${syncStats.localOnly} ca local chưa đẩy)`
                : 'Supabase chưa được cấu hình, dữ liệu đang lưu tại LocalStorage'
            }
          >
            {isSyncing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
            ) : isSupabaseConfigured ? (
              <Cloud className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>
              {isSyncing
                ? 'Đang đồng bộ...'
                : syncStats.localOnly > 0
                ? `Đồng bộ Cloud (${syncStats.localOnly})`
                : 'Đã đồng bộ Cloud'}
            </span>
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-3.5 h-9 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-all cursor-pointer hover:shadow-sm"
            title="Thêm ca kinh nghiệm lâm sàng mới theo chuẩn 4 cột SOAP"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm ca mới</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 h-9 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs rounded-lg transition-colors cursor-pointer"
            title="Sao chép tóm tắt SOAP ca hiện tại để chia sẻ hoặc lưu EMR"
          >
            {copiedNotification ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Share2 className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span>{copiedNotification ? 'Đã sao chép!' : 'Sao chép SOAP'}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 h-9 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium text-xs rounded-lg transition-colors cursor-pointer no-print"
            title="In bảng SOAP ra giấy hoặc xuất PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>In bảng SOAP</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center justify-center w-9 h-9 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs rounded-lg transition-colors cursor-pointer no-print"
            title="Xuất danh mục ca kinh nghiệm ra file JSON"
          >
            📥
          </button>

          <button
            type="button"
            onClick={handleExportVaultMarkdown}
            className="flex items-center gap-1.5 px-3 h-9 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-xs no-print"
            title="Lưu ca bệnh này thành file Markdown chuẩn Obsidian (.md) cho Knowledge Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-200" />
            <span className="hidden lg:inline">Lưu vào Vault</span>
          </button>
        </div>
      </div>

      {/* Sync Feedback Alert */}
      {syncFeedback && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
          <button
            type="button"
            onClick={() => setSyncFeedback(null)}
            className="text-slate-400 hover:text-slate-700 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Quick Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Tổng ca lưu trữ</div>
            <div className="text-lg font-bold text-slate-900 font-mono-custom tracking-tight">
              {experiences.length} <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base shrink-0">
            <Cloud className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Đồng bộ Cloud</div>
            <div className="text-lg font-bold text-emerald-700 font-mono-custom tracking-tight">
              {syncStats.synced}{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">
                / {syncStats.total}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base shrink-0">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Đánh dấu Yêu thích</div>
            <div className="text-lg font-bold text-amber-700 font-mono-custom tracking-tight">
              {syncStats.favorites} <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Lượt tham khảo học tập</div>
            <div className="text-lg font-bold text-indigo-700 font-mono-custom tracking-tight">
              {experiences.reduce((acc, c) => acc + (c.viewCount || 0), 0)}{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">lượt</span>
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
        selectedSyncFilter={selectedSyncFilter}
        setSelectedSyncFilter={setSelectedSyncFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetToSample={handleResetToSample}
        onEditCase={openEditModal}
        onToggleFavorite={handleToggleFavorite}
        onDeleteCase={handleDeleteCase}
      />

      {/* 4. Selected Case 4-Column SOAP Matrix Board */}
      {currentCase && (
        <SoapDetailView
          currentCase={currentCase}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onEditCase={openEditModal}
          onOpenVaultDrawer={onOpenVaultDrawer}
        />
      )}

      {/* 5. Create / Edit Case Modal */}
      <SoapEditorForm
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        editingCase={editingCase}
        onSave={handleSaveModal}
      />
    </div>
  );
};
