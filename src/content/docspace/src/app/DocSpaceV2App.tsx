import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  GraduationCap,
  Home,
  Library,
  Moon,
  PenTool,
  Presentation,
  Printer,
  Stethoscope,
  Sun,
  X,
} from 'lucide-react';
import { DEFAULT_KNOWLEDGE_BASE } from '../../data/seedData.ts';
import { ErrorBoundary } from '../components/common/ErrorBoundary.tsx';
import { soapToWorkbenchSession } from '../engines/soapAdapters.ts';
import { getVaultSoapExperiences } from '../lib/soapApi.ts';
import { KnowledgeBase, SoapClinicalExperience } from '../types.ts';
import {
  DocSpaceMode,
  DocSpacePrimaryView,
} from '../schemas/docspaceV2.ts';
import { useClinicalSessionStore } from '../store/clinicalSessionStore.ts';
import { useMasteryStore } from '../store/masteryStore.ts';
import { useTeachingModeStore } from '../store/teachingModeStore.ts';
import { ClinicalWorkbench } from '../features/workbench/ClinicalWorkbench.tsx';
import { TeachingControlBar } from '../features/library/TeachingControlBar.tsx';
import { ContextualKnowledgeRail } from '../features/library/ContextualKnowledgeRail.tsx';
import { AuthorWorkspaceBar } from '../features/author/AuthorWorkspaceBar.tsx';

const UnifiedCaseLibrary = lazy(() =>
  import('../features/library/UnifiedCaseLibrary.tsx').then((m) => ({
    default: m.UnifiedCaseLibrary,
  }))
);
const AdaptiveOsceLab = lazy(() =>
  import('../features/osce/AdaptiveOsceLab.tsx').then((m) => ({
    default: m.AdaptiveOsceLab,
  }))
);
const QuickIngestModal = lazy(() =>
  import('../components/QuickIngestModal.tsx').then((m) => ({ default: m.QuickIngestModal }))
);
const PromptBuilderModal = lazy(() =>
  import('../components/PromptBuilderModal.tsx').then((m) => ({ default: m.PromptBuilderModal }))
);

const USER_SOAP_KEY = 'cliniportal_user_soap_cases';

