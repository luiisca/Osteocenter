import tw, {css, styled} from 'twin.macro';
import {animated} from 'react-spring';
import {BaseLink} from '../../BaseStyle';

interface IconProps {
  elType: 'icon'
  children?: React.ReactNode
  inactive?: boolean
  onClick?: (e?: any) => boolean | void
  style?: {}
}
interface TextProps {
  elType: 'text'
  children?: React.ReactNode
  target?: string
  href?: string
  nav?: boolean
  cta?: boolean
  hero?: boolean
  outline?: boolean
  arrow?: boolean
  onClick?: (e?: any) => boolean | void
  style?: {}
}
type Props = TextProps | IconProps;

const Text = styled(BaseLink)<TextProps>(props => [
  css`
    &:link, &:visited {
      ${tw`px-8 py-4 bg-primary`}
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
const Icon = styled(animated.button)<IconProps>(props => [
    tw`flex items-center justify-center transition-all`,
    tw`w-[50px] h-[50px] text-3xl text-primary-shade-1 bg-white rounded-full shadow-md`,
    props.inactive && tw`cursor-not-allowed text-primary-tint-1`,

    css`
      box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
      &:hover {
        box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
      }
    `,
])
const Button = ((props: Props): JSX.Element => {
  if (props.elType === 'icon') {
    return (
      <Icon {...props}>{props.children}</Icon>
    )
  }

  return (
    <Text {...props}>{props.children}</Text>
  )
})

export default Button
