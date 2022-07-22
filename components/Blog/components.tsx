import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import { Heading } from "../Elements";
import { urlForImage } from "../../lib/sanity/sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { v4 } from "uuid";

const ImgWrap = styled.div(
  (props: { isInline: boolean; carousel: boolean }) => [
    props.isInline ? tw`inline-block` : tw`block`,
    tw`relative `,
    css`
      height: clamp(250px, 25vh, 600px);
    `,
    props.carousel &&
      tw`w-full max-h-[400px] sm:max-h-[480px] md:min-h-[450px] md:max-h-[600px] blog-lg:h-full blog-lg:max-h-full`,
  ]
);

export const getImgComponent = ({ value, isInline, carousel }: any) => {
  const { width, height } = getImageDimensions(value);

  return (
    <ImgWrap isInline={isInline} carousel={carousel}>
      <Image
        src={urlForImage(value).size(width, height).url()}
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
    h2: ({ children }: any) => <Heading secondary>{children}</Heading>,
    h3: ({ children }: any) => <Heading tertiary>{children}</Heading>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="pl-4 mt-5 list-disc">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="pl-4 mt-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li key={v4()}>{children}</li>,
    number: ({ children }: any) => <li key={v4()}>{children}</li>,
  },
};

export default components;
