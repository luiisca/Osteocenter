import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
// import Image from "next/image";
import tw from "twin.macro";
import { useRouter } from "next/router";

import { usePreviewSubscription } from "../../lib/sanity/sanity";
import { sanityClient, getClient } from "../../lib/sanity/sanity.server";
import { postSlugsQuery, postQuery } from "../../lib/sanity/queries";

import { Heading } from "../../components/Elements";
import Layout from "../../components/Layout";

// const ImgWrap = tw.div`w-full h-[500px] max-w-[800px] relative`;
const PostTitle = tw.div`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
 `;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;

const Article = ({
  postData,
  preview,
}: {
  postData: any;
  preview: boolean;
}): JSX.Element => {
  const router = useRouter();

  const slug = postData?.slug;

  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: postData,
    enabled: preview && slug,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <PostTitle>Loading…</PostTitle>
      ) : (
        <>
          <Heading subHeading>{post?.date}</Heading>
          <Heading primary>{post?.title}</Heading>
          <p>{post?.excerpt}</p>
          {post?.categories.map((category: any) => (
            <Category key={post?.id} tw="mt-3">
              {category.name}
            </Category>
          ))}
        </>
      )}

      {/*
      <ImgWrap>
        <Image
          src={data?.article?.featuredImage?.url || ""}
          alt={data?.article?.title}
          layout="fill"
          objectFit="cover"
        />
      </ImgWrap>
      <div>{post?.content.html}</div>
        */}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  post: any;
  preview: boolean;
}> = async ({ params, preview = false }) => {
  const postData = await getClient(preview).fetch(postQuery, {
    slug: params?.slug,
  });

  return {
    props: {
      preview,
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export default Article;
