import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

const Container = tw.div`w-4/5 h-full`
const ImgWrap = styled.span(() => [
  css`
    & img {
      ${tw`relative`}
      ${tw`bg-primary-tint-1`}
      ${tw`rounded-[230px] w-full h-auto`}
    }
  `,
])

const HeroImage = () => {
  return (
    <Container>
      <ImgWrap>
        <Image
          priority={true}
          layout='raw'
          sizes='50vw'
          width='400'
          height='600'
          src="/img/hero.png"
          alt="Doctor cirujano Ronal Cadillo" />
      </ImgWrap>
    </Container>
  )
}
export default HeroImage
