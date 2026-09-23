import React from 'react';
import { Activity, BookOpen, History, Sparkles, RotateCcw } from 'lucide-react';
import { PRESET_CASES, PresetCase } from '../data/presetCases';

interface HeaderProps {
  onOpenPresets: () => void;
  onSelectPreset: (preset: PresetCase) => void;
  onOpenGuide: () => void;
  onOpenHistory: () => void;
  onReset: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPresets,
  onSelectPreset,
  onOpenGuide,
  onOpenHistory,
  onReset,
  savedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* 1. Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                SepsisCDSS
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block">
                NICE NG253 · Sepsis-3 · Phoenix 2024 · LP-NEWS
              </span>
            </div>
          </div>

          {/* 2. Tính năng lựa chọn ca mẫu trực tiếp (Prominent Preset Selector) */}
          <div className="flex-1 max-w-md mx-2 hidden md:block">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0 ml-1.5" />
              <select
                defaultValue=""
                onChange={(e) => {
                  const found = PRESET_CASES.find((c) => c.id === e.target.value);
                  if (found) onSelectPreset(found);
                }}
                className="w-full text-xs bg-transparent border-none text-slate-700 font-medium focus:ring-0 cursor-pointer"
              >
                <option value="" disabled>
                  ⚡ Chọn ca lâm sàng mẫu từ y văn...
                </option>
                {PRESET_CASES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Icon Buttons Nhỏ Gọn Cho Các Nút Phụ */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Nút ca mẫu cho mobile */}
            <button
              onClick={onOpenPresets}
              className="p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors relative"
              title="Danh mục ca bệnh mẫu"
              aria-label="Danh mục ca bệnh mẫu"
            >
              <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-teal-600" />
            </button>

            {/* Nút Hướng Dẫn Y Khoa (Icon) */}
            <button
              onClick={onOpenGuide}
              className="p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors"
              title="Hướng dẫn cơ bản cho người mới"
              aria-label="Hướng dẫn cơ bản cho người mới"
            >
              <BookOpen className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Nút Lịch Sử Ca Bệnh (Icon) */}
            <button
              onClick={onOpenHistory}
              className="p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg transition-colors relative"
              title="Lịch sử hồ sơ đã lưu"
              aria-label="Lịch sử hồ sơ đã lưu"
            >
              <History className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full" />
              )}
            </button>

            {/* Nút Đặt Lại Form (Icon) */}
            <button
              onClick={onReset}
              className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Đặt lại thông số ban đầu"
              aria-label="Đặt lại dữ liệu"
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
