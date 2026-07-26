𝐗𝐚̂𝐲 𝐝𝐮̛̣𝐧𝐠 𝐯𝐚̀ 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜 (𝐏𝐡𝐚̂̀𝐧 𝟓 𝐜𝐮̉𝐚 𝐛𝐚̀𝐢 𝐇𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜)

TS. Đào Hồng Nam

Phần 5 trình bày quy trình xây dựng mô hình hồi quy logistic đa thức, bao gồm lựa chọn biến, đánh giá yếu tố gây nhiễu và tương tác, lựa chọn mô hình tối ưu, kiểm định và đánh giá độ ổn định của mô hình, xử lý dữ liệu thiếu, kèm các ví dụ minh họa (Ví dụ 11–15).

Xây dựng một mô hình hồi quy logistic đa thức phù hợp không chỉ đơn thuần là lựa chọn những biến có giá trị p nhỏ rồi đưa vào phân tích. Mô hình cuối cùng cần phản ánh hợp lý cơ chế của hiện tượng nghiên cứu, tận dụng được các bằng chứng khoa học hiện có và đồng thời duy trì khả năng dự báo đối với những đối tượng ngoài bộ dữ liệu ban đầu. Vì vậy, quá trình xây dựng mô hình luôn đòi hỏi sự kết hợp giữa hiểu biết chuyên môn, cơ sở lý thuyết và các nguyên tắc thống kê. Một mô hình được lựa chọn chỉ dựa trên ý nghĩa thống kê hoặc các thuật toán lựa chọn biến tự động có thể hoạt động rất tốt trên bộ dữ liệu nghiên cứu nhưng lại dễ rơi vào tình trạng quá khớp (overfitting), làm giảm khả năng khái quát hóa khi áp dụng cho các quần thể khác (Harrell, 2015).

Cách tiếp cận trong xây dựng mô hình cũng đã thay đổi đáng kể trong những năm gần đây. Trọng tâm không còn là tìm kiếm tập hợp các biến cho giá trị p nhỏ nhất mà là xác định những biến thực sự có ý nghĩa đối với câu hỏi nghiên cứu. Quyết định đưa một biến vào mô hình vì thế thường dựa trên nhiều nguồn thông tin khác nhau, bao gồm bằng chứng từ y văn, hiểu biết về cơ chế bệnh sinh, ý nghĩa lâm sàng của biến và kết quả phân tích thống kê trên dữ liệu hiện có. Cách tiếp cận này giúp hạn chế việc giữ lại những biến chỉ xuất hiện do dao động ngẫu nhiên của mẫu nghiên cứu, đồng thời làm cho mô hình có cơ sở khoa học vững chắc hơn.

Mục tiêu cuối cùng không phải là tạo ra mô hình phức tạp nhất hoặc mô hình có nhiều biến đạt ý nghĩa thống kê nhất, mà là xây dựng được một mô hình cân bằng giữa khả năng giải thích dữ liệu, tính đơn giản trong cấu trúc và khả năng ứng dụng trong thực tế. Chính vì vậy, nhiều hướng dẫn phương pháp luận hiện nay khuyến nghị kết hợp kiến thức chuyên ngành với các tiêu chí thống kê trong toàn bộ quá trình xây dựng mô hình thay vì phụ thuộc hoàn toàn vào các thuật toán lựa chọn biến tự động.

𝟓.𝟏. 𝐗𝐚̂𝐲 𝐝𝐮̛̣𝐧𝐠 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐤𝐡𝐚́𝐢 𝐧𝐢𝐞̣̂𝐦 𝐭𝐫𝐮̛𝐨̛́𝐜 𝐤𝐡𝐢 𝐩𝐡𝐚̂𝐧 𝐭𝐢́𝐜𝐡

Quá trình xây dựng mô hình nên bắt đầu bằng việc xác định mô hình khái niệm mô tả mối quan hệ giữa biến kết cục và các biến giải thích. Mô hình khái niệm giúp xác định rõ biến nghiên cứu chính, các yếu tố gây nhiễu, các biến trung gian và các biến có khả năng tương tác trước khi tiến hành phân tích thống kê.

