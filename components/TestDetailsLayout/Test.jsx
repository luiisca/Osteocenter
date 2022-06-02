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
  const {place, dispatchMap} = useTestContext();
  const detailsSpring = useSpring({
    opacity: map.invisible && 0,
    transform: map.open ? 'translate(0%)' : 'translate(-100%)',
  })
  const mapSpring = useSpring({
    left: map.open ? '35%' : '0',
    width: map.open ? '65%' : '100%',
  })

  return (
    <Container>
      <Details style={detailsSpring}>
        Details
      </Details>
      {map.open && !map.invisible && (
        <HideBttn type='icon'
          onClick={() => dispatchMap({type: 'HIDE'})}>
          <MdArrowLeft />
        </HideBttn>
      )}
      {map.open &&
        <OpenBttn type='icon'
          onClick={() => dispatchMap({type: 'TOGGLE_OPEN'})}>
          <MdArrowLeft />
        </OpenBttn>
      }
      <Maps
        style={mapSpring}
        onClick={() => dispatchMap({type: 'SHOW_OPEN_BTTN'})}>
        <p>Open: {map.open ? 'true' : 'false'}</p>
        <p>Invisible: {map.invisible ? 'true' : 'false'}</p>
        <p>Show open bttn: {map.openBttn ? 'true' : 'false'}</p>
        Maps
      </Maps>
    </Container>
  )
}

export default Test
