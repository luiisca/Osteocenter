export default {
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "description",
      title: "Descripción",
      type: "text",
    },
    {
      name: "slug",
      title: "Link",
      type: "slug",
      description:
        "La URL de esta categoria en el blog (/blog/categoria/tu-url). Un slug ideal tiene entre 3 y 5 palabras.",
      options: {
        source: "title",
        maxLength: 23,
      },
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
  ],
};
