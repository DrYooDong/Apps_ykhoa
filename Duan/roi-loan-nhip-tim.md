---
title: Tiếp cận và Phân loại Rối loạn nhịp tim (ECG)
description: Sơ đồ thuật toán chẩn đoán phân biệt các rối loạn nhịp tim trên điện tâm đồ, bao gồm thuật toán Brugada, Block nhĩ thất và các ca hiếm.
category: approaches
tags: tim-mach, ecg, roi-loan-nhip, nhip-nhanh, nhip-cham
updatedAt: 2026-08-04
author: CliniPortal Team
---

# Hướng dẫn Phân tích Rối loạn nhịp trên ECG

Công cụ này hỗ trợ phân loại rối loạn nhịp tim theo dạng cây quyết định (Decision Tree), tập trung hoàn toàn vào việc nhận diện hình thái trên Điện tâm đồ 12 chuyển đạo.

## Các mốc đánh giá chính
1. **Tần số (Rate):** Ranh giới phân chia Nhịp chậm (<60 l/p) và Nhịp nhanh (>100 l/p).
2. **Hình thái QRS (QRS Complex):** Ranh giới 120ms (3 ô vuông nhỏ) để phân biệt nguồn gốc trên thất (SVT) hay tại thất (VT).
3. **Tính đều đặn (Regularity):** Khoảng R-R đều hay không đều để thu hẹp chẩn đoán.
4. **Mối quan hệ Nhĩ - Thất (P-QRS):** Cốt lõi trong chẩn đoán nhịp chậm và Block nhĩ thất.

## Nhóm Nhịp chậm (Bradyarrhythmia)
- Nhịp chậm xoang / Loạn nhịp xoang
- Block nhĩ thất độ 1, độ 2 (Mobitz I, Mobitz II), độ 3 (hoàn toàn)
- Suy nút xoang, Ngừng xoang
- Nhịp tự thất/tự nhĩ thoát

## Nhóm Nhịp nhanh (Tachyarrhythmia)
### QRS hẹp (<120ms)
- Đều: Nhịp nhanh xoang, AVNRT, AVRT, Cuồng nhĩ dẫn truyền cố định
- Không đều: Rung nhĩ, Cuồng nhĩ dẫn truyền thay đổi, Nhịp nhanh nhĩ đa ổ (MAT)

### QRS rộng (≥120ms)
- Nhịp nhanh thất (VT) — áp dụng Thuật toán Brugada
- SVT dẫn truyền lệch hướng
- Rung nhĩ kèm WPW / kèm block nhánh
- Xoắn đỉnh (Torsades de Pointes) — nhịp nhanh thất đa hình

## Các Ca Hiếm cần lưu ý (Red Flags trên ECG)
- Sóng Epsilon (V1-V3): Bệnh cơ tim thất phải gây loạn nhịp (ARVC)
- ST chênh vòm (V1-V3): Hội chứng Brugada
- Sóng Delta + PR ngắn: Hội chứng Wolff-Parkinson-White (WPW)
- QTc > 450ms hoặc < 340ms: Hội chứng QT dài/ngắn

*Sử dụng sơ đồ tương tác bên dưới để đi từng bước chẩn đoán phân biệt.*
