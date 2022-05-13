import tw, {css, styled} from 'twin.macro';

const BaseLink = styled.a(props => [
  css`
    &:link, &:visited {
      display: inline-block;
      text-decoration: none;
      ${tw`text-accent-333`}
      transition: all 0.3s;
    };
    &:hover, &:active {
      ${tw`text-primary-shade-1`};
    }
  `,
])

export default BaseLink;
