import tw, {css, styled} from 'twin.macro';

const ImgWrap = styled.span(() => [
  tw`block w-[50px]`,
  css`
    &>span {
      width: 50px;
    }
  `
])

const Container = tw.div`grid grid-cols-2 gap-x-12 gap-y-16`

export {ImgWrap, Container}
