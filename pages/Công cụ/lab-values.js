// Dữ liệu & Logic Widget Trị Số Xét Nghiệm Tham Chiếu (Lab Values)

document.addEventListener("DOMContentLoaded", function () {
  const labData = {
    hemato: [
      { key: "wbc", name: "WBC (Bạch cầu)", range: "4.0 - 10.0 G/L" },
      { key: "rbc", name: "RBC (Hồng cầu)", range: "Nam: 4.2 - 5.8 T/L | Nữ: 3.8 - 5.2 T/L" },
      { key: "hb", name: "Hb (Hemoglobin)", range: "Nam: 130 - 170 g/L | Nữ: 120 - 150 g/L" },
      { key: "hct", name: "Hct (Hematocrit)", range: "Nam: 40 - 50% | Nữ: 35 - 45%" },
      { key: "mcv", name: "MCV (Thể tích TB hồng cầu)", range: "80 - 100 fL" },
      { key: "mch", name: "MCH (Lượng Hb TB hồng cầu)", range: "27 - 32 pg" },
      { key: "plt", name: "PLT (Tiểu cầu)", range: "150 - 400 G/L" },
      { key: "neu", name: "Neutrophil (BC trung tính)", range: "40 - 74% (2.0 - 7.5 G/L)" },
      { key: "lym", name: "Lymphocyte (BC Lympho)", range: "20 - 45% (1.0 - 4.0 G/L)" }
    ],
    biochem: [
      { key: "glu", name: "Glucose (Đường huyết đói)", range: "3.9 - 5.6 mmol/L (70 - 100 mg/dL)" },
      { key: "urea", name: "Urea (Ure)", range: "2.5 - 7.5 mmol/L" },
      { key: "cre", name: "Creatinine", range: "Nam: 62 - 115 μmol/L | Nữ: 53 - 97 μmol/L" },
      { key: "egfr", name: "eGFR (Độ lọc cầu thận)", range: ">= 90 mL/min/1.73 m²" },
      { key: "ast", name: "AST (SGOT)", range: "< 40 U/L" },
      { key: "alt", name: "ALT (SGPT)", range: "< 40 U/L" },
      { key: "bil-tp", name: "Bilirubin Toàn phần", range: "< 17.1 μmol/L (< 1.0 mg/dL)" },
      { key: "bil-tt", name: "Bilirubin Trực tiếp", range: "< 5.1 μmol/L (< 0.3 mg/dL)" },
      { key: "alb", name: "Albumin gan", range: "35 - 50 g/L" },
      { key: "prot-tp", name: "Protein Toàn phần", range: "60 - 80 g/L" },
      { key: "acid-uric", name: "Acid Uric", range: "Nam: 200 - 420 μmol/L | Nữ: 140 - 360 μmol/L" }
    ],
    electro: [
      { key: "na", name: "Na+ (Natri)", range: "135 - 145 mmol/L" },
      { key: "k", name: "K+ (Kali)", range: "3.5 - 5.0 mmol/L" },
      { key: "cl", name: "Cl- (Clo)", range: "98 - 106 mmol/L" },
      { key: "ca", name: "Ca2+ (Canxi ion)", range: "1.15 - 1.30 mmol/L" },
      { key: "mg", name: "Mg2+ (Magie)", range: "0.75 - 1.0 mmol/L" },
      { key: "hco3", name: "HCO3- (Bicarbonate)", range: "22 - 26 mmol/L" }
    ],
    coag: [
      { key: "pt", name: "PT (Prothrombin)", range: "10 - 14 giây (70 - 100%)" },
      { key: "aptt", name: "APTT (Đường đông máu nội sinh)", range: "25 - 35 giây" },
      { key: "inr", name: "INR (Chỉ số chuẩn hóa)", range: "0.8 - 1.2 (Warfarin mục tiêu: 2.0 - 3.0)" },
      { key: "fib", name: "Fibrinogen", range: "2.0 - 4.0 g/L" }
    ]
  };

  const tabBtns = document.querySelectorAll(".lab-tab-btn");
  const listEl = document.getElementById("labList");
  const detailsCard = document.getElementById("labDetailsCard");

  if (!listEl || !detailsCard) return;

  let currentTab = "hemato";

  function renderTab(tabKey) {
    currentTab = tabKey;
    const items = labData[tabKey];
    if (!items) return;

    listEl.innerHTML = items.map(item => `
      <div class="lab-item-badge" data-key="${item.key}" title="${item.name}">
        ${item.key.toUpperCase()}
      </div>
    `).join("");

    // Add event listeners to badges
    const badges = listEl.querySelectorAll(".lab-item-badge");
    badges.forEach(badge => {
      badge.addEventListener("click", () => {
        selectItem(badge.getAttribute("data-key"));
      });
    });

    // Auto select first item
    if (items.length > 0) {
      selectItem(items[0].key);
    }
  }

  function selectItem(key) {
    const items = labData[currentTab];
    if (!items) return;
    const item = items.find(i => i.key === key);
    if (!item) return;

    // Highlight active badge
    listEl.querySelectorAll(".lab-item-badge").forEach(badge => {
      if (badge.getAttribute("data-key") === key) {
        badge.classList.add("active");
      } else {
        badge.classList.remove("active");
      }
    });

    // Render details
    detailsCard.innerHTML = `
      <div class="physio-details-header">
        <h4><span>📊 ${item.name}</span></h4>
        <span class="element-badge" style="background-color: var(--color-cyan)">Khoảng tham chiếu</span>
      </div>
      <div class="meridian-detail-row" style="margin-bottom: 0; padding: 0.5rem 0; text-align: center;">
        <strong style="display: block; margin-bottom: 0.5rem; font-size: var(--text-xs); color: var(--color-text-muted);">TRỊ SỐ THAM CHIẾU BÌNH THƯỜNG</strong>
        <p style="font-size: var(--text-md); color: var(--color-cyan); font-weight: 800; margin: 0; letter-spacing: 0.5px;">${item.range}</p>
      </div>
    `;
  }

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTab(btn.getAttribute("data-tab"));
    });
  });

  // Initialize
  renderTab("hemato");
});
