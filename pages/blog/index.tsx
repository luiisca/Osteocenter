import { useRef } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

import { overlayDrafts, getClient } from "../../lib/sanity/sanity.server";
import { indexQuery } from "../../lib/sanity/queries";

import Layout from "../../components/Layout";
import { Heading, Button } from "../../components/Elements";
import { BaseContainer } from "../../components/BaseStyle";
// import Date from "../../components/Blog/Date";
import { getImgComponent } from "../../components/Blog/components";

const Container = tw(BaseContainer)``;
const Articles = tw.div`grid grid-cols-2 gap-2 mx-5 mb-4`;
const Article = tw.div`px-6 py-3 w-auto bg-primary-tint-3 rounded-md hover:bg-primary-tint-2 transition-all`;
const Category = tw.span`inline-block py-2 px-4 bg-primary-shade-1 hover:bg-primary-shade-2 rounded-lg text-white`;
// const ImgWrap = tw.div`w-full h-[300px] max-w-[550px] relative`;

const Blog = ({ allPosts }: { allPosts: any }): JSX.Element => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Container>
        <>
          <Heading subHeading>Lo ultimo</Heading>
          <Swiper
            className="h-[300px]"
            slidesPerView={1}
            spaceBetween={30}
            speed={400}
            // apparently needed for SSR
            // url
            // userAgent
            grabCursor
            loop={true}
            navigation={{
              nextEl: nextArrowRef.current!,
              prevEl: prevArrowRef.current!,
            }}
            modules={[Pagination, Navigation]}
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.nextEl = nextArrowRef.current;
              // @ts-ignore
              swiper.params.navigation.prevEl = prevArrowRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </>
        <div className="flex gap-3">
          <Button elType="icon" elRef={prevArrowRef} carousel prev />
          <Button elType="icon" elRef={nextArrowRef} carousel next />
        </div>
      </Container>
    </Layout>
  );
};

// {allPosts
//   // .filter((post: any) => post.featured)
//   .map((post: any) => (
//     <div
//       className="px-8 py-4 m-2 rounded-sm bg-primary-tint-2"
//       key={v4()}
//     >
//       {post.title}
//     </div>
//   ))}
export const getStaticProps: GetStaticProps<{
  allPosts: any;
  preview: boolean;
}> = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));

  return {
    props: {
      allPosts,
      preview,
    },
  };
};

export default Blog;

// <Articles>
//   {allPosts?.map((post: any) => {
//     return (
//       <Article key={v4()}>
//         <Link href={`/blog/${post.slug}`}>
//           <a>
//             <Heading subHeading>{post.date}</Heading>
//             {getImgComponent({
//               value: post.coverImage,
//               isInline: false,
//             })}
//             <Heading tertiary>{post.title}</Heading>
//             <p>{post.excerpt}</p>
//             {post.categories.map((category: any) => (
//               <Category key={v4()} tw="mt-3">
//                 {category.name}
//               </Category>
//             ))}
//           </a>
//         </Link>
//       </Article>
//     );
//   })}
// </Articles>
