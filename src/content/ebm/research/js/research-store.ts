/**
 * CliniPortal 2.0 — CliniResearch Studio Isolated State, Label Indexer & LocalStorage Store
 * Path: src/content/ebm/research/js/research-store.ts
 *
 * Completely independent from Guidelines store (`cliniportal_custom_studies`).
 * Powers:
 *  - 9-Axis Atomic Label Indexing & Cross-Study Lookup
 *  - Multi-Faceted Filtering + Multi-Criteria Sorting
 *  - Persistent Comparison Tray (up to 5 studies) + Pinned Baseline Study + Custom Axis Toggles
 *  - Personal Study Notes & Bookmarks (localStorage)
 */

import { lookupSharedJournalMetric } from '../../shared-core';
import { KHO_RESEARCH_STATIC } from './research-registry';
import {
  decomposeStudyLabels,
  GRADE_LABELS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  TOPIC_TAGS_VI
} from './research-taxonomy';
import type {
  AtomicLabelAxis,
  CompareMatrixGroupKey,
  IndexedLabelSummary,
  LabelClusterGroup,
  ResearchAtomicLabel,
  ResearchCompareTab,
  ResearchFilterState,
  ResearchSortKey,
  ResearchStudyRecord,
  ResearchViewMode
} from './research-types';

const LS_BOOKMARKS_KEY = 'cliniportal_research_vault_bookmarks_v1';
const LS_COMPARE_KEY = 'cliniportal_research_vault_compare_v1';
const LS_CUSTOM_KEY = 'cliniportal_research_vault_custom_v1';
const LS_NOTES_KEY = 'cliniportal_research_vault_notes_v1';

