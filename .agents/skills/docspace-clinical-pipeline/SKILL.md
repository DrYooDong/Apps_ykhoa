---
name: docspace-clinical-pipeline
description: >
  Master Skill điều phối toàn diện Chu trình Lâm sàng 4 Bước của CliniPortal DocSpace (src/content/docspace)
  và bộ prompt y khoa (src/content/docspace/docs/prompts/). Kích hoạt khi AI cần: nạp dữ liệu bệnh lý từ NotebookLM
  (Prompt 00, 05, 06, 07, 08, 01-04), tích hợp bệnh mới vào CSDL, kiểm tra tính toàn vẹn 4 Bước lâm sàng
  (Bước 1 Ca mẫu -> Bước 2 Tóm tắt & Tam giác DTH -> Bước 3 CDSS & Phân độ -> Bước 4 Bảng 3 Cột, Phác đồ 9 phân mục & SOAP),
  chuẩn hóa chuyên khoa và chạy audit kiểm định tự động.
---

# DocSpace Clinical Pipeline — Master Orchestrator Skill

Tài liệu này định nghĩa quy trình chuẩn mực, kiến trúc luồng dữ liệu và bộ quy tắc bất biến cho AI Agent chuyên trách vận hành, tích hợp dữ liệu từ bộ prompt tại `src/content/docspace/docs/prompts/` vào hệ thống **CliniPortal DocSpace** (`src/content/docspace/`).

---

## 🏛️ 1. Bản Đồ Kiến Trúc Chu Trình Lâm Sàng 4 Bước

Hệ thống CliniPortal DocSpace vận hành theo chu trình lâm sàng khép kín 4 bước, kết nối chặt chẽ giữa dữ liệu giao diện và CSDL tri thức:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 1: TIẾP NHẬN DỮ LIỆU BỆNH NHÂN (DATA INGESTION)                                  │
│ • Nạp ca bệnh thực tế từ Sample Cases Bar (Prompt 06: sample-clinical-cases.json)      │
│ • Nhập thông tin hành chính, lý do vào viện, bệnh sử (cn), tiền căn (tc), CLS (cls)   │
│ • Đo lường 6 sinh hiệu cốt lõi (Mạch, HA, Nhiệt, Thở, SpO2) & 5 chỉ số xét nghiệm khẩn│
│ • Khai thác Bối cảnh Dịch tễ: Vùng lưu hành, ổ dịch, véc-tơ, lịch sử tiêm chủng        │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 2: TÓM TẮT BỆNH ÁN & ĐẶT VẤN ĐỀ (PROBLEM STATEMENT & DTH TRIANGLE)               │
│ • Tổng hợp tóm tắt bệnh án tự động theo văn phong lâm sàng chuẩn mực                  │
│ • Phân tầng 3 mức độ vấn đề: Tầng 1 (Đe dọa sinh mạng) - Tầng 2 (Cấp) - Tầng 3 (Mạn)   │
│ • Cảnh báo mâu thuẫn/xung đột xử trí giữa các vấn đề đồng mắc                          │
│ • Kích hoạt Tam giác Chẩn đoán Dịch tễ học (Epidemiology Boost 1.2x – 1.25x)          │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 3: PHÂN TÍCH CDSS & BIỆN LUẬN CHẨN ĐOÁN (EVIDENCE & STAGING CRITERIA)            │
│ • Tính toán xác suất chẩn đoán theo ma trận trọng số suy luận (dt, gy, ht, loaitru)    │
│ • Chấm điểm nguy cơ tự động: NEWS2 (Người lớn), PEWS (Nhi khoa), ESI v4 (Cấp cứu 5 cấp)│
│ • Khối 1: Tiêu chuẩn chẩn đoán xác định & Tiêu chuẩn vàng (Gold Standard)              │
│ • Khối 2: Tiêu chuẩn phân độ nặng lâm sàng (severityGrading: Độ 1, Độ 2, Độ 3, Độ 4)   │
│   🛑 BẮT BUỘC: Chỉ chứa tiêu chí [Lâm sàng], [Cận lâm sàng], [Tiêu chuẩn an toàn]     │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ BƯỚC 4: PHÁC ĐỒ ĐIỀU TRỊ TOÀN DIỆN & KHO TRI THỨC (STRATEGY TABLE & 9 SECTIONS)       │
│ • Bảng Chiến Lược 3 Cột: Tuyến tiếp nhận | Định hướng xử trí | Mục tiêu sinh hiệu      │
│ • 9 Phân mục điều trị chuyên sâu (Mục 1 chọn phân độ luôn mở; Mục 2-9 collapsible):  │
│   Mục 1 (Phân độ & Bảng 3 Cột) ➔ Mục 2 (Xử trí biến chứng khẩn & Cờ đỏ On-Call)       │
│   ➔ Mục 3 (Quy trình cấp cứu & Tuyến: Ngoại trú / Nội trú / ICU)                       │
│   ➔ Mục 4 (Y lệnh thuốc: Kháng sinh kinh nghiệm, đích, kiểm tra DDI an toàn)           │
│   ➔ Mục 5 (Thang điểm nguy cơ & CDSS) ➔ Mục 6 (Theo dõi sinh hiệu & CLS)               │
│   ➔ Mục 7 (Tư vấn xuất viện Teach-Back & Kiểm soát lây nhiễm)                          │
│   ➔ Mục 8 (Khuyến cáo EBM Guidelines & Clinical Pathways liên kết 16 Phân kho)         │
│   ➔ Mục 9 (Ca thực chiến SOAP & Prompt AI hội chẩn tại giường bệnh).                   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 2. Bản Đồ Bộ Prompt Tinh Gọn (`src/content/docspace/docs/prompts/`)

