---
title: "Lộ Trình & So Sánh Chuyển Đổi ICD-10 Sang ICD-11 (WHO & Định Hướng Bộ Y Tế)"
aliases:
  - "Chuyển đổi ICD-11"
  - "So sánh ICD-10 và ICD-11"
  - "Cấu trúc mã ICD-11"
  - "Post-coordination ICD-11"
keywords:
  - "icd-11"
  - "icd-10"
  - "who"
  - "chuyển đổi icd"
  - "stem code"
  - "extension code"
  - "post-coordination"
  - "y học cổ truyền"
  - "an toàn người bệnh"
  - "emr"
  - "his"
icd10:
  - "A00-U99"
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - he-co-quan/tong-quat
type: "icd10"
context: "noi-tru"
readTime: "12-15 phút"
updated: "2026-09-07"
---

# Lộ Trình & So Sánh Chuyển Đổi ICD-10 Sang ICD-11 (WHO & Định Hướng Bộ Y Tế)

> [!NOTE]
> **Bối cảnh quốc tế:** Phiên bản Phân loại Quốc tế Bệnh tật lần thứ 11 (ICD-11) đã được Đại hội đồng Y tế Thế giới (WHA) thông qua và chính thức có hiệu lực toàn cầu từ tháng 01/2022 | **Định hướng Việt Nam:** Bộ Y tế đang xây dựng đề án, thử nghiệm thí điểm bảng ánh xạ song song (Dual-coding) ICD-10 – ICD-11 để chuẩn bị cho lộ trình chuyển đổi toàn diện hệ thống Bệnh án Điện tử (EMR) và Giám định BHYT.

---

## 1. Tại Sao Thế Giới Phải Chuyển Đổi Từ ICD-10 Sang ICD-11?

Hệ thống ICD-10 ra đời từ năm 1990 (đã hơn 35 năm tuổi), bộc lộ nhiều hạn chế lớn trong kỷ nguyên y học chính xác và chuyển đổi số y tế:
1. **Thiếu không gian mã hóa:** Nhiều phân hệ bệnh lý (ung bướu, miễn dịch, di truyền học) đã hết khoảng trống để bổ sung mã mới.
2. **Kém linh hoạt:** Không thể mô tả chi tiết vị trí tổn thương (bên trái, bên phải, hai bên), độ mô học của khối u, hoặc cơ chế kháng thuốc nếu không tạo thêm hàng loạt mã dài dòng.
3. **Chưa số hóa thực sự:** ICD-10 được thiết kế ban đầu trên sách in giấy, việc tích hợp vào hệ thống máy tính bệnh viện (HIS/LIS/RIS) thường mang tính gượng ép.
4. **ICD-11 ra đời với triết lý Native Digital:** Toàn bộ kiến trúc ICD-11 được xây dựng dưới dạng Đồ thị tri thức (Knowledge Graph), hỗ trợ API RESTful, tìm kiếm ngữ nghĩa (Semantic Search) và mã hóa đa chiều.

---

## 2. So Sánh Kiến Trúc Cấu Trúc Mã: ICD-10 vs ICD-11

| Đặc Điểm Kiến Trúc | ICD-10 (Phiên Bản Hiện Tại) | ICD-11 (Phiên Bản Thế Hệ Mới) |
|:---|:---|:---|
| **Cấu trúc mã cơ bản** | 1 Chữ cái + 2 Chữ số + Dấu chấm + Số thập phân (VD: `E11.9`) | 4 Ký tự kết hợp (Ký tự thứ hai **luôn là một chữ cái** để tránh nhầm số) (VD: `5A11`) |
| **Quy tắc chống nhầm lẫn** | Dễ nhầm giữa chữ `I` và số `1`, chữ `O` và số `0` | **Loại bỏ hoàn toàn** chữ `I` và chữ `O` khỏi hệ thống ký tự để tránh nhầm lẫn thị giác |
| **Tổng số chương bệnh** | **22 Chương** (từ I đến XXII) | **26 Chương** (bổ sung các chương độc lập mới) |
| **Cơ chế biểu đạt** | Đơn chiều (Pre-coordination) — một mã cố định | Đa chiều (**Post-coordination / Cluster coding**) |
| **Mã bổ trợ chi tiết** | Hạn chế, phụ thuộc vào ký tự thứ 4, thứ 5 | Hệ thống mã mở rộng riêng biệt (**Extension codes - X-codes**) |
| **Tích hợp phần mềm** | Tra cứu từ điển phẳng | Hỗ trợ API chuẩn WHO, nhúng trực tiếp vào EMR |

---

## 3. Cơ Chế Đột Phá Của ICD-11: Mã Chùm (Cluster Coding & Post-Coordination)

Trong ICD-11, một chẩn đoán lâm sàng phức tạp có thể được ghép nối từ một **Mã Gốc (Stem Code)** và nhiều **Mã Mở Rộng (Extension Code)** thông qua các ký tự liên kết:
- Ký tự `&`: Biểu thị mối quan hệ kết hợp (VD: Gãy xương kèm tổn thương mạch máu).
- Ký tự `/`: Biểu thị mối quan hệ phân cấp / thuộc tính (VD: Khối u / Vị trí giải phẫu bên trái).

