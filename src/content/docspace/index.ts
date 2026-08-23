/**
 * DocSpace — Module Entry Point
 * Đăng ký routes #/docspace/* vào CliniRouter và boot toàn bộ module
 */

import { router } from '../../core/router';
import {
  getActiveProfile, getAllProfiles, createProfile, setActiveProfile,
  deleteProfile,
  exportProfile, importProfile, exportProfileToFHIR, importProfileFromFHIR,
  getProfileSnapshot, safeStorageGet, safeStorageRemove
} from './storage';
import {
  renderProfileSelector, renderDashboard, renderSidebar,
  DSP_NAV_ITEMS, renderFeatureUnavailable, getInitials
} from './docspace-view';
import { renderSBARView, mountSBARController } from './features/sbar-view';
import { renderSoapView, mountSoapController } from './features/soap-view';
import { renderOnCallView, mountOnCallController } from './features/oncall-view';
import { renderQuickLinksView, mountQuickLinksController } from './features/quick-links-view';
import { renderPatientDemographicsView, bindPatientDemographicsEvents } from './features/patient-demographics-view';
import { renderChronicCareView, mountChronicCareController } from './features/chronic-care-view';

import { renderNotepadView, mountNotepadController } from './features/notepad-view';
import { renderProtocolView, mountProtocolController } from './features/protocol-view';
import { renderLivingProtocolView, mountLivingProtocolController } from './features/living-protocol-view';
import { renderStudiosView, mountStudiosController } from './features/studios-view';
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
import { docSpaceSettingsModal } from './features/docspace-settings-modal';
import { reactionChainDrawer } from './features/reaction-chain-drawer';

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

  // Settings & Utilities Modal Trigger
  document.getElementById('dspHeaderSettingsBtn')?.addEventListener('click', () => {
    docSpaceSettingsModal.open();
  });

  // Reaction Chain Engine Drawer
  document.getElementById('dspHeaderReactionChainBtn')?.addEventListener('click', () => {
    const activePatient = (window as any).dsp_current_soap_patient || null;
    if (activePatient) {
      reactionChainDrawer.open(activePatient);
    } else {
      reactionChainDrawer.open({
        id: 'desk_consultation',
        patientCode: 'BN-KHAM',
        bedNumber: 'PK-NgoạiTrú',
        fullName: 'Bàn Khám Lâm Sàng',
        age: 50,
        gender: 'nam',
        medicalRecordNo: 'HS-DESK',
        admissionDiagnosis: 'Khám tổng quát',
        currentDiagnosis: 'Khám tổng quát',
        isEmrEntered: false,
        soapStatus: 'chua_lam',
        dayOfIllness: 1,
        sNotes: '',
        oNotes: '',
        aAssessment: '',
        pPlan: '',
        clsOrders: [],
        clsResults: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
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

  // Mobile sidebar drawer handling with backdrop
  const sidebarEl = document.getElementById('dspSidebar');
  const backdropEl = document.getElementById('dspSidebarBackdrop');
  const mobileToggleBtn = document.getElementById('dspMobileSidebarBtn');
  const sidebarToggleBtn = document.getElementById('dspSidebarToggle');

  const openMobileSidebar = () => {
    sidebarEl?.classList.add('dsp-sidebar--mobile-open');
    backdropEl?.classList.add('is-active');
  };

  const closeMobileSidebar = () => {
    sidebarEl?.classList.remove('dsp-sidebar--mobile-open');
    backdropEl?.classList.remove('is-active');
  };

  mobileToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebarEl?.classList.contains('dsp-sidebar--mobile-open')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });

  sidebarToggleBtn?.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      closeMobileSidebar();
    }
  });

  backdropEl?.addEventListener('click', () => {
    closeMobileSidebar();
  });

  // Auto-close sidebar on mobile when navigation link clicked
  sidebarEl?.querySelectorAll('.dsp-nav-item')?.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      }
    });
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

// ─── Profile Selector Controller ─────────────────────────────────

