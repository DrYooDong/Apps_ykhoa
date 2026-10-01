import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bug,
  Calendar,
  Check,
  CheckCircle2,
  Compass,
  Edit3,
  Flame,
  Info,
  Layers,
  MapPin,
  Microscope,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Triangle,
  Zap,
} from 'lucide-react';
import { EpidemiologyContext, TrieuChung, VitalsState, LabsState } from '../../types.ts';

interface DiagnosticTrianglePanelProps {
  epiContext: EpidemiologyContext;
  onUpdateEpiContext: (epi: EpidemiologyContext) => void;
  selectedSymptoms: TrieuChung[];
  vitals?: VitalsState;
  labs?: LabsState;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const DiagnosticTrianglePanel: React.FC<DiagnosticTrianglePanelProps> = ({
  epiContext,
  onUpdateEpiContext,
  selectedSymptoms,
  vitals,
  labs,
  onOpenVaultDrawer,
}) => {
  const [editingEpi, setEditingEpi] = useState(false);
  const [activeTab, setActiveTab] = useState<'triangle' | 'causal-chain'>('triangle');
  const [selectedVertex, setSelectedVertex] = useState<'dth' | 'ls' | 'cls' | null>(null);

  // 1. Phân loại bằng chứng cho 3 Đỉnh Tam Giác
  // Đỉnh 1: Dịch tễ học (Epidemiology)
  const epiEvidence = useMemo(() => {
    const list: string[] = [];
    if (epiContext.outbreakAlert) list.push(`Ổ dịch: ${epiContext.outbreakAlert}`);
    if (epiContext.endemicArea) list.push(`Vùng dịch: ${epiContext.endemicArea}`);
    if (epiContext.vectorExposure) list.push(`Vector: ${epiContext.vectorExposure}`);
    if (epiContext.contactHistory) list.push(`Tiếp xúc: ${epiContext.contactHistory}`);
    if (epiContext.travelHistory) list.push(`Di chuyển: ${epiContext.travelHistory}`);
    if (epiContext.seasonalContext) list.push(`Mùa: ${epiContext.seasonalContext}`);
    if (epiContext.waterFoodRisk) list.push(`Nguồn nước/thực phẩm: ${epiContext.waterFoodRisk}`);
    return list;
  }, [epiContext]);

  // Đỉnh 2: Lâm sàng (Clinical Triad)
  const clinicalEvidence = useMemo(() => {
    return selectedSymptoms
      .filter((s) => !s.loai.includes('cls'))
      .map((s) => s.ten);
  }, [selectedSymptoms]);

  // Đỉnh 3: Cận lâm sàng & Dấu ấn sinh học (Paraclinical & Biomarkers)
  const labEvidence = useMemo(() => {
    const list: string[] = [];
    selectedSymptoms
      .filter((s) => s.loai.includes('cls'))
      .forEach((s) => list.push(s.ten));

    // Thêm các bất thường từ vitals/labs nếu có
    if (labs?.lHct && parseFloat(labs.lHct) >= 44) list.push(`Cô đặc máu (Hct ${labs.lHct}%)`);
    if (labs?.lTC && parseFloat(labs.lTC) <= 100) list.push(`Tiểu cầu giảm (${labs.lTC} G/L)`);
    if (labs?.lBC && (parseFloat(labs.lBC) >= 12 || parseFloat(labs.lBC) <= 4)) list.push(`Bạch cầu bất thường (${labs.lBC} G/L)`);
    if (labs?.lAST && parseFloat(labs.lAST) >= 200) list.push(`Men gan AST tăng (${labs.lAST} U/L)`);
    if (labs?.lLactate && parseFloat(labs.lLactate) >= 2.0) list.push(`Lactate máu tăng (${labs.lLactate} mmol/L)`);
    if (labs?.lTrop && parseFloat(labs.lTrop) > 0.05) list.push(`Troponin tăng (${labs.lTrop} ng/mL)`);

    return Array.from(new Set(list));
  }, [selectedSymptoms, labs]);

  // 2. Tính Điểm Đồng Thuận Tam Giác (Diagnostic Coherence Index - DCI %)
  const { dciScore, epiWeight, clinicalWeight, labWeight, coherenceLevel } = useMemo(() => {
    // Trọng số đỉnh dịch tễ: 0 - 30 điểm
    const eCount = epiEvidence.length;
    const eWeight = Math.min(30, eCount >= 3 ? 30 : eCount === 2 ? 22 : eCount === 1 ? 14 : 0);

    // Trọng số đỉnh lâm sàng: 0 - 35 điểm
    const cCount = clinicalEvidence.length;
    const cWeight = Math.min(35, cCount >= 4 ? 35 : cCount === 3 ? 28 : cCount >= 1 ? 18 : 0);

    // Trọng số đỉnh cận lâm sàng: 0 - 35 điểm
    const lCount = labEvidence.length;
    const lWeight = Math.min(35, lCount >= 3 ? 35 : lCount === 2 ? 26 : lCount === 1 ? 16 : 0);

    const total = eWeight + cWeight + lWeight;

    let level: 'high' | 'moderate' | 'low' = 'low';
    if (total >= 75 && eWeight > 0 && cWeight > 0 && lWeight > 0) {
      level = 'high';
    } else if (total >= 45) {
      level = 'moderate';
    }

    return {
      dciScore: Math.round(total),
      epiWeight: eWeight,
      clinicalWeight: cWeight,
      labWeight: lWeight,
      coherenceLevel: level,
    };
  }, [epiEvidence, clinicalEvidence, labEvidence]);

  // Tọa độ đỉnh động SVG cho tam giác biến dạng theo trọng số
  // Đỉnh 1: Dịch tễ (Top center): x=100, y = 20 + (30 - epiWeight) * 1.5
  // Đỉnh 2: Lâm sàng (Bottom-Left): x = 20 + (35 - clinicalWeight), y = 155
  // Đỉnh 3: Cận lâm sàng (Bottom-Right): x = 180 - (35 - labWeight), y = 155
  const polyPoints = useMemo(() => {
    const topY = 25 + Math.round((30 - epiWeight) * 1.4);
    const leftX = 25 + Math.round((35 - clinicalWeight) * 1.2);
    const rightX = 175 - Math.round((35 - labWeight) * 1.2);
    return `100,${topY} ${leftX},155 ${rightX},155`;
  }, [epiWeight, clinicalWeight, labWeight]);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Triangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
              Tam Giác Chẩn Đoán EBM
            </h2>
            <span className="text-[10.5px] text-slate-500 font-medium">
              Dịch tễ học · Lâm sàng · Cận lâm sàng
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono-custom border ${
              coherenceLevel === 'high'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : coherenceLevel === 'moderate'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            Đồng thuận {dciScore}%
          </span>
          <button
            type="button"
            onClick={() => setEditingEpi(!editingEpi)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
            title={editingEpi ? 'Đóng form nhập nhanh' : 'Bổ sung nhanh dữ kiện dịch tễ'}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs Chuyển Đổi: Tam giác trực quan vs Chuỗi lập luận mắt xích */}
      <div className="flex border-b border-slate-100 bg-slate-50/50 p-1 gap-1 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('triangle')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-colors cursor-pointer text-center ${
            activeTab === 'triangle'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Hình Thể Tam Giác
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('causal-chain')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-semibold transition-colors cursor-pointer text-center ${
            activeTab === 'causal-chain'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Chuỗi Lập Luận Mắt Xích
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {activeTab === 'triangle' ? (
          <>
            {/* Visual SVG Dynamic Radar Triangle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
              <div className="relative w-48 h-40 shrink-0">
                <svg viewBox="0 0 200 175" className="w-full h-full">
                  {/* Ideal reference triangle (dashed background) */}
                  <polygon
                    points="100,20 20,155 180,155"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />

                  {/* Active Dynamic Coherence Triangle */}
                  <polygon
                    points={polyPoints}
                    fill={
                      coherenceLevel === 'high'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : coherenceLevel === 'moderate'
                        ? 'rgba(2, 132, 199, 0.12)'
                        : 'rgba(245, 158, 11, 0.12)'
                    }
                    stroke={
                      coherenceLevel === 'high'
                        ? '#059669'
                        : coherenceLevel === 'moderate'
                        ? '#0284c7'
                        : '#d97706'
                    }
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />

                  {/* Đỉnh 1: Dịch tễ (Top) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedVertex(selectedVertex === 'dth' ? null : 'dth')}
                  >
                    <circle
                      cx="100"
                      cy="22"
                      r={selectedVertex === 'dth' ? '13' : '10'}
                      fill={epiWeight > 0 ? '#0284c7' : '#94a3b8'}
                      stroke={selectedVertex === 'dth' ? '#0369a1' : '#ffffff'}
                      strokeWidth={selectedVertex === 'dth' ? '3' : '2.5'}
                      className="transition-all"
                    />
                    <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      DTH
                    </text>
                  </g>

                  {/* Đỉnh 2: Lâm sàng (Left) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedVertex(selectedVertex === 'ls' ? null : 'ls')}
                  >
                    <circle
                      cx="22"
                      cy="155"
                      r={selectedVertex === 'ls' ? '13' : '10'}
                      fill={clinicalWeight > 0 ? '#059669' : '#94a3b8'}
                      stroke={selectedVertex === 'ls' ? '#047857' : '#ffffff'}
                      strokeWidth={selectedVertex === 'ls' ? '3' : '2.5'}
                      className="transition-all"
                    />
                    <text x="22" y="159" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      LS
                    </text>
                  </g>

                  {/* Đỉnh 3: Cận lâm sàng (Right) */}
                  <g
                    className="cursor-pointer group"
                    onClick={() => setSelectedVertex(selectedVertex === 'cls' ? null : 'cls')}
                  >
                    <circle
                      cx="178"
                      cy="155"
                      r={selectedVertex === 'cls' ? '13' : '10'}
                      fill={labWeight > 0 ? '#7c3aed' : '#94a3b8'}
                      stroke={selectedVertex === 'cls' ? '#6d28d9' : '#ffffff'}
                      strokeWidth={selectedVertex === 'cls' ? '3' : '2.5'}
                      className="transition-all"
                    />
                    <text x="178" y="159" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      CLS
                    </text>
                  </g>
                </svg>
              </div>

              {/* Status & Summary */}
              <div className="flex flex-col gap-2 text-xs flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    Trạng thái Hội tụ 3 Đỉnh:
                  </span>
                  <span className="text-[11px] text-slate-500 italic">
                    (Nhấp đỉnh DTH / LS / CLS để xem chi tiết)
                  </span>
                </div>
                {coherenceLevel === 'high' ? (
                  <p className="text-emerald-800 leading-relaxed">
                    <b>Hội tụ xuất sắc ({dciScore}%):</b> Có đầy đủ phơi nhiễm Dịch tễ, Hội chứng Lâm sàng rầm rộ và Cận lâm sàng củng cố. Chẩn đoán có độ tin cậy cực cao.
                  </p>
                ) : coherenceLevel === 'moderate' ? (
                  <p className="text-blue-800 leading-relaxed">
                    <b>Hội tụ khá ({dciScore}%):</b> Đang thiếu hoặc mờ nhạt ở một đỉnh (thường là Cận lâm sàng chuyên biệt hoặc thông tin Dịch tễ). Khuyến cáo khai thác thêm để tránh bỏ sót.
                  </p>
                ) : (
                  <p className="text-amber-800 leading-relaxed">
                    <b>Hội tụ yếu ({dciScore}%):</b> Chưa đủ bằng chứng 3 trục. Cần theo dõi diễn tiến lâm sàng và thực hiện xét nghiệm định hướng.
                  </p>
                )}

                <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-mono-custom text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedVertex(selectedVertex === 'dth' ? null : 'dth')}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedVertex === 'dth'
                        ? 'bg-blue-100 border-blue-400 ring-1 ring-blue-400'
                        : 'bg-blue-50/70 border-blue-200 hover:bg-blue-100/70'
                    }`}
                  >
                    <span className="text-[10px] text-blue-600 block">Dịch tễ (DTH)</span>
                    <b className="text-blue-950">{epiWeight}/30</b>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVertex(selectedVertex === 'ls' ? null : 'ls')}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedVertex === 'ls'
                        ? 'bg-emerald-100 border-emerald-400 ring-1 ring-emerald-400'
                        : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-100/70'
                    }`}
                  >
                    <span className="text-[10px] text-emerald-600 block">Lâm sàng (LS)</span>
                    <b className="text-emerald-950">{clinicalWeight}/35</b>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedVertex(selectedVertex === 'cls' ? null : 'cls')}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      selectedVertex === 'cls'
                        ? 'bg-purple-100 border-purple-400 ring-1 ring-purple-400'
                        : 'bg-purple-50/70 border-purple-200 hover:bg-purple-100/70'
                    }`}
                  >
                    <span className="text-[10px] text-purple-600 block">Cận LS (CLS)</span>
                    <b className="text-purple-950">{labWeight}/35</b>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Epidemiological Presets Bar */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700 block">
                Nạp nhanh bối cảnh dịch tễ phổ biến:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  {
                    label: 'Vùng dịch Dengue / Mùa mưa',
                    patch: { outbreakAlert: 'Sốt xuất huyết Dengue', vectorExposure: 'Muỗi vằn Aedes', seasonalContext: 'Mùa mưa' },
                  },
                  {
                    label: 'Tiếp xúc bệnh nhân Lao',
                    patch: { contactHistory: 'Tiếp xúc người ho kéo dài / bệnh nhân lao phổi', endemicArea: 'Khu vực có ca lao' },
                  },
                  {
                    label: 'Nước ngập lụt / Chuột (Leptospira)',
                    patch: { waterFoodRisk: 'Lội nước ngập lụt / bùn đất', vectorExposure: 'Nơi có nhiều chuột / gặm nhấm' },
                  },
                  {
                    label: 'Tiền sử xăm mình / Tiêm chích (HCV/HBV)',
                    patch: { vectorExposure: 'Tiền sử tiêm truyền / xăm trổ / nguy cơ phơi nhiễm máu', endemicArea: 'Vùng lưu hành HBV/HCV' },
                  },
                  {
                    label: 'Thời tiết lạnh / Ô nhiễm khói bụi (CAP)',
                    patch: { seasonalContext: 'Mùa đông lạnh', occupationalRisk: 'Khói bụi / Công trình xây dựng' },
                  },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onUpdateEpiContext({ ...epiContext, ...item.patch })}
                    className="px-2 py-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết bằng chứng tại 3 đỉnh */}
            <div className="space-y-2.5 text-xs">
              {/* Đỉnh 1: DTH */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  selectedVertex === 'dth'
                    ? 'border-blue-400 bg-blue-50/80 ring-2 ring-blue-400/30 shadow-xs'
                    : 'border-blue-200 bg-blue-50/30'
                } flex flex-col gap-1.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" />
                    <span>1. Yếu tố Dịch tễ & Cơ địa ({epiEvidence.length}):</span>
                  </span>
                  {selectedVertex === 'dth' && (
                    <span className="text-[10px] font-bold text-blue-700 uppercase bg-blue-100 px-1.5 py-0.5 rounded">
                      Đang lấy nét
                    </span>
                  )}
                </div>
                {epiEvidence.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {epiEvidence.map((e, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-blue-900 border border-blue-200 rounded text-[11px] shadow-2xs">
                        {e}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 italic">
                    <span>Chưa ghi nhận thông tin dịch tễ đặc biệt.</span>
                    <button
                      type="button"
                      onClick={() => setEditingEpi(true)}
                      className="text-blue-600 font-semibold hover:underline not-italic cursor-pointer"
                    >
                      + Khai thác ngay
                    </button>
                  </div>
                )}
              </div>

              {/* Đỉnh 2: Lâm sàng */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  selectedVertex === 'ls'
                    ? 'border-emerald-400 bg-emerald-50/80 ring-2 ring-emerald-400/30 shadow-xs'
                    : 'border-emerald-200 bg-emerald-50/30'
                } flex flex-col gap-1.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2. Hội chứng & Triệu chứng Lâm sàng ({clinicalEvidence.length}):</span>
                  </span>
                  {selectedVertex === 'ls' && (
                    <span className="text-[10px] font-bold text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded">
                      Đang lấy nét
                    </span>
                  )}
                </div>
                {clinicalEvidence.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {clinicalEvidence.slice(0, 8).map((c, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-emerald-900 border border-emerald-200 rounded text-[11px] shadow-2xs">
                        {c}
                      </span>
                    ))}
                    {clinicalEvidence.length > 8 && (
                      <span className="px-1.5 py-0.5 text-emerald-700 text-[10.5px]">
                        +{clinicalEvidence.length - 8} dấu hiệu khác
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-400 italic">Chưa ghi nhận triệu chứng lâm sàng.</span>
                )}
              </div>

              {/* Đỉnh 3: Cận lâm sàng */}
              <div
                className={`p-3 rounded-xl border transition-all ${
                  selectedVertex === 'cls'
                    ? 'border-purple-400 bg-purple-50/80 ring-2 ring-purple-400/30 shadow-xs'
                    : 'border-purple-200 bg-purple-50/30'
                } flex flex-col gap-1.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-950 flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5 text-purple-600" />
                    <span>3. Bằng chứng Cận lâm sàng & Biomarkers ({labEvidence.length}):</span>
                  </span>
                  {selectedVertex === 'cls' && (
                    <span className="text-[10px] font-bold text-purple-700 uppercase bg-purple-100 px-1.5 py-0.5 rounded">
                      Đang lấy nét
                    </span>
                  )}
                </div>
                {labEvidence.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {labEvidence.map((l, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white text-purple-900 border border-purple-200 rounded text-[11px] shadow-2xs">
                        {l}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <span className="font-semibold block">Khuyến cáo cận lâm sàng ưu tiên:</span>
                    <span>Cần chỉ định Tổng phân tích tế bào máu ngoại vi (WBC, Hct, PLT), Men gan AST/ALT, Creatinine và dấu ấn sinh học đặc hiệu.</span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Tab Chuỗi lập luận mắt xích 4 bước */
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              {/* Bước 1 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <div>
                  <b className="text-slate-900 block">Nguồn lây & Phơi nhiễm (Yếu tố Dịch tễ):</b>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {epiEvidence.length > 0
                      ? epiEvidence.join('; ')
                      : 'Chưa xác định nguồn lây trực tiếp hoặc ổ dịch lưu hành tại địa phương.'}
                  </p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 ml-2.5" />

              {/* Bước 2 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <div>
                  <b className="text-slate-900 block">Bệnh sinh & Biểu hiện Lâm sàng:</b>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {clinicalEvidence.length > 0
                      ? `Phản ứng bùng phát với các triệu chứng chỉ điểm: ${clinicalEvidence.slice(0, 5).join(', ')}.`
                      : 'Chưa ghi nhận hội chứng lâm sàng điển hình.'}
                  </p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 ml-2.5" />

              {/* Bước 3 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  3
                </span>
                <div>
                  <b className="text-slate-900 block">Dấu ấn Cận lâm sàng & Tổn thương cơ quan:</b>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    {labEvidence.length > 0
                      ? labEvidence.join(' · ')
                      : 'Đang chờ các xét nghiệm sinh hóa, huyết học và huyết thanh học khẳng định.'}
                  </p>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 ml-2.5" />

              {/* Bước 4 */}
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  4
                </span>
                <div>
                  <b className="text-slate-900 block">Định hướng Biện luận & Kết luận Chẩn đoán:</b>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    Tổng hợp 3 đỉnh tam giác cho phép loại trừ các chẩn đoán phân biệt thông thường, ưu tiên chẩn đoán hàng đầu và định tuyến điều trị giờ vàng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Edit Dịch tễ (Collapsible) */}
        {editingEpi && (
          <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl flex flex-col gap-2.5 animate-fadeIn">
            <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Bổ sung thông tin dịch tễ học:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Vùng dịch tễ / Nơi cư trú:
                </label>
                <input
                  type="text"
                  value={epiContext.endemicArea || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, endemicArea: e.target.value })}
                  placeholder="Vd: Đang sống tại vùng có ổ dịch Dengue / Sốt rét"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-md focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Tiếp xúc vector / Động vật:
                </label>
                <input
                  type="text"
                  value={epiContext.vectorExposure || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, vectorExposure: e.target.value })}
                  placeholder="Vd: Nhiều muỗi vằn đốt / Tiếp xúc chó mèo, gia súc"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-md focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Mùa dịch / Thời gian khởi phát:
                </label>
                <input
                  type="text"
                  value={epiContext.seasonalContext || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, seasonalContext: e.target.value })}
                  placeholder="Vd: Đang vào mùa mưa cao điểm tháng 8-10"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-md focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Tiền sử tiếp xúc người bệnh:
                </label>
                <input
                  type="text"
                  value={epiContext.contactHistory || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, contactHistory: e.target.value })}
                  placeholder="Vd: Người nhà cùng phòng trọ đang sốt xuất huyết"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded-md focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
