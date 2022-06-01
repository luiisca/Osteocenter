import tw, {css, styled} from 'twin.macro';

const Title = styled.p(({main}) => [
  tw`text-lg text-accent-333 mb-1`,
  main && tw`text-xl`,
])

export default Title
