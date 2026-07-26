TS. Đào Hồng Nam

Chạy được mô hình hồi quy Bayes mới chỉ là bước đầu của quá trình phân tích hồi quy Bayes. Giá trị thực sự nằm ở cách diễn giải các kết quả hậu nghiệm để trả lời câu hỏi nghiên cứu và hỗ trợ ra quyết định.

Không giống thống kê truyền thống chỉ tập trung vào p-value, phương pháp Bayes cung cấp nhiều thông tin hơn thông qua Posterior Distribution, Posterior Mean, MAP, Credible Interval và Bayes Factor. Những chỉ số này giúp định lượng xác suất của tham số, đánh giá độ không chắc chắn và mức độ ủng hộ của dữ liệu đối với giả thuyết nghiên cứu.

Trong hình dưới đây, các chỉ số quan trọng nhất để diễn giải kết quả hồi quy Bayes được hệ thống hóa ngắn gọn và trực quan, giúp bạn hiểu nên đọc gì và diễn giải như thế nào sau khi hoàn thành phân tích.

𝟑. 𝐒𝐮𝐲 𝐥𝐮𝐚̣̂𝐧 𝐁𝐚𝐲𝐞𝐬 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡

𝟑.𝟏. 𝐊𝐡𝐚́𝐢 𝐧𝐢𝐞̣̂𝐦 𝐬𝐮𝐲 𝐥𝐮𝐚̣̂𝐧 𝐁𝐚𝐲𝐞𝐬

Suy luận Bayes (Bayesian inference) là quá trình cập nhật tri thức về một tham số chưa biết dựa trên dữ liệu quan sát thông qua Định lý Bayes. Đây là nền tảng của toàn bộ thống kê Bayes và cũng là điểm khác biệt căn bản so với phương pháp suy luận của trường phái tần suất. Trong khi thống kê tần suất chủ yếu dựa vào phân bố lấy mẫu (sampling distribution) để đưa ra các kết luận thống kê, suy luận Bayes xem việc phân tích dữ liệu là quá trình cập nhật xác suất của các giả thuyết khi có thêm bằng chứng mới (Gelman và cộng sự, 2021).

Trong hồi quy tuyến tính Bayes, mục tiêu của suy luận không phải là tìm một giá trị "đúng" của các hệ số hồi quy mà là xác định phân bố xác suất của các hệ số sau khi kết hợp thông tin tiên nghiệm với dữ liệu nghiên cứu. Kết quả cuối cùng của quá trình này là phân bố hậu nghiệm, từ đó có thể tính toán tất cả các đại lượng thống kê cần thiết phục vụ cho việc diễn giải và ra quyết định.

Suy luận Bayes có thể được xem như một cơ chế tích lũy và cập nhật tri thức theo thời gian, trong đó những hiểu biết hiện có về vấn đề nghiên cứu luôn được điều chỉnh khi xuất hiện bằng chứng mới. Trước khi tiến hành nghiên cứu, nhà nghiên cứu thường đã có một lượng thông tin nhất định được hình thành từ các công trình đã công bố, kinh nghiệm lâm sàng hoặc dữ liệu thí điểm; những thông tin này được biểu diễn thông qua phân bố tiên nghiệm. Dữ liệu thu thập được từ nghiên cứu hiện tại sau đó được kết hợp với phân bố tiên nghiệm để tạo thành phân bố hậu nghiệm, phản ánh mức độ hiểu biết đã được cập nhật về tham số quan tâm. Khi có thêm các nghiên cứu trong tương lai, phân bố hậu nghiệm này lại có thể được sử dụng làm phân bố tiên nghiệm cho các phân tích tiếp theo. Cách thức cập nhật lặp lại như vậy phù hợp với quá trình hình thành và phát triển của tri thức khoa học, nơi các kết luận mới không thay thế hoàn toàn những bằng chứng đã có mà được xây dựng trên cơ sở tích hợp và điều chỉnh các hiểu biết trước đó.

