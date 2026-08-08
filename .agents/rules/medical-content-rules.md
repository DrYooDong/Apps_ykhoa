# Quy Tắc Chuẩn Hóa Nội Dung Y Khoa (Medical Content Rules)

Mọi bài viết, phác đồ, khuyến cáo y khoa trong CliniPortal phải tuân thủ nghiêm ngặt các quy chuẩn lâm sàng sau:

## 🩺 Quy chuẩn Nội dung
1. **Nguồn trích dẫn**: Ghi rõ tổ chức ban hành chính thức (NICE, ESC, ACC/AHA, KDIGO, Bộ Y tế...) + năm cập nhật hoặc định danh y văn chính xác (PMID/DOI).
2. **Mức độ khuyến cáo**: Ghi rõ phân hạng Class (Class I, IIa, IIb, III) và Bằng chứng Level of Evidence (LoE A, B, C).
3. **Cảnh báo an toàn**: Bắt buộc highlight các chống chỉ định, liều độc, tác dụng phụ nguy hiểm bằng các khung infobox cảnh báo:
   ```html
   <div class="infobox danger">
     <div class="infobox-title">⚠️ Cảnh báo lâm sàng</div>
     <div class="infobox-body">...</div>
   </div>
   ```
4. **Văn phong Y khoa**: Sử dụng Tiếng Việt lâm sàng súc tích, chuyên nghiệp. Tuyệt đối loại bỏ các từ ngữ mang dấu vết văn phong AI rườm rà (sử dụng skill `medical-humanizer`).
