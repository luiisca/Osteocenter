import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { styled, css } from "twin.macro";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

import { Button } from "../../components/Elements";

const SlidePrevButton = (props: { Custom?: any }) => {
  const swiper = useSwiper();

  const handlePrev = () => {
    swiper?.slidePrev();
  };
  if (props.Custom)
    return (
      <props.Custom
        elType="icon"
        onClick={handlePrev}
        Icon={() => (
          <>
            <BsArrowLeft />
          </>
        )}
        prev
      />
    );
  return (
    <Button
      elType="icon"
      onClick={handlePrev}
      Icon={() => (
        <>
          <BsArrowLeft />
        </>
      )}
    />
  );
};
const SlideNextButton = (props: { Custom?: any }) => {
  const swiper = useSwiper();

  const handleNext = () => {
    swiper?.slideNext();
  };
  if (props.Custom)
    return (
      <props.Custom
        elType="icon"
        onClick={handleNext}
        Icon={() => (
          <>
            <BsArrowRight />
          </>
        )}
        next
      />
    );
  return (
    <Button
      elType="icon"
      onClick={handleNext}
      Icon={() => (
        <>
          <BsArrowRight />
        </>
      )}
    />
  );
};

export const BaseContainer = styled.div(() => [
  css`
    .swiper {
      .swiper-wrapper {
        height: 100%;
        .swiper-slide {
          --webkit-transform: translateZ(0);
          height: 100%;
        }
      }
    }
  `,
]);

/**
 * Provides a custom carousel
 * @param Container - custom div wrapper for whole carousel
 * @param elementsData - data for the displayed elements
 * @param Element - custom node genereated for each data element
 * @param ButtonsContainer - custom div wrapper for nav buttons
 */
const withCarousel =
  (
    Container: any,
    elementsData: any,
    Element: any,
    ButtonsContainer: any = null,
    slides: number = 1,
    spaceBetween: number = 30,
    CustomButton: any = null,
    custom: boolean = false,
    loop: boolean = true
  ) =>
  /* eslint-disable react/display-name */
  () => {
    return (
      <Container>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={slides}
          spaceBetween={spaceBetween}
          speed={400}
          grabCursor
          loop={loop}
        >
          {elementsData.map((elData: any) => (
            <SwiperSlide key={v4()}>
              <Element data={elData} />
            </SwiperSlide>
          ))}
          {custom ? (
            <>
              <SlidePrevButton Custom={CustomButton} />
              <SlideNextButton Custom={CustomButton} />
            </>
          ) : ButtonsContainer ? (
            <ButtonsContainer>
              <SlidePrevButton Custom={CustomButton} />
              <SlideNextButton Custom={CustomButton} />
            </ButtonsContainer>
          ) : (
            <></>
          )}
        </Swiper>
      </Container>
    );
  };

export default withCarousel;
