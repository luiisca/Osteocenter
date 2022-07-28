import tw, { styled } from "twin.macro";
import { Fragment } from "react";
import Hero from "../Hero";
import Values from "../Values";
import Biography from "../Biography";
import Steps from "../Steps";
import Testimonials from "../Testimonials";
import Location from "../Location";
import CallToAction from "../CallToAction";
import Articles from "../Articles";

interface SectionProps {
  hero?: boolean;
  valuesSection?: boolean;
  biography?: boolean;
  cta?: boolean;
}

const Section = styled.section((props: SectionProps) => [
  tw`py-24`,
  props.hero && tw`pt-12 bg-primary-tint-3`,
  props.valuesSection && tw`text-center`,
  props.biography && tw`p-0 mx-8 md:mx-16`,
  props.cta && tw`p-0`,
]);
const Main = (): JSX.Element => {
  return (
    <Fragment>
      <Section hero>
        <Hero />
      </Section>
      <Section valuesSection>
        <Values />
      </Section>
      <Section biography>
        <Biography />
      </Section>
      <Section>
        <Steps />
      </Section>
      <Section tw="py-[7rem] bg-primary-tint-3">
        <Testimonials />
      </Section>
      <Section>
        <Location />
      </Section>
      <Section cta>
        <CallToAction />
      </Section>
    </Fragment>
  );
};
//           <Section>
//           <Articles />
//           </Section>
export default Main;
