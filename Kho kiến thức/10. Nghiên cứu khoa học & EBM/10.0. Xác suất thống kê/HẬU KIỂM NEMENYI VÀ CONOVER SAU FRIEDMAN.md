TS. Đào Hồng Nam

Khi kiểm định Friedman cho kết quả p < 0,05, chúng ta chỉ biết rằng có sự khác biệt chung giữa các thời điểm. Nhưng kiểm định Friedman không cho biết cụ thể thời điểm nào khác biệt với thời điểm nào. Vì vậy, bước tiếp theo bắt buộc là thực hiện phân tích hậu kiểm (post-hoc test).

Hiện nay, hai phép hậu kiểm được sử dụng phổ biến nhất sau Friedman là Nemenyi và Conover–Iman. Mặc dù đều dùng để so sánh từng cặp thời điểm, nhưng mỗi phương pháp có ưu điểm và phạm vi áp dụng khác nhau. Bạn có thể xem phần tổng hợp tại Bảng 1.

1. Hậu kiểm Nemenyi (Nemenyi Test)

Nemenyi là phương pháp hậu kiểm được thiết kế nhằm kiểm soát chặt chẽ sai lầm loại I khi thực hiện nhiều phép so sánh cùng lúc.

Nguyên lý của phương pháp là so sánh khoảng cách giữa trung bình thứ hạng của từng cặp thời điểm với khoảng cách tới hạn (Critical Difference – CD). Nếu khoảng cách giữa hai trung bình thứ hạng vượt quá giá trị CD thì hai thời điểm được xem là khác biệt có ý nghĩa thống kê. Cách tính khoảng cách tới hạn được trình bày tại Công thức 1.

Nhờ kiểm soát đồng thời toàn bộ các phép so sánh, Nemenyi giúp giảm đáng kể nguy cơ kết luận dương tính giả. Tuy nhiên, chính vì khá thận trọng nên phương pháp này đôi khi bỏ sót những khác biệt nhỏ, đặc biệt khi cỡ mẫu không lớn.

Do đó, Nemenyi thường phù hợp với các nghiên cứu xác nhận, cỡ mẫu lớn hoặc khi nhà nghiên cứu muốn ưu tiên tính an toàn của kết luận.

2. Hậu kiểm Conover–Iman (Conover Test)

Conover–Iman cũng là phép hậu kiểm được phát triển cho kiểm định Friedman nhưng có độ nhạy thống kê cao hơn so với Nemenyi.

Phương pháp này xây dựng thống kê kiểm định dựa trên sự khác biệt giữa các trung bình thứ hạng và chuyển đổi sang phân phối Student's t. Chi tiết cách tính được trình bày tại Công thức 2.

Nhờ có độ nhạy cao, Conover thường phát hiện được những khác biệt mà Nemenyi có thể bỏ sót, đặc biệt trong các nghiên cứu có cỡ mẫu vừa hoặc nhỏ.

Ưu điểm này cũng đi kèm với nguy cơ làm tăng sai lầm loại I nếu thực hiện nhiều phép so sánh mà không hiệu chỉnh p-value. Vì vậy, khi sử dụng Conover, nên kết hợp các phương pháp hiệu chỉnh như Holm hoặc Bonferroni.

Conover đặc biệt phù hợp với các nghiên cứu mang tính khám phá hoặc khi mục tiêu là phát hiện những khác biệt tương đối nhỏ giữa các thời điểm.

Nên chọn Nemenyi hay Conover?

Không có phương pháp nào tốt hơn trong mọi tình huống.

Nếu ưu tiên kiểm soát sai lầm loại I và mong muốn kết luận thật chặt chẽ thì Nemenyi là lựa chọn phù hợp.

Nếu ưu tiên độ nhạy thống kê, đặc biệt trong nghiên cứu có cỡ mẫu vừa hoặc nhỏ, Conover sẽ là lựa chọn hợp lý hơn, với điều kiện cần áp dụng hiệu chỉnh p-value thích hợp.

Các đặc điểm của hai phương pháp được tổng hợp trong Bảng 1.

Tóm tắt:

Muốn kiểm soát sai lầm loại I nghiêm ngặt → Chọn Nemenyi.

Muốn tăng khả năng phát hiện khác biệt → Chọn Conover–Iman.

Khi dùng Conover nên hiệu chỉnh p-value bằng Holm hoặc Bonferroni.

Cả hai phép hậu kiểm chỉ nên thực hiện sau khi Friedman test cho kết quả có ý nghĩa thống kê