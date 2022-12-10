import React, { useEffect } from 'react';
import Forge from '../components/Forge';
import * as S from './MainPage.style';
import { useNavigate } from 'react-router-dom';
import { HOST, mainBgm } from '../constants/constants';
import dunjeonImageUrl from '../assets/dunjeon.gif';
import rankingImageUrl from '../assets/ranking.gif';
import shopImageUrl from '../assets/shop.png';
import settingImgUrl from '../assets/setting.png';
import inventoryImgUrl from '../assets/inventory.png';
import { httpGet } from '../utils/utils';
import { useAtom } from 'jotai';
import { inventoryAtom } from '../cores/store';

const httpGetLogout = async () => {
  const response = await httpGet(`${HOST}/logout`);
  return response;
}

const httpGetInventory = async () => {
  const response = await httpGet(`${HOST}/inventory`);
  const inventory = await response.json();
  return inventory;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [, setInventory] = useAtom(inventoryAtom);

  const handleShopButtonClick = () => {
    navigate('/shop');
  };

  const handleLogoutButtonClick = async () => {
    try {
      const response = await httpGetLogout();
      if (response.status === 200) navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleInventoryButtonClick = () => {
    navigate('/inventory');
  };

  // BGM
  useEffect(() => {
    const bgm = mainBgm();
    bgm.play();
    return () => {
      bgm.pause();
    };
  }, []);

  const fetchInventory = async () => {
    const { inventory } = await httpGetInventory();
    setInventory(inventory);
  };

  // 인벤토리
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <S.MainPage>
      <S.LogoutButton onClick={handleLogoutButtonClick}>
        로그아웃
      </S.LogoutButton>
      <Forge />

      <S.Menu>
        <div>▶︎</div>
        <img src={rankingImageUrl} />
        <img src={shopImageUrl} width="35" onClick={handleShopButtonClick} />
        <img src={dunjeonImageUrl} />
        <img
          src={inventoryImgUrl}
          width="35"
          onClick={handleInventoryButtonClick}
        />
        <img src={settingImgUrl} width="35" />
      </S.Menu>
    </S.MainPage>
  );
};

export default MainPage;
