
Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐢𝐞̣̂𝐮 𝐪𝐮𝐚̉ 𝐡𝐚̣ 𝐂𝐡𝐨𝐥𝐞𝐬𝐭𝐞𝐫𝐨𝐥 𝐜𝐮̉𝐚 𝐀𝐭𝐨𝐫𝐯𝐚𝐬𝐭𝐚𝐭𝐢𝐧 𝐛𝐚̆̀𝐧𝐠 𝐩𝐡𝐮̛𝐨̛𝐧𝐠 𝐩𝐡𝐚́𝐩 𝐩𝐡𝐚̂𝐧 𝐭𝐢́𝐜𝐡 𝐩𝐡𝐮̛𝐨̛𝐧𝐠 𝐬𝐚𝐢 𝐜𝐨́ 𝐥𝐚̣̆𝐩 (𝐑𝐞𝐩𝐞𝐚𝐭𝐞𝐝 𝐀𝐧𝐨𝐯𝐚)

TS. Đào Hồng Nam

Khi đánh giá hiệu quả hạ Cholesterol của Atorvastatin theo thời gian (T₀, T₁, T₃), làm sao để biết chỉ số giảm là do thuốc chứ không phải do nhiễu cơ địa? Infographic này sẽ hướng dẫn các bạn làm chủ các bước đọc kết quả phân tích (bằng phần mềm JASP):

- Bóc tách nhiễu cơ địa: Cách JASP tự động cô lập sự khác biệt giữa các bệnh nhân ở bảng Between Subjects Effects để làm sạch mô hình.

- Đọc biểu đồ xu hướng: Phân tích nhanh hướng giảm cholesterol qua bảng Descriptives và biểu đồ Bar plots.

- Kiểm định giả định: Cách đọc Mauchly's Test of Sphericity và dùng hiệu chỉnh Greenhouse-Geisser khi dữ liệu vi phạm.

𝐆𝐢𝐚̉𝐢 𝐭𝐡𝐢́𝐜𝐡 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 𝐤𝐞̂́𝐭 𝐪𝐮𝐚̉ 𝐩𝐡𝐚̂𝐧 𝐭𝐢́𝐜𝐡 𝐬𝐮̛̣ 𝐤𝐡𝐚́𝐜 𝐛𝐢𝐞̣̂𝐭 𝐧𝐨̂̀𝐧𝐠 đ𝐨̣̂ 𝐜𝐡𝐨𝐥𝐞𝐬𝐭𝐞𝐫𝐨𝐥 𝐭𝐨𝐚̀𝐧 𝐩𝐡𝐚̂̀𝐧 𝐠𝐢𝐮̛̃𝐚 𝐛𝐚 𝐧𝐡𝐨́𝐦 đ𝐨̂́𝐢 𝐭𝐮̛𝐨̛̣𝐧𝐠 𝐛𝐚̆̀𝐧𝐠 𝐀𝐍𝐎𝐕𝐀 𝐦𝐨̣̂𝐭 𝐲𝐞̂́𝐮 𝐭𝐨̂́

TS. Đào Hồng Nam

Một nghiên cứu lâm sàng được tiến hành nhằm đánh giá mối liên quan giữa tình trạng rối loạn chuyển hóa carbohydrate và nồng độ lipid máu. Nồng độ cholesterol toàn phần (mg/dL) được đo trên ba nhóm đối tượng gồm: nhóm 1 - người khỏe mạnh, nhóm 2 - người tiền đái tháo đường và nhóm 3 - bệnh nhân đái tháo đường týp 2.

𝐁𝐚̉𝐧𝐠 1 trình bày dữ liệu gốc của 82 đối tượng nghiên cứu, bao gồm biến định lượng là nồng độ cholesterol toàn phần (chol) và biến phân nhóm (nhom) gồm 3 mức: người khỏe mạnh, người tiền đái tháo đường và bệnh nhân đái tháo đường týp 2.

𝐁𝐚̉𝐧𝐠 2. Kiểm định phân phối chuẩn bằng Shapiro–Wilk

Trước khi thực hiện ANOVA, giả định phân phối chuẩn được kiểm tra cho từng nhóm bằng kiểm định Shapiro–Wilk. Vì cả 3 nhóm đều có p > 0,05 nên không có đủ bằng chứng để bác bỏ giả thuyết dữ liệu có phân phối chuẩn.

𝐊𝐞̂́𝐭 𝐥𝐮𝐚̣̂𝐧: nồng độ cholesterol toàn phần ở cả ba nhóm đều tuân theo phân phối chuẩn, đáp ứng giả định thứ nhất của ANOVA.

𝐁𝐚̉𝐧𝐠 3. Kiểm định đồng nhất phương sai

