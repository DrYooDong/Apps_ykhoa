# BÀI HỌC CHI TIẾT: PHIÊN MÃ & XỬ LÝ SAU PHIÊN MÃ - PHẦN 1

Bài học này hệ thống hóa toàn bộ kiến thức hóa sinh học và sinh học phân tử chuyên sâu về quá trình phiên mã (sự sinh tổng hợp RNA) ở cả sinh vật nhân sơ (Prokaryotes) và sinh vật nhân thực (Eukaryotes). Nội dung bám sát các giáo trình y khoa chính thống, phân tích chi tiết từ đặc điểm cấu trúc phân tử của hệ thống enzyme RNA Polymerase, các yếu tố điều hòa cis-acting (Promoter, Enhancer), đến động học và các giai đoạn xúc tác khởi đầu, kéo dài, và kết thúc phiên mã.

---

## I. ĐẠI CƯƠNG VỀ PHIÊN MÃ & THĂNG BẰNG SINH HỌC CỦA RNA

### 1. Luận Thuyết Trung Tâm (Central Dogma) & Sự Truyền Đạt Thông Tin Di Truyền
*   **Luận thuyết trung tâm**: Được Francis Crick đề xuất lần đầu tiên vào năm 1958 và bổ sung hoàn thiện vào năm 1970 [130-131]. Học thuyết này xác lập con đường truyền đạt thông tin di truyền một chiều cốt lõi của mọi sự sống: **DNA $\rightarrow$ RNA $\rightarrow$ Protein** [130].
    *   **Phiên mã (Transcription)**: Là quá trình chuyển thông tin di truyền được lưu trữ vĩnh viễn trên mạch khuôn DNA sang dạng phân tử trung gian ngắn hạn là RNA thông tin (mRNA) nhờ enzyme RNA Polymerase [130, 134-135].
    *   **Dịch mã (Translation)**: Là quá trình dịch mã bộ ba từ mRNA thành trình tự acid amin cụ thể trên chuỗi polypeptide tại ribosome để cấu thành protein chức năng [130, 135].
*   **Sự bổ sung của dòng thác ngược**: Việc phát hiện ra các virus ung thư có hệ gen RNA (Retrovirus) chứa enzyme **phiên mã ngược (Reverse Transcriptase)** cho phép tổng hợp DNA bổ sung (cADN) từ khuôn mẫu RNA đã làm phong phú thêm luận thuyết trung tâm [131, 135]. Ngoài ra, hoạt động của RNA Replicase (RNA polymerase hướng RNA) ở một số virus cũng cho phép tự sao chép hệ gen RNA của chúng độc lập với DNA [131, 135].

```
                    ┌───────────────── Tự nhân đôi (Replication)
                    ▼
                 ┌─────┐     Phiên mã (Transcription)     ┌─────┐     Dịch mã (Translation)     ┌─────────┐
                 │ DNA │ ───────────────────────────────► │ RNA │ ────────────────────────────► │ Protein │
                 └─────┘ ◄─────────────────────────────── └─────┘                               └─────────┘
                            Phiên mã ngược (RT) [131, 135]
```

### 2. Các Loại RNA Chính và Vai Trò Sinh Học Trong Tế Bào
Khác với phân tử DNA mạch đôi cồng kềnh, RNA tồn tại chủ yếu ở dạng mạch đơn linh hoạt, có thể tự cuộn gập thành các cấu trúc không gian bậc hai và bậc ba phức tạp, mang lại các hoạt tính sinh học đa dạng [18]:
*   **RNA thông tin (mRNA)**: Chiếm tỷ lệ nhỏ về khối lượng nhưng có độ đa dạng cao nhất [138]. mRNA mang thông tin di truyền mã hóa protein từ nhân ra bào tương [130]. Ở sinh vật nhân sơ, mRNA có tính chất **polycistronic** (một bản phiên mã chứa thông tin của nhiều gen liền nhau trong cùng một operon) [100, 132, 138, 171]. Ở sinh vật nhân thực, mRNA là **monocistronic** (mỗi bản phiên mã chỉ mã hóa cho một chuỗi polypeptide đơn lẻ của một gen) [30, 100, 138].
*   **RNA vận chuyển (tRNA)**: Hoạt động như những "người phiên dịch" mang acid amin hoạt hóa đến ribosome [145]. Đầu 3' có trình tự **$5'-CCA-3'$** không kết cặp (được gắn thêm sau phiên mã) để liên kết ester hóa với acid amin, và đầu đối diện mang thùy đối mã **anticodon** tương thích với codon trên mRNA [22, 134]. tRNA chứa tỷ lệ lớn các base hiếm (10-20%) được biến đổi hóa học sau phiên mã [57, 125].
*   **RNA ribosome (rRNA)**: Chiếm khối lượng lớn nhất trong tổng số RNA tế bào (khoảng 80%) [109]. rRNA phối hợp với các protein để cấu thành các tiểu đơn vị ribosome (30S và 50S ở vi khuẩn; 40S và 60S ở sinh vật nhân thực) và tham gia trực tiếp vào hoạt tính xúc tác liên kết peptide (peptidyl transferase) [18].
*   **Các RNA chuyên biệt và RNA điều hòa nhỏ**:
    *   **snRNA (Small Nuclear RNA)**: Khu trú trong nhân, liên kết với protein tạo thành các phức hợp **snRNP (snurps)** cấu thành bộ máy cắt nối **spliceosome** chuyên trách loại bỏ intron [42, 124, 166].
    *   **snoRNA (Small Nucleolar RNA)**: Định vị tại hạch nhân, chịu trách nhiệm dẫn đường cho các phản ứng methyl hóa và sửa đổi base trên pre-rRNA [126].
    *   **miRNA (microRNA) & siRNA (small interfering RNA)**: Các chuỗi RNA cực ngắn (21-25 nt) có khả năng kết cặp bổ sung với mRNA để kích hoạt phân hủy hoặc ức chế dịch mã, đóng vai trò then chốt trong điều hòa biểu hiện gen biểu di truyền sau phiên mã [18, 89].

