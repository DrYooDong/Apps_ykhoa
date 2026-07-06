Dưới góc độ của một chuyên gia về Y học chứng cứ (EBM) và Thống kê y học, tôi xin phân tích chi tiết cách đọc hiểu, diễn dịch và áp dụng các chỉ số thống kê lâm sàng cốt lõi: **Tỷ số chênh (OR)**, **Tỷ số nguy cơ (RR)**, **Tỷ số rủi ro (HR)** và **Số bệnh nhân cần điều trị (NNT)** dựa trên các tài liệu đã cung cấp.

Trong Y học chứng cứ, việc lựa chọn và diễn giải đúng các chỉ số này quyết định việc một bác sĩ có đánh giá chính xác lợi ích thực sự của phương pháp điều trị hay không.

---

### 1. CÁC CHỈ SỐ ĐO LƯỜNG TÁC ĐỘNG TƯƠNG ĐỐI (RELATIVE EFFECTS)

Các chỉ số này biểu diễn kết quả của nhóm can thiệp tương đối so với nhóm chứng. Điểm chung của chúng là: Nếu giá trị = 1, nghĩa là không có sự khác biệt giữa hai nhóm. Nếu < 1, can thiệp làm giảm nguy cơ (có lợi nếu biến cố là bệnh tật/tử vong); nếu > 1, can thiệp làm tăng nguy cơ.

#### A. Tỷ số nguy cơ (Risk Ratio / Relative Risk - RR)

- **Định nghĩa:** Là tỷ số giữa nguy cơ (xác suất) xảy ra biến cố ở nhóm can thiệp chia cho nguy cơ xảy ra biến cố ở nhóm chứng.
- **Ứng dụng:** Thường dùng trong các nghiên cứu tiến cứu (Nghiên cứu thuần tập, Thử nghiệm lâm sàng ngẫu nhiên - RCT).
- **Diễn dịch:** Nếu RR = 0.25, nghĩa là xác suất xảy ra biến cố khi có điều trị chỉ bằng 1/4 (hay giảm 75%) so với khi không điều trị.

#### B. Tỷ số chênh (Odds Ratio - OR)

- **Định nghĩa:** Là tỷ số giữa "chênh" (odds) của một biến cố ở nhóm này so với "chênh" ở nhóm kia. "Chênh" là tỷ lệ giữa số người mắc bệnh chia cho số người không mắc bệnh.
- **Ứng dụng:** Là chỉ số bắt buộc trong các nghiên cứu bệnh - chứng (hồi cứu) và là kết quả đầu ra của các mô hình hồi quy Logistic đa biến.

#### C. Tỷ số rủi ro (Hazard Ratio - HR)

- **Định nghĩa:** Tương tự như RR nhưng được sử dụng riêng cho dữ liệu **thời gian đến khi có biến cố (time-to-event / survival data)**. Nó đo lường nguy cơ tức thời (instantaneous risk) tại bất kỳ một thời điểm nào đó trong suốt quá trình theo dõi.
- **Ứng dụng:** Thường thấy trong các biểu đồ sống còn Kaplan-Meier ở các thử nghiệm ung thư hoặc tim mạch. Ví dụ: HR = 2 nghĩa là tại bất kỳ thời điểm nào, một bệnh nhân chưa gặp biến cố ở nhóm này sẽ có nguy cơ gặp biến cố cao gấp đôi nhóm kia.

---

### 2. CÁC CHỈ SỐ ĐO LƯỜNG TÁC ĐỘNG TUYỆT ĐỐI VÀ LÂM SÀNG

Trong khi OR và RR trả lời câu hỏi "Thuốc này giảm nguy cơ được bao nhiêu phần trăm?", thì các chỉ số tuyệt đối trả lời câu hỏi thực tế hơn: "Tôi phải điều trị bao nhiêu bệnh nhân để cứu được 1 người?".

#### A. Giảm nguy cơ tuyệt đối (Absolute Risk Reduction - ARR / Risk Difference - RD)

- **Định nghĩa:** Là hiệu số (phép trừ) giữa tỷ lệ mắc bệnh ở nhóm chứng và tỷ lệ mắc bệnh ở nhóm can thiệp.
- **Giá trị:** Cung cấp thông tin trực tiếp và hữu ích nhất để cân nhắc sự đánh đổi giữa lợi ích và tác hại của một can thiệp.

#### B. Số bệnh nhân cần điều trị (Number Needed to Treat - NNT)

- **Định nghĩa:** Là số lượng bệnh nhân trung bình cần được điều trị bằng phương pháp can thiệp (thay vì nhóm chứng) trong một khoảng thời gian nhất định để ngăn ngừa thêm 1 biến cố bất lợi.
- **Cách tính:** Bằng nghịch đảo của Giảm nguy cơ tuyệt đối: **NNT = 1 / ARR**. (Quy ước thống kê luôn làm tròn NNT lên số nguyên gần nhất).
- **Biến thể:** Đối với các tác dụng phụ, người ta dùng chỉ số **Số bệnh nhân cần điều trị để gây hại (Number Needed to Treat for Harm - NNTH)** để mô tả phải điều trị bao nhiêu người thì có 1 người bị tác dụng phụ. (Lưu ý: Tổ chức Cochrane khuyên dùng cụm từ NNTH thay vì cụm từ NNH - Number Needed to Harm để tránh hiểu lầm ngữ nghĩa).

---

### 3. TƯ DUY PHẢN BIỆN LÂM SÀNG (CRITICAL APPRAISAL) KHI ĐỌC CHỈ SỐ

Đây là phần quan trọng nhất trong EBM. Rất nhiều bác sĩ bị các bài báo "đánh lừa" do không hiểu rõ bản chất của các chỉ số này.

