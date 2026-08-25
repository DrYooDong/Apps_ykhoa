/**
 * micro-engine.js — Microbiology Pro Studio
 * Động cơ nhận diện vi khuẩn & Tra cứu Antibiogram.
 */

class MicroEngine {
  static analyze(microData) {
    const decisionSteps = MICRO_CRITERIA.evaluateDecisionTree(microData);
    const antibiogram = MICRO_CRITERIA.antibiogramData[microData.organismId] || [];

    return {
      decisionSteps,
      antibiogram,
      organismId: microData.organismId,
      isEmergency: microData.gram.includes("intracellular") || microData.organismId.includes("MRSA") || microData.organismId.includes("ESBL")
    };
  }
}
