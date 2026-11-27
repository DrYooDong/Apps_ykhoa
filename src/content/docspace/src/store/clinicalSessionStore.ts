/**
 * DocSpace v2 — Offline Multi-Case Session Store (Zero-Backend, Auto-Persist)
 * Quản lý tối đa 10 hồ sơ bệnh án / bài tập đang mở song song, tự động lưu cục bộ để F5 không mất dữ liệu.
 */

import { useCallback, useEffect, useState } from 'react';
import { createBlankSession } from '../engines/soapAdapters.ts';
import { ClinicalCaseSession, ProgressiveRevealStage } from '../schemas/docspaceV2.ts';

const STORAGE_KEY = 'docspace_v2_sessions_v1';
const ACTIVE_ID_KEY = 'docspace_v2_active_session_id_v1';
const MAX_SESSIONS = 10;

function loadInitialSessions(): ClinicalCaseSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, MAX_SESSIONS);
      }
    }
  } catch {
    // Fallback to blank session if storage unavailable
  }
  return [createBlankSession('Ca luyện tập #1')];
}

function loadActiveId(sessions: ClinicalCaseSession[]): string {
  try {
    const saved = localStorage.getItem(ACTIVE_ID_KEY);
    if (saved && sessions.some((s) => s.id === saved)) return saved;
  } catch {
    // ignore
  }
  return sessions[0].id;
}

export function scrubSessionPhi(session: ClinicalCaseSession): ClinicalCaseSession {
  const maskText = (input: string) =>
    input
      .replace(/(?:họ\s*(?:và)?\s*tên|bệnh\s*nhân|bn)\s*[:\-]\s*[^\n,;.]{2,40}/gi, 'BN: [ĐÃ ẨN DANH]')
      .replace(/\b0\d{9,10}\b/g, '[SĐT ĐÃ ẨN]')
      .replace(/\b\d{9,12}\b/g, (m) => (m.length >= 9 ? '[MÃ ĐỊNH DANH ĐÃ ẨN]' : m));

  return {
    ...session,
    form: {
      ...session.form,
      lyDo: maskText(session.form.lyDo),
      text: {
        cn: maskText(session.form.text.cn),
        tt: maskText(session.form.text.tt),
        tc: maskText(session.form.text.tc),
        cls: maskText(session.form.text.cls),
      },
    },
    learnerNotes: maskText(session.learnerNotes),
  };
}

export function useClinicalSessionStore() {
  const [sessions, setSessions] = useState<ClinicalCaseSession[]>(loadInitialSessions);
  const [activeId, setActiveId] = useState<string>(() => loadActiveId(loadInitialSessions()));

  // Sync activeId if sessions change
  const activeSession = sessions.find((s) => s.id === activeId) ?? sessions[0];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      if (activeSession?.id) {
        localStorage.setItem(ACTIVE_ID_KEY, activeSession.id);
      }
    } catch {
      // Ignore quota / file:/// storage errors silently
    }
  }, [sessions, activeSession?.id]);

  const updateActiveSession = useCallback(
    (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => {
      setSessions((prevList) =>
        prevList.map((s) =>
          s.id === activeSession.id
            ? { ...updater(s), updatedAt: new Date().toISOString() }
            : s
        )
      );
    },
    [activeSession.id]
  );

  const openOrAddSession = useCallback((newSession: ClinicalCaseSession) => {
    setSessions((prev) => {
      // Nếu mở lại đúng 1 ca SOAP đang có tab thì kích hoạt luôn tab đó
      if (newSession.sourceSoapId) {
        const existing = prev.find((s) => s.sourceSoapId === newSession.sourceSoapId);
        if (existing) {
          setActiveId(existing.id);
          return prev;
        }
      }
      const next = [newSession, ...prev].slice(0, MAX_SESSIONS);
      setActiveId(newSession.id);
      return next;
    });
  }, []);

  const createNewTab = useCallback(() => {
    const fresh = createBlankSession(`Ca mới #${sessions.length + 1}`);
    openOrAddSession(fresh);
  }, [sessions.length, openOrAddSession]);

  const closeTab = useCallback(
    (sessionId: string) => {
      setSessions((prev) => {
        const remaining = prev.filter((s) => s.id !== sessionId);
        if (remaining.length === 0) {
          const fallback = createBlankSession('Ca luyện tập #1');
          setActiveId(fallback.id);
          return [fallback];
        }
        if (activeId === sessionId) {
          setActiveId(remaining[0].id);
        }
        return remaining;
      });
    },
    [activeId]
  );

  const setRevealStage = useCallback(
    (stage: ProgressiveRevealStage) => {
      updateActiveSession((s) => ({ ...s, revealStage: stage }));
    },
    [updateActiveSession]
  );

  const resetActiveSession = useCallback(() => {
    const fresh = createBlankSession(activeSession.title.startsWith('Ca') ? activeSession.title : 'Ca mới');
    setSessions((prev) =>
      prev.map((s) => (s.id === activeSession.id ? { ...fresh, id: s.id } : s))
    );
  }, [activeSession.id, activeSession.title]);

  const exportActiveSessionJson = useCallback(
    (anonymizePhi = true): string => {
      const target = anonymizePhi ? scrubSessionPhi(activeSession) : activeSession;
      return JSON.stringify(
        {
          schemaVersion: 'docspace-session-v2',
          exportedAt: new Date().toISOString(),
          anonymized: anonymizePhi,
          session: target,
        },
        null,
        2
      );
    },
    [activeSession]
  );

  const importSessionJson = useCallback(
    (rawJson: string): { ok: boolean; error?: string } => {
      try {
        const parsed = JSON.parse(rawJson);
        const incoming: ClinicalCaseSession | undefined =
          parsed?.session?.form ? parsed.session : parsed?.form ? parsed : undefined;
        if (!incoming) {
          return { ok: false, error: 'Định dạng file JSON không phải hồ sơ DocSpace hợp lệ.' };
        }
        const normalized: ClinicalCaseSession = {
          ...createBlankSession(incoming.title || 'Ca nhập từ JSON'),
          ...incoming,
          id: `imported_${Date.now()}`,
          updatedAt: new Date().toISOString(),
        };
        openOrAddSession(normalized);
        return { ok: true };
      } catch (err) {
        return { ok: false, error: (err as Error).message };
      }
    },
    [openOrAddSession]
  );

  return {
    sessions,
    activeSession,
    setActiveId,
    updateActiveSession,
    openOrAddSession,
    createNewTab,
    closeTab,
    setRevealStage,
    resetActiveSession,
    exportActiveSessionJson,
    importSessionJson,
  };
}
