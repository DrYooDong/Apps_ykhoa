import React from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const steps: { id: ClinicalStepId; num: string; title: string; subtitle: string; shortTitle: string }[] = [
    { id: 't1', num: '1', title: '1. Nạp dữ kiện', subtitle: 'LS · Dịch tễ · CLS', shortTitle: 'Nạp dữ kiện' },
    { id: 't2', num: '2', title: '2. Tóm tắt & Đặt VĐ', subtitle: 'Tóm tắt BA · Vấn đề chính · DTH', shortTitle: 'Tóm tắt & Vấn đề' },
    { id: 't3', num: '3', title: '3. Phân tích & Biện luận', subtitle: 'Biện luận LS · CĐSB / CĐPB', shortTitle: 'Phân tích CDSS' },
    { id: 't4', num: '4', title: '4. Phác đồ ĐT', subtitle: 'Phân tầng XT · Y lệnh ĐT · EBM', shortTitle: 'Phác đồ điều trị' },
  ];

  // Calculate progress percentage
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const activeStepObj = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.max(
    Math.round((completedSteps.size / steps.length) * 100),
    Math.round(((currentStepIndex + 1) / steps.length) * 100)
  );

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      onSelectStep(steps[currentStepIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      onSelectStep(steps[currentStepIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Quy trình 4 Bước Lâm Sàng"
      className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all no-print select-none"
    >
      {/* 1. MÀN HÌNH DI ĐỘNG (< 640px): Compact Stepper với Dot Navigator & Step Carousel */}
      <div className="flex sm:hidden items-center justify-between px-3 py-1.5 min-h-[46px]">
        {/* Nút lùi bước */}
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStepIndex === 0}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center ${
            currentStepIndex === 0
              ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'border-slate-200 text-slate-700 active:bg-slate-100'
          }`}
          aria-label="Bước trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Trung tâm: 4 Dots + Tiêu đề bước hiện tại */}
        <div className="flex flex-col items-center justify-center px-1">
          {/* 4 Dots Stepper */}
          <div className="flex items-center gap-2 mb-0.5">
            {steps.map((step, idx) => {
              const isActive = currentStep === step.id;
              const isDone = completedSteps.has(step.id);
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    onSelectStep(step.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`transition-all rounded-full flex items-center justify-center cursor-pointer min-h-[28px] min-w-[28px] ${
                    isActive
                      ? 'w-7 h-7 bg-blue-600 text-white font-bold text-xs shadow-xs ring-2 ring-blue-300'
                      : isDone
                      ? 'w-5 h-5 bg-emerald-100 text-emerald-700 text-[10px] font-semibold border border-emerald-300'
                      : 'w-5 h-5 bg-slate-100 text-slate-400 text-[10px] border border-slate-200'
                  }`}
                  aria-label={`Bước ${step.num}: ${step.title}`}
                >
                  {isDone && !isActive ? (
                    <Check className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Step Label */}
          <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
            <span>Bước {activeStepObj.num}:</span>
            <span className="text-slate-800 font-semibold">{activeStepObj.shortTitle}</span>
          </div>
        </div>

        {/* Nút tiến bước */}
        <button
          type="button"
          onClick={handleNextStep}
          disabled={currentStepIndex === steps.length - 1}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center ${
            currentStepIndex === steps.length - 1
              ? 'opacity-30 border-slate-200 text-slate-400 cursor-not-allowed'
              : 'border-blue-200 bg-blue-50 text-blue-700 active:bg-blue-100'
          }`}
          aria-label="Bước tiếp theo"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. MÀN HÌNH TABLET & DESKTOP (>= 640px): Standard Expanded Stepper */}
      <div className="hidden sm:flex max-w-6xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
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

