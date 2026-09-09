import React, { useState, useMemo, useEffect } from 'react';
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
  HeartPulse,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ArrowUpDown,
  Table,
  Layers,
  FileText
} from 'lucide-react';
import { CLINICAL_CASES } from '../data/clinicalCases';
import { CLINICAL_PROTOCOLS, ClinicalProtocol } from '../data/protocols';
import { ABGInput, ClinicalCase } from '../types/abg';

// Mapping 30 authentic clinical cases to standard protocols
export const CASE_PROTOCOL_MAP: Record<number, { id: string; title: string }> = {
  1: { id: 'type1-failure', title: 'Phác đồ Suy hô hấp Type 1 & Liệu pháp Oxy' },
  2: { id: 'type2-copd', title: 'Phác đồ Suy hô hấp Type 2 & Giảm thông khí phế nang' },
  3: { id: 'type1-failure', title: 'Phác đồ Suy hô hấp Type 1 & Cạm bẫy Thuyên tắc phổi (PE)' },
  4: { id: 'type2-copd', title: 'Phác đồ Xử trí Đợt cấp COPD & Thở máy BiPAP/NIV' },
  5: { id: 'type2-copd', title: 'Phác đồ Suy hô hấp Type 2 & Quá liều Opiate/Morphin' },
  6: { id: 'dka-protocol', title: 'Phác đồ Xử trí Nhiễm toan Ceton ĐTĐ (DKA)' },
  7: { id: 'lactic-sepsis', title: 'Phác đồ Toan Lactic & Sốc nhiễm khuẩn (Surviving Sepsis)' },
  8: { id: 'type2-copd', title: 'Phác đồ Liệu pháp Oxy có kiểm soát & Bẫy Hypoxic Drive' },
  9: { id: 'metabolic-alkalosis-vomiting', title: 'Phác đồ Kiềm chuyển hóa & Mất dịch dạ dày do Nôn' },
  10: { id: 'type2-copd', title: 'Phác đồ Đợt cấp COPD trên nền suy hô hấp mạn' },
  11: { id: 'type1-failure', title: 'Phác đồ Suy hô hấp Type 1 & Hội chứng ARDS' },
  12: { id: 'type1-failure', title: 'Phác đồ Cơn hen phế quản cấp nặng & Khí dung' },
  13: { id: 'type1-failure', title: 'Phác đồ Phù phổi cấp huyết động & Thông khí CPAP' },
  14: { id: 'dka-protocol', title: 'Phác đồ DKA mất nước sâu & Bù Kali - Insulin' },
  15: { id: 'type1-failure', title: 'Phác đồ Tràn khí màng phổi áp lực & Dẫn lưu ngực cấp cứu' },
  16: { id: 'lactic-sepsis', title: 'Phác đồ Toan Lactic do Sốc giảm thể tích / Mất máu' },
  17: { id: 'lactic-sepsis', title: 'Phác đồ Toan Lactic sau Ngừng tuần hoàn (ROSC)' },
  18: { id: 'dka-protocol', title: 'Phác đồ DKA có toan chuyển hóa tăng Clo (Hyperchloremic)' },
  19: { id: 'metabolic-alkalosis-vomiting', title: 'Phác đồ Kiềm chuyển hóa do Hút sonde dạ dày liên tục' },
  20: { id: 'type2-copd', title: 'Phác đồ Suy hô hấp Type 2 do Nhược cơ (Myasthenia Gravis)' },
  21: { id: 'type2-copd', title: 'Phác đồ Suy hô hấp Type 2 do Hội chứng Guillain-Barré' },
  22: { id: 'lactic-sepsis', title: 'Phác đồ Toan Lactic do Nhồi máu mạc treo ruột cấp' },
  23: { id: 'abg-technique-pitfalls', title: 'Phác đồ Cạm bẫy Tăng thông khí lo âu & Kiềm hô hấp cấp' },
  24: { id: 'abg-technique-pitfalls', title: 'Phác đồ Nhận diện Lấy nhầm Máu Tĩnh Mạch (VBG)' },
  25: { id: 'lactic-sepsis', title: 'Phác đồ Gói 1 giờ Sốc nhiễm trùng Gram âm' },
  26: { id: 'metabolic-alkalosis-vomiting', title: 'Phác đồ Kiềm chuyển hóa do Lạm dụng Furosemide' },
  27: { id: 'metabolic-alkalosis-vomiting', title: 'Phác đồ Kiềm chuyển hóa tăng Aldosterone (Hội chứng Conn)' },
  28: { id: 'metabolic-alkalosis-vomiting', title: 'Phác đồ Kiềm chuyển hóa hạ Kali do Cam thảo' },
  29: { id: 'type1-failure', title: 'Phác đồ Suy hô hấp Type 1 & Biến chứng ARDS Viêm tụy cấp' },
  30: { id: 'abg-technique-pitfalls', title: 'Phác đồ Kỹ thuật lấy ABG & Cạm bẫy Bọt khí' }
};

