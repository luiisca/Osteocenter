import Layout from "../../components/Layout";
import { Button, Heading } from "../../components/Elements";
import {
  ArticleDocument,
  useCreateArticleMutation,
  usePublishArticleMutation,
} from "../../generated";
import type { CreateArticleMutation } from "../../generated";

import { FiEdit } from "react-icons/fi";

// temp
const newArticleData = {
  slug: "new-article-slug-89",
  title: "New Article 89",
  excerpt: "Article created using graphql mutations 89",
  featuredPost: true,
  featuredImage: {
    create: {
      fileName: "New Article 89",
      handle: "random-handle-diwkj89",
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
  // TODO:
  // 1. When a new article is created, is it cached? I know it pushes new data to the GraqhQL server. The docs say they're cached but not referenced by a list fields hence I got to manually reference them with update(). But writeQuery() only perform local changes (all reset on reload), that this mean that the referencing process for list fields is done after each new request??
  // 2. Look up at the cache and test wether a new reference is added to the Articles field after writeFragment() or if its as I guess and the whole object is added but is then replaced by a reference after ISR hits.
  // https://www.apollographql.com/docs/react/caching/cache-interaction#values-vs-references. According to this, if I create a new article, that should be added as a reference to the Articles field and not as the actual object, now if I look at the cache after a mutation I should see an Articles field containing a new reference, not a new object.

  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();
  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();

  const createArticle = async (): Promise<void> => {
    const { data } = await createArticleMutation({ variables: newArticleData });
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
      <Button elType="text" cta hero href="#" tw="mr-4" onClick={createArticle}>
        <FiEdit />
        Crear
      </Button>
    </Layout>
  );
};

export default NewArticle;
