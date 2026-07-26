𝐁𝐚𝐨 𝐠𝐢𝐨̛̀ 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐢𝐧 𝐯𝐚̀𝐨 𝐤𝐞̂́𝐭 𝐪𝐮𝐚̉ 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐁𝐚𝐲𝐞𝐬? Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐨̣̂𝐢 𝐭𝐮̣ 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐜𝐡𝐮̛́𝐜 𝐧𝐚̆𝐧𝐠 𝐭𝐡𝐚̣̂𝐧.

TS. Đào Hồng Nam

𝟓. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐨̣̂𝐢 𝐭𝐮̣ 𝐯𝐚̀ 𝐜𝐡𝐚̂́𝐭 𝐥𝐮̛𝐨̛̣𝐧𝐠 𝐦𝐨̂ 𝐡𝐢̀𝐧𝐡 𝐡𝐨̂̀𝐢 𝐪𝐮𝐲 𝐭𝐮𝐲𝐞̂́𝐧 𝐭𝐢́𝐧𝐡 𝐁𝐚𝐲𝐞𝐬

𝟓.𝟏. 𝐘́ 𝐧𝐠𝐡𝐢̃𝐚 𝐜𝐮̉𝐚 𝐯𝐢𝐞̣̂𝐜 đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐨̣̂𝐢 𝐭𝐮̣

Việc xây dựng mô hình hồi quy Bayes và thực hiện quá trình lấy mẫu chỉ là bước đầu trong phân tích thống kê. Trước khi diễn giải các hệ số hồi quy hoặc đưa ra bất kỳ kết luận khoa học nào, nhà nghiên cứu cần xác định liệu các chuỗi MCMC đã thực sự hội tụ hay chưa. Đây là yêu cầu bắt buộc trong mọi phân tích Bayes hiện đại và là một trong những tiêu chí quan trọng để đánh giá chất lượng của nghiên cứu (Gelman và cộng sự, 2021).

Trong thống kê Bayes, các giá trị của tham số không được tính trực tiếp mà được ước lượng thông qua một tập hợp rất lớn các mẫu được sinh ra từ phân bố hậu nghiệm. Nếu các mẫu này chưa phản ánh đúng phân bố hậu nghiệm thực sự, mọi giá trị trung bình, khoảng tin cậy Bayes, xác suất hậu nghiệm hoặc Bayes Factor đều có thể bị sai lệch. Do đó, chất lượng của quá trình lấy mẫu quyết định trực tiếp đến độ tin cậy của toàn bộ kết quả phân tích.

Khái niệm hội tụ (convergence) được hiểu là trạng thái mà tại đó chuỗi Markov không còn chịu ảnh hưởng của giá trị khởi tạo và đã đạt đến phân bố hậu nghiệm mục tiêu. Khi chuỗi hội tụ, các mẫu được tạo ra có thể được xem là các mẫu ngẫu nhiên từ phân bố hậu nghiệm và được sử dụng để tính toán các đại lượng thống kê.

Một quan niệm sai lầm thường gặp là cho rằng chỉ cần tăng số vòng lặp thì chuỗi chắc chắn sẽ hội tụ. Trong thực tế, số vòng lặp lớn không bảo đảm hội tụ nếu mô hình được xây dựng chưa phù hợp, phân bố tiên nghiệm quá mạnh, dữ liệu có vấn đề hoặc thuật toán lấy mẫu hoạt động không hiệu quả. Vì vậy, việc đánh giá hội tụ cần dựa trên nhiều tiêu chí định lượng và định tính thay vì chỉ dựa vào số lượng vòng lặp.

Các hướng dẫn hiện đại đều khuyến nghị sử dụng đồng thời đồ thị trực quan và các chỉ số định lượng để đánh giá hội tụ. Cách tiếp cận này giúp phát hiện những vấn đề mà một tiêu chí đơn lẻ có thể bỏ sót, đồng thời tăng tính minh bạch và khả năng tái lập của nghiên cứu.

𝟓.𝟐. Đ𝐨̂̀ 𝐭𝐡𝐢̣ 𝐓𝐫𝐚𝐜𝐞 𝐩𝐥𝐨𝐭

