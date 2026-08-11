/**
 * OSCE Countdown Arena — CliniPortal
 * Nâng cấp toàn diện từ OSCE Randomizer
 * Features: Multi-difficulty, Marathon Mode, History Tracking, Circular Timer, Instant Feedback
 */

/* ======================== CASE BANK ======================== */
const OSCE_CASES = [
    /* ── BASIC (Cơ bản) ── */
    {
        id: "B1", difficulty: "basic",
        category: "Tim mạch", title: "Khám bệnh nhân đau ngực",
        patient: "Nguyễn Văn A, 65 tuổi, Nam",
        vitals: "Mạch 110 l/p, HA 160/90, Nhịp thở 22, SpO₂ 96%",
        scenario: "Bệnh nhân vào viện vì đau tức ngực trái lan ra tay trái, kéo dài 30 phút không đỡ. Bệnh nhân vã mồ hôi. Bạn có 8 phút để thực hiện khám tim mạch lâm sàng (nhìn, sờ, gõ, nghe) và đề xuất cận lâm sàng ban đầu.",
        duration: 8 * 60,
        checklist: [
            { text: "Chào hỏi, giới thiệu bản thân và giải thích thủ thuật", pts: 1, critical: false },
            { text: "Rửa tay / sát khuẩn tay nhanh", pts: 1, critical: false },
            { text: "Bộc lộ vùng ngực đúng cách, giữ kín đáo", pts: 1, critical: false },
            { text: "NHÌN: Tuần hoàn bàng hệ, sẹo mổ cũ, mỏm tim đập", pts: 2, critical: false },
            { text: "SỜ: Mỏm tim, rung miêu, dấu Harzer", pts: 2, critical: false },
            { text: "NGHE: Tim tại 4 ổ van cơ bản (ĐMC, ĐMP, 2 lá, 3 lá)", pts: 3, critical: true },
            { text: "Đo huyết áp cả 2 tay", pts: 1, critical: false },
            { text: "Đề xuất ECG 12 chuyển đạo + Men tim (Troponin) ngay", pts: 2, critical: true }
        ],
        keyPoints: [
            "Đau ngực cấp kèm vã mồ hôi → phải nghĩ STEMI trước tiên",
            "ECG + Troponin phải được thực hiện trong 10 phút đầu",
            "Nghe tim 4 ổ van: Aortic (KLS 2 phải) → Pulmonic (KLS 2 trái) → Tricuspid (bờ trái xương ức) → Mitral (mỏm tim)"
        ]
    },
    {
        id: "B2", difficulty: "basic",
        category: "Hô hấp", title: "Bệnh nhân khó thở cấp",
        patient: "Trần Thị B, 45 tuổi, Nữ",
        vitals: "Mạch 120 l/p, HA 130/80, SpO₂ 88%, Nhịp thở 28",
        scenario: "Bệnh nhân có tiền sử hen phế quản, vào viện vì khó thở dữ dội, khò khè nghe rõ từ xa. Bạn có 8 phút để thực hiện khám hô hấp, đánh giá mức độ nặng và xử trí ban đầu.",
        duration: 8 * 60,
        checklist: [
            { text: "Chào hỏi nhanh, gọi hỗ trợ điều dưỡng", pts: 1, critical: false },
            { text: "Đo SpO₂ và cho thở oxy ngay (mục tiêu ≥ 94%)", pts: 2, critical: true },
            { text: "Quan sát nhịp thở, tư thế (chống 3 chân?), co kéo cơ hô hấp phụ", pts: 2, critical: false },
            { text: "Gõ phổi đánh giá ứ khí / tràn dịch / tràn khí", pts: 1, critical: false },
            { text: "Nghe phổi 2 bên: ran rít, ran ngáy, rì rào phế nang giảm?", pts: 3, critical: true },
            { text: "Đánh giá mức độ nặng (nói được câu đầy đủ? Kích thích?)", pts: 1, critical: false },
            { text: "Chỉ định phun khí dung Salbutamol 5mg ngay", pts: 2, critical: true }
        ],
        keyPoints: [
            "SpO₂ < 92% = hen nặng, cần xử trí tích cực",
            "Không nghe được ran rít (silent chest) = cơn hen nguy kịch, không phải cải thiện",
            "Salbutamol 5mg phun khí dung, có thể lặp lại mỗi 20 phút × 3 lần trong giờ đầu"
        ]
    },
    {
        id: "B3", difficulty: "basic",
        category: "Tiêu hóa", title: "Bệnh nhân đau bụng cấp",
        patient: "Lê Văn C, 25 tuổi, Nam",
        vitals: "Mạch 90 l/p, HA 120/70, Nhiệt độ 38.5°C",
        scenario: "Bệnh nhân đau quanh rốn từ chiều hôm qua, nay khu trú ở hố chậu phải, kèm buồn nôn, sốt nhẹ. Bạn có 8 phút để khám bụng và làm các nghiệm pháp cần thiết.",
        duration: 8 * 60,
        checklist: [
            { text: "Chào hỏi và bộc lộ vùng bụng từ mũi ức đến nếp bẹn", pts: 1, critical: false },
            { text: "NHÌN: Bụng di động theo nhịp thở, sẹo mổ cũ, chướng?", pts: 1, critical: false },
            { text: "NGHE nhu động ruột TRƯỚC KHI SỜ", pts: 1, critical: true },
            { text: "SỜ nhẹ: từ vùng không đau → đến vùng đau", pts: 2, critical: true },
            { text: "Dấu MacBurney (điểm đau 1/3 ngoài đường nối rốn–GCTP)", pts: 3, critical: true },
            { text: "Phản ứng dội (Blumberg sign)", pts: 2, critical: true },
            { text: "Dấu Rovsing, Psoas hoặc Obturator", pts: 2, critical: false }
        ],
        keyPoints: [
            "Đau di chuyển từ quanh rốn → hố chậu phải = dấu hiệu kinh điển viêm ruột thừa",
            "Luôn NGHE trước SỜ trong khám bụng — sờ bụng có thể thay đổi nhu động",
            "Blumberg (+) gợi ý viêm phúc mạc khu trú"
        ]
    },
    {
        id: "B4", difficulty: "basic",
        category: "Thần kinh", title: "Đánh giá bệnh nhân đột quỵ",
        patient: "Phạm Thị D, 70 tuổi, Nữ",
        vitals: "Mạch 85 l/p, HA 180/100, GCS 13 (E4V4M5)",
        scenario: "Bệnh nhân đột ngột yếu nửa người trái và nói ngọng cách đây 1 giờ. Bạn có 8 phút để đánh giá tri giác, khám dây thần kinh sọ và cơ lực.",
        duration: 8 * 60,
        checklist: [
            { text: "Đánh giá chi tiết điểm Glasgow (E + V + M)", pts: 2, critical: true },
            { text: "Khám dấu màng não: Cổ gượng, Kernig, Brudzinski", pts: 1, critical: false },
            { text: "Khám liệt mặt (CN VII) — nhắm mắt, nhe răng, nhăn trán", pts: 2, critical: true },
            { text: "Đánh giá sức cơ 2 bên (chi trên + chi dưới) theo thang 0–5", pts: 2, critical: true },
            { text: "Khám phản xạ gân xương, dấu Babinski", pts: 2, critical: false },
            { text: "Kích hoạt quy trình Code Stroke / gọi CT scan khẩn", pts: 2, critical: true }
        ],
        keyPoints: [
            "Cửa sổ vàng tái thông mạch: < 4.5h cho rTPA, < 24h cho lấy huyết khối cơ học",
            "Liệt mặt trung ương: chỉ liệt 1/4 dưới mặt đối bên. Liệt ngoại biên: liệt toàn bộ nửa mặt cùng bên",
            "GCS ≤ 8 → cần đặt NKQ bảo vệ đường thở"
        ]
    },

    /* ── INTERMEDIATE (Trung bình) ── */
    {
        id: "I1", difficulty: "intermediate",
        category: "Nội tiết", title: "Bệnh nhân hôn mê hạ đường huyết",
        patient: "Võ Thị E, 55 tuổi, Nữ, ĐTĐ type 2",
        vitals: "Mạch 110, HA 100/60, Nhiệt 36.2°C, Đường huyết mao mạch 35 mg/dL",
        scenario: "Bệnh nhân được đưa vào cấp cứu trong tình trạng lơ mơ, vã mồ hôi lạnh, da ẩm. Tiền sử ĐTĐ type 2 đang dùng Glibenclamide + Metformin. Bạn có 8 phút để đánh giá, xử trí cấp cứu và tìm nguyên nhân.",
        duration: 8 * 60,
        checklist: [
            { text: "Đánh giá ABCDE nhanh, kiểm tra tri giác GCS", pts: 2, critical: true },
            { text: "Xác nhận đường huyết mao mạch < 70 mg/dL", pts: 2, critical: true },
            { text: "Thiết lập đường truyền tĩnh mạch", pts: 1, critical: true },
            { text: "Tiêm Glucose 30% 50mL IV bolus", pts: 3, critical: true },
            { text: "Theo dõi đường huyết mỗi 15 phút sau tiêm", pts: 1, critical: false },
            { text: "Nhận diện Glibenclamide (sulfonylurea) gây hạ ĐH kéo dài", pts: 2, critical: false },
            { text: "Duy trì truyền Glucose 10% — SU gây hạ ĐH tái phát", pts: 2, critical: true },
            { text: "Hỏi bữa ăn gần nhất, liều thuốc, thay đổi hoạt động", pts: 1, critical: false }
        ],
        keyPoints: [
            "Quy tắc 50-50: Glucose 50% × 50mL hoặc Glucose 30% × 50mL tiêm IV bolus",
            "Sulfonylurea (Glibenclamide) có thể gây hạ đường huyết kéo dài → cần truyền G10% duy trì",
            "Whipple's triad: (1) Triệu chứng hạ ĐH + (2) ĐH thấp + (3) Hồi phục khi bù glucose"
        ]
    },
    {
        id: "I2", difficulty: "intermediate",
        category: "Cấp cứu", title: "Phản vệ sau tiêm kháng sinh",
        patient: "Ngô Văn F, 30 tuổi, Nam",
        vitals: "Mạch 130 l/p, HA 70/40, SpO₂ 90%, Nhịp thở 30",
        scenario: "Bệnh nhân được tiêm Amoxicillin-Clavulanate TM 5 phút trước. Đột ngột khó thở, nổi mề đay toàn thân, phù mặt, tụt huyết áp. Bạn có 8 phút để xử trí cấp cứu phản vệ.",
        duration: 8 * 60,
        checklist: [
            { text: "NGỪNG NGAY thuốc gây dị ứng (kháng sinh)", pts: 2, critical: true },
            { text: "Gọi hỗ trợ, hô to 'Phản vệ!' để kích hoạt ekip", pts: 1, critical: true },
            { text: "Đặt bệnh nhân nằm đầu thấp, chân cao", pts: 1, critical: false },
            { text: "Tiêm Adrenaline 0.5mg IM vào mặt trước ngoài đùi", pts: 3, critical: true },
            { text: "Truyền dịch NaCl 0.9% bolus 500-1000 mL", pts: 2, critical: true },
            { text: "Đánh giá lại sau 5 phút — lặp Adrenaline nếu chưa đáp ứng", pts: 2, critical: true },
            { text: "Cho Methylprednisolone 1-2mg/kg IV", pts: 1, critical: false },
            { text: "Ghi nhận dị ứng Penicillin vào hồ sơ bệnh nhân", pts: 1, critical: false }
        ],
        keyPoints: [
            "Adrenaline IM (KHÔNG IV ở phản vệ thông thường) — liều 0.5mg = 0.5mL Adrenaline 1:1000",
            "Tiêm mặt trước ngoài đùi (vastus lateralis) — hấp thu nhanh nhất",
            "Phản vệ 2 pha: 20% trường hợp tái phát sau 4-8h → theo dõi tối thiểu 24h"
        ]
    },
    {
        id: "I3", difficulty: "intermediate",
        category: "Thận - Tiết niệu", title: "Bệnh nhân tăng Kali máu cấp",
        patient: "Đặng Văn G, 60 tuổi, Nam, suy thận mạn gđ 4",
        vitals: "Mạch 50 l/p, HA 150/90, K⁺ = 7.2 mmol/L",
        scenario: "Bệnh nhân suy thận mạn, bỏ lọc máu 2 tuần. ECG có sóng T cao nhọn, QRS giãn rộng. Bạn có 8 phút để xử trí tăng Kali máu đe dọa tính mạng.",
        duration: 8 * 60,
        checklist: [
            { text: "Đánh giá ECG: sóng T cao nhọn, QRS giãn, mất sóng P?", pts: 2, critical: true },
            { text: "Calcium Gluconate 10% 10mL IV chậm (bảo vệ tim)", pts: 3, critical: true },
            { text: "Insulin 10 UI + Glucose 50% 50mL IV (đưa K⁺ vào nội bào)", pts: 2, critical: true },
            { text: "Salbutamol 10-20mg phun khí dung (đưa K⁺ vào nội bào)", pts: 2, critical: false },
            { text: "Sodium Bicarbonate nếu toan chuyển hóa", pts: 1, critical: false },
            { text: "Kayexalate (Sodium Polystyrene) để thải K⁺ qua ruột", pts: 1, critical: false },
            { text: "Liên hệ khoa Thận để lọc máu cấp cứu", pts: 2, critical: true },
            { text: "Theo dõi monitor liên tục, lặp ECG sau 30 phút", pts: 1, critical: false }
        ],
        keyPoints: [
            "K⁺ > 6.5 hoặc có thay đổi ECG = tăng Kali máu đe dọa tính mạng",
            "Calcium Gluconate KHÔNG hạ K⁺ — chỉ ổn định màng tế bào cơ tim, tác dụng 30-60 phút",
            "Thứ tự: (1) Bảo vệ tim → (2) Chuyển K⁺ vào nội bào → (3) Thải K⁺ ra ngoài cơ thể"
        ]
    },
    {
        id: "I4", difficulty: "intermediate",
        category: "Hô hấp", title: "Tràn khí màng phổi áp lực",
        patient: "Hoàng Văn H, 22 tuổi, Nam",
        vitals: "Mạch 140, HA 80/50, SpO₂ 82%, Nhịp thở 35, TMC nổi",
        scenario: "Bệnh nhân bị TNGT, va đập ngực phải. Đột ngột khó thở nặng, tĩnh mạch cổ nổi, khí quản lệch trái. Bạn có 8 phút để chẩn đoán và xử trí cấp cứu.",
        duration: 8 * 60,
        checklist: [
            { text: "Nhận diện tam chứng Beck/dấu hiệu tràn khí áp lực", pts: 2, critical: true },
            { text: "Khám: gõ vang + rì rào phế nang mất bên phải", pts: 2, critical: true },
            { text: "Chọc giải áp kim lớn (14G) KLS 2 đường giữa đòn phải", pts: 3, critical: true },
            { text: "Nghe tiếng xì khí thoát ra → xác nhận chẩn đoán", pts: 1, critical: false },
            { text: "Đặt dẫn lưu màng phổi (chest tube) KLS 4-5 đường nách giữa", pts: 2, critical: true },
            { text: "Truyền dịch NaCl 0.9% bolus hỗ trợ huyết động", pts: 1, critical: false },
            { text: "Cho oxy FiO₂ cao (mask túi 15L/phút)", pts: 1, critical: true },
            { text: "X-quang ngực sau thủ thuật kiểm tra phổi nở", pts: 1, critical: false }
        ],
        keyPoints: [
            "Tràn khí áp lực = chẩn đoán LÂM SÀNG, KHÔNG chờ X-quang",
            "Chọc giải áp kim 14G tại KLS 2 đường giữa đòn → biến áp lực thành tràn khí đơn thuần",
            "Tam chứng: (1) Tụt HA + (2) TMC nổi + (3) Mất RRPN 1 bên"
        ]
    },

    /* ── ADVANCED (Nâng cao) ── */
    {
        id: "A1", difficulty: "advanced",
        category: "Cấp cứu", title: "Hồi sinh tim phổi — Ngừng tuần hoàn",
        patient: "Trịnh Văn I, 58 tuổi, Nam",
        vitals: "Bất tỉnh, không thở, không mạch cảnh",
        scenario: "Bệnh nhân đang nằm viện, đột ngột bất tỉnh. Điều dưỡng phát hiện không có mạch cảnh. Monitor cho thấy nhịp nhanh thất vô mạch (pVT). Bạn là bác sĩ trực, phải lãnh đạo ekip hồi sinh. Thời gian 8 phút.",
        duration: 8 * 60,
        checklist: [
            { text: "Xác nhận ngừng tuần hoàn: Bất tỉnh + Không thở + Không mạch", pts: 2, critical: true },
            { text: "Kích hoạt Code Blue / Gọi hỗ trợ", pts: 1, critical: true },
            { text: "Bắt đầu ép tim ngay: tần số 100-120/phút, sâu 5-6cm", pts: 3, critical: true },
            { text: "Nhận diện nhịp sốc được (pVT/VF) → Sốc điện 200J biphasic", pts: 3, critical: true },
            { text: "Tiếp tục ép tim ngay sau sốc — KHÔNG kiểm tra mạch", pts: 2, critical: true },
            { text: "Adrenaline 1mg IV sau lần sốc thứ 2, lặp mỗi 3-5 phút", pts: 2, critical: true },
            { text: "Amiodarone 300mg IV sau lần sốc thứ 3 (VF/pVT kháng trị)", pts: 2, critical: false },
            { text: "Tìm nguyên nhân có thể đảo ngược: 5H và 5T", pts: 2, critical: false },
            { text: "Kiểm tra mạch sau mỗi 2 phút (5 chu kỳ CPR)", pts: 1, critical: true }
        ],
        keyPoints: [
            "Ép tim chất lượng cao: 100-120/phút, sâu 5-6cm, giảm thiểu gián đoạn < 10 giây",
            "Nhịp sốc được = VF/pVT. Nhịp không sốc = PEA/Asystole",
            "5H: Hypovolemia, Hypoxia, H⁺ (acidosis), Hypo/Hyperkalemia, Hypothermia. 5T: Tension pneumothorax, Tamponade, Toxins, Thrombosis (PE), Thrombosis (MI)"
        ]
    },
    {
        id: "A2", difficulty: "advanced",
        category: "Thần kinh", title: "Trạng thái động kinh liên tục",
        patient: "Lý Thị K, 28 tuổi, Nữ, động kinh đã biết",
        vitals: "Mạch 130, HA 160/100, Nhiệt 38.8°C, SpO₂ 85%",
        scenario: "Bệnh nhân co giật toàn thể liên tục > 10 phút, không hồi tỉnh giữa các cơn. Đây là trạng thái động kinh (Status Epilepticus). Bạn có 8 phút để xử trí theo phác đồ.",
        duration: 8 * 60,
        checklist: [
            { text: "Bảo vệ đường thở: nghiêng đầu, hút đàm, canula mũi", pts: 2, critical: true },
            { text: "Cho oxy FiO₂ cao, theo dõi SpO₂", pts: 1, critical: true },
            { text: "Thiết lập đường truyền TM + lấy máu XN (glucose, điện giải, thuốc)", pts: 2, critical: true },
            { text: "Kiểm tra đường huyết mao mạch (loại trừ hạ ĐH)", pts: 2, critical: true },
            { text: "First-line: Diazepam 10mg IV chậm hoặc Midazolam 10mg IM", pts: 3, critical: true },
            { text: "Second-line (nếu còn co giật): Phenytoin 20mg/kg IV hoặc Levetiracetam", pts: 2, critical: true },
            { text: "KHÔNG đặt vật gì vào miệng bệnh nhân", pts: 1, critical: false },
            { text: "Ghi nhận thời gian bắt đầu co giật và thời gian dùng thuốc", pts: 1, critical: false }
        ],
        keyPoints: [
            "Status Epilepticus: co giật > 5 phút HOẶC ≥ 2 cơn liên tiếp không hồi tỉnh",
            "Phác đồ: (0-5') Benzodiazepine → (5-20') Phenytoin/Levetiracetam → (>20') Thiopental/Propofol + ICU",
            "Luôn kiểm tra glucose — hạ đường huyết là nguyên nhân có thể đảo ngược phổ biến nhất"
        ]
    },
    {
        id: "A3", difficulty: "advanced",
        category: "Sản khoa", title: "Tiền sản giật nặng — Cấp cứu",
        patient: "Mai Thị L, 32 tuổi, Nữ, Thai 35 tuần, con so",
        vitals: "HA 180/120, Mạch 100, SpO₂ 96%, Protein niệu 3+",
        scenario: "Thai phụ 35 tuần nhập viện vì đau đầu dữ dội, nhìn mờ, đau thượng vị. HA 180/120, protein niệu 3+. Bạn có 8 phút để chẩn đoán và xử trí cấp cứu tiền sản giật nặng.",
        duration: 8 * 60,
        checklist: [
            { text: "Xác nhận chẩn đoán: HA ≥ 160/110 + triệu chứng nặng", pts: 2, critical: true },
            { text: "Đặt bệnh nhân nằm nghiêng trái", pts: 1, critical: false },
            { text: "Khởi động MgSO₄ phòng sản giật: 4g IV loading trong 20 phút", pts: 3, critical: true },
            { text: "Hạ áp cấp: Labetalol 20mg IV hoặc Nifedipine 10mg SL", pts: 2, critical: true },
            { text: "Mục tiêu HA: 140-150/90-100 (KHÔNG hạ quá nhanh)", pts: 2, critical: true },
            { text: "Theo dõi phản xạ gân xương (MgSO₄ quá liều → mất phản xạ)", pts: 2, critical: false },
            { text: "Liên hệ khoa Sản để đánh giá chỉ định chấm dứt thai kỳ", pts: 2, critical: true },
            { text: "XN: CTM, tiểu cầu, chức năng gan, creatinine, LDH (HELLP?)", pts: 1, critical: false }
        ],
        keyPoints: [
            "MgSO₄ là thuốc PHÒNG sản giật, KHÔNG phải thuốc hạ áp",
            "Antidote MgSO₄ quá liều: Calcium Gluconate 1g IV chậm",
            "Dấu hiệu nặng: đau đầu, nhìn mờ, đau thượng vị, tiểu cầu < 100.000, men gan tăng"
        ]
    },
    {
        id: "A4", difficulty: "advanced",
        category: "Cấp cứu", title: "Nhiễm khuẩn huyết — Sepsis Bundle",
        patient: "Bùi Văn M, 72 tuổi, Nam",
        vitals: "Mạch 125, HA 85/50, Nhiệt 39.5°C, SpO₂ 92%, Nhịp thở 28",
        scenario: "Bệnh nhân nhập viện từ viện dưỡng lão vì sốt cao, lơ mơ. Có ổ loét tỳ đè vùng cùng cụt bội nhiễm. qSOFA ≥ 2, nghi ngờ nhiễm khuẩn huyết. Bạn có 8 phút để thực hiện Sepsis Hour-1 Bundle.",
        duration: 8 * 60,
        checklist: [
            { text: "Nhận diện Sepsis: qSOFA ≥ 2 (HA ≤ 100, nhịp thở ≥ 22, ý thức thay đổi)", pts: 2, critical: true },
            { text: "Lấy Lactate máu", pts: 2, critical: true },
            { text: "Cấy máu 2 lọ (hiếu khí + kỵ khí) TRƯỚC KHI dùng kháng sinh", pts: 2, critical: true },
            { text: "Kháng sinh phổ rộng IV trong vòng 1 giờ", pts: 3, critical: true },
            { text: "Truyền NaCl 0.9% 30 mL/kg trong 3 giờ nếu tụt HA hoặc Lactate ≥ 4", pts: 2, critical: true },
            { text: "Đánh giá lại huyết động sau truyền dịch", pts: 1, critical: false },
            { text: "Nếu MAP < 65 sau bù dịch → khởi động Norepinephrine", pts: 2, critical: true },
            { text: "Kiểm soát nguồn nhiễm (wound care, dẫn lưu abscess)", pts: 1, critical: false }
        ],
        keyPoints: [
            "Hour-1 Bundle: Lactate + Cấy máu + Kháng sinh IV + Truyền dịch (nếu tụt HA/Lactate ≥ 4)",
            "qSOFA ≥ 2 = nghi Sepsis, cần đánh giá SOFA đầy đủ",
            "Vận mạch đầu tay: Norepinephrine. Mục tiêu MAP ≥ 65 mmHg"
        ]
    }
];

