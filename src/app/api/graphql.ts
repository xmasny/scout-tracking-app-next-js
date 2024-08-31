import { createYoga } from 'graphql-yoga';

import { createContext } from '../../../graphql/context';
import { schema } from '../../../graphql/schema';

import type { NextApiRequest, NextApiResponse } from 'next';
export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  context: createContext,
  graphqlEndpoint: '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};
