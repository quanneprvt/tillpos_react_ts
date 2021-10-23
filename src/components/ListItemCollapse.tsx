import React, { ReactNode } from "react";
import { Collapse, List, ListItemButton, ListItem } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface IProps {
  header?: ReactNode;
  items?: ReactNode;
}

interface IStates {
  isOpen: boolean;
}

class ListItemCollapseComponent extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <>
        <ListItemButton onClick={() => this.handleClick()}>
          {this.props.header}
          {this.state.isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>{this.props.items}</ListItem>
          </List>
        </Collapse>
      </>
    );
  }
}

export default ListItemCollapseComponent;
