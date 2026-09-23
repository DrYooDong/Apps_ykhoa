---
title: "Bách Khoa Thang Điểm: NIHSS Đánh Giá Độ Nặng Đột Quỵ Não Cấp & Quyết Định Tái Tưới Máu"
aliases:
  - "Thang điểm Đột quỵ Não NIHSS"
  - "NIHSS"
  - "NIH Stroke Scale"
  - "Đột quỵ thiếu máu não cấp"
  - "Tiêu sợi huyết rt-PA"
  - "Lấy huyết khối cơ học EVT"
keywords:
  - "thang điểm nihss"
  - "đột quỵ thiếu máu não cấp"
  - "thuốc tiêu sợi huyết alteplase tenecteplase"
  - "lấy huyết khối cơ học evt"
  - "cửa sổ 4.5 giờ 24 giờ"
  - "thang điểm aspects"
icd10:
  - "I63 (Nhồi máu não / Đột quỵ thiếu máu cục bộ cấp)"
  - "I61 (Xuất huyết nội sọ)"
specialty: "Thần kinh & Hồi sức Cấp cứu"
tags:
  - "CliniPortal"
  - "ClinicalCalculator"
  - "KhoCongCu"
  - "Thần kinh & Cấp cứu"
type: "calculator"
updated: "2026-08-22"
---

# 🧠 Bách Khoa Thang Điểm: NIHSS Đánh Giá Độ Nặng Đột Quỵ Não Cấp

> **Tóm tắt cốt lõi**: Thang điểm **NIHSS (National Institutes of Health Stroke Scale)** gồm **11 mục khảo sát 15 chức năng thần kinh** với thang điểm từ 0 đến 42 điểm. Đây là công cụ lượng hóa mức độ khiếm khuyết thần kinh tiêu chuẩn vàng trên toàn cầu, đóng vai trò quyết định trong việc chỉ định **Thuốc tiêu sợi huyết đường tĩnh mạch (r-tPA trong cửa sổ $\le 4.5$ giờ)** và **Can thiệp lấy huyết khối cơ học bằng dụng cụ nội mạch (EVT trong cửa sổ $\le 24$ giờ)**.

---

## 🏛️ 1. CHI TIẾT 11 HẠNG MỤC KHẢO SÁT THẦN KINH CỦA THANG ĐIỂM NIHSS (0 - 42 ĐIỂM)

