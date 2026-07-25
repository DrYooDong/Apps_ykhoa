𝐁𝐚̣𝐧 đ𝐚̃ 𝐭𝐡𝐮̛̣𝐜 𝐬𝐮̛̣ 𝐡𝐢𝐞̂̉𝐮 𝐁𝐚𝐲𝐞𝐬 𝐥𝐚̀ 𝐠𝐢̀ 𝐜𝐡𝐮̛𝐚? 𝟑 𝐭𝐡𝐚̀𝐧𝐡 𝐩𝐡𝐚̂̀𝐧 𝐪𝐮𝐲𝐞̂́𝐭 đ𝐢̣𝐧𝐡 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 𝐜𝐮̉𝐚 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐁𝐚𝐲𝐞𝐬 𝐥𝐚̀ 𝐠𝐢̀?

TS. Đào Hồng Nam

Không giống phương pháp truyền thống chỉ dựa vào dữ liệu hiện có, hồi quy Bayes kết hợp kiến thức trước đó (Prior) với thông tin từ dữ liệu (Likelihood) để tạo ra phân bố hậu nghiệm (Posterior). Chính cơ chế cập nhật này giúp mô hình linh hoạt hơn, phản ánh tốt hơn mức độ không chắc chắn của các ước lượng và đặc biệt hữu ích khi cỡ mẫu nhỏ hoặc có sẵn bằng chứng từ các nghiên cứu trước.

Trong hình dưới đây, các thành phần cốt lõi của mô hình hồi quy Bayes được tóm tắt một cách trực quan, giúp bạn hiểu rõ cách một mô hình Bayes được xây dựng trước khi đi vào suy luận và diễn giải kết quả.

𝟐. 𝐁𝐨̣̂ 𝐧𝐚̃𝐨 𝐜𝐮̉𝐚 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐁𝐚𝐲𝐞𝐬

𝟐.𝟏. 𝐌𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐭𝐫𝐨𝐧𝐠 𝐤𝐡𝐮𝐨̂𝐧 𝐤𝐡𝐨̂̉ 𝐁𝐚𝐲𝐞𝐬

Hồi quy tuyến tính Bayes được xây dựng trên cùng nền tảng mô hình tuyến tính như hồi quy tuyến tính cổ điển, trong đó biến phụ thuộc được biểu diễn như một hàm tuyến tính của các biến độc lập cùng với một thành phần sai số ngẫu nhiên. Điểm khác biệt cốt lõi giữa hai cách tiếp cận không nằm ở cấu trúc của mô hình mà ở cách các tham số hồi quy được mô hình hóa và suy luận.

Trong hồi quy tuyến tính cổ điển, các hệ số hồi quy được giả định là những hằng số cố định nhưng chưa biết. Nhà nghiên cứu sử dụng dữ liệu để tìm giá trị ước lượng tối ưu của các hệ số này thông qua phương pháp bình phương tối thiểu hoặc cực đại hóa hàm hợp lý. Ngược lại, trong hồi quy Bayes, mỗi tham số được xem là một biến ngẫu nhiên và được gán một phân bố xác suất ngay từ đầu. Do đó, kết quả phân tích không phải là một giá trị đơn lẻ mà là một phân bố xác suất phản ánh toàn bộ thông tin hiện có về tham số.

Về mặt bản chất, mô hình Bayes không thay đổi cấu trúc của mối quan hệ tuyến tính giữa biến phụ thuộc và các biến giải thích. Điều thay đổi là cách suy luận về các hệ số của mô hình. Theo quan điểm Bayes, trước khi quan sát dữ liệu, nhà nghiên cứu đã có một mức độ hiểu biết nhất định về giá trị có thể của các tham số. Sau khi có dữ liệu, những hiểu biết này được cập nhật để hình thành phân bố hậu nghiệm theo Công thức (1).

Việc kết hợp thông tin tiên nghiệm với dữ liệu quan sát tạo ra một cơ chế cập nhật tri thức có hệ thống. Khi dữ liệu mới nhất quán với những gì được giả định trước đó, phân bố hậu nghiệm sẽ trở nên tập trung hơn, cho thấy mức độ không chắc chắn về tham số đã giảm xuống. Ngược lại, nếu dữ liệu cung cấp bằng chứng khác với thông tin tiên nghiệm, phân bố hậu nghiệm sẽ thay đổi theo hướng phản ánh tốt hơn các quan sát thực tế. Nhờ khả năng cập nhật liên tục khi có thêm bằng chứng mới, suy luận Bayes được xem là phù hợp với cách tri thức khoa học được tích lũy và điều chỉnh theo thời gian.

