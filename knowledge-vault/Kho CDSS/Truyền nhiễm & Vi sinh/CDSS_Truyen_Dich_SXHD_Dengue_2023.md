---
title: "Hệ Thống CDSS Tính Toán Dịch Truyền & Chống Sốc SXHD Dengue (Bộ Y Tế 2023)"
aliases: ["CDSS Truyền dịch SXHD", "CDSS_DENGUE_FLUID", "Tính dịch sốt xuất huyết", "Phác đồ dịch truyền Dengue BYT 2023", "Bảng cọc dịch SXHD"]
keywords: ["CDSS", "SXHD", "Dengue", "truyền dịch", "chống sốc", "dịch tinh thể", "cao phân tử", "CDC 2014", "bảng cọc dịch", "QĐ 2760/QĐ-BYT"]
icd10: ["A97", "A97.0", "A97.1", "A97.2", "A97.9"]
specialty: "Truyền nhiễm & Vi sinh"
tags: ["CliniPortal", "CDSS", "KhoCDSS", "Truyền nhiễm & Vi sinh", "Hồi sức cấp cứu"]
type: "cdss"
context: "noi-tru"
readTime: "10-15 phút"
---

# Hệ Thống CDSS Tính Toán Dịch Truyền & Chống Sốc SXHD Dengue (Bộ Y Tế 2023)

> [!NOTE]
> **Chuyên khoa:** Truyền nhiễm & Vi sinh • Hồi sức Cấp cứu | **Mã ICD-10:** A97, A97.0, A97.1, A97.2, A97.9 | **Phân hệ:** Kho CDSS (Hệ Thống Hỗ Trợ Quyết Định Lâm Sàng) | **Căn cứ:** Quyết định số 2760/QĐ-BYT ngày 04/07/2023 của Bộ Y tế Việt Nam.

---

