import { useState } from "react";
import tw, { styled, css } from "twin.macro";
import Image from "next/image";
import { Text } from "@chakra-ui/react";

import { BaseContainer as Container } from "@/components/BaseStyle";
import withScrollMotion from "@/components/HOCS/withScrollMotion";
import SEO from "@/components/SEO";
import { WEB_LINK } from "@/static/ts/constants";
import { Divider } from "@/components/Blog/layout";
import Filter from "@/components/Blog/Filter";
import { Heading } from "@/components/Elements";
import CallToAction from "@/components/CallToAction";
import { Section } from "../pages";
import { ADDRESS } from "@/static/ts/constants";

const CATEGORIES: Array<{ title: string }> = [
  "Consulta",
  "Tratamiento",
  "Cirugía",
  "Ortopedia",
].map((el) => ({ title: el }));

interface Content {
  title: string;
  category: string;
  coverImage: string;
  icon: string;
  description?: string;
  details?: React.ReactNode;
}
const SERVICES_CONTENT: Array<Content> = [
  {
    title: "Consulta médica presencial",
    category: "Consulta",
    coverImage: "consulta-medica-presencial.jpg",
    icon: "clinic.png",
    description: `Reciba atencion personalizada en nuestra clinica ubicada en ${ADDRESS}`,
    details: (
      <>
        <ul>
          <li>Puede pedir su cita en línea o en la clínica</li>
        </ul>
      </>
    ),
  },
  {
    title: "Telemedicina",
    category: "Consulta",
    coverImage: "telemedicina.jpg",
    icon: "smartphone.png",
    description:
      "Valoramos su tiempo asi que le damos la opcion de tener una videollamada con nuestro especialista para evaluar su situacion.",
    details: (
      <>
        <ol>
          <li>Pida su cita en línea</li>
          <li>Seleccione el día y la hora que mejor se ajuste a su horario</li>
          <li>Acceda a una videollamada con su doctor en el día pactado</li>
        </ol>
      </>
    ),
  },
  {
    title: "Atención a domicilio",
    category: "Consulta",
    coverImage: "atencion-a-domicilio.jpg",
    icon: "home.png",
    description:
      "Llegamos hasta donde se encuentre para ofrecerle la atencion que se merece.",
  },
  {
    title: "Terapia con ondas de choque",
    category: "Tratamiento",
    coverImage: "terapia-con-ondas-de-choque.jpg",
    icon: "waves.png",
    description:
      "Alivia el dolor y promueve la reparación de sus músculos dañados",
    details: (
      <>
        <ul>
          <li>
            Promueve la regeneración y procesos reparativos de los tendones,
            músculos y otros tejidos blandos.
          </li>
          <li>Cura la inflamación crónica</li>
          <li>Alivia el dolor crónico</li>
        </ul>
      </>
    ),
  },
  {
    title: "Tratamiento de secuelas y deformidades oseas",
    category: "Tratamiento",
    coverImage: "tratamiento-de-secuelas-y-deformidades.jpg",
    icon: "bone.png",
  },
  {
    title: "Tratamiento de lesiones deportivas",
    category: "Tratamiento",
    coverImage: "tratamiento-de-lesiones-deportivas.jpg",
    icon: "balloon.png",
    description:
      "Le ayudamos a volver a la cancha en el mejor estado lo antes posible",
  },
  {
    title: "Emergencias",
    category: "Tratamiento",
    coverImage: "emergencias.jpg",
    icon: "ambulance.png",
    description: "Atendemos todo tipo de emergencias las 24 horas del dia",
  },
  {
    title: "Intervenciones quirúrgicas",
    category: "Cirugía",
    coverImage: "intervenciones-quirurgicas.jpg",
    icon: "scalpel.png",
    description: "Vuelva a sentirse bien gracias a nuestro equipo de ciruganos",
    details: (
      <>
        <ul>
          <li>Prótesis de cadera</li>
          <li>Artroscopia de rodilla</li>
          <li>Cirugía de tumores óseos y musculares</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cirugía reconstructiva y estética",
    category: "Cirugía",
    coverImage: "cirugia-reconstructiva-y-estetica.jpg",
    icon: "scalpel.png",
  },
  {
    title: "Ortopedia infantil",
    category: "Ortopedia",
    coverImage: "ortopedia-infantil.jpg",
    icon: "toys.png",
    description:
      "Ayudamos a tu nino a tener una infancia feliz y llena de juego",
    details: (
      <>
        <ul>
          <li>Displacia de cadera</li>
          <li>Pie plano</li>
          <li>Deformidades angulares, etc</li>
        </ul>
      </>
    ),
  },
];
const FILTERED_SERVICES_CONTENT: Record<string, Content[]> =
  SERVICES_CONTENT.reduce((filtered, service) => {
    if (filtered[service.category]) {
      filtered[service.category]?.push(service);

      return {
        ...filtered,
      };
    }
    return {
      ...filtered,
      [service.category as string]: [service],
    };
  }, {} as Record<string, Content[]>);

const StyledHeading = tw(
  Heading
)`w-full text-center my-12 text-[1.625rem] leading-[2.125rem] text-primary-shade-3 md:my-20 md:text-4xl md:leading-[2.875rem]`;
const Title = ({ children }: { children: React.ReactNode }) => (
  <StyledHeading as="h1" primary>
    {children}
  </StyledHeading>
);

const CoverWrap = styled.div(() => [
  tw`rounded-md overflow-hidden w-full h-full h-[clamp(250px, 25vh, 400px)]`,
  css`
    & > span {
      ${tw`rounded-md`}
    }
  `,
]);
const LogoWrap = styled.div(() => [
  tw`absolute top-full left-1/2 translate-x-[-50%] translate-y-[-50%]`,
  tw`w-24 h-24 bg-center bg-no-repeat bg-contain p-7`,
  css`
    background-image: url("../static/img/shapes/center-bubble.png");
  `,
]);

const Service = ({ content }: { content: Content }) => {
  return (
    <div tw="p-4 hover:translate-y-[-5px] transition ease-in-out duration-300">
      <div tw="relative mb-16">
        <CoverWrap>
          <Image
            src={`/img/services/cover/${content.coverImage}`}
            alt={`${content.title}`}
            layout="fill"
            objectFit="cover"
          />
        </CoverWrap>
        <LogoWrap>
          <Image
            src={`/img/services/icons/${content.icon}`}
            alt={`${content.icon.split(".")[0]} icon`}
            layout="responsive"
            sizes="5vw"
            width="1"
            height="1"
          />
        </LogoWrap>
      </div>
      <div tw="text-center">
        <Heading subHeading as="span" tw="mb-5 md:mb-[1.5rem]">
          {content.category}
        </Heading>
        <Heading tertiary as="h2" tw="text-2xl md:text-3xl mb-4 md:mb-5">
          {content.title}
        </Heading>
        {content.description && (
          <Text tw="text-sm md:text-base leading-6 blog-lg:mb-7 text-accent-555">
            {content.description}
          </Text>
        )}
      </div>
    </div>
  );
};
const CustomTabPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div tw="grid gap-8 md:grid-cols-2 blog-lg:grid-cols-3 p-0">{children}</div>
  );
};

