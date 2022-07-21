const postFields = `
  _id,
  title,
  excerpt,
  'category': category->title,
  coverImage,
  date,
  featured,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;
export const categories = `
  *[_type == 'category'].title
`
export const postByCategory = `
  *[_type == 'post' && category._ref in *[_type == 'category' && title == $category]._id] | order(date desc, _updatedAt desc) {
    ${postFields}
  } 
`

export const postQuery = `
  *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
    body[] {
      _type == 'image' => @ + {asset->},
      _type != 'image' => @
    },
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
