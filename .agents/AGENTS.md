# AGENTS.md — CliniPortal Workspace Rules (Master Entry Point)

> Tài liệu này định nghĩa cấu trúc quy tắc vận hành và chỉ dẫn cho mọi AI Agent làm việc trong dự án **CliniPortal**.
> **AI phải đọc file này trước khi thực hiện bất kỳ tác vụ nào trong project.**

---

## 🔑 Nhận diện Dự án

- **Tên project**: CliniPortal — Hệ sinh thái Web Y khoa
- **Thư mục gốc (Root)**: `d:\Apps_ykhoa\` (hoặc `i:\Drive của tôi\apps\Apps_ykhoa\`)
- **Công nghệ**: Pure HTML + Vanilla CSS + Vanilla JavaScript (ES6+), **KHÔNG framework**
- **Môi trường chạy**: `file:///` offline hoặc local web server
- **Ngôn ngữ giao diện**: Tiếng Việt

---

## 🏛️ Cấu trúc Agentic Framework (`.agents/`)

Hệ thống quy tắc và trí nhớ của AI được mô-đun hóa trong thư mục `.agents/`:

```text
d:\Apps_ykhoa\.agents/
├── AGENTS.md                         # File Master Index chính (File hiện tại)
├── docs/                             # Toàn bộ tài liệu kiến trúc, File Map, Checklists
│   ├── PROJECT_OVERVIEW.md           # Tổng quan hệ sinh thái
│   ├── FILE_MAP.md                   # Bản đồ cấu trúc file
│   ├── WORKFLOW_CHECKLISTS.md        # Bộ bảng kiểm quy trình
│   ├── DESIGN_SQUAD_KANBAN.md        # Bảng điều phối Kanban của Design Squad
│   └── DESIGN_TO_CODE.md             # Hướng dẫn thiết kế sang mã nguồn
├── learnings/                        # Bộ nhớ học tập & Lịch sử sửa bug dự án (Lessons Learned)
│   └── README.md
├── rules/                            # Các bộ quy tắc tuân thủ mô-đun hóa
│   ├── file-naming-rules.md          # 1. Quy tắc đặt tên file & slug
│   ├── hub-protection.md             # 2. Quy tắc bảo vệ Hub cốt lõi
│   ├── medical-content-rules.md      # 3. Quy tắc chuẩn hóa nội dung Y khoa
│   ├── performance-rules.md          # 4. Quy tắc hiệu năng & Bundle size
│   ├── dark-mode-rules.md            # 5. Quy tắc Dark Mode bắt buộc
│   ├── responsive-rules.md           # 6. Quy tắc Responsive Mobile-First
│   ├── html-integrity-rules.md       # 7. Quy tắc kiểm tra toàn vẹn HTML
│   ├── context-optimization.md       # 8. Quy tắc tối ưu hóa Context AI
│   ├── guideline-creation-rules.md   # 9. Quy tắc kiểm soát tạo Guideline & chống trùng lặp
│   └── design-squad-rules.md         # 10. Quy tắc vận hành & Merge Gate Design Squad
└── skills/                           # Thư mục 70+ Skills chuyên môn & workflow
    ├── Agent Intelligence & Memory   # agent-memory-systems, agent-memory-checkpoint, agent-manager, state-management-patterns...
    ├── Healthcare AI & Safety        # cdss-development-patterns, emr-development-patterns, patient-safety-eval-harness, phi-pii-compliance-patterns, clinical-dialogue-standards...
    ├── UI/UX & Design Engineering    # design-engineering, stop-making-ui-slop, antigravity-ui-motion-design, mobile-design-system, canvas-design, design-components, algorithmic-art, ui-ux-designer, d-web-experience, brand-guidelines...
    ├── Research & Knowledge Hub      # scholar-evaluation, research-synthesizer, auto-research, hypothesis-generation, knowledge-extraction, brain-to-docs, search-first-research, data-structure-protocol-dsp, obsidian-cli...
    ├── Workflow & Quality Skills     # brainstorming, code-reviewer, find-bugs, ui-review, simplify-code, multi-agent-optimization, subagent-coding-workflow...
    ├── Performance & Standards       # performance-optimizer, wcag-audit-patterns, accessibility-wcag-medical...
    ├── Medical Content & SEO         # schema-markup-generator, medical-seo-structure, pubmed-research-linker...
    └── Medical Domain Modules        # pathology-approach-module, symptom-approach-module, clinical-tools...
```