Trong nghiên cứu y học, cách tiếp cận này đặc biệt phù hợp vì các quyết định lâm sàng hiếm khi được đưa ra dựa trên một nghiên cứu đơn lẻ. Thay vào đó, bác sĩ và nhà nghiên cứu thường xem xét đồng thời các bằng chứng từ nhiều nguồn khác nhau. Suy luận Bayes cung cấp một khuôn khổ toán học để thực hiện quá trình tổng hợp bằng chứng đó một cách chính thức và định lượng.

𝟑.𝟐. Đ𝐢̣𝐧𝐡 𝐥𝐲́ 𝐁𝐚𝐲𝐞𝐬 𝐯𝐚̀ 𝐲́ 𝐧𝐠𝐡𝐢̃𝐚 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡

Định lý Bayes là nền tảng toán học của toàn bộ khuôn khổ suy luận Bayes, tạo cơ sở cho việc kết hợp thông tin tiên nghiệm với dữ liệu quan sát nhằm cập nhật hiểu biết về các tham số nghiên cứu. Mối quan hệ giữa các thành phần này được mô tả thông qua Định lý Bayes, được trình bày trong Công thức (1).

Theo Công thức (1), phân bố hậu nghiệm của tham số được xác định từ ba thành phần chính: phân bố tiên nghiệm, hàm hợp lý và xác suất biên của dữ liệu.

Về mặt trực giác, phân bố tiên nghiệm phản ánh những gì nhà nghiên cứu biết trước khi thu thập dữ liệu; hàm hợp lý phản ánh thông tin chứa trong dữ liệu hiện tại; còn phân bố hậu nghiệm là kết quả của việc kết hợp hai nguồn thông tin này. Vì xác suất biên của dữ liệu chỉ đóng vai trò chuẩn hóa phân bố nên trong nhiều thuật toán lấy mẫu, thành phần này không cần được tính trực tiếp mà chỉ cần biết tỷ lệ giữa các giá trị của phân bố hậu nghiệm.

Đối với hồi quy tuyến tính Bayes, Định lý Bayes không chỉ được áp dụng cho một tham số riêng lẻ mà đồng thời cho toàn bộ các hệ số hồi quy và phương sai của sai số. Điều này có nghĩa là sau quá trình suy luận, mỗi tham số đều có một phân bố hậu nghiệm riêng phản ánh mức độ không chắc chắn của nó.

Một ưu điểm quan trọng của cách tiếp cận này là toàn bộ sự phụ thuộc giữa các tham số cũng được phản ánh trong phân bố hậu nghiệm chung của mô hình. Do đó, khi đánh giá ảnh hưởng của một biến độc lập, nhà nghiên cứu đồng thời đã xét đến sự không chắc chắn của các biến còn lại.

𝟑.𝟑. 𝐏𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 𝐯𝐚̀ 𝐲́ 𝐧𝐠𝐡𝐢̃𝐚 𝐭𝐡𝐨̂́𝐧𝐠 𝐤𝐞̂

Trong thống kê Bayes, phân bố hậu nghiệm là kết quả quan trọng nhất của toàn bộ quá trình phân tích. Mọi kết luận thống kê đều được suy ra từ phân bố này.

Khác với hồi quy tuyến tính cổ điển, trong đó nhà nghiên cứu thường chỉ báo cáo một giá trị ước lượng và khoảng tin cậy, hồi quy Bayes cung cấp toàn bộ phân bố xác suất của từng hệ số hồi quy. Điều này có nghĩa là có thể tính được xác suất để hệ số lớn hơn hoặc nhỏ hơn bất kỳ giá trị nào mà nhà nghiên cứu quan tâm.

𝐕𝐢́ 𝐝𝐮̣, thay vì chỉ báo cáo rằng hệ số hồi quy của tuổi bằng 0,42 và có giá trị p < 0,05, hồi quy Bayes có thể cho biết xác suất để hệ số này lớn hơn 0 bằng 99,8%. Đối với các nhà lâm sàng, cách diễn giải này thường trực quan và hữu ích hơn vì nó phản ánh trực tiếp mức độ chắc chắn của bằng chứng.

