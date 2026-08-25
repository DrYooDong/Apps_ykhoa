---
name: medical-content-matrix
description: Quy hoạch, lập ma trận phân loại nội dung y khoa (7 phân hệ CliniPortal), thiết lập sơ đồ thực thể tri thức (Entity Graph) & kiến trúc Wiki Y khoa hạt nhân (Atomic Medical Facts) cho CliniPortal.
---

# Medical Content Matrix & Knowledge Map Planner (Atlas-Inspired)

Skill này giúp AI đóng vai trò Kiến trúc sư nội dung (Content Architect) cho CliniPortal, áp dụng **Kiến trúc LLM-Wiki Y khoa (Wiki-First RAG Architecture)** & **Sơ đồ Thực thể Tri thức (Medical Entity Knowledge Graph)** lấy cảm hứng từ Beever Atlas.

---

## 🎯 Mục tiêu Cốt lõi của Skill

1. **Ma trận Phân loại 7 Phân hệ**: Phân bổ tài liệu y khoa vào đúng 7 phân hệ chức năng của CliniPortal không trùng lặp.
2. **Kiến trúc Wiki Y khoa Hạt nhân (Atomic Medical Facts)**: Chắt lọc dữ liệu y khoa thô thành các sự thật hạt nhân (Chỉ số ngưỡng, Nguyên nhân, Red Flags, Liều thuốc, Khuyến cáo).
3. **Sơ đồ Thực thể Tri thức Y khoa (Medical Entity Knowledge Graph)**: Thiết lập mối liên kết hai chiều giữa Bệnh lý ↔ Triệu chứng ↔ Dược lý ↔ Công cụ tính toán ↔ Lưu đồ tiếp cận.
4. **Trích dẫn Chứng cứ Minh bạch (Traceable Medical Citations)**: Gắn thẻ trích dẫn y văn trực tiếp (PubMed PMID, DOI, Guideline) cho từng khẳng định y học.

---

## 🗺️ Ma trận 7 Phân hệ & Sơ đồ Thực thể Tri thức (Entity Graph)

```
                               ┌───────────────────────────┐
                               │   CLINIPORTAL KNOWLEDGE   │
                               └─────────────┬─────────────┘
                                             │
      ┌────────────┬────────────┬────────────┼────────────┬────────────┬────────────┐
      ▼            ▼            ▼            ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 1. Sinh  │ │ 2. Triệu │ │3. Tiếp cận│ │ 4. Bệnh  │ │ 5. Dược  │ │ 6. Kỹ    │ │7. Công cụ│
│ lý bệnh  │ │  chứng   │ │  Lưu đồ  │ │   lý     │ │   lý     │ │  năng    │ │ & Thang  │
└──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Sơ đồ Mối quan hệ Thực thể Y khoa (Entity Relation Mapping):
- `[Bệnh lý]` --gây ra--> `[Triệu chứng]`
- `[Bệnh lý]` --chẩn đoán bằng--> `[Lưu đồ Thuật toán]`
- `[Bệnh lý]` --đánh giá bằng--> `[Công cụ & Thang điểm]`
- `[Bệnh lý]` --điều trị bằng--> `[Dược lý / Phác đồ Thuốc]`
- `[Bệnh lý]` --thực hiện--> `[Kỹ năng & Thủ thuật]`
- `[Mọi khẳng định]` --xác minh bằng--> `[Y văn PMID / DOI / Guideline]`

---

## 🔬 Quy chuẩn Chuỗi Sự thật Hạt nhân (Atomic Medical Facts)

Mỗi trang Wiki Y khoa trong CliniPortal được cấu trúc từ các khối "Atomic Facts" độc lập:

1. **Definition Fact**: Định nghĩa & Tiêu chuẩn chẩn đoán cốt lõi.
2. **Red Flag Fact**: Các dấu hiệu cảnh báo nguy kịch cần can thiệp ngay.
3. **Threshold Fact**: Ngưỡng chỉ số sinh hiệu / cận lâm sàng (SpO2 < 92%, PAS < 90 mmHg, GFR < 30 mL/phút).
4. **Therapeutic Fact**: Liều lượng, chỉ định, chống chỉ định thuốc chính xác.
5. **Citation Fact**: Liên kết minh bạch PMID, DOI, khuyến cáo Guideline ESC/ADA/GOLD/KDIGO.

---

## 📋 Quy trình Đánh giá & Lập Ma trận Nội dung 4 Bước

### Bước 1: Phân tích Thực thể Đầu vào (Entity Resolution)
Khi có chủ đề y khoa mới (ví dụ: *Viêm tụy cấp*):
- **Sinh lý bệnh**: Cơ chế tự tiêu hóa men tụy (Trypsinogen -> Trypsin).
- **Triệu chứng**: Đau bụng thượng vị lan lưng, nôn ói.
- **Lưu đồ tiếp cận**: Thuật toán chẩn đoán Viêm tụy cấp tại Cấp cứu.
- **Phác đồ bệnh lý**: Tiêu chuẩn Atlanta sửa đổi 2012, bù dịch Ringer Lactate.
- **Dược lý**: Giảm đau Opioid (Fentanyl/Meperidine), hạn chế kháng sinh phòng ngừa.
- **Kỹ năng**: Đọc CT-scanner bụng (thang điểm Balthazar).
- **Công cụ**: Thang điểm BISAP, Ranson, APACHE II.

### Bước 2: Thiết lập Liên kết Hai chiều Inter-Module
Chèn các thẻ liên kết thông minh giữa các trang phân hệ:
```html
<!-- Thẻ liên kết Công cụ tính trong bài Bệnh lý -->
<a href="../../Công cụ/Calculators/bisap_score.html" class="entity-link entity-calculator">
  <i class="fas fa-calculator"></i> Tính điểm BISAP
</a>
```

### Bước 3: Gắn thẻ Trích dẫn Y văn Lâm sàng (Traceable Citations)
```html
<span class="citation-badge" data-pmid="23042687" title="Tenner S, et al. Am J Gastroenterol. 2013">
  [PMID: 23042687]
</span>
```

### Bước 4: Kiểm tra Đóng góp & File Map
Đối chiếu file mới tạo với `.agents/docs/FILE_MAP.md` và kiểm tra quy tắc đường dẫn tương đối chuẩn xác theo cấp thư mục.
