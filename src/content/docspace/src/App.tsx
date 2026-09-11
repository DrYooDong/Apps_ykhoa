import React, { useEffect, useMemo, useState } from 'react';
import { Header, MainViewMode } from './components/Header.tsx';
import { StepNav, ClinicalStepId } from './components/StepNav.tsx';
import { SoapExperienceBoard } from './components/SoapExperienceBoard.tsx';
import { Step1DataIngestion } from './components/Step1DataIngestion.tsx';
import { Step2ProblemStatement } from './components/Step2ProblemStatement.tsx';
import { Step2Analysis } from './components/Step2Analysis.tsx';
import { Step3Protocol } from './components/Step3Protocol.tsx';
import { Step4KnowledgeBase } from './components/Step4KnowledgeBase.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { PrintReportModal } from './components/PrintReportModal.tsx';
import { VaultDrawer } from './components/VaultDrawer.tsx';
import { CdssModal, CdssToolSlug } from './components/CdssModal.tsx';
import { DEFAULT_KNOWLEDGE_BASE, SampleCase } from './data/seedData.ts';
import {
  ClinicalFormState,
  EpidemiologyContext,
  GuidelineStudy,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  SoapClinicalExperience,
  TrieuChung,
  VitalsState,
} from './types.ts';
import {
  analyzeClinicalCase,
  computeAllDerived,
  normalizeText,
} from './lib/clinicalEngine.ts';
import {
  receiveClinicalIntent,
  clearClinicalIntent,
  parseUrlIntentFallback,
} from './lib/clinicalIntent.ts';
import { getGuidelineBySlugOrId } from './lib/guidelineBridge.ts';

const initialForm: ClinicalFormState = {
  gioiTinh: 'nam',
  tuoi: '',
  ngheNghiep: '',
  lyDo: '',
  text: {
    cn: '',
    tt: '',
    tc: '',
    cls: '',
  },
};

const initialVitals: VitalsState = {
  vNhiet: '',
  vMach: '',
  vHATT: '',
  vHATTr: '',
  vTho: '',
  vSpo2: '',
};

const initialLabs: LabsState = {
  lBC: '',
  lTC: '',
  lHct: '',
  lGlu: '',
  lTrop: '',
};

const initialEpiContext: EpidemiologyContext = {
  contactHistory: '',
  travelHistory: '',
  endemicArea: '',
  seasonalContext: '',
  outbreakAlert: '',
  vectorExposure: '',
  occupationalRisk: '',
  waterFoodRisk: '',
};