Trong nghiên cứu Y–Dược, việc xây dựng mô hình khái niệm thường dựa trên tổng quan tài liệu, hướng dẫn chuyên môn và hiểu biết về cơ chế sinh lý bệnh. Cách tiếp cận này giúp hạn chế việc lựa chọn biến hoàn toàn dựa trên dữ liệu thu thập được, từ đó giảm nguy cơ phát hiện các mối liên quan ngẫu nhiên không có ý nghĩa sinh học.

Trong nhiều nghiên cứu dịch tễ học hiện đại, sơ đồ nhân quả có hướng (Directed Acyclic Graph, DAG) được sử dụng để hỗ trợ xác định các biến cần hiệu chỉnh. Mặc dù DAG không thay thế các phương pháp phân tích thống kê, công cụ này giúp phân biệt biến gây nhiễu, biến trung gian và biến va chạm, từ đó hạn chế hiện tượng hiệu chỉnh không phù hợp (Greenland et al., 1999).

Quy trình xây dựng mô hình khái niệm được tóm tắt trong Sơ đồ 4.

𝟓.𝟐. 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐚́𝐜 𝐛𝐢𝐞̂́𝐧 đ𝐨̣̂𝐜 𝐥𝐚̣̂𝐩

Sau khi xác định được mô hình khái niệm và các mối liên hệ cần đánh giá, nhà nghiên cứu phải quyết định những biến nào sẽ được đưa vào mô hình hồi quy logistic đa thức. Đây là một bước quan trọng vì cấu trúc của mô hình cuối cùng không chỉ ảnh hưởng đến kết quả phân tích mà còn quyết định khả năng diễn giải và giá trị ứng dụng của nghiên cứu.

Trong thực hành, nhiều nghiên cứu vẫn sử dụng kết quả phân tích đơn biến như một tiêu chí sàng lọc ban đầu để lựa chọn biến. Cách làm này tương đối đơn giản nhưng tồn tại nhiều hạn chế. Một biến có thể không đạt ý nghĩa thống kê khi được phân tích riêng lẻ nhưng vẫn đóng vai trò là yếu tố gây nhiễu quan trọng trong mô hình đa biến. Ngược lại, một biến cho thấy mối liên quan rõ ràng trong phân tích đơn biến có thể mất ý nghĩa sau khi ảnh hưởng của các yếu tố khác được kiểm soát đồng thời. Việc chỉ dựa vào p-value từ phân tích đơn biến để quyết định giữ hay loại một biến vì thế có thể dẫn đến mô hình không phản ánh đúng bản chất của mối liên hệ đang nghiên cứu.

Quá trình lựa chọn biến nên dựa trên sự kết hợp của nhiều nguồn thông tin thay vì phụ thuộc vào một tiêu chí thống kê đơn lẻ. Bằng chứng từ y văn và các nghiên cứu trước đó thường là cơ sở đầu tiên cần được xem xét vì chúng phản ánh những kiến thức đã được tích lũy về vấn đề nghiên cứu. Bên cạnh đó, ý nghĩa sinh học hoặc ý nghĩa lâm sàng của từng biến cũng cần được cân nhắc để bảo đảm rằng các biến được đưa vào mô hình có cơ sở khoa học hợp lý. Vai trò của biến trong mô hình là một yếu tố quan trọng khác, bao gồm việc xác định đâu là biến nghiên cứu chính, đâu là biến gây nhiễu cần hiệu chỉnh và đâu là những biến có khả năng tham gia vào các thành phần tương tác.

Những biến đáp ứng các tiêu chí về cơ sở lý thuyết, ý nghĩa chuyên môn hoặc vai trò phương pháp học thường nên được đưa vào mô hình ban đầu ngay cả khi chưa đạt ý nghĩa thống kê trong phân tích đơn biến. Cách tiếp cận này giúp hạn chế nguy cơ loại bỏ những biến quan trọng chỉ vì thiếu sức mạnh thống kê trong dữ liệu hiện có, đồng thời tạo điều kiện xây dựng một mô hình có cơ sở khoa học vững chắc và phù hợp với mục tiêu nghiên cứu hơn là chỉ theo đuổi các kết quả có ý nghĩa thống kê.

