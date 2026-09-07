# 🩺 DocSpace MedLens — Không Gian Phân Tích Bệnh Án & Kho Tri Thức EBM
> **CliniPortal MedLens DocSpace Pro**  
> *Hệ sinh thái phân tích bệnh án lâm sàng thời gian thực, suy luận diễn dịch đa tầng và kết nối trực tiếp 2.400+ bài viết Y học chứng cứ (EBM) từ Knowledge Vault.*

---

## 🌟 1. Tổng Quan Dự Án

**DocSpace MedLens** là ứng dụng lâm sàng hiện đại được tái cấu trúc hoàn toàn trên nền tảng **React 19 + TypeScript + Vite + TailwindCSS v4**, vận hành đồng bộ trong hệ sinh thái **CliniPortal**.

### Điểm nổi bật:
- **Chu trình lâm sàng 4 bước tiêu chuẩn**:
  1. **Bước 1 — Tiếp nhận dữ liệu (Data Ingestion)**: Nhập bệnh sử (SOAP), sinh hiệu, cận lâm sàng, chọn triệu chứng dương tính / phủ định loại trừ.
  2. **Bước 2 — Phân tích & Suy luận (Deduction Analysis)**: Động cơ suy luận diễn dịch tính toán % độ phù hợp, phát hiện bệnh cấp cứu không thể bỏ qua, cảnh báo thang điểm nguy cơ (Clinical Risk Score) và ma trận so sánh đối đầu.
  3. **Bước 3 — Phác đồ điều trị (Protocol Execution)**: Hướng dẫn phân tầng theo tuyến (tuyến xã, huyện, tỉnh/TW), đơn thuốc cá thể hóa, checklist y lệnh theo dõi và **Bằng chứng Y học Chứng cứ 5 khía cạnh (Clinical Pathway)**.
  4. **Bước 4 — Cơ sở tri thức (Knowledge Base & Vault)**: Kết nối song song giữa quy tắc suy luận nội tại MedLens và **2.400+ bài viết EBM từ 18 Kho tri thức CliniPortal**.
- **Kết nối hai chiều với Knowledge Vault**:
  - Tra cứu trực tiếp theo mã ICD-10 và tên bệnh án.
  - Ngăn kéo tra cứu nhanh **Vault Drawer** trượt từ cạnh phải, không làm mất dữ liệu bệnh án đang nhập.
  - Liên kết đa chiều 5 khía cạnh: GP & Sinh lý ➔ Sinh lý bệnh ➔ Tiêu chuẩn chẩn đoán ➔ Phác đồ điều trị ➔ Dược lâm sàng ➔ Biến chứng.
- **Lưu trữ Supabase Cloud & 100% Offline-Ready**:
  - Tích hợp Supabase Client cho xác thực bác sĩ, quản lý danh bạ bệnh nhân và bệnh án điện tử.
  - Cơ chế tự động chuyển đổi sang LocalStorage nếu chưa cấu hình Supabase hoặc khi mất mạng, đảm bảo bác sĩ làm việc liên tục không gián đoạn.

---

## 📁 2. Cấu Trúc Mã Nguồn

```text
src/content/docspace/
├── index.html                  # Entry point SPA
├── package.json                # Dependencies (React 19, Supabase, TailwindCSS v4)
├── vite.config.ts              # Cấu hình Vite & base path tương đối
├── tsconfig.json               # TypeScript config
├── .env.example                # Template biến môi trường
├── .env.local                  # Biến môi trường cục bộ (Supabase / Gemini)
├── supabase/
│   └── schema.sql              # Schema PostgreSQL cho Supabase (doctors, patients, medical_records)
├── src/
│   ├── main.tsx                # Mount React App
│   ├── App.tsx                 # Ứng dụng chính điều phối 4 bước lâm sàng & Modals
│   ├── index.css               # TailwindCSS v4 styles
│   ├── types.ts                # Định nghĩa Types lâm sàng (Benh, TrieuChung, MedicalRecord...)
│   ├── lib/
│   │   ├── clinicalEngine.ts   # Động cơ suy luận diễn dịch (Deduction Engine)
│   │   ├── riskScore.ts        # Thuật toán tính toán điểm nguy cơ lâm sàng
│   │   ├── supabase.ts         # Supabase Client & cờ kiểm tra cấu hình
│   │   ├── api.ts              # API layer (Supabase CRUD + LocalStorage fallback)
│   │   └── vaultBridge.ts      # 🌉 Cầu nối 2.400+ bài viết EBM Knowledge Vault
│   ├── data/
│   │   ├── seedData.ts         # Danh mục bệnh, triệu chứng và quy tắc suy luận
│   │   └── vault-catalog.json  # Catalog 2.400+ bài viết Knowledge Vault (2.4MB)
│   ├── context/
│   │   └── AuthContext.tsx     # Quản lý phiên làm việc Bác sĩ (Supabase Auth)
│   └── components/
│       ├── Header.tsx          # Topbar điều hướng, trạng thái Supabase & nút Vault
│       ├── StepNav.tsx         # Thanh điều hướng 4 bước lâm sàng
│       ├── Step1DataIngestion.tsx  # Bước 1: Tiếp nhận dữ liệu & triệu chứng
│       ├── Step2Analysis.tsx       # Bước 2: Phân tích suy luận & tra cứu EBM
│       ├── Step3Protocol.tsx       # Bước 3: Phác đồ & Chuỗi bệnh học đa chiều
│       ├── Step4KnowledgeBase.tsx  # Bước 4: Kho tri thức suy luận & Vault Explorer
│       ├── VaultDrawer.tsx         # 📚 Drawer tra cứu nhanh Knowledge Vault
│       ├── PatientRecordsModal.tsx # Modal quản lý hồ sơ bệnh án
│       ├── AuthModal.tsx           # Modal xác thực bác sĩ
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

## 💾 4. Cấu Hình Supabase (Tùy Chọn)

Để kích hoạt tính năng đồng bộ đám mây với Supabase:
1. Tạo một dự án miễn phí tại [https://supabase.com](https://supabase.com).
2. Vào **SQL Editor**, dán toàn bộ nội dung file `supabase/schema.sql` và nhấn **Run**.
3. Mở file `.env.local` trong `src/content/docspace/` và điền:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```
4. Khởi động lại ứng dụng. Biểu tượng trạng thái trên Header sẽ chuyển thành **Supabase Connected**.
*(Nếu không điền, ứng dụng vẫn hoạt động 100% bình thường với bộ nhớ LocalStorage offline)*.

---

## 📚 5. Kết Nối Knowledge Vault

Hệ thống kết nối trực tiếp với file `src/content/knowledge-vault/data/vault-catalog.json`:
- **Bước 2 (Chẩn đoán)**: Nhấn **"Tra cứu Vault EBM"** tại chẩn đoán hàng đầu hoặc chẩn đoán phân biệt để xem tài liệu liên quan.
- **Bước 3 (Phác đồ)**: Khối **"Bằng chứng Y học Chứng cứ & Chuỗi Bệnh Học Đa Chiều"** tự động khớp 5 bài viết tương ứng: GP & Sinh lý, Sinh lý bệnh, Tiêu chuẩn chẩn đoán, Dược lý lâm sàng và Biến chứng.
- **Bước 4 (Kho tri thức)**: Tab **"Kho Vault EBM"** cung cấp bộ lọc theo 18 Kho tri thức, thanh tìm kiếm full-text và xem bài viết tức thì.
- **Phím tắt / Header**: Nhấn nút **"Kho Vault EBM"** trên thanh Header để bật Drawer tra cứu tại bất kỳ màn hình nào.
