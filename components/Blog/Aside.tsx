import NextLink from "next/link";
import tw from "twin.macro";
import { Stack } from "@chakra-ui/react";
import { v4 } from "uuid";
import { LinkBox, LinkOverlay } from "@chakra-ui/react";

import { Heading } from "../../components/Elements";
import { Divider } from "./layout";

const Container = tw.aside`md:ml-[60px] md:sticky md:top-24`;

const Aside = ({ recommendedPosts }: { recommendedPosts: any }) => {
  return (
    <Container>
      <Heading as="div" subHeading>
        Recomendados
      </Heading>
      <Stack direction="column" spacing="0">
        {recommendedPosts.map((post: any) => (
          <div key={v4()}>
            <LinkBox as="div" tw="relative first:pt-0">
              <Heading
                secondary
                as="h2"
                tw="py-6 m-0 text-xl cursor-pointer  text-primary-shade-3 hover:text-primary"
              >
                <NextLink href={`/blog/${post.slug}`} passHref>
                  <LinkOverlay>{post.title}</LinkOverlay>
                </NextLink>
              </Heading>
            </LinkBox>
            <Divider />
          </div>
        ))}
      </Stack>
    </Container>
  );
};
export default Aside;
