---
title: "Sổ Tay 50+ Bẫy Lỗi Giám Định BHYT & Giải Pháp Phòng Ngừa Xuất Toán (TT06/2026)"
aliases:
  - "Chống xuất toán BHYT ICD-10"
  - "Sổ tay giám định BHYT"
  - "Các lỗi mã hóa BHYT thường gặp"
  - "Điều kiện thanh toán CLS và thuốc BHYT"
keywords:
  - "xuất toán bhyt"
  - "giám định bhyt"
  - "bẫy lỗi mã hóa"
  - "thông tư 35"
  - "thông tư 50"
  - "thông tư 30"
  - "hba1c"
  - "troponin"
  - "mri"
  - "ct scanner"
  - "bhyt"
icd10:
  - "A00-Z99"
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/icd10
  - he-co-quan/tong-quat
type: "icd10"
context: "noi-tru"
readTime: "18-22 phút"
updated: "2026-09-07"
---

# Sổ Tay 50+ Bẫy Lỗi Giám Định BHYT & Giải Pháp Phòng Ngừa Xuất Toán (TT06/2026)

> [!NOTE]
> **Văn bản pháp quy cốt lõi:** Luật Khám chữa bệnh • Luật Bảo hiểm Y tế • Thông tư 35/2016/TT-BYT, Thông tư 50/2017/TT-BYT (Quy định điều kiện thanh toán cận lâm sàng) • Thông tư 30/2018/TT-BYT, Thông tư 20/2022/TT-BYT (Danh mục & tỷ lệ thanh toán thuốc BHYT) • Thông tư 06/2026/TT-BYT & Quyết định 1849/QĐ-BYT.

---

## 1. Cơ Chế Giám Định Điện Tử Của Cơ Quan BHXH Việt Nam

Hiện nay, Hệ thống Thông tin Giám định BHYT của Bảo hiểm Xã hội Việt Nam sử dụng **hàng trăm quy tắc thuật toán tự động (Rules Engine)** để quét kiểm tra toàn bộ dữ liệu XML bảng kê viện phí (Bảng 1, Bảng 2, Bảng 3, Bảng 4, Bảng 5) ngay khi cơ sở y tế đẩy dữ liệu lên cổng.

Bất kỳ sự không tương thích nào giữa **Mã bệnh chính / bệnh kèm theo (Bảng 1)** và **Mã dịch vụ kỹ thuật / Cận lâm sàng (Bảng 2 & 3)** hoặc **Mã thuốc / Vật tư (Bảng 2)** đều sẽ kích hoạt cảnh báo xuất toán tự động (từ chối thanh toán một phần hoặc toàn bộ chi phí).

---

## 2. Nhóm Bẫy Lỗi Cấu Trúc Mã Bệnh & Nguyên Tắc Chẩn Đoán (20 Lỗi)

### 2.1. Lỗi Dùng Mã Triệu Chứng (Chương XVIII) Làm Bệnh Chính
- **Bẫy lỗi:** Bệnh nhân nằm viện điều trị 5 ngày, kết quả chụp CT sọ não kết luận Nhồi máu não bán cầu trái, nhưng bác sĩ ghi bệnh chính khi ra viện là `R07.4` (Đau ngực) hoặc `R51` (Đau đầu).
- **Hậu quả:** Xuất toán tiền ngày giường điều trị nội trú và các xét nghiệm chuyên sâu vì lý do "Không có chẩn đoán bệnh xác định mà vẫn chỉ định nằm viện kéo dài".
- **Giải pháp:** Khi đã có chẩn đoán bệnh xác định, **bắt buộc chọn mã bệnh lý cụ thể làm bệnh chính** (VD: `I63.9`). Chỉ được dùng mã triệu chứng Chương XVIII khi bệnh nhân xuất viện mà sau mọi thăm dò vẫn không tìm ra nguyên nhân bệnh sinh.

