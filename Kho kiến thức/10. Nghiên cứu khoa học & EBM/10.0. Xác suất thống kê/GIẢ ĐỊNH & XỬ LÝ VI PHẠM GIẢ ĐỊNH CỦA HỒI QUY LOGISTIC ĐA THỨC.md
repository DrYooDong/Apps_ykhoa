𝐂𝐚́𝐜 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐯𝐚̀ 𝐱𝐮̛̉ 𝐥𝐲́ 𝐯𝐢 𝐩𝐡𝐚̣𝐦 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐜𝐮̉𝐚 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜: 𝐏𝐡𝐚̂̀𝐧 𝟑- 𝐇𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜 đ𝐨̂́𝐢 𝐯𝐨̛́𝐢 𝐛𝐢𝐞̂́𝐧 𝐤𝐞̂́𝐭 𝐜𝐮̣𝐜 𝐝𝐚𝐧𝐡 𝐧𝐠𝐡𝐢̃𝐚

TS. Đào Hồng Nam

𝟑.𝟓. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐦𝐮̛́𝐜 đ𝐨̣̂ 𝐩𝐡𝐮̀ 𝐡𝐨̛̣𝐩 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Sau khi các tham số của mô hình được ước lượng và ý nghĩa thống kê của mô hình được kiểm định, quá trình phân tích vẫn chưa kết thúc vì một mô hình có ý nghĩa thống kê chưa chắc đã phản ánh đầy đủ cấu trúc của dữ liệu hoặc có khả năng dự báo tốt trong thực tế. Một mô hình có thể cho thấy mối liên quan rõ ràng giữa các biến độc lập và biến kết cục nhưng vẫn tồn tại tình trạng phù hợp kém với dữ liệu quan sát hoặc hoạt động không ổn định khi áp dụng cho những đối tượng khác ngoài mẫu nghiên cứu. Chính vì vậy, việc đánh giá mức độ phù hợp của mô hình là một bước không thể thiếu trước khi diễn giải các hệ số hồi quy, tỷ số nguy cơ tương đối và các xác suất dự báo được tạo ra từ mô hình (Hosmer et al., 2013).

Đối với hồi quy logistic đa thức, việc đánh giá mô hình thường phức tạp hơn so với hồi quy tuyến tính vì không tồn tại một chỉ số duy nhất có vai trò tương đương hệ số xác định R² để phản ánh toàn diện chất lượng mô hình. Mỗi chỉ số đánh giá chỉ cung cấp thông tin về một khía cạnh nhất định, chẳng hạn như mức độ phù hợp với dữ liệu, sự cân bằng giữa độ phù hợp và độ phức tạp của mô hình hoặc khả năng áp dụng cho các quần thể khác. Vì lý do đó, việc đánh giá cần dựa trên nhiều tiêu chí bổ sung cho nhau thay vì chỉ tập trung vào một chỉ số riêng lẻ. Những tiêu chí thường được sử dụng bao gồm giá trị −2 Log Likelihood, các hệ số pseudo-R², Akaike Information Criterion (AIC) và Bayesian Information Criterion (BIC). Mối quan hệ giữa các chỉ số này được tóm tắt trong Sơ đồ 2, trong khi đặc điểm và cách diễn giải của từng chỉ số được trình bày trong Bảng 4.

Cách tiếp cận dựa trên nhiều chỉ số giúp nhà nghiên cứu đánh giá mô hình từ nhiều góc độ khác nhau. Chẳng hạn, một mô hình có thể đạt giá trị −2 Log Likelihood thấp và giải thích dữ liệu tốt nhưng lại chứa quá nhiều tham số, làm giảm khả năng khái quát hóa khi áp dụng cho quần thể khác. Ngược lại, một mô hình rất đơn giản có thể dễ diễn giải và ít nguy cơ quá khớp dữ liệu nhưng lại bỏ sót những thông tin quan trọng. Vì vậy, mục tiêu của quá trình đánh giá không phải là tìm mô hình có kết quả tốt nhất trên một chỉ số đơn lẻ mà là lựa chọn mô hình đạt được sự cân bằng hợp lý giữa khả năng mô tả dữ liệu, mức độ đơn giản trong cấu trúc và tiềm năng ứng dụng trong các bối cảnh nghiên cứu hoặc thực hành lâm sàng khác.

𝟑.𝟓.𝟏. 𝐆𝐢𝐚́ 𝐭𝐫𝐢̣ −𝟐 𝐋𝐨𝐠 𝐋𝐢𝐤𝐞𝐥𝐢𝐡𝐨𝐨𝐝

