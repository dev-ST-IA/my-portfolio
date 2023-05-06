import { gql } from "@apollo/client";

export const PERSON_ENTRY_QUERY = gql`
  query PersonEntryQuery($id: String!) {
    person(id: $id) {
      fullName
    }
  }
`;

export const POST_TOPICS_QUERY = gql`
  query PostTopicEntryQuery($personId: String!) {
    postTopicCollection(where: { person: { sys: { id: $personId } } }) {
      items {
        topicName
        path
        sys {
          id
        }
      }
    }
  }
`;

export const POST_GROUPS_QUERY = gql`
  query postGroups(
    $path: String!
    $personId: String!
    $search: String
    $skip: Int
    $limit: Int
  ) {
    postGroupCollection(
      where: {
        postTopic: { path: $path }
        person: { sys: { id: $personId } }
        title_contains: $search
      }
      skip: $skip
      limit: $limit
    ) {
      total
      items {
        title
        postsCollection {
          items {
            title
            metaInformation
            tags
            body {
              json
            }
          }
        }
      }
    }
  }
`;

export const SOCIAL_PROFILES_QUERY = gql`
  query socialProfilesQuery($personId: String!) {
    socialProfileCollection(where: { person: { sys: { id: $personId } } }) {
      items {
        url
        mediaName
        icon {
          url
        }
        profilePhoto {
          url
        }
        sys {
          id
        }
      }
    }
  }
`;

export const GET_PERSON_QUERY = gql`
  query GetPerson($id: String!) {
    person(id: $id) {
      fullName
      firstName
      lastName
      userName
      email
    }
  }
`;