### 2.2. Lỗi Dùng Mã Biểu Hiện Hoa Thị (*) Làm Bệnh Chính Đơn Độc
- **Bẫy lỗi:** Gán `H36.0*` (Bệnh võng mạc đái tháo đường) hoặc `G01*` (Viêm màng não do vi khuẩn) làm mã bệnh chính.
- **Hậu quả:** Phần mềm giám định từ chối duyệt hồ sơ ngay lập tức vì vi phạm quy ước quốc tế của WHO.
- **Giải pháp:** Mã hoa thị `*` không bao giờ đứng một mình. Bắt buộc phải có mã căn nguyên có dấu thập `†` làm bệnh chính (VD: Bệnh chính là `E11.3†`, bệnh kèm theo là `H36.0*`).

### 2.3. Lỗi Thiếu Mã Nguyên Nhân Ngoại Lai Cho Ca Chấn Thương
- **Bẫy lỗi:** Hồ sơ ghi chấn thương gãy xương đùi `S72.0` nhưng không kèm mã tai nạn giao thông hay ngã `V01–Y98`.
- **Hậu quả:** Xuất toán 100% chi phí điều trị đợt tai nạn.
- **Giải pháp:** Mọi mã thuộc nhóm `S00 – T98` bắt buộc phải kèm ít nhất 01 mã nguyên nhân ngoại lai (`V, W, X, Y`).

### 2.4. Lỗi Mâu Thuẫn Giới Tính & Lứa Tuổi
- **Bẫy lỗi giới tính:** Nam giới nhưng gán mã bệnh viêm lộ tuyến cổ tử cung `N86`, u xơ tử cung `D25`, hoặc mã sản khoa `O`. Nữ giới nhưng gán mã u phì đại lành tính tuyến tiền liệt `N40`.
- **Bẫy lỗi lứa tuổi:** Người bệnh 65 tuổi gán mã Bệnh màng trong sơ sinh `P22.0`, hoặc trẻ em 2 tuổi gán mã Loãng xương sau mãn kinh `M81.0`.
- **Giải pháp:** Cài đặt bộ lọc cứng (Hard validation) trên giao diện phần mềm HIS ngăn chặn bác sĩ chọn mã trái giới tính/lứa tuổi.

### 2.5. Lỗi Gán Cặp Mã Xung Đột (Mutually Exclusive Codes)
Bảng kê BHYT sẽ bị phạt nếu xuất hiện các cặp mã loại trừ nhau sau đây:

| Mã Không Được Đi Kèm | Mã Xung Đột | Lý Do Xuất Toán | Cách Sửa Đúng |
|:---|:---|:---|:---|
| `I10` (Tăng HA vô căn) | `I11` (Bệnh tim do tăng HA) | Đã có tổn thương tim thì không còn là tăng HA vô căn đơn thuần | Chỉ chọn `I11.0` hoặc `I11.9` |
| `I10` (Tăng HA vô căn) | `I12` (Bệnh thận do tăng HA) | Đã có tổn thương thận do HA | Chỉ chọn `I12.0` hoặc `I12.9` |
| `E10` (ĐTĐ Type 1) | `E11` (ĐTĐ Type 2) | Một bệnh nhân không thể đồng thời mắc cả hai thể ĐTĐ | Xác định chính xác thể bệnh |
| `J44` (COPD) | `J45` (Hen phế quản) | Hai bệnh lý đường thở riêng biệt | Nếu là hội chứng chồng lấp ACO: chọn mã chính `J44.8`, kèm `J45.9` |
| `N17` (Suy thận cấp) | `N18.5` (Suy thận mạn G5) | Khái niệm cấp tính mâu thuẫn với suy thận mạn giai đoạn cuối | Gán `N18.5` kèm mã đợt cấp suy thận mạn nếu có |

---

## 3. Nhóm Bẫy Lỗi Cận Lâm Sàng Đắt Tiền Không Khớp Mã ICD-10 (15 Lỗi)

