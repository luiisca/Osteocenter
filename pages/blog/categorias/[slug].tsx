import { GetStaticPaths, GetStaticProps } from "next";
import NextLink from "next/link";
import tw from "twin.macro";
import {
  sanityClient,
  overlayDrafts,
} from "../../../utils/sanity/sanity.server";
import {
  categoriesQuery,
  categoryBySlugQuery,
  postsByCategoryQuery,
  indexQuery,
} from "../../../utils/sanity/queries";

import type { PostType, BlogProps } from "../index";

import IndexLayout from "../../../components/Blog/IndexLayout";
import { Heading } from "../../../components/Elements";

interface CategoryProps extends BlogProps {
  categoryTitle: string;
}

const Category = ({
  categoryTitle,
  allPosts,
  allCategories,
  allPostsByCategory,
}: CategoryProps) => {
  return (
    <IndexLayout
      allPosts={allPosts}
      allCategories={allCategories}
      allPostsByCategory={allPostsByCategory}
      categoryPage
    >
      <Heading
        as="h1"
        primary
        tw="w-full text-center mb-12 text-[1.625rem] leading-[2.125rem] text-primary-shade-3 md:mb-20 md:text-4xl md:leading-[2.875rem]"
      >
        {categoryTitle}
      </Heading>
    </IndexLayout>
  );
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  params,
}) => {
  const allPosts = overlayDrafts(await sanityClient.fetch(indexQuery));
  const allCategories = await sanityClient.fetch(categoriesQuery);

  const allPostsByCategory = await allCategories.reduce(
    async (
      promisedPost: Promise<Record<string, PostType[]>>,
      category: Record<string, string>
    ) => {
      const posts = await sanityClient.fetch(postsByCategoryQuery, {
        categoryTitle: category.title,
      });
      const prevPosts = await promisedPost;

      return {
        ...prevPosts,
        [category.title]: posts,
      };
    },
    {}
  );
  const category = await sanityClient.fetch(categoryBySlugQuery, {
    slug: params?.slug,
  });
  const categoryTitle = category[0];

  return {
    props: {
      allPosts,
      allCategories,
      allPostsByCategory,
      categoryTitle,
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
