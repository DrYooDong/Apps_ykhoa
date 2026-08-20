# BÀI HỌC CHI TIẾT: KỸ THUẬT SINH HỌC PHÂN TỬ Y HỌC (PCR, REAL-TIME qPCR, NGS) - PHẦN 2

Bài học này cung cấp kiến thức hóa sinh học và sinh học phân tử lâm sàng chuyên sâu về các kỹ thuật nhân bản và phân tích vật chất di truyền tiên tiến nhất hiện nay, bao gồm **Kỹ thuật Real-time qPCR** (định lượng biểu hiện gen và tải lượng tác nhân gây bệnh), **Kỹ thuật giải trình tự Sanger cổ điển & tự động**, **Giải trình tự thế hệ mới (NGS)**, và **Giải trình tự đơn phân tử thế hệ thứ ba (Nanopore Sequencing)**, đồng thời phân tích sâu sắc các ứng dụng y học thực tiễn của chúng.

---

## I. KỸ THUẬT REAL-TIME QUANTITATIVE PCR (qPCR)

### 1. Tổng Quan và Nguyên Lý Định Lượng Thời Gian Thực
Trong khi kỹ thuật PCR cổ điển (Endpoint PCR) chỉ cho phép phát hiện sự có mặt của sản phẩm khuếch đại ở giai đoạn cuối cùng sau khi kết thúc hoàn toàn các chu kỳ nhiệt thông qua điện di gel agarose, **Real-time qPCR (Quantitative PCR)** là một bước tiến vượt bậc cho phép theo dõi, ghi nhận và định lượng trực tiếp lượng sản phẩm ADN được nhân bản **theo thời gian thực (real-time)** ngay trong từng chu kỳ nhiệt [21, 133].

*   **Ưu điểm vượt trội của Real-time qPCR** [133]:
    *   **Không cần xử lý sau PCR**: Loại bỏ hoàn toàn bước điện di gel agarose và nhuộm hóa chất, từ đó rút ngắn đáng kể thời gian xét nghiệm [133].
    *   **Hạn chế tối đa ngoại nhiễm**: Do ống phản ứng luôn được đóng kín từ đầu đến cuối quá trình, hạn chế tối đa nguy cơ ngoại nhiễm các sản phẩm PCR lơ lửng trong không khí phòng thí nghiệm [133].
    *   **Tính định lượng chính xác**: Có khả năng xác định chính xác số lượng bản sao ban đầu của tác nhân đích trong mẫu thử, một thông số mà PCR cổ điển không thể thực hiện được [137].

---

### 2. Phân Tích Đường Cong Khuếch Đại (Amplification Curve) và Khái Niệm Chu Kỳ Ngưỡng ($C_t$)
Quá trình nhân bản ADN trong từng giếng phản ứng của Real-time qPCR được biểu diễn bằng một **Đường cong khuếch đại (Amplification Curve)** trên biểu đồ tọa độ: trục tung (Y) biểu thị cường độ tín hiệu huỳnh quang ghi nhận được, trục hoành (X) biểu thị số chu kỳ nhiệt [133]. Đường cong khuếch đại điển hình trải qua 3 giai đoạn động học nối tiếp [133, 134]:

```
    Cường độ huỳnh quang (Y)
       ▲
       │                                     /─── [Giai đoạn Bình nguyên (Plateau)] [134]
       │                                    /
       │                                  /
       │                     /─────────── [Giai đoạn Lũy thừa (Exponential)] [134]
       │                    /
       │                   /  ◄─── Điểm vượt ngưỡng (Chu kỳ ngưỡng Ct) [134]
       │                  /
       │  ───────────────/────────────── Ngưỡng phát hiện (Threshold) [134]
       │  ═══════════════   ◄─────────── Đường nền (Baseline, chu kỳ 3-15) [134]
       └─────────────────────────────────────────────► Số chu kỳ nhiệt (X)
```

*   **Giai đoạn Tiềm phục (Lag Phase / Baseline Phase)**:
    *   Trong các chu kỳ đầu tiên, ADN đích được nhân bản theo cấp số nhân, nhưng do lượng sản phẩm tạo ra còn quá ít, tín hiệu huỳnh quang phát ra chưa đủ mạnh để vượt qua giới hạn phát hiện của hệ thống cảm biến quang học [134].
    *   **Đường nền (Baseline)**: Là mức độ huỳnh quang nền không đặc hiệu tích lũy trong các chu kỳ đầu [134]. Theo mặc định, đường nền được xác lập từ **chu kỳ số 3 đến chu kỳ số 15** để làm chuẩn so sánh cho các tín hiệu đặc hiệu xuất hiện sau đó [134].
*   **Giai đoạn Lũy thừa (Exponential Phase / Log Phase)**:
    *   Khi lượng sản phẩm khuếch đại tích lũy đủ lớn, tín hiệu huỳnh quang phát ra tăng vọt theo cấp số nhân và bứt phá ra khỏi đường nền [134].
    *   **Chu kỳ ngưỡng ($C_t$ - Threshold Cycle)**: Là chu kỳ nhiệt mà tại đó tín hiệu huỳnh quang bắt đầu vượt qua ngưỡng phát hiện (Threshold) được thiết lập một cách có ý nghĩa thống kê [134].
    *   *Ý nghĩa định lượng*: **Giá trị $C_t$ tỷ lệ nghịch với logarit nồng độ ADN đích ban đầu** [134, 137]. Nếu mẫu thử chứa lượng tác nhân đích ban đầu càng lớn, tín hiệu huỳnh quang sẽ vượt ngưỡng càng sớm, nghĩa là giá trị $C_t$ càng thấp [134, 137]. Ngược lại, mẫu thử chứa ít tác nhân đích sẽ có $C_t$ cao [134, 137].
