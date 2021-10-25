import {
  IProductData,
  IVendorData,
  ISelectCondition,
  IProductDiscountType,
  IRuleMode
} from "../types/constants";
import { IRuleData } from "../types/Rule";
import { ISelect } from "../types/Select";
import { toSnakeCase } from "../utils/index";

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
    text: "Default",
    value: "default"
  },
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

const operatorSelect: ISelectCondition = {
  GREATER_OR_EQUAL_THAN: {
    text: "Greater or equal than",
    value: toSnakeCase("Greater or equal than")
  },
  GREATER_THAN: {
    text: "Greater than",
    value: toSnakeCase("Greater than")
  },
  EQUAL: {
    text: "Equal than",
    value: toSnakeCase("Equal than")
  },
  LESS_THAN: {
    text: "Less than",
    value: toSnakeCase("Less than")
  },
  LESS_OR_EQUAL_THAN: {
    text: "Less or equal than",
    value: toSnakeCase("Less or equal than")
  }
};

const productDiscountType: IProductDiscountType = {
  ALL: {
    text: "All",
    value: "all"
  },
  EACH: {
    text: "Each",
    value: "each"
  }
};

const pizzaSelect: Array<ISelect> = (function () {
  const data: Array<ISelect> = tableData.map((data) => {
    const formatData: ISelect = {
      text: data.name,
      value: toSnakeCase(data.name)
    };
    return formatData;
  });
  const additionalData: ISelect = {
    text: "Anything",
    value: "anything"
  };
  data.push(additionalData);
  return data;
})();

const ruleModes: IRuleMode = {
  ADD: {
    text: "Add",
    value: "add"
  },
  EDIT: {
    text: "Edit",
    value: "edit"
  }
};

const defaultRule: Array<IRuleData> = [
  {
    itemType: {
      vendor: "microsoft",
      operator: "greater_or_equal_than",
      amount: 3,
      product: "small_pizza"
    },
    discountType: {
      productDiscountType: "each",
      amount: 2,
      price: 0,
      percent: 0
    }
  },
  {
    itemType: {
      vendor: "amazon",
      operator: "greater_or_equal_than",
      amount: 1,
      product: "large_pizza"
    },
    discountType: {
      productDiscountType: "each",
      amount: 1,
      price: 19.99,
      percent: 0
    }
  },
  {
    itemType: {
      vendor: "facebook",
      operator: "greater_or_equal_than",
      amount: 5,
      product: "medium_pizza"
    },
    discountType: {
      productDiscountType: "each",
      amount: 4,
      price: 0,
      percent: 0
    }
  }
];

export {
  tableData,
  vendorData,
  operatorSelect,
  pizzaSelect,
  productDiscountType,
  ruleModes,
  defaultRule
};
