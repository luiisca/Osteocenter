import tw, { styled, css } from "twin.macro";
import { useState, useRef, forwardRef } from "react";

import Card from "./Card";

const Tab = styled.div((props: { overflow: boolean; height: number }) => [
  tw`w-full pb-4 overflow-hidden`,
  props.overflow && tw`overflow-y-scroll`,
  css`
    height: ${props.height}px;
  `,
]);

const Grid = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    isOverflow: boolean;
    height: number | null;
  }
>(function Grid({ children, isOverflow, height }, forwardedRef) {
  const tabRef = useRef<HTMLDivElement>(null);

  return (
    <Tab
      overflow={isOverflow}
      height={height || (tabRef?.current?.clientHeight as number)}
    >
      <div
        tw="grid justify-center md:justify-start grid-cols-[repeat(2, minmax(0, 30ch))] gap-x-12 gap-y-16"
        ref={forwardedRef}
      >
        {children}
      </div>
    </Tab>
  );
});

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

const Tabs = forwardRef<
  HTMLDivElement,
  { isOverflow: boolean; height: number | null; setChangeTab: any }
>(function Tabs({ isOverflow, height, setChangeTab }, forwardedRef) {
  const [activeBttn, setActiveBttn] = useState<number>(1);
  const handleToggle = (bttn: number): void => setActiveBttn(bttn);

  return (
    <div tw="flex gap-8 md:gap-24 flex-col md:flex-row">
      <div tw="flex flex-row md:flex-col">
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

      <Grid isOverflow={isOverflow} height={height} ref={forwardedRef}>
        {activeBttn === 1 && <Education />}
        {activeBttn === 2 && <Experience />}
      </Grid>
    </div>
  );
});

export default Tabs;
