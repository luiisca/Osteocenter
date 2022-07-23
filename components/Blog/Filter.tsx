import { useState } from "react";
import tw, { styled, theme } from "twin.macro";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { v4 } from "uuid";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import { Heading } from "../../components/Elements";
import Post from "./Post";

const StyledMenuItem = styled.div(({ selected }: any) => [
  tw`text-[#919191] px-1.5 py-2.5`,
  selected && tw`text-primary-shade-1`,
]);

const Filter = ({
  categories,
  allPosts,
  postsByCategory,
}: {
  categories: Array<string>;
  allPosts: any;
  postsByCategory: any;
}) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <>
      <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled">
        <TabList mb={7}>
          <div className="flex flex-wrap justify-between w-full blog-lg:justify-start">
            {/*badges DESKTOP*/}
            <Tab p={0} alignItems="flex-start">
              <Heading
                subHeading
                as="span"
                className="text-base mr-9 text-primary-shade-2 shrink-0 leading-5"
              >
                Filtrar por
              </Heading>
            </Tab>
            <div className="hidden blog-lg:flex">
              {categories.slice(1).map((cat: string) => (
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

            {/*dropdown MOBILE*/}
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
        {/*filtered articles*/}
        <TabPanels>
          <TabPanel
            p={0}
            className="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0"
          >
            {allPosts.map((post: any) => (
              <Post key={v4()} post={post} />
            ))}
          </TabPanel>
          {categories.slice(1).map((cat: string) => (
            <TabPanel
              p={0}
              key={v4()}
              className="grid gap-[3.75rem] blog-lg:grid-cols-2 p-0"
            >
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
export default Filter;
