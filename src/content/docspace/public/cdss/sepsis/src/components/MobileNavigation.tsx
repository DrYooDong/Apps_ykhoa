import React from 'react';
import { Activity, BookOpen, Stethoscope, History } from 'lucide-react';

interface MobileNavigationProps {
  activeTab: 'assessment' | 'results' | 'guide' | 'cases';
  setActiveTab: (tab: 'assessment' | 'results' | 'guide' | 'cases') => void;
  urgencyLevel?: 'routine' | 'urgent' | 'emergency';
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  setActiveTab,
  urgencyLevel = 'routine'
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="grid grid-cols-4 items-center h-16 max-w-md mx-auto px-1">
        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'assessment' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Stethoscope className={`w-5 h-5 ${activeTab === 'assessment' ? 'text-teal-600' : ''}`} />
          <span className="text-[11px] tracking-tight mt-1">Khám Bệnh</span>
        </button>

        <button
          onClick={() => setActiveTab('results')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 relative transition-colors ${
            activeTab === 'results' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Activity className={`w-5 h-5 ${activeTab === 'results' ? 'text-teal-600' : ''}`} />
            {urgencyLevel === 'emergency' && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
            )}
            {urgencyLevel === 'urgent' && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-1">Kết Quả CDSS</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'guide' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'guide' ? 'text-teal-600' : ''}`} />
          <span className="text-[11px] tracking-tight mt-1">Hướng Dẫn</span>
        </button>

        <button
          onClick={() => setActiveTab('cases')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-colors ${
            activeTab === 'cases' ? 'text-teal-700 font-semibold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <History className={`w-5 h-5 ${activeTab === 'cases' ? 'text-teal-600' : ''}`} />
          <span className="text-[11px] tracking-tight mt-1">Hồ Sơ Ca</span>
        </button>
      </div>
    </div>
  );
};
