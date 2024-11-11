import { program } from '@/lib/prisma/query';

import type { NextRequest } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ programKatId: number; vekovaKatId: number }> }
) {
	const programKatId = Number((await params).programKatId);
	const vekovaKatId = Number((await params).vekovaKatId);

	const body = {
		program: await program(request, { program_kat_id: programKatId, vekova_kat_id: vekovaKatId }),
	};
	return new Response(JSON.stringify(body), {
		headers: { 'Content-Type': 'application/json' },
	});
}
