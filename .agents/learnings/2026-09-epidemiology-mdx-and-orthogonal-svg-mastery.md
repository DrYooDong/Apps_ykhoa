# 🧠 Bài Học Kinh Nghiệm: Nâng Cấp Phân Hệ Dịch Tễ Học & Chuẩn Hóa Lưu Đồ Trực Giao

> **Ngày ghi nhận**: 17/09/2026  
> **Phân hệ liên quan**: `src/content/basic-medical/epidemiology/`, `tools/flowcharts/`, `tools/qa/`  
> **Đội ngũ thực hiện**: CliniPortal QA Agent Squad & Medical Flowchart Agent Squad  

---

## 🔍 1. Bối Cảnh & Vấn Đề Nhận Diện

Trước khi nâng cấp, phân hệ **Dịch Tễ Học Y Khoa & Y Tế Công Cộng** gồm 12 bài viết MDX xuất hiện các vấn đề:
1. **Code block thô ASCII**: Tệp `dth-vgsv-b.mdx` (Mục 4) chứa một khối code block text thô (`█████████`) thể hiện tỷ lệ chuyển mạn tính theo tuổi, phá vỡ tính thẩm mỹ đồng bộ của giao diện MDX Native.
2. **Thiếu đồ họa xuất bản trực quan**: Các bài dịch tễ học truyền nhiễm hàng đầu (Sốt xuất huyết Dengue, Sốt rét Plasmodium) chỉ chứa bảng mô tả lý thuyết, chưa có sơ đồ động thái chu kỳ lây truyền véc-tơ trực giao (Orthogonal Loop).
3. **Nguy cơ lỗi cú pháp SVG**: Các sơ đồ vector y khoa nếu chứa thẻ HTML (`<strong>`, `<b>`, `<br>`) bên trong `<text>` sẽ khiến trình duyệt parse XML lỗi và rơi vỡ chữ.

---

## 🛠️ 2. Quy Trình Giải Quyết Bằng Đội Ngũ Tác Tử (Multi-Squad Workflow)

### Bước 1: Rà soát & Triệt tiêu code block thô
- Sử dụng **AGENT-01** (QA Squad) rà soát 12 tệp MDX.
- Thay thế khối ASCII tại `dth-vgsv-b.mdx` bằng **Bento Progress Card** hiện đại:
  - Phân tầng màu cảnh báo: Đỏ cho sơ sinh (90–95%), Vàng cho trẻ nhỏ (25–30%), Xanh lá cho người lớn (5%).
  - Tích hợp thanh tiến trình CSS chuyển màu mượt mà, hỗ trợ 100% Dark Mode.

### Bước 2: Thiết kế & Vẽ lưu đồ trực giao bằng Flowchart Squad
- Áp dụng **AGENT-FC01** bóc tách logic lâm sàng sang JSON (`dth-dengue-transmission.json`, `dth-malaria-transmission.json`).
- Áp dụng **AGENT-FC02 & AGENT-FC03** qua `generate-flowchart.mjs`:
  - 100% đường nối trực giao bẻ góc vuông bo tròn ($r=6\text{px}$).
  - Tự động tạo mặt nạ nhãn chữ (`<rect>` label masking) che đứt vạch kẻ, chống đè chữ.
  - Tuyệt đối không dùng thẻ HTML bên trong SVG `<text>`.
- Tích hợp trực tiếp mã nguồn SVG vào `dth-dengue.mdx` và `dth-sot-ret.mdx`.

### Bước 3: Nâng cấp Ma trận nhiệt KDIGO Heatmap (`dth-ckd.mdx`)
- Nâng cấp bảng phân tầng nguy cơ eGFR $\times$ Albumin niệu với hệ thống nhãn nhiệt độ màu KDIGO chuẩn hóa và thanh chú giải (Color Legend).

---

## 🧪 3. Kết Quả Kiểm Định & Nghiệm Thu

1. **TypeScript TypeCheck**: `tsc --noEmit` đạt `0 errors` trên toàn repository.
2. **Master QA Runner**: `5/5 QA Agents PASS (0.42s)`:
   - `0` code block thô trên 12 tệp MDX.
   - `0` thẻ HTML cấm bên trong SVG.
   - `100%` tương thích Dark Mode & SPA Router.
3. **Browser E2E Subagent**: Đã xác nhận trực quan hình ảnh hiển thị sắc nét trên cả Light Mode và Dark Mode.

---

## 📋 4. Bảng Kiểm Tra Cho Các Bài Dịch Tễ Học Mới

- [ ] Bài viết không chứa code block thô dạng bảng hoặc ASCII art (` ``` `).
- [ ] Mọi sơ đồ chu kỳ lây truyền phải dùng Pure Editorial SVG (không dùng HTML nhúng trong text).
- [ ] Các chỉ số dịch tễ học ($R_0$, CFR, p-value) được đóng gói trong KaTeX `$...$`.
- [ ] Chạy `node tools/qa/run-qa-squad.mjs` trước khi nghiệm thu bài mới.
