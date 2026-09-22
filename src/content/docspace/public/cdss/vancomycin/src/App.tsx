import React, { useState, useMemo } from 'react';
import { 
  Header 
} from './components/Header';
import { PatientInputCard } from './components/PatientInputCard';
import { DosingRegimenCard } from './components/DosingRegimenCard';
import { TdmCalculatorCard } from './components/TdmCalculatorCard';
import { SafetyAlertsCard } from './components/SafetyAlertsCard';
import { ClinicalQuickReferenceCard } from './components/ClinicalQuickReferenceCard';
import { GuidelineReferenceModal } from './components/GuidelineReferenceModal';
import { ClinicalReportPrint } from './components/ClinicalReportPrint';
import { ClinicalGuideModal } from './components/ClinicalGuideModal';
import { 
  PatientProfile, 
  InfusionMethod, 
  TdmInput 
} from './types';
import { 
  calculateRenalFunction, 
  calculateInitialDosing, 
  evaluateTdm 
} from './utils/pharmacokinetics';
import { exportClinicalReportPDF } from './utils/pdfExport';
import { 
  User, 
  Pill, 
  Activity, 
  ShieldAlert, 
  Sparkles,
  FileDown,
  Printer,
  ChevronRight
} from 'lucide-react';

const DEFAULT_PATIENT: PatientProfile = {
  id: 'BN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  name: 'Bệnh nhân mẫu 01',
  age: 62,
  ageUnit: 'years',
  gender: 'male',
  weight: 65,
  height: 168,
  scrValue: 110,
  scrUnit: 'umol_L',
  patientType: 'adult',
  clinicalSetting: 'ward',
  renalStatus: 'normal_or_ckd',
  hdDialyzerPermeability: 'high',
  hdTiming: 'after_dialysis',
  indication: 'severe_mrsa',
  mic: 1.0,
  concomitantNephrotoxins: ['Piperacillin/Tazobactam']
};

