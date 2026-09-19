import React from 'react';
import {
  AlertOctagon,
  BookOpen,
  ClipboardCheck,
  ExternalLink,
  FileText,
  HeartPulse,
  Pill,
  Plus,
  Search,
  Zap,
} from 'lucide-react';
import {
  getKnowledgeVaultWebUrl,
  PathwayArticles,
} from '../../lib/vaultBridge.ts';
import { getGuidelineWebUrl } from '../../lib/guidelineBridge.ts';

interface EbmGuidelinesSectionProps {
  diseaseName: string;
  diseaseIcd: string;
  pathway: PathwayArticles;
  matchedGuidelines: Array<{ study: any; matchReason: string }>;
  onApplyGuidelineDrugs: (study: any) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const EbmGuidelinesSection: React.FC<EbmGuidelinesSectionProps> = ({
  diseaseName,
  diseaseIcd,
  pathway,
  matchedGuidelines,
  onApplyGuidelineDrugs,
  onOpenVaultDrawer,
}) => {
  return (
    <div className="space-y-4">
      {/* Knowledge Vault Pathways Header & Facets */}
      <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-200 rounded-lg p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-indigo-950 flex items-center gap-2">
                <span>Chuỗi Bệnh Học Đa Chiều (Knowledge Vault Facets)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                  2.400+ EBM
                </span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Kết nối trực tiếp bài viết chuyên sâu đối ứng trong 18 Kho tri thức CliniPortal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(diseaseName, diseaseIcd)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Tra cứu trong Vault Drawer</span>
          </button>
        </div>

        {/* Pathway facets grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
          {/* 1. GP & Sinh lý */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1 flex items-center gap-1">
                <HeartPulse className="w-3 h-3" />
                1. GP & Sinh lý
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {pathway.gpsl?.title || `Giải phẫu sinh lý ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {pathway.gpsl?.snippet || 'Cơ sở sinh học, tuần hoàn & cấu trúc giải phẫu liên quan.'}
              </p>
            </div>
            {pathway.gpsl ? (
              <a
                href={getKnowledgeVaultWebUrl(pathway.gpsl.id)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
              >
                <span>Đọc bài viết</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'GPSL')}
                className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho GPSL</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 2. Sinh lý bệnh */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                2. Sinh lý bệnh
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {pathway.slb?.title || `Cơ chế bệnh sinh ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {pathway.slb?.snippet || 'Rối loạn tế bào học, phản ứng viêm và tiến triển mô học.'}
              </p>
            </div>
            {pathway.slb ? (
              <a
                href={getKnowledgeVaultWebUrl(pathway.slb.id)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
              >
                <span>Đọc bài viết</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'SLB')}
                className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho SLB</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 3. Tiêu chuẩn chẩn đoán */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-1 flex items-center gap-1">
                <ClipboardCheck className="w-3 h-3" />
                3. Tiêu chuẩn chẩn đoán
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {pathway.cd?.title || `Tiêu chuẩn xác định ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {pathway.cd?.snippet || 'Bộ tiêu chuẩn chẩn đoán quốc tế xác lập ngưỡng xác chẩn.'}
              </p>
            </div>
            {pathway.cd ? (
              <a
                href={getKnowledgeVaultWebUrl(pathway.cd.id)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
              >
                <span>Đọc bài viết</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'CD')}
                className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho CD</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 4. Dược lâm sàng */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1">
                <Pill className="w-3 h-3" />
                4. Dược lý & Liều dùng
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {pathway.duoc?.title || `Dược điều trị ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {pathway.duoc?.snippet || 'Cơ chế tác động thuốc, chuyển hóa gan/thận & tương tác.'}
              </p>
            </div>
            {pathway.duoc ? (
              <a
                href={getKnowledgeVaultWebUrl(pathway.duoc.id)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
              >
                <span>Đọc bài viết</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'DUOC')}
                className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho Dược</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 5. Biến chứng */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                <AlertOctagon className="w-3 h-3" />
                5. Biến chứng nguy cơ
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {pathway.bc?.title || `Biến chứng cấp tính ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {pathway.bc?.snippet || 'Dấu hiệu biến chứng 24-48 giờ đầu và phòng ngừa tử vong.'}
              </p>
            </div>
            {pathway.bc ? (
              <a
                href={getKnowledgeVaultWebUrl(pathway.bc.id)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
              >
                <span>Đọc bài viết</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'BC')}
                className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho Biến chứng</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 6. NCKH & EBM Guidelines */}
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                6. EBM Guidelines
              </div>
              <div className="text-xs font-bold text-slate-800 line-clamp-1">
                {matchedGuidelines.length > 0
                  ? matchedGuidelines[0].study.title
                  : `Khuyến cáo EBM ${diseaseName}`}
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {matchedGuidelines.length > 0
                  ? (matchedGuidelines[0].study.keyResults || matchedGuidelines[0].study.summary)
                  : 'Hướng dẫn điều trị chuẩn hóa theo Bộ Y Tế và Hội chuyên khoa quốc tế.'}
              </p>
            </div>
            {matchedGuidelines.length > 0 ? (
              <div className="mt-2 flex items-center justify-between gap-1 flex-wrap">
                <a
                  href={getGuidelineWebUrl(matchedGuidelines[0].study)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <span>Đọc Guideline</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                {matchedGuidelines.length > 1 && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    +{matchedGuidelines.length - 1} khác
                  </span>
                )}
              </div>
            ) : (
              <button
                onClick={() => onOpenVaultDrawer?.(diseaseName, 'EBM')}
                className="mt-2 text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 self-start cursor-pointer"
              >
                <span>Tìm trong Kho Guidelines</span>
                <Search className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Official Guidelines Cards */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-700/80 flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                  Khuyến Cáo & Hướng Dẫn ĐT EBM Chính Thức
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                  {matchedGuidelines.length} Khuyến Cáo Khớp
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Chuẩn hóa theo Văn bản Quyết định Bộ Y Tế Việt Nam & Hội Chuyên Khoa Quốc Tế (ESC, AHA, IDSA, KDIGO)
              </p>
            </div>
          </div>

          <a
            href="../ebm/guidelines/guidelines.html"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white font-medium text-xs rounded-md transition-colors"
          >
            <span>Mở Chuyên Trang Guidelines</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {matchedGuidelines.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
            {matchedGuidelines.map(({ study, matchReason }) => {
              return (
                <div
                  key={study.id}
                  className="bg-slate-800/90 border border-slate-700 rounded-lg p-3.5 flex flex-col justify-between hover:border-slate-600 transition-colors gap-2.5"
                >
                  <div>
                    {/* Header badges */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-red-950/60 text-red-300 border-red-800/60">
                        {study.organization} ({study.year})
                      </span>
                      {study.impact === 'practice-changing' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Practice-Changing
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">
                        ICD: {study.icd10Codes.join(', ')}
                      </span>
                    </div>

                    {/* Study Title */}
                    <h5 className="font-bold text-xs sm:text-sm text-slate-100 leading-snug line-clamp-2 mb-1.5">
                      {study.title}
                    </h5>

                    {/* Key Results / Landmark Evidence */}
                    <div className="bg-slate-900/60 rounded p-2 text-[11px] text-slate-300 border border-slate-800 mb-2 leading-relaxed">
                      <strong className="text-amber-400 font-semibold block mb-0.5">
                        Kết quả then chốt & Khuyến cáo:
                      </strong>
                      <p className="line-clamp-3">{study.keyResults || study.summary}</p>
                    </div>

                    {/* Recommended Drugs Chips */}
                    {study.drug && (
                      <div className="text-[11px] text-slate-400">
                        <span className="text-slate-400 font-medium">Thuốc khuyến cáo: </span>
                        <span className="text-slate-200 font-mono text-[10.5px]">
                          {study.drug.split(',').slice(0, 4).join(', ')}
                          {study.drug.split(',').length > 4 ? '...' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/60 mt-1">
                    <span className="text-[10px] text-slate-400 italic line-clamp-1">
                      {matchReason}
                    </span>
                    <div className="flex items-center gap-2">
                      {study.drug && (
                        <button
                          type="button"
                          onClick={() => onApplyGuidelineDrugs(study)}
                          className="px-2.5 py-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 rounded transition-colors flex items-center gap-1 cursor-pointer"
                          title="Thêm các thuốc từ Guideline này vào danh mục y lệnh bệnh án"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Nạp vào đơn thuốc</span>
                        </button>
                      )}
                      <a
                        href={getGuidelineWebUrl(study)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/80 rounded transition-colors flex items-center gap-1"
                      >
                        <span>Đọc toàn văn</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 bg-slate-800/60 rounded-lg text-center text-xs text-slate-400">
            <span>Chưa có văn bản khuyến cáo đặc thù khớp chính xác cho mặt bệnh này. </span>
            <a
              href="../ebm/guidelines/guidelines.html"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline font-semibold ml-1"
            >
              Tra cứu trong 78+ Guidelines Kho EBM &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
