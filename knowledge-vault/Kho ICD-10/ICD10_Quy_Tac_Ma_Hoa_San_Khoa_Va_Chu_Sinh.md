---
title: "Quy Tắc Mã Hóa Sản Phụ Khoa & Thời Kỳ Chu Sinh (Chương XV & XVI)"
aliases:
  - "Mã hóa sản khoa ICD-10"
  - "Mã hóa sơ sinh chu sinh"
  - "Quy tắc mã mẹ và con ICD-10"
  - "Mã phương thức đẻ và kết cục sinh"
keywords:
  - "sản khoa"
  - "chu sinh"
  - "sơ sinh"
  - "chương xv"
  - "chương xvi"
  - "tiền sản giật"
  - "đái tháo đường thai kỳ"
  - "sinh mổ"
  - "kết cục sinh"
  - "bhyt"
icd10:
  - "O00-O99"
  - "P00-P96"
  - "Z37"
  - "Z3A"
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - he-co-quan/san-phu-khoa
  - he-co-quan/nhi-khoa
type: "icd10"
context: "noi-tru"
readTime: "12-14 phút"
updated: "2026-09-07"
---

# Quy Tắc Mã Hóa Sản Phụ Khoa & Thời Kỳ Chu Sinh (Chương XV & XVI)

> [!NOTE]
> **Căn cứ chuyên môn:** Hướng dẫn phân loại ICD-10 của WHO & Quyết định số 1849/QĐ-BYT | **Phạm vi áp dụng:** Khoa Sản, Khoa Phụ, Khoa Sơ sinh (NICU), Phòng Kế hoạch tổng hợp và Bộ phận Giám định BHYT.

---

## 1. Nguyên Tắc Cốt Lõi: Phân Tách Tuyệt Đối Hồ Sơ Mẹ & Con

Một trong những lỗi mã hóa nghiêm trọng và phổ biến nhất trên hệ thống HIS là việc gán nhầm mã bệnh giữa người mẹ và trẻ sơ sinh. Quy tắc bất biến của WHO và Bộ Y tế:

1. **Hồ sơ bệnh án của Người Mẹ (Sản khoa):**
   - Chỉ được sử dụng các mã bệnh thuộc **Chương XV (O00 – O99)** và các mã tình trạng liên quan sức khỏe sinh sản thuộc Chương XXI (`Z30–Z39`).
   - **TUYỆT ĐỐI KHÔNG** được gán các mã thuộc Chương XVI (`P00–P96`) vào hồ sơ của mẹ.
2. **Hồ sơ bệnh án của Trẻ Sơ Sinh (Chu sinh / Sơ sinh):**
   - Chỉ được sử dụng các mã bệnh thuộc **Chương XVI (P00 – P96)**, mã dị tật bẩm sinh thuộc Chương XVII (`Q00–Q99`), hoặc mã khám trẻ sơ sinh khỏe mạnh (`Z76.2`).
   - **TUYỆT ĐỐI KHÔNG** được gán các mã thuộc Chương XV (`O00–O99`) vào hồ sơ của trẻ sơ sinh.

> [!WARNING] CẢNH BÁO BẪY LỖI BHYT:
> - **Lỗi 1:** Đặt mã `P22.0` (Suy hô hấp sơ sinh) làm bệnh kèm theo trong hồ sơ ra viện của sản phụ $\rightarrow$ Cổng BHYT sẽ cảnh báo lỗi giới tính / phân hệ đối tượng và từ chối thanh toán.
> - **Lỗi 2:** Gán mã `O80` (Đẻ thường) vào bệnh án theo dõi vàng da của trẻ sơ sinh $\rightarrow$ Xuất toán hồ sơ sơ sinh.

---

## 2. Quy Chuẩn Mã Hóa Cho Hồ Sơ Sản Phụ (Chương XV: O00 – O99)

### 2.1. Cấu Trúc Mã Hóa Cuộc Đẻ Đầy Đủ
Khi sản phụ nhập viện và kết thúc đợt điều trị bằng một cuộc sinh nở (dù đẻ thường hay đẻ mổ), hồ sơ bệnh án ra viện **phải có đầy đủ bộ 3 nhóm mã**:

```
[1. Biến chứng thai kỳ / Lý do mổ]  +  [2. Phương thức đẻ (O80–O84)]  +  [3. Kết cục sinh (Z37)]
```

