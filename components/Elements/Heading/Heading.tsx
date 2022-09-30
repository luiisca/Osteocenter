import tw, { styled } from "twin.macro";
import { BaseHeading } from "../../BaseStyle";

interface Props {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  subHeading?: boolean;
}

const Heading = styled(BaseHeading)(
  ({ primary, secondary, tertiary, subHeading }: Props) => [
    primary && tw`text-5xl xl:text-6xl leading-[1.1] my-0 mb-8`,
    secondary && tw`mb-8 text-4xl md:text-5xl leading-[1.1]`,
    tertiary && tw`text-3xl md:text-4xl leading-[1.2] mb-8`,
    subHeading &&
      tw`font-sans block text-sm font-medium text-primary-shade-1 uppercase mb-4 tracking-[0.75px]`,
  ]
);

export default Heading;
