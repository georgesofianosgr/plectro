import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import Character from '../Character';
import Styled from './TypingEngine.Styled';
import colors from '../../colors';

const TypingEngine = () => {
  const savedText = localStorage.getItem('text');
  const text = savedText || 'This is the default text to type.\nUse the button on the upper right to change stream.';
  const textArray = text.split('');

  const [typedCharacters, setTypedCharacters] = useState([]);
  const [startTime, setStartTime] = useState();
  const [wrongInputCount, setWrontInputCount] = useState(0);

  const onCharacterPress = event => {
    const keyCode = event.which;
    const inputCharacter = keyCode === 13 ? '\n' : String.fromCharCode(keyCode);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (typedCharacters.length !== textArray.length) {
      setTypedCharacters([...typedCharacters, inputCharacter]);

      if (textArray[typedCharacters.length] !== inputCharacter) {
        setWrontInputCount(wrongInputCount + 1);
      }
    }
  };

  const onKeyDown = event => {
    const keyCode = event.which;
    if (keyCode === 8 && typedCharacters.length !== 0) {
      setTypedCharacters([...typedCharacters.slice(0, typedCharacters.length - 1)]);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keypress', onCharacterPress);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keypress', onCharacterPress);
    };
  });

  const finished = textArray.length === typedCharacters.length;
  const numberOfWords = text.split(' ').length;
  const millisUntilFinish = Date.now() - startTime;
  const secondsUntilFinish = Math.floor(millisUntilFinish / 1000);
  const WPM = Math.round(numberOfWords / (secondsUntilFinish / 60));
  const accuracy = Math.round(100 - (wrongInputCount / text.length) * 100);

  return (
    <Styled.TypingEngine>
      {finished && <Styled.Finished>{`${WPM} WPM - ${accuracy}% Accuracy`}</Styled.Finished>}
      {!finished && (
        <>
          <Styled.CharactersBody>
            {textArray.map((character, index) => (
              /* This rule can be disabled when array doesn't have unique value */
              /* eslint-disable react/no-array-index-key */
              <React.Fragment key={`${index}${character}`}>
                <Character
                  character={character}
                  current={typedCharacters.length === index}
                  filled={typedCharacters.length > index}
                  valid={typedCharacters[index] ? typedCharacters[index] === character : undefined}
                />
                {character.match(/\n/) && <div style={{ flex: '100%', height: 0 }} />}
              </React.Fragment>
            ))}
          </Styled.CharactersBody>
        </>
      )}
      <Styled.ProgressWrapper>
        <Progress
          percent={(typedCharacters.length / text.length) * 100}
          strokeWidth={3}
          strokeColor={colors.cyan}
          showInfo={false}
        />
      </Styled.ProgressWrapper>
    </Styled.TypingEngine>
  );
};

export default TypingEngine;
