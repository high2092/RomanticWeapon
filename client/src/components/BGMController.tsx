import React, { useState } from 'react';
import { bgm } from '../constants/constants';
import * as S from './BGMController.style';

const DEFAULT_BGM_VOLUME = 0.5;
bgm.volume = DEFAULT_BGM_VOLUME;

export const BGMController = () => {
  const [playBGM, setPlayBGM] = useState(true);

  const handleBGMOffButtonClick = () => {
    bgm.pause();
    setPlayBGM(!playBGM);
  };

  const handleBGMOnButtonClick = () => {
    bgm.play();
    setPlayBGM(!playBGM);
  };

  return (
    <S.BGMController>
      {playBGM ? (
        <button onClick={handleBGMOffButtonClick}>OFF</button>
      ) : (
        <button onClick={handleBGMOnButtonClick}>ON</button>
      )}
    </S.BGMController>
  );
};
