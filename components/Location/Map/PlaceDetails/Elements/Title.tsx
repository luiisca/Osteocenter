import tw, {styled} from 'twin.macro';

const Title = styled.p(({main}: {main?: boolean}) => [
  tw`mb-1 text-lg text-accent-333`,
  main && tw`text-xl`,
])

export default Title
