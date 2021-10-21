import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Switch, Theme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface IProps {}
interface IStates {
  toggleDark: boolean;
}
class App extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      toggleDark: false
    };
  }

  handleModeChange() {
    this.setState({ toggleDark: !this.state.toggleDark });
  }

  render() {
    const theme = createTheme({
      palette: {
        mode: this.state.toggleDark ? "dark" : "light"
      }
    });

    return (
      <div>
        <ThemeProvider theme={theme}>
          <Switch
            checked={this.state.toggleDark}
            onChange={() => this.handleModeChange()}
            name="toggleDark"
            color="default"
          />
          <Home />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