𝟓.𝟑. 𝐂𝐚́𝐜 𝐜𝐡𝐢𝐞̂́𝐧 𝐥𝐮̛𝐨̛̣𝐜 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐛𝐢𝐞̂́𝐧

Có nhiều chiến lược lựa chọn biến đã được đề xuất trong hồi quy logistic đa thức nhằm xây dựng mô hình vừa phù hợp với dữ liệu vừa có khả năng giải thích và dự báo tốt. Các phương pháp được sử dụng phổ biến nhất bao gồm lựa chọn tiến (forward selection), lựa chọn lùi (backward elimination) và lựa chọn từng bước (stepwise selection). Trong chiến lược lựa chọn tiến, quá trình xây dựng mô hình bắt đầu từ mô hình chỉ chứa hệ số chặn, sau đó các biến độc lập được bổ sung lần lượt dựa trên mức độ cải thiện độ phù hợp của mô hình. Ngược lại, chiến lược lựa chọn lùi xuất phát từ mô hình đầy đủ chứa tất cả các biến được xem xét rồi từng bước loại bỏ những biến có đóng góp thấp nhất. Phương pháp lựa chọn từng bước kết hợp cả hai cơ chế trên, cho phép vừa thêm biến mới vừa loại bỏ các biến đã có trong mô hình trong quá trình tối ưu hóa.

Mặc dù các phương pháp này được tích hợp sẵn trong hầu hết các phần mềm thống kê và tương đối thuận tiện khi sử dụng, việc phụ thuộc hoàn toàn vào các thuật toán lựa chọn biến tự động ngày càng ít được khuyến khích trong nghiên cứu Y–Dược. Nguyên nhân là các biến được giữ lại trong mô hình thường phụ thuộc đáng kể vào đặc điểm của bộ dữ liệu cụ thể, khiến kết quả có thể thay đổi khi nghiên cứu được lặp lại trên một mẫu khác. Ngoài ra, các thuật toán tự động còn có xu hướng lựa chọn những biến đạt ý nghĩa thống kê do dao động ngẫu nhiên của dữ liệu thay vì do mối liên hệ thực sự tồn tại trong quần thể, từ đó làm tăng nguy cơ xây dựng các mô hình thiếu ổn định và khó khái quát hóa (Harrell, 2015).

Vì lý do đó, nhiều tài liệu phương pháp luận hiện nay ưu tiên cách tiếp cận lựa chọn biến có chủ đích (purposeful selection). Theo chiến lược này, quá trình xây dựng mô hình không bắt đầu từ p-value mà xuất phát từ câu hỏi nghiên cứu, hiểu biết chuyên môn và các bằng chứng đã có trong y văn. Mô hình ban đầu thường bao gồm những biến có ý nghĩa lâm sàng rõ ràng, có cơ sở sinh học hợp lý hoặc được xác định từ trước là những yếu tố gây nhiễu cần được kiểm soát. Sau khi mô hình được thiết lập, từng biến sẽ được đánh giá không chỉ dựa trên ý nghĩa thống kê mà còn dựa trên vai trò gây nhiễu, khả năng tương tác với các biến khác và mức độ ảnh hưởng của chúng đến các hệ số hồi quy còn lại. Nhờ đó, mô hình cuối cùng thường phản ánh tốt hơn bản chất của vấn đề nghiên cứu và ít phụ thuộc vào những đặc điểm ngẫu nhiên của riêng bộ dữ liệu đang phân tích. Quy trình lựa chọn biến theo phương pháp này được minh họa trong Sơ đồ 5.

𝟓.𝟒. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐯𝐚𝐢 𝐭𝐫𝐨̀ 𝐜𝐮̉𝐚 𝐛𝐢𝐞̂́𝐧 𝐠𝐚̂𝐲 𝐧𝐡𝐢𝐞̂̃𝐮

