import Image from "next/image";
import tw, { styled, css } from "twin.macro";
import { Heading } from "../Elements";
import { urlForImage } from "../../lib/sanity/sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { v4 } from "uuid";

const ImgWrap = styled.div(
  (props: { isInline: boolean; w: number; h: number }) => [
    props.isInline ? tw`inline-block` : tw`block`,
    tw`relative lg:h-full`,
    css`
      height: clamp(400px, ${props.h}px, 45vh);
    `,
  ]
);

export const getImgComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);

  return (
    <ImgWrap isInline={isInline} w={width} h={height}>
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
