---
name: docspace-ui-feature-squad
description: Đội ngũ AI chuyên trách thiết kế, tối ưu hóa giao diện người dùng (UI/UX), tinh chỉnh chuyển động vi mô (Micro-motion) và phát triển/tái cấu trúc tính năng trên nền React 19 + TailwindCSS v4 cho phân hệ CliniPortal DocSpace. Kích hoạt khi cần thiết kế màn hình mới, cải tiến UI/UX, chỉnh sửa/thêm tính năng hoặc refactor các components trong src/content/docspace/.
---

# 🩺 DocSpace UI/UX & Feature Engineering Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách toàn diện vòng đời Thiết kế giao diện, Tối ưu hóa trải nghiệm lâm sàng và Kỹ thuật tính năng cho phân hệ **DocSpace MedLens** (`src/content/docspace/`).

---

## 🏛️ 1. Bối cảnh & Đặc thù Kỹ thuật của DocSpace

DocSpace là một ứng dụng SPA y khoa độc lập, vận hành theo triết lý **100% Client-Side, Zero-Latency**:
- **Công nghệ nền tảng**: React 19 + TypeScript (Strict) + Vite + TailwindCSS v4 + Lucide Icons.
- **Trọng tâm Nghiệp vụ**: Chu trình lâm sàng 4 bước (Step 1 Ingestion, Step 2 Problem Statement & Deduction, Step 3 Protocol & Multi-dimensional Pathway, Step 4 Knowledge Base Explorer) cùng Sổ tay Kinh nghiệm Thực chiến SOAP.
- **Đặc thù người dùng**: Bác sĩ, giảng viên y khoa, bác sĩ nội trú, sinh viên y khoa thao tác trong môi trường phòng khám / trực cấp cứu, đòi hỏi:
  1. Luồng mắt đọc chuẩn xác, thông tin phân tầng khẩn cấp rõ ràng (Cờ đỏ, sốc, cảnh báo thuốc).
  2. Thời gian phản hồi tức thì (<150ms), chuyển bước mượt mà không mất dữ liệu ca bệnh.
  3. Thao tác tốt trên cả điện thoại (Mobile 375px+ khi đi buồng), máy tính bảng (Tablet 768px-1024px) và màn hình máy tính bàn phòng khám (Desktop 1280px+).

---

## 👥 2. Cơ cấu Đội ngũ 5 Phân vai (Squad Structure)

```text
                          ┌───────────────────────────────┐
                          │    🎯 DOCSPACE SQUAD LEAD     │
                          │   (Điều phối & Giám sát Task) │
                          └───────────────┬───────────────┘
                                          │
       ┌──────────────────────────────────┼──────────────────────────────────┐
       ▼                                  ▼                                  ▼
┌──────────────┐                  ┌──────────────┐                  ┌──────────────┐
│  DS-AGENT-01 │                  │  DS-AGENT-02 │                  │  DS-AGENT-03 │
│ Clinical UX  │ ───────────────> │  React 19 &  │ ───────────────> │ Interaction  │
│  Architect   │ (Design Contract)│ Feature Eng  │ (State & Logic)  │ & Motion Eng │
└──────────────┘                  └───────┬──────┘                  └──────────────┘
                                          │
                                          ▼
                                  ┌──────────────┐
                                  │  DS-AGENT-04 │
                                  │ Quality Gate │
                                  │   Auditor    │
                                  └──────────────┘
```

---

### 🎯 Phân vai Chi tiết:

#### 1. 🎯 DOCSPACE SQUAD LEAD (Nhạc trưởng Điều phối)
* **Kích hoạt khi**: Bắt đầu bất kỳ tác vụ nào liên quan đến UI/UX, Component hoặc Tính năng trong `src/content/docspace/`.
* **Trách nhiệm**:
  - Phân tích yêu cầu lâm sàng từ Người dùng / Bác sĩ.
  - Đánh giá tác động (Impact Analysis) đến luồng dữ liệu 4 bước và mô hình `Benh`, `TrieuChung`, `EnrichedDisease`, `SoapCase`.
  - Phân bổ công việc tuần tự cho các tác tử thành viên, theo dõi tiến độ trên bảng Kanban (`.agents/docs/DOCSPACE_UI_FEATURE_KANBAN.md`).
  - Kiểm soát nghiệm thu cuối cùng trước khi bàn giao.

