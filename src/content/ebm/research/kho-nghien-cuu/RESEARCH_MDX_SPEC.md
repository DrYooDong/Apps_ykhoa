# CliniResearch Studio — Quy Chuẩn Soạn Thảo & Hệ Nhãn Chung 7 Trục (MDX Specification)

> **Phân hệ**: Kho Phân Tích Nghiên Cứu Y Khoa Chuyên Sâu (`src/content/ebm/research/kho-nghien-cuu/`)  
> **Độc lập hoàn toàn với**: Kho Guidelines & Phác Đồ (`src/content/ebm/guidelines/`)

---

## 1. Quy Tắc Đặt Tên Tệp & Tài Nguyên

- **Đường dẫn lưu bài**: `src/content/ebm/research/kho-nghien-cuu/<year>-<journal>-<trial-or-topic>.mdx`
  - Ví dụ: `2026-nejm-staree-atorvastatin-elderly.mdx`, `2023-nejm-cape-cod-hydrocortisone-severe-cap.mdx`
- **Hình ảnh đính kèm**: Đặt tại `src/content/ebm/research/kho-nghien-cuu/images/<slug>-fig1.png` và nhúng bằng đường dẫn tương đối `./images/<slug>-fig1.png`.
- **Đồng bộ tự động**: Sau khi thêm hoặc chỉnh sửa bất kỳ file `.mdx` nào, chạy:
  ```bash
  npm run sync:research
  npm run qa:research
  ```

---

## 2. Schema 7 Trục Nhãn Chung (Bắt Buộc Trong YAML Frontmatter)

Để tính năng **So Sánh Đa Chiều** và **Gợi Ý Cụm Nghiên Cứu Tự Động** hoạt động chính xác 100%, mọi bài `.mdx` bắt buộc khai báo đủ các khóa sau:

| Trục | Trường YAML | Giá trị chuẩn hóa (`research-taxonomy.ts`) |
|---|---|---|
| **1. Định danh** | `title`, `slug`, `trialAcronym`, `journal`, `year`, `doi`, `pmid`, `nctId`, `category: "research"` | Chuỗi ASCII cho `slug`, số nguyên 4 chữ số cho `year` |
| **2. Bệnh / Vấn đề** | `specialty`, `conditionKey`, `problemLabels`, `icd10` | `conditionKey` dùng để gom cụm nghiên cứu cùng bệnh lý |
| **3. Thiết kế** | `design`, `phase`, `blinding`, `centerScope`, `sampleSize`, `followUpDuration` | `rct` \| `meta-analysis` \| `systematic-review` \| `prospective-cohort` \| `retrospective-cohort` \| `diagnostic-accuracy` \| `clinical-review` |
| **4. PICO chuẩn** | `population`, `interventionClass`, `drug`, `intervention`, `comparatorType`, `primaryEndpointCategory`, `primaryEndpoint` | `interventionClass` gom các thuốc cùng nhóm cơ chế (`sglt2i`, `statin`, `systemic-corticosteroid`, `antimicrobial-pkpd`...) |
| **5. Kết quả & Số liệu** | `outcomeDirection`, `impactVerdict`, `keyResults`, `primaryMetric`, `safetyHighlight` | `outcomeDirection`: `positive-superior` \| `non-inferior` \| `mixed-coprimary` \| `neutral-null` \| `harm-negative` |
| **6. Thẩm định** | `robOverall`, `gradeCertainty`, `fragilityIndex`, `fundingSource` | `robOverall`: `low` \| `some-concerns` \| `high` \| `not-applicable`; `gradeCertainty`: `high` \| `moderate` \| `low` \| `very-low` |
| **7. Nhãn mở rộng** | `topicTags` | Mảng các nhãn câu hỏi nghiên cứu (ví dụ: `["du-phong-tien-phat", "lao-khoa"]`) |
