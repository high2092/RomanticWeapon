import React, { useEffect } from 'react';
import * as S from './DungeonPage.style';
import { Dungeon } from '../components/Dungeon';
import { useParams } from 'react-router-dom';
import { BGMController } from '../cores/BGMController';
import { MapBgms } from '../constants/constants';

export const DungeonPage = () => {
  const idx = Number(Object.values(useParams())[0]);

  // BGM
  useEffect(() => {
    BGMController.setBGM(MapBgms[idx]());
    BGMController.play();
    return () => {
      BGMController.pause();
    };
  }, []);

  return (
    <S.DungeonPage idx={idx}>
      <Dungeon />
    </S.DungeonPage>
  );
};
