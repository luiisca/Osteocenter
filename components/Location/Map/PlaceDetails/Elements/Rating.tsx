import tw from 'twin.macro';
import Stars from './Stars';

const Container = tw.div`flex items-center gap-1 `

const Score = tw.p`text-sm text-accent-555`
const ScoreQtt = tw.p`text-sm text-primary-shade-2`

const Rating = ({score, qtt}: {score: number, qtt: number}): JSX.Element => {
  return (
    <Container>
      <Score>{score}</Score>
      <Stars score={score} tw='mr-2'/>
      <ScoreQtt>{qtt} reviews</ScoreQtt>
    </Container>
  )
}

export default Rating
