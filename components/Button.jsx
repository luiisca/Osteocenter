import tw, {css, styled} from 'twin.macro';

const Button = styled.button(props => [
  css`
    background-color: salmon;
    &:hover {
    background-color: #ff0000;
    };
  `,
  tw`text-xs font-medium text-white`,
  tw`flex inline-flex w-full`,
  tw`border border-transparent`,
  tw`p-2 m-2`,
  tw`items-center rounded-md`,
  tw`shadow-md`,
  // tw`hover:bg-indigo-500`,
  props.primary ? tw`bg-indigo-400` : 'bg-indigo-300'
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

