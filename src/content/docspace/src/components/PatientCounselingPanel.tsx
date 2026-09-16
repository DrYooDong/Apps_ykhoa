import React, { useMemo } from 'react';
import {
  BookOpen,
  ExternalLink,
  Heart,
  MessageSquare,
  Search,
} from 'lucide-react';
import { VAULT_CATALOG, getKnowledgeVaultWebUrl } from '../lib/vaultBridge.ts';

interface PatientCounselingProps {
  diseaseName: string;
  icd10: string;
  patientAge?: string;
  patientGender?: string;
  prescribedDrugs?: string[];
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const PatientCounselingPanel: React.FC<PatientCounselingProps> = ({
  diseaseName,
  icd10,
  onOpenVaultDrawer,
}) => {
  // Find matching TV article in Vault Catalog (Kho Tư Vấn - TV)
  const matchedTvArticle = useMemo(() => {
    const cleanName = diseaseName.toLowerCase().trim();
    return VAULT_CATALOG.find(
      (a) =>
        a.khoCode === 'TV' &&
        (a.title.toLowerCase().includes(cleanName) ||
          cleanName.includes(a.title.toLowerCase()) ||
          (a.aliases && a.aliases.some((al) => al.toLowerCase().includes(cleanName))))
    );
  }, [diseaseName]);

  // Nếu không có bài viết trong Kho TV -> Hiển thị thông báo "Đang cập nhật" tinh gọn, trung thực
  if (!matchedTvArticle) {
    return (
      <div className="bg-slate-50/70 border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2.5 text-slate-400">
          <Heart className="w-5 h-5" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Đang cập nhật
        </div>
        <h4 className="font-display font-bold text-sm text-slate-700 mb-1">
          Nội dung tư vấn người bệnh đang được cập nhật
        </h4>
        <p className="text-xs text-slate-500 max-w-md mb-3 leading-relaxed">
          Tài liệu tư vấn, giáo dục sức khỏe và hướng dẫn dặn dò cho bệnh lý{' '}
          <span className="font-semibold text-slate-700">«{diseaseName}»</span> (ICD: {icd10}) hiện chưa có trong Kho Tư Vấn EBM (Kho TV). Dữ liệu sẽ được cập nhật khi có bài viết đối ứng.
        </p>
        {onOpenVaultDrawer && (
          <button
            type="button"
            onClick={() => onOpenVaultDrawer(diseaseName, undefined, 'TV')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Tra cứu trong Kho Tư Vấn (TV)</span>
          </button>
        )}
      </div>
    );
  }

  // Nếu có bài viết đối ứng trong Kho TV
  return (
    <div className="bg-white border border-teal-200 rounded-xl p-4 shadow-2xs flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-teal-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs sm:text-sm text-teal-950 flex items-center gap-2 flex-wrap">
              <span>Tài Liệu Tư Vấn & Dặn Dò Người Bệnh (Kho TV)</span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-teal-100 text-teal-800 rounded font-semibold border border-teal-200">
                Kho TV
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Biên soạn theo khuyến cáo giáo dục sức khỏe và y học chứng cứ EBM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenVaultDrawer && (
            <button
              type="button"
              onClick={() => onOpenVaultDrawer(diseaseName, matchedTvArticle.title, 'TV')}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 text-xs font-semibold rounded shadow-2xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Xem trong Vault Drawer</span>
            </button>
          )}
          {matchedTvArticle.id && (
            <a
              href={getKnowledgeVaultWebUrl(matchedTvArticle.id)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded shadow-2xs transition-colors"
            >
              <span>Mở bài viết</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-3.5 bg-teal-50/50 border border-teal-100 rounded-lg">
        <h5 className="font-bold text-sm text-teal-950 mb-1">
          {matchedTvArticle.title}
        </h5>
        <p className="text-xs text-slate-700 leading-relaxed mb-2">
          {matchedTvArticle.snippet || 'Nội dung tư vấn và giáo dục sức khỏe chi tiết cho người bệnh.'}
        </p>
        {matchedTvArticle.tags && matchedTvArticle.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {matchedTvArticle.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-white text-teal-800 border border-teal-200 rounded text-[10.5px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
