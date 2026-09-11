# 🩺 Cẩm Nang Hướng Dẫn Soạn & Nạp Ca Lâm Sàng MedLens DocSpace Pro
> **Dành cho Bác sĩ Lâm sàng & Giảng viên Y khoa (Chuyên khoa Truyền nhiễm & Nội khoa)**  
> *Chuẩn hóa theo phương pháp luận PGS.TS Hoàng Văn Sĩ, BSCKI Trần Thanh Tuấn và Tam giác Chẩn đoán Truyền nhiễm (Dịch tễ — Lâm sàng — Cận lâm sàng).*

---

## 🌟 1. Nguyên Lý Thiết Kế Ca Lâm Sàng MedLens

Một ca bệnh lâm sàng chuẩn hóa trên DocSpace MedLens vận hành dựa trên **3 trụ cột cốt lõi**:

```
                  [ĐỈNH 1: DỊCH TỄ HỌC (EPIDEMIOLOGY)]
                   • Nguồn lây / Tiếp xúc người bệnh
                   • Vector: Muỗi Aedes, ve mò, bọ chét, súc vật
                   • Vùng lưu hành (Endemic area) / Mùa mưa bão lũ
                   • Hành vi: Đi rừng, lội nước lụt, ăn tái sống
                                   ▲
                                  ╱ ╲
                                 ╱   ╲
                                ╱     ╲
                               ╱       ╲
                              ▼         ▼
[ĐỈNH 2: LÂM SÀNG (CLINICAL)] ◄────────► [ĐỈNH 3: CẬN LÂM SÀNG (LABS)]
 • Triệu chứng cơ năng chính              • Công thức máu: BC, Hct, Tiểu cầu
 • Sinh hiệu bất thường                   • Dấu ấn sinh học: CRP, Troponin, Men gan
 • Khám thực thể & Dấu chứng              • Xét nghiệm vi sinh/căn nguyên: NS1, KST sốt rét, PCR, Cấy
```

1. **Tam giác Chẩn đoán Truyền nhiễm**: Sự hội tụ của 3 đỉnh (Dịch tễ + Lâm sàng + Cận lâm sàng) sẽ kích hoạt **Epidemiology Boost** làm tăng 10% – 25% điểm phù hợp của chẩn đoán sơ bộ.
2. **Trục Biện luận theo Vấn đề chính (BSCKI Trần Thanh Tuấn & PGS.TS Hoàng Văn Sĩ)**:
   - Ca bệnh luôn có **Tóm tắt bệnh án** (gồm cơ năng, thực thể, dịch tễ, cận lâm sàng ban đầu, tiền căn, dấu hiệu âm tính).
   - Xác lập danh sách vấn đề và chọn ra **01 Vấn đề chính** (lý do nhập viện hoặc dấu hiệu đe dọa tính mạng) để định hướng biện luận chẩn đoán.
3. **Đánh giá 4 thành phần chẩn đoán**:
   - Bệnh gì?
   - Mức độ / Giai đoạn nặng?
   - Nguyên nhân (tác nhân vi sinh / cơ chế)?
   - Biến chứng đã xảy ra hoặc nguy cơ đe dọa?

---

## 🛠️ 2. Ba (03) Phương Thức Soạn & Nạp Ca Lâm Sàng

---

### 🔹 PHƯƠNG THỨC 1: Soạn Trực Tiếp Trên Giao Diện (Khuyên dùng khi khám/thảo luận ca)

Đây là cách trực quan, nhanh nhất và không cần chỉnh sửa mã nguồn:

1. **Bước 1 — Nạp dữ kiện**:
   - Điền thông tin hành chính: Tuổi, giới tính, nghề nghiệp, **Lý do vào viện**.
   - Nhập sinh hiệu: Nhiệt độ, Mạch, Huyết áp, Nhịp thở, SpO₂.
   - Nhập cận lâm sàng định lượng: Bạch cầu (BC), Tiểu cầu (TC), Hct, Glucose, Troponin...
   - Mở panel **"Yếu tố Dịch tễ học & Phơi nhiễm"**: Chọn nhanh các chip có sẵn (Ổ dịch SXH, Mùa mưa lũ, Đi rừng, Lội nước lụt...) hoặc gõ tự do.
   - Chọn các **Triệu chứng dương tính (+)** và **Triệu chứng loại trừ (-)**.
2. **Bước 2 — Tóm tắt & Đặt vấn đề**:
   - Hệ thống tự động sinh đoạn tóm tắt bệnh án chuẩn. Bác sĩ có thể bấm **"Tự chỉnh sửa"** để tinh chỉnh câu từ hoặc bấm **"Sao chép"** để dán vào bệnh án EMR.
   - Đánh dấu **"Chọn làm VĐ chính"** cho vấn đề cốt lõi muốn sinh viên/học viên biện luận.
   - Quan sát đánh giá mức độ hội tụ của **Tam giác chẩn đoán Truyền nhiễm**.
