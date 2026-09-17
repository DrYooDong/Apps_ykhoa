# 📖 DocSpace MedLens — Medical Knowledge Standardization Guidelines

> **Cẩm Nang Quy Chuẩn Chuẩn Hóa Kiến Thức Y Khoa**
> *Quy định thống nhất về Chính tả Y học, Danh pháp Thuật ngữ, Khử trùng lặp Triệu chứng và Ma trận Trọng số CDSS trong phân hệ DocSpace MedLens.*

---

## 🏛️ 1. Nguyên Tắc Chính Tả & Danh Pháp Y Học

### 1.1. Quy Tắc Viết Tên Bệnh Lý & Hội Chứng
- **Tên bệnh tiếng Việt kèm từ viết tắt quốc tế**: Bắt buộc có tên tiếng Việt chuẩn xác kèm chữ viết tắt chuẩn mực trong ngoặc đơn ở tiêu đề và phần tóm tắt.
  - *Đúng*: Nhồi máu cơ tim cấp có ST chênh lên (STEMI), Suy tim phân suất tống máu giảm (HFrEF), Bệnh thận mạn (CKD), Đợt cấp bệnh phổi tắc nghẽn mạn tính (AECOPD).
  - *Sai*: Bệnh STEMI, Suy tim HFrEF mạn tính, Bệnh COPD cấp.
- **Tên riêng danh nhân / Bác sĩ phát minh**: Viết hoa chữ cái đầu và có dấu nối nếu tên ghép.
  - *Đúng*: Hội chứng Guillain-Barré, Bệnh Parkinson, Thang điểm Glasgow, Định luật Starling.
  - *Sai*: Hội chứng guillain barre, bệnh parkinson, glasgow.
- **Tên vi sinh vật (Vi khuẩn, Virus, Ký sinh trùng)**:
  - Viết hoa chi, viết thường loài, viết nghiêng chuẩn quốc tế trong tài liệu học thuật: *Streptococcus pneumoniae*, *Staphylococcus aureus*, *Escherichia coli*, *Dengue virus (DENV)*.

### 1.2. Bảng Chuẩn Hóa Đơn Vị Cận Lâm Sàng (SI & Tiêu Chuẩn Phòng Xét Nghiệm)

| Chỉ số cận lâm sàng | Đơn vị chuẩn hóa | Ví dụ định dạng đúng |
|---|---|---|
| **Đường huyết (Glucose)** | `mmol/L` (kèm `mg/dL` nếu cần) | `Glucose: 7.8 mmol/L (140 mg/dL)` |
| **Creatinine huyết thanh** | `µmol/L` hoặc `mg/dL` | `Creatinine: 115 µmol/L (1.3 mg/dL)` |
| **Bạch cầu (WBC)** | `G/L` hoặc `x10^9/L` | `WBC: 12.5 G/L` |
| **Tiểu cầu (PLT)** | `G/L` hoặc `x10^9/L` | `PLT: 85 G/L` |
| **Huyết sắc tố (Hb)** | `g/dL` hoặc `g/L` | `Hb: 12.0 g/dL` |
| **Hematocrit (Hct)** | `%` hoặc `L/L` | `Hct: 42%` |
| **Men gan (AST/ALT)** | `U/L` | `AST: 45 U/L, ALT: 52 U/L` |
| **Troponin siêu nhạy** | `ng/L` hoặc `pg/mL` | `hs-cTnI: 45 ng/L` |
| **Điện giải đồ (Na+, K+, Cl-)** | `mmol/L` | `Na+: 138 mmol/L, K+: 4.1 mmol/L` |

---

## 🚫 2. Quy Tắc Triệt Tiêu Văn Phong AI Máy Móc (Anti-AI-isms)

Văn phong trong DocSpace phải là văn phong **lâm sàng thực chiến của bác sĩ điều trị**, súc tích, dứt khoát, không mang dấu vết máy móc của mô hình ngôn ngữ lớn (LLM):

| ❌ Cụm từ AI sáo rỗng (CẤM DÙNG) | ✅ Cách viết Lâm sàng Thay thế |
|---|---|
| *"Điều tối quan trọng cần lưu ý là..."* | *"Lưu ý lâm sàng:"* hoặc *"Cờ đỏ (Red Flag):"* |
| *"Bức tranh toàn cảnh bệnh nhân cho thấy..."* | *"Bệnh cảnh lâm sàng:"* hoặc *"Tóm tắt hội chứng:"* |
| *"Việc quản lý toàn diện đòi hỏi một cách tiếp cận đa chuyên khoa..."* | *"Phối hợp hội chẩn chuyên khoa:"* |
| *"Tóm lại, bệnh nhân cần được theo dõi sát sao..."* | *"Kế hoạch theo dõi: Đánh giá sinh hiệu mỗi 2 giờ"* |
| *"Một mê cung các triệu chứng đan xen..."* | *"Chẩn đoán phân biệt gồm 3 nhóm bệnh cảnh:"* |