Một đặc điểm quan trọng khác là mọi suy luận trong hồi quy Bayes đều dựa trên phân bố hậu nghiệm thay vì các giá trị điểm. Vì vậy, khi đánh giá ảnh hưởng của một yếu tố nguy cơ, nhà nghiên cứu không chỉ quan tâm đến giá trị trung bình của hệ số hồi quy mà còn xem xét hình dạng của phân bố hậu nghiệm, độ phân tán của phân bố và xác suất để hệ số mang dấu dương hoặc dấu âm. Những thông tin này cung cấp cái nhìn toàn diện hơn về mức độ chắc chắn của kết quả nghiên cứu.

𝟐.𝟐. 𝐂𝐚́𝐜 𝐭𝐡𝐚̀𝐧𝐡 𝐩𝐡𝐚̂̀𝐧 𝐜𝐮̉𝐚 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐁𝐚𝐲𝐞𝐬

Một mô hình hồi quy tuyến tính Bayes hoàn chỉnh được xây dựng từ ba thành phần cơ bản: phân bố tiên nghiệm (prior distribution), hàm hợp lý (likelihood) và phân bố hậu nghiệm (posterior distribution). Mối quan hệ giữa ba thành phần này được trình bày trong Công thức (1) và được minh họa trong Sơ đồ 1.

𝐏𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐭𝐢𝐞̂𝐧 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Phân bố tiên nghiệm phản ánh hiểu biết của nhà nghiên cứu về tham số trước khi dữ liệu được quan sát. Nguồn thông tin để xây dựng phân bố này có thể đến từ các nghiên cứu đã công bố, các phân tích gộp, dữ liệu thí điểm hoặc kinh nghiệm chuyên môn của các chuyên gia trong lĩnh vực nghiên cứu.

Trong nghiên cứu y học, bằng chứng khoa học thường được tích lũy dần qua nhiều nghiên cứu độc lập, vì vậy việc đưa thông tin tiên nghiệm vào mô hình có thể giúp tận dụng hiệu quả những tri thức đã có. Chẳng hạn, khi nhiều thử nghiệm lâm sàng trước đó đều cho thấy chỉ số khối cơ thể có mối liên quan thuận với huyết áp, hiểu biết này có thể được phản ánh thông qua phân bố tiên nghiệm của hệ số hồi quy tương ứng.

Mức độ thông tin chứa trong phân bố tiên nghiệm có thể khác nhau tùy thuộc vào lượng bằng chứng sẵn có trước nghiên cứu. Khi cơ sở dữ liệu hoặc các nghiên cứu trước còn hạn chế, nhà nghiên cứu thường sử dụng các phân bố tiên nghiệm ít thông tin hoặc thông tin yếu nhằm hạn chế ảnh hưởng của các giả định ban đầu lên kết quả phân tích. Các loại phân bố tiên nghiệm thường dùng và nguyên tắc lựa chọn chúng sẽ được trình bày chi tiết ở Mục 2.4.

𝐇𝐚̀𝐦 𝐡𝐨̛̣𝐩 𝐥𝐲́

Nếu phân bố tiên nghiệm phản ánh kiến thức trước nghiên cứu thì hàm hợp lý phản ánh thông tin chứa trong dữ liệu quan sát.

Trong hồi quy tuyến tính Bayes, quá trình đánh giá mức độ phù hợp giữa các giá trị tham số và dữ liệu quan sát được thực hiện thông qua hàm hợp lý. Hàm này biểu thị xác suất thu được bộ dữ liệu hiện tại khi giả định tham số nhận một giá trị cụ thể và thường được xây dựng trên giả định rằng sai số của mô hình tuân theo phân bố chuẩn, tương tự như trong hồi quy tuyến tính cổ điển.

