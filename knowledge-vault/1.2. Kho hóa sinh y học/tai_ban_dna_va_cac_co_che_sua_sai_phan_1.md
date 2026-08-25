# BÀI HỌC CHI TIẾT: TÁI BẢN DNA & CÁC CƠ CHẾ SỬA SAI - PHẦN 1

Bài học này hệ thống hóa toàn bộ kiến thức hóa sinh học chuyên sâu về cơ chế tái bản (nhân đôi) DNA ở cả sinh vật nhân sơ (Prokaryotes) và sinh vật nhân thực (Eukaryotes). Nội dung bám sát các tài liệu giáo trình y khoa chính thống, tập trung phân tích các đặc điểm cơ bản của chạc ba nhân đôi, hệ thống đa enzyme của replisome, sự khác biệt giữa các DNA polymerase, và các phản ứng xử lý Okazaki kết nối hoàn thiện sợi DNA mới.

---

## I. TỔNG QUAN VỀ SỰ TÁI BẢN DNA (DNA REPLICATION)

Quá trình tái bản DNA là cơ chế truyền đạt thông tin di truyền chính xác tuyệt đối từ thế hệ tế bào này sang thế hệ tế bào khác [67, 108, 195]. Toàn bộ quá trình được kiểm soát và vận hành bởi một hệ thống đa enzyme và protein phối hợp không gian cực kỳ chặt chẽ [4, 67, 108].

### 1. Đặc Điểm Bán Bảo Tồn (Semiconservative Replication)
*   **Nguyên lý**: Theo mô hình của Watson và Crick đề xuất năm 1953, chuỗi xoắn kép DNA mẹ tự tháo xoắn và tách thành hai sợi đơn [2, 199]. Mỗi sợi đơn hoạt động như một mạch khuôn (template) để hướng dẫn tổng hợp mạch bổ sung mới dựa trên nguyên tắc bổ sung (A liên kết với T bằng 2 liên kết hydro, G liên kết với C bằng 3 liên kết hydro) [2, 77, 118, 199].
*   **Hệ quả**: Sau khi kết thúc quá trình tái bản, thu được hai phân tử DNA con hoàn toàn giống hệt phân tử mẹ [2]. Trong mỗi phân tử DNA con, có một mạch đơn cũ thuộc phân tử DNA mẹ ban đầu và một mạch đơn mới được tổng hợp hoàn chỉnh [2, 199, 222].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Tái bản Bán bảo tồn
Dưới đây là định vị sơ đồ minh họa nguyên lý tái bản bán bảo tồn:

```
[HÌNH MINH HỌA 1: CƠ CHẾ TÁI BẢN BÁN BẢO TỒN CỦA DNA]
- Vị trí: Essential Biochemistry 5e By Charlotte W. Pratt and Kathleen Cornely.pdf, Chapter 3, Figure 3.10 (Trang 69)
- Định danh thay thế: Figure 20.1 trong Principles of Biochemistry 5e By Robert Horton.pdf (Trang 602)
- Chú thích: Sơ đồ mô tả chi tiết quá trình tháo xoắn của phân tử DNA mẹ (màu xanh). Mỗi sợi khuôn được ghép cặp bổ sung với một sợi mới được tổng hợp (màu tím/xám nhạt), chứng minh sau mỗi chu kỳ tái bản, phân tử con luôn giữ lại 50% mạch cũ.
```

---

### 2. Đặc Điểm Tái Bản Hai Hướng (Bidirectional Replication)
*   Quá trình tái bản DNA không bắt đầu ngẫu nhiên mà khởi phát tại các vị trí đặc hiệu gọi là **vị trí khởi đầu tái bản (Origin of replication / ori)** [4, 109, 137, 200].
*   Tại điểm khởi đầu, phân tử DNA kép tách mạch tạo ra cấu trúc **"bong bóng" tái bản (hay mắt tái bản)** [146, 218].
*   Quá trình kéo dài mạch mới diễn ra đồng thời theo hai hướng ngược nhau đi ra từ điểm origin, tạo nên hai **chạc ba tái bản (replication fork)** di chuyển ngược chiều nhau [4, 146, 220]. 
*   *Tốc độ di chuyển*: Ở vi khuẩn *E. coli*, chạc ba tái bản di chuyển với tốc độ cực nhanh khoảng **1000 base pairs (bp) mỗi giây** [221], cho phép sao chép toàn bộ bộ gen vòng dài 4.6 Mb chỉ trong vòng 38-40 phút [4, 221, 280]. Ở sinh vật nhân thực, tốc độ chạc ba di chuyển chậm hơn khoảng 20 lần (~50 bp/giây) do sự cản trước vật lý của các nucleosome [17, 116, 160, 253].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Bong bóng Tái bản
Dưới đây là định vị sơ đồ mô tả cấu trúc bong bóng tái bản hai hướng:

