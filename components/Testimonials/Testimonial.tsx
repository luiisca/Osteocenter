import Image from "next/image";
import tw, { css, styled } from "twin.macro";

interface Author {
  name: string;
  picture: string;
}
export interface TestimonialType {
  message: string;
  author: Author;
}
interface Props {
  name: string;
  message: string;
  img: string;
}

const Quote = tw.blockquote`my-0 mx-auto mb-10 md:text-xl max-w-[55ch] text-lg text-accent-555 leading-[1.8]`;
const Text = tw.p`text-lg justify-center gap-3 flex items-center`;
const ImgWrap = styled.span(() => [
  tw`inline-block w-10 rounded-full`,
  css`
    & > span {
      ${tw`rounded-full`}
    }
  `,
]);

const Testimonial = ({ name, message, img }: Props): JSX.Element => {
  return (
    <div tw="mb-6 md:mb-8">
      <Quote>{message}</Quote>
      <Text>
        <ImgWrap>
          <Image
            src={`/img/customers/${img}`}
            alt={`${name} testimonial`}
            layout="responsive"
            sizes="5vw"
            width="1"
            height="1"
          />
        </ImgWrap>
        {name}
      </Text>
    </div>
  );
};

export default Testimonial;
