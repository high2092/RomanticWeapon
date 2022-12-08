import React from 'react';
import Forge from '../components/Forge';
import * as S from './MainPage.style';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleShopButtonClick = () => {
    navigate('/shop');
  };

  return (
    <S.MainPage>
      <Forge />

      <S.Menu>
        <div>▶︎</div>
        <div onClick={handleShopButtonClick}>상점</div>
        <div>던전</div>
        <div>설정</div>
      </S.Menu>
    </S.MainPage>
  );
};

export default MainPage;
