import tw, { css, styled } from "twin.macro";
import { animated } from "react-spring";
import { BaseLink } from "../../BaseStyle";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e?: any) => boolean | Promise<void> | void;
  style?: {};
  fullscreen?: boolean;
  loadingRoute?: boolean;
  disabled?: boolean;
}

interface IconProps extends ButtonProps {
  elType: "icon";
  Icon: any;
  inactive?: boolean;
  elRef?: any;
}
interface TextProps extends ButtonProps {
  elType: "text";
  target?: string;
  href?: string;
  nav?: boolean;
  cta?: boolean;
  hero?: boolean;
  outline?: boolean;
  arrow?: boolean;
}
interface SubmitProps extends ButtonProps {
  elType: "submit";
  type: "submit";
  cta?: boolean;
  hero?: boolean;
}
type Props = TextProps | IconProps | SubmitProps;

const IconBttn = (props: any) => {
  const { elType, inactive, elRef, Icon, ...passThrough } = props;

  return (
    // @ts-ignore
    <animated.button {...passThrough}>
      <Icon />
    </animated.button>
  );
};

const bttnStyling = (props: any) => {
  return css`
     {
      ${tw`px-8 py-4 bg-primary`}
      ${tw`rounded-[9px]`}
    ${tw`text-lg font-medium text-white leading-[20px]`}
    ${props.nav && tw`px-6 py-3 leading-[18px]`}
    ${props.cta && tw`bg-primary`}
    ${props.hero && tw`font-semibold`}
    ${props.outline &&
      tw`text-xl leading-[20px] font-semibold bg-white text-accent-555`}
    ${props.arrow && tw`rounded-full bg-primary-tint-3`}
    }
  `;
};
const Submit = styled.button<SubmitProps>((props) => [
  css`
    ${bttnStyling(props)}
  `,
]);
const Text = styled(BaseLink)<TextProps>((props) => [
  css`
    &:link,
    &:visited {
      ${bttnStyling(props)}
    }
    &:hover,
    &:active {
      ${props.cta && tw`bg-primary-shade-1`}
      ${props.outline &&
      css`
        ${tw`bg-primary-tint-3`}
        box-shadow: inset 0 0 0 3px #fff;
      `}
    }
  `,
]);
const getIconStyles = (props: any) => [
  tw`flex items-center justify-center transition-all`,
  tw`w-[50px] h-[50px] text-3xl text-primary-shade-1 bg-white rounded-full shadow-md`,
  props.inactive && tw`cursor-not-allowed text-primary-tint-1`,

  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
  `,
];

const Icon = styled(IconBttn)(getIconStyles);

const Button = (props: Props): JSX.Element => {
  if (props.elType === "icon") {
    return <Icon {...props}>{props.children}</Icon>;
  }
  if (props.elType == "text") {
    return <Text {...props}>{props.children}</Text>;
  }
  if (props.elType == "submit") {
    return <Submit {...props}>{props.children}</Submit>;
  }
  return <button>Default button</button>;
};

export default Button;
