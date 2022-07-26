// libraries
import { useRef } from "react";
import { GetStaticProps } from "next";
import tw, { styled, css } from "twin.macro";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

// helpers
import {
  overlayDrafts,
  getClient,
  sanityClient,
} from "../../utils/sanity/sanity.server";
import {
  indexQuery,
  categoriesQuery,
  postsByCategoryQuery,
} from "../../utils/sanity/queries";

// components
import { Heading, Button } from "../../components/Elements";
import Post from "../../components/Blog/Post";
import IndexLayout from "../../components/Blog/IndexLayout";

// styled components
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

export interface PostType {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: any;
  featured: boolean;
  slug: string;
}

export interface BlogProps {
  allPosts: PostType[];
  allCategories: Array<Record<string, string>>;
  allPostsByCategory: any;
}

const Blog = ({
  allPosts,
  allCategories,
  allPostsByCategory,
}: BlogProps): JSX.Element => {
  const nextArrowRef = useRef<HTMLDivElement>(null);
  const prevArrowRef = useRef<HTMLDivElement>(null);

  return (
    <IndexLayout
      allPosts={allPosts}
      allCategories={allCategories}
      allPostsByCategory={allPostsByCategory}
    >
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
                  <Post top post={post} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
            <Button elType="icon" elRef={prevArrowRef} top prev />
            <Button elType="icon" elRef={nextArrowRef} top next />
          </div>
        </Carousel>
      </div>
    </IndexLayout>
  );
};

export const getStaticProps: GetStaticProps<{
  allPosts: PostType[];
  preview: boolean;
  allCategories: Array<Record<string, string>>;
  allPostsByCategory: Record<string, PostType[]>;
}> = async ({ preview = false }) => {
  const allPosts = overlayDrafts(await getClient(preview).fetch(indexQuery));
  const allCategories = await getClient(preview).fetch(categoriesQuery);

  // https://stackoverflow.com/questions/4215737/convert-array-to-object?page=1&tab=scoredesc#tab-top
  // https://zellwk.com/blog/async-await-in-loops/
  const allPostsByCategory = await allCategories.reduce(
    async (
      promisedPost: Promise<Record<string, PostType[]>>,
      category: Record<string, string>
    ) => {
      const posts = await sanityClient.fetch(postsByCategoryQuery, {
        categoryTitle: category.title,
      });
      const prevPosts = await promisedPost;

      return {
        ...prevPosts,
        [category.title]: posts,
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
