import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { HOST } from '../constants/constants';
import { goldAtom, inventoryAtom, inventoryIndexMap } from '../cores/store';
import { httpGet } from '../utils/utils';

const httpGetInventory = async () => {
  const response = await httpGet(`${HOST}/inventory`);
  const { gold, inventory } = await response.json();
  return { gold, inventory };
};

export const useInventory = () => {
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [gold, setGold] = useAtom(goldAtom);

  useEffect(() => {
    httpGetInventory().then(({ gold, inventory }) => {
      setGold(gold);
      setInventory(inventory);
      inventory.forEach((item: any, position: number) => {
        inventoryIndexMap.set(item.idx, position);
      });
    });
  }, []);

  const getItemCount = (idx: number) => {
    console.log(idx, inventoryIndexMap);
    const targetItemInventoryIdx = inventoryIndexMap.get(idx);
    console.log(targetItemInventoryIdx);
    return targetItemInventoryIdx !== undefined
      ? inventory[targetItemInventoryIdx].amount
      : 0;
  };

  const insertItem = (idx: number, amount: number) => {
    const targetItemInventoryIdx = inventoryIndexMap.get(idx);
    if (targetItemInventoryIdx === undefined) {
      inventory.push({ idx, amount });
      inventoryIndexMap.set(idx, inventory.length - 1);
    } else {
      inventory[targetItemInventoryIdx].amount = amount;
    }
  };

  return { inventory, setInventory, getItemCount, insertItem, gold, setGold };
};
