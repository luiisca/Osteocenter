import tw, { css, styled } from "twin.macro";
import { useState } from "react";

import Card from "./Card";

const Grid = tw.div`grid justify-center md:justify-start grid-cols-[repeat(2, minmax(0, 30ch))] gap-x-12 gap-y-16`;

const Education = (): JSX.Element => {
  return (
    <Grid>
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
    </Grid>
  );
};
const Experience = (): JSX.Element => {
  return (
    <Grid>
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
    </Grid>
  );
};

const TabButton = styled.button(({ active }: { active: boolean }) => [
  tw`block px-5 py-4 text-base text-center blog-lg:py-8 md:text-left`,
  tw`w-full blog-lg:w-auto`,
  tw`text-[#6c6c6c] border-[#b4b2b2] border-b-[1.8px] md:border-l-[1.8px] md:border-b-0 cursor-pointer`,
  active &&
    tw`text-[#010d17] border-[#172632] border-b-[1.9px] md:border-b-0 md:border-l-[1.9px]`,
]);

const Tabs = (): JSX.Element => {
  const [activeBttn, setActiveBttn] = useState<number>(1);
  const handleToggle = (bttn: number): void => setActiveBttn(bttn);

  return (
    <div tw="flex gap-8 md:gap-24 flex-col md:flex-row">
      <div tw="flex flex-row md:flex-col">
        <TabButton onClick={() => handleToggle(1)} active={activeBttn === 1}>
          Estudios
        </TabButton>
        <TabButton onClick={() => handleToggle(2)} active={activeBttn === 2}>
          Experiencia
        </TabButton>
      </div>

      <div tw="overflow-scroll pb-4">
        {activeBttn === 1 && <Education />}
        {activeBttn === 2 && <Experience />}
      </div>
    </div>
  );
};

export default Tabs;
