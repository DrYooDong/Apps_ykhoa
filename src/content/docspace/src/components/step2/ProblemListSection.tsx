import React, { useState, useMemo } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Anchor,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Edit3,
  HeartPulse,
  Info,
  Layers,
  Plus,
  ShieldAlert,
  Sparkles,
  Star,
  Tag,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import { ProblemStatementEntry, TrieuChung, VitalsState, LabsState } from '../../types.ts';

interface ProblemListSectionProps {
  problems: ProblemStatementEntry[];
  onUpdateProblems: (problems: ProblemStatementEntry[]) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  vitals?: VitalsState;
  labs?: LabsState;
  selectedSymptoms?: TrieuChung[];
}

export const ProblemListSection: React.FC<ProblemListSectionProps> = ({
  problems,
  onUpdateProblems,
  onOpenVaultDrawer,
  vitals,
  labs,
  selectedSymptoms = [],
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProblemLabel, setNewProblemLabel] = useState('');
  const [newProblemType, setNewProblemType] = useState<ProblemStatementEntry['type']>('hoi-chung');
  const [newProblemPriority, setNewProblemPriority] = useState<NonNullable<ProblemStatementEntry['priorityLevel']>>('acute');
  const [newProblemEvidence, setNewProblemEvidence] = useState('');

  const [editingProblemId, setEditingProblemId] = useState<string | null>(null);
  const [editingEvidence, setEditingEvidence] = useState('');

  // 1. Phân nhóm 3 Tầng chuẩn Sư phạm Lâm sàng
  const priorityTiers = [
    {
      level: 'life-threatening' as const,
      number: '1',
      title: 'TẦNG 1: ĐE DỌA SINH MẠNG / HỒI SỨC CẤP CỨU',
      badgeClass: 'bg-red-50 text-red-700 border-red-200',
      borderClass: 'border-red-200/90 bg-red-50/15',
      iconColor: 'text-red-600',
      description: 'Hồi sức ABC, ổn định huyết động ngay lập tức (Sốc, tụt HA, suy hô hấp, hôn mê).',
    },
    {
      level: 'acute' as const,
      number: '2',
      title: 'TẦNG 2: BỆNH CẢNH CẤP TÍNH & HỘI CHỨNG CHÍNH',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      borderClass: 'border-blue-200/90 bg-blue-50/15',
      iconColor: 'text-blue-600',
      description: 'Lý do chính đưa người bệnh vào viện (LDNV), là đích của Chẩn đoán Sơ bộ & Phân biệt.',
    },
    {
      level: 'chronic' as const,
      number: '3',
      title: 'TẦNG 3: BỆNH NỀN MẠN TÍNH & YẾU TỐ NGUY CƠ',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      borderClass: 'border-slate-200 bg-slate-50/30',
      iconColor: 'text-slate-500',
      description: 'Bệnh nền và cơ địa (ĐTĐ, THA, CKD, Xơ gan...) ảnh hưởng đến dung nạp thuốc & phân tầng rủi ro.',
    },
  ];

  // 2. Bộ Phát hiện Mâu thuẫn / Xung đột Lâm sàng (Clinical Conflict Detector)
  const clinicalConflicts = useMemo(() => {
    const list: { id: string; title: string; detail: string; severity: 'high' | 'medium' }[] = [];

    const hasShockProblem = problems.some(
      (p) =>
        p.label.toLowerCase().includes('sốc') ||
        p.label.toLowerCase().includes('tụt huyết áp') ||
        p.id.includes('shock')
    );
    const sbp = vitals?.vHATT ? parseFloat(vitals.vHATT) : NaN;
    if (hasShockProblem && !isNaN(sbp) && sbp >= 110) {
      list.push({
        id: 'conflict-shock-normal-bp',
        title: 'Mâu thuẫn: Vấn đề ghi nhận Sốc nhưng Huyết áp bình thường',
        detail: `Đặt vấn đề có ghi nhận Sốc/Tụt HA, tuy nhiên chỉ số sinh hiệu ghi nhận HATT là ${sbp} mmHg (bình thường/tăng). Cần kiểm tra lại tiền sử dùng vận mạch hoặc dấu hiệu sốc ấm/sốc cương thế.`,
        severity: 'high',
      });
    }

    const hasHypoxiaProblem = problems.some(
      (p) =>
        p.label.toLowerCase().includes('suy hô hấp') ||
        p.label.toLowerCase().includes('giảm oxy')
    );
    const spo2 = vitals?.vSpo2 ? parseFloat(vitals.vSpo2) : NaN;
    if (hasHypoxiaProblem && !isNaN(spo2) && spo2 >= 96) {
      list.push({
        id: 'conflict-hypoxia-normal-spo2',
        title: 'Lưu ý: Suy hô hấp nhưng SpO₂ phòng $\\ge 96%$',
        detail: `SpO₂ đo được ${spo2}%. Nếu bệnh nhân đang thở oxy hỗ trợ, cần ghi rõ FiO₂ hoặc PaO₂/FiO₂ trong phần chứng cứ.`,
        severity: 'medium',
      });
    }

    return list;
  }, [problems, vitals]);

  // Handler chọn Vấn đề Mỏ Neo chính (Lead Anchor Problem)
  const handleSetPrimaryProblem = (id: string) => {
    onUpdateProblems(
      problems.map((p) => ({
        ...p,
        isPrimary: p.id === id,
      }))
    );
  };

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
      isPrimary: problems.length === 0,
      resolved: false,
    };

    onUpdateProblems([...problems, newEntry]);
    setNewProblemLabel('');
    setNewProblemEvidence('');
    setIsAddModalOpen(false);
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
      {/* Action Header & Quick Add */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs flex items-center justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
              Danh Sách Đặt Vấn Đề (Problem List 3 Tầng)
            </h2>
            <span className="text-xs text-slate-500 font-mono-custom font-semibold">
              · {problems.length} vấn đề
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sắp xếp theo thứ tự ưu tiên xử trí: Cấp cứu $\rightarrow$ Cấp tính $\rightarrow$ Bệnh nền mạn
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm Vấn Đề Mới</span>
        </button>
      </div>

      {/* Clinical Conflict Banner (Nếu có phát hiện mâu thuẫn) */}
      {clinicalConflicts.length > 0 && (
        <div className="space-y-2">
          {clinicalConflicts.map((conf) => (
            <div
              key={conf.id}
              className="p-3 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-950 flex items-start gap-2.5"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold block text-amber-900">{conf.title}</span>
                <p className="text-[11.5px] text-amber-800 mt-0.5 leading-relaxed">{conf.detail}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3 Tầng Đặt Vấn Đề */}
      <div className="flex flex-col gap-3.5">
        {priorityTiers.map((tier) => {
          const tierProblems = problems.filter(
            (p) => (p.priorityLevel || 'acute') === tier.level
          );

          return (
            <div
              key={tier.level}
              className={`rounded-xl border p-3.5 sm:p-4 flex flex-col gap-3 transition-all ${tier.borderClass}`}
            >
              {/* Tiêu đề nhóm Tầng */}
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom border ${tier.badgeClass}`}>
                    {tier.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono-custom font-semibold">
                    ({tierProblems.length})
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 italic hidden sm:inline">
                  {tier.description}
                </span>
              </div>

              {/* Danh sách các card vấn đề */}
              {tierProblems.length > 0 ? (
                <div className="grid grid-cols-1 gap-2.5">
                  {tierProblems.map((prob) => {
                    const isAnchor = prob.isPrimary;

                    return (
                      <div
                        key={prob.id}
                        className={`bg-white border rounded-xl p-3.5 shadow-2xs flex flex-col gap-2.5 transition-all ${
                          isAnchor
                            ? 'border-blue-400 ring-2 ring-blue-500/15 bg-blue-50/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Header của Card Vấn đề */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryProblem(prob.id)}
                              className={`p-1 rounded transition-colors cursor-pointer ${
                                isAnchor
                                  ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                  : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
                              }`}
                              title={
                                isAnchor
                                  ? 'Đây là Vấn đề Mỏ neo chính định hướng chẩn đoán'
                                  : 'Đặt làm Vấn đề Mỏ neo chính'
                              }
                            >
                              <Star className={`w-4 h-4 ${isAnchor ? 'fill-current' : ''}`} />
                            </button>

                            <span className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                              {prob.label}
                            </span>

                            {isAnchor && (
                              <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                                <Anchor className="w-3 h-3" />
                                <span>Mỏ neo chẩn đoán</span>
                              </span>
                            )}

                            <span className="text-[10px] text-slate-500 font-mono-custom bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                              {prob.type === 'hoi-chung'
                                ? 'Hội chứng'
                                : prob.type === 'trieu-chung'
                                ? 'Triệu chứng'
                                : 'Bệnh lý'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Bộ chọn nhanh chuyển Tầng */}
                            <select
                              value={prob.priorityLevel || 'acute'}
                              onChange={(e) => handleChangePriority(prob.id, e.target.value as any)}
                              className="text-[10px] font-semibold py-1 px-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700 cursor-pointer hover:border-slate-300"
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
                              title="Chỉnh sửa bằng chứng chứng minh"
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

                        {/* Bằng chứng chứng minh (Evidence List) */}
                        {editingProblemId === prob.id ? (
                          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex flex-col gap-2">
                            <span className="text-[11px] font-semibold text-slate-700">
                              Dữ kiện chứng minh (Phân cách bằng dấu chấm phẩy ;):
                            </span>
                            <textarea
                              rows={2}
                              value={editingEvidence}
                              onChange={(e) => setEditingEvidence(e.target.value)}
                              placeholder="VD: Sốt cao liên tục 4 ngày; Đau hạ sườn phải; Hct tăng 46%; Tiểu cầu 65 G/L"
                              className="w-full text-xs p-2 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-500 text-slate-800"
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingProblemId(null)}
                                className="px-2.5 py-1 text-[11px] text-slate-600 hover:bg-slate-200 rounded"
                              >
                                Hủy
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveEvidence(prob.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-semibold hover:bg-blue-700"
                              >
                                Lưu dữ kiện
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span className="text-[10.5px] text-slate-500 font-semibold uppercase tracking-wider">
                              Chứng cứ:
                            </span>
                            {prob.evidence && prob.evidence.length > 0 ? (
                              prob.evidence.map((ev, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200"
                                >
                                  {ev}
                                </span>
                              ))
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">
                                Chưa gán chứng cứ chi tiết (bấm sửa để thêm)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg bg-white/50">
                  Chưa có vấn đề thuộc tầng này. Bấm "+ Thêm Vấn Đề" để bổ sung nếu cần.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal Thêm Vấn Đề Mới */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 max-w-md w-full shadow-xl flex flex-col gap-4 animate-scaleUp">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">
                Thêm Vấn Đề Lâm Sàng Mới
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Tên vấn đề / Hội chứng / Triệu chứng:
                </label>
                <input
                  type="text"
                  value={newProblemLabel}
                  onChange={(e) => setNewProblemLabel(e.target.value)}
                  placeholder="VD: Hội chứng suy tế bào gan cấp"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Loại vấn đề:
                  </label>
                  <select
                    value={newProblemType}
                    onChange={(e) => setNewProblemType(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 text-slate-800"
                  >
                    <option value="hoi-chung">Hội chứng</option>
                    <option value="trieu-chung">Triệu chứng</option>
                    <option value="bat-thuong-cls">Bất thường CLS</option>
                    <option value="benh-man-tinh">Bệnh nền mạn tính</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Tầng ưu tiên:
                  </label>
                  <select
                    value={newProblemPriority}
                    onChange={(e) => setNewProblemPriority(e.target.value as any)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 text-slate-800"
                  >
                    <option value="life-threatening">Tầng 1: Cấp cứu khẩn</option>
                    <option value="acute">Tầng 2: Cấp tính</option>
                    <option value="chronic">Tầng 3: Mạn tính</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Dữ kiện / Bằng chứng chứng minh:
                </label>
                <textarea
                  rows={2}
                  value={newProblemEvidence}
                  onChange={(e) => setNewProblemEvidence(e.target.value)}
                  placeholder="VD: Vàng da niêm; Bilirubin toàn phần 85 µmol/L; Men gan AST/ALT > 1000"
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:border-blue-500 text-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleAddProblem}
                disabled={!newProblemLabel.trim()}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
              >
                Thêm Vào Danh Sách
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
