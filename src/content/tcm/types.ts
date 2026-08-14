/**
 * CliniPortal — Traditional Chinese Medicine Module Type Definitions
 */

export interface TcmHerb {
  name: string;
  latin: string;
  pinyin: string;
  taste: string;
  meridians: string;
  actions: string;
  indications: string;
  contra: string;
  icon: string;
}

export interface MeridianClockHour {
  id: number;
  zodiac: string;
  timeStr: string;
  startHour: number;
  endHour: number;
  name: string;
  fullName: string;
  element: string;
  elClass: string;
  desc: string;
  advice: string;
}

export interface AcupointItem {
  code: string;
  name: string;
  pinyin: string;
  meridian: string;
  location: string;
  indications: string;
  needleTechnique: string;
}

export interface IntegrativeProtocolItem {
  id: string;
  westernDisease: string;
  tcmPattern: string;
  westernTreatment: string;
  tcmFormula: string;
  acupoints: string[];
  evidenceNote: string;
}
