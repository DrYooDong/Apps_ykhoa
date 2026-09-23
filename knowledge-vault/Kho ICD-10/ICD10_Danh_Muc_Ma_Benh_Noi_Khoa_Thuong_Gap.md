---
title: "Cẩm Nang Mã ICD-10 Các Bệnh Mạn Tính Thường Gặp (Nội Khoa Ngoại Trú & Nội Trú)"
aliases:
  - "Mã ICD-10 nội khoa mạn tính"
  - "Mã ICD đái tháo đường"
  - "Mã ICD tăng huyết áp"
  - "Mã ICD suy tim và COPD"
  - "Bảng mã kê đơn ngoại trú BHYT"
keywords:
  - "nội khoa"
  - "bệnh mạn tính"
  - "tăng huyết áp"
  - "đái tháo đường"
  - "copd"
  - "hen phế quản"
  - "bệnh thận mạn"
  - "xơ gan"
  - "gout"
  - "ngoại trú"
  - "kê đơn bhyt"
icd10:
  - "I10-I15"
  - "E10-E14"
  - "J44-J45"
  - "N18"
  - "K74"
  - "M10"
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - he-co-quan/tim-mach
  - he-co-quan/noi-tiet
  - he-co-quan/ho-hap
  - he-co-quan/than-tiet-nieu
type: "icd10"
context: "ngoai-tru"
readTime: "15-18 phút"
updated: "2026-09-07"
---

# Cẩm Nang Mã ICD-10 Các Bệnh Mạn Tính Thường Gặp (Nội Khoa Ngoại Trú & Nội Trú)

> [!NOTE]
> **Mục tiêu cẩm nang:** Chuẩn hóa việc gán mã bệnh ICD-10 trong quản lý bệnh mạn tính ngoại trú, kê đơn bảo hiểm y tế định kỳ (đơn thuốc 30 ngày) và điều trị nội khoa nội trú theo quy định của Bộ Y tế và Bảo hiểm Xã hội Việt Nam.

---

## 1. Phân Hệ Tim Mạch (Cardiovascular Diseases: I00 – I99)

### 1.1. Bệnh Tăng Huyết Áp (Hypertension: I10 – I15)
Một trong những lỗi thường gặp nhất là gán nhầm giữa tăng huyết áp đơn thuần và tăng huyết áp đã có biến chứng cơ quan đích:

| Mã ICD-10 | Tên Chẩn Đoán Chi Tiết | Điều Kiện Sử Dụng & BHYT |
|:---:|:---|:---|
| **`I10`** | **Tăng huyết áp vô căn (nguyên phát)** | Bệnh nhân tăng HA **chưa có tổn thương tim hoặc thận** đi kèm. Dùng cho đa số bệnh nhân ngoại trú ban đầu. |
| **`I11.0`** | **Bệnh tim do tăng huyết áp có suy tim** | Đã có phì đại thất trái / suy tim sung huyết do hậu quả của tăng HA. **Không cần gán thêm mã `I10`**. |
| **`I11.9`** | **Bệnh tim do tăng huyết áp không có suy tim** | Có dày thất trái trên siêu âm tim hoặc ECG nhưng chưa có triệu chứng suy tim. |
| **`I12.0`** | **Bệnh thận do tăng huyết áp có suy thận** | Tăng HA kèm suy thận mạn do tăng HA. |
| **`I13.0`** | **Bệnh tim và thận do tăng huyết áp có suy tim** | Tổn thương phối hợp cả tim và thận. |
| **`I15`** | **Tăng huyết áp thứ phát** | Tăng HA do hẹp động mạch thận (`I15.0`), u tủy thượng thận, u vỏ thượng thận (`I15.2`). |

