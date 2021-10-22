import React, { ReactNode } from "react";
import { List } from "@mui/material";

interface IProps {
  items?: ReactNode[];
}

class ListComponent extends React.Component<IProps> {
  render() {
    return (
      <List>
        {this.props.items}
      </List>
    );
  }
}

export default ListComponent;
