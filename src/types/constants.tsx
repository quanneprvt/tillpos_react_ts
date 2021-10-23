import { ISelect } from "./Select";

interface IProductData {
  name: string;
  description: string;
  price: number;
}

interface IVendorData extends ISelect {}

export type { IProductData, IVendorData };
