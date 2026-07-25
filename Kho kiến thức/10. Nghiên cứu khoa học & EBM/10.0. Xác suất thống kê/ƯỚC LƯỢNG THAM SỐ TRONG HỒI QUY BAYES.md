𝐔̛𝐨̛́𝐜 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐭𝐡𝐚𝐦 𝐬𝐨̂́ 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐁𝐚𝐲𝐞𝐬. 𝐋𝐚̀𝐦 𝐭𝐡𝐞̂́ 𝐧𝐚̀𝐨 đ𝐞̂̉ 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐁𝐚𝐲𝐞𝐬 𝐭𝐢̀𝐦 𝐫𝐚 𝐥𝐨̛̀𝐢 𝐠𝐢𝐚̉𝐢?

TS. Đào Hồng Nam

Sau khi xây dựng mô hình và xác định phân bố hậu nghiệm, bước tiếp theo là ước lượng các tham số của mô hình. Trong nhiều bài toán thực tế, phân bố hậu nghiệm không thể tính toán trực tiếp, do đó các phương pháp lấy mẫu trở thành công cụ quan trọng để xấp xỉ nghiệm và thực hiện suy luận Bayes.

Từ Gibbs Sampling, Metropolis–Hastings, Hamiltonian Monte Carlo đến No-U-Turn Sampler, mỗi thuật toán đều có nguyên lý hoạt động, ưu điểm và hạn chế riêng. Việc lựa chọn thuật toán phù hợp không chỉ ảnh hưởng đến tốc độ tính toán mà còn quyết định độ ổn định và độ tin cậy của kết quả phân tích.

𝟒. 𝐔̛𝐨̛́𝐜 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐭𝐡𝐚𝐦 𝐬𝐨̂́ 𝐭𝐫𝐨𝐧𝐠 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐁𝐚𝐲𝐞𝐬

𝟒.𝟏. Đ𝐚̣̆𝐭 𝐯𝐚̂́𝐧 đ𝐞̂̀

Sau khi xây dựng mô hình hồi quy Bayes và xác định phân bố tiên nghiệm cùng hàm hợp lý, nhiệm vụ tiếp theo là suy ra phân bố hậu nghiệm của các tham số cần nghiên cứu. Về mặt lý thuyết, phân bố này chứa toàn bộ thông tin cần thiết cho quá trình suy luận thống kê, bởi các đại lượng như giá trị trung bình hậu nghiệm, phương sai hậu nghiệm, khoảng tin cậy Bayes và xác suất hậu nghiệm đều có thể được tính trực tiếp từ phân bố hậu nghiệm.

Khó khăn xuất hiện khi áp dụng hồi quy Bayes cho các bài toán thực tế, đặc biệt đối với những mô hình có nhiều biến độc lập hoặc cấu trúc phân cấp phức tạp. Trong các trường hợp này, phân bố hậu nghiệm thường có dạng toán học rất phức tạp, không có nghiệm đóng (closed-form solution) hoặc đòi hỏi phải tính các tích phân nhiều chiều vượt quá khả năng của các phương pháp giải tích thông thường. Chính trở ngại về mặt tính toán này đã hạn chế việc ứng dụng rộng rãi của thống kê Bayes trong một thời gian dài, mặc dù nền tảng lý thuyết của phương pháp đã được thiết lập từ rất sớm.

Sự phát triển của máy tính tốc độ cao và các thuật toán mô phỏng ngẫu nhiên từ cuối thế kỷ XX đã làm thay đổi hoàn toàn tình hình này. Thay vì tìm nghiệm giải tích của phân bố hậu nghiệm, các thuật toán Bayes hiện đại tạo ra một số lượng rất lớn các mẫu ngẫu nhiên từ phân bố hậu nghiệm. Khi số lượng mẫu đủ lớn và quá trình lấy mẫu hội tụ, tập hợp các mẫu này sẽ xấp xỉ rất tốt phân bố hậu nghiệm thực sự. Từ đó, các đại lượng thống kê cần thiết có thể được tính bằng các phương pháp số thay vì các phép tính giải tích truyền thống (Gelman và cộng sự, 2021).

Chính nhờ sự ra đời của các thuật toán lấy mẫu mà hồi quy Bayes đã chuyển từ một lĩnh vực chủ yếu mang tính lý thuyết trở thành một phương pháp thống kê có khả năng ứng dụng rộng rãi trong nghiên cứu y học.

