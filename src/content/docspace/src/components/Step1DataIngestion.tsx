import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Database,
  FileCheck,
  Trash2,
  Zap,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  SampleCase,
  VitalsState,
} from '../types.ts';
import { SampleCaseBar } from './step1/SampleCaseBar.tsx';
import { PatientInfoPanel } from './step1/PatientInfoPanel.tsx';
import { TextFreeEntryPanel } from './step1/TextFreeEntryPanel.tsx';
import { EpidemiologyPanel } from './step1/EpidemiologyPanel.tsx';
import { TopVaultsQuickBar } from './step1/TopVaultsQuickBar.tsx';
import { VitalsCardsPanel, VitalsStatusInfo } from './step1/VitalsCardsPanel.tsx';
import { LabsCardsPanel, LabsStatusInfo } from './step1/LabsCardsPanel.tsx';
import {
  ClinicalSelectorControl,
  CLINICAL_SYNDROME_PRESETS,
  SyndromePreset,
} from './step1/ClinicalSelectorControl.tsx';
import { SymptomCategorySection } from './step1/SymptomCategorySection.tsx';
import { ClinicalCopilotSidebar } from './step1/ClinicalCopilotSidebar.tsx';

// Re-export syndrome presets for backward compatibility
export { CLINICAL_SYNDROME_PRESETS, type SyndromePreset };

export interface Step1Props {
  kb: KnowledgeBase;
  form: ClinicalFormState;
  setForm: React.Dispatch<React.SetStateAction<ClinicalFormState>>;
  vitals: VitalsState;
  setVitals: React.Dispatch<React.SetStateAction<VitalsState>>;
  labs: LabsState;
  setLabs: React.Dispatch<React.SetStateAction<LabsState>>;
  selected: Set<string>;
  setSelected: React.Dispatch<React.SetStateAction<Set<string>>>;
  derived: Set<string>;
  setDerived: React.Dispatch<React.SetStateAction<Set<string>>>;
  negated: Set<string>;
  setNegated: React.Dispatch<React.SetStateAction<Set<string>>>;
  derivedVitalsList: string[];
  derivedLabsList: string[];
  liveResults: AnalysisResult[];
  onRunAnalysis: () => void;
  onReset: () => void;
  onLoadSample: (sample: SampleCase) => void;
  onExportCase: () => void;
  onImportCase: (file: File) => void;
  onSaveToPostgres: () => void;
  summaryText: string;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  epiContext?: EpidemiologyContext;
  onUpdateEpiContext?: (epi: EpidemiologyContext) => void;
}

