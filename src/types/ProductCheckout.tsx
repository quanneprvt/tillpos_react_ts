import { IItemAdd } from "./Table";

interface IItemProduct extends IItemAdd {
  count: number;
  totalPrice: number;
}

interface IItemsCheckout {
  vendor: string;
  items: Array<IItemProduct>;
}

export type { IItemProduct, IItemsCheckout }