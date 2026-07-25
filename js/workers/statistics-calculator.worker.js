/**
 * Statistics Calculator Web Worker — CliniPortal NCKH Engine
 * Executes heavy statistical algorithms off the main UI thread.
 */

self.onmessage = function (e) {
    const { action, payload, id } = e.data;
    
    let result = null;
    let error = null;

    try {
        switch (action) {
            case 'CALCULATE_SAMPLE_SIZE_PROPORTION':
                result = calculateSampleSizeProportion(payload);
                break;
            case 'CALCULATE_SAMPLE_SIZE_TWO_MEANS':
                result = calculateSampleSizeTwoMeans(payload);
                break;
            case 'CALCULATE_ODDS_RATIO':
                result = calculateOddsRatio(payload);
                break;
            case 'CALCULATE_CHI_SQUARE':
                result = calculateChiSquare(payload);
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    } catch (err) {
        error = err.message;
    }

    self.postMessage({ id, action, result, error });
};

/**
 * 1. Tính cỡ mẫu ước lượng 1 tỷ lệ (Descriptive Study - Proportion)
 * Formula: n = Z²_(1-α/2) * p * (1-p) / d²
 */
function calculateSampleSizeProportion({ confidenceLevel = 0.95, p = 0.5, d = 0.05, populationSize = null }) {
    const zMap = { 0.90: 1.645, 0.95: 1.96, 0.99: 2.576 };
    const z = zMap[confidenceLevel] || 1.96;

    let n = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(d, 2);
    
    // Nếu có cỡ quần thể hữu hạn N (Finite Population Correction)
    if (populationSize && populationSize > 0) {
        n = n / (1 + (n - 1) / populationSize);
    }

    return {
        sampleSize: Math.ceil(n),
        parameters: { z, p, d, confidenceLevel, populationSize }
    };
}

/**
 * 2. Tính cỡ mẫu so sánh 2 trung bình (2 Independent Means)
 * Formula: n = 2 * (Z_α/2 + Z_β)² * σ² / Δ²
 */
function calculateSampleSizeTwoMeans({ alpha = 0.05, power = 0.80, sd = 1.0, meanDiff = 0.5 }) {
    const zAlphaMap = { 0.05: 1.96, 0.01: 2.576, 0.10: 1.645 };
    const zBetaMap = { 0.80: 0.842, 0.90: 1.282, 0.95: 1.645 };

    const zAlpha = zAlphaMap[alpha] || 1.96;
    const zBeta = zBetaMap[power] || 0.842;

    const nPerGroup = (2 * Math.pow(zAlpha + zBeta, 2) * Math.pow(sd, 2)) / Math.pow(meanDiff, 2);

    return {
        nPerGroup: Math.ceil(nPerGroup),
        totalN: Math.ceil(nPerGroup) * 2,
        parameters: { zAlpha, zBeta, sd, meanDiff }
    };
}

/**
 * 3. Odds Ratio & 95% Confidence Interval (2x2 Table)
 * | a | b |
 * | c | d |
 */
function calculateOddsRatio({ a, b, c, d }) {
    const or = (a * d) / (b * c);
    const seLnOR = Math.sqrt(1/a + 1/b + 1/c + 1/d);
    const ciLower = Math.exp(Math.log(or) - 1.96 * seLnOR);
    const ciUpper = Math.exp(Math.log(or) + 1.96 * seLnOR);

    return {
        oddsRatio: parseFloat(or.toFixed(3)),
        ci95Lower: parseFloat(ciLower.toFixed(3)),
        ci95Upper: parseFloat(ciUpper.toFixed(3)),
        se: parseFloat(seLnOR.toFixed(4))
    };
}

/**
 * 4. Chi-Square Test (2x2 Table)
 */
function calculateChiSquare({ a, b, c, d }) {
    const N = a + b + c + d;
    const chi2 = (N * Math.pow(Math.abs(a * d - b * c) - N / 2, 2)) / ((a + b) * (c + d) * (a + c) * (b + d));
    
    return {
        chiSquareValue: parseFloat(chi2.toFixed(3)),
        degreesOfFreedom: 1,
        isSignificantP005: chi2 > 3.841
    };
}
