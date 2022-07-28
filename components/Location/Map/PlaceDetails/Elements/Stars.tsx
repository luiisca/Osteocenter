import Image from "next/image";
import tw from "twin.macro";
import { TOTAL_STARS } from "@/static/ts/constants";
import { v4 } from "uuid";

const ImgWrap = tw.div`w-4 h-4`;
const Container = tw.div`flex`;

const Stars = ({ score }: { score: number }): JSX.Element => (
  <Container>
    {[...new Array(Math.trunc(score))].map(
      (): JSX.Element => (
        <ImgWrap key={v4()}>
          <Image
            src="/img/stars/star_rate.png"
            alt="star rate"
            layout="responsive"
            sizes="1vw"
            height="1"
            width="1"
          />{" "}
        </ImgWrap>
      )
    )}
    {[...new Array(TOTAL_STARS - Math.trunc(score))].map((): JSX.Element => {
      if (+`${score}`.slice(2) >= 8) {
        return (
          <ImgWrap key={v4()}>
            <Image
              src="/img/stars/star_rate.png"
              alt="star rate"
              layout="responsive"
              sizes="1vw"
              height="1"
              width="1"
            />
          </ImgWrap>
        );
      }
      if (+`${score}`.slice(2) >= 3) {
        return (
          <ImgWrap key={v4()}>
            <Image
              src="/img/stars/star_rate_half.png"
              alt="star rate half"
              layout="responsive"
              sizes="1vw"
              height={1}
              width={1}
            />
          </ImgWrap>
        );
      }
      return (
        <ImgWrap key={v4()}>
          <Image
            src="/img/stars/star_rate_empty.png"
            alt="star rate empty"
            layout="responsive"
            sizes="1vw"
            height="1"
            width="1"
          />
        </ImgWrap>
      );
    })}
  </Container>
);

export default Stars;
