/**
 * DocSpace — Module Entry Point
 * Đăng ký routes #/docspace/* vào CliniRouter và boot toàn bộ module
 */

import { router } from '../../core/router';
import {
  getActiveProfile, getAllProfiles, createProfile, setActiveProfile,
  exportProfile, importProfile, exportProfileToFHIR, importProfileFromFHIR,
  getProfileSnapshot, safeStorageGet, safeStorageRemove
} from './storage';
import {
  renderProfileSelector, renderDashboard, renderSidebar,
  DSP_NAV_ITEMS, renderFeatureUnavailable
} from './docspace-view';
import { renderSBARView, mountSBARController } from './features/sbar-view';
import { renderSoapView, mountSoapController } from './features/soap-view';
import { renderOnCallView, mountOnCallController } from './features/oncall-view';
import { renderQuickLinksView, mountQuickLinksController } from './features/quick-links-view';
import { renderPatientDemographicsView, bindPatientDemographicsEvents } from './features/patient-demographics-view';

import { renderNotepadView, mountNotepadController } from './features/notepad-view';
import { renderProtocolView, mountProtocolController } from './features/protocol-view';
import { renderLivingProtocolView, mountLivingProtocolController } from './features/living-protocol-view';
import { renderSimulationView, mountSimulationController } from './features/simulation-view';
import { renderSyncModal, mountSyncController } from './features/p2p-sync-view';
import { renderDependencyMapView, mountDependencyMapController } from './features/dependency-map-view';
import { initGlobalQuickSaveHook } from './features/quick-save';
import { renderAISettingsView, mountAISettingsController } from './features/ai-settings-view';
import { renderSyncSettingsView, mountSyncSettingsController } from './features/sync-settings-view';
import { renderInsightsView, mountInsightsController } from './features/insights-view';
import { loadRAGIndex } from './ai/rag-engine';
import { clinicalCommandBar } from './features/command-bar';
import { quickReferenceDrawer } from './features/quick-reference-drawer';
import { drugIntelligencePanel } from './features/drug-intelligence-panel';
import { calculatorPicker } from './features/calculator-picker';

// ─── Mount helper ─────────────────────────────────────────────────

async function mountDocSpace(html: string): Promise<void> {
  const app = document.getElementById('app');
  const main = document.getElementById('mainContent');
  if (main) main.style.display = 'none';

  // Ẩn Floating Action Dock của trang chủ khi đang ở trong DocSpace
  const dock = document.querySelector('.floating-action-dock') as HTMLElement;
  if (dock) dock.style.display = 'none';
  document.body.classList.add('dsp-active');

  if (app) {
    app.style.display = 'block';
    app.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Đảm bảo trình duyệt parse & paint DOM xong hoàn toàn trước khi controllers bind events
    await new Promise<void>(resolve => {
      requestAnimationFrame(() => resolve());
    });
    mountGlobalDocSpaceControls();
  }
}

function mountGlobalDocSpaceControls(): void {
  // Command Bar Triggers
  document.getElementById('dspHeaderSearchBox')?.addEventListener('click', () => {
    clinicalCommandBar.open();
  });
  document.getElementById('dspHeaderSearchInput')?.addEventListener('click', () => {
    clinicalCommandBar.open();
  });

  // Quick Reference Drawer
  document.getElementById('dspHeaderQuickRefBtn')?.addEventListener('click', () => {
    quickReferenceDrawer.open();
  });

  // Drug Intelligence Panel
  document.getElementById('dspHeaderDrugIntelBtn')?.addEventListener('click', () => {
    drugIntelligencePanel.open();
  });

  // Tools Calculator Picker
  document.getElementById('dspHeaderToolsBtn')?.addEventListener('click', () => {
    calculatorPicker.open();
  });

  // Mobile sidebar
  document.getElementById('dspMobileSidebarBtn')?.addEventListener('click', () => {
    document.getElementById('dspSidebar')?.classList.toggle('dsp-sidebar--mobile-open');
  });
}

// ─── Guard: Require profile ───────────────────────────────────────

async function requireProfile(cb: (profileId: string) => Promise<void> | void): Promise<void> {
  const profile = getActiveProfile();
  if (!profile) {
    await mountDocSpace(renderProfileSelector());
    mountProfileSelectorController();
  } else {
    await cb(profile.id);
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

  // Import from FHIR file
  document.getElementById('dspImportFhirFile')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      await importProfileFromFHIR(file);
      alert(`✅ Đã nạp dữ liệu từ file FHIR thành công!`);
      window.location.hash = '#/docspace';
    } catch (err: any) {
      alert(`❌ Lỗi nhập FHIR: ${err.message}`);
    }
  });
}

// ─── Dashboard Controller ─────────────────────────────────────────