Biến gây nhiễu là biến có liên quan đồng thời đến biến nghiên cứu và biến kết cục nhưng không nằm trên đường nhân quả giữa hai biến này. Nếu không được hiệu chỉnh, biến gây nhiễu có thể làm sai lệch mối liên quan giữa biến nghiên cứu và biến kết cục.

Trong hồi quy logistic đa thức, vai trò gây nhiễu thường được đánh giá bằng cách so sánh các hệ số hồi quy của biến nghiên cứu chính trước và sau khi loại bỏ biến nghi ngờ gây nhiễu. Nếu sự thay đổi của hệ số vượt quá ngưỡng đã xác định, biến đó nên được giữ lại trong mô hình ngay cả khi không đạt ý nghĩa thống kê.

Các tiêu chí đánh giá được trình bày trong Bảng 11.

Điều quan trọng cần lưu ý là vai trò gây nhiễu không được xác định chỉ dựa trên giá trị p. Một biến hoàn toàn có thể là yếu tố gây nhiễu mặc dù không có ý nghĩa thống kê trong mô hình cuối cùng.

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟐. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐛𝐢𝐞̂́𝐧 𝐠𝐚̂𝐲 𝐧𝐡𝐢𝐞̂̃𝐮

Một nghiên cứu đánh giá các yếu tố liên quan đến lựa chọn phương pháp điều trị suy tim đã sử dụng tuổi làm biến nghiên cứu chính trong mô hình hồi quy đa biến. Mô hình ban đầu bao gồm tuổi, giới tính, mức lọc cầu thận và các đặc điểm lâm sàng liên quan. Khi loại bỏ biến mức lọc cầu thận, hệ số β của tuổi thay đổi hơn 10% so với mô hình ban đầu. Theo tiêu chí đánh giá biến gây nhiễu trong Bảng 11, mức thay đổi này cho thấy mức lọc cầu thận có khả năng là một biến gây nhiễu. Mặc dù biến này không đạt ý nghĩa thống kê riêng lẻ, việc loại bỏ nó vẫn làm thay đổi đáng kể ước lượng của biến nghiên cứu chính. Bên cạnh đó, mối liên hệ giữa chức năng thận, tuổi và quyết định lựa chọn phương pháp điều trị suy tim cũng có cơ sở sinh học và dịch tễ học hợp lý. Vì vậy, mức lọc cầu thận được giữ lại trong mô hình nhằm kiểm soát nhiễu và bảo đảm tính chính xác của các ước lượng hồi quy. Trường hợp này cho thấy việc quyết định giữ hay loại một biến không nên chỉ dựa trên giá trị p mà cần xem xét đồng thời mức độ thay đổi của hệ số hồi quy và cơ sở khoa học của biến đó.

𝟓.𝟓. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 𝐠𝐢𝐮̛̃𝐚 𝐜𝐚́𝐜 𝐛𝐢𝐞̂́𝐧

Nhiều nghiên cứu không chỉ quan tâm đến ảnh hưởng độc lập của từng biến giải thích mà còn cần đánh giá liệu tác động của một yếu tố có thay đổi theo sự hiện diện hoặc mức độ của một yếu tố khác hay không. Hiện tượng này được gọi là tương tác và xảy ra khi mối liên hệ giữa một biến độc lập với biến kết cục không giống nhau ở mọi đối tượng nghiên cứu. Trong lĩnh vực Y–Dược, tương tác thường xuất hiện giữa tuổi và giới tính, giữa phương pháp điều trị và mức độ nặng của bệnh, hoặc giữa bệnh đồng mắc với các chỉ số sinh học. Chẳng hạn, hiệu quả của một thuốc có thể rõ rệt ở bệnh nhân trẻ tuổi nhưng giảm đáng kể ở bệnh nhân cao tuổi, hoặc lợi ích của một biện pháp điều trị chỉ xuất hiện ở những bệnh nhân có mức độ bệnh nặng.

