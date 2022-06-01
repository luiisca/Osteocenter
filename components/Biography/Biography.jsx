import Image from 'next/image';

import tw, {css, styled} from 'twin.macro';
import {BaseContainer} from '../BaseStyle';
import Heading from '../Heading';
import Tabs from './Tabs';

const BackColor = tw(BaseContainer)`max-w-none bg-primary-tint-2 rounded-[11px] p-8 pb-0 my-16`
const Container = tw.div`max-w-screen-xl flex items-start gap-14 my-0 mx-auto`
const Content = tw.div`w-full`
const Text = tw.p`text-lg`
const ImgWrap = styled.span(props => [
  tw`w-[45%]`,
  css`
    transform: rotateY(180deg);
  `
])

const Biography = () => {
  return (
    <BackColor>
      <Container>
        <ImgWrap>
          <Image
            priority='true'
            src='/img/hero.png'
            alt='Doctor cirujano Ronal Cadillo'
            layout='responsive'
            sizes='20vw'
            width='375'
            height='574' />
        </ImgWrap>
        <Content>
          <div>
            <Heading as='h2' secondary tw='mb-4'>
              Dr. Ronal Cadillo Medina.
            </Heading>
            <Text tw='mb-8'>
              Cirujano Ortopédico y traumatólogo.
            </Text>
          </div>
          <Tabs />
        </Content>
      </Container>
    </BackColor >
  )
}

export default Biography
