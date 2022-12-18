import React from 'react';
import { MapList } from '../components/Map';
import map00IconUrl from '../assets/map00icon.png';
import map01IconUrl from '../assets/map01icon.png';
import * as S from './MapPage.style';

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
  return (
    <S.MapPage>
      <MapList mapList={dummyMapList} />
    </S.MapPage>
  );
};
