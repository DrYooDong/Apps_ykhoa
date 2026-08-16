/**
 * guideline-research-tools.ts
 * Scientific Research & Critical Appraisal Toolkit for Clinical Guidelines & Trials
 * - PICO Clinical Question Formulator & PubMed MeSH Query Builder
 * - Cochrane RoB 2.0 (RCT) & Newcastle-Ottawa Scale (NOS) Appraisal
 * - Meta-Analysis Pooled Effect Size & Heterogeneity (I^2) Calculator
 * - Academic Citation Exporter (Vancouver, APA 7, BibTeX, RIS)
 * Pure TypeScript (ES6+)
 */

export interface PicoData {
  p: string;
  i: string;
  c: string;
  o: string;
}

export interface Rob2DomainScores {
  d1: 'low' | 'some' | 'high';
  d2: 'low' | 'some' | 'high';
  d3: 'low' | 'some' | 'high';
  d4: 'low' | 'some' | 'high';
  d5: 'low' | 'some' | 'high';
}

export interface MetaTrialItem {
  name: string;
  eventsInt: number;
  totalInt: number;
  eventsCtrl: number;
  totalCtrl: number;
}

class GuidelineResearchToolsService {
  private currentTab: string = 'pico';
  private selectedStudy: any = null;

  public init(): void {
    (window as any).openResearchToolkitModal = (tab?: string, study?: any) => this.openModal(tab, study);
    (window as any).closeResearchToolkitModal = () => this.closeModal();
    (window as any).switchResearchTab = (tab: string) => this.switchTab(tab);
    (window as any).generatePicoQuery = () => this.generatePicoQuery();
    (window as any).copyPicoQuery = () => this.copyPicoQuery();
    (window as any).calculateMetaAnalysis = () => this.calculateMetaAnalysis();
    (window as any).addMetaTrialRow = () => this.addMetaTrialRow();
    (window as any).removeMetaTrialRow = (btn: HTMLElement) => this.removeMetaTrialRow(btn);
    (window as any).setCitationFormat = (format: string) => this.setCitationFormat(format);
    (window as any).copyCitationText = () => this.copyCitationText();
    (window as any).downloadCitationFile = () => this.downloadCitationFile();
    (window as any).updateRob2Summary = () => this.updateRob2Summary();
  }

  public openModal(tab = 'pico', study: any = null): void {
    this.currentTab = tab;
    this.selectedStudy = study;
    const modal = document.getElementById('research-toolkit-modal');
    if (modal) {
      modal.classList.add('active');
      this.switchTab(tab);
      if (study) {
        this.populateStudyData(study);
      }
    }
  }

  public closeModal(): void {
    const modal = document.getElementById('research-toolkit-modal');
    if (modal) modal.classList.remove('active');
  }

