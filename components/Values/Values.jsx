import tw, {css, styled} from 'twin.macro';
import {BaseContainer} from '../BaseStyle';
import {Heading} from '../Elements';
import Value from './Value';

const Container = tw(BaseContainer)``
const Text = tw.p`text-xl m-auto mb-20 max-w-prose`

const ValuesContainer = tw.div`flex justify-center gap-16`

const Values = () => {
  return (
    <Container>
      <Heading as='h2' secondary>
        Cirugía ortopédica y traumatología.
      </Heading>
      <Text>
        Con más de 5 años de experiencia y más de 500 cirugías realizadas, el
        Dr. Cadillo le ofrece: Confianza, humanidad, buenos resultados.
      </Text>
      <ValuesContainer>
        <Value name='confianza' shapePosition='left' />
        <Value name='calidad' shapePosition='center' />
        <Value name='humanidad' shapePosition='right' />
      </ValuesContainer>
    </Container>
  )
}

export default Values;
