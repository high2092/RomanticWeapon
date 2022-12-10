import React, { useEffect, useState } from 'react';
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
import { useInventory } from '../hooks/useInventory';
import { BGMController } from '../cores/BGMController';
import { Modal } from '../components/common/Modal';

const httpGetLogout = async () => {
  const response = await httpGet(`${HOST}/auth/logout`);
  return response;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [showSettingModal, setShowSettingModal] = useState(false);

  useInventory();

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

  const handleSettingButtonClick = () => {};

  const handleRankingButtonClick = () => {
    navigate('/ranking');
  };

  // BGM
  useEffect(() => {
    BGMController.setBGM(mainBgm());
    BGMController.play();
    return () => {
      BGMController.pause();
    };
  }, []);

  return (
    <S.MainPage>
      <S.LogoutButton onClick={handleLogoutButtonClick}>
        로그아웃
      </S.LogoutButton>
      <Forge />

      <S.Menu>
        <div>▶︎</div>
        <img src={rankingImageUrl} onClick={handleRankingButtonClick} />
        <img src={shopImageUrl} width="35" onClick={handleShopButtonClick} />
        <img src={dunjeonImageUrl} />
        <img
          src={inventoryImgUrl}
          width="35"
          onClick={handleInventoryButtonClick}
        />
        <img
          src={settingImgUrl}
          width="35"
          onClick={() => {
            setShowSettingModal(true);
          }}
        />
      </S.Menu>
      {showSettingModal && (
        <Modal
          element={<SettingModal />}
          zIndex={11}
          handleDimmedClick={() => {
            setShowSettingModal(false);
          }}
        />
      )}
    </S.MainPage>
  );
};

const SettingModal = () => {
  const [volume, setVolume] = useState(BGMController.volume);
  const [muted, setMuted] = useState(BGMController.muted);

  const handleDecreaseButtonClick = () => {
    BGMController.setVolume((volume) => volume - 0.05);
    setVolume(BGMController.volume);
    setMuted(false);
  };

  const handleIncreaseButtonClick = () => {
    BGMController.setVolume((volume) => volume + 0.05);
    setVolume(BGMController.volume);
    setMuted(false);
  };

  const handleMuteButtonClick = () => {
    BGMController.off();
    setMuted(true);
  };

  const handleUnmuteButtonClick = () => {
    BGMController.on();
    setMuted(false);
  };

  return (
    <S.SettingModal>
      <S.SettingOptionTitle>배경음</S.SettingOptionTitle>
      <div>
        <div>현재 볼륨: {(100 * volume).toFixed(0).toString()}</div>
        <div>현재 상태: {muted ? '음소거' : '재생중'}</div>
        <button onClick={handleDecreaseButtonClick}>작게</button>
        <button onClick={handleIncreaseButtonClick}>크게</button>
        <button onClick={handleMuteButtonClick}>음소거</button>
        <button onClick={handleUnmuteButtonClick}>음소거 해제</button>
      </div>
    </S.SettingModal>
  );
};

export default MainPage;
