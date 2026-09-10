/**
 * CliniPortal CDSS — ECG Case Library Selector & Command Bar
 * Path: src/content/knowledge-vault/cdss/ecg/src/components/CaseLibrarySelector.tsx
 */

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
  Layers,
  Stethoscope,
  AlertTriangle,
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md space-y-4 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs shrink-0">
            <FolderHeart className="h-5 w-5 shrink-0" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Kho Tàng {CLINICAL_ECG_CASES.length} Tình Huống Lâm Sàng &amp; Phân Tích Thực Tế
              </h3>
              <span className="hidden sm:inline-block text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 uppercase tracking-wide">
                Chuyên Khảo Giảng Dạy
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Bộ dữ liệu điện tâm đồ thực chứng đối chiếu trường phái BS Nguyễn Tôn Kinh Thi &amp; AHA/ESC Guidelines.
            </p>
          </div>
        </div>

        {/* Right action tools: Search + Close button if present */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 shrink-0" />
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
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shrink-0"
              title="Thu gọn bảng thư viện ca bệnh"
            >
              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
              <span>Thu Gọn</span>
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
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 max-h-[60vh] overflow-y-auto pr-1">
        {filteredCases.map((c) => {
          const isSelected = c.id === currentCaseId;
          const severityColors = {
            "Khẩn cấp": "bg-rose-50 text-rose-800 border-rose-200",
            "Nguy kịch": "bg-red-50 text-red-900 border-red-300 font-bold",
            "Cảnh giác cao": "bg-amber-50 text-amber-900 border-amber-200",
            "Ổn định": "bg-emerald-50 text-emerald-800 border-emerald-200",
          }[c.severity];

          return (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`group flex flex-col justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                isSelected
                  ? "border-rose-600 bg-rose-50/50 shadow-xs ring-2 ring-rose-500/20"
                  : "border-slate-200 bg-white hover:border-rose-300 hover:shadow-xs"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] border ${severityColors}`}>
                    {(c.severity === "Nguy kịch" || c.severity === "Khẩn cấp") && (
                      <span className="cardiac-pulse-dot shrink-0" style={{ width: 6, height: 6 }} />
                    )}
                    <span>{c.severity}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    HR {c.metrics.heartRate} bpm
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-rose-600 transition">
                  {c.title}
                </h4>

                <div className="flex items-center gap-1 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                    Bệnh cảnh:
                  </span>
                  <span className="shrink-0">{c.patient.gender} {c.patient.age}T</span>
                  <span className="text-slate-400">&bull;</span>
                  <span className="truncate">{c.patient.chiefComplaint}</span>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/80 text-[11px] space-y-0.5">
                  <div className="font-bold text-slate-900 truncate">
                    {c.diagnosis.primary}
                  </div>
                  <div className="text-slate-500 text-[10px] truncate">
                    {c.learningNotes.chapterRef}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                <span className="font-mono text-indigo-700 font-semibold inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                  <span>AI {c.diagnosis.confidence.primary}%</span>
                </span>
                <span className="font-bold text-rose-600 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
                  {isSelected ? "Đang Khảo Sát" : "Nạp ECG &rarr;"}
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
// Unified Clinical Case & Patient Header Bar
// ----------------------------------------------------------------------
interface ClinicalCaseBarProps {
  currentCase: EcgCase;
  onSelectCase: (c: EcgCase) => void;
  isLibraryOpen: boolean;
  onToggleLibrary: () => void;
}

export function ClinicalCaseBar({
  currentCase,
  onSelectCase,
  isLibraryOpen,
  onToggleLibrary,
}: ClinicalCaseBarProps) {
  const currentIndex = CLINICAL_ECG_CASES.findIndex((c) => c.id === currentCase.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + CLINICAL_ECG_CASES.length) % CLINICAL_ECG_CASES.length;
    onSelectCase(CLINICAL_ECG_CASES[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % CLINICAL_ECG_CASES.length;
    onSelectCase(CLINICAL_ECG_CASES[nextIdx]);
  };

  const severityBadgeClass = {
    "Khẩn cấp": "bg-rose-100 text-rose-800 border-rose-300",
    "Nguy kịch": "bg-red-100 text-red-900 border-red-400 font-bold",
    "Cảnh giác cao": "bg-amber-100 text-amber-900 border-amber-300",
    "Ổn định": "bg-emerald-100 text-emerald-800 border-emerald-300",
  }[currentCase.severity] || "bg-slate-100 text-slate-800 border-slate-300";

  return (
    <section className="border-b border-slate-200 bg-white px-3 sm:px-6 lg:px-8 py-2 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs">
        {/* Left: Teaching Case & Vignette summary */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 font-medium text-slate-800 bg-slate-100/90 border border-slate-200 px-2.5 py-1 rounded-lg">
            <span className="bg-rose-600 text-white font-mono font-bold text-[10px] px-1.5 py-0.5 rounded shadow-2xs">
              CA MẪU #{currentIndex + 1}
            </span>
            <span className="font-bold text-slate-900">{currentCase.diagnosis.primary}</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-slate-600 font-medium">
              {currentCase.patient.gender} {currentCase.patient.age}T (HA {currentCase.patient.vitals?.bp || "120/80"})
            </span>
          </div>

          <div className="hidden lg:inline-flex items-center gap-1 text-slate-600 px-1">
            <span className="text-slate-400 font-medium">Bệnh cảnh:</span>
            <span className="text-slate-800 font-medium truncate max-w-xs xl:max-w-md">
              {currentCase.patient.chiefComplaint}
            </span>
          </div>
        </div>

        {/* Center: Case Stepper & Dropdown Selector */}
        <div className="flex items-center gap-2">
          {/* Prev / Next Stepper */}
          <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50 p-0.5 shadow-2xs">
            <button
              id="prev-case-stepper-btn"
              onClick={handlePrev}
              title="Chuyển sang ca trước"
              className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5 shrink-0" />
            </button>

            {/* Smart Case Dropdown Picker */}
            <select
              id="quick-case-dropdown-picker"
              value={currentCase.id}
              onChange={(e) => {
                const found = CLINICAL_ECG_CASES.find((c) => c.id === e.target.value);
                if (found) onSelectCase(found);
              }}
              className="bg-transparent px-2 py-0.5 text-xs font-bold text-slate-800 focus:outline-hidden cursor-pointer max-w-[200px] sm:max-w-[260px] truncate"
              title={`Chọn trực tiếp một trong ${CLINICAL_ECG_CASES.length} ca lâm sàng`}
            >
              {CLINICAL_ECG_CASES.map((c, i) => (
                <option key={c.id} value={c.id}>
                  Ca {i + 1}: {c.diagnosis.primary} ({c.severity})
                </option>
              ))}
            </select>

            <button
              id="next-case-stepper-btn"
              onClick={handleNext}
              title="Chuyển sang ca kế tiếp"
              className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            >
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* Severity Tag */}
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${severityBadgeClass}`}>
            {(currentCase.severity === "Nguy kịch" || currentCase.severity === "Khẩn cấp") && (
              <span className="cardiac-pulse-dot shrink-0" style={{ width: 6, height: 6 }} />
            )}
            <span>{currentCase.severity}</span>
          </span>
        </div>

        {/* Right: Heart rate & Toggle Full Library Button */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg font-mono text-rose-900">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="font-bold">{currentCase.metrics.heartRate}</span>
            <span className="text-[10px] text-rose-600">bpm</span>
          </div>

          <button
            id="toggle-case-library-btn"
            onClick={onToggleLibrary}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
              isLibraryOpen
                ? "bg-rose-600 border-rose-700 text-white shadow-xs"
                : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
            }`}
            title={`Mở bảng tìm kiếm và phân loại ${CLINICAL_ECG_CASES.length} ca cấp cứu tim mạch`}
          >
            <Layers className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Thư Viện ({CLINICAL_ECG_CASES.length} Ca)</span>
            {isLibraryOpen ? (
              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export const CaseQuickBar = ClinicalCaseBar;