Từ phiên bản v3.0, toàn bộ hệ thống prompt được tinh gọn thành **Bộ 3 Prompt Thực Chiến Cốt Lõi** (các prompt cũ được bảo lưu tại `src/content/docspace/docs/prompts/archive/`):

| STT | File Prompt | Định Dạng Dữ Liệu | Đích Nạp Trong Dự Án | Kết Nối Chu Trình Lâm Sàng |
| :---: | :--- | :--- | :--- | :--- |
| **01** | `01-prompt-phac-do-phan-nhanh.txt` | **Master Dynamic Branching JSON** | `src/content/docspace/data/enriched/<slug>.json` | Bước 3 (`criteria`, `severityGrading`, `triage_score`) & Bước 4 (Bảng 4 Cột, 6 Đầu mục & An toàn kê đơn) |
| **02** | `02-prompt-ca-mau-va-trong-so.txt` | **1. Ca mẫu JSON**<br>**2. Trọng số CDSS** | 1. `sample-clinical-cases.json`<br>2. `data/symptoms/` & `data/diseases/` | Bước 1 (Ca mẫu sinh hiệu/triệu chứng), Bước 2 (DTH), Bước 3 (% Suy luận lâm sàng) |
| **03** | `03-prompt-ho-so-ca-benh-soap.txt` | **SOAP Markdown Frontmatter** | Nạp 1-chạm trên Web (hoặc lưu `knowledge-vault/ba/`) | Bước 4 (Hội chẩn AI & Ca thực chiến) & Sổ tay kinh nghiệm SOAP |
| **Lưu trữ** | `archive/` | Toàn bộ prompt cũ (00-09) | `src/content/docspace/docs/prompts/archive/` | Dùng để tra cứu lịch sử phát triển khi cần |

---

## 🛑 3. Năm Nguyên Tắc Bất Biến Chống Lỗi Hệ Thống (Inviolable Rules)

Khi tích hợp bất kỳ mặt bệnh nào từ bộ prompt, AI Agent **TUYỆT ĐỐI KHÔNG ĐƯỢC VI PHẠM** 5 nguyên tắc sau:

