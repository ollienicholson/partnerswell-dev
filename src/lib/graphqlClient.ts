import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

export const graphqlClient = (apiKey: string) => {
  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  });
};
