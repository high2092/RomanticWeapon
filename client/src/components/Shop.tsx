import React from 'react';
import * as S from './Shop.style';
import shieldImgUrl from '../assets/shield.png';

export const Shop = () => {
  return (
    <S.Shop>
      <S.Tab>
        <S.TabMenu>주문서</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
        <S.TabMenu>.</S.TabMenu>
      </S.Tab>
      <S.Showcase>
        <div>
          <img src={shieldImgUrl} />
        </div>
        <div>리커</div>
        <div>엄</div>
        <div>하준</div>
        <div>현우</div>
      </S.Showcase>
    </S.Shop>
  );
};
