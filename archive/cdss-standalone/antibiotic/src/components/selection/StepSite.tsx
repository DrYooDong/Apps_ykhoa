import React from 'react';
import { 
  User, 
  Baby, 
  Stethoscope, 
  Droplet, 
  HeartHandshake, 
  Flame, 
  Brain, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { SourceBadge } from './SourceBadge';
import { Population, InfectionSite, SepsisSource } from '../../selection/types';

interface StepSiteProps {
  population: Population;
  onSelectPopulation: (pop: Population) => void;
  site: InfectionSite;
  onSelectSite: (site: InfectionSite) => void;
  sepsisSource?: SepsisSource;
  onSelectSepsisSource: (src: SepsisSource) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
}

export const StepSite: React.FC<StepSiteProps> = ({
  population,
  onSelectPopulation,
  site,
  onSelectSite,
  sepsisSource,
  onSelectSepsisSource,
  onNextStep,
  onPrevStep
}) => {
  const sitesList: Array<{
    id: InfectionSite;
    titleVi: string;
    descVi: string;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'respiratory',
      titleVi: 'Hô hấp (Viêm phổi)',
      descVi: 'Viêm phổi cộng đồng (CAP), Viêm phổi bệnh viện (HAP), Viêm phổi thở máy (VAP)',
      icon: <Stethoscope className="w-5 h-5 text-blue-600" />,
      color: 'hover:border-blue-300'
    },
    {
      id: 'sepsis',
      titleVi: 'Nhiễm khuẩn huyết (Sepsis)',
      descVi: 'Sepsis, Sốc nhiễm khuẩn, nhiễm khuẩn huyết chưa rõ hoặc đã rõ ngõ vào',
      icon: <Droplet className="w-5 h-5 text-rose-600" />,
      color: 'hover:border-rose-300'
    },
    {
      id: 'skin_soft_tissue',
      titleVi: 'Da & Mô mềm (SSTI)',
      descVi: 'Viêm mô tế bào, loét tì đè nhiễm trùng, nhọt, áp xe mô dưới da',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      color: 'hover:border-amber-300'
    },
    {
      id: 'urinary',
      titleVi: 'Đường Tiết niệu (UTI)',
      descVi: 'Viêm bàng quang, viêm đài bể thận, nhiễm trùng tiểu có sonde (CAUTI)',
      icon: <HeartHandshake className="w-5 h-5 text-indigo-600" />,
      color: 'hover:border-indigo-300'
    },
    {
      id: 'peritoneal',
      titleVi: 'Dịch báng / Màng bụng (SBP)',
      descVi: 'Viêm phúc mạc nguyên phát do vi khuẩn (SBP) ở bệnh nhân xơ gan',
      icon: <Droplet className="w-5 h-5 text-emerald-600" />,
      color: 'hover:border-emerald-300'
    },
    {
      id: 'cns',
      titleVi: 'Thần kinh Trung ương',
      descVi: 'Viêm màng não mủ, viêm não thất, áp xe não',
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      color: 'hover:border-purple-300'
    }
  ];

  const sepsisSourcesList: Array<{
    id: SepsisSource;
    titleVi: string;
  }> = [
    { id: 'respiratory', titleVi: 'Ngõ vào từ Hô hấp / Viêm phổi' },
    { id: 'gastrointestinal', titleVi: 'Ngõ vào từ Đường Tiêu hóa / Ổ bụng' },
    { id: 'skin_soft_tissue', titleVi: 'Ngõ vào từ Da và Mô mềm' },
    { id: 'peritoneal', titleVi: 'Ngõ vào từ Dịch báng (SBP)' },
    { id: 'urinary', titleVi: 'Ngõ vào từ Đường Tiết niệu' }
  ];

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
              2
            </span>
            <h2 className="text-base font-extrabold text-slate-900">
              Đối tượng & Vị trí Ổ Nhiễm trùng Tiêu điểm
            </h2>
          </div>
          <SourceBadge source={{ doc: 'BVBND_HDSDKS', page: [4, 8] }} />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Phác đồ điều trị kháng sinh được xây dựng trên cơ sở mức độ nhạy cảm của các chủng vi khuẩn gây bệnh thường gặp nhất theo từng cơ quan nhiễm trùng (BV Bệnh Nhiệt Đới).
        </p>
      </div>

      {/* 1. Population Selector (Adult vs Pediatric) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          1. Nhóm Đối tượng Bệnh nhân
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onSelectPopulation('adult')}
            className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
              population === 'adult'
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Người lớn & Cao tuổi</div>
              <div className="text-xs text-slate-500">Áp dụng thang điểm SOFA / CLIF-SOFA</div>
            </div>
          </button>

          <button
            onClick={() => onSelectPopulation('pediatric')}
            className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all cursor-pointer ${
              population === 'pediatric'
                ? 'bg-purple-50/80 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Bệnh nhi / Trẻ em</div>
              <div className="text-xs text-slate-500">Áp dụng pSOFA & Phoenix Sepsis 2024</div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Infection Site Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          2. Vị trí Ổ Nhiễm trùng Ban đầu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sitesList.map(s => {
            const isSelected = site === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSite(s.id)}
                className={`p-3.5 rounded-xl border text-left flex items-start space-x-3 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                    : `border-slate-200 ${s.color} hover:bg-slate-50`
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900">{s.titleVi}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{s.descVi}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sepsis Port-of-Entry Subselector */}
      {site === 'sepsis' && (
        <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Droplet className="w-4 h-4 text-rose-600 shrink-0" />
            <h4 className="text-xs font-bold text-rose-900 uppercase">
              Xác định Ngõ vào của Nhiễm khuẩn huyết (BVBND Trang 13)
            </h4>
          </div>
          <p className="text-xs text-rose-800">
            Kháng sinh ban đầu trong nhiễm khuẩn huyết cần ưu tiên theo ngõ vào nghi ngờ cao nhất:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {sepsisSourcesList.map(src => {
              const isSrcSelected = sepsisSource === src.id;
              return (
                <button
                  key={src.id}
                  onClick={() => onSelectSepsisSource(src.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all cursor-pointer ${
                    isSrcSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-rose-50/70'
                  }`}
                >
                  {src.titleVi}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          onClick={onPrevStep}
          className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <button
          onClick={onNextStep}
          className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition-all cursor-pointer"
        >
          <span>Tiếp tục: Phân nhóm Nguy cơ VKĐK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
