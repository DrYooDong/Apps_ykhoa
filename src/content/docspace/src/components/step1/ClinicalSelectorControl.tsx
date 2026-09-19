import React from 'react';
import { FileCheck, Layers, Search, Sparkles, Trash2, X, Zap } from 'lucide-react';
import { GROUP_COLORS } from '../../data/seedData.ts';

export interface SyndromePreset {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  badgeClass: string;
  description: string;
  symptomIds: string[];
}

export const CLINICAL_SYNDROME_PRESETS: SyndromePreset[] = [
  {
    id: 'acs',
    name: 'HC Mạch vành cấp (ACS)',
    shortName: '🫀 Vành cấp (ACS)',
    icon: '🫀',
    badgeClass: 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100',
    description: 'Đau thắt ngực sau xương ức, hướng lan, vã mồ hôi, Troponin, ST chênh, THA, ĐTĐ',
    symptomIds: ['dau_nguc', 'dau_nguc_lan', 'va_mo_hoi', 'kho_tho', 'troponin', 'st_chenh', 'thc_tha', 'dt_dai_duong', 'roi_loan_lipid', 'hut_thuoc', 'benh_ly_tim', 'mach_nhanh', 'ha_huyet_ap'],
  },
  {
    id: 'resp',
    name: 'Khó thở & Suy hô hấp',
    shortName: '🫁 Suy hô hấp cấp',
    icon: '🫁',
    badgeClass: 'border-cyan-200 text-cyan-800 bg-cyan-50 hover:bg-cyan-100',
    description: 'Khó thở, orthopnea, SpO2 tụt, ho, đàm, rale/thâm nhiễm, D-dimer, CTPA',
    symptomIds: ['kho_tho', 'kho_tho_nam', 'tho_rut', 'spo2_thap', 'ho', 'ho_dam', 'ho_mau', 'xq_phoi_tham_nhiem', 'd_dimer', 'ctpa', 'sung_dau_chan_1_ben'],
  },
  {
    id: 'acute_abdomen',
    name: 'Đau bụng cấp & Ngoại khoa',
    shortName: '🩺 Đau bụng cấp',
    icon: '🩺',
    badgeClass: 'border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100',
    description: 'Đau thượng vị/HCP/HSP, MacBurney, đề kháng phúc mạc, buồn nôn, men tụy, siêu âm',
    symptomIds: ['dau_thuong_vi', 'dau_hong_phai', 'mac_burney', 'phan_ung_tb', 'buon_non_non', 'dau_hcp', 'murphy', 'sot', 'bc_tang', 'men_tuy', 'sa_tui_mat'],
  },
  {
    id: 'stroke',
    name: 'Đột quỵ & Thần kinh (FAST)',
    shortName: '🧠 Đột quỵ / FAST',
    icon: '🧠',
    badgeClass: 'border-purple-200 text-purple-800 bg-purple-50 hover:bg-purple-100',
    description: 'Liệt nửa người, méo miệng, thất ngôn, lơ mơ, đau đầu dữ dội, CT sọ não',
    symptomIds: ['liet_nua_nguoi', 'meo_mieng', 'noi_kho', 'dau_dau', 'roi_loan_tri_giac', 'chong_mat', 'co_cung', 'ct_so', 'rung_nhi'],
  },
  {
    id: 'fever_infection',
    name: 'Sốt & HC Nhiễm trùng',
    shortName: '🌡️ Sốt / Nhiễm trùng',
    icon: '🌡️',
    badgeClass: 'border-orange-200 text-orange-800 bg-orange-50 hover:bg-orange-100',
    description: 'Sốt cao liên tục, sốt nhẹ về chiều, mệt mỏi, đau cơ, bạch cầu tăng, NS1 Dengue',
    symptomIds: ['sot', 'sot_cao_27', 'sot_ve_chieu', 'met_moi', 'dau_co', 'bc_tang', 'ns1_dengue', 'ban_xuat_huyet'],
  },
  {
    id: 'metabolic_shock',
    name: 'Hôn mê / Toan kiềm (DKA)',
    shortName: '⚡ Toan kiềm / DKA',
    icon: '⚡',
    badgeClass: 'border-emerald-200 text-emerald-800 bg-emerald-50 hover:bg-emerald-100',
    description: 'Đái tháo đường, tiểu nhiều, khát nước, thở Kussmaul, đường huyết, ceton, anion gap',
    symptomIds: ['dt_dai_duong', 'tieu_nhieu', 'khat_nuoc', 'kussmaul', 'hoi_aceton', 'dh_tang', 'ceton_duong', 'khoang_anion'],
  },
];