### Ví dụ đối sánh thực tế:
- **Chẩn đoán:** *Gãy kín đầu dưới xương đùi bên trái do tai nạn xe máy khi đang điều khiển xe trên đường quốc lộ*.
- **ICD-10:** Cần dùng `S72.4` (Gãy đầu dưới xương đùi - không thể hiện được bên trái hay phải) + `V29.4` + `Y92.4`.
- **ICD-11 (Post-coordination):**
  - Mã gốc: `NC34.2` (Gãy đầu dưới xương đùi).
  - Mã mở rộng bên cơ thể: `XK8G` (Bên trái - Left).
  - Mã mở rộng gãy kín: `XK9J` (Gãy kín - Closed fracture).
  - Chuỗi mã chùm: **`NC34.2/XK8G/XK9J & PA00.4`**.
  $\rightarrow$ Mô tả chính xác 100% tình trạng lâm sàng mà không cần hàng chục trang văn bản giải thích.

---

## 4. Các Chương Mới Được Bổ Sung Trong ICD-11

ICD-11 bổ sung các chuyên khoa và khía cạnh y học chưa từng có trong ICD-10:

### 4.1. Chương 26: Các Tình Trạng Trong Y Học Cổ Truyền (Traditional Medicine)
- Đây là lần đầu tiên trong lịch sử, Tổ chức Y tế Thế giới chính thức chuẩn hóa phân loại bệnh tật theo Đông y (Traditional Chinese Medicine, Kampo, Y học cổ truyền Việt Nam).
- Cho phép các bệnh viện Y học cổ truyền mã hóa các thể bệnh: *Chứng Tỳ vị hư hàn, Can khí uất kết, Thận âm hư...* song song với mã bệnh học Tây y.

### 4.2. Chương 23: Nguyên Nhân Gây Hại Trong An Toàn Người Bệnh (Patient Safety)
- Phân loại có hệ thống các sự cố y khoa (Medical errors, Adverse events):
  - Nhầm lẫn thuốc, nhầm liều lượng.
  - Nhiễm khuẩn bệnh viện (HAI).
  - Sự cố liên quan đến trang thiết bị y tế (lỗi máy thở, lỗi máy chạy thận).
  - Sự cố phẫu thuật (nhầm vị trí phẫu thuật, tụt sonde).

### 4.3. Chương 07: Rối Loạn Giấc Ngủ - Thức (Sleep-Wake Disorders)
- Tách khỏi chương Tâm thần kinh của ICD-10 thành một chương độc lập: Hội chứng ngưng thở khi ngủ tắc nghẽn (OSA), Mất ngủ mạn tính, Chứng ngủ rũ (Narcolepsy).

### 4.4. Chương 17: Các Tình Trạng Liên Quan Đến Sức Khỏe Tình Dục
- Phân định rõ ràng các rối loạn chức năng tình dục, đau khi giao hợp, và phi bệnh lý hóa các vấn đề về xu hướng tính dục.

---

## 5. Bảng Đối Chiếu Mã Một Số Bệnh Lý Thường Gặp (ICD-10 vs ICD-11)

| Tên Bệnh Lý Lâm Sàng | Mã ICD-10 | Mã ICD-11 (Stem Code) |
|:---|:---:|:---:|
| **Tăng huyết áp nguyên phát** | `I10` | **`BA00`** |
| **Đái tháo đường Type 2** | `E11` | **`5A11`** |
| **Đái tháo đường Type 1** | `E10` | **`5A10`** |
| **Nhồi máu cơ tim cấp** | `I21` | **`BA41`** |
| **Nhồi máu não (Đột quỵ thiếu máu cục bộ)** | `I63` | **`8B11`** |
| **Xuất huyết nội sọ** | `I61` | **`8B00`** |
| **Bệnh phổi tắc nghẽn mạn tính (COPD)** | `J44` | **`CA22`** |
| **Hen phế quản** | `J45` | **`CA23`** |
| **Bệnh thận mạn (CKD)** | `N18` | **`GB61`** |
| **COVID-19** | `U07.1` | **`RA01`** |

---

## 6. Khuyến Nghị Chuẩn Bị Cho Bệnh Viện & Bác Sĩ Lâm Sàng

Để sẵn sàng khi Bộ Y tế ban hành lộ trình áp dụng chính thức ICD-11 tại Việt Nam:

1. **Đối với Bác sĩ lâm sàng:**
   - Tập thói quen ghi chép bệnh án đầy đủ thông tin giải phẫu: luôn ghi rõ bên (trái, phải, hai bên), thể giải phẫu bệnh, nguyên nhân chấn thương để dễ dàng chuyển dịch sang mô hình mã chùm Post-coordination.
2. **Đối với Phòng Kế hoạch tổng hợp & Công nghệ thông tin (IT):**
   - Đảm bảo phần mềm Bệnh án Điện tử (EMR) có khả năng lưu trữ mã linh hoạt dạng chuỗi (String dài hơn 20 ký tự thay vì giới hạn 5 ký tự như thời ICD-10).
   - Chuẩn bị tích hợp ICD-11 API thông qua dịch vụ đám mây của WHO (WHO ICD-11 API Service).
   - Thử nghiệm bảng ánh xạ song song (Dual-coding) đối với các mặt bệnh nội trú trọng điểm.
