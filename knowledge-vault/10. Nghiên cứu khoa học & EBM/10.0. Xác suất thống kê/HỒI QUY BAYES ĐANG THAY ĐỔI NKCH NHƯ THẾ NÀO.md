Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐜𝐚́𝐜 𝐲𝐞̂́𝐮 𝐭𝐨̂́ 𝐚̉𝐧𝐡 𝐡𝐮̛𝐨̛̉𝐧𝐠 đ𝐞̂́𝐧 𝐡𝐮𝐲𝐞̂́𝐭 𝐚́𝐩 𝐭𝐚̂𝐦 𝐭𝐡𝐮 𝐯𝐚̀ 𝐃𝐮̛̣ 𝐛𝐚́𝐨 đ𝐚́𝐩 𝐮̛́𝐧𝐠 đ𝐢𝐞̂̀𝐮 𝐭𝐫𝐢̣ 𝐮𝐧𝐠 𝐭𝐡𝐮̛ 𝐯𝐮́.

TS. Đào Hồng Nam

𝟔. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐁𝐚𝐲𝐞𝐬 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐲 𝐡𝐨̣𝐜

Sự phát triển của thống kê Bayes trong khoảng hai thập kỷ gần đây đã tạo ra những thay đổi đáng kể trong phương pháp phân tích dữ liệu y học. Nếu trước đây hồi quy tuyến tính Bayes chủ yếu được sử dụng trong các nghiên cứu phương pháp luận hoặc trong một số lĩnh vực chuyên biệt như thử nghiệm lâm sàng thích ứng, thì hiện nay phương pháp này đã được ứng dụng rộng rãi trong dịch tễ học, y tế công cộng, nghiên cứu lâm sàng, dược học, kinh tế y tế, nghiên cứu hệ gen và y học chính xác. Sự phát triển của các phần mềm như Stan, JASP, brms, rstanarm và cmdstanr đã làm giảm đáng kể rào cản kỹ thuật, giúp các nhà nghiên cứu có thể xây dựng và ước lượng các mô hình Bayes mà không cần lập trình các thuật toán MCMC từ đầu (Bürkner, 2017; Carpenter và cộng sự, 2017).

Khác với hồi quy tuyến tính cổ điển, hồi quy Bayes không chỉ cung cấp các ước lượng tham số mà còn cho phép lượng hóa trực tiếp mức độ không chắc chắn của các kết quả, tích hợp bằng chứng từ các nghiên cứu trước và xây dựng các mô hình có khả năng dự đoán tốt hơn trong điều kiện dữ liệu hạn chế. Những đặc điểm này làm cho phương pháp Bayes đặc biệt phù hợp với đặc thù của nghiên cứu y học, nơi dữ liệu thường không hoàn hảo và các quyết định lâm sàng luôn phải được đưa ra trong điều kiện tồn tại sự không chắc chắn.

𝟔.𝟏. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐝𝐢̣𝐜𝐡 𝐭𝐞̂̃ 𝐡𝐨̣𝐜

Dịch tễ học là một trong những lĩnh vực ứng dụng rộng rãi nhất của hồi quy tuyến tính Bayes. Mục tiêu của các nghiên cứu dịch tễ học thường là xác định mối liên quan giữa các yếu tố nguy cơ với các chỉ số sức khỏe liên tục như huyết áp, nồng độ glucose huyết tương, cholesterol máu, chức năng hô hấp hoặc mật độ khoáng xương.

Trong các nghiên cứu quy mô lớn, số lượng biến giải thích thường rất nhiều và tồn tại mối tương quan giữa các biến. Ví dụ, tuổi thường tương quan với huyết áp, chỉ số khối cơ thể tương quan với vòng bụng, trong khi cholesterol toàn phần có thể tương quan với triglyceride hoặc LDL-cholesterol. Hiện tượng đa cộng tuyến này làm cho các hệ số hồi quy trong mô hình tuyến tính cổ điển trở nên kém ổn định, sai số chuẩn tăng lên và khoảng tin cậy rộng hơn.

