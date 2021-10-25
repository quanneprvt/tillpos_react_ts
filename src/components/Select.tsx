import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";

interface IData {
  text: string;
  value: string;
}

interface IProps {
  data?: Array<IData>;
  onSelect?: (params: string) => void;
  label?: string;
  selected?: string;
}

interface IStates {
  selectValue: string;
}

class SelectComponent extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectValue: this.props.selected
        ? this.props.selected
        : this.props.data
        ? this.props.data[0].value
        : ""
    };
  }

  onSelect(evt: SelectChangeEvent<string>) {
    const selected =
      this.props.data &&
      this.props.data.find((itm) => itm.value === evt.target.value);
    this.setState({ selectValue: selected ? selected.value : "" });
    this.props.onSelect && this.props.onSelect(selected ? selected.value : "");
  }

  render() {
    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          {this.props.label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.selectValue}
          label="Age"
          onChange={(evt) => this.onSelect(evt)}
        >
          {this.props.data &&
            this.props.data.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
}

export default SelectComponent;
