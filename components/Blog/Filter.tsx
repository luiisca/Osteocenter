import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { v4 } from "uuid";

import { IoIosArrowDown } from "react-icons/io";
import { Heading, PageLink } from "../../components/Elements";

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
const CategoryTitle = ({
  cat,
  categoryAsLink,
  selected,
  dropdown,
  setCrrTab,
}: any) => (
  <>
    {categoryAsLink ? (
      <PageLink nextLink custom destination={`/blog/categorias/${cat?.slug}`}>
        {/*@ts-ignore*/}
        <StyledLink selected={selected} dropdown={dropdown}>
          {cat.title}
        </StyledLink>
      </PageLink>
    ) : !categoryAsLink && dropdown ? (
      <StyledLink
        selected={selected}
        as="div"
        dropdown={dropdown}
        onClick={() =>
          setCrrTab &&
          setCrrTab(cat.title === "Todos" ? "Servicios" : cat.title)
        }
      >
        {cat.title}
      </StyledLink>
    ) : (
      <Tab p={0} onClick={() => console.log("TAB BUTTON CLICKED!", cat.title)}>
        <StyledLink selected={selected} as="div" dropdown={dropdown}>
          {cat.title}
        </StyledLink>
      </Tab>
    )}
  </>
);
const Dropdown = ({
  categories,
  tabIndex,
  setTabIndex,
  categoryAsLink,
  crrSlug,
  setCrrTab,
}: any) => {
  return (
    <div tw="inline-block blog-lg:hidden">
      <Menu>
        <MenuButton>
          <div tw="flex items-center text-primary-shade-1">
            <span tw="mr-5 border-b-2 border-primary-shade-1">
              {categories[tabIndex].title}
            </span>
            <IoIosArrowDown tw="text-primary-shade-1" />
          </div>
        </MenuButton>
        <MenuList tw="px-5 border-0! rounded-none! rounded-b!">
          {categories.map((cat: any, i: number) => (
            <MenuItem
              key={v4()}
              p={0}
              onClick={() => {
                if (!categoryAsLink) setTabIndex(i);
              }}
            >
              <div tw="w-full p-0 bg-white text-[#919191] px-1.5 py-2.5">
                <CategoryTitle
                  cat={cat}
                  categoryAsLink={categoryAsLink}
                  dropdown
                  selected={
                    categoryAsLink ? cat?.slug == crrSlug : tabIndex == i
                  }
                  setCrrTab={setCrrTab || null}
                />
              </div>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};

interface Filter {
  categories: Array<{ title: string; slug?: string }>;
  elements: Array<Record<string, any>>;
  filteredElements: Record<string, Record<string, any>[]>;
  Component: any;
  CustomTabPanel?: any;
  selectedTab?: number;
  categoryAsLink?: boolean;
  setCrrTab?: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = ({
  categories,
  elements,
  filteredElements,
  Component,
  CustomTabPanel,
  categoryAsLink,
  setCrrTab,
}: Filter) => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const router = useRouter();
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    setCrrTab &&
      setCrrTab(
        (categories[index]?.title as string) === "Todos"
          ? "Servicios"
          : (categories[index]?.title as string)
      );
  };

  useEffect(() => {
    if (categoryAsLink) {
      categories.forEach((cat, i) => {
        if (cat.slug == router.query.slug) setTabIndex(i);
      });
    }
  }, [categoryAsLink, categories, router.query.slug]);

  return (
    <div tw="mb-24 md:mb-0">
      <Tabs index={tabIndex} onChange={handleTabsChange} variant="unstyled">
        <TabList mb={7}>
          <div tw="flex flex-wrap justify-between w-full blog-lg:justify-start">
            {categoryAsLink ? (
              <Title />
            ) : (
              <Tab p={0} alignItems="flex-start">
                <Title />
              </Tab>
            )}

            {/*tabs DESKTOP*/}
            <div tw="hidden blog-lg:flex">
              {categories
                .slice((categories[0]?.title as string) === "Todos" ? 1 : 0)
                .map((cat, i) => (
                  <CategoryTitle
                    categoryAsLink={categoryAsLink}
                    cat={cat}
                    key={v4()}
                    selected={
                      categoryAsLink
                        ? cat?.slug == router.query.slug
                        : tabIndex == i + 1
                    }
                  />
                ))}
            </div>

            {/*dropdown MOBILE*/}
            <Dropdown
              categoryAsLink={categoryAsLink}
              categories={categories}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              crrSlug={router.query.slug}
              setCrrTab={setCrrTab || null}
            />
          </div>
        </TabList>
        {/*filtered elements*/}
        <TabPanels>
          {!categoryAsLink &&
            (CustomTabPanel ? (
              <TabPanel p={0}>
                <CustomTabPanel>
                  {elements.map((el) => (
                    <Component key={v4()} content={el} />
                  ))}
                </CustomTabPanel>
              </TabPanel>
            ) : (
              <TabPanel p={0} tw="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0">
                {elements.map((el) => (
                  <Component key={v4()} content={el} />
                ))}
              </TabPanel>
            ))}
          {categories
            .slice((categories[0]?.title as string) === "Todos" ? 1 : 0)
            .map((cat) => {
              if (CustomTabPanel) {
                return (
                  <TabPanel p={0} key={v4()}>
                    <CustomTabPanel>
                      {cat.title &&
                        filteredElements[cat?.title]?.map((el) => (
                          <Component content={el} key={v4()} />
                        ))}
                    </CustomTabPanel>
                  </TabPanel>
                );
              }
              return (
                <TabPanel
                  p={0}
                  key={v4()}
                  tw="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0"
                >
                  {cat.title &&
                    filteredElements[cat?.title]?.map((el) => (
                      <Component content={el} key={v4()} />
                    ))}
                </TabPanel>
              );
            })}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default Filter;

// labels, data, filterFn,
// withFilter HOC
// const Filter = withFilter(<Element />, <FilteredElement />, )
