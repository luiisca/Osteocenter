import Image from "next/future/image";
import tw, { css, styled } from "twin.macro";
import { v4 } from "uuid";

const Container = tw.div`flex items-center gap-4 mt-8 blog-lg:mt-20 justify-center blog-lg:justify-start`;

const ImageWrap = styled.span(() => [
  tw`mr-[-16px] rounded-full last:mr-0`,
  css`
    & > img {
      ${tw`border-solid border-[3px] border-primary-tint-3 rounded-full `}
    }
  `,
]);

const CustomerPictures = () => {
  return (
    <Container>
      <div tw="flex">
        {[1, 2, 3, 4, 5].map((imgId) => (
          <ImageWrap key={v4()}>
            <Image
              sizes="10vw"
              src={`/img/customers/customer-${imgId}.jpg`}
              alt="Foto de paciente satisfecho"
              width="48"
              height="48"
            />
          </ImageWrap>
        ))}
      </div>

      <p tw="text-lg leading-none text-accent-555 font-semibold">
        <span tw="font-bold text-primary-shade-1">250+</span> pacientes
        satisfechos con nuestros servicios.
      </p>
    </Container>
  );
};

export default CustomerPictures;
