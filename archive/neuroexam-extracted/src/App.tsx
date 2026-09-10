/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Brain,
  Stethoscope,
  Eye,
  Calculator,
  Sparkles,
  Layers,
  Footprints,
  ShieldAlert,
  Menu,
  X,
  HeartPulse,
  Info,
  ChevronRight,
  Sun,
  GitBranch,
  Activity,
  Split
} from "lucide-react";

import { ExamGuideViewer } from "./components/exam/ExamGuideViewer";
import { OcularMotilitySimulator } from "./components/visualizers/OcularMotilitySimulator";
import { PupillaryReflexSimulator } from "./components/visualizers/PupillaryReflexSimulator";
import { DermatomeSpinalVisualizer } from "./components/visualizers/DermatomeSpinalVisualizer";
import { GaitSimulator } from "./components/visualizers/GaitSimulator";
import { BrainHerniationVisualizer } from "./components/visualizers/BrainHerniationVisualizer";
import { BedsideCalculators } from "./components/bedside/BedsideCalculators";
import { ClinicalPearlsBank } from "./components/knowledge/ClinicalPearlsBank";
import { MovementDisordersEngine } from "./components/engine/MovementDisordersEngine";
import { EmergencyComaProtocol } from "./components/emergency/EmergencyComaProtocol";
import { BrainstemSyndromesModule } from "./components/brainstem/BrainstemSyndromesModule";