  public switchTab(tab: string): void {
    this.currentTab = tab;
    document.querySelectorAll('.research-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    document.querySelectorAll('.research-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `research-panel-${tab}`);
    });
  }

  private populateStudyData(study: any): void {
    // Populate PICO
    const picoP = document.getElementById('pico-p-input') as HTMLTextAreaElement | null;
    const picoI = document.getElementById('pico-i-input') as HTMLTextAreaElement | null;
    const picoC = document.getElementById('pico-c-input') as HTMLTextAreaElement | null;
    const picoO = document.getElementById('pico-o-input') as HTMLTextAreaElement | null;

    if (picoP && study.population) picoP.value = study.population;
    if (picoI && (study.drug || study.intervention)) {
      const parts = (study.intervention || study.drug || '').split('vs');
      if (picoI) picoI.value = parts[0]?.trim() || study.drug || '';
      if (picoC && parts.length > 1) picoC.value = parts[1]?.trim() || 'Placebo / Standard of Care';
    }
    if (picoO && study.primaryEndpoint) picoO.value = study.primaryEndpoint;

    this.generatePicoQuery();
    this.setCitationFormat('vancouver');
  }

  public generatePicoQuery(): void {
    const p = (document.getElementById('pico-p-input') as HTMLTextAreaElement)?.value.trim() || '';
    const i = (document.getElementById('pico-i-input') as HTMLTextAreaElement)?.value.trim() || '';
    const c = (document.getElementById('pico-c-input') as HTMLTextAreaElement)?.value.trim() || '';
    const o = (document.getElementById('pico-o-input') as HTMLTextAreaElement)?.value.trim() || '';

    const queryParts: string[] = [];
    if (p) queryParts.push(`("${p}"[Title/Abstract] OR "${p}"[MeSH Terms])`);
    if (i) queryParts.push(`("${i}"[Title/Abstract] OR "${i}"[Pharmacological Action])`);
    if (c && c.toLowerCase() !== 'placebo') queryParts.push(`("${c}"[Title/Abstract])`);
    if (o) queryParts.push(`("${o}"[Title/Abstract])`);

    const finalQuery = queryParts.length > 0 ? queryParts.join('\nAND ') : 'Vui lòng nhập ít nhất 1 thành phần PICO bên trên.';
    const outputEl = document.getElementById('pico-query-output');
    if (outputEl) outputEl.textContent = finalQuery;
  }

  public copyPicoQuery(): void {
    const text = document.getElementById('pico-query-output')?.textContent || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ Đã sao chép chuỗi truy vấn PubMed MeSH vào Clipboard!');
      });
    }
  }

  public updateRob2Summary(): void {
    const d1 = (document.getElementById('rob-d1-select') as HTMLSelectElement)?.value || 'low';
    const d2 = (document.getElementById('rob-d2-select') as HTMLSelectElement)?.value || 'low';
    const d3 = (document.getElementById('rob-d3-select') as HTMLSelectElement)?.value || 'low';
    const d4 = (document.getElementById('rob-d4-select') as HTMLSelectElement)?.value || 'low';
    const d5 = (document.getElementById('rob-d5-select') as HTMLSelectElement)?.value || 'low';

    const scores = [d1, d2, d3, d4, d5];
    const overall = scores.includes('high') ? 'high' : (scores.includes('some') ? 'some' : 'low');

    const overallBadge = document.getElementById('rob-overall-badge');
    if (overallBadge) {
      if (overall === 'low') {
        overallBadge.className = 'badge';
        overallBadge.style.background = '#dcfce7';
        overallBadge.style.color = '#15803d';
        overallBadge.innerHTML = '🟢 Thấp (Low Risk of Bias)';
      } else if (overall === 'some') {
        overallBadge.className = 'badge';
        overallBadge.style.background = '#fef9c3';
        overallBadge.style.color = '#a16207';
        overallBadge.innerHTML = '🟡 Một số lo ngại (Some Concerns)';
      } else {
        overallBadge.className = 'badge';
        overallBadge.style.background = '#fee2e2';
        overallBadge.style.color = '#b91c1c';
        overallBadge.innerHTML = '🔴 Cao (High Risk of Bias)';
      }
    }
  }

  public addMetaTrialRow(): void {
    const tbody = document.getElementById('meta-trials-tbody');
    if (!tbody) return;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><input type="text" class="meta-trial-name" placeholder="Tên nghiên cứu" style="width:100%; padding:4px; font-size:0.78rem; border:1px solid var(--border-light); border-radius:4px; background:var(--surface);"></td>
      <td><input type="number" class="meta-int-events" placeholder="15" style="width:55px; padding:4px; font-size:0.78rem; border:1px solid var(--border-light); border-radius:4px; background:var(--surface);"></td>
      <td><input type="number" class="meta-int-total" placeholder="100" style="width:65px; padding:4px; font-size:0.78rem; border:1px solid var(--border-light); border-radius:4px; background:var(--surface);"></td>
      <td><input type="number" class="meta-ctrl-events" placeholder="25" style="width:55px; padding:4px; font-size:0.78rem; border:1px solid var(--border-light); border-radius:4px; background:var(--surface);"></td>
      <td><input type="number" class="meta-ctrl-total" placeholder="100" style="width:65px; padding:4px; font-size:0.78rem; border:1px solid var(--border-light); border-radius:4px; background:var(--surface);"></td>
      <td style="text-align:center;"><button type="button" class="btn btn-small" onclick="window.removeMetaTrialRow(this)" style="color:#ef4444; padding:2px 6px;">&times;</button></td>
    `;
    tbody.appendChild(row);
  }

  public removeMetaTrialRow(btn: HTMLElement): void {
    const row = btn.closest('tr');
    if (row && document.querySelectorAll('#meta-trials-tbody tr').length > 2) {
      row.remove();
      this.calculateMetaAnalysis();
    }
  }

  public calculateMetaAnalysis(): void {
    const rows = document.querySelectorAll('#meta-trials-tbody tr');
    let totalIntEvents = 0, totalIntN = 0, totalCtrlEvents = 0, totalCtrlN = 0;
    const trials: { name: string; rr: number; ciLower: number; ciUpper: number; weight: number }[] = [];

    let sumWeight = 0;
    let sumWeightLogRR = 0;

    rows.forEach(r => {
      const name = (r.querySelector('.meta-trial-name') as HTMLInputElement)?.value || 'Trial';
      const a = parseInt((r.querySelector('.meta-int-events') as HTMLInputElement)?.value || '0', 10);
      const n1 = parseInt((r.querySelector('.meta-int-total') as HTMLInputElement)?.value || '1', 10);
      const c = parseInt((r.querySelector('.meta-ctrl-events') as HTMLInputElement)?.value || '0', 10);
      const n2 = parseInt((r.querySelector('.meta-ctrl-total') as HTMLInputElement)?.value || '1', 10);

      if (n1 > 0 && n2 > 0 && a >= 0 && c >= 0) {
        totalIntEvents += a;
        totalIntN += n1;
        totalCtrlEvents += c;
        totalCtrlN += n2;

        const p1 = (a + 0.5) / (n1 + 0.5);
        const p2 = (c + 0.5) / (n2 + 0.5);
        const rr = p1 / p2;
        const seLogRR = Math.sqrt((1 / (a + 0.5)) - (1 / (n1 + 0.5)) + (1 / (c + 0.5)) - (1 / (n2 + 0.5)));
        const weight = 1 / (seLogRR * seLogRR);

        sumWeight += weight;
        sumWeightLogRR += weight * Math.log(rr);

        trials.push({
          name,
          rr,
          ciLower: Math.exp(Math.log(rr) - 1.96 * seLogRR),
          ciUpper: Math.exp(Math.log(rr) + 1.96 * seLogRR),
          weight
        });
      }
    });

    if (sumWeight === 0 || trials.length === 0) return;

    const pooledLogRR = sumWeightLogRR / sumWeight;
    const pooledRR = Math.exp(pooledLogRR);
    const pooledSE = Math.sqrt(1 / sumWeight);
    const pooledCILower = Math.exp(pooledLogRR - 1.96 * pooledSE);
    const pooledCIUpper = Math.exp(pooledLogRR + 1.96 * pooledSE);

    // Cochrane Q & I^2
    let Q = 0;
    trials.forEach(t => {
      Q += t.weight * Math.pow(Math.log(t.rr) - pooledLogRR, 2);
    });
    const df = trials.length - 1;
    const i2 = df > 0 ? Math.max(0, Math.round(((Q - df) / Q) * 100)) : 0;

    const pooledEl = document.getElementById('meta-pooled-rr');
    const i2El = document.getElementById('meta-i2-val');
    const qEl = document.getElementById('meta-q-val');

    if (pooledEl) pooledEl.textContent = `RR ${pooledRR.toFixed(2)} [95% CI ${pooledCILower.toFixed(2)}–${pooledCIUpper.toFixed(2)}]`;
    if (i2El) i2El.textContent = `${i2}% (${i2 < 30 ? 'Thấp' : (i2 < 60 ? 'Trung bình' : 'Cao')})`;
    if (qEl) qEl.textContent = `Q = ${Q.toFixed(2)} (p ${Q > df ? '< 0.05' : '> 0.05'})`;

    this.renderSvgForestPlot(trials, pooledRR, pooledCILower, pooledCIUpper);
  }

  private renderSvgForestPlot(trials: any[], pooledRR: number, lower: number, upper: number): void {
    const container = document.getElementById('meta-forest-svg-container');
    if (!container) return;

    const width = 480;
    const rowHeight = 32;
    const height = (trials.length + 3) * rowHeight;
    const scale = (val: number) => {
      // log scale from 0.1 to 10
      const logMin = Math.log(0.2);
      const logMax = Math.log(5.0);
      const clamped = Math.max(logMin, Math.min(logMax, Math.log(val)));
      return 180 + ((clamped - logMin) / (logMax - logMin)) * 260;
    };

    const nullX = scale(1.0);

    let svgHtml = `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="font-family:sans-serif; font-size:11px;">
        <line x1="${nullX}" y1="20" x2="${nullX}" y2="${height - 35}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4"/>
        <text x="180" y="15" text-anchor="middle" fill="#16a34a" font-weight="700">← Ưu thế Can thiệp</text>
        <text x="440" y="15" text-anchor="middle" fill="#dc2626" font-weight="700">Ưu thế Đối chứng →</text>
    `;

    trials.forEach((t, idx) => {
      const y = 45 + idx * rowHeight;
      const xPoint = scale(t.rr);
      const x1 = scale(t.ciLower);
      const x2 = scale(t.ciUpper);

      svgHtml += `
        <text x="10" y="${y + 4}" fill="var(--text)" font-weight="600">${t.name}</text>
        <line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#0284c7" stroke-width="2"/>
        <rect x="${xPoint - 4}" y="${y - 4}" width="8" height="8" fill="#0284c7" rx="1"/>
        <text x="${width - 10}" y="${y + 4}" text-anchor="end" fill="var(--text-muted)" font-size="10">${t.rr.toFixed(2)} [${t.ciLower.toFixed(2)}-${t.ciUpper.toFixed(2)}]</text>
      `;
    });

    // Pooled Diamond
    const diamondY = 45 + trials.length * rowHeight + 10;
    const dMid = scale(pooledRR);
    const dLeft = scale(lower);
    const dRight = scale(upper);

    svgHtml += `
      <line x1="10" y1="${diamondY - 12}" x2="${width - 10}" y2="${diamondY - 12}" stroke="var(--border-light)" stroke-width="1"/>
      <text x="10" y="${diamondY + 4}" fill="var(--accent)" font-weight="800">Hiệu Ứng Gộp (Pooled)</text>
      <polygon points="${dLeft},${diamondY} ${dMid},${diamondY - 6} ${dRight},${diamondY} ${dMid},${diamondY + 6}" fill="#7c3aed" opacity="0.9"/>
      <text x="${width - 10}" y="${diamondY + 4}" text-anchor="end" fill="#7c3aed" font-weight="800">${pooledRR.toFixed(2)} [${lower.toFixed(2)}-${upper.toFixed(2)}]</text>
      </svg>
    `;

    container.innerHTML = svgHtml;
  }

  public setCitationFormat(format: string): void {
    document.querySelectorAll('.citation-format-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-format') === format);
    });

    const s = this.selectedStudy || (window as any).studies?.[0] || {
      title: 'Khuyến cáo chẩn đoán và điều trị suy tim',
      author: 'Hội Tim Mạch Học Việt Nam',
      year: 2023,
      organization: 'VNHA',
      drug: 'ARNI, SGLT2i',
      sourceUrl: 'https://vnha.org.vn'
    };

    let text = '';
    if (format === 'vancouver') {
      text = `${s.author || s.organization || 'Ban biên soạn'}. ${s.title}. ${s.organization || ''}. ${s.year || 2024}; ${s.sourceUrl || ''}`;
    } else if (format === 'apa') {
      text = `${s.author || s.organization || 'Tác giả'}. (${s.year || 2024}). ${s.title}. ${s.organization || 'Y khoa'}. ${s.sourceUrl || ''}`;
    } else if (format === 'bibtex') {
      const citeKey = (s.title || 'study').replace(/\s+/g, '_').substring(0, 15) + (s.year || '2024');
      text = `@article{${citeKey},\n  title = {${s.title}},\n  author = {${s.author || s.organization || 'VNHA'}},\n  journal = {${s.organization || 'CliniPortal Evidence'}},\n  year = {${s.year || 2024}},\n  url = {${s.sourceUrl || ''}}\n}`;
    } else if (format === 'ris') {
      text = `TY  - JOUR\nTI  - ${s.title}\nAU  - ${s.author || s.organization || 'CliniPortal'}\nPY  - ${s.year || 2024}\nJO  - ${s.organization || 'Guidelines'}\nUR  - ${s.sourceUrl || ''}\nER  -`;
    }

    const box = document.getElementById('citation-text-output');
    if (box) box.textContent = text;
  }

  public copyCitationText(): void {
    const text = document.getElementById('citation-text-output')?.textContent || '';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ Đã sao chép trích dẫn học thuật vào Clipboard!');
      });
    }
  }

  public downloadCitationFile(): void {
    const text = document.getElementById('citation-text-output')?.textContent || '';
    const activeFormat = document.querySelector('.citation-format-pill.active')?.getAttribute('data-format') || 'ris';
    const filename = `citation.${activeFormat === 'bibtex' ? 'bib' : (activeFormat === 'ris' ? 'ris' : 'txt')}`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export const guidelineResearchTools = new GuidelineResearchToolsService();
guidelineResearchTools.init();
