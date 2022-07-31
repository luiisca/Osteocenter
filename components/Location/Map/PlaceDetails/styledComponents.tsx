import tw, {css, styled} from 'twin.macro';
import {Button} from '@/components/Elements';
import {animated} from 'react-spring';

export const Container = styled(animated.div)(() => [
  tw`w-[35%] h-full`,
  tw`absolute z-[1] inline-block opacity-100`,
  tw`overflow-x-hidden`,

  tw`text-sm bg-primary-tint-2`,
])

export const OpenBttnContainer = styled(animated.div)(() => [
  tw`w-[40px] h-[80px]`,
  tw`flex items-center justify-items-start`,
  tw`absolute top-1/2 left-[35%] z-[1]`,
  tw`hover:cursor-pointer`,

  css`
    transform: translate(0, -50%);
  `
])
export const OpenBttn = styled(Button)(() => [
  tw`w-[25px]`,
  tw`rounded-none rounded-r-sm`,
])

export const ContentWrap = tw.div`py-3 px-4`

export const ImgWrap = tw.div`relative w-full h-2/5`
export const Flex = styled.div(({icon}: {icon: boolean}) => [
  tw`flex items-center gap-4`,
  icon && css`
    ${tw`text-accent-333`};
    svg {
      flex-shrink: 0;
      ${tw`text-xl`}
      ${tw`text-primary-shade-2 stroke-[2%]`}
    }
  `,
])
