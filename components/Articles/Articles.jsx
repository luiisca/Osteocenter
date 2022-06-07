import tw, {css, styled, theme} from 'twin.macro';

import {BsArrowLeft, BsArrowRight} from 'react-icons/bs';

import {BaseContainer, BaseLink} from '../BaseStyle';
import {Button, Heading, PageLink} from '../Elements';

const Container = styled(BaseContainer)(() => [
  tw``,
])
const Flex = tw.div`flex gap-3`
const WrapLink = styled(BaseLink)(() => [
  tw`leading-7`,
  css`
    &:link, &:visited {
      ${tw`text-primary`}
      border-bottom: solid 2px ${theme`colors.primary`}
    }
    &:hover, &:active {
      ${tw`text-primary-shade-1`}
      border-color: ${theme`colors.primary.shade-1`}
    }
  `,
])

const Articles = () => {
  return (
    <Container>
      <div>
        <Heading subHeading as='span'>Artículos</Heading>
        <Heading secondary as='h2' tw='max-w-[15ch] mb-6'>Lo último de Osteocenter</Heading>
        <PageLink nextLink custom destination='/blog'>
          <WrapLink tw='mb-5'>Ver todos</WrapLink>
        </PageLink>
        <Flex>
          <Button type='icon'>
            <BsArrowLeft />
          </Button>
          <Button type='icon'>
            <BsArrowRight />
          </Button>
        </Flex>
      </div>
    </Container>
  )
}

export default Articles
