# 🩺 EBM & SCIENTIFIC RESEARCH SQUAD MASTER KANBAN
> **Bảng Điều Phối Master 5 Đội Ngũ Nghiên Cứu Khoa Học & Thiết Kế Tóm Tắt Y Văn Chuẩn Nature & EBM 2026**  
> **Dự án**: CliniPortal — Hệ sinh thái Web Y khoa  
> **Kế thừa tri thức từ**: `nature-skills` (Yuan1z0825/nature-skills)

---

## 🏛️ 1. Cấu Trúc 5 Đội Ngũ Chuyên Trách (The 5 Specialized Research Squads)

Hệ thống Nghiên cứu Khoa học & Y học Chứng cứ tại CliniPortal được vận hành bởi 5 Đội ngũ AI chuyên trách, phối hợp nhịp nhàng theo chu trình khép kín:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. LITERATURE INGESTION & DEEP READING SQUAD (Tiếp nhận & Đọc sâu Y văn)    │
│    Skills: auto-research, pubmed-research-linker, nature-reader             │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. RESEARCH SUMMARY & VISUAL PAPER CARD SQUAD (Thiết kế Tóm tắt 16 Mục)    │
│    Skills: medical-research-card, research-synthesizer, guideline-summary   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. MEDICAL SCIENTIFIC FIGURE & GRAPHICAL ABSTRACT SQUAD (Đồ họa xuất bản)   │
│    Skills: medical-scientific-figure, medical-editorial-diagram, flowchart  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. METHODOLOGY, STATISTICS & CRITICAL APPRAISAL QA SQUAD (Thẩm định RoB)    │
│    Skills: scholar-evaluation, patient-safety-eval-harness, code-reviewer   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. SCIENTIFIC PRESENTATION & JOURNAL CLUB DECK SQUAD (Slide báo cáo EBM)    │
│    Skills: medical-journal-club-deck, reveal.js v6 presentation engine      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 2. Bảng Điều Phối Kanban (Workflow Kanban Board)

| Trạng thái | Mã Nhiệm Vụ | Nội Dung Nhiệm Vụ & Sản Phẩm Đầu Ra | Đội Ngũ Phụ Trách | Skill Tương Ứng |
|---|---|---|---|---|
| **DONE** | `EBM-01` | Nâng cấp toàn diện `research-synthesizer` thành Master Skill Tổng hợp Y học Chứng cứ chuẩn Nature | Squad 2 (Summary) | `research-synthesizer` |
| **DONE** | `EBM-02` | Đại tu `scholar-evaluation` tích hợp Cochrane RoB 2.0, GRADE, Kiểm toán thống kê & Nature-Reviewer | Squad 4 (Methodology QA) | `scholar-evaluation` |
| **DONE** | `EBM-03` | Tạo mới Skill `medical-research-card` (Thẻ giải phẫu nghiên cứu y khoa 16 mục chuẩn Nature) | Squad 2 (Summary) | `medical-research-card` |
| **DONE** | `EBM-04` | Tạo mới Skill `medical-scientific-figure` (Đồ họa xuất bản, Multi-panel Figure & PRISMA SVG) | Squad 3 (Figure Design) | `medical-scientific-figure` |
| **DONE** | `EBM-05` | Tạo mới Skill `medical-journal-club-deck` (Thiết kế bài thuyết trình Journal Club Reveal.js / PPTX) | Squad 5 (Presentation) | `medical-journal-club-deck` |
| **DONE** | `EBM-06` | Ban hành tài liệu `RESEARCH_SUMMARY_DESIGN_SYSTEM.md` chuẩn hóa trình bày bài tóm tắt | Toàn thể 5 Squads | `RESEARCH_SUMMARY_DESIGN_SYSTEM.md` |
| **READY** | `EBM-07` | Chuẩn hóa 105+ bài Landmark Trials & Guidelines hiện có trong `kho-guidelines/` theo chuẩn 16 mục | Squad 2 + Squad 4 | `medical-research-card` |
| **READY** | `EBM-08` | Thiết lập bộ công cụ tự động hóa kiểm định trích dẫn PubMed / DOI và Retraction Watch | Squad 1 + Squad 4 | `pubmed-research-linker` |

