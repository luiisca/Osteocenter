import React from "react";
import tw, { styled, css } from "twin.macro";

import { Button } from "../Elements";
import { Heading } from "../Elements";
import { BaseContainer } from "../BaseStyle";
import Testimonial, { TestimonialType } from "./Testimonial";
import withCarousel, {
  BaseContainer as BaseCarouselContainer,
} from "@/components/HOCS/withCarousel";

const Container = tw(BaseContainer)`flex text-center items-center flex-col`;
const StyledCarousel = styled(BaseCarouselContainer)(() => [
  tw`relative w-full`,
  css`
    .swiper {
      ${tw`flex flex-col justify-center md:max-w-[1000px] items-center`}
    }
  `,
]);
const CarouselTestimonial = ({ data }: { data: any }) => (
  <Testimonial
    name={data.author.name}
    message={data.message}
    img={data.author.picture}
  />
);

const ArrowButton = styled(Button)(
  ({ prev, next }: { prev?: boolean; next?: boolean }) => [
    tw`md:absolute md:z-10 md:top-1/2 md:translate-y-[-70%]`,
    prev && tw`translate-x-[-60%] md:left-[50px]`,
    next && tw`absolute bottom-0 translate-x-[60%] md:right-[50px]`,
  ]
);

const testimonials: TestimonialType[] = [
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
];

const Testimonials = (): JSX.Element => {
  const Carousel = withCarousel(
    StyledCarousel,
    testimonials,
    CarouselTestimonial,
    null,
    1,
    30,
    ArrowButton,
    true
  );

  return (
    <Container>
      <Heading as="span" subHeading>
        Testimonios
      </Heading>
      <Heading as="h2" secondary tw="mb-12">
        Lo que dicen nuestros pacientes.
      </Heading>
      <Carousel />
    </Container>
  );
};

export default Testimonials;
