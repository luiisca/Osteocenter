import tw, {css, styled} from 'twin.macro';

const BaseLink = styled.a(() => [
  tw`cursor-pointer`,
  css`
    &:link, &:visited {
      ${tw`inline-block`}
      ${tw`border-none cursor-pointer`}
      ${tw`no-underline text-accent-333`}
      ${tw`transition-all duration-300`}
      font-family: inherit;
    };
    &:hover, &:active {
      ${tw`text-primary-shade-1`}
    }
  `,
])

export default BaseLink;
