
      document.addEventListener('DOMContentLoaded', () => {
        // Lấy các DOM elements
        const inPh = document.getElementById('abg-ph');
        const inPco2 = document.getElementById('abg-pco2');
        const inHco3 = document.getElementById('abg-hco3');
        const inNa = document.getElementById('abg-na');
        const inCl = document.getElementById('abg-cl');
        const inAlb = document.getElementById('abg-alb');

        const domVal = document.getElementById('out-validation');
        const boxVal = document.getElementById('step1-validation');
        const domPri = document.getElementById('out-primary');
        const boxPri = document.getElementById('step2-primary');
        const domComp = document.getElementById('out-compensation');
        const domAg = document.getElementById('out-ag');
        const boxAg = document.getElementById('step4-aniongap');
        const boxDelta = document.getElementById('step5-delta');
        const domDelta = document.getElementById('out-delta');
        const domConcl = document.getElementById('out-conclusion');

        function analyzeABG() {
          const ph = parseFloat(inPh.value);
          const pco2 = parseFloat(inPco2.value);
          const hco3 = parseFloat(inHco3.value);
          const na = parseFloat(inNa.value) || 140;
          const cl = parseFloat(inCl.value) || 100;
          const alb = parseFloat(inAlb.value) || 4.0;

          if (!ph || !pco2 || !hco3) return;

          let conclusions = [];

          // BƯỚC 1: KIỂM ĐỊNH MẪU
          // Tính [H+] theo Henderson equation: [H+] = 24 * (pCO2 / HCO3)
          const hCalc = 24 * (pco2 / hco3);
          // Tính [H+] từ pH: [H+] = 10^(9-pH) (công thức nhẩm nhanh lâm sàng)
          const hActual = Math.pow(10, 9 - ph);

          const errorMargin = Math.abs(hCalc - hActual) / hActual;

          if (errorMargin > 0.15) {
            boxVal.className = "step-box status-invalid";
            domVal.innerHTML = `[H⁺] tính toán: ${hCalc.toFixed(1)} nEq/L &ne; [H⁺] thực tế: ${hActual.toFixed(1)} nEq/L.<br><strong>Cảnh báo:</strong> Mẫu máu không hợp lệ hoặc có sai số đo lường.`;
            domConcl.textContent = "Không thể kết luận do mẫu khí máu không hợp lệ.";
            domPri.textContent = "-"; domComp.textContent = "-"; domAg.textContent = "-"; boxDelta.style.display = "none";
            return;
          } else {
            boxVal.className = "step-box status-valid";
            domVal.innerHTML = `Mẫu hợp lệ. [H⁺] dự kiến khớp với pH đo được (~${hCalc.toFixed(1)} nEq/L).`;
          }

          // BƯỚC 2: RỐI LOẠN NGUYÊN PHÁT
          let primary = "";
          let isAcidemia = ph < 7.35;
          let isAlkalemia = ph > 7.45;

          if (isAcidemia) {
            if (hco3 < 22 && pco2 <= 45) primary = "Toan chuyển hóa";
            else if (pco2 > 45 && hco3 >= 22) primary = "Toan hô hấp";
            else primary = "Toan hỗn hợp (Hô hấp & Chuyển hóa)";
          } else if (isAlkalemia) {
            if (hco3 > 26 && pco2 >= 35) primary = "Kiềm chuyển hóa";
            else if (pco2 < 35 && hco3 <= 26) primary = "Kiềm hô hấp";
            else primary = "Kiềm hỗn hợp (Hô hấp & Chuyển hóa)";
          } else {
            // pH bình thường nhưng pCO2 hoặc HCO3 bất thường -> Hỗn hợp bù trừ hoàn toàn
            if (pco2 > 45 && hco3 > 26) primary = "Toan hô hấp & Kiềm chuyển hóa bù trừ";
            else if (pco2 < 35 && hco3 < 22) primary = "Kiềm hô hấp & Toan chuyển hóa bù trừ";
            else primary = "Khí máu hoàn toàn bình thường";
          }

          boxPri.className = "step-box status-primary";
          domPri.innerHTML = `<strong>${primary}</strong> (Dựa trên pH = ${ph})`;
          conclusions.push(primary);

          // BƯỚC 3: ĐÁP ỨNG BÙ TRỪ
          let compText = "Không có rối loạn nguyên phát rõ rệt để tính bù trừ.";
          let expectedPco2 = 0;
          let expectedHco3 = 0;

          if (primary === "Toan chuyển hóa") {
            expectedPco2 = (1.5 * hco3) + 8;
            compText = `pCO₂ kỳ vọng (Công thức Winters): ${expectedPco2.toFixed(1)} ± 2 mmHg.<br>`;
            if (pco2 > expectedPco2 + 2) { compText += "➔ <strong>Kèm Toan hô hấp.</strong>"; conclusions.push("Toan hô hấp phối hợp"); }
            else if (pco2 < expectedPco2 - 2) { compText += "➔ <strong>Kèm Kiềm hô hấp.</strong>"; conclusions.push("Kiềm hô hấp phối hợp"); }
            else compText += "➔ Bù trừ hô hấp phù hợp.";
          }
          else if (primary === "Kiềm chuyển hóa") {
            expectedPco2 = (0.7 * (hco3 - 24)) + 40;
            compText = `pCO₂ kỳ vọng: ${expectedPco2.toFixed(1)} ± 1.5 mmHg.<br>`;
            if (pco2 > expectedPco2 + 1.5) { compText += "➔ <strong>Kèm Toan hô hấp.</strong>"; conclusions.push("Toan hô hấp phối hợp"); }
            else if (pco2 < expectedPco2 - 1.5) { compText += "➔ <strong>Kèm Kiềm hô hấp.</strong>"; conclusions.push("Kiềm hô hấp phối hợp"); }
            else compText += "➔ Bù trừ hô hấp phù hợp.";
          }
          // Toan/Kiềm hô hấp cần phân biệt cấp/mạn, ở đây tính giản lược để tham khảo
          else if (primary.includes("hô hấp")) {
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
          if (hasHighAG) {
            boxDelta.style.display = "block";
            const deltaGap = agCorr - 12;
            const deltaHco3 = 24 - hco3;
            const deltaRatio = deltaGap / deltaHco3;

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
            }
            domDelta.innerHTML = dText;
          } else {
            boxDelta.style.display = "none";
          }

          // TỔNG HỢP KẾT LUẬN
          // Lọc trùng lặp
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