import tw, {css, styled} from 'twin.macro';

import {Heading} from '../Elements';
import {BaseContainer as Container} from '../BaseStyle';
import Step from './Step';

const StepsContainer = tw.div`grid grid-cols-2 gap-x-16 gap-y-24 items-center`
const Description = tw.p`text-lg leading-[1.8]`

const Steps = (): JSX.Element => {
  return (
    <Container>
      <div>
        <Heading as='span' subHeading>Proceso</Heading>
        <Heading as='h2' secondary tw='mb-12'>La atención que mereces</Heading>
      </div>

      <StepsContainer>
        <Step src='cita.png' name='reserva tu cita' num='01'>
          <Heading as='h3' tertiary>
            Separa tu cita.
          </Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna. In.
          </Description>
        </Step>

        <Step src='primera-cita.png' name='primera cita' num='02'>
          <Heading as='h3' tertiary>
            Primera cita.
          </Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna. In.
          </Description>
        </Step>

        <Step src='diagnostico.png' name='diagnostico' num='03'>
          <Heading as='h3' tertiary>
            Diagnóstico.
          </Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna. In.
          </Description>
        </Step>

        <Step src='tratamiento.png' name='diagnostico' num='04'>
          <Heading as='h3' tertiary>
            Tratamiento.
          </Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna. In.
          </Description>
        </Step>

        <Step src='hospitalizacion.png' name='hospitalizacion' num='05'>
          <Heading as='h3' tertiary>
            Hospitalización.
          </Heading>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate lorem hendrerit est hendrerit egestas. Proin ac metus egestas, luctus ligula finibus, dictum urna. In.
          </Description>
        </Step>
      </StepsContainer>
    </Container >
  )
}

export default Steps
