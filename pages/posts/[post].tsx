import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery, QueryClient, dehydrate } from "react-query";

import { mainCaller } from "../../lib/axiosHelpers";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPost = async ({ queryKey }: any): Promise<Post> => {
  const [_key, post] = queryKey;
  const { data } = await axios(
    `https://jsonplaceholder.typicode.com/posts/${post}`
  );

  return data;
};

const Post = () => {
  const router = useRouter();
  const { post } = router.query;

  const { isLoading, isError, isFetching, data, error } = useQuery(
    ["posts", post],
    getPost,
    {
      staleTime: 5000,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <span>Error: {error.message}</span>;

  return (
    <div>
      <Link href="/posts">Back</Link>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = context.params?.post as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["posts", post], getPost);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await mainCaller("https://jsonplaceholder.typicode.com/posts");

  console.log(result);
  const paths =
    result.data.map((post: any) => ({
      params: {
        post: post.id.toString(),
      },
    })) || [];
  return {
    paths: paths,
    fallback: false,
  };
};

export default Post;
