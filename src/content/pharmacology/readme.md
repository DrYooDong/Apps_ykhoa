# 💊 Phân hệ Dược lý Lâm sàng (Pharmacology Module)

Tài liệu này mô tả định hướng phát triển, cấu trúc thư mục và quy chuẩn biên soạn nội dung cho phân hệ **Dược lý Lâm sàng** thuộc hệ sinh thái **CliniPortal**. Tài liệu này giúp người đọc và các tác nhân AI (Agent) hiểu rõ kiến trúc để phát triển hoặc bảo trì mã nguồn một cách đồng bộ.

---

## 🚀 1. Định hướng Phát triển Phân hệ

Phân hệ Dược lý Lâm sàng được thiết kế nhằm hỗ trợ các bác sĩ và sinh viên y khoa tiếp cận thông tin thuốc một cách nhanh chóng, an toàn và có hệ thống dựa trên bằng chứng lâm sàng. Định hướng phát triển được chia làm hai phần cốt lõi:

### 🔹 Phần 1: Tra cứu Tương tác Thuốc (Drug-Drug Interactions)
*   **Mục tiêu**: Hệ thống hóa các tương tác thuốc lâm sàng quan trọng, giúp nhận diện nhanh các cặp thuốc đối kháng, hiệp đồng hoặc có nguy cơ gây độc tính cao khi phối hợp.
*   **Hướng tiếp cận**:
    *   **Tương tác theo Chuyên khoa**: Tra cứu tương tác giữa các hoạt chất thường dùng chung trong cùng một chuyên khoa (ví dụ: Tim mạch, Hô hấp, Tiêu hóa...).
    *   **Tương tác trong Nhóm thuốc cụ thể**: Đào sâu vào các nhóm thuốc đặc thù có cơ chế phức tạp và tần suất sử dụng cao (ví dụ: Kháng sinh - tương tác giữa các phân nhóm kháng sinh hoặc kháng sinh với các thuốc điều trị bệnh nền).
*   **Thư mục định hướng**: `pages/Dược lý/Chuyên khoa/`

### 🔹 Phần 2: Dược lý theo Triệu chứng (Symptom-Based Pharmacology)
*   **Mục tiêu**: Thay đổi tư duy học dược lý truyền thống (theo họ thuốc) sang tư duy lâm sàng thực tế (tiếp cận từ triệu chứng than phiền của bệnh nhân).
*   **Hướng tiếp cận**:
    *   Trình bày hoàn toàn dưới dạng **Flowcharts (Lưu đồ tương tác)** hoặc **Sơ đồ thuật toán tiếp cận**.
    *   Hướng dẫn bác sĩ đi từ triệu chứng lâm sàng (ví dụ: ho, chóng mặt, đau đầu, đau bụng...) qua các bước phân loại nguyên nhân -> chọn lựa nhóm thuốc tối ưu (First-line, Second-line) -> cá thể hóa liều dùng -> các dấu hiệu cảnh báo đỏ (Red Flags) và tác dụng phụ cần theo dõi.
*   **Thư mục định hướng**: `pages/Dược lý/Triệu chứng/`

---

## 📁 2. Cấu trúc Thư mục Hiện tại

```
Dược lý/
├── data/                      # [Phi HTML] Repository dữ liệu chuyên sâu
│   ├── drugs_database.json    # JSON Schema danh mục thuốc & liều lượng
│   ├── drug_interactions.json # Ma trận tương tác thuốc (Pairwise DDI Matrix)
│   ├── symptom_pathways.json  # Đồ thị thuật toán điều trị theo triệu chứng
│   ├── dosage_rules.json      # Cấu hình quy tắc chỉnh liều (CrCl / Cân nặng)
│   └── interaction_matrix.csv # Ma trận tương tác dạng CSV hỗ trợ Excel/Sheets
├── monographs/                # [Phi HTML] Hồ sơ thuốc chuyên sâu dạng Markdown
│   ├── amoxicillin_clavulanate.md
│   └── metoprolol_succinate.md
├── assets/                    # [Phi HTML] Sơ đồ vector cơ chế phân tử & Media
│   └── moa_beta_lactam.svg    # Interactive SVG Mechanism of Action
├── Chuyên khoa/               # [Phần 1] Tương tác thuốc theo chuyên khoa
│   ├── DL_Timmach.html
│   ├── DL_Vanmach.html
│   ├── DL_Hohap.html
│   ├── DL_Tiêuhoá.html
│   ├── DL_Ttoan_than.html
│   └── DL_Khangsinh.html
├── Triệu chứng/               # [Phần 2] Dược lý tiếp cận từ triệu chứng
│   ├── DL_Daubungcap.html
│   ├── DL_Ho.html
│   ├── DL_Nonoi.html
│   ├── DL_Chongmat.html
│   └── DL_Daudau.html
└── duoc-ly.html               # Trang Hub điều hướng chính & Dynamic Pharmacology Engine
```

---

## 🛠️ 3. Quy chuẩn Thiết kế & Kỹ thuật dành cho AI và Nhà phát triển

Khi tạo mới hoặc sửa đổi các tệp tin trong phân hệ Dược lý, cần tuân thủ nghiêm ngặt các quy tắc sau:

1.  **Tính nhất quán của giao diện (UI/UX)**:
    *   Phải kế thừa trực tiếp các biến CSS (Design Tokens) từ file gốc `../../css/main.css`.
    *   **Không sử dụng các framework CSS bên ngoài** (Tailwind, Bootstrap) để đảm bảo khả năng chạy offline (`file:///...`).
    *   Giao diện bắt buộc phải hỗ trợ đầy đủ **Dark Mode** thông qua thuộc tính `data-theme` trên thẻ `<html>`.

2.  **Đường dẫn tương đối (`[relative_path]`)**:
    *   Khi viết code trong các file con thuộc thư mục `Chuyên khoa/` hoặc `Triệu chứng/` (độ sâu cấp 3), toàn bộ đường dẫn liên kết tĩnh đến CSS/JS gốc phải dùng tiền tố `../../` (ví dụ: `../../css/main.css`).

3.  **Quy chuẩn viết code cho Phần 2 (Dược lý theo Triệu chứng)**:
    *   Sử dụng thư viện hiển thị sơ đồ tương tác hoặc cấu trúc CSS flowchart thuần (kế thừa từ `templates/flowchart-template.html`) để dựng các bước tiếp cận trực quan.
    *   Mỗi nút/node trong sơ đồ tiếp cận y khoa khi click phải hiển thị bảng thông tin chi tiết (cơ chế, liều lượng, tương tác, lưu ý lâm sàng) ở panel bên cạnh hoặc dạng popup để tránh làm loãng sơ đồ chính.