export function MainApp() {
  const [kb, setKb] = useState<KnowledgeBase>(DEFAULT_KNOWLEDGE_BASE);
  const [activeMode, setActiveMode] = useState<MainViewMode>('clinical');
  const [clinicalStep, setClinicalStep] = useState<ClinicalStepId>('t1');
  const [completedSteps, setCompletedSteps] = useState<Set<ClinicalStepId>>(new Set(['t1']));

  // Clinical input states - Clean slate for user's custom cases
  const [form, setForm] = useState<ClinicalFormState>(initialForm);
  const [vitals, setVitals] = useState<VitalsState>(initialVitals);
  const [labs, setLabs] = useState<LabsState>(initialLabs);
  const [epiContext, setEpiContext] = useState<EpidemiologyContext>(initialEpiContext);
  const [problems, setProblems] = useState<ProblemStatementEntry[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [negated, setNegated] = useState<Set<string>>(new Set());

  // Protocol tab selection
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>(null);

  // Modals state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isVaultDrawerOpen, setIsVaultDrawerOpen] = useState(false);
  const [vaultQuery, setVaultQuery] = useState('');
  const [vaultDisease, setVaultDisease] = useState('');
  const [vaultKho, setVaultKho] = useState('ALL');
  const [isCdssOpen, setIsCdssOpen] = useState(false);
  const [activeCdssTool, setActiveCdssTool] = useState<CdssToolSlug>('hub');

  // Active Guideline integration banner state
  const [activeGuidelineBanner, setActiveGuidelineBanner] = useState<GuidelineStudy | null>(null);

  // User Ingested SOAP Cases
  const [userSoapCases, setUserSoapCases] = useState<SoapClinicalExperience[]>([]);
  const [selectedSoapCaseId, setSelectedSoapCaseId] = useState<string>('');

  const handleAddUserSoapCase = (newCase: SoapClinicalExperience) => {
    setUserSoapCases((prev) => [newCase, ...prev]);
    setSelectedSoapCaseId(newCase.id);
  };

  const handleNavigateToSoapCase = (caseId: string) => {
    setSelectedSoapCaseId(caseId);
    setActiveMode('soap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCdss = (tool: CdssToolSlug = 'hub') => {
    setActiveCdssTool(tool);
    setIsCdssOpen(true);
  };

  const handleOpenVaultDrawer = (diseaseName?: string, query?: string, khoCode?: string) => {
    setVaultDisease(diseaseName || '');
    setVaultQuery(query || '');
    setVaultKho(khoCode || 'ALL');
    setIsVaultDrawerOpen(true);
  };

  // Tiếp nhận Clinical Intent hai chiều từ EBM / Vault hoặc URL fallback
  useEffect(() => {
    // 1. Kiểm tra intent từ sessionStorage
    const intent = receiveClinicalIntent();
    if (intent) {
      if (intent.action === 'create-soap-from-guideline') {
        const payload = intent.payload || {};
        const term = payload.slug || payload.title || '';
        const found = getGuidelineBySlugOrId(term);
        if (found) {
          setActiveGuidelineBanner(found);
        } else if (payload.title || payload.slug) {
          setActiveGuidelineBanner({
            id: payload.slug || 'study_custom',
            title: payload.title || payload.slug,
            organization: 'EBM Evidence',
            year: 2026,
            drug: '',
            sourceType: 'intl-guideline',
            specialty: 'icu',
            design: 'guideline',
            icd10Codes: [],
            intervention: '',
            primaryEndpoint: '',
            keyResults: '',
            impact: 'practice-changing',
            phase: 'Clinical Practice Guideline',
            population: '',
            summary: payload.title || '',
            detailedConclusion: '',
          });
        }
        setActiveMode('clinical');
        setClinicalStep('t4');
      } else if (intent.action === 'open-cdss-studio') {
        const studio = (intent.payload?.studio || 'hub').toLowerCase();
        const validTools: CdssToolSlug[] = ['dengue', 'ecg', 'abg', 'xray', 'hepa', 'neuro', 'hub'];
        if (validTools.includes(studio as CdssToolSlug)) {
          handleOpenCdss(studio as CdssToolSlug);
        } else {
          handleOpenVaultDrawer(undefined, studio, 'PROTOCOL');
        }
      } else if (intent.action === 'search-vault') {
        const { query, khoCode } = intent.payload || {};
        handleOpenVaultDrawer(undefined, query, khoCode);
      }
      clearClinicalIntent();
      return;
    }

    // 2. URL search & hash query fallback
    const fallback = parseUrlIntentFallback();
    if (fallback.fromGuideline) {
      const found = getGuidelineBySlugOrId(fallback.fromGuideline);
      if (found) {
        setActiveGuidelineBanner(found);
      } else {
        setActiveGuidelineBanner({
          id: fallback.fromGuideline,
          title: decodeURIComponent(fallback.fromGuideline),
          organization: 'EBM Evidence',
          year: 2026,
          drug: '',
          sourceType: 'intl-guideline',
          specialty: 'icu',
          design: 'guideline',
          icd10Codes: [],
          intervention: '',
          primaryEndpoint: '',
          keyResults: '',
          impact: 'practice-changing',
          phase: 'Clinical Practice Guideline',
          population: '',
          summary: decodeURIComponent(fallback.fromGuideline),
          detailedConclusion: '',
        });
      }
      setActiveMode('clinical');
      setClinicalStep('t4');
    } else if (fallback.studio) {
      const studio = fallback.studio.toLowerCase();
      const validTools: CdssToolSlug[] = ['dengue', 'ecg', 'abg', 'xray', 'hepa', 'neuro', 'hub'];
      if (validTools.includes(studio as CdssToolSlug)) {
        handleOpenCdss(studio as CdssToolSlug);
      } else {
        handleOpenVaultDrawer(undefined, studio, 'PROTOCOL');
      }
    } else if (fallback.vaultSearch) {
      handleOpenVaultDrawer(undefined, fallback.vaultSearch);
    }
  }, []);

  // Compute derived symptoms from Vitals, Labs, and Free texts
  const derivedInfo = useMemo(() => {
    return computeAllDerived(kb, vitals, labs, form.gioiTinh, selected);
  }, [kb, vitals, labs, form.gioiTinh, selected]);

  const derived = derivedInfo.derived;
  const derivedVitalsList = derivedInfo.vitalsList;
  const derivedLabsList = derivedInfo.labsList;
  const primaryProblem = useMemo(() => problems.find((p) => p.isPrimary), [problems]);

  // Real-time Deduction Engine kết hợp Tam Giác Dịch Tễ & Vấn Đề Chính
  const results = useMemo(() => {
    return analyzeClinicalCase(
      kb,
      form,
      selected,
      derived,
      negated,
      epiContext,
      primaryProblem
    );
  }, [kb, form, selected, derived, negated, epiContext, primaryProblem]);

  // Summary Text Generator
  const summaryText = useMemo(() => {
    const parts: string[] = [];
    parts.push(
      `Bệnh nhân ${form.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}, ${form.tuoi || '--'} tuổi, nghề nghiệp: ${
        form.ngheNghiep || 'Chưa ghi nhận'
      }.`
    );
    if (form.lyDo) parts.push(`Lý do vào viện: ${form.lyDo}.`);

    const vitalsPart: string[] = [];
    if (vitals.vNhiet) vitalsPart.push(`T: ${vitals.vNhiet}°C`);
    if (vitals.vMach) vitalsPart.push(`M: ${vitals.vMach} l/p`);
    if (vitals.vHATT && vitals.vHATTr) vitalsPart.push(`HA: ${vitals.vHATT}/${vitals.vHATTr} mmHg`);
    if (vitals.vTho) vitalsPart.push(`NT: ${vitals.vTho} l/p`);
    if (vitals.vSpo2) vitalsPart.push(`SpO2: ${vitals.vSpo2}%`);
    if (vitalsPart.length > 0) parts.push(`Sinh hiệu: ${vitalsPart.join(', ')}.`);

    const selNames: string[] = [];
    selected.forEach((id) => {
      const tc = kb.trieuChung.find((t) => t.id === id);
      if (tc) selNames.push(tc.ten);
    });
    if (selNames.length > 0) parts.push(`Triệu chứng ghi nhận (+): ${selNames.join(', ')}.`);

    const negNames: string[] = [];
    negated.forEach((id) => {
      const tc = kb.trieuChung.find((t) => t.id === id);
      if (tc) negNames.push(tc.ten);
    });
    if (negNames.length > 0) parts.push(`Triệu chứng loại trừ (-): ${negNames.join(', ')}.`);

    if (results.length > 0) {
      const top = results[0];
      parts.push(
        `Chẩn đoán sơ bộ hướng tới nhiều nhất: ${top.b.ten} (ICD-10: ${top.b.icd}) với độ phù hợp ${top.pct}%.`
      );
    }
    return parts.join(' ');
  }, [form, vitals, selected, negated, results, kb.trieuChung]);

  // Handlers
  const handleRunAnalysis = () => {
    setCompletedSteps((prev) => new Set(prev).add('t1'));
    setClinicalStep('t2'); // Chuyển sang Bước 2: Tóm tắt & Đặt vấn đề
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ kiện đang nhập?')) {
      setForm(initialForm);
      setVitals(initialVitals);
      setLabs(initialLabs);
      setEpiContext(initialEpiContext);
      setProblems([]);
      setSelected(new Set());
      setNegated(new Set());
      setSelectedDiseaseId(null);
      setCompletedSteps(new Set(['t1']));
      setClinicalStep('t1');
    }
  };

  const handleLoadSample = (sample: SampleCase) => {
    setForm({
      gioiTinh: sample.form.gioiTinh,
      tuoi: sample.form.tuoi,
      ngheNghiep: sample.form.ngheNghiep,
      lyDo: sample.form.lyDo,
      text: { ...sample.form.text },
    });
    if (sample.vitals) {
      setVitals((prev) => ({ ...prev, ...sample.vitals }));
    }
    if (sample.labs) {
      setLabs((prev) => ({ ...prev, ...sample.labs }));
    }
    setSelected(new Set(sample.sel));
    setNegated(new Set());
    setCompletedSteps(new Set(['t1', 't2']));
    setClinicalStep('t2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExportCase = () => {
    const data = {
      form,
      vitals,
      labs,
      selected: Array.from(selected),
      negated: Array.from(negated),
      results: results.slice(0, 5).map((r) => ({
        benhId: r.b.id,
        ten: r.b.ten,
        icd: r.b.icd,
        pct: r.pct,
      })),
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benh-an-${normalizeText(form.lyDo || 'medlens')}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCase = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.form) setForm(data.form);
        if (data.vitals) setVitals(data.vitals);
        if (data.labs) setLabs(data.labs);
        if (data.selected) setSelected(new Set(data.selected));
        if (data.negated) setNegated(new Set(data.negated));
        setCompletedSteps(new Set(['t1', 't2']));
        setClinicalStep('t2');
      } catch (err) {
        alert('Lỗi đọc file JSON: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleExportKB = () => {
    const blob = new Blob([JSON.stringify(kb, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medlens-kb-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportKB = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.benh && data.trieuChung) {
          setKb(data);
          alert(`Đã nạp thành công Kho tri thức: ${data.benh.length} bệnh, ${data.trieuChung.length} triệu chứng.`);
        } else {
          alert('Cấu trúc file Kho tri thức không đúng định dạng.');
        }
      } catch (err) {
        alert('Lỗi đọc file: ' + (err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleGoToProtocol = (diseaseId: string) => {
    setSelectedDiseaseId(diseaseId);
    setCompletedSteps((prev) => new Set(prev).add('t3').add('t4'));
    setClinicalStep('t4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* App Header */}
      <Header
        kb={kb}
        activeMode={activeMode}
        onChangeMode={setActiveMode}
        onOpenVault={(khoCode, query) => handleOpenVaultDrawer(undefined, query, khoCode)}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* 3-Step Clinical Navigation (chỉ hiện khi đang ở Chu trình lâm sàng) */}
      {activeMode === 'clinical' && (
        <StepNav
          currentStep={clinicalStep}
          completedSteps={completedSteps}
          onSelectStep={setClinicalStep}
        />
      )}

      {/* Banner thông báo đang nạp Guideline từ EBM */}
      {activeGuidelineBanner && activeMode === 'clinical' && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 sm:px-6 py-2.5 shadow-sm border-b border-emerald-500 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded bg-emerald-800/80 font-bold text-[11px] uppercase tracking-wide shrink-0 border border-emerald-400/40">
              EBM Linked · {activeGuidelineBanner.organization} {activeGuidelineBanner.year}
            </span>
            <div className="truncate">
              <span className="font-semibold text-emerald-100">Đang phân tích ca theo Guideline:</span>{' '}
              <span className="font-bold text-white">{activeGuidelineBanner.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                handleOpenVaultDrawer(undefined, activeGuidelineBanner.title, 'GUIDELINE');
              }}
              className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Tra cứu EBM
            </button>
            <button
              onClick={() => {
                if (selectedDiseaseId) {
                  setClinicalStep('t3');
                } else {
                  setClinicalStep('t1');
                }
              }}
              className="px-2.5 py-1 rounded bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-xs cursor-pointer"
            >
              Xem Phác đồ
            </button>
            <button
              onClick={() => setActiveGuidelineBanner(null)}
              className="p-1 text-emerald-200 hover:text-white rounded hover:bg-emerald-800/50 transition-colors cursor-pointer"
              title="Đóng thông báo"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {/* PHÂN HỆ 1: CHU TRÌNH LÂM SÀNG 3 BƯỚC */}
        {activeMode === 'clinical' && (
          <>
            {clinicalStep === 't1' && (
              <Step1DataIngestion
                kb={kb}
                form={form}
                setForm={setForm}
                vitals={vitals}
                setVitals={setVitals}
                labs={labs}
                setLabs={setLabs}
                selected={selected}
                setSelected={setSelected}
                derived={derived}
                setDerived={() => {}}
                negated={negated}
                setNegated={setNegated}
                derivedVitalsList={derivedVitalsList}
                derivedLabsList={derivedLabsList}
                liveResults={results}
                onRunAnalysis={handleRunAnalysis}
                onReset={handleReset}
                onLoadSample={handleLoadSample}
                onExportCase={handleExportCase}
                onImportCase={handleImportCase}
                onSaveToPostgres={() => setIsPrintOpen(true)}
                summaryText={summaryText}
                onOpenVaultDrawer={handleOpenVaultDrawer}
                epiContext={epiContext}
                onUpdateEpiContext={setEpiContext}
              />
            )}

            {/* Bước 2: Tóm tắt bệnh án & Đặt vấn đề (Chuẩn Thầy Sĩ & Thầy Tuấn, Tam giác DTH) */}
            {clinicalStep === 't2' && (
              <Step2ProblemStatement
                form={form}
                vitals={vitals}
                labs={labs}
                selectedIds={selected}
                negatedIds={negated}
                kb={kb}
                epiContext={epiContext}
                onUpdateEpiContext={setEpiContext}
                problems={problems}
                onUpdateProblems={setProblems}
                onGoToStep={(stepId) => {
                  setCompletedSteps((prev) => new Set(prev).add('t2'));
                  setClinicalStep(stepId);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenVaultDrawer={handleOpenVaultDrawer}
              />
            )}

            {/* Bước 3: Phân tích & Biện luận chẩn đoán */}
            {clinicalStep === 't3' && (
              <Step2Analysis
                kb={kb}
                results={results}
                form={form}
                vitals={vitals}
                labs={labs}
                selectedCount={selected.size}
                derivedCount={derived.size}
                negatedCount={negated.size}
                onGoToProtocol={handleGoToProtocol}
                onSaveToPostgres={() => setIsPrintOpen(true)}
                onPrintReport={() => setIsPrintOpen(true)}
                onOpenVaultDrawer={handleOpenVaultDrawer}
                primaryProblem={primaryProblem}
                problems={problems}
                epiContext={epiContext}
              />
            )}

            {/* Bước 4: Phác đồ điều trị */}
            {clinicalStep === 't4' && (
              <Step3Protocol
                kb={kb}
                selectedDiseaseId={selectedDiseaseId}
                onSelectDisease={setSelectedDiseaseId}
                onBackToAnalysis={() => {
                  setClinicalStep('t3');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSaveToPostgres={() => setIsPrintOpen(true)}
                onPrintReport={() => setIsPrintOpen(true)}
                onOpenVaultDrawer={handleOpenVaultDrawer}
                onNavigateToSoapCase={handleNavigateToSoapCase}
                form={form}
                vitals={vitals}
                labs={labs}
              />
            )}
          </>
        )}

        {/* PHÂN HỆ 2: KINH NGHIỆM LÂM SÀNG SOAP (HUB RIÊNG BIỆT) */}
        {activeMode === 'soap' && (
          <SoapExperienceBoard
            onOpenVaultDrawer={handleOpenVaultDrawer}
            userCases={userSoapCases}
            onAddUserCase={handleAddUserSoapCase}
            initialSelectedCaseId={selectedSoapCaseId}
            onNavigateToAnalysis={() => {
              setActiveMode('clinical');
              setClinicalStep('t1');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToProtocol={(diseaseId) => {
              if (diseaseId) setSelectedDiseaseId(diseaseId);
              setActiveMode('clinical');
              setClinicalStep('t4');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* PHÂN HỆ 3: KHO TRI THỨC VAULT (EXPLORER RIÊNG BIỆT) */}
        {activeMode === 'kb' && (
          <Step4KnowledgeBase
            kb={kb}
            onExportKB={handleExportKB}
            onImportKB={handleImportKB}
            onGoToProtocol={(dId) => {
              setSelectedDiseaseId(dId);
              setActiveMode('clinical');
              setClinicalStep('t4');
            }}
            onOpenVaultDrawer={handleOpenVaultDrawer}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="h-9 bg-white border-t border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 text-xs text-slate-500 no-print">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> 100% Client-Side
            </span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium text-indigo-700">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Knowledge Vault Single Source of Truth
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            CliniPortal DocSpace MedLens Pro · High Density Clinical Core · Chuẩn Bộ Y tế
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <VaultDrawer
        isOpen={isVaultDrawerOpen}
        onClose={() => setIsVaultDrawerOpen(false)}
        initialQuery={vaultQuery}
        initialKho={vaultKho}
        initialDiseaseName={vaultDisease}
        onOpenCdssModal={handleOpenCdss}
      />

      <CdssModal
        isOpen={isCdssOpen}
        onClose={() => setIsCdssOpen(false)}
        initialTool={activeCdssTool}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <PrintReportModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        form={form}
        vitals={vitals}
        labs={labs}
        results={results}
        kb={kb}
        summaryText={summaryText}
      />
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
