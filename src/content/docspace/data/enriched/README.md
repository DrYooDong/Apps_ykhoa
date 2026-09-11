# Thư Mục Dữ Liệu CDSS Làm Giàu Độc Lập (Enriched Clinical Decision Support)

Thư mục này chứa các thực thể bệnh lý đã được làm giàu chuyên sâu từ **Prompt 08** hoặc **Prompt 09** (NotebookLM / AI).
Mỗi bệnh lý được lưu thành **01 file JSON riêng biệt** (tên file là slug/key của bệnh, ví dụ: `sot_xuat_huyet_dengue.json`).

---

## 🚀 Cách Thêm Bệnh Lý Mới (Sau khi chạy Prompt 08/09)

1. Lưu output JSON của AI thành một file trong thư mục này:
   ```text
   src/content/docspace/data/enriched/<ten_benh>.json
   ```
   *Ví dụ: `src/content/docspace/data/enriched/sot_xuat_huyet_dengue.json`*

2. Chạy lệnh đồng bộ tự động từ thư mục gốc của dự án:
   ```powershell
   node tools/scripts/build-enriched-cdss.mjs
   ```

3. Hệ thống sẽ tự động nạp đè dữ liệu bệnh này vào `DIAGNOSTIC_CHAIN_DATABASE` mà **không cần chỉnh sửa file 23.000 dòng `kho-chan-doan-db.ts`**!

---

## 📋 Kiểm Tra Tiến Độ
```powershell
node tools/scripts/validate-kho-db.mjs
```