#### Bước 1: Mã hóa Phương Thức Đẻ (O80 – O84)
- `O80`: Đẻ thường tự nhiên một thai (Single spontaneous delivery).
  - `O80.0`: Đẻ ngôi chỏm tự nhiên.
- `O81`: Đẻ một thai bằng thủ thuật can thiệp (forceps, giác hút vacuum).
- `O82`: Đẻ một thai bằng phương pháp mổ lấy thai (Caesarean section).
  - `O82.0`: Mổ lấy thai chủ động (Elective caesarean section).
  - `O82.1`: Mổ lấy thai cấp cứu (Emergency caesarean section).
  - `O82.8`: Mổ lấy thai khác.
- `O84`: Đẻ đa thai (song thai, tam thai).

#### Bước 2: Mã hóa Kết Cục Cuộc Sinh (Z37) — Bắt Buộc Đi Kèm
- `Z37.0`: Đẻ một con, còn sống (Single live birth).
- `Z37.1`: Đẻ một con, thai chết lưu (Single stillbirth).
- `Z37.2`: Đẻ đôi, cả hai còn sống (Twins, both liveborn).
- `Z37.3`: Đẻ đôi, một sống một chết lưu.
- `Z37.4`: Đẻ đôi, cả hai chết lưu.
- `Z37.9`: Kết cục thai nghén không xác định.

#### Bước 3: Mã hóa Tuần Thai (Z3A)
Bộ Y tế khuyến khích bổ sung mã tuổi thai theo tuần để phục vụ thống kê sản khoa:
- `Z3A.37` đến `Z3A.41`: Thai đủ tháng (37 đến 41 tuần).
- `Z3A.28` đến `Z3A.36`: Thai non tháng.

---

### 2.2. Các Bệnh Lý & Biến Chứng Sản Khoa Thường Gặp

| Bệnh Lý / Tình Trạng Sản Khoa | Mã ICD-10 | Lưu Ý Lâm Sàng & Thẩm Định BHYT |
|:---|:---:|:---|
| **Đái tháo đường thai kỳ** | `O24.4` | ĐTĐ xuất hiện trong thai kỳ; không gán mã `E11` nếu không có tiền sử ĐTĐ trước mang thai. |
| **Tăng huyết áp do thai nghén** | `O13` | Tăng HA thai kỳ không có protein niệu đáng kể. |
| **Tiền sản giật nhẹ / vừa** | `O14.0` | Tăng HA + Protein niệu sau tuần 20. |
| **Tiền sản giật nặng** | `O14.1` | Tăng HA nặng $\ge 160/110$ mmHg, suy giảm chức năng gan/thận, giảm tiểu cầu. |
| **Sản giật** | `O15` | `O15.0` (trong thai kỳ), `O15.1` (trong chuyển dạ), `O15.2` (hậu sản). |
| **Dọa đẻ non** | `O60.0` | Cơn co tử cung trước tuần 37 chưa gây mở cổ tử cung đáng kể. |
| **Chuyển dạ đẻ non** | `O60.1` | Đẻ non tự nhiên trước 37 tuần. |
| **Nhau tiền đạo** | `O44` | `O44.0` (không xuất huyết), `O44.1` (có xuất huyết). Căn cứ pháp lý cho chỉ định mổ lấy thai chủ động. |
| **Nhau bong non** | `O45` | Tình trạng cấp cứu sản khoa đe dọa tính mạng mẹ và con. |
| **Băng huyết sau sinh (PPH)** | `O72` | `O72.0` (do sót nhau), `O72.1` (do đờ tử cung sau đẻ tức thì), `O72.2` (băng huyết muộn). |
| **Vết mổ đẻ cũ** | `O34.2` | Chăm sóc mẹ do có sẹo mổ lấy thai tử cung từ trước. |

---

## 3. Quy Chuẩn Mã Hóa Cho Hồ Sơ Trẻ Sơ Sinh (Chương XVI: P00 – P96)

Thời kỳ chu sinh bắt đầu từ **tuần thứ 22 của thai kỳ (154 ngày)** và kết thúc tròn **28 ngày sau sinh**.

