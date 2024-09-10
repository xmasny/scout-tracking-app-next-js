import { NextRequest } from 'next/server';

import { ApolloServer, BaseContext } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

import { expertskeOdborky, program, programKat, stupen, vekovaKat } from './query';

const typeDefs = loadSchemaSync('.', {
	loaders: [new GraphQLFileLoader()],
});

const resolvers: BaseContext = {
	Query: {
		vekovaKat: vekovaKat,
		expertskeOdborky: expertskeOdborky,
		programKat: programKat,
		stupen: stupen,
		program: program,
	},
};

const server = new ApolloServer({
	resolvers,
	typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
	context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
