import { useState, useRef } from "react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import tw, { styled, css, theme } from "twin.macro";
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
  Divider,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";

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
const StyledMenuItem = styled.div(({ selected }: any) => [
  tw`text-[#919191] px-1.5 py-2.5`,
  selected && tw`text-primary-shade-1`,
]);

const Post = ({ post }: any) => {
  return (
    <LinkBox
      as="article"
      className="relative grid grid-rows-[45% 55%] blog-lg:grid-cols-[55% 45%] h-full"
    >
      <div className="blog-lg:h-full">
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

const Filter = ({
  categories,
  postsByCategory,
}: {
  categories: Array<string>;
  postsByCategory: any;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <>
      <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled">
        <TabList mb={7}>
          <div className="flex flex-wrap justify-between w-full blog-lg:justify-start">
            <Heading
              subHeading
              as="span"
              className="text-base mr-9 text-primary-shade-2 shrink-0 leading-5"
            >
              Filtrar por
            </Heading>

            <div className="hidden blog-lg:flex">
              {categories.map((cat: string) => (
                <Tab
                  _selected={{
                    borderBottom: "1px",
                    color: `${theme<string>`colors.primary.shade-1`}`,
                  }}
                  className="text-base text-accent-555 mr-9 mb-2 font-medium tracking-[.02px] text-[#919191] cursor-pointer"
                  p={0}
                  borderBottom="1px"
                  borderColor="transparent"
                  key={v4()}
                >
                  {cat}
                </Tab>
              ))}
            </div>

            <div className="inline-block blog-lg:hidden">
              <Menu direction="rtl">
                <MenuButton>
                  <div className="flex items-center text-primary-shade-1">
                    <span className="mr-5 border-b-2 border-primary-shade-1">
                      {categories[tabIndex]}
                    </span>
                    <IoIosArrowDown className="text-primary-shade-1" />
                  </div>
                </MenuButton>
                <MenuList>
                  {categories.map((cat, i) => (
                    <MenuItem key={v4()} onClick={() => setTabIndex(i)} p={0}>
                      {/*@ts-ignore */}
                      <StyledMenuItem selected={tabIndex == i}>
                        {cat}
                      </StyledMenuItem>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>
          </div>
        </TabList>
        <TabPanels>
          {categories.map((cat) => (
            <TabPanel key={v4()} p={0}>
              <div>
                <Post post={postsByCategory[cat][0]} />
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </>
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
            <Filter
              categories={allCategories}
              postsByCategory={allPostsByCategory}
            />
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
