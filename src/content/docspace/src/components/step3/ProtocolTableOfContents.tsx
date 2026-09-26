import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  GraduationCap,
  Heart,
  Layers,
  ListTree,
  Maximize2,
  Minimize2,
  Sparkles,
  X,
} from 'lucide-react';

export interface ProtocolTableOfContentsProps {
  activeSection: string;
  expandedSections: Record<string, boolean>;
  onToggleSection: (key: string, forceOpen?: boolean) => void;
  onJumpTo: (sectionId: string, subId?: string) => void;
  severityGradesCount: number;
  isPhenotypeStaging: boolean;
  activeSeverityGradeName?: string;
  activeComplicationsCount: number;
  totalOrders: number;
  checkedOrdersCount: number;
  progressPercent: number;
  cautionsCount: number;
  guidelinesCount: number;
  soapCasesCount: number;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const ProtocolTableOfContents: React.FC<ProtocolTableOfContentsProps> = ({
  activeSection,
  expandedSections,
  onToggleSection,
  onJumpTo,
  severityGradesCount,
  isPhenotypeStaging,
  activeSeverityGradeName,
  activeComplicationsCount,
  totalOrders,
  checkedOrdersCount,
  progressPercent,
  cautionsCount,
  guidelinesCount,
  soapCasesCount,
  onExpandAll,
  onCollapseAll,
}) => {
  // Trạng thái thu nhỏ thanh TOC bên desktop (mini rail mode)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  // Trạng thái mở TOC Drawer trên mobile
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Định nghĩa 6 mục TOC chuẩn hoá kèm các tiểu mục
  const tocSections = [
    {
      id: 'classification',
      number: '1',
      title: 'Phân loại (cá thể hoá)',
      icon: Layers,
      colorClass: 'text-indigo-600',
      activeBorderClass: 'border-indigo-500 bg-indigo-50/60',
      badge: severityGradesCount > 0 ? `${severityGradesCount} ${isPhenotypeStaging ? 'thể' : 'độ'}` : 'Toàn diện',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      subItems: [
        { id: 'sub-1a', label: isPhenotypeStaging ? '1a. Thể lâm sàng' : '1a. Phân độ nặng nhẹ' },
        {
          id: 'sub-1b',
          label: '1b. Tầm soát biến chứng',
          alertCount: activeComplicationsCount > 0 ? activeComplicationsCount : undefined,
        },
        { id: 'sub-1c', label: '1c. Cơ địa & Chỉnh liều eGFR' },
      ],
    },
    {
      id: 'protocol',
      number: '2',
      title: 'Phác đồ điều trị chi tiết',
      icon: ClipboardCheck,
      colorClass: 'text-blue-600',
      activeBorderClass: 'border-blue-500 bg-blue-50/60',
      badge: `${checkedOrdersCount}/${totalOrders} (${progressPercent}%)`,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      subItems: [
        { id: 'sub-orders', label: 'Bảng kiểm y lệnh & EMR' },
        { id: 'sub-ddi', label: 'An toàn DDI & Chức năng thận' },
        { id: 'sub-timeline', label: 'Lộ trình từng ngày (Timeline)' },
        { id: 'sub-safety-net', label: 'Dự phòng biến chứng (Safety Net)' },
      ],
    },
    {
      id: 'cautions',
      number: '3',
      title: 'Lưu ý lâm sàng',
      icon: AlertTriangle,
      colorClass: 'text-amber-600',
      activeBorderClass: 'border-amber-500 bg-amber-50/60',
      badge: `${cautionsCount} lưu ý & CCĐ`,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      subItems: [
        { id: 'sub-indications', label: '[1] Chỉ định can thiệp & Y lệnh' },
        { id: 'sub-cautions', label: '[2] Cảnh báo quan trọng' },
        { id: 'sub-contraindications', label: '[3] Chống chỉ định' },
        { id: 'sub-discharge', label: '[4] Tiêu chuẩn xuất viện' },
      ],
    },
    {
      id: 'counseling',
      number: '4',
      title: 'Vấn đề người bệnh quan tâm',
      icon: Heart,
      colorClass: 'text-teal-600',
      activeBorderClass: 'border-teal-500 bg-teal-50/60',
      badge: 'Kho TV',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      subItems: [
        { id: 'sub-patient-education', label: 'Tư vấn & Giáo dục người bệnh' },
      ],
    },
    {
      id: 'knowledge',
      number: '5',
      title: 'Kiến thức nhân viên y tế',
      icon: GraduationCap,
      colorClass: 'text-purple-600',
      activeBorderClass: 'border-purple-500 bg-purple-50/60',
      badge: `${guidelinesCount} EBM`,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      subItems: [
        { id: 'sub-basic', label: '5a-5b. Cơ sở & Dược lâm sàng' },
        { id: 'sub-guidelines', label: '5c. Khuyến cáo EBM Guidelines' },
      ],
    },
    {
      id: 'soap',
      number: '6',
      title: 'Các ca bệnh liên quan',
      icon: Sparkles,
      colorClass: 'text-emerald-600',
      activeBorderClass: 'border-emerald-500 bg-emerald-50/60',
      badge: `${soapCasesCount} ca`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      subItems: [
        { id: 'sub-soap-cases', label: 'Bệnh án SOAP & Bẫy chẩn đoán' },
      ],
    },
  ];

  const handleItemClick = (sectionId: string, subId?: string) => {
    // 1. Tự động mở section nếu đang bị đóng
    onToggleSection(sectionId, true);
    // 2. Cuộn mượt đến section
    onJumpTo(sectionId, subId);
    // 3. Đóng mobile drawer nếu đang mở
    setIsMobileDrawerOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP STICKY SIDEBAR (>= 1024px)                                     */}
      {/* ========================================================================= */}
      <aside
        aria-label="Mục lục phác đồ"
        className={`hidden lg:flex flex-col transition-all duration-300 self-start sticky top-20 z-10 ${
          isCollapsed ? 'w-14' : 'w-64 xl:w-72'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl shadow-xs overflow-hidden flex flex-col">
          {/* Header thanh TOC */}
          <div className="p-3 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <ListTree className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-xs text-slate-800 tracking-wide uppercase truncate">
                    Mục lục phác đồ
                  </h3>
                  <p className="text-[10px] text-slate-500 truncate">
                    6 đầu mục lâm sàng
                  </p>
                </div>
              </div>
            )}

            {isCollapsed && (
              <div className="w-full flex justify-center py-0.5">
                <ListTree className="w-4 h-4 text-blue-600" />
              </div>
            )}

            {/* Nút thu nhỏ / phóng to TOC */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer shrink-0"
              title={isCollapsed ? 'Mở rộng mục lục' : 'Thu nhỏ mục lục'}
            >
              {isCollapsed ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Mini Execution Progress Bar (Chỉ hiển thị khi mở rộng) */}
          {!isCollapsed && (
            <div className="px-3 py-2 bg-slate-50/50 border-b border-slate-100 text-[11px] flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold text-slate-600">Tiến độ thực thi:</span>
                <span className="font-mono-custom font-bold text-blue-700">
                  {checkedOrdersCount}/{totalOrders} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    progressPercent >= 100
                      ? 'bg-emerald-600'
                      : progressPercent >= 50
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Danh sách 6 Mục TOC */}
          <nav className="p-2 flex flex-col gap-1 max-h-[calc(100vh-240px)] overflow-y-auto no-scrollbar">
            {tocSections.map((sec) => {
              const IconComp = sec.icon;
              const isActive = activeSection === sec.id;
              const isSectionOpen = expandedSections[sec.id] !== false;

              if (isCollapsed) {
                // Mini rail icon mode
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => handleItemClick(sec.id)}
                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-all cursor-pointer relative group ${
                      isActive
                        ? `${sec.activeBorderClass} border text-blue-700 font-bold shadow-2xs`
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                    title={`${sec.number}. ${sec.title}`}
                  >
                    <IconComp className="w-4 h-4" />
                    {/* Tooltip khi hover rail */}
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded shadow-md whitespace-nowrap hidden group-hover:block z-50 pointer-events-none">
                      {sec.number}. {sec.title}
                    </div>
                  </button>
                );
              }

              return (
                <div key={sec.id} className="flex flex-col">
                  {/* Item cấp 1 */}
                  <div
                    onClick={() => handleItemClick(sec.id)}
                    className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-1.5 transition-all cursor-pointer select-none group ${
                      isActive
                        ? `${sec.activeBorderClass} border font-bold text-slate-900 shadow-2xs`
                        : 'border-transparent hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:text-blue-600'
                        }`}
                      >
                        <IconComp className="w-3 h-3" />
                      </div>
                      <span className="truncate leading-tight">
                        <span className="font-semibold text-slate-400 mr-1">{sec.number}.</span>
                        {sec.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {sec.badge && (
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono-custom border ${sec.badgeColor}`}>
                          {sec.badge}
                        </span>
                      )}
                      <span className="text-slate-400 group-hover:text-slate-700 transition-colors">
                        {isSectionOpen ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Danh sách tiểu mục cấp 2 (Hiển thị khi Section đang mở) */}
                  {isSectionOpen && sec.subItems && sec.subItems.length > 0 && (
                    <div className="ml-5 pl-2 border-l border-slate-200 py-1 flex flex-col gap-0.5 animate-fadeIn">
                      {sec.subItems.map((sub, sIdx) => (
                        <button
                          key={sub.id || sIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemClick(sec.id, sub.id);
                          }}
                          className="px-2 py-1 text-left text-[11px] text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 rounded transition-colors flex items-center justify-between gap-1 cursor-pointer"
                        >
                          <span className="truncate">{sub.label}</span>
                          {sub.alertCount !== undefined && (
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-rose-500 text-white animate-pulse">
                              {sub.alertCount}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer Quick Actions */}
          {!isCollapsed && (
            <div className="p-2 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-1.5 text-[11px]">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onExpandAll}
                  className="px-2 py-1 text-slate-600 hover:text-blue-700 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Bung toàn bộ 6 phần"
                >
                  Bung hết
                </button>
                <span className="text-slate-300">&bull;</span>
                <button
                  type="button"
                  onClick={onCollapseAll}
                  className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Thu gọn các phần"
                >
                  Thu gọn
                </button>
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="p-1 text-slate-500 hover:text-blue-600 hover:bg-white rounded border border-slate-200 transition-colors cursor-pointer shadow-2xs"
                title="Lên đầu trang phác đồ"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE FLOATING ACTION BUTTON & BOTTOM SHEET (< 1024px)                 */}
      {/* ========================================================================= */}
      <div className="lg:hidden">
        {/* Floating Quick Jump Pill Button */}
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="fixed bottom-6 right-4 z-40 px-3.5 py-2.5 bg-blue-600 text-white rounded-full shadow-lg border border-blue-400 flex items-center gap-2 text-xs font-bold cursor-pointer hover:bg-blue-700 active:scale-95 transition-all"
          title="Mở mục lục 6 đầu mục lâm sàng"
        >
          <ListTree className="w-4 h-4" />
          <span>Mục lục</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-500 text-white font-mono">
            {checkedOrdersCount}/{totalOrders}
          </span>
        </button>

        {/* Backdrop & Mobile Sheet */}
        {isMobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
            {/* Click ngoài để đóng */}
            <div
              className="flex-1"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            <div className="bg-white rounded-t-2xl max-h-[80vh] flex flex-col shadow-2xl border-t border-slate-200 animate-slideUp">
              {/* Header Drawer */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <ListTree className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900">
                      Mục lục phác đồ điều trị
                    </h3>
                    <p className="text-xs text-slate-500">
                      Nhấp để nhảy nhanh đến đầu mục lâm sàng
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress ribbon */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs flex items-center justify-between">
                <span className="text-slate-600">Tiến độ y lệnh:</span>
                <span className="font-mono font-bold text-blue-700">
                  {checkedOrdersCount}/{totalOrders} ({progressPercent}%)
                </span>
              </div>

              {/* Danh sách items mobile */}
              <div className="p-3 overflow-y-auto space-y-2 divide-y divide-slate-100">
                {tocSections.map((sec) => {
                  const IconComp = sec.icon;
                  const isActive = activeSection === sec.id;

                  return (
                    <div key={sec.id} className="pt-2 first:pt-0">
                      <button
                        type="button"
                        onClick={() => handleItemClick(sec.id)}
                        className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-semibold truncate">
                            {sec.number}. {sec.title}
                          </span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10.5px] font-mono border ${sec.badgeColor}`}>
                          {sec.badge}
                        </span>
                      </button>

                      {/* Sub-items mobile */}
                      {sec.subItems && sec.subItems.length > 0 && (
                        <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-1">
                          {sec.subItems.map((sub, sIdx) => (
                            <button
                              key={sub.id || sIdx}
                              type="button"
                              onClick={() => handleItemClick(sec.id, sub.id)}
                              className="w-full text-left py-1 text-xs text-slate-600 hover:text-blue-700 flex items-center justify-between"
                            >
                              <span>{sub.label}</span>
                              {sub.alertCount !== undefined && (
                                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                                  {sub.alertCount}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer Drawer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onExpandAll();
                    setIsMobileDrawerOpen(false);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Bung tất cả
                </button>
                <button
                  type="button"
                  onClick={() => {
                    scrollToTop();
                    setIsMobileDrawerOpen(false);
                  }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-semibold flex items-center gap-1 shadow-2xs"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Lên đầu trang</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
