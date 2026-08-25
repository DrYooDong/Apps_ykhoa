/**
 * CliniPortal — Core Clinical Calculation & Decision Engine
 * 
 * Kiến trúc Hỗ trợ Quyết định Lâm sàng (CDSS) thuần Vanilla JS (ES6+).
 * Áp dụng 3 mô hình thiết kế (Design Patterns):
 *   1. Strategy Pattern: Đóng gói các công thức tính toán y khoa độc lập.
 *   2. Chain of Responsibility (Pipeline): Chuỗi các bước xử lý dữ liệu (Chuẩn hóa -> Tính toán -> Phân tầng -> Cảnh báo).
 *   3. State Pattern: Quản lý trạng thái giao diện và form nhập liệu theo ngữ cảnh bệnh nhân.
 */

// ============================================================================
// 1. STRATEGY PATTERN (Các Công thức / Phương pháp tính toán y khoa)
// ============================================================================
class ClinicalStrategy {
    /**
     * @param {string} id Mã nhận diện strategy (ví dụ: 'ckd-epi-2021')
     * @param {string} name Tên công thức hiển thị (ví dụ: 'CKD-EPI 2021')
     * @param {string} description Mô tả tóm tắt khuyến cáo hoặc ngữ cảnh dùng
     */
    constructor(id, name, description = '') {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    /**
     * Hàm tính toán cốt lõi — Cần được ghi đè bởi các lớp con
     * @param {Object} context Chứa toàn bộ thông số bệnh nhân đầu vào
     * @returns {Object|null} Kết quả tính toán { value, unit, text, note, ... }
     */
    calculate(context) {
        throw new Error(`Strategy '${this.id}' phải cài đặt phương thức calculate().`);
    }
}

// ============================================================================
// 2. CHAIN OF RESPONSIBILITY PATTERN (Chuỗi Mắt xích Xử lý Dữ liệu)
// ============================================================================
class ClinicalPipelineStep {
    /**
     * @param {string} name Tên bước xử lý (ví dụ: 'UnitNormalizationStep')
     */
    constructor(name = 'PipelineStep') {
        this.name = name;
        this.nextStep = null;
    }

    /**
     * Thiết lập mắt xích tiếp theo trong chuỗi
     * @param {ClinicalPipelineStep} step 
     * @returns {ClinicalPipelineStep} Trả về step tiếp theo để hỗ trợ method chaining
     */
    setNext(step) {
        this.nextStep = step;
        return step;
    }

    /**
     * Xử lý dữ liệu trong context và chuyển tiếp cho mắt xích sau
     * @param {Object} context Đối tượng ngữ cảnh chứa input và output tích lũy
     * @returns {Promise<Object>} Context sau khi đã qua bước xử lý
     */
    async process(context) {
        if (this.nextStep) {
            return await this.nextStep.process(context);
        }
        return context;
    }
}

/**
 * Trình Quản lý & Điều hành Pipeline
 */
class ClinicalPipeline {
    /**
     * @param {string} name Tên pipeline (ví dụ: 'RenalAssessmentPipeline')
     */
    constructor(name = 'ClinicalPipeline') {
        this.name = name;
        this.firstStep = null;
        this.lastStep = null;
    }

    /**
     * Thêm một bước vào cuối chuỗi Pipeline
     * @param {ClinicalPipelineStep} step 
     * @returns {ClinicalPipeline}
     */
    addStep(step) {
        if (!this.firstStep) {
            this.firstStep = step;
            this.lastStep = step;
        } else {
            this.lastStep.setNext(step);
            this.lastStep = step;
        }
        return this;
    }

    /**
     * Thực thi toàn bộ chuỗi Pipeline với context ban đầu
     * @param {Object} initialContext 
     * @returns {Promise<Object>} Context kết quả hoàn chỉnh
     */
    async execute(initialContext = {}) {
        if (!this.firstStep) return initialContext;
        return await this.firstStep.process(initialContext);
    }
}

// ============================================================================
// 3. STATE PATTERN (Quản lý Trạng thái Form & Giao diện)
// ============================================================================
class ClinicalCalculatorState {
    /**
     * @param {ClinicalStateManager} manager Trình quản lý trạng thái sở hữu
     */
    constructor(manager) {
        this.manager = manager;
    }

    /** Được gọi khi chuyển VÀO trạng thái này */
    enter() {}

    /** Được gọi khi chuyển KHỎI trạng thái này */
    exit() {}

    /** Cập nhật giao diện / ẩn hiện các ô nhập theo trạng thái */
    render() {}
}

class ClinicalStateManager {
    constructor() {
        this.currentState = null;
        this.states = new Map();
    }

    /**
     * Đăng ký trạng thái mới
     * @param {string} name 
     * @param {ClinicalCalculatorState} stateInstance 
     */
    registerState(name, stateInstance) {
        this.states.set(name, stateInstance);
    }

    /**
     * Chuyển sang trạng thái được chỉ định
     * @param {string} name 
     */
    transitionTo(name) {
        if (this.currentState && typeof this.currentState.exit === 'function') {
            this.currentState.exit();
        }
        const nextState = this.states.get(name);
        if (!nextState) {
            console.warn(`[ClinicalEngine] State '${name}' chưa được đăng ký.`);
            return;
        }
        this.currentState = nextState;
        if (typeof this.currentState.enter === 'function') {
            this.currentState.enter();
        }
        if (typeof this.currentState.render === 'function') {
            this.currentState.render();
        }
    }
}

// ============================================================================
// 4. REGISTRY (Kho Lưu trữ Strategy & Components)
// ============================================================================
class ClinicalRegistry {
    constructor() {
        this.items = new Map();
    }

    register(key, item) {
        this.items.set(key, item);
    }

    get(key) {
        return this.items.get(key);
    }

    has(key) {
        return this.items.has(key);
    }

    getAll() {
        return Array.from(this.items.values());
    }
}

// Global Export cho môi trường trình duyệt không bundler
if (typeof window !== 'undefined') {
    window.ClinicalStrategy = ClinicalStrategy;
    window.ClinicalPipelineStep = ClinicalPipelineStep;
    window.ClinicalPipeline = ClinicalPipeline;
    window.ClinicalCalculatorState = ClinicalCalculatorState;
    window.ClinicalStateManager = ClinicalStateManager;
    window.ClinicalRegistry = ClinicalRegistry;

    window.ClinicalEngine = {
        Strategy: ClinicalStrategy,
        PipelineStep: ClinicalPipelineStep,
        Pipeline: ClinicalPipeline,
        CalculatorState: ClinicalCalculatorState,
        StateManager: ClinicalStateManager,
        Registry: ClinicalRegistry
    };
}