3. **Bước 3 & 4 — Phân tích & Phác đồ**:
   - Xem bảng xếp hạng chẩn đoán sơ bộ và phân biệt.
   - Xem phác đồ phân tầng xử trí, y lệnh thuốc và EBM Pathway.
4. **Lưu trữ ca**:
   - Tại Bước 1, bấm nút **"Xuất file JSON"** trên thanh công cụ để lưu ca bệnh về máy tính dưới dạng file `.json`.
   - Lần sau muốn tải lại ca này, chỉ cần bấm **"Nhập file JSON"** là toàn bộ ca bệnh được khôi phục ngay lập tức!

---

### 🔹 PHƯƠNG THỨC 2: Xây Dựng Danh Sách Ca Mẫu Thanh Chọn Nhanh (SampleCaseBar)

Nếu bác sĩ muốn tạo sẵn một bộ ca bệnh mẫu cá nhân để hiển thị trên thanh chọn nhanh (`SampleCaseBar`) ở Bước 1:

1. Mở file:  
   [`src/content/knowledge-vault/data/sample-clinical-cases.json`](file:///d:/Apps/Apps_ykhoa/src/content/knowledge-vault/data/sample-clinical-cases.json)
2. Thêm các ca bệnh theo cấu trúc JSON chuẩn dưới đây (bác sĩ có thể copy template này và thay đổi nội dung):

```json
[
  {
    "ten": "SXHD Cảnh báo · Nữ 22 tuổi",
    "sel": [
      "sot_cao_27",
      "dau_dau",
      "dau_hau_mon_orbital",
      "dau_co",
      "ban_xuat_huyet",
      "tieu_cau_giam",
      "ns1_dengue"
    ],
    "vitals": {
      "vNhiet": "39.2",
      "vMach": "102",
      "vHATT": "100",
      "vHATTr": "70",
      "vTho": "20",
      "vSpo2": "98"
    },
    "labs": {
      "lBC": "3.5",
      "lTC": "62",
      "lHct": "44",
      "lGlu": "5.6",
      "lTrop": "12"
    },
    "form": {
      "gioiTinh": "nu",
      "tuoi": "22",
      "ngheNghiep": "Sinh viên",
      "lyDo": "Sốt cao ngày 4 kèm chấm xuất huyết và nôn ói",
      "text": {
        "cn": "Sốt cao liên tục 4 ngày không hạ, đau đầu dữ dội, đau nhức hốc mắt, buồn nôn, đau bụng âm ỉ vùng hạ sườn phải.",
        "tt": "Nhiệt độ 39,2°C, chấm xuất huyết rải rác 2 cẳng chân, gan màng sườn to 1.5 cm ấn đau tức nhẹ, dấu dây thắt (+).",
        "tc": "Chưa ghi nhận bệnh mạn tính trước đây.",
        "cls": "NS1 Dengue (+), Tiểu cầu giảm còn 62 G/L, Hct 44% (tăng >20% cô đặc máu), AST 120 U/L, ALT 95 U/L."
      }
    }
  }
]
```

> 💡 **Bảng mã Triệu chứng (Symptom IDs) phổ biến để điền vào mảng `"sel"`**:
> - **Sốt & Toàn thân**: `sot`, `sot_cao_27`, `sot_ve_chieu`, `met_moi`, `va_mo_hoi`
> - **Đau & Cơ quan**: `dau_dau`, `dau_co`, `dau_hau_mon_orbital`, `dau_nguc`, `dau_nguc_lan`, `kho_tho`, `kho_tho_khi_nam`, `dau_hong_phai`, `dau_thuong_vi`, `dau_bung_duoi`
> - **Xuất huyết & Da niêm**: `ban_xuat_huyet`, `xuat_huyet_ad`, `vang_da`, `loet_eschar`
> - **Khám & Cận lâm sàng**: `mac_burney`, `phan_ung_tb`, `st_chenh`, `troponin`, `bc_tang`, `tieu_cau_giam`, `ns1_dengue`, `ky_sinh_trung_sot_ret`, `xq_phoi_tham_nhiem`

---

### 🔹 PHƯƠNG THỨC 3: Soạn Ca Kinh Nghiệm SOAP Chuyên Sâu (Markdown / NotebookLM)

Phù hợp cho các ca bệnh kinh điển, bẫy chẩn đoán, hoặc tổng kết lâm sàng để hiển thị trong **Phân hệ Sổ tay Kinh nghiệm SOAP**:

1. Tạo một file Markdown mới trong thư mục:  
   `src/content/knowledge-vault/ba/<ten-ca-benh>.md`
2. Soạn thảo theo cấu trúc chuẩn:

```markdown
---
title: "Sốt Xuất Huyết Dengue Người Lớn Có Dấu Hiệu Cảnh Báo Vào Ngày Thứ 4"
caseId: "soap-dengue-warning-01"
specialty: "Nhiễm trùng - Nhiệt đới"
experienceLevel: "essential"
difficultyRating: 3
authorDoctor: "BS. Bác Sĩ Truyền Nhiễm"
icd10:
  - "A91"
tags:
  - "Sốt xuất huyết"
  - "Dengue"
  - "Dấu hiệu cảnh báo"
  - "Thoát huyết tương"
demographicContext: "Nữ 22 tuổi, sinh viên, sống tại khu vực đang bùng phát dịch SXHD, nhập viện vào ngày thứ 4 của bệnh."
historyPearls: "⚡ BÀI HỌC HỎI BỆNH: Ngày 4-6 là giai đoạn NGUY HIỂM nhất của SXHD. Bệnh nhân có thể giảm sốt nhưng lại bắt đầu thoát huyết tương, cô đặc máu và vào sốc. Phải hỏi kỹ: Đau bụng vùng gan? Nôn ói liên tục? Xuất huyết niêm mạc? Lừ đừ bứt rứt?"
objectivePitfalls: "⚠️ BẪY CẬN LÂM SÀNG: Không được chỉ nhìn vào số lượng tiểu cầu để đánh giá mức độ nặng! Hct tăng > 20% so với giá trị nền mới là dấu hiệu sớm của thoát huyết tương và dọa sốc cần bù dịch kịp thời."
diagnosticPearls: "🧠 ĐÚC KẾT BIỆN LUẬN: Tam giác Dịch tễ (mùa mưa + ổ dịch địa phương) + Lâm sàng (sốt cao liên tục 4 ngày + ban xuất huyết) + Cận lâm sàng (NS1 dương tính + TC < 100 G/L + Hct tăng): Đủ tiêu chuẩn chẩn đoán SXHD có dấu hiệu cảnh báo theo Bộ Y Tế."
takeawayLessons: "🎯 KINH NGHIỆM ĐIỀU TRỊ: Bù dịch bằng Ringer Lactate 6-7 ml/kg/giờ trong 1-2 giờ đầu, sau đó giảm liều dần theo đáp ứng sinh hiệu và Hct. Tuyệt đối không truyền dịch ồ ạt tránh phù phổi cấp khi tái hấp thu vào ngày 7."
sourceReference: "Hướng dẫn Chẩn đoán & Điều trị Sốt xuất huyết Dengue — Bộ Y Tế (Quyết định 2760/QĐ-BYT)"
clinicalContext: "Khoa Nhiễm - Bệnh viện Đa khoa"
outcomeNotes: "Bệnh nhân được bù dịch kiểm soát tốt, qua giai đoạn nguy hiểm vào ngày thứ 7, tiểu cầu phục hồi > 100 G/L và xuất viện an toàn."
updated: "2026-09-11"
---

# 🩺 Ca Lâm Sàng: Sốt Xuất Huyết Dengue Có Dấu Hiệu Cảnh Báo

## 1. 📝 S — Subjective (Bệnh sử & Triệu chứng)
- **Lý do nhập viện**: Sốt cao liên tục ngày 4, đau bụng vùng hạ sườn phải, nôn ói nhiều.
- **Bệnh sử**: Bệnh 4 ngày, khởi phát sốt cao đột ngột 39-40°C uống paracetamol hạ ít rồi sốt lại...
- **Dịch tễ**: Nơi trọ có nhiều người cùng dãy mắc sốt xuất huyết, xung quanh nhiều muỗi vằn.

## 2. 🔬 O — Objective (Khám & Xét nghiệm)
- **Sinh hiệu**: Mạch 100 l/p, HA 105/70 mmHg, Nhiệt độ 38.5°C, SpO₂ 98%.
- **Khám thực thể**: Chấm xuất huyết rải rác cẳng chân, gan to 1.5 cm dưới bờ sườn ấn đau.
- **Cận lâm sàng**: NS1 Dengue (+), BC 3.2 G/L, TC 58 G/L, Hct 44%.

## 3. 🧠 A — Assessment (Đánh giá & Biện luận)
- **Chẩn đoán xác định**: Sốt xuất huyết Dengue có dấu hiệu cảnh báo ngày thứ 4 (ICD-10: A91).
- **Vấn đề chính**: Thoát huyết tương cô đặc máu và giảm tiểu cầu.

## 4. 💊 P — Plan (Kế hoạch Điều trị)
- Bù dịch tĩnh mạch theo phác đồ Bộ Y Tế: Ringer Lactate 6 ml/kg/h x 2 giờ, theo dõi sát Hct và sinh hiệu mỗi 2 giờ.
```

---

## 🚀 3. Checklist Kiểm Tra Trước Khi Bàn Giao Ca Bệnh

- [ ] **Lý do vào viện** rõ ràng, súc tích (1 câu).
- [ ] **Sinh hiệu** có đủ ít nhất Mạch, Huyết áp, Nhiệt độ.
- [ ] **Yếu tố Dịch tễ** được ghi nhận (nguồn lây, vector, mùa, vùng địa lý).
- [ ] Có chọn **Vấn đề chính** để làm trục biện luận.
- [ ] Cận lâm sàng có xét nghiệm căn nguyên/định hướng (CTM, NS1, KST...).
- [ ] Phác đồ điều trị tuân thủ đúng Guideline Bộ Y Tế.