Ngoài ra, phân bố hậu nghiệm còn cho phép tính nhiều đại lượng thống kê khác nhau như giá trị trung bình hậu nghiệm, trung vị hậu nghiệm, mode hậu nghiệm, phương sai hậu nghiệm và khoảng tin cậy Bayes.

𝟑.𝟒. 𝐆𝐢𝐚́ 𝐭𝐫𝐢̣ 𝐭𝐫𝐮𝐧𝐠 𝐛𝐢̀𝐧𝐡 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Phân bố hậu nghiệm thường được mô tả thông qua một số đại lượng tóm tắt nhằm thuận tiện cho việc diễn giải và báo cáo kết quả, trong đó giá trị trung bình hậu nghiệm là chỉ số được sử dụng phổ biến nhất. Đại lượng này phản ánh giá trị kỳ vọng của tham số sau khi đã kết hợp thông tin từ phân bố tiên nghiệm với dữ liệu quan sát và được xác định theo Công thức (2).

Giá trị trung bình hậu nghiệm có thể được hiểu là kỳ vọng của tham số sau khi đã kết hợp tất cả các thông tin tiên nghiệm và dữ liệu quan sát. Trong nhiều nghiên cứu, đây cũng là giá trị được báo cáo như hệ số hồi quy chính của mô hình Bayes.

Giá trị trung bình hậu nghiệm có ưu điểm là tận dụng toàn bộ thông tin chứa trong phân bố hậu nghiệm, thay vì chỉ dựa trên một giá trị đặc trưng duy nhất như nhiều phương pháp ước lượng khác. Nhờ đó, khi phân bố hậu nghiệm có dạng đối xứng, giá trị trung bình thường phản ánh khá chính xác vị trí trung tâm của phân bố và được sử dụng rộng rãi để tóm tắt kết quả phân tích.

Mặc dù giá trị trung bình hậu nghiệm là đại lượng được sử dụng phổ biến nhất, khả năng đại diện của nó vẫn phụ thuộc vào đặc điểm của phân bố hậu nghiệm. Khi phân bố có dạng lệch hoặc xuất hiện nhiều đỉnh, giá trị trung bình có thể nằm ở vị trí không phản ánh đúng vùng tập trung xác suất cao nhất. Trong những tình huống như vậy, trung vị hậu nghiệm hoặc mode hậu nghiệm thường được xem là những đại lượng tóm tắt phù hợp hơn để mô tả tham số cần quan tâm.

𝟑.𝟓. 𝐓𝐫𝐮𝐧𝐠 𝐯𝐢̣ 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Trung vị hậu nghiệm là giá trị chia phân bố hậu nghiệm thành hai phần bằng nhau, nghĩa là xác suất để tham số nhỏ hơn trung vị bằng xác suất để tham số lớn hơn trung vị. Khái niệm này được trình bày trong Công thức (3).

So với giá trị trung bình, trung vị ít bị ảnh hưởng bởi các giá trị ngoại lai hoặc các phân bố bất đối xứng. Vì vậy, trong các mô hình có phân bố hậu nghiệm lệch, nhiều nhà nghiên cứu lựa chọn báo cáo trung vị thay cho giá trị trung bình.

Trong thực hành nghiên cứu y học, giá trị trung bình hậu nghiệm và trung vị hậu nghiệm thường cho kết quả tương đối gần nhau khi phân bố hậu nghiệm có dạng gần chuẩn và đối xứng. Sự khác biệt giữa hai đại lượng này trở nên đáng chú ý hơn trong các nghiên cứu có cỡ mẫu nhỏ hoặc khi sử dụng các mô hình phức tạp làm cho phân bố hậu nghiệm có dạng lệch hoặc bất đối xứng. Trong những trường hợp đó, việc xem xét đồng thời cả giá trị trung bình và trung vị hậu nghiệm có thể cung cấp cái nhìn đầy đủ hơn về đặc điểm của phân bố và hỗ trợ việc diễn giải kết quả một cách thận trọng hơn.

