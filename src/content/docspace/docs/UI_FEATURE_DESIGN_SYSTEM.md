# 🎨 DocSpace MedLens — UI/UX & Feature Design System

> **Tài liệu Hướng dẫn Tiêu chuẩn Giao diện & Kỹ thuật Tính năng (Design System & Engineering Guidelines)**
> Dành riêng cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🧭 1. Triết Lý Thiết Kế Lâm Sàng (Clinical UX Philosophy)

Giao diện DocSpace phục vụ trực tiếp công tác chẩn đoán, biện luận và học tập lâm sàng trong bối cảnh áp lực thời gian cao:
1. **Phân cấp Nhận thức Khẩn cấp (Cognitive Priority)**:
   - *Cờ đỏ (Red Flags) & Dấu hiệu Sinh tồn bất thường* luôn được hiển thị ở vị trí dễ quan sát nhất với màu tương phản cao (`rose-600` / `red-500`).
   - *Dấu hiệu định hướng & Gợi ý chẩn đoán* dùng màu cảnh báo (`amber-500` / `yellow-500`).
   - *Thông tin nền & Kiến thức tham khảo* dùng tone trung tính (`slate-600` / `slate-400`).
2. **Triệt tiêu Giao diện Rác (Anti-UI-Slop)**:
   - Không đưa vào các thành phần trang trí vô nghĩa làm rối mắt bác sĩ.
   - Mỗi card, badge hay modal đều phải có mục đích lâm sàng cụ thể.
   - Text nhãn phải ngắn gọn, chuẩn thuật ngữ y khoa Việt Nam và quốc tế (ví dụ: *qSOFA*, *CURB-65*, *DTH*, *SOAP*).
3. **Phản Hồi Tức Thì (Zero-Latency & Micro-feedback)**:
   - Mọi thao tác chọn triệu chứng, nhập cận lâm sàng hay bấm nút phân tích đều có phản hồi thị giác trong vòng 100-150ms.
   - Tuyệt đối không để ứng dụng bị đông cứng hay giật khựng (Zero jank).

---

## 🎨 2. Hệ Thống Design Tokens (TailwindCSS v4)

DocSpace sử dụng **TailwindCSS v4**. Các bảng màu và quy chuẩn lớp được chuẩn hóa như sau:

### 2.1. Bảng Màu Lâm Sàng (Clinical Palette)

| Vai trò | Tailwind Classes (Light / Dark) | Ứng dụng cụ thể |
|---|---|---|
| **Primary (Chủ đạo)** | `teal-600` / `teal-500` | Nút hành động chính, tab đang chọn, tiến trình active |
| **Secondary (Thứ cấp)** | `cyan-600` / `cyan-400` | Nút phụ, link tra cứu EBM, chỉ số bình thường |
| **Critical / Danger** | `rose-600` / `rose-400` | Cờ đỏ cấp cứu, sinh hiệu báo động, chống chỉ định thuốc |
| **Warning / Alert** | `amber-500` / `amber-400` | Cảnh báo tương tác thuốc DDI, triệu chứng cần theo dõi |
| **Success** | `emerald-600` / `emerald-400` | Hoàn thành bước, lưu thành công, thuốc an toàn |
| **Surface / Card** | `bg-white dark:bg-slate-900` | Nền các thẻ bài, bảng form, panel |
| **Background (Trang)** | `bg-slate-50 dark:bg-slate-950` | Nền tổng thể của ứng dụng |
| **Borders** | `border-slate-200 dark:border-slate-800` | Đường kẻ phân tách các khu vực |

### 2.2. Typography & Nhịp Điệu Font

- **Hệ font**: Sans-serif hệ thống hiện đại (`Inter`, system-ui).
- **Cỡ chữ theo cấp bậc**:
  - `text-2xl font-bold`: Tiêu đề màn hình chính, tên ca bệnh lớn.
  - `text-lg font-semibold`: Tiêu đề card phân khu (Sinh hiệu, Tiền sử, Biện luận).
  - `text-sm font-medium`: Nhãn form nhập liệu, tên triệu chứng, tên thuốc.
  - `text-xs text-slate-500 dark:text-slate-400`: Đơn vị đo (mmHg, g/dL), timestamp, số thứ tự.