Trong hồi quy logistic đa thức, hàm log-hợp lý được sử dụng để đo lường mức độ phù hợp giữa mô hình và dữ liệu quan sát thông qua xác suất mà mô hình gán cho tập dữ liệu thực tế. Về nguyên tắc, giá trị log-hợp lý càng lớn, hay nói cách khác càng ít âm hơn, thì mô hình càng mô tả dữ liệu tốt hơn. Tuy nhiên, do log-hợp lý thường nhận các giá trị âm và bản thân con số này khó diễn giải về mặt thực tế, các phần mềm thống kê thường chuyển đổi và báo cáo dưới dạng −2 Log Likelihood theo Công thức 8. Việc sử dụng chỉ số này không làm thay đổi bản chất của thông tin chứa trong hàm hợp lý mà giúp quá trình so sánh và kiểm định mô hình trở nên thuận tiện hơn.

Giá trị −2 Log Likelihood càng nhỏ thường cho thấy mức độ phù hợp của mô hình đối với dữ liệu càng cao. Dẫu vậy, ý nghĩa của chỉ số này không nằm ở giá trị tuyệt đối mà chủ yếu nằm ở khả năng so sánh giữa các mô hình được xây dựng trên cùng một tập dữ liệu. Chẳng hạn, một mô hình có −2 Log Likelihood bằng 420 không thể được khẳng định là tốt hay xấu nếu không có một mô hình khác để đối chiếu. Ngược lại, nếu một mô hình rút gọn có −2 Log Likelihood bằng 468 trong khi mô hình đầy đủ có giá trị 420, sự giảm đáng kể của chỉ số này cho thấy việc bổ sung các biến giải thích đã giúp cải thiện mức độ phù hợp của mô hình.

Vì lý do đó, −2 Log Likelihood thường được sử dụng trong các kiểm định so sánh mô hình lồng nhau, đặc biệt là kiểm định tỷ số hợp lý (Likelihood Ratio Test). Trong bối cảnh này, điều quan trọng không phải là giá trị riêng lẻ của từng mô hình mà là mức chênh lệch giữa chúng sau khi thêm hoặc loại bỏ một nhóm biến. Cách tiếp cận này cho phép đánh giá liệu các tham số bổ sung có thực sự giúp mô hình giải thích dữ liệu tốt hơn hay không. Do đó, việc diễn giải −2 Log Likelihood luôn cần được đặt trong mối quan hệ với các mô hình cạnh tranh và kết hợp với các chỉ số khác như pseudo-R², AIC hoặc BIC để có cái nhìn đầy đủ hơn về chất lượng của mô hình.

Khi bổ sung thêm một hoặc nhiều biến độc lập làm giảm đáng kể giá trị −2 Log Likelihood, có thể kết luận rằng các biến mới đã cải thiện khả năng giải thích của mô hình. Mức cải thiện này được đánh giá bằng kiểm định tỷ số hợp lý đã trình bày tại Mục 3.3.

Trong các bài báo quốc tế, giá trị −2 Log Likelihood thường được trình bày cùng với số tham số của mô hình và kết quả kiểm định tỷ số hợp lý nhằm giúp người đọc đánh giá đồng thời độ phù hợp và mức độ cải thiện của mô hình.

𝟑.𝟓.𝟐. 𝐂𝐚́𝐜 𝐡𝐞̣̂ 𝐬𝐨̂́ 𝐱𝐚́𝐜 đ𝐢̣𝐧𝐡 𝐠𝐢𝐚̉

Do biến kết cục trong hồi quy logistic đa thức là biến định tính nên không thể xác định tổng bình phương sai số như trong hồi quy tuyến tính. Vì vậy, nhiều hệ số xác định giả (pseudo-R²) đã được đề xuất nhằm phản ánh mức độ cải thiện của mô hình sau khi bổ sung các biến giải thích (Long & Freese, 2014).

Điểm cần nhấn mạnh là các hệ số pseudo-R² không phải là tỷ lệ biến thiên của biến kết cục được giải thích bởi mô hình. Chúng chỉ phản ánh mức cải thiện của hàm hợp lý so với mô hình chỉ có hệ số chặn. Do đó, không nên diễn giải pseudo-R² giống như R² của hồi quy tuyến tính (Harrell, 2015).

𝐌𝐜𝐅𝐚𝐝𝐝𝐞𝐧 𝐑²

McFadden R² được xây dựng trên cơ sở so sánh log-hợp lý của mô hình đầy đủ với log-hợp lý của mô hình chỉ có hệ số chặn. Công thức xác định được trình bày tại Công thức 9.

Trong các mô hình lựa chọn rời rạc, McFadden R² là chỉ số được sử dụng phổ biến nhất vì có cơ sở lý thuyết rõ ràng và ổn định đối với nhiều loại dữ liệu. Giá trị của McFadden R² thường thấp hơn đáng kể so với R² của hồi quy tuyến tính. Theo McFadden (1974), các giá trị từ khoảng 0,20 đến 0,40 thường phản ánh mô hình có khả năng giải thích tốt.

𝐂𝐨𝐱–𝐒𝐧𝐞𝐥𝐥 𝐑²