Việc bổ sung các thành phần tương tác vào mô hình hồi quy cần được thực hiện trên cơ sở giả thuyết nghiên cứu, bằng chứng từ y văn hoặc cơ chế sinh học hợp lý. Không nên đưa vào mô hình hàng loạt tổ hợp tương tác chỉ vì dữ liệu cho phép phân tích, bởi cách tiếp cận này làm tăng nguy cơ phát hiện những mối liên quan xuất hiện do ngẫu nhiên và có thể dẫn đến hiện tượng quá khớp, đặc biệt khi cỡ mẫu không đủ lớn so với số lượng tham số cần ước lượng.

Sau khi thêm thành phần tương tác vào mô hình, cần đánh giá xem biến tương tác có thực sự cải thiện khả năng giải thích dữ liệu hay không. Việc này thường được thực hiện bằng kiểm định tỷ số hợp lý (Likelihood Ratio Test) hoặc kiểm định Wald để so sánh mô hình có và không có thành phần tương tác. Khi biến tương tác không đạt ý nghĩa thống kê, đồng thời không làm cải thiện đáng kể độ phù hợp của mô hình, có thể cân nhắc loại bỏ thành phần này nhằm giữ cho mô hình đơn giản hơn, ổn định hơn và dễ diễn giải hơn trong thực hành nghiên cứu cũng như ứng dụng lâm sàng.

𝟓.𝟔. 𝐊𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 đ𝐚 𝐜𝐨̣̂𝐧𝐠 𝐭𝐮𝐲𝐞̂́𝐧

Đa cộng tuyến là hiện tượng hai hoặc nhiều biến độc lập có mối tương quan chặt chẽ với nhau trong cùng một mô hình hồi quy. Khi đa cộng tuyến xuất hiện, phương sai của các hệ số hồi quy tăng lên, sai số chuẩn trở nên lớn hơn và khoảng tin cậy bị mở rộng, làm giảm khả năng phát hiện các mối liên quan thực sự giữa biến độc lập và biến kết cục. Trong một số trường hợp, đa cộng tuyến còn có thể làm cho dấu hoặc độ lớn của hệ số hồi quy trở nên không ổn định khi thêm hoặc bớt một biến trong mô hình.

Trước khi xây dựng mô hình chính thức, cần đánh giá mức độ đa cộng tuyến giữa các biến độc lập để bảo đảm các ước lượng thu được có độ tin cậy cao. Việc đánh giá thường được thực hiện thông qua các chỉ số như hệ số tương quan, Tolerance, Variance Inflation Factor (VIF), Condition Index và Eigenvalue. Các ngưỡng đánh giá thường được sử dụng trong thực hành được trình bày trong Bảng 9.

Khi phát hiện đa cộng tuyến ở mức độ đáng kể, nhà nghiên cứu có thể cân nhắc loại bỏ một trong các biến có tương quan cao, lựa chọn biến có ý nghĩa lâm sàng rõ ràng hơn, hoặc kết hợp nhiều biến liên quan thành một chỉ số tổng hợp. Trong những tình huống mà các biến đều có giá trị chuyên môn quan trọng, việc giữ lại mô hình hiện tại vẫn có thể được xem xét, nhưng cần thận trọng khi diễn giải các hệ số hồi quy riêng lẻ. Vì vậy, quyết định xử lý đa cộng tuyến nên dựa trên cả bằng chứng thống kê và cơ sở chuyên môn thay vì chỉ dựa vào một chỉ số định lượng đơn lẻ.

𝟓.𝟕. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 đ𝐨̣̂ 𝐨̂̉𝐧 đ𝐢̣𝐧𝐡 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Sau khi lựa chọn mô hình cuối cùng, cần đánh giá độ ổn định của các hệ số hồi quy nhằm xác định khả năng tái lập kết quả trên các mẫu nghiên cứu khác.

Một trong những phương pháp được khuyến nghị hiện nay là kỹ thuật bootstrap. Phương pháp này tạo ra nhiều mẫu lặp bằng cách lấy mẫu có hoàn lại từ bộ dữ liệu gốc, sau đó ước lượng lại mô hình trên từng mẫu và đánh giá sự thay đổi của các hệ số hồi quy.

