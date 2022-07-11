import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { QueryClient, useQuery, useQueryClient, dehydrate } from "react-query";

const getPosts = async () => {
  const { data } = await axios("https://jsonplaceholder.typicode.com/posts");

  return data;
};

const PostsPage = () => {
  return (
    <>
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      <Posts />
    </>
  );
};

const Posts = () => {
  const { isLoading, isError, isFetching, data, error } = useQuery(
    ["posts"],
    getPosts
  );
  const queryClient = useQueryClient();

  return (
    <div>
      <h1>Posts</h1>
      {isFetching && <p>Updating...</p>}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            {data.map((post: any) => {
              return (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <a
                    style={{
                      display: "block",
                      color: queryClient.getQueryData(["posts", post.id])
                        ? "salmon"
                        : "#333",
                      margin: "8px",
                    }}
                  >
                    {post.title}
                  </a>
                </Link>
              );
            })}
            {console.log(queryClient.getQueryData(["posts", "4"]))}
          </>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["posts"], getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default PostsPage;