type AppView = "visualizers" | "brainstem-syndromes" | "movement-engine" | "emergency-coma" | "guide" | "calculators" | "pearls";
type VisualizerTab = "eye" | "pupil" | "dermatome" | "gait" | "herniation";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("visualizers");
  const [activeVisualizerTab, setActiveVisualizerTab] = useState<VisualizerTab>("herniation");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Jump directly to a specific visualizer from other views
  const handleOpenVisualizer = (tab: VisualizerTab) => {
    setActiveVisualizerTab(tab);
    setCurrentView("visualizers");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white pb-20 md:pb-8">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center shadow-md shadow-teal-700/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight">
                  NeuroExam <span className="text-teal-600">Pro</span>
                </h1>
                <span className="text-[10px] font-mono font-bold bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 hidden sm:inline-block">
                  LÂM SÀNG THẦN KINH
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1 hidden xs:block">
                Quy trình khám thần kinh chuẩn & Ngân hàng kinh nghiệm chuyên khoa
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setCurrentView("visualizers")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "visualizers"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Eye className="w-4 h-4" />
              Mô Phỏng 2D
            </button>

            <button
              onClick={() => setCurrentView("movement-engine")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "movement-engine"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <GitBranch className="w-4 h-4" />
              Rối Loạn Vận Động
            </button>

            <button
              onClick={() => setCurrentView("brainstem-syndromes")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "brainstem-syndromes"
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Split className="w-4 h-4" />
              Thân Não Bắt Chéo
            </button>

            <button
              onClick={() => setCurrentView("emergency-coma")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "emergency-coma"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Hôn Mê & JCS
            </button>

            <button
              onClick={() => setCurrentView("guide")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "guide"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              Khám Thần Kinh
            </button>

            <button
              onClick={() => setCurrentView("calculators")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "calculators"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Calculator className="w-4 h-4" />
              Thang Điểm
            </button>

            <button
              onClick={() => setCurrentView("pearls")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === "pearls"
                  ? "bg-amber-500 text-white font-bold shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Kinh Nghiệm
            </button>
          </nav>

          {/* Quick Red Flag Ticker (Desktop only) */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-rose-50 px-3 py-1 rounded-full border border-rose-200 text-rose-700 font-medium">
            <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
            <span className="font-mono text-[11px]">
              Thời gian là Não (Time is Brain)
            </span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1.5 shadow-md">
            <button
              onClick={() => {
                setCurrentView("visualizers");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "visualizers" ? "bg-teal-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Mô Phỏng Trực Quan 2D (Mắt, Khoanh da, Dáng đi, Tụt não)</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("movement-engine");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "movement-engine" ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <GitBranch className="w-4 h-4" />
              <span>Cây Phân Loại Rối Loạn Vận Động (Shibasaki - Hallett)</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("brainstem-syndromes");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "brainstem-syndromes" ? "bg-sky-700 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Split className="w-4 h-4" />
              <span>Hội Chứng Thân Não Bắt Chéo & Một Rưỡi (Table 8-1, Fig 9-5)</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("emergency-coma");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "emergency-coma" ? "bg-rose-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Cấp Cứu Hôn Mê & Japan Coma Scale (JCS 3-3-9)</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("guide");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "guide" ? "bg-teal-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Hướng Dẫn Thăm Khám Thần Kinh Chuẩn</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("calculators");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "calculators" ? "bg-teal-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Thang Điểm Nhanh & Liều Thuốc</span>
            </button>

            <button
              onClick={() => {
                setCurrentView("pearls");
                setMobileMenuOpen(false);
              }}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 text-left ${
                currentView === "pearls" ? "bg-amber-500 text-white font-bold" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Kho Kinh Nghiệm Y Khoa (Clinical Pearls)</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* VIEW 1: 2D/3D VISUALIZERS SUITE (NOW FIRST) */}
        {currentView === "visualizers" && (
          <div className="space-y-6">
            {/* Visualizer Category Sub-tabs (Streamlined & Compact) */}
            <div className="bg-white border border-slate-200/90 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto shadow-2xs">
              <button
                onClick={() => setActiveVisualizerTab("herniation")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  activeVisualizerTab === "herniation"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>5 Thoát Vị Não & Cushing</span>
              </button>

              <button
                onClick={() => setActiveVisualizerTab("eye")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  activeVisualizerTab === "eye"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Vận Nhãn (Dây III, IV, VI)</span>
              </button>

              <button
                onClick={() => setActiveVisualizerTab("pupil")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  activeVisualizerTab === "pupil"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Đồng Tử & PX Ánh Sáng</span>
              </button>

              <button
                onClick={() => setActiveVisualizerTab("dermatome")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  activeVisualizerTab === "dermatome"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Khoanh Da (C2 - S5)</span>
              </button>

              <button
                onClick={() => setActiveVisualizerTab("gait")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  activeVisualizerTab === "gait"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Footprints className="w-4 h-4" />
                <span>6 Dáng Đi Thần Kinh (2D)</span>
              </button>
            </div>

            {/* Render selected visualizer */}
            {activeVisualizerTab === "eye" && <OcularMotilitySimulator />}
            {activeVisualizerTab === "pupil" && <PupillaryReflexSimulator />}
            {activeVisualizerTab === "dermatome" && <DermatomeSpinalVisualizer />}
            {activeVisualizerTab === "gait" && <GaitSimulator />}
            {activeVisualizerTab === "herniation" && <BrainHerniationVisualizer />}
          </div>
        )}

        {/* VIEW 2: MOVEMENT DISORDERS ENGINE (SHIBASAKI - HALLETT) */}
        {currentView === "movement-engine" && <MovementDisordersEngine />}

        {/* VIEW 3: BRAINSTEM CROSSED SYNDROMES & ONE-AND-A-HALF (TABLE 8-1, FIG 9-5) */}
        {currentView === "brainstem-syndromes" && <BrainstemSyndromesModule />}

        {/* VIEW 4: EMERGENCY COMA PROTOCOL & JAPAN COMA SCALE */}
        {currentView === "emergency-coma" && <EmergencyComaProtocol />}

        {/* VIEW 5: EXAM GUIDE (REDESIGNED WITH CLINICAL ILLUSTRATIONS) */}
        {currentView === "guide" && (
          <ExamGuideViewer onOpenVisualizer={handleOpenVisualizer} />
        )}

        {/* VIEW 6: BEDSIDE QUICK CALCULATORS */}
        {currentView === "calculators" && <BedsideCalculators />}

        {/* VIEW 7: CLINICAL PEARLS BANK */}
        {currentView === "pearls" && <ClinicalPearlsBank />}
      </main>

      {/* Mobile-First Sticky Bottom Navigation Bar (Essential for Bedside Lookup) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 z-50 px-1 py-1 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setCurrentView("visualizers")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "visualizers" ? "text-teal-600 font-bold" : "text-slate-500"
          }`}
        >
          <Eye className="w-4 h-4 mb-0.5" />
          <span>Mô Phỏng</span>
        </button>

        <button
          onClick={() => setCurrentView("movement-engine")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "movement-engine" ? "text-indigo-600 font-bold" : "text-slate-500"
          }`}
        >
          <GitBranch className="w-4 h-4 mb-0.5" />
          <span>Vận Động</span>
        </button>

        <button
          onClick={() => setCurrentView("brainstem-syndromes")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "brainstem-syndromes" ? "text-sky-700 font-bold" : "text-slate-500"
          }`}
        >
          <Split className="w-4 h-4 mb-0.5" />
          <span>Thân Não</span>
        </button>

        <button
          onClick={() => setCurrentView("emergency-coma")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "emergency-coma" ? "text-rose-600 font-bold" : "text-slate-500"
          }`}
        >
          <ShieldAlert className="w-4 h-4 mb-0.5" />
          <span>Hôn Mê</span>
        </button>

        <button
          onClick={() => setCurrentView("calculators")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "calculators" ? "text-teal-600 font-bold" : "text-slate-500"
          }`}
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span>Thang Điểm</span>
        </button>

        <button
          onClick={() => setCurrentView("pearls")}
          className={`flex flex-col items-center justify-center p-1 rounded-lg text-[9px] font-medium transition-all ${
            currentView === "pearls" ? "text-amber-600 font-bold" : "text-slate-500"
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>Kinh Nghiệm</span>
        </button>
      </div>
    </div>
  );
}
