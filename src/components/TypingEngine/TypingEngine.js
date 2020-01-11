import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import Character from '../Character';
import Styled from './TypingEngine.Styled';
import colors from '../../colors';

const CHARS_PER_LINE = 40;
const INIT_LINES = 1;
const VISIBLE_LINES = 5;

function bufferProvider(text, globalIndex) {
  // Show max 4 colums
  let currentLine = Math.floor(globalIndex / CHARS_PER_LINE);
  currentLine = currentLine < 0 ? 0 : currentLine;
  let lineStartIndex = Math.floor(currentLine - INIT_LINES);
  lineStartIndex = lineStartIndex < 0 ? 0 : lineStartIndex;

  // console.log(`CurrentLine ${Math.floor(currentLine)} - currentIndex: ${globalIndex}`);
  // console.log('Start lines to cut: ', lineStartIndex);

  const bufferStartIndex = lineStartIndex * CHARS_PER_LINE;
  const bufferEndIndex = VISIBLE_LINES * CHARS_PER_LINE + lineStartIndex * CHARS_PER_LINE;

  const buffer = text.split('').slice(bufferStartIndex, bufferEndIndex);
  return {
    buffer,
    bufferStartIndex,
    currentLine,
    didReachEnd: globalIndex === text.length,
    currentCharacter: text[globalIndex],
  };
}

const TypingEngine = () => {
  const text =
    localStorage.getItem('text') ||
    'This is the default text to type.\nUse the button on the upper right to change stream.';
  // const textArray = text.split('');

  const [typedCharacters, setTypedCharacters] = useState([]);
  const [startTime, setStartTime] = useState();
  const [wrongInputCount, setWrontInputCount] = useState(0);

  const { buffer, bufferStartIndex, currentLine, didReachEnd, currentCharacter } = bufferProvider(
    text,
    typedCharacters.length,
  );

  const onCharacterPress = event => {
    const keyCode = event.which;
    const inputCharacter = keyCode === 13 ? '\n' : String.fromCharCode(keyCode);

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (!didReachEnd) {
      setTypedCharacters([...typedCharacters, inputCharacter]);

      if (currentCharacter !== inputCharacter) {
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

  const finished = didReachEnd;
  const numberOfWords = text.split(' ').length;
  const millisUntilFinish = Date.now() - startTime;
  const secondsUntilFinish = Math.floor(millisUntilFinish / 1000);
  const WPM = Math.round(numberOfWords / (secondsUntilFinish / 60));
  const accuracy = Math.round(100 - (wrongInputCount / text.length) * 100);
  const bufferedLines = buffer.length / CHARS_PER_LINE;

  return (
    <Styled.TypingEngine>
      {finished && <Styled.Finished>{`${WPM} WPM - ${accuracy}% Accuracy`}</Styled.Finished>}
      {!finished && (
        <>
          <Styled.CharactersBody>
            {currentLine > 0 && (
              <div
                style={{
                  height: 50,
                  width: '1024px',
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: 0,
                  background: 'linear-gradient(180deg, rgba(34,34,34,1) 30%, rgba(34,32,0,0) 100%)',
                }}
              />
            )}
            {currentLine === 0 && <div style={{ height: 50, width: '100%' }} /> /* To Push text one line at start */}
            {buffer.map((character, index) => (
              /* This rule can be disabled when array doesn't have unique value */
              /* eslint-disable react/no-array-index-key */
              <React.Fragment key={`${index}${character}`}>
                <Character
                  character={character}
                  current={typedCharacters.length === bufferStartIndex + index}
                  filled={typedCharacters.length > bufferStartIndex + index}
                  valid={
                    typedCharacters[bufferStartIndex + index]
                      ? typedCharacters[bufferStartIndex + index] === character
                      : undefined
                  }
                />
                {character.match(/\n/) && <div style={{ flex: '100%', height: 0 }} />}
              </React.Fragment>
            ))}
            <div
              style={{
                height: 50,
                width: '1024px',
                backgroundColor: 'red',
                position: 'absolute',
                bottom: currentLine === 0 ? 50 : 0,
                background: 'linear-gradient(0deg, rgba(34,34,34,1) 30%, rgba(34,32,0,0) 100%)',
                display: bufferedLines > 4 ? 'block' : 'none',
              }}
            />
            {currentLine === 0 && (
              <div
                style={{ position: 'absolute', bottom: 0, height: 50, width: '100%', background: 'rgba(34,34,34,1)' }}
              />
            )}
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
