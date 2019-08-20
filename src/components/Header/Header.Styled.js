import styled from "styled-components";
import colors from "../../colors";

export default {
  Header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Logo: styled.div`
    @import url("https://fonts.googleapis.com/css?family=Righteous&display=swap");
    color: white;
    font-size: 35px;
    font-family: "Righteous", cursive;
    cursor: pointer;
  `,
  LogoLine: styled.div`
    margin-top: -5px;
    width: 10px;
    height 1px;
    background-color: ${colors.cyan};
  `,
  Extra: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
};
