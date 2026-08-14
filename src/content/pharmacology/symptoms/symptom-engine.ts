/**
 * CliniPortal — Clinical Pharmacology Symptom Flowchart Engine (TypeScript Module)
 */

export interface SymptomDrugItem {
  name: string;
  dose: string;
  duration?: string;
}

export interface SymptomScenarioItem {
  title: string;
  drugs: SymptomDrugItem[];
  ci?: string;
  warn?: string;
  ia?: string;
  source?: string;
}

export interface SymptomDatabase {
  emergency: {
    source: string;
    redFlags: string[];
  };
  categories: Record<string, Array<{ key: string; tag: string; title: string; cls: string }>>;
  scenarios: Record<string, SymptomScenarioItem>;
}

export function resetAll(): void {
  document.querySelectorAll('.fc-node').forEach(n => n.classList.remove('active'));
  const layerTypes = document.getElementById('layer-types');
  const layerScenarios = document.getElementById('layer-scenarios');
  const protoPanel = document.getElementById('proto-panel');

  if (layerTypes) layerTypes.className = 'fc-layer-disabled';
  if (layerScenarios) layerScenarios.style.display = 'none';
  if (protoPanel) protoPanel.style.display = 'none';
}

export function showEmergency(causeName: string, redFlags?: string[]): void {
  const panel = document.getElementById('proto-panel');
  if (!panel) return;

  const defaultFlags = redFlags || [
    "Dấu hiệu đe dọa tính mạng (Suy hô hấp, sốc, rối loạn tri giác)",
    "Đau dữ dội khởi phát đột ngột hoặc xuất huyết tiến triển",
    "Không đáp ứng với xử trí ban đầu trong 15-30 phút"
  ];

  panel.style.display = 'block';
  panel.style.borderTopColor = 'var(--fc-danger, #dc2626)';
  panel.innerHTML = `
    <div class="proto-header" style="background:#fee2e2; border-radius:8px 8px 0 0; padding:1rem; border-bottom:1px solid #fca5a5;">
      <h3 style="color:#991b1b; margin:0; display:flex; align-items:center; gap:0.5rem; font-size:1.1rem;">
        🚨 TÌNH HUỐNG CẤP CỨU KHẨN CẤP / CHUYỂN TUYẾN
      </h3>
      <p style="color:#7f1d1d; margin:0.25rem 0 0; font-size:0.875rem;"><strong>Nguyên nhân nghi ngờ:</strong> ${causeName}</p>
    </div>
    <div class="proto-body" style="padding:1rem; font-size:0.9rem; line-height:1.5;">
      <h4 style="color:#991b1b; margin:0 0 0.5rem;">🚩 Dấu Hiệu Cảnh Báo Đỏ (Red Flags):</h4>
      <ul style="color:#b91c1c; margin:0 0 1rem; padding-left:1.25rem;">
        ${defaultFlags.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div style="background:var(--color-surface-2); padding:0.75rem; border-radius:6px; border-left:3px solid #dc2626;">
        <strong>Hành động bắt buộc:</strong> Thiết lập đường truyền tĩnh mạch, thở oxy hỗ trợ nếu SpO2 < 94%, gọi hội chẩn cấp cứu hoặc chuyển viện chuyên khoa ngay lập tức.
      </div>
    </div>
  `;
  panel.scrollIntoView({ behavior: 'smooth' });
}

