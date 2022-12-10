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
