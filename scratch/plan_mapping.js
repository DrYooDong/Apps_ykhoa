const fs = require('fs');

const items = JSON.parse(fs.readFileSync('scratch/guidelines_full_list.json', 'utf8'));

// Danh sách các conditionKey hiện tại + đề xuất mở rộng để bao phủ toàn bộ 115 guidelines:
/*
Kho Bệnh & Vấn đề lâm sàng (ICD-10 Mapped Conditions):
1. Tim mạch:
- heart-failure: Suy tim (I50, I50.1, I50.9)
- hypertension: Tăng huyết áp (I10, I11, I15)
- af: Rung nhĩ & Loạn nhịp tim (I48, I48.0, I49)
- cad: Bệnh động mạch vành & Hội chứng vành cấp (I25, I20, I21, I22)
- valvular-heart: Bệnh van tim (I34, I35, I05, I08)
- cardiogenic-shock: Sốc tim & Ngừng tuần hoàn (R57.0, I46, I46.9) [MỚI / TINH CHỈNH]
- syncope: Ngất & Tụt huyết áp tư thế (R55, I95.1) [MỚI]
- vte-pe: Huyết khối tĩnh mạch & Thuyên tắc phổi (I82, I26, I80)

2. Hô hấp & Hồi sức tích cực:
- copd: Bệnh phổi tắc nghẽn mạn tính (COPD) (J44, J44.0, J44.1, J44.9)
- asthma: Hen phế quản (Asthma) (J45, J45.0, J45.9)
- pneumonia: Viêm phổi mắc phải cộng đồng & Bệnh viện (CAP/HAP/VAP) (J18, J15, J13, J14, J18.9)
- interstitial-lung: Bệnh phổi mô kẽ & Xơ phổi (J84, J84.1, J84.9)
- tb: Lao phổi & Lao ngoài phổi (A15, A16, A19, A17)
- ards: Hội chứng suy hô hấp cấp tiến triển (ARDS) & Toan chuyển hóa ICU (J80, E87.2, R57.2) [MỚI / TINH CHỈNH]
- icu: Nhiễm trùng Hồi sức & Sốc nhiễm khuẩn (A41, A41.9, R65.2, R57.2)
- aki: Tổn thương thận cấp & Lọc máu liên tục CRRT (N17, N17.0, N17.9)

3. Nội tiết & Chuyển hóa & Dinh dưỡng:
- diabetes-t2d: Đái tháo đường Típ 2 (E11, E11.2, E11.9)
- diabetes-t1d: Đái tháo đường Típ 1 (E10, E10.9)
- thyroid: Bão giáp & Bệnh lý tuyến giáp (E05, E05.5, E03, E06)
- dyslipidemia: Rối loạn lipid máu & Xơ vữa động mạch (E78, E78.0, E78.2, E78.5)
- obesity: Béo phì & Hội chứng chuyển hóa (E66, E66.0, E66.9, E88.81)
- clinical-nutrition: Dinh dưỡng lâm sàng & Suy dinh dưỡng nặng (E46, E43, E44, E66) [MỚI / TINH CHỈNH]

4. Thận & Tiết niệu:
- ckd: Bệnh thận mạn & Bệnh thận đái tháo đường (N18, N18.3, N18.5, N18.9, E11.2)
- nephrotic: Hội chứng thận hư & Viêm cầu thận (N04, N00, N03)
- bph-luts: Tăng sinh lành tính tuyến tiền liệt & Rối loạn tiểu dưới (N40, N40.1, R39.1)
- uti: Nhiễm khuẩn tiết niệu & Viêm đài bể thận (N39.0, N10, N30)

5. Truyền nhiễm & Kháng kháng sinh:
- hepatitis-b: Viêm gan vi rút B (B18.0, B18.1, B16)
- hepatitis-c: Viêm gan vi rút C (B18.2, B17.1)
- flu: Cúm mùa & Nhiễm vi rút hô hấp (J09, J10, J11)
- covid19: COVID-19 (U07.1, U07.2)
- hemorrhagic-fever: Sốt xuất huyết Dengue & Sốt xuất huyết do vi rút (A90, A91, A98)
- measles: Sởi & Các bệnh ngoại ban vi rút (B05, B08)
- hfmd: Bệnh Tay chân miệng (B08.4)
- invasive-fungal: Nhiễm nấm xâm lấn & Aspergillus (B44, B49, B37.7, B45)
- malaria: Sốt rét (B50, B51, B52, B54)
- meningitis: Viêm màng não & Viêm não (G00, G01, G02, G03, A39)
- hiv-aids: Nhiễm HIV/AIDS & Nhiễm trùng cơ hội (B20, B24, Z21) [MỚI]
- diphtheria: Bệnh Bạch hầu & Nhiễm trùng độc tố (A36, A36.0, A36.9) [MỚI]
- ams-resistance: Quản lý kháng sinh & Vi khuẩn đa kháng thuốc (MRSA/CRE) (A49.02, U82, U83, Z16) [MỚI]

6. Tiêu hóa - Gan mật:
- cirrhosis: Xơ gan & Tăng áp lực tĩnh mạch cửa (K74, K70.3, I85)
- masld-mash: Bệnh gan thoái hóa mỡ (MASLD / MASH) (K76.0, K75.8)
- gerd-peptic: Loét dạ dày tá tràng & Trào ngược GERD (K21, K25, K26, K27)
- biliary-tract: Viêm túi mật & Viêm đường mật cấp (Tokyo TG18) (K81, K81.0, K80, K83.0) [MỚI]
- ibd: Viêm ruột mạn tính & Rối loạn chức năng ruột (IBS / IBD) (K50, K51, K58)
- ugib: Xuất huyết tiêu hóa trên (K92.2, K92.0, I85.0) [MỚI]

7. Thần kinh:
- stroke: Đột quỵ thiếu máu & Xuất huyết não (I63, I61, I64, G45)
- epilepsy: Động kinh & Co giật (G40, G40.9, R56)
- headache-migraine: Đau đầu & Migraine (G43, G44, G44.2)
- neuro-emergencies: Cấp cứu Thần kinh & Tụ máu ngoài màng cứng (S06, S06.4, I62) [MỚI]

8. Cơ xương khớp & Tự miễn:
- gout: Bệnh Gút & Tăng acid uric máu (M10, M10.0, E79.0)
- ra: Viêm khớp dạng thấp (M05, M06)
- osteoporosis: Loãng xương & Gãy xương bệnh lý (M81, M80)
- lupus-sle: Lupus ban đỏ hệ thống (SLE) (M32, M32.9)

9. Ung bướu & Huyết học & Mạch máu:
- solid-cancers: Ung thư các tạng & Chăm sóc giảm nhẹ ung bướu (C34, C22, C50, C18, Z51.5)
- hemangioma: U máu & Dị dạng mạch máu (D18, D18.0) [MỚI]
- uterine-fibroids: Bệnh lý Sản Phụ khoa & U xơ tử cung (D25, N80, N92, O14, O72)
*/

console.log('Total guidelines to map:', items.length);
