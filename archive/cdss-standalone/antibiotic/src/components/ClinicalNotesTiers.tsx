import React, { useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Sparkles, 
  Stethoscope, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Language } from '../types';
import { ExtractedDrugData } from '../utils/drugDataExtractor';

interface ClinicalNotesTiersProps {
  drugDetails: ExtractedDrugData;
  language: Language;
}

interface ParsedTier {
  level: 1 | 2 | 3;
  title: string;
  items: string[];
}

function extractTiersFromHtml(html: string): ParsedTier[] {
  if (!html) return [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tierElements = doc.querySelectorAll('.tier');
    
    if (tierElements.length > 0) {
      return Array.from(tierElements).map((el) => {
        const isTier1 = el.classList.contains('tier-1');
        const isTier2 = el.classList.contains('tier-2');
        const isTier3 = el.classList.contains('tier-3');
        const level: 1 | 2 | 3 = isTier1 ? 1 : isTier2 ? 2 : 3;

        const titleEl = el.querySelector('.tier-h');
        let title = titleEl ? titleEl.textContent?.trim() || '' : '';
        if (!title) {
          title = level === 1 
            ? 'Cấp độ 1 - Cảnh báo an toàn & Nguy cơ gây hại' 
            : level === 2 
            ? 'Cấp độ 2 - Ảnh hưởng hiệu quả & An toàn (PK/PD)' 
            : 'Cấp độ 3 - Bối cảnh lâm sàng & Quản lý kháng sinh (AMS)';
        }

        const itemEls = el.querySelectorAll('.note-item');
        let items = Array.from(itemEls)
          .map((i) => i.textContent?.trim() || '')
          .filter(Boolean);

        if (items.length === 0) {
          const text = el.textContent?.replace(title, '').trim() || '';
          if (text) items = [text];
        }

        return { level, title, items };
      });
    }
  } catch (e) {
    console.error('Error parsing clinical notes html', e);
  }
  return [];
}