𝟑.𝟔. 𝐌𝐨𝐝𝐞 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Mode hậu nghiệm, hay còn gọi là ước lượng cực đại hậu nghiệm (Maximum A Posteriori – MAP), là giá trị của tham số tương ứng với mật độ xác suất lớn nhất trên phân bố hậu nghiệm và được trình bày trong Công thức (4). Trong trường hợp phân bố tiên nghiệm là phân bố đều (uniform prior), ước lượng MAP sẽ trùng với ước lượng cực đại hóa hàm hợp lý trong thống kê tần suất. Đối với phần lớn các bài toán thực tế, giá trị MAP được xác định đồng thời bởi thông tin từ dữ liệu quan sát và thông tin chứa trong phân bố tiên nghiệm.

Mặc dù có thể được tính toán tương đối thuận tiện trong một số mô hình đơn giản, ước lượng MAP chỉ phản ánh vị trí có mật độ xác suất hậu nghiệm lớn nhất mà không sử dụng toàn bộ thông tin của phân bố hậu nghiệm. Vì vậy, khi mục tiêu là mô tả đầy đủ mức độ không chắc chắn của tham số, việc chỉ báo cáo MAP thường chưa đủ. Trong nhiều nghiên cứu hiện đại, giá trị trung bình hậu nghiệm được sử dụng phổ biến hơn do tận dụng toàn bộ phân bố hậu nghiệm và cung cấp cái nhìn toàn diện hơn về tham số cần ước lượng.

𝟑.𝟕. 𝐊𝐡𝐨𝐚̉𝐧𝐠 𝐭𝐢𝐧 𝐜𝐚̣̂𝐲 𝐁𝐚𝐲𝐞𝐬

Một trong những khái niệm thường gây nhầm lẫn giữa thống kê Bayes và thống kê tần suất là khoảng tin cậy.

Trong thống kê Bayes, khoảng tin cậy Bayes (credible interval) được xây dựng trực tiếp từ phân bố hậu nghiệm theo Công thức (5).

Giả sử khoảng tin cậy Bayes 95% của hệ số hồi quy đối với BMI là từ 0,45 đến 1,12. Điều này có nghĩa rằng, sau khi đã kết hợp thông tin tiên nghiệm và dữ liệu nghiên cứu, có 95% xác suất để giá trị thực của hệ số hồi quy nằm trong khoảng này.

Đây là cách diễn giải hoàn toàn hợp lệ theo khuôn khổ Bayes và khác với khoảng tin cậy 95% của thống kê tần suất. Chính sự khác biệt này làm cho kết quả của hồi quy Bayes trở nên dễ hiểu hơn đối với các bác sĩ lâm sàng và những người không chuyên sâu về thống kê.

Khoảng tin cậy Bayes không chỉ cung cấp thông tin về vị trí có khả năng xuất hiện của tham số mà còn phản ánh mức độ không chắc chắn đi kèm với ước lượng đó. Mức độ chính xác của ước lượng có thể được đánh giá thông qua độ rộng của khoảng tin cậy: khoảng càng hẹp cho thấy dữ liệu cung cấp nhiều thông tin hơn về tham số và mức độ không chắc chắn càng thấp, trong khi khoảng rộng cho thấy bằng chứng hiện có vẫn chưa đủ để xác định chính xác giá trị của tham số quan tâm.

𝟑.𝟖. 𝐗𝐚́𝐜 𝐬𝐮𝐚̂́𝐭 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 𝐜𝐮̉𝐚 𝐠𝐢𝐚̉ 𝐭𝐡𝐮𝐲𝐞̂́𝐭

Một ưu điểm quan trọng khác của suy luận Bayes là khả năng tính trực tiếp xác suất của các giả thuyết.

Trong thống kê tần suất, không thể phát biểu rằng H₀ hoặc H₁ đúng với một xác suất cụ thể. Giá trị p chỉ cho biết xác suất quan sát được dữ liệu hiện tại hoặc dữ liệu cực đoan hơn trong trường hợp H₀ là đúng, chứ không cung cấp xác suất để một giả thuyết đúng hay sai.

Cách tiếp cận Bayes cho phép trả lời trực tiếp những câu hỏi về xác suất của giả thuyết sau khi đã quan sát dữ liệu. Bằng việc kết hợp thông tin tiên nghiệm với bằng chứng thực nghiệm, nhà nghiên cứu có thể ước lượng xác suất hậu nghiệm của các giả thuyết và diễn giải kết quả dưới dạng xác suất một cách trực tiếp và trực quan hơn.