Nếu các hệ số và khoảng tin cậy thu được tương đối ổn định giữa các lần lặp, có thể kết luận rằng mô hình có khả năng khái quát hóa tốt hơn đối với quần thể nghiên cứu. Ngược lại, nếu các hệ số thay đổi đáng kể giữa các lần lấy mẫu, cần xem xét lại chiến lược lựa chọn biến hoặc đánh giá lại cỡ mẫu nghiên cứu (Harrell, 2015).

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟑. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 đ𝐨̣̂ 𝐨̂̉𝐧 đ𝐢̣𝐧𝐡 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Một nghiên cứu trên bệnh nhân ung thư phổi không tế bào nhỏ xây dựng mô hình hồi quy logistic đa thức nhằm đánh giá các yếu tố liên quan đến lựa chọn điều trị ban đầu. Sau khi hoàn thành mô hình cuối cùng, nhóm nghiên cứu thực hiện bootstrap với 1.000 mẫu lặp. Kết quả cho thấy các hệ số hồi quy của tuổi, giai đoạn bệnh và tình trạng đột biến gen thay đổi rất ít giữa các lần lặp, chứng tỏ mô hình có độ ổn định cao và có khả năng áp dụng cho các quần thể tương tự.

Ví dụ, căn nguyên gây viêm màng não có thể bao gồm Streptococcus pneumoniae, Neisseria meningitidis, Listeria monocytogenes, vi rút hoặc các căn nguyên khác. Mỗi căn nguyên có cơ chế bệnh sinh, yếu tố nguy cơ và chiến lược điều trị khác nhau nhưng không tồn tại quan hệ thứ bậc giữa các nhóm.

Trong trường hợp này, hồi quy logistic đa thức cho phép đánh giá đồng thời ảnh hưởng của tuổi, giới tính, tình trạng miễn dịch, tiền sử tiêm chủng và các yếu tố dịch tễ khác đối với từng căn nguyên gây bệnh sau khi đã hiệu chỉnh các yếu tố gây nhiễu. So với việc xây dựng nhiều mô hình hồi quy logistic nhị phân, phương pháp này bảo đảm tổng xác suất của các căn nguyên luôn bằng 1 và tránh các kết quả mâu thuẫn giữa các mô hình.

Ngoài nghiên cứu căn nguyên, hồi quy logistic đa thức còn được sử dụng để phân tích nguồn lây nhiễm, kiểu lưu hành của vi sinh vật, kiểu gen của tác nhân gây bệnh hoặc nhóm kháng kháng sinh trong các nghiên cứu giám sát dịch tễ học.

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟒. 𝐏𝐡𝐚̂𝐧 𝐭𝐢́𝐜𝐡 𝐜𝐚̆𝐧 𝐧𝐠𝐮𝐲𝐞̂𝐧 𝐠𝐚̂𝐲 𝐧𝐡𝐢𝐞̂̃𝐦 𝐤𝐡𝐮𝐚̂̉𝐧 𝐡𝐮𝐲𝐞̂́𝐭

Một nghiên cứu đa trung tâm nhằm xác định các yếu tố liên quan đến căn nguyên gây nhiễm khuẩn huyết phân loại biến kết cục thành bốn nhóm: vi khuẩn Gram dương, vi khuẩn Gram âm, nấm và đa vi sinh vật. Sau khi hiệu chỉnh tuổi, bệnh nền, tình trạng suy giảm miễn dịch và tiền sử sử dụng kháng sinh, hồi quy logistic đa thức được sử dụng để ước lượng RRR của từng căn nguyên so với nhóm Gram dương là nhóm tham chiếu. Kết quả cho phép xác định các yếu tố nguy cơ đặc hiệu của từng nhóm căn nguyên và hỗ trợ lựa chọn kháng sinh kinh nghiệm phù hợp trong giai đoạn đầu điều trị.