Hồi quy Bayes khắc phục vấn đề này thông qua việc sử dụng các phân bố tiên nghiệm có tính co rút (shrinkage priors). Các phân bố này làm giảm phương sai của các hệ số hồi quy nhưng vẫn giữ được xu hướng chung của dữ liệu. Kết quả là các mô hình Bayes thường có khả năng dự đoán tốt hơn, đặc biệt khi số lượng biến lớn so với cỡ mẫu.

Trong các nghiên cứu đoàn hệ kéo dài nhiều năm, hiện tượng mất theo dõi hoặc thiếu thông tin tại một số thời điểm thu thập dữ liệu xảy ra khá thường xuyên và có thể ảnh hưởng đáng kể đến kết quả phân tích. Một lợi thế quan trọng của hồi quy Bayes là khả năng xử lý trực tiếp những trường hợp dữ liệu thiếu bằng cách xem các giá trị chưa quan sát được như những biến cần được ước lượng trong mô hình. Nhờ đó, quá trình suy luận về dữ liệu thiếu và quá trình ước lượng các tham số hồi quy được thực hiện đồng thời trong cùng một khuôn khổ phân tích, thay vì phải loại bỏ các đối tượng có dữ liệu không đầy đủ như trong phương pháp phân tích trường hợp đầy đủ (complete-case analysis).

𝐕𝐢́ 𝐝𝐮̣ 𝟕. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐜𝐚́𝐜 𝐲𝐞̂́𝐮 𝐭𝐨̂́ 𝐚̉𝐧𝐡 𝐡𝐮̛𝐨̛̉𝐧𝐠 đ𝐞̂́𝐧 𝐡𝐮𝐲𝐞̂́𝐭 𝐚́𝐩 𝐭𝐚̂𝐦 𝐭𝐡𝐮

Một nghiên cứu cắt ngang được thực hiện trên 450 người trưởng thành nhằm đánh giá ảnh hưởng của tuổi, giới tính, BMI, vòng bụng, cholesterol toàn phần, glucose huyết tương lúc đói và mức độ hoạt động thể lực đến huyết áp tâm thu.

Sự tương quan cao giữa BMI và vòng bụng làm xuất hiện hiện tượng đa cộng tuyến trong mô hình hồi quy tuyến tính cổ điển, khiến sai số chuẩn của các hệ số hồi quy tăng lên đáng kể và làm giảm độ ổn định của các ước lượng. Để khắc phục vấn đề này, nhóm nghiên cứu áp dụng hồi quy tuyến tính Bayes với các phân bố tiên nghiệm thông tin yếu cho các hệ số hồi quy và thực hiện toàn bộ quá trình phân tích theo quy trình Bayesian Workflow.

Các kết quả thu được cho thấy các hệ số hồi quy có độ ổn định cao hơn so với mô hình hồi quy tuyến tính cổ điển. Khoảng tin cậy Bayes của các tham số cũng hẹp hơn, trong khi khả năng dự đoán huyết áp trên tập dữ liệu kiểm định được cải thiện, cho thấy lợi ích của cách tiếp cận Bayes trong bối cảnh dữ liệu tồn tại hiện tượng đa cộng tuyến.

𝟔.𝟐. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐥𝐚̂𝐦 𝐬𝐚̀𝐧𝐠

Trong nghiên cứu lâm sàng, hồi quy tuyến tính Bayes được sử dụng để đánh giá hiệu quả điều trị khi biến kết cục là biến liên tục. Các biến này có thể bao gồm huyết áp, HbA1c, LDL-cholesterol, mức lọc cầu thận, mật độ xương, điểm đau, điểm chất lượng cuộc sống hoặc các thang điểm đánh giá chức năng.

