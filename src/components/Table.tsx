import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IItemAdd } from "../types/Table";

interface IProps {
  data?: Array<any>;
  isAddable?: boolean;
  onAddItem?: (params: IItemAdd) => void;
}

class TableComponent extends React.Component<IProps> {
  headers: Array<string>;
  constructor(props: IProps) {
    super(props);
    this.headers = this.getDistinctField();
  }

  getDistinctField(): Array<string> {
    let arr: Array<string> = [];
    if (this.props.data) {
      for (let i = 0; i < this.props.data.length; i++) {
        arr.push(...Object.keys(this.props.data[i]));
      }
    }
    return [...Array.from(new Set(arr))];
  }

  onAddItem(item: IItemAdd) {
    this.props.onAddItem && this.props.onAddItem(item);
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {this.props.isAddable ? <TableCell></TableCell> : null}
              {this.headers.map((header, index) => (
                <TableCell
                  align="center"
                  key={index}
                  sx={{ "&": { textTransform: "capitalize" } }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data &&
              this.props.data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {this.props.isAddable ? (
                    <TableCell align="center">
                      <IconButton
                        onClick={() =>
                          this.onAddItem({ id: rowIndex, item: row })
                        }
                      >
                        <AddIcon></AddIcon>
                      </IconButton>
                    </TableCell>
                  ) : null}
                  {this.headers.map((header, valueIndex) => (
                    <TableCell align="center" key={valueIndex}>
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default TableComponent;
