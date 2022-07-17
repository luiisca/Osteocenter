/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Lista no ordenada", value: "bullet" },
        { title: "Lista enumerada", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Negritas", value: "strong" },
          { title: "Énfasis", value: "em" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: "link",
            title: "URL",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: "image",
      fields: [
        {
          type: "text",
          name: "alt",
          title: "Texto alternativo",
          description:
            "Algunos de tus visitantes no pueden ver imágenes, ya sea por ceguera, daltonismo o baja visión; texto alternativo es una gran ayuda para aquellos que puedan confiar en ello para tener una mejor idea de lo que esta en tu pagina",
          options: {
            isHighlighted: true,
          },
        },
      ],
      options: { hotspot: true },
    },
  ],
};
