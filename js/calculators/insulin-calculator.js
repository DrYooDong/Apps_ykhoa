document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('input, select');

      // Các DOM Elements
      const settingSelect = document.getElementById('clinicalSetting');
      const nutritionCard = document.getElementById('nutritionCard');
      const resultNonICU = document.getElementById('resultNonICU');
      const resultICU = document.getElementById('resultICU');
      const npoAlert = document.getElementById('npoAlert');

      inputs.forEach(input => {
        input.addEventListener('input', calculateInsulin);
        input.addEventListener('change', calculateInsulin);
      });

      function calculateInsulin() {
        // Lấy dữ liệu input
        const setting = settingSelect.value;
        const weight = parseFloat(document.getElementById('patientWeight').value) || 0;
        const bg = parseFloat(document.getElementById('currentBG').value) || 0;
        const isHypoRisk = document.getElementById('riskHypo').checked;
        const isResistant = document.getElementById('riskResist').checked;
        const nutrition = document.getElementById('nutritionStatus').value;

        if (!weight || weight <= 0) return;

        // Toggle Giao diện theo Bối cảnh lâm sàng
        if (setting === 'icu') {
          nutritionCard.style.display = 'none';
          resultNonICU.style.display = 'none';
          resultICU.style.display = 'block';

          // TÍNH TOÁN ICU (Truyền TM)
          // Khởi đầu thường 0.1 U/kg/h. Giảm xuống 0.05 nếu có nguy cơ hạ ĐH (suy thận).
          let ivMultiplier = 0.1;
          if (isHypoRisk) ivMultiplier = 0.05;

          const ivRate = weight * ivMultiplier;

          document.getElementById('icuMultiplier').innerText = ivMultiplier;
          document.getElementById('pumpRateIV').innerText = ivRate.toFixed(1);

        } else {
          nutritionCard.style.display = 'block';
          resultNonICU.style.display = 'block';
          resultICU.style.display = 'none';

          // TÍNH TOÁN NON-ICU (Basal-Bolus)
          // TDD multiplier theo ADA 2026 (0.2 - 0.5 U/kg)
          let tddMultiplier = 0.4; // Mặc định
          if (isHypoRisk) tddMultiplier = 0.25;
          if (isResistant) tddMultiplier = 0.5;
          if (isHypoRisk && isResistant) tddMultiplier = 0.3; // Ưu tiên an toàn

          const TDD = weight * tddMultiplier;

          let basal = TDD * 0.5;
          let bolusTotal = TDD * 0.5;
          let bolusPerMeal = bolusTotal / 3;

          // Xử lý cảnh báo NPO (Nhịn ăn)
          if (nutrition === 'npo') {
            npoAlert.style.display = 'block';
            bolusPerMeal = 0; // Ngừng tiêm bolus bữa ăn
          } else {
            npoAlert.style.display = 'none';
          }

          document.getElementById('resTDD').innerText = TDD.toFixed(0);
          document.getElementById('resBasal').innerText = basal.toFixed(0);
          document.getElementById('resBolus').innerText = bolusPerMeal.toFixed(0);
        }
      }

      // Khởi chạy lần đầu
      calculateInsulin();
    });