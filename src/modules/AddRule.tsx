import React from "react";
import Dialog from "../components/Dialog";
import Select from "../components/Select";
import { Button, Container, Grid, TextField } from "@mui/material";
import { tableData, vendorData, selectEachAll } from "../constants/index";
import { toSnakeCase } from "../utils/index";
//
import { ISelect } from "../types/Select";
import { IRuleData } from "../types/AddRule";

const selectCondition: Array<ISelect> = Object.values(selectEachAll);

const pizzaSelect: Array<ISelect> = tableData.map((data) => {
  const formatData: ISelect = {
    text: data.name,
    value: toSnakeCase(data.name)
  };
  return formatData;
});

interface IProps {
  onRuleAdd?: (params: IRuleData) => void;
};

interface IStates {
  isDialogOpen: boolean;
}

class AddRuleModule extends React.Component<IProps, IStates> {
  ruleData: IRuleData;
  constructor(props: IProps) {
    super(props);
    this.state = {
      isDialogOpen: false
    };
    this.ruleData = {
      itemType: {
        vendor: vendorData[0].value,
        quantity: selectCondition[0].value,
        amount: 0,
        product: pizzaSelect[0].value
      },
      discountType: {
        amount: 0,
        price: 0
      }
    };
  }

  onRuleAdd() {
    this.setState({ isDialogOpen: false });
    this.props.onRuleAdd && this.props.onRuleAdd(this.ruleData);
  }

  updateRuleData(parent:any, fieldName: string, value: any) {
    parent[fieldName] = value;
  }

  render() {
    return (
      <Dialog
        isOpen={this.state.isDialogOpen}
        onDialogOpen={() => this.setState({ isDialogOpen: true })}
        onDialogClose={() => this.setState({ isDialogOpen: false })}
        buttonText="Add Rule"
        title="Add Rule"
        actionButtons={
          <Button onClick={() => this.onRuleAdd()} variant="contained">Add Rule</Button>
        }
        content={
          <Container sx={{ "&": { marginBottom: "15px" } }}>
            <Container>
              <div>Item Type</div>
              <Container sx={{ "&": { padding: "5px", marginTop: "10px" } }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Select label="Vendor" data={vendorData} onSelect={(vendor) => this.updateRuleData(this.ruleData.itemType, "vendor", vendor)} />
                  </Grid>
                  <Grid item>
                    <Select label="Quantity" data={selectCondition} onSelect={(quantity) => this.updateRuleData(this.ruleData.itemType, "quantity", quantity)}/>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(evt) => this.updateRuleData(this.ruleData.itemType, "amount", evt.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Select label="Product" data={pizzaSelect} onSelect={(product) => this.updateRuleData(this.ruleData.itemType, "product", product)}/>
                  </Grid>
                </Grid>
              </Container>
            </Container>
            <Container>
              <div>Discount Type</div>
              <Container sx={{ "&": { padding: "5px", marginTop: "10px" } }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(evt) => this.updateRuleData(this.ruleData.discountType, "amount", evt.target.value)}
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
                      onChange={(evt) => this.updateRuleData(this.ruleData.discountType, "price", evt.target.value)}
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
