import React from 'react';
import { DifferentialTable, Language } from '../types';
import { Table, CheckCircle2 } from 'lucide-react';

interface MahonDifferentialTableProps {
  table: DifferentialTable;
  language: Language;
  highlightKeyword?: string;
}

export const MahonDifferentialTable: React.FC<MahonDifferentialTableProps> = ({
  table,
  language,
  highlightKeyword
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-slate-800 text-xs sm:text-sm">
          <Table className="w-4 h-4 text-emerald-600" />
          <span>{table.title[language]}</span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
          Mahon 6th Ed.
        </span>
      </div>

      <div className="overflow-x-auto max-h-96 custom-scrollbar">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10">
              {table.headers.map((h, idx) => (
                <th key={idx} className="px-3.5 py-2.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.rows.map((row, rIdx) => {
              const rowText = row.join(' ').toLowerCase();
              const isHighlighted = highlightKeyword
                ? rowText.includes(highlightKeyword.toLowerCase())
                : false;

              return (
                <tr
                  key={rIdx}
                  className={`transition-colors ${
                    isHighlighted
                      ? 'bg-emerald-50/90 font-semibold text-emerald-950 hover:bg-emerald-100/80'
                      : rIdx % 2 === 0
                      ? 'bg-white hover:bg-slate-50/80'
                      : 'bg-slate-50/40 hover:bg-slate-50'
                  }`}
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`px-3.5 py-2.5 ${
                        cIdx === 0
                          ? 'font-bold text-slate-900 italic whitespace-nowrap'
                          : 'text-slate-700'
                      } ${
                        isHighlighted && cIdx === 0
                          ? 'text-emerald-900 flex items-center gap-1.5'
                          : ''
                      }`}
                    >
                      {isHighlighted && cIdx === 0 && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 inline" />
                      )}
                      <span>{cell}</span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
