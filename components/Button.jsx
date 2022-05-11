import styled, {css} from 'styled-components';

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 0px 10px #000000;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 0px 20px #000000;
  }
  &:active {
    box-shadow: 0px 0px 10px #000000;
  }

  ${props => {
    if (props.primary) {
      return css`
        background-color: #333F4B;
        &:hover {
          box-shadow: 0px 0px 20px #000000;
        }`
    }
    if (props.secondary) {
      return css`
      background-color: salmon;
      &:hover {
        box-shadow: 0px 0px 20px #000000;
        transform: scale(1.1);
      }`
    }
  }}
 `

export default Button;

