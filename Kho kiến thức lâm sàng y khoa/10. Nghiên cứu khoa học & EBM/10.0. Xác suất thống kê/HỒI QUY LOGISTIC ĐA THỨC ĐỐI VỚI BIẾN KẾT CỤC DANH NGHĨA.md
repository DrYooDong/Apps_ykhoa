𝐏𝐡𝐚̂̀𝐧 𝟐- 𝐇𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜 đ𝐨̂́𝐢 𝐯𝐨̛́𝐢 𝐛𝐢𝐞̂́𝐧 𝐤𝐞̂́𝐭 𝐜𝐮̣𝐜 𝐝𝐚𝐧𝐡 𝐧𝐠𝐡𝐢̃𝐚: 𝐂𝐨̛ 𝐬𝐨̛̉ 𝐥𝐲́ 𝐭𝐡𝐮𝐲𝐞̂́𝐭, 𝐩𝐡𝐮̛𝐨̛𝐧𝐠 𝐩𝐡𝐚́𝐩 𝐱𝐚̂𝐲 𝐝𝐮̛̣𝐧𝐠 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐯𝐚̀ 𝐮̛́𝐧𝐠 𝐝𝐮̣𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮

TS. Đào Hồng Nam

𝟑. 𝐔̛𝐨̛́𝐜 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐭𝐡𝐚𝐦 𝐬𝐨̂́ 𝐯𝐚̀ 𝐤𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐭𝐡𝐨̂́𝐧𝐠 𝐤𝐞̂ 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜

𝟑.𝟏. 𝐍𝐠𝐮𝐲𝐞̂𝐧 𝐥𝐲́ 𝐮̛𝐨̛́𝐜 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐭𝐡𝐚𝐦 𝐬𝐨̂́ 𝐛𝐚̆̀𝐧𝐠 𝐩𝐡𝐮̛𝐨̛𝐧𝐠 𝐩𝐡𝐚́𝐩 𝐜𝐮̛̣𝐜 đ𝐚̣𝐢 𝐡𝐨̛̣𝐩 𝐥𝐲́

Trong hồi quy logistic đa thức, các hệ số hồi quy không thể được ước lượng bằng phương pháp bình phương tối thiểu như trong hồi quy tuyến tính vì biến kết cục là biến định tính và không tuân theo phân phối chuẩn. Thay vào đó, các tham số của mô hình được xác định bằng phương pháp cực đại hợp lý (Maximum Likelihood Estimation, MLE), một phương pháp ước lượng dựa trên nguyên lý lựa chọn bộ tham số làm cho dữ liệu quan sát có xác suất xuất hiện lớn nhất (Hosmer et al., 2013).

Giả sử bộ dữ liệu nghiên cứu gồm n đối tượng, trong đó mỗi đối tượng được quan sát đồng thời biến kết cục và các biến giải thích. Dựa trên giá trị của các biến độc lập, mô hình hồi quy logistic đa thức ước lượng xác suất để mỗi đối tượng thuộc vào từng nhóm kết cục tương ứng. Do mỗi đối tượng chỉ có thể thuộc một nhóm duy nhất nên thông tin về nhóm thực tế quan sát được sẽ được kết hợp với các xác suất dự báo để xây dựng hàm hợp lý cho toàn bộ mẫu nghiên cứu. Nói cách khác, hàm hợp lý phản ánh xác suất quan sát được tập dữ liệu hiện có dưới một bộ tham số nhất định của mô hình và được biểu diễn theo Công thức 5. Trên cơ sở đó, phương pháp cực đại hóa hàm hợp lý sẽ tìm bộ tham số làm cho dữ liệu quan sát được có xác suất xuất hiện lớn nhất, từ đó thu được các ước lượng hệ số hồi quy được sử dụng trong phân tích và diễn giải kết quả.

Khác với hồi quy tuyến tính, trong đó các hệ số được tính trực tiếp từ hệ phương trình chuẩn, hồi quy logistic đa thức không có nghiệm giải tích dạng đóng. Vì vậy, việc tìm bộ tham số cực đại của hàm hợp lý phải được thực hiện bằng các thuật toán lặp số.