### 2.3. Radius & Khoảng Cách (Spacing)

- Bo góc thẻ chuẩn: `rounded-xl` (12px) hoặc `rounded-2xl` (16px) cho Modal lớn.
- Bo góc nút bấm & badge: `rounded-lg` (8px) hoặc `rounded-full` (chips).
- Padding chuẩn cho Card: `p-4 sm:p-6`.
- Gap giữa các phần tử: `gap-3 sm:gap-4`.

---

## 📱 3. Quy Chuẩn Responsive & Di Động (Mobile-First)

1. **Breakpoints Mục Tiêu**:
   - `sm`: 640px (Điện thoại lớn xoay ngang)
   - `md`: 768px (Tablet dọc - iPad)
   - `lg`: 1024px (Tablet ngang, Laptop nhỏ)
   - `xl`: 1280px (Màn hình Desktop phòng khám)
2. **Quy tắc Kích thước Vùng chạm (Touch Target)**:
   - Mọi nút bấm, checkbox triệu chứng hoặc icon click được trên di động phải có kích thước tối thiểu **44px x 44px** (hoặc `p-2.5` kèm padding mở rộng).
3. **Tránh Tràn Ngang (No Overflow-X)**:
   - Sử dụng `overflow-x-auto` cục bộ cho các bảng số liệu lớn (như Bảng y lệnh thuốc, Bảng đối sánh cận lâm sàng), không để toàn bộ body bị cuộn ngang.

---

## ⚛️ 4. Quy Chuẩn Kỹ Thuật React 19 & Component Architecture

### 4.1. Nguyên Tắc Phân Rã Monolith (Sub-component Splitting)
Để tránh các file lớn (như Step 1, 2, 3), các components phải được chia tách theo cấu trúc:
```text
src/content/docspace/src/components/
├── step1/
│   ├── AdministrativePanel.tsx      # Nhập hành chính & lý do vào viện
│   ├── EpidemiologyTriangle.tsx     # Tam giác dịch tễ học
│   ├── VitalSignsGrid.tsx           # Bảng nhập sinh hiệu
│   ├── LabResultsSection.tsx        # Cận lâm sàng động
│   └── SymptomSelectionGrid.tsx     # Chọn lọc triệu chứng
├── step2/
│   ├── ProblemStatementCard.tsx     # Tóm tắt bệnh án & Đặt vấn đề
│   ├── DeductionMatrix.tsx          # Ma trận suy luận % chẩn đoán
│   └── ClinicalRiskScores.tsx       # Tính điểm qSOFA, CURB-65...
├── step3/
│   ├── TriageProtocolView.tsx       # Phân tầng 3 tuyến (Cơ sở/Huyện/Tỉnh)
│   ├── PrescriptionOrderTable.tsx   # Bảng y lệnh thuốc cá thể hóa
│   └── EbmPathwayAccordion.tsx      # Chuỗi bệnh học đa chiều 6 khía cạnh
```

### 4.2. Quản Lý State & Tính Toàn Vẹn Dữ Liệu
- Trạng thái chính (`patientData`) được lưu ở cấp `App.tsx` và truyền xuống các Steps qua props hoặc context.
- Đảm bảo các hàm cập nhật state sử dụng functional updates bất biến:
  ```typescript
  setPatientData(prev => ({
    ...prev,
    trieuChungChon: [...prev.trieuChungChon, newId]
  }));
  ```
- Không bao giờ làm mất dữ liệu khi người dùng chuyển tab giữa Bước 1, 2, 3, 4 hoặc mở Modals.

---

## 🛡️ 5. Bảng Kiểm Tra Trước Khi Bàn Giao (Checklist)

Mọi thay đổi giao diện hoặc tính năng phải được **DS-AGENT-04** kiểm tra trước khi hoàn tất:
- [ ] Chạy `npm run build` không xuất hiện lỗi hoặc cảnh báo TypeScript.
- [ ] Giao diện hiển thị rõ ràng trên cả Light Mode và Dark Mode.
- [ ] Không có text bị che khuất hoặc tràn viền trên màn hình 375px.
- [ ] Các nút bấm, icon có trạng thái hover, focus-visible và active.
- [ ] Dữ liệu được nạp vào Step 1 phản ánh chính xác sang Step 2 và Step 3.
