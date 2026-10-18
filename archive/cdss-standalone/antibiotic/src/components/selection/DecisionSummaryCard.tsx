import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  User, 
  Activity, 
  Pill, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { SelectionWizardState, RiskClassificationResult } from '../../selection/types';

interface DecisionSummaryCardProps {
  state: SelectionWizardState;
  riskResult: RiskClassificationResult;
  onNavigateStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  onSwitchToDosing: (drugId?: string) => void;
}

export const DecisionSummaryCard: React.FC<DecisionSummaryCardProps> = ({
  state,
  riskResult,
  onNavigateStep,
  onSwitchToDosing
}) => {
  const isGroup2 = riskResult.group === 'group_2';

  const siteLabels: Record<string, string> = {
    respiratory: 'Hô hấp (Viêm phổi)',
    sepsis: 'Nhiễm khuẩn huyết',
    skin_soft_tissue: 'Da & Mô mềm',
    urinary: 'Tiết niệu',
    peritoneal: 'Dịch báng (SBP)',
    gastrointestinal: 'Tiêu hóa',
    cns: 'Thần kinh trung ương'
  };

  const sepsisSourceLabels: Record<string, string> = {
    respiratory: 'Từ ổ Hô hấp',
    gastrointestinal: 'Từ ổ Tiêu hóa',
    skin_soft_tissue: 'Từ ổ Da mô mềm',
    peritoneal: 'Từ ổ Dịch báng',
    urinary: 'Từ ổ Tiết niệu'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-16 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          <span>Tóm tắt Quyết định CDSS</span>
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Bước {state.currentStep}/5
        </span>
      </div>

      {/* 1. Indication Status */}
      <div 
        onClick={() => onNavigateStep(1)}
        className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 cursor-pointer transition-colors"
      >
        <div className="text-[10px] font-semibold text-slate-400 uppercase">Chỉ định Kháng sinh</div>
        <div className="flex items-center space-x-1.5 mt-0.5">
          {state.indicationConfirmed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">Đủ tiêu chuẩn nhiễm trùng</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-bold text-slate-600">Đang kiểm tra bảng kiểm</span>
            </>
          )}
        </div>
      </div>

      {/* 2. Population & Site */}
      <div 
        onClick={() => onNavigateStep(2)}
        className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 cursor-pointer transition-colors"
      >
        <div className="text-[10px] font-semibold text-slate-400 uppercase">Đối tượng & Ổ nhiễm</div>
        <div className="flex items-center space-x-1.5 mt-0.5">
          <User className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-xs font-bold text-slate-800">
            {state.population === 'adult' ? 'Người lớn' : 'Trẻ em'} • {siteLabels[state.site] || state.site}
          </span>
        </div>
        {state.site === 'sepsis' && state.sepsisSource && (
          <div className="text-[11px] text-slate-500 mt-0.5 ml-5">
            {sepsisSourceLabels[state.sepsisSource] || state.sepsisSource}
          </div>
        )}
      </div>

      {/* 3. Risk Stratification Group */}
      <div 
        onClick={() => onNavigateStep(3)}
        className={`p-3 rounded-xl border cursor-pointer transition-colors ${
          isGroup2 
            ? 'bg-rose-50/70 border-rose-200 text-rose-900' 
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
        }`}
      >
        <div className="text-[10px] font-black uppercase tracking-wide opacity-80">Phân nhóm Nguy cơ VKĐK</div>
        <div className="flex items-center space-x-2 mt-1">
          {isGroup2 ? (
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <div>
            <div className="text-xs font-black">
              {isGroup2 ? 'Nhóm 2: Nguy cơ cao VKĐK' : 'Nhóm 1: Ít nguy cơ VKĐK'}
            </div>
            <div className="text-[10px] opacity-80">
              {riskResult.generalRiskCount}/8 yếu tố chung • {riskResult.severityScoreType.toUpperCase()} = {riskResult.severityScoreValue}
            </div>
          </div>
        </div>

        {/* Specific pathogen tags if Group 2 */}
        {isGroup2 && state.checkedSpecificRisks.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-rose-200/60">
            {state.checkedSpecificRisks.map(r => (
              <span key={r} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-200/80 text-rose-800">
                {r === 'mrsa' ? 'MRSA' : r === 'esbl' ? 'ESBL' : r === 'pseudo_acineto' ? 'Pseudo/Acineto' : 'Enterococcus'}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4. Action: Switch to Dosing Module */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => onSwitchToDosing(state.selectedDrugForDosing)}
          className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
        >
          <Pill className="w-3.5 h-3.5" />
          <span>Chuyển sang Tính liều & CrCl</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <p className="text-[10px] text-slate-400 text-center mt-1.5">
          Tự động đồng bộ đối tượng & kháng sinh đã chọn
        </p>
      </div>
    </div>
  );
};
