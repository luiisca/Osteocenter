import Image from "next/image";
import tw, { styled } from "twin.macro";
import { Heading } from "../Elements";
import { urlForImage } from "../../lib/sanity/sanity";
import { getImageDimensions } from "@sanity/asset-utils";
import { uuid } from "uuidv4";

const ImgWrap = styled.div((props: { isInline: boolean }) => [
  props.isInline ? tw`inline-block` : tw`block`,
  tw`relative`,
]);

export const getImgComponent = ({ value, isInline }: any) => {
  const { width, height } = getImageDimensions(value);

  console.log(value, isInline, urlForImage(value).size(width, height).url());
  console.log("SIZES", width, height);
  return (
    <ImgWrap isInline={isInline}>
      <Image
        src={urlForImage(value).size(width, height).url()}
        // placeholder="blur"
        alt={value.alt}
        layout="responsive"
        // for aspect ratio:
        width={width}
        height={height}
        sizes="100vw"
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
    bullet: ({ children }: any) => <li key={uuid()}>{children}</li>,
    number: ({ children }: any) => <li key={uuid()}>{children}</li>,
  },
};

export default components;
