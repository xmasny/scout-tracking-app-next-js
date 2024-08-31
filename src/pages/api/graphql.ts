import { gql } from "graphql-tag";

import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const resolvers: BaseContext = {
  Query: {
    hello: () => 'world',
    program: () => 'program',
    vekovaKat: () => 'vekovaKat',
    expertskeOdborky: () => 'expertskeOdborky',
    programKat: () => 'programKat',
    stupen: () => 'stupen',
  },
};

const typeDefs = gql`
  type Uloha {
    uloha_id: Int!
    program_id: Int!
    cislo_ulohy: Int!
    text_ulohy: String!
    potrebny_pocet_poduloh: Int
    podulohy: JSON
  }

  scalar JSON

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
    id: Int!
    name: String!
    foto: String!
  }

  type Program {
    id: Int!
    vekova_kat: VekKat!
    program_kat: ProgramKat!
    name: String!
    photo: String!
    ulohy: [Uloha!]!
    stupen: Stupen
    expertske_odborky: ExpertskeOdborky
    info: JSON
  }

  type Query {
    hello: String
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

export default startServerAndCreateNextHandler(server);
