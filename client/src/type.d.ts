declare module '.*mp3' {
  const value: any;
  export default value;
}

declare module '.*gif' {
  const value: any;
  export default value;
}

declare module '.*png' {
  const value: any;
  export default value;
}

interface InventoryItem {
  itemIdx: number;
  amount: number;
  position?: number;
}

interface Item {
  idx: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
}
