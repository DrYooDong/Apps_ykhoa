# AGENTS.md — CliniPortal Workspace Rules (Master Entry Point)

> Tài liệu nhập môn cốt lõi cho mọi AI Agent làm việc trong **CliniPortal**. Giữ tối giản theo kỷ luật Always-On Budget (Harness²); chi tiết chuyên sâu nằm trong `.agents/skills/` (on-demand) và `.agents/docs/`.

---

## 🔑 Nhận diện Dự án

- **Tên project**: CliniPortal — Hệ sinh thái Web Y khoa (Tiếng Việt)
- **Thư mục gốc**: `d:\Apps\Apps_ykhoa\`
- **Stack đa tầng**:
  - **Astro MDX Native** (`src/content/`): Cơ sở Y khoa, Sổ tay Lâm sàng, Kho Guidelines EBM, Dược lý.
  - **React 19 + TypeScript + TailwindCSS v4** (`src/content/docspace/`): Phân hệ lâm sàng DocSpace & CDSS.
  - **Pure HTML + Vanilla CSS/JS (ES6+)** (`pages/`, legacy & standalone offline): Hỗ trợ chạy `file:///` offline không cần framework ngoài.

---

## 📚 Bản Đồ Kích Hoạt Nhanh (Trigger Map)

| Khi làm tác vụ... | Nạp tài liệu / Skill tương ứng |
|---|---|
| Bất kỳ task nào | `.agents/docs/PROJECT_OVERVIEW.md`, `.agents/docs/FILE_MAP.md`, `.agents/rules/*.md` |
| Coding siêu tốc, RCA lỗi khó, Kiến trúc C4 | Skills `speed-coding-orchestrator`, `precision-engineering-rca`, `deep-architecture-reasoning` |
| Tiến hóa Harness, `/retro`, tối ưu Skill/Context | Skill `harness-evolution-engine` & `tools/ai_harness/experience_library.py` |
| Nghiên cứu EBM, Landmark RCT, Đồ họa khoa học | Skills `medical-research-card`, `research-synthesizer`, `medical-scientific-figure`, `medical-journal-club-deck` |
| Tóm tắt Guideline MDX | Skill `guideline-summary-module` & `src/content/ebm/guidelines/kho-guidelines/GUIDELINE_MDX_DESIGN_SPEC.md` |
| Sổ tay Lâm sàng / Cơ sở Y khoa MDX | Skills `clinical-handbook-mdx-module`, `basic-medical-mdx-module`, `physiology-module`, `biochemistry-module` |
| DocSpace (Nạp 1-chạm, UI, CDSS, SOAP, QA) | Skills `docspace-oneclick-ingest-agent`, `docspace-ui-feature-squad`, `docspace-medical-qa-squad`, `docspace-soap-guardian-squad` |
| Thiết kế UI/UX, Lưu đồ SVG, QA giao diện | `.agents/docs/design-vault/0.0_DESIGN_VAULT_INDEX.md`, Skills `design-agent-squad`, `flowchart-module`, `code-reviewer` |
| Đẩy GitHub siêu tốc (Windows / Google Drive) | `.agents/docs/GITHUB_FAST_PUSH_GUIDE.md` |

---

## ⚡ Lệnh Nhanh (Slash Commands)

`/new-feature` · `/fix-bug` · `/audit` (`node tools/dev.mjs check <file>`) · `/ship` · `/retro` · `/learn-from-session` · `/validate-system` (`npm run validate:all`)

---

## 🛑 Quy Tắc Bất Di Bất Dịch

1. **Không di chuyển file HTML/CSS/JS chức năng**: Phá vỡ đường dẫn tương đối (`file:///`); luôn đếm đúng cấp thư mục (`./`, `../`, `../../`, `../../../`, `../../../../`).
2. **Không hardcode màu sắc**: Bắt buộc dùng `var(--color-*)` và kiểm thử `data-theme="dark"` (`rules/dark-mode-rules.md`).
3. **Không tự ý thêm thư viện JS ngoài** cho các trang Vanilla HTML/CSS/JS.
4. **Không tạo file rác tại Root**: Đặt đúng thư mục phân hệ và cập nhật `.agents/docs/FILE_MAP.md`.
5. **Cấm tự ý tạo Guideline mới** khi chưa có yêu cầu trực tiếp; bắt buộc kiểm tra trùng lặp trước (`rules/guideline-creation-rules.md`).
6. **Thận trọng & Vi phẫu (Karpathy + Surgical Edits)**: Làm rõ yêu cầu mơ hồ trước khi sửa lớn; dùng `edit_file` thay vì ghi đè toàn file; chẩn đoán gốc rễ (RCA) trước khi vá.

---

## 📋 Checklist Trước Khi Bàn Giao

- [ ] Đường dẫn tương đối chính xác; không hardcode màu; Dark Mode (`data-theme="dark"`) sắc nét.
- [ ] Responsive mobile `≤ 375px` không tràn ngang, touch target `≥ 44px`.
- [ ] Kiểm chứng cơ học pass: `node tools/scratch/check_tags.js <file>`, `npm run validate:all` hoặc `python tools/scripts/validate-skills.py` (khi sửa `.agents/`).
- [ ] Cập nhật `FILE_MAP.md` / Registry liên quan nếu thêm file mới.
