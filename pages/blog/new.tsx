import Layout from "../../components/Layout";
import { Button, Heading } from "../../components/Elements";
import { useCreateArticleMutation } from "../../generated";

import { FiEdit } from "react-icons/fi";

// temp
const newArticleData = {
  slug: "new-article-slug-4",
  title: "New Article 4",
  excerpt: "Article created using graphql mutations 4",
  featuredPost: true,
  featuredImage: {
    create: {
      fileName: "New Article 4",
      handle: "random-handle-2399",
    },
  },
  content: {
    children: [
      {
        type: "paragraph",
        children: [
          {
            text: "GraphCMS boasts an impressive collection of ",
          },
          {
            href: "https://graphcms.com/docs/api-reference/schema/field-types",
            type: "link",
            children: [
              {
                text: "Field Types",
              },
            ],
          },
          {
            text: " that you can use when content modelling. These field types range from the core GraphQL scalar types, to custom ",
          },
          {
            href: "https://graphcms.com/docs/api-reference/schema/field-types#asset",
            type: "link",
            children: [
              {
                text: "Asset",
              },
            ],
          },
          {
            text: ", ",
          },
          {
            href: "https://graphcms.com/docs/api-reference/schema/field-types#location",
            type: "link",
            children: [
              {
                text: "Location",
              },
            ],
          },
          {
            text: ", ",
          },
          {
            href: "https://graphcms.com/docs/api-reference/schema/field-types#json",
            type: "link",
            children: [
              {
                text: "JSON",
              },
            ],
          },
          {
            text: ", and, ",
          },
          {
            href: "https://graphcms.com/docs/api-reference/schema/field-types#rich-text",
            type: "link",
            children: [
              {
                text: "RichText",
              },
            ],
          },
          {
            text: " scalars.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "In this post we'll look at the Rich Text field. We'll take a peak at how you can query, and mutate Rich Text using the Content API.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
      {
        src: "https://media.graphcms.com/N3JOKsXrT9ezCU4Ba6LI",
        type: "image",
        title: "Screenshot 2021-03-24 at 13.00.14.png",
        width: 2408,
        handle: "N3JOKsXrT9ezCU4Ba6LI",
        height: 1684,
        children: [
          {
            text: "",
          },
        ],
        mimeType: "image/png",
      },
      {
        type: "paragraph",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  },
};

const NewArticle = () => {
  const [createArticleMutation, { data, loading, error }] =
    useCreateArticleMutation();

  const createArticle = () => {
    createArticleMutation({ variables: newArticleData });
  };

  return (
    <Layout>
      <Heading tertiary>New Article</Heading>
      <Button elType="text" cta hero href="#" tw="mr-4" onClick={createArticle}>
        <FiEdit />
        Crear
      </Button>
    </Layout>
  );
};

export default NewArticle;
