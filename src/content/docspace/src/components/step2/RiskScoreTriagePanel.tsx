import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Baby,
  Building2,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  Info,
  Layers,
  MapPin,
  Pill,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { ClinicalFormState, VitalsState, LabsState, AnalysisResult } from '../../types.ts';
import {
  calculateClinicalRiskScore,
  calculateEsiTriage,
  calculatePewsScore,
  ClinicalRiskScore,
  EsiScoreResult,
  PewsScoreResult,
} from '../../lib/riskScore.ts';

interface RiskScoreTriagePanelProps {
  form?: ClinicalFormState;
  vitals?: VitalsState;
  labs?: LabsState;
  results?: AnalysisResult[];
  riskScore?: ClinicalRiskScore;
  esiScore?: EsiScoreResult;
  pewsScore?: PewsScoreResult;
  isPediatric?: boolean;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const RiskScoreTriagePanel: React.FC<RiskScoreTriagePanelProps> = ({
  form,
  vitals,
  labs,
  results = [],
  riskScore: providedRiskScore,
  esiScore: providedEsiScore,
  pewsScore: providedPewsScore,
  isPediatric: providedIsPediatric,
  onOpenVaultDrawer,
}) => {
  const isPediatric = providedIsPediatric ?? (form?.tuoi ? parseInt(form.tuoi, 10) < 16 : false);

  const topMatchedIds = useMemo(() => {
    return results && results[0]?.matched ? new Set(results[0].matched.map((m) => m.tc.id)) : undefined;
  }, [results]);

  const riskScore: ClinicalRiskScore = useMemo(() => {
    return providedRiskScore || calculateClinicalRiskScore(vitals, labs, results, form);
  }, [providedRiskScore, vitals, labs, results, form]);

  const pewsScore: PewsScoreResult = useMemo(() => {
    return providedPewsScore || calculatePewsScore(vitals, labs, form, topMatchedIds);
  }, [providedPewsScore, vitals, labs, form, topMatchedIds]);

  const esiScore: EsiScoreResult = useMemo(() => {
    return providedEsiScore || calculateEsiTriage(vitals, labs, form, topMatchedIds);
  }, [providedEsiScore, vitals, labs, form, topMatchedIds]);

  const [activeScoreSystem, setActiveScoreSystem] = useState<'news2' | 'esi' | 'pews'>(
    isPediatric ? 'pews' : 'news2'
  );
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showEsiDetails, setShowEsiDetails] = useState(false);

