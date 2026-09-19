/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { PatientSidebar } from './components/PatientSidebar';
import { AntibioticSearch } from './components/AntibioticSearch';
import { DosingRecommendationCard } from './components/DosingRecommendationCard';
import { RenalAdjustmentTable } from './components/RenalAdjustmentTable';
import { DialysisPanel } from './components/DialysisPanel';
import { DrugInteractionChecker } from './components/DrugInteractionChecker';
import { ClinicalNotesTiers } from './components/ClinicalNotesTiers';
import { ReferencesList } from './components/ReferencesList';
import { AmrModal } from './components/AmrModal';
import { OriginalPreviewModal } from './components/OriginalPreviewModal';
import { PdfConsultationModal } from './components/PdfConsultationModal';

import { 
  Pill, 
  Droplets, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  LayoutGrid,
  Bug,
  ChevronDown
} from 'lucide-react';

import { Language, PatientState } from './types';
import { ANTIBIOTICS } from './data/antibiotics';
import { DRUG_INTERACTIONS } from './data/drugInteractions';
import { calculateRenalMetrics } from './utils/clinicalFormulas';
import { extractDrugData, calculateDose } from './utils/drugDataExtractor';
import { ConsultationReportData } from './utils/pdfGenerator';

const DEFAULT_PATIENT: PatientState = {
  scr: 90,
  scrUnit: 'umol',
  age: 60,
  gender: 'm',
  weight: 60,
  height: 165,
  dialysis: 'none',
  patientName: 'Nguyễn Văn An',
  patientId: 'BN-882910',
  department: 'Hồi sức tích cực (ICU)',
  diagnosis: 'Viêm phổi bệnh viện (HAP/VAP) / Nhiễm khuẩn huyết'
};

