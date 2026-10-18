import { decodePreviewSource } from '../data/rawPreviewData';
import { CalculatedRenalMetrics, DosingScenario, InfusionOrder, PatientState } from '../types';

export interface ExtractedDrugData {
  id: string;
  name: string;
  route: string;
  forms: string;
  scenarios: DosingScenario[];
  rows: any[];
  order: InfusionOrder | null;
  rrtHtml: string;
  notesHtml: string;
  srcHtml: string;
  isColistin: boolean;
  isVancomycin: boolean;
  weightRule: any;
}

function safeEvalJs(codeStr: string) {
  try {
    return new Function('return ' + codeStr)();
  } catch (e) {
    return null;
  }
}

export function extractDrugData(id: string): ExtractedDrugData {
  const page = decodePreviewSource(id);
  if (!page) {
    return {
      id,
      name: id,
      route: 'IV',
      forms: '',
      scenarios: [{ key: 'standard', label: 'Tiêu chuẩn', labelEn: 'Standard', def: true }],
      rows: [],
      order: null,
      rrtHtml: '',
      notesHtml: '',
      srcHtml: '',
      isColistin: false,
      isVancomycin: false,
      weightRule: null
    };
  }

  const nameMatch = page.match(/const DRUG_NAME\s*=\s*"([^"]+)";/);
  const routeMatch = page.match(/const ROUTE\s*=\s*"([^"]+)";/);
  const formsMatch = page.match(/const FORMS\s*=\s*"([^"]+)";/);
  const weightMatch = page.match(/const WEIGHT\s*=\s*({[^}]+}|null);/);
  const scnMatch = page.match(/const SCENARIOS\s*=\s*(\[[^;]+\]);/);
  const rowsMatch = page.match(/const ROWS\s*=\s*(\[[^;]+\]);/);
  const orderMatch = page.match(/const ORDER\s*=\s*({[^;]+});/);

  const rrtMatch = page.match(/<div class="rrt-panel"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<div class="order-box"/);
  const notesMatch = page.match(/<div class="notes-box">([\s\S]*?)<\/div>\s*<div class="src-box">/);
  const srcMatch = page.match(/<div class="src-box">([\s\S]*?)<\/div>\s*<\/div>/);

  const isColistin = id === 'colistin';
  const isVancomycin = id === 'vancomycin';

  let scenarios: DosingScenario[] = [];
  if (scnMatch) {
    const rawScn = safeEvalJs(scnMatch[1]);
    if (Array.isArray(rawScn)) {
      scenarios = rawScn.map((s: any) => ({
        key: s.key,
        label: s.label,
        labelEn: s.key === 'standard' ? 'Standard' : (s.key === 'severe' ? 'Severe / High MIC' : (s.key === 'extended' ? 'Extended Infusion' : s.label)),
        def: !!s.def
      }));
    }
  }

  if (scenarios.length === 0) {
    scenarios = [{ key: 'standard', label: 'Tiêu chuẩn', labelEn: 'Standard', def: true }];
  }

  let rows: any[] = [];
  if (rowsMatch) {
    rows = safeEvalJs(rowsMatch[1]) || [];
  }

  const order: InfusionOrder | null = orderMatch ? safeEvalJs(orderMatch[1]) : null;
  const weightRule = weightMatch ? safeEvalJs(weightMatch[1]) : null;

  return {
    id,
    name: nameMatch ? nameMatch[1] : (isColistin ? 'Colistin' : id),
    route: routeMatch ? routeMatch[1] : (isColistin ? 'IV' : 'IV'),
    forms: formsMatch ? formsMatch[1] : (isColistin ? 'lọ 1 MIU (33,3 mg CBA), 2 MIU' : ''),
    scenarios,
    rows,
    order,
    rrtHtml: rrtMatch ? rrtMatch[1].trim() : '',
    notesHtml: notesMatch ? notesMatch[1].trim() : '',
    srcHtml: srcMatch ? srcMatch[1].trim() : '',
    isColistin,
    isVancomycin,
    weightRule
  };
}

