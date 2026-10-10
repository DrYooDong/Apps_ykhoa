import React, { useState } from 'react';
import {
  SelectionWizardState,
  Population,
  InfectionSite,
  SepsisSource,
  SpecificPathogenRisk,
  ClinicalResponseStatus,
  CultureStatus,
  SusceptibilityStatus
} from '../../selection/types';
import { classifyRiskGroup } from '../../selection/engine';
import { StepIndication } from './StepIndication';
import { StepSite } from './StepSite';
import { StepRisk } from './StepRisk';
import { StepEmpiric } from './StepEmpiric';
import { StepReassess } from './StepReassess';
import { DecisionSummaryCard } from './DecisionSummaryCard';

interface SelectionWizardProps {
  onSelectDrugForDosing: (drugId?: string) => void;
}

export const SelectionWizard: React.FC<SelectionWizardProps> = ({
  onSelectDrugForDosing
}) => {
  // Wizard State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [indicationConfirmed, setIndicationConfirmed] = useState<boolean>(true);
  const [checkedNhsnIds, setCheckedNhsnIds] = useState<string[]>([
    'pneu_fever',
    'pneu_wbc',
    'pneu_new_infiltrate',
    'pneu_purulent_sputum'
  ]);
  const [population, setPopulation] = useState<Population>('adult');
  const [site, setSite] = useState<InfectionSite>('respiratory');
  const [sepsisSource, setSepsisSource] = useState<SepsisSource | undefined>(undefined);
  const [checkedGeneralRiskIds, setCheckedGeneralRiskIds] = useState<string[]>([]);
  const [sofaScore, setSofaScore] = useState<number>(0);
  const [psofaScore, setPsofaScore] = useState<number>(0);
  const [clifSofaScore, setClifSofaScore] = useState<number>(0);
  const [isChronicLiverDisease, setIsChronicLiverDisease] = useState<boolean>(false);
  const [checkedSpecificRisks, setCheckedSpecificRisks] = useState<SpecificPathogenRisk[]>([]);

  // 48-72h State
  const [clinicalResponse, setClinicalResponse] = useState<ClinicalResponseStatus>('improved');
  const [cultureStatus, setCultureStatus] = useState<CultureStatus>('pending');
  const [susceptibilityStatus, setSusceptibilityStatus] = useState<SusceptibilityStatus>('sensitive');
  const [daysOnAntibiotic, setDaysOnAntibiotic] = useState<number>(3);

  // Toggle helpers
  const handleToggleNhsnId = (id: string) => {
    setCheckedNhsnIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleGeneralRisk = (id: string) => {
    setCheckedGeneralRiskIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleSpecificRisk = (risk: SpecificPathogenRisk) => {
    setCheckedSpecificRisks(prev =>
      prev.includes(risk) ? prev.filter(x => x !== risk) : [...prev, risk]
    );
  };

  // Tính toán Risk Group dựa trên engine
  const activeSeverity = {
    scoreType: population === 'pediatric' ? ('psofa' as const) : isChronicLiverDisease ? ('clif_sofa' as const) : ('sofa' as const),
    scoreValue: population === 'pediatric' ? psofaScore : isChronicLiverDisease ? clifSofaScore : sofaScore
  };

  const riskResult = classifyRiskGroup(
    checkedGeneralRiskIds,
    activeSeverity,
    population,
    checkedSpecificRisks
  );

  // Compile wizard state object for DecisionSummaryCard
  const wizardState: SelectionWizardState = {
    currentStep,
    indicationConfirmed,
    nhsnCheckedIds: checkedNhsnIds,
    population,
    site,
    sepsisSource,
    checkedGeneralRiskIds,
    sofaScore,
    psofaScore,
    clifSofaScore,
    isChronicLiverDisease,
    checkedSpecificRisks,
    clinicalResponse,
    cultureStatus,
    susceptibilityStatus,
    checkedStopCriteriaIds: [],
    checkedIvToPoCriteriaIds: [],
    daysOnAntibiotic
  };

  // Steps definition for top stepper
  const stepsList = [
    { num: 1, title: 'Chỉ định & NHSN', subtitle: 'Bắt đầu' },
    { num: 2, title: 'Vị trí & Dân số', subtitle: 'Ổ nhiễm' },
    { num: 3, title: 'Phân tầng Nguy cơ', subtitle: 'Nhóm 1 / 2' },
    { num: 4, title: 'Phác đồ Khởi đầu', subtitle: 'Antibiogram' },
    { num: 5, title: 'Đánh giá 48-72h', subtitle: 'Xuống thang & Ngưng' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stepper Indicator */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="grid grid-cols-5 gap-2">
          {stepsList.map(step => {
            const isActive = currentStep === step.num;
            const isPassed = currentStep > step.num;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num as 1 | 2 | 3 | 4 | 5)}
                className={`text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20'
                    : isPassed
                    ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                    : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/20 text-slate-400 dark:text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span
                    className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isPassed ? '✓' : step.num}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 hidden sm:inline">
                    {step.subtitle}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Wizard Step Content (Left) + Summary Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Step Views */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <StepIndication
              indicationConfirmed={indicationConfirmed}
              onConfirmIndication={setIndicationConfirmed}
              checkedNhsnIds={checkedNhsnIds}
              onToggleNhsnId={handleToggleNhsnId}
              onNextStep={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <StepSite
              population={population}
              onSelectPopulation={setPopulation}
              site={site}
              onSelectSite={setSite}
              sepsisSource={sepsisSource}
              onSelectSepsisSource={setSepsisSource}
              onNextStep={() => setCurrentStep(3)}
              onPrevStep={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepRisk
              population={population}
              site={site}
              checkedGeneralRiskIds={checkedGeneralRiskIds}
              onToggleGeneralRisk={handleToggleGeneralRisk}
              sofaScore={sofaScore}
              onSofaChange={setSofaScore}
              psofaScore={psofaScore}
              onPsofaChange={setPsofaScore}
              clifSofaScore={clifSofaScore}
              onClifSofaChange={setClifSofaScore}
              isChronicLiverDisease={isChronicLiverDisease}
              onToggleChronicLiver={setIsChronicLiverDisease}
              checkedSpecificRisks={checkedSpecificRisks}
              onToggleSpecificRisk={handleToggleSpecificRisk}
              riskResult={riskResult}
              onNextStep={() => setCurrentStep(4)}
              onPrevStep={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <StepEmpiric
              site={site}
              population={population}
              riskGroup={riskResult.group}
              sepsisSource={sepsisSource}
              specificRisks={checkedSpecificRisks}
              onSelectDrugForDosing={(drugId) => onSelectDrugForDosing(drugId)}
              onNextStep={() => setCurrentStep(5)}
              onPrevStep={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <StepReassess
              site={site}
              onSelectDrugForDosing={(drugId) => onSelectDrugForDosing(drugId)}
              onPrevStep={() => setCurrentStep(4)}
            />
          )}
        </div>

        {/* Right Column (1 Col): Sticky Summary Card */}
        <div className="lg:col-span-1">
          <DecisionSummaryCard
            state={wizardState}
            riskResult={riskResult}
            onNavigateStep={(s) => setCurrentStep(s)}
            onSwitchToDosing={(drugId) => onSelectDrugForDosing(drugId)}
          />
        </div>
      </div>
    </div>
  );
};
