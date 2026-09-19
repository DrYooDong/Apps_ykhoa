import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  HeartPulse,
  Info,
  Layers,
  Plus,
  ShieldAlert,
  Trash2,
  Zap,
} from 'lucide-react';
import { ProblemStatementEntry } from '../../types.ts';

interface ProblemListSectionProps {
  problems: ProblemStatementEntry[];
  onUpdateProblems: (problems: ProblemStatementEntry[]) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const ProblemListSection: React.FC<ProblemListSectionProps> = ({
  problems,
  onUpdateProblems,
  onOpenVaultDrawer,
}) => {
  const [newProblemLabel, setNewProblemLabel] = useState('');
  const [newProblemType, setNewProblemType] = useState<ProblemStatementEntry['type']>('hoi-chung');
  const [newProblemPriority, setNewProblemPriority] = useState<NonNullable<ProblemStatementEntry['priorityLevel']>>('acute');
  const [newProblemEvidence, setNewProblemEvidence] = useState('');
  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const [editingEvidence, setEditingEvidence] = useState('');

  // Priority group definitions
  const priorityTiers = [
    {
      level: 'life-threatening' as const,
      title: 'TẦNG 1: NGUY CƠ ĐE DỌA TÍNH MẠNG / CẤP CỨU KHẨN CẤP',
      badgeClass: 'bg-red-100 text-red-800 border-red-300',
      borderClass: 'border-red-200 bg-red-50/20',
      description: 'Cần ổn định hồi sức DHST ABC ngay lập tức (Sốc, tụt HA, suy hô hấp nặng, hôn mê...).',
    },
    {
      level: 'acute' as const,
      title: 'TẦNG 2: VẤN ĐỀ CẤP TÍNH & HỘI CHỨNG BỆNH CHÍNH',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      borderClass: 'border-amber-200 bg-amber-50/20',
      description: 'Lý do chính khiến BN nhập viện (LDNV), cần CĐXĐ và CĐPB.',
    },
    {
      level: 'chronic' as const,
      title: 'TẦNG 3: BỆNH NỀN MẠN TÍNH & YẾU TỐ NGUY CƠ',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
      borderClass: 'border-slate-200 bg-slate-50/20',
      description: 'Bệnh phối hợp mạn tính (THA, ĐTĐ, CKD, COPD...) ảnh hưởng đến phác đồ dùng thuốc.',
    },
  ];

  const handleAddProblem = () => {
    if (!newProblemLabel.trim()) return;

    const newEntry: ProblemStatementEntry = {
      id: `prob_custom_${Date.now()}`,
      label: newProblemLabel.trim(),
      type: newProblemType,
      priorityLevel: newProblemPriority,
      evidence: newProblemEvidence
        ? newProblemEvidence.split(';').map((e) => e.trim()).filter(Boolean)
        : [],
      resolved: false,
    };

    onUpdateProblems([...problems, newEntry]);
    setNewProblemLabel('');
    setNewProblemEvidence('');
  };

  const handleRemoveProblem = (id: string) => {
    onUpdateProblems(problems.filter((p) => p.id !== id));
  };

  const handleChangePriority = (id: string, priority: 'life-threatening' | 'acute' | 'chronic') => {
    onUpdateProblems(
      problems.map((p) => (p.id === id ? { ...p, priorityLevel: priority } : p))
    );
  };

  const handleSaveEvidence = (id: string) => {
    onUpdateProblems(
      problems.map((p) =>
        p.id === id
          ? {
              ...p,
              evidence: editingEvidence.split(';').map((e) => e.trim()).filter(Boolean),
            }
          : p
      )
    );
    setEditingProblemId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Banner Nguyên tắc sư phạm lâm sàng từ Bộ môn Nội khoa & Thầy Sĩ */}
      <div className="p-3 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-700">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <b className="text-slate-900">Quy tắc Đặt VĐ LS 3 Tầng (Theo Thầy Sĩ & Thầy Tuấn):</b>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Ưu tiên gom triệu chứng thành <b>Hội chứng</b> nếu đủ tiêu chuẩn; nếu chưa đủ hội chứng thì đặt thành <b>Triệu chứng độc lập có giá trị</b>. Sắp xếp theo 3 tầng ưu tiên xử trí: (1) Cấp cứu đe dọa sinh tồn ➔ (2) Vấn đề cấp tính ➔ (3) Bệnh nền mạn tính.
          </p>
        </div>
      </div>

      {/* Hiển thị danh sách phân nhóm 3 tầng */}
      <div className="flex flex-col gap-4">
        {priorityTiers.map((tier) => {
          const tierProblems = problems.filter(
            (p) => (p.priorityLevel || 'acute') === tier.level
          );

          return (
            <div
              key={tier.level}
              className={`rounded-xl border p-4 flex flex-col gap-3 shadow-2xs ${tier.borderClass}`}
            >
              {/* Tiêu đề nhóm Tầng */}
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom border ${tier.badgeClass}`}>
                    {tier.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono-custom font-semibold">
                    ({tierProblems.length} vấn đề)
                  </span>
                </div>
                <span className="text-[10.5px] text-slate-500 italic hidden sm:inline">
                  {tier.description}
                </span>
              </div>

              {/* Danh sách các card vấn đề trong tầng */}
              {tierProblems.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {tierProblems.map((prob) => (
                    <div
                      key={prob.id}
                      className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs flex flex-col gap-2 transition-all hover:border-slate-300"
                    >
                      {/* Header của Card Vấn đề */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {prob.label}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600 font-mono-custom border border-slate-200">
                            {prob.type === 'hoi-chung'
                              ? 'Hội chứng'
                              : prob.type === 'trieu-chung'
                              ? 'Triệu chứng'
                              : 'Bệnh lý'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Bộ chọn nhanh chuyển Tầng Ưu Tiên */}
                          <select
                            value={prob.priorityLevel || 'acute'}
                            onChange={(e) => handleChangePriority(prob.id, e.target.value as any)}
                            className="text-[10px] font-semibold p-1 border border-slate-200 rounded bg-slate-50 text-slate-700 cursor-pointer"
                          >
                            <option value="life-threatening">Tầng 1 (Cấp cứu)</option>
                            <option value="acute">Tầng 2 (Cấp tính)</option>
                            <option value="chronic">Tầng 3 (Mạn tính)</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              if (editingProblemId === prob.id) {
                                setEditingProblemId(null);
                              } else {
                                setEditingProblemId(prob.id);
                                setEditingEvidence(prob.evidence.join('; '));
                              }
                            }}
                            className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Sửa dữ kiện giải thích"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveProblem(prob.id)}
                            className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Xóa vấn đề này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Cảnh báo Xung Đột (nếu có) */}
                      {prob.conflictNotes && (
                        <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{prob.conflictNotes}</span>
                        </div>
                      )}

                      {/* DỮ KIỆN GIẢI THÍCH CHO VẤN ĐỀ ĐẶT RA */}
                      {editingProblemId === prob.id ? (
                        <div className="flex flex-col gap-1.5 p-2 bg-slate-50 rounded border border-slate-200">
                          <label className="text-[10.5px] font-semibold text-slate-600">
                            Chỉnh sửa dữ kiện giải thích (cách nhau bằng dấu chấm phẩy ;):
                          </label>
                          <input
                            type="text"
                            value={editingEvidence}
                            onChange={(e) => setEditingEvidence(e.target.value)}
                            className="text-xs p-1.5 bg-white border border-slate-200 rounded w-full"
                          />
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingProblemId(null)}
                              className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200 rounded"
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              onClick={() => handleSaveEvidence(prob.id)}
                              className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded font-semibold"
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      ) : (
                        prob.evidence.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 text-xs">
                            <span className="text-[10.5px] text-slate-500 font-semibold">Dữ kiện:</span>
                            {prob.evidence.map((ev, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.2 rounded text-[11px] bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {ev}
                              </span>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic py-1">
                  Chưa có vấn đề nào được phân vào tầng này.
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Form thêm vấn đề tùy chỉnh */}
      <div className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col gap-2.5">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          Bổ sung thêm vấn đề lâm sàng tùy chỉnh:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
          <div className="sm:col-span-5">
            <input
              type="text"
              value={newProblemLabel}
              onChange={(e) => setNewProblemLabel(e.target.value)}
              placeholder="Tên vấn đề (Vd: Hội chứng đông đặc phổi phải, Hạ kali máu...)"
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={newProblemPriority}
              onChange={(e) => setNewProblemPriority(e.target.value as any)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-blue-500"
            >
              <option value="life-threatening">Tầng 1: Đe dọa sinh tồn</option>
              <option value="acute">Tầng 2: Cấp tính & Hội chứng</option>
              <option value="chronic">Tầng 3: Mạn tính & Nguy cơ</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <input
              type="text"
              value={newProblemEvidence}
              onChange={(e) => setNewProblemEvidence(e.target.value)}
              placeholder="Dữ kiện (cách nhau bởi ;)"
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-1 flex items-center">
            <button
              type="button"
              onClick={handleAddProblem}
              className="w-full h-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold text-xs transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
