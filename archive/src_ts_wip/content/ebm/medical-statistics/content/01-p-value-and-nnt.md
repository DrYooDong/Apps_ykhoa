---
title: "Bài 1: P-value, ARR, RRR và NNT trong Thực hành Lâm sàng"
author: "Ban Biên Tập CliniPortal EBM"
category: "Medical Statistics"
level: "Basic to Intermediate"
---

# Hướng dẫn Thống kê Y học: P-value và NNT

## 1. P-value là gì?
P-value (giá trị p) phản ánh xác suất thu được kết quả như quan sát (hoặc cực đoan hơn) nếu **Giả thuyết Không (Null Hypothesis - $H_0$)** là đúng.

> **Lưu ý quan trọng:** P-value KHÔNG đo lường độ lớn của hiệu quả lâm sàng! Một thử nghiệm có cỡ mẫu cực lớn có thể đạt p < 0.001 nhưng mức giảm nguy cơ thực tế chỉ là 0.1%.

## 2. Các Chỉ số Nguy cơ Trong Thử nghiệm Lâm sàng

### Giảm Nguy cơ Tuyệt đối (Absolute Risk Reduction - ARR)
$$\text{ARR} = \text{CER} - \text{EER}$$
*Trong đó: CER là Tỷ lệ biến cố nhóm chứng, EER là Tỷ lệ biến cố nhóm can thiệp.*

### Giảm Nguy cơ Tương đối (Relative Risk Reduction - RRR)
$$\text{RRR} = \frac{\text{CER} - \text{EER}}{\text{CER}} = \frac{\text{ARR}}{\text{CER}}$$

### Số Bệnh nhân Cần Điều trị (Number Needed to Treat - NNT)
$$\text{NNT} = \frac{1}{\text{ARR}}$$

> **Ví dụ Lâm sàng:**
> Nếu nhóm chứng có tỷ lệ tử vong CER = 20% (0.20) và nhóm dùng thuốc mới có tỷ lệ tử vong EER = 15% (0.15):
> - $\text{ARR} = 20\% - 15\% = 5\%$ ($0.05$)
> - $\text{RRR} = \frac{5\%}{20\%} = 25\%$
> - $\text{NNT} = \frac{1}{0.05} = 20$ (Cần điều trị 20 bệnh nhân trong cùng khoảng thời gian để ngăn chặn 1 ca tử vong).