Trace plot là một trong những công cụ trực quan được sử dụng phổ biến nhất để đánh giá sự hội tụ của các chuỗi MCMC. Đồ thị này biểu diễn sự thay đổi của giá trị tham số qua các vòng lặp liên tiếp của thuật toán, từ đó cho phép quan sát trực tiếp hành vi của quá trình lấy mẫu và được minh họa trong Hình 1.

Khi quá trình lấy mẫu đã đạt hội tụ, các giá trị trên Trace plot thường dao động ngẫu nhiên quanh một vùng trung tâm ổn định mà không xuất hiện những xu hướng tăng hoặc giảm kéo dài theo thời gian. Trong trường hợp sử dụng nhiều chuỗi Markov, các chuỗi cần chồng lấp đáng kể lên nhau và cùng di chuyển trong một vùng của không gian tham số. Đặc điểm này cho thấy ảnh hưởng của các giá trị khởi tạo ban đầu đã không còn đáng kể và các chuỗi đang lấy mẫu từ cùng một phân bố hậu nghiệm.

Sự thiếu hội tụ thường được phản ánh qua các dạng đồ thị bất thường như xu hướng tăng hoặc giảm kéo dài, các chuỗi tập trung ở những vùng khác nhau của không gian tham số hoặc mức độ chồng lấp rất thấp giữa các chuỗi. Những biểu hiện này cho thấy quá trình lấy mẫu chưa mô tả đầy đủ phân bố hậu nghiệm và có thể cần tăng số vòng lặp, điều chỉnh thuật toán lấy mẫu hoặc xem xét lại cấu trúc của mô hình.

Khả năng cung cấp một cái nhìn trực quan về toàn bộ quá trình lấy mẫu giúp Trace plot trở thành công cụ hữu ích để phát hiện nhanh các vấn đề liên quan đến hội tụ. Dù vậy, việc diễn giải đồ thị vẫn phụ thuộc vào kinh nghiệm của người phân tích và chủ yếu mang tính định tính. Do đó, đánh giá hội tụ trong thực hành thường kết hợp Trace plot với các chỉ số định lượng như R̂ hoặc số lượng mẫu hiệu quả (ESS) để đưa ra kết luận đáng tin cậy hơn.

𝟓.𝟑. Đ𝐨̂̀ 𝐭𝐡𝐢̣ 𝐃𝐞𝐧𝐬𝐢𝐭𝐲 𝐩𝐥𝐨𝐭

Density plot được sử dụng để mô tả phân bố xác suất của các mẫu hậu nghiệm thu được từ quá trình lấy mẫu MCMC và được minh họa trong Hình 2. Thông qua hình dạng của phân bố hậu nghiệm, đồ thị này giúp đánh giá không chỉ sự hội tụ của các chuỗi mà còn cung cấp thêm thông tin về mức độ không chắc chắn và đặc điểm của tham số đang được nghiên cứu.

Khi các chuỗi MCMC đã hội tụ đến cùng một phân bố hậu nghiệm, Density plot của các chuỗi thường chồng lấp gần như hoàn toàn và tạo thành một đường mật độ trơn, liên tục. Sự tương đồng giữa các đường mật độ cho thấy các chuỗi đang mô tả cùng một phân bố xác suất và không còn chịu ảnh hưởng đáng kể từ các giá trị khởi tạo ban đầu.

Hình dạng của Density plot cũng phản ánh lượng thông tin mà dữ liệu cung cấp cho việc ước lượng tham số. Các phân bố hậu nghiệm có dạng đối xứng và tập trung thường cho thấy tham số được ước lượng tương đối ổn định, trong khi những phân bố lệch mạnh hoặc xuất hiện nhiều đỉnh có thể gợi ý rằng dữ liệu còn hạn chế, mô hình chưa mô tả đầy đủ cấu trúc của dữ liệu hoặc tồn tại nhiều vùng giá trị tham số có xác suất tương đương.