export function displayProtocol(scenarioKey: string, db: SymptomDatabase, accentColor = 'var(--fc-teal, #0d9488)'): void {
  const panel = document.getElementById('proto-panel');
  if (!panel) return;

  const data = db.scenarios[scenarioKey];
  if (!data) return;

  document.querySelectorAll('#row-scenarios .fc-node').forEach(n => n.classList.remove('active'));

  panel.style.display = 'block';
  panel.style.borderTopColor = accentColor;
  panel.innerHTML = `
    <div class="proto-header" style="padding:1rem; border-bottom:1px solid var(--color-divider);">
      <h3 style="margin:0 0 0.25rem; font-size:1.15rem; color:var(--color-text);">${data.title}</h3>
      ${data.source ? `<small style="color:var(--color-text-muted);">Nguồn: ${data.source}</small>` : ''}
    </div>
    <div class="proto-body" style="padding:1rem; font-size:0.9rem; line-height:1.5;">
      <h4 style="color:var(--color-primary); margin:0 0 0.5rem;">💊 Phác Đồ Lựa Chọn Thuốc (First-line & Adjunct)</h4>
      <div style="display:grid; gap:0.5rem; margin-bottom:1rem;">
        ${data.drugs.map(d => `
          <div style="background:var(--color-surface-2); border:1px solid var(--color-divider); padding:0.75rem; border-radius:6px;">
            <div style="font-weight:700; color:var(--color-text);">${d.name}</div>
            <div style="font-size:0.85rem; color:var(--color-primary); font-weight:600;">Liều dùng: ${d.dose}</div>
            ${d.duration ? `<div style="font-size:0.8rem; color:var(--color-text-muted);">Thời gian: ${d.duration}</div>` : ''}
          </div>
        `).join('')}
      </div>

      ${data.ci ? `
        <h4 style="color:#dc2626; margin:0.75rem 0 0.25rem;">🚫 Chống Chỉ Định & Nguy Cơ</h4>
        <p style="margin:0 0 0.75rem; color:#b91c1c; background:#fee2e2; padding:0.5rem 0.75rem; border-radius:4px;">${data.ci}</p>
      ` : ''}

      ${data.warn ? `
        <h4 style="color:#d97706; margin:0.75rem 0 0.25rem;">⚠️ Thận Trọng & Lưu Ý Đặc Biệt</h4>
        <p style="margin:0 0 0.75rem; color:var(--color-text);">${data.warn}</p>
      ` : ''}

      ${data.ia ? `
        <h4 style="color:var(--color-text); margin:0.75rem 0 0.25rem;">🔄 Tương Tác Cần Tránh</h4>
        <p style="margin:0; color:var(--color-text-muted);">${data.ia}</p>
      ` : ''}
    </div>
  `;
  panel.scrollIntoView({ behavior: 'smooth' });
}

// Global exposure for HTML onclick attributes
if (typeof window !== 'undefined') {
  (window as any).resetAll = resetAll;
  (window as any).showEmergency = showEmergency;
  (window as any).displayProtocol = (key: string, color?: string) => {
    const db = (window as any).DB as SymptomDatabase | undefined;
    if (db) displayProtocol(key, db, color);
  };
  (window as any).selectPath = (path: string) => {
    resetAll();
    const nodeSevere = document.getElementById('node-severe');
    const nodeMild = document.getElementById('node-mild');
    if (path === 'SEVERE') {
      nodeSevere?.classList.add('active');
      const db = (window as any).DB as SymptomDatabase | undefined;
      showEmergency('Tình huống cấp cứu nghiêm trọng / Cảnh báo đỏ', db?.emergency?.redFlags);
    } else {
      nodeMild?.classList.add('active');
      const layerTypes = document.getElementById('layer-types');
      if (layerTypes) layerTypes.className = 'fc-layer-enabled';
    }
  };
  (window as any).selectCategory = (catKey: string) => {
    document.querySelectorAll('#layer-types .fc-node').forEach(n => n.classList.remove('active'));
    
    let clickId = '';
    if (catKey === 'PERIPHERAL') clickId = 'node-peripheral';
    if (catKey === 'ORTHOSTATIC') clickId = 'node-orthostatic';
    if (catKey === 'OTOTOXICITY') clickId = 'node-ototoxicity';
    if (catKey === 'SURGICAL') clickId = 'node-surgical';
    if (catKey === 'MEDICAL') clickId = 'node-medical';
    if (catKey === 'FUNCTIONAL') clickId = 'node-functional';

    const clickNode = document.getElementById(clickId);
    clickNode?.classList.add('active');

    const layerScenarios = document.getElementById('layer-scenarios');
    const rowScenarios = document.getElementById('row-scenarios');
    const protoPanel = document.getElementById('proto-panel');

    if (protoPanel) protoPanel.style.display = 'none';

    const db = (window as any).DB as SymptomDatabase | undefined;
    const list = db?.categories?.[catKey] || [];

    if (rowScenarios) {
      rowScenarios.innerHTML = list.map(item => `
        <div class="fc-node ${item.cls}" onclick="displayProtocol('${item.key}', 'var(--fc-teal)')">
          <div class="fc-node-tag">${item.tag}</div>
          <div class="fc-node-title">${item.title}</div>
        </div>
      `).join('');
    }

    if (layerScenarios) layerScenarios.style.display = 'block';
  };
}
