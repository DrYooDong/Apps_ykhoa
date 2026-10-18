/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language } from './types';
import { TRANSLATIONS } from './data/translations';
import { FlowchartsView } from './components/FlowchartsView';
import { PathogenLookup } from './components/PathogenLookup';
import { MorphologyComparison } from './components/MorphologyComparison';
import { ToxicityAndAST } from './components/ToxicityAndAST';
import { ReportGenerator } from './components/ReportGenerator';
import { UserGuide } from './components/UserGuide';
import { PATHOGENS } from './data/pathogens';
import { 
  FlaskConical, 
  Search, 
  ArrowLeftRight, 
  Skull, 
  FileText, 
  BookOpen, 
  Globe, 
  Microscope,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('vi');
  const [activeTab, setActiveTab] = useState<'flowcharts' | 'lookup' | 'morphology' | 'ast' | 'report' | 'guide'>('flowcharts');
  const [selectedPathogenId, setSelectedPathogenId] = useState<string | null>(null);
  const [comparePathogenIds, setComparePathogenIds] = useState<string[]>(['s_aureus', 's_pneumoniae']);
  const [reportPathogenId, setReportPathogenId] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  const handleOpenPathogenFromAnywhere = (pathogenId: string) => {
    setSelectedPathogenId(pathogenId);
    setActiveTab('lookup');
  };

  const handleAddPathogenToCompare = (pathogenId: string) => {
    if (!comparePathogenIds.includes(pathogenId)) {
      setComparePathogenIds(prev => [...prev.slice(-2), pathogenId]);
    }
    setActiveTab('morphology');
  };

  const handleCreateReportFromPathogen = (pathogenId: string) => {
    setReportPathogenId(pathogenId);
    setActiveTab('report');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
                <Microscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    {t.appTitle}
                  </h1>
                  <span className="hidden md:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Mahon 6th Ed.
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold">
                <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
                <button
                  onClick={() => setLanguage('vi')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === 'vi'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  VI
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    language === 'en'
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tab Bar */}
          <nav className="flex overflow-x-auto space-x-1 py-2 border-t border-slate-100 scrollbar-none">
            <button
              onClick={() => setActiveTab('flowcharts')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'flowcharts'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>{t.navFlowcharts}</span>
            </button>

            <button
              onClick={() => setActiveTab('lookup')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'lookup'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{t.navLookup}</span>
            </button>

            <button
              onClick={() => setActiveTab('morphology')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'morphology'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>{t.navMorphology}</span>
            </button>

            <button
              onClick={() => setActiveTab('ast')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'ast'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Skull className="w-4 h-4" />
              <span>{t.navToxicity}</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'report'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.navReport}</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeTab === 'guide'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t.navGuide}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'flowcharts' && (
          <FlowchartsView
            language={language}
            onSelectPathogen={handleOpenPathogenFromAnywhere}
          />
        )}

        {activeTab === 'lookup' && (
          <PathogenLookup
            language={language}
            selectedPathogenId={selectedPathogenId}
            onSelectPathogen={setSelectedPathogenId}
            onComparePathogen={handleAddPathogenToCompare}
            onCreateReport={handleCreateReportFromPathogen}
          />
        )}

        {activeTab === 'morphology' && (
          <MorphologyComparison
            language={language}
            initialCompareIds={comparePathogenIds}
          />
        )}

        {activeTab === 'ast' && (
          <ToxicityAndAST language={language} />
        )}

        {activeTab === 'report' && (
          <ReportGenerator
            language={language}
            initialPathogenId={reportPathogenId}
          />
        )}

        {activeTab === 'guide' && (
          <UserGuide
            language={language}
            onSelectPathogen={handleOpenPathogenFromAnywhere}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div>
            <span className="font-semibold text-slate-700">
              Clinical Diagnostic Microbiology Platform
            </span>
            <span className="mx-2">·</span>
            <span>Based on Connie R. Mahon & Donald C. Lehman (6th Ed.) & CLSI M100 Standards</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            ISO 15189 Compliant Clinical Pathology & Antimicrobial Stewardship System
          </div>
        </div>
      </footer>
    </div>
  );
}

