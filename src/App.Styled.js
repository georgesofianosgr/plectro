import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");

  body {
    font-family: "Helvetica Neue", Helvetica, "Source Sans Pro", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #222;
    color: white;
  }

  #root {
    height: 100%;
  }
`;

export default {
  App: styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
    height: 100%;
  `,
  Content: styled.div`
    flex: 1;
  `
};
