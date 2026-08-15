# Hướng Dẫn Tích Hợp & Sử Dụng Bộ Sơ Đồ Editorial SVG Y Khoa

Tài liệu này hướng dẫn cách áp dụng bộ công cụ **Sơ đồ Y khoa Độc lập (Editorial Medical SVG)** vào CliniPortal và các dự án Web Y khoa khác.

---

## 🎯 1. Giá Trị & Lợi Ích Cốt Lõi

1. **Hoàn toàn độc lập (Zero-dependency):** Không cần cài đặt `mermaid.js`, `chart.js` hay `d3.js`.
2. **Không vỡ layout (Responsive ViewBox):** Mọi sơ đồ tự động co giãn từ màn hình điện thoại (375px) đến màn hình máy tính để bàn (4K).
3. **100% Dark Mode Native:** Sử dụng biến CSS Variables (`var(--color-...)`) giúp sơ đồ tự động đổi màu khi người dùng bật/tắt chế độ ban đêm.
4. **Chuẩn đồ họa xuất bản (Editorial Quality):** Bố cục trực giao, loại bỏ hoàn toàn các lỗi thường gặp của AI (bóng đổ lòe loẹt, đường chéo cắt chữ, màu sắc quá đà).

---

## 📁 2. Vị Trí Các Tài Nguyên Trong Dự Án

- **Thư viện Mẫu Trực Quan & Copy Code 1-Click:** [`templates/medical-svg-templates.html`](../templates/medical-svg-templates.html)
- **Helper Generator JS:** [`js/medical-svg-generator.js`](../js/medical-svg-generator.js)
- **Agent Skill Hướng Dẫn AI:** [`.agents/skills/medical-editorial-diagram/SKILL.md`](../.agents/skills/medical-editorial-diagram/SKILL.md)

---

## 🛠️ 3. Ba Cách Sử Dụng Thực Tế

### Cách 1: Sao chép SVG trực tiếp vào bài viết (Nhanh & Tối ưu nhất)
1. Mở file [`templates/medical-svg-templates.html`](../templates/medical-svg-templates.html) trên trình duyệt.
2. Chọn mẫu sơ đồ phù hợp (Swimlane, Quadrant, Layer Stack, Radar, Pyramid, Loop).
3. Nhấn nút **"Copy SVG"**.
4. Dán đoạn mã SVG trực tiếp vào file HTML của bài viết (ví dụ: trong `pages/Tiếp cận/`, `pages/Dược lý/` hoặc `pages/Y học chứng cứ/`).

### Cách 2: Sử dụng Thư viện JS `MedicalSVG`
Nhúng file `medical-svg-generator.js` và tạo sơ đồ động bằng JSON:

```html
<div id="risk-matrix-container"></div>

<script src="../../../js/medical-svg-generator.js"></script>
<script>
  document.getElementById('risk-matrix-container').innerHTML = MedicalSVG.createQuadrant({
    xAxisLabel: "XÁC SUẤT TIỀN NGHIỆM (WELLS SCORE) ➔",
    yAxisLabel: "MỨC ĐỘ NGUY KỊCH LÂM SÀNG ➔",
    topRight: { title: "🚨 THUYÊN TẮC PHỔI NGUY CƠ CAO", desc: "Chụp CTPA khẩn cấp + Tiêu sợi huyết", color: "var(--color-danger)" }
  });
</script>
```

### Cách 3: Yêu cầu AI Agent vẽ sơ đồ mới theo chuẩn
Khi trao đổi với AI, bạn chỉ cần ra lệnh:
> *"Hãy áp dụng skill `medical-editorial-diagram` để vẽ sơ đồ dạng Layer Stack cho Bậc thang điều trị Hen GINA 2024."*

AI sẽ tự động đọc quy tắc và sinh mã SVG hoàn chỉnh đạt chuẩn chất lượng xuất bản.
