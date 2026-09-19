import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  RotateCcw, 
  Globe, 
  Menu, 
  X, 
  Activity, 
  ExternalLink,
  ShieldAlert,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  onOpenAmr: () => void;
  onOpenOriginal: () => void;
  onOpenPdfModal: () => void;
  selectedDrugName: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onReset,
  onOpenAmr,
  onOpenOriginal,
  onOpenPdfModal,
  selectedDrugName
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isEn = language === 'en';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  CDSS <span className="text-blue-600">Kháng Sinh</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  v2.5 Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                {isEn 
                  ? 'Clinical Antimicrobial Dosing & Renal Decision Support System' 
                  : 'Hệ thống Hỗ trợ Ra quyết định Liều Kháng sinh & Hiệu chỉnh Thận'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            
            {/* AMR Surveillance Lookup */}
            <button
              onClick={onOpenAmr}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              title={isEn ? 'Antimicrobial Resistance Data (Vietnam)' : 'Tra cứu đề kháng kháng sinh Việt Nam'}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? 'AMR Data VN' : 'Dữ liệu Đề kháng'}</span>
            </button>

            {/* Original Preview View */}
            <button
              onClick={onOpenOriginal}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              title={isEn ? 'View Original Stanford/UCSF Preview' : 'Xem bản xem gốc Stanford/UCSF'}
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isEn ? 'Original Mode' : 'Giao diện gốc'}</span>
            </button>

            {/* Consultation PDF Report */}
            <button
              onClick={onOpenPdfModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{isEn ? 'Export PDF / Print' : 'Xuất Phiếu Hội Chẩn'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={onReset}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={isEn ? 'Reset to default patient' : 'Đặt lại thông số mặc định'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => onLanguageChange('vi')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'vi' 
                    ? 'bg-white text-blue-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇻🇳 VI
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  language === 'en' 
                    ? 'bg-white text-blue-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Language Quick Switch */}
            <button
              onClick={() => onLanguageChange(language === 'vi' ? 'en' : 'vi')}
              className="px-2 py-1 rounded-md text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700"
            >
              {language === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
            </button>

            {/* Export PDF Mobile button */}
            <button
              onClick={onOpenPdfModal}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
              title={isEn ? 'PDF' : 'Xuất phiếu'}
            >
              <FileText className="w-4 h-4" />
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="text-xs font-medium text-slate-500 mb-1">
            {isEn ? 'Active Antibiotic:' : 'Kháng sinh đang chọn:'} <span className="font-bold text-slate-800">{selectedDrugName}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenAmr();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200"
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{isEn ? 'AMR Data VN' : 'Dữ liệu Đề kháng'}</span>
            </button>
            <button
              onClick={() => {
                onOpenOriginal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-1.5 p-2.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isEn ? 'Original Mode' : 'Giao diện gốc'}</span>
            </button>
          </div>
          <button
            onClick={() => {
              onOpenPdfModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>{isEn ? 'Export PDF / Print Consultation Record' : 'Xuất Phiếu Hội Chẩn & In PDF'}</span>
          </button>
          <button
            onClick={() => {
              onReset();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reset Default Parameters' : 'Khôi phục thông số chuẩn'}</span>
          </button>
        </div>
      )}
    </header>
  );
};
