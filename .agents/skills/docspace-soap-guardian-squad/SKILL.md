---
name: docspace-soap-guardian-squad
description: >
  Đội ngũ AI chuyên trách quản trị, bảo trì, kiểm định dữ liệu và tối ưu hóa giao diện cho phân hệ Sổ tay Kinh nghiệm Thực chiến SOAP (DocSpace MedLens).
  Kích hoạt khi AI cần: sửa lỗi hiển thị/thiếu ca bệnh SOAP, khắc phục lỗi layout mobile/tablet, kiểm tra đồng bộ danh mục catalog (Catalog Drift),
  chuẩn hóa Frontmatter YAML ca bệnh, hoặc chạy kiểm định chất lượng phân hệ Sổ tay SOAP.
---

# 🩺 DocSpace SOAP Guardian Squad

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách giám sát toàn diện vòng đời dữ liệu, tính toàn vẹn danh mục và trải nghiệm giao diện người dùng cho phân hệ **Sổ tay Kinh nghiệm Thực chiến SOAP** (`src/content/docspace/src/components/soap/` & `data/ba/`).

---

## 🏛️ 1. Bối Cảnh & Kiến Trúc Phân Hệ SOAP

Phân hệ Sổ tay SOAP vận hành dựa trên cơ chế nạp dữ liệu phi tập trung:
- **Dữ liệu nguồn**: Các hồ sơ bệnh án Markdown chuẩn S-O-A-P đặt tại `src/content/docspace/data/ba/*.md`.
- **Cơ sở dữ liệu Danh mục (Catalogs)**:
  - `src/content/docspace/src/data/vault-catalog-thuc-hanh.json`: Danh mục ca thực hành phục vụ lọc chuyên khoa, mức độ khó, tìm kiếm nhanh.
  - `src/content/docspace/src/data/vault-catalog.json`: Master Catalog cho toàn bộ Knowledge Vault.
- **Giao diện người dùng (React 19 + Tailwind v4)**:
  - `SoapExperienceBoard.tsx`: Bảng điều khiển trung tâm, bộ lọc đa chiều (Chuyên khoa, Mức độ khó, Thẻ nhãn, Tìm kiếm).
  - `SoapDetailView.tsx`: Chế độ xem chi tiết ca bệnh (Tổng quan bệnh nhân, Sinh hiệu, 4 khối S-O-A-P, Đúc kết lâm sàng).
  - `SoapListView.tsx`: Chế độ xem danh sách phân tầng.

---

## 👥 2. Cơ Cấu Đội Ngũ 5 Phân Vai (Squad Structure)

```text
                    ┌──────────────────────────────────┐
                    │   🎯 SOAP SQUAD ORCHESTRATOR     │
                    │   (Điều phối · Phân loại Bug · Kanban) │
                    └──────────────┬───────────────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   SG-AGENT-01   │      │   SG-AGENT-02   │      │   SG-AGENT-03   │
│  Catalog Sync   │      │  Mobile Layout  │      │  Data Integrity │
│     Engineer    │      │    Specialist   │      │    Validator    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                         │                         │
         └─────────────────────────┼─────────────────────────┘
                                   ▼
                         ┌─────────────────┐
                         │   SG-AGENT-04   │
                         │  Quality Gate   │
                         │    Auditor      │
                         └─────────────────┘
```

---

## 🎯 3. Phân Nhiệm Chi Tiết Từng Agent

### 1. 🎯 SOAP SQUAD ORCHESTRATOR (Nhạc trưởng Điều phối)
- **Kích hoạt khi**: Tiếp nhận bất kỳ báo cáo lỗi nào về phân hệ SOAP, khi nạp ca bệnh mới hoặc khi refactor component SOAP.
- **Trách nhiệm**:
  1. Phân loại lỗi vào 3 nhóm cốt lõi:
     - **Nhóm A (Catalog Drift)**: Chỉ hiển thị 1 bệnh, thiếu ca mới nạp, sai số lượng.
     - **Nhóm B (Mobile / Layout)**: Vỡ khung, tràn ngang, tiêu đề co rúm, sticky bar che nội dung.
     - **Nhóm C (Data Integrity)**: Sai ID, thiếu trường Frontmatter, lỗi HTML entities, hỏng khối SOAP.
  2. Tra cứu lịch sử lỗi tại `.agents/learnings/2026-10-soap-squad-lessons.md`.
  3. Chỉ định chính xác Agent đảm trách, ngăn ngừa 2 Agent sửa cùng 1 file gây xung đột mã nguồn.
  4. Cập nhật bảng Kanban tại `.agents/docs/DOCSPACE_SOAP_SQUAD_KANBAN.md`.

---