#### Lỗi 1: Nhầm lẫn chí mạng giữa OR và RR (Đánh giá quá mức hiệu quả)

- **Bản chất:** Tỷ số chênh (OR) và Tỷ số nguy cơ (RR) là hai khái niệm hoàn toàn khác nhau. Khi biến cố nghiên cứu là **hiếm gặp**, OR và RR có giá trị gần bằng nhau. Nhưng khi biến cố **thường gặp (phổ biến)**, OR luôn luôn phóng đại (overestimate) mức độ tác động so với RR.
- **Phản biện:** Việc diễn dịch sai OR thành RR là một lỗi cực kỳ phổ biến trong các báo cáo y văn. Nếu can thiệp làm giảm nguy cơ, việc đọc OR như là RR sẽ làm bác sĩ lầm tưởng thuốc có tác dụng tốt hơn thực tế rất nhiều.

#### Lỗi 2: Ảo giác của "Giảm nguy cơ tương đối" (Relative Risk Reduction - RRR)

- **Bản chất:** RRR = 1 - RR. Các hãng dược phẩm và các báo cáo thử nghiệm rất thích sử dụng RRR vì con số này luôn trông rất lớn và ấn tượng.
- **Phản biện:** Cả bác sĩ và bệnh nhân đều có xu hướng đánh giá quá cao hiệu quả của thuốc nếu chỉ nhìn vào RRR.
    - _Ví dụ minh họa:_ Nếu nguy cơ đột quỵ giảm từ 4% xuống 3%, thì ARR (Tuyệt đối) chỉ là **1%**, tức là NNT = 100 (phải điều trị 100 người mới ngừa được 1 ca đột quỵ). Nhưng RRR (Tương đối) lại lên tới **25%**. Mức giảm 25% nghe rất thuyết phục, nhưng thực tế lâm sàng (NNT=100) lại rất khiêm tốn. Do đó, Y học chứng cứ bắt buộc phải xem xét NNT và ARR, không bao giờ quyết định lâm sàng chỉ dựa vào RRR.

#### Lỗi 3: Áp dụng NNT mà bỏ qua Nguy cơ nền (Baseline Risk) và Thời gian

- **Nhiễu do ngoại suy:** NNT phụ thuộc hoàn toàn vào nguy cơ nền (control group risk) của quần thể. Thuốc chống đông Warfarin giúp giảm 70 ca đột quỵ trên 1000 bệnh nhân nguy cơ cao (NNT $\approx$ 14), nhưng chỉ giảm 12 ca trên 1000 bệnh nhân nguy cơ thấp (NNT $\approx$ 83). Do đó, NNT không phải là đặc tính hằng định của một loại thuốc, mà bị thay đổi tùy theo đối tượng bệnh nhân.
- **Thời gian:** NNT bắt buộc phải đi kèm với thời gian theo dõi. Việc nói "NNT = 12" là vô nghĩa nếu không nói rõ là "điều trị 12 bệnh nhân **trong vòng 4 năm**".

#### Lỗi 4: Ý nghĩa Thống kê (P-value) vs Ý nghĩa Lâm sàng (Độ rộng của Khoảng tin cậy - CI)

- Một kết quả có $P < 0.05$ chỉ chứng minh hiệu quả đó "không phải do tình cờ", chứ không nói lên hiệu quả đó "có đáng giá để điều trị hay không".
- **Phản biện bằng Khoảng tin cậy (95% CI):** Khi đọc các chỉ số OR, RR, HR hay ARR, điều quan trọng nhất là nhìn vào giới hạn dưới và giới hạn trên của Khoảng tin cậy.
    - Nếu một can thiệp làm giảm đột quỵ 1.3% nhưng 95% CI rất rộng (từ giảm 2.0% đến chỉ giảm 0.6%), và ngưỡng lâm sàng tối thiểu để bác sĩ chấp nhận dùng thuốc là phải giảm được 1.0% (do thuốc có độc tính cao). Lúc này, bằng chứng bị đánh giá là **không chính xác (imprecision)** vì giới hạn xấu nhất của CI (0.6%) nằm dưới ngưỡng quyết định lâm sàng, bất kể giá trị P có nhỏ đến đâu.

---

### BẢNG TỔNG HỢP NGUYÊN TẮC ÁP DỤNG TRONG THỰC HÀNH LÂM SÀNG

|Chỉ số|Tên tiếng Việt|Bản chất phương pháp luận|Nguyên tắc áp dụng lâm sàng (EBM)|
|:--|:--|:--|:--|
|**RR**|Tỷ số nguy cơ|So sánh xác suất mắc bệnh giữa 2 nhóm. Dùng trong nghiên cứu tiến cứu.|Dùng để đo lường tính đồng nhất của hiệu quả can thiệp trên nhiều quần thể khác nhau. Dễ hiểu hơn OR.|
|**OR**|Tỷ số chênh|Dùng trong nghiên cứu hồi cứu (bệnh chứng) và hồi quy đa biến.|Cảnh giác: Sẽ phóng đại hiệu quả nếu bệnh lý đó phổ biến. Không được diễn giải OR như RR.|
|**HR**|Tỷ số rủi ro|Dùng trong nghiên cứu sống còn (thời gian đến khi có biến cố).|Mang yếu tố thời gian. Ước lượng nguy cơ tức thời tại mọi thời điểm trong nghiên cứu.|
|**NNT**|Số bệnh nhân cần điều trị|Là nghịch đảo của Giảm nguy cơ tuyệt đối (ARR). $NNT = 1/ARR$|Chỉ số vàng để ra quyết định điều trị lâm sàng. Phải luôn gắn liền với **Nguy cơ nền** của bệnh nhân và **Thời gian** theo dõi.|