import styled, {css} from 'styled-components';
import tw from 'tailwind-styled-components';

// const Button = styled.button`
//   background-color: red;
//   color: white;
//     `;

const Button = tw.button`
  flex
  inline-flex
  items-center
  border
  border-transparent
  text-xs
  font-medium
  rounded-md
  shadow-md
  text-white
  p-2
  m-2
  transition-all

  hover:bg-indigo-500
  ${props => props.primary ? 'bg-indigo-400' : 'bg-indigo-300'}
 `

export default Button;

