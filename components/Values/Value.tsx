import Image from "next/image";
import tw, { styled } from "twin.macro";

import { Heading } from "../Elements";

const Container = tw.div`flex flex-col items-center`;
const ImgWrap = styled.div<{ position: string }>`
  ${tw`relative w-[5rem]`}

  &::before {
    content: "";
    ${tw`block absolute top-[20%] z-[-1] w-4/5 h-4/5 bg-no-repeat bg-contain`}
    background-image: url('../../static/img/shapes/${(props) =>
      props.position}-bubble.png');
  }
`;

const Value = ({
  name,
  shapePosition,
}: {
  name: string;
  shapePosition: string;
}): JSX.Element => {
  return (
    <Container>
      <ImgWrap position={shapePosition} tw="mb-8">
        <Image
          src={`/img/icons/${name}.svg`}
          alt={`${name} logo`}
          layout="responsive"
          sizes="10vw"
          width="1"
          height="1"
        />
      </ImgWrap>
      <Heading as="h3" tertiary tw="mb-4">
        <span>
          {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
        </span>
      </Heading>
      <p tw="text-lg text-accent-555 max-w-[30ch]">
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </Container>
  );
};

export default Value;
