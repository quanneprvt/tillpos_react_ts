import React, { ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  Paper,
  PaperProps,
  Button,
  DialogActions
} from "@mui/material";
import Draggable from "react-draggable";

interface IProps {
  title?: string;
  content?: ReactNode;
  buttonText: string;
  actionButtons?: ReactNode | ReactNode[];
  isOpen?: boolean;
  onDialogOpen?: () => void;
  onDialogClose?: () => void;
}

interface IStates {
  isOpen: boolean;
}

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

class DialogComponent extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onOpen() {
    if (this.props.isOpen === undefined) this.setState({ isOpen: true });
    this.props.onDialogOpen && this.props.onDialogOpen();
  }

  onClose() {
    if (this.props.isOpen === undefined) this.setState({ isOpen: false });
    this.props.onDialogClose && this.props.onDialogClose();
  }

  render() {
    return (
      <>
        <Button variant="contained" onClick={() => this.onOpen()}>
          {this.props.buttonText}
        </Button>
        <Dialog
          onClose={() => this.onClose()}
          open={this.props.isOpen === undefined ? this.state.isOpen : this.props.isOpen}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            {this.props.title}
          </DialogTitle>
          {this.props.content && this.props.content}
          {this.props.actionButtons ? (
            <DialogActions>{this.props.actionButtons}</DialogActions>
          ) : null}
        </Dialog>
      </>
    );
  }
}

export default DialogComponent;
