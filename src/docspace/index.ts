/**
 * DocSpace — Module Entry Point
 * Đăng ký routes #/docspace/* vào CliniRouter và boot toàn bộ module
 */

import { router } from '../core/router';
import {
  getActiveProfile, getAllProfiles, createProfile, setActiveProfile,
  exportProfile, importProfile
} from './storage';
import {
  renderProfileSelector, renderDashboard, renderSidebar,
  DSP_NAV_ITEMS, renderFeatureUnavailable
} from './docspace-view';
import { renderSBARView, mountSBARController } from './features/sbar-view';
import { renderSoapView, mountSoapController } from './features/soap-view';
import { renderOnCallView, mountOnCallController } from './features/oncall-view';
import { renderCaseLoggerView, mountCaseLoggerController } from './features/case-logger-view';
import { renderQuickLinksView, mountQuickLinksController } from './features/quick-links-view';

import { renderNotepadView, mountNotepadController } from './features/notepad-view';
import { renderDrugJournalView, mountDrugJournalController } from './features/drug-journal-view';
import { renderProtocolView, mountProtocolController } from './features/protocol-view';
import { renderLivingProtocolView, mountLivingProtocolController } from './features/living-protocol-view';
import { renderSimulationView, mountSimulationController } from './features/simulation-view';
import { initGlobalQuickSaveHook } from './features/quick-save';
import { renderAISettings } from './features/ai-settings-view';
import { loadRAGIndex } from './ai/rag-engine';

// ─── Mount helper ─────────────────────────────────────────────────

function mountDocSpace(html: string): void {
  const app = document.getElementById('app');
  const main = document.getElementById('mainContent');
  if (main) main.style.display = 'none';
  if (app) {
    app.style.display = 'block';
    app.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ─── Guard: Require profile ───────────────────────────────────────

function requireProfile(cb: (profileId: string) => void): void {
  const profile = getActiveProfile();
  if (!profile) {
    mountDocSpace(renderProfileSelector());
    mountProfileSelectorController();
  } else {
    cb(profile.id);
  }
}

// ─── Profile Selector Controller ─────────────────────────────────

function mountProfileSelectorController(): void {
  // Select existing profile
  document.getElementById('dspProfileSelector')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-profile-id]') as HTMLElement;
    if (!btn) return;
    const id = btn.getAttribute('data-profile-id') || '';
    setActiveProfile(id);
    window.location.hash = '#/docspace';
  });

  // Create new profile form
  document.getElementById('dspCreateProfileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = (document.getElementById('dspNewId') as HTMLInputElement).value.trim();
    const name = (document.getElementById('dspNewName') as HTMLInputElement).value.trim();
    const specialty = (document.getElementById('dspNewSpecialty') as HTMLInputElement).value.trim();

    if (!id || !name) return;

    const existing = getAllProfiles().find(p => p.id === id);
    if (existing) {
      alert(`ID "${id}" đã tồn tại. Chọn ID khác hoặc đăng nhập vào hồ sơ đó.`);
      return;
    }

    createProfile(id, name, specialty || undefined);
    window.location.hash = '#/docspace';
  });

  // Import from file
  document.getElementById('dspImportFile')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const profile = await importProfile(file);
      alert(`✅ Đã nhập hồ sơ: ${profile.displayName}`);
      window.location.hash = '#/docspace';
    } catch (err: any) {
      alert(`❌ Lỗi: ${err.message}`);
    }
  });
}

// ─── Dashboard Controller ─────────────────────────────────────────

function mountDashboardController(profileId: string): void {
  document.getElementById('dspExportBtn')?.addEventListener('click', () => exportProfile(profileId));
  document.getElementById('dspSwitchProfileBtn')?.addEventListener('click', () => {
    localStorage.removeItem('dsp_active_profile');
    window.location.hash = '#/docspace';
  });
  mountSidebarFooterControls(profileId);
}

// ─── Shared Sidebar Controls ──────────────────────────────────────

function mountSidebarFooterControls(profileId: string): void {
  document.getElementById('dspSidebarExport')?.addEventListener('click', () => exportProfile(profileId));
  document.getElementById('dspSidebarSwitch')?.addEventListener('click', () => {
    localStorage.removeItem('dsp_active_profile');
    window.location.hash = '#/docspace';
  });
  document.getElementById('dspSidebarToggle')?.addEventListener('click', () => {
    document.getElementById('dspSidebar')?.classList.toggle('dsp-sidebar--collapsed');
  });
}