### 3.1. Các Tình Trạng Ảnh Hưởng Từ Mẹ Tới Thai & Sơ Sinh (P00 – P04)
Nhóm mã này dùng cho hồ sơ của **TRẺ SƠ SINH** khi bị ảnh hưởng bởi bệnh lý của mẹ:
- `P00.0`: Trẻ sơ sinh bị ảnh hưởng bởi rối loạn tăng huyết áp của mẹ.
- `P07.0`: Trẻ cực non / cực nhẹ cân ($< 1000$g).
- `P07.1`: Trẻ nhẹ cân khác ($1000$g – $2499$g).
- `P07.3`: Trẻ sinh non khác (tuổi thai $< 37$ tuần).

### 3.2. Suy Hô Hấp & Tim Mạch Sơ Sinh
- `P21`: Ngạt chu sinh (`P21.0` - Ngạt nặng / điểm APGAR 1 phút 0–3; `P21.1` - Ngạt nhẹ đến vừa / APGAR 4–7).
- `P22`: Suy hô hấp ở trẻ sơ sinh:
  - `P22.0`: Hội chứng suy hô hấp sơ sinh (Bệnh màng trong / RDS do thiếu hụt surfactant).
  - `P22.1`: Cơn thở nhanh thoáng qua của trẻ sơ sinh (TTN / ứ dịch phổi).
- `P24`: Hội chứng hít phân su ở trẻ sơ sinh (MAS - Meconium aspiration syndrome).

### 3.3. Nhiễm Trùng Chu Sinh
- `P36`: Nhiễm khuẩn huyết ở trẻ sơ sinh:
  - `P36.0`: Do Liên cầu nhóm B (GBS).
  - `P36.1`: Do E. coli.
  - `P36.9`: Nhiễm khuẩn huyết sơ sinh không xác định.

### 3.4. Vàng Da Sơ Sinh (Neonatal Jaundice)
- `P55`: Bệnh tan máu ở thai nhi và trẻ sơ sinh (bất đồng nhóm máu Rh `P55.0`, bất đồng ABO `P55.1`).
- `P58`: Vàng da sơ sinh do tan máu quá mức khác.
- `P59`: Vàng da sơ sinh do các nguyên nhân khác và không xác định (`P59.0` - Vàng da kết hợp sinh non; `P59.9` - Vàng da sinh lý/không rõ căn nguyên).

---

## 4. Các Tình Huống Lâm Sàng & Bộ Mã Mẫu Chuẩn BHYT

### Tình huống 1: Sản phụ 32 tuổi, thai 39 tuần con so, tiền sản giật nặng, mổ lấy thai cấp cứu thành công, sinh một bé trai sống khỏe mạnh
- **Hồ sơ Người Mẹ:**
  - Bệnh chính: `O14.1` (Tiền sản giật nặng) $\rightarrow$ Đây là bệnh lý chỉ định nhập viện và mổ cấp cứu.
  - Bệnh kèm 1: `O82.1` (Mổ lấy thai cấp cứu).
  - Bệnh kèm 2: `Z37.0` (Đẻ một con, còn sống).
  - Bệnh kèm 3: `Z3A.39` (Thai 39 tuần).
- **Hồ sơ Trẻ Sơ Sinh (nếu có lập bệnh án riêng):**
  - Bệnh chính: `P00.0` (Trẻ sơ sinh bị ảnh hưởng bởi rối loạn tăng huyết áp của mẹ) hoặc `Z76.2` (Khám và giám sát trẻ sơ sinh khỏe mạnh).

### Tình huống 2: Sản phụ thai 30 tuần, chuyển dạ đẻ non, sinh thường bé gái cân nặng 1400g bị bệnh màng trong
- **Hồ sơ Người Mẹ:**
  - Bệnh chính: `O60.1` (Chuyển dạ đẻ non có sinh nở).
  - Bệnh kèm 1: `O80.0` (Đẻ thường tự nhiên ngôi chỏm).
  - Bệnh kèm 2: `Z37.0` (Đẻ một con, còn sống).
  - Bệnh kèm 3: `Z3A.30` (Thai 30 tuần).
- **Hồ sơ Trẻ Sơ Sinh:**
  - Bệnh chính: `P22.0` (Hội chứng suy hô hấp sơ sinh / Bệnh màng trong).
  - Bệnh kèm 1: `P07.1` (Trẻ sơ sinh nhẹ cân: $1000$g – $2499$g).
  - Bệnh kèm 2: `P07.3` (Trẻ sinh non).
