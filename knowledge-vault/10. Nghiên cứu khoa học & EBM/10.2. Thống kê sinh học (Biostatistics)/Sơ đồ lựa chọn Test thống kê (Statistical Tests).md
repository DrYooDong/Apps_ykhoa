Dưới góc độ của một chuyên gia về Y học chứng cứ (EBM) và Thống kê y học, tôi xin trình bày hướng dẫn lựa chọn các thuật toán thống kê (Statistical Tests) dựa trên các nguyên tắc phương pháp luận được cung cấp trong tài liệu.

Việc lựa chọn sai test thống kê sẽ dẫn đến kết quả phân tích bị sai lệch, từ đó đưa ra các kết luận lâm sàng không chính xác. Để chọn đúng test, nhà nghiên cứu cần trải qua một tư duy logic dựa trên 3 câu hỏi cốt lõi.

### 1. BA BƯỚC TƯ DUY TRƯỚC KHI CHỌN TEST THỐNG KÊ

Theo phương pháp luận nghiên cứu, việc lựa chọn một test thống kê (parametric hay non-parametric) phụ thuộc hoàn toàn vào 3 yếu tố sau:

- **Bước 1: Xác định loại biến số của biến phụ thuộc (Kết cục - Outcome):** Biến số là định lượng (liên tục) hay định tính (nhị giá, thứ bậc, danh định)?
- **Bước 2: Xác định mục tiêu phân tích và số nhóm so sánh:** Bạn đang muốn so sánh sự khác biệt (giữa 2 nhóm hay nhiều hơn 2 nhóm), hay muốn tìm mối tương quan/nhân quả? Các nhóm này là độc lập (Independent) hay ghép cặp (Paired - ví dụ: đo trước và sau can thiệp trên cùng một bệnh nhân)?
- **Bước 3: Kiểm tra phân bố dữ liệu (Data Distribution):**
    - Nếu dữ liệu định lượng có hình dáng **phân bố chuẩn (Normal distribution)** dạng hình chuông đối xứng: Áp dụng các **Test tham số (Parametric tests)**.
    - Nếu dữ liệu phân bố lệch (lệch trái, lệch phải) hoặc không tuân theo phân bố chuẩn: Phải áp dụng các **Test phi tham số (Non-parametric tests)**.

---

### 2. BẢNG SƠ ĐỒ LỰA CHỌN TEST THỐNG KÊ CƠ BẢN

Dựa trên hệ thống tài liệu cung cấp, dưới đây là bảng hệ thống hóa các test thống kê thông dụng trong y khoa:

|Mục tiêu phân tích|Loại biến phụ thuộc (Kết cục)|Phân bố dữ liệu / Đặc điểm nhóm|Test Thống Kê Khuyên Dùng|
|:--|:--|:--|:--|
|**So sánh 2 giá trị trung bình (2 nhóm độc lập)**|Định lượng (Liên tục)|Phân bố chuẩn|**Test t-student độc lập (Independent t-test)**|
|**So sánh 2 giá trị trung bình (1 nhóm đo 2 lần)**|Định lượng (Liên tục)|Đo lường lặp lại / Ghép cặp (Trước - Sau)|**Test t ghép cặp (Paired t-test)**|
|**So sánh > 2 giá trị trung bình**|Định lượng (Liên tục)|Phân bố chuẩn|**Phân tích phương sai (ANOVA - F test)**|
|**So sánh tỷ lệ / Phân bố**|Định tính (Phân nhóm)|Các nhóm độc lập|**Test Chi-bình phương ($\chi^2$)**|
|**Mối tương quan (Correlation)**|Định lượng (Liên tục)|Mối quan hệ tuyến tính giữa 2 biến|**Hệ số tương quan Pearson**|
|**Mối tương quan (Correlation)**|Định tính (Danh định)|Bảng tiếp liên, không có chiều hướng|**Hệ số Cramer's V**|
|**Hồi quy (Dự báo nguy cơ)**|Định lượng (Liên tục)|Có biến độc lập và biến phụ thuộc|**Hồi quy tuyến tính (Linear Regression)**|
|**Hồi quy (Dự báo nguy cơ)**|Định tính (Nhị giá - Có/Không)|Có biến độc lập và biến phụ thuộc|**Hồi quy Logistic đa biến (Logistic Regression)**|

_(Lưu ý: Tài liệu được cung cấp tập trung mô tả chi tiết các test tham số cơ bản và mô hình hồi quy, không liệt kê chi tiết tên gọi của các test phi tham số tương ứng như Mann-Whitney hay Kruskal-Wallis, mà chỉ định hướng nguyên tắc chung là dùng "test phi tham số" khi không đạt phân bố chuẩn)._

---

### 3. PHÂN TÍCH CHI TIẾT CÁC TEST THỐNG KÊ TRỌNG TÂM

#### A. Nhóm Test so sánh giá trị trung bình (Dữ liệu định lượng)