Những giá trị của tham số tạo ra các dự đoán gần với dữ liệu thực tế sẽ có hàm hợp lý lớn hơn, trong khi các giá trị dẫn đến sai lệch đáng kể giữa dự đoán và quan sát sẽ có hàm hợp lý nhỏ hơn. Nhờ đó, hàm hợp lý cho biết dữ liệu hiện có ủng hộ mức độ nào đối với các giá trị khác nhau của tham số và cung cấp thông tin quan trọng cho quá trình suy luận thống kê.

Mặc dù phản ánh mối quan hệ giữa tham số và dữ liệu quan sát, hàm hợp lý không phải là phân bố xác suất của tham số. Chỉ khi được kết hợp với phân bố tiên nghiệm theo Định lý Bayes, thông tin từ hàm hợp lý mới được chuyển thành phân bố hậu nghiệm, từ đó cho phép thực hiện các suy luận và ước lượng trong khuôn khổ Bayes.

𝐏𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Phân bố hậu nghiệm là kết quả cuối cùng của quá trình suy luận Bayes và cũng là đối tượng trung tâm của toàn bộ phương pháp hồi quy Bayes.

Có thể hiểu phân bố hậu nghiệm là phiên bản được cập nhật của phân bố tiên nghiệm sau khi đã xét đến dữ liệu quan sát. Nếu phân bố tiên nghiệm phản ánh những gì nhà nghiên cứu tin tưởng trước nghiên cứu thì phân bố hậu nghiệm phản ánh những gì nhà nghiên cứu tin tưởng sau khi có bằng chứng thực nghiệm.

Từ phân bố hậu nghiệm, có thể tính toán nhiều đại lượng thống kê khác nhau như giá trị trung bình hậu nghiệm, trung vị hậu nghiệm, mode hậu nghiệm, phương sai hậu nghiệm, khoảng tin cậy Bayes và xác suất hậu nghiệm của các giả thuyết. Tất cả các kết quả được báo cáo trong hồi quy Bayes đều được suy ra từ phân bố này.

Một ưu điểm nổi bật của phân bố hậu nghiệm là khả năng mô tả trực tiếp sự không chắc chắn của tham số. Thay vì chỉ đưa ra một giá trị ước lượng duy nhất, phân bố hậu nghiệm cho biết toàn bộ phạm vi giá trị mà tham số có thể nhận cùng với xác suất tương ứng của từng giá trị.

𝟐.𝟑. 𝐘́ 𝐧𝐠𝐡𝐢̃𝐚 𝐜𝐮̉𝐚 𝐪𝐮𝐚́ 𝐭𝐫𝐢̀𝐧𝐡 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐁𝐚𝐲𝐞𝐬

Quá trình cập nhật tri thức là đặc điểm cốt lõi làm nên sự khác biệt của thống kê Bayes so với các phương pháp thống kê truyền thống. Thay vì xem mỗi nghiên cứu như một nguồn bằng chứng tách biệt, suy luận Bayes coi tri thức khoa học là kết quả của một quá trình tích lũy liên tục, trong đó thông tin thu được từ các nghiên cứu trước được kết hợp với dữ liệu mới để tạo ra những hiểu biết ngày càng hoàn thiện hơn về hiện tượng nghiên cứu.

Giả sử trước khi tiến hành nghiên cứu, các bằng chứng hiện có cho thấy một loại thuốc mới có khả năng làm giảm huyết áp khoảng 5 mmHg. Thông tin này được biểu diễn bằng phân bố tiên nghiệm. Sau khi hoàn thành một thử nghiệm lâm sàng mới, dữ liệu thu được được kết hợp với phân bố tiên nghiệm để tạo thành phân bố hậu nghiệm. Nếu kết quả của nghiên cứu mới phù hợp với các bằng chứng trước đó, phân bố hậu nghiệm sẽ trở nên hẹp hơn, phản ánh mức độ chắc chắn cao hơn. Ngược lại, nếu dữ liệu mới khác biệt đáng kể, phân bố hậu nghiệm sẽ dịch chuyển theo hướng phù hợp hơn với bằng chứng thực nghiệm.

Như vậy, suy luận Bayes không xem kiến thức khoa học là bất biến mà coi đó là một quá trình được cập nhật liên tục khi có thêm bằng chứng mới. Đây cũng chính là cách thức mà tri thức y học phát triển trong thực tế.

