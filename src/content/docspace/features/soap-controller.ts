/**
 * DocSpace — Sổ Tay Bệnh Phòng SOAP Digital Controller & Event Orchestrator
 * Path: src/content/docspace/features/soap-controller.ts
 */

/**
 * DocSpace — Sổ Tay Bệnh Phòng SOAP Digital
 * Quản lý diễn tiến bệnh phòng, Cận lâm sàng, Lịch sử theo Ngày, In Phiếu Theo Dõi & Đồng bộ Cloud Supabase
 */

import { 
  getAllSoapPatients, getSoapPatientById, saveSoapPatient, updateSoapPatient, deleteSoapPatient,
  getSoapSupabaseConfig, saveSoapSupabaseConfig, fetchAllSoapFromSupabase,
  addSoapDailyLog, switchSoapPatientDate, getProfile, getActiveProfile, saveSBAR, saveCase, getAllPatients,
  getChronicPatientById,
  safeStorageGet, safeStorageSet
} from '../storage';
import { SoapPatientRecord, SoapPrescriptionItem } from '../types';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { generateSOAPSuggestion, generateDischargeSummary } from '../ai/llm-client';
import { icdPicker } from './icd-picker';
import { ebmBridge } from './ebm-bridge-view';
import { KHO_GUIDELINES_STATIC } from '../../ebm/guidelines/js/kho-guidelines-registry';
import { CLINICAL_CASES } from '../../basic-medical/quiz/patho-quiz-data';
import { drugPicker } from './drug-picker';
import { drugIntelligencePanel } from './drug-intelligence-panel';
import { clinicalReasoningPanel } from './clinical-reasoning-panel';
import { quickReferenceDrawer } from './quick-reference-drawer';
import { calculatorPicker } from './calculator-picker';
import { labDiagnosticsHub } from './lab-diagnostics-hub';
import { reactionChainDrawer } from './reaction-chain-drawer';
import { renderProtocolQuickApplyBtn, renderSoapToProtocolBtn, initSoapAiBridgeEvents } from './ai-soap-features';
import { extractPICOFromSoap } from './pico-bridge';
import { 
  setMasterDate, 
  getMasterDate, 
  getDayOfWeekName, 
  renderRxItemsList, 
  renderEditSoapModalContent, 
  printWardTrackingSheet, 
  printSinglePrescription,
  ALERT_KEYWORDS
} from './soap-templates';

