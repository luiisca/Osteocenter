import NextLink from "next/link";
import tw from "twin.macro";
import { Stack } from "@chakra-ui/react";
import { v4 } from "uuid";

import { Heading } from "../../components/Elements";
import { Divider } from "./layout";

const Aside = ({ recommendedPosts }: { recommendedPosts: any }) => {
  return (
    <aside tw="md:ml-[60px] md:sticky md:top-24 md:h-screen">
      <form tw="w-full mb-10">
        <input type="search" placeholder="Buscar" />
      </form>
      <Heading as="div" subHeading tw="mb-4">
        Recomendados
      </Heading>
      <Stack direction="column" spacing="0">
        {recommendedPosts.map((post: any) => (
          <>
            <NextLink href={`/blog/${post.slug}`} passHref key={v4()}>
              <Heading
                secondary
                as="h4"
                tw="py-6 m-0 text-xl cursor-pointer first:pt-0 text-primary-shade-3 hover:text-primary"
              >
                {post.title}
              </Heading>
            </NextLink>
            <Divider />
          </>
        ))}
      </Stack>
    </aside>
  );
};
export default Aside;
