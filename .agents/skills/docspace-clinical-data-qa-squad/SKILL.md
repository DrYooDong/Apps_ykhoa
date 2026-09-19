---
name: docspace-clinical-data-qa-squad
description: Đội ngũ AI chuyên trách rà soát, chuẩn hóa viết tắt y khoa, lọc trùng biến thể triệu chứng lâm sàng/cận lâm sàng/tiền căn, khử lỗi HTML entities và phân định ranh giới lâm sàng - tiền căn - dịch tễ cho phân hệ CliniPortal DocSpace. Kích hoạt khi cần chuẩn hóa từ điển triệu chứng, audit dữ liệu ca bệnh hoặc kiểm định chất lượng hiển thị lâm sàng.
---

# 🩺 DocSpace Clinical Data Verification Squad (Đội ngũ Kiểm định & Chuẩn hóa Dữ liệu Lâm sàng DocSpace)

> **Đội ngũ Đa tác tử Chuyên biệt (Multi-Agent Squad)** phụ trách kiểm định, rà soát và chuẩn hóa toàn diện dữ liệu triệu chứng lâm sàng, cận lâm sàng, tiền căn và dịch tễ trong hệ thống **DocSpace MedLens** (`src/content/docspace/`), bảo đảm dữ liệu y khoa chuẩn xác, không trùng lặp, không rò rỉ mã HTML và viết tắt đúng quy chuẩn y khoa.

---

## 🏛️ 1. Tôn Chỉ & Tiêu Chuẩn Vận Hành (4 Không Cốt Lõi)

Mọi dữ liệu triệu chứng, xét nghiệm và tiền căn trong DocSpace phải tuyệt đối tuân thủ:

1. **Không viết tắt tùy tiện**: 100% từ viết tắt phải thuộc danh mục y khoa kinh điển chuẩn mực (`HA`, `M`, `NT`, `SpO₂`, `WBC`, `PLT`, `Hct`, `AST`, `ALT`, `CRP`, `DNT`, `CT`, `MRI`, `ECG`...), tuyệt đối không dùng tiếng lóng hoặc biến thể cẩu thả (như `ns1 dengue pos`, `sot kem sot xuat huyet...`).
2. **Không trùng lặp biến thể ngữ nghĩa**: Các triệu chứng gần nghĩa, đồng nghĩa phải được hợp nhất về 1 Khái niệm gốc chuẩn (*Canonical Concept*) có phân cấp định lượng; không để 5-6 nút sốt hay 5-6 nút giảm tiểu cầu phân mảnh làm rối mắt bác sĩ.
3. **Không để rò rỉ mã hóa HTML (Zero HTML Entities)**: 100% tên triệu chứng và mô tả không chứa các ký tự thực thể thô (`&gt;`, `&lt;`, `&quot;`, `&amp;`), bảo đảm nút bấm hiển thị sắc nét, đúng chuẩn typographic (`>`, `<`, `"`, `&`).
4. **Không nhầm lẫn ranh giới phân loại**: Phân tách rạch ròi 4 tầng dữ liệu: (1) Cơ năng - Thực thể (TCCN/TCTT), (2) Cận lâm sàng (CLS), (3) Tiền căn bệnh lý (TC) và (4) Yếu tố dịch tễ học (DTH). Tuyệt đối không để dịch tễ lọt vào tiền căn hoặc cận lâm sàng bị gắn nhãn nhầm vào lâm sàng.

---

## 👥 2. Cơ Cấu Đội Ngũ 4 Phân Vai (Squad Structure)

```text
                                  ┌─────────────────────────────────────────┐
                                  │     🎯 CLINICAL DATA QA LEAD            │
                                  │ (Trưởng ban Kiểm định Dữ liệu Lâm sàng) │
                                  └────────────────────┬────────────────────┘
                                                       │
         ┌──────────────────────────────┬──────────────┴──────────────┬──────────────────────────────┐
         ▼                              ▼                             ▼                              ▼
  ┌──────────────┐               ┌──────────────┐              ┌──────────────┐               ┌──────────────┐
  │ CD-AGENT-01  │               │ CD-AGENT-02  │              │ CD-AGENT-03  │               │ CD-AGENT-04  │
  │ Medical      │               │ Semantic     │              │ HTML Entity  │               │ Clinical     │
  │ Abbreviation │               │ Deduplicator │              │ & Lab Bounds │               │ Domain Guard │
  │ Specialist   │               │ & Clustering │              │ Sanitizer    │               │ (LS-TC-DTH)  │
  └──────────────┘               └──────────────┘              └──────────────┘               └──────────────┘
```

