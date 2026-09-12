# 🩺 DocSpace MedLens — Không Gian Phân Tích Lâm Sàng & Kho Tri Thức EBM
> **CliniPortal MedLens DocSpace Pro**  
> *Hệ sinh thái phân tích bệnh án lâm sàng thời gian thực, suy luận diễn dịch đa tầng, kết nối trực tiếp 2.400+ bài viết Y học chứng cứ (EBM) và Quản lý Ca bệnh từ Knowledge Vault.*

---

## 🌟 1. Tổng Quan Kiến Trúc Mới

**DocSpace MedLens Pro** được tái cấu trúc hoàn toàn trên nền tảng **React 19 + TypeScript + Vite + TailwindCSS v4**, vận hành theo triết lý **100% Client-Side, Zero-Latency & Không phụ thuộc cơ sở dữ liệu ngoài (No Supabase, No LocalStorage)**:

- **Knowledge Vault (`src/content/knowledge-vault`) là Nguồn sự thật duy nhất (Single Source of Truth)**:
  - Toàn bộ 2.400+ bài viết EBM từ 18 phân kho chuyên khoa.
  - Bộ quy tắc suy luận diễn dịch (Deduction Engine) và từ vựng triệu chứng: `knowledge-vault/data/clinical-rules-kb.json`.
  - Sổ tay kinh nghiệm lâm sàng SOAP thực chiến: `knowledge-vault/ba/` và index trong `vault-catalog.json` (`khoCode: "BA"`).
- **Phân tách giao diện rành mạch**:
  1. **🩺 Chu Trình Lâm Sàng (4 Bước Cốt Lõi Chuẩn Hóa)**:
     - **Bước 1 — Nạp dữ kiện (Data Ingestion)**: Nhập hành chính, lý do vào viện, khung Dịch tễ học (Tam giác DTH, Vector, Vùng dịch), sinh hiệu định lượng, cận lâm sàng (CBC, Hct, Men gan, Troponin...) và chọn lọc triệu chứng dương tính / phủ định loại trừ.
     - **Bước 2 — Tóm tắt & Đặt VĐ (Problem Statement & Synthesis)**: Chuẩn hóa theo phương pháp luận PGS.TS Hoàng Văn Sĩ & BSCKI Trần Thanh Tuấn, đánh giá hội tụ Tam giác chẩn đoán truyền nhiễm, tự động sinh đoạn tóm tắt bệnh án (copy 1-click vào EMR) và xác lập 01 Vấn đề chính định hướng biện luận.
     - **Bước 3 — Phân tích & Biện luận (Clinical Deduction & Analysis)**: Động cơ suy luận diễn dịch đa tầng, tính toán % xác suất chẩn đoán sơ bộ/phân biệt, cảnh báo cờ đỏ cấp cứu, thang điểm nguy cơ lâm sàng (qSOFA, CURB-65, Shock Index) và kết nối Guidelines EBM chính thức.
     - **Bước 4 — Phác đồ điều trị (Clinical Protocol Execution & Orders)**: Hướng dẫn phân tầng xử trí theo 3 tuyến y tế (Cơ sở / Huyện / Tỉnh), bảng y lệnh thuốc cá thể hóa (nạp nhanh thuốc từ Guideline vào đơn), kế hoạch theo dõi và Chuỗi Bệnh Học Đa Chiều 6 khía cạnh (EBM Pathway).
     - *Chi tiết tài liệu*: Xem [QUY_TRINH_CONG_VIEC_CHU_TRINH_LAM_SANG.md](docs/QUY_TRINH_CONG_VIEC_CHU_TRINH_LAM_SANG.md).
  2. **📖 Sổ Tay Kinh Nghiệm SOAP (Hub Riêng Biệt)**:
     - Nơi học tập, tra cứu, đối chiếu các ca bệnh kinh điển, bẫy lâm sàng thường gặp được nạp từ Knowledge Vault.
  3. **🏛️ Kho Tri Thức Vault (Explorer Riêng Biệt)**:
     - Khám phá toàn diện 2.400+ bài viết EBM, 18 phân kho, Guidelines Bộ Y Tế và tra cứu mã ICD-10.
- **Pipeline Soạn & Nạp Ca Lâm Sàng Chuẩn Hóa qua Google NotebookLM**:
  - Không còn nhập liệu ca mẫu thủ công trên giao diện.
  - Sử dụng AI NotebookLM kết hợp Prompt Master y khoa chuẩn mực để trích xuất từ tài liệu nguồn EBM và nạp tự động qua CLI script.

---

## 📁 2. Cấu Trúc Mã Nguồn

