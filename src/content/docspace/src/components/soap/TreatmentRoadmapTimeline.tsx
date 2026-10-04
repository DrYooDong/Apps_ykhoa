import React, { useMemo } from 'react';
import {
  Activity,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Droplet,
  FileText,
  Flame,
  Milestone,
  Pill,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
} from 'lucide-react';
import {
  FormattedClinicalText,
  formatClinicalInline,
  sanitizeClinicalTypography,
} from './FormattedClinicalText.tsx';

interface TreatmentRoadmapTimelineProps {
  roadmapText?: string;
  className?: string;
}

interface StepperNode {
  title: string;
  speedOrAction?: string;
}

interface MilestoneSection {
  title: string;
  badge?: string;
  isCompleted?: boolean;
  isEmergency?: boolean;
  statusLines: string[];
  orderLines: string[];
  labLines: string[];
  takeawayLines: string[];
  generalLines: string[];
}

/**
 * Phân tích chuỗi sơ đồ dạng:
 * [GIỜ 0: VÀO SỐC] ——(15 ml/kg/h)——> [GIỜ 1: CẢI THIỆN] ...
 * hoặc:
 * [Khởi trị TDF 300mg] ──► [Tuần 4: Đánh giá an toàn] ──► ...
 */
function parseStepperFlow(text: string): { nodes: StepperNode[]; cleanedText: string } | null {
  // Tìm khối code block hoặc dòng chứa các ngoặc vuông kết nối bằng mũi tên
  const lines = text.split(/\r?\n/);
  let stepperLineIndex = -1;
  let rawStepper = '';

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (
      l.includes('[') &&
      l.includes(']') &&
      (l.includes('>') || l.includes('──►') || l.includes('➔') || l.includes('—>'))
    ) {
      stepperLineIndex = i;
      rawStepper = l.replace(/^`+|`+$/g, '').trim();
      break;
    }
  }

  if (stepperLineIndex === -1 || !rawStepper) return null;

  // Bóc tách các cặp [Title] và mũi tên nối
  // Regex bắt [Node] theo sau bởi text mũi tên
  const nodes: StepperNode[] = [];
  const regex = /\[([^\]]+)\](?:\s*(?:——\(?([^)]*)\)?——>|──►|->|➔|—>|--+>)\s*)?/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(rawStepper)) !== null) {
    const title = match[1].trim();
    const arrowLabel = match[2]?.trim() || '';
    nodes.push({
      title,
      speedOrAction: arrowLabel ? arrowLabel.replace(/^—+|—+$/g, '').trim() : undefined,
    });
  }

  if (nodes.length < 2) return null;

  // Loại bỏ dòng stepper khỏi text để phần timeline phía dưới không bị trùng
  const remainingLines = lines.filter((_, idx) => idx !== stepperLineIndex);
  // Đồng thời bỏ code block ``` nếu có
  const cleanedText = remainingLines
    .join('\n')
    .replace(/```\s*\n\s*```/g, '')
    .trim();

  return { nodes, cleanedText };
}

/**
 * Phân tích các mốc thời gian lâm sàng từ văn bản lộ trình
 */
