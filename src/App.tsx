import React from "react";
import Home from "./views/Home";
import "./App.css";
import { Switch, FormControlLabel, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface IProps {}
interface IStates {
  toggleDark: boolean;
}
class App extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      toggleDark: true
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
      <ThemeProvider theme={theme}>
        <Box
          color="text.primary"
          bgcolor="background.default"
          sx={{ "&": { width: "100vw", height: "100vh" } }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={this.state.toggleDark}
                onChange={() => this.handleModeChange()}
                name="toggleDark"
                color="default"
              />
            }
            label={this.state.toggleDark ? "Dark" : "Light"}
          />
          <Home />
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