*   **Giai đoạn Bình nguyên (Plateau Phase)**:
    *   Cường độ huỳnh quang tăng chậm lại và đi ngang đạt trạng thái bão hòa [134]. Nguyên nhân là do hiệu suất phản ứng PCR giảm dần do số lượng bản sao quá lớn gây ức chế ngược, lượng dNTPs và mồi cạn kiệt, đồng thời hoạt tính của enzyme polymerase bị suy giảm đáng kể sau nhiều chu kỳ nhiệt [134].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Động học qPCR
Dưới đây là sơ đồ chi tiết biểu diễn đường cong khuếch đại của phản ứng Real-time qPCR, trích xuất từ tài liệu cơ bản:

```
[HÌNH MINH HỌA 1: ĐƯỜNG BIỂU DIỄN KHUẾCH ĐẠI TRONG PHẢN ỨNG REAL-TIME qPCR]
- Vị trí: HÓA SINH Y HỌC 2024.md, Chương 16, Hình 16.6 (Trang 419)
- Định danh thay thế: Fig 20.38 trong Essential Biochemistry 5e By Charlotte W. Pratt (Trang 618)
- Chú thích: Biểu đồ động học mô tả sự biến thiên của tín hiệu huỳnh quang theo số chu kỳ nhiệt, làm rõ vị trí đường nền (baseline), ngưỡng phát hiện (threshold), giai đoạn lũy thừa, giai đoạn bình nguyên, và đặc biệt là chu kỳ ngưỡng Ct - mốc định lượng cốt lõi của kỹ thuật.
```

---

### 3. Các Hệ Thống Phát Tín Hiệu Huỳnh Quang
Để chuyển đổi sự nhân bản ADN thành tín hiệu ánh sáng có thể đo lường được, hai hệ thống phát huỳnh quang phổ biến nhất được áp dụng trong lâm sàng là **Chất nhuộm bám mạch đôi** và **Đoạn dò đặc hiệu** [135]:

#### a. Chất nhuộm gắn mạch đôi (Intercalating Dye - SYBR Green I)
*   **Cơ chế hoạt động**: SYBR Green I là phân tử thuốc nhuộm tự do có ái lực cực cao với rãnh nhỏ của chuỗi xoắn kép ADN [136]. Ở trạng thái tự do trong dung dịch, SYBR Green I phát huỳnh quang rất yếu [136]. Khi xảy ra phản ứng khuếch đại, các phân tử SYBR Green I lập tức xen kẽ và bám chặt vào các mạch đôi ADN mới hình thành, làm thay đổi cấu hình không gian và phát ra ánh sáng huỳnh quang cực mạnh khi gặp ánh sáng kích thích thích hợp [136]. Cường độ huỳnh quang tạo ra tỷ lệ thuận với tổng lượng sản phẩm mạch đôi tích lũy [136].
*   **Ưu điểm**: Chi phí rẻ, dễ thiết kế, có thể sử dụng chung cho nhiều phản ứng khuếch đại các gen mục tiêu khác nhau mà không cần đặt hàng tổng hợp riêng biệt.
*   **Nhược điểm (Tính không đặc hiệu)**: SYBR Green I bám không phân biệt vào **mọi cấu trúc mạch đôi** trong ống phản ứng, bao gồm cả các sản phẩm bắt cặp sai không đặc hiệu và cấu trúc mồi tự bắt cặp (primer dimer) [136].
*   **Giải pháp khắc phục - Phân tích đường cong nóng chảy (Melting Curve Analysis)**:
    *   Sau khi kết thúc chu kỳ PCR, máy Real-time PCR thực hiện một chương trình tăng nhiệt độ từ từ từ 60°C lên 95°C và liên tục ghi nhận sự sụt giảm huỳnh quang [136]. Khi đạt đến nhiệt độ nóng chảy ($T_m$) đặc trưng của từng đoạn ADN, mạch đôi sẽ tách đôi thành mạch đơn, giải phóng hoàn toàn SYBR Green I ra dạng tự do làm huỳnh quang sụt giảm đột ngột [136, 186].
    *   Đồ thị đạo hàm bậc nhất của huỳnh quang theo nhiệt độ ($-dF/dT$) sẽ xuất hiện các đỉnh (peak) sắc nhọn [201]. Sản phẩm khuếch đại đặc hiệu (thường dài và giàu G-C) sẽ có một đỉnh nóng chảy cao và duy nhất ở nhiệt độ cao đặc trưng [136, 186]. Các sản phẩm mồi tự bắt cặp (ngắn, kém bền vững) sẽ tạo ra một đỉnh phụ nhỏ ở vùng nhiệt độ thấp hơn, giúp người làm thí nghiệm dễ dàng nhận diện và loại trừ kết quả nhiễu [136].

```
     Huỳnh quang (F)                                    Đạo hàm (-dF/dT)
      ▲                                                  ▲
      │                                                  │          Đỉnh đặc hiệu (Tm cao) [136]
      │──────┐                                           │             │
      │      └─────┐                                     │             ▼
      │            └───────► Tách mạch đột ngột          │            /      │                    │                             │           /        │                    ▼                             │  /\      /    \  ◄─── Đỉnh mồi tự bắt cặp
      └─────────────────────────────────► Nhiệt độ       └─/──\────/──────\────────► Nhiệt độ
                                                           (Tm thấp)
```

#### b. Đoạn dò đặc hiệu (Sequence-Specific Probe - Taqman Probe)
*   **Cấu trúc đoạn dò**: Taqman là một đoạn oligonucleotid sợi đơn ngắn được thiết kế có trình tự bổ sung hoàn hảo với một vùng trình tự nằm bên trong đoạn ADN đích (giữa hai vị trí bắt mồi) [136]. Đoạn dò này được gắn hai phân tử hóa học đặc biệt [136]:
    *   **Reporter (R)**: Chất phát huỳnh quang ở đầu 5' [136].
    *   **Quencher (Q)**: Chất ức chế phát huỳnh quang ở đầu 3' [136].
