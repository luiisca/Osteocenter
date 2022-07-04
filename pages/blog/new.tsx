import { styled } from "twin.macro";
import {
  useCreateArticleMutation,
  usePublishArticleMutation,
} from "../../generated";
import { useState, useMemo, useRef } from "react";
import { useRouter } from "next/router";
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

import { Orbit } from "@uiball/loaders";
import { FiEdit } from "react-icons/fi";

import Layout from "../../components/Layout";
import ImageInput from "../../components/NewArticle/ImageInput";
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

const NewArticle = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();

  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const postImageAsset = async (obj: any) => {
    const result = await fetch("/api/postImage", {
      method: "POST",
      body: obj,
    });

    return result.json();
  };
  const createArticle = async (values: any, actions: any) => {
    if (!values.featuredImage) return;

    const formData = new FormData();
    formData.append("featuredImage", values.featuredImage);
    formData.append("title", values.title);
    formData.append("excerpt", values.excerpt);
    formData.append("featured", values.featured);

    postImageAsset(formData).then((res) => {
      setLoading(false)
      setSubmitted(true)
      console.log(res)
    });

    // setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const { title, excerpt, featured, featuredImage } = values;
    const form = new FormData();
    form.append("featuredImage", values.featuredImage);

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

      <Orbit size={35} color="#231F20" />
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
            <ImageInput setFieldValue={setFieldValue} name="featuredImage" />
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
