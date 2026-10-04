import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Compass,
  Edit3,
  FileCheck,
  FileText,
  Flame,
  HeartPulse,
  Layers,
  Lightbulb,
  ListFilter,
  Pill,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { EXPERIENCE_LEVEL_LABELS, getExperienceLevelConfig } from '../../data/soapSeedData.ts';
import { getRelatedVaultArticlesForSoap } from '../../lib/crossReferenceEngine.ts';
import { SoapProblemsView } from './SoapProblemsView.tsx';
import { SoapRoadmapView } from './SoapRoadmapView.tsx';
import { SoapReasoningView } from './SoapReasoningView.tsx';
import { SoapMarkdownView } from './SoapMarkdownView.tsx';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';
import { SoapSubjectiveColumn } from './SoapSubjectiveColumn.tsx';
import { SoapObjectiveColumn } from './SoapObjectiveColumn.tsx';
import { SoapAssessmentColumn } from './SoapAssessmentColumn.tsx';
import { SoapPlanColumn } from './SoapPlanColumn.tsx';

export type SoapDetailTab = 'matrix' | 'problems' | 'roadmap' | 'reasoning' | 'markdown';

interface SoapDetailViewProps {
  currentCase: SoapClinicalExperience;
  viewMode: 'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p';
  setViewMode: (mode: 'board' | 'focus-s' | 'focus-o' | 'focus-a' | 'focus-p') => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  className?: string;
}

