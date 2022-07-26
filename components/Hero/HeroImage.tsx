import Image from "next/future/image";
import tw, { css, styled } from "twin.macro";

const Container = tw.div`w-4/5 h-full`;
const ImgWrap = styled.span(() => [
  css`
    & img {
      ${tw`relative`}
      ${tw`bg-primary-tint-1`}
      ${tw`rounded-[230px] w-full h-auto`}
    }
  `,
]);

const HeroImage = () => {
  return (
    <Container tw="w-2/5 h-auto mx-auto blog-lg:mx-0 blog-lg:w-4/5 blog-lg:h-full">
      <ImgWrap>
        <Image
          priority={true}
          sizes="50vw"
          width="400"
          height="600"
          src="/img/hero.png"
          alt="Doctor cirujano Ronal Cadillo"
        />
      </ImgWrap>
    </Container>
  );
};
export default HeroImage;
