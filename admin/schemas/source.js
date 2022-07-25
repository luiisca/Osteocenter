export default {
  name: "source",
  title: "Fuente",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().error("Campo requerido"),
    },
    {
      name: "url",
      title: "Enlace",
      type: "url",
    },
  ],
};