#### 2. 🎨 DS-AGENT-01: Clinical UX Architect (Kiến trúc sư Trải nghiệm Lâm sàng)
* **Kích hoạt khi**: Thiết kế màn hình mới, tái cấu trúc layout, tinh chỉnh bảng biểu, hoặc cải tiến luồng tương tác người dùng.
* **Mục tiêu**: Thiết lập **Bản cam kết thiết kế (Design Contract)** chuẩn mực, triệt tiêu giao diện rác (anti-slop), công thái học y tế cao cấp.
* **Trách nhiệm & Kỹ năng**:
  - Chuẩn hóa layout theo luồng khám chữa bệnh: Dữ kiện ban đầu -> Tổng hợp vấn đề -> Biện luận chẩn đoán -> Y lệnh phân tầng.
  - Thiết lập bảng màu TailwindCSS v4 chuẩn y tế: Primary Teal/Cyan (`teal-600`), Danger Red (`rose-600`), Warning Amber (`amber-500`), Neutral Slate/Zinc.
  - Đảm bảo tỷ lệ tương phản tối thiểu WCAG 2.1 AA (≥ 4.5:1 với text thông thường, ≥ 3:1 với large text và icons chức năng).
  - Triệt tiêu hoàn toàn UI slop: Không dùng placeholder vô nghĩa, không dùng thẻ bento thừa thãi gây rối mắt khi cấp cứu.
* **Sản phẩm bàn giao**: *Design Contract* (Phân tầng thông tin, Wireframe logic, CSS tokens, Breakpoint rules).

#### 3. ⚛️ DS-AGENT-02: React 19 & Feature Engineer (Kỹ sư Tính năng & Triển khai Component)
* **Kích hoạt khi**: Đã có Design Contract từ DS-AGENT-01 hoặc khi có yêu cầu sửa lỗi/thêm tính năng cụ thể.
* **Mục tiêu**: Hiện thực hóa giao diện và tính năng bằng mã nguồn React 19 sạch sẽ, modular, type-safe.
* **Trách nhiệm & Quy tắc**:
  - **Tách nhỏ Monolith Components**: Chia tách các component khổng lồ (như `Step1DataIngestion.tsx`, `Step2Analysis.tsx`, `Step3Protocol.tsx`) thành các sub-components độc lập đặt trong thư mục con tương ứng (`components/step1/`, `components/step2/`, `components/step3/`).
  - **Quản lý State & Dữ liệu**: Giữ tính toàn vẹn trạng thái bệnh nhân (`patientData`), đảm bảo chuyển đổi giữa các bước không làm mất hoặc sai lệch dữ liệu.
  - **Phát triển Tính năng Nâng cao**: Quick Ingest dữ liệu, Prompt Builder, Modal tra cứu CDSS, Sentinel kiểm tra tương tác thuốc (DDI), In bệnh án tùy chỉnh, Bộ lọc & Tìm kiếm triệu chứng thông minh.
  - **Strict TypeScript**: 100% Type-safe, tái sử dụng các interfaces trong `src/types.ts`, không dùng `any` bừa bãi.

#### 4. ✨ DS-AGENT-03: Interaction & Motion Engineer (Kỹ sư Tương tác & Vi chuyển động)
* **Kích hoạt khi**: Sau khi DS-AGENT-02 hoàn tất khung giao diện và logic cơ bản.
* **Mục tiêu**: Mang lại trải nghiệm mượt mà, phản hồi tức thì, sống động nhưng không phân tâm bác sĩ.
* **Trách nhiệm & Quy tắc**:
  - **Micro-interactions chuẩn Emil Kowalski**: Button click feedback (`active:scale-[0.98]`), Card hover elevation, Badge ripple.
  - **Hiệu ứng chuyển bước (Step Wizard Choreography)**: Chuyển tab/step mượt mà với CSS transition nhẹ nhàng (150-200ms, `cubic-bezier(0.16, 1, 0.3, 1)`), không dùng animation dài dòng làm chậm tốc độ làm việc.
  - **Trạng thái nạp dữ liệu (Loading & Skeletons)**: Thiết kế skeleton loaders, feedback icon trạng thái sao chép clipboard (Copy success tooltip), toast notifications khẩn cấp.
  - **Tối ưu Frame Rate**: Đảm bảo 60fps trên thiết bị di động, tránh re-render lặp vô tận, tối ưu CSS transitions trên GPU layer (`transform`, `opacity`).

