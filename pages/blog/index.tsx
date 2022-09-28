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
import { BaseContainer as Container} from "@/components/BaseStyle";
import { ContentGrid, Divider } from "../../components/Blog/layout";
import Filter from "../../components/Blog/Filter";
import Aside from "../../components/Blog/Aside";
import Post from "@/components/Blog/Post";

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
const CarouselPost = ({ data }: { data: any }) => <Post top content={data} />;

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
        <Container tw="mt-12">
          {/*Carousel */}
          <div tw="mb-20">
            <Heading as="div" subHeading>
              Lo ultimo
            </Heading>
            <Carousel />
          </div>
          <Divider tw="mb-20" />

          <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
            <ContentGrid>
              {/* Filtered Articles */}
              <Filter
                categories={[
                  {
                    title: "Todos",
                  },
                  ...categories?.data,
                ]}
                elements={posts?.data as Record<string, any>[]}
                filteredElements={postsByCategory?.data}
                Component={Post}
              />
              {/* Recommended aside*/}
              <Aside
                recommendedPosts={posts?.data?.filter(
                  (post: any) => post.featured
                )}
              />
            </ContentGrid>
          </div>
        </Container>
      </SEO>
      <ArticleJsonLd
        type="Blog"
        url="https://osteocenter.vercel.app/blog"
        title="Blog | Osteocenter"
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
