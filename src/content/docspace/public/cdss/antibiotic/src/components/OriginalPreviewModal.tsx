import React, { useMemo } from 'react';
import { X, ExternalLink, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { Language, PatientState } from '../types';
import { decodePreviewSource } from '../data/rawPreviewData';

interface OriginalPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  drugId: string;
  drugName: string;
  patient: PatientState;
  language: Language;
}

export const OriginalPreviewModal: React.FC<OriginalPreviewModalProps> = ({
  isOpen,
  onClose,
  drugId,
  drugName,
  patient,
  language
}) => {
  const isEn = language === 'en';

  const rawHtml = useMemo(() => {
    let html = decodePreviewSource(drugId);
    if (!html) return '';

    // Inject patient values into the preview's inputs on DOMContentLoaded
    const scrVal = patient.scrUnit === 'mgdl' ? Math.round(patient.scr * 88.4) : patient.scr;
    const injectionScript = `
      <script>
        window.addEventListener('DOMContentLoaded', () => {
          try {
            const scrEl = document.getElementById('i-scr');
            const ageEl = document.getElementById('i-age');
            const sexEl = document.getElementById('i-sex');
            const tbwEl = document.getElementById('i-tbw');
            const htEl = document.getElementById('i-ht');

            if (scrEl) { scrEl.value = '${scrVal}'; scrEl.dispatchEvent(new Event('input')); }
            if (ageEl) { ageEl.value = '${patient.age}'; ageEl.dispatchEvent(new Event('input')); }
            if (sexEl) { sexEl.value = '${patient.gender}'; sexEl.dispatchEvent(new Event('change')); }
            if (tbwEl) { tbwEl.value = '${patient.weight}'; tbwEl.dispatchEvent(new Event('input')); }
            if (htEl && ${patient.height || 0} > 0) { htEl.value = '${patient.height}'; htEl.dispatchEvent(new Event('input')); }
            
            if (typeof calc === 'function') calc();
          } catch(e) { console.error('Param injection error:', e); }
        });
      </script>
    `;

    return html.replace('</body>', `${injectionScript}</body>`);
  }, [drugId, patient]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[92vh]">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-3 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-sm sm:text-base">
              {isEn ? 'Original Stanford/UCSF Full Protocol Preview' : 'Bản Xem Gốc Theo Chuẩn Stanford / UCSF'} - {drugName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Informative Sub-banner */}
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2 text-xs text-indigo-900 flex items-center justify-between shrink-0">
          <span>
            {isEn 
              ? `Embedded with patient parameters: Scr ${patient.scr} ${patient.scrUnit === 'umol' ? 'µmol/L' : 'mg/dL'}, ${patient.age}yo, ${patient.weight}kg, ${patient.gender.toUpperCase()}`
              : `Đã tự động nạp thông số bệnh nhân: Scr ${patient.scr} ${patient.scrUnit === 'umol' ? 'µmol/L' : 'mg/dL'}, ${patient.age} tuổi, ${patient.weight}kg, giới ${patient.gender.toUpperCase()}`}
          </span>
          <span className="text-[11px] font-semibold text-indigo-700 hidden sm:inline">
            100% Fidelity Render
          </span>
        </div>

        {/* Embedded Iframe */}
        <div className="flex-1 w-full bg-slate-100 overflow-hidden relative">
          <iframe
            srcDoc={rawHtml}
            title={`Original preview for ${drugName}`}
            className="w-full h-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

      </div>
    </div>
  );
};