Theo Thông tư 35/2016/TT-BYT và Thông tư 50/2017/TT-BYT, các kỹ thuật cận lâm sàng sau đây chỉ được BHYT thanh toán khi trong hồ sơ bệnh án có chẩn đoán mã ICD-10 tương ứng:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               MA TRẬN ĐỐI SOÁT CẬN LÂM SÀNG BHYT vs MÃ ICD-10 BẮT BUỘC                 │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Dịch Vụ Cận Lâm Sàng           │ Mã ICD-10 Bắt Buộc Phải Có Trong Hồ Sơ                │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 1. Xét nghiệm Troponin I / T   │ I20 (Đau thắt ngực), I21-I25 (Bệnh mạch vành)         │
│ 2. Xét nghiệm CK-MB            │ I20, I21-I25                                          │
│ 3. Định lượng NT-proBNP / BNP  │ I50 (Suy tim), N18 (Suy thận kèm quá tải dịch)        │
│ 4. Định lượng HbA1c            │ E10, E11, E12, E13, E14, O24 (Tối đa 1 lần/3 tháng)   │
│ 5. Đường máu mao mạch test     │ E10, E11, E16 (Hạ đường huyết), R73 (Tăng glucose máu)│
│ 6. Chụp CT Scanner 64-128 dãy  │ I63 (Đột quỵ), I71 (Phình bóc tách ĐMC), I25.1, C34   │
│ 7. Chụp Cộng hưởng từ (MRI)    │ I63, G35, M50, M51 (Thoát vị đĩa đệm), C71, M23       │
│ 8. Chụp PET/CT                 │ C11, C15, C16, C18, C34, C50, C81-C85, C90 (1 lần/năm)│
│ 9. Thận nhân tạo chu kỳ        │ N18.5 (Bắt buộc phải là Suy thận mạn giai đoạn 5)     │
│ 10. Đặt sonde bàng quang       │ R33 (Bí tiểu), N40, N17, N18                          │
│ 11. Định lượng CA 125          │ C56 (K Buồng trứng), D27, N80 (Lạc nội mạc tử cung)   │
│ 12. Định lượng CA 15-3         │ C50 (Ung thư Vú), D05, D24                            │
│ 13. Định lượng CA 19-9         │ C25 (Ung thư Tụy), C22.1 (Ung thư đường mật), C24     │
│ 14. Định lượng PSA toàn phần   │ C61 (K Tuyến tiền liệt), N40 (Phì đại tiền liệt tuyến)│
│ 15. Kỹ thuật tiêm khớp         │ M15, M16, M17, M05, M06 (Tối đa 3 đợt/năm)            │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

> [!WARNING] VÍ DỤ XUẤT TOÁN KINH ĐIỂN:
> Bệnh nhân vào viện vì hồi hộp đánh ngực, bác sĩ chỉ định làm men tim Troponin T và NT-proBNP. Tuy nhiên trong đơn chỉ ghi chẩn đoán `R00.0` (Nhịp tim nhanh). Kết quả: **Cơ quan BHXH xuất toán 100% tiền xét nghiệm Troponin T và NT-proBNP** vì mã `R00.0` không nằm trong danh mục chỉ định được thanh toán của Thông tư 35.

---

## 4. Nhóm Bẫy Lỗi Thuốc Điều Trị Có Điều Kiện Thanh Toán (15 Lỗi)

Theo Thông tư 30/2018/TT-BYT và Thông tư 20/2022/TT-BYT:

### 4.1. Kháng Sinh Nhóm Carbapenem (Meropenem, Imipenem, Ertapenem)
- **Điều kiện thanh toán:** BHYT thanh toán khi điều trị nhiễm trùng nặng do vi khuẩn đa kháng hoặc thất bại với các phác đồ kháng sinh ban đầu.
- **Mã ICD bắt buộc:** Phải có mã nhiễm trùng nặng như `A41` (Nhiễm khuẩn huyết), `J15` (Viêm phổi nặng), `K65` (Viêm phúc mạc), hoặc mã vi khuẩn kháng thuốc `U82–U85`.
- **Hồ sơ kèm theo:** Bắt buộc có kết quả cấy vi sinh / kháng sinh đồ hoặc Biên bản hội chẩn phê duyệt dùng kháng sinh dự trữ.

