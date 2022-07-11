import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import tw from "twin.macro";
import { useRouter } from "next/router";
import {
  ArticleDocument,
  ArticlesDocument,
  ArticlesQuery,
  ArticlesQueryVariables,
  useArticleQuery,
} from "../../generated";
import { QueryClient, dehydrate } from "react-query";

import graphqlRequestClient, {
  fetcher,
} from "../../lib/clients/graphqlRequest";
import { FiEdit } from "react-icons/fi";

import { Heading } from "../../components/Elements";
import Layout from "../../components/Layout";

const editArticle = () => {};

const ImgWrap = tw.div`w-full h-[500px] max-w-[800px] relative`;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;

const Article = (): JSX.Element => {
  const router = useRouter();
  const { isLoading, isError, isFetching, error, data } = useArticleQuery(
    graphqlRequestClient,
    { slug: router.query?.slug as string }
  );

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <FiEdit onClick={editArticle} />
      <Heading subHeading>{data?.article?.publishedAt}</Heading>
      <Heading primary>{data?.article?.title}</Heading>
      <p>{data?.article?.excerpt}</p>
      {data?.article?.categories.map((category) => (
        <Category key={data?.article?.id} tw="mt-3">
          {category.name}
        </Category>
      ))}
      <ImgWrap>
        <Image
          src={data?.article?.featuredImage?.url || ""}
          alt={data?.article?.title}
          layout="fill"
          objectFit="cover"
        />
      </ImgWrap>
      <div>{data?.article?.content.html}</div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["Article", { slug: params?.slug }],
    fetcher(graphqlRequestClient, ArticleDocument, { slug: params?.slug })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetcher<ArticlesQuery, ArticlesQueryVariables>(
    graphqlRequestClient,
    ArticlesDocument
  )();

  const paths =
    data?.articles?.map((article: { slug: string }) => ({
      params: { slug: article?.slug as string },
    })) || [];

  console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
};

export default Article;
