# Quy Tắc Tốc Độ & Chính Xác Kỹ Thuật (Antigravity Speed & Precision)

> Tóm lược bất biến Always-On. Chi tiết quy trình đầy đủ nằm tại các skill on-demand: `speed-coding-orchestrator`, `precision-engineering-rca`, `deep-architecture-reasoning`.

1. **Chu trình Vi phẫu 3 Nhịp (Surgical Edits)**:
   - Khoanh vùng đúng 1–2 file và đọc theo khoảng dòng/signature (không đọc tràn lan file >300 dòng).
   - Bắt buộc dùng `edit_file` cho đoạn code mục tiêu; **cấm** dùng `write_file` ghi đè toàn bộ file lớn.
   - Xác thực tức thì bằng CLI (`npx astro check`, `tools/scripts/medical-linter.mjs`, `tools/scratch/check_tags.js`).
2. **RCA 4 Bước — Cấm Đoán Mò (Zero-Guessing)**:
   - Đối chiếu thực tế với Type Contract/DOM/Schema → Cô lập nguyên nhân gốc (sửa tại Source of Truth) → Vá tối thiểu → Rà soát downstream callers chống hồi quy.
   - Không lạm dụng `any`; dữ liệu y khoa/CDSS phải khớp schema chuẩn.
3. **Tư duy Kiến trúc C4 & ADR**:
   - Đề xuất giải pháp lớn phải phân tích rõ *Context → Options & Tradeoffs → Recommendation*, luôn ưu tiên công thái học lâm sàng (offline-first, tra cứu ≤ 5s, an toàn bệnh nhân).