export function mountSoapController(profileId: string): void {
  // Master Date Select
  document.getElementById('masterDateSelect')?.addEventListener('change', (e) => {
    const newDate = (e.target as HTMLInputElement).value;
    if (newDate) {
      setMasterDate(newDate);
      window.location.hash = '#/docspace/soap';
    }
  });

  // Modal Print Selection
  const btnPrintAllSoap = document.getElementById('btnPrintAllSoap');
  const modalPrintOptions = document.getElementById('modalPrintOptions');
  const btnClosePrintModal = document.getElementById('btnClosePrintModal');
  const btnCancelPrintModal = document.getElementById('btnCancelPrintModal');
  const chkPrintSelectAll = document.getElementById('chkPrintSelectAll') as HTMLInputElement;

  if (btnPrintAllSoap && modalPrintOptions) {
    btnPrintAllSoap.addEventListener('click', () => {
      const patients = getAllSoapPatients(profileId);
      if (patients.length === 0) {
        alert('Chưa có bệnh nhân nào để in.');
        return;
      }
      modalPrintOptions.style.display = 'flex';
    });
  }

  [btnClosePrintModal, btnCancelPrintModal].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalPrintOptions) modalPrintOptions.style.display = 'none';
    });
  });

  chkPrintSelectAll?.addEventListener('change', (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    document.querySelectorAll<HTMLInputElement>('.js-print-patient-chk').forEach(chk => {
      chk.checked = isChecked;
    });
  });

  document.getElementById('btnConfirmPrintModal')?.addEventListener('click', () => {
    const selectedIds = Array.from(document.querySelectorAll<HTMLInputElement>('.js-print-patient-chk:checked')).map(c => c.value);
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 bệnh nhân để in.');
      return;
    }

    const allPatients = getAllSoapPatients(profileId);
    const selectedPatients = allPatients.filter(p => selectedIds.includes(p.id));

    if (modalPrintOptions) modalPrintOptions.style.display = 'none';
    printWardTrackingSheet(selectedPatients);
  });

  // Modal Nhận Bệnh
  const btnNewPatient = document.getElementById('btnNewPatient');
  const btnExistingPatient = document.getElementById('btnExistingPatient');
  const modalNewPatient = document.getElementById('modalNewPatient');
  const modalNewPatientTitle = document.getElementById('modalNewPatientTitle');
  const inputDayOfIllness = document.getElementById('npDayOfIllness') as HTMLInputElement;
  const btnCloseNewPatient = document.getElementById('btnCloseNewPatientModal');
  const btnCancelNewPatient = document.getElementById('btnCancelNewPatient');

  if (btnNewPatient && modalNewPatient) {
    btnNewPatient.addEventListener('click', () => {
      if (modalNewPatientTitle) modalNewPatientTitle.innerHTML = '<i class="fa-solid fa-user-plus"></i> Nhận Bệnh Mới Vào Khoa';
      if (inputDayOfIllness) inputDayOfIllness.value = '1';
      modalNewPatient.style.display = 'flex';
    });
  }

  if (btnExistingPatient && modalNewPatient) {
    btnExistingPatient.addEventListener('click', () => {
      if (modalNewPatientTitle) modalNewPatientTitle.innerHTML = '<i class="fa-solid fa-bed-pulse"></i> Thêm Bệnh Nội Trú (Đang nằm viện)';
      if (inputDayOfIllness) inputDayOfIllness.value = '2';
      modalNewPatient.style.display = 'flex';
    });
  }

  [btnCloseNewPatient, btnCancelNewPatient].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalNewPatient) modalNewPatient.style.display = 'none';
    });
  });

  // Handle demographic selection auto-fill
  document.getElementById('npDemographicId')?.addEventListener('change', (e) => {
    const select = e.target as HTMLSelectElement;
    const option = select.options[select.selectedIndex];
    if (option && option.value) {
      (document.getElementById('npCode') as HTMLInputElement).value = option.dataset.code || '';
      (document.getElementById('npName') as HTMLInputElement).value = option.dataset.name || '';
      (document.getElementById('npGender') as HTMLSelectElement).value = option.dataset.gender || 'nam';
      if (option.dataset.dob) {
        const dob = new Date(option.dataset.dob);
        const diffMs = Date.now() - dob.getTime();
        const ageDt = new Date(diffMs); 
        (document.getElementById('npAge') as HTMLInputElement).value = Math.abs(ageDt.getUTCFullYear() - 1970).toString();
      }
    } else {
      (document.getElementById('npCode') as HTMLInputElement).value = '';
      (document.getElementById('npName') as HTMLInputElement).value = '';
      (document.getElementById('npAge') as HTMLInputElement).value = '';
    }
  });

  // Modal Supabase Config
  const btnSupabaseModal = document.getElementById('btnSupabaseModal');
  const modalSupabase = document.getElementById('modalSupabase');
  const btnCloseSupabase = document.getElementById('btnCloseSupabaseModal');
  const btnCancelSupabase = document.getElementById('btnCancelSupabase');

  if (btnSupabaseModal && modalSupabase) {
    btnSupabaseModal.addEventListener('click', () => {
      modalSupabase.style.display = 'flex';
    });
  }

  [btnCloseSupabase, btnCancelSupabase].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalSupabase) modalSupabase.style.display = 'none';
    });
  });

  document.getElementById('formSupabase')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = (document.getElementById('sbUrl') as HTMLInputElement).value.trim();
    const key = (document.getElementById('sbKey') as HTMLInputElement).value.trim();
    saveSoapSupabaseConfig(url, key);

    const res = await fetchAllSoapFromSupabase(profileId);
    if (res.success) {
      alert(`✅ Đã kết nối Supabase thành công! Tải/Đồng bộ ${res.count} hồ sơ.`);
    } else {
      alert(`⚠️ Đã lưu cấu hình, nhưng chưa thể kết nối: ${res.error}`);
    }
    if (modalSupabase) modalSupabase.style.display = 'none';
    window.location.hash = '#/docspace/soap';
  });

  document.getElementById('btnSyncFromCloud')?.addEventListener('click', async () => {
    const res = await fetchAllSoapFromSupabase(profileId);
    if (res.success) {
      alert(`✅ Tải thành công ${res.count} dữ liệu bệnh nhân từ Supabase Cloud!`);
      window.location.hash = '#/docspace/soap';
    } else {
      alert(`❌ Lỗi tải dữ liệu: ${res.error}`);
    }
  });

  // Toggle Individual Row Collapse
  document.querySelectorAll('.js-toggle-row-collapse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.currentTarget as HTMLElement;
      const row = button.closest('.dsp-soap-row');
      if (row) {
        row.classList.toggle('is-collapsed');
        const icon = button.querySelector('i');
        if (icon) {
          if (row.classList.contains('is-collapsed')) {
            icon.className = 'fa-solid fa-chevron-down';
          } else {
            icon.className = 'fa-solid fa-chevron-up';
          }
        }
      }
    });
  });

  // Toggle All Rows Collapse
  let allCollapsed = false;
  document.getElementById('btnToggleCollapseAll')?.addEventListener('click', () => {
    allCollapsed = !allCollapsed;
    document.querySelectorAll('.dsp-soap-row').forEach(row => {
      if (allCollapsed) {
        row.classList.add('is-collapsed');
      } else {
        row.classList.remove('is-collapsed');
      }
      const icon = row.querySelector('.js-toggle-row-collapse i');
      if (icon) {
        icon.className = allCollapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
      }
    });

    const btnText = document.querySelector('#btnToggleCollapseAll span');
    if (btnText) {
      btnText.textContent = allCollapsed ? 'Mở rộng' : 'Thu gọn';
    }
  });

  // Switch Date Buttons
  document.querySelectorAll('.js-switch-date, .js-modal-switch-date').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      const date = (e.currentTarget as HTMLElement).getAttribute('data-date');
      if (id && date) {
        switchSoapPatientDate(profileId, id, date);
        const isModal = (e.currentTarget as HTMLElement).classList.contains('js-modal-switch-date');
        window.location.hash = isModal ? `#/docspace/soap?edit=${id}` : '#/docspace/soap';
      }
    });
  });

  // Add New Date Buttons
  const handleAddDate = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newDate = prompt('Nhập ngày diễn tiến mới (YYYY-MM-DD):', today);
    if (newDate) {
      addSoapDailyLog(profileId, id, newDate);
      window.location.hash = `#/docspace/soap?edit=${id}`;
    }
  };

  document.querySelectorAll('.js-add-date').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) handleAddDate(id);
    });
  });

  document.getElementById('btnModalAddDate')?.addEventListener('click', (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    if (id) handleAddDate(id);
  });

  // Submit Form Nhận Bệnh
  document.getElementById('formNewPatient')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = (document.getElementById('npCode') as HTMLInputElement).value.trim();
    const bed = (document.getElementById('npBed') as HTMLInputElement).value.trim();
    const name = (document.getElementById('npName') as HTMLInputElement).value.trim();
    const age = parseInt((document.getElementById('npAge') as HTMLInputElement).value, 10) || 0;
    const gender = (document.getElementById('npGender') as HTMLSelectElement).value as any;
    const medicalNo = (document.getElementById('npMedicalNo') as HTMLInputElement).value.trim();
    const diagnosisVal = (document.getElementById('npDiagnosis') as HTMLInputElement).value.trim();
    let icdCode = '';
    let icdLabel = diagnosisVal;
    if (diagnosisVal.includes(' - ')) {
      const parts = diagnosisVal.split(' - ');
      icdCode = (parts[0] || '').trim();
      icdLabel = parts.slice(1).join(' - ').trim();
    }
    const dayOfIllness = parseInt((document.getElementById('npDayOfIllness') as HTMLInputElement).value, 10) || 1;
    const demographicId = (document.getElementById('npDemographicId') as HTMLSelectElement)?.value || undefined;

    saveSoapPatient(profileId, {
      ...(demographicId ? { demographicId } : {}),
      patientCode: code,
      bedNumber: bed,
      fullName: name,
      age,
      gender,
      medicalRecordNo: medicalNo,
      admissionDiagnosis: diagnosisVal,
      currentDiagnosis: diagnosisVal,
      isEmrEntered: false,
      soapStatus: 'chua_lam',
      dayOfIllness: dayOfIllness,
      sNotes: '',
      oNotes: '',
      aAssessment: diagnosisVal,
      icd10Code: icdCode,
      icd10Label: icdLabel,
      pPlan: '',
      clsOrders: [],
      clsResults: [],
    });

    window.location.hash = '#/docspace/soap';
  });

  // Toggle EMR Status
  document.querySelectorAll('.js-toggle-emr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (!id) return;
      const p = getSoapPatientById(profileId, id);
      if (p) {
        updateSoapPatient(profileId, id, { isEmrEntered: !p.isEmrEntered });
        window.location.hash = '#/docspace/soap';
      }
    });
  });

  // Edit SOAP Button
  document.querySelectorAll('.js-edit-soap').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        window.location.hash = `#/docspace/soap?edit=${id}`;
      }
    });
  });

  // Print Single Prescription eRx Button
  document.querySelectorAll('.js-print-rx').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        const p = getSoapPatientById(profileId, id);
        if (p) {
          printSinglePrescription(p);
        }
      }
    });
  });

  // Close Edit SOAP Modal
  document.getElementById('btnCloseEditSoapModal')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/soap';
  });

  // Submit Edit SOAP Form
  document.getElementById('formEditSoap')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = (document.getElementById('esPatientId') as HTMLInputElement).value;
    const patientCode = (document.getElementById('esPatientCode') as HTMLInputElement)?.value.trim();
    const bedNumber = (document.getElementById('esBedNumber') as HTMLInputElement)?.value.trim();
    const fullName = (document.getElementById('esFullName') as HTMLInputElement)?.value.trim();
    const age = parseInt((document.getElementById('esAge') as HTMLInputElement)?.value, 10) || 0;
    const gender = ((document.getElementById('esGender') as HTMLSelectElement)?.value || 'nam') as any;
    const medicalRecordNo = (document.getElementById('esMedicalRecordNo') as HTMLInputElement)?.value.trim();
    const admissionDiagnosis = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim();

    const sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement).value.trim();
    const oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement).value.trim();
    const aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement).value.trim();
    const pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement).value.trim();
    const quickPaste = (document.getElementById('esClsQuickPaste') as HTMLTextAreaElement)?.value.trim();
    const clsOrdersText = (document.getElementById('esClsOrders') as HTMLTextAreaElement)?.value.trim();

    const p = getSoapPatientById(profileId, id);
    if (!p) return;

    let newOrders = [...(p.clsOrders || [])];
    if (clsOrdersText !== undefined) {
      const lines = clsOrdersText.split('\n').map(l => l.trim()).filter(Boolean);
      newOrders = lines.map(line => {
        const existing = p.clsOrders?.find(o => o.name === line);
        if (existing) return existing;
        return { id: Date.now().toString() + Math.random().toString(36).substring(7), name: line, isDone: false };
      });
    }

    const newResults = [...p.clsResults];
    if (quickPaste) {
      newResults.push({
        id: Date.now().toString(),
        text: quickPaste,
        alertLevel: ALERT_KEYWORDS.some(kw => quickPaste.toLowerCase().includes(kw)) ? 'high' : 'normal'
      });
    }

    // Collect Prescriptions from rxListContainer
    const rxRows = Array.from(document.querySelectorAll<HTMLElement>('#rxListContainer .rx-item-row'));
    const prescriptions: SoapPrescriptionItem[] = rxRows.map(row => {
      const name = row.querySelector<HTMLInputElement>('.js-rx-name')?.value.trim() || '';
      const dosage = row.querySelector<HTMLInputElement>('.js-rx-dosage')?.value.trim() || '';
      const route = row.querySelector<HTMLInputElement>('.js-rx-route')?.value.trim() || '';
      const frequency = row.querySelector<HTMLInputElement>('.js-rx-freq')?.value.trim() || '';
      const quantity = row.querySelector<HTMLInputElement>('.js-rx-qty')?.value.trim() || '';
      const instructions = row.querySelector<HTMLInputElement>('.js-rx-instr')?.value.trim() || '';
      return {
        id: row.dataset.id || Date.now().toString() + Math.random().toString(36).substring(7),
        name,
        dosage,
        route,
        frequency,
        quantity,
        instructions
      };
    }).filter(item => item.name);

    updateSoapPatient(profileId, id, {
      ...(patientCode ? { patientCode } : {}),
      ...(bedNumber ? { bedNumber } : {}),
      ...(fullName ? { fullName } : {}),
      ...(age !== undefined ? { age } : {}),
      ...(gender ? { gender } : {}),
      ...(medicalRecordNo !== undefined ? { medicalRecordNo } : {}),
      ...(admissionDiagnosis ? { admissionDiagnosis, currentDiagnosis: admissionDiagnosis } : {}),
      sNotes,
      oNotes,
      aAssessment,
      pPlan,
      prescriptions,
      soapStatus: 'da_lam',
      clsOrders: newOrders,
      clsResults: newResults
    });

    window.location.hash = '#/docspace/soap';
  });

  // Handle Remove Rx Item Button Event Delegation
  document.getElementById('rxListContainer')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('js-remove-rx')) {
      const row = target.closest('.rx-item-row');
      if (row) row.remove();
    }
  });

  // Handle Open Rx Picker Button
  document.getElementById('btnOpenRxPicker')?.addEventListener('click', () => {
    drugPicker.open(undefined, (drug) => {
      const container = document.getElementById('rxListContainer');
      if (container) {
        const brand = drug.brandNames && drug.brandNames.length > 0 ? ` (${drug.brandNames[0]})` : '';
        const name = drug.name + brand;
        const dosage = drug.dosage?.standardAdult || '';
        const newItem: SoapPrescriptionItem = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          name,
          dosage,
          route: 'Uống',
          frequency: '1v x 2/ngày',
          quantity: '10 viên',
          instructions: 'Uống sau ăn'
        };

        const div = document.createElement('div');
        div.className = 'rx-item-row';
        div.dataset.id = newItem.id;
        div.innerHTML = `
          <div>
            <input type="text" class="js-rx-name dsp-input" value="${escapeHtml(newItem.name)}" style="font-size:11px; padding:2px 4px; font-weight:bold; width:100%;" />
            <input type="text" class="js-rx-dosage dsp-input" value="${escapeHtml(newItem.dosage)}" placeholder="Hàm lượng" style="font-size:10px; padding:2px 4px; color:var(--color-text-muted); width:100%; margin-top:2px;" />
          </div>
          <input type="text" class="js-rx-route dsp-input" value="${escapeHtml(newItem.route)}" placeholder="Đường dùng" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-freq dsp-input" value="${escapeHtml(newItem.frequency)}" placeholder="Tần suất" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-qty dsp-input" value="${escapeHtml(newItem.quantity)}" placeholder="Số lượng" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-instr dsp-input" value="${escapeHtml(newItem.instructions)}" placeholder="Lời dặn" style="font-size:11px; padding:2px 4px;" />
          <button type="button" class="js-remove-rx dsp-icon-btn dsp-icon-btn--danger" style="padding:2px;" title="Xóa thuốc">&times;</button>
        `;

        if (container.querySelector('.rx-empty-msg')) {
          container.innerHTML = '';
        }
        container.appendChild(div);
      }
    });
  });

  // Create SBAR from SOAP
  document.getElementById('btnCreateSbarFromSoap')?.addEventListener('click', async (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (!p) return;

    const title = `Bệnh nhân ${p.fullName} - Giường ${p.bedNumber}`;
    const background = `${p.age}t, ${p.gender === 'nam' ? 'Nam' : 'Nữ'}. Chẩn đoán: ${p.currentDiagnosis || p.admissionDiagnosis}`;
    const situation = `S: ${p.sNotes}\nO: ${p.oNotes}`;
    
    await saveSBAR(profileId, {
      title,
      situation,
      background,
      assessment: p.aAssessment,
      recommendation: p.pPlan,
      isDraft: true
    });
    window.location.hash = '#/docspace/sbar';
  });

  // Create Case from SOAP
  document.getElementById('btnCreateCaseFromSoap')?.addEventListener('click', async (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (!p) return;

    await saveCase(profileId, {
      date: new Date().toISOString().split('T')[0]!,
      context: 'duty',
      chiefComplaint: p.sNotes || 'Theo dõi bệnh phòng',
      management: p.pPlan,
      lesson: '',
      icd10Label: p.currentDiagnosis || p.admissionDiagnosis
    });
    window.location.hash = '#/docspace/cases';
  });

  // Unified Insight Panel & Tabs Controller
  document.querySelectorAll('.dsp-insight-tab-btn').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const targetId = tabBtn.getAttribute('data-target');
      if (!targetId) return;

      document.querySelectorAll('.dsp-insight-tab-btn').forEach(b => {
        b.classList.remove('is-active');
        (b as HTMLElement).style.background = 'transparent';
        (b as HTMLElement).style.color = 'var(--color-text-muted)';
      });
      tabBtn.classList.add('is-active');
      (tabBtn as HTMLElement).style.background = 'var(--color-surface)';
      (tabBtn as HTMLElement).style.color = 'var(--color-primary)';

      document.querySelectorAll('.dsp-insight-tab-pane').forEach(pane => {
        (pane as HTMLElement).style.display = 'none';
      });
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.style.display = 'block';
    });
  });

  document.getElementById('btnCloseUnifiedInsight')?.addEventListener('click', () => {
    const container = document.getElementById('soapUnifiedInsightContainer');
    if (container) container.style.display = 'none';
  });

  // AI Co-Pilot Suggestion Handlers in Edit SOAP Modal
  let activeAiTargetField: 'esSNotes' | 'esONotes' | 'esAAssessment' | 'esPPlan' = 'esAAssessment';

  document.querySelectorAll('.js-ai-suggest').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const field = (e.currentTarget as HTMLElement).getAttribute('data-field') as 'subjective' | 'objective' | 'assessment' | 'plan';
      if (!field) return;

      const profile = getActiveProfile();
      if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
        alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
        return;
      }

      const patientName = (document.getElementById('esFullName') as HTMLInputElement)?.value || 'Chưa rõ';
      const age = (document.getElementById('esAge') as HTMLInputElement)?.value || 'Chưa rõ';
      const gender = (document.getElementById('esGender') as HTMLSelectElement)?.value || 'nam';
      const admissionDiagnosis = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value || 'Chưa rõ';

      const sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || '';
      const oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement)?.value || '';
      const aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value || '';
      const pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement)?.value || '';

      const targetFieldMap = {
        subjective: 'esSNotes',
        objective: 'esONotes',
        assessment: 'esAAssessment',
        plan: 'esPPlan'
      } as const;

      activeAiTargetField = targetFieldMap[field];

      const container = document.getElementById('soapUnifiedInsightContainer');
      const textEl = document.getElementById('soapAiSuggestionText');
      const applyBtn = document.getElementById('btnApplyAiSuggestion');
      
      if (container) container.style.display = 'block';
      if (applyBtn) applyBtn.style.display = 'inline-flex';
      
      // Chuyển sang Tab AI
      const tabAiBtn = document.querySelector('.dsp-insight-tab-btn[data-target="tabAiCoPilot"]') as HTMLElement;
      if (tabAiBtn) tabAiBtn.click();

      if (textEl) textEl.textContent = '⚡ Đang gọi AI kết nối và truyền dữ liệu lâm sàng...';

      const btnEl = e.currentTarget as HTMLButtonElement;
      const originalHtml = btnEl.innerHTML;
      btnEl.disabled = true;
      btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

      try {
        let streamedContent = '';
        await generateSOAPSuggestion(
          field,
          {
            patientName,
            age,
            gender,
            admissionDiagnosis,
            pSubjective: sNotes,
            pObjective: oNotes,
            pAssessment: aAssessment,
            pPlan: pPlan
          },
          profile.aiSettings,
          (chunk) => {
            streamedContent += chunk;
            if (textEl) textEl.textContent = streamedContent;
          }
        );
      } catch (err: any) {
        if (textEl) textEl.textContent = '❌ Lỗi AI: ' + err.message;
      } finally {
        btnEl.disabled = false;
        btnEl.innerHTML = originalHtml;
      }
    });
  });

  document.getElementById('btnApplyAiSuggestion')?.addEventListener('click', () => {
    const textEl = document.getElementById('soapAiSuggestionText');
    const targetEl = document.getElementById(activeAiTargetField) as HTMLTextAreaElement;
    if (textEl && targetEl) {
      const currentVal = targetEl.value.trim();
      const aiText = textEl.textContent?.trim() || '';
      if (aiText && !aiText.startsWith('❌') && !aiText.startsWith('⚡')) {
        targetEl.value = currentVal ? `${currentVal}\n\n${aiText}` : aiText;
        const container = document.getElementById('soapUnifiedInsightContainer');
        if (container) container.style.display = 'none';
      }
    }
  });

  // Discharge Summary Modal Event Handler
  document.querySelectorAll('.js-discharge-summary').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (!id) return;

      const p = getSoapPatientById(profileId, id);
      if (!p) return;

      const profile = getActiveProfile();
      if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
        alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'dsp-modal-overlay';
      modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem;';
      modal.innerHTML = `
        <div class="dsp-card" style="width:100%; max-width:800px; max-height:85vh; display:flex; flex-direction:column; background:var(--color-surface); border-radius:12px; overflow:hidden;">
          <div style="padding:1rem 1.5rem; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
            <h3 style="margin:0; color:var(--color-primary); display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-file-medical"></i> Tóm tắt Bệnh án Ra viện (AI Clinical Summary)
            </h3>
            <button type="button" class="dsp-icon-btn" id="btnCloseDischargeModal">&times;</button>
          </div>
          <div style="padding:1.5rem; overflow-y:auto; flex:1; font-size:13px; line-height:1.6; white-space:pre-wrap;" id="dischargeSummaryText">
            ⚡ Đang đọc diễn tiến SOAP logs và khởi tạo Tóm tắt Ra viện bằng AI...
          </div>
          <div style="padding:1rem 1.5rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
            <button type="button" class="dsp-btn dsp-btn-outline" id="btnCopyDischargeSummary">
              <i class="fa-solid fa-copy"></i> Sao chép văn bản
            </button>
            <button type="button" class="dsp-btn dsp-btn-primary" id="btnDoneDischargeModal">
              <i class="fa-solid fa-check"></i> Hoàn tất
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('#btnCloseDischargeModal');
      const doneBtn = modal.querySelector('#btnDoneDischargeModal');
      const copyBtn = modal.querySelector('#btnCopyDischargeSummary');
      const textContainer = modal.querySelector('#dischargeSummaryText');

      const closeModal = () => modal.remove();
      closeBtn?.addEventListener('click', closeModal);
      doneBtn?.addEventListener('click', closeModal);

      copyBtn?.addEventListener('click', () => {
        const text = textContainer?.textContent || '';
        navigator.clipboard.writeText(text);
        alert('Đã sao chép Tóm tắt Ra viện vào Clipboard!');
      });

      try {
        let streamed = '';
        await generateDischargeSummary(p, p.dailyLogs || [], profile.aiSettings, (chunk) => {
          streamed += chunk;
          if (textContainer) textContainer.textContent = streamed;
        });
      } catch (err: any) {
        if (textContainer) textContainer.textContent = '❌ Lỗi AI: ' + err.message;
      }
    });
  });

  // Toggle Collapse Single Row / Card
  document.querySelectorAll('.js-toggle-row-collapse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = (e.currentTarget as HTMLElement).closest('.dsp-soap-row');
      if (card) {
        card.classList.toggle('is-collapsed');
      }
    });
  });

  // Toggle Collapse All Cards (Thu gọn / Mở rộng tất cả)
  let isAllCollapsed = false;
  document.getElementById('btnToggleCollapseAll')?.addEventListener('click', (e) => {
    e.stopPropagation();
    isAllCollapsed = !isAllCollapsed;
    const cards = document.querySelectorAll('.dsp-soap-row');
    cards.forEach(card => {
      if (isAllCollapsed) {
        card.classList.add('is-collapsed');
      } else {
        card.classList.remove('is-collapsed');
      }
    });
    const btn = document.getElementById('btnToggleCollapseAll');
    if (btn) {
      btn.innerHTML = isAllCollapsed 
        ? `<i class="fa-solid fa-down-left-and-up-right-to-center"></i> <span>Mở rộng</span>`
        : `<i class="fa-solid fa-up-right-and-down-left-from-center"></i> <span>Thu gọn</span>`;
    }
  });

  // Delete Patient Button (Row & Modal)
  document.querySelectorAll('.js-delete-patient').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      const p = id ? getSoapPatientById(profileId, id) : null;
      const nameStr = p ? `${p.patientCode} - ${p.fullName}` : 'bệnh nhân này';
      if (id && confirm(`Bạn có chắc chắn muốn xóa hồ sơ ${nameStr} khỏi sổ tay?`)) {
        deleteSoapPatient(profileId, id);
        window.location.hash = '#/docspace/soap';
      }
    });
  });

  document.getElementById('btnDeletePatient')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    const nameStr = p ? `${p.patientCode} - ${p.fullName}` : 'bệnh nhân này';
    if (id && confirm(`Bạn có chắc chắn muốn xóa hồ sơ ${nameStr} khỏi sổ tay?`)) {
      deleteSoapPatient(profileId, id);
      window.location.hash = '#/docspace/soap';
    }
  });

  // 1-Click Copy EMR Format
  document.getElementById('btnCopyEmrFormat')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = getSoapPatientById(profileId, id);
    if (!p) return;

    let fullO = p.oNotes || '';
    const oLower = fullO.toLowerCase();
    const defaultFindings = [];
    
    if (!oLower.includes('tỉnh') && !oLower.includes('tri giác') && !oLower.includes('mê') && !oLower.includes('lơ mơ')) {
      defaultFindings.push('Bệnh tỉnh, tiếp xúc tốt.');
    }
    if (!oLower.includes('da') && !oLower.includes('niêm') && !oLower.includes('phù') && !oLower.includes('hạch')) {
      defaultFindings.push('Da niêm hồng, không phù, hạch ngoại vi không sờ chạm.');
    }
    if (!oLower.includes('tim') && !oLower.includes('nhịp') && !oLower.includes('t1')) {
      defaultFindings.push('Tim đều, T1 T2 rõ, không âm thổi.');
    }
    if (!oLower.includes('phổi') && !oLower.includes('rale') && !oLower.includes('thở') && !oLower.includes('ran')) {
      defaultFindings.push('Phổi thông khí 2 bên rõ, không rale.');
    }
    if (!oLower.includes('bụng') && !oLower.includes('gan') && !oLower.includes('tiêu') && !oLower.includes('lách')) {
      defaultFindings.push('Bụng mềm, gan lách không sờ chạm.');
    }
    
    if (defaultFindings.length > 0) {
      if (fullO) fullO += '\n';
      fullO += defaultFindings.join(' ');
    }

    const clsText = p.clsResults.map(r => r.text).join('\n') || 'Chưa ghi';
    const emrText = `S: \n${p.sNotes || 'Chưa ghi'}\nO: \n${fullO}\nKết quả CLS:\n${clsText}\n(A): vấn đề\n${p.aAssessment || 'Chưa ghi'}\n(P) Kế hoạch điều trị:\n${p.pPlan || 'Chưa ghi'}`;

    navigator.clipboard.writeText(emrText).then(() => {
      alert('✅ Đã sao chép định dạng tờ điều trị vào bộ nhớ tạm!\n(Các hệ cơ quan bình thường đã được tự động bổ sung vào O)');
      updateSoapPatient(profileId, id, { isEmrEntered: true });
      window.location.hash = '#/docspace/soap';
    });
  });

  // Tra cứu EBM (Smart Extraction Query)
  document.getElementById('btnSearchEBM')?.addEventListener('click', () => {
    const aText = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value.trim() || '';
    const sText = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value.trim() || '';
    const diagInput = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim() || '';
    const currDiagInput = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value.trim() || '';

    let query = currDiagInput || diagInput;
    if (!query && aText) {
      const firstLine = aText.split('\n')[0].split('.')[0].replace(/\(.*?\)/g, '').trim();
      query = firstLine || aText;
    } else if (!query && sText) {
      const firstLineS = sText.split('\n')[0].trim();
      query = firstLineS.length > 50 ? firstLineS.substring(0, 50) : firstLineS;
    }
    ebmBridge.openSearch(query || '', { targetFieldId: 'esAAssessment' });
  });

  // Real-time Contextual EBM Suggestion Bar Updater
  const ebmContextBar = document.getElementById('soapEbmContextBar');
  const updateEbmContextSuggestions = () => {
    if (!ebmContextBar) return;
    const diag = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value.trim() || (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim() || '';
    const aVal = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value.trim() || '';
    const icdRegex = /[A-Z][0-9]{2}(?:\.[0-9]+)?/gi;
    const icdCodes = Array.from(new Set([...(diag.match(icdRegex) || []), ...(aVal.match(icdRegex) || [])]));
    const q = diag || (aVal.split('\n')[0]?.substring(0, 40) || '');
    const tabEbmBtn = document.querySelector('.dsp-insight-tab-btn[data-target="tabEbmGuideline"]') as HTMLElement;

    if (q.length >= 2 || icdCodes.length > 0) {
      ebmBridge.renderContextualBar(ebmContextBar, q, icdCodes);
      if (tabEbmBtn) {
        tabEbmBtn.innerHTML = '<i class="fa-solid fa-scale-balanced"></i> EBM (Có gợi ý)';
        tabEbmBtn.style.color = 'var(--color-primary)';
      }
    } else {
      ebmContextBar.innerHTML = '<span style="font-size:11px; color:var(--color-text-muted); font-style:italic;">Chưa phát hiện khuyến cáo EBM tương ứng.</span>';
      if (tabEbmBtn) {
        tabEbmBtn.innerHTML = '<i class="fa-solid fa-scale-balanced"></i> Khuyến cáo EBM';
      }
    }
  };

  let ebmDebounceTimer: any = null;
  const triggerEbmDebounce = () => {
    clearTimeout(ebmDebounceTimer);
    ebmDebounceTimer = setTimeout(updateEbmContextSuggestions, 280);
  };

  document.getElementById('esCurrentDiagnosis')?.addEventListener('input', triggerEbmDebounce);
  document.getElementById('esAdmissionDiagnosis')?.addEventListener('input', triggerEbmDebounce);
  document.getElementById('esAAssessment')?.addEventListener('input', triggerEbmDebounce);

  // Initial trigger if diagnostic text exists
  setTimeout(updateEbmContextSuggestions, 350);

  // Tiếp cận chẩn đoán (Reasoning Coach)
  document.getElementById('btnReasoningCoachSoap')?.addEventListener('click', () => {
    const sText = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || '';
    const diag = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value || '';
    const query = `${diag} ${sText}`.toLowerCase();

    let defaultKey = 'dau_nguc';
    if (query.includes('thở') || query.includes('phổi') || query.includes('copd') || query.includes('hen')) defaultKey = 'kho_tho';
    else if (query.includes('sốt') || query.includes('nhiễm') || query.includes('sepsis')) defaultKey = 'sot_chua_ro_nguyen_nhan';

    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    clinicalReasoningPanel.open('esAAssessment', p, defaultKey);
  });

  // Clinical Reaction Chain Engine (CRCE) Drawer
  document.getElementById('btnReactionChainSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (p) {
      p.sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || p.sNotes;
      p.oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement)?.value || p.oNotes;
      p.aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value || p.aAssessment;
      (window as any).dsp_current_soap_patient = p;

      reactionChainDrawer.open(
        p,
        undefined,
        (rxItems) => {
          const container = document.getElementById('rxListContainer');
          if (container) {
            if (container.querySelector('.rx-empty-msg')) {
              container.innerHTML = '';
            }
            rxItems.forEach(item => {
              const div = document.createElement('div');
              div.className = 'rx-item-row';
              div.dataset.id = item.id;
              div.innerHTML = `
                <div>
                  <input type="text" class="js-rx-name dsp-input" value="${escapeHtml(item.name)}" style="font-size:11px; padding:2px 4px; font-weight:bold; width:100%;" />
                  <input type="text" class="js-rx-dosage dsp-input" value="${escapeHtml(item.dosage || '')}" placeholder="Hàm lượng" style="font-size:10px; padding:2px 4px; color:var(--color-text-muted); width:100%; margin-top:2px;" />
                </div>
                <input type="text" class="js-rx-route dsp-input" value="${escapeHtml(item.route || 'Uống')}" placeholder="Đường dùng" style="font-size:11px; padding:2px 4px;" />
                <input type="text" class="js-rx-freq dsp-input" value="${escapeHtml(item.frequency || '')}" placeholder="Tần suất (VD: 1v x 2/ngày)" style="font-size:11px; padding:2px 4px;" />
                <input type="text" class="js-rx-qty dsp-input" value="${escapeHtml(item.quantity || '')}" placeholder="SL (VD: 10 viên)" style="font-size:11px; padding:2px 4px;" />
                <input type="text" class="js-rx-instr dsp-input" value="${escapeHtml(item.instructions || '')}" placeholder="Lời dặn (VD: Uống sau ăn)" style="font-size:11px; padding:2px 4px;" />
                <button type="button" class="js-remove-rx dsp-icon-btn dsp-icon-btn--danger" style="padding:2px;" title="Xóa thuốc">&times;</button>
              `;
              container.appendChild(div);
            });
          }
        },
        (icdCode, diseaseName) => {
          const aEl = document.getElementById('esAAssessment') as HTMLTextAreaElement | null;
          if (aEl) {
            const diagStr = `[Chẩn đoán xác định]: ${diseaseName} (${icdCode})`;
            const cur = aEl.value.trim();
            aEl.value = cur ? `${cur}\n${diagStr}` : diagStr;
          }
          const admDiag = document.getElementById('esAdmissionDiagnosis') as HTMLInputElement | null;
          if (admDiag && !admDiag.value) {
            admDiag.value = `${diseaseName} (${icdCode})`;
          }
        }
      );
    }
  });

  // Drug Intelligence & Kê đơn
  document.getElementById('btnDrugIntelSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    drugIntelligencePanel.open('esPPlan', p);
  });

  document.getElementById('btnPrescribeSoap')?.addEventListener('click', () => {
    drugPicker.open('esPPlan');
  });

  // ICD-10 Picker
  document.getElementById('btnIcdSoap')?.addEventListener('click', () => {
    icdPicker.open('esAAssessment');
  });

  // Thang điểm
  document.getElementById('btnScoreSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    calculatorPicker.open('esAAssessment', p);
  });

  // Quick Reference Drawer
  document.getElementById('btnQuickRefSoap')?.addEventListener('click', () => {
    quickReferenceDrawer.open('formulas');
  });

  // SOAP-to-PICO Engine Button
  document.getElementById('btnPicoSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (p) {
      p.admissionDiagnosis = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value || p.admissionDiagnosis;
      p.pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement)?.value || p.pPlan;
      
      const pico = extractPICOFromSoap(p);
      window.location.hash = pico.ebmHubUrl;
    }
  });

  // Knowledge Vault Drawer & Real-Time Context Suggester
  document.getElementById('btnVaultKnowledgeSoap')?.addEventListener('click', () => {
    quickReferenceDrawer.open('vault' as any);
  });

  // Real-time Contextual Vault Suggestion Bar
  const vaultContextBar = document.getElementById('soapVaultContextBar');
  const updateVaultContextSuggestions = () => {
    if (!vaultContextBar) return;
    const diag = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value.trim() || (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim() || '';
    const aVal = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value.trim() || '';
    const textToScan = `${diag} ${aVal}`.toLowerCase();
    const tabVaultBtn = document.querySelector('.dsp-insight-tab-btn[data-target="tabVaultKnowledge"]') as HTMLElement;

    const vaultKeywords = [
      { name: 'Hội chứng vành cấp', key: 'hội chứng vành cấp', alias: 'acs' },
      { name: 'Tổn thương thận cấp', key: 'thận cấp', alias: 'aki' },
      { name: 'COPD', key: 'copd', alias: 'phổi tắc nghẽn' },
      { name: 'Suy tim', key: 'suy tim', alias: 'heart failure' },
      { name: 'Tăng huyết áp', key: 'tăng huyết áp', alias: 'hypertension' },
      { name: 'Đái tháo đường', key: 'đái tháo đường', alias: 'tiểu đường' },
      { name: 'Bỏng', key: 'bỏng', alias: 'burn' },
      { name: 'DKA', key: 'dka', alias: 'nhiễm toan ceton' },
      { name: 'Sốc nhiễm khuẩn', key: 'sốc nhiễm', alias: 'sepsis' },
      { name: 'Viêm tụy cấp', key: 'viêm tụy', alias: 'pancreatitis' },
      { name: 'Xơ gan', key: 'xơ gan', alias: 'cirrhosis' },
      { name: 'Sốt xuất huyết', key: 'sốt xuất huyết', alias: 'dengue' },
      { name: 'Viêm phổi', key: 'viêm phổi', alias: 'pneumonia' }
    ];

    const matched = vaultKeywords.filter(k => textToScan.includes(k.key) || textToScan.includes(k.alias));

    if (matched.length > 0) {
      if (tabVaultBtn) {
        tabVaultBtn.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> Vault (${matched.length})`;
        tabVaultBtn.style.color = 'var(--color-primary)';
      }
      vaultContextBar.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-size:11px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:4px;">
            <i class="fa-solid fa-graduation-cap"></i> Gợi ý từ Kho Tri Thức Vault (2.250+ bài):
          </span>
          <span style="font-size:10px; color:var(--color-text-muted);">Khớp ${matched.length} chủ đề</span>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:6px;">
          ${matched.map(m => `
            <a 
              href="#/vault?search=${encodeURIComponent(m.name)}" 
              class="dsp-badge" 
              style="background:rgba(2,132,199,0.08); color:var(--color-primary); border:1px solid rgba(2,132,199,0.25); text-decoration:none; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:600; display:inline-flex; align-items:center; gap:4px;"
              title="Mở toàn bộ chuỗi bệnh học (${m.name}) trong Knowledge Vault"
            >
              <i class="fa-solid fa-book-medical"></i> ${m.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:9px;"></i>
            </a>
          `).join('')}
        </div>
      `;
    } else {
      if (tabVaultBtn) {
        tabVaultBtn.innerHTML = '<i class="fa-solid fa-graduation-cap"></i> Bài giảng Vault';
      }
      vaultContextBar.innerHTML = '<span style="font-size:11px; color:var(--color-text-muted); font-style:italic;">Nhập chẩn đoán hoặc đánh giá để xem các bài giảng liên quan trong Vault.</span>';
    }
  };

  let vaultDebounceTimer: any = null;
  const triggerVaultDebounce = () => {
    clearTimeout(vaultDebounceTimer);
    vaultDebounceTimer = setTimeout(updateVaultContextSuggestions, 300);
  };

  document.getElementById('esCurrentDiagnosis')?.addEventListener('input', triggerVaultDebounce);
  document.getElementById('esAdmissionDiagnosis')?.addEventListener('input', triggerVaultDebounce);
  document.getElementById('esAAssessment')?.addEventListener('input', triggerVaultDebounce);
  setTimeout(updateVaultContextSuggestions, 400);

  // Insert Vault Citation into P
  document.getElementById('btnInsertVaultCitationSoap')?.addEventListener('click', () => {
    const planEl = document.getElementById('esPPlan') as HTMLTextAreaElement | null;
    const diag = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value.trim() || (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim() || 'Bệnh lý';
    if (planEl) {
      const citation = `\n• [Tham chiếu Phác đồ Vault: ${diag}] (Theo dõi đáp ứng và kiểm tra biến chứng)`;
      planEl.value = (planEl.value + citation).trim();
      planEl.focus();
    }
  });

  // Lab Diagnostics Hub Events
  document.getElementById('btnOpenLabFromO')?.addEventListener('click', () => {
    labDiagnosticsHub.open('dictionary', 'esONotes');
  });

  document.getElementById('btnOpenLabOrderSets')?.addEventListener('click', () => {
    labDiagnosticsHub.open('ordersets', 'esClsOrders');
  });

  document.getElementById('btnOpenLabParser')?.addEventListener('click', () => {
    const rawVal = (document.getElementById('esClsQuickPaste') as HTMLTextAreaElement)?.value || '';
    labDiagnosticsHub.open('parser', 'esClsQuickPaste');
    if (rawVal.trim()) {
      const inputEl = document.getElementById('txtLabRawInput') as HTMLTextAreaElement;
      if (inputEl) {
        inputEl.value = rawVal;
        document.getElementById('btnDoParseLab')?.click();
      }
    }
  });

  document.getElementById('btnOpenLabHubFooter')?.addEventListener('click', () => {
    labDiagnosticsHub.open('parser');
  });

  // Drag and Drop Engine cho Thẻ Cận Lâm Sàng
  const LAB_TEMPLATES: Record<string, string> = {
    abg: `[Khí máu động mạch (ABG)]\n- pH: 7.38 (7.35 - 7.45)\n- pCO2: 40 mmHg (35 - 45)\n- pO2: 85 mmHg (80 - 100)\n- HCO3-: 24 mmol/L (22 - 26)\n- SaO2: 96%`,
    cbc: `[Công thức máu (CBC)]\n- WBC: 8.5 x10^9/L (Neu: 65%)\n- RBC: 4.5 x10^12/L | Hgb: 13.5 g/dL | Hct: 40%\n- PLT: 250 x10^9/L`,
    biochem: `[Sinh hóa máu]\n- Glucose: 5.6 mmol/L\n- Urea: 5.2 mmol/L | Creatinine: 85 umol/L\n- AST (SGOT): 25 U/L | ALT (SGPT): 28 U/L`,
    ion: `[Điện giải đồ]\n- Na+: 138 mmol/L (135 - 145)\n- K+: 4.0 mmol/L (3.5 - 5.0)\n- Cl-: 102 mmol/L (98 - 106)`,
    cxr: `[X-quang ngực (CXR)]\n- Phế trường 2 bên sáng đều, không tổn thương thâm nhiễm.\n- Bóng tim không to, góc màng phổi 2 bên nhọn.`,
    ecg: `[Điện tâm đồ (ECG)]\n- Nhịp xoang đều, tần số: 75 l/p.\n- Trục trung tính, không ST-T thay đổi bệnh lý.`
  };

  document.querySelectorAll<HTMLElement>('.js-lab-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      const labType = card.getAttribute('data-lab-type') || '';
      e.dataTransfer?.setData('text/plain', LAB_TEMPLATES[labType] || '');
      card.style.opacity = '0.5';
    });
    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
    });
  });

  const dropTargets = ['esSNotes', 'esONotes', 'esClsQuickPaste'];
  dropTargets.forEach(id => {
    const targetEl = document.getElementById(id) as HTMLTextAreaElement;
    if (!targetEl) return;

    targetEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      targetEl.style.borderColor = 'var(--color-primary)';
      targetEl.style.backgroundColor = 'rgba(2, 132, 199, 0.05)';
    });

    targetEl.addEventListener('dragleave', () => {
      targetEl.style.borderColor = 'var(--color-border)';
      targetEl.style.backgroundColor = '';
    });

    targetEl.addEventListener('drop', (e) => {
      e.preventDefault();
      targetEl.style.borderColor = 'var(--color-border)';
      targetEl.style.backgroundColor = '';
      const textData = e.dataTransfer?.getData('text/plain');
      if (textData) {
        const startPos = targetEl.selectionStart || targetEl.value.length;
        const endPos = targetEl.selectionEnd || targetEl.value.length;
        const currentVal = targetEl.value;
        const prefix = currentVal.length > 0 && !currentVal.endsWith('\n') ? '\n' : '';
        targetEl.value = currentVal.substring(0, startPos) + prefix + textData + currentVal.substring(endPos);
      }
    });
  });

  // Khởi tạo các sự kiện AI & Protocol Bridge (SOAP ↔ Protocol)
  initSoapAiBridgeEvents(profileId);

  // Tự động nạp dữ liệu từ phân hệ Bệnh Mạn Tính (Bidirectional Bridge)
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const fromChronicId = urlParams.get('from_chronic');
  if (fromChronicId) {
    const cp = getChronicPatientById(profileId, fromChronicId);
    if (cp) {
      const allSoap = getAllSoapPatients(profileId);
      let targetSoap = allSoap.find(s => s.patientCode === cp.patientCode || s.fullName === cp.fullName);

      const lastEnc = cp.encounters[cp.encounters.length - 1];
      const sNotes = `[Tái khám Bệnh Mạn Tính]\n- Bệnh nhân ${cp.fullName} (${cp.age}t) đến khám định kỳ.\n- Mức độ tuân thủ thuốc: ${lastEnc?.adherenceLevel === 'good' ? 'Tốt' : lastEnc?.adherenceLevel === 'moderate' ? 'Trung bình' : 'Kém'}.\n- Triệu chứng: Không đau ngực, không khó thở khi nghỉ.`;
      
      const oParts: string[] = [];
      if (lastEnc?.systolicBp) oParts.push(`Huyết áp: ${lastEnc.systolicBp}/${lastEnc.diastolicBp} mmHg | Mạch: ${lastEnc.heartRate || 75} l/p | Cân nặng: ${lastEnc.weightKg || '—'} kg`);
      if (lastEnc?.hba1c) oParts.push(`HbA1c: ${lastEnc.hba1c}% | Đường huyết đói: ${lastEnc.fastingGlucose || '—'} mmol/L`);
      if (lastEnc?.egfr) oParts.push(`eGFR: ${lastEnc.egfr} mL/p/1.73m² | Creatinine: ${lastEnc.creatinine || '—'} umol/L | ACR niệu: ${lastEnc.urineAcr || '—'} mg/g`);
      if (lastEnc?.ldlC) oParts.push(`LDL-C: ${lastEnc.ldlC} mmol/L | Triglycerides: ${lastEnc.triglycerides || '—'} mmol/L`);
      const oNotes = oParts.join('\n');

      const aAssessment = `[Chẩn đoán]: ${cp.diagnosesLabels.join(', ')}\n[Đánh giá]: ${lastEnc?.hba1c && lastEnc.hba1c <= (cp.targetGoals.targetHba1c || 7.0) ? 'Đạt mục tiêu HbA1c' : 'Chưa đạt mục tiêu HbA1c'}. ${lastEnc?.systolicBp && lastEnc.systolicBp <= (cp.targetGoals.targetSystolicBp || 130) ? 'Huyết áp kiểm soát tốt' : 'Huyết áp chưa kiểm soát'}.`;
      const pPlan = `[Toa thuốc duy trì]:\n${lastEnc?.currentMedications || 'Tiếp tục phác đồ cũ'}\n\n[Kế hoạch]: Tái khám định kỳ sau 1-3 tháng. Cần hoàn tất các xét nghiệm tầm soát biến chứng quá hạn.`;

      if (!targetSoap) {
        targetSoap = saveSoapPatient(profileId, {
          patientCode: cp.patientCode,
          bedNumber: 'PK-NgoạiTrú',
          fullName: cp.fullName,
          age: cp.age,
          gender: cp.gender === 'male' ? 'nam' : 'nu',
          medicalRecordNo: cp.patientCode,
          admissionDiagnosis: cp.diagnosesLabels.join(', '),
          currentDiagnosis: cp.diagnosesLabels.join(', '),
          isEmrEntered: false,
          soapStatus: 'da_lam',
          dayOfIllness: 1,
          sNotes,
          oNotes,
          aAssessment,
          pPlan,
          clsOrders: [],
          clsResults: [],
        });
      } else {
        updateSoapPatient(profileId, targetSoap.id, {
          sNotes,
          oNotes,
          aAssessment,
          pPlan,
          soapStatus: 'da_lam',
        });
      }

      // Mở ngay modal chỉnh sửa SOAP cho ca này
      window.location.hash = `#/docspace/soap?edit=${targetSoap.id}`;
    }
  }

  // Tự động nạp dữ liệu từ phân hệ Y Học Chứng Cứ EBM (1-Click Guideline to SOAP)
  const fromGuidelineSlug = urlParams.get('from_guideline') || urlParams.get('from_ebm');
  if (fromGuidelineSlug) {
    const cleanSlug = fromGuidelineSlug.replace(/\.html$/i, '').toLowerCase();
    const staticList = KHO_GUIDELINES_STATIC || [];
    const study = staticList.find(s => 
      (s.file && s.file.replace(/\.html$/i, '').toLowerCase() === cleanSlug) ||
      (s.id && s.id.toLowerCase() === cleanSlug)
    );

    if (study) {
      const allSoap = getAllSoapPatients(profileId);
      let targetSoap = allSoap.find(s => s.admissionDiagnosis === study.title || s.currentDiagnosis === study.title);

      const conclusion = study.detailedConclusion || study.keyResults || study.summary;
      const drugLine = study.drug ? `\n• Thuốc / Phác đồ: ${study.drug}` : '';
      const interventionLine = study.intervention ? `\n• Can thiệp: ${study.intervention}` : '';

      const aAssessment = `[Chẩn đoán & Đánh giá theo EBM]:\n• Hướng dẫn: ${study.title}\n• Phân tầng & Khuyến cáo then chốt: ${conclusion}`;
      const pPlan = `[Kế hoạch & Y lệnh điều trị chuẩn]:${drugLine}${interventionLine}\n• Hướng dẫn thực hành: ${conclusion}`;

      if (!targetSoap) {
        const patientCode = `EBM-${Date.now().toString().slice(-4)}`;
        const fullName = `Ca bệnh ${study.conditionKey ? study.conditionKey.toUpperCase() : 'Lâm sàng'}`;
        targetSoap = saveSoapPatient(profileId, {
          patientCode,
          bedNumber: 'PK-NgoạiTrú',
          fullName,
          age: 60,
          gender: 'nam',
          medicalRecordNo: patientCode,
          admissionDiagnosis: study.title,
          currentDiagnosis: study.title,
          isEmrEntered: false,
          soapStatus: 'da_lam',
          dayOfIllness: 1,
          sNotes: `[Bệnh sử / Lý do vào viện]: Khám và áp dụng điều trị theo khuyến cáo ${study.organization || 'EBM Quốc tế'}.`,
          oNotes: `Sinh hiệu: Mạch 78 l/p, Huyết áp 125/80 mmHg, SpO2 98%.\nKhám lâm sàng: Bệnh nhân tỉnh, tiếp xúc tốt.`,
          aAssessment,
          pPlan,
          clsOrders: [],
          clsResults: [],
        });
      }

      // Mở ngay modal chỉnh sửa SOAP cho ca EBM này
      window.location.hash = `#/docspace/soap?edit=${targetSoap.id}`;
    }
  }

  // Tự động nạp dữ liệu từ phân hệ Cơ Sở Y Khoa (Pathophysiology Case to SOAP)
  const fromPathoCaseId = urlParams.get('from_patho_case');
  if (fromPathoCaseId) {
    const pCase = CLINICAL_CASES.find(c => c.id === fromPathoCaseId || c.id.toLowerCase() === fromPathoCaseId.toLowerCase());
    if (pCase) {
      const allSoap = getAllSoapPatients(profileId);
      let targetSoap = allSoap.find(s => s.admissionDiagnosis === pCase.title || s.currentDiagnosis === pCase.title);

      const aAssessment = `[Chẩn đoán & Biện luận Cơ Chế Bệnh Sinh]:\n• Chẩn đoán: ${pCase.title} (${pCase.specialty})\n• Cơ chế sinh lý bệnh: ${pCase.cascadeExplanation}\n• Điểm lâm sàng then chốt (Pearls): ${pCase.clinicalPearls}`;
      const pPlan = `[Kế hoạch Xử trí & Can thiệp Theo Cơ Chế]:\n• Hướng điều trị dựa trên chuỗi biến đổi sinh lý bệnh.\n• Theo dõi đáp ứng lâm sàng và xét nghiệm đánh giá.`;

      if (!targetSoap) {
        const patientCode = `PATHO-${Date.now().toString().slice(-4)}`;
        const fullName = `Ca Thực Hành: ${pCase.title.length > 30 ? pCase.title.substring(0, 30) + '...' : pCase.title}`;
        targetSoap = saveSoapPatient(profileId, {
          patientCode,
          bedNumber: 'Giường 01',
          fullName,
          age: 65,
          gender: 'nam',
          medicalRecordNo: patientCode,
          admissionDiagnosis: pCase.title,
          currentDiagnosis: pCase.title,
          isEmrEntered: false,
          soapStatus: 'chua_lam',
          dayOfIllness: 1,
          sNotes: `[Tình huống ca bệnh lâm sàng]:\n${pCase.vignette}\n\n[Câu hỏi định hướng]: ${pCase.question}`,
          oNotes: `[Khám lâm sàng & Dấu hiệu ghi nhận]:\n- Ghi nhận từ ca bệnh cơ chế ${pCase.specialty}.\n- Cần thăm khám toàn diện cơ quan liên quan.`,
          aAssessment,
          pPlan,
          clsOrders: [],
          clsResults: [],
        });
      }

      // Mở ngay modal chỉnh sửa SOAP cho ca thực hành cơ chế này
      window.location.hash = `#/docspace/soap?edit=${targetSoap.id}`;
    }
  }

  // Tự động nạp dữ liệu từ Knowledge Vault (1-Click Vault Article to SOAP)
  const fromVaultTitle = urlParams.get('from_vault');
  if (fromVaultTitle) {
    const allSoap = getAllSoapPatients(profileId);
    let targetSoap = allSoap.find(s => s.admissionDiagnosis === fromVaultTitle || s.currentDiagnosis === fromVaultTitle);

    const aAssessment = `[Chẩn đoán & Tham chiếu Tri Thức Vault]:\n• Chẩn đoán chính: ${fromVaultTitle}\n• Tra cứu chuỗi bệnh học: Cơ chế SLB ➔ Tiêu chuẩn chẩn đoán ➔ Phác đồ điều trị ➔ Biến chứng.`;
    const pPlan = `[Kế hoạch Điều trị & Theo dõi]:\n• [Tham chiếu Phác đồ Vault: ${fromVaultTitle}]\n• Đánh giá đáp ứng lâm sàng sau 24-48 giờ.`;

    if (!targetSoap) {
      const patientCode = `VAULT-${Date.now().toString().slice(-4)}`;
      const fullName = `Ca Thực Hành: ${fromVaultTitle}`;
      targetSoap = saveSoapPatient(profileId, {
        patientCode,
        bedNumber: 'PK-NgoạiTrú',
        fullName,
        age: 55,
        gender: 'nam',
        medicalRecordNo: patientCode,
        admissionDiagnosis: fromVaultTitle,
        currentDiagnosis: fromVaultTitle,
        isEmrEntered: false,
        soapStatus: 'da_lam',
        dayOfIllness: 1,
        sNotes: `[Bệnh sử / Lý do vào viện]: Điều trị theo phác đồ ${fromVaultTitle} từ Knowledge Vault.`,
        oNotes: `Sinh hiệu: Mạch 80 l/p, Huyết áp 120/80 mmHg, Thở 18 l/p, SpO2 98%.`,
        aAssessment,
        pPlan,
        clsOrders: [],
        clsResults: [],
      });
    }

    // Mở ngay modal chỉnh sửa SOAP cho ca này
    window.location.hash = `#/docspace/soap?edit=${targetSoap.id}`;
  }

  // Tự động nạp dữ liệu từ Guideline Radar (1-Click Guideline Diff to SOAP)
  const fromGuidelineTitle = urlParams.get('from_guideline');
  if (fromGuidelineTitle) {
    const allSoap = getAllSoapPatients(profileId);
    let targetSoap = allSoap.find(s => s.admissionDiagnosis === fromGuidelineTitle || s.currentDiagnosis === fromGuidelineTitle);

    const aAssessment = `[Chẩn đoán & Tham chiếu Guideline Radar]:\n• Phác đồ: ${fromGuidelineTitle}\n• Khuyến cáo Class I / LOE A theo ESC/ADA/KDIGO/GOLD/Bộ Y Tế VN.`;
    const pPlan = `[Kế hoạch Điều trị Chuẩn EBM]:\n• Khởi trị phác đồ theo khuyến cáo mới nhất: ${fromGuidelineTitle}.\n• Đánh giá tuân thủ GDMT và phòng ngừa biến cố.`;

    if (!targetSoap) {
      const patientCode = `GDL-${Date.now().toString().slice(-4)}`;
      const fullName = `Ca Khuyến Cáo: ${fromGuidelineTitle.length > 35 ? fromGuidelineTitle.substring(0, 35) + '...' : fromGuidelineTitle}`;
      targetSoap = saveSoapPatient(profileId, {
        patientCode,
        bedNumber: 'Phòng Can Thiệp',
        fullName,
        age: 60,
        gender: 'nam',
        medicalRecordNo: patientCode,
        admissionDiagnosis: fromGuidelineTitle,
        currentDiagnosis: fromGuidelineTitle,
        isEmrEntered: false,
        soapStatus: 'da_lam',
        dayOfIllness: 1,
        sNotes: `[Bệnh sử / Chỉ định điều trị]: Bệnh nhân được chỉ định phác đồ theo hướng dẫn mới nhất: ${fromGuidelineTitle}.`,
        oNotes: `Sinh hiệu: Mạch 75 l/p, HA 125/80 mmHg, Thở 18 l/p, SpO2 98%.`,
        aAssessment,
        pPlan,
        clsOrders: [],
        clsResults: [],
      });
    }

    // Mở ngay modal chỉnh sửa SOAP cho ca này
    window.location.hash = `#/docspace/soap?edit=${targetSoap.id}`;
  }
}

