import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";

import { sanityClient } from "@/utils/sanity/sanity.server";
import {
  sitemapPostsQuery,
  sitemapCategoriesQuery,
} from "@/utils/sanity/queries";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const postsFields = await sanityClient.fetch(sitemapPostsQuery);
  const categoriesFields = await sanityClient.fetch(sitemapCategoriesQuery);

  const fields = [
    ...postsFields.map((post: any) => ({
      loc: `https://osteocenter.vercel.app/blog/${post.title}`,
      lastmod: post._updatedAt,
    })),
    ...categoriesFields.map((category: any) => ({
      loc: `https://osteocenter.vercel.app/blog/categorias/${category.title}`,
      lastmod: category._updatedAt,
    })),
  ];

  return getServerSideSitemap(ctx, fields);
};

export default function Sitemap() {}