𝟓.𝟖. 𝐗𝐮̛̉ 𝐥𝐲́ 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐭𝐡𝐢𝐞̂́𝐮 𝐭𝐫𝐮̛𝐨̛́𝐜 𝐤𝐡𝐢 𝐱𝐚̂𝐲 𝐝𝐮̛̣𝐧𝐠 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Dữ liệu thiếu (missing data) là một trong những vấn đề thường gặp trong nghiên cứu Y–Dược và có thể ảnh hưởng đáng kể đến độ chính xác của các mô hình hồi quy logistic đa thức. Dữ liệu thiếu có thể phát sinh do bệnh nhân từ chối trả lời, mất thông tin trong quá trình thu thập, sai sót khi nhập liệu hoặc không thực hiện được một số xét nghiệm cận lâm sàng. Nếu không được xử lý thích hợp, dữ liệu thiếu có thể làm giảm kích thước mẫu, làm tăng phương sai của các ước lượng và tạo ra sai lệch trong các hệ số hồi quy, đặc biệt khi cơ chế thiếu dữ liệu có liên quan đến biến nghiên cứu hoặc biến kết cục (Little & Rubin, 2019).

Trước khi xây dựng mô hình hồi quy logistic đa thức, nhà nghiên cứu cần đánh giá tỷ lệ dữ liệu thiếu, xác định phân bố của dữ liệu thiếu theo từng biến và xem xét cơ chế phát sinh dữ liệu thiếu. Theo Rubin (1987), dữ liệu thiếu thường được phân thành ba cơ chế cơ bản, được trình bày trong Bảng 13.

Cơ chế thứ nhất là thiếu hoàn toàn ngẫu nhiên (Missing Completely at Random, MCAR), trong đó xác suất xuất hiện dữ liệu thiếu hoàn toàn không phụ thuộc vào bất kỳ biến quan sát hoặc biến chưa quan sát nào. Trong trường hợp này, việc loại bỏ các quan sát bị thiếu thường không tạo ra sai lệch đáng kể, mặc dù vẫn làm giảm cỡ mẫu và giảm hiệu quả thống kê.

Cơ chế thứ hai là thiếu ngẫu nhiên có điều kiện (Missing at Random, MAR), trong đó xác suất thiếu dữ liệu phụ thuộc vào các biến đã quan sát nhưng không phụ thuộc trực tiếp vào giá trị thực sự bị thiếu. Đây là cơ chế thường gặp nhất trong các nghiên cứu Y–Dược và cũng là cơ sở để áp dụng các phương pháp bù dữ liệu hiện đại như nội suy đa lần (multiple imputation) (Little & Rubin, 2019).

Cơ chế thứ ba là thiếu không ngẫu nhiên (Missing Not at Random, MNAR), trong đó xác suất thiếu dữ liệu phụ thuộc trực tiếp vào chính giá trị bị thiếu. Ví dụ, những bệnh nhân có nồng độ HbA1c rất cao có thể từ chối thực hiện xét nghiệm theo dõi định kỳ hoặc những người có mức độ trầm cảm nặng có xu hướng không hoàn thành bảng câu hỏi đánh giá. Đây là trường hợp khó xử lý nhất và thường đòi hỏi các mô hình thống kê chuyên biệt hoặc phân tích độ nhạy để đánh giá ảnh hưởng của dữ liệu thiếu đến kết quả nghiên cứu (Rubin, 1987).

Một sai sót thường gặp trong thực hành là loại bỏ toàn bộ các đối tượng có ít nhất một giá trị thiếu (complete-case analysis) mà không đánh giá cơ chế thiếu dữ liệu. Phương pháp này chỉ phù hợp khi dữ liệu thiếu theo cơ chế MCAR và tỷ lệ dữ liệu thiếu thấp. Nếu dữ liệu thiếu theo cơ chế MAR hoặc MNAR, việc loại bỏ các quan sát có thể tạo ra sai lệch chọn mẫu, làm thay đổi phân bố của các biến nghiên cứu và dẫn đến các hệ số hồi quy không còn đại diện cho quần thể mục tiêu (Little & Rubin, 2019).

