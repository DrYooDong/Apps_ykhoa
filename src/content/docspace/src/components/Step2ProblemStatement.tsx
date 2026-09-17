import React, { useMemo, useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bug,
  Compass,
  FileText,
  Stethoscope,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import { CaseSummaryPanel, SummaryStructure } from './step2/CaseSummaryPanel.tsx';
import { DiagnosticTrianglePanel } from './step2/DiagnosticTrianglePanel.tsx';
import { ProblemListSection } from './step2/ProblemListSection.tsx';

interface Step2ProblemStatementProps {
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  selectedIds: Set<string>;
  negatedIds: Set<string>;
  kb: KnowledgeBase;
  liveResults?: AnalysisResult[];
  epiContext: EpidemiologyContext;
  onUpdateEpiContext: (epi: EpidemiologyContext) => void;
  problems: ProblemStatementEntry[];
  onUpdateProblems: (problems: ProblemStatementEntry[]) => void;
  onGoToStep: (stepId: 't1' | 't3') => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const Step2ProblemStatement: React.FC<Step2ProblemStatementProps> = ({
  form,
  vitals,
  labs,
  selectedIds,
  negatedIds,
  kb,
  liveResults = [],
  epiContext,
  onUpdateEpiContext,
  problems,
  onUpdateProblems,
  onGoToStep,
  onOpenVaultDrawer,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [summaryViewMode, setSummaryViewMode] = useState<'structured' | 'emr'>('structured');
  const [editingSummary, setEditingSummary] = useState(false);
  const [customSummaryText, setCustomSummaryText] = useState('');
  const [infectiousMode, setInfectiousMode] = useState(true);

  // Lấy danh sách triệu chứng đã chọn
  const selectedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => selectedIds.has(tc.id));
  }, [kb.trieuChung, selectedIds]);

  const negatedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => negatedIds.has(tc.id));
  }, [kb.trieuChung, negatedIds]);

  const topHypothesis = liveResults && liveResults.length > 0 ? liveResults[0] : null;

  // Dữ liệu phân đoạn chuẩn hóa của Tóm tắt bệnh án
  const summaryStructure: SummaryStructure = useMemo(() => {
    const genderStr = form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nữ' : 'Người bệnh';
    const ageStr = form.tuoi ? `${form.tuoi} tuổi` : 'chưa rõ tuổi';
    const reasonStr = form.lyDo || 'chưa ghi nhận';

    // 1. Triệu chứng cơ năng
    const cnList: string[] = [];
    if (form.text.cn.trim()) cnList.push(form.text.cn.trim());
    const cnSymptoms = selectedSymptoms
      .filter((s) => s.loai.includes('cn'))
      .map((s) => s.ten);
    if (cnSymptoms.length > 0) {
      cnList.push(`Dấu hiệu ghi nhận: ${cnSymptoms.join(', ')}`);
    }

    // 2. Triệu chứng thực thể
    const vitalAnomalies: string[] = [];
    const tempNum = parseFloat(vitals.vNhiet);
    if (!isNaN(tempNum) && tempNum >= 38) vitalAnomalies.push(`Sốt ${vitals.vNhiet}°C`);
    const pulseNum = parseFloat(vitals.vMach);
    if (!isNaN(pulseNum) && (pulseNum > 100 || pulseNum < 60)) vitalAnomalies.push(`Mạch ${vitals.vMach} l/p`);
    const sbp = parseFloat(vitals.vHATT);
    const dbp = parseFloat(vitals.vHATTr);
    if (!isNaN(sbp) && !isNaN(dbp)) {
      const isNarrow = sbp - dbp <= 20;
      if (sbp >= 140 || sbp <= 90 || isNarrow) {
        vitalAnomalies.push(`Huyết áp ${vitals.vHATT}/${vitals.vHATTr} mmHg${isNarrow ? ' (Hiệu áp kẹp ≤ 20 mmHg)' : ''}`);
      }
    }
    const respNum = parseFloat(vitals.vTho);
    if (!isNaN(respNum) && respNum > 22) vitalAnomalies.push(`Thở ${vitals.vTho} l/p`);
    const spo2Num = parseFloat(vitals.vSpo2);
    if (!isNaN(spo2Num) && spo2Num < 95) vitalAnomalies.push(`SpO₂ ${vitals.vSpo2}%`);

    const examList: string[] = [];
    if (form.text.tt.trim()) examList.push(form.text.tt.trim());
    const ttSymptoms = selectedSymptoms
      .filter((s) => s.loai.includes('tt'))
      .map((s) => s.ten);
    if (ttSymptoms.length > 0) examList.push(`Dấu hiệu thực thể: ${ttSymptoms.join(', ')}`);

    // 3. Yếu tố Dịch tễ học (Góc nhìn truyền nhiễm)
    const epiList: string[] = [];
    if (epiContext?.endemicArea?.trim()) epiList.push(`Vùng dịch tễ lưu hành: ${epiContext.endemicArea.trim()}`);
    if (epiContext?.outbreakAlert?.trim()) epiList.push(`Ổ dịch địa phương: ${epiContext.outbreakAlert.trim()}`);
    if (epiContext?.vectorExposure?.trim()) epiList.push(`Tiếp xúc vector: ${epiContext.vectorExposure.trim()}`);
    if (epiContext?.contactHistory?.trim()) epiList.push(`Tiếp xúc nguồn lây: ${epiContext.contactHistory.trim()}`);
    if (epiContext?.travelHistory?.trim()) epiList.push(`Tiền sử đi lại: ${epiContext.travelHistory.trim()}`);
    if (epiContext?.seasonalContext?.trim()) epiList.push(`Bối cảnh mùa dịch: ${epiContext.seasonalContext.trim()}`);
    if (epiContext?.waterFoodRisk?.trim()) epiList.push(`Nguồn nước/thực phẩm: ${epiContext.waterFoodRisk.trim()}`);

    // 4. Cận lâm sàng ban đầu
    const labItems: string[] = [];
    if (labs.lBC) labItems.push(`Bạch cầu ${labs.lBC} G/L`);
    if (labs.lTC) labItems.push(`Tiểu cầu ${labs.lTC} G/L`);
    if (labs.lHct) labItems.push(`Hct ${labs.lHct}%`);
    if (labs.lGlu) labItems.push(`Glucose ${labs.lGlu} mmol/L`);
    if (labs.lTrop) labItems.push(`Troponin ${labs.lTrop} ng/L`);
    const clsNarrative: string[] = [];
    if (form?.text?.cls?.trim()) clsNarrative.push(form.text.cls.trim());

    // 5. Tiền căn
    const tcList: string[] = [];
    if (form?.text?.tc?.trim()) tcList.push(form.text.tc.trim());
    const tcSymptoms = selectedSymptoms.filter((s) => s.loai.includes('tc')).map((s) => s.ten);
    if (tcSymptoms.length > 0) tcList.push(`Tiền sử: ${tcSymptoms.join(', ')}`);

    // 6. Dấu hiệu âm tính có giá trị loại trừ
    const negList = negatedSymptoms.map((s) => `Không ${s.ten.toLowerCase()}`);

    return {
      demographics: `Bệnh nhân ${genderStr.toLowerCase()}, ${ageStr}.`,
      reason: `Vào viện vì lý do: ${reasonStr}.`,
      cnList,
      vitalAnomalies,
      examList,
      epiList,
      labItems,
      clsNarrative,
      tcList,
      negList,
    };
  }, [form, vitals, labs, selectedSymptoms, negatedSymptoms, epiContext]);

  // Sinh văn bản Tóm tắt bệnh án tự động chuẩn mực y khoa (xuống hàng thoáng mắt theo từng phần)
  const generatedSummary = useMemo(() => {
    const s = summaryStructure;
    const parts: string[] = [];

    parts.push(`${s.demographics}\n${s.reason}\nQua hỏi bệnh và thăm khám lâm sàng, ghi nhận các vấn đề chính sau:`);

    if (s.cnList.length > 0) {
      parts.push(`1. Triệu chứng cơ năng:\n${s.cnList.map((item) => `- ${item}`).join('\n')}`);
    } else {
      parts.push(`1. Triệu chứng cơ năng:\n- Chưa ghi nhận bất thường đặc hiệu.`);
    }

    const ttParts: string[] = [];
    if (s.vitalAnomalies.length > 0) {
      ttParts.push(`- Sinh hiệu bất thường: ${s.vitalAnomalies.join(' · ')}`);
    }
    if (s.examList.length > 0) {
      s.examList.forEach((e) => ttParts.push(`- ${e}`));
    }
    if (ttParts.length > 0) {
      parts.push(`2. Triệu chứng thực thể:\n${ttParts.join('\n')}`);
    } else {
      parts.push(`2. Triệu chứng thực thể:\n- Tổng trạng ổn định, chưa ghi nhận dấu hiệu nặng.`);
    }

    if (s.epiList.length > 0) {
      parts.push(`3. Yếu tố dịch tễ (Góc nhìn truyền nhiễm):\n${s.epiList.map((e) => `- ${e}`).join('\n')}`);
    }

    const clsParts: string[] = [];
    if (s.labItems.length > 0) {
      clsParts.push(`- Chỉ số xét nghiệm: ${s.labItems.join(' · ')}`);
    }
    if (s.clsNarrative.length > 0) {
      s.clsNarrative.forEach((c) => clsParts.push(`- ${c}`));
    }
    if (clsParts.length > 0) {
      parts.push(`4. Cận lâm sàng ban đầu:\n${clsParts.join('\n')}`);
    }

    if (s.tcList.length > 0) {
      parts.push(`5. Tiền căn:\n${s.tcList.map((t) => `- ${t}`).join('\n')}`);
    }

    if (s.negList.length > 0) {
      parts.push(`6. Dấu hiệu âm tính có giá trị loại trừ:\n- ${s.negList.join('; ')}`);
    }

    return parts.join('\n\n');
  }, [summaryStructure]);

  // Đồng bộ customSummaryText khi generatedSummary thay đổi
  useEffect(() => {
    setCustomSummaryText(generatedSummary);
  }, [generatedSummary]);

  // Hàm phát hiện mâu thuẫn / xung đột xử trí lâm sàng giữa các vấn đề
  const detectConflicts = (probs: ProblemStatementEntry[]) => {
    const hasBleedingOrPlt = probs.some(
      (p) =>
        p.label.toLowerCase().includes('xuất huyết') ||
        p.label.toLowerCase().includes('tiểu cầu') ||
        p.evidence.some((e) => e.toLowerCase().includes('tiểu cầu') || e.toLowerCase().includes('xuất huyết'))
    );
    const hasCardiac = probs.some(
      (p) =>
        p.label.toLowerCase().includes('mạch vành') ||
        p.label.toLowerCase().includes('đau ngực') ||
        p.label.toLowerCase().includes('rung nhĩ')
    );
    const hasShockFluid = probs.some(
      (p) => p.label.toLowerCase().includes('sốc') || p.label.toLowerCase().includes('tụt huyết áp')
    );
    const hasHeartFailure = probs.some(
      (p) => p.label.toLowerCase().includes('suy tim') || p.evidence.some((e) => e.toLowerCase().includes('suy tim'))
    );
    const hasMeningitis = probs.some((p) => p.label.toLowerCase().includes('màng não'));
    const hasHerniation = probs.some(
      (p) => p.label.toLowerCase().includes('tụt kẹt') || p.label.toLowerCase().includes('hôn mê')
    );

    probs.forEach((p) => {
      p.conflictNotes = undefined;
      if (hasBleedingOrPlt && hasCardiac) {
        if (p.priorityLevel === 'acute' || p.priorityLevel === 'life-threatening') {
          p.conflictNotes =
            '⚠️ Mâu thuẫn điều trị: Nguy cơ xuất huyết do giảm tiểu cầu đối lập với chỉ định dùng kháng đông / kháng kết tập tiểu cầu trong bệnh lý mạch vành. Cần hội chẩn chuyên khoa tim mạch để cân nhắc liều hoặc can thiệp cơ học.';
        }
      }
      if (hasShockFluid && hasHeartFailure) {
        if (p.label.toLowerCase().includes('sốc') || p.label.toLowerCase().includes('tụt huyết áp')) {
          p.conflictNotes =
            '⚠️ Mâu thuẫn điều trị: Cần bù dịch nhanh chống sốc nhưng có nguy cơ quá tải tuần hoàn gây phù phổi cấp trên nền suy tim. Cần theo dõi sát CVP, siêu âm IVC tại giường và phối hợp thuốc vận mạch sớm.';
        }
      }
      if (hasMeningitis && hasHerniation) {
        if (p.label.toLowerCase().includes('màng não')) {
          p.conflictNotes =
            '⚠️ Thận trọng cấp cứu: Nghi ngờ Viêm màng não kèm dấu hiệu dọa tụt kẹt não là CHỐNG CHỈ ĐỊNH chọc dò tủy sống (LP) ngay. Tiêm ngay Kháng sinh + Dexamethasone TM và chụp CT sọ não cấp cứu trước.';
        }
      }
    });
  };

  // Tự động suy luận danh sách vấn đề ban đầu theo chuẩn 3 Tầng Ưu Tiên
  useEffect(() => {
    if (problems.length === 0) {
      const suggested: ProblemStatementEntry[] = [];

      const sbp = parseFloat(vitals.vHATT);
      const dbp = parseFloat(vitals.vHATTr);
      const pulse = parseFloat(vitals.vMach);
      const resp = parseFloat(vitals.vTho);
      const spo2 = parseFloat(vitals.vSpo2);
      const temp = parseFloat(vitals.vNhiet);
      const plt = parseFloat(labs.lTC);

      const hasHypotension =
        (!isNaN(sbp) && sbp <= 90) ||
        (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20 && sbp > 0);
      const hasSevereDyspnea =
        (!isNaN(spo2) && spo2 < 92) || (!isNaN(resp) && resp > 28) || selectedIds.has('kho_tho_khi_nam');
      const hasNeuroEmergency =
        selectedIds.has('hon_me') ||
        selectedIds.has('co_giat') ||
        selectedIds.has('dau_hieu_than_kinh_nguy_hiem');

      // Tầng 1: Đe dọa tính mạng
      if (hasHypotension) {
        suggested.push({
          id: 'prob_shock',
          label: 'Hội chứng Sốc / Tụt huyết áp tụt tưới máu mô',
          type: 'hoi-chung',
          priorityLevel: 'life-threatening',
          isPrimary: true,
          evidence: [
            !isNaN(sbp)
              ? `Huyết áp ${vitals.vHATT}/${vitals.vHATTr} mmHg${
                  sbp - dbp <= 20 ? ' (Hiệu áp kẹp ≤ 20)' : ''
                }`
              : '',
            !isNaN(pulse) ? `Mạch ${vitals.vMach} l/p` : '',
            'Dấu hiệu giảm tưới máu ngoại vi / CRT kéo dài',
          ].filter(Boolean),
        });
      }

      if (hasSevereDyspnea) {
        suggested.push({
          id: 'prob_resp_distress',
          label: 'Hội chứng Suy hô hấp cấp giảm oxy máu',
          type: 'hoi-chung',
          priorityLevel: 'life-threatening',
          isPrimary: suggested.length === 0,
          evidence: [
            !isNaN(spo2) ? `SpO₂ tụt: ${vitals.vSpo2}%` : 'Giảm oxy máu',
            !isNaN(resp) ? `Nhịp thở nhanh: ${vitals.vTho} l/p` : 'Thở nhanh co kéo',
          ].filter(Boolean),
        });
      }

      if (hasNeuroEmergency) {
        suggested.push({
          id: 'prob_neuro_em',
          label: 'Hôn mê / Tăng áp lực nội sọ / Dọa tụt kẹt não',
          type: 'hoi-chung',
          priorityLevel: 'life-threatening',
          isPrimary: suggested.length === 0,
          evidence: ['Rối loạn tri giác / Co giật kéo dài / Dấu thần kinh khu trú'],
        });
      }

      // Tầng 2: Cấp tính
      const hasMeningeal =
        selectedIds.has('cung_gay') ||
        (selectedIds.has('dau_dau') && selectedIds.has('non_oi') && (temp >= 38 || selectedIds.has('sot')));
      if (hasMeningeal) {
        suggested.push({
          id: 'prob_meningitis',
          label: 'Hội chứng màng não cấp tính',
          type: 'hoi-chung',
          priorityLevel: 'acute',
          isPrimary: suggested.length === 0,
          evidence: ['Cứng gáy, đau đầu dữ dội, nôn vọt, sợ ánh sáng'],
        });
      }

      const hasFever = selectedIds.has('sot') || selectedIds.has('sot_cao_27') || temp >= 38;
      if (hasFever && !hasMeningeal) {
        suggested.push({
          id: 'prob_inf',
          label: 'Hội chứng nhiễm trùng cấp tính',
          type: 'hoi-chung',
          priorityLevel: 'acute',
          isPrimary: suggested.length === 0,
          evidence: ['Sốt ≥ 38°C hoặc sốt liên tục', vitals.vNhiet ? `Nhiệt độ: ${vitals.vNhiet}°C` : ''].filter(
            Boolean
          ),
        });
      }

      const hasBleeding =
        selectedIds.has('ban_xuat_huyet') || selectedIds.has('xuat_huyet_ad') || selectedIds.has('tieu_mau');
      const hasThrombocytopenia = (!isNaN(plt) && plt < 100) || selectedIds.has('tieu_cau_giam');
      if (hasBleeding || hasThrombocytopenia) {
        suggested.push({
          id: 'prob_hemo',
          label: 'Hội chứng xuất huyết / Giảm tiểu cầu cấp',
          type: 'hoi-chung',
          priorityLevel: 'acute',
          isPrimary: suggested.length === 0,
          evidence: [
            hasBleeding ? 'Biểu hiện xuất huyết da niêm' : '',
            labs.lTC ? `Tiểu cầu giảm: ${labs.lTC} G/L` : '',
          ].filter(Boolean),
        });
      }

      const hasChestPain = selectedIds.has('dau_nguc') || selectedIds.has('dau_nguc_lan');
      if (hasChestPain) {
        suggested.push({
          id: 'prob_cardiac',
          label: 'Cơn đau ngực cấp nghi ngờ mạch vành',
          type: 'hoi-chung',
          priorityLevel: 'acute',
          isPrimary: suggested.length === 0,
          evidence: ['Đau ngực sau xương ức', labs.lTrop ? `Troponin: ${labs.lTrop}` : ''].filter(Boolean),
        });
      }

      // Tầng 3: Mạn tính
      if (selectedIds.has('thc_tha')) {
        suggested.push({
          id: 'prob_htn',
          label: 'Tăng huyết áp (Tiền căn bệnh nền)',
          type: 'benh-ly',
          priorityLevel: 'chronic',
          evidence: ['Tiền căn tăng huyết áp mạn tính'],
        });
      }
      if (selectedIds.has('dt_dai_duong')) {
        suggested.push({
          id: 'prob_dm',
          label: 'Đái tháo đường (Tiền căn bệnh nền)',
          type: 'benh-ly',
          priorityLevel: 'chronic',
          evidence: ['Tiền căn đái tháo đường'],
        });
      }

      detectConflicts(suggested);
      onUpdateProblems(suggested);
    }
  }, [selectedIds, vitals, labs, problems.length]);

  const handleCopySummary = () => {
    const textToCopy = customSummaryText || generatedSummary;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* SECTION I: TÓM TẮT BỆNH ÁN CHUẨN HÓA */}
      <CaseSummaryPanel
        summaryStructure={summaryStructure}
        summaryViewMode={summaryViewMode}
        setSummaryViewMode={setSummaryViewMode}
        editingSummary={editingSummary}
        setEditingSummary={setEditingSummary}
        customSummaryText={customSummaryText}
        setCustomSummaryText={setCustomSummaryText}
        generatedSummary={generatedSummary}
        copiedSummary={copiedSummary}
        handleCopySummary={handleCopySummary}
        topResult={topHypothesis}
      />

      {/* SECTION II: ĐẶT VẤN ĐỀ & TAM GIÁC CHẨN ĐOÁN (GỘP CHUNG) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-800">
              II. Đặt Vấn Đề (Problem List) & Tam Giác Chẩn Đoán
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              ({problems.length} vấn đề)
            </span>
          </div>

          {/* Công tắc chuyển đổi Chế độ Truyền nhiễm & Tam giác DTH */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setInfectiousMode(!infectiousMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                infectiousMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 shadow-2xs'
                  : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
              }`}
              title="Nhấp để bật hoặc tắt Tam giác Chẩn đoán Truyền nhiễm"
            >
              {infectiousMode ? (
                <>
                  <Bug className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chế độ Truyền nhiễm: <b>BẬT Tam giác DTH</b></span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-3.5 h-3.5 text-slate-500" />
                  <span>Bệnh lý Nội/Ngoại khoa: <b>TẮT Tam giác DTH</b></span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          {infectiousMode ? (
            <div className="space-y-4">
              {/* Banner chế độ truyền nhiễm */}
              <div className="flex items-center justify-between gap-2 p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <Bug className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Phân tích Bệnh lý Truyền nhiễm:</strong> Tam giác chẩn đoán (Dịch tễ — Lâm sàng — Cận lâm sàng) được kết hợp trực tiếp cùng Đặt vấn đề để biện luận nguyên nhân nhiễm trùng.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInfectiousMode(false)}
                  className="text-[11px] text-emerald-700 hover:underline shrink-0 cursor-pointer"
                >
                  Ẩn tam giác
                </button>
              </div>

              {/* Lưới gộp chung 2 cột: Đặt vấn đề (7 cột) & Tam giác chẩn đoán (5 cột) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <ProblemListSection
                    problems={problems}
                    onUpdateProblems={onUpdateProblems}
                    onOpenVaultDrawer={onOpenVaultDrawer}
                  />
                </div>
                <div className="lg:col-span-5">
                  <DiagnosticTrianglePanel
                    epiContext={epiContext}
                    onUpdateEpiContext={onUpdateEpiContext}
                    selectedSymptoms={selectedSymptoms}
                    onOpenVaultDrawer={onOpenVaultDrawer}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Banner chế độ nội/ngoại khoa thông thường */}
              <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    <strong>Chế độ Bệnh lý Nội/Ngoại khoa:</strong> Tập trung vào hội chứng lâm sàng và cơ chế bệnh sinh. Không áp dụng Tam giác Dịch tễ học.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInfectiousMode(true)}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-md transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Bug className="w-3 h-3 text-emerald-600" />
                  <span>Bật Tam giác Truyền nhiễm</span>
                </button>
              </div>

              {/* Danh sách vấn đề full-width */}
              <ProblemListSection
                problems={problems}
                onUpdateProblems={onUpdateProblems}
                onOpenVaultDrawer={onOpenVaultDrawer}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onGoToStep('t1')}
          className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Bước 1: Nạp dữ kiện
        </button>

        <button
          type="button"
          onClick={() => onGoToStep('t3')}
          className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
        >
          Tiếp tục sang Bước 3: Phân tích & Biện luận
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