Trong thực hành, việc ước lượng các tham số của hồi quy logistic đa thức gần như luôn được thực hiện thông qua các phần mềm thống kê chuyên dụng như R, Stata, SAS hoặc SPSS. Các phần mềm này sử dụng những thuật toán tối ưu hóa khác nhau để giải bài toán cực đại hóa hàm hợp lý, chẳng hạn như Newton–Raphson, Fisher scoring hoặc các biến thể của phương pháp quasi-Newton. Mặc dù quy trình tính toán cụ thể có thể khác nhau giữa các phần mềm và thuật toán, mục tiêu cuối cùng đều giống nhau là tìm bộ hệ số β làm cho hàm hợp lý của mô hình đạt giá trị lớn nhất, qua đó xác định bộ tham số phù hợp nhất với dữ liệu quan sát.

Quá trình ước lượng thường bắt đầu từ một tập giá trị khởi tạo của các tham số, sau đó các hệ số hồi quy được cập nhật liên tục qua nhiều vòng lặp. Ở mỗi bước, thuật toán đánh giá mức độ cải thiện của hàm hợp lý và điều chỉnh các tham số theo hướng làm tăng giá trị của hàm này. Quá trình lặp được tiếp tục cho đến khi sự thay đổi của hàm hợp lý hoặc của các hệ số giữa hai lần lặp liên tiếp trở nên rất nhỏ và nhỏ hơn ngưỡng hội tụ đã được thiết lập trước. Khi đó, mô hình được xem là đã hội tụ và các hệ số ước lượng cuối cùng sẽ được sử dụng cho việc suy luận thống kê và diễn giải kết quả. Toàn bộ quy trình này được minh họa trong Sơ đồ 1.

Một đặc tính quan trọng làm cho phương pháp cực đại hóa hàm hợp lý (Maximum Likelihood Estimation – MLE) trở thành lựa chọn chuẩn trong hồi quy logistic đa thức là các tính chất thống kê thuận lợi của nó. Khi kích thước mẫu đủ lớn và các giả định của mô hình được đáp ứng, các hệ số ước lượng bằng MLE có tính nhất quán, nghĩa là giá trị ước lượng sẽ ngày càng tiến gần đến giá trị thực của quần thể khi số lượng quan sát tăng lên. Đồng thời, các ước lượng này còn có tính hiệu quả tiệm cận, thể hiện ở việc đạt phương sai nhỏ nhất trong lớp các ước lượng không chệch tiệm cận, từ đó giúp nâng cao độ chính xác và độ tin cậy của các kết quả phân tích (McCullagh & Nelder, 1989). Nhờ những đặc tính này, MLE đã trở thành nền tảng cho hầu hết các mô hình hồi quy sử dụng trong nghiên cứu dịch tễ học, y học lâm sàng và sức khỏe cộng đồng hiện nay.

𝟑.𝟐. 𝐓𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐭𝐨̂́𝐢 𝐮̛𝐮 𝐡𝐨́𝐚 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐥𝐨𝐠𝐢𝐬𝐭𝐢𝐜 đ𝐚 𝐭𝐡𝐮̛́𝐜

Do không tồn tại nghiệm giải tích, việc cực đại hóa hàm hợp lý trong hồi quy logistic đa thức phải được thực hiện bằng các thuật toán lặp số. Các thuật toán này khởi đầu từ một bộ giá trị ban đầu của các tham số, sau đó liên tục điều chỉnh các hệ số hồi quy qua nhiều vòng lặp để tìm bộ tham số làm cho hàm hợp lý đạt giá trị lớn nhất. Trong số các phương pháp được sử dụng phổ biến hiện nay, Newton–Raphson và Fisher Scoring là hai thuật toán đóng vai trò trung tâm trong quá trình ước lượng tham số của mô hình.

Cả hai thuật toán đều tận dụng thông tin từ đạo hàm bậc nhất và đạo hàm bậc hai của hàm log-hợp lý để xác định hướng cũng như mức độ điều chỉnh các hệ số hồi quy ở mỗi bước lặp. Thuật toán Newton–Raphson sử dụng trực tiếp ma trận Hessian của hàm log-hợp lý nhằm xác định cách cập nhật tham số theo hướng cải thiện giá trị của hàm mục tiêu nhanh nhất. Trong khi đó, Fisher Scoring sử dụng ma trận thông tin Fisher kỳ vọng thay cho ma trận Hessian quan sát được, giúp quá trình tính toán ổn định hơn trong một số tình huống dữ liệu phức tạp hoặc khi ma trận Hessian gặp khó khăn về mặt số học. Mặc dù khác nhau về cách xây dựng ma trận cập nhật, cả hai phương pháp đều hướng đến cùng một mục tiêu là tìm bộ hệ số β làm cực đại hàm hợp lý và thường cho kết quả gần như tương đương khi kích thước mẫu đủ lớn (Agresti, 2019).

