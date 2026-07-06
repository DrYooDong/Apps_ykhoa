# 📚 Hướng Dẫn Bổ Sung Tài Liệu Y Khoa Vào Module Y Học Chứng Cứ

## Tổng quan

Module **Y học chứng cứ** (Evidence-Based Medicine - EBM) là thư viện tổng hợp các tài liệu y khoa bao gồm:
- Hướng dẫn thực hành lâm sàng (Clinical Practice Guidelines)
- Nghiên cứu khoa học (Research articles)
- Đánh giá thuốc và thiết bị y tế
- Giáo dục sức khỏe
- Thư viện tài nguyên (sách, giáo trình, tài liệu hội thảo)

Tài liệu được tổ chức theo **10 hệ chuyên khoa** chính:
1. 🫀 Tim mạch (Cardio)
2. 🫁 Hô hấp (Pulmo)
3. 🟡 Tiêu hóa (GI)
4. 💊 Nội tiết (Endo)
5. 🧠 Thần kinh (Neuro)
6. 🦠 Nhiễm (Infect)
7. 🔵 Thận - Tiết niệu (Renal)
8. 🦴 Cơ xương khớp (Rheum)
9. 🩸 Huyết học (Hema)
10. 🏥 Hồi sức - Cấp cứu (ICU)

---

## 🎯 Cấu Trúc Dữ Liệu

### 1. File HTML Chính

File giao diện: `/workspace/pages/Y học chứng cứ/yhcc.html`

Dữ liệu guidelines được lưu trong biến JavaScript `GUIDELINES_DB` (dòng ~870-928):

```javascript
const GUIDELINES_DB = [
  {
    title: 'Tên guideline/nghiên cứu',
    specialty: 'cardio', // Mã chuyên khoa
    source: 'BYT - QĐ 1857/2023', // Nguồn xuất bản
    year: 2023, // Năm phát hành
    impact: 'essential', // Mức độ ưu tiên
    summary: 'Mô tả ngắn gọn nội dung chính'
  },
  // ... thêm các entry khác
];
```

### 2. Các Trường Dữ Liệu

| Trường | Kiểu | Mô tả | Ví dụ |
|--------|------|-------|-------|
| `title` | String | Tên đầy đủ của guideline/nghiên cứu | `'Hướng dẫn chẩn đoán và điều trị Suy tim mạn tính'` |
| `specialty` | String | Mã chuyên khoa (xem danh sách bên dưới) | `'cardio'`, `'pulmo'`, `'gi'` |
| `source` | String | Tổ chức/cơ quan ban hành | `'BYT - QĐ 1857/2023'`, `'ESC/ESH 2023'`, `'ADA 2025'` |
| `year` | Number | Năm phát hành/cập nhật | `2023`, `2024`, `2025` |
| `impact` | String | Mức độ ưu tiên | `'essential'`, `'recommended'`, `'reference'` |
| `summary` | String | Tóm tắt 1-2 câu về nội dung chính | `'Phân độ suy tim theo NYHA và EF, điều trị nền tảng "4 trụ cột"...'` |

### 3. Danh Sách Mã Chuyên Khoa

```javascript
const SPECIALTIES = {
  cardio: { name: 'Tim mạch', icon: '🫀', badge: 'badge-cardio', color: '#dc2626' },
  pulmo: { name: 'Hô hấp', icon: '🫁', badge: 'badge-pulmo', color: '#2563eb' },
  gi: { name: 'Tiêu hóa', icon: '🟡', badge: 'badge-gi', color: '#ca8a04' },
  endo: { name: 'Nội tiết', icon: '💊', badge: 'badge-endo', color: '#7c3aed' },
  neuro: { name: 'Thần kinh', icon: '🧠', badge: 'badge-neuro', color: '#c026d3' },
  infect: { name: 'Nhiễm', icon: '🦠', badge: 'badge-infect', color: '#16a34a' },
  renal: { name: 'Thận - Tiết niệu', icon: '🔵', badge: 'badge-renal', color: '#0891b2' },
  rheum: { name: 'Cơ xương khớp', icon: '🦴', badge: 'badge-rheum', color: '#ea580c' },
  hema: { name: 'Huyết học', icon: '🩸', badge: 'badge-hema', color: '#db2777' },
  icu: { name: 'Hồi sức - Cấp cứu', icon: '🏥', badge: 'badge-icu', color: '#475569' }
};
```

---

## 📝 Các Bước Bổ Sung Tài Liệu Mới