𝟒.𝟐. 𝐕𝐢̀ 𝐬𝐚𝐨 𝐩𝐡𝐚̂𝐧 𝐛𝐨̂́ 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 𝐭𝐡𝐮̛𝐨̛̀𝐧𝐠 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 𝐠𝐢𝐚̉𝐢 𝐭𝐢́𝐜𝐡?

Trong một số mô hình hồi quy tuyến tính đơn giản sử dụng các phân bố tiên nghiệm liên hợp (conjugate priors), phân bố hậu nghiệm có thể được xác định trực tiếp bằng các công thức toán học. Những trường hợp này cho phép thực hiện suy luận Bayes tương đối thuận lợi do không cần đến các phương pháp tính toán số phức tạp. Phần lớn các bài toán gặp trong thực hành nghiên cứu lại có cấu trúc mô hình phức tạp hơn, với nhiều biến giải thích, nhiều tầng dữ liệu hoặc các dạng phân bố không còn duy trì tính liên hợp giữa tiên nghiệm và hàm hợp lý, khiến việc xác định phân bố hậu nghiệm bằng các công thức giải tích không còn khả thi.

Trong nghiên cứu y học hiện đại, mô hình hồi quy thường bao gồm nhiều biến độc lập, biến tương tác, biến phân cấp hoặc các cấu trúc dữ liệu phức tạp. Khi đó, phân bố hậu nghiệm trở thành một hàm nhiều chiều với hình dạng rất phức tạp.

Về mặt toán học, việc xác định phân bố hậu nghiệm đòi hỏi tính xác suất biên của dữ liệu, được trình bày trong Công thức (7). Đại lượng này được tính thông qua tích phân trên toàn bộ không gian của các tham số.

Nếu mô hình chỉ bao gồm một hoặc hai tham số, việc tính các tích phân này đôi khi vẫn có thể thực hiện bằng các phương pháp giải tích. Số lượng tham số càng tăng thì không gian tham số càng mở rộng và trở nên phức tạp hơn, đặc biệt trong các mô hình có hàng chục hoặc hàng trăm tham số cần ước lượng. Khi đó, việc xác định phân bố hậu nghiệm bằng các công thức toán học thông thường gần như không còn khả thi và các phương pháp tính toán số trở thành lựa chọn cần thiết.

𝐕𝐢́ 𝐝𝐮̣, một mô hình hồi quy dự báo huyết áp có thể đồng thời bao gồm tuổi, giới tính, BMI, vòng bụng, cholesterol, glucose máu, mức lọc cầu thận, tình trạng hút thuốc, hoạt động thể lực và nhiều biến tương tác. Khi đó, số lượng tham số cần ước lượng có thể lên tới vài chục hoặc vài trăm, đặc biệt nếu mô hình có thêm các hiệu ứng ngẫu nhiên hoặc cấu trúc phân cấp.

Thay vì cố gắng giải chính xác phân bố hậu nghiệm, thống kê Bayes hiện đại sử dụng các phương pháp mô phỏng để lấy mẫu từ phân bố này. Đây là cơ sở của các thuật toán Markov Chain Monte Carlo.

𝟒.𝟑. 𝐍𝐠𝐮𝐲𝐞̂𝐧 𝐥𝐲́ 𝐜𝐮̉𝐚 𝐌𝐚𝐫𝐤𝐨𝐯 𝐂𝐡𝐚𝐢𝐧 𝐌𝐨𝐧𝐭𝐞 𝐂𝐚𝐫𝐥𝐨

Markov Chain Monte Carlo (MCMC) là nhóm thuật toán được sử dụng phổ biến nhất để lấy mẫu từ phân bố hậu nghiệm.

Ý tưởng cơ bản của MCMC là xây dựng một chuỗi Markov sao cho sau một số lượng đủ lớn các bước lặp, phân bố của chuỗi sẽ tiến gần đến phân bố hậu nghiệm cần quan tâm.

Khác với các phương pháp lấy mẫu ngẫu nhiên độc lập, MCMC tạo ra một chuỗi các mẫu trong đó mỗi giá trị mới được sinh ra dựa trên giá trị ở bước trước theo quy luật chuyển trạng thái của chuỗi Markov. Quá trình này bắt đầu từ một giá trị khởi tạo của tham số, sau đó thuật toán liên tục cập nhật và sinh ra các giá trị mới theo cơ chế đã được xác định. Khi số vòng lặp tăng lên, ảnh hưởng của giá trị khởi tạo dần suy giảm và các giá trị trong chuỗi bắt đầu phản ánh đặc điểm của phân bố hậu nghiệm mục tiêu. Trong giai đoạn này, chuỗi dao động quanh phân bố hậu nghiệm thực sự, cho phép sử dụng các mẫu thu được để xấp xỉ các đại lượng thống kê quan tâm.

