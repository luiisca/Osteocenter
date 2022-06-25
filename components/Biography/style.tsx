import tw, {styled} from 'twin.macro';

const ImgWrap = styled.div(() => [
  tw`w-[50px]`,
])

const Container = tw.div`grid grid-cols-2 gap-x-12 gap-y-16`

export {ImgWrap, Container}
