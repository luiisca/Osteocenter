import { GetStaticPaths, GetStaticProps } from "next";
import {
  ArticlesDocument,
  ArticleDocument,
  useArticleQuery,
} from "../../generated";
import { initializeApollo, addApolloState } from "../../graphql/apolloClient";

import { Heading } from "../../components/Elements";
import Layout from "../../components/Layout";

const Article = ({ params }: { params: { slug: string } }): JSX.Element => {
  const { loading, error, data } = useArticleQuery({
    variables: { slug: params.slug },
  });

  if (error) return <div>Error loading article.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <Heading subHeading>{data?.article?.publishedAt}</Heading>
      <Heading primary>{data?.article?.title}</Heading>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: ArticleDocument,
    variables: {
      slug: params?.slug,
    },
  });

  return addApolloState(apolloClient, {
    props: { params },
    revalidate: 10,
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO:
  // 1. Learn more about apolloClient + getStaticPaths
  // 2. Apparently we can't access cache from here, learn why

  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: ArticlesDocument,
  });

  const paths = data?.articles?.map((article: { slug: string }) => ({
    params: { slug: article?.slug as string },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export default Article;
