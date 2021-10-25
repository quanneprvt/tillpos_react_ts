import { ISelect } from "./Select";

interface IProductData {
  name: string;
  description: string;
  price: number;
}

interface IVendorData extends ISelect {}

interface ISelectCondition {
  GREATER_THAN: ISelect;
  GREATER_OR_EQUAL_THAN: ISelect;
  EQUAL: ISelect;
  LESS_THAN: ISelect;
  LESS_OR_EQUAL_THAN: ISelect;
}

interface IProductDiscountType {
  EACH: ISelect;
  ALL: ISelect;
}

interface IRuleMode {
  ADD: ISelect;
  EDIT: ISelect;
}

export type { IProductData, IVendorData, ISelectCondition, IProductDiscountType, IRuleMode };
