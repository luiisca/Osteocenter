import Image from "next/future/image";
import _ from "lodash";
import { useEffect, useState } from "react";
import tw, { css, styled } from "twin.macro";

const ImgWrap = styled.span(() => [
  css`
    & img {
      ${tw`relative`}
      ${tw`bg-primary-tint-1`}
      ${tw`rounded-[20vw] blog-lg:rounded-[230px] w-[80vw] blog-lg:w-full h-auto`}
    }
  `,
]);

const HeroImage = () => {
  const [blogLgBreakpoint, setBlogLgBreakpoint] = useState<boolean>(true);
  const debouncedResizeFn = _.debounce(() =>
    setBlogLgBreakpoint(window.innerWidth >= 992)
  );

  useEffect(() => {
    if (window) {
      debouncedResizeFn();
      window.addEventListener("resize", debouncedResizeFn);
    }
    return () => window.removeEventListener("resize", debouncedResizeFn);
  }, [blogLgBreakpoint, debouncedResizeFn]);

  return (
    <div tw="blog-lg:w-3/5 h-auto mx-auto max-w-[450px] blog-lg:mx-0 blog-lg:w-4/5 blog-lg:h-full">
      <ImgWrap>
        <Image
          priority={true}
          sizes="50vw"
          width="384"
          height="588"
          src={blogLgBreakpoint ? "/img/hero.png" : "/img/hero-mob.png"}
          alt="Doctor cirujano Ronal Cadillo"
        />
      </ImgWrap>
    </div>
  );
};
export default HeroImage;
