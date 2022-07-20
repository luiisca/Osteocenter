const postFields = `
  _id,
  title,
  excerpt,
  "categories": categories[]->title,
  coverImage,
  date,
  featured,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

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
