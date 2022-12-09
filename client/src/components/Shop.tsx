import React from 'react';
import * as S from './Shop.style';
import shieldImgUrl from '../assets/shield.png';
import { httpPost } from '../utils/utils';
import { HOST } from '../constants/constants';
import { goldAtom, inventoryAtom, inventoryIndexMap } from '../cores/store';
import { useAtom } from 'jotai';

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
  const [, setGold] = useAtom(goldAtom);
  const [inventory, setInventory] = useAtom(inventoryAtom);

  const handleItemClick = (idx: number) => async () => {
    try {
      const response = await httpPostBuyItem(idx);
      if (response.status === 200) {
        const { gold, amount } = await response.json();
        insertItem(inventory, inventoryIndexMap, idx, amount);
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
            <div>
              보유 개수: {getItemCount(inventory, inventoryIndexMap, idx)}
            </div>
          </S.Item>
        ))}
      </S.Showcase>
    </S.Shop>
  );
};

const getItemCount = (
  inventory: InventoryItem[],
  inventoryIndexMap: Map<number, number>,
  idx: number
) => {
  const targetItemInventoryIdx = inventoryIndexMap.get(idx);
  return targetItemInventoryIdx !== undefined
    ? inventory[targetItemInventoryIdx].amount
    : 0;
};

const insertItem = (
  inventory: InventoryItem[],
  inventoryIndexMap: Map<number, number>,
  itemIdx: number,
  amount: number
) => {
  const targetItemInventoryIdx = inventoryIndexMap.get(itemIdx);
  if (targetItemInventoryIdx === undefined) {
    inventory.push({ itemIdx, amount });
    inventoryIndexMap.set(itemIdx, inventory.length - 1);
  } else {
    inventory[targetItemInventoryIdx].amount = amount;
  }
};
