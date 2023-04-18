import { gql } from "@apollo/client";

export const PERSON_ENTRY_QUERY = gql`
  query PersonEntryQuery($id: String!) {
    person(id: $id) {
      fullName
    }
  }
`;