// Reverse map: protocol ID to related case numbers
export const PROTOCOL_CASES_MAP: Record<string, number[]> = {
  'type1-failure': [1, 3, 11, 12, 13, 15, 29],
  'type2-copd': [2, 4, 5, 8, 10, 20, 21],
  'dka-protocol': [6, 14, 18],
  'lactic-sepsis': [7, 16, 17, 22, 25],
  'metabolic-alkalosis-vomiting': [9, 19, 26, 27, 28],
  'abg-technique-pitfalls': [23, 24, 30]
};

// Clinical mapping matrix entries for overview
const MATRIX_ENTRIES = [
  {
    syndrome: 'Suy hô hấp Type 1 (Giảm oxy máu)',
    pattern: 'PaO2 < 60 mmHg, PaCO2 bình thường hoặc giảm, A-a gradient tăng',
    cases: [1, 3, 11, 12, 13, 15, 29],
    protocolId: 'type1-failure',
    protocolTitle: 'Phác đồ Suy hô hấp Type 1 & Liệu pháp Oxy'
  },
  {
    syndrome: 'Suy hô hấp Type 2 (Tăng thán khí)',
    pattern: 'PaCO2 > 45 mmHg, Toan hô hấp cấp hoặc mạn bù trừ',
    cases: [2, 4, 5, 8, 10, 20, 21],
    protocolId: 'type2-copd',
    protocolTitle: 'Phác đồ Đợt cấp COPD & Suy hô hấp Type 2'
  },
  {
    syndrome: 'Nhiễm toan Ceton ĐTĐ (DKA)',
    pattern: 'Toan chuyển hóa tăng Anion Gap (AG > 16), Ceton máu (+), Glucose tăng',
    cases: [6, 14, 18],
    protocolId: 'dka-protocol',
    protocolTitle: 'Phác đồ Xử trí Nhiễm toan Ceton ĐTĐ (DKA)'
  },
  {
    syndrome: 'Toan Lactic & Sốc nhiễm khuẩn',
    pattern: 'Toan chuyển hóa tăng Anion Gap, Lactate > 2.0 (Toan rõ > 4.0 mmol/L)',
    cases: [7, 16, 17, 22, 25],
    protocolId: 'lactic-sepsis',
    protocolTitle: 'Phác đồ Toan Lactic & Sốc nhiễm khuẩn'
  },
  {
    syndrome: 'Kiềm chuyển hóa & Mất dịch dạ dày',
    pattern: 'pH > 7.45, HCO3- > 28 mmol/L, Hạ Clo và Hạ Kali máu',
    cases: [9, 19, 26, 27, 28],
    protocolId: 'metabolic-alkalosis-vomiting',
    protocolTitle: 'Phác đồ Kiềm chuyển hóa & Bù Natri Clorid'
  },
  {
    syndrome: 'Kỹ thuật lấy ABG & Cạm bẫy',
    pattern: 'Nhầm máu tĩnh mạch (VBG), Bọt khí tăng PaO2 giả, Lo âu kiềm hô hấp',
    cases: [23, 24, 30],
    protocolId: 'abg-technique-pitfalls',
    protocolTitle: 'Phác đồ Kỹ thuật lấy ABG & Test Allen'
  }
];

interface ClinicalCasesViewProps {
  initialSubTab?: 'cases' | 'protocols' | 'matrix';
  onLoadCaseToAnalyzer: (input: ABGInput) => void;
}

