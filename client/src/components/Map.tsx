import React from 'react';
import * as S from './Map.style';
import { useNavigate } from 'react-router-dom';

interface MapList {
  mapList: Map[];
}

export const MapList = ({ mapList }: MapList) => {
  return (
    <S.MapList>
      {mapList.map(({ idx, imgUrl, title }) => (
        <Map key={idx} idx={idx} imgUrl={imgUrl} title={title} />
      ))}
    </S.MapList>
  );
};

interface Map {
  idx: number;
  imgUrl: string;
  title: string;
}

export const Map = ({ idx, imgUrl, title }: Map) => {
  const navigate = useNavigate();

  const handleMapClick = (idx: number) => () => {
    navigate(`/dungeon/${idx}`);
  };

  return (
    <S.Map>
      <S.MapIcon src={imgUrl} onClick={handleMapClick(idx)} />
      <div>{title}</div>
      <div>적정 재련 단계: 1 ~ 5</div>
    </S.Map>
  );
};
