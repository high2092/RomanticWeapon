import React from 'react';
import * as S from './DungeonPage.style';
import { Dungeon } from '../components/Dungeon';
import { useParams } from 'react-router-dom';

export const DungeonPage = () => {
  const [idx] = Object.values(useParams());
  return (
    <S.DungeonPage idx={Number(idx)}>
      <Dungeon />
    </S.DungeonPage>
  );
};
