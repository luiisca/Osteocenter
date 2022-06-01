import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  button {
    background-color: blue;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    }
`