---

## II. BỘ MÁY PHIÊN MÃ Ở SINH VẬT NHÂN SƠ (PROKARYOTES)

Quá trình phiên mã ở sinh vật nhân sơ, điển hình là vi khuẩn *Escherichia coli*, là một mô hình đơn giản và hiệu quả cao, nơi các gen chức năng liên quan thường được tổ chức thành các đơn vị hoạt động chung gọi là **operon** [132, 172].

### 1. Cấu Trúc RNA Polymerase Lõi (Core) và Holoenzyme
Khác với sinh vật nhân thực, vi khuẩn chỉ sử dụng **duy nhất một loại enzyme RNA Polymerase (RNAP)** để tổng hợp tất cả các loại RNA của tế bào (trừ đoạn mồi ARN ngắn trong tái bản DNA do primase đảm nhiệm) [5, 100].

```
                     [ENZYME LÕI - CORE] (α2ββ'ω)
                     - Ái lực phi đặc hiệu cao với DNA [31, 173]
                     - Dissociate chậm (t1/2 ≈ 60 phút) [173]
                                     │
                                     ├───────► Cộng yếu tố Sigma (σ) [31, 61, 100]
                                     ▼
                    [HOLOENZYME HOÀN CHỈNH] (α2ββ'ωσ)
                     - Ái lực yếu với DNA phi đặc hiệu (Giảm 10^6 lần) [61, 173]
                     - Ái lực cực mạnh với Promoter [61, 173]
                     - Định vị và khởi đầu phiên mã chính xác [31, 61, 100]
```

*   **Enzyme lõi (Core Polymerase)**: Có khối lượng khoảng **400 kDa**, gồm 5 tiểu đơn vị với cấu trúc **$\alpha_2\beta\beta'\omega$** [31, 61, 100].
    *   **Hai tiểu đơn vị $\alpha$ (mã hóa bởi gen `rpoA`)**: Tham gia vào quá trình lắp ráp enzyme và tương tác với các yếu tố điều hòa ngược dòng [101-102].
    *   **Tiểu đơn vị $\beta$ (mã hóa bởi gen `rpoB`)**: Chứa trung tâm hoạt động xúc tác chính của enzyme [31].
    *   **Tiểu đơn vị $\beta'$ (mã hóa bởi gen `rpoC`)**: Phối hợp với $\beta$ tạo khe kẹp DNA mạch khuôn và chứa các nguyên tử Kẽm ($Zn^{2+}$) cần thiết cho cấu trúc ổn định [31, 160].
    *   **Tiểu đơn vị $\omega$ (mã hóa bởi gen `rpoZ`)**: Hỗ trợ quá trình lắp ráp và bảo vệ cấu trúc của phức hợp [61].
    *   *Đặc điểm động học*: Core polymerase có ái lực rất cao với DNA nhưng hoàn toàn phi đặc hiệu [31, 173]. Nó liên kết chặt chẽ vào bất kỳ trình tự DNA nào và phân ly cực kỳ chậm ($t_{1/2} \approx 60 \text{ phút}$), khiến nó không thể tự tìm kiếm và khởi đầu phiên mã chính xác tại promoter [173].
*   **Holoenzyme hoàn chỉnh**: Được hình thành khi core polymerase liên kết với một **yếu tố Sigma ($\sigma$)** [31, 61, 100].
    *   Yếu tố $\sigma$ hoạt động như một chất điều hòa lập thể: sự gắn của $\sigma$ làm **giảm ái lực của enzyme đối với DNA phi đặc hiệu đi $10^6$ lần** (giúp nó trượt tự do tìm kiếm nhanh hơn) và đồng thời **tăng ái lực đối với trình tự promoter lên hàng ngàn lần** [61, 173].
    *   Vi khuẩn chứa nhiều loại yếu tố $\sigma$ khác nhau [31, 61]. Yếu tố chính hoạt động thường xuyên trong điều kiện sinh trưởng bình thường ở *E. coli* là **$\sigma^{70}$** (khối lượng 70 kDa) [103, 173]. Các yếu tố $\sigma$ khác (như $\sigma^{32}$ đáp ứng sốc nhiệt, $\sigma^{54}$ đáp ứng đói nitơ) được biểu hiện để thay đổi tính đặc hiệu nhận diện promoter của RNAP, giúp tế bào chuyển đổi chương trình biểu hiện gen linh hoạt [31, 64].

