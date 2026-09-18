import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Copy,
  Edit3,
  FileText,
  GitCompare,
  Layers,
  Microscope,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
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
} from '../../types.ts';

interface ClinicalReasoningPanelProps {
  topResult: AnalysisResult | null;
  results: AnalysisResult[];
  kb: KnowledgeBase;
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  selectedSymptoms: TrieuChung[];
  negatedSymptoms: TrieuChung[];
  problems: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
  onGoToStep?: (stepId: 't1' | 't2' | 't3' | 't4') => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const ClinicalReasoningPanel: React.FC<ClinicalReasoningPanelProps> = ({
  topResult,
  results,
  kb,
  form,
  vitals,
  labs,
  selectedSymptoms,
  negatedSymptoms,
  problems,
  epiContext,
  onGoToStep,
  onOpenVaultDrawer,
}) => {
  const [viewMode, setViewMode] = useState<'structured' | 'emr'>('structured');
  const [editing, setEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  // 1. Xác định Vấn đề chính được chọn để biện luận
  const primaryProblem = useMemo(() => {
    // Ưu tiên: vấn đề được đánh dấu isPrimary, hoặc vấn đề cấp tính đầu tiên, hoặc lý do vào viện
    const primary = problems.find((p) => p.isPrimary) || problems.find((p) => p.priorityLevel === 'acute') || problems[0];
    if (primary) return primary.label;
    if (form.lyDo && form.lyDo.trim()) return form.lyDo.trim();
    return 'Triệu chứng cấp tính lúc vào viện';
  }, [problems, form.lyDo]);

  // 2. Phân tích Chẩn đoán Sơ bộ (Bệnh nghĩ nhiều nhất)
  const leadDiagnosis = topResult ? topResult.b : null;
  const leadMatchPct = topResult ? topResult.pct : 0;

  // Triệu chứng chính và phụ của bệnh sơ bộ
  const { mainSymptoms, minorSymptoms, supportiveLabs } = useMemo(() => {
    if (!topResult) return { mainSymptoms: [], minorSymptoms: [], supportiveLabs: [] };

    const matchedNames = topResult.matched.map((m) => m.tc.ten);
    const main: string[] = [];
    const minor: string[] = [];

    topResult.matched.forEach((m) => {
      // Dựa vào vai trò triệu chứng (bb: bắt buộc, gy: gợi ý)
      if (m.tc.vaiTro === 'bb' || m.tc.loai.includes('tt') || m.weight >= 3) {
        main.push(m.tc.ten);
      } else {
        minor.push(m.tc.ten);
      }
    });

    // Dữ kiện cận lâm sàng bất thường ủng hộ
    const labsFound: string[] = [];
    if (labs.lBC) labsFound.push(`Bạch cầu ${labs.lBC} G/L`);
    if (labs.lTC && parseFloat(labs.lTC) < 100) labsFound.push(`Tiểu cầu giảm ${labs.lTC} G/L`);
    if (labs.lHct && parseFloat(labs.lHct) > 44) labsFound.push(`Cô đặc máu Hct ${labs.lHct}%`);
    if (labs.lTrop && parseFloat(labs.lTrop) > 14) labsFound.push(`Troponin tăng ${labs.lTrop} ng/L`);
    if (labs.lGlu && parseFloat(labs.lGlu) > 11) labsFound.push(`Đường huyết tăng ${labs.lGlu} mmol/L`);

    return {
      mainSymptoms: main.length > 0 ? main : matchedNames.slice(0, 3),
      minorSymptoms: minor.length > 0 ? minor : matchedNames.slice(3),
      supportiveLabs: labsFound,
    };
  }, [topResult, labs]);

  // Đề nghị Cận lâm sàng XÁC CHẨN cho bệnh sơ bộ
  const confirmatoryTests = useMemo(() => {
    if (!leadDiagnosis) return [];
    // Lấy từ danh mục cận lâm sàng gợi ý của bệnh trong kb
    const tests: { name: string; purpose: string }[] = [];
    const diseaseNameLower = leadDiagnosis.ten.toLowerCase();

    if (diseaseNameLower.includes('dengue') || diseaseNameLower.includes('sốt xuất huyết')) {
      tests.push({ name: 'Test nhanh Dengue NS1Ag & Kháng thể Dengue IgM/IgG', purpose: 'Xác định căn nguyên nhiễm vi rút DENV' });
      tests.push({ name: 'Tổng phân tích tế bào máu (CBC) theo dõi mỗi 4-6 giờ', purpose: 'Theo dõi động học cô đặc máu Hct và mức giảm tiểu cầu' });
      tests.push({ name: 'Siêu âm ổ bụng & màng phổi tại giường', purpose: 'Đánh giá mức độ thoát huyết tương (tràn dịch, dày thành túi mật)' });
    } else if (diseaseNameLower.includes('mạch vành') || diseaseNameLower.includes('nhồi máu') || diseaseNameLower.includes('đau thắt ngực')) {
      tests.push({ name: 'Định lượng Troponin I/T độ nhạy cao (hs-cTn) động học (0h - 1h/3h)', purpose: 'Xác định hoại tử cơ tim cấp' });
      tests.push({ name: 'Điện tâm đồ (ECG) 12 chuyển đạo lặp lại', purpose: 'Xác định vị trí thiếu máu / nhồi máu và đoạn ST chênh' });
      tests.push({ name: 'Siêu âm tim qua thành ngực', purpose: 'Đánh giá rối loạn vận động vùng và phân suất tống máu thất trái (LVEF)' });
      tests.push({ name: 'Chụp mạch vành qua da (DSA)', purpose: 'Xác định vị trí tắc/hẹp động mạch vành và can thiệp tái tưới máu' });
    } else if (diseaseNameLower.includes('màng não')) {
      tests.push({ name: 'Chọc dò tủy sống khảo sát dịch não tủy (DNT)', purpose: 'Phân tích tế bào, sinh hóa (đạm, đường DNT/máu), soi nhuộm Gram & cấy DNT' });
      tests.push({ name: 'Chụp CT / MRI sọ não trước chọc dò', purpose: 'Loại trừ nguy cơ tăng áp lực nội sọ và dọa tụt kẹt não' });
      tests.push({ name: 'Cấy máu 2 vị trí', purpose: 'Tìm vi khuẩn gây nhiễm khuẩn huyết kèm theo' });
    } else if (diseaseNameLower.includes('viêm gan')) {
      tests.push({ name: 'HBV DNA định lượng / HCV RNA định lượng bằng Real-time PCR', purpose: 'Xác định mức độ nhân lên của vi rút' });
      tests.push({ name: 'HBsAg, HBeAg, Anti-HBe, Anti-HCV', purpose: 'Xác định giai đoạn huyết thanh học' });
      tests.push({ name: 'Đo độ đàn hồi mô gan (FibroScan / ARFI)', purpose: 'Đánh giá chính xác mức độ xơ hóa gan' });
    } else if (diseaseNameLower.includes('xơ gan')) {
      tests.push({ name: 'Nội soi thực quản - dạ dày - tá tràng', purpose: 'Tầm soát và can thiệp thắt giãn tĩnh mạch thực quản' });
      tests.push({ name: 'Siêu âm Doppler mạch máu gan & tầm soát u gan (AFP)', purpose: 'Đánh giá áp lực tĩnh mạch cửa và tầm soát ung thư gan HCC' });
      tests.push({ name: 'Chọc tháo dịch màng bụng làm xét nghiệm SAAG và tế bào', purpose: 'Đánh giá nguyên nhân cổ trướng và loại trừ viêm phúc mạc tiên phát' });
    } else {
      tests.push({ name: 'Xét nghiệm vi sinh / Sinh học phân tử đặc hiệu (PCR / Huyết thanh học)', purpose: 'Xác định chính xác căn nguyên bệnh' });
      tests.push({ name: 'Thăm dò hình ảnh học chuyên khoa (Siêu âm / CT-Scanner)', purpose: 'Xác định tổn thương giải phẫu bệnh' });
    }
    return tests;
  }, [leadDiagnosis]);

  // 3. Phân tích Chẩn đoán Phân biệt (Top 2 và Top 3)
  const differentialDiagnoses = useMemo(() => {
    if (results.length <= 1) return [];

    return results.slice(1, 4).map((res) => {
      const diffDisease = res.b;
      const commonSymptoms = res.matched.map((m) => m.tc.ten);

      // Tìm triệu chứng phủ định hoặc còn thiếu khiến ít nghĩ hơn
      const missingSymptoms = res.missing.slice(0, 3).map((s) => s.ten);
      const negatedMatching = negatedSymptoms.filter((n) =>
        diffDisease.trieuChung?.some((tcId) => tcId === n.id)
      ).map((n) => n.ten);

      // Đề xuất CLS loại trừ
      let exclusionTest = { name: 'Xét nghiệm chuyên biệt tầm soát', purpose: `Loại trừ ${diffDisease.ten}` };
      const diffNameLower = diffDisease.ten.toLowerCase();

      if (diffNameLower.includes('nhiễm trùng huyết') || diffNameLower.includes('sốc nhiễm trùng')) {
        exclusionTest = { name: 'Cấy máu 2 chai & Định lượng Procalcitonin máu', purpose: 'Loại trừ nhiễm khuẩn huyết vi khuẩn Gr(-)/Gr(+)' };
      } else if (diffNameLower.includes('viêm phổi') || diffNameLower.includes('suy hô hấp')) {
        exclusionTest = { name: 'X-quang ngực thẳng & Khí máu động mạch', purpose: 'Đánh giá tổn thương phế nang và mức độ oxy hóa máu' };
      } else if (diffNameLower.includes('màng não')) {
        exclusionTest = { name: 'Chọc dò dịch não tủy & CT sọ não', purpose: 'Loại trừ viêm màng não mủ hoặc xuất huyết dưới nhện' };
      } else if (diffNameLower.includes('viêm tụy')) {
        exclusionTest = { name: 'Định lượng Amylase & Lipase máu; CT bụng cản quang', purpose: 'Loại trừ viêm tụy cấp' };
      } else if (diffNameLower.includes('thuyên tắc phổi')) {
        exclusionTest = { name: 'Định lượng D-Dimer & Chụp CT mạch máu phổi (CTPA)', purpose: 'Loại trừ thuyên tắc động mạch phổi cấp' };
      } else if (diffNameLower.includes('bóc tách')) {
        exclusionTest = { name: 'Chụp CT ngực có cản quang (CTA ngực)', purpose: 'Loại trừ phình bóc tách động mạch chủ ngực cấp' };
      }

      return {
        disease: diffDisease,
        pct: res.pct,
        commonSymptoms,
        missingSymptoms,
        negatedMatching,
        exclusionTest,
      };
    });
  }, [results, negatedSymptoms]);

  // 4. Đánh giá Toàn diện (Mức độ, Căn nguyên, Biến chứng)
  const comprehensiveAssessment = useMemo(() => {
    // Mức độ
    let severity = 'Mức độ trung bình, cần theo dõi sát tại khoa điều trị';
    const sbp = parseFloat(vitals.vHATT);
    const dbp = parseFloat(vitals.vHATTr);
    const pulse = parseFloat(vitals.vMach);
    const spo2 = parseFloat(vitals.vSpo2);
    const hasShock = (!isNaN(sbp) && sbp <= 90) || (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20);
    const hasHypoxia = !isNaN(spo2) && spo2 < 94;

    if (hasShock || hasHypoxia || (leadDiagnosis && leadDiagnosis.baoDong)) {
      severity = 'Mức độ NẶNG / CẤP CỨU NGUY KỊCH (có rối loạn huyết động hoặc suy hô hấp, chỉ định theo dõi tại Phòng Cấp cứu / ICU)';
    } else if (problems.some((p) => p.priorityLevel === 'acute')) {
      severity = 'Mức độ CẤP TÍNH có dấu hiệu cảnh báo, cần nhập viện theo dõi diễn tiến';
    }

    // Căn nguyên
    let etiology = 'Chưa xác định căn nguyên vi sinh / giải phẫu học chính xác, đang chờ kết quả xét nghiệm chuyên biệt';
    if (leadDiagnosis) {
      const name = leadDiagnosis.ten.toLowerCase();
      if (name.includes('dengue')) etiology = 'Nhiễm vi rút Dengue (DENV-1, 2, 3 hoặc 4) truyền qua véc tơ muỗi vằn Aedes aegypti';
      else if (name.includes('viêm gan b')) etiology = 'Nhiễm vi rút viêm gan B (HBV) mạn tính';
      else if (name.includes('viêm gan c')) etiology = 'Nhiễm vi rút viêm gan C (HCV) mạn tính';
      else if (name.includes('mạch vành') || name.includes('nhồi máu')) etiology = 'Xơ vữa động mạch vành tiến triển, nứt vỡ mảng xơ vữa gây huyết khối cấp';
      else if (name.includes('não mô cầu')) etiology = 'Nhiễm vi khuẩn Neisseria meningitidis lây truyền qua đường giọt bắn hô hấp';
      else if (name.includes('leptospira')) etiology = 'Nhiễm xoắn khuẩn Leptospira interrogans phơi nhiễm qua nguồn nước bẩn ngập lụt';
    }

    // Biến chứng
    const complications: string[] = [];
    if (hasShock) complications.push('Sốc giảm thể tích do thoát huyết tương / tụt huyết áp');
    if (hasHypoxia) complications.push('Suy hô hấp cấp giảm oxy máu');
    if (labs.lTC && parseFloat(labs.lTC) < 50) complications.push(`Giảm tiểu cầu nặng (${labs.lTC} G/L) có nguy cơ xuất huyết nội tạng`);
    if (labs.lHct && parseFloat(labs.lHct) > 48) complications.push(`Cô đặc máu nghiêm trọng (Hct ${labs.lHct}%) do thoát huyết tương`);

    const complicationStr = complications.length > 0 ? complications.join('; ') : 'Chưa ghi nhận biến chứng suy đa cơ quan tại thời điểm thăm khám.';

    return {
      severity,
      etiology,
      complicationStr,
    };
  }, [vitals, labs, problems, leadDiagnosis]);

  // 5. Sinh Văn bản Biện luận Lâm sàng EMR hoàn chỉnh
  const generatedReasoningText = useMemo(() => {
    if (!leadDiagnosis) {
      return 'Chưa đủ dữ kiện để xây dựng văn bản biện luận lâm sàng.';
    }

    const lines: string[] = [];

    lines.push('=== BIỆN LUẬN LÂM SÀNG (CLINICAL REASONING RECORD) ===');
    lines.push(`(Theo phương pháp Biện luận Phân tích & Tổng hợp · Chuẩn ĐHYD TP.HCM)\n`);

    // A. Chọn vấn đề biện luận
    lines.push(`A. VẤN ĐỀ CHỌN ĐỂ BIỆN LUẬN:`);
    lines.push(`Bệnh nhân vào viện vì lý do "${primaryProblem}" nên vấn đề "${primaryProblem}" được lựa chọn làm trục chính để biện luận chẩn đoán.\n`);

    // B. Biện luận Chẩn đoán sơ bộ
    lines.push(`B. BIỆN LUẬN CHẨN ĐOÁN SƠ BỘ:`);
    lines.push(`Từ vấn đề trên, nghĩ nhiều nhất đến: ${leadDiagnosis.ten.toUpperCase()} (ICD-10: ${leadDiagnosis.icd}), với độ phù hợp lâm sàng ${leadMatchPct}%.`);
    lines.push(`Lý do nghĩ đến:`);
    if (mainSymptoms.length > 0) {
      lines.push(`- Triệu chứng chính: Bệnh nhân có các biểu hiện đặc thù phù hợp nhất với bệnh cảnh: ${mainSymptoms.join(', ')}.`);
    }
    if (minorSymptoms.length > 0) {
      lines.push(`- Triệu chứng phụ củng cố: Kèm theo ${minorSymptoms.join(', ')}.`);
    }
    if (epiContext && (epiContext.endemicArea || epiContext.outbreakAlert || epiContext.vectorExposure)) {
      const epiDetails = [epiContext.endemicArea, epiContext.outbreakAlert, epiContext.vectorExposure].filter(Boolean).join('; ');
      lines.push(`- Dịch tễ học & Bối cảnh phơi nhiễm: ${epiDetails}.`);
    }
    if (supportiveLabs.length > 0) {
      lines.push(`- Dữ kiện cận lâm sàng bước đầu ủng hộ: ${supportiveLabs.join(' · ')}.`);
    }
    lines.push(`\n-> ĐỀ NGHỊ CẬN LÂM SÀNG ĐỂ XÁC CHẨN:`);
    confirmatoryTests.forEach((t, i) => {
      lines.push(`  ${i + 1}. ${t.name}: Nhằm ${t.purpose.toLowerCase()}.`);
    });
    lines.push('');

    // C. Biện luận Chẩn đoán phân biệt
    if (differentialDiagnoses.length > 0) {
      lines.push(`C. BIỆN LUẬN CHẨN ĐOÁN PHÂN BIỆT:`);
      lines.push(`Tuy nhiên, cần đặt ra các chẩn đoán phân biệt sau nhằm tránh bỏ sót bệnh lý nguy hiểm:`);
      differentialDiagnoses.forEach((d, idx) => {
        lines.push(`\n${idx + 1}. Phân biệt với: ${d.disease.ten.toUpperCase()} (Độ phù hợp: ${d.pct}%):`);
        if (d.commonSymptoms.length > 0) {
          lines.push(`   + Nghĩ đến vì: Bệnh nhân cũng có các triệu chứng tương đồng như ${d.commonSymptoms.slice(0, 3).join(', ')}.`);
        }
        const reasonsLessLikely: string[] = [];
        if (d.negatedMatching.length > 0) {
          reasonsLessLikely.push(`bệnh nhân không có dấu hiệu ${d.negatedMatching.join(', ')}`);
        }
        if (d.missingSymptoms.length > 0) {
          reasonsLessLikely.push(`chưa ghi nhận các biểu hiện kinh điển như ${d.missingSymptoms.join(', ')}`);
        }
        if (reasonsLessLikely.length > 0) {
          lines.push(`   + Ít nghĩ hơn vì: ${reasonsLessLikely.join('; ')}.`);
        }
        lines.push(`   -> Đề nghị CLS để loại trừ: ${d.exclusionTest.name} (nhằm ${d.exclusionTest.purpose.toLowerCase()}).`);
      });
      lines.push('');
    }

    // D. Đánh giá toàn diện
    lines.push(`D. ĐÁNH GIÁ TOÀN DIỆN BỆNH LÝ:`);
    lines.push(`1. Mức độ nặng: ${comprehensiveAssessment.severity}.`);
    lines.push(`2. Nguyên nhân / Căn nguyên: ${comprehensiveAssessment.etiology}.`);
    lines.push(`3. Biến chứng: ${comprehensiveAssessment.complicationStr}.`);

    return lines.join('\n');
  }, [
    leadDiagnosis,
    primaryProblem,
    leadMatchPct,
    mainSymptoms,
    minorSymptoms,
    supportiveLabs,
    epiContext,
    confirmatoryTests,
    differentialDiagnoses,
    comprehensiveAssessment,
  ]);

  const handleCopyReasoning = () => {
    const text = customText || generatedReasoningText;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-none">
              III. Biện luận lâm sàng (Clinical Reasoning Engine)
            </h2>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Phương pháp Biện luận Phân tích & Đánh giá toàn diện · Chuẩn ĐHYD TP.HCM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Switcher */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-[11px]">
            <button
              type="button"
              onClick={() => {
                setViewMode('structured');
                setEditing(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'structured' && !editing
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trực quan
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('emr');
                setEditing(false);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'emr' && !editing
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Văn bản EMR
            </button>
            <button
              type="button"
              onClick={() => {
                if (!customText) setCustomText(generatedReasoningText);
                setEditing((prev) => !prev);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                editing
                  ? 'bg-amber-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {editing ? 'Đang tự sửa' : 'Tự chỉnh sửa'}
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyReasoning}
            className={`w-7 h-7 flex items-center justify-center rounded-lg border transition-all cursor-pointer shadow-2xs ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200/80'
            }`}
            title={copied ? "Đã sao chép văn bản biện luận EMR!" : "Sao chép toàn bộ văn bản biện luận lâm sàng"}
            aria-label="Sao chép biện luận"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {editing ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                Chế độ tự chỉnh sửa văn bản biện luận:
              </span>
              <button
                type="button"
                onClick={() => setCustomText(generatedReasoningText)}
                className="text-[11px] text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Khôi phục bản tự động sinh
              </button>
            </div>
            <textarea
              value={customText || generatedReasoningText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={16}
              className="w-full text-xs font-mono-custom p-3.5 border border-amber-300 rounded-lg bg-amber-50/20 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
            />
          </div>
        ) : viewMode === 'emr' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-mono-custom text-slate-800 whitespace-pre-line leading-relaxed select-all">
            {customText || generatedReasoningText}
          </div>
        ) : (
          /* Structured Visual View */
          <div className="flex flex-col gap-4">
            {/* Section A: Vấn đề chính chọn để biện luận */}
            <div className="p-3 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 border border-blue-200 rounded-lg flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs text-slate-700">
                  Trục vấn đề được chọn để biện luận:{' '}
                  <b className="text-blue-950 font-bold text-sm">"{primaryProblem}"</b>
                </span>
              </div>
              <span className="text-[11px] text-blue-700 font-medium bg-blue-100/80 px-2 py-0.5 rounded">
                Lý do vào viện chính / Vấn đề cấp #1
              </span>
            </div>

            {/* Section B: Biện luận Chẩn đoán Sơ bộ */}
            {leadDiagnosis && (
              <div className="border border-indigo-200 rounded-xl bg-gradient-to-b from-indigo-50/30 to-white overflow-hidden shadow-2xs">
                <div className="p-3.5 bg-indigo-100/60 border-b border-indigo-200/80 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-700" />
                    <span className="text-xs font-bold text-indigo-950">
                      B. CHẨN ĐOÁN SƠ BỘ (Nghĩ nhiều nhất):{' '}
                      <span className="text-sm font-extrabold text-blue-900">{leadDiagnosis.ten}</span>
                    </span>
                    <span className="text-xs font-mono-custom text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
                      ICD-10: {leadDiagnosis.icd}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-2xs font-mono-custom">
                    {leadMatchPct}% Trùng khớp
                  </span>
                </div>

                <div className="p-4 space-y-3.5">
                  {/* 4 Tầng bằng chứng */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-2">
                      1. Các dữ kiện chứng minh:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                      {/* Triệu chứng chính */}
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                        <span className="font-bold text-blue-900 block mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          Triệu chứng chính phù hợp nhất:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {mainSymptoms.map((m, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[11px]">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Triệu chứng phụ củng cố */}
                      <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
                        <span className="font-bold text-slate-800 block mb-1 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-slate-500" />
                          Triệu chứng phụ củng cố:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {minorSymptoms.length > 0 ? (
                            minorSymptoms.map((m, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 text-[11px]">
                                {m}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">Không có triệu chứng phụ đặc biệt</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cận lâm sàng ban đầu ủng hộ */}
                  {supportiveLabs.length > 0 && (
                    <div className="p-2.5 bg-purple-50/60 border border-purple-200 rounded-lg text-xs">
                      <span className="font-bold text-purple-900 block mb-1 flex items-center gap-1">
                        <Microscope className="w-3.5 h-3.5 text-purple-600" />
                        Cận lâm sàng bước đầu ủng hộ chẩn đoán:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {supportiveLabs.map((lab, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 font-mono-custom font-semibold text-[11px]">
                            🧪 {lab}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Đề xuất Cận lâm sàng XÁC CHẨN */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                    <span className="font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
                      <Target className="w-4 h-4 text-emerald-600" />
                      Mục tiêu Cận lâm sàng để XÁC CHẨN (Confirmatory Workup):
                    </span>
                    <ul className="space-y-1 pl-1">
                      {confirmatoryTests.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-emerald-900">
                          <span className="font-bold text-emerald-700 mt-0.5">•</span>
                          <span>
                            <b>{t.name}:</b> {t.purpose}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Section C: Biện luận Chẩn đoán Phân biệt */}
            {differentialDiagnoses.length > 0 && (
              <div className="border border-amber-200 rounded-xl bg-gradient-to-b from-amber-50/30 to-white overflow-hidden shadow-2xs">
                <div className="p-3.5 bg-amber-100/60 border-b border-amber-200/80 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <GitCompare className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-amber-950">
                      C. BIỆN LUẬN CHẨN ĐOÁN PHÂN BIỆT ({differentialDiagnoses.length} bệnh lý cần loại trừ)
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-medium">
                    Tránh bỏ sót bệnh lý cấp tính & trùng lắp
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  {differentialDiagnoses.map((diff, idx) => (
                    <div key={idx} className="p-3 bg-white border border-amber-200/80 rounded-lg space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[11px]">
                            {idx + 1}
                          </span>
                          Phân biệt với: <span className="text-amber-950 font-bold">{diff.disease.ten}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono-custom text-[11px] font-semibold">
                          {diff.pct}% phù hợp
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                        <div>
                          <span className="text-[11px] font-semibold text-slate-600 block">Nghĩ đến vì:</span>
                          <span className="text-[11px] text-slate-800">
                            {diff.commonSymptoms.length > 0 ? diff.commonSymptoms.slice(0, 3).join(', ') : 'Có triệu chứng toàn thân tương tự'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-rose-700 block">Ít nghĩ hơn vì:</span>
                          <span className="text-[11px] text-rose-900">
                            {diff.negatedMatching.length > 0
                              ? `Không có ${diff.negatedMatching.join(', ')}`
                              : diff.missingSymptoms.length > 0
                              ? `Chưa có ${diff.missingSymptoms.join(', ')}`
                              : 'Tổ hợp triệu chứng chưa điển hình'}
                          </span>
                        </div>
                      </div>

                      {/* Đề xuất CLS loại trừ */}
                      <div className="mt-1 pl-6 pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-700 flex-wrap">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>
                          <b>CLS để loại trừ:</b> <span className="text-rose-900 font-semibold">{diff.exclusionTest.name}</span> ({diff.exclusionTest.purpose})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section D: Đánh giá Toàn diện Bệnh lý */}
            <div className="border border-slate-200 rounded-xl bg-white p-4 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                <Activity className="w-4 h-4 text-indigo-600" />
                D. Đánh giá Toàn diện Bệnh lý (Mức độ — Căn nguyên — Biến chứng)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Mức độ nặng */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                    1. Mức độ nặng:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {comprehensiveAssessment.severity}
                  </p>
                </div>

                {/* Nguyên nhân / Căn nguyên */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                    2. Căn nguyên bệnh sinh:
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {comprehensiveAssessment.etiology}
                  </p>
                </div>

                {/* Biến chứng */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-bold text-slate-700 block mb-1 text-[11px] uppercase tracking-wider">
                    3. Biến chứng:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium text-rose-900">
                    {comprehensiveAssessment.complicationStr}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
