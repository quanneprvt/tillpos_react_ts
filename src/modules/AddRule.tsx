import React from "react";
import Dialog from "../components/Dialog";
import { Grid } from "@mui/material";

class AddRuleModule extends React.Component {
  render() {
    return (
      <Dialog
        buttonText="Add Rule"
        title="Add Rule"
        content={
          <Grid container>

          </Grid>
        }
      />
    );
  }
}

export default AddRuleModule;
