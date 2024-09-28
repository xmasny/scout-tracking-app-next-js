export interface NewOdborka {
	addNewOdborka: {
		program_kat: number;
		vekova_kat: string;
		name: string;
		photo: string;
		stupen: string | number;
		expertske_odborky: string | number;
		id: number;
	};
}

export interface Ulohy {
	program_id: number;
	cislo_ulohy: number;
	text_ulohy: string;
	potrebny_pocet_poduloh: number;
	podulohy: string[];
}
