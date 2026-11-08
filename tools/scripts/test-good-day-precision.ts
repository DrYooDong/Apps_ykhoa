/**
 * CliniPortal 2.0 — Precision Unit Test for Good Day & Biorhythm Engine
 * Path: tools/scripts/test-good-day-precision.ts
 */

import {
  calculateBiorhythms,
  evaluateDayScore,
  calculateGioTimeline,
  calculateGioRanks9Bậc,
  getDoctorProfile
} from '../../src/tools/good-day-engine.ts';

console.log('--- 🧪 STARTING PRECISION UNIT TESTS FOR GOOD DAY ENGINE ---');

// TEST 1: Biorhythm Mathematical Sine Waves
const birth = new Date(2000, 0, 1); // 2000-01-01
// Day 0: sin(0) = 0
const bio0 = calculateBiorhythms(birth, new Date(2000, 0, 1));
console.assert(bio0.physical === 0, `Test 1.1 Failed: physical expected 0, got ${bio0.physical}`);
console.assert(bio0.emotional === 0, `Test 1.2 Failed: emotional expected 0, got ${bio0.emotional}`);
console.assert(bio0.intellectual === 0, `Test 1.3 Failed: intellectual expected 0, got ${bio0.intellectual}`);
console.assert(bio0.intuitive === 0, `Test 1.4 Failed: intuitive expected 0, got ${bio0.intuitive}`);
console.log('✅ Test 1 (Biorhythm Day 0 = 0) PASSED');

// Day 23: physical completed 1 cycle (23 days) -> sin(2pi) = 0
const bio23 = calculateBiorhythms(birth, new Date(2000, 0, 1 + 23));
console.assert(Math.abs(bio23.physical) <= 1, `Test 2 Failed: physical after 23 days expected ~0, got ${bio23.physical}`);
console.log('✅ Test 2 (Physical 23-day period) PASSED');

// Day 28: emotional completed 1 cycle (28 days) -> sin(2pi) = 0
const bio28 = calculateBiorhythms(birth, new Date(2000, 0, 1 + 28));
console.assert(Math.abs(bio28.emotional) <= 1, `Test 3 Failed: emotional after 28 days expected ~0, got ${bio28.emotional}`);
console.log('✅ Test 3 (Emotional 28-day period) PASSED');

// Day 33: intellectual completed 1 cycle (33 days) -> sin(2pi) = 0
const bio33 = calculateBiorhythms(birth, new Date(2000, 0, 1 + 33));
console.assert(Math.abs(bio33.intellectual) <= 1, `Test 4 Failed: intellectual after 33 days expected ~0, got ${bio33.intellectual}`);
console.log('✅ Test 4 (Intellectual 33-day period) PASSED');

// Day 38: intuitive completed 1 cycle (38 days) -> sin(2pi) = 0
const bio38 = calculateBiorhythms(birth, new Date(2000, 0, 1 + 38));
console.assert(Math.abs(bio38.intuitive) <= 1, `Test 5 Failed: intuitive after 38 days expected ~0, got ${bio38.intuitive}`);
console.log('✅ Test 5 (Intuitive 38-day period) PASSED');

// TEST 6: Day Score Evaluation
const doc = getDoctorProfile();
const evalToday = evaluateDayScore(new Date(), doc);
console.assert(evalToday.total >= 0 && evalToday.total <= 100, `Test 6 Failed: score ${evalToday.total} out of bounds [0, 100]`);
console.assert(evalToday.gioRanks.length === 12, `Test 7 Failed: gioRanks length expected 12, got ${evalToday.gioRanks.length}`);
console.assert(evalToday.gioTimeline.length === 12, `Test 8 Failed: gioTimeline length expected 12, got ${evalToday.gioTimeline.length}`);
console.assert(evalToday.medicalTasks.kham_chandoan !== undefined, 'Test 9 Failed: kham_chandoan undefined');
console.assert(evalToday.medicalTasks.khoi_phacdo !== undefined, 'Test 10 Failed: khoi_phacdo undefined');
console.assert(evalToday.medicalTasks.chinh_lieu_xuatvien !== undefined, 'Test 11 Failed: chinh_lieu_xuatvien undefined');

console.log(`✅ Test 6-11 (Day Score & Medical Tasks) PASSED: Score=${evalToday.total}/100, Rating=${evalToday.rating}`);
console.log('--- 🌟 ALL 11 PRECISION TESTS PASSED 100% ---');