```
[HÌNH MINH HỌA 2: SƠ ĐỒ SỰ SAO CHÉP HAI HƯỚNG TRÊN BỘ GEN VÒNG CỦA E. COLI]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 20, Figure 20.2 (Trang 602)
- Định danh thay thế: Figure 35–17 trong Harpers Illustrated Biochemistry 32e By Peter J. Kennelly.pdf (Trang 526)
- Chú thích: Sơ đồ minh họa quá trình tái bản hai hướng từ một điểm khởi đầu (Origin). Hai replisome nằm tại hai chạc ba đối diện di chuyển xa nhau dần cho đến khi gặp nhau tại vùng kết thúc (Termination site) để tách đôi thành 2 phân tử DNA con hoàn chỉnh.
```

---

### 3. Đặc Điểm Tái Bản Nửa Gián Đoạn (Semidiscontinuous Replication)
*   **Giới hạn hướng xúc tác**: Enzyme DNA polymerase xúc tác phản ứng trùng hợp nucleotide bắt buộc phải có một nhóm 3'-OH tự do của chuỗi đang kéo dài để thực hiện cuộc tấn công ái nhân vào nhóm $\alpha$-phosphate của dNTP đi vào [13, 118, 145, 149]. Do đó, **sự tổng hợp mạch mới chỉ có thể kéo dài theo chiều duy nhất từ 5' $\rightarrow$ 3'** [11, 78, 114, 145].
*   **Sự bất đối xứng của chạc ba**: Do hai mạch khuôn DNA mẹ chạy đối song (antiparallel) ngược chiều nhau (một mạch hướng 3' $\rightarrow$ 5', mạch kia hướng 5' $\rightarrow$ 3'), việc chạc ba tái bản liên tục mở xoắn theo một hướng cố định đặt ra thách thức nhiệt động học [11, 78, 114, 146]. Để giải quyết vấn đề này, tế bào thực hiện cơ chế tái bản nửa gián đoạn [80, 119]:
    *   **Sợi dẫn (Leading strand)**: Sợi khuôn hướng 3' $\rightarrow$ 5' (so với chiều mở xoắn chạc ba) cho phép DNA polymerase tổng hợp mạch mới liên tục, cùng chiều với chiều di chuyển của chạc ba tái bản [11, 73, 114, 146]. Sợi này chỉ cần một đoạn mồi (primer) duy nhất ở điểm khởi đầu [12, 114, 148].
    *   **Sợi sau / Sợi muộn (Lagging strand)**: Sợi khuôn hướng 5' $\rightarrow$ 3' (so với chiều mở xoắn chạc ba) bắt buộc phải tổng hợp mạch mới một cách đứt quãng, ngược chiều với chiều di chuyển của chạc ba tái bản [11, 73, 114, 146]. Mạch mới được tổng hợp thành từng phân đoạn ngắn gọi là **đoạn Okazaki** [11, 73, 114, 146]. Mỗi đoạn Okazaki dài khoảng 1000-2000 bp ở prokaryotes [146] và 100-200 bp ở eukaryotes [11, 146]. Sự khởi đầu của mỗi đoạn Okazaki bắt buộc phải có một đoạn mồi ARN riêng biệt [12, 114, 147]. Sau đó, các đoạn Okazaki được nối lại với nhau bằng liên kết cộng hóa trị nhờ enzyme DNA ligase [77, 118, 146].

---

## II. GIAI ĐOẠN KHỞI ĐẦU TÁI BẢN DNA (INITIATION)

Giai đoạn khởi đầu quyết định tần suất và thời điểm nhân đôi của hệ gen, được kiểm soát cực kỳ nghiêm ngặt [67, 108, 156].

### 1. Khởi Đầu Ở Tế Bào Nhân Sơ (Prokaryotes - E. coli)
*   **Vùng Origin (`oriC`)**: Điểm khởi đầu tái bản ở *E. coli* dài 245 bp [154, 239], chứa các trình tự bảo tồn cao [154]:
    *   **Vùng R**: Gồm 5 đoạn trình tự dài 9 bp lặp lại (R1 - R5), đóng vai trò làm vị trí gắn cho protein khởi đầu **DnaA** [154].
    *   **Vùng I**: Vùng chỉ liên kết với DnaA khi protein này ở dạng hoạt động gắn ATP [154, 155].
    *   **Vùng DUE (DNA Unwinding Element)**: Vùng giàu cặp base A=T lân cận, liên kết yếu dễ bị tháo xoắn do lực đẩy nhiệt [112, 154].