  const defaultScoreColor = {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-700',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    hex: '#64748b',
    gradient: 'from-slate-500 to-slate-600',
    badge: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  const currentScoreColor =
    (activeScoreSystem === 'esi'
      ? esiScore?.color
      : activeScoreSystem === 'pews'
      ? pewsScore?.color
      : riskScore?.color) || defaultScoreColor;

  return (
    <div
      id="clinical-risk-score-card"
      className={`bg-white border ${currentScoreColor.border} rounded-xl p-4 sm:p-5 shadow-xs transition-all`}
      style={{
        borderLeftWidth: '6px',
        borderLeftColor: currentScoreColor.hex,
      }}
    >
      {/* Top Bar: Segmented System Switcher & Patient Population Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
        {/* Segmented Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveScoreSystem('news2')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScoreSystem === 'news2'
                ? 'bg-white text-blue-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>NEWS2 (Người lớn)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScoreSystem('esi')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScoreSystem === 'esi'
                ? 'bg-white text-orange-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span>ESI (Cấp cứu 5 mức độ)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveScoreSystem('pews')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeScoreSystem === 'pews'
                ? 'bg-white text-rose-950 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Baby className="w-3.5 h-3.5 text-rose-600" />
            <span>PEWS (Nhi khoa)</span>
          </button>
        </div>

        {/* Population Indicator Badge */}
        <div className="flex items-center gap-2">
          {isPediatric ? (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-50 text-pink-800 border border-pink-200 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5 text-pink-600" />
              <span>Bệnh nhi ({form?.tuoi} tuổi) · Khuyến nghị dùng PEWS</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Người lớn ({form?.tuoi || 'Trưởng thành'} tuổi) · Chuẩn ESI & NEWS2</span>
            </span>
          )}
        </div>
      </div>

      {/* TAB CONTENT: 1. ESI (EMERGENCY SEVERITY INDEX) */}
      {activeScoreSystem === 'esi' && (
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Left Info & Recommendations */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${esiScore.color.badge}`}>
                  Mức {esiScore.level}: {esiScore.label}
                </span>
                <span className="text-xs text-slate-500 font-mono-custom">
                  Thuật toán Phân loại Cấp cứu ESI v4
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                {esiScore.description}
              </h3>

              {/* Quick Stat Blocks: Time to MD, Target Area, Resource estimation */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Thời gian gặp BS:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-orange-600" />
                    {esiScore.timeToPhysician}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Khu vực tiếp nhận:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-blue-600" />
                    {esiScore.targetArea}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Dự kiến nguồn lực:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3 text-purple-600" />
                    {esiScore.estimatedResources}
                  </span>
                </div>
              </div>

              {/* Clinical Action Recommendation */}
              <p className="text-xs text-slate-700 bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 leading-relaxed">
                <b>Khuyến cáo hành động ESI:</b> {esiScore.recommendation}
              </p>
            </div>

            {/* Right: Big ESI Level Display & 5-tier Gauge */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[200px] w-full lg:w-auto shrink-0 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Thang Phân Tầng Cấp Cứu
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-4xl font-extrabold font-mono-custom tracking-tight" style={{ color: esiScore.color.hex }}>
                  ESI {esiScore.level}
                </span>
                <span className="text-xs text-slate-400">/ 5</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${esiScore.color.badge}`}>
                {esiScore.label}
              </span>

              {/* 5-tier ESI Spectrum Gauge */}
              <div className="w-full mt-3 space-y-1">
                <div className="grid grid-cols-5 gap-1 h-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`rounded-xs transition-all ${
                        lvl === esiScore.level
                          ? 'ring-2 ring-slate-800 ring-offset-1 scale-y-125'
                          : 'opacity-40'
                      }`}
                      style={{
                        backgroundColor:
                          lvl === 1
                            ? '#dc2626'
                            : lvl === 2
                            ? '#ea580c'
                            : lvl === 3
                            ? '#f59e0b'
                            : lvl === 4
                            ? '#10b981'
                            : '#06b6d4',
                      }}
                      title={`Mức ${lvl}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono-custom">
                  <span>Hồi sức (1)</span>
                  <span>Không CC (5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* ESI Details Table Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowEsiDetails(!showEsiDetails)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              {showEsiDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showEsiDetails ? 'Ẩn chi tiết thuật toán ESI' : 'Xem các bước quyết định ESI A-B-C-D'}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, 'ESI', 'CC')}
              className="text-[11px] text-slate-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Tra cứu Cẩm nang ESI tại Kho Công cụ</span>
            </button>
          </div>

          {showEsiDetails && (
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 animate-fadeIn">
              <b className="text-slate-800">4 Bước phân loại thuật toán ESI:</b>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                <li>
                  <b>Quyết định A (Mức 1):</b> Bệnh nhân có cần can thiệp hồi sức cứu mạng ngay không (Ngưng tim, mất mạch, đặt NKQ, sốc nặng)?
                </li>
                <li>
                  <b>Quyết định B (Mức 2):</b> Bệnh nhân có thuộc nhóm nguy cơ cao, lơ mơ/lẫn lộn hoặc đau dữ dội (VAS ≥ 7)?
                </li>
                <li>
                  <b>Quyết định C (Mức 3-5):</b> Bệnh nhân cần bao nhiêu nguồn lực xét nghiệm/can thiệp (0 nguồn = ESI 5, 1 nguồn = ESI 4, ≥ 2 nguồn = ESI 3)?
                </li>
                <li>
                  <b>Quyết định D:</b> Đánh giá lại dấu hiệu sinh tồn ngoài vùng an toàn để cân nhắc nâng cấp lên ESI 2.
                </li>
              </ol>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: 2. PEWS (PEDIATRIC EARLY WARNING SCORE) */}
      {activeScoreSystem === 'pews' && (
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${pewsScore.color.badge}`}>
                  PEWS {pewsScore.score} điểm · {pewsScore.label}
                </span>
                <span className="text-xs text-slate-500 font-mono-custom">
                  Chuẩn Cảnh Báo Sớm Nhi Khoa Quốc Tế
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                {pewsScore.description}
              </h3>

              {/* Quick Monitoring & Escalation Protocols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Tần suất theo dõi:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-rose-600" />
                    {pewsScore.monitoringFrequency}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Cấp báo động lâm sàng:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <ShieldAlert className="w-3 h-3 text-amber-600" />
                    {pewsScore.escalationLevel}
                  </span>
                </div>
              </div>

              {/* Clinical Action Recommendation */}
              <p className="text-xs text-slate-700 bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 leading-relaxed">
                <b>Khuyến cáo hành động PEWS:</b> {pewsScore.clinicalAction}
              </p>
            </div>

            {/* Right: Big Numeric Score & PEWS Meter */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[200px] w-full lg:w-auto shrink-0 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Điểm Nguy Cơ Nhi Khoa
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-4xl font-extrabold font-mono-custom tracking-tight" style={{ color: pewsScore.color.hex }}>
                  {pewsScore.score}
                </span>
                <span className="text-xs text-slate-400">/ 9+</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${pewsScore.color.badge}`}>
                {pewsScore.label}
              </span>

              {/* 4-tier PEWS Urgency Meter */}
              <div className="w-full mt-3 space-y-1">
                <div className="grid grid-cols-4 gap-1 h-2">
                  {['Thấp (0-2)', 'Trung bình (3-4)', 'Cao (5-6)', 'Nguy kịch (≥7)'].map((tierLabel, idx) => {
                    const currentIdx =
                      pewsScore.score >= 7 ? 3 : pewsScore.score >= 5 ? 2 : pewsScore.score >= 3 ? 1 : 0;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xs transition-all ${
                          idx === currentIdx ? 'ring-2 ring-slate-800 ring-offset-1 scale-y-125' : 'opacity-40'
                        }`}
                        style={{
                          backgroundColor:
                            idx === 0 ? '#10b981' : idx === 1 ? '#f59e0b' : idx === 2 ? '#ea580c' : '#dc2626',
                        }}
                        title={tierLabel}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono-custom">
                  <span>Ổn định (0)</span>
                  <span>Nguy kịch (≥7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 PEWS Physiological Domains */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="p-2.5 bg-blue-50/50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900 block mb-1">1. Hành vi & Tri giác:</span>
              <span className="text-slate-700">Tỉnh táo, tiếp xúc tốt hoặc lừ đừ/kém chơi</span>
            </div>
            <div className="p-2.5 bg-rose-50/50 border border-rose-200 rounded-lg">
              <span className="font-bold text-rose-900 block mb-1">2. Tim mạch & CRT:</span>
              <span className="text-slate-700">Màu sắc da hồng hào hoặc tái nhợt; CRT &lt; 2s</span>
            </div>
            <div className="p-2.5 bg-cyan-50/50 border border-cyan-200 rounded-lg">
              <span className="font-bold text-cyan-900 block mb-1">3. Hô hấp & Co kéo:</span>
              <span className="text-slate-700">Nhịp thở theo tuổi; co kéo lồng ngực nhẹ/vừa/nặng</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. NEWS2 (NATIONAL EARLY WARNING SCORE) */}
      {activeScoreSystem === 'news2' && (
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${riskScore.color.badge}`}>
                  NEWS2 {riskScore.totalScore} điểm · {riskScore.label}
                </span>
                <span className="text-xs text-slate-500 font-mono-custom">
                  Chuẩn Royal College of Physicians (UK)
                </span>
              </div>

              <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                {riskScore.description}
              </h3>

              {/* Monitoring & Clinical Action Protocols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Tần suất theo dõi:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-blue-600" />
                    {riskScore.monitoringFrequency}
                  </span>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200/80 rounded-lg">
                  <span className="block text-[10px] text-slate-400 font-semibold uppercase">Cấp báo động đáp ứng:</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <ShieldAlert className="w-3 h-3 text-amber-600" />
                    {riskScore.clinicalResponse}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50/80 border border-slate-200/60 rounded-lg p-2.5 leading-relaxed">
                <b>Khuyến cáo hành động NEWS2:</b> {riskScore.recommendation}
              </p>
            </div>

            {/* Right: Big Numeric Score & Gauge Bar */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-xl min-w-[200px] w-full lg:w-auto shrink-0 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Thang Điểm NEWS2
              </span>
              <div className="flex items-baseline gap-1 my-1">
                <span className="text-4xl font-extrabold font-mono-custom tracking-tight" style={{ color: riskScore.color.hex }}>
                  {riskScore.totalScore}
                </span>
                <span className="text-xs text-slate-400">/ 20</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${riskScore.color.badge}`}>
                {riskScore.label}
              </span>

              {/* Visual Color-Coded Urgency Meter (4 Spectrum Bars) */}
              <div className="w-full mt-3 space-y-1">
                <div className="grid grid-cols-4 gap-1 h-2">
                  {['0-4 (Thấp)', '3đ đơn (Trung bình thấp)', '5-6 (Trung bình)', '≥7 (Cao)'].map((label, idx) => {
                    const currentIdx =
                      riskScore.totalScore >= 7 ? 3 : riskScore.totalScore >= 5 ? 2 : riskScore.totalScore >= 1 ? 1 : 0;
                    return (
                      <div
                        key={idx}
                        className={`rounded-xs transition-all ${
                          idx === currentIdx ? 'ring-2 ring-slate-800 ring-offset-1 scale-y-125' : 'opacity-40'
                        }`}
                        style={{
                          backgroundColor:
                            idx === 0 ? '#10b981' : idx === 1 ? '#f59e0b' : idx === 2 ? '#ea580c' : '#dc2626',
                        }}
                        title={label}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-mono-custom">
                  <span>Ổn định (0)</span>
                  <span>Nguy kịch (≥7)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Toggle & Detail Table */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              {showBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showBreakdown ? 'Ẩn bảng chi tiết chỉ số' : 'Xem chi tiết điểm từng thông số sinh hiệu'}</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, 'NEWS2', 'CC')}
              className="text-[11px] text-slate-500 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Tra cứu Thang điểm NEWS2 tại Kho Công cụ</span>
            </button>
          </div>

          {showBreakdown && (
            <div className="overflow-x-auto pt-1 animate-fadeIn">
              <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden font-mono-custom">
                <thead className="bg-slate-100/80 text-slate-700 font-sans">
                  <tr>
                    <th className="p-2 border-b">Thông số sinh hiệu</th>
                    <th className="p-2 border-b">Giá trị nạp</th>
                    <th className="p-2 border-b text-center">Điểm NEWS2</th>
                    <th className="p-2 border-b">Đánh giá nguy cơ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {riskScore.breakdown.map((row, idx) => (
                    <tr key={idx} className={row.points > 0 ? 'bg-amber-50/40' : 'bg-white'}>
                      <td className="p-2 font-sans font-medium">{row.param}</td>
                      <td className="p-2 font-bold">{row.value}</td>
                      <td className="p-2 text-center font-bold">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[11px] ${
                            row.points === 3
                              ? 'bg-red-100 text-red-800 font-extrabold'
                              : row.points === 2
                              ? 'bg-orange-100 text-orange-800'
                              : row.points === 1
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          +{row.points}
                        </span>
                      </td>
                      <td className="p-2 font-sans text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
