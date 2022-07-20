export default {
  name: "post",
  title: "Artículo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
    },
    {
      name: "slug",
      title: "Link",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "excerpt",
      title: "Resumen",
      type: "string",
    },
    // {
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: {type: 'author'},
    // },
    {
      name: "coverImage",
      title: "Portada",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categorías",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "date",
      title: "Fecha",
      type: "datetime",
    },
    {
      name: "body",
      title: "Cuerpo",
      type: "blockContent",
    },
    {
      name: "featured",
      title: "Destacado",
      type: "boolean",
      description:
        "Los posts destacados seran parte del carrusel en la pantalla principal del blog",
      initialValue: false,
    },
    {
      name: "references",
      title: "Referencias",
      type: "array",
      of: [
        {
          name: "source",
          title: "Fuente",
          type: "document",
          fields: [
            {
              name: "title",
              title: "Título",
              type: "string",
            },
            {
              name: "url",
              title: "Enlace",
              type: "url",
            },
          ],
        },
      ],
    },
  ],

  // preview: {
  //   select: {
  //     title: "title",
  //     author: "author.name",
  //     media: "mainImage",
  //   },
  //   prepare(selection) {
  //     const { author } = selection;
  //     return Object.assign({}, selection, {
  //       subtitle: author && `by ${author}`,
  //     });
  //   },
  // },
};
