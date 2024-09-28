export interface Program {
	program_id: number;
	vekova_kat: VekKat;
	kategoria: ProgramKat;
	program_name: string;
	program_photo: string;
	ulohy: Uloha[];
	stupen?: Stupen;
	expertske_odborky?: ExpertskeOdborky;
	info?: any;
}

export interface Uloha {
	uloha_id: number;
	program_id: number;
	cislo_ulohy: number;
	text_ulohy: string;
	potrebny_pocet_poduloh?: number;
	podulohy?: string[];
}

export interface ExpertskeOdborky {
	id: number;
	name: string;
	foto: string;
}

export interface VekKat {
	id: number;
	name: string;
}

export interface ProgramKat {
	id: number;
	name: string;
}

export interface Stupen {
	id: number;
	name: string;
}

export interface AllCategories {
	stupen: Stupen[];
	vekovaKat: VekKat[];
	expertskeOdborky: ExpertskeOdborky[];
}
