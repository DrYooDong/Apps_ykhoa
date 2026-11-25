---
name: research-analysis-module
description: >-
  Soạn thảo, chuẩn hóa 7 trục Nhãn chung và tích hợp các bài phân tích chuyên sâu nghiên cứu y khoa (RCT, Meta-Analysis, Systematic Review, Cohort, Diagnostic Study) theo chuẩn Astro MDX Native tại phân hệ độc lập CliniResearch Studio (src/content/ebm/research/kho-nghien-cuu/<slug>.mdx). Kích hoạt khi người dùng thu thập hoặc yêu cầu phân tích bài báo nghiên cứu khoa học mới (tách biệt hoàn toàn với Kho Guidelines CPG/BYT).
---

# CliniResearch Studio — Research Analysis & Shared-Label Synthesis Skill

Kỹ năng này vận hành quy trình thu thập, giải phẫu học thuật chuyên sâu và gắn nhãn đối sánh cho các **bài nghiên cứu y khoa** tại phân hệ độc lập **`src/content/ebm/research/`** (hoàn toàn tách rời khỏi phân hệ khuyến cáo `src/content/ebm/guidelines/`).

---

## 1. Phân Định Ranh Giới Nghiêm Ngặt Với Kho Guidelines

- **Dùng `guideline-summary-module`** (`src/content/ebm/guidelines/kho-guidelines/`): Dành cho Hướng dẫn thực hành lâm sàng chính thức (CPGs) từ các Hiệp hội lớn (ESC, AHA/ACC, ADA, KDIGO, GOLD, GINA, IDSA, WHO...), Phác đồ Bộ Y tế / Sở Y tế, Đồng thuận Hội chuyên khoa, **bài hướng dẫn tiếp cận / thực hành lâm sàng** (NEJM Clinical Practice, CHEST How I Do It, AJR Algorithmic Approach, Nature Reviews Disease Primers, Lancet Seminar, Narrative Clinical Reviews & Sách hướng dẫn thực hành).
- **Dùng `research-analysis-module` (Skill này)** (`src/content/ebm/research/kho-nghien-cuu/`): CHỈ dành cho các **bài báo nghiên cứu khoa học gốc hoặc phân tích tổng hợp định lượng** (Landmark RCT, Pragmatic Trial, Systematic Review & Meta-Analysis định lượng, Prospective/Retrospective Cohort, Case-Control, Nghiên cứu Chẩn đoán / Biomarker gốc).

---

## 2. Quy Trình 5 Bước Thu Thập & Xuất Bản Nghiên Cứu Mới

1. **Kiểm tra trùng lặp**: Đối chiếu `DOI`, `PMID`, `NCT` và `slug` trong `src/content/ebm/research/js/research-registry.ts`.
2. **Đặt / Tự động đổi tên file chuẩn theo nội dung**: `<year>-<journal>-<trial-or-topic>.mdx` (ASCII chữ thường kebab-case) đặt tại `src/content/ebm/research/kho-nghien-cuu/`.
   - **Quy tắc bắt buộc khi "nạp design" cho file nháp (ví dụ `new.mdx`, `draft.mdx`, `untitled.mdx`)**: Tự động đổi tên tệp sang `<year>-<journal>-<trial-or-topic>.mdx` khớp với nội dung công trình, đồng bộ tuyệt đối `id` và `slug` trong YAML Frontmatter với tên file mới, rồi chạy `npm run sync:research` để không để lại slug rác trong registry.
   - Ảnh minh họa lưu tại `src/content/ebm/research/kho-nghien-cuu/images/<slug>-figX.png`.
3. **Gắn đầy đủ 7 Trục Nhãn Chung trong YAML Frontmatter** (xem `src/content/ebm/research/kho-nghien-cuu/RESEARCH_MDX_SPEC.md` và khuôn mẫu chuẩn mới `src/content/ebm/research/tools/templates/template-research-case-review.mdx` hoặc `template-research-study.mdx`):
   - `conditionKey` & `problemLabels` (Nhãn Bệnh / Vấn đề)
   - `design`, `blinding`, `sampleSize`, `followUpDuration` (Nhãn Thiết kế)
   - `interventionClass`, `comparatorType`, `primaryEndpointCategory` (Nhãn PICO chuẩn hóa)
   - `outcomeDirection` (`positive-superior` | `non-inferior` | `mixed-coprimary` | `neutral-null` | `harm-negative`) & `impactVerdict`
   - `primaryMetric` (`measure`, `effectEstimate`, `ciLower`, `ciUpper`, `pValue`, `nnt`) để tự động vẽ **Cross-Study Forest Plot SVG** trên Bàn Cân Đối Sánh.
   - `robOverall` & `gradeCertainty` (Nhãn Thẩm định sai lệch)
   - `topicTags` (Nhãn gom cụm chủ đề so sánh)
4. **Biên tập Giải phẫu Chuyên sâu theo Mô típ 3 Phần (Case-Driven Peer-Review Motif)**:
   - Mặc định ưu tiên áp dụng mô típ giao diện chuẩn trong `src/content/ebm/research/tools/templates/template-research-case-review.mdx` & `research-article.css`:
     - **Masthead Bình duyệt + Stats Strip + 3 Pillars + Sticky Quickmenu**
     - **Phần 1 (Clinical Vignette)**: Hồ sơ ca lâm sàng (`.res-vignette-dossier`, `.res-patient-strip`) + 3 Ngã rẽ quyết định (`Q1`–`Q3`, `.res-crossroads-list`).
     - **Phần 2 (Study Analysis & Peer-Review)**: Đặt vấn đề → Phương pháp luận & Sơ đồ PRISMA/Flowchart **Pure Editorial SVG** (100% `--res-*` tokens, tuyệt đối không để ASCII art) + `.pico-bento-grid` → Bảng tổng hợp kết quả + Biểu đồ SVG trực quan + Phân tích theo chủ đề (`.res-theme-grid`) → Phản biện Điểm mạnh/Hạn chế (`.res-split-grid`) & `.rob-card`.
     - **Phần 3 (Clinical Decision & Conclusion)**: Đối chiếu giải đáp 1-1 (`Q1`–`Q3`, `.res-resolution-grid`) + `.verdict-box` + trích dẫn chuẩn AMA.
   - Bảo toàn 100% dữ liệu định lượng từ bài gốc, phân tách rõ phát biểu của tác giả và thẩm định phản biện độc lập (RoB 2.0 / ROBINS-I, Fragility Index, giới hạn quần thể), làm sạch 100% lỗi ký tự math `\\(...\\)` / `$` thừa và lỗi chính tả.
5. **Đồng bộ & Kiểm định Cơ học Bắt buộc**:
   ```bash
   npm run sync:research
   npm run qa:research
   npm run validate:mdx -- src/content/ebm/research/kho-nghien-cuu/<slug>.mdx
   ```
