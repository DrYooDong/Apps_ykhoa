---
title: "Công Cụ Tra Cứu Mã Bệnh ICD-10 & Thẩm Định Hồ Sơ BHYT (TT06/2026)"
aliases: ["Tra cứu mã ICD-10", "ICD-10 Lookup", "Thẩm định BHYT", "Mã bệnh TT06/2026", "ICD10_BHYT"]
keywords: ["ICD-10", "tra cứu ICD", "thẩm định BHYT", "mã bệnh chính", "bệnh kèm theo", "xuất toán BHYT", "TT06/2026/TT-BYT", "QĐ 1849/QĐ-BYT", "HIS"]
icd10: ["A00-Z99"]
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - loai/cong-cu
  - he-co-quan/tong-quat
type: "icd10"
context: "noi-tru"
readTime: "8-10 phút"
updated: "2026-09-07"
---

# Công Cụ Tra Cứu Mã Bệnh ICD-10 & Thẩm Định Hồ Sơ BHYT (TT06/2026)

> [!NOTE]
> **Chuyên khoa:** Mã hóa bệnh & Giám định BHYT • Quản lý chất lượng bệnh viện | **Cơ sở pháp lý:** Thông tư số 06/2026/TT-BYT & Quyết định số 1849/QĐ-BYT của Bộ Y tế | **Dữ liệu:** 15.844 Mã bệnh chuẩn hóa • 22 Chương phân loại • Offline 100%.

---

