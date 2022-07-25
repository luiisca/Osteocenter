export default {
  name: "post",
  title: "Artículo",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "slug",
      title: "Link",
      type: "slug",
      description:
        "La URL de este post (/blog/tu-url). Un slug ideal tiene entre 3 y 5 palabras.",
      options: {
        source: "title",
        maxLength: 23,
      },
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "excerpt",
      title: "Resumen",
      type: "string",

      validation: (Rule) => Rule.required().error("Campo requerido"),
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
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "category",
      title: "Categoría",
      type: "reference",
      to: { type: "category" },
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "date",
      title: "Fecha",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "body",
      title: "Cuerpo",
      type: "blockContent",
      validation: (Rule) => Rule.required().error("Campo requerido"),
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
      validation: (Rule) => Rule.required().error("Campo requerido"),
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
