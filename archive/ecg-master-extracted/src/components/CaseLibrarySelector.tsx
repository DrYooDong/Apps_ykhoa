import { useState } from "react";
import { EcgCase } from "../types";
import { CLINICAL_ECG_CASES } from "../data/ecgCases";
import {
  FolderHeart,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Activity,
  User,
  HeartPulse,
  Sparkles,
  CheckCircle2,
  X,
  Layers,
} from "lucide-react";

interface CaseLibrarySelectorProps {
  currentCaseId: string;
  onSelectCase: (c: EcgCase) => void;
  onClose?: () => void;
}

export function CaseLibrarySelector({
  currentCaseId,
  onSelectCase,
  onClose,
}: CaseLibrarySelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "Tất Cả Ca Bệnh" },
    { id: "Ischemia", label: "Mạch Vành / NMCT" },
    { id: "Arrhythmia", label: "Rối Loạn Nhịp" },
    { id: "Conduction", label: "Rối Loạn Dẫn Truyền" },
    { id: "Electrolyte", label: "Rối Loạn Điện Giải" },
    { id: "Hypertrophy", label: "Phì Đại Buồng Tim" },
    { id: "Channelopathy", label: "Brugada / Kênh Ion" },
  ];

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return CLINICAL_ECG_CASES.length;
    return CLINICAL_ECG_CASES.filter((c) => c.category === catId).length;
  };

  const filteredCases = CLINICAL_ECG_CASES.filter((c) => {
    const matchesCat = selectedCategory === "all" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.diagnosis.primary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs">
            <FolderHeart className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Thư Viện 10 Tình Huống Cấp Cứu Tim Mạch Thực Tế
              </h3>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                12 Đạo Trình Chuẩn
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn ca bệnh để nạp trực tiếp lên bản ghi ECG 12 chuyển đạo và xem phân tích đối chiếu chuyên sâu
            </p>
          </div>
        </div>

        {/* Right action tools: Search + Close button if present */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="search-ecg-cases-input"
              type="text"
              placeholder="Tìm bệnh, triệu chứng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:bg-white focus:outline-hidden transition-colors"
            />
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shrink-0"
              title="Thu gọn bảng thư viện ca bệnh"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Thu Gọn</span>
            </button>
          )}
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => {
          const count = getCategoryCount(cat.id);
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`filter-case-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                isSelected
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-rose-700 text-rose-100" : "bg-slate-200 text-slate-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Case cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {filteredCases.map((c) => {
          const isSelected = c.id === currentCaseId;
          const severityColors = {
            "Khẩn cấp": "bg-rose-50 text-rose-800 border-rose-200",
            "Nguy kịch": "bg-red-50 text-red-900 border-red-200",
            "Cảnh giác cao": "bg-amber-50 text-amber-900 border-amber-200",
            "Ổn định": "bg-emerald-50 text-emerald-800 border-emerald-200",
          }[c.severity];

          return (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`group flex flex-col justify-between rounded-xl border p-4 cursor-pointer transition-all ${
                isSelected
                  ? "border-rose-600 bg-rose-50/40 shadow-xs ring-2 ring-rose-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${severityColors}`}>
                    {c.severity}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">
                    HR {c.metrics.heartRate} bpm
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition">
                  {c.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <User className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-700">{c.patient.age} tuổi, {c.patient.gender}</span>
                  <span>&bull;</span>
                  <span className="truncate">{c.patient.chiefComplaint}</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-[11px] space-y-1">
                  <div className="font-bold text-slate-900 truncate">
                    {c.diagnosis.primary}
                  </div>
                  <div className="text-slate-500 text-[10px] truncate">
                    {c.learningNotes.chapterRef}
                  </div>
                </div>
              </div>

              <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px]">
                <span className="font-mono text-indigo-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" /> AI {c.diagnosis.confidence.primary}%
                </span>
                <span className="font-semibold text-rose-600 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                  {isSelected ? "Đang Chọn" : "Nạp ECG &rarr;"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sleek Horizontal Quick Case Navigator Bar
// ----------------------------------------------------------------------
interface CaseQuickBarProps {
  currentCase: EcgCase;
  onSelectCase: (c: EcgCase) => void;
  isLibraryOpen: boolean;
  onToggleLibrary: () => void;
}

export function CaseQuickBar({
  currentCase,
  onSelectCase,
  isLibraryOpen,
  onToggleLibrary,
}: CaseQuickBarProps) {
  const currentIndex = CLINICAL_ECG_CASES.findIndex((c) => c.id === currentCase.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + CLINICAL_ECG_CASES.length) % CLINICAL_ECG_CASES.length;
    onSelectCase(CLINICAL_ECG_CASES[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % CLINICAL_ECG_CASES.length;
    onSelectCase(CLINICAL_ECG_CASES[nextIdx]);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs space-y-2.5">
      {/* Upper row: Active case banner + Quick Prev/Next + Expand Library button */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Active Case Tag */}
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
            <FolderHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Ca {currentIndex + 1}/{CLINICAL_ECG_CASES.length}:</span>
            <span className="text-rose-700 font-extrabold">{currentCase.title}</span>
          </div>

          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800">
            {currentCase.severity}
          </span>

          <span className="text-xs font-medium text-slate-500 hidden sm:inline">
            Phân loại: <b className="text-slate-700">{currentCase.category}</b>
          </span>
        </div>

        {/* Right side: Prev/Next & Library toggle */}
        <div className="flex items-center gap-1.5">
          {/* Prev / Next controls */}
          <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50 p-0.5">
            <button
              onClick={handlePrev}
              title="Chuyển sang ca trước"
              className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-bold text-slate-700">
              {currentIndex + 1}/{CLINICAL_ECG_CASES.length}
            </span>
            <button
              onClick={handleNext}
              title="Chuyển sang ca kế tiếp"
              className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Full Library button */}
          <button
            id="toggle-case-library-btn"
            onClick={onToggleLibrary}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              isLibraryOpen
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isLibraryOpen ? "Thu Gọn Thư Viện" : "Thư Viện 10 Ca"}</span>
            {isLibraryOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Lower row: Fast horizontal scrollable pills for all 10 clinical cases */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
        {CLINICAL_ECG_CASES.map((c, idx) => {
          const isSelected = c.id === currentCase.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition shrink-0 border ${
                isSelected
                  ? "bg-rose-600 text-white border-rose-700 shadow-xs font-bold"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300"
              }`}
              title={`${c.title} - ${c.diagnosis.primary}`}
            >
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  isSelected ? "bg-rose-800 text-rose-100" : "bg-slate-200 text-slate-600"
                }`}
              >
                0{idx + 1}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-[180px]">
                {c.diagnosis.primary}
              </span>
              <span
                className={`text-[10px] font-mono ${
                  isSelected ? "text-rose-100" : "text-slate-400"
                }`}
              >
                {c.metrics.heartRate} bpm
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
