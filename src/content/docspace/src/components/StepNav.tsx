import React from 'react';
import { Check } from 'lucide-react';

export type ClinicalStepId = 't1' | 't2' | 't3' | 't4';

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
    { id: 't1', num: '1', title: '1. Nạp dữ kiện', subtitle: 'Lâm sàng · Dịch tễ · Cận lâm sàng' },
    { id: 't2', num: '2', title: '2. Tóm tắt & Đặt VĐ', subtitle: 'Tóm tắt BA · Vấn đề chính · Tam giác DTH' },
    { id: 't3', num: '3', title: '3. Phân tích & Biện luận', subtitle: 'Suy luận diễn dịch · Truyền nhiễm & Cấp cứu' },
    { id: 't4', num: '4', title: '4. Phác đồ điều trị', subtitle: 'Phân tầng xử trí · Y lệnh thuốc · EBM' },
  ];

  // Calculate progress percentage
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const progressPercent = Math.max(
    Math.round((completedSteps.size / steps.length) * 100),
    Math.round(((currentStepIndex + 1) / steps.length) * 100)
  );

  return (
    <nav
      role="navigation"
      aria-label="Quy trình 4 Bước Lâm Sàng"
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all no-print"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isDone = completedSteps.has(step.id);

          return (
            <React.Fragment key={step.id}>
              <button
                id={`step-btn-${step.id}`}
                type="button"
                onClick={() => onSelectStep(step.id)}
                aria-current={isActive ? 'step' : undefined}
                className={`group relative flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg transition-all text-left whitespace-nowrap cursor-pointer flex-1 min-w-[120px] sm:min-w-0 max-w-[340px] min-h-[44px] ${
                  isActive
                    ? 'bg-blue-50/90 border border-blue-200 shadow-xs text-blue-900 ring-1 ring-blue-500/30'
                    : 'hover:bg-slate-100/80 border border-slate-200/60 text-slate-600 bg-slate-50/50'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'border border-slate-300 text-slate-500 bg-white group-hover:border-slate-400'
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
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-semibold text-xs sm:text-sm truncate ${
                        isActive ? 'text-blue-950 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {step.title}
                    </span>
                    {isDone && (
                      <span className="hidden xl:inline text-[10px] font-mono-custom text-emerald-600 font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 truncate hidden md:block">
                    {step.subtitle}
                  </span>
                </div>
              </button>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div
                  className={`hidden sm:block w-4 sm:w-8 lg:w-12 h-[2px] transition-colors shrink-0 ${
                    completedSteps.has(steps[idx + 1].id) || isDone
                      ? 'bg-emerald-300'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dynamic Overall Progress Bar */}
      <div className="w-full h-[2.5px] bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </nav>
  );
};