Tập hợp các giá trị thu được sau khi chuỗi hội tụ được xem như các mẫu từ phân bố hậu nghiệm. Từ những mẫu này, có thể tính giá trị trung bình hậu nghiệm, phương sai, khoảng tin cậy Bayes và nhiều đại lượng thống kê khác.

Quy trình tổng quát của thuật toán được minh họa trong Sơ đồ 2.

𝟒.𝟒. 𝐂𝐡𝐮𝐨̂̃𝐢 𝐌𝐚𝐫𝐤𝐨𝐯

Một chuỗi Markov là dãy các trạng thái mà xác suất chuyển sang trạng thái kế tiếp chỉ phụ thuộc vào trạng thái hiện tại, thay vì toàn bộ các trạng thái đã xuất hiện trước đó. Đặc điểm này được gọi là tính chất Markov. Trong hồi quy Bayes, mỗi trạng thái của chuỗi đại diện cho một tập giá trị cụ thể của các tham số hồi quy, và sự dịch chuyển giữa các trạng thái tạo nên cơ sở cho quá trình lấy mẫu từ phân bố hậu nghiệm.

𝐕𝐢́ 𝐝𝐮̣, tại một thời điểm bất kỳ, chuỗi có thể chứa một bộ giá trị gồm hệ số chặn, hệ số của tuổi, hệ số của BMI và phương sai của sai số. Ở bước tiếp theo, thuật toán sẽ tạo ra một bộ giá trị mới dựa trên bộ giá trị hiện tại.

Sau rất nhiều lần lặp, phân bố của các bộ giá trị này sẽ phản ánh phân bố hậu nghiệm của toàn bộ mô hình.

𝟒.𝟓. 𝐌𝐨𝐧𝐭𝐞 𝐂𝐚𝐫𝐥𝐨

Khái niệm Monte Carlo dựa trên việc sử dụng các số ngẫu nhiên để giải gần đúng những bài toán toán học mà việc tính toán trực tiếp thường rất khó hoặc không khả thi. Trong thống kê Bayes, các tích phân nhiều chiều xuất hiện khi xây dựng phân bố hậu nghiệm thường không có nghiệm giải tích, vì vậy các giá trị cần quan tâm được ước lượng thông qua một số lượng lớn mẫu ngẫu nhiên được rút từ phân bố này. Theo định luật số lớn, trung bình tính từ các mẫu sẽ dần tiến tới kỳ vọng thực khi số lượng mẫu tăng lên. Nhờ cơ chế đó, các đặc trưng của phân bố hậu nghiệm có thể được ước lượng với độ chính xác cao ngay cả trong những trường hợp không thể tìm được lời giải chính xác bằng phương pháp giải tích.

𝟒.𝟔. 𝐆𝐢𝐚𝐢 đ𝐨𝐚̣𝐧 𝐁𝐮𝐫𝐧-𝐢𝐧

Một đặc điểm quan trọng của MCMC là các mẫu được tạo ra ở giai đoạn đầu thường chưa đại diện tốt cho phân bố hậu nghiệm do chuỗi vẫn còn chịu ảnh hưởng của giá trị khởi tạo. Để hạn chế tác động này, người nghiên cứu thường loại bỏ một số lượng mẫu đầu tiên trước khi tiến hành phân tích. Khoảng thời gian chuỗi chuyển dần từ trạng thái ban đầu đến vùng phân bố ổn định được gọi là burn-in.

𝐕𝐢́ 𝐝𝐮̣, nếu mỗi chuỗi chạy 5.000 vòng lặp thì có thể loại bỏ 1.000 hoặc 2.000 vòng đầu tiên, chỉ sử dụng các mẫu còn lại để suy luận.

Việc lựa chọn số vòng burn-in phụ thuộc vào tốc độ hội tụ của chuỗi và sẽ được đánh giá thông qua các tiêu chí trình bày ở Mục 5.

𝟒.𝟕. 𝐓𝐡𝐢𝐧𝐧𝐢𝐧𝐠

