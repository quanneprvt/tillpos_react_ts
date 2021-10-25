import React from "react";
import Dialog from "../components/Dialog";
import ListItemCollapse from "../components/ListItemCollapse";
import Table from "../components/Table";
import List from "../components/List";
import { Container, ListItemText } from "@mui/material";
import { IItemProduct, IItemsCheckout } from "../types/ProductCheckout";
import { IRuleData } from "../types/Rule";
import { operatorSelect, pizzaSelect, productDiscountType } from "../constants";
import { IDiscountResult } from "../types/Checkout";

interface IProps {
  addedItems: Array<IItemsCheckout>;
  rules: Array<IRuleData>;
}

interface IStates {
  price: number;
}

class CheckoutModule extends React.Component<IProps, IStates> {
  prices: Array<number>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      price: 0
    };
    this.prices = [];
  }

  onDialogOpen() {
    this.setState({ price: this.calculatePrice() });
  }

  calculatePrice(): number {
    this.prices = [];
    for (let i = 0; i < this.props.addedItems.length; i++) {
      const vendorRules = this.props.rules.filter(
        (rule) => rule.itemType.vendor === this.props.addedItems[i].vendor
      );
      this.analyzeRule(this.props.addedItems[i].items, vendorRules);
    }
    return this.prices.length > 0 ? this.prices.reduce((a, b) => a + b) : 0;
  }

  analyzeRule(items: IItemProduct[], rules: IRuleData[]) {
    const products: Array<string> = [
      ...Array.from(new Set(items.map((itm) => itm.item.name)))
    ];
    for (let i = 0; i < products.length; i++) {
      const productRules = rules.filter(
        (rule) =>
          pizzaSelect.find((pizza) => pizza.value === rule.itemType.product)
            ?.text === products[i] || rule.itemType.product === "anything"
      );
      const itemToCheck = items.find((itm) => itm.item.name === products[i]);
      const itemIndex = items.findIndex((itm) => itm.item.name === products[i]);
      const discount: IDiscountResult = {
        totalAmount: 0,
        price: 0,
        percent: 0
      };
      for (let j = 0; j < productRules.length; j++) {
        const discountType = productRules[i].discountType.productDiscountType;
        if (discountType === productDiscountType.ALL.value) {
          if (this.checkCondition(itemToCheck, productRules[i])) {
            discount.percent = productRules[i].discountType.percent || 0;
            discount.price = productRules[i].discountType.price || 0;
          }
        } else if (discountType === productDiscountType.EACH.value) {
          if (itemToCheck) {
            discount.totalAmount =
              productRules[i].discountType.amount *
                Math.floor(
                  itemToCheck?.count / productRules[i].itemType.amount
                ) +
              (itemToCheck?.count % productRules[i].itemType.amount);
            if (productRules[i].discountType.price) {
              const normalPrice = itemToCheck.item.price;
              const avgPrice =
                (Math.floor(
                  itemToCheck?.count / productRules[i].itemType.amount
                ) *
                  productRules[i].itemType.amount *
                  productRules[i].discountType.price +
                  (itemToCheck?.count % productRules[i].itemType.amount) *
                    normalPrice) /
                itemToCheck?.count;
              discount.price = avgPrice || 0;
            }
            if (productRules[i].discountType.percent) {
              const normalPercent = 100;
              const avgPercent =
                (Math.floor(
                  itemToCheck?.count / productRules[i].itemType.amount
                ) *
                  productRules[i].itemType.amount *
                  productRules[i].discountType.percent +
                  (itemToCheck?.count % productRules[i].itemType.amount) *
                    normalPercent) /
                itemToCheck?.count;
              discount.percent = avgPercent;
            }
          }
        }
      }
      this.applyRule(items, itemIndex, discount);
    }
  }

  checkCondition(item: IItemProduct | undefined, rule: IRuleData) {
    if (item)
      switch (rule.itemType.operator) {
        case operatorSelect.EQUAL.value:
          return item?.count === rule.itemType.amount;
        case operatorSelect.GREATER_OR_EQUAL_THAN.value:
          return item?.count >= rule.itemType.amount;
        case operatorSelect.GREATER_THAN.value:
          return item?.count > rule.itemType.amount;
        case operatorSelect.LESS_OR_EQUAL_THAN.value:
          return item?.count <= rule.itemType.amount;
        case operatorSelect.LESS_THAN.value:
          return item?.count < rule.itemType.amount;
      }
    else return false;
  }

  applyRule(items: IItemProduct[], itemIndex: number, discount: IDiscountResult) {
    const totalAmount = discount.totalAmount || items[itemIndex].count;
    const price = discount.price || items[itemIndex].item.price;
    const percent = discount.percent || 100;
    console.log(totalAmount, price, percent);
    this.prices.push(totalAmount * price * (percent/100));
  }

  render() {
    return (
      <Dialog
        onDialogOpen={() => this.onDialogOpen()}
        isShowButton={true}
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
            <div style={{marginBottom: "15px"}}>Total Price: {this.state.price}</div>
          </Container>
        }
      />
    );
  }
}

export default CheckoutModule;
