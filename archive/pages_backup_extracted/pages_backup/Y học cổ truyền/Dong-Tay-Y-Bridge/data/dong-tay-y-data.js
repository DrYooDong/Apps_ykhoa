/**
 * DONG TAY Y BRIDGE DATA STORE - CliniPortal YHCT Module
 * Ma trận đối chiếu tương tác Bệnh danh YHCT ↔ Mã ICD-10 Tây y, Phác đồ kết hợp & Tương tác Thuốc Đông-Tây y
 */

const DONG_TAY_Y_DATA = {
  matrix: [
    {
      id: "tieu-khat",
      tcmName: "Tiêu Khát (Thượng / Trung / Hạ Tiêu)",
      icd10: "E11 — Đái tháo đường Tuýp 2 (Type 2 Diabetes Mellitus)",
      tcmMechanism: "Âm hư táo nhiệt (Thận âm hư tổn, Vị hỏa vượng, Phế táo nhiệt).",
      westMechanism: "Kháng Insulin tại mô đích & suy giảm tiết Insulin tế bào beta tụy.",
      combinedRegimen: "Kết hợp Metformin + Bài thuốc Lục Vị Địa Hoàng Hoàn / Sinh Thiết Thang giúp ổn định đường huyết & bảo vệ chức năng thận.",
      herbInteraction: "⚠️ Thận trọng khi dùng cùng Nhân sâm liều cao vì có thể hạ đường huyết quá đà (Hypoglycemia)."
    },
    {
      id: "huyen-vung",
      tcmName: "Huyễn Vựng (Can Dương Thượng Cang / Tỳ Hư Đờm Thấp)",
      icd10: "I10 — Tăng huyết áp vô căn (Essential Hypertension)",
      tcmMechanism: "Can âm hư không chế được Can dương (Can dương bốc cao) hoặc Tỳ hư sinh đờm trọc che lấp thanh dương.",
      westMechanism: "Tăng sức cản mạch máu ngoại vi & tăng hoạt tính hệ RAAS.",
      combinedRegimen: "Kết hợp Thuốc chẹn canxi (Amlodipine) / ARB + Bài thuốc Thiên Ma Câu Đằng Ẩm / Long Đởm Tả Can Thang.",
      herbInteraction: "⚠️ Cấm dùng Ma Hoàng cho bệnh nhân tăng huyết áp vì chứa Ephedrine gây co mạch bốc áp kịch phát."
    },
    {
      id: "trung-phong",
      tcmName: "Trúng Phong (Huyết Ứ Trệ / Can Phong Nội Động)",
      icd10: "I63 — Đột quỵ nhồi máu não (Ischemic Stroke)",
      tcmMechanism: "Khí hư huyết ứ trệ kinh lạc, Can phong nội động kẹp đờm trọc bốc lên não.",
      westMechanism: "Tắc nghẽn động mạch não gây thiếu máu cục bộ vùng nhu mô não.",
      combinedRegimen: "Kết hợp Chống tập kết tiểu cầu (Aspirin/Clopidogrel) + Bài thuốc Bổ Dương Hoàn Ngũ Thang (Hoàng Kỳ 60g + Đương Quy).",
      herbInteraction: "⚠️ Thận trọng khi phối hợp Đương Quy / Hồng Hoa / Tam Thất với Warfarin/Aspirin vì tăng nguy cơ xuất huyết."
    },
    {
      id: "tam-thong",
      tcmName: "Tâm Thống / Nhoải Tâm (Tâm Huyết Ứ Trệ)",
      icd10: "I20 — Bệnh cơ tim thiếu máu cục bộ / Đau thắt ngực (Angina Pectoris)",
      tcmMechanism: "Tâm dương hư, Tâm huyết ứ trệ, hàn ngưng trệ tâm mạch.",
      westMechanism: "Xơ vữa động mạch vành làm hẹp lòng mạch giảm tưới máu cơ tim.",
      combinedRegimen: "Kết hợp Nitroglycerin / Statin + Bài thuốc Đan Sâm Ẩm / Thất Tiếu Tản / Huyết Phủ Trục Ứ Thang.",
      herbInteraction: "⚠️ Đan Sâm tương tác làm tăng tác dụng chống đông của Warfarin."
    },
    {
      id: "vung-khai",
      tcmName: "Khái Suyễn (Phế Khí Hư / Đờm Thấp Ứ Phế)",
      icd10: "J44 — Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD) / J45 - Hen Phế Quản",
      tcmMechanism: "Phế khí hư không tuyên phát túc giáng, đờm thấp tích tụ gây co thắt phế quản.",
      westMechanism: "Viêm mạn tính đường thở, tăng tiết nhầy & co thắt cơ trơn phế quản.",
      combinedRegimen: "Kết hợp Thuốc giãn phế quản LABA/LAMA + Bài thuốc Tô Tử Giáng Khí Thang / Định Suyễn Thang.",
      herbInteraction: "⚠️ Cam Thảo liều cao dùng kéo dài có thể gây tích nước giữ muối, tăng tải cho hệ hô hấp suy tim."
    }
  ],

  safetyAlerts: [
    { herbs: "Nhân Sâm + Warfarin / Aspirin", alert: "Tăng nguy cơ chảy máu hoặc làm rối loạn chỉ số đông máu INR." },
    { herbs: "Cam Thảo + Digoxin / Furosemide", alert: "Cam Thảo làm mất Kali máu, tăng nguy cơ ngộ độc Digoxin gây rối loạn nhịp tim." },
    { herbs: "Ma Hoàng + Thuốc Kháng MAO / Giao Cảm", alert: "Gây cơn tăng huyết áp kịch phát & nguy cơ tử vong." }
  ]
};
