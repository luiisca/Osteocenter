import tw, { styled, css } from "twin.macro";
import { v4 } from "uuid";

import { Heading } from "../Elements";
import { BaseContainer as Container } from "../BaseStyle";
import Step from "./Step";

const StepsContainer = styled.div(() => [
  tw`items-center grid grid-cols-1 gap-x-16 gap-y-24`,
]);
const StepsData = [
  {
    src: "cita.png",
    name: "reserva tu cita",
    num: "01",
    title: "Separa tu cita.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna.",
  },
  {
    src: "primera-cita.png",
    name: "primera cita",
    num: "02",
    title: "Primera cita.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna.",
  },
  {
    src: "diagnostico.png",
    name: "diagnostico",
    num: "03",
    title: "Diagnóstico.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna.",
  },
  {
    src: "tratamiento.png",
    name: "tratamiento",
    num: "04",
    title: "Tratamiento.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna.",
  },
  {
    src: "hospitalizacion.png",
    name: "hospitalizacion",
    num: "05",
    title: "Hospitalización.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna.",
  },
];

const Steps = (): JSX.Element => {
  return (
    <Container>
      <div>
        <Heading as="span" subHeading>
          Proceso
        </Heading>
        <Heading as="h2" secondary tw="mb-12 text-4xl md:text-5xl">
          La atención que mereces
        </Heading>
      </div>

      <StepsContainer>
        {StepsData.map((data) => (
          <Step key={v4()} src={data.src} name={data.name} num={data.num}>
            <Heading
              as="h3"
              tertiary
              tw="text-2xl md:text-4xl leading-[1.2] mb-8"
            >
              {data.title}
            </Heading>
            <div tw="text-lg text-accent-555 leading-[1.8]">
              {data.description}
            </div>
          </Step>
        ))}
      </StepsContainer>
    </Container>
  );
};

export default Steps;
