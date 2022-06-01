import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

const Separator = styled.div`
height: 0px;
  border-bottom: 1px solid #e8eaed;
`
const Title = tw.h4`text-lg`

const Author = tw.div`flex gap-2`
const ImgWrap = tw.div`w-[30px] h-[30px]`
const Rating = tw.div`flex gap-2`
const Content = tw.p`mt-2 text-base`

const Reviews = ({reviews}) => {
  return (
    <div>
      <Title>Reviews</Title>
      {reviews.map((review, i) => (
        <>
          <div>
            <Author>
              <ImgWrap>
                <Image
                  src={review.profile_photo_url}
                  alt={`${review.author_name} picture`}
                  layout='responsive'
                  width='1'
                  height='1'
                />
              </ImgWrap>
              <p>{review.author_name}</p>
            </Author>
            <Rating>
              <span>stars</span>
              <span>{review.relative_time_description}</span>
            </Rating>
            <Content>{review.text}</Content>
          </div>
          {!(reviews.length == (i + 1)) && <Separator />}
        </>
      ))}
    </div>
  )
}

export default Reviews