Ngoài vai trò đánh giá hội tụ, Density plot còn hỗ trợ phát hiện các đặc điểm bất thường của phân bố hậu nghiệm như hiện tượng cắt cụt, đuôi phân bố kéo dài hoặc sự xuất hiện của nhiều cụm tách biệt. Những đặc điểm này có thể ảnh hưởng đáng kể đến việc diễn giải kết quả và thường cần được xem xét cẩn thận trước khi đưa ra các kết luận thống kê.

𝟓.𝟒. Đ𝐨̂̀ 𝐭𝐡𝐢̣ 𝐀𝐮𝐭𝐨𝐜𝐨𝐫𝐫𝐞𝐥𝐚𝐭𝐢𝐨𝐧 𝐩𝐥𝐨𝐭

Do các mẫu trong MCMC được sinh tuần tự nên giữa các mẫu liên tiếp thường tồn tại hiện tượng tự tương quan.

Autocorrelation plot biểu diễn mức độ tương quan giữa các mẫu cách nhau những khoảng vòng lặp khác nhau và được trình bày trong Hình 3.

Nếu chuỗi lấy mẫu hoạt động hiệu quả, mức độ tự tương quan sẽ giảm rất nhanh khi khoảng cách giữa các mẫu tăng lên. Điều này có nghĩa là mỗi mẫu mới mang thêm thông tin mới về phân bố hậu nghiệm.

Ngược lại, nếu tự tương quan giảm rất chậm, nhiều mẫu liên tiếp sẽ gần như giống nhau và lượng thông tin thực sự thu được sẽ thấp hơn nhiều so với số vòng lặp đã thực hiện. Khi đó, mặc dù chuỗi có thể đã chạy rất lâu, kích thước mẫu hiệu quả vẫn nhỏ.

Hiện tượng tự tương quan cao thường gặp ở các thuật toán MCMC truyền thống như Metropolis–Hastings và ít gặp hơn ở Hamiltonian Monte Carlo hoặc No-U-Turn Sampler.

𝟓.𝟓. 𝐇𝐞̣̂ 𝐬𝐨̂́ 𝐑̂ (𝐏𝐨𝐭𝐞𝐧𝐭𝐢𝐚𝐥 𝐒𝐜𝐚𝐥𝐞 𝐑𝐞𝐝𝐮𝐜𝐭𝐢𝐨𝐧 𝐅𝐚𝐜𝐭𝐨𝐫)

Trong số các tiêu chí đánh giá hội tụ, R̂ (đọc là "R-hat") hiện được xem là chỉ số quan trọng nhất và được khuyến nghị báo cáo trong hầu hết các nghiên cứu sử dụng thống kê Bayes.

Ý tưởng của R̂ được Gelman và Rubin đề xuất nhằm so sánh mức độ biến thiên giữa các chuỗi với mức độ biến thiên bên trong từng chuỗi. Giá trị của chỉ số này được xác định theo Công thức (9).

Nếu tất cả các chuỗi đã hội tụ đến cùng một phân bố hậu nghiệm, phương sai giữa các chuỗi sẽ gần bằng phương sai trong từng chuỗi và giá trị R̂ sẽ tiến gần đến 1.

Việc sử dụng chỉ số R̂ để đánh giá sự hội tụ của các chuỗi MCMC đã có những thay đổi đáng kể cùng với sự phát triển của các thuật toán lấy mẫu và các phương pháp chẩn đoán hiện đại. Trong nhiều năm, ngưỡng R̂ < 1,10 được xem là chấp nhận được, nhưng các hướng dẫn gần đây khuyến nghị áp dụng tiêu chuẩn nghiêm ngặt hơn, theo đó R̂ ≤ 1,01 được xem là dấu hiệu của sự hội tụ tốt (Vehtari và cộng sự, 2021).

Nếu R̂ lớn hơn ngưỡng này, nhà nghiên cứu cần xem xét kéo dài quá trình lấy mẫu, thay đổi giá trị khởi tạo hoặc đánh giá lại cấu trúc của mô hình.

