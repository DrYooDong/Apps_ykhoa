/**
 * EBM Study Deep Analyzer & Critical Appraisal Suite - CliniPortal 2.0
 * Path: src/content/ebm/guidelines/js/study-analyzer-suite.ts
 *
 * Cung cấp:
 * 1. Bộ tính toán hiệu quả lâm sàng EBM (RR, OR, ARR, RRR, NNT, NNH với 95% CI)
 * 2. Ma trận đánh giá nguy cơ sai lệch Cochrane RoB 2 (Traffic-Light System)
 * 3. Hệ thống phân tầng chất lượng bằng chứng GRADE (GRADE Evidence Profiler)
 * 4. Trình trích xuất PICO & Bộ sinh báo cáo phê bình nghiên cứu EBM
 */

export interface Ebm2x2Table {
  interventionEvents: number;    // E1: Biến cố nhóm can thiệp
  interventionTotal: number;     // N1: Tổng số bệnh nhân can thiệp
  controlEvents: number;         // E2: Biến cố nhóm đối chứng
  controlTotal: number;          // N2: Tổng số bệnh nhân đối chứng
  isHarmOutcome?: boolean;       // True nếu kết cục là biến cố bất lợi (gây hại), False nếu là kết cục cần phòng ngừa
}

export interface EbmStatisticalResults {
  eer: number;                   // Experimental Event Rate (EER = E1 / N1)
  cer: number;                   // Control Event Rate (CER = E2 / N2)
  arr: number;                   // Absolute Risk Reduction (ARR = |CER - EER|)
  arrPercent: number;            // ARR (%)
  rrr: number;                   // Relative Risk Reduction (RRR = ARR / CER)
  rrrPercent: number;            // RRR (%)
  rr: number;                    // Relative Risk (RR = EER / CER)
  rrLower95: number;             // RR 95% CI Lower
  rrUpper95: number;             // RR 95% CI Upper
  or: number;                    // Odds Ratio (OR = (E1/(N1-E1)) / (E2/(N2-E2)))
  orLower95: number;             // OR 95% CI Lower
  orUpper95: number;             // OR 95% CI Upper
  nnt: number | null;            // Number Needed to Treat (NNT = 1 / ARR)
  nnh: number | null;            // Number Needed to Harm (NNH = 1 / ARI)
  interpretation: string;        // Nhận xét lâm sàng chi tiết
  isBeneficial: boolean;
  isStatisticallySignificant: boolean;
}

export type RobDomainScore = 'low' | 'some_concerns' | 'high';

export interface Rob2Assessment {
  d1_randomization: { score: RobDomainScore; note: string };
  d2_deviations: { score: RobDomainScore; note: string };
  d3_missing_data: { score: RobDomainScore; note: string };
  d4_measurement: { score: RobDomainScore; note: string };
  d5_reporting: { score: RobDomainScore; note: string };
  overall: RobDomainScore;
  summary: string;
}

export type GradeLevel = 'high' | 'moderate' | 'low' | 'very_low';

export interface GradeAssessment {
  studyDesign: 'rct' | 'observational';
  riskOfBias: -2 | -1 | 0;         // Hạ mức do sai lệch
  inconsistency: -2 | -1 | 0;      // Hạ mức do không nhất quán giữa các nghiên cứu
  indirectness: -2 | -1 | 0;       // Hạ mức do bằng chứng gián tiếp
  imprecision: -2 | -1 | 0;        // Hạ mức do thiếu chính xác (mẫu nhỏ, CI rộng)
  publicationBias: -1 | 0;         // Hạ mức do sai lệch xuất bản
  largeEffect: 0 | 1 | 2;          // Nâng mức do hiệu quả lớn (RR > 2 hoặc < 0.5)
  doseResponse: 0 | 1;             // Nâng mức do có mối quan hệ liều - đáp ứng
  finalGrade: GradeLevel;
  gradeLabel: string;
  rationale: string;
}

