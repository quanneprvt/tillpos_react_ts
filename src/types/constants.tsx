import { ISelect } from "./Select";

interface IProductData {
  name: string;
  description: string;
  price: number;
}

interface IVendorData extends ISelect {}

interface ISelectCondition {
  EACH: ISelect;
  ALL: ISelect;
  AT_LEAST: ISelect;
}

export type { IProductData, IVendorData, ISelectCondition };
