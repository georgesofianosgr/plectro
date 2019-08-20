import React from "react";
import "antd/dist/antd.css";
import Header from "./components/Header";
import TypingEngine from "./components/TypingEngine";
import Styled, { GlobalStyle } from "./App.Styled";

function App() {
  return (
    <Styled.App>
      <GlobalStyle />
      <Header />
      <Styled.Content>
        <TypingEngine />
      </Styled.Content>
    </Styled.App>
  );
}

export default App;
