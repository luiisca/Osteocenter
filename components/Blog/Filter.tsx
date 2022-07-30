import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw, { styled} from "twin.macro";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { v4 } from "uuid";
import type { PostType, BlogProps } from "../../pages/blog/index";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import { Heading, PageLink } from "../../components/Elements";
import Post from "./Post";

const StyledMenuItem = styled.div(() => [tw`text-[#919191] px-1.5 py-2.5`]);
const StyledLink = styled.a(
  ({ selected, dropdown }: { selected?: boolean; dropdown: boolean }) => [
    tw`relative hover:text-primary-shade-1 text-base text-accent-555 mr-9 mb-2 font-medium tracking-[.02px] text-[#919191] cursor-pointer`,
    tw`border-b border-transparent`,
    selected && tw`border-b-2 text-primary-shade-1 border-primary-shade-1`,
    dropdown && tw`border-b-0 inline-block w-full p-0 pt-4 pb-2.5 m-0 `,
  ]
);

const Title = () => (
  <Heading
    subHeading
    as="span"
    className="text-base mb-0.5 mr-9 text-primary-shade-2 shrink-0 leading-5"
  >
    Filtrar por
  </Heading>
);
const CategoryTitle = ({ cat, categoryPage, selected, dropdown }: any) => (
  <>
    {categoryPage ? (
      <PageLink nextLink custom destination={`/blog/categorias/${cat.slug}`}>
        {/*@ts-ignore*/}
        <StyledLink selected={selected} dropdown={dropdown}>
          {cat.title}
        </StyledLink>
      </PageLink>
    ) : !categoryPage && dropdown ? (
      <StyledLink selected={selected} as="div" dropdown={dropdown}>
        {cat.title}
      </StyledLink>
    ) : (
      <Tab p={0}>
        <StyledLink selected={selected} as="div" dropdown={dropdown}>
          {cat.title}
        </StyledLink>
      </Tab>
    )}
  </>
);
const Dropdown = ({
  allCategories,
  tabIndex,
  setTabIndex,
  categoryPage,
  crrSlug,
}: any) => {
  let slicedCategories: any = allCategories;
  if (categoryPage) {
    slicedCategories = allCategories.slice(1);
  }
  console.log(slicedCategories, allCategories, tabIndex);

  return (
    <div tw="inline-block blog-lg:hidden">
      <Menu>
        <MenuButton>
          <div tw="flex items-center text-primary-shade-1">
            <span tw="mr-5 border-b-2 border-primary-shade-1">
              {allCategories[tabIndex].title}
            </span>
            <IoIosArrowDown tw="text-primary-shade-1" />
          </div>
        </MenuButton>
        <MenuList tw="px-5 border-0! rounded-none! rounded-b!">
          {slicedCategories.map((cat: any, i: number) => (
            <MenuItem
              key={v4()}
              p={0}
              onClick={() => {
                if (!categoryPage) setTabIndex(i);
              }}
            >
              <StyledMenuItem
                // @ts-ignore
                tw="w-full p-0 bg-white"
              >
                <CategoryTitle
                  cat={cat}
                  categoryPage={categoryPage}
                  dropdown
                  selected={categoryPage ? cat.slug == crrSlug : tabIndex == i}
                />
              </StyledMenuItem>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

const Filter = ({
  allCategories,
  allPosts,
  allPostsByCategory,
  categoryPage,
}: BlogProps & { categoryPage?: boolean }) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (categoryPage) {
      allCategories.forEach((cat, i) => {
        if (cat.slug == router.query.slug) setTabIndex(i);
      });
    }
  }, [categoryPage, allCategories, router.query.slug]);

  return (
    <div tw="mb-24 md:mb-0">
      <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled">
        <TabList mb={7}>
          <div className="flex flex-wrap justify-between w-full blog-lg:justify-start">
            {/*tabs DESKTOP*/}
            {categoryPage ? (
              <Title />
            ) : (
              <Tab p={0} alignItems="flex-start">
                <Title />
              </Tab>
            )}
            <div className="hidden blog-lg:flex">
              {allCategories.slice(1).map((cat, i) => (
                <CategoryTitle
                  categoryPage={categoryPage}
                  cat={cat}
                  key={v4()}
                  selected={
                    categoryPage
                      ? cat.slug == router.query.slug
                      : tabIndex == i + 1
                  }
                />
              ))}
            </div>

            {/*dropdown MOBILE*/}
            <Dropdown
              categoryPage={categoryPage}
              allCategories={allCategories}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              crrSlug={router.query.slug}
            />
          </div>
        </TabList>
        {/*filtered articles*/}
        <TabPanels>
          <TabPanel
            p={0}
            className="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0"
          >
            {allPosts.map((post) => (
              <Post key={v4()} post={post} />
            ))}
          </TabPanel>
          {allCategories.slice(1).map((cat) => (
            <TabPanel
              p={0}
              key={v4()}
              className="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0"
            >
              {allPostsByCategory[cat.title].map((post: PostType) => (
                <Post post={post} key={v4()} />
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default Filter;
