// libraries
import { GetStaticProps } from "next";
import tw, { styled, css } from "twin.macro";

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
import withCarousel from "../../components/withCarousel";
import { Heading } from "../../components/Elements";
import Post from "../../components/Blog/Post";
import IndexLayout from "../../components/Blog/IndexLayout";

// styled components
const StyledCarousel = styled.div(() => [
  tw`blog-lg:relative`,
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

const StyledButtons = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
    {children}
  </div>
);
const CarouselPost = ({ data }: { data: any }) => <Post top post={data} />;

const Blog = ({
  allPosts,
  allCategories,
  allPostsByCategory,
}: BlogProps): JSX.Element => {
  const Carousel = withCarousel(
    StyledCarousel,
    allPosts.filter((post) => post.featured),
    CarouselPost,
    StyledButtons
  );

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
        <Carousel />
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
