import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import { Heading } from "../Elements";
import { urlForImage } from "../../utils/sanity/sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { v4 } from "uuid";
import { Link } from "@chakra-ui/react";

const ImgWrap = styled.div(
  (props: { isInline: boolean; top: boolean; intro: boolean }) => [
    props.isInline ? tw`inline-block` : tw`block`,
    tw`relative`,
    css`
      height: clamp(250px, 25vh, 600px);
    `,
    props.top &&
      tw`w-full max-h-[400px] sm:max-h-[480px] md:min-h-[450px] md:max-h-[600px] blog-lg:h-full blog-lg:max-h-full`,
    props.intro && tw`blog-lg:min-h-full`,
  ]
);
const Text = styled.p(() => [
  tw`text-[#525252] text-[.95rem] leading-[1.575rem] mb-5 tracking-[0.02px] font-normal max-w-[75ch]`,
  tw`md:text-lg md:leading-[1.875rem] md:mb-7`,
]);

export const getImgURL = (value: any) => {
  const { width, height } = getImageDimensions(value);
  return urlForImage(value).size(width, height).url();
};

export const getImgComponent = ({ value, isInline, top, intro }: any) => {
  return (
    <ImgWrap isInline={isInline} top={top} intro={intro}>
      <Image
        src={getImgURL(value)}
        // placeholder="blur"
        alt={value.alt}
        layout="fill"
        objectFit="cover"
      />
    </ImgWrap>
  );
};

const components = {
  types: {
    image: getImgComponent,
  },
  block: {
    h2: ({ children }: any) => (
      <Heading
        as="h2"
        secondary
        tw="mb-5 text-[1.8rem] text-primary-shade-3 md:mb-7 md:text-[2rem]"
      >
        {children}
      </Heading>
    ),
    h3: ({ children }: any) => (
      <Heading
        as="h3"
        tertiary
        tw="mb-5 text-[1.6rem] md:text-[1.8rem] text-primary-shade-3 md:mb-7"
      >
        {children}
      </Heading>
    ),
    blockquote: ({ children }: any) => (
      <Text as="blockquote" tw="italic text-primary-shade-1">
        {children}
      </Text>
    ),
    normal: ({ children }: any) => <Text>{children}</Text>,
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <Text
          as="span"
          tw="text-primary-shade-2 underline hover:text-primary blog-lg:no-underline"
        >
          <Link
            href={value?.href}
            target={target}
            rel={target == "_blank" ? "noindex nofollow" : ""}
            _hover={{
              textDecoration: "none",
            }}
          >
            {children}
          </Link>
        </Text>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul tw="ml-5 mb-4 md:mb-6 list-disc">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol tw="ml-5 mb-4 md:mb-6 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <Text as="li" tw="mb-1" key={v4()}>
        {children}
      </Text>
    ),
    number: ({ children }: any) => (
      <Text as="li" tw="mb-1" key={v4()}>
        {children}
      </Text>
    ),
  },
};

export default components;
