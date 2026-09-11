import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import {
  ComplicationEntry,
  detectComplicationRisks,
  getComplicationsForDisease,
} from '../data/complications-database.ts';
import { LabsState, VitalsState } from '../types.ts';

interface ComplicationSentinelProps {
  diseaseId: string;
  diseaseName: string;
  vitals?: VitalsState;
  labs?: LabsState;
  onAddPreventionOrder?: (drugName: string, dosage: string, note: string) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const ComplicationSentinelPanel: React.FC<ComplicationSentinelProps> = ({
  diseaseId,
  diseaseName,
  vitals,
  labs,
  onAddPreventionOrder,
  onOpenVaultDrawer,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [addedPreventionIds, setAddedPreventionIds] = useState<Set<string>>(new Set());

  // Get disease complication profile
  const profile = useMemo(() => {
    return getComplicationsForDisease(diseaseId) || getComplicationsForDisease(diseaseName);
  }, [diseaseId, diseaseName]);

  // Run real-time detection on patient vitals & labs
  const activeAlerts = useMemo(() => {
    return detectComplicationRisks(diseaseId, vitals, labs);
  }, [diseaseId, vitals, labs]);

  const handleAddPrevention = (comp: ComplicationEntry) => {
    setAddedPreventionIds((prev) => new Set(prev).add(comp.id));

    // Determine sample prevention order based on complication type
    let drug = 'Omeprazole / Pantoprazole';
    let dose = '40 mg tiêm tĩnh mạch x 1 lần/ngày';
    let note = `Dự phòng biến chứng: ${comp.name}`;

    if (comp.id.includes('dvt') || comp.id.includes('thrombosis') || comp.id.includes('mechanical')) {
      drug = 'Enoxaparin (Lovenox)';
      dose = '40 mg tiêm dưới da x 1 lần/ngày';
      note = `Dự phòng huyết khối thuyên tắc mạch`;
    } else if (comp.id.includes('shock') || comp.id.includes('renal') || comp.id.includes('cardiorenal')) {
      drug = 'Natri Clorid 0,9%';
      dose = '500 mL TTM 30 giọt/phút';
      note = `Duy trì tưới máu thận và huyết động`;
    }

    onAddPreventionOrder?.(drug, dose, note);
  };

  if (!profile && activeAlerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-rose-50/60 via-amber-50/40 to-slate-50 border border-rose-200 rounded-lg p-3.5 sm:p-4 shadow-xs flex flex-col gap-3">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-rose-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-rose-950 flex items-center gap-2 flex-wrap">
              <span>Động Cơ Giám Sát Cảnh Báo Sớm & Dự Phòng Biến Chứng (Kho BC)</span>
              {activeAlerts.length > 0 && (
                <span className="px-2 py-0.5 text-[10.5px] font-bold bg-red-600 text-white rounded-full animate-pulse flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {activeAlerts.length} CẢNH BÁO BIẾN CỐ ĐANG PHÁT TÍN HIỆU
                </span>
              )}
            </h4>
            <p className="text-[11px] text-slate-500">
              Đối chiếu sinh hiệu/xét nghiệm cờ đỏ & Lập kế hoạch can thiệp dự phòng chủ động
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(diseaseName, undefined, 'BC')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            title="Mở toàn văn bài viết Kho Biến Chứng trong Vault Drawer"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden sm:inline">Kho Biến chứng</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-3 pt-1">
          {/* 1. ACTIVE EARLY WARNING SENTINEL ALERTS */}
          {activeAlerts.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex flex-col gap-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-red-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>PHÁT HIỆN DẤU HIỆU CẢNH BÁO SỚM (EARLY WARNING SIGNS):</span>
              </div>
              <div className="space-y-2">
                {activeAlerts.map((alert, idx) => (
                  <div key={idx} className="bg-white p-3 rounded border border-red-200 flex flex-col gap-1.5 text-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-red-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-red-600" />
                        {alert.complication.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800">
                        CỬA SỔ NGUY KỊCH: {alert.complication.timeframe}
                      </span>
                    </div>

                    <div className="text-[11.5px] text-slate-800 font-medium">
                      <b>Dấu hiệu kích hoạt:</b>{' '}
                      <span className="text-red-700 font-bold">{alert.matchedTriggers.join(' · ')}</span>
                    </div>

                    <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-700">
                      <b className="text-blue-900">Xử trí cấp cứu khẩn cấp:</b> {alert.complication.emergencyManagement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. COMPLICATIONS MATRIX & PREVENTION CHECKLIST */}
          {profile && profile.complications.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
              <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Ma trận biến chứng & Kế hoạch dự phòng ({profile.complications.length} biến chứng chính):</span>
                </span>
                <span className="text-[10.5px] text-slate-500 font-mono-custom">
                  {profile.diseaseName} ({profile.icd10})
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {profile.complications.map((comp) => {
                  const isAdded = addedPreventionIds.has(comp.id);
                  return (
                    <div key={comp.id} className="p-3 flex flex-col gap-2 hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {comp.name}
                          </span>
                          <span className="px-1.5 py-0.5 text-[10px] rounded font-mono-custom bg-slate-100 text-slate-700">
                            Tần suất: {comp.incidence}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10.5px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {comp.timeframe}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddPrevention(comp)}
                            disabled={isAdded}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                              isAdded
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                            title="Thêm y lệnh thuốc dự phòng biến chứng này vào Bảng Y Lệnh Step 3"
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Đã thêm dự phòng</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Thêm dự phòng</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        <b className="text-slate-700">Cơ chế:</b> {comp.pathophysiology}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-amber-50/60 p-2 rounded border border-amber-100 text-amber-950">
                          <b>Dấu hiệu nhận diện sớm:</b> {comp.earlyWarningSigns.join(', ')}
                        </div>
                        <div className="bg-blue-50/60 p-2 rounded border border-blue-100 text-blue-950">
                          <b>Chiến lược dự phòng:</b> {comp.preventionStrategy}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
