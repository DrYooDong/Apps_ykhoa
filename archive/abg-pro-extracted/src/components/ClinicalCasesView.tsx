import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  HelpCircle,
  ShieldAlert,
  Flame,
  Activity,
  User,
  HeartPulse
} from 'lucide-react';
import { CLINICAL_CASES } from '../data/clinicalCases';
import { ABGInput, ClinicalCase } from '../types/abg';

interface ClinicalCasesViewProps {
  onLoadCaseToAnalyzer: (input: ABGInput) => void;
}

export const ClinicalCasesView: React.FC<ClinicalCasesViewProps> = ({ onLoadCaseToAnalyzer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [expandedCaseId, setExpandedCaseId] = useState<number | null>(null);

  const categories = [
    'Tất cả',
    'Suy hô hấp Type 1',
    'Suy hô hấp Type 2',
    'Toan chuyển hóa',
    'Kiềm chuyển hóa',
    'Rối loạn hỗn hợp',
    'Cấp cứu & Hồi sức'
  ];

  const filteredCases = useMemo(() => {
    return CLINICAL_CASES.filter((c: ClinicalCase) => {
      const matchCat =
        selectedCategory === 'Tất cả' ||
        c.categoryTag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Cấp cứu & Hồi sức' &&
          (c.difficulty === 'Cấp cứu' || c.categoryTag.includes('Cấp cứu') || c.categoryTag.includes('Ngộ độc')));

      const matchSearch =
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patientProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.history.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.answers.differentialDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: number) => {
    setExpandedCaseId(expandedCaseId === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <ClipboardList className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Kho Ca Bệnh Khí Máu Lâm Sàng Mẫu (Authentic ABG Clinical Cases)
            </h1>
            <p className="text-xs text-blue-200">
              Tuyển tập 30+ ca bệnh thực tế từ <em>Arterial Blood Gases Made Easy</em> & <em>ABG Interpretation: A case study approach</em>
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo bệnh (COPD, DKA, Morphin, Sốc, Nôn...)"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Tìm thấy <strong className="text-slate-900">{filteredCases.length}</strong> / {CLINICAL_CASES.length} ca bệnh
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((c: ClinicalCase) => {
          const isExpanded = expandedCaseId === c.id;

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all"
            >
              {/* Card Header & Short Overview */}
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      {c.id}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{c.title}</h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        c.difficulty === 'Cấp cứu'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : c.difficulty === 'Nâng cao'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200'
                          : c.difficulty === 'Trung bình'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {c.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline">
                      {c.caseNumberDisplay}
                    </span>
                  </div>
                </div>

                {/* Patient summary profile */}
                <div className="flex items-start space-x-2 text-xs text-slate-600">
                  <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{c.patientProfile}</span>
                </div>

                {/* Vitals summary chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {c.examination.vitals.rr && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                      Thở: {c.examination.vitals.rr}
                    </span>
                  )}
                  {c.examination.vitals.spo2 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                      SpO₂: {c.examination.vitals.spo2}
                    </span>
                  )}
                  {c.examination.vitals.pulse && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                      Mạch: {c.examination.vitals.pulse}
                    </span>
                  )}
                  {c.examination.vitals.bp && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
                      HA: {c.examination.vitals.bp}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                    #{c.categoryTag}
                  </span>
                </div>

                {/* ABG Parameters Compact Grid */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-3 sm:grid-cols-7 gap-2 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">pH</div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.pH}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      PaCO₂ ({c.abg.unit})
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.pCO2}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      PaO₂ ({c.abg.unit})
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.pO2}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">HCO₃⁻</div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.hco3}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">BE</div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.be}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">SaO₂</div>
                    <div className="font-bold text-slate-900 mt-0.5">{c.abg.sao2}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">FiO₂</div>
                    <div className="font-bold text-blue-700 mt-0.5">{c.abg.fio2}%</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onLoadCaseToAnalyzer(c.abg)}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Nạp Vào Bộ Phân Tích &rarr;</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(c.id)}
                    className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
                  >
                    <span>{isExpanded ? 'Thu gọn lời giải' : 'Xem lời giải & Biện luận'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expansive Solution Details */}
              {isExpanded && (
                <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 space-y-4 text-xs">
                  {/* History & Examination Findings */}
                  <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block">Bệnh sử & Thăm khám lâm sàng:</strong>
                    <p className="text-slate-700 leading-relaxed">{c.history}</p>
                    <p className="text-slate-600 italic mt-1">Khám: {c.examination.findings}</p>
                  </div>

                  {/* Dual Diagnosis Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                      <div className="font-bold text-blue-900 flex items-center space-x-1.5">
                        <Activity className="w-4 h-4 text-blue-700" />
                        <span>Trao đổi khí phổi:</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {c.answers.gasExchange}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-900 flex items-center space-x-1.5">
                        <Stethoscope className="w-4 h-4 text-emerald-700" />
                        <span>Thăng bằng Kiềm - Toan:</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed font-medium">
                        {c.answers.acidBase}
                      </p>
                    </div>
                  </div>

                  {/* Clinical Diagnosis & Differential */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block text-xs">Chẩn đoán phân biệt & Bệnh cảnh:</strong>
                    <p className="text-slate-700 leading-relaxed">{c.answers.differentialDiagnosis}</p>
                  </div>

                  {/* Textbook Questions & Discussion */}
                  {c.questions.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-indigo-600" />
                        <span>Các câu hỏi lâm sàng trong tài liệu gốc:</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-1 text-slate-700">
                        {c.questions.map((q, idx) => (
                          <li key={idx} className="font-medium text-blue-950">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Clinical Action & Management */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                    <div className="font-bold text-indigo-950 flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 text-indigo-700" />
                      <span>Hướng xử trí lâm sàng khuyến cáo:</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-medium">
                      {c.answers.clinicalAction}
                    </p>
                  </div>

                  {/* Physiological Insight */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-1">
                    <strong className="block font-bold">Điểm sáng sinh lý học (Clinical Insight):</strong>
                    <p className="leading-relaxed font-medium">{c.answers.physiologicalInsight}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