*   **Chuỗi phản ứng hoạt hóa phân tử**:
    1.  **Gắn DnaA**: Protein **DnaA** (một AAA+ ATPase) gắn ATP nhận biết và liên kết chặt chẽ vào các vị trí R và I trên `oriC` [155]. Nhiều phân tử DnaA-ATP tụ hợp lại tạo thành một cấu trúc oligomer lớn bao quanh DNA, gây ra một lực xoắn dương mạnh làm kéo căng mạch [155]. Sức căng cơ học này làm vùng DUE giàu A=T lân cận bị biến tính mở xoắn, bộc lộ hai sợi đơn tự do [155].
    2.  **Tải Helicase**: Protein **DnaC** (cũng là một AAA+ ATPase) đóng vai trò là chất tải kẹp, liên kết và đưa enzyme **DnaB helicase** (cấu trúc hexamer dạng vòng) gắn trực tiếp lên hai sợi đơn DNA tại vùng DUE vừa mở [69, 155, 200]. Sau khi tải thành công, DnaC phân ly giải phóng DnaB hoạt động [155].
    3.  **Mở xoắn tạo chạc ba**: DnaB helicase di chuyển dọc theo sợi đơn theo chiều từ 5' $\rightarrow$ 3', sử dụng năng lượng từ sự thủy phân ATP để bẻ gãy các liên kết hydro, tiếp tục mở xoắn chuỗi kép [114, 155]. Sự di chuyển ngược chiều nhau của hai phân tử DnaB helicase tạo nên hai chạc ba tái bản hoạt động [155].
    4.  **Bảo vệ mạch đơn**: Protein **SSB** (Single-Strand Binding protein) lập tức bám chặt vào các mạch đơn exposed, ngăn không cho chúng tái kết hợp (reanneal) thành mạch đôi và bảo vệ chúng khỏi sự phân hủy của nuclease [8, 111, 155].
    5.  **Giải tỏa siêu xoắn**: Hoạt động mở xoắn mạnh mẽ của helicase tạo ra hiện tượng siêu xoắn dương (overwinding) ở phía trước chạc ba tái bản [8, 117]. Enzyme **DNA Gyrase** (Topoisomerase II của vi khuẩn) hoạt động phía trước chạc ba, cắt mạch đôi tạm thời để giải tỏa sức căng xoắn và tạo siêu xoắn âm, cho phép chạc ba tiếp tục tiến tới [8, 153, 155, 231].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Khởi đầu ở E. coli
Dưới đây là định vị sơ đồ chi tiết các bước hoạt hóa và tháo xoắn tại điểm khởi đầu oriC ở vi khuẩn:

```
[HÌNH MINH HỌA 3: QUÁ TRÌNH TỰ LẮP RÁP PHỨC HỢP KHỞI ĐẦU TẠI VÙNG ORIC CỦA E. COLI]
- Vị trí: HÓA SINH Y HỌC 2024.md, Chapter 15, Hình 15.15 (Trang 385)
- Định danh thay thế: Figure 36–13 trong Harper's Biochemistry 26th ed.pdf (Trang 312)
- Chú thích: Sơ đồ mô tả chi tiết sự bám của protein DnaA-ATP làm biến tính vùng DUE giàu A=T, sự trợ giúp của DnaC đưa DnaB helicase vòng vào bám mạch đơn, và vai trò của các phân tử SSB bọc bảo vệ mạch khuôn đơn.
```

---

### 2. Khởi Đầu Ở Tế Bào Nhân Thực (Eukaryotes)
*   **Vị trí khởi đầu**: Eukaryotes có kích thước hệ gen cực lớn và được chia thành nhiều nhiễm sắc thể mạch thẳng [159, 217]. Để nhân bản kịp thời trong pha S của chu kỳ tế bào, mỗi nhiễm sắc thể chứa hàng trăm đến hàng ngàn điểm khởi đầu cách nhau từ 30-300 kb [160, 196, 222].
    *   Ở nấm men, vùng khởi đầu được xác định rõ là **ARS (Autonomously Replicating Sequence)** dài ~150 bp, chứa trình tự ORE (Origin Replication Element) gắn protein khởi đầu và một DUE giàu A=T lân cận [112, 159].
    *   Ở động vật có xương sống bậc cao, vị trí khởi đầu không có trình tự đồng thuận nghiêm ngặt mà được quy định bởi cấu trúc chromatin [5, 81].
*   **Phức hợp tiền sao chép (Pre-Replication Complex - pre-RC) và sự Cấp phép (Licensing)**:
    Để đảm bảo toàn bộ hệ gen chỉ tái bản đúng **một lần duy nhất** trong mỗi chu kỳ tế bào, quá trình khởi đầu được chia làm hai giai đoạn tách biệt [196, 202, 252]:
    1.  **Giai đoạn cấp phép (Licensing - Diễn ra ở cuối pha M và pha G1)**:
        *   Phức hợp nhận biết điểm khởi đầu **ORC** (Origin Recognition Complex - gồm 6 protein, tương đồng với DnaA) bám cố định lên điểm khởi đầu [112, 160].
        *   ORC kích thích hai protein hỗ trợ là **Cdc6** và **Cdt1** đến gắn kết [160, 252].
        *   Hệ thống này cùng nhau tiến hành tải phức hợp helicase của sinh vật nhân thực là **MCM2-7** (Minichromosome Maintenance - một dị lục lạp heterohexamer) bám vào DNA ở dạng bất hoạt [160, 252]. Sự hình thành phức hợp **pre-RC** hoàn tất quá trình "cấp phép" cho origin sẵn sàng hoạt động [252].
    2.  **Giai đoạn khởi phát (Firing - Diễn ra ở pha S)**:
        *   Khi tế bào bước vào pha S, hoạt tính của các enzyme **S-phase protein kinase (SPK)** và CDK tăng vọt kích hoạt phosphoryl hóa các tiểu đơn vị trong pre-RC [252].
        *   Sự phosphoryl hóa này làm thay đổi cấu hình không gian, kích hoạt MCM2-7 tháo xoắn hoạt động [252]. Đồng thời, nó ngăn chặn tuyệt đối việc nạp thêm bất kỳ MCM2-7 mới nào lên các origin đã hoạt động (bằng cách phân hủy hoặc tống Cdc6/Cdt1 ra khỏi nhân), triệt tiêu nguy cơ tái bản lặp lại vô nghĩa [252].
        *   Chạc ba tái bản chính thức khởi động [252]. Protein **RPA** (Replication Protein A - cấu trúc lớn gồm 4 domain gắn DNA) hoạt động như một SSB của eukaryotes để bảo vệ mạch đơn [8, 161].

