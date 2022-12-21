import React, { useEffect } from 'react';
import { MapList } from '../components/Map';
import map00IconUrl from '../assets/map00icon.png';
import map01IconUrl from '../assets/map01icon.png';
import * as S from './MapPage.style';
import { dungeonBgm } from '../constants/constants';
import { BGMController } from '../cores/BGMController';

const dummyMapList = [
  {
    idx: 0,
    imgUrl: map00IconUrl,
    title: '리스항구',
  },
  {
    idx: 1,
    imgUrl: map01IconUrl,
    title: '헤네시스',
  },
];

export const MapPage = () => {
  // BGM
  useEffect(() => {
    BGMController.setBGM(dungeonBgm());
    BGMController.play();
    return () => {
      BGMController.pause();
    };
  }, []);

  return (
    <S.MapPage>
      <MapList mapList={dummyMapList} />
    </S.MapPage>
  );
};
