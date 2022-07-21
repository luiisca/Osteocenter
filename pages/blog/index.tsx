import { useRef } from "react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";
import {
  LinkBox,
  LinkOverlay,
  Link,
  Stack,
  Badge,
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";

import { overlayDrafts, getClient } from "../../lib/sanity/sanity.server";
import {
  indexQuery,
  categories,
  postByCategory,
} from "../../lib/sanity/queries";

import Layout from "../../components/Layout";
import { Heading, Button } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
// import Date from "../../components/Blog/Date";
import { getImgComponent } from "../../components/Blog/components";

const Container = tw(BaseContainer)``;
const Carousel = styled.div(() => [
  css`
    .swiper {
      ${tw`lg:h-[minmax(380px, 600px)]`}
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          --webkit-transform: translateZ(0);
          height: 100%;
        }
      }
    }
  `,
]);
// const ImgWrap = tw.div`w-full h-[300px] max-w-[550px] relative`;

const Post = ({ post }: any) => {
  return (
    <LinkBox
      as="article"
      className="relative lg:grid lg:grid-cols-[55% 45%] lg:h-full"
    >
      <div className="lg:h-full">
        {/*Image*/}
        {getImgComponent({
          value: post.coverImage,
          isInline: false,
        })}
      </div>

      <div className="py-5 lg:pl-24 lg:pt-14 lg:pb-20">
        {/*Category*/}
        <Heading subHeading as="span" className="mb-5 text-primary">
          <NextLink href="#" passHref>
            <Link className="relative z-10 hover:text-primary-shade-1">
              {post.category}
            </Link>
          </NextLink>
        </Heading>
        {/*Title*/}
        <Heading secondary className="mb-5 text-4xl lg:mb-7">
          <NextLink href={`/blog/${post.slug}`} passHref>
            <LinkOverlay>{post.title}</LinkOverlay>
          </NextLink>
        </Heading>
        {/*Excerpt*/}
        <Text className="mb-7 text-accent-555">{post.excerpt}</Text>
      </div>
    </LinkBox>
  );
};

interface Blog {
  allPosts: any;
  allCategories: Array<string>;
  allPostsByCategory: any;
}

const Blog = ({
  allPosts,
  allCategories,
  allPostsByCategory,
}: Blog): JSX.Element => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Container>
        <>
          <div className="mb-20">
            <Heading subHeading tw="mt-12 mb-4">
              Lo ultimo
            </Heading>
            <Carousel tw="lg:relative">
              <Swiper
                modules={[Pagination, Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                speed={400}
                grabCursor
                loop
                navigation={{
                  nextEl: nextArrowRef.current!,
                  prevEl: prevArrowRef.current!,
                }}
                onInit={(swiper) => {
                  // @ts-ignore
                  swiper.params.navigation.nextEl = nextArrowRef.current;
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prevArrowRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }}
                // apparently needed for SSR
                // url
                // userAgent
              >
                {allPosts
                  .filter((post: any) => post.featured)
                  .map((post: any) => (
                    <SwiperSlide key={v4()}>
                      <Post post={post} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className="flex gap-3 lg:absolute lg:left-[55%] lg:bottom-0 lg:pl-24 lg:mb-5 lg:z-10">
                <Button elType="icon" elRef={prevArrowRef} carousel prev />
                <Button elType="icon" elRef={nextArrowRef} carousel next />
              </div>
            </Carousel>
          </div>
          <Divider bg="hsla(0,0%,78%,.37)" className="mb-20" />
          <div>
            <div>
              <div>
                <Heading subHeading className="mb-5">
                  Filtrar por
                </Heading>
                <Tabs>
                  <TabList>
                    {allCategories.map((cat) => (
                      <Tab key={v4()}>{cat}</Tab>
                    ))}
                  </TabList>
                  <TabPanels className="mt-12">
                    {allCategories.map((cat) => (
                      <TabPanel key={v4()}>
                        <div>
                          <Post post={allPostsByCategory[cat][0]} />
                        </div>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      </Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  allPosts: any;
  preview: boolean;
}> = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  const allCategories = await getClient(preview).fetch(categories);

  // https://stackoverflow.com/questions/4215737/convert-array-to-object?page=1&tab=scoredesc#tab-top
  // https://zellwk.com/blog/async-await-in-loops/
  // wow I can't believe I've just written this
  const allPostsByCategory = await allCategories.reduce(
    async (promisedPost: any, category: string) => {
      const posts = await getClient(preview).fetch(postByCategory, {
        category,
      });
      const prevPosts = await promisedPost;

      return {
        ...prevPosts,
        [category]: posts,
      };
    },
    {}
  );

  return {
    props: {
      allPosts,
      allCategories,
      allPostsByCategory,
      preview,
    },
  };
};

export default Blog;
