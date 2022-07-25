import tw, { styled, css } from "twin.macro";
import type { BlogProps } from "../../pages/blog/index";
import type { PostType } from "../../pages/blog/index";

import { BaseContainer } from "../../components/BaseStyle";
import Filter from "../../components/Blog/Filter";
import Aside from "../../components/Blog/Aside";
import { ContentGrid, Divider } from "../../components/Blog/layout";

const Container = tw(BaseContainer)``;

interface IndexLayoutProps extends BlogProps {
  children: React.ReactNode;
}

const IndexLayout = ({
  allPosts,
  allCategories,
  allPostsByCategory,
  children,
}: IndexLayoutProps): JSX.Element => {
  return (
    <Container tw="mt-12 ">
      <>
        {children}

        <Divider tw="mb-20" />

        <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
          <ContentGrid>
            {/* Filtered Articles */}
            <Filter
              allCategories={[
                {
                  title: "Todos",
                },
                ...allCategories,
              ]}
              allPosts={allPosts}
              allPostsByCategory={allPostsByCategory}
            />
            {/* Recommended aside*/}
            <Aside
              recommendedPosts={allPosts.filter((post: any) => post.featured)}
            />
          </ContentGrid>
        </div>
      </>
    </Container>
  );
};

export default IndexLayout;