---

## III. GIAI ĐOẠN KÉO DÀI MẠCH VÀ HỆ THỐNG ENZYME (ELONGATION)

Giai đoạn kéo dài mạch mới là một hoạt động phối hợp đồng bộ diễn ra tại chạc ba tái bản, được thực hiện bởi một cỗ máy siêu phân tử khổng lồ gọi là **Replisome** [4, 153, 220, 291].

```
                             [SỢI KHUÔN MẸ]
                                    │
                         ┌──────────┴──────────┐
                         ▼                     ▼
                  [Leading strand]      [Lagging strand]
                     (Sợi dẫn)             (Sợi sau)
                         │                     │
                         ▼                     ▼
                    Sự bám mồi            Tổng hợp nhiều mồi
                   (Chỉ 1 lần)            liên tục (mỗi đoạn)
                         │                     │
                         ▼                     ▼
                  Kéo dài liên tục       Tạo Okazaki fragments
                  theo chạc ba           đứt quãng ngược chạc ba
                         │                     │
                         └──────────┬──────────┘
                                    ▼
                          Hệ thống Replisome
                     (Pol III / Pol δ, ε + Clamps)
```

### 1. Phản Ứng Trùng Hợp dNTP và Vai Trò của Ion Kim Loại
*   DNA polymerase xúc tác phản ứng phosphoryl chuyển nhóm:
    $$\text{(dNMP)}_n + \text{dNTP} \xrightarrow{\text{DNA Polymerase}} \text{(dNMP)}_{n+1} + \text{PP}_i \quad (\Delta G^{\circ\prime} \approx 0)$$ [149]
*   **Cơ chế xúc tác**: Nhóm 3'-OH tự do ở đầu tận của chuỗi DNA đang kéo dài thực hiện một cuộc tấn công ái nhân (nucleophilic attack) vào nguyên tử phốt pho $\alpha$ của dNTP đi vào [13, 118, 149]. Phản ứng giải phóng một phân tử pyrophosphat vô cơ ($\text{PP}_i$) [118, 149].
*   **Động lực nhiệt động học**: Mặc dù biến thiên năng lượng tự do chuẩn $\Delta G^{\circ\prime}$ của phản ứng trùng hợp xấp xỉ bằng 0 [149], phản ứng thực tế tế bào luôn diễn ra một chiều theo hướng tổng hợp DNA nhờ sự hỗ trợ của hai yếu tố [149]:
    1.  Sản phẩm phụ $\text{PP}_i$ ngay lập tức bị thủy phân triệt để thành 2 gốc phosphate vô cơ ($P_i$) nhờ enzyme pyrophosphatase, giải phóng một lượng năng lượng tự do âm lớn kéo phản ứng đi tới [144, 149].
    2.  Sự ổn định cấu trúc của mạch đôi DNA mới tạo thành nhờ các liên kết hydro bổ sung và lực xếp chồng base kỵ nước kề bên [149].
*   **Vai trò của 2 Ion Magiê ($\text{Mg}^{2+}$)** tại trung tâm hoạt động:
    Cơ chế xúc tác của DNA polymerase bắt buộc phải có sự phối trí của hai ion $\text{Mg}^{2+}$ (hoặc $\text{Mn}^{2+}$) liên kết với các gốc aspartate bảo tồn của enzyme [13, 57, 151]:
    *   *Ion $\text{Mg}^{2+}$ thứ nhất*: Hoạt hóa nhóm 3'-OH của mồi bằng cách làm giảm ái lực của nguyên tử oxy với proton, làm tăng tính ái nhân của nguyên tử oxy này để sẵn sàng tấn công $\alpha$-phosphate [57, 151].
    *   *Ion $\text{Mg}^{2+}$ thứ hai*: Liên kết và định hướng nhóm triphosphat của dNTP đi vào, đồng thời trung hòa điện tích âm lớn phát sinh trên trạng thái chuyển tiếp phosphor pentacovalent, tạo điều kiện thuận lợi cho sự phân ly và giải phóng nhóm rời đi $\text{PP}_i$ [57, 151].