𝐕𝐢́ 𝐝𝐮̣, nếu kết quả phân tích cho thấy xác suất hậu nghiệm để hệ số hồi quy của cholesterol lớn hơn 0 bằng 99,6%, nhà nghiên cứu có thể kết luận rằng bằng chứng hiện tại rất mạnh ủng hộ giả thuyết cholesterol làm tăng huyết áp tâm thu.

Khả năng diễn giải trực tiếp theo xác suất là một trong những lý do khiến thống kê Bayes ngày càng được áp dụng rộng rãi trong nghiên cứu y học, đặc biệt trong các thử nghiệm lâm sàng và các nghiên cứu phục vụ ra quyết định điều trị.

𝟑.𝟗. 𝐁𝐚𝐲𝐞𝐬 𝐅𝐚𝐜𝐭𝐨𝐫 𝐭𝐫𝐨𝐧𝐠 𝐬𝐮𝐲 𝐥𝐮𝐚̣̂𝐧 𝐁𝐚𝐲𝐞𝐬

Bên cạnh việc sử dụng phân bố hậu nghiệm để mô tả mức độ không chắc chắn của các tham số, thống kê Bayes còn cung cấp một công cụ quan trọng để so sánh các giả thuyết hoặc các mô hình, đó là Bayes Factor (BF). Khái niệm này được Kass và Raftery (1995) phát triển và hiện được xem là một trong những tiêu chuẩn quan trọng nhất để đánh giá mức độ bằng chứng trong thống kê Bayes.

Về bản chất, Bayes Factor biểu thị tỷ số giữa xác suất quan sát được dữ liệu dưới hai mô hình hoặc hai giả thuyết cạnh tranh và được tính theo Công thức (6).

Giả sử cần so sánh hai giả thuyết:

• H₀: hệ số hồi quy của BMI bằng 0, nghĩa là BMI không có ảnh hưởng đến huyết áp tâm thu.

• H₁: hệ số hồi quy của BMI khác 0, nghĩa là BMI có ảnh hưởng đến huyết áp tâm thu.

Bayes Factor cung cấp thước đo mức độ mà dữ liệu quan sát ủng hộ giả thuyết này so với giả thuyết kia. Khi Bayes Factor lớn hơn 1, bằng chứng từ dữ liệu nghiêng về phía H₁ hơn H₀; khi Bayes Factor nhỏ hơn 1, dữ liệu lại phù hợp với H₀ hơn H₁. Mức độ ủng hộ này tăng dần khi giá trị của Bayes Factor ngày càng xa 1, cho thấy bằng chứng trở nên mạnh hơn theo một trong hai hướng.

Một ưu điểm nổi bật của Bayes Factor là có thể cung cấp bằng chứng ủng hộ giả thuyết không. Đây là điểm mà kiểm định giả thuyết theo trường phái tần suất không thực hiện được. Trong thống kê tần suất, khi p > 0,05, nhà nghiên cứu chỉ có thể kết luận "không đủ bằng chứng để bác bỏ H₀", chứ không thể kết luận H₀ được dữ liệu ủng hộ. Trong khi đó, nếu Bayes Factor cho thấy dữ liệu nghiêng mạnh về H₀, nhà nghiên cứu có thể phát biểu rằng dữ liệu cung cấp bằng chứng ủng hộ giả thuyết không.

Đặc điểm này có ý nghĩa thực tiễn rất lớn trong nghiên cứu y học. 𝐕𝐢́ 𝐝𝐮̣, khi đánh giá tính tương đương giữa hai phương pháp điều trị hoặc chứng minh một thuốc mới không kém hơn thuốc chuẩn, việc lượng hóa bằng chứng ủng hộ H₀ có giá trị hơn nhiều so với việc chỉ dựa vào giá trị p.

