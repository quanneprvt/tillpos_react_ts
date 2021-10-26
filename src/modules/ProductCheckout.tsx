import React from "react";
//component
import Table from "../components/Table";
import Select from "../components/Select";
import ListComponent from "../components/List";
import ListItemCollapse from "../components/ListItemCollapse";
import { ListItemText, ButtonGroup, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RemoveIcon from "@mui/icons-material/Remove";
//module
import Rule from "./Rule";
import Checkout from "./Checkout";
//constant
import {
  tableData,
  vendorData,
  operatorSelect,
  pizzaSelect,
  productDiscountType,
  ruleModes,
  defaultRule
} from "../constants/index";
//type
import { IItemAdd } from "../types/Table";
import { IItemProduct, IItemsCheckout } from "../types/ProductCheckout";
import { IRuleData } from "../types/Rule";

interface IProps {}

interface IStates {
  addedItems: Array<IItemsCheckout>;
  rules: Array<IRuleData>;
  currentRule: IRuleData | undefined;
  isEdit: boolean;
}

class ProductCheckoutModule extends React.Component<IProps, IStates> {
  selectedVendor: string | undefined;
  currentIndex: number;
  editNode: React.RefObject<Rule>;
  constructor(props: IProps) {
    super(props);
    this.selectedVendor = vendorData[0].value;
    this.state = {
      addedItems: [],
      rules: defaultRule,
      currentRule: undefined,
      isEdit: false
    };
    this.currentIndex = -1;
    this.editNode = React.createRef();
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

  onRuleAdd(ruleData: IRuleData): IRuleData[] {
    // console.log(ruleData);
    const rule = { ...ruleData };
    if (this.currentIndex === -1) {
      this.state.rules.push(rule);
    } else {
      this.state.rules[this.currentIndex] = ruleData;
    }
    this.setState({ rules: this.state.rules });
    return this.state.rules;
  }

  onEditRule(index: number): IRuleData | undefined {
    this.currentIndex = index;
    this.setState({ isEdit: true, currentRule: this.state.rules[index] });
    this.editNode.current?.AddData(this.state.rules[index]);
    return this.state.currentRule;
  }

  onEditRuleClose() {
    this.currentIndex = -1;
    this.setState({ isEdit: false, currentRule: undefined });
  }

  moveRule(dir: string, index: number): IRuleData[] | false {
    switch (dir) {
      case "up":
        if (index === 0) return false;
        this.state.rules.splice(
          index - 1,
          0,
          this.state.rules.splice(index, 1)[0]
        );
        break;

      case "down":
        if (index === this.state.rules.length - 1) return false;
        this.state.rules.splice(
          index + 1,
          0,
          this.state.rules.splice(index, 1)[0]
        );
        break;
    }
    this.setState({ rules: this.state.rules });
    return this.state.rules;
  }

  removeRule(index: number): IRuleData[] {
    this.state.rules.splice(index, 1);
    this.setState({ rules: this.state.rules });
    return this.state.rules;
  }

  mapDiscountMessage(ruleData: IRuleData): string {
    return `${
      vendorData.find((vendor) => vendor.value === ruleData.itemType.vendor)
        ?.text
    } - Gets a discount ${this.mapDiscountResult(
      ruleData
    )} on ${this.mapRuleType(ruleData)} for buy ${
      pizzaSelect.find((pizza) => pizza.value === ruleData.itemType.product)
        ?.text
    } ${
      ruleData.discountType.productDiscountType ===
      productDiscountType.EACH.value
        ? ""
        : `with ${this.mapOperator(ruleData)} ${
            ruleData.itemType.amount
          } item(s)`
    }`;
  }

  mapOperator(ruleData: IRuleData): string {
    switch (ruleData.itemType.operator) {
      case operatorSelect.EQUAL.value:
        return ``;
      case operatorSelect.GREATER_OR_EQUAL_THAN.value:
        return `at least`;
      case operatorSelect.GREATER_THAN.value:
        return `more than`;
      case operatorSelect.LESS_OR_EQUAL_THAN.value:
        return `less or equal than`;
      case operatorSelect.LESS_THAN.value:
        return `less than`;
      default:
        return ``;
    }
  }

  mapDiscountResult(ruleData: IRuleData): string {
    let str = "";
    if (ruleData.discountType.price) {
      str = `with the price of ${ruleData.discountType.price}`;
    } else if (ruleData.discountType.percent) {
      str = `with ${ruleData.discountType.percent} percent`;
    }
    if (ruleData.discountType.amount) {
      let temp = `in ${ruleData.itemType.amount} on ${ruleData.discountType.amount}`;
      str = str === "" ? temp : `${str} and ${temp}`;
    }
    return str;
  }

  mapRuleType(ruleData: IRuleData): string {
    const ruleType = ruleData.discountType.productDiscountType;
    if (ruleType === productDiscountType.ALL.value) {
      return `whole cart`;
    } else if (ruleType === productDiscountType.EACH.value) {
      return `each`;
    } else return "";
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
        <Rule
          isShowButton={true}
          onRuleAdd={(ruleData) => this.onRuleAdd(ruleData)}
          mode={ruleModes.ADD.value}
        />
        <Checkout addedItems={this.state.addedItems} rules={this.state.rules} />
        <Button
          variant="contained"
          onClick={() => this.setState({ addedItems: [] })}
        >
          Clear Cart
        </Button>
        <ListComponent
          items={this.state.rules.map((rule, index) => (
            <ListItemCollapse
              key={index}
              header={
                <ListItemText sx={{ "&": { textTransform: "capitalize" } }}>
                  {`Rule ${index}`}
                </ListItemText>
              }
              items={
                <ListItemText onClick={() => this.onEditRule(index)}>
                  {this.mapDiscountMessage(rule)}
                </ListItemText>
              }
              additionalComponent={
                <>
                  <ButtonGroup
                    variant="outlined"
                    sx={{
                      "&": {
                        transformOrigin: "center",
                        transform: "rotateZ(90deg)"
                      }
                    }}
                  >
                    <Button
                      sx={{ "&": { width: "20px", minWidth: "0 !important" } }}
                      onClick={() => this.moveRule("up", index)}
                    >
                      <KeyboardArrowLeftIcon />
                    </Button>
                    <Button
                      sx={{ "&": { width: "20px", minWidth: "0 !important" } }}
                      onClick={() => this.moveRule("down", index)}
                    >
                      <KeyboardArrowRightIcon />
                    </Button>
                  </ButtonGroup>
                  <Button onClick={() => this.removeRule(index)}>
                    <RemoveIcon />
                  </Button>
                </>
              }
            />
          ))}
        />
        <Rule
          isShowButton={false}
          onRuleAdd={(ruleData) => this.onRuleAdd(ruleData)}
          mode={ruleModes.EDIT.value}
          ruleData={this.state.currentRule}
          isShow={this.state.isEdit}
          onClose={() => this.onEditRuleClose()}
          ref={this.editNode}
        />
      </div>
    );
  }
}

export default ProductCheckoutModule;
