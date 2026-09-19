---
name: docspace-step3-cdss-squad
description: Đội ngũ AI chuyên trách Động cơ Suy luận Lâm sàng CDSS, Ma trận Trọng số Suy luận (dt, gy, ht, loaitru), Thang điểm Nguy cơ Đa tầng (NEWS2, PEWS, ESI v4), Tiêu chuẩn Chẩn đoán Vàng (Gold Standard) và Phân tầng Mức độ nặng cho Bước 3 phân hệ CliniPortal DocSpace. Kích hoạt khi cần tối ưu thuật toán suy luận chẩn đoán, chuẩn hóa CSDL bệnh học hoặc bổ sung thang điểm lượng giá.
---

# ⚖️ DocSpace Step 3 — Diagnostic CDSS & Severity Staging Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện **Bước 3: Phân tích CDSS & Biện luận Chẩn đoán Phân biệt** (`src/content/docspace/src/components/Step2Analysis.tsx`, `LeadDiagnosisCard.tsx`, `DifferentialTable.tsx`).

---

## 🏛️ 1. Tôn Chỉ & Động Cơ Suy Luận Lâm Sàng

1. **Ma Trận Trọng Số Suy Luận 4 Vai Trò (CDSS Role Matrix)**:
   - Hệ thống vận hành theo 4 vai trò y học chứng cứ trong CSDL `clinical-rules-kb.json`:
     - **`dt` (Đặc trưng - Pathognomonic)**: Trọng số $15-20$ điểm. Xuất hiện là gần như xác lập hướng chẩn đoán nổi trội.
     - **`gy` (Gợi ý - Suggestive)**: Trọng số $8-12$ điểm. Dấu hiệu định hướng cao trong bối cảnh lâm sàng.
     - **`ht` (Hỗ trợ - Supportive)**: Trọng số $3-5$ điểm. Triệu chứng phổ biến hoặc dấu hiệu không đặc hiệu.
     - **`loaitru` (Loại trừ - Exclusionary)**: Trọng số âm hoặc triệt tiêu xác suất khi xuất hiện dấu hiệu chống lại bệnh lý.
2. **Khối Tiêu Chuẩn Vàng Xác Chẩn (Gold Standard / Criteria Rule)**:
   - Hiển thị rõ ràng định nghĩa Tiêu chuẩn Vàng (PCR, Cấy máu, Kháng thể huỳnh quang, Sinh thiết, Chụp mạch DSA...).
   - Rule chẩn đoán toán học (`minMajorRequired`, `minMinorRequired`, `mandatoryIds`) giúp bác sĩ kiểm tra xem ca bệnh đã đủ tiêu chuẩn xác định hay chưa.
3. **Khối Tiêu Chuẩn Phân Độ Nặng Lâm Sàng (`severityGrading`)**:
   - Phân tầng bậc thang: Độ 1 (Nhẹ/Ngoại trú), Độ 2 (Trung bình/Nội trú), Độ 3 (Nặng/Cấp cứu), Độ 4 (Nguy kịch/ICU).
   - Tự động gợi ý phân độ dựa trên sinh hiệu (DHST) và các bất thường cận lâm sàng (Hct tăng, Tiểu cầu giảm, Toan máu, SpO2 giảm).
4. **Hệ Thống Thang Điểm Lượng Giá Nguy Cơ Đa Tầng**:
   - Tự động tính toán điểm cảnh báo sớm: **NEWS2** (Người lớn nội khoa), **PEWS** (Nhi khoa), **ESI v4** (Phân loại cấp cứu 5 cấp), **CURB-65** (Viêm phổi), **Killip** (Nhồi máu cơ tim), **Glasgow** (Hôn mê).

---

## 👥 2. Cơ Cấu Đội Ngũ 4 Phân Vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🎯 S3-LEAD: CDSS SQUAD LEAD        │
               │   (Chuyên gia Toán Y học & Thuật toán)│
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  S3-AGENT-01 │           │  S3-AGENT-02 │           │  S3-AGENT-03 │
 │ Weight Matrix│ ────────> │ Multi-score  │ ────────> │ Gold Standard│
 │  & Bayesian  │           │ Risk Triage  │           │  & Staging   │
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  S3-AGENT-04 │
                            │ CDSS Quality │
                            │ Gate Auditor │
                            └──────────────┘
```

### 1. 🎯 S3-LEAD: CDSS Engine Lead
- **Trách nhiệm**: Cân bằng xác suất chẩn đoán, bảo đảm thuật toán không thiên vị bệnh phổ biến mà bỏ sót các bệnh hiếm nguy kịch, nghiệm thu danh sách chẩn đoán phân biệt.

### 2. 🧮 S3-AGENT-01: Weight Matrix & Bayesian Deduction Engineer
- **Trách nhiệm**: Tinh chỉnh trọng số các luật suy luận `dd` trong `clinical-rules-kb.json`, bảo toàn nguyên tắc Zero-Orphan Symptoms và phối hợp hệ số nhân dịch tễ học (`EpiBoost`).

### 3. 📊 S3-AGENT-02: Multi-score Risk Triage Specialist
- **Trách nhiệm**: Xây dựng và tích hợp các bộ tính điểm nguy cơ (NEWS2, PEWS, ESI v4, CURB-65) trực tiếp từ dữ liệu sinh hiệu và xét nghiệm ban đầu.

### 4. 🏆 S3-AGENT-03: Gold Standard & Severity Staging Formulator
- **Trách nhiệm**: Chuẩn hóa nội dung bảng Tiêu chuẩn vàng và bảng Phân độ lâm sàng trong `DIAGNOSTIC_CHAIN_DATABASE`, kết nối liền mạch với Bước 4.

### 5. 🛡️ S3-AGENT-04: CDSS Quality Gate Auditor
- **Trách nhiệm**: Kiểm tra ma trận suy luận bằng công cụ kiểm định tự động (`docspace-medical-qa-gate.mjs`), bảo đảm 0 lỗi schema và 0 triệu chứng mồ côi.

---

## 🔗 3. Data Contract Đầu Ra Của Bước 3 (Gửi sang Bước 4)

```typescript
export interface CdssToProtocolContract {
  leadDiagnosis: {
    id: string;
    name: string;
    icd10: string;
    specialty: string;
    confidencePct: number;
    matchScore: number;
  };
  differentialList: Array<{
    id: string;
    name: string;
    icd10: string;
    confidencePct: number;
    exclusionReason?: string;
  }>;
  suggestedSeverityGradeIndex: number;
  severityGrade: {
    grade: string;
    severity: 'mild' | 'moderate' | 'severe' | 'critical';
    triage: string;
    criteria: string;
    targetVitals?: string;
  };
  triageClassification: 'outpatient' | 'inpatient' | 'icu';
  riskScores: {
    news2?: number;
    esiLevel?: number;
    pews?: number;
    curb65?: number;
  };
}
```
