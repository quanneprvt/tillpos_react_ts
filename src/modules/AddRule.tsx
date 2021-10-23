import React from "react";
import Dialog from "../components/Dialog";
import Select from "../components/Select";
import { Container, Grid, TextField } from "@mui/material";
import { ISelect } from "../types/Select";
import { tableData } from "../constants/index";
import { toSnakeCase } from "../utils/index";

const selectEachAll: Array<ISelect> = [
  {
    text: "Each",
    value: "each"
  },
  {
    text: "Every",
    value: "every"
  }
];

const pizzaSelect: Array<ISelect> = tableData.map((data) => {
  const formatData: ISelect = {
    text: data.name,
    value: toSnakeCase(data.name)
  };
  return formatData;
});

class AddRuleModule extends React.Component {
  render() {
    return (
      <Dialog
        buttonText="Add Rule"
        title="Add Rule"
        content={
          <Container sx={{"&": {marginBottom: "15px"}}}>
            <Container>
              <div>Item Type</div>
              <Container sx={{ "&": { padding: "5px", marginTop: "10px" } }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Select label="Quantity" data={selectEachAll} />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="outlined-number"
                      label="Amount"
                      type="number"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Select label="Product" data={pizzaSelect} />
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