*   **Hiệu ứng FRET (Fluorescence Resonance Energy Transfer)**: Khi đoạn dò còn nguyên vẹn, do Reporter nằm rất gần Quencher trong không gian, Quencher sẽ hấp thụ toàn bộ năng lượng ánh sáng phát ra từ Reporter, khiến hệ thống hoàn toàn không phát ra tín hiệu huỳnh quang ghi nhận được [136].
*   **Cơ chế giải phóng huỳnh quang**:
    1.  Trong giai đoạn bắt cặp mồi, đoạn dò Taqman gắn đặc hiệu vào vùng mục tiêu trên mạch đơn khuôn [136].
    2.  Khi bước vào giai đoạn kéo dài, enzyme Taq DNA Polymerase di chuyển dọc theo mạch khuôn tổng hợp chuỗi mới từ mồi [136].
    3.  Khi di chuyển đến vị trí cản trở của đoạn dò Taqman, nhờ có **hoạt tính 5' $ightarrow$ 3' exonuclease đặc hiệu**, Taq DNA Polymerase tiến hành phân cắt và giải phóng từng nucleotide của đoạn dò ra ngoài [136, 137].
    4.  Sự phân cắt này làm đứt rời liên kết, đưa Reporter thoát ra dạng tự do và di chuyển ra xa khỏi tầm ảnh hưởng của Quencher [137]. Dưới ánh sáng kích thích, Reporter tự do lập tức phát sáng mạnh mẽ [137]. Cường độ huỳnh quang thu được tỷ lệ thuận với số lượng phân tử ADN đích được tổng hợp sau mỗi chu kỳ [137].
*   **Ưu điểm**: Độ đặc hiệu tuyệt đối cao do yêu cầu đồng thời cả sự bắt cặp chính xác của 2 mồi và 1 đoạn dò [137]. Thích hợp cho các phản ứng PCR đa mồi (Multiplex qPCR) chẩn đoán đồng thời nhiều tác nhân bằng cách gắn các Reporter có màu sắc huỳnh quang khác nhau cho từng đoạn dò đặc hiệu [137].

---

### 4. Các Phương Pháp Định Lượng Trong Real-time qPCR

#### a. Định lượng tuyệt đối (Absolute Quantitation)
*   **Nguyên lý**: Dùng để xác định chính xác số lượng bản sao ban đầu hoặc nồng độ tuyệt đối của tác nhân đích trong mẫu thử chưa biết [141]. Phương pháp này bắt buộc phải xây dựng một **Biểu đồ chuẩn (Standard Curve)** dựa trên một dãy mẫu chuẩn đã biết trước chính xác nồng độ (thường pha loãng theo hệ số 10 liên tiếp, ví dụ: $10^6, 10^5, 10^4, 10^3, 10^2$ bản sao) chạy song song trong cùng một lượt phản ứng [137, 138].
*   **Đường chuẩn tuyến tính**: Biểu diễn mối tương quan tuyến tính giữa giá trị chu kỳ ngưỡng $C_t$ (trục hoành X) và logarit cơ số 10 của số lượng bản sao ban đầu $\log_{10}(S_q)$ (trục tung Y) [138, 142]:
    $$C_t = a \cdot \log_{10}(S_q) + b$$ [142]
    *   Trong đó: $a$ là hệ số góc (slope) của đường chuẩn, $b$ là tọa độ điểm cắt trục tung (y-intercept) [142].
*   **Xác định nồng độ mẫu thử**: Dựa vào giá trị $C_t$ đo được từ mẫu thử chưa biết, máy tính áp dụng công thức toán học đảo ngược để tính ra số lượng bản sao ban đầu ($S_q$) [143]:
    $$S_q = 10^{rac{C_t - b}{a}}$$ [143]
*   **Tiêu chuẩn đánh giá chất lượng đường chuẩn** [138, 139]:
    *   **Hệ số tương quan $R^2$**: Phải đạt từ **0.99 trở lên**, chứng minh độ tuyến tính và độ chính xác cực cao của thao tác pha loãng mẫu chuẩn [139, 140].
    *   **Hiệu suất phản ứng khuếch đại ($E$)**: Trong điều kiện lý tưởng (mỗi chu kỳ số lượng bản sao tăng gấp đôi), hiệu suất đạt 100% (tương ứng hệ số góc $a = -3.32$) [139]. Trong thực hành lâm sàng, hiệu suất chấp nhận được dao động từ **95% đến 105%** [139].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Biểu đồ Chuẩn qPCR
Dưới đây là định vị biểu đồ chuẩn định lượng tuyệt đối trong Real-time qPCR từ các nguồn tài liệu:

```
[HÌNH MINH HỌA 2: BIỂU ĐỒ CHUẨN ĐỊNH LƯỢNG TUYỆT ĐỐI TRONG REAL-TIME qPCR]
- Vị trí: HÓA SINH Y HỌC 2024.md, Chương 16, Hình 16.7 (Trang 421)
- Chú thích: Sơ đồ mô tả đường thẳng tuyến tính đi qua các điểm tọa độ xác định bởi số lượng bản sao mẫu chuẩn pha loãng bậc 10 (trục tung Y) và giá trị Ct tương ứng (trục hoành X), thể hiện các thông số đánh giá chất lượng phản ứng gồm hệ số R^2 = 1.000, hiệu suất E = 99.6% và độ dốc slope = -3.333.
```

---