### 2. 🗂️ SG-AGENT-01: Catalog Sync Engineer (Kỹ sư Đồng bộ Danh mục)
- **Kích hoạt khi**: Danh sách ca bệnh hiển thị không đủ số lượng ca có trong thư mục `data/ba/`.
- **Phạm vi file**:
  - `src/content/docspace/data/ba/*.md`
  - `src/content/docspace/src/data/vault-catalog-thuc-hanh.json`
  - `src/content/docspace/src/data/vault-catalog.json`
  - `tools/scripts/ingest-notebooklm-case.mjs`
  - `tools/scripts/validate-soap-catalog.mjs`
- **Checklist thực thi**:
  1. Chạy lệnh kiểm tra tính đồng bộ:
     ```bash
     node tools/scripts/validate-soap-catalog.mjs
     ```
  2. Nếu phát hiện thiếu ca hoặc trôi dạt dữ liệu, chạy đồng bộ toàn bộ:
     ```bash
     node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba
     ```
  3. Kiểm tra tính trùng khớp `id` trong catalog với `caseId` trong Frontmatter Markdown.

---

### 3. 📱 SG-AGENT-02: Mobile Layout Specialist (Chuyên gia Bố cục Di động)
- **Kích hoạt khi**: Có phản hồi về lỗi hiển thị trên điện thoại (viewport ≤ 390px) hoặc máy tính bảng.
- **Phạm vi file**:
  - `src/content/docspace/src/components/SoapExperienceBoard.tsx`
  - `src/content/docspace/src/components/soap/SoapDetailView.tsx`
  - `src/content/docspace/src/components/soap/SoapListView.tsx`
  - `src/content/docspace/src/components/soap/CaseAnatomyView.tsx`
- **Bộ Quy Chuẩn CSS Tailwind v4 cho SOAP**:
  - **Header Card**:
    ```tsx
    // Bắt buộc flex-col trên mobile, flex-row trên md:
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="w-full md:flex-1 min-w-0">
        <h1 className="text-lg sm:text-2xl font-bold break-words">...</h1>
      </div>
      <div className="w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
        ...
      </div>
    </div>
    ```
  - **Vitals Bar**: Hiển thị lưới `grid grid-cols-3 sm:grid-cols-6 gap-2` để không tràn màn hình.
  - **Sticky Tab Bar**: Đặt `relative md:sticky md:top-2` để tránh che khuất nội dung khi cuộn trên màn hình nhỏ.
  - **Nút bấm**: Touch target tối thiểu `44px x 44px`.

---

### 4. 🔬 SG-AGENT-03: Data Integrity Validator (Kiểm định viên Toàn vẹn Dữ liệu)
- **Kích hoạt khi**: Nạp ca mới từ NotebookLM hoặc chuẩn hóa các ca bệnh hiện hữu.
- **Phạm vi kiểm tra**:
  - Cấu trúc Frontmatter YAML: `caseId`, `title`, `specialty`, `experienceLevel`, `difficultyRating`, `icd10`, `demographicContext`.
  - Khử triệt để 100% HTML entities (`&gt;`, `&lt;`, `&amp;`, `&quot;`).
  - Đảm bảo đầy đủ 4 khối thân bài: `## 1. S —`, `## 2. O —`, `## 3. A —`, `## 4. P —`.
  - Đảm bảo 4 bài học đúc kết lâm sàng (`historyPearls`, `objectivePitfalls`, `diagnosticPearls`, `takeawayLessons`).

---

### 5. 🛡️ SG-AGENT-04: Quality Gate Auditor (Kiểm định viên Cổng Chất lượng)
- **Kích hoạt trước khi hoàn tất bất kỳ task nào**:
- **Bảng kiểm tra bắt buộc (Merge Gate Checklist)**:
  1. [ ] Số lượng file `.md` trong `data/ba/` khớp 100% với số entry `khoCode="BA"` trong catalog.
  2. [ ] Lệnh `node tools/scripts/validate-soap-catalog.mjs` trả về 0 lỗi.
  3. [ ] Không có ký tự HTML entities thô trong tiêu đề và nội dung ca.
  4. [ ] Giao diện co giãn chuẩn tại 375px (iPhone SE/Mini) không sinh thanh cuộn ngang (horizontal scroll).
  5. [ ] Bộ lọc chuyên khoa và thanh chuyển đổi tab Mobile/Desktop hoạt động trơn tru.

---

## 🛠️ 4. Bộ Công Cụ & Scripts Vận Hành

| Tác vụ | Lệnh CLI |
|---|---|
| Kiểm tra toàn vẹn danh mục | `node tools/scripts/validate-soap-catalog.mjs` |
| Đồng bộ tất cả ca bệnh | `node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba` |
| Đồng bộ 1 ca duy nhất | `node tools/scripts/ingest-notebooklm-case.mjs src/content/docspace/data/ba/<file>.md` |
| Kiểm tra QA Gate lâm sàng | `node tools/qa/docspace-medical-qa-gate.mjs` |
| Linter dữ liệu lâm sàng | `node tools/qa/docspace-clinical-data-linter.mjs` |
