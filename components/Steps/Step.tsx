import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

interface Props {
  src: string
  name: string
  num: string
  children: React.ReactNode
}

const Number = tw.p`text-8xl font-semibold text-[#ddd] mb-3`
const ImgWrap = styled.div(() => [
  tw`justify-self-center w-[clamp(200px, 80%, 400px)]`,
  tw`rounded-[9px] overflow-hidden`
])

const Step = ({src, name, num, children}: Props) => {
  if (+num % 2) {
    return (
      <>
        <ImgWrap>
          <Image
            src={`/img/steps/${src}`}
            alt={`${name} ilustración`}
            layout='responsive'
            sizes='20vw'
            width='1'
            height='1' />
        </ImgWrap>
        <div>
          <Number>{num}</Number>
          {children}
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <Number>{num}</Number>
          {children}
        </div>
        <ImgWrap>
          <Image
            src={`/img/steps/${src}`}
            alt={`${name} ilustración`}
            layout='responsive'
            sizes='20vw'
            width='1'
            height='1' />
        </ImgWrap>
      </>
    )
  }
}

export default Step
