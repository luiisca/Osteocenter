import Image from "next/image";
import tw, { styled } from "twin.macro";
import { v4 } from "uuid";

import { Title, Separator } from "./Elements";
import Stars from "./Elements/Stars";

const Review = tw.div`py-4`;
const Author = styled.div(() => [
  tw`text-accent-333 text-[15px]`,
  tw`flex items-center gap-3`,
]);
const ImgWrap = tw.div`w-8 h-8`;
const Rating = tw.div`flex gap-3 text-sm`;
const Content = tw.p`mt-2 text-sm text-accent-333`;

const Reviews = ({
  reviews,
}: {
  reviews: google.maps.places.PlaceReview[] | [];
}): JSX.Element => {
  return (
    <div>
      <Title>Críticas</Title>
      {reviews.map((review, i) => (
        <>
          <Review key={v4()}>
            <Author tw="mb-3">
              <ImgWrap>
                <Image
                  src={review.profile_photo_url}
                  alt={`${review.author_name} picture`}
                  layout="responsive"
                  sizes="5vw"
                  width="1"
                  height="1"
                />
              </ImgWrap>
              <p>{review.author_name}</p>
            </Author>
            <Rating>
              <Stars score={review.rating || 0} />
              <span>{review.relative_time_description}</span>
            </Rating>
            <Content>{review.text}</Content>
          </Review>
          {!(reviews.length == i + 1) && <Separator />}
        </>
      ))}
    </div>
  );
};

export default Reviews;
