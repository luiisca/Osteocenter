import axios from "axios";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  dehydrate,
  Hydrate,
} from "react-query";

// like useContext for context API
// https://api.github.com/repos//react-query
import { ReactQueryDevtools } from "react-query/devtools";

const getRepoData = async ({ queryKey }: { queryKey: string[] }) => {
  const [user, name] = queryKey;
  const { data } = await axios(`https://api.github.com/repos/${user}/${name}`);
  return data;
};

const createPost = (data: { title: string; content: string }) => {
  return axios.post("https://some-api/blogs/new", data);
};

const ReactQuery = () => {
  const queryClientCache = useQueryClient();

  // const [filter, setFilter] = useState<boolean>(false);
  // const mutation = useMutation(createPost, {
  //   retry: 3,
  //   onMutate: async () => {
  //     const newBlog = {
  //       title: "optimistic blog post",
  //       content: "this is an optimistic blog post",
  //     };
  //     // cancel any outgoing refetches (so they don't overlap our optimistic values)
  //     await queryClientCache.cancelQueries(["blogs"]);

  //     // getQuery data
  //     const previousBlogs = await queryClientCache.getQueryData(["blogs", 3]);

  //     // update cache with new data optimistically
  //     queryClientCache.setQueryData(["blogs"], (old) => [...old, newBlog]);

  //     return { previousBlogs };
  //   },
  //   onError: async (err, variables, context) => {
  //     queryClientCache.setQueryData(["blogs"], context?.previousBlogs);
  //   },
  //   onSettled: (data, err, variables, context) => {
  //     // always refetch after either onSuccess or onError
  //     queryClientCache.invalidateQueries(["blogs"]);
  //   },
  // });

  const { isLoading, isError, isFetching, data, error } = useQuery({
    queryKey: ["tannerlinsley", "react-query"],
    queryFn: getRepoData,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    return (
      <div>
        <>
          <p>Error</p>
          {error}
        </>
      </div>
    );

  return (
    <>
      <div>
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{" "}
        <strong>✨ {data.stargazers_count}</strong>{" "}
        <strong>🍴 {data.forks_count}</strong>
        <div>{isFetching ? "Updating..." : ""}</div>
      </div>

      {/*
      <div>
      <p>Create new article</p>
      <button
      onClick={() =>
      mutation.mutate({
        title: "new article",
        content: "some fresh content, and bun seem to be blazing-fast",
        })
        }
        >
        Create
            </div>
      </button>
      */}
    </>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["tannerlinsley", "react-query"],
    getRepoData
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default ReactQuery;
