import tw from "twin.macro";
import { v4 } from "uuid";
import { BaseContainer } from "@/components/BaseStyle";
import { Heading } from "@/components/Elements";
import { Button } from "./Elements";
import { ADDRESS } from "@/static/ts/constants";

import { Service as Card } from "@/pages/servicios";

interface Content {
  title: string;
  category: string;
  coverImage: string;
  icon: string;
  description?: string;
  details?: React.ReactNode;
}

const Ul = tw.ul`ml-5 mb-4 md:mb-6 list-disc`;
const Ol = tw.ol`ml-5 mb-4 md:mb-6 list-decimal`;
const Li = ({ children }: { children: React.ReactNode }) => (
  <>
    <li tw="mb-1 text-[#525252] text-base md:text-lg leading-[1.575rem] tracking-[0.02px] font-normal max-w-[75ch] md:leading-[1.875rem]">
      {children}
    </li>
  </>
);

const SERVICES_CONTENT: Array<Content> = [
  {
    title: "Consulta médica presencial",
    category: "Consulta",
    coverImage: "consulta-medica-presencial.jpg",
    icon: "clinic.png",
    description: `Reciba atencion personalizada en nuestra clinica ubicada en ${ADDRESS}`,
    details: (
      <>
        <Ul>
          <Li>Puede pedir su cita en línea o en la clínica</Li>
        </Ul>
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
        <Ol>
          <Li>Pida su cita en línea</Li>
          <Li>Seleccione el día y la hora que mejor se ajuste a su horario</Li>
          <Li>Acceda a una videollamada con su doctor en el día pactado</Li>
        </Ol>
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
    title: "Tratamiento de lesiones deportivas",
    category: "Tratamiento",
    coverImage: "tratamiento-de-lesiones-deportivas.jpg",
    icon: "balloon.png",
    description:
      "Le ayudamos a volver a la cancha en el mejor estado lo antes posible",
  },
  {
    title: "Intervenciones quirúrgicas",
    category: "Cirugía",
    coverImage: "intervenciones-quirurgicas.jpg",
    icon: "scalpel.png",
    description: "Vuelva a sentirse bien gracias a nuestro equipo de ciruganos",
    details: (
      <>
        <Ul>
          <Li>Prótesis de cadera</Li>
          <Li>Artroscopia de rodilla</Li>
          <Li>Cirugía de tumores óseos y musculares</Li>
        </Ul>
      </>
    ),
  },
  {
    title: "Ortopedia infantil",
    category: "Ortopedia",
    coverImage: "ortopedia-infantil.jpg",
    icon: "toys.png",
    description:
      "Ayudamos a tu niño a tener una infancia feliz y llena de juego",
    details: (
      <>
        <Ul>
          <Li>Displacia de cadera</Li>
          <Li>Pie plano</Li>
          <Li>Deformidades angulares, etc</Li>
        </Ul>
      </>
    ),
  },
];

const Services = () => {
  return (
    <BaseContainer tw="text-center">
      <Heading as="h2" secondary>
        Servicios
      </Heading>
      <div tw="grid gap-8 mob-me:grid-cols-2 blog-lg:grid-cols-3 p-0 mb-12">
        {SERVICES_CONTENT.map((el) => (
          <Card content={el} key={v4()} />
        ))}
      </div>
      <Button elType="text" cta href="/servicios" tw="text-lg">
        Ver todos
      </Button>
    </BaseContainer>
  );
};

export default Services;
