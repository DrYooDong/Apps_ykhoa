import React from 'react';
import { Check } from 'lucide-react';

export type ClinicalStepId = 't1' | 't2' | 't3';

interface StepNavProps {
  currentStep: ClinicalStepId;
  completedSteps: Set<ClinicalStepId>;
  onSelectStep: (step: ClinicalStepId) => void;
}

export const StepNav: React.FC<StepNavProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
}) => {
  const steps: { id: ClinicalStepId; num: string; title: string; subtitle: string }[] = [
    { id: 't1', num: '1', title: '1. Nạp dữ kiện', subtitle: 'Sinh hiệu · Cận lâm sàng · Triệu chứng' },
    { id: 't2', num: '2', title: '2. Phân tích & Biện luận', subtitle: 'Suy luận diễn dịch · Bệnh cấp cứu · Phân biệt' },
    { id: 't3', num: '3', title: '3. Phác đồ điều trị', subtitle: 'Phân tầng xử trí · Y lệnh thuốc · EBM Pathway' },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6 overflow-x-auto no-scrollbar">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isDone = completedSteps.has(step.id);

          return (
            <React.Fragment key={step.id}>
              <button
                id={`step-btn-${step.id}`}
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-3 px-3.5 py-2 rounded-lg transition-all text-left whitespace-nowrap cursor-pointer flex-1 max-w-[340px] ${
                  isActive
                    ? 'bg-blue-50/90 border border-blue-200 shadow-xs text-blue-900 ring-1 ring-blue-500/20'
                    : 'hover:bg-slate-100/80 border border-slate-200/60 text-slate-600 bg-slate-50/50'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'border border-slate-300 text-slate-500 bg-white'
                  }`}
                >
                  {isDone && !isActive ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="flex flex-col leading-tight min-w-0">
                  <span
                    className={`font-semibold text-xs sm:text-sm truncate ${
                      isActive ? 'text-blue-950 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate hidden md:block">
                    {step.subtitle}
                  </span>
                </div>
              </button>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="hidden sm:block w-6 sm:w-12 h-[2px] bg-slate-200 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