Một ưu điểm của R̂ là chỉ số này có thể được tính tự động trong hầu hết các phần mềm Bayes như Stan, brms, rstanarm và JASP. Vì vậy, việc báo cáo R̂ nên được xem là một nội dung bắt buộc trong các nghiên cứu ứng dụng hồi quy Bayes.

𝟓.𝟔. 𝐊𝐢́𝐜𝐡 𝐭𝐡𝐮̛𝐨̛́𝐜 𝐦𝐚̂̃𝐮 𝐡𝐢𝐞̣̂𝐮 𝐪𝐮𝐚̉ (𝐄𝐟𝐟𝐞𝐜𝐭𝐢𝐯𝐞 𝐒𝐚𝐦𝐩𝐥𝐞 𝐒𝐢𝐳𝐞)

Mặc dù MCMC có thể tạo ra hàng chục nghìn hoặc hàng trăm nghìn mẫu, nhưng do hiện tượng tự tương quan nên số lượng mẫu thực sự độc lập thường nhỏ hơn nhiều.

Khái niệm kích thước mẫu hiệu quả (Effective Sample Size – ESS) được sử dụng để phản ánh lượng thông tin thực sự chứa trong chuỗi MCMC. Cách tính được trình bày trong Công thức (10).

Một chuỗi gồm 20.000 mẫu nhưng chỉ đạt ESS bằng 2.500 cho thấy lượng thông tin thực sự mà chuỗi cung cấp tương đương khoảng 2.500 quan sát độc lập. Sự chênh lệch này xuất phát từ hiện tượng tự tương quan giữa các mẫu liên tiếp, khiến số lượng mẫu danh nghĩa lớn hơn đáng kể so với lượng thông tin hữu ích thu được từ quá trình lấy mẫu.

Mức độ chính xác của các ước lượng hậu nghiệm có quan hệ chặt chẽ với ESS. Giá trị ESS càng lớn thì các ước lượng càng ổn định và có sai số Monte Carlo nhỏ hơn, trong khi ESS thấp thường phản ánh hiện tượng tự tương quan còn cao hoặc cho thấy chuỗi chưa khám phá đầy đủ phân bố hậu nghiệm.

Việc đánh giá ESS trong thực hành thường dựa trên mục tiêu của phân tích và đặc điểm của mô hình hơn là một ngưỡng cố định áp dụng cho mọi trường hợp. Dù vậy, nhiều chuyên gia khuyến nghị mỗi tham số nên đạt ESS ít nhất vài trăm và lý tưởng là trên 1.000 để bảo đảm độ ổn định và độ tin cậy của các ước lượng hậu nghiệm.

Một ưu điểm của Hamiltonian Monte Carlo và đặc biệt là No-U-Turn Sampler là tạo ra ESS cao hơn đáng kể so với các thuật toán MCMC truyền thống.

𝟓.𝟕. 𝐒𝐚𝐢 𝐬𝐨̂́ 𝐌𝐨𝐧𝐭𝐞 𝐂𝐚𝐫𝐥𝐨 (𝐌𝐨𝐧𝐭𝐞 𝐂𝐚𝐫𝐥𝐨 𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝 𝐄𝐫𝐫𝐨𝐫)

Ngoài hệ số R̂ và kích thước mẫu hiệu quả, một chỉ số khác thường được sử dụng để đánh giá chất lượng của quá trình lấy mẫu là sai số Monte Carlo (Monte Carlo Standard Error – MCSE).

MCSE phản ánh mức độ sai số phát sinh do quá trình mô phỏng MCMC chỉ sử dụng một số lượng hữu hạn các mẫu để xấp xỉ phân bố hậu nghiệm. Khái niệm này được trình bày trong Công thức (11).

Về bản chất, MCSE tương tự sai số chuẩn của một ước lượng thống kê. Nếu số lượng mẫu hiệu quả càng lớn thì MCSE càng nhỏ, đồng nghĩa với việc giá trị trung bình hậu nghiệm được ước lượng càng chính xác.

