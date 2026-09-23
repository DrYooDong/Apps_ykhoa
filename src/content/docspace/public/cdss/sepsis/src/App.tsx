/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PatientData } from './types/sepsis';
import { evaluatePatientCDSS } from './utils/calculators';
import { Header } from './components/Header';
import { CompactPatientForm } from './components/CompactPatientForm';
import { UnifiedDashboard } from './components/UnifiedDashboard';
import { ClinicalGuideModal } from './components/ClinicalGuideModal';
import { CaseHistoryModal } from './components/CaseHistoryModal';
import { PresetCasesModal } from './components/PresetCasesModal';
import { PRESET_CASES, PresetCase, NORMAL_PATIENT_CASE } from './data/presetCases';
import { Sparkles, Stethoscope, Activity, Check } from 'lucide-react';

const DEFAULT_PATIENT: PatientData = {
  ...NORMAL_PATIENT_CASE,
  id: 'current-patient'
};

interface SavedRecord {
  id: string;
  savedAt: string;
  patientData: PatientData;
}

export default function App() {
  const [patient, setPatient] = useState<PatientData>(DEFAULT_PATIENT);
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedCases, setSavedCases] = useState<SavedRecord[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mobile view toggle (cho màn hình nhỏ < lg: xem Dữ Liệu hoặc Kết Quả)
  const [mobileTab, setMobileTab] = useState<'input' | 'dashboard'>('input');

  // Load saved cases from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sepsis_cdss_saved_cases');
      if (stored) {
        setSavedCases(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse saved cases:', e);
    }
  }, []);

  // Đánh giá CDSS tự động tức thì khi có bất kỳ thay đổi nào
  const cdssResult = evaluatePatientCDSS(patient);

  const handleSelectPreset = (preset: PresetCase) => {
    setPatient({ ...preset.patientData });
    setIsPresetsOpen(false);
    // On mobile, automatically show the result dashboard after selecting preset
    if (window.innerWidth < 1024) {
      setMobileTab('dashboard');
    }
  };

  const handleReset = () => {
    setPatient({
      ...DEFAULT_PATIENT,
      patientName: '',
      patientCode: '',
      id: `pt-${Date.now()}`
    });
  };

  const handleSaveCurrentCase = () => {
    const newRecord: SavedRecord = {
      id: `rec-${Date.now()}`,
      savedAt: new Date().toISOString(),
      patientData: { ...patient }
    };
    const updated = [newRecord, ...savedCases].slice(0, 30);
    setSavedCases(updated);
    try {
      localStorage.setItem('sepsis_cdss_saved_cases', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleDeleteCase = (id: string) => {
    const updated = savedCases.filter((c) => c.id !== id);
    setSavedCases(updated);
    localStorage.setItem('sepsis_cdss_saved_cases', JSON.stringify(updated));
  };

  const handleClearAllCases = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử ca bệnh đã lưu?')) {
      setSavedCases([]);
      localStorage.removeItem('sepsis_cdss_saved_cases');
    }
  };

  const handleLoadCase = (data: PatientData) => {
    setPatient({ ...data });
    if (window.innerWidth < 1024) {
      setMobileTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Header với Icon buttons & Chọn ca mẫu trực tiếp */}
      <Header
        onOpenPresets={() => setIsPresetsOpen(true)}
        onSelectPreset={handleSelectPreset}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onReset={handleReset}
        savedCount={savedCases.length}
      />

      {/* Main Content Area - Giao diện hợp nhất không chia tách trang */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-4 lg:px-6 py-3 sm:py-4">
        {/* Quick Presets Bar cho thiết bị di động / máy tính bảng */}
        <div className="mb-3 flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-none md:hidden">
          <div className="flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-[11px] font-semibold text-slate-600">Ca mẫu:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {PRESET_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectPreset(c)}
                className="px-2.5 py-1 text-[11px] font-medium bg-white border border-slate-200 hover:border-teal-400 rounded-lg text-slate-700 whitespace-nowrap shadow-2xs transition-colors"
              >
                {c.category.split('-')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Chuyển đổi tab trên thiết bị màn hình nhỏ (< lg) */}
        <div className="lg:hidden mb-3 bg-white p-1 rounded-xl border border-slate-200 grid grid-cols-2 gap-1 shadow-2xs">
          <button
            onClick={() => setMobileTab('input')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'input'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Dữ Liệu Khám (35%)</span>
          </button>

          <button
            onClick={() => setMobileTab('dashboard')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors relative ${
              mobileTab === 'dashboard'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Kết Quả & Xử Trí (65%)</span>
            {cdssResult.urgencyLevel === 'emergency' && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-2 right-4" />
            )}
          </button>
        </div>

        {/* Bố cục Phân Vùng (Unified Split Layout: 35% hoặc Thu gọn chỉ còn Icon -> 65% hoặc Toàn màn hình) */}
        <div className="flex flex-col lg:flex-row items-start gap-4">
          {/* Cột Trái: Dữ Liệu Bệnh Nhân (Khoảng 35% hoặc thanh icon khi thu gọn) */}
          <div className={`transition-all duration-200 shrink-0 ${
            mobileTab === 'dashboard' ? 'hidden lg:block' : 'block'
          } ${
            isFormCollapsed ? 'w-full lg:w-16' : 'w-full lg:w-[35%]'
          }`}>
            <CompactPatientForm
              data={patient}
              onChange={setPatient}
              isCollapsed={isFormCollapsed}
              onToggleCollapse={() => setIsFormCollapsed(!isFormCollapsed)}
            />
          </div>

          {/* Cột Phải: Đánh Giá Kết Quả & Phác Đồ Xử Trí Ngắn Gọn (Tự động mở rộng khi cột trái thu gọn) */}
          <div className={`w-full flex-1 min-w-0 ${
            mobileTab === 'input' ? 'hidden lg:block' : 'block'
          }`}>
            <UnifiedDashboard
              patient={patient}
              result={cdssResult}
              onSaveCase={handleSaveCurrentCase}
              saveSuccess={saveSuccess}
            />
          </div>
        </div>
      </main>

      {/* Modal Hướng Dẫn Y Khoa (Mở qua nút icon BookOpen) */}
      <ClinicalGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Modal Lịch Sử Ca Đã Lưu (Mở qua nút icon History) */}
      <CaseHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedCases={savedCases}
        onLoadCase={handleLoadCase}
        onDeleteCase={handleDeleteCase}
        onClearAll={handleClearAllCases}
      />

      {/* Modal Danh Mục Ca Mẫu Đầy Đủ (Mở qua nút icon Sparkles) */}
      <PresetCasesModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectCase={handleSelectPreset}
      />
    </div>
  );
}
