import { useState, useEffect } from "react";
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
import { WEB_LINK } from "@/static/ts/constants";

import SEO from "@/components/SEO";
import { Heading } from "../../../components/Elements";
import { BaseContainer as Container } from "@/components/BaseStyle";
import { ContentGrid, Divider } from "@/components/Blog/layout";
import Filter from "@/components/Blog/Filter";
import Aside from "@/components/Blog/Aside";
import withScrollMotion from "@/components/HOCS/withScrollMotion";
import Post from "@/components/Blog/Post";

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
    <SEO
      title={title}
      image={`${WEB_LINK}/img/osteocenter-logo.png`}
      date={"2022-08-06T15:41:12Z"}
    >
      <Container tw="mt-0">
        <AnimatedTitle>{title}</AnimatedTitle>
        <Divider tw="mb-20" />
        <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
          <ContentGrid>
            {/* Filtered Articles */}
            <Filter
              categories={categories?.data}
              elements={posts?.data as Record<string, any>[]}
              filteredElements={postsByCategory?.data}
              categoryAsLink
              Component={Post}
            />
            {/* Recommended aside*/}
            <Aside
              recommendedPosts={posts?.data?.filter(
                (post: any) => post.featured
              )}
            />
          </ContentGrid>
        </div>
      </Container>
    </SEO>
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
