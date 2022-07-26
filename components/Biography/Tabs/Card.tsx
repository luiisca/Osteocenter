import Image from "next/image";
import tw, { styled } from "twin.macro";

import { Heading } from "../../Elements";

interface Props {
  period: string;
  name: string;
  image: string;
  children?: React.ReactNode;
}

const Text = styled.p(() => [tw`text-lg font-medium leading-6`]);

const Card = ({ period, name, image, children }: Props): JSX.Element => {
  return (
    <div>
      <div tw="w-[50px]">
        <Image
          src={`/img/icons/${image}.svg`}
          alt={`${name} icon`}
          layout="responsive"
          sizes="10vw"
          width="1"
          height="1"
        />
      </div>
      <Heading subHeading>{period}</Heading>
      <Text tw="mb-2">{name}</Text>
      <Text tw="text-sm text-accent-555">{children}</Text>
    </div>
  );
};

export default Card;
