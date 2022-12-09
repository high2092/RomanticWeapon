import { atom } from 'jotai';

export const goldAtom = atom(0);
export const inventoryAtom = atom<InventoryItem[]>([]);
export const itemDictionary = atom(new Map<number, Item>());
export const inventoryIndexMap = new Map<number, number>();