### 1. Chuẩn hóa Chuyên khoa Đơn lẻ (Specialty Normalization)
- **CẤM** sử dụng chuỗi ghép dài: `Thần kinh - Truyền nhiễm - Hồi sức Cấp cứu`, `Nhiễm / Hô hấp`, `Truyền nhiễm & Thần kinh`.
- **BẮT BUỘC** dùng đúng tên chuyên khoa chuẩn y tế Việt Nam:
  `"Truyền nhiễm"`, `"Tim mạch"`, `"Hô hấp"`, `"Tiêu hóa"`, `"Tiết niệu"`, `"Nội tiết"`, `"Thần kinh"`, `"Sản phụ khoa"`, `"Da liễu"`, `"Huyết học"`, `"Nhi khoa"`, `"Hồi sức - Cấp cứu"`, `"Cơ xương khớp"`, `"Ngoại khoa"`.
- Nếu bệnh có tính liên chuyên khoa, hãy chọn chuyên khoa quản lý chính (ví dụ: Viêm màng não do Não mô cầu/Phế cầu $\rightarrow$ `"Truyền nhiễm"`).

### 2. Đồng bộ Định danh & Ánh xạ Đa Key (ID Aliasing Pattern)
- Tránh phân mảnh ID khiến Bước 3/4 rơi vào fallback generic.
- Tại `src/content/docspace/data/diagnostic-criteria-database.ts`, khi đăng ký một mặt bệnh, **BẮT BUỘC** ánh xạ toàn bộ các biến thể slug và kebab-case về cùng khối Enriched:
  ```typescript
  'sot_xuat_huyet_dengue': ENRICHED_DISEASES['sot_xuat_huyet_dengue'],
  'sot_xuat_huyet': ENRICHED_DISEASES['sot_xuat_huyet_dengue'],
  
  'viem_mang_nao': ENRICHED_DISEASES['viem_mang_nao'],
  'viem_mang_nao_mu': ENRICHED_DISEASES['viem_mang_nao'],
  'viem-mang-nao-vi-khuan-cap': ENRICHED_DISEASES['viem_mang_nao'],
  ```

### 3. Không Để Lại Triệu Chứng Mồ Côi (Zero-Orphan Symptoms Rule)
- Mọi triệu chứng được liệt kê trong mảng ma trận `dd` của bệnh lý tại `clinical-rules-diseases.json` **BẮT BUỘC PHẢI TỒN TẠI** trong từ điển `clinical-rules-symptoms.json`.
- Khi Prompt 06 sinh ra triệu chứng mới (ví dụ: `vm_sot_cao_canh_bao`, `vm_cung_gay_duong_tinh`), AI phải nạp đồng thời vào `clinical-rules-symptoms.json` trước khi thêm vào `dd`.

### 4. Phân Định Rạch Ròi Giữa Bước 3 & Bước 4
- **Tại Bước 3 (`severityGrading.criteria`)**: Chỉ mô tả tiêu chuẩn nhận diện mức độ nặng kèm tiền tố bóc tách `[Lâm sàng]`, `[Cận lâm sàng]`, `[Tiêu chuẩn an toàn]`, `[Dấu hiệu cảnh báo]`. **TUYỆT ĐỐI KHÔNG** để lẫn thuốc, dịch truyền hay mục tiêu sinh hiệu vào trường `criteria`.
- **Tại Bước 4 (`triage`, `primaryAction`, `targetVitals`, `protocol`)**: Là nơi duy nhất quy hoạch tuyến tiếp nhận, định hướng can thiệp, mục tiêu huyết áp/SpO2 và 9 phân mục phác đồ điều trị chi tiết.

### 5. Kích Hoạt Tam Giác Dịch Tễ Học (Epidemiology Boost)
- Tại `src/content/docspace/src/lib/clinicalEngine.ts`: Khai báo ID của bệnh vào khối `isInfDisease` và bổ sung logic nhận diện vector/ổ dịch/tiếp xúc để bệnh nhân được cộng điểm thưởng dịch tễ (1.2x – 1.25x) tương thích với bối cảnh Việt Nam.
- Khai báo hồ sơ dịch tễ tương ứng tại `src/content/docspace/src/data/epidemiology-context-database.ts`.

