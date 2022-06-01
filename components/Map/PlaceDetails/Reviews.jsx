import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

import {Title, Separator} from './Elements';

const Review = tw.div`py-4`
const Author = styled.div(() => [
  tw`text-accent-333 text-[15px]`,
  tw`flex items-center gap-3`,
])
const ImgWrap = tw.div`w-8 h-8`
const Rating = tw.div`flex gap-3 text-sm`
const Content = tw.p`mt-2 text-sm text-accent-333`

const Reviews = ({reviews}) => {
  return (
    <div>
      <Title>Reviews</Title>
      {reviews.map((review, i) => (
        <>
          <Review>
            <Author>
              <ImgWrap>
                <Image
                  src={review.profile_photo_url}
                  alt={`${review.author_name} picture`}
                  layout='responsive'
                  size='5vw'
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
          </Review>
          {!(reviews.length == (i + 1)) && <Separator />}
        </>
      ))}
    </div>
  )
}

export default Reviews