Cox–Snell R² được xây dựng từ tỷ số hợp lý giữa mô hình đầy đủ và mô hình rút gọn theo Công thức 10, do đó chỉ số này có nền tảng xác suất tương đối rõ ràng và phản ánh mức độ cải thiện của mô hình khi các biến giải thích được đưa vào phân tích. Khi giá trị Cox–Snell R² tăng lên, mô hình có xu hướng giải thích dữ liệu tốt hơn so với mô hình chỉ bao gồm hệ số chặn. Mặc dù mang ý nghĩa tương tự hệ số xác định trong hồi quy tuyến tính, Cox–Snell R² lại có một hạn chế quan trọng là giá trị cực đại của chỉ số này luôn nhỏ hơn 1 và phụ thuộc vào đặc điểm của bộ dữ liệu nghiên cứu. Ngay cả trong trường hợp mô hình phù hợp rất tốt với dữ liệu quan sát, Cox–Snell R² vẫn không thể đạt tới giá trị 1 tuyệt đối. Vì lý do đó, việc diễn giải trực tiếp giá trị của chỉ số thường không đơn giản và ít mang ý nghĩa thực tiễn nếu xem xét riêng lẻ. Trong các nghiên cứu ứng dụng, Cox–Snell R² chủ yếu được sử dụng như một thước đo tương đối để so sánh các mô hình được xây dựng trên cùng một bộ dữ liệu hơn là để đánh giá mức độ giải thích của mô hình theo cách thường áp dụng đối với hồi quy tuyến tính.

𝐍𝐚𝐠𝐞𝐥𝐤𝐞𝐫𝐤𝐞 𝐑²

Nagelkerke R² là phiên bản hiệu chỉnh của Cox–Snell R² nhằm đưa giới hạn trên của chỉ số về đúng giá trị 1 theo Công thức 11.

Trong thực hành, Nagelkerke R² thường được sử dụng nhiều hơn Cox–Snell R² vì thuận tiện cho việc trình bày kết quả. Tuy nhiên, cần nhấn mạnh rằng ngay cả khi giá trị nằm trong khoảng từ 0 đến 1, Nagelkerke R² vẫn là một hệ số xác định giả và không phản ánh tỷ lệ biến thiên của biến kết cục được giải thích bởi mô hình.

Do mỗi hệ số pseudo-R² được xây dựng trên một nguyên lý khác nhau, các giá trị thu được không thể so sánh trực tiếp giữa các chỉ số. Nhà nghiên cứu nên sử dụng cùng một loại pseudo-R² trong toàn bộ nghiên cứu để bảo đảm tính nhất quán.

𝐕𝐢́ 𝐝𝐮̣ 𝟔. 𝐃𝐢𝐞̂̃𝐧 𝐠𝐢𝐚̉𝐢 𝐜𝐚́𝐜 𝐡𝐞̣̂ 𝐬𝐨̂́ 𝐩𝐬𝐞𝐮𝐝𝐨-𝐑²

Một mô hình hồi quy logistic đa thức được xây dựng nhằm đánh giá các yếu tố liên quan đến lựa chọn phương pháp điều trị suy tim. Kết quả phân tích cho thấy McFadden R² đạt 0,27, Cox–Snell R² đạt 0,34 và Nagelkerke R² đạt 0,41 theo Bảng 5. Các giá trị này đều cho thấy mô hình cải thiện đáng kể khả năng mô tả dữ liệu so với mô hình chỉ bao gồm hệ số chặn, đồng thời phản ánh rằng các biến độc lập được đưa vào phân tích đã đóng góp đáng kể vào mức độ phù hợp chung của mô hình.

Việc diễn giải các hệ số pseudo-R² cần được thực hiện thận trọng vì chúng không mang ý nghĩa tương đương với hệ số xác định R² trong hồi quy tuyến tính. Do đó, giá trị Nagelkerke R² bằng 0,41 không có nghĩa là mô hình giải thích được 41% biến thiên của biến kết cục. Cách hiểu phù hợp hơn là mô hình đạt mức độ cải thiện tương đối tốt so với mô hình rỗng theo tiêu chí của Nagelkerke, cho thấy mô hình có khả năng mô tả dữ liệu ở mức chấp nhận được và đủ cơ sở để tiếp tục được đánh giá thông qua các chỉ số khác như −2 Log Likelihood, AIC, BIC hoặc khả năng dự báo. Việc kết hợp nhiều tiêu chí đánh giá sẽ giúp đưa ra nhận định toàn diện hơn về chất lượng của mô hình thay vì dựa vào một chỉ số riêng lẻ.

𝟑.𝟓.𝟑. 𝐓𝐢𝐞̂𝐮 𝐜𝐡𝐢́ 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐀𝐤𝐚𝐢𝐤𝐞 𝐯𝐚̀ 𝐁𝐚𝐲𝐞𝐬𝐢𝐚𝐧