> [!TIP] ⚡ **MỞ TRANG CÔNG CỤ TRA CỨU MÃ ICD-10 TOÀN MÀN HÌNH**
> Bạn có thể khởi chạy và sử dụng ngay công cụ tra cứu chuyên dụng tương tác siêu tốc với đầy đủ tính năng:
> - **Tìm kiếm tức thì 15.844 mã bệnh:** Gõ tên bệnh tiếng Việt không dấu/có dấu, triệu chứng hoặc mã 3–5 ký tự (VD: `đái tháo đường`, `E11.9`, `I10`).
> - **Chế độ Lọc Chỉ định BHYT:** Kiểm tra điều kiện thanh toán bảo hiểm y tế cho các xét nghiệm Cận lâm sàng (HbA1c, Troponin, CT 64 dãy, MRI) và Thuốc đắt tiền.
> - **Hồ sơ ca bệnh (Patient Case Builder):** Phân định mã bệnh chính vs bệnh kèm theo, tự động thẩm định quy tắc xuất toán BHYT.
> - **Sao chép chuẩn HIS:** 1-Click sao chép định dạng cho VNPT-HIS, Viettel-HIS (dấu chấm phẩy) hoặc FPT-HIS (dấu phẩy).
> 
> 🔗 **[Mở Công Cụ Tra Cứu Mã ICD-10 & Thẩm Định BHYT](file:///d:/Apps_ykhoa/src/content/knowledge-vault/tools/icd10/index.html)** *(Truy cập trực tiếp công cụ Web App)*

---

## 1. Tổng Quan Về Danh Mục ICD-10 Ban Hành Theo TT06/2026/TT-BYT

Phân loại Quốc tế về Bệnh tật và các Vấn đề Sức khỏe Liên quan phiên bản 10 (**ICD-10**) là chuẩn mực toàn cầu do Tổ chức Y tế Thế giới (WHO) ban hành và được Bộ Y tế Việt Nam chuẩn hóa, cập nhật theo Thông tư số 06/2026/TT-BYT:

- **Quy mô danh mục:** **15.844 mã bệnh chi tiết** từ 3 đến 5 ký tự.
- **Phân loại cấu trúc:** **22 Chương** bao quát toàn diện các bệnh lý nhiễm trùng, ung bướu, nội khoa, ngoại khoa, chấn thương, dị tật và các yếu tố tiếp xúc y tế.
- **Tính năng lọc chuyên dụng trên CliniPortal:**
  - `Dùng được bệnh chính`: Các mã bệnh đủ điều kiện làm lý do nhập viện hoặc chẩn đoán ra viện chính thức.
  - `Không dùng làm bệnh chính`: Các mã biểu hiện (dấu hoa thị `*`), mã triệu chứng hoặc nguyên nhân ngoại lai (V, W, X, Y) chỉ được phép làm chẩn đoán phụ.
  - `Theo giới tính`: Cảnh báo tự động nếu mã bệnh nam khoa gán cho bệnh nhân nữ hoặc ngược lại.

---

## 2. Quy Trình Thẩm Định Hồ Sơ Mã Hóa & Chống Xuất Toán BHYT

Hệ thống cung cấp module thẩm định tự động (BHYT Audit Engine) nhằm phát hiện sớm các nguy cơ bị cơ quan Bảo hiểm Xã hội từ chối thanh toán:

```
[Nhập Ca Bệnh] ──> [Chọn Bệnh Chính & Kèm] ──> [Kiểm Tra Quy Tắc] ──> [Cảnh Báo Xuất Toán] ──> [Sao Chép HIS]
```

1. **Kiểm tra tính hợp lệ của mã bệnh chính:**
   - Ngăn chặn việc sử dụng mã có ký tự phụ thuộc (ví dụ mã biểu hiện có dấu sao `*`) làm bệnh chính.
   - Bắt buộc phải có mã căn nguyên (dấu thập `†`) đi kèm mã biểu hiện.
2. **Kiểm tra tính tương thích Chỉ định Cận lâm sàng / Thuốc:**
   - Tra cứu nhanh các xét nghiệm đặc thù (VD: Định lượng Troponin I/T phải có mã bệnh mạch vành cấp `I20`, `I21`; Đo HbA1c phải có mã đái tháo đường `E10–E14`).
   - Cảnh báo chỉ định thuốc bảo hiểm có điều kiện (kháng sinh nhóm Carbapenem, Colistin, thuốc chống đông thế hệ mới NOAC/DOAC).

---

## 3. Các Phím Tắt & Thao Tác Siêu Tốc (Quick Actions)

- **Phím tắt `/`:** Focus nhanh vào ô tìm kiếm từ bất kỳ vị trí nào trên trang.
- **Nút "＋ Bệnh chính":** Đưa mã vào hồ sơ ca bệnh làm chẩn đoán chủ yếu.
- **Nút "＋ Bệnh kèm":** Thêm vào danh sách các bệnh phối hợp hoặc biến chứng.
- **Ca bệnh mẫu (Presets):** Nạp nhanh các ca bệnh điển hình thường gặp trong thực tế lâm sàng:
  1. *ĐTĐ tuýp 2 + Tăng huyết áp + Bệnh thận mạn (`E11.9; I10; N18.3`)*
  2. *Nhồi máu cơ tim cấp + Tăng huyết áp + Xơ vữa ĐM (`I21.9; I10; I25.1`)*
  3. *Suy tim mạn + Rung nhĩ + Tăng huyết áp (`I50.9; I48; I10`)*
  4. *Viêm phổi cấp + COPD đợt cấp (`J18.9; J44.1`)*
- **Xuất dữ liệu:** Hỗ trợ tải toàn bộ 15.844 mã bệnh về máy dưới định dạng file CSV chuẩn UTF-8 có dấu tiếng Việt để phục vụ nghiên cứu và thống kê báo cáo.

---

## 4. Điều Hướng & Tài Liệu Liên Quan

- 🏷️ **Về MOC Kho ICD-10:** [[MOC - Kho ICD-10|MOC - Kho ICD-10]]
- 🛡️ **Sổ tay chống xuất toán BHYT:** [[ICD10_So_Tay_Chong_Xuat_Toan_BHYT_Va_Bay_Loi|Sổ Tay 50+ Bẫy Lỗi Giám Định BHYT & Giải Pháp Phòng Ngừa Xuất Toán]]
- 📖 **Quy tắc mã hóa bệnh chính & kèm theo:** [[ICD10_Quy_Tac_Ma_Hoa_Benh_Chinh_Va_Kem_Theo|Hướng Dẫn Quy Tắc Mã Hóa Bệnh Chính & Bệnh Kèm Theo Theo Chuẩn Bộ Y Tế]]
- 🏠 **Về Master MOC:** [[MOC - Kho Kiến Thức Y Khoa|Master MOC — Kho Kiến Thức Y Khoa]]
