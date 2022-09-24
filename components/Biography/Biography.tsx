import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import tw, { css, styled, theme } from "twin.macro";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";
import Tabs from "./Tabs";

const BackColor = tw(
  BaseContainer
)`max-w-[1300px] bg-primary-tint-2 rounded-[11px] p-8 pb-0 pr-0 my-16`;

const Container = styled.div(() => [
  tw`max-w-screen-xl grid grid-rows-1 blog-lg:grid-cols-[1fr 2fr] items-start my-0 mx-auto overflow-hidden`,
]);

const ImgWrap = styled.span(() => [
  tw`w-full self-end max-w-[370px] mx-auto blog-lg:mx-0 blog-lg:pt-8 blog-lg:pl-8`,
  tw`hidden blog-lg:block`,
  css`
    transform: rotateY(180deg);
  `,
]);

const Biography = (): JSX.Element => {
  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [changeTab, setChangeTab] = useState<number>(1);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [tabHeight, setTabHeight] = useState<number | null>(null);

  useEffect(() => {
    const imgHeight = imgRef?.current?.clientHeight as number;
    const titleHeight = titleRef?.current?.clientHeight as number;
    const tabsHeight = tabsRef?.current?.clientHeight as number;
    const containerHeight = tabsHeight + titleHeight;

    console.log("overflowing?", containerHeight, imgHeight, tabsHeight);
    if (containerHeight > imgHeight) {
      setTabHeight(imgHeight - titleHeight);
      setIsOverflow(true);
    } else setIsOverflow(false);
  }, [changeTab]);

  return (
    <BackColor>
      <Container ref={containerRef}>
        <ImgWrap ref={imgRef}>
          <Image
            priority={true}
            src="/img/hero.png"
            alt="Doctor cirujano Ronal Cadillo"
            layout="responsive"
            sizes="20vw"
            width="375"
            height="574"
          />
        </ImgWrap>
        <div tw="w-full blog-lg:grid blog-lg:grid-rows-[2.5fr 7.5fr] blog-lg:h-full">
          <div tw="mb-12 blog-lg:mb-0" ref={titleRef}>
            <Heading as="h2" secondary tw="mb-4 text-center md:text-left">
              Dr. Ronal Cadillo Medina.
            </Heading>
            <p tw="text-lg mb-8 text-accent-555 text-center md:text-left">
              Cirujano Ortopédico y traumatólogo.
            </p>
          </div>
          <Tabs
            isOverflow={isOverflow}
            height={tabHeight}
            ref={tabsRef}
            setChangeTab={setChangeTab}
          />
        </div>
      </Container>
    </BackColor>
  );
};

export default Biography;
