import React, { useState } from 'react';
import {
  Bug,
  ChevronDown,
  ChevronUp,
  Compass,
  MapPin,
  Sparkles,
  ShieldAlert,
  Calendar,
  Waves,
  Trees,
  Footprints,
  BookOpen,
  Check,
} from 'lucide-react';
import { EpidemiologyContext } from '../../types.ts';

interface EpidemiologyPanelProps {
  epiContext: EpidemiologyContext;
  onUpdateEpiContext: (epi: EpidemiologyContext) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  className?: string;
}

interface QuickEpiPreset {
  label: string;
  field: keyof EpidemiologyContext;
  value: string;
  icon: string;
  category: 'vector' | 'outbreak' | 'travel' | 'contact' | 'water';
}

const QUICK_EPI_PRESETS: QuickEpiPreset[] = [
  {
    label: 'Ổ dịch Sốt xuất huyết (Aedes)',
    field: 'outbreakAlert',
    value: 'Sốt xuất huyết Dengue đang lưu hành tại địa phương',
    icon: '🦟',
    category: 'outbreak',
  },
  {
    label: 'Mùa mưa đỉnh dịch (T6 - T11)',
    field: 'seasonalContext',
    value: 'Mùa mưa lũ cao điểm (Đỉnh dịch bệnh truyền nhiễm)',
    icon: '🌧️',
    category: 'outbreak',
  },
  {
    label: 'Đi rừng / Phát rẫy (Nghi Sốt mò / Sốt rét)',
    field: 'travelHistory',
    value: 'Đi rừng núi, làm rẫy, phát quang bụi rậm trong vòng 14 ngày',
    icon: '🌲',
    category: 'travel',
  },
  {
    label: 'Lội nước lụt / Cống rãnh (Nghi Leptospira)',
    field: 'waterFoodRisk',
    value: 'Lội nước ngập lụt sau bão / tiếp xúc bùn đất cống rãnh',
    icon: '🌊',
    category: 'water',
  },
  {
    label: 'Tiếp xúc người ho kéo dài / Lao',
    field: 'contactHistory',
    value: 'Tiếp xúc gần người ho khạc đờm kéo dài / đang điều trị lao',
    icon: '🫁',
    category: 'contact',
  },
  {
    label: 'Vùng Sốt rét lưu hành (Tây Nguyên / Biên giới)',
    field: 'endemicArea',
    value: 'Vùng rừng núi Tây Nguyên / biên giới lưu hành sốt rét',
    icon: '📍',
    category: 'travel',
  },
  {
    label: 'Ăn tiết canh / Thịt tái sống (Nghi Liên cầu lợn)',
    field: 'waterFoodRisk',
    value: 'Tiền sử ăn tiết canh, thịt tái sống, giết mổ lợn ốm',
    icon: '🥩',
    category: 'water',
  },
  {
    label: 'Chó / Mèo / Động vật cắn (Nghi Dại)',
    field: 'vectorExposure',
    value: 'Bị súc vật (chó/mèo/khỉ) cắn hoặc cào xước da',
    icon: '🐕',
    category: 'vector',
  },
];

export const EpidemiologyPanel: React.FC<EpidemiologyPanelProps> = ({
  epiContext,
  onUpdateEpiContext,
  onOpenVaultDrawer,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Đếm số dữ kiện dịch tễ đã nhập
  const filledCount = Object.values(epiContext).filter((v) => v && v.trim()).length;

  const handleTogglePreset = (preset: QuickEpiPreset) => {
    const currentVal = epiContext[preset.field] || '';
    if (currentVal.includes(preset.value)) {
      // Bỏ chọn
      const newVal = currentVal.replace(preset.value, '').replace(/;\s*;\s*/g, '; ').trim();
      onUpdateEpiContext({ ...epiContext, [preset.field]: newVal });
    } else {
      // Thêm vào
      const newVal = currentVal ? `${currentVal}; ${preset.value}` : preset.value;
      onUpdateEpiContext({ ...epiContext, [preset.field]: newVal });
    }
  };

  const isPresetActive = (preset: QuickEpiPreset) => {
    const currentVal = epiContext[preset.field] || '';
    return currentVal.includes(preset.value);
  };

  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden shadow-2xs transition-all ${
        filledCount > 0
          ? 'border-emerald-300 ring-1 ring-emerald-500/20'
          : 'border-slate-200'
      } ${className}`}
    >
      {/* Header bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-white flex items-center justify-between cursor-pointer select-none hover:bg-emerald-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs shrink-0">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-emerald-950">
                Yếu Tố Dịch Tễ Học & Phơi Nhiễm
              </span>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                Tam Giác Truyền Nhiễm
              </span>
              {filledCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-md text-[10px] font-mono bg-emerald-600 text-white">
                  {filledCount} ghi nhận
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Nguồn lây · Vùng dịch tễ · Vector truyền bệnh · Mùa bệnh (Ảnh hưởng trực tiếp đến điểm biện luận)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenVaultDrawer && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVaultDrawer('Dịch tễ học', 'Truyền nhiễm', 'DTH');
              }}
              title="Tra cứu nhanh 142 bài viết Kho Dịch Tễ Học"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-emerald-800 bg-white hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
            >
              <BookOpen className="w-3 h-3 text-emerald-600" />
              <span>Kho DTH</span>
            </button>
          )}

          <div className="text-slate-400 hover:text-slate-600 p-1">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-emerald-100/80 bg-slate-50/30">
          {/* Quick Preset Chips */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Tình huống Dịch tễ kinh điển tại Việt Nam (Chọn nhanh):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_EPI_PRESETS.map((preset, idx) => {
                const active = isPresetActive(preset);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTogglePreset(preset)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                    {active && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form nhập chi tiết các chiều Dịch tễ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Trường 1: Ổ dịch & Mùa bệnh */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Ổ dịch bùng phát / Mùa bệnh:
              </label>
              <input
                type="text"
                placeholder="VD: Sốt xuất huyết Dengue đang vào đợt dịch, Mùa mưa lũ..."
                value={epiContext.outbreakAlert}
                onChange={(e) =>
                  onUpdateEpiContext({ ...epiContext, outbreakAlert: e.target.value })
                }
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Trường 2: Vùng lưu hành & Địa chỉ */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Vùng lưu hành / Nơi cư trú:
              </label>
              <input
                type="text"
                placeholder="VD: Tây Nguyên, ĐBSCL, vùng ven ngập nước..."
                value={epiContext.endemicArea}
                onChange={(e) =>
                  onUpdateEpiContext({ ...epiContext, endemicArea: e.target.value })
                }
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Trường 3: Tiền sử đi lại / Du lịch */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Tiền sử đi lại / Du lịch trong 14–30 ngày:
              </label>
              <input
                type="text"
                placeholder="VD: Đi trekking rừng núi Tây Nguyên, đi Campuchia..."
                value={epiContext.travelHistory}
                onChange={(e) =>
                  onUpdateEpiContext({ ...epiContext, travelHistory: e.target.value })
                }
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            {/* Trường 4: Vector / Nguồn lây / Nước thực phẩm */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 block">
                Vector truyền bệnh / Tiếp xúc đặc biệt:
              </label>
              <input
                type="text"
                placeholder="VD: Muỗi vằn đốt nhiều, lội nước ngập, ăn tiết canh..."
                value={epiContext.vectorExposure || epiContext.waterFoodRisk}
                onChange={(e) =>
                  onUpdateEpiContext({
                    ...epiContext,
                    vectorExposure: e.target.value,
                    waterFoodRisk: e.target.value,
                  })
                }
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
