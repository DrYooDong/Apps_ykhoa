---
title: "MOC - Kho ICD-10 (Phân Loại Bệnh Tật Quốc Tế & Thẩm Định BHYT)"
type: moc
specialty: "Mã hóa bệnh & BHYT"
kho: "Kho ICD-10"
tags:
  - y-khoa/icd10
  - loai/moc
  - loai/icd10
  - he-co-quan/tong-quat
updated: "2026-09-07"
aliases:
  - "MOC Kho ICD-10"
  - "Master MOC ICD-10"
  - "Bản đồ Kho ICD-10"
keywords:
  - "icd-10"
  - "moc icd-10"
  - "mã hóa bệnh"
  - "thẩm định bhyt"
  - "bộ y tế"
  - "who"
readTime: "6-8 phút"
---

# 🏷️ MOC - Kho ICD-10 (Phân Loại Bệnh Tật Quốc Tế & Thẩm Định BHYT)

> Cổng kết nối, điều hướng và quản trị tri thức cho toàn bộ hệ thống **Phân loại Quốc tế về Bệnh tật và các Vấn đề Sức khỏe Liên quan (ICD-10)** tại CliniPortal. Tích hợp chuẩn hóa theo **Quyết định 1849/QĐ-BYT**, **Thông tư 06/2026/TT-BYT**, cùng quy chuẩn giám định Bảo hiểm Y tế (BHYT) của Bộ Y tế và Bảo hiểm Xã hội Việt Nam.

---