---

### 2. Sự Tạo Đoạn Mồi Nhờ Primosome
Do DNA polymerase hoàn toàn không có khả năng khởi đầu tổng hợp chuỗi polynucleotide mới *de novo* khi không có nhóm 3'-OH sẵn có [9, 114, 227], quá trình khởi đầu tổng hợp bắt buộc phải nhờ đến enzyme primase [10, 114].
*   **Primosome**: Là một phức hợp di động gồm **DnaB helicase** và **DnaG primase** (ở vi khuẩn) bám dọc trên sợi khuôn của sợi sau [10, 114, 157, 290].
*   **DnaG Primase**: Là một RNA polymerase đặc biệt, bám vào helicase và cứ định kỳ khoảng một giây lại tiến hành tổng hợp một đoạn mồi ARN ngắn bổ sung dài khoảng 10-29 nucleotide (chứa đầu tự do 3'-OH) hướng vào chạc ba [10, 114, 227, 246]. 
*   *Sự khác biệt*: Sợi dẫn chỉ cần duy nhất một đoạn mồi đơn ở vị trí khởi đầu [12, 114, 148]. Sợi sau yêu cầu hàng ngàn đoạn mồi ARN xuất hiện liên tiếp ở đầu mỗi phân đoạn Okazaki mới [12, 114, 148].

---

### 3. So Sánh Hệ Thống DNA Polymerase Ở Tế Bào Nhân Sơ (*E. coli*)
Vi khuẩn *E. coli* chứa ít nhất 5 loại DNA polymerase tham gia các vai trò sinh học khác nhau, được mã hóa bởi các gen riêng biệt [15, 151]:

| Đặc điểm so sánh | DNA Polymerase I (Pol I) | DNA Polymerase II (Pol II) | DNA Polymerase III (Pol III) | DNA Polymerase IV (Pol IV) | DNA Polymerase V (Pol V) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Gen cấu trúc** | `polA` [152] | `polB` [152] | `polC` / `dnaE` [152] | `dinB` | `umuCD` |
| **Số loại tiểu đơn vị** | 1 (monomer) [148, 152] | 7 [152] | > 10 (holoenzyme) [152] | 1 | 3 |
| **Khối lượng (kDa)** | 103 [152] | 88 [152] | 791.5 [152] | 40 | 110 |
| **Hoạt tính Pol $5' \rightarrow 3'$** | Có [149] | Có | Có [152] | Có | Có |
| **Exonuclease $3' \rightarrow 5'$** | Có (Đọc sửa) [149, 152] | Có (Đọc sửa) [152] | Có (Đọc sửa) [152] | Không | Không [162] |
| **Exonuclease $5' \rightarrow 3'$** | **Có (Độc nhất)** [149, 152] | Không [152] | Không [152] | Không | Không |
| **Tốc độ polyme hóa** | Chậm (16-20 nt/s) [152] | Trung bình (40 nt/s) [152] | **Cực nhanh (250-1000 nt/s)** [16, 152] | Rất chậm | Rất chậm [162] |
| **Mức độ trượt (Processivity)** | Rất thấp (3-20 nt) [152] | Cao (1500 nt) [152] | **Cực cao (250,000 - 500,000 nt)** [152] | Thấp | Rất thấp (6-8 nt) [162] |
| **Vai trò sinh học chính** | Loại bỏ mồi ARN, lấp đầy gap Okazaki, sửa chữa [150, 151]. | Sửa chữa tái cấu trúc DNA [151]. | **Enzyme nhân đôi chính** của tế bào [16, 151]. | Sửa chữa đột biến, SOS, dễ mắc sai lầm [151]. | Sửa chữa SOS vượt tổn thương (dễ mắc lỗi) [151, 162]. |

*   **Cơ chế đọc sửa (Proofreading)**: Nhờ có hoạt tính **3' $\rightarrow$ 5' exonuclease** nằm ở một domain xúc tác riêng biệt [149, 152]. Khi polymerase gắn nhầm một base không khớp (mismatch), hoạt động kéo dài mạch bị ngưng trệ do cấu trúc xoắn kép bị biến dạng lệch [18, 150]. Lúc này, đầu 3' chứa nucleotit lỗi được chuyển sang khoang hoạt động của domain exonuclease để thực hiện thủy phân cắt bỏ nucleotit sai này bằng một phân tử nước [18, 150]. Sau đó, chuỗi DNA được chuyển lại trung tâm polymerase để tiếp tục gắn nucleotide đúng [150]. Cơ chế này làm giảm tỷ lệ sai sót từ $10^{-5}$ xuống còn $10^{-7}$ [18, 225, 278].

---

### 4. So Sánh Hệ Thống DNA Polymerase Ở Tế Bào Nhân Thực (Eukaryotes)
Tế bào nhân thực chứa ít nhất 14 loại DNA polymerase mạch thẳng, trong đó có 5 loại chính hoạt động thường xuyên trong nhân và ti thể [15, 248]:

| Enzyme | Hoạt tính Exonuclease $3' \rightarrow 5'$ | Vai trò sinh học cụ thể và đặc điểm cấu trúc |
| :--- | :--- | :--- |
| **DNA Polymerase $\alpha$ (Pol $\alpha$)** | Không [20, 250] | **Khởi động tổng hợp Okazaki**: Là một phức hợp multimer chứa cả hoạt tính RNA primase và DNA polymerase [160, 249]. Nó tiến hành tổng hợp mồi ARN ngắn dài 7-12 nt, sau đó kéo dài thêm 10-25 nucleotide DNA trước khi nhường chỗ cho Pol $\delta$ và Pol $\epsilon$ [17]. Có độ trượt thấp và ái lực yếu [17, 57]. |
| **DNA Polymerase $\beta$ (Pol $\beta$)** | Không [250] | **Sửa chữa DNA**: Chuyên trách sửa chữa DNA hạt nhân, đặc biệt là tham gia trực tiếp vào con đường sửa chữa cắt base (Base Excision Repair - BER) [15, 31, 248, 250]. |
| **DNA Polymerase $\gamma$ (Pol $\gamma$)** | Có [250] | **Tái bản DNA ti thể**: Chịu trách nhiệm hoàn toàn cho quá trình nhân đôi và sửa chữa hệ gen ty thể (mtDNA) độc lập [76, 120, 248, 250]. |
| **DNA Polymerase $\delta$ (Pol $\delta$)** | Có [248, 250] | **Tổng hợp sợi sau (Lagging strand)**: Enzyme nhân đôi chính chuyên trách kéo dài các đoạn Okazaki trên sợi sau [17, 160]. Có độ trượt trung bình-cao, hoạt động phụ thuộc tuyệt đối vào sliding clamp PCNA [16, 57, 160]. |
| **DNA Polymerase $\epsilon$ (Pol $\epsilon$)** | Có [249, 250] | **Tổng hợp sợi dẫn (Leading strand)**: Enzyme nhân đôi chính chuyên trách tổng hợp liên tục sợi dẫn [17, 160]. Có độ trượt cực cao nhờ có cấu trúc protein loop tích hợp đóng vai trò như một mỏ neo kẹp tự nhiên mà không cần PCNA [17]. Ngoài ra còn tham gia lấp đầy gap trong sửa chữa [249, 250]. |

---

### 5. Cơ Chế Tăng Tính Trượt Nhờ Kẹp Vòng và Clamp Loader
Nếu chỉ có một mình lõi xúc tác của DNA polymerase hoạt động, enzyme sẽ nhanh chóng bị rơi (dissociate) khỏi mạch khuôn sau khi gắn vài chục nucleotide, làm giảm mạnh tốc độ tái bản [152, 237]. Để đạt độ trượt cực cao (processivity) lên tới hàng trăm ngàn nucleotide liên tục, tế bào sử dụng hệ thống kẹp vòng bảo vệ [115, 152]:
*   **Kẹp trượt (Sliding clamp)**:
    *   *Ở tế bào nhân sơ*: Là **tiểu đơn vị $\beta$** của holoenzyme Pol III, tồn tại dưới dạng một dimer đối xứng hình chiếc nhẫn bao quanh mạch kép DNA [16, 75, 152, 224].
    *   *Ở tế bào nhân thực*: Là **PCNA** (Proliferating Cell Nuclear Antigen), cấu trúc trimer đối xứng có chức năng hoàn toàn tương đồng [16, 160, 161].
    *   Kẹp trượt bám chặt vào lõi xúc tác của polymerase, giữ chặt phân tử này trượt dọc theo DNA khuôn mà không bị rơi ra [115, 152, 224, 237].
*   **Bộ tải kẹp (Clamp loader)**:
    *   *Ở tế bào nhân sơ*: Là **phức hợp $\gamma$** (hoặc phức hợp $\tau$) của Pol III [152, 224].
    *   *Ở tế bào nhân thực*: Là **RFC** (Replication Factor C) [161].
    *   Hệ thống tải kẹp sử dụng năng lượng từ sự **thủy phân ATP** để kẹp mở vòng kẹp $\beta$/PCNA, lắp ráp bọc quanh vị trí bắt đầu mồi-khuôn, sau đó đóng vòng giải phóng ADP [15, 157, 224, 237]. Đối với sợi sau, clamp loader phải hoạt động liên tục mỗi giây một lần để nạp kẹp $\beta$ mới cho từng đoạn Okazaki khởi động [15].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Replisome và Chạc ba
Dưới đây là định vị sơ đồ mô tả cấu trúc đồng bộ của replisome kéo dài đồng thời hai mạch:

```
[HÌNH MINH HỌA 4: MÔ HÌNH HOẠT ĐỘNG ĐỒNG BỘ CỦA REPLISOME TẠI CHẠC BA NHÂN ĐÔI]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 20, Figure 20.15 (Trang 612-613)
- Định danh thay thế: Fig 20.6 trong Essential Biochemistry 5e By Charlotte W. Pratt (Trang 586) / Fig 20.6 trong Medical Biochemistry 5e By John Baynes.pdf (Trang 264)
- Chú thích: Sơ đồ mô tả chi tiết cơ chế uốn cong (looping out) của mạch khuôn sợi sau qua replisome. Sự phối hợp của hai lõi Pol III (một kéo sợi dẫn liên tục, một kéo sợi sau ngắt quãng) cùng trượt theo một hướng cơ học của helicase DnaB, được phủ bảo vệ bởi các tetramer SSB.
```

---

## IV. GIAI ĐOẠN HOÀN THIỆN SỢI SAU VÀ HÀN GẮN (OKAZAKI PROCESSING & JOINING)

Mạch DNA mới tổng hợp không thể hoàn chỉnh nếu vẫn còn chứa các đoạn mồi ARN kẹp giữa các đoạn Okazaki [148, 230]. Tế bào tiến hành dọn dẹp mồi và gắn các khe hở thông qua một chuỗi phản ứng phối hợp [146, 228].

```
     [Okazaki trước (ARN mồi - DNA)]             [Okazaki sau (DNA)]
                    │                                     │
                    ▼ [Sự nhận diện điểm đứt của Pol I]   ▼
                    Nick ─────────────────────────────────┤
                    │                                     │
                    ├───────► Hoạt tính 5'->3' exonuclease cắt ARN mồi
                    ├───────► Hoạt tính 5'->3' polymerase lấp đầy dNTP
                    ▼ (Dịch chuyển điểm đứt - Nick translation)
     [Okazaki trước (DNA)] ───► Nick (Chỉ còn khe hở liên kết) ◄─── [Okazaki sau (DNA)]
                    │                                     │
                    ▼ [Xúc tác của DNA Ligase (NAD+ / ATP)]
     ──────────────────────► Liên kết Phosphodiester kín hoàn toàn ◄──────────────────────
```

### 1. Sự Loại Bỏ Mồi và Dịch Chuyển Điểm Đứt (Nick Translation)
Khi đoạn Okazaki đang tổng hợp kéo dài đến mức chạm vào đầu 5' của đoạn mồi ARN của Okazaki đã tổng hợp phía trước, DNA polymerase III sẽ phóng thích giải phóng mạch khuôn và kẹp $\beta$ [15, 237, 238]. Vị trí khe hở còn lại (gọi là **điểm đứt - nick**) được tiếp quản bởi enzyme **DNA Polymerase I** [150, 230, 233]:
*   **Hoạt tính độc nhất**: Pol I là enzyme duy nhất sở hữu hoạt tính **5' $\rightarrow$ 3' exonuclease** nằm ở đầu tận N-terminal của nó [149, 150, 229].
*   **Cơ chế Nick translation**: 
    1.  Pol I bám trực tiếp vào điểm đứt (nick) giữa đoạn Okazaki mới và đoạn mồi cũ [150, 230].
    2.  Nó sử dụng hoạt tính 5' $\rightarrow$ 3' exonuclease để cắt thủy phân từng ribonucleotid của đoạn mồi ARN từ đầu 5' và tống chúng ra ngoài dưới dạng mononucleotid [150, 230].
    3.  Đồng thời, trung tâm polymerase của Pol I lập tức lấp đầy các deoxynucleotid tương ứng vào đầu 3'-OH tự do của đoạn Okazaki mới để lấp đầy khoảng trống [150, 230].
    4.  Quá trình cắt mồi và lấp đầy DNA diễn ra song song nhịp nhàng, làm dịch chuyển vị trí điểm đứt (nick) dọc theo mạch DNA theo hướng 5' $\rightarrow$ 3' [150, 230, 232].
    5.  Sau khi đi qua khoảng 10-12 nucleotide, Pol I hoàn thành việc dọn sạch mồi ARN và tự động phân ly [230, 233]. Lúc này, mồi ARN đã biến mất hoàn toàn, để lại khe hở chỉ chứa một điểm đứt phosphodiester đơn độc giữa hai đoạn DNA [230].
*   Ở sinh vật nhân thực, vai trò cắt mồi ARN được thực hiện bởi sự kết hợp của enzyme **RNase H** (thủy phân chọn lọc mARN lai trong chuỗi lai mARN-DNA) [21, 206] kết hợp hoạt động kéo dài lấp đầy của Pol $\delta$/Pol $\epsilon$ [249, 250].

---

### 2. Sự Hàn Gắn Điểm Đứt Nhờ DNA Ligase
Phản ứng đóng kín khe hở phosphodiester cuối cùng giữa đầu 3'-OH của một đoạn DNA với đầu 5'-phosphate của đoạn DNA kế cận được xúc tác bởi enzyme **DNA Ligase** [77, 118, 158, 233].

*   **Cơ chế phản ứng hóa học qua 3 bước**:
    1.  *Adenyl hóa enzyme*: DNA Ligase hoạt động tấn công ái nhân vào phân tử đồng yếu tố để nhận gốc AMP gắn trực tiếp vào nhóm $\epsilon$-amino của một gốc Lysine hoạt động trong trung tâm phản ứng, tạo ra phức hợp trung gian **Enzyme-AMP** hoạt hóa [47, 122].
    2.  *Kích hoạt gốc Phosphate ở Nick*: Gốc AMP này sau đó được chuyển giao sang cho nhóm 5'-phosphate tích điện của điểm đứt DNA, tạo ra liên kết anhydride hỗn hợp giàu năng lượng **pyrophosphate-like (DNA-5'-O-P-O-P-Adenosine)** hoạt hóa [47, 122].
    3.  *Tấn công đóng vòng*: Nhóm 3'-OH tự do của đầu đoạn DNA bên cạnh thực hiện cuộc tấn công ái nhân vào nguyên tử phốt pho hoạt hóa ở vị trí 5', bẻ gãy liên kết anhydride để giải phóng AMP tự do và hình thành liên kết **phosphodiester 3',5'** đóng kín hoàn toàn điểm đứt [47, 122].