𝟐.𝟒. 𝐂𝐚́𝐜 𝐥𝐨𝐚̣𝐢 𝐩𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐭𝐢𝐞̂𝐧 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Việc lựa chọn phân bố tiên nghiệm là một trong những bước quan trọng nhất khi xây dựng mô hình hồi quy Bayes. Mặc dù cùng dựa trên một nguyên lý suy luận, kết quả phân tích có thể khác nhau nếu sử dụng các phân bố tiên nghiệm khác nhau, đặc biệt trong các nghiên cứu có cỡ mẫu nhỏ.

Nhìn chung, phân bố tiên nghiệm có thể được chia thành ba nhóm chính.

Phân bố tiên nghiệm không thông tin

Phân bố tiên nghiệm không thông tin (non-informative prior) được sử dụng khi nhà nghiên cứu không có hoặc không muốn đưa bất kỳ thông tin nào trước nghiên cứu vào mô hình. Mục tiêu của loại phân bố này là để dữ liệu đóng vai trò quyết định gần như hoàn toàn trong quá trình suy luận.

Trong thực tế, khái niệm "không thông tin" chỉ mang tính tương đối vì bất kỳ lựa chọn phân bố tiên nghiệm nào cũng hàm chứa những giả định nhất định về tham số cần ước lượng. Mức độ ảnh hưởng của các giả định này phụ thuộc vào đặc điểm của phân bố được lựa chọn; khi phương sai của phân bố tiên nghiệm đủ lớn, tác động của tiên nghiệm lên phân bố hậu nghiệm thường rất nhỏ và kết quả suy luận chủ yếu được quyết định bởi dữ liệu quan sát.

Phân bố tiên nghiệm thông tin yếu

Phân bố tiên nghiệm thông tin yếu (weakly informative prior) hiện là lựa chọn được khuyến nghị nhiều nhất trong nghiên cứu y học.

Loại phân bố này không áp đặt mạnh mẽ giá trị của tham số nhưng vẫn loại bỏ các giá trị cực đoan không hợp lý về mặt sinh học hoặc lâm sàng. Nhờ đó, mô hình trở nên ổn định hơn mà vẫn để dữ liệu giữ vai trò quyết định.

Nhiều phần mềm Bayes hiện đại như Stan, brms hoặc rstanarm mặc định sử dụng các phân bố tiên nghiệm thông tin yếu cho nhiều loại mô hình hồi quy, bởi chúng tạo được sự cân bằng giữa tính linh hoạt và tính ổn định của quá trình ước lượng.

Phân bố tiên nghiệm có thông tin

Phân bố tiên nghiệm có thông tin (informative prior) được sử dụng khi đã có các nguồn bằng chứng đáng tin cậy từ những nghiên cứu trước đó. Trong nghiên cứu y học, loại tiên nghiệm này thường được xây dựng từ kết quả của các phân tích gộp, các thử nghiệm lâm sàng quy mô lớn hoặc các nghiên cứu đoàn hệ có chất lượng cao. Đối với những nghiên cứu có cỡ mẫu hạn chế, việc đưa các thông tin sẵn có vào phân bố tiên nghiệm có thể giúp cải thiện đáng kể độ chính xác và độ ổn định của các ước lượng.

Hiệu quả của cách tiếp cận này phụ thuộc vào mức độ phù hợp giữa thông tin tiên nghiệm và quần thể nghiên cứu hiện tại. Nếu các bằng chứng được sử dụng để xây dựng tiên nghiệm không phản ánh đúng đặc điểm của quần thể đích hoặc chứa những sai lệch có hệ thống, phân bố hậu nghiệm cũng có thể bị ảnh hưởng theo. Vì lý do đó, các hướng dẫn phương pháp luận thường khuyến nghị thực hiện phân tích độ nhạy (sensitivity analysis) với nhiều lựa chọn tiên nghiệm khác nhau nhằm đánh giá mức độ ổn định và độ tin cậy của kết quả.

𝟐.𝟓. 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐩𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐭𝐢𝐞̂𝐧 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐲 𝐡𝐨̣𝐜

Việc lựa chọn phân bố tiên nghiệm là một trong những nội dung được quan tâm nhiều nhất trong thống kê Bayes, bởi đây cũng là điểm khác biệt cơ bản giữa phương pháp Bayes và các phương pháp thống kê theo trường phái tần suất. Trong thực tế, không tồn tại một phân bố tiên nghiệm phù hợp cho mọi nghiên cứu. Việc lựa chọn cần căn cứ vào mục tiêu nghiên cứu, đặc điểm của quần thể, chất lượng của các bằng chứng đã có và mức độ tin cậy của các nguồn thông tin tiên nghiệm.