export interface DoseResult {
  loadingDoseTextVi: string | null;
  loadingDoseTextEn: string | null;
  maintenanceDoseTextVi: string;
  maintenanceDoseTextEn: string;
  selectedRowLabel: string;
  selectedRowNoteVi?: string;
  selectedRowNoteEn?: string;
  intervalHours?: number;
  infusionInstructionsVi: string;
  infusionInstructionsEn: string;
  orderTextVi: string;
  orderTextEn: string;
  renalAdjustmentAdviceVi: string;
  renalAdjustmentAdviceEn: string;
  reductionPercentage?: number;
}

export function calculateDose(
  drug: ExtractedDrugData,
  renal: CalculatedRenalMetrics,
  scenarioKey: string,
  patient: PatientState
): DoseResult {
  const { crcl, usedWeight } = renal;

  if (drug.isColistin) {
    // Colistin specialized PK/PD calculation
    // ROWS = [ { lo:90, hi:null, perDose:180, perDay:360 }, ... ]
    const matchedRow = drug.rows.find((r: any) => crcl >= r.lo) || drug.rows[drug.rows.length - 1];
    const perDoseCba = matchedRow ? matchedRow.perDose : 180;
    const perDoseMiu = (perDoseCba / 33.3).toFixed(1).replace('.', ',');

    const ldCba = Math.min(300, Math.round(5 * usedWeight));
    const ldMiu = (ldCba / 33.3).toFixed(1).replace('.', ',');

    const rowLabel = matchedRow.hi === null ? `≥ ${matchedRow.lo} mL/phút` : (matchedRow.lo === 0 ? `< ${matchedRow.hi} mL/phút` : `${matchedRow.lo}-${matchedRow.hi} mL/phút`);

    const standardBaseline = 180;
    const reductionPct = Math.max(0, Math.round((1 - perDoseCba / standardBaseline) * 100));

    return {
      loadingDoseTextVi: `9 MIU (~300 mg CBA) hoặc 5 mg/kg CBA (${ldMiu} MIU) truyền tĩnh mạch trong 1-2 giờ`,
      loadingDoseTextEn: `9 MIU (~300 mg CBA) or 5 mg/kg CBA (${ldMiu} MIU) IV over 1-2 hours`,
      maintenanceDoseTextVi: `${perDoseCba} mg CBA (~${perDoseMiu} MIU) mỗi 12 giờ (q12h)`,
      maintenanceDoseTextEn: `${perDoseCba} mg CBA (~${perDoseMiu} MIU) every 12 hours (q12h)`,
      selectedRowLabel: rowLabel,
      selectedRowNoteVi: 'Liều duy trì bắt đầu sau liều nạp 12 giờ. Dùng theo hoạt tính colistin base (CBA): 1 MIU ≈ 33,3 mg CBA (1 triệu IU CMS ≈ 30 mg CBA).',
      selectedRowNoteEn: 'Maintenance dose starts 12 hours after loading dose. Expressed in Colistin Base Activity (CBA): 1 MIU ≈ 33.3 mg CBA.',
      infusionInstructionsVi: 'Pha trong 100-250 mL NaCl 0,9% hoặc Glucose 5%, truyền tĩnh mạch trong 60 phút',
      infusionInstructionsEn: 'Dilute in 100-250 mL NS 0.9% or D5W, infuse IV over 60 minutes',
      orderTextVi: `Chế phẩm: Colistimethate sodium (lọ 1 MIU hoặc 2 MIU)\nLiều nạp: 9 MIU (~300 mg CBA)\nLiều duy trì: ${perDoseCba} mg CBA (~${perDoseMiu} MIU) q12h\nDung môi: NaCl 0,9% 100-250 mL\nThời gian truyền: 60 phút`,
      orderTextEn: `Agent: Colistimethate sodium (vial 1 MIU or 2 MIU)\nLoading Dose: 9 MIU (~300 mg CBA)\nMaintenance: ${perDoseCba} mg CBA (~${perDoseMiu} MIU) q12h\nSolvent: 0.9% NaCl 100-250 mL\nInfusion Duration: 60 min`,
      renalAdjustmentAdviceVi: reductionPct > 0 
        ? `Giảm ${reductionPct}% liều so với người bình thường do suy giảm chức năng thận (CrCl ${renal.crcl} mL/phút). Theo dõi sát chức năng thận hàng ngày.`
        : 'Chức năng thận bảo tồn. Dùng liều chuẩn tối đa để đạt nồng độ mục tiêu điều trị vi khuẩn đa kháng.',
      renalAdjustmentAdviceEn: reductionPct > 0 
        ? `Reduced by ${reductionPct}% from standard baseline due to renal impairment (CrCl ${renal.crcl} mL/min). Monitor renal function daily.`
        : 'Preserved renal function. Full target dose indicated for MDR Gram-negative organisms.',
      reductionPercentage: reductionPct
    };
  }

  // Standard drug row matching
  let matchedRow = drug.rows.find((r: any) => (r.op === 'gt' ? crcl > r.thr : crcl >= r.thr));
  if (!matchedRow && drug.rows.length > 0) {
    matchedRow = drug.rows[drug.rows.length - 1];
  }

  let doseRaw: any = '-';
  if (matchedRow && matchedRow.doses) {
    doseRaw = matchedRow.doses[scenarioKey] || matchedRow.doses['standard'] || Object.values(matchedRow.doses)[0];
  }

  let doseText = '';
  if (Array.isArray(doseRaw)) {
    doseText = doseRaw.map((d: any) => typeof d === 'string' ? d : `${d.dose} (${d.label})`).join(' HOẶC ');
  } else if (typeof doseRaw === 'string') {
    doseText = doseRaw;
  }

  // Handle mg/kg weight multiplier if applicable
  if (doseText.includes('mg/kg')) {
    doseText = doseText.replace(/(\d+(?:[.,]\d+)?)(?:\s*-\s*(\d+(?:[.,]\d+)?))?\s*mg(?:\s+TMP)?\/kg/g, (match, a, b) => {
      const valA = Math.round(parseFloat(a.replace(',', '.')) * usedWeight);
      if (b) {
        const valB = Math.round(parseFloat(b.replace(',', '.')) * usedWeight);
        return `${valA}-${valB} mg (${match})`;
      }
      return `${valA} mg (${match})`;
    });
  }

  // Check loading dose
  let loadingVi: string | null = null;
  let loadingEn: string | null = null;
  if (drug.isVancomycin) {
    const ldMin = Math.round(25 * usedWeight);
    const ldMax = Math.min(3000, Math.round(30 * usedWeight));
    loadingVi = `25-30 mg/kg thực tế (${ldMin} - ${ldMax} mg, tối đa 3.000 mg), truyền trong 1,5 - 2,5 giờ`;
    loadingEn = `25-30 mg/kg actual weight (${ldMin} - ${ldMax} mg, max 3,000 mg), infused over 1.5 - 2.5 hours`;
  } else if (drug.id === 'teicoplanin') {
    loadingVi = '6 mg/kg (hoặc 12 mg/kg trong nhiễm khuẩn nặng) mỗi 12 giờ x 3-5 liều nạp đầu tiên';
    loadingEn = '6 mg/kg (or 12 mg/kg in severe infections) q12h x 3-5 loading doses';
  } else if (drug.id === 'tigecyclin') {
    loadingVi = '100 mg (hoặc 200 mg trong trường hợp nặng/A. baumannii) liều duy nhất';
    loadingEn = '100 mg (or 200 mg in severe / MDR A. baumannii) single loading dose';
  } else if (drug.id === 'fluconazole') {
    loadingVi = 'Gấp đôi liều duy trì hàng ngày (400 - 800 mg) trong ngày điều trị đầu tiên (Ngày 1)';
    loadingEn = 'Double the daily maintenance dose (400 - 800 mg) on Day 1';
  } else if (drug.id === 'caspofungin') {
    loadingVi = '70 mg liều duy nhất vào Ngày 1 (sau đó duy trì 50 mg/ngày)';
    loadingEn = '70 mg single loading dose on Day 1 (then 50 mg daily)';
  } else if (drug.id === 'anidulafungin') {
    loadingVi = '200 mg liều duy nhất vào Ngày 1 (sau đó duy trì 100 mg/ngày)';
    loadingEn = '200 mg single loading dose on Day 1 (then 100 mg daily)';
  }

  // Preparation / infusion instructions
  let infusionVi = 'Truyền tĩnh mạch tiêu chuẩn trong 30-60 phút';
  let infusionEn = 'Standard intravenous infusion over 30-60 minutes';

  if (drug.order) {
    infusionVi = `Pha trong ${drug.order.vol} mL dung dịch NaCl 0,9% hoặc Glucose 5%, truyền tĩnh mạch trong ${drug.order.time} phút`;
    infusionEn = `Dilute in ${drug.order.vol} mL NS 0.9% or D5W, infuse IV over ${drug.order.time} minutes`;
    if (drug.order.time >= 180) {
      infusionVi += ' (Truyền kéo dài để tối ưu %T > MIC)';
      infusionEn += ' (Prolonged infusion to optimize %T > MIC)';
    }
  }

  // Renal adjustment advice
  let adviceVi = 'Chức năng thận ở mức này yêu cầu phác đồ chuẩn tương ứng.';
  let adviceEn = 'Renal function in this range corresponds to standard regimen.';

  if (renal.isArc) {
    adviceVi = 'CẢNH BÁO TĂNG THANH THẢI THẬN (ARC > 130 mL/phút): Bệnh nhân có nguy cơ nồng độ thuốc dưới ngưỡng điều trị. Cân nhắc dùng liều tối đa cho phép hoặc áp dụng truyền kéo dài/liên tục, theo dõi TDM nồng độ đáy.';
    adviceEn = 'AUGMENTED RENAL CLEARANCE WARNING (ARC > 130 mL/min): High risk of subtherapeutic drug concentrations. Consider maximum allowable dose or extended/continuous infusion with TDM monitoring.';
  } else if (renal.renalCategory === 'severe' || renal.renalCategory === 'esrd') {
    adviceVi = `Suy thận nặng (CrCl ${renal.crcl} mL/phút): Đã kéo dài khoảng cách dùng liều hoặc giảm liều đơn độc để tránh tích lũy độc tính. Tránh dùng thuốc độc thận phối hợp.`;
    adviceEn = `Severe renal impairment (CrCl ${renal.crcl} mL/min): Dose and/or interval adjusted to avoid toxic drug accumulation. Avoid concurrent nephrotoxic agents.`;
  } else if (renal.renalCategory === 'moderate') {
    adviceVi = `Suy thận trung bình (CrCl ${renal.crcl} mL/phút): Hiệu chỉnh liều theo bảng để cân bằng giữa hiệu lực diệt khuẩn và an toàn thận.`;
    adviceEn = `Moderate renal impairment (CrCl ${renal.crcl} mL/min): Dosage adjusted per protocol to balance antimicrobial efficacy and renal clearance.`;
  }

  const orderTextVi = `Chế phẩm: ${drug.name} (${drug.forms || drug.route})\n${loadingVi ? `Liều nạp: ${loadingVi}\n` : ''}Liều duy trì: ${doseText}\n${drug.order ? `Dung môi: NaCl 0,9% hoặc Glucose 5% ${drug.order.vol} mL\nThời gian truyền: ${drug.order.time} phút` : `Đường dùng: ${drug.route}`}`;
  const orderTextEn = `Medication: ${drug.name} (${drug.forms || drug.route})\n${loadingEn ? `Loading Dose: ${loadingEn}\n` : ''}Maintenance Dose: ${doseText}\n${drug.order ? `Solvent: 0.9% NaCl or 5% Dextrose ${drug.order.vol} mL\nInfusion Time: ${drug.order.time} min` : `Route: ${drug.route}`}`;

  return {
    loadingDoseTextVi: loadingVi,
    loadingDoseTextEn: loadingEn,
    maintenanceDoseTextVi: doseText,
    maintenanceDoseTextEn: doseText,
    selectedRowLabel: matchedRow ? matchedRow.label : `CrCl ${crcl}`,
    selectedRowNoteVi: matchedRow?.note,
    selectedRowNoteEn: matchedRow?.noteEn || matchedRow?.note,
    infusionInstructionsVi: infusionVi,
    infusionInstructionsEn: infusionEn,
    orderTextVi,
    orderTextEn,
    renalAdjustmentAdviceVi: adviceVi,
    renalAdjustmentAdviceEn: adviceEn
  };
}
