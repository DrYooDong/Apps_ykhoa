import React from 'react';
import { Check } from 'lucide-react';

export type TabId = 'soap' | 't1' | 't2' | 't3' | 't4';

interface StepNavProps {
  currentTab: TabId;
  completedSteps: Set<TabId>;
  onSelectTab: (tab: TabId) => void;
}

export const StepNav: React.FC<StepNavProps> = ({
  currentTab,
  completedSteps,
  onSelectTab,
}) => {
  const steps: { id: TabId; num: string; title: string; subtitle: string }[] = [
    { id: 'soap', num: 'S', title: '1. Sổ tay SOAP', subtitle: 'S · O · A · P · Đúc kết ca bệnh' },
    { id: 't1', num: '2', title: '2. Nạp dữ kiện', subtitle: 'Sinh hiệu · Xét nghiệm · Triệu chứng' },
    { id: 't2', num: '3', title: '3. Phân tích lâm sàng', subtitle: 'Chẩn đoán sơ bộ · Phân biệt' },
    { id: 't3', num: '4', title: '4. Phác đồ điều trị', subtitle: 'Xử trí cấp cứu · Y lệnh · Chuyển viện' },
    { id: 't4', num: '5', title: '5. Kho tri thức', subtitle: 'Nền tảng bằng chứng & 2.400+ bài' },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
        {steps.map((step, idx) => {
          const isActive = currentTab === step.id;
          const isDone = completedSteps.has(step.id);

          return (
            <React.Fragment key={step.id}>
              <button
                id={`step-btn-${step.id}`}
                onClick={() => onSelectTab(step.id)}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all text-left whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 border border-blue-200 shadow-xs text-blue-900'
                    : 'hover:bg-slate-100 border border-transparent text-slate-600'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-colors shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'border border-slate-300 text-slate-500 bg-white'
                  }`}
                >
                  {isDone && !isActive && step.id !== 't4' ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="flex flex-col leading-tight">
                  <span
                    className={`font-semibold text-xs sm:text-sm ${
                      isActive ? 'text-blue-950 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden lg:block">
                    {step.subtitle}
                  </span>
                </div>
              </button>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[1px] min-w-3 sm:min-w-6 bg-slate-200" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};
