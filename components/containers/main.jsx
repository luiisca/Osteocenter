import tw, {css, styled} from 'twin.macro';
import {Fragment} from "react";
import Hero from '../Hero';

const Section = styled.section(props => [
  tw`px-24`,
  props.hero && tw`bg-primary-tint-3`
])

const Main = () => {
  return (
    <Fragment>
      <Section hero>
        <Hero />
      </Section>

    </Fragment>
  )
}
export default Main;