Trong nhiều nghiên cứu, nhà nghiên cứu thường xây dựng nhiều mô hình với số lượng biến độc lập khác nhau. Khi các mô hình đều có ý nghĩa thống kê, cần lựa chọn mô hình có sự cân bằng tốt nhất giữa mức độ phù hợp và độ phức tạp. Hai tiêu chí được sử dụng phổ biến nhất là Akaike Information Criterion (AIC) và Bayesian Information Criterion (BIC).

AIC được xác định theo Công thức 12. Chỉ số này bổ sung một thành phần phạt đối với số lượng tham số của mô hình nhằm hạn chế hiện tượng quá khớp. Khi so sánh các mô hình được xây dựng trên cùng một bộ dữ liệu, mô hình có giá trị AIC nhỏ hơn thường được ưu tiên (Akaike, 1974).

BIC được xác định theo Công thức 13 và cũng dựa trên nguyên lý cân bằng giữa độ phù hợp và độ phức tạp của mô hình. Tuy nhiên, mức phạt đối với số lượng tham số của BIC lớn hơn AIC và tăng theo kích thước mẫu. Vì vậy, BIC thường ưu tiên các mô hình đơn giản hơn, đặc biệt trong các nghiên cứu có cỡ mẫu lớn (Schwarz, 1978).

Điểm cần lưu ý khi sử dụng AIC và BIC là hai chỉ số này không phải các kiểm định giả thuyết nên không cung cấp p-value cũng như không được sử dụng để đưa ra quyết định bác bỏ hay chấp nhận một giả thuyết thống kê. Vai trò chính của AIC và BIC là hỗ trợ so sánh mức độ phù hợp tương đối giữa các mô hình cạnh tranh được xây dựng trên cùng một bộ dữ liệu và cùng một biến kết cục. Trong bối cảnh đó, mô hình có giá trị AIC hoặc BIC thấp hơn thường được ưu tiên vì đạt được sự cân bằng tốt hơn giữa mức độ phù hợp với dữ liệu và độ phức tạp của mô hình.

Ý nghĩa của hai chỉ số này chỉ xuất hiện khi được đặt trong mối quan hệ so sánh giữa nhiều mô hình khác nhau. Một giá trị AIC bằng 420 hoặc BIC bằng 455 tự thân không cho biết mô hình tốt hay kém, bởi không tồn tại ngưỡng cố định để diễn giải các giá trị này. Chẳng hạn, AIC bằng 420 có thể được xem là tốt hơn AIC bằng 445 trong cùng một nghiên cứu, nhưng hoàn toàn không thể so sánh với AIC của một nghiên cứu khác sử dụng dữ liệu hoặc biến kết cục khác.

Bản thân AIC và BIC cũng không phản ánh trực tiếp khả năng dự báo, ý nghĩa lâm sàng hoặc mức độ phù hợp tuyệt đối của mô hình. Một mô hình có AIC thấp nhất trong số các mô hình được so sánh chỉ cho thấy đó là lựa chọn tốt hơn về mặt tương đối trong tập mô hình đang xem xét chứ không có nghĩa đây là một mô hình tốt theo mọi tiêu chí. Vì vậy, khi trình bày kết quả, giá trị của AIC và BIC cần được diễn giải trong bối cảnh so sánh các mô hình cạnh tranh thay vì được sử dụng như một tiêu chuẩn độc lập để khẳng định chất lượng mô hình.

Trong thực hành, nếu AIC và BIC cùng lựa chọn một mô hình thì quyết định lựa chọn thường có độ tin cậy cao hơn. Trường hợp hai chỉ số đưa ra các lựa chọn khác nhau, cần kết hợp thêm ý nghĩa lâm sàng, mức độ đơn giản của mô hình và mục tiêu nghiên cứu để đưa ra quyết định cuối cùng.

𝐕𝐢́ 𝐝𝐮̣ 𝟕. 𝐒𝐨 𝐬𝐚́𝐧𝐡 𝐜𝐚́𝐜 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐛𝐚̆̀𝐧𝐠 𝐀𝐈𝐂 𝐯𝐚̀ 𝐁𝐈𝐂