Một quan niệm chưa chính xác nhưng vẫn còn khá phổ biến là phân bố tiên nghiệm hoàn toàn mang tính chủ quan. Thực tế, trong nghiên cứu y học hiện đại, việc xây dựng phân bố tiên nghiệm thường dựa trên các bằng chứng khoa học đã được công bố thay vì chỉ dựa vào ý kiến cá nhân. Những nguồn thông tin này có thể bao gồm các phân tích gộp (meta-analysis), các tổng quan hệ thống (systematic reviews), các thử nghiệm lâm sàng ngẫu nhiên có chất lượng cao, các nghiên cứu đoàn hệ quy mô lớn hoặc các nghiên cứu thí điểm được thực hiện trên cùng quần thể nghiên cứu.

Ví dụ, khi đánh giá ảnh hưởng của chỉ số khối cơ thể đến huyết áp tâm thu ở người trưởng thành Việt Nam, nếu nhiều nghiên cứu trước đây đã ghi nhận mối liên quan thuận với kích thước hiệu quả tương đối ổn định, nhà nghiên cứu có thể sử dụng các kết quả này để xây dựng phân bố tiên nghiệm cho hệ số hồi quy của BMI. Trong những trường hợp chưa có bằng chứng tương tự hoặc nghiên cứu được thực hiện trên các nhóm bệnh nhân có đặc điểm rất đặc thù, chẳng hạn người ghép gan hoặc người mắc bệnh hiếm, việc sử dụng phân bố tiên nghiệm thông tin yếu thường phù hợp hơn nhằm hạn chế ảnh hưởng quá lớn của các giả định ban đầu lên kết quả phân tích.

Mức độ mạnh hay yếu của phân bố tiên nghiệm cũng là một vấn đề cần được cân nhắc bên cạnh nguồn gốc của thông tin được sử dụng để xây dựng tiên nghiệm. Một phân bố tiên nghiệm quá hẹp sẽ làm cho phân bố hậu nghiệm chịu ảnh hưởng mạnh từ thông tin trước nghiên cứu, đặc biệt trong các nghiên cứu có cỡ mẫu nhỏ, khiến dữ liệu mới khó điều chỉnh các giả định ban đầu. Ở chiều ngược lại, khi phân bố tiên nghiệm được lựa chọn quá rộng, lượng thông tin mà tiên nghiệm đóng góp cho quá trình suy luận sẽ giảm đáng kể và mô hình có xu hướng hoạt động gần giống với hồi quy tuyến tính cổ điển.

Trong thực hành, nhiều chuyên gia khuyến nghị sử dụng phân bố tiên nghiệm thông tin yếu (weakly informative prior) đối với các nghiên cứu quan sát hoặc nghiên cứu lâm sàng thông thường (Gelman và cộng sự, 2021). Cách tiếp cận này giúp loại bỏ các giá trị phi thực tế của tham số nhưng vẫn để dữ liệu đóng vai trò chủ đạo trong quá trình suy luận.

Một nguyên tắc quan trọng khác là phân bố tiên nghiệm phải phù hợp với ý nghĩa sinh học của tham số. Ví dụ, phương sai luôn là một đại lượng không âm, do đó không nên lựa chọn các phân bố có khả năng sinh ra giá trị âm cho tham số này. Tương tự, đối với các biến biểu thị xác suất, phân bố tiên nghiệm phải được xác định trong khoảng từ 0 đến 1. Những nguyên tắc này không chỉ bảo đảm tính đúng đắn về mặt toán học mà còn giúp mô hình phản ánh hợp lý các hiện tượng sinh học và lâm sàng.

Ngày nay, cùng với sự phát triển của các phần mềm Bayes, việc lựa chọn phân bố tiên nghiệm trở nên linh hoạt hơn. Các gói phần mềm như Stan, brms, rstanarm và JASP đều cho phép người sử dụng lựa chọn hoặc điều chỉnh phân bố tiên nghiệm theo mục tiêu nghiên cứu. Đồng thời, các phần mềm này cũng hỗ trợ đánh giá ảnh hưởng của phân bố tiên nghiệm đến kết quả thông qua các phân tích độ nhạy, giúp nhà nghiên cứu kiểm tra tính ổn định của các kết luận.

