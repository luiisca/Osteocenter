import { useState } from "react";
import tw, { styled, theme } from "twin.macro";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { v4 } from "uuid";
import type { PostType, BlogProps } from "../../pages/blog/index";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import { Heading } from "../../components/Elements";
import Post from "./Post";

const StyledMenuItem = styled.div(({ selected }: any) => [
  tw`text-[#919191] px-1.5 py-2.5`,
  selected && tw`text-primary-shade-1`,
]);

const Filter = ({ allCategories, allPosts, allPostsByCategory }: BlogProps) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div tw="mb-24 md:mb-0">
      <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled">
        <TabList mb={7}>
          <div className="flex flex-wrap justify-between w-full blog-lg:justify-start">
            {/*tabs DESKTOP*/}
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
              {allCategories.slice(1).map((cat) => (
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
                  {cat.title}
                </Tab>
              ))}
            </div>

            {/*dropdown MOBILE*/}
            <div className="inline-block blog-lg:hidden">
              <Menu direction="rtl">
                <MenuButton>
                  <div className="flex items-center text-primary-shade-1">
                    <span className="mr-5 border-b-2 border-primary-shade-1">
                      {allCategories[tabIndex].title}
                    </span>
                    <IoIosArrowDown className="text-primary-shade-1" />
                  </div>
                </MenuButton>
                <MenuList>
                  {allCategories.map((cat, i) => (
                    <MenuItem key={v4()} onClick={() => setTabIndex(i)} p={0}>
                      {/*@ts-ignore */}
                      <StyledMenuItem selected={tabIndex == i}>
                        {cat.title}
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
                <Post post={post} />
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};
export default Filter;
