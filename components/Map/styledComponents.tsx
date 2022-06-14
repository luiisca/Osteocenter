import tw, {css, styled} from 'twin.macro';
import {Button} from '../Elements';
import {animated} from 'react-spring';

export const Container = styled.div(({mapFullscreen}) => [
  tw`text-left`,
  tw`relative transition-all`,
  tw`overflow-hidden mx-auto my-0 rounded-2xl w-[900px] h-[500px]`,
  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
    transform: ${mapFullscreen ? 'scale(1.7)' : 'scale(1)'};
  `,
])

export const HideBttn = styled(Button)(() => [
  tw`w-10 h-10`,
  tw`absolute top-3 z-[2]`,
  tw`text-lg`,
])

export const GoogleMapContainer = styled(animated.div)(() => [
  tw`w-full h-full`,
  tw`absolute top-0 left-0`,
  tw`inline-block`,
])
export const FullscreenBttn = styled.div(() => [
  tw`w-10 h-10 bg-white`,
  tw`absolute z-10 top-2 right-2`,
  tw`flex items-center justify-center`,
  tw`text-xl text-accent-555 hover:text-accent-333`,
  tw`rounded-[2px] cursor-pointer`,
  css`
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  `,
])
