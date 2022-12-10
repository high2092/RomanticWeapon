import React from 'react';
import * as S from './Shop.style';
import shieldImgUrl from '../assets/shield.png';
import { httpPost } from '../utils/utils';
import { HOST } from '../constants/constants';
import { useInventory } from '../hooks/useInventory';

const dummyItemList = [
  {
    idx: 1,
    name: '프로텍트 실드',
    imgUrl: shieldImgUrl,
  },
  {
    idx: 2,
    name: '리커버리 실드',
    imgUrl: '',
  },
  {
    idx: 3,
    name: '하준',
    imgUrl: '',
  },
  {
    idx: 4,
    name: '현우',
    imgUrl: '',
  },
  {
    idx: 5,
    name: '엄',
    imgUrl: '',
  },
];

const httpPostBuyItem = async (idx: number) => {
  const response = await httpPost(`${HOST}/shop/buy`, { idx });
  return response;
};

export const Shop = () => {
  const itemList = dummyItemList;

  const { inventory, setInventory, getItemCount, insertItem, setGold } =
    useInventory();

  const handleItemClick = (idx: number) => async () => {
    try {
      const response = await httpPostBuyItem(idx);
      if (response.status === 200) {
        const { gold, amount } = await response.json();
        insertItem(idx, amount);
        setGold(gold);
        setInventory([...inventory]);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {itemList.map(({ idx, name, imgUrl }) => (
          <S.Item key={idx} onClick={handleItemClick(idx)}>
            <img src={imgUrl} />
            <div>{name}</div>
            <div>보유 개수: {getItemCount(idx)}</div>
          </S.Item>
        ))}
      </S.Showcase>
    </S.Shop>
  );
};
