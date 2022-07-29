import Image from "next/image";
import tw, { styled, css } from "twin.macro";
interface Props {
  src: string;
  name: string;
  num: string;
  children: React.ReactNode;
}

const Container = styled.div((props: { position: any }) => [
  tw`flex items-center gap-12`,
  props.position % 2 == 0 ? tw`flex-row` : tw`flex-row-reverse`,
  css`
    @media (max-width: 544px) {
      ${tw`flex-col`}
    }
  `,
]);
const Number = tw.p`text-7xl md:text-[4.75rem] blog-lg:text-[5.375rem] font-semibold text-[#ddd] mb-3`;
const ImgWrap = styled.div(() => [
  tw`flex justify-center w-full h-full`,
  tw`mob-md:w-1/2`,
]);
const Img = styled.div(() => [
  tw`justify-self-center w-[clamp(200px, 80%, 400px)]`,
  tw`rounded-[9px] overflow-hidden`,
]);
const Text = styled.div(() => [
  tw`mob-md:w-4/5`,
  tw`md:w-1/2`,
]);
const Step = ({ src, name, num, children }: Props): JSX.Element => {
  return (
    <Container position={+num}>
      <ImgWrap >
        <Img>
          <Image
            src={`/img/steps/${src}`}
            alt={`${name} ilustración`}
            layout="responsive"
            sizes="20vw"
            width="1"
            height="1"
          />
        </Img>
      </ImgWrap>
      <Text tw="">
        <Number>{num}</Number>
        {children}
      </Text>
    </Container>
  );
};

export default Step;