> [!TIP] ⚡ **TRẢI NGHIỆM CÔNG CỤ CDSS TƯƠNG TÁC TRỰC TIẾP TRÊN CLINIPORTAL**
> Bạn có thể mở và sử dụng ngay máy tính lâm sàng tự động tính cọc dịch SXHD Dengue với đầy đủ tính năng:
> - Tự động tra cứu cân nặng hiệu chỉnh CDC 2014 cho trẻ thừa cân / béo phì.
> - Lập bảng kế hoạch cọc dịch 4 cột chuẩn hóa (Mốc thời gian linh hoạt, Tốc độ & Thể tích gộp, Điều phối chai dịch, Tổng cọc).
> - Tính toán tự động liều pha vận mạch Dopamin / Noradrenalin bơm tiêm điện 50ml.
> 
> 🔗 **[Mở Ngay Công Cụ CDSS Tính Dịch Truyền SXHD Dengue](file:///d:/Apps_ykhoa/#/ebm/kho-guidelines/2023-byt-sot-xuat-huyet-dengue.mdx#sec-12)** *(hoặc click vào Mục 12 trong Cẩm nang EBM Guidelines)*

---

## 1. Mục Đích & Nguyên Tắc Vận Hành CDSS

Hệ thống Hỗ trợ Quyết định Lâm sàng (**CDSS - Clinical Decision Support System**) điều trị Sốt xuất huyết Dengue được xây dựng nhằm chuẩn hóa việc chỉ định, giám sát và điều phối dịch truyền chống sốc theo đúng khuyến cáo quốc gia mới nhất của Bộ Y tế:

1. **Cá thể hóa theo 3 đối tượng lâm sàng:**
   - **Người lớn (≥ 16 tuổi):** Diện tích da lớn, nguy cơ tái sốc hoặc biến chứng suy tạng nặng (suy gan, suy tim, xuất huyết tiêu hóa).
   - **Trẻ em (< 13 tuổi):** Nguy cơ quá tải dịch và phù phổi cấp rất cao nếu dùng cân nặng thực tế ở trẻ béo phì; bắt buộc hiệu chỉnh theo chuẩn CDC 2014.
   - **Trẻ thiếu niên (13–16 tuổi):** Giai đoạn chuyển tiếp sinh lý; phác đồ quy định **thời gian duy trì ở mỗi nấc tốc độ truyền chỉ bằng 1/2 so với trẻ em** để phòng ngừa biến chứng thừa dịch.

2. **Phân tầng chính xác theo 3 phân độ:**
   - **SXHD có dấu hiệu cảnh báo (DHCB):** Bù điện giải đẳng trương giảm dần theo bậc (6–7 → 5 → 3 → 1.5 ml/kg/h).
   - **Sốc SXHD (còn bù):** Giờ đầu bù nhanh 15–20 ml/kg/h, theo dõi sát động học Hct.
   - **Sốc SXHD nặng nguy kịch (Mạch = 0, HA = 0):** Bơm trực tiếp tĩnh mạch 15–20 ml/kg trong 15 phút, phối hợp sớm dịch cao phân tử (Dextran 40/70, HES 200).

---

## 2. Bảng Tra Cứu Cân Nặng Hiệu Chỉnh Ở Trẻ Béo Phì (CDC 2014 / Phụ lục 9 BYT)

> [!WARNING]
> Nếu cân nặng thực tế của trẻ vượt quá **120% cân nặng chuẩn theo lứa tuổi**, CDSS tự động kích hoạt cảnh báo quá tải tuần hoàn và áp dụng **Cân nặng hiệu chỉnh CDC 2014** để tính toán thể tích dịch truyền:

| Tuổi (Năm) | Cân Nặng Chuẩn Bé Nam (kg) | Cân Nặng Chuẩn Bé Nữ (kg) |
| :---: | :---: | :---: |
| **2 tuổi** | 13 kg | 12 kg |
| **3 tuổi** | 14 kg | 14 kg |
| **4 tuổi** | 16 kg | 16 kg |
| **5 tuổi** | 18 kg | 18 kg |
| **6 tuổi** | 21 kg | 20 kg |
| **7 tuổi** | 23 kg | 23 kg |
| **8 tuổi** | 26 kg | 26 kg |
| **9 tuổi** | 29 kg | 29 kg |
| **10 tuổi** | 32 kg | 33 kg |
| **11 tuổi** | 36 kg | 37 kg |
| **12 tuổi** | 40 kg | 42 kg |
| **13 tuổi** | 45 kg | 46 kg |
| **14 tuổi** | 51 kg | 49 kg |
| **15 tuổi** | 56 kg | 52 kg |
| **16 tuổi** | 61 kg | 54 kg |

---

## 3. Quy Chuẩn Bảng Kế Hoạch Cọc Dịch 4 Cột Mới (Logistics Schedule)

Bảng điều phối chai dịch tại cọc đã được tinh gọn và chuẩn hóa tối ưu theo 4 cột thông tin:

1. **Mốc Thời Gian & Thời Lượng:**
   - Hiển thị khoảng giờ bắt đầu và kết thúc cụ thể của từng cữ.
   - Tích hợp dropdown lựa chọn số giờ linh hoạt đối với các cữ có biên độ thời gian theo BYT (như bậc 5–7h, 1–2h, 2–4h, 6–18h). Khi điều dưỡng / bác sĩ thay đổi số giờ, toàn bộ các mốc giờ và lượng dịch tiếp theo tự động nhảy liên hoàn.
2. **Tốc Độ & Lượng Dịch Cần Truyền:**
   - Gộp tốc độ truyền (ml/kg/h), số giọt/phút và tổng thể tích dịch (ml) cần truyền trong cữ đó kèm phép tính minh bạch `(Tốc độ giờ × Số giờ)`.
3. **Dịch Có Sẵn / Treo Thêm Chai Mới:**
   - Thể hiện rõ lượng dịch dư chuyển tiếp từ cữ trước và số lượng chai mới (loại 500ml hoặc 250ml) cần lấy thêm tại tủ thuốc.
4. **Tổng Dịch Chuẩn Bị Tại Cọc:**
   - Tổng thể tích dịch hiện có treo trên cọc truyền để giám sát an toàn người bệnh.

---

## 4. Công Thức Pha Thuốc Vận Mạch Bơm Tiêm Điện 50ml (Khi Sốc Trơ Dịch)

Chỉ định khi đã bù đủ thể tích nội mạch (hoặc CVP > 10 cmH₂O) mà huyết áp vẫn chưa đạt mục tiêu:

### 1. Dopamin (Lựa chọn đầu tay ở trẻ em)
- **Công thức tính nhanh:**
  $$\text{Tổng liều Dopamin (mg)} = 3 \times \text{Cân nặng hiệu chỉnh (kg)}$$
- Pha trong Glucose 5% hoặc NaCl 0.9% vừa đủ **50 ml**.
- Khi đó: **Tốc độ bơm tiêm điện 1 ml/giờ = liều 1 µg/kg/phút**.
- Liều khởi đầu thông thường: 5–10 µg/kg/phút (tương ứng 5–10 ml/giờ trên bơm tiêm điện).

### 2. Noradrenalin (Lựa chọn đầu tay khi sốc giãn mạch / huyết áp tâm trương tụt sâu)
- **Công thức tính nhanh:**
  $$\text{Tổng liều Noradrenalin (mg)} = 0.3 \times \text{Cân nặng hiệu chỉnh (kg)}$$
- Pha trong Glucose 5% vừa đủ **50 ml**.
- Khi đó: **Tốc độ bơm tiêm điện 1 ml/giờ = liều 0.1 µg/kg/phút**.

---

## 5. Quy Trình Điều Dưỡng An Toàn (HKKK)
- **Đo Hct & Sinh hiệu:** Kiểm tra mạch, HA, Hct trước mỗi lần giảm tốc độ truyền dịch hoặc khi người bệnh có biểu hiện bứt rứt, vã mồ hôi, chi lạnh.
- **Theo dõi lượng nước tiểu:** Đặt sonde tiểu theo dõi mỗi giờ ở bệnh nhân sốc; đảm bảo duy trì lượng nước tiểu $\ge 0.5 - 1.0\text{ ml/kg/giờ}$. Báo bác sĩ ngay nếu nước tiểu $< 0.5\text{ ml/kg/h}$.
- **Bàn giao ca trực:** Sử dụng nút **"Sao Chép Bảng Bàn Giao Cữ"** trên giao diện CDSS để copy nhanh bảng theo dõi 4 cột dán vào sổ giao ban hoặc tin nhắn ca trực.
