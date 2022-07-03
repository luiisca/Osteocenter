import { styled } from "twin.macro";
import { gql } from "@apollo/client";
import {
  useCreateArticleMutation,
  usePublishArticleMutation,
} from "../../generated";
import { useState, useMemo, useRef } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";

import { FiEdit } from "react-icons/fi";

import Layout from "../../components/Layout";
import { Button, Heading } from "../../components/Elements";

interface MyFormValues {
  title: string;
  excerpt: string;
  featured: boolean;
  featuredImage: null;
  featuredImagePreview: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
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
  const [testState, setTestState] = useState<string>("hello test");
  const editor = useMemo(() => withReact(createEditor()), []);

  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();

  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();

  const handleImagePreview = (values: any, setFieldValue: any) => {
    if (values.featuredImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("featuredImagePreview", reader.result);
        console.log("onLoaded render", reader.result);
      };
      console.log("handleImagePreview", values);
      reader.readAsDataURL(values.featuredImage);
    }
  };

  const createArticle = (values: any, actions: any) => {
    console.log(values, actions);
    const form = new FormData();
    form.append("featuredImage", values.featuredImage);
    for (let p of form) {
      console.log(p);
    }
    // const { data } = await createArticleMutation({
    //   variables: newArticleData,
    //   // add new reference to articles list fields on apollo cache as it doesn't do that automatically
    //   update: (cache, mutationResult) => {
    //     const { data } = mutationResult;
    //     cache.modify({
    //       fields: {
    //         articles(existingArticles = []) {
    //           const newArticleRef = cache.writeFragment({
    //             data: data?.createArticle,
    //             fragment: gql`
    //               fragment NewArticle on articles {
    //                 id
    //                 slug
    //                 title
    //                 excerpt
    //                 content {
    //                   raw
    //                   markdown
    //                   html
    //                 }
    //                 featuredPost
    //                 featuredImage {
    //                   width
    //                   height
    //                   url
    //                 }
    //               }
    //             `,
    //           });
    //           return [...existingArticles, newArticleRef];
    //         },
    //       },
    //     });
    //   },
    // });
    // publishArticleMutation({
    //   variables: {
    //     id: data?.createArticle?.id,
    //   },
    // });
  };

  const initialValues: MyFormValues = {
    title: "",
    excerpt: "",
    featured: true,
    featuredImage: null,
    featuredImagePreview: "",
  };
  return (
    <Layout>
      {createLoading && <p>Creando articulo</p>}
      {publishLoading && <p>Publicando articulo</p>}
      {publishError && <p>Hubo un problema, reintentar</p>}
      <Heading tertiary>New Article</Heading>

      <Formik initialValues={initialValues} onSubmit={createArticle}>
        {({ values, setFieldValue }: FormikProps<MyFormValues>) => (
          <Form>
            <div>
              <label htmlFor="title">Titulo</label>
              <Field id="title" name="title" required />
            </div>
            <div>
              <label htmlFor="excerpt">Extracto</label>
              <Field name="excerpt" id="excerpt" required />
            </div>
            <div id="feature-article">Destacar articulo</div>
            <div role="group" aria-labelledby="feature-article">
              <label>
                <Field type="radio" name="featured" value="yes" />
                Yes
              </label>
              <label>
                <Field type="radio" name="featured" value="no" />
                No
              </label>
              <p>Seleccionado: {values.featured}</p>
            </div>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e: any) => {
                console.log("input file on change", e.currentTarget.files[0]);
                setTestState("bye");
                console.log(testState);
                // it is not possible to access the new value of state inmediately after defining it, gotta wait to the next render
                setFieldValue("featuredImage", e.currentTarget.files[0]);
              }}
            />
            {handleImagePreview(values, setFieldValue)}
            {values.featuredImage && (
              <img src={values.featuredImagePreview} alt="preview image" />
            )}
            <Button elType="submit" type="submit" cta hero tw="mr-4">
              <FiEdit />
              Publicar
            </Button>
          </Form>
        )}
      </Formik>
      {/*
      <Container>
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        >
          <Editable
            placeholder="Enter some text..."
            onKeyDown={(event: React.KeyboardEvent) => {
              if (event.key !== "&") return;
              event.preventDefault();
              editor.insertText("and");
            }}
          />
        </Slate>
      </Container>
      */}
    </Layout>
  );
};

export default NewArticle;