export interface EbmCriticalAppraisalReport {
  studyTitle: string;
  pico: {
    p_population: string;
    i_intervention: string;
    c_comparator: string;
    o_outcomes: string;
  };
  statistics?: EbmStatisticalResults;
  rob2?: Rob2Assessment;
  grade?: GradeAssessment;
  clinicalBottomLine: string;
  generatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ENGINE TÍNH TOÁN HIỆU QUẢ LÂM SÀNG (STATISTICAL EFFECT SIZE CALCULATOR)
// ─────────────────────────────────────────────────────────────────────────────

export class EbmStatisticsEngine {
  public static calculate(table: Ebm2x2Table): EbmStatisticalResults {
    const { interventionEvents: a, interventionTotal: n1, controlEvents: c, controlTotal: n2, isHarmOutcome } = table;

    if (n1 <= 0 || n2 <= 0 || a < 0 || c < 0 || a > n1 || c > n2) {
      throw new Error('Dữ liệu bảng 2x2 không hợp lệ: Tổng số bệnh nhân phải > 0 và số biến cố không được vượt quá tổng số.');
    }

    const eer = a / n1;
    const cer = c / n2;

    const arr = Math.abs(cer - eer);
    const arrPercent = arr * 100;

    let rrr = 0;
    if (cer > 0) {
      rrr = (cer - eer) / cer;
    }
    const rrrPercent = rrr * 100;

    // Relative Risk (RR)
    const rr = cer > 0 ? eer / cer : 1;

    // Standard Error of ln(RR)
    // SE = sqrt((1/a - 1/n1) + (1/c - 1/n2))
    const aAdj = a === 0 ? 0.5 : a;
    const cAdj = c === 0 ? 0.5 : c;
    const seLnRr = Math.sqrt((1 / aAdj - 1 / n1) + (1 / cAdj - 1 / n2));
    const lnRr = Math.log(rr > 0 ? rr : 0.001);
    const rrLower95 = Math.exp(lnRr - 1.96 * seLnRr);
    const rrUpper95 = Math.exp(lnRr + 1.96 * seLnRr);

    // Odds Ratio (OR)
    const b = n1 - a;
    const d = n2 - c;
    const bAdj = b === 0 ? 0.5 : b;
    const dAdj = d === 0 ? 0.5 : d;
    const or = (aAdj * dAdj) / (bAdj * cAdj);
    const seLnOr = Math.sqrt(1 / aAdj + 1 / bAdj + 1 / cAdj + 1 / dAdj);
    const lnOr = Math.log(or);
    const orLower95 = Math.exp(lnOr - 1.96 * seLnOr);
    const orUpper95 = Math.exp(lnOr + 1.96 * seLnOr);

    // NNT / NNH
    let nnt: number | null = null;
    let nnh: number | null = null;

    if (arr > 0.0001) {
      const rawNnt = 1 / arr;
      if (eer < cer) {
        nnt = Math.ceil(rawNnt);
      } else {
        nnh = Math.ceil(rawNnt);
      }
    }

    const isBeneficial = eer < cer;
    const isStatisticallySignificant = !(rrLower95 <= 1 && rrUpper95 >= 1);

    // Xây dựng nhận xét lâm sàng súc tích chuẩn EBM
    let interpretation = '';
    if (isBeneficial) {
      interpretation = `Can thiệp giúp làm GIẢM ${(arrPercent).toFixed(1)}% nguy cơ tuyệt đối (ARR) và giảm ${(rrrPercent).toFixed(1)}% nguy cơ tương đối (RRR) so với nhóm đối chứng (RR = ${rr.toFixed(2)}, 95% CI: ${rrLower95.toFixed(2)} - ${rrUpper95.toFixed(2)}).`;
      if (nnt) {
        interpretation += ` Chỉ số NNT = ${nnt} (Cần điều trị cho ${nnt} bệnh nhân để ngăn ngừa 1 biến cố bất lợi).`;
      }
    } else if (eer > cer) {
      interpretation = `Can thiệp làm TĂNG nguy cơ biến cố (EER ${ (eer*100).toFixed(1)}% vs CER ${(cer*100).toFixed(1)}%, RR = ${rr.toFixed(2)}).`;
      if (nnh) {
        interpretation += ` Chỉ số NNH = ${nnh} (Cứ mỗi ${nnh} bệnh nhân điều trị sẽ có thêm 1 biến cố có hại).`;
      }
    } else {
      interpretation = `Không ghi nhận sự khác biệt về tỷ lệ biến cố giữa hai nhóm (EER = CER = ${(eer*100).toFixed(1)}%, RR = 1.00).`;
    }

    if (!isStatisticallySignificant) {
      interpretation += ` Khoảng tin cậy 95% CI vắt qua giá trị 1.00, chưa đủ bằng chứng kết luận có ý nghĩa thống kê ở mức alpha = 0.05.`;
    }

    return {
      eer,
      cer,
      arr,
      arrPercent,
      rrr,
      rrrPercent,
      rr,
      rrLower95,
      rrUpper95,
      or,
      orLower95,
      orUpper95,
      nnt,
      nnh,
      interpretation,
      isBeneficial,
      isStatisticallySignificant
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ENGINE ĐÁNH GIÁ NGUY CƠ SAI LỆCH (COCHRANE RoB 2 EVALUATOR)
// ─────────────────────────────────────────────────────────────────────────────

export class Rob2Evaluator {
  public static evaluate(scores: {
    d1: RobDomainScore;
    d2: RobDomainScore;
    d3: RobDomainScore;
    d4: RobDomainScore;
    d5: RobDomainScore;
  }): { overall: RobDomainScore; summary: string } {
    const list = [scores.d1, scores.d2, scores.d3, scores.d4, scores.d5];

    let overall: RobDomainScore = 'low';
    let summary = 'Nghiên cứu có thiết kế chặt chẽ, nguy cơ sai lệch thấp trên toàn bộ 5 miền.';

    if (list.includes('high')) {
      overall = 'high';
      summary = 'Nghiên cứu có NGUY CƠ SAI LỆCH CAO ở ít nhất một miền quan trọng. Cần thận trọng khi áp dụng kết quả vào thực hành lâm sàng.';
    } else if (list.includes('some_concerns')) {
      overall = 'some_concerns';
      summary = 'Nghiên cứu CÓ MỘT SỐ LO NGẠI về nguy cơ sai lệch. Bằng chứng có độ tin cậy vừa phải.';
    }

    return { overall, summary };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. ENGINE PHÂN TẦNG CHẤT LƯỢNG BẰNG CHỨNG (GRADE PROFILER)
// ─────────────────────────────────────────────────────────────────────────────

export class GradeProfiler {
  public static assess(params: {
    studyDesign: 'rct' | 'observational';
    riskOfBias: -2 | -1 | 0;
    inconsistency: -2 | -1 | 0;
    indirectness: -2 | -1 | 0;
    imprecision: -2 | -1 | 0;
    publicationBias: -1 | 0;
    largeEffect?: 0 | 1 | 2;
    doseResponse?: 0 | 1;
  }): { grade: GradeLevel; label: string; rationale: string } {
    let score = params.studyDesign === 'rct' ? 4 : 2; // RCT bắt đầu từ 4 (High), Quan sát bắt đầu từ 2 (Low)

    // Trừ điểm hạ mức (Downgrade)
    score += params.riskOfBias;
    score += params.inconsistency;
    score += params.indirectness;
    score += params.imprecision;
    score += params.publicationBias;

    // Cộng điểm nâng mức (Upgrade cho nghiên cứu quan sát)
    if (params.studyDesign === 'observational') {
      if (params.largeEffect) score += params.largeEffect;
      if (params.doseResponse) score += params.doseResponse;
    }

    if (score > 4) score = 4;
    if (score < 1) score = 1;

    let grade: GradeLevel = 'high';
    let label = '🟢 RẤT CAO (HIGH)';
    let rationale = 'Chúng tôi rất tự tin rằng hiệu quả thực sự của can thiệp tương đương với ước tính hiệu quả trong nghiên cứu.';

    if (score === 3) {
      grade = 'moderate';
      label = '🟡 TRUNG BÌNH (MODERATE)';
      rationale = 'Chúng tôi tự tin ở mức vừa phải vào ước tính hiệu quả; hiệu quả thực sự có khả năng gần với ước tính, nhưng có thể có khác biệt đáng kể.';
    } else if (score === 2) {
      grade = 'low';
      label = '🟠 THẤP (LOW)';
      rationale = 'Độ tin cậy vào ước tính hiệu quả là hạn chế; hiệu quả thực sự có thể khác biệt đáng kể so với ước tính.';
    } else if (score === 1) {
      grade = 'very_low';
      label = '🔴 RẤT THẤP (VERY LOW)';
      rationale = 'Chúng tôi rất ít tự tin vào ước tính hiệu quả; hiệu quả thực sự có khả năng rất khác so với ước tính.';
    }

    return { grade, label, rationale };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. BỘ SINH BÁO CÁO PHÊ BÌNH NGHIÊN CỨU TỔNG HỢP (EBM CRITICAL APPRAISAL)
// ─────────────────────────────────────────────────────────────────────────────

export class EbmReportGenerator {
  public static generateMarkdownReport(report: EbmCriticalAppraisalReport): string {
    let md = `### 📋 BÁO CÁO PHÊ BÌNH NGHIÊN CỨU LÂM SÀNG (EBM CRITICAL APPRAISAL)\n\n`;
    md += `**Tên nghiên cứu / Guideline:** ${report.studyTitle}\n`;
    md += `**Thời gian phân tích:** ${report.generatedAt}\n\n`;

    md += `#### 1. CẤU TRÚC PICO:\n`;
    md += `- **P (Population / Bệnh nhân):** ${report.pico.p_population || 'N/A'}\n`;
    md += `- **I (Intervention / Can thiệp):** ${report.pico.i_intervention || 'N/A'}\n`;
    md += `- **C (Comparator / Đối chứng):** ${report.pico.c_comparator || 'N/A'}\n`;
    md += `- **O (Outcomes / Kết cục):** ${report.pico.o_outcomes || 'N/A'}\n\n`;

    if (report.statistics) {
      const s = report.statistics;
      md += `#### 2. HIỆU QUẢ LÂM SÀNG & THỐNG KÊ EBM:\n`;
      md += `- **Tỷ lệ biến cố can thiệp (EER):** ${(s.eer * 100).toFixed(2)}%\n`;
      md += `- **Tỷ lệ biến cố đối chứng (CER):** ${(s.cer * 100).toFixed(2)}%\n`;
      md += `- **Giảm nguy cơ tuyệt đối (ARR):** ${s.arrPercent.toFixed(2)}%\n`;
      md += `- **Giảm nguy cơ tương đối (RRR):** ${s.rrrPercent.toFixed(2)}%\n`;
      md += `- **Nguy cơ tương đối (RR):** ${s.rr.toFixed(2)} (95% CI: ${s.rrLower95.toFixed(2)} - ${s.rrUpper95.toFixed(2)})\n`;
      md += `- **Tỷ số chênh (OR):** ${s.or.toFixed(2)} (95% CI: ${s.orLower95.toFixed(2)} - ${s.orUpper95.toFixed(2)})\n`;
      if (s.nnt) md += `- **Số bệnh nhân cần điều trị (NNT):** ${s.nnt}\n`;
      if (s.nnh) md += `- **Số bệnh nhân gây hại (NNH):** ${s.nnh}\n`;
      md += `- **Biên giải ý nghĩa:** ${s.interpretation}\n\n`;
    }

    if (report.rob2) {
      const rob = report.rob2;
      md += `#### 3. ĐÁNH GIÁ NGUY CƠ SAI LỆCH (Cochrane RoB 2):\n`;
      md += `- Quá trình ngẫu nhiên hóa (D1): **${rob.d1_randomization.score.toUpperCase()}** (${rob.d1_randomization.note || 'Không có ghi chú'})\n`;
      md += `- Sai lệch can thiệp (D2): **${rob.d2_deviations.score.toUpperCase()}**\n`;
      md += `- Dữ liệu kết cục thiếu (D3): **${rob.d3_missing_data.score.toUpperCase()}**\n`;
      md += `- Đo lường kết cục (D4): **${rob.d4_measurement.score.toUpperCase()}**\n`;
      md += `- Báo cáo kết quả chọn lọc (D5): **${rob.d5_reporting.score.toUpperCase()}**\n`;
      md += `- **Tổng kết Risk of Bias:** **${rob.overall.toUpperCase()}** ➔ ${rob.summary}\n\n`;
    }

    if (report.grade) {
      const g = report.grade;
      md += `#### 4. PHÂN TẦNG CHẤT LƯỢNG BẰNG CHỨNG (GRADE):\n`;
      md += `- **Mức độ chất lượng bằng chứng:** ${g.gradeLabel}\n`;
      md += `- **Giải thích:** ${g.rationale}\n\n`;
    }

    md += `#### 5. KẾT LUẬN & ĐỀ XUẤT ÁP DỤNG LÂM SÀNG:\n`;
    md += `${report.clinicalBottomLine || 'Chưa có ghi chú kết luận lâm sàng.'}\n`;

    return md;
  }
}
