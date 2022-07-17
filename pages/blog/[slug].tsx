import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";
import { v4 } from "uuid";
import { Flex } from "@chakra-ui/react";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { usePreviewSubscription } from "../../lib/sanity/sanity";
import { sanityClient, getClient } from "../../lib/sanity/sanity.server";
import {
  postSlugsQuery,
  postQuery,
  postsByCategoryQuery,
  featuredPostsQuery,
} from "../../lib/sanity/queries";

import Layout from "../../components/Layout";
import components from "../../components/Blog/components";
import { Heading } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
import Post from "../../components/Blog/Post";
import Aside from "../../components/Blog/Aside";
import { ContentGrid, Divider } from "../../components/Blog/layout";

const Loading = tw.div`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
 `;
const Container = tw(BaseContainer)``;
const IconWrap = tw.div`text-[#AFAFAE] hover:text-[#9e9e9d] text-2xl md:text-[1.35rem]`;

const Article = ({
  postData,
  relatedPosts,
  featuredPosts,
  preview,
}: {
  postData: any;
  relatedPosts: any;
  featuredPosts: any;
  preview: boolean;
}): JSX.Element => {
  const router = useRouter();
  const slug = postData?.slug;

  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: postData,
    enabled: preview && slug,
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return (
      <Layout preview={preview}>
        <Loading>Loading…</Loading>
      </Layout>
    );
  }
  return (
    <Layout preview={preview}>
      <Container tw="mt-12 md:mt-20">
        {/*Intro*/}
        <Post post={post} top intro />
        <Divider tw="my-9 md:mt-14 md:mb-24 blog-lg:mt-16 blog-lg:mb-14" />
        {/*Content*/}
        <ContentGrid>
          <div>
            <Flex tw="mb-8 md:mb-12 items-center">
              <Heading
                as="span"
                subHeading
                tw="mb-0 mr-7 text-xs blog-lg:text-sm"
              >
                Compartir
              </Heading>
              <Flex tw="gap-5">
                <IconWrap>
                  <BsTwitter />
                </IconWrap>
                <IconWrap>
                  <BsFacebook />
                </IconWrap>
              </Flex>
            </Flex>
            <PortableText value={post?.body} components={components} />
          </div>
          <div tw="hidden md:block">
            <Aside recommendedPosts={featuredPosts} />
          </div>
        </ContentGrid>

        <Divider tw="my-20 md:my-24 blog-lg:my-[7.5rem]" />
        {/*Related Posts*/}
        <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
          <Heading
            tertiary
            as="h3"
            tw="text-primary-shade-3 text-2xl mb-12 md:leading-[2.125rem]"
          >
            Artículos Relacionados
          </Heading>
          <div tw="grid gap-12 grid-cols-1 md:grid-cols-2 md:gap-7 blog-lg:grid-cols-3 blog-lg:gap-x-14 blog-lg:gap-y-4">
            {[
              ...relatedPosts,
              ...featuredPosts,
              ...relatedPosts,
              ...featuredPosts,
            ].map((related: any) => {
              if (related._id === post._id) return;
              return <Post post={related} key={v4()} />;
            })}
          </div>
        </div>

        {/*Recommended Posts*/}
        <div tw="md:hidden mb-20 ">
          <Aside recommendedPosts={featuredPosts} post />
        </div>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  postData: any;
  preview: boolean;
}> = async ({ params, preview = false }) => {
  const postData = await getClient(preview).fetch(postQuery, {
    slug: params?.slug,
  });
  const relatedPosts = await getClient(preview).fetch(postsByCategoryQuery, {
    category: postData?.category,
  });
  const featuredPosts = await getClient(preview).fetch(featuredPostsQuery);

  console.log("getStaticProps [slug]");
  console.log("is this getting executed after webhook?", postData);

  return {
    props: {
      preview,
      postData,
      relatedPosts,
      featuredPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(postSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export default Article;
