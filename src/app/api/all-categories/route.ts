import { expertskeOdborky, programKat, stupen, vekovaKat } from '@/lib/prisma/query';

import type { AllCategories } from '@/models';

export async function GET(request: Request) {
	const body: AllCategories = {
		stupen: await stupen(),
		vekovaKat: await vekovaKat(),
		expertskeOdborky: await expertskeOdborky(),
		programKat: await programKat(),
	};
	return Response.json(body);
}
