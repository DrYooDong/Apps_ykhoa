# 📖 Hướng Dẫn Sử Dụng & Tài Liệu Phân Hệ Guidelines

Phân hệ **Guidelines & Nghiên Cứu Lâm Sàng** (`Guidelines.html`) là một cấu phần quan trọng trong hệ sinh thái **CliniPortal**, được thiết kế chuyên biệt cho mục đích tra cứu, phân tích và đối chiếu các tài liệu hướng dẫn điều trị (trong nước & quốc tế) và các thử nghiệm lâm sàng dựa trên nguyên tắc **Y học chứng cứ (EBM)**.

---

## ✨ Giới Thiệu Phân Hệ

Phân hệ hỗ trợ bác sĩ lâm sàng và nghiên cứu viên trong việc:
*   **Tổng hợp đa nguồn**: Quản lý song song tài liệu trong nước (Bộ Y tế, các Sở Y tế, Hiệp hội chuyên khoa như Hội Tim mạch học Việt Nam - VNHA...) và nghiên cứu quốc tế.
*   **Phân tích Y học chứng cứ (EBM)**: Trích xuất và cấu trúc hóa các tiêu chí can thiệp, tiêu chí đánh giá chính và chỉ số thống kê từ nghiên cứu.
*   **So sánh thông tin trực quan**: Chọn và đối chiếu nhanh các nghiên cứu có cùng chỉ định hoặc hoạt chất để tìm ra giải pháp điều trị tối ưu nhất.

---

## 📊 Cấu Trúc Bảng Dữ Liệu (Data Schema)

Để phục vụ phân tích EBM, mỗi tài liệu/nghiên cứu trong phân hệ được cấu trúc hóa theo các trường dữ liệu sau:

| Trường dữ liệu | Tên cột hiển thị | Loại dữ liệu | Mô tả chi tiết | Ví dụ |
| :--- | :--- | :--- | :--- | :--- |
| `title` | Tên nghiên cứu / Tài liệu | `Text` (Bắt buộc) | Tên chính thức của tài liệu hướng dẫn hoặc nghiên cứu lâm sàng. | *EMPA-REG OUTCOME* |
| `drug` | Hoạt chất / Can thiệp | `Text` | Hoạt chất chính hoặc nhóm thuốc được nghiên cứu/khuyến cáo. | *Empagliflozin* |
| `sourceType` | Phân loại nguồn | `Dropdown` | Phân loại nguồn gốc xuất xứ tài liệu (gồm 5 loại). | *Bộ Y tế Việt Nam* |
| `specialty` | Chuyên khoa | `Dropdown` | Chuyên khoa y học áp dụng nghiên cứu. | *Tim mạch* |
| `design` | Thiết kế | `Dropdown` | Loại hình nghiên cứu hoặc tài liệu. | *Thử nghiệm lâm sàng (RCT)* |
| `intervention` | Can thiệp / Đối chứng | `Text` | Tóm tắt nhóm can thiệp và nhóm đối chứng (Placebo/Chuẩn điều trị). | *Empagliflozin 10mg vs Placebo* |
| `primaryEndpoint`| Tiêu chí chính | `Text` | Kết cục gộp chính đo lường hiệu quả điều trị. | *3-point MACE* |
| `keyResults` | Kết quả chính | `Text` (Monospace) | Tỷ số chênh lệch, khoảng tin cậy (CI) hoặc mức khuyến cáo. | *HR 0.86 (95% CI 0.74-0.99); p=0.04* |
| `impact` | Ảnh hưởng lâm sàng | `Dropdown` | Đánh giá mức độ thay đổi thực hành lâm sàng của tài liệu. | *Practice-Changing* |
| `sampleSize` | Cỡ mẫu | `Integer` | Tổng số lượng bệnh nhân tham gia thử nghiệm. | *7020* |
| `population` | Đối tượng nghiên cứu | `Text` | Đặc điểm và tiêu chuẩn lựa chọn bệnh nhân. | *Bệnh nhân ĐTĐ típ 2 nguy cơ TM cao* |
| `summary` | Kết luận cốt lõi | `Text` (Bắt buộc) | Tóm tắt ngắn gọn kết quả chính của tài liệu. | *Giảm 14% tiêu chí gộp chính MACE...* |
| `detailedConclusion`| Kết luận chi tiết | `Text` (Multi-line) | Các kết quả chi tiết của tiêu chí phụ, tác dụng phụ hoặc phân tích dưới nhóm. | *Tử vong tim mạch giảm 38%...* |
| `fdaStatus` | Phê duyệt / Khuyến cáo | `Text` | Trạng thái phê duyệt pháp lý hoặc phân độ khuyến cáo. | *FDA Approved 2016* |
| `sourceUrl` | Link nguồn | `URL` | Đường dẫn trực tiếp tới PubMed hoặc trang chủ đơn vị ban hành. | *https://www.nejm.org/...* |
| `file` | File HTML chi tiết | `Text` | Đường dẫn tương đối tới tệp báo cáo chuyên sâu offline trong hệ thống. | *studies/empa-reg.html* |
| `asianData` | Dữ liệu Châu Á | `Boolean` | Đánh dấu nếu nghiên cứu có nhóm bệnh nhân Châu Á để đối chiếu thực tế. | *Đã chọn (True)* |

---

## 🛠️ Các Tính Năng Giao Diện (UI Features)

