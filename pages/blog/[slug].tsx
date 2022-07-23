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
import { Heading, Button } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
import Filter from "../../components/Blog/Filter";
import Post from "../../components/Blog/Post";
import Aside from "../../components/Blog/Aside";
import { ContentGrid, Divider } from "../../components/Blog/layout";

const Loading = tw.div`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
 `;
const Container = tw(BaseContainer)``;
const IconWrap = tw.div`text-[rgb(175, 175, 174)] text-2xl md:text-[1.35rem]`;

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

        <Divider />
        {/*Related Posts*/}
        <div>
          <Heading subHeading as="span">
            Relacionados
          </Heading>
          <div>
            {relatedPosts.map((post: any) => (
              <Post post={post} key={v4()} />
            ))}
          </div>
        </div>

        <Divider />
        {/*Related Posts*/}
        <div tw="md:hidden">
          <Aside recommendedPosts={featuredPosts} />
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
