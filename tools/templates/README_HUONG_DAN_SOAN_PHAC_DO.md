# 📖 SỔ TAY TÓM TẮT: SOẠN PHÁC ĐỒ PHÂN NHÁNH CHO 100+ BỆNH LÝ
*Hướng dẫn nhanh 3 bước dành cho Bác sĩ Biên soạn & AI Agent*

---

## 🚀 3 Bước Nhanh Để Soạn Một Bệnh Mới

### Bước 1: Mở File Template Chuẩn
Copy tệp mẫu [`tools/templates/protocol-branching-template.json`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/tools/templates/protocol-branching-template.json) và đổi tên thành mã bệnh bạn muốn tạo:
Ví dụ:
* Viêm phổi cộng đồng: `viem_phoi_cong_dong_cap.json`
* Cơn hen phế quản: `con_hen_phe_quan_cap.json`
* Xơ gan & Biến chứng: `xo_gan_mat_bu.json`
* Đái tháo đường type 2: `dai_thao_duong_type_2.json`

Lưu file vào thư mục: `src/content/docspace/data/enriched/<ten_benh_slug>.json`.

---

### Bước 2: Chọn 1 Trong 6 Trục Phân Nhánh (`axisType`)

Tùy theo bệnh lý, bạn chọn trục phù hợp:

1. **`axisType: "severity"`** (Theo mức độ nặng):
   * Dùng cho: Sốt xuất huyết, Viêm tụy cấp, Uốn ván, Sốt rét.
   * Các nhánh: Nhẹ (Ngoại trú) → Có cảnh báo (Nội trú) → Nặng / Sốc (ICU).
2. **`axisType: "triage_score"`** (Theo thang điểm nguy cơ / phân tuyến):
   * Dùng cho: Viêm phổi (CURB-65 / PSI), Thuyên tắc phổi (PESI).
   * Các nhánh: Điểm 0–1 (Ngoại trú) → Điểm 2 (Khoa Nội) → Điểm ≥3 (ICU).
3. **`axisType: "phenotype"`** (Theo thể lâm sàng / tác nhân vi sinh):
   * Dùng cho: Nhiễm trùng da (Có mủ vs Không mủ), Viêm màng não (Vi khuẩn vs Siêu vi).
   * Các nhánh: Thể có mủ (Rạch mủ + Kháng tụ cầu/MRSA) → Thể không mủ (Kháng liên cầu).
4. **`axisType: "treatment_step"`** (Theo bậc điều trị nấc thang):
   * Dùng cho: Hen phế quản (GINA Step 1-5), COPD (GOLD A-B-E).
   * Các nhánh: Bậc 1–2 (Khi cần) → Bậc 3 (Liều thấp duy trì) → Bậc 4–5 (Liều cao + Sinh học).
5. **`axisType: "stage"`** (Theo giai đoạn tiến triển bệnh):
   * Dùng cho: Xơ gan (Child-Pugh A, B, C), Suy thận mạn (CKD G1-G5).
   * Các nhánh: Còn bù → Mất bù → Biến chứng đe dọa sinh mạng.
6. **`axisType: "comorbidity"`** (Theo cơ địa / Bệnh đồng mắc):
   * Dùng cho: Đái tháo đường type 2, Tăng huyết áp.
   * Các nhánh: Có kèm Suy tim/CKD (SGLT2i) → Kèm ASCVD (GLP-1 RA) → Không biến chứng.

---

### Bước 3: Điền Dữ Liệu Từng Nhánh & Chạy Lệnh Đồng Bộ

Trong mỗi nhánh, điền:
* `criteria`: Tiêu chuẩn để xếp bệnh nhân vào nhánh.
* `triage`: Tuyến tiếp nhận (Ngoại trú / Nội trú / ICU).
* `drugs`: Bảng thuốc đặc thù của nhánh.
* `escalationCriteria`: **RẤT QUAN TRỌNG** — Tiêu chuẩn leo thang để chuyển lên nhánh nặng hơn.
* `dischargeCriteria`: Tiêu chuẩn hạ bậc hoặc cho ra viện.
* `timelinePhases`: Bảng 4 cột lộ trình điều trị từng ngày của nhánh.

Sau khi lưu file JSON, mở Terminal và chạy lệnh tự động:
```bash
node tools/scripts/sync-clinical-db.mjs
```

Hệ thống sẽ:
* Quét và kiểm tra cú pháp JSON.
* Kiểm định Zero-Orphan Symptoms (không có triệu chứng mồ côi).
* Tự động đăng ký bệnh mới vào hệ thống CDSS DocSpace trong chưa đầy 1 giây!

---

## 💡 Mẹo Nạp Tự Động Bằng AI (NotebookLM / Claude / ChatGPT)
1. Tải Guideline của Bộ Y tế / WHO lên NotebookLM hoặc Claude.
2. Mở file Lean Prompt 01: [`src/content/docspace/docs/prompts/01-prompt-phac-do-phan-nhanh.txt`](file:///i:/Drive%20c%E1%BB%A7a%20t%C3%B4i/apps/Apps_ykhoa/src/content/docspace/docs/prompts/01-prompt-phac-do-phan-nhanh.txt).
3. Điền thông số bệnh lý ở đầu và dán vào AI.
4. AI sẽ tự động phân tích và xuất ra file JSON đúng 100% chuẩn format.
5. Bạn chỉ cần lưu file vào `src/content/docspace/data/enriched/<ten_benh>.json` và chạy lệnh đồng bộ!

---

## ⚡ Bí Kíp Xử Lý Các Bệnh Lý Đồ Sộ (Ví Dụ: Sốt Xuất Huyết Dengue, Viêm Tụy Cấp...)
* **Vấn đề**: Output của AI/NotebookLM thường giới hạn ở 4.000 – 8.000 tokens (400 – 600 dòng JSON), trong khi phác đồ lớn có thể dài hơn 1.000 dòng.
* **Chiến thuật tối ưu nhất**: **Sinh Từng Nhánh (Branch-by-Branch)**:
  - **Lượt 1**: Yêu cầu AI sinh phần chung + Nhánh 1 (nhẹ/cổ điển) & Nhánh 2 (có cảnh báo).
  - **Lượt 2**: Chat tiếp yêu cầu AI sinh tiếp object cho Nhánh 3 (Sốc / Nặng / ICU) với đầy đủ bảng dịch truyền và y lệnh.
  - **Ghép**: Dán object Nhánh 3 vào mảng `branches: [ ... ]` của file JSON.
* **Lệnh gõ "tiếp tục"**: Nếu AI đang sinh dở bị dừng ngang, chỉ cần gõ:  
  `"tiếp tục viết tiếp đoạn mã JSON từ chỗ vừa dừng, không lặp lại đoạn trước"`.

