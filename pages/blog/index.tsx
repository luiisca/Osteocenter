import { useRef } from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide } from "swiper/react";
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
const Carousel = styled.div(() => [
  css`
    .swiper {
      ${tw`h-[200px]`}
      .swiper-wrapper {
        .swiper-slide {
          --webkit-transform: translateZ(0);
          ${tw`px-8 py-4 text-lg rounded-md bg-primary-tint-3`}
        }
      }
    }
  `,
]);
// const ImgWrap = tw.div`w-full h-[300px] max-w-[550px] relative`;

const Blog = ({ allPosts }: { allPosts: any }): JSX.Element => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <Container>
        <>
          <Heading subHeading>Lo ultimo</Heading>
          <Carousel>
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
                  <SwiperSlide key={v4()}>{post.title}</SwiperSlide>
                ))}
            </Swiper>
          </Carousel>
        </>
        <div className="flex gap-3">
          <Button elType="icon" elRef={prevArrowRef} carousel prev />
          <Button elType="icon" elRef={nextArrowRef} carousel next />
        </div>
      </Container>
    </Layout>
  );
};

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
