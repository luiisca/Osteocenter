import tw from "twin.macro";
import { BaseContainer } from "../BaseStyle";

import { Button, Heading } from "../Elements";
import CustomerPictures from "./CustomerPictures";
import HeroImage from "./HeroImage";

const Container = tw(
  BaseContainer
)`max-w-screen-2xl gap-2.5 items-center justify-items-end flex flex-col-reverse text-center blog-lg:text-left blog-lg:grid blog-lg:grid-cols-2 gap-16 blog-lg:gap-12`;

const Hero = (): JSX.Element => {
  return (
    <Container>
      <div>
        <Heading primary>
          {" "}
          Cirugía ortopédica y traumatología con las mejores garantías.
        </Heading>
        <p tw="text-xl text-accent-555 leading-relaxed mb-12">
          Médico traumatólogo con amplia experiencia en el manejo quirúrgico de
          fracturas, reconstrucciones óseas, Prótesis de caderas, tumores óseos
          y músculo esquelético.
        </p>
        <div tw="flex blog-lg:justify-start justify-center flex-col gap-4 items-center mob-me:flex-row">
          <Button elType="text" cta hero href="#" tw="text-lg">
            Reserva una cita
          </Button>
          <Button elType="text" outline href="#valores">
            Más información &darr;
          </Button>
        </div>
        <CustomerPictures />
      </div>
      <HeroImage />
    </Container>
  );
};

export default Hero;
