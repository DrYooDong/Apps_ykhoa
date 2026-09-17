import React, { useState, useMemo } from 'react';
import {
  Microscope,
  FlaskConical,
  Filter,
  Check,
  Copy,
} from 'lucide-react';
import { AnalysisResult } from '../../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../../data/diagnostic-criteria-database.ts';
import {
  shortenClinicalText,
  formatLabThreshold,
} from '../../lib/clinicalTextFormatter.ts';

interface TargetedDiagnosticWorkupProps {
  topResult: AnalysisResult;
  results: AnalysisResult[];
  activeChain?: DiseaseReactionChainDefinition;
}

export const TargetedDiagnosticWorkup: React.FC<TargetedDiagnosticWorkupProps> = ({
  topResult,
  results,
  activeChain,
}) => {
  const [copiedLabWorkup, setCopiedLabWorkup] = useState(false);

  // Compute targeted workup labs
  const targetedLabWorkup = useMemo(() => {
    if (!topResult) return { primaryLabs: [], differentialLabs: [] };

    // 1. Xét nghiệm cho Chẩn đoán sơ bộ (top)
    const primaryLabs: Array<{
      id: string;
      name: string;
      purpose: string;
      threshold?: string;
      priority: 'stat' | 'urgent' | 'routine';
      category: string;
    }> = [];

    // Lấy các tiêu chuẩn CLS/CĐHA từ chuỗi
    if (activeChain?.criteria) {
      activeChain.criteria
        .filter((c) => c.type === 'lab' || c.type === 'imaging')
        .forEach((crit) => {
          primaryLabs.push({
            id: `crit_${crit.id}`,
            name: shortenClinicalText(crit.label),
            purpose: crit.type === 'lab' ? 'Khẳng định tiêu chuẩn cận lâm sàng' : 'CĐHA đánh giá tổn thương tạng',
            threshold: formatLabThreshold(crit.labThreshold),
            priority: activeChain.severity === 'emergency' ? 'stat' : 'urgent',
            category: crit.type === 'imaging' ? 'CĐHA' : 'Sinh hóa / Vi sinh',
          });
        });
    }

    // Lấy các missing CLS từ topResult.missing
    topResult.missing
      .filter((m) => m.tc.nhom === 'Cận lâm sàng')
      .forEach((m) => {
        const shortenedName = shortenClinicalText(m.tc.ten);
        const exists = primaryLabs.some(
          (l) => l.name.toLowerCase().includes(shortenedName.toLowerCase()) || shortenedName.toLowerCase().includes(l.name.toLowerCase())
        );
        if (!exists) {
          primaryLabs.push({
            id: `tc_${m.tc.id}`,
            name: shortenedName,
            purpose: `Bổ sung dữ kiện (+${m.w} điểm CDSS)`,
            priority: m.w >= 3 ? 'stat' : 'routine',
            category: 'Xét nghiệm bổ trợ',
          });
        }
      });

    // Lấy các monitoringLabs quan trọng
    if (activeChain?.monitoringLabs) {
      activeChain.monitoringLabs.slice(0, 3).forEach((lab, idx) => {
        const shortened = shortenClinicalText(lab);
        const exists = primaryLabs.some((l) => l.name.toLowerCase().includes(shortened.toLowerCase()));
        if (!exists) {
          primaryLabs.push({
            id: `mon_${idx}`,
            name: shortened,
            purpose: 'Theo dõi động học & giám sát biến chứng',
            priority: 'routine',
            category: 'Theo dõi động học',
          });
        }
      });
    }

    // 2. Xét nghiệm cho Chẩn đoán phân biệt (results[1..3])
    const differentialLabs: Array<{
      diseaseId: string;
      diseaseName: string;
      pct: number;
      testName: string;
      rationale: string;
    }> = [];

    results.slice(1, 4).forEach((diff) => {
      const diffChain = DIAGNOSTIC_CHAIN_DATABASE[diff.b.id];
      let testName = '';
      let rationale = '';

      if (diffChain?.goldStandard) {
        testName = shortenClinicalText(diffChain.goldStandard);
        rationale = `Tiêu chuẩn vàng xác định / loại trừ ${diff.b.ten}`;
      } else {
        const diffLabMissing = diff.missing.find((m) => m.tc.nhom === 'Cận lâm sàng' && m.w >= 2);
        if (diffLabMissing) {
          testName = shortenClinicalText(diffLabMissing.tc.ten);
          rationale = `Bằng chứng đặc hiệu quan trọng (+${diffLabMissing.w} CDSS) giúp chẩn đoán phân biệt`;
        } else {
          testName = `Xét nghiệm đặc hiệu chuyên khoa ${diff.b.ten}`;
          rationale = `Đối chiếu phân biệt lâm sàng (khớp ${diff.pct}%)`;
        }
      }

      differentialLabs.push({
        diseaseId: diff.b.id,
        diseaseName: diff.b.ten,
        pct: diff.pct,
        testName,
        rationale,
      });
    });

    return { primaryLabs, differentialLabs };
  }, [activeChain, topResult, results]);

  const handleCopyLabWorkup = () => {
    let text = `Y LỆNH CẬN LÂM SÀNG ĐỀ NGHỊ (THEO CDSS VÀ EVIDENCE-BASED PROTOCOL):\n`;
    text += `Bệnh nhân nghi ngờ: ${topResult.b.ten} (ICD: ${topResult.b.icd})\n\n`;

    if (targetedLabWorkup.primaryLabs.length > 0) {
      text += `--- 1. XÉT NGHIỆM KHẲNG ĐỊNH & PHÂN ĐỘ ---\n`;
      targetedLabWorkup.primaryLabs.forEach((l, i) => {
        text += `${i + 1}. [${l.priority === 'stat' ? 'KHẨN' : 'THƯỜNG'}] ${l.name} - Mục đích: ${l.purpose}${l.threshold ? ` (Ngưỡng: ${l.threshold})` : ''}\n`;
      });
      text += `\n`;
    }

    if (targetedLabWorkup.differentialLabs.length > 0) {
      text += `--- 2. XÉT NGHIỆM PHÂN BIỆT / LOẠI TRỪ ---\n`;
      targetedLabWorkup.differentialLabs.forEach((d, i) => {
        text += `${i + 1}. ${d.testName} (Phân biệt với: ${d.diseaseName} - Lý do: ${d.rationale})\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopiedLabWorkup(true);
    setTimeout(() => setCopiedLabWorkup(false), 2500);
  };

  return (
    <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
        <div>
          <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Microscope className="w-4 h-4 text-blue-600" />
            <span>Chiến Lược Đề Nghị Cận Lâm Sàng (Targeted Diagnostic Workup)</span>
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Gợi ý chỉ định dựa trên dữ kiện còn thiếu giúp hoàn thiện tiêu chuẩn chẩn đoán sơ bộ và phân biệt các bệnh cạnh tranh.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleCopyLabWorkup}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Sao chép toàn bộ danh mục xét nghiệm đề nghị vào bộ nhớ tạm"
          >
            {copiedLabWorkup ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã sao chép Y lệnh!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-600" />
                <span>Sao chép Y lệnh CLS</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-2 gap-3.5">
        {/* Cột 1: Xét nghiệm hoàn thiện & Khẳng định Chẩn đoán sơ bộ */}
        <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-200/80 flex flex-col justify-between gap-2.5">
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-blue-200/60">
              <span className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Khẳng định Chẩn đoán sơ bộ: «{topResult.b.ten}»</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                {targetedLabWorkup.primaryLabs.length} Chỉ định
              </span>
            </div>

            {targetedLabWorkup.primaryLabs.length > 0 ? (
              <div className="space-y-1.5">
                {targetedLabWorkup.primaryLabs.map((lab) => (
                  <div
                    key={lab.id}
                    className="p-2 bg-white rounded-md border border-blue-100/90 text-xs flex flex-col gap-1 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase tracking-wide ${
                            lab.priority === 'stat'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {lab.priority === 'stat' ? '⚡ Khẩn cấp' : 'Thường quy'}
                        </span>
                        <span className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
                          {lab.name}
                        </span>
                      </div>
                      {lab.threshold && (
                        <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-mono-custom font-semibold shrink-0">
                          {lab.threshold}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-600 flex items-center gap-1">
                      <span className="text-blue-600">◈</span>
                      <span><b>Mục đích:</b> {lab.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200">
                ✓ Đã đủ dữ kiện cận lâm sàng cần thiết cho chẩn đoán sơ bộ hiện tại.
              </div>
            )}
          </div>

          <div className="text-[10.5px] text-slate-500 italic pt-1 border-t border-blue-100/80">
            Ghi chú: Ưu tiên thực hiện ngay các xét nghiệm có gắn nhãn <b>⚡ Khẩn cấp</b> trước khi bắt đầu phác đồ.
          </div>
        </div>

        {/* Cột 2: Xét nghiệm Phân biệt & Loại trừ các bệnh cạnh tranh */}
        <div className="p-3 rounded-lg bg-amber-50/40 border border-amber-200/80 flex flex-col justify-between gap-2.5">
          <div>
            <div className="flex items-center justify-between gap-1.5 mb-2 pb-1.5 border-b border-amber-200/60">
              <span className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-amber-600" />
                <span>2. Phân biệt &amp; Loại trừ {targetedLabWorkup.differentialLabs.length} Bệnh Cạnh Tranh</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                Đối soát EBM
              </span>
            </div>

            {targetedLabWorkup.differentialLabs.length > 0 ? (
              <div className="space-y-1.5">
                {targetedLabWorkup.differentialLabs.map((diff) => (
                  <div
                    key={diff.diseaseId}
                    className="p-2 bg-white rounded-md border border-amber-100/90 text-xs flex flex-col gap-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                          {diff.pct}% phù hợp
                        </span>
                        <span className="font-bold text-slate-800 text-xs sm:text-[12px]">
                          Phân biệt «{diff.diseaseName}»
                        </span>
                      </div>
                    </div>

                    <div className="text-[11.5px] text-slate-700 font-medium pl-1 border-l-2 border-amber-400">
                      <span className="text-amber-900 font-bold">Chỉ định đề nghị: </span>
                      <span className="text-blue-900 font-semibold">{diff.testName}</span>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      <b>Lý do:</b> {diff.rationale}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 rounded-md border border-slate-200">
                Chưa ghi nhận bệnh cảnh phân biệt nổi bật cần chỉ định xét nghiệm loại trừ thêm.
              </div>
            )}
          </div>

          <div className="text-[10.5px] text-slate-500 italic pt-1 border-t border-amber-100/80">
            Các chỉ định giúp bác sĩ bảo đảm tính pháp lý và không bỏ sót các bệnh truyền nhiễm / cấp cứu tương tự.
          </div>
        </div>
      </div>
    </div>
  );
};
