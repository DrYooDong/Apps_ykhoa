import React, { useMemo } from 'react';
import { 
  Droplets, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { DialysisMode, Language } from '../types';
import { ExtractedDrugData } from '../utils/drugDataExtractor';

interface DialysisPanelProps {
  drugDetails: ExtractedDrugData;
  dialysis: DialysisMode;
  language: Language;
}

interface ParsedRrtMode {
  title: string;
  isMatched: boolean;
  lines: Array<{ label: string; valueHtml: string }>;
  note: string;
}

function parseRrtData(html: string, currentDialysis: DialysisMode): { modes: ParsedRrtMode[]; source: string } {
  if (!html) return { modes: [], source: '' };
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const modeEls = doc.querySelectorAll('.rrt-mode');
    
    const modes: ParsedRrtMode[] = Array.from(modeEls).map((mEl) => {
      const title = mEl.querySelector('.rm-title')?.textContent?.trim() || 'Phương thức lọc máu';
      
      const isIhd = title.toLowerCase().includes('ihd') || title.toLowerCase().includes('thận nhân tạo');
      const isCrrt = title.toLowerCase().includes('crrt') || title.toLowerCase().includes('liên tục');
      
      const isMatched = 
        (currentDialysis === 'hd' && isIhd) || 
        (currentDialysis === 'crrt' && isCrrt);

      const lines = Array.from(mEl.querySelectorAll('.rrt-line')).map((lEl) => {
        const label = lEl.querySelector('.rl-lbl')?.textContent?.trim() || '';
        const valEl = lEl.querySelector('.rl-val');
        const valueHtml = valEl ? valEl.innerHTML.trim() : '';
        return { label, valueHtml };
      });

      const note = mEl.querySelector('.rrt-note')?.textContent?.trim() || '';

      return { title, isMatched, lines, note };
    });

    const source = doc.querySelector('.src-line')?.textContent?.trim() || '';
    return { modes, source };
  } catch (e) {
    console.error('Error parsing RRT data', e);
    return { modes: [], source: '' };
  }
}

