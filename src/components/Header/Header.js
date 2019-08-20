import React from "react";
import { Icon } from "antd";
import Styled from "./Header.Styled";

const Header = () => {
  return (
    <Styled.Header>
      <Styled.Logo>
        <div>Plectro</div>
        <Styled.LogoLine />
      </Styled.Logo>
      <Styled.Extra>
        {/* <Button icon="container" shape="circle" /> */}
        <Icon type="container" style={{ fontSize: 14, marginRight: 24 }} />
        <Icon type="menu" style={{ fontSize: 16 }} />
      </Styled.Extra>
    </Styled.Header>
  );
};

export default Header;