Một nghiên cứu xây dựng ba mô hình hồi quy logistic đa thức để phân tích các yếu tố liên quan đến lựa chọn điều trị ở bệnh nhân đái tháo đường type 2. Mô hình thứ nhất chỉ bao gồm các đặc điểm nhân khẩu học, mô hình thứ hai bổ sung các chỉ số xét nghiệm và mô hình thứ ba bổ sung thêm các bệnh đồng mắc. Kết quả cho thấy AIC giảm từ 1184,5 ở mô hình thứ nhất xuống 1168,2 ở mô hình thứ hai, đồng thời BIC cũng giảm từ 1221,8 xuống 1217,4. Sự cải thiện đồng thời của cả hai chỉ số cho thấy việc bổ sung các chỉ số xét nghiệm giúp nâng cao mức độ phù hợp của mô hình đối với dữ liệu. Khi các bệnh đồng mắc được bổ sung vào mô hình thứ ba, AIC tiếp tục giảm xuống 1165,9 nhưng BIC lại tăng lên 1237,8 theo Bảng 6. Điều này cho thấy mặc dù mô hình thứ ba mô tả dữ liệu tốt hơn đôi chút, số lượng tham số tăng thêm làm giảm tính kinh tế của mô hình theo tiêu chí BIC. Trong trường hợp này, mô hình thứ hai được ưu tiên vì đạt được sự cân bằng tốt hơn giữa mức độ phù hợp với dữ liệu và độ phức tạp của mô hình.

𝟑.𝟔. 𝐊𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 𝐜𝐚́𝐜 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Mặc dù hồi quy logistic đa thức có ít giả định hơn so với hồi quy tuyến tính, việc đánh giá các giả định của mô hình vẫn là bước không thể thiếu trước khi diễn giải các hệ số hồi quy và xác suất dự báo. Các giả định này ảnh hưởng trực tiếp đến tính không chệch, tính hiệu quả và khả năng suy luận thống kê của các tham số ước lượng. Nếu một hoặc nhiều giả định bị vi phạm nghiêm trọng, các kết luận rút ra từ mô hình có thể không còn đáng tin cậy mặc dù các kiểm định thống kê vẫn cho kết quả có ý nghĩa (Hosmer et al., 2013).

Trong thực hành, bốn nhóm giả định cần được xem xét gồm: tính độc lập của các quan sát, tính độc lập của các lựa chọn không liên quan, đa cộng tuyến giữa các biến độc lập và mối quan hệ giữa biến định lượng liên tục với logit. Các giả định này được tổng hợp trong Bảng 7.

𝟑.𝟔.𝟏. 𝐓𝐢́𝐧𝐡 đ𝐨̣̂𝐜 𝐥𝐚̣̂𝐩 𝐜𝐮̉𝐚 𝐜𝐚́𝐜 𝐪𝐮𝐚𝐧 𝐬𝐚́𝐭

Tính độc lập giữa các quan sát là một trong những giả định nền tảng của hồi quy logistic đa thức, theo đó mỗi đối tượng nghiên cứu được xem là một đơn vị quan sát riêng biệt và sự xuất hiện của một đối tượng trong mẫu không được ảnh hưởng đến xác suất xảy ra kết cục ở đối tượng khác. Giả định này bảo đảm các ước lượng về sai số chuẩn, khoảng tin cậy và kiểm định thống kê được tính toán chính xác, từ đó giúp các kết luận rút ra từ mô hình có độ tin cậy cao.

Trong phần lớn các nghiên cứu cắt ngang hoặc nghiên cứu bệnh–chứng được thực hiện bằng phương pháp chọn mẫu ngẫu nhiên, tính độc lập thường được bảo đảm tương đối tốt vì các đối tượng được tuyển chọn riêng rẽ và không có mối liên hệ trực tiếp với nhau. Ngược lại, khi dữ liệu được thu thập trong các nghiên cứu đa trung tâm, nghiên cứu theo cụm hoặc nghiên cứu trên các thành viên của cùng một gia đình, các quan sát thường chia sẻ những đặc điểm chung về môi trường, di truyền hoặc quy trình chăm sóc. Sự tương đồng này tạo ra tương quan giữa các quan sát và làm cho giả định độc lập không còn được đáp ứng đầy đủ.

Hệ quả của việc bỏ qua cấu trúc phụ thuộc trong dữ liệu không nhất thiết xuất hiện ở các hệ số hồi quy mà thường thể hiện ở sai số chuẩn và các kiểm định thống kê. Khi mức độ tương quan giữa các quan sát không được tính đến, sai số chuẩn có xu hướng bị đánh giá thấp, khoảng tin cậy trở nên hẹp hơn thực tế và nguy cơ kết luận sai về ý nghĩa thống kê của các biến nghiên cứu tăng lên đáng kể (McCullagh & Nelder, 1989).

Vì vậy, trước khi lựa chọn mô hình phân tích, nhà nghiên cứu cần xem xét liệu dữ liệu có được tổ chức theo cấu trúc phân cấp hoặc theo cụm hay không. Trong trường hợp các bệnh nhân được lồng trong bệnh viện, học sinh được lồng trong trường học hoặc các thành viên thuộc cùng một gia đình, hồi quy logistic đa mức thường là lựa chọn phù hợp để mô hình hóa đồng thời ảnh hưởng của các cấp độ khác nhau. Đối với những nghiên cứu tập trung vào ước lượng ảnh hưởng trung bình của quần thể và cần hiệu chỉnh sự phụ thuộc giữa các quan sát trong cùng một cụm, phương trình ước lượng tổng quát (Generalized Estimating Equations – GEE) thường được sử dụng. Việc lựa chọn phương pháp nào phụ thuộc vào câu hỏi nghiên cứu, thiết kế thu thập dữ liệu và mục tiêu suy luận thống kê hơn là chỉ dựa trên đặc điểm của phần mềm phân tích.

