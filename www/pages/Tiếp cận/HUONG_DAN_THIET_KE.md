# Quy chuẩn Thiết kế & Biên soạn Lưu đồ Tiếp cận Lâm sàng (CliniPortal)

Phân hệ **Tiếp cận** (`pages/Tiếp cận/`) chuyên về các thuật toán chẩn đoán và phác đồ xử trí cấp cứu dưới dạng lưu đồ tương tác sinh động (Interactive Flowcharts). Tài liệu này hướng dẫn các nhà phát triển và tác nhân AI xây dựng các lưu đồ tiếp theo đồng bộ 100% với giao diện hệ thống.

---

## 📁 1. Quy tắc Đường dẫn Tương đối (Relative Paths)
Vị trí tệp tin quyết định độ lùi cấp đường dẫn liên kết tài nguyên hệ thống:
- **Nếu tệp nằm ở gốc thư mục Tiếp cận** (Ví dụ: `pages/Tiếp cận/tiep-can-moi.html`): Lùi **2 cấp** (`../../`).
  - *Ví dụ:* `../../css/main.css`, `../../components/header.js`, `../../js/flowchart.js`.
- **Nếu tệp nằm trong các thư mục con phân nhóm** (Ví dụ: `pages/Tiếp cận/1. Cấp cứu & Hồi sức chấn thương/phac-do.html`): Lùi **3 cấp** (`../../../`).
  - *Ví dụ:* `../../../css/main.css`, `../../../components/header.js`, `../../../js/flowchart.js`.

---

## 📐 2. Bố cục HTML Chuẩn (Flowchart Boilerplate)

Dưới đây là mã nguồn khung chuẩn của một trang lưu đồ tương tác:

