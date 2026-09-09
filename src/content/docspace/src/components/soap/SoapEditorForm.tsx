import React, { useState, useEffect } from 'react';
import { FilePlus, X, ChevronRight, Check } from 'lucide-react';
import { SoapClinicalExperience, SoapPlanMedication } from '../../types.ts';

interface SoapEditorFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingCase: SoapClinicalExperience | null;
  onSave: (
    caseData: Omit<
      SoapClinicalExperience,
      'id' | 'createdAt' | 'updatedAt' | 'syncStatus' | 'isFavorite' | 'viewCount'
    >
  ) => void;
}

export const SoapEditorForm: React.FC<SoapEditorFormProps> = ({
  isOpen,
  onClose,
  editingCase,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 's' | 'o' | 'a' | 'p'>('general');

  // Form Fields State
  const [title, setTitle] = useState('');
  const [specialty, setSpecialty] = useState('Tim mạch');
  const [level, setLevel] = useState<'essential' | 'pitfall' | 'rare' | 'advanced'>('essential');
  const [demographic, setDemographic] = useState('');
  const [tags, setTags] = useState('');
  const [doctor, setDoctor] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [clinicalContext, setClinicalContext] = useState('Khoa Cấp cứu');
  const [difficultyRating, setDifficultyRating] = useState<number>(3);
  const [outcomeNotes, setOutcomeNotes] = useState('');

  // Column S
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [hpi, setHpi] = useState('');
  const [pmh, setPmh] = useState('');
  const [historyPearls, setHistoryPearls] = useState('');

  // Column O
  const [temp, setTemp] = useState('37.0');
  const [pulse, setPulse] = useState('80');
  const [bp, setBp] = useState('120/80');
  const [resp, setResp] = useState('18');
  const [spo2, setSpo2] = useState('98');
  const [bmi, setBmi] = useState('22.0');
  const [physical, setPhysical] = useState('');
  const [labs, setLabs] = useState('');
  const [objPitfalls, setObjPitfalls] = useState('');

  // Column A
  const [dx, setDx] = useState('');
  const [icd, setIcd] = useState('');
  const [diffs, setDiffs] = useState('');
  const [risk, setRisk] = useState('');
  const [dxPearls, setDxPearls] = useState('');

  // Column P
  const [immediate, setImmediate] = useState('');
  const [medsText, setMedsText] = useState('');
  const [monitoring, setMonitoring] = useState('');
  const [lessons, setLessons] = useState('');

  useEffect(() => {
    if (editingCase) {
      setTitle(editingCase.title);
      setSpecialty(editingCase.specialty);
      setLevel(editingCase.experienceLevel);
      setDemographic(editingCase.demographicContext);
      setTags(editingCase.tags.join(', '));
      setDoctor(editingCase.authorDoctor || '');
      setSourceReference(editingCase.sourceReference || '');
      setClinicalContext(editingCase.clinicalContext || 'Khoa Cấp cứu');
      setDifficultyRating(editingCase.difficultyRating || 3);
      setOutcomeNotes(editingCase.outcomeNotes || '');

      setChiefComplaint(editingCase.s.chiefComplaint);
      setHpi(editingCase.s.historyOfPresentIllness);
      setPmh(editingCase.s.pastMedicalHistory);
      setHistoryPearls(editingCase.s.historyPearls);

      setTemp(editingCase.o.vitals.temp || '37.0');
      setPulse(editingCase.o.vitals.pulse || '80');
      setBp(editingCase.o.vitals.bp || '120/80');
      setResp(editingCase.o.vitals.resp || '18');
      setSpo2(editingCase.o.vitals.spo2 || '98');
      setBmi(editingCase.o.vitals.bmi || '22.0');
      setPhysical(editingCase.o.physicalExam);
      setLabs(editingCase.o.labsAndImaging);
      setObjPitfalls(editingCase.o.objectivePitfalls);

      setDx(editingCase.a.primaryDiagnosis);
      setIcd(editingCase.a.icd10);
      setDiffs(editingCase.a.differentials.join('; '));
      setRisk(editingCase.a.riskStratification);
      setDxPearls(editingCase.a.diagnosticPearls);

      setImmediate(editingCase.p.immediateActions);
      setMedsText(
        editingCase.p.medications
          .map((m) => `${m.drug} - ${m.dose} - ${m.route} - ${m.note}`)
          .join('\n')
      );
      setMonitoring(editingCase.p.monitoringAndTargets);
      setLessons(editingCase.p.takeawayLessons);
    } else {
      // Reset form
      setTitle('');
      setSpecialty('Tim mạch');
      setLevel('essential');
      setDemographic('');
      setTags('');
      setDoctor('');
      setSourceReference('');
      setClinicalContext('Khoa Cấp cứu');
      setDifficultyRating(3);
      setOutcomeNotes('');

      setChiefComplaint('');
      setHpi('');
      setPmh('');
      setHistoryPearls('');

      setTemp('37.0');
      setPulse('80');
      setBp('120/80');
      setResp('18');
      setSpo2('98');
      setBmi('22.0');
      setPhysical('');
      setLabs('');
      setObjPitfalls('');

      setDx('');
      setIcd('');
      setDiffs('');
      setRisk('');
      setDxPearls('');

      setImmediate('');
      setMedsText('');
      setMonitoring('');
      setLessons('');
    }
    setActiveTab('general');
  }, [editingCase, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Vui lòng nhập Tiêu đề ca kinh nghiệm lâm sàng.');
      return;
    }
    if (!dx.trim()) {
      alert('Vui lòng nhập Chẩn đoán xác định tại Cột A.');
      return;
    }

    const parsedMeds: SoapPlanMedication[] = medsText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split('-').map((p) => p.trim());
        return {
          drug: parts[0] || 'Thuốc',
          dose: parts[1] || 'Theo chỉ định',
          route: parts[2] || 'Uống',
          note: parts[3] || '',
        };
      });

    const parsedDiffs = diffs
      .split(';')
      .map((d) => d.trim())
      .filter((d) => d.length > 0);

    const parsedTags = tags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter((t) => t.length > 0);

    const caseData = {
      title: title.trim(),
      specialty,
      experienceLevel: level,
      demographicContext: demographic.trim() || 'Người bệnh trưởng thành',
      authorDoctor: doctor.trim() || 'Bác sĩ lâm sàng',
      sourceReference: sourceReference.trim(),
      clinicalContext: clinicalContext.trim(),
      difficultyRating: (Number(difficultyRating) || 3) as 1 | 2 | 3 | 4 | 5,
      outcomeNotes: outcomeNotes.trim(),
      tags: parsedTags.length > 0 ? parsedTags : ['LamSang', 'SOAP'],
      s: {
        chiefComplaint: chiefComplaint.trim() || 'Triệu chứng khó chịu cần thăm khám',
        historyOfPresentIllness: hpi.trim() || 'Bệnh sử được khai thác theo diễn tiến thời gian',
        pastMedicalHistory: pmh.trim() || 'Không ghi nhận tiền căn đặc biệt',
        symptomsList: chiefComplaint ? [chiefComplaint.split(',')[0].trim()] : ['Đau'],
        historyPearls: historyPearls.trim() || 'Lưu ý khai thác kỹ hoàn cảnh khởi phát và các triệu chứng kèm theo',
      },
      o: {
        vitals: { temp, pulse, bp, resp, spo2, bmi },
        physicalExam: physical.trim() || 'Khám tổng quát và các cơ quan trong giới hạn bình thường',
        labsAndImaging: labs.trim() || 'Kết quả cận lâm sàng đang chờ cập nhật',
        objectivePitfalls: objPitfalls.trim() || 'Chú ý theo dõi sát sinh hiệu và lặp lại xét nghiệm khi cần',
      },
      a: {
        primaryDiagnosis: dx.trim(),
        icd10: icd.trim() || 'R69',
        differentials: parsedDiffs.length > 0 ? parsedDiffs : ['Cần theo dõi thêm'],
        riskStratification: risk.trim() || 'Nguy cơ trung bình, cần theo dõi sát',
        diagnosticPearls: dxPearls.trim() || 'Biện luận logic dựa trên bằng chứng lâm sàng và cận lâm sàng',
      },
      p: {
        immediateActions: immediate.trim() || 'Xử trí ổn định các dấu hiệu sinh tồn ban đầu',
        medications: parsedMeds,
        monitoringAndTargets: monitoring.trim() || 'Theo dõi sinh hiệu mỗi 4-6 giờ',
        consultationOrReferral: 'Hội chẩn chuyên khoa nếu triệu chứng không thuyên giảm',
        takeawayLessons: lessons.trim() || 'Bài học lâm sàng cần ghi nhớ trong thực hành',
      },
    };

    onSave(caseData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="bg-white border-b border-slate-200/90 p-4 sm:p-5 px-6 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-blue-600" />
              <span>
                {editingCase ? 'Chỉnh Sửa Ca Kinh Nghiệm SOAP' : 'Thêm Ca Kinh Nghiệm Lâm Sàng Mới'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Đúc kết kinh nghiệm lâm sàng chuẩn 4 cột SOAP (Tuyệt đối không lưu tên, CCCD hay danh tính cá nhân).
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Step Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-200/80 px-6 py-2.5 bg-slate-50 text-xs overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'general', label: '1. Thông tin chung', activeColor: 'bg-blue-600 text-white' },
            { id: 's', label: '2. S (Chủ quan)', activeColor: 'bg-sky-600 text-white' },
            { id: 'o', label: '3. O (Khách quan)', activeColor: 'bg-indigo-600 text-white' },
            { id: 'a', label: '4. A (Đánh giá)', activeColor: 'bg-amber-600 text-white' },
            { id: 'p', label: '5. P (Kế hoạch)', activeColor: 'bg-teal-600 text-white' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? `${tab.activeColor} shadow-2xs` : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-800">
          {/* TAB 1: THÔNG TIN CHUNG */}
          {activeTab === 'general' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tiêu đề ca kinh nghiệm lâm sàng *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="VD: Hội chứng vành cấp không ST chênh lên ở BN đái tháo đường cao tuổi..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 focus:bg-white text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chuyên khoa</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                  >
                    <option value="Tim mạch">Tim mạch</option>
                    <option value="Hô hấp">Hô hấp</option>
                    <option value="Tiêu hóa">Tiêu hóa</option>
                    <option value="Thần kinh">Thần kinh</option>
                    <option value="Truyền nhiễm">Truyền nhiễm</option>
                    <option value="Thận - Tiết niệu">Thận - Tiết niệu</option>
                    <option value="Nội tiết">Nội tiết</option>
                    <option value="Cấp cứu - HSTC">Cấp cứu - HSTC</option>
                    <option value="Nhi khoa">Nhi khoa</option>
                    <option value="Sản phụ khoa">Sản phụ khoa</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cấp độ ca bệnh</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                  >
                    <option value="essential">Ca kinh điển</option>
                    <option value="pitfall">Bẫy lâm sàng</option>
                    <option value="rare">Tình huống hiếm</option>
                    <option value="advanced">Chuyên sâu EBM</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Độ khó ca bệnh</label>
                  <select
                    value={difficultyRating}
                    onChange={(e) => setDifficultyRating(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-medium"
                  >
                    <option value={1}>★☆☆☆☆ (1 Sao - Đơn giản)</option>
                    <option value={2}>★★☆☆☆ (2 Sao - Cơ bản)</option>
                    <option value={3}>★★★☆☆ (3 Sao - Trung bình)</option>
                    <option value={4}>★★★★☆ (4 Sao - Phức tạp)</option>
                    <option value={5}>★★★★★ (5 Sao - Rất khó)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khoa phòng lâm sàng</label>
                  <input
                    type="text"
                    value={clinicalContext}
                    onChange={(e) => setClinicalContext(e.target.value)}
                    placeholder="VD: Khoa Cấp cứu, ICU, Phòng khám Ngoại trú..."
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bác sĩ / Giảng viên đúc kết</label>
                  <input
                    type="text"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    placeholder="VD: BS. CK2 Tim mạch can thiệp"
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Bối cảnh cơ địa lâm sàng (Không lưu tên người bệnh)
                </label>
                <input
                  type="text"
                  value={demographic}
                  onChange={(e) => setDemographic(e.target.value)}
                  placeholder="VD: Bệnh nhân 68 tuổi, thể trạng thừa cân, tiền căn ĐTĐ type 2 điều trị 12 năm"
                  className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nguồn tài liệu / Guideline</label>
                  <input
                    type="text"
                    value={sourceReference}
                    onChange={(e) => setSourceReference(e.target.value)}
                    placeholder="VD: ESC NSTE-ACS 2023 Guidelines"
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags phân loại (phân cách bởi dấu phẩy)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="VD: NSTEMI, ĐauThắtNgực, Troponin, CấpCứu"
                    className="w-full border border-slate-300 rounded-md p-2 bg-slate-50 font-mono-custom"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('s')}
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                >
                  <span>Tiếp tục: Cột S</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CỘT S */}
          {activeTab === 's' && (
            <div className="border border-sky-300 rounded-xl p-4 bg-sky-50/30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                <span className="w-5 h-5 rounded bg-sky-600 text-white flex items-center justify-center text-xs">S</span>
                <span>CỘT S — SUBJECTIVE (Chủ quan & Khai thác bệnh sử)</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Than phiền chính (Chief Complaint) *</label>
                <input
                  type="text"
                  required
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="Mô tả than phiền chính của bệnh nhân hoặc lý do người nhà đưa đến..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bệnh sử chi tiết (PQRST)</label>
                <textarea
                  rows={3}
                  value={hpi}
                  onChange={(e) => setHpi(e.target.value)}
                  placeholder="Vị trí, hoàn cảnh khởi phát, tính chất, hướng lan, mức độ, yếu tố tăng/giảm..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tiền căn bệnh lý &amp; Dược sử liên quan (PMH)</label>
                <textarea
                  rows={2}
                  value={pmh}
                  onChange={(e) => setPmh(e.target.value)}
                  placeholder="Bệnh mạn tính, tiền sử dùng thuốc, dị ứng, thuốc tự mua..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-cyan-900 mb-1">
                  💎 Kinh nghiệm hỏi bệnh &amp; Câu hỏi then chốt (History Pearl)
                </label>
                <textarea
                  rows={2}
                  value={historyPearls}
                  onChange={(e) => setHistoryPearls(e.target.value)}
                  placeholder="Những bẫy trong khai thác triệu chứng, câu hỏi vàng không được bỏ sót..."
                  className="w-full border border-cyan-300 rounded-md p-2 bg-white text-cyan-950 font-medium"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('general')}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('o')}
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                >
                  <span>Tiếp tục: Cột O</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CỘT O */}
          {activeTab === 'o' && (
            <div className="border border-blue-300 rounded-xl p-4 bg-blue-50/30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-xs">O</span>
                <span>CỘT O — OBJECTIVE (Khách quan &amp; Cận lâm sàng)</span>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">T° (°C)</label>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Mạch (l/p)</label>
                  <input
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Huyết áp</label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Nhịp thở</label>
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => setResp(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">SpO₂ (%)</label>
                  <input
                    type="text"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">BMI</label>
                  <input
                    type="text"
                    value={bmi}
                    onChange={(e) => setBmi(e.target.value)}
                    className="w-full border border-slate-300 rounded p-1.5 bg-white text-center font-mono-custom"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Khám thực thể trọng tâm</label>
                <textarea
                  rows={2}
                  value={physical}
                  onChange={(e) => setPhysical(e.target.value)}
                  placeholder="Khám tim, phổi, bụng, thần kinh, các dấu chứng thực thể định khu..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Cận lâm sàng then chốt (ECG, X-quang, Xét nghiệm máu, CT...)
                </label>
                <textarea
                  rows={2}
                  value={labs}
                  onChange={(e) => setLabs(e.target.value)}
                  placeholder="Kết quả xét nghiệm định lượng có giá trị xác chẩn hoặc loại trừ..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                />
              </div>

              <div>
                <label className="block font-bold text-rose-800 mb-1">
                  ⚠️ Bẫy dấu chứng &amp; Cận lâm sàng (Objective Pitfall)
                </label>
                <textarea
                  rows={2}
                  value={objPitfalls}
                  onChange={(e) => setObjPitfalls(e.target.value)}
                  placeholder="Dấu hiệu dễ bỏ sót, âm tính giả, dương tính giả..."
                  className="w-full border border-rose-300 rounded-md p-2 bg-white text-rose-950 font-medium"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('s')}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('a')}
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                >
                  <span>Tiếp tục: Cột A</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: CỘT A */}
          {activeTab === 'a' && (
            <div className="border border-amber-300 rounded-xl p-4 bg-amber-50/30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <span className="w-5 h-5 rounded bg-amber-600 text-white flex items-center justify-center text-xs">A</span>
                <span>CỘT A — ASSESSMENT (Đánh giá &amp; Biện luận)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Chẩn đoán xác định *</label>
                  <input
                    type="text"
                    required
                    value={dx}
                    onChange={(e) => setDx(e.target.value)}
                    placeholder="VD: Nhồi máu cơ tim cấp không ST chênh lên (NSTEMI)"
                    className="w-full border border-slate-300 rounded-md p-2 bg-white font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mã ICD-10</label>
                  <input
                    type="text"
                    value={icd}
                    onChange={(e) => setIcd(e.target.value)}
                    placeholder="VD: I21.4"
                    className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Chẩn đoán phân biệt (ngăn cách bởi dấu chấm phẩy ;)
                </label>
                <input
                  type="text"
                  value={diffs}
                  onChange={(e) => setDiffs(e.target.value)}
                  placeholder="VD: Bóc tách ĐMC ngực; Thuyên tắc phổi; Viêm cơ tim"
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phân tầng nguy cơ &amp; Thang điểm lượng giá</label>
                <input
                  type="text"
                  value={risk}
                  onChange={(e) => setRisk(e.target.value)}
                  placeholder="VD: GRACE > 140 điểm, Killip I, TIMI 4 điểm..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-amber-900 mb-1">
                  🧠 Đúc kết biện luận chẩn đoán (Diagnostic Pearl)
                </label>
                <textarea
                  rows={2}
                  value={dxPearls}
                  onChange={(e) => setDxPearls(e.target.value)}
                  placeholder="Quy luật biện luận, logic loại trừ các chẩn đoán phân biệt..."
                  className="w-full border border-amber-300 rounded-md p-2 bg-white text-amber-950 font-medium"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('o')}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('p')}
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded flex items-center gap-1 cursor-pointer"
                >
                  <span>Tiếp tục: Cột P</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: CỘT P */}
          {activeTab === 'p' && (
            <div className="border border-emerald-300 rounded-xl p-4 bg-emerald-50/30 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center text-xs">P</span>
                <span>CỘT P — PLAN (Kế hoạch &amp; Điều trị)</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Xử trí cấp cứu &amp; Ban đầu</label>
                <textarea
                  rows={2}
                  value={immediate}
                  onChange={(e) => setImmediate(e.target.value)}
                  placeholder="Đường thở, oxy, đường truyền, ổn định huyết động..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Y lệnh thuốc (Mỗi dòng 1 thuốc: Tên thuốc - Liều - Đường dùng - Lưu ý)
                </label>
                <textarea
                  rows={3}
                  value={medsText}
                  onChange={(e) => setMedsText(e.target.value)}
                  placeholder={`Aspirin - 300mg - Uống ngay - Liều nạp\nTicagrelor - 180mg - Uống ngay - Liều nạp\nEnoxaparin - 1mg/kg - Tiêm dưới da q12h - Hiệu chỉnh nếu eGFR < 30`}
                  className="w-full border border-slate-300 rounded-md p-2 bg-white font-mono-custom"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chỉ tiêu theo dõi &amp; Mục tiêu lâm sàng</label>
                <input
                  type="text"
                  value={monitoring}
                  onChange={(e) => setMonitoring(e.target.value)}
                  placeholder="Theo dõi HA, nước tiểu, lặp lại xét nghiệm sau bao lâu..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Kết cục ca bệnh &amp; Di chứng nếu có</label>
                <input
                  type="text"
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  placeholder="VD: Can thiệp PCI thành công, xuất viện ngày thứ 4 không suy tim..."
                  className="w-full border border-slate-300 rounded-md p-2 bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-900 mb-1">
                  🎯 Bài học kinh nghiệm điều trị cốt lõi (Takeaway)
                </label>
                <textarea
                  rows={2}
                  value={lessons}
                  onChange={(e) => setLessons(e.target.value)}
                  placeholder="Bài học rút ra từ ca này: chỉnh liều, tương tác thuốc, phòng ngừa biến chứng..."
                  className="w-full border border-emerald-300 rounded-md p-2 bg-white text-emerald-950 font-medium"
                />
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('a')}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 font-semibold cursor-pointer"
                >
                  Quay lại
                </button>
                <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Sẵn sàng lưu</span>
                </span>
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="text-[11px] text-slate-400 italic">
              * Dữ liệu được lưu trữ offline tại máy và đồng bộ lên Supabase Cloud khi kết nối.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{editingCase ? 'Cập nhật thay đổi' : 'Lưu ca kinh nghiệm SOAP'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