---

### 2. Cấu Trúc Trình Tự Promoter Vi Khuẩn
Promoter vi khuẩn là một vùng DNA dài khoảng 40 bp nằm ở phía 5' upstream của vị trí khởi đầu phiên mã (vị trí +1) [33, 64]. Phân tích hàng trăm promoter được nhận diện bởi $\sigma^{70}$ đã xác định được các vùng trình tự đồng thuận (consensus sequences) bảo tồn cao [64, 174]:
*   **Vùng -35**: Nằm cách vị trí khởi đầu khoảng 35 nucleotide về phía upstream, có trình tự đồng thuận là **`5'-TTGACA-3'`** (hoặc `5'-TGTTGACA-3'`) [33, 64, 101]. Đây là vị trí nhận biết và liên kết ban đầu của holoenzyme để hình thành **phức hợp đóng (closed complex)** [33, 64].
*   **Vùng -10 (Hộp Pribnow)**: Nằm cách vị trí khởi đầu khoảng 10 nucleotide, có trình tự đồng thuận là **`5'-TATAAT-3'`** [33, 64, 101]. Trình tự này cực kỳ giàu cặp base A=T (chỉ có 2 liên kết hydro) nên có nhiệt độ nóng chảy thấp [33, 64]. Đây là nơi holoenzyme thực hiện tháo xoắn tách mạch để chuyển sang **phức hợp mở (open complex)** [33, 64].
*   **Khoảng cách giữa các hộp**: Khoảng cách lý tưởng giữa vùng -35 và -10 là **17 bp** (dao động từ 15-19 bp) [103]. Sự thay đổi khoảng cách này ảnh hưởng lớn đến độ mạnh yếu của promoter do làm lệch hướng không gian của RNAP khi tiếp cận DNA [102].
*   **Yếu tố UP (Upstream Promoter Element)**: Xuất hiện ở các gen biểu hiện cực mạnh (như cụm gen mã hóa rRNA `rrnA1` và `rrnA2`) nằm ở vị trí từ -40 đến -60 [101-102]. Yếu tố giàu A-T này được nhận diện và liên kết trực tiếp bởi đuôi C-terminal của tiểu đơn vị $\alpha$, giúp gia tăng hiệu suất bám của RNAP lên gấp nhiều lần [101-102].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Promoter Vi khuẩn
Dưới đây là định vị sơ đồ mô hình promoter vi khuẩn điển hình và sự phân cực sợi đơn:

```
[HÌNH MINH HỌA 1: CẤU TRÚC ĐIỂN HÌNH CỦA PROMOTER Ở VI KHUẨN E. COLI]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 21, Figure 21.6 (Trang 640)
- Định danh thay thế: Figure 36–5 trong Harpers Illustrated Biochemistry 32e By Peter J. Kennelly.pdf (Trang 389)
- Chú thích: Sơ đồ mô tả chi tiết vị trí bắt đầu phiên mã (+1) trên sợi mã hóa hướng 5'->3', hộp Pribnow ở vùng -10 (TATAAT) và hộp -35 (TTGACA). Các khoảng Flanking ngược dòng 5' mang dấu âm và xuôi dòng 3' mang dấu dương.
```

---

### 3. Diễn Biến Chi Tiết 3 Giai Đoạn của Phiên Mã Prokaryote
Chu kỳ phiên mã vi khuẩn diễn ra tuần tự qua các chặng: Khởi đầu (Initiation), Kéo dài (Elongation), và Kết thúc (Termination) [29, 168]:

```
      [KHỞI ĐẦU]  Holoenzyme bám tháo xoắn DUE (Phức hợp mở) ──► Tạo dinucleotide tại +1 [29, 103]
                        │
                        ▼ [Promoter clearance - giải phóng yếu tố σ] [29, 58, 100, 176]
      [KÉO DÀI]   Core RNAP di chuyển 17 nm/s (50 nt/s) ──► Tạo siêu xoắn trước/sau [105-106]
                        │
                        ├───────────────────────────────┐
                        ▼ [Cơ chế không phụ thuộc ρ]    ▼ [Cơ chế phụ thuộc ρ] [9, 108]
      [KẾT THÚC]  Kẹp tóc G-C + đuôi Oligo(U)     Gắn vị trí rut ──► Rho helicase
                  làm đứt mạch lai U-dA [9, 107]   phá vỡ mạch lai [108]
```

