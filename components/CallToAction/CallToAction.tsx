import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {Button, Heading} from '../Elements';
import {BaseContainer} from '../BaseStyle';

const BackColor = styled(BaseContainer)(() => [
  tw`max-w-none bg-primary-tint-2 py-28`,
])
const Container = tw.div`max-w-screen-xl flex items-center gap-14 mx-auto`
const Text = tw.p`text-lg max-w-[50ch]`
const ImgWrap = tw.div`w-1/3 h-1/3`

const CallToAction = () => (
  <BackColor>
    <Container>
      <div>
        <Heading primary as='h1' tw='max-w-[20ch]'>
          Tu salud en las mejores manos.
        </Heading>
        <Text tw='mb-5'>
          Reserva tu cita hoy mismo y nos comunicaremos contigo para darte la atencion que mereces lo antes posible.
        </Text>
        <Button type='text' cta href='#'>
          Pide una cita
        </Button>
      </div>
      <ImgWrap>
        <Image
          src='/img/cta-health.svg'
          alt='corazon junto con equipo medico'
          layout='responsive'
          width='1'
          height='1'
          size='50vw'
        />
      </ImgWrap>
    </Container>
  </BackColor>
)

export default CallToAction
