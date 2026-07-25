/**
 * CliniPortal — Renal Function Calculation Engine
 * 
 * Module tính toán & hỗ trợ quyết định chức năng thận (CrCl, eGFR, BSA, KDIGO CKD & AKI).
 * Xây dựng dựa trên nền tảng ClinicalEngine (Strategy & Chain of Responsibility Patterns).
 */

(function () {
    // Đảm bảo ClinicalEngine đã được load
    const Strategy = window.ClinicalStrategy || class {};
    const PipelineStep = window.ClinicalPipelineStep || class {};
    const Pipeline = window.ClinicalPipeline || class {};

    // ============================================================================
    // 1. STRATEGIES (Các Công thức Chức năng Thận)
    // ============================================================================

    /**
     * Strategy 1: Độ thanh thải Creatinine theo Cockcroft-Gault
     */
    class CockcroftGaultStrategy extends Strategy {
        constructor() {
            super('cockcroft-gault', 'Cockcroft-Gault (CrCl)', 'Dùng để chỉnh liều thuốc theo chuẩn FDA');
        }

        calculate({ age, gender, scrMgDl, calcWeight }) {
            if (!age || !scrMgDl || !calcWeight) return null;
            let crcl = ((140 - age) * calcWeight) / (72 * scrMgDl);
            if (gender === 'female') crcl *= 0.85;

            return {
                id: this.id,
                name: this.name,
                value: Math.round(crcl * 10) / 10,
                unit: 'mL/min'
            };
        }
    }

    /**
     * Strategy 2: Mức lọc cầu thận eGFR theo CKD-EPI 2021 (Không phân biệt chủng tộc)
     */
    class CkdEpi2021Strategy extends Strategy {
        constructor() {
            super('ckd-epi-2021', 'CKD-EPI 2021', 'Khuyến cáo KDIGO mới nhất để đánh giá và phân độ CKD');
        }

        calculate({ age, gender, scrMgDl }) {
            if (!age || !scrMgDl) return null;
            const k = gender === 'female' ? 0.7 : 0.9;
            const a = gender === 'female' ? -0.241 : -0.302;

            let egfr = 142 * Math.pow(Math.min(scrMgDl / k, 1), a)
                * Math.pow(Math.max(scrMgDl / k, 1), -1.200)
                * Math.pow(0.9938, age);
            if (gender === 'female') egfr *= 1.012;

            return {
                id: this.id,
                name: this.name,
                value: Math.round(egfr * 10) / 10,
                unit: 'mL/min/1.73m²'
            };
        }
    }

    /**
     * Strategy 3: BSA (DuBois) & eGFR tuyệt đối (Khử chỉ số hóa BSA)
     */
    class DuBoisBsaStrategy extends Strategy {
        constructor() {
            super('dubois-bsa', 'BSA (DuBois & DuBois)', 'Tính diện tích bề mặt cơ thể và eGFR tuyệt đối');
        }

        calculate({ height, weight, egfrRelative }) {
            if (!height || !weight) return null;
            const bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
            const absoluteEgfr = egfrRelative ? egfrRelative * (bsa / 1.73) : null;

            return {
                id: this.id,
                name: this.name,
                bsa: Math.round(bsa * 100) / 100,
                absoluteEgfr: absoluteEgfr ? Math.round(absoluteEgfr * 10) / 10 : null,
                unit: 'm²'
            };
        }
    }

    // ============================================================================
    // 2. PIPELINE STEPS (Mắt xích Chuỗi Xử lý Dữ liệu)
    // ============================================================================

    /**
     * Step 1: Chuẩn hóa đơn vị đầu vào (Chuyển µmol/L về mg/dL, tính tuổi nếu nhập năm sinh)
     */
    class RenalUnitConversionStep extends PipelineStep {
        constructor() { super('RenalUnitConversionStep'); }

        async process(context) {
            let age = parseFloat(context.rawAge) || 0;
            const currentYear = new Date().getFullYear();
            if (age >= 1900 && age <= currentYear) {
                age = currentYear - age;
            }
            context.age = age;

            // Quy đổi Creatinine huyết thanh về mg/dL
            let scr = parseFloat(context.rawScr) || 0;
            if (context.scrUnit === 'umolL') {
                scr = scr / 88.4;
            }
            context.scrMgDl = scr;

            // Quy đổi Baseline Creatinine cho AKI về mg/dL
            let baseline = parseFloat(context.rawAkiBaseline) || 0;
            if (context.akiBaselineUnit === 'umolL') {
                baseline = baseline / 88.4;
            }
            context.akiBaselineMgDl = baseline;

            return super.process(context);
        }
    }

    /**
     * Step 2: Tính toán Cân nặng & Lựa chọn Cân nặng chuẩn theo BMI/IBW/AdjBW
     */
    class BodyWeightEvaluationStep extends PipelineStep {
        constructor() { super('BodyWeightEvaluationStep'); }

        async process(context) {
            const { height, weight, gender } = context;
            if (!height || !weight) return super.process(context);

            const bmi = weight / Math.pow(height / 100, 2);
            const ibw = gender === 'male' ? 50 + 0.9 * (height - 152.4) : 45.5 + 0.9 * (height - 152.4);
            const adjBw = ibw + 0.4 * (weight - ibw);

            let calcWeight = weight;
            let weightType = '';
            let weightReason = '';

            if (weight < ibw) {
                calcWeight = weight;
                weightType = 'Cân nặng thực tế (Actual BW)';
                weightReason = 'Bệnh nhân có cân nặng < IBW, hệ thống tự động chọn cân nặng thực tế để tránh đánh giá quá mức (overestimate) chức năng thận.';
            } else if (weight > 1.2 * ibw || bmi >= 25) {
                calcWeight = adjBw;
                weightType = 'Cân nặng hiệu chỉnh (AdjBW)';
                weightReason = `Bệnh nhân thừa cân/béo phì (BMI = ${bmi.toFixed(1)}), hệ thống sử dụng AdjBW để tránh sai số giả tạo chức năng thận.`;
            } else {
                calcWeight = ibw;
                weightType = 'Cân nặng lý tưởng (IBW)';
                weightReason = 'Bệnh nhân có thể trạng bình thường, sử dụng IBW theo thực hành lâm sàng chuẩn.';
            }

            context.bmi = Math.round(bmi * 10) / 10;
            context.ibw = Math.round(ibw * 10) / 10;
            context.adjBw = Math.round(adjBw * 10) / 10;
            context.calcWeight = Math.round(calcWeight * 10) / 10;
            context.weightType = weightType;
            context.weightReason = weightReason;

            return super.process(context);
        }
    }

    /**
     * Step 3: Thực thi các Strategy Tính toán (CrCl, eGFR CKD-EPI, BSA)
     */
    class RenalCalculationStep extends PipelineStep {
        constructor() { super('RenalCalculationStep'); }

        async process(context) {
            const cgStrategy = new CockcroftGaultStrategy();
            const epiStrategy = new CkdEpi2021Strategy();
            const bsaStrategy = new DuBoisBsaStrategy();

            context.cgResult = cgStrategy.calculate(context);
            context.epiResult = epiStrategy.calculate(context);

            const egfrRelative = context.epiResult ? context.epiResult.value : null;
            context.bsaResult = bsaStrategy.calculate({
                height: context.height,
                weight: context.weight,
                egfrRelative
            });

            return super.process(context);
        }
    }

    /**
     * Step 4: Phân tầng Nguy cơ Bệnh thận mạn (KDIGO 2024 Grid)
     */
    class KdigoCkdStagingStep extends PipelineStep {
        constructor() { super('KdigoCkdStagingStep'); }

        async process(context) {
            const epi = context.epiResult ? context.epiResult.value : null;
            const acr = context.acr || 'A1';

            if (!epi) return super.process(context);

            let gStage = '';
            if (epi >= 90) gStage = 'G1';
            else if (epi >= 60) gStage = 'G2';
            else if (epi >= 45) gStage = 'G3a';
            else if (epi >= 30) gStage = 'G3b';
            else if (epi >= 15) gStage = 'G4';
            else gStage = 'G5';

            let riskLevel = 'low';
            let riskText = 'Nguy cơ THẤP';

            if (gStage === 'G1' || gStage === 'G2') {
                if (acr === 'A1') { riskLevel = 'low'; riskText = 'Nguy cơ THẤP (Theo dõi hàng năm)'; }
                else if (acr === 'A2') { riskLevel = 'mod'; riskText = 'Nguy cơ TRUNG BÌNH (Theo dõi mỗi 1 năm)'; }
                else if (acr === 'A3') { riskLevel = 'high'; riskText = 'Nguy cơ CAO (Theo dõi mỗi 6 tháng)'; }
            } else if (gStage === 'G3a') {
                if (acr === 'A1') { riskLevel = 'mod'; riskText = 'Nguy cơ TRUNG BÌNH (Theo dõi mỗi 1 năm)'; }
                else if (acr === 'A2') { riskLevel = 'high'; riskText = 'Nguy cơ CAO (Theo dõi mỗi 6 tháng)'; }
                else if (acr === 'A3') { riskLevel = 'vhigh'; riskText = 'Nguy cơ RẤT CAO (Theo dõi mỗi 3-4 tháng & Hội chẩn CK Thận)'; }
            } else if (gStage === 'G3b') {
                if (acr === 'A1') { riskLevel = 'high'; riskText = 'Nguy cơ CAO (Theo dõi mỗi 6 tháng)'; }
                else { riskLevel = 'vhigh'; riskText = 'Nguy cơ RẤT CAO (Hội chẩn Chuyên khoa Thận)'; }
            } else {
                riskLevel = 'vhigh'; riskText = 'Nguy cơ RẤT CAO (Chuẩn bị điều trị thay thế thận)';
            }

            context.ckdStaging = {
                gStage,
                aStage: acr,
                combinedText: `CKD Giai đoạn: ${gStage}-${acr}`,
                riskLevel,
                riskText,
                riskClass: `risk-${riskLevel}`
            };

            return super.process(context);
        }
    }

    /**
     * Step 5: Phân độ Tổn thương Thận cấp (KDIGO AKI Criteria)
     */
    class KdigoAkiStagingStep extends PipelineStep {
        constructor() { super('KdigoAkiStagingStep'); }

        async process(context) {
            const currentMgDL = context.scrMgDl;
            const baselineMgDL = context.akiBaselineMgDl;
            const is48h = context.isAki48h;
            const isRRT = context.isAkiRrt;

            if (!baselineMgDL || baselineMgDL <= 0 || !currentMgDL || currentMgDL <= 0) {
                context.akiStaging = null;
                return super.process(context);
            }

            const ratio = currentMgDL / baselineMgDL;
            const absoluteIncrease = currentMgDL - baselineMgDL;

            let stage = '';
            let stageClass = '';
            let criteria = '';
            let recommendation = '';

            if (isRRT) {
                stage = 'Giai đoạn 3';
                stageClass = 'aki-stage-3';
                criteria = 'Bệnh nhân đang được lọc máu cấp (RRT)';
                recommendation = '<strong>🚨 AKI Giai đoạn 3:</strong> Cần hội chẩn Chuyên khoa Thận ngay. Đánh giá chỉ định lọc máu, điều trị nguyên nhân, theo dõi sát điện giải và cân bằng dịch.';
            } else if ((currentMgDL >= 4.0 && (absoluteIncrease >= 0.5 || ratio >= 1.5)) || ratio >= 3.0) {
                stage = 'Giai đoạn 3';
                stageClass = 'aki-stage-3';
                criteria = currentMgDL >= 4.0
                    ? `Creatinine ≥ 4.0 mg/dL (${(currentMgDL * 88.4).toFixed(1)} µmol/L)`
                    : `Tăng ≥ 3.0 lần so với baseline (${ratio.toFixed(2)}x)`;
                recommendation = '<strong>🚨 AKI Giai đoạn 3:</strong> Nguy cơ cao. Hội chẩn Thận khẩn cấp. Ngừng tất cả thuốc độc thận. Đánh giá chỉ định lọc máu. Theo dõi sát mỗi 4-6 giờ.';
            } else if (ratio >= 2.0) {
                stage = 'Giai đoạn 2';
                stageClass = 'aki-stage-2';
                criteria = `Tăng ${ratio.toFixed(2)} lần so với baseline (tiêu chuẩn: ≥ 2.0-2.9 lần)`;
                recommendation = '<strong>⚠️ AKI Giai đoạn 2:</strong> Cần nhập viện hoặc theo dõi sát. Đánh giá nguyên nhân (giảm thể tích, tắc nghẽn, độc thận). Chỉnh liều thuốc theo chức năng thận. Theo dõi Creatinine mỗi 12-24 giờ.';
            } else if ((is48h && absoluteIncrease >= 0.3) || ratio >= 1.5) {
                stage = 'Giai đoạn 1';
                stageClass = 'aki-stage-1';
                if (is48h && absoluteIncrease >= 0.3) {
                    criteria = `Tăng tuyệt đối ${absoluteIncrease.toFixed(2)} mg/dL trong 48h (tiêu chuẩn: ≥ 0.3 mg/dL)`;
                } else {
                    criteria = `Tăng ${ratio.toFixed(2)} lần so với baseline (tiêu chuẩn: ≥ 1.5-1.9 lần)`;
                }
                recommendation = '<strong>⚡ AKI Giai đoạn 1:</strong> Theo dõi sát. Đánh giá nguyên nhân (prerenal, renal, postrenal). Đảm bảo đủ dịch, tránh thuốc độc thận. Kiểm tra lại Creatinine trong 24-48 giờ.';
            } else {
                stage = 'Không có AKI';
                stageClass = 'aki-no-aki';
                criteria = `Tỷ lệ ${ratio.toFixed(2)}x (dưới ngưỡng AKI)`;
                recommendation = '<strong>✅ Không có AKI:</strong> Chức năng thận ổn định. Tiếp tục theo dõi định kỳ.';
            }

            context.akiStaging = {
                stage,
                stageClass,
                criteria,
                recommendation
            };

            return super.process(context);
        }
    }

    /**
     * Step 6: Cảnh báo Độc thận & Khuyến cáo Chỉnh liều thuốc
     */
    class MedicationDosingAlertStep extends PipelineStep {
        constructor() { super('MedicationDosingAlertStep'); }

        async process(context) {
            const crcl = context.cgResult ? context.cgResult.value : 999;
            const epiAbs = context.bsaResult ? context.bsaResult.absoluteEgfr : 999;
            const refValue = Math.min(crcl, epiAbs || crcl);

            const alerts = [];

            if (refValue < 60) {
                alerts.push('<strong>DOACs (Kháng đông uống mới):</strong> Cần chỉnh giảm liều Rivaroxaban, Apixaban, Dabigatran theo eGFR tuyệt đối.');
            }
            if (refValue < 45) {
                alerts.push('<strong>SGLT2i:</strong> Không khuyến cáo khởi trị mới với mục đích kiểm soát đường huyết (có thể duy trì để bảo vệ thận tùy guideline).');
                alerts.push('<strong>Metformin:</strong> Giảm nửa liều (Tối đa 1000 mg/ngày).');
            }
            if (refValue < 30) {
                alerts.push('<strong>⛔ CHỐNG CHỈ ĐỊNH Metformin:</strong> Nguy cơ toan Lactic cao.');
                alerts.push('<strong>⛔ CHỐNG CHỈ ĐỊNH:</strong> Spironolactone, LMWH liều điều trị (Enoxaparin). Chuyển sang Heparin không phân đoạn nếu cần kháng đông.');
            }
            if (refValue < 15) {
                alerts.push('<strong>Thuốc giảm đau:</strong> Tránh tuyệt đối NSAIDs. Cẩn trọng với hình tích lũy độc tính của Morphine/Codein.');
            }

            context.medicationAlerts = alerts;
            return super.process(context);
        }
    }

    /**
     * Step 7: Đồng bộ thông số bệnh nhân sang ClinicalBridge Session
     */
    class ClinicalBridgeSyncStep extends PipelineStep {
        constructor() { super('ClinicalBridgeSyncStep'); }

        async process(context) {
            if (typeof window !== 'undefined' && window.ClinicalBridge) {
                window.ClinicalBridge.updateSession({
                    age: context.age,
                    gender: context.gender,
                    height: context.height,
                    weight: context.weight,
                    calcWeight: context.calcWeight,
                    scrMgDl: context.scrMgDl,
                    crcl: context.cgResult ? context.cgResult.value : null,
                    egfr: context.epiResult ? context.epiResult.value : null,
                    cgResult: context.cgResult,
                    epiResult: context.epiResult,
                    bsaResult: context.bsaResult,
                    ckdStaging: context.ckdStaging,
                    sourceTool: 'renal-function.html'
                });
            }
            return super.process(context);
        }
    }

    // ============================================================================
    // 3. ENGINE FACTORY (Khởi tạo Pipeline cho RenalEngine)
    // ============================================================================
    class RenalEngine {
        static createPipeline() {
            const pipeline = new Pipeline('RenalAssessmentPipeline');
            pipeline.addStep(new RenalUnitConversionStep())
                    .addStep(new BodyWeightEvaluationStep())
                    .addStep(new RenalCalculationStep())
                    .addStep(new KdigoCkdStagingStep())
                    .addStep(new KdigoAkiStagingStep())
                    .addStep(new MedicationDosingAlertStep())
                    .addStep(new ClinicalBridgeSyncStep());
            return pipeline;
        }
    }

    // Export cho môi trường Browser
    if (typeof window !== 'undefined') {
        window.RenalEngine = {
            Strategies: {
                CockcroftGaultStrategy,
                CkdEpi2021Strategy,
                DuBoisBsaStrategy
            },
            Steps: {
                RenalUnitConversionStep,
                BodyWeightEvaluationStep,
                RenalCalculationStep,
                KdigoCkdStagingStep,
                KdigoAkiStagingStep,
                MedicationDosingAlertStep,
                ClinicalBridgeSyncStep
            },
            createPipeline: RenalEngine.createPipeline,
            pipeline: RenalEngine.createPipeline()
        };
    }
})();
