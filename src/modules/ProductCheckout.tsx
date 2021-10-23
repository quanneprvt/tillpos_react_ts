import React from "react";
//component
import Table from "../components/Table";
import Select from "../components/Select";
import Dialog from "../components/Dialog";
import List from "../components/List";
import ListItemCollapse from "../components/ListItemCollapse";
import { Button, Container, ListItemText } from "@mui/material";
import { IItemAdd } from "../types/Table";
//module
import AddRule from "./AddRule";
//constant
import { tableData, vendorData } from "../constants/index";
interface IItemProduct extends IItemAdd {
  count: number;
}

interface IItemsCheckout {
  vendor: string;
  items: Array<IItemProduct>;
}

interface IProps {}

interface IStates {
  addedItems: Array<IItemsCheckout>;
}

class ProductCheckoutModule extends React.Component<IProps, IStates> {
  selectedVendor: string | undefined;
  constructor(props: IProps) {
    super(props);
    this.selectedVendor = vendorData[0].value;
    this.state = {
      addedItems: []
    }
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
        <AddRule />
        <Dialog
          buttonText="Check out"
          title="Product Checkout"
          content={
            <Container>
              <List
                items={this.state.addedItems.map((itemCheckout, index) => {
                  return (
                    <ListItemCollapse
                      key={index}
                      header={
                        <ListItemText
                          sx={{ "&": { textTransform: "capitalize" } }}
                        >
                          {itemCheckout.vendor}
                        </ListItemText>
                      }
                      items={
                        <Table
                          data={itemCheckout.items.map((itemCheckout) => ({
                            amount: itemCheckout.count,
                            name: itemCheckout.item.name,
                            price: itemCheckout.item.price
                          }))}
                        />
                      }
                    />
                  );
                })}
              />
            </Container>
          }
        />
      </div>
    );
  }
}

export default ProductCheckoutModule;
