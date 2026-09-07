// Danh mục Ánh xạ Quy tắc BHYT (Cận lâm sàng, Thuốc & Can thiệp) với Mã ICD-10 Bắt Buộc
// Tổng hợp từ Thông tư 35/2016, 50/2017, Quyết định 1849 & Extension Kiểm tra Bảng kê BHYT
window.BHYT_MAPPINGS = [
    // --- Các Cận lâm sàng nhỏ & Thường quy (Bắt buộc có ICD theo BHYT) ---
    {
        id: "cls-duong-mau-mao-mach",
        category: "CLS",
        name: "Xét nghiệm đường máu mao mạch tại giường",
        condition: "Bắt buộc hồ sơ phải có một trong các mã ICD về Đái tháo đường, hạ đường huyết hoặc rối loạn glucose.",
        icdCodes: ["E10", "E11", "E16.0", "E16.1", "E16.2", "E87.5", "R73", "R73.9"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "cls-dinh-luong-ure",
        category: "CLS",
        name: "Định lượng Urê [Máu]",
        condition: "Bắt buộc có mã ICD suy thận, rối loạn chuyển hóa đạm hoặc tiểu máu/protein niệu.",
        icdCodes: ["N18", "N17", "D59.3", "E72.2", "R39.2"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "cls-dinh-luong-crp-full",
        category: "CLS",
        name: "Định lượng CRP (C-Reactive Protein)",
        condition: "Bắt buộc có mã ICD phản ứng viêm, nhiễm trùng hoặc bệnh lý mạch vành/tự miễn.",
        icdCodes: ["J21", "J06.9", "J85.1", "R57.2", "K35", "K65.9", "K75", "G00", "G04", "G06", "A49.9", "R50.9", "A41", "J18", "J15", "J44.1", "N10", "N39.0", "N30", "N41.0", "J20", "L03.90", "L02.9", "M00.9", "M86.9", "M79.3", "M32.9", "I20", "I21", "I22", "I23", "I24", "I25"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "cls-troponin",
        category: "CLS",
        name: "Xét nghiệm Troponin I / T",
        condition: "Bắt buộc có mã ICD Hội chứng mạch vành cấp, Nhồi máu cơ tim hoặc Cơn đau thắt ngực.",
        icdCodes: ["I20", "I21", "I22", "I23", "I24", "I25"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "cls-ckmb",
        category: "CLS",
        name: "Xét nghiệm CK-MB",
        condition: "Bắt buộc có mã ICD liên quan Nhồi máu cơ tim cấp hoặc Thiếu máu cục bộ cơ tim.",
        icdCodes: ["I20", "I21", "I22", "I23", "I24", "I25"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "cls-nt-probnp",
        category: "CLS",
        name: "Định lượng NT-proBNP / BNP",
        condition: "Bắt buộc có mã ICD Suy tim (I50) hoặc các thể suy tim kèm suy thận.",
        icdCodes: ["I50", "I50.0", "I50.1", "I50.9", "N18"],
        note: "Quy tắc kiểm tra xuất toán BHYT - TT 35/2016"
    },
    {
        id: "canthiep-sonde-bang-quang",
        category: "Can thiệp",
        name: "Kỹ thuật Đặt sonde bàng quang",
        condition: "Bắt buộc có mã ICD Bí tiểu, Viêm/Phì đại tiền liệt tuyến, Suy thận hoặc Cấp cứu.",
        icdCodes: ["R33", "N40", "N41", "N17", "N18"],
        note: "Quy tắc kiểm tra xuất toán BHYT"
    },
    {
        id: "canthiep-than-nhan-tao-thuong-quy",
        category: "Can thiệp",
        name: "Thận nhân tạo thường quy (Lọc máu chu kỳ)",
        condition: "Bắt buộc có mã ICD Suy thận mạn giai đoạn cuối (N18.5).",
        icdCodes: ["N18.5"],
        note: "Quy tắc kiểm tra xuất toán BHYT - TT 35/2016"
    },

    // --- Các Cận lâm sàng & Thuốc Chuyên sâu khác ---
    {
        id: "cls-hba1c",
        category: "CLS",
        name: "Định lượng HbA1c",
        condition: "Chẩn đoán, theo dõi hiệu quả điều trị đái tháo đường. Thanh toán tối đa 1 lần/3 tháng.",
        icdCodes: ["E10", "E11", "E12", "E13", "E14", "O24", "R73.0"],
        note: "Thông tư 35/2016/TT-BYT"
    },
    {
        id: "cls-pet-ct",
        category: "CLS",
        name: "Chụp PET/CT",
        condition: "Chẩn đoán giai đoạn, di căn hoặc đáp ứng điều trị ung thư (Vòm, Phổi, Dạ dày, Vú, Lymphoma...). Thanh toán tối đa 01 lần/12 tháng.",
        icdCodes: ["C11", "C15", "C16", "C18", "C19", "C20", "C34", "C50", "C53", "C56", "C81", "C82", "C83", "C85", "C90"],
        note: "Thông tư 35/2016/TT-BYT"
    },
    {
        id: "cls-ca125",
        category: "CLS",
        name: "Định lượng CA 125 (Chỉ điểm u)",
        condition: "Chẩn đoán và theo dõi điều trị ung thư Buồng trứng.",
        icdCodes: ["C56", "D27", "N80"],
        note: "Thông tư 50/2017/TT-BYT"
    },
    {
        id: "cls-ca153",
        category: "CLS",
        name: "Định lượng CA 15-3 (Chỉ điểm u)",
        condition: "Chẩn đoán và theo dõi điều trị ung thư Vú.",
        icdCodes: ["C50", "D05", "D24"],
        note: "Thông tư 50/2017/TT-BYT"
    },
    {
        id: "cls-ca199",
        category: "CLS",
        name: "Định lượng CA 19-9 (Chỉ điểm u)",
        condition: "Chẩn đoán và theo dõi điều trị ung thư Tụy, Ung thư Đường mật.",
        icdCodes: ["C25", "C22.1", "C24"],
        note: "Thông tư 50/2017/TT-BYT"
    },
    {
        id: "cls-ct-64-128",
        category: "CLS",
        name: "Chụp cắt lớp vi tính (CT Scanner) 64 - 128 dãy",
        condition: "Chụp hệ động mạch (Não, Cảnh, Chủ, Vành), Đánh giá tưới máu não hoặc di căn ung thư.",
        icdCodes: ["I63", "I61", "I71", "I25.1", "C34", "C18"],
        note: "Thông tư 35/2016/TT-BYT"
    },
    {
        id: "cls-mri",
        category: "CLS",
        name: "Chụp cộng hưởng từ (MRI)",
        condition: "Chẩn đoán tổn thương Thần kinh, Cột sống, Xương khớp hoặc Khối u.",
        icdCodes: ["I63", "G35", "M50", "M51", "C71", "M23"],
        note: "Thông tư 50/2017/TT-BYT"
    },
    {
        id: "thuoc-insulin",
        category: "Thuốc",
        name: "Thuốc tiêm Insulin (Các loại)",
        condition: "Chỉ định thanh toán BHYT cho ĐTĐ tuýp 1, ĐTĐ tuýp 2 có biến chứng/thất bại thuốc viên, ĐTĐ thai kỳ.",
        icdCodes: ["E10", "E11", "E12", "E13", "E14", "O24"],
        note: "Thông tư 30/2018/TT-BYT"
    },
    {
        id: "pttt-stent-vanh",
        category: "Can thiệp",
        name: "Đặt Stent động mạch vành phủ thuốc",
        condition: "Nhồi máu cơ tim cấp có/không ST chênh lên, Đau thắt ngực không ổn định.",
        icdCodes: ["I21", "I21.0", "I21.1", "I20.0", "I25.1"],
        note: "Thông tư 50/2017/TT-BYT"
    },
    {
        id: "can-thiep-tiem-khop",
        category: "Can thiệp",
        name: "Kỹ thuật Tiêm khớp (Khớp / Gân / Cạnh cột sống)",
        condition: "Mỗi đợt tiêm không quá 3 vị trí, mỗi vị trí không quá 1 mũi và không quá 3 đợt/12 tháng.",
        icdCodes: ["M15", "M16", "M17", "M05", "M06", "M54.5"],
        note: "Thông tư 50/2017/TT-BYT"
    }
];