export const SoapDetailView: React.FC<SoapDetailViewProps> = ({
  currentCase,
  viewMode,
  setViewMode,
  onOpenVaultDrawer,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<SoapDetailTab>('matrix');
  const levelBadge = getExperienceLevelConfig(currentCase?.experienceLevel);
  const crossRefs = useMemo(
    () => getRelatedVaultArticlesForSoap(currentCase),
    [currentCase]
  );

  return (
    <div id="soap-detail-view" className={`flex flex-col gap-4 ${className}`}>
      {/* Case Header Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2 max-w-4xl flex-1">
          {/* Primary Category Row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                levelBadge.bg
              } ${levelBadge.text} border ${
                levelBadge.border
              }`}
            >
              {levelBadge.label}
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-800 font-mono-custom text-xs font-bold rounded-md border border-slate-200">
              ICD-10: {currentCase?.a?.icd10 || 'N/A'}
            </span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-200/70">
              {currentCase.specialty}
            </span>
            {currentCase.clinicalContext && (
              <span className="px-2.5 py-0.5 bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium rounded-md flex items-center gap-1">
                <span>🏥</span>
                <span>{currentCase.clinicalContext}</span>
              </span>
            )}
            {currentCase.difficultyRating && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                <span>{'★'.repeat(currentCase.difficultyRating)}</span>
                <span className="text-[10.5px] text-amber-600 font-mono-custom">
                  ({currentCase.difficultyRating}/5)
                </span>
              </span>
            )}
            {currentCase.isFavorite && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-amber-500" />
                <span>Yêu thích</span>
              </span>
            )}
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
            {currentCase.title}
          </h2>

          {/* Context & Meta Bar */}
          <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-2.5 px-3 text-xs text-slate-600 flex items-center gap-2.5 flex-wrap">
            <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              {currentCase.demographicContext}
            </span>
            <span className="text-slate-300">·</span>
            <span>
              Đúc kết bởi: <b className="text-slate-800">{currentCase.authorDoctor || 'Bác sĩ lâm sàng'}</b>
            </span>
            <span className="text-slate-300">·</span>
            <span>
              Ngày lưu: <span className="font-mono-custom">{currentCase.createdAt}</span>
            </span>
            {currentCase.sourceReference && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-blue-700 italic">
                  Nguồn: {currentCase.sourceReference}
                </span>
              </>
            )}
          </div>

          {/* Tags & Outcome */}
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            {currentCase.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white text-slate-600 border border-slate-200 rounded-md text-[11px] font-medium hover:border-slate-300 transition-colors"
              >
                #{t}
              </span>
            ))}

            {currentCase.outcomeNotes && (
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-[11px] font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kết cục: {currentCase.outcomeNotes}</span>
              </span>
            )}
          </div>
        </div>

        {/* Quick Jump & Tool Shortcuts */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end shrink-0">
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(currentCase.title, currentCase.title)}
            className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            title="Tra cứu bài viết liên quan trong Knowledge Vault"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Tra cứu Vault EBM</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
            className="w-8 h-8 flex items-center justify-center text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Kho Công cụ & Thang điểm lâm sàng (19)"
            aria-label="Kho Công cụ"
          >
            <span>🧮</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'ICD10')}
            className="w-8 h-8 flex items-center justify-center text-xs font-medium text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Kho Cẩm nang ICD-10 & Bẫy lỗi BHYT (11)"
            aria-label="Kho ICD-10"
          >
            <span>🏷️</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
            className="w-8 h-8 flex items-center justify-center text-xs font-medium text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Kho Hệ thống hỗ trợ ra quyết định lâm sàng CDSS (3)"
            aria-label="Kho CDSS"
          >
            <span>⚡</span>
          </button>
        </div>
      </div>

      {/* 5-Tab Deep-Dive Navigation Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tổng Quan 4 Cột (SOAP)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('problems')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'problems'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Đặt Vấn Đề 3 Tầng</span>
            {currentCase?.a?.problemList && currentCase.a.problemList.length > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'problems'
                    ? 'bg-amber-500 text-white'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {currentCase.a.problemList.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roadmap')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Lộ Trình &amp; Giám Sát</span>
            {currentCase?.p?.treatmentRoadmap && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'roadmap'
                    ? 'bg-teal-500 text-white'
                    : 'bg-teal-100 text-teal-900'
                }`}
              >
                Lộ trình
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reasoning')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'reasoning'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Biện Luận Lâm Sàng (EBM)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'reasoning'
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-100 text-purple-900'
              }`}
            >
              BYT
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('markdown')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
              activeTab === 'markdown'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Toàn Văn Markdown (.md)</span>
          </button>
        </div>

        {/* When activeTab === 'matrix', show the column filter sub-switcher */}
        {activeTab === 'matrix' && (
          <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 bg-slate-50 text-xs shrink-0 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('board')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'board'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả 4 Cột
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-s')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-s'
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột S
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-o')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-o'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột O
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-a')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-a'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột A
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus-p')}
              className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'focus-p'
                  ? 'bg-white text-teal-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cột P
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: 4-COLUMN SOAP MATRIX BOARD */}
      {activeTab === 'matrix' && (
        <>
          <div
            className={`grid gap-4 ${
              viewMode === 'board' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'
            }`}
          >
        {/* ========================================== */}
        {/* CỘT S: SUBJECTIVE                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-s') && (
          <SoapSubjectiveColumn
            s={currentCase.s}
            isFocused={viewMode === 'focus-s'}
          />
        )}

        {/* ========================================== */}
        {/* CỘT O: OBJECTIVE                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-o') && (
          <SoapObjectiveColumn
            o={currentCase.o}
            isFocused={viewMode === 'focus-o'}
          />
        )}

        {/* ========================================== */}
        {/* CỘT A: ASSESSMENT                          */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-a') && (
          <SoapAssessmentColumn
            a={currentCase.a}
            specialty={currentCase.specialty}
            isFocused={viewMode === 'focus-a'}
          />
        )}

        {/* ========================================== */}
        {/* CỘT P: PLAN                                */}
        {/* ========================================== */}
        {(viewMode === 'board' || viewMode === 'focus-p') && (
          <SoapPlanColumn
            p={currentCase.p}
            isFocused={viewMode === 'focus-p'}
          />
        )}
      </div>

      {/* 5. Deep Cross-References to Knowledge Vault */}
      {crossRefs.totalCount > 0 && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Tài Liệu EBM & Phác Đồ Liên Quan</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    {crossRefs.totalCount} bài trong Knowledge Vault
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Đối chiếu y học chứng cứ, tiêu chuẩn chẩn đoán và dược lý lâm sàng liên quan đến chẩn đoán: <b>{currentCase.a.primaryDiagnosis}</b>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Phác đồ điều trị */}
            {crossRefs.protocols.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Phác Đồ Điều Trị (PDDT)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.protocols.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-blue-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tiêu chuẩn chẩn đoán */}
            {crossRefs.diagnostics.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-pink-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-600" />
                  <span>Tiêu Chuẩn Chẩn Đoán (CD)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.diagnostics.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-pink-300 hover:bg-pink-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-pink-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dược lý lâm sàng */}
            {crossRefs.pharmacology.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-600" />
                  <span>Dược Lý & Thuốc (DUOC)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.pharmacology.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-cyan-300 hover:bg-cyan-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-cyan-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Khuyến cáo & EBM */}
            {crossRefs.guidelines.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Hướng Dẫn & EBM (EBM)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.guidelines.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-blue-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Thang điểm lâm sàng */}
            {crossRefs.clinicalScores.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>Thang Điểm Lượng Giá (CC)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.clinicalScores.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-amber-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cơ chế sinh lý bệnh */}
            {crossRefs.pathology.length > 0 && (
              <div className="bg-slate-50/70 border border-slate-200/70 rounded-xl p-3 flex flex-col gap-2">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Cơ Chế Sinh Lý Bệnh (SLB)</span>
                </div>
                <div className="space-y-1.5">
                  {crossRefs.pathology.map((art) => (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(art.title, art.title, art.khoCode)}
                      className="w-full text-left p-2 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40 text-xs flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <span className="font-medium text-slate-800 group-hover:text-emerald-700 line-clamp-1">
                        {art.title}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )}

  {/* TAB 2: ĐẶT VẤN ĐỀ 3 TẦNG */}
  {activeTab === 'problems' && (
    <SoapProblemsView
      currentCase={currentCase}
      onOpenVaultDrawer={onOpenVaultDrawer}
    />
  )}

  {/* TAB 3: LỘ TRÌNH ĐIỀU TRỊ & GIÁM SÁT */}
  {activeTab === 'roadmap' && (
    <SoapRoadmapView
      currentCase={currentCase}
      onOpenVaultDrawer={onOpenVaultDrawer}
    />
  )}

  {/* TAB 4: BIỆN LUẬN LÂM SÀNG & EBM */}
  {activeTab === 'reasoning' && (
    <SoapReasoningView
      currentCase={currentCase}
      onOpenVaultDrawer={onOpenVaultDrawer}
    />
  )}

  {/* TAB 5: TOÀN VĂN MARKDOWN (.MD) */}
  {activeTab === 'markdown' && (
    <SoapMarkdownView currentCase={currentCase} />
  )}
</div>
);
};

