---
name: research-analysis-module
description: >-
  Soạn thảo, chuẩn hóa 7 trục Nhãn chung và tích hợp các bài phân tích chuyên sâu nghiên cứu y khoa (RCT, Meta-Analysis, Systematic Review, Cohort, Diagnostic Study) theo chuẩn Astro MDX Native tại phân hệ độc lập CliniResearch Studio (src/content/ebm/research/kho-nghien-cuu/<slug>.mdx). Kích hoạt khi người dùng thu thập hoặc yêu cầu phân tích bài báo nghiên cứu khoa học mới (tách biệt hoàn toàn với Kho Guidelines CPG/BYT).
---

# CliniResearch Studio — Research Analysis & Shared-Label Synthesis Skill

Kỹ năng này vận hành quy trình thu thập, giải phẫu học thuật chuyên sâu và gắn nhãn đối sánh cho các **bài nghiên cứu y khoa** tại phân hệ độc lập **`src/content/ebm/research/`** (hoàn toàn tách rời khỏi phân hệ khuyến cáo `src/content/ebm/guidelines/`).

---

## 1. Phân Định Ranh Giới Nghiêm Ngặt Với Kho Guidelines

- **Dùng `guideline-summary-module`** (`src/content/ebm/guidelines/kho-guidelines/`): CHỈ dành cho Hướng dẫn thực hành lâm sàng chính thức (CPGs) từ các Hiệp hội lớn (ESC, AHA/ACC, ADA, KDIGO, GOLD, GINA, IDSA, WHO...), Phác đồ Bộ Y tế / Sở Y tế và Đồng thuận Hội chuyên khoa.
- **Dùng `research-analysis-module` (Skill này)** (`src/content/ebm/research/kho-nghien-cuu/`): Dành cho toàn bộ các **bài báo nghiên cứu khoa học** (Landmark RCT, Pragmatic Trial, Systematic Review, Meta-Analysis, Prospective/Retrospective Cohort, Case-Control, Nghiên cứu Chẩn đoán / Biomarker, State-of-the-Art Review).

---

## 2. Quy Trình 5 Bước Thu Thập & Xuất Bản Nghiên Cứu Mới

1. **Kiểm tra trùng lặp**: Đối chiếu `DOI`, `PMID`, `NCT` và `slug` trong `src/content/ebm/research/js/research-registry.ts`.
2. **Đặt tên file chuẩn**: `<year>-<journal>-<trial-or-topic>.mdx` (ASCII chữ thường kebab-case) đặt tại `src/content/ebm/research/kho-nghien-cuu/`. Ảnh minh họa lưu tại `src/content/ebm/research/kho-nghien-cuu/images/<slug>-figX.png`.
3. **Gắn đầy đủ 7 Trục Nhãn Chung trong YAML Frontmatter** (xem `src/content/ebm/research/kho-nghien-cuu/RESEARCH_MDX_SPEC.md` và mẫu `src/content/ebm/research/tools/templates/template-research-study.mdx`):
   - `conditionKey` & `problemLabels` (Nhãn Bệnh / Vấn đề)
   - `design`, `blinding`, `sampleSize`, `followUpDuration` (Nhãn Thiết kế)
   - `interventionClass`, `comparatorType`, `primaryEndpointCategory` (Nhãn PICO chuẩn hóa)
   - `outcomeDirection` (`positive-superior` | `non-inferior` | `mixed-coprimary` | `neutral-null` | `harm-negative`) & `impactVerdict`
   - `primaryMetric` (`measure`, `effectEstimate`, `ciLower`, `ciUpper`, `pValue`, `nnt`) để tự động vẽ **Cross-Study Forest Plot SVG** trên Bàn Cân Đối Sánh.
   - `robOverall` & `gradeCertainty` (Nhãn Thẩm định sai lệch)
   - `topicTags` (Nhãn gom cụm chủ đề so sánh)
4. **Biên tập Giải phẫu Chuyên sâu**: Bảo toàn 100% dữ liệu định lượng từ bài gốc, phân tách rõ phát biểu của tác giả và thẩm định phản biện độc lập (RoB 2.0 / ROBINS-I, Fragility Index, giới hạn quần thể), làm sạch 100% lỗi ký tự math `$` thừa.
5. **Đồng bộ & Kiểm định Cơ học Bắt buộc**:
   ```bash
   npm run sync:research
   npm run qa:research
   npm run validate:mdx -- src/content/ebm/research/kho-nghien-cuu/<slug>.mdx
   ```