Một đặc điểm của các thử nghiệm lâm sàng là quá trình nghiên cứu thường diễn ra theo nhiều giai đoạn. Các nghiên cứu giai đoạn đầu cung cấp những bằng chứng ban đầu về hiệu quả và độ an toàn của thuốc, trong khi các nghiên cứu giai đoạn sau có cỡ mẫu lớn hơn nhằm xác nhận kết quả. Trong khuôn khổ Bayes, các bằng chứng thu được từ các giai đoạn trước có thể được sử dụng làm phân bố tiên nghiệm cho các nghiên cứu tiếp theo, qua đó tăng hiệu quả của quá trình suy luận.

Khả năng tích hợp bằng chứng này đặc biệt hữu ích đối với các nghiên cứu có cỡ mẫu nhỏ hoặc các bệnh hiếm, nơi việc tuyển dụng đủ số lượng người bệnh thường gặp nhiều khó khăn.

Ngoài ra, nhiều thử nghiệm lâm sàng hiện đại áp dụng thiết kế thích ứng (adaptive trial design), trong đó kế hoạch nghiên cứu có thể được điều chỉnh dựa trên dữ liệu thu thập được trong quá trình nghiên cứu. Thống kê Bayes là nền tảng toán học của nhiều thiết kế thích ứng vì cho phép cập nhật liên tục xác suất của các giả thuyết điều trị.

𝐕𝐢́ 𝐝𝐮̣ 𝟖. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐢𝐞̣̂𝐮 𝐪𝐮𝐚̉ 𝐜𝐮̉𝐚 𝐭𝐡𝐮𝐨̂́𝐜 𝐡𝐚̣ 𝐡𝐮𝐲𝐞̂́𝐭 𝐚́𝐩 𝐦𝐨̛́𝐢

Một thử nghiệm lâm sàng ngẫu nhiên đánh giá hiệu quả của một thuốc hạ huyết áp mới trên 90 bệnh nhân tăng huyết áp nguyên phát.

Biến kết cục chính là mức giảm huyết áp tâm thu sau 12 tuần điều trị.

Do số lượng người bệnh còn hạn chế, nhóm nghiên cứu sử dụng kết quả của ba thử nghiệm pha II trước đó để xây dựng phân bố tiên nghiệm cho hệ số điều trị.

Sau khi phân tích bằng hồi quy Bayes, xác suất để thuốc làm giảm huyết áp trên 5 mmHg đạt 98,4%, trong khi xác suất giảm trên 10 mmHg đạt 91,7%.

Những kết quả này giúp các bác sĩ đánh giá trực tiếp khả năng đạt được lợi ích lâm sàng thay vì chỉ dựa trên việc kiểm định giả thuyết với giá trị p.

𝟔.𝟑. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐝𝐮̛𝐨̛̣𝐜 𝐡𝐨̣𝐜 𝐯𝐚̀ 𝐝𝐮̛𝐨̛̣𝐜 đ𝐨̣̂𝐧𝐠 𝐡𝐨̣𝐜

Dược động học (pharmacokinetics) và dược lực học (pharmacodynamics) là những lĩnh vực ứng dụng rất thành công của thống kê Bayes.

Các nghiên cứu dược động học thường thu thập nhiều mẫu máu từ cùng một bệnh nhân để theo dõi sự thay đổi nồng độ thuốc theo thời gian. Trong thực hành lâm sàng, số lượng và thời điểm lấy mẫu giữa các bệnh nhân hiếm khi hoàn toàn giống nhau do khác biệt về tình trạng bệnh, thời gian nằm viện hoặc mức độ hợp tác của người bệnh. Sự mất cân đối này làm cho dữ liệu có cấu trúc phức tạp hơn và đặt ra những thách thức nhất định đối với quá trình phân tích thống kê.

Các mô hình Bayes phân cấp cho phép kết hợp thông tin của toàn bộ quần thể với thông tin của từng cá thể, từ đó xây dựng các mô hình dược động học quần thể (population pharmacokinetic models).

