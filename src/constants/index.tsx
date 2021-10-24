import { IProductData, IVendorData, ISelectCondition } from "../types/constants";

const tableData: Array<IProductData> = [
  {
    name: "Small Pizza",
    description: "10'' pizza for one person",
    price: 11.99
  },
  {
    name: "Medium Pizza",
    description: "12'' pizza for two person",
    price: 15.99
  },
  {
    name: "Large Pizza",
    description: "15'' pizza for four person",
    price: 21.99
  }
];

const vendorData: Array<IVendorData> = [
  {
    text: "Microsoft",
    value: "microsoft"
  },
  {
    text: "Amazon",
    value: "amazon"
  },
  {
    text: "Facebook",
    value: "facebook"
  }
];

const selectEachAll: ISelectCondition = {
  EACH: {
    text: "Each",
    value: "each"
  },
  ALL: {
    text: "All",
    value: "all"
  },
  AT_LEAST: {
    text: "At least",
    value: "at_least"
  }
};

export { tableData, vendorData, selectEachAll };
