import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {TOTAL_STARS} from '../../../../static/js/constants';

const Container = tw.div`flex items-center gap-1 `
const StarsWrap = tw.div`flex mr-2`
const ImgWrap = tw.div`w-4 h-4`

const Score = tw.p`text-sm text-accent-555`
const ScoreQtt = tw.p`text-sm text-primary-shade-2`

const Rating = ({score, qtt}) => {
  return (
    <Container>
      <Score>{score}</Score>
      <StarsWrap>
        {[...new Array(Math.trunc(score))].map((_, i) => (
          <ImgWrap key={i}>
            <Image
              src='/img/stars/star_rate.png'
              alt='star rate'
              layout='responsive'
              size='1vw'
              height='1'
              width='1'
            /> </ImgWrap>
        ))}
        {[...new Array(TOTAL_STARS - Math.trunc(score))].map((_, i) => {
          if (`${score}`.slice(2) >= 8) {
            return (
              <ImgWrap key={i}>
                <Image
                  src='/img/stars/star_rate.png'
                  alt='star rate'
                  layout='responsive'
                  size='1vw'
                  height='1'
                  width='1'
                />
              </ImgWrap>
            )
          }
          if (`${score}`.slice(2) >= 3) {
            return (
              <ImgWrap key={i}>
                <Image
                  src='/img/stars/star_rate_half.png'
                  alt='star rate half'
                  layout='responsive'
                  size='1vw'
                  height={1}
                  width={1}
                />
              </ImgWrap>
            )
          }
          return (
            <ImgWrap key={i}>
              <Image
                src='/img/stars/star_rate_empty.png'
                alt='star rate empty'
                layout='responsive'
                size='1vw'
                height='1'
                width='1'
              />
            </ImgWrap>
          )
        })}
      </StarsWrap>
      <ScoreQtt>{qtt} reviews</ScoreQtt>
    </Container>
  )
}

export default Rating
