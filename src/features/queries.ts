import { request } from 'graphql-request';

import { useQuery } from '@tanstack/react-query';

import { AllCategories, Program, VekKat } from '@/models';

import { getAllCategoriesQuery, GetProgramOdborkyQuery } from '../queries.graphql';

const url = process.env.NEXT_PUBLIC_VERCEL_URL

const apiRoute = `${url}/api/graphql`;

console.log('queries', apiRoute);

interface Data {
	program: Program[];
}

export const useGetAllCategories = () => {
	return useQuery<AllCategories>({
		queryKey: ['allCategories'],
		queryFn: getAllCategoriesQuery,
	});
};

export const useGetProgramOdborky = (programKatId: number, vekovaKat: VekKat) => {
	return useQuery<Data>({
		queryKey: ['odborky', vekovaKat.name],
		queryFn: async () =>
			request(apiRoute, GetProgramOdborkyQuery(vekovaKat.id), { programKatId, vekovaKatId: vekovaKat.id }),
	});
};