Ngoài giai đoạn burn-in, kỹ thuật thinning cũng từng được sử dụng khá phổ biến trong các phân tích MCMC nhằm giảm mức độ tự tương quan giữa các mẫu. Phương pháp này hoạt động bằng cách chỉ giữ lại một mẫu sau mỗi số bước xác định; chẳng hạn, với thinning bằng 5, cứ năm mẫu liên tiếp mới lưu lại một mẫu. Thinning từng được xem là một giải pháp hữu ích khi khả năng lưu trữ và tính toán còn hạn chế. Sự phát triển của các thuật toán hiện đại như Hamiltonian Monte Carlo và No-U-Turn Sampler đã khiến vai trò của kỹ thuật này được đánh giá lại. Nhiều nghiên cứu cho thấy việc loại bỏ bớt các mẫu thường làm giảm kích thước mẫu hiệu quả trong khi mang lại rất ít lợi ích về mặt thống kê (Gelman và cộng sự, 2021). Vì vậy, các phần mềm hiện đại như Stan và JASP thường không áp dụng thinning theo mặc định, ngoại trừ những trường hợp có yêu cầu đặc biệt liên quan đến giới hạn bộ nhớ hoặc lưu trữ dữ liệu.

𝟒.𝟖. 𝐒𝐨̂́ 𝐜𝐡𝐮𝐨̂̃𝐢 𝐌𝐚𝐫𝐤𝐨𝐯

Việc sử dụng nhiều chuỗi Markov với các giá trị khởi tạo khác nhau là một yêu cầu quan trọng trong đánh giá hội tụ của mô hình Bayes. Trong thực hành, hầu hết các phần mềm đều mặc định chạy đồng thời từ bốn đến sáu chuỗi Markov nhằm kiểm tra xem các chuỗi có cùng tiến đến một phân bố hậu nghiệm hay không.

Khi các chuỗi bắt đầu từ những điểm xuất phát khác nhau nhưng cuối cùng đều tập trung vào cùng một vùng của không gian tham số và có đặc điểm phân bố tương tự nhau, có thể xem đó là bằng chứng cho thấy kết quả suy luận không còn phụ thuộc vào giá trị khởi tạo ban đầu. Trường hợp các chuỗi vẫn nằm ở những vùng khác nhau hoặc thể hiện các hành vi khác biệt đáng kể sau một số lượng lớn vòng lặp, mô hình có thể chưa đạt hội tụ và cần được xem xét lại thông qua việc điều chỉnh mô hình, tăng số vòng lặp hoặc đánh giá lại các giả định đã sử dụng.

Việc sử dụng nhiều chuỗi Markov cũng là cơ sở để tính toán hệ số R̂, một trong những tiêu chí quan trọng nhất đánh giá sự hội tụ của MCMC sẽ được trình bày ở Mục 5.

𝐕𝐢́ 𝐝𝐮̣ 4. Ước lượng hồi quy Bayes trong nghiên cứu chức năng thận

Một nghiên cứu được thực hiện trên 210 bệnh nhân mắc bệnh thận mạn nhằm đánh giá ảnh hưởng của tuổi, huyết áp tâm thu, HbA1c và BMI đến mức lọc cầu thận ước tính.

Sau khi xác định các phân bố tiên nghiệm cho những hệ số hồi quy cần ước lượng, nhóm nghiên cứu sử dụng thuật toán MCMC để xây dựng phân bố hậu nghiệm của các tham số trong mô hình.

Để đánh giá mức độ hội tụ của quá trình lấy mẫu, mô hình được triển khai với bốn chuỗi Markov độc lập có các giá trị khởi tạo khác nhau, mỗi chuỗi thực hiện 4.000 vòng lặp. Một nghìn vòng lặp đầu tiên của mỗi chuỗi được loại bỏ như giai đoạn burn-in nhằm giảm ảnh hưởng của điều kiện khởi tạo, nhờ đó tổng cộng 12.000 mẫu hậu nghiệm được giữ lại để tính toán các đặc trưng của phân bố hậu nghiệm.

Các ước lượng hậu nghiệm thu được từ bốn chuỗi cho kết quả tương đối nhất quán và không ghi nhận khác biệt đáng kể giữa các lần chạy. Bên cạnh đó, các đồ thị hội tụ không xuất hiện xu hướng bất thường hoặc hiện tượng các chuỗi tập trung ở những vùng khác nhau của không gian tham số, cho thấy quá trình lấy mẫu đã hội tụ tới cùng một phân bố hậu nghiệm.

Ví dụ này minh họa rằng việc ước lượng trong hồi quy Bayes không nhằm tìm một nghiệm duy nhất mà hướng tới việc mô phỏng đầy đủ phân bố xác suất của các tham số. Chất lượng của các kết quả vì vậy phụ thuộc rất lớn vào quá trình lấy mẫu và mức độ hội tụ của chuỗi MCMC.

