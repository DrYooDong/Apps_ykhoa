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
  Stethoscope,
  Microscope,
  MapPin,
  Calendar,
  Bug,
  ShieldCheck,
} from 'lucide-react';
import {
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
  epiContext,
  onUpdateEpiContext,
  problems,
  onUpdateProblems,
  onGoToStep,
  onOpenVaultDrawer,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [newProblemLabel, setNewProblemLabel] = useState('');
  const [newProblemType, setNewProblemType] = useState<ProblemStatementEntry['type']>('hoi-chung');
  const [editingSummary, setEditingSummary] = useState(false);
  const [customSummaryText, setCustomSummaryText] = useState('');

  // Lấy danh sách triệu chứng đã chọn
  const selectedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => selectedIds.has(tc.id));
  }, [kb.trieuChung, selectedIds]);

  const negatedSymptoms = useMemo(() => {
    return kb.trieuChung.filter((tc) => negatedIds.has(tc.id));
  }, [kb.trieuChung, negatedIds]);

  // Sinh văn bản Tóm tắt bệnh án tự động theo chuẩn BSCKI Trần Thanh Tuấn
  const generatedSummary = useMemo(() => {
    const genderStr = form.gioiTinh === 'nam' ? 'nam' : form.gioiTinh === 'nu' ? 'nữ' : 'người bệnh';
    const ageStr = form.tuoi ? `${form.tuoi} tuổi` : 'chưa rõ tuổi';
    const reasonStr = form.lyDo || 'chưa ghi nhận';
    
    // Gom triệu chứng cơ năng
    const cnList: string[] = [];
    if (form.text.cn.trim()) cnList.push(form.text.cn.trim());
    const cnSymptoms = selectedSymptoms
      .filter((s) => s.loai.includes('cn'))
      .map((s) => s.ten);
    if (cnSymptoms.length > 0) {
      cnList.push(cnSymptoms.join(', '));
    }

    // Gom triệu chứng thực thể
    const ttList: string[] = [];
    // Sinh hiệu bất thường
    const vitalAnomalies: string[] = [];
    const tempNum = parseFloat(vitals.vNhiet);
    if (!isNaN(tempNum) && tempNum >= 38) vitalAnomalies.push(`Sốt ${vitals.vNhiet}°C`);
    const pulseNum = parseFloat(vitals.vMach);
    if (!isNaN(pulseNum) && (pulseNum > 100 || pulseNum < 60)) vitalAnomalies.push(`Mạch ${vitals.vMach} l/p`);
    const sbp = parseFloat(vitals.vHATT);
    const dbp = parseFloat(vitals.vHATTr);
    if (!isNaN(sbp) && !isNaN(dbp) && (sbp >= 140 || sbp <= 90)) vitalAnomalies.push(`Huyết áp ${vitals.vHATT}/${vitals.vHATTr} mmHg`);
    const respNum = parseFloat(vitals.vTho);
    if (!isNaN(respNum) && respNum > 22) vitalAnomalies.push(`Thở ${vitals.vTho} l/p`);
    const spo2Num = parseFloat(vitals.vSpo2);
    if (!isNaN(spo2Num) && spo2Num < 95) vitalAnomalies.push(`SpO₂ ${vitals.vSpo2}%`);

    if (vitalAnomalies.length > 0) ttList.push(vitalAnomalies.join(', '));
    if (form.text.tt.trim()) ttList.push(form.text.tt.trim());
    const ttSymptoms = selectedSymptoms
      .filter((s) => s.loai.includes('tt'))
      .map((s) => s.ten);
    if (ttSymptoms.length > 0) ttList.push(ttSymptoms.join(', '));

    // Gom yếu tố Dịch tễ học (Tam giác chẩn đoán)
    const epiList: string[] = [];
    if (epiContext.contactHistory.trim()) epiList.push(`Tiếp xúc: ${epiContext.contactHistory.trim()}`);
    if (epiContext.travelHistory.trim()) epiList.push(`Du lịch/Đi lại: ${epiContext.travelHistory.trim()}`);
    if (epiContext.endemicArea.trim()) epiList.push(`Vùng lưu hành: ${epiContext.endemicArea.trim()}`);
    if (epiContext.seasonalContext.trim()) epiList.push(`Mùa dịch: ${epiContext.seasonalContext.trim()}`);
    if (epiContext.outbreakAlert.trim()) epiList.push(`Ổ dịch lưu hành: ${epiContext.outbreakAlert.trim()}`);
    if (epiContext.vectorExposure.trim()) epiList.push(`Tiếp xúc vector/động vật: ${epiContext.vectorExposure.trim()}`);
    if (epiContext.waterFoodRisk.trim()) epiList.push(`Nguồn nước/thực phẩm: ${epiContext.waterFoodRisk.trim()}`);

    // Gom Cận lâm sàng ban đầu
    const clsList: string[] = [];
    const labItems: string[] = [];
    if (labs.lBC) labItems.push(`Bạch cầu ${labs.lBC} G/L`);
    if (labs.lTC) labItems.push(`Tiểu cầu ${labs.lTC} G/L`);
    if (labs.lHct) labItems.push(`Hct ${labs.lHct}%`);
    if (labs.lGlu) labItems.push(`Glucose ${labs.lGlu} mmol/L`);
    if (labs.lTrop) labItems.push(`Troponin ${labs.lTrop} ng/L`);
    if (labItems.length > 0) clsList.push(labItems.join(', '));
    if (form.text.cls.trim()) clsList.push(form.text.cls.trim());

    // Tiền căn
    const tcList: string[] = [];
    if (form.text.tc.trim()) tcList.push(form.text.tc.trim());
    const tcSymptoms = selectedSymptoms.filter((s) => s.loai.includes('tc')).map((s) => s.ten);
    if (tcSymptoms.length > 0) tcList.push(tcSymptoms.join(', '));

    // Dấu hiệu âm tính có giá trị
    const negList = negatedSymptoms.map((s) => `Không ${s.ten.toLowerCase()}`);

    let text = `Bệnh nhân ${genderStr}, ${ageStr}, vào viện vì lý do ${reasonStr}.\n`;
    text += `Qua hỏi bệnh và thăm khám lâm sàng, ghi nhận các vấn đề sau:\n`;
    text += `1. Triệu chứng cơ năng: ${cnList.length > 0 ? cnList.join('; ') : 'Chưa ghi nhận bất thường đặc hiệu.'}\n`;
    text += `2. Triệu chứng thực thể: ${ttList.length > 0 ? ttList.join('; ') : 'Tổng trạng ổn định, chưa ghi nhận dấu hiệu nặng.'}\n`;
    if (epiList.length > 0) {
      text += `3. Yếu tố dịch tễ (Góc nhìn truyền nhiễm): ${epiList.join('; ')}\n`;
    }
    if (clsList.length > 0) {
      text += `4. Cận lâm sàng ban đầu: ${clsList.join('; ')}\n`;
    }
    if (tcList.length > 0) {
      text += `5. Tiền căn: ${tcList.join('; ')}\n`;
    }
    if (negList.length > 0) {
      text += `6. Dấu hiệu âm tính có giá trị: ${negList.join(', ')}\n`;
    }

    return text;
  }, [form, vitals, labs, selectedSymptoms, negatedSymptoms, epiContext]);

  // Đồng bộ customSummaryText khi generatedSummary thay đổi lần đầu
  useEffect(() => {
    if (!customSummaryText) {
      setCustomSummaryText(generatedSummary);
    }
  }, [generatedSummary]);

  // Tự động suy luận danh sách vấn đề ban đầu nếu chưa có vấn đề nào
  useEffect(() => {
    if (problems.length === 0) {
      const suggested: ProblemStatementEntry[] = [];
      const hasFever = selectedIds.has('sot') || selectedIds.has('sot_cao_27') || parseFloat(vitals.vNhiet) >= 38;
      const hasChestPain = selectedIds.has('dau_nguc') || selectedIds.has('dau_nguc_lan');
      const hasDyspnea = selectedIds.has('kho_tho') || selectedIds.has('kho_tho_khi_nam');
      const hasAbdoPain = selectedIds.has('dau_hong_phai') || selectedIds.has('dau_thuong_vi') || selectedIds.has('dau_bung_duoi');
      const hasBleeding = selectedIds.has('ban_xuat_huyet') || selectedIds.has('xuat_huyet_ad') || selectedIds.has('tieu_mau');
      const hasThrombocytopenia = parseFloat(labs.lTC) < 100 || selectedIds.has('tieu_cau_giam');

      // Vấn đề 1: Triệu chứng nhập viện chính
      if (form.lyDo.trim()) {
        suggested.push({
          id: 'prob_chief',
          label: form.lyDo.trim(),
          type: 'trieu-chung',
          isPrimary: true, // Mặc định lý do vào viện làm vấn đề chính
          evidence: ['Lý do chính khiến bệnh nhân tìm đến chăm sóc y khoa'],
        });
      }

      // Vấn đề nhiễm trùng
      if (hasFever) {
        suggested.push({
          id: 'prob_inf',
          label: 'Hội chứng nhiễm trùng cấp',
          type: 'hoi-chung',
          isPrimary: suggested.length === 0,
          evidence: ['Sốt ≥ 38°C hoặc sốt liên tục', vitals.vNhiet ? `Nhiệt độ: ${vitals.vNhiet}°C` : ''].filter(Boolean),
        });
      }

      // Vấn đề dịch tễ
      if (epiContext.contactHistory || epiContext.endemicArea || epiContext.outbreakAlert || epiContext.vectorExposure) {
        suggested.push({
          id: 'prob_epi',
          label: 'Yếu tố dịch tễ truyền nhiễm nổi bật',
          type: 'dich-te',
          isPrimary: false,
          evidence: [
            epiContext.outbreakAlert ? `Ổ dịch: ${epiContext.outbreakAlert}` : '',
            epiContext.endemicArea ? `Vùng: ${epiContext.endemicArea}` : '',
            epiContext.vectorExposure ? `Vector: ${epiContext.vectorExposure}` : '',
          ].filter(Boolean),
        });
      }

      // Vấn đề xuất huyết / tiểu cầu
      if (hasBleeding || hasThrombocytopenia) {
        suggested.push({
          id: 'prob_hemo',
          label: 'Hội chứng xuất huyết / Giảm tiểu cầu',
          type: 'hoi-chung',
          isPrimary: false,
          evidence: [
            hasBleeding ? 'Biểu hiện xuất huyết da niêm' : '',
            labs.lTC ? `Tiểu cầu: ${labs.lTC} G/L` : '',
          ].filter(Boolean),
        });
      }

      // Vấn đề đau ngực / tim mạch
      if (hasChestPain) {
        suggested.push({
          id: 'prob_cardiac',
          label: 'Cơn đau ngực cấp nghi ngờ mạch vành',
          type: 'hoi-chung',
          isPrimary: false,
          evidence: ['Đau ngực sau xương ức', labs.lTrop ? `Troponin: ${labs.lTrop}` : ''].filter(Boolean),
        });
      }

      // Vấn đề suy hô hấp
      if (hasDyspnea) {
        suggested.push({
          id: 'prob_resp',
          label: 'Hội chứng suy hô hấp',
          type: 'hoi-chung',
          isPrimary: false,
          evidence: ['Khó thở', vitals.vSpo2 ? `SpO₂: ${vitals.vSpo2}%` : ''].filter(Boolean),
        });
      }

      // Vấn đề đau bụng cấp
      if (hasAbdoPain) {
        suggested.push({
          id: 'prob_abdo',
          label: 'Hội chứng đau bụng cấp',
          type: 'hoi-chung',
          isPrimary: false,
          evidence: ['Đau bụng khởi phát cấp tính'].filter(Boolean),
        });
      }

      if (suggested.length > 0) {
        onUpdateProblems(suggested);
      }
    }
  }, [form.lyDo, vitals, labs, selectedIds, epiContext, problems.length, onUpdateProblems]);

  // Sao chép tóm tắt bệnh án
  const handleCopySummary = () => {
    const textToCopy = editingSummary ? customSummaryText : generatedSummary;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  // Chọn vấn đề chính để biện luận
  const handleSetPrimaryProblem = (problemId: string) => {
    const updated = problems.map((p) => ({
      ...p,
      isPrimary: p.id === problemId,
    }));
    onUpdateProblems(updated);
  };

  // Thêm vấn đề mới
  const handleAddProblem = () => {
    if (!newProblemLabel.trim()) return;
    const newEntry: ProblemStatementEntry = {
      id: `prob_${Date.now()}`,
      label: newProblemLabel.trim(),
      type: newProblemType,
      isPrimary: problems.length === 0,
      evidence: [],
    };
    onUpdateProblems([...problems, newEntry]);
    setNewProblemLabel('');
  };

  // Xóa vấn đề
  const handleDeleteProblem = (id: string) => {
    const filtered = problems.filter((p) => p.id !== id);
    if (filtered.length > 0 && !filtered.some((p) => p.isPrimary)) {
      filtered[0].isPrimary = true;
    }
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
              Tổng hợp có cấu trúc các dữ kiện từ Bước 1, xác lập danh sách vấn đề và chọn <strong>Vấn đề chính</strong> làm trục biện luận. Tích hợp <strong>Tam giác chẩn đoán Truyền nhiễm (Dịch tễ — Lâm sàng — Cận lâm sàng)</strong>.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột trái: Tóm tắt bệnh án & Đặt vấn đề (7 cột) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Tóm tắt bệnh án chuẩn hóa */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-bold text-slate-800">
                  I. Tóm Tắt Bệnh Án Chuẩn Hóa
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSummary(!editingSummary)}
                  className="px-2.5 py-1 text-xs text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 rounded-md transition-colors cursor-pointer"
                >
                  {editingSummary ? 'Xem bản sinh tự động' : 'Tự chỉnh sửa'}
                </button>
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                    copiedSummary
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Đã chép
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Sao chép
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4">
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
              ) : (
                <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 text-xs sm:text-sm text-slate-800 font-sans leading-relaxed whitespace-pre-line">
                  {customSummaryText || generatedSummary}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="italic">
                  * Tóm tắt chỉ nêu các triệu chứng/hội chứng dương tính và các triệu chứng âm tính có giá trị loại trừ.
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Đặt vấn đề (Problem List) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-800">
                  II. Đặt Vấn Đề (Problem List)
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                {problems.length} vấn đề được ghi nhận
              </span>
            </div>

            <div className="p-4 space-y-4">
              {/* Lời khuyên lâm sàng từ BSCKI Trần Thanh Tuấn */}
              <div className="flex items-start gap-2.5 bg-blue-50/70 border border-blue-200/80 p-3 rounded-lg text-xs text-blue-900 leading-relaxed">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Nguyên tắc chọn Vấn đề chính (Thầy Tuấn & Thầy Sĩ):</strong> Vấn đề là những bất thường cần được giải quyết. Ở bệnh nhân có nhiều vấn đề, <strong>chọn 1 vấn đề nổi bật nhất (thường là lý do nhập viện hoặc tình trạng đe dọa sinh hiệu)</strong> để làm trục biện luận chính. Các vấn đề còn lại sẽ hỗ trợ hoặc đánh giá bệnh đi kèm.
                </div>
              </div>

              {/* Danh sách các vấn đề */}
              <div className="space-y-2.5">
                {problems.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                    <p className="text-xs text-slate-500">Chưa có vấn đề nào được xác lập.</p>
                    <p className="text-[11px] text-slate-400">Hãy thêm vấn đề bên dưới hoặc nạp thêm dữ kiện ở Bước 1.</p>
                  </div>
                ) : (
                  problems.map((prob, idx) => {
                    const isPrimary = prob.isPrimary;
                    return (
                      <div
                        key={prob.id}
                        className={`p-3 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isPrimary
                            ? 'bg-blue-50/80 border-blue-300 ring-1 ring-blue-400/30 shadow-2xs'
                            : 'bg-white hover:bg-slate-50/80 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0 flex-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                              isPrimary
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {idx + 1}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {prob.label}
                              </span>
                              {isPrimary && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                  Vấn đề chính biện luận
                                </span>
                              )}
                              <span
                                className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                                  prob.type === 'hoi-chung'
                                    ? 'bg-purple-100 text-purple-800'
                                    : prob.type === 'dich-te'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : prob.type === 'bat-thuong-cls'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {prob.type === 'hoi-chung'
                                  ? 'Hội chứng'
                                  : prob.type === 'dich-te'
                                  ? 'Dịch tễ'
                                  : prob.type === 'bat-thuong-cls'
                                  ? 'Cận lâm sàng'
                                  : 'Triệu chứng'}
                              </span>
                            </div>

                            {prob.evidence.length > 0 && (
                              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                                <span className="font-semibold text-slate-600">Dữ kiện:</span>
                                <span>{prob.evidence.join(' · ')}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {!isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryProblem(prob.id)}
                              title="Chọn làm vấn đề chính để làm trục biện luận"
                              className="px-2.5 py-1 text-xs text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50 border border-blue-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Star className="w-3 h-3 text-amber-500" />
                              <span>Chọn làm VĐ chính</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteProblem(prob.id)}
                            title="Xóa vấn đề này"
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Form thêm vấn đề tùy chỉnh */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập vấn đề mới (VD: Cơn tăng huyết áp, Vết loét hoại tử...)"
                  value={newProblemLabel}
                  onChange={(e) => setNewProblemLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddProblem();
                    }
                  }}
                  className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <select
                  value={newProblemType}
                  onChange={(e) => setNewProblemType(e.target.value as any)}
                  className="text-xs border border-slate-300 rounded-lg px-2.5 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="hoi-chung">Hội chứng</option>
                  <option value="trieu-chung">Triệu chứng</option>
                  <option value="dich-te">Yếu tố dịch tễ</option>
                  <option value="bat-thuong-cls">Bất thường CLS</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddProblem}
                  disabled={!newProblemLabel.trim()}
                  className="px-3 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Thêm vấn đề
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cột phải: Tam giác chẩn đoán Truyền nhiễm (5 cột) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card Tam giác chẩn đoán: Dịch tễ — Lâm sàng — Cận lâm sàng */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Triangle className="w-4 h-4 text-emerald-300 fill-emerald-300/20" />
                <h2 className="text-sm font-bold tracking-tight">
                  III. Tam Giác Chẩn Đoán Truyền Nhiễm
                </h2>
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
              {/* Minh họa trực quan Tam giác chẩn đoán */}
              <div className="relative bg-slate-900 text-white rounded-xl p-4 overflow-hidden border border-slate-800">
                {/* Visual SVG Triangle */}
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
