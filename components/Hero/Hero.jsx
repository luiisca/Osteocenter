import tw, {css, styled} from 'twin.macro';

import {Button, Heading} from '../../components';
import CustomerPictures from './CustomerPictures';
import HeroImage from './HeroImage';

const Container = tw.div`max-w-screen-2xl mx-auto py-8 grid grid-cols-2 gap-2.5 items-center justify-items-end`
const Text = tw.p`text-xl mb-12`

const Hero = () => {
  return (
    <Container>
      <div>
        <Heading primary> Cirugía ortopédica y traumatología con las mejores garantías.</Heading>
        <Text>
          Médico traumatólogo con amplia experiencia en el manejo quirúrgico
          de fracturas, reconstrucciones óseas, Prótesis de caderas, tumores
          óseos y músculo esquelético.
        </Text>
        <Button cta hero href="#" tw='mr-4'>Pide una cita</Button>
        <Button outline href="#biography">Más sobre mí &darr;</Button>
        <CustomerPictures />
      </div>

      <HeroImage />
    </Container>
  )
}

export default Hero
