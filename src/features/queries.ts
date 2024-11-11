import axios from 'axios';
import _ from 'lodash';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { toRoute } from '@/lib/utils';
import { AllCategories, Program } from '@/models';

interface Data {
	program: Program[];
}

export const useGetAllCategories = () => {
	return useQuery<AllCategories>({
		queryKey: ['allCategories'],
		queryFn: async () =>
			await axios
				.get('all-categories')
				.then((res) => res.data)
				.catch((err) => console.error(err)),
	});
};

export const useGetProgramOdborky = (programKatId: number, vekovaKatId: number) => {
	const queryClient = useQueryClient();
	const { programKat, vekovaKat } = queryClient.getQueryData<AllCategories>(['allCategories'])!;

	const programKatName = toRoute(_.find(programKat, { id: programKatId })!.name);
	const vekovaKatName = toRoute(_.find(vekovaKat, { id: vekovaKatId })!.name);

	return useQuery<Data>({
		queryKey: [programKatName, programKatId, vekovaKatName, vekovaKatId],
		queryFn: async () =>
			await axios
				.get(`program/${programKatId}/${vekovaKatId}`)
				.then((res) => res.data)
				.catch((err) => console.error(err)),
		enabled: !!programKat && !!vekovaKat,
	});
};