Theo Kass và Raftery (1995), Bayes Factor thường được diễn giải theo một số ngưỡng quy ước nhằm hỗ trợ đánh giá mức độ bằng chứng mà dữ liệu cung cấp cho các giả thuyết cạnh tranh (xem Bảng 2). Các ngưỡng này chủ yếu đóng vai trò như những mốc tham khảo giúp việc diễn giải kết quả trở nên thuận tiện hơn. Trên thực tế, Bayes Factor là một đại lượng liên tục phản ánh mức độ ủng hộ của dữ liệu đối với các giả thuyết đang được so sánh, vì vậy việc diễn giải nên dựa trên giá trị cụ thể của Bayes Factor thay vì xem các ngưỡng quy ước như những ranh giới tuyệt đối để phân loại bằng chứng.

𝟑.𝟏𝟎. 𝐕𝐚𝐢 𝐭𝐫𝐨̀ 𝐜𝐮̉𝐚 𝐬𝐮𝐲 𝐥𝐮𝐚̣̂𝐧 𝐁𝐚𝐲𝐞𝐬 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐲 𝐡𝐨̣𝐜

Một trong những lý do khiến thống kê Bayes ngày càng được quan tâm trong nghiên cứu y học là khả năng hỗ trợ quá trình ra quyết định trong điều kiện còn tồn tại sự không chắc chắn.

Trong thực hành lâm sàng, các quyết định điều trị thường phải được đưa ra trong điều kiện thông tin còn chưa đầy đủ và bằng chứng khoa học được tích lũy dần qua nhiều nghiên cứu khác nhau. Mỗi nghiên cứu chỉ đóng góp một phần vào hiểu biết chung về hiệu quả điều trị hoặc cơ chế bệnh sinh, khiến quá trình ra quyết định luôn phải dựa trên việc tổng hợp và cập nhật liên tục các nguồn bằng chứng sẵn có. Chính đặc điểm này làm cho suy luận Bayes trở nên phù hợp trong y học, bởi phương pháp cho phép kết hợp các bằng chứng mới với những thông tin đã có trước đó để hỗ trợ quá trình đánh giá và ra quyết định.

𝐕𝐢́ 𝐝𝐮̣, quá trình đánh giá một thuốc điều trị tăng huyết áp mới thường diễn ra qua nhiều giai đoạn nghiên cứu kế tiếp nhau. Các nghiên cứu tiền lâm sàng cung cấp những bằng chứng ban đầu về cơ chế tác dụng của thuốc, trong khi các thử nghiệm lâm sàng giai đoạn II bổ sung thông tin về hiệu quả và độ an toàn trên một số lượng bệnh nhân còn hạn chế. Khi nghiên cứu được mở rộng sang giai đoạn III, những bằng chứng đã tích lũy từ các giai đoạn trước có thể được sử dụng làm thông tin tiên nghiệm để phân tích dữ liệu mới. Phân bố hậu nghiệm thu được sau khi hoàn thành thử nghiệm giai đoạn III vì vậy phản ánh không chỉ dữ liệu của nghiên cứu hiện tại mà còn toàn bộ khối lượng bằng chứng đã được tích lũy trước đó về hiệu quả của thuốc.

Cách tiếp cận này tương đồng với phương thức hình thành tri thức trong y học, nơi hiểu biết khoa học được xây dựng dần thông qua sự bổ sung và cập nhật liên tục của các nghiên cứu mới. Thống kê Bayes vì vậy không xem mỗi nghiên cứu như một thực thể tách biệt mà đặt chúng trong một quá trình tích lũy bằng chứng liên tục, trong đó kết quả của nghiên cứu trước trở thành nền tảng cho việc diễn giải và phân tích các nghiên cứu tiếp theo.

Ngoài thử nghiệm lâm sàng, suy luận Bayes còn được ứng dụng rộng rãi trong nghiên cứu chẩn đoán, tiên lượng bệnh, mô hình dự báo nguy cơ và đánh giá công nghệ y tế. Trong tất cả các lĩnh vực này, khả năng lượng hóa xác suất của các giả thuyết và tích hợp nhiều nguồn bằng chứng đã tạo nên ưu thế của phương pháp Bayes so với nhiều phương pháp truyền thống.

