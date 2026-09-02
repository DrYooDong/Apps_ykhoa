/**
 * CliniPortal 2.0 — Guidelines Hub Type Definitions & Unified Global Window Interface
 * Path: src/content/ebm/guidelines/guidelines-types.ts
 */

export interface StudyPart {
  title: string;
  file: string;
  summary?: string;
  label?: string;
}

export interface Study {
  id: string;
  title: string;
  titleEn?: string;
  author?: string;
  drug?: string;
  sourceType: 'intl-study' | 'intl-guideline' | 'vn-moh' | 'vn-doh' | 'vn-association' | string;
  specialty: string;
  specialty2?: string;
  specialties?: string[];
  design: 'rct' | 'meta' | 'cohort' | 'guideline' | 'review' | 'case-report' | 'other' | string;
  intervention?: string;
  primaryEndpoint?: string;
  keyResults?: string;
  impact: 'practice-changing' | 'informative' | 'early-signal' | 'negative' | 'regulatory' | string;
  year: number;
  organization?: string;
  journal?: string;
  phase?: string;
  sampleSize?: number | null;
  population?: string;
  summary?: string;
  detailedConclusion?: string;
  fdaStatus?: string;
  sourceUrl?: string;
  file?: string;
  asianData?: boolean;
  bookmarked?: boolean;
  parts?: StudyPart[] | string;
  icd10?: string[] | string;
  subgroups?: Record<string, string> | string;
  conditionKey?: string | null;
  createdAt?: string;
  impactFactor?: number | null;
  if?: number | null;
  quartile?: string;
  sjr?: number | null;
  snip?: number | null;
  hIndex?: number | null;
  publisher?: string;
  oldRegimen?: string;
  newRegimen?: string;
}

export interface JournalLookupResult {
  name: string;
  journal: string;
  aliases: string[];
  if: number | null;
  quartile: string;
  sjr: number | null;
  snip: number | null;
  hIndex: number | null;
  category: string;
  publisher: string;
  issn: string;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  score: number;
  matchedStudy: Study | null;
  reasons: string[];
  matchLevel: 'none' | 'moderate' | 'high' | 'exact';
}

export interface BatchDuplicateItem {
  item: Study;
  dupResult: DuplicateCheckResult;
  action?: 'overwrite' | 'skip' | 'new';
  raw?: any;
}

export interface SupabaseConfig {
  url: string;
  key: string;
}

export type DbStatus = 'connected' | 'disconnected' | 'error';

export interface ColumnVisibilityState {
  sourceType: boolean;
  specialty: boolean;
  design: boolean;
  organization: boolean;
  journalMetrics: boolean;
  intervention: boolean;
  primaryEndpoint: boolean;
  keyResults: boolean;
  impact: boolean;
  conclusion: boolean;
  sampleSize: boolean;
  population: boolean;
  icd10: boolean;
  [key: string]: boolean;
}

export interface FilterState {
  search: string;
  sourceType: string | null;
  specialty: string | null;
  condition: string | null;
  design: string | null;
  impact: string | null;
  period: string | null;
  asianData: boolean;
  hasSubgroup: boolean;
  hasSummary: boolean;
  icd10: string | null;
}

export interface SpecialtyMeta {
  name: string;
  color: string;
  bg: string;
}

export interface SourceTypeMeta {
  name: string;
  color: string;
  bg: string;
}

export interface DesignMeta {
  name: string;
}

export interface ImpactMeta {
  name: string;
  color: string;
  bg: string;
}

export interface ClinicalConditionMeta {
  id: string;
  name: string;
  icd10: string[];
  color: string;
  bg: string;
  specialty?: string;
}

export interface PredatoryAuditResult {
  riskLevel: 'HIGH' | 'MEDIUM' | 'WARN' | 'SAFE';
  isPredatory: boolean;
  scoreDeduction: number;
  flags: Array<{ type: string; severity: string; title: string; detail: string }>;
  summary: string;
}

export interface JournalQualityProfile {
  journalName: string;
  metrics: any;
  trustScore: {
    score: number;
    grade: string;
    color: string;
    level: string;
    breakdown: Record<string, number>;
  };
  predatoryAudit: PredatoryAuditResult | null;
  recommendation: string;
}

