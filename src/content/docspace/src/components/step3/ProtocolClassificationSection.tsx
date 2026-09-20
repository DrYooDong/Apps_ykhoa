import React, { useState } from 'react';
import {
  AlertTriangle,
  Baby,
  Heart,
  Layers,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  DiseaseComplicationItem,
  DiseaseReactionChainDefinition,
  SeverityGradingItem,
} from '../../../data/diagnostic-criteria-database.ts';
import { LabsState, VitalsState } from '../../types.ts';
import { SeverityGradingPanel } from './SeverityGradingPanel.tsx';
import { ComplicationsTriageSection } from './ComplicationsTriageSection.tsx';

interface ProtocolClassificationSectionProps {
  severityGrades: SeverityGradingItem[];
  selectedGradeIdx: number;
  onSelectGradeIdx: (idx: number) => void;
  autoSuggestedGradeIndex?: number;
  activeChain?: DiseaseReactionChainDefinition;
  diseaseId: string;
  diseaseName: string;
  activeComplications: DiseaseComplicationItem[];
  activeComplicationIndices: Set<number>;
  onToggleComplication: (idx: number) => void;
  onAddComplicationOrder: (comp: DiseaseComplicationItem) => void;
  onAddPreventionOrder?: (drug: string, dosage: string, note: string) => void;
  vitals?: VitalsState;
  labs?: LabsState;
  patientAge?: string;
  patientGender?: string;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const ProtocolClassificationSection: React.FC<ProtocolClassificationSectionProps> = ({
  severityGrades,
  selectedGradeIdx,
  onSelectGradeIdx,
  autoSuggestedGradeIndex = 0,
  activeChain,
  diseaseId,
  diseaseName,
  activeComplications,
  activeComplicationIndices,
  onToggleComplication,
  onAddComplicationOrder,
  onAddPreventionOrder,
  vitals,
  labs,
  patientAge,
  patientGender,
  onOpenVaultDrawer,
}) => {
  // Tab state for 1a, 1b, 1c
  const [activeTab, setActiveTab] = useState<'1a' | '1b' | '1c'>('1a');

  const ageNum = patientAge ? parseInt(patientAge, 10) : undefined;
  const isElderly = ageNum !== undefined && ageNum >= 65;
  const isPediatric = ageNum !== undefined && ageNum < 16;
  const isFemale = patientGender === 'nu';
  const hasRenalRisk = labs?.lCre ? parseFloat(labs.lCre) > 115 : false;

  const customSpecialPopulations: Array<{
    population: string;
    adjustments: string;
    cautions?: string;
  }> = (activeChain as any)?.protocol?.specialPopulations || (activeChain as any)?.specialPopulations || [];

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col">
      {/* Tab switcher: 1a, 1b, 1c */}
      <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-600 font-medium">
          Đánh giá phân tầng mức độ nặng, tầm soát biến chứng cấp tính và hiệu chỉnh theo đối tượng đặc biệt
        </p>

        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('1a')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === '1a'
                ? 'bg-white text-indigo-700 shadow-2xs border border-indigo-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1a. Phân độ nặng nhẹ</span>
            {severityGrades.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-indigo-50 text-indigo-700 border border-indigo-200">
                {severityGrades.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('1b')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === '1b'
                ? 'bg-white text-rose-700 shadow-2xs border border-rose-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1b. Phân độ biến chứng</span>
            {activeComplications.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200">
                {activeComplications.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('1c')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === '1c'
                ? 'bg-white text-teal-700 shadow-2xs border border-teal-100'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>1c. Đối tượng đặc biệt</span>
            {(isElderly || isPediatric || hasRenalRisk) && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" title="Có cảnh báo cơ địa" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5">
        {/* 1a. Phân độ nặng nhẹ */}
        {activeTab === '1a' && (
          <div className="space-y-4">
            <SeverityGradingPanel
              severityGrades={severityGrades}
              selectedGradeIdx={selectedGradeIdx}
              onSelectGradeIdx={onSelectGradeIdx}
              autoSuggestedGradeIndex={autoSuggestedGradeIndex}
              activeChain={activeChain}
            />
          </div>
        )}

        {/* 1b. Phân độ biến chứng */}
        {activeTab === '1b' && (
          <div className="space-y-4">
            <ComplicationsTriageSection
              diseaseId={diseaseId}
              diseaseName={diseaseName}
              activeComplications={activeComplications}
              activeComplicationIndices={activeComplicationIndices}
              onToggleComplication={onToggleComplication}
              onAddComplicationOrder={onAddComplicationOrder}
              onAddPreventionOrder={onAddPreventionOrder}
              vitals={vitals}
              labs={labs}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </div>
        )}

        {/* 1c. Các đối tượng đặc biệt */}
        {activeTab === '1c' && (
          <div className="space-y-4">
            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg flex items-center justify-between gap-3 text-xs text-teal-950">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  <b>Hướng dẫn hiệu chỉnh phác đồ trên đối tượng đặc biệt:</b> Xem xét thận trọng dược động học, thanh thải thận/gan, tương tác đa thuốc và các nguy cơ tiềm ẩn ở từng nhóm bệnh nhân.
                </span>
              </div>
            </div>

            {/* Hiển thị khuyến cáo cá thể hoá theo bệnh học chuyên sâu nếu có trong Enriched JSON */}
            {customSpecialPopulations.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-teal-900 flex items-center gap-1.5 px-0.5">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                  <span>Khuyến cáo cá thể hoá theo bệnh học chuyên sâu (EBM Guideline):</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {customSpecialPopulations.map((pop, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 shadow-2xs flex flex-col justify-between gap-2.5 hover:border-teal-300 transition-colors"
                    >
                      <div>
                        <div className="font-bold text-xs text-teal-950 flex items-center gap-1.5 mb-1.5">
                          <Users className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                          <span>{pop.population}</span>
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-semibold text-slate-900">Hiệu chỉnh:</span> {pop.adjustments}
                        </div>
                      </div>
                      {pop.cautions && (
                        <div className="pt-2 border-t border-teal-100 text-[11px] text-amber-900 flex items-start gap-1.5 bg-amber-50/60 p-2 rounded-md border border-amber-200/60">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span><b>Lưu ý:</b> {pop.cautions}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 px-0.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Đánh giá nguy cơ theo nhóm cơ địa sinh lý nền:</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Người cao tuổi */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                  isElderly
                    ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/40'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>Người cao tuổi (≥ 65 tuổi)</span>
                    </span>
                    {isElderly && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300 animate-pulse">
                        Phù hợp BN ({patientAge}t)
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Triệu chứng thường không điển hình (sốt nhẹ, lú lẫn, li bì, mệt mỏi, té ngã).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Nguy cơ quá tải dịch cao (suy tim tiềm tàng, xơ cứng mạch máu). Cần bù dịch thận trọng và theo dõi áp lực tĩnh mạch, nghe phổi.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Khởi đầu liều thấp (Start low, go slow) cho các thuốc an thần, hạ áp, kháng sinh đào thải qua thận.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Ưu tiên đơn giản hóa phác đồ, rà soát hội chứng đa thuốc (Beers Criteria).
                </div>
              </div>

              {/* Trẻ em & Nhũ nhi */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                  isPediatric
                    ? 'bg-blue-50/90 border-blue-300 ring-2 ring-blue-400/40'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Baby className="w-4 h-4 text-blue-600" />
                      <span>Trẻ em &amp; Nhũ nhi</span>
                    </span>
                    {isPediatric && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900 border border-blue-300 animate-pulse">
                        Phù hợp BN ({patientAge}t)
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Bắt buộc tính toán liều thuốc và dịch truyền chính xác theo <b>cân nặng (mg/kg)</b> hoặc diện tích da.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Dấu hiệu sốc thường kín đáo do cơ chế bù trừ mạch nhanh, khi tụt huyết áp là giai đoạn muộn.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Chống chỉ định Aspirin (nguy cơ HC Reye), Tetracycline (&lt; 8 tuổi), Fluoroquinolone (ảnh hưởng sụn khớp).</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Theo dõi sát tri giác, cử động thở, lượng nước tiểu qua tã (&ge; 1 mL/kg/h).
                </div>
              </div>

              {/* Phụ nữ mang thai & Cho con bú */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                  isFemale
                    ? 'bg-rose-50/70 border-rose-200'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-rose-600" />
                      <span>Phụ nữ mang thai &amp; Cho con bú</span>
                    </span>
                    {isFemale && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        Cơ địa nữ
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>Kiểm tra phân loại an toàn thuốc FDA (Category A, B, C, D, X). Tránh NSAID ở 3 tháng cuối (đóng sớm ống động mạch).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>Nguy cơ tiến triển nặng cao hơn ở một số bệnh nhiễm trùng (Cúm, Sốt rét, SXH, Viêm gan E).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold shrink-0">•</span>
                      <span>Theo dõi tim thai, cơn co tử cung và nguy cơ dọa sinh non / băng huyết sau sinh.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Hội chẩn chuyên khoa Sản khi bệnh nhân mang thai mắc bệnh cấp tính nặng.
                </div>
              </div>

              {/* Bệnh nhân suy thận (eGFR giảm) */}
              <div
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                  hasRenalRisk
                    ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-400/40'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Suy giảm chức năng thận (CKD / AKI)</span>
                    </span>
                    {hasRenalRisk && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 border border-amber-300 animate-pulse">
                        Cre: {labs?.lCre} µmol/L
                      </span>
                    )}
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Chỉnh liều kháng sinh và các thuốc bài tiết qua thận theo eGFR / Độ thanh thải Creatinine (Cockcroft-Gault).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Tránh các thuốc độc thận: NSAID, Aminoglycoside, thuốc cản quang nếu không bắt buộc.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>Kiểm soát thể tích dịch truyền chặt chẽ tránh phù phổi cấp và toan chuyển hóa.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Xét nghiệm Ure, Creatinine, Điện giải đồ (K+) định kỳ mỗi 24-48 giờ.
                </div>
              </div>

              {/* Bệnh nhân suy gan / Xơ gan */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-purple-600" />
                      <span>Suy giảm chức năng gan / Xơ gan</span>
                    </span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold shrink-0">•</span>
                      <span>Giảm liều Paracetamol (tối đa 2g/24h ở BN suy gan vừa-nặng hoặc nghiện rượu).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold shrink-0">•</span>
                      <span>Tránh thuốc an thần liều cao gây thúc đẩy bệnh não gan (Hepatoc Encephalopathy).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold shrink-0">•</span>
                      <span>Cảnh giác rối loạn đông máu nội sinh (giảm tổng hợp yếu tố đông máu, giảm tiểu cầu do lách to).</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Đánh giá phân tầng Child-Pugh / MELD score trước khi chỉ định thuốc độc gan.
                </div>
              </div>

              {/* Cơ địa bệnh nền tim mạch & ĐTĐ */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between gap-2.5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>Bệnh nền Tim mạch &amp; Đái tháo đường</span>
                    </span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Nhiễm trùng cấp tính dễ làm mất bù suy tim và khởi phát đợt cấp biến cố tim mạch.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Kiểm soát đường huyết mục tiêu 7.8 - 10.0 mmol/L (140 - 180 mg/dL) trong giai đoạn cấp nội trú.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold shrink-0">•</span>
                      <span>Theo dõi tương tác thuốc giữa kháng sinh, tim mạch (chẹn beta, ức chế men chuyển, kháng đông).</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Khuyến cáo: Đo ECG 12 chuyển đạo và xét nghiệm Troponin nếu có triệu chứng nghi ngờ thiếu máu cơ tim.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
