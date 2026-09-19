---
name: docspace-step1-ingestion-squad
description: Đội ngũ AI chuyên trách Tiếp nhận Dữ liệu Bệnh nhân, Ca mẫu Lâm sàng, Trích xuất Triệu chứng (Cơ năng - Thực thể - Tiền căn - CLS), Đo lường Sinh hiệu cốt lõi và Bối cảnh Dịch tễ học cho Bước 1 phân hệ CliniPortal DocSpace. Kích hoạt khi cần tối ưu giao diện Bước 1, phát triển tính năng nạp ca bệnh, chuẩn hóa bộ lọc triệu chứng hoặc bổ sung ca lâm sàng mẫu.
---

# 🤖 DocSpace Step 1 — Clinical Ingestion & Case Acquisition Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện **Bước 1: Tiếp nhận Dữ liệu Bệnh nhân & Khai thác Lâm sàng** (`src/content/docspace/src/components/Step1DataIngestion.tsx` và `components/step1/`).

---

## 🏛️ 1. Tôn Chỉ & Nhiệm Vụ Cốt Lõi

1. **Chuẩn hóa Nhập liệu Lâm sàng 4 Chiều (Raw Clinical State)**:
   - Cơ năng (`cn`): Triệu chứng do người bệnh than phiền theo diễn tiến thời gian (PQRST).
   - Thực thể (`tt`): Dấu hiệu khám thực thể trọng tâm theo từng cơ quan/hệ thống.
   - Tiền căn (`tc`): Tiền sử bệnh bản thân, gia đình, dị ứng, phẫu thuật và dược sử đang dùng.
   - Cận lâm sàng (`cls`): 5 chỉ số xét nghiệm cấp cứu ban đầu (Bạch cầu, Tiểu cầu, Hematocrit, Glucose, Troponin) và chỉ số chức năng cơ quan (Creatinine, AST, ALT).
2. **Theo dõi 6 Sinh hiệu Cốt lõi (Vital Signs Guard)**:
   - Đo lường liên tục: Mạch (Pulse), Huyết áp tâm thu (SBP), Huyết áp tâm trương (DBP), Thân nhiệt (Temp), Nhịp thở (RR), SpO2, BMI.
   - Kích hoạt cảnh báo đỏ trực tiếp khi sinh hiệu chạm ngưỡng sốc, suy hô hấp hoặc rối loạn huyết động.
3. **Khai thác Bối cảnh Dịch tễ học (Epidemiological Surveillance)**:
   - Quản lý 8 chiều dữ liệu dịch tễ: Vùng lưu hành, mùa bệnh, ổ dịch địa phương, tiếp xúc nguồn lây, véc-tơ truyền bệnh, nguy cơ nghề nghiệp, nguồn nước/thực phẩm, tiền sử đi lại.
4. **Quản lý Thư viện Ca Bệnh Mẫu (Sample Cases Bar)**:
   - Duy trì danh mục ca lâm sàng mẫu EBM (`sample-clinical-cases.json`), hỗ trợ nạp ca 1-click cho bác sĩ thực hành và đào tạo sinh viên y khoa.

---

## 👥 2. Cơ Cấu Đội Ngũ 4 Phân Vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🎯 S1-LEAD: INGESTION SQUAD LEAD   │
               │   (Kiểm duyệt Tính Đầy đủ của Ca Bệnh)│
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  S1-AGENT-01 │           │  S1-AGENT-02 │           │  S1-AGENT-03 │
 │  Symptom &   │ ────────> │ Epidemiologic│ ────────> │ Sample Case  │
 │ Vital Parser │           │ Context Scout│           │   Curator    │
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  S1-AGENT-04 │
                            │ Ingestion QA │
                            │ Gate Auditor │
                            └──────────────┘
```

### 1. 🎯 S1-LEAD: Clinical Ingestion Lead
- **Trách nhiệm**: Đảm bảo luồng dữ liệu nhập liệu không bị tắc nghẽn, kiểm tra tính đầy đủ của hồ sơ bệnh án trước khi bàn giao sang Bước 2 (Tóm tắt & Đặt vấn đề).

### 2. 📝 S1-AGENT-01: Structured Symptom & Vital Parser
- **Trách nhiệm**: Bóc tách văn bản thô hoặc bệnh án giấy thành các token triệu chứng chuẩn trong từ điển (`trieuChung`). Phát hiện tự động sinh hiệu bất thường và phân loại mức độ khẩn cấp.

### 3. 🦟 S1-AGENT-02: Epidemiological Context Scout
- **Trách nhiệm**: Khai thác dữ liệu dịch tễ học, lập bản đồ véc-tơ phơi nhiễm và tạo đối tượng `EpidemiologyContext` sẵn sàng cho Tam giác Chẩn đoán ở Bước 2.

### 4. 📦 S1-AGENT-03: Sample Case Curator & Test Harness
- **Trách nhiệm**: Biên tập và đồng bộ các ca bệnh mẫu từ Google NotebookLM vào `sample-clinical-cases.json`, đảm bảo tính đa dạng của các ca lâm sàng kinh điển và ca bẫy chẩn đoán.

### 5. 🛡️ S1-AGENT-04: Ingestion QA Gate Auditor
- **Trách nhiệm**: Kiểm tra tính hợp lệ của dữ liệu đầu vào, phòng chống lỗi nhập liệu (tuổi âm, huyết áp vô lý, SpO2 > 100%), bảo vệ toàn vẹn Data Contract Bước 1.

---

## 🔗 3. Data Contract Đầu Ra Của Bước 1 (Gửi sang Bước 2)

```typescript
export interface IngestionToReasoningContract {
  patientProfile: {
    age: number;
    gender: 'nam' | 'nu';
    occupation?: string;
    chiefComplaint: string;
  };
  vitals: {
    vMach: string;
    vHATT: string;
    vHATTr: string;
    vNhiet: string;
    vTho: string;
    vSpo2: string;
    vBMI?: string;
  };
  labs: {
    lBC: string;
    lTC: string;
    lHct: string;
    lGlu: string;
    lTrop: string;
    lCre?: string;
    lAST?: string;
    lALT?: string;
  };
  rawEvidence: {
    cn: string[];
    tt: string[];
    tc: string[];
    cls: string[];
  };
  epidemiology: {
    endemicArea: string;
    seasonalContext: string;
    vectorExposure: string;
    contactHistory: string;
    outbreakAlert: string;
  };
}
```
