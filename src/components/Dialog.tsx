import React, { ReactNode } from "react";
import { Dialog, DialogTitle, Paper, PaperProps, Button } from "@mui/material";
import Draggable from "react-draggable";

interface IProps {
  title?: string;
  content?: ReactNode;
  buttonText: string;
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
    }
  }

  onOpen() {
    this.setState({ isOpen: true });
    this.props.onDialogOpen && this.props.onDialogOpen();
  }

  onClose() {
    this.setState({ isOpen: false });
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
          open={this.state.isOpen}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            {this.props.title}
          </DialogTitle>
          {this.props.content && this.props.content}
        </Dialog>
      </>
    );
  }
}

export default DialogComponent;
