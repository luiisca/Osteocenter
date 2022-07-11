import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";
import { QueryClient, dehydrate } from "react-query";

import graphqlRequestClient, {
  fetcher,
} from "../../lib/clients/graphqlRequest";
import { ArticlesDocument, useArticlesQuery } from "../../generated";

import Layout from "../../components/Layout";
import { Heading } from "../../components/Elements";

import { FiEdit } from "react-icons/fi";

const Articles = tw.div`grid grid-cols-2 gap-2 mx-5 mb-4`;
const Article = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;
const ImgWrap = tw.div`w-full h-[300px] max-w-[550px] relative`;

const Blog = (): JSX.Element => {
  const { isLoading, isError, isFetching, error, data } =
    useArticlesQuery(graphqlRequestClient);

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <Link href="/blog/new">
        <a>
          <FiEdit />
          Nuevo Articulo
        </a>
      </Link>

      <Heading primary tw="m-5">
        Blog
      </Heading>
      <Articles>
        {data?.articles?.map((article) => {
          return (
            <Article key={article.id}>
              <Link href={`/blog/${article.slug}`}>
                <a>
                  <Heading subHeading>{article.publishedAt}</Heading>
                  <ImgWrap>
                    <Image
                      src={article.featuredImage?.url}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </ImgWrap>
                  <Heading tertiary>{article.title}</Heading>
                  <p>{article.excerpt}</p>
                  {article.categories.map((category) => (
                    <Category key={article.id} tw="mt-3">
                      {category.name}
                    </Category>
                  ))}
                </a>
              </Link>
            </Article>
          );
        })}
      </Articles>
    </Layout>
  );
};

export async function getStaticProps() {
  console.log("getStaticProp blog");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ["Articles"],
    fetcher(graphqlRequestClient, ArticlesDocument)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 10,
  };
}

export default Blog;