function mountDashboardController(profileId: string): void {
  document.getElementById('dspExportBtn')?.addEventListener('click', () => exportProfile(profileId));
  document.getElementById('dspExportFhirBtn')?.addEventListener('click', () => exportProfileToFHIR(profileId));
  document.getElementById('dspSwitchProfileBtn')?.addEventListener('click', () => {
    safeStorageRemove('dsp_active_profile');
    window.location.hash = '#/docspace';
  });
  mountSidebarFooterControls(profileId);
}

// ─── Shared Sidebar Controls ──────────────────────────────────────

function mountSidebarFooterControls(profileId: string): void {
  document.getElementById('dspSidebarExport')?.addEventListener('click', () => exportProfile(profileId));
  document.getElementById('dspSidebarExportFhir')?.addEventListener('click', () => exportProfileToFHIR(profileId));
  document.getElementById('dspSidebarSwitch')?.addEventListener('click', () => {
    safeStorageRemove('dsp_active_profile');
    window.location.hash = '#/docspace';
  });
  
  document.getElementById('dspSidebarSync')?.addEventListener('click', () => {
    if (!document.getElementById('dspSyncModal')) {
      document.body.insertAdjacentHTML('beforeend', renderSyncModal());
      mountSyncController(async () => await getProfileSnapshot(profileId) as any);
    } else {
      (document.getElementById('dspSyncModal') as HTMLElement).style.display = 'flex';
    }
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
    const lastExport = safeStorageGet(`dsp_last_export_${profile.id}`, '');
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
      await mountDocSpace(await renderDashboard(profile));
      mountDashboardController(pid);
    });
  });

  // Patient Demographics (OpenEMR Integration)
  router.register('/docspace/patients', 'DocSpace — Quản lý Bệnh nhân', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(await renderPatientDemographicsView(pid));
      bindPatientDemographicsEvents();
      mountSidebarFooterControls(pid);
    });
  });

  // SOAP Ward Notebook
  router.register('/docspace/soap', 'DocSpace — Sổ Tay Bệnh Phòng SOAP Digital', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      await mountDocSpace(await renderSoapView(pid, editId));
      mountSoapController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // SBAR
  router.register('/docspace/sbar', 'DocSpace — SBAR', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      await mountDocSpace(await renderSBARView(pid, editId));
      mountSBARController(pid);
      mountSidebarFooterControls(pid);
      loadRAGIndex(); // Load index in background
    });
  });

  // On-Call (Checklist công việc)
  router.register('/docspace/oncall', 'DocSpace — Checklist công việc', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(await renderOnCallView(pid));
      mountOnCallController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Quick Links
  router.register('/docspace/links', 'DocSpace — Liên kết Nhanh', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(await renderQuickLinksView(pid));
      mountQuickLinksController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Personal Notepad
  router.register('/docspace/notes', 'DocSpace — Ghi Chú Cá Nhân', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      await mountDocSpace(await renderNotepadView(pid, editId));
      mountNotepadController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Personal Protocol
  router.register('/docspace/protocol', 'DocSpace — Phác Đồ Cá Nhân', () => {
    requireProfile(async (pid) => {
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      await mountDocSpace(await renderProtocolView(pid, editId));
      mountProtocolController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Dependency Map
  router.register('/docspace/dependency-map', 'DocSpace — Bản đồ Phụ thuộc (Core & Content)', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(await renderDependencyMapView(pid));
      mountDependencyMapController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  router.register('/docspace/living-protocols', 'DocSpace — Phác Đồ Động', () => {
    requireProfile(async (pid) => {
      const profile = getActiveProfile();
      if (!profile?.aiSettings?.labModeEnabled) {
        await mountDocSpace(renderFeatureUnavailable('Phác Đồ Động', 'lab'));
        return;
      }
      const editId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('edit') || undefined;
      await mountDocSpace(await renderLivingProtocolView(pid, editId));
      mountLivingProtocolController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  router.register('/docspace/sandbox', 'DocSpace — Sandbox Mô phỏng', () => {
    requireProfile(async (pid) => {
      const profile = getActiveProfile();
      if (!profile?.aiSettings?.labModeEnabled) {
        await mountDocSpace(renderFeatureUnavailable('Sandbox Mô Phỏng', 'lab'));
        return;
      }
      const sessionId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('session') || undefined;
      await mountDocSpace(await renderSimulationView(pid, sessionId));
      mountSimulationController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // AI Insights & Practice Analytics (Cluster 5)
  router.register('/docspace/insights', 'DocSpace — AI Insights & Sức Khỏe Nghề Nghiệp', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(await renderInsightsView(pid));
      mountInsightsController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // AI Settings
  router.register('/docspace/ai-settings', 'DocSpace — Cấu hình AI', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(renderAISettingsView(pid));
      mountAISettingsController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Sync Settings (Đồng bộ Đa thiết bị)
  router.register('/docspace/sync-settings', 'DocSpace — Cấu hình Đồng bộ Đa thiết bị', () => {
    requireProfile(async (pid) => {
      await mountDocSpace(renderSyncSettingsView(pid));
      mountSyncSettingsController(pid);
      mountSidebarFooterControls(pid);
    });
  });
}