export const ClinicalCasesView: React.FC<ClinicalCasesViewProps> = ({
  initialSubTab = 'cases',
  onLoadCaseToAnalyzer
}) => {
  // Sub-tab switcher: 'cases' (30+ ca lâm sàng), 'protocols' (Phác đồ điều trị), 'matrix' (Bảng đối chiếu)
  const [activeSubTab, setActiveSubTab] = useState<'cases' | 'protocols' | 'matrix'>(initialSubTab);

  // Sync if initialSubTab prop changes
  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Cases state
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [selectedCaseCategory, setSelectedCaseCategory] = useState<string>('Tất cả');
  const [expandedCaseId, setExpandedCaseId] = useState<number | null>(1);

  // Protocols state
  const [protocolSearchQuery, setProtocolSearchQuery] = useState('');
  const [selectedProtocolCategory, setSelectedProtocolCategory] = useState<string>('Tất cả');
  const [expandedProtocolId, setExpandedProtocolId] = useState<string | null>('type2-copd');

  const caseCategories = [
    'Tất cả',
    'Suy hô hấp Type 1',
    'Suy hô hấp Type 2',
    'Toan chuyển hóa',
    'Kiềm chuyển hóa',
    'Rối loạn hỗn hợp',
    'Cấp cứu & Hồi sức'
  ];

  const protocolCategories = [
    'Tất cả',
    'Hô hấp',
    'Toan chuyển hóa',
    'Kiềm chuyển hóa',
    'Cạm bẫy & Thủ thuật'
  ];

  // Filtered cases
  const filteredCases = useMemo(() => {
    return CLINICAL_CASES.filter((c: ClinicalCase) => {
      const matchCat =
        selectedCaseCategory === 'Tất cả' ||
        c.categoryTag.toLowerCase().includes(selectedCaseCategory.toLowerCase()) ||
        (selectedCaseCategory === 'Cấp cứu & Hồi sức' &&
          (c.difficulty === 'Cấp cứu' || c.categoryTag.includes('Cấp cứu') || c.categoryTag.includes('Ngộ độc')));

      const matchSearch =
        caseSearchQuery === '' ||
        c.title.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.patientProfile.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.history.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.answers.differentialDiagnosis.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.categoryTag.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.id.toString() === caseSearchQuery.trim();

      return matchCat && matchSearch;
    });
  }, [caseSearchQuery, selectedCaseCategory]);

  // Filtered protocols
  const filteredProtocols = useMemo(() => {
    return CLINICAL_PROTOCOLS.filter((p: ClinicalProtocol) => {
      const matchCat = selectedProtocolCategory === 'Tất cả' || p.category === selectedProtocolCategory;
      const matchSearch =
        protocolSearchQuery === '' ||
        p.title.toLowerCase().includes(protocolSearchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(protocolSearchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(protocolSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(protocolSearchQuery.toLowerCase());

      return matchCat && matchSearch;
    });
  }, [protocolSearchQuery, selectedProtocolCategory]);

  // Cross-Navigation Handlers
  const handleJumpToProtocol = (protocolId: string) => {
    setActiveSubTab('protocols');
    setExpandedProtocolId(protocolId);
    setProtocolSearchQuery('');
    setSelectedProtocolCategory('Tất cả');
    setTimeout(() => {
      const el = document.getElementById(`protocol-card-${protocolId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  const handleJumpToCase = (caseId: number) => {
    setActiveSubTab('cases');
    setExpandedCaseId(caseId);
    setCaseSearchQuery('');
    setSelectedCaseCategory('Tất cả');
    setTimeout(() => {
      const el = document.getElementById(`case-card-${caseId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Unified Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-400/30">
                <ClipboardList className="w-6 h-6 text-blue-300" />
              </div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Ca Lâm Sàng Mẫu &amp; Phác Đồ Xử Trí Chuẩn Y Khoa
                </h1>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Kho tài nguyên thực chiến tổng hợp <strong>30+ ca bệnh khí máu điển hình</strong> (trích từ <em>Arterial Blood Gases Made Easy</em> &amp; Pierre) tích hợp trực tiếp <strong>hệ thống phác đồ điều trị khẩn cấp</strong>, lưu đồ oxy theo bậc thang và cảnh báo tử vong.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-slate-400">Ca lâm sàng:</span>{' '}
              <strong className="text-blue-300 font-bold">30 Ca</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-slate-400">Phác đồ xử trí:</span>{' '}
              <strong className="text-emerald-300 font-bold">6 Phác Đồ</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
              <span className="text-slate-400">Liên kết:</span>{' '}
              <strong className="text-amber-300 font-bold">2 Chiều Thông Minh</strong>
            </div>
          </div>
        </div>

        {/* Primary Sub-Navigation Segment Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 flex flex-wrap items-center gap-2">
          <button
            id="tab-cases-list"
            type="button"
            onClick={() => setActiveSubTab('cases')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'cases'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>30+ Ca Lâm Sàng Mẫu</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/30 text-blue-200">
              {CLINICAL_CASES.length} ca
            </span>
          </button>

          <button
            id="tab-protocols"
            type="button"
            onClick={() => setActiveSubTab('protocols')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'protocols'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Phác Đồ Xử Trí Lâm Sàng</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/30 text-emerald-200">
              {CLINICAL_PROTOCOLS.length} phác đồ
            </span>
          </button>

          <button
            id="tab-matrix"
            type="button"
            onClick={() => setActiveSubTab('matrix')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40'
                : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Bảng Đối Chiếu Ca Bệnh &amp; Phác Đồ</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: 30+ CA LÂM SÀNG MẪU                                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'cases' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Filter & Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={caseSearchQuery}
                  onChange={(e) => setCaseSearchQuery(e.target.value)}
                  placeholder="Tìm theo ca (COPD, DKA, Morphin, Sốc, Hen, Ca 01...)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <span>
                  Hiển thị <strong className="text-slate-900">{filteredCases.length}</strong> / {CLINICAL_CASES.length} ca bệnh
                </span>
                {caseSearchQuery && (
                  <button
                    onClick={() => setCaseSearchQuery('')}
                    className="text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    (Xóa lọc)
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {caseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCaseCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCaseCategory === cat
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
              const mappedProtocol = CASE_PROTOCOL_MAP[c.id];

              return (
                <div
                  id={`case-card-${c.id}`}
                  key={c.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all"
                >
                  {/* Card Header & Overview */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
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

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onLoadCaseToAnalyzer(c.abg)}
                          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition-all cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Nạp Vào Bộ Phân Tích &rarr;</span>
                        </button>

                        {mappedProtocol && (
                          <button
                            onClick={() => handleJumpToProtocol(mappedProtocol.id)}
                            className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all cursor-pointer"
                            title={mappedProtocol.title}
                          >
                            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                            <span>Xem Phác Đồ Xử Trí</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedCaseId(isExpanded ? null : c.id)}
                        className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                      >
                        <span>{isExpanded ? 'Thu gọn lời giải' : 'Xem lời giải & Biện luận'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expansive Solution Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 space-y-4 text-xs">
                      {/* Direct Protocol Link Banner */}
                      {mappedProtocol && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                              <ShieldAlert className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                                Phác Đồ Xử Trí Khuyến Cáo Tương Ứng:
                              </div>
                              <div className="font-bold text-slate-900 text-xs sm:text-sm">
                                {mappedProtocol.title}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleJumpToProtocol(mappedProtocol.id)}
                            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all self-start sm:self-center"
                          >
                            <span>Mở Phác Đồ Chi Tiết</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {/* History & Examination Findings */}
                      <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 space-y-1">
                        <strong className="text-slate-900 block">Bệnh sử &amp; Thăm khám lâm sàng:</strong>
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
                        <strong className="text-slate-900 block text-xs">Chẩn đoán phân biệt &amp; Bệnh cảnh:</strong>
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
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: PHÁC ĐỒ XỬ TRÍ LÂM SÀNG                                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'protocols' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={protocolSearchQuery}
                  onChange={(e) => setProtocolSearchQuery(e.target.value)}
                  placeholder="Tìm phác đồ (COPD, DKA, Sốc nhiễm khuẩn, Lactic...)"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
                <span>
                  Có <strong className="text-slate-900">{filteredProtocols.length}</strong> phác đồ chuẩn y khoa
                </span>
                {protocolSearchQuery && (
                  <button
                    onClick={() => setProtocolSearchQuery('')}
                    className="text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    (Xóa lọc)
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {protocolCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedProtocolCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedProtocolCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Protocols List */}
          <div className="space-y-4">
            {filteredProtocols.map((protocol: ClinicalProtocol) => {
              const isExpanded = expandedProtocolId === protocol.id;
              const relatedCaseIds = PROTOCOL_CASES_MAP[protocol.id] || [];
              const relatedCases = CLINICAL_CASES.filter((c) => relatedCaseIds.includes(c.id));

              return (
                <div
                  id={`protocol-card-${protocol.id}`}
                  key={protocol.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 transition-all"
                >
                  {/* Protocol Card Header */}
                  <div
                    className="p-5 cursor-pointer select-none space-y-2 hover:bg-slate-50/50 transition-colors"
                    onClick={() => setExpandedProtocolId(isExpanded ? null : protocol.id)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${protocol.badgeColor}`}
                        >
                          {protocol.category}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">{protocol.title}</h3>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-400">
                        <span className="text-[11px] hidden sm:inline">{protocol.sourceReference}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-600" />
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-blue-700 font-medium italic">{protocol.subtitle}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{protocol.summary}</p>

                    {/* Quick Related Cases Pill Preview */}
                    {relatedCases.length > 0 && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Ca lâm sàng thực tế:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {relatedCases.slice(0, 4).map((rc) => (
                            <span
                              key={rc.id}
                              className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-700 font-medium"
                            >
                              Ca {rc.id}
                            </span>
                          ))}
                          {relatedCases.length > 4 && (
                            <span className="text-[10px] text-slate-400">+{relatedCases.length - 4} ca khác</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Expansive Details */}
                  {isExpanded && (
                    <div className="border-t border-slate-200 p-5 space-y-5 bg-gradient-to-b from-slate-50 to-white text-xs">
                      {/* Pathophysiology & Mechanism */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <HeartPulse className="w-4 h-4 text-blue-600" />
                          <span>Cơ chế sinh lý bệnh (Pathophysiology):</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{protocol.pathophysiology}</p>
                      </div>

                      {/* Diagnostic criteria */}
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Tiêu chuẩn chẩn đoán xác định:</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700">
                          {protocol.diagnosticCriteria.map((crit, idx) => (
                            <li key={idx}>{crit}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Stepped Treatment Protocol */}
                      <div className="space-y-2.5">
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <ShieldAlert className="w-4 h-4 text-blue-600" />
                          <span>Các bước xử trí lâm sàng chuẩn y khoa:</span>
                        </div>
                        <div className="space-y-2">
                          {protocol.treatmentSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {step.title}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    step.priority === 'Khẩn cấp'
                                      ? 'bg-rose-100 text-rose-800'
                                      : step.priority === 'Quan trọng'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                                  }`}
                                >
                                  {step.priority}
                                </span>
                              </div>
                              <p className="text-slate-700 leading-relaxed">{step.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pitfalls & Clinical Pearls */}
                      {protocol.pitfallsAndWarnings.length > 0 && (
                        <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2">
                          <div className="font-bold text-rose-950 flex items-center space-x-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>Cạm bẫy lâm sàng &amp; Cảnh báo cốt tử:</span>
                          </div>
                          <ul className="list-disc pl-5 space-y-1 font-medium text-rose-900">
                            {protocol.pitfallsAndWarnings.map((warn, idx) => (
                              <li key={idx}>{warn}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* RELATED REAL-WORLD CASES INTEGRATION */}
                      {relatedCases.length > 0 && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                              <ClipboardList className="w-4 h-4 text-blue-600" />
                              <span>
                                Các ca lâm sàng mẫu minh họa phác đồ này ({relatedCases.length} ca):
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">
                              Nhấn để xem phân tích chi tiết &amp; nạp vào bộ phân tích
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {relatedCases.map((rc) => (
                              <div
                                key={rc.id}
                                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all space-y-2 flex flex-col justify-between"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-slate-900 line-clamp-1">
                                      Ca {rc.id}: {rc.title}
                                    </span>
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-800 shrink-0">
                                      {rc.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                                    {rc.patientProfile}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                                  <button
                                    onClick={() => handleJumpToCase(rc.id)}
                                    className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer flex items-center space-x-0.5"
                                  >
                                    <span>Xem lời giải</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => onLoadCaseToAnalyzer(rc.abg)}
                                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer flex items-center space-x-0.5"
                                  >
                                    <Sparkles className="w-3 h-3" />
                                    <span>Nạp ABG</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reference footer */}
                      <div className="text-[11px] text-slate-500 italic pt-2 border-t border-slate-100">
                        Trích dẫn y văn: {protocol.sourceReference}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: MA TRẬN ĐỐI CHIẾU CA BỆNH & PHÁC ĐỒ                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Table className="w-5 h-5 text-blue-600" />
              <span>Ma Trận Đối Chiếu Hội Chứng Khí Máu • Ca Lâm Sàng • Phác Đồ Xử Trí</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bảng ánh xạ trực quan giúp bác sĩ và học viên định hướng ngay ca lâm sàng minh họa thực tế cùng phác đồ điều trị chuẩn hóa cho từng nhóm bệnh sinh.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="py-3 px-4 w-1/4">Hội Chứng &amp; Bệnh Sinh</th>
                    <th className="py-3 px-4 w-1/4">Đặc Điểm Khí Máu Điển Hình</th>
                    <th className="py-3 px-4 w-1/4">Ca Lâm Sàng Minh Họa</th>
                    <th className="py-3 px-4 w-1/4">Phác Đồ Xử Trí Tương Ứng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {MATRIX_ENTRIES.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {entry.syndrome}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 align-top leading-relaxed">
                        {entry.pattern}
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <div className="flex flex-wrap gap-1.5">
                          {entry.cases.map((cid) => (
                            <button
                              key={cid}
                              onClick={() => handleJumpToCase(cid)}
                              className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-[11px] font-bold transition-all cursor-pointer"
                              title={`Xem chi tiết Ca ${cid}`}
                            >
                              Ca {cid}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 align-top">
                        <button
                          onClick={() => handleJumpToProtocol(entry.protocolId)}
                          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-[11px] font-bold transition-all cursor-pointer text-left"
                        >
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          <span>{entry.protocolTitle}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
