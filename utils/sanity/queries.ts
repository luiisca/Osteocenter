import {
  overlayDrafts,
  getClient,
  sanityClient,
} from "@/utils/sanity/sanity.server";
import type { PostType } from "pages/blog";

const postFields = `
  _id,
  _updatedAt,
  title,
  excerpt,
  'category': category->title,
  'categorySlug': category->slug.current,
  coverImage,
  featured,
  "slug": slug.current,
`;

export const indexQuery = `
  *[_type == "post"] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`;
export const featuredPostsQuery = `
  *[_type == 'post' && featured == true] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`;
export const categoriesQuery = `
  *[_type == 'category'] {
    title,
    'slug': slug.current,
  }
`;
export const categoryBySlugQuery = `
  *[_type == 'category' && slug.current == $slug].title
`;
export const postsByCategoryQuery = `
  *[_type == 'post' && category._ref in *[_type == 'category' && title == $categoryTitle]._id] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`;
export const relatedPostsByCategoryQuery = `
  *[_type == 'post' && title != $postTitle && category._ref in *[_type == 'category' && title == $categoryTitle]._id] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`;
export const postQuery = `
  *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
    body[] {
      _type == 'image' => @ + {asset->},
      _type != 'image' => @
    },
    _updatedAt,
    ${postFields}
  }[0]`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;
export const sitemapPostsQuery = `
  *[_type == "post"] {
    title, _updatedAt
  }
`;
export const sitemapCategoriesQuery = `
  *[_type == "category"] {
    title, _updatedAt
  }
`;

export const allPosts = async () =>
  overlayDrafts(await sanityClient.fetch(indexQuery));

export const allCategories = async () => sanityClient.fetch(categoriesQuery);

export const allPostsByCategory = async (categories: any) =>
  categories.reduce(
    async (
      promisedPost: Promise<Record<string, PostType[]>>,
      category: Record<string, string>
    ) => {
      const posts = await sanityClient.fetch(postsByCategoryQuery, {
        categoryTitle: category.title as string,
      });
      const prevPosts = await promisedPost;

      return {
        ...prevPosts,
        [category.title as string]: posts,
      };
    },
    {}
  );

export const categoryTitle = async (slug: any) => {
  const category = await sanityClient.fetch(categoryBySlugQuery, {
    slug: slug,
  });

  return category[0];
};

export const getPostData = async (preview: boolean, slug: any) =>
  getClient(preview).fetch(postQuery, {
    slug: slug,
  });

export const getRelatedPosts = async (preview: boolean, postData: any) =>
  getClient(preview).fetch(relatedPostsByCategoryQuery, {
    postTitle: postData?.title,
    categoryTitle: postData?.category,
  });

export const getFeaturedPosts = async (preview: boolean) =>
  getClient(preview).fetch(featuredPostsQuery);
