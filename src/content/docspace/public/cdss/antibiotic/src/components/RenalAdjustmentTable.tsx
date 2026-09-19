import React from 'react';
import { Table, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { CalculatedRenalMetrics, Language } from '../types';
import { ExtractedDrugData } from '../utils/drugDataExtractor';

interface RenalAdjustmentTableProps {
  drugDetails: ExtractedDrugData;
  renal: CalculatedRenalMetrics;
  selectedScenario: string;
  language: Language;
}

export const RenalAdjustmentTable: React.FC<RenalAdjustmentTableProps> = ({
  drugDetails,
  renal,
  selectedScenario,
  language
}) => {
  const isEn = language === 'en';
  const { crcl } = renal;

  if (drugDetails.isColistin) {
    // Colistin Table
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Table className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {isEn ? 'Colistin Renal Dosing Stratification (Garonzik Algorithm)' : 'Bảng Hiệu Chỉnh Liều Colistin Theo CrCl (Thuật toán Garonzik)'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          {isEn 
            ? 'Colistimethate sodium dosing expressed as Colistin Base Activity (CBA). 1 MIU ≈ 33.3 mg CBA.' 
            : 'Đơn vị tính: Hoạt tính Colistin Base (CBA). 1 triệu UI CMS ≈ 33,3 mg CBA. Liều nạp 9 MIU (~300 mg CBA) truyền 1-2h.'}
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">{isEn ? 'CrCl Range (mL/min)' : 'Khoảng CrCl (mL/phút)'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Dose per 12 hours (q12h)' : 'Liều mỗi 12 giờ (q12h)'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Equivalent in MIU' : 'Quy đổi sang triệu UI (MIU)'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Total Daily Dose' : 'Tổng liều ngày'}</th>
                <th className="py-2.5 px-3 text-center">{isEn ? 'Match' : 'Khớp'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {drugDetails.rows.map((row: any, idx: number) => {
                const isMatched = crcl >= row.lo && (row.hi === null || crcl < row.hi);
                const miu = (row.perDose / 33.3).toFixed(1).replace('.', ',');
                const dailyMiu = (row.perDay / 33.3).toFixed(1).replace('.', ',');
                const rangeLabel = row.hi === null ? `≥ ${row.lo}` : (row.lo === 0 ? `< ${row.hi}` : `${row.lo} - ${row.hi}`);

                return (
                  <tr 
                    key={idx}
                    className={`transition-colors ${
                      isMatched 
                        ? 'bg-blue-100/70 font-bold text-blue-950 ring-1 ring-blue-400' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-2 px-3 font-semibold">{rangeLabel}</td>
                    <td className="py-2 px-3">{row.perDose} mg CBA q12h</td>
                    <td className="py-2 px-3 text-blue-800 font-medium">~{miu} MIU q12h</td>
                    <td className="py-2 px-3">{row.perDay} mg CBA (~{dailyMiu} MIU)/ngày</td>
                    <td className="py-2 px-3 text-center">
                      {isMatched && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-600 text-white">
                          {isEn ? 'Current CrCl' : 'Đang chọn'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Standard Antibiotic Renal Table
  const scenarios = drugDetails.scenarios;
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Table className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {isEn ? 'Complete Renal Dosing Adjustment Protocol' : 'Bảng Hiệu Chỉnh Liều Đầy Đủ Theo Chức Năng Thận'}
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {isEn ? `Current CrCl: ${crcl} mL/min` : `CrCl hiện tại: ${crcl} mL/phút`}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
              <th className="py-2.5 px-3 min-w-[130px]">{isEn ? 'CrCl Threshold' : 'Ngưỡng CrCl'}</th>
              {scenarios.map((s) => (
                <th 
                  key={s.key} 
                  className={`py-2.5 px-3 min-w-[180px] ${
                    selectedScenario === s.key ? 'text-blue-700 bg-blue-50/50' : ''
                  }`}
                >
                  {isEn ? (s.labelEn || s.label) : s.label}
                </th>
              ))}
              <th className="py-2.5 px-3 min-w-[150px]">{isEn ? 'Clinical Notes' : 'Lưu ý lâm sàng'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {drugDetails.rows.map((row: any, idx: number) => {
              const isMatched = row.op === 'gt' ? crcl > row.thr : crcl >= row.thr;
              // Check if previous matched
              let isExactMatch = isMatched;
              if (idx > 0) {
                const prev = drugDetails.rows[idx - 1];
                const prevMatched = prev.op === 'gt' ? crcl > prev.thr : crcl >= prev.thr;
                if (prevMatched) isExactMatch = false;
              }

              return (
                <tr 
                  key={idx}
                  className={`transition-colors ${
                    isExactMatch
                      ? 'bg-blue-100/70 font-bold text-blue-950 ring-1 ring-blue-400' 
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold whitespace-nowrap flex items-center space-x-1.5">
                    {isExactMatch && <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                    <span>{row.label}</span>
                  </td>

                  {scenarios.map((s) => {
                    let doseVal = row.doses ? row.doses[s.key] : '-';
                    if (Array.isArray(doseVal)) {
                      doseVal = doseVal.map((d: any) => typeof d === 'string' ? d : `${d.dose} (${d.label})`).join(' HOẶC ');
                    }
                    return (
                      <td 
                        key={s.key}
                        className={`py-2.5 px-3 ${selectedScenario === s.key ? 'font-black text-blue-900' : ''}`}
                      >
                        {doseVal || '-'}
                      </td>
                    );
                  })}

                  <td className="py-2.5 px-3 text-slate-500 font-normal">
                    {isEn ? (row.noteEn || row.note || '-') : (row.note || '-')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