### 1. Bộ Lọc Đa Chiều Nâng Cao
*   **Tìm kiếm nhanh**: Hỗ trợ tìm kiếm thời gian thực theo từ khóa trong tiêu đề, hoạt chất, kết luận, tiêu chí chính và đối tượng nghiên cứu.
*   **Bộ lọc thuộc tính**: Bấm vào nút **`Bộ lọc nâng cao`** để mở rộng các bộ lọc chuyên khoa, thiết kế nghiên cứu và thời gian công bố.
*   **Bộ lọc nhanh Châu Á & Yêu thích**: 
    - Lọc nhanh các nghiên cứu có dữ liệu bệnh nhân Châu Á bằng cách tích chọn checkbox tương ứng.
    - Chuyển sang Tab **`Đã lưu`** ở thanh điều hướng để xem riêng danh sách tài liệu y khoa bạn đã đánh dấu sao thích.

### 2. So Sánh Đối Chiếu Tài Liệu (Compare View)
*   **Bước 1**: Tích chọn vào hộp kiểm (Checkbox) ở đầu các dòng nghiên cứu muốn so sánh trong bảng danh sách.
*   **Bước 2**: Chuyển sang Tab **`So Sánh`** trên thanh công cụ chính (hoặc bấm vào huy hiệu số lượng tài liệu đang chọn ở góc phải).
*   **Bước 3**: Giao diện dạng cột sẽ hiển thị song song các tiêu chí của các tài liệu được chọn như *Can thiệp/Đối chứng*, *Tiêu chí chính*, *Kết quả chính*, *Cỡ mẫu*, và *Kết luận cốt lõi* giúp dễ dàng nhận diện điểm khác biệt.

### 3. Tùy Biến Bảng Hiển Thị (Display Customization)
*   Để tối ưu hóa không gian hiển thị trên các màn hình nhỏ (iPad/Mobile) hoặc khi cần tập trung phân tích chuyên sâu:
    - Bấm vào nút **`📊 Cột hiển thị`** ở góc trên bảng.
    - Bật/Tắt các cột dữ liệu theo nhu cầu. Bảng và các tiêu đề cột sẽ co giãn đồng bộ một cách thông minh.

---

## ☁️ Tích Hợp & Đồng Bộ Hóa Đám Mây (Supabase Integration)

Trang web hoạt động theo cơ chế **Offline-First**. Mặc định toàn bộ dữ liệu sẽ lưu trữ trong trình duyệt của bạn thông qua `LocalStorage`. Để lưu trữ lâu dài và đồng bộ hóa trên nhiều máy tính/thiết bị khác nhau, bạn nên cấu hình lưu trữ đám mây thông qua dịch vụ **Supabase** (miễn phí).

### Bước 1: Tạo Bảng trên Supabase Console
1. Truy cập [Supabase](https://supabase.com) và khởi tạo một Project.
2. Truy cập công cụ **SQL Editor** trong dự án của bạn.
3. Tạo một Query mới, sao chép toàn bộ đoạn mã SQL dưới đây rồi nhấn **Run**:

```sql
create table clinical_guidelines (
  id text primary key,
  title text not null,
  drug text,
  "sourceType" text,
  specialty text,
  design text,
  intervention text,
  "primaryEndpoint" text,
  "keyResults" text,
  impact text,
  year integer,
  organization text,
  phase text,
  "sampleSize" integer,
  population text,
  summary text,
  "detailedConclusion" text,
  "fdaStatus" text,
  "sourceUrl" text,
  file text,
  "asianData" boolean,
  bookmarked boolean,
  "createdAt" timestamp with time zone default timezone('utc'::text, now())
);
```

### Bước 2: Cấu Hình Kết Nối Trên Giao Diện CliniPortal
1. Tại Topnav của trang Hướng dẫn điều trị, bấm vào nút hiển thị trạng thái kết nối (ví dụ: **`Supabase: Local Mode`** ⚪).
2. Điền thông tin kết nối từ tài khoản Supabase của bạn (`Settings -> API`):
    - **Supabase Project URL** (địa chỉ URL của dự án)
    - **Supabase Anon Key** (khóa API công khai)
3. Nhấp **Lưu & Kết nối**.

### Bước 3: Trạng Thái Đồng Bộ
Nút trạng thái trên Topnav sẽ tự động chuyển màu để hiển thị trạng thái kết nối:
*   🟢 **Supabase: Connected / Synced**: Đã kết nối đám mây thành công. Dữ liệu mẫu ban đầu (nếu Supabase trống) sẽ tự động được tải lên đám mây (Seeding).
*   ⚪ **Supabase: Local Mode**: Chưa cấu hình URL/Key. Ứng dụng đọc/ghi dữ liệu từ `LocalStorage` ngoại tuyến trên thiết bị hiện tại.
*   🔴 **Supabase: Conn Error / Sync Failed**: Lỗi kết nối mạng hoặc sai thông tin API. Hệ thống tự động chuyển sang chế độ Local dự phòng để tránh gián đoạn công việc của bác sĩ.

---

## 📂 Cấu Trúc Tập Tin (File Architecture)

Phân hệ được tổ chức tinh gọn trong cấu trúc thư mục y học chứng cứ của dự án:
```text
pages/Y học chứng cứ/
├── yhcc.html (Cổng kết nối phân hệ Y học chứng cứ)
└── Guidelines/
    ├── Guidelines.html (Trang giao diện ứng dụng chính)
    └── README.md (Tài liệu hướng dẫn này)
```

> [!NOTE]
> Trang web tuân thủ thiết kế tĩnh (pure HTML/CSS/JS), không phụ thuộc vào Node.js hay bất kỳ framework cồng kềnh nào để đảm bảo tốc độ tải tức thì và có thể chạy trực tiếp bằng cách mở file (`file:///`) ngoại tuyến.
