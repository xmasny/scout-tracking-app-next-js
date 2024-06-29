import gql from 'graphql-tag';

export const GetProgramOdborkyQuery = gql`
  query GetProgramOdborky($programId: Int!, $vekovaKatId: Int!) {
    program(program_id: $programId, vekova_kat_id: $vekovaKatId) {
      id
      vekova_kat {
        id
      }
      name
      photo
      ulohy {
        uloha_id
        text_ulohy
        potrebny_pocet_poduloh
        podulohy
      }
      stupen {
        id
        name
      }
      expertske_odborky {
        id
      }
      info
    }
  }
`;

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