declare global {
  interface Window {
    studies: Study[];
    selectedIds: Set<string>;
    expandedIds: Set<string>;
    filters: FilterState;
    sortField: string;
    sortAsc: boolean;
    viewMode: 'full' | 'compact';
    currentTab: string;
    showAdvancedFilters: boolean;
    isMobileView: boolean;
    columnVisibility: ColumnVisibilityState;

    SPECIALTIES: Record<string, SpecialtyMeta>;
    SOURCE_TYPES: Record<string, SourceTypeMeta>;
    DESIGNS: Record<string, DesignMeta>;
    IMPACTS: Record<string, ImpactMeta>;
    CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta>;
    DEFAULT_CLINICAL_CONDITIONS: Record<string, ClinicalConditionMeta>;
    CONDITION_SPECIALTY_MAP: Record<string, string[]>;
    JOURNAL_METRICS_DATABASE: Record<string, any>;
    SAMPLE_STUDIES: Study[];
    PREDATORY_PUBLISHERS: Array<{ name: string; aliases: string[]; risk: string; reason: string }>;
    FAKE_METRIC_NAMES: Array<{ name: string; abbr: string }>;

    GuidelineTools?: any;
    CliniPortalDrugLinker?: any;
    GuidelineVisualizations?: any;
    supabase?: any;
    supabaseClient?: any;
    _warmSupabaseClient?: any;
    supabaseConfig?: SupabaseConfig;
    dbStatus?: DbStatus;
    ICD10_MAP?: Map<string, string>;
    ICD10_DATA?: Array<{ code: string; name: string }>;
    CliniPortalSync?: { notifyUpdate?: () => void };

    getJournalQualityProfile?: (name: string, study?: any) => JournalQualityProfile | null;
    getJournalMetrics?: (name?: string, study?: any) => any;
    auditPredatoryRisk?: (journalObjOrName: any, publisher?: string, issn?: string) => PredatoryAuditResult;
    searchOpenAlexJournals?: (query: string) => Promise<any[]>;
    normalizeOpenAlexSource?: (item: any) => any;
    calculateJournalTrustScore?: (metrics: any, predatoryAudit?: any) => any;
    autoLookupJournalMetrics?: () => Promise<void>;
    handleJournalInput?: (val: string) => void;
    selectJournalSuggestion?: (key: string) => void;
    hideJournalSuggestions?: () => void;

    initSearchInput?: () => void;
    performJournalSearch?: (query: string) => Promise<void>;
    renderJournalTable?: () => void;
    loadPresetCompare?: (journals: string[]) => void;

    renderStudyMiniChart?: (study?: Study) => string;
    renderSubgroupForestPlot?: (subgroups: any) => string;
    renderKeyResultsChart?: (keyResults?: string) => string;
    renderCompareView?: () => void;
    renderAnalytics?: () => void;
    renderTimeline?: () => void;
    renderGuidelineDashboard?: (studies: Study[]) => void;
    renderEvidenceGapMap?: (studies: Study[]) => string;
    renderCompareMatrix?: () => void;
    renderComparison?: () => void;
    renderMultiCompareTable?: () => void;
    renderUpdates?: () => void;
    renderTable?: () => void;
    renderFilterPills?: () => void;

    openEditModal?: (id: string) => void;
    openAddModal?: () => void;
    closeAddModal?: () => void;
    closeStudyModal?: () => void;
    saveStudyForm?: (event?: Event) => void;
    handleFormSubmit?: (event?: Event) => void;
    openImportModal?: () => void;
    closeImportModal?: () => void;
    handleImportJson?: () => void;
    importFromText?: () => void;
    handleFileSelect?: (event: any) => void;
    fillSampleJSON?: () => void;
    openDuplicateResolutionModal?: () => void;
    closeDuplicateResolutionModal?: () => void;
    applyGlobalDupAction?: (action: string) => void;
    setPerItemDupAction?: (index: number, action: string) => void;
    executeDuplicateImport?: () => void;
    openConditionSettingsModal?: () => void;
    closeConditionSettingsModal?: () => void;
    renderConditionManagementTable?: () => void;
    openConditionEditModal?: (key?: string) => void;
    closeConditionEditModal?: () => void;
    handleSaveConditionForm?: (event?: Event) => void;
    deleteConditionItem?: (key: string) => void;
    resetConditionRegistryDefault?: () => void;

    openCaseModal?: () => void;
    closeCaseModal?: () => void;
    handleCaseAnalysis?: (event?: Event) => void;
    copyEbmClinicalNote?: (idx: number) => void;
    copyAllEbmClinicalNotes?: () => void;
    openCommandPalette?: () => void;
    closeCommandPalette?: () => void;
    toggleCommandPalette?: () => void;
    handleCmdInput?: (e: any) => void;
    executeCmdIndex?: (idx: number) => void;
    initCommandPalette?: () => void;

    addToCompare?: (studyId: string) => void;
    removeFromCompare?: (studyId: string) => void;
    clearCompareList?: () => void;
    updateFloatingCompareBar?: () => void;
    openMultiCompareModal?: () => void;
    closeMultiCompareModal?: () => void;

    syncCurrentSpecialtyOffline?: () => void;
    openIcdFilterModal?: () => void;
    closeIcdFilterModal?: () => void;
    toggleHasSummaryFilter?: () => void;
    handleAsianFilterChange?: () => void;
    setCompareMode?: (mode: string) => void;
    clearComparison?: () => void;
    addSummaryPartRow?: (title?: string, file?: string) => void;
    closePocketModal?: () => void;
    closeCitationModal?: () => void;
    closeDecisionModal?: () => void;
    closeSubgroupModal?: () => void;
    closeNntModal?: () => void;
    calculateNNTFromHR?: () => void;
    calculateNNT?: () => void;

    setFilter?: (type: string, value: any) => void;
    handleSearch?: (e: any) => void;
    filterByHasSummary?: () => void;
    filterBySubgroupData?: () => void;
    filterByAsianData?: () => void;
    filterBySourceType?: (src: string) => void;
    filterByStudyId?: (id: string) => void;
    resetFilters?: () => void;
    switchTab?: (tabName: string) => void;
    setViewMode?: (mode: 'full' | 'compact') => void;
    toggleAdvancedFilters?: () => void;
    toggleColumnsDropdown?: (event?: Event) => void;
    toggleColumnVisibility?: (colName: string, isVisible: boolean) => void;
    renderSummaryButton?: (study: Study, variant?: string) => string;
    renderSummaryActionButton?: (study: Study) => string;
    toggleSummaryPartsMenu?: (menuId: string, event?: Event) => void;
    getFilteredStudies?: () => Study[];
    toggleSelectStudy?: (id: string, isChecked: boolean) => void;
    toggleSelectAllRows?: (isChecked: boolean) => void;
    toggleBookmark?: (id: string, event?: Event) => void;
    toggleExpandRow?: (id: string) => void;
    deleteStudy?: (id: string) => void;
    deleteSelectedStudies?: () => void;

    toggleSidebar?: () => void;
    closeMobileSidebar?: () => void;
    initSidebarState?: () => void;
    toggleActionsDropdown?: (dropdownId: string, event?: Event) => void;
    closeAllActionsDropdowns?: () => void;
    toggleSettingsMenu?: (event?: Event) => void;
    closeSettingsMenu?: () => void;
    parseUrlState?: () => void;
    toggleRecentUpdatesSec?: () => void;
    resolveStudyFile?: (file?: string) => string;
    getIcd10Name?: (code?: string) => string;

    initSupabase?: () => boolean;
    getSupabaseConfig?: () => SupabaseConfig | null;
    setSupabaseConfig?: (url: string, key: string) => void;
    clearSupabaseConfig?: () => void;
    openSupabaseModal?: () => void;
    closeSupabaseModal?: () => void;
    saveSupabaseConfig?: (event?: Event) => void;
    handleSaveSupabaseConfig?: (event?: Event) => void;
    handleDisconnectSupabase?: () => void;
    testSupabaseConnection?: () => Promise<void>;
    updateSupabaseStatus?: (status: DbStatus, text: string) => void;
    dbFetchStudies?: () => Promise<Study[] | null>;
    dbSaveStudy?: (study: Study, silent?: boolean) => Promise<void | boolean>;
    dbDeleteStudy?: (id: string) => Promise<void | boolean>;
    syncStudiesWithSupabase?: () => Promise<void>;
    syncAllLocalToSupabase?: () => Promise<void>;
    loadStudies?: () => void;
    saveStudies?: () => void;
    detectStudyDuplicate?: (study: any, list: any[]) => DuplicateCheckResult;
    batchCheckDuplicates?: (raw: any[], existing: any[]) => BatchDuplicateItem[];
    normalizeMedicalTitle?: (str?: string) => string;
    normalizeOrgName?: (str?: string) => string;
    getDeletedStudyIds?: () => string[];
    saveDeletedStudyId?: (id: string) => void;
    removeDeletedStudyId?: (id: string) => void;
    isStudyDeleted?: (study: Study, deletedList?: string[]) => boolean;
    extractCoreKey?: (title?: string) => string;
    processStudyFields?: (raw: any) => Study;
    processAndDeduplicateStudies?: (list: any[]) => Study[];
    generateId?: () => string;
    updateChartPreview?: () => void;
    updateSubgroupPreview?: () => void;
    initJournalQualityBadge?: () => void;
  }
}
