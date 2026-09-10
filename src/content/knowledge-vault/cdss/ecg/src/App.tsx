/**
 * CliniPortal CDSS — ECG Master Workstation
 * Path: src/content/knowledge-vault/cdss/ecg/src/App.tsx
 */

import { useState } from "react";
import { CLINICAL_ECG_CASES } from "./data/ecgCases";
import { EcgCase, LeadName, CaliperMeasurement } from "./types";
import { EcgCanvas } from "./components/EcgCanvas";
import { AiDiagnosticEngine } from "./components/AiDiagnosticEngine";
import { BasicGuideSection } from "./components/BasicGuideSection";
import { CaseLibrarySelector, ClinicalCaseBar } from "./components/CaseLibrarySelector";
import { EcgSettingsSection, SettingsSubTab } from "./components/EcgSettingsSection";
import {
  Activity,
  HeartPulse,
  BrainCircuit,
  BookOpen,
  Settings,
  Ruler,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Stethoscope,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
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

  // Active top-level navigation tab
  const [activeTab, setActiveTab] = useState<
    "workstation" | "ai" | "guide" | "settings"
  >("workstation");

  // Toggle for full expandable clinical case library inside workstation
  const [isCaseLibraryOpen, setIsCaseLibraryOpen] = useState(false);

  // Active sub-tab inside settings
  const [settingsSubTab, setSettingsSubTab] = useState<SettingsSubTab>("caliper");

  // Copy SOAP feedback state
  const [copiedSoap, setCopiedSoap] = useState(false);

  const handleUpdateCaliper = (updated: Partial<CaliperMeasurement>) => {
    setCaliperState((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectCase = (newCase: EcgCase) => {
    setCurrentCase(newCase);
    setSelectedLead("All");
  };

  const handleCopySoap = () => {
    const text = `[CDSS ECG MASTER - TÓM TẮT ĐIỆN TÂM ĐỒ]
- Ca bệnh: ${currentCase.title} (Mức độ: ${currentCase.severity})
- Bệnh nhân: ${currentCase.patient.gender}, ${currentCase.patient.age} tuổi | HA: ${currentCase.patient.vitals?.bp || "120/80"}
- Bệnh cảnh: ${currentCase.patient.chiefComplaint}
- Kết luận ECG: ${currentCase.diagnosis.primary}
${currentCase.diagnosis.culpritVesselOrCause ? `- Động mạch thủ phạm: ${currentCase.diagnosis.culpritVesselOrCause}\n` : ""}- Chỉ số: Nhịp ${currentCase.metrics.rhythmType}, HR ${currentCase.metrics.heartRate} bpm, Trục ${currentCase.metrics.alphaAngle}°, PR ${currentCase.metrics.prInterval || 160}ms, QRS ${currentCase.metrics.qrsDuration}ms, QTc ${currentCase.metrics.qtcInterval || 420}ms
- Dấu hiệu then chốt: ${currentCase.diagnosis.keyFindings.join("; ")}
- Hướng xử trí: ${currentCase.diagnosis.treatment.join("; ")}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopiedSoap(true);
      setTimeout(() => setCopiedSoap(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-colors duration-150">
      {/* Top Application Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            {/* Brand / Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-xs">
                <HeartPulse className="h-5 w-5 shrink-0" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                    ECG MASTER
                  </span>
                  <span className="rounded-md bg-rose-50 border border-rose-200 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 uppercase tracking-wide">
                    12 Đạo Trình &amp; AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Chuyên khảo BS Nguyễn Tôn Kinh Thi &amp; Phân tích điện tâm đồ AI
                </p>
              </div>
            </div>

            {/* Navigation Tabs (Single Clean Label, No Duplication, Horizontal Align) */}
            <nav className="flex items-center gap-1 overflow-x-auto py-1">
              {[
                { id: "workstation", label: "ECG & Ca Bệnh", icon: Activity },
                { id: "ai", label: "Chẩn Đoán AI", icon: BrainCircuit },
                { id: "guide", label: "Sổ Tay 10 Bước", icon: BookOpen },
                { id: "settings", label: "Thước Đo & Trục", icon: Ruler },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    id={`nav-tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-rose-600 text-white shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Unified Clinical Patient & Case Command Bar */}
      <ClinicalCaseBar
        currentCase={currentCase}
        onSelectCase={handleSelectCase}
        isLibraryOpen={isCaseLibraryOpen}
        onToggleLibrary={() => {
          if (activeTab !== "workstation") {
            setActiveTab("workstation");
          }
          setIsCaseLibraryOpen((prev) => !prev);
        }}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 space-y-5">
        {/* VIEW 1: Primary Workstation (Merged ECG Canvas + Integrated Clinical Cases) */}
        {activeTab === "workstation" && (
          <div className="space-y-5">
            {/* Expandable Full Case Library Selector */}
            {isCaseLibraryOpen && (
              <CaseLibrarySelector
                currentCaseId={currentCase.id}
                onSelectCase={(c) => {
                  handleSelectCase(c);
                  setIsCaseLibraryOpen(false);
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

            {/* Diagnostic Bento Grid: 3 Modern Clinical Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              {/* Card 1: Automated Diagnosis & Culprit Vessel (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Kết Luận Điện Tâm Đồ</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI Khớp: {currentCase.diagnosis.confidence.primary}%
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
                  <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wide">
                    CHẨN ĐOÁN LÂM SÀNG:
                  </div>
                  <div className="text-base font-black text-slate-900 leading-snug">
                    {currentCase.diagnosis.primary}
                  </div>

                  {currentCase.diagnosis.culpritVesselOrCause && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Stethoscope className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Thủ phạm: <b>{currentCase.diagnosis.culpritVesselOrCause}</b></span>
                    </div>
                  )}
                </div>

                {/* Key Findings */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wide">
                    Dấu hiệu then chốt trên 12 đạo trình:
                  </div>
                  <ul className="space-y-1.5">
                    {currentCase.diagnosis.keyFindings.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <button
                    onClick={handleCopySoap}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                  >
                    {copiedSoap ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-emerald-700">Đã Sao Chép SOAP!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>Chép Tóm Tắt SOAP</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab("ai")}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    <span>Phân tích AI sâu</span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Card 2: 6 Electrophysiological Metrics (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Activity className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Bộ 6 Chỉ Số Điện Thế</span>
                  </div>
                  <button
                    onClick={() => {
                      setSettingsSubTab("caliper");
                      setActiveTab("settings");
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-600 transition"
                  >
                    Tính QTc &amp; Trục &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-slate-500 text-[10px] font-medium">Nhịp Cơ Bản</div>
                    <div className="font-bold text-slate-900 mt-1 truncate" title={currentCase.metrics.rhythmType}>
                      {currentCase.metrics.rhythmType}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-200/80">
                    <div className="text-rose-700 text-[10px] font-medium">Tần Số Tim</div>
                    <div className="font-mono font-black text-rose-700 text-sm mt-0.5">
                      {currentCase.metrics.heartRate} <span className="text-[10px] font-bold">bpm</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-slate-500 text-[10px] font-medium">Trục Alpha</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {currentCase.metrics.alphaAngle}°
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-slate-500 text-[10px] font-medium">Khoảng PR</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {currentCase.metrics.prInterval ? `${currentCase.metrics.prInterval} ms` : "160 ms"}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-slate-500 text-[10px] font-medium">Phức Bộ QRS</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {currentCase.metrics.qrsDuration} ms
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-slate-500 text-[10px] font-medium">Khoảng QTc</div>
                    <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                      {currentCase.metrics.qtcInterval ? `${currentCase.metrics.qtcInterval} ms` : "420 ms"}
                    </div>
                  </div>
                </div>

                {/* Live Caliper Quick Status Widget */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-xs space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 font-bold text-amber-950 text-[11px]">
                    <Ruler className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Thước Đo Compa (Caliper Hiện Tại)</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-amber-900 pt-0.5">
                    <span>Thời gian: <b>{caliperState.deltaMs} ms</b></span>
                    <span>Tần số: <b>{caliperState.deltaBpm} l/p</b></span>
                    <span>Biên độ: <b>{caliperState.deltaMv} mV</b></span>
                  </div>
                </div>
              </div>

              {/* Card 3: Emergency Actions & Dr. Thi Clinical Pearls (3 cols) */}
              <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Xử Trí Cấp Cứu</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    {currentCase.severity}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs">
                  {currentCase.diagnosis.treatment.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{act}</span>
                    </li>
                  ))}
                </ul>

                {/* Practical Clinical Pearl */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 font-bold text-slate-900 text-[11px]">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Kinh Nghiệm Thực Hành ({currentCase.learningNotes.chapterRef})</span>
                  </div>
                  <p className="text-slate-600 leading-snug">
                    {currentCase.learningNotes.coreTakeaway}
                  </p>
                  <p className="text-amber-900 font-medium text-[11px]">
                    ⚠️ <b>Cạm bẫy:</b> {currentCase.learningNotes.pitfallToAvoid}
                  </p>
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
      <footer className="border-t border-slate-200 bg-white py-3 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span><b>ECG MASTER</b> • Hệ Thống Phân Tích Điện Tâm Đồ 12 Chuyển Đạo &amp; Học Sâu Y Khoa</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Biên soạn theo tài liệu <i>&quot;Đọc Điện tâm đồ dễ hơn&quot;</i> — BS Nguyễn Tôn Kinh Thi
          </div>
        </div>
      </footer>
    </div>
  );
}