Một nguyên tắc thường được áp dụng trong thực hành là MCSE nên nhỏ hơn khoảng 5% độ lệch chuẩn hậu nghiệm của tham số. Nếu MCSE còn lớn, nhà nghiên cứu nên tăng số vòng lặp hoặc cải thiện hiệu quả của quá trình lấy mẫu nhằm thu được nhiều mẫu hiệu quả hơn.

Không giống R̂ chỉ phản ánh sự hội tụ của chuỗi, MCSE phản ánh độ chính xác của chính các ước lượng hậu nghiệm. Vì vậy, hai chỉ số này bổ sung cho nhau và nên được báo cáo đồng thời.

𝟓.𝟖. 𝐊𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 𝐝𝐮̛̣ đ𝐨𝐚́𝐧 𝐡𝐚̣̂𝐮 𝐧𝐠𝐡𝐢𝐞̣̂𝐦 (𝐏𝐨𝐬𝐭𝐞𝐫𝐢𝐨𝐫 𝐏𝐫𝐞𝐝𝐢𝐜𝐭𝐢𝐯𝐞 𝐂𝐡𝐞𝐜𝐤)

Sau khi xác định rằng chuỗi MCMC đã hội tụ, bước tiếp theo là đánh giá xem mô hình Bayes có mô tả tốt dữ liệu hay không.

Một trong những phương pháp được sử dụng phổ biến để đánh giá độ phù hợp của mô hình là Posterior Predictive Check (PPC). Phương pháp này dựa trên việc sử dụng phân bố hậu nghiệm đã ước lượng để sinh ra nhiều bộ dữ liệu mô phỏng theo cùng cơ chế tạo dữ liệu mà mô hình giả định. Các bộ dữ liệu mô phỏng sau đó được đối chiếu với dữ liệu quan sát thông qua những đặc trưng như giá trị trung bình, phương sai, hình dạng phân bố hoặc các chỉ số thống kê quan trọng khác. Khi mô hình mô tả dữ liệu tốt, các đặc điểm của dữ liệu mô phỏng sẽ tương đồng với dữ liệu thực tế. Sự khác biệt lớn giữa hai nhóm dữ liệu là dấu hiệu cho thấy mô hình có thể chưa phản ánh đúng cấu trúc của dữ liệu hoặc một số giả định cơ bản của mô hình không được thỏa mãn.

Trong thực hành, Posterior Predictive Check thường được trình bày dưới dạng các đồ thị trực quan như histogram chồng lên nhau, biểu đồ mật độ hoặc biểu đồ phân tán. Các ví dụ minh họa được trình bày trong Hình 4.

Posterior Predictive Check hiện được xem là một trong những bước quan trọng nhất của quy trình Bayesian Workflow do Gelman và cộng sự đề xuất. Thay vì chỉ đánh giá các tham số của mô hình, phương pháp này tập trung đánh giá khả năng tái tạo dữ liệu của mô hình, qua đó phản ánh trực tiếp chất lượng của mô hình hồi quy.

𝟓.𝟗. 𝐓𝐢𝐞̂𝐮 𝐜𝐡𝐢́ 𝐖𝐀𝐈𝐂

Trong nhiều nghiên cứu, nhà nghiên cứu không chỉ xây dựng một mô hình duy nhất mà còn cần so sánh nhiều mô hình khác nhau.

Ví dụ, một mô hình chỉ bao gồm tuổi và BMI có thể được so sánh với một mô hình bổ sung thêm cholesterol và glucose máu nhằm xác định mô hình nào có khả năng dự đoán tốt hơn.

Trong khuôn khổ Bayes, một tiêu chí được sử dụng phổ biến là Widely Applicable Information Criterion (WAIC).

WAIC được xây dựng dựa trên toàn bộ phân bố hậu nghiệm và được xem là một phiên bản Bayes của các tiêu chí thông tin như AIC hoặc BIC trong thống kê tần suất.

Khái niệm tổng quát của WAIC được trình bày trong Công thức (12).

WAIC đánh giá đồng thời hai thành phần:

• mức độ phù hợp của mô hình với dữ liệu;

• mức độ phức tạp của mô hình.

