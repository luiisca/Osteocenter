import tw, {css, styled} from 'twin.macro';
import TestProvider, {useTestContext} from './TestProvider';
import {MdArrowLeft, MdArrowRight} from 'react-icons/md';

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
const Details = styled.div(({open, invisible}) => [
  tw`absolute z-[1]`,
  tw`inline-block`,
  tw`w-[35%] transition-all`,

  css`
    transform: translate(-100%);
    opacity: 1;
  `,
  invisible && css`
    opacity: 0;
    transform: translate(0);
  `,
  open && !invisible && css`
    opacity: 1;
    transform: translate(0);
  `,

  tw`h-full text-xl bg-primary`,
])

const Maps = styled.div(({open, invisible}) => [
  tw`absolute top-0 left-0`,
  tw`w-full h-full transition-all`,
  tw`inline-block`,
  open && tw`left-[35%] w-[65%]`,

  tw`text-xl bg-primary-tint-2`,
])


const Test = () => {
  const {place, dispatchPlace} = useTestContext();

  return (
    <Container>
      <Details open={place.open} invisible={place.invisible}>
        Details
      </Details>
      {place.open && !place.invisible && (
        <HideBttn type='icon'
        onClick={() => dispatchPlace({type: 'HIDE'})}>
        <MdArrowLeft />
        </HideBttn>
      )}
      {place.openBttn && (
        <OpenBttn type='icon'
          onClick={() => dispatchPlace({type: 'TOGGLE_OPEN'})}>
          <MdArrowLeft />
        </OpenBttn>
      )}
      <Maps open={place.open}
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
