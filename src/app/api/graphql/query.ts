import prisma from '@/prisma/prisma';

export const vekovaKat = async () => {
	const vekoveKat = await prisma.vekovaKat.findMany({
		orderBy: {
			vekova_kat_id: 'asc',
		},
	});
	return vekoveKat.map((vekovaKat) => ({
		id: vekovaKat.vekova_kat_id,
		name: vekovaKat.vekova_kat_name,
	}));
};

export const expertskeOdborky = async () => {
	const expertskeOdborky = await prisma.expertskeOdborky.findMany({
		orderBy: {
			expertske_odborky_id: 'asc',
		},
	});
	return expertskeOdborky.map((expertskaOdborka) => ({
		id: expertskaOdborka.expertske_odborky_id,
		name: expertskaOdborka.expertske_odborky_name,
		foto: expertskaOdborka.expertske_odborky_foto,
	}));
};

export const programKat = async () => {
	const programKats = await prisma.programKat.findMany({
		orderBy: {
			program_kat_id: 'asc',
		},
	});
	return programKats.map((programKat) => ({
		id: programKat.program_kat_id,
		name: programKat.program_kat_name,
	}));
};

export const stupen = async () => {
	const stupne = await prisma.stupen.findMany({
		orderBy: {
			stupen_id: 'asc',
		},
	});
	return stupne.map((stupen) => ({
		id: stupen.stupen_id,
		name: stupen.stupen_name,
	}));
};

export const program = async (_: any, { program_kat_id, vekova_kat_id }: any) => {
	const programs = await prisma.program.findMany({
		where: {
			vekova_kat_id,
			program_kat_id,
		},
		include: {
			program_kat: true,
			vekova_kat: true,
			stupen: true,
			expertske_odborky: true,
			ulohy: {
				orderBy: {
					cislo_ulohy: 'asc',
				},
			},
		},
	});

	return programs.map((program) => ({
		...program,
		program_kat: {
			id: program.program_kat.program_kat_id,
			name: program.program_kat.program_kat_name,
		},
		vekova_kat: {
			id: program.vekova_kat.vekova_kat_id,
			name: program.vekova_kat.vekova_kat_name,
		},
		stupen: {
			id: program.stupen?.stupen_id,
			name: program.stupen?.stupen_name,
		},
		expertske_odborky: {
			id: program.expertske_odborky?.expertske_odborky_id,
			name: program.expertske_odborky?.expertske_odborky_name,
			foto: program.expertske_odborky?.expertske_odborky_foto,
		},
	}));
};