*   **Sự khác biệt lớn về nguồn năng lượng đồng yếu tố**:
    Phương thức nạp năng lượng để adenyl hóa enzyme thể hiện sự phân hóa tiến hóa rõ rệt [47, 122, 158]:
    *   **Ở Vi khuẩn (Bacteria)**: DNA ligase bắt buộc phải sử dụng nguồn năng lượng hóa học từ **$\text{NAD}^+$** (Nicotinamide Adenine Dinucleotide) làm cofactor [122, 158, 232]. Phản ứng giải phóng sản phẩm phụ là Nicotinamide Mononucleotide (NMN) và AMP [122, 232]:
        $$\text{DNA (nicked)} + \text{NAD}^+ \xrightarrow{\text{Ligase vi khuẩn}} \text{DNA (sealed)} + \text{NMN} + \text{AMP}$$ [232]
    *   **Ở Sinh vật nhân thực (Eukaryotes) và Virus**: DNA ligase sử dụng trực tiếp năng lượng từ sự thủy phân **ATP** làm cofactor [122, 158]. Phản ứng giải phóng pyrophosphat vô cơ ($\text{PP}_i$) và AMP [122, 158]:
        $$\text{DNA (nicked)} + \text{ATP} \xrightarrow{\text{Ligase nhân thực}} \text{DNA (sealed)} + \text{PP}_i + \text{AMP}$$ [122]

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Cơ chế Ligase
Dưới đây là định vị sơ đồ chi tiết cơ chế hóa học 3 bước đóng vòng của DNA Ligase:

