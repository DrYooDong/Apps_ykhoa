import React, { useState } from 'react';
import { EXOTOXIN_VS_ENDOTOXIN, TOXIN_PROFILES, INTRINSIC_RESISTANCE_MATRIX, ANTIMICROBIAL_CLASSES } from '../data/toxinsAndResistance';
import { Language } from '../types';
import { ShieldAlert, Skull, Pill, AlertOctagon, Flame, CheckCircle, Info, Stethoscope } from 'lucide-react';

interface ToxicityAndASTProps {
  language: Language;
}

export const ToxicityAndAST: React.FC<ToxicityAndASTProps> = ({ language }) => {
  const [activeSubTab, setActiveSubTab] = useState<'toxins' | 'ast_clsi' | 'intrinsic' | 'classes'>('toxins');

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm uppercase tracking-wider">
              <Skull className="w-4 h-4" />
              {language === 'vi' ? 'Độc tính & Cơ chế kháng sinh' : 'Toxicity & Antimicrobial Guidance'}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {language === 'vi'
                ? 'Bảng So Sánh Độc Tính & Đề Xuất Kháng Sinh Đồ Gợi Ý'
                : 'Toxicity Comparison & Suggested Antibiogram'}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {language === 'vi'
                ? 'Đối chiếu ngoại độc tố (Exotoxin) vs nội độc tố (Endotoxin), cơ chế tác động của độc tố và quy chuẩn phân tầng kháng sinh theo CLSI M100.'
                : 'Comparative analysis of bacterial toxins, mechanisms of action, and CLSI M100 selective susceptibility reporting protocols.'}
            </p>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex overflow-x-auto gap-2 pt-4 scrollbar-none">
          <button
            onClick={() => setActiveSubTab('toxins')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'toxins'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Skull className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Ngoại độc tố vs Nội độc tố' : 'Exotoxins vs Endotoxins'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ast_clsi')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'ast_clsi'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Kháng sinh đồ gợi ý (CLSI)' : 'Suggested Antibiogram (CLSI)'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('intrinsic')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'intrinsic'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Kháng tự nhiên (Intrinsic Resistance)' : 'Intrinsic Resistance'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('classes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'classes'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Cơ chế tác động kháng sinh' : 'Drug Targets & Actions'}</span>
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: TOXICITY COMPARISON */}
      {activeSubTab === 'toxins' && (
        <div className="space-y-6">
          {/* Comparison Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-600" />
              {language === 'vi'
                ? 'Bảng đối chiếu đặc tính Ngoại độc tố (Exotoxin) và Nội độc tố (Endotoxin)'
                : 'Comparative Characteristics: Exotoxins vs Endotoxins'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'vi'
                ? 'Trích xuất từ Bảng 2.6, Giáo trình Mahon: Textbook of Diagnostic Microbiology 6th Ed.'
                : 'Derived from Table 2.6, Mahon & Lehman: Textbook of Diagnostic Microbiology, 6th Ed.'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-bold uppercase tracking-wider w-1/4">
                      {language === 'vi' ? 'Đặc tính sinh học' : 'Property'}
                    </th>
                    <th className="p-3 font-bold uppercase tracking-wider text-rose-700 bg-rose-50/50 w-3/8">
                      {language === 'vi' ? 'Ngoại độc tố (Exotoxin)' : 'Exotoxin'}
                    </th>
                    <th className="p-3 font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50/50 w-3/8">
                      {language === 'vi' ? 'Nội độc tố (Endotoxin / Lipid A)' : 'Endotoxin / Lipid A'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {EXOTOXIN_VS_ENDOTOXIN.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-semibold text-slate-800 bg-slate-50/40">
                        {row.property[language]}
                      </td>
                      <td className="p-3 text-slate-700 leading-relaxed">
                        {row.exotoxin[language]}
                      </td>
                      <td className="p-3 text-slate-700 leading-relaxed">
                        {row.endotoxin[language]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Individual Lethal Toxins Detail Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">
              {language === 'vi' ? 'Hồ sơ các độc tố vi sinh nguy hiểm nhất (Lethal Microbial Toxins)' : 'Profile of Medically Critical Bacterial Toxins'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOXIN_PROFILES.map(toxin => (
                <div
                  key={toxin.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-rose-300 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          toxin.type === 'exotoxin' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                        }`}>
                          {toxin.type === 'exotoxin' ? 'Exotoxin' : 'Endotoxin'}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {toxin.heatStability}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {toxin.name}
                      </h4>
                      <p className="text-xs font-semibold text-indigo-600 italic">
                        {toxin.organism}
                      </p>
                    </div>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 shrink-0">
                      {toxin.lethalityScore}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {language === 'vi' ? 'Bệnh cảnh lâm sàng:' : 'Disease Manifestation:'}
                      </span>
                      <span>{toxin.disease[language]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {language === 'vi' ? 'Cơ chế phân tử:' : 'Molecular Mechanism:'}
                      </span>
                      <span>{toxin.mechanism[language]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {language === 'vi' ? 'Tế bào đích & Tác động sinh lý:' : 'Target & Cellular Outcome:'}
                      </span>
                      <span>{toxin.clinicalEffect[language]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SUGGESTED ANTIBIOGRAM & CLSI REPORTING */}
      {activeSubTab === 'ast_clsi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Pill className="w-5 h-5 text-indigo-600" />
              {language === 'vi'
                ? 'Quy chuẩn phân tầng báo cáo Kháng sinh đồ chọn lọc (CLSI M100 Cascade Reporting)'
                : 'CLSI M100 Selective / Cascade Reporting Strategy'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'vi'
                ? 'Nguyên tắc then chốt của Quản lý sử dụng Kháng sinh (Antibiotic Stewardship): Luôn ưu tiên báo cáo kháng sinh phổ hẹp, ít độc tính và kinh tế nhất (Nhóm A). Chỉ báo cáo kháng sinh phổ rộng (Nhóm B, C) khi vi khuẩn đề kháng nhóm A, bệnh nhân không dung nạp, hoặc nhiễm trùng nặng lan tỏa.'
                : 'Primary principle of Antibiotic Stewardship: Always report narrowest spectrum, least toxic, cost-effective agents first (Group A). Only release broader agents (Group B, C) if primary agents are resistant or clinically contraindicated.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {/* Group A */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                    Group A
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-800">
                    {language === 'vi' ? 'Thử nghiệm & Báo cáo đầu tay' : 'Primary Test & Report'}
                  </span>
                </div>
                <p className="text-xs text-emerald-950 font-medium">
                  {language === 'vi'
                    ? 'Báo cáo thường quy cho TẤT CẢ các chủng phân lập có ý nghĩa bệnh sinh.'
                    : 'Reported routinely on all clinically significant isolates.'}
                </p>
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-emerald-100 space-y-1">
                  <div className="font-bold text-slate-800">Enterobacteriaceae:</div>
                  <div>Ampicillin, Cefazolin, Gentamicin, Tobramycin</div>
                  <div className="font-bold text-slate-800 pt-1">Staphylococci:</div>
                  <div>Penicillin, Cefoxitin (Oxacillin screen), Erythromycin, Clindamycin</div>
                  <div className="font-bold text-slate-800 pt-1">Enterococci:</div>
                  <div>Penicillin, Ampicillin</div>
                </div>
              </div>

              {/* Group B */}
              <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    Group B
                  </span>
                  <span className="text-[11px] font-semibold text-blue-800">
                    {language === 'vi' ? 'Báo cáo có chọn lọc' : 'Report Selectively'}
                  </span>
                </div>
                <p className="text-xs text-blue-950 font-medium">
                  {language === 'vi'
                    ? 'Chỉ báo cáo khi vi khuẩn kháng nhóm A hoặc vị trí nhiễm trùng đặc biệt (như viêm màng não).'
                    : 'Reported only if isolate is resistant to Group A or severe site.'}
                </p>
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-blue-100 space-y-1">
                  <div className="font-bold text-slate-800">Enterobacteriaceae:</div>
                  <div>Amox-Clav, Pip-Tazo, Cefepime, Ceftriaxone, Ciprofloxacin, Meropenem, TMP-SMX</div>
                  <div className="font-bold text-slate-800 pt-1">Staphylococci:</div>
                  <div>Vancomycin, Daptomycin, Linezolid</div>
                </div>
              </div>

              {/* Group C */}
              <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                    Group C
                  </span>
                  <span className="text-[11px] font-semibold text-purple-800">
                    {language === 'vi' ? 'Bổ sung chọn lọc' : 'Supplemental Selective'}
                  </span>
                </div>
                <p className="text-xs text-purple-950 font-medium">
                  {language === 'vi'
                    ? 'Dành cho các cơ sở có tỷ lệ vi khuẩn đa kháng (MDR/XDR) rất cao.'
                    : 'Reserved for institutions with high rates of multi-drug resistance.'}
                </p>
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-purple-100 space-y-1">
                  <div className="font-bold text-slate-800">Các kháng sinh:</div>
                  <div>Ceftazidime, Aztreonam, Ceftazidime-Avibactam, Colistin, Tigecycline, Chloramphenicol</div>
                </div>
              </div>

              {/* Group U */}
              <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-600 text-white">
                    Group U
                  </span>
                  <span className="text-[11px] font-semibold text-amber-800">
                    {language === 'vi' ? 'Chỉ dùng cho Nước tiểu' : 'Urine Only'}
                  </span>
                </div>
                <p className="text-xs text-amber-950 font-medium">
                  {language === 'vi'
                    ? 'Chỉ đạt nồng độ điều trị trong nước tiểu, KHÔNG dùng điều trị nhiễm trùng máu hay viêm phổi.'
                    : 'Attains therapeutic levels ONLY in urine; never for systemic infection.'}
                </p>
                <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-amber-100 space-y-1">
                  <div className="font-bold text-slate-800">Kháng sinh tiết niệu:</div>
                  <div>Nitrofurantoin, Fosfomycin, Trimethoprim đơn độc, Sulfisoxazole</div>
                </div>
              </div>
            </div>

            {/* Special Detection Rules from Chapter 13 */}
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                {language === 'vi' ? 'Các quy tắc báo cáo đặc biệt của CLSI (Special CLSI Editing Rules):' : 'Key CLSI Antimicrobial Reporting Rules:'}
              </h4>
              <ul className="space-y-1.5 text-slate-700 list-disc pl-5">
                <li>
                  <strong className="text-rose-700">Quy tắc MRSA:</strong> Nếu S. aureus kháng Cefoxitin/Oxacillin (mang gen mecA), vi khuẩn phải được báo cáo KHÁNG VỚI TẤT CẢ các thuốc nhóm Beta-lactam (gồm Penicillins, Cephalosporins thế hệ 1-4, Carbapenems, ức chế beta-lactamase), bất kể kết quả in vitro có nhạy cảm (trừ Ceftaroline).
                </li>
                <li>
                  <strong className="text-rose-700">Quy tắc ESBL:</strong> Vi khuẩn sinh men beta-lactamase phổ rộng (ESBL) phải được coi là kháng về mặt lâm sàng với tất cả Penicillins, Cephalosporins (kể cả thế hệ 3, 4) và Aztreonam. Thuốc điều trị lựa chọn là Carbapenem.
                </li>
                <li>
                  <strong className="text-rose-700">Thử nghiệm D-zone (Inducible Clindamycin):</strong> Với Staphylococcus và Streptococcus kháng Erythromycin nhưng nhạy Clindamycin, bắt buộc làm D-test. Nếu có hiện tượng vát phẳng hình chữ D (D-shape flattening), phải báo cáo Clindamycin là KHÁNG (erm gene).
                </li>
                <li>
                  <strong className="text-rose-700">Kháng Vancomycin ở Tụ cầu (VISA / VRSA):</strong> CLSI khuyến cáo KHÔNG DÙNG phương pháp khuếch tán đĩa giấy (disk diffusion) để kiểm tra Vancomycin cho <i>S. aureus</i> vì không phát hiện được thể kháng trung gian (VISA). Bắt buộc phải xác định MIC định lượng bằng vi pha loãng trong môi trường lỏng (Broth Microdilution) hoặc que Etest.
                </li>
                <li>
                  <strong className="text-rose-700">Kháng Aminoglycoside nồng độ cao (HLAR ở Enterococcus):</strong> Để điều trị viêm nội tâm mạc do <i>Enterococcus</i>, cần phối hợp Ampicillin hoặc Vancomycin với Gentamicin để đạt hiệu quả hiệp đồng diệt khuẩn (synergy). Phải làm test sàng lọc HLAR (Gentamicin 500 µg và Streptomycin 1000 µg). Nếu HLAR (+), vi khuẩn mất hoàn toàn tác dụng hiệp đồng và không dùng kết hợp.
                </li>
                <li>
                  <strong className="text-rose-700">Khẳng định sinh Carbapenemase (CRE / mCIM / Carba NP):</strong> Vi khuẩn đường ruột (CRE) hoặc <i>P. aeruginosa</i> giảm nhạy cảm với ít nhất 1 carbapenem (Ertapenem, Meropenem, Imipenem) cần làm mCIM (modified Carbapenem Inactivation Method) kết hợp eCIM để phân biệt metallo-beta-lactamase (NDM, VIM, IMP) với serine carbapenemase (KPC, OXA-48).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: INTRINSIC RESISTANCE MATRIX */}
      {activeSubTab === 'intrinsic' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-600" />
              {language === 'vi' ? 'Ma Trận Kháng Thuốc Tự Nhiên (Intrinsic Resistance Matrix)' : 'Intrinsic Bacterial Antimicrobial Resistance'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'vi'
                ? 'Kháng tự nhiên là đặc tính di truyền bất biến của một loài. Nếu xét nghiệm cho kết quả "Nhạy cảm" với các thuốc dưới đây, đó là SAI SÓT KỸ THUẬT!'
                : 'Intrinsic resistance is an inherent characteristic. Any in vitro susceptible result for these combinations represents laboratory technical error.'}
            </p>
          </div>

          <div className="space-y-4">
            {INTRINSIC_RESISTANCE_MATRIX.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-sm text-slate-900 italic">
                    {item.organism}
                  </h4>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {language === 'vi' ? 'Kháng tự nhiên 100%' : '100% Inherent Resistance'}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-100 text-xs">
                  <span className="font-bold text-rose-700 block mb-1">
                    {language === 'vi' ? 'Các kháng sinh vô hiệu:' : 'Ineffective Antibiotics:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.intrinsicResistantDrugs.map((d, dIdx) => (
                      <span key={dIdx} className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded font-medium text-[11px] border border-rose-100">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">
                  <strong>{language === 'vi' ? 'Cơ chế:' : 'Mechanism:'}</strong> {item.mechanism[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: DRUG CLASSES & MECHANISMS */}
      {activeSubTab === 'classes' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-emerald-600" />
              {language === 'vi'
                ? 'Các nhóm kháng sinh chính & Đích tác động tế bào (Bảng 12.1 Mahon)'
                : 'Major Antibacterial Classes & Cellular Targets (Table 12.1)'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'vi'
                ? 'Phân tích cơ chế kìm khuẩn/diệt khuẩn và các cơ chế đề kháng tương ứng.'
                : 'Cellular targets, mechanisms of action, and typical acquired resistance pathways.'}
            </p>

            <div className="space-y-4">
              {ANTIMICROBIAL_CLASSES.map((cls, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                    <h4 className="font-bold text-sm text-slate-900">
                      {cls.class}
                    </h4>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                      Đích: {cls.target}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        {language === 'vi' ? 'Cơ chế tác động:' : 'Mode of Action:'}
                      </span>
                      <span>{cls.mechanism[language]}</span>
                    </div>

                    <div>
                      <span className="font-bold text-rose-700 block mb-0.5">
                        {language === 'vi' ? 'Cơ chế đề kháng chính:' : 'Primary Resistance Mechanism:'}
                      </span>
                      <span>{cls.primaryResistanceMechanism[language]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs pt-1 border-t border-slate-100 text-slate-600">
                    <span className="font-bold">{language === 'vi' ? 'Ví dụ tiêu biểu:' : 'Representative drugs:'}</span>
                    <span>{cls.examples.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
