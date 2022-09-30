import { useRef, useEffect, useState } from "react";
import tw, { styled, css } from "twin.macro";

import Card from "./Card";
import Image from "next/image";

import { BaseContainer } from "@/components/BaseStyle";
import { Heading } from "@/components/Elements";

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

const Tab = styled.div((props: { overflow: boolean; height: number }) => [
  tw`w-full pb-4 overflow-hidden`,
  props.overflow && tw`overflow-y-scroll`,
  css`
    height: ${props.height}px;
  `,
]);

const Education = () => {
  return (
    <>
      <Card
        image="hospital"
        period="1997 - 2003"
        name="Licenciatura en Medicina y Cirugía"
      />
      <Card
        image="hospital"
        period="2002 - 2003"
        name="Foreign Student Exchange Year"
      />
      <Card image="hospital" period="2005 - 2007" name="Cursos de Doctorado" />
    </>
  );
};
const Experience = () => {
  return (
    <>
      <Card
        image="hospital"
        period="2010 - 2013"
        name="Hospital San Juan de Dios"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image="hospital" period="2010 - 2013" name="Clínica Zavaleta">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image="hospital" period="2010 - 2013" name="Clínica Zavaleta">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card
        image="hospital"
        period="2010 - 2013"
        name="Hospital San Juan de Dios"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
    </>
  );
};

const TabButton = styled.button(({ active }: { active: boolean }) => [
  tw`block px-5 py-4 text-base text-center blog-lg:py-8 md:text-left`,
  tw`w-full blog-lg:w-auto`,
  tw`text-[#6c6c6c] border-[#b4b2b2] border-b-[1.8px] md:border-l-[1.8px] md:border-b-0 cursor-pointer`,
  active &&
    tw`text-[#010d17] border-[#172632] border-b-[1.9px] md:border-b-0 md:border-l-[1.9px]`,
]);

const Biography = (): JSX.Element => {
  const [_, setChangeTab] = useState<number>(1);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [tabHeight, setTabHeight] = useState<number | null>(null);
  const [activeBttn, setActiveBttn] = useState<number>(1);

  const imgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLDivElement>(null);

  const imgHeight = imgRef?.current?.clientHeight as number;
  const titleHeight = titleRef?.current?.clientHeight as number;
  const tabsHeight = tabsRef?.current?.clientHeight as number;
  const containerHeight = tabsHeight + titleHeight;

  const handleToggle = (bttn: number): void => setActiveBttn(bttn);

  useEffect(() => {
    console.log("overflowing?", containerHeight, imgHeight, tabsHeight);
    if (containerHeight > imgHeight) {
      setTabHeight(imgHeight - titleHeight);
      setIsOverflow(true);
    } else setIsOverflow(false);
  }, [imgHeight, titleHeight, tabsHeight, containerHeight]);

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

          {/*Tabs*/}
          <div tw="flex gap-8 md:gap-24 flex-col md:flex-row">
            <div tw="flex flex-row md:flex-col pr-8 md:pr-0">
              <TabButton
                onClick={() => {
                  handleToggle(1);
                  setChangeTab(1);
                }}
                active={activeBttn === 1}
              >
                Estudios
              </TabButton>
              <TabButton
                onClick={() => {
                  handleToggle(2);
                  setChangeTab(2);
                }}
                active={activeBttn === 2}
              >
                Experiencia
              </TabButton>
            </div>

            <Tab
              overflow={isOverflow}
              height={tabHeight || (tabRef?.current?.clientHeight as number)}
            >
              <div
                tw="grid justify-center md:justify-start grid-cols-[repeat(2, minmax(0, 30ch))] gap-x-12 gap-y-16"
                ref={tabsRef}
              >
                {activeBttn === 1 && <Education />}
                {activeBttn === 2 && <Experience />}
              </div>
            </Tab>
          </div>
        </div>
      </Container>
    </BackColor>
  );
};

export default Biography;