#### b. Định lượng tương đối (Relative Quantitation)
*   **Nguyên lý**: Dùng để so sánh mức độ biểu hiện (tăng biểu hiện hay giảm biểu hiện) của một hoặc nhiều gen quan tâm giữa các mẫu sinh học khác nhau (ví dụ: so sánh mức mARN của gen ung thư trong mô u so với mô lành lân cận, hoặc trước và sau khi điều trị hóa chất) [143].
*   **Gen tham chiếu nội chuẩn (Housekeeping Gene)**: Để loại trừ sai lệch do sự khác biệt về lượng tế bào ban đầu hoặc hiệu suất tách chiết ARN giữa các mẫu, người ta bắt buộc phải đo nồng độ của một gen nội chuẩn luôn biểu hiện ổn định trong mọi tế bào (như gen *GAPDH*, *$eta$-actin*, hoặc *18S rRNA*) song song với gen đích [143].
*   **Phương pháp $2^{-\Delta\Delta C_t}$ (Phương pháp so sánh $C_t$)**:
    1.  Tính $\Delta C_t$ cho từng mẫu: $\Delta C_t = C_{t	ext{ (gen đích)}} - C_{t	ext{ (gen nội chuẩn)}}$
    2.  Tính $\Delta\Delta C_t$ so sánh giữa mẫu thử (test) và mẫu đối chứng (control): $\Delta\Delta C_t = \Delta C_{t	ext{ (test)}} - \Delta C_{t	ext{ (control)}}$
    3.  Tỷ lệ thay đổi biểu hiện gen ròng của mẫu thử so với đối chứng là: **$2^{-\Delta\Delta C_t}$**.

---

### 5. Ứng Dụng Lâm Sàng Của Real-Time qPCR
Nhờ tính định lượng nhanh và độ nhạy tối ưu, Real-time qPCR là tiêu chuẩn vàng trong nhiều lĩnh vực y học hiện đại [21]:
*   **Đo tải lượng virus điều trị**: Xác định chính xác số lượng bản sao virus HBV, HCV, hoặc HIV trong huyết thanh của bệnh nhân [141, 142]. Đây là thông số bắt buộc để đánh giá mức độ nhân lên của virus, chỉ định thời điểm khởi động điều trị thuốc kháng virus đặc hiệu và theo dõi, đánh giá đáp ứng điều trị [142].
*   **Định lượng mức độ biểu hiện gen**: Đánh giá sự biểu hiện của các gen sinh ung thư (oncogenes) hoặc các gen kháng thuốc trong tế bào ung thư để tiên lượng bệnh và lựa chọn phác đồ hóa trị cá thể hóa [143, 167].

---

## II. GIẢI TRÌNH TỰ GEN THẾ HỆ THỨ NHẤT (SANGER SEQUENCING)

Giải trình tự ADN (DNA sequencing) là kỹ thuật tối cao xác định chính xác thứ tự sắp xếp của 4 loại nucleotide (A, T, G, C) trên một chuỗi polynucleotide, cung cấp bản đồ vật lý có độ phân giải cao nhất của gen [60, 144].

### 1. Lịch Sử và Đóng Góp Của Frederick Sanger
*   Kỹ thuật giải trình tự gen đầu tiên hoạt động đáng tin cậy được phát minh bởi nhà hóa học người Anh **Frederick Sanger vào năm 1977** (Sanger sequencing), còn được gọi là phương pháp dừng chuỗi bằng dideoxy (chain termination method) [51, 63, 144].
*   Sanger là một trong hai nhà khoa học duy nhất trong lịch sử từng nhận **hai giải Nobel Hóa học độc lập**: Giải Nobel lần thứ nhất năm 1958 cho công trình xác định trình tự chuỗi acid amin của hormone insulin, và giải Nobel lần thứ hai năm 1980 cho việc phát minh ra kỹ thuật giải trình tự ADN này [63, 184].

---

### 2. Nguyên Lý Dừng Chuỗi Bằng Dideoxynucleoside Triphosphate (ddNTP)
*   **Cấu trúc đặc biệt của ddNTP**: Phân tử dideoxynucleoside triphosphate (ddNTP bao gồm ddATP, ddTTP, ddGTP, ddCTP) khác biệt hoàn toàn với deoxynucleoside triphosphate thông thường (dNTP) ở chỗ **chúng bị mất đi nhóm hydroxyl (-OH) tại cả vị trí carbon số 2' và carbon số 3'** của vòng đường ribose [188].

```
           dNTP (Thêm được mạch)                  ddNTP (Bị dừng chuỗi)
             O-Phosphate-Phosphate-Phosphate        O-Phosphate-Phosphate-Phosphate
              │                                      │
            ┌─┴─────┐                              ┌─┴─────┐
            │ Base  │                              │ Base  │
            └───┬───┘                              └───┬───┘
                │                                      │
           HO─-─┴─-─H (Có 3'-OH tự do)             H─-─┴─-─H (Mất 3'-OH tự do) [188]
```

*   **Cơ chế dừng chuỗi sinh học**: Trong quá trình nhân đôi ADN bình thường, enzyme polymerase bắt buộc phải sử dụng nhóm 3'-OH tự do của nucleotide trước đó để tạo liên kết phosphodiester với nhóm 5'-phosphate của nucleotide tiếp theo [91, 188]. Khi hỗn hợp phản ứng chứa một tỷ lệ nhỏ ddNTP, DNA polymerase vẫn nhận diện và lắp ráp ddNTP vào chuỗi đang tổng hợp theo nguyên tắc bổ sung [188]. Tuy nhiên, do ddNTP **hoàn toàn không có nhóm 3'-OH**, không một nucleotide nào tiếp theo có thể gắn vào được nữa [188]. Phản ứng tổng hợp chuỗi polynucleotide tại nhánh đó lập tức bị **dừng lại ngay lập tức** [51, 188].

---

### 3. Kỹ Thuật Giải Trình Tự Sanger Cổ Điển và Tự Động Hóa

#### a. Phương pháp Sanger cổ điển (Điện di gel phóng xạ)
*   **Thiết lập phản ứng**: Phản ứng được thực hiện trong **4 ống nghiệm riêng biệt** (kí hiệu là A, T, G, C) [189, 192]. Mỗi ống nghiệm đều chứa đồng thời [189]:
    1.  Mạch khuôn ADN đơn cần giải trình tự [189].
    2.  Đoạn mồi (primer) ngắn oligonucleotid đã được đánh dấu đồng vị phóng xạ $^{32}P$ hoặc huỳnh quang ở đầu 5' để phát hiện sản phẩm [51, 189].
    3.  Enzyme **DNA Polymerase chịu nhiệt** (như mảnh Klenow hoặc các polymerase tương đương không có hoạt tính exonuclease sửa sai để tránh phân hủy sản phẩm) [50, 187].
    4.  Hỗn hợp dư thừa của cả 4 loại dNTP thông thường (dATP, dTTP, dGTP, dCTP) [189].
