import Image from "next/image";
import tw, { styled } from "twin.macro";

import { Heading } from "@/components/Elements";

interface Props {
  period: string;
  name: string;
  image: string;
  children?: React.ReactNode;
}

const Text = styled.p(() => [tw`text-lg font-medium leading-6`]);

const Card = ({ period, name, image, children }: Props): JSX.Element => {
  return (
    <div tw="max-w-[30ch]">
      <div tw="w-[50px] mb-4">
        <Image
          src={`/img/icons/${image}.svg`}
          alt={`${name} icon`}
          layout="responsive"
          sizes="10vw"
          width="1"
          height="1"
        />
      </div>
      <Heading subHeading as="span" tw="mb-2">
        {period}
      </Heading>
      <Text tw="mb-2">{name}</Text>
      <Text tw="text-sm text-accent-555">{children}</Text>
    </div>
  );
};

export default Card;