> [!TIP] ⚡ **TRÌNH TRA CỨU MÃ BỆNH ICD-10 & THẨM ĐỊNH BHYT SIÊU TỐC (OFFLINE 100%)**
> CliniPortal cung cấp công cụ Web App chuyên dụng với kho dữ liệu **15.844 mã bệnh chi tiết**, thuật toán tìm kiếm tức thì theo triệu chứng / tiếng Việt không dấu, bộ lọc mã bệnh chính vs bệnh kèm theo, và module tự động phát hiện nguy cơ xuất toán BHYT:
> 🔗 **[Mở Công Cụ Tra Cứu Mã ICD-10 & Thẩm Định BHYT](file:///d:/Apps_ykhoa/src/content/knowledge-vault/tools/icd10/index.html)** *(Truy cập trực tiếp trên trình duyệt Web)*

---

## 🏛️ Bản Đồ Cấu Trúc Kho ICD-10 (4 Trụ Cột Tri Thức)

```
                       ┌────────────────────────────────────────────────────────┐
                       │               MOC - KHO ICD-10 MASTER                  │
                       └──────────────────────────┬─────────────────────────────┘
                                                  │
         ┌───────────────────────┬────────────────┴────────────────┬────────────────────────┐
         ▼                       ▼                                 ▼                        ▼
┌──────────────────┐   ┌──────────────────┐             ┌─────────────────────┐   ┌──────────────────┐
│  1. PHÁP QUY &   │   │  2. QUY TẮC MÃ   │             │   3. DANH MỤC THỰC  │   │  4. BHYT AUDIT & │
│  HỆ THỐNG 22 CHƯƠNG│ │    CHUYÊN KHOA   │             │    HÀNH LÂM SÀNG    │   │  LỘ TRÌNH ICD-11 │
└──────────────────┘   └──────────────────┘             └─────────────────────┘   └──────────────────┘
```

---

## 📚 1. Nền Tảng Pháp Lý & Danh Mục 22 Chương Mã Bệnh

Nắm vững cơ sở pháp lý, cấu trúc phân cấp từ chương đến nhóm mã 3–5 ký tự và phương pháp mã hóa kép theo chuẩn quốc tế:

- [[ICD10_Bang_Phan_Loai_22_Chuong_Quoc_Te|ICD-10: Bảng Phân Loại 22 Chương Bệnh Quốc Tế (WHO & Bộ Y Tế)]]
  *Bảng tổng hợp từ Chương I (A00–B99) đến Chương XXII (U00–U99), phân định các chương đặc biệt (chấn thương, triệu chứng, mã dùng cho mục đích nghiên cứu).*
- [[ICD10_Quy_Tac_Ma_Hoa_Benh_Chinh_Va_Kem_Theo|Hướng Dẫn Quy Tắc Mã Hóa Bệnh Chính & Bệnh Kèm Theo (QĐ 1849/QĐ-BYT)]]
  *Định nghĩa bệnh chính (Principal Diagnosis), bệnh kèm theo, và nguyên tắc vàng về hệ thống mã kép Dấu chữ thập (†) & Dấu hoa thị (\*).*
- [[ICD10_Tra_Cuu_Ma_Benh_Va_Tham_Dinh_BHYT|Giới Thiệu Công Cụ Tra Cứu Mã Bệnh ICD-10 & Thẩm Định Hồ Sơ BHYT (TT06/2026)]]
  *Tổng quan tính năng tra cứu 15.844 mã bệnh, sao chép chuẩn HIS (VNPT, Viettel, FPT), và cơ chế thẩm định cảnh báo sớm.*

---

## 🩺 2. Hướng Dẫn Quy Tắc Mã Hóa Chuyên Khoa Phức Tạp

Các nhóm bệnh lý có quy tắc mã hóa đặc biệt, thường xuyên bị nhầm lẫn hoặc thiếu sót trong hồ sơ bệnh án:

- [[ICD10_Quy_Tac_Ma_Hoa_Chan_Thuong_Ngo_Doc|Quy Tắc Mã Hóa Chấn Thương, Vết Thương & Ngộ Độc (Chương XIX & XX)]]
  *Nguyên tắc mã kép bắt buộc: Mã tổn thương giải phẫu (S00–T98) + Mã nguyên nhân ngoại lai (V01–Y98: TNGT, tai nạn lao động, sinh hoạt); Phân biệt ngộ độc vs phản ứng có hại của thuốc (ADR - T88.7).*
- [[ICD10_Quy_Tac_Ma_Hoa_San_Khoa_Va_Chu_Sinh|Quy Tắc Mã Hóa Sản Phụ Khoa & Thời Kỳ Chu Sinh (Chương XV & XVI)]]
  *Nguyên tắc phân định rạch ròi hồ sơ Mẹ (O00–O99) vs hồ sơ Con (P00–P96); Mã hóa tuần thai, phương thức đẻ (O80–O84), kết cục sinh (Z37), và các bệnh lý sơ sinh đặc thù.*
- [[ICD10_Quy_Tac_Ma_Hoa_Bien_Chung_Phau_Thuat_Thu_Thuat|Quy Tắc Mã Hóa Biến Chứng Phẫu Thuật, Thủ Thuật & Can Thiệp Y Khoa (T80–T88)]]
  *Phân định biến chứng thủ thuật (Complication) vs Diễn tiến tự nhiên của bệnh nền; Mã hóa nhiễm trùng vết mổ (T81.4), sốc phản vệ sau dùng thuốc/gây mê (T88.2, T88.6), và đồng bộ hồ sơ phẫu thuật.*

---

## 📋 3. Danh Mục Mã Bệnh Thực Hành Lâm Sàng (Pocket Guides)

Cẩm nang tra cứu nhanh các mã ICD-10 thường dùng nhất trên lâm sàng nội trú và quản lý kê đơn ngoại trú:

- [[ICD10_Danh_Muc_Ma_Benh_Noi_Khoa_Thuong_Gap|Cẩm Nang Mã ICD-10 Các Bệnh Mạn Tính Thường Gặp (Nội Khoa Ngoại Trú & Nội Trú)]]
  *Bảng mã chi tiết: Tăng huyết áp (I10–I15), Đái tháo đường Type 1 & 2 với phân loại số thứ 4 (E10–E14: thận, mắt, thần kinh, bàn chân), Bệnh tim thiếu máu cục bộ (I20, I25), Suy tim (I50), COPD (J44), Hen phế quản (J45), Bệnh thận mạn (N18.1–N18.5, N18.9), Xơ gan (K74).*
- [[ICD10_Danh_Muc_Ma_Benh_Truyen_Nhiem_Va_Cap_Cuu|Cẩm Nang Mã ICD-10 Bệnh Truyền Nhiễm, Cấp Cứu & Hồi Sức Tích Cực (ICU)]]
  *Bảng mã chuẩn hóa: Sepsis & Sốc nhiễm khuẩn (A41 + R57.2 + R65.1), Sốt xuất huyết Dengue (A90, A91), Đột quỵ cấp (I63, I61, G45), Hội chứng vành cấp (I21), Mã vi khuẩn kháng thuốc (U82–U85), COVID-19 & Hậu COVID-19 (U07.1, U07.2, U09).*

---

## 🛡️ 4. Giám Định BHYT, Phòng Chống Xuất Toán & Lộ Trình Tương Lai

Các công cụ nghiệp vụ bảo vệ hồ sơ bệnh viện và định hướng phát triển chuẩn hóa dữ liệu:

- [[ICD10_So_Tay_Chong_Xuat_Toan_BHYT_Va_Bay_Loi|Sổ Tay 50+ Bẫy Lỗi Giám Định BHYT & Giải Pháp Phòng Ngừa Xuất Toán]]
  *Ma trận 50+ cặp mã xung đột; Điều kiện thanh toán cận lâm sàng đắt tiền (HbA1c, Troponin, NT-proBNP, CT 64 dãy, MRI, PET/CT theo TT 35 & 50); Quy định thanh toán thuốc bảo hiểm (TT 30/2018); Bảng kiểm 10 bước tự rà soát hồ sơ trước khi đẩy cổng BHYT.*
- [[ICD10_Lo_Trinh_Va_So_Sanh_Chuyen_Doi_ICD11|Lộ Trình & So Sánh Chuyển Đổi ICD-10 Sang ICD-11 (WHO & Định Hướng Bộ Y Tế)]]
  *Kiến trúc mã hóa mới của ICD-11 (Mã gốc Stem codes + Mã mở rộng Extension codes - cơ chế Post-coordination); Bổ sung Y học cổ truyền (Chương 26), An toàn người bệnh (Chương 23); Kế hoạch chuyển đổi hệ thống HIS/EMR bệnh viện.*

---

## 🔗 Liên Kết Hệ Thống
- 🏠 **Trở về Master MOC:** [[MOC - Kho Kiến Thức Y Khoa| Master MOC — Kho Kiến Thức Y Khoa CliniPortal]]
- 📊 **Kho liên quan:**
  - [[3.1. Kho công cụ & thang điểm/MOC - Kho Công Cụ & Thang Điểm| Kho Công Cụ & Thang Điểm Lâm Sàng]]
  - [[Kho CDSS/MOC - Kho CDSS| Kho Hỗ Trợ Quyết Định Lâm Sàng (CDSS)]]
  - [[Kho nghiên cứu khoa học & EBM/MOC - Kho Nghiên Cứu Khoa Học & EBM| Kho Nghiên Cứu Khoa Học & EBM]]
