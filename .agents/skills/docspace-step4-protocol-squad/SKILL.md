---
name: docspace-step4-protocol-squad
description: Đội ngũ AI chuyên trách Phác đồ Điều trị Toàn diện, Bảng 4 Cột Chi tiết từng ngày, 6 Đầu mục Lâm sàng chuẩn hóa, An toàn Kê đơn (DDI & eGFR), 3 Nhóm Cảnh báo ranh giới, Tư vấn Kho TV và Liên kết 18 Kho Tri thức cho Bước 4 phân hệ CliniPortal DocSpace. Kích hoạt khi cần tối ưu giao diện Bước 4, mở rộng dữ liệu phác đồ bệnh học hoặc chuẩn hóa y lệnh thuốc.
---

# 💊 DocSpace Step 4 — Treatment Protocol & Order Execution Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện **Bước 4: Phác đồ Điều trị Toàn diện & Y Lệnh Lâm sàng** (`src/content/docspace/src/components/Step3Protocol.tsx` và `components/step3/`).

---

## 🏛️ 1. Tôn Chỉ & Kiến Trúc 6 Đầu Mục Chuẩn Hóa

1. **Khung 6 Đầu Mục Lâm Sàng Bắt Buộc**:
   - `1. Phân loại (cá thể hoá)`:
     - 1a. Phân độ nặng nhẹ & thể lâm sàng.
     - 1b. Phân độ biến chứng (Complications Sentinel).
     - 1c. Các đối tượng đặc biệt (Người cao tuổi, Trẻ em, Phụ nữ mang thai & cho con bú, Suy thận eGFR, Suy gan).
   - `2. Phác đồ điều trị chi tiết (Bảng 4 cột)`:
     - **Cột 1: Phân loại** (mức độ, phân tầng).
     - **Cột 2: Giai đoạn & Mục tiêu** (mốc ngày N1-N3, tên giai đoạn, mục tiêu sinh hiệu đích).
     - **Cột 3: Phác đồ & Y lệnh** (xử trí cấp cứu, y lệnh thuốc chuẩn, BHYT, DDI, y lệnh bổ sung của BS kèm checkbox hoàn thành).
     - **Cột 4: Theo dõi** (tách bạch rõ ràng Lâm sàng LS & Cận lâm sàng CLS với chu kỳ và ngưỡng an toàn).
     - Tích hợp thanh tiến độ thực thi (`%`), nút *Hoàn thành tất cả*, *Đặt lại*, và *Sao chép EMR một chạm* chuẩn HIS.
   - `3. Lưu ý lâm sàng`:
     - **[1]** Lưu ý, cảnh báo quan trọng (Critical Safety Warnings).
     - **[2]** Chống chỉ định (CCĐ tuyệt đối & tương đối, thuốc cần tránh theo giai đoạn).
     - **[3]** Tiêu chuẩn xuất viện hoặc chuyển tuyến (Discharge & Triage criteria).
   - `4. Vấn đề người bệnh quan tâm`:
     - Tư vấn & giải thích bệnh cho người bệnh và thân nhân (kết nối Kho TV).
   - `5. Kiến thức cho nhân viên y tế`:
     - 5a. Cơ sở: Giải phẫu - Sinh lý (GPSL) & Sinh lý bệnh (SLB).
     - 5b. Lâm sàng: Dịch tễ học (DTH) - Chẩn đoán (CD) - Biến chứng (BC) - Dược lý & Tương tác thuốc (DUOC).
     - 5c. Hướng dẫn thực hành lâm sàng: EBM Guidelines từ Bộ Y tế, ESC, AHA, GOLD... kèm nút áp dụng y lệnh thuốc khuyến cáo.
   - `6. Các ca bệnh liên quan (SOAP)`:
     - Hồ sơ bệnh án thực chiến SOAP, bẫy chẩn đoán và hội chẩn thông minh NotebookLM.
2. **Triết Lý Thiết Kế Tinh Gọn**:
   - Thanh điều hướng trên cùng chỉ giữ nút quay lại và lựa chọn bệnh.
   - Thanh hiển thị tên bệnh chỉ gồm Tên bệnh, Mã ICD-10, Chuyên khoa và Nguồn phác đồ. Không dùng banner cờ đỏ hay đoạn văn tóm tắt dài dòng.

---

## 👥 2. Cơ Cấu Đội Ngũ 4 Phân Vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🎯 S4-LEAD: TREATMENT PROTOCOL LEAD│
               │   (Kiểm soát Phác đồ & An toàn Kê đơn)│
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  S4-AGENT-01 │           │  S4-AGENT-02 │           │  S4-AGENT-03 │
 │ 4-Column     │ ────────> │Pharmacotherapy│ ────────> │ Vault Linker │
 │ Matrix Eng   │           │ & DDI Safety │           │ & EBM Study  │
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  S4-AGENT-04 │
                            │ Protocol QA  │
                            │ Gate Auditor │
                            └──────────────┘
```

### 1. 🎯 S4-LEAD: Treatment Protocol & Clinical Safety Lead
- **Trách nhiệm**: Đảm bảo phác đồ tuân thủ hướng dẫn Bộ Y tế và các Hội chuyên khoa quốc tế, kiểm soát luồng điều phối Bảng 4 Cột và 6 đầu mục.

### 2. 📋 S4-AGENT-01: 4-Column Matrix & Daily Timeline Engineer
- **Trách nhiệm**: Xây dựng cấu trúc `DailyTreatmentPhase` trong `dailyTreatmentTimeline.ts`, quy hoạch phân chia 4 cột, thanh tiến độ thực thi y lệnh và chức năng sao chép EMR chuẩn HIS.

### 3. 💊 S4-AGENT-02: Pharmacotherapy, DDI & Renal Dosing Engineer
- **Trách nhiệm**: Quản lý danh mục thuốc, kiểm tra tương tác thuốc trong `SafePrescribingDdiPanel`, hiệu chỉnh liều theo chức năng thận (eGFR / Cockcroft-Gault) và danh mục BHYT.

### 4. 📚 S4-AGENT-03: Vault Linker & EBM Synthesizer
- **Trách nhiệm**: Kết nối 18 Kho tri thức (Kho GPSL, SLB, DTH, CD, BC, DUOC, TV, EBM), trích xuất khuyến cáo Landmark Trials và kết nối Sổ tay Kinh nghiệm Thực chiến SOAP.

### 5. 🛡️ S4-AGENT-04: Protocol QA Gate Auditor
- **Trách nhiệm**: Đảm bảo 0 lỗi TypeScript build (`tsc --noEmit`), kiểm tra tính toàn vẹn của Bảng 4 Cột trên màn hình di động (Responsive 375px+).

---

## 🔗 3. Data Contract Đầu Vào Của Bước 4 (Nhận từ Bước 3)

```typescript
export interface ProtocolInputContract {
  diseaseId: string;
  diseaseName: string;
  icd10: string;
  specialtyGroup: string;
  selectedGradeIdx: number;
  activeSeverityGrade?: SeverityGradingItem;
  timelinePhases: DailyTreatmentPhase[];
  activeComplications: DiseaseComplicationItem[];
  patientContext: {
    age?: string;
    gender?: string;
    creatinine?: string;
    vitals?: VitalsState;
    labs?: LabsState;
  };
}
```
