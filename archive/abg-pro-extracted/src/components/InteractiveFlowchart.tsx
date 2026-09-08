import React, { useState } from 'react';
import {
  GitFork,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  Activity,
  Flame,
  ChevronRight,
  Info,
  ShieldAlert,
  Wind
} from 'lucide-react';
import { ABGInput } from '../types/abg';

interface InteractiveFlowchartProps {
  onLoadPresetToAnalyzer?: (input: ABGInput) => void;
  onOpenGlossary?: (term?: string) => void;
}

interface DiagnosisResult {
  id: string;
  name: string;
  englishName: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  severity: 'Cấp cứu tối khẩn' | 'Cảnh báo nguy kịch' | 'Theo dõi tích cực' | 'Sinh lý bình thường';
  summary: string;
  mechanism: string;
  etiologies: string[];
  actionPlan: string[];
  clinicalPearls: string;
  sampleAbg: ABGInput;
}

interface FlowStepHistory {
  stepId: string;
  title: string;
  chosenOptionLabel: string;
}

export const InteractiveFlowchart: React.FC<InteractiveFlowchartProps> = ({
  onLoadPresetToAnalyzer,
  onOpenGlossary
}) => {
  // Current node in state machine
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<FlowStepHistory[]>([]);
  const [finalDiagnosis, setFinalDiagnosis] = useState<DiagnosisResult | null>(null);

  // Restart decision process
  const handleReset = () => {
    setCurrentNodeId('start');
    setHistory([]);
    setFinalDiagnosis(null);
  };

  // Step back to a specific index in history
  const handleJumpToHistory = (index: number) => {
    const targetStep = history[index];
    setCurrentNodeId(targetStep.stepId);
    setHistory(history.slice(0, index));
    setFinalDiagnosis(null);
  };

  // Helper to transition
  const handleSelectOption = (
    stepTitle: string,
    chosenLabel: string,
    nextNodeId: string,
    diagnosis?: DiagnosisResult
  ) => {
    setHistory((prev) => [
      ...prev,
      { stepId: currentNodeId, title: stepTitle, chosenOptionLabel: chosenLabel }
    ]);

    if (diagnosis) {
      setFinalDiagnosis(diagnosis);
      setCurrentNodeId('diagnosis');
    } else {
      setCurrentNodeId(nextNodeId);
    }
  };

  // -------------------------------------------------------------
  // DIAGNOSIS PRESETS DEFINITIONS
  // -------------------------------------------------------------

  const DIAG_METABOLIC_ACIDOSIS_HIGH_AG: DiagnosisResult = {
    id: 'meta-acid-high-ag',
    name: 'Toan Chuyển Hóa TĂNG Anion Gap (High AG Acidosis)',
    englishName: 'High Anion Gap Metabolic Acidosis (HAGMA)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-300',
    bgColor: 'bg-rose-50/50',
    textColor: 'text-rose-950',
    severity: 'Cảnh báo nguy kịch',
    summary:
      'Tích tụ bất thường các acid cố định không bay hơi (non-volatile acids) làm tiêu thụ gốc Bicarbonate đệm ngoại bào, tạo khoảng trống Anion lớn (AG > 16-18 mEq/L).',
    mechanism:
      'Các ion acid lạ tích tụ giải phóng H⁺ làm giảm HCO₃⁻, trong khi nồng độ Clorid máu vẫn bình thường hoặc giảm nhẹ, dẫn đến Anion Gap = Na⁺ - (Cl⁻ + HCO₃⁻) tăng vọt.',
    etiologies: [
      'Nhiễm toan Ceton đái tháo đường (DKA) hoặc toan ceton do rượu',
      'Toan Lactic (Type A: sốc nhiễm khuẩn, giảm tưới máu; Type B: suy gan, metformin)',
      'Suy thận cấp/mạn giai đoạn cuối (tích tụ phosphate, sulfate hữu cơ)',
      'Ngộ độc cồn độc: Methanol (cồn công nghiệp), Ethylene glycol (chất làm mát xe hơi)',
      'Ngộ độc Salicylate (Aspirin), ngộ độc Paracetamol liều cao kéo dài (5-oxoproline)'
    ],
    actionPlan: [
      'Kiểm tra ngay nồng độ Lactate máu, Glucose mao mạch, Ceton máu/nước tiểu và chức năng thận (Creatinine/BUN).',
      'Tính chỉ số Delta Ratio (ΔAG / ΔHCO₃⁻) để tìm kiếm toan/kiềm hỗn hợp che giấu.',
      'Tính PaCO₂ kỳ vọng theo công thức Winter: PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2 để kiểm tra bù trừ hô hấp.',
      'Hồi sức nguyên nhân gốc: Bù dịch tinh thể, truyền insulin (DKA), kháng sinh và vận mạch (Sốc nhiễm trùng), lọc máu cấp cứu nếu ngộ độc methanol/suy thận.'
    ],
    clinicalPearls:
      'Bảng mã hiện đại chuẩn: GOLDMARK (Glycols, Oxoproline, L-lactate, D-lactate, Methanol, Aspirin, Renal failure, Ketoacidosis). Luôn hiệu chỉnh Anion Gap nếu Albumin máu < 4.0 g/dL!',
    sampleAbg: {
      pH: 7.18,
      pCO2: 24,
      pO2: 95,
      hco3: 9,
      be: -16,
      sao2: 97,
      fio2: 21,
      unit: 'mmHg',
      na: 138,
      k: 5.2,
      cl: 96,
      lactate: 2.1,
      glucose: 24
    }
  };

  const DIAG_METABOLIC_ACIDOSIS_NORMAL_AG: DiagnosisResult = {
    id: 'meta-acid-normal-ag',
    name: 'Toan Chuyển Hóa Anion Gap BÌNH THƯỜNG (Tăng Clo Máu)',
    englishName: 'Normal Anion Gap / Hyperchloraemic Metabolic Acidosis (NAGMA)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50/50',
    textColor: 'text-amber-950',
    severity: 'Theo dõi tích cực',
    summary:
      'Mất trực tiếp Bicarbonate qua đường tiêu hóa hoặc qua thận. Để duy trì trung hòa điện tích, thận tái hấp thu thêm ion Clorid dẫn đến tăng Clo máu.',
    mechanism:
      'Mỗi đương lượng HCO₃⁻ bị mất ra ngoài được thay thế chính xác bằng một đương lượng Cl⁻ từ dịch lọc cầu thận, do đó Anion Gap vẫn nằm trong khoảng 8 - 16 mEq/L.',
    etiologies: [
      'Tiêu chảy cấp mất một lượng lớn dịch ruột kiềm giàu HCO₃⁻',
      'Hồi sức truyền quá nhiều dung dịch muối Natri Clorid 0.9% (chứa 154 mmol/L Cl⁻)',
      'Toan hóa ống thận (RTA): Type 1 (ống lượn xa), Type 2 (ống lượn gần), Type 4 (kháng aldosterone)',
      'Rò tụy, rò mật hoặc dẫn lưu ống sonde ruột non kéo dài',
      'Sử dụng thuốc ức chế men Carbonic Anhydrase (Acetazolamide)'
    ],
    actionPlan: [
      'Xét nghiệm Clo máu, kiểm tra tiền sử tiêu chảy hoặc truyền dịch muối 0.9% trước đó.',
      'Tính Anion Gap Nước Tiểu: U_AG = (Na_niệu + K_niệu) - Cl_niệu để phân biệt nguyên nhân tại thận vs ngoài thận.',
      'Nếu do truyền dịch NaCl 0.9%: Chuyển sang dịch cân bằng như Ringer Lactate hoặc Plasmalyte.',
      'Bù nước điện giải đường uống (ORS) hoặc truyền tĩnh mạch, bổ sung Bicarbonate nếu pH < 7.20 do tiêu chảy nặng.'
    ],
    clinicalPearls:
      'Bảng mã ghi nhớ: HARDUPS (Hyperalimentation, Acetazolamide, RTA, Diarrhoea, Uretero-sigmoidostomy, Pancreatic fistula, Saline resuscitation).',
    sampleAbg: {
      pH: 7.28,
      pCO2: 30,
      pO2: 92,
      hco3: 14,
      be: -10,
      sao2: 97,
      fio2: 21,
      unit: 'mmHg',
      na: 140,
      k: 3.2,
      cl: 116,
      lactate: 1.1
    }
  };

  const DIAG_ACUTE_RESPIRATORY_ACIDOSIS: DiagnosisResult = {
    id: 'acute-resp-acid',
    name: 'Toan Hô Hấp CẤP TÍNH (Chưa Có Bù Trừ Thận)',
    englishName: 'Acute Uncompensated Respiratory Acidosis',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-300',
    bgColor: 'bg-rose-50/50',
    textColor: 'text-rose-950',
    severity: 'Cấp cứu tối khẩn',
    summary:
      'Giảm thông khí phế nang cấp tính đột ngột làm ứ trệ acid bay hơi CO₂ trong máu. Thận chưa kịp khởi động cơ chế bù trừ giữ Bicarbonate (cần 24 - 72 giờ).',
    mechanism:
      'PaCO₂ tăng vọt trong khi HCO₃⁻ vẫn ở mức bình thường (22 - 26 mmol/L, chỉ tăng nhẹ ~1 mmol/L do phản ứng đệm hóa học tế bào máu). Tỷ lệ [HCO₃⁻]/PaCO₂ giảm mạnh làm pH tụt sâu.',
    etiologies: [
      'Ngộ độc thuốc ức chế trung tâm hô hấp: Opioid (Morphin, Fentanyl, Heroin), thuốc ngủ Benzodiazepine',
      'Tắc nghẽn đường thở trên tối cấp: Dị vật đường thở, phù thanh môn phản vệ, co thắt thanh quản',
      'Bệnh lý thần kinh cơ cấp: Cơn nhược cơ (Myasthenia Gravis), hội chứng Guillain-Barré, chấn thương cột sống cổ cao',
      'Tràn khí màng phổi áp lực, mảng sườn di động'
    ],
    actionPlan: [
      'CẤP CỨU THÔNG KHÍ NGAY: Khai thông đường thở, bóp bóng Ambu qua mặt nạ hoặc đặt ống nội khí quản thở máy.',
      'Nếu nghi ngộ độc Opioid: Tiêm tĩnh mạch thuốc đối kháng Naloxone (0.4 – 2.0 mg).',
      'Nếu nghi ngộ độc Benzodiazepine: Cân nhắc Flumazenil (lưu ý nguy cơ co giật).',
      'Kiểm tra PaO₂ kèm theo: Thường có giảm oxy máu nặng đi kèm do không khí trong phế nang bị CO₂ choán chỗ.'
    ],
    clinicalPearls:
      'Quy tắc sinh lý cấp: Cứ mỗi 10 mmHg PaCO₂ tăng thêm, pH sẽ giảm khoảng 0.08 đơn vị, và HCO₃⁻ chỉ tăng nhẹ 1 mmol/L.',
    sampleAbg: {
      pH: 7.22,
      pCO2: 68,
      pO2: 52,
      hco3: 25,
      be: -1,
      sao2: 82,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_CHRONIC_RESPIRATORY_ACIDOSIS: DiagnosisResult = {
    id: 'chronic-resp-acid',
    name: 'Toan Hô Hấp MẠN TÍNH (Đã Được Thận Bù Trừ Hoàn Toàn)',
    englishName: 'Chronic Fully Compensated Respiratory Acidosis',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50/50',
    textColor: 'text-emerald-950',
    severity: 'Theo dõi tích cực',
    summary:
      'Tăng PaCO₂ mạn tính kéo dài nhiều tháng đến nhiều năm. Thận đã tái hấp thu tối đa ion Bicarbonate để đưa pH máu trở về gần mức bình thường (7.35 – 7.39).',
    mechanism:
      'Thận tăng đào thải ion H⁺ và giữ lại HCO₃⁻ (thường tăng 3.5 – 4.0 mmol/L mỗi khi PaCO₂ tăng 10 mmHg). Nhờ nồng độ HCO₃⁻ máu tăng cao (30 - 38 mmol/L), pH duy trì ở mức dung nạp tốt.',
    etiologies: [
      'Bệnh phổi tắc nghẽn mạn tính (COPD) giai đoạn ổn định',
      'Hội chứng béo phì giảm thông khí (Pickwickian syndrome)',
      'Gù vẹo cột sống lồng ngực nặng mạn tính (Severe Kyphoscoliosis)',
      'Xơ phổi giai đoạn muộn, bệnh thần kinh cơ tiến triển mạn tính'
    ],
    actionPlan: [
      'MỤC TIÊU OXY AN TOÀN: Duy trì SpO₂ mục tiêu 88 – 92% (hoặc PaO₂ 55 – 65 mmHg).',
      'CẢNH BÁO TỬ VONG: Tuyệt đối không thở oxy dòng cao không kiểm soát! Tránh triệt tiêu phản xạ Hypoxic Drive làm bệnh nhân ngừng thở và hôn mê CO₂.',
      'Duy trì thuốc giãn phế quản, tập phục hồi chức năng hô hấp.',
      'Không dùng Bicarbonate vì cơ thể đã tự bù trừ lượng kiềm dồi dào.'
    ],
    clinicalPearls:
      'Đặc điểm phân biệt với toan cấp: pH nằm trong khoảng 7.35 - 7.39 (ở nửa toan của bình thường), HCO₃⁻ tăng rất cao (> 30 mmol/L) và BE dương tính lớn (+6 đến +12 mmol/L).',
    sampleAbg: {
      pH: 7.36,
      pCO2: 64,
      pO2: 58,
      hco3: 36,
      be: +8,
      sao2: 89,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_ACUTE_ON_CHRONIC_RESP_ACIDOSIS: DiagnosisResult = {
    id: 'acute-on-chronic-resp-acid',
    name: 'Đợt Cấp Trên Nền Toan Hô Hấp Mạn Tính (Acute-on-Chronic)',
    englishName: 'Acute-on-Chronic Respiratory Acidosis',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50/50',
    textColor: 'text-amber-950',
    severity: 'Cảnh báo nguy kịch',
    summary:
      'Bệnh nhân có bệnh phổi mạn tính (đã có sẵn nồng độ HCO₃⁻ cao bù trừ) nay bị nhiễm trùng hoặc suy thông khí cấp tính khiến PaCO₂ tăng vọt thêm, vượt quá ngưỡng bù trừ và làm pH tụt vào vùng toan máu (< 7.35).',
    mechanism:
      'Nền tảng HCO₃⁻ cao (> 30 mmol/L) và BE dương tính chứng minh có toan mạn tính từ trước, nhưng pH hiện tại < 7.35 chứng minh có một đợt suy hô hấp cấp tính vừa mới xảy ra đè lên.',
    etiologies: [
      'Đợt cấp Bệnh phổi tắc nghẽn mạn tính (AECOPD) do bội nhiễm vi khuẩn / virus',
      'Thở oxy liều quá cao làm ứ trệ thêm CO₂ ở bệnh nhân COPD',
      'Tràn khí màng phổi hoặc thuyên tắc phổi trên người bệnh COPD',
      'Dùng thuốc an thần, thuốc ngủ, opioid ở bệnh nhân béo phì giảm thông khí'
    ],
    actionPlan: [
      'Liệu pháp oxy kiểm soát: Mặt nạ Venturi 24% - 28% nhắm SpO₂ 88 - 92%.',
      'Khí dung giãn phế quản liều cao (Salbutamol + Ipratropium).',
      'Corticosteroid toàn thân và kháng sinh nếu có dấu hiệu nhiễm trùng đường thở.',
      'CHỈ ĐỊNH THỞ MÁY KHÔNG XÂM LẤN (NIV/BiPAP): Khi pH 7.25 – 7.35 và PaCO₂ > 45 mmHg dù đã tối ưu hóa điều trị nội khoa ban đầu.'
    ],
    clinicalPearls:
      'Nếu pH < 7.25 kèm rối loạn tri giác hoặc kiệt cơ hô hấp nghiêm trọng: Chuẩn bị đặt ống nội khí quản và thở máy xâm lấn.',
    sampleAbg: {
      pH: 7.26,
      pCO2: 76,
      pO2: 48,
      hco3: 34,
      be: +7,
      sao2: 78,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_MIXED_ACIDOSIS: DiagnosisResult = {
    id: 'mixed-acidosis',
    name: 'TOAN HỖN HỢP NGUY KỊCH (Toan Hô Hấp + Toan Chuyển Hóa)',
    englishName: 'Mixed Severe Acidosis (Combined Respiratory & Metabolic)',
    badgeColor: 'bg-rose-900 text-white border-rose-950',
    borderColor: 'border-rose-900',
    bgColor: 'bg-rose-100/60',
    textColor: 'text-rose-950',
    severity: 'Cấp cứu tối khẩn',
    summary:
      'Hai cơ chế toan độc lập tác động cùng lúc: Phổi không thể đào thải CO₂ (PaCO₂ tăng) VÀ mô tích tụ acid chuyển hóa (HCO₃⁻ giảm, BE âm tính nặng). pH máu rơi tự do xuống ngưỡng tử vong!',
    mechanism:
      'Không có bất kỳ hệ thống bù trừ nào hoạt động được vì cả hai cơ quan hô hấp và thận/chuyển hóa đều cùng suy sụp. Phản ứng toan cộng gộp làm pH < 7.10.',
    etiologies: [
      'Ngừng tim, ngừng hô hấp tuần hoàn (Cardiac arrest)',
      'Sốc nhiễm khuẩn hoặc sốc tim nặng kèm kiệt cơ hô hấp / phù phổi cấp',
      'Đợt cấp COPD nặng kèm suy tuần hoàn hoặc toan lactic do thiếu oxy mô',
      'Bệnh nhân DKA nặng bị ức chế hô hấp do ngộ độc thuốc ngủ hoặc kiệt sức thở'
    ],
    actionPlan: [
      'HỒI SỨC TIM PHỔI CẤP CỨU (ACLS): Đặt nội khí quản thở máy xâm lấn với FiO₂ 100% ngay lập tức.',
      'Tối ưu hóa thông khí phút (Minute ventilation) để nhanh chóng rửa bớt PaCO₂.',
      'Hồi sức huyết động: Bù dịch, sử dụng thuốc vận mạch (Noradrenaline, Adrenaline).',
      'Cân nhắc Natri Bicarbonate 8.4% truyền chậm nếu pH < 7.00 kèm rối loạn nhịp tim trơ với thuốc.'
    ],
    clinicalPearls:
      'Quy tắc vàng Donna Pierre: Nếu pH toan mà cả PaCO₂ tăng VÀ HCO₃⁻ giảm, đây luôn luôn là tình trạng thảm họa đe dọa ngừng tim trong vài phút!',
    sampleAbg: {
      pH: 7.02,
      pCO2: 65,
      pO2: 40,
      hco3: 12,
      be: -18,
      sao2: 68,
      fio2: 40,
      unit: 'mmHg',
      na: 142,
      cl: 102,
      lactate: 8.5
    }
  };

  const DIAG_ACUTE_RESPIRATORY_ALKALOSIS: DiagnosisResult = {
    id: 'acute-resp-alk',
    name: 'Kiềm Hô Hấp CẤP TÍNH (Acute Respiratory Alkalosis)',
    englishName: 'Acute Respiratory Alkalosis',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-50/50',
    textColor: 'text-blue-950',
    severity: 'Theo dõi tích cực',
    summary:
      'Tăng thông khí phế nang cấp tính đào thải quá mức acid bay hơi CO₂, làm PaCO₂ tụt nhanh chóng trong khi thận chưa kịp giảm giữ Bicarbonate.',
    mechanism:
      'PaCO₂ tụt (< 35 mmHg) đẩy cân bằng Henderson-Hasselbalch sang kiềm. Kiềm máu cấp làm dịch chuyển canxi ion hóa gắn vào albumin, gây hạ canxi ion hóa dẫn đến tê rần quanh miệng, co rút ngón tay ngón chân (dấu hiệu Trousseau / Chvostek).',
    etiologies: [
      'Cơn hoảng loạn tâm lý (Panic attack), lo âu kích động, cơn đau dữ dội',
      'Giai đoạn sớm của Thuyên tắc động mạch phổi (PE) hoặc Cơn hen phế quản cấp',
      'Sốt cao, ngộ độc Salicylate giai đoạn sớm (kích thích trực tiếp trung tâm hô hấp)',
      'Thở máy với thể tích khí lưu thông (Vt) hoặc tần số thở cài đặt quá cao'
    ],
    actionPlan: [
      'Trấn an tâm lý bệnh nhân, hướng dẫn thở chậm và sâu hoặc thở qua mặt nạ túi kín.',
      'Điều trị giảm đau hiệu quả nếu do đau đớn, hạ sốt nếu do sốt cao.',
      'LOẠI TRỪ KHẨN CẤP: Chụp CT động mạch phổi nếu nghi ngờ thuyên tắc phổi (PE).',
      'Nếu đang thở máy: Giảm tần số thở hoặc giảm thể tích khí lưu thông.'
    ],
    clinicalPearls:
      'Ở bệnh nhân hen phế quản, nếu ABG có kiềm hô hấp (PaCO₂ thấp), bệnh nhân vẫn còn sức thở. Nếu PaCO₂ bỗng nhiên trở về bình thường hoặc bắt đầu tăng: DẤU HIỆU BÁO ĐỘNG KIỆT CƠ, NGUY CƠ NGỪNG THỞ!',
    sampleAbg: {
      pH: 7.54,
      pCO2: 24,
      pO2: 105,
      hco3: 23,
      be: +1,
      sao2: 99,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_CHRONIC_RESPIRATORY_ALKALOSIS: DiagnosisResult = {
    id: 'chronic-resp-alk',
    name: 'Kiềm Hô Hấp MẠN TÍNH (Đã Được Thận Bù Trừ)',
    englishName: 'Chronic Fully Compensated Respiratory Alkalosis',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    borderColor: 'border-indigo-300',
    bgColor: 'bg-indigo-50/50',
    textColor: 'text-indigo-950',
    severity: 'Sinh lý bình thường',
    summary:
      'Tăng thông khí phế nang kéo dài ngày này qua tháng khác. Thận đã giảm giữ HCO₃⁻ để đưa pH trở về gần mức bình thường (7.41 – 7.45).',
    mechanism:
      'Thận giảm tái hấp thu HCO₃⁻ (thường giảm ~4 - 5 mmol/L mỗi khi PaCO₂ giảm 10 mmHg), hạ nồng độ Bicarbonate huyết tương xuống 16 - 20 mmol/L để cân bằng với PaCO₂ thấp.',
    etiologies: [
      'Người sống hoặc leo núi ở độ cao cao (thiếu oxy mạn kích thích thở nhanh)',
      'Phụ nữ mang thai 3 tháng giữa và 3 tháng cuối (Progesterone kích thích trung tâm hô hấp)',
      'Bệnh nhân xơ gan mất bù hoặc bệnh não gan (tăng ammonia kích thích thần kinh)',
      'Bệnh lý tổn thương thân não mạn tính'
    ],
    actionPlan: [
      'Xác định xem đây là biến đổi sinh lý (như thai kỳ, thích nghi độ cao) hay bệnh lý (xơ gan).',
      'Không cần can thiệp toan kiềm đặc hiệu nếu là thích nghi sinh lý.',
      'Tránh nhầm lẫn nồng độ HCO₃⁻ thấp này với toan chuyển hóa nguyên phát!'
    ],
    clinicalPearls:
      'Lưu ý sản khoa: Phụ nữ mang thai khỏe mạnh bình thường luôn có PaCO₂ khoảng 28 - 32 mmHg và HCO₃⁻ khoảng 18 - 21 mmol/L do tác dụng sinh lý của hormone Progesterone.',
    sampleAbg: {
      pH: 7.43,
      pCO2: 28,
      pO2: 98,
      hco3: 18,
      be: -4,
      sao2: 98,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_METABOLIC_ALKALOSIS_RESPONSIVE: DiagnosisResult = {
    id: 'meta-alk-responsive',
    name: 'Kiềm Chuyển Hóa MẤT THỂ TÍCH / NHẠY CLORID (Chloride-Responsive)',
    englishName: 'Chloride-Responsive Metabolic Alkalosis',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    borderColor: 'border-purple-300',
    bgColor: 'bg-purple-50/50',
    textColor: 'text-purple-950',
    severity: 'Theo dõi tích cực',
    summary:
      'Mất một lượng lớn acid HCl và dịch dạ dày, hoặc mất muối Clo qua thận do thuốc lợi tiểu. Nồng độ Clorid trong nước tiểu rất thấp (U_Cl < 15 - 20 mEq/L).',
    mechanism:
      'Mất H⁺ và Cl⁻ từ dịch vị dạ dày tạo ra dư thừa HCO₃⁻. Thận muốn giữ thể tích tuần hoàn bằng cách tái hấp thu Na⁺, nhưng thiếu Cl⁻ đi kèm buộc thận phải bài tiết H⁺ và K⁺ ở ống lượn xa, duy trì tình trạng kiềm máu (toan nước tiểu nghịch thường) và hạ kali máu.',
    etiologies: [
      'Nôn ói nhiều, hút dịch dạ dày liên tục qua sonde mũi - dạ dày (Hẹp môn vị, tắc ruột)',
      'Sử dụng thuốc lợi tiểu quai (Furosemide) hoặc Thiazide',
      'Hội chứng mất dịch kèm hạ Clo và hạ Kali máu'
    ],
    actionPlan: [
      'BÙ THỂ TÍCH BẰNG NATRI CLORID 0.9%: Truyền dịch muối đẳng trương cung cấp Cl⁻ giúp thận bài tiết lượng Bicarbonate dư thừa.',
      'BÙ KALI CLORID (KCl): Bắt buộc phải bù đủ Kali vì hạ Kali máu sẽ duy trì bài tiết H⁺ tại ống lượn xa.',
      'Dừng hoặc giảm liều thuốc lợi tiểu nếu không có chỉ định bắt buộc.',
      'Sử dụng thuốc ức chế bơm proton (PPI) nếu do nôn ói dịch vị kéo dài.'
    ],
    clinicalPearls:
      'Chìa khóa chẩn đoán: Đo nồng độ Clorid trong nước tiểu (Spot Urine Chloride < 15 mmol/L). Đáp ứng thần kỳ với việc truyền dung dịch NaCl 0.9% và KCl!',
    sampleAbg: {
      pH: 7.55,
      pCO2: 48,
      pO2: 90,
      hco3: 40,
      be: +14,
      sao2: 97,
      fio2: 21,
      unit: 'mmHg',
      na: 137,
      k: 2.8,
      cl: 84
    }
  };

  const DIAG_METABOLIC_ALKALOSIS_RESISTANT: DiagnosisResult = {
    id: 'meta-alk-resistant',
    name: 'Kiềm Chuyển Hóa KHÁNG CLORID / THỪA MINERALOCORTICOID (Chloride-Resistant)',
    englishName: 'Chloride-Resistant Metabolic Alkalosis',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    borderColor: 'border-purple-300',
    bgColor: 'bg-purple-50/50',
    textColor: 'text-purple-950',
    severity: 'Cảnh báo nguy kịch',
    summary:
      'Kiềm chuyển hóa do kích thích thụ thể Mineralocorticoid tại ống thận, không phụ thuộc vào tình trạng mất thể tích. Nồng độ Clorid trong nước tiểu cao (U_Cl > 25 mEq/L), không đáp ứng với truyền dịch NaCl 0.9%.',
    mechanism:
      'Aldosterone hoặc corticoid tăng cao kích hoạt bơm H⁺-ATPase và kênh ENaC tại tế bào kẽ ống lượn xa, liên tục tống H⁺ và K⁺ ra nước tiểu và giữ Na⁺, Bicarbonate vào máu.',
    etiologies: [
      'Cường Aldosterone nguyên phát (Hội chứng Conn do u vỏ thượng thận)',
      'Hội chứng Cushing, sử dụng Corticosteroid liều cao kéo dài',
      'Hẹp động mạch thận gây tăng tiết Renin - Aldosterone thứ phát',
      'Ăn lượng lớn cam thảo tự nhiên (Licorice chứa acid glycyrrhizic ức chế enzym 11β-HSD2)'
    ],
    actionPlan: [
      'Khám xét nghiệm: Đo nồng độ Aldosterone và Renin huyết tương (tỷ lệ ARR).',
      'Chụp CT/MRI tuyến thượng thận tìm u hoặc siêu âm Doppler động mạch thận.',
      'Điều trị bằng thuốc kháng Aldosterone đặc hiệu: Spironolactone hoặc Eplerenone.',
      'Truyền NaCl 0.9% không có tác dụng và có thể làm nặng thêm tình trạng tăng huyết áp quá tải thể tích!'
    ],
    clinicalPearls:
      'Tam chứng điển hình: Tăng huyết áp + Kiềm chuyển hóa + Hạ kali máu nặng trơ với bù thông thường. Nước tiểu chứa Cl⁻ > 25 mEq/L.',
    sampleAbg: {
      pH: 7.52,
      pCO2: 46,
      pO2: 92,
      hco3: 36,
      be: +11,
      sao2: 97,
      fio2: 21,
      unit: 'mmHg',
      na: 146,
      k: 2.6,
      cl: 98
    }
  };

  const DIAG_MIXED_ALKALOSIS: DiagnosisResult = {
    id: 'mixed-alkalosis',
    name: 'KIỀM HỖN HỢP NGUY HIỂM (Kiềm Hô Hấp + Kiềm Chuyển Hóa)',
    englishName: 'Mixed Respiratory & Metabolic Alkalosis',
    badgeColor: 'bg-indigo-900 text-white border-indigo-950',
    borderColor: 'border-indigo-900',
    bgColor: 'bg-indigo-100/60',
    textColor: 'text-indigo-950',
    severity: 'Cảnh báo nguy kịch',
    summary:
      'Hai tình trạng kiềm máu diễn ra đồng thời: PaCO₂ tụt thấp do tăng thông khí VÀ HCO₃⁻ tăng cao do chuyển hóa. pH máu có thể vượt ngưỡng 7.60 gây loạn nhịp tim ác tính và co thắt mạch não.',
    mechanism:
      'Cả hai phản ứng cùng đẩy pH lên cao. Kiềm máu nặng làm giảm mạnh canxi ion hóa, hạ kali máu nặng, giảm tưới máu não và ức chế thông khí tự nhiên.',
    etiologies: [
      'Bệnh nhân xơ gan hoặc suy gan (sẵn có kiềm hô hấp) dùng thuốc lợi tiểu quai liều cao',
      'Bệnh nhân nôn ói nhiều kèm theo cơn đau đớn dữ dội / sốt cao gây thở nhanh',
      'Bệnh nhân thở máy có tăng thông khí nhân tạo quá mức kết hợp hút dịch dạ dày'
    ],
    actionPlan: [
      'HẠ NGAY pH MÁU: Điều chỉnh cài đặt máy thở (giảm tần số thở, giảm Vt) để giữ PaCO₂ sinh lý.',
      'Bù dịch muối NaCl 0.9% và truyền bù Kali tích cực có theo dõi điện tim liên tục.',
      'Theo dõi sát nồng độ Ion Canxi (iCa²⁺) và bù Canxi Clorid nếu có tetany hoặc loạn nhịp tim.'
    ],
    clinicalPearls:
      'pH > 7.60 là một cấp cứu nội khoa với nguy cơ ngừng tim, co giật và co thắt mạch vành đột ngột.',
    sampleAbg: {
      pH: 7.62,
      pCO2: 25,
      pO2: 110,
      hco3: 34,
      be: +12,
      sao2: 99,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  const DIAG_NORMAL_ABG: DiagnosisResult = {
    id: 'normal-abg',
    name: 'Khí Máu Động Mạch Hoàn Toàn Bình Thường',
    englishName: 'Normal Arterial Blood Gas',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-300',
    bgColor: 'bg-emerald-50/50',
    textColor: 'text-emerald-950',
    severity: 'Sinh lý bình thường',
    summary:
      'Tất cả các chỉ số toan kiềm cốt lõi (pH 7.35 – 7.45, PaCO₂ 35 – 45 mmHg, HCO₃⁻ 22 – 26 mmol/L, BE -2 đến +2) đều nằm hoàn hảo trong giới hạn sinh lý chuẩn.',
    mechanism:
      'Hệ thống đệm huyết tương, thông khí phổi và tái hấp thu ống thận đang hoạt động tối ưu và hài hòa.',
    etiologies: [
      'Người khỏe mạnh bình thường',
      'Bệnh nhân đã hồi phục hoàn toàn sau điều trị rối loạn toan kiềm',
      'Lưu ý: Không loại trừ các bất thường oxy hóa máu (cần xem xét thêm PaO₂ và FiO₂)'
    ],
    actionPlan: [
      'Kiểm tra lại PaO₂ và PaO₂/FiO₂ ratio để đảm bảo bệnh nhân không có suy hô hấp Type 1 độc lập.',
      'Tiếp tục theo dõi lâm sàng nếu có các triệu chứng nghi ngờ khác.'
    ],
    clinicalPearls:
      'Luôn luôn kiểm tra Trục 1 (Trao đổi khí tại phổi - PaO₂ / FiO₂) kể cả khi thăng bằng toan kiềm hoàn toàn bình thường!',
    sampleAbg: {
      pH: 7.40,
      pCO2: 40,
      pO2: 95,
      hco3: 24,
      be: 0,
      sao2: 98,
      fio2: 21,
      unit: 'mmHg'
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title & Controller Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <GitFork className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Lưu Đồ Chẩn Đoán Tương Tác Từng Bước (Interactive Decision Flowchart)
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Bấm chọn từng nấc câu hỏi lâm sàng để hệ thống tự động điều hướng và chỉ dẫn chẩn đoán xác định cùng phác đồ xử trí
          </p>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-center">
          {onOpenGlossary && (
            <button
              onClick={() => onOpenGlossary()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Tra cứu thuật ngữ</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            title="Bắt đầu lại từ Bước 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Bắt đầu lại</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb Trail of Past Decisions */}
      {history.length > 0 && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Lộ trình đã chọn:
          </span>

          <button
            onClick={handleReset}
            className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-400 hover:text-blue-700 transition-colors"
          >
            Bắt đầu
          </button>

          {history.map((h, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <button
                onClick={() => handleJumpToHistory(idx)}
                className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-900 font-semibold hover:bg-blue-100 transition-colors flex items-center space-x-1"
                title={`Quay lại bước: ${h.title}`}
              >
                <span>{h.chosenOptionLabel}</span>
              </button>
            </React.Fragment>
          ))}

          {finalDiagnosis && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold">
                {finalDiagnosis.name}
              </span>
            </>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 1: START - IS pH < 7.35, 7.35-7.45, or > 7.45?           */}
      {/* ============================================================== */}
      {currentNodeId === 'start' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="text-sm sm:text-base font-bold text-blue-950">
                Bước 1: Nồng Độ pH Máu Động Mạch Rơi Vào Khoảng Nào?
              </h3>
            </div>
            <p className="text-xs text-blue-800 pl-8">
              Mốc sinh lý bình thường chuẩn là <strong>7.35 – 7.45</strong> (tương đương [H⁺] 35 – 45 nmol/L).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Option A: pH < 7.35 */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá pH máu',
                  'pH < 7.35 (Toan máu)',
                  'step-acid-primary'
                )
              }
              className="p-4 rounded-xl border-2 border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-800">
                  Toan Máu (Acidaemia)
                </span>
                <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-rose-950">pH &lt; 7.35</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nồng độ [H⁺] &gt; 45 nmol/L. Cơ thể đang nhiễm toan máu. Cần xác định nguồn gốc toan do hô hấp (PaCO₂) hay do chuyển hóa (HCO₃⁻).
              </p>
            </div>

            {/* Option B: pH 7.35 - 7.45 */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá pH máu',
                  'pH 7.35 - 7.45 (Bình thường)',
                  'step-normal-ph-check'
                )
              }
              className="p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 hover:border-emerald-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800">
                  pH Bình Thường
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-emerald-950">pH 7.35 – 7.45</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                pH nằm trong dải sinh lý. Cần kiểm tra xem có hoàn toàn bình thường hay là đã bù trừ toàn phần / rối loạn hỗn hợp.
              </p>
            </div>

            {/* Option C: pH > 7.45 */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá pH máu',
                  'pH > 7.45 (Kiềm máu)',
                  'step-alk-primary'
                )
              }
              className="p-4 rounded-xl border-2 border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-800">
                  Kiềm Máu (Alkalaemia)
                </span>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-purple-950">pH &gt; 7.45</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nồng độ [H⁺] &lt; 35 nmol/L. Cơ thể đang nhiễm kiềm máu. Cần kiểm tra PaCO₂ giảm (hô hấp) hay HCO₃⁻ tăng (chuyển hóa).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 2A: ACIDEMIA (pH < 7.35) -> Check PaCO2 vs HCO3           */}
      {/* ============================================================== */}
      {currentNodeId === 'step-acid-primary' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm sm:text-base font-bold text-rose-950">
                Bước 2: Tìm Nguyên Nhân Gây Toan (Nhìn vào PaCO₂ &amp; HCO₃⁻)
              </h3>
            </div>
            <p className="text-xs text-rose-800 pl-8">
              Chỉ số nào thay đổi phù hợp với việc hạ pH? PaCO₂ tăng &gt; 45 mmHg (Toan hô hấp) hay HCO₃⁻ giảm &lt; 22 mmol/L (Toan chuyển hóa)?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Branch 1: PaCO2 > 45 mmHg */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây toan',
                  'PaCO₂ > 45 mmHg (Toan Hô Hấp)',
                  'step-resp-acid-chronicity'
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Hô Hấp (PaCO₂)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                PaCO₂ TĂNG CAO (&gt; 45 mmHg)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ứ trệ khí CO₂ do giảm thông khí phế nang toàn thể. Tiếp tục kiểm tra HCO₃⁻ để phân biệt Cấp tính vs Mạn tính vs Toan hỗn hợp.
              </p>
            </div>

            {/* Branch 2: HCO3- < 22 mmol/L with normal/low PaCO2 */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây toan',
                  'HCO₃⁻ < 22 mmol/L (Toan Chuyển Hóa)',
                  'step-metabolic-acid-ag'
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                  Chuyển Hóa (HCO₃⁻ / BE)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                HCO₃⁻ GIẢM (&lt; 22 mmol/L) &amp; BE Âm (&lt; -2)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mất đệm bazơ hoặc tích tụ acid cố định. PaCO₂ có thể giảm bù trừ. Tiếp tục tính Khoảng trống Anion (Anion Gap).
              </p>
            </div>

            {/* Branch 3: Both abnormal in acid direction -> Mixed Acidosis */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây toan',
                  'PaCO₂ tăng VÀ HCO₃⁻ giảm (Toan Hỗn Hợp)',
                  'diagnosis',
                  DIAG_MIXED_ACIDOSIS
                )
              }
              className="p-4 rounded-xl border-2 border-rose-300 hover:border-rose-700 bg-rose-100/50 hover:bg-rose-100 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-800 text-white">
                  Nguy kịch tối cấp
                </span>
                <ChevronRight className="w-4 h-4 text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-rose-950">
                PaCO₂ &gt; 45 VÀ HCO₃⁻ &lt; 22 ĐỒNG THỜI!
              </div>
              <p className="text-xs text-rose-900 leading-relaxed font-medium">
                Cả 2 cơ chế đều gây toan, không có bù trừ. Toan hỗn hợp đe dọa ngừng tim!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 3A: RESPIRATORY ACIDOSIS -> CHRONICITY & COMPENSATION     */}
      {/* ============================================================== */}
      {currentNodeId === 'step-resp-acid-chronicity' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm sm:text-base font-bold text-blue-950">
                Bước 3: Toan Hô Hấp Cấp Tính Hay Đã Có Bù Trừ Mạn Tính?
              </h3>
            </div>
            <p className="text-xs text-blue-800 pl-8">
              Quan sát nồng độ Bicarbonate (HCO₃⁻) và Base Excess (BE) để xem thận đã kịp giữ kiềm lại hay chưa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Acute */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Diễn tiến toan hô hấp',
                  'HCO₃⁻ bình thường (Toan Hô Hấp Cấp)',
                  'diagnosis',
                  DIAG_ACUTE_RESPIRATORY_ACIDOSIS
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                  Cấp Tính
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                HCO₃⁻ Bình Thường (22 – 26 mmol/L)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mới xảy ra vài phút đến vài giờ (ngộ độc morphin, co thắt phế quản, dị vật). Thận chưa kịp bù trừ.
              </p>
            </div>

            {/* Chronic */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Diễn tiến toan hô hấp',
                  'HCO₃⁻ tăng cao, pH gần chuẩn (Toan Hô Hấp Mạn)',
                  'diagnosis',
                  DIAG_CHRONIC_RESPIRATORY_ACIDOSIS
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Mạn Tính
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                HCO₃⁻ TĂNG CAO (&gt; 28 mmol/L) &amp; pH 7.35 – 7.39
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kéo dài nhiều tháng/năm (COPD mạn). Thận đã giữ lượng lớn kiềm đưa pH về gần mức bình thường.
              </p>
            </div>

            {/* Acute on Chronic */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Diễn tiến toan hô hấp',
                  'HCO₃⁻ tăng cao NHƯNG pH < 7.35 (Đợt cấp trên nền mạn)',
                  'diagnosis',
                  DIAG_ACUTE_ON_CHRONIC_RESP_ACIDOSIS
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Cấp trên nền mạn
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                HCO₃⁻ TĂNG (&gt; 28) NHƯNG pH &lt; 7.35
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đợt cấp COPD mất bù: Có sẵn bù trừ mạn nhưng PaCO₂ tăng vọt thêm làm toan hóa máu trở lại!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 3B: METABOLIC ACIDOSIS -> ANION GAP EVALUATION             */}
      {/* ============================================================== */}
      {currentNodeId === 'step-metabolic-acid-ag' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm sm:text-base font-bold text-rose-950">
                Bước 3: Tính Khoảng Trống Anion (Anion Gap = Na⁺ - [Cl⁻ + HCO₃⁻])
              </h3>
            </div>
            <p className="text-xs text-rose-800 pl-8">
              Giá trị Anion Gap bình thường là <strong>8 – 16 mEq/L</strong> (hoặc 12 ± 4). Đây là bước phân loại tối quan trọng để tìm nguyên nhân gốc rễ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* High AG */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Phân loại Anion Gap',
                  'Anion Gap TĂNG > 16 (GOLDMARK)',
                  'diagnosis',
                  DIAG_METABOLIC_ACIDOSIS_HIGH_AG
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2.5 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-200 text-rose-800">
                  TĂNG Anion Gap (&gt; 16 mEq/L)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                Toan Tăng Anion Gap (GOLDMARK / MUDPILES)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Có sự xuất hiện của acid hữu cơ cố định lạ: Toan Lactic, DKA đái tháo đường, Suy thận ure máu, Ngộ độc Methanol, Ethylene glycol, Salicylate.
              </p>
              <div className="text-[11px] text-rose-700 font-semibold">
                &rarr; Bước kế tiếp: Tính Delta Ratio (ΔAG / ΔHCO₃⁻) và PaCO₂ kỳ vọng (Winter).
              </div>
            </div>

            {/* Normal AG */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Phân loại Anion Gap',
                  'Anion Gap BÌNH THƯỜNG (HARDUPS / Tăng Clo)',
                  'diagnosis',
                  DIAG_METABOLIC_ACIDOSIS_NORMAL_AG
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2.5 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-800">
                  Anion Gap Bình Thường (8 – 16 mEq/L)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                Toan Anion Gap Bình Thường / Tăng Clo Máu (HARDUPS)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mất ion Bicarbonate qua tiêu hóa hoặc qua thận, được thay thế bằng ion Clo: Tiêu chảy cấp, Toan hóa ống thận (RTA), Truyền nhiều dịch NaCl 0.9%.
              </p>
              <div className="text-[11px] text-amber-700 font-semibold">
                &rarr; Bước kế tiếp: Đo Anion Gap nước tiểu để phân biệt do thận vs do tiêu hóa.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 2B: ALKALEMIA (pH > 7.45) -> Respiratory vs Metabolic    */}
      {/* ============================================================== */}
      {currentNodeId === 'step-alk-primary' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm sm:text-base font-bold text-purple-950">
                Bước 2: Tìm Nguyên Nhân Gây Kiềm (Nhìn vào PaCO₂ &amp; HCO₃⁻)
              </h3>
            </div>
            <p className="text-xs text-purple-800 pl-8">
              Chỉ số nào giải thích được độ kiềm? PaCO₂ giảm &lt; 35 mmHg (Kiềm hô hấp) hay HCO₃⁻ tăng &gt; 26 mmol/L (Kiềm chuyển hóa)?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Resp Alkalosis */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây kiềm',
                  'PaCO₂ < 35 mmHg (Kiềm Hô Hấp)',
                  'step-resp-alk-chronicity'
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Hô Hấp (PaCO₂)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                PaCO₂ GIẢM DƯỚI 35 mmHg
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tăng thông khí phế nang đào thải quá mức CO₂ (cơn hoảng loạn, đau, sốt, thuyên tắc phổi giai đoạn sớm).
              </p>
            </div>

            {/* Metabolic Alkalosis */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây kiềm',
                  'HCO₃⁻ > 26 mmol/L (Kiềm Chuyển Hóa)',
                  'step-metabolic-alk-chloride'
                )
              }
              className="p-4 rounded-xl border-2 border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/30 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  Chuyển Hóa (HCO₃⁻ / BE)
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                HCO₃⁻ TĂNG (&gt; 26 mmol/L) &amp; BE &gt; +3
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thừa gốc kiềm hoặc mất dịch dạ dày (nôn ói, thuốc lợi tiểu, cường aldosterone). Tiếp tục kiểm tra đáp ứng Clo niệu.
              </p>
            </div>

            {/* Mixed Alkalosis */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Cơ chế gây kiềm',
                  'PaCO₂ giảm VÀ HCO₃⁻ tăng (Kiềm Hỗn Hợp)',
                  'diagnosis',
                  DIAG_MIXED_ALKALOSIS
                )
              }
              className="p-4 rounded-xl border-2 border-indigo-300 hover:border-indigo-700 bg-indigo-100/50 hover:bg-indigo-100 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-800 text-white">
                  Kiềm nặng
                </span>
                <ChevronRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-indigo-950">
                PaCO₂ &lt; 35 VÀ HCO₃⁻ &gt; 26 ĐỒNG THỜI!
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                Kiềm hỗn hợp nguy hiểm! Nguy cơ loạn nhịp tim trơ, co giật và tụt oxy mô do Hb giữ chặt O₂.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 3C: RESPIRATORY ALKALOSIS -> CHRONICITY                   */}
      {/* ============================================================== */}
      {currentNodeId === 'step-resp-alk-chronicity' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm sm:text-base font-bold text-blue-950">
                Bước 3: Kiềm Hô Hấp Cấp Tính Hay Mạn Tính Có Thận Bù Trừ?
              </h3>
            </div>
            <p className="text-xs text-blue-800 pl-8">
              Kiểm tra nồng độ Bicarbonate (HCO₃⁻) huyết tương để xác định thời gian diễn tiến.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Acute */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Diễn tiến kiềm hô hấp',
                  'HCO₃⁻ bình thường (Kiềm Hô Hấp Cấp)',
                  'diagnosis',
                  DIAG_ACUTE_RESPIRATORY_ALKALOSIS
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Cấp Tính
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                HCO₃⁻ Bình Thường (22 – 26 mmol/L)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diễn tiến cấp tính mới xuất hiện (cơn panic hoảng loạn, đau đớn, sốt, thuyên tắc phổi sớm). Thận chưa kịp đào thải bicarb.
              </p>
            </div>

            {/* Chronic */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Diễn tiến kiềm hô hấp',
                  'HCO₃⁻ giảm bù trừ (Kiềm Hô Hấp Mạn)',
                  'diagnosis',
                  DIAG_CHRONIC_RESPIRATORY_ALKALOSIS
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  Mạn Tính Đã Bù
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                HCO₃⁻ GIẢM BÙ TRỪ (&lt; 20 mmol/L)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tăng thông khí mạn tính kéo dài (phụ nữ mang thai, sống ở vùng cao, xơ gan tiến triển). Thận đã đào thải bicarb để hạ pH về gần chuẩn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 3D: METABOLIC ALKALOSIS -> CHLORIDE RESPONSIVE VS RESIST   */}
      {/* ============================================================== */}
      {currentNodeId === 'step-metabolic-alk-chloride' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="text-sm sm:text-base font-bold text-purple-950">
                Bước 3: Đánh Giá Nồng Độ Clorid Nước Tiểu (Urine Chloride)
              </h3>
            </div>
            <p className="text-xs text-purple-800 pl-8">
              Kiềm chuyển hóa nhạy Clorid (đáp ứng với truyền dịch NaCl 0.9%) hay kháng Clorid (thừa mineralocorticoid)?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Chloride-responsive */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đáp ứng Clorid',
                  'Clo niệu < 15-20 (Nhạy Clorid / Mất dịch)',
                  'diagnosis',
                  DIAG_METABOLIC_ALKALOSIS_RESPONSIVE
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                  U_Cl &lt; 15 – 20 mEq/L
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                Nhạy Clorid (Chloride-Responsive / Giảm thể tích)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mất dịch vị do nôn ói nhiều, hút dịch dạ dày liên tục, sử dụng thuốc lợi tiểu quai. Hồi phục ngoạn mục khi bù NaCl 0.9% và KCl!
              </p>
            </div>

            {/* Chloride-resistant */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đáp ứng Clorid',
                  'Clo niệu > 25 (Kháng Clorid / Thừa Aldosterone)',
                  'diagnosis',
                  DIAG_METABOLIC_ALKALOSIS_RESISTANT
                )
              }
              className="p-5 rounded-xl border-2 border-slate-200 hover:border-rose-500 bg-white hover:bg-rose-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                  U_Cl &gt; 25 mEq/L
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-base font-bold text-slate-900">
                Kháng Clorid (Chloride-Resistant / Quá tải Aldosterone)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hội chứng Conn (u vỏ thượng thận), dùng corticoid liều cao, hẹp động mạch thận. Thường kèm tăng huyết áp và hạ kali máu nặng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* NODE 2C: NORMAL pH (7.35 - 7.45) -> CHECK IF COMPENSATED OR OK */}
      {/* ============================================================== */}
      {currentNodeId === 'step-normal-ph-check' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="text-sm sm:text-base font-bold text-emerald-950">
                Bước 2: Kiểm Tra PaCO₂ Và HCO₃⁻ Khi pH Ở Mức Bình Thường
              </h3>
            </div>
            <p className="text-xs text-emerald-800 pl-8">
              Quy tắc vàng: pH bình thường <strong>KHÔNG</strong> đồng nghĩa với khí máu bình thường! Cần kiểm tra xem có rối loạn đã được bù trừ hoàn toàn không.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Both normal */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá khi pH bình thường',
                  'Cả PaCO₂ và HCO₃⁻ đều bình thường',
                  'diagnosis',
                  DIAG_NORMAL_ABG
                )
              }
              className="p-4 rounded-xl border-2 border-emerald-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Hoàn Toàn Chuẩn
                </span>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                PaCO₂ và HCO₃⁻ ĐỀU BÌNH THƯỜNG
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                PaCO₂ 35 – 45 mmHg và HCO₃⁻ 22 – 26 mmol/L. Không có bất kỳ rối loạn toan kiềm nào.
              </p>
            </div>

            {/* pH 7.35-7.39 with abnormal */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá khi pH bình thường',
                  'pH 7.35 - 7.39 (Nghiêng Toan Đã Bù Hoàn Toàn)',
                  'step-acid-primary'
                )
              }
              className="p-4 rounded-xl border-2 border-amber-200 hover:border-amber-500 bg-white hover:bg-amber-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                  Toan Đã Bù Toàn Phần
                </span>
                <ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                pH Nằm Ở Nửa Toan (7.35 – 7.39)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rối loạn toan nguyên phát (hô hấp hoặc chuyển hóa) đã được cơ quan đối ứng bù trừ tối đa.
              </p>
            </div>

            {/* pH 7.41-7.45 with abnormal */}
            <div
              onClick={() =>
                handleSelectOption(
                  'Đánh giá khi pH bình thường',
                  'pH 7.41 - 7.45 (Nghiêng Kiềm Đã Bù Hoàn Toàn)',
                  'step-alk-primary'
                )
              }
              className="p-4 rounded-xl border-2 border-blue-200 hover:border-blue-500 bg-white hover:bg-blue-50/40 cursor-pointer transition-all space-y-2 group shadow-2xs hover:shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                  Kiềm Đã Bù Toàn Phần
                </span>
                <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900">
                pH Nằm Ở Nửa Kiềm (7.41 – 7.45)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rối loạn kiềm nguyên phát đã được cơ quan đối ứng bù trừ thành công đưa pH về mức an toàn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* FINAL DIAGNOSIS RESULT DISPLAY                                  */}
      {/* ============================================================== */}
      {currentNodeId === 'diagnosis' && finalDiagnosis && (
        <div className="space-y-5 animate-in zoom-in-95 duration-200">
          {/* Outcome Header Banner */}
          <div
            className={`p-5 rounded-2xl border-2 ${finalDiagnosis.borderColor} ${finalDiagnosis.bgColor} space-y-3 shadow-sm`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-white shadow-2xs">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${finalDiagnosis.badgeColor}`}
                  >
                    {finalDiagnosis.severity}
                  </span>
                  <h3 className="text-base sm:text-xl font-bold text-slate-950 mt-1">
                    {finalDiagnosis.name}
                  </h3>
                  <div className="text-xs text-slate-600 italic font-medium">
                    {finalDiagnosis.englishName}
                  </div>
                </div>
              </div>

              {onLoadPresetToAnalyzer && (
                <button
                  onClick={() => onLoadPresetToAnalyzer(finalDiagnosis.sampleAbg)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:scale-102"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Mô phỏng ca này trên Bộ Phân Tích &rarr;</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {finalDiagnosis.summary}
            </p>
          </div>

          {/* Pathophysiology & Mechanism */}
          <div className="p-4.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-blue-600" />
              <span>Cơ chế sinh lý bệnh học (Pathophysiology):</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed pl-5.5">
              {finalDiagnosis.mechanism}
            </p>
          </div>

          {/* Etiologies Grid */}
          <div className="p-4.5 rounded-xl bg-white border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Các nguyên nhân lâm sàng thường gặp nhất:</span>
            </div>
            <ul className="list-disc pl-9 space-y-1 text-xs text-slate-700">
              {finalDiagnosis.etiologies.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Action Plan */}
          <div className="p-4.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2">
            <div className="font-bold text-indigo-950 text-xs sm:text-sm flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-indigo-700" />
              <span>Phác đồ hành động lâm sàng khuyến cáo:</span>
            </div>
            <ul className="list-decimal pl-9 space-y-1.5 text-xs text-indigo-950 font-medium">
              {finalDiagnosis.actionPlan.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Pearls & Warnings */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1 text-xs">
            <div className="font-bold flex items-center space-x-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Điểm sáng y khoa &amp; Cạm bẫy cần tránh (Clinical Pearls):</span>
            </div>
            <p className="leading-relaxed font-medium pl-5.5">
              {finalDiagnosis.clinicalPearls}
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Thử một nhánh chẩn đoán khác</span>
            </button>

            {onLoadPresetToAnalyzer && (
              <button
                onClick={() => onLoadPresetToAnalyzer(finalDiagnosis.sampleAbg)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
              >
                Chuyển sang màn hình Phân tích Khí máu &rarr;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
