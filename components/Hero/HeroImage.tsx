import Image from "next/future/image";
import tw, { css, styled } from "twin.macro";

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
    <div tw="w-3/5 h-auto mx-auto max-w-[300px] blog-lg:mx-0 blog-lg:w-4/5 blog-lg:h-full blog-lg:max-w-[450px]">
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
    </div>
  );
};
export default HeroImage;