---

## 📚 Tài liệu Phải Đọc Trước

| Khi làm task... | Đọc file / Skill... |
|-----------------|---------------------|
| Bất kỳ task nào | `.agents/docs/PROJECT_OVERVIEW.md` & `rules/*.md` |
| Thiết kế UI/UX, Component | `.agents/rules/design-squad-rules.md` & Skill `design-agent-squad` |
| Quản lý Task Design | `.agents/docs/DESIGN_SQUAD_KANBAN.md` |
| Tìm file cụ thể | `.agents/docs/FILE_MAP.md` |
| Checklist quy trình (A/B/C/D) | `.agents/docs/WORKFLOW_CHECKLISTS.md` |
| Hướng dẫn kiến trúc & Style | `src/styles/README.md` |
| Chuyển đổi Figma → CSS | `.agents/docs/DESIGN_TO_CODE.md` |
| Sửa/Tạo file Hub Cốt lõi | `rules/hub-protection.md` |
| Kiểm thử trước khi bàn giao | Skill `code-reviewer` |

---

## 🛑 Quy tắc Bất di Bất dịch (KHÔNG ĐƯỢC VI PHẠM)

1. **Không di chuyển file HTML/CSS/JS chức năng**: Các file sử dụng đường dẫn tương đối. Di chuyển sẽ làm hỏng toàn bộ liên kết.
2. **Không dùng hardcode màu sắc**: Bắt buộc dùng Design Tokens `var(--color-...)`. Xem chi tiết tại `rules/dark-mode-rules.md`.
3. **Không thêm thư viện JS bên ngoài**: Project dùng Vanilla JS thuần (trừ Google Fonts & FontAwesome).
4. **Không tạo file tại Root**: File mới phải đặt đúng thư mục phân hệ tương ứng và đăng ký vào `docs/FILE_MAP.md`.
5. **Luôn kiểm tra đường dẫn tương đối**: Đếm chính xác cấp thư mục (cấp 3 → `../../../`, cấp 4 → `../../../../`).
6. **Cấm tự ý tạo Guideline trùng lặp hoặc không có yêu cầu**: Bắt buộc kiểm tra `guidelinesdata.js` trước khi tạo file mới. Tuyệt đối không tự ý sinh file guideline trùng lặp nếu chưa được Người dùng chỉ định. Xem chi tiết tại `rules/guideline-creation-rules.md`.
7. **Nguyên tắc Thận Trọng Karpathy & Socratic Gate**: Suy nghĩ trước khi code, không tự ý suy diễn các yêu cầu mơ hồ; đối với thay đổi kiến trúc lớn, bắt buộc làm rõ hoặc lập kế hoạch trước khi chỉnh sửa mã nguồn.


---

## 📐 Quick Reference — Đường dẫn Tương đối & Design Tokens

### Đường dẫn Tương đối
| Cấp | Ví dụ vị trí file | Prefix |
|-----|-------------------|--------|
| 0 (root) | `index.html` | `./` |
| 1 | `pages/Module/hub.html` | `../` |
| 2 | `pages/Module/Sub/page.html` | `../../` |
| 3 | `pages/Module/Sub/Sub2/page.html` | `../../../` |
| 4 | `pages/Sinh lý.../Sinhly/PhanX/file.html` | `../../../../` |

### Design Tokens Chuẩn
```css
var(--color-primary)        /* #0284c7 - Màu chủ đạo */
var(--color-surface)        /* Card background */
var(--color-bg)             /* Page background */
var(--color-text)           /* Body text */
var(--color-text-muted)     /* Secondary text */
var(--color-border)         /* Borders */

var(--color-success)        /* Xanh lá */
var(--color-warning)        /* Vàng */
var(--color-danger)         /* Đỏ */
var(--color-info)           /* Xanh ngọc */
```

---

## 📋 Checklist Trước Khi Commit Thay Đổi

- [ ] Đường dẫn CSS/JS chính xác theo cấp thư mục
- [ ] Không có hardcode màu sắc (`rules/dark-mode-rules.md`)
- [ ] Dark mode hoạt động bình thường (`data-theme="dark"`)
- [ ] Responsive trên mobile (kiểm tra width $\le$ 375px & touch target $\ge$ 44px)
- [ ] `node tools/scratch/check_tags.js <file.html>` pass không lỗi (`rules/html-integrity-rules.md`)
- [ ] `docs/FILE_MAP.md` và Registry liên quan đã được cập nhật
