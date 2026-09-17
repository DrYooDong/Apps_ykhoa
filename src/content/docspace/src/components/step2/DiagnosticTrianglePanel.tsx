import React, { useState } from 'react';
import {
  BookOpen,
  Bug,
  Calendar,
  Compass,
  Edit3,
  Flame,
  Info,
  Layers,
  MapPin,
  Microscope,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Triangle,
  Zap,
} from 'lucide-react';
import { EpidemiologyContext, TrieuChung } from '../../types.ts';

interface DiagnosticTrianglePanelProps {
  epiContext: EpidemiologyContext;
  onUpdateEpiContext: (epi: EpidemiologyContext) => void;
  selectedSymptoms: TrieuChung[];
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const DiagnosticTrianglePanel: React.FC<DiagnosticTrianglePanelProps> = ({
  epiContext,
  onUpdateEpiContext,
  selectedSymptoms,
  onOpenVaultDrawer,
}) => {
  const [editingEpi, setEditingEpi] = useState(false);

  // Analyze evidence for 3 apexes of the diagnostic triangle
  const clinicalSigns = selectedSymptoms.filter((s) => s.loai.includes('cn') || s.loai.includes('tt'));
  const labSigns = selectedSymptoms.filter((s) => s.loai.includes('cls'));

  const hasEpi = Boolean(
    epiContext.contactHistory ||
      epiContext.travelHistory ||
      epiContext.endemicArea ||
      epiContext.seasonalContext ||
      epiContext.vectorExposure
  );
  const hasClinical = clinicalSigns.length > 0;
  const hasLab = labSigns.length > 0;

  const triangleScore = [hasEpi, hasClinical, hasLab].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Triangle className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-800 leading-none">
              Tam giác chẩn đoán Truyền nhiễm
            </h2>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Dịch tễ học · Lâm sàng · Cận lâm sàng
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold font-mono-custom ${
              triangleScore === 3
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : triangleScore === 2
                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {triangleScore}/3 Đỉnh hội tụ
          </span>
          <button
            type="button"
            onClick={() => setEditingEpi(!editingEpi)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs"
            title={editingEpi ? 'Đóng nhập nhanh dịch tễ' : 'Bổ sung thông tin dịch tễ học'}
            aria-label="Bổ sung dịch tễ"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* SVG Triangle Visualizer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-slate-50/60 rounded-xl border border-slate-200/60">
          <div className="relative w-48 h-40 shrink-0">
            <svg viewBox="0 0 200 170" className="w-full h-full drop-shadow-xs">
              {/* Triangle path */}
              <polygon
                points="100,20 20,150 180,150"
                fill={triangleScore === 3 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(2, 132, 199, 0.05)'}
                stroke={triangleScore === 3 ? '#10b981' : '#0284c7'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Node 1: Dịch tễ (Top) */}
              <circle
                cx="100"
                cy="20"
                r="12"
                fill={hasEpi ? '#0284c7' : '#94a3b8'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="100" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                1
              </text>

              {/* Node 2: Lâm sàng (Bottom-Left) */}
              <circle
                cx="20"
                cy="150"
                r="12"
                fill={hasClinical ? '#10b981' : '#94a3b8'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="20" y="154" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                2
              </text>

              {/* Node 3: Cận lâm sàng (Bottom-Right) */}
              <circle
                cx="180"
                cy="150"
                r="12"
                fill={hasLab ? '#8b5cf6' : '#94a3b8'}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x="180" y="154" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                3
              </text>
            </svg>
          </div>

          <div className="flex flex-col gap-1.5 text-xs">
            <span className="font-bold text-slate-800 text-sm">
              Định hướng Biện luận theo Tam giác:
            </span>
            {triangleScore === 3 ? (
              <p className="text-emerald-700 font-medium">
                ✅ <b>Hội tụ hoàn hảo 3/3 đỉnh:</b> Bệnh cảnh có đầy đủ Yếu tố Dịch tễ, Hội chứng Lâm sàng và Bằng chứng Cận lâm sàng khẳng định. Có giá trị xác lập chẩn đoán cao nhất.
              </p>
            ) : triangleScore === 2 ? (
              <p className="text-blue-700 font-medium">
                ℹ️ <b>Hội tụ 2/3 đỉnh:</b> Khuyến cáo khai thác thêm đỉnh còn thiếu để xác định chẩn đoán hoặc tiến hành điều trị bao vây theo kinh nghiệm (Empirical treatment).
              </p>
            ) : (
              <p className="text-amber-700 font-medium">
                ⚠️ <b>Mới có 1/3 đỉnh:</b> Cần tiếp tục theo dõi sát diễn tiến lâm sàng và thực hiện thêm các xét nghiệm định hướng vi sinh/huyết học.
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CD')}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                <span>Tra cứu phác đồ bệnh học tại Kho Chẩn đoán</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Input Panel: Bổ sung nhanh yếu tố dịch tễ */}
        {editingEpi && (
          <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg flex flex-col gap-2.5 animate-fadeIn">
            <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Bổ sung thông tin dịch tễ học:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  Vùng dịch tễ / Nơi cư trú:
                </label>
                <input
                  type="text"
                  value={epiContext.endemicArea || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, endemicArea: e.target.value })}
                  placeholder="Vd: Đang sống tại vùng có ổ dịch Dengue / Sốt rét"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mb-1">
                  <Bug className="w-3 h-3 text-amber-500" />
                  Tiếp xúc vector / Động vật:
                </label>
                <input
                  type="text"
                  value={epiContext.vectorExposure || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, vectorExposure: e.target.value })}
                  placeholder="Vd: Nhiều muỗi vằn đốt / Tiếp xúc chó mèo, gia súc"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3 text-cyan-500" />
                  Mùa dịch / Thời gian khởi phát:
                </label>
                <input
                  type="text"
                  value={epiContext.seasonalContext || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, seasonalContext: e.target.value })}
                  placeholder="Vd: Mùa mưa (tháng 6-11) / Bệnh khởi phát cấp 3 ngày"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 flex items-center gap-1 mb-1">
                  <Info className="w-3 h-3 text-purple-500" />
                  Tiền sử tiếp xúc người bệnh:
                </label>
                <input
                  type="text"
                  value={epiContext.contactHistory || ''}
                  onChange={(e) => onUpdateEpiContext({ ...epiContext, contactHistory: e.target.value })}
                  placeholder="Vd: Trong gia đình hoặc cơ quan có người bị sốt tương tự"
                  className="w-full text-xs p-1.5 bg-white border border-slate-200 rounded focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3 Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Apex 1: Dịch tễ */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Đỉnh 1: Dịch tễ học
              </span>
              <span className={`w-2 h-2 rounded-full ${hasEpi ? 'bg-blue-600' : 'bg-slate-300'}`} />
            </div>
            {hasEpi ? (
              <ul className="text-[11px] text-slate-700 flex flex-col gap-0.5 list-disc pl-3.5">
                {epiContext.endemicArea && <li>{epiContext.endemicArea}</li>}
                {epiContext.vectorExposure && <li>{epiContext.vectorExposure}</li>}
                {epiContext.seasonalContext && <li>{epiContext.seasonalContext}</li>}
                {epiContext.contactHistory && <li>{epiContext.contactHistory}</li>}
              </ul>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Chưa ghi nhận yếu tố dịch tễ rõ ràng.</p>
            )}
          </div>

          {/* Apex 2: Lâm sàng */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                Đỉnh 2: Lâm sàng ({clinicalSigns.length})
              </span>
              <span className={`w-2 h-2 rounded-full ${hasClinical ? 'bg-emerald-600' : 'bg-slate-300'}`} />
            </div>
            {hasClinical ? (
              <div className="flex flex-wrap gap-1">
                {clinicalSigns.slice(0, 6).map((s) => (
                  <span key={s.id} className="px-1.5 py-0.2 rounded text-[10.5px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {s.ten}
                  </span>
                ))}
                {clinicalSigns.length > 6 && (
                  <span className="text-[10px] text-slate-400 font-mono-custom self-center">
                    +{clinicalSigns.length - 6} khác
                  </span>
                )}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Chưa có triệu chứng cơ năng/thực thể.</p>
            )}
          </div>

          {/* Apex 3: Cận lâm sàng */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1">
                <Microscope className="w-3.5 h-3.5 text-purple-600" />
                Đỉnh 3: Cận lâm sàng ({labSigns.length})
              </span>
              <span className={`w-2 h-2 rounded-full ${hasLab ? 'bg-purple-600' : 'bg-slate-300'}`} />
            </div>
            {hasLab ? (
              <div className="flex flex-wrap gap-1">
                {labSigns.map((s) => (
                  <span key={s.id} className="px-1.5 py-0.2 rounded text-[10.5px] bg-purple-50 text-purple-800 border border-purple-200 font-mono-custom font-medium">
                    {s.ten}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">Chưa ghi nhận cận lâm sàng bất thường.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
