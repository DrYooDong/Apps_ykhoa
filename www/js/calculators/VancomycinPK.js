/**
 * VancomycinPK.js - Clinical Calculator Plugin cho Dược động học Vancomycin
 * Xử lý các phép toán: tính CrCl, phân bố Vd, thải trừ Ke, AUC, dự đoán liều.
 */

class VancomycinPK {
    /**
     * Tính cân nặng lý tưởng (IBW) và cân nặng hiệu chỉnh (AdjBW)
     * @param {number} weight - Cân nặng thực (kg)
     * @param {number} height - Chiều cao (cm)
     * @param {string} gender - 'male' hoặc 'female'
     * @returns {Object} { ibw, adjbw, isObese, bmi, bsa }
     */
    static calculateWeights(weight, height, gender) {
        if (!height || height <= 0) return { ibw: weight, adjbw: weight, isObese: false, bmi: 0, bsa: 0 };
        
        let ibw = gender === 'male' ? 50 + 0.91 * (height - 152.4) : 45.5 + 0.91 * (height - 152.4);
        ibw = Math.max(ibw, 1);
        ibw = Math.round(ibw * 10) / 10;
        
        const isObese = weight > 1.2 * ibw;
        const adjbw = isObese ? Math.round((ibw + 0.4 * (weight - ibw)) * 10) / 10 : weight;
        const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
        const bsa = Math.round(Math.sqrt((height * weight) / 3600) * 100) / 100;
        
        return { ibw, adjbw, isObese, bmi, bsa };
    }

    /**
     * Tính Độ thanh thải Creatinin (Cockcroft-Gault)
     * @param {number} age - Tuổi
     * @param {number} weight - Cân nặng dùng để tính (TBW hoặc AdjBW)
     * @param {number} scr - Creatinin huyết thanh (mg/dL)
     * @param {string} gender - 'male' hoặc 'female'
     * @returns {number|null} CrCl (mL/min)
     */
    static calculateCrCl(age, weight, scr, gender) {
        if (!age || !weight || !scr || scr <= 0) return null;
        // Tròn lên Scr = 0.7 nếu bệnh nhân >= 65 tuổi và Scr < 0.7
        const adjScr = (age >= 65 && scr < 0.7) ? 0.7 : scr;
        const crcl = Math.max(Math.round(((140 - age) * weight) / (72 * adjScr) * (gender === 'female' ? 0.85 : 1)), 1);
        return crcl;
    }

    /**
     * Tính toán Dược động học cá thể hóa (Sawchuk-Zaske) dựa trên 2 điểm đo
     * @param {Object} params - Thông số đầu vào
     * @returns {Object} Thông số PK: { ke, thalf, Vd, Cl, calcAUC, cMax, cMin, error }
     */
    static calculatePK(params) {
        const { dose, tau, tinf, cPeak, tPeak, cTrough, tTrough } = params;
        
        const tD = tau - tinf - tPeak - tTrough;
        if (tD <= 0) return { error: "Thời gian lấy mẫu không hợp lệ so với khoảng cách liều (tau)." };
        if (cPeak <= cTrough) return { error: "C-peak phải lớn hơn C-trough." };

        const ke = Math.log(cPeak / cTrough) / tD;
        const thalf = Math.log(2) / ke;
        
        // Extrapolate Cmax at end of infusion, Cmin just before next dose
        const cMax = cPeak * Math.exp(ke * tPeak);
        const cMin = cTrough * Math.exp(-ke * tTrough);
        
        const Vd = (dose * (1 - Math.exp(-ke * tinf))) / (tinf * ke * (cMax - cMin * Math.exp(-ke * tinf)));
        const Cl = ke * Vd;
        
        // Tính AUC của 1 liều (aT) rồi nhân với số liều trong 24h
        const aT = ((cMax + cMin) * tinf) / 2 + (cMax - cMin) / ke;
        const n = 24 / tau;
        const calcAUC = aT * n;
        
        return { ke, thalf, Vd, Cl, calcAUC, cMax, cMin, error: null };
    }

    /**
     * Dự đoán phác đồ (Regimen Prediction)
     * @param {number} targetDosePerInterval - Liều dự định (mg)
     * @param {number} interval - Khoảng cách liều (h)
     * @param {number} ke - Hằng số thải trừ (h^-1)
     * @param {number} Vd - Thể tích phân bố (L)
     * @param {number} tinf - Thời gian truyền (h)
     * @returns {Object} { predictedAUC, predictedTrough }
     */
    static predictRegimen(targetDosePerInterval, interval, ke, Vd, tinf = 1.0) {
        const cMaxPred = (targetDosePerInterval * (1 - Math.exp(-ke * tinf))) / (tinf * ke * Vd * (1 - Math.exp(-ke * interval)));
        const cMinPred = cMaxPred * Math.exp(-ke * (interval - tinf));
        
        const n = 24 / interval;
        const aT = ((cMaxPred + cMinPred) * tinf) / 2 + (cMaxPred - cMinPred) / ke;
        const predictedAUC = aT * n;
        
        return { predictedAUC, predictedTrough: cMinPred };
    }
}