Trong quá trình ước lượng, các hệ số hồi quy được cập nhật liên tục và giá trị của hàm log-hợp lý được theo dõi đồng thời để đánh giá mức độ hội tụ của mô hình. Quá trình này được xem là hoàn tất khi sự thay đổi của log-hợp lý và các hệ số hồi quy giữa hai vòng lặp liên tiếp trở nên rất nhỏ, thấp hơn ngưỡng dung sai được thiết lập trong phần mềm thống kê. Khi điều kiện đó được đáp ứng, nghiệm hiện tại được chấp nhận là nghiệm tối ưu và các hệ số thu được sẽ được sử dụng để tính sai số chuẩn, khoảng tin cậy, kiểm định giả thuyết và các chỉ số diễn giải khác của mô hình.

Trong thực hành, việc mô hình không đạt được trạng thái hội tụ thường là dấu hiệu cho thấy dữ liệu hoặc cấu trúc mô hình đang tồn tại vấn đề cần được xem xét. Những nguyên nhân thường gặp bao gồm kích thước mẫu không đủ lớn so với số lượng tham số cần ước lượng, sự hiện diện của đa cộng tuyến mạnh giữa các biến độc lập hoặc số lượng quan sát quá ít ở một số nhóm kết cục. Ngoài ra, hiện tượng phân tách hoàn toàn (complete separation), trong đó một hoặc một số biến giải thích dự đoán gần như hoàn hảo một nhóm kết cục nhất định, cũng có thể khiến các hệ số hồi quy tiến dần đến những giá trị rất lớn và làm quá trình lặp không thể hội tụ. Khi gặp những tình huống này, nhà nghiên cứu cần đánh giá lại dữ liệu, xem xét gộp các nhóm có tần suất quá thấp, đơn giản hóa mô hình hoặc áp dụng các phương pháp ước lượng phù hợp hơn để bảo đảm tính ổn định và độ tin cậy của kết quả phân tích.

𝐕𝐢́ 𝐝𝐮̣ 𝟒. 𝐐𝐮𝐚́ 𝐭𝐫𝐢̀𝐧𝐡 𝐡𝐨̣̂𝐢 𝐭𝐮̣ 𝐜𝐮̉𝐚 𝐭𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐜𝐮̛̣𝐜 đ𝐚̣𝐢 𝐡𝐨̛̣𝐩 𝐥𝐲́

Một nghiên cứu trên 1.186 bệnh nhân mắc bệnh thận mạn được thực hiện nhằm xác định các yếu tố liên quan đến lựa chọn phương pháp điều trị thay thế thận. Biến kết cục gồm ba nhóm: điều trị bảo tồn, lọc máu chu kỳ và ghép thận.

Sau khi mô hình được xây dựng, phần mềm thống kê tiến hành quá trình ước lượng tham số bằng thuật toán Newton–Raphson thông qua nhiều vòng lặp liên tiếp. Trong ví dụ này, giá trị log-hợp lý tăng dần qua từng vòng lặp và đạt trạng thái ổn định sau vòng lặp thứ sáu. Khi mức thay đổi của log-hợp lý giữa hai vòng lặp liên tiếp giảm xuống thấp hơn ngưỡng hội tụ được quy định trước, quá trình tối ưu hóa được xem là hoàn tất và bộ hệ số hồi quy tại thời điểm đó được sử dụng cho các bước đánh giá mô hình, kiểm định giả thuyết và diễn giải kết quả.

Ví dụ này minh họa một đặc điểm cơ bản của hồi quy logistic đa thức, đó là quá trình hội tụ luôn là một phần không thể tách rời của việc ước lượng tham số bằng phương pháp cực đại hóa hàm hợp lý. Số lượng vòng lặp mà thuật toán cần thực hiện không phải là thước đo phản ánh chất lượng của mô hình tốt hay xấu, mà chủ yếu cho thấy quá trình tìm kiếm bộ tham số tối ưu phù hợp với dữ liệu quan sát. Trong nhiều trường hợp, một mô hình hoàn toàn phù hợp vẫn có thể cần nhiều vòng lặp để hội tụ nếu dữ liệu phức tạp hoặc số lượng tham số cần ước lượng lớn. Điều quan trọng hơn là thuật toán phải đạt được trạng thái hội tụ ổn định và tạo ra các ước lượng hợp lý, bởi đây mới là cơ sở để bảo đảm tính tin cậy của các kết quả phân tích tiếp theo.

