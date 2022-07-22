// libraries
import { useRef } from "react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";
import { Divider, Stack } from "@chakra-ui/react";

// helpers
import { overlayDrafts, getClient } from "../../lib/sanity/sanity.server";
import {
  indexQuery,
  categories,
  postByCategory,
} from "../../lib/sanity/queries";

// components
import Layout from "../../components/Layout";
import { Heading, Button } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
import Filter from "../../components/Blog/Filter";
import Post from "../../components/Blog/Post";

// styled components
const Container = tw(BaseContainer)``;
const Carousel = styled.div(() => [
  css`
    .swiper {
      ${tw`blog-lg:h-[minmax(380px, 600px)]`}
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
          {/*Carousel */}
          <div className="mb-20">
            <Heading subHeading tw="mt-12 mb-4">
              Lo ultimo
            </Heading>
            <Carousel tw="blog-lg:relative">
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
                      <Post carousel post={post} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
                <Button elType="icon" elRef={prevArrowRef} carousel prev />
                <Button elType="icon" elRef={nextArrowRef} carousel next />
              </div>
            </Carousel>
          </div>

          <Divider bg="hsla(0,0%,78%,.37)" className="mb-20" />

          {/* Articles */}
          <div className="md:grid md:grid-cols-[60% 40%] lg:grid-cols-[70% 30%]">
            <Filter
              categories={["Todos", ...allCategories]}
              allPosts={allPosts}
              postsByCategory={allPostsByCategory}
            />
            <aside className="md:ml-[60px] md:sticky md:top-24">
              <form className="w-full mb-10">
                <input type="search" placeholder="Buscar" />
              </form>
              <Heading as="div" subHeading tw="mb-4">
                Recomendados
              </Heading>
              <Stack direction="column">
                {allPosts
                  .filter((post: any) => post.featured)
                  .map((post: any) => (
                    <>
                      <NextLink href={`/blog/${post.slug}`} passHref key={v4()}>
                        <Heading
                          secondary
                          as="h4"
                          className="py-6 m-0 text-xl cursor-pointer first:pt-0 text-primary-shade-3 hover:text-primary"
                        >
                          {post.title}
                        </Heading>
                      </NextLink>
                      <Divider bg="hsla(0,0%,78%,.37)" m="0px" />
                    </>
                  ))}
              </Stack>
            </aside>
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
