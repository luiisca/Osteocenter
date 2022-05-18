import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import Heading from '../Heading';

const Container = tw.div`grid grid-cols-2 gap-x-12 gap-y-16`
const ImgWrap = styled.span(() => [
  tw`block w-[50px]`,
  css`
    &>span {
      width: 50px;
    }
  `
])

const Text = styled.p((props) => [
  tw`text-lg font-medium leading-6`,
])

const Card = ({period, name, image, children}) => {
  return (
    <div>
      <ImgWrap>
        <Image
          src={`/img/icons/${image}.svg`}
          alt={`${name} icon`}
          layout='responsive'
          size='10vw'
          width='1'
          height='1' />
      </ImgWrap>
      <Heading subHeading>{period}</Heading>
      <Text tw='mb-2'>{name}</Text>
      <Text tw='text-sm'>{children}</Text>
    </div>
  )
}

const Experience = () => {
  return (
    <Container>
      <Card image='hospital' period='2010 - 2013' name='Hospital San Juan de Dios'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Clínica Zavaleta'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Clínica Zavaleta'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
      <Card image='hospital' period='2010 - 2013' name='Hospital San Juan de Dios'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      </Card>
    </Container>
  )
}

export default Experience
