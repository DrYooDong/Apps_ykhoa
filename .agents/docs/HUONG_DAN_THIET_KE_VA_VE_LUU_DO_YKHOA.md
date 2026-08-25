# HƯỚNG DẪN THIẾT KẾ VÀ VẼ LƯU ĐỒ Y KHOA (CLINICAL FLOWCHART MANUAL)

Tài liệu này hướng dẫn chi tiết cách sử dụng **Studio thiết kế lưu đồ tương tác** (`clinical-flow-studio.html`), engine vẽ vector `MedicalDrawEngine`, và cách phối hợp với AI để tự động hóa việc vẽ phác đồ chẩn đoán & điều trị trong hệ thống **CliniPortal (Apps_ykhoa)**.

---

## 1. Giới thiệu Hệ thống Lưu đồ Y khoa Vector

Hệ thống lưu đồ y khoa mới của CliniPortal được nâng cấp dựa trên các kỹ thuật hàng đầu từ ứng dụng `next-ai-draw-io`, mang lại các ưu điểm vượt trội:
- **Định tuyến Mũi tên Vuông góc Tự động (Orthogonal Edge Routing)**: Tránh tình trạng mũi tên đè lên chữ hoặc cắt ngang qua hộp thông tin thuốc.
- **Neo Điểm Kết Nối Cố Định (Anchors & Waypoints)**: Định vị chính xác điểm đi/điểm đến của mũi tên trên từng cạnh của Node.
- **Tương tác Thông minh (Active Path Highlighting)**: Khi bấm vào câu trả lời trên đường nối (Ví dụ: *"Có / Yes"*, *"Tụt huyết áp"*), toàn bộ nhánh cấp cứu downstream sẽ được làm nổi bật tự động.
- **Xuất ảnh Chất lượng Cao (SVG / PNG / JSON Schema)**: Xuất lưu đồ dạng vector SVG hoặc PNG DPI cao để in ấn, báo cáo hoặc đưa vào bệnh án.

---

## 2. Hướng dẫn Sử dụng Studio Thiết kế Trực quan

Trang Studio nằm tại đường dẫn: `pages/clinical-flow-studio.html`.

### Các khu vực làm việc chính:
1. **Thanh Công cụ Topbar**:
   - **Nạp Mẫu**: Chọn các thuật toán cấp cứu có sẵn (Sốc phản vệ, ACLS Ngừng tuần hoàn, Cơn hen phế quản cấp, Đột quỵ cấp) và bấm *Nạp Mẫu*.
   - **Thêm Node / Nối Mũi tên**: Thêm nhanh đối tượng mới lên Canvas.
   - **Xuất SVG / Xuất PNG / Tải JSON**: Lưu kết quả vẽ về máy tính.
   - **Nhập JSON**: Nạp lại sơ đồ đã lưu từ file JSON Schema.

2. **Thư viện Node Bên trái (Left Palette)**:
   - Bấm chọn các loại Node theo đúng chuẩn phân loại màu sắc y khoa:
     - 🟦 **Start (Xanh dương)**: Bệnh cảnh ban đầu / Lý do vào viện.
     - 🟧 **Question (Cam/Vàng)**: Câu hỏi phân nhánh chẩn đoán.
     - 🟩 **Action (Xanh lá)**: Can thiệp / Điều trị / Thủ thuật.
     - 🟥 **Danger (Đỏ)**: Cảnh báo Cấp cứu nguy kịch / Tụt huyết áp / Ngừng tim.
     - 🟨 **Success (Xanh ngọc)**: Tiên lượng tốt / Bệnh nhân ổn định.
     - 🟪 **Dose Warning (Tím)**: Cảnh báo liều lượng thuốc & Chống chỉ định.

3. **Bảng Thuộc tính Bên phải (Right Property Inspector)**:
   - Bấm chọn bất kỳ Node hoặc Mũi tên nào trên Canvas để chỉnh sửa:
     - **Tiêu đề & Phụ đề**: Nội dung tóm tắt.
     - **Huy hiệu (Badge Top)**: Ví dụ `BƯỚC 1`, `KHẨN CẤP`.
     - **Chi tiết Lâm sàng (HTML)**: Gõ chi tiết liều dùng thuốc (Adrenalin, Corticoid...), hướng dẫn thủ thuật.
     - **Nhãn Mũi tên**: Chỉnh chữ xuất hiện trên đường nối (Ví dụ: `Có / Yes`, `Không / No`).

4. **Khu vực Canvas Vùng Trung tâm**:
   - **Pan (Kéo canvas)**: Nhấp giữ chuột trái ở vùng trống và kéo để di chuyển canvas.
   - **Zoom (Phóng to / Thu nhỏ)**: Sử dụng con lăn chuột hoặc bộ nút zoom góc dưới bên phải.
   - **Kéo vị trí Node**: Nhấp giữ trực tiếp vào Node để di chuyển tới vị trí mong muốn, các mũi tên nối sẽ tự động uốn theo.

---

## 3. Cách Nhúng Engine Vẽ vào Trang Y khoa Mới

Để nhúng trực tiếp một sơ đồ vector vào bài viết/trang y khoa mới:

```html
<!-- 1. Khai báo Container Canvas trong HTML -->
<div id="myMedicalDiagramViewport" style="width: 100%; height: 600px; position: relative;"></div>

<!-- 2. Thêm Script nạp Engine & Data -->
<script src="../../js/medical-draw-engine.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // Khởi tạo Engine ở chế độ ReadOnly
        const engine = new MedicalDrawEngine({
            container: '#myMedicalDiagramViewport',
            width: 1000,
            height: 600,
            readOnly: true
        });

        // Nạp dữ liệu JSON Schema của lưu đồ
        engine.loadDiagram({
            nodes: [
                { id: 'n1', type: 'start', title: 'CƠN HEN PHẾ QUẢN CẤP', x: 400, y: 40, width: 220 },
                { id: 'n2', type: 'action', title: 'XỊT SABA (SALBUTAMOL) 4-10 NHÁT', x: 400, y: 180, width: 240, details: 'Lặp lại mỗi 20 phút trong giờ đầu tiên' }
            ],
            edges: [
                { id: 'e1', source: 'n1', target: 'n2', label: 'Bắt đầu xử trí', type: 'normal' }
            ]
        });
    });
</script>
```

---

## 4. Cú pháp Prompt để AI Tự động Sinh Lưu đồ Y khoa

Khi bạn muốn AI (Gemini / Antigravity) sinh lưu đồ cho một phác đồ y khoa mới, hãy copy đoạn prompt mẫu sau:

```text
Hãy chuyển đổi hướng dẫn điều trị [TÊN PHÁC ĐỒ / BỆNH LÝ] sau thành dữ liệu JSON Schema chuẩn cho MedicalDrawEngine của CliniPortal.

Yêu cầu:
1. Bố cục không vượt quá khung 1000x750px.
2. Phân loại đúng node types: start (xanh dương), question (cam), action (xanh lá), danger (đỏ), success (xanh ngọc), dose (tím).
3. Đảm bảo khai báo rõ nhãn label cho các mũi tên phân nhánh ("Có / Yes", "Không / No").
4. Trả về đúng định dạng JSON Schema có mảng nodes và edges.
```

---

## 5. Danh mục File Liên quan trong Dự án

- 📄 **Engine JS**: `js/medical-draw-engine.js`
- 🎨 **Style Studio CSS**: `css/components/clinical-flow-studio.css`
- 🖥️ **Studio Page**: `pages/clinical-flow-studio.html`
- 🤖 **Agent Skill**: `.agents/skills/flowchart-module/SKILL.md`
