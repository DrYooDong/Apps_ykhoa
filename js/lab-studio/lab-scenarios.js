/**
 * Lab Pro Studio — Scenarios Database
 * Contains clinical cases with demographics, vitals, symptoms, lab values, diagnosis, & quiz options.
 */

window.LAB_SCENARIOS = [
  {
    id: "scen_ida",
    category: "Huyết học",
    title: "Thiếu máu Thiếu sắt (Iron Deficiency Anemia)",
    demographics: "Bệnh nhân nữ, 32 tuổi",
    vitals: { hr: 96, bp: "110/70", spo2: 98, temp: 36.8 },
    description: "Mệt mỏi kéo dài, rụng tóc, thèm ăn gạch sành (Pica), rong kinh nhiều tháng nay. Da niêm nhạt, lưỡi mất gai, móng tay hình thìa.",
    symptoms: ["Rong kinh kéo dài", "Mệt mỏi, hoa mắt khi thay đổi tư thế", "Móng tay dẹt, dễ gãy"],
    values: {
      wbc: 6.2, neu_pct: 60, lym_pct: 32, rbc: 3.4, hb: 78, hct: 26.0,
      mcv: 64.0, mch: 21.0, mchc: 290, rdw: 19.5, plt: 420, retic: 0.6,
      ast: 22, alt: 18, bili_tp: 8.5, bili_tt: 2.1, alb: 42, urea: 4.2, cre: 65, egfr: 105,
      glucose: 4.8, hba1c: 5.2, pt_pct: 92, inr: 1.0, aptt: 28, fib: 3.1, ddimer: 0.2
    },
    quizOptions: [
      "Thiếu máu thiếu sắt",
      "Bệnh Thalassemia thể nhẹ (Minor)",
      "Thiếu máu do bệnh mãn tính",
      "Thiếu máu do thiếu Vitamin B12"
    ],
    correctAnswerIndex: 0,
    explanation: "MCV (64 fL) & MCH (21 pg) giảm nặng (Hồng cầu nhỏ nhược sắc) kết hợp RDW tăng cao (19.5% - bất đồng đều kích thước) và Tiểu cầu tăng phản ứng (420 G/L) là hình ảnh điển hình của Thiếu máu thiếu sắt."
  },
  {
    id: "scen_thalassemia",
    category: "Huyết học",
    title: "Thalassemia Thể Phụ Thuộc Truyền Máu (β-Thal Major)",
    demographics: "Bệnh nhân nam, 18 tuổi",
    vitals: { hr: 102, bp: "100/60", spo2: 97, temp: 37.0 },
    description: "Tiền sử truyền máu từ nhỏ, biến dạng xương gò má, lách to độ III, da sậm màu do ứ sắt.",
    symptoms: ["Lách to độ III", "Biến dạng xương sọ gò má (Bộ mặt Thalassemia)", "Vàng da niêm nhẹ"],
    values: {
      wbc: 11.5, neu_pct: 55, lym_pct: 38, rbc: 2.9, hb: 62, hct: 20.0,
      mcv: 58.0, mch: 18.0, mchc: 280, rdw: 22.0, plt: 180, retic: 4.8,
      ast: 65, alt: 58, bili_tp: 48.0, bili_tt: 12.0, alb: 38, urea: 5.5, cre: 72, egfr: 110,
      glucose: 5.1, hba1c: 5.4, pt_pct: 85, inr: 1.1, aptt: 30, fib: 2.8, ddimer: 0.4
    },
    quizOptions: [
      "Thalassemia thể nặng (Beta-Thalassemia Major)",
      "Thiếu máu tán huyết tự miễn (AIHA)",
      "Thiếu máu thiếu sắt nặng",
      "Suy tủy xương"
    ],
    correctAnswerIndex: 0,
    explanation: "Thiếu máu hồng cầu nhỏ nhược sắc mức độ rất nặng (Hb 62 g/L, MCV 58 fL) kèm chỉ số Hồng cầu lưới tăng cao (4.8% - đáp ứng tủy xương) và tăng Bilirubin gián tiếp do tán huyết mãn tính."
  },
  {
    id: "scen_dic",
    category: "Đông cầm máu",
    title: "Đông Máu Nội Mạch Rải Rác (DIC Cấp Tính)",
    demographics: "Bệnh nhân nữ, 28 tuổi",
    vitals: { hr: 124, bp: "85/50", spo2: 92, temp: 39.2 },
    description: "Hậu phẫu sản khoa nhiễm trùng huyết nặng. Chảy máu chân nốt tiêm truyền, xuất huyết mảng lớn dưới da, tiểu ra máu.",
    symptoms: ["Chảy máu rỉ rả chân kim tiêm", "Mảng xuất huyết da", "Tụt huyết áp shock nhiễm khuẩn"],
    values: {
      wbc: 24.5, neu_pct: 88, lym_pct: 8, rbc: 3.1, hb: 85, hct: 26.0,
      mcv: 85.0, mch: 28.0, mchc: 330, rdw: 15.0, plt: 32, retic: 2.5,
      ast: 145, alt: 120, bili_tp: 38.0, bili_tt: 18.0, alb: 28, urea: 18.5, cre: 215, egfr: 25,
      glucose: 8.2, hba1c: 5.8, pt_pct: 35, inr: 2.1, aptt: 68, fib: 0.9, ddimer: 8.5
    },
    quizOptions: [
      "Đông máu nội mạch rải rác (DIC cấp tính)",
      "Xuất huyết giảm tiểu cầu vô căn (ITP)",
      "Bệnh Hemophilia A",
      "Nhiễm trùng huyết đơn thuần"
    ],
    correctAnswerIndex: 0,
    explanation: "Tiểu cầu giảm nặng (32 G/L), PT kéo dài (PT% 35%, INR 2.1), APTT kéo dài (68s), Fibrinogen sụt giảm (< 1.0 g/L) và D-Dimer tăng rất cao (8.5 mg/L) cho điểm ISTH = 8đ (Chẩn đoán xác định DIC cấp)."
  },
  {
    id: "scen_acute_hepatitis",
    category: "Sinh hóa gan",
    title: "Viêm Gan Cấp Bùng Phát (Acute Fulminant Hepatitis)",
    demographics: "Bệnh nhân nam, 45 tuổi",
    vitals: { hr: 98, bp: "115/75", spo2: 98, temp: 37.8 },
    description: "Vàng mắt vàng da đậm xuất hiện đột ngột 3 ngày sau ngộ độc Paracetamol. Bệnh nhân lơ mơ, rối loạn hành vi (Hôn mê gan độ II).",
    symptoms: ["Vàng da đậm toàn thân", "Lơ mơ, hội chứng não gan", "Mệt mỏi nôn ói nhiều"],
    values: {
      wbc: 12.8, neu_pct: 78, lym_pct: 16, rbc: 4.2, hb: 132, hct: 40.0,
      mcv: 88.0, mch: 29.0, mchc: 330, rdw: 13.0, plt: 140, retic: 1.0,
      ast: 2850, alt: 3400, ggt: 210, alp: 185, bili_tp: 185.0, bili_tt: 124.0, alb: 31, prot: 58,
      urea: 9.8, cre: 135, egfr: 52, glucose: 3.1, hba1c: 5.0, pt_pct: 32, inr: 2.3, aptt: 55, fib: 1.6, ddimer: 0.8
    },
    quizOptions: [
      "Viêm gan cấp hoại tử nặng (Suy gan cấp)",
      "Xơ gan bù trừ",
      "Tắc mật do sỏi ống mật chủ",
      "Viêm túi mật cấp"
    ],
    correctAnswerIndex: 0,
    explanation: "Men gan AST/ALT tăng vọt > 70-80 lần bình thường (2850 & 3400 U/L) hoại tử tế bào gan ồ ạt kèm suy giảm tổng hợp đông máu nghiêm trọng (PT 32%, INR 2.3) và hạ đường huyết."
  },
  {
    id: "scen_nephrotic",
    category: "Sinh hóa thận",
    title: "Hội Chứng Thận Hư Nguyên Phát (Nephrotic Syndrome)",
    demographics: "Bệnh nhân nam, 24 tuổi",
    vitals: { hr: 82, bp: "135/85", spo2: 99, temp: 36.6 },
    description: "Phù mặt, phù 2 chân rồi phù toàn thân đột ngột. Tiểu ít, nước tiểu nhiều bọt.",
    symptoms: ["Phù mềm ấn lõm toàn thân", "Tiểu bọt lâu tan", "Tăng cân 6kg trong 1 tuần"],
    values: {
      wbc: 8.5, neu_pct: 65, lym_pct: 28, rbc: 4.8, hb: 145, hct: 43.0,
      mcv: 90.0, mch: 30.0, mchc: 335, rdw: 12.5, plt: 380, retic: 1.1,
      ast: 25, alt: 22, bili_tp: 10.2, bili_tt: 2.5, alb: 18, prot: 42,
      urea: 6.8, cre: 92, egfr: 88, glucose: 5.2, hba1c: 5.3,
      chol: 11.8, trig: 4.5, hdl: 1.1, ldl: 8.6, pt_pct: 95, inr: 1.0, aptt: 30, fib: 5.2, ddimer: 0.6
    },
    quizOptions: [
      "Hội chứng thận hư nguyên phát",
      "Suy thận mãn giai đoạn cuối",
      "Suy dinh dưỡng nặng",
      "Xơ gan decompensated"
    ],
    correctAnswerIndex: 0,
    explanation: "Albumin máu giảm rất nặng (18 g/L) kết hợp Tăng Cholesterol & Triglyceride máu phản ứng cực cao (Chol 11.8 mmol/L, LDL 8.6 mmol/L) và Fibrinogen tăng bù trừ là hình ảnh sinh hóa điển hình của Hội chứng Thận hư."
  },
  {
    id: "scen_dka",
    category: "Chuyển hóa",
    title: "Nhiễm Toan Cetone Đái Tháo Đường (DKA)",
    demographics: "Bệnh nhân nữ, 19 tuổi (ĐTĐ Tuýp 1)",
    vitals: { hr: 118, bp: "100/65", spo2: 97, temp: 37.2 },
    description: "Tiểu nhiều, uống nhiều, sút 4kg trong vài ngày. Thở nhanh sâu kiểu Kussmaul, hơi thở có mùi trái cây chín (Acetone), lơ mơ đờ đẫn.",
    symptoms: ["Thở Kussmaul mùi Acetone", "Mất nước nặng, môi khô", "Lơ mơ đờ đẫn"],
    values: {
      wbc: 18.2, neu_pct: 84, lym_pct: 12, rbc: 5.1, hb: 158, hct: 48.0,
      mcv: 94.0, mch: 31.0, mchc: 330, rdw: 13.5, plt: 310, retic: 1.0,
      ast: 35, alt: 30, bili_tp: 14.0, bili_tt: 3.5, alb: 46,
      urea: 14.5, cre: 165, egfr: 40, glucose: 28.5, hba1c: 12.4,
      chol: 6.8, trig: 3.9, hdl: 1.0, ldl: 4.1, pt_pct: 90, inr: 1.05, aptt: 29, fib: 3.5, ddimer: 0.3
    },
    quizOptions: [
      "Nhiễm toan Cetone Đái tháo đường (DKA)",
      "Tăng lực thẩm thấu do đái tháo đường (HHS)",
      "Nhiễm trùng huyết gây suy thận cấp",
      "Ngộ độc Paracetamol"
    ],
    correctAnswerIndex: 0,
    explanation: "Glucose máu tăng cực cao (28.5 mmol/L), HbA1c 12.4% phản ánh kiểm soát đường huyết rất kém kéo dài, WBC tăng do phản ứng stress toan hóa kèm suy thận trước thận do mất nước nặng (Cre 165 μmol/L)."
  },
  {
    id: "scen_sepsis",
    category: "Nhiễm trùng",
    title: "Nhiễm Trùng Huyết / Shock Nhiễm Khuẩn (Sepsis)",
    demographics: "Bệnh nhân nam, 68 tuổi",
    vitals: { hr: 128, bp: "80/45", spo2: 90, temp: 39.5 },
    description: "Sốt cao rét run, ho khạc đờm mủ đục, thở nhanh 30 lần/phút, da nổi bông tĩnh mạch, tri giác lơ mơ.",
    symptoms: ["Shock tụt huyết áp", "Sốt cao rét run, thở nhanh", "Bạch cầu tăng vọt chênh lệch trái"],
    values: {
      wbc: 28.4, neu_pct: 92, lym_pct: 5, rbc: 3.6, hb: 105, hct: 32.0,
      mcv: 89.0, mch: 29.0, mchc: 328, rdw: 14.8, plt: 85, retic: 1.8,
      ast: 85, alt: 72, bili_tp: 32.0, bili_tt: 16.0, alb: 26,
      urea: 21.0, cre: 245, egfr: 22, glucose: 11.2, hba1c: 6.2,
      pt_pct: 55, inr: 1.5, aptt: 46, fib: 1.8, ddimer: 3.8
    },
    quizOptions: [
      "Nhiễm trùng huyết biến chứng suy đa cơ quan (Sepsis)",
      "Viêm tụy cấp nặng",
      "Nhồi máu cơ thể rộng",
      "Sốt xuất huyết Dengue nặng"
    ],
    correctAnswerIndex: 0,
    explanation: "Bạch cầu tăng vọt (28.4 G/L) với Neutrophil chiếm 92% (chuyển trái), Tiểu cầu giảm (85 G/L) kèm suy thận cấp (Cre 245 μmol/L), suy gan nhẹ và rối loạn đông máu nhẹ phản ánh phản ứng viêm toàn thân nặng trong Sepsis."
  },

  // --- 10 CA MẪU BỔ SUNG NÂNG CAO ---
  {
    id: "scen_cirrhosis",
    category: "Sinh hóa gan",
    title: "Xơ Gan Mất Bù Child-Pugh C (Decompensated Cirrhosis)",
    demographics: "Bệnh nhân nam, 56 tuổi (Tiền sử xơ gan do rượu)",
    vitals: { hr: 92, bp: "105/65", spo2: 96, temp: 37.0 },
    description: "Bụng trướng to (báng bụng độ III), mắt vàng nhạt, sao mạch ngực, lòng bàn tay son. Giảm tiểu cầu và hồng cầu do cường lách.",
    symptoms: ["Báng bụng căng to", "Vàng mắt vàng da nhẹ", "Xuất huyết dưới da nhẹ do rỉ rả"],
    values: {
      wbc: 3.2, neu_pct: 58, lym_pct: 32, rbc: 3.1, hb: 92, hct: 28.0,
      mcv: 92.0, mch: 29.5, mchc: 325, rdw: 15.5, plt: 58, retic: 1.2,
      ast: 115, alt: 82, ggt: 185, alp: 140, bili_tp: 68.0, bili_tt: 32.0, alb: 22, prot: 52,
      urea: 8.5, cre: 118, egfr: 60, glucose: 4.6, hba1c: 5.1, pt_pct: 42, inr: 1.85, aptt: 48, fib: 1.4, ddimer: 1.2
    },
    quizOptions: [
      "Xơ gan mất bù Child-Pugh C",
      "Viêm gan vi rút B cấp",
      "Hội chứng Thận hư",
      "Ung thư đại tràng di căn"
    ],
    correctAnswerIndex: 0,
    explanation: "Albumin máu giảm rất nặng (22 g/L), Bilirubin tăng (68 μmol/L), PT kéo dài (INR 1.85) thể hiện suy chức năng tổng hợp gan nghiêm trọng. Giảm 3 dòng tế bào máu nhẹ do cường lách trong tăng áp lực tĩnh mạch cửa."
  },
  {
    id: "scen_aki_nephrotoxic",
    category: "Sinh hóa thận",
    title: "Tổn Thương Thận Cấp Tại Thận do Gentamicin (AKI)",
    demographics: "Bệnh nhân nam, 62 tuổi",
    vitals: { hr: 80, bp: "140/90", spo2: 98, temp: 36.7 },
    description: "Tiểu ít dần < 400ml/24h sau đợt điều trị kháng sinh Gentamicin liều cao 10 ngày. Không sốt, không phù rõ.",
    symptoms: ["Thiểu niệu < 400 ml/ngày", "Mệt mỏi nôn nao", "Tăng huyết áp nhẹ"],
    values: {
      wbc: 9.1, neu_pct: 68, lym_pct: 24, rbc: 3.9, hb: 118, hct: 36.0,
      mcv: 91.0, mch: 30.0, mchc: 330, rdw: 13.0, plt: 210, retic: 0.9,
      ast: 28, alt: 24, bili_tp: 11.0, bili_tt: 2.8, alb: 39,
      urea: 28.5, cre: 485, egfr: 11, uric: 520, glucose: 5.8, hba1c: 5.6,
      pt_pct: 88, inr: 1.08, aptt: 31, fib: 3.2, ddimer: 0.4
    },
    quizOptions: [
      "Tổn thương thận cấp tại thận (Hoại tử ống thận cấp do Gentamicin)",
      "Suy thận trước thận do mất nước",
      "Tắc nghẽn đường tiết niệu sau thận",
      "Hội chứng Thận hư"
    ],
    correctAnswerIndex: 0,
    explanation: "Creatinine vọt lên 485 μmol/L làm eGFR sụt thảm hại xuống 11 mL/min/1.73m² kéo theo Ure và Acid Uric tăng rất cao trong bệnh cảnh hoại tử ống thận cấp do kháng sinh nhóm Aminoglycosides."
  },
  {
    id: "scen_acute_pancreatitis",
    category: "Chuyển hóa",
    title: "Viêm Tụy Cấp Nặng do Tăng Triglyceride Máu",
    demographics: "Bệnh nhân nam, 41 tuổi (Thường xuyên uống rượu)",
    vitals: { hr: 112, bp: "130/80", spo2: 95, temp: 38.2 },
    description: "Đau bụng vùng thượng vị dữ dội lan ra sau lưng đột ngột sau bữa ăn nhiều dầu mỡ rượu bia. Nôn ói liên tục. Huyết thanh đục như sữa.",
    symptoms: ["Đau thượng vị xuyên đúp ra lưng", "Nôn ói liên tục", "Huyết thanh đục như sữa"],
    values: {
      wbc: 19.8, neu_pct: 86, lym_pct: 10, rbc: 4.9, hb: 152, hct: 46.0,
      mcv: 92.0, mch: 31.0, mchc: 335, rdw: 13.2, plt: 340, retic: 1.0,
      ast: 88, alt: 75, ggt: 240, bili_tp: 28.0, bili_tt: 9.0, alb: 36,
      urea: 11.2, cre: 142, egfr: 50, glucose: 14.5, hba1c: 8.2,
      chol: 14.2, trig: 24.8, hdl: 0.7, ldl: 5.2, pt_pct: 82, inr: 1.12, aptt: 33, fib: 4.8, ddimer: 1.5
    },
    quizOptions: [
      "Viêm tụy cấp nặng do Tăng Triglyceride máu",
      "Nhiễm toan Cetone Đái tháo đường",
      "Thủng ổ loét dạ dày tá tràng",
      "Cơn đau quặn mật do sỏi"
    ],
    correctAnswerIndex: 0,
    explanation: "Triglyceride tăng cực kỳ nghiêm trọng (24.8 mmol/L > 11.3 mmol/L ngưỡng gây viêm tụy) gây ngộ độc mỡ tụy, kết hợp Bạch cầu tăng vọt (19.8 G/L) và tăng Glucose máu."
  },
  {
    id: "scen_itp",
    category: "Huyết học",
    title: "Xuất Huyết Giảm Tiểu Cầu Tự Miễn Cấp Tính (ITP)",
    demographics: "Bệnh nhân nữ, 22 tuổi",
    vitals: { hr: 78, bp: "115/75", spo2: 99, temp: 36.8 },
    description: "Xuất hiện nhiều chấm nốt xuất huyết dạng dải phếch dưới da chân tay và chảy máu nướu răng 2 ngày nay. Không sốt, gan lách không to.",
    symptoms: ["Chấm xuất huyết rải rác toàn thân", "Chảy máu chân răng", "Không sốt, thể trạng tốt"],
    values: {
      wbc: 6.8, neu_pct: 62, lym_pct: 30, rbc: 4.5, hb: 135, hct: 40.0,
      mcv: 88.0, mch: 29.5, mchc: 332, rdw: 12.8, plt: 8, retic: 1.2,
      ast: 20, alt: 16, bili_tp: 9.5, bili_tt: 2.0, alb: 44, urea: 4.5, cre: 70, egfr: 108,
      glucose: 4.9, hba1c: 5.1, pt_pct: 95, inr: 1.0, aptt: 28, fib: 3.0, ddimer: 0.2
    },
    quizOptions: [
      "Xuất huyết giảm tiểu cầu tự miễn (ITP)",
      "Đông máu nội mạch rải rác (DIC)",
      "Suy tủy xương toàn bộ",
      "Sốt xuất huyết Dengue"
    ],
    correctAnswerIndex: 0,
    explanation: "Tiểu cầu sụt giảm thảm hại đơn độc xuống còn 8 G/L (nguy cơ xuất huyết não cao) trong khi dòng Hồng cầu, Bạch cầu và chức năng Đông máu (PT/APTT/Fibrinogen) hoàn toàn bình thường."
  },
  {
    id: "scen_megaloblastic",
    category: "Huyết học",
    title: "Thiếu Máu Hồng Cầu Khổng Lồ do Thiếu B12 (Megaloblastic)",
    demographics: "Bệnh nhân nam, 58 tuổi (Tiền sử cắt 2/3 dạ dày 5 năm trước)",
    vitals: { hr: 94, bp: "110/70", spo2: 97, temp: 36.9 },
    description: "Da xanh xao vàng rơm, mệt mỏi, tê rần đầu ngón tay ngón chân (Tổn thương thần kinh ngoại biên), viêm rát lưỡi Hunter.",
    symptoms: ["Tê rần dị cảm tay chân", "Lưỡi láng đỏ rát (Lưỡi Hunter)", "Da xanh xao ánh vàng rơm"],
    values: {
      wbc: 3.1, neu_pct: 48, lym_pct: 45, rbc: 1.8, hb: 68, hct: 21.0,
      mcv: 118.0, mch: 38.0, mchc: 322, rdw: 21.0, plt: 95, retic: 0.3,
      ast: 45, alt: 32, bili_tp: 34.0, bili_tt: 8.0, alb: 38, urea: 5.8, cre: 78, egfr: 98,
      glucose: 5.0, hba1c: 5.3, pt_pct: 90, inr: 1.02, aptt: 30, fib: 2.9, ddimer: 0.3
    },
    quizOptions: [
      "Thiếu máu hồng cầu khổng lồ do thiếu Vitamin B12 / Folate",
      "Thiếu máu thiếu sắt",
      "Thalassemia thể nhẹ",
      "Suy tủy xương"
    ],
    correctAnswerIndex: 0,
    explanation: "Thiếu máu nặng (Hb 68 g/L) với thể tích hồng cầu phồng cực to (MCV 118 fL > 100 fL) kèm chỉ số RDW tăng, giảm nhẹ bạch cầu & tiểu cầu do nhân tế bào không phân chia được."
  },
  {
    id: "scen_hemophilia",
    category: "Đông cầm máu",
    title: "Bệnh Hemophilia A Cấp Tính (Thiếu Yếu Tố VIII)",
    demographics: "Bệnh nhân nam, 12 tuổi",
    vitals: { hr: 90, bp: "105/65", spo2: 99, temp: 36.7 },
    description: "Sưng đau nhức khớp gối phải dữ dội sau té ngã nhẹ (Tụ máu trong khớp - Hemarthrosis). Tiền sử gia đình có cậu ruột hay bị chảy máu kéo dài.",
    symptoms: ["Tràn máu sưng khớp gối", "Chảy máu kéo dài sau chấn thương nhẹ", "Tiền sử gia đình bên ngoại"],
    values: {
      wbc: 7.2, neu_pct: 64, lym_pct: 28, rbc: 4.2, hb: 122, hct: 37.0,
      mcv: 88.0, mch: 29.0, mchc: 330, rdw: 12.5, plt: 280, retic: 1.0,
      ast: 22, alt: 19, bili_tp: 8.0, bili_tt: 1.8, alb: 43, urea: 4.1, cre: 62, egfr: 112,
      glucose: 4.7, hba1c: 5.0, pt_pct: 95, inr: 1.0, aptt: 78, fib: 3.2, ddimer: 0.2
    },
    quizOptions: [
      "Bệnh Hemophilia A (Thiếu yếu tố VIII)",
      "Bệnh Von Willebrand",
      "Đông máu nội mạch rải rác (DIC)",
      "Ngộ độc thuốc chống đông Warfarin"
    ],
    correctAnswerIndex: 0,
    explanation: "Thời gian APTT kéo dài đơn độc (78 giây) phản ảnh rối loạn đường đông máu nội sinh, trong khi PT/INR (ngoại sinh), Fibrinogen và Tiểu cầu hoàn toàn bình thường."
  },
  {
    id: "scen_hyperlipidemia",
    category: "Chuyển hóa",
    title: "Rối Lạn Lipid Máu Hỗn Hợp Nguy Cơ Tim Mạch Rất Cao",
    demographics: "Bệnh nhân nam, 52 tuổi (Béo phì, ĐTĐ Tuýp 2, Hút thuốc)",
    vitals: { hr: 76, bp: "145/90", spo2: 98, temp: 36.5 },
    description: "Khám sức khỏe định kỳ. Ban vàng gân gót (Xanthoma) và cung lão suy ở mắt (Arcus senilis). Tiền sử bố mất vì Nhồi máu cơ tim lúc 48 tuổi.",
    symptoms: ["Ban vàng Xanthoma gân gót", "Tăng huyết áp kèm béo bụng", "Tiền sử gia đình tim mạch sớm"],
    values: {
      wbc: 7.8, neu_pct: 60, lym_pct: 31, rbc: 4.9, hb: 152, hct: 45.0,
      mcv: 90.0, mch: 30.5, mchc: 338, rdw: 12.2, plt: 260, retic: 1.0,
      ast: 38, alt: 42, ggt: 65, bili_tp: 12.0, bili_tt: 3.0, alb: 45, urea: 6.2, cre: 88, egfr: 92,
      glucose: 7.8, hba1c: 7.4, chol: 9.8, trig: 4.8, hdl: 0.85, ldl: 6.8, pt_pct: 92, inr: 1.02, aptt: 29, fib: 3.8, ddimer: 0.3
    },
    quizOptions: [
      "Rối loạn Lipid máu hỗn hợp nguy cơ tim mạch rất cao",
      "Tăng Cholesterol máu gia đình đơn thuần",
      "Hội chứng Thận hư",
      "Suy giáp trạng"
    ],
    correctAnswerIndex: 0,
    explanation: "Cholesterol toàn phần (9.8 mmol/L) và LDL-C (6.8 mmol/L) tăng rất cao kèm Triglyceride tăng (4.8 mmol/L) và HDL-C giảm sâu (0.85 mmol/L) đặt bệnh nhân vào nhóm nguy cơ biến cố mạch vành cấp rất cao."
  },
  {
    id: "scen_gout_acute",
    category: "Chuyển hóa",
    title: "Cơn Gút Cấp Tính (Acute Gouty Arthritis)",
    demographics: "Bệnh nhân nam, 46 tuổi",
    vitals: { hr: 88, bp: "130/80", spo2: 99, temp: 37.6 },
    description: "Sưng nóng đỏ đau dữ dội khớp bàn ngón chân cái bên phải (Khớp Bàn-Ngón I) xuất hiện đột ngột lúc nửa đêm sau khi ăn thịt chó và uống bia.",
    symptoms: ["Sưng đỏ dữ dội khớp ngón chân cái", "Khởi phát đột ngột về đêm", "Tiền sử ăn tiệc nhiều đạm rượu bia"],
    values: {
      wbc: 14.5, neu_pct: 82, lym_pct: 12, rbc: 4.8, hb: 148, hct: 44.0,
      mcv: 90.0, mch: 30.0, mchc: 332, rdw: 12.6, plt: 310, retic: 1.0,
      ast: 32, alt: 35, bili_tp: 11.5, bili_tt: 2.8, alb: 44, urea: 7.1, cre: 105, egfr: 78,
      uric: 685, glucose: 5.6, hba1c: 5.5, chol: 5.8, trig: 2.8, pt_pct: 94, inr: 1.0, aptt: 30, fib: 4.2, ddimer: 0.3
    },
    quizOptions: [
      "Cơn Gút cấp tính (Acute Gout)",
      "Viêm khớp nhiễm khuẩn",
      "Viêm khớp dạng thấp",
      "Viêm mô tế bào bàn chân"
    ],
    correctAnswerIndex: 0,
    explanation: "Acid Uric máu tăng rất cao (685 μmol/L > 420 μmol/L) lắng đọng tinh thể Urat tại khớp Bàn-Ngón I gây đáp ứng viêm cấp tính với Bạch cầu tăng (14.5 G/L) và Fibrinogen tăng phản ứng."
  },
  {
    id: "scen_dengue_severe",
    category: "Nhiễm trùng",
    title: "Sốt Xuất Huyết Dengue Cảnh Báo Nặng (DHF Grade III)",
    demographics: "Bệnh nhân nữ, 16 tuổi",
    vitals: { hr: 115, bp: "95/70", spo2: 96, temp: 37.4 },
    description: "Ngày thứ 5 của bệnh, sốt giảm nhưng đau bụng vùng gan nhiều, vật vã bứt rứt, chảy máu cam nướu răng, tràn dịch màng phổi nhẹ.",
    symptoms: ["Đau bụng vùng gan", "Vật vã bứt rứt, thoát dịch", "Chảy máu cam nướu răng"],
    values: {
      wbc: 2.4, neu_pct: 42, lym_pct: 50, rbc: 5.6, hb: 165, hct: 51.0,
      mcv: 89.0, mch: 29.5, mchc: 330, rdw: 13.0, plt: 18, retic: 0.8,
      ast: 185, alt: 142, bili_tp: 16.0, bili_tt: 4.5, alb: 32, urea: 8.2, cre: 110, egfr: 68,
      glucose: 4.8, hba1c: 5.0, pt_pct: 68, inr: 1.28, aptt: 45, fib: 1.8, ddimer: 1.8
    },
    quizOptions: [
      "Sốt xuất huyết Dengue có dấu hiệu cảnh báo nặng (Cô đặc máu + Giảm tiểu cầu)",
      "Nhiễm trùng huyết do Gram âm",
      "Cơn sốt rét ác tính",
      "Xuất huyết giảm tiểu cầu tự miễn"
    ],
    correctAnswerIndex: 0,
    explanation: "Tiểu cầu giảm thảm hại (18 G/L), Hct tăng vọt đến 51% (cô đặc máu thoát huyết tương > 20%), Bạch cầu giảm sâu (2.4 G/L) kèm Men gan AST/ALT tăng là bệnh cảnh điển hình của SXH Dengue nặng."
  },
  {
    id: "scen_ckd_endstage",
    category: "Sinh hóa thận",
    title: "Bệnh Thận Mãn Giai Đoạn Cuối / Hội Chứng Ure Máu Cao (ESRD)",
    demographics: "Bệnh nhân nam, 65 tuổi (Tiền sử Tăng huyết áp 15 năm)",
    vitals: { hr: 88, bp: "170/100", spo2: 95, temp: 36.6 },
    description: "Phù 2 chân, mệt mỏi ăn uống kém, buồn nôn, da xám xịt khô ngứa, hơi thở mùi khai ure, thiếu máu mạn nặng.",
    symptoms: ["Hơi thở mùi khai Ure", "Phù 2 chân + Tăng huyết áp kháng trị", "Thiếu máu mạn da xám"],
    values: {
      wbc: 6.2, neu_pct: 65, lym_pct: 26, rbc: 2.4, hb: 71, hct: 22.0,
      mcv: 88.0, mch: 29.0, mchc: 328, rdw: 13.5, plt: 135, retic: 0.5,
      ast: 24, alt: 20, bili_tp: 9.0, bili_tt: 2.1, alb: 32,
      urea: 34.5, cre: 820, egfr: 5, uric: 610, glucose: 5.4, hba1c: 5.8,
      pt_pct: 82, inr: 1.12, aptt: 32, fib: 3.1, ddimer: 0.5
    },
    quizOptions: [
      "Bệnh thận mãn giai đoạn cuối (ESRD - eGFR < 15 mL/min)",
      "Tổn thương thận cấp phục hồi",
      "Thiếu máu thiếu sắt nặng",
      "Suy gan mãn"
    ],
    correctAnswerIndex: 0,
    explanation: "Creatinine tăng mức độ cực kỳ nguy kịch (820 μmol/L) khiến eGFR giảm xuống chỉ còn 5 mL/min/1.73m² (giai đoạn cuối) kéo theo Ure máu tăng 34.5 mmol/L và Thiếu máu đẳng sắc đẳng bào do thiếu Erythropoietin."
  }
];