#### Giai đoạn 1: Khởi đầu phiên mã (Initiation)
*   **Tìm kiếm một chiều (One-dimensional diffusion)**: Để tìm ra vài trăm promoter giữa hệ gen khổng lồ 4.2 Mb, holoenzyme không sử dụng khuếch tán 3 chiều va chạm ngẫu nhiên [175]. Thay vào đó, nó bám phi đặc hiệu và trượt dọc theo sợi DNA (khuếch tán 1 chiều) với tốc độ **$10^3$ bp mỗi giây**, quét qua khoảng 2000 bp trong mỗi lần bám [63, 175]. Cơ chế này giúp tốc độ tìm thấy promoter nhanh gấp 100 lần so với lý thuyết khuếch tán thông thường [175].
*   **Tạo phức hợp đóng và mở**: Khi nhận diện đúng promoter, RNAP bám vào vùng -35 và -10 tạo thành **phức hợp đóng (closed promoter complex)** [33, 64]. Sau đó, enzyme tự động chuyển đổi cấu hình, bẻ gãy các liên kết hydro và tháo xoắn một đoạn DNA dài khoảng **15 - 17 bp** (từ giữa vùng -10 đến quá vị trí khởi đầu +1), tạo nên **bong bóng phiên mã (phức hợp mở - open complex)** [103, 178-179].
*   **Tổng hợp dinucleotide**: RNAP định vị nucleotide đầu tiên (gần như luôn luôn là purine **ATP hoặc GTP**) bổ sung với base tại vị trí +1 của mạch đơn khuôn [29, 102-103]. Enzyme không cần đoạn mồi (primer) mà trực tiếp gắn gốc phosphate vô cơ của nucleotide thứ hai vào nhóm 3'-OH của nucleotide đầu tiên tạo liên kết phosphodiester [100, 103]. Nhóm 5'-triphosphate ($5'-ppp$) của nucleotide đầu tiên được giữ nguyên vẹn trong suốt quá trình phiên mã [103].
*   **Thoát khỏi promoter (Promoter clearance)**: Trong khoảng 10 nucleotide đầu tiên, RNAP thường xuyên rơi vào trạng thái "phiên mã thất bại" (abortive initiation), giải phóng các đoạn oligonucleotide ngắn [104, 176]. Khi chuỗi RNA vượt qua độ dài **9 - 10 nucleotide**, enzyme trải qua một biến đổi cấu hình không gian lớn: nó tháo bỏ hoàn toàn yếu tố $\sigma$ giải phóng ra môi trường, kẹp chặt mạch DNA khuôn và chính thức bước vào giai đoạn kéo dài [29, 58, 100, 176].

#### Giai đoạn 2: Kéo dài mạch RNA (Elongation)
*   **Hoạt động của core enzyme**: Core polymerase di chuyển dọc theo mạch khuôn DNA theo chiều 3' $ightarrow$ 5', liên tục lắp ráp các ribonucleoside triphosphate (ATP, UTP, GTP, CTP) để kéo dài mạch RNA theo **chiều 5' $ightarrow$ 3'** [57, 100, 160].
*   **Động học và tốc độ**: Bong bóng phiên mã di chuyển với tốc độ ổn định khoảng **50 nucleotide mỗi giây** (17 nm/s) [105]. Trong lòng bong bóng, một đoạn lai kép tạm thời **RNA-DNA dài khoảng 8 bp** được duy trì để ổn định mạch mới tổng hợp trước khi nó bị đẩy ra ngoài qua khe thoát [104, 107].
*   **Ứng phó với siêu xoắn**: Do DNA có cấu trúc xoắn kép, sự tiến tới của RNAP mà không thể xoay tự do (bị cản trở bởi các protein bám màng) sẽ dồn ép các vòng xoắn phía trước tạo nên **siêu xoắn dương** (overwinding) và để lại **siêu xoắn âm** (underwinding) phía sau [106]. Tế bào giải quyết căng thẳng cơ học này nhờ hoạt động của **DNA Topoisomerase I** (ở phía sau giải tỏa siêu xoắn âm) và **Gyruse** (phía trước giải tỏa siêu xoắn dương) [106].

#### Giai đoạn 3: Kết thúc phiên mã (Termination)
Vi khuẩn thực hiện chấm dứt phiên mã tại các trình tự đặc hiệu (terminator) nhờ một trong hai cơ chế lớn [9, 106, 165]:
*   **Cơ chế không phụ thuộc protein Rho (Rho-independent / Intrinsic termination)**:
    *   *Đặc điểm trình tự*: Chiếm khoảng một nửa số gen của *E. coli* [9]. Trình tự kết thúc chứa một vùng giàu G-C đối xứng lặp lại đối bản (palindromic sequence), theo sau ngay lập tức bởi một chuỗi gồm **4 đến 10 gốc Adenine (A)** trên mạch khuôn DNA [9, 106].
    *   *Cơ chế phân tử*: Khi RNAP phiên mã qua vùng giàu G-C này, phân tử RNA mới sinh lập tức tự kết cặp bổ sung tạo nên một cấu trúc **kẹp tóc (hairpin/stem-loop) cực kỳ bền vững** [9, 107]. Sự hình thành kẹp tóc này gây ra một lực cản cơ học làm RNAP tạm dừng di chuyển [9, 107]. Tại thời điểm dừng này, đoạn lai kép RNA-DNA trong bong bóng phiên mã chỉ còn lại chuỗi **U=A bổ sung** (mạch mới là oligo(U) bám vào oligo(dA) của mạch khuôn) [9, 107]. Do cặp base U=A chỉ có 2 liên kết hydro và có ái lực tĩnh điện cực kỳ yếu, lực kéo từ cấu trúc kẹp tóc dễ dàng bẻ gãy liên kết lai này, giải phóng hoàn toàn sợi RNA tự do và làm sụp đổ bong bóng phiên mã [9, 107].
*   **Cơ chế phụ thuộc protein Rho (Rho-dependent termination)**:
    *   *Đặc điểm trình tự*: Các gen này thiếu chuỗi oligo(U) ở đầu 3' và không thể tự tạo kẹp tóc đủ mạnh [9]. Chúng chứa một trình tự giàu cytosine (C), nghèo guanine (G) dài khoảng 80-100 nt gọi là vị trí **rut (rho utilization site)** [108].
    *   *Cơ chế phân tử*: **Protein Rho** là một hexamer đồng nhất có hoạt tính helicase tháo xoắn phụ thuộc ATP [9, 108]. Rho nhận biết và bám chặt vào vị trí *rut* trên sợi RNA đang ló ra khỏi RNAP [108]. Nó sử dụng năng lượng thủy phân ATP để di chuyển dọc theo sợi RNA theo chiều 5' $ightarrow$ 3' nhằm đuổi theo RNAP [108]. Khi RNAP di chuyển đến trình tự kết thúc và bị tạm dừng (do gặp các cấu trúc bậc hai yếu của RNA), Rho đuổi kịp bong bóng phiên mã [108]. Tại đây, hoạt tính helicase của Rho tiến hành tháo xoắn tách đôi mạch lai RNA-DNA, giải phóng bản phiên mã và tống RNAP khỏi mạch khuôn [9, 108].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Kết thúc Phiên mã
Dưới đây là định vị sơ đồ mô tả hai cơ chế kết thúc phiên mã ở vi khuẩn:

```
[HÌNH MINH HỌA 2: HAI CƠ CHẾ KẾT THÚC PHIÊN MÃ RHO-INDEPENDENT VÀ RHO-DEPENDENT]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 21, Figure 21.8 (Trang 644)
- Định danh thay thế: Figure 21.5 trong Medical Biochemistry 5e By John Baynes.pdf (Trang 274)
- Chú thích: Sơ đồ mô tả cơ chế (a) Cấu trúc kẹp tóc hairpin giàu G-C co kéo làm đứt liên kết lai U-A lỏng lẻo; và (b) Sự bám của protein hexamer Rho vào vị trí rut trượt tiêu tốn ATP để đuổi bắt và tháo xoắn mạch lai RNA-DNA tại chạc ba.
```

---

## III. BỘ MÁY PHIÊN MÃ Ở SINH VẬT NHÂN THỰC (EUKARYOTES)

Quá trình phiên mã ở sinh vật nhân thực phức tạp và tinh vi hơn rất nhiều do hệ gen có kích thước khổng lồ, DNA được bao bọc chặt chẽ trong các nucleosome của chromatin, và sự phân phòng chức năng nghiêm ngặt đặt ra yêu cầu phải xuất RNA ra bào tương để dịch mã [14, 70, 152].

### 1. Sự Phân Hóa Chức Năng của 3 Loại RNA Polymerase Trong Nhân
Trái ngược với vi khuẩn, tế bào nhân thực chứa **3 loại enzyme RNA Polymerase hạt nhân riêng biệt** (được ký hiệu là I, II, III), mỗi loại chuyên trách phiên mã cho một nhóm gen đích chuyên biệt [30, 48, 70, 81, 109]:

| Loại Enzyme | Vị trí định vị trong nhân | Độ nhạy cảm với $lpha$-Amanitin (độc tố nấm) | Các sản phẩm phiên mã chính |
| :--- | :--- | :--- | :--- |
| **RNA Polymerase I (Pol I)** | Hạch nhân (Nucleolus) [109] | **Hoàn toàn đề kháng** (Insensitive) [30] | Các pre-rRNA lớn (tiền chất cắt ra thành **18S, 5.8S, và 28S rRNA** cấu thành ribosome) [30, 109]. |
| **RNA Polymerase II (Pol II)** | Nhân tương (Nucleoplasm) [109] | **Cực kỳ nhạy cảm** (Ức chế ở nồng độ nanomolar $10^{-9}	ext{ M}$) [30] | **Tất cả các tiền chất mRNA (pre-mRNA)** mã hóa protein, các miRNA, siRNA, lncRNA, và một số snRNA [41, 81, 109]. |
| **RNA Polymerase III (Pol III)** | Nhân tương (Nucleoplasm) [109] | **Nhạy cảm trung bình** (Ức chế ở nồng độ micromolar $10^{-6}	ext{ M}$) [30] | **Tất cả các tRNA**, rRNA nhỏ **5S**, snRNA U6, và một số RNA nhỏ chuyên biệt khác [30, 81, 109-110]. |

*   *Lưu ý*: Ty thể và lục lạp tự sở hữu loại RNA polymerase riêng biệt (tương tự như vi khuẩn) mã hóa bởi gen của chính chúng để phục vụ chuyển hóa nội bộ [30, 87].
*   *Độc tính của $lpha$-Amanitin*: Độc tố từ cây nấm tán độc *Amanita phalloides* liên kết cộng hóa trị chặt chẽ vào cấu trúc "bản lề" của RNA Polymerase II, ngăn chặn sự dịch chuyển cơ học của enzyme dọc theo mạch khuôn DNA [30]. Sự ngưng trệ phiên mã mRNA cấp tính ở tế bào gan dẫn đến suy gan tối cấp và tử vong nhanh chóng [30].

---

### 2. Cấu Trúc Trình Tự Core Promoter của RNA Polymerase II
Để khởi động phiên mã chính xác cho các gen mã hóa protein, hệ thống enzyme RNA Polymerase II nhận biết và bám vào một vùng gọi là **core promoter (promoter lõi)** dài khoảng 60-80 bp bao quanh vị trí khởi đầu [61, 73]. Khác với vi khuẩn, core promoter nhân thực có độ linh hoạt rất cao, được cấu thành từ sự tổ chức đa dạng của nhiều yếu tố tác động *cis* (cis-acting elements) [3, 111, 181]:

```
      −37           −32  −31            −26                 −2        +4       +28          +32
   ───[  BRE  ]──────[    TATA box    ]──────────────────────[   Inr   ]────────[   DPE   ]───► DNA
       GGACCGCC       TATA(A/T)A(A/T)(A/G)                    TC(A+1)(G/T)TT    (A/G)G(A/T)CGTG
```

*   **Hộp TATA (TATA box)**: Nằm ở vị trí khoảng **-25 đến -30** upstream, có trình tự đồng thuận là **`5'-TATAAA-3'`** (hoặc `5'-TATAAAG-3'`) [3, 65, 113, 181]. Đây là yếu tố promoter kinh điển và quan trọng nhất, được nhận diện bởi tiểu đơn vị TBP của phức hợp TFIID [4, 38, 72]. Tuy nhiên, khảo sát diện rộng cho thấy chỉ có khoảng **30% gen của động vật có vú chứa hộp TATA** [35].
*   **Yếu tố BRE (TFIIB Recognition Element)**: Nằm ngay sát phía 5' upstream của hộp TATA (vị trí ~-32 đến -37), có trình tự đồng thuận là `5'-GGACCGCC-3'` [181]. Đây là nơi liên kết trực tiếp của yếu tố phiên mã TFIIB [4, 181].
*   **Trình tự Initiator (Inr)**: Nằm đè trực tiếp lên vị trí khởi đầu phiên mã (từ -3 đến +5), chứa base A tại vị trí +1 với trình tự đồng thuận `5'-TCA(+1)(G/T)T(T/C)-3'` [35, 66, 181]. Khoảng 60% promoter nhân thực chứa yếu tố này [35].
*   **Yếu tố DPE (Downstream Promoter Element)**: Khu trú ở phía downstream của vị trí khởi đầu (vị trí **+28 đến +32**), có trình tự đồng thuận là `5'-(A/G)G(A/T)CGTG-3'` [35, 66, 181]. DPE luôn luôn xuất hiện đồng hành cùng Inr trên các promoter thiếu hộp TATA [3, 35, 66].
*   **Vùng tăng cường (Enhancer) và Kìm hãm (Silencer)**: Là các trình tự DNA điều hòa nằm rất xa vị trí khởi đầu (có thể cách xa hàng ngàn đến hàng vạn base pairs về phía upstream hoặc downstream) [110, 116, 171]. Enhancer là nơi bám của các protein hoạt hóa phiên mã (activators), chúng uốn cong mạch DNA để tiếp cận gián tiếp và kích thích mạnh mẽ sự lắp ráp phức hợp phiên mã tại promoter lõi [76, 113, 116, 171].

---

### 3. Sự Lắp Ráp Phức Hợp Khởi Đầu Phiên Mã Basal (Pre-Initiation Complex - PIC)
Do RNA Polymerase II nhân thực tinh sạch hoàn toàn không có khả năng tự nhận diện promoter trong ống nghiệm (khác với holoenzyme vi khuẩn), sự khởi đầu phiên mã bắt buộc phải thông qua sự hỗ trợ của **6 yếu tố phiên mã chung (General Transcription Factors - GTFs)** bao gồm: **TFIIA, TFIIB, TFIID, TFIIE, TFIIF, và TFIIH** [4, 37, 71].

Quá trình lắp ráp PIC diễn ra theo mô hình stepwise tuần tự nghiêm ngặt tại promoter chứa hộp TATA [39, 72-73, 113]:

```
    1. TFIID bám TATA box qua TBP subunit ──► Uốn cong DNA 80 độ, mở rãnh nhỏ [113, 181-182]
                     │
                     ▼ [Tuyển dụng TFIIA và TFIIB] [39, 73]
    2. TFIIB liên kết BRE & TFIID ──► Định vị và xác lập khoảng cách chính xác đến +1 [4, 39, 73, 181]
                     │
                     ▼ [Tether Pol II-TFIIF complex] [39, 73, 183]
    3. TFIIF dẫn đường Pol II bám chính xác ──► Ngăn chặn bám phi đặc hiệu [39, 114, 183]
                     │
                     ▼ [Tuyển dụng TFIIE và TFIIH] [39, 73, 114]
    4. TFIIH mở xoắn (helicase) & phosphoryl hóa CTD (kinase) ──► Chuyển sang phức hợp mở [114, 115, 184]
```

1.  **Sự bám của TFIID**: Đây là bước khơi mào quyết định [36, 67, 72]. Phức hợp khổng lồ TFIID (khối lượng ~1000 kDa) gồm tiểu đơn vị **TBP (TATA-binding protein)** liên kết với **14 yếu tố TAF (TBP-associated factors)** [38, 72, 77]. TBP bám vào rãnh nhỏ (minor groove) của hộp TATA và bẻ cong phân tử DNA một góc nhọn **$80^{\circ}$**, tạo điều kiện cho sự lắp ráp các protein tiếp theo [182].
2.  **Sự gắn kết của TFIIA và TFIIB**: 
    *   **TFIIA** đến gắn vào mặt bên của phức hợp TBP-DNA, giúp ổn định hóa liên kết và ngăn chặn các protein kìm hãm (repressors) đẩy TFIID ra ngoài [39, 73].
    *   **TFIIB** liên kết trực tiếp với TBP và vùng BRE của DNA, thiết lập một phức hợp ternary bền vững giúp xác định chính xác khoảng cách không gian và hướng di chuyển đến vị trí +1 [39, 73, 181].
3.  **Tập hợp Pol II và TFIIF**: **TFIIF** (gồm 2 tiểu đơn vị RAP30 và RAP74, có cấu trúc tương đồng với yếu tố $\sigma$ vi khuẩn) liên kết chặt chẽ với RNA Polymerase II trong dung dịch và dẫn đường đưa Pol II bám chính xác vào phức hợp TFIIB-TBP [39, 73, 183]. TFIIF ngăn chặn Pol II bám vào các vị trí DNA phi đặc hiệu ngoài promoter [39, 114, 183].
4.  **Hoàn thiện phức hợp đóng nhờ TFIIE và TFIIH**: **TFIIE** đến gắn kết, tạo điểm neo giữ để tuyển dụng **TFIIH** – phức hợp lớn nhất trong các GTFs có hoạt tính đa chức năng [39, 114]:
    *   *Hoạt tính Helicase*: TFIIH sử dụng năng lượng từ sự thủy phân ATP để mở xoắn mạch kép DNA tại vị trí khởi đầu, chuyển phức hợp đóng thành **phức hợp mở (open complex)** sẵn sàng cho phiên mã [114, 184].
    *   *Hoạt tính Kinase*: TFIIH tiến hành phosphoryl hóa đuôi carboxyl của Pol II để kích hoạt giải phóng promoter [115, 184].

---

### Chú thích Chuyên môn Lập bản đồ Minh họa Phức hợp PIC
Dưới đây là định vị sơ đồ mô tả cấu trúc không gian của phức hợp khởi đầu PIC nhân thực:

```
[HÌNH MINH HỌA 3: SỰ LẮP RÁP PHỨC HỢP KHỞI ĐẦU PHIÊN MÃ (PIC) Ở NHÂN THỰC]
- Vị trí: Principles of Biochemistry 5e By Robert Horton.pdf, Chapter 21, Figure 21.11 (Trang 646)
- Định danh thay thế: Figure 36–9 trong Harpers Illustrated Biochemistry 32e By Peter J. Kennelly.pdf (Trang 391)
- Chú thích: Sơ đồ mô tả chi tiết sự lắp ráp stepwise của TFIID, TFIIA, TFIIB, Pol II-TFIIF, TFIIE, và TFIIH bao phủ một đoạn DNA dài khoảng 60 bp quanh vị trí +1.
```

---

### 4. Đuôi Carboxyl-Terminal Domain (CTD) và Sự Thoát Khỏi Promoter
*   **Cấu trúc đuôi CTD**: Tiểu đơn vị lớn nhất của RNA Polymerase II sở hữu một cấu trúc đuôi kéo dài độc đáo ở đầu tận C gọi là **Carboxy-Terminal Domain (CTD)** [6, 181]. Ở động vật có vú, CTD gồm **52 đoạn trình tự heptapeptide lặp lại** bảo tồn cao: **`Tyr1-Ser2-Pro3-Thr4-Ser5-Pro6-Ser7`** [6].
*   ** phosphorylation tại Serine 5**: Ở trạng thái nghỉ khởi đầu, đuôi CTD ở dạng không phosphoryl hóa để có thể liên kết chặt chẽ với phức hợp **Mediator** (bộ co-regulator khổng lồ cầu nối với enhancer) [7-8, 75]. Khi PIC đã hoàn thiện, tiểu đơn vị kinase của TFIIH tiến hành phosphoryl hóa mạnh mẽ các gốc **Serine ở vị trí số 5 (Ser 5)** của các đoạn lặp CTD [6, 115]. Sự tích lũy điện tích âm lớn làm Pol II phân ly hoàn toàn khỏi Mediator và các GTFs khởi đầu (được để lại phía sau tại promoter để tái tuyển dụng polymerase tiếp theo), giúp Pol II chính thức thoát khỏi promoter (**promoter clearance**) để tiến vào giai đoạn kéo dài [7-8, 115].

```
       [CTD không phosphoryl hóa]  ──► Gắn Mediator ──► Lắp ráp PIC [7-8]
                                          │
                                          ▼ [TFIIH kinase phosphoryl hóa Ser 5] [6, 115]
       [CTD-P tại Ser 5]          ──► Phân ly Mediator ──► Thoát promoter (Clearance) [7-8, 115]
                                  ──► Tuyển dụng các enzyme gắn mũ 5' (Capping) [10, 119]
```

---

### 5. Hiện Tượng Dừng Tạm Thời (Pausing) ở Giai Đoạn Kéo Dài Sớm
Mặc dù đã thoát khỏi promoter, RNA Polymerase II ở động vật có vú thường bị dừng lại (pause) sau khi tổng hợp được khoảng **30 đến 50 nucleotide** [7]. 
*   **Cơ chế kìm hãm**: Sự dừng này được thiết lập bởi sự bám của các protein ức chế kéo dài là **NELF (negative elongation factor)** và **DSIF** [7]. NELF bám vào phễu nhận nucleotide của Pol II, gây lệch hướng mạch lai RNA-DNA khiến enzyme không thể lắp thêm ribonucleotide mới [7].
*   **Ý nghĩa sinh học**: Hiện tượng pausing hoạt động như một chốt kiểm soát chất lượng (checkpoint) tối quan trọng [10]. Nó giữ Pol II dừng lại để chờ hệ thống enzyme gắn mũ 5' (capping enzymes) – vốn được tuyển dụng trực tiếp tới bám vào đuôi CTD-P (Ser 5) – hoàn thành việc gắn mũ bảo vệ đầu 5' của sợi RNA mới nhô ra khỏi enzyme [10, 119]. Điều này đảm bảo bản phiên mã không bị phân hủy bởi exonuclease ngay khi vừa sinh ra [10].
*   **Giải phóng chốt chặn nhờ P-TEFb**: Để mở khóa cho Pol II tiếp tục kéo dài, phức hợp kinase **P-TEFb** (Positive Transcription Elongation Factor b, chứa CDK9) tiến hành phosphoryl hóa protein kìm hãm NELF (làm nó phân ly khỏi Pol II) và đồng thời phosphoryl hóa các gốc **Serine ở vị trí số 2 (Ser 2)** của đuôi CTD [7, 115]. Lúc này, đuôi CTD chuyển sang trạng thái song song **CTD-P (Ser 2 & Ser 5)**, giúp Pol II đạt tốc độ kéo dài tối đa và bắt đầu tuyển dụng các yếu tố cắt nối intron (splicing factors) cho giai đoạn tiếp theo [6, 115].

---

## IV. TÀI LIỆU THAM KHẢO CHUẨN AMA

1.  Horton HR, Moran LA, Scrimgeour KG, Perry MD, Rawn JD. *Principles of Biochemistry*. 5th ed. Boston, MA: Pearson Education, Inc.; 2012:551-555, 638-650, 688.
2.  Murray RK, Granner DK, Mayes PA, Rodwell VW. *Harper's Biochemistry*. 26th ed. New York, NY: Lange Medical Books/McGraw-Hill; 2003:289-302, 312-323, 335-339.
3.  Kennelly PJ, Botham KM, McGuinness OP, Rodwell VW, Weil PA. *Harpers Illustrated Biochemistry*. 32nd ed. New York, NY: McGraw Hill LLC; 2023:386-394, 430, 521-527.
4.  Bộ môn Hóa sinh. *Hóa sinh Y học*. Thành phố Hồ Chí Minh, VN: Nhà xuất bản Y học; 2024:97-104, 380-387, 390-403, 438-442.
5.  Baynes JW, Dominiczak MH. *Medical Biochemistry*. 5th ed. London, UK: Elsevier; 2019:262-265, 274-276.
6.  Pratt CW, Cornely K. *Essential Biochemistry*. 5th ed. Hoboken, NJ: John Wiley & Sons; 2021:354-365, 582-592.