𝟒.𝟗. 𝐓𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐆𝐢𝐛𝐛𝐬 𝐒𝐚𝐦𝐩𝐥𝐢𝐧𝐠

Gibbs Sampling là một trong những thuật toán MCMC đầu tiên được ứng dụng rộng rãi trong thống kê Bayes và có vai trò quan trọng trong sự phát triển của các phần mềm như BUGS, WinBUGS và OpenBUGS. Việc xuất hiện nhiều thuật toán tiên tiến trong những năm gần đây không làm mất đi giá trị của phương pháp này, bởi Gibbs Sampling vẫn là nền tảng giúp người học hiểu được cơ chế hoạt động của các kỹ thuật lấy mẫu MCMC. Thuật toán được xây dựng dựa trên một ý tưởng khá trực quan: thay vì lấy mẫu đồng thời cho toàn bộ tham số của mô hình, mỗi tham số sẽ được cập nhật lần lượt từ phân bố hậu nghiệm có điều kiện của chính nó, trong khi tạm thời xem các tham số còn lại là đã biết.

Giả sử mô hình hồi quy gồm các hệ số β₀, β₁, β₂ và phương sai σ². Thuật toán sẽ thực hiện tuần tự các bước sau:

1. Lấy mẫu mới cho β₀ khi giữ cố định β₁, β₂ và σ².

2. Lấy mẫu mới cho β₁ khi sử dụng giá trị β₀ vừa cập nhật.

3. Lấy mẫu mới cho β₂.

4. Lấy mẫu mới cho σ².

Sau khi hoàn thành bốn bước trên, thuật toán kết thúc một vòng lặp và tiếp tục thực hiện các vòng lặp tiếp theo.

Như vậy, tại mỗi thời điểm chỉ có một tham số được cập nhật, trong khi các tham số còn lại được giữ cố định. Sau rất nhiều vòng lặp, tập hợp các giá trị sinh ra sẽ xấp xỉ phân bố hậu nghiệm của toàn bộ mô hình.

Ưu điểm lớn nhất của Gibbs Sampling là việc lấy mẫu được thực hiện thông qua một chuỗi các phân bố hậu nghiệm có điều kiện, nhờ đó thuật toán tương đối dễ triển khai và thường đạt được tốc độ hội tụ khá tốt khi các phân bố này thuộc những họ phân bố chuẩn quen thuộc. Trong các tình huống như vậy, mỗi tham số có thể được cập nhật lần lượt từ phân bố có điều kiện tương ứng mà không đòi hỏi các bước tính toán quá phức tạp.

Hiệu quả của Gibbs Sampling phụ thuộc trực tiếp vào khả năng xác định và lấy mẫu từ các phân bố hậu nghiệm có điều kiện của từng tham số. Trong nhiều mô hình hồi quy hiện đại, đặc biệt là các mô hình phi tuyến, mô hình phân cấp hoặc các mô hình có số lượng lớn tham số, những phân bố này thường không còn có dạng giải tích tường minh. Sự phức tạp đó làm cho việc áp dụng Gibbs Sampling trở nên khó khăn hơn, đồng thời có thể làm giảm đáng kể hiệu quả lấy mẫu và tốc độ hội tụ của thuật toán.

Sự phát triển của các mô hình Bayes có cấu trúc ngày càng phức tạp đã thúc đẩy việc sử dụng những thuật toán lấy mẫu hiện đại hơn như Hamiltonian Monte Carlo và No-U-Turn Sampler, vốn hoạt động hiệu quả trong không gian tham số có số chiều lớn. Vì lý do đó, Gibbs Sampling hiện không còn là lựa chọn mặc định trong nhiều phần mềm Bayes hiện đại khi xử lý các mô hình phức tạp.

𝟒.𝟏𝟎. 𝐓𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐌𝐞𝐭𝐫𝐨𝐩𝐨𝐥𝐢𝐬–𝐇𝐚𝐬𝐭𝐢𝐧𝐠𝐬

Để khắc phục hạn chế của Gibbs Sampling, Metropolis và cộng sự, sau đó được Hastings mở rộng, đã phát triển thuật toán Metropolis–Hastings.

Khác với Gibbs Sampling, thuật toán này không yêu cầu biết chính xác phân bố hậu nghiệm có điều kiện của từng tham số.

Ở mỗi vòng lặp, thuật toán sinh ra một giá trị mới từ một phân bố đề xuất (proposal distribution).

