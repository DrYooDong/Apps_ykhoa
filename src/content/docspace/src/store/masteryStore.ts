/**
 * DocSpace v2 — Offline Mastery & Spaced-Repetition Mistakes Store
 * Lưu lịch sử điểm OSCE theo 4 trụ cột năng lực và danh sách câu sai cần ôn lại (100% cục bộ)
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { OsceAttemptRecord, OscePillarKey } from '../schemas/docspaceV2.ts';

const MASTERY_STORAGE_KEY = 'docspace_v2_osce_mastery_v1';
const MAX_RECORDS = 80;

function loadAttempts(): OsceAttemptRecord[] {
  try {
    const raw = localStorage.getItem(MASTERY_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
}

export function useMasteryStore() {
  const [attempts, setAttempts] = useState<OsceAttemptRecord[]>(loadAttempts);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERY_STORAGE_KEY, JSON.stringify(attempts.slice(0, MAX_RECORDS)));
    } catch {
      // ignore
    }
  }, [attempts]);

  const recordAttempt = useCallback((record: OsceAttemptRecord) => {
    setAttempts((prev) => [record, ...prev].slice(0, MAX_RECORDS));
  }, []);

  const clearHistory = useCallback(() => {
    setAttempts([]);
  }, []);

  const summary = useMemo(() => {
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        averagePct: 0,
        pillarAverages: {
          history_exam: 0,
          labs_workup: 0,
          diagnosis_staging: 0,
          management_safety: 0,
        } as Record<OscePillarKey, number>,
        recentMistakes: [] as Array<{
          scenarioTitle: string;
          specialty: string;
          prompt: string;
          chosenText: string;
          correctText: string;
          rationale: string;
        }>,
      };
    }

    const totalPct = attempts.reduce(
      (acc, item) => acc + (item.maxScore > 0 ? (item.totalScore / item.maxScore) * 100 : 0),
      0
    );

    const pillars: OscePillarKey[] = [
      'history_exam',
      'labs_workup',
      'diagnosis_staging',
      'management_safety',
    ];
    const pillarAverages = {} as Record<OscePillarKey, number>;
    for (const key of pillars) {
      const sum = attempts.reduce((acc, a) => acc + (a.pillarScores[key] ?? 0), 0);
      pillarAverages[key] = Math.round(sum / attempts.length);
    }

    const recentMistakes = attempts
      .flatMap((a) =>
        a.missedQuestionPrompts.map((m) => ({
          scenarioTitle: a.scenarioTitle,
          specialty: a.specialty,
          ...m,
        }))
      )
      .slice(0, 15);

    return {
      totalAttempts: attempts.length,
      averagePct: Math.round(totalPct / attempts.length),
      pillarAverages,
      recentMistakes,
    };
  }, [attempts]);

  return {
    attempts,
    summary,
    recordAttempt,
    clearHistory,
  };
}