```html
<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[Mô tả thuật toán xử trí y khoa ngắn gọn]">
  <title>[Tên phác đồ tiếp cận] – CliniPortal</title>

  <!-- Google Fonts & FontAwesome -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

  <!-- CSS Core CliniPortal (Thay đổi độ lùi cấp tương đối phù hợp) -->
  <link rel="stylesheet" href="../../../css/reset.css">
  <link rel="stylesheet" href="../../../css/main.css">
  <link rel="stylesheet" href="../../../css/components/header.css">
  <link rel="stylesheet" href="../../../css/components/sidebar.css">
  <link rel="stylesheet" href="../../../css/components/footer.css">
  <link rel="stylesheet" href="../../../css/components/flowchart.css">

  <!-- Scripts điều hành hệ thống -->
  <script src="../../../components/header.js"></script>
  <script src="../../../components/footer.js"></script>
</head>

<body>
  <div id="header-placeholder" data-header-path="../../../components/header.html"></div>
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <div class="app-container">
    <!-- SIDEBAR HỆ THỐNG -->
    <aside class="app-sidebar" id="appSidebar">
      <!-- Mẫu nạp menu điều hướng chính -->
    </aside>

    <!-- KHUNG CHỨA LƯU ĐỒ -->
    <main class="main-wrapper flow-page">
      <!-- BREADCRUMB -->
      <nav aria-label="Breadcrumb" class="breadcrumb-container">
        <ol class="breadcrumb-list">
          <li class="breadcrumb-item"><a href="../../../index.html" class="breadcrumb-link"><span class="home-icon">🏠</span> Home</a></li>
          <li class="breadcrumb-item"><a href="../tiep-can.html" class="breadcrumb-link">Tiếp cận</a></li>
          <li class="breadcrumb-item active" aria-current="page">[Tên phác đồ]</li>
        </ol>
      </nav>

      <!-- HERO BANNER -->
      <div class="flow-hero">
        <div class="hero-badge">📋 Thuật Toán Tiếp Cận</div>
        <h1>[TÊN PHÁC ĐỒ / THUẬT TOÁN TIẾP CẬN]</h1>
        <p>[Mô tả mục tiêu y khoa của phác đồ, hỗ trợ quyết định chẩn đoán hoặc điều trị nhanh tại giường bệnh]</p>
      </div>

      <!-- BỘ CHUYỂN TABS SƠ ĐỒ (Nếu bài học chia làm nhiều phần, ví dụ Chẩn đoán vs. Điều trị) -->
      <div class="flow-tabs">
        <button class="flow-tab-btn active" id="tab-btn-chan-doan" onclick="switchPane('chan-doan')">
          <span class="tab-dot"></span> Sơ đồ 1: Tiếp cận Chẩn đoán
        </button>
        <button class="flow-tab-btn tab-danger" id="tab-btn-xu-tri" onclick="switchPane('xu-tri')">
          <span class="tab-dot"></span> Sơ đồ 2: Hướng dẫn Xử trí
        </button>
      </div>

      <!-- CHÚ GIẢI MÀU SẮC (Legend) -->
      <div class="flow-legend">
        <div class="legend-item"><div class="legend-dot" style="background:linear-gradient(135deg, #1e3a5f, #3f51b5)"></div> Bắt đầu</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--c-danger-b)"></div> Cấp cứu khẩn</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--c-warn-b)"></div> Cảnh báo / Theo dõi</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--c-info-b)"></div> Cận lâm sàng / Thăm dò</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--c-ok-b)"></div> Ổn định / Ra viện</div>
      </div>

      <!-- VÙNG VẼ LƯU ĐỒ (Flow Canvas) -->
      <div class="flow-canvas-wrapper">
        <!-- PANE 1: CHẨN ĐOÁN -->
        <div class="flow-pane active" id="pane-chan-doan">
          <div class="flow-col">
            
            <!-- 1. Node Bắt đầu -->
            <div class="fnode fnode-start">
              <div class="fnode-tag">Bước 1 • Tiếp nhận</div>
              <div class="fnode-title">[Triệu chứng nghi ngờ ban đầu]</div>
              <p class="fnode-body">Kiểm tra sinh hiệu, đánh giá tổng trạng lâm sàng.</p>
            </div>

            <!-- Mũi tên kết nối -->
            <div class="flow-connector">
              <div class="flow-connector-line"></div>
              <div class="flow-connector-arrow"></div>
            </div>

            <!-- 2. Node Hỏi / Quyết định (Dạng clickable để click xổ chi tiết) -->
            <div class="fnode fnode-question clickable" onclick="toggleNode(this)">
              <div class="fnode-tag">Bước 2 • Đánh giá</div>
              <div class="fnode-title">[Câu hỏi phân loại lâm sàng?]</div>
              <p class="fnode-body">Nhấp để xem các tiêu chuẩn đánh giá chi tiết.</p>
              <div class="fnode-expand-hint"><span class="expand-icon">▼</span> Nhấp để xem chi tiết tiêu chuẩn</div>
              
              <!-- Khung chi tiết ẩn bên dưới -->
              <div class="fnode-details">
                <div class="detail-box">
                  <div class="detail-box-title">🔍 Các dấu hiệu cần kiểm tra:</div>
                  <ul>
                    <li>Dấu hiệu A: ...</li>
                    <li>Dấu hiệu B: ...</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Mũi tên kết nối -->
            <div class="flow-connector">
              <div class="flow-connector-line"></div>
              <div class="flow-connector-arrow"></div>
            </div>

            <!-- 3. Rẽ Nhánh Phân Loại (CÓ / KHÔNG) -->
            <div class="flow-branch">
              
              <!-- Nhánh TRÁI (Đáp ứng CÓ) -->
              <div class="flow-branch-side">
                <div class="flow-connector-label fc-yes">CÓ</div>
                <div class="flow-connector">
                  <div class="flow-connector-line"></div>
                  <div class="flow-connector-arrow"></div>
                </div>
                
                <!-- Node Cấp cứu khẩn cấp (Màu đỏ chớp sáng nhẹ) -->
                <div class="fnode fnode-danger pulse-danger clickable" onclick="toggleNode(this)">
                  <div class="fnode-tag">Cấp cứu</div>
                  <div class="fnode-title">🚨 Xử trí Cấp cứu khẩn cấp</div>
                  <p class="fnode-body">Thực hiện xử trí theo phác đồ hồi sức ngay lập tức.</p>
                  <div class="fnode-expand-hint"><span class="expand-icon">▼</span> Xem phác đồ hồi sức giờ đầu</div>
                  
                  <div class="fnode-details">
                    <div class="detail-box">
                      <div class="detail-box-title">⚡ Các hành động cấp thiết:</div>
                      <ul>
                        <li>Hành động 1: ...</li>
                        <li>Hành động 2: ...</li>
                      </ul>
                      <button class="btn-flow btn-danger" style="margin-top: 10px;" onclick="switchPane('xu-tri')">
                        Chuyển sang Phác đồ xử trí
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Nhánh PHẢI (Đáp ứng KHÔNG) -->
              <div class="flow-branch-side">
                <div class="flow-connector-label fc-no">KHÔNG</div>
                <div class="flow-connector">
                  <div class="flow-connector-line"></div>
                  <div class="flow-connector-arrow"></div>
                </div>

                <!-- Node Khảo sát CLS (Màu xanh dương nhạt) -->
                <div class="fnode fnode-info clickable" onclick="toggleNode(this)">
                  <div class="fnode-tag">Thăm dò</div>
                  <div class="fnode-title">🔬 Cho làm xét nghiệm thăm dò</div>
                  <p class="fnode-body">Chỉ định cận lâm sàng để tìm nguyên nhân chính xác.</p>
                  <div class="fnode-expand-hint"><span class="expand-icon">▼</span> Xem danh mục CLS đề nghị</div>
                  <div class="fnode-details">
                    <div class="detail-box">
                      <div class="detail-box-title">📋 Cận lâm sàng cần thiết:</div>
                      <ul>
                        <li>Xét nghiệm 1: ...</li>
                        <li>Hình ảnh học 2: ...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div><!-- Hết nhánh rẽ -->

          </div>
        </div><!-- Hết Pane 1 -->

        <!-- PANE 2: XỬ TRÍ -->
        <div class="flow-pane" id="pane-xu-tri">
          <div class="flow-col">
            <div class="fnode fnode-start">
              <div class="fnode-tag">Bước 1 • Khởi trị</div>
              <div class="fnode-title">[Phác đồ xử trí cấp cứu]</div>
              <p class="fnode-body">Tiến hành bù dịch, dùng kháng sinh hoặc thuốc vận mạch.</p>
            </div>
          </div>
        </div><!-- Hết Pane 2 -->

      </div>
    </main>
  </div>

  <div id="footer-placeholder" data-footer-path="../../../components/footer.html"></div>

  <!-- Nạp script điều khiển -->
  <script src="../../../js/sidebar.js"></script>
  <script src="../../../js/flowchart.js"></script>
</body>
</html>
```

