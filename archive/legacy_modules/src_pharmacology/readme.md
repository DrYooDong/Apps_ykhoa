# 💊 Phân hệ Dược lý Lâm sàng (Pharmacology Module)

Tài liệu này mô tả định hướng phát triển, cấu trúc thư mục và quy chuẩn biên soạn nội dung cho phân hệ **Dược lý Lâm sàng** thuộc hệ sinh thái **CliniPortal**. Tài liệu này giúp người đọc và các tác nhân AI (Agent) hiểu rõ kiến trúc để phát triển hoặc bảo trì mã nguồn một cách đồng bộ.

---

## 🚀 1. Định hướng Phát triển Phân hệ

Phân hệ Dược lý Lâm sàng được thiết kế nhằm hỗ trợ các bác sĩ và sinh viên y khoa tiếp cận thông tin thuốc một cách nhanh chóng, an toàn và có hệ thống dựa trên bằng chứng lâm sàng. Định hướng phát triển cốt lõi:

### 🔹 Phần 1: Tra cứu Tương tác Thuốc & Công cụ Lâm sàng (Drug-Drug Interactions & Clinical Tools)
*   **Mục tiêu**: Hệ thống hóa các tương tác thuốc lâm sàng quan trọng và cung cấp bộ công cụ mô phỏng Dược động học, Tối ưu hóa liều lượng cá thể hóa.
*   **Hướng tiếp cận**:
    *   **Ma trận Tương tác 2D & Tra cứu Thuốc**: Tra cứu tương tác trực quan giữa các nhóm thuốc lâm sàng (chống chỉ định, thận trọng và hiệp đồng).
    *   **Tối ưu liều & PK Simulator**: Công cụ hỗ trợ ra quyết định lâm sàng.

### 🔹 Phần 2: Dược lý theo Triệu chứng (Symptom-Based Pharmacology)
*   **Mục tiêu**: Thay đổi tư duy học dược lý truyền thống (theo họ thuốc) sang tư duy lâm sàng thực tế (tiếp cận từ triệu chứng than phiền của bệnh nhân).
*   **Hướng tiếp cận**:
    *   Trình bày hoàn toàn dưới dạng **Flowcharts (Lưu đồ tương tác)** hoặc **Sơ đồ thuật toán tiếp cận**.
    *   Hướng dẫn bác sĩ đi từ triệu chứng lâm sàng (ví dụ: ho, chóng mặt, đau đầu, đau bụng...) qua các bước phân loại nguyên nhân -> chọn lựa nhóm thuốc tối ưu (First-line, Second-line) -> cá thể hóa liều dùng -> các dấu hiệu cảnh báo đỏ (Red Flags) và tác dụng phụ cần theo dõi.
*   **Thư mục định hướng**: `symptoms/`

---

## 📁 2. Cấu trúc Thư mục Hiện tại

```
pharmacology/
├── data/                      # Repository dữ liệu chuyên sâu
│   ├── drugs_database.json    # JSON Schema danh mục thuốc & liều lượng
│   ├── drug_interactions.json # Ma trận tương tác thuốc (Pairwise DDI Matrix)
│   ├── symptom_pathways.json  # Đồ thị thuật toán điều trị theo triệu chứng
│   └── interaction_matrix.csv # Ma trận tương tác dạng CSV
├── monographs/                # Hồ sơ thuốc chuyên sâu dạng Markdown
│   ├── amoxicillin_clavulanate.md
│   └── metoprolol_succinate.md
├── assets/                    # Sơ đồ vector cơ chế phân tử & Media
│   └── moa_beta_lactam.svg
├── symptoms/                  # Dược lý tiếp cận từ triệu chứng
│   ├── dl-daubungcap.html
│   ├── dl-ho.html
│   ├── dl-nonoi.html
│   ├── dl-chongmat.html
│   └── dl-daudau.html
├── tools/                     # Công cụ & Ma trận tương tác
│   ├── ma-tran-tuong-tac.html
│   ├── dose-optimizer.html
│   ├── pk-simulator.html
│   └── tra-cuu-thuoc.html
└── duoc-ly.html               # Trang Hub điều hướng chính
```

---

## 🛠️ 3. Quy chuẩn Thiết kế & Kỹ thuật dành cho AI và Nhà phát triển

Khi tạo mới hoặc sửa đổi các tệp tin trong phân hệ Dược lý, cần tuân thủ nghiêm ngặt các quy tắc sau:

1.  **Tính nhất quán của giao diện (UI/UX)**:
    *   Phải kế thừa trực tiếp các biến CSS (Design Tokens) từ file gốc `../../css/main.css`.
    *   **Không sử dụng các framework CSS bên ngoài** (Tailwind, Bootstrap) để đảm bảo khả năng chạy offline (`file:///...`).
    *   Giao diện bắt buộc phải hỗ trợ đầy đủ **Dark Mode** thông qua thuộc tính `data-theme` trên thẻ `<html>`.

2.  **Đường dẫn tương đối (`[relative_path]`)**:
    *   Khi viết code trong các file con thuộc thư mục `symptoms/` hoặc `tools/` (độ sâu cấp 3), toàn bộ đường dẫn liên kết tĩnh đến CSS/JS gốc phải dùng tiền tố `../../../` hoặc `../../`.

3.  **Quy chuẩn viết code cho Dược lý theo Triệu chứng**:
    *   Sử dụng thư viện hiển thị sơ đồ tương tác hoặc cấu trúc CSS flowchart thuần để dựng các bước tiếp cận trực quan.
    *   Mỗi nút/node trong sơ đồ tiếp cận y khoa khi click phải hiển thị bảng thông tin chi tiết (cơ chế, liều lượng, tương tác, lưu ý lâm sàng) ở panel bên cạnh hoặc dạng popup để tránh làm loãng sơ đồ chính.

