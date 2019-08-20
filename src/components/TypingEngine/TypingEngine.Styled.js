import styled from "styled-components";
import colors from "../../colors";

export default {
  TypingEngine: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  CharactersBody: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 1024px;
    margin: 0 15px;
    margin-top: -200px;
  `,
  ProgressWrapper: styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-bottom: -7px;

    .ant-progress-inner {
      background-color: ${colors.background};
    }
  `,
  Finished: styled.div`
    font-size: 44px;
  `
};

