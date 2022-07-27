import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

import { Button } from "../../components/Elements";

const SlidePrevButton = () => {
  const swiper = useSwiper();

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  return <Button elType="icon" onClick={handlePrev} top prev />;
};
const SlideNextButton = () => {
  const swiper = useSwiper();

  const handleNext = () => {
    swiper?.slideNext();
  };
  return <Button elType="icon" onClick={handleNext} top next />;
};

/**
 * Provides a custom carousel
 * @param StyledContainer - custom div wrapper for whole carousel
 * @param elementsData - data for the displayed elements
 * @param StyledElement - custom node genereated for each data element
 * @param StyledButtons - custom div wrapper for nav buttons
 */
const withCarousel =
  (
    StyledContainer: any,
    elementsData: any,
    StyledElement: any,
    StyledButtons: any
  ) =>
  /* eslint-disable react/display-name */
  ({ ...props }: any) => {
    return (
      <StyledContainer {...props}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          speed={400}
          grabCursor
          loop
        >
          {elementsData.map((elData: any) => (
            <SwiperSlide key={v4()}>
              <StyledElement data={elData} />
            </SwiperSlide>
          ))}
          <StyledButtons>
            <SlidePrevButton />
            <SlideNextButton />
          </StyledButtons>
        </Swiper>
      </StyledContainer>
    );
  };

export default withCarousel;