```
[BẢNG 11 MỤC ĐÁNH GIÁ THẦN KINH THEO THANG ĐIỂM NIHSS]
├── 1a. Mức độ ý thức (Level of Consciousness): 0 = Tỉnh táo; 1 = Ngủ gà; 2 = Lơ mơ; 3 = Hôn mê/Mất đáp ứng.
├── 1b. Trả lời câu hỏi (Tháng này & Tuổi): 0 = Đúng cả 2; 1 = Đúng 1 câu; 2 = Sai cả 2 / Thất ngôn.
├── 1c. Thực hiện mệnh lệnh (Nhắm mắt & Nắm tay): 0 = Đúng cả 2; 1 = Đúng 1 lệnh; 2 = Không làm được.
├── 2. Vận nhãn liếc ngang (Best Gaze): 0 = Bình thường; 1 = Liệt liếc một phần; 2 = Liệt liếc hoàn toàn / Mắt nhìn lệch một bên.
├── 3. Thị trường thị giác (Visual Fields): 0 = Bình thường; 1 = Bán manh 1 phần; 2 = Bán manh đồng danh hoàn toàn; 3 = Mù hoàn toàn 2 mắt.
├── 4. Liệt dây thần kinh mặt (Facial Palsy): 0 = Đối xứng; 1 = Liệt nhẹ (mất rãnh mũi má); 2 = Liệt rõ nửa dưới mặt; 3 = Liệt hoàn toàn nửa mặt.
├── 5. Vận động Tay (Motor Arm - Giữ tay 10 giây ở 90° ngồi hoặc 45° nằm):
│   ├── 5a. Tay Trái: 0 = Giữ được 10s; 1 = Rơi nhẹ trước 10s; 2 = Rơi chạm giường; 3 = Chỉ cử động co duỗi; 4 = Liệt hoàn toàn.
│   └── 5b. Tay Phải: 0 = Giữ được 10s; 1 = Rơi nhẹ trước 10s; 2 = Rơi chạm giường; 3 = Chỉ cử động co duỗi; 4 = Liệt hoàn toàn.
├── 6. Vận động Chân (Motor Leg - Giữ chân 30° nằm trong 5 giây):
│   ├── 6a. Chân Trái: 0 = Giữ được 5s; 1 = Rơi nhẹ trước 5s; 2 = Rơi chạm giường; 3 = Chỉ cử động co duỗi; 4 = Liệt hoàn toàn.
│   └── 6b. Chân Phải: 0 = Giữ được 5s; 1 = Rơi nhẹ trước 5s; 2 = Rơi chạm giường; 3 = Chỉ cử động co duỗi; 4 = Liệt hoàn toàn.
├── 7. Thất điều chi (Limb Ataxia - Nghiệm pháp Ngón tay trỏ mũi & Gót chân đầu gối): 0 = Không thất điều; 1 = Thất điều 1 chi; 2 = Thất điều 2 chi.
├── 8. Cảm giác da (Sensory - Châm kim đau): 0 = Bình thường; 1 = Giảm cảm giác nhẹ/vừa; 2 = Mất cảm giác hoàn toàn nửa người.
├── 9. Ngôn ngữ (Best Language - Đặt tên đồ vật, mô tả tranh): 0 = Không thất ngôn; 1 = Thất ngôn nhẹ/vừa; 2 = Thất ngôn nặng; 3 = Mất ngôn ngữ toàn bộ.
├── 10. Loạn vận ngôn (Dysarthria - Đọc các từ mẫu): 0 = Phát âm chuẩn; 1 = Loạn ngôn nhẹ/vừa (nói đớ); 2 = Loạn ngôn nặng/Không nói được.
└── 11. Bỏ quên nửa người / Không chú ý (Extinction / Inattention): 0 = Bình thường; 1 = Bỏ quên 1 giác quan; 2 = Bỏ quên sâu sắc nhiều giác quan.
```

---

## 📊 2. PHÂN TẦNG ĐỘ NẶNG THEO TỔNG ĐIỂM NIHSS & TIÊN LƯỢNG

| Tổng Điểm NIHSS | Phân Tầng Độ Nặng Đột Quỵ | Tiên Lượng & Khả Năng Phục Hồi | Nguy Cơ Chuyển Dạng Xuất Huyết Não |
|:---:|:---|:---|:---:|
| **$0\text{ điểm}$** | Không có khiếm khuyết thần kinh | Phục hồi hoàn toàn | Rất thấp ($< 1\%$) |
| **$1 - 4\text{ điểm}$** | **Đột quỵ Nhẹ (Minor Stroke)** | Tiên lượng rất tốt ($> 80\%$ hồi phục tự chủ sinh hoạt). | Rất thấp ($< 1.5\%$) |
| **$5 - 15\text{ điểm}$** | **Đột quỵ Vừa (Moderate Stroke)** | Đáp ứng điều trị tái tưới máu tối ưu nhất. | Trung bình ($3 - 5\%$) |
| **$16 - 20\text{ điểm}$** | **Đột quỵ Nặng (Moderate to Severe)** | Khiếm khuyết nặng, cần phục hồi chức năng tích cực. | Cao ($6 - 8\%$) |
| **$21 - 42\text{ điểm}$** | **ĐỘT QUỴ RẤT NẶNG (Severe Stroke)** | Tỷ lệ tử vong và tàn phế cao ($> 50\%$), ổ nhồi máu diện rộng. | **RẤT CAO ($> 10 - 15\%$)** |

---

## ⚡ 3. THUẬT TOÁN TÁI TƯỚI MÁU CẤP DỰA TRÊN NIHSS & THỜI GIAN (AHA / ASA GUIDELINES)

