/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { CLINICAL_ECG_CASES } from "./data/ecgCases";
import { EcgCase, LeadName, CaliperMeasurement } from "./types";
import { EcgCanvas } from "./components/EcgCanvas";
import { AiDiagnosticEngine } from "./components/AiDiagnosticEngine";
import { BasicGuideSection } from "./components/BasicGuideSection";
import { CaseLibrarySelector, CaseQuickBar } from "./components/CaseLibrarySelector";
import { EcgSettingsSection, SettingsSubTab } from "./components/EcgSettingsSection";
import {
  Activity,
  HeartPulse,
  BrainCircuit,
  BookOpen,
  FolderHeart,
  Settings,
  Ruler,
  AlertTriangle,
  User,
  Clock,
  Sparkles,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function App() {
  // Active clinical case
  const [currentCase, setCurrentCase] = useState<EcgCase>(CLINICAL_ECG_CASES[0]);

  // Selected lead for inspection or "All"
  const [selectedLead, setSelectedLead] = useState<LeadName | "All">("All");

  // Caliper measurement tool state
  const [caliperState, setCaliperState] = useState<CaliperMeasurement>({
    active: false,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    deltaMs: 0,
    deltaBpm: 0,
    deltaMv: 0,
  });

  // Active top-level navigation tab (merged workstation + cases)
  const [activeTab, setActiveTab] = useState<
    "workstation" | "ai" | "guide" | "settings"
  >("workstation");

  // Toggle for full expandable clinical case library inside workstation
  const [isCaseLibraryOpen, setIsCaseLibraryOpen] = useState(false);

  // Active sub-tab inside settings
  const [settingsSubTab, setSettingsSubTab] = useState<SettingsSubTab>("caliper");

  const currentCaseIndex = CLINICAL_ECG_CASES.findIndex((c) => c.id === currentCase.id);

  const handlePrevCase = () => {
    const prevIndex = (currentCaseIndex - 1 + CLINICAL_ECG_CASES.length) % CLINICAL_ECG_CASES.length;
    handleSelectCase(CLINICAL_ECG_CASES[prevIndex]);
  };

  const handleNextCase = () => {
    const nextIndex = (currentCaseIndex + 1) % CLINICAL_ECG_CASES.length;
    handleSelectCase(CLINICAL_ECG_CASES[nextIndex]);
  };

  const handleUpdateCaliper = (updated: Partial<CaliperMeasurement>) => {
    setCaliperState((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectCase = (newCase: EcgCase) => {
    setCurrentCase(newCase);
    setSelectedLead("All");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Brand / Logo */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-xs">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    ECG MASTER
                  </h1>
                  <span className="hidden sm:inline-block rounded-md bg-rose-50 border border-rose-200/70 px-2 py-0.5 text-[10px] font-bold text-rose-700 uppercase tracking-wide">
                    12 Chuyển Đạo &amp; AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block">
                  Hệ thống chẩn đoán điện tâm đồ &amp; chuyên khảo BS Nguyễn Tôn Kinh Thi
                </p>
              </div>
            </div>

            {/* Navigation Tabs (Unified: Workstation + Cases merged) */}
            <nav className="flex items-center gap-1 overflow-x-auto py-1">
              {[
                { id: "workstation", label: "Màn Hình ECG & Ca Lâm Sàng", shortLabel: "ECG & Ca Bệnh", icon: Activity },
                { id: "ai", label: "Chẩn Đoán Học Sâu AI", shortLabel: "Chẩn Đoán AI", icon: BrainCircuit },
                { id: "guide", label: "Hướng Dẫn Đọc Căn Bản", shortLabel: "Sổ Tay BS Thi", icon: BookOpen },
                { id: "settings", label: "Cài Đặt", shortLabel: "Cài Đặt", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden lg:inline">{tab.label}</span>
                    <span className="lg:hidden">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Clinical Patient Context Ribbon */}
      <section className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Patient demographic & Chief complaint */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 font-medium text-slate-800 bg-slate-100/90 border border-slate-200 px-2.5 py-1 rounded-lg">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-bold text-slate-900">{currentCase.patient.name}</span>
              <span className="text-slate-400">&bull;</span>
              <span>{currentCase.patient.age} tuổi, {currentCase.patient.gender}</span>
              <span className="text-slate-400">&bull;</span>
              <span className="font-mono font-bold text-slate-700">HA {currentCase.patient.vitals?.bp || "120/80"}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 text-slate-600 px-1">
              <span className="text-slate-400 font-medium">Bệnh cảnh:</span>
              <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-sm">
                {currentCase.patient.chiefComplaint}
              </span>
            </div>
          </div>

          {/* Right: Quick Vitals & Case Switcher Pagination */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200/80 px-2.5 py-1 rounded-lg font-mono text-rose-900">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span className="font-bold">{currentCase.metrics.heartRate}</span>
              <span className="text-[10px] text-rose-700">l/p</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/80 px-2.5 py-1 rounded-lg text-indigo-950 font-medium">
              <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-bold text-xs">{currentCase.diagnosis.primary}</span>
            </div>

            {/* Quick Prev / Next Case Navigation & Case Library Toggle */}
            <div className="inline-flex items-center rounded-lg border border-slate-300 bg-slate-50 p-0.5">
              <button
                onClick={handlePrevCase}
                title="Ca trước"
                className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  if (activeTab !== "workstation") {
                    setActiveTab("workstation");
                  }
                  setIsCaseLibraryOpen((prev) => !prev);
                }}
                title="Mở hoặc thu gọn danh sách 10 ca lâm sàng"
                className="px-2 py-0.5 text-[11px] font-bold text-slate-700 hover:text-rose-600 transition flex items-center gap-1"
              >
                <span>Ca {currentCaseIndex + 1}/{CLINICAL_ECG_CASES.length}</span>
                {isCaseLibraryOpen ? (
                  <ChevronUp className="w-3 h-3 text-rose-600" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                )}
              </button>

              <button
                onClick={handleNextCase}
                title="Ca kế tiếp"
                className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* VIEW 1: Primary Workstation (Merged ECG Canvas + Integrated Clinical Cases) */}
        {activeTab === "workstation" && (
          <div className="space-y-5">
            {/* Integrated Case Quick Navigator Bar */}
            <CaseQuickBar
              currentCase={currentCase}
              onSelectCase={handleSelectCase}
              isLibraryOpen={isCaseLibraryOpen}
              onToggleLibrary={() => setIsCaseLibraryOpen((prev) => !prev)}
            />

            {/* Expandable Full Case Library Selector */}
            {isCaseLibraryOpen && (
              <CaseLibrarySelector
                currentCaseId={currentCase.id}
                onSelectCase={(c) => {
                  handleSelectCase(c);
                }}
                onClose={() => setIsCaseLibraryOpen(false)}
              />
            )}

            {/* 12-Lead Paper Canvas */}
            <EcgCanvas
              currentCase={currentCase}
              caliperState={caliperState}
              onUpdateCaliper={handleUpdateCaliper}
              selectedLead={selectedLead}
              onSelectLead={setSelectedLead}
            />

            {/* Sub-grid: Clinical Findings, Diagnostic Panel, Caliper Tool & Triage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Left 2 Cols: Automated Diagnostic Summary */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Chẩn Đoán Tự Động &amp; Các Chỉ Số Điện Học
                      </h3>
                    </div>
                    <button
                      id="view-full-ai-btn"
                      onClick={() => setActiveTab("ai")}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
                    >
                      Hỏi Đáp Sâu Cùng AI &rarr;
                    </button>
                  </div>

                  {/* Primary Diagnosis Headline */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wide">
                        KẾT LUẬN ĐIỆN TÂM ĐỒ:
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Phân loại: {currentCase.category}
                      </span>
                    </div>
                    <div className="text-base font-black text-slate-900">
                      {currentCase.diagnosis.primary}
                    </div>
                    {currentCase.diagnosis.culpritVesselOrCause && (
                      <div className="text-xs text-slate-600 font-medium">
                        <b>Động mạch thủ phạm / Căn nguyên:</b> {currentCase.diagnosis.culpritVesselOrCause}
                      </div>
                    )}
                  </div>

                  {/* 6 Key ECG Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Nhịp Cơ Bản</div>
                      <div className="font-bold text-slate-800 truncate mt-0.5">{currentCase.metrics.rhythmType}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Tần Số Tim</div>
                      <div className="font-bold text-rose-600 font-mono mt-0.5">{currentCase.metrics.heartRate} bpm</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Trục Alpha</div>
                      <div className="font-bold text-slate-800 font-mono mt-0.5">{currentCase.metrics.alphaAngle}°</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Khoảng PR</div>
                      <div className="font-bold text-slate-800 font-mono mt-0.5">{currentCase.metrics.prInterval ? `${currentCase.metrics.prInterval} ms` : "160 ms"}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Phức Bộ QRS</div>
                      <div className="font-bold text-slate-800 font-mono mt-0.5">{currentCase.metrics.qrsDuration} ms</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-slate-400 text-[10px] font-medium">Khoảng QTc</div>
                      <div className="font-bold text-slate-800 font-mono mt-0.5">{currentCase.metrics.qtcInterval ? `${currentCase.metrics.qtcInterval} ms` : "420 ms"}</div>
                    </div>
                  </div>

                  {/* Key Findings List */}
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="font-bold text-slate-900">Dấu hiệu nhận diện then chốt:</div>
                    <ul className="space-y-1 pl-1">
                      {currentCase.diagnosis.keyFindings.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Practical Clinical Pearls from BS Nguyễn Tôn Kinh Thi */}
                <div className="rounded-xl border border-amber-200/90 bg-amber-50/40 p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-amber-950">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      Ghi Nhớ Thực Hành ({currentCase.learningNotes.chapterRef})
                    </span>
                    <button
                      onClick={() => setActiveTab("guide")}
                      className="text-[11px] text-amber-800 font-semibold hover:underline"
                    >
                      Mở Sổ Tay ECG &rarr;
                    </button>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {currentCase.learningNotes.coreTakeaway}
                  </p>
                  <p className="text-amber-900 font-medium">
                    ⚠️ <b>Cạm bẫy lâm sàng:</b> {currentCase.learningNotes.pitfallToAvoid}
                  </p>
                </div>
              </div>

              {/* Right 1 Col: Quick Caliper Measurement status & Actions */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    <Ruler className="w-4 h-4 text-amber-600" />
                    Thước Đo Compa (Caliper)
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bật thước đo trên thanh công cụ canvas, sau đó kéo chuột giữa 2 điểm sóng để đo khoảng cách thời gian và biên độ điện thế.
                  </p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Khoảng thời gian:</span>
                      <span className="font-bold text-slate-900">{caliperState.deltaMs} ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tần số tương ứng:</span>
                      <span className="font-bold text-rose-600">{caliperState.deltaBpm} l/p</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biên độ điện thế:</span>
                      <span className="font-bold text-blue-600">{caliperState.deltaMv} mV</span>
                    </div>
                  </div>

                  <button
                    id="open-axis-tool-btn"
                    onClick={() => {
                      setSettingsSubTab("caliper");
                      setActiveTab("settings");
                    }}
                    className="w-full py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Mở Bộ Tính Trục Alpha &amp; QTc Đầy Đủ &rarr;
                  </button>
                </div>

                {/* Emergency Triage Checklist */}
                <div className="rounded-xl border border-rose-200 bg-white p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Xử Trí Khẩn Cấp Ca Này
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {currentCase.diagnosis.treatment.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: AI Deep Learning Diagnostic Engine */}
        {activeTab === "ai" && (
          <AiDiagnosticEngine currentCase={currentCase} />
        )}

        {/* VIEW 3: Dedicated Basic ECG Reading Guide (BS Nguyễn Tôn Kinh Thi) */}
        {activeTab === "guide" && (
          <BasicGuideSection />
        )}

        {/* VIEW 4: Unified Settings Hub (Thước Đo & Trục, Mô Phỏng Sóng, Cấu Hình Máy) */}
        {activeTab === "settings" && (
          <EcgSettingsSection
            currentCase={currentCase}
            caliperState={caliperState}
            onUpdateCaliper={handleUpdateCaliper}
            onApplyCustomCase={(newCase) => {
              handleSelectCase(newCase);
              setActiveTab("workstation");
            }}
            defaultSubTab={settingsSubTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <b>ECG MASTER</b> • Hệ Thống Phân Tích Điện Tâm Đồ 12 Chuyển Đạo &amp; Học Sâu Y Khoa
          </div>
          <div className="text-[11px] text-slate-400">
            Biên soạn &amp; phát triển dựa trên tài liệu <i>&quot;Đọc Điện tâm đồ dễ hơn&quot;</i> - BS Nguyễn Tôn Kinh Thi
          </div>
        </div>
      </footer>
    </div>
  );
}