### Bước 1: Chuẩn Bị Thông Tin

Thu thập đầy đủ thông tin về tài liệu:
- ✅ Tên chính xác của guideline/nghiên cứu
- ✅ Chuyên khoa liên quan
- ✅ Tổ chức ban hành (Bộ Y tế, ESC, ADA, GOLD, v.v.)
- ✅ Năm phát hành
- ✅ Link tải về/file đính kèm (nếu có)
- ✅ Tóm tắt ngắn (50-150 ký tự)

### Bước 2: Xác Định Mức Độ Ưu Tiên (Impact)

| Giá trị | Ý nghĩa | Khi nào sử dụng |
|---------|---------|-----------------|
| `essential` | Thiết yếu | Guidelines từ BYT, các hiệp hội lớn (ESC, ADA, GOLD, GINA), khuyến cáo sống còn |
| `recommended` | Khuyến nghị | Guidelines chuyên sâu, cập nhật quan trọng, nghiên cứu có ảnh hưởng cao |
| `reference` | Tham khảo | Tài liệu bổ trợ, nghiên cứu thứ cấp, tài liệu lịch sử |

### Bước 3: Chỉnh Sửa File yhcc.html

1. Mở file `/workspace/pages/Y học chứng cứ/yhcc.html`
2. Tìm đến biến `GUIDELINES_DB` (khoảng dòng 870-928)
3. Thêm entry mới vào cuối mảng (trước dấu `]` cuối cùng)

**Ví dụ: Thêm guideline mới cho chuyên khoa Tim mạch:**

```javascript
{
  title: 'Hướng dẫn cập nhật điều trị Tăng huyết áp 2026',
  specialty: 'cardio',
  source: 'BYT - QĐ 2024/2026',
  year: 2026,
  impact: 'essential',
  summary: 'Cập nhật ngưỡng chẩn đoán THA ≥130/80 mmHg, mục tiêu HA cá thể hóa, phối hợp thuốc sớm.'
}
```

**Lưu ý quan trọng:**
- Đặt dấu phẩy `,` sau entry cuối cùng trước khi thêm entry mới
- Entry mới phải đặt trước dấu `]` đóng mảng
- Tuân thủ đúng cú pháp JSON/JavaScript

### Bước 4: Tạo File Markdown Chi Tiết (Tùy Chọn)

Đối với các guideline quan trọng, tạo file `.md` riêng trong thư mục `/workspace/pages/Y học chứng cứ/`:

**Quy ước đặt tên:**
```
[Tên-guideline-ngan-gon].md
```

**Cấu trúc file mẫu:**

```markdown
# 🩺 TÊN GUIDELINE ĐẦY ĐỦ

Nguồn: [Tên tổ chức] - [Số quyết định/Năm]
Chuyên khoa: [Tên chuyên khoa]
Năm phát hành: [YYYY]

---

## 📌 1. ĐIỂM MỚI CẬP NHẬT

- Điểm thay đổi 1
- Điểm thay đổi 2
- Điểm thay đổi 3

---

## 📌 2. NỘI DUNG CHÍNH

### 2.1 Chẩn đoán
Nội dung chi tiết...

### 2.2 Điều trị
Nội dung chi tiết...

---

## 📌 3. THUẬT TOÁN/XỬ TRÍ

Mô tả thuật toán hoặc link hình ảnh...

---

## 📚 TÀI LIỆU THAM KHẢO

1. Reference 1
2. Reference 2

---

*Người biên soạn: [Tên]*
*Ngày cập nhật: [DD/MM/YYYY]*
```

### Bước 5: Kiểm Tra và Validate

1. **Kiểm tra cú pháp JavaScript:**
   - Mở Developer Console (F12)
   - Reload trang `yhcc.html`
   - Đảm bảo không có lỗi console

2. **Kiểm tra hiển thị:**
   - Verify guideline mới xuất hiện trong bảng
   - Kiểm tra filter theo chuyên khoa hoạt động đúng
   - Test chức năng tìm kiếm với từ khóa liên quan

3. **Kiểm tra responsive:**
   - Xem trên desktop và mobile
   - Đảm bảo table/card view đều hiển thị tốt

---

## 🎨 Định Dạng Nội Dung Khuyến Nghị

### Tiêu Đề (Title)
- ✅ Nên: `'Hướng dẫn chẩn đoán và điều trị Viêm phổi cộng đồng'`
- ❌ Tránh: `'VPCD'`, `'Viêm phổi'` (quá ngắn)

