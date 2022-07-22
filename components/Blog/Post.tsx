import NextLink from "next/link";
import { LinkBox, LinkOverlay, Link, Text } from "@chakra-ui/react";
import tw, { styled} from "twin.macro";

import { getImgComponent } from "../../components/Blog/components";
import { Heading } from "../../components/Elements";

const StyledPostContainer = styled.div(
  ({ carousel }: { carousel: boolean }) => [
    tw`relative grid grid-rows-[45% 55%] `,
    carousel && tw`blog-lg:grid-cols-[55% 45%] h-full`,
  ]
);
const StyledPostText = styled.div(({ carousel }: { carousel: boolean }) => [
  tw`pt-5`,
  carousel && tw`py-5 blog-lg:pl-24 blog-lg:pb-20 md:pt-14 md:pb-7`,
]);
const StyledPostCategory = styled.div(({ carousel }: { carousel: boolean }) => [
  tw`mb-[10px] md:mb-3 text-primary`,
  carousel && tw`mb-5`,
]);
const StyledPostTitle = styled.div(({ carousel }: { carousel: boolean }) => [
  tw`mb-5 text-xl blog-lg:mb-[10px]`,
  carousel && tw`text-2xl md:mb-7 md:text-4xl`,
]);

const Post = ({ post, carousel }: any) => {
  return (
    <LinkBox as="article">
      <StyledPostContainer carousel={carousel}>
        <div className="blog-lg:h-full">
          {/*Image*/}
          {getImgComponent({
            value: post.coverImage,
            isInline: false,
            carousel,
          })}
        </div>

        <StyledPostText carousel={carousel}>
          {/*Category*/}
          <Heading subHeading as="span" tw="m-0">
            <StyledPostCategory carousel={carousel}>
              <NextLink href="#" passHref>
                <Link className="relative z-10 hover:text-primary-shade-1">
                  {post.category}
                </Link>
              </NextLink>
            </StyledPostCategory>
          </Heading>
          {/*Title*/}
          <Heading secondary as="h2" tw="m-0">
            <StyledPostTitle carousel={carousel}>
              <NextLink href={`/blog/${post.slug}`} passHref>
                <LinkOverlay>{post.title}</LinkOverlay>
              </NextLink>
            </StyledPostTitle>
          </Heading>
          {/*Excerpt*/}
          <Text className="blog-lg:mb-7 text-accent-555">{post.excerpt}</Text>
        </StyledPostText>
      </StyledPostContainer>
    </LinkBox>
  );
};

export default Post;
