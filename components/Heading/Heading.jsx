import tw, {css, styled} from 'twin.macro';
import {BaseHeading} from '../BaseStyle';

const Heading = styled(BaseHeading)(({primary, secondary, tertiary, subHeading}) => [
  primary && tw`text-6xl leading-[1.1] mb-8`,
  secondary && tw`mb-24 text-5xl leading-normal`,
  tertiary && tw`text-3xl leading-[1.2] mb-8`,
  subHeading && tw`font-sans block text-sm font-medium text-primary-shade-1 uppercase mb-0.5 tracking-[0.75px]`,
])

export default Heading