𝟐.𝟔. 𝐏𝐡𝐚̂𝐧 𝐭𝐢́𝐜𝐡 đ𝐨̣̂ 𝐧𝐡𝐚̣𝐲 đ𝐨̂́𝐢 𝐯𝐨̛́𝐢 𝐩𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐭𝐢𝐞̂𝐧 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Do phân bố tiên nghiệm có thể ảnh hưởng đến phân bố hậu nghiệm, đặc biệt trong các nghiên cứu có cỡ mẫu nhỏ, nhiều hướng dẫn phương pháp luận khuyến nghị thực hiện phân tích độ nhạy (sensitivity analysis) như một bước không thể thiếu trong phân tích Bayes.

Phân tích độ nhạy được thực hiện bằng cách xây dựng cùng một mô hình với các lựa chọn phân bố tiên nghiệm khác nhau nhằm đánh giá mức độ phụ thuộc của kết quả vào những giả định ban đầu. Khi các ước lượng hậu nghiệm gần như không thay đổi giữa các phương án tiên nghiệm, có thể xem dữ liệu quan sát là nguồn thông tin chi phối quá trình suy luận. Trường hợp các kết quả thay đổi đáng kể theo lựa chọn tiên nghiệm, ảnh hưởng của thông tin trước nghiên cứu trở nên rõ rệt hơn, cho thấy dữ liệu hiện tại chưa cung cấp đủ bằng chứng để tạo ra các kết luận ổn định.

Trong nghiên cứu y học, phân tích độ nhạy có ý nghĩa đặc biệt quan trọng khi sử dụng các phân bố tiên nghiệm có thông tin. Ví dụ, nếu phân bố tiên nghiệm được xây dựng từ các nghiên cứu thực hiện trên quần thể châu Âu nhưng nghiên cứu hiện tại được tiến hành trên người Việt Nam, nhà nghiên cứu cần đánh giá xem sự khác biệt về đặc điểm dân số có làm thay đổi đáng kể kết quả hay không. Nếu các kết quả ổn định khi sử dụng nhiều phân bố tiên nghiệm khác nhau, mức độ tin cậy của kết luận sẽ được nâng cao.

Một số tác giả còn khuyến nghị báo cáo đồng thời kết quả của hồi quy tuyến tính Bayes và hồi quy tuyến tính cổ điển trong cùng một nghiên cứu. Việc so sánh hai phương pháp giúp người đọc đánh giá được mức độ ảnh hưởng của thông tin tiên nghiệm cũng như hiểu rõ hơn bản chất của các kết quả phân tích.

𝟐.𝟕. 𝐍𝐡𝐮̛̃𝐧𝐠 𝐡𝐢𝐞̂̉𝐮 𝐥𝐚̂̀𝐦 𝐭𝐡𝐮̛𝐨̛̀𝐧𝐠 𝐠𝐚̣̆𝐩 𝐯𝐞̂̀ 𝐩𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐭𝐢𝐞̂𝐧 𝐧𝐠𝐡𝐢𝐞̣̂𝐦

Mặc dù thống kê Bayes ngày càng được sử dụng rộng rãi, nhiều quan niệm chưa chính xác về vai trò của phân bố tiên nghiệm vẫn còn tồn tại trong thực hành nghiên cứu. Một trong những quan niệm phổ biến nhất là xem mọi phân bố tiên nghiệm đều mang tính chủ quan. Trên thực tế, mức độ chủ quan phụ thuộc vào nguồn thông tin được sử dụng để xây dựng tiên nghiệm. Khi phân bố tiên nghiệm được thiết lập từ các bằng chứng khoa học có chất lượng cao, các phân tích gộp hoặc dữ liệu từ những thử nghiệm lâm sàng trước đó, nó phản ánh quá trình tổng hợp bằng chứng hơn là ý kiến cá nhân của nhà nghiên cứu.

