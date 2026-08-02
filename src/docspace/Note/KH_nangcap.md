Dưới đây là kế hoạch chi tiết xây dựng ứng dụng web **"Sổ Tay Bệnh Phòng SOAP Digital"** đã được tái cấu trúc toàn bộ theo đúng các yêu cầu điều chỉnh giao diện, chuyên biệt hóa cột **Cận lâm sàng (CLS)** và định hướng **Tự động hóa nhập EMR (Auto-EMR Sync)**.

---

## 📐 Cấu Trúc Bảng Tổng Quan Bệnh Phòng (Cập Nhật Mới)

Giao diện Bảng Matrix được tinh chỉnh lại gọn gàng hơn, tối ưu hóa không gian cho việc theo dõi diễn tiến lâm sàng và kết quả cận lâm sàng:

| Cột 1: Bệnh Nhân | Cột 2: S & O (Triệu chứng) | Cột 3: CLS Cần Làm & KQ CLS | Cột 4: A (Đánh Giá) | Cột 5: P (Y Lệnh) |
| --- | --- | --- | --- | --- |
| **G01** - Nguyễn Văn A<br>

<br>*(65t - Nam)*<br>

<br>

<br>● *Chẩn đoán:* Viêm phổi thùy<br>

<br>● *Trạng thái:* <br>

<br>● Đã nhập EMR | ● Đã làm SOAP | **TCCN:** Hết sốt, còn ho húng hắng.<br>

<br>**TCTT:** Phổi giảm rấy ẩm 2 đáy. SpO2 97% (Khí trời). | **CLS cần làm:**<br>

<br>☐ Công thức máu<br>

<br>☐ Điện giải đồ<br>

<br>

<br>**KQ CLS:**<br>

<br>• WBC 8.5, Neu 65%<br>

<br>• **K+ 2.8 mEq/L (Tụt)** | Viêm phổi thùy N4 (Đáp ứng ĐT tốt).<br>

<br>

<br>**Biện luận:** Hạ Kali máu mức độ trung bình. | 1. Ceftriaxone 2g (IV) N4<br>

<br>2. Bù Kaliclorua 0.5g x 2 viên (Uống)<br>

<br>3. Tìm nguyên nhân hạ K+ |

---

## 📋 Kế Hoạch Chi Tiết 4 Giai Đoạn Triển Khai

### GIAI ĐOẠN 1: Thiết Kế Hạ Tầng Dữ Liệu (Supabase) & Kiến Trúc Kết Nối EMR

> **Mục tiêu:** Xây dựng cơ sở dữ liệu linh hoạt, phân tách rõ dữ liệu CLS và sẵn sàng cổng kết nối tự động với phần mềm EMR/HIS bệnh viện.

* **Công việc chi tiết:**

1. **Khởi Tạo Database Schema trên Supabase:**

* `patients`: ID, Họ tên, Tuổi, Giới tính, **Buồng/Giường**, Số bệnh án, **Trạng thái EMR** (`is_emr_entered`), **Trạng thái SOAP** (`soap_status`).
* `daily_soaps`: ID Bệnh nhân, Ngày, $S\_notes$ (TCCN & TCTT), $A\_assessment$ (Chẩn đoán/Đánh giá diễn tiến), $P\_plan$ (Y lệnh).
* `lab_trackings` *(Tách riêng để quản lý CLS)*:
* `cls_orders`: Danh sách CLS cần làm trong ngày.
* `cls_results`: Kết quả CLS thu được (`KQ CLS: ...`), hỗ trợ đánh dấu chỉ số bất thường (High/Low Alert).

1. **Thiết Kế Kiến Trúc Tự Động Nhập EMR (Auto-EMR Architecture):**

* Thiết kế chuẩn đầu ra dữ liệu (JSON Format) theo định dạng EMR chuẩn.
* Xây dựng sẵn **RESTful API / Webhooks** trên Supabase để giai đoạn sau có thể bắn dữ liệu trực tiếp vào hệ thống EMR hoặc thông qua script tự động (Browser Extension / Automa).

1. **Bảo Mật & Phân Quyền (Row Level Security):**

* Mã hóa thông tin cá nhân bệnh nhân, phân quyền truy cập theo từng Bác sĩ / Khoa phòng.

---

### GIAI ĐOẠN 2: Phát Triển Giao Diện Bảng SOAP Matrix & Module Theo Dõi CLS

> **Mục tiêu:** Hoàn thiện giao diện bảng tổng quan đúng cấu trúc mới và module theo dõi cận lâm sàng chuyên sâu.

* **Công việc chi tiết:**

1. **Phát Triển Cột "Bệnh Nhân" (Tích hợp Giường + Trạng Thái):**

* Hiển thị tập trung: Số Giường + Họ Tên + Chẩn đoán ban đầu + Tag Trạng thái (Đã làm SOAP / Chưa làm, Đã nhập EMR / Chưa nhập).
* Nút thao tác nhanh: Đổi trạng thái EMR 1-Click, mở nhanh chi tiết.

