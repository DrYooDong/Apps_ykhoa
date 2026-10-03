import React, { useState, useMemo, useRef } from 'react';
import {
  AlertCircle,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  FileCode,
  FileText,
  Filter,
  Layers,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  CLINICAL_SPECIALTIES,
  deleteCustomProtocol,
  EditableProtocolItem,
  exportProtocolsToJson,
  getCustomProtocols,
  importProtocolsFromJson,
} from '../../lib/protocolRegistry.ts';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';

interface ProtocolManagementSectionProps {
  currentDiseaseId: string;
  currentDiseaseName: string;
  currentDiseaseIcd: string;
  currentTimelinePhases: DailyTimelinePhase[];
  onOpenEditorModal: () => void;
  onSelectDisease: (diseaseId: string) => void;
  availableDiseases: Array<{ id: string; ten: string; icd: string; nhom?: string; baoDong?: boolean }>;
}

export const ProtocolManagementSection: React.FC<ProtocolManagementSectionProps> = ({
  currentDiseaseId,
  currentDiseaseName,
  currentDiseaseIcd,
  currentTimelinePhases,
  onOpenEditorModal,
  onSelectDisease,
  availableDiseases,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [importStatus, setImportStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const customProtocols = useMemo(() => getCustomProtocols(), []);
  const customDiseaseIds = useMemo(() => new Set(customProtocols.map((p) => p.diseaseId)), [customProtocols]);

  // Filtered diseases from both built-in and custom
  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return availableDiseases.filter((d) => {
      const matchSpecialty = selectedSpecialty === 'all' || d.nhom === selectedSpecialty;
      const matchQuery = !q || d.ten.toLowerCase().includes(q) || d.icd.toLowerCase().includes(q);
      return matchSpecialty && matchQuery;
    });
  }, [availableDiseases, searchQuery, selectedSpecialty]);

  const handleExportJson = () => {
    const jsonStr = exportProtocolsToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docspace-protocols-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCurrentProtocolJson = () => {
    const data = {
      diseaseId: currentDiseaseId,
      diseaseName: currentDiseaseName,
      icd10: currentDiseaseIcd,
      timelinePhases: currentTimelinePhases,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const res = importProtocolsFromJson(content);
        if (res.success) {
          setImportStatus({ message: `Nhập thành công ${res.count} phác đồ mới.` });
          setTimeout(() => setImportStatus(null), 3500);
        } else {
          setImportStatus({ message: res.error || 'Lỗi định dạng JSON', isError: true });
        }
      } catch (err: any) {
        setImportStatus({ message: err?.message || 'Không thể đọc tệp JSON', isError: true });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteCustom = (diseaseId: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa phác đồ tùy biến "${name}"?`)) {
      deleteCustomProtocol(diseaseId);
      window.location.reload();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      {/* 1. Header Khối Quản Lý */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              4
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Quản Lý &amp; Biên Tập Danh Mục Phác Đồ Điều Trị
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {availableDiseases.length} Phác đồ
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Hệ thống quản lý tri thức phác đồ lâm sàng mở rộng, hỗ trợ lượng phác đồ lớn chuẩn Bộ Y Tế, cho phép tra cứu, chỉnh sửa liều lượng, bổ sung phác đồ mới và sao lưu JSON.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenEditorModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
            title="Mở trình soạn thảo để chỉnh sửa liều lượng hoặc thêm mới phác đồ"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Biên tập / Thêm mới</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Nhập phác đồ điều trị từ tệp JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nhập JSON</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Tải về file JSON toàn bộ phác đồ tùy chỉnh"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Xuất JSON</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCurrentProtocolJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            title="Sao chép cấu trúc JSON của phác đồ đang chọn"
          >
            {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedNotification ? 'Đã sao chép' : 'Sao chép JSON'}</span>
          </button>
        </div>
      </div>

      {/* Thông báo trạng thái nhập file */}
      {importStatus && (
        <div
          className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between gap-2 ${
            importStatus.isError
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {importStatus.isError ? <AlertCircle className="w-4 h-4 text-rose-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            <span>{importStatus.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setImportStatus(null)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Thẻ Thông Tin Phác Đồ Đang Hoạt Động */}
      <div className="p-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/90 rounded-xl space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-950 uppercase tracking-wide">
              Phác đồ đang áp dụng trong phiên làm việc:
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 font-mono">
              ICD-10: {currentDiseaseIcd}
            </span>
            {customDiseaseIds.has(currentDiseaseId) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                Đã tùy biến
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-blue-200/60 shadow-2xs">
          <div>
            <h4 className="text-base font-extrabold text-blue-950">{currentDiseaseName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Bao gồm {currentTimelinePhases.length} giai đoạn điều trị &bull; Y lệnh theo chuẩn Bộ Y Tế &amp; Hội Chuyên khoa
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              onClick={onOpenEditorModal}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-2xs cursor-pointer transition-colors flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Sửa phác đồ này</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Danh Mục Tra Cứu Toàn Bộ Phác Đồ Trong Hệ Thống */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Kho Phác Đồ Sẵn Có Trong DocSpace ({filteredList.length} phác đồ):
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Bộ lọc chuyên khoa */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="p-1.5 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none cursor-pointer font-medium"
            >
              {CLINICAL_SPECIALTIES.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.name}
                </option>
              ))}
            </select>

            {/* Ô tìm kiếm */}
            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phác đồ..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Danh sách thẻ phác đồ (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredList.map((disease) => {
            const isSelected = disease.id === currentDiseaseId;
            const isCustom = customDiseaseIds.has(disease.id);

            return (
              <div
                key={disease.id}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {disease.ten}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                      {disease.icd}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 flex-wrap">
                    <span>Chuyên khoa:</span>
                    <span className="font-semibold text-slate-700">{disease.nhom || 'Đa khoa'}</span>
                    {isCustom && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Bác sĩ tùy biến
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                  {isSelected ? (
                    <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đang chọn</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectDisease(disease.id)}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      Chọn xem phác đồ &rarr;
                    </button>
                  )}

                  <div className="flex items-center gap-1.5">
                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustom(disease.id, disease.ten)}
                        className="text-[10px] text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded"
                        title="Xóa phác đồ tùy biến này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                    <span className="text-[10px] text-slate-400">
                      {isCustom ? 'Cục bộ' : 'Chuẩn EBM'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
