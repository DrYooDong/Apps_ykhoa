---
name: qa-agent-squad
description: Đội ngũ AI chuyên trách rà soát, kiểm định chất lượng, chẩn đoán sự cố và đề xuất hướng xử trí tối ưu cho hệ thống CliniPortal (SVG, KaTeX, CSS Stacking, Dark Mode, SPA Router, JSON Schema).
---

# 🛡️ QA Agent Squad — CliniPortal

> Hệ thống điều phối đội ngũ kiểm soát chất lượng đa tác tử (Multi-Agent Quality Assurance Squad) chuyên biệt hóa theo 5 lớp lỗi thực chiến của CliniPortal.

---

## 🏛️ Cơ Cấu Đội Ngũ (Squad Architecture)

QA Agent Squad hoạt động theo mô hình điều phối tập trung dưới sự dẫn dắt của **QA Conductor** (Antigravity Squad Lead):

```
                       ┌─────────────────────────┐
                       │    🎯 QA CONDUCTOR      │
                       │   (Triage & Dispatch)   │
                       └────────────┬────────────┘
                                    │
    ┌──────────────┬────────────────┼────────────────┬──────────────┐
    ▼              ▼                ▼                ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│  AGENT-01  │ │  AGENT-02  │ │  AGENT-03  │ │  AGENT-04  │ │  AGENT-05  │
│  SVG &     │ │ CSS Layout │ │ Dark Mode  │ │ SPA Reader │ │ JSON Schema│
│  KaTeX QA  │ │ & Stacking │ │ & Tokens   │ │ Injection  │ │ & Rules    │
└────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘
    │              │                │                │              │
    └──────────────┴────────────────┼────────────────┴──────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │   🚦 MERGE GATE BOT     │
                       │  (Automated Validation) │
                       └─────────────────────────┘
```

---

## 📋 Chi Tiết 5 Phân Vai Chuyên Biệt

### 1. 🔵 AGENT-01: SVG & KaTeX Quality Auditor
* **Phạm vi giám sát**: Các bài học `.mdx` trong `src/content/basic-medical/` và các sơ đồ vector y khoa.
* **Các dạng lỗi phụ trách**:
  - Ký tự box-drawing rác Unicode (`─│┼┬┴┤├╠╣╦╩╬╔╗╚╝`) do chuyển đổi hoặc sao chép.
  - Khối code block thô ` ``` ` chưa được dọn dẹp hoặc chưa vector hóa thành SVG.
  - Ký hiệu ion hoặc công thức y khoa viết trần thiếu KaTeX wrapper (ví dụ: `Ca2+` thay vì `$Ca^{2+}$`).
* **Script kích hoạt**:
  ```bash
  node tools/qa/agent01-svg-katex-audit.mjs
  # Hỗ trợ tùy chọn tự động dọn dẹp ký tự rác:
  node tools/qa/agent01-svg-katex-audit.mjs --fix
  ```

---

### 2. 🟢 AGENT-02: CSS Layout & Card Stacking Auditor
* **Phạm vi giám sát**: Các tệp stylesheet `src/styles/components/`, `src/styles/basic-medical/` và các thẻ card trong MDX.
* **Các dạng lỗi phụ trách**:
  - Hộp `.infobox` bị méo 2 cột do `display: flex; align-items: flex-start` thiếu `flex-direction: column`.
  - Thiếu định nghĩa typography (`font-weight`, `font-size`) cho tiêu đề `.infobox-title`.
  - Vỡ layout hoặc ép hẹp LaTeX formula trong các khung ghi chú y khoa.
* **Script kích hoạt**:
  ```bash
  node tools/qa/agent02-css-layout-audit.mjs
  ```

---

### 3. 🟡 AGENT-03: Dark Mode & Design Token Auditor
* **Phạm vi giám sát**: Toàn bộ hệ thống token màu, tương thích nền tối (`[data-theme="dark"]`).
* **Các dạng lỗi phụ trách**:
  - Hardcode mã màu hex (`#fef2f2`, `#fffbeb`, v.v.) bên ngoài thẻ SVG.
  - Thiếu biến thể tương phản Dark Mode cho tiêu đề và đường viền card y khoa.
  - Tương phản không đạt chuẩn WCAG AA (< 4.5:1).
* **Script kích hoạt**:
  ```bash
  node tools/qa/agent03-darkmode-token-audit.mjs
  ```

---

### 4. 🔴 AGENT-04: SPA Reader View Injection Auditor
* **Phạm vi giám sát**: Quá trình nạp dynamic CSS và render nội dung trong `src/content/basic-medical/views/physio-html-reader-view.ts`.
* **Các dạng lỗi phụ trách**:
  - Race condition khi nạp CSS: render DOM trước khi CSS kịp áp dụng gây FOUC.
  - Thiếu nạp `physio-shared.css` hoặc `guidelines-article.css` trong môi trường SPA router.
  - Quy tắc CSS không đủ độ ưu tiên (thiếu scope selector overrides).
* **Script kích hoạt**:
  ```bash
  node tools/qa/agent04-spa-reader-audit.mjs
  ```

---

### 5. 🟣 AGENT-05: JSON Schema & Clinical Rules Validator
* **Phạm vi giám sát**: Thư mục dữ liệu bệnh lý `src/content/knowledge-vault/data/` (`diseases/*.json`, `vault-catalog*.json`).
* **Các dạng lỗi phụ trách**:
  - Ký tự gạch dưới bị escape sai cú pháp (`\_` thay vì `_`) trong key JSON.
  - Cấu trúc mảng suy luận `dd` không đủ 3 phần tử `[symptom_key, weight, type]`.
  - Loại tương tác `type` không thuộc bộ chuẩn: `dt` (đặc trưng), `gy` (gợi ý), `ht` (hỗ trợ), `loaitru` (loại trừ).
* **Script kích hoạt**:
  ```bash
  node tools/qa/agent05-json-schema-validator.mjs
  # Hỗ trợ tự động sửa lỗi escape:
  node tools/qa/agent05-json-schema-validator.mjs --fix
  ```

---

## 🚦 Quy Trình Kiểm Định & Merge Gate

Trước khi hoàn tất bất kỳ phiên chỉnh sửa nào về nội dung, giao diện hoặc CSDL y khoa:

1. Chạy rà soát tự động qua QA Conductor:
   ```bash
   node tools/qa/agent01-svg-katex-audit.mjs
   node tools/qa/agent02-css-layout-audit.mjs
   node tools/qa/agent05-json-schema-validator.mjs
   ```
2. Nếu xuất hiện `[ERROR]`: Bắt buộc khắc phục triệt để trước khi commit.
3. Nếu xuất hiện `[WARNING]`: Xem xét đề xuất xử trí của Agent tương ứng.
4. Ghi nhận lỗi mới phát sinh (nếu có) vào bộ nhớ `learnings/` để huấn luyện Agent cho các phiên tiếp theo.