### Nguồn (Source)
- ✅ Nên: `'BYT - QĐ 4815/2020'`, `'GOLD 2025'`, `'ESC/ESH 2023'`
- ❌ Tránh: `'Bộ Y tế'` (chung chung), `'2023'` (thiếu tổ chức)

### Tóm Tắt (Summary)
- ✅ Nên: `'Phân tầng CURB-65/PSI, kháng sinh theo nhóm ngoại trú/nhập viện/ICU, thời gian điều trị 5-7 ngày.'`
- ❌ Tránh: `'Điều trị viêm phổi.'` (quá ngắn), đoạn văn dài >200 ký tự

---

## 📊 Phân Loại Tài Liệu Theo Loại

Khi bổ sung, cân nhắc gắn thẻ loại tài liệu trong summary:

| Loại | Mô tả | Ví dụ |
|------|-------|-------|
| **CPG** | Clinical Practice Guideline | Hướng dẫn của BYT, ESC, ADA |
| **RCT** | Randomized Controlled Trial | Nghiên cứu đối chứng ngẫu nhiên |
| **Meta-analysis** | Tổng quan hệ thống | Cochrane Review, Meta-analysis |
| **Consensus** | Đồng thuận chuyên gia | Consensus statement |
| **Review** | Bài tổng quan | Narrative review, Educational review |
| **Case Report** | Báo cáo ca lâm sàng | Case series, Case report |

---

## 🔗 Liên Kết Đến Tài Nguyên Bên Ngoài

Nếu guideline có link tải về hoặc nguồn online:

1. **Trong file MD:** Thêm section "🔗 Link hữu ích"
2. **Trong summary:** Có thể thêm URL ngắn (bit.ly) nếu cần

**Ví dụ:**
```markdown
## 🔗 Link hữu ích

- [PDF đầy đủ](https://example.com/guideline.pdf)
- [Trang chủ ESC](https://www.escardio.org)
- [Tóm tắt tiếng Việt](link-internal-md-file)
```

---

## ⚠️ Lưu Ý Quan Trọng

### 1. Bản Quyền
- Chỉ chia sẻ tài liệu open-access hoặc đã được phép
- Ghi rõ nguồn gốc và tác giả
- Không upload sách có bản quyền thương mại

### 2. Cập Nhật Định Kỳ
- Review guidelines mỗi 6-12 tháng
- Đánh dấu guidelines cũ (<2020) cần cập nhật
- Theo dõi website chính thức của các hiệp hội

### 3. Chất Lượng Nội Dung
- Ưu tiên guidelines từ nguồn uy tín (BYT, ESC, ACC, AHA, ADA, GOLD, GINA, KDIGO, v.v.)
- Tránh tài liệu không rõ nguồn gốc
- Có peer-review trước khi đăng (nếu có thể)

### 4. Ngôn Ngữ
- Tiếng Việt: Ưu tiên cho guidelines BYT và tài liệu dịch
- Tiếng Anh: Giữ nguyên cho guidelines quốc tế
- Nhất quán trong cách viết hoa, dấu câu

---

## 🛠 Công Cụ Hỗ Trợ

### Template JavaScript Entry
```javascript
// COPY TEMPLATE NÀY KHI THÊM GUIDELINE MỚI
{
  title: '[Tên guideline]',
  specialty: '[mã-chuyên-khoa]',
  source: '[Nguồn - Năm/Quyết định]',
  year: [YYYY],
  impact: '[essential|recommended|reference]',
  summary: '[Tóm tắt 1-2 câu]'
},
```

### Checklist Trước Khi Đăng
- [ ] Đã điền đầy đủ 6 trường dữ liệu
- [ ] Mã chuyên khoa chính xác
- [ ] Năm là số (không phải string)
- [ ] Impact level phù hợp
- [ ] Summary rõ ràng, không quá dài
- [ ] Dấu phẩy đúng vị trí
- [ ] Đã test trên browser
- [ ] File MD đi kèm (nếu cần)

---

## 📞 Hỗ Trợ và Đóng Góp

Mọi đóng góp tài liệu hoặc báo cáo lỗi xin gửi về:
- Email: [contact@chiaseyhoc.vn](mailto:contact@chiaseyhoc.vn)
- GitHub Issues: [Link repo]
- Telegram Group: [Link group]

---

*Phiên bản hướng dẫn: 1.0*  
*Cập nhật lần cuối: 2026*  
*Tác giả: CliniPortal Team*
