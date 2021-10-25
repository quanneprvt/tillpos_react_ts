import React from "react";
import Dialog from "../components/Dialog";
import Select from "../components/Select";
import { Button, Container, Grid, TextField } from "@mui/material";
import {
  vendorData,
  operatorSelect,
  pizzaSelect,
  productDiscountType,
  ruleModes
} from "../constants/index";
//
import { ISelect } from "../types/Select";
import { IRuleData } from "../types/Rule";

const operatorConditionSelect: Array<ISelect> = Object.values(operatorSelect);
const productDiscountTypeSelect: Array<ISelect> =
  Object.values(productDiscountType);
const modes: Array<ISelect> = Object.values(ruleModes);
const defaultRule: IRuleData = {
  itemType: {
    vendor: vendorData[0].value,
    operator: operatorConditionSelect[0].value,
    amount: 0,
    product: pizzaSelect[0].value
  },
  discountType: {
    productDiscountType: productDiscountTypeSelect[0].value,
    amount: 0,
    price: 0,
    percent: 0
  }
};

interface IProps {
  onRuleAdd?: (params: IRuleData) => void;
  mode: string;
  isShowButton?: boolean;
  isShow?: boolean;
  ruleData?: IRuleData;
  onClose?: () => void;
  onOpen?: () => void;
}

interface IStates {
  isDialogOpen: boolean;
  ruleData: IRuleData;
}

class AddRuleModule extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isDialogOpen: false,
      ruleData: defaultRule
    };
  }

  onRuleAdd() {
    const rule = JSON.parse(JSON.stringify(this.state.ruleData));
    console.log(rule);
    this.props.onRuleAdd && this.props.onRuleAdd(rule);
    this.onClose();
  }

  updateRuleData(parent: any, fieldName: string, value: any) {
    value = this.validateField(fieldName, value);
    parent[fieldName] = value;
    this.setState({ ruleData: this.state.ruleData });
  }

  validateField(fieldName: string, value: any) {
    if (fieldName === "percent") {
      value = Math.max(0, Math.min(100, value));
    }
    return value;
  }

  onOpen() {
    this.props.onOpen && this.props.onOpen();
    this.setState({ isDialogOpen: true });
  }

  onClose() {
    this.props.onClose && this.props.onClose();
    this.setState({ ruleData: defaultRule, isDialogOpen: false });
  }

  AddData(ruleData: IRuleData) {
    this.setState({ ruleData });
  }

  render() {
    return (
      <Dialog
        isShowButton={this.props.isShowButton}
        isOpen={
          this.props.isShow !== undefined
            ? this.props.isShow
            : this.state.isDialogOpen
        }
        onDialogOpen={() => this.onOpen()}
        onDialogClose={() => this.onClose()}
        buttonText={`${
          modes.find((rule) => rule.value === this.props.mode)?.text
        } Rule`}
        title={`${
          modes.find((rule) => rule.value === this.props.mode)?.text
        } Rule`}
        actionButtons={
          <Button onClick={() => this.onRuleAdd()} variant="contained">
            {`${modes.find((rule) => rule.value === this.props.mode)?.text}`}{" "}
            Rule
          </Button>
        }
        content={
          <Container sx={{ "&": { marginBottom: "15px" } }}>
            <Container>
              <div>Item Type</div>
              <Container sx={{ "&": { padding: "5px", marginTop: "10px" } }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Select
                      label="Vendor"
                      data={vendorData}
                      selected={this.state.ruleData.itemType.vendor}
                      onSelect={(vendor) =>
                        this.updateRuleData(
                          this.state.ruleData.itemType,
                          "vendor",
                          vendor
                        )
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Select
                      label="Operator"
                      data={operatorConditionSelect}
                      selected={this.state.ruleData.itemType.operator}
                      onSelect={(operator) =>
                        this.updateRuleData(
                          this.state.ruleData.itemType,
                          "operator",
                          operator
                        )
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.ruleData.itemType.amount}
                      onChange={(evt) =>
                        this.updateRuleData(
                          this.state.ruleData.itemType,
                          "amount",
                          evt.target.value
                        )
                      }
                    />
                  </Grid>
                  <Grid item>
                    <Select
                      label="Product"
                      data={pizzaSelect}
                      selected={this.state.ruleData.itemType.product}
                      onSelect={(product) =>
                        this.updateRuleData(
                          this.state.ruleData.itemType,
                          "product",
                          product
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </Container>
            </Container>
            <Container>
              <div>Discount Type</div>
              <Container sx={{ "&": { padding: "5px", marginTop: "10px" } }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Select
                      label="Product Discount Type"
                      data={productDiscountTypeSelect}
                      selected={
                        this.state.ruleData.discountType.productDiscountType
                      }
                      onSelect={(productDiscountType) =>
                        this.updateRuleData(
                          this.state.ruleData.discountType,
                          "productDiscountType",
                          productDiscountType
                        )
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.ruleData.discountType.amount}
                      onChange={(evt) =>
                        this.updateRuleData(
                          this.state.ruleData.discountType,
                          "amount",
                          evt.target.value
                        )
                      }
                      disabled={this.state.ruleData.discountType.productDiscountType === productDiscountType.ALL.value}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Price"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.ruleData.discountType.price}
                      onChange={(evt) =>
                        this.updateRuleData(
                          this.state.ruleData.discountType,
                          "price",
                          evt.target.value
                        )
                      }
                      disabled={!!this.state.ruleData.discountType.percent}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Percent"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      value={this.state.ruleData.discountType.percent}
                      onChange={(evt) =>
                        this.updateRuleData(
                          this.state.ruleData.discountType,
                          "percent",
                          evt.target.value
                        )
                      }
                      disabled={!!this.state.ruleData.discountType.price}
                      sx={{ "&": { minWidth: "100px" } }}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Container>
          </Container>
        }
      />
    );
  }
}

export default AddRuleModule;