*   **Sự bổ sung ddNTP giới hạn**: Mỗi ống nghiệm chỉ nhận thêm một lượng rất nhỏ (tỷ lệ khoảng 1:100) của **duy nhất một loại ddNTP đặc trưng** [188, 189]:
    *   Ống A: Nhận thêm ddATP [189].
    *   Ống T: Nhận thêm ddTTP [190].
    *   Ống G: Nhận thêm ddGTP [189].
    *   Ống C: Nhận thêm ddCTP [189].
*   **Kết quả phản ứng**: Khi enzyme tiến hành kéo dài chuỗi, sự kết hợp ngẫu nhiên của ddNTP ở các vị trí khác nhau tạo ra một tập hợp các đoạn ADN mới có **kích thước dài ngắn khác nhau hoàn toàn**, nhưng tất cả các đoạn trong cùng một ống nghiệm đều có đặc điểm là kết thúc đúng bằng loại base của ddNTP cho vào ống đó (ví dụ, tất cả các đoạn trong ống A đều kết thúc bằng ddA) [189].
*   **Đọc trình tự**: Sản phẩm của 4 ống được chạy điện di cạnh nhau trên các làn song song của gel polyacrylamide (PAGE) có độ phân giải cực cao (cho phép phân tách các đoạn chỉ lệch nhau 1 nucleotide) [51, 190]. Đọc các băng vạch phóng xạ từ đáy gel (đoạn ngắn nhất, gần đầu 5' nhất) đi ngược lên đỉnh gel (đoạn dài nhất, gần đầu 3' nhất) sẽ cho ra chính xác trình tự của mạch ADN mới tổng hợp bổ sung với mạch khuôn [52, 190].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Giải trình tự Sanger
Dưới đây là định vị sơ đồ minh họa nguyên lý và hình ảnh gel điện di của phương pháp giải trình tự Sanger cổ điển:

```
[HÌNH MINH HỌA 3: NGUYÊN LÝ GIẢI TRÌNH TỰ GEN THEO PHƯƠNG PHÁP SANGER]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 20, Figure 20.39 (Trang 618)
- Định danh thay thế: Figure 39–6 trong Harpers Illustrated Biochemistry 32e (Trang 517) / Fig 24.4 trong Medical Biochemistry 5e (Trang 321)
- Chú thích: Sơ đồ chi tiết mô tả 4 ống phản ứng chứa các ddNTP riêng biệt, cơ chế dừng chuỗi ngẫu nhiên tạo các đoạn kích thước khác biệt, hình ảnh bản gel điện di phân tách các đoạn ADN theo kích thước và cách đọc trình tự trực tiếp từ dưới lên trên.
```

---

#### b. Phương pháp tự động hóa bằng điện di mao quản (Capillary Electrophoresis)
*   **Cải tiến đột phá**: Thay vì sử dụng đồng vị phóng xạ nguy hiểm và chạy 4 ống độc lập, công nghệ hiện đại sử dụng **4 loại ddNTP được đánh dấu bằng 4 phân tử huỳnh quang có màu sắc khác nhau** (ví dụ: ddATP phát màu xanh lá, ddTTP màu đỏ, ddGTP màu vàng, ddCTP màu xanh lam) [51, 163, 191].
*   **Vận hành một ống ròng**: Nhờ sự khác biệt màu sắc, toàn bộ phản ứng kéo dài chuỗi được thực hiện tích hợp trong **duy nhất một ống nghiệm** [163].
*   **Điện di mao quản và đọc laser**: Sản phẩm hỗn hợp được bơm vào một **hệ thống mao quản siêu nhỏ** chứa gel để phân tách kích thước [163]. Tại đầu ra của mao quản, một chùm tia laser kích thích liên tục quét qua; các mảnh ADN đi qua đầu dò sẽ phát ra màu sắc đặc trưng đại diện cho nucleotide tận cùng [163, 191]. Thiết bị cảm biến quang học thu nhận tín hiệu và chuyển tín hiệu màu sắc thành các đỉnh sóng (peaks) trên một **biểu đồ sắc phổ huỳnh quang (chromatogram)** hiển thị trực tiếp trên máy vi tính [191].

---

## III. GIẢI TRÌNH TỰ THẾ HỆ MỚI (NGS - NEXT-GENERATION SEQUENCING)

Mặc dù phương pháp Sanger tự động có độ chính xác rất cao (>99.9%), nhược điểm lớn nhất là lưu lượng xử lý (throughput) rất thấp: chỉ đọc được một đoạn ADN đơn lẻ dài không quá 1,000 bp trong một phản ứng [145]. Sự ra đời của **Giải trình tự thế hệ mới (Next-Generation Sequencing - NGS)** hay giải trình tự lưu lượng lớn (High-Throughput Sequencing - HTS) vào đầu những năm 2000 đã tạo nên một cuộc cách mạng y sinh học thực sự [23, 74, 144].

### 1. Cuộc Cách Mạng Công Nghệ Giải Trình Tự Gen
*   **Nguyên lý cốt lõi của NGS**: Thực hiện **hàng triệu đến hàng tỷ phản ứng giải trình tự song song cùng một lúc** trong các giếng phản ứng siêu nhỏ trên một bản đĩa phẳng [74, 165].
*   **Sự sụt giảm chi phí và tăng tốc độ ngoạn mục**: Dự án bản đồ gen người đầu tiên (Human Genome Project) hoàn thành năm 2003 bằng công nghệ Sanger mao quản đã tiêu tốn tới **2.7 tỷ đôla Mỹ** và mất hơn 10 năm ròng rã [165]. Nhờ công nghệ NGS (tiêu biểu là hệ thống Illumina HiSeq X Ten công bố năm 2014), việc giải trình tự toàn bộ hệ gen của một cá nhân hiện nay chỉ mất **chưa đầy 24 giờ với chi phí dưới 1.000 đôla Mỹ** [146, 165]. Điều này đã mở ra kỷ nguyên y học cá thể hóa (personalized medicine) [74].

