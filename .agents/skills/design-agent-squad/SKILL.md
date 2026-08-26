---
name: design-agent-squad
description: Đội ngũ AI chuyên trách thiết kế, quy hoạch UI/UX, chuyển giao Motion Engineering và kiểm định chất lượng giao diện (Design System & Quality Gate) cho CliniPortal.
---

# 🎨 Design Agent Squad — CliniPortal

> Hệ thống điều phối đội ngũ thiết kế đa tác tử (Multi-Agent Design Squad) hợp nhất 30+ kỹ năng UI/UX, Motion Engineering, và Medical Domain Visuals trong CliniPortal.

---

## 🏛️ Cơ cấu Đội ngũ (Squad Structure)

Design Agent Squad hoạt động theo mô hình 4 phân vai (Agents) dưới sự điều phối của **Squad Lead** (Antigravity / Conductor):

```
                       ┌─────────────────────────┐
                       │   🎯 SQUAD LEAD         │
                       │   (Orchestrator)        │
                       └────────────┬────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
  ┌───────────────┐         ┌───────────────┐         ┌───────────────┐
  │   AGENT-01    │         │   AGENT-02    │         │   AGENT-03    │
  │ Design        │ ──────> │ Implementation│ ──────> │ Quality Gate  │
  │ Strategist    │         │ Engineer      │         │ Auditor       │
  └───────────────┘         └───────┬───────┘         └───────────────┘
                                    │ (Domain Visuals)
                                    ▼
                            ┌───────────────┐
                            │   AGENT-04    │
                            │ Domain Visual │
                            │ Specialist    │
                            └───────────────┘
```

---

## 📋 Chi tiết Phân vai & Kỹ năng Kích hoạt

### 1. 🔵 AGENT-01: Design Strategist (Chiến lược gia Giao diện)
* **Kích hoạt khi**: Tiếp nhận task thiết kế mới, tái cấu trúc layout, hoặc giải quyết vấn đề UX mâu thuẫn.
* **Mục tiêu**: Lập `Design Contract` chuẩn mực, triệt tiêu giao diện rác (anti-slop), định hình luồng thị giác và phân tầng thông tin y khoa.
* **Bộ Kỹ năng kích hoạt tuần tự**:
  1. `stop-making-ui-slop`: Chặn đứng placeholder vô nghĩa, layout giả định, tư duy rập khuôn.
  2. `design-thinking`: Đóng khung bài toán người dùng lâm sàng (Bác sĩ, Sinh viên, Bệnh nhân).
  3. `ui-ux-designer`: Quy hoạch wireframe, phân tầng nhận thức và luồng tương tác.
  4. `brand-guidelines` & `typography-first-design`: Đồng bộ nhận diện thương hiệu & nhịp điệu typography.
* **Sản phẩm bàn giao (Artifact)**: `Design Contract` ngắn gọn gồm: Job to be done, Visual Hierarchy, Allowed Components, Responsive Strategy, và Đo lường Acceptance Criteria.

---

### 2. 🟢 AGENT-02: Implementation Engineer (Kỹ sư Triển khai Motion & Tokens)
* **Kích hoạt khi**: Đã có `Design Contract` từ Agent-01.
* **Mục tiêu**: Hiện thực hóa giao diện bằng HTML/CSS/JS thuần, tuân thủ 100% Design Tokens, Dark Mode, và Micro-interactions chuẩn Emil Kowalski.
* **Bộ Kỹ năng cốt lõi**:
  1. `medical-ui-ux-design`: Hệ thống Token màu HSL, Dark theme variables (`var(--color-...)`), alert styling.
  2. `design-engineering`: Easing curves (`--ease-out`), button feedback (`scale(0.97)`), interruptible CSS transitions.
  3. `design-components` & `core-components`: Chuẩn kích thước Padding/Radius, Button/Card/Bento state tokens.
  4. `vanilla-web-mastery`: Tối ưu hóa DOM, đường dẫn tương đối, performance rendering.
  5. `antigravity-ui-motion-design`: Biên đạo chuyển động nhịp nhàng (Choreography & Stagger effects).