---

## 🧭 3. Ma Trận Phân Định Trách Nhiệm & Tiêu Chuẩn Bàn Giao

### Squad 1: Literature Ingestion & Deep Reading Squad
- **Nhiệm vụ**: Tiếp nhận bản toàn văn (PDF/HTML/DOI), bóc tách text, figures, tables và công thức chính xác.
- **Tiêu chuẩn bàn giao**: Lập bảng thuật ngữ cố định (Terminology Ledger), không dịch sai tên thuốc, tên gen và các mốc chỉ số.

### Squad 2: Research Summary & Visual Paper Card Squad
- **Nhiệm vụ**: Soạn thảo bài tóm tắt nghiên cứu 16 mục chuẩn Nature dạng Astro MDX Native (`src/content/ebm/guidelines/kho-guidelines/<slug>.mdx`).
- **Tiêu chuẩn bàn giao**: Đủ 16 đầu mục, có Dải chỉ số then chốt (`.stats-strip`), Bento Grid PICO (`.pico-bento-grid`), Bảng điểm kết thúc (`.trial-endpoints-table`), và Hộp phán quyết (`.verdict-box`).

### Squad 3: Medical Scientific Figure & Graphical Abstract Squad
- **Nhiệm vụ**: Vẽ sơ đồ cơ chế phân tử, sơ đồ dòng chảy PRISMA 2020 và biểu đồ Forest Plot phân tích gộp thuần Inline SVG.
- **Tiêu chuẩn bàn giao**: 100% SVG thuần, thích ứng Dark Mode, có Hero Panel, bảng màu kiềm chế Nature, không bị va chạm đè nhãn (Zero-Collision).

### Squad 4: Methodology, Statistics & Critical Appraisal QA Squad
- **Nhiệm vụ**: Thẩm định phương pháp luận, chấm điểm 5 miền Cochrane RoB 2.0, đánh giá mức độ chắc chắn chứng cứ GRADE, tính toán ARR/NNT và kiểm toán thống kê.
- **Tiêu chuẩn bàn giao**: Thẻ RoB 2.0 (`.rob-card`), báo cáo rà soát sai số loại I/II, khẳng định giới hạn quần thể áp dụng (Bounded Conclusions).

### Squad 5: Scientific Presentation & Journal Club Deck Squad
- **Nhiệm vụ**: Xây dựng bộ slide thuyết trình sinh hoạt khoa học / Journal Club 10-15 slide bằng HTML Reveal.js v6 hoặc PPTX học thuật.
- **Tiêu chuẩn bàn giao**: 100% slide có Speaker Notes chuyên sâu, cốt truyện luận chứng vững chắc, dẫn chứng nguồn hình ảnh gốc rõ ràng.

---

## 🛡️ 4. Quy Tắc Bất Di Bất Dịch (Research Squad Red Lines)

1. **Tuyệt Đối Không Sinh Tuyên Bố Không Có Bằng Chứng (Zero-Hallucination)**: Mọi kết luận phải truy nguyên được số liệu trong bài báo gốc.
2. **Không Tự Ý Tạo File Trùng Lặp**: Tuân thủ nghiêm ngặt quy tắc tại `rules/guideline-creation-rules.md`. Luôn kiểm tra registry `kho-guidelines-registry.ts` trước khi tạo file mới.
3. **100% Làm Sạch Ký Tự $ Math LaTeX**: Không để sót ký tự `$` gây vỡ giao diện web.
4. **Bảo Tồn Bản Quyền & Tính Toàn Vẹn Học Thuật**: Ghi nhận nguồn trích dẫn đầy đủ (Tác giả, Tạp chí, Năm, DOI, PMID).
