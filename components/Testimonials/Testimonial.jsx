import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {Heading} from '../Elements';

const Quote = tw.blockquote`my-0 mx-auto mb-10 text-xl leading-8 max-w-[75ch] rounded-[9px]`

const Text = tw.p`text-lg justify-center gap-3 flex items-center`
const ImgWrap = styled.span(() => [
  tw`inline-block w-10 rounded-full`,
  css`
    &>span {
      ${tw`rounded-full`}
    }
  `,
])

const Testimonial = ({name, message, img}) => {
  return (
    <div>
      <Quote>
        {message}
      </Quote>
      <Text>
        <ImgWrap>
          <Image
            src={`/img/customers/${img}`}
            layout='responsive'
            sizes='5vw'
            width='1'
            height='1'
          />
        </ImgWrap>
        {name}
      </Text>
    </div>
  )
}

export default Testimonial