type ViewSectionTab = 'all' | 'dosing' | 'dialysis' | 'ddi' | 'notes' | 'refs';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [patient, setPatient] = useState<PatientState>(DEFAULT_PATIENT);
  const [selectedDrugId, setSelectedDrugId] = useState<string>('meropenem');
  const [selectedScenario, setSelectedScenario] = useState<string>('standard');
  const [activeTab, setActiveTab] = useState<ViewSectionTab>('all');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Modals
  const [isAmrOpen, setIsAmrOpen] = useState(false);
  const [isOriginalOpen, setIsOriginalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const activeDrug = useMemo(() => {
    return ANTIBIOTICS.find(a => a.id === selectedDrugId) || ANTIBIOTICS[0];
  }, [selectedDrugId]);

  const drugDetails = useMemo(() => {
    return extractDrugData(selectedDrugId);
  }, [selectedDrugId]);

  // When drug changes, reset scenario to its default
  useEffect(() => {
    const defScn = drugDetails.scenarios.find(s => s.def) || drugDetails.scenarios[0];
    if (defScn) {
      setSelectedScenario(defScn.key);
    }
  }, [selectedDrugId, drugDetails]);

  // Calculate renal metrics (CrCl, IBW, AdjBW, BMI, category, ARC)
  const renal = useMemo(() => {
    return calculateRenalMetrics(patient, drugDetails.weightRule);
  }, [patient, drugDetails]);

  // Calculate recommended dosing
  const doseResult = useMemo(() => {
    return calculateDose(drugDetails, renal, selectedScenario, patient);
  }, [drugDetails, renal, selectedScenario, patient]);

  // Specific interactions for this drug
  const drugInteractions = useMemo(() => {
    return DRUG_INTERACTIONS.filter(di => di.antibioticIds.includes(selectedDrugId));
  }, [selectedDrugId]);

  const handlePatientChange = (updated: Partial<PatientState>) => {
    setPatient(prev => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setPatient(DEFAULT_PATIENT);
    setSelectedDrugId('meropenem');
    setSelectedScenario('standard');
    setActiveTab('all');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab('all');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeScenarioObj = drugDetails.scenarios.find(s => s.key === selectedScenario);
  const scenarioLabel = language === 'en' 
    ? (activeScenarioObj?.labelEn || activeScenarioObj?.label || 'Standard') 
    : (activeScenarioObj?.label || 'Tiêu chuẩn');

  const reportData: ConsultationReportData = {
    patient,
    renal,
    drug: activeDrug,
    drugDetails,
    doseResult,
    interactions: drugInteractions,
    scenarioLabel,
    language
  };

  const isEn = language === 'en';

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onReset={handleReset}
        onOpenAmr={() => setIsAmrOpen(true)}
        onOpenOriginal={() => setIsOriginalOpen(true)}
        onOpenPdfModal={() => setIsPdfModalOpen(true)}
        selectedDrugName={activeDrug.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* Two-Column Responsive Workspace */}
        <div className="lg:flex lg:gap-6 items-start">

          {/* LEFT COLUMN: Collapsible Patient Information & Renal Status */}
          <aside 
            aria-label="Patient and Renal Parameters" 
            className={`w-full shrink-0 mb-6 lg:mb-0 transition-all duration-300 lg:sticky lg:top-14 ${
              isSidebarCollapsed 
                ? 'lg:w-[260px] xl:w-[280px]' 
                : 'lg:w-[380px] xl:w-[410px]'
            }`}
          >
            <PatientSidebar
              patient={patient}
              onChange={handlePatientChange}
              renal={renal}
              dialysis={patient.dialysis}
              language={language}
              needsHeight={activeDrug.needsHeight}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </aside>

          {/* RIGHT COLUMN: Antibiotic Search Bar & Comprehensive Clinical Sections */}
          <div className="flex-1 min-w-0">

            {/* 1. Antibiotic Search Bar (Clean search bar only, no 43-button clutter) */}
            <AntibioticSearch
              antibiotics={ANTIBIOTICS}
              selectedId={selectedDrugId}
              onSelect={setSelectedDrugId}
              language={language}
            />

            {/* 2. Clinical Section Segmented Navigation Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-2 mb-6 no-print">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'all'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>{isEn ? 'All Sections' : 'Tất cả'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('dosing')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'dosing'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Pill className="w-3.5 h-3.5 text-blue-500" />
                    <span>{isEn ? 'Dose & CrCl Table' : 'Liều & Bảng CrCl'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('dialysis')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'dialysis'
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5 text-purple-500" />
                    <span>{isEn ? 'Dialysis (HD/CRRT)' : 'Lọc máu (HD/CRRT)'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ddi')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'ddi'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                    <span>{isEn ? 'Interactions' : 'Tương tác thuốc'}</span>
                    {drugInteractions.length > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === 'ddi' ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'}`}>
                        {drugInteractions.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'notes'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{isEn ? 'Clinical Guidance (Tier 1-3)' : 'Lưu ý Dược lý (Tier 1-3)'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('refs')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      activeTab === 'refs'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isEn ? 'References' : 'Tài liệu tham khảo'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Primary Dosing Recommendation Hero Card */}
            {(activeTab === 'all' || activeTab === 'dosing') && (
              <div id="dosing-section">
                <DosingRecommendationCard
                  drugDetails={drugDetails}
                  doseResult={doseResult}
                  renal={renal}
                  selectedScenario={selectedScenario}
                  onScenarioChange={setSelectedScenario}
                  language={language}
                  onExportPdf={() => setIsPdfModalOpen(true)}
                />
              </div>
            )}

            {/* 4. Complete Renal Adjustment Stratification Table */}
            {(activeTab === 'all' || activeTab === 'dosing') && (
              <div id="renal-table-section">
                <RenalAdjustmentTable
                  drugDetails={drugDetails}
                  renal={renal}
                  selectedScenario={selectedScenario}
                  language={language}
                />
              </div>
            )}

            {/* 5. Dialysis / RRT Protocol Panel */}
            {(activeTab === 'all' || activeTab === 'dialysis') && (
              <div id="dialysis-section">
                <DialysisPanel
                  drugDetails={drugDetails}
                  dialysis={patient.dialysis}
                  language={language}
                />
              </div>
            )}

            {/* 6. Automatic Drug-Drug Interaction Warning System */}
            {(activeTab === 'all' || activeTab === 'ddi') && (
              <div id="ddi-section">
                <DrugInteractionChecker
                  antibioticId={selectedDrugId}
                  antibioticName={activeDrug.name}
                  language={language}
                />
              </div>
            )}

            {/* 7. Tier 1, 2, 3 Clinical Guidance & Pharmacotherapy Notes */}
            {(activeTab === 'all' || activeTab === 'notes') && (
              <div id="notes-section">
                <ClinicalNotesTiers
                  drugDetails={drugDetails}
                  language={language}
                />
              </div>
            )}

            {/* 8. Evidence Base & Clinical References */}
            {(activeTab === 'all' || activeTab === 'refs') && (
              <div id="references-section">
                <ReferencesList
                  drugDetails={drugDetails}
                  language={language}
                />
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Printable Consultation Report Structure for direct Ctrl+P */}
      <div className="print-only p-8 text-black bg-white">
        <div className="border-b-2 border-black pb-4 mb-4 flex justify-between">
          <div>
            <h1 className="text-xl font-bold uppercase">BỆNH VIỆN - KHOA DƯỢC LÂM SÀNG</h1>
            <h2 className="text-sm font-semibold">PHIẾU HỘI CHẨN & QUẢN LÝ LIỀU KHÁNG SINH (CDSS)</h2>
          </div>
          <div className="text-right text-xs">
            <p>Ngày: {new Date().toLocaleDateString('vi-VN')}</p>
            <p>Mã HS: {patient.patientId || 'BN-10293'}</p>
          </div>
        </div>

        <div className="mb-4 text-xs">
          <p><strong>Bệnh nhân:</strong> {patient.patientName || 'Nguyễn Văn A'} | <strong>Tuổi/Giới:</strong> {patient.age}t / {patient.gender === 'm' ? 'Nam' : 'Nữ'} | <strong>Cân nặng:</strong> {patient.weight} kg</p>
          <p><strong>Scr:</strong> {renal.scrUmol} µmol/L ({renal.scrMgdl} mg/dL) | <strong>CrCl:</strong> {renal.crcl} mL/phút ({renal.categoryLabelVi})</p>
        </div>

        <div className="border border-black p-3 mb-4 text-xs">
          <p className="text-sm font-bold">Kháng sinh chỉ định: {activeDrug.name} ({activeDrug.group})</p>
          <p>Phác đồ / Kịch bản: {scenarioLabel}</p>
          {doseResult.loadingDoseTextVi && <p><strong>Liều nạp:</strong> {doseResult.loadingDoseTextVi}</p>}
          <p><strong>Liều duy trì:</strong> {doseResult.maintenanceDoseTextVi}</p>
          <p><strong>Cách dùng:</strong> {doseResult.infusionInstructionsVi}</p>
        </div>

        <div className="mb-4 text-xs">
          <p><strong>Cơ sở hiệu chỉnh liều:</strong> {doseResult.renalAdjustmentAdviceVi}</p>
        </div>

        <div className="mt-12 grid grid-cols-2 text-center text-xs">
          <div>
            <p className="font-bold">BÁC SĨ ĐIỀU TRỊ</p>
            <p className="text-[10px] italic">(Ký và ghi rõ họ tên)</p>
          </div>
          <div>
            <p className="font-bold">DƯỢC SĨ LÂM SÀNG</p>
            <p className="text-[10px] italic">(Ký và ghi rõ họ tên)</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AmrModal
        isOpen={isAmrOpen}
        onClose={() => setIsAmrOpen(false)}
        selectedDrugId={selectedDrugId}
        selectedDrugName={activeDrug.name}
        language={language}
      />

      <OriginalPreviewModal
        isOpen={isOriginalOpen}
        onClose={() => setIsOriginalOpen(false)}
        drugId={selectedDrugId}
        drugName={activeDrug.name}
        patient={patient}
        language={language}
      />

      <PdfConsultationModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        reportData={reportData}
        language={language}
      />

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            {isEn 
              ? 'Antimicrobial Dosing Clinical Decision Support System (CDSS)' 
              : 'Hệ thống Hỗ trợ Quyết định Lâm sàng Quản lý Liều Kháng sinh (CDSS)'}
          </p>
          <p>
            {isEn 
              ? 'Based on Stanford SHC & UCSF IDMP adult inpatient protocols. Medical reference tool only; clinical judgment remains paramount.' 
              : 'Dựa trên phác đồ Stanford Health Care & UCSF IDMP. Công cụ hỗ trợ ra quyết định lâm sàng cho bác sĩ và dược sĩ.'}
          </p>
        </div>
      </footer>

    </div>
  );
}

