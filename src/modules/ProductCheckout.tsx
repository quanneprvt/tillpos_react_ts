import React from "react";
//component
import Table from "../components/Table";
import Select from "../components/Select";
import List from "../components/List";
import ListItemCollapse from "../components/ListItemCollapse";
import { ListItemText } from "@mui/material";
//module
import AddRule from "./AddRule";
import Checkout from "./Checkout";
//constant
import { tableData, vendorData } from "../constants/index";
//type
import { IItemAdd } from "../types/Table";
import { IItemProduct, IItemsCheckout } from "../types/ProductCheckout";
import { IRuleData } from "../types/AddRule";

interface IProps {}

interface IStates {
  addedItems: Array<IItemsCheckout>;
  rules: Array<IRuleData>;
}

class ProductCheckoutModule extends React.Component<IProps, IStates> {
  selectedVendor: string | undefined;
  constructor(props: IProps) {
    super(props);
    this.selectedVendor = vendorData[0].value;
    this.state = {
      addedItems: [],
      rules: []
    };
  }

  addItemVendor(item: IItemAdd) {
    const itemProduct: IItemProduct = {
      count: 1,
      ...item
    };
    const itemsCheckout: IItemsCheckout = {
      vendor: this.selectedVendor || "",
      items: [itemProduct]
    };
    this.state.addedItems.push(itemsCheckout);
  }

  addItemProduct(item: IItemAdd, index: number) {
    const itemCheckout: IItemsCheckout = this.state.addedItems[index];
    const itemProductIndex = itemCheckout.items.findIndex(
      (itm) => itm.id === item.id
    );
    if (itemProductIndex === -1) {
      const itemProduct: IItemProduct = {
        count: 1,
        ...item
      };
      itemCheckout.items.push(itemProduct);
    } else {
      const itemProduct: IItemProduct = itemCheckout.items[itemProductIndex];
      itemProduct.count += 1;
    }
  }

  onAddItem(item: IItemAdd) {
    const index = this.state.addedItems.findIndex(
      (itm) => itm.vendor === this.selectedVendor
    );
    if (index === -1) {
      this.addItemVendor(item);
    } else {
      this.addItemProduct(item, index);
    }
    this.setState({ addedItems: this.state.addedItems });
  }

  onVendorSelect(vendor: string) {
    this.selectedVendor = vendorData.find((vd) => vd.value === vendor)?.value;
  }

  onRuleAdd(ruleData: IRuleData) {
    this.state.rules.push(ruleData);
    this.setState({ rules: this.state.rules });
  }

  render() {
    return (
      <div>
        <Select
          data={vendorData}
          label="Vendor"
          onSelect={(vendor) => this.onVendorSelect(vendor)}
          selected={vendorData[0].value}
        />
        <Table
          data={tableData}
          isAddable={true}
          onAddItem={(item) => this.onAddItem(item)}
        />
        <AddRule onRuleAdd={(ruleData) => this.onRuleAdd(ruleData)} />
        <Checkout addedItems={this.state.addedItems} />
        <List
          items={this.state.rules.map((rule, index) => (
            <ListItemCollapse
              key={index}
              header={
                <ListItemText sx={{ "&": { textTransform: "capitalize" } }}>
                  {`Rule ${index}`}
                </ListItemText>
              }
              items={
                <ListItemText>
                  Vendor - 
                </ListItemText>
              }
            />
          ))}
        />
      </div>
    );
  }
}

export default ProductCheckoutModule;