Việc lựa chọn liều điều trị phù hợp cho từng bệnh nhân là một trong những thách thức quan trọng của dược động học lâm sàng, bởi cùng một liều dùng có thể tạo ra những đáp ứng rất khác nhau giữa các cá thể. Hồi quy Bayes cung cấp một cách tiếp cận hiệu quả cho vấn đề này bằng cách kết hợp dữ liệu từ quần thể với thông tin thu thập được trên từng bệnh nhân cụ thể. Khi đã có các dữ liệu ban đầu như nồng độ thuốc trong máu hoặc các đặc điểm lâm sàng của bệnh nhân, mô hình có thể cập nhật phân bố hậu nghiệm của các tham số dược động học và sử dụng những thông tin đã được cá thể hóa đó để dự đoán liều điều trị tối ưu cho chính bệnh nhân đang được theo dõi.

𝐕𝐢́ 𝐝𝐮̣ 𝟗. 𝐌𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐡𝐨́𝐚 𝐧𝐨̂̀𝐧𝐠 đ𝐨̣̂ 𝐯𝐚𝐧𝐜𝐨𝐦𝐲𝐜𝐢𝐧

Một nghiên cứu được thực hiện trên 120 bệnh nhân điều trị bằng vancomycin tại khoa hồi sức tích cực nhằm đánh giá ảnh hưởng của tuổi, cân nặng, mức lọc cầu thận và nồng độ albumin huyết thanh đến nồng độ đáy của thuốc.

Sự khác biệt về số lượng mẫu máu được thu thập ở mỗi bệnh nhân làm cho dữ liệu có cấu trúc phân cấp và khó xử lý bằng các mô hình hồi quy thông thường. Để khai thác đồng thời thông tin ở mức cá thể và mức quần thể, nhóm nghiên cứu sử dụng mô hình hồi quy Bayes phân cấp trong quá trình phân tích.

Các kết quả thu được cho thấy mô hình Bayes có khả năng dự đoán nồng độ vancomycin của từng bệnh nhân với sai số thấp hơn so với mô hình hồi quy tuyến tính cổ điển. Việc kết hợp thông tin từ toàn bộ quần thể với dữ liệu riêng của từng bệnh nhân cũng giúp cải thiện độ chính xác của các dự đoán cá thể hóa, từ đó hỗ trợ điều chỉnh liều điều trị phù hợp hơn và giảm nguy cơ độc tính trên thận trong thực hành lâm sàng.

𝟔.𝟒. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐛𝐞̣̂𝐧𝐡 𝐡𝐢𝐞̂́𝐦

Một trong những ưu thế nổi bật nhất của hồi quy Bayes là khả năng phân tích các nghiên cứu có cỡ mẫu nhỏ.

Trong nghiên cứu các bệnh hiếm, việc thu thập hàng trăm hoặc hàng nghìn người bệnh thường không khả thi. Nếu áp dụng các phương pháp thống kê truyền thống, sai số chuẩn của các hệ số hồi quy thường rất lớn và kết quả thiếu ổn định.

Trong những trường hợp này, thông tin từ các nghiên cứu quốc tế hoặc các phân tích gộp có thể được sử dụng để xây dựng phân bố tiên nghiệm.

Việc kết hợp bằng chứng trước đó với dữ liệu hiện tại giúp tăng độ chính xác của các ước lượng mà vẫn phản ánh đầy đủ mức độ không chắc chắn còn tồn tại.

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟎. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐤𝐡𝐚̉ 𝐧𝐚̆𝐧𝐠 𝐠𝐚̆́𝐧𝐠 𝐬𝐮̛́𝐜 𝐨̛̉ 𝐛𝐞̣̂𝐧𝐡 𝐧𝐡𝐚̂𝐧 𝐭𝐚̆𝐧𝐠 𝐚́𝐩 đ𝐨̣̂𝐧𝐠 𝐦𝐚̣𝐜𝐡 𝐩𝐡𝐨̂̉𝐢

Một nghiên cứu trên 42 bệnh nhân tăng áp động mạch phổi đánh giá ảnh hưởng của nồng độ NT-proBNP đến quãng đường đi bộ sáu phút.

