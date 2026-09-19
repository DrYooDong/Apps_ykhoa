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
│   ├── DOCSPACE_4STEPS_AGENT_KANBAN.md # 🩺 Bảng điều phối Master Kanban của 4 Đội ngũ Chu trình Lâm sàng DocSpace (Bước 1 - Bước 4)
│   ├── DOCSPACE_UI_FEATURE_KANBAN.md # 🩺 Bảng điều phối Kanban của DocSpace UI/UX & Feature Squad
│   ├── DOCSPACE_MEDICAL_QA_KANBAN.md # 🩺 Bảng điều phối Kanban của DocSpace Medical Knowledge Squad
│   ├── DOCSPACE_CASE_INGESTION_KANBAN.md # 🤖 Bảng điều phối Kanban của Case Ingestion & Prompt Squad
│   ├── DOCSPACE_CLINICAL_DATA_QA_KANBAN.md # 🩺 Bảng điều phối Kanban của Clinical Data Verification Squad (Viết tắt, Lọc trùng, HTML Entities)
│   ├── DOCSPACE_CLINICAL_SIMULATION_KANBAN.md # 🎓 Bảng điều phối Kanban của Simulation & Education Squad
│   ├── DOCSPACE_TREATMENT_PROTOCOL_KANBAN.md # 🩺 Bảng điều phối Kanban của Treatment Protocol UI & Data Squads (6 Đầu Mục & Bảng 4 Cột)
│   ├── DESIGN_TO_CODE.md             # Hướng dẫn thiết kế sang mã nguồn
│   └── design-vault/                 # 🏛️ Hệ thống 4 Kho Thiết Kế Chuyên Biệt (Design Vaults)
│       ├── 0.0_DESIGN_VAULT_INDEX.md
│       ├── 1.0_DESIGN_TOKENS_VAULT.md
│       ├── 2.0_UI_PATTERNS_VAULT.md
│       ├── 3.0_SVG_GRAPHICS_VAULT.md
│       └── 4.0_ACCESSIBILITY_AND_ERGONOMICS_VAULT.md
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
    ├── Healthcare AI & Safety        # docspace-step1-ingestion-squad, docspace-step2-reasoning-squad, docspace-step3-cdss-squad, docspace-step4-protocol-squad, docspace-treatment-data-engineering-squad, docspace-treatment-protocol-ui-squad, docspace-clinical-simulation-squad, docspace-case-ingestion-squad, docspace-medical-qa-squad, cdss-development-patterns, emr-development-patterns, patient-safety-eval-harness, docspace-clinical-pipeline, docspace-cdss-builder, docspace-soap-ingester, docspace-prompt-06-07-ingester...
    ├── UI/UX & Design Engineering    # docspace-step4-protocol-squad, docspace-treatment-protocol-ui-squad, docspace-ui-feature-squad, design-engineering, stop-making-ui-slop, antigravity-ui-motion-design, mobile-design-system, canvas-design, design-components, algorithmic-art, ui-ux-designer, d-web-experience, brand-guidelines...
    ├── Research & Knowledge Hub      # scholar-evaluation, research-synthesizer, auto-research, hypothesis-generation, knowledge-extraction, brain-to-docs, search-first-research, data-structure-protocol-dsp, obsidian-cli...
    ├── Workflow & Quality Skills     # brainstorming, code-reviewer, find-bugs, ui-review, simplify-code, multi-agent-optimization, subagent-coding-workflow...
    ├── Performance & Standards       # performance-optimizer, wcag-audit-patterns, accessibility-wcag-medical...
    ├── Medical Content & SEO         # schema-markup-generator, medical-seo-structure, pubmed-research-linker...
    └── Medical Domain Modules        # pathology-approach-module, symptom-approach-module, clinical-tools, docspace-clinical-pipeline, docspace-cdss-builder, docspace-soap-ingester, docspace-prompt-06-07-ingester...
```

---

## 📚 Tài liệu Phải Đọc Trước

| Khi làm task... | Đọc file / Skill... |
|-----------------|---------------------|
| Bất kỳ task nào | `.agents/docs/PROJECT_OVERVIEW.md` & `rules/*.md` |
| UI/UX & Tính năng DocSpace | Skill `docspace-ui-feature-squad`, `.agents/docs/DOCSPACE_UI_FEATURE_KANBAN.md` & `src/content/docspace/docs/UI_FEATURE_DESIGN_SYSTEM.md` |
| Kiểm định Dữ liệu Lâm sàng, Viết tắt & Lọc trùng | Skill `docspace-clinical-data-qa-squad`, `.agents/docs/DOCSPACE_CLINICAL_DATA_QA_KANBAN.md` |
| Kiểm định & Chuẩn hóa Y khoa DocSpace | Skill `docspace-medical-qa-squad`, `.agents/docs/DOCSPACE_MEDICAL_QA_KANBAN.md` & `src/content/docspace/docs/MEDICAL_KNOWLEDGE_STANDARDIZATION_GUIDELINES.md` |
| Nạp Ca & Khai thác NotebookLM DocSpace | Skill `docspace-case-ingestion-squad`, `.agents/docs/DOCSPACE_CASE_INGESTION_KANBAN.md` & `src/content/docspace/docs/CASE_INGESTION_SOP.md` |
| Giả lập Lâm sàng, OSCE & EMR DocSpace | Skill `docspace-clinical-simulation-squad`, `.agents/docs/DOCSPACE_CLINICAL_SIMULATION_KANBAN.md` & `src/content/docspace/docs/CLINICAL_SIMULATION_GUIDELINES.md` |
| DocSpace, CDSS, Prompts, Bệnh học | Skill `docspace-clinical-pipeline`, `docspace-cdss-builder`, `docspace-soap-ingester`, `docspace-prompt-06-07-ingester` |
| Thiết kế UI/UX, Component CliniPortal | `.agents/docs/design-vault/0.0_DESIGN_VAULT_INDEX.md` & Skill `core-components` |
| Quản lý Task Design CliniPortal | `.agents/docs/DESIGN_SQUAD_KANBAN.md` |
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
