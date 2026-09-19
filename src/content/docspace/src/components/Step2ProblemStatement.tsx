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
import { toAbbreviatedMedicalText } from '../lib/medicalAbbreviations.ts';
import { normalizeText } from '../lib/normalizeUtils.ts';

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

/**
 * Kiểm tra xem một câu trong Tiền căn (TC) có bị trùng lặp với danh sách dịch tễ (epiList / epiContext)
 * hoặc mang bản chất thông tin dịch tễ đã được ghi nhận riêng.
 */
function isEpidemiologyDuplicate(
  tcSentence: string,
  epiList: string[],
  epiContext?: Partial<EpidemiologyContext>
): boolean {
  if (!tcSentence || !tcSentence.trim()) return true;

  const rawNormTC = normalizeText(tcSentence).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (rawNormTC.length < 5) return true;

  // Danh sách các chuỗi dịch tễ đã có trong hồ sơ
  const existingEpiTexts: string[] = [];

  // 1. Thu thập từ epiList đã sinh
  epiList.forEach((item) => {
    const norm = normalizeText(item).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
    // Bỏ qua prefix dạng "ổ dịch địa phương", "vùng dịch tễ lưu hành", "tiếp xúc vector", v.v.
    const clean = norm.replace(
      /^(o dich dia phuong|vung dich te luu hanh|tiep xuc vector|tiep xuc nguon lay|tien su di lai|boi canh mua dich|nguon nuoc thuc pham)\s*/,
      ''
    ).trim();
    if (clean.length >= 6) existingEpiTexts.push(clean);
  });

  // 2. Thu thập từ các trường gốc của epiContext
  if (epiContext) {
    const fields = [
      epiContext.outbreakAlert,
      epiContext.endemicArea,
      epiContext.vectorExposure,
      epiContext.contactHistory,
      epiContext.travelHistory,
      epiContext.seasonalContext,
      epiContext.waterFoodRisk,
    ];
    fields.forEach((f) => {
      if (f && f.trim()) {
        const norm = normalizeText(f).replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
        if (norm.length >= 6) existingEpiTexts.push(norm);
      }
    });
  }

  // 3. So khớp chuỗi con & tương đồng từ khóa
  const tcWords = rawNormTC.split(' ').filter((w) => w.length > 2);

  for (const epiText of existingEpiTexts) {
    // Nếu chuỗi TC bao hàm hoặc bị bao hàm bởi chuỗi dịch tễ
    if (rawNormTC.includes(epiText) || epiText.includes(rawNormTC)) {
      return true;
    }

    // So sánh token overlap (nếu trùng phần lớn các từ khóa cốt lõi)
    const epiWords = epiText.split(' ').filter((w) => w.length > 2);
    if (tcWords.length > 0 && epiWords.length > 0) {
      const commonWords = tcWords.filter((w) => epiWords.includes(w));
      // Nếu trùng >= 3 từ khóa và chiếm >= 50% số từ khóa câu TC
      if (commonWords.length >= 3 && commonWords.length / tcWords.length >= 0.5) {
        return true;
      }
    }
  }

  // 4. Nếu đã có dữ liệu dịch tễ (existingEpiTexts có dữ liệu) và câu TC thuần túy là câu phát biểu dịch tễ
  if (existingEpiTexts.length > 0) {
    const isPureEpiPattern =
      /(song trong vung|o dich|vung luu hanh|vung dich te|muoi van|aedes|anopheles|tiep xuc ca benh|tiep xuc nguon lay|ngap lut|loi nuoc|rung ray|ngu lan trai|khu nha tro|song cung)/i.test(
        rawNormTC
      );
    // Kiểm tra xem có chứa thông tin bệnh án / tiền căn y khoa thực sự không
    const hasMedicalHistoryWords =
      /(tien su|tien can|benh ly|man tinh|di ung|tang huyet ap|suy than|dai thao duong|co giat|viem gan|tiem vac xin|tiem phong|phau thuat|truyen mau)/i.test(
        rawNormTC
      );

    if (isPureEpiPattern && !hasMedicalHistoryWords) {
      return true;
    }
  }

  return false;
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

  // Helper bóc tách thời gian khởi phát / diễn tiến bệnh từ bệnh sử hoặc lý do vào viện
  const diseaseDuration = useMemo(() => {
    const combined = `${form.lyDo || ''} ${form.text?.cn || ''}`;
    const patterns = [
      /(?:giờ thứ|ngày thứ)\s*(\d+)/i,
      /(?:bệnh|khởi phát|cách nhập viện|diễn tiến)\s+(\d+\s*(?:giờ|ngày|tuần|tháng))/i,
      /(\d+\s*(?:giờ|ngày|tuần|tháng)\s+nay)/i,
      /(\d+\s*(?:giờ|ngày)\s+trước\s+nhập\s+viện)/i,
    ];
    for (const p of patterns) {
      const m = combined.match(p);
      if (m) {
        if (p.source.includes('thứ')) {
          return m[0]; // e.g. "giờ thứ 4", "ngày thứ 3"
        }
        return `ngày ${m[1]}`.replace(/ngày\s+(\d+)\s+ngày/, 'ngày thứ $1');
      }
    }
    return '';
  }, [form.lyDo, form.text?.cn]);

  // Dữ liệu phân đoạn chuẩn hóa của Tóm tắt bệnh án (chuẩn ĐHYD TP.HCM & BV Chợ Rẫy)
  const summaryStructure: SummaryStructure = useMemo(() => {
    const genderStr = form.gioiTinh === 'nam' ? 'nam' : form.gioiTinh === 'nu' ? 'nữ' : 'người bệnh';
    const ageStr = form.tuoi ? `${form.tuoi} tuổi` : 'chưa rõ tuổi';
    const reasonStr = form.lyDo ? form.lyDo.trim() : 'khám bệnh';
    const durationStr =
      diseaseDuration && !reasonStr.toLowerCase().includes(diseaseDuration.toLowerCase())
        ? ` (${diseaseDuration})`
        : '';

    const opening = `BN ${genderStr}, ${ageStr}, vào viện vì ${reasonStr}${durationStr}.`;
    const leadIn = 'Qua hỏi bệnh và thăm khám LS, ghi nhận các vấn đề bất thường sau:';
    const closing = 'Ngoài các dấu hiệu trên, chưa ghi nhận bất thường khác.';

    // Helper lọc câu hành chính / kể chuyện dài dòng trong text nếu người dùng nhập tự do
    const cleanNarrativeSentences = (rawText: string): string[] => {
      if (!rawText || !rawText.trim()) return [];
      return rawText
        .split(/(?:\r?\n|(?<=[.!?])\s+)/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ''))
        .filter((s) => {
          if (s.length < 5) return false;
          const lower = s.toLowerCase();
          if (/^bệnh nhân\s+(nam|nữ|\d+)/i.test(lower)) return false;
          if (/^bn\s+(nam|nữ|\d+)/i.test(lower)) return false;
          if (/tự (uống|dùng|mua)\s+(thuốc|paracetamol)/i.test(lower)) return false;
          if (/tiền sử (bản thân|gia đình) khỏe mạnh/i.test(lower)) return false;
          if (/chưa ghi nhận (bất thường|bệnh lý)/i.test(lower)) return false;
          if (/tim phổi chưa ghi nhận bất thường/i.test(lower)) return false;
          return true;
        })
        .map((s) => toAbbreviatedMedicalText(s));
    };

    // 1. Các HC lâm sàng & Vấn đề cấp (Ưu tiên gom nhóm theo chuẩn ĐHYD TPHCM)
    const syndromes: string[] = [];
    problems.forEach((p) => {
      if (p.type === 'hoi-chung' || (p.priorityLevel === 'acute' && !p.id.startsWith('prob_'))) {
        const abbrLabel = toAbbreviatedMedicalText(p.label);
        if (!syndromes.includes(abbrLabel)) {
          syndromes.push(abbrLabel);
        }
      }
    });

    // 2. TCCN bất thường (Chỉ lấy các triệu chứng cơ năng bất thường dạng gạch đầu dòng)
    const cnList: string[] = [];
    const cnSymptoms = selectedSymptoms.filter((s) => s.loai.includes('cn'));
    if (cnSymptoms.length > 0) {
      cnSymptoms.forEach((s) => {
        cnList.push(toAbbreviatedMedicalText(s.ten));
      });
    } else if (form.text.cn.trim()) {
      const extracted = cleanNarrativeSentences(form.text.cn);
      if (extracted.length > 0) {
        cnList.push(...extracted);
      }
    }

    // 3. TCTT & DHST bất thường
    const vitalAnomalies: string[] = [];
    const tempNum = parseFloat(vitals.vNhiet);
    if (!isNaN(tempNum) && (tempNum >= 38.0 || tempNum <= 36.0)) {
      vitalAnomalies.push(`T°C: ${vitals.vNhiet}°C${tempNum >= 39 ? ' (Sốt cao)' : ''}`);
    }
    const pulseNum = parseFloat(vitals.vMach);
    if (!isNaN(pulseNum) && pulseNum > 100) {
      vitalAnomalies.push(`M nhanh: ${vitals.vMach} l/p`);
    } else if (!isNaN(pulseNum) && pulseNum < 60 && pulseNum > 0) {
      vitalAnomalies.push(`M chậm: ${vitals.vMach} l/p`);
    }
    const sbp = parseFloat(vitals.vHATT);
    const dbp = parseFloat(vitals.vHATTr);
    if (!isNaN(sbp) && !isNaN(dbp)) {
      const pulsePressure = sbp - dbp;
      const isNarrow = pulsePressure <= 20 && pulsePressure > 0;
      const isHypotension = sbp < 90;
      const isHypertension = sbp >= 140 || dbp >= 90;
      if (isHypotension && isNarrow) {
        vitalAnomalies.push(`HA tụt kẹp: ${vitals.vHATT}/${vitals.vHATTr} mmHg (Hiệu áp ${pulsePressure} mmHg)`);
      } else if (isNarrow) {
        vitalAnomalies.push(`HA kẹp: ${vitals.vHATT}/${vitals.vHATTr} mmHg (Hiệu áp ≤ 20 mmHg)`);
      } else if (isHypotension) {
        vitalAnomalies.push(`HA tụt: ${vitals.vHATT}/${vitals.vHATTr} mmHg`);
      } else if (isHypertension) {
        vitalAnomalies.push(`THA: ${vitals.vHATT}/${vitals.vHATTr} mmHg`);
      }
    }
    const respNum = parseFloat(vitals.vTho);
    if (!isNaN(respNum) && respNum > 20) {
      vitalAnomalies.push(`NT nhanh: ${vitals.vTho} l/p`);
    } else if (!isNaN(respNum) && respNum < 12 && respNum > 0) {
      vitalAnomalies.push(`NT chậm: ${vitals.vTho} l/p`);
    }
    const spo2Num = parseFloat(vitals.vSpo2);
    if (!isNaN(spo2Num) && spo2Num < 95 && spo2Num > 0) {
      vitalAnomalies.push(`SpO₂ giảm: ${vitals.vSpo2}% (khí phòng)`);
    }

    const examList: string[] = [];
    const ttSymptoms = selectedSymptoms.filter((s) => s.loai.includes('tt'));
    if (ttSymptoms.length > 0) {
      ttSymptoms.forEach((s) => {
        examList.push(toAbbreviatedMedicalText(s.ten));
      });
    } else if (form.text.tt.trim()) {
      const extracted = cleanNarrativeSentences(form.text.tt);
      if (extracted.length > 0) {
        examList.push(...extracted);
      }
    }

    // 4. Yếu tố Dịch tễ học (Góc nhìn truyền nhiễm)
    const epiList: string[] = [];
    if (epiContext?.outbreakAlert?.trim()) epiList.push(toAbbreviatedMedicalText(`Ổ dịch địa phương: ${epiContext.outbreakAlert.trim()}`));
    if (epiContext?.endemicArea?.trim()) epiList.push(toAbbreviatedMedicalText(`Vùng dịch tễ lưu hành: ${epiContext.endemicArea.trim()}`));
    if (epiContext?.vectorExposure?.trim()) epiList.push(toAbbreviatedMedicalText(`Tiếp xúc vector: ${epiContext.vectorExposure.trim()}`));
    if (epiContext?.contactHistory?.trim()) epiList.push(toAbbreviatedMedicalText(`Tiếp xúc nguồn lây: ${epiContext.contactHistory.trim()}`));
    if (epiContext?.travelHistory?.trim()) epiList.push(toAbbreviatedMedicalText(`Tiền sử đi lại: ${epiContext.travelHistory.trim()}`));
    if (epiContext?.seasonalContext?.trim()) epiList.push(toAbbreviatedMedicalText(`Bối cảnh mùa dịch: ${epiContext.seasonalContext.trim()}`));
    if (epiContext?.waterFoodRisk?.trim()) epiList.push(toAbbreviatedMedicalText(`Nguồn nước/thực phẩm: ${epiContext.waterFoodRisk.trim()}`));

    // 5. CLS & Xét nghiệm bất thường (Chỉ lấy chỉ số BẤT THƯỜNG)
    const labItems: string[] = [];
    const bc = parseFloat(labs.lBC);
    if (!isNaN(bc)) {
      if (bc < 4.0) labItems.push(`WBC giảm: ${labs.lBC} G/L`);
      else if (bc > 10.0) labItems.push(`WBC tăng: ${labs.lBC} G/L`);
    }
    const tc = parseFloat(labs.lTC);
    if (!isNaN(tc)) {
      if (tc < 50) labItems.push(`PLT giảm nặng: ${labs.lTC} G/L (< 50 G/L)`);
      else if (tc < 100) labItems.push(`PLT giảm: ${labs.lTC} G/L (< 100 G/L)`);
      else if (tc < 150) labItems.push(`PLT giảm nhẹ: ${labs.lTC} G/L`);
      else if (tc > 450) labItems.push(`PLT tăng: ${labs.lTC} G/L`);
    }
    const hct = parseFloat(labs.lHct);
    if (!isNaN(hct)) {
      if (hct >= 44) labItems.push(`Hct tăng: ${labs.lHct}% (Cô đặc máu)`);
      else if (hct < 35) labItems.push(`Hct giảm: ${labs.lHct}% (Thiếu máu)`);
    }
    const glu = parseFloat(labs.lGlu);
    if (!isNaN(glu)) {
      if (glu > 7.0) labItems.push(`Đường huyết tăng: ${labs.lGlu} mmol/L`);
      else if (glu < 3.9 && glu > 0) labItems.push(`Hạ đường huyết: ${labs.lGlu} mmol/L`);
    }
    const trop = parseFloat(labs.lTrop);
    if (!isNaN(trop) && trop > 14) {
      labItems.push(`Troponin tăng: ${labs.lTrop} ng/L`);
    }

    // Các triệu chứng cận lâm sàng từ selectedSymptoms
    const clsSymptoms = selectedSymptoms.filter((s) => s.loai.includes('cls'));
    const clsNarrative: string[] = [];
    if (clsSymptoms.length > 0) {
      clsSymptoms.forEach((s) => {
        clsNarrative.push(toAbbreviatedMedicalText(s.ten));
      });
    }

    // Tách các kết luận cận lâm sàng đặc hiệu từ text (chẩn đoán hình ảnh, vi sinh, men gan...)
    if (form?.text?.cls?.trim()) {
      const clsSentences = form.text.cls
        .split(/(?:\r?\n|(?<=[.!?])\s+)/)
        .map((s) => s.trim().replace(/^[-*•]\s*/, ''))
        .filter((s) => {
          if (s.length < 5) return false;
          // Bỏ câu CBC nếu đã được liệt kê trong labItems
          if (/^công thức máu:/i.test(s) && labItems.length > 0) return false;
          return true;
        })
        .map((s) => toAbbreviatedMedicalText(s));

      clsSentences.forEach((sentence) => {
        if (!clsNarrative.some((item) => item.toLowerCase().includes(sentence.toLowerCase()) || sentence.toLowerCase().includes(item.toLowerCase()))) {
          clsNarrative.push(sentence);
        }
      });
    }

    // 6. Tiền căn (TC) có liên quan (Khử trùng lặp thông minh với Yếu tố Dịch tễ)
    const tcList: string[] = [];
    const tcSymptoms = selectedSymptoms.filter((s) => s.loai.includes('tc')).map((s) => toAbbreviatedMedicalText(s.ten));
    if (tcSymptoms.length > 0) {
      tcSymptoms.forEach((s) => {
        if (!isEpidemiologyDuplicate(s, epiList, epiContext) && !tcList.includes(s)) {
          tcList.push(s);
        }
      });
    }
    if (form?.text?.tc?.trim()) {
      const tcClean = cleanNarrativeSentences(form.text.tc);
      tcClean.forEach((t) => {
        // Kiểm tra nếu câu này bị trùng lặp với dịch tễ đã ghi nhận
        if (isEpidemiologyDuplicate(t, epiList, epiContext)) {
          // Nếu epiList hoàn toàn trống mà câu TC chứa thông tin dịch tễ rõ nét, tự động chuyển vào epiList
          if (epiList.length === 0) {
            epiList.push(t);
          }
          // Bỏ qua, không đưa vào tcList để tránh hiển thị trùng lặp
          return;
        }

        // Kiểm tra trùng lặp với các mục đã có trong tcList
        const normT = normalizeText(t);
        const isDuplicateWithExistingTc = tcList.some((existing) => {
          const normExisting = normalizeText(existing);
          return normT.includes(normExisting) || normExisting.includes(normT);
        });

        if (!isDuplicateWithExistingTc && !tcList.includes(t)) {
          tcList.push(t);
        }
      });
    }

    // 7. Dấu hiệu âm tính (-) có giá trị loại trừ
    const negList = negatedSymptoms.map((s) => `Không ${toAbbreviatedMedicalText(s.ten).toLowerCase()}`);

    return {
      demographics: `BN ${genderStr}, ${ageStr}.`,
      reason: `Vào viện vì: ${reasonStr}.`,
      duration: diseaseDuration || undefined,
      opening,
      leadIn,
      syndromes,
      cnList,
      vitalAnomalies,
      examList,
      epiList,
      labItems,
      clsNarrative,
      tcList,
      negList,
      closing,
    };
  }, [form, vitals, labs, selectedSymptoms, negatedSymptoms, epiContext, problems, diseaseDuration]);

  // Sinh văn bản Tóm tắt bệnh án tự động chuẩn mực y khoa (xuống hàng thoáng mắt theo từng phần chuẩn ĐHYD TP.HCM)
  const generatedSummary = useMemo(() => {
    const s = summaryStructure;
    const parts: string[] = [];

    parts.push(`${s.opening}\n${s.leadIn}`);

    let sectionIdx = 1;

    // 1. Các HC lâm sàng & Vấn đề cấp nổi bật
    if (s.syndromes && s.syndromes.length > 0) {
      parts.push(`${sectionIdx++}. Các HC lâm sàng & Vấn đề cấp nổi bật:\n${s.syndromes.map((syn) => `- ${syn}`).join('\n')}`);
    }

    // 2. TCCN bất thường
    if (s.cnList.length > 0) {
      parts.push(`${sectionIdx++}. TCCN bất thường:\n${s.cnList.map((item) => `- ${item}`).join('\n')}`);
    } else {
      parts.push(`${sectionIdx++}. TCCN bất thường:\n- Chưa ghi nhận bất thường đặc hiệu.`);
    }

    // 3. TCTT & DHST bất thường
    const ttParts: string[] = [];
    if (s.vitalAnomalies.length > 0) {
      ttParts.push(`- DHST bất thường: ${s.vitalAnomalies.join(' · ')}`);
    }
    if (s.examList.length > 0) {
      s.examList.forEach((e) => ttParts.push(`- ${e}`));
    }
    if (ttParts.length > 0) {
      parts.push(`${sectionIdx++}. TCTT & DHST bất thường:\n${ttParts.join('\n')}`);
    } else {
      parts.push(`${sectionIdx++}. TCTT & DHST bất thường:\n- Tổng trạng ổn định, chưa ghi nhận dấu hiệu nặng.`);
    }

    // 4. CLS & Xét nghiệm bất thường
    const clsParts: string[] = [];
    if (s.labItems.length > 0) {
      s.labItems.forEach((lab) => clsParts.push(`- ${lab}`));
    }
    if (s.clsNarrative.length > 0) {
      s.clsNarrative.forEach((c) => clsParts.push(`- ${c}`));
    }
    if (clsParts.length > 0) {
      parts.push(`${sectionIdx++}. CLS & Xét nghiệm bất thường:\n${clsParts.join('\n')}`);
    }

    // 5. Yếu tố Dịch tễ & Tiền căn liên quan
    const ctxParts: string[] = [];
    if (s.epiList && s.epiList.length > 0) {
      s.epiList.forEach((e) => ctxParts.push(`- Dịch tễ: ${e}`));
    }
    if (s.tcList && s.tcList.length > 0) {
      s.tcList.forEach((t) => ctxParts.push(`- Tiền căn: ${t}`));
    }
    if (ctxParts.length > 0) {
      const sectionTitle =
        s.epiList.length > 0 && s.tcList.length > 0
          ? 'Yếu tố Dịch tễ & Tiền căn liên quan'
          : s.epiList.length > 0
          ? 'Yếu tố Dịch tễ học liên quan'
          : 'Tiền căn bệnh lý (TC) liên quan';
      parts.push(`${sectionIdx++}. ${sectionTitle}:\n${ctxParts.join('\n')}`);
    }

    // 6. Dấu hiệu âm tính (-) có giá trị loại trừ
    if (s.negList.length > 0) {
      parts.push(`${sectionIdx++}. Dấu hiệu âm tính (-) loại trừ:\n${s.negList.map((n) => `- ${n}`).join('\n')}`);
    }

    // Câu kết chuẩn hóa
    parts.push(s.closing);

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
          Tiếp tục sang Bước 3: Phân tích &amp; Biện luận chẩn đoán
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