Do cỡ mẫu nhỏ, nhóm nghiên cứu sử dụng phân bố tiên nghiệm dựa trên một phân tích gộp đã công bố trước đó.

Kết quả hậu nghiệm cho thấy xác suất hệ số hồi quy âm đạt trên 99%, chứng tỏ nồng độ NT-proBNP tăng có liên quan rất mạnh với giảm khả năng gắng sức.

Khoảng tin cậy Bayes hẹp hơn so với khoảng tin cậy của hồi quy tuyến tính cổ điển, phản ánh hiệu quả của việc tích hợp bằng chứng tiên nghiệm.

𝟔.𝟓. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐲 𝐡𝐨̣𝐜 𝐜𝐡𝐢́𝐧𝐡 𝐱𝐚́𝐜

Y học chính xác (precision medicine) là một trong những lĩnh vực phát triển nhanh nhất của y học hiện đại. Khác với mô hình điều trị truyền thống dựa trên đặc điểm trung bình của quần thể, y học chính xác hướng tới việc lựa chọn phương pháp dự phòng, chẩn đoán và điều trị phù hợp với từng cá thể dựa trên đặc điểm di truyền, phân tử, lâm sàng và môi trường sống.

Đặc điểm của các nghiên cứu trong lĩnh vực này là số lượng biến dự báo thường rất lớn trong khi cỡ mẫu lại tương đối hạn chế. Một nghiên cứu có thể đồng thời phân tích hàng trăm đến hàng chục nghìn dấu ấn sinh học, nhưng số lượng người bệnh chỉ ở mức vài trăm. Tình huống này thường được gọi là bài toán p > n, trong đó số lượng biến dự báo lớn hơn số lượng quan sát.

Đối với hồi quy tuyến tính cổ điển, hiện tượng này dẫn đến nhiều khó khăn như đa cộng tuyến nghiêm trọng, phương sai của các hệ số hồi quy tăng cao, mô hình không ổn định và nguy cơ quá khớp (overfitting). Trong khi đó, hồi quy tuyến tính Bayes có thể giải quyết hiệu quả những vấn đề này thông qua việc sử dụng các phân bố tiên nghiệm có tính co rút.

Các phân bố như Ridge prior, Laplace prior, Horseshoe prior hoặc Spike-and-Slab prior cho phép thu nhỏ các hệ số hồi quy không quan trọng về gần giá trị 0, đồng thời vẫn giữ lại các biến thực sự có ý nghĩa dự báo. Cơ chế này giúp giảm phương sai của mô hình, hạn chế quá khớp và cải thiện khả năng dự đoán trên dữ liệu mới.

Ngoài ra, hồi quy Bayes còn cho phép lượng hóa mức độ không chắc chắn của từng biến dự báo. Điều này có ý nghĩa quan trọng trong nghiên cứu y học chính xác vì nhiều dấu ấn sinh học có mức độ ảnh hưởng nhỏ và dễ bị nhiễu nếu chỉ dựa trên giá trị p.

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟏. 𝐃𝐮̛̣ 𝐛𝐚́𝐨 đ𝐚́𝐩 𝐮̛́𝐧𝐠 đ𝐢𝐞̂̀𝐮 𝐭𝐫𝐢̣ 𝐮𝐧𝐠 𝐭𝐡𝐮̛ 𝐯𝐮́

Một nghiên cứu nhằm xây dựng mô hình dự báo đáp ứng với hóa trị tân bổ trợ ở bệnh nhân ung thư vú thu thập thông tin của 180 người bệnh cùng với hơn 500 dấu ấn sinh học.

Do số lượng biến vượt xa số lượng người bệnh, nhóm nghiên cứu áp dụng hồi quy Bayes với Horseshoe prior nhằm giảm ảnh hưởng của các biến không liên quan.

Kết quả cho thấy chỉ khoảng 18 dấu ấn sinh học có xác suất hậu nghiệm cao về vai trò dự báo đáp ứng điều trị. Mô hình đạt độ chính xác dự báo cao hơn khi đánh giá trên tập dữ liệu kiểm định so với mô hình hồi quy tuyến tính cổ điển và mô hình hồi quy Ridge theo trường phái tần suất.