𝟑.𝟔.𝟐. 𝐆𝐢𝐚̉ đ𝐢̣𝐧𝐡 đ𝐨̣̂𝐜 𝐥𝐚̣̂𝐩 𝐜𝐮̉𝐚 𝐜𝐚́𝐜 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐥𝐢𝐞̂𝐧 𝐪𝐮𝐚𝐧

Giả định đặc trưng và quan trọng nhất của hồi quy logistic đa thức là giả định độc lập của các lựa chọn không liên quan (Independence of Irrelevant Alternatives, IIA). Theo giả định này, tỷ số giữa xác suất lựa chọn của hai nhóm kết cục bất kỳ không bị ảnh hưởng bởi sự xuất hiện hoặc loại bỏ của các nhóm kết cục còn lại (Train, 2009).

Về bản chất, giả định IIA phát sinh từ giả thiết rằng các sai số ngẫu nhiên của các phương trình logit độc lập và tuân theo phân phối cực trị loại I. Khi giả định này được thỏa mãn, việc bổ sung hoặc loại bỏ một nhóm kết cục không làm thay đổi mối quan hệ tương đối giữa hai nhóm còn lại.

Giả định IIA thường phù hợp khi các nhóm kết cục đại diện cho những lựa chọn thực sự khác biệt. Ngược lại, nếu các nhóm có đặc điểm gần giống nhau hoặc có khả năng thay thế lẫn nhau, giả định này có thể bị vi phạm.

Ví dụ, trong nghiên cứu lựa chọn phương pháp điều trị tăng huyết áp, hai nhóm thuốc ức chế men chuyển và thuốc chẹn thụ thể angiotensin II có cơ chế tác dụng tương đối giống nhau. Nếu một trong hai nhóm bị loại khỏi mô hình, xác suất lựa chọn nhóm còn lại có thể thay đổi đáng kể. Khi đó, giả định IIA có thể không còn phù hợp.

𝟑.𝟔.𝟑. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐈𝐈𝐀

Hai phương pháp được sử dụng phổ biến nhất để đánh giá giả định IIA là kiểm định Hausman–McFadden và kiểm định Small–Hsiao.

𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐇𝐚𝐮𝐬𝐦𝐚𝐧–𝐌𝐜𝐅𝐚𝐝𝐝𝐞𝐧

Kiểm định Hausman–McFadden đánh giá sự khác biệt giữa các hệ số hồi quy của mô hình đầy đủ và mô hình sau khi loại bỏ một nhóm kết cục. Thống kê kiểm định được xác định theo Công thức 14 (Hausman & McFadden, 1984).

Giả thuyết thống kê được phát biểu như sau:

H₀: Giả định IIA được thỏa mãn.

H₁: Giả định IIA bị vi phạm.

Nếu p ≥ α, chưa có đủ bằng chứng để bác bỏ H₀. Khi đó, mô hình được xem là phù hợp với giả định IIA.

Ngược lại, nếu p < α, có bằng chứng thống kê cho thấy giả định IIA có thể không được đáp ứng và cần xem xét các mô hình thay thế.

Mặc dù được sử dụng rộng rãi, kiểm định Hausman–McFadden có thể gặp khó khăn khi ma trận hiệp phương sai gần suy biến hoặc khi số lượng quan sát của một nhóm kết cục quá nhỏ. Trong những trường hợp này, thống kê kiểm định đôi khi nhận giá trị âm hoặc không xác định, làm hạn chế khả năng diễn giải (Long & Freese, 2014).

𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐒𝐦𝐚𝐥𝐥–𝐇𝐬𝐢𝐚𝐨

Kiểm định Small–Hsiao dựa trên việc chia ngẫu nhiên bộ dữ liệu thành hai phần độc lập, sau đó so sánh log-hợp lý của mô hình trước và sau khi loại bỏ từng nhóm kết cục. Quy trình thực hiện được minh họa trong Sơ đồ 3.

