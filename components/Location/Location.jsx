import tw, {css, styled} from 'twin.macro';
import {BaseContainer as Container} from '../BaseStyle';
import {Heading} from '../Elements';
import Map from '../Map';

const Location = () => {
  return (
    <Container tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>
      <Map />
    </Container>
  )
}

export default Location
