import React, { useMemo, useState } from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import { Header } from './components/Header.tsx';
import { StepNav, TabId } from './components/StepNav.tsx';
import { SoapExperienceBoard } from './components/SoapExperienceBoard.tsx';
import { Step1DataIngestion } from './components/Step1DataIngestion.tsx';
import { Step2Analysis } from './components/Step2Analysis.tsx';
import { Step3Protocol } from './components/Step3Protocol.tsx';
import { Step4KnowledgeBase } from './components/Step4KnowledgeBase.tsx';
import { PatientRecordsModal } from './components/PatientRecordsModal.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { PrintReportModal } from './components/PrintReportModal.tsx';
import { VaultDrawer } from './components/VaultDrawer.tsx';
import { CdssModal, CdssToolSlug } from './components/CdssModal.tsx';
import { DEFAULT_KNOWLEDGE_BASE, SampleCase } from './data/seedData.ts';
import {
  ClinicalFormState,
  GuidelineStudy,
  KnowledgeBase,
  LabsState,
  MedicalRecord,
  TrieuChung,
  VitalsState,
} from './types.ts';
import { GUIDELINE_STUDIES } from './lib/guidelineBridge.ts';
import {
  analyzeClinicalCase,
  computeAllDerived,
  normalizeText,
} from './lib/clinicalEngine.ts';

const initialForm: ClinicalFormState = {
  gioiTinh: 'nam',
  tuoi: '58',
  ngheNghiep: 'Tài xế',
  lyDo: 'Đau ngực dữ dội',
  text: {
    cn: '',
    tt: '',
    tc: '',
    cls: '',
  },
};

const initialVitals: VitalsState = {
  vNhiet: '37.0',
  vMach: '95',
  vHATT: '135',
  vHATTr: '85',
  vTho: '20',
  vSpo2: '96',
};

const initialLabs: LabsState = {
  lBC: '9.2',
  lTC: '230',
  lHct: '41',
  lGlu: '6.2',
  lTrop: '45',
};

