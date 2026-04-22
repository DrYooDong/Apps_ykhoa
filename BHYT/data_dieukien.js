  const dataDieuKien = [
        {
            "loai": "Xét nghiệm",
            "ten": "Định lượng Pro-calcitonin [Máu]",
            "ma_icd": "A41, R57.2, R65.1, P36",
            "dieu_kien": "Chẩn đoán và theo dõi tình trạng nhiễm trùng nặng: Điểm SOFA ≥ 2; hoặc nghi ngờ ổ nhiễm trùng kèm 2/3 tiêu chuẩn (Nhịp thở ≥ 22, HA tâm thu ≤ 100, Glasgow < 15). Ở trẻ em: Chẩn đoán/theo dõi nhiễm trùng huyết; tiên lượng suy đa tạng.",
            "ghi_chu": "Thanh toán tối đa 01 lần/mỗi 24 giờ cho sốc nhiễm trùng; 01 lần/mỗi 48 giờ cho nhiễm trùng nặng. Không thanh toán đối với các trường hợp đã có bằng chứng: hết dấu hiệu chỉ định và Procalcitonin ≤ 02 lần giá trị tham chiếu.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "Xét nghiệm",
            "ten": "Định lượng CRP/CRP hs [Máu]",
            "ma_icd": "A41, R65.1, P36, I20-I25, L53.0, M30-M36",
            "dieu_kien": "Nghi ngờ ổ nhiễm trùng có ≥ 2/4 tiêu chuẩn (Nhiệt độ <36°C hoặc >38°C; Nhịp tim >90; Nhịp thở >22 hoặc PaCO2 <32mmHg; Bạch cầu >12G/L hoặc <4G/L hoặc >10% bạch cầu non). Viêm da nhiễm độc, bệnh tự miễn, nhồi máu cơ tim, nhiễm trùng sơ sinh.",
            "ghi_chu": "Hồ sơ bệnh án phải thể hiện rõ các dấu hiệu sinh tồn đáp ứng tiêu chuẩn. Chỉ định thường quy sẽ bị xuất toán.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "Xét nghiệm",
            "ten": "Định lượng HbA1c [Máu]",
            "ma_icd": "E10-E14, O24, O24.4",
            "dieu_kien": "Xác định phác đồ điều trị cho bệnh nhân Đái tháo đường nếu chưa thực hiện xét nghiệm trong vòng 90 ± 3 ngày. Đánh giá kết quả điều trị từ lần thứ 2 trở đi tối thiểu sau mỗi 90 ± 3 ngày. Đái tháo đường thai kỳ có điều trị bằng insulin: mỗi 30 ngày 01 lần.",
            "ghi_chu": "Xuất toán nếu thực hiện sai khoảng cách thời gian quy định.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "Xét nghiệm",
            "ten": "HBV đo tải lượng Real-time PCR; HBV đo tải lượng hệ thống tự động",
            "ma_icd": "B18.0, B18.1, B16",
            "dieu_kien": "Xét nghiệm lần đầu. Đang điều trị: xét nghiệm ở tuần thứ 12, 24 và 48, sau đó mỗi 24-48 tuần. Hoặc xét nghiệm khi ALT tăng không rõ nguyên nhân, không tuân thủ điều trị.",
            "ghi_chu": "Không thanh toán đồng thời 02 phương pháp xét nghiệm cho 01 người bệnh trong cùng 01 đợt điều trị.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "Xét nghiệm",
            "ten": "HCV đo tải lượng Real-time PCR; HCV đo tải lượng hệ thống tự động",
            "ma_icd": "B18.2, B17.1",
            "dieu_kien": "Xét nghiệm lần đầu. Đối với người bệnh được điều trị: xét nghiệm tại tuần thứ 12 sau khi kết thúc điều trị.",
            "ghi_chu": "Không thanh toán đồng thời 02 phương pháp xét nghiệm cho 01 người bệnh trong cùng 01 đợt điều trị.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Chụp cắt lớp vi tính từ 256 dãy trở lên",
            "ma_icd": "I20-I25, Q20-Q28",
            "dieu_kien": "Chụp hệ mạch vành với nhịp tim > 70 chu kỳ/phút (sau khi đã sử dụng thuốc giảm nhịp hoặc có chống chỉ định thuốc giảm nhịp) hoặc có bất thường nhịp; Bệnh lý tim bẩm sinh ở trẻ em < 06 tuổi; Bệnh lý tim mạch ở người ≥ 70 tuổi.",
            "ghi_chu": "Các trường hợp chụp đa chấn thương hoặc đánh giá khối u toàn thân không thỏa mãn các tiêu chí hẹp sẽ chỉ được thanh toán bằng mức giá chụp toàn thân, 64-128 dãy, hoặc 1-32 dãy tương ứng.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Chụp PET/CT",
            "ma_icd": "C00-C97, D00-D09",
            "dieu_kien": "Chẩn đoán nốt mờ đơn độc ở phổi ≥ 8mm chưa rõ lành ác, ung thư di căn chưa rõ nguyên phát (thanh toán 01 lần). Đánh giá giai đoạn, tái phát, di căn, đáp ứng điều trị cho một số loại ung thư.",
            "ghi_chu": "Thanh toán không quá 01 lần/12 tháng. Đánh giá đáp ứng điều trị với Lymphoma, ung thư phổi không tế bào nhỏ, đại trực tràng, thực quản, vòm: không quá 02 lần/12 tháng đầu tiên. Nếu dùng mô phỏng xạ trị: chỉ thanh toán theo giá Xạ trị mô phỏng bằng CT.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Lập trình máy tạo nhịp tim",
            "ma_icd": "Z45.0, I44-I49",
            "dieu_kien": "Thực hiện trên bệnh nhân có máy tạo nhịp cần cài đặt, kiểm tra hoặc điều chỉnh thông số.",
            "ghi_chu": "Không thanh toán thêm dịch vụ kỹ thuật Điện tâm đồ trong cùng thời điểm lập trình máy tạo nhịp tim.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Siêu âm Doppler tim",
            "ma_icd": "I00-I99, Q20-Q28",
            "dieu_kien": "Đánh giá hình thái, chức năng, huyết động học của tim và các mạch máu lớn.",
            "ghi_chu": "Không thanh toán khi thực hiện dịch vụ kỹ thuật Siêu âm tim có cản âm khi chỉ định thực hiện cùng một thời điểm.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Các dịch vụ kỹ thuật phục hồi chức năng",
            "ma_icd": "Z50, G00-G99, M00-M99, S00-T98",
            "dieu_kien": "Chỉ định trong quá trình điều trị phục hồi chức năng.",
            "ghi_chu": "Tổng số DVKT thanh toán tối đa không quá 06 DVKT/ngày. Trong đó: Các kỹ thuật vật lý trị liệu tối đa 04 kỹ thuật/ngày; Các kỹ thuật khác tối đa 03 kỹ thuật/ngày.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Lọc máu cấp cứu",
            "ma_icd": "E87.7, E87.5, E87.0, E87.1, N17-N19, E87.2, T51, T36-T50, A41, K72.0",
            "dieu_kien": "Quá tải thể tích/dịch (vô niệu, thiểu niệu, phù phổi cấp); Rối loạn điện giải nặng (K > 6,5, Na > 160 hoặc < 120, Ca > 3,5); HC ure máu cao (Ure > 30, Cre > 800); Toan chuyển hóa nặng (pH ≤ 7,2); Ngộ độc (rượu, thuốc, glycol); Bệnh thận mạn chưa có/hỏng đường truyền; Nhiễm trùng huyết có suy thận; Suy gan cấp có suy thận cấp.",
            "ghi_chu": "Nếu không phải đặt catheter (dùng AVF có sẵn): Thanh toán bằng giá 'Thận nhân tạo cấp cứu' trừ đi 130.000 đồng (1/4 giá catheter).",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Tắm điều trị bệnh nhân bỏng",
            "ma_icd": "T20-T32",
            "dieu_kien": "Vết bỏng ô nhiễm: thanh toán 01 lần/đợt điều trị. Vết bỏng nhiễm khuẩn nặng: thanh toán tối đa 2 lần/tuần (Áp dụng cho Trẻ em bỏng ≥ 10% ở ≥ 2 vùng chi thể; Người lớn bỏng ≥ 20% ở ≥ 3 vùng chi thể).",
            "ghi_chu": "Nếu có gây mê: thanh toán bằng giá DVKT 'Tắm điều trị bệnh nhân trong hồi sức, cấp cứu bỏng'. Nếu không gây mê: thanh toán bằng giá DVKT 'Tắm điều trị bệnh nhân bỏng'.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Thăm dò huyết động theo phương pháp PiCCO",
            "ma_icd": "R57.0, R57.1, R57.8, R57.9",
            "dieu_kien": "Bệnh nhân có tình trạng sốc, không đáp ứng với truyền dịch.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Hạ thân nhiệt chỉ huy",
            "ma_icd": "I46, T88.3, G93.1",
            "dieu_kien": "Sau cấp cứu ngừng tuần hoàn thành công còn hôn mê (nhưng còn phản xạ đồng tử); Tăng thân nhiệt ác tính không đáp ứng điều trị nội khoa; Bệnh não thiếu oxy - thiếu máu cục bộ.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Thay băng vết thương hoặc vết mổ chiều dài ≤ 15 cm",
            "ma_icd": "T81.4, T79.3, S00-T14",
            "dieu_kien": "Điều trị nội trú đối với: Vết thương/vết mổ nhiễm trùng; tổn thương lóc da, hở da > 6 cm2 có thấm dịch/máu; vết thương chèn gạc; chân ống dẫn lưu chảy nhiều dịch; đa vết thương/mổ; hoặc sau 1 phẫu thuật phải thực hiện ≥ 2 đường mổ.",
            "ghi_chu": "Không áp dụng thanh toán đối với: phẫu thuật nội soi, thay băng vết mổ/vết thương thông thường, thay băng rốn sơ sinh. Không thanh toán đồng thời với chi phí đã kết cấu trong chi phí phẫu thuật, thủ thuật.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Thay băng vết mổ có chiều dài trên 15 cm đến 30 cm",
            "ma_icd": "T81.4, K65, M86, O82",
            "dieu_kien": "Điều trị nội trú đối với: Vết mổ nhiễm trùng, rò tiêu hóa/mật/nước tiểu; Vết mổ sau phẫu thuật nhiễm khuẩn (viêm phúc mạc, viêm xương, áp xe); Vết mổ ống tiêu hóa/tiết niệu/đường mật/bụng cổ trướng; Phẫu thuật thực hiện ≥ 2 đường mổ.",
            "ghi_chu": "Trường hợp phẫu thuật mổ lấy thai: được áp dụng mức giá này nhưng tối đa không quá 03 lần.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Điện não đồ video",
            "ma_icd": "G40, R56.8, F06",
            "dieu_kien": "Cơn động kinh lần đầu hoặc đã chẩn đoán nhưng kết quả không rõ ràng/kháng thuốc; Nghi ngờ động kinh nhưng điện não thường không phát hiện sóng; Khó chẩn đoán ổ phát sinh hoặc chuẩn bị phẫu thuật điều trị động kinh.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Tập tri giác và nhận thức",
            "ma_icd": "F06, F09, R41.8, F80-F89",
            "dieu_kien": "Người từ đủ 6 tuổi trở lên: thanh toán tối đa 10 lần/lượt khám bệnh, chữa bệnh. Trẻ em dưới 6 tuổi: thanh toán tối đa 15 lần/lượt khám bệnh, chữa bệnh.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Tiêm Botulinum toxine vào điểm vận động điều trị co cứng cơ",
            "ma_icd": "I60-I69, G35, S06, T09.3, G80, G04, G24.5",
            "dieu_kien": "Co cứng khu trú các cơ chi do: Tai biến mạch máu não; Xơ cứng rải rác; Chấn thương sọ não; Tổn thương tủy sống (viêm tủy, xơ cột bên teo cơ, u tủy); Bại não; Viêm não; Điều trị co giật mi mắt.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Các DVKT châm, cứu",
            "ma_icd": "G50-G59, M00-M99",
            "dieu_kien": "Chỉ định điều trị bằng châm cứu.",
            "ghi_chu": "Thanh toán theo phương pháp, Không thanh toán theo vị trí, vùng, bộ phận cơ thể. Trong một đợt điều trị có nhiều bệnh thì thanh toán theo phương pháp điều trị cho từng bệnh.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Siêu âm tim qua thực quản",
            "ma_icd": "Z45.0, D15.1, I71, Q20-Q28, Z95.2",
            "dieu_kien": "Áp dụng khi: Phẫu thuật/can thiệp tim mạch; Khối u/huyết khối trong tim; Nghi phình tách động mạch chủ; Bệnh tim bẩm sinh; Van tim nhân tạo hoặc siêu âm ngực chưa xác định rõ tổn thương; Theo dõi trong mổ, hồi sức.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Siêu âm trong lòng mạch / Đo dự trữ lưu lượng vành FFR / iVUS",
            "ma_icd": "I20-I25",
            "dieu_kien": "Có thực hiện can thiệp tim mạch.",
            "ghi_chu": "Xuất toán nếu không kèm theo các can thiệp tim mạch đồng thời.",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "DVKT",
            "ten": "Chụp cắt lớp vi tính (CT) động mạch vành",
            "ma_icd": "I20, I25, Z95.1, Q24.5",
            "dieu_kien": "Nghi ngờ bệnh mạch vành qua kết quả xét nghiệm gắng sức/siêu âm tim; Xác định đau ngực không điển hình sau phẫu thuật cầu nối/đặt stent; Đánh giá giải phẫu; Phân biệt hội chứng vành cấp.",
            "ghi_chu": "",
            "nguon": "TT 39/2024/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Erlotinib",
            "ma_icd": "C34",
            "dieu_kien": "Điều trị ung thư phổi thể không phải tế bào nhỏ (NSCLC) tiến xa cục bộ hoặc di căn có đột biến gen EGFR dương tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Đối với người bệnh đã sử dụng thuốc này trước ngày 01/01/2015 và tiếp tục sử dụng thì được thanh toán 100% theo quy định chuyển tiếp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sorafenib",
            "ma_icd": "C22.0, C73, C64",
            "dieu_kien": "Điều trị ung thư biểu mô tế bào gan (HCC) tiến triển; Ung thư biểu mô tuyến giáp biệt hóa tiến triển tại chỗ hoặc di căn đã thất bại với điều trị bằng iod phóng xạ; Ung thư tế bào biểu mô thận tiến triển.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với ung thư gan và ung thư tuyến giáp; thanh toán 30% đối với ung thư thận. Áp dụng quy định chuyển tiếp (100% hoặc 50% tùy mốc thời gian bắt đầu sử dụng) nếu dùng trước ngày Thông tư có hiệu lực.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Trastuzumab",
            "ma_icd": "C50, C16",
            "dieu_kien": "Điều trị ung thư vú có HER2 dương tính; Điều trị ung thư dạ dày tiến xa hoặc di căn có HER2 dương tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 60% đối với ung thư vú; thanh toán 50% đối với ung thư dạ dày. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Bevacizumab",
            "ma_icd": "C18-C20, C34, C64, C71, C56, C53",
            "dieu_kien": "Điều trị ung thư đại trực tràng di căn; ung thư phổi không tế bào nhỏ tiến xa/di căn; ung thư biểu mô thận di căn; u nguyên bào thần kinh đệm tái phát; ung thư buồng trứng/cổ tử cung tiến xa.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Rituximab",
            "ma_icd": "C82-C85, C91.1, M05-M06",
            "dieu_kien": "Điều trị U lympho không Hodgkin (NHL) tế bào B có CD20 dương tính; Bạch cầu lympho mạn tính (CLL); Viêm khớp dạng thấp tiến triển nặng khi bệnh nhân không đáp ứng đầy đủ hoặc không dung nạp với các thuốc chống thấp khớp tác dụng chậm (DMARDs) bao gồm cả Methotrexate.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định Viêm khớp dạng thấp yêu cầu phải được hội chẩn hoặc kê đơn bởi bác sĩ chuyên khoa cơ xương khớp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Pemetrexed",
            "ma_icd": "C34, C45",
            "dieu_kien": "Điều trị ung thư phổi không tế bào nhỏ (chủ yếu là thể không phải tế bào vảy); Ung thư trung biểu mô màng phổi ác tính không thể phẫu thuật cắt bỏ.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ được thanh toán tại các cơ sở khám bệnh, chữa bệnh có chuyên khoa ung bướu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Paclitaxel (Dạng Liposome / Polymeric micelle)",
            "ma_icd": "C56, C50, C34, C53",
            "dieu_kien": "Chỉ định trong các phác đồ hóa trị ung thư buồng trứng, ung thư vú, ung thư phổi không tế bào nhỏ, Sarcoma Kaposi.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với dạng bào chế công nghệ cao (Liposome và Polymeric micelle). Trong khi đó, các dạng bào chế thông thường khác của Paclitaxel được thanh toán 100%.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Gefitinib",
            "ma_icd": "C34",
            "dieu_kien": "Điều trị ung thư phổi thể không phải tế bào nhỏ (NSCLC) tiến xa cục bộ hoặc di căn có đột biến gen EGFR dương tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Tương tự Erlotinib, có áp dụng điều khoản thanh toán 100% đối với người bệnh điều trị liên tục từ trước ngày 01/01/2015.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "L-asparaginase",
            "ma_icd": "C91.0",
            "dieu_kien": "Điều trị bệnh bạch cầu lympho cấp tính (ALL) theo phác đồ hóa trị liệu chuẩn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với dạng bào chế L-asparaginase erwinia; thanh toán 100% đối với các dạng bào chế khác. Áp dụng quy định chuyển tiếp (thanh toán 100%) nếu người bệnh sử dụng trước ngày 01/01/2019.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Doxorubicin",
            "ma_icd": "C50, C56, C81-C85, C90",
            "dieu_kien": "Chỉ định trong phác đồ điều trị ung thư vú, ung thư buồng trứng, đa u tủy xương, và các u lympho ác tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với dạng bào chế Liposome. Thanh toán 100% đối với các dạng bào chế khác. Nếu bệnh nhân đã điều trị dạng Liposome trước ngày 01/01/2015 thì tiếp tục được thanh toán 100%.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Cetuximab",
            "ma_icd": "C18-C20, C00-C14",
            "dieu_kien": "Điều trị ung thư đại trực tràng di căn có xét nghiệm gen RAS tự nhiên (wild-type); Ung thư biểu mô tế bào vảy vùng đầu cổ tiến xa cục bộ hoặc di căn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ được phép kê đơn và thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Everolimus",
            "ma_icd": "C64, C50, C7A",
            "dieu_kien": "Điều trị ung thư biểu mô tế bào thận tiến triển (RCC); Ung thư vú tiến triển thụ thể nội tiết dương tính (HR+), HER2 âm tính; Các khối u thần kinh nội tiết (NET) tiến triển.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phải được hội chẩn tiểu ban ung thư hoặc bác sĩ chuyên khoa ung bướu kê đơn tại các cơ sở tuyến chuyên sâu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tenofovir alafenamide (TAF)",
            "ma_icd": "B18.0, B18.1",
            "dieu_kien": "Điều trị viêm gan vi rút B mạn tính ở người lớn và thanh thiếu niên (từ 12 tuổi, ≥ 35kg).",
            "ghi_chu": "Chỉ thanh toán khi người bệnh có một trong các tiêu chuẩn: Xơ gan, suy thận (eGFR <60 ml/phút), loãng xương, hoặc có bằng chứng thất bại/chống chỉ định/không dung nạp với Tenofovir disoproxil fumarate (TDF). Vi phạm điều kiện này sẽ bị xuất toán toàn bộ.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Insulin glargine / Insulin detemir / Insulin degludec (Insulin nền Analog)",
            "ma_icd": "E10-E14",
            "dieu_kien": "Điều trị đái tháo đường typ 1; Đái tháo đường typ 2 không kiểm soát được đường huyết (HbA1c không đạt mục tiêu) khi đã dùng thuốc viên hoặc Insulin người (Human insulin) loại NPH/hỗn hợp.",
            "ghi_chu": "Yêu cầu phải được kê đơn bởi bác sĩ chuyên khoa nội tiết, hoặc bác sĩ đa khoa đã có chứng chỉ đào tạo về nội tiết/đái tháo đường. Tại bệnh viện tuyến huyện, cần có hội chẩn với tuyến trên khi bắt đầu chuyển đổi phác đồ sang Analog.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Mycophenolate mofetil / Mycophenolic acid",
            "ma_icd": "Z94.0, Z94.4, M32, N04",
            "dieu_kien": "Dự phòng thải ghép tạng (thận, gan, tim); Điều trị Lupus ban đỏ hệ thống biến chứng thận; Hội chứng thận hư kháng hoặc phụ thuộc Corticoid.",
            "ghi_chu": "Thanh toán 100%. Tuy nhiên, các chỉ định ngoài dự phòng thải ghép (Lupus, Thận hư) BẮT BUỘC phải do bác sĩ chuyên khoa Thận - Tiết niệu hoặc Cơ xương khớp chỉ định/hội chẩn.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Amphotericin B liposomal (Lipid-based Amphotericin B)",
            "ma_icd": "B37.7, B38-B49, B44",
            "dieu_kien": "Điều trị nhiễm nấm hệ thống sâu (Aspergillus, Candida...) ở bệnh nhân suy giảm miễn dịch nghiêm trọng, giảm bạch cầu hạt nặng hoặc ghép tủy.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ được thanh toán khi có hồ sơ chứng minh người bệnh bị độc tính trên thận (tăng Creatinin), không dung nạp hoặc chống chỉ định với Amphotericin B dạng thường.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sofosbuvir",
            "ma_icd": "B18.2, B17.1",
            "dieu_kien": "Phối hợp với các thuốc kháng vi rút khác để điều trị viêm gan vi rút C mạn tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Yêu cầu chỉ định của bác sĩ chuyên khoa Truyền nhiễm hoặc Nội tiêu hóa - Gan mật.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Daclatasvir",
            "ma_icd": "B18.2, B17.1",
            "dieu_kien": "Phối hợp với Sofosbuvir điều trị viêm gan vi rút C mạn tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ được thanh toán khi thực hiện đúng phác đồ điều trị của Bộ Y tế.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ledipasvir + Sofosbuvir",
            "ma_icd": "B18.2, B17.1",
            "dieu_kien": "Điều trị viêm gan vi rút C mạn tính ở người lớn và trẻ em từ 3 tuổi trở lên.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Đây là dạng thuốc phối hợp liều cố định.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Nilotinib",
            "ma_icd": "C92.1",
            "dieu_kien": "Điều trị bạch cầu dòng tủy mạn tính (CML) giai đoạn mạn tính hoặc giai đoạn tăng tốc có nhiễm sắc thể Philadelphia dương tính (Ph+).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi bệnh nhân kháng hoặc không dung nạp với Imatinib, hoặc điều trị bước 1 cho bệnh nhân mới chẩn đoán theo tiêu chuẩn cụ thể.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Adalimumab",
            "ma_icd": "M05, M06, L40.5, K50, K51, M45",
            "dieu_kien": "Viêm khớp dạng thấp; Viêm khớp vảy nến; Bệnh Crohn; Viêm cột sống dính khớp; Viêm đại tràng loét nát mức độ vừa đến nặng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi bệnh nhân không đáp ứng với các điều trị kinh điển (DMARDs) và phải có hội chẩn chuyên khoa.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Somatropin (Hormone tăng trưởng)",
            "ma_icd": "E23.0, Q96, N18",
            "dieu_kien": "Trẻ em chậm tăng trưởng do: Thiếu hụt hormone tăng trưởng; Hội chứng Turner; Suy thận mạn tính; Trẻ nhỏ so với tuổi thai (SGA).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhi chưa liền đầu xương, được chẩn đoán và chỉ định bởi bác sĩ chuyên khoa Nhi - Nội tiết tại bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Albumin người (Dạng dịch truyền)",
            "ma_icd": "R57.1, E43, K74, T31",
            "dieu_kien": "Sốc giảm thể tích không đáp ứng với dịch truyền tinh thể; Giảm Albumin máu nặng (thường < 20g/L hoặc < 25g/L kèm phù nặng); Bệnh lý gan có cổ trướng đại thể; Hỗ trợ trong thay huyết tương.",
            "ghi_chu": "Thanh toán 100% nhưng điều kiện bệnh lý cực kỳ ngặt nghèo. Phải có xét nghiệm nồng độ Albumin máu kèm theo trong hồ sơ bệnh án. Chỉ định sai ngưỡng nồng độ quy định sẽ bị xuất toán toàn bộ chai thuốc.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Imatinib",
            "ma_icd": "C92.1, C49.4",
            "dieu_kien": "Bạch cầu dòng tủy mạn tính (CML) có nhiễm sắc thể Philadelphia dương tính; U mô đệm đường tiêu hóa (GIST) ác tính không thể phẫu thuật hoặc đã di căn.",
            "ghi_chu": "Thanh toán 100% (hoặc theo tỷ lệ quy định chuyển tiếp). Tuy nhiên, chỉ được phép kê đơn tại các cơ sở có chuyên khoa Ung bướu hoặc Huyết học lâm sàng. Yêu cầu xét nghiệm đột biến gen/tế bào di truyền trước khi điều trị.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Interferon / Peginterferon",
            "ma_icd": "B18.0, B18.1, B18.2",
            "dieu_kien": "Điều trị viêm gan vi rút B mạn tính hoặc viêm gan vi rút C mạn tính.",
            "ghi_chu": "Thanh toán 100% (đối với Interferon) hoặc 30% - 100% (tùy loại Peginterferon). Yêu cầu chỉ định của bác sĩ chuyên khoa và phải có bằng chứng vi rút đang nhân bản (tải lượng vi rút cao).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Bortezomib",
            "ma_icd": "C90.0, C85.7",
            "dieu_kien": "Đa u tủy xương (Multiple Myeloma); U lympho tế bào vỏ (Mantle cell lymphoma).",
            "ghi_chu": "Thanh toán 100%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa Ung bướu/Huyết học. Phải thực hiện theo phác đồ phối hợp thuốc cụ thể.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Rivaroxaban",
            "ma_icd": "I48, I80, I26, I74",
            "dieu_kien": "Dự phòng đột quỵ và thuyên tắc mạch hệ thống ở bệnh nhân rung nhĩ không do bệnh lý van tim; Điều trị và dự phòng tái phát thuyên tắc tĩnh mạch sâu (DVT), thuyên tắc phổi (PE).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định dự phòng đột quỵ trong rung nhĩ yêu cầu bệnh nhân có thang điểm CHA2DS2-VASc ≥ 2 (nam) hoặc ≥ 3 (nữ).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sacubitril + Valsartan",
            "ma_icd": "I50",
            "dieu_kien": "Điều trị suy tim mạn tính có phân suất tống máu giảm (HFrEF), mức độ NYHA II-IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhân vẫn còn triệu chứng khi đã điều trị bằng các phác đồ chuẩn (ƯCMC hoặc ƯCTT phối hợp chẹn Beta và kháng Aldosteron) tối thiểu 01 tháng. Chỉ định tại BV hạng I trở lên hoặc BV chuyên khoa Tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Osimertinib",
            "ma_icd": "C34",
            "dieu_kien": "Điều trị bước 1 ung thư phổi không tế bào nhỏ (NSCLC) có đột biến gen EGFR; Hoặc điều trị bước 2 khi có đột biến T790M dương tính sau khi thất bại với các thuốc TKI thế hệ 1, 2.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Bắt buộc có kết quả xét nghiệm đột biến gen bằng kỹ thuật được công nhận. Chỉ thanh toán tại các cơ sở có chuyên khoa Ung bướu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Afatinib",
            "ma_icd": "C34",
            "dieu_kien": "Điều trị ung thư phổi không tế bào nhỏ (NSCLC) giai đoạn tiến xa hoặc di căn có đột biến gen EGFR dương tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Caspofungin",
            "ma_icd": "B37, B44",
            "dieu_kien": "Điều trị nhiễm nấm Candida xâm lấn; Điều trị theo kinh nghiệm các trường hợp nghi nhiễm nấm ở bệnh nhân giảm bạch cầu hạt kèm sốt; Nhiễm nấm Aspergillus kháng trị hoặc không dung nạp với các thuốc khác.",
            "ghi_chu": "Thanh toán 100%. Tuy nhiên, đối với nhiễm nấm Aspergillus, chỉ thanh toán khi bệnh nhân không đáp ứng hoặc chống chỉ định với Amphotericin B hoặc Voriconazole. Yêu cầu hội chẩn chuyên khoa.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tocilizumab",
            "ma_icd": "M05, M06, M08, M31.4",
            "dieu_kien": "Viêm khớp dạng thấp tiến triển nặng; Viêm khớp thiếu niên tự phát hệ thống (sJIA); Viêm đa khớp thiếu niên tự phát (pJIA); Hội chứng giải phóng cytokine (CRS) nặng do liệu pháp tế bào CAR-T.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Bắt buộc hội chẩn hoặc kê đơn bởi bác sĩ chuyên khoa cơ xương khớp/hồi sức cấp cứu. Phải có hồ sơ chứng minh thất bại với các thuốc điều trị cơ bản.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Zoledronic acid (Dạng truyền tĩnh mạch)",
            "ma_icd": "M81, C79.5, M88",
            "dieu_kien": "Điều trị loãng xương ở phụ nữ sau mãn kinh và nam giới có nguy cơ gãy xương cao; Dự phòng gãy xương lâm sàng sau gãy xương háng; Ung thư di căn xương.",
            "ghi_chu": "Thanh toán 100%. Đối với loãng xương, yêu cầu kết quả đo mật độ xương (DEXA scan) có T-score ≤ -2.5 hoặc đã có tiền sử gãy xương do loãng xương. Chỉ thực hiện tại cơ sở có đủ điều kiện cấp cứu sốc phản vệ.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Dabigatran",
            "ma_icd": "I48, I80, I26",
            "dieu_kien": "Dự phòng đột quỵ ở bệnh nhân rung nhĩ không do bệnh lý van tim; Điều trị và dự phòng DVT/PE.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Điều kiện về điểm CHA2DS2-VASc tương tự Rivaroxaban. Cần lưu ý chống chỉ định cho bệnh nhân suy thận nặng (ClCr < 30ml/phút).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Apixaban",
            "ma_icd": "I48, I80, I26",
            "dieu_kien": "Dự phòng đột quỵ ở bệnh nhân rung nhĩ không do bệnh lý van tim; Điều trị DVT/PE.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Ưu tiên sử dụng cho bệnh nhân suy thận nhẹ đến trung bình hoặc người cao tuổi khi các NOACs khác không phù hợp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Liraglutide (Dạng tiêm)",
            "ma_icd": "E11",
            "dieu_kien": "Điều trị đái tháo đường typ 2 ở người lớn để kiểm soát đường huyết.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định cho bệnh nhân có BMI ≥ 23 kg/m² và không kiểm soát được đường huyết khi đã phối hợp ít nhất 02 loại thuốc uống, hoặc bệnh nhân có bệnh lý tim mạch do xơ vữa.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sunitinib",
            "ma_icd": "C64, C16, C18, C25",
            "dieu_kien": "Điều trị ung thư biểu mô tế bào thận tiến triển và/hoặc di căn; U mô đệm đường tiêu hóa (GIST) sau khi thất bại điều trị với Imatinib; U nội tiết tuyến tụy biệt hóa tốt, không thể phẫu thuật hoặc di căn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Dapagliflozin",
            "ma_icd": "E11, I50, N18",
            "dieu_kien": "Điều trị đái tháo đường typ 2; Suy tim mạn tính có phân suất tống máu giảm (HFrEF); Bệnh thận mạn tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định suy tim yêu cầu LVEF ≤ 40% (theo phác đồ Bộ Y tế). Chỉ định bệnh thận mạn yêu cầu eGFR từ 25-75 ml/phút/1.73m².",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Empagliflozin",
            "ma_icd": "E11, I50",
            "dieu_kien": "Điều trị đái tháo đường typ 2; Suy tim mạn tính (HFrEF hoặc HFpEF).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Đối với đái tháo đường, ưu tiên bệnh nhân có bệnh lý tim mạch do xơ vữa hoặc có nguy cơ tim mạch rất cao.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Immunoglobulin (IVIG)",
            "ma_icd": "M30.3, D69.3, G61.0, B20-B24",
            "dieu_kien": "Bệnh Kawasaki; Xuất huyết giảm tiểu cầu miễn dịch (ITP); Hội chứng Guillain-Barré; Nhiễm trùng nặng/Sốc nhiễm khuẩn ở trẻ em; Thay thế kháng thể trong suy giảm miễn dịch tiên phát hoặc thứ phát (HIV).",
            "ghi_chu": "Thanh toán 100%. Riêng chỉ định nhiễm trùng nặng/Sốc nhiễm khuẩn thanh toán 50%. Yêu cầu hội chẩn chuyên khoa và bằng chứng lâm sàng/xét nghiệm nghiêm ngặt.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Voriconazole",
            "ma_icd": "B44, B37",
            "dieu_kien": "Nhiễm nấm xâm lấn do Aspergillus; Nhiễm nấm Candida nặng kháng Fluconazole; Nhiễm nấm nặng do Scedosporium hoặc Fusarium.",
            "ghi_chu": "Thanh toán 100%. Yêu cầu kết quả cấy nấm hoặc bằng chứng huyết thanh học (Galactomannan). Phải có hội chẩn tiểu ban thuốc và điều trị hoặc bác sĩ chuyên khoa Truyền nhiễm.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Entecavir",
            "ma_icd": "B18.0, B18.1",
            "dieu_kien": "Điều trị viêm gan vi rút B mạn tính.",
            "ghi_chu": "Thanh toán 100%. Tại bệnh viện hạng III và hạng IV, chỉ được thanh toán khi có kết quả tải lượng vi rút (HBV-DNA) và chỉ định từ tuyến trên chuyển về hoặc bác sĩ đã được đào tạo về điều trị viêm gan.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Lapatinib",
            "ma_icd": "C50",
            "dieu_kien": "Phối hợp với Capecitabine điều trị ung thư vú tiến triển hoặc di căn có HER2 dương tính sau khi đã thất bại với Anthracycline, Taxane và Trastuzumab.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Pazopanib",
            "ma_icd": "C64, C49",
            "dieu_kien": "Điều trị bước 1 ung thư biểu mô tế bào thận (RCC) tiến triển; Sarcoma mô mềm di căn đã hóa trị trước đó.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại các cơ sở điều trị ung bướu tuyến tỉnh và trung ương.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Yếu tố VIII (Đông máu)",
            "ma_icd": "D66",
            "dieu_kien": "Điều trị chảy máu và dự phòng chảy máu ở bệnh nhân Hemophilia A.",
            "ghi_chu": "Thanh toán 100%. Điều trị dự phòng chỉ áp dụng cho trẻ em hoặc bệnh nhân có tần suất chảy máu khớp tái phát nhiều lần theo quy trình chuyên môn của Bộ Y tế.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Cyclosporin",
            "ma_icd": "Z94, M05-M06, L40, N04",
            "dieu_kien": "Dự phòng thải ghép (thận, gan, tim); Viêm khớp dạng thấp nặng; Vảy nến nặng; Hội chứng thận hư kháng thuốc.",
            "ghi_chu": "Thanh toán 100%. Lưu ý định lượng nồng độ thuốc trong máu để điều chỉnh liều và làm căn cứ thanh toán BHYT nhằm tránh lạm dụng gây độc thận.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Linezolid (Dạng tiêm, uống)",
            "ma_icd": "A41, J15, L00-L08",
            "dieu_kien": "Điều trị nhiễm khuẩn do vi khuẩn Gram dương đã kháng Vancomycin (VRE) hoặc tụ cầu vàng kháng Methicillin (MRSA) khi Vancomycin không hiệu quả hoặc bệnh nhân có chống chỉ định.",
            "ghi_chu": "Thanh toán 100%. Yêu cầu phải có kết quả kháng sinh đồ hoặc hội chẩn chuyên khoa Truyền nhiễm/Dược lâm sàng. Xuất toán nếu sử dụng làm kháng sinh dự phòng hoặc chỉ định cho vi khuẩn nhạy cảm với kháng sinh phổ hẹp hơn.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Infliximab (Dạng tiêm)",
            "ma_icd": "K50, K51, M45, M05, M06, L40",
            "dieu_kien": "Bệnh Crohn, viêm đại tràng loét nát mức độ trung bình đến nặng; Viêm cột sống dính khớp; Viêm khớp dạng thấp; Vảy nến mảng mức độ nặng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa tương ứng. Yêu cầu bệnh nhân không đáp ứng với điều trị thông thường.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ticagrelor (Dạng uống)",
            "ma_icd": "I20.0, I21, I22",
            "dieu_kien": "Hội chứng mạch vành cấp (đau thắt ngực không ổn định, nhồi máu cơ tim có hoặc không có ST chênh lên).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Thời gian thanh toán tối đa là 12 tháng sau biến cố mạch vành cấp. Sau 12 tháng, nếu tiếp tục sử dụng sẽ bị xuất toán.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Abiraterone acetate (Dạng uống)",
            "ma_icd": "C61",
            "dieu_kien": "Điều trị ung thư biểu mô tuyến tiền liệt di căn kháng cắt tinh hoàn (mCRPC).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phải phối hợp với Prednisone hoặc Prednisolone. Chỉ thanh toán tại các cơ sở có chuyên khoa Ung bướu/Ngoại tiết niệu tuyến Trung ương hoặc tỉnh.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Colistin (Sodium colistimethate)",
            "ma_icd": "A41, J15, K65",
            "dieu_kien": "Nhiễm khuẩn nặng do vi khuẩn Gram âm đa kháng (đặc biệt là Acinetobacter baumannii, Pseudomonas aeruginosa, K. pneumoniae) khi đã kháng các kháng sinh khác (như Carbapenem).",
            "ghi_chu": "Thanh toán 100%. Bắt buộc hồ sơ phải có hội chẩn chuyên khoa hoặc bằng chứng vi sinh (kháng sinh đồ). Cần giám sát chức năng thận để tránh biến chứng.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Leuprorelin / Goserelin (GnRH agonists)",
            "ma_icd": "C61, C50, N80, D25, E30.1",
            "dieu_kien": "Ung thư tuyến tiền liệt; Ung thư vú; Nội mạc tử cung lạc chỗ; U xơ tử cung; Dậy thì sớm trung ương.",
            "ghi_chu": "Thanh toán 100% cho chỉ định ung thư. Riêng chỉ định dậy thì sớm và bệnh lý phụ khoa yêu cầu chẩn đoán xác định từ bệnh viện tuyến tỉnh/Trung ương chuyên khoa Nhi/Sản.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Fondaparinux (Dạng tiêm)",
            "ma_icd": "I20.0, I21, I80, I26",
            "dieu_kien": "Điều trị đau thắt ngực không ổn định hoặc nhồi máu cơ tim không ST chênh lên; Điều trị thuyên tắc tĩnh mạch sâu và thuyên tắc phổi cấp tính.",
            "ghi_chu": "Thanh toán 100%. Không thanh toán cho dự phòng thuyên tắc huyết khối tĩnh mạch trong các phẫu thuật thông thường không thuộc nhóm nguy cơ cao theo hướng dẫn chuyên môn.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Octreotide (Dạng tiêm)",
            "ma_icd": "C7A, E22.0, I85.0, K22.6",
            "dieu_kien": "Kiểm soát triệu chứng ở bệnh nhân u nội tiết tiêu hóa (GEP-NET); Bệnh to đầu chi; Dự phòng biến chứng sau phẫu thuật tụy; Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với các chỉ định mạn tính (NET, to đầu chi). Thanh toán 100% đối với cấp cứu xuất huyết tiêu hóa hoặc dự phòng biến chứng phẫu thuật tụy.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Temozolomide (Dạng uống)",
            "ma_icd": "C71",
            "dieu_kien": "Điều trị u nguyên bào thần kinh đệm đa dạng (Glioblastoma multiforme) mới chẩn đoán phối hợp với xạ trị; U tế bào thần kinh đệm ác tính tái phát hoặc tiến triển.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại các cơ sở điều trị Ung bướu/Ngoại thần kinh hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Pegfilgrastim (Dạng tiêm)",
            "ma_icd": "D70, C00-C97",
            "dieu_kien": "Giảm thời gian bị giảm bạch cầu hạt và tỷ lệ sốt do giảm bạch cầu hạt ở bệnh nhân điều trị bằng hóa trị liệu gây độc tế bào.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ dùng dự phòng tiên phát khi phác đồ hóa trị có nguy cơ sốt giảm bạch cầu > 20% hoặc dự phòng thứ phát cho bệnh nhân đã bị sốt giảm bạch cầu ở chu kỳ trước.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Nivolumab",
            "ma_icd": "C34, C43, C64, C81",
            "dieu_kien": "Điều trị ung thư phổi không tế bào nhỏ tiến xa hoặc di căn; Ung thư hắc tố (Melanoma) không thể phẫu thuật hoặc di căn; Ung thư biểu mô tế bào thận tiến triển; U lympho Hodgkin kinh điển tái phát hoặc kháng trị.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II. Phải có bằng chứng bệnh tiến triển sau khi đã điều trị bằng các phác đồ hóa trị chuẩn.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Pembrolizumab",
            "ma_icd": "C34, C43, C15, C67, C53",
            "dieu_kien": "Điều trị bước 1 hoặc bước 2 ung thư phổi không tế bào nhỏ; Ung thư hắc tố di căn; Ung thư biểu mô đường niệu; Ung thư biểu mô tế bào vảy vùng đầu và cổ; Ung thư cổ tử cung di căn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II. Yêu cầu xét nghiệm PD-L1 (tùy mặt bệnh) và hội chẩn tiểu ban ung thư.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Epoetin (Alpha, Beta hoặc Kappa)",
            "ma_icd": "N18, C00-C97",
            "dieu_kien": "Điều trị thiếu máu do suy thận mạn tính (đặc biệt bệnh nhân chạy thận nhân tạo); Thiếu máu ở bệnh nhân ung thư đang điều trị hóa trị gây độc tế bào.",
            "ghi_chu": "Thanh toán 100%. Đối với suy thận mạn: chỉ định khi nồng độ Hemoglobin (Hb) < 10g/dL và ngừng/giảm liều khi Hb ≥ 11.5g/dL. Cần theo dõi chỉ số sắt và ferritin máu định kỳ để đảm bảo hiệu quả điều trị.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tiotropium",
            "ma_icd": "J44, J45",
            "dieu_kien": "Điều trị duy trì ở bệnh nhân phổi tắc nghẽn mạn tính (COPD); Điều trị bổ trợ cho bệnh nhân hen phế quản nặng chưa kiểm soát được bằng phác đồ ICS/LABA.",
            "ghi_chu": "Thanh toán 100%. Yêu cầu phải được chẩn đoán xác định bằng hô hấp ký và chỉ định/hội chẩn bởi bác sĩ chuyên khoa Nội hô hấp hoặc dị ứng miễn dịch lâm sàng.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Posaconazole",
            "ma_icd": "B44, B37",
            "dieu_kien": "Dự phòng nhiễm nấm xâm lấn ở bệnh nhân ghép tủy, bệnh bạch cầu cấp dòng tủy hoặc hội chứng loạn sản tủy; Điều trị nấm Aspergillus kháng trị.",
            "ghi_chu": "Quỹ BHYT thanh toán 50% đối với dạng viên uống và dịch truyền; thanh toán 100% đối với dạng hỗn dịch uống cho trẻ em. Chỉ thanh toán tại bệnh viện hạng Đặc biệt hoặc hạng I có chuyên khoa Huyết học/Truyền nhiễm.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Lanreotide",
            "ma_icd": "C7A, E22.0",
            "dieu_kien": "Điều trị bệnh to đầu chi khi phẫu thuật/xạ trị không hiệu quả; Điều trị các khối u nội tiết tuyến tụy - đường tiêu hóa (GEP-NETs) giai đoạn tiến xa.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định yêu cầu kết quả xét nghiệm hormone (GH, IGF-1) hoặc bằng chứng giải phẫu bệnh khối u nội tiết.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Yếu tố IX (Đông máu)",
            "ma_icd": "D67",
            "dieu_kien": "Điều trị và dự phòng chảy máu ở bệnh nhân Hemophilia B (thiếu hụt yếu tố IX di truyền).",
            "ghi_chu": "Thanh toán 100%. Chỉ thanh toán khi có xét nghiệm định lượng nồng độ yếu tố IX trong máu dưới mức bình thường và được quản lý tại các trung tâm Hemophilia hoặc chuyên khoa Huyết học.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Atezolizumab",
            "ma_icd": "C34, C22.0, C50",
            "dieu_kien": "Điều trị ung thư phổi không tế bào nhỏ; Ung thư biểu mô tế bào gan không thể phẫu thuật hoặc di căn (phối hợp Bevacizumab); Ung thư vú thể tam âm di căn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại cơ sở có chuyên khoa Ung bướu tuyến Trung ương hoặc tuyến tỉnh hạng I.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Enoxaparin (Hoặc các Heparin trọng lượng phân tử thấp khác)",
            "ma_icd": "I80, I26, I21, I20.0, O22",
            "dieu_kien": "Dự phòng và điều trị thuyên tắc huyết khối tĩnh mạch; Điều trị đau thắt ngực không ổn định và nhồi máu cơ tim không có sóng Q; Dự phòng đông máu trong tuần hoàn ngoài cơ thể khi chạy thận nhân tạo.",
            "ghi_chu": "Thanh toán 100%. Lưu ý: Chỉ thanh toán dự phòng cho bệnh nhân có nguy cơ cao (phẫu thuật lớn, nằm bất động lâu ngày) theo thang điểm đánh giá nguy cơ tắc mạch trong hồ sơ bệnh án.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Vancomycin (Dạng tiêm)",
            "ma_icd": "A41, J15, L00-L08, M86",
            "dieu_kien": "Nhiễm khuẩn nặng do tụ cầu kháng Methicillin (MRSA) hoặc vi khuẩn Gram dương khác nhạy cảm nhưng bệnh nhân dị ứng với Penicillin/Cephalosporin.",
            "ghi_chu": "Thanh toán 100%. Phải theo dõi chức năng thận và nồng độ thuốc trong máu (TDM) nếu có điều kiện. Lạm dụng chỉ định cho vi khuẩn nhạy cảm với kháng sinh nhóm Beta-lactam sẽ bị xuất toán.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Lenvatinib",
            "ma_icd": "C22.0, C73, C64",
            "dieu_kien": "Điều trị ung thư biểu mô tế bào gan không thể phẫu thuật; Ung thư tuyến giáp biệt hóa tái phát hoặc tiến triển kháng Iod phóng xạ; Ung thư biểu mô tế bào thận tiến triển (phối hợp với Everolimus/Pembrolizumab).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa ung bướu hạng II.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Palbociclib",
            "ma_icd": "C50",
            "dieu_kien": "Điều trị ung thư vú giai đoạn tiến xa hoặc di căn, có thụ thể nội tiết dương tính (HR+), thụ thể yếu tố phát triển biểu mô nhân loại 2 âm tính (HER2-).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phải phối hợp với một thuốc ức chế aromatase hoặc Fulvestrant. Chỉ thanh toán tại cơ sở có chuyên khoa Ung bướu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Azacitidine",
            "ma_icd": "D46, C92.0",
            "dieu_kien": "Điều trị hội chứng loạn sản tủy (MDS) nhóm nguy cơ cao; Bệnh bạch cầu dòng tủy cấp (AML) ở người lớn không phù hợp để ghép tế bào gốc.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I hoặc bệnh viện chuyên khoa Ung bướu/Huyết học.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sevelamer",
            "ma_icd": "N18.5",
            "dieu_kien": "Kiểm soát nồng độ phospho máu ở bệnh nhân suy thận mạn giai đoạn cuối đang thực hiện lọc máu (chạy thận nhân tạo hoặc lọc màng bụng).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi nồng độ phospho máu > 1,78 mmol/L (5,5 mg/dL) mặc dù đã dùng các thuốc gắn kết phospho chứa calci hoặc bệnh nhân có calci máu cao.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tofacitinib",
            "ma_icd": "M05, M06, M45, K51",
            "dieu_kien": "Viêm khớp dạng thấp; Viêm cột sống dính khớp; Viêm đại tràng loét nát mức độ vừa đến nặng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi bệnh nhân không đáp ứng hoặc không dung nạp với ít nhất một thuốc DMARD kinh điển hoặc thuốc sinh học khác. Yêu cầu hội chẩn chuyên khoa.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Axitinib",
            "ma_icd": "C64",
            "dieu_kien": "Điều trị ung thư biểu mô tế bào thận (RCC) giai đoạn tiến xa.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán sau khi bệnh nhân đã thất bại với một liệu pháp điều trị trước đó bằng Sunitinib hoặc một Cytokine.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Olaparib",
            "ma_icd": "C56, C50",
            "dieu_kien": "Điều trị duy trì ung thư biểu mô buồng trứng tái phát có đột biến gen BRCA; Ung thư vú di căn có đột biến gen BRCA dòng mầm.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Bắt buộc có kết quả xét nghiệm đột biến gen BRCA dương tính. Chỉ thanh toán tại các trung tâm ung bướu lớn.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Daratumumab",
            "ma_icd": "C90.0",
            "dieu_kien": "Điều trị đa u tủy xương (Multiple Myeloma) ở bệnh nhân tái phát hoặc kháng trị.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhân đã được điều trị bằng ít nhất 02 liệu pháp trước đó bao gồm một thuốc ức chế Proteasome và một thuốc điều hòa miễn dịch.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sildenafil (Dạng uống cho PAH)",
            "ma_icd": "I27.0",
            "dieu_kien": "Điều trị tăng áp lực động mạch phổi (PAH) nhóm I theo phân loại của WHO nhằm cải thiện khả năng vận động.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Không thanh toán cho chỉ định rối loạn cương dương (N48.4). Phải được chẩn đoán xác định bằng thông tim phải tại các bệnh viện chuyên khoa tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Brentuximab vedotin",
            "ma_icd": "C81, C84.5",
            "dieu_kien": "U lympho Hodgkin tái phát hoặc kháng trị có CD30 dương tính; U lympho tế bào lớn anaplastic (ALCL) tái phát hoặc kháng trị.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I có chuyên khoa Huyết học/Ung bướu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sitagliptin / Vildagliptin / Saxagliptin (Nhóm ức chế DPP-4)",
            "ma_icd": "E11",
            "dieu_kien": "Điều trị đái tháo đường typ 2 ở người trưởng thành.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân không kiểm soát được đường huyết bằng Metformin và/hoặc Sulfonylurea, hoặc có chống chỉ định/không dung nạp với các thuốc này.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ivabradine",
            "ma_icd": "I50, I20",
            "dieu_kien": "Suy tim mạn tính (NYHA II-IV) có nhịp xoang ≥ 70 nhịp/phút, phân suất tống máu (LVEF) ≤ 35%; Đau thắt ngực ổn định ở bệnh nhân nhịp xoang không dung nạp hoặc có chống chỉ định với thuốc chẹn beta.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Hồ sơ bệnh án phải ghi nhận tần số tim và kết quả siêu âm tim (LVEF) gần nhất.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Levosimendan (Dạng tiêm)",
            "ma_icd": "I50.1, I50.9",
            "dieu_kien": "Điều trị ngắn hạn suy tim mạn tính mất bù cấp mức độ nặng, khi các liệu pháp thông thường (thuốc lợi tiểu, ức chế men chuyển, thuốc vận mạch) không đạt hiệu quả thỏa đáng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại các đơn vị hồi sức tích cực (ICU) hoặc hồi sức tim mạch bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Surfactant (Poractant alfa / Beractant)",
            "ma_icd": "P22.0",
            "dieu_kien": "Điều trị hội chứng suy hô hấp (RDS) ở trẻ sơ sinh non tháng.",
            "ghi_chu": "Quỹ BHYT thanh toán 100%. Phải thực hiện tại các đơn vị sơ sinh có đầy đủ phương tiện đặt nội khí quản và máy thở. Chỉ định cần căn cứ trên tuổi thai, cân nặng và chỉ số X-quang phổi.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Meropenem / Imipenem + Cilastatin",
            "ma_icd": "A41, J15, K65",
            "dieu_kien": "Nhiễm khuẩn nặng, đa kháng thuốc hoặc nhiễm khuẩn bệnh viện (viêm phổi bệnh viện, nhiễm khuẩn huyết, nhiễm khuẩn ổ bụng phức tạp).",
            "ghi_chu": "Thanh toán 100%. Bắt buộc phải có hội chẩn với hội đồng thuốc và điều trị hoặc bác sĩ chuyên khoa Truyền nhiễm/Dược lâm sàng. Khuyến khích có kết quả kháng sinh đồ trong vòng 48-72h để duy trì thanh toán.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Desmopressin (Dạng xịt mũi, uống)",
            "ma_icd": "E23.2, R32",
            "dieu_kien": "Đái tháo nhạt do nguyên nhân trung ương; Đái dầm ban đêm tiên phát ở trẻ em trên 5 tuổi.",
            "ghi_chu": "Thanh toán 100% cho đái tháo nhạt trung ương. Chỉ định đái dầm ban đêm chỉ thanh toán sau khi các biện pháp can thiệp hành vi không hiệu quả và phải được bác sĩ chuyên khoa Nhi/Thận chỉ định.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Alprostadil (Dạng tiêm)",
            "ma_icd": "Q25.0, I70.2",
            "dieu_kien": "Duy trì tạm thời sự thông thương của ống động mạch ở trẻ sơ sinh có dị tật tim bẩm sinh phụ thuộc ống động mạch; Điều trị bệnh động mạch ngoại biên giai đoạn III, IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho chỉ định tim bẩm sinh tại các trung tâm tim mạch nhi khoa chuyên sâu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Botulinum toxin type A",
            "ma_icd": "G24.3, G80, G51.3, I69",
            "dieu_kien": "Vẹo cổ co thắt; Co thắt mi mắt; Co cứng cơ sau đột quỵ hoặc do bại não ở trẻ em.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ được thanh toán khi thực hiện bởi bác sĩ chuyên khoa Thần kinh hoặc Phục hồi chức năng đã được đào tạo về kỹ thuật tiêm Botulinum toxin.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Cinacalcet",
            "ma_icd": "N18.5, E21.1",
            "dieu_kien": "Điều trị cường tuyến cận giáp thứ phát ở bệnh nhân suy thận mạn giai đoạn cuối đang lọc máu.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi nồng độ PTH huyết thanh > 300 pg/mL và không kiểm soát được bằng các thuốc vitamin D hoặc các thuốc gắn kết phosphate.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Micafungin",
            "ma_icd": "B37, Z94",
            "dieu_kien": "Điều trị nhiễm nấm Candida xâm lấn; Dự phòng nhiễm nấm Candida ở bệnh nhân ghép tế bào gốc tạo máu hoặc bệnh nhân giảm bạch cầu hạt kéo dài.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Yêu cầu tương tự các thuốc kháng nấm thế hệ mới: Phải có bằng chứng vi sinh hoặc nguy cơ lâm sàng rất cao được hội chẩn thống nhất.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tigecycline (Dạng tiêm)",
            "ma_icd": "A41, J15, K65, L00-L08",
            "dieu_kien": "Nhiễm khuẩn da và tổ chức dưới da biến chứng; Nhiễm khuẩn ổ bụng biến chứng; Viêm phổi cộng đồng nặng.",
            "ghi_chu": "Thanh toán 100%. Chỉ định khi vi khuẩn đã kháng các kháng sinh khác hoặc bệnh nhân không dung nạp/thất bại với các phác đồ chuẩn. Bắt buộc hội chẩn với hội đồng thuốc và điều trị hoặc chuyên khoa Truyền nhiễm/Dược lâm sàng.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Donepezil",
            "ma_icd": "G30, F00",
            "dieu_kien": "Điều trị triệu chứng sa sút trí tuệ trong bệnh Alzheimer mức độ nhẹ, trung bình đến nặng.",
            "ghi_chu": "Thanh toán 100%. Chỉ định bởi bác sĩ chuyên khoa Tâm thần hoặc Thần kinh. Hồ sơ cần kết quả đánh giá thang điểm tâm thần (như MMSE) để làm căn cứ mức độ bệnh.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Galantamine",
            "ma_icd": "G30, F00",
            "dieu_kien": "Điều trị sa sút trí tuệ do bệnh Alzheimer mức độ nhẹ đến trung bình.",
            "ghi_chu": "Thanh toán 100%. Chỉ định bởi bác sĩ chuyên khoa Tâm thần hoặc Thần kinh. Tương tự Donepezil, cần theo dõi định kỳ hiệu quả trên lâm sàng.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Etanercept",
            "ma_icd": "M45, M05, M06, M08, L40.5",
            "dieu_kien": "Viêm cột sống dính khớp; Viêm khớp dạng thấp; Viêm khớp thiếu niên; Viêm khớp vảy nến.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhân không đáp ứng đầy đủ với các thuốc DMARDs kinh điển. Phải được thực hiện tại bệnh viện hạng I trở lên hoặc bệnh viện chuyên khoa Cơ xương khớp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Omalizumab",
            "ma_icd": "J45.0, L50.1",
            "dieu_kien": "Hen phế quản nặng do dị ứng không kiểm soát được bằng corticoid hít liều cao phối hợp thuốc giãn phế quản; Mày đay mạn tính tự phát kháng trị.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhân hen có bằng chứng xét nghiệm IgE huyết thanh tăng và phản ứng dị ứng dương tính. Yêu cầu bác sĩ chuyên khoa Hô hấp hoặc Dị ứng miễn dịch chỉ định.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Bosentan",
            "ma_icd": "I27.0",
            "dieu_kien": "Điều trị tăng áp lực động mạch phổi (PAH) nhóm 1 nhằm cải thiện khả năng vận động và giảm triệu chứng lâm sàng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Yêu cầu chẩn đoán xác định thông qua thông tim phải. Chỉ thanh toán tại các cơ sở chuyên khoa Tim mạch tuyến tỉnh/Trung ương.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuết",
            "ten": "Terlipressin (Dạng tiêm)",
            "ma_icd": "I85.0, K22.6, K76.7",
            "dieu_kien": "Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản; Hội chứng gan thận (Hepatorenal syndrome) typ 1.",
            "ghi_chu": "Thanh toán 100%. Lưu ý đối với hội chứng gan thận, chỉ thanh toán khi có hồ sơ chứng minh suy thận chức năng ở bệnh nhân xơ gan cổ trướng không đáp ứng với bù dịch Albumin.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ustekinumab",
            "ma_icd": "L40.0, K50, K51",
            "dieu_kien": "Vảy nến mảng mức độ vừa đến nặng; Bệnh Crohn; Viêm đại tràng loét nát mức độ vừa đến nặng.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi bệnh nhân đã thất bại hoặc không dung nạp với các thuốc điều trị hệ thống kinh điển hoặc các thuốc sinh học (Anti-TNF) khác.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Secukinumab",
            "ma_icd": "L40, M45, M46.8",
            "dieu_kien": "Vảy nến mảng mức độ vừa đến nặng; Viêm cột sống dính khớp hoạt động; Viêm khớp vảy nến.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phải được chẩn đoán và chỉ định bởi bác sĩ chuyên khoa Da liễu hoặc Cơ xương khớp tại các bệnh viện hạng I hoặc tuyến Trung ương.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Certolizumab pegol",
            "ma_icd": "M05, M06, M45, L40.5, K50",
            "dieu_kien": "Viêm khớp dạng thấp; Viêm cột sống dính khớp; Viêm khớp vảy nến; Bệnh Crohn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi các liệu pháp truyền thống không hiệu quả. Yêu cầu tuân thủ đúng phác đồ liều nạp và liều duy trì theo hướng dẫn của Bộ Y tế.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Pitavastatin",
            "ma_icd": "E78",
            "dieu_kien": "Điều trị tăng cholesterol máu tiên phát hoặc rối loạn lipid máu hỗn hợp.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân không dung nạp hoặc không đạt mục tiêu điều trị với các statin khác (Atorvastatin, Rosuvastatin) ở liều tối ưu.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Macitentan",
            "ma_icd": "I27.0",
            "dieu_kien": "Điều trị đơn trị liệu hoặc phối hợp để điều trị tăng áp lực động mạch phổi (PAH) nhóm 1 (WHO) ở bệnh nhân có mức độ triệu chứng NYHA nhóm II đến IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Bắt buộc phải có kết quả thông tim phải xác định áp lực động mạch phổi. Chỉ thanh toán tại bệnh viện hạng I trở lên chuyên khoa Tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "L-Ornithine L-Aspartate (Dạng tiêm)",
            "ma_icd": "K72, K70-K76",
            "dieu_kien": "Điều trị hôn mê gan, tiền hôn mê gan, hoặc các triệu chứng của bệnh não cửa chủ (hội chứng não gan).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho bệnh nhân nội trú có bằng chứng lâm sàng và xét nghiệm của bệnh não gan. Không thanh toán cho các trường hợp tăng men gan hoặc viêm gan thông thường.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Indacaterol + Glycopyrronium (LABA/LAMA)",
            "ma_icd": "J44",
            "dieu_kien": "Điều trị duy trì để làm giảm các triệu chứng và giảm các đợt cấp ở bệnh nhân phổi tắc nghẽn mạn tính (COPD).",
            "ghi_chu": "Thanh toán 100% tại bệnh viện hạng Đặc biệt, hạng I. Đối với bệnh viện hạng II, chỉ thanh toán khi có chẩn đoán xác định từ tuyến trên chuyển về hoặc kết quả hô hấp ký tại đơn vị.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Beraprost",
            "ma_icd": "I27.0, I73.1, I70.2",
            "dieu_kien": "Tăng áp lực động mạch phổi; Bệnh lý tắc nghẽn động mạch chi dưới mãn tính (bệnh Buerger).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định PAH yêu cầu kết quả siêu âm tim Doppler hoặc thông tim phải. Chỉ định tắc mạch chi yêu cầu bằng chứng chỉ số ABI hoặc siêu âm Doppler mạch máu.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Ranolazine",
            "ma_icd": "I20",
            "dieu_kien": "Điều trị bổ trợ cho bệnh nhân đau thắt ngực ổn định không được kiểm soát đầy đủ hoặc không dung nạp với các liệu pháp điều trị đau thắt ngực bước 1.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán khi bệnh nhân đã dùng ít nhất 02 loại thuốc (chẹn beta, chẹn calci, hoặc nitrat) nhưng không hiệu quả.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Aliskiren",
            "ma_icd": "I10-I15",
            "dieu_kien": "Điều trị tăng huyết áp vô căn.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Không thanh toán phối hợp với thuốc ức chế men chuyển (ACEI) hoặc ức chế thụ thể (ARB) ở bệnh nhân suy thận hoặc đái tháo đường do nguy cơ tác dụng phụ nghiêm trọng.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Esomeprazole / Pantoprazole (Dạng tiêm)",
            "ma_icd": "K25-K28, K21, I85.0",
            "dieu_kien": "Điều trị loét dạ dày tá tràng tiến triển có biến chứng chảy máu; Dự phòng chảy máu tái phát sau can thiệp nội soi; Hội chứng Zollinger-Ellison; Bệnh trào ngược thực quản (GERD) nặng khi không dùng được dạng uống.",
            "ghi_chu": "Thanh toán 100%. Bắt buộc hồ sơ bệnh án phải ghi rõ lý do không sử dụng được đường uống. Chuyển sang dạng uống ngay khi bệnh nhân có thể ăn uống được để tránh bị xuất toán phần chênh lệch giá.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Somatostatin (Dạng tiêm)",
            "ma_icd": "I85.0, K22.6, K25-K28",
            "dieu_kien": "Điều trị xuất huyết tiêu hóa cấp tính do vỡ giãn tĩnh mạch thực quản hoặc loét dạ dày tá tràng; Hỗ trợ điều trị rò tụy, rò ruột.",
            "ghi_chu": "Thanh toán 100%. Thời gian sử dụng thường giới hạn trong 48-72 giờ đầu của đợt cấp cứu chảy máu. Không thanh toán cho các mục đích dự phòng ngoài phẫu thuật tụy.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Budesonide + Formoterol + Glycopyrronium (Liệu pháp bộ ba)",
            "ma_icd": "J44",
            "dieu_kien": "Điều trị duy trì bệnh phổi tắc nghẽn mạn tính (COPD) mức độ vừa đến rất nặng ở người lớn không được kiểm soát đầy đủ bởi liệu pháp phối hợp LABA/LAMA hoặc ICS/LABA.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Yêu cầu hồ sơ bệnh án ghi nhận ít nhất 02 đợt cấp trong 12 tháng qua hoặc có tiền sử nhập viện vì đợt cấp COPD.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ambrisentan",
            "ma_icd": "I27.0",
            "dieu_kien": "Điều trị tăng áp lực động mạch phổi (PAH) nhóm 1 (WHO) để cải thiện khả năng vận động và làm chậm quá trình lâm sàng xấu đi.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định yêu cầu chẩn đoán xác định bằng thông tim phải. Chỉ thanh toán tại bệnh viện hạng I trở lên có chuyên khoa Tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Iloprost (Dạng phun sương hít)",
            "ma_icd": "I27.0, I27.2",
            "dieu_kien": "Điều trị tăng áp lực động mạch phổi nguyên phát hoặc thứ phát mức độ nặng (NYHA III-IV).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại các bệnh viện tuyến Trung ương có chuyên khoa Tim mạch nhi hoặc Tim mạch lớn. Yêu cầu hội chẩn chuyên sâu.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Budesonide (Hỗn dịch dùng cho máy xông khí dung)",
            "ma_icd": "J45, J05.0",
            "dieu_kien": "Điều trị cơn hen phế quản cấp; Viêm thanh quản cấp rít ở trẻ em.",
            "ghi_chu": "Thanh toán 100%. Thường bị soi xét nếu sử dụng dài ngày tại nhà cho bệnh nhân ổn định mà không chuyển sang dạng bình xịt định liều (MDI) có chi phí thấp hơn.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Milrinone (Dạng tiêm)",
            "ma_icd": "I50.1, I50.9",
            "dieu_kien": "Điều trị ngắn hạn suy tim cấp mất bù không đáp ứng với các thuốc vận mạch thông thường (như Dobutamine).",
            "ghi_chu": "Thanh toán 100%. Phải được sử dụng tại các đơn vị Hồi sức tích cực (ICU) hoặc Hồi sức tim mạch có đầy đủ phương tiện theo dõi huyết động liên tục.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Roflumilast (Dạng uống)",
            "ma_icd": "J44",
            "dieu_kien": "Điều trị duy trì bệnh phổi tắc nghẽn mạn tính (COPD) nặng liên quan đến viêm phế quản mạn tính và có tiền sử các đợt cấp thường xuyên.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định phối hợp với các thuốc giãn phế quản (LABA/LAMA). Chỉ thanh toán tại bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
            },
            {
            "loai": "Thuốc",
            "ten": "Cilostazol",
            "ma_icd": "I70.2, I73.9",
            "dieu_kien": "Cải thiện khoảng cách đi bộ không đau ở bệnh nhân đau cách hồi do bệnh động mạch ngoại biên.",
            "ghi_chu": "Thanh toán 100%. Hồ sơ bệnh án cần có bằng chứng cận lâm sàng (siêu âm Doppler mạch máu hoặc chỉ số ABI) xác nhận tình trạng tắc nghẽn động mạch chi dưới.",
            "nguon": "TT 20/2022/TT-BYT"
            },
        {
            "loai": "Thuốc",
            "ten": "Nicorandil",
            "ma_icd": "I20",
            "dieu_kien": "Điều trị đau thắt ngực ổn định ở bệnh nhân không được kiểm soát đầy đủ hoặc có chống chỉ định với các liệu pháp chống đau thắt ngực bước 1.",
            "ghi_chu": "Thanh toán 100%. Thường được dùng cho các bệnh nhân có bệnh lý mạch vành phức tạp không thể can thiệp hoặc đã can thiệp nhưng vẫn còn đau ngực.",
            "nguon": "TT 20/2022/TT-BYT"
            },
        {
            "loai": "Thuốc",
            "ten": "Montelukast",
            "ma_icd": "J45, J30",
            "dieu_kien": "Dự phòng và điều trị hen phế quản mạn tính; Giảm triệu chứng viêm mũi dị ứng.",
            "ghi_chu": "Thanh toán 100%. Đối với viêm mũi dị ứng, chỉ nên chỉ định khi các biện pháp tại chỗ (thuốc xịt mũi) không hiệu quả hoặc bệnh nhân có kèm theo hen phế quản.",
            "nguon": "TT 20/2022/TT-BYT"
            },
        {
            "loai": "Thuốc",
            "ten": "Doxofylline",
            "ma_icd": "J44, J45",
            "dieu_kien": "Điều trị hen phế quản và bệnh phổi tắc nghẽn mạn tính (COPD).",
            "ghi_chu": "Thanh toán 100%. Lưu ý không thanh toán đồng thời với các dẫn xuất Xanthine khác (như Theophylline) để tránh nguy cơ ngộ độc thuốc.",
            "nguon": "TT 20/2022/TT-BYT"
            },
        {
            "loai": "Thuốc",
            "ten": "Prostaglandin E1 (Alprostadil)",
            "ma_icd": "Q25.0, I70.2",
            "dieu_kien": "Duy trì tạm thời sự thông thương ống động mạch ở trẻ sơ sinh tim bẩm sinh; Bệnh lý tắc mạch chi nặng giai đoạn III-IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định cho trẻ sơ sinh yêu cầu thực hiện tại khoa Hồi sức sơ sinh hoặc Tim mạch nhi tuyến cuối.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Nintedanib",
            "ma_icd": "J84.1, M34.8",
            "dieu_kien": "Điều trị xơ phổi vô căn (IPF); Bệnh phổi kẽ có xơ hóa tiến triển; Bệnh phổi kẽ liên quan đến xơ cứng bì (SSc-ILD).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I có chuyên khoa Nội hô hấp hoặc Dị ứng miễn dịch. Yêu cầu có kết quả HRCT phổi và đo chức năng hô hấp (FVC) xác nhận tình trạng tiến triển.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Mepolizumab",
            "ma_icd": "J45.5, M30.1",
            "dieu_kien": "Điều trị bổ trợ cho bệnh hen phế quản nặng do tăng bạch cầu ái toan; Hội chứng Churg-Strauss (EGPA).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân không kiểm soát được bằng corticoid hít liều cao phối hợp thuốc giãn phế quản và có số lượng bạch cầu ái toan trong máu ≥ 150 tế bào/microlit.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Evolocumab",
            "ma_icd": "E78.0, E78.2, I20-I25",
            "dieu_kien": "Tăng cholesterol máu tiên phát hoặc rối loạn lipid máu hỗn hợp; Bệnh lý tim mạch do xơ vữa có nguy cơ rất cao.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân không đạt mục tiêu LDL-C dù đã dùng liều tối đa Statin phối hợp Ezetimibe. Phải được thực hiện tại bệnh viện hạng I trở lên chuyên khoa Tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Alteplase (rt-PA)",
            "ma_icd": "I63, I21, I26",
            "dieu_kien": "Tiêu sợi huyết trong nhồi máu não cấp; Nhồi máu cơ tim cấp; Thuyên tắc phổi cấp mức độ nặng.",
            "ghi_chu": "Thanh toán 100%. Rất dễ bị xuất toán nếu hồ sơ không ghi rõ thời điểm khởi phát (vàng 4.5 giờ đối với đột quỵ não) và các chống chỉ định theo bảng kiểm. Chỉ thanh toán tại cơ sở có đơn vị đột quỵ hoặc hồi sức cấp cứu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tenecteplase",
            "ma_icd": "I21",
            "dieu_kien": "Điều trị tiêu sợi huyết trong giai đoạn cấp của nhồi máu cơ tim có ST chênh lên.",
            "ghi_chu": "Thanh toán 100%. Điều kiện thanh toán ngặt nghèo về thời gian (trong vòng 6-12 giờ kể từ khi khởi phát triệu chứng). Phải có điện tâm đồ xác nhận ST chênh lên lưu trong hồ sơ bệnh án.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Trimetazidine",
            "ma_icd": "I20",
            "dieu_kien": "Liệu pháp bổ trợ/phối hợp trong điều trị đau thắt ngực ổn định.",
            "ghi_chu": "Thanh toán 100%. Lưu ý: Chỉ dùng cho bệnh nhân không kiểm soát đầy đủ hoặc không dung nạp với các thuốc điều trị đau thắt ngực bước 1 (như chẹn beta, nitrat). Xuất toán nếu chỉ định cho các triệu chứng chóng mặt, ù tai, rối loạn thị giác.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Bivalirudin (Dạng tiêm)",
            "ma_icd": "I20.0, I21, Z95.5",
            "dieu_kien": "Thuốc chống đông dùng cho bệnh nhân can thiệp mạch vành qua da (PCI).",
            "ghi_chu": "Thanh toán 100%. Chỉ thanh toán cho bệnh nhân có nguy cơ xuất huyết cao hoặc có tiền sử giảm tiểu cầu do Heparin (HIT). Bắt buộc có biên bản hội chẩn hoặc ghi chép thủ thuật can thiệp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Fosfomycin (Dạng tiêm)",
            "ma_icd": "A41, J15, N10, N30",
            "dieu_kien": "Nhiễm khuẩn nặng do vi khuẩn đa kháng thuốc như MRSA, VRE, hoặc vi khuẩn Gram âm tiết ESBL/Carbapenemase.",
            "ghi_chu": "Thanh toán 100%. Bắt buộc phối hợp với các kháng sinh khác để tránh kháng thuốc. Phải có kháng sinh đồ hoặc hội chẩn chuyên khoa Truyền nhiễm/Dược lâm sàng xác nhận tình trạng đa kháng.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Dipeptide N(2)-L-alanyl-L-glutamine (Dipeptiven)",
            "ma_icd": "E43, E44, R57",
            "dieu_kien": "Bổ sung vào phác đồ nuôi dưỡng tĩnh mạch cho bệnh nhân trong tình trạng chuyển hóa tăng vọt, suy kiệt nặng.",
            "ghi_chu": "Thanh toán 100%. Chỉ thanh toán cho bệnh nhân điều trị tại khoa Hồi sức tích cực (ICU), bệnh nhân hậu phẫu nặng, bỏng nặng hoặc đa chấn thương. Không thanh toán cho mục đích bồi bổ thông thường.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Vasopressin (Dạng tiêm)",
            "ma_icd": "R57, I85.0",
            "dieu_kien": "Sốc giãn mạch (sốc nhiễm khuẩn) không đáp ứng với các thuốc vận mạch liều chuẩn; Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản.",
            "ghi_chu": "Thanh toán 100%. Chỉ định trong sốc yêu cầu phải đang sử dụng Norepinephrine nhưng huyết áp vẫn không đạt mục tiêu. Chỉ thanh toán tại khoa Hồi sức/Cấp cứu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tenofovir alafenamide (TAF)",
            "ma_icd": "B18.0, B18.1",
            "dieu_kien": "Điều trị viêm gan vi rút B mạn tính ở người lớn và thanh thiếu niên (từ 12 tuổi và nặng ít nhất 35kg).",
            "ghi_chu": "Thanh toán 100%. CHỈ thanh toán khi người bệnh có ít nhất một trong các tiêu chuẩn: Xơ gan; Suy thận (eGFR < 60 ml/phút); Loãng xương hoặc nguy cơ loãng xương cao; Hoặc có bằng chứng thất bại/chống chỉ định với Tenofovir disoproxil fumarate (TDF).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Dapagliflozin / Empagliflozin (Nhóm SGLT2i)",
            "ma_icd": "E11, I50, N18",
            "dieu_kien": "Điều trị đái tháo đường typ 2; Suy tim mạn tính (HFrEF hoặc HFpEF); Bệnh thận mạn tính.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Đối với chỉ định suy tim, yêu cầu phân suất tống máu (LVEF) theo đúng phác đồ hướng dẫn của Bộ Y tế. Đối với bệnh thận mạn, cần theo dõi mức lọc cầu thận (eGFR) để đảm bảo ngưỡng an toàn cho phép.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sacubitril + Valsartan (Nhóm ARNI)",
            "ma_icd": "I50",
            "dieu_kien": "Điều trị suy tim mạn tính có phân suất tống máu giảm (HFrEF), mức độ NYHA II-IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân vẫn còn triệu chứng mặc dù đã điều trị bằng phác đồ chuẩn (ƯCMC/ƯCTT + Chẹn Beta + Kháng Aldosteron) tối thiểu 01 tháng. Chỉ thực hiện tại BV hạng I trở lên hoặc BV chuyên khoa tim mạch.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sitagliptin / Vildagliptin / Saxagliptin (Nhóm DPP-4i)",
            "ma_icd": "E11",
            "dieu_kien": "Điều trị đái tháo đường typ 2 ở người trưởng thành.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phối hợp với Metformin hoặc các thuốc hạ đường huyết khác khi không kiểm soát được đường huyết hoặc không dung nạp với phác đồ cơ bản. Không phối hợp đồng thời với các thuốc nhóm đồng vận thụ thể GLP-1.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Cinacalcet",
            "ma_icd": "N18.5, E21.1",
            "dieu_kien": "Điều trị cường tuyến cận giáp thứ phát ở bệnh nhân suy thận mạn giai đoạn cuối đang lọc máu.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Điều kiện bắt buộc: Nồng độ hormone tuyến cận giáp (PTH) trong máu > 300 pg/mL và đã thất bại với các thuốc điều trị thông thường (vitamin D, thuốc gắn phosphat).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sevelamer",
            "ma_icd": "N18.5",
            "dieu_kien": "Kiểm soát nồng độ phospho máu ở bệnh nhân suy thận mạn giai đoạn cuối đang thực hiện lọc máu.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi nồng độ phospho máu > 1,78 mmol/L (5,5 mg/dL) mặc dù đã dùng các thuốc gắn kết phospho chứa calci hoặc bệnh nhân có tình trạng tăng calci máu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Somatropin (Hormone tăng trưởng)",
            "ma_icd": "E23.0, Q96, N18",
            "dieu_kien": "Chậm tăng trưởng do thiếu hormone tăng trưởng, hội chứng Turner, suy thận mạn tính ở trẻ em.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán cho trẻ em chưa liền đầu xương, được chẩn đoán và chỉ định bởi bác sĩ chuyên khoa Nhi - Nội tiết tại bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Epoetin (Alpha, Beta, Kappa)",
            "ma_icd": "N18",
            "dieu_kien": "Điều trị thiếu máu do suy thận mạn tính (đặc biệt bệnh nhân chạy thận nhân tạo).",
            "ghi_chu": "Thanh toán 100%. Ngưỡng thanh toán ngặt nghèo: Bắt đầu dùng khi Hb < 10g/dL và phải ngừng hoặc giảm liều khi Hb đạt ngưỡng 11.5g/dL. Hồ sơ phải kèm xét nghiệm nồng độ sắt/ferritin để làm căn cứ điều trị phối hợp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Albumin người (Dịch truyền)",
            "ma_icd": "R57.1, E43, K74.6",
            "dieu_kien": "Sốc giảm thể tích; Giảm Albumin máu nặng (thường < 20g/L); Xơ gan cổ trướng đại thể.",
            "ghi_chu": "Thanh toán 100%. Lưu ý xuất toán: Hồ sơ bệnh án phải có xét nghiệm Albumin máu đạt ngưỡng quy định trước khi truyền. Không thanh toán cho mục đích nuôi dưỡng hoặc chỉ định sai ngưỡng sinh hóa.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Donepezil / Rivastigmine / Memantine",
            "ma_icd": "G30, F00",
            "dieu_kien": "Điều trị sa sút trí tuệ trong bệnh Alzheimer mức độ nhẹ, trung bình đến nặng.",
            "ghi_chu": "Thanh toán 100%. Yêu cầu chẩn đoán và kê đơn bởi bác sĩ chuyên khoa Tâm thần hoặc Thần kinh. Hồ sơ cần có thang điểm MMSE hoặc các thang điểm nhận thức tương đương để xác định giai đoạn bệnh.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Tocilizumab",
            "ma_icd": "M05, M06, M08, M31.4",
            "dieu_kien": "Viêm khớp dạng thấp tiến triển nặng; Viêm khớp thiếu niên tự phát; Viêm động mạch Takayasu.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi bệnh nhân không đáp ứng đầy đủ với các thuốc DMARD kinh điển. Bắt buộc hội chẩn chuyên khoa Cơ xương khớp tại bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Interferon / Peginterferon (Hóa dược)",
            "ma_icd": "B18.1, B18.2",
            "dieu_kien": "Điều trị viêm gan vi rút B hoặc C mạn tính.",
            "ghi_chu": "Tỷ lệ thanh toán dao động từ 30% đến 100% tùy loại hoạt chất cụ thể (Peginterferon thường 30%). Yêu cầu xét nghiệm tải lượng vi rút và bằng chứng tổn thương gan (men gan/xơ hóa) theo phác đồ Bộ Y tế.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Botulinum toxin type A",
            "ma_icd": "G24.3, G80, I69",
            "dieu_kien": "Vẹo cổ co thắt; Co thắt mi mắt; Co cứng cơ sau đột quỵ hoặc do bại não ở trẻ em.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Phải được thực hiện bởi bác sĩ chuyên khoa Thần kinh hoặc Phục hồi chức năng đã được đào tạo kỹ thuật tiêm. Không thanh toán cho mục đích thẩm mỹ.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Levetiracetam",
            "ma_icd": "G40, G41",
            "dieu_kien": "Đơn trị liệu hoặc phối hợp điều trị các loại động kinh.",
            "ghi_chu": "Thanh toán 100%. Tuy nhiên, tại bệnh viện hạng III và hạng IV, chỉ được thanh toán khi có chẩn đoán xác định và chỉ định của tuyến trên chuyển về (hạng Đặc biệt, I, II).",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Octreotide (Dạng tiêm)",
            "ma_icd": "I85.0, E22.0, C7A",
            "dieu_kien": "Xuất huyết tiêu hóa do vỡ giãn tĩnh mạch thực quản; Bệnh to đầu chi; U nội tiết tuyến tụy.",
            "ghi_chu": "Thanh toán 100% đối với cấp cứu xuất huyết tiêu hóa. Thanh toán 50% đối với các chỉ định bệnh lý mạn tính (To đầu chi, U nội tiết). Yêu cầu hội chẩn chuyên khoa Nội tiêu hóa hoặc Nội tiết.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ranibizumab / Aflibercept (Tiêm nội nhãn)",
            "ma_icd": "H35.3, H35.32, H36.0, H34.8",
            "dieu_kien": "Thoái hóa hoàng điểm tuổi già thể ướt (nAMD); Phù hoàng điểm do đái tháo đường (DME) hoặc do tắc tĩnh mạch võng mạc.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ thanh toán tại bệnh viện hạng Đặc biệt, hạng I. Phải có ảnh chụp cắt lớp võng mạc (OCT) để xác định tình trạng bệnh.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Alteplase (Tiêu sợi huyết rt-PA)",
            "ma_icd": "I63, I21, I26",
            "dieu_kien": "Nhồi máu não cấp trong 'giờ vàng' (thường < 4.5h); Nhồi máu cơ tim cấp; Thuyên tắc phổi cấp mức độ nặng.",
            "ghi_chu": "Thanh toán 100%. Hồ sơ bệnh án phải ghi chính xác thời điểm khởi phát triệu chứng và bảng kiểm chống chỉ định. Chỉ thanh toán tại cơ sở có đơn vị đột quỵ hoặc hồi sức cấp cứu chuyên sâu.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Yếu tố IX (Đông máu)",
            "ma_icd": "D67",
            "dieu_kien": "Điều trị và dự phòng chảy máu ở bệnh nhân Hemophilia B.",
            "ghi_chu": "Thanh toán 100%. Bắt buộc có xét nghiệm định lượng nồng độ yếu tố IX trong máu. Điều trị dự phòng chỉ áp dụng theo quy trình chuyên môn tại các trung tâm Hemophilia hoặc chuyên khoa Huyết học.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Micafungin (Dạng tiêm)",
            "ma_icd": "B37, Z94",
            "dieu_kien": "Nhiễm nấm Candida xâm lấn; Dự phòng nấm Candida ở bệnh nhân ghép tế bào gốc tạo máu hoặc giảm bạch cầu hạt nặng kéo dài.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định yêu cầu bằng chứng vi sinh (cấy nấm) hoặc nguy cơ lâm sàng cao được hội chẩn thống nhất tại bệnh viện hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Colistin (Dạng tiêm)",
            "ma_icd": "A41, J15, K65",
            "dieu_kien": "Nhiễm khuẩn nặng do vi khuẩn Gram âm đa kháng (A.baumannii, P.aeruginosa, K.pneumoniae) khi đã kháng Carbapenem.",
            "ghi_chu": "Thanh toán 100%. Bắt buộc có hội chẩn chuyên khoa hoặc bằng chứng kháng sinh đồ. Cần theo dõi sát chức năng thận để tránh độc tính gây xuất toán do sai liều.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Ticagrelor",
            "ma_icd": "I20.0, I21, I22",
            "dieu_kien": "Hội chứng mạch vành cấp (NMCT có ST chênh lên, NMCT không ST chênh lên, đau thắt ngực không ổn định).",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Thời gian thanh toán tối đa không quá 12 tháng kể từ sau biến cố mạch vành cấp.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Rivaroxaban / Dabigatran / Apixaban (NOACs)",
            "ma_icd": "I48, I80, I26",
            "dieu_kien": "Dự phòng đột quỵ trong rung nhĩ không do bệnh lý van tim; Điều trị và dự phòng thuyên tắc tĩnh mạch sâu/thuyên tắc phổi.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Rung nhĩ yêu cầu điểm CHA2DS2-VASc ≥ 2 (nam) hoặc ≥ 3 (nữ). Không thanh toán cho bệnh nhân có van tim cơ học.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Bosentan / Ambrisentan",
            "ma_icd": "I27.0",
            "dieu_kien": "Điều trị tăng áp lực động mạch phổi (PAH) nhóm 1 (WHO) mức độ NYHA II-IV.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Bắt buộc có kết quả thông tim phải xác định áp lực mạch phổi. Chỉ thanh toán tại cơ sở chuyên khoa tim mạch hạng I trở lên.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Desmopressin (Dạng xịt, uống)",
            "ma_icd": "E23.2, R32",
            "dieu_kien": "Đái tháo nhạt trung ương; Đái dầm ban đêm tiên phát ở trẻ em từ 5 tuổi trở lên.",
            "ghi_chu": "Thanh toán 100% cho đái tháo nhạt. Đái dầm chỉ thanh toán khi can thiệp hành vi thất bại và được bác sĩ chuyên khoa Nhi/Thận chỉ định.",
            "nguon": "TT 20/2022/TT-BYT"
        },
        {
            "loai": "Thuốc",
            "ten": "Sevelamer / Lanthanum carbonate",
            "ma_icd": "N18.5",
            "dieu_kien": "Kiểm soát phospho máu ở bệnh nhân suy thận mạn giai đoạn cuối đang lọc máu.",
            "ghi_chu": "Quỹ BHYT thanh toán 50%. Chỉ định khi phospho máu > 1,78 mmol/L (5,5 mg/dL) mặc dù đã dùng thuốc gắn phospho chứa calci hoặc có tình trạng tăng calci máu.",
            "nguon": "TT 20/2022/TT-BYT"
        }

    ]