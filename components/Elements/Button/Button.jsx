import tw, {css, styled} from 'twin.macro';
import {BaseLink} from '../../BaseStyle';
import {useSpring, animated} from 'react-spring';

const Text = styled(BaseLink)(props => [
  css`
    &:link, &:visited {
      ${tw`px-8 py-4`}
      ${tw`rounded-[9px]`}
      ${tw`text-lg font-medium text-white leading-[20px]`}
      ${props.nav && tw`px-6 py-3 leading-[18px]`}
      ${props.cta && tw`bg-primary`}
      ${props.hero && tw`font-semibold`}
      ${props.outline && tw`text-xl leading-[20px] font-semibold bg-white text-accent-555`}
      ${props.arrow && tw`rounded-full bg-primary-tint-3`}
    }
    &:hover, &:active {
      ${props.cta && tw`bg-primary-shade-1`}
      ${props.outline && css`
        ${tw`bg-primary-tint-3`}
        box-shadow: inset 0 0 0 3px #fff;
      `}
    }
  `,
])
const Icon = styled(animated.button)(props => [
  tw`flex items-center justify-center transition-all`,
  tw`w-[50px] h-[50px] text-3xl text-primary-shade-1 bg-white rounded-full shadow-md`,
  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
  `
])

const Button = (props => {
  if (props.type == 'icon') {
    return (
      <Icon {...props}>{props.children}</Icon>
    )
  } else if (props.type == 'text') {
    return (
      <Text {...props}>{props.children}</Text>
    )
  }
})

export default Button