const ALL_COMPARE_GROUPS: CompareMatrixGroupKey[] = [
  'identity',
  'condition',
  'design',
  'pico',
  'quant',
  'appraisal',
  'clinical'
];

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
  private notesMap: Record<string, string> = {};
  private viewMode: ResearchViewMode = 'cards';
  private sortBy: ResearchSortKey = 'year-desc';
  private activeCompareTab: ResearchCompareTab = 'matrix';
  private diffHighlightOnly = false;
  private pinnedBaselineId: string | null = null;
  private activeCompareGroups: Set<CompareMatrixGroupKey> = new Set(ALL_COMPARE_GROUPS);
  private previewStudyId: string | null = null;

  public filters: ResearchFilterState = {
    search: '',
    specialty: null,
    conditionKey: null,
    problemLabel: null,
    populationTag: null,
    design: null,
    comparatorType: null,
    outcomeDirection: null,
    impactVerdict: null,
    interventionClass: null,
    endpointCategory: null,
    robOverall: null,
    gradeCertainty: null,
    fundingSource: null,
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
        const rawNotes = localStorage.getItem(LS_NOTES_KEY);
        if (rawNotes) {
          const parsed: unknown = JSON.parse(rawNotes);
          if (parsed && typeof parsed === 'object') {
            this.notesMap = parsed as Record<string, string>;
          }
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
        bookmarked: this.bookmarkedIds.has(item.id),
        personalNote: this.notesMap[item.id] || ''
      });
    }
    for (const custom of customList) {
      if (custom && custom.id) {
        mergedMap.set(custom.id, {
          ...custom,
          bookmarked: this.bookmarkedIds.has(custom.id),
          personalNote: this.notesMap[custom.id] || ''
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

  private persistNotes(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(LS_NOTES_KEY, JSON.stringify(this.notesMap));
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

  public getSortBy(): ResearchSortKey {
    return this.sortBy;
  }

  public setSortBy(sort: ResearchSortKey): void {
    this.sortBy = sort;
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

  public getPinnedBaselineId(): string | null {
    if (this.pinnedBaselineId && !this.compareIds.has(this.pinnedBaselineId)) {
      this.pinnedBaselineId = null;
    }
    return this.pinnedBaselineId;
  }

  public togglePinnedBaseline(id: string): void {
    this.pinnedBaselineId = this.pinnedBaselineId === id ? null : id;
  }

  public isCompareGroupVisible(group: CompareMatrixGroupKey): boolean {
    return this.activeCompareGroups.has(group);
  }

  public toggleCompareGroup(group: CompareMatrixGroupKey): void {
    if (this.activeCompareGroups.has(group)) {
      if (this.activeCompareGroups.size > 1) {
        this.activeCompareGroups.delete(group);
      }
    } else {
      this.activeCompareGroups.add(group);
    }
  }

  public resetCompareGroups(): void {
    this.activeCompareGroups = new Set(ALL_COMPARE_GROUPS);
  }

  public setPreviewStudyId(id: string | null): void {
    this.previewStudyId = id;
  }

  public getPreviewStudy(): ResearchStudyRecord | null {
    if (!this.previewStudyId) return null;
    return this.getStudyBySlugOrId(this.previewStudyId) || null;
  }

  // ── Personal Study Notes ──
  public getPersonalNote(id: string): string {
    this.init();
    return this.notesMap[id] || '';
  }

  public setPersonalNote(id: string, note: string): void {
    this.init();
    const cleaned = note.trim();
    if (cleaned) this.notesMap[id] = cleaned;
    else delete this.notesMap[id];
    const target = this.studies.find((s) => s.id === id);
    if (target) target.personalNote = cleaned;
    this.persistNotes();
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

  // ── Compare Tray Management (Max 5 studies) ──
  public isInCompare(id: string): boolean {
    this.init();
    return this.compareIds.has(id);
  }

  public toggleCompare(id: string): { added: boolean; limitReached: boolean; count: number } {
    this.init();
    if (this.compareIds.has(id)) {
      this.compareIds.delete(id);
      if (this.pinnedBaselineId === id) this.pinnedBaselineId = null;
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
    this.pinnedBaselineId = null;
    ids
      .map((raw) => this.getStudyBySlugOrId(raw)?.id)
      .filter((id): id is string => Boolean(id))
      .slice(0, 5)
      .forEach((id) => this.compareIds.add(id));
    this.persistCompare();
  }

  public clearCompare(): void {
    this.init();
    this.compareIds.clear();
    this.pinnedBaselineId = null;
    this.persistCompare();
  }

  public getCompareStudies(): ResearchStudyRecord[] {
    this.init();
    const list = Array.from(this.compareIds)
      .map((id) => this.studies.find((s) => s.id === id))
      .filter((s): s is ResearchStudyRecord => Boolean(s));

    // Place pinned baseline study first so side-by-side diffs always read left-to-right from anchor
    const pinned = this.getPinnedBaselineId();
    if (pinned) {
      const idx = list.findIndex((s) => s.id === pinned);
      if (idx > 0) {
        const [anchor] = list.splice(idx, 1);
        list.unshift(anchor);
      }
    }
    return list;
  }

  // ── Multi-Axis Faceted Filter Engine ──
  public resetFilters(): void {
    this.filters = {
      search: '',
      specialty: null,
      conditionKey: null,
      problemLabel: null,
      populationTag: null,
      design: null,
      comparatorType: null,
      outcomeDirection: null,
      impactVerdict: null,
      interventionClass: null,
      endpointCategory: null,
      robOverall: null,
      gradeCertainty: null,
      fundingSource: null,
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
      f.problemLabel,
      f.populationTag,
      f.design,
      f.comparatorType,
      f.outcomeDirection,
      f.impactVerdict,
      f.interventionClass,
      f.endpointCategory,
      f.robOverall,
      f.gradeCertainty,
      f.fundingSource,
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

    const list = this.studies.filter((s) => {
      if (f.savedOnly && !s.bookmarked) return false;
      if (f.asianOnly && !s.asianData) return false;
      if (f.specialty && s.specialty !== f.specialty && s.specialty2 !== f.specialty) return false;
      if (f.conditionKey && s.conditionKey !== f.conditionKey) return false;
      if (f.problemLabel && !(s.problemLabels || []).includes(f.problemLabel)) return false;
      if (f.populationTag && !(s.populationTags || []).includes(f.populationTag)) return false;
      if (f.design && s.design !== f.design) return false;
      if (f.comparatorType && s.comparatorType !== f.comparatorType) return false;
      if (f.outcomeDirection && s.outcomeDirection !== f.outcomeDirection) return false;
      if (f.impactVerdict && s.impactVerdict !== f.impactVerdict) return false;
      if (f.interventionClass && s.interventionClass !== f.interventionClass) return false;
      if (f.endpointCategory && s.primaryEndpointCategory !== f.endpointCategory) return false;
      if (f.robOverall && s.robOverall !== f.robOverall) return false;
      if (f.gradeCertainty && s.gradeCertainty !== f.gradeCertainty) return false;
      if (f.fundingSource && s.fundingSource !== f.fundingSource) return false;
      if (f.topicTag && !(s.topicTags || []).includes(f.topicTag) && !(s.problemLabels || []).includes(f.topicTag)) {
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
            RESEARCH_CONDITIONS[s.conditionKey],
            INTERVENTION_CLASSES[s.interventionClass],
            ...(s.icd10 || []),
            ...(s.topicTags || []),
            ...(s.problemLabels || []),
            ...(s.populationTags || [])
          ]
            .filter(Boolean)
            .join(' ')
        );
        if (!haystack.includes(qNorm)) return false;
      }

      return true;
    });

    return this.sortStudies(list);
  }

  private sortStudies(list: ResearchStudyRecord[]): ResearchStudyRecord[] {
    const sorted = [...list];
    if (this.sortBy === 'sample-desc') {
      sorted.sort((a, b) => (b.sampleSize || 0) - (a.sampleSize || 0) || b.year - a.year);
    } else if (this.sortBy === 'if-desc') {
      sorted.sort((a, b) => {
        const ifA = lookupSharedJournalMetric(a.journal)?.impactFactor || 0;
        const ifB = lookupSharedJournalMetric(b.journal)?.impactFactor || 0;
        return ifB - ifA || b.year - a.year;
      });
    } else if (this.sortBy === 'grade-desc') {
      sorted.sort((a, b) => {
        const gA = GRADE_LABELS[a.gradeCertainty]?.rank || 0;
        const gB = GRADE_LABELS[b.gradeCertainty]?.rank || 0;
        return gB - gA || b.year - a.year;
      });
    } else {
      sorted.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title, 'vi'));
    }
    return sorted;
  }

  /**
   * Builds a complete inverted index of ALL atomic labels grouped by axis,
   * powering the interactive Label Atlas & instant label-to-study lookup.
   */
  public getAtomicLabelIndex(): Record<AtomicLabelAxis, IndexedLabelSummary[]> {
    this.init();
    const mapByKey = new Map<string, { label: ResearchAtomicLabel; studies: ResearchStudyRecord[] }>();

    for (const s of this.studies) {
      const decomposed = decomposeStudyLabels(s);
      const seen = new Set<string>();
      for (const lbl of decomposed) {
        if (seen.has(lbl.key)) continue;
        seen.add(lbl.key);
        const existing = mapByKey.get(lbl.key);
        if (existing) {
          existing.studies.push(s);
        } else {
          mapByKey.set(lbl.key, { label: lbl, studies: [s] });
        }
      }
    }

    const grouped: Record<AtomicLabelAxis, IndexedLabelSummary[]> = {
      condition: [],
      population: [],
      design: [],
      intervention: [],
      comparator: [],
      endpoint: [],
      outcome: [],
      quality: [],
      topic: []
    };

    for (const item of mapByKey.values()) {
      const dirs = new Set(item.studies.map((s) => s.outcomeDirection));
      const positiveCount = item.studies.filter((s) => s.outcomeDirection === 'positive-superior').length;
      const neutralOrHarmCount = item.studies.filter(
        (s) =>
          s.outcomeDirection === 'neutral-null' ||
          s.outcomeDirection === 'harm-negative' ||
          s.outcomeDirection === 'mixed-coprimary'
      ).length;

      grouped[item.label.axis].push({
        label: item.label,
        studies: item.studies,
        hasDiscordance: item.studies.length >= 2 && dirs.size > 1,
        positiveCount,
        neutralOrHarmCount
      });
    }

    (Object.keys(grouped) as AtomicLabelAxis[]).forEach((axis) => {
      grouped[axis].sort(
        (a, b) =>
          b.studies.length - a.studies.length ||
          (b.hasDiscordance ? 1 : 0) - (a.hasDiscordance ? 1 : 0) ||
          a.label.label.localeCompare(b.label.label, 'vi')
      );
    });

    return grouped;
  }

  /**
   * Finds all studies carrying a specific atomic label key (e.g. `condition:dyslipidemia`).
   */
  public getStudiesByAtomicLabelKey(labelKey: string): ResearchStudyRecord[] {
    this.init();
    return this.studies.filter((s) => decomposeStudyLabels(s).some((l) => l.key === labelKey));
  }

  /**
   * Automatically discovers comparable study clusters sharing common labels
   * across Condition, Intervention Class, Primary Endpoint Category, and Topic Tags.
   */
  public getSmartComparableClusters(): LabelClusterGroup[] {
    this.init();
    const clusters: LabelClusterGroup[] = [];
    const seenStudySets = new Set<string>();

    const tryPush = (
      clusterKey: string,
      axis: AtomicLabelAxis,
      axisLabel: string,
      title: string,
      list: ResearchStudyRecord[]
    ): void => {
      if (list.length < 2) return;
      const sig = list.map((x) => x.id).sort().join('|');
      if (seenStudySets.has(sig)) return;
      seenStudySets.add(sig);
      const directions = new Set(list.map((x) => x.outcomeDirection));
      clusters.push({
        clusterKey,
        axis,
        axisLabel,
        title,
        badgeText: `${list.length} nghiên cứu`,
        studies: list,
        hasDiscordance: directions.size > 1
      });
    };

    // 1. Group by Condition Key
    const byCondition = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      const list = byCondition.get(s.conditionKey) || [];
      list.push(s);
      byCondition.set(s.conditionKey, list);
    }
    for (const [condKey, list] of byCondition.entries()) {
      tryPush(
        `cond:${condKey}`,
        'condition',
        'Cùng Bệnh / Vấn đề',
        RESEARCH_CONDITIONS[condKey] || condKey,
        list
      );
    }

    // 2. Group by Intervention Class
    const byIntervention = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      const list = byIntervention.get(s.interventionClass) || [];
      list.push(s);
      byIntervention.set(s.interventionClass, list);
    }
    for (const [intvKey, list] of byIntervention.entries()) {
      tryPush(
        `intv:${intvKey}`,
        'intervention',
        'Cùng Nhóm Can thiệp',
        INTERVENTION_CLASSES[intvKey] || intvKey,
        list
      );
    }

    // 3. Group by Endpoint Category (e.g. MACE trials across SGLT2i + Statin)
    const byEndpoint = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      const list = byEndpoint.get(s.primaryEndpointCategory) || [];
      list.push(s);
      byEndpoint.set(s.primaryEndpointCategory, list);
    }
    for (const [epKey, list] of byEndpoint.entries()) {
      if (epKey === 'mace' || epKey === 'severity-prognosis') {
        tryPush(
          `ep:${epKey}`,
          'endpoint',
          'Cùng Tiêu chí Kết cục',
          epKey === 'mace' ? 'Cụm Thử Nghiệm Biến Cố MACE' : 'Cụm Tiên Lượng Độ Nặng',
          list
        );
      }
    }

    // 4. Group by Topic Tag
    const byTopic = new Map<string, ResearchStudyRecord[]>();
    for (const s of this.studies) {
      for (const t of s.topicTags || []) {
        const list = byTopic.get(t) || [];
        list.push(s);
        byTopic.set(t, list);
      }
    }
    for (const [topicKey, list] of byTopic.entries()) {
      tryPush(`topic:${topicKey}`, 'topic', 'Cùng Chủ đề', TOPIC_TAGS_VI[topicKey] || `#${topicKey}`, list);
    }

    return clusters.sort((a, b) => {
      if (a.hasDiscordance !== b.hasDiscordance) return a.hasDiscordance ? -1 : 1;
      return b.studies.length - a.studies.length;
    });
  }

  /**
   * Finds related studies sharing atomic labels with a target study (for Reader sidebar & Compare Picker)
   */
  public getRelatedStudiesByLabels(
    target: ResearchStudyRecord,
    limit = 4
  ): Array<{
    study: ResearchStudyRecord;
    sharedBadges: string[];
    sharedLabelCount: number;
    similarityPercent: number;
    score: number;
    isDiscordant: boolean;
  }> {
    this.init();
    const targetLabels = decomposeStudyLabels(target);
    const targetKeySet = new Set(targetLabels.map((l) => l.key));

    const scored: Array<{
      study: ResearchStudyRecord;
      sharedBadges: string[];
      sharedLabelCount: number;
      similarityPercent: number;
      score: number;
      isDiscordant: boolean;
    }> = [];

    for (const candidate of this.studies) {
      if (candidate.id === target.id) continue;
      const candLabels = decomposeStudyLabels(candidate);
      const sharedAtomic = candLabels.filter((l) => targetKeySet.has(l.key));
      const unionSize = new Set([...targetKeySet, ...candLabels.map((l) => l.key)]).size || 1;
      const similarityPercent = Math.round((sharedAtomic.length / unionSize) * 100);

      let score = 0;
      const sharedBadges: string[] = [];
      let isDiscordant = false;

      if (candidate.conditionKey === target.conditionKey) {
        score += 6;
        sharedBadges.push(`Bệnh: ${RESEARCH_CONDITIONS[target.conditionKey] || target.conditionKey}`);
      }
      if (candidate.interventionClass === target.interventionClass) {
        score += 5;
        sharedBadges.push(`Can thiệp: ${INTERVENTION_CLASSES[target.interventionClass] || target.interventionClass}`);
      }
      if (candidate.primaryEndpointCategory === target.primaryEndpointCategory) {
        score += 3;
        sharedBadges.push('Cùng nhóm Kết cục');
      }
      if (candidate.design === target.design) {
        score += 2;
        sharedBadges.push(RESEARCH_DESIGNS[target.design]?.shortLabel || target.design);
      }
      const sharedTopics = (candidate.topicTags || []).filter((t) => (target.topicTags || []).includes(t));
      if (sharedTopics.length > 0) {
        score += sharedTopics.length * 2;
        sharedBadges.push(`#${TOPIC_TAGS_VI[sharedTopics[0]] || sharedTopics[0]}`);
      }
      if (candidate.specialty === target.specialty && score === 0) {
        score += 1;
        sharedBadges.push('Cùng Chuyên khoa');
      }
      if (
        candidate.outcomeDirection !== target.outcomeDirection &&
        (candidate.conditionKey === target.conditionKey || candidate.interventionClass === target.interventionClass)
      ) {
        score += 4;
        isDiscordant = true;
        const dirLabel = OUTCOME_DIRECTIONS[candidate.outcomeDirection]?.shortLabel || candidate.outcomeDirection;
        sharedBadges.unshift(`⚡ Trái chiều KQ: ${dirLabel}`);
      }

      if (score > 0 || sharedAtomic.length > 0) {
        scored.push({
          study: candidate,
          sharedBadges: sharedBadges.slice(0, 3),
          sharedLabelCount: sharedAtomic.length,
          similarityPercent,
          score: score + sharedAtomic.length,
          isDiscordant
        });
      }
    }

    return scored.sort((a, b) => b.score - a.score || b.study.year - a.study.year).slice(0, limit);
  }
}

export const researchStore = new ResearchVaultStore();
