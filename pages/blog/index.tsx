// libraries
import { GetStaticProps } from "next";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

// helpers
import { overlayDrafts, getClient } from "../../lib/sanity/sanity.server";
import {
  indexQuery,
  categoriesQuery,
  postsByCategoryQuery,
} from "../../lib/sanity/queries";

// components
import Layout from "../../components/Layout";
import { Heading, Button } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
import Filter from "../../components/Blog/Filter";
import Post from "../../components/Blog/Post";
import Aside from "../../components/Blog/Aside";
import { ContentGrid, Divider } from "../../components/Blog/layout";

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

const SlidePrevButton = () => {
  const swiper = useSwiper();

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  // return <button onClick={handlePrev}>Previous</button>;
  return <Button elType="icon" onClick={handlePrev} top prev />;
};
const SlideNextButton = () => {
  const swiper = useSwiper();

  const handleNext = () => {
    swiper?.slideNext();
  };
  // return <button onClick={handleNext}>Next</button>;
  return <Button elType="icon" onClick={handleNext} top next />;
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
  return (
    <Layout>
      <Container tw="mt-12 ">
        <>
          {/*Carousel */}
          <div className="mb-20">
            <Heading subHeading tw="mb-4">
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
              >
                {allPosts
                  .filter((post: any) => post.featured)
                  .map((post: any) => (
                    <SwiperSlide key={v4()}>
                      <Post top post={post} />
                    </SwiperSlide>
                  ))}
                <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
                  <SlidePrevButton />
                  <SlideNextButton />
                </div>
              </Swiper>
              {/*<div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
                <Button elType="icon" elRef={prevArrowRef} top prev />
                <button ref={prevArrowRef}>Previous</button>
                <button ref={nextArrowRef}>Next</button>
                <div onClick={handlePrev}>PREVIOUS_PAGE</div>
                <div onClick={handleNext}>NEXT_PAGE</div>
                {/*<Button elType="icon" elRef={nextArrowRef} top next />*/}
            </Carousel>
          </div>

          <Divider tw="mb-20" />

          <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
            <ContentGrid>
              {/* Filtered Articles */}
              <Filter
                categories={["Todos", ...allCategories]}
                allPosts={allPosts}
                postsByCategory={allPostsByCategory}
              />
              {/* Recommended aside*/}
 
              <div>
                <Aside
                recommendedPosts={allPosts.filter((post: any) => post.featured)}
                />
              </div>
            </ContentGrid>
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
  const allCategories = await getClient(preview).fetch(categoriesQuery);

  // https://stackoverflow.com/questions/4215737/convert-array-to-object?page=1&tab=scoredesc#tab-top
  // https://zellwk.com/blog/async-await-in-loops/
  const allPostsByCategory = await allCategories.reduce(
    async (promisedPost: any, category: string) => {
      const posts = await getClient(preview).fetch(postsByCategoryQuery, {
        category,
      });
      const prevPosts = await promisedPost;

      return {
        ...prevPosts,
        [category]: posts,
      };
    } ,
    {}
  );

  console.log("getStaticProps index");
  console.log("is this getting executed after webhook?", allPosts);

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
