import React, { useState } from 'react';
import {
  InfectionSite,
  ClinicalResponseStatus,
  CultureStatus,
  SusceptibilityStatus,
  MdrPathogenCategory
} from '../../selection/types';
import {
  evaluate48hReassessment,
  evaluateStopCriteria,
  getMdrPathway
} from '../../selection/engine';
import {
  STOP_ANTIBIOTIC_CHECKLIST,
  IV_TO_PO_CONTRAINDICATIONS,
  IV_TO_PO_DRUG_PAIRS,
  EVIDENCE_BASED_DURATIONS
} from '../../selection/data/stopAndSwitch';
import { SourceBadge } from './SourceBadge';

interface StepReassessProps {
  site: InfectionSite;
  onSelectDrugForDosing: (drugId: string) => void;
  onPrevStep: () => void;
}

export const StepReassess: React.FC<StepReassessProps> = ({
  site,
  onSelectDrugForDosing,
  onPrevStep
}) => {
  // Sub-tabs in Step 5
  const [subTab, setSubTab] = useState<'decision_tree' | 'mdr_pathways' | 'stop_criteria' | 'iv_to_po'>('decision_tree');

  // 1. 48-72h Decision Tree State
  const [clinicalStatus, setClinicalStatus] = useState<ClinicalResponseStatus>('improved');
  const [cultureStatus, setCultureStatus] = useState<CultureStatus>('pending');
  const [susceptibilityStatus, setSusceptibilityStatus] = useState<SusceptibilityStatus>('sensitive');

  // 2. MDR Pathways State
  const [selectedMdr, setSelectedMdr] = useState<MdrPathogenCategory>('cre');
  const [creEnzyme, setCreEnzyme] = useState<'kpc' | 'oxa48' | 'mbl'>('mbl');

  // 3. Stop Checklist State
  const [currentDays, setCurrentDays] = useState<number>(5);
  const [checkedClinical, setCheckedClinical] = useState<string[]>([
    'crit_afebrile',
    'crit_hemodynamic',
    'crit_oxygenation',
    'crit_local_signs',
    'crit_oral_intake'
  ]);
  const [checkedLab, setCheckedLab] = useState<string[]>(['crit_pct']);

  // Evaluations
  const reassessResult = evaluate48hReassessment(
    clinicalStatus,
    cultureStatus,
    susceptibilityStatus
  );

  const stopResult = evaluateStopCriteria(
    checkedClinical,
    checkedLab,
    currentDays,
    site
  );

  const mdrData = getMdrPathway(selectedMdr);

  const toggleClinicalCheck = (id: string) => {
    setCheckedClinical(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleLabCheck = (id: string) => {
    setCheckedLab(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
              Bước 5
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Đánh giá lại 48-72h & Xuống thang / Trúng đích / Ngưng KS
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lưu đồ đánh giá lại hiệu quả sau 48-72 giờ, điều trị trúng đích vi khuẩn đa kháng (CRE, DTR-PA, CRAB), bảng kiểm ngưng kháng sinh và chuyển đổi IV-to-PO.
          </p>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setSubTab('decision_tree')}
          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            subTab === 'decision_tree'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span>⏱️</span>
          <span>1. Đánh giá lại 48-72h (Lưu đồ BVBND)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('mdr_pathways')}
          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            subTab === 'mdr_pathways'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span>🎯</span>
          <span>2. Phác đồ Trúng đích VKĐK (CRE / CRAB / DTR-PA)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('stop_criteria')}
          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            subTab === 'stop_criteria'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span>🛑</span>
          <span>3. Bảng kiểm Ngưng Kháng Sinh</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('iv_to_po')}
          className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            subTab === 'iv_to_po'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span>💊</span>
          <span>4. Chuyển từ Tiêm sang Uống (IV to PO)</span>
        </button>
      </div>

      {/* 1. DECISION TREE 48-72H */}
      {subTab === 'decision_tree' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Nhập tình trạng người bệnh tại thời điểm 48 - 72 giờ:
              </h3>
              <SourceBadge source={{ doc: 'BVBND_LuuDo', page: 2 }} />
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Đáp ứng lâm sàng */}
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  1. Đáp ứng lâm sàng:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'improved', label: 'Cải thiện (Hết sốt, sinh hiệu ổn)', color: 'text-emerald-600 dark:text-emerald-400' },
                    { id: 'not_improved', label: 'Không cải thiện', color: 'text-amber-600 dark:text-amber-400' },
                    { id: 'worsened', label: 'Xấu đi (Sốc, suy tạng tăng)', color: 'text-rose-600 dark:text-rose-400' }
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="clinicalStatus"
                        checked={clinicalStatus === opt.id}
                        onChange={() => setClinicalStatus(opt.id as ClinicalResponseStatus)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`font-medium ${opt.color}`}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kết quả cấy vi sinh */}
              <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  2. Kết quả cấy vi sinh:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'pending', label: 'Đang chờ kết quả' },
                    { id: 'negative', label: 'Âm tính (Không mọc vi khuẩn)' },
                    { id: 'positive', label: 'Dương tính (Phân lập được vi khuẩn)' }
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="cultureStatus"
                        checked={cultureStatus === opt.id}
                        onChange={() => setCultureStatus(opt.id as CultureStatus)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Độ nhạy cảm với KS đang dùng */}
              <div className={`p-3.5 rounded-lg border transition-all ${
                cultureStatus !== 'positive'
                  ? 'opacity-40 pointer-events-none border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
              }`}>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  3. Độ nhạy KS trên KSĐ:
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'sensitive', label: 'Nhạy cảm (S)' },
                    { id: 'resistant', label: 'Đề kháng (R)' },
                    { id: 'intermediate', label: 'Trung gian (I)' }
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="susceptibilityStatus"
                        disabled={cultureStatus !== 'positive'}
                        checked={susceptibilityStatus === opt.id}
                        onChange={() => setSusceptibilityStatus(opt.id as SusceptibilityStatus)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Evaluation Result Banner */}
            <div className={`p-4 rounded-xl border mt-4 ${
              reassessResult.actionType === 'de_escalate'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : reassessResult.actionType === 'switch_by_ast'
                ? 'bg-rose-50/90 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                : reassessResult.actionType === 'consult'
                ? 'bg-amber-50/90 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                : 'bg-blue-50/90 dark:bg-blue-950/20 border-blue-300 dark:border-blue-800 text-blue-950 dark:text-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {reassessResult.actionType === 'de_escalate' ? '🟢' : reassessResult.actionType === 'switch_by_ast' ? '🔴' : reassessResult.actionType === 'consult' ? '🟡' : '🔵'}
                </span>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm">
                    {reassessResult.actionTitleVi}
                  </h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    {reassessResult.recommendationsVi.map((rec, rIdx) => (
                      <li key={rIdx} className="leading-relaxed">{rec}</li>
                    ))}
                  </ul>

                  {/* Badges for eligibility */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {reassessResult.stopChecklistEligible && (
                      <button
                        type="button"
                        onClick={() => setSubTab('stop_criteria')}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all"
                      >
                        Kiểm tra Bảng kiểm ngưng KS ngay →
                      </button>
                    )}
                    {reassessResult.ivToPoEligible && (
                      <button
                        type="button"
                        onClick={() => setSubTab('iv_to_po')}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all"
                      >
                        Xem xét Chuyển đổi IV sang PO →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MDR PATHWAYS */}
      {subTab === 'mdr_pathways' && (
        <div className="space-y-5">
          {/* Chọn vi khuẩn */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'cre', label: 'CRE (Enterobacterales kháng Carbapenem)' },
              { id: 'dtr_pseudo', label: 'DTR-Pseudomonas aeruginosa' },
              { id: 'crab', label: 'CRAB (A. baumannii kháng Carbapenem)' },
              { id: 's_maltophilia', label: 'Stenotrophomonas maltophilia' }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedMdr(item.id as MdrPathogenCategory)}
                className={`p-3 rounded-lg text-left text-xs font-bold border transition-all ${
                  selectedMdr === item.id
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Chi tiết phác đồ trúng đích */}
          {mdrData && (
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {mdrData.titleVi}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {mdrData.definitionVi}
                  </p>
                </div>
                <SourceBadge source={{ doc: 'BVBND_HDSDKS_2026', page: 15 }} />
              </div>

              {/* Nếu là CRE: phân loại Carbapenemase */}
              {selectedMdr === 'cre' && (
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Phân loại theo kiểu men Carbapenemase (kết quả PCR/test nhanh mCIM/Carba NP):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'mbl', label: 'Metallo-beta-lactamase (MBL: NDM, VIM, IMP)' },
                      { id: 'kpc', label: 'Serine Carbapenemase nhóm A (KPC)' },
                      { id: 'oxa48', label: 'OXA-48-like (Serine Carbapenemase nhóm D)' }
                    ].map(enz => (
                      <button
                        key={enz.id}
                        type="button"
                        onClick={() => setCreEnzyme(enz.id as 'kpc' | 'oxa48' | 'mbl')}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-all ${
                          creEnzyme === enz.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {enz.label}
                      </button>
                    ))}
                  </div>

                  {creEnzyme === 'mbl' && (
                    <div className="p-2.5 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200">
                      <strong>⚠️ MBL (NDM):</strong> Men Metallo-beta-lactamase kháng lại CAZ-AVI đơn độc. Bắt buộc phối hợp <strong>Ceftazidime/Avibactam + Aztreonam</strong> truyền đồng thời qua <strong>Y-site</strong>.
                    </div>
                  )}
                </div>
              )}

              {/* Thuốc đầu tay */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Kháng sinh Đầu tay Khuyến cáo:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mdrData.firstLineDrugs.map((drug, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-sm text-blue-900 dark:text-blue-300">
                          {drug.nameVi}
                        </div>
                        <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                          <span className="font-semibold">Liều:</span> {drug.standardDoseVi}
                        </div>
                        {drug.infusionNoteVi && (
                          <div className="mt-1 text-[11px] text-amber-700 dark:text-amber-400">
                            ⏱️ {drug.infusionNoteVi}
                          </div>
                        )}
                      </div>
                      {drug.hasDosingCalculator && drug.drugId && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onSelectDrugForDosing(drug.drugId!)}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white transition-all"
                          >
                            Tính liều →
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phối hợp đặc biệt (nếu có) */}
              {mdrData.combinationRegimens && mdrData.combinationRegimens.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                    Phác đồ Phối hợp Bắt buộc:
                  </h4>
                  {mdrData.combinationRegimens.map((combo, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {combo.map((item, iIdx) => (
                          <React.Fragment key={iIdx}>
                            <span className="font-bold text-xs text-indigo-950 dark:text-indigo-200 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-indigo-200 dark:border-indigo-800">
                              {item.nameVi}
                            </span>
                            {iIdx < combo.length - 1 && (
                              <span className="font-black text-xs text-indigo-500">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      {combo.some(c => c.infusionNoteVi) && (
                        <p className="text-xs text-indigo-900 dark:text-indigo-300">
                          {combo.find(c => c.infusionNoteVi)?.infusionNoteVi}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Cảnh báo đặc thù / Chống chỉ định */}
              {mdrData.contraindicatedOrIneffectiveVi && mdrData.contraindicatedOrIneffectiveVi.length > 0 && (
                <div className="p-3 rounded-lg bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-1">
                  <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                    <span>⛔</span> Phác đồ KHÔNG khuyến cáo / Không hiệu quả:
                  </h4>
                  <ul className="list-disc list-inside text-xs text-rose-800 dark:text-rose-300 space-y-0.5">
                    {mdrData.contraindicatedOrIneffectiveVi.map((warn, wIdx) => (
                      <li key={wIdx}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. STOP CRITERIA CHECKLIST */}
      {subTab === 'stop_criteria' && (
        <div className="space-y-5">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Bảng kiểm Đủ điều kiện Ngưng Kháng Sinh (Stopping Checklist)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dựa trên lưu đồ BV Bệnh Nhiệt Đới & các thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCTs).
                </p>
              </div>
              <SourceBadge source={{ doc: 'BVBND_LuuDo', page: 3 }} />
            </div>

            {/* Input số ngày điều trị */}
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Số ngày bệnh nhân đã dùng kháng sinh hiện tại:
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Thời gian tối thiểu chuẩn cho ổ nhiễm này: <strong className="text-blue-600 dark:text-blue-400">{stopResult.minDays} ngày</strong> ({stopResult.trialName})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="42"
                  value={currentDays}
                  onChange={e => setCurrentDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 px-3 py-1.5 text-center text-sm font-bold rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">ngày</span>
              </div>
            </div>

            {/* 5 Tiêu chuẩn Lâm sàng (Bắt buộc) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Tiêu chuẩn Lâm sàng (Bắt buộc đạt cả 5/5):
                </h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  stopResult.clinicalCriteriaMet
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  Đạt {stopResult.clinicalCriteriaCount} / 5 tiêu chí
                </span>
              </div>

              <div className="space-y-2">
                {STOP_ANTIBIOTIC_CHECKLIST.clinicalCriteria.map(item => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-all text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={checkedClinical.includes(item.id)}
                      onChange={() => toggleClinicalCheck(item.id)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item.textVi}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tiêu chuẩn Cận lâm sàng */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Tiêu chuẩn Cận Lâm sàng (Cần đạt ít nhất 1 chỉ số):
                </h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  stopResult.labCriteriaMet
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}>
                  Đạt {stopResult.labCriteriaCount} chỉ số
                </span>
              </div>

              <div className="space-y-2">
                {STOP_ANTIBIOTIC_CHECKLIST.labCriteria.map(item => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/60 transition-all text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={checkedLab.includes(item.id)}
                      onChange={() => toggleLabCheck(item.id)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {item.textVi}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Kết luận ngưng KS */}
            <div className={`p-4 rounded-xl border text-sm ${
              stopResult.canStop
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{stopResult.canStop ? '🎉' : '⏳'}</span>
                <div>
                  <strong className="font-bold">
                    {stopResult.canStop
                      ? 'ĐỦ ĐIỀU KIỆN XEM XÉT NGƯNG KHÁNG SINH AN TOÀN'
                      : 'CHƯA ĐỦ ĐIỀU KIỆN ĐỂ NGƯNG KHÁNG SINH'}
                  </strong>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {stopResult.canStop
                      ? `Bệnh nhân đã đạt đủ số ngày tối thiểu (${currentDays}/${stopResult.minDays} ngày), thỏa mãn 5/5 tiêu chuẩn ổn định lâm sàng và ít nhất 1 chỉ số chỉ điểm cận lâm sàng thuận lợi. Khuyến cáo ngưng kháng sinh để giảm thiểu độc tính và nguy cơ chọn lọc chủng đề kháng.`
                      : `Hiện tại chưa đạt đủ các tiêu chí ngưng thuốc. Lý do: ${
                          !stopResult.minDurationMet
                            ? `Chưa đủ ngày tối thiểu (${currentDays}/${stopResult.minDays} ngày); `
                            : ''
                        }${
                          !stopResult.clinicalCriteriaMet
                            ? `Chưa đạt đủ 5/5 tiêu chuẩn lâm sàng (${stopResult.clinicalCriteriaCount}/5); `
                            : ''
                        }${
                          !stopResult.labCriteriaMet
                            ? 'Chưa có chỉ số cận lâm sàng thuận lợi.'
                            : ''
                        }`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. IV TO PO SWITCH */}
      {subTab === 'iv_to_po' && (
        <div className="space-y-5">
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Quy trình Chuyển đổi Kháng sinh từ Tiêm sang Uống (IV to PO Switch)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Theo Quyết định số 5631/QĐ-BYT năm 2020 của Bộ Y tế.
                </p>
              </div>
              <SourceBadge source={{ doc: 'BYT_5631_2020', page: 85 }} />
            </div>

            {/* Chống chỉ định chuyển sang uống */}
            <div className="p-3.5 rounded-lg bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                <span>⛔</span> Chống chỉ định chuyển đổi đường uống (Bắt buộc dùng toàn bộ liệu trình qua đường tiêm tĩnh mạch):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-rose-800 dark:text-rose-300">
                {IV_TO_PO_CONTRAINDICATIONS.map((c, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-1.5">
                    <span>•</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bảng các thuốc chuyển đổi */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Danh mục Kháng sinh Chuyển đổi Thường dùng (Nhóm 1 - Sinh khả dụng cao &gt; 90%):
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold">
                      <th className="py-2.5 px-3">Thuốc tiêm (IV)</th>
                      <th className="py-2.5 px-3">Chuyển sang thuốc uống (PO)</th>
                      <th className="py-2.5 px-3">Liều uống khuyến cáo</th>
                      <th className="py-2.5 px-3">Sinh khả dụng (F)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {IV_TO_PO_DRUG_PAIRS.filter(p => p.group === 1).map((pair, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100">
                          {pair.ivName}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-blue-600 dark:text-blue-400">
                          {pair.poName}
                        </td>
                        <td className="py-2.5 px-3">
                          {pair.poDoseVi}
                        </td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                          {pair.bioavailabilityVi}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={onPrevStep}
          className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-all"
        >
          ← Quay lại Bước 4 (Phác đồ khởi đầu)
        </button>
      </div>
    </div>
  );
};
