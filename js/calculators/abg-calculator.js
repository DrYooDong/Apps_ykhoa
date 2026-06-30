
      document.addEventListener('DOMContentLoaded', () => {
        // Lấy các DOM elements
        const inPh = document.getElementById('abg-ph');
        const inPco2 = document.getElementById('abg-pco2');
        const inHco3 = document.getElementById('abg-hco3');
        const inNa = document.getElementById('abg-na');
        const inCl = document.getElementById('abg-cl');
        const inAlb = document.getElementById('abg-alb');
        const inLactate = document.getElementById('abg-lactate');
        const inGlucose = document.getElementById('abg-glucose');
        const inUre = document.getElementById('abg-ure');
        const inKetone = document.getElementById('abg-ketone');
        const inOsm = document.getElementById('abg-osm');

        const domVal = document.getElementById('out-validation');
        const boxVal = document.getElementById('step1-validation');
        const domPri = document.getElementById('out-primary');
        const boxPri = document.getElementById('step2-primary');
        const domComp = document.getElementById('out-compensation');
        const domAg = document.getElementById('out-ag');
        const boxAg = document.getElementById('step4-aniongap');
        const boxDelta = document.getElementById('step5-delta');
        const domDelta = document.getElementById('out-delta');
        const domCauses = document.getElementById('out-causes');
        const boxCauses = document.getElementById('step6-causes');
        const domConcl = document.getElementById('out-conclusion');

        // Cơ sở dữ liệu nguyên nhân
        const CAUSES_DB = {
          highAG: [
            { name: "Nhiễm toan Ceton (DKA/Starvation)", clues: ["Glucose cao > 200 mg/dL", "Ketone dương tính"], check: (v) => (v.glucose > 200 || v.ketone === 'positive') },
            { name: "Nhiễm toan Lactic", clues: ["Lactate > 2 mmol/L", "Sốc, nhiễm trùng, thiếu oxy mô"], check: (v) => v.lactate > 2 },
            { name: "Suy thận (Uremia)", clues: ["Ure/Creatinine tăng cao", "Bệnh thận mạn"], check: (v) => v.ure > 7.5 },
            { name: "Ngộ độc Methanol", clues: ["Osmolal gap > 10", "Tiền sử uống rượu giả"], check: (v) => v.osmGap > 10 },
            { name: "Ngộ độc Ethylene Glycol", clues: ["Osmolal gap > 10", "Sỏi oxalat niệu"], check: (v) => v.osmGap > 10 },
            { name: "Ngộ độc Salicylate (Aspirin)", clues: ["Tiền sử dùng thuốc", "Kiềm hô hấp + Toan chuyển hóa"], check: (v) => v.salicylate === 'positive' },
            { name: "Ngộ độc Propylene Glycol", clues: ["Truyền thuốc chứa PG", "Osmolal gap tăng"], check: (v) => v.osmGap > 10 },
            { name: "Nhiễm toan D-Lactic", clues: ["Hội chứng ruột ngắn", "Vi khuẩn lên men"], check: (v) => false } // Cần xét nghiệm đặc hiệu
          ],
          normalAG: [
            { name: "Tiêu chảy mất Bicarbonate", clues: ["Tiền sử tiêu chảy", "Clorua máu tăng"], check: (v) => v.cl > 110 },
            { name: "Toan ống thận type 1 (Distal RTA)", clues: ["Kali thấp", "pH nước tiểu > 5.5"], check: (v) => v.cl > 105 },
            { name: "Toan ống thận type 2 (Proximal RTA)", clues: ["Hội chứng Fanconi", "Glucose niệu"], check: (v) => v.cl > 105 },
            { name: "Toan ống thận type 4", clues: ["Tăng Kali máu", "Đái tháo đường", "Dùng ACEi/ARB"], check: (v) => v.cl > 100 },
            { name: "Dùng Acetazolamide", clues: ["Tiền sử dùng thuốc"], check: (v) => false },
            { name: "Mất Bicarbonate qua dẫn lưu", clues: ["Dẫn lưu tụy/mật", "Fistula"], check: (v) => false }
          ],
          metabolicAlkalosis: [
            { name: "Nôn ói kéo dài", clues: ["Tiền sử nôn", "Clorua niệu thấp < 10"], check: (v) => v.cl < 95 },
            { name: "Dùng lợi tiểu (Loop/Thiazide)", clues: ["Tiền sử dùng thuốc", "Hạ Kali"], check: (v) => v.cl < 98 },
            { name: "Cường Aldosterone", clues: ["Tăng HA", "Hạ Kali máu"], check: (v) => v.cl < 98 },
            { name: "Hội chứng Bartter/Gitelman", clues: ["Hạ Kali máu", "Kiềm chuyển hóa", "HA bình thường"], check: (v) => v.cl < 98 },
            { name: "Kiềm do bù trừ sau tăng CO2 mạn", clues: ["Bệnh phổi mạn", "PaCO2 tăng"], check: (v) => false }
          ],
          respiratoryAcidosis: [
            { name: "COPD đợt cấp", clues: ["Tiền sử COPD", "Khò khè", "Tím tái"], check: (v) => false },
            { name: "Hen phế quản nặng", clues: ["Khò khè", "Khó thở ra"], check: (v) => false },
            { name: "Ức chế trung tâm hô hấp", clues: ["Dùng opioid/an thần", "Chấn thương sọ não"], check: (v) => false },
            { name: "Yếu cơ hô hấp", clues: ["Bệnh thần kinh cơ", "Guillain-Barré", "Myasthenia"], check: (v) => false },
            { name: "Tràn khí màng phổi/Bệnh phổi", clues: ["X-quang bất thường", "Giảm âm phế nang"], check: (v) => false }
          ],
          respiratoryAlkalosis: [
            { name: "Lo âu/Tăng thông khí tâm lý", clues: ["Tiền sử lo âu", "Tê tay chân", "Co cứng"], check: (v) => false },
            { name: "Thiếu oxy (độ cao, bệnh phổi)", clues: ["SpO2 giảm", "Ở độ cao"], check: (v) => false },
            { name: "Nhiễm trùng huyết sớm", clues: ["Sốt", "BC tăng", "Nguyên nhân nhiễm trùng"], check: (v) => false },
            { name: "Thuyên tắc phổi", clues: ["Khó thở đột ngột", "Đau ngực", "D-dimer tăng"], check: (v) => false },
            { name: "Bệnh gan nặng", clues: ["Xơ gan", "Men gan tăng"], check: (v) => false }
          ]
        };

        function analyzeABG() {
          const ph = parseFloat(inPh.value);
          const pco2 = parseFloat(inPco2.value);
          const hco3 = parseFloat(inHco3.value);
          const na = parseFloat(inNa.value) || 140;
          const cl = parseFloat(inCl.value) || 100;
          const alb = parseFloat(inAlb.value) || 4.0;
          const lactate = parseFloat(inLactate?.value) || 0;
          const glucose = parseFloat(inGlucose?.value) || 90;
          const ure = parseFloat(inUre?.value) || 5.0;
          const ketone = inKetone?.value || 'negative';
          const salicylate = 'negative'; // Có thể thêm input nếu cần
          const osmMeasured = parseFloat(inOsm?.value) || null;
          
          // Tính Osmolal Gap nếu có osm đo được
          const osmCalc = 2 * na + glucose / 18 + ure / 6;
          const osmGap = osmMeasured ? osmMeasured - osmCalc : 0;

          if (!ph || !pco2 || !hco3) return;

          let conclusions = [];
          let possibleCauses = [];

          // BƯỚC 1: KIỂM ĐỊNH MẪU
          const hCalc = 24 * (pco2 / hco3);
          const hActual = Math.pow(10, 9 - ph);
          const errorMargin = Math.abs(hCalc - hActual) / hActual;

          if (errorMargin > 0.15) {
            boxVal.className = "step-box status-invalid";
            domVal.innerHTML = `[H⁺] tính toán: ${hCalc.toFixed(1)} nEq/L &ne; [H⁺] thực tế: ${hActual.toFixed(1)} nEq/L.<br><strong>Cảnh báo:</strong> Mẫu máu không hợp lệ hoặc có sai số đo lường.`;
            domConcl.textContent = "Không thể kết luận do mẫu khí máu không hợp lệ.";
            domPri.textContent = "-"; domComp.textContent = "-"; domAg.textContent = "-"; boxDelta.style.display = "none"; boxCauses.style.display = "none";
            return;
          } else {
            boxVal.className = "step-box status-valid";
            domVal.innerHTML = `Mẫu hợp lệ. [H⁺] dự kiến khớp với pH đo được (~${hCalc.toFixed(1)} nEq/L).`;
          }

          // BƯỚC 2: RỐI LOẠN NGUYÊN PHÁT
          let primary = "";
          let isAcidemia = ph < 7.35;
          let isAlkalemia = ph > 7.45;
          let disorders = [];

          if (isAcidemia) {
            if (hco3 < 22 && pco2 <= 45) {
              primary = "Toan chuyển hóa";
              disorders.push("metabolicAcidosis");
            }
            else if (pco2 > 45 && hco3 >= 22) {
              primary = "Toan hô hấp";
              disorders.push("respiratoryAcidosis");
            }
            else {
              primary = "Toan hỗn hợp (Hô hấp & Chuyển hóa)";
              disorders.push("metabolicAcidosis", "respiratoryAcidosis");
            }
          } else if (isAlkalemia) {
            if (hco3 > 26 && pco2 >= 35) {
              primary = "Kiềm chuyển hóa";
              disorders.push("metabolicAlkalosis");
            }
            else if (pco2 < 35 && hco3 <= 26) {
              primary = "Kiềm hô hấp";
              disorders.push("respiratoryAlkalosis");
            }
            else {
              primary = "Kiềm hỗn hợp (Hô hấp & Chuyển hóa)";
              disorders.push("metabolicAlkalosis", "respiratoryAlkalosis");
            }
          } else {
            if (pco2 > 45 && hco3 > 26) {
              primary = "Toan hô hấp & Kiềm chuyển hóa bù trừ";
              disorders.push("respiratoryAcidosis", "metabolicAlkalosis");
            }
            else if (pco2 < 35 && hco3 < 22) {
              primary = "Kiềm hô hấp & Toan chuyển hóa bù trừ";
              disorders.push("respiratoryAlkalosis", "metabolicAcidosis");
            }
            else {
              primary = "Khí máu hoàn toàn bình thường";
            }
          }

          boxPri.className = "step-box status-primary";
          domPri.innerHTML = `<strong>${primary}</strong> (Dựa trên pH = ${ph})`;
          conclusions.push(primary);

          // BƯỚC 3: ĐÁP ỨNG BÙ TRỪ
          let compText = "Không có rối loạn nguyên phát rõ rệt để tính bù trừ.";
          let expectedPco2 = 0;
          let expectedHco3 = 0;

          if (primary === "Toan chuyển hóa" || disorders.includes("metabolicAcidosis")) {
            expectedPco2 = (1.5 * hco3) + 8;
            compText = `pCO₂ kỳ vọng (Công thức Winters): ${expectedPco2.toFixed(1)} ± 2 mmHg.<br>`;
            if (pco2 > expectedPco2 + 2) { 
              compText += "➔ <strong>Kèm Toan hô hấp.</strong>"; 
              conclusions.push("Toan hô hấp phối hợp");
              if (!disorders.includes("respiratoryAcidosis")) disorders.push("respiratoryAcidosis");
            }
            else if (pco2 < expectedPco2 - 2) { 
              compText += "➔ <strong>Kèm Kiềm hô hấp.</strong>"; 
              conclusions.push("Kiềm hô hấp phối hợp");
              if (!disorders.includes("respiratoryAlkalosis")) disorders.push("respiratoryAlkalosis");
            }
            else compText += "➔ Bù trừ hô hấp phù hợp.";
          }
          else if (primary === "Kiềm chuyển hóa" || disorders.includes("metabolicAlkalosis")) {
            expectedPco2 = (0.7 * (hco3 - 24)) + 40;
            compText = `pCO₂ kỳ vọng: ${expectedPco2.toFixed(1)} ± 1.5 mmHg.<br>`;
            if (pco2 > expectedPco2 + 1.5) { 
              compText += "➔ <strong>Kèm Toan hô hấp.</strong>"; 
              conclusions.push("Toan hô hấp phối hợp");
              if (!disorders.includes("respiratoryAcidosis")) disorders.push("respiratoryAcidosis");
            }
            else if (pco2 < expectedPco2 - 1.5) { 
              compText += "➔ <strong>Kèm Kiềm hô hấp.</strong>"; 
              conclusions.push("Kiềm hô hấp phối hợp");
              if (!disorders.includes("respiratoryAlkalosis")) disorders.push("respiratoryAlkalosis");
            }
            else compText += "➔ Bù trừ hô hấp phù hợp.";
          }
          else if (disorders.some(d => d.includes("respiratory"))) {
            compText = "Đối với rối loạn hô hấp, cần lâm sàng để phân định Cấp tính (thay đổi HCO3 1-2 mEq cho mỗi 10mmHg pCO2) hay Mạn tính (thay đổi 4-5 mEq).";
          }
          domComp.innerHTML = compText;

          // BƯỚC 4: ANION GAP VÀ HIỆU CHỈNH
          const ag = na - cl - hco3;
          const agCorr = ag + 2.5 * (4.0 - alb);
          let hasHighAG = agCorr > 14;

          boxAg.className = "step-box " + (hasHighAG ? "status-warning" : "status-primary");
          domAg.innerHTML = `AG thực tế = ${ag.toFixed(1)}<br>
                                   AG hiệu chỉnh Albumin = <strong>${agCorr.toFixed(1)}</strong> (BT: 12 ± 2)<br>
                                   ${hasHighAG ? '➔ <strong>Có Toan chuyển hóa tăng AG</strong>' : '➔ AG bình thường'}`;

          if (hasHighAG && !conclusions.join("").includes("Toan chuyển hóa tăng AG")) {
            conclusions.push("Toan chuyển hóa tăng AG");
          }

          // BƯỚC 5: DELTA RATIO
          let deltaRatio = 0;
          if (hasHighAG) {
            boxDelta.style.display = "block";
            const deltaGap = agCorr - 12;
            const deltaHco3 = 24 - hco3;
            deltaRatio = deltaGap / deltaHco3;

            let dText = `ΔGap (${deltaGap.toFixed(1)}) / ΔHCO₃⁻ (${deltaHco3.toFixed(1)}) = <strong>${deltaRatio.toFixed(2)}</strong><br>`;

            if (deltaRatio < 0.4) {
              dText += "➔ Toan chuyển hóa tăng AG + Toan chuyển hóa AG bình thường (Hyperchloremic).";
              conclusions.push("Toan chuyển hóa AG bình thường đi kèm");
            } else if (deltaRatio >= 0.4 && deltaRatio <= 0.8) {
              dText += "➔ Hỗn hợp Toan tăng AG & Toan AG bình thường.";
            } else if (deltaRatio > 0.8 && deltaRatio <= 2.0) {
              dText += "➔ Toan chuyển hóa tăng AG đơn thuần.";
            } else {
              dText += "➔ Toan chuyển hóa tăng AG + Kiềm chuyển hóa đi kèm.";
              if (!conclusions.join("").includes("Kiềm chuyển hóa")) conclusions.push("Kiềm chuyển hóa đi kèm");
              if (!disorders.includes("metabolicAlkalosis")) disorders.push("metabolicAlkalosis");
            }
            domDelta.innerHTML = dText;
          } else {
            boxDelta.style.display = "none";
          }

          // BƯỚC 6: GỢI Ý NGUYÊN NHÂN
          boxCauses.style.display = "block";
          let causesHTML = "";

          // Kiểm tra từng loại rối loạn và đưa ra nguyên nhân
          const clinicalData = {
            lactate, glucose, ure, ketone, salicylate, osmGap, cl,
            pco2, hco3, ph
          };

          if (hasHighAG || disorders.includes("metabolicAcidosis")) {
            causesHTML += "<div class='causes-section'><h4>🔴 Nguyên nhân Toan chuyển hóa TĂNG AG:</h4><ul>";
            CAUSES_DB.highAG.forEach(cause => {
              if (cause.check(clinicalData)) {
                causesHTML += `<li><strong>${cause.name}</strong><br><small>💡 Gợi ý: ${cause.clues.join(", ")}</small></li>`;
              }
            });
            if (lactate === 0 && glucose === 90 && ure === 5.0) {
              causesHTML += "<li><em>⚠️ Nhập thêm Lactate, Glucose, Ure để phân tích chính xác hơn</em></li>";
            }
            causesHTML += "</ul></div>";
          }

          if (!hasHighAG && disorders.includes("metabolicAcidosis")) {
            causesHTML += "<div class='causes-section'><h4>⚪ Nguyên nhân Toan chuyển hóa AG BÌNH THƯỜNG:</h4><ul>";
            CAUSES_DB.normalAG.forEach(cause => {
              if (cause.check(clinicalData)) {
                causesHTML += `<li><strong>${cause.name}</strong><br><small>💡 Gợi ý: ${cause.clues.join(", ")}</small></li>`;
              }
            });
            causesHTML += "</ul></div>";
          }

          if (disorders.includes("metabolicAlkalosis")) {
            causesHTML += "<div class='causes-section'><h4>🟢 Nguyên nhân Kiềm chuyển hóa:</h4><ul>";
            CAUSES_DB.metabolicAlkalosis.forEach(cause => {
              if (cause.check(clinicalData)) {
                causesHTML += `<li><strong>${cause.name}</strong><br><small>💡 Gợi ý: ${cause.clues.join(", ")}</small></li>`;
              }
            });
            causesHTML += "</ul></div>";
          }

          if (disorders.includes("respiratoryAcidosis")) {
            causesHTML += "<div class='causes-section'><h4>🫁 Nguyên nhân Toan hô hấp:</h4><ul>";
            CAUSES_DB.respiratoryAcidosis.forEach(cause => {
              causesHTML += `<li><strong>${cause.name}</strong><br><small>💡 Gợi ý: ${cause.clues.join(", ")}</small></li>`;
            });
            causesHTML += "</ul></div>";
          }

          if (disorders.includes("respiratoryAlkalosis")) {
            causesHTML += "<div class='causes-section'><h4>💨 Nguyên nhân Kiềm hô hấp:</h4><ul>";
            CAUSES_DB.respiratoryAlkalosis.forEach(cause => {
              causesHTML += `<li><strong>${cause.name}</strong><br><small>💡 Gợi ý: ${cause.clues.join(", ")}</small></li>`;
            });
            causesHTML += "</ul></div>";
          }

          if (causesHTML === "") {
            causesHTML = "<p>Không có rối loạn khí máu đáng kể hoặc cần thêm dữ liệu lâm sàng để phân tích nguyên nhân.</p>";
          }

          domCauses.innerHTML = causesHTML;

          // TỔNG HỢP KẾT LUẬN
          let uniqueConclusions = [...new Set(conclusions)];
          domConcl.innerHTML = uniqueConclusions.join("<br>+ ");
        }

        // Lắng nghe sự kiện thay đổi input
        document.querySelectorAll('input').forEach(input => {
          input.addEventListener('input', analyzeABG);
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
          inPh.value = "7.40"; inPco2.value = "40"; inHco3.value = "24";
          inNa.value = "140"; inCl.value = "104"; inAlb.value = "4.0";
          if (inLactate) inLactate.value = "";
          if (inGlucose) inGlucose.value = "";
          if (inUre) inUre.value = "";
          if (inKetone) inKetone.value = "negative";
          if (inOsm) inOsm.value = "";
          analyzeABG();
        });

        // Gọi hàm lần đầu
        analyzeABG();

        // Xử lý Dark Mode
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

        if (themeToggleBtn) {
          themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
              document.documentElement.removeAttribute('data-theme');
              localStorage.setItem('theme', 'light');
            } else {
              document.documentElement.setAttribute('data-theme', 'dark');
              localStorage.setItem('theme', 'dark');
            }
          });
        }
      });