import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

const Container = tw.div`flex items-center gap-4 mt-20`
const Images = tw.div`flex`

const ImageWrap = styled.span(() => [
  css`
    &>span {
      ${tw`rounded-full mr-[-16px]`},
      ${tw`border-solid border-[3px] border-primary-tint-3`},
    }
  `,
])
const Text = styled.p(() => [
  tw`text-lg font-semibold`,
  css`
    &>span {
      ${tw`font-bold text-primary-shade-1`}
    }
  `,
])

const CustomerPictures = () => {
  return (
    <Container>
      <Images>
        <ImageWrap src="/img/customers/customer-1.jpg" alt="Foto de paciente satisfecho" width='48' height='48' />
        <ImageWrap src="/img/customers/customer-2.jpg" alt="Foto de paciente satisfecho" width='48' height='48' />
        <ImageWrap src="/img/customers/customer-3.jpg" alt="Foto de paciente satisfecho" width='48' height='48' />
        <ImageWrap src="/img/customers/customer-4.jpg" alt="Foto de paciente satisfecho" width='48' height='48' />
        <ImageWrap src="/img/customers/customer-5.jpg" alt="Foto de paciente satisfecho" width='48' height='48' />
      </Images>

      <Text>
        <span>250+</span> pacientes satisfechos con nuestros servicios.
      </Text>
    </Container>
  )
}

export default CustomerPictures
