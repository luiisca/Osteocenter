import { GetStaticPaths, GetStaticProps } from "next";
import ErrorPage from "next/error";
import tw from "twin.macro";
import { useRouter } from "next/router";
import { PortableText } from "@portabletext/react";
import { v4 } from "uuid";
import { Flex } from "@chakra-ui/react";
import { BsWhatsapp, BsFacebook } from "react-icons/bs";
import { usePreviewSubscription } from "../../utils/sanity/sanity";
import {
  postSlugsQuery,
  postQuery,
  relatedPostsByCategoryQuery,
  featuredPostsQuery,
} from "../../utils/sanity/queries";
import type { PostType } from "./index";
import { FacebookShareButton, WhatsappShareButton } from "react-share";

import { getImgURL } from "@/components/Blog/components";

import SEO from "@/components/SEO";
import components from "../../components/Blog/components";
import { Heading } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
import Post from "../../components/Blog/Post";
import Aside from "../../components/Blog/Aside";
import { ContentGrid, Divider } from "../../components/Blog/layout";
import { WEB_LINK } from "@/static/ts/constants";

const Loading = tw.div`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left
 `;
const Container = tw(BaseContainer)``;
export const IconWrap = tw.div`text-[#AFAFAE] hover:text-[#9e9e9d] text-2xl md:text-[1.35rem]`;

interface PostData extends PostType {
  body: any;
}
interface ArticleProps {
  postData: PostData;
  relatedPosts: PostType[];
  featuredPosts: PostType[];
  preview: boolean;
}

const Article = ({
  postData,
  relatedPosts,
  featuredPosts,
  preview,
}: ArticleProps): JSX.Element => {
  const router = useRouter();
  const slug = postData?.slug;

  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug },
    initialData: postData,
    enabled: !!(preview && slug),
  });

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return <Loading>Loading…</Loading>;
  }
  return (
    <SEO
      description={post?.excerpt}
      title={post?.title}
      image={getImgURL(post?.coverImage)}
      keywords={`${post?.category}, Medicina, Traumatologia, Ortopedia`}
      date={post?._updatedAt}
    >
      <Container tw="mt-12 md:mt-20">
        {/*Intro*/}
        <Post content={post} top intro />
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
                <FacebookShareButton
                  quote={post.title}
                  url={`${WEB_LINK}/blog/${slug}`}
                >
                  <IconWrap>
                    <BsFacebook />
                  </IconWrap>
                </FacebookShareButton>
                <WhatsappShareButton
                  title={post.title}
                  url={`${WEB_LINK}/blog/${slug}`}
                >
                  <IconWrap>
                    <BsWhatsapp />
                  </IconWrap>
                </WhatsappShareButton>
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
        {relatedPosts.length > 0 && (
          <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
            <Heading
              tertiary
              as="h3"
              tw="text-primary-shade-3 text-2xl mb-12 md:leading-[2.125rem]"
            >
              Artículos Relacionados
            </Heading>
            <div tw="grid gap-12 grid-cols-1 md:grid-cols-2 md:gap-7 blog-lg:grid-cols-3 blog-lg:gap-x-14 blog-lg:gap-y-4">
              {relatedPosts.map((related: any) => {
                return <Post content={related} key={v4()} />;
              })}
            </div>
          </div>
        )}

        {/*Recommended Posts*/}
        <div tw="md:hidden mb-20 ">
          <Aside recommendedPosts={featuredPosts} />
        </div>
      </Container>
    </SEO>
  );
};

export const getStaticProps: GetStaticProps<{
  postData: PostData;
  preview: boolean;
  relatedPosts: PostType[];
  featuredPosts: PostType[];
}> = async ({ params, preview = false }) => {
  const { getClient } = await import("../../utils/sanity/sanity.server");
  const postData = await getClient(preview).fetch(postQuery, {
    slug: params?.slug,
  });
  const relatedPosts = await getClient(preview).fetch(
    relatedPostsByCategoryQuery,
    {
      postTitle: postData?.title,
      categoryTitle: postData?.category,
    }
  );
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
  const { sanityClient } = await import("../../utils/sanity/sanity.server");
  const paths = await sanityClient.fetch(postSlugsQuery);

  return {
    paths: paths.map((slug: string) => ({ params: { slug } })),
    fallback: true,
  };
};

export default Article;
