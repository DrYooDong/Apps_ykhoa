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
│   └── guideline-creation-rules.md   # 9. Quy tắc kiểm soát tạo Guideline & chống trùng lặp
└── skills/                           # Thư mục 39+ Skills chuyên môn & workflow
    ├── Workflow & Quality Skills     # brainstorming, code-reviewer, find-bugs, ui-review, simplify-code...
    ├── Performance & Standards       # performance-optimizer, wcag-audit-patterns, accessibility-wcag-medical...
    ├── Medical Content & SEO         # schema-markup-generator, medical-seo-structure, pubmed-research-linker...
    └── Medical Domain Modules        # pathology-approach-module, symptom-approach-module, clinical-tools...
```

---

## 📚 Tài liệu Phải Đọc Trước

| Khi làm task... | Đọc file / Skill... |
|-----------------|---------------------|
| Bất kỳ task nào | `docs/PROJECT_OVERVIEW.md` & `rules/*.md` |
| Tìm file cụ thể | `docs/FILE_MAP.md` |
| Checklist quy trình (A/B/C/D) | `docs/WORKFLOW_CHECKLISTS.md` |
| Thêm CSS/JS mới | `css/README.md`, `js/README.md` |
| Chuyển đổi Figma → CSS | `docs/DESIGN_TO_CODE.md` |
| Tạo trang mới (tổng quát) | `pages/README.md` |
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
- [ ] `node scratch/check_tags.js <file.html>` pass không lỗi (`rules/html-integrity-rules.md`)
- [ ] `docs/FILE_MAP.md` và Registry liên quan đã được cập nhật