Ưu điểm của kiểm định Small–Hsiao nằm ở khả năng hạn chế một số khó khăn về mặt tính toán thường gặp ở kiểm định Hausman–McFadden, đặc biệt trong những trường hợp ma trận hiệp phương sai không xác định hoặc kết quả kiểm định thiếu ổn định. Phương pháp này đánh giá giả định độc lập của các lựa chọn không liên quan (Independence of Irrelevant Alternatives – IIA) thông qua việc chia dữ liệu thành các mẫu con, sau đó so sánh các ước lượng thu được khi một nhóm kết cục bị loại khỏi mô hình. Cách tiếp cận này giúp kiểm định hoạt động ổn định hơn trong nhiều tình huống thực tế. Do quy trình kiểm định phụ thuộc vào bước chia mẫu ngẫu nhiên, kết quả thu được có thể thay đổi giữa các lần thực hiện trên cùng một bộ dữ liệu. Nhiều tác giả vì vậy khuyến nghị lặp lại phép kiểm định với các cách chia dữ liệu khác nhau nhằm đánh giá mức độ nhất quán của kết quả và tránh đưa ra kết luận chỉ dựa trên một lần phân tích duy nhất (Small & Hsiao, 1985).

Trong thực hành, hai kiểm định này nên được xem là công cụ hỗ trợ thay vì tiêu chuẩn duy nhất để quyết định mô hình có phù hợp hay không. Việc đánh giá cần kết hợp với hiểu biết về bản chất của biến kết cục và cơ chế hình thành các lựa chọn trong nghiên cứu.

𝐕𝐢́ 𝐝𝐮̣ 𝟖. 𝐊𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐈𝐈𝐀

Một nghiên cứu trên 1.364 bệnh nhân rung nhĩ được thực hiện nhằm xác định các yếu tố liên quan đến lựa chọn thuốc chống đông đường uống, trong đó biến kết cục được chia thành ba nhóm gồm warfarin, thuốc chống đông đường uống trực tiếp và không sử dụng thuốc chống đông. Sau khi xây dựng mô hình hồi quy logistic đa thức, nhóm nghiên cứu đánh giá giả định độc lập của các lựa chọn không liên quan (Independence of Irrelevant Alternatives – IIA) bằng kiểm định Hausman–McFadden. Quá trình kiểm định được tiến hành bằng cách lần lượt loại bỏ từng nhóm kết cục và so sánh các hệ số hồi quy thu được với mô hình đầy đủ. Kết quả trình bày trong Bảng 8 cho thấy tất cả các phép kiểm định đều có p ≥ 0,05, đồng nghĩa với việc chưa có đủ bằng chứng thống kê để bác bỏ giả thuyết H₀. Trên phương diện thống kê, mô hình vì thế được xem là đáp ứng giả định IIA.

Dù kết quả kiểm định không cho thấy dấu hiệu vi phạm giả định, việc đánh giá IIA không chỉ dựa trên giá trị p. Nhóm nghiên cứu lưu ý rằng warfarin và thuốc chống đông đường uống trực tiếp đều là các lựa chọn điều trị chống đông được cân nhắc trong cùng một bối cảnh lâm sàng, nên quyết định sử dụng nhóm thuốc này có thể không hoàn toàn độc lập như giả định lý thuyết của mô hình. Nhận định đó khiến kết quả kiểm định được xem như một nguồn bằng chứng hỗ trợ hơn là cơ sở duy nhất để khẳng định tính phù hợp của mô hình. Nhằm đánh giá thêm độ ổn định của các kết quả thu được, nhóm nghiên cứu tiếp tục thực hiện các phân tích độ nhạy và đối chiếu kết quả giữa các mô hình khác nhau. Cách tiếp cận này phù hợp với quan điểm của Train (2009) và Harrell (2015), theo đó các kiểm định thống kê cần được diễn giải trong bối cảnh chuyên môn và hiểu biết về cơ chế lâm sàng của vấn đề nghiên cứu thay vì được xem như một tiêu chuẩn độc lập để đưa ra kết luận.

𝟑.𝟔.𝟒. Đ𝐚 𝐜𝐨̣̂𝐧𝐠 𝐭𝐮𝐲𝐞̂́𝐧 𝐠𝐢𝐮̛̃𝐚 𝐜𝐚́𝐜 𝐛𝐢𝐞̂́𝐧 đ𝐨̣̂𝐜 𝐥𝐚̣̂𝐩

Mức độ tương quan giữa các biến độc lập cũng là một vấn đề cần được xem xét trong quá trình xây dựng hồi quy logistic đa thức vì sự hiện diện của đa cộng tuyến có thể ảnh hưởng trực tiếp đến độ ổn định của các ước lượng. Khi hai hoặc nhiều biến cung cấp những thông tin gần như trùng lặp cho mô hình, việc tách riêng ảnh hưởng của từng biến trở nên khó khăn hơn, làm cho sai số chuẩn của các hệ số hồi quy tăng lên và khoảng tin cậy trở nên rộng hơn.

Khác với hồi quy tuyến tính, đa cộng tuyến không làm cho các hệ số hồi quy bị chệch hay làm sai lệch giá trị ước lượng của mô hình. Tác động chủ yếu của hiện tượng này nằm ở việc làm giảm độ chính xác của các ước lượng, khiến các kiểm định thống kê mất sức mạnh và làm giảm khả năng phát hiện những mối liên quan thực sự giữa biến độc lập và biến kết cục. Trong một số trường hợp, các hệ số hồi quy có thể thay đổi đáng kể khi thêm hoặc loại bỏ một biến có tương quan cao, mặc dù mức độ phù hợp chung của mô hình gần như không thay đổi.

