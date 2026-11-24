/**
 * CliniPortal 2.0 — Shared Journal Intelligence & Bibliometric Lookup
 * Path: src/content/ebm/shared-core/journal-intelligence.ts
 *
 * Pure, stateless journal impact & quartile resolver shared across EBM modules.
 */

export interface SharedJournalMetric {
  name: string;
  shortName: string;
  impactFactor: number | null;
  quartile: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Indexed';
  sjr: number | null;
  publisher: string;
}

const JOURNAL_INDEX: Array<{ keys: string[]; meta: SharedJournalMetric }> = [
  {
    keys: ['n engl j med', 'nejm', 'new england journal of medicine'],
    meta: { name: 'The New England Journal of Medicine', shortName: 'NEJM', impactFactor: 158.5, quartile: 'Q1', sjr: 14.52, publisher: 'MMS' }
  },
  {
    keys: ['lancet infect dis', 'lancet infectious diseases'],
    meta: { name: 'The Lancet Infectious Diseases', shortName: 'Lancet Infect Dis', impactFactor: 56.3, quartile: 'Q1', sjr: 9.85, publisher: 'Elsevier' }
  },
  {
    keys: ['lancet hiv'],
    meta: { name: 'The Lancet HIV', shortName: 'Lancet HIV', impactFactor: 16.1, quartile: 'Q1', sjr: 5.4, publisher: 'Elsevier' }
  },
  {
    keys: ['lancet', 'the lancet'],
    meta: { name: 'The Lancet', shortName: 'The Lancet', impactFactor: 168.9, quartile: 'Q1', sjr: 15.68, publisher: 'Elsevier' }
  },
  {
    keys: ['jama', 'journal of the american medical association'],
    meta: { name: 'JAMA', shortName: 'JAMA', impactFactor: 120.7, quartile: 'Q1', sjr: 9.85, publisher: 'AMA' }
  },
  {
    keys: ['nat med', 'nature medicine', 'nature reviews'],
    meta: { name: 'Nature Medicine / Nature Reviews', shortName: 'Nature Portfolio', impactFactor: 82.9, quartile: 'Q1', sjr: 18.25, publisher: 'Springer Nature' }
  },
  {
    keys: ['bmj', 'british medical journal'],
    meta: { name: 'BMJ', shortName: 'BMJ', impactFactor: 105.7, quartile: 'Q1', sjr: 4.82, publisher: 'BMJ Group' }
  },
  {
    keys: ['circulation'],
    meta: { name: 'Circulation', shortName: 'Circulation', impactFactor: 37.8, quartile: 'Q1', sjr: 6.95, publisher: 'AHA / LWW' }
  },
  {
    keys: ['eur heart j', 'european heart journal'],
    meta: { name: 'European Heart Journal', shortName: 'Eur Heart J', impactFactor: 39.3, quartile: 'Q1', sjr: 7.21, publisher: 'Oxford' }
  },
  {
    keys: ['intensive care med', 'esicm'],
    meta: { name: 'Intensive Care Medicine', shortName: 'Intensive Care Med', impactFactor: 38.9, quartile: 'Q1', sjr: 6.45, publisher: 'Springer' }
  },
  {
    keys: ['am j respir crit care med', 'ajrccm'],
    meta: { name: 'Am J Respir Crit Care Med', shortName: 'AJRCCM', impactFactor: 19.3, quartile: 'Q1', sjr: 4.85, publisher: 'ATS' }
  },
  {
    keys: ['chest'],
    meta: { name: 'CHEST Journal', shortName: 'CHEST', impactFactor: 9.6, quartile: 'Q1', sjr: 2.15, publisher: 'Elsevier' }
  },
  {
    keys: ['j crit care', 'journal of critical care', 'crit care clin'],
    meta: { name: 'Journal of Critical Care / Crit Care Clin', shortName: 'J Crit Care', impactFactor: 4.2, quartile: 'Q1', sjr: 1.32, publisher: 'Elsevier' }
  },
  {
    keys: ['nutrients'],
    meta: { name: 'Nutrients', shortName: 'Nutrients', impactFactor: 4.8, quartile: 'Q1', sjr: 1.25, publisher: 'MDPI' }
  },
  {
    keys: ['diagnostics'],
    meta: { name: 'Diagnostics', shortName: 'Diagnostics', impactFactor: 3.0, quartile: 'Q2', sjr: 0.72, publisher: 'MDPI' }
  },
  {
    keys: ['infection'],
    meta: { name: 'Infection', shortName: 'Infection', impactFactor: 5.4, quartile: 'Q1', sjr: 1.48, publisher: 'Springer' }
  },
  {
    keys: ['current opinion in neurology', 'curr opin neurol'],
    meta: { name: 'Current Opinion in Neurology', shortName: 'Curr Opin Neurol', impactFactor: 4.1, quartile: 'Q1', sjr: 1.28, publisher: 'Wolters Kluwer' }
  },
  {
    keys: ['american journal of roentgenology', 'ajr'],
    meta: { name: 'American Journal of Roentgenology', shortName: 'AJR', impactFactor: 4.7, quartile: 'Q1', sjr: 1.55, publisher: 'ARRS' }
  },
  {
    keys: ['cureus'],
    meta: { name: 'Cureus Journal of Medical Science', shortName: 'Cureus', impactFactor: 1.2, quartile: 'Q3', sjr: 0.38, publisher: 'Springer Nature' }
  }
];

export function lookupSharedJournalMetric(journalRaw?: string): SharedJournalMetric | null {
  if (!journalRaw) return null;
  const normalized = journalRaw.trim().toLowerCase();
  for (const entry of JOURNAL_INDEX) {
    if (entry.keys.some((k) => normalized === k || normalized.includes(k))) {
      return entry.meta;
    }
  }
  return null;
}