---

## ⚡ 4. Quy Trình Nạp Dữ Liệu Từng Bước (Standard Ingestion Protocol)

Khi nhận dữ liệu sinh ra từ NotebookLM/LLM cho một mặt bệnh mới (ví dụ: `tay_chan_mieng`):

### Bước 1: Nạp Enriched CDSS JSON (Khối 1 - Prompt 05)
1. Tạo file `src/content/docspace/data/enriched/<slug>.json`.
2. Đảm bảo cấu trúc đủ 14 trường bắt buộc (`icdCode`, `diseaseName`, `specialty`, `severityGrading`, `protocol`, `complications`...).
3. Chạy script bundle chỉ mục:
   ```powershell
   node tools/scripts/build-enriched-cdss.mjs
   ```

### Bước 2 & 3: Nạp Nhanh Ca Mẫu, CDSS & SOAP (Prompt 06 & 07)
> 💡 **Khuyên Dùng**: Sử dụng Skill `docspace-prompt-06-07-ingester` và công cụ 1-Click tự động:
> ```powershell
> node tools/scripts/ingest-prompt-06-07.mjs <duong-dan-file.md>
> ```
> Hoặc thực hiện tuần tự thủ công theo các bước dưới đây:

#### Cách làm thủ công:
1. **Ca mẫu**: Mở `src/content/knowledge-vault/data/sample-clinical-cases.json`: Thêm đối tượng ca bệnh mẫu vào mảng.
2. **Triệu chứng**: Mở `src/content/knowledge-vault/data/clinical-rules-symptoms.json`: Khai báo các triệu chứng mới (bao gồm cả triệu chứng trong `negated`).
3. **Thực thể bệnh**: Mở `src/content/knowledge-vault/data/diseases/<chuyen-khoa>.json`: Khai báo thực thể bệnh và ma trận `dd`.
4. **Đồng bộ Master KB**: Chạy `node tools/scripts/bundle-clinical-rules.mjs`.
5. **Hồ sơ SOAP**: Lưu file Markdown vào `src/content/knowledge-vault/ba/soap-<slug>-01.md`.
6. **Đồng bộ Catalog**: Chạy `node tools/scripts/ingest-notebooklm-case.mjs src/content/knowledge-vault/ba/soap-<slug>-01.md`.

### Bước 4: Khai Báo Aliasing & Dịch Tễ Học
1. Khai báo ánh xạ trong `src/content/docspace/data/diagnostic-criteria-database.ts`.
2. Khai báo bối cảnh dịch tễ trong `src/content/docspace/src/data/epidemiology-context-database.ts`.
3. Bổ sung ID vào bộ máy suy luận `src/content/docspace/src/lib/clinicalEngine.ts`.

---

## 🧪 5. Bảng Kiểm Kiểm Định & Công Cụ Tự Động (Verification CLI)

Sau khi hoàn tất việc nạp một mặt bệnh, AI Agent **BẮT BUỘC CHẠY 3 LỆNH KIỂM ĐỊNH**:

```powershell
# 1. Kiểm định 10 tiêu chí tích hợp toàn vẹn cho mặt bệnh vừa nạp
node tools/scripts/docspace-disease-audit.mjs <slug_benh>

# 2. Kiểm định 14 tiêu chí sẵn sàng của toàn bộ Knowledge Vault
node tools/scripts/vault-readiness-check.mjs

# 3. Build xác thực TypeScript và Bundle kích thước
cd src/content/docspace
npm run build
```

Chỉ khi cả 3 lệnh trên đều trả về kết quả **PASS 100% (Mã thoát 0)**, tác vụ nạp mới được xem là hoàn tất và sẵn sàng bàn giao cho người dùng.
