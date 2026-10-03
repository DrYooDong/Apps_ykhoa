import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Edit3,
  FileCode,
  FileText,
  Filter,
  Plus,
  RotateCcw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  EditableProtocolItem,
  getCustomProtocols,
  saveCustomProtocol,
  deleteCustomProtocol,
  exportProtocolsToJson,
  importProtocolsFromJson,
  CLINICAL_SPECIALTIES,
} from '../../lib/protocolRegistry.ts';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';

interface ProtocolEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDiseaseId: string;
  currentDiseaseName: string;
  currentDiseaseIcd: string;
  currentTimelinePhases: DailyTimelinePhase[];
  currentCautions?: string[];
  onProtocolSaved?: (diseaseId: string) => void;
}

export const ProtocolEditorModal: React.FC<ProtocolEditorModalProps> = ({
  isOpen,
  onClose,
  currentDiseaseId,
  currentDiseaseName,
  currentDiseaseIcd,
  currentTimelinePhases,
  currentCautions = [],
  onProtocolSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'edit_current' | 'create_new' | 'all_protocols' | 'import_export'>('edit_current');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Form State for Editing or Creating
  const [targetId, setTargetId] = useState(currentDiseaseId);
  const [diseaseName, setDiseaseName] = useState(currentDiseaseName);
  const [diseaseIcd, setDiseaseIcd] = useState(currentDiseaseIcd);
  const [organization, setOrganization] = useState('Bộ Y Tế / Hội Chuyên Khoa');
  const [triageLevel, setTriageLevel] = useState<'outpatient' | 'inpatient' | 'icu'>('inpatient');
  const [specialty, setSpecialty] = useState('nhiem');
  const [cautionsText, setCautionsText] = useState(currentCautions.join('\n'));
  const [phasesJson, setPhasesJson] = useState(() => JSON.stringify(currentTimelinePhases, null, 2));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Import / Export State
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Custom Protocols List from storage
  const customProtocols = useMemo(() => getCustomProtocols(), [saveSuccess]);

  if (!isOpen) return null;

  const handleStartCreateNew = () => {
    setActiveTab('create_new');
    const newId = `custom_protocol_${Date.now()}`;
    setTargetId(newId);
    setDiseaseName('');
    setDiseaseIcd('');
    setOrganization('Bộ Y Tế (Hướng dẫn mới)');
    setTriageLevel('inpatient');
    setSpecialty('nhiem');
    setCautionsText('Theo dõi sát sinh hiệu mỗi 4-6 giờ.\nBáo cáo ngay khi có dấu hiệu cảnh báo đe dọa sinh mạng.');
    const sampleTimeline: DailyTimelinePhase[] = [
      {
        id: `${newId}_phase_1`,
        dayRange: 'Giai đoạn 1',
        phaseName: 'Pha Cấp tính Khởi đầu',
        clinicalGoal: 'Kiểm soát triệu chứng khẩn cấp, ngăn ngừa diễn tiến nặng.',
        treatments: [
          {
            category: 'Điều trị chính',
            content: 'Y lệnh thuốc đặc hiệu hoặc kiểm soát triệu chứng...',
            isHighlighted: true,
          },
          {
            category: 'Hỗ trợ / Bù dịch',
            content: 'Dung dịch tinh thể hoặc đường uống duy trì...',
          },
        ],
        monitoring: [
          { type: 'LS', metric: 'Mạch, HA, Nhịp thở, Nhiệt độ, SpO2', frequency: 'Mỗi 4 giờ' },
          { type: 'CLS', metric: 'Công thức máu, Sinh hóa chức năng', frequency: 'Hằng ngày' },
        ],
        cautionsAndDischarge: {
          cautions: ['Tránh tương tác thuốc nguy hiểm.'],
          triageOrDischargeCriteria: 'Xuất viện khi sinh hiệu ổn định liên tục ≥ 48h.',
        },
      },
    ];
    setPhasesJson(JSON.stringify(sampleTimeline, null, 2));
  };

  const handleSaveProtocol = () => {
    try {
      setJsonError(null);
      if (!diseaseName.trim()) {
        setJsonError('Vui lòng nhập tên bệnh lý hoặc phác đồ.');
        return;
      }

      let parsedPhases: DailyTimelinePhase[] = [];
      if (phasesJson.trim()) {
        parsedPhases = JSON.parse(phasesJson);
        if (!Array.isArray(parsedPhases)) {
          setJsonError('Lộ trình các giai đoạn (timelinePhases) phải là một mảng JSON.');
          return;
        }
      }

      const cautions = cautionsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

      const effectiveId = targetId || `custom_${Date.now()}`;

      const protocolItem: EditableProtocolItem = {
        id: effectiveId,
        diseaseId: effectiveId,
        diseaseName: diseaseName.trim(),
        icd10: diseaseIcd.trim() || 'R69',
        specialty,
        triageLevel,
        organization,
        versionYear: new Date().getFullYear(),
        lastUpdated: new Date().toISOString(),
        description: `Phác đồ điều trị ${diseaseName} cập nhật theo hướng dẫn lâm sàng`,
        timelinePhases: parsedPhases,
        cautions,
        contraindications: [],
        dischargeCriteria: [],
        isCustom: true,
      };

      saveCustomProtocol(protocolItem);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      if (onProtocolSaved) onProtocolSaved(effectiveId);
    } catch (e: any) {
      setJsonError(e?.message || 'Lỗi cú pháp JSON trong lộ trình các giai đoạn.');
    }
  };

  const handleResetToDefault = () => {
    deleteCustomProtocol(currentDiseaseId);
    setTargetId(currentDiseaseId);
    setDiseaseName(currentDiseaseName);
    setDiseaseIcd(currentDiseaseIcd);
    setPhasesJson(JSON.stringify(currentTimelinePhases, null, 2));
    setCautionsText(currentCautions.join('\n'));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
    if (onProtocolSaved) onProtocolSaved(currentDiseaseId);
  };

  const handleExport = () => {
    const jsonStr = exportProtocolsToJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docspace-protocols-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const res = importProtocolsFromJson(importJsonText);
    if (res.success) {
      setImportStatus(`Đã nhập thành công ${res.count} phác đồ.`);
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
      if (onProtocolSaved) onProtocolSaved(currentDiseaseId);
    } else {
      setImportStatus(`Lỗi nhập: ${res.error}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                Quản Lý &amp; Biên Tập Phác Đồ Điều Trị
              </h3>
              <p className="text-xs text-slate-300">
                Tùy biến liều thuốc, lộ trình các giai đoạn, bổ sung phác đồ mới hoặc xuất/nhập JSON
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border-b border-slate-200 text-xs shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('edit_current');
              setTargetId(currentDiseaseId);
              setDiseaseName(currentDiseaseName);
              setDiseaseIcd(currentDiseaseIcd);
              setPhasesJson(JSON.stringify(currentTimelinePhases, null, 2));
              setCautionsText(currentCautions.join('\n'));
            }}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'edit_current'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Biên tập ({diseaseName || currentDiseaseName})</span>
          </button>

          <button
            type="button"
            onClick={handleStartCreateNew}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'create_new'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm Phác Đồ Mới</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('all_protocols')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'all_protocols'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Phác đồ tùy chỉnh ({customProtocols.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('import_export')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'import_export'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Xuất / Nhập JSON</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1 & 2: BIÊN TẬP HOẶC TẠO MỚI */}
          {(activeTab === 'edit_current' || activeTab === 'create_new') && (
            <div className="space-y-4">
              {saveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Đã lưu phác đồ thành công vào kho lưu trữ nội bộ!</span>
                </div>
              )}

              {jsonError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{jsonError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tên bệnh lý / Phác đồ</label>
                  <input
                    type="text"
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                    placeholder="VD: Viêm màng não mủ ở người lớn"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã ICD-10</label>
                  <input
                    type="text"
                    value={diseaseIcd}
                    onChange={(e) => setDiseaseIcd(e.target.value)}
                    placeholder="VD: G00.9"
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tuyến / Phân tầng</label>
                  <select
                    value={triageLevel}
                    onChange={(e: any) => setTriageLevel(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-medium focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="outpatient">Ngoại trú / Theo dõi tại nhà</option>
                    <option value="inpatient">Nội trú khoa Chuyên môn</option>
                    <option value="icu">Hồi sức cấp cứu (ICU / HDU)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chuyên khoa</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-medium focus:border-blue-500 focus:outline-none bg-white"
                  >
                    {CLINICAL_SPECIALTIES.filter((s) => s.id !== 'all').map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cơ quan ban hành / Hướng dẫn căn cứ</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="VD: Quyết định 2760/QĐ-BYT Bộ Y Tế, WHO, GINA..."
                    className="w-full p-2 border border-slate-200 rounded-lg text-xs font-medium focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Lộ trình các giai đoạn JSON Editor */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lộ trình các giai đoạn &amp; Y lệnh thuốc (Cấu trúc JSON chuẩn):</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">timelinePhases (Array)</span>
                </div>
                <textarea
                  rows={12}
                  value={phasesJson}
                  onChange={(e) => setPhasesJson(e.target.value)}
                  className="w-full p-3 font-mono text-[11px] border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Lưu ý lâm sàng */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 text-xs">
                  Lưu ý &amp; Cảnh báo an toàn (Mỗi dòng một lưu ý)
                </label>
                <textarea
                  rows={3}
                  value={cautionsText}
                  onChange={(e) => setCautionsText(e.target.value)}
                  className="w-full p-2.5 text-xs border border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-2">
                {activeTab === 'edit_current' ? (
                  <button
                    type="button"
                    onClick={handleResetToDefault}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 cursor-pointer transition-all flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục phác đồ gốc</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProtocol}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xs cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{activeTab === 'create_new' ? 'Tạo Phác Đồ Mới' : 'Lưu Phác Đồ Này'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DANH MỤC PHÁC ĐỒ TÙY CHỈNH */}
          {activeTab === 'all_protocols' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Các Phác Đồ Do Bác Sĩ Tùy Biến ({customProtocols.length}):
                </h4>
                <button
                  type="button"
                  onClick={handleStartCreateNew}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-2xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm phác đồ mới</span>
                </button>
              </div>

              {customProtocols.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    Chưa có phác đồ tùy chỉnh nào được lưu trong máy.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bác sĩ có thể chỉnh sửa liều lượng phác đồ hiện tại hoặc nhấn "Thêm Phác Đồ Mới".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customProtocols.map((p) => (
                    <div
                      key={p.diseaseId}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-xs text-slate-900">{p.diseaseName}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {p.icd10}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{p.description}</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Cập nhật: {new Date(p.lastUpdated).toLocaleDateString('vi-VN')}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setTargetId(p.diseaseId);
                            setDiseaseName(p.diseaseName);
                            setDiseaseIcd(p.icd10);
                            setSpecialty(p.specialty);
                            setTriageLevel(p.triageLevel);
                            setOrganization(p.organization);
                            setPhasesJson(JSON.stringify(p.timelinePhases, null, 2));
                            setCautionsText(p.cautions.join('\n'));
                            setActiveTab('edit_current');
                          }}
                          className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                        >
                          Chỉnh sửa &rarr;
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Xóa phác đồ "${p.diseaseName}"?`)) {
                              deleteCustomProtocol(p.diseaseId);
                              setSaveSuccess(true);
                              setTimeout(() => setSaveSuccess(false), 500);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Xóa phác đồ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: XUẤT / NHẬP JSON */}
          {activeTab === 'import_export' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span>Sao lưu / Xuất dữ liệu phác đồ</span>
                </h4>
                <p className="text-slate-600 text-xs">
                  Tải toàn bộ phác đồ tùy chỉnh về máy dưới dạng tệp tin JSON để lưu trữ hoặc chia sẻ với đồng nghiệp.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleExport}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải tệp tin JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(exportProtocolsToJson());
                      setCopiedJson(true);
                      setTimeout(() => setCopiedJson(false), 2000);
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700 rounded-lg shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Đã sao chép' : 'Sao chép vào Clipboard'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  <span>Nhập dữ liệu phác đồ từ JSON</span>
                </h4>
                <p className="text-slate-600 text-xs">
                  Dán nội dung JSON phác đồ vào khung bên dưới để đồng bộ vào cơ sở dữ liệu nội bộ.
                </p>

                {importStatus && (
                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-semibold">
                    {importStatus}
                  </div>
                )}

                <textarea
                  rows={6}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Dán chuỗi JSON phác đồ hoặc mảng phác đồ tại đây..."
                  className="w-full p-2.5 font-mono text-[11px] border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Tiến hành nhập dữ liệu</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