```
             [BỆNH NHÂN NGHI NGỜ ĐỘT QUỴ THIẾU MÁU NÃO CẤP NHẬP VIỆN CẤP CỨU]
                                            │
                                            ▼
           [CHỤP CT-SCAN SỌ NÃO KHẨN CẤP (Loại trừ Xuất huyết não & Đánh giá ASPECTS)]
                                            │
       ┌────────────────────────────────────┴────────────────────────────────────┐
       ▼ (Thời gian khởi phát ≤ 4.5 GIỜ)                                          ▼ (Tắc mạch lớn LVO & Thời gian ≤ 24 GIỜ)
[TIÊU SỢI HUYẾT TĨNH MẠCH (IVT)]                                          [LẤY HUYẾT KHỐI CƠ HỌC NỘI MẠCH (EVT)]
• Thuốc: ALTEPLASE (rt-PA) 0.9 mg/kg                                      • Chỉ định khi: Tắc ĐM cảnh trong (ICA)
  (10% bolus, 90% truyền trong 60 phút; max 90mg)                           hoặc ĐM não giữa đoạn M1 / M2.
  HOẶC TENECTEPLASE (TNK) 0.25 mg/kg bolus 1 lần.                         • Điểm NIHSS ≥ 6 VÀ Điểm ASPECTS ≥ 6.
• Điều kiện tiên quyết: Huyết áp < 185/110 mmHg.                         • Cửa sổ 0 - 6 giờ: Chỉ định thường quy.
• Chống chỉ định: INR > 1.7, Tiểu cầu < 100 G/L,                          • Cửa sổ 6 - 24 giờ: Chỉ định dựa trên
  Tiền sử xuất huyết não, Đang dùng DOACs < 48h.                            Mismatch tưới máu não (DAWN / DEFUSE-3).
```

---

## 🧠 4. BỘ FLASHCARDS LÂM SÀNG CỐT LÕI (SPACED REPETITION)

1. **Câu hỏi**: Thang điểm NIHSS có bao nhiêu điểm tối đa và mức điểm cắt từ bao nhiêu trở lên thường gợi ý bệnh nhân có tình trạng tắc nghẽn mạch máu lớn nội sọ (LVO - Large Vessel Occlusion)?
   - **Đáp án**: Thang điểm NIHSS có **tối đa 42 điểm**. Điểm **$\text{NIHSS} \ge 6\text{ điểm}$** (đặc biệt $\ge 10-12\text{ điểm}$) có giá trị dự báo cao về tình trạng **Tắc động mạch lớn (LVO)** như Động mạch cảnh trong hoặc Động mạch não giữa đoạn M1.
2. **Câu hỏi**: Cửa sổ thời gian vàng để chỉ định Thuốc tiêu sợi huyết đường tĩnh mạch (Alteplase / Tenecteplase) trong đột quỵ nhồi máu não cấp là bao nhiêu giờ?
   - **Đáp án**: Cửa sổ thời gian vàng là **$\le 4.5\text{ giờ}$** tính từ thời điểm khởi phát triệu chứng đầu tiên (hoặc thời điểm cuối cùng bệnh nhân được nhìn thấy hoàn toàn bình thường - "Last Known Normal").
3. **Câu hỏi**: Theo các thử nghiệm lâm sàng DAWN và DEFUSE-3, can thiệp lấy huyết khối cơ học bằng dụng cụ nội mạch (EVT) có thể mở rộng cửa sổ thời gian điều trị tối đa lên đến bao nhiêu giờ?
   - **Đáp án**: Lên đến **$24\text{ giờ}$** kể từ khi khởi phát ở những bệnh nhân có tắc mạch máu lớn tuần hoàn trước thỏa mãn tiêu chuẩn bất tương xứng (mismatch) giữa vùng mô não hoại tử lõi nhỏ và vùng tranh tối tranh sáng (penumbra) còn cứu sống được trên hình ảnh học tưới máu não CT Perfusion hoặc MRI Diffusion/Perfusion.

---

## 📚 5. TRÍCH DẪN TÀI LIỆU THAM KHẢO CHUẨN EBM

1. Powers WJ, et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update to the 2018 Guidelines. *Stroke*. 2019;50(12):e344-e418.
2. Brott T, et al. Measurements of acute cerebral infarction: a clinical examination scale (NIHSS). *Stroke*. 1989;20(7):864-870.
3. Nogueira RG, et al. Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct (DAWN Trial). *N Engl J Med*. 2018;378(1):11-21.
4. Albers GW, et al. Thrombectomy for Stroke at 6 to 16 Hours with Selection by Perfusion Imaging (DEFUSE 3 Trial). *N Engl J Med*. 2018;378(8):708-718.
