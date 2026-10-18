import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Clock, 
  Microscope, 
  Scissors, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Info
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';
import { NHSN_CRITERIA_SECTIONS } from '../../selection/data/nhsnCriteria';

interface StepIndicationProps {
  indicationConfirmed: boolean;
  onConfirmIndication: (confirmed: boolean) => void;
  checkedNhsnIds: string[];
  onToggleNhsnId: (id: string) => void;
  onNextStep: () => void;
}

export const StepIndication: React.FC<StepIndicationProps> = ({
  indicationConfirmed,
  onConfirmIndication,
  checkedNhsnIds,
  onToggleNhsnId,
  onNextStep
}) => {
  const [selectedSyndrome, setSelectedSyndrome] = useState<string>('nhsn_pneumonia_adult');
  const [showTwelveRules, setShowTwelveRules] = useState<boolean>(false);

  const activeSection = NHSN_CRITERIA_SECTIONS.find(s => s.id === selectedSyndrome) || NHSN_CRITERIA_SECTIONS[0];
  const metCount = activeSection.criteria.filter(c => checkedNhsnIds.includes(c.id)).length;
  const isCriteriaMet = metCount >= activeSection.requiredCriteriaCount;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              1
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Xác định Chỉ định Kháng sinh & Bảng kiểm NHSN-CDC
            </h2>
          </div>
          <SourceBadge source={{ doc: 'BVBND_LuuDo', page: [3, 4] }} />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Nguyên tắc 1: Cần xác định rõ có phải bệnh lý nhiễm khuẩn cần chỉ định kháng sinh hay không trước khi kê đơn. 
          Sử dụng bảng kiểm chẩn đoán chuẩn NHSN-CDC 2019 để tránh lạm dụng kháng sinh cho các trường hợp không nhiễm khuẩn hoặc nhiễm virus.
        </p>
      </div>

      {/* Primary Question Callout */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wide">
              Đánh giá Chỉ định Lâm sàng Hiện tại
            </h3>
            <p className="text-xs text-blue-800 mt-1">
              Bệnh nhân có triệu chứng gợi ý nhiễm khuẩn cấp tính, sốc nhiễm khuẩn hoặc dấu hiệu nhiễm trùng cơ quan rõ ràng không?
            </p>
            <div className="flex items-center space-x-3 mt-3">
              <button
                onClick={() => onConfirmIndication(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  indicationConfirmed 
                    ? 'bg-blue-600 text-white shadow-xs' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Xác nhận Có chỉ định Kháng sinh</span>
              </button>
              <button
                onClick={() => onConfirmIndication(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  !indicationConfirmed 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Chưa rõ / Nghi ngờ nhiễm virus (Cần theo dõi thêm)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NHSN-CDC Criteria Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Bảng kiểm Chẩn đoán Nhiễm trùng theo Hội chứng (NHSN-CDC 2019)
            </h3>
            <p className="text-xs text-slate-500">
              Chọn hội chứng tương ứng để kiểm tra tính thỏa tiêu chuẩn chẩn đoán
            </p>
          </div>
          <SourceBadge source={activeSection.source} />
        </div>

        {/* Syndrome Selector Tabs */}
        <div className="flex flex-wrap gap-1.5">
          {NHSN_CRITERIA_SECTIONS.map(sec => (
            <button
              key={sec.id}
              onClick={() => setSelectedSyndrome(sec.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSyndrome === sec.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sec.titleVi.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Selected Criteria Checklist */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-2 border-b border-slate-200">
            <span>{activeSection.titleVi}</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] ${
              isCriteriaMet ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
            }`}>
              Thỏa: {metCount}/{activeSection.requiredCriteriaCount} tiêu chuẩn tối thiểu
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {activeSection.criteria.map(crit => {
              const isChecked = checkedNhsnIds.includes(crit.id);
              return (
                <label
                  key={crit.id}
                  className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                    isChecked ? 'bg-blue-50/80 border border-blue-200' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleNhsnId(crit.id)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 shrink-0"
                  />
                  <span className={`text-xs leading-relaxed ${isChecked ? 'font-bold text-blue-950' : 'text-slate-700'}`}>
                    {crit.textVi}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Twelve Golden Rules Collapsible Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <button
          onClick={() => setShowTwelveRules(!showTwelveRules)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              12 Nguyên tắc Vàng Sử dụng Kháng sinh (BV Bệnh Nhiệt Đới)
            </span>
          </div>
          {showTwelveRules ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showTwelveRules && (
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="flex items-start space-x-2 p-2 rounded-lg bg-slate-50">
              <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Giờ đầu tiên:</strong> Sốc NK & NK nặng phải truyền KS ngay trong 1 giờ đầu.</span>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg bg-slate-50">
              <Microscope className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Cấy bệnh phẩm:</strong> Luôn lấy mẫu vi sinh trước khi truyền liều KS đầu tiên.</span>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg bg-slate-50">
              <Scissors className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span><strong>Kiểm soát ổ nhiễm:</strong> Dẫn lưu ổ áp xe, rút catheter lưu song hành cùng KS.</span>
            </div>
            <div className="flex items-start space-x-2 p-2 rounded-lg bg-slate-50">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Tránh trùng lặp phổ kỵ khí:</strong> Carbapenem/BL-BLI đã phủ kỵ khí, không phối hợp Metronidazole.</span>
            </div>
          </div>
        )}
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNextStep}
          disabled={!indicationConfirmed}
          className={`py-3 px-6 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
            indicationConfirmed
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Tiếp tục: Chọn Đối tượng & Ổ nhiễm trùng</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
