import React, { useMemo, useState, useEffect } from 'react';
import {
  FileText,
  Copy,
  Check,
  Plus,
  Trash2,
  Star,
  Triangle,
  Compass,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Info,
  Layers,
  AlertCircle,
  AlertTriangle,
  HeartPulse,
  ShieldAlert,
  Stethoscope,
  Microscope,
  MapPin,
  Calendar,
  Bug,
  ShieldCheck,
  Edit3,
  ChevronDown,
  ChevronUp,
  Zap,
  Flame,
  User,
  X,
  Activity,
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
  const [newProblemLabel, setNewProblemLabel] = useState('');
  const [newProblemType, setNewProblemType] = useState<ProblemStatementEntry['type']>('hoi-chung');
  const [newProblemPriority, setNewProblemPriority] = useState<NonNullable<ProblemStatementEntry['priorityLevel']>>('acute');
  const [newProblemDiag, setNewProblemDiag] = useState('');
  const [newProblemRx, setNewProblemRx] = useState('');
  const [expandedProblemIds, setExpandedProblemIds] = useState<Set<string>>(new Set());
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const [editingDiagPlan, setEditingDiagPlan] = useState('');
  const [editingRxPlan, setEditingRxPlan] = useState('');
  const [editingSummary, setEditingSummary] = useState(false);
  const [customSummaryText, setCustomSummaryText] = useState('');

  // Lấy danh sách triệu chứng đã chọn
  const selectedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => selectedIds.has(tc.id));
  }, [kb.trieuChung, selectedIds]);

  const negatedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => negatedIds.has(tc.id));
  }, [kb.trieuChung, negatedIds]);

  const resolveSymptomName = (id: string) => {
    const tc = kb.trieuChung.find((t) => t.id === id);
    if (tc) return tc.ten;
    return id.replace(/_/g, ' ');
  };

  const positiveSymptomsList = useMemo(() => {
    return Array.from(selectedIds).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [selectedIds, kb.trieuChung]);

  const negativeSymptomsList = useMemo(() => {
    return Array.from(negatedIds).map((id) => ({
      id,
      name: resolveSymptomName(id),
    }));
  }, [negatedIds, kb.trieuChung]);

  const vitalsPills = useMemo(() => {
    const list: { label: string; value: string; unit?: string }[] = [];
    if (vitals.vMach) list.push({ label: 'Mạch', value: `${vitals.vMach}`, unit: 'l/p' });
    if (vitals.vHATT && vitals.vHATTr) list.push({ label: 'Huyết áp', value: `${vitals.vHATT}/${vitals.vHATTr}`, unit: 'mmHg' });
    if (vitals.vNhiet) list.push({ label: 'Nhiệt độ', value: `${vitals.vNhiet}`, unit: '°C' });
    if (vitals.vTho) list.push({ label: 'Nhịp thở', value: `${vitals.vTho}`, unit: 'l/p' });
    if (vitals.vSpo2) list.push({ label: 'SpO₂', value: `${vitals.vSpo2}`, unit: '%' });
    return list;
  }, [vitals]);

  const topHypothesis = liveResults && liveResults.length > 0 ? liveResults[0] : null;

  // Dữ liệu phân đoạn chuẩn hóa của Tóm tắt bệnh án
  const summaryStructure = useMemo(() => {
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
    if (form.text.cls.trim()) clsNarrative.push(form.text.cls.trim());

    // 5. Tiền căn
    const tcList: string[] = [];
    if (form.text.tc.trim()) tcList.push(form.text.tc.trim());
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

      // ==========================================
      // TẦNG 1: NGUY CƠ ĐE DỌA TÍNH MẠNG (LIFE-THREATENING)
      // ==========================================
      if (hasHypotension) {
        suggested.push({
          id: 'prob_shock',
          label: 'Hội chứng Sốc / Tụt huyết áp tụt tưới máu mô',
          type: 'hoi-chung',
          priorityLevel: 'life-threatening',
          isPrimary: true, // Ưu tiên số 1 làm trục biện luận
          evidence: [
            !isNaN(sbp)
              ? `Huyết áp ${vitals.vHATT}/${vitals.vHATTr} mmHg${
                  sbp - dbp <= 20 ? ' (Hiệu áp kẹp ≤ 20)' : ''
                }`
              : '',
            !isNaN(pulse) ? `Mạch ${vitals.vMach} l/p` : '',
            'Dấu hiệu giảm tưới máu ngoại vi / CRT kéo dài',
          ].filter(Boolean),
          diagnosticPlan:
            'Khí máu động mạch (ABG), Lactate máu STAT, Cấy máu 2 vị trí trước khi dùng kháng sinh, Công thức máu, Chức năng thận (Ure/Cre).',
          therapeuticPlan:
            'Thiết lập 2 đường truyền tĩnh mạch lớn (16-18G) hoặc CVC, hồi sức dịch tinh thể đẳng trương (NaCl 0.9% / Ringer Lactate) 20-30 mL/kg, sẵn sàng thuốc vận mạch Noradrenaline duy trì MAP ≥ 65 mmHg.',
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
          diagnosticPlan:
            'Khí máu động mạch (ABG), X-quang phổi thẳng tại giường, Siêu âm phổi (BLUE protocol), Điện tâm đồ 12 chuyển đạo.',
          therapeuticPlan:
            'Liệu pháp oxy qua gọng kính hoặc Mask túi dự trữ 10-15 L/p mục tiêu SpO₂ ≥ 95%, nâng đầu cao 30-45 độ, chuẩn bị đặt nội khí quản thở máy nếu kiệt sức hô hấp.',
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
          diagnosticPlan:
            'Tạm hoãn chọc dò dịch não tủy (LP), chụp CT sọ não cấp cứu loại trừ khối choáng chỗ và phù não, xét nghiệm đường huyết mao mạch STAT.',
          therapeuticPlan:
            'Bảo vệ đường thở (đặt NKQ nếu GCS ≤ 8), Mannitol 20% 0.5-1 g/kg hoặc NaCl 3% IV nhanh trong 15-20 phút, tiêm tĩnh mạch Dexamethasone 10mg STAT.',
        });
      }

      // ==========================================
      // TẦNG 2: VẤN ĐỀ CẤP TÍNH & HỘI CHỨNG CẦN CHẨN ĐOÁN (ACUTE)
      // ==========================================
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
          diagnosticPlan:
            'Chọc dò tủy sống (LP) làm sinh hóa, tế bào, nhuộm Gram, cấy DNT và PCR Multiplex ME panel (khi đã loại trừ cờ đỏ dọa tụt kẹt).',
          therapeuticPlan:
            'Kháng sinh diệt khuẩn liều cao qua hàng rào máu não (Ceftriaxone 2g q12h + Vancomycin 15-20mg/kg q8-12h), kết hợp Dexamethasone 10mg IV q6h trong 4 ngày.',
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
          diagnosticPlan:
            'Công thức máu (WBC, Neu%), CRP, Procalcitonin, cấy máu x 2 bộ, tổng phân tích nước tiểu, X-quang phổi.',
          therapeuticPlan:
            'Hạ sốt Paracetamol 10-15 mg/kg q4-6h khi sốt ≥ 38.5°C, bù đủ dịch điện giải (Oresol), dùng kháng sinh kinh nghiệm theo tiêu điểm nghi ngờ.',
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
          diagnosticPlan:
            'Đông máu toàn bộ (PT, INR, aPTT, Fibrinogen), test nhanh Dengue NS1 Ag / IgM-IgG, theo dõi Hct và PLT mỗi 12-24 giờ.',
          therapeuticPlan:
            'Tuyệt đối tránh tiêm bắp, chống chỉ định NSAID/Aspirin, theo dõi sát dấu hiệu cảnh báo thoát huyết tương hoặc xuất huyết nội tạng.',
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
          diagnosticPlan:
            'Điện tâm đồ 12 chuyển đạo trong 10 phút đầu, định lượng Troponin I/T siêu nhạy (hs-cTn) giờ 0 và giờ 1-3, Siêu âm tim tại giường.',
          therapeuticPlan:
            'Nghỉ ngơi tuyệt đối, Aspirin 300mg nhai ngậm, Clopidogrel 300-600mg, Nitroglycerin ngậm dưới lưỡi (nếu HATT > 90), sẵn sàng chuyển Can thiệp mạch vành (PCI).',
        });
      }

      const hasAbdoPain =
        selectedIds.has('dau_hong_phai') || selectedIds.has('dau_thuong_vi') || selectedIds.has('dau_bung_duoi');
      if (hasAbdoPain) {
        suggested.push({
          id: 'prob_abdo',
          label: 'Hội chứng đau bụng cấp cần phân biệt ngoại khoa',
          type: 'hoi-chung',
          priorityLevel: 'acute',
          isPrimary: suggested.length === 0,
          evidence: ['Đau bụng khởi phát cấp tính'].filter(Boolean),
          diagnosticPlan:
            'Siêu âm bụng tổng quát, Amylase/Lipase máu, X-quang bụng đứng không sửa soạn, Công thức máu, Men gan.',
          therapeuticPlan:
            'Tạm nhịn ăn uống, bù dịch tinh thể duy trì, theo dõi sát đề kháng thành bụng/cảm ứng phúc mạc, hội chẩn ngoại khoa khẩn nếu nghi viêm phúc mạc.',
        });
      }

      if (
        epiContext.contactHistory ||
        epiContext.endemicArea ||
        epiContext.outbreakAlert ||
        epiContext.vectorExposure
      ) {
        suggested.push({
          id: 'prob_epi',
          label: 'Yếu tố dịch tễ truyền nhiễm nổi bật',
          type: 'dich-te',
          priorityLevel: 'acute',
          isPrimary: false,
          evidence: [
            epiContext.outbreakAlert ? `Ổ dịch: ${epiContext.outbreakAlert}` : '',
            epiContext.endemicArea ? `Vùng: ${epiContext.endemicArea}` : '',
            epiContext.vectorExposure ? `Vector: ${epiContext.vectorExposure}` : '',
          ].filter(Boolean),
          diagnosticPlan:
            'Xét nghiệm căn nguyên vi sinh đặc hiệu theo dịch tễ (Test nhanh NS1/PCR Dengue, Giọt dày ký sinh trùng sốt rét, PCR Mô cầu/Lao).',
          therapeuticPlan:
            'Báo cáo ca bệnh dịch tễ theo quy định, cách ly nguồn lây nếu có chỉ định, điều trị đặc hiệu theo căn nguyên vùng dịch.',
        });
      }

      // ==========================================
      // TẦNG 3: BỆNH LÝ MẠN TÍNH ĐỒNG MẮC & TIỀN CĂN (CHRONIC)
      // ==========================================
      const tcText = (form.text.tc || '').toLowerCase();
      const chronicMatches: { match: string; label: string; diag: string; rx: string }[] = [
        {
          match: 'tăng huyết áp',
          label: 'Tiền căn Tăng huyết áp',
          diag: 'Đo huyết áp liên tục, ECG, Siêu âm tim kiểm tra phì đại thất trái, Creatinine/eGFR.',
          rx: 'Duy trì thuốc hạ áp phù hợp sinh hiệu (tạm hoãn hạ áp tích cực nếu đang trong bối cảnh sốc/nhiễm trùng).',
        },
        {
          match: 'đái tháo đường',
          label: 'Tiền căn Đái tháo đường',
          diag: 'Theo dõi Glucose mao mạch q4-6h, HbA1c, Khí máu và Ceton máu/nước tiểu nếu đường huyết cao.',
          rx: 'Tạm ngừng Metformin/SGLT2i khi bệnh nhân nặng (nguy cơ suy thận/toan lactic), chuyển phác đồ Insulin tiêm dưới da.',
        },
        {
          match: 'copd',
          label: 'Tiền căn Bệnh phổi tắc nghẽn mạn tính (COPD)',
          diag: 'X-quang ngực, Khí máu động mạch đánh giá ứ CO₂, Procalcitonin.',
          rx: 'Thở oxy liều thấp có kiểm soát (SpO₂ mục tiêu 88-92%), khí dung giãn phế quản SABA + SAMA, Corticosteroid toàn thân liều ngắn.',
        },
        {
          match: 'suy thận',
          label: 'Tiền căn Bệnh thận mạn tính (CKD)',
          diag: 'Ure, Creatinine, eGFR, Điện giải đồ (đặc biệt K⁺), Tổng phân tích nước tiểu.',
          rx: 'Hiệu chỉnh liều kháng sinh và các thuốc thải qua thận theo eGFR, tránh thuốc độc thận (NSAID, Aminoglycosid, thuốc cản quang).',
        },
      ];

      chronicMatches.forEach((c) => {
        if (tcText.includes(c.match)) {
          suggested.push({
            id: `prob_chr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            label: c.label,
            type: 'benh-man-tinh',
            priorityLevel: 'chronic',
            isPrimary: false,
            evidence: [`Ghi nhận từ tiền căn: ${c.label}`],
            diagnosticPlan: c.diag,
            therapeuticPlan: c.rx,
          });
        }
      });

      // Nếu vẫn chưa có vấn đề nào, lấy Lý do vào viện làm vấn đề Tầng 2
      if (suggested.length === 0 && form.lyDo.trim()) {
        suggested.push({
          id: 'prob_chief',
          label: form.lyDo.trim(),
          type: 'trieu-chung',
          priorityLevel: 'acute',
          isPrimary: true,
          evidence: ['Lý do chính khiến người bệnh nhập viện'],
          diagnosticPlan: 'Đề nghị các xét nghiệm tầm soát nguyên nhân theo cơ quan tổn thương.',
          therapeuticPlan: 'Xử trí triệu chứng ban đầu và theo dõi sát diễn tiến lâm sàng.',
        });
      }

      // Đảm bảo luôn có đúng 1 vấn đề isPrimary (ưu tiên Tầng 1 trước)
      if (!suggested.some((p) => p.isPrimary) && suggested.length > 0) {
        suggested[0].isPrimary = true;
      }

      detectConflicts(suggested);

      if (suggested.length > 0) {
        onUpdateProblems(suggested);
      }
    }
  }, [form.lyDo, form.text.tc, vitals, labs, selectedIds, epiContext, problems.length, onUpdateProblems]);

  // Sao chép tóm tắt bệnh án
  const handleCopySummary = () => {
    const textToCopy = editingSummary ? customSummaryText : generatedSummary;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Chọn vấn đề chính để làm trục biện luận
  const handleSetPrimaryProblem = (problemId: string) => {
    const updated = problems.map((p) => ({
      ...p,
      isPrimary: p.id === problemId,
    }));
    onUpdateProblems(updated);
  };

  // Thay đổi tầng ưu tiên của vấn đề (Tầng 1 / 2 / 3)
  const handleUpdateProblemTier = (
    id: string,
    tier: 'life-threatening' | 'acute' | 'chronic'
  ) => {
    const updated = problems.map((p) => {
      if (p.id === id) {
        return { ...p, priorityLevel: tier };
      }
      return p;
    });
    detectConflicts(updated);
    onUpdateProblems(updated);
  };

  // Đóng mở chi tiết kế hoạch xử trí
  const handleToggleExpandProblem = (id: string) => {
    setExpandedProblemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Bắt đầu chỉnh sửa kế hoạch chẩn đoán & điều trị của vấn đề
  const handleStartEditPlans = (p: ProblemStatementEntry) => {
    setEditingProblemId(p.id);
    setEditingDiagPlan(p.diagnosticPlan || '');
    setEditingRxPlan(p.therapeuticPlan || '');
  };

  // Lưu chỉnh sửa kế hoạch chẩn đoán & điều trị
  const handleSaveEditPlans = (id: string) => {
    const updated = problems.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          diagnosticPlan: editingDiagPlan.trim() || undefined,
          therapeuticPlan: editingRxPlan.trim() || undefined,
        };
      }
      return p;
    });
    onUpdateProblems(updated);
    setEditingProblemId(null);
  };

  // Thêm vấn đề mới
  const handleAddProblem = () => {
    if (!newProblemLabel.trim()) return;
    const newEntry: ProblemStatementEntry = {
      id: `prob_${Date.now()}`,
      label: newProblemLabel.trim(),
      type: newProblemType,
      priorityLevel: newProblemPriority,
      isPrimary: problems.length === 0,
      evidence: [],
      diagnosticPlan: newProblemDiag.trim() || undefined,
      therapeuticPlan: newProblemRx.trim() || undefined,
    };
    const updated = [...problems, newEntry];
    detectConflicts(updated);
    onUpdateProblems(updated);
    setNewProblemLabel('');
    setNewProblemDiag('');
    setNewProblemRx('');
  };

  // Xóa vấn đề
  const handleDeleteProblem = (id: string) => {
    const filtered = problems.filter((p) => p.id !== id);
    if (filtered.length > 0 && !filtered.some((p) => p.isPrimary)) {
      filtered[0].isPrimary = true;
    }
    detectConflicts(filtered);
    onUpdateProblems(filtered);
  };

  // Đánh giá Tam giác Chẩn đoán Truyền nhiễm
  const triangleData = useMemo(() => {
    // Đỉnh 1: Dịch tễ (Epidemiology)
    const epiPoints: string[] = [];
    if (epiContext.contactHistory) epiPoints.push(`Tiếp xúc: ${epiContext.contactHistory}`);
    if (epiContext.travelHistory) epiPoints.push(`Đi lại: ${epiContext.travelHistory}`);
    if (epiContext.endemicArea) epiPoints.push(`Vùng dịch: ${epiContext.endemicArea}`);
    if (epiContext.seasonalContext) epiPoints.push(`Mùa: ${epiContext.seasonalContext}`);
    if (epiContext.outbreakAlert) epiPoints.push(`Ổ dịch: ${epiContext.outbreakAlert}`);
    if (epiContext.vectorExposure) epiPoints.push(`Vector: ${epiContext.vectorExposure}`);
    if (epiContext.waterFoodRisk) epiPoints.push(`Nguồn nước/ăn: ${epiContext.waterFoodRisk}`);

    // Đỉnh 2: Lâm sàng (Clinical Symptoms & Signs)
    const clinicalPoints: string[] = [];
    if (parseFloat(vitals.vNhiet) >= 38 || selectedIds.has('sot') || selectedIds.has('sot_cao_27')) {
      clinicalPoints.push(`Sốt cao (${vitals.vNhiet || '≥38'}°C)`);
    }
    if (selectedIds.has('dau_dau')) clinicalPoints.push('Đau đầu');
    if (selectedIds.has('dau_co')) clinicalPoints.push('Đau cơ / mỏi người');
    if (selectedIds.has('dau_hau_mon_orbital')) clinicalPoints.push('Đau sau hốc mắt');
    if (selectedIds.has('ban_xuat_huyet')) clinicalPoints.push('Chấm xuất huyết da niêm');
    if (selectedIds.has('loet_eschar')) clinicalPoints.push('Vết loét hoại tử cộm đen (Eschar)');
    if (selectedIds.has('vang_da')) clinicalPoints.push('Vàng da niêm');
    if (selectedIds.has('dau_bap_chan')) clinicalPoints.push('Đau cơ bắp chân dữ dội');

    // Đỉnh 3: Cận lâm sàng (Paraclinical & Microbiology)
    const paraPoints: string[] = [];
    if (labs.lTC && parseFloat(labs.lTC) < 100) paraPoints.push(`Tiểu cầu giảm: ${labs.lTC} G/L`);
    if (labs.lHct && parseFloat(labs.lHct) > 42) paraPoints.push(`Hct tăng cô đặc: ${labs.lHct}%`);
    if (labs.lBC) paraPoints.push(`Bạch cầu: ${labs.lBC} G/L`);
    if (selectedIds.has('ns1_dengue')) paraPoints.push('Test nhanh NS1 Dengue (+)');
    if (selectedIds.has('ky_sinh_trung_sot_ret')) paraPoints.push('Ký sinh trùng sốt rét giọt dày (+)');
    if (selectedIds.has('men_gan_tang')) paraPoints.push('Men gan AST/ALT tăng cao');

    // Mức độ hội tụ
    const hasEpi = epiPoints.length > 0;
    const hasClin = clinicalPoints.length > 0;
    const hasPara = paraPoints.length > 0;

    let level: 'high' | 'moderate' | 'low' = 'low';
    if (hasEpi && hasClin && hasPara) level = 'high';
    else if ((hasEpi && hasClin) || (hasClin && hasPara)) level = 'moderate';

    // Gợi ý bệnh lý truyền nhiễm từ Tam giác
    let suspectedOrientation = 'Chưa xác định định hướng truyền nhiễm';
    if (hasEpi || hasClin) {
      if (
        epiContext.outbreakAlert?.toLowerCase().includes('dengue') ||
        epiContext.vectorExposure?.toLowerCase().includes('muỗi vằn') ||
        epiContext.vectorExposure?.toLowerCase().includes('aedes') ||
        selectedIds.has('ns1_dengue') ||
        (parseFloat(labs.lTC) < 100 && parseFloat(vitals.vNhiet) >= 38)
      ) {
        suspectedOrientation = 'Nghi ngờ cao: Sốt xuất huyết Dengue (A90/A91) · Vector Aedes aegypti';
      } else if (
        epiContext.travelHistory?.toLowerCase().includes('rừng') ||
        epiContext.vectorExposure?.toLowerCase().includes('mò') ||
        selectedIds.has('loet_eschar')
      ) {
        suspectedOrientation = 'Nghi ngờ cao: Sốt mò (Scrub typhus) · Orientia tsutsugamushi';
      } else if (
        epiContext.waterFoodRisk?.toLowerCase().includes('lụt') ||
        epiContext.waterFoodRisk?.toLowerCase().includes('nước bẩn') ||
        (parseFloat(vitals.vNhiet) >= 38 && selectedIds.has('dau_bap_chan'))
      ) {
        suspectedOrientation = 'Nghi ngờ: Bệnh Leptospirosis · Tiếp xúc nguồn nước ô nhiễm';
      } else if (
        epiContext.travelHistory?.toLowerCase().includes('biên giới') ||
        epiContext.endemicArea?.toLowerCase().includes('tây nguyên') ||
        selectedIds.has('ky_sinh_trung_sot_ret')
      ) {
        suspectedOrientation = 'Nghi ngờ: Sốt rét (Malaria) · Vector Anopheles';
      } else if (parseFloat(vitals.vNhiet) >= 38) {
        suspectedOrientation = 'Theo dõi: Sốt nhiễm trùng cấp chưa rõ tiêu điểm';
      }
    }

    return {
      epiPoints,
      clinicalPoints,
      paraPoints,
      level,
      suspectedOrientation,
    };
  }, [epiContext, vitals, labs, selectedIds]);

  // Tự động nhận diện bệnh lý truyền nhiễm từ dữ kiện ca bệnh
  const autoDetectInfectious = useMemo(() => {
    const tempNum = parseFloat(vitals.vNhiet);
    const hasFever = (!isNaN(tempNum) && tempNum >= 38) || selectedIds.has('sot') || selectedIds.has('sot_cao_27');
    const hasEpi = Boolean(
      epiContext.outbreakAlert ||
      epiContext.endemicArea ||
      epiContext.vectorExposure ||
      epiContext.travelHistory ||
      epiContext.contactHistory ||
      epiContext.waterFoodRisk
    );
    const hasInfectiousLabs =
      selectedIds.has('ns1_dengue') ||
      selectedIds.has('ky_sinh_trung_sot_ret') ||
      (parseFloat(labs.lTC) < 100 && hasFever);
    const hasInfectiousProblem = problems.some(
      (p) =>
        p.type === 'dich-te' ||
        p.label.toLowerCase().includes('nhiễm') ||
        p.label.toLowerCase().includes('sốt') ||
        p.label.toLowerCase().includes('dengue') ||
        p.label.toLowerCase().includes('vi khuẩn') ||
        p.label.toLowerCase().includes('virus')
    );
    return hasFever || hasEpi || hasInfectiousLabs || hasInfectiousProblem;
  }, [vitals.vNhiet, selectedIds, epiContext, labs.lTC, problems]);

  // Công tắc bật/tắt Tam giác Chẩn đoán Truyền nhiễm
  const [infectiousMode, setInfectiousMode] = useState<boolean>(autoDetectInfectious);

  useEffect(() => {
    setInfectiousMode(autoDetectInfectious);
  }, [autoDetectInfectious]);

  // Giao diện Khung Danh Sách Vấn Đề (Problem List) 3 Tầng Chuẩn Y Khoa
  const problemListContent = (
    <div className="space-y-4">
      {/* Banner Nguyên tắc sư phạm lâm sàng từ Bộ môn Nội khoa & Thầy Sĩ */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 font-bold text-blue-900 text-xs sm:text-sm">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Nguyên tắc Đặt Vấn Đề chuẩn Y khoa (Bản nâng cấp của Tóm tắt bệnh án):</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11.5px]">
          Vấn đề là những bất thường cần giải quyết tính đến hiện tại. Gom các triệu chứng rời rạc thành <strong>cụm vấn đề có giá trị định hướng</strong> và bắt buộc phân định thành <strong>3 Tầng Ưu Tiên</strong>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-rose-100/70 border border-rose-200 text-rose-900">
            <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
            <span><b>Tầng 1:</b> Đe dọa tính mạng (Cấp cứu)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-900">
            <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
            <span><b>Tầng 2:</b> Cấp tính (Tìm nguyên nhân)</span>
          </div>
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-blue-100/70 border border-blue-200 text-blue-900">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span><b>Tầng 3:</b> Mạn tính (Đồng mắc / Tiền căn)</span>
          </div>
        </div>
      </div>

      {/* Hiển thị danh sách phân nhóm 3 tầng */}
      {problems.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-600">Chưa có vấn đề lâm sàng nào được xác lập.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Hệ thống sẽ tự động tổng hợp khi nạp dữ kiện ở Bước 1 hoặc bạn có thể tự thêm vấn đề bên dưới.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(['life-threatening', 'acute', 'chronic'] as const).map((tierKey) => {
            const tierProblems = problems.filter((p) => {
              if (tierKey === 'life-threatening') return p.priorityLevel === 'life-threatening';
              if (tierKey === 'acute')
                return p.priorityLevel === 'acute' || (!p.priorityLevel && p.type !== 'benh-man-tinh');
              return p.priorityLevel === 'chronic' || p.type === 'benh-man-tinh';
            });

            if (tierProblems.length === 0) return null;

            const tierMeta = {
              'life-threatening': {
                title: 'TẦNG 1: NGUY CƠ ĐE DỌA TÍNH MẠNG & CẤP CỨU SINH HIỆU',
                subtitle: 'Ưu tiên số 1 · Cần can thiệp hồi sức tức thì trước khi chẩn đoán chi tiết',
                badgeClass: 'bg-rose-600 text-white',
                borderClass: 'border-rose-300 bg-rose-50/30 border-l-4 border-l-rose-600',
                icon: HeartPulse,
                colorText: 'text-rose-900',
              },
              acute: {
                title: 'TẦNG 2: VẤN ĐỀ CẤP TÍNH & HỘI CHỨNG CẦN CHẨN ĐOÁN',
                subtitle: 'Trục biện luận chẩn đoán nguyên nhân bệnh cảnh nhập viện',
                badgeClass: 'bg-amber-500 text-white',
                borderClass: 'border-amber-300 bg-amber-50/20 border-l-4 border-l-amber-500',
                icon: Flame,
                colorText: 'text-amber-900',
              },
              chronic: {
                title: 'TẦNG 3: BỆNH LÝ MẠN TÍNH ĐỒNG MẮC & TIỀN CĂN',
                subtitle: 'Ảnh hưởng trực tiếp đến phác đồ dùng thuốc, độc tính và tiên lượng',
                badgeClass: 'bg-blue-600 text-white',
                borderClass: 'border-blue-300 bg-blue-50/20 border-l-4 border-l-blue-600',
                icon: ShieldCheck,
                colorText: 'text-blue-900',
              },
            }[tierKey];

            const TierIcon = tierMeta.icon;

            return (
              <div key={tierKey} className="space-y-2.5">
                {/* Tiêu đề nhóm Tầng */}
                <div className="flex items-center justify-between gap-2 px-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 ${tierMeta.badgeClass}`}>
                      <TierIcon className="w-3 h-3" />
                      {tierMeta.title}
                    </span>
                    <span className="text-[11px] text-slate-500 hidden sm:inline">
                      ({tierProblems.length} vấn đề) · {tierMeta.subtitle}
                    </span>
                  </div>
                </div>

                {/* Danh sách các card vấn đề trong tầng */}
                <div className="space-y-2.5">
                  {tierProblems.map((prob) => {
                    const isPrimary = prob.isPrimary;
                    const isExpanded = expandedProblemIds.has(prob.id) || !!prob.diagnosticPlan || !!prob.therapeuticPlan;
                    const isEditing = editingProblemId === prob.id;

                    return (
                      <div
                        key={prob.id}
                        className={`p-3.5 rounded-xl border transition-all shadow-2xs ${
                          isPrimary
                            ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                            : tierMeta.borderClass
                        }`}
                      >
                        {/* Header của Card Vấn đề */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs sm:text-sm font-bold text-slate-900">
                                  {prob.label}
                                </span>

                                {isPrimary && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-950 border border-amber-300 rounded-full">
                                    <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                    Trục biện luận chính
                                  </span>
                                )}

                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    prob.type === 'hoi-chung'
                                      ? 'bg-purple-100 text-purple-800'
                                      : prob.type === 'dich-te'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : prob.type === 'bat-thuong-cls'
                                      ? 'bg-amber-100 text-amber-800'
                                      : prob.type === 'benh-man-tinh'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {prob.type === 'hoi-chung'
                                    ? 'Hội chứng'
                                    : prob.type === 'dich-te'
                                    ? 'Dịch tễ'
                                    : prob.type === 'bat-thuong-cls'
                                    ? 'Cận lâm sàng'
                                    : prob.type === 'benh-man-tinh'
                                    ? 'Bệnh mạn tính'
                                    : 'Triệu chứng'}
                                </span>

                                {/* Bộ chọn nhanh chuyển Tầng Ưu Tiên */}
                                <select
                                  value={prob.priorityLevel || tierKey}
                                  onChange={(e) =>
                                    handleUpdateProblemTier(prob.id, e.target.value as any)
                                  }
                                  className="text-[10px] font-medium border border-slate-300 rounded px-1.5 py-0.5 bg-white text-slate-700 focus:outline-none"
                                  title="Chuyển tầng ưu tiên cho vấn đề này"
                                >
                                  <option value="life-threatening">🔴 Tầng 1 (Đe dọa tính mạng)</option>
                                  <option value="acute">🟡 Tầng 2 (Cấp tính)</option>
                                  <option value="chronic">🔵 Tầng 3 (Mạn tính)</option>
                                </select>
                              </div>

                              {/* Dữ kiện chứng minh */}
                              {prob.evidence.length > 0 && (
                                <div className="text-[11px] text-slate-600 mt-1 flex items-center gap-1.5 flex-wrap">
                                  <span className="font-semibold text-slate-700">Dữ kiện:</span>
                                  <span>{prob.evidence.join(' · ')}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            {!isPrimary && (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryProblem(prob.id)}
                                title="Chọn làm vấn đề chính để làm trục biện luận"
                                className="px-2.5 py-1 text-xs text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50 border border-blue-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer font-medium"
                              >
                                <Star className="w-3 h-3 text-amber-500" />
                                <span>Chọn làm VĐ chính</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                if (isEditing) setEditingProblemId(null);
                                else handleStartEditPlans(prob);
                              }}
                              title="Chỉnh sửa Hướng chẩn đoán & Hướng điều trị"
                              className={`p-1.5 text-xs rounded-md border transition-colors cursor-pointer flex items-center gap-1 ${
                                isEditing
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'text-slate-600 bg-white hover:bg-slate-100 border-slate-200'
                              }`}
                            >
                              <Edit3 className="w-3 h-3" />
                              <span className="text-[10px] hidden sm:inline">Sửa hướng xử trí</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteProblem(prob.id)}
                              title="Xóa vấn đề này"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Cảnh báo Xung Đột Xử Trí Điều Trị (Treatment Conflict Detector) */}
                        {prob.conflictNotes && (
                          <div className="mt-2.5 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-950 flex items-start gap-2 shadow-2xs">
                            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            <div className="leading-relaxed">
                              <strong>Cảnh báo Xung Đột Xử Trí:</strong> {prob.conflictNotes}
                            </div>
                          </div>
                        )}

                        {/* 2 CHIẾN LƯỢC HÀNH ĐỘNG SONG HÀNH CHO TỪNG VẤN ĐỀ */}
                        {isEditing ? (
                          <div className="mt-3 p-3 bg-white rounded-lg border border-blue-300 space-y-2.5 text-xs">
                            <div className="font-bold text-blue-950 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-blue-600" />
                              <span>Chỉnh sửa Hướng Xử Trí (Chiến lược Chẩn đoán &amp; Điều trị):</span>
                            </div>
                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                🔬 1. Chiến lược chẩn đoán (Cận lâm sàng đề nghị tiếp theo):
                              </label>
                              <input
                                type="text"
                                value={editingDiagPlan}
                                onChange={(e) => setEditingDiagPlan(e.target.value)}
                                placeholder="VD: Khí máu động mạch, cấy máu 2 vị trí, chụp CT sọ não..."
                                className="w-full border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="font-semibold text-slate-700 block mb-1">
                                💊 2. Hướng xử trí ban đầu &amp; Y lệnh tức thì:
                              </label>
                              <input
                                type="text"
                                value={editingRxPlan}
                                onChange={(e) => setEditingRxPlan(e.target.value)}
                                placeholder="VD: Thở oxy mask có túi 10L/p, Ringer Lactate 20ml/kg, Ceftriaxone 2g TM..."
                                className="w-full border border-slate-300 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setEditingProblemId(null)}
                                className="px-2.5 py-1 text-xs text-slate-600 bg-slate-100 rounded hover:bg-slate-200 cursor-pointer"
                              >
                                Hủy
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveEditPlans(prob.id)}
                                className="px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer"
                              >
                                Lưu kế hoạch
                              </button>
                            </div>
                          </div>
                        ) : (
                          (prob.diagnosticPlan || prob.therapeuticPlan) && (
                            <div className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                              {/* 1. Chiến lược chẩn đoán */}
                              {prob.diagnosticPlan && (
                                <div className="p-2.5 bg-sky-50/80 border border-sky-200/80 rounded-lg text-sky-950">
                                  <div className="font-bold text-[11px] text-sky-900 flex items-center gap-1 mb-1">
                                    <Microscope className="w-3.5 h-3.5 text-sky-600" />
                                    <span>Chiến lược chẩn đoán (Đề nghị CLS):</span>
                                  </div>
                                  <div className="text-[11.5px] leading-relaxed text-slate-700">
                                    {prob.diagnosticPlan}
                                  </div>
                                </div>
                              )}

                              {/* 2. Hướng xử trí điều trị */}
                              {prob.therapeuticPlan && (
                                <div className="p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded-lg text-emerald-950">
                                  <div className="font-bold text-[11px] text-emerald-900 flex items-center gap-1 mb-1">
                                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Hướng xử trí ban đầu &amp; Y lệnh:</span>
                                  </div>
                                  <div className="text-[11.5px] leading-relaxed text-slate-700">
                                    {prob.therapeuticPlan}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form thêm vấn đề tùy chỉnh (Chuẩn 3 Tầng & Song Hành Chẩn Đoán - Điều Trị) */}
      <div className="pt-3 border-t border-slate-200 bg-slate-50/70 p-3.5 rounded-xl border space-y-2.5 text-xs">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Thêm vấn đề mới (Kèm phân tầng ưu tiên và hướng xử trí):</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            placeholder="Tên vấn đề (VD: Cơn tăng huyết áp khẩn cấp, Loét hoại tử cộm đen...)"
            value={newProblemLabel}
            onChange={(e) => setNewProblemLabel(e.target.value)}
            className="sm:col-span-6 text-xs border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />

          <select
            value={newProblemPriority}
            onChange={(e) => setNewProblemPriority(e.target.value as any)}
            className="sm:col-span-3 text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white focus:outline-none"
          >
            <option value="life-threatening">🔴 Tầng 1: Đe dọa tính mạng</option>
            <option value="acute">🟡 Tầng 2: Cấp tính</option>
            <option value="chronic">🔵 Tầng 3: Mạn tính / Tiền căn</option>
          </select>

          <select
            value={newProblemType}
            onChange={(e) => setNewProblemType(e.target.value as any)}
            className="sm:col-span-3 text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white focus:outline-none"
          >
            <option value="hoi-chung">Hội chứng</option>
            <option value="trieu-chung">Triệu chứng</option>
            <option value="bat-thuong-cls">Bất thường CLS</option>
            <option value="dich-te">Yếu tố dịch tễ</option>
            <option value="benh-man-tinh">Bệnh mạn tính</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Chiến lược chẩn đoán (CLS đề nghị cho VĐ này)..."
            value={newProblemDiag}
            onChange={(e) => setNewProblemDiag(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Hướng xử trí ban đầu (Y lệnh tức thì)..."
            value={newProblemRx}
            onChange={(e) => setNewProblemRx(e.target.value)}
            className="text-xs border border-slate-300 rounded-lg px-3 py-1.5 bg-white focus:outline-none"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleAddProblem}
            disabled={!newProblemLabel.trim()}
            className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm vấn đề vào danh sách
          </button>
        </div>
      </div>
    </div>
  );

  // Giao diện Khung Tam Giác Chẩn Đoán Truyền Nhiễm & Panel Dịch Tễ
  const infectiousTriangleContent = (
    <div className="space-y-4">
      {/* Card Tam giác chẩn đoán: Dịch tễ — Lâm sàng — Cận lâm sàng */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Triangle className="w-4 h-4 text-emerald-300 fill-emerald-300/20" />
            <h3 className="text-sm font-bold tracking-tight">
              Tam Giác Chẩn Đoán Truyền Nhiễm
            </h3>
          </div>
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              triangleData.level === 'high'
                ? 'bg-emerald-400 text-emerald-950'
                : triangleData.level === 'moderate'
                ? 'bg-amber-400 text-amber-950'
                : 'bg-slate-700 text-slate-200'
            }`}
          >
            Hội tụ: {triangleData.level === 'high' ? 'Cao' : triangleData.level === 'moderate' ? 'Vừa' : 'Thấp'}
          </span>
        </div>

        <div className="p-4 space-y-4">
          {/* Minh họa trực quan Tam giác chẩn đoán SVG */}
          <div className="relative bg-slate-900 text-white rounded-xl p-4 overflow-hidden border border-slate-800">
            <div className="flex justify-center mb-3">
              <svg width="220" height="130" viewBox="0 0 220 130" className="drop-shadow-md">
                <polygon
                  points="110,15 20,115 200,115"
                  fill="rgba(16, 185, 129, 0.12)"
                  stroke={triangleData.level === 'high' ? '#10b981' : '#38bdf8'}
                  strokeWidth="2.5"
                  strokeDasharray={triangleData.level === 'low' ? '4 4' : 'none'}
                />
                {/* Node 1: Dịch tễ (Đỉnh trên) */}
                <circle cx="110" cy="15" r="7" fill="#10b981" />
                <text x="110" y="32" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                  DỊCH TỄ HỌC
                </text>

                {/* Node 2: Lâm sàng (Đỉnh dưới trái) */}
                <circle cx="20" cy="115" r="7" fill="#38bdf8" />
                <text x="35" y="112" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="start">
                  LÂM SÀNG
                </text>

                {/* Node 3: Cận lâm sàng (Đỉnh dưới phải) */}
                <circle cx="200" cy="115" r="7" fill="#f59e0b" />
                <text x="185" y="112" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="end">
                  CẬN LÂM SÀNG
                </text>
              </svg>
            </div>

            {/* Kết luận định hướng từ tam giác */}
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/80 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Định hướng từ Tam giác Lâm sàng:</span>
              </div>
              <div className="text-slate-200 font-medium leading-snug">
                {triangleData.suspectedOrientation}
              </div>
            </div>
          </div>

          {/* Chi tiết 3 đỉnh của Tam giác */}
          <div className="space-y-3 text-xs">
            {/* Đỉnh 1: Dịch tễ */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  1. Yếu tố Dịch tễ học (Epidemiology)
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">
                  {triangleData.epiPoints.length} dữ kiện
                </span>
              </div>
              {triangleData.epiPoints.length > 0 ? (
                <ul className="space-y-1 text-emerald-900 pl-4 list-disc">
                  {triangleData.epiPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  Chưa ghi nhận yếu tố dịch tễ (bạn có thể bổ sung trong panel bên dưới).
                </p>
              )}
            </div>

            {/* Đỉnh 2: Lâm sàng */}
            <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-900 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                  2. Biểu hiện Lâm sàng (Clinical)
                </span>
                <span className="text-[10px] text-sky-700 font-mono">
                  {triangleData.clinicalPoints.length} dữ kiện
                </span>
              </div>
              {triangleData.clinicalPoints.length > 0 ? (
                <ul className="space-y-1 text-sky-900 pl-4 list-disc">
                  {triangleData.clinicalPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  Chưa ghi nhận triệu chứng nhiễm trùng đặc trưng.
                </p>
              )}
            </div>

            {/* Đỉnh 3: Cận lâm sàng */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5 text-amber-600" />
                  3. Cận lâm sàng & Vi sinh (Paraclinical)
                </span>
                <span className="text-[10px] text-amber-700 font-mono">
                  {triangleData.paraPoints.length} dữ kiện
                </span>
              </div>
              {triangleData.paraPoints.length > 0 ? (
                <ul className="space-y-1 text-amber-900 pl-4 list-disc">
                  {triangleData.paraPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  Chưa nạp cận lâm sàng định hướng (NS1, CTM, men gan...).
                </p>
              )}
            </div>
          </div>

          {/* Nút tra cứu nhanh Kho Dịch tễ học */}
          {onOpenVaultDrawer && (
            <button
              type="button"
              onClick={() => onOpenVaultDrawer('Dịch tễ học', 'Truyền nhiễm', 'DTH')}
              className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tra cứu Kho Dịch Tễ Học (142+ bài viết EBM)
            </button>
          )}
        </div>
      </div>

      {/* Quick Input Panel: Bổ sung nhanh yếu tố dịch tễ */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Bug className="w-4 h-4 text-emerald-600" />
          <span>Bổ sung nhanh Yếu tố Dịch tễ (Tam giác chẩn đoán)</span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Ổ dịch / Bệnh đang lưu hành tại địa phương:
            </label>
            <input
              type="text"
              placeholder="VD: Sốt xuất huyết Dengue, Sởi, Cúm mùa..."
              value={epiContext.outbreakAlert}
              onChange={(e) =>
                onUpdateEpiContext({ ...epiContext, outbreakAlert: e.target.value })
              }
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                Vùng dịch tễ / Nơi ở:
              </label>
              <input
                type="text"
                placeholder="VD: Tây Nguyên, ĐBSCL..."
                value={epiContext.endemicArea}
                onChange={(e) =>
                  onUpdateEpiContext({ ...epiContext, endemicArea: e.target.value })
                }
                className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                Vector / Động vật:
              </label>
              <input
                type="text"
                placeholder="VD: Muỗi vằn, ve mò, chuột..."
                value={epiContext.vectorExposure}
                onChange={(e) =>
                  onUpdateEpiContext({ ...epiContext, vectorExposure: e.target.value })
                }
                className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-slate-600 block mb-1">
              Nguồn nước / Tiếp xúc đặc biệt:
            </label>
            <input
              type="text"
              placeholder="VD: Lội nước ngập lụt, đi rừng suối 10 ngày trước..."
              value={epiContext.waterFoodRisk}
              onChange={(e) =>
                onUpdateEpiContext({ ...epiContext, waterFoodRisk: e.target.value })
              }
              className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header hướng dẫn */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-5 shadow-sm border border-blue-800/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
                Bước 2 / 4 · Chuẩn Y học Lâm sàng
              </span>
              <span className="text-xs text-blue-200/80">
                Theo PGS.TS Hoàng Văn Sĩ & BSCKI Trần Thanh Tuấn
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tóm Tắt Bệnh Án & Đặt Vấn Đề
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-3xl leading-relaxed">
              Quy trình chuẩn: <strong>I. Tóm tắt bệnh án chuẩn hóa</strong> (trực quan hóa các dữ kiện) $\rightarrow$ <strong>II. Đặt vấn đề & Tam giác chẩn đoán truyền nhiễm</strong> (gộp chung để chọn vấn đề chính và đối chiếu định hướng dịch tễ học).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onGoToStep('t1')}
              className="px-3 py-2 text-xs font-medium text-blue-200 hover:text-white hover:bg-white/10 rounded-lg border border-blue-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Sửa dữ kiện
            </button>
            <button
              type="button"
              onClick={() => onGoToStep('t3')}
              className="px-4 py-2 text-xs font-bold text-blue-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Sang Biện luận chẩn đoán
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION I: TÓM TẮT BỆNH ÁN CHUẨN HÓA (Định hướng chẩn đoán - Theo chuẩn Hình 1) */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {/* Header with Title, Mode Switcher, and Copy Button */}
        <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-none">
                Tóm tắt bệnh án chuẩn hóa
              </h2>
              <span className="text-[10.5px] text-slate-400 font-medium">
                Chuẩn lâm sàng EMR · Tự động cập nhật
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Switcher: Trực quan vs Văn bản EMR */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-[11px]">
              <button
                type="button"
                onClick={() => {
                  setSummaryViewMode('structured');
                  setEditingSummary(false);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  summaryViewMode === 'structured' && !editingSummary
                    ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trực quan
              </button>
              <button
                type="button"
                onClick={() => {
                  setSummaryViewMode('emr');
                  setEditingSummary(false);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  summaryViewMode === 'emr' && !editingSummary
                    ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Văn bản EMR
              </button>
              <button
                type="button"
                onClick={() => setEditingSummary(!editingSummary)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  editingSummary
                    ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-amber-700'
                }`}
              >
                {editingSummary ? 'Đang tự sửa' : 'Tự chỉnh sửa'}
              </button>
            </div>

            <button
              type="button"
              id="btn-copy-summary-step2"
              onClick={handleCopySummary}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                copiedSummary
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200/80'
              }`}
              title="Sao chép tóm tắt bệnh án chuẩn EMR vào clipboard"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-5">
          {editingSummary ? (
            <div className="space-y-2">
              <div className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded-md">
                Chế độ soạn thảo tự do: Bạn có thể tinh chỉnh văn phong tóm tắt trước khi lưu hoặc sao chép vào hồ sơ bệnh án.
              </div>
              <textarea
                rows={10}
                value={customSummaryText}
                onChange={(e) => setCustomSummaryText(e.target.value)}
                className="w-full text-xs sm:text-sm font-mono text-slate-800 bg-slate-50/50 border border-slate-300 rounded-lg p-3 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          ) : summaryViewMode === 'emr' ? (
            <div
              id="clinical-summary-box-step2"
              className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl text-xs leading-relaxed text-slate-800 font-mono-custom whitespace-pre-wrap select-all min-h-[140px]"
            >
              {generatedSummary}
            </div>
          ) : (
            /* Structured Visual View - Exactly matching Figure 1 */
            <div id="clinical-summary-structured-step2" className="space-y-3.5 text-xs">
              {/* Section 1: Hành chính & Lý do vào viện */}
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-lg flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {form.gioiTinh === 'nam' ? 'Nam' : form.gioiTinh === 'nu' ? 'Nữ' : 'Chưa rõ giới tính'}
                      {form.tuoi ? `, ${form.tuoi} tuổi` : ''}
                    </span>
                  </span>
                  {form.ngheNghiep && (
                    <span className="text-slate-500 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                      {form.ngheNghiep}
                    </span>
                  )}
                </div>

                <div className="text-[11.5px]">
                  <span className="text-slate-500">Vào viện vì: </span>
                  <b className="text-rose-700 font-semibold">{form.lyDo || 'Chưa ghi nhận'}</b>
                </div>
              </div>

              {/* Section 2: Dấu chứng dương tính có giá trị */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-blue-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>DẤU CHỨNG DƯƠNG TÍNH ({positiveSymptomsList.length}):</span>
                  </span>
                </div>
                {positiveSymptomsList.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {positiveSymptomsList.map((item) => (
                      <span
                        key={item.id}
                        className="px-2 py-1 bg-blue-50 text-blue-800 border border-blue-200/80 rounded-md font-medium text-[11px] flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 italic text-[11px]">Chưa ghi nhận triệu chứng dương tính</span>
                )}
              </div>

              {/* Section 3: Dữ kiện âm tính loại trừ */}
              {negativeSymptomsList.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-rose-900 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      <span>DỮ KIỆN ÂM TÍNH LOẠI TRỪ ({negativeSymptomsList.length}):</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {negativeSymptomsList.map((item) => (
                      <span
                        key={item.id}
                        className="px-2 py-1 bg-rose-50 text-rose-800 border border-rose-200/80 rounded-md font-medium text-[11px] flex items-center gap-1"
                      >
                        <X className="w-3 h-3 text-rose-600 shrink-0" />
                        <span>Không có: {item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Dấu hiệu sinh tồn (Vitals) */}
              {vitalsPills.length > 0 && (
                <div>
                  <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Activity className="w-3 h-3 text-indigo-600" />
                    <span>DẤU HIỆU SINH TỒN:</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-mono-custom">
                    {vitalsPills.map((vp, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 shadow-2xs">
                        <span className="block text-[10px] text-slate-500 font-sans">{vp.label}</span>
                        <b className="text-xs sm:text-sm text-slate-900">
                          {vp.value} <span className="text-[10px] font-normal text-slate-500 font-sans">{vp.unit}</span>
                        </b>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 5: Định hướng chẩn đoán sơ bộ (Nghĩ nhiều nhất) */}
              {topHypothesis ? (
                <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-200/90 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10.5px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>ĐỊNH HƯỚNG CHẨN ĐOÁN SƠ BỘ (NGHĨ NHIỀU NHẤT)</span>
                    </span>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <b className="text-xs sm:text-sm text-slate-900 font-display">
                        {topHypothesis.b.ten}
                      </b>
                      {topHypothesis.b.icd && (
                        <span className="font-mono-custom text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200">
                          ICD-10: {topHypothesis.b.icd}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="block text-[10px] text-slate-500">Độ phù hợp</span>
                    <span className="text-base sm:text-lg font-black text-blue-700 font-mono-custom">
                      {topHypothesis.pct}%
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 text-xs italic">
                  Chưa có định hướng chẩn đoán sơ bộ. Hãy nạp triệu chứng ở Bước 1 để hệ thống CDSS tính toán tự động.
                </div>
              )}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            <span className="italic">
              * Tóm tắt chỉ nêu các triệu chứng/hội chứng dương tính và các triệu chứng âm tính có giá trị loại trừ.
            </span>
            <span className="text-slate-400">Định dạng chuẩn EMR tóm tắt bệnh án</span>
          </div>
        </div>
      </div>

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
                  {problemListContent}
                </div>
                <div className="lg:col-span-5">
                  {infectiousTriangleContent}
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
              {problemListContent}
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
