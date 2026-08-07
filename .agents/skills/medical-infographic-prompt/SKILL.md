---
name: medical-infographic-prompt
description: Tạo kịch bản Infographic, sơ đồ tư duy & prompt sinh ảnh AI y khoa từ bài viết bệnh lý/lâm sàng cho CliniPortal.
---

# Medical Infographic & Visual Script Prompt Generator

Skill này giúp AI đọc nội dung bài viết Y khoa (bệnh lý, phác đồ, tiếp cận lâm sàng, dược lý) và chuyển đổi thành **Kịch bản Infographic Poster** chi tiết, kèm theo Prompt đồ họa AI (DALL-E 3, Midjourney, Gemini Imagen) chuẩn hóa cho hệ sinh thái CliniPortal.

---

## 🎯 Mục tiêu của Skill

1. **Trực quan hóa Y khoa**: Biến văn bản y văn phức tạp thành sơ đồ tư duy, poster infographics trực quan, dễ ghi nhớ.
2. **Chuẩn hóa Layout Poster Board**: Chia bố cục Infographic thành các khối (Header Banner, Key Stats/Alerts, Visual Flowchart, Clinical Pearls, Comparison Card, Summary Footer).
3. **Sinh Prompt Đồ họa AI**: Xuất ra Prompt tiếng Anh chuẩn xác để sinh ảnh/sơ đồ minh họa không bị lỗi chữ y học.

---

## 📐 Bố cục chuẩn của Kịch bản Infographic Y khoa

Khi được yêu cầu tạo Infographic từ một bài viết, AI sẽ tạo kịch bản gồm 5 phần chính:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HEADER BANNER: Tiêu đề + Phân loại ICD/Mức độ khẩn cấp    │
├─────────────────────────────────────────────────────────────┤
│ 2. KEY STATS / ALERT BANNER: Cảnh báo đỏ / Triệu chứng vàng  │
├──────────────────────────────┬──────────────────────────────┤
│ 3. CORE FLOWCHART / DIAGRAM │ 4. CLINICAL PEARLS & DOSE    │
│    (Đường đi thuật toán)     │    (Bảng liều / Điểm mấu chốt) │
├──────────────────────────────┴──────────────────────────────┤
│ 5. SUMMARY & REFERENCES: Trích dẫn Guideline / Schema        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Quy trình Thực hiện

### Bước 1: Trích xuất Dữ liệu Cốt lõi
Từ bài viết được cung cấp, lọc ra:
- **Tiêu đề chính**: Tên bệnh lý / Triệu chứng / Kỹ năng.
- **Key Takeaways**: 3-5 điểm quan trọng nhất.
- **Thuật toán/Tiến trình**: Các bước chẩn đoán/xử trí (dạng Step 1 -> Step 2 -> Step 3).
- **So sánh / Phân biệt**: Bảng hoặc cặp đối lập (ví dụ: Viêm tụy cấp nhẹ vs Nặng).

### Bước 2: Tạo Layout Kịch bản Infographic (HTML / Canvas Schema)
Xuất ra cấu trúc HTML thuần tương thích với CliniPortal CSS Design Tokens:
- Dùng màu cảnh báo: `var(--color-danger)` cho báo động, `var(--color-warning)` cho chú ý, `var(--color-primary)` cho thông tin chính.
- Sử dụng các CSS Components có sẵn: `.alert-banner`, `.info-card`, `.flowchart-node`, `.clinical-pearl`.

### Bước 3: Xuất AI Image Prompts (Midjourney / DALL-E / Gemini)
Cung cấp prompt chi tiết dạng tiếng Anh để vẽ sơ đồ/ảnh minh họa y học:
- **Phong cách**: Clean flat medical vector style, minimalist, dark slate background or clean white background, high contrast, professional medical textbook style.
- **Tránh lỗi**: Tránh yêu cầu AI render chữ dài trên hình (dễ bị bóp méo font y khoa), chỉ tập trung vào biểu tượng (Icons), hình người/cơ quan (Anatomy Vector) và mũi tên luồng (Flow arrows).

---

## 💡 Ví dụ Prompt Xuất Mẫu

```text
[MEDICAL VECTOR PROMPT]
Minimalist medical infographic vector of human lungs showing acute asthma attack vs normal airway. Flat vector illustration, clean lines, high contrast medical UI palette (sky blue #0284c7, medical red #ef4444), modern medical textbook aesthetic, clean white background --no text, no watermark --ar 16:9
```
