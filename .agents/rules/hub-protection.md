# Quy Tắc Hub Module Protection (Bảo Vệ Hub Cốt Lõi)

> Các Hub Module là các file có chỉ số liên kết phụ thuộc (Fan-in) rất cao. Thay đổi bất cẩn tại các file này có thể làm ngưng trệ toàn bộ hệ sinh thái CliniPortal.

## 🛡️ Quy trình Trước Khi Chỉnh Sửa

1. **Chạy script kiểm tra đồ thị phụ thuộc**:
   ```bash
   node scratch/query_graph.js <filename>
   ```
2. **Đánh giá rủi ro**:
   - Nếu mức độ rủi ro là `HIGH RISK` hoặc `CRITICAL HUB`, bắt buộc phải lập `implementation_plan.md` xin ý kiến người dùng trước khi sửa.

## 📋 Danh sách Hub Module Cốt lõi
- `js/main.js` (**CRITICAL HUB**)
- `pages/Y học chứng cứ/Guidelines/guidelines.js` (**CRITICAL HUB**)
- `pages/Tiếp cận/4. Bệnh lý/benh-ly.js` (**CRITICAL HUB**)
- `js/clinical-engine.js` (**HIGH RISK**)
- `js/tracuu-icd10.js` (**HIGH RISK**)
