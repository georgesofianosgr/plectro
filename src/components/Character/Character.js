import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Styled from './Character.Styled';

const Character = ({ character, current, valid, filled }) => (
  <Styled.Character current={current} filled={filled} valid={valid}>
    {character.match(/\n/) ? <Icon type="enter" style={{ fontSize: 21 }} /> : character}
  </Styled.Character>
);

Character.propTypes = {
  character: PropTypes.string.isRequired,
  current: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  filled: PropTypes.bool.isRequired,
};

export default Character;
