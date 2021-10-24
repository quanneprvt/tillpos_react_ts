import React from "react";
import Dialog from "../components/Dialog";
import ListItemCollapse from "../components/ListItemCollapse";
import Table from "../components/Table";
import List from "../components/List";
import { Container, ListItemText } from "@mui/material";
import { IItemsCheckout } from "../types/ProductCheckout";

interface IProps {
  addedItems: Array<IItemsCheckout>;
}

class CheckoutModule extends React.Component<IProps> {
  render() {
    return (
      <Dialog
        buttonText="Check out"
        title="Product Checkout"
        content={
          <Container>
            <List
              items={this.props.addedItems.map((itemCheckout, index) => {
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
    );
  }
}

export default CheckoutModule;
