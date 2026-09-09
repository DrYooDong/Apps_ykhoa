import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Cloud,
  CloudOff,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck,
  FilePlus,
  FileText,
  Filter,
  HardDrive,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Pill,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Search,
  Share2,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Star,
  Stethoscope,
  Syringe,
  Tag,
  Trash2,
  TrendingUp,
  User,
  X,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience, SoapPlanMedication } from '../types.ts';
import {
  EXPERIENCE_LEVEL_LABELS,
  SAMPLE_SOAP_EXPERIENCES,
  SOAP_SPECIALTIES,
} from '../data/soapSeedData.ts';
import {
  getLocalSoapExperiences,
  getSoapSyncStats,
  soapCreate,
  soapDelete,
  soapExportAll,
  soapGetAll,
  soapImportBulk,
  soapIncrementViewCount,
  soapPullFromSupabase,
  soapSyncToSupabase,
  soapToggleFavorite,
  soapUpdate,
} from '../lib/soapApi.ts';
import { isSupabaseConfigured } from '../lib/supabase.ts';
import { exportSoapCaseToMarkdown } from '../lib/vaultBridge.ts';

interface SoapBoardProps {
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onNavigateToAnalysis?: () => void;
  onNavigateToProtocol?: (diseaseId?: string) => void;
}

