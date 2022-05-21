import Image from 'next/image';
import React,{useState, useReducer} from 'react';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import tw, {css, styled} from 'twin.macro';
import {Heading, Button} from '../Elements';
import Testimonial from './Testimonial';

const Container = tw.div`flex text-center items-center flex-col`
const Carousel = tw.div`grid grid-cols-[1fr auto 1fr] gap-12`

const pagesReducer = (state, action) => {
  switch (action.type) {
    case 'PREVIOUS_PAGE':
      return state - 1;
    case 'NEXT_PAGE':
      return state + 1;
    default:
      return state;
  }
}

const Testimonials = () => {
  const [page, dispatch] = useReducer(pagesReducer, 1)
  const [testimonials, setTestimonials] = useState([
    {
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent magna magna, lacinia quis porta nec, condimentum eget quam. Etiam lorem eros, posuere sed pretium a, cursus et libero',
      author: {
        name: 'Leticia Nogales',
        picture: 'hannah.jpg',
      }
    },
    {
      message: 'Pellentesque ut aliquam lacus. Aenean sed nunc porttitor, vehicula turpis non, suscipit urna. Nam pellentesque massa ac leo aliquam varius',
      author: {
        name: 'Eneko Padilla',
        picture: 'steve.jpg',
      }
    },
    {
      message: 'Suspendisse potenti. Suspendisse elementum dolor ut mauris laoreet, id varius ligula efficitur. Phasellus ultricies mattis mollis',
      author: {
        name: 'Celestino Cañete',
        picture: 'dave.jpg',
      }
    }
  ])

  let testimonial = testimonials[page - 1]

  return (
    <Container>
      <Heading as='span' subHeading>Testimonios</Heading>
      <Heading as='h2' secondary>Lo que nuestros pacientes dicen.</Heading>
      <Carousel>
        {page != 1 ? (<Button type='icon' arrow tw='self-center' onClick={() => dispatch({type: 'PREVIOUS_PAGE'})}><BsArrowLeft /></Button>) : (<div></div>)}
        <Testimonial name={testimonial.author.name} img={testimonial.author.picture} message={testimonial.message} />
        {page != testimonials.length && <Button type='icon' arrow tw='self-center' onClick={() => dispatch({type: 'NEXT_PAGE'})}><BsArrowRight /></Button>}
      </Carousel>
    </Container>
  )
}

export default Testimonials
