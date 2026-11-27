/**
 * DocSpace v2 — Offline Information Gain & Cognitive Debiasing Advisor
 * Tính toán hoàn toàn offline các câu hỏi lâm sàng & CLS phân định mạnh nhất giữa Top 1 và Top 2,
 * đồng thời sinh hộp kiểm chống thiên kiến nhận thức (Cognitive Debiasing).
 */

import { AnalysisResult, ClinicalFormState } from '../types.ts';
import {
  CognitiveBiasCheckItem,
  DiscriminatingPrompt,
  InfoGainReport,
  TriageSummaryV2,
} from '../schemas/docspaceV2.ts';

const ROLE_WEIGHT_BONUS: Record<string, number> = {
  dt: 2.5,
  loaitru: 2.0,
  gy: 1.4,
  ht: 0.8,
};

function classifySymptomPromptCategory(loai: string[]): 'question' | 'exam' | 'lab' {
  if (loai.includes('cls')) return 'lab';
  if (loai.includes('tt') && !loai.includes('cn')) return 'exam';
  return 'question';
}

export function buildInfoGainReport(
  results: AnalysisResult[],
  form: ClinicalFormState,
  triage: TriageSummaryV2
): InfoGainReport {
  if (results.length === 0) {
    return {
      top1Name: 'Chưa có chẩn đoán dẫn đầu',
      top2Name: null,
      nextBestQuestions: [],
      nextBestTests: [],
      debiasingChecklist: buildDebiasingChecklist(results, form, triage),
    };
  }

  const top1 = results[0];
  const top2 = results[1] ?? null;

  const top1FeatureIds = new Set(top1.b.dd.map((d) => d[0]));
  const top2FeatureIds = new Set(top2 ? top2.b.dd.map((d) => d[0]) : []);

  const candidates: DiscriminatingPrompt[] = [];
  const seenIds = new Set<string>();

  const collectMissingFrom = (
    target: AnalysisResult,
    opponentIds: Set<string>,
    opponentName: string | null
  ) => {
    for (const m of target.missing) {
      if (seenIds.has(m.tc.id)) continue;
      seenIds.add(m.tc.id);

      const isExclusive = !opponentIds.has(m.tc.id);
      const roleBonus = ROLE_WEIGHT_BONUS[m.role] ?? 1;
      const discriminatingWeight = Number((m.w * roleBonus * (isExclusive ? 1.6 : 0.9)).toFixed(2));
      const category = classifySymptomPromptCategory(m.tc.loai);

      const rationale =
        isExclusive && opponentName
          ? `Đặc hiệu giúp củng cố "${target.b.ten}" và tách bạch với "${opponentName}"`
          : `Tiêu chuẩn ${m.role === 'dt' ? 'đặc trưng' : 'gợi ý'} quan trọng còn thiếu của "${target.b.ten}"`;

      candidates.push({
        symptomId: m.tc.id,
        label: m.tc.ten,
        category,
        favorsDiseaseName: target.b.ten,
        favorsDiseaseId: target.b.id,
        discriminatingWeight,
        rationale,
      });
    }
  };

  collectMissingFrom(top1, top2FeatureIds, top2?.b.ten ?? null);
  if (top2) {
    collectMissingFrom(top2, top1FeatureIds, top1.b.ten);
  }

  candidates.sort((a, b) => b.discriminatingWeight - a.discriminatingWeight);

  const nextBestQuestions = candidates
    .filter((c) => c.category === 'question' || c.category === 'exam')
    .slice(0, 4);

  const nextBestTests = candidates.filter((c) => c.category === 'lab').slice(0, 4);

  return {
    top1Name: top1.b.ten,
    top2Name: top2?.b.ten ?? null,
    nextBestQuestions,
    nextBestTests,
    debiasingChecklist: buildDebiasingChecklist(results, form, triage),
  };
}

function buildDebiasingChecklist(
  results: AnalysisResult[],
  form: ClinicalFormState,
  triage: TriageSummaryV2
): CognitiveBiasCheckItem[] {
  const top1 = results[0];
  const top2 = results[1];
  const criticalRunnerUp = results.slice(1, 5).find((r) => r.b.baoDong || r.isCriticalSafetyNet);

  const items: CognitiveBiasCheckItem[] = [
    {
      id: 'bias_anchoring',
      biasName: 'Thiên kiến Neo bám (Anchoring Bias)',
      biasType: 'anchoring',
      prompt: 'Tôi đã kiểm tra lại toàn bộ dấu hiệu thực thể/CLS thay vì chỉ bám vào lý do vào viện ban đầu?',
      contextualWarning: form.lyDo
        ? `Lý do vào viện "${form.lyDo}" có thể che khuất bệnh lý khác cùng triệu chứng.`
        : 'Đừng để chẩn đoán tuyến trước hoặc than phiền đầu tiên khóa cứng hướng suy luận.',
    },
    {
      id: 'bias_premature_closure',
      biasName: 'Đóng chẩn đoán sớm (Premature Closure)',
      biasType: 'premature_closure',
      prompt: top2
        ? `Tôi đã có bằng chứng đủ mạnh để loại trừ "${top2.b.ten}" (${top2.pct}%) chưa?`
        : 'Tôi đã liệt kê ít nhất 2 chẩn đoán phân biệt hợp lý cho hội chứng chính chưa?',
      contextualWarning:
        top1 && top2 && Math.abs(top1.pct - top2.pct) <= 15
          ? `Khoảng cách xác suất giữa Top 1 (${top1.pct}%) và Top 2 (${top2.pct}%) đang rất hẹp — tuyệt đối không chốt sớm.`
          : 'Luôn tự hỏi: "Nếu chẩn đoán số 1 sai, bệnh nguy hiểm nhất có thể là gì?"',
    },
    {
      id: 'bias_red_flag',
      biasName: 'Bỏ sót Cờ Đỏ (Must-Not-Miss Check)',
      biasType: 'red_flag_blindness',
      prompt: criticalRunnerUp
        ? `Tôi đã loại trừ bệnh nguy kịch "${criticalRunnerUp.b.ten}" chưa?`
        : 'Tôi đã rà soát sinh hiệu, dấu hiệu sốc và các bệnh cấp cứu đe dọa tính mạng chưa?',
      contextualWarning:
        triage.redFlags.length > 0
          ? `Đang có ${triage.redFlags.length} cờ đỏ sinh hiệu/CLS cần xử trí song song với việc tìm nguyên nhân.`
          : 'Ngay cả khi sinh hiệu tạm ổn, cần đánh giá xu hướng diễn tiến trong 6–24 giờ tới.',
    },
  ];

  return items;
}
