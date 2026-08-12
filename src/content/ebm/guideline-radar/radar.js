// radar.js - Guideline Radar Logic

document.addEventListener("DOMContentLoaded", function() {
      const searchInput = document.getElementById("radar-search-input");
      const filterPills = document.querySelectorAll(".filter-pill");
      const savedCountBadge = document.getElementById("saved-count-badge");
      
      const modeBtnDiff = document.getElementById("view-mode-diff");
      const modeBtnTimeline = document.getElementById("view-mode-timeline");
      const feedList = document.getElementById("radar-feed-list");
      const timelineList = document.getElementById("radar-timeline-list");

      let currentFilterType = "spec";
      let currentFilterVal = "all";
      let currentQuery = "";

      // 1. LOCAL STORAGE BOOKMARK SYSTEM
      function getSavedCards() {
        try {
          return JSON.parse(localStorage.getItem("cliniportal_radar_saved")) || [];
        } catch (e) {
          return [];
        }
      }

      function saveCardId(id) {
        let saved = getSavedCards();
        if (!saved.includes(id)) {
          saved.push(id);
          localStorage.setItem("cliniportal_radar_saved", JSON.stringify(saved));
        }
        updateBookmarkUI();
      }

      function removeCardId(id) {
        let saved = getSavedCards();
        saved = saved.filter(item => item !== id);
        localStorage.setItem("cliniportal_radar_saved", JSON.stringify(saved));
        updateBookmarkUI();
      }

      function updateBookmarkUI() {
        const saved = getSavedCards();
        if (savedCountBadge) savedCountBadge.textContent = saved.length;

        document.querySelectorAll(".bookmark-btn").forEach(btn => {
          const cardId = btn.getAttribute("data-card-id");
          if (saved.includes(cardId)) {
            btn.classList.add("saved");
            btn.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
            btn.title = "Đã lưu (Bấm để hủy)";
          } else {
            btn.classList.remove("saved");
            btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
            btn.title = "Lưu thông báo này";
          }
        });
      }

      // PHASE 3: TOAST & EXPORTER UTILS
      function showToast(msg) {
        const toast = document.getElementById("radar-toast");
        const toastMsg = document.getElementById("toast-message");
        if (toast && toastMsg) {
          toastMsg.textContent = msg;
          toast.style.display = "flex";
          setTimeout(() => {
            toast.style.display = "none";
          }, 3000);
        }
      }

      function getMySpecialty() {
        return localStorage.getItem("cliniportal_radar_my_spec") || "cardio";
      }

      function copyCardMarkdown(card) {
        if (!card) return;
        const title = card.querySelector(".radar-card-title")?.textContent.trim() || "";
        const metaSpans = card.querySelectorAll(".radar-meta span");
        const org = metaSpans[0]?.textContent.trim() || "Bộ Y Tế / Hội Chuyên Khoa";
        const date = metaSpans[1]?.textContent.trim() || "2026";
        const corBadge = card.querySelector(".cor-badge")?.textContent.trim() || "Class I";
        const oldText = card.querySelector(".diff-box.old .diff-text")?.textContent.trim() || "";
        const newText = card.querySelector(".diff-box.new .diff-text")?.textContent.trim() || "";
        const reasonText = card.querySelector(".diff-reason-box")?.textContent.replace(/\s+/g, " ").trim() || "";

        const md = `### 🛰️ [Guideline Radar Diff] ${title}

* **Tổ chức phát hành**: ${org} (${date})
* **Mức độ khuyến cáo**: ${corBadge}

#### ❌ Phác đồ / Khuyến cáo cũ:
> ${oldText}

#### ✅ Khuyến cáo mới cập nhật (2026):
> ${newText}

${reasonText ? `> 💡 **Bằng chứng & Lý do thay đổi**: ${reasonText}\n` : ""}
---
*Nguồn: CliniPortal Guideline Radar Diff Viewer & Evidence Hub*`;

        if (navigator.clipboard) {
          navigator.clipboard.writeText(md).then(() => {
            showToast("Đã sao chép tóm tắt EBM dạng Markdown vào Bộ nhớ tạm!");
          });
        } else {
          showToast("Đã chọn tóm tắt EBM!");
        }
      }

      function openExportModal(card) {
        if (!card) return;
        const exportModal = document.getElementById("exportModalBackdrop");
        const container = document.getElementById("infographic-preview-container");
        if (!exportModal || !container) return;

        const title = card.querySelector(".radar-card-title")?.textContent.trim() || "";
        const metaSpans = card.querySelectorAll(".radar-meta span");
        const org = metaSpans[0]?.textContent.trim() || "Bộ Y Tế / Hội Chuyên Khoa";
        const date = metaSpans[1]?.textContent.trim() || "2026";
        const corText = card.querySelector(".cor-badge")?.textContent.trim() || "Class I";
        const oldText = card.querySelector(".diff-box.old .diff-text")?.textContent.trim() || "";
        const newText = card.querySelector(".diff-box.new .diff-text")?.textContent.trim() || "";
        const reasonText = card.querySelector(".diff-reason-box")?.textContent.replace(/\s+/g, " ").trim() || "";

        container.innerHTML = `
          <div class="infographic-preview-card" id="active-infographic-card">
            <div class="infographic-header">
              <div class="infographic-brand">
                <span><i class="fa-solid fa-satellite-dish"></i> CLINIPORTAL GUIDELINE RADAR 2.0</span>
                <span><i class="fa-solid fa-certificate"></i> ${corText}</span>
              </div>
              <h3 class="infographic-title">${title}</h3>
              <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 0.4rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <span><i class="fa-solid fa-building-columns"></i> ${org}</span>
                <span><i class="fa-regular fa-calendar"></i> ${date}</span>
              </div>
            </div>

            <div class="infographic-diff-grid">
              <div class="infographic-box old">
                <div style="font-weight: 800; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--diff-old-text);">
                  Bản Khuyến Cáo / Phác Đồ Cũ ❌
                </div>
                <div style="font-size: 0.88rem; line-height: 1.5; opacity: 0.85; text-decoration: line-through;">${oldText}</div>
              </div>

              <div class="infographic-box new">
                <div style="font-weight: 800; font-size: 0.78rem; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--diff-new-text);">
                  Khuyến Cáo & Thay Đổi Mới (2026) ✅
                </div>
                <div style="font-size: 0.88rem; line-height: 1.5; font-weight: 600;">${newText}</div>
              </div>
            </div>

            ${reasonText ? `
              <div style="background: var(--color-surface-2); border: 1px dashed var(--color-divider); border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5;">
                ${reasonText}
              </div>
            ` : ''}

            <div class="infographic-footer">
              <span>CliniPortal EBM Practice Lab & Guideline Diff Viewer</span>
              <span>cliniportal.vn</span>
            </div>
          </div>
        `;

        exportModal.classList.add("open");

        const btnCopyMd = document.getElementById("btn-copy-exp-md");
        const btnPrint = document.getElementById("btn-print-infographic");

        if (btnCopyMd) {
          btnCopyMd.onclick = () => copyCardMarkdown(card);
        }
        if (btnPrint) {
          btnPrint.onclick = () => window.print();
        }
      }

      const exportModalBackdrop = document.getElementById("exportModalBackdrop");
      const exportModalCloseBtn = document.getElementById("exportModalCloseBtn");

      if (exportModalCloseBtn) {
        exportModalCloseBtn.addEventListener("click", () => {
          if (exportModalBackdrop) exportModalBackdrop.classList.remove("open");
        });
      }
      if (exportModalBackdrop) {
        exportModalBackdrop.addEventListener("click", (e) => {
          if (e.target === exportModalBackdrop) {
            exportModalBackdrop.classList.remove("open");
          }
        });
      }

      function bindRadarCardEvents() {
        document.querySelectorAll(".bookmark-btn").forEach(btn => {
          if (!btn.dataset.bound) {
            btn.dataset.bound = "true";
            btn.addEventListener("click", (e) => {
              e.stopPropagation();
              const cardId = btn.getAttribute("data-card-id");
              const saved = getSavedCards();
              if (saved.includes(cardId)) {
                removeCardId(cardId);
              } else {
                saveCardId(cardId);
              }
              if (currentFilterType === "saved") {
                filterCards();
              }
            });
          }
        });

        // Bind Copy Markdown & Export Infographic Card buttons
        document.querySelectorAll(".radar-card").forEach(card => {
          const footer = card.querySelector(".card-footer-bar");
          if (footer && !footer.dataset.p3bound) {
            footer.dataset.p3bound = "true";

            const copyBtn = document.createElement("button");
            copyBtn.className = "action-btn-link copy-md-btn";
            copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Sao Chép Markdown';
            copyBtn.title = "Sao chép tóm tắt EBM dạng Markdown";
            copyBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              copyCardMarkdown(card);
            });

            const exportBtn = document.createElement("button");
            exportBtn.className = "action-btn-link export-card-btn";
            exportBtn.innerHTML = '<i class="fa-solid fa-share-nodes"></i> Xuất Infographic';
            exportBtn.title = "Xuất thẻ Infographic báo cáo";
            exportBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              openExportModal(card);
            });

            footer.appendChild(copyBtn);
            footer.appendChild(exportBtn);
          }
        });

        updateBookmarkUI();
      }

      bindRadarCardEvents();

      // 2. SEARCH & FILTER LOGIC
      function filterCards() {
        const saved = getSavedCards();
        const mySpec = getMySpecialty();
        const cards = document.querySelectorAll(".radar-card");
        cards.forEach(card => {
          const cardId = card.getAttribute("data-card-id");
          const cardSpec = card.getAttribute("data-spec") || "";
          const cardCor = card.getAttribute("data-cor") || "";
          const cardText = card.textContent.toLowerCase();

          let matchesFilter = false;

          if (currentFilterType === "spec") {
            matchesFilter = (currentFilterVal === "all") || cardSpec.includes(currentFilterVal);
          } else if (currentFilterType === "my_spec") {
            matchesFilter = cardSpec.includes(mySpec);
          } else if (currentFilterType === "cor") {
            matchesFilter = (cardCor === currentFilterVal);
          } else if (currentFilterType === "saved") {
            matchesFilter = saved.includes(cardId);
          }

          const matchesQuery = !currentQuery || cardText.includes(currentQuery);

          if (matchesFilter && matchesQuery) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }

      filterPills.forEach(pill => {
        pill.addEventListener("click", () => {
          filterPills.forEach(p => p.classList.remove("active"));
          pill.classList.add("active");

          currentFilterType = pill.getAttribute("data-filter-type");
          currentFilterVal = pill.getAttribute("data-filter-val");
          filterCards();
        });
      });

      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          currentQuery = e.target.value.toLowerCase().trim();
          filterCards();
        });
      }

      // 3. VIEW MODE TOGGLE (FEED vs TIMELINE vs MATRIX)
      const modeBtnMatrix = document.getElementById("view-mode-matrix");
      const matrixFeed = document.getElementById("radar-matrix-feed");
      const controlsBox = document.querySelector(".radar-controls");

      function switchViewMode(mode) {
        [modeBtnDiff, modeBtnTimeline, modeBtnMatrix].forEach(btn => {
          if (btn) btn.classList.remove("active");
        });
        if (feedList) feedList.style.display = "none";
        if (timelineList) timelineList.style.display = "none";
        if (matrixFeed) matrixFeed.style.display = "none";

        if (mode === "diff") {
          if (modeBtnDiff) modeBtnDiff.classList.add("active");
          if (feedList) feedList.style.display = "flex";
          if (controlsBox) controlsBox.style.display = "flex";
        } else if (mode === "timeline") {
          if (modeBtnTimeline) modeBtnTimeline.classList.add("active");
          if (timelineList) timelineList.style.display = "flex";
          if (controlsBox) controlsBox.style.display = "none";
        } else if (mode === "matrix") {
          if (modeBtnMatrix) modeBtnMatrix.classList.add("active");
          if (matrixFeed) matrixFeed.style.display = "block";
          if (controlsBox) controlsBox.style.display = "none";
          renderAlignmentMatrix();
        }
      }

      if (modeBtnDiff) modeBtnDiff.addEventListener("click", () => switchViewMode("diff"));
      if (modeBtnTimeline) modeBtnTimeline.addEventListener("click", () => switchViewMode("timeline"));
      if (modeBtnMatrix) modeBtnMatrix.addEventListener("click", () => switchViewMode("matrix"));

      // 3.1 ALIGNMENT MATRIX DATA & RENDERER
      const alignmentMatrixData = [
        {
          topic: "Rung nhĩ (AF) — Phân tầng nguy cơ & Kháng đông",
          intl: "ESC 2026: Ưu tiên thang điểm CARE-AF (tích hợp eGFR & biomarker). Chỉ định DOACs là Class I cho mọi bệnh nhân nguy cơ trung bình-cao.",
          vn: "BYT QĐ 4845: Sử dụng thang điểm CHA2DS2-VASc. Kháng đông đường uống (VKA hoặc DOAC) cho CHA2DS2-VASc ≥ 2 (Nam) / ≥ 3 (Nữ).",
          status: "partial",
          statusText: "🟢 Bổ sung",
          notes: "DOACs đã được BHYT Việt Nam thanh toán theo tỷ lệ quy định đối với Rung nhĩ phi van tim."
        },
        {
          topic: "Đái tháo đường Typ 2 (T2D) — Khởi đầu điều trị",
          intl: "ADA 2026: Ưu tiên khởi đầu SGLT2i hoặc GLP-1RA ngay từ đầu ở bệnh nhân có CKD, bệnh tim mạch xơ vữa (ASCVD) hoặc Suy tim bất kể HbA1c ban đầu.",
          vn: "BYT QĐ 5481: Metformin vẫn là lựa chọn hàng 1 ban đầu. Phối hợp SGLT2i khi có bệnh tim mạch xơ vữa hoặc bệnh thận mạn chưa kiểm soát.",
          status: "full",
          statusText: "🟢 Đồng thuận",
          notes: "SGLT2i (Empagliflozin, Dapagliflozin) được BHYT xuất toán theo tiêu chuẩn QĐ 5481."
        },
        {
          topic: "COPD — Phân nhóm & Khởi đầu giãn phế quản",
          intl: "GOLD 2026: Hợp nhất nhóm C/D thành Nhóm E (bị đợt cấp). Ưu tiên khởi đầu bộ đôi LABA + LAMA cho nhóm B & E. Chỉ dùng ICS khi Eosinophil ≥ 300.",
          vn: "BYT QĐ 2766: Vẫn giữ phân loại 4 nhóm A, B, C, D. Nhóm C/D có thể dùng ICS/LABA hoặc LAMA đơn trị.",
          status: "diff",
          statusText: "🔴 Chưa cập nhật",
          notes: "Khuyến cáo lâm sàng: Ưu tiên bộ đôi LABA/LAMA cho bệnh nhân có nhiều đợt cấp theo GOLD 2026."
        },
        {
          topic: "Hen suyễn (Asthma) — Thuốc cắt cơn ban đầu",
          intl: "GINA 2026: Tuyệt đối KHÔNG dùng SABA đơn thuần làm thuốc cắt cơn. Ưu tiên ICS-Formoterol liều thấp làm thuốc cắt cơn & ngừa cơn (Track 1).",
          vn: "BYT QĐ 4284: Cho phép dùng SABA (Salbutamol) cắt cơn khi cần, kết hợp ICS liều thấp duy trì hàng ngày.",
          status: "partial",
          statusText: "🟡 Bổ sung",
          notes: "BHYT thanh toán ICS-Formoterol dạng hít bình phân liều (Budesonide/Formoterol)."
        },
        {
          topic: "Đột quỵ thiếu máu cục bộ cấp — Cửa sổ tái thông",
          intl: "ESO / ASA 2026: Tenecteplase (TNK-tPA) 0.25 mg/kg bolus thay thế Alteplase. Mở rộng cửa sổ can thiệp lấy huyết khối (EVT) lên 24h dựa trên hình ảnh Penumbra.",
          vn: "BYT QĐ 5331: Alteplase (rt-PA) trong 4.5h đầu. Can thiệp lấy huyết khối cơ học (EVT) trong 6h đầu (mở rộng đến 24h tại trung tâm đột quỵ kỹ thuật cao).",
          status: "full",
          statusText: "🟢 Đồng thuận",
          notes: "Alteplase và EVT được BHYT chi trả 100% tại các trung tâm Đột quỵ đạt chuẩn."
        },
        {
          topic: "Viêm gan B mạn tính — Tiêu chuẩn khởi đầu Tenofovir/Entecavir",
          intl: "EASL / AASLD 2026: Mở rộng chỉ định điều trị kháng virus Tenofovir Alafenamide (TAF) / Entecavir cho tất cả BN HBV DNA (+) kèm ALT tăng nhẹ hoặc FIB-4 ≥ 1.3.",
          vn: "BYT QĐ 3310: Chỉ định điều trị khi HBV DNA ≥ 10^4 copies/ml kèm ALT tăng > 2 lần hoặc có xơ hóa gan F ≥ 2.",
          status: "partial",
          statusText: "🟡 Bổ sung",
          notes: "Tenofovir TAF / Entecavir được BHYT chi trả theo tuyến điều trị."
        }
      ];

      function renderAlignmentMatrix() {
        const tbody = document.getElementById("matrix-table-body");
        if (!tbody) return;

        tbody.innerHTML = alignmentMatrixData.map(item => {
          let badgeClass = "align-full";
          if (item.status === "partial") badgeClass = "align-partial";
          else if (item.status === "diff") badgeClass = "align-diff";

          return `
            <tr>
              <td style="font-weight: 800; color: var(--color-text);">${item.topic}</td>
              <td style="color: var(--diff-new-text); font-weight: 600; background: var(--diff-new-bg); border-radius: 8px;">${item.intl}</td>
              <td style="color: var(--color-text); background: var(--color-surface-2); border-radius: 8px;">${item.vn}</td>
              <td><span class="align-badge ${badgeClass}">${item.statusText}</span></td>
              <td style="font-size: 0.8rem; color: var(--color-text-muted);">${item.notes}</td>
            </tr>
          `;
        }).join("");
      }

      // 3.2 HEATMAP CELL CLICK HANDLER
      document.querySelectorAll(".heatmap-cell").forEach(cell => {
        cell.addEventListener("click", () => {
          const cor = cell.getAttribute("data-heatmap-cor");

          document.querySelectorAll(".heatmap-cell").forEach(c => c.classList.remove("cell-active"));
          cell.classList.add("cell-active");

          currentFilterType = "cor";
          currentFilterVal = cor;

          filterPills.forEach(p => p.classList.remove("active"));
          const matchingPill = document.querySelector(`.filter-pill[data-filter-val="${cor}"]`);
          if (matchingPill) matchingPill.classList.add("active");

          switchViewMode("diff");
          filterCards();
        });
      });

      // 4. TOGGLE DEEP DIVE ACCORDION
      document.querySelectorAll(".toggle-deepdive-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const card = btn.closest(".radar-card");
          const content = card.querySelector(".deepdive-content");
          if (content) {
            content.classList.toggle("open");
            if (content.classList.contains("open")) {
              btn.innerHTML = '<i class="fa-solid fa-microscope"></i> Thu gọn Bằng Chứng <i class="fa-solid fa-chevron-up"></i>';
            } else {
              btn.innerHTML = '<i class="fa-solid fa-microscope"></i> Xem Bằng Chứng Landmark Trial & Forest Plot <i class="fa-solid fa-chevron-down"></i>';
            }
          }
        });
      });

      // 5. INTERACTIVE SVG FLOWCHART DIFF ENGINE & MODAL HANDLERS
      const algoFlowchartData = {
        af: {
          title: "Lưu Đồ Đồ Họa Vector So Sánh: Quản Lý Rung Nhĩ (AF 2020 vs 2026)",
          nodes: [
            { id: "start", type: "start", text: "1. Bệnh Nhân Rung Nhĩ Chẩn Đoán (AF)", x: 480, y: 35, w: 280, h: 38 },
            { id: "decision", type: "decision", text: "2. Đánh Giá Nguy Cơ Đột Quỵ & Chức Năng Thận", x: 480, y: 110, w: 320, h: 42 },

            // Left Path: OLD ❌
            { id: "old_score", type: "old", text: "❌ Thang CHA2DS2-VASc đơn thuần", x: 230, y: 195, w: 260, h: 48, detail: "⚠️ Thang điểm CHA2DS2-VASc đơn thuần bỏ sót 18% bệnh nhân có suy thận mạn hoặc hs-TnT tăng có nguy cơ đột quỵ cao." },
            { id: "old_rx", type: "old", text: "❌ Warfarin (VKA) hoặc Dùng DOAC ngắt quãng", x: 230, y: 285, w: 260, h: 52, detail: "❌ ĐÃ THAY THẾ: Warfarin có tỷ lệ xuất huyết não cao và bắt buộc thử máu theo dõi chỉ số INR liên tục." },
            { id: "old_end", type: "old", text: "Kiểm soát Tần Số Tim Đơn Thuần (Rate Control)", x: 230, y: 375, w: 260, h: 48, detail: "Rate control đơn thuần chỉ cải thiện triệu chứng, không làm giảm tử vong do biến cố thuyên tắc mạch hệ thống." },

            // Right Path: NEW 2026 ✅
            { id: "new_score", type: "new", text: "✅ Thang CARE-AF (Tích hợp eGFR + Biomarker)", x: 730, y: 195, w: 290, h: 48, detail: "✅ KHUYẾN CÁO MỚI (Class I): CARE-AF tích hợp eGFR, hs-Tn, NT-proBNP giúp tái phân tầng nguy cơ đột quỵ chính xác hơn 18%." },
            { id: "new_rx", type: "new", text: "✅ DOACs Ưu Tiên Hàng Đầu (Class I, LOE A)", x: 730, y: 285, w: 290, h: 52, detail: "✅ CLASS I, LOE A: DOACs (Apixaban, Rivaroxaban, Dabigatran) giảm 51% xuất huyết não và giảm 10% tử vong toàn bộ so với Warfarin." },
            { id: "new_end", type: "new", text: "✅ Tái Lập Nhịp Sớm Bằng Triệt Đốt Catheter Ablation", x: 730, y: 375, w: 290, h: 48, detail: "✅ CLASS I, LOE A: Triệt đốt qua ống thông sớm trong 12 tháng đầu giúp cải thiện chức năng thất T và giảm 26% tái nhập viện." }
          ],
          links: [
            { from: "start", to: "decision" },
            { from: "decision", to: "old_score", label: "Phác đồ Cũ ❌" },
            { from: "decision", to: "new_score", label: "Khuyến cáo Mới 2026 ✅" },
            { from: "old_score", to: "old_rx" },
            { from: "old_rx", to: "old_end" },
            { from: "new_score", to: "new_rx" },
            { from: "new_rx", to: "new_end" }
          ]
        },
        copd: {
          title: "Lưu Đồ Đồ Họa Vector So Sánh: Phân Nhóm & Khởi Đầu COPD (ABCD vs ABE)",
          nodes: [
            { id: "start", type: "start", text: "1. Bệnh Nhân COPD Xác Định (FEV1/FVC < 0.7)", x: 480, y: 35, w: 290, h: 38 },
            { id: "decision", type: "decision", text: "2. Đánh Giá Triệu Chứng & Tiền Sử Đợt Cấp", x: 480, y: 110, w: 320, h: 42 },

            // Left Path: OLD ❌
            { id: "old_score", type: "old", text: "❌ Phân loại 4 nhóm A, B, C, D cũ", x: 230, y: 195, w: 260, h: 48, detail: "⚠️ Phân loại C/D cũ khắt khe nhưng phác đồ điều trị không giúp giảm tử vong đợt cấp." },
            { id: "old_rx", type: "old", text: "❌ Khởi đầu ICS/LABA đơn trị hoặc LAMA", x: 230, y: 285, w: 260, h: 52, detail: "❌ ĐÃ BÃI BỎ: ICS/LABA không còn là lựa chọn hàng đầu đơn thuần do tăng 35% nguy cơ Viêm phổi." },
            { id: "old_end", type: "old", text: "Dùng ICS rộng rãi khi có tiền sử đợt cấp", x: 230, y: 375, w: 260, h: 48, detail: "Dùng ICS tràn lan gây lạm dụng corticoid hít và bùng phát nhiễm trùng hô hấp dưới." },

            // Right Path: NEW 2026 ✅
            { id: "new_score", type: "new", text: "✅ Hợp nhất Nhóm E (≥ 2 đợt cấp / ≥ 1 nhập viện)", x: 730, y: 195, w: 290, h: 48, detail: "✅ KHUYẾN CÁO MỚI (GOLD 2026): Hợp nhất nhóm C/D thành nhóm E giúp tập trung can thiệp ngăn ngừa đợt cấp tái phát." },
            { id: "new_rx", type: "new", text: "✅ BỘ ĐÔI LABA + LAMA Hàng Đầu (Class I)", x: 730, y: 285, w: 290, h: 52, detail: "✅ CLASS I, LOE A: Bộ đôi giãn phế quản kép LABA+LAMA giảm 22% đợt cấp và cải thiện FEV1 vượt trội so với đơn trị." },
            { id: "new_end", type: "new", text: "✅ Chỉ thêm ICS cho Nhóm E khi Eosinophil ≥ 300", x: 730, y: 375, w: 290, h: 48, detail: "✅ CLASS I: Đếm Eosinophil máu làm chỉ dấu sinh học xác định bệnh nhân thực sự hưởng lợi từ Corticoid hít." }
          ],
          links: [
            { from: "start", to: "decision" },
            { from: "decision", to: "old_score", label: "GOLD Cũ (ABCD) ❌" },
            { from: "decision", to: "new_score", label: "GOLD 2026 (Nhóm ABE) ✅" },
            { from: "old_score", to: "old_rx" },
            { from: "old_rx", to: "old_end" },
            { from: "new_score", to: "new_rx" },
            { from: "new_rx", to: "new_end" }
          ]
        }
      };

      function renderSvgFlowchartDiff(algoKey) {
        const svg = document.getElementById("algo-flowchart-svg");
        const callout = document.getElementById("node-detail-callout");
        if (!svg) return;

        if (callout) callout.style.display = "none";

        const data = algoFlowchartData[algoKey] || algoFlowchartData.af;

        const nodeMap = {};
        data.nodes.forEach(n => { nodeMap[n.id] = n; });

        let svgHtml = `
          <defs>
            <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
            <marker id="arrowhead-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker id="arrowhead-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
        `;

        data.links.forEach(l => {
          const fromNode = nodeMap[l.from];
          const toNode = nodeMap[l.to];
          if (!fromNode || !toNode) return;

          const isNew = toNode.type === "new";
          const isOld = toNode.type === "old";
          const strokeColor = isNew ? "#10b981" : (isOld ? "#f87171" : "#94a3b8");
          const markerId = isNew ? "arrowhead-green" : (isOld ? "arrowhead-red" : "arrowhead");

          const startX = fromNode.x;
          const startY = fromNode.y + fromNode.h / 2;
          const endX = toNode.x;
          const endY = toNode.y - toNode.h / 2;

          const midY = (startY + endY) / 2;
          const pathD = `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

          svgHtml += `<path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="${isNew ? 2.5 : 1.8}" stroke-dasharray="${isOld ? '4 3' : 'none'}" marker-end="url(#${markerId})" />`;

          if (l.label) {
            const lblX = (startX + endX) / 2;
            const lblY = midY - 6;
            const lblFill = isNew ? "#059669" : (isOld ? "#dc2626" : "#64748b");
            svgHtml += `<text x="${lblX}" y="${lblY}" text-anchor="middle" font-size="11" font-weight="bold" fill="${lblFill}">${l.label}</text>`;
          }
        });

        data.nodes.forEach(n => {
          const x = n.x - n.w / 2;
          const y = n.y - n.h / 2;

          let fill = "var(--color-surface)";
          let stroke = "var(--color-divider)";
          let textColor = "var(--color-text)";
          let badgeText = "";

          if (n.type === "start") {
            fill = "#0284c7";
            stroke = "#0369a1";
            textColor = "#ffffff";
          } else if (n.type === "decision") {
            fill = "var(--color-surface-2)";
            stroke = "#94a3b8";
            textColor = "var(--color-text)";
          } else if (n.type === "old") {
            fill = "var(--diff-old-bg)";
            stroke = "var(--diff-old-border)";
            textColor = "var(--diff-old-text)";
            badgeText = "❌ CŨ / BÃI BỎ";
          } else if (n.type === "new") {
            fill = "var(--diff-new-bg)";
            stroke = "var(--radar-accent)";
            textColor = "var(--diff-new-text)";
            badgeText = "✅ MỚI 2026 · CLASS I";
          }

          svgHtml += `
            <g class="svg-flow-node" data-node-id="${n.id}" style="cursor: pointer;">
              <rect x="${x}" y="${y}" width="${n.w}" height="${n.h}" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="${n.type === 'new' ? 2.5 : 1.5}" />
              ${badgeText ? `<text x="${x + 10}" y="${y + 14}" font-size="9" font-weight="900" fill="${n.type === 'new' ? '#059669' : '#dc2626'}">${badgeText}</text>` : ''}
              <text x="${n.x}" y="${y + (badgeText ? 30 : n.h / 2 + 4)}" text-anchor="middle" font-size="11" font-weight="${n.type === 'start' || n.type === 'new' ? 'bold' : 'normal'}" fill="${textColor}">${n.text}</text>
            </g>
          `;
        });

        svg.innerHTML = svgHtml;

        document.querySelectorAll(".svg-flow-node").forEach(el => {
          el.addEventListener("click", () => {
            const nodeId = el.getAttribute("data-node-id");
            const node = nodeMap[nodeId];
            if (node && node.detail && callout) {
              document.getElementById("callout-node-title").innerHTML = `<i class="fa-solid fa-lightbulb"></i> Chi tiết chỉ định: <strong>${node.text}</strong>`;
              document.getElementById("callout-node-body").innerHTML = node.detail;
              callout.style.display = "block";
            }
          });
        });
      }

      const modalBackdrop = document.getElementById("algoModalBackdrop");
      const modalTitle = document.getElementById("modalTitle");
      const modalAlgoGrid = document.getElementById("modalAlgoGrid");
      const modalCloseBtn = document.getElementById("modalCloseBtn");
      const btnCloseCallout = document.getElementById("btn-close-callout");

      if (btnCloseCallout) {
        btnCloseCallout.addEventListener("click", () => {
          const callout = document.getElementById("node-detail-callout");
          if (callout) callout.style.display = "none";
        });
      }

      document.querySelectorAll(".open-algo-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const algoKey = btn.getAttribute("data-algo") || "af";
          const flowchartData = algoFlowchartData[algoKey] || algoFlowchartData.af;
          
          if (modalTitle) modalTitle.textContent = flowchartData.title;

          renderSvgFlowchartDiff(algoKey);

          if (modalAlgoGrid) {
            modalAlgoGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align:right;"><a href="../guidelines/guidelines.html?mode=matrix" class="action-btn-link" style="display:inline-flex; align-items:center; gap:8px; text-decoration:none; padding:0.6rem 1.2rem; background:var(--radar-primary); color:white; border-radius:10px; font-weight:700;"><i class="fa-solid fa-table-cells"></i> Mở Bảng Ma Trận Chứng Cứ Heatmap trong Kho Guidelines &rarr;</a></div>';
          }
          if (modalBackdrop) modalBackdrop.classList.add("open");
        });
      });

      if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", () => {
          modalBackdrop.classList.remove("open");
        });
      }

      if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
          if (e.target === modalBackdrop) {
            modalBackdrop.classList.remove("open");
          }
        });
      }

      // 6. REALTIME DYNAMIC SYNC FROM CLINIPORTAL-SYNC / GUIDELINES
      function syncDynamicGuidelinesToRadar() {
        if (!window.CliniPortalSync) return;
        const studies = window.CliniPortalSync.getStudies();
        if (!feedList) return;

        // Remove previously rendered dynamic cards
        document.querySelectorAll('.radar-card[data-dynamic="true"]').forEach(el => el.remove());

        studies.forEach(study => {
          if (!study || !study.id) return;
          // Skip if card with this ID already exists
          if (document.querySelector(`.radar-card[data-card-id="${study.id}"]`)) return;

          const isPractice = study.impact === 'practice-changing';
          const specClass = study.specialty || 'cardio';
          const corClass = isPractice ? 'class1' : 'class2a';

          const article = document.createElement('article');
          article.className = 'radar-card';
          article.setAttribute('data-card-id', study.id);
          article.setAttribute('data-spec', specClass + ' ' + (study.sourceType || ''));
          article.setAttribute('data-cor', corClass);
          article.setAttribute('data-dynamic', 'true');

          const rawFile = study.file || '';
          const fileUrl = rawFile ? ('../guidelines/' + (rawFile.startsWith('kho-guidelines/') ? rawFile : rawFile)) : '../guidelines/guidelines.html';

          const oldText = study.oldRegimen || study.intervention || 'Quy trình thực hành truyền thống hoặc chưa cập nhật bằng chứng y khoa mới nhất.';
          const newText = study.newRegimen || study.keyResults || study.summary || 'Khuyến cáo mới cập nhật phân tầng nguy cơ và phác đồ ưu tiên hàng đầu.';
          const reasonText = study.detailedConclusion || study.summary || study.primaryEndpoint || '';

          // Subgroups bullet list
          let subgroupsHtml = '';
          if (study.subgroups && typeof study.subgroups === 'object') {
            const entries = Object.entries(study.subgroups);
            if (entries.length > 0) {
              subgroupsHtml = entries.map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join('');
            }
          }

          article.innerHTML = `
            <div class="radar-card-header">
              <div>
                <h2 class="radar-card-title">${study.title || ''}</h2>
                <div class="radar-meta">
                  <span><i class="fa-solid fa-building-columns"></i> ${study.organization || 'Bộ Y Tế / Hội Chuyên Khoa'}</span>
                  <span><i class="fa-regular fa-calendar"></i> ${study.year || '2026'}</span>
                  <div class="cor-container">
                    <span class="cor-badge ${isPractice ? 'cor-class-1' : 'cor-class-2a'}"><i class="fa-solid fa-circle-check"></i> ${isPractice ? 'Class I' : 'Class IIa'}</span>
                    <span class="loe-badge">LOE A</span>
                  </div>
                </div>
              </div>
              <div class="radar-card-top-actions">
                <span class="radar-badge-practice" style="${isPractice ? '' : 'background:#eff6ff; color:#1e40af; border-color:#bfdbfe;'}">
                  <i class="fa-solid ${isPractice ? 'fa-triangle-exclamation' : 'fa-bell'}"></i> ${isPractice ? 'THAY ĐỔI THỰC HÀNH' : 'CẬP NHẬT GUIDELINE'}
                </span>
                <button class="bookmark-btn" data-card-id="${study.id}" title="Lưu thông báo này"><i class="fa-regular fa-bookmark"></i></button>
              </div>
            </div>

            <!-- GIAO DIỆN SO SÁNH DIFF SIDE-BY-SIDE (CŨ ❌ vs MỚI ✅) -->
            <div class="diff-container">
              <div class="diff-box old">
                <div class="diff-header"><span>Bản Khuyến Cáo / Phác Đồ Cũ</span> ❌</div>
                <div class="diff-text">${oldText}</div>
              </div>
              <div class="diff-box new">
                <div class="diff-header"><span>Khuyến Cáo &amp; Thay Đổi Mới (2026)</span> ✅</div>
                <div class="diff-text">${newText}</div>
              </div>
            </div>

            ${reasonText ? `
              <div class="diff-reason-box">
                <strong>💡 Lý do thay đổi &amp; Bằng chứng lâm sàng:</strong> ${reasonText}
              </div>
            ` : ''}

            ${subgroupsHtml ? `
              <div style="background: var(--diff-new-bg, #f0fdf4); border: 1px solid var(--diff-new-border, #bbf7d0); border-radius: 10px; padding: 0.75rem 1rem; margin-top: 0.75rem;">
                <strong style="font-size: 0.82rem; color: var(--color-text);"><i class="fa-solid fa-list-check"></i> Các Điểm Đồng Thuận Thay Đổi Cụ Thể:</strong>
                <ul style="margin: 0.4rem 0 0 1.2rem; padding: 0; font-size: 0.8rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 0.25rem;">
                  ${subgroupsHtml}
                </ul>
              </div>
            ` : ''}

            <div class="card-footer-bar">
              <a href="${fileUrl}" class="action-btn-link" style="text-decoration:none;">
                <i class="fa-solid fa-book-medical"></i> Xem Tóm Tắt &amp; Phác Đồ Chi Tiết <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          `;

          feedList.prepend(article);
        });

        bindRadarCardEvents();
        filterCards();
      }

      // Initial sync render
      syncDynamicGuidelinesToRadar();

      // Listen to real-time events
      window.addEventListener('cliniportal:guidelines-updated', syncDynamicGuidelinesToRadar);
      window.addEventListener('storage', function (e) {
        if (e.key === 'internalMedicineStudies') {
          syncDynamicGuidelinesToRadar();
        }
      });

      // Gói 3: Keyboard Navigation & FAB Integration
      initRadarKeyboardNav();
      if (typeof setupFAB === 'function') {
        setupFAB([
          { icon: '<i class="fa-solid fa-house"></i>', label: 'EBM Hub', href: '../yhcc.html' },
          { icon: '<i class="fa-solid fa-list-check"></i>', label: 'Kho Guidelines', href: '../guidelines/guidelines.html' },
          { icon: '<i class="fa-solid fa-flask"></i>', label: 'EBM Lab', href: '../ebm-lab/ebm-lab.html' }
        ]);
      }
    });

    // Keyboard Navigation Engine for Radar Cards
    function initRadarKeyboardNav() {
      let currentIndex = -1;

      document.addEventListener('keydown', function(e) {
        // Skip if typing in an input or textarea
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

        const visibleCards = Array.from(document.querySelectorAll('.radar-card')).filter(c => c.style.display !== 'none');
        if (visibleCards.length === 0) return;

        if (e.key === 'ArrowDown' || e.key === 'j') {
          e.preventDefault();
          currentIndex = Math.min(currentIndex + 1, visibleCards.length - 1);
          focusRadarCard(visibleCards, currentIndex);
        } else if (e.key === 'ArrowUp' || e.key === 'k') {
          e.preventDefault();
          currentIndex = Math.max(currentIndex - 1, 0);
          focusRadarCard(visibleCards, currentIndex);
        }
      });
    }

    function focusRadarCard(cards, index) {
      cards.forEach((c, idx) => {
        if (idx === index) {
          c.classList.add('radar-card-focused');
          c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          c.classList.remove('radar-card-focused');
        }
      });
    }