### 4.2. Thuốc Chống Đông Thế Hệ Mới (DOAC / NOAC: Rivaroxaban, Apixaban, Dabigatran)
- **Điều kiện thanh toán:** Chỉ thanh toán cho bệnh nhân Rung nhĩ không do van tim có điểm $\text{CHA}_2\text{DS}_2\text{-VASc} \ge 2$ (nam) hoặc $\ge 3$ (nữ), hoặc điều trị/dự phòng thuyên tắc huyết khối tĩnh mạch sâu (DVT / PE).
- **Mã ICD bắt buộc:** `I48` (Rung nhĩ), `I26` (Thuyên tắc phổi), `I80` (Viêm tĩnh mạch huyết khối). Nếu chỉ ghi tăng huyết áp `I10` mà kê NOAC sẽ bị xuất toán toàn bộ tiền thuốc.

### 4.3. Thuốc Ức Chế SGLT2 (Dapagliflozin, Empagliflozin)
- **Điều kiện thanh toán:** Thanh toán cho Đái tháo đường Type 2 (`E11`), Suy tim phân suất tống máu giảm (`I50`), hoặc Bệnh thận mạn (`N18.2 – N18.4`).
- **Mã ICD bắt buộc:** `E11` hoặc `I50` hoặc `N18`. Tuyệt đối không dùng cho ĐTĐ Type 1 (`E10`).

### 4.4. Thuốc Kích Thích Tạo Máu Erythropoietin (EPO)
- **Điều kiện thanh toán:** Bệnh nhân thiếu máu do suy thận mạn có mức lọc cầu thận eGFR $< 60$ và nồng độ Hemoglobin $< 10$ g/dL.
- **Mã ICD bắt buộc:** Bắt buộc phải có mã Bệnh thận mạn giai đoạn 3 đến 5 (`N18.3`, `N18.4`, `N18.5`) kèm mã thiếu máu `D63.8*`.

---

## 5. Bảng Kiểm 10 Bước Tự Rà Soát Hồ Sơ Trước Khi Đẩy Cổng Giám Định BHYT

Mỗi bác sĩ điều trị và nhân viên phòng Kế hoạch tổng hợp nên tuân thủ quy trình kiểm tra 10 điểm:

- [ ] **Bước 1 (Mã bệnh chính):** Mã bệnh chính có phải là bệnh tiêu tốn nhiều nguồn lực nhất trong đợt điều trị không? Có bị nhầm sang mã triệu chứng (R) không?
- [ ] **Bước 2 (Mã hoa thị):** Có mã biểu hiện nào mang dấu `*` đứng đơn độc làm bệnh chính không?
- [ ] **Bước 3 (Chấn thương):** Mọi ca chấn thương `S/T` đã có mã nguyên nhân ngoại lai `V/W/X/Y` chưa?
- [ ] **Bước 4 (Giới tính & Tuổi):** Đã rà soát không có mã sản/phụ khoa cho nam, không có mã nam khoa cho nữ, không có mã sơ sinh cho người lớn?
- [ ] **Bước 5 (Xung đột mã):** Đã loại bỏ các cặp mã loại trừ nhau (`I10` + `I11`, `E10` + `E11`)?
- [ ] **Bước 6 (Khớp Cận lâm sàng):** Các xét nghiệm đắt tiền (Troponin, NT-proBNP, HbA1c, MRI, CT 64 dãy) đã có mã ICD tương ứng theo Thông tư 35 & 50 chưa?
- [ ] **Bước 7 (Khớp Thuốc BHYT):** Các thuốc có điều kiện (Carbapenem, NOAC, SGLT2, Insulin, Albumin) đã có mã bệnh chỉ định và biên bản hội chẩn chưa?
- [ ] **Bước 8 (Sản khoa & Sơ sinh):** Đã tách biệt tuyệt đối hồ sơ mẹ (mã O + kết cục Z37) và hồ sơ con (mã P)?
- [ ] **Bước 9 (Độ dài điều trị):** Số ngày điều trị nội trú có phù hợp với mức độ nặng của mã bệnh chính không?
- [ ] **Bước 10 (Chữ ký & Thủ tục):** Bệnh án đã hoàn tất đủ chữ ký, mã chứng chỉ hành nghề của bác sĩ điều trị và trưởng khoa?
