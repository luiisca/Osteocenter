// libraries
import axios from "axios";
import tw, { styled } from "twin.macro";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
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
  useDeleteAssetMutation,
} from "../../generated";
import { postImageAsset } from "../../services/assets";
import { toSlug, rebuildImgNodes, toRichTextFormat } from "../../lib/helpers";

// icons + visuls
import { Orbit } from "@uiball/loaders";
import { FiEdit } from "react-icons/fi";

// components
import Layout from "../../components/Layout";
import ImageInput from "../../components/Blog/TextEditor/ImageInput";
import TextEditor from "../../components/Blog/TextEditor";
import { Button, Heading } from "../../components/Elements";

interface BasicNode {
  type: string;
  children: Array<{}>;
}
interface ImageNode extends BasicNode {
  src: string;
  type: "image";
  title: string;
  width: number;
  handle: string;
  height: number;
  caption?: Array<{}>;
  mimeType: string;
}
interface MyFormValues {
  title: string;
  excerpt: string;
  featuredPost: boolean;
  img: null;
  content: Array<ImageNode | BasicNode>;
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
const Err = tw.div`bg-red-400 text-white p-3 px-6 rounded-sm max-w-[300px]`;
const Submitted = tw.div`bg-primary-tint-3 p-3 px-6 rounded-sm max-w-[300px]`;

const NewArticle = () => {
  // mutations
  const [createArticleMutation, { loading: createLoading }] =
    useCreateArticleMutation();
  const [
    publishArticleMutation,
    { loading: publishLoading, error: publishError },
  ] = usePublishArticleMutation();
  const [publishAssetMutation, { data: publishImgData }] =
    usePublishAssetMutation();
  const [deleteAssetMutation] = useDeleteAssetMutation();

  // state
  // TODO: Should probably move to reducer
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [featImgErr, setFeatImgErr] = useState<boolean>(false);
  const [contImgErr, setContImgErr] = useState<{ imgName: string | null }>({
    imgName: null,
  });
  const [criticalContImgsError, setCrticalContImgsError] =
    useState<boolean>(false);
  const router = useRouter();

  const createArticle = async (values: any) => {
    if (!values.img) return;

    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const formData = new FormData();
    const { title, excerpt, content, featuredPost } = values;
    formData.append("img", values.img);

    const imageAsset = await postImageAsset(formData);
    let publishAsset;

    console.log(imageAsset);
    if (imageAsset.type === "data") {
      const { data: publishedAssetData } = await publishAssetMutation({
        variables: {
          id: imageAsset?.id,
        },
      });
      publishAsset = publishedAssetData?.publishAsset;
    } else {
      setFeatImgErr(true);
      setLoading(false);
      return;
    }

    const contentNodes = rebuildImgNodes(
      content,
      publishAssetMutation,
      deleteAssetMutation,
      setContImgErr,
      setCrticalContImgsError
    );
    if (!contentNodes) {
      setCrticalContImgsError(true);
      setLoading(false);
      return;
    }

    const mutationVariables = {
      slug: toSlug(title),
      title,
      excerpt,
      content: toRichTextFormat(contentNodes),
      featuredPost: featuredPost === "yes",
      imageId: publishAsset?.id || "",
    };

    const { data } = await createArticleMutation({
      variables: mutationVariables,
    });

    await publishArticleMutation({
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

    setLoading(false);
    setSubmitted(true);
  };

  const initialValues: MyFormValues = {
    title: "",
    excerpt: "",
    featuredPost: true,
    img: null,
    content: [
      {
        type: "h1",
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

      <Formik initialValues={initialValues} onSubmit={createArticle}>
        {({ values, setFieldValue }: FormikProps<MyFormValues>) => (
          <Form>
            <>
              {loading && <Orbit size={35} color="#231F20" />}
              {featImgErr && (
                <Err onClick={() => createArticle(values)}>
                  Parece que tienes problemas de conexion. Reintentar?
                </Err>
              )}
              {criticalContImgsError && (
                <Err onClick={() => createArticle(values)}>
                  Parece que tienes problemas de conexion. Vuelve a conectarte o
                  recarga la pagina
                </Err>
              )}
              {contImgErr.imgName && (
                <Err>
                  Problema al subir imagen {contImgErr.imgName}.
                  Reintentando...`
                </Err>
              )}
              {submitted && (
                <Submitted>Articulo publicado exitosamente</Submitted>
              )}
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
                  <Field type="radio" name="featuredPost" value="yes" />
                  Yes
                </label>
                <label>
                  <Field type="radio" name="featuredPost" value="no" />
                  No
                </label>
                <p>Seleccionado: {values.featuredPost}</p>
              </div>
              <ImageInput setFieldValue={setFieldValue} name="img" />
              <Button elType="submit" type="submit" cta hero tw="mr-4">
                <FiEdit />
                Publicar
              </Button>
              <TextEditor
                initialContent={values.content}
                setFieldValue={setFieldValue}
              />
              <>{console.log(values.content)}</>
            </>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default NewArticle;