1. **Phát Triển Cột Độc Lập "CLS Cần Làm & KQ CLS":**

* Khối **CLS cần làm:** Dạng danh sách Checkbox (Check vào khi đã nhập máy/đã in).
* Khối **KQ CLS:** Dòng riêng để gõ/dán nhanh kết quả trả về. Tự động highlight màu nếu phát hiện từ khóa cảnh báo (như *hạ Kali, Creatinine tăng, Troponin T dương tính...*).

1. **Modal Edit Chi Tiết Bệnh Nhân:**

* Mở rộng không gian gõ SOAP đầy đủ.
* Tích hợp **Bộ đếm tự động ngày dùng thuốc / ngày bệnh** (VD: *Ceftriaxone N4/10*).
* Tích hợp **Mẫu Nhanh (Quick Templates)** cho các trường hợp bệnh ổn định.

1. **Tính Năng Đồng Bộ Realtime:**

* Đảm bảo khi gõ kết quả CLS trên điện thoại đi buồng, bảng trên máy tính phòng giao ban tự động cập nhật lập tức.

---

### GIAI ĐOẠN 3: Xây Dựng Module Nhận Bệnh Mới & Giải Pháp Tự Động Hóa EMR

> **Mục tiêu:** Tiếp nhận bệnh nhân mới nhanh chóng và triển khai công cụ đẩy dữ liệu tự động sang phần mềm EMR/HIS.

* **Công việc chi tiết:**

1. **Form "Nhận Bệnh Mới Into Ward":**

* Nhập nhanh: Họ tên, Tuổi, Giới, Giường/Phòng, Số Bệnh Án, Chẩn đoán vào khoa.
* Tự động thêm bệnh nhân vào Bảng Tổng Quan và khởi tạo bản ghi SOAP Ngày 1 ($N_1$).

1. **Giải Pháp Tự Động Nhập Sang Phần Mềm EMR (Auto-EMR Integration):**

* **Bước 1 (1-Click Copy Format):** Tạo nút sao chép thông minh, tự động gộp $S - O - CLS - A - P$ thành 1 đoạn văn bản chuẩn format EMR bệnh viện để dán thủ công nếu EMR đóng.
* **Bước 2 (Giải pháp Tự động hóa - Auto Fill):**
* Phát triển 1 **Browser Extension (Tện ích mở rộng Chrome/Edge)** hoặc **Kịch bản Automa**.
* Khi bác sĩ mở trang EMR bệnh viện và bấm nút *"Tự động điền EMR"*, Extension sẽ đọc dữ liệu từ Web SOAP via API và **tự động gõ/điền toàn bộ văn bản SOAP vào đúng các ô tương ứng trên phần mềm EMR** mà bác sĩ không cần thao tác copy-paste từng ô.

* Tự động đổi trạng thái sang `Đã nhập EMR` ngay khi quá trình đẩy dữ liệu hoàn tất.

---

### GIAI ĐOẠN 4: Cấu Hình PWA (Mobile), Offline Mode & Thử Nghiệm Lâm Sàng

> **Mục tiêu:** Đảm bảo web chạy mượt khi đi buồng thực tế bằng điện thoại/máy tính bảng và vận hành ổn định trong môi trường bệnh viện.

* **Công việc chi tiết:**

1. **Tối Ưu Giao Diện Mobile/Tablet:**

* Bảng Matrix tự động chuyển sang dạng **Thẻ (Cards View)** linh hoạt khi xem trên màn hình dọc điện thoại đi buồng.

1. **Cấu Hình PWA & Chế Độ Offline (Offline First):**

* Cho phép "Cài đặt" Web thành Ứng dụng trên màn hình điện thoại (iOS/Android).
* Lưu dữ liệu tạm thời vào bộ nhớ máy khi mất mạng Wi-Fi bệnh viện. Tự động đồng bộ lên Supabase ngay khi có lại kết nối.

1. **Thử Nghiệm Lâm Sàng & Tối Ưu UX:**

* Đưa vào vận hành thử nghiệm trong 2–3 ngày đi bệnh phòng thực tế.
* Rà soát quy trình theo dõi CLS (đặc biệt là tính tiện lợi khi phát hiện các chỉ số bất thường để điều chỉnh y lệnh $P$).
* Kiểm tra độ ổn định của tính năng tự động nhập EMR.

---

## 🗓️ Lộ Trình Triển Khai Dự Kiến

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Gđ 1] Hạ tầng Supabase & API EMR  (3 ngày)                            │
│ └──► [Gđ 2] UI Bảng Matrix mới & Module CLS (4-5 ngày)                 │
│      └──► [Gđ 3] Nhận bệnh mới & Extension Auto-EMR (4 ngày)           │
│           └──► [Gđ 4] PWA Mobile & Test thực tế (3 ngày)              │
└────────────────────────────────────────────────────────────────────────┘

```
