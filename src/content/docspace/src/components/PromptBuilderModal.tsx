import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  FileCode,
  FileText,
  HelpCircle,
  Layers,
  Search,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';
import { VAULT_CATALOG } from '../lib/vaultBridge.ts';

interface PromptBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToIngest?: () => void;
  initialDisease?: string;
}

const SPECIALTIES = [
  'Tim mạch',
  'Hô hấp',
  'Tiêu hóa - Gan mật',
  'Hồi sức - Cấp cứu',
  'Thần kinh',
  'Nhiễm trùng - Nhiệt đới',
  'Nội tiết - Chuyển hóa',
  'Thận - Tiết niệu',
  'Nhi khoa',
  'Sản phụ khoa',
  'Cơ xương khớp',
  'Ngoại khoa - Chấn thương',
  'Huyết học',
  'Da liễu',
  'Tổng quát',
];

const CLINICAL_SETTINGS = [
  'Khoa Cấp cứu (Emergency Department)',
  'Khoa Hồi sức tích cực (ICU)',
  'Phòng khám ngoại trú (OPD)',
  'Khoa Nội trú tổng hợp (Inpatient Ward)',
  'Đơn vị Tim mạch can thiệp (CCU / Cath Lab)',
  'Khoa Đột quỵ (Stroke Unit)',
];

