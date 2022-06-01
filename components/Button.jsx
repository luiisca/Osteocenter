import tw, {css, styled} from 'twin.macro';

const Button = styled.button(props => [
  css`
    background-color: salmon;
    &:hover {
      background-color: yellow;
    };
  `,
  // tw`text-lg text-white`,
  tw`flex inline-flex w-full`,
  tw`border border-transparent`,
  tw`p-2 m-2`,
  tw`items-center rounded-[9px]`,
  tw`shadow-md`,
  tw`hover:bg-primary-shade-1`,
  props.primary ? tw`bg-primary` : 'bg-indigo-300'
]);
// const Button = styled.button({
//   backgroundColor: 'salmon',
//   border: 'none',
//   ...tw`text-xs font-medium text-purple-500`,
//   '&:hover': {
//     ...tw`bg-indigo-500`,
//   },
// })

export default Button;

