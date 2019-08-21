import styled, { css } from 'styled-components';
import colors from '../../colors';

export default {
  Character: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ filled, valid }) => (filled ? colors.black : 'white')};
    font-size: 30px;
    border-bottom: 1px solid ${({ filled, valid }) => (filled && !valid ? colors.red : 'transparent')};
    ${({ current }) =>
      current &&
      css`
        border-bottom: 1px solid ${colors.cyan};
      `}
    min-width: 21px;
    text-align: center;
    height: 50px;
    margin: 0px 2px;
    transition: all 0.2s ease-out;
  `,
};
