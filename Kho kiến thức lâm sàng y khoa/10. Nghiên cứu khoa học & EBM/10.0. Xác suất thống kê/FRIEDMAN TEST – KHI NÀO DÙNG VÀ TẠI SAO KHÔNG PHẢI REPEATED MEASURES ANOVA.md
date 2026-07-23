Trước đây mình đã viết về Repeated Measures ANOVA – lựa chọn thông dụng nhất khi so sánh nhiều thời điểm trên cùng một nhóm đối tượng. Tuy nhiên, một câu hỏi rất hay mà nhiều học viên thường gặp là:

"Nếu dữ liệu không phân phối chuẩn thì sao? Có dùng ANOVA ghép cặp được không?"

Câu trả lời là: Không. Khi đó Friedman test mới là lựa chọn phù hợp.

FRIEDMAN TEST – KHI NÀO DÙNG VÀ TẠI SAO KHÔNG PHẢI REPEATED MEASURES ANOVA?

Giả sử bạn nghiên cứu hiệu quả của một chương trình giảm cân trên 20 người, đo BMI tại 3 thời điểm:

• Trước can thiệp

• Sau 1 tháng

• Sau 3 tháng

Đây là dữ liệu đo lặp lại trên cùng một đối tượng, nên nhiều người sẽ nghĩ ngay đến Repeated Measures ANOVA.

Nhưng hãy kiểm tra dữ liệu trước.

Kết quả Shapiro-Wilk cho thấy:

• Trước điều trị: p = 0,012

• Sau 1 tháng: p = 0,028

• Sau 3 tháng: p = 0,006

Tất cả đều p < 0,05, nghĩa là dữ liệu không tuân theo phân phối chuẩn.

Lúc này, Repeated Measures ANOVA không còn là lựa chọn thích hợp vì một trong những giả định quan trọng của phép kiểm đã bị vi phạm.

Vì sao không dùng Repeated Measures ANOVA?

Repeated Measures ANOVA là kiểm định tham số (parametric test).

Để kết quả đáng tin cậy, phép kiểm này cần một số giả định như:

• Biến phụ thuộc là biến định lượng liên tục

• Các lần đo thuộc cùng một đối tượng

• Phân phối gần chuẩn

• Thỏa giả định tính cầu (Sphericity)

Nếu dữ liệu lệch nhiều hoặc có ngoại lai mạnh, giá trị p của ANOVA có thể không còn chính xác.

Friedman test là gì?

Friedman test là kiểm định phi tham số dùng để so sánh từ 3 thời điểm trở lên trên cùng một nhóm đối tượng.

Nó được xem là "phiên bản không tham số" của Repeated Measures ANOVA.

Điểm khác biệt quan trọng là:

Friedman test không phân tích trực tiếp giá trị đo mà xếp hạng (ranking) các giá trị trong từng đối tượng.

Nhờ vậy phép kiểm ít bị ảnh hưởng bởi:

• Dữ liệu lệch

• Ngoại lai

• Phân phối không chuẩn

Ví dụ: 20 bệnh nhân được đo điểm đau (VAS): Xem bảng trong hình bên dưới

Do điểm đau phân phối không chuẩn nên sử dụng Friedman test.

Kết quả:

Friedman test: p < 0,001

Kết luận: Có sự khác biệt có ý nghĩa thống kê về điểm đau giữa ít nhất một trong các thời điểm theo dõi.

Sau Friedman test có cần làm tiếp không?

Có.

Giống như ANOVA, Friedman chỉ cho biết:

Có ít nhất một thời điểm khác biệt.

Nó không cho biết thời điểm nào khác nhau.

Do đó cần thực hiện so sánh từng cặp (post-hoc analysis), thường dùng:

• Wilcoxon signed-rank test

• Điều chỉnh Bonferroni hoặc Holm để kiểm soát sai lầm loại I.

Friedman hay Repeated Measures ANOVA? (Xem bảng tổng kết bên dưới)

Khi nào chọn Friedman test?

Hãy chọn Friedman test khi:

• Có từ 3 lần đo trở lên trên cùng một đối tượng.

• Biến phụ thuộc là thứ bậc hoặc định lượng nhưng không phân phối chuẩn.

• Không muốn vi phạm giả định của Repeated Measures ANOVA.

Ngược lại, nếu dữ liệu phân phối chuẩn và đáp ứng các giả định cần thiết, Repeated Measures ANOVA sẽ có hiệu quả thống kê cao hơn.

Ghi nhớ nhanh

• 2 thời điểm + không chuẩn: Wilcoxon signed-rank test.

• ≥ 3 thời điểm + không chuẩn: Friedman test.

• ≥ 3 thời điểm + phân phối chuẩn: Repeated Measures ANOVA.

• Có dữ liệu khuyết hoặc thiết kế nghiên cứu phức tạp: Linear Mixed Model (LMM).

Một lỗi rất phổ biến là thấy dữ liệu đo lặp lại thì mặc định chạy Repeated Measures ANOVA. Thực tế, việc lựa chọn phép kiểm không chỉ phụ thuộc vào thiết kế nghiên cứu mà còn phụ thuộc vào việc dữ liệu có đáp ứng các giả định của phép kiểm hay không. Friedman test chính là lựa chọn đúng khi dữ liệu đo lặp lại nhưng không thỏa điều kiện của Repeated Measures ANOVA.