𝟑.𝟑. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐲́ 𝐧𝐠𝐡𝐢̃𝐚 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡

Sau khi hoàn thành quá trình ước lượng, bước tiếp theo là đánh giá xem tập hợp các biến độc lập có cải thiện khả năng giải thích của mô hình so với mô hình chỉ gồm hệ số chặn hay không. Kiểm định được sử dụng phổ biến nhất là kiểm định tỷ số hợp lý (Likelihood Ratio Test, LRT).

Nguyên lý của kiểm định là so sánh giá trị log-hợp lý của hai mô hình lồng nhau: mô hình đầy đủ và mô hình rút gọn. Thống kê kiểm định được xác định theo Công thức 6 và có phân phối xấp xỉ χ² khi giả thuyết không đúng (Hosmer et al., 2013).

Giả thuyết thống kê được phát biểu như sau.

H₀: Tất cả các hệ số hồi quy của các biến độc lập đều bằng 0.

H₁: Có ít nhất một hệ số hồi quy khác 0.

Nếu giá trị p nhỏ hơn mức ý nghĩa α đã được lựa chọn, giả thuyết không H₀ sẽ bị bác bỏ, cho thấy mô hình có chứa ít nhất một biến độc lập giúp giải thích dữ liệu tốt hơn so với mô hình chỉ bao gồm hệ số chặn. Kết quả này hàm ý rằng việc đưa các biến giải thích vào mô hình đã làm tăng đáng kể mức độ phù hợp giữa mô hình và dữ liệu quan sát, qua đó cung cấp bằng chứng thống kê cho thấy các biến được xem xét có liên quan đến biến kết cục ở cấp độ tổng thể.

Cần lưu ý rằng kiểm định tỷ số hợp lý chỉ trả lời câu hỏi liệu mô hình đầy đủ có cải thiện khả năng giải thích dữ liệu so với mô hình rút gọn hay không, chứ không xác định biến nào đang tạo ra sự cải thiện đó. Vì vậy, một mô hình vẫn có thể đạt ý nghĩa thống kê ngay cả khi chỉ một số ít biến thực sự liên quan đến kết cục nghiên cứu, trong khi các biến còn lại đóng góp rất ít hoặc không có ý nghĩa thống kê. Do đó, sau khi đánh giá ý nghĩa của toàn bộ mô hình, bước tiếp theo là xem xét riêng từng hệ số hồi quy thông qua các chỉ số như hệ số ước lượng, tỷ số odds tương đối (RRR), khoảng tin cậy 95% và giá trị p. Việc kết hợp đánh giá ở cả cấp độ mô hình và cấp độ từng biến sẽ giúp xác định chính xác yếu tố nào có liên quan đến kết cục nghiên cứu, mức độ ảnh hưởng của từng yếu tố lớn đến đâu và liệu các mối liên hệ quan sát được có mang ý nghĩa thực tiễn trong bối cảnh lâm sàng hay không.

𝟑.𝟒. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐲́ 𝐧𝐠𝐡𝐢̃𝐚 𝐜𝐮̉𝐚 𝐭𝐮̛̀𝐧𝐠 𝐡𝐞̣̂ 𝐬𝐨̂́ 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲

Ý nghĩa thống kê của từng hệ số hồi quy trong mô hình hồi quy logistic đa thức thường được đánh giá bằng kiểm định Wald, một phương pháp được sử dụng rộng rãi để kiểm tra liệu ảnh hưởng của một biến độc lập có còn tồn tại sau khi đã đồng thời hiệu chỉnh các biến còn lại trong mô hình hay không. Về bản chất, kiểm định này xem xét xem hệ số hồi quy ước lượng có khác đáng kể so với giá trị 0 hay không. Nếu hệ số hồi quy bằng 0, biến độc lập tương ứng không cung cấp thêm thông tin trong việc giải thích sự khác biệt giữa nhóm kết cục đang xét và nhóm tham chiếu. Ngược lại, khi hệ số hồi quy khác 0 một cách có ý nghĩa thống kê, có thể xem biến đó là một yếu tố liên quan độc lập với kết cục nghiên cứu.

Thống kê Wald được xác định theo Công thức 7 và, trong điều kiện kích thước mẫu đủ lớn, có phân phối xấp xỉ χ² với một bậc tự do. Đối với mỗi hệ số hồi quy, kiểm định được thực hiện dựa trên cặp giả thuyết:

H₀: β = 0