---

### 2. Nguyên Lý Giải Trình Tự Bằng Sinh Tổng Hợp (Sequencing by Synthesis - SBS) Của Hệ Thống Illumina
Hệ thống Illumina (phát triển bởi công ty Solexa và được Illumina mua lại năm 2007) là công nghệ NGS phổ biến và chiếm thị phần lớn nhất trên thị trường hiện nay [145, 146]. Quy trình vận hành trải qua các bước chặt chẽ sau [24, 146, 196, 197]:

```
    [Mẫu ADN tự do] ──► Phân mảnh ngẫu nhiên ──► Gắn adapters 2 đầu ──► Cố định trên Flow Cell [24, 196]
                                                                                │
    [Tạo cụm]  ◄── Khuếch đại bắc cầu (Bridge Amplification) tạo cụm đơn dòng ◄─┘ [146, 197]
        │
        ▼
    [Giải trình tự SBS]:
    - Cho vào 4 dNTP chứa chất phát huỳnh quang & reversible terminator ở vị trí 3'-OH [197].
    - DNA polymerase gắn 1 base bổ sung ──► Bị chặn không cho kéo dài tiếp [197].
    - Laser quét ──► Đọc màu huỳnh quang xác định base vừa gắn [197].
    - Bơm chất khử TCEP ──► Cắt bỏ huỳnh quang, giải phóng 3'-OH để sẵn sàng cho chu kỳ tiếp [197].
```

#### Bước 1: Chuẩn bị thư viện và cố định mạch (Library Preparation & Immobilization)
*   ADN genome ban đầu được phân cắt ngẫu nhiên bằng sóng siêu âm hoặc enzyme thành các đoạn ngắn dài khoảng vài trăm base [24, 196].
*   Hai đầu của mỗi đoạn ADN được gắn nối cộng hóa trị với các đoạn oligonucleotide nhân tạo gọi là **Adapter (đầu nối)** [24, 196].
*   Hỗn hợp được bơm vào một bản đĩa phẳng đặc biệt gọi là **Flow cell (buồng dòng chảy)** [146]. Trên bề mặt flow cell có gắn sẵn hàng triệu đoạn mồi oligonucleotide có trình tự bổ sung hoàn hảo với các adapter, giúp giữ cố định các đoạn ADN đơn khuôn mẫu tại các vị trí xác định [24, 196, 197].

#### Bước 2: Khuếch đại bắc cầu (Bridge Amplification) tạo cụm đơn dòng
*   Để tín hiệu huỳnh quang đủ mạnh cho máy quét ghi nhận, mỗi phân tử ADN đơn cố định cần được nhân bản tại chỗ thành một cụm chứa hàng nghìn bản sao đồng nhất [197].
*   **Cơ chế bắc cầu**: Đoạn ADN đơn uốn cong đầu tự do lại để adapter ở đầu kia bắt cặp với một mồi tự do kế bên trên bề mặt flow cell, tạo thành một cấu trúc hình cầu cầu nối (bridge) [197]. Enzyme polymerase tiến hành nhân bản tạo mạch đôi [146, 197].
*   Quá trình biến tính, uốn cong và khuếch đại này được lặp lại liên tục nhiều chu kỳ ngay trên đĩa phẳng, tạo ra hàng triệu cụm ADN đơn dòng **(amplification clusters)** biệt lập phân bố dày đặc [23, 146, 197].