function parseMilestones(text: string): MilestoneSection[] {
  const sanitized = sanitizeClinicalTypography(text);
  const lines = sanitized.split(/\r?\n/);
  const milestones: MilestoneSection[] = [];

  let current: MilestoneSection | null = null;

  const commitCurrent = () => {
    if (
      current &&
      (current.title ||
        current.statusLines.length > 0 ||
        current.orderLines.length > 0 ||
        current.generalLines.length > 0)
    ) {
      milestones.push(current);
    }
    current = null;
  };

  const isMilestoneHeader = (line: string): { title: string; badge?: string } | null => {
    const trimmed = line.trim().replace(/^[-*•#\s]+/, '');

    // Pattern 1: GIỜ 0 (...), GIỜ 1, GIỜ 2-3, GIỜ 6...
    const hourMatch = trimmed.match(
      /^(?:⏱️\s*)?(GIỜ\s*\d+(?:\s*[-–]\s*\d+)?(?:\s*\([^)]+\))?):?/i
    );
    if (hourMatch) {
      return {
        title: hourMatch[1],
        badge: hourMatch[1].toLowerCase().includes('ra sốc')
          ? 'Ra sốc'
          : hourMatch[1].toLowerCase().includes('tiếp nhận')
          ? 'Cấp cứu'
          : 'Mốc giờ',
      };
    }

    // Pattern 2: Giai đoạn 1: ..., Giai đoạn 2:...
    const phaseMatch = trimmed.match(
      /^(?:🗓️\s*)?(Giai đoạn\s*\d+(?:\s*[-–]\s*\d+)?\s*[:—]\s*[^(\n]+(?:\([^)]+\))?)/i
    );
    if (phaseMatch) {
      return {
        title: phaseMatch[1],
        badge: 'Giai đoạn',
      };
    }

    // Pattern 3: Tuần 4, Tuần 12, Tháng 6...
    const weekMatch = trimmed.match(
      /^(?:⏱️\s*)?((?:Tuần|Tháng)\s*\d+(?:\s*[-–&]\s*\d+)?(?:\s*[:—]\s*[^(\n]+)?(?:\([^)]+\))?)/i
    );
    if (weekMatch) {
      return {
        title: weekMatch[1],
        badge: 'Mốc thời gian',
      };
    }

    // Pattern 4: Tiêu chuẩn cân nhắc ngưng thuốc
    if (trimmed.toLowerCase().startsWith('tiêu chuẩn cân nhắc ngưng thuốc') || trimmed.toLowerCase().startsWith('tiêu chuẩn ngưng thuốc')) {
      return {
        title: trimmed,
        badge: 'Ngưng thuốc',
      };
    }

    return null;
  };

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;
    if (trimmed === '---' || trimmed === '***') continue;

    const header = isMilestoneHeader(trimmed);
    if (header) {
      commitCurrent();
      const lower = header.title.toLowerCase();
      current = {
        title: header.title,
        badge: header.badge,
        isCompleted: lower.includes('ra sốc') || lower.includes('hoàn toàn') || lower.includes('svr12'),
        isEmergency: lower.includes('giờ 0') || lower.includes('vào sốc') || lower.includes('tiếp nhận'),
        statusLines: [],
        orderLines: [],
        labLines: [],
        takeawayLines: [],
        generalLines: [],
      };
      continue;
    }

    if (!current) {
      // Dòng mở đầu hoặc ghi chú chưa vào mốc nào
      current = {
        title: 'Bối cảnh khởi trị & Nguyên tắc giám sát',
        badge: 'Khởi đầu',
        statusLines: [],
        orderLines: [],
        labLines: [],
        takeawayLines: [],
        generalLines: [],
      };
    }

    // Phân loại dòng nội dung
    const cleanContent = trimmed.replace(/^[-*•]\s*/, '');
    const lowerContent = cleanContent.toLowerCase();

    if (lowerContent.startsWith('tình trạng') || lowerContent.startsWith('sinh hiệu')) {
      current.statusLines.push(cleanContent);
    } else if (
      lowerContent.startsWith('y lệnh') ||
      lowerContent.startsWith('điều trị') ||
      lowerContent.startsWith('xử trí')
    ) {
      current.orderLines.push(cleanContent);
    } else if (
      lowerContent.startsWith('cls') ||
      lowerContent.startsWith('xét nghiệm') ||
      lowerContent.startsWith('định lượng') ||
      lowerContent.startsWith('tái khám')
    ) {
      current.labLines.push(cleanContent);
    } else if (
      lowerContent.startsWith('điểm đúc kết') ||
      lowerContent.startsWith('kết luận') ||
      lowerContent.startsWith('mục tiêu')
    ) {
      current.takeawayLines.push(cleanContent);
    } else {
      current.generalLines.push(cleanContent);
    }
  }

  commitCurrent();
  return milestones;
}

