import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { VaultArticle } from '../../lib/vaultBridge.ts';

interface ClinicalCalculatorsSectionProps {
  diseaseId: string;
  diseaseName: string;
  diseaseGroup: string;
  diseaseTools: VaultArticle[];
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const ClinicalCalculatorsSection: React.FC<ClinicalCalculatorsSectionProps> = ({
  diseaseId,
  diseaseName,
  diseaseGroup,
  diseaseTools,
  onOpenVaultDrawer,
}) => {
  const [curbScores, setCurbScores] = useState({
    c: false, // Confusion
    u: false, // Urea > 7
    r: false, // RR >= 30
    b: false, // BP < 90/60
    age: false, // Age >= 65
  });

  const [killipClass, setKillipClass] = useState<'I' | 'II' | 'III' | 'IV'>('I');

  const curbScoreTotal = useMemo(() => {
    return Object.values(curbScores).filter(Boolean).length;
  }, [curbScores]);

  const showPneumoniaCalc =
    diseaseId.includes('phoi') ||
    diseaseId.includes('nhiem_trung') ||
    diseaseName.toLowerCase().includes('phổi') ||
    diseaseName.toLowerCase().includes('nhiễm trùng');

  const showCardiacCalc =
    diseaseId.includes('tim') ||
    diseaseGroup.toLowerCase().includes('tim') ||
    diseaseName.toLowerCase().includes('tim') ||
    diseaseName.toLowerCase().includes('mạch');

  return (
    <div className="space-y-3">
      {/* CURB-65 Calculator for Pneumonia / Respiratory or General Sepsis */}
      {showPneumoniaCalc && (
        <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>Thang điểm CURB-65 (Viêm phổi mắc phải cộng đồng):</span>
              <span className="font-mono-custom px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                {curbScoreTotal} điểm
              </span>
            </span>
            <span className="font-semibold text-slate-700">
              Khuyến nghị:{' '}
              <b
                className={
                  curbScoreTotal >= 3
                    ? 'text-red-700'
                    : curbScoreTotal === 2
                    ? 'text-amber-700'
                    : 'text-emerald-700'
                }
              >
                {curbScoreTotal >= 3
                  ? 'Nhập viện ICU / Khoa Hồi sức tích cực'
                  : curbScoreTotal === 2
                  ? 'Nhập viện Nội trú theo dõi sát'
                  : 'Điều trị ngoại trú an toàn'}
              </b>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {[
              { key: 'c', label: 'C - Rối loạn tri giác (Confusion)' },
              { key: 'u', label: 'U - Ure > 7 mmol/L (Urea)' },
              { key: 'r', label: 'R - Nhịp thở >= 30 l/p' },
              { key: 'b', label: 'B - HA < 90/60 mmHg' },
              { key: 'age', label: '65 - Tuổi >= 65' },
            ].map((item) => (
              <label
                key={item.key}
                className={`p-2 rounded border flex items-center gap-2 cursor-pointer transition-colors ${
                  curbScores[item.key as keyof typeof curbScores]
                    ? 'bg-blue-50 border-blue-300 font-semibold text-blue-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={curbScores[item.key as keyof typeof curbScores]}
                  onChange={(e) =>
                    setCurbScores((prev) => ({
                      ...prev,
                      [item.key]: e.target.checked,
                    }))
                  }
                  className="rounded text-blue-600"
                />
                <span className="text-[11px] leading-tight">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Killip Classification for Acute MI / Cardiac */}
      {showCardiacCalc && (
        <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>Phân độ Killip (Suy tim trong Nhồi máu cơ tim cấp):</span>
              <span className="font-mono-custom px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">
                Độ {killipClass}
              </span>
            </span>
            <span className="text-slate-600">
              Tử vong 30 ngày ước tính:{' '}
              <b className="text-rose-700">
                {killipClass === 'I'
                  ? '6%'
                  : killipClass === 'II'
                  ? '17%'
                  : killipClass === 'III'
                  ? '38% (Phù phổi cấp)'
                  : '67–81% (Sốc tim)'}
              </b>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { val: 'I', text: 'Độ I: Không có dấu suy tim lâm sàng' },
              { val: 'II', text: 'Độ II: Ran ẩm < 50% phế trường, T3 gallop' },
              { val: 'III', text: 'Độ III: Phù phổi cấp nặng, ran > 50%' },
              { val: 'IV', text: 'Độ IV: Sốc tim (HA tụt, tưới máu kém)' },
            ].map((k) => (
              <button
                key={k.val}
                type="button"
                onClick={() => setKillipClass(k.val as any)}
                className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                  killipClass === k.val
                    ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold font-mono-custom">Killip {k.val}</div>
                <div className="text-[10px] text-slate-500">{k.text}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Specialized Clinical Tools from Kho CC */}
      <div className="pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Thang điểm & Công cụ lâm sàng tương thích (Kho Công cụ - CC):</span>
          </span>
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
            className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
          >
            Xem tất cả 19 công cụ lâm sàng →
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {diseaseTools.length > 0 ? (
            diseaseTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, tool.title, 'CC')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                title={tool.snippet}
              >
                <span>🧮</span>
                <span>{tool.title}</span>
                <span className="text-[10px] text-amber-600 font-mono-custom font-normal">
                  · {tool.readTime}
                </span>
              </button>
            ))
          ) : (
            <span className="text-xs text-slate-500 italic">
              Chưa có công cụ riêng trong Kho CC cho bệnh lý này.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
