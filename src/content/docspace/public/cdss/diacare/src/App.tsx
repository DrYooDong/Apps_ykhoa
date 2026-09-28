/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { UnifiedDashboardTab } from './components/UnifiedDashboardTab';
import { SpecialScenariosTab } from './components/SpecialScenariosTab';
import { GuidelinesTab } from './components/GuidelinesTab';
import { ReportModal } from './components/ReportModal';
import { PatientData, GlucoseUnit } from './types/cdss';
import { calculateInsulinPlan, evaluateClinicalAlerts, formatGlucose, mgDlToMmolL, mmolLToMgDl, calculateBMI } from './utils/calculations';
import { SAMPLE_CASES } from './utils/sampleCases';
import { 
  LayoutDashboard, 
  Sparkles, 
  BookOpen, 
  FileText, 
  ShieldAlert,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

const defaultPatient: PatientData = {
  id: 'BN-' + Math.floor(1000 + Math.random() * 9000),
  patientName: 'Bệnh nhân nội viện',
  age: 60,
  gender: 'male',
  weightKg: 65,
  heightCm: 165,
  diabetesType: 'T2D',
  wardType: 'NON_ICU',
  dietType: 'ORAL_FULL',
  currentGlucose: 215,
  unit: 'mg_dl',
  fastingGlucose: 155,
  hba1c: 8.4,
  egfr: 62,
  creatinine: 95,
  potassium: 4.2,
  bloodKetones: 0.2,
  venousPh: 7.38,
  bicarbonate: 24,
  sodium: 138,
  chloride: 101,
  urea: 6.0,
  isTakingSteroids: false,
  isScheduledSurgery: false,
  isOnDialysis: false,
  currentOralMeds: ['metformin'],
  isPriorInsulinTreated: false,
  isOnIVInsulin: false,
};

export default function App() {
  const [patient, setPatient] = useState<PatientData>(defaultPatient);
  const [unit, setUnit] = useState<GlucoseUnit>('mg_dl');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle light/dark mode class on root HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Toggle glucose unit
  const handleToggleUnit = () => {
    const nextUnit: GlucoseUnit = unit === 'mg_dl' ? 'mmol_l' : 'mg_dl';
    const convertedCurrent = nextUnit === 'mmol_l' 
      ? mgDlToMmolL(patient.currentGlucose) 
      : mmolLToMgDl(patient.currentGlucose);
      
    const convertedFasting = patient.fastingGlucose 
      ? (nextUnit === 'mmol_l' ? mgDlToMmolL(patient.fastingGlucose) : mmolLToMgDl(patient.fastingGlucose)) 
      : undefined;

    setUnit(nextUnit);
    setPatient(prev => ({
      ...prev,
      unit: nextUnit,
      currentGlucose: convertedCurrent,
      fastingGlucose: convertedFasting,
    }));
  };

  const handleUpdatePatient = (updated: Partial<PatientData>) => {
    setPatient(prev => ({ ...prev, ...updated }));
  };

  // Clear data in memory
  const handleReset = () => {
    setPatient({
      ...defaultPatient,
      id: 'BN-' + Math.floor(1000 + Math.random() * 9000),
      currentGlucose: unit === 'mg_dl' ? 180 : 10.0,
      fastingGlucose: unit === 'mg_dl' ? 130 : 7.2,
      unit,
    });
    setActiveTab('dashboard');
  };

  const handleLoadPreset = (caseId: string) => {
    const sample = SAMPLE_CASES.find(c => c.id === caseId);
    if (sample) {
      let currentG = sample.data.currentGlucose;
      let fastingG = sample.data.fastingGlucose;
      if (unit === 'mmol_l' && sample.data.unit === 'mg_dl') {
        currentG = mgDlToMmolL(currentG);
        if (fastingG) fastingG = mgDlToMmolL(fastingG);
      } else if (unit === 'mg_dl' && sample.data.unit === 'mmol_l') {
        currentG = mmolLToMgDl(currentG);
        if (fastingG) fastingG = mmolLToMgDl(fastingG);
      }

      setPatient({
        ...sample.data,
        id: 'BN-' + Math.floor(1000 + Math.random() * 9000),
        unit,
        currentGlucose: currentG,
        fastingGlucose: fastingG,
      });
      setActiveTab('dashboard');
    }
  };

  // Calculations
  const insulinPlan = useMemo(() => calculateInsulinPlan(patient), [patient]);
  const alerts = useMemo(() => evaluateClinicalAlerts(patient), [patient]);

  const criticalCount = useMemo(() => alerts.filter(a => a.level === 'CRITICAL').length, [alerts]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Header with Theme Switcher & Case Presets */}
      <Header
        unit={unit}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleUnit={handleToggleUnit}
        onReset={handleReset}
        onLoadPreset={handleLoadPreset}
        onOpenReport={() => setIsReportOpen(true)}
        criticalAlertCount={criticalCount}
      />

      {/* Desktop/Tablet Horizontal Navigation Tabs */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { 
                id: 'dashboard' as ActiveTab, 
                label: 'CDSS Điều Trị & Quản Lý Liều Insulin', 
                icon: LayoutDashboard,
                badge: `${insulinPlan.tddEstimated} UI`,
                alertBadge: criticalCount > 0 ? criticalCount : undefined
              },
              { id: 'special' as ActiveTab, label: 'Tình Huống Lâm Sàng Đặc Thù', icon: Sparkles },
              { id: 'guidelines' as ActiveTab, label: 'Hướng Dẫn & Cẩm Nang Điều Trị', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center space-x-2 py-3.5 px-1 border-b-2 text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-md bg-teal-50 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-[10px] font-extrabold border border-teal-200 dark:border-teal-700">
                      {tab.badge}
                    </span>
                  )}
                  {tab.alertBadge && (
                    <span className="ml-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center animate-pulse">
                      {tab.alertBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 mb-16 md:mb-6">
        {activeTab === 'dashboard' && (
          <UnifiedDashboardTab
            patient={patient}
            insulinPlan={insulinPlan}
            alerts={alerts}
            unit={unit}
            onChangePatient={handleUpdatePatient}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {activeTab === 'special' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Phác Đồ Cho Các Tình Huống Lâm Sàng Đặc Thù
              </h2>
              <p className="text-xs text-slate-500">
                Chu phẫu, Dùng Corticoid, Lọc máu nhân tạo và Nuôi ăn qua sonde dạ dày
              </p>
            </div>
            <SpecialScenariosTab
              patient={patient}
              unit={unit}
              onChangePatient={handleUpdatePatient}
            />
          </div>
        )}

        {activeTab === 'guidelines' && (
          <GuidelinesTab />
        )}

        {activeTab === 'report' && (
          <div className="text-center py-8 space-y-4 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <FileText className="w-12 h-12 text-teal-600 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Báo Cáo Chỉ Định Điều Trị & Xuất PDF
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Bản tóm tắt chỉ định lâm sàng, phác đồ liều insulin, hướng dẫn theo dõi đường huyết mao mạch và xử trí hạ ĐH cho bác sĩ/điều dưỡng.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsReportOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition"
              >
                Mở Phiếu Báo Cáo & Tải PDF
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Mobile / Tablet Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(tab) => {
          if (tab === 'report') {
            setIsReportOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        criticalAlertCount={criticalCount}
      />

      {/* PDF & Printable Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        patient={patient}
        insulinPlan={insulinPlan}
        alerts={alerts}
        unit={unit}
      />
    </div>
  );
}
