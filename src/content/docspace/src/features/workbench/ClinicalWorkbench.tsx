import React, { useMemo, useState } from 'react';
import { Brain, ClipboardList, Pill, Stethoscope } from 'lucide-react';
import { buildInfoGainReport } from '../../engines/infoGainAdvisor.ts';
import { computeTriageSummary } from '../../engines/triageRiskEngine.ts';
import { analyzeClinicalCase, computeAllDerived } from '../../lib/clinicalEngine.ts';
import {
  KnowledgeBase,
  SoapClinicalExperience,
} from '../../types.ts';
import {
  ClinicalCaseSession,
  DocSpaceMode,
  ProgressiveRevealStage,
  WorkbenchPanelTab,
} from '../../schemas/docspaceV2.ts';
import { LiveTriageStrip } from './LiveTriageStrip.tsx';
import { MultiCaseSessionBar } from './MultiCaseSessionBar.tsx';
import { SmartIntakePanel } from './SmartIntakePanel.tsx';
import { ProblemTrainerPanel } from './ProblemTrainerPanel.tsx';
import { ReasoningStudioPanel } from './ReasoningStudioPanel.tsx';
import { ProtocolOrderSandboxPanel } from './ProtocolOrderSandboxPanel.tsx';

interface ClinicalWorkbenchProps {
  kb: KnowledgeBase;
  mode: DocSpaceMode;
  sessions: ClinicalCaseSession[];
  activeSession: ClinicalCaseSession;
  linkedSoapCase?: SoapClinicalExperience;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onCloseSession: (id: string) => void;
  onUpdateSession: (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => void;
  onSetRevealStage: (stage: ProgressiveRevealStage) => void;
  onExportJson: (anonymize: boolean) => void;
  onImportJson: (raw: string) => void;
  onResetSession: () => void;
  onOpenPrintReport: () => void;
}

export const ClinicalWorkbench: React.FC<ClinicalWorkbenchProps> = ({
  kb,
  mode,
  sessions,
  activeSession,
  linkedSoapCase,
  onSelectSession,
  onNewSession,
  onCloseSession,
  onUpdateSession,
  onSetRevealStage,
  onExportJson,
  onImportJson,
  onResetSession,
  onOpenPrintReport,
}) => {
  const [rightTab, setRightTab] = useState<WorkbenchPanelTab>('problems');
  const [mobilePane, setMobilePane] = useState<'intake' | WorkbenchPanelTab>('intake');

  const selectedSet = useMemo(() => new Set(activeSession.selectedSymptoms), [activeSession.selectedSymptoms]);
  const negatedSet = useMemo(() => new Set(activeSession.negatedSymptoms), [activeSession.negatedSymptoms]);

  const derivedInfo = useMemo(
    () =>
      computeAllDerived(
        kb,
        activeSession.vitals,
        activeSession.labs,
        activeSession.form.gioiTinh,
        selectedSet
      ),
    [kb, activeSession.vitals, activeSession.labs, activeSession.form.gioiTinh, selectedSet]
  );

  const triage = useMemo(
    () => computeTriageSummary(activeSession.form, activeSession.vitals, activeSession.labs),
    [activeSession.form, activeSession.vitals, activeSession.labs]
  );

  const primaryProblem = useMemo(
    () => activeSession.userProblems.find((p) => p.isPrimary),
    [activeSession.userProblems]
  );

  const results = useMemo(
    () =>
      analyzeClinicalCase(
        kb,
        activeSession.form,
        selectedSet,
        derivedInfo.derived,
        negatedSet,
        activeSession.epiContext,
        primaryProblem,
        activeSession.userProblems
      ),
    [
      kb,
      activeSession.form,
      selectedSet,
      derivedInfo.derived,
      negatedSet,
      activeSession.epiContext,
      primaryProblem,
      activeSession.userProblems,
    ]
  );

  const infoGain = useMemo(
    () => buildInfoGainReport(results, activeSession.form, triage),
    [results, activeSession.form, triage]
  );

  const handleToggleSymptomFromPrompt = (symptomId: string, toggleMode: 'pos' | 'neg') => {
    onUpdateSession((prev) => {
      const pos = new Set(prev.selectedSymptoms);
      const neg = new Set(prev.negatedSymptoms);
      if (toggleMode === 'pos') {
        pos.add(symptomId);
        neg.delete(symptomId);
      } else {
        neg.add(symptomId);
        pos.delete(symptomId);
      }
      return { ...prev, selectedSymptoms: Array.from(pos), negatedSymptoms: Array.from(neg) };
    });
  };

  const handleSelectDiseaseForProtocol = (diseaseId: string) => {
    onUpdateSession((prev) => ({ ...prev, selectedDiseaseId: diseaseId, activeBranchId: null }));
    setRightTab('protocol');
    setMobilePane('protocol');
  };

  const tabItems: Array<{ id: WorkbenchPanelTab; label: string; icon: React.ReactNode }> = [
    { id: 'problems', label: '1. Tóm tắt & Đặt VĐ', icon: <ClipboardList className="w-3.5 h-3.5" /> },
    { id: 'reasoning', label: '2. Biện luận CĐ', icon: <Brain className="w-3.5 h-3.5" /> },
    { id: 'protocol', label: '3. Phác đồ & Y lệnh', icon: <Pill className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={`space-y-3 ${mode === 'teaching' ? 'text-[15px]' : ''}`}>
      {/* Multi-Case Tabs & Progressive Mode Bar */}
      <MultiCaseSessionBar
        sessions={sessions}
        activeSession={activeSession}
        onSelectSession={onSelectSession}
        onNewSession={onNewSession}
        onCloseSession={onCloseSession}
        onSetRevealStage={onSetRevealStage}
        onToggleProgressiveMode={() =>
          onUpdateSession((prev) => ({
            ...prev,
            progressiveMode: !prev.progressiveMode,
            revealStage: !prev.progressiveMode ? 1 : 4,
          }))
        }
        onExportJson={onExportJson}
        onImportJson={onImportJson}
        onResetSession={onResetSession}
      />

      {/* Persistent Live Safety & Triage Strip */}
      <LiveTriageStrip triage={triage} />

      {/* Mobile Pane Switcher (< lg) */}
      <div className="lg:hidden grid grid-cols-4 gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
        <button
          type="button"
          onClick={() => setMobilePane('intake')}
          className={`py-2 min-h-[44px] rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
            mobilePane === 'intake' ? 'bg-[#087f9c] text-white' : 'text-slate-600 dark:text-slate-300'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Dữ kiện</span>
        </button>
        {tabItems.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setMobilePane(t.id);
              setRightTab(t.id);
            }}
            className={`py-2 min-h-[44px] rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
              mobilePane === t.id ? 'bg-[#087f9c] text-white' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {t.icon}
            <span className="truncate px-1">{t.label.replace(/^\d\.\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* Main Split Workbench (Desktop 5/12 Left Intake + 7/12 Right Studio) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className={`lg:col-span-5 ${mobilePane === 'intake' ? 'block' : 'hidden lg:block'}`}>
          <SmartIntakePanel
            kb={kb}
            session={activeSession}
            derivedIds={derivedInfo.derived}
            onChangeSession={onUpdateSession}
            onUnlockStage={onSetRevealStage}
          />
        </div>

        <div className={`lg:col-span-7 space-y-3 ${mobilePane !== 'intake' ? 'block' : 'hidden lg:block'}`}>
          {/* Desktop 3-Tab Horizontal Switcher */}
          <div className="hidden lg:grid grid-cols-3 gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 shadow-2xs">
            {tabItems.map((t) => {
              const active = rightTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setRightTab(t.id)}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#087f9c] text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {rightTab === 'problems' && (
            <ProblemTrainerPanel
              kb={kb}
              session={activeSession}
              derivedIds={derivedInfo.derived}
              triage={triage}
              linkedSoapCase={linkedSoapCase}
              onChangeSession={onUpdateSession}
              onGoToReasoning={() => {
                setRightTab('reasoning');
                setMobilePane('reasoning');
              }}
            />
          )}

          {rightTab === 'reasoning' && (
            <ReasoningStudioPanel
              results={results}
              infoGain={infoGain}
              session={activeSession}
              linkedSoapCase={linkedSoapCase}
              onChangeSession={onUpdateSession}
              onToggleSymptomFromPrompt={handleToggleSymptomFromPrompt}
              onSelectDiseaseForProtocol={handleSelectDiseaseForProtocol}
              onUnlockStage={onSetRevealStage}
            />
          )}

          {rightTab === 'protocol' && (
            <ProtocolOrderSandboxPanel
              kb={kb}
              session={activeSession}
              fallbackDiseaseId={results[0]?.b.id || null}
              linkedSoapCase={linkedSoapCase}
              onChangeSession={onUpdateSession}
              onOpenPrintReport={onOpenPrintReport}
            />
          )}
        </div>
      </div>
    </div>
  );
};