Một mô hình có nhiều tham số thường phù hợp với dữ liệu hiện tại hơn nhưng cũng có nguy cơ quá khớp (overfitting). WAIC cân bằng giữa hai yếu tố này nhằm lựa chọn mô hình có khả năng dự đoán tốt trên dữ liệu mới.

Khi so sánh nhiều mô hình, WAIC càng nhỏ thì mô hình càng được ưu tiên.

Một ưu điểm của WAIC là sử dụng toàn bộ thông tin của phân bố hậu nghiệm thay vì chỉ dựa trên giá trị cực đại của hàm hợp lý như AIC.

𝟓.𝟏𝟎. 𝐏𝐒𝐈𝐒-𝐋𝐎𝐎 (𝐏𝐚𝐫𝐞𝐭𝐨 𝐒𝐦𝐨𝐨𝐭𝐡𝐞𝐝 𝐈𝐦𝐩𝐨𝐫𝐭𝐚𝐧𝐜𝐞 𝐒𝐚𝐦𝐩𝐥𝐢𝐧𝐠 𝐋𝐞𝐚𝐯𝐞-𝐎𝐧𝐞-𝐎𝐮𝐭 𝐂𝐫𝐨𝐬𝐬-𝐕𝐚𝐥𝐢𝐝𝐚𝐭𝐢𝐨𝐧)

Bên cạnh WAIC, một tiêu chí ngày càng được khuyến nghị sử dụng là PSIS-LOO.

Đây là phương pháp đánh giá khả năng dự đoán ngoài mẫu (out-of-sample prediction) dựa trên kỹ thuật Leave-One-Out Cross-Validation kết hợp với thuật toán Pareto Smoothed Importance Sampling.

Khác với WAIC vốn chỉ sử dụng thông tin từ phân bố hậu nghiệm, PSIS-LOO trực tiếp đánh giá khả năng dự đoán của mô hình trên các quan sát chưa được sử dụng trong quá trình huấn luyện.

Ý tưởng của phương pháp này là lần lượt loại bỏ từng quan sát khỏi bộ dữ liệu, xây dựng mô hình trên phần dữ liệu còn lại và dự đoán giá trị của quan sát bị loại bỏ.

Nếu thực hiện trực tiếp, quá trình này sẽ rất tốn thời gian vì phải xây dựng lại mô hình hàng trăm hoặc hàng nghìn lần.

PSIS-LOO giải quyết vấn đề đó bằng kỹ thuật Importance Sampling kết hợp với làm trơn Pareto, nhờ đó chỉ cần chạy mô hình một lần nhưng vẫn thu được kết quả gần tương đương Leave-One-Out Cross-Validation đầy đủ.

Theo nhiều nghiên cứu phương pháp luận gần đây, PSIS-LOO thường ổn định hơn WAIC, đặc biệt đối với các mô hình có cấu trúc phức tạp hoặc dữ liệu có giá trị ngoại lai (Vehtari và cộng sự, 2017).

Hiện nay, nhiều chuyên gia khuyến nghị ưu tiên PSIS-LOO hơn WAIC khi đánh giá và lựa chọn mô hình Bayes.

𝟓.𝟏𝟏. 𝐁𝐚𝐲𝐞𝐬𝐢𝐚𝐧 𝐖𝐨𝐫𝐤𝐟𝐥𝐨𝐰

Trong nhiều năm gần đây, thay vì xem phân tích Bayes là quá trình xây dựng một mô hình rồi diễn giải kết quả, Gelman và cộng sự đã đề xuất khái niệm Bayesian Workflow.

Theo cách tiếp cận này, phân tích Bayes bao gồm một chuỗi các bước liên tục:

1. Xác định câu hỏi nghiên cứu.

2. Xây dựng mô hình thống kê.

3. Lựa chọn phân bố tiên nghiệm.

4. Ước lượng mô hình bằng MCMC.

5. Đánh giá hội tụ của chuỗi.

6. Thực hiện Posterior Predictive Check.

7. So sánh các mô hình.

8. Phân tích độ nhạy.

9. Báo cáo và diễn giải kết quả.

Toàn bộ quy trình được trình bày trong Sơ đồ 3.

