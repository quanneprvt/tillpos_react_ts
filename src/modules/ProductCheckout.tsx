import React from "react";
import Table from "../components/Table";
import Select from "../components/Select";
import Dialog from "../components/Dialog";
import List from "../components/List";
import ListItemCollapse from "../components/ListItemCollapse";
import { tableData, vendorData } from "../constants/index";
import { Button, Container, ListItemText } from "@mui/material";
import { IItemAdd } from "../types/Table";

interface IItemProduct extends IItemAdd {
  count: number;
}

interface IItemsCheckout {
  vendor: string;
  items: Array<IItemProduct>;
}

interface IProps {}

interface IStates {
  isDialogOpen: boolean;
}

class ProductCheckout extends React.Component<IProps, IStates> {
  addedItem: Array<IItemsCheckout>;
  selectedVendor: string | undefined;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isDialogOpen: false
    };
    this.addedItem = [];
    this.selectedVendor = vendorData[0].value;
  }

  openCheckoutDialog() {
    this.setState({ isDialogOpen: true });
  }

  closeCheckoutDialog() {
    this.setState({ isDialogOpen: false });
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
    this.addedItem.push(itemsCheckout);
  }

  addItemProduct(item: IItemAdd, index: number) {
    const itemCheckout: IItemsCheckout = this.addedItem[index];
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
    const index = this.addedItem.findIndex(
      (itm) => itm.vendor === this.selectedVendor
    );
    if (index === -1) {
      this.addItemVendor(item);
    } else {
      this.addItemProduct(item, index);
    }
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
        <Button variant="contained" onClick={() => this.openCheckoutDialog()}>
          Checkout
        </Button>
        <Table
          data={tableData}
          isAddable={true}
          onAddItem={(item) => this.onAddItem(item)}
        />
        <Button variant="contained" onClick={() => this.openCheckoutDialog()}>
          Add Rule
        </Button>
        <Dialog
          isOpen={this.state.isDialogOpen}
          handleClose={() => this.closeCheckoutDialog()}
          title="Product Checkout"
          content={
            <Container>
              <List
                items={this.addedItem.map((itemCheckout, index) => (
                  <ListItemCollapse
                    key={index}
                    header={<ListItemText sx={{"&": {textTransform: "capitalize"}}}>{itemCheckout.vendor}</ListItemText>}
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
                ))}
              />
            </Container>
          }
        />
      </div>
    );
  }
}

export default ProductCheckout;
