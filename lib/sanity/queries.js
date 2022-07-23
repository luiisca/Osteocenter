const postFields = `
_id,
  title,
  excerpt,
  'category': category->title,
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
  *[_type == 'category'].title
`;
export const postsByCategoryQuery = `
  *[_type == 'post' && category._ref in *[_type == 'category' && title == $category]._id] | order(date desc, _updatedAt desc) {
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