export const SoapExperienceBoard: React.FC<SoapBoardProps> = ({
  onOpenVaultDrawer,
  onNavigateToAnalysis,
  onNavigateToProtocol,
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
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'general' | 's' | 'o' | 'a' | 'p'>('general');
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
  const handleToggleFavorite = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const updated = await soapToggleFavorite(id);
      setExperiences((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setSyncStats(getSoapSyncStats());
    } catch (err) {
      console.error(err);
    }
  };

  // Delete case
  const handleDeleteCase = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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

  // ----------------------------------------------------------------------
  // State for Create / Edit Case Modal
  // ----------------------------------------------------------------------
  const [newTitle, setNewTitle] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('Tim mạch');
  const [newLevel, setNewLevel] = useState<SoapClinicalExperience['experienceLevel']>('essential');
  const [newDemographic, setNewDemographic] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newDoctor, setNewDoctor] = useState('');
  const [newSourceReference, setNewSourceReference] = useState('');
  const [newClinicalContext, setNewClinicalContext] = useState('Khoa Cấp cứu');
  const [newDifficultyRating, setNewDifficultyRating] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [newOutcomeNotes, setNewOutcomeNotes] = useState('');

  const [newChiefComplaint, setNewChiefComplaint] = useState('');
  const [newHpi, setNewHpi] = useState('');
  const [newPmh, setNewPmh] = useState('');
  const [newHistoryPearls, setNewHistoryPearls] = useState('');

  const [newTemp, setNewTemp] = useState('37.0');
  const [newPulse, setNewPulse] = useState('80');
  const [newBp, setNewBp] = useState('120/80');
  const [newResp, setNewResp] = useState('18');
  const [newSpo2, setNewSpo2] = useState('98');
  const [newBmi, setNewBmi] = useState('22.0');
  const [newPhysical, setNewPhysical] = useState('');
  const [newLabs, setNewLabs] = useState('');
  const [newObjPitfalls, setNewObjPitfalls] = useState('');

  const [newDx, setNewDx] = useState('');
  const [newIcd, setNewIcd] = useState('');
  const [newDiffs, setNewDiffs] = useState('');
  const [newRisk, setNewRisk] = useState('');
  const [newDxPearls, setNewDxPearls] = useState('');

  const [newImmediate, setNewImmediate] = useState('');
  const [newMedsText, setNewMedsText] = useState('');
  const [newMonitoring, setNewMonitoring] = useState('');
  const [newLessons, setNewLessons] = useState('');

  // Open Modal in Create Mode
  const openCreateModal = () => {
    setEditingCaseId(null);
    setNewTitle('');
    setNewSpecialty('Tim mạch');
    setNewLevel('essential');
    setNewDemographic('');
    setNewTags('');
    setNewDoctor('');
    setNewSourceReference('');
    setNewClinicalContext('Khoa Cấp cứu');
    setNewDifficultyRating(3);
    setNewOutcomeNotes('');
    setNewChiefComplaint('');
    setNewHpi('');
    setNewPmh('');
    setNewHistoryPearls('');
    setNewTemp('37.0');
    setNewPulse('80');
    setNewBp('120/80');
    setNewResp('18');
    setNewSpo2('98');
    setNewBmi('22.0');
    setNewPhysical('');
    setNewLabs('');
    setNewObjPitfalls('');
    setNewDx('');
    setNewIcd('');
    setNewDiffs('');
    setNewRisk('');
    setNewDxPearls('');
    setNewImmediate('');
    setNewMedsText('');
    setNewMonitoring('');
    setNewLessons('');
    setModalActiveTab('general');
    setIsNewModalOpen(true);
  };

  // Open Modal in Edit Mode
  const openEditModal = (c: SoapClinicalExperience, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingCaseId(c.id);
    setNewTitle(c.title);
    setNewSpecialty(c.specialty);
    setNewLevel(c.experienceLevel);
    setNewDemographic(c.demographicContext);
    setNewTags(c.tags.join(', '));
    setNewDoctor(c.authorDoctor || '');
    setNewSourceReference(c.sourceReference || '');
    setNewClinicalContext(c.clinicalContext || 'Khoa Cấp cứu');
    setNewDifficultyRating(c.difficultyRating || 3);
    setNewOutcomeNotes(c.outcomeNotes || '');

    setNewChiefComplaint(c.s.chiefComplaint);
    setNewHpi(c.s.historyOfPresentIllness);
    setNewPmh(c.s.pastMedicalHistory);
    setNewHistoryPearls(c.s.historyPearls);

    setNewTemp(c.o.vitals.temp || '37.0');
    setNewPulse(c.o.vitals.pulse || '80');
    setNewBp(c.o.vitals.bp || '120/80');
    setNewResp(c.o.vitals.resp || '18');
    setNewSpo2(c.o.vitals.spo2 || '98');
    setNewBmi(c.o.vitals.bmi || '22.0');
    setNewPhysical(c.o.physicalExam);
    setNewLabs(c.o.labsAndImaging);
    setNewObjPitfalls(c.o.objectivePitfalls);

    setNewDx(c.a.primaryDiagnosis);
    setNewIcd(c.a.icd10);
    setNewDiffs(c.a.differentials.join('; '));
    setNewRisk(c.a.riskStratification);
    setNewDxPearls(c.a.diagnosticPearls);

    setNewImmediate(c.p.immediateActions);
    setNewMedsText(
      c.p.medications.map((m) => `${m.drug} - ${m.dose} - ${m.route} - ${m.note}`).join('\n')
    );
    setNewMonitoring(c.p.monitoringAndTargets);
    setNewLessons(c.p.takeawayLessons);

    setModalActiveTab('general');
    setIsNewModalOpen(true);
  };

  // Handle Save (Create or Update)
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Vui lòng nhập Tiêu đề ca kinh nghiệm lâm sàng.');
      return;
    }

    // Parse medications
    const meds: SoapPlanMedication[] = newMedsText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(' - ');
        return {
          drug: parts[0] || line,
          dose: parts[1] || 'Theo chỉ định',
          route: parts[2] || 'Uống',
          note: parts[3] || '',
        };
      });

    const caseData = {
      title: newTitle.trim(),
      specialty: newSpecialty,
      experienceLevel: newLevel,
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      demographicContext: newDemographic.trim() || 'Bối cảnh ca lâm sàng thực tế',
      authorDoctor: newDoctor.trim() || 'Bác sĩ lâm sàng',
      sourceReference: newSourceReference.trim() || undefined,
      clinicalContext: newClinicalContext.trim() || 'Khoa Cấp cứu',
      difficultyRating: newDifficultyRating,
      outcomeNotes: newOutcomeNotes.trim() || undefined,
      s: {
        chiefComplaint: newChiefComplaint.trim() || 'Than phiền chính chưa ghi nhận',
        historyOfPresentIllness: newHpi.trim() || 'Bệnh sử chưa ghi nhận',
        pastMedicalHistory: newPmh.trim() || 'Chưa ghi nhận tiền căn đặc biệt',
        symptomsList: [newChiefComplaint.slice(0, 40)].filter(Boolean),
        historyPearls: newHistoryPearls.trim() || 'Khai thác kỹ thời điểm và tính chất triệu chứng',
      },
      o: {
        vitals: {
          temp: newTemp,
          pulse: newPulse,
          bp: newBp,
          resp: newResp,
          spo2: newSpo2,
          bmi: newBmi,
        },
        physicalExam: newPhysical.trim() || 'Khám thực thể chưa ghi nhận bất thường lớn',
        labsAndImaging: newLabs.trim() || 'Các xét nghiệm cơ bản trong giới hạn bình thường',
        objectivePitfalls: newObjPitfalls.trim() || 'Lưu ý kiểm tra lại các chỉ số cận lâm sàng',
      },
      a: {
        primaryDiagnosis: newDx.trim() || 'Chẩn đoán sơ bộ theo dõi',
        icd10: newIcd.trim() || 'R69',
        differentials: newDiffs
          .split(';')
          .map((d) => d.trim())
          .filter(Boolean),
        riskStratification: newRisk.trim() || 'Nguy cơ mức độ trung bình',
        diagnosticPearls: newDxPearls.trim() || 'Đúc kết lâm sàng cần theo dõi sát',
      },
      p: {
        immediateActions: newImmediate.trim() || 'Bệnh nhân nghỉ ngơi, theo dõi sinh hiệu',
        medications:
          meds.length > 0
            ? meds
            : [{ drug: 'Natri Clorid 0.9%', dose: '500ml', route: 'Truyền TM', note: 'Duy trì đường truyền' }],
        monitoringAndTargets: newMonitoring.trim() || 'Theo dõi sinh hiệu mỗi 4-6 giờ',
        consultationOrReferral: 'Hội chẩn chuyên khoa nếu triệu chứng không thuyên giảm',
        takeawayLessons: newLessons.trim() || 'Bài học lâm sàng cần ghi nhớ trong thực hành',
      },
    };

    if (editingCaseId) {
      // Update existing case
      await soapUpdate(editingCaseId, caseData);
      refreshExperiences();
      setSelectedCaseId(editingCaseId);
    } else {
      // Create new case
      const created = await soapCreate(caseData);
      refreshExperiences();
      setSelectedCaseId(created.id);
    }

    setIsNewModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 animate-fadeIn">
      {/* 1. Header Banner: Sổ Tay Kinh Nghiệm Lâm Sàng Chuẩn SOAP */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
        {/* Subtle decorative top accent bar */}
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
          {/* Cloud Sync Button */}
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
            title="Xuất file JSON sao lưu danh mục kinh nghiệm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            type="button"
            onClick={handleExportVaultMarkdown}
            className="flex items-center gap-1.5 px-3 h-9 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer no-print shadow-xs"
            title="Lưu ca bệnh này thành file Markdown chuẩn Obsidian (.md) cho Knowledge Vault"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-200" />
            <span className="hidden lg:inline">Lưu vào Vault</span>
          </button>
        </div>
      </div>

      {/* Sync Feedback Toast Alert */}
      {syncFeedback && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{syncFeedback}</span>
          </div>
          <button
            onClick={() => setSyncFeedback(null)}
            className="text-slate-400 hover:text-slate-700 ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Quick Stats Banner (Bento-style 4 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11.5px] font-medium text-slate-500">Tổng ca lưu trữ</div>
            <div className="text-lg font-bold text-slate-900 font-mono-custom tracking-tight">
              {experiences.length}{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
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
              {syncStats.favorites}{' '}
              <span className="text-xs font-normal text-slate-400 font-sans">ca</span>
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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col gap-3">
        {/* Row 1: Specialty Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span>Chuyên khoa:</span>
            </span>

            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar flex-1">
              {SOAP_SPECIALTIES.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Search Input */}
            <div className="relative w-52 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Tìm bệnh, ICD, thuốc, triệu chứng..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500 text-slate-800 placeholder:text-slate-400 transition-colors"
              />
              {searchKeyword && (
                <button
                  onClick={() => setSearchKeyword('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={handleResetToSample}
              className="flex items-center gap-1 text-[11.5px] text-slate-500 hover:text-blue-600 font-medium transition-colors cursor-pointer shrink-0 ml-1"
              title="Khôi phục lại toàn bộ ca mẫu chuẩn"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Nạp lại ca mẫu</span>
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Filters & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Level Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-500">Cấp độ:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="all">Tất cả cấp độ</option>
                <option value="essential">Ca kinh điển</option>
                <option value="pitfall">Bẫy lâm sàng</option>
                <option value="rare">Tình huống hiếm</option>
                <option value="advanced">Chuyên sâu EBM</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-500">Độ khó:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(Number(e.target.value))}
                className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value={0}>Tất cả độ khó</option>
                <option value={1}>1 Sao (Đơn giản)</option>
                <option value={2}>2 Sao (Cơ bản)</option>
                <option value={3}>3 Sao (Trung bình)</option>
                <option value={4}>4 Sao (Phức tạp)</option>
                <option value={5}>5 Sao (Cực khó)</option>
              </select>
            </div>

            {/* Sync Filter */}
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-slate-500">Lưu trữ:</span>
              <select
                value={selectedSyncFilter}
                onChange={(e) => setSelectedSyncFilter(e.target.value as any)}
                className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="all">Tất cả nguồn</option>
                <option value="synced">Đã đồng bộ Cloud</option>
                <option value="local">Chỉ lưu Local</option>
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-500">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              <option value="newest">Mới cập nhật nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="views">Nhiều lượt xem nhất</option>
              <option value="favorite">Ưu tiên Yêu thích</option>
            </select>
          </div>
        </div>

        {/* Case Cards Horizontal Scroll Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {filteredCases.map((c) => {
            const isSelected = c.id === currentCase.id;
            const levelInfo = EXPERIENCE_LEVEL_LABELS[c.experienceLevel];

            return (
              <div
                key={c.id}
                onClick={() => handleSelectCase(c.id)}
                className={`min-w-[285px] max-w-[330px] p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between shrink-0 shadow-2xs ${
                  isSelected
                    ? 'bg-blue-50/40 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${levelInfo.bg} ${levelInfo.text} border ${levelInfo.border}`}
                    >
                      {levelInfo.label}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      {/* Sync Status Badge */}
                      {c.syncStatus === 'synced' ? (
                        <span
                          className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80"
                          title="Đã đồng bộ với Supabase Cloud"
                        >
                          <Cloud className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Cloud</span>
                        </span>
                      ) : (
                        <span
                          className="flex items-center gap-0.5 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80"
                          title="Lưu trữ tại Local, chưa đẩy lên Cloud"
                        >
                          <HardDrive className="w-2.5 h-2.5 text-amber-600" />
                          <span>Local</span>
                        </span>
                      )}

                      <span className="font-mono-custom text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {c.a.icd10.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 italic">
                    {c.demographicContext}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                      {c.specialty}
                    </span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <Eye className="w-3 h-3" />
                      <span>{c.viewCount || 0}</span>
                    </span>
                  </div>

                  {/* Actions: Edit, Favorite, Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => openEditModal(c, e)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer rounded hover:bg-slate-100"
                      title="Chỉnh sửa ca này"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(c.id, e)}
                      className={`p-1 transition-colors cursor-pointer rounded hover:bg-slate-100 ${
                        c.isFavorite ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                      }`}
                      title={c.isFavorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'}
                    >
                      <Star className={`w-3 h-3 ${c.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteCase(c.id, e)}
                      className="p-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer rounded hover:bg-slate-100"
                      title="Xóa ca này"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Selected Case Summary Header Card */}
      {currentCase && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-4xl flex-1">
            {/* Primary Category Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                  EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].bg
                } ${EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].text} border ${
                  EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].border
                }`}
              >
                {EXPERIENCE_LEVEL_LABELS[currentCase.experienceLevel].label}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-mono-custom text-xs font-bold rounded-md border border-slate-200">
                ICD-10: {currentCase.a.icd10}
              </span>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-200/70">
                {currentCase.specialty}
              </span>
              {currentCase.clinicalContext && (
                <span className="px-2.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium rounded-md flex items-center gap-1">
                  <span>🏥</span>
                  <span>{currentCase.clinicalContext}</span>
                </span>
              )}
              {currentCase.difficultyRating && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                  <span>{'★'.repeat(currentCase.difficultyRating)}</span>
                  <span className="text-[10.5px] text-amber-600 font-mono-custom">({currentCase.difficultyRating}/5)</span>
                </span>
              )}
              {currentCase.isFavorite && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current text-amber-500" />
                  <span>Yêu thích</span>
                </span>
              )}
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {currentCase.title}
            </h2>

            {/* Context & Meta Bar */}
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2.5 px-3 text-xs text-slate-600 flex items-center gap-2.5 flex-wrap">
              <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                {currentCase.demographicContext}
              </span>
              <span className="text-slate-300">·</span>
              <span>
                Đúc kết bởi: <b className="text-slate-800">{currentCase.authorDoctor || 'Bác sĩ lâm sàng'}</b>
              </span>
              <span className="text-slate-300">·</span>
              <span>Ngày lưu: <span className="font-mono-custom">{currentCase.createdAt}</span></span>
              {currentCase.sourceReference && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-blue-700 italic">
                    Nguồn: {currentCase.sourceReference}
                  </span>
                </>
              )}
            </div>

            {/* Tags & Outcome */}
            <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
              {currentCase.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-white text-slate-600 border border-slate-200 rounded-md text-[11px] font-medium hover:border-slate-300 transition-colors"
                >
                  #{t}
                </span>
              ))}

              {currentCase.outcomeNotes && (
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Kết cục: {currentCase.outcomeNotes}</span>
                </span>
              )}
            </div>
          </div>

          {/* Quick Jump & Tool Shortcuts */}
          <div className="flex flex-col items-end gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {/* Edit Selected Case Button */}
              <button
                type="button"
                onClick={() => openEditModal(currentCase)}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Chỉnh sửa chi tiết ca kinh nghiệm SOAP này"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span>Sửa ca này</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Mở 19 công cụ và thang điểm lâm sàng trong Kho CC"
              >
                <span>🧮</span>
                <span>Kho Công cụ (19)</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'ICD10')}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Mở Cẩm nang ICD-10 và Bẫy lỗi BHYT trong Kho ICD10"
              >
                <span>🏷️</span>
                <span>Kho ICD-10 (11)</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                title="Mở Hệ thống hỗ trợ ra quyết định lâm sàng trong Kho CDSS"
              >
                <span>⚡</span>
                <span>Kho CDSS (3)</span>
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 border border-slate-200/90 rounded-xl p-1 bg-slate-100/80 text-xs no-print shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('board')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'board'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bảng 4 Cột (SOAP)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('focus-s')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'focus-s'
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cột S
              </button>
              <button
                type="button"
                onClick={() => setViewMode('focus-o')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'focus-o'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cột O
              </button>
              <button
                type="button"
                onClick={() => setViewMode('focus-a')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'focus-a'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cột A
              </button>
              <button
                type="button"
                onClick={() => setViewMode('focus-p')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'focus-p'
                    ? 'bg-white text-teal-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cột P
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. THE 4-COLUMN SOAP MATRIX BOARD (BẢNG 4 CỘT CHIA THEO S - O - A - P) */}
      {currentCase && (
        <div
          className={`grid gap-4 ${
            viewMode === 'board' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'
          }`}
        >
          {/* ========================================================================= */}
          {/* CỘT S: SUBJECTIVE — CHỦ QUAN & KHAI THÁC BỆNH SỬ                          */}
          {/* ========================================================================= */}
          {(viewMode === 'board' || viewMode === 'focus-s') && (
            <div className="bg-white border border-sky-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-sky-300 transition-colors">
              {/* Column S Header */}
              <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                    S
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                      SUBJECTIVE
                    </h3>
                    <p className="text-[10.5px] text-sky-100">
                      Chủ quan · Bệnh sử & Khai thác
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sky-800/60 text-sky-100 text-[10px] font-mono-custom font-semibold border border-sky-400/30">
                  Lắng nghe
                </span>
              </div>

              {/* Column S Body Content */}
              <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
                {/* 1. Than phiền chính */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    1. Than phiền chính (Chief Complaint):
                  </span>
                  <div className="p-3 bg-sky-50/80 border border-sky-200/80 rounded-xl font-medium text-sky-950 leading-relaxed shadow-2xs">
                    "{currentCase.s.chiefComplaint}"
                  </div>
                </div>

                {/* 2. Bệnh sử PQRST */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    2. Diễn tiến bệnh sử (PQRST):
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.s.historyOfPresentIllness}
                  </p>
                </div>

                {/* 3. Tiền căn & Dược sử */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    3. Tiền căn & Thuốc đang dùng (PMH):
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.s.pastMedicalHistory}
                  </p>
                </div>

                {/* 4. Triệu chứng cơ năng ghi nhận */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    4. Triệu chứng cơ năng ghi nhận:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCase.s.symptomsList.map((sym, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium text-[11px]"
                      >
                        • {sym}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Dấu ấn khai thác bệnh sử (History Pearls) */}
                <div className="mt-auto pt-2">
                  <div className="p-3.5 bg-sky-50/80 border-l-4 border-l-sky-500 border border-sky-200/80 rounded-r-xl text-sky-950 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-sky-900 mb-1.5">
                      <Lightbulb className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>DẤU ẤN HỎI BỆNH (HISTORY PEARL)</span>
                    </div>
                    <p className="text-xs text-sky-900/90 leading-relaxed italic">
                      {currentCase.s.historyPearls}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CỘT O: OBJECTIVE — KHÁCH QUAN & KHÁM THỰC THỂ / CẬN LÂM SÀNG              */}
          {/* ========================================================================= */}
          {(viewMode === 'board' || viewMode === 'focus-o') && (
            <div className="bg-white border border-indigo-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-indigo-300 transition-colors">
              {/* Column O Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                    O
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                      OBJECTIVE
                    </h3>
                    <p className="text-[10.5px] text-indigo-100">
                      Khách quan · Khám & Cận lâm sàng
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-indigo-800/60 text-indigo-100 text-[10px] font-mono-custom font-semibold border border-indigo-400/30">
                  Đo lường
                </span>
              </div>

              {/* Column O Body Content */}
              <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
                {/* 1. Dấu hiệu sinh tồn (Vitals Grid) */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-600" />
                    1. Dấu hiệu sinh tồn (Vitals):
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 font-mono-custom text-center">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">Nhiệt độ</span>
                      <b className="text-xs text-slate-900">{currentCase.o.vitals.temp || '—'}°C</b>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">Mạch</span>
                      <b className="text-xs text-slate-900">{currentCase.o.vitals.pulse || '—'} l/p</b>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">Huyết áp</span>
                      <b className="text-xs text-rose-700">{currentCase.o.vitals.bp || '—'}</b>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">Nhịp thở</span>
                      <b className="text-xs text-slate-900">{currentCase.o.vitals.resp || '—'} l/p</b>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">SpO₂</span>
                      <b className="text-xs text-emerald-700">{currentCase.o.vitals.spo2 || '—'}%</b>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2">
                      <span className="block text-[9.5px] text-slate-500 font-sans">BMI</span>
                      <b className="text-xs text-slate-900">{currentCase.o.vitals.bmi || '—'}</b>
                    </div>
                  </div>
                </div>

                {/* 2. Khám thực thể trọng tâm */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                    2. Khám thực thể định hướng:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.o.physicalExam}
                  </p>
                </div>

                {/* 3. Cận lâm sàng then chốt */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                    3. Cận lâm sàng & Xét nghiệm định lượng:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80 font-mono-custom text-[11px]">
                    {currentCase.o.labsAndImaging}
                  </p>
                </div>

                {/* 4. Bẫy cận lâm sàng (Objective Pitfalls) */}
                <div className="mt-auto pt-2">
                  <div className="p-3.5 bg-rose-50/80 border-l-4 border-l-rose-500 border border-rose-200/80 rounded-r-xl text-rose-950 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-rose-900 mb-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>BẪY CẬN LÂM SÀNG (OBJECTIVE PITFALL)</span>
                    </div>
                    <p className="text-xs text-rose-900/90 leading-relaxed italic">
                      {currentCase.o.objectivePitfalls}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CỘT A: ASSESSMENT — ĐÁNH GIÁ & CHẨN ĐOÁN / BIỆN LUẬN LÂM SÀNG             */}
          {/* ========================================================================= */}
          {(viewMode === 'board' || viewMode === 'focus-a') && (
            <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-amber-300 transition-colors">
              {/* Column A Header */}
              <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                    A
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider">
                      ASSESSMENT
                    </h3>
                    <p className="text-[10.5px] text-amber-100">
                      Đánh giá · Chẩn đoán & Biện luận
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-800/60 text-amber-100 text-[10px] font-mono-custom font-semibold border border-amber-400/30">
                  Tư duy
                </span>
              </div>

              {/* Column A Body Content */}
              <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
                {/* 1. Chẩn đoán xác định */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    1. Chẩn đoán sơ bộ / Xác định:
                  </span>
                  <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-xl shadow-2xs">
                    <div className="font-bold text-xs text-amber-950 leading-snug">
                      {currentCase.a.primaryDiagnosis}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono-custom text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                        ICD-10: {currentCase.a.icd10}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Chẩn đoán phân biệt */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    2. Chẩn đoán phân biệt cần loại trừ:
                  </span>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.a.differentials.map((diff, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                        <span className="text-amber-600 font-bold">≠</span>
                        <span>{diff}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Phân tầng nguy cơ */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    3. Phân tầng nguy cơ & Thang điểm:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.a.riskStratification}
                  </p>
                </div>

                {/* 4. Đúc kết biện luận chẩn đoán (Diagnostic Pearls) */}
                <div className="mt-auto pt-2">
                  <div className="p-3.5 bg-amber-50/80 border-l-4 border-l-amber-500 border border-amber-200/80 rounded-r-xl text-amber-950 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-amber-900 mb-1.5">
                      <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>ĐÚC KẾT BIỆN LUẬN (DIAGNOSTIC PEARL)</span>
                    </div>
                    <p className="text-xs text-amber-900/90 leading-relaxed italic">
                      {currentCase.a.diagnosticPearls}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CỘT P: PLAN — KẾ HOẠCH & ĐIỀU TRỊ / THEO DÕI                              */}
          {/* ========================================================================= */}
          {(viewMode === 'board' || viewMode === 'focus-p') && (
            <div className="bg-white border border-teal-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-teal-300 transition-colors">
              {/* Column P Header */}
              <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
                    P
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider">PLAN</h3>
                    <p className="text-[10.5px] text-teal-100">
                      Kế hoạch · Xử trí, Thuốc & Bài học
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-800/60 text-teal-100 text-[10px] font-mono-custom font-semibold border border-teal-400/30">
                  Hành động
                </span>
              </div>

              {/* Column P Body Content */}
              <div className="p-4 flex-1 flex flex-col gap-3.5 text-xs text-slate-800 bg-white">
                {/* 1. Xử trí cấp cứu ban đầu */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    1. Xử trí cấp cứu & Ban đầu:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-teal-50/60 p-3 rounded-xl border border-teal-200/80">
                    {currentCase.p.immediateActions}
                  </p>
                </div>

                {/* 2. Y lệnh thuốc chi tiết */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    2. Y lệnh thuốc cụ thể:
                  </span>
                  <div className="space-y-1.5">
                    {currentCase.p.medications.map((med, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col gap-0.5"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{med.drug}</span>
                          <span className="font-mono-custom text-[11px] text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                            {med.dose}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-slate-500 flex items-center justify-between mt-0.5">
                          <span>Đường dùng: <b className="text-slate-700">{med.route}</b></span>
                          {med.note && <span className="italic text-slate-600">{med.note}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Chỉ tiêu theo dõi */}
                <div>
                  <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    3. Theo dõi & Mục tiêu lâm sàng:
                  </span>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    {currentCase.p.monitoringAndTargets}
                  </p>
                </div>

                {/* 4. Bài học kinh nghiệm điều trị cốt lõi */}
                <div className="mt-auto pt-2">
                  <div className="p-3.5 bg-teal-50/80 border-l-4 border-l-teal-600 border border-teal-200/80 rounded-r-xl text-teal-950 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-teal-900 mb-1.5">
                      <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ (TAKEAWAY)</span>
                    </div>
                    <p className="text-xs text-teal-900/90 leading-relaxed italic">
                      {currentCase.p.takeawayLessons}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. MODAL: CREATE & EDIT SOAP CLINICAL EXPERIENCE */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-white border-b border-slate-200/90 p-4 sm:p-5 px-6 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <FilePlus className="w-5 h-5 text-blue-600" />
                  <span>
                    {editingCaseId
                      ? 'Chỉnh Sửa Ca Kinh Nghiệm SOAP'
                      : 'Thêm Ca Kinh Nghiệm Lâm Sàng Mới'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đúc kết kinh nghiệm lâm sàng chuẩn 4 cột SOAP (Tuyệt đối không lưu tên, CCCD hay danh tính cá nhân).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Step Tabs for fast navigation */}
            <div className="flex items-center gap-1 border-b border-slate-200/80 px-6 py-2.5 bg-slate-50 text-xs overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setModalActiveTab('general')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'general'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                1. Thông tin chung
              </button>
              <button
                type="button"
                onClick={() => setModalActiveTab('s')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 's'
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                2. S (Chủ quan)
              </button>
              <button
                type="button"
                onClick={() => setModalActiveTab('o')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'o'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                3. O (Khách quan)
              </button>
              <button
                type="button"
                onClick={() => setModalActiveTab('a')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'a'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                4. A (Đánh giá)
              </button>
              <button
                type="button"
                onClick={() => setModalActiveTab('p')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  modalActiveTab === 'p'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                5. P (Kế hoạch)
              </button>
            </div>

            {/* Modal Body Form */}
            <form
              onSubmit={handleSaveModal}
              className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800"
            >
              {/* TAB 1: THÔNG TIN CHUNG */}
              {modalActiveTab === 'general' && (
                <div className="space-y-3.5 animate-fadeIn">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tiêu đề ca kinh nghiệm lâm sàng *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="VD: Hội chứng vành cấp không ST chênh lên ở BN đái tháo đường cao tuổi..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 focus:bg-white text-slate-900 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Chuyên khoa</label>
                      <select
                        value={newSpecialty}
                        onChange={(e) => setNewSpecialty(e.target.value)}
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                      >
                        {SOAP_SPECIALTIES.filter((s) => s !== 'Tất cả chuyên khoa').map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cấp độ ca bệnh</label>
                      <select
                        value={newLevel}
                        onChange={(e) => setNewLevel(e.target.value as any)}
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                      >
                        <option value="essential">Ca kinh điển</option>
                        <option value="pitfall">Bẫy lâm sàng</option>
                        <option value="rare">Tình huống hiếm</option>
                        <option value="advanced">Chuyên sâu EBM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Độ khó ca bệnh</label>
                      <select
                        value={newDifficultyRating}
                        onChange={(e) => setNewDifficultyRating(Number(e.target.value) as any)}
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                      >
                        <option value={1}>★☆☆☆☆ (1 Sao - Đơn giản)</option>
                        <option value={2}>★★☆☆☆ (2 Sao - Cơ bản)</option>
                        <option value={3}>★★★☆☆ (3 Sao - Trung bình)</option>
                        <option value={4}>★★★★☆ (4 Sao - Phức tạp)</option>
                        <option value={5}>★★★★★ (5 Sao - Rất khó)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Khoa phòng lâm sàng
                      </label>
                      <input
                        type="text"
                        value={newClinicalContext}
                        onChange={(e) => setNewClinicalContext(e.target.value)}
                        placeholder="VD: Khoa Cấp cứu, ICU, Phòng khám Ngoại trú..."
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Bác sĩ / Giảng viên đúc kết
                      </label>
                      <input
                        type="text"
                        value={newDoctor}
                        onChange={(e) => setNewDoctor(e.target.value)}
                        placeholder="VD: BS. CK2 Tim mạch can thiệp"
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Bối cảnh cơ địa lâm sàng (Không lưu tên người bệnh)
                    </label>
                    <input
                      type="text"
                      value={newDemographic}
                      onChange={(e) => setNewDemographic(e.target.value)}
                      placeholder="VD: Bệnh nhân 68 tuổi, thể trạng thừa cân, tiền căn ĐTĐ type 2 điều trị 12 năm"
                      className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Nguồn tài liệu tham khảo / Guideline
                      </label>
                      <input
                        type="text"
                        value={newSourceReference}
                        onChange={(e) => setNewSourceReference(e.target.value)}
                        placeholder="VD: Khuyến cáo ESC 2024 về ACS & Phác đồ Bộ Y tế"
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Từ khóa tìm kiếm (ngăn cách bởi dấu phẩy ,)
                      </label>
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="VD: NSTEMI, Đái tháo đường, Troponin hs, Bẫy lâm sàng"
                        className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('s')}
                      className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-md flex items-center gap-1 cursor-pointer"
                    >
                      <span>Tiếp tục: Cột S</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: CỘT S (CHỦ QUAN) */}
              {modalActiveTab === 's' && (
                <div className="border border-cyan-300 rounded-xl p-4 bg-cyan-50/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-cyan-900 text-sm">
                    <span className="w-5 h-5 rounded bg-cyan-600 text-white flex items-center justify-center text-xs">
                      S
                    </span>
                    <span>CỘT S — SUBJECTIVE (Chủ quan & Khai thác bệnh sử)</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Lý do tiếp nhận / Than phiền chính (Chief Complaint) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={newChiefComplaint}
                      onChange={(e) => setNewChiefComplaint(e.target.value)}
                      placeholder="Mô tả than phiền chính của bệnh nhân hoặc lý do người nhà đưa đến..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Bệnh sử chi tiết (PQRST)
                    </label>
                    <textarea
                      rows={3}
                      value={newHpi}
                      onChange={(e) => setNewHpi(e.target.value)}
                      placeholder="Vị trí, hoàn cảnh khởi phát, tính chất, hướng lan, mức độ, yếu tố tăng/giảm..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Tiền căn bệnh lý & Dược sử liên quan (PMH)
                    </label>
                    <textarea
                      rows={2}
                      value={newPmh}
                      onChange={(e) => setNewPmh(e.target.value)}
                      placeholder="Bệnh mạn tính, tiền sử dùng thuốc, dị ứng, thuốc tự mua..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-cyan-900 mb-1">
                      💎 Kinh nghiệm hỏi bệnh & Câu hỏi then chốt (History Pearl)
                    </label>
                    <textarea
                      rows={2}
                      value={newHistoryPearls}
                      onChange={(e) => setNewHistoryPearls(e.target.value)}
                      placeholder="Những bẫy trong khai thác triệu chứng, câu hỏi vàng không được bỏ sót..."
                      className="w-full border border-cyan-300 rounded-md p-2 bg-white text-cyan-950 font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('general')}
                      className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('o')}
                      className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                    >
                      <span>Tiếp tục: Cột O</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: CỘT O (KHÁCH QUAN) */}
              {modalActiveTab === 'o' && (
                <div className="border border-blue-300 rounded-xl p-4 bg-blue-50/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                    <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-xs">
                      O
                    </span>
                    <span>CỘT O — OBJECTIVE (Khách quan & Cận lâm sàng)</span>
                  </div>

                  {/* Vitals */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        T° (°C)
                      </label>
                      <input
                        type="text"
                        value={newTemp}
                        onChange={(e) => setNewTemp(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Mạch (l/p)
                      </label>
                      <input
                        type="text"
                        value={newPulse}
                        onChange={(e) => setNewPulse(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Huyết áp
                      </label>
                      <input
                        type="text"
                        value={newBp}
                        onChange={(e) => setNewBp(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Nhịp thở
                      </label>
                      <input
                        type="text"
                        value={newResp}
                        onChange={(e) => setNewResp(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        SpO₂ (%)
                      </label>
                      <input
                        type="text"
                        value={newSpo2}
                        onChange={(e) => setNewSpo2(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        BMI
                      </label>
                      <input
                        type="text"
                        value={newBmi}
                        onChange={(e) => setNewBmi(e.target.value)}
                        className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Khám thực thể trọng tâm
                    </label>
                    <textarea
                      rows={2}
                      value={newPhysical}
                      onChange={(e) => setNewPhysical(e.target.value)}
                      placeholder="Khám tim, phổi, bụng, thần kinh, các dấu chứng thực thể định khu..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Cận lâm sàng then chốt (ECG, X-quang, Xét nghiệm máu, CT...)
                    </label>
                    <textarea
                      rows={2}
                      value={newLabs}
                      onChange={(e) => setNewLabs(e.target.value)}
                      placeholder="Kết quả xét nghiệm định lượng có giá trị xác chẩn hoặc loại trừ..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-rose-800 mb-1">
                      ⚠️ Bẫy dấu chứng & Cận lâm sàng (Objective Pitfall)
                    </label>
                    <textarea
                      rows={2}
                      value={newObjPitfalls}
                      onChange={(e) => setNewObjPitfalls(e.target.value)}
                      placeholder="Dấu hiệu dễ bỏ sót, âm tính giả, dương tính giả..."
                      className="w-full border border-rose-300 rounded-md p-2 bg-white text-rose-950 font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('s')}
                      className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('a')}
                      className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                    >
                      <span>Tiếp tục: Cột A</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: CỘT A (ĐÁNH GIÁ) */}
              {modalActiveTab === 'a' && (
                <div className="border border-amber-300 rounded-xl p-4 bg-amber-50/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                    <span className="w-5 h-5 rounded bg-amber-600 text-white flex items-center justify-center text-xs">
                      A
                    </span>
                    <span>CỘT A — ASSESSMENT (Đánh giá & Biện luận)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">
                        Chẩn đoán xác định *
                      </label>
                      <input
                        type="text"
                        required
                        value={newDx}
                        onChange={(e) => setNewDx(e.target.value)}
                        placeholder="VD: Nhồi máu cơ tim cấp không ST chênh lên (NSTEMI)"
                        className="w-full border border-slate-300 rounded-md p-2 bg-white font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mã ICD-10</label>
                      <input
                        type="text"
                        value={newIcd}
                        onChange={(e) => setNewIcd(e.target.value)}
                        placeholder="VD: I21.4"
                        className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Chẩn đoán phân biệt (ngăn cách bởi dấu chấm phẩy ;)
                    </label>
                    <input
                      type="text"
                      value={newDiffs}
                      onChange={(e) => setNewDiffs(e.target.value)}
                      placeholder="VD: Bóc tách ĐMC ngực; Thuyên tắc phổi; Viêm cơ tim"
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phân tầng nguy cơ & Thang điểm lượng giá
                    </label>
                    <input
                      type="text"
                      value={newRisk}
                      onChange={(e) => setNewRisk(e.target.value)}
                      placeholder="VD: GRACE > 140 điểm, Killip I, TIMI 4 điểm..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-amber-900 mb-1">
                      🧠 Đúc kết biện luận chẩn đoán (Diagnostic Pearl)
                    </label>
                    <textarea
                      rows={2}
                      value={newDxPearls}
                      onChange={(e) => setNewDxPearls(e.target.value)}
                      placeholder="Quy luật biện luận, logic loại trừ các chẩn đoán phân biệt..."
                      className="w-full border border-amber-300 rounded-md p-2 bg-white text-amber-950 font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('o')}
                      className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('p')}
                      className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                    >
                      <span>Tiếp tục: Cột P</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: CỘT P (KẾ HOẠCH & BÀI HỌC) */}
              {modalActiveTab === 'p' && (
                <div className="border border-emerald-300 rounded-xl p-4 bg-emerald-50/30 space-y-3 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                    <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-xs">
                      P
                    </span>
                    <span>CỘT P — PLAN (Kế hoạch & Điều trị)</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Xử trí cấp cứu & Ban đầu
                    </label>
                    <textarea
                      rows={2}
                      value={newImmediate}
                      onChange={(e) => setNewImmediate(e.target.value)}
                      placeholder="Đường thở, oxy, đường truyền, ổn định huyết động..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Y lệnh thuốc (Mỗi dòng 1 thuốc: Tên thuốc - Liều - Đường dùng - Lưu ý)
                    </label>
                    <textarea
                      rows={3}
                      value={newMedsText}
                      onChange={(e) => setNewMedsText(e.target.value)}
                      placeholder={`Aspirin - 300mg - Uống ngay - Liều nạp\nTicagrelor - 180mg - Uống ngay - Liều nạp\nEnoxaparin - 1mg/kg - Tiêm dưới da q12h - Hiệu chỉnh nếu eGFR < 30`}
                      className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Chỉ tiêu theo dõi & Mục tiêu lâm sàng
                    </label>
                    <input
                      type="text"
                      value={newMonitoring}
                      onChange={(e) => setNewMonitoring(e.target.value)}
                      placeholder="Theo dõi HA, nước tiểu, lặp lại xét nghiệm sau bao lâu..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Kết cục ca bệnh & Di chứng nếu có
                    </label>
                    <input
                      type="text"
                      value={newOutcomeNotes}
                      onChange={(e) => setNewOutcomeNotes(e.target.value)}
                      placeholder="VD: Can thiệp PCI thành công, xuất viện ngày thứ 4 không suy tim..."
                      className="w-full border border-slate-300 rounded-md p-2 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-900 mb-1">
                      🎯 Bài học kinh nghiệm điều trị cốt lõi (Takeaway)
                    </label>
                    <textarea
                      rows={2}
                      value={newLessons}
                      onChange={(e) => setNewLessons(e.target.value)}
                      placeholder="Bài học rút ra từ ca này: chỉnh liều, tương tác thuốc, phòng ngừa biến chứng..."
                      className="w-full border border-emerald-300 rounded-md p-2 bg-white text-emerald-950 font-medium"
                    />
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setModalActiveTab('a')}
                      className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                    >
                      Quay lại
                    </button>
                    <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Sẵn sàng lưu</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Modal Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="text-[11px] text-slate-400 italic">
                  * Dữ liệu được lưu trữ offline tại máy và đồng bộ lên Supabase Cloud khi kết nối.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewModalOpen(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingCaseId ? 'Cập nhật thay đổi' : 'Lưu ca kinh nghiệm SOAP'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
