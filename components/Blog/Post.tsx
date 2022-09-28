import NextLink from "next/link";
import { LinkBox, LinkOverlay, Link, Text, Flex } from "@chakra-ui/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import tw, { styled } from "twin.macro";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";

import { getImgComponent } from "../../components/Blog/components";
import { Heading } from "../../components/Elements";
import Date from "./Date";

const StyledPostContainer = styled.div(
  ({ top, intro }: { top?: boolean; intro?: boolean }) => [
    tw`relative hover:translate-y-[-5px] transition ease-in-out duration-300`,
    (top || intro) && tw`grid grid-rows-[45% 55%]`,
    top &&
      tw`blog-lg:grid-cols-[55% 45%] blog-lg:grid-rows-1 h-full items-center hover:translate-y-0`,
    intro &&
      tw`flex flex-col items-start blog-lg:items-center blog-lg:flex-row-reverse blog-lg:h-[350px] lg:h-[410px]! hover:translate-y-0`,
  ]
);
const StyledPostImgContainer = styled.div(({ intro }: { intro?: boolean }) => [
  tw`blog-lg:h-full`,
  intro && tw`w-full mb-7 blog-lg:mb-0 blog-lg:w-1/2`,
  // intro && tw`mb-7 blog-lg:mb-0`,
]);
const StyledPostDetails = styled.div(
  ({ top, intro }: { top?: boolean; intro?: boolean }) => [
    tw`pt-5`,
    top && tw`py-5 blog-lg:pl-24 blog-lg:pb-20 md:pt-14 md:pb-7`,
    intro &&
      tw`p-0 md:p-0 blog-lg:p-0 blog-lg:w-1/2 blog-lg:pl-0 blog-lg:pr-32`,
    // intro &&
    //   tw`p-0 md:p-0 blog-lg:p-0 blog-lg:col-start-1 blog-lg:row-start-1 blog-lg:pl-0 blog-lg:mr-32`,
  ]
);
const StyledPostCategory = styled.div(
  ({ top, intro }: { top?: boolean; intro?: boolean }) => [
    tw`mb-2.5 text-xs leading-[1.125rem] text-primary`,
    top && tw`mb-5`,
    intro && tw`text-sm md:mb-7`,
  ]
);
const StyledPostTitle = styled.div(({ top }: { top?: boolean }) => [
  tw`mb-5 text-xl leading-[1.625rem] blog-lg:mb-[10px]`,
  top && tw`text-2xl md:mb-7 md:text-4xl`,
]);

interface Post {
  content: any;
  top?: boolean;
  intro?: boolean;
}

const Category = ({
  top,
  content,
  intro,
}: {
  content: any;
  top?: boolean;
  intro?: boolean;
}) => (
  <StyledPostCategory top={top} intro={intro}>
    <NextLink href={`/blog/categorias/${content.categorySlug}`} passHref>
      <Link
        _hover={{
          textDecoration: "none",
        }}
        tw="relative z-10 hover:text-primary-shade-1"
      >
        {content.category}
      </Link>
    </NextLink>
  </StyledPostCategory>
);

const Post = ({ content, top, intro }: Post) => {
  return (
    <LinkBox as="div">
      <StyledPostContainer top={top} intro={intro}>
        <StyledPostImgContainer intro={intro}>
          {/*Image*/}
          {getImgComponent({
            value: content.coverImage,
            isInline: false,
            top,
            intro,
          })}
        </StyledPostImgContainer>

        <StyledPostDetails top={top} intro={intro}>
          {/*Category*/}
          {intro ? (
            <Breadcrumb
              spacing="10px"
              separator={
                <IoIosArrowForward tw="text-[#757575] text-sm leading-6" />
              }
            >
              <BreadcrumbItem tw="text-accent-555 hover:text-accent-333">
                <NextLink href="/blog" passHref>
                  <BreadcrumbLink
                    _hover={{
                      textDecoration: "none",
                    }}
                    tw="text-sm"
                  >
                    Blog
                  </BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              <BreadcrumbItem textDecoration="none">
                <BreadcrumbLink
                  href={`/blog/categorias/${content.categorySlug}`}
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  <Category content={content} top={top} intro={intro} />
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          ) : (
            <Heading subHeading as="span" tw="m-0">
              <Category content={content} top={top} tw="mb-[10px] md:mb-3 " />
            </Heading>
          )}
          {/*Title*/}
          {intro ? (
            <Heading
              primary
              as="h1"
              tw="m-0 text-2xl md:mb-7 md:text-4xl md:mb-7"
            >
              {content.title}
            </Heading>
          ) : (
            <Heading secondary as="h2" tw="m-0">
              <StyledPostTitle top={top}>
                <NextLink href={`/blog/${content.slug}`} passHref>
                  <LinkOverlay>{content.title}</LinkOverlay>
                </NextLink>
              </StyledPostTitle>
            </Heading>
          )}
          {/*Excerpt*/}
          {intro ? (
            <div>
              <div tw="text-sm text-[rgb(117, 117, 117)] mb-[10px] md:mb-[5px]">
                Actualizado el <Date dateString={content._updatedAt} />
              </div>
              <Flex tw="text-sm text-[rgb(195, 195, 194)]">
                <AiOutlineClockCircle tw="text-lg" />
                <span tw="ml-[10px]">5 min</span>
              </Flex>
            </div>
          ) : (
            <Text tw="text-sm leading-6 blog-lg:mb-7 text-accent-555">
              {content.excerpt}
            </Text>
          )}
        </StyledPostDetails>
      </StyledPostContainer>
    </LinkBox>
  );
};

export default Post;