Điểm quan trọng của Bayesian Workflow là không xem mô hình đầu tiên là mô hình cuối cùng.

Nếu phát hiện các vấn đề trong Posterior Predictive Check hoặc trong quá trình đánh giá hội tụ, nhà nghiên cứu sẽ quay trở lại các bước trước để điều chỉnh mô hình, lựa chọn lại phân bố tiên nghiệm hoặc thay đổi cấu trúc hồi quy.

Cách tiếp cận này phù hợp với bản chất của nghiên cứu khoa học, trong đó mô hình thống kê được xem là một giả thuyết cần được kiểm tra và cải tiến liên tục.

𝐕𝐢́ 𝐝𝐮̣ 𝟔. Đ𝐚́𝐧𝐡 𝐠𝐢𝐚́ 𝐡𝐨̣̂𝐢 𝐭𝐮̣ 𝐭𝐫𝐨𝐧𝐠 𝐧𝐠𝐡𝐢𝐞̂𝐧 𝐜𝐮̛́𝐮 𝐜𝐡𝐮̛́𝐜 𝐧𝐚̆𝐧𝐠 𝐭𝐡𝐚̣̂𝐧

Một nghiên cứu nhằm đánh giá các yếu tố ảnh hưởng đến mức lọc cầu thận ở bệnh nhân đái tháo đường đã xây dựng mô hình hồi quy Bayes với năm biến độc lập gồm tuổi, BMI, HbA1c, huyết áp tâm thu và thời gian mắc bệnh.

Quá trình ước lượng được thực hiện bằng thuật toán No-U-Turn Sampler với bốn chuỗi Markov độc lập. Sau khi hoàn thành việc lấy mẫu, chất lượng của mô hình được đánh giá thông qua nhiều tiêu chí khác nhau nhằm kiểm tra cả sự hội tụ của các chuỗi, chất lượng lấy mẫu và khả năng dự đoán của mô hình.

Các đồ thị Trace plot cho thấy bốn chuỗi đều dao động ổn định quanh cùng một vùng giá trị và không xuất hiện xu hướng tăng hoặc giảm kéo dài theo thời gian. Đồng thời, Density plot của các chuỗi gần như chồng khít lên nhau, cho thấy các chuỗi đang mô tả cùng một phân bố hậu nghiệm.

Kết quả chẩn đoán hội tụ cũng hỗ trợ nhận định này khi giá trị R̂ của tất cả các tham số đều nhỏ hơn 1,01. Bên cạnh đó, kích thước mẫu hiệu quả của mỗi hệ số hồi quy đều vượt quá 2.000 mẫu và MCSE chỉ chiếm một tỷ lệ rất nhỏ so với độ lệch chuẩn hậu nghiệm, cho thấy các ước lượng hậu nghiệm đạt độ ổn định cao.

Khả năng phản ánh dữ liệu của mô hình tiếp tục được đánh giá bằng Posterior Predictive Check, trong đó dữ liệu mô phỏng từ phân bố hậu nghiệm tái hiện khá tốt các đặc điểm của dữ liệu quan sát, bao gồm giá trị trung bình, phương sai và hình dạng phân bố. Để đánh giá năng lực dự đoán, mô hình này còn được so sánh với một mô hình đơn giản hơn không bao gồm biến HbA1c. Kết quả cho thấy mô hình đầy đủ có giá trị WAIC và PSIS-LOO thấp hơn, phản ánh khả năng dự đoán tốt hơn trên dữ liệu mới.

Việc đồng thời đạt kết quả tốt trên các tiêu chí về hội tụ, chất lượng lấy mẫu và năng lực dự đoán cho thấy mô hình Bayes đã được ước lượng một cách đáng tin cậy. Ví dụ này cũng minh họa rằng chất lượng của một mô hình Bayes không thể được đánh giá chỉ dựa trên một chỉ số đơn lẻ, bởi việc diễn giải các hệ số hồi quy và rút ra kết luận khoa học chỉ trở nên hợp lý khi toàn bộ các bước đánh giá mô hình đều cho kết quả thỏa đáng.