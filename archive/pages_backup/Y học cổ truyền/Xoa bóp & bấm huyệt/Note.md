1. Bản mô tả dữ liệu (Data Schema cho AI)
Cung cấp cho AI cấu trúc bảng (Table) để nó hiểu cách tổ chức dữ liệu y khoa.

Bảng Acupoints (Huyệt vị):

id: Khóa chính (Ví dụ: LI4, ST36).

name_vi: Tên Hán-Việt (Ví dụ: Hợp Cốc).

name_pinyin: Bính âm & Chữ Hán gốc.

meridian_id: Thuộc kinh mạch nào (Khóa ngoại kết nối sang bảng Kinh Mạch).

anatomy_location: Vị trí mô tả theo mốc giải phẫu học hiện đại.

anatomy_depth: Cấu trúc giải phẫu chiều sâu (cơ, thần kinh, mạch máu đi qua).

clinical_indications: Chủ trị (tác dụng điều trị).

coordinates: Tọa độ vị trí (x, y cho 2D hoặc x, y, z cho 3D).

Bảng Meridians (Kinh mạch):

id: Ký hiệu kinh mạch (Ví dụ: LU, LI, ST).

name: Tên đường kinh (Ví dụ: Kinh Thủ Thái Âm Phế).

path_data: Tọa độ các đoạn thẳng nối với nhau để vẽ đường kinh trên giao diện.

2. Đặc tả giao diện và Các lớp hiển thị (UI Layering)
Yêu cầu AI hình dung giao diện trực quan cần xây dựng bao gồm những gì:

Hệ thống phân vùng (Body Regions): Chia cơ thể thành các vùng lớn để tối ưu tải dữ liệu (Đầu-Mặt-Cổ, Ngực-Bụng, Lưng-Mông, Chi trên, Chi dưới).

Cấu trúc 4 lớp nền (Layer Toggling):

Lớp 1 (Base): Giải phẫu học hiện đại (Da -> Cơ -> Xương -> Mạch máu/Thần kinh).

Lớp 2: Hệ thống đường kinh mạch (Vẽ bằng đường nối SVG Path hoặc 3D Line).

Lớp 3: Điểm huyệt vị (Các nút tròn tương tác đặt đúng tọa độ).

Lớp 4: Bản đồ nhiệt (Heatmap) cảnh báo vùng nguy hiểm khi châm cứu (nơi có mạch máu lớn hoặc tạng phủ nằm sát bề mặt).

3. Đặc tả Logic tương tác (Interaction & State Management)
Mô tả cho AI cách xử lý các sự kiện từ phía người dùng (User Events):

Hành vi 1 (Zoom & Filter): Khi người dùng chọn vùng "Chi trên" ➔ Giao diện tự động phóng to vào tay, ẩn toàn bộ huyệt các vùng khác, đồng thời gửi API request lấy danh sách huyệt thuộc vùng chi trên.

Hành vi 2 (Hover/Highlight): Khi hover chuột vào đường kinh mạch ➔ Đường kinh đó sáng lên, tất cả các huyệt thuộc kinh đó sẽ đổi màu để người dùng dễ theo dõi lộ trình.

Hành vi 3 (Click & Fetch): Khi click vào một điểm huyệt ➔ Mở Sidebar hiển thị chi tiết dữ liệu giải phẫu + chủ trị của huyệt đó; đồng thời làm mờ (opacity 0.3) các lớp giải phẫu không liên quan để làm nổi bật vị trí kim châm.

4. Đặc tả luồng dữ liệu (Data Flow & API Endpoints)
Quy định cách ứng dụng giao tiếp giữa Front-end và Back-end:

GET /api/meridians: Lấy danh sách và lộ trình 14 đường kinh mạch để vẽ lên bản đồ.

GET /api/acupoints?region={vung_co_the}: Tải nhanh các huyệt thuộc một vùng cụ thể khi người dùng zoom-in.

GET /api/acupoints/{id}: Truy xuất toàn bộ thông tin chi tiết của một huyệt khi được click chọn.