export function MainApp() {
  const [kb, setKb] = useState<KnowledgeBase>(DEFAULT_KNOWLEDGE_BASE);
  const [currentTab, setCurrentTab] = useState<TabId>('soap');
  const [completedSteps, setCompletedSteps] = useState<Set<TabId>>(new Set(['soap']));

  // Clinical input states
  const [form, setForm] = useState<ClinicalFormState>(initialForm);
  const [vitals, setVitals] = useState<VitalsState>(initialVitals);
  const [labs, setLabs] = useState<LabsState>(initialLabs);
  const [selected, setSelected] = useState<Set<string>>(
    new Set(['dau_nguc_sau_xuong_uc', 'va_mo_hoi', 'kho_tho', 'tang_huyet_ap'])
  );
  const [negated, setNegated] = useState<Set<string>>(new Set(['sot']));

  // Protocol tab selection
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>('nmct_stemi');

  // Modals state
  const [isRecordsOpen, setIsRecordsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
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

  const handleOpenCdss = (tool: CdssToolSlug = 'hub') => {
    setActiveCdssTool(tool);
    setIsCdssOpen(true);
  };

  const handleOpenVaultDrawer = (diseaseName?: string, query?: string, khoCode?: string) => {
    if (khoCode === 'CDSS') {
      let tool: CdssToolSlug = 'hub';
      const q = (query || diseaseName || '').toLowerCase();
      if (q.includes('dengue') || q.includes('xuất huyết')) tool = 'dengue';
      else if (q.includes('ecg') || q.includes('điện tim') || q.includes('tim')) tool = 'ecg';
      else if (q.includes('khí máu') || q.includes('abg')) tool = 'abg';
      else if (q.includes('xquang') || q.includes('x-quang') || q.includes('xray') || q.includes('radai')) tool = 'xray';
      else if (q.includes('gan') || q.includes('hepa') || q.includes('men gan') || q.includes('xơ gan') || q.includes('viêm gan')) tool = 'hepa';
      else if (q.includes('thần kinh') || q.includes('neuro') || q.includes('não') || q.includes('liệt') || q.includes('đột quỵ')) tool = 'neuro';
      handleOpenCdss(tool);
      return;
    }
    setVaultDisease(diseaseName || '');
    setVaultQuery(query || '');
    setVaultKho(khoCode || 'ALL');
    setIsVaultDrawerOpen(true);
  };

  // Deep linking: Nhận diện tham số URL ?from_guideline=... khi chuyển tiếp từ Chuyên trang EBM
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hashParams = window.location.hash.includes('?')
        ? new URLSearchParams(window.location.hash.split('?')[1])
        : null;
      const guidelineParam =
        urlParams.get('from_guideline') ||
        urlParams.get('guideline') ||
        hashParams?.get('from_guideline');

      if (guidelineParam) {
        const normParam = guidelineParam.toLowerCase().trim();
        const matched =
          GUIDELINE_STUDIES.find(
            (s) =>
              s.id === guidelineParam ||
              s.id.toLowerCase().includes(normParam) ||
              normParam.includes(s.id.toLowerCase()) ||
              (s.file && s.file.toLowerCase().includes(normParam))
          ) || GUIDELINE_STUDIES.find((s) => s.title.toLowerCase().includes(normParam));

        if (matched) {
          setActiveGuidelineBanner(matched);

          // Điền lý do khám / chẩn đoán sơ bộ theo khuyến cáo
          setForm((prev) => ({
            ...prev,
            lyDo: prev.lyDo || `Khám và điều trị theo khuyến cáo ${matched.organization} (${matched.year})`,
            text: {
              ...prev.text,
              tc: prev.text.tc
                ? `${prev.text.tc}\n[EBM Guideline]: Áp dụng phác đồ ${matched.title}`
                : `[EBM Guideline]: Áp dụng phác đồ ${matched.title}`,
            },
          }));

          // Tự động chọn bệnh tương ứng trong danh mục nếu khớp mã ICD-10
          const matchedDisease = kb.benh.find((b) => {
            const studyIcds = (matched.icd10Codes || []).map((c) => c.toUpperCase().trim());
            const bIcds = b.icd.split(/[\/,;]/).map((c) => c.toUpperCase().trim());
            return bIcds.some((bi) =>
              studyIcds.some((si) => si.startsWith(bi) || bi.startsWith(si))
            );
          });

          if (matchedDisease) {
            setSelectedDiseaseId(matchedDisease.id);
          }
        }
      }
    } catch {
      // Bỏ qua nếu môi trường không có window
    }
  }, [kb.benh]);

  // Derived auto-symptoms from vitals and labs
  const { derived, vitalsList: derivedVitalsList, labsList: derivedLabsList } = useMemo(() => {
    return computeAllDerived(kb, vitals, labs, form.gioiTinh, selected);
  }, [kb, vitals, labs, form.gioiTinh, selected]);

  // Real-time Deduction Engine calculation
  const results = useMemo(() => {
    return analyzeClinicalCase(kb, form, selected, derived, negated);
  }, [kb, form, selected, derived, negated]);

  // Dynamic clinical summary text
  const summaryText = useMemo(() => {
    const parts: string[] = [];
    const ageStr = form.tuoi ? `${form.tuoi} tuổi` : '';
    const genderStr = form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nữ' : 'chưa rõ giới tính';
    const jobStr = form.ngheNghiep ? `, nghề nghiệp ${form.ngheNghiep}` : '';
    const reasonStr = form.lyDo ? `, vào viện vì ${form.lyDo}` : '';

    parts.push(`Bệnh nhân ${genderStr} ${ageStr}${jobStr}${reasonStr}.`);

    const vocabMap = new Map<string, TrieuChung>(kb.trieuChung.map((t) => [t.id, t]));
    const posNames = [...selected, ...derived].map((id) => vocabMap.get(id)?.ten || id);
    if (posNames.length > 0) {
      parts.push(`Ghi nhận các triệu chứng & dấu chứng dương tính: ${posNames.join(', ')}.`);
    }

    if (negated.size > 0) {
      const negNames = [...negated].map((id) => vocabMap.get(id)?.ten || id);
      parts.push(`Dữ kiện âm tính có giá trị loại trừ: không có ${negNames.join(', ')}.`);
    }

    const vitalsSummary: string[] = [];
    if (vitals.vNhiet) vitalsSummary.push(`T: ${vitals.vNhiet}°C`);
    if (vitals.vMach) vitalsSummary.push(`Mạch: ${vitals.vMach} l/p`);
    if (vitals.vHATT && vitals.vHATTr) vitalsSummary.push(`HA: ${vitals.vHATT}/${vitals.vHATTr} mmHg`);
    if (vitals.vTho) vitalsSummary.push(`NT: ${vitals.vTho} l/p`);
    if (vitals.vSpo2) vitalsSummary.push(`SpO₂: ${vitals.vSpo2}%`);

    if (vitalsSummary.length > 0) {
      parts.push(`Sinh hiệu: ${vitalsSummary.join(', ')}.`);
    }

    if (results.length > 0) {
      parts.push(
        `Nghĩ nhiều đến ${results[0].b.ten} (${results[0].b.icd}) với độ phù hợp ${results[0].pct}%.`
      );
    }

    return parts.join(' ');
  }, [form, selected, derived, negated, vitals, results, kb]);

  // Handlers
  const handleRunAnalysis = () => {
    setCompletedSteps((prev) => new Set(prev).add('t1').add('t2'));
    if (results.length > 0) {
      setSelectedDiseaseId(results[0].b.id);
    }
    setCurrentTab('t2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (!confirm('Bạn có chắc muốn xóa tất cả dữ liệu bệnh án hiện tại để nhập ca mới?')) return;
    setForm({
      gioiTinh: 'nam',
      tuoi: '',
      ngheNghiep: '',
      lyDo: '',
      text: { cn: '', tt: '', tc: '', cls: '' },
    });
    setVitals({
      vNhiet: '',
      vMach: '',
      vHATT: '',
      vHATTr: '',
      vTho: '',
      vSpo2: '',
    });
    setLabs({
      lBC: '',
      lTC: '',
      lHct: '',
      lGlu: '',
      lTrop: '',
    });
    setSelected(new Set());
    setNegated(new Set());
    setCompletedSteps(new Set());
    setCurrentTab('t1');
  };

  const handleLoadSample = (sample: SampleCase) => {
    setForm({
      gioiTinh: sample.form.gioiTinh,
      tuoi: sample.form.tuoi,
      ngheNghiep: sample.form.ngheNghiep,
      lyDo: sample.form.lyDo,
      text: { ...sample.form.text },
    });
    if (sample.vitals) setVitals({ ...initialVitals, ...sample.vitals });
    if (sample.labs) setLabs({ ...initialLabs, ...sample.labs });
    if (sample.selected) setSelected(new Set(sample.selected));
    else if (sample.sel) setSelected(new Set(sample.sel));
    if (sample.negated) setNegated(new Set(sample.negated));
    else setNegated(new Set());
    setCompletedSteps(new Set(['t1', 't2']));
  };

  const handleExportCase = () => {
    const caseData = {
      version: 'medlens-1.0',
      timestamp: new Date().toISOString(),
      form,
      vitals,
      labs,
      selected: Array.from(selected),
      negated: Array.from(negated),
      summaryText,
    };
    const blob = new Blob([JSON.stringify(caseData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medlens-case-${new Date().toISOString().slice(0, 10)}.json`;
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
      } catch (err) {
        alert('File không hợp lệ: ' + (err as Error).message);
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
    setCompletedSteps((prev) => new Set(prev).add('t3'));
    setCurrentTab('t3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadRecordToState = (record: MedicalRecord) => {
    setForm((prev) => ({
      ...prev,
      tuoi: record.age ? String(record.age) : '',
      gioiTinh: (record.gender || 'nam') as any,
      lyDo: record.admissionReason || prev.lyDo,
      text: (record.freeTexts as any) || prev.text,
    }));
    if (record.vitals) setVitals((prev) => ({ ...prev, ...(record.vitals as any) }));
    if (record.labs) setLabs((prev) => ({ ...prev, ...(record.labs as any) }));
    if (record.selectedSymptoms) setSelected(new Set(record.selectedSymptoms));
    if (record.negatedSymptoms) setNegated(new Set(record.negatedSymptoms));
    if (record.primaryDiagnosis?.id) setSelectedDiseaseId(record.primaryDiagnosis.id);

    setCompletedSteps(new Set(['t1', 't2']));
    setCurrentTab('t2');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* App Header */}
      <Header
        kb={kb}
        onOpenKB={() => setCurrentTab('t4')}
        onOpenVault={(khoCode, query) => handleOpenVaultDrawer(undefined, query, khoCode)}
        onOpenRecords={() => setIsRecordsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onExportKB={handleExportKB}
      />

      {/* 4-Step Navigation */}
      <StepNav
        currentTab={currentTab}
        completedSteps={completedSteps}
        onSelectTab={setCurrentTab}
      />

      {/* Banner thông báo đang nạp Guideline từ EBM */}
      {activeGuidelineBanner && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 sm:px-6 py-2.5 shadow-sm border-b border-emerald-500 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="px-2 py-0.5 rounded bg-emerald-800/80 font-bold text-[11px] uppercase tracking-wide shrink-0 border border-emerald-400/40">
              EBM Linked · {activeGuidelineBanner.organization} {activeGuidelineBanner.year}
            </span>
            <div className="truncate">
              <span className="font-semibold text-emerald-100">Đang phân tích ca theo Guideline:</span>{' '}
              <span className="font-bold text-white">{activeGuidelineBanner.title}</span>
              {(activeGuidelineBanner.keyResults || activeGuidelineBanner.summary) && (
                <span className="hidden md:inline ml-2 text-emerald-100/80 italic text-xs">
                  — "{(activeGuidelineBanner.keyResults || activeGuidelineBanner.summary).slice(0, 90)}..."
                </span>
              )}
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
                  setCurrentTab('t3');
                } else {
                  setCurrentTab('t1');
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5">
        {currentTab === 'soap' && (
          <SoapExperienceBoard
            onOpenVaultDrawer={handleOpenVaultDrawer}
            onNavigateToAnalysis={() => {
              setCurrentTab('t1');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToProtocol={(diseaseId) => {
              if (diseaseId) setSelectedDiseaseId(diseaseId);
              setCurrentTab('t3');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 't1' && (
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
            onSaveToPostgres={() => setIsRecordsOpen(true)}
            summaryText={summaryText}
            onOpenVaultDrawer={handleOpenVaultDrawer}
          />
        )}

        {currentTab === 't2' && (
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
            onSaveToPostgres={() => setIsRecordsOpen(true)}
            onPrintReport={() => setIsPrintOpen(true)}
            onOpenVaultDrawer={handleOpenVaultDrawer}
          />
        )}

        {currentTab === 't3' && (
          <Step3Protocol
            kb={kb}
            selectedDiseaseId={selectedDiseaseId}
            onSelectDisease={setSelectedDiseaseId}
            onBackToAnalysis={() => setCurrentTab('t2')}
            onSaveToPostgres={() => setIsRecordsOpen(true)}
            onPrintReport={() => setIsPrintOpen(true)}
            onOpenVaultDrawer={handleOpenVaultDrawer}
            form={form}
            vitals={vitals}
            labs={labs}
          />
        )}

        {currentTab === 't4' && (
          <Step4KnowledgeBase
            kb={kb}
            onExportKB={handleExportKB}
            onImportKB={handleImportKB}
            onGoToProtocol={handleGoToProtocol}
            onOpenVaultDrawer={handleOpenVaultDrawer}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="h-9 bg-white border-t border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 text-xs text-slate-500 no-print">
        <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Supabase / Local Storage
            </span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span> Knowledge Vault 2.400+ EBM
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            CliniPortal DocSpace MedLens Pro · High Density Clinical Core · Chuẩn Bộ Y tế
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PatientRecordsModal
        isOpen={isRecordsOpen}
        onClose={() => setIsRecordsOpen(false)}
        onLoadRecordToState={handleLoadRecordToState}
        currentAnalysisData={{
          form,
          vitals,
          labs,
          selected,
          negated,
          results,
          summaryText,
        }}
      />

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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
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
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