Sau đó, thuật toán tính xác suất chấp nhận giá trị mới theo Công thức (![😎](https://static.xx.fbcdn.net/images/emoji.php/v9/t83/1/16/1f60e.png).

Nếu giá trị đề xuất được chấp nhận, chuỗi chuyển sang trạng thái mới.

Nếu giá trị đề xuất bị từ chối, chuỗi vẫn giữ nguyên trạng thái hiện tại và tiếp tục sang vòng lặp tiếp theo.

Chính cơ chế "chấp nhận hoặc từ chối" này giúp chuỗi Markov dần tiến tới phân bố hậu nghiệm mong muốn.

So với Gibbs Sampling, Metropolis–Hastings có phạm vi ứng dụng rộng hơn vì không đòi hỏi các phân bố hậu nghiệm có điều kiện phải thuộc một dạng phân bố đặc biệt. Chính đặc điểm này cho phép thuật toán được sử dụng trong nhiều mô hình Bayes mà Gibbs Sampling khó hoặc không thể triển khai.

Hiệu quả lấy mẫu của Metropolis–Hastings lại phụ thuộc đáng kể vào phân bố đề xuất được lựa chọn. Khi bước nhảy giữa các trạng thái liên tiếp quá nhỏ, chuỗi chỉ di chuyển chậm trong không gian tham số và cần số lượng vòng lặp rất lớn để khám phá đầy đủ phân bố hậu nghiệm. Trường hợp bước nhảy được chọn quá lớn, nhiều giá trị đề xuất sẽ nằm ở những vùng có xác suất thấp và không được chấp nhận, khiến tỷ lệ chấp nhận giảm và quá trình lấy mẫu trở nên kém hiệu quả.

Việc xác định một phân bố đề xuất phù hợp vì thế trở thành một trong những thách thức quan trọng nhất khi sử dụng Metropolis–Hastings. Khó khăn này càng rõ rệt trong các mô hình hồi quy có số chiều tham số lớn, nơi tốc độ hội tụ của thuật toán thường chậm hơn so với các phương pháp lấy mẫu hiện đại được phát triển sau này.

𝟒.𝟏𝟏. 𝐓𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐇𝐚𝐦𝐢𝐥𝐭𝐨𝐧𝐢𝐚𝐧 𝐌𝐨𝐧𝐭𝐞 𝐂𝐚𝐫𝐥𝐨

Hamiltonian Monte Carlo (HMC) được xem là bước tiến quan trọng nhất của MCMC trong hơn hai thập kỷ gần đây.

Khác với Gibbs Sampling hoặc Metropolis–Hastings, HMC không dựa vào các bước nhảy ngẫu nhiên hoàn toàn.

Thuật toán khai thác thông tin về đạo hàm của hàm mật độ hậu nghiệm, từ đó xác định hướng di chuyển tối ưu trong không gian tham số.

Ý tưởng của HMC được lấy cảm hứng từ cơ học Hamilton trong vật lý, trong đó mỗi tham số được xem như vị trí của một hạt chuyển động trong không gian tham số và được bổ sung thêm một biến động lượng (momentum). Việc mô tả đồng thời vị trí và động lượng cho phép thuật toán mô phỏng các quỹ đạo chuyển động có định hướng, nhờ đó chuỗi Markov có thể di chuyển những khoảng cách dài trong không gian tham số thay vì thực hiện các bước nhảy ngắn mang tính ngẫu nhiên như trong Metropolis–Hastings.

Các mẫu được tạo ra bởi HMC thường có mức độ phụ thuộc thấp hơn đáng kể so với các thuật toán MCMC truyền thống, bởi khả năng di chuyển theo những quỹ đạo dài giúp chuỗi khám phá không gian tham số hiệu quả hơn. Hiện tượng tự tương quan giữa các mẫu liên tiếp nhờ đó được giảm đáng kể, trong khi số lượng mẫu hiệu quả (Effective Sample Size) tăng lên rõ rệt. Việc khai thác được nhiều thông tin hơn từ mỗi vòng lặp cũng giúp các ước lượng hậu nghiệm đạt độ chính xác cao hơn mà không cần tăng quá nhiều số lần lấy mẫu.

Trong các mô hình hồi quy có nhiều biến độc lập hoặc có cấu trúc phức tạp, lợi thế của HMC càng trở nên rõ rệt. Các mô hình phân cấp và mô hình Bayesian multilevel thường đòi hỏi việc khám phá một không gian tham số có số chiều lớn, là tình huống mà HMC thường vượt trội hơn Gibbs Sampling và Metropolis–Hastings cả về tốc độ hội tụ lẫn chất lượng lấy mẫu.

Những cải thiện về khả năng khám phá không gian tham số và hiệu quả lấy mẫu không đạt được một cách miễn phí, bởi HMC đòi hỏi các yêu cầu tính toán phức tạp hơn so với nhiều thuật toán MCMC truyền thống. Việc tính đạo hàm của hàm mật độ hậu nghiệm đối với toàn bộ các tham số là điều kiện cần để thuật toán hoạt động hiệu quả, đồng thời người sử dụng cũng phải xác định các siêu tham số quan trọng như chiều dài quỹ đạo và kích thước bước nhảy. Các lựa chọn này có ảnh hưởng trực tiếp đến hiệu quả hoạt động của thuật toán, bởi những giá trị không phù hợp có thể làm giảm đáng kể khả năng khám phá phân bố hậu nghiệm và làm suy giảm hiệu quả tính toán.

𝟒.𝟏𝟐. 𝐓𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐍𝐨-𝐔-𝐓𝐮𝐫𝐧 𝐒𝐚𝐦𝐩𝐥𝐞𝐫

No-U-Turn Sampler (NUTS) là phiên bản cải tiến của Hamiltonian Monte Carlo do Hoffman và Gelman phát triển nhằm khắc phục nhược điểm lớn nhất của HMC là phải lựa chọn thủ công chiều dài quỹ đạo.

Ý tưởng của NUTS là loại bỏ yêu cầu phải lựa chọn trước chiều dài quỹ đạo trong Hamiltonian Monte Carlo bằng cách tự động xác định thời điểm thích hợp để dừng quá trình mô phỏng. Trong quá trình lấy mẫu, thuật toán liên tục mở rộng quỹ đạo Hamilton theo cả hai hướng và theo dõi hướng di chuyển của chuỗi trong không gian tham số.

Khi quỹ đạo phát triển đến mức các bước di chuyển mới bắt đầu đưa chuỗi quay trở lại vùng đã đi qua trước đó, tức hình thành một “U-turn”, thuật toán sẽ dừng việc mở rộng quỹ đạo và lựa chọn mẫu từ những trạng thái đã được tạo ra. Cơ chế này cho phép NUTS tự động điều chỉnh chiều dài quỹ đạo theo đặc điểm của từng mô hình mà không cần người sử dụng phải xác định trước một giá trị phù hợp.

Khả năng tự động lựa chọn chiều dài quỹ đạo mang lại lợi thế đáng kể trong thực hành nghiên cứu, bởi một trong những khó khăn lớn nhất khi sử dụng HMC là việc hiệu chỉnh các tham số điều khiển quá trình lấy mẫu. Nhờ NUTS, phần lớn gánh nặng này được chuyển từ người sử dụng sang thuật toán, giúp quá trình xây dựng và ước lượng mô hình trở nên thuận tiện hơn.

NUTS hiện là thuật toán mặc định trong Stan và được sử dụng rộng rãi thông qua các phần mềm như JASP, brms, rstanarm và cmdstanr. Sự phổ biến của các nền tảng này đã góp phần đưa NUTS trở thành một trong những công cụ lấy mẫu được sử dụng nhiều nhất trong phân tích Bayes hiện đại.

Việc xây dựng các mô hình Bayes phức tạp nhờ đó trở nên dễ tiếp cận hơn đối với các nhà nghiên cứu không chuyên sâu về tính toán. Ngay cả khi không nắm vững các chi tiết kỹ thuật của Hamiltonian Monte Carlo, người sử dụng vẫn có thể thu được các mẫu hậu nghiệm có chất lượng cao và độ hội tụ tốt. Sự kết hợp giữa hiệu quả tính toán và khả năng tự động hóa này được xem là một trong những yếu tố quan trọng thúc đẩy sự phát triển mạnh mẽ của thống kê Bayes trong khoảng một thập kỷ trở lại đây.

𝟒.𝟏𝟑. 𝐒𝐨 𝐬𝐚́𝐧𝐡 𝐜𝐚́𝐜 𝐭𝐡𝐮𝐚̣̂𝐭 𝐭𝐨𝐚́𝐧 𝐥𝐚̂́𝐲 𝐦𝐚̂̃𝐮

Mỗi thuật toán lấy mẫu trong MCMC được phát triển để giải quyết những thách thức khác nhau của suy luận Bayes, vì vậy không có phương pháp nào tối ưu cho mọi loại mô hình. Gibbs Sampling thường hoạt động hiệu quả khi các phân bố hậu nghiệm có điều kiện có dạng đơn giản và dễ lấy mẫu trực tiếp. Metropolis–Hastings có thể áp dụng cho phạm vi mô hình rộng hơn nhưng hiệu quả lấy mẫu thường suy giảm khi số chiều của không gian tham số tăng lên.

Việc khai thác thông tin đạo hàm của phân bố hậu nghiệm giúp Hamiltonian Monte Carlo cải thiện đáng kể khả năng khám phá không gian tham số và nâng cao hiệu quả lấy mẫu so với các thuật toán MCMC truyền thống. Trên nền tảng đó, No-U-Turn Sampler được phát triển nhằm tự động điều chỉnh quá trình mô phỏng Hamilton, qua đó duy trì các ưu điểm của HMC đồng thời giảm đáng kể nhu cầu điều chỉnh thủ công các tham số của thuật toán.

Các đặc điểm chính của những phương pháp lấy mẫu này được tổng hợp trong Bảng 3. Đối với phần lớn các nghiên cứu y học hiện nay sử dụng Stan hoặc JASP, việc lựa chọn thuật toán lấy mẫu thường không còn là vấn đề cần quan tâm vì NUTS đã được sử dụng mặc định trong quá trình ước lượng mô hình. Giá trị thực tiễn quan trọng hơn nằm ở việc hiểu được nguyên lý hoạt động và các giới hạn của từng thuật toán, từ đó có thể đánh giá đúng mức độ tin cậy và chất lượng của các kết quả phân tích Bayes.

𝐕𝐢́ 𝐝𝐮̣ 5. So sánh hiệu quả các thuật toán lấy mẫu

Một nghiên cứu mô phỏng được thực hiện nhằm đánh giá ảnh hưởng của tuổi, BMI, cholesterol toàn phần, glucose huyết tương và mức lọc cầu thận đến huyết áp tâm thu.

Để so sánh hiệu quả của các phương pháp lấy mẫu trong suy luận Bayes, cùng một mô hình hồi quy được ước lượng bằng ba thuật toán khác nhau gồm Gibbs Sampling, Metropolis–Hastings và Hamiltonian Monte Carlo.

Các kết quả phân tích cho thấy giá trị trung bình hậu nghiệm thu được từ ba thuật toán gần như tương đương, phản ánh sự nhất quán của các ước lượng tham số giữa các phương pháp lấy mẫu. Sự khác biệt chủ yếu xuất hiện ở hiệu quả tính toán, khi Hamiltonian Monte Carlo tạo ra số lượng mẫu hiệu quả lớn hơn đáng kể, hội tụ nhanh hơn và có mức độ tự tương quan giữa các mẫu thấp hơn so với Gibbs Sampling và Metropolis–Hastings.

Khi mô hình được triển khai trong Stan với thuật toán No-U-Turn Sampler, số lượng mẫu hiệu quả tiếp tục tăng lên trong khi các chuỗi Markov đạt hội tụ sau ít vòng lặp hơn so với Hamiltonian Monte Carlo được điều chỉnh thủ công. Kết quả này cho thấy cơ chế tự động tối ưu hóa quỹ đạo lấy mẫu của NUTS có thể cải thiện đáng kể hiệu quả tính toán mà vẫn duy trì chất lượng của các ước lượng hậu nghiệm.

Việc đồng thời đạt được tốc độ hội tụ cao, số lượng mẫu hiệu quả lớn và mức độ tự động hóa cao giúp giải thích vì sao NUTS hiện được xem là tiêu chuẩn trong nhiều phần mềm Bayes hiện đại, phù hợp với những kết quả đã được báo cáo trong các nghiên cứu phương pháp luận gần đây.

𝐓𝐨́𝐦 𝐥𝐚̣𝐢: Ước lượng tham số là bước trung tâm của hồi quy tuyến tính Bayes. Do phần lớn các phân bố hậu nghiệm không có nghiệm giải tích, các thuật toán lấy mẫu như Gibbs Sampling, Metropolis–Hastings, Hamiltonian Monte Carlo và No-U-Turn Sampler được sử dụng để xấp xỉ phân bố hậu nghiệm thông qua mô phỏng.

Trong số các thuật toán này, NUTS hiện được xem là lựa chọn ưu tiên nhờ khả năng tự động tối ưu hóa quá trình lấy mẫu và đạt hiệu quả cao đối với các mô hình hồi quy nhiều chiều. Tuy nhiên, bất kể sử dụng thuật toán nào, các mẫu thu được chỉ có giá trị khi chuỗi Markov đã hội tụ và phản ánh chính xác phân bố hậu nghiệm.