export default function App() {
  const [patient, setPatient] = useState<PatientProfile>(DEFAULT_PATIENT);
  const [methodPreference, setMethodPreference] = useState<InfusionMethod>('intermittent');
  const [mobileTab, setMobileTab] = useState<'input' | 'dosing' | 'tdm' | 'safety'>('input');
  
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // TDM State
  const [tdmInput, setTdmInput] = useState<TdmInput>({
    regimenType: 'intermittent',
    currentDoseMg: 1000,
    currentIntervalHours: 12,
    infusionDurationHours: 1.5,
    peakConcentration: 28.0,
    peakTimeAfterEndHours: 1.0,
    troughConcentration: 12.0,
    troughTimeBeforeNextHours: 0.5,
    steadyStateConcentration: 22.0
  });

  // Calculate Renal & Body Metrics
  const renal = useMemo(() => {
    return calculateRenalFunction(
      patient.age,
      patient.ageUnit,
      patient.gender,
      patient.weight,
      patient.height,
      patient.scrValue,
      patient.scrUnit
    );
  }, [
    patient.age,
    patient.ageUnit,
    patient.gender,
    patient.weight,
    patient.height,
    patient.scrValue,
    patient.scrUnit
  ]);

  // Calculate Initial Dosing
  const dosing = useMemo(() => {
    return calculateInitialDosing(patient, renal, methodPreference);
  }, [patient, renal, methodPreference]);

  // Sync TDM initial values when dosing changes
  const activeTdmInput = useMemo(() => {
    return {
      ...tdmInput,
      regimenType: methodPreference,
      currentDoseMg: tdmInput.currentDoseMg || dosing.maintenanceDoseMg,
      currentIntervalHours: tdmInput.currentIntervalHours || dosing.maintenanceIntervalHours
    };
  }, [tdmInput, methodPreference, dosing.maintenanceDoseMg, dosing.maintenanceIntervalHours]);

  // Calculate TDM Results
  const tdmResult = useMemo(() => {
    return evaluateTdm(activeTdmInput, patient, renal);
  }, [activeTdmInput, patient, renal]);

  // Handlers
  const handlePatientChange = (updated: Partial<PatientProfile>) => {
    setPatient((prev) => ({ ...prev, ...updated }));
  };

  const handleTdmChange = (updated: Partial<TdmInput>) => {
    setTdmInput((prev) => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setPatient({
      ...DEFAULT_PATIENT,
      id: 'BN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: ''
    });
    setTdmInput({
      regimenType: 'intermittent',
      currentDoseMg: 1000,
      currentIntervalHours: 12,
      infusionDurationHours: 1.5,
      peakConcentration: undefined,
      troughConcentration: undefined,
      steadyStateConcentration: undefined
    });
  };

  const handleLoadSample = (sampleType: 'ward_elderly' | 'obese_icu' | 'ckd_camau' | 'ihd') => {
    if (sampleType === 'obese_icu') {
      setPatient({
        id: 'BN-OBESE-ICU',
        name: 'Trần Văn B (108kg, ICU)',
        age: 58,
        ageUnit: 'years',
        gender: 'male',
        weight: 108,
        height: 172,
        scrValue: 125,
        scrUnit: 'umol_L',
        patientType: 'adult',
        clinicalSetting: 'icu',
        renalStatus: 'normal_or_ckd',
        indication: 'severe_mrsa',
        mic: 1.0,
        concomitantNephrotoxins: ['Furosemide (Lợi tiểu quai)', 'Thuốc vận mạch']
      });
      setMethodPreference('continuous');
      setTdmInput((prev) => ({
        ...prev,
        regimenType: 'continuous',
        steadyStateConcentration: 23.5
      }));
    } else if (sampleType === 'ckd_camau') {
      setPatient({
        id: 'BN-CKD-CAMAU',
        name: 'Lê Thị C (Suy thận CrCl 32)',
        age: 72,
        ageUnit: 'years',
        gender: 'female',
        weight: 54,
        height: 155,
        scrValue: 165,
        scrUnit: 'umol_L',
        patientType: 'adult',
        clinicalSetting: 'ward',
        renalStatus: 'normal_or_ckd',
        indication: 'severe_mrsa',
        mic: 1.0,
        concomitantNephrotoxins: []
      });
      setMethodPreference('intermittent');
    } else if (sampleType === 'ihd') {
      setPatient({
        id: 'BN-IHD-DIALYSIS',
        name: 'Hoàng Văn D (Thận nhân tạo chu kỳ)',
        age: 64,
        ageUnit: 'years',
        gender: 'male',
        weight: 68,
        height: 165,
        scrValue: 580,
        scrUnit: 'umol_L',
        patientType: 'adult',
        clinicalSetting: 'ward',
        renalStatus: 'intermittent_hd',
        hdDialyzerPermeability: 'high',
        hdTiming: 'after_dialysis',
        indication: 'severe_mrsa',
        mic: 1.0,
        concomitantNephrotoxins: []
      });
      setMethodPreference('intermittent');
    } else {
      setPatient(DEFAULT_PATIENT);
      setMethodPreference('intermittent');
    }
  };

  const handleExportPdf = () => {
    exportClinicalReportPDF(patient, renal, dosing, activeTdmInput, tdmResult);
  };

  const handleApplyAdjustment = (newDose: number, newInterval?: number) => {
    setTdmInput((prev) => ({
      ...prev,
      currentDoseMg: newDose,
      currentIntervalHours: newInterval || prev.currentIntervalHours
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-16 md:pb-6">
      {/* Top App Header with Minimalist Icon Actions */}
      <Header
        onReset={handleReset}
        onLoadSample={() => handleLoadSample('obese_icu')}
        onExportPdf={handleExportPdf}
        onPrint={() => setIsPrintOpen(true)}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Quick Clinical Scenarios Ribbon (Compact, One-tap) */}
      <div className="bg-slate-100/80 border-b border-slate-200/80 px-4 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto text-xs no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0 text-slate-500 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Tình huống nhanh:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleLoadSample('ward_elderly')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-medium whitespace-nowrap active:scale-95 transition-all"
            >
              1. Bệnh nhân nội khoa (CrCl ~50)
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('obese_icu')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-medium whitespace-nowrap active:scale-95 transition-all"
            >
              2. Béo phì 108kg ICU (Zhang 2024)
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('ckd_camau')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-medium whitespace-nowrap active:scale-95 transition-all"
            >
              3. Suy thận CrCl 32 (Bảng Cà Mau)
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample('ihd')}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-[11px] font-medium whitespace-nowrap active:scale-95 transition-all"
            >
              4. Chạy thận chu kỳ (IHD)
            </button>
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 text-[11px] font-semibold whitespace-nowrap active:scale-95 transition-all flex items-center gap-1"
            >
              <span>🎓 Cẩm nang Bác sĩ mới</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-4 flex-1">
        {/* Mobile View Switcher (Visible only on small screens) */}
        <div className="md:hidden grid grid-cols-4 gap-1 bg-slate-200/80 p-1 rounded-xl mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMobileTab('input')}
            className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
              mobileTab === 'input' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] truncate">1. Bệnh nhân</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('dosing')}
            className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
              mobileTab === 'dosing' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span className="text-[10px] truncate">2. Liều dùng</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('tdm')}
            className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
              mobileTab === 'tdm' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="text-[10px] truncate">3. TDM & AUC</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('safety')}
            className={`py-2 px-1 rounded-lg flex flex-col items-center gap-1 transition-all ${
              mobileTab === 'safety' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[10px] truncate">4. Cảnh báo</span>
          </button>
        </div>

        {/* Responsive Desktop 2-Column Grid (~30% Input & Safety, ~70% Results & Calculations) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start">
          {/* Left Column (Input, Safety Guardrails & Quick Clinical Ref) - approx 30-33% */}
          <div className={`lg:col-span-4 xl:col-span-4 space-y-3.5 lg:sticky lg:top-18 ${
            mobileTab === 'input' || mobileTab === 'safety' ? 'block' : 'hidden md:block'
          }`}>
            {(mobileTab === 'input' || window.innerWidth >= 768) && (
              <PatientInputCard
                patient={patient}
                renal={renal}
                onChange={handlePatientChange}
              />
            )}

            {(mobileTab === 'safety' || window.innerWidth >= 768) && (
              <>
                <SafetyAlertsCard
                  patient={patient}
                  renal={renal}
                />
                
                {/* Clinical Quick Reference to utilize vertical space effectively */}
                <ClinicalQuickReferenceCard />
              </>
            )}
          </div>

          {/* Right Column (Prescription Dosing, TDM AUC24 & PK Curve Chart) - approx 67-70% */}
          <div className={`lg:col-span-8 xl:col-span-8 space-y-4 ${
            mobileTab === 'dosing' || mobileTab === 'tdm' ? 'block' : 'hidden md:block'
          }`}>
            {(mobileTab === 'dosing' || window.innerWidth >= 768) && (
              <DosingRegimenCard
                dosing={dosing}
                selectedMethod={methodPreference}
                onMethodChange={setMethodPreference}
                weightKg={patient.weight}
              />
            )}

            {(mobileTab === 'tdm' || window.innerWidth >= 768) && (
              <TdmCalculatorCard
                tdmInput={activeTdmInput}
                tdmResult={tdmResult}
                regimenMethod={methodPreference}
                mic={patient.mic || 1.0}
                onChange={handleTdmChange}
                onApplyAdjustment={handleApplyAdjustment}
              />
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile PDF Export */}
      <div className="md:hidden fixed bottom-3 right-3 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPrintOpen(true)}
          className="p-3 bg-white text-slate-800 rounded-full shadow-lg border border-slate-200 active:scale-90 transition-all flex items-center justify-center"
          title="In phiếu A4"
        >
          <Printer className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleExportPdf}
          className="px-4 py-3 bg-teal-600 text-white rounded-full shadow-lg font-semibold active:scale-90 transition-all flex items-center gap-2"
          title="Tải PDF"
        >
          <FileDown className="w-5 h-5" />
          <span className="text-xs">Xuất PDF</span>
        </button>
      </div>

      {/* Guideline Reference Modal */}
      <GuidelineReferenceModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      {/* Clinical Guide Handbook for New Doctors */}
      <ClinicalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Clinical Report Print Preview */}
      {isPrintOpen && (
        <ClinicalReportPrint
          patient={patient}
          renal={renal}
          dosing={dosing}
          tdmInput={activeTdmInput}
          tdmResult={tdmResult}
          onClose={() => setIsPrintOpen(false)}
          onExportPdf={handleExportPdf}
        />
      )}
    </div>
  );
}
