---
name: docspace-treatment-data-engineering-squad
description: Đội ngũ AI chuyên trách cấu trúc dữ liệu y khoa, chuẩn hóa phác đồ điều trị phân bậc, bóc tách lộ trình từng ngày (Daily Timeline), từ điển thuốc & tương tác DDI, tiêu chuẩn chuyển tuyến và liên kết 18 Kho tri thức cho Phân hệ Phác đồ điều trị CliniPortal DocSpace. Kích hoạt khi cần bổ sung phác đồ bệnh mới, chuẩn hóa bảng 4 cột dữ liệu, cập nhật thuốc hoặc mapping dữ liệu enriched.
---

# 🧬 DocSpace Treatment Data Engineering Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách cấu trúc dữ liệu phác đồ điều trị, tích hợp tri thức lâm sàng EBM, ánh xạ thuốc và đảm bảo an toàn kê đơn cho phân hệ **DocSpace MedLens**.

---

## 🏛️ 1. Mục tiêu & Phạm vi Nghiệp vụ

1. **Chuẩn hóa Dữ liệu Bảng 4 Cột (`DailyTreatmentPhase`)**:
   - `Cột 1: Phân loại`: Mức độ nhẹ/vừa/nặng/nguy kịch, tiêu chuẩn phân tầng, cơ địa đặc biệt.
   - `Cột 2: Giai đoạn & Mục tiêu`: Gom nhóm ngày (N1-N3, N4-N6...), tên giai đoạn bệnh học, mục tiêu sinh hiệu & xét nghiệm đích.
   - `Cột 3: Phác đồ & Y lệnh`: Xử trí cấp cứu, danh mục thuốc chuẩn (liều, đường dùng, chu kỳ), dịch truyền bậc thang.
   - `Cột 4: Theo dõi`: Tách bạch rõ ràng Lâm sàng (LS: sinh hiệu, tri giác, nước tiểu) và Cận lâm sàng (CLS: CTM, Hct, điện giải, khí máu, men gan, chẩn đoán hình ảnh).
2. **Quy hoạch 3 Nhóm Cảnh báo Lâm sàng (Mục 3)**:
   - `[1] Cảnh báo & Lưu ý quan trọng`: Dấu hiệu trở nặng, theo dõi đặc thù.
   - `[2] Chống chỉ định (CCĐ)`: Thuốc cấm dùng, can thiệp nguy hại theo từng giai đoạn.
   - `[3] Tiêu chuẩn xuất viện hoặc chuyển tuyến`: Ngưỡng an toàn cho phép ra viện hoặc mốc chuyển tầng ICU/tuyến trên.
3. **Ánh xạ 18 Kho Tri thức CliniPortal (Knowledge Vault)**:
   - 5a Cơ sở: Kết nối Kho GPSL (1.1) và Kho SLB (1.3).
   - 5b Lâm sàng: Kết nối Kho DTH (1.4), Kho CĐ (2.3), Kho BC (2.4), Kho Dược (2.2).
   - 5c Guidelines: Kết nối Kho EBM và Thư viện Landmark Trials.

---

## 👥 2. Cơ cấu Đội ngũ 4 Phân vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🔬 DATA SQUAD LEAD (MD / PharmD)   │
               │   (Kiểm soát Y học Chứng cứ & An toàn) │
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  TD-AGENT-01 │           │  TD-AGENT-02 │           │  TD-AGENT-03 │
 │  Timeline &  │ ────────> │ Pharmacotherapy│ ────────> │ Vault Linker │
 │ Staging Eng  │           │   & DDI Eng  │           │  & Guideline │
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  TD-AGENT-04 │
                            │ Medical Data │
                            │ Gate Auditor │
                            └──────────────┘
```

### 1. 🔬 TD-LEAD: Treatment Data Squad Lead
- **Trách nhiệm**: Thẩm định tính chính xác của phác đồ điều trị theo hướng dẫn Bộ Y tế và các Hội chuyên khoa quốc tế (ESC, AHA, ATS, IDSA, GOLD).

### 2. 📊 TD-AGENT-01: Timeline & Clinical Staging Engineer
- **Trách nhiệm**: Xây dựng cấu trúc `DailyTreatmentPhase` trong `src/content/docspace/src/lib/dailyTreatmentTimeline.ts`, xác lập mốc ngày can thiệp, đích sinh hiệu và chỉ tiêu theo dõi LS/CLS.

### 3. 💊 TD-AGENT-02: Pharmacotherapy & DDI Safety Engineer
- **Trách nhiệm**: Chuẩn hóa tên thuốc theo INN (tên chung quốc tế), liều dùng theo mg/kg hoặc diện tích da, kiểm tra tương tác thuốc trong `SafePrescribingDdiPanel`, hiệu chỉnh liều theo chức năng thận eGFR.

### 4. 📚 TD-AGENT-03: Vault Linker & EBM Specialist
- **Trách nhiệm**: Ánh xạ `conditionName` với 18 Kho tri thức trong `vaultBridge.ts`, chọn lọc các nghiên cứu Landmark RCT và trích xuất thuốc khuyến cáo (`extractRecommendedDrugs`).

### 5. 🩺 TD-AGENT-04: Medical Data Quality Gate Auditor
- **Trách nhiệm**: Chạy kiểm định tự động qua `node tools/qa/docspace-medical-qa-gate.mjs`, bảo toàn nguyên tắc Zero-Orphan Symptoms và tính nhất quán giữa CSDL và giao diện.