interface ClinicalSelectorControlProps {
  totalSymptomsCount: number;
  activeSyndromeId: string | null;
  setActiveSyndromeId: React.Dispatch<React.SetStateAction<string | null>>;
  activeSection: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected';
  setActiveSection: (sec: 'all' | 'hc' | 'cn' | 'tt' | 'tc' | 'cls' | 'selected') => void;
  selected: Set<string>;
  derived: Set<string>;
  negated: Set<string>;
  chipFilter: string;
  setChipFilter: (val: string) => void;
  activeOrganGroup: string;
  setActiveOrganGroup: (val: string) => void;
  organGroups: string[];
  onChipClick: (id: string) => void;
  onMarkNegative: (id: string, e: React.MouseEvent) => void;
  onClearAllSelections: () => void;
  onApplySyndromePreset: (preset: SyndromePreset) => void;
  resolveSymptomName: (id: string) => string;
  countCategorySelected: (cat: 'cn' | 'tt' | 'tc' | 'cls') => number;
}

export const ClinicalSelectorControl: React.FC<ClinicalSelectorControlProps> = ({
  totalSymptomsCount,
  activeSyndromeId,
  setActiveSyndromeId,
  activeSection,
  setActiveSection,
  selected,
  derived,
  negated,
  chipFilter,
  setChipFilter,
  activeOrganGroup,
  setActiveOrganGroup,
  organGroups,
  onChipClick,
  onMarkNegative,
  onClearAllSelections,
  onApplySyndromePreset,
  resolveSymptomName,
  countCategorySelected,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-3.5 shadow-xs flex flex-col gap-3">
      {/* Tier 1: Clinical Syndrome Quick Orientation */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Định hướng nhanh theo Bệnh cảnh lâm sàng (Clinical Presets):
          </span>
          {activeSyndromeId && (
            <button
              type="button"
              onClick={() => setActiveSyndromeId(null)}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3 h-3" />
              Bỏ lọc hội chứng
            </button>
          )}
        </div>

        {/* Syndrome preset chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
          {CLINICAL_SYNDROME_PRESETS.map((syn) => {
            const isActive = activeSyndromeId === syn.id;
            return (
              <button
                key={syn.id}
                type="button"
                onClick={() => setActiveSyndromeId((prev) => (prev === syn.id ? null : syn.id))}
                className={`px-2 py-1.5 rounded-md border text-left text-xs transition-all flex flex-col gap-0.5 cursor-pointer select-none ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold ring-2 ring-blue-400/30 shadow-2xs'
                    : `${syn.badgeClass} border`
                }`}
                title={syn.description}
              >
                <span className="font-semibold truncate text-[11.5px] flex items-center gap-1">
                  <span>{syn.icon}</span>
                  <span className="truncate">{syn.shortName.replace(/^[^\s]+\s*/, '')}</span>
                </span>
                <span
                  className={`text-[9.5px] truncate font-normal ${
                    isActive ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {syn.symptomIds.length} mục then chốt
                </span>
              </button>
            );
          })}
        </div>

        {/* Active syndrome banner if selected */}
        {activeSyndromeId && (() => {
          const currentSyn = CLINICAL_SYNDROME_PRESETS.find((s) => s.id === activeSyndromeId);
          if (!currentSyn) return null;
          return (
            <div className="mt-2.5 bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-white border border-blue-200/80 rounded-lg p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
              <div className="flex items-start gap-2">
                <span className="text-xl shrink-0 mt-0.5">{currentSyn.icon}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-blue-950">
                      Đang định hướng: {currentSyn.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono-custom font-semibold">
                      {currentSyn.symptomIds.length} dữ kiện
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {currentSyn.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => onApplySyndromePreset(currentSyn)}
                  className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
                  title="Tick chọn nhanh toàn bộ triệu chứng gợi ý của hội chứng này"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Chọn nhanh gói gợi ý
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSyndromeId(null)}
                  className="px-2 py-1 rounded text-xs font-medium bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Quay lại chế độ xem tất cả"
                >
                  <X className="w-3 h-3" />
                  Bỏ lọc
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Tier 2: Section Navigation Tabs */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 border-b border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
              activeSection === 'all'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tất cả</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('cn')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
              activeSection === 'cn'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">B</span>
            <span>TCCN (Cơ năng)</span>
            {countCategorySelected('cn') > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                {countCategorySelected('cn')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('tt')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
              activeSection === 'tt'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">C</span>
            <span>TCTT & DHST</span>
            {countCategorySelected('tt') > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                {countCategorySelected('tt')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('tc')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
              activeSection === 'tc'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">D</span>
            <span>TC (Tiền căn)</span>
            {countCategorySelected('tc') > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                {countCategorySelected('tc')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('cls')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ${
              activeSection === 'cls'
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="w-4 h-4 rounded bg-slate-800 text-white text-[10px] flex items-center justify-center font-mono-custom">E</span>
            <span>CLS (Cận lâm sàng)</span>
            {countCategorySelected('cls') > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-600 text-white font-mono-custom font-bold">
                {countCategorySelected('cls')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('selected')}
            className={`px-3 py-1.5 rounded-t-md font-semibold transition-all flex items-center gap-1.5 cursor-pointer border-b-2 -mb-[1px] ml-auto ${
              activeSection === 'selected'
                ? 'border-amber-500 text-amber-800 bg-amber-50/60'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Đã chọn</span>
            {(selected.size + derived.size + negated.size) > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-600 text-white font-mono-custom font-bold">
                {selected.size + derived.size}+{negated.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tier 3: Active Selection Tray (Khay các vấn đề đang kích hoạt) */}
      {(selected.size > 0 || derived.size > 0 || negated.size > 0) && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5">
          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-blue-600" />
              Đang kích hoạt ({selected.size + derived.size} dương tính · {negated.size} âm tính loại trừ):
            </span>
            <button
              type="button"
              onClick={onClearAllSelections}
              className="text-[10.5px] text-red-600 hover:text-red-800 hover:bg-red-50 px-1.5 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Xóa tất cả các triệu chứng đã chọn hoặc loại trừ"
            >
              <Trash2 className="w-3 h-3" />
              Xóa tất cả
            </button>
          </div>

          <div className="flex flex-wrap gap-1 max-h-[95px] overflow-y-auto pr-1">
            {Array.from(selected).map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-600 text-white shadow-2xs"
              >
                <span className="truncate max-w-[170px]">{resolveSymptomName(id)}</span>
                <button
                  type="button"
                  onClick={() => onChipClick(id)}
                  className="hover:bg-blue-700 rounded p-0.5 cursor-pointer"
                  title="Bỏ chọn triệu chứng này"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {Array.from(derived)
              .filter((id) => !selected.has(id))
              .map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-900 border border-blue-300 font-mono-custom"
                  title="Dữ kiện tự suy từ sinh hiệu hoặc xét nghiệm"
                >
                  <span className="truncate max-w-[170px]">⚙ {resolveSymptomName(id)}</span>
                </span>
              ))}
            {Array.from(negated).map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-800 border border-red-200 line-through decoration-red-400"
              >
                <span className="truncate max-w-[170px]">{resolveSymptomName(id)} (-)</span>
                <button
                  type="button"
                  onClick={(e) => onMarkNegative(id, e)}
                  className="hover:bg-red-200 rounded p-0.5 cursor-pointer no-underline"
                  title="Bỏ đánh dấu phủ định"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tier 4: Search & Organ Group Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        {/* Search input */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            id="input-filter-chips"
            type="text"
            value={chipFilter}
            onChange={(e) => setChipFilter(e.target.value)}
            placeholder="🔎 Tìm nhanh: đau ngực, sốt, khó thở, PLT, WBC, HA, troponin..."
            className="w-full pl-8 pr-7 py-1 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors text-slate-800"
          />
          {chipFilter && (
            <button
              onClick={() => setChipFilter('')}
              className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Organ system selector pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 text-xs">
          <span className="text-[11px] text-slate-500 font-medium mr-1 hidden sm:inline">Hệ cơ quan:</span>
          <button
            type="button"
            onClick={() => setActiveOrganGroup('all')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
              activeOrganGroup === 'all'
                ? 'bg-slate-800 text-white font-semibold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Tất cả
          </button>
          {organGroups.map((grp) => {
            const grpColor = GROUP_COLORS[grp] || '#64748b';
            const isSelected = activeOrganGroup === grp;
            return (
              <button
                key={grp}
                type="button"
                onClick={() => setActiveOrganGroup(grp)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? '#ffffff' : grpColor }}
                />
                <span>{grp}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick guide on tri-state interaction */}
      <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-1 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded text-white text-[8px] flex items-center justify-center font-bold">✓</span>
            Bấm tên = Dương tính (+)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-red-100 text-red-700 border border-red-300 rounded text-[9px] flex items-center justify-center font-bold">−</span>
            Bấm nút [-] = Âm tính loại trừ
          </span>
          <span className="flex items-center gap-1">
            <span className="px-1 bg-slate-100 border border-slate-300 rounded text-[9px] font-mono-custom">⚙</span>
            Tự suy từ chỉ số
          </span>
        </div>
        <span className="hidden sm:inline text-slate-400">
          Hiển thị {totalSymptomsCount} mục dữ kiện lâm sàng
        </span>
      </div>
    </div>
  );
};