> [!WARNING] NGUYÊN TẮC XUNG ĐỘT MÃ:
> Nếu đã sử dụng mã bệnh tim do tăng huyết áp (`I11`) hoặc bệnh thận do tăng huyết áp (`I12`), **TUYỆT ĐỐI KHÔNG GÁN ĐỒNG THỜI MÃ `I10`**. Việc dùng cả `I10` và `I11` trong cùng một đơn thuốc sẽ bị hệ thống giám định tự động phạt lỗi mã hóa thừa / trùng lặp.

---

### 1.2. Bệnh Tim Thiếu Máu Cục Bộ Mạn (I20, I25) & Suy Tim (I50)
- **Cơn đau thắt ngực (Angina Pectoris: I20):**
  - `I20.0`: Cơn đau thắt ngực không ổn định (Hội chứng vành cấp - bắt buộc điều trị nội trú cấp cứu).
  - `I20.8`: Các dạng đau thắt ngực khác (đau thắt ngực Prinzmetal do co thắt mạch).
  - `I20.9`: Cơn đau thắt ngực không xác định.
- **Bệnh tim thiếu máu cục bộ mạn tính (Chronic Ischaemic Heart Disease: I25):**
  - `I25.1`: **Bệnh xơ vữa động mạch tim** (CAD / bệnh mạch vành mạn tính). Đây là mã phổ biến nhất cho bệnh nhân sau đặt Stent hoặc điều trị nội khoa ngoại trú.
  - `I25.2`: Tiền sử nhồi máu cơ tim cũ (Old myocardial infarction - nhồi máu cơ tim đã qua quá 28 ngày).
- **Rung nhĩ & Cuồng nhĩ (Atrial Fibrillation: I48):**
  - `I48.0`: Rung nhĩ kịch phát (Paroxysmal AF).
  - `I48.1`: Rung nhĩ dai dẳng (Persistent AF).
  - `I48.2`: Rung nhĩ mạn tính / vĩnh viễn (Permanent AF).
- **Suy tim (Heart Failure: I50):**
  - `I50.0`: Suy tim sung huyết.
  - `I50.1`: Suy tim trái (phù phổi cấp do tim, hen tim).
  - `I50.9`: Suy tim không xác định.

---

## 2. Phân Hệ Nội Tiết & Chuyển Hóa (Endocrine Diseases: E00 – E90)

### 2.1. Đái Tháo Đường (Diabetes Mellitus: E10 – E14)
Hệ thống ICD-10 phân định rõ ĐTĐ Type 1 (`E10`), ĐTĐ Type 2 (`E11`), ĐTĐ do suy dinh dưỡng (`E12`), và ĐTĐ xác định khác (`E13`). 

Đặc biệt, **ký tự số thứ 4 sau dấu chấm (Ký tự thập phân)** là bắt buộc để mô tả biến chứng:

```
                  CẤU TRÚC MÃ ĐÁI THÁO ĐƯỜNG THEO BIẾN CHỨNG
                  
        E11 . X  ───►  .0: Có hôn mê (Toan ceton / Tăng ALTT)
                       .1: Có toan ceton (Ketoacidosis) không hôn mê
                       .2: Có biến chứng THẬN (Bệnh cầu thận ĐTĐ, microalbumin)
                       .3: Có biến chứng MẮT (Bệnh võng mạc ĐTĐ † / H36.0*)
                       .4: Có biến chứng THẦN KINH (Bệnh lý đa dây thần kinh)
                       .5: Có biến chứng TUẦN HOÀN NGOẠI VI (Hoại thư, PAD)
                       .6: Có biến chứng PHỐI HỢP KHÁC (Bàn chân đái tháo đường)
                       .7: Có nhiều biến chứng kết hợp
                       .8: Có biến chứng không xác định
                       .9: KHÔNG CÓ BIẾN CHỨNG (ĐTĐ kiểm soát thông thường)
```