Kết quả này minh họa ưu thế của hồi quy Bayes trong các nghiên cứu có số chiều lớn, nơi mục tiêu không chỉ là xác định mối liên quan mà còn xây dựng các mô hình dự báo có khả năng ứng dụng trong thực hành lâm sàng.

𝟔.𝟔. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 đ𝐚 𝐭𝐫𝐮𝐧𝐠 𝐭𝐚̂𝐦

Các nghiên cứu đa trung tâm ngày càng được sử dụng rộng rãi trong y học nhằm tăng cỡ mẫu, nâng cao khả năng khái quát hóa kết quả và đánh giá hiệu quả của các can thiệp trên những quần thể bệnh nhân đa dạng hơn. Việc thu thập dữ liệu từ nhiều bệnh viện hoặc nhiều quốc gia cũng làm xuất hiện cấu trúc phân cấp trong dữ liệu, khi những người bệnh thuộc cùng một trung tâm thường có xu hướng giống nhau hơn về đặc điểm dân số, quy trình chăm sóc, thiết bị đo lường hoặc thực hành lâm sàng so với người bệnh ở các trung tâm khác.

Sự phụ thuộc giữa các quan sát trong cùng một trung tâm có thể vi phạm giả định độc lập của các mô hình hồi quy truyền thống và dẫn đến các ước lượng không còn phản ánh chính xác mức độ biến thiên thực sự trong dữ liệu. Trong bối cảnh đó, các mô hình Bayes phân cấp cho phép mô tả đồng thời sự khác biệt giữa các trung tâm và sự khác biệt giữa các cá thể trong từng trung tâm, từ đó tận dụng hiệu quả cấu trúc dữ liệu nhiều tầng thay vì xem toàn bộ các quan sát là hoàn toàn độc lập với nhau.

Nếu bỏ qua cấu trúc phân cấp này, các giả định độc lập giữa các quan sát của hồi quy tuyến tính cổ điển có thể bị vi phạm, dẫn đến sai số chuẩn không chính xác và các kết luận thống kê thiếu tin cậy.

Hồi quy Bayes phân cấp (Bayesian hierarchical linear regression) cho phép mô hình hóa đồng thời hai nguồn biến thiên:

• biến thiên giữa các cá thể trong cùng một trung tâm;

• biến thiên giữa các trung tâm nghiên cứu.

Trong mô hình này, mỗi trung tâm có thể có một hệ số hồi quy riêng, nhưng các hệ số này được giả định cùng xuất phát từ một phân bố chung. Cơ chế này tạo ra hiện tượng co rút từng phần (partial pooling), trong đó các trung tâm có cỡ mẫu nhỏ sẽ được "mượn sức mạnh thống kê" từ toàn bộ dữ liệu, giúp giảm phương sai của các ước lượng mà vẫn bảo tồn sự khác biệt thực sự giữa các trung tâm.

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟐. 𝐍𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐚̉𝐧𝐡 𝐡𝐮̛𝐨̛̉𝐧𝐠 𝐜𝐮̉𝐚 𝐁𝐌𝐈 đ𝐞̂́𝐧 𝐡𝐮𝐲𝐞̂́𝐭 𝐚́𝐩 𝐭𝐚̣𝐢 𝐧𝐡𝐢𝐞̂̀𝐮 𝐛𝐞̣̂𝐧𝐡 𝐯𝐢𝐞̣̂𝐧

Một nghiên cứu đa trung tâm được thực hiện tại 15 bệnh viện với tổng số 2.400 người bệnh nhằm đánh giá mối liên quan giữa BMI và huyết áp tâm thu.

Thay vì xây dựng 15 mô hình hồi quy độc lập, nhóm nghiên cứu sử dụng mô hình Bayes phân cấp.