---

## 📖 3. Bố cục HTML Chuẩn (Clinical Article Boilerplate) - Dành cho Tiếp cận Bệnh lý

Ngoài dạng Lưu đồ tương tác ở trên, phân hệ "Tiếp cận" còn sử dụng **Dạng Bài đọc (Clinical Article)** dành riêng cho các bài **Tiếp cận Bệnh lý cụ thể** (Ví dụ: Tiếp cận Sốt xuất huyết Dengue, Tiếp cận Bệnh thận mạn). 

Dạng bài này kết hợp giao diện của phân hệ Sinh lý, bao gồm **thanh cuộn Mục lục tự động (TOC)** và cấu trúc nội dung **7 phần tiêu chuẩn**. Hệ thống đã cung cấp sẵn tệp mẫu `TEMPLATE_TIEP_CAN_BENH_LY.html` tại thư mục gốc của phân hệ Tiếp cận.

### Cấu trúc 7 phần bắt buộc (`h2.section-title`):
1. **Tổng quan & Dịch tễ học**: Định nghĩa và dịch tễ.
2. **Cơ chế bệnh sinh**: Sử dụng `.clinical-note-box` màu vàng (`var(--color-warning)`) để nhấn mạnh cơ chế lõi.
3. **Nguyên nhân**: Liệt kê nguyên nhân.
4. **Lâm sàng & Cận lâm sàng**: Phân chia rõ triệu chứng và xét nghiệm đề nghị.
5. **Chẩn đoán**: Bao gồm tiêu chuẩn chẩn đoán, chẩn đoán phân biệt, và chèn `.image-placeholder-card` cho Sơ đồ chẩn đoán.
6. **Điều trị**: Cụ thể hóa bằng lưới các thẻ thuốc `.physio-grid-card` và hộp cảnh báo sai lầm màu đỏ (`var(--color-rose)`).
7. **Biến chứng & Tiên lượng**.