export const DialysisPanel: React.FC<DialysisPanelProps> = ({
  drugDetails,
  dialysis,
  language
}) => {
  const isEn = language === 'en';

  const colistinModes: ParsedRrtMode[] = useMemo(() => [
    {
      title: isEn ? 'IHD - Intermittent Hemodialysis' : 'IHD - Thận nhân tạo ngắt quãng chu kỳ',
      isMatched: dialysis === 'hd',
      lines: [
        {
          label: isEn ? 'Non-Dialysis Days' : 'Ngày không lọc máu',
          valueHtml: isEn 
            ? '<b>65–70 mg CBA</b> (~2 MIU) q12h' 
            : '<b>65–70 mg CBA</b> (~2 MIU) mỗi 12 giờ'
        },
        {
          label: isEn ? 'Dialysis Days' : 'Ngày lọc máu',
          valueHtml: isEn
            ? 'Administer dose <b>immediately AFTER dialysis session</b>, plus supplemental dose of <b>40–50 mg CBA</b> (~1.5 MIU) post-HD'
            : 'Dùng liều <b>ngay sau khi kết thúc buổi lọc</b>, HOẶC bổ sung <b>40–50 mg CBA</b> (~1,5 MIU) sau lọc'
        }
      ],
      note: isEn
        ? 'Colistin/CMS is significantly dialyzed by high-flux membranes. Avoid dosing before hemodialysis to prevent therapeutic underdosing.'
        : 'Colistin bị thẩm tách qua màng lọc thận nhân tạo. Tuyệt đối không dùng trước buổi lọc để tránh mất thuốc.'
    },
    {
      title: isEn ? 'CRRT - Continuous Renal Replacement Therapy' : 'CRRT - Lọc máu liên tục (CVVH / CVVHD / CVVHDF)',
      isMatched: dialysis === 'crrt',
      lines: [
        {
          label: isEn ? 'Loading Dose' : 'Liều nạp ban đầu',
          valueHtml: isEn
            ? '<b>9 MIU (~300 mg CBA)</b> loading dose (mandatory)'
            : '<b>9 MIU (~300 mg CBA)</b> (bắt buộc ngay ngày đầu)'
        },
        {
          label: isEn ? 'Maintenance Dose' : 'Liều duy trì',
          valueHtml: isEn
            ? '<b>220–240 mg CBA (~6.6–7.2 MIU)/day</b>, divided into <b>110–120 mg CBA (~3.3–3.6 MIU) q12h</b>'
            : '<b>220–240 mg CBA</b> (~6,6–7,2 MIU)/ngày, chia <b>110–120 mg CBA</b> (~3,3–3,6 MIU) mỗi 12 giờ'
        }
      ],
      note: isEn
        ? 'High membrane clearance in CRRT requires near-normal dosing to prevent failure and emergent resistance.'
        : 'Màng lọc CRRT đào thải colistin liên tục với độ thanh thải cao. Cần duy trì liều cao như trên để tránh thất bại điều trị.'
    }
  ], [dialysis, isEn]);

  const parsedRrt = useMemo(() => {
    if (drugDetails.isColistin) {
      return { modes: colistinModes, source: 'International Consensus Guidelines for the Optimal Use of the Polymyxins (2019)' };
    }
    return parseRrtData(drugDetails.rrtHtml, dialysis);
  }, [drugDetails, dialysis, colistinModes]);

  const hasData = parsedRrt.modes.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isEn ? 'Renal Replacement Therapy (RRT / Dialysis) Protocol' : 'Liều Kháng Sinh Trong Lọc Máu (HD / CRRT / CAPD)'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {isEn 
                ? 'Clinical dosing guide for intermittent and continuous renal replacement modalities' 
                : 'Hướng dẫn hiệu chỉnh liều cho bệnh nhân thận nhân tạo chu kỳ và lọc máu liên tục'}
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          {dialysis !== 'none' ? (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-100 text-purple-900 border border-purple-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>
                {isEn ? `Patient on ${dialysis.toUpperCase()}` : `Bệnh nhân đang ${dialysis === 'hd' ? 'lọc máu HD' : dialysis === 'crrt' ? 'CRRT' : 'CAPD'}`}
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>{isEn ? 'Patient: No Dialysis' : 'Bệnh nhân: Không lọc máu'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Clear Clinical Notification Banner */}
      <div className={`p-3.5 sm:p-4 rounded-xl border mb-5 transition-all text-xs leading-relaxed ${
        dialysis !== 'none'
          ? 'bg-purple-50/80 border-purple-200/90 text-purple-950'
          : 'bg-slate-50/90 border-slate-200 text-slate-700'
      }`}>
        {dialysis === 'hd' && (
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-900 block text-[13px] mb-0.5">
                {isEn ? 'Active Clinical Target: Intermittent Hemodialysis (HD)' : 'Chế độ lọc máu của bệnh nhân: Thận nhân tạo chu kỳ (IHD / HD)'}
              </span>
              <p className="text-purple-900/90">
                {isEn
                  ? 'The patient is undergoing HD. Check the highlighted IHD protocol below. Most dialyzable antibiotics must be administered AFTER hemodialysis to prevent drug clearance.'
                  : 'Bệnh nhân đang chạy thận nhân tạo chu kỳ. Khối phác đồ IHD bên dưới đã được làm nổi bật để áp dụng. Lưu ý dùng thuốc SAU buổi lọc máu vào những ngày có lọc để tránh thất thoát thuốc qua quả lọc.'}
              </p>
            </div>
          </div>
        )}

        {dialysis === 'crrt' && (
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-900 block text-[13px] mb-0.5">
                {isEn ? 'Active Clinical Target: Continuous Renal Replacement Therapy (CRRT)' : 'Chế độ lọc máu của bệnh nhân: Lọc máu liên tục (CRRT)'}
              </span>
              <p className="text-purple-900/90">
                {isEn
                  ? 'The patient is receiving CRRT (CVVH/CVVHD/CVVHDF). Clearance by modern continuous filters is high. Refer to the highlighted CRRT protocol below.'
                  : 'Bệnh nhân đang lọc máu liên tục (CVVH/CVVHD/CVVHDF). Quả lọc CRRT thanh thải thuốc 24/24 nên liều duy trì thường cao hơn so với thận nhân tạo chu kỳ để đạt nồng độ điều trị.'}
              </p>
            </div>
          </div>
        )}

        {dialysis === 'capd' && (
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-purple-900 block text-[13px] mb-0.5">
                {isEn ? 'Active Clinical Target: Peritoneal Dialysis (CAPD)' : 'Chế độ lọc máu của bệnh nhân: Lọc màng bụng (CAPD / APD)'}
              </span>
              <p className="text-purple-900/90">
                {isEn
                  ? 'The patient is on peritoneal dialysis. Most beta-lactams and carbapenems require once-daily dosing or intraperitoneal administration for peritonitis.'
                  : 'Bệnh nhân đang lọc màng bụng. Hầu hết kháng sinh đào thải qua thẩm tách phúc mạc ở mức thấp hơn lọc máu tĩnh mạch, thường dùng liều ngắt quãng q24h hoặc pha vào dịch lọc nếu viêm phúc mạc.'}
              </p>
            </div>
          </div>
        )}

        {dialysis === 'none' && (
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block text-[13px] mb-0.5">
                {isEn ? 'Patient Status: Not on Renal Replacement Therapy' : 'Trạng thái bệnh nhân: Hiện không chỉ định lọc máu'}
              </span>
              <p className="text-slate-600">
                {isEn
                  ? 'The patient is currently not on dialysis. The active dosing regimen is calibrated according to calculated Cockcroft-Gault CrCl above. Below are standardized reference protocols if acute dialysis is initiated.'
                  : 'Bệnh nhân hiện không chạy thận nhân tạo hay lọc máu liên tục. Phác đồ đang áp dụng cho người bệnh được hiệu chỉnh theo độ thanh thải CrCl ở bảng trên. Các phác đồ dưới đây dùng để tham khảo sẵn sàng khi có chỉ định lọc máu cấp tính.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* RRT Modalities Cards Display */}
      {hasData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parsedRrt.modes.map((mode, index) => {
              const isHighlighted = mode.isMatched;

              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between ${
                    isHighlighted
                      ? 'bg-purple-50/50 border-purple-400 shadow-sm ring-2 ring-purple-400/20'
                      : 'bg-slate-50/60 border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    {/* Mode Header */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80 mb-3">
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className={`w-2.5 h-2.5 rounded-full ${isHighlighted ? 'bg-purple-600' : 'bg-slate-400'}`} />
                        <h4 className={`text-xs sm:text-sm font-extrabold truncate ${
                          isHighlighted ? 'text-purple-950' : 'text-slate-900'
                        }`}>
                          {mode.title}
                        </h4>
                      </div>

                      {isHighlighted ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-600 text-white shrink-0 tracking-wide shadow-2xs">
                          {isEn ? 'Active Mode' : 'Đang Áp Dụng'}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-600 shrink-0">
                          {isEn ? 'Reference' : 'Tham khảo'}
                        </span>
                      )}
                    </div>

                    {/* Dosing Rows */}
                    <div className="space-y-2 text-xs">
                      {mode.lines.map((line, lIdx) => (
                        <div 
                          key={lIdx} 
                          className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex flex-col sm:flex-row sm:items-start justify-between gap-1.5"
                        >
                          <span className="font-bold text-slate-600 shrink-0 sm:w-28 text-[11px] uppercase tracking-wider">
                            {line.label}:
                          </span>
                          <div 
                            className="font-medium text-slate-900 flex-1 leading-snug"
                            dangerouslySetInnerHTML={{ __html: line.valueHtml }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mode Clinical Note */}
                  {mode.note && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/70 text-[11px] text-slate-600 flex items-start space-x-1.5 italic">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{mode.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Source Attribution Line */}
          {parsedRrt.source && (
            <div className="pt-2 text-[11px] text-slate-500 text-right italic">
              {parsedRrt.source}
            </div>
          )}
        </div>
      ) : (
        /* Fallback when drug has no specific RRT adjustment requirement */
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">
              {isEn ? 'No Specific Dialysis Adjustment Required' : 'Không Yêu Cầu Hiệu Chỉnh Liều Riêng Trong Lọc Máu'}
            </span>
            <p className="leading-relaxed">
              {isEn
                ? `${drugDetails.name} is primarily eliminated through non-renal pathways (hepatic, biliary) or exhibits negligible clearance across hemodialysis membranes. Standard adult or renal-impairment dosage is generally retained without supplemental post-dialysis dosing.`
                : `Kháng sinh ${drugDetails.name} đào thải chủ yếu qua gan, đường mật hoặc con đường ngoài thận, ít chịu ảnh hưởng bởi màng lọc thận nhân tạo. Không cần bổ sung liều sau lọc máu hay thay đổi liều đặc thù trong HD/CRRT so với liều theo chức năng thận đã khuyến cáo.`}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