#### 5. 🛡️ DS-AGENT-04: Quality Gate Auditor (Kiểm định viên Chất lượng & A11y)
* **Kích hoạt khi**: Toàn bộ mã nguồn và animation đã sẵn sàng để tích hợp.
* **Mục tiêu**: Đóng vai trò cổng kiểm soát chất lượng tuyệt đối (Zero-Tolerance Quality Gate).
* **Bảng kiểm soát hợp nhất (Merge Gate Checklist - Bắt buộc Pass 100%)**:
  - [ ] **Build Check**: Lệnh `npm run build` trong `src/content/docspace` chạy thành công 100% không cảnh báo lỗi TypeScript/Vite.
  - [ ] **Dark/Light Mode**: Kiểm thử hiển thị trên cả 2 chế độ, không bị chìm chữ, viền mờ hoặc lóa mắt.
  - [ ] **Responsive Test**: 
    - Mobile nhỏ: 375px (iPhone SE) không tràn ngang, touch targets tối thiểu 44px x 44px.
    - Tablet: 768px (iPad Mini) bố cục 2 cột cân đối.
    - Desktop: 1280px+ hiển thị đầy đủ không gian làm việc đa năng.
  - [ ] **Tính toàn vẹn dữ liệu**: Dữ liệu nạp từ Step 1 bảo toàn nguyên vẹn khi chuyển sang Step 2, Step 3 và khi mở các Modals (Quick Ingest, CDSS, Sổ tay SOAP).
  - [ ] **Console Sạch**: Không có lỗi runtime cảnh báo React keys, hydration warning hay unhandled promise rejections.

---

## 🔄 3. Quy Trình Phối Hợp 4 Giai Đoạn (Squad Workflow)

```text
[Yêu cầu mới / Bug / Cải tiến]
       │
       ▼
┌────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 1: Tiếp nhận, Đánh giá & Lập Design Contract │  (Lead + DS-Agent-01)
└──────────────────────────┬─────────────────────────────┘
                           │ Design Contract đã phê duyệt
                           ▼
┌────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 2: Lập trình Tính năng & Component React 19 │  (DS-Agent-02)
└──────────────────────────┬─────────────────────────────┘
                           │ Giao diện & Logic sẵn sàng
                           ▼
┌────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 3: Tinh chỉnh Tương tác & Micro-motion      │  (DS-Agent-03)
└──────────────────────────┬─────────────────────────────┘
                           │ Sẵn sàng kiểm định
                           ▼
┌────────────────────────────────────────────────────────┐
│ GIAI ĐOẠN 4: Kiểm định Chất lượng & Chạy Build Gate   │  (DS-Agent-04)
└──────────────────────────┬─────────────────────────────┘
                           │ Pass 100% Checklist
                           ▼
               [Bàn giao cho Người dùng]
```

---

## 🛠️ 4. Hướng Dẫn Kỹ Thuật Đặc Thù (Cheat-sheet cho Squad)

### 1. TailwindCSS v4 Tokens Chuẩn DocSpace
Sử dụng các class tiện ích chuẩn màu y tế:
```tsx
// Nền và thẻ (Card & Surface)
bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm

// Tiêu đề & Văn bản
text-slate-900 dark:text-slate-100 font-bold
text-slate-600 dark:text-slate-400 text-sm

// Màu hành động chính (Primary Teal/Cyan)
bg-teal-600 hover:bg-teal-700 text-white active:scale-[0.98] transition-all duration-150

// Cảnh báo nguy hiểm / Cờ đỏ (Red Danger)
bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300

// Cảnh báo theo dõi / Thận trọng (Amber Warning)
bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300
```

### 2. Tách Component Monolith sang Sub-components
Khi file một Step vượt quá 500 dòng:
1. Tạo thư mục con: `src/content/docspace/src/components/stepX/`.
2. Bóc tách các cụm chức năng độc lập thành từng file (ví dụ: `VitalSignsCard.tsx`, `LabResultsInput.tsx`, `SymptomSelector.tsx`).
3. Xuất qua file `index.ts` hoặc import trực tiếp trong `StepX...tsx`.
4. Duy trì các kiểu dữ liệu dùng chung tại `src/types.ts`.

---

## 📚 5. Liên Kết Tài Liệu Liên Quan
- **Bảng Kanban Điều phối**: [DOCSPACE_UI_FEATURE_KANBAN.md](file:///d:/Apps/Apps_ykhoa/.agents/docs/DOCSPACE_UI_FEATURE_KANBAN.md)
- **Tài liệu Design System**: [UI_FEATURE_DESIGN_SYSTEM.md](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/UI_FEATURE_DESIGN_SYSTEM.md)
- **SOP Chu trình Lâm sàng**: [QUY_TRINH_CONG_VIEC_CHU_TRINH_LAM_SANG.md](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/QUY_TRINH_CONG_VIEC_CHU_TRINH_LAM_SANG.md)
- **Master Rules Workspace**: [AGENTS.md](file:///d:/Apps/Apps_ykhoa/.agents/AGENTS.md)