### Yêu cầu Tài nguyên Hệ thống:
Khi sử dụng dạng bài đọc này, bạn KHÔNG nạp `flowchart.css` hay `flowchart.js`. Thay vào đó, phải nạp các thành phần sau:
- **CSS**: `physio-patho.css`, `physio-headings.css`, `physio-content.css`, `toc.css`
- **JS**: `toc.js`

---

## 🎨 4. Quy chuẩn Thiết kế các Node (`.fnode`) cho Lưu đồ

Mỗi khối thông tin (Node) trong lưu đồ đại diện cho một trạng thái sinh lý/hành động y khoa, được chuẩn hóa màu sắc như sau:
1. **Node Bắt đầu (`.fnode-start`)**: Thiết lập trạng thái tiếp nhận, màu xanh lục đậm chuyển sắc (`linear-gradient(135deg, #1e3a5f, #3f51b5)`).
2. **Node Câu hỏi (`.fnode-question`)**: Dùng cho các điểm rẽ nhánh đưa ra lựa chọn, màu trắng xám.
3. **Node Khẩn cấp (`.fnode-danger`)**: Thể hiện các hành động hồi sức khẩn cấp, đe dọa tính mạng. Tích hợp hiệu ứng chớp tắt chậm (`.pulse-danger`) để thu hút sự chú ý.
4. **Node Cảnh báo (`.fnode-warn`)**: Dùng khi cần theo dõi sát, chưa đến mức nguy kịch, màu vàng cam.
5. **Node Cận lâm sàng (`.fnode-info`)**: Dành cho các chỉ định xét nghiệm, siêu âm, X-quang, màu xanh dương nhẹ.
6. **Node Ổn định (`.fnode-ok`)**: Thể hiện tình trạng an toàn, có thể điều trị ngoại trú hoặc xuất viện, màu xanh lá cây nhạt.

---

## ⚡ 5. Tương tác Động bằng Javascript cho Lưu đồ
- **Chuyển đổi sơ đồ (`switchPane`)**: Được thực hiện thông qua hàm `switchPane(paneId)`. Nút bấm tab chuyển tiếp phải gọi hàm này và truyền chính xác ID của `.flow-pane` tương ứng.
- **Xem chi tiết (`toggleNode`)**: Thẻ nào muốn click mở rộng thông tin chi tiết bắt buộc phải có thuộc tính `class="... clickable" onclick="toggleNode(this)"`, đi kèm với cấu trúc `.fnode-expand-hint` và `.fnode-details` đặt bên trong nó.
- Cả hai logic động này đều đã được đóng gói sẵn trong tệp `js/flowchart.js` của hệ thống, tuyệt đối không được viết đè hoặc định nghĩa lại hàm trong tệp nội dung.