// ─── Route Registration ───────────────────────────────────────────

export function initDocSpaceRoutes(): void {

  // Boot Global Quick-Save Hook
  initGlobalQuickSaveHook();

  // Export Reminder on Window Close
  window.addEventListener('beforeunload', () => {
    const profile = getActiveProfile();
    if (!profile) return;
    const lastExport = localStorage.getItem(`dsp_last_export_${profile.id}`);
    const daysSince = lastExport
      ? (Date.now() - new Date(lastExport).getTime()) / 86400000
      : Infinity;
    if (daysSince > 3) {
      console.warn(`[DocSpace] Chưa sao lưu dữ liệu trong ${Math.floor(daysSince)} ngày. Bác sĩ nhớ export nhé!`);
    }
  });

  // Hub / Dashboard
  router.register('/docspace', 'DocSpace — Không gian Riêng', () => {
    requireProfile(async (pid) => {
      const profile = getActiveProfile()!;
      mountDocSpace(await renderDashboard(profile));
      mountDashboardController(pid);
    });
  });

  // SOAP Ward Notebook
  router.register('/docspace/soap', 'DocSpace — Sổ Tay Bệnh Phòng SOAP Digital', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderSoapView(pid, editId));
      mountSoapController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // SBAR
  router.register('/docspace/sbar', 'DocSpace — SBAR', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderSBARView(pid, editId));
      mountSBARController(pid);
      mountSidebarFooterControls(pid);
      loadRAGIndex(); // Load index in background
    });
  });

  // On-Call (Checklist công việc)
  router.register('/docspace/oncall', 'DocSpace — Checklist công việc', () => {
    requireProfile(async (pid) => {
      mountDocSpace(await renderOnCallView(pid));
      mountOnCallController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Case Logger
  router.register('/docspace/cases', 'DocSpace — Ca Bệnh', () => {
    requireProfile(async (pid) => {
      mountDocSpace(await renderCaseLoggerView(pid));
      mountCaseLoggerController(pid);
      mountSidebarFooterControls(pid);
      loadRAGIndex(); // Load index in background
    });
  });

  // Quick Links
  router.register('/docspace/links', 'DocSpace — Liên kết Nhanh', () => {
    requireProfile(async (pid) => {
      mountDocSpace(await renderQuickLinksView(pid));
      mountQuickLinksController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Personal Notepad
  router.register('/docspace/notes', 'DocSpace — Ghi Chú Cá Nhân', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderNotepadView(pid, editId));
      mountNotepadController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Drug Interaction Journal
  router.register('/docspace/drugs', 'DocSpace — Nhật Ký Thuốc', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderDrugJournalView(pid, editId));
      mountDrugJournalController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Personal Protocol
  router.register('/docspace/protocol', 'DocSpace — Phác Đồ Cá Nhân', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderProtocolView(pid, editId));
      mountProtocolController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  router.register('/docspace/living-protocols', 'DocSpace — Phác Đồ Động', () => {
    requireProfile(async (pid) => {
      const profile = getActiveProfile();
      if (!profile?.aiSettings?.labModeEnabled) {
        mountDocSpace(renderFeatureUnavailable('Phác Đồ Động', 'lab'));
        return;
      }
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      mountDocSpace(await renderLivingProtocolView(pid, editId));
      mountLivingProtocolController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  router.register('/docspace/sandbox', 'DocSpace — Sandbox Mô phỏng', () => {
    requireProfile(async (pid) => {
      const profile = getActiveProfile();
      if (!profile?.aiSettings?.labModeEnabled) {
        mountDocSpace(renderFeatureUnavailable('Sandbox Mô Phỏng', 'lab'));
        return;
      }
      const sessionId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('session') || undefined;
      mountDocSpace(await renderSimulationView(pid, sessionId));
      mountSimulationController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // AI Settings
  router.register('/docspace/ai-settings', 'DocSpace — Cấu hình AI', () => {
    requireProfile(() => {
      mountDocSpace('<div id="ai-settings-placeholder"></div>'); // Placeholder will be replaced by renderAISettings
      renderAISettings();
    });
  });
}
