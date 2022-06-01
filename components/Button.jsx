import tw, {css, styled} from 'twin.macro';
import {BaseLink} from './BaseStyle';

const Button = styled(BaseLink)`
  &:link, &:visited {
    ${tw`px-6 py-3`}
    ${tw`rounded-[9px]`}
    ${tw`text-lg font-medium text-white`}
    ${tw`bg-primary`}
  }
  &:hover, &:active {
    ${tw`bg-primary-shade-1`}
  }
 `


export default Button
