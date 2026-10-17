import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Download,
  Github,
  FileText,
  Activity,
  Layers,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Eye,
  Key,
} from 'lucide-react';
import { SoapClinicalExperience, SoapPlanMedication, SoapProblemItem } from '../../types.ts';
import {
  SOAP_SPECIALTIES,
  EXPERIENCE_LEVEL_LABELS,
} from '../../../data/soapSeedData.ts';
import {
  generateSoapMarkdown,
  parseNotebookLmSoapMarkdown,
} from '../../lib/clientSideIngest.ts';
import {
  fetchRawSoapMarkdown,
  saveSoapCaseToDisk,
} from '../../lib/soapApi.ts';

interface SoapEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: SoapClinicalExperience;
  onSaveSuccess: (updatedCase: SoapClinicalExperience) => void;
}

type EditTab = 'info' | 's' | 'o' | 'a' | 'p' | 'markdown';

export const SoapEditModal: React.FC<SoapEditModalProps> = ({
  isOpen,
  onClose,
  caseData,
  onSaveSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<EditTab>('info');
  const [editedCase, setEditedCase] = useState<SoapClinicalExperience>(caseData);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [isLoadingRaw, setIsLoadingRaw] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // GitHub Token Modal / Config State
  const [showGithubConfig, setShowGithubConfig] = useState<boolean>(false);
  const [githubToken, setGithubToken] = useState<string>('');

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const savedToken = localStorage.getItem('cliniportal_github_token') || '';
      setGithubToken(savedToken);
    }
  }, []);

  // Khởi tạo và đồng bộ khi mở modal
  useEffect(() => {
    if (isOpen && caseData) {
      setEditedCase(JSON.parse(JSON.stringify(caseData)));
      setSaveStatus(null);
      setIsLoadingRaw(true);

      // Thử đọc raw markdown từ server dev
      fetchRawSoapMarkdown(caseData.id).then((res) => {
        setIsLoadingRaw(false);
        if (res && res.content) {
          setMarkdownContent(res.content);
        } else {
          // Sinh markdown chuẩn hóa từ đối tượng nếu server chưa có
          setMarkdownContent(generateSoapMarkdown(caseData));
        }
      }).catch(() => {
        setIsLoadingRaw(false);
        setMarkdownContent(generateSoapMarkdown(caseData));
      });
    }
  }, [isOpen, caseData]);

  if (!isOpen) return null;

  // Cập nhật trường thông tin cấp 1
  const handleUpdateField = (field: keyof SoapClinicalExperience, value: any) => {
    setEditedCase((prev) => ({ ...prev, [field]: value }));
  };

  // Cập nhật trường Subjective
  const handleUpdateS = (field: string, value: any) => {
    setEditedCase((prev) => ({
      ...prev,
      s: { ...prev.s, [field]: value },
    }));
  };

  // Cập nhật trường Objective
  const handleUpdateO = (field: string, value: any) => {
    setEditedCase((prev) => ({
      ...prev,
      o: { ...prev.o, [field]: value },
    }));
  };

  // Cập nhật Sinh hiệu
  const handleUpdateVital = (vitalKey: string, value: string) => {
    setEditedCase((prev) => ({
      ...prev,
      o: {
        ...prev.o,
        vitals: { ...(prev.o.vitals || {}), [vitalKey]: value },
      },
    }));
  };

  // Cập nhật trường Assessment
  const handleUpdateA = (field: string, value: any) => {
    setEditedCase((prev) => ({
      ...prev,
      a: { ...prev.a, [field]: value },
    }));
  };

  // Cập nhật trường Plan
  const handleUpdateP = (field: string, value: any) => {
    setEditedCase((prev) => ({
      ...prev,
      p: { ...prev.p, [field]: value },
    }));
  };

  // Quản lý danh sách thuốc
  const handleAddMedication = () => {
    const newMed: SoapPlanMedication = {
      drug: '',
      dose: '',
      route: 'Uống (PO)',
      note: '',
    };
    setEditedCase((prev) => ({
      ...prev,
      p: {
        ...prev.p,
        medications: [...(prev.p.medications || []), newMed],
      },
    }));
  };

  const handleUpdateMedication = (index: number, field: keyof SoapPlanMedication, value: string) => {
    setEditedCase((prev) => {
      const meds = [...(prev.p.medications || [])];
      meds[index] = { ...meds[index], [field]: value };
      return {
        ...prev,
        p: { ...prev.p, medications: meds },
      };
    });
  };

  const handleRemoveMedication = (index: number) => {
    setEditedCase((prev) => ({
      ...prev,
      p: {
        ...prev.p,
        medications: (prev.p.medications || []).filter((_, i) => i !== index),
      },
    }));
  };

  // Quản lý Bảng đặt vấn đề 3 tầng
  const handleAddProblem = () => {
    const newProb: SoapProblemItem = {
      order: (editedCase.a.problemList?.length || 0) + 1,
      priority: 'acute',
      problemName: '',
      diagnosticOrientation: '',
      immediateManagement: '',
    };
    setEditedCase((prev) => ({
      ...prev,
      a: {
        ...prev.a,
        problemList: [...(prev.a.problemList || []), newProb],
      },
    }));
  };

  const handleUpdateProblem = (index: number, field: keyof SoapProblemItem, value: any) => {
    setEditedCase((prev) => {
      const list = [...(prev.a.problemList || [])];
      list[index] = { ...list[index], [field]: value };
      return {
        ...prev,
        a: { ...prev.a, problemList: list },
      };
    });
  };

  const handleRemoveProblem = (index: number) => {
    setEditedCase((prev) => ({
      ...prev,
      a: {
        ...prev.a,
        problemList: (prev.a.problemList || []).filter((_, i) => i !== index),
      },
    }));
  };

  // Đồng bộ Markdown từ Form khi chuyển sang tab Markdown
  const handleTabChange = (tab: EditTab) => {
    if (tab === 'markdown' && activeTab !== 'markdown') {
      // Cập nhật lại Markdown theo các thay đổi trong Form
      setMarkdownContent(generateSoapMarkdown(editedCase));
    } else if (activeTab === 'markdown' && tab !== 'markdown') {
      // Phân tích lại Markdown để cập nhật vào Form
      try {
        const parsed = parseNotebookLmSoapMarkdown(markdownContent);
        if (parsed && parsed.soap) {
          setEditedCase((prev) => ({
            ...prev,
            ...parsed.soap,
            id: prev.id, // giữ nguyên ID
          }));
        }
      } catch {
        // Giữ nguyên Form nếu parse thất bại
      }
    }
    setActiveTab(tab);
  };

  // Lưu ca lâm sàng
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: 'info', message: 'Đang lưu nội dung vào file .md...' });

    let finalCase = { ...editedCase };
    let finalMarkdown = markdownContent;

    // Nếu đang ở tab markdown, parse cập nhật vào case
    if (activeTab === 'markdown') {
      const parsed = parseNotebookLmSoapMarkdown(markdownContent);
      if (parsed && parsed.soap) {
        finalCase = { ...parsed.soap, id: editedCase.id };
      }
    } else {
      finalMarkdown = generateSoapMarkdown(editedCase);
    }

    finalCase.rawMarkdown = finalMarkdown;

    try {
      const result = await saveSoapCaseToDisk(finalCase, finalMarkdown, githubToken);

      setIsSaving(false);
      setSaveStatus({
        type: 'success',
        message: result.message,
      });

      // Cập nhật vào state ứng dụng
      onSaveSuccess(finalCase);

      // Đóng modal sau 1.8 giây nếu lưu thành công
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: any) {
      setIsSaving(false);
      setSaveStatus({
        type: 'error',
        message: `Lỗi khi lưu: ${err.message}`,
      });
    }
  };

  const handleSaveGithubToken = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cliniportal_github_token', githubToken.trim());
      setShowGithubConfig(false);
      setSaveStatus({
        type: 'success',
        message: 'Đã lưu GitHub Personal Access Token thành công!',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[94vh] sm:h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60 font-mono-custom">
                  Sửa Ca Bệnh · Knowledge Vault
                </span>
                <span className="text-xs text-slate-400 font-mono-custom truncate">
                  {editedCase.id}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate mt-0.5">
                {editedCase.title || 'Chỉnh sửa ca lâm sàng'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowGithubConfig(!showGithubConfig)}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
              title="Cấu hình GitHub Token để commit trực tiếp"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub Token</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GitHub Token Config Banner */}
        {showGithubConfig && (
          <div className="bg-slate-900 text-white p-3.5 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Key className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Nhập GitHub Personal Access Token (PAT) có quyền <b>repo</b> để commit trực tiếp file .md lên repository:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="ghp_xxxx..."
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono-custom focus:outline-none focus:border-blue-500 flex-1 sm:w-60"
              />
              <button
                type="button"
                onClick={handleSaveGithubToken}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-xs cursor-pointer shrink-0 transition-colors"
              >
                Lưu Token
              </button>
            </div>
          </div>
        )}

        {/* Status Notification Toast */}
        {saveStatus && (
          <div
            className={`p-3 px-4 text-xs font-medium flex items-center justify-between gap-2 border-b ${
              saveStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : saveStatus.type === 'error'
                ? 'bg-rose-50 text-rose-900 border-rose-200'
                : 'bg-blue-50 text-blue-900 border-blue-200'
            }`}
          >
            <span>{saveStatus.message}</span>
            <button
              type="button"
              onClick={() => setSaveStatus(null)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 py-2">
          <button
            type="button"
            onClick={() => handleTabChange('info')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>1. Thông tin chung</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('s')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 's'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>2. Cột S (Bệnh sử)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('o')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'o'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>3. Cột O (Khám &amp; CLS)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('a')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'a'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>4. Cột A (Biện luận &amp; Vấn đề)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('p')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'p'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>5. Cột P (Xử trí &amp; Thuốc)</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('markdown')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ml-auto ${
              activeTab === 'markdown'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Toàn Văn Markdown (.md)</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'info' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b pb-2">
                  <span>Hành chính &amp; Phân loại ca lâm sàng</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiêu đề ca lâm sàng (Tên bệnh lý &amp; Phân độ) <span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    value={editedCase.title}
                    onChange={(e) => handleUpdateField('title', e.target.value)}
                    className="w-full text-sm font-semibold border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
                    placeholder="VD: Cúm A biến chứng Viêm phổi nặng & Suy hô hấp cấp"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Chuyên khoa:
                    </label>
                    <select
                      value={editedCase.specialty}
                      onChange={(e) => handleUpdateField('specialty', e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:border-blue-500 focus:outline-none"
                    >
                      {SOAP_SPECIALTIES.filter((s) => s !== 'Tất cả chuyên khoa').map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mã ICD-10 (cách nhau bởi dấu chấm hoặc phẩy):
                    </label>
                    <input
                      type="text"
                      value={editedCase.a.icd10 || ''}
                      onChange={(e) => handleUpdateA('icd10', e.target.value)}
                      className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
                      placeholder="VD: J10.0 · J96.0 · J44.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bối cảnh nhân khẩu học (Tuổi, Giới, Hoàn cảnh, Địa dư):
                  </label>
                  <textarea
                    rows={2}
                    value={editedCase.demographicContext || ''}
                    onChange={(e) => handleUpdateField('demographicContext', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
                    placeholder="VD: Nữ 62 tuổi, tiền căn COPD, ĐTĐ tuýp 2, nhập viện vì sốt cao, khó thở ngày thứ 3..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bác sĩ đúc kết:
                    </label>
                    <input
                      type="text"
                      value={editedCase.authorDoctor || ''}
                      onChange={(e) => handleUpdateField('authorDoctor', e.target.value)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mức độ kinh nghiệm:
                    </label>
                    <select
                      value={editedCase.experienceLevel}
                      onChange={(e) => handleUpdateField('experienceLevel', e.target.value as any)}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="essential">Cốt lõi (Essential)</option>
                      <option value="intermediate">Trung cấp (Intermediate)</option>
                      <option value="advanced">Chuyên sâu (Advanced)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Độ phức tạp (1 - 5 sao):
                    </label>
                    <select
                      value={editedCase.difficultyRating || 3}
                      onChange={(e) => handleUpdateField('difficultyRating', parseInt(e.target.value, 10))}
                      className="w-full text-xs border border-slate-300 rounded-lg p-2.5 bg-white focus:border-blue-500 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} sao ({'★'.repeat(num)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nguồn tài liệu / Guideline tham chiếu:
                  </label>
                  <input
                    type="text"
                    value={editedCase.sourceReference || ''}
                    onChange={(e) => handleUpdateField('sourceReference', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none"
                    placeholder="VD: Hướng dẫn chẩn đoán và điều trị Bộ Y tế (2024)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBJECTIVE */}
          {activeTab === 's' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-sky-200/90 shadow-2xs space-y-4">
                <h3 className="font-bold text-sky-900 text-sm flex items-center gap-2 border-b border-sky-100 pb-2">
                  <span>S — Subjective: Khai thác Triệu chứng Chủ quan &amp; Bệnh sử</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    1. Than phiền chính (Chief Complaint) / Lý do vào viện:
                  </label>
                  <input
                    type="text"
                    value={editedCase.s.chiefComplaint}
                    onChange={(e) => handleUpdateS('chiefComplaint', e.target.value)}
                    className="w-full text-xs font-medium border border-slate-300 rounded-lg p-2.5 focus:border-sky-500 focus:outline-none"
                    placeholder="VD: Sốt cao 39°C, ho nhiều và khó thở ngày thứ 3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    2. Diễn tiến bệnh sử chi tiết (PQRST Timeline):
                  </label>
                  <textarea
                    rows={6}
                    value={editedCase.s.historyOfPresentIllness}
                    onChange={(e) => handleUpdateS('historyOfPresentIllness', e.target.value)}
                    className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2.5 focus:border-sky-500 focus:outline-none leading-relaxed"
                    placeholder="- Ngày 1: Khởi phát sốt nhẹ...&#10;- Ngày 2: Ho tăng dần...&#10;- Ngày 3: Khó thở liên tục..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    3. Tiền căn bản thân &amp; Bối cảnh dịch tễ:
                  </label>
                  <textarea
                    rows={4}
                    value={editedCase.s.pastMedicalHistory}
                    onChange={(e) => handleUpdateS('pastMedicalHistory', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-sky-500 focus:outline-none leading-relaxed"
                    placeholder="Tiền căn bệnh phổi, tim mạch, dị ứng thuốc..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Điểm ngọc lâm sàng trong bệnh sử (Clinical Pearl):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={editedCase.s.historyPearls || ''}
                    onChange={(e) => handleUpdateS('historyPearls', e.target.value)}
                    className="w-full text-xs border border-amber-200 bg-amber-50/40 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none"
                    placeholder="Bẫy cần nhớ khi hỏi bệnh sử..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OBJECTIVE */}
          {activeTab === 'o' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 border-b pb-2">
                  <span>O — Objective: Khám Thực Thể &amp; Kết Quả Cận Lâm Sàng</span>
                </h3>

                {/* Vitals Grid */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-2">
                    Sinh hiệu cốt lõi lúc nhập viện:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">Huyết áp (mmHg):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.bp || ''}
                        onChange={(e) => handleUpdateVital('bp', e.target.value)}
                        placeholder="120/80"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">Mạch (l/p):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.pulse || ''}
                        onChange={(e) => handleUpdateVital('pulse', e.target.value)}
                        placeholder="80"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">Nhiệt độ (°C):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.temp || ''}
                        onChange={(e) => handleUpdateVital('temp', e.target.value)}
                        placeholder="38.5"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">SpO₂ (%):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.spo2 || ''}
                        onChange={(e) => handleUpdateVital('spo2', e.target.value)}
                        placeholder="95"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">Nhịp thở (l/p):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.resp || ''}
                        onChange={(e) => handleUpdateVital('resp', e.target.value)}
                        placeholder="20"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-500 block mb-0.5">BMI (kg/m²):</span>
                      <input
                        type="text"
                        value={editedCase.o.vitals?.bmi || ''}
                        onChange={(e) => handleUpdateVital('bmi', e.target.value)}
                        placeholder="22.5"
                        className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2 text-center focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Khám thực thể theo cơ quan (Toàn trạng, Tim mạch, Hô hấp, Bụng, Thần kinh):
                  </label>
                  <textarea
                    rows={5}
                    value={editedCase.o.physicalExam}
                    onChange={(e) => handleUpdateO('physicalExam', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none leading-relaxed"
                    placeholder="- Tổng trạng: Tỉnh, tiếp xúc tốt...&#10;- Tim mạch: T1, T2 rõ...&#10;- Hô hấp: Ran ẩm đáy phổi..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Cận lâm sàng &amp; Chẩn đoán hình ảnh:
                  </label>
                  <textarea
                    rows={6}
                    value={editedCase.o.labsAndImaging}
                    onChange={(e) => handleUpdateO('labsAndImaging', e.target.value)}
                    className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2.5 focus:border-blue-500 focus:outline-none leading-relaxed"
                    placeholder="- Công thức máu: WBC, Hgb, PLT...&#10;- Sinh hóa máu: Ure, Creatinine...&#10;- X-quang ngực / CT / Siêu âm..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-rose-800 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Cạm bẫy cận lâm sàng &amp; Khám thực thể (Objective Pitfall):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={editedCase.o.objectivePitfalls || ''}
                    onChange={(e) => handleUpdateO('objectivePitfalls', e.target.value)}
                    className="w-full text-xs border border-rose-200 bg-rose-50/40 rounded-lg p-2.5 focus:border-rose-500 focus:outline-none"
                    placeholder="Bẫy dễ bỏ sót trên phim hoặc sai số xét nghiệm..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASSESSMENT */}
          {activeTab === 'a' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200/90 shadow-2xs space-y-4">
                <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2 border-b border-amber-100 pb-2">
                  <span>A — Assessment: Chẩn Đoán, Biện Luận &amp; Đặt Vấn Đề</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Chẩn đoán xác định / Chính:
                  </label>
                  <input
                    type="text"
                    value={editedCase.a.primaryDiagnosis}
                    onChange={(e) => handleUpdateA('primaryDiagnosis', e.target.value)}
                    className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none"
                    placeholder="VD: Cúm A biến chứng Viêm phổi nặng, Suy hô hấp cấp..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Phân tầng nguy cơ &amp; Thang điểm lượng giá (NEWS2, CURB-65, qSOFA, ...):
                  </label>
                  <input
                    type="text"
                    value={editedCase.a.riskStratification || ''}
                    onChange={(e) => handleUpdateA('riskStratification', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none"
                    placeholder="VD: NEWS2: 6 điểm (Nguy cơ trung bình - cao)..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Chẩn đoán phân biệt cần loại trừ (Mỗi dòng một bệnh):
                  </label>
                  <textarea
                    rows={3}
                    value={(editedCase.a.differentials || []).join('\n')}
                    onChange={(e) =>
                      handleUpdateA(
                        'differentials',
                        e.target.value.split('\n').filter((l) => l.trim())
                      )
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none leading-relaxed"
                    placeholder="Viêm phổi vi khuẩn cộng đồng&#10;Đợt cấp COPD&#10;Suy tim sung huyết mất bù..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Biện luận lâm sàng chi tiết (Lập luận chẩn đoán):
                  </label>
                  <textarea
                    rows={5}
                    value={editedCase.a.clinicalReasoning || ''}
                    onChange={(e) => handleUpdateA('clinicalReasoning', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none leading-relaxed"
                    placeholder="Biện luận tại sao nghĩ nhiều đến bệnh này và loại trừ các chẩn đoán khác..."
                  />
                </div>

                {/* Problem List 3 Tầng */}
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800">
                      Bảng Đặt Vấn Đề 3 Tầng (Problem List):
                    </span>
                    <button
                      type="button"
                      onClick={handleAddProblem}
                      className="px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm vấn đề</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(editedCase.a.problemList || []).map((prob, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col gap-2 relative"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <select
                            value={prob.priority}
                            onChange={(e) => handleUpdateProblem(idx, 'priority', e.target.value)}
                            className="text-[11px] font-bold rounded px-2 py-1 bg-white border border-slate-300"
                          >
                            <option value="life-threatening">🔴 Tầng 1: Đe dọa tính mạng</option>
                            <option value="acute">🟡 Tầng 2: Cấp tính</option>
                            <option value="chronic">🔵 Tầng 3: Mạn tính / Bệnh nền</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => handleRemoveProblem(idx)}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                            title="Xóa vấn đề này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={prob.problemName}
                          onChange={(e) => handleUpdateProblem(idx, 'problemName', e.target.value)}
                          placeholder="Tên vấn đề lâm sàng..."
                          className="w-full text-xs font-semibold p-1.5 border border-slate-300 rounded bg-white"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <input
                            type="text"
                            value={prob.diagnosticOrientation || ''}
                            onChange={(e) =>
                              handleUpdateProblem(idx, 'diagnosticOrientation', e.target.value)
                            }
                            placeholder="Chiến lược chẩn đoán / CLS..."
                            className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                          />
                          <input
                            type="text"
                            value={prob.immediateManagement || ''}
                            onChange={(e) =>
                              handleUpdateProblem(idx, 'immediateManagement', e.target.value)
                            }
                            placeholder="Hướng xử trí cấp bách..."
                            className="p-1.5 border border-slate-300 rounded bg-white text-[11px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PLAN */}
          {activeTab === 'p' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="bg-white p-4 sm:p-5 rounded-xl border border-teal-200/90 shadow-2xs space-y-4">
                <h3 className="font-bold text-teal-900 text-sm flex items-center gap-2 border-b border-teal-100 pb-2">
                  <span>P — Plan: Xử Trí Khẩn Cấp, Đơn Thuốc &amp; Kế Hoạch Theo Dõi</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Xử trí khẩn cấp ban đầu (Hồi sức, Thở oxy, Dịch truyền, Tư thế):
                  </label>
                  <textarea
                    rows={3}
                    value={editedCase.p.immediateActions}
                    onChange={(e) => handleUpdateP('immediateActions', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-teal-500 focus:outline-none leading-relaxed"
                    placeholder="VD: Thở oxy mask có túi 10 L/p, thiết lập đường truyền tĩnh mạch..."
                  />
                </div>

                {/* Medication Table */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-800">
                      Y lệnh thuốc điều trị chi tiết:
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="px-2.5 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold border border-teal-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm thuốc</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(editedCase.p.medications || []).map((med, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg items-center"
                      >
                        <div className="col-span-12 sm:col-span-4">
                          <input
                            type="text"
                            value={med.drug}
                            onChange={(e) => handleUpdateMedication(idx, 'drug', e.target.value)}
                            placeholder="Tên thuốc / Hoạt chất..."
                            className="w-full text-xs font-semibold p-1.5 border border-slate-300 rounded bg-white"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <input
                            type="text"
                            value={med.dose}
                            onChange={(e) => handleUpdateMedication(idx, 'dose', e.target.value)}
                            placeholder="Liều lượng..."
                            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white"
                          />
                        </div>

                        <div className="col-span-5 sm:col-span-2">
                          <input
                            type="text"
                            value={med.route}
                            onChange={(e) => handleUpdateMedication(idx, 'route', e.target.value)}
                            placeholder="Đường dùng..."
                            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white"
                          />
                        </div>

                        <div className="col-span-11 sm:col-span-2">
                          <input
                            type="text"
                            value={med.note || ''}
                            onChange={(e) => handleUpdateMedication(idx, 'note', e.target.value)}
                            placeholder="Ghi chú..."
                            className="w-full text-xs p-1.5 border border-slate-300 rounded bg-white"
                          />
                        </div>

                        <div className="col-span-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveMedication(idx)}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Kế hoạch theo dõi &amp; Mục tiêu lâm sàng:
                  </label>
                  <textarea
                    rows={3}
                    value={editedCase.p.monitoringAndTargets}
                    onChange={(e) => handleUpdateP('monitoringAndTargets', e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:border-teal-500 focus:outline-none leading-relaxed"
                    placeholder="Theo dõi sinh hiệu, SpO2, lượng nước tiểu mỗi 2-4 giờ..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    Lộ trình điều trị &amp; Giám sát theo ngày (Treatment Roadmap):
                  </label>
                  <textarea
                    rows={4}
                    value={editedCase.p.treatmentRoadmap || ''}
                    onChange={(e) => handleUpdateP('treatmentRoadmap', e.target.value)}
                    className="w-full text-xs font-mono-custom border border-slate-300 rounded-lg p-2.5 focus:border-teal-500 focus:outline-none leading-relaxed"
                    placeholder="Giai đoạn 1: Giờ 1-4...&#10;Giai đoạn 2: Ngày 2-5..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-amber-800 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bài học kinh nghiệm thực chiến (Takeaway Lessons):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={editedCase.p.takeawayLessons || ''}
                    onChange={(e) => handleUpdateP('takeawayLessons', e.target.value)}
                    className="w-full text-xs border border-amber-200 bg-amber-50/40 rounded-lg p-2.5 focus:border-amber-500 focus:outline-none"
                    placeholder="Kinh nghiệm mấu chốt cần nhớ khi xử trí ca này..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RAW MARKDOWN */}
          {activeTab === 'markdown' && (
            <div className="h-full flex flex-col space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Chỉnh sửa nội dung file Markdown trực tiếp:</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono-custom">
                  {markdownContent.length} ký tự
                </span>
              </div>

              <textarea
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                className="w-full flex-1 min-h-[350px] p-4 font-mono-custom text-xs bg-slate-900 text-slate-100 rounded-xl border border-slate-700 focus:border-purple-500 focus:outline-none leading-relaxed resize-none scrollbar-thin"
                placeholder="# Soạn thảo Markdown chuẩn Obsidian..."
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 p-3.5 sm:p-4 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-medium hidden sm:inline">File đích:</span>
            <span className="font-mono-custom text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 truncate max-w-[200px] sm:max-w-none">
              src/content/docspace/data/ba/{editedCase.id.startsWith('soap-') ? `${editedCase.id}.md` : `soap-${editedCase.id}.md`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu vào file .md &amp; Cập nhật</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