𝐕𝐢́ 𝐝𝐮̣ 3. Suy luận Bayes trong nghiên cứu tăng huyết áp

Một nhóm nghiên cứu tiến hành khảo sát 150 bệnh nhân tăng huyết áp nhằm đánh giá ảnh hưởng của tuổi, chỉ số khối cơ thể và nồng độ cholesterol toàn phần đến huyết áp tâm thu.

Các nghiên cứu trước đây đã chỉ ra rằng tuổi và BMI đều có mối liên quan thuận với huyết áp. Dựa trên những bằng chứng này, nhóm nghiên cứu xây dựng phân bố tiên nghiệm thông tin yếu cho các hệ số hồi quy của hai biến nói trên. Đối với cholesterol, do kết quả từ các nghiên cứu trước còn chưa thống nhất, phân bố tiên nghiệm ít thông tin được lựa chọn để dữ liệu của nghiên cứu hiện tại giữ vai trò lớn hơn trong quá trình suy luận.

Việc kết hợp dữ liệu quan sát với các phân bố tiên nghiệm theo Định lý Bayes cho phép xây dựng phân bố hậu nghiệm cho từng hệ số hồi quy, qua đó đánh giá đồng thời giá trị ước lượng và mức độ không chắc chắn của các tham số nghiên cứu.

Kết quả cho thấy giá trị trung bình hậu nghiệm của hệ số hồi quy đối với BMI lớn hơn 0, khoảng tin cậy Bayes 95% không chứa giá trị 0 và xác suất hậu nghiệm để hệ số này dương đạt trên 99%. Đối với cholesterol, khoảng tin cậy Bayes rộng hơn và xác suất hậu nghiệm để hệ số lớn hơn 0 chỉ đạt khoảng 82%, phản ánh mức độ bằng chứng còn hạn chế.

Nếu sử dụng hồi quy tuyến tính cổ điển, kết luận thường chỉ dừng lại ở việc BMI có ý nghĩa thống kê còn cholesterol không có ý nghĩa thống kê theo một ngưỡng định trước. Phân tích Bayes cung cấp một cách nhìn chi tiết hơn bằng cách lượng hóa trực tiếp mức độ chắc chắn của từng mối liên quan, thay vì quy các kết quả về hai nhóm đơn giản là “có ý nghĩa” hoặc “không có ý nghĩa”.

𝐕𝐢́ 𝐝𝐮̣ này cho thấy một ưu điểm quan trọng của suy luận Bayes: mọi kết luận đều được biểu diễn trên một thang xác suất liên tục, phản ánh đúng bản chất của bằng chứng khoa học thay vì tạo ra một ranh giới cứng tại mức p = 0,05.

Tóm lại: Suy luận Bayes là nền tảng của hồi quy tuyến tính Bayes và là điểm khác biệt cơ bản so với phương pháp suy luận của trường phái tần suất. Thông qua việc kết hợp phân bố tiên nghiệm với dữ liệu quan sát, quá trình suy luận tạo ra phân bố hậu nghiệm, từ đó cho phép tính toán các đại lượng thống kê như giá trị trung bình hậu nghiệm, trung vị hậu nghiệm, mode hậu nghiệm, khoảng tin cậy Bayes và xác suất hậu nghiệm của các giả thuyết. Ngoài ra, Bayes Factor cung cấp một công cụ mạnh để so sánh các giả thuyết hoặc các mô hình, đồng thời cho phép lượng hóa mức độ bằng chứng theo cách mà các phương pháp thống kê truyền thống không thực hiện được.

Một điểm cần nhấn mạnh là suy luận Bayes không chỉ là một kỹ thuật tính toán mà còn là một khuôn khổ tư duy thống kê, trong đó tri thức khoa học được xem là luôn có thể cập nhật khi xuất hiện bằng chứng mới. Chính đặc điểm này khiến phương pháp Bayes đặc biệt phù hợp với nghiên cứu y học, nơi các quyết định lâm sàng và chính sách y tế luôn được xây dựng trên cơ sở tổng hợp và cập nhật liên tục các bằng chứng khoa học.