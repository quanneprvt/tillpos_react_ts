import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { ITableProps } from "../types/table";

class TableComponent extends React.Component<ITableProps> {
  headers: Array<string>;

  constructor(props: ITableProps) {
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

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
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
