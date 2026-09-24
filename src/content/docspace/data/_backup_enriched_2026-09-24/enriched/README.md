# Thư Mục Dữ Liệu CDSS Làm Giàu Độc Lập (Enriched Clinical Decision Support)

Thư mục này chứa các thực thể bệnh lý đã được làm giàu chuyên sâu từ **Prompt 08** hoặc **Prompt 09** (NotebookLM / AI).
Mỗi bệnh lý được lưu thành **01 file JSON riêng biệt** (tên file là slug/key của bệnh, ví dụ: `sot_xuat_huyet_dengue.json`).

---

## 🧭 Tổng Quan Kiến Trúc Dữ Liệu 01 Bệnh Lý Đầy Đủ

Một bệnh lý hoàn chỉnh trong hệ sinh thái **DocSpace & Knowledge Vault** được tạo thành từ **4 khối dữ liệu cốt lõi**:

1. **Từ điển Triệu chứng (`symptoms/*.json`)**: Cung cấp mã định danh ID, từ khóa tìm kiếm và ngưỡng định lượng cho Bước 1 & Bước 3.
2. **Luật Bệnh lý CDSS (`diseases/*.json`)**: Khai báo mã ICD-10, tóm tắt lâm sàng, ma trận trọng số suy luận (`dt`, `gy`, `ht`, `loaitru`) và phác đồ điều trị 5 tuyến.
3. **Ca Lâm Sàng Mẫu & SOAP (`sample-clinical-cases.json` & `ba/*.md`)**: Ca bệnh thực chiến kích hoạt Tam giác Dịch tễ (Bước 1 & 2) và hồ sơ bệnh án SOAP (Bước 4 & Sổ tay).
4. **Hồ Sơ Làm Giàu Enriched CDSS (`data/enriched/<slug>.json`)**: Cấu trúc chi tiết Tiêu chuẩn chẩn đoán vàng, Bảng chiến lược 3 cột, Phân độ nặng, Bảng 4 cột và Y lệnh thuốc từng ngày.

---

## 🚀 Quy Trình Chuẩn 6 Bước Nạp 01 Bệnh Lý Đầy Đủ

### BƯỚC 1: Khai Báo Triệu Chứng Mới (Nếu chưa có trong Từ điển)

- Mở tệp hệ cơ quan tương ứng trong `src/content/knowledge-vault/data/symptoms/<he-co-quan>.json`:
  - `toan-than.json`, `tim-mach.json`, `ho-hap.json`, `tieu-hoa.json`, `tiet-nieu.json`, `noi-tiet.json`, `than-kinh.json`, `da-niem.json`, `huyet-hoc.json`, `san-phu-khoa.json`, `can-lam-sang.json`, `tien-can.json`.
- Thêm đối tượng triệu chứng chuẩn:

  ```json
  {
    "id": "trieu_chung_moi",
    "ten": "Tên hiển thị rõ ràng (Khử sạch HTML entities: dùng > thay cho &gt;, < thay cho &lt;)",
    "nhom": "Tên nhóm hệ cơ quan",
    "loai": ["cn", "tt"],
    "tuKhoa": ["từ khóa 1", "từ khóa 2"],
    "map": null
  }
  ```

### BƯỚC 2: Khai Báo Bệnh Lý & Ma Trận CDSS

- Mở tệp chuyên khoa trong `src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json` (ví dụ: `tieu-hoa.json`, `ho-hap.json`, `truyen-nhiem.json`...).
- Thêm đối tượng bệnh lý vào mảng:

  ```json
  {
    "id": "slug_benh_ly",
    "ten": "Tên Bệnh Lý Chuẩn (Tên tiếng Anh)",
    "icd": "Mã ICD-10 (ví dụ: K74.6)",
    "nhom": "Tên chuyên khoa",
    "baoDong": true,
    "ghiChuBaoDong": "Cảnh báo khẩn cấp nếu là ca bệnh nặng/nguy kịch",
    "tomTat": "Tóm tắt định nghĩa, cơ chế và tiêu chuẩn xác định",
    "danSo": { "gioiTinh": "any", "tuoiMin": 0, "tuoiMax": 120 },
    "dd": [
      ["id_trieu_chung_1", 4.5, "dt"],
      ["id_trieu_chung_2", 3.0, "gy"],
      ["id_trieu_chung_3", 2.0, "ht"],
      ["id_trieu_chung_loai_tru", -4.0, "loaitru"]
    ],
    "phacDo": {
      "tuyen": ["Tuyến Xử trí phân cấp (Trạm y tế / Bệnh viện huyện / Tuyến tỉnh)"],
      "thuoc": [["Tên thuốc", "Liều lượng & Đường dùng", "Ghi chú chỉ định"]],
      "theoDoi": ["Kế hoạch theo dõi cận lâm sàng & sinh hiệu"],
      "luuY": ["Các chống chỉ định và lưu ý an toàn"],
      "nguon": ["Tên Hướng dẫn Bộ Y tế / Khuyến cáo quốc tế"]
    }
  }
  ```

### BƯỚC 3: Nạp Ca Bệnh Mẫu & Hồ Sơ Thực Chiến SOAP

