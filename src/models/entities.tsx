export type Program = {
  id: number;
  vekova_kat: VekKat;
  kategoria: ProgramKat;
  name: string;
  photo: string;
  ulohy: Uloha[];
  stupen?: Stupen;
  expertske_odborky?: ExpertskeOdborky;
  info?: any;
};

export type Uloha = {
  uloha_id: number;
  program_id: number;
  cislo_ulohy: number;
  text_ulohy: string;
  potrebny_pocet_poduloh?: number;
  podulohy?: string[];
};

export type ExpertskeOdborky = {
  id: number;
  name: string;
  foto: string;
};

export type VekKat = {
  id: number;
  name: string;
};

export type ProgramKat = {
  id: number;
  name: string;
};

export type Stupen = {
  id: number;
  name: string;
};
