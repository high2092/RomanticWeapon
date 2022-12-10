import React from 'react';
import { useAtom } from 'jotai';
import { inventoryAtom, itemDictionary } from '../cores/store';
import * as S from './Inventory.style';

export const Inventory = () => {
  const [inventory] = useAtom(inventoryAtom);
  return (
    <S.Inventory>
      {inventory.map(({ idx, amount }) => (
        <S.Item key={idx}>
          <img src={itemDictionary.get(idx)?.imgUrl} />
          <div>{itemDictionary.get(idx)?.name}</div>
          <div>{itemDictionary.get(idx)?.description}</div>
          <div>보유 개수: {amount}</div>
        </S.Item>
      ))}
    </S.Inventory>
  );
};