export const ClinicalNotesTiers: React.FC<ClinicalNotesTiersProps> = ({
  drugDetails,
  language
}) => {
  const isEn = language === 'en';

  const colistinTiers: ParsedTier[] = useMemo(() => [
    {
      level: 1,
      title: isEn ? 'Tier 1 - Critical Safety & Organ Toxicity' : 'Cấp độ 1 - Cảnh báo an toàn & Độc tính cơ quan',
      items: [
        isEn
          ? 'Colistin carries a high rate of nephrotoxicity (30–50% acute kidney injury or tubular necrosis) and neurotoxicity (perioral paresthesia, muscle weakness, respiratory paralysis).'
          : 'Colistin có độc tính thận rất cao (30–50% bệnh nhân suy thận cấp hoặc hoại tử ống thận) và độc tính thần kinh (tê bì quanh miệng, yếu cơ, liệt hô hấp).',
        isEn
          ? 'Avoid concurrent administration with other nephrotoxic drugs (Vancomycin, Aminoglycosides, NSAIDs, radiocontrast dye). Maintain adequate hydration and monitor Serum Creatinine daily.'
          : 'Tuyệt đối tránh dùng chung với các thuốc độc thận khác (Vancomycin, Aminoglycoside, NSAID, thuốc cản quang). Cần bù đủ dịch và theo dõi Creatinine hàng ngày.'
      ]
    },
    {
      level: 2,
      title: isEn ? 'Tier 2 - PK/PD Target Attainment & Mandatory Loading Dose' : 'Cấp độ 2 - Hiệu quả PK/PD & Bắt buộc liều nạp',
      items: [
        isEn
          ? 'A loading dose of 9 MIU (~300 mg CBA) is MANDATORY on day 1 to rapidly reach steady-state target plasma concentrations.'
          : 'BẮT BUỘC dùng liều nạp 9 MIU (~300 mg CBA) để đạt nồng độ mục tiêu trong máu ngay trong ngày đầu tiên.',
        isEn
          ? 'Without a loading dose, plasma colistin concentrations require 2–3 days to reach therapeutic levels, significantly increasing mortality in septic shock.'
          : 'Nếu không dùng liều nạp, phải mất 2–3 ngày nồng độ colistin trong máu mới đạt trạng thái ổn định, làm tăng nguy cơ thất bại điều trị và tử vong.'
      ]
    },
    {
      level: 3,
      title: isEn ? 'Tier 3 - Microbiology & Combination Therapy' : 'Cấp độ 3 - Vi sinh học & Phối hợp thuốc chống kháng',
      items: [
        isEn
          ? 'Colistin monotherapy readily selects for resistant bacterial subpopulations (heteroresistance).'
          : 'Colistin đơn độc rất dễ phát sinh đột biến vi khuẩn đề kháng (dị kháng).',
        isEn
          ? 'For carbapenem-resistant A. baumannii (CRAB) or P. aeruginosa (CRPA), combination therapy with high-dose extended-infusion Meropenem, Sulbactam, or Tigecycline is strongly recommended.'
          : 'Trong điều trị A. baumannii hoặc P. aeruginosa kháng carbapenem (CRAB/CRPA), khuyến cáo phối hợp Colistin với Meropenem (truyền kéo dài liều cao) hoặc Sulbactam liều cao hoặc Tigecycline.'
      ]
    }
  ], [isEn]);

  const parsedTiers = useMemo(() => {
    if (drugDetails.isColistin) {
      return colistinTiers;
    }
    return extractTiersFromHtml(drugDetails.notesHtml);
  }, [drugDetails, colistinTiers]);

  if (!drugDetails.notesHtml && !drugDetails.isColistin && parsedTiers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      
      {/* Header with Classification Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {isEn ? 'Clinical Guidance & Pharmacotherapy Notes' : 'Lưu Ý Lâm Sàng & Dược Lý (Phân Tầng Tier 1 - 2 - 3)'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {isEn ? 'Evidence-based risk stratification and stewardship guidance' : 'Phân cấp cảnh báo theo mức độ an toàn, hiệu quả và quản lý kháng sinh'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 self-start sm:self-auto text-[11px] font-semibold text-slate-500">
          <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">Tier 1: An toàn</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">Tier 2: Hiệu quả</span>
          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">Tier 3: AMS</span>
        </div>
      </div>

      {/* Render Structured 3-Tier Clinical Cards */}
      {parsedTiers.length > 0 ? (
        <div className="space-y-3.5">
          {parsedTiers.map((tier) => {
            if (tier.level === 1) {
              return (
                <div 
                  key={tier.level}
                  className="p-3.5 sm:p-4 rounded-xl bg-rose-50/90 border border-rose-200/90 text-rose-950 transition-all"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white">
                      Cấp độ 1
                    </span>
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-rose-950">
                      {tier.title}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-rose-900/90 pl-1">
                    {tier.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                        <span className="text-rose-500 font-black text-sm shrink-0 mt-[-1px]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            if (tier.level === 2) {
              return (
                <div 
                  key={tier.level}
                  className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 transition-all"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white">
                      Cấp độ 2
                    </span>
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs sm:text-sm font-extrabold text-amber-950">
                      {tier.title}
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-amber-950/90 pl-1">
                    {tier.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                        <span className="text-amber-500 font-black text-sm shrink-0 mt-[-1px]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div 
                key={tier.level}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-50/90 border border-slate-200 text-slate-800 transition-all"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-700 text-white">
                    Cấp độ 3
                  </span>
                  <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {tier.title}
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 pl-1">
                  {tier.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                      <span className="text-blue-500 font-black text-sm shrink-0 mt-[-1px]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div 
          className="prose prose-sm max-w-none text-xs text-slate-700 original-notes-content bg-slate-50 p-4 rounded-xl border border-slate-200"
          dangerouslySetInnerHTML={{ __html: drugDetails.notesHtml }}
        />
      )}

    </div>
  );
};
