import { GetStaticPaths, GetStaticProps } from "next";
import tw from "twin.macro";
import { sanityClient } from "../../../utils/sanity/sanity.server";
import {
  categoriesQuery,
  allPosts,
  allCategories,
  allPostsByCategory,
  categoryTitle,
} from "../../../utils/sanity/queries";
import { useQuery } from "react-query";

import type { PostType } from "pages/blog";

import IndexLayout from "../../../components/Blog/IndexLayout";
import { Heading } from "../../../components/Elements";
import withScrollMotion from "@/components/HOCS/withScrollMotion";

const StyledHeading = tw(
  Heading
)`w-full text-center my-12 text-[1.625rem] leading-[2.125rem] text-primary-shade-3 md:my-20 md:text-4xl md:leading-[2.875rem]`;
const Title = ({ children }: { children: React.ReactNode }) => (
  <StyledHeading as="h1" primary>
    {children}
  </StyledHeading>
);

const Category = ({ title }: any) => {
  const posts = useQuery<PostType[]>(["allPosts"], allPosts);
  const categories = useQuery(["allCategories"], allCategories);
  const postsByCategory = useQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories.data)
  );
  const isLoading =
    posts.isLoading || categories.isLoading || postsByCategory.isLoading;
  const isError =
    posts.isError || categories.isError || postsByCategory.isError;

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) {
    return <p>Oh oh algo salio mal :c</p>;
  }
  const AnimatedTitle = withScrollMotion({ Element: Title });

  return (
    <IndexLayout
      allPosts={posts.data || []}
      allCategories={categories.data}
      allPostsByCategory={postsByCategory.data}
      categoryPage
    >
      <AnimatedTitle>{title}</AnimatedTitle>
    </IndexLayout>
  );
};

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  const { QueryClient, dehydrate } = await import("react-query");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["allPosts"], allPosts);

  const categories = await allCategories();
  await queryClient.setQueryData(["allCategories"], categories);

  await queryClient.prefetchQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories)
  );

  const title = await categoryTitle(params?.slug);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await sanityClient.fetch(categoriesQuery);

  return {
    paths: categories.map((category: Record<string, string>) => ({
      params: { slug: category.slug },
    })),
    fallback: false,
  };
};

export default Category;
