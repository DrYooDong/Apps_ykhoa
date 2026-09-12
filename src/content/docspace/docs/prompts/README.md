# 🚀 BỘ PROMPT CHUNG NẠP CODE VÀO "CHU TRÌNH LÂM SÀNG" DOCSPACE
>
> **Hệ thống**: CliniPortal DocSpace MedLens Pro  
> **Kiến trúc**: Dữ liệu cấu trúc tĩnh (Client-Side & Zero-Latency)  
> **Mô hình tri thức**: Hợp nhất tinh gọn — **4 Kho EBM Cốt Lõi** & **4 Khối Code Chu Trình Lâm Sàng**  
> **Chuyên đề cấu hình sẵn**: **Sốt Xuất Huyết Dengue** (Quyết định 2760/QĐ-BYT 2023 & WHO Dengue Guidelines 2024–2025).

---

## 🌟 1. TỔNG QUAN KIẾN TRÚC HỢP NHẤT TRI THỨC Y KHOA

Hệ sinh thái tri thức CliniPortal được hợp nhất thành mô hình 4 Kho EBM chuyên sâu, loại bỏ phân mảnh:

- **Kho Yếu tố nguy cơ** $\longrightarrow$ **Gộp toàn diện vào Kho Dịch tễ học (DTH)**
- **Kho Dược lâm sàng & Kho Tư vấn** $\longrightarrow$ **Gộp toàn diện vào Kho Phác đồ điều trị (PDDT)**
- **Kho Chẩn đoán (CD)** & **Kho Biến chứng (BC)** $\longrightarrow$ Tiếp tục là các trụ cột phân tích tiêu chuẩn và xử trí cấp cứu giờ vàng.

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      TÀI LIỆU NGUỒN TRONG NOTEBOOKLM                            │
│           (Ví dụ: QĐ 2760/QĐ-BYT 2023 & WHO Guidelines 2024–2025)               │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
     ┌───────────────────────────────────┴───────────────────────────────────┐
     │                                                                       │
     ▼                                                                       ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│ NHÓM 1: PROMPT SINH CODE NẠP VÀO      │   │ NHÓM 2: PROMPT SOẠN BÀI EBM VAULT     │
