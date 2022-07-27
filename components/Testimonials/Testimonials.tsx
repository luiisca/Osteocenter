import React, { useState, useReducer } from "react";
import tw from "twin.macro";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { v4 } from "uuid";

import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import { Heading, Button } from "../Elements";
import { BaseContainer } from "../BaseStyle";
import Testimonial, { TestimonialType } from "./Testimonial";

const Container = tw(BaseContainer)`flex text-center items-center flex-col`;
const Carousel = tw.div`grid grid-cols-[1fr auto 1fr] gap-12`;

type ACTIONTYPE = { type: "PREVIOUS_PAGE" } | { type: "NEXT_PAGE" };
type Testimonials = TestimonialType[];

const pagesReducer = (state: number, action: ACTIONTYPE): number => {
  switch (action.type) {
    case "PREVIOUS_PAGE":
      return state - 1;
    case "NEXT_PAGE":
      return state + 1;
    default:
      return state;
  }
};

const Testimonials = (): JSX.Element => {
  const [page, dispatch] = useReducer(pagesReducer, 1);
  const [testimonials] = useState<Testimonials>([
    {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent magna magna, lacinia quis porta nec, condimentum eget quam. Etiam lorem eros, posuere sed pretium a, cursus et libero",
      author: {
        name: "Leticia Nogales",
        picture: "hannah.jpg",
      },
    },
    {
      message:
        "Pellentesque ut aliquam lacus. Aenean sed nunc porttitor, vehicula turpis non, suscipit urna. Nam pellentesque massa ac leo aliquam varius",
      author: {
        name: "Eneko Padilla",
        picture: "steve.jpg",
      },
    },
    {
      message:
        "Suspendisse potenti. Suspendisse elementum dolor ut mauris laoreet, id varius ligula efficitur. Phasellus ultricies mattis mollis",
      author: {
        name: "Celestino Cañete",
        picture: "dave.jpg",
      },
    },
  ]);

  let testimonial: TestimonialType = testimonials[page - 1];

  return (
    <Container>
      <Heading as="span" subHeading tw="mb-4">
        Testimonios
      </Heading>
      <Heading as="h2" secondary tw="text-4xl md:text-5xl">
        Lo que dicen nuestros pacientes.
      </Heading>
      <Carousel>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerView={1}
            spaceBetween={30}
            speed={400}
            grabCursor
            loop
          >
            {allPosts
              .filter((post: any) => post.featured)
              .map((post: any) => (
                <SwiperSlide key={v4()}>
                  <Post top post={post} />
                </SwiperSlide>
              ))}
            <div className="flex gap-3 blog-lg:absolute blog-lg:left-[55%] blog-lg:bottom-0 blog-lg:pl-24 blog-lg:mb-5 blog-lg:z-10">
              <SlidePrevButton />
              <SlideNextButton />
            </div>
          </Swiper>
      </Carousel>
    </Container>
  );
};

          // <Button
          //   elType="icon"
          //   tw="self-center"
          //   onClick={() => dispatch({ type: "PREVIOUS_PAGE" })}
          // >
          //   <BsArrowLeft />
          // </Button>
          // <Button
          //   elType="icon"
          //   tw="self-center"
          //   onClick={() => dispatch({ type: "NEXT_PAGE" })}
          // >
          //   <BsArrowRight />
          // </Button>
export default Testimonials;
