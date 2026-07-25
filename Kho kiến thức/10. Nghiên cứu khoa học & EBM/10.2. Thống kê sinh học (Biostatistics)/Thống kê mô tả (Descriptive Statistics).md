Dưới góc độ của một chuyên gia về Y học chứng cứ (EBM) và Thống kê y học, tôi xin trình bày phân tích chi tiết về **Thống kê mô tả (Descriptive Statistics)**. Thống kê mô tả là nền tảng cơ bản nhất trong phân tích dữ liệu, giúp tóm tắt, trình bày đặc tính của một bộ số liệu thông qua các chỉ số về độ tập trung, độ phân tán và hình dáng phân bố dữ liệu.

### 1. ĐO LƯỜNG ĐỘ TẬP TRUNG (MEASURES OF CENTRAL TENDENCY)

Các chỉ số này giúp xác định vị trí trung tâm của một tập hợp dữ liệu định lượng.

- **Giá trị Trung bình (Mean / Trung bình cộng):** Được tính bằng tổng các giá trị chia cho số lần quan sát. Đây là chỉ số phổ biến nhất nhưng có nhược điểm chí mạng là rất dễ bị ảnh hưởng bởi các giá trị ngoại lai quá lớn hoặc quá nhỏ (outliers) khi bộ số liệu phân bố lệch.
- **Trung vị (Median):** Là giá trị nằm ở chính giữa của bộ số liệu khi các quan sát đã được sắp xếp theo thứ tự (từ lớn đến nhỏ hoặc ngược lại). Trung vị thường được áp dụng khi một bộ số liệu quá lớn hay quá nhỏ so với những số liệu còn lại (phân bố lệch), vì nó phản ánh độ tập trung tốt nhất và không bị ảnh hưởng bởi các giá trị ngoại lai.
- **Mốt (Mode):** Là giá trị xuất hiện thường xuyên nhất, hoặc lặp lại nhiều lần nhất trong bộ số liệu. Một tập dữ liệu có thể có một mốt, nhiều mốt hoặc không có mốt.

### 2. ĐO LƯỜNG ĐỘ PHÂN TÁN (MEASURES OF DISPERSION)

Độ phân tán mô tả mức độ biến thiên hay sự dàn trải của các giá trị xung quanh giá trị trung tâm.

- **Khoảng phân tán (Range):** Là hiệu số giữa giá trị cao nhất và thấp nhất trong một bộ số liệu.
- **Phương sai (Variance) và Độ lệch chuẩn (Standard Deviation - SD):** Độ lệch chuẩn biểu thị độ biến thiên, sự phân tán của một biến định lượng xung quanh giá trị trung bình. Đây là thước đo độ phân tán quan trọng và được sử dụng rộng rãi nhất trong y văn.
- **Hệ số biến thiên (Coefficient of Variation - CV):** Được tính bằng tỷ lệ phần trăm giữa độ lệch chuẩn và giá trị trung bình. CV được sử dụng khi nhà nghiên cứu muốn so sánh độ phân tán của hai nhóm số liệu có đơn vị đo lường khác nhau. Bộ số liệu nào có CV càng lớn thì độ phân tán càng cao.

### 3. HÌNH DÁNG PHÂN BỐ DỮ LIỆU (DATA DISTRIBUTION)

Việc xác định hình dáng phân bố là điều kiện tiên quyết để chọn lựa test thống kê phù hợp.

- **Phân bố chuẩn (Normal distribution):** Đường cong phân bố có hình dáng hình chuông và đối xứng. Trong phân bố chuẩn, giá trị trung bình, trung vị và mốt xấp xỉ bằng nhau và nằm ở điểm cao nhất của đường cong. Khoảng $68%$ dữ liệu sẽ nằm trong khoảng $\pm 1$ độ lệch chuẩn (SD) từ giá trị trung bình, và $95%$ dữ liệu nằm trong khoảng $\pm 1,96$ độ lệch chuẩn.
- **Phân bố lệch (Skewed distribution):** Xảy ra khi dữ liệu không đối xứng, có thể là lệch trái hoặc lệch phải. Đối với dữ liệu này, giá trị trung bình sẽ bị kéo về phía đuôi dài của đường cong, do đó trung vị mới là đại lượng đo lường độ tập trung chính xác nhất.

### 4. TƯ DUY PHẢN BIỆN LÂM SÀNG TRONG BÁO CÁO THỐNG KÊ MÔ TẢ

Theo chuẩn mực báo cáo thử nghiệm lâm sàng quốc tế (CONSORT 2025), việc báo cáo thống kê mô tả đặc điểm nền (baseline characteristics) của bệnh nhân là cực kỳ quan trọng để bác sĩ lâm sàng đánh giá **Tính ứng dụng thực tế (External Validity)**, giúp họ nhận định xem kết quả nghiên cứu có phù hợp với bệnh nhân thực tế tại phòng khám hay không.

Khi đọc và ứng dụng y văn, cần nhận diện các sai lầm phương pháp luận sau đây trong thống kê mô tả:

- **Sự nhầm lẫn chí mạng giữa Độ lệch chuẩn (SD) và Sai số chuẩn (SE):** Theo chuẩn CONSORT, các biến số liên tục (ví dụ: huyết áp, cân nặng) phải được tóm tắt bằng giá trị Trung bình và Độ lệch chuẩn (SD) để mô tả tính biến thiên của dữ liệu. **Tuyệt đối không sử dụng Sai số chuẩn (Standard Error - SE) hay Khoảng tin cậy (Confidence Intervals - CI) để mô tả tính biến thiên**, bởi vì đây là các đại lượng của thống kê suy luận (inferential statistics) nhằm ước lượng quần thể, chứ không mang ý nghĩa thống kê mô tả. Nhiều tác giả cố tình dùng SE thay vì SD để làm cho dữ liệu có vẻ "ít phân tán" hơn (vì SE luôn nhỏ hơn SD).
- **Ép buộc dữ liệu lệch phải dùng Trung bình:** Khi dữ liệu liên tục có phân bố không đối xứng (asymmetrical distribution), phương pháp tiếp cận chuẩn xác nhất là báo cáo giá trị Trung vị (Median) và các giá trị Bách phân vị (ví dụ: bách phân vị thứ 25 và 75). Việc cố tình dùng giá trị Trung bình (Mean) cho dữ liệu lệch sẽ bóp méo bức tranh lâm sàng.
- **Xử lý sai biến thứ bậc:** Đối với các biến số có số lượng danh mục thứ bậc nhỏ (ví dụ: giai đoạn bệnh từ I đến IV), tuyệt đối không được xử lý chúng như các biến liên tục (không dùng số trung bình). Thay vào đó, chúng phải được báo cáo dưới dạng số lượng và tỷ lệ phần trăm cho từng phân nhóm.