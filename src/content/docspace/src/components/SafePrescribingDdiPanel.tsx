import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Info,
  Pill,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  checkDrugInteractions,
  DRUG_DATABASE,
  getRenalDoseAdjustment,
  InteractionSeverity,
} from '../data/drug-interaction-database.ts';

interface SafePrescribingProps {
  prescribedDrugNames: string[];
  patientAge?: string;
  patientGender?: string;
  patientCreatinine?: string; // µmol/L hoặc mg/dL
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const SafePrescribingDdiPanel: React.FC<SafePrescribingProps> = ({
  prescribedDrugNames,
  patientAge,
  patientGender,
  patientCreatinine,
  onOpenVaultDrawer,
}) => {
  const [manualEgfr, setManualEgfr] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Match prescribed strings to DRUG_DATABASE IDs
  const matchedDrugIds = useMemo(() => {
    const ids: string[] = [];
    const normalizedInput = prescribedDrugNames.map((n) => n.toLowerCase());

    Object.values(DRUG_DATABASE).forEach((drug) => {
      const matchGeneric = normalizedInput.some((input) =>
        input.includes(drug.genericName.toLowerCase()) || drug.genericName.toLowerCase().includes(input)
      );
      const matchBrand = drug.brandNames.some((b) =>
        normalizedInput.some((input) => input.includes(b.toLowerCase()))
      );

      if (matchGeneric || matchBrand) {
        ids.push(drug.id);
      }
    });

    return Array.from(new Set(ids));
  }, [prescribedDrugNames]);

  // Compute or parse eGFR
  const effectiveEgfr = useMemo(() => {
    if (manualEgfr.trim() && !isNaN(parseFloat(manualEgfr))) {
      return parseFloat(manualEgfr);
    }

    // Auto-calculate from Age, Gender, and Creatinine (CKD-EPI simplified approx)
    if (patientCreatinine && !isNaN(parseFloat(patientCreatinine))) {
      const cr = parseFloat(patientCreatinine); // Assuming µmol/L if > 20, else mg/dL
      const crMgDl = cr > 20 ? cr / 88.4 : cr;
      const age = patientAge && !isNaN(parseFloat(patientAge)) ? parseFloat(patientAge) : 60;
      const isFemale = patientGender?.toLowerCase().includes('nữ') || patientGender === 'nu';

      // Simplified Cockcroft-Gault approx (assuming 60kg)
      const weight = 60;
      let cg = ((140 - age) * weight) / (72 * crMgDl);
      if (isFemale) cg *= 0.85;
      return Math.round(cg);
    }

    return null;
  }, [manualEgfr, patientCreatinine, patientAge, patientGender]);

  // Check drug interactions
  const ddiResult = useMemo(() => {
    return checkDrugInteractions(matchedDrugIds);
  }, [matchedDrugIds]);

  // Check renal adjustments for all matched drugs
  const renalAlerts = useMemo(() => {
    if (effectiveEgfr === null) return [];

    const alerts: {
      drugName: string;
      brandNames: string[];
      status: string;
      recommendation: string;
      threshold: number;
    }[] = [];

    matchedDrugIds.forEach((id) => {
      const adj = getRenalDoseAdjustment(id, effectiveEgfr);
      const drug = DRUG_DATABASE[id];
      if (adj && adj.status !== 'normal' && drug) {
        alerts.push({
          drugName: drug.genericName,
          brandNames: drug.brandNames,
          status: adj.status,
          recommendation: adj.recommendation,
          threshold: adj.egfrThreshold,
        });
      }
    });

    return alerts;
  }, [matchedDrugIds, effectiveEgfr]);

  const severityBadge = (sev: InteractionSeverity) => {
    switch (sev) {
      case 'contraindicated':
        return (
          <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" />
            CHỐNG CHỈ ĐỊNH (ĐỎ)
          </span>
        );
      case 'major':
        return (
          <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            TƯƠNG TÁC LỚN (CAM)
          </span>
        );
      case 'moderate':
        return (
          <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-blue-100 text-blue-900 border border-blue-200">
            CẦN THEO DÕI (VÀNG)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10.5px] bg-slate-100 text-slate-700">
            NHẸ
          </span>
        );
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200 rounded-lg p-3.5 sm:p-4 shadow-xs flex flex-col gap-3">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-blue-950 flex items-center gap-2 flex-wrap">
              <span>Động Cơ Rà Soát Tương Tác Thuốc & An Toàn Kê Đơn (Kho DUOC)</span>
              {ddiResult.hasContraindications && (
                <span className="px-2 py-0.5 text-[10.5px] font-bold bg-rose-600 text-white rounded-full animate-pulse">
                  ⚠ CÓ CHỐNG CHỈ ĐỊNH
                </span>
              )}
              {renalAlerts.length > 0 && (
                <span className="px-2 py-0.5 text-[10.5px] font-bold bg-amber-600 text-white rounded-full">
                  ⚡ {renalAlerts.length} THUỐC CẦN CHỈNH LIỀU
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-500">
              Kiểm tra xung đột dược lực/dược động học & Chỉnh liều theo chức năng thận eGFR tự động
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick eGFR input / readout */}
          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-blue-200 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">eGFR:</span>
            <input
              type="number"
              placeholder={effectiveEgfr !== null ? String(effectiveEgfr) : '—'}
              value={manualEgfr}
              onChange={(e) => setManualEgfr(e.target.value)}
              className="w-12 font-mono-custom font-bold text-blue-700 bg-transparent text-center focus:outline-none"
              title="Nhập hoặc hiệu chỉnh mức lọc cầu thận eGFR (mL/phút/1.73m²)"
            />
            <span className="text-[10px] text-slate-400">mL/p</span>
          </div>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'DUOC')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            title="Mở toàn bộ 20 Dược thư chuyên sâu trong Vault Drawer"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">Kho Dược thư</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-3 pt-1">
          {/* Active Drugs Detected Badge Bar */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 flex-wrap">
            <span className="font-semibold text-slate-700 text-[11px]">Thuốc đã nhận diện ({matchedDrugIds.length}):</span>
            {matchedDrugIds.length > 0 ? (
              matchedDrugIds.map((id) => {
                const drug = DRUG_DATABASE[id];
                return (
                  <span
                    key={id}
                    onClick={() => onOpenVaultDrawer?.(drug.genericName, drug.genericName, 'DUOC')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-blue-900 border border-blue-200 font-semibold text-[11px] shadow-2xs hover:bg-blue-50 cursor-pointer transition-colors"
                    title={`Mở bài Dược thư: ${drug.genericName} (${drug.brandNames.join(', ')})`}
                  >
                    <Pill className="w-3 h-3 text-blue-600" />
                    <span>{drug.genericName}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </span>
                );
              })
            ) : (
              <span className="italic text-slate-400 text-[11px]">
                Chưa nhận diện được thuốc trong CSDL 20 thuốc thiết yếu (Hãy thêm tên thuốc chuẩn như Forxiga, Metformin, Enoxaparin, Bisoprolol...)
              </span>
            )}
          </div>

          {/* 1. RENAL DOSE SENTINEL ALERTS (CHỈNH LIỀU THEO eGFR) */}
          {renalAlerts.length > 0 && (
            <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-3 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>CẢNH BÁO CHỈNH LIỀU THEO CHỨC NĂNG THẬN (eGFR = {effectiveEgfr} mL/phút/1.73m²):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {renalAlerts.map((ra, i) => (
                  <div key={i} className="bg-white p-2.5 rounded border border-amber-200 shadow-2xs flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Pill className="w-3 h-3 text-amber-600" />
                        {ra.drugName} <span className="text-[10px] text-slate-500 font-normal">({ra.brandNames[0]})</span>
                      </span>
                      <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        ra.status === 'contraindicated'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {ra.status === 'contraindicated' ? 'CHỐNG CHỈ ĐỊNH' : 'GIẢM LIỀU'}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium text-[11px] leading-relaxed">
                      👉 {ra.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. DRUG-DRUG INTERACTIONS (TƯƠNG TÁC THUỐC) */}
          {ddiResult.conflicts.length > 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Phát hiện {ddiResult.conflicts.length} tương tác thuốc tiềm tàng giữa các y lệnh:</span>
                </span>
                <span className="text-[10.5px] text-slate-500">Dược thư Quốc gia & FDA DDI Engine</span>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {ddiResult.conflicts.map((c, i) => (
                  <div key={i} className="p-3 flex flex-col gap-1.5 hover:bg-slate-50/60 transition-colors">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">
                          {c.drug1} <span className="text-slate-400 font-normal">✕</span> {c.drug2}
                        </span>
                      </div>
                      {severityBadge(c.severity)}
                    </div>
                    <p className="text-slate-700 font-medium text-[11.5px]">
                      <b>Hậu quả:</b> {c.effect}
                    </p>
                    <div className="bg-slate-50 p-2 rounded border border-slate-200 text-slate-600 text-[11px]">
                      <b className="text-blue-900">Khuyến cáo xử trí lâm sàng:</b> {c.management}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : matchedDrugIds.length >= 2 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 px-3 flex items-center gap-2 text-emerald-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <b>Không phát hiện tương tác nghiêm trọng:</b> {matchedDrugIds.length} thuốc đã nhận diện trong đơn hiện không có xung đột chống chỉ định trong CSDL.
              </span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
