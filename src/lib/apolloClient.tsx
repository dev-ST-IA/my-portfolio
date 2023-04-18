import {ApolloClient,createHttpLink,InMemoryCache,HttpLink} from '@apollo/client'

const httpLink : HttpLink = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  }
})

export const getClient = () => {
  let client: ApolloClient<any>|null = null;
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });
  }
  return client;
};


export const client: ApolloClient<any>  = getClient()