Một quan niệm khác cho rằng phân bố tiên nghiệm luôn quyết định kết quả cuối cùng của phân tích. Ảnh hưởng này chỉ trở nên đáng kể khi cỡ mẫu nhỏ hoặc khi phân bố tiên nghiệm chứa lượng thông tin rất mạnh. Khi số lượng quan sát tăng lên, dữ liệu sẽ đóng vai trò ngày càng lớn trong quá trình suy luận và phân bố hậu nghiệm chủ yếu phản ánh bằng chứng thực nghiệm thu được từ nghiên cứu hiện tại. Đặc tính này thường được gọi là tính nhất quán tiệm cận (asymptotic consistency) của suy luận Bayes.

Không ít nhà nghiên cứu cũng lo ngại rằng một lựa chọn tiên nghiệm chưa phù hợp có thể làm cho toàn bộ kết quả phân tích trở nên vô giá trị. Trong thực hành, ảnh hưởng của tiên nghiệm có thể được đánh giá trực tiếp thông qua phân tích độ nhạy bằng cách so sánh kết quả thu được từ nhiều lựa chọn tiên nghiệm hợp lý khác nhau. Việc các ước lượng hậu nghiệm duy trì sự ổn định giữa các kịch bản này thường được xem là bằng chứng cho thấy các kết luận nghiên cứu không phụ thuộc quá mức vào một giả định tiên nghiệm cụ thể.

Nhận thức rằng hồi quy Bayes chỉ phù hợp với các nghiên cứu có cỡ mẫu nhỏ cũng chưa phản ánh đầy đủ phạm vi ứng dụng của phương pháp. Dù những lợi thế của cách tiếp cận Bayes thường được thể hiện rõ trong các nghiên cứu có lượng dữ liệu hạn chế, phương pháp này vẫn được sử dụng rộng rãi trong các bộ dữ liệu quy mô lớn, đặc biệt trong các mô hình phân cấp, mô hình đa mức và nhiều phương pháp học máy Bayesian hiện đại.

Ví dụ 2. Lựa chọn phân bố tiên nghiệm trong nghiên cứu ảnh hưởng của BMI đến huyết áp

Một nhóm nghiên cứu thực hiện khảo sát trên 120 bệnh nhân tăng huyết áp nhằm đánh giá ảnh hưởng của tuổi, chỉ số khối cơ thể, nồng độ cholesterol toàn phần và mức lọc cầu thận đến huyết áp tâm thu.

Trước khi phân tích, nhóm nghiên cứu rà soát các tổng quan hệ thống và phân tích gộp đã công bố về mối liên quan giữa BMI và huyết áp. Các kết quả trước đây đều cho thấy hệ số hồi quy của BMI có giá trị dương nhưng kích thước hiệu quả dao động giữa các nghiên cứu do khác biệt về đặc điểm dân số và phương pháp đo lường.

Thay vì sử dụng một phân bố tiên nghiệm rất mạnh dựa trực tiếp trên các nghiên cứu trước, nhóm nghiên cứu lựa chọn một phân bố tiên nghiệm thông tin yếu để phản ánh niềm tin rằng BMI có khả năng ảnh hưởng đến huyết áp nhưng vẫn dành vai trò quyết định cho dữ liệu hiện tại. Sau khi xây dựng mô hình, nhóm nghiên cứu tiếp tục thực hiện phân tích độ nhạy bằng cách thay thế phân bố tiên nghiệm thông tin yếu bằng một phân bố tiên nghiệm ít thông tin và một phân bố tiên nghiệm có thông tin hơn.

Kết quả cho thấy giá trị trung bình hậu nghiệm của hệ số hồi quy, khoảng tin cậy Bayes 95% và xác suất hậu nghiệm của hệ số đều thay đổi rất ít giữa ba mô hình. Điều này chứng tỏ dữ liệu nghiên cứu đủ mạnh để quyết định kết quả phân tích và các kết luận không phụ thuộc đáng kể vào lựa chọn phân bố tiên nghiệm.

Ví dụ trên minh họa một nguyên tắc quan trọng trong thực hành thống kê Bayes: lựa chọn phân bố tiên nghiệm không phải là bước cuối cùng mà cần được kiểm chứng thông qua phân tích độ nhạy. Việc báo cáo cả quá trình lựa chọn tiên nghiệm và kết quả phân tích độ nhạy giúp tăng tính minh bạch, khả năng tái lập và độ tin cậy của nghiên cứu.