Giả định đồng nhất phương sai được đánh giá bằng kiểm định Levene/Brown–Forsythe. Kết quả cho thấy các kiểm định W0, W10 và W50 đều có giá trị p > 0,05, nghĩa là phương sai của nồng độ cholesterol toàn phần giữa ba nhóm không khác biệt có ý nghĩa thống kê.

Như vậy, giả định đồng nhất phương sai được thỏa mãn và dữ liệu phù hợp để thực hiện ANOVA một yếu tố.

𝐁𝐚̉𝐧𝐠 4. Kết quả phân tích phương sai một yếu tố (One-way ANOVA)

Sau khi các giả định được đáp ứng, phân tích ANOVA một yếu tố được thực hiện để so sánh nồng độ cholesterol toàn phần trung bình giữa ba nhóm đối tượng.

Kết quả: Có sự khác biệt có ý nghĩa thống kê về nồng độ cholesterol toàn phần giữa ba nhóm (F(2,79) = 3,68; p = 0,0295); nghĩa là ít nhất một nhóm có giá trị trung bình khác biệt so với các nhóm còn lại.

𝐁𝐢𝐞̂̉𝐮 đ𝐨̂̀ 1. Giá trị trung bình cholesterol toàn phần theo nhóm

𝐁𝐢𝐞̂̉𝐮 đ𝐨̂̀ khoảng tin cậy của giá trị trung bình thể hiện nồng độ cholesterol toàn phần có xu hướng tăng dần từ nhóm người khỏe mạnh đến nhóm tiền đái tháo đường và cao nhất ở nhóm bệnh nhân đái tháo đường týp 2. Xu hướng này gợi ý mối liên quan giữa mức độ rối loạn chuyển hóa carbohydrate và sự gia tăng nồng độ cholesterol toàn phần.

𝐁𝐚̉𝐧𝐠 5. Kết quả hậu kiểm Bonferroni

Do kết quả ANOVA có ý nghĩa thống kê, phân tích hậu kiểm Bonferroni được thực hiện để xác định cặp nhóm có sự khác biệt.

𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉:

• Không có sự khác biệt có ý nghĩa thống kê giữa nhóm người khỏe mạnh và nhóm tiền đái tháo đường (p = 0,734).

• Không có sự khác biệt có ý nghĩa thống kê giữa nhóm tiền đái tháo đường và nhóm bệnh nhân đái tháo đường týp 2 (p = 0,062).

• Nhóm bệnh nhân đái tháo đường týp 2 có nồng độ cholesterol toàn phần trung bình cao hơn có ý nghĩa thống kê so với nhóm người khỏe mạnh, với chênh lệch trung bình 18,32 mg/dL (p = 0,026).

𝐁𝐚̉𝐧𝐠 6. Thống kê mô tả theo nhóm

Kết quả thống kê mô tả thể hiện nồng độ cholesterol toàn phần trung bình ở nhóm người khỏe mạnh là 194,6 ± 25,4 mg/dL, ở nhóm tiền đái tháo đường là 198,4 ± 20,9 mg/dL và ở nhóm bệnh nhân đái tháo đường týp 2 là 212,9 ± 23,2 mg/dL.

Trong ba nhóm nghiên cứu, nhóm bệnh nhân đái tháo đường týp 2 có giá trị cholesterol toàn phần trung bình cao nhất, trong khi nhóm người khỏe mạnh có giá trị thấp nhất.

𝐊𝐞̂́𝐭 𝐥𝐮𝐚̣̂𝐧:

Các giả định về phân phối chuẩn và đồng nhất phương sai đều được đáp ứng, do đó việc sử dụng ANOVA một yếu tố là phù hợp. Kết quả phân tích cho thấy nồng độ cholesterol toàn phần khác biệt có ý nghĩa thống kê giữa ba nhóm đối tượng (F(2,79) = 3,68; p = 0,0295). Phân tích hậu kiểm Bonferroni xác định sự khác biệt nằm giữa nhóm người khỏe mạnh và nhóm bệnh nhân đái tháo đường týp 2, với nồng độ cholesterol toàn phần ở nhóm đái tháo đường týp 2 cao hơn. Không ghi nhận sự khác biệt có ý nghĩa thống kê giữa nhóm người khỏe mạnh và nhóm tiền đái tháo đường cũng như giữa nhóm tiền đái tháo đường và nhóm đái tháo đường týp 2. Kết quả này gợi ý rằng tình trạng rối loạn chuyển hóa carbohydrate có liên quan đến xu hướng tăng nồng độ cholesterol toàn phần trong máu.
![[Pasted image 20260723160205.png]]