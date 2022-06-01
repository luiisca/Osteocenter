import tw, {css, styled} from 'twin.macro';

const Container = tw.div`flex gap-2 `

const Rating = ({score, qtt}) => {
  return (
    <Container>
      <p>{score}</p>
      <p>stars</p>
      <p>{qtt}</p>
    </Container>
  )
}

export default Rating