---

## 🔍 3. Quy Tắc Khử Trùng Lặp Triệu Chứng (Symptom Deduplication)

### 3.1. Mã Định Danh Đơn Nhất (Canonical Symptom ID)
Mỗi triệu chứng chỉ có **duy nhất 01 mã định danh (Slug)** viết theo dạng `snake_case` tiếng Việt không dấu:
- **Triệu chứng chính**: Dùng danh từ ngắn gọn: `sot`, `dau_nguc`, `kho_tho`, `ho`, `non`.
- **Không chia nhỏ triệu chứng theo mức độ thành các slug riêng**:
  - *Sai*: `sot_nhe`, `sot_vua`, `sot_cao`, `sot_rat_cao` (gây loãng từ điển và làm vỡ ma trận suy luận).
  - *Đúng*: Sử dụng chung ID `sot`, các chi tiết nhiệt độ cụ thể được mô tả trong trường `moTa` hoặc định lượng `nhietDo: 39.5`.

### 3.2. Quy Tắc Bảo Toàn "Zero-Orphan Symptoms"
1. **Trước khi gán triệu chứng vào bệnh**:
   - Tra cứu trong file từ điển: `src/content/knowledge-vault/data/clinical-rules-kb.json`.
   - Nếu triệu chứng đã có trong từ điển ➔ Tái sử dụng chính xác ID đó.
   - Nếu triệu chứng chưa có trong từ điển ➔ Bắt buộc bổ sung định nghĩa triệu chứng vào `clinical-rules-kb.json` trước khi đưa vào tệp `enriched/<slug>.json` của bệnh.
2. **Kiểm tra tự động chéo**:
   - Chạy script audit định kỳ để bắt lỗi mọi ID triệu chứng trong tệp bệnh mà không có mặt trong từ điển.

---

## ⚖️ 4. Quy Chuẩn Ma Trận Trọng Số Suy Luận CDSS

Ma trận suy luận trong `data/enriched/<slug>.json` phân chia triệu chứng thành 4 tầng giá trị:

```text
┌────────────────────────────────────────────────────────┐
│ 1. ĐẶC TRƯNG (dt - Pathognomonic / High Specificity)   │
│ Trọng số: 80 - 100                                     │
│ Ý nghĩa: Gần như khẳng định bệnh khi xuất hiện.        │
│ Ví dụ: Sốt rét có KST trong máu; Dengue có NS1 Ag (+). │
├────────────────────────────────────────────────────────┤
│ 2. GỢI Ý (gy - Suggestive / High Sensitivity)          │
│ Trọng số: 50 - 79                                      │
│ Ý nghĩa: Rất thường gặp, hướng bác sĩ nghĩ tới bệnh.  │
│ Ví dụ: Đau ngực đè ép sau xương ức gợi ý Hội chứng vành│
├────────────────────────────────────────────────────────┤
│ 3. HỖ TRỢ (ht - Supporting Evidence)                   │
│ Trọng số: 20 - 49                                      │
│ Ý nghĩa: Dấu hiệu phụ củng cố thêm độ tin cậy.        │
│ Ví dụ: Tăng nhẹ men gan, mệt mỏi, đau đầu.             │
├────────────────────────────────────────────────────────┤
│ 4. LOẠI TRỪ (loaitru - Exclusionary / Negative Value)  │
│ Trọng số: Âm (-50 đến -100) hoặc Điều kiện Bác bỏ      │
│ Ý nghĩa: Sự xuất hiện hoặc vắng mặt loại bỏ chẩn đoán. │
│ Ví dụ: hs-cTn bình thường ở giờ thứ 3 loại trừ NSTEMI. │
└────────────────────────────────────────────────────────┘
```

---

## 📑 5. Quy Trình Xuất Bản Ca Bệnh Thực Chiến SOAP

Khi nạp ca bệnh lâm sàng vào `src/content/knowledge-vault/ba/<caseId>.md`:
1. **S (Subjective - Chủ quan)**: Hành chính, lý do vào viện, bệnh sử diễn tiến theo ngày/giờ, tiền sử bản thân & gia đình.
2. **O (Objective - Khách quan)**: Sinh hiệu đo lường chính xác, khám từng cơ quan (Tim, Phổi, Bụng, Thần kinh), kết quả cận lâm sàng theo mốc thời gian kèm giá trị tham chiếu.
3. **A (Assessment - Đánh giá)**: Chẩn đoán xác định, chẩn đoán phân biệt, biện luận lâm sàng dựa trên hội tụ triệu chứng và thang điểm nguy cơ.
4. **P (Plan - Kế hoạch)**: Phác đồ y lệnh thuốc cụ thể (Tên hoạt chất, hàm lượng, liều dùng, đường dùng, giờ dùng), cận lâm sàng theo dõi tiếp theo và kế hoạch tư vấn người bệnh.
