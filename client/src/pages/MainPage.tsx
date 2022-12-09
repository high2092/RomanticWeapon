import React, { useEffect } from 'react';
import Forge from '../components/Forge';
import * as S from './MainPage.style';
import { useNavigate } from 'react-router-dom';
import { mainBgm } from '../constants/constants';
import dunjeonImageUrl from '../assets/dunjeon.gif';
import rankingImageUrl from '../assets/ranking.gif';
import shopImageUrl from '../assets/shop.png';
import settingImgUrl from '../assets/setting.png';
import inventoryImgUrl from '../assets/inventory.png';

const MainPage = () => {
  const navigate = useNavigate();

  const handleShopButtonClick = () => {
    navigate('/shop');
  };

  useEffect(() => {
    const bgm = mainBgm();
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, []);

  return (
    <S.MainPage>
      <Forge />

      <S.Menu>
        <div>▶︎</div>
        <img src={rankingImageUrl}></img>
        <img
          src={shopImageUrl}
          width="35"
          onClick={handleShopButtonClick}
        ></img>
        <img src={dunjeonImageUrl}></img>
        <img src={inventoryImgUrl} width="35"></img>
        <img src={settingImgUrl} width="35"></img>
      </S.Menu>
    </S.MainPage>
  );
};

export default MainPage;
