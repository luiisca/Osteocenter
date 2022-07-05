import Image from "next/image";
import Link from "next/link";
import tw from "twin.macro";
import { Heading } from "../../components/Elements";
import Layout from "../../components/Layout";
import { ArticlesDocument, useArticlesQuery } from "../../generated";
import { addApolloState, initializeApollo } from "../../graphql/apolloClient";

import { FiEdit } from "react-icons/fi";

const Articles = tw.div`grid grid-cols-2 gap-2 mx-5 mb-4`;
const Article = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;
const ImgWrap = tw.div`w-full h-[300px] relative`;

const Blog = (): JSX.Element => {
  // TODO:
  // 1. Learn how Apollo.useQuery() works, confirm wheter or not it prioritizes cache over request to API and how does it know when use either one or the other
  // 2. I feel like I could access to the cache through pageProps[SOME_THING] as defined on apolloClient.tsx
  const { loading, error, data } = useArticlesQuery();

  if (error) return <div>Error loading articles.</div>;
  if (loading) return <div>Loading...</div>;

  console.log(data);
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
                      src={article.featuredImage.url}
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
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ArticlesDocument,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 10,
  });
}

export default Blog;
