import React from "react";
import { Icon } from "antd";
import Styled from "./Character.Styled";

const Character = ({ character, current, valid, filled }) => (
  <Styled.Character current={current} filled={filled} valid={valid}>
    {character.match(/\n/) ? (
      <Icon type="enter" style={{ fontSize: 21 }} />
    ) : (
      character
    )}
  </Styled.Character>
);

export default Character;