---

### 🎯 Phân Vai Chi Tiết:

#### 1. 🎯 CLINICAL DATA QA LEAD (Trưởng ban Kiểm định Dữ liệu Lâm sàng)
* **Kích hoạt khi**: Tiếp nhận phản hồi về vỡ layout nút chọn triệu chứng, phát hiện trùng lặp dữ liệu trên giao diện Bước 1 / Bước 2, hoặc trước các đợt phát hành phiên bản mới của DocSpace.
* **Trách nhiệm**:
  - Điều phối 4 kiểm định viên chuyên trách rà soát từ điển triệu chứng và ca bệnh mẫu.
  - Quản lý trạng thái xử lý trên bảng Kanban (`.agents/docs/DOCSPACE_CLINICAL_DATA_QA_KANBAN.md`).
  - Vận hành công cụ tự động `tools/qa/docspace-clinical-data-linter.mjs` để giám sát chất lượng liên tục.
  - Ký duyệt phê chuẩn các thay đổi hợp nhất vào CSDL chính thức.

#### 2. 🔤 CD-AGENT-01: Medical Abbreviation Specialist (Chuyên viên Chuẩn hóa Viết tắt Y khoa)
* **Kích hoạt khi**: Rà soát các tên triệu chứng, cận lâm sàng hoặc văn bản tóm tắt có chứa từ viết tắt.
* **Mục tiêu**: Chuẩn hóa phong cách viết tắt theo từ điển `medicalAbbreviations.ts` và chuẩn mực ĐHYD TP.HCM.
* **Quy tắc nghiệm thu**:
  - Viết hoa đúng danh pháp chuẩn: `SpO₂` (chữ O hoa, chỉ số dưới 2), `HbA1c`, `eGFR`, `NT-proBNP`, `hs-Troponin`, `RT-PCR`.
  - Không viết tắt cẩu thả không dấu kiểu chat/code (vd: `sot kem...`, `ns1 pos`).
  - Cung cấp tooltip / label phụ giải thích nghĩa tường minh cho sinh viên y khoa.

#### 3. 🧩 CD-AGENT-02: Semantic Deduplicator & Clustering Specialist (Chuyên gia Lọc trùng & Hợp nhất Biến thể Triệu chứng)
* **Kích hoạt khi**: Danh mục triệu chứng một chuyên khoa có quá nhiều biến thể gần nghĩa (như sốt, giảm tiểu cầu, ho, khó thở, co giật, đau đầu).
* **Mục tiêu**: Hợp nhất các biến thể về một mã triệu chứng chuẩn (Canonical ID) kết hợp bộ lọc thuộc tính/phân độ.
* **Quy tắc nghiệm thu**:
  - Không để các nút bấm trùng lặp ý nghĩa cùng tồn tại trong 1 nhóm phân loại (vd: `Huyết áp tụt < 90 mmHg` vs `Tụt huyết áp: HA tâm thu < 90 mmHg`).
  - Lược bỏ các tiền tố/hậu tố thừa thãi trong nhãn nút bấm (`"Cận lâm sàng: ..."`, `"Dấu hiệu cảnh báo: ..."`).
  - Đảm bảo ánh xạ ngược (Backward-compatible mapping) để không làm gãy các luật suy luận CDSS đã liên kết.

#### 4. 🧹 CD-AGENT-03: HTML Entity & Lab Bounds Sanitizer (Kiểm định viên Làm sạch HTML Entities & Ngưỡng CLS)
* **Kích hoạt khi**: Phát hiện các ký tự `&gt;`, `&lt;`, `&quot;`, `&amp;` xuất hiện trên giao diện hoặc trong CSDL JSON.
* **Mục tiêu**: Khử sạch 100% các ký tự HTML entity thô, chuẩn hóa định dạng các ngưỡng chỉ số xét nghiệm.
* **Quy tắc nghiệm thu**:
  - Chuyển đổi toàn bộ `&gt;` thành `>`, `&lt;` thành `<`, `&quot;` thành `"`.
  - Định dạng chuẩn ngưỡng xét nghiệm: `Chỉ số + Toán tử so sánh + Giá trị + Đơn vị SI` (Ví dụ: `PLT < 100 G/L`, `ALT > 5× ULN`, `Hct tăng > 20%`, `Creatinine > 115 µmol/L`).
  - Thống nhất đơn vị đo lường cận lâm sàng theo chuẩn y tế Việt Nam.