const Services = () => {
  const AnimatedTitle = withScrollMotion({ Element: Title });
  const [crrTab, setCrrTab] = useState<string>("Servicios");

  return (
    <SEO
      description={
        "Empresa dedicada a la prevención, atención y recuperación de patologías que afectan al sistema músculo esquelético. Contamos con especialistas altamente capacitados. Separa citas, recibe tratamiento, prescripciones y haz consultas a tu medico todo desde nuestra plataforma en linea."
      }
      image={`${WEB_LINK}/img/osteocenter-logo.png`}
      title="Servicios | Clínica Osteocenter"
      keywords={
        "consulta medica presencial, teleconsultas, atencion a domicilio, procedimientos, terapia con ondas de choque, protesis de cadera, cirugia artroscopica de rodilla, cirugia de tumores oseos y musculares, cirugia reconstructiva y estetica, tratamiento de secuelas y deformidades oseas, ortopedia infantil, emergencias, tratamiento de lesiones deportivas"
      }
    >
      <Container tw="mt-0">
        <AnimatedTitle>{crrTab}</AnimatedTitle>
        <Divider tw="mb-20" />

        <div tw="mb-20 md:mb-24 blog-lg:mb-[7.5rem]">
          <Filter
            categories={[{ title: "Todos" }, ...CATEGORIES]}
            elements={SERVICES_CONTENT}
            filteredElements={FILTERED_SERVICES_CONTENT}
            Component={Service}
            CustomTabPanel={CustomTabPanel}
            setCrrTab={setCrrTab}
          />
        </div>
      </Container>

      <Section cta>
        <CallToAction />
      </Section>
    </SEO>
  );
};

export default Services;