```text
src/content/docspace/
├── index.html                  # Entry point SPA
├── package.json                # Dependencies (React 19, TailwindCSS v4, Vite, Lucide)
├── vite.config.ts              # Cấu hình Vite & base path tương đối
├── tsconfig.json               # TypeScript config
├── docs/                       # Tài liệu hướng dẫn & Prompt
│   ├── QUY_TRINH_CONG_VIEC_CHU_TRINH_LAM_SANG.md # SOP Quy trình công việc 4 bước chuẩn
│   ├── HUONG_DAN_SOAN_CA_LAM_SANG.md             # Cẩm nang soạn & nạp ca lâm sàng
│   ├── HUONG_DAN_CHINH_SUA_CDSS.md               # Hướng dẫn chuẩn hóa CSDL CDSS
│   ├── QUY_TRINH_SXH_DENGUE.md                   # Quy trình nạp kiến thức SXH Dengue mẫu
│   ├── prompt-notebooklm-soap.txt                # Prompt Master soạn ca lâm sàng bằng NotebookLM
│   └── QUY_TRINH_NAP_CA_NOTEBOOKLM.md            # Quy trình biên soạn & nạp ca qua NotebookLM
├── src/
│   ├── main.tsx                # Mount React App
│   ├── App.tsx                 # Ứng dụng chính điều phối 3 phân hệ & Modals
│   ├── index.css               # TailwindCSS v4 styles
│   ├── types.ts                # Định nghĩa Types lâm sàng (Benh, TrieuChung, SoapExperience...)
│   ├── lib/
│   │   ├── clinicalEngine.ts   # Động cơ suy luận diễn dịch (Deduction Engine)
│   │   ├── riskScore.ts        # Thuật toán tính toán điểm nguy cơ lâm sàng
│   │   ├── soapApi.ts          # 📚 Vault SOAP Service (Chỉ đọc từ Knowledge Vault)
│   │   ├── guidelineBridge.ts  # Cầu nối 78+ Guidelines & Landmark RCTs
│   │   └── vaultBridge.ts      # 🌉 Cầu nối 2.400+ bài viết EBM Knowledge Vault
│   ├── data/
│   │   ├── seedData.ts         # Wrapper nạp quy tắc từ Knowledge Vault
│   │   ├── clinical-rules-kb.json # Quy tắc suy luận bệnh & triệu chứng
│   │   └── vault-catalog.json  # Catalog 2.400+ bài viết Knowledge Vault & ca SOAP (BA)
│   └── components/
│       ├── Header.tsx          # Topbar điều hướng chuyển đổi 3 phân hệ
│       ├── StepNav.tsx         # Thanh điều hướng Chu trình lâm sàng 3 bước
│       ├── Step1DataIngestion.tsx  # Bước 1: Tiếp nhận dữ liệu & triệu chứng
│       ├── Step2Analysis.tsx       # Bước 2: Phân tích suy luận & tra cứu EBM
│       ├── Step3Protocol.tsx       # Bước 3: Phác đồ & Chuỗi bệnh học đa chiều
│       ├── Step4KnowledgeBase.tsx  # Phân hệ Kho tri thức EBM & Vault Explorer
│       ├── SoapExperienceBoard.tsx # Phân hệ Sổ tay Kinh nghiệm Lâm sàng SOAP
│       ├── soap/
│       │   ├── SoapListView.tsx    # Danh sách ca, bộ lọc chuyên khoa & tìm kiếm
│       │   └── SoapDetailView.tsx  # Bảng ma trận chi tiết 4 cột S - O - A - P
│       ├── VaultDrawer.tsx         # 📚 Drawer tra cứu nhanh Knowledge Vault
│       ├── CdssModal.tsx           # Modal công cụ CDSS hỗ trợ quyết định
│       ├── PrintReportModal.tsx    # Modal in bệnh án & xuất PDF
│       └── AboutModal.tsx          # Modal giới thiệu hệ thống
```

---

## 🚀 3. Hướng Dẫn Chạy Cục Bộ (Run Locally)

### 3.1. Cài đặt Dependencies
```powershell
cd src/content/docspace
npm install
```

### 3.2. Khởi động Dev Server
```powershell
npm run dev
```
Ứng dụng sẽ chạy tại: **http://localhost:5173**

### 3.3. Build Production
```powershell
npm run build
```

---

## 🤖 4. Quy Trình Nạp Ca Lâm Sàng Bằng NotebookLM

Để nạp thêm ca lâm sàng mới vào hệ thống mà không cần đụng đến mã nguồn:

1. **Chuẩn bị nguồn tài liệu**: Tải văn bản Guideline Bộ Y Tế, ESC, AHA hoặc ca bệnh ẩn danh lên [Google NotebookLM](https://notebooklm.google.com/).
2. **Dùng Prompt Master**: Mở `docs/prompt-notebooklm-soap.txt`, dán vào NotebookLM để sinh ca bệnh theo format Markdown Frontmatter chuẩn.
3. **Lưu file Markdown**: Lưu file vào `src/content/knowledge-vault/ba/<caseId>.md`.
4. **Chạy script nạp tự động**:
   ```powershell
   node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/<caseId>.md
   ```
   Script sẽ tự động cập nhật `vault-catalog.json` của Knowledge Vault và đồng bộ sang DocSpace.
   Xem chi tiết tại: [`docs/QUY_TRINH_NAP_CA_NOTEBOOKLM.md`](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/QUY_TRINH_NAP_CA_NOTEBOOKLM.md).

---

## 🧬 5. Chuẩn Hóa & Chỉnh Sửa Tri Thức CDSS Có Trọng Số

Để chỉnh sửa hoặc nạp thêm các bệnh lý có trọng số CDSS (bao gồm tiêu chuẩn chẩn đoán, vai trò đặc trưng/gợi ý/hỗ trợ/loại trừ, ngưỡng cận lâm sàng và phác đồ thuốc điều trị):
- Xem cẩm nang chi tiết tại: [`docs/HUONG_DAN_CHINH_SUA_CDSS.md`](file:///d:/Apps/Apps_ykhoa/src/content/docspace/docs/HUONG_DAN_CHINH_SUA_CDSS.md).
- Thư mục dữ liệu làm giàu độc lập: `src/content/docspace/data/enriched/`.
- Lệnh tự động đóng gói dữ liệu CDSS:
  ```powershell
  node tools/scripts/build-enriched-cdss.mjs
  ```
