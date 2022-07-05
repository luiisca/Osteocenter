// libraries
import { styled } from "twin.macro";
import { useState, useMemo, useRef } from "react";
import { gql } from "@apollo/client";
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

// helpers
import {
  useCreateArticleMutation,
  usePublishArticleMutation,
  usePublishAssetMutation,
} from "../../generated";
import { postImageAsset } from "../../services/assets";
import { toSlug, toRichTextFormat } from "../../lib/helpers";

// icons + visuls
import { Orbit } from "@uiball/loaders";
import { FiEdit } from "react-icons/fi";

// components
import Layout from "../../components/Layout";
import ImageInput from "../../components/Articles/TextEditor/ImageInput";
import TextEditor from "../../components/Articles/TextEditor";
import { Button, Heading } from "../../components/Elements";

interface MyFormValues {
  title: string;
  excerpt: string;
  featured: boolean;
  featuredImage: null;
  content: any;
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

const NewArticle = () => {
  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();
  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();
  const [publishAssetMutation, { data: publishImgData }] =
    usePublishAssetMutation();

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const createArticle = async (values: any, actions: any) => {
    if (!values.featuredImage) return;

    const formData = new FormData();
    const { title, excerpt, featured, content } = values;
    formData.append("featuredImage", values.featuredImage);

    const { id: imageId } = await postImageAsset(formData);
    const { data: publishAssetData } = await publishAssetMutation({
      variables: {
        id: imageId,
      },
    });
    const mutationVariables = {
      slug: toSlug(title),
      title,
      excerpt,
      content: toRichTextFormat(content),
      featuredPost: featured === "yes",
      imageId: publishAssetData?.publishAsset?.id || "",
    };

    setLoading(false);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const { data } = await createArticleMutation({
      variables: mutationVariables,
    });

    publishArticleMutation({
      variables: {
        id: data?.createArticle?.id,
      },

      // add new reference to articles list fields on apollo cache as it doesn't do that automatically
      update: (cache, mutationResult) => {
        const { data } = mutationResult;
        cache.modify({
          fields: {
            articles(existingArticles = []) {
              const newArticleRef = cache.writeFragment({
                data: data?.publishArticle,
                fragment: gql`
                  fragment PublishedArticle on articles {
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
  };

  const initialValues: MyFormValues = {
    title: "",
    excerpt: "",
    featured: true,
    featuredImage: null,
    content: [
      {
        type: "p",
        children: [
          {
            text: "",
          },
        ],
      },
    ],
  };
  return (
    <Layout>
      {createLoading && <p>Creando articulo</p>}
      {publishLoading && <p>Publicando articulo</p>}
      {publishError && <p>Hubo un problema, reintentar</p>}
      <Heading tertiary>New Article</Heading>

      {loading && <Orbit size={35} color="#231F20" />}
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
            <TextEditor
              initialContent={values.content}
              setFieldValue={setFieldValue}
            />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default NewArticle;