/* ======================== LOCAL STORAGE ======================== */
const STORAGE_KEY = 'cliniportal-osce-history';

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
}

function saveSession(session) {
    const history = loadHistory();
    history.push(session);
    // Keep last 50 sessions max
    if (history.length > 50) history.splice(0, history.length - 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/* ======================== MAIN APP ======================== */
document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btn-generate');
    const caseDisplay = document.getElementById('case-display');
    const caseCategory = document.getElementById('case-category');
    const caseTitle = document.getElementById('case-title');
    const casePatient = document.getElementById('case-patient');
    const caseVitals = document.getElementById('case-vitals');
    const caseScenario = document.getElementById('case-scenario');
    const caseChecklist = document.getElementById('case-checklist');
    const timerDisplay = document.getElementById('timer-display');
    const btnStop = document.getElementById('btn-stop');
    const scoreDisplay = document.getElementById('score-display');
    const difficultySelect = document.getElementById('difficulty-select');
    const modeSelect = document.getElementById('mode-select');
    const progressRing = document.getElementById('progress-ring-circle');
    const timerText = document.getElementById('timer-text');
    const feedbackPanel = document.getElementById('feedback-panel');
    const feedbackContent = document.getElementById('feedback-content');
    const historyContainer = document.getElementById('history-container');
    const historyChart = document.getElementById('history-chart');
    const marathonProgress = document.getElementById('marathon-progress');
    const stationIndicator = document.getElementById('station-indicator');
    const difficultyBadge = document.getElementById('difficulty-badge');

    let timerInterval;
    let timeLeft = 0;
    let totalDuration = 0;
    let isRunning = false;
    let totalPoints = 0;
    let currentPoints = 0;
    let currentCase = null;

    // Marathon mode state
    let marathonMode = false;
    let marathonStations = [];
    let marathonCurrent = 0;
    let marathonResults = [];

    // Audio
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function playBeep(vol, freq, duration) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = freq;
        gain.gain.value = vol;
        osc.start();
        setTimeout(() => osc.stop(), duration);
    }

    function playWarningBeep(level) {
        if (level === '2min') { playBeep(0.3, 440, 300); }
        else if (level === '1min') { playBeep(0.5, 523, 400); playBeep(0.5, 523, 400); }
        else if (level === '30sec') { playBeep(0.7, 660, 200); setTimeout(() => playBeep(0.7, 660, 200), 300); setTimeout(() => playBeep(0.7, 660, 200), 600); }
        else if (level === 'end') { playBeep(1, 880, 1500); }
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    /* ── Progress Ring ── */
    const RING_CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

    function updateProgressRing(fraction) {
        if (!progressRing) return;
        const offset = RING_CIRCUMFERENCE * (1 - fraction);
        progressRing.style.strokeDashoffset = offset;

        // Color change
        if (fraction <= 0.1) progressRing.style.stroke = 'var(--color-danger)';
        else if (fraction <= 0.25) progressRing.style.stroke = 'var(--color-warning)';
        else progressRing.style.stroke = 'var(--color-success)';
    }

    function updateTimerDisplay() {
        if (timerText) timerText.textContent = formatTime(timeLeft);
        if (timerDisplay) timerDisplay.innerHTML = `<i class="fa-regular fa-clock"></i> ${formatTime(timeLeft)}`;

        const fraction = totalDuration > 0 ? timeLeft / totalDuration : 0;
        updateProgressRing(fraction);

        if (timeLeft <= 60 && timeLeft > 0) {
            timerDisplay?.classList.add('warning');
        } else {
            timerDisplay?.classList.remove('warning');
        }
    }

    function updateScore() {
        if (scoreDisplay) scoreDisplay.textContent = `${currentPoints}/${totalPoints} điểm`;
    }

    /* ── Difficulty Filter ── */
    function getFilteredCases() {
        const diff = difficultySelect?.value || 'all';
        if (diff === 'all') return OSCE_CASES;
        return OSCE_CASES.filter(c => c.difficulty === diff);
    }

    function getDifficultyLabel(d) {
        if (d === 'basic') return '🟢 Cơ bản';
        if (d === 'intermediate') return '🟡 Trung bình';
        if (d === 'advanced') return '🔴 Nâng cao';
        return d;
    }

    /* ── Generate Case ── */
    function loadCase(selectedCase) {
        currentCase = selectedCase;
        if (feedbackPanel) feedbackPanel.style.display = 'none';

        // Fill data
        caseCategory.textContent = selectedCase.category;
        caseTitle.textContent = selectedCase.title;
        casePatient.textContent = selectedCase.patient;
        caseVitals.textContent = selectedCase.vitals;
        caseScenario.textContent = selectedCase.scenario;

        // Difficulty badge
        if (difficultyBadge) {
            difficultyBadge.textContent = getDifficultyLabel(selectedCase.difficulty);
            difficultyBadge.className = 'difficulty-badge diff-' + selectedCase.difficulty;
        }

        // Build checklist with critical markers
        caseChecklist.innerHTML = '';
        totalPoints = 0;
        currentPoints = 0;

        selectedCase.checklist.forEach((item, idx) => {
            totalPoints += item.pts;
            const li = document.createElement('li');
            li.className = item.critical ? 'checklist-critical' : '';
            li.innerHTML = `
                <input type="checkbox" id="check-${idx}">
                <span class="checkbox-text">${item.text}</span>
                <span class="points-badge ${item.critical ? 'critical' : ''}">${item.critical ? '⚡' : ''}+${item.pts}đ</span>
            `;
            li.dataset.points = item.pts;
            li.dataset.critical = item.critical;

            li.addEventListener('click', function (e) {
                if (e.target.tagName === 'INPUT') return;
                const cb = this.querySelector('input');
                cb.checked = !cb.checked;
                this.classList.toggle('checked', cb.checked);
                const p = parseInt(this.dataset.points);
                currentPoints += cb.checked ? p : -p;
                updateScore();
            });

            const cb = li.querySelector('input');
            cb.addEventListener('change', function () {
                li.classList.toggle('checked', this.checked);
                const p = parseInt(li.dataset.points);
                currentPoints += this.checked ? p : -p;
                updateScore();
            });

            caseChecklist.appendChild(li);
        });

        updateScore();

        // Setup timer
        clearInterval(timerInterval);
        timeLeft = selectedCase.duration;
        totalDuration = selectedCase.duration;
        isRunning = true;
        updateTimerDisplay();

        // Show
        caseDisplay.style.display = 'block';
        caseDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Start timer
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
                if (timeLeft === 120) playWarningBeep('2min');
                else if (timeLeft === 60) playWarningBeep('1min');
                else if (timeLeft === 30) playWarningBeep('30sec');
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                if (timerText) timerText.textContent = 'HẾT';
                if (timerDisplay) timerDisplay.innerHTML = '<i class="fa-solid fa-flag-checkered"></i> HẾT GIỜ';
                playWarningBeep('end');
                finishStation();
            }
        }, 1000);

        // Marathon station indicator
        if (marathonMode && stationIndicator) {
            stationIndicator.style.display = 'flex';
            updateStationIndicator();
        }
    }

    function generateCase() {
        const mode = modeSelect?.value || 'single';
        if (mode === 'marathon') {
            startMarathon();
        } else {
            marathonMode = false;
            if (stationIndicator) stationIndicator.style.display = 'none';
            if (marathonProgress) marathonProgress.style.display = 'none';
            const pool = getFilteredCases();
            if (pool.length === 0) { alert('Không có case nào cho mức độ đã chọn.'); return; }
            const randomCase = pool[Math.floor(Math.random() * pool.length)];
            loadCase(randomCase);
        }
    }

    /* ── Marathon Mode ── */
    function startMarathon() {
        marathonMode = true;
        marathonCurrent = 0;
        marathonResults = [];

        // Pick 6 random non-duplicate cases
        const pool = [...getFilteredCases()];
        marathonStations = [];
        for (let i = 0; i < Math.min(6, pool.length); i++) {
            const idx = Math.floor(Math.random() * pool.length);
            marathonStations.push(pool.splice(idx, 1)[0]);
        }

        if (marathonStations.length === 0) { alert('Không đủ case.'); return; }
        if (marathonProgress) marathonProgress.style.display = 'block';
        loadCase(marathonStations[0]);
    }

    function updateStationIndicator() {
        if (!stationIndicator) return;
        stationIndicator.innerHTML = '';
        const total = marathonStations.length;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'station-dot';
            if (i < marathonCurrent) dot.classList.add('completed');
            else if (i === marathonCurrent) dot.classList.add('active');
            dot.textContent = i + 1;
            stationIndicator.appendChild(dot);
            if (i < total - 1) {
                const line = document.createElement('div');
                line.className = 'station-line' + (i < marathonCurrent ? ' completed' : '');
                stationIndicator.appendChild(line);
            }
        }
    }

    /* ── Finish & Feedback ── */
    function finishStation() {
        clearInterval(timerInterval);
        isRunning = false;

        // Collect checked items
        const items = caseChecklist.querySelectorAll('li');
        let criticalMissed = [];
        items.forEach(li => {
            const cb = li.querySelector('input');
            if (!cb.checked && li.dataset.critical === 'true') {
                criticalMissed.push(li.querySelector('.checkbox-text').textContent);
            }
        });

        const pct = totalPoints > 0 ? Math.round((currentPoints / totalPoints) * 100) : 0;

        // Save to history
        if (currentCase) {
            const session = {
                date: new Date().toISOString(),
                caseId: currentCase.id,
                title: currentCase.title,
                category: currentCase.category,
                difficulty: currentCase.difficulty,
                score: currentPoints,
                total: totalPoints,
                pct: pct,
                timeUsed: totalDuration - timeLeft,
                totalTime: totalDuration
            };

            if (marathonMode) {
                marathonResults.push(session);
            }
            saveSession(session);
        }

        // Show feedback
        showFeedback(pct, criticalMissed);

        // Marathon next
        if (marathonMode && marathonCurrent < marathonStations.length - 1) {
            marathonCurrent++;
            setTimeout(() => {
                if (confirm(`Trạm ${marathonCurrent}/${marathonStations.length} hoàn thành! Điểm: ${pct}%.\n\nChuyển sang trạm tiếp theo?`)) {
                    loadCase(marathonStations[marathonCurrent]);
                } else {
                    showMarathonSummary();
                }
            }, 1500);
        } else if (marathonMode) {
            setTimeout(() => showMarathonSummary(), 1500);
        }

        // Update history chart
        renderHistoryChart();
    }

    function showFeedback(pct, criticalMissed) {
        if (!feedbackPanel || !feedbackContent) return;
        feedbackPanel.style.display = 'block';

        let grade, gradeClass;
        if (pct >= 90) { grade = 'Xuất sắc'; gradeClass = 'grade-excellent'; }
        else if (pct >= 70) { grade = 'Đạt'; gradeClass = 'grade-pass'; }
        else if (pct >= 50) { grade = 'Cần cải thiện'; gradeClass = 'grade-improve'; }
        else { grade = 'Chưa đạt'; gradeClass = 'grade-fail'; }

        let html = `
            <div class="feedback-grade ${gradeClass}">
                <span class="grade-pct">${pct}%</span>
                <span class="grade-label">${grade}</span>
            </div>
        `;

        if (criticalMissed.length > 0) {
            html += `<div class="feedback-critical">
                <h4>⚡ Bước CRITICAL bị bỏ sót:</h4>
                <ul>${criticalMissed.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>`;
        }

        if (currentCase?.keyPoints) {
            html += `<div class="feedback-keypoints">
                <h4>📌 Key Points cần nhớ:</h4>
                <ul>${currentCase.keyPoints.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>`;
        }

        feedbackContent.innerHTML = html;
        feedbackPanel.scrollIntoView({ behavior: 'smooth' });
    }

    function showMarathonSummary() {
        if (!feedbackPanel || !feedbackContent) return;
        feedbackPanel.style.display = 'block';

        const avgPct = marathonResults.length > 0
            ? Math.round(marathonResults.reduce((s, r) => s + r.pct, 0) / marathonResults.length) : 0;

        let html = `<div class="marathon-summary">
            <h3>🏁 Kết Quả Marathon OSCE (${marathonResults.length} Trạm)</h3>
            <div class="marathon-avg">Điểm trung bình: <strong>${avgPct}%</strong></div>
            <table class="marathon-table">
                <thead><tr><th>#</th><th>Trạm</th><th>Chuyên khoa</th><th>Điểm</th></tr></thead>
                <tbody>
                    ${marathonResults.map((r, i) => `<tr>
                        <td>${i + 1}</td>
                        <td>${r.title}</td>
                        <td>${r.category}</td>
                        <td class="${r.pct >= 70 ? 'pass' : 'fail'}">${r.pct}%</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;

        feedbackContent.innerHTML = html;
        feedbackPanel.scrollIntoView({ behavior: 'smooth' });
    }

    /* ── History Chart ── */
    function renderHistoryChart() {
        if (!historyContainer || !historyChart) return;
        const history = loadHistory();
        if (history.length === 0) { historyContainer.style.display = 'none'; return; }

        historyContainer.style.display = 'block';
        const recent = history.slice(-10); // Last 10

        // Simple bar chart via SVG
        const W = 320, H = 120, barW = 24, gap = 8;
        let bars = '';
        recent.forEach((s, i) => {
            const x = i * (barW + gap) + 10;
            const h = (s.pct / 100) * (H - 30);
            const y = H - 10 - h;
            const color = s.pct >= 70 ? 'var(--color-success)' : s.pct >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';
            bars += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${color}" opacity="0.85">
                <title>${s.title}: ${s.pct}%</title></rect>`;
            bars += `<text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" font-size="10" fill="var(--color-text-muted)">${s.pct}%</text>`;
        });

        historyChart.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}">
            <line x1="8" y1="${H - 10}" x2="${W}" y2="${H - 10}" stroke="var(--color-border)" stroke-width="1"/>
            ${bars}
        </svg>`;

        // Stats
        const totalSessions = history.length;
        const avgScore = Math.round(history.reduce((s, r) => s + r.pct, 0) / totalSessions);
        const statsEl = document.getElementById('history-stats');
        if (statsEl) {
            statsEl.innerHTML = `<span>Tổng: <strong>${totalSessions}</strong> lượt</span> · <span>TB: <strong>${avgScore}%</strong></span>`;
        }
    }

    /* ── Event Listeners ── */
    btnGenerate.addEventListener('click', generateCase);

    btnStop.addEventListener('click', () => {
        if (isRunning) {
            finishStation();
        }
    });

    // Init history chart
    renderHistoryChart();
});
