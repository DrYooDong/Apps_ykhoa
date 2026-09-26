# 📘 CLINIPORTAL — DANH MỤC TỪ VỰNG LÂM SÀNG CHUẨN (MASTER SYMPTOM DICTIONARY)

> **Phiên bản**: v5.0 | **Ngày cập nhật**: 2026-09-26 | **Tổng số triệu chứng chuẩn**: 0
> **Vị trí lưu trữ**: `src/content/knowledge-vault/data/DOCSPACE_MASTER_SYMPTOM_DICTIONARY.md`
> **Mục đích**: Bản đồ từ vựng tham chiếu chuẩn mực (Anchor Vocabulary). Dùng để nạp trực tiếp vào **Google NotebookLM** cùng với tài liệu Guideline để AI đối chiếu, tái sử dụng mã ID sẵn có và tuyệt đối tránh tạo triệu chứng trùng lặp.

---

## 🧭 HƯỚNG DẪN DÀNH CHO AI (SYSTEM PROMPT RULES CHO NOTEBOOKLM)

Khi bạn (AI / NotebookLM) phân tích tài liệu lâm sàng/Guideline và trích xuất dữ liệu bệnh học (Prompt 05, Prompt 06):

1. **TRA CỨU TRƯỚC (Look up first)**:
   - Trước khi điền trường `symptomIds` trong tiêu chuẩn hoặc `selected` trong ca mẫu, **BẮT BUỘC** tra cứu bảng danh mục từ vựng dưới đây.
2. **TÁI SỬ DỤNG MÃ ID HIỆN HỮU (Reuse Existing IDs)**:
   - Nếu triệu chứng trong Guideline hoặc bệnh án tương đương hoặc là một biến thể ngữ nghĩa (nằm trong cột *Từ khóa & Biến thể / Aliases*) → **BẮT BUỘC dùng lại `Mã ID chuẩn`** đã có.
   - Ví dụ:
     - Thấy "sốt cao", "sốt > 38°C", "nóng sốt" → Dùng `sot`.
     - Thấy "sốt cao liên tục ngày 1-7", "sốt dengue đột ngột" → Dùng `tc_sot_cao_dot_ngot_duoi_7_ngay`.
     - Thấy "mạch nhanh xoang", "nhịp tim > 100" → Dùng `mach_nhanh`.
     - Thấy "hct tăng dốc đứng", "cô đặc máu" → Dùng `tc_co_dac_mau_hct_tang_tren_20_phan_tram`.
     - Thấy "tiểu cầu tụt < 100 G/L" → Dùng `tc_giam_tieu_cau_duoi_100_g_l`.
3. **KHI NÀO ĐƯỢC PHÉP ĐỀ XUẤT TRIỆU CHỨNG MỚI?**:
   - CHỈ KHI NÀO triệu chứng / dấu hiệu / nghiệm pháp / xét nghiệm đó **HOÀN TOÀN MỚI**, đặc thù cho bệnh lý đang nạp và chưa từng xuất hiện trong bất kỳ mục nào dưới đây.
   - Khi tạo ID mới, phải tuân thủ nghiêm ngặt:
     - Viết thường không dấu, dùng dấu gạch dưới `_` (ví dụ: `dau_nguc_kieu_mang_phoi`, `ran_no_khu_tru`).
     - **KHÔNG** dùng tiền tố tùy tiện như `tc_`, `c_`, `trieu_chung_` (các tiền tố cũ chỉ để tương thích ngược).
     - Bắt buộc khai báo đầy đủ trong mảng `trieuChungMoi` kèm: `id`, `ten`, `nhom`, `loai`, `tuKhoa`, `aliases`, `map`.

---

## 🗂️ BẢNG TỪ VỰNG CHI TIẾT THEO HỆ CƠ QUAN

### 1. Toàn thân & Sinh hiệu chung (`toan-than.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 2. Hệ Tim mạch & Huyết động (`tim-mach.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 3. Hệ Hô hấp & Lồng ngực (`ho-hap.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 4. Hệ Tiêu hóa, Gan mật & Ổ bụng (`tieu-hoa.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 5. Hệ Thần kinh & Ý thức (`than-kinh.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 6. Da niêm & Dị ứng lâm sàng (`da-niem.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 7. Cận lâm sàng (Huyết học, Sinh hóa, Vi sinh, CĐHA) (`can-lam-sang.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 8. Hệ Tiết niệu & Chức năng thận (`tiet-nieu.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 9. Hệ Nội tiết & Chuyển hóa (`noi-tiet.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 10. Huyết học & Đông máu (`huyet-hoc.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 11. Sản phụ khoa (`san-phu-khoa.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

### 12. Tiền căn & Yếu tố nguy cơ nền (`tien-can.json` — 0 mục)

*Hiện chưa có triệu chứng nào trong phân nhóm này. Sẽ được bổ sung khi nạp các bệnh lý liên quan.*

---
*Tài liệu tự động tạo bởi: `tools/scripts/bundle-symptoms.mjs` — CliniPortal Knowledge Engineering Squad.*
