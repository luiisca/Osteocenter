import { GraphQLClient } from "graphql-request";

const headers = {
  authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_PAT}`,
};

export function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}

const graphqlRequestClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHCMS_CONTENT_ENDPOINT as string,
  {
    headers,
  }
);

export default graphqlRequestClient;