Trong những năm gần đây, nội suy đa lần (Multiple Imputation) được xem là phương pháp được khuyến nghị trong hầu hết các nghiên cứu quan sát và nghiên cứu lâm sàng khi dữ liệu thiếu theo cơ chế MAR (White et al., 2011). Phương pháp này không thay thế mỗi giá trị thiếu bằng một giá trị duy nhất mà tạo ra nhiều bộ dữ liệu hoàn chỉnh thông qua quá trình mô phỏng xác suất. Mỗi bộ dữ liệu được phân tích độc lập bằng cùng một mô hình hồi quy logistic đa thức, sau đó các hệ số hồi quy và sai số chuẩn được tổng hợp theo quy tắc của Rubin để tạo ra các ước lượng cuối cùng. Quy trình này được minh họa trong Sơ đồ 6.

So với phương pháp loại bỏ các quan sát bị thiếu hoặc nội suy đơn (single imputation), nội suy đa lần có ưu điểm là tận dụng tối đa thông tin sẵn có, giảm sai lệch của các hệ số hồi quy và phản ánh đúng mức độ không chắc chắn do dữ liệu thiếu gây ra. Tuy nhiên, hiệu quả của phương pháp này phụ thuộc vào tính phù hợp của mô hình nội suy và giả định rằng dữ liệu thiếu theo cơ chế MAR (Rubin, 1987).

Trong nghiên cứu sử dụng hồi quy logistic đa thức, quá trình nội suy cần bao gồm tất cả các biến dự kiến sử dụng trong mô hình cuối cùng, bao gồm biến kết cục, các biến độc lập và các biến có liên quan đến cơ chế thiếu dữ liệu. Việc loại bỏ biến kết cục khỏi mô hình nội suy hoặc chỉ nội suy một phần các biến độc lập có thể làm giảm chất lượng của các ước lượng và tạo ra sai lệch trong kết quả phân tích (White et al., 2011).

Sau khi hoàn thành quá trình xử lý dữ liệu thiếu, nhà nghiên cứu nên mô tả rõ tỷ lệ dữ liệu thiếu của từng biến, phương pháp xử lý đã áp dụng, số lượng bộ dữ liệu nội suy và cách tổng hợp kết quả trong phần phương pháp của bài báo. Việc báo cáo đầy đủ các thông tin này giúp tăng tính minh bạch, khả năng tái lập và độ tin cậy của nghiên cứu, đồng thời phù hợp với các khuyến nghị hiện nay về báo cáo mô hình dự báo và nghiên cứu quan sát (Steyerberg, 2019).

𝐕𝐢́ 𝐝𝐮̣ 𝟏𝟓. 𝐗𝐮̛̉ 𝐥𝐲́ 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮 𝐭𝐡𝐢𝐞̂́𝐮 𝐭𝐫𝐮̛𝐨̛́𝐜 𝐤𝐡𝐢 𝐱𝐚̂𝐲 𝐝𝐮̛̣𝐧𝐠 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Một nghiên cứu trên 1.542 bệnh nhân đái tháo đường típ 2 nhằm xác định các yếu tố liên quan đến lựa chọn phác đồ điều trị ban đầu ghi nhận tỷ lệ dữ liệu thiếu dao động từ 0,8% đến 12,6% đối với các biến xét nghiệm. Sau khi đánh giá đặc điểm dữ liệu, nhóm nghiên cứu nhận thấy khả năng thiếu dữ liệu phụ thuộc vào tuổi và thời gian mắc bệnh nhưng không phụ thuộc vào giá trị thực của các xét nghiệm, phù hợp với giả định MAR.

Thay vì loại bỏ các bệnh nhân có dữ liệu thiếu, nhóm nghiên cứu áp dụng phương pháp nội suy đa lần với 20 bộ dữ liệu nội suy. Tất cả các biến dự kiến đưa vào mô hình hồi quy logistic đa thức đều được sử dụng trong mô hình nội suy. Sau khi phân tích độc lập từng bộ dữ liệu và tổng hợp kết quả theo quy tắc của Rubin, các hệ số hồi quy thu được ổn định hơn và khoảng tin cậy 95% hẹp hơn so với phân tích chỉ trên các trường hợp có đầy đủ dữ liệu. Kết quả này cho thấy việc xử lý dữ liệu thiếu bằng nội suy đa lần góp phần nâng cao độ chính xác và độ tin cậy của mô hình hồi quy logistic đa thức.