function loadUserSoapCases(): SoapClinicalExperience[] {
  try {
    const saved = localStorage.getItem(USER_SOAP_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const LazyFallback = () => (
  <div className="py-16 flex items-center justify-center text-xs text-slate-500">
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xs">
      <span className="w-2 h-2 rounded-full bg-[#087f9c] animate-pulse" />
      <span>Đang tải không gian học tập...</span>
    </div>
  </div>
);

export const DocSpaceV2App: React.FC = () => {
  const [kb] = useState<KnowledgeBase>(DEFAULT_KNOWLEDGE_BASE);
  const [primaryView, setPrimaryView] = useState<DocSpacePrimaryView>('workbench');
  const [mode, setMode] = useState<DocSpaceMode>('practice');
  const [isRailOpen, setIsRailOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isQuickIngestOpen, setIsQuickIngestOpen] = useState(false);
  const [isPromptBuilderOpen, setIsPromptBuilderOpen] = useState(false);
  const [pendingOsceId, setPendingOsceId] = useState<string | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved =
        localStorage.getItem('cliniportal_theme') || localStorage.getItem('cliniportal-theme');
      if (saved) return saved === 'dark';
      return document.documentElement.getAttribute('data-theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('cliniportal_theme', theme);
      localStorage.setItem('cliniportal-theme', theme);
    } catch {
      // ignore
    }
  }, [isDark]);

  // Offline Stores
  const sessionStore = useClinicalSessionStore();
  const masteryStore = useMasteryStore();
  const teachingStore = useTeachingModeStore();

  // Combined SOAP cases (User local + 41 Vault SOAP cases)
  const [userSoapCases, setUserSoapCases] = useState<SoapClinicalExperience[]>(loadUserSoapCases);
  const allSoapCases = useMemo(() => {
    const vaultCases = getVaultSoapExperiences();
    const map = new Map<string, SoapClinicalExperience>();
    userSoapCases.forEach((c) => map.set(c.id, c));
    vaultCases.forEach((c) => {
      if (!map.has(c.id)) map.set(c.id, c);
    });
    return Array.from(map.values());
  }, [userSoapCases]);

  const handleSaveUserSoap = (newCase: SoapClinicalExperience) => {
    setUserSoapCases((prev) => {
      const next = [newCase, ...prev.filter((c) => c.id !== newCase.id)];
      try {
        localStorage.setItem(USER_SOAP_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const linkedSoapCase = useMemo(() => {
    if (!sessionStore.activeSession.sourceSoapId) return undefined;
    return allSoapCases.find((c) => c.id === sessionStore.activeSession.sourceSoapId);
  }, [sessionStore.activeSession.sourceSoapId, allSoapCases]);

  const activeDiseaseName = useMemo(() => {
    const d = kb.benh.find((b) => b.id === sessionStore.activeSession.selectedDiseaseId);
    return d?.ten || linkedSoapCase?.a.primaryDiagnosis || '';
  }, [kb.benh, sessionStore.activeSession.selectedDiseaseId, linkedSoapCase]);

  const handlePracticeSoapOnWorkbench = (soap: SoapClinicalExperience, progressive = true) => {
    const wbSession = soapToWorkbenchSession(soap, kb, progressive);
    sessionStore.openOrAddSession(wbSession);
    setPrimaryView('workbench');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOsceFromSoap = (soap: SoapClinicalExperience) => {
    setPendingOsceId(`osce_soap_${soap.id}`);
    setPrimaryView('osce');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportSessionJson = (anonymize: boolean) => {
    const json = sessionStore.exportActiveSessionJson(anonymize);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docspace-case-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSessionJson = (raw: string) => {
    const res = sessionStore.importSessionJson(raw);
    if (!res.ok) {
      alert(`Không thể nạp file: ${res.error}`);
    }
  };

  return (
    <div className="docspace-shell min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased">
      {/* ─── TOP NAVIGATION BAR ────────────────────────────────────────────── */}
      <header className="docspace-header sticky top-0 z-30 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 sm:px-5 flex items-center justify-between gap-2 no-print">
        {/* Brand */}
        <div className="flex items-center gap-2 min-w-0">
          <a
            href="../../../index.html"
            className="flex items-center gap-2 text-slate-900 dark:text-white no-underline shrink-0"
            title="Về Trang chủ CliniPortal"
          >
            <div className="w-8 h-8 rounded-lg bg-[#087f9c] text-white flex items-center justify-center shadow-2xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-tight">
                DocSpace <span className="text-[#087f9c] dark:text-cyan-400">v2</span>
              </div>
              <div className="hidden xl:block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Offline Teaching Workbench
              </div>
            </div>
          </a>
        </div>

        {/* 3 Primary Spaces Switcher (Desktop/Tablet) */}
        <nav
          aria-label="Điều hướng chính DocSpace"
          className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs"
        >
          {(
            [
              { id: 'workbench' as const, label: 'Bàn Biện Luận', icon: <Stethoscope className="w-3.5 h-3.5" /> },
              { id: 'library' as const, label: `Thư Viện (${allSoapCases.length} SOAP)`, icon: <Library className="w-3.5 h-3.5" /> },
              { id: 'osce' as const, label: 'Phòng Luyện OSCE', icon: <Award className="w-3.5 h-3.5" /> },
            ]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'osce') setPendingOsceId(null);
                setPrimaryView(item.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                primaryView === item.id
                  ? 'bg-white dark:bg-slate-900 text-[#087f9c] dark:text-cyan-300 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Controls: Mode Switcher + Knowledge Rail + Dark Mode + Home */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden sm:inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px]">
            {(
              [
                { id: 'practice' as const, label: 'Tự học', icon: <GraduationCap className="w-3 h-3" /> },
                { id: 'teaching' as const, label: 'Giảng dạy', icon: <Presentation className="w-3 h-3" /> },
                { id: 'author' as const, label: 'Biên soạn', icon: <PenTool className="w-3 h-3" /> },
              ]
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-bold cursor-pointer transition-colors ${
                  mode === m.id
                    ? 'bg-[#087f9c] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m.icon}
                <span className="hidden lg:inline">{m.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsRailOpen(true)}
            className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[#087f9c] dark:text-cyan-300 text-xs font-bold cursor-pointer hover:bg-cyan-100"
            title="Mở thanh tra cứu Guidelines, Vault & CDSS theo ngữ cảnh"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Tra cứu nhanh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-200 cursor-pointer"
            title={isDark ? 'Chuyển sang Giao diện Sáng' : 'Chuyển sang Giao diện Tối'}
            aria-label="Đổi chế độ Sáng/Tối"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          <a
            href="../../../index.html#/"
            className="hidden sm:flex w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 items-center justify-center text-slate-600 dark:text-slate-200 no-underline"
            title="Về Trang chủ CliniPortal"
            aria-label="Trang chủ"
          >
            <Home className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* ─── MAIN WORKSPACE AREA ───────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 py-3 sm:py-4 pb-24 md:pb-6 space-y-3">
        {mode === 'teaching' && (
          <TeachingControlBar
            state={teachingStore.teachingState}
            onSetFontScale={teachingStore.setFontScale}
            onToggleMask={teachingStore.toggleMaskColumn}
            onRevealAll={teachingStore.revealAllColumns}
            onResetMasks={teachingStore.resetMasksForTeaching}
            onSetTimerPreset={teachingStore.setTimerPreset}
            onToggleTimer={teachingStore.toggleTimer}
          />
        )}

        {mode === 'author' && (
          <AuthorWorkspaceBar
            customCasesCount={userSoapCases.length}
            onOpenQuickIngest={() => setIsQuickIngestOpen(true)}
            onOpenPromptBuilder={() => setIsPromptBuilderOpen(true)}
          />
        )}

        <ErrorBoundary key={primaryView} onReset={() => setPrimaryView('workbench')}>
          <Suspense fallback={<LazyFallback />}>
            {primaryView === 'workbench' && (
              <ClinicalWorkbench
                kb={kb}
                mode={mode}
                sessions={sessionStore.sessions}
                activeSession={sessionStore.activeSession}
                linkedSoapCase={linkedSoapCase}
                onSelectSession={sessionStore.setActiveId}
                onNewSession={sessionStore.createNewTab}
                onCloseSession={sessionStore.closeTab}
                onUpdateSession={sessionStore.updateActiveSession}
                onSetRevealStage={sessionStore.setRevealStage}
                onExportJson={handleExportSessionJson}
                onImportJson={handleImportSessionJson}
                onResetSession={sessionStore.resetActiveSession}
                onOpenPrintReport={() => setIsPrintOpen(true)}
              />
            )}

            {primaryView === 'library' && (
              <UnifiedCaseLibrary
                kb={kb}
                soapCases={allSoapCases}
                mode={mode}
                teachingState={teachingStore.teachingState}
                onToggleTeachingMask={teachingStore.toggleMaskColumn}
                onPracticeOnWorkbench={handlePracticeSoapOnWorkbench}
                onStartOsceFromSoap={handleStartOsceFromSoap}
              />
            )}

            {primaryView === 'osce' && (
              <AdaptiveOsceLab
                key={pendingOsceId || 'osce_lobby'}
                soapCases={allSoapCases}
                initialScenarioId={pendingOsceId}
                masterySummary={masteryStore.summary}
                onRecordAttempt={masteryStore.recordAttempt}
                onClearMastery={masteryStore.clearHistory}
                onOpenSoapInWorkbench={(soap) => handlePracticeSoapOnWorkbench(soap, true)}
              />
            )}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* ─── DESKTOP FOOTER ────────────────────────────────────────────────── */}
      <footer className="hidden md:flex bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-5 py-2 text-[11px] text-slate-500 dark:text-slate-400 items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            100% Offline-First · Zero API
          </span>
          <span>
            {allSoapCases.length} Ca SOAP · {kb.trieuChung.length} Triệu chứng · 2.400+ Bài Vault
          </span>
        </div>
        <span>CliniPortal DocSpace v2 · Không gian Học tập &amp; Giảng dạy Tư duy Lâm sàng</span>
      </footer>

      {/* ─── MOBILE BOTTOM NAV (Touch targets >= 44px) ─────────────────────── */}
      <nav
        id="bottom-nav-bar"
        aria-label="Điều hướng di động"
        className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 bottom-safe no-print"
      >
        {(
          [
            { id: 'workbench' as const, label: 'Biện luận', icon: <Stethoscope className="w-4 h-4" /> },
            { id: 'library' as const, label: 'Thư viện', icon: <Library className="w-4 h-4" /> },
            { id: 'osce' as const, label: 'Thi OSCE', icon: <Award className="w-4 h-4" /> },
          ]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPrimaryView(tab.id)}
            className={`min-h-[52px] flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold cursor-pointer ${
              primaryView === tab.id
                ? 'text-[#087f9c] dark:text-cyan-400'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMode((m) => (m === 'teaching' ? 'practice' : 'teaching'))}
          className={`min-h-[52px] flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold cursor-pointer ${
            mode === 'teaching' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>{mode === 'teaching' ? 'Giảng dạy' : 'Tự học'}</span>
        </button>
      </nav>

      {/* ─── CONTEXTUAL SLIDE-OVER KNOWLEDGE RAIL ──────────────────────────── */}
      <ContextualKnowledgeRail
        isOpen={isRailOpen}
        onClose={() => setIsRailOpen(false)}
        session={sessionStore.activeSession}
        activeDiseaseName={activeDiseaseName}
        onLoadSoapToWorkbench={(soap) => handlePracticeSoapOnWorkbench(soap, true)}
      />

      {/* ─── CLEAN OFFLINE PRINT WORKSHEET MODAL ───────────────────────────── */}
      {isPrintOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-3">
          <div className="bg-white text-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
              <h3 className="font-bold text-base">Phiếu Tóm Tắt Bệnh Án &amp; Y Lệnh (In / Xuất PDF Offline)</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#087f9c] text-white text-xs font-bold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> In / Lưu PDF
                </button>
                <button
                  type="button"
                  onClick={() => setIsPrintOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div id="clinical-report-paper" className="space-y-3 text-xs leading-relaxed">
              <div className="text-center border-b border-slate-300 pb-2">
                <div className="font-extrabold text-base uppercase">
                  PHIẾU BÌNH BỆNH ÁN &amp; TẬP KÊ Y LỆNH — CLINIPORTAL DOCSPACE
                </div>
                <div className="text-slate-500">
                  Hồ sơ học tập ẩn danh · Ngày xuất: {new Date().toLocaleDateString('vi-VN')}
                </div>
              </div>
              <div>
                <strong>Hành chính:</strong> {sessionStore.activeSession.form.gioiTinh === 'nu' ? 'Nữ' : 'Nam'},{' '}
                {sessionStore.activeSession.form.tuoi || '--'} tuổi · CN: {sessionStore.activeSession.form.canNang || '--'} kg · CC:{' '}
                {sessionStore.activeSession.form.chieuCao || '--'} cm.
              </div>
              <div>
                <strong>Lý do vào viện:</strong> {sessionStore.activeSession.form.lyDo || '--'}
              </div>
              <div>
                <strong>Đặt vấn đề ({sessionStore.activeSession.userProblems.length}):</strong>
                <ul className="list-disc pl-5 mt-1">
                  {sessionStore.activeSession.userProblems.map((p) => (
                    <li key={p.id}>
                      {p.label} {p.isPrimary ? '(Vấn đề chính)' : ''}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Y lệnh đã chọn ({sessionStore.activeSession.orderItems.filter((o) => o.checked).length}):</strong>
                <ul className="list-disc pl-5 mt-1">
                  {sessionStore.activeSession.orderItems
                    .filter((o) => o.checked)
                    .map((o) => (
                      <li key={o.id}>
                        <strong>{o.drugName}</strong> — {o.dose} ({o.route})
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── AUTHOR MODE MODALS (LAZY) ─────────────────────────────────────── */}
      <Suspense fallback={null}>
        {isQuickIngestOpen && (
          <QuickIngestModal
            isOpen={isQuickIngestOpen}
            onClose={() => setIsQuickIngestOpen(false)}
            onSaveCase={handleSaveUserSoap}
          />
        )}
        {isPromptBuilderOpen && (
          <PromptBuilderModal
            isOpen={isPromptBuilderOpen}
            onClose={() => setIsPromptBuilderOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
};