#### Bước 3: Giải trình tự bằng sinh tổng hợp (Sequencing by Synthesis - SBS)
*   Hệ thống bơm vào flow cell một hỗn hợp đặc biệt gồm enzyme DNA Polymerase cải tiến và **4 loại deoxynucleotide chứa reversible terminator (chất kết thúc thuận nghịch) ở vị trí 3'-OH và được đánh dấu bằng các phân tử huỳnh quang màu khác nhau** [197].
*   Do có nhóm chặn kết thúc thuận nghịch (như nhóm *3'-O-azidomethyl*) tại vị trí 3', sau khi DNA polymerase gắn được 1 nucleotide bổ sung vào chuỗi đang tổng hợp, **phản ứng kéo dài lập tức bị khóa lại ròng, không thể gắn thêm bất kỳ base nào tiếp theo** [197].
*   Hệ thống tiến hành rửa sạch các nucleotide thừa [24]. Một chùm tia laser quét qua toàn bộ flow cell, kích thích các chất huỳnh quang phát sáng [197]. Kính hiển vi quét đồng tiêu ghi lại màu sắc huỳnh quang đặc trưng phát ra tại từng cụm, xác định chính xác loại base vừa được tích hợp tại chu kỳ đó [197].
*   **Giải phóng đầu chặn (Cleavage)**: Hệ thống bơm vào dung dịch chứa chất khử **TCEP (Tris(2-carboxyethyl)phosphine)** [197]. TCEP cắt bỏ liên kết hóa học giải phóng cả phân tử huỳnh quang lẫn nhóm chặn ở đầu 3', phục hồi lại nhóm **3'-OH tự do** hoạt động cho chuỗi ADN [197].
*   Chu kỳ phản ứng mới lại được lặp lại tuần tự: bơm nucleotide chặn mới $ightarrow$ gắn 1 base $ightarrow$ quét laser đọc màu $ightarrow$ bơm TCEP giải phóng màng [197]. Trình tự ADN đầy đủ của từng cụm được tái cấu trúc dần dần qua từng chu kỳ lắp ráp đơn base [197].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Công nghệ Illumina
Dưới đây là định vị sơ đồ mô tả nguyên lý khuếch đại bắc cầu và thu nhận tín hiệu huỳnh quang của công nghệ NGS Illumina:

```
[HÌNH MINH HỌA 4: NGUYÊN LÝ KHUẾCH ĐẠI BẮC CẦU VÀ GIẢI TRÌNH TỰ BẰNG SINH TỔNG HỢP (SBS)]
- Vị trí: HÓA SINH Y HỌC 2024.md, Chương 16, Hình 16.9 (Trang 427)
- Định danh thay thế: Fig 20.40 trong Essential Biochemistry 5e (Trang 619) / Fig 24.5 trong Medical Biochemistry 5e (Trang 321)
- Chú thích: Sơ đồ mô tả chi tiết: (a) Quá trình uốn cong tạo cầu nối của các đoạn ADN đơn để nhân bản tạo cụm (clusters) trên flow cell; (b) Cơ chế kết hợp nucleotide mang reversible terminator cắt màng và cách thức quét ảnh hiển vi Confocal thu nhận hàng triệu điểm huỳnh quang màu đồng thời.
```

---

### 3. Các Phương Pháp NGS Khác
*   **Pyrosequencing (Giải trình tự giải phóng pyrophosphate)**: Hoạt động dựa trên việc phát hiện phân tử **pyrophosphate ($PP_i$)** được giải phóng ra mỗi khi một nucleotide được polymerase gắn thành công vào chuỗi [26, 145]. Sự giải phóng $PP_i$ kích hoạt một chuỗi phản ứng enzyme liên hoàn (Sulfurylase chuyển $PP_i$ thành ATP, ATP làm cơ chất cho Luciferase oxy hóa Luciferin phát ra một chớp sáng) giúp máy ghi nhận tức thời [26].
*   **Ion Semiconductor (Ion Torrent sequencing)**: Hoạt động dựa trên việc đo lượng ion **proton $H^+$** được giải phóng ra làm giảm nhẹ pH môi trường xung quanh mỗi khi một nucleotide được lắp ráp thành công [26, 145]. Chip bán dẫn nhạy cảm điện tích của máy quét trực tiếp chuyển sự thay đổi hóa học này thành tín hiệu điện đưa về máy tính xử lý [26, 145].

---

### 4. Các Ứng Dụng Lớn Của NGS
Nhờ khả năng parallel hóa khổng lồ, NGS mở ra các hướng đi phân tích toàn diện hệ gen ở cấp độ hệ thống [71]:
*   **Whole Genome Sequencing (WGS - Giải toàn bộ hệ gen)**: Đọc toàn bộ trình tự ADN của một cá thể (bao gồm cả vùng mã hóa exon, vùng intron và vùng điều hòa) [147]. Thích hợp cho việc phát hiện các đột biến mới chưa từng được biết đến, nghiên cứu tiến hóa và lập bản đồ gen quần thể [145, 147].
*   **Whole Exome Sequencing (WES - Giải toàn bộ vùng mã hóa)**: Chỉ tập trung giải trình tự các vùng exon (chiếm khoảng 1%-2% hệ gen nhưng chứa tới 85% các đột biến gây bệnh đã biết), giúp tiết kiệm chi phí và thời gian chẩn đoán các bệnh lý di truyền phức tạp [90, 147].
*   **RNA-Seq (Giải trình tự hệ phiên mã)**: Chuyển đổi toàn bộ ARN thông tin (mARN) của tế bào thành cADN nhờ enzyme phiên mã ngược, sau đó tiến hành giải trình tự NGS trực tiếp để định lượng tuyệt đối mức độ hoạt động phiên mã của toàn bộ hệ gen mà không cần biết trước trình tự [80, 102].
*   **ChIP-Seq (Miễn dịch huỳnh quang kết hợp giải trình tự)**: Dùng để xác định chính xác các vị trí trên hệ gen mà một protein cụ thể (như yếu tố phiên mã, histone biến đổi) bám vào trong tế bào sống [82, 83]. Protein được liên kết chéo với ADN, cắt nhỏ, bắt giữ bằng kháng thể đặc hiệu (ChIP), sau đó giải phóng đoạn ADN bám để chạy giải trình tự NGS trực tiếp [82].

---

## IV. GIẢI TRÌNH TỰ ĐƠN PHÂN TỬ THẾ HỆ THỨ BA (NANOPORE SEQUENCING)

Giải trình tự thế hệ thứ ba (Third-generation sequencing) là bước nhảy vọt công nghệ mới nhất, cho phép **đọc trực tiếp trình tự của một phân tử ADN hoặc ARN đơn lẻ theo thời gian thực mà hoàn toàn không cần trải qua bước khuếch đại PCR** [29, 74]. Công nghệ tiêu biểu nhất hiện nay là hệ thống của hãng **Oxford Nanopore Technologies (ONT)** [74].

### 1. Nguyên Lý Vận Hành Của Oxford Nanopore Technologies (ONT)
Kỹ thuật Nanopore vận hành dựa trên một nguyên lý lý-sinh học cực kỳ độc đáo và tinh tế [29, 30]:

```
      Điện thế dương (+) ngoài màng
                 │
                 ▼  Proton chảy qua pore tạo dòng điện nền ổn định [29]
       ╔═══════╤═══╤═══════╗  ◄─── Màng nhân tạo không thấm điện [29]
       ║       │   │       ║
       ║     ┌─┴───┴─┐     ║  ◄─── Protein Nanopore (Kênh nano dẫn nước) [29]
       ║     │       │     ║
       ║     └─┬───┬─┘     ║  ◄─── Helicase hoạt động như bánh răng kéo dài sợi đơn [30, 31]
       ║       │   │       ║
       ╚═══════╧═══╧═══════╝  Single-stranded DNA di chuyển qua lỗ [29]
                 │
                 ▼  Base chặn lỗ làm dòng điện dao động đặc trưng theo kích thước/hình dáng base [29]
      Điện thế âm (-) trong màng ──► Cảm biến ghi nhận ──► Máy tính giải mã trình tự [29]
```

1.  Một màng lipid nhân tạo không thấm điện được thiết lập để ngăn đôi hai buồng dung dịch đệm [29]. Trên màng có tích hợp hàng nghìn protein màng tạo kênh nano dẫn nước gọi là **nanopore (lỗ nano)** [29].
2.  Một hiệu điện thế được đặt qua màng, tạo ra một dòng điện di chuyển của các ion qua nanopore ổn định (dòng điện nền) [29].
3.  Phân tử ADN mạch kép ban đầu được gắn một đầu nối adapter đặc biệt giúp dẫn đường cho nó tiến sát đến lỗ nano [29]. Tại đây, một enzyme **helicase** bám trên màng hoạt động giống như một bánh răng cơ học (ratcheting device) thực hiện nhiệm vụ tách đôi mạch kép và kéo từng mạch đơn ADN di chuyển qua lỗ với một tốc độ đồng đều, ổn định [30, 31].
4.  Khi mạch đơn ADN đi qua khe hẹp của lỗ nano, do kích thước cấu trúc không gian và điện tích của 4 loại base (A, T, G, C) là hoàn toàn khác nhau, sự hiện diện của mỗi base sẽ **gây cản trở cơ học dòng ion và làm dao động dòng điện nền theo các biên độ đặc trưng riêng biệt** [29].
5.  Hệ thống cảm biến điện học siêu nhạy liên tục ghi nhận các bước dao động dòng điện này theo thời gian và chuyển giao cho các thuật toán trí tuệ nhân tạo (mạng thần kinh nhân tạo) để giải mã trực tiếp thành trình tự nucleotide tương ứng [29].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Công nghệ Nanopore
Dưới đây là định vị sơ đồ mô tả nguyên lý vận hành dòng điện qua lỗ nano của công nghệ giải trình tự thế hệ thứ ba Oxford Nanopore:

```
[HÌNH MINH HỌA 5: NGUYÊN LÝ GIẢI TRÌNH TỰ ĐƠN PHÂN TỬ QUA LỖ NANO (NANOPORE)]
- Vị trí: Essential Biochemistry 5e By Charlotte W. Pratt and Kathleen Cornely.pdf, Chapter 20, Figure 20.42 (Trang 620)
- Chú thích: Sơ đồ mô tả cấu trúc phân tử ADN đơn lẻ được helicase kéo qua protein channel tích hợp trên màng nhân tạo, làm biến đổi dòng điện ion đi qua lỗ và biểu đồ sóng điện thu nhận theo thời gian thực giải mã ra trình tự base tương ứng.
```

---

### 2. Ưu Và Nhược Điểm Của Công Nghệ Nanopore

#### a. Ưu điểm vượt trội
*   **Độ dài lượt đọc cực khủng (Ultra-long reads)**: Khác với NGS thế hệ 2 chỉ đọc được các đoạn ngắn 100-300 bp, Nanopore có thể đọc liên tục một phân tử ADN đơn lẻ có kích thước từ **100 kb lên tới gần 1 Mb** không đứt quãng [74, 86]. Điều này cực kỳ có ý nghĩa khi giải trình tự các vùng lặp lại phức tạp của nhiễm sắc thể (như vùng tâm động, đầu mút telomere) mà NGS thế hệ 2 bất lực [28].
*   **Thiết bị siêu nhỏ gọn và cơ động**: Thiết bị giải trình tự Nanopore nhỏ nhất (như dòng MinION) chỉ có kích thước bằng một chiếc USB, cắm trực tiếp vào máy tính xách tay và có thể mang ra thực địa (rừng rậm, vũ trụ, bệnh viện dã chiến) để chẩn đoán dịch bệnh lập tức [31, 169].
*   **Đọc trực tiếp biến đổi hóa học**: Do không qua sao chép PCR, kỹ thuật này có thể phát hiện trực tiếp các nucleotide bị biến đổi biểu sinh (epigenetics) như *5-methylcytosine* hay đọc trực tiếp sợi đơn mARN tự nhiên mà không cần phiên mã ngược [31, 92].

#### b. Nhược điểm lớn hiện tại
*   **Tỷ lệ lỗi cao**: Do chuyển động nhiệt động học của phân tử đơn qua lỗ rất nhạy cảm, tỷ lệ đọc sai của Nanopore hiện nay vẫn còn khá cao, dao động **khoảng 10%** [31]. Để đạt độ chính xác cao phục vụ chẩn đoán lâm sàng, người ta thường phải kết hợp giải trình tự lai (hybrid sequencing): dùng Nanopore để dựng khung giàn (scaffolds) độ dài lớn và dùng Illumina độ chính xác cao để sửa lỗi chi tiết (polishing) [31, 59].

---

## V. TÀI LIỆU THAM KHẢO CHUẨN AMA

1.  Horton HR, Moran LA, Scrimgeour KG, Perry MD, Rawn JD. *Principles of Biochemistry*. 5th ed. Boston, MA: Pearson Education, Inc.; 2012:614-622.
2.  Murphy M, Srivastava R, Deans K. *Clinical Biochemistry: An Illustrated Colour Text*. 6th ed. London, UK: Elsevier; 2018:145-147, 176-180.
3.  Murray RK, Granner DK, Mayes PA, Rodwell VW. *Harper's Biochemistry*. 26th ed. New York, NY: Lange Medical Books/McGraw-Hill; 2003:444-453.
4.  Kennelly PJ, Botham KM, McGuinness OP, Rodwell VW, Weil PA. *Harpers Illustrated Biochemistry*. 32nd ed. New York, NY: McGraw Hill LLC; 2023:515-531.
5.  Bộ môn Hóa sinh. *Hóa sinh Y học*. Thành phố Hồ Chí Minh, VN: Nhà xuất bản Y học; 2024:418-427.
6.  Baynes JW, Dominiczak MH. *Medical Biochemistry*. 5th ed. London, UK: Elsevier; 2019:320-323.
7.  Pratt CW, Cornely K. *Essential Biochemistry*. 5th ed. Hoboken, NJ: John Wiley & Sons; 2021:614-621.
