import tw, {css, styled} from 'twin.macro';
import {BaseLink} from '../BaseStyle';

const Button = styled(BaseLink)(props => [
  css`
    &:link, &:visited {
      ${tw`px-6 py-3`}
      ${tw`rounded-[9px]`}
      ${tw`text-lg font-medium text-white`}
      ${props.cta && tw`bg-primary`}
      ${props.hero && tw`font-semibold`}
      ${props.outline && tw`px-8 py-4 text-xl font-semibold bg-white text-accent-555`}
    }
    &:hover, &:active {
      ${props.cta && tw`bg-primary-shade-1`}
      ${props.outline && css`
        ${tw`bg-primary-tint-3`}
        box-shadow: inset 0 0 0 3px #fff;
      `}
    }
  `
])


export default Button