1. **Ca bệnh mẫu (Bước 1 DocSpace)**:
   - Mở `src/content/knowledge-vault/data/sample-clinical-cases.json`.
   - Thêm ca bệnh vào mảng với các trường: `id`, `ten`, `diseaseId`, `vitals`, `labs`, `selected`, `sel`, `negated`, `epiContext`, `form`.
   - *Lưu ý: Các ID trong `selected`/`sel`/`negated` bắt buộc phải là mã đã khai báo ở Bước 1 (Tránh lỗi Orphan Symptoms).*
2. **Hồ sơ bệnh án SOAP (Bước 4 & Sổ tay)**:
   - Lưu file Markdown vào: `src/content/knowledge-vault/ba/<slug-ca-benh>.md`.

### BƯỚC 4: Nạp Dữ Liệu Enriched CDSS Làm Giàu Độc Lập

- Lưu tệp JSON từ Prompt 05/08 vào thư mục này:

  ```text
  src/content/docspace/data/enriched/<slug_benh>.json
  ```

  *(Ví dụ: `src/content/docspace/data/enriched/xo_gan_con_bu.json`)*
- Chứa các trường: `criteria`, `severityGrading`, `dailyTimeline`, `prescriptionSafety`, `patientEducation`...

### BƯỚC 5: Chạy Lệnh Đồng Bộ Tự Động (Terminal)

Từ thư mục gốc dự án, chạy 2 lệnh đồng bộ:

```powershell
# 1. Đồng bộ triệu chứng (symptoms) & bệnh lý (diseases) vào Master KB
node tools/scripts/bundle-clinical-rules.mjs

# 2. Biên dịch dữ liệu enriched vào CSDL Chẩn đoán CDSS
node tools/scripts/build-enriched-cdss.mjs
```

### BƯỚC 6: Kiểm Định Chất Lượng QA Toàn Diện (Bắt buộc Pass)

Chạy lần lượt 3 lệnh kiểm tra chất lượng:

```powershell
# 1. Rà soát lỗi định dạng HTML, tiền tố thừa và viết tắt
node tools/qa/docspace-clinical-data-linter.mjs

# 2. Đánh giá bảng kiểm độ chín (Bắt buộc đạt 15/15 tiêu chí - Zero Orphan Symptoms)
node tools/scripts/vault-readiness-check.mjs

# 3. Kiểm định cổng Y học chứng cứ 6 Trụ cột
node tools/qa/docspace-medical-qa-gate.mjs
```

---

## 🛠️ Bảng Tra Cứu Các Câu Lệnh Terminal Chính (DocSpace Cheat-Sheet)

### 1. Đồng bộ & Nạp dữ liệu (Sync & Ingestion)

```powershell
# Gom toàn bộ triệu chứng (12 tệp) & bệnh lý (9 tệp) vào Master KB (Bắt buộc chạy sau khi thêm/sửa)
node tools/scripts/bundle-clinical-rules.mjs

# Chỉ gom riêng 12 tệp triệu chứng vào clinical-rules-symptoms.json
node tools/scripts/bundle-symptoms.mjs

# Đồng bộ các tệp enriched/<slug>.json vào CSDL chẩn đoán CDSS
node tools/scripts/build-enriched-cdss.mjs

# Nạp tự động từ tệp Markdown chứa Prompt 06 & 07 (NotebookLM)
node tools/scripts/ingest-prompt-06-07.mjs <duong_dan_file.md>
```

### 2. Kiểm định chất lượng & QA Y khoa (Quality Gates & Audit)

```powershell
# Bảng kiểm độ chín (15/15 tiêu chí, kiểm tra triệt để triệu chứng mồ côi Zero-Orphan)
node tools/scripts/vault-readiness-check.mjs

# Linter lâm sàng: Khử lỗi HTML entities (&gt; &lt; &amp;), tiền tố thừa & phát hiện trùng lặp
node tools/qa/docspace-clinical-data-linter.mjs

# Cổng kiểm định Y học 6 Trụ cột (Medical QA Gate 6/6 Pillars)
node tools/qa/docspace-medical-qa-gate.mjs

# Kiểm tra tính hợp lệ của CSDL Kho chẩn đoán
node tools/scripts/validate-kho-db.mjs
```

### 3. Phát triển & Chạy thử nghiệm (Dev & Build)

```powershell
# Chạy riêng giao diện DocSpace (React + Vite, Hot Reload cực nhanh)
npm --prefix src/content/docspace run dev

# Chạy toàn bộ hệ sinh thái CliniPortal
npm run dev

# Kiểm tra lỗi kiểu dữ liệu TypeScript
npm run typecheck

# Build bundle DocSpace sang bản phân phối
npm --prefix src/content/docspace run build
```

### 💡 Chu trình 3 bước chuẩn khi nạp dữ liệu mới

```powershell
node tools/scripts/build-enriched-cdss.mjs

node tools/scripts/bundle-clinical-rules.mjs       # Bước 1: Đồng bộ dữ liệu
node tools/qa/docspace-clinical-data-linter.mjs    # Bước 2: Dọn sạch HTML & viết tắt
node tools/scripts/vault-readiness-check.mjs       # Bước 3: Kiểm tra 15/15 tiêu chí
```
