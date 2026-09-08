import React, { useEffect, useState } from 'react';
import {
  Activity,
  Brain,
  Cpu,
  Droplet,
  ExternalLink,
  FlaskConical,
  HeartPulse,
  Maximize2,
  Minimize2,
  Scan,
  Wind,
  X,
} from 'lucide-react';
import { getCdssAppUrl } from '../lib/vaultBridge.ts';

export type CdssToolSlug = 'dengue' | 'ecg' | 'abg' | 'xray' | 'hepa' | 'neuro' | 'hub';

interface CdssModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTool?: CdssToolSlug;
  onApplyToSoap?: (section: 's' | 'o' | 'a' | 'p', content: string) => void;
}

interface ToolTabMeta {
  id: CdssToolSlug;
  title: string;
  badge: string;
  icon: React.ReactNode;
  colorClass: string;
  activeBgClass: string;
  desc: string;
}

const CDSS_TABS: ToolTabMeta[] = [
  {
    id: 'dengue',
    title: 'Dịch Truyền SXHD Dengue',
    badge: 'BYT QĐ 2760',
    icon: <Droplet className="w-4 h-4 text-blue-500" />,
    colorClass: 'text-blue-700 border-blue-300 bg-blue-50',
    activeBgClass: 'bg-blue-600 text-white shadow-sm',
    desc: 'Cọc dịch 4 cột động học, hiệu chỉnh cân nặng CDC 2014 & bơm tiêm điện vận mạch.',
  },
  {
    id: 'ecg',
    title: 'Phân Tích ECG 12 Đạo Trình',
    badge: '12-Lead Canvas',
    icon: <HeartPulse className="w-4 h-4 text-rose-500" />,
    colorClass: 'text-rose-700 border-rose-300 bg-rose-50',
    activeBgClass: 'bg-rose-600 text-white shadow-sm',
    desc: 'Vẽ sóng tương tác cao cấp, đo trục, QTc, STEMI và phân tích rối loạn nhịp tim.',
  },
  {
    id: 'abg',
    title: 'Khí Máu Động Mạch (ABG Pro)',
    badge: '6-Step Analysis',
    icon: <Wind className="w-4 h-4 text-cyan-600" />,
    colorClass: 'text-cyan-700 border-cyan-300 bg-cyan-50',
    activeBgClass: 'bg-cyan-600 text-white shadow-sm',
    desc: 'Toan kiềm 6 bước, Anion Gap hiệu chỉnh Albumin, Delta-Delta & P/F ARDS Berlin.',
  },
  {
    id: 'xray',
    title: 'X-Quang Thông Minh (RadAI)',
    badge: 'PACS Workstation',
    icon: <Scan className="w-4 h-4 text-purple-600" />,
    colorClass: 'text-purple-700 border-purple-300 bg-purple-50',
    activeBgClass: 'bg-purple-600 text-white shadow-sm',
    desc: 'Mô phỏng trạm đọc PACS ngực & bụng, phát hiện đông đặc, tràn khí, bóng tim to.',
  },
  {
    id: 'hepa',
    title: 'Sinh Hóa Gan (HepaCDSS)',
    badge: 'ACG & WHO',
    icon: <FlaskConical className="w-4 h-4 text-emerald-600" />,
    colorClass: 'text-emerald-700 border-emerald-300 bg-emerald-50',
    activeBgClass: 'bg-emerald-600 text-white shadow-sm',
    desc: 'Phân tích tổn thương gan, tính R-ratio, De Ritis, FIB-4, APRI, MELD-Na, Child-Pugh & DILI.',
  },
  {
    id: 'neuro',
    title: 'Khám Thần Kinh (NeuroExam)',
    badge: 'Mô Phỏng 2D/3D',
    icon: <Brain className="w-4 h-4 text-amber-600" />,
    colorClass: 'text-amber-700 border-amber-300 bg-amber-50',
    activeBgClass: 'bg-amber-600 text-white shadow-sm',
    desc: 'Mô phỏng phản xạ đồng tử, vận nhãn, khoanh da, dáng đi, thoát vị não & thang điểm NIHSS/GCS.',
  },
  {
    id: 'hub',
    title: 'Danh Mục CDSS',
    badge: 'Tổng quan Hub',
    icon: <Cpu className="w-4 h-4 text-indigo-500" />,
    colorClass: 'text-indigo-700 border-indigo-300 bg-indigo-50',
    activeBgClass: 'bg-indigo-600 text-white shadow-sm',
    desc: 'Trung tâm điều phối các thuật toán hỗ trợ quyết định lâm sàng của CliniPortal.',
  },
];

export const CdssModal: React.FC<CdssModalProps> = ({
  isOpen,
  onClose,
  initialTool = 'dengue',
  onApplyToSoap,
}) => {
  const [activeTool, setActiveTool] = useState<CdssToolSlug>(initialTool);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [initialTool, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Listen for postMessage from CDSS iframes
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === 'CDSS_EXPORT_SOAP' && onApplyToSoap) {
        if (e.data.plan) onApplyToSoap('p', e.data.plan);
        if (e.data.assessment) onApplyToSoap('a', e.data.assessment);
        if (e.data.objective) onApplyToSoap('o', e.data.objective);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onApplyToSoap]);

  if (!isOpen) return null;

  const currentMeta = CDSS_TABS.find((t) => t.id === activeTool) || CDSS_TABS[0];
  const standaloneUrl = getCdssAppUrl(activeTool);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-2 sm:inset-3 w-auto h-auto'
            : 'w-full max-w-[1440px] h-[92vh]'
        }`}
      >
        {/* Top Navbar Header */}
        <header className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/90 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white tracking-wide flex items-center gap-1.5">
                  CliniPortal CDSS Workstation
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {currentMeta.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {currentMeta.desc}
              </p>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            <a
              href={standaloneUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Mở trong tab riêng toàn trang"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mở tab riêng</span>
            </a>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
              title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-rose-600/80 border border-slate-700 hover:border-rose-500 rounded-md transition-colors cursor-pointer"
              title="Đóng cửa sổ (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Sub-Header: Module Tab Navigation Bar */}
        <nav className="bg-slate-100 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5">
            {CDSS_TABS.map((tab) => {
              const isActive = activeTool === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTool(tab.id);
                    setIframeKey((prev) => prev + 1);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? tab.activeBgClass
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 bg-white border border-slate-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 hidden xl:flex items-center gap-2 shrink-0 pr-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Tích hợp đồng bộ Bệnh án DocSpace</span>
          </div>
        </nav>

        {/* Main Workspace Frame */}
        <div className="flex-1 w-full h-full bg-slate-50 overflow-hidden relative">
          <iframe
            key={`${activeTool}-${iframeKey}`}
            src={standaloneUrl}
            title={`CDSS - ${currentMeta.title}`}
            className="w-full h-full border-0 bg-white"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      </div>
    </div>
  );
};
