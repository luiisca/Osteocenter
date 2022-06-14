import tw, {css, styled} from 'twin.macro';

const Button = styled.button(props => [
  css`
    background-color: salmon;
    &:hover {
      background-color: yellow;
    };
  `,
  tw`flex inline-flex w-full`,
  tw`border border-transparent`,
  tw`p-2 m-2`,
  tw`items-center rounded-[9px]`,
  tw`shadow-md`,
  tw`hover:bg-primary-shade-1`,
  props.primary ? tw`bg-primary` : 'bg-indigo-300'
]);

export default Button;

