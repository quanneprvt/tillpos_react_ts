import React, { ReactNode } from "react";
import { Dialog, DialogTitle, Paper, PaperProps } from "@mui/material";
import Draggable from "react-draggable";

interface IProps {
  title?: string;
  content?: ReactNode;
  handleClose?: () => void;
  isOpen?: boolean;
}

function PaperComponent(props: PaperProps) {
  const nodeRef = React.useRef(null);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef}/>
    </Draggable>
  );
}

class DialogComponent extends React.Component<IProps> {
  onClose() {
    this.props.handleClose && this.props.handleClose();
  }

  render() {
    return (
      <Dialog
        onClose={() => this.onClose()}
        open={!!this.props.isOpen}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">{this.props.title}</DialogTitle>
        {this.props.content && this.props.content}
      </Dialog>
    );
  }
}

export default DialogComponent;