Kết quả cho thấy hệ số hồi quy của BMI có sự khác biệt nhẹ giữa các bệnh viện, tuy nhiên phần lớn các trung tâm đều có hệ số dương. Các bệnh viện có số lượng người bệnh ít thu được các ước lượng ổn định hơn nhờ cơ chế co rút từng phần.

Mô hình Bayes phân cấp cũng cho khả năng dự đoán tốt hơn khi áp dụng cho dữ liệu từ các trung tâm mới chưa tham gia nghiên cứu.

𝟔.𝟕. 𝐔̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐥𝐨̛́𝐧 𝐯𝐚̀ 𝐭𝐫𝐢́ 𝐭𝐮𝐞̣̂ 𝐧𝐡𝐚̂𝐧 𝐭𝐚̣𝐨

Sự phát triển của hồ sơ bệnh án điện tử, thiết bị theo dõi sức khỏe liên tục và công nghệ giải trình tự gen đã tạo ra các bộ dữ liệu y học có quy mô rất lớn.

Các mô hình học máy truyền thống thường tập trung vào tối ưu hóa độ chính xác dự báo nhưng chưa phản ánh đầy đủ mức độ không chắc chắn của các kết quả. Trong nhiều ứng dụng y học, điều này là một hạn chế đáng kể vì các quyết định lâm sàng không chỉ cần biết giá trị dự đoán mà còn cần biết mức độ tin cậy của dự đoán đó.

Các mô hình Bayesian Machine Learning khắc phục hạn chế này bằng cách xem trọng số của mô hình là các biến ngẫu nhiên thay vì các hằng số cố định.

Đối với các mô hình hồi quy tuyến tính Bayes, điều này có nghĩa rằng mỗi dự đoán đều đi kèm với một phân bố xác suất, phản ánh mức độ không chắc chắn của kết quả.

Trong những năm gần đây, nhiều nghiên cứu đã kết hợp hồi quy Bayes với các kỹ thuật học sâu (Bayesian Deep Learning), mạng nơ-ron Bayes (Bayesian Neural Networks) và các mô hình dự báo nguy cơ trong hồi sức tích cực.

Mặc dù các phương pháp này phức tạp hơn nhiều so với hồi quy tuyến tính Bayes truyền thống, chúng đều dựa trên cùng một nguyên lý cập nhật xác suất theo Định lý Bayes.

𝟔.𝟖. 𝐔̛𝐮 đ𝐢𝐞̂̉𝐦 𝐜𝐮̉𝐚 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐁𝐚𝐲𝐞𝐬 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐲 𝐡𝐨̣𝐜

Việc áp dụng hồi quy tuyến tính Bayes trong nghiên cứu y học ngày càng thu hút sự quan tâm nhờ khả năng giải quyết nhiều hạn chế của các phương pháp thống kê truyền thống và cung cấp một khuôn khổ suy luận linh hoạt hơn. Một trong những đặc điểm nổi bật của phương pháp là khả năng kết hợp bằng chứng từ các nghiên cứu trước vào quá trình phân tích thông qua phân bố tiên nghiệm, cho phép tri thức khoa học được tích lũy và cập nhật một cách có hệ thống thay vì xem mỗi nghiên cứu như một nguồn bằng chứng tách biệt.

Cách diễn giải kết quả trong khuôn khổ Bayes cũng gần gũi hơn với nhu cầu ra quyết định trong thực hành y học. Thay vì dựa chủ yếu vào các kiểm định giả thuyết và giá trị p, hồi quy Bayes cho phép lượng hóa trực tiếp xác suất của các tham số hoặc các giả thuyết nghiên cứu, từ đó hỗ trợ việc đánh giá bằng chứng theo cách trực quan hơn đối với các nhà nghiên cứu và bác sĩ lâm sàng.

Những lợi thế của phương pháp đặc biệt rõ rệt trong các tình huống mà dữ liệu nghiên cứu gặp nhiều thách thức, chẳng hạn như cỡ mẫu nhỏ, dữ liệu thiếu, hiện tượng đa cộng tuyến, cấu trúc dữ liệu phân cấp hoặc số lượng biến dự báo lớn. Trong các bối cảnh này, việc sử dụng thông tin tiên nghiệm và các mô hình Bayes linh hoạt thường giúp cải thiện tính ổn định của các ước lượng và nâng cao chất lượng suy luận thống kê.

