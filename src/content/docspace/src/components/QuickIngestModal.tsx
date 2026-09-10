import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardPaste,
  Copy,
  Download,
  FileCode,
  FileText,
  HelpCircle,
  Sparkles,
  Upload,
  X,
} from 'lucide-react';
import { SoapClinicalExperience } from '../types.ts';
import {
  generateSoapMarkdown,
  IngestResult,
  parseNotebookLmSoapMarkdown,
} from '../lib/clientSideIngest.ts';

interface QuickIngestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveCase: (soap: SoapClinicalExperience) => void;
  onOpenPromptBuilder?: () => void;
}

export const QuickIngestModal: React.FC<QuickIngestModalProps> = ({
  isOpen,
  onClose,
  onSaveCase,
  onOpenPromptBuilder,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rawText, setRawText] = useState<string>('');
  const [parseResult, setParseResult] = useState<IngestResult | null>(null);
  const [editedSoap, setEditedSoap] = useState<SoapClinicalExperience | null>(null);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setRawText(text);
      }
    } catch {
      // Fallback if permission denied
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setRawText(content);
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyze = () => {
    if (!rawText.trim()) return;
    const res = parseNotebookLmSoapMarkdown(rawText);
    setParseResult(res);
    setEditedSoap(res.soap);
    setStep(2);
  };

  const handleSaveToApp = () => {
    if (!editedSoap) return;
    onSaveCase(editedSoap);
    setStep(3);
  };

  const handleDownloadMarkdown = () => {
    if (!editedSoap) return;
    const md = generateSoapMarkdown(editedSoap);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editedSoap.id || 'soap-case'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    if (!editedSoap) return;
    const md = generateSoapMarkdown(editedSoap);
    navigator.clipboard.writeText(md);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleReset = () => {
    setStep(1);
    setRawText('');
    setParseResult(null);
    setEditedSoap(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">
                  Nạp Ca Lâm Sàng từ NotebookLM
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Client-side Parser
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chuyển đổi văn bản phản hồi của NotebookLM thành cấu trúc dữ liệu SOAP chuẩn hóa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="flex border-b border-slate-100 bg-white px-6 py-3 text-xs">
          <div className={`flex items-center gap-2 font-medium ${step >= 1 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>1</span>
            <span>Dán Markdown</span>
          </div>
          <div className="w-8 h-px bg-slate-200 self-center mx-3" />
          <div className={`flex items-center gap-2 font-medium ${step >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>2</span>
            <span>Xem trước & Hiệu chỉnh</span>
          </div>
          <div className="w-8 h-px bg-slate-200 self-center mx-3" />
          <div className={`flex items-center gap-2 font-medium ${step >= 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>3</span>
            <span>Hoàn tất</span>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Paste Markdown */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dán toàn bộ kết quả phân tích ca bệnh từ NotebookLM:</span>
                </label>
                <div className="flex items-center gap-2">
                  {onOpenPromptBuilder && (
                    <button
                      type="button"
                      onClick={onOpenPromptBuilder}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:underline"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Chưa có kết quả? Tạo prompt</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>Dán từ Clipboard</span>
                  </button>
                  <label className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải file .md</span>
                    <input
                      type="file"
                      accept=".md,.txt"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>

              <textarea
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                rows={14}
                placeholder={`Dán kết quả tại đây. Hỗ trợ đầy đủ:
- Có hoặc không có phần YAML frontmatter (---)
- Các tiêu đề dạng: ## 1. S / ## S / ### S / **S:**
- Định dạng tiếng Việt hoặc tiếng Anh...`}
                className="w-full text-xs font-mono p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50 text-slate-800 resize-none leading-relaxed"
              />

              <div className="bg-amber-50 border border-amber-200/70 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-800">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold">Mẹo tối ưu:</span> Sử dụng prompt chuẩn hóa từ MedLens để NotebookLM sinh ra đầy đủ 4 phần (S, O, A, P), mã ICD-10 và bảng y lệnh thuốc. Bộ phân tích sẽ tự động nhận diện theo cơ chế <span className="font-semibold">Cascade Matching 6 cấp độ</span>.
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Preview & Edit */}
          {step === 2 && editedSoap && parseResult && (
            <div className="space-y-5">
              {/* Score & Validation Alert */}
              <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-white ${
                      parseResult.validation.score >= 80
                        ? 'bg-emerald-600'
                        : parseResult.validation.score >= 50
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                  >
                    <span className="text-sm leading-none">{parseResult.validation.score}</span>
                    <span className="text-[9px] font-normal opacity-90">/ 100</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                      <span>Độ tin cậy cấu trúc</span>
                      {parseResult.validation.isValid ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-semibold">
                          Hợp lệ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 font-semibold">
                          Thiếu thông tin trọng yếu
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {parseResult.validation.warnings.length > 0
                        ? parseResult.validation.warnings.join(' • ')
                        : 'Dữ liệu đầy đủ 4 phần S - O - A - P.'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sửa lại Markdown</span>
                </button>
              </div>

              {/* Case Metadata Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 border border-slate-200 rounded-xl">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Tiêu đề ca lâm sàng:
                  </label>
                  <input
                    type="text"
                    value={editedSoap.title}
                    onChange={(e) => setEditedSoap({ ...editedSoap, title: e.target.value })}
                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Chuyên khoa:
                  </label>
                  <input
                    type="text"
                    value={editedSoap.specialty}
                    onChange={(e) => setEditedSoap({ ...editedSoap, specialty: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Mã ICD-10:
                  </label>
                  <input
                    type="text"
                    value={editedSoap.a.icd10}
                    onChange={(e) =>
                      setEditedSoap({
                        ...editedSoap,
                        a: { ...editedSoap.a, icd10: e.target.value },
                      })
                    }
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Phân loại mức độ:
                  </label>
                  <select
                    value={editedSoap.experienceLevel}
                    onChange={(e) =>
                      setEditedSoap({
                        ...editedSoap,
                        experienceLevel: e.target.value as any,
                      })
                    }
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="essential">Kinh điển (Essential)</option>
                    <option value="pitfall">Bẫy lâm sàng (Pitfall)</option>
                    <option value="rare">Ca hiếm gặp (Rare)</option>
                    <option value="advanced">Chuyên sâu (Advanced)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Bác sĩ đúc kết:
                  </label>
                  <input
                    type="text"
                    value={editedSoap.authorDoctor || ''}
                    onChange={(e) =>
                      setEditedSoap({ ...editedSoap, authorDoctor: e.target.value })
                    }
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* SOAP 4 Quadrant Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* S */}
                <div className="bg-sky-50/40 border border-sky-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] flex items-center justify-center font-bold">S</span>
                      <span>Chủ quan (Subjective)</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Lý do nhập viện:</span>
                    <p className="text-xs font-semibold text-slate-800">{editedSoap.s.chiefComplaint}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Bệnh sử tóm tắt:</span>
                    <p className="text-xs text-slate-700 whitespace-pre-wrap max-h-24 overflow-y-auto">
                      {editedSoap.s.historyOfPresentIllness || 'Chưa ghi nhận'}
                    </p>
                  </div>
                </div>

                {/* O */}
                <div className="bg-purple-50/40 border border-purple-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">O</span>
                      <span>Khách quan (Objective)</span>
                    </span>
                  </div>
                  {/* Vitals pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(editedSoap.o.vitals).map(([k, v]) => (
                      v ? (
                        <span key={k} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-[11px] font-mono text-purple-800">
                          {k.toUpperCase()}: {v}
                        </span>
                      ) : null
                    ))}
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Khám thực thể:</span>
                    <p className="text-xs text-slate-700 max-h-20 overflow-y-auto">
                      {editedSoap.o.physicalExam || 'Chưa ghi nhận'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Cận lâm sàng:</span>
                    <p className="text-xs text-slate-700 max-h-20 overflow-y-auto">
                      {editedSoap.o.labsAndImaging || 'Chưa ghi nhận'}
                    </p>
                  </div>
                </div>

                {/* A */}
                <div className="bg-amber-50/40 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] flex items-center justify-center font-bold">A</span>
                      <span>Đánh giá & Biện luận (Assessment)</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Chẩn đoán xác định:</span>
                    <p className="text-xs font-bold text-slate-900">{editedSoap.a.primaryDiagnosis}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Chẩn đoán phân biệt:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {editedSoap.a.differentials.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-amber-200 text-[11px] text-amber-900">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* P */}
                <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">P</span>
                      <span>Kế hoạch xử trí (Plan)</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Xử trí tức thì:</span>
                    <p className="text-xs text-slate-700">{editedSoap.p.immediateActions}</p>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium">Thuốc ({editedSoap.p.medications.length} loại):</span>
                    <div className="space-y-1 mt-1 max-h-24 overflow-y-auto">
                      {editedSoap.p.medications.map((m, i) => (
                        <div key={i} className="text-xs bg-white border border-emerald-200/70 p-1.5 rounded-md flex items-center justify-between">
                          <span className="font-semibold text-emerald-900">{m.drug}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{m.dose} ({m.route})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Success & Actions */}
          {step === 3 && editedSoap && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-slate-900">
                  Nạp Ca Lâm Sàng Thành Công!
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Ca bệnh <span className="font-semibold text-slate-800">"{editedSoap.title}"</span> đã được thêm vào phiên làm việc hiện tại của bạn.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file Markdown (.md) cho Vault</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedNotification ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedNotification ? 'Đã sao chép!' : 'Sao chép Markdown'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Nạp thêm ca khác
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 max-w-lg mx-auto text-left text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">📌 Để lưu vĩnh viễn vào Knowledge Vault:</div>
                <div>
                  1. Nhấn <span className="font-semibold">"Tải file Markdown"</span> ở trên để tải file về máy.
                </div>
                <div>
                  2. Di chuyển file vào thư mục: <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">src/content/knowledge-vault/ba/</code>
                </div>
                <div>
                  3. Chạy lệnh: <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px] font-mono">node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/</code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80">
          <div>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Quay lại
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step === 1 && (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  disabled={!rawText.trim()}
                  onClick={handleAnalyze}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <span>Phân tích cú pháp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={handleSaveToApp}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Xác nhận & Thêm vào phiên làm việc</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Đóng
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