#### Quy Tắc Ghép Cặp BHYT:
- Khi bệnh nhân ĐTĐ có tổn thương thận (protein niệu, tăng creatinine): Gán bệnh chính là **`E11.2`**, bệnh kèm theo là **`N08.3*`** (Bệnh cầu thận do đái tháo đường) hoặc **`N18`** (Bệnh thận mạn).
- Khi có biến chứng mắt: Bệnh chính là **`E11.3†`**, bệnh kèm theo là **`H36.0*`** (Bệnh võng mạc do đái tháo đường).
- Khi có loét bàn chân đái tháo đường: Mã bệnh chính **`E11.6`**, bệnh kèm theo là loét chi dưới **`L97`**.

---

### 2.2. Rối Loạn Lipid Máu (Dyslipidaemia: E78)
- `E78.0`: Tăng cholesterol máu nguyên phát (Tăng LDL-C).
- `E78.1`: Tăng triglycerid máu nguyên phát.
- `E78.2`: Tăng lipid máu hỗn hợp (Tăng đồng thời cả Cholesterol và Triglycerid).
- `E78.5`: Tăng lipid máu không xác định.

### 2.3. Bệnh Lý Tuyến Giáp (Thyroid Disorders: E00 – E07)
- `E05.0`: Bệnh nhiễm độc giáp có bướu giáp lan tỏa (**Bệnh Basedow / Graves' disease**).
- `E03.9`: Suy giáp không xác định (chỉ định dùng Levothyroxine).
- `E04.1`: Bướu giáp nhân đơn độc không độc.
- `E04.2`: Bướu giáp đa nhân không độc.

---

## 3. Phân Hệ Hô Hấp (Respiratory Diseases: J00 – J99)

### 3.1. Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD: J44)
ICD-10 phân định rõ COPD dựa trên tình trạng đợt cấp:
- **`J44.0`**: Bệnh phổi tắc nghẽn mạn tính có **đợt cấp do nhiễm khuẩn đường hô hấp**.
- **`J44.1`**: Bệnh phổi tắc nghẽn mạn tính có **đợt cấp không xác định / không có nhiễm khuẩn**.
- **`J44.8`**: Bệnh phổi tắc nghẽn mạn tính xác định khác.
- **`J44.9`**: Bệnh phổi tắc nghẽn mạn tính **không xác định / giai đoạn ổn định** (thường dùng cho đơn thuốc ngoại trú định kỳ).

### 3.2. Hen Phế Quản (Asthma: J45)
- `J45.0`: Hen phế quản chủ yếu do dị ứng (Allergic asthma).
- `J45.1`: Hen phế quản không do dị ứng (Non-allergic asthma).
- `J45.9`: Hen phế quản không xác định.
- `J46`: **Cơn hen phế quản ác tính (Status asthmaticus)** — cấp cứu đe dọa tính mạng.

> [!TIP] CHẨN ĐOÁN CHỒNG LẤP HEN - COPD (ACO):
> Trường hợp bệnh nhân có hội chứng chồng lấp Hen - COPD (Asthma-COPD Overlap), mã hóa chuẩn của Bộ Y tế là gán mã chính `J44.8` (COPD thể khác) và mã kèm theo là `J45.9` (Hen phế quản).

---

## 4. Phân Hệ Tiêu Hóa & Gan Mật (Digestive Diseases: K00 – K93)

- **Dạ dày & Thực quản:**
  - `K21.0`: Bệnh trào ngược dạ dày - thực quản có viêm thực quản (Erosive GERD).
  - `K21.9`: Bệnh trào ngược dạ dày - thực quản không có viêm thực quản (NERD).
  - `K25`: Loét dạ dày (`K25.0` - Loét dạ dày cấp có xuất huyết; `K25.7` - Loét mạn tính không xuất huyết).
  - `K29.7`: Viêm dạ dày không xác định.
- **Bệnh Gan Mạn Tính:**
  - `K74.6`: **Xơ gan khác và không xác định** (Mã xơ gan phổ biến nhất trong bệnh án).
  - `K70.3`: Xơ gan do rượu.
  - `K76.0`: Thoái hóa mỡ của gan, chưa được phân loại ở nơi khác (Gan nhiễm mỡ / NAFLD / MASLD).
  - `B18.1`: Viêm gan virus B mạn tính không có tác nhân Delta (Chỉ định dùng Tenofovir, Entecavir).
  - `B18.2`: Viêm gan virus C mạn tính (Chỉ định thuốc DAA Sofosbuvir, Daclatasvir).

---

## 5. Phân Hệ Thận - Tiết Niệu (Genitourinary Diseases: N00 – N99)

### Bệnh Thận Mạn (Chronic Kidney Disease: N18) Theo Phân Độ KDIGO
Bắt buộc phân độ chính xác theo mức lọc cầu thận ước tính (eGFR):

| Phân Độ KDIGO | Trị Số eGFR (mL/min/1.73m²) | Mã ICD-10 Chuẩn | Quyền Lợi BHYT Đặc Biệt |
|:---|:---:|:---:|:---|
| **Giai đoạn 1 (G1)** | $\ge 90$ (kèm tổn thương thận) | **`N18.1`** | Quản lý bảo tồn |
| **Giai đoạn 2 (G2)** | $60 - 89$ | **`N18.2`** | Quản lý bảo tồn |
| **Giai đoạn 3 (G3)** | $30 - 59$ (G3a: 45-59; G3b: 30-44) | **`N18.3`** | Chỉnh liều thuốc thải qua thận |
| **Giai đoạn 4 (G4)** | $15 - 29$ | **`N18.4`** | Chuẩn bị tạo cầu tay FAV |
| **Giai đoạn 5 (G5)** | $< 15$ | **`N18.5`** | **Điều kiện thanh toán Thận nhân tạo chu kỳ, Lọc màng bụng, Erythropoietin (EPO)** |
| **Không xác định** | Chưa làm eGFR | **`N18.9`** | Hạn chế sử dụng |

---

## 6. Phân Hệ Cơ Xương Khớp (Musculoskeletal Diseases: M00 – M99)

- `M10.0`: **Bệnh Gút vô căn (Idiopathic gout)** — căn cứ kê đơn Allopurinol, Febuxostat, Colchicine.
- `M17`: **Thoái hóa khớp gối** (`M17.0` - Thoái hóa khớp gối tiên phát hai bên; `M17.1` - Một bên).
- `M16`: Thoái hóa khớp háng.
- `M06.9`: Viêm khớp dạng thấp không xác định (Chỉ định thuốc Methotrexate, DMARDs sinh học).
- `M81.0`: **Loãng xương sau mãn kinh** (Căn cứ đo mật độ xương DEXA và dùng Bisphosphonate).
- `M54.5`: Đau thắt lưng (Low back pain).

---

## 7. Đơn Thuốc Mẫu Ngoại Trú Chuẩn Mã Hóa BHYT

### Ca lâm sàng: Bệnh nhân nam 68 tuổi, tái khám ngoại trú định kỳ, tiền sử: Tăng huyết áp 10 năm, Đái tháo đường Type 2 có đạm niệu vi thể, Xơ vữa mạch vành đã đặt Stent 2 năm trước, Rối loạn lipid máu hỗn hợp
- **Bệnh chính (Mã duy nhất lý do quản lý):**
  - `E11.2`: Bệnh đái tháo đường không phụ thuộc insulin có biến chứng thận.
- **Bệnh kèm theo (Các bệnh phối hợp điều trị):**
  - `I25.1`: Bệnh tim do xơ vữa động mạch (Bệnh mạch vành).
  - `Z95.5`: Sự hiện diện của mô ghép và stent tạo hình mạch vành (Đảm bảo chỉ định thuốc chống kết tập tiểu cầu kép DAPT/Aspirin).
  - `I10`: Bệnh tăng huyết áp vô căn.
  - `E78.2`: Tăng lipid máu hỗn hợp (Đảm bảo chỉ định Statin liều cao).
  - `N18.3`: Bệnh thận mạn giai đoạn 3 (Căn cứ thanh toán xét nghiệm Protein niệu và chỉnh liều thuốc).
