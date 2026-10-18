import React, { useState, useMemo } from 'react';
import { 
  X, 
  ShieldAlert, 
  Search, 
  Activity, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { Language } from '../types';
import { AMR_ORG, AMR_SPEC, AMR_DATA, AMR_VAR } from '../data/antibiotics';

interface AmrModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDrugId: string;
  selectedDrugName: string;
  language: Language;
}

export const AmrModal: React.FC<AmrModalProps> = ({
  isOpen,
  onClose,
  selectedDrugId,
  selectedDrugName,
  language
}) => {
  const [selectedSpec, setSelectedSpec] = useState<number>(0); // 0 = all
  const [searchTerm, setSearchTerm] = useState('');
  const isEn = language === 'en';

  // AMR data for current drug
  const drugAmrData = useMemo(() => {
    return AMR_DATA[selectedDrugId] || [];
  }, [selectedDrugId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                {isEn ? 'Antimicrobial Resistance Surveillance (Vietnam)' : 'Dữ Liệu Giám Sát Đề Kháng Kháng Sinh (Việt Nam)'}
              </h3>
              <p className="text-xs text-white/80">
                {isEn ? `Susceptibility data for ${selectedDrugName}` : `Tỷ lệ nhạy cảm in vitro của ${selectedDrugName}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specimen Selector & Filter */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-700 mr-1">
              {isEn ? 'Clinical Specimen:' : 'Bệnh phẩm lâm sàng:'}
            </span>
            {AMR_SPEC.map((spec, idx) => (
              <button
                key={spec[0]}
                onClick={() => setSelectedSpec(idx)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  selectedSpec === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {spec[1]}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isEn ? 'Filter pathogen (e.g. Acinetobacter, Klebsiella, E. coli, MRSA)...' : 'Tìm vi khuẩn (vd: Acinetobacter, Klebsiella, E. coli, Tụ cầu vàng)...'}
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* AMR Table */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1">
          {drugAmrData.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              {isEn 
                ? 'No specific Vietnam hospital surveillance antibiogram records found for this antimicrobial.' 
                : 'Chưa có bản ghi giám sát vi sinh viện riêng biệt cho hoạt chất này.'}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-12 text-[11px] font-bold uppercase text-slate-500 pb-2 border-b border-slate-200 px-2">
                <div className="col-span-6">{isEn ? 'Pathogen / Organism' : 'Chủng vi khuẩn'}</div>
                <div className="col-span-3 text-center">{isEn ? 'Sample Count (N)' : 'Số mẫu (N)'}</div>
                <div className="col-span-3 text-right">{isEn ? 'Susceptibility % (%S)' : 'Tỷ lệ nhạy (%S)'}</div>
              </div>

              {drugAmrData
                .filter(row => {
                  // row: [orgIdx, specIdx, sPct, nCount, varIdx]
                  if (selectedSpec !== 0 && row[1] !== selectedSpec) return false;
                  if (searchTerm.trim()) {
                    const orgName = AMR_ORG[row[0]] || '';
                    if (!orgName.toLowerCase().includes(searchTerm.toLowerCase().trim())) return false;
                  }
                  return true;
                })
                .map((row, idx) => {
                  const orgName = AMR_ORG[row[0]] || 'Unknown';
                  const sPct = row[2];
                  const nCount = row[3];
                  const varName = row[4] !== undefined ? AMR_VAR[row[4]] : null;

                  let colorBadge = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                  if (sPct < 40) colorBadge = 'bg-rose-100 text-rose-900 border-rose-300';
                  else if (sPct < 70) colorBadge = 'bg-amber-100 text-amber-900 border-amber-300';

                  return (
                    <div 
                      key={idx}
                      className="grid grid-cols-12 items-center text-xs p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 transition-colors"
                    >
                      <div className="col-span-6 font-semibold text-slate-900">
                        {orgName}
                        {varName && (
                          <span className="ml-1.5 px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                            {varName}
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 text-center text-slate-500 font-mono">
                        N = {nCount}
                      </div>
                      <div className="col-span-3 text-right">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-black border ${colorBadge}`}>
                          {sPct}% S
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>
            {isEn 
              ? 'Data source: Vietnam Antimicrobial Resistance Surveillance System (VINARES)' 
              : 'Nguồn: Giám sát Đề kháng Kháng sinh Bệnh viện Việt Nam (VINARES / Bệnh viện Bệnh Nhiệt đới)'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
          >
            {isEn ? 'Close' : 'Đóng'}
          </button>
        </div>

      </div>
    </div>
  );
};
