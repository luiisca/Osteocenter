// libraries
import { GetStaticProps } from "next";
import tw, { styled, css } from "twin.macro";
import { useQuery } from "react-query";
import { ArticleJsonLd } from "next-seo";

// helpers
import {
  allPosts,
  allCategories,
  allPostsByCategory,
} from "../../utils/sanity/queries";
import { getImgURL } from "@/components/Blog/components";
import { WEB_LINK, AUTHOR } from "@/static/ts/constants";

// components
import SEO from "@/components/SEO";
import withCarousel from "@/components/HOCS/withCarousel";
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
  _updatedAt: string;
}

export interface BlogProps {
  allPosts: PostType[] | [];
  allCategories: Array<Record<string, string>>;
  allPostsByCategory: any;
}

const StyledButtons = ({ children }: { children: React.ReactNode }) => (
  <div tw="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
    {children}
  </div>
);
const CarouselPost = ({ data }: { data: any }) => <Post top post={data} />;

const Blog = () => {
  const posts = useQuery<PostType[]>(["allPosts"], allPosts);
  const categories = useQuery(["allCategories"], allCategories);
  const postsByCategory = useQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories.data)
  );
  const isLoading =
    posts.isLoading || categories.isLoading || postsByCategory.isLoading;
  const isError =
    posts.isError || categories.isError || postsByCategory.isError;

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) {
    return <p>Oh oh algo salio mal :c</p>;
  }
  const Carousel = withCarousel(
    StyledCarousel,
    posts?.data?.filter((post) => post.featured),
    CarouselPost,
    StyledButtons
  );

  return (
    <>
      <SEO
        description={
          "Mantente informado sobre tu salud con el blog de Osteocenter"
        }
        image={`${WEB_LINK}/img/osteocenter-logo.png`}
        title={"Osteocenter blog"}
        keywords={"Blog, medicina, Traumatologia, Ortopedia"}
      >
        <IndexLayout
          allPosts={posts.data || []}
          allCategories={categories.data}
          allPostsByCategory={postsByCategory.data}
        >
          {/*Carousel */}
          <div tw="mb-20">
            <Heading as="div" subHeading>
              Lo ultimo
            </Heading>
            <Carousel />
          </div>
        </IndexLayout>
      </SEO>
      <ArticleJsonLd
        type="Blog"
        url="https://osteocenter.vercel.app/blog"
        title="Osteocenter blog"
        images={posts?.data?.map((post) => getImgURL(post.coverImage)) || []}
        datePublished={"2022-08-06T15:41:12Z"}
        dateModified={"2022-08-06T15:41:12Z"}
        authorName={AUTHOR}
        description="Mantente informado sobre tu salud con el blog de Osteocenter"
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const { QueryClient, dehydrate } = await import("react-query");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["allPosts"], allPosts);

  const categories = await allCategories();
  await queryClient.setQueryData(["allCategories"], categories);

  await queryClient.prefetchQuery(["allPostsByCategory"], () =>
    allPostsByCategory(categories)
  );

  console.log("getStaticProps index");
  console.log("is this getting executed after webhook?", allPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Blog;