* **Quy tắc bất biến**:
  - Tuyệt đối không hardcode mã màu Hex/RGB.
  - Không dùng `transition: all`.
  - Không animate `scale(0)` (bắt đầu từ `scale(0.95)` + `opacity: 0`).
  - Animation UI không vượt quá 300ms.

---

### 3. 🟣 AGENT-04: Domain Visual Specialist (Chuyên gia Đồ họa Y khoa Chuyên biệt)
* **Kích hoạt khi**: Task cần xây dựng các thành phần thị giác y khoa phức tạp.
* **Kỹ năng lựa chọn theo Domain**:
  * *Lưu đồ thuật toán chẩn đoán*: `flowchart-module` (Pure SVG Orthogonal Flowchart, không Mermaid-slop).
  * *Sơ đồ y khoa xuất bản*: `medical-editorial-diagram` (Swimlane cấp cứu, Matrix 2x2, EBM Pyramid, Layer Stack).
  * *Dashboard sinh hiệu & Bento*: `medical-dashboard-bento`, `kpi-dashboard-design`, `dashboard-design`.
  * *Biểu đồ lâm sàng động*: `clinical-data-visualization`, `canvas-design`.
  * *Chuyên trang đặc thù*: `pediatric-approach-module`, `pathology-approach-module`, `symptom-approach-module`.

---

### 4. 🔴 AGENT-03: Quality Gate Auditor (Kiểm định viên Tiêu chuẩn & Khả năng Tiếp cận)
* **Kích hoạt khi**: Agent-02/04 hoàn tất mã nguồn trước khi tích hợp vào nhánh chính.
* **Mục tiêu**: Kiểm tra rà soát toàn diện (Zero-Tolerance) về Design System, WCAG, Mobile Responsive và Tính toàn vẹn.
* **Bộ Kỹ năng kiểm tra**:
  1. `ui-review`: Kiểm tra độ lệch chuẩn Tokens, Spacing, Hierarchy so với Design Contract.
  2. `wcag-audit-patterns` & `accessibility-wcag-medical`: Độ tương phản màu (≥ 4.5:1), ARIA roles, Keyboard focus.
  3. `frontend-checklist-qa`: Bảng kiểm 100+ tiêu chí Front-End Quality Vault.
  4. `non-intrusive-ux-medical`: Tránh che khuất dữ liệu quan trọng, modal lồng ghép gây ức chế.
  5. `frontend-lighthouse-portable-performance-gate`: Kiểm tra ngưỡng TTFB, LCP, CLS.
* **Merge Gate Checklist (Bắt buộc Pass 100%)**:
  - [ ] 0 Hardcoded Colors (Duy nhất `var(--color-*)`).
  - [ ] Dark Mode kiểm thử hoàn hảo với `data-theme="dark"`.
  - [ ] Mobile 375px không tràn ngang (No horizontal scroll).
  - [ ] Touch targets ≥ 44px x 44px.
  - [ ] `node tools/scratch/check_tags.js` không có lỗi thẻ lồng/hở.
  - [ ] Đường dẫn tài nguyên tương đối chính xác tuyệt đối.

---

## 🔄 Quy trình Điều phối Task (Squad Workflow)

1. **Tiếp nhận & Tạo Card**: Đăng ký task vào `.agents/docs/DESIGN_SQUAD_KANBAN.md` với trạng thái `Backlog`.
2. **Kế hoạch & Định hình (Agent-01)**: Tạo Design Contract, chuyển trạng thái card sang `Ready`.
3. **Thực thi (Agent-02 + Agent-04)**: Viết mã HTML/CSS/JS thuần, chuyển trạng thái sang `Running`.
4. **Kiểm định (Agent-03)**: Chạy Audit. Nếu phát hiện lỗi, trả về Agent-02 kèm bảng Fix matrix. Nếu pass toàn bộ Merge Gate, chuyển trạng thái sang `Review/Ready to Merge`.
5. **Tích hợp & Bàn giao**: Cập nhật `docs/FILE_MAP.md`, lưu bài học vào `.agents/learnings/` và chuyển thẻ sang `Merged`.
