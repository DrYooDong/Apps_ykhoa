---
name: Create Flowchart / Interactive Algorithm
description: Guides the creation of interactive clinical algorithms with nodes, connections, and expanding details panels.
---

# Kỹ năng Xây dựng Lưu đồ Thuật toán Lâm sàng Tương tác

Kỹ năng này điều khiển việc tạo lập hoặc cập nhật các sơ đồ phân tầng chẩn đoán và xử trí y khoa trong phân hệ **Tiếp cận**.

## 🛠️ Quy trình thực hiện:

### Bước 1: Nhúng stylesheet & script cho Flowchart
Đảm bảo thẻ `<head>` có các tài nguyên hỗ trợ lưu đồ:
- CSS: `<link rel="stylesheet" href="[relative_path]/css/components/flowchart.css">`
- JS (ở cuối trang hoặc defer): `<script src="[relative_path]/js/flowchart.js"></script>`

### Bước 2: Khai báo Switcher phân nhánh chính (nếu có)
Nếu lưu đồ có nhiều phần (Ví dụ: 1. Chẩn đoán ban đầu, 2. Xử trí hồi sức), hãy dùng bộ chuyển tab `.flow-tabs` và `.flow-pane` như sau:
```html
<div class="flow-tabs">
    <button class="flow-tab-btn active" id="tab-btn-chan-doan" onclick="switchPane('chan-doan')">Sơ đồ Chẩn đoán</button>
    <button class="flow-tab-btn tab-danger" id="tab-btn-xu-tri" onclick="switchPane('xu-tri')">Sơ đồ Xử trí</button>
</div>
```

### Bước 3: Thiết lập các Node lưu đồ (`.fnode`)
Mỗi bước trong lưu đồ là một thẻ `.fnode`.
- **Node khởi đầu**: `.fnode-start`
- **Node câu hỏi/Quyết định (Nhấp mở rộng được)**:
  ```html
  <div class="fnode fnode-question clickable" onclick="toggleNode(this)">
      <div class="fnode-tag">Bước 2 • Phân tầng</div>
      <div class="fnode-title">Có dấu hiệu suy hô hấp cấp không?</div>
      <p class="fnode-body">Nhấn để xem chi tiết tiêu chí cảnh báo...</p>
      <div class="fnode-expand-hint"><span class="expand-icon">▼</span> Nhấp để xem chi tiết</div>
      <div class="fnode-details">
          <div class="detail-box">
              <ul>
                  <li>SpO2 < 92% dưới khí trời</li>
                  <li>Tần số thở > 30 lần/phút</li>
              </ul>
          </div>
      </div>
  </div>
  ```
- **Node khẩn cấp/nguy hiểm**: `.fnode-danger` (có thể kết hợp lớp `.pulse-danger` để tạo hoạt ảnh cảnh báo).
- **Node an toàn/ổn định**: `.fnode-ok`
- **Node nghi ngờ/cận lâm sàng**: `.fnode-info` hoặc `.fnode-warning`

### Bước 4: Tạo liên kết giữa các Node (`.flow-connector`)
- Liên kết thẳng đứng:
  ```html
  <div class="flow-connector">
      <div class="flow-connector-line"></div>
      <div class="flow-connector-arrow"></div>
  </div>
  ```
- Rẽ nhánh phân đôi (CÓ/KHÔNG):
  ```html
  <div class="flow-branch">
      <!-- Nhánh CÓ -->
      <div class="flow-branch-side">
          <div class="flow-connector-label fc-yes">CÓ</div>
          <div class="flow-connector">
              <div class="flow-connector-line"></div>
              <div class="flow-connector-arrow"></div>
          </div>
          <!-- Node tiếp theo ở nhánh CÓ -->
      </div>
      <!-- Nhánh KHÔNG -->
      <div class="flow-branch-side">
          <div class="flow-connector-label fc-no">KHÔNG</div>
          <div class="flow-connector">
              <div class="flow-connector-line"></div>
              <div class="flow-connector-arrow"></div>
          </div>
          <!-- Node tiếp theo ở nhánh KHÔNG -->
      </div>
  </div>
  ```
- Luôn kiểm tra tính rõ ràng của lưu đồ trên giao diện mobile (thường hiển thị theo hàng dọc).