function mountProfileSelectorController(): void {
  const container = document.getElementById('dspProfileSelector');
  if (!container) return;

  const idInput = document.getElementById('dspNewId') as HTMLInputElement | null;
  const nameInput = document.getElementById('dspNewName') as HTMLInputElement | null;
  const specialtyInput = document.getElementById('dspNewSpecialty') as HTMLInputElement | null;
  const liveAvatar = document.getElementById('dspLiveAvatarPreview') as HTMLElement | null;

  // Helper to generate a clean doctor ID slug from name
  const generateDoctorSlug = (name: string): string => {
    if (!name) return '';
    const noAccents = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const clean = noAccents
      .replace(/^(BS\.|TS\.|GS\.|PGS\.|ThS\.|BSCK1\.|BSCK2\.|BS\s*CK[12]\.?)\s*/i, '')
      .trim()
      .replace(/[^a-zA-Z0-9]/g, '');
    return clean ? `BS_${clean}` : '';
  };

  // 1. Tab Switching (when profiles exist)
  const btnTabProfiles = document.getElementById('btnTabProfiles');
  const btnTabCreate = document.getElementById('btnTabCreate');
  const btnSwitchToCreate = document.getElementById('btnSwitchToCreate');
  const paneProfiles = document.getElementById('paneProfiles');
  const paneCreate = document.getElementById('paneCreateProfile');

  const switchTab = (tab: 'profiles' | 'create') => {
    if (tab === 'profiles') {
      btnTabProfiles?.classList.add('active');
      btnTabCreate?.classList.remove('active');
      paneProfiles?.classList.add('dsp-tab-pane--active');
      if (paneProfiles) paneProfiles.style.display = '';
      paneCreate?.classList.remove('dsp-tab-pane--active');
      if (paneCreate) paneCreate.style.display = 'none';
    } else {
      btnTabCreate?.classList.add('active');
      btnTabProfiles?.classList.remove('active');
      paneCreate?.classList.add('dsp-tab-pane--active');
      if (paneCreate) paneCreate.style.display = '';
      paneProfiles?.classList.remove('dsp-tab-pane--active');
      if (paneProfiles) paneProfiles.style.display = 'none';
      nameInput?.focus();
    }
  };

  btnTabProfiles?.addEventListener('click', () => switchTab('profiles'));
  btnTabCreate?.addEventListener('click', () => switchTab('create'));
  btnSwitchToCreate?.addEventListener('click', () => switchTab('create'));

  // 2. Select or Delete existing profile
  container.addEventListener('click', async (e) => {
    const target = e.target as HTMLElement;

    // Check if delete profile button was clicked
    const delBtn = target.closest('[data-delete-profile-id]') as HTMLElement | null;
    if (delBtn) {
      e.stopPropagation();
      e.preventDefault();
      const profileId = delBtn.getAttribute('data-delete-profile-id') || '';
      const profileName = delBtn.getAttribute('data-profile-name') || profileId;

      const confirmed = window.confirm(`❓ Bạn có chắc chắn muốn xóa hồ sơ "${profileName}" (${profileId}) khỏi trình duyệt?\n\nToàn bộ dữ liệu bệnh án và cài đặt của hồ sơ này sẽ được giải phóng an toàn.`);
      if (confirmed) {
        deleteProfile(profileId);
        // Re-render profile selector
        await mountDocSpace(renderProfileSelector());
        mountProfileSelectorController();
      }
      return;
    }

    // Check if profile card was clicked to enter workspace
    const profileBtn = target.closest('[data-profile-id]') as HTMLElement | null;
    if (profileBtn) {
      const id = profileBtn.getAttribute('data-profile-id') || '';
      setActiveProfile(id);
      window.location.hash = '#/docspace';
      return;
    }

    // Check if starter preset chip was clicked
    const presetChip = target.closest('[data-preset-id]') as HTMLElement | null;
    if (presetChip) {
      const presetId = presetChip.getAttribute('data-preset-id') || '';
      const presetName = presetChip.getAttribute('data-preset-name') || '';
      const presetSpec = presetChip.getAttribute('data-preset-spec') || '';

      if (nameInput) nameInput.value = presetName;
      if (idInput) idInput.value = presetId;
      if (specialtyInput) specialtyInput.value = presetSpec;
      if (liveAvatar) liveAvatar.textContent = getInitials(presetName);

      // Scroll to submit button and highlight
      const submitBtn = document.getElementById('dspCreateBtn');
      submitBtn?.focus();
      return;
    }

    // Check if specialty chip was clicked
    const specChip = target.closest('[data-spec-val]') as HTMLElement | null;
    if (specChip) {
      const specVal = specChip.getAttribute('data-spec-val') || '';
      if (specialtyInput) {
        specialtyInput.value = specVal;
        specialtyInput.focus();
      }
      return;
    }
  });

  // 3. Realtime Avatar Preview & Auto ID generation on Name input
  nameInput?.addEventListener('input', () => {
    const val = nameInput.value.trim();
    if (liveAvatar) {
      liveAvatar.textContent = val ? getInitials(val) : 'BS';
    }
  });

  // 4. Auto-ID Generator Button
  document.getElementById('dspBtnAutoId')?.addEventListener('click', () => {
    const nameVal = nameInput?.value.trim() || '';
    if (!nameVal) {
      nameInput?.focus();
      return;
    }
    const autoSlug = generateDoctorSlug(nameVal);
    if (idInput && autoSlug) {
      idInput.value = autoSlug;
      idInput.focus();
    }
  });

  // 5. Create new profile form submission
  document.getElementById('dspCreateProfileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idInput?.value.trim() || '';
    const name = nameInput?.value.trim() || '';
    const specialty = specialtyInput?.value.trim() || '';

    if (!id || !name) {
      alert('Vui lòng nhập đầy đủ Họ tên và ID hồ sơ Bác sĩ.');
      if (!name) nameInput?.focus();
      else if (!id) idInput?.focus();
      return;
    }

    const existing = getAllProfiles().find(p => p.id === id);
    if (existing) {
      alert(`ID "${id}" đã tồn tại trên trình duyệt này. Vui lòng chọn ID khác hoặc chọn đăng nhập hồ sơ đó.`);
      idInput?.focus();
      return;
    }

    createProfile(id, name, specialty || undefined);
    window.location.hash = '#/docspace';
  });

  // 6. Import from JSON file
  document.getElementById('dspImportFile')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const profile = await importProfile(file);
      alert(`✅ Đã nạp thành công hồ sơ: ${profile.displayName}`);
      window.location.hash = '#/docspace';
    } catch (err: any) {
      alert(`❌ Lỗi nhập file: ${err.message}`);
    }
  });

  // 7. Import from FHIR file
  document.getElementById('dspImportFhirFile')?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      await importProfileFromFHIR(file);
      alert(`✅ Đã nạp dữ liệu chuẩn HL7 FHIR R4 thành công!`);
      window.location.hash = '#/docspace';
    } catch (err: any) {
      alert(`❌ Lỗi nhập chuẩn FHIR: ${err.message}`);
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
  document.getElementById('dspSidebarSettingsBtn')?.addEventListener('click', () => {
    docSpaceSettingsModal.open();
  });

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

  // Chronic Disease & Outpatient Care
  router.register('/docspace/chronic-care', 'DocSpace — Quản lý Bệnh Mạn Tính & Ngoại Trú', () => {
    requireProfile(async (pid) => {
      const selectedPatientId = new URLSearchParams(window.location.hash.split('?')[1] || '').get('patient') || undefined;
      await mountDocSpace(await renderChronicCareView(pid, selectedPatientId));
      mountChronicCareController(pid);
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

  // Phase 1: Clinical Studios Lab (100% Pure TypeScript)
  router.register('/docspace/studios', 'DocSpace — Clinical Studios Lab (ABG, ECG, Electrolyte, Renal, Cardio)', () => {
    requireProfile(async (pid) => {
      const tabParam = (new URLSearchParams(window.location.hash.split('?')[1] || '').get('tab') || 'abg') as any;
      await mountDocSpace(await renderStudiosView(pid, tabParam));
      mountStudiosController(pid);
      mountSidebarFooterControls(pid);
    });
  });

  // Phase 2: Kho Phác Đồ Điều Trị Toàn Năng (Master Protocol Vault)
  router.register('/docspace/protocol', 'DocSpace — Kho Phác Đồ Điều Trị Lâm Sàng Toàn Năng', () => {
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
