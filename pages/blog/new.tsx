import { styled } from "twin.macro";
import { gql } from "@apollo/client";
import {
  useCreateArticleMutation,
  usePublishArticleMutation,
} from "../../generated";
import { useState, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { FiEdit } from "react-icons/fi";

import Layout from "../../components/Layout";
import { Button, Heading } from "../../components/Elements";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
`;

// Create our initial value...
const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
];

// temp
const newArticleData = {
  slug: "new-article-slug-699",
  title: "New Article 699",
  excerpt: "Article created using graphql mutations 699",
  featuredPost: true,
  featuredImage: {
    create: {
      fileName: "New Article 699",
      handle: "random-handle-diwkj699",
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
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();

  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();

  const createArticle = async (): Promise<void> => {
    const { data } = await createArticleMutation({
      variables: newArticleData,
      // add new reference to articles list fields on apollo cache as it doesn't do that automatically
      update: (cache, mutationResult) => {
        const { data } = mutationResult;
        cache.modify({
          fields: {
            articles(existingArticles = []) {
              const newArticleRef = cache.writeFragment({
                data: data?.createArticle,
                fragment: gql`
                  fragment NewArticle on articles {
                    id
                    slug
                    title
                    excerpt
                    content {
                      raw
                      markdown
                      html
                    }
                    featuredPost
                    featuredImage {
                      width
                      height
                      url
                    }
                  }
                `,
              });
              return [...existingArticles, newArticleRef];
            },
          },
        });
      },
    });
    publishArticleMutation({
      variables: {
        id: data?.createArticle?.id,
      },
    });
  };

  return (
    <Layout>
      {createLoading && <p>Creando articulo</p>}
      {publishLoading && <p>Publicando articulo</p>}
      {publishError && <p>Hubo un problema, reintentar</p>}
      <Heading tertiary>New Article</Heading>

      <Container>
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable />
        </Slate>
      </Container>

      <Button elType="text" cta hero href="#" tw="mr-4" onClick={createArticle}>
        <FiEdit />
        Crear
      </Button>
    </Layout>
  );
};

export default NewArticle;
