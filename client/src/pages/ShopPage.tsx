import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shop } from '../components/Shop';
import { shopBgm } from '../constants/constants';
import * as S from './ShopPage.style';
import goldImageUrl from '../assets/gold.gif';
import { goldAtom } from '../core';
import { useAtom } from 'jotai';

export const ShopPage = () => {
  const navigate = useNavigate();

  const [gold, setGold] = useAtom(goldAtom);

  useEffect(() => {
    const bgm = shopBgm();
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, []);

  return (
    <S.ShopPage>
      <div onClick={() => navigate(-1)}>뒤로 가기</div>
      <S.GoldSection>
        <div>
          <S.GoldIcon src={goldImageUrl}></S.GoldIcon>
        </div>
        <S.Gold>{gold}</S.Gold>
      </S.GoldSection>
      <Shop />
    </S.ShopPage>
  );
};
