import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shop } from '../components/Shop';
import { shopBgm } from '../constants/constants';
import * as S from './ShopPage.style';

export const ShopPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const bgm = shopBgm();
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, []);

  const gold = 1000;
  return (
    <S.ShopPage>
      <div onClick={() => navigate(-1)}>뒤로 가기</div>
      <S.Gold>골드: {gold}</S.Gold>
      <Shop />
    </S.ShopPage>
  );
};
