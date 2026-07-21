/* ════════════════════════════════════════════════════════════════
   CLINIPORTAL - PHARMACOLOGY INTERACTIVE TOOLS MODULE
   Xử lý logic: Ma trận tương tác thuốc, Hiệu chỉnh liều Gan/Thận,
   Bộ quy đổi liều tương đương và Widget Độc chất mở rộng
   ════════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ════════════════════════════════════════════════════════════════
  // 1. DATA MATRIX TƯƠNG TÁC THUỐC LÂM SÀNG
  // ════════════════════════════════════════════════════════════════
  const DRUG_INTERACTION_DB = [
    {
      drugs: ["clopidogrel", "omeprazole"],
      severity: "severe",
      title: "Clopidogrel + Omeprazole",
      desc: "Omeprazole ức chế mạnh isoenzym CYP2C19 tại gan, làm giảm sự chuyển hóa Clopidogrel thành chất có hoạt tính antiplatelet. Điều này làm gia tăng nguy cơ biến cố huyết khối tim mạch và tắc stent.",
      management: "💡 **Khuyến cáo**: Đổi Omeprazole sang **Pantoprazole** hoặc **Rabeprazole** (ít ức chế CYP2C19 hơn) hoặc dùng H2RA (Famotidine) nếu cần bảo vệ dạ dày."
    },
    {
      drugs: ["warfarin", "amiodarone"],
      severity: "severe",
      title: "Warfarin + Amiodarone",
      desc: "Amiodarone ức chế CYP2C9 và CYP3A4, làm giảm chuyển hóa Warfarin. INR có thể tăng vọt sau 1-2 tuần phối hợp, gây xuất huyết nghiêm trọng đe dọa tính mạng.",
      management: "💡 **Khuyến cáo**: Giảm ngay 30% – 50% liều Warfarin khi bắt đầu dùng Amiodarone. Theo dõi sát INR mỗi 2-3 ngày."
    },
    {
      drugs: ["acei_arb", "spironolactone"],
      severity: "moderate",
      title: "Ức chế men chuyển (ACEi/ARB) + Spironolactone/Eplerenone",
      desc: "Phối hợp làm gia tăng đáng kể nguy cơ Tăng Kali máu nặng (Hyperkalemia > 5.5 mmol/L), đặc biệt ở bệnh nhân có suy thận kèm theo (eGFR < 45 ml/min).",
      management: "💡 **Khuyến cáo**: Kiểm tra nồng độ Kali máu và Creatinin huyết thanh sau 1 và 4 tuần khởi đầu điều trị. Tránh dùng khi eGFR < 30 ml/min."
    },
    {
      drugs: ["metformin", "contrast"],
      severity: "severe",
      title: "Metformin + Thuốc cản quang đường tĩnh mạch",
      desc: "Thuốc cản quang chứa i-ốt có thể gây suy thận cấp do thuốc cản quang (CIN). Nếu xảy ra suy thận cấp, Metformin sẽ bị tích lũy gây Nhiễm toan Lactic (Lactic Acidosis) tử vong cao.",
      management: "💡 **Khuyến cáo**: Tạm ngưng Metformin vào thời điểm chụp hoặc trước 48h (nếu eGFR 30-60 ml/min). Chỉ dùng lại sau 48h khi chức năng thận ổn định."
    },
    {
      drugs: ["ciprofloxacin", "antacid"],
      severity: "moderate",
      title: "Fluoroquinolones (Ciprofloxacin/Levofloxacin) + Antacid / Sucralfate / Cation đa trị",
      desc: "Các cation đa trị (Al3+, Mg2+, Ca2+, Fe2+) trong thuốc dạ dày/vi chất gắn chelate với Fluoroquinolones tại ruột, giảm hấp thu kháng sinh lên tới 75-90%.",
      management: "💡 **Khuyến cáo**: Uống Fluoroquinolones ít nhất 2 giờ trước hoặc 6 giờ sau khi dùng Antacid/Sucralfate/Viên Sắt."
    },
    {
      drugs: ["ssri", "tramadol"],
      severity: "severe",
      title: "Thuốc ức chế tái hấp thu Serotonin (SSRI) + Tramadol",
      desc: "Cả hai nhóm đều làm tăng nồng độ Serotonin trong khe synap. Phối hợp gây nguy cơ Hội chứng Serotonin (Serotonin Syndrome: sốt cao, co giật, tăng phản xạ, vã mồ hôi, biến động HA).",
      management: "💡 **Khuyến cáo**: Hạn chế phối hợp. Nếu bắt đầu có triệu chứng ngộ độc Serotonin, ngừng ngay cả 2 thuốc và hỗ trợ chức năng sống."
    },
    {
      drugs: ["digoxin", "verapamil"],
      severity: "severe",
      title: "Digoxin + Verapamil / Amiodarone",
      desc: "Verapamil/Amiodarone ức chế bơm P-glycoprotein (P-gp) tại thận và gan, làm giảm thải trừ Digoxin. Nồng độ Digoxin trong máu có thể tăng 50-100%, gây độc tính tim.",
      management: "💡 **Khuyến cáo**: Giảm 50% liều Digoxin khi phối hợp với Verapamil hoặc Amiodarone và theo dõi nồng độ Digoxin đáy."
    },
    {
      drugs: ["nsaid", "aspirin"],
      severity: "moderate",
      title: "NSAIDs (Ibuprofen/Naproxen) + Aspirin liều thấp",
      desc: "Ibuprofen tranh chấp vị trí gắn COX-1 trên tiểu cầu với Aspirin, làm mất tác dụng bảo vệ tim mạch của Aspirin. Ngoài ra làm tăng gấp 2-4 lần nguy cơ loét/xuất huyết dạ dày.",
      management: "💡 **Khuyến cáo**: Uống Aspirin ít nhất 30 phút trước hoặc 8 giờ sau khi uống Ibuprofen. Tốt nhất chọn giảm đau thay thế như Paracetamol."
    }
  ];

  // ════════════════════════════════════════════════════════════════
  // 2. DATA MÁY TÍNH HIỆU CHỈNH LIỀU GAN THẬN
  // ════════════════════════════════════════════════════════════════
  const RENAL_DOSE_DB = [
    {
      name: "Vancomycin",
      category: "Kháng sinh Glycopeptide",
      calc: (egfr) => {
        if (egfr >= 60) return { status: "normal", text: "Liều chuẩn: 15–20 mg/kg q8–12h (Duy trì nồng độ đáy 15-20 mcg/mL)", note: "Chức năng thận bình thường." };
        if (egfr >= 30) return { status: "reduced", text: "Hiệu chỉnh liều: 15–20 mg/kg q24h", note: "Giảm tần suất đưa thuốc. Định lượng nồng độ Trough trước liều thứ 3." };
        if (egfr >= 15) return { status: "reduced", text: "Hiệu chỉnh liều: 15–20 mg/kg q48h", note: "Suy thận nặng. Cần đo nồng độ thuốc để quyết định liều tiếp theo." };
        return { status: "contraindicated", text: "Liều tải 1000mg, sau đó dùng theo nồng độ Trough hoặc sau lọc máu (HD)", note: "Bệnh nhân suy thận giai đoạn cuối / Lọc máu." };
      }
    },
    {
      name: "Meropenem",
      category: "Kháng sinh Carbapenem",
      calc: (egfr) => {
        if (egfr >= 50) return { status: "normal", text: "Liều chuẩn: 1g q8h IV", note: "Liều chuẩn cho nhiễm trùng nặng." };
        if (egfr >= 26) return { status: "reduced", text: "Hiệu chỉnh liều: 1g q12h IV", note: "Giảm tần suất đưa thuốc." };
        if (egfr >= 10) return { status: "reduced", text: "Hiệu chỉnh liều: 500mg q12h IV", note: "Giảm 50% liều và tần suất." };
        return { status: "contraindicated", text: "Hiệu chỉnh liều: 500mg q24h IV", note: "Bệnh nhân suy thận rất nặng." };
      }
    },
    {
      name: "Rivaroxaban (Xarelto)",
      category: "Thuốc chống đông DOAC",
      calc: (egfr) => {
        if (egfr >= 50) return { status: "normal", text: "Liều chuẩn: 20mg 1 lần/ngày (dùng cùng thức ăn)", note: "Chỉ định Rung nhĩ không do bệnh van tim." };
        if (egfr >= 15) return { status: "reduced", text: "Hiệu chỉnh liều: 15mg 1 lần/ngày", note: "Thận trọng theo dõi nguy cơ xuất huyết." };
        return { status: "contraindicated", text: "Chống chỉ định (CrCl < 15 ml/min)", note: "Không khuyến cáo sử dụng do nguy cơ tích lũy độc tính xuất huyết." };
      }
    },
    {
      name: "Metformin",
      category: "Thuốc điều trị Đái tháo đường",
      calc: (egfr) => {
        if (egfr >= 60) return { status: "normal", text: "Liều chuẩn: 1000–2000mg/ngày", note: "An toàn." };
        if (egfr >= 45) return { status: "normal", text: "Tối đa 2000mg/ngày. Theo dõi eGFR mỗi 3-6 tháng", note: "Khuyến cáo an toàn." };
        if (egfr >= 30) return { status: "reduced", text: "Tối đa 1000mg/ngày. KHÔNG khởi đầu mới Metformin", note: "Giảm 50% liều tối đa. Cảnh báo Nhiễm toan Lactic." };
        return { status: "contraindicated", text: "Chống chỉ định tuyệt đối (eGFR < 30 ml/min)", note: "Nguy cơ cao Nhiễm toan Lactic đe dọa tính mạng." };
      }
    }
  ];

  // ════════════════════════════════════════════════════════════════
  // 3. DATA QUY ĐỔI LIỀU TƯƠNG ĐƯƠNG (CORTICOID & OPIOIDS)
  // ════════════════════════════════════════════════════════════════
  const STEROID_EQUIV_TABLE = [
    { name: "Hydrocortisone", equivDose: 20, antiInflam: 1, mineralo: 2, duration: "8 - 12h (Ngắn)" },
    { name: "Prednisone", equivDose: 5, antiInflam: 4, mineralo: 1, duration: "18 - 36h (Vừa)" },
    { name: "Prednisolone", equivDose: 5, antiInflam: 4, mineralo: 1, duration: "18 - 36h (Vừa)" },
    { name: "Methylprednisolone", equivDose: 4, antiInflam: 5, mineralo: 0.5, duration: "18 - 36h (Vừa)" },
    { name: "Triamcinolone", equivDose: 4, antiInflam: 5, mineralo: 0, duration: "18 - 36h (Vừa)" },
    { name: "Dexamethasone", equivDose: 0.75, antiInflam: 30, mineralo: 0, duration: "36 - 54h (Dài)" },
    { name: "Betamethasone", equivDose: 0.6, antiInflam: 30, mineralo: 0, duration: "36 - 54h (Dài)" }
  ];

  const OPIOID_OME_TABLE = [
    { name: "Morphine (Uống)", factor: 1 },
    { name: "Morphine (Tĩnh mạch/Bắp)", factor: 3 },
    { name: "Oxycodone (Uống)", factor: 1.5 },
    { name: "Hydromorphone (Uống)", factor: 4 },
    { name: "Tramadol (Uống)", factor: 0.1 },
    { name: "Codeine (Uống)", factor: 0.15 },
    { name: "Fentanyl dán (mcg/h)", factor: 2.4 } // Approx OME per mcg/h
  ];

  // ════════════════════════════════════════════════════════════════
  // 4. DATA ANTIDOTE FINDER MỞ RỘNG (TOXICOLOGY)
  // ════════════════════════════════════════════════════════════════
  const EXTENDED_ANTIDOTE_DB = {
    para: {
      name: "Paracetamol (Acetaminophen)",
      toxidrome: "Buồn nôn, vã mồ hôi, hủy hoại tế bào gan (men gan AST/ALT tăng vọt sau 24-48h), suy gan cấp, bệnh não gan.",
      antidote: "N-Acetylcysteine (NAC)",
      pearl: "Hiệu quả bảo vệ gan đạt tối đa khi dùng NAC trong vòng 8 giờ đầu sau ngộ độc. Sử dụng biểu đồ Rumack-Matthew."
    },
    opioids: {
      name: "Opioids (Morphine, Heroin, Fentanyl)",
      toxidrome: "Tam chứng ngộ độc: Suy giảm ý thức (hôn mê), suy hô hấp nặng (nhịp thở chậm, nông), đồng tử co nhỏ đinh ghim.",
      antidote: "Naloxone (Narcan)",
      pearl: "Thời gian bán thải Naloxone ngắn (30-90 phút). Cần theo dõi sát để tiêm nhắc lại hoặc truyền tĩnh mạch liên tục."
    },
    benzo: {
      name: "Benzodiazepines (Seduxen, Diazepam)",
      toxidrome: "Ngủ gà, lơ mơ, mất điều hòa vận động, nói ngọng, suy giảm tri giác kèm suy hô hấp nhẹ đến trung bình.",
      antidote: "Flumazenil (Anexate)",
      pearl: "Chống chỉ định tương đối ở người dùng benzo mạn tính hoặc nghi ngờ ngộ độc phối hợp TCA do nguy cơ co giật."
    },
    beta: {
      name: "Beta-blockers (Propranolol, Atenolol)",
      toxidrome: "Nhịp tim chậm, tụt huyết áp kéo dài, block dẫn truyền nhĩ thất, co thắt phế quản, hạ đường huyết.",
      antidote: "Glucagon / Insulin liều cao + Glucose IV",
      pearl: "Glucagon kích hoạt hệ thống cAMP không qua thụ thể beta. Insulin liều cao (1 IU/kg/h) hỗ trợ cơ tim sử dụng năng lượng."
    },
    phospho: {
      name: "Phospho hữu cơ / Thuốc trừ sâu",
      toxidrome: "Hội chứng cường cholinergic (DUMBBELS): Co đồng tử, tăng tiết dịch (nước bọt, mồ hôi, dịch phế quản), nhịp chậm, tiêu chảy.",
      antidote: "Atropine + Pralidoxime (PAM)",
      pearl: "Atropin hóa đến khi đạt tiêu chí phổi khô, hết co thắt phế quản, nhịp tim > 80 lần/phút."
    },
    digoxin: {
      name: "Digoxin (Thuốc trợ tim)",
      toxidrome: "Nhìn màu vàng xanh (xanthopsia), buồn nôn, loạn nhịp tim (nhịp nhanh thất, block tim), tăng Kali máu.",
      antidote: "Kháng thể kháng Digoxin (Digibind / DigiFab)",
      pearl: "Chỉ định giải độc đặc hiệu khi bệnh nhân có loạn nhịp đe dọa tính mạng hoặc Kali > 5.0 mmol/L."
    },
    coag: {
      name: "Thuốc chống đông (Heparin / Warfarin / DOACs)",
      toxidrome: "Xuất huyết tự phát (dưới da, chảy máu chân răng, đái máu, xuất huyết tiêu hóa hoặc nội sọ), PT/APTT kéo dài.",
      antidote: "Protamine (Heparin) | Vitamin K / PCC (Warfarin) | Idarucizumab / Andexanet alfa (DOACs)",
      pearl: "Bổ sung Phức hợp Prothrombin cô đặc (PCC) giúp bù nhanh yếu tố đông máu khẩn cấp."
    },
    co: {
      name: "Khí Carbon Monoxide (CO)",
      toxidrome: "Đau đầu, chóng mặt, buồn nôn, da màu đỏ anh đào (cherry-red), hạ huyết áp, hôn mê, thiếu máu cơ tim cấp.",
      antidote: "Oxy nguyên chất 100% / Oxy cao áp (HBO)",
      pearl: "Oxy 100% giúp giảm thời gian bán thải của Carboxyhemoglobin (COHb) từ 5 giờ xuống còn khoảng 80 phút."
    },
    methanol: {
      name: "Methanol / Cồn công nghiệp",
      toxidrome: "Nhiễm toan chuyển hóa khoảng trống Anion nặng, mờ mắt (nhìn như trong cơn bão tuyết), mù lụa, hoại tử nhân bèo.",
      antidote: "Fomepizole / Ethanol đường uống hoặc IV",
      pearl: "Fomepizole/Ethanol ức chế enzym Alcohol Dehydrogenase (ADH), ngăn cản tạo ra acid formic độc hại."
    },
    last: {
      name: "Ngộ độc Thuốc tê cục bộ (LAST - Local Anesthetic Toxicity)",
      toxidrome: "Tê quanh miệng, vị kim loại trong miệng, ù tai, hưng phấn/co giật tiếp theo là ức chế thần kinh, tụt HA, vô tâm thu.",
      antidote: "Nhũ dịch Lipid 20% (Intralipid 20%)",
      pearl: "Truyền tĩnh mạch nhũ dịch Lipid ngay khi có dấu hiệu LAST đe dọa tính mạng để tạo 'sink' hấp thu thuốc tê rời khỏi mô tim/não."
    }
  };

  // ════════════════════════════════════════════════════════════════
  // INITIALIZATION AND EVENT BINDINGS
  // ════════════════════════════════════════════════════════════════
  document.addEventListener("DOMContentLoaded", function () {
    initPolypharmacyMatrix();
    initDoseCalibrator();
    initSteroidOpioidConverter();
    initEnhancedAntidoteFinder();
  });

  // 1. Matrix logic
  function initPolypharmacyMatrix() {
    const chips = document.querySelectorAll(".drug-select-chip");
    const resultBox = document.getElementById("matrix-result-container");
    if (!chips.length || !resultBox) return;

    let selectedDrugs = [];

    chips.forEach((chip) => {
      chip.addEventListener("click", function () {
        const drugId = this.getAttribute("data-drug");

        if (this.classList.contains("active")) {
          this.classList.remove("active");
          selectedDrugs = selectedDrugs.filter((d) => d !== drugId);
        } else {
          this.classList.add("active");
          selectedDrugs.push(drugId);
        }

        renderMatrixResults(selectedDrugs, resultBox);
      });
    });
  }

  function renderMatrixResults(selectedDrugs, container) {
    if (selectedDrugs.length < 2) {
      container.innerHTML = `
        <div style="text-align: center; color: var(--color-text-muted); padding: 1rem;">
          <p style="margin: 0; font-size: 0.875rem;">💡 Nhấn chọn ít nhất <strong>2 loại thuốc</strong> ở trên để kiểm tra tương tác sinh học tương ứng.</p>
        </div>
      `;
      return;
    }

    let matchedInteractions = [];

    DRUG_INTERACTION_DB.forEach((item) => {
      const matchCount = item.drugs.filter((d) => selectedDrugs.includes(d)).length;
      if (matchCount >= 2) {
        matchedInteractions.push(item);
      }
    });

    if (matchedInteractions.length === 0) {
      container.innerHTML = `
        <div class="interaction-alert safe">
          <div class="interaction-alert-header">
            <span class="interaction-drugs-title">✅ Chưa phát hiện tương tác nghiêm trọng</span>
            <span class="interaction-severity-badge">An toàn</span>
          </div>
          <p class="interaction-desc">Các thuốc được chọn chưa có ghi nhận tương tác bất lợi mức độ trung bình-nặng trong cơ sở dữ liệu lâm sàng nhanh.</p>
        </div>
      `;
      return;
    }

    let html = "";
    matchedInteractions.forEach((item) => {
      const icon = item.severity === "severe" ? "🚨" : "⚠️";
      html += `
        <div class="interaction-alert ${item.severity}">
          <div class="interaction-alert-header">
            <span class="interaction-drugs-title">${icon} ${item.title}</span>
            <span class="interaction-severity-badge">${item.severity === "severe" ? "Chống chỉ định / Nguy hiểm" : "Thận trọng"}</span>
          </div>
          <p class="interaction-desc">${item.desc}</p>
          <div class="interaction-management">${item.management}</div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // 2. Dose Calibrator Logic
  function initDoseCalibrator() {
    const egfrInput = document.getElementById("calibrator-egfr");
    const container = document.getElementById("dose-calibrator-results");
    if (!egfrInput || !container) return;

    function updateDoses() {
      const egfr = parseFloat(egfrInput.value) || 90;
      let html = "";

      RENAL_DOSE_DB.forEach((drug) => {
        const res = drug.calc(egfr);
        let badgeClass = "status-normal";
        if (res.status === "reduced") badgeClass = "status-reduced";
        if (res.status === "contraindicated") badgeClass = "status-contraindicated";

        html += `
          <div class="dose-card">
            <div class="dose-card-header">
              <span class="dose-drug-name">${drug.name}</span>
              <span class="dose-status-badge ${badgeClass}">${res.status.toUpperCase()}</span>
            </div>
            <div class="dose-value-text">${res.text}</div>
            <div class="dose-note-text">💡 ${res.note}</div>
          </div>
        `;
      });

      container.innerHTML = html;
    }

    egfrInput.addEventListener("input", updateDoses);
    updateDoses();
  }

  // 3. Steroid & Opioid Converter Logic
  function initSteroidOpioidConverter() {
    const steroidInput = document.getElementById("steroid-base-val");
    const steroidSelect = document.getElementById("steroid-base-drug");
    const steroidContainer = document.getElementById("steroid-calc-results");

    if (!steroidInput || !steroidSelect || !steroidContainer) return;

    function updateSteroidTable() {
      const val = parseFloat(steroidInput.value) || 0;
      const baseName = steroidSelect.value;
      const baseItem = STEROID_EQUIV_TABLE.find((s) => s.name === baseName);

      if (!baseItem) return;

      const baseEquiv = baseItem.equivDose;

      let html = `
        <table class="conversion-table">
          <thead>
            <tr>
              <th>Tên Corticosteroid</th>
              <th>Liều Tương Đương</th>
              <th>Tác Dụng Kháng Viêm</th>
              <th>Giữ Muối (Mineralo)</th>
              <th>Thời Gian Tác Dụng</th>
            </tr>
          </thead>
          <tbody>
      `;

      STEROID_EQUIV_TABLE.forEach((item) => {
        const calculatedDose = ((val * item.equivDose) / baseEquiv).toFixed(2);
        const isSelected = item.name === baseName;
        html += `
          <tr class="${isSelected ? "highlight-row" : ""}">
            <td><strong>${item.name}</strong> ${isSelected ? "(Thuốc gốc)" : ""}</td>
            <td><span style="color:var(--color-primary); font-weight:700;">${calculatedDose} mg</span></td>
            <td>${item.antiInflam}x</td>
            <td>${item.mineralo}x</td>
            <td>${item.duration}</td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      steroidContainer.innerHTML = html;
    }

    steroidInput.addEventListener("input", updateSteroidTable);
    steroidSelect.addEventListener("change", updateSteroidTable);
    updateSteroidTable();
  }

  // 4. Enhanced Antidote Finder logic
  function initEnhancedAntidoteFinder() {
    const searchInput = document.getElementById("antidoteSearchInput");
    const container = document.getElementById("antidoteDetailsCard");
    const listBtns = document.getElementById("antidoteList");

    if (!listBtns || !container) return;

    function renderToxicDetail(key) {
      const data = EXTENDED_ANTIDOTE_DB[key];
      if (!data) return;

      // Update button active state
      document.querySelectorAll(".antidote-item-btn").forEach((btn) => {
        if (btn.getAttribute("data-toxic") === key) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      container.innerHTML = `
        <div class="physio-details-header">
          <h4 style="color: var(--color-danger); font-weight: 700; margin:0;"><span>${data.name}</span></h4>
          <span class="element-badge" style="background-color: var(--color-danger); color:#fff; padding:2px 8px; border-radius:4px; font-size:11px;">Giải độc</span>
        </div>
        <div class="meridian-detail-row" style="margin-top:0.5rem;">
          <strong style="font-size:0.825rem; color:var(--color-text);">Hội chứng lâm sàng (Toxidrome):</strong>
          <p class="meridian-detail-desc" style="color: var(--color-text); font-size:0.825rem; margin:0.2rem 0;">${data.toxidrome}</p>
        </div>
        <div class="meridian-detail-row" style="border-top: 1px dashed var(--color-border); padding-top: 0.5rem; margin-top: 0.5rem;">
          <strong style="font-size:0.825rem;">Thuốc giải độc đặc hiệu:</strong>
          <p class="meridian-detail-desc" style="color: var(--color-primary); font-weight: 700; font-size: 0.85rem; margin:0.2rem 0;">💊 ${data.antidote}</p>
        </div>
        <div class="meridian-detail-row" style="border-top: 1px dashed var(--color-border); padding-top: 0.5rem; margin-top: 0.5rem;">
          <strong style="font-size:0.825rem;">Lưu ý lâm sàng:</strong>
          <p class="meridian-detail-desc" style="color: var(--color-text-muted); font-size:0.8rem; margin:0.2rem 0;">💡 ${data.pearl}</p>
        </div>
      `;
    }

    // Bind click events
    listBtns.addEventListener("click", function (e) {
      const btn = e.target.closest(".antidote-item-btn");
      if (btn) {
        const key = btn.getAttribute("data-toxic");
        renderToxicDetail(key);
      }
    });

    // Render initial
    renderToxicDetail("para");

    // Search filter logic
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        document.querySelectorAll(".antidote-item-btn").forEach((btn) => {
          const key = btn.getAttribute("data-toxic");
          const data = EXTENDED_ANTIDOTE_DB[key];
          if (!data) return;
          const match = data.name.toLowerCase().includes(query) || data.antidote.toLowerCase().includes(query) || data.toxidrome.toLowerCase().includes(query);
          btn.style.display = match ? "block" : "none";
        });
      });
    }
  }

  // Export functions globally if needed
  window.PharmaTools = {
    DRUG_INTERACTION_DB,
    RENAL_DOSE_DB,
    EXTENDED_ANTIDOTE_DB
  };
})();
