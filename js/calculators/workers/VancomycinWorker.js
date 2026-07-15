/**
 * VancomycinWorker.js
 * Web Worker xử lý các vòng lặp tính toán nặng cho Vancomycin PK.
 * Không chứa thao tác DOM (DOM manipulation).
 */

self.onmessage = function(e) {
    const data = e.data;
    
    if (data.command === 'simulatePK') {
        const result = simulateConcentrationCurve(data.payload);
        self.postMessage({ command: 'simulatePK_Done', result: result });
    }
};

/**
 * Mô phỏng đồ thị nồng độ Vancomycin trong một số chu kỳ liều (ví dụ 48 giờ)
 */
function simulateConcentrationCurve(payload) {
    const { dose, tau, tinf, ke, Vd, durationHours } = payload;
    
    const dataPoints = [];
    const totalMinutes = durationHours * 60;
    
    let currentConc = 0;
    
    // Giả lập từng phút một
    for (let m = 0; m <= totalMinutes; m++) {
        const timeInHours = m / 60;
        
        // Xác định vị trí tương đối trong một chu kỳ liều (tau)
        const timeInCycle = timeInHours % tau;
        
        let conc = 0;
        
        // Công thức tính nồng độ cộng dồn (Superposition principle)
        // Để đơn giản và nhanh trong mô phỏng, ta sẽ dùng công thức Multiple IV Infusion Steady State
        // hoặc tính lũy kế. Dưới đây dùng Steady State cho nhanh gọn nếu tính điểm thời gian hiện tại
        
        if (timeInCycle <= tinf) {
            // Đang truyền (Infusion phase)
            // Ct = (k0 / (Vd * ke)) * (1 - e^(-ke * t)) + Cmin * e^(-ke * t)
            const k0 = dose / tinf;
            // cMinPred là nồng độ ở cuối chu kỳ trước
            const cMaxPred = (dose * (1 - Math.exp(-ke * tinf))) / (tinf * ke * Vd * (1 - Math.exp(-ke * tau)));
            const cMinPred = cMaxPred * Math.exp(-ke * (tau - tinf));
            
            conc = (k0 / (Vd * ke)) * (1 - Math.exp(-ke * timeInCycle)) + cMinPred * Math.exp(-ke * timeInCycle);
        } else {
            // Đã ngừng truyền (Elimination phase)
            const cMaxPred = (dose * (1 - Math.exp(-ke * tinf))) / (tinf * ke * Vd * (1 - Math.exp(-ke * tau)));
            const timePostInfusion = timeInCycle - tinf;
            conc = cMaxPred * Math.exp(-ke * timePostInfusion);
        }
        
        // Chỉ lưu 1 điểm mỗi phút
        dataPoints.push({
            time: Number(timeInHours.toFixed(2)),
            conc: Number(conc.toFixed(2))
        });
    }
    
    return dataPoints;
}
