/**
 * CliniPortal 2.0 — CliniResearch Studio Isolated State & LocalStorage Store
 * Path: src/content/ebm/research/js/research-store.ts
 *
 * Completely independent from Guidelines store (`cliniportal_custom_studies`).
 * Manages multi-label faceted filtering, saved studies, personal notes, and the
 * persistent Comparison Tray across views.
 */

import { KHO_RESEARCH_STATIC } from './research-registry';
import {
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS
} from './research-taxonomy';
import type {
  LabelClusterGroup,
  ResearchCompareTab,
  ResearchFilterState,
  ResearchStudyRecord,
  ResearchViewMode
} from './research-types';

const LS_BOOKMARKS_KEY = 'cliniportal_research_vault_bookmarks_v1';
const LS_COMPARE_KEY = 'cliniportal_research_vault_compare_v1';
const LS_CUSTOM_KEY = 'cliniportal_research_vault_custom_v1';

function stripDiacritics(input?: string): string {
  if (!input) return '';
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

class ResearchVaultStore {
  private studies: ResearchStudyRecord[] = [];
  private bookmarkedIds: Set<string> = new Set();
  private compareIds: Set<string> = new Set();
  private viewMode: ResearchViewMode = 'cards';
  private activeCompareTab: ResearchCompareTab = 'matrix';
  private diffHighlightOnly = false;
  private previewStudyId: string | null = null;

  public filters: ResearchFilterState = {
    search: '',
    specialty: null,
    conditionKey: null,
    design: null,
    outcomeDirection: null,
    impactVerdict: null,
    interventionClass: null,
    endpointCategory: null,
    robOverall: null,
    yearPeriod: null,
    topicTag: null,
    asianOnly: false,
    savedOnly: false
  };

  private initialized = false;

  public init(): void {
    if (this.initialized) return;
    this.loadPersistedState();
    this.initialized = true;
  }

  private loadPersistedState(): void {
    let customList: ResearchStudyRecord[] = [];
    if (typeof localStorage !== 'undefined') {
      try {
        const rawBm = localStorage.getItem(LS_BOOKMARKS_KEY);
        if (rawBm) {
          const parsed: unknown = JSON.parse(rawBm);
          if (Array.isArray(parsed)) this.bookmarkedIds = new Set(parsed.map(String));
        }
        const rawCmp = localStorage.getItem(LS_COMPARE_KEY);
        if (rawCmp) {
          const parsed: unknown = JSON.parse(rawCmp);
          if (Array.isArray(parsed)) this.compareIds = new Set(parsed.map(String));
        }
        const rawCustom = localStorage.getItem(LS_CUSTOM_KEY);
        if (rawCustom) {
          const parsed: unknown = JSON.parse(rawCustom);
          if (Array.isArray(parsed)) customList = parsed as ResearchStudyRecord[];
        }
      } catch {
        // Ignore storage quota / private mode errors
      }
    }

    const mergedMap = new Map<string, ResearchStudyRecord>();
    for (const item of KHO_RESEARCH_STATIC) {
      mergedMap.set(item.id, {
        ...item,
        bookmarked: this.bookmarkedIds.has(item.id)
      });
    }
    for (const custom of customList) {
      if (custom && custom.id) {
        mergedMap.set(custom.id, {
          ...custom,
          bookmarked: this.bookmarkedIds.has(custom.id)
        });
      }
    }

    this.studies = Array.from(mergedMap.values()).sort(
      (a, b) => b.year - a.year || a.title.localeCompare(b.title, 'vi')
    );

    // Prune stale compare IDs
    for (const cid of Array.from(this.compareIds)) {
      if (!mergedMap.has(cid)) this.compareIds.delete(cid);
    }
  }

  private persistBookmarks(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(LS_BOOKMARKS_KEY, JSON.stringify(Array.from(this.bookmarkedIds)));
    } catch {
      // ignore
    }
  }

  private persistCompare(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(LS_COMPARE_KEY, JSON.stringify(Array.from(this.compareIds)));
    } catch {
      // ignore
    }
  }

  public getAllStudies(): ResearchStudyRecord[] {
    this.init();
    return this.studies;
  }

  public getStudyBySlugOrId(slugOrId: string): ResearchStudyRecord | undefined {
    this.init();
    const clean = slugOrId.replace(/\.(mdx|html)$/i, '');
    return this.studies.find((s) => s.slug === clean || s.id === clean);
  }

  public getViewMode(): ResearchViewMode {
    return this.viewMode;
  }

  public setViewMode(mode: ResearchViewMode): void {
    this.viewMode = mode;
  }

  public getCompareTab(): ResearchCompareTab {
    return this.activeCompareTab;
  }

  public setCompareTab(tab: ResearchCompareTab): void {
    this.activeCompareTab = tab;
  }

  public isDiffHighlightOnly(): boolean {
    return this.diffHighlightOnly;
  }

  public toggleDiffHighlightOnly(): boolean {
    this.diffHighlightOnly = !this.diffHighlightOnly;
    return this.diffHighlightOnly;
  }

  public setPreviewStudyId(id: string | null): void {
    this.previewStudyId = id;
  }

  public getPreviewStudy(): ResearchStudyRecord | null {
    if (!this.previewStudyId) return null;
    return this.getStudyBySlugOrId(this.previewStudyId) || null;
  }

  public toggleBookmark(id: string): boolean {
    this.init();
    const isNowSaved = !this.bookmarkedIds.has(id);
    if (isNowSaved) this.bookmarkedIds.add(id);
    else this.bookmarkedIds.delete(id);

    const target = this.studies.find((s) => s.id === id);
    if (target) target.bookmarked = isNowSaved;
    this.persistBookmarks();
    return isNowSaved;
  }

  public getBookmarkedCount(): number {
    this.init();
    return this.bookmarkedIds.size;
  }

  // ── Compare Tray Management (Max 5 studies for readable side-by-side matrix) ──
  public isInCompare(id: string): boolean {
    this.init();
    return this.compareIds.has(id);
  }

  public toggleCompare(id: string): { added: boolean; limitReached: boolean; count: number } {
    this.init();
    if (this.compareIds.has(id)) {
      this.compareIds.delete(id);
      this.persistCompare();
      return { added: false, limitReached: false, count: this.compareIds.size };
    }
    if (this.compareIds.size >= 5) {
      return { added: false, limitReached: true, count: this.compareIds.size };
    }
    this.compareIds.add(id);
    this.persistCompare();
    return { added: true, limitReached: false, count: this.compareIds.size };
  }

  public loadClusterIntoCompare(ids: string[]): void {
    this.init();
    this.compareIds.clear();
    ids.slice(0, 5).forEach((id) => this.compareIds.add(id));
    this.persistCompare();
  }

  public clearCompare(): void {
    this.init();
    this.compareIds.clear();
    this.persistCompare();
  }

  public getCompareStudies(): ResearchStudyRecord[] {
    this.init();
    return Array.from(this.compareIds)
      .map((id) => this.studies.find((s) => s.id === id))
      .filter((s): s is ResearchStudyRecord => Boolean(s));
  }

  // ── Multi-Axis Faceted Filter Engine ──
  public resetFilters(): void {
    this.filters = {
      search: '',
      specialty: null,
      conditionKey: null,
      design: null,
      outcomeDirection: null,
      impactVerdict: null,
      interventionClass: null,
      endpointCategory: null,
      robOverall: null,
      yearPeriod: null,
      topicTag: null,
      asianOnly: false,
      savedOnly: false
    };
  }

  public getActiveFilterCount(): number {
    const f = this.filters;
    return [
      f.specialty,
      f.conditionKey,
      f.design,
      f.outcomeDirection,
      f.impactVerdict,
      f.interventionClass,
      f.endpointCategory,
      f.robOverall,
      f.yearPeriod,
      f.topicTag,
      f.asianOnly ? 'asian' : null,
      f.savedOnly ? 'saved' : null
    ].filter(Boolean).length;
  }

  public getFilteredStudies(): ResearchStudyRecord[] {
    this.init();
    const f = this.filters;
    const qNorm = stripDiacritics(f.search.trim());

    return this.studies.filter((s) => {
      if (f.savedOnly && !s.bookmarked) return false;
      if (f.asianOnly && !s.asianData) return false;
      if (f.specialty && s.specialty !== f.specialty && s.specialty2 !== f.specialty) return false;
      if (f.conditionKey && s.conditionKey !== f.conditionKey) return false;
      if (f.design && s.design !== f.design) return false;
      if (f.outcomeDirection && s.outcomeDirection !== f.outcomeDirection) return false;
      if (f.impactVerdict && s.impactVerdict !== f.impactVerdict) return false;
      if (f.interventionClass && s.interventionClass !== f.interventionClass) return false;
      if (f.endpointCategory && s.primaryEndpointCategory !== f.endpointCategory) return false;
      if (f.robOverall && s.robOverall !== f.robOverall) return false;
      if (f.topicTag && !s.topicTags.includes(f.topicTag) && !s.problemLabels.includes(f.topicTag)) {
        return false;
      }

      if (f.yearPeriod) {
        if (f.yearPeriod === '2026' && s.year !== 2026) return false;
        if (f.yearPeriod === '2024-2025' && (s.year < 2024 || s.year > 2025)) return false;
        if (f.yearPeriod === '2020-2023' && (s.year < 2020 || s.year > 2023)) return false;
        if (f.yearPeriod === 'pre-2020' && s.year >= 2020) return false;
      }

      if (qNorm) {
        const haystack = stripDiacritics(
          [
            s.title,
            s.titleEn,
            s.trialAcronym,
            s.journal,
            s.drug,
            s.intervention,
            s.population,
            s.primaryEndpoint,
            s.summary,
            s.conditionKey,
            ...s.icd10,
            ...s.topicTags,
            ...s.problemLabels
          ]
            .filter(Boolean)
            .join(' ')
        );
        if (!haystack.includes(qNorm)) return false;
      }

      return true;
    });
  }

  /**
   * Automatically discovers comparable study clusters sharing common labels
   * (same Condition, or same Intervention Class with >= 2 studies).
   */
  public getSmartComparableClusters(): LabelClusterGroup[] {
    this.init();
    const clusters: LabelClusterGroup[] = [];
    const seenStudySets = new Set<string>();

    // 1. Group by Condition Key
    const byCondition = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      const list = byCondition.get(s.conditionKey) || [];
      list.push(s);
      byCondition.set(s.conditionKey, list);
    }

    for (const [condKey, list] of byCondition.entries()) {
      if (list.length >= 2) {
        const sig = list.map((x) => x.id).sort().join('|');
        seenStudySets.add(sig);
        const directions = new Set(list.map((x) => x.outcomeDirection));
        clusters.push({
          clusterKey: `cond:${condKey}`,
          axisLabel: 'Cùng Bệnh / Vấn đề',
          title: RESEARCH_CONDITIONS[condKey] || condKey,
          badgeText: `${list.length} nghiên cứu`,
          studies: list,
          hasDiscordance: directions.size > 1
        });
      }
    }

    // 2. Group by Intervention Class (if distinct from condition cluster)
    const byIntervention = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      const list = byIntervention.get(s.interventionClass) || [];
      list.push(s);
      byIntervention.set(s.interventionClass, list);
    }

    for (const [intvKey, list] of byIntervention.entries()) {
      if (list.length >= 2) {
        const sig = list.map((x) => x.id).sort().join('|');
        if (seenStudySets.has(sig)) continue;
        seenStudySets.add(sig);
        const directions = new Set(list.map((x) => x.outcomeDirection));
        clusters.push({
          clusterKey: `intv:${intvKey}`,
          axisLabel: 'Cùng Nhóm Can thiệp',
          title: INTERVENTION_CLASSES[intvKey] || intvKey,
          badgeText: `${list.length} nghiên cứu`,
          studies: list,
          hasDiscordance: directions.size > 1
        });
      }
    }

    // Sort clusters: prioritize discordant clusters & RCT-rich clusters
    return clusters.sort((a, b) => {
      if (a.hasDiscordance !== b.hasDiscordance) return a.hasDiscordance ? -1 : 1;
      return b.studies.length - a.studies.length;
    });
  }

  /**
   * Finds related studies sharing labels with a target study (for Reader sidebar)
   */
  public getRelatedStudiesByLabels(target: ResearchStudyRecord, limit = 4): Array<{
    study: ResearchStudyRecord;
    sharedBadges: string[];
    score: number;
  }> {
    this.init();
    const scored: Array<{ study: ResearchStudyRecord; sharedBadges: string[]; score: number }> = [];

    for (const candidate of this.studies) {
      if (candidate.id === target.id) continue;
      let score = 0;
      const sharedBadges: string[] = [];

      if (candidate.conditionKey === target.conditionKey) {
        score += 5;
        sharedBadges.push(`Bệnh: ${RESEARCH_CONDITIONS[target.conditionKey] || target.conditionKey}`);
      }
      if (candidate.interventionClass === target.interventionClass) {
        score += 4;
        sharedBadges.push(`Can thiệp: ${INTERVENTION_CLASSES[target.interventionClass] || target.interventionClass}`);
      }
      if (candidate.primaryEndpointCategory === target.primaryEndpointCategory) {
        score += 2;
        sharedBadges.push('Cùng nhóm Kết cục');
      }
      if (candidate.design === target.design) {
        score += 2;
        sharedBadges.push(RESEARCH_DESIGNS[target.design]?.shortLabel || target.design);
      }
      const sharedTopics = candidate.topicTags.filter((t) => target.topicTags.includes(t));
      if (sharedTopics.length > 0) {
        score += sharedTopics.length * 2;
        sharedBadges.push(`#${sharedTopics[0]}`);
      }
      if (candidate.specialty === target.specialty && score === 0) {
        score += 1;
        sharedBadges.push('Cùng Chuyên khoa');
      }
      if (candidate.outcomeDirection !== target.outcomeDirection && candidate.conditionKey === target.conditionKey) {
        score += 3;
        const dirLabel = OUTCOME_DIRECTIONS[candidate.outcomeDirection]?.shortLabel || candidate.outcomeDirection;
        sharedBadges.unshift(`⚡ Đối lập KQ: ${dirLabel}`);
      }

      if (score > 0) {
        scored.push({ study: candidate, sharedBadges: sharedBadges.slice(0, 3), score });
      }
    }

    return scored.sort((a, b) => b.score - a.score || b.study.year - a.study.year).slice(0, limit);
  }
}

export const researchStore = new ResearchVaultStore();
