---
title: "Hướng Dẫn Quy Tắc Mã Hóa Bệnh Chính & Bệnh Kèm Theo Theo Chuẩn Bộ Y Tế"
aliases: ["Quy tắc mã hóa ICD-10", "Hướng dẫn QĐ 1849", "Mã bệnh chính ICD-10", "Dấu chữ thập hoa thị ICD", "Chống xuất toán BHYT ICD"]
keywords: ["mã hóa bệnh chính", "bệnh kèm theo", "ICD-10", "dấu chữ thập", "dấu hoa thị", "QĐ 1849/QĐ-BYT", "BHYT", "xuất toán"]
icd10: ["A00-Z99"]
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - he-co-quan/tong-quat
type: "icd10"
context: "noi-tru"
readTime: "10-12 phút"
updated: "2026-09-07"
---

# Hướng Dẫn Quy Tắc Mã Hóa Bệnh Chính & Bệnh Kèm Theo Theo Chuẩn Bộ Y Tế

> [!NOTE]
> **Văn bản pháp quy:** Quyết định số 1849/QĐ-BYT của Bộ Y tế về Hướng dẫn Chẩn đoán và Mã hóa bệnh tật theo ICD-10 | **Đối tượng:** Bác sĩ điều trị, Giám định viên BHYT, Nhân viên phòng Kế hoạch Tổng hợp & Thống kê Y tế.

---

## 1. Định Nghĩa Bệnh Chính & Bệnh Kèm Theo (Theo WHO & Bộ Y Tế)

### 1.1. Chẩn Đoán Bệnh Chính (Principal Diagnosis)
Là tình trạng bệnh lý được xác định sau khi kết thúc đợt thăm khám hoặc điều trị, là **nguyên nhân chủ yếu khiến người bệnh phải nhập viện hoặc sử dụng các dịch vụ chăm sóc y tế**.
- Nếu có nhiều hơn một tình trạng bệnh lý đáp ứng tiêu chuẩn trên, bác sĩ phải chọn tình trạng bệnh **tiêu tốn nhiều nguồn lực y tế nhất** (thời gian nằm viện dài nhất, chi phí can thiệp/phẫu thuật cao nhất).
- Nếu không xác định được chẩn đoán xác định khi ra viện, chọn **triệu chứng chủ yếu, dấu hiệu bất thường hoặc lý do nhập viện** làm bệnh chính.

### 1.2. Chẩn Đoán Bệnh Kèm Theo (Comorbidities & Complications)
- **Bệnh phối hợp (Comorbidities):** Các bệnh lý đã có sẵn từ trước khi nhập viện hoặc phát hiện trong đợt điều trị mà có ảnh hưởng đến việc chăm sóc, theo dõi hoặc làm tăng thời gian nằm viện.
- **Biến chứng (Complications):** Các tình trạng xuất hiện trong quá trình nằm viện phát sinh do diễn tiến của bệnh chính hoặc do hậu quả của quá trình can thiệp điều trị.

---

## 2. Hệ Thống Mã Kép Dấu Chữ Thập (†) & Dấu Hoa Thị (*)

Hệ thống mã hóa kép là nguyên tắc bắt buộc của WHO để phản ánh đồng thời **nguyên nhân bệnh sinh cốt lõi** và **biểu hiện cơ quan đích**:

| Ký Hiệu Quy Ước | Tên Gọi | Ý Nghĩa Chuyên Môn | Quy Tắc BHYT |
| :---: | :---: | :--- | :--- |
| **†** | **Mã Căn Nguyên (Dagger code)** | Mã hóa bệnh lý nguyên nhân, cơ chế bệnh sinh ban đầu | **ĐƯỢC** phép dùng làm Mã Bệnh Chính |
| ***** | **Mã Biểu Hiện (Asterisk code)** | Mã hóa biểu hiện tổn thương tại cơ quan đích cụ thể | **TUYỆT ĐỐI KHÔNG** được dùng làm Mã Bệnh Chính đơn độc |

### Ví Dụ Lâm Sàng Điển Hình:
1. **Bệnh võng mạc do đái tháo đường:**
   - Mã căn nguyên: `E11.3†` (Bệnh đái tháo đường không phụ thuộc insulin có biến chứng mắt) $\rightarrow$ **Mã bệnh chính**.
   - Mã biểu hiện: `H36.0*` (Bệnh võng mạc do đái tháo đường) $\rightarrow$ **Mã bệnh kèm**.
2. **Viêm màng não do lao:**
   - Mã căn nguyên: `A17.0†` (Lao màng não) $\rightarrow$ **Mã bệnh chính**.
   - Mã biểu hiện: `G01*` (Viêm màng não trong các bệnh vi khuẩn đã phân loại ở nơi khác) $\rightarrow$ **Mã bệnh kèm**.

---

## 3. Các Lỗi Mã Hóa Thường Bị Cơ Quan BHYT Xuất Toán & Biện Pháp Khắc Phục

> [!WARNING]
> Cơ quan Bảo hiểm Xã hội sử dụng phần mềm giám định tự động quét đối chiếu các quy tắc mã hóa sau đây:

1. **Lỗi 1: Đặt mã triệu chứng (Chương XVIII: R00–R99) làm bệnh chính khi đã có chẩn đoán xác định:**
   - *Sai:* Bệnh chính: `R07.4` (Đau ngực không xác định) trong khi bệnh nhân đã được chẩn đoán xác định là Nhồi máu cơ tim cấp `I21.9`.
   - *Đúng:* Bệnh chính: `I21.9`; không cần gán mã đau ngực nếu nó là triệu chứng điển hình của bệnh chính.
2. **Lỗi 2: Không đồng nhất giữa giới tính và mã bệnh:**
   - Sử dụng mã bệnh sản phụ khoa (`O00–O99`, `N70–N98`) cho bệnh nhân nam giới.
   - Sử dụng mã tiền liệt tuyến (`N40–N51`) cho bệnh nhân nữ giới.
3. **Lỗi 3: Thiếu mã nguyên nhân ngoại lai (V01–Y98) cho các ca chấn thương (S00–T98):**
   - Mọi chẩn đoán chấn thương, ngộ độc (Chương XIX) **bắt buộc phải kèm theo ít nhất 01 mã nguyên nhân ngoại lai** (Chương XX) để xác định tai nạn giao thông, tai nạn lao động hay tai nạn sinh hoạt làm căn cứ hưởng BHYT.

---

## 4. Tài Liệu Tham Khảo & Điều Hướng

- 📖 **Chi tiết quy tắc chấn thương & ngộ độc:** [[ICD10_Quy_Tac_Ma_Hoa_Chan_Thuong_Ngo_Doc|Quy Tắc Mã Hóa Chấn Thương, Vết Thương & Ngộ Độc (Chương XIX & XX)]]
- 🛡️ **Sổ tay chống xuất toán:** [[ICD10_So_Tay_Chong_Xuat_Toan_BHYT_Va_Bay_Loi|Sổ Tay 50+ Bẫy Lỗi Giám Định BHYT & Giải Pháp Phòng Ngừa Xuất Toán]]
- 🏷️ **Về MOC Kho ICD-10:** [[MOC - Kho ICD-10|MOC - Kho ICD-10]]
- 🏠 **Về Master MOC:** [[MOC - Kho Kiến Thức Y Khoa|Master MOC — Kho Kiến Thức Y Khoa]]