- **Test t-student (t-test):** Được sử dụng để so sánh giá trị trung bình của một mẫu đối với quần thể, hoặc so sánh hai giá trị trung bình với nhau (đòi hỏi cỡ mẫu lý tưởng là $>30$ và có phân bố chuẩn).
    - _Test t độc lập:_ Dùng khi so sánh hai nhóm hoàn toàn khác biệt (ví dụ: nhóm can thiệp và nhóm chứng).
    - _Test t ghép cặp (Paired t-test):_ Áp dụng khi biến phụ thuộc được đo lường 2 lần trên cùng một đối tượng (ví dụ: đo chất lượng sống trước và sau khi dùng thuốc).
- **Phân tích phương sai (ANOVA):** Khi cần so sánh giá trị trung bình của **nhiều hơn 2 nhóm** cùng một lúc. Kỹ thuật này sử dụng kiểm định F (F test) để xác định xem sự khác biệt giữa các nhóm có ý nghĩa thống kê hay không.

#### B. Nhóm Test so sánh tỷ lệ (Dữ liệu định tính)

- **Kiểm định Chi-bình phương ($\chi^2$):** Đây là kỹ thuật thông dụng nhất để so sánh các tần suất, tỷ lệ phần trăm giữa hai hay nhiều nhóm. Kỹ thuật này đánh giá xem có mối liên hệ (sự phụ thuộc) nào giữa các biến định tính hay không bằng cách lập bảng so sánh chéo (cross-tabulation). Kỹ thuật này cũng được dùng để tính chỉ số chênh (Odds Ratio - OR) thông qua kiểm định Haenzel Mentel.

#### C. Nhóm đánh giá Tương quan và Mô hình Hồi quy

- **Hệ số tương quan Pearson ($r$):** Dùng để đánh giá mức độ tương quan tuyến tính giữa hai biến định lượng (ví dụ: mối liên hệ giữa chiều cao và cân nặng). Hệ số này cho biết hai biến tăng/giảm cùng nhau như thế nào, nhưng không khẳng định quan hệ nhân quả.
- **Mô hình Hồi quy tuyến tính (Linear Regression):** Được sử dụng khi muốn dự báo sự thay đổi của một biến phụ thuộc (dạng định lượng) dựa trên một hoặc nhiều biến độc lập.
- **Mô hình Hồi quy Logistic (Logistic Regression):** Vô cùng quan trọng trong nghiên cứu y học (đặc biệt là nghiên cứu bệnh - chứng và thuần tập). Áp dụng khi **biến phụ thuộc là biến nhị giá** (chỉ có 2 trạng thái: Có bệnh/Không bệnh, Sống/Chết). Mô hình này cho phép tính toán Tỷ số chênh (Odds Ratio) và kiểm soát các yếu tố gây nhiễu bằng cách đưa nhiều biến độc lập (nhân khẩu học, lâm sàng) vào cùng một phương trình.

---

### 4. TƯ DUY PHẢN BIỆN LÂM SÀNG TRONG THỐNG KÊ (CRITICAL APPRAISAL)

Để ứng dụng EBM một cách chính xác, bác sĩ lâm sàng khi đọc y văn cần có tư duy phản biện đối với cách các tác giả chọn test thống kê:

- **Nguy cơ sai lệch do "Cố ép" phân bố chuẩn:** Một sai lầm phổ biến trong các nghiên cứu là sử dụng ngay các test tham số (như t-test hay ANOVA) cho dữ liệu có cỡ mẫu nhỏ hoặc bị lệch vẹo trầm trọng (skewed data) mà không trải qua bước kiểm định phân bố chuẩn. Lựa chọn này có thể làm sai lệch giá trị $p$ (p-value), dẫn đến kết luận "có ý nghĩa thống kê" giả tạo (False positive).
- **Không kiểm soát yếu tố gây nhiễu:** Khi đánh giá mối quan hệ giữa biến độc lập và biến phụ thuộc, nếu tác giả chỉ sử dụng các test đơn biến (như t-test hay Chi-bình phương) thì kết quả có thể bị nhiễu nặng nề. Phân tích đa biến (như Hồi quy Logistic) là phương pháp bắt buộc để cô lập tác động thực sự của một can thiệp hay yếu tố nguy cơ.
- **Chuyển đổi dữ liệu định lượng thành định tính:** Đôi khi các nhà nghiên cứu tự ý "cắt" một biến định lượng (như huyết áp) thành biến phân nhóm (cao/thấp) để sử dụng test Chi-bình phương hoặc Hồi quy Logistic thay vì Hồi quy tuyến tính. Việc này làm mất đi sự chi tiết (độ phân giải) của dữ liệu nguyên bản và có thể che giấu các quy luật sinh học thực sự.

**Kết luận:** Sơ đồ lựa chọn test thống kê không phải là một công thức cứng nhắc mà là một quy trình ra quyết định phụ thuộc vào bản chất dữ liệu. Việc hiểu rõ cơ chế của t-test, ANOVA, Chi-bình phương hay mô hình Hồi quy giúp bác sĩ không bị "lạc lối" trước ma trận các con số $p$, từ đó chắt lọc được những chứng cứ y khoa có độ tin cậy thực sự cao.