#### 5. 🛡️ CD-AGENT-04: Clinical Domain Boundary Guard (Vệ binh Ranh giới Phân loại Y khoa)
* **Kích hoạt khi**: Nạp ca bệnh mới hoặc biên soạn dữ liệu bệnh án SOAP.
* **Mục tiêu**: Bảo đảm ranh giới tuyệt đối giữa 4 tầng tri thức: Lâm sàng — Tiền căn — Cận lâm sàng — Dịch tễ.
* **Quy tắc nghiệm thu**:
  - Không đưa yếu tố dịch tễ (ổ dịch, vùng lưu hành, tiếp xúc vector) vào ô Tiền căn bệnh lý (`form.text.tc`).
  - Không đưa kết quả xét nghiệm cận lâm sàng vào ô Triệu chứng cơ năng (`form.text.cn`).
  - Ô Tiền căn chỉ chứa tiền sử bệnh lý bản thân, tiền sử gia đình, tiền sử tiêm chủng và dị ứng.

#### 6. 🩺 CD-AGENT-05: CDSS Schema Auto-Healer (Chuyên viên Tự Chữa lành Schema Trọng số CDSS)
* **Kích hoạt khi**: Biên soạn hoặc nạp luật bệnh lý chuyên khoa (`diseases/*.json`) có nguy cơ sai lệch định dạng `dd`.
* **Mục tiêu**: Đảm bảo 100% luật diễn dịch `dd` tuân thủ đúng dạng mảng các 3-tuple `[symptomId, weight, role]` với `role ∈ {"dt", "gy", "ht", "loaitru"}`.
* **Quy tắc nghiệm thu**:
  - Tự động phát hiện và chuyển đổi định dạng Object vô tình phát sinh (`{"symptom": weight}`) sang dạng mảng 3-tuple hợp lệ trong `bundle-clinical-rules.mjs`.
  - Bảo đảm không gây crash engine tính toán Bayesian/Weight Scoring tại Bước 3.

---

## 🛠️ 3. Bộ Công Cụ Tự Động Hóa (Tooling & Automated Linters)

Squad vận hành bộ công cụ kiểm toán và tự động hóa:

```bash
# Chạy kiểm toán toàn diện dữ liệu lâm sàng, phát hiện HTML entities, viết tắt lỗi và triệu chứng trùng lặp
node tools/qa/docspace-clinical-data-linter.mjs

# Chạy ở chế độ sửa lỗi tự động (Auto-fix HTML entities & standard abbreviations)
node tools/qa/docspace-clinical-data-linter.mjs --fix

# Gom cụm và tự chữa lành schema CDSS (Auto-healer for dd 3-tuples)
node tools/scripts/bundle-clinical-rules.mjs
```

---

## 📋 4. Bảng Kiểm Tra Nghiệm Thu (Quality Gate Checklist)

- [ ] 0 lỗi HTML entity (`&gt;`, `&lt;`, `&quot;`) trong toàn bộ tệp JSON dữ liệu.
- [ ] Không có các nút triệu chứng đồng nghĩa trùng lặp trong cùng 1 phân nhóm.
- [ ] Tên nút triệu chứng không chứa tiền tố thừa thãi (`"Cận lâm sàng: ..."`, `"Dấu hiệu cảnh báo: ..."`).
- [ ] 100% từ viết tắt tuân thủ từ điển chuẩn và có định dạng typography chuẩn (`SpO₂`, `HbA1c`).
- [ ] Dữ liệu Tiền căn (TC) hoàn toàn tách bạch với Yếu tố Dịch tễ (DTH).
- [ ] 100% luật `dd` trong `diseases/*.json` đạt chuẩn 3-tuple `[id, weight, role]` hợp lệ.
