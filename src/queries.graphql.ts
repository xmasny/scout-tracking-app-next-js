import gql from 'graphql-tag';

import { VekKatEnum } from '@/models/enums/vek-kat.enum';

import { getClient } from './lib/apollo-client';

import type { AllCategories } from './models';
import type { ApolloQueryResult } from '@apollo/client';

const { SKAUTI, ROVERI } = VekKatEnum;

export const GetProgramOdborkyQuery = (vekKatId: number) => {
	const stupen = /* GraphQL */ `
		stupen {
			id
			name
			}`;

	const expertskeOdborky = /* GraphQL */ `
			expertske_odborky {
				id
				name
				foto
			}`;

	return gql`
		query Query($programKatId: Int!, $vekovaKatId: Int!) {
			program(program_kat_id: $programKatId, vekova_kat_id: $vekovaKatId) {
				program_id
				vekova_kat {
					id
					name
				}
				program_kat {
					id
					name
				}
				program_name
				program_photo
				ulohy {
					uloha_id
					program_id
					cislo_ulohy
					text_ulohy
					potrebny_pocet_poduloh
					podulohy
				}
				${[SKAUTI, ROVERI].includes(vekKatId) ? stupen : ''}
				${[SKAUTI].includes(vekKatId) ? expertskeOdborky : ''}
				program_info
			}
		}
	`;
};

export const GetVekKatOdborkyQuery = gql`
	query GetVekKatOdborky {
		vekovaKat {
			id
			name
		}
	}
`;

export const GetExpertskeOdborkyQuery = gql`
	query GetExpertskeOdborky {
		expertskeOdborky {
			id
			name
		}
	}
`;

export const GetAllCategoriesQuery = gql`
	query GetAllCategories {
		stupen {
			id
			name
		}
		vekovaKat {
			id
			name
		}
		expertskeOdborky {
			id
			name
		}
	}
`;

export async function getAllCategoriesQuery() {
	const { data }: ApolloQueryResult<AllCategories> = await getClient().query({
		query: GetExpertskeOdborkyQuery,
	});
	return data;
}

export const AddNewOdborkaMutation = gql`
	mutation AddNewOdborka(
		$programKat: Int!
		$vekovaKat: Int!
		$name: String!
		$photo: String!
		$stupen: Int!
		$expertskeOdborky: Int!
	) {
		addNewOdborka(
			program_kat: $programKat
			vekova_kat: $vekovaKat
			name: $name
			photo: $photo
			stupen: $stupen
			expertske_odborky: $expertskeOdborky
		) {
			id
			name
			photo
		}
	}
`;

export const AddNewUlohyOdborkaMutation = gql`
	mutation AddNewUlohyOdborka($ulohy: [UlohaInputType!]!) {
		addNewUlohyOdborka(ulohy: $ulohy) {
			program_id
			cislo_ulohy
			text_ulohy
		}
	}
`;