│ "CHU TRÌNH LÂM SÀNG" DOCSPACE         │   │ (4 KHO TRI THỨC HỢP NHẤT CỐT LÕI)     │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • Prompt 00: Master All-in-One Prompt │   │ • Prompt 01: Kho Tiêu Chuẩn CĐ (CD)   │
│ • Prompt 05: Enriched CDSS JSON       │   │ • Prompt 02: Kho Phác Đồ (PDDT)       │
│ • Prompt 06: Ca Mẫu & Trọng Số CDSS   │   │   (Gộp Phác đồ + Dược + Tư vấn)       │
│ • Prompt 07: Ca Thực Chiến SOAP MD    │   │ • Prompt 03: Kho Dịch Tễ Học (DTH)    │
│ • Prompt 08: Batch DB Enricher        │   │   (Gộp Dịch tễ + Tam giác + Nguy cơ)  │
│                                       │   │ • Prompt 04: Kho Biến Chứng (BC)      │
│ -> Sinh CODE nạp trực tiếp vào App    │   │                                       │
│    để vận hành 4 Bước Lâm Sàng!       │   │ -> Sinh bài Markdown chuyên sâu       │
│                                       │   │    liên kết Pathway ở Bước 4          │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
```

---

## ⚡ 2. BẢNG TRA CỨU NHÓM 1: PROMPT SINH CODE CHU TRÌNH LÂM SÀNG

Đây là nhóm prompt sinh ra **MÃ NGUỒN / DỮ LIỆU CẤU TRÚC (JSON / MARKDOWN)** để nạp thẳng vào ứng dụng:

| STT | File Prompt | Loại Code Sinh Ra | Nơi Nạp / Lưu File Trong Dự Án | Tác Dụng Trong Chu Trình Lâm Sàng |
| :---: | :--- | :--- | :--- | :--- |
| **00** | [`00-master-prompt-nap-chu-trinh-lam-sang.txt`](00-master-prompt-nap-chu-trinh-lam-sang.txt) | **Tổng hợp 4 Khối Code**: CDSS JSON, Trọng số KB, Ca mẫu, SOAP MD | Theo hướng dẫn từng khối | **Chạy 1 lần duy nhất sinh toàn bộ gói dữ liệu lâm sàng** |
| **05** | [`05-prompt-cdss-json-generator.txt`](05-prompt-cdss-json-generator.txt) | **Enriched CDSS JSON**<br>(Tiêu chuẩn, Ngưỡng CLS, `severityGrading` 3 phân độ, Phác đồ 3 tuyến, Thuốc bậc 1/2, Cờ đỏ) | `src/content/docspace/data/enriched/<slug>.json`<br>*(Chạy `node tools/scripts/build-enriched-cdss.mjs`)* | **Bước 3 & Bước 4**<br>Vận hành động cơ phân tích tiêu chuẩn, phân độ lâm sàng, phác đồ điều trị và cảnh báo cờ đỏ |
| **06** | [`06-prompt-sample-case-generator.txt`](06-prompt-sample-case-generator.txt) | **1. Ca bệnh mẫu JSON**<br>**2. Ma trận trọng số CDSS JSON** | 1. `src/content/knowledge-vault/data/sample-clinical-cases.json`<br>2. `src/content/knowledge-vault/data/clinical-rules-kb.json` | **Bước 1 & Bước 3**<br>Hiển thị nút ca mẫu trên thanh công cụ Bước 1 & tính % xác suất chẩn đoán ở Bước 3 |
| **07** | [`07-prompt-soap-case-ingest.txt`](07-prompt-soap-case-ingest.txt) | **Hồ sơ ca bệnh SOAP Markdown** | Nạp qua nút **"Nạp ca từ NotebookLM"** trên thanh Header (hoặc lưu `knowledge-vault/ba/`) | **Sổ tay kinh nghiệm SOAP**<br>Nạp 1-click vào sổ tay ca bệnh lâm sàng thực tế |
| **08** | [`08-prompt-db-batch-enricher.txt`](08-prompt-db-batch-enricher.txt) | **Làm giàu hàng loạt entry CSDL** | `src/content/docspace/data/kho-chan-doan-db.ts` | **Nâng cấp CSDL**<br>Thay thế các entry placeholder mẫu thành dữ liệu lâm sàng định lượng |

---

## 📚 3. BẢNG TRA CỨU NHÓM 2: PROMPT SOẠN BÀI KHO TRI THỨC (4 KHO HỢP NHẤT)

Các prompt này dùng khi bạn trích xuất các bài viết y học chứng cứ chuyên sâu lưu vào **Knowledge Vault** để liên kết trong Chuỗi Bệnh Học Đa Chiều (Pathway) ở Bước 4:

| Mã Kho | File Prompt | Chuyên Đề & Nội Dung Hợp Nhất | File Đích Trong Knowledge Vault |
| :---: | :--- | :--- | :--- |
| **CD** | [`01-prompt-cd-chan-doan.txt`](01-prompt-cd-chan-doan.txt) | **Kho Tiêu Chuẩn Chẩn Đoán**<br>• 3 giai đoạn diễn tiến lâm sàng, 7 dấu hiệu cảnh báo<br>• Nghiệm pháp Lacet, NS1/PCR/ELISA, ngưỡng CBC<br>• Bảng chẩn đoán phân biệt toàn diện | `knowledge-vault/2.3. Kho chẩn đoán/{Chuyên khoa}/CD_{Tên bệnh}_P1.md` |
| **PDDT** | [`02-prompt-pddt-phac-do.txt`](02-prompt-pddt-phac-do.txt) | **Kho Phác Đồ Điều Trị Toàn Diện** *(Hợp nhất Phác đồ + Dược + Tư vấn)*<br>• Phân tầng 3 tuyến y tế & phác đồ bù dịch RL bậc thang mL/kg/h<br>• Cấp cứu sốc DSS từng giờ, dung dịch keo cao phân tử, chế phẩm máu<br>• **Dược thư lâm sàng**: Paracetamol, chống chỉ định tuyệt đối NSAIDs/Aspirin, chỉnh liều suy gan/suy thận<br>• **Tư vấn xuất viện Teach-Back**: 7 dấu hiệu cấp cứu, 5 sai lầm cạo gió/truyền dịch bừa | `knowledge-vault/2.4. Kho phác đồ điều trị/{Chuyên khoa}/PDDT_{Tên bệnh}_P1.md` |
| **DTH** | [`03-prompt-dth-dich-te.txt`](03-prompt-dth-dich-te.txt) | **Kho Dịch Tễ Học & Yếu Tố Nguy Cơ** *(Hợp nhất Dịch tễ + Nguy cơ)*<br>• 4 serotype DENV, véc-tơ *Aedes aegypti*, chu kỳ lây truyền, cơ chế ADE<br>• Tỷ lệ mắc/tử vong CFR, DALYs, dịch tễ Việt Nam<br>• **Ma trận yếu tố nguy cơ EBM**: Cơ địa nhũ nhi, béo phì (tính IBW), thai phụ, người già, xơ gan (OR/RR)<br>• Kiểm soát véc-tơ & cập nhật vắc-xin Qdenga / Dengvaxia | `knowledge-vault/1.4. Kho dịch tễ học/{Chuyên khoa}/DTH_{Tên bệnh}_P1.md` |
| **BC** | [`04-prompt-bc-bien-chung.txt`](04-prompt-bc-bien-chung.txt) | **Kho Biến Chứng & Cấp Cứu**<br>• Sốc Dengue mất bù, tái sốc, xuất huyết tiêu hóa ồ ạt<br>• Suy gan cấp (AST/ALT $\ge 1000\text{ U/L}$), viêm não, phù phổi cấp quá tải dịch<br>• Xử trí cấp cứu giờ vàng & y lệnh trực on-call alert | `knowledge-vault/2.5. Kho biến chứng/{Chuyên khoa}/BC_{Tên bệnh}_P1.md` |

---

## 🚀 4. QUY TRÌNH 3 BƯỚC THỰC HIỆN NGAY CHO SỐT XUẤT HUYẾT DENGUE

### Bước 1: Mở NotebookLM & Cài đặt Master Instruction

1. Truy cập [Google NotebookLM](https://notebooklm.google.com/).
2. Mở Notebook chứa tài liệu **Sốt xuất huyết Dengue** (QĐ 2760/QĐ-BYT 2023 hoặc WHO Guidelines).
3. Mở file [`00-master-system-instruction.txt`](00-master-system-instruction.txt), sao chép toàn bộ nội dung và dán vào phần **Custom Instructions** hoặc gửi làm tin nhắn đầu tiên để thiết lập phong cách y học chứng cứ EBM.

### Bước 2: Sinh Code Nạp Vào Chu Trình Lâm Sàng

> 💡 **Lưu ý về giới hạn độ dài của NotebookLM**: Ô chat (chat box) của NotebookLM giới hạn số ký tự mỗi tin nhắn, nên nếu dán nguyên file dài (~17-24KB) sẽ bị báo lỗi quá dài. Bạn chọn 1 trong 2 cách sau:

#### 🌟 CÁCH 1 (Khuyên dùng — Nạp làm Nguồn tài liệu, không lo giới hạn độ dài):
1. Tại giao diện NotebookLM, ở cột bên trái **Sources (Nguồn)** ➔ Bấm **"+ Add source"** (Thêm nguồn) ➔ Chọn **"Copied text"** (hoặc upload trực tiếp file `.txt`).
2. Dán toàn bộ nội dung file [`00-master-prompt-nap-chu-trinh-lam-sang.txt`](00-master-prompt-nap-chu-trinh-lam-sang.txt) vào và đặt tên nguồn là `SCHEMA_DOCSPACE`.
3. Tại **ô Chat**, bạn chỉ cần gửi đúng 1 câu lệnh ngắn:
   > *"Dựa trên Hướng dẫn điều trị và tuân thủ chặt chẽ cấu trúc tại nguồn SCHEMA_DOCSPACE, hãy sinh toàn bộ dữ liệu code 4 Khối cho bệnh Sốt xuất huyết Dengue."*

#### ⚡ CÁCH 2 (Dán trực tiếp vào ô chat — Dùng bộ Micro-Prompt siêu gọn < 1.500 ký tự):
Nếu muốn sao chép dán thẳng vào ô chat của NotebookLM mà không cần tạo Source, hãy mở bộ Micro-Prompt:
- Dùng [`05-micro-cdss-json.txt`](05-micro-cdss-json.txt) để lấy file JSON CDSS có `severityGrading`.
- Dùng [`06-micro-sample-case.txt`](06-micro-sample-case.txt) để lấy Ca mẫu và Ma trận trọng số.
- Dùng [`07-micro-soap-case.txt`](07-micro-soap-case.txt) để lấy Ca bệnh thực chiến SOAP.

### Bước 3: Nạp Code Vào Dự Án

1. **Nạp Enriched CDSS JSON**:
   - Lưu khối JSON từ Prompt 05 vào: `src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json`.
   - Chạy lệnh build tự động:

     ```powershell
     node tools/scripts/build-enriched-cdss.mjs
     ```

2. **Nạp Ca Bệnh Mẫu & Trọng Số CDSS**:
   - Dán đối tượng ca mẫu vào mảng `[]` trong `src/content/knowledge-vault/data/sample-clinical-cases.json`.
   - Dán bổ sung triệu chứng và bệnh vào `src/content/knowledge-vault/data/clinical-rules-kb.json`.
3. **Nạp Ca Bệnh SOAP**:
   - Mở giao diện DocSpace MedLens Pro trên trình duyệt (`npm run dev`), bấm nút **"Nạp ca từ NotebookLM"** trên thanh Header, dán nội dung Markdown vào và nhấn **"Phân tích & Nạp vào sổ tay"**.

---

## 🎯 5. CÁCH DÙNG PROMPT CHUNG CHO CÁC BỆNH LÝ KHÁC

Mọi file prompt đều có phần khai báo thông số ở đầu:

```text
- [TÊN BỆNH LÝ]: Viêm phổi mắc phải cộng đồng (CAP)
- [TÊN TIẾNG ANH / VIẾT TẮT]: Community-Acquired Pneumonia
- [MÃ ICD-10]: J18.9
- [CHUYÊN KHOA]: Hô hấp
- [MỨC ĐỘ NẶNG]: severe
- [HƯỚNG DẪN THAM CHIẾU]: Hướng dẫn chẩn đoán và điều trị Viêm phổi cộng đồng của Bộ Y Tế / ATS/IDSA Guidelines
- [SLUG FILE]: viem_phoi_cap
```

Khi cần soạn bài cho bệnh lý mới, bạn chỉ cần thay đổi các thông số trong ngoặc vuông `[...]` là có ngay prompt chuẩn chỉnh cho bệnh lý đó!
