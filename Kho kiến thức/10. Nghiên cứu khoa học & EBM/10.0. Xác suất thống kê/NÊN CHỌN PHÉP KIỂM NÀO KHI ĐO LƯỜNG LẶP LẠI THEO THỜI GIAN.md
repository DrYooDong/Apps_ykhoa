​Khi đánh giá hiệu quả của một phác đồ điều trị (ví dụ: đo nồng độ Cholesterol máu trên cùng một nhóm 40 bệnh nhân tại 3 thời điểm: Trước điều trị - Sau 1 tháng - Sau 3 tháng), rất nhiều bạn băn khoăn không biết chọn kỹ thuật thống kê nào cho đúng.

​Dưới đây là so sánh nhanh 3 lựa chọn phổ biến nhất từ cơ bản đến nâng cao để các bạn áp dụng vào bài báo cáo hay luận văn của mình:

​1. Paired t-test (Kiểm định t bắt cặp) - KHÔNG NÊN DÙNG

​Vì sao nhiều người nhầm? Vì đây đúng là dạng dữ liệu bắt cặp (đo trên cùng một nhóm bệnh nhân).

​Vì sao không nên dùng? Paired t-test chỉ thiết kế cho đúng 2 thời điểm. Nếu bạn cố tình chạy Paired t-test 3 lần để so sánh từng cặp (Lần 1 vs 2, 2 vs 3, 1 vs 3), bạn sẽ gặp rủi ro lạm phát Sai lầm loại I. Điều này làm tăng xác suất kết luận sai rằng phác đồ có hiệu quả (dương tính giả).

​2. Repeated Measures ANOVA - LỰA CHỌN CƠ BẢN & CHUẨN MỰC

​Khi nào dùng? Khi biến phụ thuộc là biến định lượng liên tục, đo từ 3 thời điểm trở lên trên cùng một nhóm đối tượng.

​Điều kiện: Dữ liệu thỏa mãn phân phối chuẩn và giả định về tính cầu phương (tính cầu) (Sphericity). Nếu dữ liệu bị lệch hoặc không chuẩn, bạn chuyển sang dùng kiểm định phi tham số Friedman test.

​Cách đọc kết quả:

​Nếu p < 0.05: Có sự khác biệt chung về nồng độ Cholesterol giữa các thời điểm.

​Cần chạy thêm Post-hoc test (như điều chỉnh Bonferroni) để biết cụ thể Cholesterol giảm có ý nghĩa ở giai đoạn nào (1 vs 2, 2 vs 3 hay 1 vs 3).

​3. Linear Mixed Model (LMM - Mô hình hỗn hợp) - "CHUẨN VÀNG" TỐI ƯU

​Nếu bạn muốn bài nghiên cứu của mình đạt chuẩn mực xuất bản quốc tế, Mixed Model là công cụ mạnh mẽ nhất hiện nay nhờ các ưu điểm vượt trội:

​Xử lý triệt để dữ liệu khuyết (Missing Data): Trong thực tế theo dõi bệnh nhân qua thời gian, rất hay có trường hợp bệnh nhân bỏ cuộc hoặc mất dấu ở lần đo 2 hoặc 3. Repeated Measures ANOVA sẽ xóa bỏ hoàn toàn bệnh nhân đó khỏi phân tích, còn Mixed Model vẫn tận dụng được dữ liệu của các lần đo còn lại.

​Linh hoạt về thời gian: Không bắt buộc khoảng cách giữa các lần tái khám của mọi bệnh nhân phải chính xác tuyệt đối như nhau.

​Phân tách biến thiên: Cho phép tách biệt hiệu ứng ngẫu nhiên giữa các cá thể (Random effects) và hiệu ứng chung của phác đồ điều trị (Fixed effects).

​ TÓM TẮT NHANH ĐỂ BẠN ÁP DỤNG:

- ​Làm báo cáo/luận văn căn bản: Dùng Repeated Measures ANOVA (hoặc Friedman).

- ​Làm nghiên cứu chuyên sâu/xuất bản: Dùng Linear Mixed Model (LMM).

​Tuyệt đối không dùng Paired t-test lặp lại nhiều lần!