H₁: β ≠ 0

Khi giá trị p nhỏ hơn mức ý nghĩa α đã lựa chọn, giả thuyết không sẽ bị bác bỏ. Kết quả này cho thấy hệ số hồi quy khác 0 một cách có ý nghĩa thống kê và biến độc lập tương ứng có mối liên quan với nhóm kết cục đang được xem xét sau khi đã hiệu chỉnh ảnh hưởng của các biến còn lại trong mô hình. Trên thực tế, kết luận về ý nghĩa thống kê thường được diễn giải cùng với hệ số hồi quy, tỷ số nguy cơ tương đối (Relative Risk Ratio – RRR) và khoảng tin cậy 95% để đánh giá đồng thời chiều hướng, độ lớn và độ chính xác của mối liên hệ.

Mặc dù kiểm định Wald rất phổ biến nhờ cách tính đơn giản và được cung cấp mặc định trong hầu hết các phần mềm thống kê, độ tin cậy của kiểm định này có thể giảm trong một số tình huống nhất định. Khi sai số chuẩn của hệ số hồi quy lớn, cỡ mẫu hạn chế hoặc hệ số hồi quy có giá trị tuyệt đối rất lớn, phân phối xấp xỉ của thống kê Wald có thể không còn chính xác, làm cho kết quả kiểm định trở nên kém ổn định. Những vấn đề này đặc biệt dễ xuất hiện khi phân tích các biến có nhiều mức phân loại, các biến tương tác hoặc các nhóm kết cục có số lượng quan sát ít.

Vì lý do đó, nhiều nhà phương pháp học khuyến nghị sử dụng kiểm định tỷ số hợp lý (Likelihood Ratio Test) để đánh giá ảnh hưởng của biến trong các tình huống phức tạp. Khác với kiểm định Wald chỉ dựa trên hệ số ước lượng và sai số chuẩn tại một điểm, kiểm định tỷ số hợp lý đánh giá sự thay đổi mức độ phù hợp của toàn bộ mô hình khi biến cần kiểm tra được đưa vào hoặc loại bỏ khỏi mô hình. Cách tiếp cận này thường cho kết quả ổn định và đáng tin cậy hơn, đặc biệt đối với các biến có nhiều tham số hoặc các thành phần tương tác (Harrell, 2015).

𝐕𝐢́ 𝐝𝐮̣ 𝟓. 𝐊𝐢𝐞̂̉𝐦 đ𝐢̣𝐧𝐡 𝐲́ 𝐧𝐠𝐡𝐢̃𝐚 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐯𝐚̀ 𝐜𝐚́𝐜 𝐡𝐞̣̂ 𝐬𝐨̂́ 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲

Một nghiên cứu đánh giá các yếu tố liên quan đến lựa chọn phương pháp điều trị ung thư dạ dày gồm ba nhóm kết cục: phẫu thuật đơn thuần, hóa trị bổ trợ và điều trị toàn thân.

Kiểm định tỷ số hợp lý cho thấy mô hình đầy đủ có giá trị log-hợp lý lớn hơn đáng kể so với mô hình chỉ gồm hệ số chặn theo Bảng 3, với p < 0,001. Kết quả này cho thấy các biến độc lập được đưa vào mô hình đã cải thiện khả năng giải thích dữ liệu.

Tiếp theo, ý nghĩa thống kê của từng hệ số hồi quy được đánh giá bằng kiểm định Wald nhằm xác định những biến độc lập còn duy trì mối liên quan với biến kết cục sau khi đã đồng thời hiệu chỉnh ảnh hưởng của các yếu tố khác trong mô hình. Kết quả phân tích cho thấy tuổi, giai đoạn bệnh và chỉ số toàn trạng đều có ý nghĩa thống kê trong ít nhất một phương trình logit, chứng tỏ các biến này có liên quan đến xác suất thuộc một hoặc nhiều nhóm kết cục đang được nghiên cứu. Ngược lại, giới tính không đạt ý nghĩa thống kê sau khi đã hiệu chỉnh các biến còn lại, cho thấy biến này không đóng góp đáng kể vào khả năng phân biệt các nhóm kết cục trong mô hình hiện tại. Trên cơ sở các kết quả đó, bước tiếp theo sẽ tập trung vào việc đánh giá mức độ phù hợp và năng lực mô tả của mô hình nhằm xác định liệu cấu trúc mô hình được xây dựng có phản ánh dữ liệu quan sát một cách thỏa đáng hay không.