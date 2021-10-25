import React from "react";
import ProductCheckout from "../modules/ProductCheckout";
import Checkout from "../modules/Checkout";
import { shallow, ShallowWrapper } from "enzyme";
import { IItemAdd } from "../types/Table";
import { IItemsCheckout } from "../types/ProductCheckout";

const items: Array<IItemAdd> = [
  {
    id: 0,
    item: {
      name: "Small Pizza",
      description: "10'' pizza for one person",
      price: 11.99
    }
  },
  {
    id: 1,
    item: {
      name: "Medium Pizza",
      description: "12'' pizza for two person",
      price: 15.99
    }
  },
  {
    id: 2,
    item: {
      name: "Large Pizza",
      description: "15'' pizza for four person",
      price: 21.99
    }
  }
];

const vendors: Array<string> = ["microsoft", "default", "facebook"];

interface IItemCase {
  id: number;
  count: number;
};
const cases = [
  {
    vendor: "default",
    items: [
      {id: 0, count: 1}, {id: 1, count: 1}, {id: 2, count: 1}
    ]
  },
  {
    vendor: "microsoft",
    items: [
      {id: 0, count: 3}, {id: 2, count: 1}
    ]
  },
  {
    vendor: "amazon",
    items: [
      {id: 1, count: 3}, {id: 2, count: 1}
    ]
  }
];

const results: Array<number> = [49.97, 45.97, 67.96];

describe("ProductCheckout Module", () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {wrapper = shallow(<ProductCheckout />)});

  it("should render correctly", () => expect(wrapper).toMatchSnapshot());

  it("add 1 basic item", () => {
    const instance = wrapper.instance() as ProductCheckout;
    const testVendor = vendors[0];
    const testItem1 = items[0];
    //
    instance.selectedVendor = testVendor;
    instance.onAddItem(testItem1);
    const add1: IItemsCheckout = {
      vendor: testVendor,
      items: [{
        count: 1,
        ...testItem1
      }]
    };
    expect(instance.state.addedItems).toEqual([add1]);
  });

  it("add some more item", () => {
    const instance = wrapper.instance() as ProductCheckout;
    const testVendor = vendors[0];
    const testItem1 = items[0];
    //
    instance.selectedVendor = testVendor;
    instance.onAddItem(testItem1);
    const add1: IItemsCheckout = {
      vendor: testVendor,
      items: [{
        count: 1,
        ...testItem1
      }]
    };
    expect(instance.state.addedItems).toEqual([add1]);
    const testItem2 = items[1];
    instance.onAddItem(testItem2);
    const add2: IItemsCheckout = {
      vendor: testVendor,
      items: [{count: 1, ...testItem1}, {count: 1, ...testItem2}]
    };
    expect(instance.state.addedItems).toEqual([add2]);
    const testItem3 = items[0];
    instance.onAddItem(testItem3);
    const add3: IItemsCheckout = {
      vendor: testVendor,
      items: [{count: 2, ...testItem1}, {count: 1, ...testItem2}]
    };
    expect(instance.state.addedItems).toEqual([add3]);
  });

  it("price test", () => {
    const instance = wrapper.instance() as ProductCheckout;
    //
    for (let i = 0; i< cases.length; i++) {
      const caseData: IItemCase[] = cases[i].items;
      const testVendor = cases[i].vendor;
      instance.selectedVendor = testVendor;
      for (let j = 0; j< caseData.length; j++) {
        const item = items.find(itm => itm.id === caseData[j].id);
        if (item) {
          for (let k = 0; k< caseData[j].count; k ++)
            instance.onAddItem(item);
        }
      }
      const checkoutWrapper: ShallowWrapper = shallow(<Checkout addedItems={instance.state.addedItems} rules={instance.state.rules}/>);
      const checkoutInstance = checkoutWrapper.instance() as Checkout;
      const price = checkoutInstance.calculatePrice();
      expect(price).toEqual(results[i]);
      instance.setState({ addedItems: [] });
    }
  });
});