export const Step1DataIngestion: React.FC<Step1Props> = ({
  kb,
  form,
  setForm,
  vitals,
  setVitals,
  labs,
  setLabs,
  selected,
  setSelected,
  derived,
  setDerived,
  negated,
  setNegated,
  derivedVitalsList,
  derivedLabsList,
  liveResults,
  onRunAnalysis,
  onReset,
  onLoadSample,
  onExportCase,
  onImportCase,
  onSaveToPostgres,
  summaryText,
  onOpenVaultDrawer,
  epiContext,
  onUpdateEpiContext,
}) => {
  // Filters & Interaction State
  const [chipFilter, setChipFilter] = useState('');
  const [activeOrganGroup, setActiveOrganGroup] = useState<string>('all');
  const [isRecording, setIsRecording] = useState<string | null>(null);
  const [dismissedQuestions, setDismissedQuestions] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState<'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected'>('all');
  const [activeSyndromeId, setActiveSyndromeId] = useState<string | null>(null);
  const [isMobileCopilotOpen, setIsMobileCopilotOpen] = useState(false);

  // Map of symptom id to display name with aliases & fallback
  const vocabMap = useMemo(() => {
    const map = new Map<string, string>();
    kb.trieuChung.forEach((t) => map.set(t.id, t.ten));
    map.set('dau_nguc_sau_xuong_uc', 'Đau thắt ngực sau xương ức');
    map.set('tang_huyet_ap', 'Tăng huyết áp');
    map.set('thc_tha', 'Tăng huyết áp');
    map.set('troponin', 'Troponin tăng');
    return map;
  }, [kb]);

  const resolveSymptomName = (id: string) => {
    if (vocabMap.has(id)) return vocabMap.get(id)!;
    return id.replace(/_/g, ' ');
  };

  const positiveSymptomsList = useMemo(() => {
    return Array.from(new Set([...selected, ...derived])).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [selected, derived, vocabMap]);

  const negativeSymptomsList = useMemo(() => {
    return Array.from(negated).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [negated, vocabMap]);

  const vitalsPills = useMemo(() => {
    const list: { label: string; value: string; unit?: string }[] = [];
    if (vitals.vMach) list.push({ label: 'Mạch', value: `${vitals.vMach}`, unit: 'l/p' });
    if (vitals.vHATT && vitals.vHATTr) list.push({ label: 'Huyết áp', value: `${vitals.vHATT}/${vitals.vHATTr}`, unit: 'mmHg' });
    if (vitals.vNhiet) list.push({ label: 'Nhiệt độ', value: `${vitals.vNhiet}`, unit: '°C' });
    if (vitals.vTho) list.push({ label: 'Nhịp thở', value: `${vitals.vTho}`, unit: 'l/p' });
    if (vitals.vSpo2) list.push({ label: 'SpO₂', value: `${vitals.vSpo2}`, unit: '%' });
    return list;
  }, [vitals]);

  // Available unique organ groups in the knowledge base
  const organGroups = useMemo(() => {
    const set = new Set<string>();
    kb.trieuChung.forEach((tc) => {
      if (tc.nhom) set.add(tc.nhom);
    });
    return Array.from(set);
  }, [kb]);

  // Toggle symptom state: unselected -> positive -> negative -> unselected
  const handleChipClick = (id: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    if (selected.has(id)) {
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else if (negated.has(id)) {
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setSelected((prev) => new Set(prev).add(id));
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Explicitly mark as negative (exclusion)
  const handleMarkNegative = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (negated.has(id)) {
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } else {
      setNegated((prev) => new Set(prev).add(id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Apply all recommended symptoms for a syndrome preset
  const handleApplySyndromePreset = (preset: SyndromePreset) => {
    setSelected((prev) => {
      const next = new Set(prev);
      preset.symptomIds.forEach((id) => next.add(id));
      return next;
    });
    setNegated((prev) => {
      const next = new Set(prev);
      preset.symptomIds.forEach((id) => next.delete(id));
      return next;
    });
  };

  // Clear all positive and negative selected symptoms
  const handleClearAllSelections = () => {
    setSelected(new Set());
    setNegated(new Set());
  };

  // Quick normal vitals preset
  const handleSetNormalVitals = () => {
    setVitals({
      vNhiet: '37.0',
      vMach: '76',
      vHATT: '120',
      vHATTr: '80',
      vTho: '16',
      vSpo2: '98',
    });
  };

  // Quick normal labs preset
  const handleSetNormalLabs = () => {
    setLabs({
      lBC: '7.5',
      lTC: '250',
      lHct: '42',
      lGlu: '5.4',
      lTrop: '8',
    });
  };

  // Speech Recognition Handler
  const handleStartVoice = (targetField: 'cn' | 'tt' | 'tc' | 'cls') => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Trình duyệt chưa hỗ trợ Web Speech API trực tiếp. Bạn có thể sử dụng Chrome/Edge hoặc dán văn bản.'
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(targetField);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setForm((prev) => ({
        ...prev,
        text: {
          ...prev.text,
          [targetField]: prev.text[targetField]
            ? prev.text[targetField] + ' ' + transcript
            : transcript,
        },
      }));
      setIsRecording(null);
    };

    recognition.onerror = () => {
      setIsRecording(null);
    };

    recognition.onend = () => {
      setIsRecording(null);
    };

    recognition.start();
  };

  // Suggestion questions answering
  const handleQuestionAnswer = (tcId: string, isYes: boolean) => {
    if (isYes) {
      setSelected((prev) => new Set(prev).add(tcId));
      setNegated((prev) => {
        const next = new Set(prev);
        next.delete(tcId);
        return next;
      });
    } else {
      setNegated((prev) => new Set(prev).add(tcId));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(tcId);
        return next;
      });
      setDismissedQuestions((prev) => new Set(prev).add(tcId));
    }
  };

  const removeNegated = (id: string) => {
    setNegated((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const countCategorySelected = (cat: 'cn' | 'tt' | 'tc' | 'cls') => {
    const ids = kb.trieuChung.filter((t) => t.loai.includes(cat)).map((t) => t.id);
    let count = 0;
    ids.forEach((id) => {
      if (selected.has(id) || derived.has(id)) count++;
    });
    return count;
  };

  const countCategoryNegated = (cat: 'cn' | 'tt' | 'tc' | 'cls') => {
    const ids = kb.trieuChung.filter((t) => t.loai.includes(cat)).map((t) => t.id);
    let count = 0;
    ids.forEach((id) => {
      if (negated.has(id)) count++;
    });
    return count;
  };

  // Top result for interactive clarifying questions
  const topResult = liveResults[0];
  const suggestedQuestions =
    topResult && topResult.pct > 20
      ? topResult.missing
          .filter(
            (m) =>
              (m.role === 'dt' || m.role === 'gy') &&
              !negated.has(m.tc.id) &&
              !dismissedQuestions.has(m.tc.id)
          )
          .slice(0, 3)
      : [];

  // Vitals threshold checks for visual gauge status
  const vitalsStatus: VitalsStatusInfo = useMemo(() => {
    const t = parseFloat(vitals.vNhiet);
    const m = parseFloat(vitals.vMach);
    const hatt = parseFloat(vitals.vHATT);
    const hattr = parseFloat(vitals.vHATTr);
    const nt = parseFloat(vitals.vTho);
    const spo2 = parseFloat(vitals.vSpo2);

    const isTempAbnormal = !isNaN(t) && (t >= 38.0 || t < 36.0);
    const isPulseAbnormal = !isNaN(m) && (m > 100 || m < 60);
    const isBPAbnormal = !isNaN(hatt) && (hatt >= 140 || hatt < 90 || (!isNaN(hattr) && hattr >= 90));
    const isRespAbnormal = !isNaN(nt) && (nt > 22 || nt < 12);
    const isSpo2Abnormal = !isNaN(spo2) && spo2 < 94;

    const criticalCount = [
      isTempAbnormal,
      isPulseAbnormal,
      isBPAbnormal,
      isRespAbnormal,
      isSpo2Abnormal,
    ].filter(Boolean).length;

    return {
      isTempAbnormal,
      isPulseAbnormal,
      isBPAbnormal,
      isRespAbnormal,
      isSpo2Abnormal,
      criticalCount,
    };
  }, [vitals]);

  // Labs threshold checks
  const labsStatus: LabsStatusInfo = useMemo(() => {
    const bc = parseFloat(labs.lBC);
    const tc = parseFloat(labs.lTC);
    const hct = parseFloat(labs.lHct);
    const glu = parseFloat(labs.lGlu);
    const trop = parseFloat(labs.lTrop);

    return {
      isBCAbnormal: !isNaN(bc) && (bc > 10 || bc < 4),
      isTCAbnormal: !isNaN(tc) && tc < 150,
      isHctAbnormal: !isNaN(hct) && (hct >= 45 || hct < 35),
      isGluAbnormal: !isNaN(glu) && (glu > 11.1 || glu < 3.9),
      isTropAbnormal: !isNaN(trop) && trop > 14,
    };
  }, [labs]);

  return (
    <div className="flex flex-col gap-4">
      {/* 0. Dedicated Compact Sample Case Bar */}
      <SampleCaseBar onLoadSample={onLoadSample} onReset={onReset} />

      {/* Top Clinical Navigation Bar, Tally & Vault Shortcuts */}
      <TopVaultsQuickBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        countCategorySelected={countCategorySelected}
        selectedCount={selected.size}
        derivedCount={derived.size}
        negatedCount={negated.size}
        onSetNormalVitals={handleSetNormalVitals}
        onRunAnalysis={onRunAnalysis}
        onOpenVaultDrawer={onOpenVaultDrawer}
      />

      {/* Main Grid: Left Ingestion Forms (8 cols) + Right Real-time Copilot (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Main Data Forms (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Quick NLP Paste & Transcription Hub */}
          {(activeSection === 'all' || activeSection === 'hc') && (
            <TextFreeEntryPanel
              form={form}
              setForm={setForm}
              kb={kb}
              setSelected={setSelected}
              summaryText={summaryText}
            />
          )}

          {/* Mục A: Hành chính & Lý do vào viện */}
          {(activeSection === 'all' || activeSection === 'hc') && (
            <PatientInfoPanel form={form} setForm={setForm} />
          )}

          {/* Mục Dịch Tễ Học (Tam Giác Chẩn Đoán Truyền Nhiễm) */}
          {(activeSection === 'all' || activeSection === 'hc') && (
            <EpidemiologyPanel
              epiContext={epiContext}
              onUpdateEpiContext={onUpdateEpiContext}
            />
          )}

          {/* Clinical Fast Selector & Orientation Control Center */}
          <ClinicalSelectorControl
            totalSymptomsCount={kb.trieuChung.length}
            activeSyndromeId={activeSyndromeId}
            setActiveSyndromeId={setActiveSyndromeId}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            selected={selected}
            derived={derived}
            negated={negated}
            chipFilter={chipFilter}
            setChipFilter={setChipFilter}
            activeOrganGroup={activeOrganGroup}
            setActiveOrganGroup={setActiveOrganGroup}
            organGroups={organGroups}
            onChipClick={handleChipClick}
            onMarkNegative={handleMarkNegative}
            onClearAllSelections={handleClearAllSelections}
            onApplySyndromePreset={handleApplySyndromePreset}
            resolveSymptomName={resolveSymptomName}
            countCategorySelected={countCategorySelected}
          />

          {/* Mục B: Triệu chứng cơ năng */}
          {(activeSection === 'all' || activeSection === 'cn' || (activeSection === 'selected' && (countCategorySelected('cn') + countCategoryNegated('cn') > 0))) && (
            <SymptomCategorySection
              category="cn"
              badgeLetter="B"
              title="TCCN — Triệu chứng cơ năng (Chủ quan / Subjective)"
              subtitle="Cảm nhận và phàn nàn trực tiếp từ người bệnh hoặc người nhà"
              placeholder="Ghi chú bệnh sử tự do (khởi phát, tính chất cơn đau, yếu tố tăng/giảm, triệu chứng kèm theo...)"
              textValue={form.text.cn}
              onTextChange={(val) => setForm((prev) => ({ ...prev, text: { ...prev.text, cn: val } }))}
              isRecording={isRecording === 'cn'}
              onStartVoice={() => handleStartVoice('cn')}
              selectedCount={countCategorySelected('cn')}
              kb={kb}
              activeOrganGroup={activeOrganGroup}
              activeSyndromeId={activeSyndromeId}
              activeSection={activeSection}
              selected={selected}
              derived={derived}
              negated={negated}
              chipFilter={chipFilter}
              onChipClick={handleChipClick}
              onMarkNegative={handleMarkNegative}
            />
          )}

          {/* Mục C: Triệu chứng thực thể & Dấu hiệu sinh tồn */}
          {(activeSection === 'all' || activeSection === 'tt' || (activeSection === 'selected' && (countCategorySelected('tt') + countCategoryNegated('tt') > 0))) && (
            <SymptomCategorySection
              category="tt"
              badgeLetter="C"
              title="TCTT & DHST — Thực thể & Sinh hiệu (Khách quan / Objective)"
              subtitle="Thăm khám LS, quan sát trực tiếp và đo lường DHST"
              placeholder="Khám các cơ quan khác (nghe tim, rì rào phế nang, điểm đau khu trú, dấu kích thích phúc mạc, tri giác, Glasgow...)"
              textValue={form.text.tt}
              onTextChange={(val) => setForm((prev) => ({ ...prev, text: { ...prev.text, tt: val } }))}
              isRecording={isRecording === 'tt'}
              onStartVoice={() => handleStartVoice('tt')}
              selectedCount={countCategorySelected('tt')}
              kb={kb}
              activeOrganGroup={activeOrganGroup}
              activeSyndromeId={activeSyndromeId}
              activeSection={activeSection}
              selected={selected}
              derived={derived}
              negated={negated}
              chipFilter={chipFilter}
              onChipClick={handleChipClick}
              onMarkNegative={handleMarkNegative}
            >
              <VitalsCardsPanel
                vitals={vitals}
                setVitals={setVitals}
                vitalsStatus={vitalsStatus}
                derivedVitalsList={derivedVitalsList}
              />
            </SymptomCategorySection>
          )}

          {/* Mục D: Tiền căn */}
          {(activeSection === 'all' || activeSection === 'tc' || (activeSection === 'selected' && (countCategorySelected('tc') + countCategoryNegated('tc') > 0))) && (
            <SymptomCategorySection
              category="tc"
              badgeLetter="D"
              title="TC — Tiền căn bệnh lý, Dị ứng & Yếu tố nguy cơ"
              subtitle="Bệnh nền mạn tính, tiền căn phẫu thuật, dùng thuốc kéo dài và tiền sử gia đình"
              placeholder="Tiền căn dùng thuốc, dị ứng thuốc/thức ăn, tiền căn sản khoa, lối sống (hút thuốc lá gói-năm, bia rượu...)"
              textValue={form.text.tc}
              onTextChange={(val) => setForm((prev) => ({ ...prev, text: { ...prev.text, tc: val } }))}
              isRecording={isRecording === 'tc'}
              onStartVoice={() => handleStartVoice('tc')}
              selectedCount={countCategorySelected('tc')}
              kb={kb}
              activeOrganGroup={activeOrganGroup}
              activeSyndromeId={activeSyndromeId}
              activeSection={activeSection}
              selected={selected}
              derived={derived}
              negated={negated}
              chipFilter={chipFilter}
              onChipClick={handleChipClick}
              onMarkNegative={handleMarkNegative}
            />
          )}

          {/* Mục E: Cận lâm sàng có sẵn */}
          {(activeSection === 'all' || activeSection === 'cls' || (activeSection === 'selected' && (countCategorySelected('cls') + countCategoryNegated('cls') > 0))) && (
            <SymptomCategorySection
              category="cls"
              badgeLetter="E"
              title="CLS — Cận lâm sàng & Xét nghiệm tại chỗ"
              subtitle="Kết quả TPTTBM, sinh hóa máu, men tim cấp và chẩn đoán hình ảnh (XQ/SA/CT) đã có"
              placeholder="Kết quả hình ảnh học hoặc CLS khác: ECG (ST chênh lên ở đạo trình nào), XQ ngực thẳng, SA tim/bụng tổng quát, CT scan, KMĐM..."
              textValue={form.text.cls}
              onTextChange={(val) => setForm((prev) => ({ ...prev, text: { ...prev.text, cls: val } }))}
              isRecording={isRecording === 'cls'}
              onStartVoice={() => handleStartVoice('cls')}
              selectedCount={countCategorySelected('cls')}
              kb={kb}
              activeOrganGroup={activeOrganGroup}
              activeSyndromeId={activeSyndromeId}
              activeSection={activeSection}
              selected={selected}
              derived={derived}
              negated={negated}
              chipFilter={chipFilter}
              onChipClick={handleChipClick}
              onMarkNegative={handleMarkNegative}
            >
              <LabsCardsPanel
                labs={labs}
                setLabs={setLabs}
                labsStatus={labsStatus}
                derivedLabsList={derivedLabsList}
                onSetNormalLabs={handleSetNormalLabs}
                onOpenVaultDrawer={onOpenVaultDrawer}
              />
            </SymptomCategorySection>
          )}

          {/* Review Mode Empty State when in 'selected' tab but nothing selected */}
          {activeSection === 'selected' && (selected.size + derived.size + negated.size) === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-lg p-8 text-center shadow-xs">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
              <h3 className="text-sm font-bold text-slate-700">Chưa có dữ kiện lâm sàng nào được chọn</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Bác sĩ có thể định hướng nhanh bằng cách bấm chọn một trong các <strong>Bệnh cảnh lâm sàng gợi ý</strong> phía trên, hoặc chuyển sang các tab <strong>[B. Cơ năng]</strong>, <strong>[C. Thực thể]</strong>, <strong>[D. Tiền căn]</strong>, <strong>[E. Cận lâm sàng]</strong> để tick chọn dữ kiện.
              </p>
              <button
                type="button"
                onClick={() => setActiveSection('all')}
                className="mt-3.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Xem tất cả phân đoạn
              </button>
            </div>
          )}

          {/* Action Controls Footer */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="btn-run-analysis"
                onClick={onRunAnalysis}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Tiến hành phân tích & lập phác đồ (Bước 2)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              <button
                id="btn-reset-form"
                onClick={onReset}
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-md transition-all cursor-pointer shadow-xs"
                title="Làm mới ca / Xóa form"
                aria-label="Làm mới ca"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-save-postgres-footer"
                onClick={onSaveToPostgres}
                className="w-9 h-9 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md transition-all cursor-pointer shadow-xs"
                title="Lưu ca vào CSDL / In bệnh án"
                aria-label="Lưu ca vào CSDL"
              >
                <Database className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Real-time Clinical Copilot & Diagnostic Radar (Col 9-12 on Desktop, Sheet on Mobile) */}
        <div className="hidden lg:block lg:col-span-4">
          <ClinicalCopilotSidebar
            liveResults={liveResults}
            suggestedQuestions={suggestedQuestions}
            topResult={topResult}
            onQuestionAnswer={handleQuestionAnswer}
            positiveSymptomsList={positiveSymptomsList}
            negativeSymptomsList={negativeSymptomsList}
            vitalsPills={vitalsPills}
            onChipClick={handleChipClick}
            onRemoveNegated={removeNegated}
            onClearAllSelections={handleClearAllSelections}
            onRunAnalysis={onRunAnalysis}
            onSaveToPostgres={onSaveToPostgres}
            onExportCase={onExportCase}
            onImportCase={onImportCase}
            onReset={onReset}
          />
        </div>
      </div>

      {/* Mobile Floating Diagnostic & Quick CTA Bar (Chỉ hiện trên màn hình < 1024px) */}
      <div className="fixed bottom-16 inset-x-2.5 z-30 lg:hidden pointer-events-none no-print">
        <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-xl p-2 px-3 shadow-xl border border-slate-700/60 flex items-center justify-between gap-2 pointer-events-auto animate-slide-up">
          {/* Top diagnostic preview */}
          <button
            type="button"
            onClick={() => setIsMobileCopilotOpen(true)}
            className="flex items-center gap-2 overflow-hidden text-left cursor-pointer min-h-[40px] flex-1 mr-1"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/90 text-white flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-current text-yellow-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Định hướng CDSS ({liveResults.length})
              </div>
              <div className="text-xs font-bold truncate text-white">
                {topResult ? `${topResult.b.ten} (${topResult.pct}%)` : 'Chờ nạp dữ kiện'}
              </div>
            </div>
          </button>

          {/* Quick CTA to Step 2 */}
          <button
            type="button"
            onClick={onRunAnalysis}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg font-bold text-xs shrink-0 shadow-xs cursor-pointer min-h-[40px]"
          >
            <span>Bước 2</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Copilot Bottom Sheet Modal */}
      {isMobileCopilotOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileCopilotOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-slate-50 rounded-t-2xl shadow-2xl border-t border-slate-200 p-4 max-h-[85vh] overflow-y-auto animate-slide-up z-10 select-none pb-safe">
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500 fill-current" />
                <h3 className="text-sm font-bold text-slate-800">Trợ Thủ CDSS & Radar Chẩn Đoán</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileCopilotOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ClinicalCopilotSidebar
              liveResults={liveResults}
              suggestedQuestions={suggestedQuestions}
              topResult={topResult}
              onQuestionAnswer={handleQuestionAnswer}
              positiveSymptomsList={positiveSymptomsList}
              negativeSymptomsList={negativeSymptomsList}
              vitalsPills={vitalsPills}
              onChipClick={handleChipClick}
              onRemoveNegated={removeNegated}
              onClearAllSelections={handleClearAllSelections}
              onRunAnalysis={() => {
                setIsMobileCopilotOpen(false);
                onRunAnalysis();
              }}
              onSaveToPostgres={onSaveToPostgres}
              onExportCase={onExportCase}
              onImportCase={onImportCase}
              onReset={onReset}
            />
          </div>
        </div>
      )}
    </div>
  );
};