Khả năng mô tả và lượng hóa mức độ không chắc chắn cũng là một đặc trưng quan trọng của hồi quy Bayes. Thay vì chỉ cung cấp một giá trị ước lượng điểm, phương pháp cho phép mô tả toàn bộ phân bố hậu nghiệm của tham số, qua đó phản ánh đầy đủ mức độ không chắc chắn liên quan đến cả các tham số hồi quy và các giá trị dự đoán.

Việc kết hợp thông tin tiên nghiệm với dữ liệu quan sát còn tạo ra một cơ chế điều chuẩn (regularization) tự nhiên, giúp hạn chế hiện tượng quá khớp và cải thiện khả năng dự đoán khi mô hình được áp dụng trên dữ liệu mới. Nhờ những đặc điểm này, các mô hình Bayes thường đạt hiệu quả dự đoán cao trong nhiều bài toán nghiên cứu y học hiện đại.

Các ưu điểm chính của hồi quy tuyến tính Bayes được tóm tắt trong Bảng 4.

𝟔.𝟗. 𝐇𝐚̣𝐧 𝐜𝐡𝐞̂́ 𝐜𝐮̉𝐚 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐁𝐚𝐲𝐞𝐬

Mặc dù mang lại nhiều lợi ích cho quá trình suy luận thống kê, hồi quy tuyến tính Bayes vẫn đặt ra một số thách thức cần được xem xét trong quá trình áp dụng. Ảnh hưởng của phân bố tiên nghiệm là một trong những vấn đề được thảo luận nhiều nhất, đặc biệt trong các nghiên cứu có cỡ mẫu nhỏ, nơi thông tin tiên nghiệm có thể tác động đáng kể đến phân bố hậu nghiệm. Việc lựa chọn phân bố tiên nghiệm phù hợp vì vậy không chỉ đòi hỏi hiểu biết về thống kê Bayes mà còn cần kiến thức chuyên môn về lĩnh vực nghiên cứu để bảo đảm các giả định ban đầu phản ánh hợp lý những bằng chứng sẵn có.

Mức độ phức tạp của quá trình tính toán cũng là một khác biệt quan trọng so với hồi quy tuyến tính cổ điển. Các mô hình Bayes thường phải dựa vào các thuật toán lấy mẫu như MCMC để xấp xỉ phân bố hậu nghiệm, khiến thời gian tính toán tăng lên đáng kể khi số lượng tham số lớn hoặc dữ liệu có kích thước rất lớn.

Yêu cầu đánh giá chất lượng mô hình cũng khắt khe hơn, bởi độ tin cậy của kết quả không chỉ phụ thuộc vào bản thân mô hình mà còn phụ thuộc vào chất lượng của quá trình lấy mẫu. Việc kiểm tra hội tụ của các chuỗi MCMC, đánh giá kích thước mẫu hiệu quả và thực hiện các bước chẩn đoán mô hình là những công việc không thể bỏ qua nếu muốn bảo đảm tính hợp lệ của các suy luận thống kê.

Ngoài ra, nhiều khái niệm trung tâm của thống kê Bayes như phân bố hậu nghiệm, Bayes Factor, ESS hay Posterior Predictive Check vẫn đòi hỏi người sử dụng có nền tảng phương pháp luận nhất định để có thể diễn giải đúng ý nghĩa của kết quả. Mặc dù vậy, sự phát triển nhanh chóng của các phần mềm phân tích và các hướng dẫn thực hành trong những năm gần đây đã giúp việc xây dựng, ước lượng và đánh giá các mô hình Bayes trở nên dễ tiếp cận hơn, qua đó từng bước giảm bớt những rào cản đối với việc ứng dụng phương pháp này trong nghiên cứu.