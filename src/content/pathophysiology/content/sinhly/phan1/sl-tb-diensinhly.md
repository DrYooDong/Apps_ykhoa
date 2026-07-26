---
id: SL_TB_Diensinhly
title: Điện sinh lý Tế bào & Điện thế Hoạt động
category: Phần 1: Đại cương Tế bào & Điện sinh lý
author: DrYooDong / CliniPortal Medical Editorial
difficulty: Nâng cao
read_time: 25 phút
tags: [Điện sinh lý, Nernst, Action Potential, Ion Channel, Sodium Potassium Pump]
has_interactive_diagram: true
formulas: [nernst_eq, goldman_eq]
---

# ⚡ Điện sinh lý Tế bào & Điện thế Hoạt động

Mọi tế bào sống trong cơ thể người đều duy trì một **điện thế màng nghỉ** (Resting Membrane Potential) âm so với bên ngoài màng. Sự chênh lệch điện thế này là nền tảng cho sự dẫn truyền xung thần kinh, co cơ tim, co cơ vân và sự tiết hormone của các tế bào nội tiết.

---

## 🔑 1. Cơ sở Ion của Điện thế Màng nghỉ

Điện thế màng nghỉ xuất hiện do hai yếu tố chính:
1. **Sự phân bố bất cân bằng của các ion qua màng tế bào**: Nồng độ $[Na^+]$ và $[Cl^-]$ ở ngoại bào cao hơn nội bào, trong khi nồng độ $[K^+]$ ở nội bào cao hơn nhiều so với ngoại bào.
2. **Độ thấm chọn lọc của màng ở trạng thái nghỉ**: Ở trạng thái nghỉ, màng tế bào thấm đối với $K^+$ cao hơn $Na^+$ khoảng **25 đến 30 lần** nhờ các kênh $K^+$ rò rỉ (Leak Channels).

:::clinical-pearl
💎 **Clinical Pearl**: Bơm $Na^+-K^+-ATPase$ hoạt động liên tục chủ động bơm $3\text{ Na}^+$ ra ngoài và $2\text{ K}^+$ vào trong, tiêu tốn $30\%$ năng lượng ATP của tế bào để duy trì độ chênh nồng độ ion này.
:::

---

## 📐 2. Các Phương trình Định lượng Điện sinh lý

### 2.1 Phương trình Nernst

Phương trình Nernst cho phép tính toán **điện thế cân bằng** ($E_{ion}$) của một loại ion duy nhất khi lực khuếch tán do chênh lệch nồng độ cân bằng hoàn toàn với lực điện trường:

$$E_{ion} = \frac{61.5}{z} \log_{10} \left( \frac{[Ion]_{out}}{[Ion]_{in}} \right)$$

:::formula-card
📐 **Ví dụ Nernst cho Ion Potassium ($K^+$)**:
- $[K^+]_{out} = 4.5\text{ mmol/L}$
- $[K^+]_{in} = 140\text{ mmol/L}$
- $E_K = 61.5 \times \log_{10}(4.5 / 140) \approx -91.4\text{ mV}$
:::

### 2.2 Phương trình Goldman-Hodgkin-Katz (GHK)

Khi màng tế bào thấm đối với nhiều ion cùng lúc, điện thế màng thực tế ($V_m$) được xác định bởi phương trình GHK:

$$V_m = 61.5 \log_{10} \left( \frac{P_K [K^+]_o + P_{Na} [Na^+]_o + P_{Cl} [Cl^-]_i}{P_K [K^+]_i + P_{Na} [Na^+]_i + P_{Cl} [Cl^-]_o} \right)$$

---

## 🔄 3. Diễn tiến Các Pha của Điện thế Hoạt động

Điện thế hoạt động (Action Potential) là sự biến đổi điện thế màng nhanh, đột ngột và lan truyền khi tế bào cơ hoặc thần kinh bị kích thích đạt **ngưỡng (-55 mV)**.

:::physio-steps
1. **Pha 0 - Khử cực Nhanh (Rapid Depolarization)**
   Mở kênh $Na^+$ phụ thuộc điện thế (Voltage-gated $Na^+$ channels). $Na^+$ tràn ào ạt vào nội bào khiến điện thế màng vọt từ $-70\text{ mV}$ lên $+30\text{ mV}$.
2. **Pha 1 - Tái cực Sớm (Early Repolarization)**
   Kênh $Na^+$ nhanh đóng lại (bất hoạt), dòng $K^+$ thoáng qua ($I_{to}$) đi ra ngoài làm điện thế hạ nhẹ.
3. **Pha 2 - Cao nguyên (Plateau - đặc trưng ở cơ tim)**
   Mở kênh $Ca^{2+}$ L-type. Dòng $Ca^{2+}$ đi vào nội bào cân bằng với dòng $K^+$ đi ra, kéo dài thời gian co cơ và chống loạn nhịp.
4. **Pha 3 - Tái cực Nhanh (Rapid Repolarization)**
   Kênh $Ca^{2+}$ đóng, các kênh $K^+$ mở rộng. $K^+$ thoát ra ngoài đưa điện thế màng trở về mức âm ban đầu.
5. **Pha 4 - Phục hồi Nồng độ Ion**
   Bơm $Na^+-K^+-ATPase$ bơm trả $Na^+$ ra ngoài và $K^+$ vào trong để sẵn sàng cho chu kỳ mới.
:::

---

## 📊 4. Bảng So sánh Thuộc tính Kênh Ion

| Kênh Ion | Trạng thái Nghỉ | Trạng thái Kích thích | Chất ức chế Đặc hiệu |
|---|---|---|---|
| **Kênh $Na^+$ phụ thuộc điện thế** | Đóng (Cổng bất hoạt mở) | Mở cực nhanh khi đạt $-55\text{ mV}$ | Tetrodotoxin (TTX) |
| **Kênh $K^+$ rò rỉ (Leak)** | Mở liên tục | Duy trì ổn định | Ba2+, Cesium |
| **Kênh $Ca^{2+}$ L-type** | Đóng | Mở ở pha cao nguyên điện thế cơ tim | Verapamil, Diltiazem |
| **Bơm $Na^+-K^+-ATPase$** | Hoạt động $24/7$ | Tăng tốc khi $[Na^+]_i$ tăng | Ouabain, Digoxin |

---

## 💎 5. Ứng dụng Lâm sàng & Y học Chứng cứ

- **Ngộ độc Digoxin**: Digoxin ức chế bơm $Na^+-K^+-ATPase$, làm tăng $[Na^+]_i$, gián tiếp tăng $[Ca^{2+}]_i$ qua trao đổi $NCX$, tăng sức co bóp cơ tim nhưng dễ gây loạn nhịp do hạ $K^+$ máu.
- **Hạ Potassium Máu ($K^+ < 3.5\text{ mmol/L}$)**: Làm $E_K$ trở nên âm hơn (Hyperpolarization), khiến cơ tim và cơ vân khó đạt ngưỡng kích thích, gây yếu cơ và sóng U trên ECG.
- **Tăng Potassium Máu ($K^+ > 5.5\text{ mmol/L}$)**: Làm điện thế nghỉ bớt âm hơn, bất hoạt kênh $Na^+$ nhanh, dẫn tới ngừng tim ở thì tâm trương và sóng T cao nhọn.
