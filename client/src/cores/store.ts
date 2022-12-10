import { atom } from 'jotai';
import { HOST } from '../constants/constants';
import { httpGet } from '../utils/utils';

export const goldAtom = atom(0);
export const inventoryAtom = atom<InventoryItem[]>([]);
export const itemDictionary = new Map<number, Item>();
export const inventoryIndexMap = new Map<number, number>();

const httpGetItemInformations = async () => {
  const response = await httpGet(`${HOST}/shop`);
  const itemInformations = await response.json();
  return itemInformations;
};

httpGetItemInformations().then(({ salesList }) => {
  salesList.forEach(({ idx, name, desc, price, imgUrl }: any) => {
    itemDictionary.set(idx, { idx, name, description: desc, price, imgUrl });
    console.log(itemDictionary);
  });
});