```
[HÌNH MINH HỌA 5: CƠ CHẾ PHẢN ỨNG HÓA HỌC BA BƯỚC CỦA ENZYME DNA LIGASE]
- Vị trí: Harpers Illustrated Biochemistry 32e By Peter J. Kennelly.pdf, Chapter 35, Figure 35–18 (Trang 527)
- Định danh thay thế: Figure 20.13 trong Principles of Biochemistry 5e (Trang 611)
- Chú thích: Sơ đồ hóa học mô tả chi tiết dòng di chuyển của điện tử từ gốc Lysine hoạt động của enzyme tấn công ATP/NAD+ để nhận AMP, bước chuyển AMP sang nhóm 5'-phosphate của nick để hoạt hóa, và cuộc tấn công cuối cùng của 3'-OH tạo liên kết phosphodiester giải phóng AMP.
```

---

## V. TÀI LIỆU THAM KHẢO CHUẨN AMA

1.  Horton HR, Moran LA, Scrimgeour KG, Perry MD, Rawn JD. *Principles of Biochemistry*. 5th ed. Boston, MA: Pearson Education, Inc.; 2012:602-615, 631-632.
2.  Murray RK, Granner DK, Mayes PA, Rodwell VW. *Harper's Biochemistry*. 26th ed. New York, NY: Lange Medical Books/McGraw-Hill; 2003:312-323, 335-339.
3.  Kennelly PJ, Botham KM, McGuinness OP, Rodwell VW, Weil PA. *Harpers Illustrated Biochemistry*. 32nd ed. New York, NY: McGraw Hill LLC; 2023:521-527, 531-532.
4.  Bộ môn Hóa sinh. *Hóa sinh Y học*. Thành phố Hồ Chí Minh, VN: Nhà xuất bản Y học; 2024:380-387.
5.  Baynes JW, Dominiczak MH. *Medical Biochemistry*. 5th ed. London, UK: Elsevier; 2019:262-265.
6.  Pratt CW, Cornely K. *Essential Biochemistry*. 5th ed. Hoboken, NJ: John Wiley & Sons; 2021:582-592, 631.
