import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  Plus, 
  X, 
  CheckCircle2, 
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DrugInteraction, Language } from '../types';
import { DRUG_INTERACTIONS } from '../data/drugInteractions';

interface DrugInteractionCheckerProps {
  antibioticId: string;
  antibioticName: string;
  language: Language;
}

export const DrugInteractionChecker: React.FC<DrugInteractionCheckerProps> = ({
  antibioticId,
  antibioticName,
  language
}) => {
  const [selectedConcurrentDrugs, setSelectedConcurrentDrugs] = useState<string[]>([]);
  const [customSearch, setCustomSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isEn = language === 'en';

  // Find interactions directly involving the selected antibiotic
  const drugInteractions = useMemo(() => {
    return DRUG_INTERACTIONS.filter(di => di.antibioticIds.includes(antibioticId));
  }, [antibioticId]);

  // Available common hospital medications for user to test
  const commonMedsList = useMemo(() => {
    return [
      { id: 'valproate', vi: 'Acid Valproic / Depakine', en: 'Valproic Acid / Depakine' },
      { id: 'vancomycin', vi: 'Vancomycin (tiêm truyền)', en: 'Vancomycin (IV)' },
      { id: 'furosemide', vi: 'Furosemide / Lợi tiểu quai', en: 'Furosemide (Loop diuretic)' },
      { id: 'amiodarone', vi: 'Amiodarone / Thuốc kéo dài QT', en: 'Amiodarone / QTc prolongers' },
      { id: 'warfarin', vi: 'Warfarin / Kháng vitamin K', en: 'Warfarin (Anticoagulant)' },
      { id: 'theophylline', vi: 'Theophylline / Aminophylline', en: 'Theophylline' },
      { id: 'antacids', vi: 'Antacid (Al, Mg) / Sắt, Canxi uống', en: 'Antacids (Al/Mg), Oral Iron/Calcium' },
      { id: 'ssri', vi: 'SSRI / Thuốc chống trầm cảm (Sertraline, v.v.)', en: 'SSRIs / SNRIs (Sertraline, etc.)' },
      { id: 'statin', vi: 'Statin hạ mỡ máu (Atorvastatin)', en: 'Statins (Atorvastatin, Rosuvastatin)' },
      { id: 'tacrolimus', vi: 'Tacrolimus / Cyclosporine (Chống thải ghép)', en: 'Tacrolimus / Cyclosporine' },
      { id: 'calcium_iv', vi: 'Dung dịch Canxi IV / Ringer Lactat', en: 'IV Calcium solutions / Ringer\'s Lactate' },
      { id: 'acei', vi: 'Ức chế men chuyển (Enalapril) / Spironolactone', en: 'ACEi / ARBs / Spironolactone' }
    ];
  }, []);

  const addMedication = (id: string) => {
    if (!selectedConcurrentDrugs.includes(id)) {
      setSelectedConcurrentDrugs([...selectedConcurrentDrugs, id]);
    }
  };

  const removeMedication = (id: string) => {
    setSelectedConcurrentDrugs(selectedConcurrentDrugs.filter(m => m !== id));
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Check if any selected concurrent drug has an interaction
  const activeDetectedAlerts = useMemo(() => {
    return drugInteractions.filter(di => {
      // Check matching keywords in selected drugs
      return selectedConcurrentDrugs.some(drugKey => {
        if (drugKey === 'valproate' && di.id.includes('valproate')) return true;
        if (drugKey === 'vancomycin' && (di.id.includes('vanco') || di.id.includes('nephrotox'))) return true;
        if (drugKey === 'furosemide' && (di.id.includes('nephrotox') || di.interactingDrugVi.includes('Furosemide'))) return true;
        if (drugKey === 'amiodarone' && di.id.includes('qtc')) return true;
        if (drugKey === 'warfarin' && di.id.includes('warfarin')) return true;
        if (drugKey === 'theophylline' && di.id.includes('theophylline')) return true;
        if (drugKey === 'antacids' && di.id.includes('cations')) return true;
        if (drugKey === 'ssri' && di.id.includes('serotonin')) return true;
        if (drugKey === 'statin' && di.id.includes('statin')) return true;
        if (drugKey === 'tacrolimus' && di.id.includes('calcineurin')) return true;
        if (drugKey === 'calcium_iv' && di.id.includes('calcium')) return true;
        if (drugKey === 'acei' && di.id.includes('hyperkalemia')) return true;
        return false;
      });
    });
  }, [drugInteractions, selectedConcurrentDrugs]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isEn ? 'Automatic Drug-Drug Interaction (DDI) Warning' : 'Cảnh Báo Tương Tác Thuốc Tự Động (DDI)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isEn 
                ? `Clinical interaction analysis for ${antibioticName}` 
                : `Phân tích tương tác thuốc lâm sàng cho ${antibioticName}`}
            </p>
          </div>
        </div>

        {drugInteractions.length > 0 && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 self-start sm:self-auto">
            {drugInteractions.length} {isEn ? 'known significant interactions' : 'tương tác đáng chú ý'}
          </span>
        )}
      </div>

      {/* Concurrent Medications Tester Chips */}
      <div className="mb-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
        <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
          <span>{isEn ? 'Test Patient\'s Concurrent Medications:' : 'Kiểm tra thuốc dùng kèm của bệnh nhân:'}</span>
          {selectedConcurrentDrugs.length > 0 && (
            <button
              onClick={() => setSelectedConcurrentDrugs([])}
              className="text-slate-500 hover:text-slate-800 text-[11px] underline"
            >
              {isEn ? 'Clear all' : 'Xóa chọn'}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {commonMedsList.map(med => {
            const isAdded = selectedConcurrentDrugs.includes(med.id);
            return (
              <button
                key={med.id}
                onClick={() => isAdded ? removeMedication(med.id) : addMedication(med.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg flex items-center space-x-1 transition-all ${
                  isAdded
                    ? 'bg-rose-600 text-white shadow-xs font-bold'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{isEn ? med.en : med.vi}</span>
                {isAdded ? <X className="w-3 h-3 ml-1" /> : <Plus className="w-3 h-3 text-slate-400" />}
              </button>
            );
          })}
        </div>

        {/* Real-time Alert for Selected Concurrent Medications */}
        {selectedConcurrentDrugs.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-slate-200/70">
            {activeDetectedAlerts.length > 0 ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 flex items-start space-x-2.5 text-xs animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-900">
                    {isEn ? 'DDI ALERT DETECTED!' : 'PHÁT HIỆN TƯƠNG TÁC THUỐC NGUY HIỂM!'}
                  </span>
                  <p className="mt-0.5 text-rose-800">
                    {isEn 
                      ? `${activeDetectedAlerts.length} severe interaction(s) triggered with current concurrent medication list. Review details below immediately.`
                      : `Phát hiện ${activeDetectedAlerts.length} tương tác nguy cơ cao với thuốc dùng kèm đang chọn. Xem chi tiết cảnh báo bên dưới.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center space-x-2 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isEn 
                    ? 'No critical interaction detected with the selected concurrent drugs.' 
                    : 'Không phát hiện tương tác nghiêm trọng với các thuốc dùng kèm đã chọn.'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* List of Drug Interactions */}
      {drugInteractions.length === 0 ? (
        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isEn 
              ? 'No major contraindications or catastrophic drug interactions registered for this antibiotic.' 
              : 'Kháng sinh này không có tương tác thuốc tối khẩn cấp hoặc chống chỉ định phối hợp tuyệt đối phổ biến.'}
          </span>
        </div>
      ) : (
        <div className="space-y-3">
          {drugInteractions.map((item) => {
            const isMajor = item.severity === 'major';
            const isExpanded = expandedId === item.id;

            return (
              <div 
                key={item.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isMajor 
                    ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300' 
                    : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                }`}
              >
                <div 
                  onClick={() => toggleExpand(item.id)}
                  className="p-3 sm:p-4 cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-2.5">
                    <div className={`p-1.5 rounded-lg shrink-0 ${isMajor ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'}`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-black uppercase px-1.5 py-0.2 rounded ${
                          isMajor ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
                        }`}>
                          {isMajor ? (isEn ? 'Major / Contraindicated' : 'Nguy cơ cao / Chống chỉ định') : (isEn ? 'Moderate / Monitor' : 'Trung bình / Theo dõi')}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {isEn ? item.interactingGroupEn : item.interactingGroupVi}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {isEn ? item.interactingDrugEn : item.interactingDrugVi}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <span className="text-xs text-slate-500 hidden sm:inline">
                      {isExpanded ? (isEn ? 'Collapse' : 'Thu gọn') : (isEn ? 'View details' : 'Chi tiết')}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-200/50 text-xs space-y-2.5 animate-in fade-in duration-150">
                    
                    {/* Clinical Effect */}
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {isEn ? 'Clinical Consequence:' : 'Hậu quả lâm sàng:'}
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {isEn ? item.clinicalEffectEn : item.clinicalEffectVi}
                      </p>
                    </div>

                    {/* Mechanism */}
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {isEn ? 'Pharmacokinetic / Pharmacodynamic Mechanism:' : 'Cơ chế dược động học / Dược lực học:'}
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {isEn ? item.mechanismEn : item.mechanismVi}
                      </p>
                    </div>

                    {/* Clinical Management Recommendation */}
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-900">
                      <span className="font-extrabold text-blue-700 block mb-0.5 flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                        {isEn ? 'Recommended Clinical Management:' : 'Xử trí & Hướng dẫn phối hợp lâm sàng:'}
                      </span>
                      <p className="font-semibold text-slate-800 leading-relaxed">
                        {isEn ? item.managementEn : item.managementVi}
                      </p>
                    </div>

                    {item.referenceSource && (
                      <div className="text-[10px] text-slate-400 italic">
                        {isEn ? 'Source: ' : 'Nguồn: '}{item.referenceSource}
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