Hiện tượng này thường gặp trong nghiên cứu Y–Dược khi nhiều biến cùng phản ánh một đặc điểm sinh học hoặc lâm sàng tương tự.

Chẳng hạn, cân nặng, chỉ số khối cơ thể (BMI) và vòng eo thường có tương quan cao với nhau; tương tự, glucose huyết tương lúc đói và HbA1c đều phản ánh tình trạng kiểm soát đường huyết. Khi các biến như vậy được đưa đồng thời vào mô hình, khả năng phân biệt ảnh hưởng riêng của từng biến có thể giảm đáng kể mặc dù mức độ phù hợp chung của mô hình gần như không thay đổi.

Việc đánh giá đa cộng tuyến vì thế thường được thực hiện trước khi xây dựng mô hình chính thức nhằm phát hiện những biến có khả năng làm mất ổn định quá trình ước lượng. Các chỉ số thường được sử dụng cho mục đích này được trình bày trong Bảng 9. Khi phát hiện đa cộng tuyến ở mức độ nghiêm trọng, nhà nghiên cứu có thể cân nhắc loại bỏ một trong các biến có tương quan cao, lựa chọn biến có ý nghĩa lâm sàng phù hợp hơn hoặc kết hợp các biến phản ánh cùng một khái niệm thành một chỉ số tổng hợp nếu có cơ sở khoa học hỗ trợ. Cách xử lý phù hợp không chỉ giúp cải thiện độ ổn định của mô hình mà còn làm cho việc diễn giải các hệ số hồi quy trở nên rõ ràng và đáng tin cậy hơn.

𝟑.𝟔.𝟓. 𝐐𝐮𝐚𝐧 𝐡𝐞̣̂ 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐠𝐢𝐮̛̃𝐚 𝐛𝐢𝐞̂́𝐧 𝐥𝐢𝐞̂𝐧 𝐭𝐮̣𝐜 𝐯𝐚̀ 𝐥𝐨𝐠𝐢𝐭

Đối với các biến định lượng liên tục, hồi quy logistic đa thức giả định rằng logit của xác suất có quan hệ tuyến tính với biến giải thích. Điều này không đồng nghĩa với việc xác suất có quan hệ tuyến tính với biến độc lập mà chỉ yêu cầu tính tuyến tính trên thang logit.

Nếu giả định này bị vi phạm, các hệ số hồi quy có thể bị ước lượng sai và khả năng dự báo của mô hình giảm. Trong các nghiên cứu có nhiều biến liên tục, nên đánh giá giả định này trước khi xây dựng mô hình bằng các phương pháp phù hợp như phân tích phần dư hoặc sử dụng các hàm spline khi cần thiết (Harrell, 2015).

Trong trường hợp mối quan hệ thực sự có dạng phi tuyến, việc mô hình hóa trực tiếp bằng các hàm spline hoặc đa thức phân đoạn thường được ưu tiên hơn so với phân nhóm biến liên tục thành các mức định tính, vì phân nhóm có thể làm mất thông tin và giảm hiệu quả thống kê.

𝟑.𝟔.𝟔. 𝐗𝐮̛̉ 𝐥𝐲́ 𝐤𝐡𝐢 𝐠𝐢𝐚̉ đ𝐢̣𝐧𝐡 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐛𝐢̣ 𝐯𝐢 𝐩𝐡𝐚̣𝐦

Việc phát hiện một giả định không được đáp ứng không đồng nghĩa với việc phải loại bỏ hoàn toàn mô hình hồi quy logistic đa thức. Thay vào đó, nhà nghiên cứu cần xác định nguyên nhân và lựa chọn giải pháp phù hợp.

Nếu giả định IIA bị vi phạm, có thể xem xét mô hình logit lồng (Nested Logit Model), mô hình logit hỗn hợp (Mixed Logit Model) hoặc mô hình probit đa thức, tùy thuộc vào cấu trúc của dữ liệu và mục tiêu nghiên cứu.

Nếu đa cộng tuyến ở mức nghiêm trọng, cần đánh giá lại tập biến giải thích trước khi tiếp tục phân tích.

Nếu mối quan hệ giữa biến liên tục và logit không còn tuyến tính, nên sử dụng các kỹ thuật mô hình hóa phi tuyến thay vì tiếp tục áp dụng mô hình tuyến tính trên thang logit.

Việc lựa chọn giải pháp cần dựa trên cơ sở thống kê kết hợp với hiểu biết về cơ chế sinh học và bối cảnh lâm sàng của nghiên cứu, thay vì chỉ dựa trên kết quả của các kiểm định thống kê đơn lẻ.