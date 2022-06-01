import tw, {css, styled} from 'twin.macro';
import TestProvider, {useTestContext} from './TestProvider';
import {useState} from 'react'
import {MdArrowLeft, MdArrowRight} from 'react-icons/md';
import {useSpring, animated} from 'react-spring';

import {Button} from '../Elements';

const OpenBttn = styled(Button)(() => [
  tw`absolute top-1/2 left-[30%] z-[1]`,
  tw`rounded-sm`,
  css`
    transform: translate(0, -50%);
  `
])
const HideBttn = styled(Button)(() => [
  tw`absolute top-3 left-[calc(35% - 12px)] z-[2]`,
  css`
    transform: translate(-100%);
  `,
])

const Container = tw.div`relative w-[900px] h-[500px] rounded-[11px] my-20 mx-auto overflow-hidden`

// animated
const Details = styled(animated.div)(() => [
  tw`absolute z-[1]`,
  tw`inline-block opacity-100`,
  tw`w-[35%]`,

  tw`h-full text-xl bg-primary`,
])

const Maps = styled(animated.div)(() => [
  tw`absolute top-0 left-0`,
  tw`w-full h-full`,
  tw`inline-block`,

  tw`text-xl bg-primary-tint-2`,
])


const Test = () => {
  const {place, dispatchPlace} = useTestContext();
  const detailsSpring = useSpring({
    opacity: place.invisible && 0,
    transform: place.open ? 'translate(0%)' : 'translate(-100%)',
  })
  const mapSpring = useSpring({
    left: place.open ? '35%' : '0',
    width: place.open ? '65%' : '100%',
  })

  return (
    <Container>
      <Details style={detailsSpring}>
        Details
      </Details>
      {place.open && !place.invisible && (
        <HideBttn type='icon'
          onClick={() => dispatchPlace({type: 'HIDE'})}>
          <MdArrowLeft />
        </HideBttn>
      )}
      {place.open &&
        <OpenBttn type='icon'
          onClick={() => dispatchPlace({type: 'TOGGLE_OPEN'})}>
          <MdArrowLeft />
        </OpenBttn>
      }
      <Maps
        style={mapSpring}
        onClick={() => dispatchPlace({type: 'SHOW_OPEN_BTTN'})}>
        <p>Open: {place.open ? 'true' : 'false'}</p>
        <p>Invisible: {place.invisible ? 'true' : 'false'}</p>
        <p>Show open bttn: {place.openBttn ? 'true' : 'false'}</p>
        Maps
      </Maps>
    </Container>
  )
}

export default Test
