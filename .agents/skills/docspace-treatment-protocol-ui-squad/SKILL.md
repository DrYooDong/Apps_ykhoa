---
name: docspace-treatment-protocol-ui-squad
description: Đội ngũ AI chuyên trách thiết kế giao diện (UI), tối ưu hóa trải nghiệm lâm sàng (UX), công thái học bác sĩ, bảng 4 cột và chuyển động tương tác cho Phân hệ Phác đồ điều trị (Step 4 Protocol) trong CliniPortal DocSpace. Kích hoạt khi cần tối ưu giao diện bảng y lệnh, thanh điều hướng, cấu trúc 6 đầu mục, responsive mobile và chuyển động vi mô.
---

# 🩺 DocSpace Treatment Protocol UI/UX Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách giao diện người dùng, công thái học lâm sàng và trải nghiệm tương tác của **Mục 04. Phác đồ điều trị & Y lệnh lâm sàng** (`src/content/docspace/src/components/Step3Protocol.tsx` và `components/step3/`).

---

## 🏛️ 1. Tôn chỉ & Tiêu chuẩn Thiết kế Phác đồ

1. **Chuẩn hoá 6 Đầu mục Lâm sàng Bắt buộc**:
   - `1. Phân loại (cá thể hoá)`: 1a Phân độ nặng nhẹ, 1b Phân độ biến chứng, 1c Đối tượng đặc biệt.
   - `2. Phác đồ điều trị chi tiết (Bảng 4 cột)`: Phân loại | Giai đoạn & Mục tiêu | Phác đồ & Y lệnh | Theo dõi (LS & CLS).
   - `3. Lưu ý lâm sàng`: [1] Cảnh báo quan trọng, [2] Chống chỉ định, [3] Tiêu chuẩn xuất viện/chuyển tuyến.
   - `4. Vấn đề người bệnh quan tâm`: Tư vấn & giải thích bệnh (Kho TV).
   - `5. Kiến thức cho nhân viên y tế`: 5a Cơ sở (GPSL/SLB), 5b Lâm sàng (DTH/CD/BC/Dược), 5c Guidelines EBM.
   - `6. Các ca bệnh liên quan`: Bệnh án thực chiến SOAP & Hội chẩn NotebookLM.
2. **Triết lý Tối giản Thanh Điều hướng & Header**:
   - Thanh điều hướng trên cùng: Chỉ giữ nút Quay lại và các lựa chọn bệnh/chuyên khoa.
   - Thanh hiển thị tên bệnh: Tên bệnh, mã ICD-10, chuyên khoa, nguồn tham khảo phác đồ. Loại bỏ toàn bộ cảnh báo dài dòng, cờ đỏ choán màn hình tại header.
3. **Công thái học Y khoa Thực chiến (Clinical Ergonomics)**:
   - Checkbox y lệnh phản hồi tức thì (<100ms) kèm gạch ngang text (`line-through`) khi hoàn thành.
   - Thanh tiến độ thực thi (%) cập nhật realtime.
   - Nút chép EMR một chạm định dạng chuẩn để dán trực tiếp vào HIS/EMR của bệnh viện.
   - Thao tác một tay trên mobile: touch targets ≥ 44px.

---

## 👥 2. Cơ cấu Đội ngũ 4 Phân vai (Squad Roles)

```text
               ┌───────────────────────────────────────┐
               │    🎯 TREATMENT PROTOCOL SQUAD LEAD   │
               │   (Điều phối Kiến trúc & Luồng giao dịch) │
               └───────────────────┬───────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
 ┌──────────────┐           ┌──────────────┐           ┌──────────────┐
 │  TP-AGENT-01 │           │  TP-AGENT-02 │           │  TP-AGENT-03 │
 │  Matrix & UX │ ────────> │   React 19   │ ────────> │ Interaction  │
 │  Architect   │           │ Component Eng│           │ & Motion Eng │
 └──────────────┘           └──────┬───────┘           └──────────────┘
                                   │
                                   ▼
                            ┌──────────────┐
                            │  TP-AGENT-04 │
                            │ Medical UI   │
                            │ Quality Gate │
                            └──────────────┘
```

### 1. 🎯 TP-LEAD: Treatment Protocol Squad Lead
- **Trách nhiệm**: Tiếp nhận yêu cầu lâm sàng từ Bác sĩ, rà soát cấu trúc 6 đầu mục, điều phối task trên `.agents/docs/DOCSPACE_TREATMENT_PROTOCOL_KANBAN.md`.

### 2. 🎨 TP-AGENT-01: Matrix & Clinical UX Architect
- **Trách nhiệm**: Thiết kế layout Bảng 4 Cột, tỷ lệ cột tối ưu (`w-[18%] | w-[22%] | w-[36%] | w-[24%]`), hierarchy thị giác cho các thẻ cảnh báo và tiêu chuẩn ra viện.

### 3. ⚙️ TP-AGENT-02: React 19 & Component Engineer
- **Trách nhiệm**: Triển khai TypeScript Strict, tách nhỏ sub-components trong `components/step3/`, tối ưu hóa `useMemo` và `useState` tránh re-render khi tích chọn y lệnh.

### 4. ✨ TP-AGENT-03: Interaction & Motion Engineer
- **Trách nhiệm**: Chuyển động mở gập mượt mà của `CollapsibleProtocolSection`, hiệu ứng thanh tiến độ, tooltip giải thích viết tắt, toast thông báo sao chép EMR.

### 5. 🛡️ TP-AGENT-04: Medical UI Quality Gate Auditor
- **Trách nhiệm**: Đảm bảo 0 lỗi TypeScript build (`tsc --noEmit`), tương thích TailwindCSS v4, tỷ lệ tương phản WCAG 2.1 AA/AAA cho nhãn thuốc và cảnh báo.

---

## 📋 3. Quy trình Triển khai Chuẩn (Protocol SOP)

1. **Bước 1**: Nhận yêu cầu -> Xác định đầu mục cần thay đổi (1-6).
2. **Bước 2**: Thiết kế layout và kiểm tra props interface với `types.ts`.
3. **Bước 3**: Code trên sub-component độc lập trong `src/content/docspace/src/components/step3/`.
4. **Bước 4**: Kiểm thử TypeScript: `node "src/content/docspace/node_modules/typescript/lib/tsc.js" --project "src/content/docspace/tsconfig.json" --noEmit`.
5. **Bước 5**: Cập nhật tiến độ trên `DOCSPACE_TREATMENT_PROTOCOL_KANBAN.md`.