export const TreatmentRoadmapTimeline: React.FC<TreatmentRoadmapTimelineProps> = ({
  roadmapText,
  className = '',
}) => {
  if (!roadmapText || roadmapText.trim().length === 0) {
    return <span className="text-slate-400 italic">Chưa ghi nhận lộ trình điều trị</span>;
  }

  // 1. Trích xuất sơ đồ Stepper Flow nếu có
  const flowData = useMemo(() => parseStepperFlow(roadmapText), [roadmapText]);
  const textToParse = flowData ? flowData.cleanedText : roadmapText;

  // 2. Trích xuất các mốc Timeline chi tiết
  const milestones = useMemo(() => parseMilestones(textToParse), [textToParse]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* A. HORIZONTAL INTERACTIVE VISUAL STEPPER (NẾU CÓ CHUỖI SƠ ĐỒ) */}
      {flowData && flowData.nodes.length > 0 && (
        <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-2xl p-4 text-white shadow-md border border-teal-700/60 overflow-hidden">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-teal-700/40">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
              <span>Sơ Đồ Diễn Tiến Lâm Sàng Bậc Thang</span>
            </span>
            <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-teal-700/60 text-teal-100 font-semibold border border-teal-500/30">
              {flowData.nodes.length} Trạm mốc
            </span>
          </div>

          {/* Stepper Chain with Horizontal Scroll */}
          <div className="overflow-x-auto pb-1.5 scrollbar-thin">
            <div className="flex items-center gap-2 min-w-max">
              {flowData.nodes.map((node, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === flowData.nodes.length - 1;

                return (
                  <React.Fragment key={idx}>
                    {/* Node Card */}
                    <div
                      className={`flex flex-col gap-0.5 px-3 py-2 rounded-xl border transition-all shadow-sm ${
                        isLast
                          ? 'bg-emerald-600/90 border-emerald-400 text-white font-bold ring-2 ring-emerald-400/40'
                          : isFirst
                          ? 'bg-rose-950/80 border-rose-500/80 text-rose-100 font-semibold'
                          : 'bg-teal-950/70 border-teal-600/60 text-teal-100'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide opacity-80">
                        {isLast ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-200 shrink-0" />
                        ) : isFirst ? (
                          <Flame className="w-3 h-3 text-rose-400 shrink-0" />
                        ) : (
                          <Clock className="w-3 h-3 text-teal-300 shrink-0" />
                        )}
                        <span>{isLast ? 'Đích đến' : isFirst ? 'Khởi đầu' : `Mốc ${idx + 1}`}</span>
                      </div>
                      <div className="text-xs font-bold leading-tight">
                        {node.title}
                      </div>
                    </div>

                    {/* Connecting Arrow with Flow Speed Label */}
                    {!isLast && (
                      <div className="flex flex-col items-center justify-center px-1 text-center shrink-0">
                        {node.speedOrAction && (
                          <span className="text-[9.5px] font-mono-custom font-bold text-amber-300 bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-600/50 mb-0.5 whitespace-nowrap shadow-2xs">
                            {node.speedOrAction}
                          </span>
                        )}
                        <div className="flex items-center text-teal-400">
                          <span className="w-4 h-0.5 bg-teal-500/80 inline-block" />
                          <ArrowRight className="w-3.5 h-3.5 -ml-1 text-teal-300" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* B. VERTICAL CLINICAL TIMELINE FEED */}
      {milestones.length > 0 ? (
        <div className="relative pl-6 sm:pl-7 space-y-4 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-sky-400 before:to-emerald-500">
          {milestones.map((m, idx) => {
            const isLast = idx === milestones.length - 1;

            return (
              <div key={idx} className="relative group">
                {/* Timeline Icon Pin */}
                <div
                  className={`absolute -left-6 sm:-left-7 top-1 w-6 h-6 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm shrink-0 transition-transform group-hover:scale-110 ${
                    m.isCompleted
                      ? 'bg-emerald-600'
                      : m.isEmergency
                      ? 'bg-rose-600'
                      : 'bg-teal-600'
                  }`}
                >
                  {m.isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : m.isEmergency ? (
                    <Flame className="w-3.5 h-3.5" />
                  ) : (
                    <Clock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Milestone Content Box */}
                <div
                  className={`bg-white border rounded-2xl p-4 shadow-xs space-y-2.5 transition-all hover:shadow-sm ${
                    m.isCompleted
                      ? 'border-emerald-200/90 bg-emerald-50/20'
                      : m.isEmergency
                      ? 'border-rose-200/90 bg-rose-50/20'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 flex-wrap pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{formatClinicalInline(m.title)}</span>
                    </span>
                    {m.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          m.isCompleted
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : m.isEmergency
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-teal-100 text-teal-800 border border-teal-200'
                        }`}
                      >
                        {m.badge}
                      </span>
                    )}
                  </div>

                  {/* 1. Tình trạng lâm sàng (Status) */}
                  {m.statusLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800">
                        <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                        <span>Tình trạng lâm sàng &amp; Sinh hiệu:</span>
                      </div>
                      <div className="text-xs text-slate-700 pl-5 leading-relaxed space-y-1">
                        {m.statusLines.map((line, lIdx) => (
                          <div key={lIdx}>{formatClinicalInline(line)}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. Y lệnh & Điều trị can thiệp (Orders) */}
                  {m.orderLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-teal-950">
                        <Droplet className="w-3.5 h-3.5 text-teal-600" />
                        <span>Y lệnh &amp; Hành động xử trí:</span>
                      </div>
                      <div className="text-xs text-teal-950 pl-5 leading-relaxed space-y-1 font-medium">
                        {m.orderLines.map((line, lIdx) => (
                          <div key={lIdx}>{formatClinicalInline(line)}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Xét nghiệm CLS & Giám sát (Labs) */}
                  {m.labLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-200/70 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-950">
                        <Activity className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Chỉ tiêu CLS &amp; Giám sát:</span>
                      </div>
                      <div className="text-xs text-indigo-950 pl-5 leading-relaxed space-y-1">
                        {m.labLines.map((line, lIdx) => (
                          <div key={lIdx}>{formatClinicalInline(line)}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Đúc kết mốc then chốt (Takeaway) */}
                  {m.takeawayLines.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300/80 space-y-1 shadow-2xs">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-950">
                        <Award className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cột mốc kết quả đạt được:</span>
                      </div>
                      <div className="text-xs text-emerald-900 pl-5 leading-relaxed font-semibold">
                        {m.takeawayLines.map((line, lIdx) => (
                          <div key={lIdx}>{formatClinicalInline(line)}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Các dòng chung khác */}
                  {m.generalLines.length > 0 && (
                    <div className="text-xs text-slate-700 space-y-1 pt-0.5">
                      {m.generalLines.map((line, lIdx) => (
                        <div key={lIdx} className="leading-relaxed">
                          {formatClinicalInline(line)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback nếu không bóc tách được mốc */
        <div className="bg-teal-50/40 p-3.5 rounded-2xl border border-teal-200 shadow-2xs">
          <FormattedClinicalText text={textToParse} bulletColor="emerald" />
        </div>
      )}
    </div>
  );
};
