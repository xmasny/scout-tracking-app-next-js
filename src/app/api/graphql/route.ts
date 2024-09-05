import { gql } from 'graphql-tag';
import { NextRequest } from 'next/server';

import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';

import prisma from '@/prisma/prisma';

const resolvers: BaseContext = {
	Query: {
		vekovaKat: async () => {
			const vekovaKats = await prisma.vekova_kat.findMany({
				orderBy: {
					vekova_kat_id: 'asc',
				},
			});
			return vekovaKats.map((vekovaKat) => ({
				id: vekovaKat.vekova_kat_id,
				name: vekovaKat.vekova_kat_name,
			}));
		},
	},
};

const typeDefs = gql`
	scalar JSON

	type Uloha {
		uloha_id: Int!
		program_id: Int!
		cislo_ulohy: Int!
		text_ulohy: String!
		potrebny_pocet_poduloh: Int
		podulohy: JSON
	}

	type ProgramKat {
		id: Int!
		name: String!
	}

	type VekKat {
		id: Int!
		name: String
	}

	type Stupen {
		id: Int!
		name: String!
	}

	type ExpertskeOdborky {
		odborky_id: Int!
		odborky_name: String!
		odborky_foto: String!
	}

	type Program {
		program_id: Int!
		vekova_kat: VekKat!
		program_kat: ProgramKat!
		program_name: String!
		program_photo: String!
		ulohy: [Uloha!]!
		stupen: Stupen
		expertske_odborky: ExpertskeOdborky
		program_info: JSON
	}

	type Query {
		program(program_id: Int!, vekova_kat_id: Int!): [Program!]!
		vekovaKat: [VekKat!]!
		expertskeOdborky: [ExpertskeOdborky!]!
		programKat: [ProgramKat!]!
		stupen: [Stupen!]!
	}
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req }),
});

export { handler as GET, handler as POST };
