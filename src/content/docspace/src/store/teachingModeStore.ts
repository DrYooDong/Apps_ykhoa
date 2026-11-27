/**
 * DocSpace v2 — Teaching / Projector Mode Store
 * Quản lý trạng thái trình chiếu giảng dạy lâm sàng: cỡ chữ máy chiếu, che/mở cột S-O-A-P, đồng hồ thảo luận
 */

import { useCallback, useEffect, useState } from 'react';
import { TeachingModeState } from '../schemas/docspaceV2.ts';

const INITIAL_TEACHING_STATE: TeachingModeState = {
  projectorFontScale: 'large',
  maskedColumns: {
    s: false,
    o: false,
    a: true,
    p: true,
  },
  timerSecondsLeft: 300,
  timerRunning: false,
  timerPresetMinutes: 5,
};

export function useTeachingModeStore() {
  const [state, setState] = useState<TeachingModeState>(INITIAL_TEACHING_STATE);

  useEffect(() => {
    if (!state.timerRunning) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        if (prev.timerSecondsLeft <= 1) {
          return { ...prev, timerSecondsLeft: 0, timerRunning: false };
        }
        return { ...prev, timerSecondsLeft: prev.timerSecondsLeft - 1 };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [state.timerRunning]);

  const setFontScale = useCallback((scale: TeachingModeState['projectorFontScale']) => {
    setState((prev) => ({ ...prev, projectorFontScale: scale }));
  }, []);

  const toggleMaskColumn = useCallback((col: keyof TeachingModeState['maskedColumns']) => {
    setState((prev) => ({
      ...prev,
      maskedColumns: {
        ...prev.maskedColumns,
        [col]: !prev.maskedColumns[col],
      },
    }));
  }, []);

  const revealAllColumns = useCallback(() => {
    setState((prev) => ({
      ...prev,
      maskedColumns: { s: false, o: false, a: false, p: false },
    }));
  }, []);

  const resetMasksForTeaching = useCallback(() => {
    setState((prev) => ({
      ...prev,
      maskedColumns: { s: false, o: false, a: true, p: true },
    }));
  }, []);

  const setTimerPreset = useCallback((minutes: number) => {
    setState((prev) => ({
      ...prev,
      timerPresetMinutes: minutes,
      timerSecondsLeft: minutes * 60,
      timerRunning: false,
    }));
  }, []);

  const toggleTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      timerRunning: prev.timerSecondsLeft > 0 ? !prev.timerRunning : false,
    }));
  }, []);

  return {
    teachingState: state,
    setFontScale,
    toggleMaskColumn,
    revealAllColumns,
    resetMasksForTeaching,
    setTimerPreset,
    toggleTimer,
  };
}