export const PromptBuilderModal: React.FC<PromptBuilderModalProps> = ({
  isOpen,
  onClose,
  onSendToIngest,
  initialDisease = '',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [diseaseName, setDiseaseName] = useState<string>(initialDisease);
  const [specialty, setSpecialty] = useState<string>('Tim mạch');
  const [experienceLevel, setExperienceLevel] = useState<'essential' | 'pitfall' | 'rare' | 'advanced'>('essential');
  const [difficultyRating, setDifficultyRating] = useState<number>(3);

  // Demographics
  const [gender, setGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [age, setAge] = useState<string>('58');
  const [occupation, setOccupation] = useState<string>('Tài xế');
  const [comorbidities, setComorbidities] = useState<string>('Tăng huyết áp 5 năm, ĐTĐ típ 2, hút thuốc lá 20 gói-năm');
  const [clinicalSetting, setClinicalSetting] = useState<string>(CLINICAL_SETTINGS[0]);
  const [clinicalFocus, setClinicalFocus] = useState<string>('Biện luận phân tầng nguy cơ & xử trí thuốc ban đầu');

  // EBM Sources
  const [ebmSources, setEbmSources] = useState<string[]>([]);
  const [sourceSearch, setSourceSearch] = useState<string>('');

  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Autocomplete disease suggestions from Vault
  const diseaseSuggestions = useMemo(() => {
    if (!diseaseName || diseaseName.length < 2) return [];
    const q = diseaseName.toLowerCase();
    const matches = VAULT_CATALOG.filter(
      (a) => a.title.toLowerCase().includes(q) || (a.keywords && a.keywords.some((k) => k.toLowerCase().includes(q)))
    ).slice(0, 6);
    return matches.map((m) => ({ title: m.title, specialty: m.specialty }));
  }, [diseaseName]);

  // Suggested EBM Vault articles for selected disease
  const suggestedVaultSources = useMemo(() => {
    const q = (sourceSearch || diseaseName).trim().toLowerCase();
    if (!q) return VAULT_CATALOG.slice(0, 8);
    return VAULT_CATALOG.filter(
      (a) =>
        a.khoCode === 'PDDT' ||
        a.khoCode === 'CD' ||
        a.khoCode === 'DUOC' ||
        a.khoCode === 'EBM' ||
        a.khoCode === 'CC'
    )
      .filter((a) => a.title.toLowerCase().includes(q) || a.specialty.toLowerCase().includes(q))
      .slice(0, 8);
  }, [diseaseName, sourceSearch]);

  const toggleSource = (title: string) => {
    setEbmSources((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  // Generate Master Prompt text
  const generatedPrompt = useMemo(() => {
    const slug = diseaseName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'case';

    const sourceText =
      ebmSources.length > 0
        ? ebmSources.map((s) => `  - ${s}`).join('\n')
        : '  - Hướng dẫn Chẩn đoán và Điều trị của Bộ Y Tế & Khuyến cáo chuyên khoa EBM tương ứng';

    return `Bạn là một Bác sĩ Giảng viên Lâm sàng kỳ cựu và Chuyên gia Y học Chứng cứ (EBM).
Dựa DUY NHẤT và CHẶT CHẼ trên các tài liệu đã tải lên trong Notebook này, hãy xây dựng 01 Ca Bệnh Án Lâm Sàng Điển Hình theo đúng cấu trúc SOAP chuẩn quốc tế và định dạng Markdown bên dưới.

Yêu cầu lâm sàng:
- Mặt bệnh cần xây dựng: ${diseaseName || '[Chưa đặt tên bệnh]'}
- Chuyên khoa: ${specialty}
- Phân loại ca: ${experienceLevel} (${
      experienceLevel === 'essential'
        ? 'Ca kinh điển'
        : experienceLevel === 'pitfall'
        ? 'Bẫy lâm sàng dễ bỏ sót'
        : experienceLevel === 'rare'
        ? 'Tình huống hiếm gặp'
        : 'Chuyên sâu EBM'
    })
- Độ khó ca bệnh: ${difficultyRating} / 5
- Bối cảnh bệnh nhân: ${gender} ${age} tuổi, nghề nghiệp: ${occupation}, tiền căn: ${comorbidities}
- Bối cảnh khoa phòng: ${clinicalSetting}
- Trọng tâm biện luận: ${clinicalFocus}
- Tài liệu nguồn ưu tiên trích dẫn:
${sourceText}

Định dạng xuất bản (BẮT BUỘC tuân thủ chính xác 100% cú pháp Markdown Frontmatter dưới đây để hệ thống tự động nhận diện):

---
title: "${diseaseName || 'Ca lâm sàng'} ở bệnh nhân ${gender} ${age} tuổi có tiền căn ${comorbidities.split(',')[0] || 'đặc biệt'}"
caseId: "soap-${slug}-01"
specialty: "${specialty}"
experienceLevel: "${experienceLevel}"
difficultyRating: ${difficultyRating}
authorDoctor: "Hội đồng Khoa học Knowledge Vault"
icd10:
  - "[Mã ICD-10 chính]"
tags:
  - "${specialty}"
  - "${diseaseName || 'Lâm sàng'}"
  - "SOAP"
demographicContext: "Bệnh nhân ${gender} ${age} tuổi, nghề nghiệp ${occupation}, tiền căn ${comorbidities}"
historyPearls: "⚡ BÀI HỌC KHAI THÁC BỆNH SỬ: [1 câu hỏi vàng hoặc kỹ năng hỏi bệnh giúp nhận diện sớm bệnh]"
objectivePitfalls: "⚠️ BẪY CẬN LÂM SÀNG & KHÁM: [Dấu hiệu cơ thể hoặc bẫy diễn giải cận lâm sàng rất dễ bị bỏ sót hoặc đọc sai]"
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: [Lập luận chẩn đoán phân biệt cốt lõi, ngưỡng quyết định điều trị]"
takeawayLessons: "🎯 BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ: [Khuyến cáo điều trị, đơn thuốc cá thể hóa, phòng ngừa tai biến]"
sourceReference: "Knowledge Vault · ${specialty}"
clinicalContext: "${clinicalSetting}"
updated: "${new Date().toISOString().split('T')[0]}"
---

# 🩺 Ca Lâm Sàng: ${diseaseName || 'Ca bệnh lâm sàng'}

> **Bối cảnh**: Bệnh nhân ${gender} ${age} tuổi, ${occupation}, ${comorbidities}

## 1. 📝 S — CHỦ QUAN / SUBJECTIVE
- **Lý do nhập viện / Than phiền chính**: [Mô tả triệu chứng chính khiến người bệnh vào viện]
- **Bệnh sử chi tiết**:
[Khai thác đầy đủ thuộc tính PQRST, tiến triển triệu chứng theo thời gian, các xử trí trước nhập viện nếu có]
- **Tiền căn**:
[Bệnh mạn tính, thuốc đang sử dụng, tiền căn gia đình, thói quen sinh hoạt]

## 2. 🔬 O — KHÁCH QUAN / OBJECTIVE
### Sinh hiệu:
- Huyết áp: [VD: 140/90 mmHg]
- Mạch: [VD: 95 l/p]
- Thân nhiệt: [VD: 37.2 °C]
- Nhịp thở: [VD: 22 l/p]
- SpO₂: [VD: 94%]
- BMI: [VD: 24.5]

### Khám thực thể trọng tâm:
[Khám toàn thân và từng cơ quan chi tiết, dấu hiệu dương tính lẫn âm tính quan trọng]

### Cận lâm sàng & Hình ảnh học:
[Xét nghiệm máu, men sinh học, khí máu, ECG, X-quang, Siêu âm, CT/MRI nếu có kèm khoảng tham chiếu và thời điểm lấy mẫu]

## 3. 🧠 A — ĐÁNH GIÁ / ASSESSMENT
- **Chẩn đoán xác định**: ${diseaseName || '[Tên chẩn đoán chính xác]'}
- **Mã ICD-10**: \`[Mã ICD]\`
- **Chẩn đoán phân biệt cần loại trừ**:
- [Chẩn đoán phân biệt 1]
- [Chẩn đoán phân biệt 2]
- [Chẩn đoán phân biệt 3]
- **Phân tầng nguy cơ & Thang điểm lượng giá**:
[Điểm số lượng giá cụ thể: TIMI, GRACE, CURB-65, Glasgow, Child-Pugh, MELD... và ý nghĩa lâm sàng]

## 4. 📋 P — KẾ HOẠCH / PLAN
- **Xử trí cấp cứu & Ban đầu**:
[Các can thiệp tức thì, tư thế, oxy liệu pháp, đường truyền tĩnh mạch]

### Y lệnh thuốc điều trị:
- **[Tên hoạt chất thuốc 1]**: [Liều lượng] ([Đường dùng, PO/IV...]) — *[Ghi chú / Cơ chế]*
- **[Tên hoạt chất thuốc 2]**: [Liều lượng] ([Đường dùng]) — *[Ghi chú]*
- **[Tên hoạt chất thuốc 3]**: [Liều lượng] ([Đường dùng]) — *[Ghi chú]*

- **Chỉ tiêu theo dõi & Mục tiêu lâm sàng**:
[Mục tiêu huyết áp, SpO2, nhịp tim, đường huyết, thời điểm đánh giá lại]
- **Tiêu chuẩn hội chẩn / Chuyển viện / Can thiệp**:
[Ngưỡng can thiệp chuyên sâu, chỉ định chuyển ICU hoặc chuyển viện tuyến trên]
`;
  }, [
    diseaseName,
    specialty,
    experienceLevel,
    difficultyRating,
    gender,
    age,
    occupation,
    comorbidities,
    clinicalSetting,
    clinicalFocus,
    ebmSources,
  ]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">
                  Trình Tạo Prompt NotebookLM
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  Prompt Master 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tạo prompt chuẩn hóa để NotebookLM sinh ra ca bệnh SOAP chính xác 100% định dạng MedLens
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
          <div className={`flex items-center gap-2 font-medium ${step >= 1 ? 'text-blue-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>1</span>
            <span>Mặt bệnh</span>
          </div>
          <div className="w-8 h-px bg-slate-200 self-center mx-3" />
          <div className={`flex items-center gap-2 font-medium ${step >= 2 ? 'text-blue-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>2</span>
            <span>Bối cảnh bệnh nhân</span>
          </div>
          <div className="w-8 h-px bg-slate-200 self-center mx-3" />
          <div className={`flex items-center gap-2 font-medium ${step >= 3 ? 'text-blue-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>3</span>
            <span>Nguồn EBM</span>
          </div>
          <div className="w-8 h-px bg-slate-200 self-center mx-3" />
          <div className={`flex items-center gap-2 font-medium ${step >= 4 ? 'text-blue-700' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 4 ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 text-slate-500'}`}>4</span>
            <span>Nhận Prompt</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Disease & Specialty */}
          {step === 1 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Mặt bệnh muốn xây dựng ca lâm sàng:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                    placeholder="Ví dụ: Cơn đau thắt ngực không ổn định / Đợt cấp COPD / Viêm tụy cấp nặng..."
                    className="w-full text-xs font-medium px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                  />
                  {diseaseSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                      <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase bg-slate-50">
                        Gợi ý từ Knowledge Vault
                      </div>
                      {diseaseSuggestions.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setDiseaseName(s.title);
                            if (s.specialty) setSpecialty(s.specialty);
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 flex items-center justify-between text-slate-800 transition-colors"
                        >
                          <span className="font-medium">{s.title}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {s.specialty}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Chuyên khoa:
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
                  >
                    {SPECIALTIES.map((sp) => (
                      <option key={sp} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phân loại bài học ca bệnh:
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="essential">Kinh điển (Essential) — Mặt bệnh thường gặp</option>
                    <option value="pitfall">Bẫy lâm sàng (Pitfall) — Dấu hiệu dễ bỏ sót</option>
                    <option value="rare">Tình huống hiếm (Rare) — Bệnh cảnh không điển hình</option>
                    <option value="advanced">Chuyên sâu (Advanced) — Biện luận đa chuyên khoa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Độ khó ca bệnh: <span className="font-bold text-blue-700">{difficultyRating} / 5</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={difficultyRating}
                    onChange={(e) => setDifficultyRating(parseInt(e.target.value, 10))}
                    className="flex-1 accent-blue-600"
                  />
                  <div className="flex gap-1 text-xs font-mono text-slate-500">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <span
                        key={num}
                        className={`w-6 h-6 rounded-md flex items-center justify-center font-bold ${
                          num <= difficultyRating ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Demographics & Context */}
          {step === 2 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Giới tính:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Tuổi:
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nghề nghiệp:
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tiền căn bệnh lý & Thói quen:
                </label>
                <input
                  type="text"
                  value={comorbidities}
                  onChange={(e) => setComorbidities(e.target.value)}
                  placeholder="Ví dụ: Tăng huyết áp 5 năm, ĐTĐ típ 2, hút thuốc lá 20 gói-năm..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Khoa phòng tiếp nhận (Clinical Setting):
                </label>
                <select
                  value={clinicalSetting}
                  onChange={(e) => setClinicalSetting(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl bg-white"
                >
                  {CLINICAL_SETTINGS.map((setting) => (
                    <option key={setting} value={setting}>
                      {setting}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Điểm nhấn cần đào sâu (Clinical Focus):
                </label>
                <textarea
                  rows={2}
                  value={clinicalFocus}
                  onChange={(e) => setClinicalFocus(e.target.value)}
                  placeholder="Ví dụ: Phân tầng nguy cơ theo thang điểm GRACE, phân tích biến đổi sóng T trên ECG, y lệnh thuốc chống đông..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-xl text-slate-900 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: EBM Sources from Vault */}
          {step === 3 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Chọn các tài liệu EBM từ Knowledge Vault làm căn cứ trích dẫn:
                </label>
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={sourceSearch}
                    onChange={(e) => setSourceSearch(e.target.value)}
                    placeholder="Tìm tài liệu, phác đồ, tiêu chuẩn chẩn đoán trong Vault..."
                    className="w-full text-xs pl-9 pr-3.5 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {suggestedVaultSources.map((art) => {
                    const isChecked = ebmSources.includes(art.title);
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => toggleSource(art.title)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                          isChecked
                            ? 'bg-blue-50/70 border-blue-300 text-blue-900'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 pr-2">
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <span className="font-semibold block">{art.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {art.khoName} · {art.specialty}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0 font-mono">
                          {art.khoCode}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {ebmSources.length > 0 && (
                  <div className="pt-2 text-xs text-blue-700 font-medium">
                    ✓ Đã chọn {ebmSources.length} tài liệu làm nguồn tham chiếu.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Generated Prompt */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Prompt Master đã được sinh sẵn sàng:</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://notebooklm.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <span>Mở NotebookLM</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center gap-1.5 transition-colors font-semibold shadow-xs cursor-pointer"
                  >
                    {copiedNotification ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedNotification ? 'Đã sao chép!' : 'Sao chép Prompt'}</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={generatedPrompt}
                rows={14}
                className="w-full text-xs font-mono p-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 resize-none leading-relaxed select-all"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
                <div className="leading-relaxed">
                  <span className="font-bold">Quy trình tiếp theo:</span> Sao chép prompt trên ➔ Dán vào NotebookLM ➔ Khi có kết quả, quay lại MedLens và nhấn <span className="font-bold">"Nạp ca từ NotebookLM"</span>.
                </div>
                {onSendToIngest && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSendToIngest();
                    }}
                    className="shrink-0 px-3.5 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Chuyển sang Nạp ca ➔
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Quay lại
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Tiếp tục</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Hoàn tất
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
